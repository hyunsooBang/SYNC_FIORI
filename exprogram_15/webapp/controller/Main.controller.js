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

        return Controller.extend("exam.exprogram15.controller.Main", {
            onInit: function () {
                
                this.getView().setModel(new JSONModel(), 'product');
                this.getView().setModel(new JSONModel(), 'sales');
                this.oRouter = this.getOwnerComponent().getRouter();
                this.oRouter.getRoute("RouteMain").attachPatternMatched(this._onPatternMatched, this);
                
                
            },
            onSearch: function() {
                var inputID = this.byId("idInput1").getValue();
                var inputCa = this.byId("idInput2").getValue();
                var aFilter =[];
                

                if(inputID) aFilter.push(new Filter('CategoryID','GE',inputID));
                if(inputCa) aFilter.push(new Filter('CategoryName','Contains',inputCa));
                if(aFilter.length>1){
                    this.byId("idProductsTable").getBinding("items").filter(new Filter({
                        filters: aFilter,
                        and: true
                    }));
                }else{
                    this.byId("idProductsTable").getBinding("items").filter();
                     
                }
                
            },
            //일치 할 때마다 실행
            _onPatternMatched: function(oEvent) {
                
                
                this.byId("idInput1").setValue("");
                this.byId("idInput2").setValue("");
                this.getView().getModel('product').setData();
                this.getView().getModel('sales').setData();
                this.byId("uiTable").clearSelection(); //필터
                this.getView().getModel().refresh(true);
                this.byId("idProductsTable").removeSelections(); 
                this.byId("idProductsTable").getBinding("items").filter();
                


                
            },
            onSelectionChange: function(oEvent) {
                if(!oEvent.getParameters().listItem.getBindingContextPath()) return;
                var sPath = oEvent.getParameters().listItem.getBindingContextPath();
                var oSelectData = this.getView().getModel().getProperty(sPath);
                var oFilter = new Filter("CategoryID","EQ", oSelectData.CategoryID);
                
                var oModel = this.getView().getModel('product');
                var oModel2 = this.getView().getModel('sales');

                var oDataModel = this.getView().getModel();
                
                oDataModel.read('/Products', {
                    
                    filters:[oFilter],
                    success: function(oReturn) {
                        console.log(oReturn);
                        oModel.setData(oReturn);
                    
                    },
                    error: function(oError){
                        console.log('error',oError)
                    }
                });
                oDataModel.read('/Sales_by_Categories', {
                    
                    filters:[oFilter],
                    success: function(oReturn) {
                        console.log(oReturn);
                        oModel2.setData(oReturn);
                    
                    },
                    error: function(oError){
                        console.log('error',oError)
                    }
                });
                
                

                 
            },
            
            
            onSelectedDataChart: function(oEvent){
                var oSelectData = oEvent.getParameters().data[0].data;
                this.oRouter.navTo('RouteDetail', {
                    ProductName: oSelectData["Product Name"]
               }, true);
                
            },
        });
    });
