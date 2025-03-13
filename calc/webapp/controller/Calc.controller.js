sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/m/MessageToast"],
  (Controller, MessageToast) => {
    "use strict";

    return Controller.extend("calcprogram.calc.controller.Calc", {
      onInit() {},

      onPressCalc: function () {
        var num1 = Number(this.getView().getModel().getProperty("/input1"));
        var num2 = Number(this.getView().getModel().getProperty("/input2"));
        // var num1 = this.getView().byId("input1").getValue;
        var result;
        var selectedOperation = this.getView()
          .getModel()
          .getProperty("/selectedOperation");
        debugger;
        var result;
        switch (selectedOperation) {
          case "add":
            result = num1 + num2;
            break;
          case "sub":
            result = num1 - num2;
            break;
          case "mul":
            result = num1 * num2;
            break;
          case "div":
            if (num2 !== 0) {
              result = num1 / num2;
            } else {
              result = "0으로 나눌수 없습니다.";
            }
            break;
          default:
            result = "잘못된 연산입니다.";
            break;
        }

        this.getView().getModel().setProperty("/result", result.toString());
        MessageToast.show("계산완료");
      },

      onPressSee: function () {
        var num1 = Number(this.getView().getModel().getProperty("/input1"));

        var multilplication = num1 + "단/n/n";
        for (var i = 1; i < 10; i++) {
          multilplication += num1 + "x" + i + "=" + num1 * i + "/n";
        }
      },
    });
  }
);
