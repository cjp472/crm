
UkPastSysKnowView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				UkPastSysKnowView.superclass.constructor.call(this, {
							id : 'UkPastSysKnowViewWin',
							title : '过期知识',// '[UkSysKnow]管理',
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
				// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'UkPastSysKnowSearchPanel',
							height : 35,
							items : [{
										text : '标题'
									}, {
//										name : 'Q_tiTle_S_LK',
										name : 'title',
										xtype : 'textfield'
									}, {
										text : '知识维度'
									}, {
//										name : 'Q_ukDimensionalityKnows.dimName_S_LK',
//										xtype : 'textfield'
//										hiddenName : 'Q_busiType_L_EQ',
										hiddenName : 'busiType',
										xtype : 'mtdiccombo',
										editable : false,
										lazyInit : false,
										forceSelection : false,
										itemKey : 'KNOW_CATE',
										width : 120
									}, {
										text : "关键字"
									}, {
//										name : 'Q_ukKnowKeywords.keyWord_S_LK',
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
											new UkKnowApplyAdvancedSearchWin().show()
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

				this.topbar = new Ext.Toolbar({
							items : ['->', {
										iconCls : 'btn-mail_move',
										text : '回收',// __delete +
														// '[UkSysKnow]
										xtype : 'button',
										scope : this,
										handler : this.removeToDusbin
									}, {
										iconCls : 'menu-flowNew',
										text : '归档',
										xtype : 'button',
										scope : this,
										handler : function(){
											var grid = Ext.getCmp('UkPastSysKnowGrid');
											var ids = Array();
											var selectRecords = grid.getSelectionModel().getSelections();
											if (selectRecords.length == 0) {
												Ext.ux.Toast.msg("信息", "请选择要归档的记录！");
												return;
											}
											else{
												for (var i = 0; i < selectRecords.length; i++) {
													ids.push(selectRecords[i].data.knowId);
												}
												Ext.Msg.confirm('回收操作', '你确定要归档该知识吗?', function(btn) {
													if (btn == 'yes') {
														Ext.Ajax.request({
															url : __ctxPath + '/know/multiFileUkSysKnow.do',
															method : 'post',
															params : {
																ids : ids
															},
															success : function(response) {
																Ext.ux.Toast.msg("操作信息", '知识归档成功');
																Ext.getCmp('UkPastSysKnowGrid').getStore().reload();
															},
															failure : function() {
																Ext.ux.Toast.msg("操作信息", "知识归档失败");
															}
														});
													}
												});
											}
										}
									}, {
										iconCls : 'btn-system-config',
										text : '设置有效期',// __create +
														// '[UkSysKnow]'
										xtype : 'button',
										scope : this,
										handler : this.setDateRs
									}]
						});

				this.gridPanel = new HT.GridPanel({
					region : 'center',
					tbar : this.topbar,
					// 使用RowActions
					rowActions : true,
					printable : false,
					exportable : false,
					id : 'UkPastSysKnowGrid',
//					url : __ctxPath + "/know/guoQiListUkSysKnow.do",
					url : __ctxPath + "/know/queryKnowListUkSysKnow.do",
					baseParams :{
							status : 5,
							isPermission : 'false',
							checkTypeRole : 'false',
							isOverdue :　'notCheck'
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
							'ukKnowTemplate', 'ukKnowApprove', 'ukKnowKeywords','accessManage'],
					columns : [{
								header : __ukSysKnowKnowId,// 'knowId',
								dataIndex : 'knowId',
								hidden : true
							}, {
								header : __ukSysKnowKnowTmpId,// '知识模板编号',
								isExp : false,
								dataIndex : 'ukKnowTemplate',
								hidden : true,
								renderer : function(val) {
									return val != null ? val.tmpName : '';
								}
							}, {
								header : __ukSysKnowKnowApproveId,// '知识审批单内码',
								isExp : false,
								hidden : true,
								dataIndex : 'ukKnowApprove',
								renderer : function(val) {
									if (val != null) {
										return val.knowApproveIdName;
									} else {
										return '';
									}
								}
							}, {
								header : __ukSysKnowTiTle,// '标题',
								isExp : false,
								width:300,
								dataIndex : 'tiTle'
							}, {
								header : '访问方式',// '摘要',
								isExp : false,
								dataIndex : 'accessManage',
								width : 120,
								renderer : function(val) {
									if (val != null) {
										return KNOW_FWGL.get(val);
									} else {
										return '';
									}
								}
							}, {
								header : "类型",
								isExp : false,
								dataIndex : 'busiType',
								renderer : function(value) {
									if (value != null){
										return KNOW_CATE.get(value);
									}else {
										return '';	
									}
								}
							}, {
								header : '开始时间',// '生效时间',
								isExp : false,
								dataIndex : 'enableTime'
							}, {
								header : '结束时间',// '过期时间',
								isExp : false,
								dataIndex : 'pastTime'
							}, {
								header : __ukSysKnowViewCount,// '浏览数',
								isExp : false,
								dataIndex : 'viewCount'
							}, {
								header : '评价',// '版本号',
								isExp : false,
								hidden : true,
								dataIndex : 'sysKnowVersion'
							}, {
								header : __ukSysKnowCreateBy,// '创建人内码',
								isExp : false,
								hidden:true,
								dataIndex : 'createBy',
								hidden : true,
								renderer : function(value) {
									if (value == null) {
										return '';
									} else {
										return value.fullname;
									}
								}
							}, {
								header : __ukSysKnowSysKnowStatus,// '状态&KNOW_STATUS',
								isExp : false,
								dataIndex : 'sysKnowStatus',
								renderer : function(value) {
									return KNOW_FLOW.get(value);
								}
							}, new Ext.ux.grid.RowActions({
										header : __action,
										width : 60,
										actions : [{
													iconCls : 'btn-readdocument',
													qtip : "查看",
													style : 'margin:0 3px 0 3px'

												}
										// {
										// iconCls : 'btn-del',
										// qtip : __delete,
										// style : 'margin:0 3px 0 3px'
										// }, {
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

				 this.gridPanel.addListener('rowdblclick', this.rowClick);

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
				grid.getSelectionModel().each(function(record) {
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
						});
			},
			// 设置有效期记录
			setDateRs : function() {
				var grid = Ext.getCmp('UkPastSysKnowGrid');
				var rows = grid.getSelectionModel().getSelections();
				if (rows != null && rows.length > 0) {
					var setTimeKnowIds = Array();
					for (var i = 0; i < rows.length; i++) {
						setTimeKnowIds.push(rows[i].data.knowId);
					}
					new UkSetValidityTimeForm({
								setTimeKnowIds : setTimeKnowIds
							}).show();

				} else {
					Ext.ux.Toast.msg(__toastMessage, "请至少选择一条记录!");
				}
			},
			//归档
			guidang : function() {
				var grid = Ext.getCmp('UkPastSysKnowGrid');
				var rows = grid.getSelectionModel().getSelections();
				var mygridpanel = 'UkPastSysKnowGrid';
				if (rows != null && rows.length > 0) {
					var flag = true;
					var knowIds = '';
					for (i = 0; i < rows.length; i++) {
						if (rows[i].data.sysKnowStatus != 5) {
							flag = false;
						}
						if (i > 0) {
							knowIds += ',';
						}
						knowIds += rows[i].data.knowId

					}
					new RubbishForm({
						knowIds : knowIds,
						mygridpanel : mygridpanel
					}).show();
					
				} else {
					Ext.ux.Toast.msg(__toastMessage, "请至少选择一条记录!");
					return;
				}

			},
			// 移到垃圾箱
			removeToDusbin : function() {
				var grid = Ext.getCmp('UkPastSysKnowGrid');
				var rows = grid.getSelectionModel().getSelections();
				var mygridpanel = 'UkPastSysKnowGrid';
				if (rows != null && rows.length > 0) {
					var flag = true;
					var knowIds = '';
					for (i = 0; i < rows.length; i++) {
						if (rows[i].data.sysKnowStatus != 5) {
							flag = false;
						}
						if (i > 0) {
							knowIds += ',';
						}
						knowIds += rows[i].data.knowId

					}
					if (flag) {
						new RubbishForm({
							knowIds : knowIds,
							mygridpanel : mygridpanel
						}).show();
					} else {
						Ext.ux.Toast.msg(__toastMessage, "只能将已发布的知识放入垃圾箱!");
						return;
					}
				} else {
					Ext.ux.Toast.msg(__toastMessage, "请至少选择一条记录!");
					return;
				}

			},
			// 编辑Rs
			showRs : function(record) {
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
