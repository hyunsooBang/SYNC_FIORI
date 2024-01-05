sap.ui.define([
    "sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("project1507.controller.Main", {
            onInit: function () {
                 var oData = { 
                    name: {
                        firstName : 'Hyunsoo',
                        lastName: 'Bang'
                    },
                    datas : [
                        { name: 'Kim', age: 30, tel: '010-1234-5678' },
                        { name: 'Park', age: 12, tel: '010-1234-1111' },
                        { name: 'Lee', age: 23, tel: '010-1111-5678' },
                    ]
                 };

                
                var oModel2 = new JSONModel(oData); //json model 객체 생성
                this.getView().setModel(oModel2, "test"); //test라는 이름의 모델
 

                // //new sap.ui.moder.json.JSONModel(); 일회성 생성
                var oModel = new JSONModel(); 
                oModel.loadData('../model/data.json', {}, false); //데이터 세팅
                this.getView().setModel(oModel); //view에 json model 세팅 (이름 없는 default model)
                
            },
            onChange: function() {
                var inputValue = this.byId("inputID").getValue();
                this.byId("textID").setText(` Hello ${inputValue} !`);
                oData.datas[0].name = inputValue;
            },
            onClick : function() {
                // var oModel = this.getView().getModel('local'); //모델 뷰에서 가져오기
                // var history = oModel.getData().history; // 모델 전체 데이터 가져오기 ("." 사용해 특정데이터 가져오기)
                // //oModel.getProperty('/history'); // "/" 사용해 특정 경로의 데이터 가져오기 더느림

                // history.push({num1: oInput1, oper: tsel, num2: oInput2, res: res});
                // oModel.setData(history,true);

                // oModel.selData(세팅할 데이터, 합치기여부 tf)
                // oModel.setProperty(대상경로, 바꿀값)


                var oModel = this.getView().getModel('test');
                var data = oModel.getData();
                var data2 = oModel.getProperty("/name/firstName");
                
                //oModel.setData({ name: 'Hong gildong'}, true);
                oModel.setProperty("/name/firstName","Park");
                console.log(oModel.getData());

                //debugger;

            },
        });
    })