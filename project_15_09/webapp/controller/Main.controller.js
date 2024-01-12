sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, FilterOperator, JSONModel, Fragment) {
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
                this.oRouter = this.getOwnerComponent().getRouter();
                
               
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
                this.byId('idCustomer').open();
                
            },
            onClose: function(){
                this.byId('idCustomer').close();
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
                // 상대경로 지정된 데이터 셋에서 선택한 row 모델 경로 
                var sPath = oEvent.getParameters().listItem.getBindingContextPath();
                // 모델 경로 통해 해당 경로의 전체 데이터 얻음 (화면에 보이지 않아도 전체 객체 데이터 有)
                var oSelectData = this.getView().getModel().getProperty(sPath);

                this.oRouter.navTo('RouteDetail', {
                    OrderID: oSelectData.OrderID,
                    
                }, true);
                
                //alert(oSelectData.OrderID);
                // local 모델에 데이터를 담아두면 Dialog에서도 사용 가능
                // local 이름의 JSONModel이 전역으로 사용할 수 있도록 생성되어 있음
                // 주의) Fragment.load()를 통해서 팝업 호출 시 해당 팝업에 모델 데이터를 띄우기 위해선 
                // 호출된 Dialog에 .selModel(모델객체) 해줘야함

                
            }
        });
    });
