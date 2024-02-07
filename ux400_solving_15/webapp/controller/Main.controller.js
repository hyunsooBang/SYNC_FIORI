sap.ui.define([
    "sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel) {
        "use strict";

        return Controller.extend("sap.btp.ux400solving15.controller.Main", {
            onInit: function () {
                var oData = {
                    number: [
                    ]
                };
                this.getView().setModel(new JSONModel(oData), "list"); 
                
            
            },

            onRandomPress: function() {
                this.byId("inputID").setValue(Math.floor(Math.random() * 100) + 1);
                var inputD = this.byId("inputID").getValue();
                
                var oModel = this.getView().getModel('list');
                var olist = oModel.getData().number;
                
                olist.push({randomNumber: inputD});
                oModel.setData(olist, true);
                
            },
            onOpenDialog: function() {
                this.byId("idProduct").open();
            },
            onClose: function(){
                this.byId('idProduct').close();
            },
            transformDiscontinued: function(sValue) {
                if(sValue) {
                    return "Yes"
                }else return "No"
            },
            onValueChange: function(){
                var changeValue = this.byId("inputID").getValue();

                var oModel = this.getView().getModel('list');
                var olist = oModel.getData().number;
                
                if(changeValue>=1&&changeValue<=100){
                    olist.push({randomNumber: changeValue});
                    oModel.setData(olist, true);
                }else{
                    
                    this.byId("inputID").setValueState("Error");
                    this.byId("inputID").setValueStateText("1이상 100이하의 숫자를 입력하세요");
                }
                
                
            }
        });
    });