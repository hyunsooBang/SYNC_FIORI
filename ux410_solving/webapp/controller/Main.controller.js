sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/json/JSONModel",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,Filter,JSONModel) {
        "use strict";

        return Controller.extend("sap.btp.ux410solving.controller.Main", {
            onInit: function () {
                oData={
                    "type": [
                        {"key":""}
                    ]
                }
            },
            onSearch: function() {
                var selectedKey = this.byId("idCombo").getSelectedKey();
                var aFilter=[];

                if(selectedKey) aFilter.push(new Filter('OrderID','EQ',selectedKey));
                if(aFilter.length>0){
                    this.byId("FlattendData").getBinding("data").filter(new Filter({
                        filters: aFilter,
                        and: false
                    }));
                }else {
                    this.byId("FlattendData").getBinding("data").filter();
                }
                }
                

        });
    });
