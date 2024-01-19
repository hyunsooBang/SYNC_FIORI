sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    //순서 중요
    function (Controller, Fragment) {
        "use strict";

        return Controller.extend("project1506.controller.Main", {
            onInit: function () {

            },

            //hellofrag.fragment.xml 안에 있는 버튼 이벤트
            HelloButtonPress: function () {
                var name = this.byId("FInput").getValue();
                name ? alert(`fragment view 실습 ${name}!`) : sap.m.MessageToast.show("빈칸을 채워주세요");
                
            },
            onOpenDialog: function() {
                this.byId("idDialog").open();
            },

            //button의 press 이벤트
            //이벤트 함수는 이벤트 객체 oEvent 받아옴
            onClose: function(oEvent) {
                // getSource() 이벤트 생성 객체가 리턴됨
                //this.byId("idDialog").close(); //간단하게 close -> 뷰에서 Dialog 생성 시
                sap.ui.getCore().byId('idDialog').close(); //core에 가서 직접 가져옴
                oEvent.getSource().getParent().close(); //버튼의 parent 찾아 close
                sap.ui.getCore().byId('idDialogName').close();
            },

            onOpenDialog_con: function() {
                var dialog = sap.ui.getCore().byId('idDialog');
                dialog 
                ? dialog.open() 
                : Fragment.load({
                    name: "project1506.view.fragment.Dialog", //경로
                    type: "XML", //default
                    controller: this
                }).then(function(oDialog){
                    oDialog.open();
                }); //id 중복 문제로 load Dialog는 한 번만 호출
                
            },

            onOpenDialog_con2: function() {
                var dialog = sap.ui.getCore().byId('idDialogName');
                dialog 
                ? dialog.open() 
                : Fragment.load({
                    name: "project1506.view.fragment.Name", //경로
                    type: "XML",
                    controller: this
                }).then(function(oDialog){
                    oDialog.open();
                });
                
            },

            

        });
    });
