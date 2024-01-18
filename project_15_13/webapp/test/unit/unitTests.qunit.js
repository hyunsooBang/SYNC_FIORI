/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"odata/project_15_13/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
