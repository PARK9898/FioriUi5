sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/model/json/JSONModel",
  ],
  (Controller, History, JSONModel) => {
    "use strict";

    return Controller.extend("cl4.exprogramd08.controller.Detail", {
      onInit() {
        // 라우터 설정정
        let oRouter = this.getOwnerComponent().getRouter();
        // Detail 라우터 가져오기기
        oRouter
          .getRoute("RouteDetail")
          .attachPatternMatched(this._onPatternMatched, this);
      },
      // 해당 패턴이 맞으면 해당 이벤트 실행행
      _onPatternMatched(oEvent) {
        var oArgu = oEvent.getParameter("arguments");
        var oModel = new JSONModel(oArgu);
        this.getView().setModel(oModel, "detailModel");
      },
      // 이전 화면으로 돌아가는 함수수
      onGoBack() {
        const oHistory = History.getInstance();
        const sPreviousHash = oHistory.getPreviousHash();

        if (sPreviousHash !== undefined) {
          window.history.go(-1);
        } else {
          const oRouter = this.getOwnerComponent().getRouter();
          oRouter.navTo("RouteMain", {}, true);
        }
      },
      // 위와 같이 이전 화면으로 돌아가기
      onGotoMain() {
        const oHistory = History.getInstance();
        const sPreviousHash = oHistory.getPreviousHash();

        if (sPreviousHash !== undefined) {
          window.history.go(-1);
        } else {
          const oRouter = this.getOwnerComponent().getRouter();
          oRouter.navTo("RouteMain", {}, true);
        }
      },
    });
  }
);
