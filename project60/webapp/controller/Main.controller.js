sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/ui/model/odata/v2/ODataModel"],
  (Controller, ODataModel) => {
    "use strict";

    return Controller.extend(
      "exratecomparewithvouitem.project60.controller.Main",
      {
        onInit() {
          var oModel = new ODataModel(
            "/sap/opu/odata/sap/ZEXAM_MEMBER_D08_SRV/"
          );

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
            { key: "KRW", text: "한국" },
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
      }
    );
  }
);
