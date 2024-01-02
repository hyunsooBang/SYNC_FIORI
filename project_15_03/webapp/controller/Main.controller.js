sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("project1503.controller.Main", {
            onInit: function () {

            },
            onclick: function(){
                var inputValue = this.getView().byId("inputID").getValue();
                this.getView().byId("textID").setText(inputValue);
            },
            onclickRevert: function(){
                this.getView().byId("inputID").setValue("");
                this.getView().byId("textID").setText("");
            }

            
        });
    });
