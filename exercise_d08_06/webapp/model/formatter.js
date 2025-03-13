sap.ui.define(["sap/ui/core/format/DateFormat"], function (DateFormat) {
  "use strict";

  return {
    formatDate: function (sValue) {
      var oDateFormat = DateFormat.getDateInstance({
        pattern: "yyyy/MM/dd",
      });

      var oDate = new Date(
        sValue.substring(0, 4),
        sValue.substring(4, 6) - 1,
        sValue.substring(6, 8)
      );

      return oDateFormat.format(oDate);
    },

    isFutureMonth: function (sValue) {
      var birthMonth = parseInt(sValue.substring(4, 6), 10);
      var currentMonth = new Date().getMonth() + 1;

      return birthMonth >= currentMonth ? "Favorite" : "flagged";
    },
  };
});
