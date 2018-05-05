/**
 * @author:cf0666@gmail.com
 * @class UkNewSysKnowView
 * @extends Ext.Panel
 * @description [UkSysKnow]管理
 * @company 优创融联科技
 * @createtime:
 */
UkNewSysKnowView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				UkNewSysKnowView.superclass.constructor.call(this, {
							id : 'UkNewSysKnowViewWin',
							title : __menuViewUkSysKnows,// '[UkSysKnow]管理',
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件

			initUIComponents : function() {

				/**
				 * 注销高级查询
				 */

				// var fieldnameComboData = [
				// ['knowTmpId', '知识模板编号', new Ext.form.ComboBox({
				// editabel : false,
				// lazyInit : false,
				// triggerAction : 'all',
				// store : new Ext.data.SimpleStore({
				// autoLoad : true,
				// url : __ctxPath
				// + '/financial/comboknowTmpId.do',
				// fields : ['knowTmpId', 'knowTmpIdName']
				// }),
				// displayField : 'knowTmpIdName',
				// valueField : 'knowTmpId',
				// id : 'knowTmpId'
				// })],
				// ['knowApproveId', '知识审批单内码', new Ext.form.ComboBox({
				// editabel : false,
				// lazyInit : false,
				// triggerAction : 'all',
				// store : new Ext.data.SimpleStore({
				// autoLoad : true,
				// url : __ctxPath
				// + '/financial/comboknowApproveId.do',
				// fields : ['knowApproveId',
				// 'knowApproveIdName']
				// }),
				// displayField : 'knowApproveIdName',
				// valueField : 'knowApproveId',
				// id : 'knowApproveId'
				// })], ['tiTle', '标题', new Ext.form.TextField({
				// name : 'tiTle',
				// allowBlank : true
				// })],
				// ['busiType', '业务分类&BUSI_TYPE', new Ext.form.NumberField({
				// name : 'busiType',
				// allowBlank : true
				// })],
				// ['enableTime', '生效时间', new Ext.form.DateField({
				// hiddenName : 'enableTime',
				// format : 'Y-m-d'
				// })],
				// ['pastTime', '过期时间', new Ext.form.DateField({
				// hiddenName : 'pastTime',
				// format : 'Y-m-d'
				// })],
				// ['sysKnowStatus', '状态&KNOW_STATUS', new
				// Ext.form.NumberField({
				// name : 'sysKnowStatus',
				// allowBlank : true
				// })],
				// ['viewCount', '浏览数', new Ext.form.NumberField({
				// name : 'viewCount',
				// allowBlank : true
				// })],
				// ['sysKnowComment', '摘要', new Ext.form.TextField({
				// name : 'sysKnowComment',
				// allowBlank : true
				// })],
				// ['plus1', '附加字段1', new Ext.form.TextField({
				// name : 'plus1',
				// allowBlank : true
				// })],
				// ['plus2', '附加字段2', new Ext.form.TextField({
				// name : 'plus2',
				// allowBlank : true
				// })],
				// ['plus3', '附加字段3', new Ext.form.TextField({
				// name : 'plus3',
				// allowBlank : true
				// })],
				// ['plus4', '附加字段4', new Ext.form.TextField({
				// name : 'plus4',
				// allowBlank : true
				// })],
				// ['plus5', '附加字段5', new Ext.form.TextField({
				// name : 'plus5',
				// allowBlank : true
				// })],
				// ['plus6', '附加字段6', new Ext.form.TextField({
				// name : 'plus6',
				// allowBlank : true
				// })],
				// ['plus7', '附加字段7', new Ext.form.TextField({
				// name : 'plus7',
				// allowBlank : true
				// })],
				// ['plus8', '附加字段8', new Ext.form.TextField({
				// name : 'plus8',
				// allowBlank : true
				// })],
				// ['sysKnowVersion', '版本号', new Ext.form.NumberField({
				// name : 'sysKnowVersion',
				// allowBlank : true
				// })],
				// ['createBy', '创建人', new Ext.form.NumberField({
				// name : 'createBy',
				// allowBlank : true
				// })],
				// ['updateBy', '修改人', new Ext.form.NumberField({
				// name : 'updateBy',
				// allowBlank : true
				// })],
				// ['createDate', '创建时间', new Ext.form.DateField({
				// hiddenName : 'createDate',
				// format : 'Y-m-d'
				// })],
				// ['updateDate', '修改时间', new Ext.form.DateField({
				// hiddenName : 'updateDate',
				// format : 'Y-m-d'
				// })],
				// ['userid', '创建人内码', new Ext.form.NumberField({
				// name : 'userid',
				// allowBlank : true
				// })]]
				// var UkSysKnowAdvancedSearchWin =
				// Ext.extend(MT.AdvancedSearchWin, {
				// title : '[UkSysKnow]高级查询',
				// fieldData : fieldnameComboData
				// });
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'UkNewSysKnowPanel',
							height : 35,
							items : [{
										text : '标题:',
										style:'margin-top:-3px'
									}, {
										name : 'title',
										xtype : 'textfield'
//									}, {
//										text : '知识分类:',
//										style:'margin-top:-3px'
//									}, {
//										name : 'ukKnowTypeName',
//										xtype : 'textfield'
									}, {
										text : "关键字:",
										style:'margin-top:-3px'
									}, {
										name : 'ukKnowKeyWord',
										xtype : 'textfield'
									}, {
										xtype : 'button',
										text : __search,
										iconCls : 'search',
										scope : this,
										handler : this.onSearch
									}, {
										xtype : 'button',
										text : __reset,
										scope : this,
										iconCls : 'btn-reset',
										handler : this.reset
									}, {
										xtype : 'button',
										text : __advancedSearch,
										iconCls : 'search',
										scope : this,
										handler : function() {
											new UkSysKnowAdvancedSearchWin()
													.show()
										}
									}],
							layoutConfig : {
								padding : '5',
								align : 'middle'
							},
							defaults : {
								xtype : 'label',
								border : false,
								margins : {
									top : 0,
									right : 4,
									bottom : 4,
									left : 4
								}
							},
							border : false,
							frame : false
						});// end of searchPanel
				// 初始化搜索条件Panel
				// this.searchPanel = new Ext.FormPanel({
				// layout : 'hbox',
				// region : 'north',
				// id : 'UkSysKnowSearchPanel',
				// height : 35,
				// items : [{
				//
				// hiddenName : 'Q_knowTmpId_L_EQ',
				// xtype : 'combo',
				// editabel : false,
				// lazyInit : false,
				// triggerAction : 'all',
				// store : new Ext.data.SimpleStore({
				// autoLoad : true,
				// url : __ctxPath
				// + '/financial/comboknowTmpId.do',
				// fields : ['knowTmpId', 'knowTmpIdName']
				// }),
				// displayField : 'knowTmpIdName',
				// valueField : 'knowTmpId',
				// id : 'knowTmpId'
				// }, {
				//
				// hiddenName : 'Q_knowApproveId_L_EQ',
				// xtype : 'combo',
				// editabel : false,
				// lazyInit : false,
				// triggerAction : 'all',
				// store : new Ext.data.SimpleStore({
				// autoLoad : true,
				// url : __ctxPath
				// + '/financial/comboknowApproveId.do',
				// fields : ['knowApproveId',
				// 'knowApproveIdName']
				// }),
				// displayField : 'knowApproveIdName',
				// valueField : 'knowApproveId',
				// id : 'knowApproveId'
				// }, {
				//
				// name : 'Q_tiTle_S_EQ',
				// xtype : 'textfield'
				// }, {
				//
				// hiddenName : 'Q_busiType_L_EQ',
				// xtype : 'mtdiccombo',
				// editable : true,
				// lazyInit : false,
				// forceSelection : false,
				// itemKey : 'BUSI_TYPE'
				// }, {
				//
				// name : 'Q_enableTime_D_EQ',
				// xtype : 'datefield',
				// format : 'Y-m-d'
				// }, {
				//
				// name : 'Q_pastTime_D_EQ',
				// xtype : 'datefield',
				// format : 'Y-m-d'
				// }, {
				//
				// hiddenName : 'Q_sysKnowStatus_N_EQ',
				// xtype : 'mtdiccombo',
				// editable : true,
				// lazyInit : false,
				// forceSelection : false,
				// itemKey : 'KNOW_STATUS'
				// }, {
				//
				// name : 'Q_viewCount_N_EQ',
				// xtype : 'numberfield'
				// }, {
				//
				// name : 'Q_sysKnowComment_S_EQ',
				// xtype : 'textfield'
				// }, {
				//
				// name : 'Q_plus1_S_EQ',
				// xtype : 'textfield'
				// }, {
				//
				// name : 'Q_plus2_S_EQ',
				// xtype : 'textfield'
				// }, {
				//
				// name : 'Q_plus3_S_EQ',
				// xtype : 'textfield'
				// }, {
				//
				// name : 'Q_plus4_S_EQ',
				// xtype : 'textfield'
				// }, {
				//
				// name : 'Q_plus5_S_EQ',
				// xtype : 'textfield'
				// }, {
				//
				// name : 'Q_plus6_S_EQ',
				// xtype : 'textfield'
				// }, {
				//
				// name : 'Q_plus7_S_EQ',
				// xtype : 'textfield'
				// }, {
				//
				// name : 'Q_plus8_S_EQ',
				// xtype : 'textfield'
				// }, {
				//
				// name : 'Q_sysKnowVersion_N_EQ',
				// xtype : 'numberfield'
				// }, {
				//
				// name : 'Q_createBy_L_EQ',
				// xtype : 'numberfield'
				// }, {
				//
				// name : 'Q_updateBy_L_EQ',
				// xtype : 'numberfield'
				// }, {
				//
				// name : 'Q_createDate_D_EQ',
				// xtype : 'datefield',
				// format : 'Y-m-d'
				// }, {
				//
				// name : 'Q_updateDate_D_EQ',
				// xtype : 'datefield',
				// format : 'Y-m-d'
				// }, {
				//
				// name : 'Q_userid_L_EQ',
				// xtype : 'numberfield'
				// }, {
				// xtype : 'button',
				// text : __search,
				// iconCls : 'search',
				// scope : this,
				// handler : this.onSearch.createCallback(this)
				// }, {
				// xtype : 'button',
				// text : __reset,
				// scope : this,
				// iconCls : 'btn-reset',
				// handler : function() {
				// var searchPanel = Ext
				// .getCmp('UkSysKnowSearchPanel');
				// searchPanel.getForm().reset();
				// }
				// }, {
				// xtype : 'button',
				// text : __advancedSearch,
				// iconCls : 'search',
				// scope : this,
				// handler : new UkSysKnowAdvancedSearchWin().show()
				// }],
				// layoutConfig : {
				// padding : '5',
				// align : 'middle'
				// },
				// defaults : {
				// xtype : 'label',
				// border : false,
				// margins : {
				// top : 0,
				// right : 4,
				// bottom : 4,
				// left : 4
				// }
				// },
				// border : false,
				// frame : false
				// });// end of searchPanel

				this.topbar = new Ext.Toolbar({
							items : [{
										iconCls : 'btn-add',
										text : __create + '[UkSysKnow]',
										xtype : 'button',
										scope : this,
										handler : this.createRs
									}, {
										iconCls : 'btn-del',
										text : __delete + '[UkSysKnow]',
										xtype : 'button',
										scope : this,
										handler : this.removeSelRs
									}]
						});

				this.gridPanel = new HT.GridPanel({
					region : 'center',
					// tbar : this.topbar,
					// 使用RowActions
					rowActions : true,
					showSm:false,
					printable : false,
					exportable : false,
					id : 'UkNewSysKnowGrid',
					// url : __ctxPath + "/know/newListUkSysKnow.do",
					url : __ctxPath + "/know/queryKnowListUkSysKnow.do",
					baseParams : {
						status : 5,
						isNew : true,
						isPermission : 1,
						isOverdue : 'notCheck'
					},
					fields : [{
								name : 'knowId',
								type : 'int'
							}, 'ukSysKnow', 'ukKnowTypes', 'tiTle', 'busiType',

							'enableTime', 'pastTime', 'sysKnowStatus',
							'viewCount', 'sysKnowComment', 'plus1', 'plus2',
							'plus3', 'plus4', 'plus5', 'plus6', 'plus7',
							'plus8', 'sysKnowVersion', 'createBy', 'updateBy',
							'createDate', 'updateDate', 'userid',
							'ukKnowTemplate', 'ukKnowApprove', 'ukKnowKeywords','accessManage','knowKeyWords'],
					columns : [{
								header : __ukSysKnowKnowId,// 'knowId',
								dataIndex : 'knowId',
								hidden : true
							}, {
								header : __ukSysKnowKnowTmpId,// '知识模板编号',
								isExp : false,
								hidden : true,
								dataIndex : 'ukKnowTemplate',
								renderer : function(val) {
									return val != null ? val.tmpName : '';
								}
							}, {
								header : __ukSysKnowKnowApproveId,// '知识审批单内码',
								isExp : false,
								hidden : true,
								dataIndex : 'ukKnowApprove',
								renderer : function(val) {
									return val != null
											? val.knowApproveIdName
											: '';
								}
							}, {
								header : __ukSysKnowTiTle,// '标题',
								isExp : false,
								width:400,
								dataIndex : 'tiTle'
							}, {
								header : __ukSysKnowSysKnowComment,// '摘要',
								isExp : false,
								hidden : true,
								dataIndex : 'sysKnowComment'
							},
							// {
							// header : "知识分类",
							// isExp : false,
							// dataIndex : 'ukKnowTypes',
							// renderer : function(value) {''
							// if (value == null) {
							// return '';
							// } else {
							// var str= "";
							// for(var i = 0; i < value.length; i++){
							// if(i>0)str+=",";
							// str += value[i].name;
							// }
							// return str;
							// }
							// }
							// },
							{
								header : "关键字",
								isExp : false,
								hidden : true,
								dataIndex : 'knowKeyWords'
//								,
//								renderer : function(value) {
//									if (value == null) {
//										return '';
//									} else {
//										var str = "";
//										for (var i = 0; i < value.length; i++) {
//											if (i > 0)
//												str += ",";
//											str += value[i].keyWord;
//										}
//										return str;
//									}
//								}
							}, {
								header : __ukSysKnowBusiType,// '业务分类&BUSI_TYPE',
								isExp : false,
								hidden : true,
								dataIndex : 'busiType',
								renderer : function(value) {
									return BUSI_TYPE.get(value);
								}
							}, {
								header : '发布时间',// '生效时间',__ukSysKnowEnableTime
								isExp : false,
								format : 'Y-m-d',
								dataIndex : 'updateDate'
							}, {
								header : __ukSysKnowPastTime,// '过期时间',
								isExp : false,
								dataIndex : 'pastTime',
								format : 'Y-m-d'
							},
							// {
							// header : __ukSysKnowSysKnowStatus,//
							// '状态&KNOW_STATUS',
							// isExp : false,
							// dataIndex : 'sysKnowStatus',
							// renderer : function(value) {
							// return KNOW_STATUS.get(value);
							// }
							// },
							{
								header : __ukSysKnowViewCount,// '浏览数',
								isExp : false,
								dataIndex : 'viewCount'
							}, {
								header : __ukSysKnowSysKnowVersion,// '版本号',
								isExp : false,
								hidden : true,
								dataIndex : 'sysKnowVersion'
							},
							// {
							// header : __ukSysKnowCreateBy,// '创建人内码',
							// isExp : false,
							// dataIndex : 'createBy',
							// renderer : function(value) {
							// if (value == null) {
							// return '';
							// } else {
							// return value.fullname;
							// }
							// }
							// },
							new Ext.ux.grid.RowActions({
										header : __action,
										width : 50,
										actions : [{
													iconCls : 'btn-readdocument',
													qtip : '查看',
													style : 'margin:0 3px 0 3px'
												}
										// {
										// iconCls : 'btn-edit',
										// qtip : __edit,
										// style : 'margin:0 3px 0 3px'
										// }
										],
										listeners : {
											scope : this,
											'action' : this.onRowAction
										}
									})]
						// end of columns
				});

				// this.gridPanel.addListener('rowdblclick', this.rowClick);

			},// end of the initComponents()
			// 重置查询表单
			reset : function() {
				this.searchPanel.getForm().reset();
			},
			// 按条件搜索
			onSearch : function(obj) {
				$search({
							searchPanel : this.searchPanel,
							gridPanel : this.gridPanel
						});
			},
			// GridPanel行点击处理事件
			rowClick : function(grid, rowindex, e) {
				grid.getSelectionModel().each(function(rec) {
							new UkSysKnowForm({
										knowId : rec.data.knowId
									}).show();
						});
			},
			// 创建记录
			createRs : function() {
				// new UkSysKnowForm().show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('UkSysKnowForm');
				if (aForm != null) {
					tabs.remove('UkSysKnowForm');
				}
				aForm = new UkSysKnowForm();
				tabs.add(aForm);
				tabs.activate(aForm);

			},
			// 按ID删除记录
			removeRs : function(id) {
				$postDel({
							url : __ctxPath + '/know/multiDelUkSysKnow.do',
							ids : id,
							grid : this.gridPanel
						});
			},
			// 把选中ID删除
			removeSelRs : function() {
				$delGridRs({
							url : __ctxPath + '/know/multiDelUkSysKnow.do',
							grid : this.gridPanel,
							idName : 'knowId'
						});
			},
			// 编辑Rs
			showRs : function(record) {
//				var tabs = Ext.getCmp('centerTabPanel');
//				var aForm = Ext.getCmp('UkSysKnowShow');
//				if (aForm != null) {
//					tabs.remove('UkSysKnowShow');
//				}
//				var collForm = Ext.getCmp('UkKnowCollectFormWin');
//				if (collForm != null) {
//					tabs.remove(collForm);
//				}
//				aForm = new UkSysKnowShow({
//							knowId : record.data.knowId,
//							knowTmpId : record.data.ukKnowTemplate.knowTmpId,
//							knowTitle : record.data.tiTle
//						});
//				tabs.add(aForm);
//				tabs.activate(aForm);
				
				if(record.data.accessManage==1){
					var tabs = Ext.getCmp('centerTabPanel');
					var aForm = Ext.getCmp('UkSysKnowShow');
					if (aForm != null) {
						tabs.remove('UkSysKnowShow');
					}
					var collForm = Ext.getCmp('UkKnowCollectFormWin');
					if (collForm != null) {
						tabs.remove(collForm);
					}
			
					aForm = new UkSysKnowShow({
								knowId : record.data.knowId,
								knowTmpId : record.data.ukKnowTemplate.knowTmpId,
								knowTitle : record.data.tiTle
							});
					tabs.add(aForm);
					tabs.activate(aForm);
				}else{
					Ext.Ajax.request({
						method : 'post',
						url : __ctxPath + '/know/hasReadKnowUkKnowDianping.do',
						params : {
							knowId : record.data.knowId,
							busiType : record.data.busiType
						},
						success : function(response, options) {
							var thisObj = Ext.util.JSON.decode(response.responseText);
							var hasRead = thisObj.hasRead;
							if (hasRead) {
								var tabs = Ext.getCmp('centerTabPanel');
								var aForm = Ext.getCmp('UkSysKnowShow');
								if (aForm != null) {
									tabs.remove('UkSysKnowShow');
								}
								var collForm = Ext.getCmp('UkKnowCollectFormWin');
								if (collForm != null) {
									tabs.remove(collForm);
								}
						
								aForm = new UkSysKnowShow({
											knowId : record.data.knowId,
											knowTmpId : record.data.knowTmpId,
											knowTitle : record.data.tiTle
										});
								tabs.add(aForm);
								tabs.activate(aForm);
							} else {
								Ext.ux.Toast.msg("操作信息","对不起，您没有权限查看该知识!");
							}
						},
						failure : function(request) {
							Ext.ux.Toast.msg('操作信息', '操作出错，请联系管理员!');
						}
					});
				}
			
			},
			// 行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this, record.data.knowId);
						break;
					case 'btn-readdocument' :
						this.showRs.call(this, record);
						break;
					default :
						break;
				}
			}
		});
