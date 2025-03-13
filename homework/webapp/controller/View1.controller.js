sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/odata/v2/ODataModel",
    "sap/ui/model/json/JSONModel",
  ],
  (Controller, ODataModel, JSONModel) => {
    "use strict";

    return Controller.extend("homework.controller.View1", {
      onInit() {},
      onPress: async function (oEvent) {
        var employeelist = this.getView().byId("EmployeeList");
        var selectedItem = employeelist.getSelectedItem();
        // var oSelectedItem = oEvent.getParameter("listItem"); // 선택된 리스트 아이템
        var oContext = selectedItem.getBindingContext("Employees"); // 바인딩된 데이터
        var oSelectedData = oContext.getObject();

        var oDialogModel = new JSONModel(oSelectedData);
        this.getView().setModel(oDialogModel, "dialogModel");
        this.oDialog ??= await this.loadFragment({
          name: "homework.view.Information",
        });
        // this.oDialog.setBindingContext(oContext, "Employees");

        this.oDialog.open();
      },

      onCloseDialog() {
        this.byId("infoDialog").close();
      },
    });
  }
);
