sap.ui.define(
  [
    "sap/ui/core/UIComponent",
    "syncd08/exercised0805/model/models",
    "sap/ui/model/json/JSONModel",
  ],
  (UIComponent, models, JSONModel) => {
    "use strict";

    return UIComponent.extend("syncd08.exercised0805.Component", {
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

        const oModel = new JSONModel({ input: "" });
        this.setModel(oModel);
      },
    });
  }
);
