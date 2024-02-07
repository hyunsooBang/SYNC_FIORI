sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,Filter,JSONModel,Fragment) {
        "use strict";

        return Controller.extend("exam.exprogram15.controller.Detail", {
            onInit: function () {
                //onInit 한번만 실행 
                
                this.oRouter = this.getOwnerComponent().getRouter();
                this.oRouter.getRoute("RouteDetail").attachPatternMatched(this._onPatternMatched, this);
                this.getView().setModel(new JSONModel(), 'details');
                
                
            },
            //일치 할 때마다 실행
            _onPatternMatched: function(oEvent) {
                // RouteDetail 라우트 객체의 Pattern이 일치할 때마다 해당 이벤트 실행
                var oArgu = oEvent.getParameter('arguments');
                this.byId("idProductsTable2").setHeaderText(oArgu.ProductName+" 상품의 주문 조회");
                
                var oFilter = new Filter("ProductName","EQ", oArgu.ProductName);
                var oDataModel = this.getView().getModel();
                var oModel = this.getView().getModel('details');
                

                oDataModel.read('/Order_Details_Extendeds', {
                    filters:[oFilter],
                    success: function(oReturn) {
                        oReturn.results.sort(function(a, b) {
                            return a.ExtendedPrice - b.ExtendedPrice;
                          });
                        
                        oModel.setData(oReturn);

                    },
                    error: function(oError){
                        console.log('error',oError);
                    }
                });



                
            },
            //추가기능 ~ 밑으로 쭉
            onSelectionChangeDetail: function(oEvent){
                if(!oEvent.getParameters().listItem.getBindingContextPath()) return;
                var sPath = oEvent.getParameters().listItem.getBindingContextPath();
                console.log('path'+sPath);

                var oSelectData = this.getView().getModel('details').getProperty(sPath);
               
                var oFilter = new Filter("OrderID","EQ", oSelectData.OrderID);
                

                var oDataModel = this.getView().getModel();
                
                oDataModel.read('/Orders', {
                    
                    filters:[oFilter],
                    success: function(oReturn) {
                        var dialog = sap.ui.getCore().byId('idDialog');
                        if(dialog){
                            dialog.getModel('dialog').setData(oReturn);
                            dialog.open();
                            
                            sap.ui.getCore().byId('SimpleForm').setTitle('Order ID: '+oReturn.results[0].OrderID
                                );
                        }
                        else{
                            Fragment.load({
                                name: "exam.exprogram15.view.fragment.Dialog", //경로
                                type: "XML", //default
                                controller: this
                            }).then(function(oDialog){
                                oDialog.setModel(new JSONModel(oReturn),'dialog');
                                oDialog.open(); 
                                
                                sap.ui.getCore().byId('SimpleForm').setTitle('Order ID: '+oReturn.results[0].OrderID);
                                
                            }); //id 중복 문제로 load Dialog는 한 번만 호출
                        } 
                    
                    }.bind(this),
                    error: function(oError){
                        console.log('error',oError)
                    }
                });
                
                
            },
            onClose: function(oEvent) {
                sap.ui.getCore().byId('idDialog').close(); //core에 가서 직접 가져옴
                oEvent.getSource().getParent().close(); //버튼의 parent 찾아 close
              
            },
            fnDateToString: function(sValue) {
                if(sValue) {
                    var oFormat = sap.ui.core.format.DateFormat.getDateInstance({
                        pattern: 'dd. MMMM. yyyy'
                    });

                    return oFormat.format(sValue); //날짜 패턴화 2023-01-09
                }
            }, //여기까지 추가기능

            onNavBack: function(){
                
                
                // 
                // // this.byId("idProductsTable").rememberSelections(false); //메인
                // this.byId("idLineChart").setDataset(); //차트
                // this.byid("idInput1").setValue();
                // this.byid("idInput2").setValue();
                // console.log(sap.ui.getCore().byId("idInput2").getValue());
                
                this.getView().getModel().refresh(true); //모델 리셋
                this.oRouter.navTo('RouteMain');
            }
        });
    });
