sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/odata/v2/ODataModel",
    "sap/m/MessageToast",
  ],
  (Controller, ODataModel, MessageToast) => {
    "use strict";

    return Controller.extend("exercise0807.controller.View", {
      onInit() {
        var oModel = new ODataModel("/sap/opu/odata/sap/ZCARR_D08_SRV/");
        this.getView().setModel(oModel, "data"); // 해당 Odata 모델을 활용하겠다고 선언
      },

      onCreate() {
        var carrId = this.getView().byId("input-carrid").getValue();
        var carrName = this.getView().byId("input-carrname").getValue();
        var currCode = this.getView().byId("input-currcode").getValue();
        var url = this.getView().byId("input-url").getValue();

        var oModel = this.getView().getModel("data");

        var oNewEntry = {
          Carrid: carrId,
          Carrname: carrName,
          Currcode: currCode,
          Url: url,
        };

        oModel.create("/ZCARR_D08Set", oNewEntry, {
          success: function () {
            MessageToast.show("항공사 데이터가 성공적으로 생성되었습니다.");
            oModel.refresh();
          },
          error: function () {
            MessageToast.show("데이터 생성 오류");
          },
        });
      },

      onDelete() {
        var oDataTable = this.getView().byId("mTable");
        var selectedItem = oDataTable.getSelectedItem();
        var oModel = this.getView().getModel("data");

        if (!selectedItem) {
          MessageToast.show("삭제할 항목을 선택해주세요.");
        }

        var oContext = selectedItem.getBindingContext("data");

        var sPath = oContext.getPath();

        oModel.remove(sPath, {
          success: function () {
            MessageToast.show("데이터가 성공적으로 삭제되었습니다.");
            oDataTable.removeSelections();
          },
          error: function () {
            MessageToast.show("데이터 삭제에 실패했습니다.");
          },
        });
      },

      async onOpenDialog() {
        // create dialog lazily
        this.oDialog ??= await this.loadFragment({
          name: "exercise0807.view.Update",
        });
        var oDataTable = this.getView().byId("mTable");
        var selectedItem = oDataTable.getSelectedItem();
        var oContext = selectedItem.getBindingContext("data");
        this.oDialog.setBindingContext(oContext, "data");

        this.oDialog.open();
      },

      onCloseDialog() {
        // note: We don't need to chain to the pDialog promise, since this event handler
        // is only called from within the loaded dialog itself.
        this.byId("updateDialog").close();
      },

      onUpdate() {
        var oDataTable = this.getView().byId("mTable");
        var selectedItem = oDataTable.getSelectedItem();
        var oContext = selectedItem.getBindingContext("data");
        var oModel = this.getView().getModel("data");

        var sPath = oContext.getPath();
        // 데이터 변경할 부분이랑 데이터 받아온 부분분
        var updatedCarrname = this.byId("carrName").getValue();
        var updatedUrl = this.byId("url").getValue();
        var carrId = oContext.getObject().Carrid;
        var currCode = oContext.getObject().Currcode;

        var updateEntry = {
          Carrid: carrId,
          Carrname: updatedCarrname,
          Currcode: currCode,
          Url: updatedUrl,
        };

        oModel.update(sPath, updateEntry, {
          success: function () {
            MessageToast.show("데이터가 성공적으로 업데이트되었습니다.");
          }, // `this` 컨텍스트 유지
          error: function () {
            MessageToast.show("데이터 업데이트에 실패했습니다.");
          },
        });

        this.oDialog.close();
      },
    });
  }
);
