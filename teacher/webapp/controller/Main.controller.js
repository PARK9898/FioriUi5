sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/odata/v2/ODataModel",
    "sap/ui/model/json/JSONModel",
  ],
  (Controller, ODataModel, JSONModel) => {
    "use strict";

    return Controller.extend("teacher.controller.Main", {
      onInit() {
        var oModel = new ODataModel("/sap/opu/odata/sap/ZTEACHER_D08_SRV/");
        this.getView().setModel(oModel, "teachers");

        // oModel.read("/ZTEACHER_D08Set", {
        //   success: function (oData) {
        //     var teachers = oData.results;
        //     var oJsonModel = new JSONModel({ teachers: teachers });
        //     this.getView().setModel(oJsonModel, "teachers");
        //   }.bind(this),
        //   error: function (oError) {
        //     console.error("OData 요청 실패", oError);
        //   },
        // });
      },
    });
  }
);
