sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/m/MessageToast"],
  (Controller, MessageToast) => {
    "use strict";

    return Controller.extend("syncd08.exercised0805.controller.View1", {
      onInit() {},
      onPress: function () {
        // 버튼 클릭 시 'input' 값을 가져와서 처리
        var smsg = this.getView().getModel().getProperty("/input");

        if (!smsg) smsg = "메세지를 입력해주세요";

        MessageToast.show(smsg);
      },
    });
  }
);
