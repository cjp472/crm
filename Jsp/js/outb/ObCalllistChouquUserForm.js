/**
 * @author cf0666@gmail.com
 * @createtime
 * @class ObCalllistChouquUserForm
 * @extends Ext.Window
 * @description ObCallbatch表单
 * @company 优创融联科技
 */
ObCalllistChouquUserForm = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		ObCalllistChouquUserForm.superclass.constructor.call(this, {
					id : 'ObCalllistChouquUserFormWin',
					layout : 'fit',
					items : this.formPanel,
					modal : true,
					height : 400,
					width : 500,
					maximizable : true,
					title : '客户名单抽取',
					buttonAlign : 'center',
					buttons : [{
								text : '抽取',
								iconCls : 'btn-save',
								scope : this,
								handler : this.save
							}, {
								text : __cancel,
								iconCls : 'btn-cancel',
								scope : this,
								handler : this.cancel
							}],
					listeners:{
						
					
					}
				});

	},// end of the constructor
	// 初始化组件
	initUIComponents : function() {
		var combo_obcom_form = new Ext.form.ComboBox({
				xtype : 'combo',
				mode : 'local',
				id:'combo_obcom_Id_chouqucus',
				fieldLabel : '营销活动',
				anchor : '100%',
				valueField:'comId',//设置隐藏的value值字段
				displayField:'comName',//设置显示的value值字段
				store:new Ext.data.SimpleStore({//new一个SimpleStore
					fields:['comId','comName'],	//设定键/值
					data:[]					//默认的data必须提供
				}),
				listeners : {
					'select' : function(combo, record,index) {
						var comIdVal = combo_obcom_form.getValue();
						combo_calllist_form.clearValue();
						ObCalllistChouquUserForm.getStoreCallist(comIdVal);
					}
				}
		});	
		
		var combo_calllist_form = new Ext.form.ComboBox({
				xtype : 'combo',
				mode : 'local',
				id : 'combo_obcalllist_Id_chouqucus',
				fieldLabel : '呼叫名单',
				anchor : '100%',
				valueField:'calllistId',//设置隐藏的value值字段
				displayField:'calllistName',//设置显示的value值字段
				store:new Ext.data.SimpleStore({//new一个SimpleStore
					fields:['calllistId','calllistName'],	//设定键/值
					data:[]					//默认的data必须提供
				}),
				listeners : {
					
				}
		});			
		
		this.gridPanelUser_history = new HT.EditorGridPanel({
			region : 'center',
			id : 'gridPanelUser_history',
			scrollHeight : true,
			height : 150,
			tbar : ['->', {
						iconCls : 'btn-add',
						text : '增加',
						handler : function() {
							var store = Ext.getCmp('gridPanelUser_history')
									.getStore();
							var recordType = store.recordType;
							store.add(new recordType({})); // 添加一行空store
						}
					}, {
						iconCls : 'btn-del',
						text : '删除',
						xtype : 'button',
						handler : function() {
							var store = Ext.getCmp('gridPanelUser_history')
									.getStore();
							var sm = Ext.getCmp('gridPanelUser_history')
									.getSelectionModel();
							var cell = sm.getSelections();
							if (cell.length < 1) {
								Ext.ux.Toast.msg('提示信息', '请至少选择一条记录!');
							} else {
								store.remove(cell);
							}
						}
					}],
			clicksToEdit : 1,
			url : __ctxPath + "/xitong/getContactUlEmployee.do?useid=",
			fields : [{
						name : 'contactEmplId',
						type : 'int'
					}, 'contactType', 'contactValue'],
			columns : [{
						header : '条件',
						dataIndex : 'contactType2',
						editor : new Ext.form.ComboBox({
									mode : 'local',
									store : [[0, '姓名'], [1, '性别'], [2, '年龄']]
								})
					}, {
						header : '关系',
						dataIndex : 'contactValue',
						editor : new Ext.form.ComboBox({
									mode : 'local',
									store : [[0, '>='], [1, '<='], [2, '='],
											[3, 'like'], [4, 'in'],
											[5, 'between']]
								})
					}, {
						header : '表达式',
						dataIndex : 'contactType3',
						editor : new Ext.form.TextField({

						})
					}]
				// end of columns
			});
		this.gridPanel = new HT.EditorGridPanel({
			region : 'center',
			scrollHeight : true,
			height : 250,
			clicksToEdit : 1,
			url : __ctxPath + "/xitong/getContactUlEmployee.do?useid=",
			fields : [{
						name : 'contactEmplId',
						type : 'int'
					}, 'contactType', 'contactValue'],
			columns : [{
						header : '名称',
						dataIndex : 'contactType'
					}, {
						header : '工号',
						dataIndex : 'contactType2'
					}, {
						header : '可抽取名单数',
						dataIndex : 'contactValue'
					}, {
						header : '抽取数量',
						dataIndex : 'contactType3',
						editor : new Ext.form.TextField({

						})
					}]
				// end of columns
			});

		this.formPanel = new Ext.FormPanel({
			layout : 'form',
			bodyStyle : 'padding:10px',
			border : false,
			autoScroll : true,
			labelAlign : 'right',
			defaults : {
				anchor : '96%,96%'
			},
			items : [
//				{
//						xtype : 'fieldset',
//						title : '抽取来源',
//						collapsed : false,
//						collapsible : true,
//						items : [{
//					layout : 'column',
//					border : false,
//					items : [{
//						layout : 'form',
//						border : false,
//						columnWidth : .5,
//						items : [{
//									layout : 'column',
//									border : false,
//									items : [{
//												columnWidth : .9,
//												border : false,
//												layout : 'form',
//												items : [{
//															xtype : 'textfield',
//															anchor : '100%',
//															fieldLabel : '营销项目'
//														}]
//											}, {
//												columnWidth : .1,
//												xtype : 'button',
//												iconCls : 'search',
//												handler : function() {
//												}
//											}]
//								}, {
//									layout : 'form',
//									border : false,
//									items : [{
//												xtype : 'combo',
//												anchor : '100%',
//												fieldLabel : '呼叫名单',
//												mode : 'local',
//												store : []
//											}]
//								}]
//					}, {
//						layout : 'form',
//						border : false,
//						columnWidth : .5,
//						items : [{
//									layout : 'form',
//									border : false,
//									items : [{
//												xtype : 'combo',
//												anchor : '100%',
//												fieldLabel : '营销活动',
//												mode : 'local',
//												store : []
//											}]
//								}, {
//									layout : 'form',
//									border : false,
//									items : [{
//												xtype : 'combo',
//												anchor : '100%',
//												fieldLabel : '批次',
//												mode : 'local',
//												store : []
//											}]
//								}]
//					}]
//				}]
//					},
					{
						xtype : 'fieldset',
						title : '抽取规则',
						collapsible : true,
						items : [{
							layout : 'column',
							border : false,
							items : [
//								{
//								columnWidth : .25,
//								border : false,
//								style:'margin-left:20px',
//								items : [{
//											xtype : 'radio',
//											anchor : '100%',
//											name : 'radio',
//											fieldLabel : '回收规则',
//											boxLabel : '全部',
//											listeners : {
//												'check' : function(radio, check) {
//													if (check) {
//														Ext.get('huishoutj').dom.style.display = 'none';
//													}
//												}
//											}
//										},{
//										xtype : 'radio',
//										anchor : '100%',
//										name : 'radio',
//										checked : true,
//										boxLabel : '按条件',
//										listeners : {
//											'check' : function(radio, check) {
//												if (check) {
//													Ext.get('huishoutj').dom.style.display = 'block';
//												}
//											}
//										}
//									}]
//
//							},
							{
							xtype : 'panel',
							columnWidth : .99,
							border : false,
							id : 'huishoutj',
							items : [this.gridPanelUser_history]
						}]
						}]
					}, {
						xtype : 'fieldset',
						title : '抽取目标',
						collapsible : true,
						collapsed : true,
						items : [{
							border : false,
							style : 'padding-top:10px',
							layout : 'form',
							items : [{
								layout : 'column',
								border : false,
								items : [{
									border : false,
									columnWidth : .5,
									items : [{
										layout : 'column',
										border : false,
										items : [{
											layout : 'form',
											columnWidth : .9,
											border : false,
											items : [{
												fieldLabel : '营销项目',
												id:'cusChouqu.callbatchNam',
												name : 'obCallbatch.callbatchNam',
												allowBlank : false,
												anchor : '100%',
												xtype : 'textfield',
												maxLength : 512
											}]
										}, {
											xtype : 'button',
											columnWidth : .1,
											iconCls : 'search',
											handler : function() {
												ObProjectSelector.getView(
														function(projId, projNam,
																perIncharge,
																ownerTeam) {
															Ext.getCmp('cusChouqu.callbatchNam').setValue(projNam);
															//Ext.getCmp('obCalllistHuishouh.callbatchIds').setValue(projId);
															combo_obcom_form.clearValue();
															combo_calllist_form.clearValue();
															ObCalllistChouquUserForm.getStoreCom(projId);//作用域限定：ObCalllistMFeipeiForm														
														}).show();
											}											
										}]
									}, {
										layout : 'form',
										border : false,
										items : [combo_calllist_form]
									}]
								}, {
									border : false,
									columnWidth : .5,
									items : [{
												layout : 'form',
												border : false,
												items : [combo_obcom_form]
											}]
								}]
							}]
						}]
					}]
		});

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
		this.close();
	},
	/**
	 * 保存记录
	 */
	save : function() {
		$postSubForm({
					formPanel : this.formPanel,
					scope : this,
					url : __ctxPath + '/outb/saveObCallbatch.do',
					msgSuccess : '成功删除该记录！',
					msgFailure : '操作出错，请联系管理员！',
					callback : function(fp, action) {
						var gridPanel = Ext.getCmp('ObCallbatchGrid');
						if (gridPanel != null) {
							gridPanel.getStore().reload();
						}
						this.close();
					}
				});
	}// end of save

});

ObCalllistChouquUserForm.getStoreCom = function(projId) {//注意作用域限定，ObCalllistMFeipeiForm.getStoreCom
		Ext.Ajax.request({
			url :  __ctxPath + '/outb/getObComObCallbatchAss.do?projId='+projId,
			method : 'post',
			success : function(response) {
				var result = Ext.util.JSON.decode(response.responseText);//解析数据
				Ext.getCmp("combo_obcom_Id_chouqucus").getStore().loadData(result);//获取组件，加载数据
			},
			failure : function() {
			}
		});
}

ObCalllistChouquUserForm.getStoreCallist = function(comId) {//注意作用域限定，ObCalllistMFeipeiForm.getStoreCom
		Ext.Ajax.request({
			url :  __ctxPath + '/outb/getObCalllistObCallbatchAss.do?comId='+comId,
			method : 'post',
			success : function(response) {
				alert(response.responseText);
				var result = Ext.util.JSON.decode(response.responseText);//解析数据
				alert(result);
				Ext.getCmp("combo_obcalllist_Id_chouqucus").getStore().loadData(result);//获取组件，加载数据
			},
			failure : function() {
			}
		});
}