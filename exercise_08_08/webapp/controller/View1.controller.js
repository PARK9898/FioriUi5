sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/odata/v2/ODataModel",
    "sap/ui/model/json/JSONModel",
  ],
  (Controller, ODataModel, JSONModel) => {
    "use strict";

    return Controller.extend("exercise0808.controller.View1", {
      onInit() {
        var oModel = new ODataModel("/v2/northwind/northwind.svc/");

        oModel.read("/Products", {
          success: function (oData) {
            var aProducts = oData.results;

            var aTop5Products = aProducts
              .sort((a, b) => b.UnitsInStock - a.UnitsInStock) // 내림차순 정렬
              .slice(0, 5); // 상위 5개 선택

            // 제품명: "ProductID - ProductName" 으로 변환
            aTop5Products.forEach((product) => {
              product.DisplayName =
                product.ProductID + " " + product.ProductName;
            });

            // JSONModel 생성 후 바인딩
            var oJsonModel = new JSONModel({ products: aTop5Products });
            this.getView().setModel(oJsonModel, "chartData");
          }.bind(this),
          error: function (oError) {
            console.error("OData 요청 실패", oError);
          },
        });
      },
    });
  }
);
