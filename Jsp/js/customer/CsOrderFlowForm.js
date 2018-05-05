/**
 * @author cf0666@gmail.com
 * @createtime
 * @class CsOrderFlowForm
 * @extends Ext.Window
 * @description CsOrder表单
 * @company 优创融联科技
 */
CsOrderFlowForm = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		CsOrderFlowForm.superclass.constructor.call(this, {
					id : 'CsOrderFlowForm',
					layout : 'form',
					items : [this.formPanel,this.panel],
					modal : true,
					height : 500,
					width : 500,
					maximizable : true,
					title : 'CS投诉工单详细信息',
					buttonAlign : 'center',
					tbar : this.initToolbar()
				});
	},// end of the constructor
	// 初始化组件
	initUIComponents : function() {

		// 增加审核记录
		this.panel = new Ext.Panel();
		// if (this.piId != null) {
		this.panel = new Ext.Panel({
					title : __allApprovalInfo,
					autoScroll : true,
					autoLoad : {
						url : __ctxPath + '/flow/processRunDetail.do?piId='
								+ this.piId + "&runId=" + this.runId,
						nocache : true
					}
				});
		// }
		this.orderId = '$!orderId';
		this.orderId = this.orderId ? this.orderId : this.PKid; // 主表Id

		var dep_url = __ctxPath + '/xitong/listUlDepartment.do?opt=UlDep';
		var depSelector = new TreeSelector('depTreeSelector_TS', dep_url, '接单部门','ulEmployee.depid_form_TS', true, true, '80px');
		
		function renderMulti(value, p, r){
			var price = r.data['retailPrice'];
			var count = r.data['goodsCount'];
			if(count=='' || count == null || count =='null' || count =='undefined'){
				count = 1;
			}
	        return count*price;
	    }
	    
		var productGrid = new HT.GridPanel({
			printable : false,
			exportable : false,
			border : false,
			height:100,
			showPaging:false,
			autoScroll:true,
			lazyLoad : true,
			layout : 'fit',
			id : 'gridPanel_CS_goods_TS',
//			url : __ctxPath + "/supply/listScBizSalesDetail.do",
//			baseParams : {
//				'Q_scBizOrderSales.bizOrderNumber_S_EQ' : -1
//			},
			url : __ctxPath + "/supply/getGoodsByOrderIdScGoods.do",
			baseParams : {
				'bizOrderNumber' : null
			},
			fields : [{
						name : 'bizOrderDetailId',
						type : 'int'
					}, 'scBizSalesDetail', 'scBizSalesDetail','scGoods',
					'scBizSalesDetail', 'goodsUnitPrice', 'goodsCount',
					'discountForeSubtotal', 'discount',
					'changedAmount', 'discountAfterSubtotal', 'desc',
					'goodsId','goodsName','ext1','goodsType','retailPrice','style','ext2'],
			columns : [{
				header : '商品编号',
				dataIndex : 'goodsId'
			}, {
				header : '商品名',
				dataIndex : 'goodsName'
			}, {
				header : '颜色',
				dataIndex : 'ext1',
				renderer : function(value) {
					return value!=null ? COLOR_CD.get(value) : '';
				}
			}, {
				header : '款式',
				dataIndex : 'style',
				renderer : function(value) {
					return value!=null ? STYLE_CD.get(value) : '';
				}
			}, {
				header : '出库物流中心',
				dataIndex : 'ext2',
				renderer : function(value) {
					return value!=null ? SITE_CD.get(value) : '';
				}
			}, {
				header : '类型',
				dataIndex : 'goodsType'
			}, {
				header : '价格',
				dataIndex : 'retailPrice'
			}, {
				header : '数量',
				dataIndex : 'goodsCount'
			}, {
				header : '小计',
//				dataIndex : 'discountForeSubtotal'
				renderer : renderMulti
			}]
		});

		this.formPanel = new Ext.FormPanel({
			layout : 'form',
			bodyStyle : 'padding:10px',
			border : false,
			autoScroll : true,
			id : 'jieshouCSpanel_vm_TS',
			defaults : {
				anchor : '100%,100%'
			},
			items : [{
				layout : 'column',
				border : false,
				items : [{
					columnWidth : .333,
					layout : 'form',
					border : false,
					items : [{
						name : 'csOrder.orderId',
						hidden : true
					}]
				}]
			}, {
				layout:'column',
				border:false,
				items:[{
					columnWidth:.33,
					border:false,
					layout:'form',
					labelAlign:'right',
					labelWidth:70,
					items:[{
						xtype:'textfield',
						fieldLabel:'客户姓名',
						name : 'csOrder.customerName',
						id : 'csOrder.customerNameId_TS',
						readOnly : true,
						anchor:'100%'
					},{
						fieldLabel:'等级',
						hiddenName : 'csOrder.cusGraId',
						id : 'csOrder.cusGraId_flowform_TS',
						xtype : 'mtdiccombo',
						editable : true,
						lazyInit : false,
						readOnly : true,
						forceSelection : false,
						itemKey : 'CONKHJB',
						anchor : '100%'
					},{
						xtype:'textfield',
						fieldLabel:'联系方式1',
						name : 'csOrder.contacta',
						readOnly : true,
						anchor:'100%'
					},{
						columnWidth : .5,
						layout : 'form',
						border : false,
						xtype : 'hidden',
						name : 'csOrder.order',
						id : 'csOrder.order_hid_TS'
					},{
						xtype:'combo',
						fieldLabel:'工单类型',
						name : 'csOrder.orderName',
						id : 'csOrder.order_form_TS',
						editable : false,
						lazyInit : false,
						allowBlank : false,
						readOnly : true,
						forceSelection : false,
						triggerAction : 'all',
						store :  new Ext.data.SimpleStore({
							autoLoad : true,
							url : __ctxPath + '/system/comboDictionary.do',
							baseParams : {
								'Q_mapName_S_EQ' : 'TS_GD_LX'
							},
							fields : [ 'dicId', 'itemValue' ],
							listeners : {
								load : function() {
									var combo = Ext.getCmp('jieshouCSpanel_vm_TS').getCmpByName('csOrder.orderName');
									var combo2 = Ext.getCmp('jieshouCSpanel_vm_TS').getCmpByName('csOrder.order');
									var projectId = Ext.getCmp('csOrder.orderProject_hid_TS').getValue();
									var store = combo.getStore();
									var rows = [];//定义数组
									for ( var i = 0; i < store.getCount(); i++) { //store.getCount()为store的长度
										if (store.getAt(i).data['dicId'] == combo2.getValue()) {
											combo.setValue(store.getAt(i).data['itemValue']);
											break;
										}
									}
									Ext.Ajax.request({
										url : __ctxPath + '/system/comboDictionary.do',
										params : {
											'Q_dicId_L_EQ' : projectId
										},
										fields : [ 'dicId', 'itemValue' ],
										method : 'post',
										success : function(response) {
											var result = Ext.util.JSON.decode(response.responseText);
											var arr = new Array();
											arr = result.toString().split(",");
											Ext.getCmp('csOrder.orderProject_form_TS').setValue(arr[1]);
//													Ext.getCmp('csOrder.orderProject_form').getStore().loadData(result);
										}
									});
								}
							}
						}),
						anchor:'100%',
						mode:'local',
						displayField : 'itemValue',
						valueField : 'dicId',
						listeners : {
							scope : this,
							'select' : function(combo, record,index) {
								var dicId = record.get('dicId')
								Ext.getCmp('csOrder.order_hid_TS').setValue(dicId);
								Ext.Ajax.request({
									url : __ctxPath + '/system/comboDictionary.do',
									params : {
										'Q_relDic_L_EQ' : dicId
									},
									method : 'post',
									success : function(response) {
										var result = Ext.util.JSON.decode(response.responseText);
										Ext.getCmp('csOrder.orderProject_form_TS').getStore().loadData(result);
										Ext.getCmp('csOrder.orderProject_form_TS').setValue('');
									}
								});
							}
						}
					} ,{
						columnWidth : .5,
						layout : 'form',
						border : false,
						xtype : 'hidden',
						name : 'csOrder.orderSorce',
						id : 'csOrder.orderSorce_hid_TS'
					},{
						xtype:'combo',
						fieldLabel:'工单来源',
						id : 'csOrder.orderSorce_form_TS',
						name : 'csOrder.orderSorceName',
						editable : false,
						lazyInit : false,
						allowBlank : false,
						readOnly : true,
						forceSelection : false,
						triggerAction : 'all',
						anchor:'100%',
						mode:'local',
						store :  new Ext.data.SimpleStore({
							autoLoad : true,
							url : __ctxPath + '/system/comboDictionary.do',
							baseParams : {
								'Q_mapName_S_EQ' : 'TS_GD_SOURCE'
							},
							fields : [ 'dicId', 'itemValue' ],
							listeners : {
								load : function() {
									var combo = Ext.getCmp('jieshouCSpanel_vm_TS').getCmpByName('csOrder.orderSorceName');
									var combo2 = Ext.getCmp('jieshouCSpanel_vm_TS').getCmpByName('csOrder.orderSorce');
									var levelId = Ext.getCmp('csOrder.level_hid_TS').getValue();
									var store = combo.getStore();
									var rows = [];//定义数组
									for ( var i = 0; i < store.getCount(); i++) { //store.getCount()为store的长度
										if (store.getAt(i).data['dicId'] == combo2.getValue()) {
											combo.setValue(store.getAt(i).data['itemValue']);
											break;
										}
									}
									Ext.Ajax.request({
										url : __ctxPath + '/system/comboDictionary.do',
										params : {
											'Q_dicId_L_EQ' : levelId
										},
										fields : [ 'dicId', 'itemValue' ],
										method : 'post',
										success : function(response) {
											var result = Ext.util.JSON.decode(response.responseText);
											var arr = new Array();
											arr = result.toString().split(",");
											Ext.getCmp('csOrder.level_form_TS').setValue(arr[1]);
										}
									});
								}
							}
						}),
						displayField : 'itemValue',
						valueField : 'dicId',
						listeners : {
							scope : this,
							'select' : function(combo, record,index) {
								var dicId = record.get('dicId')
								Ext.getCmp('csOrder.orderSorce_hid_TS').setValue(dicId);
								Ext.Ajax.request({
									url : __ctxPath + '/system/comboParentIdDictionary.do',
									params : {
										'Q_dicId_L_EQ' : dicId
									},
									method : 'post',
									success : function(response) {
										var result = Ext.util.JSON.decode(response.responseText)
										var arr = new Array();
										arr = result.toString().split(",");
	//									Ext.getCmp('csOrder.level_form_TS').getStore().loadData(result);
										Ext.getCmp('csOrder.level_form_TS').setValue(arr[1]);
										var fm = Ext.getCmp('jieshouCSpanel_vm_TS');
										fm.getCmpByName('csOrder.level').setValue(arr[0]);
									}
								});
							}
						}
					},{
						fieldLabel:'要求响应时间',
						name : 'csOrder.responseTime',
						id : 'csOrder.responseTime_TS',
						readOnly : true,
						xtype:'datetimefield',
						format:'Y-m-d H:i:s',
						anchor:'100%'
					}]
				},{
					columnWidth:.33,
					border:false,
					layout:'form',
					labelAlign:'right',
					labelWidth:70,
					items:[{
						xtype:'textfield',
						fieldLabel:'客户号码',
						name : 'csOrder.customerNo',
						id : 'csOrder.customerNoId_TS',
						readOnly : true,
						anchor:'100%'
					}, {
						columnWidth : .5,
							layout : 'form',
							border : false,
							xtype : 'hidden',
							name : 'csOrder.region.regionId', // 省隐藏域
							id : 'csOrder.regionId_TS_hid'
						},{
							fieldLabel : '所属地区',       
							id : 'ulEmployees.hujisheng_combo_TS',
							name : 'ulEmployees.hujisheng',
							xtype : 'combo',
							lazyInit : false,
							mode : 'local',
							editable : true,
							readOnly : true,
							triggerAction : 'all',
							store : this.getStore_regions(1,'ulEmployees.huji', this.huji),
							displayField : 'regionName',
							valueField : 'regionId',
							listeners : this.getDicListeners('ulEmployees.hujisheng_combo_TS','csOrder.regionId_TS'),
							anchor : '100%'
					},{
						xtype:'textfield',
						fieldLabel:'联系方式2',
						name : 'csOrder.contactb',
						readOnly : true,
						anchor:'100%'
					},{
						columnWidth : .5,
						layout : 'form',
						border : false,
						xtype : 'hidden',
						name : 'csOrder.orderProject',
						id : 'csOrder.orderProject_hid_TS'
					},{
						xtype : 'combo',
						fieldLabel:'工单项目',
						name : 'csOrder.orderProjectName',
						id : 'csOrder.orderProject_form_TS',
						editable : false,
						lazyInit : false,
						readOnly : true,
						forceSelection : false,
						triggerAction : 'all',
						store : [['', '']],
						anchor:'100%',
						mode:'local',
						listeners : {
							select : function(cbo,record,index) {
								var fm = Ext.getCmp('jieshouCSpanel_vm_TS');
								fm.getCmpByName('csOrder.orderProject').setValue(cbo.value);
							}
						}
					} ,{
						columnWidth : .5,
						layout : 'form',
						border : false,
						xtype : 'hidden',
						name : 'csOrder.level',
						id : 'csOrder.level_hid_TS'
					},{
						xtype:'combo',
						fieldLabel:'投诉等级',
						id : 'csOrder.level_form_TS',
						editable : true,
						lazyInit : false,
						readOnly : true,
						forceSelection : false,
						triggerAction : 'all',
						store : [['','']],
						anchor:'100%',
						mode:'local'
					},{
						fieldLabel:'要求完成时间',
						name : 'csOrder.completionTime',
						id : 'csOrder.completionTime_TS',
						xtype:'datetimefield',
						readOnly : true,
						format:'Y-m-d H:i:s',
						anchor:'100%'
					}]
				},{
					columnWidth : .5,
					layout : 'form',
					border : false,
					xtype : 'hidden',
					name : 'csOrder.customerGender',
					id : 'csOrder.customerGender_hid_TS'
				},{
					columnWidth:.33,
					border:false,
					layout:'form',
					labelAlign:'right',
					labelWidth:70,
					items:[{
						xtype : 'mtdiccombo',
						fieldLabel:'性别',
						hiddenName : 'csOrder.customerGender',
						name : 'csOrder.customerGender',
						id : 'csOrder.customerGender_form_TS',
						editable : false,
						lazyInit : false,
						readOnly : true,
						forceSelection : false,
						itemKey : 'XB001',
						anchor:'100%',
						mode:'local'
					},{
						border:false,
						height:25
					},{
						border:false,
						height:25
					},{
						border:false,
						height:25
					}, {
						layout : 'form',
						border:false,
						columnWidth : .3,
						items : [{
							xtype : 'container',
							layout : 'form',
							width : '100px',
							items : [depSelector]
						}, {
							name : 'csOrder.ulDepartment.depid',
							id : 'ulEmployee.depid_form_TS',
							xtype : 'hidden'
						}]
					}]
				}]
			
			},{
				xtype:'fieldset',
				collapsible:true,
				collapsed:false,
				title:'订单信息',
				items:[{
					layout:'column',
					border:false,
					items:[{
						columnWidth:.4,
						border:false,
						layout:'form',
						items:[{
//							xtype : 'hidden',
//							name : 'csOrder.detailId',
//							id : 'csOrder.dingdanNumId_TS',
//							anchor : '100%'
//						}, {
							fieldLabel:'订单编号',
							xtype:'textfield',
							name : 'csOrder.detailId',
							anchor:'100%',
							readOnly : true,
							id : 'csOrder.dingdanNum_TS'
						}]
//					},{
//						columnWidth:.1,
//						border:false,
//						xtype:'button',
//						iconCls:'btn-search'
					}]
				},productGrid]
			},{
				xtype:'textarea',
				height:50,
				fieldLabel:'投诉内容',
				readOnly : true,
				name : 'csOrder.content',
				anchor:'100%'
			},{
				xtype:'textarea',
				height:50,
				fieldLabel:'客户诉求',
				name : 'csOrder.noteAppeal',
				readOnly : true,
				anchor:'100%'
			}, {
				name : 'pKId',
				xtype : 'hidden',
				value : this.id == null ? '' : this.id
			}]
				// form items
		});

		// 加载表单对应的数据
		if (this.id != null && this.id != 'undefined') {
			this.formPanel.loadData({
						url : __ctxPath + '/customer/getCsOrder.do?orderId=' + this.id,
						root : 'data',
						preName : 'csOrder',
						success : function(form, action) {
							var result = Ext.decode(form.responseText);
							var depId = result.data.ulDepartment.depid;
							Ext.getCmp('csOrder.customerGender_form_TS').setValue(result.data.customerGender);
							Ext.getCmp('csOrder.cusGraId_flowform_TS').setValue(result.data.customerGrade);
							Ext.getCmp('ulEmployee.depid_form_TS').setValue(depId);
							Ext.Ajax.request({
								url : __ctxPath + '/xitong/getUlDepartment.do',
								async : true,
								scope : this,
								params : {
									'depId' : depId
								},
								method : 'post',
								success : function(response) {
									var result = Ext.util.JSON.decode(response.responseText);
									var folderName = result.data.depname;
									Ext.getCmp('depTreeSelector_TS').setValue(folderName);
								}
							});
							//加载订单信息
							var dingdanStore = Ext.getCmp('gridPanel_CS_goods_TS').getStore();
							var bizOrderId = Ext.getCmp('csOrder.dingdanNum_TS').getValue();
							dingdanStore.baseParams = {
								'bizOrderNumber' : bizOrderId
							}
							dingdanStore.load();
						},
						failure : function(form, action) {
						}
					});
		}

	},// end of the initcomponents

	/**
	 * 重置
	 * 
	 * @param {}
	 *            formPanel
	 */
	reset : function() {
		this.formPanel.getForm().reset();
	},
	/**
	 * 取消
	 * 
	 * @param {}
	 *            window
	 */
	cancel : function() {
		var tabs = Ext.getCmp('centerTabPanel');
		tabs.remove('CsOrderFlowForm');
		this.destroy();
	},

	getStore_regions : function(flag, idText, parentList) {
		if (parentList == null || parentList == undefined)
			return new Ext.data.SimpleStore({
				autoLoad : true,
				url : __ctxPath + '/system/listDetailRegion.do?regionId=' + 0,
				fields : ['regionId', 'regionName'],
				listeners : {
					load : function() {
						var combo = Ext.getCmp('jieshouCSpanel_vm_TS').getCmpByName('ulEmployees.hujisheng');
						var combo2 = Ext.getCmp('jieshouCSpanel_vm_TS').getCmpByName('csOrder.region.regionId');
						var store = combo.getStore();
						var rows = [];// 定义数组
						for (var i = 0; i < store.getCount(); i++) { // store.getCount()为store的长度
							if (store.getAt(i).data['regionId'] == combo2.getValue()) {
								combo.setValue(store.getAt(i).data['regionName']);
								break;
							}
						}
					}
				}
			})
	},
	getDicListeners : function(comId, hidName) {
		return {
			select : function(cbo, record, index) {
				var fm = Ext.getCmp(comId);
				Ext.getCmp(hidName + '_hid').setValue(cbo.value);
			}
		}
	},
	connect : function() {
		var win = new Ext.Window({
					title : '流程示意图',
					width : 600,
					autoScroll : true,
					iconCls : 'btn-flow-chart',
					bodyStyle : 'background-color:white',
					maximizable : true,
					height : 500,
					split : true,
					collapsible : true,
					region : 'center',
					margin : '5 5 5 5',
					html : '<img src="' + __ctxPath + '/jbpmImage?piId='
							+ this.piId + '&defId=' + 10260 + '&runId='
							+ this.runId + '&rand=' + Math.random() + '"/>'
				});
		win.show();

	},
	/**
	 * 保存记录
	 */
	// save : function() {
	// $postSubForm({
	// formPanel:this.formPanel,
	// scope:this,
	// url:__ctxPath + '/customer/saveCsOrder.do',
	// msgSuccess : '成功删除该记录！',
	// msgFailure : '操作出错，请联系管理员！',
	// callback:function(fp,action){
	// var gridPanel = Ext.getCmp('CsOrderGrid');
	// if (gridPanel != null) {
	// gridPanel.getStore().reload();
	// }
	// this.close();
	// }
	// }
	// );
	// }//end of save
	validate : function() {
		return true;
	}
});
CsOrderFlowForm.prototype.initToolbar = function() {
	var toolbar = new Ext.Toolbar({
				width : '100%',
				height : 30,
				items : ["->", {
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
