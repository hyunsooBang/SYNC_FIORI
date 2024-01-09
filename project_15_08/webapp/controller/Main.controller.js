sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("project1508.controller.Main", {
            onInit: function () {
                var oData = {
                    list: []
                };
                var oModel = new sap.ui.model.json.JSONModel(oData);
                this.getView().setModel(oModel);
            },
            onAdd: function() {
                var oModel = this.getView().getModel();
                var aList = oModel.getData().list;
                //var aList = oModel.getProperty("/list");
                aList.push({
                    // name: 'hi',
                    // age: 20
                }); //초기값 설정 or 빈객체 삽입
                oModel.setProperty("/list",aList);
                //oModel.setData({list: aList},true);

            },
            onRowDelete: function(oEvent) {
                var index = oEvent.getParameters().row.getIndex();
                var aList = this.getView().getModel().getData().list;
                
                //해당 index의 모델 데이터 삭제
                aList.splice(index,1);
                this.getView().getModel().setProperty("/list",aList);
            },
            onDelete: function() {
                var aList = this.getView().getModel().getData().list;
                var indexList = this.byId("tableID").getSelectedIndices();
            
                for(var i=indexList.length-1; i>=0; i--){
                    aList.splice(indexList[i],1);
                }
               
                this.getView().getModel().setProperty("/list",aList);
            },
        });
    });
