sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/json/JSONModel",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, FilterOperator, JSONModel,) {
        "use strict";

        return Controller.extend("sap.btp.ux410solving15.controller.Main", {
            onInit: function () {
                var oData={
                    type: [ 
                        {items: 'bar'},
                        {items: 'column'},
                        {items: 'line'},
                        {items: 'donut'},
                    ]
                }
                this.getView().setModel(new JSONModel(oData), 'typeList');
                this.oRouter = this.getOwnerComponent().getRouter();
                
            },
            onSearch: function(oEvent) {
                var orderID = this.byId("comboID").getSelectedKey();
                var typeID = this.byId("comboID2").getSelectedKey();
                
                if(typeID) {
                    this.byId("comboID2").setValueState("None");
                    this.byId("idLineChart").setVizType(typeID);

                    var aFilter =[];
                    if(orderID) aFilter.push(new Filter('OrderID','EQ', orderID));
                    
                    if(aFilter.length) {
                        //nodata 문제 해결
                        this.byId("FlattendId").getBinding("data").filter(new Filter({
                            filters: aFilter,
                            and: false
                        }));
                    }else{
                        this.byId("FlattendId").getBinding("data").filter();
                    }
                   
                }else{
                    this.byId("comboID2").setValueState("Error");
                    this.byId("comboID2").setValueStateText("Invaild Entry");
                }                
                
                
                
            },
            onSelectedData: function(oEvent){
                var oSelectData = oEvent.getParameters().data[0].data;

                this.oRouter.navTo('RouteDetail', {
                     OrderID: oSelectData["Order ID"],
                     ProductID: oSelectData["Product ID"]
                }, true);
            },
            
            
        });
    });
