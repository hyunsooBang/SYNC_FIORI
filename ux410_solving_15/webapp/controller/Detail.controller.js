sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("sap.btp.ux410solving15.controller.Detail", {
            onInit: function () {
                //onInit 한번만 실행 
                this.oRouter = this.getOwnerComponent().getRouter();
                this.oRouter.getRoute("RouteDetail").attachPatternMatched(this._onPatternMatched, this);

            },
            //일치 할 때마다 실행
            _onPatternMatched: function(oEvent) {
                // RouteDetail 라우트 객체의 Pattern이 일치할 때마다 해당 이벤트 실행
                var oArgu = oEvent.getParameter('arguments');
                //this.byId("textID").setText(oArgu.OrderID);
                //폼에 상대경로로 바인딩
                // /EntitySetName(key='1', key='2')
                // /EntitySetName('1')
                // /Orders(1-248)
                
                var string = '/Order_Details(OrderID='+oArgu.OrderID+', ProductID='+oArgu.ProductID+')';
                this.byId("page").bindElement(string);

                
            },

            onNavBack: function(){
                //URL parameter로 넘기는 데이터가 많으면
                // JSONModel을 사용하는게 url 길이제한땜에 조흠
                this.oRouter.navTo('RouteMain');
            }
        });
    });
