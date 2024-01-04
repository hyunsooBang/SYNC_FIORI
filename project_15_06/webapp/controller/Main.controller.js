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
            onClose: function() {
                //this.byId("idDialog").close(); //main view에서 가져옴
                sap.ui.getCore().byId('idDialog').close(); //core에 가서 직접 가져옴
            },

            onClose2: function() {
                sap.ui.getCore().byId('idDialogName').close(); //core에 가서 직접 가져옴
            },

            onOpenDialog_con: function() {
                var dialog = sap.ui.getCore().byId('idDialog');
                dialog 
                ? dialog.open() 
                : Fragment.load({
                    name: "project1506.view.fragment.Dialog", //경로
                    type: "XML",
                    controller: this
                }).then(function(oDialog){
                    oDialog.open();
                });
                
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
