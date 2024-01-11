sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/viz/ui5/data/FlattenedDataset",
    "sap/viz/ui5/controls/common/feeds/FeedItem"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, FlattenedDataset, FeedItem) {
        "use strict";

        return Controller.extend("project1510.controller.Main", {
            onInit: function () {
                var oData={
                    list: [
                        { name: 'hsa', rate: '35', cost:'10'},
                        { name: 'hsb', rate: '15', cost:'12'},
                        { name: 'hsc', rate: '10', cost:'11'},
                        { name: 'hsd', rate: '15', cost:'15'},
                        { name: 'hse', rate: '20', cost:'10'},
                        { name: 'hsf', rate: '5', cost:'16'},
                    ]
                };

                this.getView().setModel(new JSONModel(oData),'view');
                
                var oPop = this.byId("idPopover");
                oPop.connect(this.byId("idLineChart").getVizUid());

                this._setChartInController(); //컨트롤러 내 다른 함수 실행 시 
            },

            _setChartInController: function() {
                var oData = {
                    sales : [
                        { product: 'Jackets', amount: '65'},
                        { product: 'Shirts', amount: '70'},
                        { product: 'Pants', amount: '83'},
                        { product: 'Cookies', amount: '92'},
                        { product: 'Hamburgers', amount: '77'},

                    ]
                };
                this.getView().setModel(new JSONModel(oData), 'cont');

                //chart
                var oColFrame = this.byId("idColChart");

                // dataset
                var oColDataset = new FlattenedDataset({
                    dimensions: [
                        {
                            name: 'Product', //카테고리명
                            value: '{cont>product}' //데이터 정보
                        }
                    ],
                    measures: [
                        {
                            name: 'Amount',
                            value: '{cont>amount}'
                        }
                    ],
                    data: {
                        path: 'cont>/sales',
                    }
                });

                oColFrame.setDataset(oColDataset);

                var feedColValueAxis = new FeedItem({
                    uid: 'valueAxis',
                    type: 'Measure',
                    values: ['Amount']
                });

                var feedColCategoryAxis = new FeedItem({
                    uid: 'categoryAxis',
                    type: 'Dimension',
                    values: ['Product']
                });

                oColFrame.addFeed(feedColValueAxis);
                oColFrame.addFeed(feedColCategoryAxis);

                oColFrame.setVizProperties({
                    title: {text: '두번째 차트'}
                });


            },
        });
    });
