sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("odata.project1513.controller.Main", {
            onInit: function () {
                var oData={
                    'Productno': "", 
                    'Productname': "", 
                    'Fname': "", 
                    'Lname': "", 
                    'Memo': ""
                }
                this.getView().setModel(new JSONModel(oData), 'data');
                
            },
            onRowSelectionChange: function(oEvent) {
                //모델 데이터 get 후 각 input에 세팅
                // json model에 세팅해보기 
                var sPath = oEvent.getParameter('rowContext').sPath;
                var oSelectData = this.getView().getModel().getProperty(sPath);

                var oModel = this.getView().getModel('data'); //모델 뷰에서 가져오기
                
                oModel.setData( {
                    'Productno': oSelectData.Productno, 
                    'Productname': oSelectData.Productname, 
                    'Fname': oSelectData.Fname, 
                    'Lname': oSelectData.Lname, 
                    'Memo': oSelectData.Memo
                            });

            },
            onReset: function(){
                this.getView().getModel('data').setData();
                this.byId("idTable").clearSelection();
                this.getView().getModel().refresh(true); //모델 리셋
            },
            onEntitySet: function() {
                // 전체 조회 구현
                // get 요청: "/Products"
                var oDataModel = this.getView().getModel();

                //entitySet, object
                oDataModel.read('/Products', {
                    filters:[/*필터 객체 배열*/],
                    success: function(oReturn) {
                        console.log("전체조회: ", oReturn);
                    },
                    error: function(oError) {
                        console.log("전체조회 중 에러 발생: " , oError)
                    }
                });
            },
            onEntity: function() {
                //데이터 한 건 조회
                // get요청 "/Products(ProductNo='1')"
                var oDataModel = this.getView().getModel();
                var sPath = oDataModel.createKey("/Products",{
                    "Productno" : this.getView().getModel('data').getData().Productno
                });
                oDataModel.read(sPath, {
                    success: function(oReturn) {
                        console.log("한 건 조회",oReturn)
                    }
                });
            },
            onCreate: function() {
                //데이터 생성
                //Post 요청 :  "/Products" + body
                var oDataModel = this.getView().getModel();
                var oJSONData = this.getView().getModel('data').getData();
                var oBody={
                    'Productno': oJSONData.Productno, 
                    'Productname': oJSONData.Productname || "", 
                    'Fname': oJSONData.Fname || "", 
                    'Lname': oJSONData.Lname || "", 
                    'Memo': oJSONData.Memo || ""
                }; //json 바로 넣어도 됨
                oDataModel.create('/Products', oBody, {
                    success: function() {
                        sap.m.MessageToast.show("데이터 생성 완료");
                    },
                    error: function(oError) {
                        console.log("데이터 생성 중 에러 발생: " , oError)
                    }
                });
            },
            onUpdate: function() {
                //데이터 변경
                //put 요청: "/Products('1000')" + Body
                var oDataModel = this.getView().getModel();
                var oBody=this.getView().getModel('data').getData();
                var sPath = oDataModel.createKey("/Products",{
                    "Productno" : oBody.Productno
                });
                
                oDataModel.update(sPath, oBody,{
                    success: function() {
                        sap.m.MessageToast.show("데이터 업데이트 완료")
                    }
                });
            },

            onDelete: function() {
                //데이터 삭제
                //delete 요청: "/Products('1000')"
                var oDataModel = this.getView().getModel();
                var oJSONData = this.getView().getModel('data').getData();
                
                var sPath = oDataModel.createKey("/Products",{
                    "Productno" : oJSONData.Productno
                });
                oDataModel.remove(sPath, {
                    success: function(oReturn) {
                        console.log("삭제",oReturn)
                    }
                });


            },
            
        });
    });
