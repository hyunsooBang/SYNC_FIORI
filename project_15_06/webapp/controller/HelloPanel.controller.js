sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("project1506.controller.HelloPanel", {
            onInit: function () {

            },
            onShowHello: function () {
                var name = this.byId("inputName").getValue();
                name ? alert(`hiiiiiiii ${name}!`) : sap.m.MessageToast.show("이름을 입력하세요");
                
            }
        });
    });
