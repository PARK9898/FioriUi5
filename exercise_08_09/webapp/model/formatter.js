sap.ui.define(["sap/ui/core/format/DateFormat"], function (DateFormat) {
  "use strict";

  return {
    formatDate: function (sValue) {
      var oDateFormat = DateFormat.getDateInstance({
        pattern: "yyyy/MM/dd",
      });

      var oDate = new Date(sValue);

      return oDateFormat.format(oDate);
    },

    isFutureMonth: function (sValue) {
      var oDate = new Date(sValue);
      var birthMonth = oDate.getMonth() + 1;
      var currentMonth = new Date().getMonth() + 1;

      return birthMonth >= currentMonth ? "Favorite" : "Flagged";
    },
  };
});
