sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/odata/v2/ODataModel",
    "sap/m/MessageToast",
    "sap/ui/core/format/DateFormat",
  ],
  (Controller, ODataModel, MessageToast, DateFormat) => {
    "use strict";

    return Controller.extend("cl4.exprogramd08.controller.Main", {
      onInit() {
        // 데이터 모델 세팅 (Odata)
        var oModel = new ODataModel("/sap/opu/odata/sap/ZEXAM_MEMBER_D08_SRV/");
        oModel.setSizeLimit(20000);
        this.getView().setModel(oModel, "data");
        // 라우터 세팅팅
        this.oRouter = this.getOwnerComponent().getRouter();
        this.oRouter
          .getRoute("RouteMain")
          .attachPatternMatched(this._onPatternMatched, this);
      },
      async onCreatePress() {
        // 다이얼로그 async 방식으로 생성성
        this.oDialog ??= await this.loadFragment({
          name: "cl4.exprogramd08.view.Create",
        });
        // 해당 다이얼로그 열기기
        this.oDialog.open();
      },
      // 다이얼로그 닫기기
      onCloseDialog() {
        this.getView().byId("createDialog").close();
      },
      onCreate() {
        // create 할 때 형식이 안맞음으로 뒤에 문자열을 더해서 형식을 맞춰준다다
        var Bdate = this.getView().byId("Bdate").getValue() + "T00:00:00";
        const oModel = this.getView().getModel("data");
        // create할 입력값 Entry에 세팅해주기
        const oEntry = {
          Name: this.getView().byId("Name").getValue(),
          Bdate: Bdate,
          Gender: this.getView().byId("Gender").getValue(),
          City: this.getView().byId("City").getValue(),
          Country: this.getView().byId("Country").getValue(),
          Telephone: this.getView().byId("Telephone").getValue(),
          Email: this.getView().byId("Email").getValue(),
        };
        // 필수값이 비어있을 경우에 필수값 입력 요구 Message Toast
        if (
          oEntry.Name === "" ||
          oEntry.Bdate === "" ||
          oEntry.Gender === "" ||
          oEntry.City === "" ||
          oEntry.Country === "" ||
          oEntry.Telephone === "" ||
          oEntry.Email === ""
        ) {
          MessageToast.show("필수값을 입력하세요");
          return;
        }
        // 입력값을 기반으로 데이터 생성
        oModel.create("/ZTMEMBERSet", oEntry, {
          success: () => {
            //회원 정보 저장 성공시 MessageToast
            MessageToast.show("회원 정보가 저장되었습니다");
            this.onCloseDialog();
          },
          error: () => {
            MessageToast.show("회원 정보가 저장 실패");
          },
        });
      },

      onGoDetail(oEvent) {
        // 선택된 데이터 가져오기
        var oSelectedData = oEvent
          .getSource()
          .getBindingContext("data")
          .getObject();
        // 년도 가져오기
        var year = oSelectedData.Bdate.getFullYear();
        // 달 가져오기
        var month = oSelectedData.Bdate.getMonth() + 1;
        // 날짜가져오기기
        var date = oSelectedData.Bdate.getDate();
        // 월 부분이 10보다 작으면 한자리로 나오기에 0을 앞에 붙여서 2자리로 만들어주기기
        if (month < 10) {
          month = "0" + month;
        }
        // 위와 같은 방식식
        if (date < 10) {
          date = "0" + date;
        }
        // date 형식 맞춰주기
        var Bdate = year + "-" + month + "-" + date;
        // 파라미터 설정
        var oParams = {
          Id: oSelectedData.Id,
          Name: oSelectedData.Name,
          Bdate: Bdate,
          Gender: oSelectedData.Gender,
          City: oSelectedData.City,
          Country: oSelectedData.Country,
          Telephone: oSelectedData.Telephone,
          Email: oSelectedData.Email,
        };
        // 파라미터와 함께 DetailView로 전달달
        this.oRouter.navTo("RouteDetail", oParams, true);
      },
    });
  }
);
