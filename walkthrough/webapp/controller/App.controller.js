// sap.ui.define(
//   ["sap/ui/core/mvc/Controller", "sap/m/MessageToast"],
//   (Controller, MessageToast, JSONModel, ResourceModel) => {
//     "use strict";

//     return Controller.extend("ui5.walkthrough.controller.App", {
//       onShowHello() {
//         // show a native JavaScript alert
//         // 리소스 모델 가져온다.
//         const oBundle = this.getView().getModel("i18n").getResourceBundle();
//         const sRecipient = this.getView()
//           .getModel()
//           .getProperty("/recipient/name");
//         const sMsg = oBundle.getText("helloMsg", [sRecipient]);
//         MessageToast.show(sMsg);
//       },
//     });
//   }
// );

sap.ui.define(["sap/ui/core/mvc/Controller"], (Controller) => {
  "use strict";

  return Controller.extend("ui5.walkthrough.controller.App", {});
});
