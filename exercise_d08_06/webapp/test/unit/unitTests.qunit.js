/* global QUnit */
// https://api.qunitjs.com/config/autostart/
QUnit.config.autostart = false;

sap.ui.require([
	"cl4_student_information/exercise_d08_06/test/unit/AllTests"
], function (Controller) {
	"use strict";
	QUnit.start();
});