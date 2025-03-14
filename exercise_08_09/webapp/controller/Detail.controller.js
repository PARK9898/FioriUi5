sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/model/json/JSONModel",
  ],
  (Controller, History, JSONModel) => {
    "use strict";

    return Controller.extend("exercise0809.controller.Detail", {
      // 컨트롤러가 로드 될 때 한번만 실행 -> 모델 생성
      onInit() {
        let oRouter = this.getOwnerComponent().getRouter();
        // "RouteDetail" 라우트가 매칭될 때 _onRouteMatched 함수 실행
        oRouter
          .getRoute("RouteDetail")
          .attachPatternMatched(this._onPatternMatched, this);
      },
      // manifest의 patter이랑 일치할때마다 해당 이벤트가 실행된다다
      _onPatternMatched(oEvent) {
        var oArgu = oEvent.getParameter("arguments");
        var oModel = new JSONModel(oArgu);
        this.getView().setModel(oModel, "detailModel");
      },

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
    });
  }
);
