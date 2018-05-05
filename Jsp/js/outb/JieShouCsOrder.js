/**
 * @author wangzj
 * @class JieShouCsOrder
 * @extends Ext.Panel
 * @description 接受CS管理
 * @company 优创融联科技
 * @createtime:2012/8/29 12:02:09
 */
JieShouCsOrder = Ext.extend(Ext.Window, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		JieShouCsOrder.superclass.constructor.call(this, {
					width : 800,
					title : '接受CS',
					height : 580,
					id : 'jieshouCsWin',
					autoScroll : true,
					layout : 'fit',
					modal : true,
					items : this.formpanelCS,
					buttonAlign : 'center',
					buttons : this.buttons
				});
	},// end of the constructor
	// 初始化组件
	initUIComponents : function() {
		
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
			id : 'gridPanel_CS_goods',
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
		
		var dep_url = __ctxPath + '/xitong/listUlDepartment.do?opt=UlDep';
		var depSelector = new TreeSelector('depTreeSelector_CS', dep_url, '接单部门',
				'ulEmployee.depid_form', false, '80px');
		this.formpanelCS = new Ext.FormPanel({
//			url : __ctxPath + '',
			id : 'jieshouCSpanel',
			style : 'padding-top:10px;background-color:#fff;',
			bodyStyle:'overflow-y:auto',
			border : false,
			height:540,
			labelAlign : 'right',
			labelWidth : 80,
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
					},{
						xtype : 'radio',
						boxLabel : '投诉工单',
						name : 'csOrder.orderType',
						checked : true,
						anchor : '95%',
						inputValue : 1,
						listeners:{
							'check':function(checkbox,checked){
								if(checked){
									JieShouCsOrder.flowJieShouCS('10260','TS_GD_LX','TS_GD_SOURCE','CsOrderFlowView');
								}
							}
						}
					}]
				}, {
					columnWidth : .333,
					layout : 'form',
					border : false,
					items : [{
						xtype : 'radio',
						boxLabel : '业务办理',
						name : 'csOrder.orderType',
						anchor : '95%',
						inputValue : 2,
						listeners:{
							'check':function(checkbox,checked){
								if(checked){
									JieShouCsOrder.flowJieShouCS('10280','YW_GD_LX','YW_GD_SOURCE','CsOrderYWFlowView');
								}
							}
						}
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
					labelWidth:80,
					items:[{
						xtype:'textfield',
						fieldLabel:'客户姓名',
	//					name : 'csOrder.customerName',
						name : 'cusPersonal.nameCn',
						id : 'csOrder.customerNameId',
						readOnly : true,
						anchor:'100%'
					},{
						columnWidth : .5,
						layout : 'form',
						border : false,
						xtype : 'hidden',
						name : 'cusPersonal.cusGraId',
						id : 'csOrder.cusGraId_hid'
					},{
						fieldLabel:'等级',
						hiddenName : 'cusPersonal.cusGraId',
//						name : 'cusPersonal.cusGraId',
						id : 'csOrder.cusGraId_form',
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
						anchor:'100%'
					},{
						columnWidth : .5,
						layout : 'form',
						border : false,
						xtype : 'hidden',
						name : 'csOrder.order',
						id : 'csOrder.order_hid'
					},{
						xtype:'combo',
						fieldLabel:'工单类型',
						id : 'csOrder.order_form',
						editable : false,
						lazyInit : false,
						allowBlank : false,
						forceSelection : false,
						triggerAction : 'all',
						store :  new Ext.data.SimpleStore({
							autoLoad : true,
							url : __ctxPath + '/system/comboDictionary.do',
							baseParams : {
								'Q_mapName_S_EQ' : 'TS_GD_LX'
							},
							fields : [ 'dicId', 'itemValue' ]
						}),
						anchor:'100%',
						mode:'local',
						displayField : 'itemValue',
						valueField : 'dicId',
						listeners : {
							scope : this,
							'select' : function(combo, record,index) {
								var dicId = record.get('dicId')
								Ext.getCmp('csOrder.order_hid').setValue(dicId);
								Ext.Ajax.request({
									url : __ctxPath + '/system/comboDictionary.do',
									params : {
										'Q_relDic_L_EQ' : dicId
									},
									method : 'post',
									success : function(response) {
										var result = Ext.util.JSON.decode(response.responseText);
										Ext.getCmp('csOrder.orderProject_form').getStore().loadData(result);
										Ext.getCmp('csOrder.orderProject_form').clearValue();
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
						id : 'csOrder.orderSorce_hid'
					},{
						xtype:'combo',
						fieldLabel:'工单来源',
						id : 'csOrder.orderSorce_form',
						editable : false,
						lazyInit : false,
						allowBlank : false,
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
							fields : [ 'dicId', 'itemValue' ]
						}),
						displayField : 'itemValue',
						valueField : 'dicId',
						listeners : {
							scope : this,
							'select' : function(combo, record,index) {
								var dicId = record.get('dicId')
								Ext.getCmp('csOrder.orderSorce_hid').setValue(dicId);
								Ext.Ajax.request({
									url : __ctxPath + '/system/comboParentIdDictionary.do',
									params : {
										'Q_dicId_L_EQ' : dicId
									},
									method : 'post',
									success : function(response) {
										var result = Ext.util.JSON.decode(response.responseText);
										var arrLevel = new Array();
										arrLevel = result.toString().split(",");
	//									Ext.getCmp('csOrder.level_form').getStore().loadData(result);
										Ext.getCmp('csOrder.level_form').setValue(arrLevel[1]);
										var fm = Ext.getCmp('jieshouCSpanel');
										fm.getCmpByName('csOrder.level').setValue(arrLevel[0]);
									}
								});
								
								//修改响应时间和完成时间
								var gradId = this.gradIdHid;
//								if(gradId != null && gradId != ''){
									Ext.Ajax.request({
										url : __ctxPath + '/customer/getDicIdCsOrderTime.do',
										params : {
											'LYId' : dicId,
											'KHId' : gradId
										},
										method : 'post',
										success : function(response) {
											var result = Ext.util.JSON.decode(response.responseText)
											var resDate = Ext.getCmp('csOrder.responseTime');
											resDate.setValue(result.dueDate);
											var comDate = Ext.getCmp('csOrder.completionTime');
											comDate.setValue(result.needsDate);
										}
									});
//								}
							}
						}
					},{
	//					xtype:'datefield',
						fieldLabel:'要求响应时间',
						name : 'flowResponseTime',
						id : 'csOrder.responseTime',
						xtype:'datetimefield',
						format:'Y-m-d H:i:s',
	//					readOnly : true,
						anchor:'100%'
					}]
				},{
					columnWidth:.33,
					border:false,
					layout:'form',
					labelAlign:'right',
					labelWidth:80,
					items:[{
						xtype:'textfield',
						fieldLabel:'客户号码',
	//					name : 'csOrder.customerNo',
						name : 'cusPersonal.customerNo',
						id : 'csOrder.customerNoId',
						readOnly : true,
						anchor:'100%'
					}, {
						columnWidth : .5,
						layout : 'form',
						border : false,
						xtype : 'hidden',
						name : 'csOrder.region.regionId', // 省隐藏域
						id : 'csOrder.regionId_hid'
					},{
						fieldLabel : '所属地区',       
						id : 'ulEmployees.hujisheng_combo',
						xtype : 'combo',
						lazyInit : false,
						allowBlank : false,
						mode : 'local',
						editable : false,
						triggerAction : 'all',
						store : JieShouCsOrder.getStore_regions(1,'ulEmployees.huji', this.huji),
						displayField : 'regionName',
						valueField : 'regionId',
						listeners : JieShouCsOrder.getDicListeners('ulEmployees.hujisheng_combo','csOrder.regionId'),
						anchor : '100%'
					},{
						xtype:'textfield',
						fieldLabel:'联系方式2',
						name : 'csOrder.contactb',
						anchor:'100%'
					},{
						columnWidth : .5,
						layout : 'form',
						border : false,
						xtype : 'hidden',
						name : 'csOrder.orderProject',
						id : 'csOrder.orderProject_hid'
					},{
						xtype : 'combo',
						fieldLabel:'工单项目',
						id : 'csOrder.orderProject_form',
						editable : false,
						lazyInit : false,
						forceSelection : false,
						triggerAction : 'all',
						store : [['','']],
						anchor:'100%',
						mode:'local',
						validator : function(value){
							var fm = Ext.getCmp('jieshouCSpanel');
							var cvalue = fm.getCmpByName('csOrder.order').getValue();
							if(cvalue==''){
								return '请先选择工单类型!';
							}else{
								return true;
							}
 						},
						listeners : {
							select : function(cbo,record,index) {
								var fm = Ext.getCmp('jieshouCSpanel');
								fm.getCmpByName('csOrder.orderProject').setValue(cbo.value);
							}
						}
					} ,{
						columnWidth : .5,
						layout : 'form',
						border : false,
						xtype : 'hidden',
						name : 'csOrder.level',
						id : 'csOrder.level_hid'
					},{
						xtype:'combo',
						fieldLabel:'投诉等级',
						id : 'csOrder.level_form',
						editable : true,
						lazyInit : false,
						readOnly : true,
						forceSelection : false,
						triggerAction : 'all',
						store : [['','']],
						anchor:'100%',
						mode:'local',
						validator : function(value){
							var fm = Ext.getCmp('jieshouCSpanel');
							var cvalue = fm.getCmpByName('csOrder.orderSorce').getValue();
							if(cvalue==''){
								return '请先选择工单来源!';
							}else{
								return true;
							}
 						}
	//					listeners : {
	//						select : function(cbo,record,index) {
	//							var fm = Ext.getCmp('jieshouCSpanel');
	//							fm.getCmpByName('csOrder.level').setValue(cbo.value);
	//						}
	//					}
					},{
	//					xtype:'datefield',
						fieldLabel:'要求完成时间',
						name : 'flowCompletionTime',
						id : 'csOrder.completionTime',
						xtype:'datetimefield',
						format:'Y-m-d H:i:s',
	//					readOnly : true,
						anchor:'100%'
					}]
				},{
					columnWidth : .5,
					layout : 'form',
					border : false,
					xtype : 'hidden',
					name : 'csOrder.customerGender',
					id : 'csOrder.customerGender_hid'
				},{
					columnWidth:.33,
					border:false,
					layout:'form',
					labelAlign:'right',
					labelWidth:80,
					items:[{
						xtype : 'mtdiccombo',
						fieldLabel:'性别',
						hiddenName : 'cusPersonal.gender1',
						name : 'cusPersonal.gender1',
						id : 'csOrder.customerGender_form',
						editable : false,
						lazyInit : false,
						readOnly : true,
						forceSelection : false,
						itemKey : 'XB001',
						anchor:'100%',
						mode:'local',
						listeners : JieShouCsOrder.getDicListeners('csOrder.customerGender_form','csOrder.customerGender')
	//					fieldLabel : '性别',
	//					xtype : 'mtdiccombo',
	//					name : 'cusPersonal.gender',
	//					id : 'csOrder.customerGender_form',
	//					editable : true,
	//					lazyInit : false,
	//					readOnly : true,
	//					forceSelection : false,
	//					itemKey : 'XB001',
	//					anchor : '100%'
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
	//									allowBlank : false,
							width : '100px',
							items : [depSelector]
						}, {
							name : 'csOrder.ulDepartment.depid',
							id : 'ulEmployee.depid_form',
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
//							id : 'csOrder.dingdanNumId',
//							anchor : '100%'
//						}, {
							fieldLabel:'订单编号',
							xtype:'textfield',
							name : 'csOrder.detailId',
							anchor:'100%',
							readOnly : true,
							id : 'csOrder.dingdanNum'
						}]
					},{
						columnWidth:.1,
						border:false,
						xtype:'button',
						text : '请选择',
						iconCls:'btn-search',
						handler : function() {
							var cusNo = Ext.getCmp('csOrder.customerNoId').getValue();
							ScBizOrderSalesSelector.getView(function(data){
//								Ext.getCmp('csOrder.dingdanNumId').setValue(data.bizOrderId);
								Ext.getCmp('csOrder.dingdanNum').setValue(data.bizOrderNumber);
								
								var dingdanStore = Ext.getCmp('gridPanel_CS_goods').getStore();
								dingdanStore.baseParams = {
									'bizOrderNumber' : data.bizOrderNumber
								}
								dingdanStore.load();
								
							},true,false,cusNo).show();
						}
					}]
				},productGrid]
			},{
				xtype:'textarea',
				height:50,
				fieldLabel:'投诉内容',
				name : 'csOrder.content',
				anchor:'100%'
			},{
				xtype:'textarea',
				height:50,
				fieldLabel:'客户诉求',
				name : 'csOrder.noteAppeal',
				anchor:'100%'
			}, {
				xtype : 'hidden',
				name : 'preHandler',
				value : 'csOrderService.saveHeadId'
			}, {
				xtype : 'hidden',
				name : 'afterHandler',
				value : 'csOrderService.saveRunId'
			}, {
				xtype : 'hidden',
				name : 'flowType',
				id : 'callFlowType',
				value : 'CsOrderFlowView'
			},{
				xtype : 'hidden',
				id : 'newDefId',
				name : 'defId'
			},{
				xtype : 'hidden',
				id : 'callDestName',
				name : 'destName'
			},{
				xtype : 'hidden',
				name : 'startFlow',
				value : true
			},{
				xtype : 'hidden',
				id : 'flowAssignId',
				name : 'flowAssignId'
			},{
				xtype : 'hidden',
				name : 'useTemplate',
				value : true
			},{
				xtype : 'hidden',
				name : 'customDate',
				value : true
			}]
				// form items
		});
			
		//加载接受CS页面中客户信息      by wangzj
		Ext.getCmp('csOrder.customerNameId').setValue(this.nameCn);
		Ext.getCmp('csOrder.cusGraId_form').setValue(this.graId);
		Ext.getCmp('csOrder.cusGraId_hid').setValue(this.gradIdHid);
		Ext.getCmp('csOrder.customerNoId').setValue(this.customerNo);
		Ext.getCmp('csOrder.customerGender_form').setValue(this.gender);
		Ext.getCmp('csOrder.customerGender_hid').setValue(this.genderId);

		// 初始化功能按钮
		this.buttons = [{
				text : '保存',
				iconCls : 'btn-save',
				id : 'btnSave_CS',
				handler : function() {
					var csForm = Ext.getCmp('jieshouCSpanel');
					if (csForm.getForm().isValid()) {
//						Ext.getCmp('btnSave_CS').disable();
						csForm.getForm().submit( {
							waitMsg : '正在提交信息...',
							url : __ctxPath + '/flow/saveProcessActivity.do',
							method : 'post',
//							params : {
//							},
							success : function(reForm, action) {
								Ext.ux.Toast.msg('操作提示', 'CS工单保存成功！');
								var taskGrid = Ext.getCmp('TodoFlowGrid');
								if(taskGrid != null){
									taskGrid.getStore().reload();
								}
								Ext.getCmp('jieshouCsWin').close();
							},
							failure : function(reForm, action) {
								Ext.ux.Toast.msg('操作提示', '操作失败，请联系管理员！');
							}
						});
					}
				}
			}, {
				text : '取消',
				iconCls : 'btn-delete',
				handler : function() {
					Ext.getCmp('jieshouCsWin').close();
				}
			}];
	//初始化工单信息
	JieShouCsOrder.flowJieShouCS('10260')
	
	}// end of the initcomponents

});

