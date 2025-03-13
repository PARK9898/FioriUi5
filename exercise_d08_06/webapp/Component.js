sap.ui.define([
    "sap/ui/core/UIComponent",
    "cl4studentinformation/exercised0806/model/models"
], (UIComponent, models) => {
    "use strict";

    return UIComponent.extend("cl4studentinformation.exercised0806.Component", {
        metadata: {
            manifest: "json",
            interfaces: [
                "sap.ui.core.IAsyncContentCreation"
            ]
        },

        init() {
            // call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);

            // set the device model
            this.setModel(models.createDeviceModel(), "device");

            // enable routing
            this.getRouter().initialize();
        }
    });
});