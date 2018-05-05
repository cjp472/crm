/**
 * @author cf0666@gmail.com
 * @createtime
 * @class YXtaskDelForm
 * @extends Ext.Window
 * @description ObCom表单
 * @company 优创融联科技
 */
var str = '';
var productids = '';
var ctscr = '';
var paprelease = '';
var usergroupids = '';
YXtaskDelForm = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		alert("dd");
		YXtaskDelForm.superclass.constructor.call(this, {
					id : 'YXtaskDelFormWin',
					layout : 'fit',
					items : this.formPanel,
					modal : true,
					height : 400,
					width : 500,

					maximizable : true,
					title : '活动详情',
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
	
	initUIComponents : function() {
		alert("aaddd");
		var groupsSelectPanel = this.initGroupSelectPanel(this.comId);
		var obCom_execTypId = new MT.DicComboBox({
					fieldLabel : '执行方式',
					id:'hdzhixingfangshi',
					hiddenName : 'obCom.execTypId',
					mode : 'local',
					anchor : '100%',
					editable : false,
					lazyInit : false,
					forceSelection : false,
					itemKey : 'CONOB_COM_ZXQDFS',
					value:  CONOB_COM_ZXQDFS.get(this.execTypId)
				});

		var topbar_contact1 = new Ext.Toolbar({
			items : ['->', {
						iconCls : 'btn-del',
						text : '删除',
						xtype : 'button',
						handler : function() {
							var store = gridPanel_contact1.getStore();
							var sm = gridPanel_contact1.getSelectionModel();
							var cell = sm.getSelections();
							if (cell.length < 1) {
								Ext.ux.Toast.msg('提示信息', '请至少选择一条记录!');
							} else {
								store.remove(cell);
//								$gridRs({
//								url : __ctxPath + '/outb/multiDelObCom.do',
//								grid : this.gridPanel,
//								idName : 'comId',
//								msgNull : '请选择要删除的记录！',
//								msgTip : '您确认要删除所选记录吗？',
//								msgSuccess : '成功删除该记录！',
//								msgFailure : '操作出错，请联系管理员！'
//						});
							}
						}
					}, '->', {
						iconCls : 'btn-add',
						text : '添加',
						xtype : 'button',
						handler : function() {
						     var comid=this.comId;
							ObCallNameSelector.getView(function( rows) {
								var store = gridPanel_contact1.getStore();
								var recordType = store.recordType;
								for (var i = 0, r; r = rows[i]; i++) {
									if (str.indexOf(rows[i].get('calllistId')) == -1) {
										str += rows[i].get('calllistId') + ",";
										store.add(new recordType({
													calllistNam : rows[i]
															.get('calllistNam'),
													ownerTeam : rows[i]
															.get('ownerTeam'),
													ownerTeamName : rows[i]
															.get('ownerTeamName'),
													calllistId : rows[i]
															.get('calllistId'),
													calllistResouce : rows[i]
															.get('calllistResouce'),
													calllistTypId : rows[i]
															.get('calllistTypId')

												})); // 添加一行空store
								}
							}
						},comid).show();
						}
					}]
		});
		var gridPanel_contact1 = new HT.GridPanel({
					region : 'center',
					tbar : topbar_contact1,
					height : 150,
					scrollHeight : true, 
					clicksToEdit : 1,
					url : __ctxPath + '/outb/callBDNamlistObCalllist.do?comId='
							+ this.comId,
					fields : [{
								name : ' calllistId',
								type : 'Long'
							}, 'calllistNam', 'cusTypId', 'ownerTeam',
							'calllistId', 'calllistTypId', 'calllistResouce',
							'ownerTeamName'],
					columns : [{
								header : '名称',
								isExp : false,
								dataIndex : 'calllistNam'
							}, {
								header : '来源',
								isExp : false,

								dataIndex : 'calllistResouce',
								renderer : function(value) {
									return CONOB_MDLY.get(value);
								}
							}, {
								header : '名单类型',
								isExp : false,

								dataIndex : 'calllistTypId',
								renderer : function(value) {
									return CONOB_CALLLIST_MDLX.get(value);
								}
							}, {
								header : '所属机构',
								isExp : false,
								dataIndex : 'ownerTeamName'
							}]
				});
		var topbar_contact2 = new Ext.Toolbar({
			items : ['->', {
						iconCls : 'btn-del',
						text : '删除',
						xtype : 'button',
						handler : function() {
							var store = gridPanel_contact2.getStore();
							var sm = gridPanel_contact2.getSelectionModel();
							var cell = sm.getSelections();
							if (cell.length < 1) {
								Ext.ux.Toast.msg('提示信息', '请至少选择一条记录!');
							} else {
								store.remove(cell);
							}
						}
					}, '->', {
						iconCls : 'btn-add',
						text : '添加',
						xtype : 'button',
						handler : function() {
							ObCtScrNameSelector.getView(function(rows) {
								var store = gridPanel_contact2.getStore();
								if (store.getCount() == 1) {
									Ext.ux.Toast.msg('操作信息', '话术已绑定！');
								} else {
									var recordType = store.recordType;
									for (var i = 0, r; r = rows[i]; i++) {
										if (ctscr.indexOf(rows[i].get('tmpId')) == -1) {
											ctscr += rows[i].get('tmpId') + ",";
											store.add(new recordType({
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
					items : ['->', {
								iconCls : 'btn-del',
								text : '删除',
								xtype : 'button',
								handler : function() {
									var store = gridPanel_contact8.getStore();
									var sm = gridPanel_contact8
											.getSelectionModel();
									var cell = sm.getSelections();
									if (cell.length < 1) {
										Ext.ux.Toast.msg('提示信息', '请至少选择一条记录!');
									} else {
										store.remove(cell);
									}
								}
							}, '->', {
								iconCls : 'btn-add',
								text : '添加',
								xtype : 'button',
								handler : function() {

									var store = gridPanel_contact8.getStore();
									var recordType = store.recordType;
									store.add(new recordType({})); // 添加一行空store

								}
							}]
				});
		var gridPanel_contact2 = new HT.EditorGridPanel({
			region : 'center',
			tbar : topbar_contact2,
			height : 150,
			scrollHeight : true,

			clicksToEdit : 1,
			url : __ctxPath + '/comtech/ctScrBDNamlistCtScrTemplate.do?comId='
					+ this.comId,
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
		var gridPanel_contact8 = new HT.EditorGridPanel({
			region : 'center',
			tbar : topbar_contact8,
			height : 150,
			scrollHeight : true,
			rowActions : true,
			clicksToEdit : 1,
			url : __ctxPath + '/comtech/ctScrBDNamlistCtScrTemplate.do?comId='
					+ this.comId,
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
			}, {
				header : '类型',
				dataIndex : 'tmpType'
					// editor : new Ext.form.TextField({
					//
					// })
				}, {
				header : '描述',
				dataIndex : 'tmpContent'
					// editor : new Ext.form.TextField({
					// inputType : 'file'
					// })
				}, new Ext.ux.grid.RowActions({
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
		var topbar_contact3 = new Ext.Toolbar({
			items : ['->', {
						iconCls : 'btn-del',
						text : '删除',
						xtype : 'button',
						handler : function() {
							var store = gridPanel_contact3.getStore();
							var sm = gridPanel_contact3.getSelectionModel();
							var cell = sm.getSelections();
							if (cell.length < 1) {
								Ext.ux.Toast.msg('提示信息', '请至少选择一条记录!');
							} else {
								store.remove(cell);
							}
						}
					}, '->', {
						iconCls : 'btn-add',
						text : '添加',
						xtype : 'button',
						handler : function() {
						var productcomid=this.comId;
							ObProductNameSelector.getView(function(rows) {
								// str=calllistId;
								var store = gridPanel_contact3.getStore();
//								if (store.getCount() == 1) {
//									Ext.ux.Toast.msg('操作信息', '产品已绑定！');
//								} else {
									var recordType = store.recordType;
									for (var i = 0, r; r = rows[i]; i++) {
										if (productids.indexOf(rows[i]
												.get('productId')) == -1) {
											productids += rows[i]
													.get('productId')
													+ ",";
											store.add(new recordType({
														productName : rows[i]
																.get('productName'),
														productModel : rows[i]
																.get('productModel'),
														productId : rows[i]
																.get('productId'),
														salesPrice : rows[i]
																.get('salesPrice'),
														productDesc : rows[i]
																.get('productDesc')

													})); // 添加一行空store
										}

									}
//								}
							},productcomid).show();
						}
					}]
		});
		var gridPanel_contact3 = new HT.GridPanel({
			region : 'center',
			tbar : topbar_contact3,
			height : 150,
			scrollHeight : true,
			clicksToEdit : 1,
			url : __ctxPath + '/customer/productBDNamlistProduct.do?comId='
					+ this.comId,
			fields : [{
						name : ' productId',
						type : 'Long'
					}, 'productName', 'productId', 'productModel',
					'salesPrice', 'productDesc', 'productType'],
			columns : [ {
						header : '编号',
						dataIndex : 'productModel'
					},{
						header : '名称',
						dataIndex : 'productName'
					},{

						header : '描述',
						dataIndex : 'productDesc'

					},
					// {
					// header : '描述',
					// dataIndex : 'productDesc'
					// },
					{
						header : '销售价格',
						dataIndex : 'salesPrice'
					},{
						header : '状态',
						dataIndex : 'salesPrice'
					}

			]
				// end of columns
			});
		var topbar_contact4 = new Ext.Toolbar({
			items : ['->', {
						iconCls : 'btn-del',
						text : '删除',
						xtype : 'button',
						handler : function() {
							var store = gridPanel_contact4.getStore();
							var sm = gridPanel_contact4.getSelectionModel();
							var cell = sm.getSelections();
							if (cell.length < 1) {
								Ext.ux.Toast.msg('提示信息', '请至少选择一条记录!');
							} else {
								store.remove(cell);
								
							}
						}
					}, '->', {
						iconCls : 'btn-add',
						text : '添加',
						xtype : 'button',
						handler : function() {
							ObPapReleaseNameSelector.getView(function(rows) {
								// str=calllistId;
								var store = gridPanel_contact4.getStore();
								if (store.getCount() == 1) {
									Ext.ux.Toast.msg('操作信息', '问卷已绑定！');
								} else {
									var recordType = store.recordType;
									for (var i = 0, r; r = rows[i]; i++) {
										if (paprelease.indexOf(rows[i]
												.get('papId')) == -1) {
											paprelease += rows[i].get('papId')
													+ ",";
											store.add(new recordType({
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
		var gridPanel_contact4 = new HT.GridPanel({
			region : 'center',
			tbar : topbar_contact4,
			height : 150,
			scrollHeight : true,
			clicksToEdit : 1,
			url : __ctxPath + '/pap/papReleasesBDNamlistPapRelease.do?comId='
					+ this.comId,
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

			},
					{
				header : '名称',
				dataIndex : 'papName'

			},  {
				header : '描述',
				dataIndex : 'papContent'

			},{
				header : '状态',
				dataIndex : 'papContent'

			}]
				// end of columns
			});
		var topbar_contact5 = new Ext.Toolbar({
					items : ['->', '->', {
								iconCls : 'btn-add',
								text : '添加',
								xtype : 'button',
								handler : function() {
									var store = gridPanel_contact5.getStore();
									var recordType = store.recordType;
									store.add(new recordType({})); // 添加一行空store
								}
							}]
				});
		var gridPanel_contact5_editor = new MT.DicComboBox({
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
						'select' : function() {
							var col = gridPanel_contact5.getColumnModel()
									.getColumnById('contactValue');// 获取规则值的列
							switch (gridPanel_contact5_editor.getValue()) {
								case '0' :
								col.setEditor(new Ext.form.TextField());
//									col.setEditor(new Ext.ux.RangeField({
//												xtype : 'rangefield',
//												defaultType : 'datefield',
//												format : 'Y-m-d H:i:s'
//											}))
									break;
								case '1' :
									col.setEditor(new MT.DicComboBox({ // 添加分配方式
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
				})
		var gridPanel_contact5 = new HT.EditorGridPanel({
			region : 'center',
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
			url : __ctxPath + "/xitong/getContactUlEmployee.do?useid=",
			 fields : [{
			 name : 'contactEmplId',
			 type : 'int'
			 }, 'contactType', 'contactValue'],
//			store : new Ext.data.ArrayStore({
//						autoLoad : true,
//						baseParams : {
//							itemKey : 'LXFS001'
//						},
//						url : __ctxPath + '/system/loadKeyDictionareeey.do',
//						fields : [{
//									name : 'contactEmplId',
//									type : 'int'
//								}, 'contactType', 'contactValue']
//
//					}),
			columns : [{
						header : '规则名称',
						dataIndex : 'contactType',
						editor : gridPanel_contact5_editor,
						renderer : function(value) {
							return CONOB_COM_TYPENAME.get(value);
						}
					},
					// {
					// header : '规则类型',
					// dataIndex : 'contactValue',
					// editor : new Ext.form.ComboBox({
					// xtype : 'combo',
					// editable : false,
					// mode : 'local',
					// triggerAction : 'all',
					// store : [['1', '数量'], ['0', '百分比']]
					// })
					// },
					{
						header : '规则值',
						id : 'contactValue',
						dataIndex : 'contactValue'
						// renderer : function(value) {
						//							
						//							
						// if (value != undefined) {//第一次没有值 跳到else 当有编辑器的时候进入
						// // if (value.toString().indexOf('GMT') != -1)
						// {//发现编辑的值 是日期的时候进入
						// // var forvalue = value.toString().split(',');
						// // var firsrtin = new Date(forvalue[0].toString())
						// // var nextin = new Date(forvalue[1].toString())
						// // return firsrtin.format('Y-m-d
						// H:i:s')+','+nextin.format('Y-m-d H:i:s');
						// // }else{
						// // return value;
						// // }
						// }else{
						// return "";
						// }
						//
						// }
					}]
				// end of columns
			});
		var topbar_contact6 = new Ext.Toolbar({
			items : ['->', {
						iconCls : 'btn-del',
						text : '删除',
						xtype : 'button',
						handler : function() {
							var store = gridPanel_contact6.getStore();
							var sm = gridPanel_contact6.getSelectionModel();
							var cell = sm.getSelections();
							if (cell.length < 1) {
								Ext.ux.Toast.msg('提示信息', '请至少选择一条记录!');
							} else {
								store.remove(cell);
							}
						}
					},'->', {
								iconCls : 'btn-add',
								text : '添加',
								xtype : 'button',
							    handler : function() {
								var zxr=this.comId;
								ObUserGroupNameSelector.getView( function( rows) {
									var store = gridPanel_contact6.getStore();
									var recordType = store.recordType;
									for (var i = 0, r; r = rows[i]; i++) {
									if(usergroupids.indexOf(rows[i].get('pkUsergroupId')) == -1){
									usergroupids+=rows[i].get('pkUsergroupId')+",";
									store.add(new recordType({
												usergroupName : rows[i].get('usergroupName'),
												pkUsergroupId:rows[i].get('pkUsergroupId')
											})); // 添加一行空store
								}
							}
						},zxr).show();
						}
					}]
		});
							
		var gridPanel_contact6 = new HT.GridPanel({
			region : 'center',
			tbar : topbar_contact6,
			height : 150,
			scrollHeight : true,
			clicksToEdit : 1,
			url : __ctxPath + '/xitong/userGroupBDNamlistUlUsergroup.do?comId='
					+ this.comId,
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
		var data = {
			expanded : true,
			children : [{
				text : '业务类型1',
				leaf : true
					// href: '#111'
				}, {
				text : '业务类型2',
				children : [{
							text : '业务类型2.1',
							id : '33',
							leaf : true
						}, {
							text : '业务类型2.2',
							leaf : true
						}, {
							text : '业务类型3',
							children : [{
										text : '业务类型3.1',
										leaf : true
									}, {
										text : '业务类型3.2',
										leaf : true
									}]
						}]
			}]
		}
		var nodes = new Ext.tree.AsyncTreeNode(data);

		this.formPanel = new Ext.FormPanel({
			layout : 'form',
			bodyStyle : 'padding:10px',
			border : false,
			autoScroll : true,
			labelAlign : 'right',
			// id : 'ObProjectForm',
			defaults : {
				anchor : '96%,96%'
			},
			items : [{
						id : 'obCom.obProject.projNam',
						xtype : 'hidden'
					}, {
						id : 'obCom.projId',
						xtype : 'hidden',
						value : this.projId == null ? '' : this.projId
					},

					{
						id : 'obCom.ownerTeam',
						xtype : 'hidden',
						value : this.ownerTeam == null ? '' : this.ownerTeam
					},

					{
						id : 'obCom.perIncharge',
						xtype : 'hidden',
						value : this.useid == null ? '' : this.useid
					}

					, {
						id : 'obCom.comId',
						xtype : 'hidden',
						value : this.comId == null ? '' : this.comId
					}, {
						fieldLabel : '活动主题',
						xtype : 'textfield',
						name : 'obCom.obComNam',
						allowBlank : false,
						maxLength : 128,
						anchor : '96%'
					}, {
						layout : 'column',
						border : false,
						items : [{
							columnWidth : .33,
							border : false,
							layout : 'form',
							items : [{
										fieldLabel : '活动编码',
										name : 'obCom.comCod',
										maxLength : 128,
										xtype : 'textfield',
										anchor : '100%'
									}, {
										fieldLabel : '业务类型',
										anchor : '100%',
										xtype : 'treecombo',
										editable : false,
//										lazyInit : false,
//										forceSelection : false,
										tree : {
											// loader : new
											// Ext.ux.tree.JsonTreeLoader( 连接到后台
											// {
											// root : 'list',
											// url : 'menu.json'
											// }),
											// root : new
											// Ext.tree.AsyncTreeNode()
											root : nodes
										}
									},
									// {
									// fieldLabel : '业务类型',
									// hiddenName : 'obCom.busiTypId',
									// id : 'obCom_busiTypId',
									// displayField : 'itemName',
									// valueField : 'itemId',
									// xtype : 'combo',
									// mode : 'local',
									// anchor : '100%',
									// editable : false,
									// allowBlank : false,
									// triggerAction : 'all',
									// store : new Ext.data.SimpleStore({
									// url : __ctxPath
									// + '/system/loadItemDictionary.do',
									// baseParams : {
									// itemName : '业务类型'
									// },
									// fields : ['itemId', 'itemName'],
									// autoLoad : true,
									// method : "post",
									// listeners : {
									// load : function() {
									// var combo = Ext
									// .getCmp('obCom_busiTypId');
									// var store = combo
									// .getStore();
									// var rows = [];// 定义数组
									// for (var i = 0; i < store
									// .getCount(); i++) { //
									// store.getCount()为store的长度
									// if (store.getAt(i).data['itemId'] ==
									// combo
									// .getValue()) {
									// combo
									// .setValue(store
									// .getAt(i).data['itemName']);
									// break;
									// }
									// }
									//
									// }
									// }
									// })
									// // 活动状态&CONOB_COM_HDZT
									// },

									{
										layout : 'column',
										border : false,
										anchor : '100%',
										items : [{
											xtype : 'panel',
											layout : 'form',
											columnWidth : .9,
											border : false,
											items : [{
														fieldLabel : '所属机构',
														id : 'obCom.ownerTeamNam',
														xtype : 'textfield',
														anchor : '100%'
													}]
										}, {
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
																			.getCmp('obCom.ownerTeamNam')
																			.setValue(jigouNam);
																	Ext
																			.getCmp('obCom.ownerTeam')
																			.setValue(jigouId);
																}).show();
											}
										}]
									}

							]

						}, {
							columnWidth : .33,
							layout : 'form',
							border : false,
							items : [{
										fieldLabel : '开始时间',
										name : 'obCom.staDat',
										xtype : 'datefield',
										format : 'Y-m-d',
										value : new Date(),
										anchor : '100%'
									}, obCom_execTypId, {
										layout : 'column',
										border : false,
										anchor : '100%',
										items : [{
											xtype : 'panel',
											layout : 'form',
											columnWidth : .9,
											border : false,
											items : [{
														fieldLabel : '负责人',
														id : 'obCom.perInchargeNam',
														xtype : 'textfield',
														anchor : '100%'
													}]
										}, {
											xtype : 'button',
											columnWidth : .1,
											iconCls : 'btn-search',
											handler : function() {
												UlPersonChargeSelector.getView(
														function(userId,
																fullname, sex,
																useid) {
															Ext
																	.getCmp("obCom.perIncharge")
																	.setValue(useid);
															Ext
																	.getCmp("obCom.perInchargeNam")
																	.setValue(fullname);
														}).show();
											}
										}]
									}

							]

						}, {
							columnWidth : .34,
							layout : 'form',
							border : false,
							items : [{
										fieldLabel : '结束时间',
										name : 'obCom.endDat',
										xtype : 'datefield',
										format : 'Y-m-d',
										value : new Date(),
										anchor : '100%'
									}, {
										layout : 'column',
										border : false,
										anchor : '100%',
										items : [{
											xtype : 'panel',
											layout : 'form',
											columnWidth : .9,
											border : false,
											items : [{
														fieldLabel : '营销项目',
														xtype : 'textfield',
														id : 'obProject.projNam',
														anchor : '100%'
													}]
										}, {
											xtype : 'button',
											columnWidth : .1,
											iconCls : 'btn-search',
											handler : function() {
												ObProjectSelector.getView( 
														function(projId,
																projNam,
																perIncharge,
																ownerTeam) {
															Ext
																	.getCmp('obCom.projId')
																	.setValue(projId);
															Ext
																	.getCmp('obProject.projNam')
																	.setValue(projNam);
														}).show();
											}
										}]
									}

							]

						}]
					}

					, {
						fieldLabel : '活动内容',
						name : 'obCom.obComDes',
						xtype : 'textarea',
						maxLength : 4000,
						anchor : '96%'
					}, {
						xtype : 'fieldset',
						title : "话术",
						hidden : true,
						collapsible : true,
						id : 'obcom_hua',
						collapsed : true,
						bodyStyle : 'padding-left:20px',
						defaults : {
							anchor : '100%,100%'
						},
						items : [gridPanel_contact2]
					}, {
						xtype : 'fieldset',
						title : "模板",
						hidden : true,
						collapsible : true,
						id : 'obcom_muban',
						collapsed : true,
						bodyStyle : 'padding-left:20px',
						defaults : {
							anchor : '100%,100%'
						},
						items : [gridPanel_contact8]
					}, {
						xtype : 'fieldset',
						title : "产品",
						collapsible : true,
						collapsed : true,
						bodyStyle : 'padding-left:20px',
						defaults : {
							anchor : '100%,100%'
						},
						items : [gridPanel_contact3]
					}, {
						xtype : 'fieldset',
						title : "问卷",
						collapsible : true,
						collapsed : true,
						bodyStyle : 'padding-left:20px',
						defaults : {
							anchor : '100%,100%'
						},
						items : [gridPanel_contact4]
					}, {
						xtype : 'fieldset',
						title : "规则",
						collapsible : true,
						collapsed : true,
						bodyStyle : 'padding-left:20px',
						defaults : {
							anchor : '100%,100%'
						},
						items : [gridPanel_contact5]
					}]
		});
		// 加载表单对应的数据
		if (this.comId != null && this.comId != 'undefined') {
			this.formPanel.loadData({
				url : __ctxPath + '/outb/getObCom.do?comId=' + this.comId,
				root : 'data',
				preName : 'obCom',
				success : function(response, options) {
					var thisObj = Ext.util.JSON.decode(response.responseText).data;

					if (thisObj.execTypId.toString().toString() != 1) {// 如果为电话
						// 则显示话术
						Ext.getCmp('obcom_hua').hide();
						Ext.getCmp('obcom_muban').show();
					} else {// 其他显示模板
						Ext.getCmp('obcom_hua').show();
						Ext.getCmp('obcom_muban').hide();
					}
				}
			});
		}

		// 执行方式 的选择 为电话 则显示话术 其她隐藏话术
		obCom_execTypId.on('select', function() {
					if (obCom_execTypId.getValue().toString() != 1) {
						Ext.getCmp('obcom_hua').hide();
						Ext.getCmp('obcom_muban').show();
					} else {
						Ext.getCmp('obcom_hua').show();
						Ext.getCmp('obcom_muban').hide();
					}
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
		Ext.getCmp('YXtaskDelFormWin').close();
	},
	/**
	 * 保存记录
	 */
	save : function() {   
		var usergroupid ='';
		var projId= Ext.getCmp('obCom.projId').getValue();
		var perIncharge=Ext.getCmp("obCom.perIncharge").getValue();
		var ownerTeam=Ext.getCmp("obCom.ownerTeam").getValue();
		var storegourp=Ext.getCmp("yixuanzezhixingzu").getStore();
		for (var j = 0; j < storegourp.getCount(); j++) {
			usergroupid+=storegourp.getAt(j).data.pkUsergroupId+",";
			}
		$postSubForm({
					formPanel : this.formPanel,
					scope : this,
					url : __ctxPath + '/outb/saveObCom.do',
					params : {
						pid : str,
						projId : projId,
						ownerTeam : ownerTeam,
						perIncharge : perIncharge,
						productids : productids,
						ctscr : ctscr,
						paprelease : paprelease,
						usergroupids : usergroupid

					},
					msgSuccess : '添加活动成功！',
					msgFailure : '操作出错，请联系管理员！',
					callback : function(fp, action) {
						var gridPanel = Ext.getCmp('ObComGrid');
						if (gridPanel != null) {
							gridPanel.getStore().reload();
						}
						var tabs = Ext.getCmp('centerTabPanel');
						tabs.remove('YXtaskDelFormWin');

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
						for (var i = 0; i < store.getCount(); i++) { // store.getCount()为store的长度
							if (store.getAt(i).data['itemId'] == combo
									.getValue()) {

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
YXtaskDelForm.prototype.initGroupSelectPanel = function(userId) {
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
				id:'yixuanzezhixingzu',
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
									return '<font qtip="双击删除">' + usergroupName
											+ '</font>';
							}
						}]
			});

	GroupGrid.on('dblclick', function(e) {

				var selectRecords = GroupGrid.getSelectionModel()
						.getSelections();
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