sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/Button"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Button) {
        "use strict";

        return Controller.extend("project1501.controller.Main", {
            onInit: function () {
                //초기화 함수, 초기값 설정 및 화면에서 사용할 모델 생성
                //하단의 함수들이 사용할 공통 변수 등 세팅
                //new Button -> 객체 생성 // not new.sap.m.Button
            },

            onBeforeRendering: function() { /*화면 그려지기 전 실행*/ },

            onAfterRendering: function() { /*화면 그려진 후 실행*/ },

            onExit: function() { /*화면 종료되면 실행*/ },

            onClick: function () {
                //객체 가져오기
                var oInput1 = parseInt(this.getView().byId("idInput1").getValue()); //컨트롤러와 연결된 뷰의 컨트롤id
                var oInput2 = parseInt(this.getView().byId("idInput2").getValue()); //컨트롤러와 연결된 뷰의 컨트롤id
                var selected = this.getView().byId("select").getSelectedKey();
                //선택된 key 출력

                switch(selected) {
                    case 'plus':
                        alert(oInput1+oInput2);
                        break;
                    case 'minus':
                        alert(oInput1-oInput2);
                        break;
                    case 'multiply':
                        alert(oInput1*oInput2);
                        break;
                    case 'divide':
                        alert(oInput1/oInput2);
                        break;
            }
                
                //this - 컨트롤러, getView - 컨트롤러 메서드, byId - 뷰 메서드, getValue - input 메서드
            }
        });
    });

    
