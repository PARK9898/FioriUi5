sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/model/json/JSONModel",
  ],
  (Controller, History, JSONModel) => {
    "use strict";

    return Controller.extend("project65.controller.Detail", {
      onInit() {
        // 라우터 설정정
        let oRouter = this.getOwnerComponent().getRouter();
        // Detail 라우터 가져오기기
        oRouter
          .getRoute("RouteDetail")
          .attachPatternMatched(this._onPatternMatched, this);
      },
      // 해당 패턴이 맞으면 해당 이벤트 실행행
      _onPatternMatched(oEvent) {
        var oArgu = oEvent.getParameter("arguments");
        let countryCode = oArgu.country; // 실제 코드(CNY/JPY)
        let viewTextCountry = "";
        if (countryCode === "CNY") {
          viewTextCountry = "중국";
        } else if (countryCode === "JPY") {
          viewTextCountry = "일본";
        } else {
          viewTextCountry = countryCode;
        }
        var oModel = new JSONModel(oArgu);

        this.getView().setModel(oModel, "detailModel");
        const rawYear = oArgu.year;
        const rawMonth = oArgu.month;
        const rawCountry = oArgu.country;

        const year = rawYear ? rawYear.toString() : "";
        const month = rawMonth ? rawMonth.toString().padStart(2, "0") : "";
        const country = rawCountry || "";
        this._loadVoucherData(year, month, country);
      },

      _loadVoucherData: function (year, month, country) {
        const oView = this.getView();
        const oModel = oView.getModel(); // ODataModel

        oModel.read("/ZDCT_FI021Set", {
          success: function (oData) {
            const aFiItems = oData.results;

            // 필터 조건 (예: 연도, 월, 국가 등)
            const aFiltered = aFiItems.filter((item) => {
              const d = item.CreatedDate;
              const itemYear = d.getFullYear().toString();
              const itemMonth = (d.getMonth() + 1).toString().padStart(2, "0");

              return (
                itemYear === year &&
                itemMonth === month &&
                item.BsCurrency === country &&
                item.GlId === "1100004010" && // 상품매출
                !item.ClrId &&
                item.DbcrInd === "S"
              );
            });

            // 날짜별로 합산
            const oByDate = {};
            aFiltered.forEach((item) => {
              const dateKey =
                item.CreatedDate instanceof Date
                  ? item.CreatedDate.toISOString().split("T")[0]
                  : item.CreatedDate;

              if (!oByDate[dateKey]) {
                oByDate[dateKey] = {
                  TotalAmount: 0,
                  TgTotal: 0,
                  Currency: item.BsCurrency, // 기준통화
                  TgCurrency: item.TgCurrency, // 대상통화
                };
              }
              oByDate[dateKey].TotalAmount += Number(item.BasePrice); // 상품 매출 합
              oByDate[dateKey].TgTotal += Number(item.TgPrice); // 환율적용 금액 합
            });

            const aSummary = Object.entries(oByDate)
              .sort(([d1], [d2]) => new Date(d1) - new Date(d2))
              .map(([date, val]) => ({
                CreatedDate: date,
                TotalAmount: val.TotalAmount,
                Currency: val.Currency,
                TgTotal: val.TgTotal,
                TgCurrency: val.TgCurrency,
              }));

            const oTableModel = new JSONModel({
              DateSummary: aSummary,
            });
            oView.setModel(oTableModel, "custModel");
          },
          error: () => MessageToast.show("전표 데이터를 가져오지 못했습니다."),
        });
      },
      // 이전 화면으로 돌아가는 함수
      onGoBack() {
        const oHistory = History.getInstance();
        const sPreviousHash = oHistory.getPreviousHash();

        if (sPreviousHash !== undefined) {
          window.history.go(-1);
        } else {
          const oRouter = this.getOwnerComponent().getRouter();
          oRouter.navTo("RouteMain", {}, true);
        }
      },
      // 위와 같이 이전 화면으로 돌아가기
      onGotoMain() {
        const oHistory = History.getInstance();
        const sPreviousHash = oHistory.getPreviousHash();

        if (sPreviousHash !== undefined) {
          window.history.go(-1);
        } else {
          const oRouter = this.getOwnerComponent().getRouter();
          oRouter.navTo("RouteMain", {}, true);
        }
      },
    });
  }
);