JieShouCsOrder.getDicListeners = function(comId, hidName){
	return {
		select : function(cbo,record,index) {
			var fm = Ext.getCmp(comId);
			Ext.getCmp(hidName+'_hid').setValue(cbo.value);
		}
	}
};

JieShouCsOrder.getStore_regions = function (flag, idText, parentList){
	if(parentList == null || parentList == undefined)
	return new Ext.data.SimpleStore({
		autoLoad : true,
		url : __ctxPath + '/system/listDetailRegion.do?regionId='+0,
		fields : ['regionId', 'regionName'],
		listeners : {
//			load : function(response) { // 加载数据
//     			   Ext.getCmp(idText + 'sheng_combo').setValue('请选择');
//			}
		}
	})
};

JieShouCsOrder.flowJieShouCS =function(defId,dicMapName,mapName,flowView){
	if(dicMapName!=null){
		var store = Ext.getCmp('csOrder.order_form').getStore();
		store.baseParams = {
			'Q_mapName_S_EQ' : dicMapName
		}
		store.load();
		Ext.getCmp('csOrder.order_form').clearValue();
		Ext.getCmp('csOrder.order_hid').setValue('');
		Ext.getCmp('csOrder.orderProject_form').clearValue();
		Ext.getCmp('csOrder.orderProject_hid').setValue('');
	}
	if(mapName!=null){
		var store = Ext.getCmp('csOrder.orderSorce_form').getStore();
		store.baseParams = {
			'Q_mapName_S_EQ' : mapName
		}
		store.load();
		Ext.getCmp('csOrder.orderSorce_form').clearValue();
		Ext.getCmp('csOrder.orderSorce_hid').setValue('');
		Ext.getCmp('csOrder.level_form').clearValue();
		Ext.getCmp('csOrder.level_hid').setValue('');
	}
	Ext.getCmp('newDefId').setValue(defId);
	if(flowView != null){
		Ext.getCmp('callFlowType').setValue(flowView);
	}
	// 加载开始节点后的分支
	Ext.Ajax.request({
		url : __ctxPath + '/flow/startTransProcessActivity.do',
		params : {
			defId : defId
		},
		scope : this,
		success : function(resp, options) {
			var object = Ext.decode(resp.responseText);
			var	 destName = object.data[0].destination;
			Ext.getCmp('callDestName').setValue(destName);
			if (destName!=null && destName != ''){
				Ext.Ajax.request({
					url : __ctxPath + '/flow/usersProcessActivity.do',
					scope : this,
					params : {
						defId : defId,
						activityName : destName
					},
					success : function(response, options) {
						var result = Ext.decode(response.responseText);
						var flowAssignId = '';
						var destTasks = Ext.getCmp('callDestName').getValue();
						
						if (destTasks != '') {
							flowAssignId = destTasks + '|' + result.userIds;
						}
						Ext.getCmp('flowAssignId').setValue(flowAssignId);
					}
				});
			}
		}
	});
};
