/**
 * @author cf0666@gmail.com
 * @createtime
 * @class ObComForm
 * @extends Ext.Window
 * @description ObCom表单
 * @company 优创融联科技
 */
var str = '';
var productids = '';
var ctscr = '';
var paprelease = '';
var usergroupids = '';
var rulkey = '';
var rulvalue = '';
ObComForm = Ext
		.extend(
				Ext.Panel,
				{
					// 构造函数
					constructor : function(_cfg) {
						Ext.applyIf(this, _cfg);
						// 必须先初始化组件
						this.initUIComponents(_cfg);
						ObComForm.superclass.constructor.call(this, {
							id : 'ObComFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '营销活动增加',
							buttonAlign : 'center',
							buttons : [{
								text : __save,
								iconCls : 'btn-save',
								scope : this,
								handler : this.save
							}, {
								text : __reset,
								iconCls : 'btn-reset',
								scope : this,
								handler : this.reset
							}, {
								text : __cancel,
								iconCls : 'btn-cancel',
								scope : this,
								handler : this.cancel
							}]
						});
					},// end of the constructor
					// 初始化组件

					initUIComponents : function(_cfg) {
						var groupsSelectPanel = this.initGroupSelectPanel(this.comId);
						var projid=null;
						var obCom_execTypId = new Ext.form.ComboBox({
							fieldLabel : '执行方式',
							name : 'obCom.execTypId_form',
							id:'obCom.execTypId_form11',
							triggerAction : 'all',
							editable : false,
							mode:'local',
							allowBlank : false,
							lazyInit : false,
							store :new Ext.data.ArrayStore({
		 								fields : ['key', 'name'],
		 								data:[]
		 							}),
							displayField : 'name',
							valueField : 'key',
							hiddenName : 'obCom.execTypId',
							anchor : '100%',
							itemKey : 'CONOB_COM_ZXQDFS',
							value : CONOB_COM_ZXQDFS.get(this.execTypId)
						});

						var topbar_contact2 = new Ext.Toolbar(
								{
									items : [
											'->',
											{
												iconCls : 'btn-del',
												text : '删除',
												xtype : 'button',
												handler : function() {
													var store = gridPanel_contact2
															.getStore();
													var sm = gridPanel_contact2
															.getSelectionModel();
													var cell = sm
															.getSelections();
													if (cell.length < 1) {
														Ext.ux.Toast.msg(
																'提示信息',
																'请至少选择一条记录!');
													} else {
														store.remove(cell);
													}
												}
											},
											'->',
											{
												iconCls : 'btn-add',
												text : '添加',
												xtype : 'button',
												handler : function() {
													ObCtScrNameSelector
															.getView(
																	function(
																			rows) {
																		var store = gridPanel_contact2
																				.getStore();
																		if (store
																				.getCount() == 1) {
																			Ext.ux.Toast
																					.msg(
																							'操作信息',
																							'话术已绑定！');
																		} else {
																			var recordType = store.recordType;
																			for ( var i = 0, r; r = rows[i]; i++) {
																				if (ctscr
																						.indexOf(rows[i]
																								.get('tmpId')) == -1) {
																					ctscr += rows[i]
																							.get('tmpId')
																							+ ",";
																					store
																							.add(new recordType(
																									{
																										tmpName : rows[i]
																												.get('tmpName'),
																										tmpContent : rows[i]
																												.get('tmpContent'),
																										tmpId : rows[i]
																												.get('tmpId')

																									})); // 添加一行空store
																				}

																			}
																		}
																	}).show();
												}
											}]
								});

						var topbar_contact8 = new Ext.Toolbar({
							items : [
									'->',
									{
										iconCls : 'btn-del',
										text : '删除',
										xtype : 'button',
										handler : function() {
											var store = gridPanel_contact8
													.getStore();
											var sm = gridPanel_contact8
													.getSelectionModel();
											var cell = sm.getSelections();
											if (cell.length < 1) {
												Ext.ux.Toast.msg('提示信息',
														'请至少选择一条记录!');
											} else {
												store.remove(cell);
											}
										}
									},
									'->',
									{
										iconCls : 'btn-add',
										text : '添加',
										xtype : 'button',
										handler : function() {

											var store = gridPanel_contact8
													.getStore();
											var recordType = store.recordType;
											store.add(new recordType({})); // 添加一行空store

										}
									}]
						});
						var gridPanel_contact2 = new HT.EditorGridPanel(
								{
									region : 'center',
									tbar : topbar_contact2,
									height : 150,
									scrollHeight : true,

									clicksToEdit : 1,
									url : __ctxPath
											+ '/comtech/ctScrBDNamlistCtScrTemplate.do?comId='
											+ _cfg.comId,
									fields : [{
										name : 'tmpId',
										type : 'Long'
									}, 'tmpName', 'tmpContent'],
									columns : [
									// {
											// header : '话术ID',
											// dataIndex : 'tmpId'
											// },
											{
												header : '名称',
												dataIndex : 'tmpName'
											// editor : new Ext.form.TextField({
											//
											// })
											}, {
												header : '描述',
												dataIndex : 'tmpContent'
											// editor : new Ext.form.TextField({
											// inputType : 'file'
											// })
											}]
								// end of columns
								});
						var gridPanel_contact8 = new HT.EditorGridPanel(
								{
									region : 'center',
									tbar : topbar_contact8,
									height : 150,
									scrollHeight : true,
									rowActions : true,
									clicksToEdit : 1,
									url : __ctxPath
											+ '/comtech/ctScrBDNamlistCtScrTemplate.do?comId='
											+ _cfg.comId,
									fields : [{
										name : 'tmpId',
										type : 'Long'
									}, 'tmpName', 'tmpType', 'tmpContent'],
									columns : [
											// {
											// header : '话术ID',
											// dataIndex : 'tmpId'
											// },
											{
												header : '名称',
												dataIndex : 'tmpName'
											// editor : new Ext.form.TextField({
											//
											// })
											},
											{
												header : '类型',
												dataIndex : 'tmpType'
											// editor : new Ext.form.TextField({
											//
											// })
											},
											{
												header : '描述',
												dataIndex : 'tmpContent'
											// editor : new Ext.form.TextField({
											// inputType : 'file'
											// })
											},
											new Ext.ux.grid.RowActions(
													{
														header : __action,
														width : 100,
														actions : [{
															iconCls : 'menu-desktop',
															qtip : '状态',
															style : 'margin:0 3px 0 3px'
														}],
														listeners : {
															scope : this,
															'action' : this.onRowAction
														}
													})]
								// end of columns
								});
						var topbar_contact3 = new Ext.Toolbar(
								{
									items : [
											'->',
											{
												iconCls : 'btn-del',
												text : '删除',
												xtype : 'button',
												handler : function() {
													var store = gridPanel_contact3
															.getStore();
													var sm = gridPanel_contact3
															.getSelectionModel();
													var cell = sm
															.getSelections();
													if (cell.length < 1) {
														Ext.ux.Toast.msg(
																'提示信息',
																'请至少选择一条记录!');
													} else {
														store.remove(cell);
														for (var i = 0; i < cell.length; i++) {
															productids=productids.replace(cell[i].data.goodsId+',','');
														}
												}
												}
											},
											'->',
											{
												iconCls : 'btn-add',
												text : '添加',
												xtype : 'button',
												handler : function() {
													var productcomid = _cfg.comId;
													ObProductNameSelector.getView(
														function(rows) {
															var store = gridPanel_contact3.getStore();
															var recordType = store.recordType;
															for ( var i = 0, r; r = rows[i]; i++) {
																if (productids
																		.indexOf(rows[i]
																				.get('goodsId')) == -1) {
																	productids += rows[i]
																			.get('goodsId')
																			+ ",";
																	store.add(new recordType(
																					{
																			goodsName : rows[i]
																					.get('goodsName'),
																			numbers : rows[i]
																					.get('numbers'),
																			goodsId : rows[i]
																					.get('goodsId'),
																			retailPrice : rows[i]
																					.get('retailPrice'),
																			goodtype : rows[i]
																					.get('goodtype'),
																			comSta : rows[i]
																					.get('comSta'),
																			reportPrice : rows[i]
																					.get('reportPrice'),
																			distribution : rows[i]
																					.get('distribution'),
																			style : rows[i]
																					.get('style'),
																			ext1 : rows[i]
																					.get('ext1')

																					})); // 添加一行空store
																}

															}
															//								}
														},
														productcomid)
												.show();
												}
											}]
								});
						var gridPanel_contact3 = new HT.GridPanel(
								{
									region : 'center',
									showPaging:false,
									tbar : topbar_contact3,
									height : 150,
									scrollHeight : true,
									clicksToEdit : 1,
									url : __ctxPath
											+ '/supply/productBDNamlistScGoods.do?comId='
											+ _cfg.comId,
									fields : [{
												name : ' goodsId',
												type : 'Long'
											}, 'goodsName','goodsId','goodsDesc','retailPrice','numbers','comSta','ext1','goodtype','reportPrice','style','ext1','distribution'],
									columns : [
									{
										header : '商品编号',
										dataIndex : 'numbers',
										width : 60
									}, {
										header : "商品名称",
										dataIndex : 'goodsName',
										width : 60
									},{
										header : '颜色',
										dataIndex : 'ext1',
										renderer : function(value) {
											return GOODS_COLOR.get(value);
										}
									},
									{
										header : '款式',
										dataIndex : 'style',
										renderer : function(value) {
											return GOODS_KS.get(value);
										}
									},{
										header : '商品类型',
										dataIndex : 'goodtype'
									},
									{
										header : '零售价',
										dataIndex : 'retailPrice'
									},
									{
										header : '市场价',
										dataIndex : 'reportPrice'
									},
									{
										header : '配送方式',
										dataIndex : 'distribution',
										renderer : function(value) {
											return CONBO_PSFS.get(1);
										}
									}
//										{
//											header : '状态',
//											dataIndex : 'comSta',
//											renderer : function(value) {
//												return CONOB_COM_BSSPZT.get(value);
//											}
//										}

									]
								// end of columns
								});
						var topbar_contact4 = new Ext.Toolbar(
								{
									items : [
											'->',
											{
												iconCls : 'btn-del',
												text : '删除',
												xtype : 'button',
												handler : function() {
													var store = gridPanel_contact4
															.getStore();
													var sm = gridPanel_contact4
															.getSelectionModel();
													var cell = sm
															.getSelections();
													if (cell.length < 1) {
														Ext.ux.Toast.msg(
																'提示信息',
																'请至少选择一条记录!');
													} else {
														store.remove(cell);

													}
												}
											},
											'->',
											{
												iconCls : 'btn-add',
												text : '添加',
												xtype : 'button',
												handler : function() {
													ObPapReleaseNameSelector
															.getView(
																	function(
																			rows) {
																		// str=calllistId;
																		var store = gridPanel_contact4
																				.getStore();
																		if (store
																				.getCount() == 1) {
																			Ext.ux.Toast
																					.msg(
																							'操作信息',
																							'问卷已绑定！');
																		} else {
																			var recordType = store.recordType;
																			for ( var i = 0, r; r = rows[i]; i++) {
																				if (paprelease
																						.indexOf(rows[i]
																								.get('papId')) == -1) {
																					paprelease += rows[i]
																							.get('papId')
																							+ ",";
																					store
																							.add(new recordType(
																									{
																										papName : rows[i]
																												.get('papName'),
																										papContent : rows[i]
																												.get('papContent'),
																										papId : rows[i]
																												.get('papId')

																									})); // 添加一行空store
																				}

																			}
																		}
																	}).show();
												}
											}]
								});
						var gridPanel_contact4 = new HT.GridPanel(
								{
									region : 'center',
									tbar : topbar_contact4,
									height : 150,
									scrollHeight : true,
									clicksToEdit : 1,
									url : __ctxPath
											+ '/pap/papReleasesBDNamlistPapRelease.do?comId='
											+ _cfg.comId,
									fields : [{
										name : ' papId',
										type : 'Long'
									}, 'papId', 'papName', 'papContent'],
									columns : [
									// {
											// header : '问卷ID',
											// dataIndex : 'papId'
											//
											// },
											{
												header : '编号',
												dataIndex : 'papId'

											}, {
												header : '名称',
												dataIndex : 'papName'

											}, {
												header : '描述',
												dataIndex : 'papContent'

											}, {
												header : '状态',
												dataIndex : 'papContent'

											}]
								// end of columns
								});
						var topbar_contact5 = new Ext.Toolbar({
							items : [
									'->',
									{
										iconCls : 'btn-del',
										text : '删除',
										xtype : 'button',
										handler : function() {
											var store = gridPanel_contact5
													.getStore();
											var sm = gridPanel_contact5
													.getSelectionModel();
											var cell = sm.getSelections();
											if (cell.length < 1) {
												Ext.ux.Toast.msg('提示信息',
														'请至少选择一条记录!');
											} else {
												store.remove(cell);

											}
										}
									},
									'->',
									{
										iconCls : 'btn-add',
										text : '添加',
										xtype : 'button',
										handler : function() {
											var store = gridPanel_contact5
													.getStore();
											var recordType = store.recordType;
											store.add(new recordType({})); // 添加一行空store
										}
									}]
						});
						var gridPanel_contact5_editor = new MT.DicComboBox(
								{
									name : 'gridPanel_contact5.contactType',
									editable : false,
									xtype : 'mtdiccombo',
									editable : false,
									lazyInit : false,
									forceSelection : false,
									itemKey : 'CONOB_COM_TYPENAME',
									hiddenName : 'obCom.execTypName_form',
									anchor : '100%',
									listeners : {
										'select' : function(combo,record,index) {
											var thisobj = false;
											var store = Ext.getCmp('guize').getStore();
											store.each(function(rec) {
														if (rec.get('rulTypeId') == record.data.itemId) {
															if (rec.get('rulTypeId') == record.data.itemId) {
																Ext.ux.Toast.msg('提示信息', '该规则已添加!');
															}else{
															}
														}
													})
										}
									}
								})
						var gridPanel_contact5 = new HT.EditorGridPanel(
								{
									region : 'center',
									id : 'guize',
									showPaging:false,
									tbar : topbar_contact5,
									height : 150,
									scrollHeight : true,
									clicksToEdit : 1,
									shim : true,
									trackMouseOver : true,
									disableSelection : false,
									loadMask : true,
									stripeRows : true,
									viewConfig : {
										forceFit : true,
										enableRowBody : false,
										showPreview : false
									},

									url : __ctxPath
											+ '/outb/salerulBDNamlistObComSalerul.do?comId='
											+ _cfg.comId,
									fields : ['rulTypeId', 'rulValMax',
											'rulValMin'],
									columns : [
											{
												header : '规则名称',
												dataIndex : 'rulTypeId',
												editor : gridPanel_contact5_editor,
												renderer : function(value) {
													return CONOB_COM_TYPENAME
															.get(value);
												}
											},
											{
												header : '规则值',
												id : 'rulValMax',
												dataIndex : 'rulValMax',
												seperator : '-',
												renderer : function(value,
														style, record) {
													if (record.data.rulTypeId == 1) {
														return CONOB_CALLBATCH_ASS_FPFS
																.get(value);
													} else {
														return value;
													}
												}

											}],
											listeners:{
												'cellclick' : function(grid ,rowIndex ,columnIndex ,e) {
													if(columnIndex == 3){
														var value = Ext.getCmp('guize').getStore().getAt(rowIndex).data.rulTypeId;// 获取规则值的列
														var col = gridPanel_contact5.getColumnModel().getColumnById('rulValMax');
														col.delEditor();
														switch (value) {
															case '0' :
																col.setEditor({
																			xtype : 'rangefield',
																			defaultType : 'timefield',
																			minValue : '9:00 AM',
																			maxValue : '6:00 PM',
																			increment : 30
																		})
																break;
															case '1' :
																col.setEditor(new MT.DicComboBox(
																				{ // 添加分配方式
																					name : 'obCom.busiTypId_form',
																					hiddenName : 'obCom.busiTypId',
																					xtype : 'mtdiccombo',
																					editable : false,
																					lazyInit : false,
																					forceSelection : false,
																					itemKey : 'CONOB_CALLBATCH_ASS_FPFS',
																					anchor : '100%'
																				}));
																break;
															case '2' :
																
																col.setEditor(new Ext.form.NumberField());
																break;
															case '3' :
																col.setEditor(new Ext.form.TextField());
																break;
															default :
																break;
														}
													}
												}
											}
								// end of columns
								});
						var topbar_contact6 = new Ext.Toolbar(
								{
									items : [
											'->',
											{
												iconCls : 'btn-del',
												text : '删除',
												xtype : 'button',
												handler : function() {
													var store = gridPanel_contact6
															.getStore();
													var sm = gridPanel_contact6
															.getSelectionModel();
													var cell = sm
															.getSelections();
													if (cell.length < 1) {
														Ext.ux.Toast.msg(
																'提示信息',
																'请至少选择一条记录!');
													} else {
														store.remove(cell);
													}
												}
											},
											'->',
											{
												iconCls : 'btn-add',
												text : '添加',
												xtype : 'button',
												handler : function() {
													var zxr = _cfg.comId;
													ObUserGroupNameSelector
															.getView(
																	function(
																			rows) {
																		var store = gridPanel_contact6
																				.getStore();
																		var recordType = store.recordType;
																		for ( var i = 0, r; r = rows[i]; i++) {
																			if (usergroupids
																					.indexOf(rows[i]
																							.get('pkUsergroupId')) == -1) {
																				usergroupids += rows[i]
																						.get('pkUsergroupId')
																						+ ",";
																				store
																						.add(new recordType(
																								{
																									usergroupName : rows[i]
																											.get('usergroupName'),
																									pkUsergroupId : rows[i]
																											.get('pkUsergroupId')
																								})); // 添加一行空store
																			}
																		}
																	}, zxr)
															.show();
												}
											}]
								});

						var gridPanel_contact6 = new HT.GridPanel(
								{
									region : 'center',
									tbar : topbar_contact6,
									height : 150,
									scrollHeight : true,
									clicksToEdit : 1,
									url : __ctxPath
											+ '/xitong/userGroupBDNamlistUlUsergroup.do?comId='
											+ _cfg.comId,
									fields : [{
										name : ' pkUsergroupId',
										type : 'Long'
									}, 'pkUsergroupId', 'usergroupName'],
									columns : [{
										header : '执行组ID',
										dataIndex : 'pkUsergroupId'
									// editor : new MT.DicComboBox({
											// editable : true,
											// lazyInit : false,
											// forceSelection : false,
											// itemKey : 'LXFS001'
											// })

											}, {
												header : '执行人组名称',
												dataIndex : 'usergroupName'
											// editor : new Ext.form.ComboBox({
											// xtype : 'combo',
											// editable : false,
											// mode : 'local',
											// triggerAction : 'all',
											// store : [['1', '数量'], ['0', '百分比']]
											// })
											}]
								// end of columns
								});
						this.formPanel = new Ext.FormPanel(
								{
									layout : 'form',
									bodyStyle : 'padding:10px',
									border : false,
									autoScroll : true,
									labelAlign : 'right',
									// id : 'ObProjectForm',
									defaults : {
										anchor : '96%,96%'
									},
									items : [
											 {
												id : 'obCom.obComBizTypeTree.nodeId',
												xtype : 'hidden'
											},
											{
												id : 'obCom.busiTypId',
												xtype : 'hidden'
											},
											{
												id : 'obCom.obProject.projNam',
												xtype : 'hidden'
											},
											{
												id : 'obCom.projId',
												xtype : 'hidden',
												value : this.projId == null
														? ''
														: this.projId
											},
											{
												id : 'obCom.ownerTeam',
												xtype : 'hidden',
												value : this.ownerTeam == null
														? ''
														: this.ownerTeam
											},

											{
												id : 'obCom.perIncharge',
												xtype : 'hidden',
												value : this.useid == null
														? ''
														: this.useid
											},
											{
												id : 'obCom.comId',
												xtype : 'hidden',
												value : this.comId == null
														? ''
														: this.comId
											},
											{
												fieldLabel : '开始时间',
												id : 'obCom.staDat_hid',
												xtype : 'hidden',
												format : 'Y-m-d',
												anchor : '100%'
											},
											{
												fieldLabel : '结束时间',
												id : 'obCom.endDat_hid',
												xtype : 'hidden',
												format : 'Y-m-d',
												anchor : '100%'
											},
											{
												fieldLabel : '活动主题',
												xtype : 'textfield',
												name : 'obCom.obComNam',
												allowBlank : false,
												maxLength : 128,
												anchor : '96%'
											},
											{
												layout : 'column',
												border : false,
												items : [
														{
															columnWidth : .33,
															border : false,
															layout : 'form',
															items : [
																	{
																		fieldLabel : '活动编号',
																		name : 'obCom.comCod',
																		maxLength : 25,
																		xtype : 'textfield',
																		anchor : '100%'
																	},
																	obCom_execTypId,

																	{
																		layout : 'column',
																		border : false,
																		anchor : '100%',
																		items : [
																				{
																					xtype : 'panel',
																					layout : 'form',
																					columnWidth : .9,
																					border : false,
																					items : [{
																						fieldLabel : '所属机构',
																						id : 'obCom.ownerTeamNam',
																						allowBlank : false,
																						xtype : 'textfield',
																						readOnly:true,
																						anchor : '100%'
																					}]
																				},
																				{
																					xtype : 'button',
																					columnWidth : .1,
																					iconCls : 'btn-search',
																					handler : function() {
																						ObZuZhiJiGouSelector.prototype
																								.setup(
																										function(
																												jigouNam,
																												jigouId) {
																											Ext
																													.getCmp(
																															'obCom.ownerTeamNam')
																													.setValue(
																															jigouNam);
																											Ext
																													.getCmp(
																															'obCom.ownerTeam')
																													.setValue(
																															jigouId);
																										})
																								.show();
																					}
																				}]
																	}

															]

														},
														{
															columnWidth : .33,
															layout : 'form',
															border : false,
															items : [
																	{
																		layout : 'column',
																		border : false,
																		anchor : '100%',
																		items : [
																				{
																					xtype : 'panel',
																					layout : 'form',
																					columnWidth : .9,
																					border : false,
																					items : [{
																						fieldLabel : '营销项目',
																						xtype : 'textfield',
																						id : 'obProject.projNam',
																						readOnly:true,
																						allowBlank : false,
																						anchor : '100%'
																					}]
																				},
																				{
																					xtype : 'button',
																					columnWidth : .1,
																					iconCls : 'btn-search',
																					handler : function() {
																						ObProjectSelector
																								.getView(
																										function(
																												projId,
																												projNam,
																												perIncharge,
																												ownerTeam,
																												enddate,
																												stadate,busiTypId) {
																											Ext
																													.getCmp(
																															'obCom.projId')
																													.setValue(
																															projId);
																											Ext
																													.getCmp(
																															'obProject.projNam')
																													.setValue(
																															projNam);
																											Ext
																													.getCmp(
																															'obCom.endDat')
																													.setValue(
																															enddate);
																											Ext
																													.getCmp(
																															'obCom.staDat')
																													.setValue(
																															stadate);
																											Ext
																													.getCmp(
																															'obCom.endDat_hid')
																													.setValue(
																															enddate);
																											Ext
																													.getCmp(
																															'obCom.staDat_hid')
																													.setValue(
																															stadate);
																											Ext
																													.getCmp(
																															'obCom.obComBizTypeTree.nodeId')
																													.setValue(
																															busiTypId);
																											Ext.getCmp('obCom.busiTypId11').setValue(busiTypId)
//																											Ext
//																													.getCmp(
//																															'obCom.obComBizTypeTree.nodeId')
//																													.setValue(
//																															ywlxkey);
//																											Ext
//																													.getCmp(
//																															'obCom.obComBizTypeTree.nodeName')
//																													.setValue(
//																															ywlxvalue);
																										var value = [];
																	
																										Ext.Ajax.request( {
																											url : __ctxPath+ '/system/loadKeyDictionary.do?itemKey=LXFS001',
																											method : 'post',
																											success : function(response, opts) {
																					 							var result = Ext.util.JSON.decode(response.responseText);
																					 							Ext.Ajax.request( {
																													url : __ctxPath + '/outb/loadKeyZhiXingFangShiObCom.do?projId='+projId,
																													method : 'post',
																													success : function(response, opts) {
																							 							var data = Ext.util.JSON.decode(response.responseText);
																							 							var flag = true;
																							 							for(var i = 0;i<data.length;i++){
																							 								for(var j=0;j<result.length;j++){
																							 									if(result[j][0] == data[i][1]){
																							 										value.push(result[j]);
																							 										flag = false;
																							 									}
																							 								}
																							 								if(flag) value.push([data[i][1],data[i][1]]);
																							 							}
																							 							Ext.getCmp('obCom.execTypId_form11').getStore().loadData(value)
																													},
																													failure : function(response, opts) {
																													}
																												
																												});
																											},
																											failure : function(response, opts) {
																											}
																										
																										});

																										})
																								.show();
																					}
																				}]
																	},
																	{
																		fieldLabel : '开始时间',
																		name : 'obCom.staDat',
																		id : 'obCom.staDat',
																		xtype : 'datefield',
																		format : 'Y-m-d',
																		allowBlank : false,
																		anchor : '100%'
																	},

																	{
																		layout : 'column',
																		border : false,
																		anchor : '100%',
																		items : [
																				{
																					xtype : 'panel',
																					layout : 'form',
																					columnWidth : .9,
																					border : false,
																					items : [{
																						fieldLabel : '负责人',
																						id : 'obCom.perInchargeNam',
																						xtype : 'textfield',
																						allowBlank : false,
																						readOnly:true,
																						anchor : '100%'
																					}]
																				},
																				{
																					xtype : 'button',
																					columnWidth : .1,
																					iconCls : 'btn-search',
																					handler : function() {
																						UlPersonChargeSelector
																								.getView(
																										function(
																												userId,
																												fullname,
																												sex,
																												useid) {
																											Ext
																													.getCmp(
																															"obCom.perIncharge")
																													.setValue(
																															useid);
																											Ext
																													.getCmp(
																															"obCom.perInchargeNam")
																													.setValue(
																															fullname);
																										})
																								.show();
																					}
																				}]
																	}

															]

														},
														{
															columnWidth : .34,
															layout : 'form',
															border : false,
															items : [
															 {
																    fieldLabel : '业务类型',
																	hiddenName : 'obCom.busiTypId',
																	id:'obCom.busiTypId11',
																	xtype : 'mtdiccombo',
																	editable : false,
																	allowBlank : false,
																	lazyInit : false,
																	readOnly:true,
																	triggerAction : 'all',
																	forceSelection : false,
																	itemKey : 'CONTPJYLX',
																	anchor : '100%'
																		
																},
//																	{
//																		fieldLabel : '业务类型',
//																		id : 'huodongyewuleixing',
//																		anchor : '100%',
//																		xtype : 'treecombo',
//																		editable : false,
//																		lazyInit : true,
//																		// mode:'local' ,
//																		allowBlank : false,
//																		forceSelection : false,
//																		tree : {
//																			loader : new Ext.ux.tree.JsonTreeLoader(
//																					{
//																						root : 'menus',
//																						url : __ctxPath + '/outb/treeLoadObBizTypeTreeCom.do'
//																					}),
//																			root : new Ext.tree.AsyncTreeNode()
//																		}
//																	},
																	{
																		fieldLabel : '结束时间',
																		name : 'obCom.endDat',
																		id : 'obCom.endDat',
//																		allowBlank : false,
																		xtype : 'datefield',
																		format : 'Y-m-d',
																		anchor : '100%'
																	}

															]

														}]
											}

											,
											{
												fieldLabel : '活动内容',
												name : 'obCom.obComDes',
												xtype : 'textarea',
												maxLength : 1333,
												anchor : '96%'
											},
											//											{
											//												xtype : 'fieldset',
											//												title : "话术",
											//												hidden : true,
											//												collapsible : true,
											//												id : 'obcom_hua',
											//												collapsed : true,
											//												bodyStyle : 'padding-left:20px',
											//												defaults : {
											//													anchor : '100%,100%'
											//												},
											//												items : [ gridPanel_contact2 ]
											//											},
											//											{
											//												xtype : 'fieldset',
											//												title : "模板",
											//												hidden : true,
											//												collapsible : true,
											//												id : 'obcom_muban',
											//												collapsed : true,
											//												bodyStyle : 'padding-left:20px',
											//												defaults : {
											//													anchor : '100%,100%'
											//												},
											//												items : [ gridPanel_contact8 ]
											//											},
											{
												xtype : 'fieldset',
												title : "商品",
												collapsible : true,
												collapsed : true,
												bodyStyle : 'padding-left:20px',
												defaults : {
													anchor : '100%,100%'
												},
												items : [gridPanel_contact3]
											},
											//											{
											//												xtype : 'fieldset',
											//												title : "问卷",
											//												collapsible : true,
											//												collapsed : true,
											//												bodyStyle : 'padding-left:20px',
											//												defaults : {
											//													anchor : '100%,100%'
											//												},
											//												items : [ gridPanel_contact4 ]
											//											},
											{
												xtype : 'fieldset',
												title : "规则",
												collapsible : true,
												collapsed : true,
												bodyStyle : 'padding-left:20px',
												defaults : {
													anchor : '100%,100%'
												},
												items : [gridPanel_contact5]
											},
											{
												xtype : 'fieldset',
												title : '执行组<font style="color:red">*</font>',
												collapsible : true,
												collapsed : true,
												bodyStyle : 'padding-left:20px',
												defaults : {
													anchor : '100%,100%'
												},
												items : [groupsSelectPanel]
											}]
								});
						// 加载表单对应的数据
						if (this.comId != null && this.comId != 'undefined') {
							this.formPanel
									.loadData({
										url : __ctxPath
												+ '/outb/getObCom.do?comId='
												+ this.comId,
										root : 'data',
										preName : 'obCom',
										success : function(response, options) {
											var thisObj = Ext.util.JSON
													.decode(response.responseText).data;
											//不能删除项
											//											if (thisObj.execTypId.toString()
											//													.toString() != 1) {// 如果为电话
											//												// 则显示话术
											//												Ext.getCmp('obcom_hua').hide();
											//												Ext.getCmp('obcom_muban')
											//														.show();
											//											} else {// 其他显示模板
											//												Ext.getCmp('obcom_hua').show();
											//												Ext.getCmp('obcom_muban')
											//														.hide();
											//											}

										}
									});
						}

						// 执行方式 的选择 为电话 则显示话术 其她隐藏话术
						obCom_execTypId.on('select', function() {
							//							if (obCom_execTypId.getValue().toString() != 1) {
								//								Ext.getCmp('obcom_hua').hide();
								//								Ext.getCmp('obcom_muban').show();
								//							} else {
								//								Ext.getCmp('obcom_hua').show();
								//								Ext.getCmp('obcom_muban').hide();
								//							}
							});

					},// end of the initcomponents

					/**
					 * 重置
					 * 
					 * @param {}
					 * formPanel
					 */
					reset : function() {
//						//业务类型
//						Ext.getCmp("huodongyewuleixing").setNameValue('');
//						Ext.getCmp('obCom.busiTypId').setValue('');
						//活动截至日期
						//Ext.getCmp('obCom.endDat').dom.value = "";
						document.getElementById('obCom.endDat').value = "";
						document.getElementById('obCom.staDat').value = "";
						this.formPanel.getForm().reset();
					},
					/**
					 * 取消
					 * 
					 * @param {}
					 * window
					 */
					cancel : function() {
						var tabs = Ext.getCmp('centerTabPanel');// 获得tab
						tabs.remove('ObComFormWin');// 移除创建的窗口
					},
				/**
				 * 保存记录
				 */
				save : function() {
					var store = Ext.getCmp('guize').getStore();
					var usergroupid = '';
					var projId = Ext.getCmp('obCom.projId').getValue();
					var perIncharge = Ext.getCmp("obCom.perIncharge")
							.getValue();
					var ownerTeam = Ext.getCmp("obCom.ownerTeam")
							.getValue();
					var storegourp = Ext.getCmp("yixuanzezhixingzu")
							.getStore();
					var ywlxid=Ext.getCmp('obCom.obComBizTypeTree.nodeId').getValue();
					if(ywlxid!=''){
				        ywlxid=Ext.getCmp('obCom.obComBizTypeTree.nodeId').getValue();
					}else{
						ywlxid=Ext.getCmp('obCom.obComBizTypeTree.nodeId').getValue();
					}
							//执行组
					for (var j = 0; j < storegourp.getCount(); j++) {
						usergroupid += storegourp.getAt(j).data.pkUsergroupId + ",";
					}

					//验证活动的截至日期要在项目截止日期的范围内
					//获得项目截止日期
					var enddate = Ext.getCmp('obCom.endDat_hid').getValue();
					var stadate = Ext.getCmp('obCom.staDat_hid').getValue();
					//活动截至日期
					var inputenddate = Ext.getCmp('obCom.endDat')
							.getValue();
					var inputstadate = Ext.getCmp('obCom.staDat')
							.getValue();
					var rulkeys ='';
					var rulvalues='';
					var rulids='';
					//默认的活动规则规则名称：分配方式（1） 规则值：名单分配（0）
			        if(store.getCount()=='0'){
			        	rulkeys='1';
			        	rulvalues='0';
			        }
					//规则
					for (var j = 0; j < store.getCount(); j++) {
						if(store.getAt(j).data.rulValMax!=undefined && store.getAt(j).data.rulTypeId!=undefined){
							//不重复规则
							if(store.getAt(j).data.rulTypeId == 0 || rulkeys.indexOf(store.getAt(j).data.rulTypeId)==-1 ){
								var bool2,bool1 = true;
								//结束时间为空
								if(inputstadate != ''){
									if(inputenddate){
										var dt = new Date(inputenddate);
										var date1 = dt.format('Y-m-d');
										bool1 = Date.parseDate(date1, "Y-m-d").between(
														Date.parseDate(stadate, "Y-m-d"),
														Date.parseDate(enddate, "Y-m-d"));
									}
									var dt1 = new Date(inputstadate);
									var date2 = dt1.format('Y-m-d');
									var bool2 = Date.parseDate(date2, "Y-m-d").between(
											Date.parseDate(stadate, "Y-m-d"),
											Date.parseDate(enddate, "Y-m-d"));
									if (!bool1||!bool2) {
										Ext.ux.Toast.msg('操作信息', '活动截至日期要在项目的截止日期内！');
										return;
									}
								}else{
										Ext.ux.Toast.msg('操作信息', '请填写活动所属的项目！');
										return;
								 }
								rulkeys+=  store.getAt(j).data.rulTypeId+','
								rulvalues+=  store.getAt(j).data.rulValMax+','
								rulids+=store.getAt(j).data.rulId+',';	
								}else{
									Ext.ux.Toast.msg("信息", "请检查规则是否重复！");
									return;
								}
							
							}else{
								Ext.ux.Toast.msg("信息", "请检查规则值添加是否正确！");
								return;
							}
					}
					$postSubForm({
								formPanel : this.formPanel,
								scope : this,
								url : __ctxPath + '/outb/saveObCom.do',
								params : {
									rulids:rulids,
									pid : str,
									projId : projId,
									ownerTeam : ownerTeam,
									perIncharge : perIncharge,
									productids : productids,
									ctscr : ctscr,
									paprelease : paprelease,
									usergroupids : usergroupid,
									rulkeys:rulkeys,
									rulvalues:rulvalues,
									status:bocomstatus,
					                ywlx : ywlxid
								},
								msgSuccess : '添加活动成功！',
								msgFailure : '操作出错，请联系管理员！',
								callback : function(fp, action) {
									var gridPanel = Ext.getCmp('ObComGrid');
									if (gridPanel != null) {
										gridPanel.getStore().reload();
									}
									var tabs = Ext.getCmp('centerTabPanel');
									tabs.remove('ObComFormWin');
					
								}
							});
					},// end of save
					// 行的Action
					onRowAction : function(grid, record, action, row, col) {
						switch (action) {
							case 'btn-del' :
								this.removeRs.call(this, record.data.projId);
								break;
							case 'btn-edit' :
								this.editRs.call(this, record);
								break;
							case 'btn-setting' :
								this.doneRs.call(this, record.data.projId);
								break;
							case 'btn-newFlow' :
								this.newFlow.call(this, record);
								break;
							default :
								break;
						}
					}
				});
