/**
 * @author cf0666@gmail.com
 * @createtime
 * @class ConhusunhuifangForm
 * @extends Ext.Window
 * @description CusPersonal表单
 * @company 优创融联科技
 */
ConhusunhuifangForm = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		ConhusunhuifangForm.superclass.constructor.call(this, {
					id : 'ConhusunhuifangFormWin',
					layout : 'fit',
					items : this.formPanel,
					modal : true,
					region : 'center',
					title : '呼损回访',
					buttonAlign : 'center',
					buttons : [{
								text : '保存',
								iconCls : 'btn-save',
								scope : this,
								handler : this.save
							}]
				});
	},// end of the constructor
	// 初始化组件
	initUIComponents : function() {
		var topbar_contact = new Ext.Toolbar({
					items : ['->', {
								iconCls : 'btn-del',
								text : '删除',
								xtype : 'button',
								scope : this,
								handler : this.removeSelRs_contact
							}, '->', {
								iconCls : 'btn-add',
								text : '添加',
								xtype : 'button',
								scope : this,
								handler : this.createRs_contact
							}]
				});
		var topbar_special = new Ext.Toolbar({
					items : ['->', {
								iconCls : 'btn-del',
								text : '删除',
								xtype : 'button',
								scope : this,
								handler : this.removeSelRs_contact
							}, '->', {
								iconCls : 'btn-add',
								text : '添加',
								xtype : 'button',
								scope : this,
								handler : function(){
									var win =new Ext.Window({
										title:'特殊事项',
										width:300,
										id:'specialWin',
										height:200,
										buttonAlign:'right',
										buttons:[{
											text:'确认',
											iconCls:'save'
										
										},{
											text:'关闭',
											iconCls:'close',
											handler:function(){
												Ext.getCmp('specialWin').close();
											}
										
										}],
										items:[{
												xtype:'textarea',
												width:290,
												height:150,
												border:false
											}]
									});
									win.show();
								}
								
							}]
				});
		var topbar_km = new Ext.Toolbar({
					items : []
				});
		var topbar_contacthistory = new Ext.Toolbar({
					items : []
				});
		var topbar_linkman = new Ext.Toolbar({
					items : ['->', {
								iconCls : 'btn-del',
								text : '删除',
								xtype : 'button',
								scope : this,
								handler : this.removeSelRs_linkman
							}, '->', {
								iconCls : 'btn-add',
								text : '添加',
								xtype : 'button',
								scope : this,
								handler : this.createRs_linkman
							}]
				});

		// 联系方式
		this.gridPanel_contact = new HT.EditorGridPanel({
			region : 'center',
			tbar : topbar_contact,
			autoHeight : false,
			height : 245,
			clicksToEdit : 1,
			id : 'UlContactGrid_empl',
			url : __ctxPath
					+ "/customer/listCusContact.do?Q_customer.customerId_L_EQ="
					+ this.customerId,
			fields : [{
						name : 'contactId',
						type : 'int'
					}, 'cusContact', 'contactTypeId', 'contactSubTypeId',
					'preContactNum', 'mainContactNum', 'lastContactNum',
					'isDefault', 'isChecked', 'contactRemarks', 'createTime',
					'lastUpdateTime', 'statusId'],
			columns : [{
						header : '内码',
						dataIndex : 'cusContact.contactId',
						hidden : true
					}, {
						header : '联络方式',
						dataIndex : 'contactTypeId',
						editor : new Ext.form.ComboBox({
							name : 'cusContact.contactTypeId',
							allowBlank : false,
							id : 'cusContact.contactTypeId',
							displayField : 'itemName',
							valueField : 'itemId',
							mode : 'local',
							triggerAction : 'all',
							forceSelection : false,
							hiddenName : 'cusContact.contactTypeId',
							store : new Ext.data.SimpleStore({
								url : __ctxPath
										+ '/system/loadItemDictionary.do',
								baseParams : {
									itemName : '联系方式'
								},
								fields : ['itemId', 'itemName'],
								autoLoad : true,
								method : "post",
								listeners : {
									load : function() {
										var combo = Ext
												.getCmp('cusContact.contactTypeId');
										var store = combo.getStore();
										var rows = [];// 定义数组
										for (var i = 0; i < store.getCount(); i++) { // store.getCount()为store的长度
											if (store.getAt(i).data['itemId'] == combo
													.getValue()) {
												combo
														.setValue(store
																.getAt(i).data['itemName']);
												break;
											}
										}

									}
								}
							})
						}),
						renderer : function(value) {
							if (value != null) {
								return LXFS001.get(value);
							} else {
								return ' ';
							}
						}
					}, {
						header : '地址/号码',
						dataIndex : 'mainContactNum',
						editor : new Ext.form.TextField({
									allowBlank : false,
									id : 'mainContactNum'
								})
					}, {
						header : '是否默认',
						dataIndex : 'isDefault',
						editor : new Ext.form.ComboBox({
							name : 'isDefault',
							allowBlank : false,
							id : 'isDefault',
							displayField : 'itemName',
							valueField : 'itemId',
							mode : 'local',
							triggerAction : 'all',
							forceSelection : false,
							hiddenName : 'isDefault',
							store : new Ext.data.SimpleStore({
								url : __ctxPath
										+ '/system/loadItemDictionary.do',
								baseParams : {
									itemName : '是否'
								},
								fields : ['itemId', 'itemName'],
								autoLoad : true,
								method : "post",
								listeners : {
									load : function() {
										var combo = Ext.getCmp('isDefault');
										var store = combo.getStore();
										var rows = [];// 定义数组
										for (var i = 0; i < store.getCount(); i++) { // store.getCount()为store的长度
											if (store.getAt(i).data['itemId'] == combo
													.getValue()) {
												combo
														.setValue(store
																.getAt(i).data['itemName']);
												break;
											}
										}

									}
								}
							})
						}),
						renderer : function(value) {
							if (value != null) {
								return YorN.get(value);
							} else {
								return ' ';
							}
						}
					}, {
						header : '是否核实',
						dataIndex : 'isChecked',
						editor : new Ext.form.ComboBox({
							name : 'isChecked',
							allowBlank : false,
							id : 'isChecked',
							displayField : 'itemName',
							valueField : 'itemId',
							mode : 'local',
							triggerAction : 'all',
							forceSelection : false,
							hiddenName : 'isChecked',
							store : new Ext.data.SimpleStore({
								url : __ctxPath
										+ '/system/loadItemDictionary.do',
								baseParams : {
									itemName : '是否'
								},
								fields : ['itemId', 'itemName'],
								autoLoad : true,
								method : "post",
								listeners : {
									load : function() {
										var combo = Ext.getCmp('isChecked');
										var store = combo.getStore();
										var rows = [];// 定义数组
										for (var i = 0; i < store.getCount(); i++) { // store.getCount()为store的长度
											if (store.getAt(i).data['itemId'] == combo
													.getValue()) {
												combo
														.setValue(store
																.getAt(i).data['itemName']);
												break;
											}
										}

									}
								}
							})
						}),
						renderer : function(value) {
							if (value != null) {
								return YorN.get(value);
							} else {
								return ' ';
							}
						}
					}, {
						header : '备注',
						dataIndex : 'contactRemarks',
						editor : new Ext.form.TextField({
									allowBlank : false,
									id : 'contactRemarks'

								})
					}, {
						header : '状态',
						dataIndex : 'statusId',
						editor : new Ext.form.ComboBox({
							name : 'statusId',
							allowBlank : false,
							id : 'statusId',
							displayField : 'itemName',
							valueField : 'itemId',
							mode : 'local',
							triggerAction : 'all',
							forceSelection : false,
							hiddenName : 'statusId',
							store : new Ext.data.SimpleStore({
								url : __ctxPath
										+ '/system/loadItemDictionary.do',
								baseParams : {
									itemName : '用户状态'
								},
								fields : ['itemId', 'itemName'],
								autoLoad : true,
								method : "post",
								listeners : {
									load : function() {
										var combo = Ext.getCmp('statusId');
										var store = combo.getStore();
										var rows = [];// 定义数组
										for (var i = 0; i < store.getCount(); i++) { // store.getCount()为store的长度
											if (store.getAt(i).data['itemId'] == combo
													.getValue()) {
												combo
														.setValue(store
																.getAt(i).data['itemName']);
												break;
											}
										}

									}
								}
							})
						}),
						renderer : function(value) {
							if (value != null) {
								return YHZT001.get(value);
							} else {
								return ' ';
							}
						}
					}]
				// end of columns
		});

		// 特殊事项
		this.gridPanel_special = new HT.EditorGridPanel({
			tbar : topbar_special,
			autoHeight : false,
			height : 245,
			clicksToEdit : 1,
			id : 'UlSpecialGrid_empl',
			url : __ctxPath
					+ "/customer/listCusContact.do?Q_customer.customerId_L_EQ="
					+ this.customerId,
			fields : [{
						name : 'contactId',
						type : 'int'
					}, 'cusContact', 'contactTypeId', 'contactSubTypeId',
					'preContactNum', 'mainContactNum', 'lastContactNum',
					'isDefault', 'isChecked', 'contactRemarks', 'createTime',
					'lastUpdateTime', 'statusId'],
			columns : [{
						header : '内码',
						dataIndex : 'cusContact.contactId',
						hidden : true
					}, {
						header : '内容',
						dataIndex : 'mainContactNum',
						editor : new Ext.form.TextField({
									allowBlank : false,
									id : 'mainContactNum'
								})
					}]
				// end of columns
			});

		// 业务知识
		this.gridPanel_km = new HT.EditorGridPanel({
			tbar : topbar_km,
			autoHeight : false,
			height : 245,
			clicksToEdit : 1,
			id : 'UlKmGrid_empl',
			url : __ctxPath
					+ "/customer/listCusContact.do?Q_customer.customerId_L_EQ="
					+ this.customerId,
			fields : [{
						name : 'contactId',
						type : 'int'
					}, 'cusContact', 'contactTypeId', 'contactSubTypeId',
					'preContactNum', 'mainContactNum', 'lastContactNum',
					'isDefault', 'isChecked', 'contactRemarks', 'createTime',
					'lastUpdateTime', 'statusId'],
			columns : [{
						header : '内码',
						dataIndex : 'cusContact.contactId',
						hidden : true
					}, {
						header : '标题',
						dataIndex : 'mainContactNum',
						editor : new Ext.form.TextField({
									allowBlank : false,
									id : 'mainContactNum'
								})
					}, {
						header : '关键字',
						dataIndex : 'contactRemarks',
						editor : new Ext.form.TextField({
									allowBlank : false,
									id : 'contactRemarks'

								})
					}]
				// end of columns
			});

		// 联络历史
		this.gridPanel_contacthistory = new HT.EditorGridPanel({
			region : 'center',
			tbar : topbar_contacthistory,
			autoHeight : false,
			height : 145,
			clicksToEdit : 1,
			id : 'UlContacthistoryGrid_empl',
			url : __ctxPath
					+ "/customer/listCusContact.do?Q_customer.customerId_L_EQ="
					+ this.customerId,
			fields : [{
						name : 'contactId',
						type : 'int'
					}, 'cusContact', 'contactTypeId', 'contactSubTypeId',
					'preContactNum', 'mainContactNum', 'lastContactNum',
					'isDefault', 'isChecked', 'contactRemarks', 'createTime',
					'lastUpdateTime', 'statusId'],
			columns : [{
						header : '内码',
						dataIndex : 'cusContact.contactId',
						hidden : true
					}, {
						header : '联络方式',
						dataIndex : 'contactTypeId',
						editor : new Ext.form.ComboBox({
							name : 'cusContact.contactTypeId',
							allowBlank : false,
							id : 'cusContact.contactTypeId',
							displayField : 'itemName',
							valueField : 'itemId',
							mode : 'local',
							triggerAction : 'all',
							forceSelection : false,
							hiddenName : 'cusContact.contactTypeId',
							store : new Ext.data.SimpleStore({
								url : __ctxPath
										+ '/system/loadItemDictionary.do',
								baseParams : {
									itemName : '联系方式'
								},
								fields : ['itemId', 'itemName'],
								autoLoad : true,
								method : "post",
								listeners : {
									load : function() {
										var combo = Ext
												.getCmp('cusContact.contactTypeId');
										var store = combo.getStore();
										var rows = [];// 定义数组
										for (var i = 0; i < store.getCount(); i++) { // store.getCount()为store的长度
											if (store.getAt(i).data['itemId'] == combo
													.getValue()) {
												combo
														.setValue(store
																.getAt(i).data['itemName']);
												break;
											}
										}

									}
								}
							})
						}),
						renderer : function(value) {
							if (value != null) {
								return LXFS001.get(value);
							} else {
								return ' ';
							}
						}
					}, {
						header : '地址/号码',
						dataIndex : 'mainContactNum',
						editor : new Ext.form.TextField({
									allowBlank : false,
									id : 'mainContactNum'
								})
					}, {
						header : '开始时间',
						dataIndex : 'createTime',
						editor : new Ext.form.TextField({
									allowBlank : false,
									id : 'createTime'
								})
					}, {
						header : '结束时间',
						dataIndex : 'lastUpdateTime',
						editor : new Ext.form.TextField({
									allowBlank : false,
									id : 'lastUpdateTime'
								})
					}, {
						header : '备注',
						dataIndex : 'contactRemarks',
						editor : new Ext.form.TextField({
									allowBlank : false,
									id : 'contactRemarks'

								})
					}]
				// end of columns
		});

		this.formPanel = new Ext.FormPanel({
			layout : 'form',
			bodyStyle : 'padding:10px;overflow-x:hidden',
			border : false,
			autoScroll : true,
			labelAlign : 'right',
			// id : 'ConhusunhuifangForm',
			defaults : {
				anchor : '98%,100%'
			},
			defaultType : 'textfield',
			items : [{
						name : 'cusPersonal.customerId',
						xtype : 'hidden',
						value : this.customerId == null ? '' : this.customerId
					}, {
						xtype : 'fieldset',
						title : "来电信息信息",
						collapsed : false,
						collapsible : true,
						autoHeight : true,
						defaults : {
							anchor : '100%,100%'
						},

						buttonAlign : 'right',
						buttons : [{
									text : '新增客户',
									iconCls : 'btn-add',
									scope : this,
									handler : this.cancel
								}, {
									text : '匿名客户',
									iconCls : 'btn-reset',
									scope : this,
									handler : this.save
								}, {
									text : '定位客户',
									iconCls : 'search',
									scope : this,
									handler : this.save
								}, {
									text : '加入黑名单',
									iconCls : 'btn-cancel',
									scope : this,
									handler : this.cancel
								}],

						items : [{
							layout : "column",
							xtype : 'container',
							defaults : {
								border : false,
								anchor : '100%,100%'
							},
							items : [{
											columnWidth : .33,// 第1列
											layout : "form",
											anchor:'100%',
											items : [{
														fieldLabel : '主叫号码',
														xtype : 'textfield',
														hiddenName : 'mediainfo.ani',
														id : 'mediainfo.ani_form',
														allowBlank : false,
														editable : false,
														maxLength : 128,
														anchor:'100%'
													}]
										}, {
											columnWidth : .33,// 第2列
											layout : "form",
											items : [{
														fieldLabel : '被叫号码',
														xtype : 'textfield',
														hiddenName : 'mediainfo.dnis',
														id : 'mediainfo.dnis_form',
														editable : false,
														maxLength : 128,
														anchor:'100%'
													}]
										}, {
											columnWidth : .33,// 第3列
											layout : "form",
											items : [{
												fieldLabel : '呼叫时间',
												xtype : 'textfield',
												hiddenName : 'mediainfo.remark',
												id : 'mediainfo.remark_form',
												editable : false,
												maxLength : 128,
												anchor:'100%'
											}]
										}]
							},{
							
								fieldLabel : '呼叫明细',
								xtype : 'textarea',
								editable : false,
								maxLength : 128,
								height:50,
								scrollHeight:true,
								anchor:'99%'
							}

							]
					}, {
						layout : "column",
						xtype : 'container',
						defaults : {
							border : false,
							anchor : '100%,100%'
						},
						items : [{
									columnWidth : .33,// 第1列
									layout : "form",
									items : [{
												fieldLabel : '姓名',
												xtype : 'textfield',
												hiddenName : 'cusPersonal.nameCn',
												id : 'cusHusunhuifang.nameCn_form',
												allowBlank : false,
												maxLength : 128,
												anchor:'100%'
											}, {
												fieldLabel : '称谓',
												hiddenName : 'cusPersonal.cusTitId',
												id : 'cusHusunhuifang.cusTitId_form',
												xtype : 'mtdiccombo',
												editable : true,
												lazyInit : false,
												forceSelection : false,
												itemKey : 'CONKHCW',
												anchor:'100%'
											}, {
												fieldLabel : '证件类型',
												hiddenName : 'cusPersonal.credTypId',
												id : 'cusHusunhuifang.credTypId_form',
												xtype : 'mtdiccombo',
												editable : true,
												lazyInit : false,
												forceSelection : false,
												itemKey : 'GGZJLX',
												anchor:'100%'
											}, {
												fieldLabel : '客户类别',
												hiddenName : 'cusPersonal.cusCatId',
												id : 'cusHusunhuifang.cusCatId_form',
												xtype : 'mtdiccombo',
												editable : true,
												lazyInit : false,
												forceSelection : false,
												itemKey : 'CONKHLB',
												anchor:'100%'
											}]
								}, {
									columnWidth : .33,// 第2列
									layout : "form",
									items : [{
												fieldLabel : '英文名',
												xtype : 'textfield',
												hiddenName : 'cusPersonal.nameEn',
												id : 'cusHusunhuifang.nameEn_form',
												maxLength : 128,
												anchor:'100%'
											}, {
												fieldLabel : '性别',
												hiddenName : 'cusPersonal.gender',
												id : 'cusHusunhuifang.gender_form',
												xtype : 'mtdiccombo',
												editable : true,
												lazyInit : false,
												forceSelection : false,
												itemKey : 'XB001',
												anchor:'100%'
											}, {
												fieldLabel : '证件号码',
												xtype : 'textfield',
												hiddenName : 'cusPersonal.credNum',
												id : 'cusHusunhuifang.credNum_form',
												maxLength : 128,
												anchor:'100%'
											}, {
												fieldLabel : '级别',
												hiddenName : 'cusPersonal.cusGraId',
												id : 'cusHusunhuifang.cusGraId_form',
												xtype : 'mtdiccombo',
												editable : true,
												lazyInit : false,
												forceSelection : false,
												itemKey : 'CONKHJB',
												anchor:'100%'
											}]
								}, {
									columnWidth : .33,// 第3列
									layout : "form",
									items : [{
												fieldLabel : '简称',
												hiddenName : 'cusPersonal.nameAli',
												id : 'cusHusunhuifang.nameAli_form',
												xtype : 'textfield',
												maxLength : 128,
												anchor:'100%'
											}, {
												fieldLabel : '出生日期',
												hiddenName : 'cusPersonal.birthday',
												id : 'cusHusunhuifang.birthday_form',
												xtype : 'datefield',
												format : 'Y-m-d',
												value : new Date(),
												anchor:'100%'
											}, {
												fieldLabel : '证件有效期',
												hiddenName : 'cusPersonal.credDurDat',
												id : 'cusHusunhuifang.credDurDat_form',
												xtype : 'datefield',
												format : 'Y-m-d',
												value : new Date(),
												anchor:'100%'
											}]
								}]
					}

					, {
						xtype : 'tabpanel',
						activeTab : 0,// 激活第一个panel
						plain : true,
						//height : 280,
						defaultType : 'panel',
						bodyStyle : 'padding:5px;',
						items : [{
									title : '话术',
									layout : 'form',
									defaults : {
										anchor : '100%,100%',
										border:false
									},
									items : [{
										border:false,
										height:250
									}]

								},/* {
									title : '业务知识',
									layout : 'fit',
									defaultType : 'textfield',
									defaults : {
										anchor : '100%,100%'
									},
									items : [this.gridPanel_km]
								}, */{
									title : '特殊事项',
									layout : 'fit',
									defaultType : 'textfield',
									defaults : {
										anchor : '100%,100%'
									},
									items : [this.gridPanel_special]
								}]

					}, {
						xtype : 'fieldset',
						title : "联络历史",
						collapsed : false,
						collapsible : true,
						autoHeight : true,
						defaults : {
							anchor : '100%,100%'
						},
						items : [this.gridPanel_contacthistory]
					}, {
						xtype : 'fieldset',
						title : "来电小结",
						collapsed : false,
						collapsible : true,
						autoHeight : true,
						defaults : {
							anchor : '100%,100%'
						},
						items : [{
							layout : "column",
							xtype : 'container',
							defaults : {
								border : false
							},
							items : [{
										columnWidth : .3,// 第1列
										layout : "form",
										items : [{
													fieldLabel : '交易类型',
													hiddenName : 'callres.busiType',
													id : 'callres.busiType_formx',
													xtype : 'mtdiccombo',
													editable : true,
													lazyInit : false,
													forceSelection : false,
													itemKey : 'CONTPJYLX',
													anchor:'100%'

												}]
									}, {
										columnWidth : .3,// 第2列
										layout : "form",
										items : [{
													fieldLabel : '处理结果',
													hiddenName : 'callres.dealResult',
													id : 'callres.dealResult_form',
													xtype : 'mtdiccombo',
													editable : true,
													lazyInit : false,
													forceSelection : false,
													itemKey : 'CONTPCLJG',
													anchor:'100%'
												}]
									}]
						}, {
							fieldLabel : '备注',
							name : 'callres.remark',
							xtype : 'textarea',
							maxLength : 2048,
							height : 40
						}

						]
					}
			// , {
			// fieldLabel : '创建人ID',
			// name : 'cusPersonal.creUseId',
			// allowBlank : false,
			// xtype : 'numberfield'
			// }
			//
			// , {
			// fieldLabel : '创建日期',
			// name : 'cusPersonal.creDat',
			// allowBlank : false,
			// xtype : 'datefield',
			// format : 'Y-m-d',
			// value : new Date()
			// }
			//
			// , {
			// fieldLabel : '修改人ID',
			// name : 'cusPersonal.updUseId',
			// xtype : 'numberfield'
			// }
			//
			// , {
			// fieldLabel : '修改日期',
			// name : 'cusPersonal.updDat',
			// xtype : 'datefield',
			// format : 'Y-m-d',
			// value : new Date()
			// }
			//
			// , {
			// fieldLabel : '扩展字段1',
			// name : 'cusPersonal.ext1',
			// maxLength : 256
			// }
			//
			// , {
			// fieldLabel : '扩展字段',
			// name : 'cusPersonal.ext2',
			// maxLength : 256
			// }
			//
			// , {
			// fieldLabel : '扩展字段',
			// name : 'cusPersonal.ext3',
			// maxLength : 256
			// }
			//
			// , {
			// fieldLabel : '扩展字段',
			// name : 'cusPersonal.ext4',
			// maxLength : 256
			// }
			//
			// , {
			// fieldLabel : '扩展字段',
			// name : 'cusPersonal.ext5',
			// maxLength : 256
			// }
			//
			// , {
			// fieldLabel : '扩展字段',
			// name : 'cusPersonal.ext6',
			// maxLength : 256
			// }
			//
			// , {
			// fieldLabel : '扩展字段',
			// name : 'cusPersonal.ext8',
			// maxLength : 256
			// }
			//
			// , {
			// fieldLabel : '扩展字段',
			// name : 'cusPersonal.ext7',
			// maxLength : 256
			// }
			//
			// , {
			// fieldLabel : '扩展字段',
			// name : 'cusPersonal.ext9',
			// maxLength : 256
			// }
			//
			// , {
			// fieldLabel : '扩展字段',
			// name : 'cusPersonal.ext10',
			// maxLength : 256
			// }
			//
			// , {
			// fieldLabel : '扩展字段',
			// name : 'cusPersonal.ext11',
			// xtype : 'textarea',
			// maxLength : 1024
			// }
			//
			// , {
			// fieldLabel : '扩展字段',
			// name : 'cusPersonal.ext12',
			// xtype : 'textarea',
			// maxLength : 1024
			// }
			//
			// , {
			// fieldLabel : '扩展字段',
			// name : 'cusPersonal.ext13',
			// xtype : 'textarea',
			// maxLength : 1024
			// }
			//
			// , {
			// fieldLabel : '扩展字段',
			// name : 'cusPersonal.ext14',
			// xtype : 'textarea',
			// maxLength : 1024
			// }
			//
			// , {
			// fieldLabel : '扩展字段',
			// name : 'cusPersonal.ext15',
			// xtype : 'textarea',
			// maxLength : 1024
			// }
			//
			// , {
			// fieldLabel : '扩展字段',
			// name : 'cusPersonal.ext16',
			// xtype : 'textarea',
			// maxLength : 2048
			// }
			//
			// , {
			// fieldLabel : '扩展字段',
			// name : 'cusPersonal.ext17',
			// xtype : 'textarea',
			// maxLength : 2048
			// }
			//
			// , {
			// fieldLabel : '扩展字段',
			// name : 'cusPersonal.ext18',
			// xtype : 'textarea',
			// maxLength : 2048
			// }
			//
			// , {
			// fieldLabel : '扩展字段',
			// name : 'cusPersonal.ext19',
			// xtype : 'textarea',
			// maxLength : 2048
			// }
			//
			// , {
			// fieldLabel : '扩展字段',
			// name : 'cusPersonal.ext20',
			// xtype : 'textarea',
			// maxLength : 2048
			// }

			]
		});

		this.customerId = 10062;
		// 加载表单对应的数据
		if (this.customerId != null && this.customerId != 'undefined') {
			/*
			 * this.formPanel.loadData({ url : __ctxPath +
			 * '/customer/getCusPersonal.do?customerId=' + this.customerId, root :
			 * 'data', preName : 'cusPersonal', success : function(response,
			 * options) { var thisObj =
			 * Ext.util.JSON.decode(response.responseText).data;
			 * Ext.getCmp('cusPersonal.cusTitId_form').setValue(thisObj.cusTitId);
			 * Ext.getCmp('cusPersonal.credTypId_form').setValue(thisObj.credTypId);
			 * Ext.getCmp('cusPersonal.cusCatId_form').setValue(thisObj.cusCatId);
			 * Ext.getCmp('cusPersonal.gender_form').setValue(thisObj.gender);
			 * Ext.getCmp('cusPersonal.cusGraId_form').setValue(thisObj.cusGraId);
			 * //Ext.getCmp('cusPersonal.cusEduId_form').setValue(thisObj.cusEduId);
			 * //Ext.getCmp('cusPersonal.country_form').setValue(thisObj.country);
			 * //Ext.getCmp('cusPersonal.cusTraId_form').setValue(thisObj.cusTraId);
			 * //Ext.getCmp('cusPersonal.cusFromId_form').setValue(thisObj.cusFromId);
			 * //Ext.getCmp('cusPersonal.jobTypId_form').setValue(thisObj.jobTypId);
			 * //Ext.getCmp('cusPersonal.hasChecked_form').setValue(thisObj.hasChecked);
			 * //Ext.getCmp('cusPersonal.hasMarried_form').setValue(thisObj.hasMarried);
			 * //Ext.getCmp('cusPersonal.haveChild_form').setValue(thisObj.haveChild);
			 * //Ext.getCmp('cusPersonal.staId_form').setValue(thisObj.staId);
			 * 
			 * Ext.getCmp('cusPersonal.nameCn_form').setValue(thisObj.nameCn);
			 * Ext.getCmp('cusPersonal.nameEn_form').setValue(thisObj.nameEn);
			 * Ext.getCmp('cusPersonal.credNum_form').setValue(thisObj.credNum);
			 * Ext.getCmp('cusPersonal.nameAli_form').setValue(thisObj.nameAli);
			 * Ext.getCmp('cusPersonal.birthday_form').setValue(thisObj.birthday);
			 * Ext.getCmp('cusPersonal.credDurDat_form').setValue(thisObj.credDurDat); },
			 * failure : function(response, options) { Ext.ux.Toast.msg('操作信息',
			 * '操作出错，请联系管理员！'); } });
			 */
		}

		/*
		 * Ext.getCmp('mediainfo.ani_form').setValue('qinghuasunny@163.com');
		 * Ext.getCmp('mediainfo.dnis_form').setValue('cc@cqnsh.com');
		 * Ext.getCmp('mediainfo.remark_form').setValue('关于重庆农商行信用卡办卡需要提供资料的咨询.');
		 * Ext.getCmp('mediainfo.ani2_form').setValue('qinghuasunny@163.com');
		 * Ext.getCmp('mediainfo.dnis2_form').setValue('cc@cqnsh.com');
		 * Ext.getCmp('mediainfo.remark2_form').setValue('关于重庆农商行信用卡办卡需要提供资料的咨询.');
		 * Ext.getCmp('mediainfo.content2_form')
		 * .setValue('请问贵行信用卡办卡需要提供资料，已经相关的收费明细.');
		 */

	},// end of the initcomponents

	createRs_contact : function() {
		var store = this.gridPanel_contact.getStore();
		var recordType = store.recordType;
		store.add(new recordType({})); // 添加一行空store
	},

	removeSelRs_contact : function() {
		$delGridRs({
					url : __ctxPath + '/xitong/multiDelContactUlEmployee.do',
					grid : this.gridPanel_contact,
					idName : 'contactEmplId'
				});
		this.gridPanel_contact.getStore().reload();
	},

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
		var store = this.gridPanel_contact.getStore();
		var rows = [];// 定义数组
		for (var i = 0; i < store.getCount(); i++) { // store.getCount()为store的长度
			rows.push(store.getAt(i).data);// 放到数组里
		}
		$postForm({
					formPanel : this.formPanel,
					scope : this,
					url : __ctxPath + '/customer/saveCusPersonal.do',
					params : {
						details : Ext.encode(rows)
					},
					callback : function(fp, action) {
						var gridPanel = Ext.getCmp('CusPersonalGrid');
						if (gridPanel != null) {
							gridPanel.getStore().reload();
						}
						this.close();
					}
				});
	},// end of save

	dial : function() {
		top.dial('18701575606');
	}

		/*
		 * ,{ text : '外呼', iconCls : 'btn-reset', scope : this, handler :
		 * this.dial }
		 */

});