sap.ui.define(
  [
    "sap/ui/core/UIComponent",
    "calcprogram/calc/model/models",
    "sap/ui/model/json/JSONModel",
  ],
  (UIComponent, models, JSONModel) => {
    "use strict";

    return UIComponent.extend("calcprogram.calc.Component", {
      metadata: {
        manifest: "json",
        interfaces: ["sap.ui.core.IAsyncContentCreation"],
      },

      init() {
        // call the base component's init function
        UIComponent.prototype.init.apply(this, arguments);

        // set the device model
        this.setModel(models.createDeviceModel(), "device");

        // enable routing
        this.getRouter().initialize();

        var oModel = new JSONModel({
          selectedOperation: "add", // 기본값 설정
          input1: "",
          input2: "",
          result: 0,
        });
        this.setModel(oModel);
      },
    });
  }
);
