/* global QUnit */
// https://api.qunitjs.com/config/autostart/
QUnit.config.autostart = false;

sap.ui.require([
	"sync_d08/exercised08_05/test/unit/AllTests"
], function (Controller) {
	"use strict";
	QUnit.start();
});