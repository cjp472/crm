/**
 * @author wangzj
 * @createtime 2012年8月9日 11:25:26
 * @class ScBizOrderSalesFlowForm
 * @extends Ext.Window
 * @description 销售业务单表单
 * @company 优创融联科技
 */
ScBizOrderSalesFlowForm = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		ScBizOrderSalesFlowForm.superclass.constructor.call(this, {
					id : 'ScBizOrderSalesFlowFormWin',
					layout : 'form',
					items : [this.detailPanel,this.panel],
					modal : true,
					height : 400,
//					width : 500,
					anchor : '98%',
					maximizable : true,
					title : '销售业务单详细信息',
					buttonAlign : 'center',
					tbar : this.initToolbar()
				});
	},// end of the constructor
	// 初始化组件
	initUIComponents : function() {
		// 增加审核记录
		this.panel = new Ext.Panel();
		this.panel = new Ext.Panel({
					title : __allApprovalInfo,
					autoScroll : true,
					autoLoad : {
						url : __ctxPath + '/flow/processRunDetail.do?piId='
								+ this.piId + "&runId=" + this.runId,
						nocache : true
					}
				});
		
		this.gridPanel = new HT.GridPanel({
			height : 150,
			title : '商品清单',
			showPaging : false,
			scrollHeight : true,
			id : 'scBizOrder_gridPanel_flow',
//			clicksToEdit : 1,
//			url : __ctxPath + "/xitong/getContactUlEmployee.do?useid=",
//            store : store,
			fields : [{
						name : 'goodsId',
						type : 'int'
					},'goodsName', 'numbers', 'amount', 'retailPrice'],
			columns : [{
						header : '商品名称',
						dataIndex : 'goodsName'
					}, {
						header : '商品编号',
						dataIndex : 'numbers'
					}, {
						header : '购买价',
						dataIndex : 'retailPrice',
                        renderer : function(value){
                            return Number(value).toFixed(2);                        
                        }
					}, {
						header : '商品数量',
						dataIndex : 'amount'
					}]
				// end of columns
			});
//        alert(this.data_dd.goods.length);
            
        
		this.gridPanel1 = new HT.GridPanel({
			height : 150,
			title : '物流状态',
			showPaging : false,
			scrollHeight : true,
			clicksToEdit : 1,
			url : __ctxPath + "/xitong/getContactUlEmployee.do?useid=",
			fields : [{
						name : 'contactEmplId',
						type : 'int'
					}, 'contactType', 'contactValue'],
			columns : [{
						header : '处理时间',
						dataIndex : 'contactType'
					}, {
						header : '处理信息',
						dataIndex : 'contactType2'
					}, {
						header : '操作人',
						dataIndex : 'contactValue'
					}]
				// end of columns
			});
        
		this.detailPanel = new Ext.Panel({
			border:false,
			autoScroll : true,
			height : 400,
//			bodyStyle : 'overflow-y:auto',
			items : [this.gridPanel,{
						title : '收货信息',
						collapsible : true,
						xtype : 'fieldset',
						collapsed : false,
						items : [{
									xtype : 'displayfield',
									fieldLabel : '收货人',
									id : 'dd_shouhuoren_flow'
//									value : this.data_dd.data.cusDelivery.deliveryName
								}, {
									xtype : 'displayfield',
									fieldLabel : '地址',
									id : 'dd_dizhi_flow'
//									value : show
								}, {
									xtype : 'displayfield',
									fieldLabel : '联系方式',
									id : 'dd_lianxifangshi_flow'
//									value : this.data_dd.data.cusDelivery.deliveryPhone
								}]
					}, {
						title : '支付及配送状态',
						xtype : 'fieldset',
						collapsible : true,
						collapsed : false,
						items : [{
									xtype : 'displayfield',
									fieldLabel : '支付方式',
									value : '货到付款'
								}, {
									xtype : 'displayfield',
									fieldLabel : '运费',
									id : 'dd_yunfei_flow'
//									value : Number(this.data_dd.data.ext11).toFixed(2)
								}]
					}, {
						title : '发票信息',
						xtype : 'fieldset',
						collapsible : true,
						collapsed : false,
						items : [{
									xtype : 'displayfield',
									fieldLabel : '发票类型',
									value : '不开发票'
								}]
					}, {
						title : '付款信息',
						xtype : 'fieldset',
						collapsible : true,
						collapsed : false,
						items : [{
									layout : 'column',
									border : false,
									items : [{
												layout : 'form',
												border : false,
												columnWidth:.333,
												items : [{
															xtype : 'displayfield',
															fieldLabel : '商品金额',
															id : 'dd_shangpinjine_flow'
//															value : Number(this.data_dd.data.ext12).toFixed(2)
														},{
															xtype : 'displayfield',
															fieldLabel : '积分',
															value : ''
														},{
															xtype : 'displayfield',
															fieldLabel : '储值金',
															value : ''
														}]
											},{
												layout : 'form',
												border : false,
												columnWidth:.333,
												items : [{
															xtype : 'displayfield',
															fieldLabel : '运费',
															id : 'dd_yfForm_flow'
//															value :  Number(this.data_dd.data.ext11).toFixed(2)
														},{
															xtype : 'displayfield',
															fieldLabel : '礼金',
															value : ''
														},{
															xtype : 'displayfield',
															fieldLabel : '暂存款',
															value : ''
														}]
											},{
												layout : 'form',
												border : false,
												columnWidth:.333,
												items : [{
															xtype : 'displayfield',
															fieldLabel : '消费金额',
															id : 'dd_xiaofeijine_flow'
//															value : Number(this.data_dd.data.totalInAmount).toFixed(2)
														},{
															xtype : 'displayfield',
															fieldLabel : '代金券',
															value : ''
														}]
											}]
								}]
					}, this.gridPanel1,{
						name : 'pKId',
						xtype : 'hidden',
						value : this.id == null ? '' : this.id
					}]
		})

		// 加载表单对应的数据
		if (this.id != null && this.id != 'undefined') {
			Ext.Ajax.request({
                url : __ctxPath + '/supply/detailScBizOrderSales.do',
                params :  {
                    bizOrderId : this.id
                },
                method : 'post',
                success : function(response) {
					var data_dd = Ext.util.JSON.decode(response.responseText);
					for(var tmp = 0; tmp < data_dd.goods.length ; tmp++){
				        var grid = Ext.getCmp('scBizOrder_gridPanel_flow');
				        var store = grid.getStore();
//			            alert(data_dd.goods[tmp].goodsName);
				        var newRecord_par = new store.recordType({
			                goodsId : data_dd.goods[tmp].goodsId,
				            goodsName : data_dd.goods[tmp].goodsName,
				            numbers : data_dd.goods[tmp].numbers,
				            amount : data_dd.goods[tmp].amount,
				            retailPrice : data_dd.goods[tmp].scGoodsPrice.retailPrice
				        });
				        grid.stopEditing();
				        store.add(newRecord_par);
			        }
			        var show = data_dd.data.cusDelivery.regionGuojia.regionName +
			            data_dd.data.cusDelivery.regionSheng.regionName +
			            data_dd.data.cusDelivery.regionShi.regionName +
			            data_dd.data.cusDelivery.regionQu.regionName + 
			            data_dd.data.cusDelivery.deliveryAddress;
			        
			        Ext.getCmp('dd_dizhi_flow').setValue(show);
					
			        Ext.getCmp('dd_shouhuoren_flow').setValue(data_dd.data.cusDelivery.deliveryName);
			        Ext.getCmp('dd_lianxifangshi_flow').setValue(data_dd.data.cusDelivery.deliveryPhone);
			        Ext.getCmp('dd_yunfei_flow').setValue(data_dd.data.ext11);
			        Ext.getCmp('dd_shangpinjine_flow').setValue(data_dd.data.ext12);
			        Ext.getCmp('dd_yfForm_flow').setValue(data_dd.data.ext11);
			        Ext.getCmp('dd_xiaofeijine_flow').setValue(data_dd.data.totalInAmount);
                }
            });
		}

	},// end of the initcomponents

	/**
	 * 取消
	 * 
	 * @param {}
	 *            window
	 */
	cancel : function() {
		var tabs = Ext.getCmp('centerTabPanel');
		tabs.remove('ScBizOrderSalesFlowFormWin');
		this.destroy();
	},
	/**
	 * 显示流程图
	 */
	showFlowImage : function() {
		var window=new Ext.Window({
			autoScroll:true,
				iconCls:'btn-flow-chart',
				bodyStyle:'background-color:white',
				maximizable : true,
				title:'流程示意图',
				width:600,
				height:500,
				modal:true,
				layout:'fit',
				html:'<img src="'+__ctxPath+ '/jbpmImage?taskId='+this.taskId+ '&rand=' + Math.random()+ '"/>'
		});
		window.show();
	},
   connect : function(){
		var win = new Ext.Window({
 		title:'流程示意图',
 		width:600,
 		autoScroll:true,
 		iconCls : 'btn-flow-chart',
 		bodyStyle : 'background-color:white',
 		maximizable : true,
 		height:500,
 		split:true,
 		collapsible: true,
 		region:'center',
 		margin:'5 5 5 5',
 		html:'<img src="'+__ctxPath+ '/jbpmImage?piId='+this.piId+'&defId='+10160+'&runId='+this.runId+'&rand='+ Math.random()+'"/>'
				});
		win.show();
	
   }
});

/**
 * 顶部保存 取消按钮()
 * 
 * @return {}
 */

ScBizOrderSalesFlowForm.prototype.initToolbar = function() {
	var toolbar = new Ext.Toolbar({
				width : '100%',
				height : 30,
				items : ["->",{
						text : "流程状态图",
						iconCls : 'btn-flow-chart',
						scope : this,
						handler : this.connect
					}, {
							text : __cancel,
							iconCls : 'btn-cancel',
							scope : this,
							handler : this.cancel
						}]
			});
	return toolbar;
}