sap.ui.define(["sap/ui/core/mvc/Controller"], (Controller) => {
  "use strict";

  return Controller.extend("exercise0809.controller.Main", {
    onInit() {
      // 한단계 위에 있는 멈포넌트에 접근해서, 라우터를 가져온다다
      this.oRouter = this.getOwnerComponent().getRouter();
    },
    onGoDetail() {
      //버튼을 눌렀을 때 해당 페이지로 넘어가게 한다.
      var sValue = this.getView().byId("input-id").getValue();
      //해당 페이지로 넘어가게 한다.
      this.oRouter.navTo(
        "RouteDetail",
        {
          key1: "abc",
          key2: 123,
          key3: sValue,
        },
        true
      );
    },
  });
});
