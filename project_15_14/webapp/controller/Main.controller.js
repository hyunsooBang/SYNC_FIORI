sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/ui/core/Fragment",
    "sap/ui/model/Filter",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, MessageBox,Fragment, Filter) {
        "use strict";

        return Controller.extend("project1514.controller.Main", {
            onInit: function () {
                var oData={
                    "Memid" : "",
                    "Memnm" : "",
                    "Telno" : "",
                    "Email" : ""
                };
                this.getView().setModel(new JSONModel(oData), 'data');
                

            },
            onRowSelectionChange: function(oEvent) {
                //row 선택 해제 시에도 선택된 것이기 때문에 이벤트 발생 -> rowContext 없을 땐 함수 종료
                if(!oEvent.getParameter('rowContext')) return;
                //모델 데이터 get 후 각 input에 세팅
                // json model에 세팅해보기 
                var sPath = oEvent.getParameter('rowContext').sPath;
                var oSelectData = this.getView().getModel().getProperty(sPath);

                var oModel = this.getView().getModel('data'); //모델 뷰에서 가져오기
                
                oModel.setData({
                    "Memid" : oSelectData.Memid,
                    "Memnm" : oSelectData.Memnm,
                    "Telno" : oSelectData.Telno,
                    "Email" : oSelectData.Email
                });

            },
            onReset: function(){
                this.getView().getModel('data').setData();
                this.byId("idTable").clearSelection();
                this.getView().getModel().refresh(true); //모델 리셋
            },
            onRead: function(){
                var oPopover = this.byId("myPopover");
                var oPopoverModel = oPopover.getModel('popover');
                
                var oFilter = new Filter("Memnm","Contains", oPopoverModel.getData().Memnm);
                var oDataModel = this.getView().getModel();

                oDataModel.read('/Ztmember_sb15Set', {
                    urlParameters: {
                        "$expand":"WorkSet",
                        "$select":"Memid,WorkSet"
                     },
                    filters:[oFilter],
                    success: function(oReturn) {
                        console.log("전체조회: ", oReturn);
                    },
                    error: function(oError){
                        console.log('error',oError)
                    }
                });

                
                

            },
            onEntity: function(){
                var oDataModel = this.getView().getModel();
                var sPath = oDataModel.createKey("/Ztmember_sb15Set",{
                    "Memid" : this.getView().getModel('data').getData().Memid
                });
                oDataModel.read(sPath, {
                    success: function(oReturn) {
                        console.log("한건 조회",oReturn)
                    }
                });
            },
            onEntitySet: function(oEvent) {
                // 전체 조회 구현
                // get 요청: "/Ztmember_sb15Set"
                var oDataModel = this.getView().getModel();

                var oButton = oEvent.getSource(),
				    oView = this.getView();

                // create popover
                if (!this._pPopover) {
                    this._pPopover = Fragment.load({
                        id: oView.getId(), //this.byId로 접근 가능 if not sap.ui.getCore().byId
                        name: "project1514.view.fragment.Popover",
                        controller: this
                    }).then(function(oPopover) {
                        oPopover.setModel(new JSONModel(),'popover')
                        oView.addDependent(oPopover);
                        return oPopover;
                    });
                }
                this._pPopover.then(function(oPopover) {
                    oPopover.openBy(oButton);
                });

                // //entitySet, object
                // oDataModel.read('/Ztmember_sb15Set', {
                //     success: function(oReturn) {
                //         console.log("전체조회: ", oReturn);
                        
                //     }.bind(this),
                //     error: function(oError) {
                //         console.log("전체조회 중 에러 발생: " , oError)
                //     }
                // });
            },
            onCreate: function() {
                //데이터 생성
                //Post 요청 :  "/Products" + body
                var oDataModel = this.getView().getModel();
                var oJSONData = this.getView().getModel('data').getData();
                var oBody={
                    "Memid" : oJSONData.Memid,
                    "Memnm" : oJSONData.Memnm || "",
                    "Telno" : oJSONData.Telno || "",
                    "Email" : oJSONData.Email || ""
                    //WorkSet: [
                    //    {},{}...
                    //]
                }; //json 바로 넣어도 됨
                oDataModel.create('/Ztmember_sb15Set', oBody, {
                    success: function() {
                        this._showMessage('S','데이터 생성 완료');
                    }.bind(this), //컨트롤러 바라보도록
                    error: function(oError) {
                        this._showMessage('E','에러가 발생했습니다.');
                    }.bind(this)
                });
            }, 
            _showMessage: function(status,msg) {
                switch(status){
                    case 'S':
                        sap.m.MessageBox.success(msg);
                        break;
                    case 'E':
                        sap.m.MessageBox.error(msg);
                        break;
                    default:
                        break;
                }
                
            },
            onUpdate: function() {
                //데이터 변경
                //put 요청: "/Products('1000')" + Body
                var oDataModel = this.getView().getModel();
                var oBody=this.getView().getModel('data').getData();
                var sPath = oDataModel.createKey("/Ztmember_sb15Set",{
                    "Memid" : oBody.Memid
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
                
                var sPath = oDataModel.createKey("/Ztmember_sb15Set",{
                    "Memid" : oJSONData.Memid
                });
                oDataModel.remove(sPath, {
                    success: function(oReturn) {
                        console.log("삭제",oReturn)
                    }
                });


            },
            
        });
    });
