/**
 * @author cf0666@gmail.com
 * @createtime
 * @class CusPersonalFormMediain
 * @extends Ext.Window
 * @description CusPersonal表单
 * @company 优创融联科技
 */
ConWeichuliFormLingYong = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);

		// 必须先初始化组件
		this.initUIComponents();
		ConWeichuliFormLingYong.superclass.constructor.call(this, {
					id : 'CusWeichuliFormLingYongWin',
					layout : 'fit',
					items : this.formPanel,
					modal : true,
					region : 'center',
					title : '领用未处理信息',
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
		var lingyongCustomerId = -1;
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
						handler : this.removeSelRs_special
					}, '->', {
						iconCls : 'btn-add',
						text : '添加',
						xtype : 'button',
						scope : this,
						handler : this.createRs_special
//						handler : function() {
//							var win = new Ext.Window({
//										title : '特殊事项',
//										width : 300,
//										id : 'ConWeichuliFormLingYong.specialWin',
//										height : 200,
//										buttonAlign : 'right',
//										buttons : [{
//													text : '确认',
//													iconCls : 'save'
//
//												}, {
//													text : '关闭',
//													iconCls : 'close',
//													handler : function() {
//														Ext
//																.getCmp('specialWin')
//																.close();
//													}
//
//												}],
//										items : [{
//													xtype : 'textarea',
//													width : 290,
//													height : 150,
//													border : false
//												}]
//									});
//							win.show();
//						}

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
			id : 'ConWeichuliFormLingYong.UlContactGrid_empl',
			// url : __ctxPath
			// + "/customer/listCusContact.do?Q_customer.customerId_L_EQ="
			// + this.customerId,
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
							id : 'ConWeichuliFormLingYong.contactTypeId',
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
												.getCmp('ConWeichuliFormLingYong.contactTypeId');
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
									id : 'ConWeichuliFormLingYong.mainContactNum'
								})
					}, {
						header : '是否默认',
						dataIndex : 'isDefault',
						editor : new Ext.form.ComboBox({
							name : 'isDefault',
							allowBlank : false,
							id : 'ConWeichuliFormLingYong.isDefault',
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
										var combo = Ext
												.getCmp('ConWeichuliFormLingYong.isDefault');
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
							id : 'ConWeichuliFormLingYong.isChecked',
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
										var combo = Ext
												.getCmp('ConWeichuliFormLingYong.isChecked');
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
									id : 'ConWeichuliFormLingYong.contactRemarks'

								})
					}, {
						header : '状态',
						dataIndex : 'statusId',
						editor : new Ext.form.ComboBox({
							name : 'statusId',
							allowBlank : false,
							id : 'ConWeichuliFormLingYong.statusId',
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
										var combo = Ext
												.getCmp('ConWeichuliFormLingYong.statusId');
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
			id : 'ConWeichuliFormLingYong.UlSpecialGrid_empl',
			url : __ctxPath
					+ "/customer/listCusSpeEve.do",
			baseParams:{
				'Q_customer.customerId_L_EQ' : lingyongCustomerId
			},
			fields : [{
						name : 'eveId',
						type : 'int'
					}, 'cusSpeEve', 'eveContent', 'remark', 'creUseId',
					'creDat', 'updUseId', 'updDat', 'staId'],
			columns : [{
						header : '内码',
						dataIndex : 'eveId',
						hidden : true
					}, {
						header : '内容',
						dataIndex : 'eveContent',
						editor : new Ext.form.TextField({
									allowBlank : false,
									id : 'ConWeichuliFormLingYong.eveContent'
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
			id : 'ConWeichuliFormLingYong.UlKmGrid_empl',
			// url : __ctxPath
			// + "/customer/listCusContact.do?Q_customer.customerId_L_EQ="
			// + this.customerId,
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
									id : 'ConWeichuliFormLingYong.mainContactNum'
								})
					}, {
						header : '关键字',
						dataIndex : 'contactRemarks',
						editor : new Ext.form.TextField({
									allowBlank : false,
									id : 'ConWeichuliFormLingYong.contactRemarks'

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
			id : 'ConWeichuliFormLingYong.UlContacthistoryGrid_empl',
			url : __ctxPath
					+ "/customer/listCusContact.do" ,
			baseParams:{
				'Q_customer.customerId_L_EQ' : lingyongCustomerId
			},
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
							id : 'Contacthistory.contactTypeId',
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
												.getCmp('ConWeichuliFormLingYong.contactTypeId');
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
									id : 'ConWeichuliFormLingYong.mainContactNum'
								})
					}, {
						header : '开始时间',
						dataIndex : 'createTime',
						editor : new Ext.form.TextField({
									allowBlank : false,
									id : 'ConWeichuliFormLingYong.createTime'
								})
					}, {
						header : '结束时间',
						dataIndex : 'lastUpdateTime',
						editor : new Ext.form.TextField({
									allowBlank : false,
									id : 'ConWeichuliFormLingYong.lastUpdateTime'
								})
					}, {
						header : '备注',
						dataIndex : 'contactRemarks',
						editor : new Ext.form.TextField({
									allowBlank : false,
									id : 'ConWeichuliFormLingYong.contactRemarks'

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
			// id : 'CusPersonalFormMediain',
			defaults : {
				anchor : '98%,100%'
			},
			defaultType : 'textfield',
			items : [{
						name : 'conWeichuliLingyong.speLineIds',
						id : 'conWeichuliLingyong.speLineIds',
						xtype : 'hidden'
					}, {
						name : 'cusPersonal.customerId',
						id : 'ConWeichuliFormLingyong.customerId',
						xtype : 'hidden'
					}, {
						xtype : 'fieldset',
						title : "来电信息详情",
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
									handler : this.newCusPersonal
								}, {
									text : '匿名客户',
									iconCls : 'btn-reset',
									scope : this,
									handler : this.nonameCusPersonal
								}, {
									text : '定位客户',
									iconCls : 'search',
									scope : this,
									handler : this.postinCusPersonal
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
								anchor : '100%',
								items : [{
									fieldLabel : '主叫号码',
									xtype : 'textfield',
									hiddenName : 'ConWeichuliFormLingYong.mainContactNum',
									id : 'ConWeichuliFormLingYong.mainContactNum',
									allowBlank : false,
									editable : false,
									readOnly : true,
									maxLength : 128,
									anchor : '100%'
								}]
							}, {
								columnWidth : .33,// 第2列
								layout : "form",
								items : [{
									fieldLabel : '被叫号码',
									xtype : 'textfield',
									hiddenName : 'ConWeichuliFormLingYong.dnis',
									id : 'ConWeichuliFormLingYong.dnis_form',
									editable : false,
									maxLength : 128,
									anchor : '100%'
								}]
							}, {
								columnWidth : .33,// 第3列
								layout : "form",
								items : [{
									fieldLabel : '呼叫时间',
									xtype : 'textfield',
									hiddenName : 'ConWeichuliFormLingYong.creTime',
									id : 'ConWeichuliFormLingYong.creTime',
									editable : false,
									readOnly : true,
									maxLength : 128,
									anchor : '100%'
								}]
							}]
						}, {

							fieldLabel : '主题',
							xtype : 'textfield',
							name : 'ConWeichuliFormLingYong.title',
							editable : false,
							maxLength : 128,
							anchor : '99%'
						}

						]
					}, {
						layout : "column",
						xtype : 'container',
						id : 'CusContainer',
						hidden : true,
						defaults : {
							border : false,
							anchor : '100%,100%'
						},
						items : [{
							columnWidth : .33,// 第1列
							layout : "form",
							id : 'CusContainer_col1',
							items : [{
										fieldLabel : '姓名',
										xtype : 'textfield',
										name : 'cusPersonal.nameCn',
										id : 'ConWeichuliFormLingYong.customerName',
										allowBlank : false,
										maxLength : 128,
										anchor : '100%'
									}, {
										fieldLabel : '称谓',
										hiddenName : 'cusPersonal.cusTitId',
										id : 'ConWeichuliFormLingYong.cusTitId_form',
										xtype : 'mtdiccombo',
										editable : true,
										lazyInit : false,
										forceSelection : false,
										itemKey : 'CONKHCW',
										anchor : '100%'
									}, {
										fieldLabel : '证件类型',
										hiddenName : 'cusPersonal.credTypId',
										id : 'ConWeichuliFormLingYong.credTypId_form',
										xtype : 'mtdiccombo',
										editable : true,
										lazyInit : false,
										forceSelection : false,
										itemKey : 'GGZJLX',
										anchor : '100%'
									}, {
										fieldLabel : '客户类别',
										hiddenName : 'cusPersonal.cusCatId',
										id : 'ConWeichuliFormLingYong.cusCatId_form',
										xtype : 'mtdiccombo',
										editable : true,
										lazyInit : false,
										forceSelection : false,
										itemKey : 'CONKHLB',
										anchor : '100%'
									}]
						}, {
							columnWidth : .33,// 第2列
							layout : "form",
							id : 'CusContainer_col2',
							items : [{
										fieldLabel : '英文名',
										xtype : 'textfield',
										name : 'cusPersonal.nameEn',
										id : 'ConWeichuliFormLingYong.nameEn_form',
										maxLength : 128,
										anchor : '100%'
									}, {
										fieldLabel : '性别',
										hiddenName : 'cusPersonal.gender',
										id : 'ConWeichuliFormLingYong.gender_form',
										xtype : 'mtdiccombo',
										editable : true,
										lazyInit : false,
										forceSelection : false,
										itemKey : 'XB001',
										anchor : '100%'
									}, {
										fieldLabel : '证件号码',
										xtype : 'textfield',
										name : 'cusPersonal.credNum',
										id : 'ConWeichuliFormLingYong.credNum_form',
										maxLength : 128,
										anchor : '100%'
									}, {
										fieldLabel : '级别',
										hiddenName : 'cusPersonal.cusGraId',
										id : 'ConWeichuliFormLingYong.cusGraId_form',
										xtype : 'mtdiccombo',
										editable : true,
										lazyInit : false,
										forceSelection : false,
										itemKey : 'CONKHJB',
										anchor : '100%'
									}]
						}, {
							columnWidth : .33,// 第3列
							layout : "form",
							id : 'CusContainer_col3',
							items : [{
										fieldLabel : '简称',
										name : 'cusPersonal.nameAli',
										id : 'ConWeichuliFormLingYong.nameAli_form',
										xtype : 'textfield',
										maxLength : 128,
										anchor : '100%'
									}, {
										fieldLabel : '出生日期',
										name : 'cusPersonal.birthday',
										id : 'ConWeichuliFormLingYong.birthday_form',
										xtype : 'datefield',
										format : 'Y-m-d',
										value : new Date(),
										anchor : '100%'
									}, {
										fieldLabel : '证件有效期',
										name : 'cusPersonal.credDurDat',
										id : 'ConWeichuliFormLingYong.credDurDat_form',
										xtype : 'datefield',
										format : 'Y-m-d',
										value : new Date(),
										anchor : '100%'
									},{
										fieldLabel : '客户号',
										name : 'cusPersonal.customerNo',
										id : 'ConWeichuliFormLingYong.customerNo',
										xtype : 'textfield',
										allowBlank : false,
										maxLength : 128,
										anchor : '99%'
									}]
						}]
					}

					, {
						xtype : 'tabpanel',
						activeTab : 0,// 激活第一个panel
						plain : true,
						// height : 280,
						labelWidth : 1,
						defaultType : 'panel',
						// bodyStyle : 'padding:5px;',
						items : [{
									title : '多媒体信息',
									layout : 'form',
									id : 'ConWeiChuliFormLingYong.mediaInfo',
									defaultType : 'textfield',
									defaults : {
										anchor : '100%,100%'
									},
									items : [{
												fieldLabel : '收件人'
											}, {
												fieldLabel : '发件人'
											}, {
												fieldLabel : '抄送'
											}, {
												fieldLabel : '主题'
											}, {
												fieldLabel : '附件',
												xtype : 'panel',
												border : false,
												html : '<a href="">附件内容</a>'
											}, {
												xtype : 'fckeditor',
												height : 250,
												width : 900,
												// anchor : '100% ,50%',
												maxLength : 65535
											}]

								},/*
									 * { title : '业务知识', layout : 'fit',
									 * defaultType : 'textfield', defaults : {
									 * anchor : '100%,100%' }, items :
									 * [this.gridPanel_km] },
									 */{
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
						autoLoad : false,
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
									id : 'ConWeichuliFormLingYong.busiType_formx',
									xtype : 'mtdiccombo',
									editable : true,
									lazyInit : false,
									forceSelection : false,
									itemKey : 'CONTPJYLX',
									anchor : '100%'

								}]
							}, {
								columnWidth : .3,// 第2列
								layout : "form",
								items : [{
									fieldLabel : '处理结果',
									hiddenName : 'callres.dealResult',
									id : 'ConWeichuliFormLingYong.dealResult_form',
									xtype : 'mtdiccombo',
									editable : true,
									lazyInit : false,
									forceSelection : false,
									itemKey : 'CONTPCLJG',
									anchor : '100%'
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

		/**
		 * 对多媒体信息进行处理 显示相应的信息 ConWeiChuliFormLingYong.mediaInfo
		 * 
		 */
		var allInfo = Ext.getCmp('ConWeiChuliFormLingYong.mediaInfo');
		allInfo.removeAll();

		allInfo.add({
			name : 'ConWeiChuliFormLingYong.content',
			id : 'ConWeiChuliFormLingYong.content',
			xtype : 'displayfield',
			autoScroll : true,
			anchor : '100%',
			layout : 'form',
			style : 'width:98%;',
			value : '<img src="attachFiles/201206/fax_913720517865_70398_16_0_59.gif" />',
			height : 250
		});

		// 加载表单对应的数据
		if (this.conId != null && this.conId != 'undefined') {
			this.formPanel.loadData({
						url : __ctxPath + '/customer/getConWeichuli.do?conId='
								+ this.conId,
						root : 'data',
						waitMsg : '正在载入数据...',
						preName : 'ConWeichuliFormLingYong',
						success : function(response, options) {
						},
						failure : function(form, action) {
							Ext.ux.Toast.msg(__toastMessage, __operationFailed);
						}
					});

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
	
	createRs_special : function() {
		var store = this.gridPanel_special.getStore();
		var recordType = store.recordType;
		store.add(new recordType({})); // 添加一行空store
	},
	removeSelRs_special : function() {
		var store = this.gridPanel_special.getStore();
		var sm = this.gridPanel_special.getSelectionModel();
		var cell = sm.getSelections();
		var grid = Ext.getCmp('ConWeichuliFormLingYong.UlSpecialGrid_empl');
		var rows = grid.getSelectionModel().getSelections();
		var lines = [];
		if(Ext.getCmp('conWeichuliLingyong.speLineIds').getValue()!=''){
			lines.push(Ext.getCmp('conWeichuliLingyong.speLineIds').getValue());
		}
		for (var i = 0; i < rows.length; i++) {
			if(rows[i].data.eveId!=null){
				lines.push(rows[i].data.eveId);
			}
		}

		if(cell.length<1){
			Ext.ux.Toast.msg('提示信息', '请至少选择一条记录!');
		} else {
			store.remove(cell);
			Ext.getCmp('conWeichuliLingyong.speLineIds').setValue(lines);
		}
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
		var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ConWeichuliFormJiaRuHMDWin');
				if (aForm != null) {
					tabs.remove('ConWeichuliFormJiaRuHMDWin');
				}
				var ids = this.conId;
				aForm = new ConWeichuliFormJiaRuHMD({
							conId : ids
						});
				tabs.add(aForm);
				tabs.activate(aForm);
	},
	/**
	 * 保存记录
	 */
	save : function() {
		var store = this.gridPanel_special.getStore();
		var rows = [];// 定义数组
		for (var i = 0; i < store.getCount(); i++) { // store.getCount()为store的长度
			rows.push(store.getAt(i).data);// 放到数组里
		}
		var delLines = [];
		if(Ext.getCmp('conWeichuliLingyong.speLineIds').getValue()!=""){
			delLines.push(Ext.getCmp('conWeichuliLingyong.speLineIds').getValue());
		}
		if(this.formPanel.getForm().isValid()){
			$postForm({
					formPanel : this.formPanel,
					scope : this,
					url : __ctxPath + '/customer/saveLingyongCusPersonal.do',
					params : {
						special : Ext.encode(rows),
						delLines : delLines
					},
					callback : function(fp, action) {
						var gridPanel = Ext.getCmp('CusPersonalGrid');
						if (gridPanel != null) {
							gridPanel.getStore().reload();
						}
						Ext.getCmp('CusWeichuliFormLingYongWin').remove();
						this.destroy();
				}
			});
		} else {
			Ext.ux.Toast.msg('操作信息', '保存之前请填写客户信息!');
		}

	},// end of save

	dial : function() {
		top.dial('18701575606');
	},

	/*
	 * ,{ text : '外呼', iconCls : 'btn-reset', scope : this, handler : this.dial }
	 */
	/*
	 * method 新增客户 按钮调用
	 */
	newCusPersonal : function() {
		Ext.getCmp('CusContainer').show();
		Ext.getCmp("CusContainer_col1").items.each(function(ctl) {
			        ctl.setValue("");
					ctl.setReadOnly(false);
				})
		Ext.getCmp("CusContainer_col2").items.each(function(ctl) {
			        ctl.setValue("");
					ctl.setReadOnly(false);
				})
		Ext.getCmp("CusContainer_col3").items.each(function(ctl) {
					ctl.setValue("");
					ctl.setReadOnly(false);
				})
		var historyStore = Ext.getCmp('ConWeichuliFormLingYong.UlContacthistoryGrid_empl').getStore();
		historyStore.baseParams = {
			'Q_customer.customerId_L_EQ' : -1
		}
		var specialStore = Ext.getCmp('ConWeichuliFormLingYong.UlSpecialGrid_empl').getStore();
		specialStore.baseParams = {
			'Q_customer.customerId_L_EQ' : -1
		}
		historyStore.reload();
		specialStore.reload();
	},
	/*
	 * method 用于匿名用户的方法调用
	 */
	nonameCusPersonal : function() {
		Ext.getCmp('CusContainer').show();
		Ext.getCmp("CusContainer_col1").items.each(function(ctl) {
					ctl.setValue("");
					ctl.setReadOnly(true);
				})
		Ext.getCmp("CusContainer_col2").items.each(function(ctl) {
					ctl.setValue("");
					ctl.setReadOnly(true);
				})
		Ext.getCmp("CusContainer_col3").items.each(function(ctl) {
					ctl.setValue("");
					ctl.setReadOnly(true);
				})
		Ext.Ajax.request({
			url : __ctxPath + '/customer/getAnonymousCusPersonal.do',
			async : true,
			scope : this,
			method : 'post',
			success : function(response) {
				var result = Ext.util.JSON.decode(response.responseText).data;
				Ext.getCmp('ConWeichuliFormLingYong.customerName')
						.setValue(result.nameCn);
				Ext.getCmp('ConWeichuliFormLingYong.customerNo')
						.setValue(result.customerNo);
			}
		});
		var historyStore = Ext.getCmp('ConWeichuliFormLingYong.UlContacthistoryGrid_empl').getStore();
		historyStore.baseParams = {
			'Q_customer.customerId_L_EQ' : -1
		}
		var specialStore = Ext.getCmp('ConWeichuliFormLingYong.UlSpecialGrid_empl').getStore();
		specialStore.baseParams = {
			'Q_customer.customerId_L_EQ' : -1
		}
		historyStore.reload();
		specialStore.reload();
	},
	/*
	 * method 用于定位 用户的方法调用
	 */
	postinCusPersonal : function() {
		Ext.getCmp('CusContainer').show();
		Ext.getCmp("CusContainer_col1").items.each(function(ctl) {
					ctl.setReadOnly(true);
				})
		Ext.getCmp("CusContainer_col2").items.each(function(ctl) {
					ctl.setReadOnly(true);
				})
		Ext.getCmp("CusContainer_col3").items.each(function(ctl) {
					ctl.setReadOnly(true);
				})
		var phone = Ext.getCmp('ConWeichuliFormLingYong.mainContactNum')
				.getValue();
		Ext.Ajax.request({
			url : __ctxPath + '/customer/locationCusPersonal.do',
			async : true,
			scope : this,
			params : {
				'Q_phone_S_EQ' : phone
			},
			method : 'post',
			success : function(response) {
				var result = Ext.util.JSON.decode(response.responseText).result;
				if (result != null && result != "") {
					lingyongCustomerId = result[0].customerId;
					var historyStore = Ext.getCmp('ConWeichuliFormLingYong.UlContacthistoryGrid_empl').getStore();
					historyStore.baseParams = {
						start:0,
						limit:25,
						'Q_customer.customerId_L_EQ' : lingyongCustomerId
					}
					var specialStore = Ext.getCmp('ConWeichuliFormLingYong.UlSpecialGrid_empl').getStore();
					specialStore.baseParams = {
						start:0,
						limit:25,
						'Q_customer.customerId_L_EQ' : lingyongCustomerId
					}
					historyStore.reload();
					specialStore.reload();
					Ext.getCmp('ConWeichuliFormLingyong.customerId')
							.setValue(result[0].customerId);
					Ext.getCmp('ConWeichuliFormLingYong.customerName')
							.setValue(result[0].nameCn);
					Ext.getCmp('ConWeichuliFormLingYong.cusTitId_form')
							.setValue(result[0].cusTitId);
					Ext.getCmp('ConWeichuliFormLingYong.credTypId_form')
							.setValue(result[0].credTypId);
					Ext.getCmp('ConWeichuliFormLingYong.cusCatId_form')
							.setValue(result[0].cusCatId);
					Ext.getCmp('ConWeichuliFormLingYong.nameEn_form')
							.setValue(result[0].nameEn);
					Ext.getCmp('ConWeichuliFormLingYong.gender_form')
							.setValue(result[0].gender);
					Ext.getCmp('ConWeichuliFormLingYong.credNum_form')
							.setValue(result[0].credNum);
					Ext.getCmp('ConWeichuliFormLingYong.cusGraId_form')
							.setValue(result[0].cusGraId);
					Ext.getCmp('ConWeichuliFormLingYong.nameAli_form')
							.setValue(result[0].nameAli);
					Ext.getCmp('ConWeichuliFormLingYong.birthday_form')
							.setValue(result[0].birthday);
					Ext.getCmp('ConWeichuliFormLingYong.credDurDat_form')
							.setValue(result[0].credDurDat);
					Ext.getCmp('ConWeichuliFormLingYong.customerNo')
							.setValue(result[0].customerNo);
				} else {
					Ext.ux.Toast.msg('操作信息', '未找到与该客户有关的信息!');
				}
			}
		});

	}
});