function getDicStore(name, id) {
	return new Ext.data.SimpleStore({
		url : __ctxPath + '/system/loadItemDictionary.do',
		baseParams : {
			itemName : name
		},
		fields : ['itemId', 'itemName'],
		autoLoad : true,
		method : "post",
		listeners : {
			load : function() {
				var combo = Ext.getCmp(id);
				var store = combo.getStore();
				var rows = [];// 定义数组
		for ( var i = 0; i < store.getCount(); i++) { // store.getCount()为store的长度
			if (store.getAt(i).data['itemId'] == combo.getValue()) {

				combo.setValue(store.getAt(i).data['itemName']);
				break;
			}
		}
	}
}
	})
};

function getDicListeners(comId, hidName) {
	return {
		select : function(cbo, record, index) {
			var fm = Ext.getCmp(comId);
			Ext.getCmp(hidName + '_hid').setValue(cbo.value);
		}
	}
};
// 用户组选择 usergroupids
ObComForm.prototype.initGroupSelectPanel = function(userId) {
	/* 用户组树 */
	var selectNode = null;
	var Group_url = __ctxPath + '/system/treeLoadAppUser.do';
	var GroupTree = new Ext.tree.TreePanel({
		height : 220,
		flex : 7,
		useArrows : false,
		autoScroll : true,
		animate : false,
		enableDD : false,
		containerScroll : true,
		border : true,
		dataUrl : Group_url,
		rootVisible : false,
		root : {
			nodeType : 'async',
			text : 'Ext JS',
			draggable : false

		},
		listeners : {
			'click' : function(node) {
				selectNode = node;
			},
			'beforeload' : function(node) {
				// node.setText('<font
			// qtip="双击添加">'+node.text+'</font>');
			// node.eachChild( function(args){
			//							
			// }, this);
			node.attributes.qtip = '双击添加';
			node.attributes.description = '双击添加';
		}

		}
	});

	var dellTrue = function(ids) {

		Ext.Ajax.request({
			url : __ctxPath + '/system/multiDelGroupsAppUser.do',
			params : {
				ids : ids,
				userId : userId

			},
			method : 'POST',
			success : function(response, options) {
				Ext.ux.Toast.msg('操作信息', '成功删除该明细！');

			},
			failure : function(response, options) {
				Ext.ux.Toast.msg('操作信息', '操作出错，请联系管理员！');
			}
		});

	};
	/* 选择按钮 */
	var add = function() {
		if (selectNode == null) {
			Ext.ux.Toast.msg("信息", "请选择要添加的用户组！");
			return;
		}

		var isRe = false;
		for (i = 0; i < groupStore.getCount(); i++) {
			var r = groupStore.getAt(i);
			if (r.data.pkUsergroupId == selectNode.id) {
				isRe = true;
			}
		}
		if (isRe == true) {

			Ext.ux.Toast.msg("信息", "用户组重复，请选择其它用户组！");
			return;

		}

		var ulUsergroup = {};
		Ext.apply(ulUsergroup, {
			pkUsergroupId : selectNode.id,
			usergroupName : selectNode.text

		});

		var recrod = new groupStore.recordType();

		recrod.data = {};

		Ext.apply(recrod.data, {
			pkUsergroupId : selectNode.id,
			usergroupName : selectNode.text
		});

		groupStore.insert(0, recrod);

		groupStore.commitChanges();

	};
	var del = function() {

		var selectRecords = GroupGrid.getSelectionModel().getSelections();
		if (selectRecords.length == 0) {
			Ext.ux.Toast.msg("信息", "请选择要删除的记录！");
			return;
		}

		if (selectRecords[0].data.pkUsergroupId != null// ugUid
				&& selectRecords[0].data.pkUsergroupId != '') {
		}

		groupStore.remove(selectRecords[0]);
		groupStore.commitChanges();

	};
	var selectPanel = new Ext.Panel({
		frame : false,
		border : false,
		hideBorders : true,
		height : 220,
		flex : 0.4,
		layout : {
			type : 'vbox',
			pack : 'center',
			align : 'stretch'
		},
		defaults : {
			anchor : '100%,100%'
		},
		defaults : {
			margins : '0 3 0 0'
		},
		items : [{
			xtype : 'button',
			iconCls : 'btn-right',
			scope : this,
			handler : add
		}, {
			xtype : 'button',
			iconCls : 'btn-left',
			scope : this,
			handler : del
		}]
	});
	/* 职位grid */
	var dellAll = function() {
		var ids = Array();
		for (i = 0; i < groupStore.getCount(); i++) {
			var r = groupStore.getAt(i);
			if (r.data.pkUsergroupId != null && r.data.pkUsergroupId != '') {
				ids.push(r.data.pkUsergroupId);
			};

		}
		if (ids.length > 0) {

		}
		groupStore.removeAll();
		groupStore.commitChanges();

	};
	var gridTopbar = new Ext.Toolbar({
		items : [{
			text : '清除所选',
			scope : this,
			handler : dellAll
		}]
	});

	var groupRecord = Ext.data.Record.create([{
		name : 'pkUsergroupId',
		type : 'int'
	}, 'parentId', 'usergroupName', 'ulUsergroup']);

	var gridMemoryProxy = new Ext.data.HttpProxy({
		url : __ctxPath + '/xitong/userGroupBDNamlistUlUsergroup.do?comId='
				+ this.comId
	});

	var gridJsonReader = new Ext.data.JsonReader({
		root : 'result',
		totalProperty : 'totalCounts',
		idProperty : "pkUsergroupId"
	}, groupRecord);

	var groupStore = new Ext.data.Store({
		id : 'AppUserForm.GroupStore',
		proxy : gridMemoryProxy,
		reader : gridJsonReader
	});

	groupStore.on('beforeload', function(store) {
		store.baseParams = {
			start : 0,
			limit : 10000,
			'Q_appUser.userId_L_EQ' : userId
		};
	});
	groupStore.setDefaultSort('pkUsergroupId');

	if (userId != '' && userId != null && userId != 'undefined') {
		groupStore.load();
	}

	var sm = new Ext.grid.CheckboxSelectionModel({
		singleSelect : true

	});
	// /

	var GroupGrid = new Ext.grid.EditorGridPanel({
		frame : false,
		border : true,
		flex : 6,
		id : 'yixuanzezhixingzu',
		height : 220,
		tbar : gridTopbar,
		store : groupStore,
		clicksToEdit : 1,
		sm : sm,
		viewConfig : {
			forceFit : true,
			autoFill : true
		},
		columns : [{
			header : '用户组ID',
			dataIndex : 'pkUsergroupId',
			sortable : true,
			hidden : false
		}, {
			header : '用户组名称',
			sortable : true,
			dataIndex : 'usergroupName',
			renderer : function(usergroupName) {
				if (usergroupName)
					return '<font qtip="双击删除">' + usergroupName + '</font>';
			}
		}]
	});

	GroupGrid.on('dblclick', function(e) {

		var selectRecords = GroupGrid.getSelectionModel().getSelections();
		if (selectRecords.length == 0) {
			Ext.ux.Toast.msg("信息", "请选择要删除的记录！");
			return;
		}

		if (selectRecords[0].data.pkUsergroupId != null
				&& selectRecords[0].data.pkUsergroupId != '') {
		}

		groupStore.remove(selectRecords[0]);
		groupStore.commitChanges();

	}, this);
	GroupTree.on('dblclick', function(selectNode) {

		if (selectNode == null) {
			Ext.ux.Toast.msg("信息", "请选择要添加的用户组！");
			return;
		}

		var isRe = false;
		for (i = 0; i < groupStore.getCount(); i++) {
			var r = groupStore.getAt(i);
			if (r.data.pkUsergroupId == selectNode.id) {
				isRe = true;
			}
		}
		if (isRe == true) {

			Ext.ux.Toast.msg("信息", "用户组重复，请选择其它部门！");
			return;

		}

		var recrod = new groupStore.recordType();

		recrod.data = {};

		Ext.apply(recrod.data, {
			pkUsergroupId : selectNode.id,
			usergroupName : selectNode.text
		});

		groupStore.insert(0, recrod);
		groupStore.commitChanges();
		selectNode = null;
	}, this);

	/* 总容器 */

	var panel = new Ext.Panel({
		xtype : 'panel',
		height : 220,
		border : false,
		layout : {
			type : 'hbox',
			align : 'stretch'
		},
		height : 220,
		items : [GroupTree, selectPanel, GroupGrid]
	});

	return panel;
};