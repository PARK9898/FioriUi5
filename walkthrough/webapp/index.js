// sap.ui.define(["sap/m/Text"], (Text) => {
//   "use strict";

//   new Text({
//     text: "Hello World",
//   }).placeAt("content");
// });

// SAP UI5 애플리케이션의 XML 뷰를 동적으로 생성하고 화면에 배치한다
// sap.ui.define(["sap/ui/core/mvc/XMLView"], (XMLView) => { // SAP UI5의 AMD(비동기 모듈 정의) 패턴을 사용하여 XML 뷰 모듈을 가져옴
//   "use strict"; // 오류 발생 감지

//   XMLView.create({ // XML기반 UI 생성
//     viewName: "ui5.walkthrough.view.App", // 이걸로 뷰를 생성
//   }).then((oView) => oView.placeAt("content")); // App.vuew.xml가 성공적으로 생성되면 실행
// });

// sap.ui.define(["sap/ui/core/ComponentContainer"], (ComponentContainer) => {
//   "use strict";

//   new ComponentContainer({
//     name: "ui5.walkthrough",
//     settings: {
//       id: "walkthrough",
//     },
//     async: true,
//   }).placeAt("content");
// });
