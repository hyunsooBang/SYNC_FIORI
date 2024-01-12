sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("project1512.controller.NotFound", {
            onInit: function () {
                this.oRouter=this.getOwnerComponent().getRouter();
                var oTarget = this.oRouter.getTarget("NotFound");
                oTarget.attachDisplay(this._onAttachDisplay, this);
            },

            _onAttachDisplay: function(oEvent) {
                // 해당 타겟으로 넘겨질 때 받았던 파라미터 값이 data에 들어있음
                // "data" 값을 controller 내부에서 사용할 수 있도록 변수에 담아줌
                this._oData = oEvent.getParameter("data");

            },
            onNavBack: function() {
                if(this._oData && this._oData.fromTarget) {
                    this.oRouter.getTargets().display(this._oData.fromTarget);
                    delete this._oData.fromTarget;
                    return; //함수종료
                }
                window.history.go(-1); // 뒤로가기


            }
        
        });
    });
