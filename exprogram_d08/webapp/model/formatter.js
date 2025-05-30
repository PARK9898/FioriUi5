sap.ui.define(["sap/ui/core/format/DateFormat"], function (DateFormat) {
  "use strict";

  return {
    formatDate: function (sValue) {
      var oDateFormat = DateFormat.getDateInstance({
        pattern: "yyyy-MM-dd",
      });
      var oDate = new Date(sValue);
      return oDateFormat.format(oDate);
    },
  };
});
