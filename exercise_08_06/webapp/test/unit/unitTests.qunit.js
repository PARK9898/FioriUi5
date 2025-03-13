/* global QUnit */
// https://api.qunitjs.com/config/autostart/
QUnit.config.autostart = false;

sap.ui.require([
	"student_program/exercise_08_06/test/unit/AllTests"
], function (Controller) {
	"use strict";
	QUnit.start();
});