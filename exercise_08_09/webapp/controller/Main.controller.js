sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/ui/model/odata/v2/ODataModel"],
  (Controller, oDataModel) => {
    "use strict";

    return Controller.extend("exercise0809.controller.Main", {
      onInit() {
        // 한단계 위에 있는 멈포넌트에 접근해서, 라우터를 가져온다다
        this.oRouter = this.getOwnerComponent().getRouter();
        this.oRouter
          .getRoute("RouteMain")
          .attachPatternMatched(this._onPatternMatched, this);
      },
      _onPatternMatched(oEvent) {
        var oArgu = oEvent.getParameter("arguments");
        // var oArgu = oEvent.getParameters().arguments;
      },
      onGoDetail() {
        var oTable = this.getView().byId("mTable");
        var oSelectedItem = oTable.getSelectedItem();
        var oContext = oSelectedItem.getBindingContext("student");
        var oSelectedData = oContext.getObject();

        var oParams = {
          no: oSelectedData.no,
          name: oSelectedData.name,
          gender: oSelectedData.gender,
          birthdate: oSelectedData.birthdate,
        };

        //버튼을 눌렀을 때 해당 페이지로 넘어가게 한다.
        // var sValue = this.getView().byId("input-id").getValue();
        //해당 페이지로 넘어가게 한다.
        this.oRouter.navTo("RouteDetail", oParams, true);
      },
    });
  }
);
