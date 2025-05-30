sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/odata/v2/ODataModel",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
  ],
  (Controller, ODataModel, MessageToast, JSONModel) => {
    "use strict";

    return Controller.extend("exratewithvouitem.project61.controller.Main", {
      onInit() {
        var oModel = new ODataModel("/sap/opu/odata/sap/ZDC_FI_021_0401_SRV/");
        this.getView().setModel(oModel);
        var oComboBox = this.byId("yearComboBox");

        // 현재 연도 및 범위 설정
        var currentYear = new Date().getFullYear();
        var startYear = currentYear - 5; // 20년 전부터 현재 연도까지

        // 연도 항목 동적으로 추가
        for (var year = startYear; year <= currentYear; year++) {
          oComboBox.addItem(
            new sap.ui.core.Item({
              key: year.toString(),
              text: year.toString(),
            })
          );
        }

        var oMonthComboBox = this.byId("monthComboBox");
        for (var i = 1; i <= 12; i++) {
          oMonthComboBox.addItem(
            new sap.ui.core.Item({
              key: i.toString(),
              text: i + "월",
            })
          );
        }
        var oCountryComboBox = this.byId("countryComboBox");
        var countries = [
          { key: "CNY", text: "중국" },
          { key: "JPY", text: "일본" },
        ];

        countries.forEach((country) => {
          oCountryComboBox.addItem(
            new sap.ui.core.Item({
              key: country.key,
              text: country.text,
            })
          );
        });
      },

      onSearch: function () {
        var totalGain = 0;
        var totalLoss = 0;
        var totalTransaction = 0;

        var countryFlags = {
          KRW: "https://flagcdn.com/w320/kr.png",
          CNY: "https://flagcdn.com/w320/cn.png",
          JPY: "https://flagcdn.com/w320/jp.png",
        };
        var oYear = this.byId("yearComboBox").getSelectedKey();
        var oMonth = this.byId("monthComboBox").getSelectedKey();
        var oCountry = this.byId("countryComboBox").getSelectedKey();
        var oCountryText = this.byId("countryComboBox")
          .getSelectedItem()
          .getText();
        var today = new Date();
        var todayString = today.toISOString().split("T")[0]; // 오늘 날짜 (YYYY-MM-DD 형식)
        if (!oYear || !oMonth || !oCountry) {
          MessageToast.show("조회 조건을 모두 선택해주세요.");
          return;
        }

        var oModel = this.getView().getModel();

        oModel.read("/EX_RATESet", {
          success: function (oData) {
            var aResults = oData.results;

            // 클라이언트 측에서 필터링
            var aFilteredData = aResults.filter(function (item) {
              var sDate = item.ValfrDate;

              // ValfrDate가 Date 객체인지 확인
              if (sDate instanceof Date) {
                var sYear = sDate.getFullYear().toString(); // 연도 추출
                var sMonth = (sDate.getMonth() + 1).toString().padStart(2, "0"); // 월 추출 (0부터 시작하므로 +1)
                var formattedOMonth = oMonth.padStart(2, "0");
                var sDay = sDate.getDate().toString().padStart(2, "0");
                item.ValfrDate = sDay + "일"; // YYYY-MM 형식으로 변환
                item.ExRate = item.ExRate / 100;

                return (
                  sYear === oYear && // 연도 일치
                  sMonth === formattedOMonth && // 월 일치
                  item.BsCurrency === oCountry // 국가 일치
                );
              } else {
                console.error("ValfrDate가 Date 객체가 아닙니다:", sDate);
                return false; // 필터링에서 제외
              }
            });

            var aExRates = aFilteredData.map(function (item) {
              return item.ExRate;
            });
            var iMin = Math.min(...aExRates);
            var iMax = Math.max(...aExRates); // 필터링된 데이터를 JSONModel로 변환하여 차트에 바인딩
            var oChartModel = new JSONModel();
            oChartModel.setData({ ExchangeRates: aFilteredData });
            this.getView().setModel(oChartModel, "chart");

            var oVizFrame = this.byId("ExRateChart");
            var sMonthText = oMonth + "월 " + oCountryText + " 환율정보"; // 동적으로 제목 생성
            oVizFrame.setVizProperties({
              title: {
                text: sMonthText,
              },

              yAxis: {
                scale: {
                  fixedRange: true,
                  minValue: iMin - 0.5,
                  maxValue: iMax + 0.5,
                },
              },
              plotArea: {
                dataLabel: {
                  visible: true, // 데이터 레이블 표시
                },
              },
              categoryAxis: {
                title: {
                  visible: true,
                  text: "환율 적용일", // x축 제목
                },
                label: {
                  rotation: 45, // 레이블을 45도 회전
                },
              },
            });
          }.bind(this),
          error: function (oError) {
            MessageToast.show("데이터를 가져오는 데 실패했습니다.");
          },
        });

        oModel.read("/VOUCHER_ITEMSet", {
          success: function (oVoucherData) {
            var aVoucherItems = oVoucherData.results;

            // 일단 여기까지 전표 ITEM에서 필터링해서 가져와준다.
            var aFilteredVoucherItems = aVoucherItems.filter(function (item) {
              var createdDate = item.CreatedDate;
              var createdYear = createdDate.getFullYear().toString();
              var createdMonth = (createdDate.getMonth() + 1)
                .toString()
                .padStart(2, "0");
              var formattedOMonth = oMonth.padStart(2, "0");
              return (
                createdYear === oYear &&
                createdMonth === formattedOMonth &&
                !item.ClrId &&
                item.BsCurrency === oCountry
              );
            });
            console.log("Filtered Voucher Items:", aFilteredVoucherItems);

            // EX_RATE 데이터 읽기
            oModel.read("/EX_RATESet", {
              success: function (oRateData) {
                var aExchangeRates = oRateData.results;

                // 오늘 날짜 기준으로 EX_RATE 필터링
                var aTodayRates = aExchangeRates.filter(function (rate) {
                  var rateDate = new Date(rate.ValfrDate)
                    .toISOString()
                    .split("T")[0];
                  return rateDate === todayString;
                });

                // VOUCHER_ITEM 데이터에 EX_RATE를 매핑하고 계산
                var aChartData = aFilteredVoucherItems.map(function (item) {
                  var matchingRate = aTodayRates.find(function (rate) {
                    return (
                      rate.BsCurrency === item.BsCurrency &&
                      rate.TgCurrency === item.TgCurrency
                    );
                  });

                  return {
                    CreatedDate: new Date(item.CreatedDate)
                      .toISOString()
                      .split("T")[0],
                    TgPrice: item.TgPrice, // 대상 금액
                    CalculatedPrice: matchingRate
                      ? item.BasePrice * (matchingRate.ExRate / 100)
                      : null, // BasePrice * ExRate
                  };
                });
                var oAggregatedData = {};

                aChartData.forEach(function (data) {
                  if (!oAggregatedData[data.CreatedDate]) {
                    oAggregatedData[data.CreatedDate] = {
                      CreatedDate: data.CreatedDate,
                      TgPrice: 0,
                      CalculatedPrice: 0,
                    };
                  }
                  oAggregatedData[data.CreatedDate].TgPrice +=
                    parseFloat(data.TgPrice) || 0;
                  oAggregatedData[data.CreatedDate].CalculatedPrice +=
                    parseFloat(data.CalculatedPrice) || 0;
                });

                var aAggregatedChartData = Object.values(oAggregatedData);
                aAggregatedChartData.sort(function (a, b) {
                  return new Date(a.CreatedDate) - new Date(b.CreatedDate);
                });

                aAggregatedChartData.forEach(function (item) {
                  var date = new Date(item.CreatedDate);
                  item.CreatedDate = date.getDate() + "일"; // "2일", "3일" 형식으로 변환
                });

                var oChartModel = new JSONModel();
                oChartModel.setData({ VoucherItems: aAggregatedChartData });
                this.getView().setModel(oChartModel, "chart2");

                aAggregatedChartData.forEach(function (item) {
                  if (item.CalculatedPrice > item.TgPrice) {
                    totalGain += item.CalculatedPrice - item.TgPrice;
                  } else {
                    totalLoss += item.TgPrice - item.CalculatedPrice;
                  }
                  totalTransaction += item.TgPrice;
                });
                // 차트 데이터 모델 설정

                var oCardData = new JSONModel({
                  manifest1: {
                    "sap.card": {
                      type: "Object",
                      header: {
                        title: "국가 정보",
                        subTitle: oCountryText,
                        icon: {
                          src: countryFlags[oCountry],
                          shape: "Square", // 아이콘 모양 (Square: 정사각형)
                          size: "L", // 아이콘 크기 (S, M, L 중 선택)
                        },
                      },
                      content: {
                        data: {
                          json: {
                            value: oCountry,
                          },
                        },
                        groups: [
                          {
                            items: [
                              {
                                label: "국가",
                                value: "{value}",
                              },
                            ],
                          },
                        ],
                      },
                    },
                  },
                  manifest2: {
                    "sap.card": {
                      type: "Object",
                      header: {
                        title: "환산차익",
                        subTitle: oMonth + "월 기준",
                      },
                      content: {
                        data: {
                          json: {
                            value: totalGain.toLocaleString("ko-KR", {
                              style: "currency",
                              currency: "KRW",
                            }),
                          },
                        },
                        groups: [
                          {
                            items: [
                              {
                                label: "차익",
                                value: "{value}",
                                icon: {
                                  src: "sap-icon://arrow-top",
                                  color: "Positive", // 초록색
                                },
                              },
                            ],
                          },
                        ],
                      },
                    },
                  },
                  manifest3: {
                    "sap.card": {
                      type: "Object",
                      header: {
                        title: "환산차손",
                        subTitle: oMonth + "월 기준",
                      },
                      content: {
                        data: {
                          json: {
                            value: totalLoss.toLocaleString("ko-KR", {
                              style: "currency",
                              currency: "KRW",
                            }),
                          },
                        },
                        groups: [
                          {
                            items: [
                              {
                                label: "차손",
                                value: "{value}",
                                icon: {
                                  src: "sap-icon://arrow-bottom",
                                  color: "Negative", // 빨간색
                                },
                              },
                            ],
                          },
                        ],
                      },
                    },
                  },
                  manifest4: {
                    "sap.card": {
                      type: "Object",
                      header: {
                        title: "총 거래금액",
                        subTitle: oMonth + "월 기준",
                      },
                      content: {
                        data: {
                          json: {
                            value: totalTransaction.toLocaleString("ko-KR", {
                              style: "currency",
                              currency: "KRW",
                            }),
                          },
                        },
                        groups: [
                          {
                            items: [
                              {
                                label: "총 거래금액",
                                value: "{value}",
                              },
                            ],
                          },
                        ],
                      },
                    },
                  },
                });
                this.getView().setModel(oCardData, "cardModel");
                this.getView().setModel(oCardData, "cardModel");
                console.log("Card Model Data:", oCardData.getData());
                // 차트 속성 설정
                var oVizFrame = this.byId("voucherItemChart");
                oVizFrame.setVizProperties({
                  title: {
                    text: "거래 기준 금액, 현재 기준 금액 비교 ",
                  },
                  plotArea: {
                    dataLabel: {
                      visible: true, // 데이터 레이블 표시
                    },
                  },
                  valueAxis: {
                    // y축 설정
                    title: {
                      visible: true,
                      text: "거래금액 (KRW)", // y축 제목
                    },
                  },
                });
              }.bind(this),
              error: function (oError) {
                MessageToast.show("환율 데이터를 가져오는 데 실패했습니다.");
              },
            });
          }.bind(this),
          error: function (oError) {
            MessageToast.show("전표 데이터를 가져오는 데 실패했습니다.");
          },
        });
      },
    });
  }
);
