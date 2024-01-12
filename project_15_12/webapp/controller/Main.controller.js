sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("project1512.controller.Main", {
            onInit: function () {
                // 상위 컴포넌트에 접근해서 라우터 가져옴
                this.oRouter = this.getOwnerComponent().getRouter();
                this.oRouter.getRoute('RouteMain').attachPatternMatched(this._onPatternMatched, this);
            },

            _onPatternMatched: function(oEvent){
                var oArgu = oEvent.getParameter('arguments');
                console.log("Main: ", oArgu["?query"].test);


            },

            onGoDetail: function(){
                this.oRouter.navTo('RouteDetail', {
                    key1: 'okok',
                    key2: 123
                }, true);
                // .navTo('라우트 객체 이름(name)', {파라미터 정보}, history 초기화)
            },

            onGoEmployee: function(){
                this.oRouter.navTo('RouteEmployee' , {
                    key1: 'employee',
                }, true);
                // .navTo('라우트 객체 이름(name)', {파라미터 정보}, history 초기화)
            },

            onGoNotFound: function(){
                this.oRouter.getTargets().display("NotFound", {
                    fromTarget: 'TargetMain'
                });
            }
            
        });
    });
