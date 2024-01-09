sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, FilterOperator, JSONModel) {
        "use strict";

        return Controller.extend("odata.project1509.controller.Main", {
            onInit: function () {
                var oData={
                    OrderID: '',
                    CustomerID: '',
                    OrderDate_start: null,
                    OrderDate_end: null
                }
                this.getView().setModel(new JSONModel(oData), 'search');

            },
            fnDateToString: function(sValue) {
                if(sValue) {
                    var oFormat = sap.ui.core.format.DateFormat.getDateInstance({
                        pattern: 'yyyy-MM-dd'
                    });

                    return oFormat.format(sValue); //날짜 패턴화 2023-01-09
                }
            },
            onValueHelpRequest: function() {
                sap.m.MessageToast.show('I am Hungry');
            },
            onSearch: function() {
                //로컬에 모델 세팅해서 id 데이터 한 번에 가져오기
                var oSearchData = this.getView().getModel('search').getData();
                
                // oSearchData{OrderId: '' .....}
                console.log(oSearchData.OrderID);
                // ############### filters 사용 시 ################
                var sOrderID = this.byId("idOrderID").getValue();
                var sCustomerID = this.byId("idCustomerID").getValue();
                var sDate1 = this.byId("idOrderDate").getDateValue();
                var sDate2 = this.byId("idOrderDate").getSecondDateValue();
                var aFilter =[];
                

                if(oSearchData.OrderID) aFilter.push(new Filter('OrderID','EQ',oSearchData.OrderID));
                if(oSearchData.CustomerID) aFilter.push(new Filter('CustomerID','Contains',oSearchData.CustomerID));
                if(oSearchData.OrderDate_start&&oSearchData.OrderDate_end) aFilter.push(new Filter('OrderDate','BT',oSearchData.OrderDate_start, oSearchData.OrderDate_end));
                this.byId("idProductsTable").getBinding("items").filter(new Filter({
                    filters: aFilter,
                    and: false
                }));
                
            },
            onSelectionChange: function(oEvent) {
                //oEvent.getParameters().listItem.getBindingContextPath() 
                //-> key (/Orders(10249))
            }
        });
    });
