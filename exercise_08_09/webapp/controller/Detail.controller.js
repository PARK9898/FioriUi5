sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/ui/core/routing/History"],
  (Controller, History) => {
    "use strict";

    return Controller.extend("exercise0809.controller.Detail", {
      onInit() {
        this.oRouter = this.getOwnerComponent().getRouter();
      },

      onGoBack() {
        const oHistory = History.getInstance();
        const sPreviousHash = oHistory.getPreviousHash();

        if (sPreviousHash !== undefined) {
          window.history.go(-1);
        } else {
          const oRouter = this.getOwnerComponent().getRouter();
          oRouter.navTo(
            "RouteMain",
            {
              "?query": {
                key1: "ToMain",
                key2: 123,
              },
            },
            true
          );
        }
      },
    });
  }
);
