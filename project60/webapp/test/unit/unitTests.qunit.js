/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"exrate_compare_with_vou_item/project60/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
