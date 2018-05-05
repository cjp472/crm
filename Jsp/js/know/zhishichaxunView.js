
zhishichaxun = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		zhishichaxun.superclass.constructor.call(this, {
					id : 'zhishichaxunWin',
					title : '知识管理',// '[UkSysKnow]管理',
					region : 'center',
					layout : 'border',
					items : [this.searchPanel, this.gridPanel]
				});
	},// end of constructor
	// 初始化组件
	initUIComponents : function() {

		this.searchPanel = new Ext.FormPanel({
					layout : 'hbox',
					region : 'north',
					id : 'zhishichaxunSearchPanel',
					height : 35,
					items : [{
								text : '标题:',
								style:'margin-top:-3px'
									
							}, {
//								name : 'Q_tiTle_S_LK',
								name : 'title' ,
								xtype : 'textfield'
							}, {
								text : '知识维度:',
								style:'margin-top:-3px'
							}, {
//								name : 'Q_ukDimensionalityKnows.dimName_S_LK',
//								xtype : 'textfield'
//								hiddenName : 'Q_busiType_L_EQ',
								hiddenName :'busiType',
								xtype : 'mtdiccombo',
								editable : false,
								lazyInit : false,
								forceSelection : false,
								itemKey : 'KNOW_CATE',
								width : 120
							}, {
								text : "结束时间:",
								style:'margin-top:-3px'
							},{
									xtype:'datefield',
									id : 'zhishi_manage_start',
//									name : 'Q_pastTime_D_GT',
									name : 'minPastTime',
									format:'Y-m-d',
									editable : false,
									width:100
								},{
									border:false,
									html:'~'
								},{
									xtype:'datefield',
									id : 'zhishi_manage_end',
//									name : 'Q_pastTime_D_LT',	
									name : 'maxPastTime',
									format:'Y-m-d',
									editable : false,
									width:100
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
								handler : function(){
									this.searchPanel.getForm().reset();
									Ext.getCmp('zhishi_manage_start').setRawValue('');
									Ext.getCmp('zhishi_manage_end').setRawValue('');
								}
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

		this.gridPanel = new HT.GridPanel({
			region : 'center',
			// 使用RowActions
			rowActions : true,
			printable : false,
			exportable : false,
			id : 'UkChaxunSysKnowGrid',
			tbar:['->',{
				text:'回收',
				iconCls:'btn-mail_move',
				handler : function() {
					var grid = Ext.getCmp('UkChaxunSysKnowGrid');
					var rows = grid.getSelectionModel().getSelections();
					var mygridpanel = 'UkChaxunSysKnowGrid';
					if (rows.length > 0) {
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
							Ext.ux.Toast.msg("操作信息", "只能将已发布的知识放入垃圾箱!");
							return;
						}
					} else {
						Ext.ux.Toast.msg("操作信息", "请至少选择一条记录!");
						return;
					}
				}
			},{
				text:'归档',
				iconCls:'menu-flowNew',
				handler : function() {
					var grid = Ext.getCmp("UkChaxunSysKnowGrid");
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
										Ext.getCmp('UkChaxunSysKnowGrid').getStore().reload();
									},
									failure : function() {
										Ext.ux.Toast.msg("操作信息", "知识归档失败");
									}
								});
							}
						});
					}
				}
			}],
//			url : __ctxPath + "/know/releaseListUkSysKnow.do",
			url : __ctxPath + "/know/queryKnowListUkSysKnow.do",
			baseParams :{
					NEQStatus : '0,6',
					isPermission : 'false',
					checkTypeRole : 'false',
					isOverdue :　'notCheck'
				}, 
			fields : [{
						name : 'knowId',
						type : 'int'
					}, 'ukSysKnow', 'ukKnowTypes', 'tiTle', 'busiType',
					'enableTime', 'pastTime', 'sysKnowStatus', 'viewCount',
					'sysKnowComment', 'plus1', 'plus2', 'plus3', 'plus4',
					'plus5', 'plus6', 'plus7', 'plus8', 'sysKnowVersion',
					'createBy', 'updateBy', 'createDate', 'updateDate',
					'userid', 'ukKnowTemplate', 'ukKnowApprove',
					'ukKnowKeywords','accessManage', 'dianpingCount','accessManage'],
			columns : [{
						header : __ukSysKnowKnowId,// 'knowId',
						dataIndex : 'knowId',
						hidden : true
					}, {
						header : "标题",
						isExp : false,
						width : 260,
						dataIndex : 'tiTle'
					}, {
						header : "访问方式",
						isExp : false,
						width : 100,
						dataIndex : 'accessManage',
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
						header : "开始时间",// '生效时间',
						isExp : false,
						dataIndex : 'enableTime',
						renderer : function(value) {
							return value.substring(0, 10);
						}
					}, {
						header : "结束时间",// '过期时间',
						isExp : false,
						dataIndex : 'pastTime',
						renderer : function(value) {
							return value.substring(0, 10);
						}
					},{
						header : "浏览数",// '浏览数',
						isExp : false,
						dataIndex : 'viewCount'
					},{
						header : "评价",// '浏览数',
						isExp : false,
						dataIndex : 'dianpingCount'
					
					}, {
						header : "状态",
						isExp : false,
						hidden : true,
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
								},{
									iconCls : 'btn-edit',
									qtip : __edit,
									style : 'margin:0 3px 0 3px'
							}],
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
	// 创建记录
	createRs : function() {
		new Ext.Window({
			id : 'zhishichaxunwin',
			model : true,
			width : 800,
			height : 520,
			layout : 'fit',
			buttonAlign : 'center',
			buttons : [{
				text : '发布',
				handler : function() {
					var grid = Ext.getCmp('UkChaxunSysKnowGrid');
					var rows = grid.getSelectionModel().getSelections();
					var _sysKnowIds = '';
					if (rows != null && rows.length >= 1) {
						for (var i = 0; i < rows.length; i++) {
							_sysKnowIds += rows[i].data.knowId + ",";
						}
						Ext.Ajax.request({
									url : __ctxPath
											+ '/know/publishUkSysKnow.do',
									method : 'post',
									params : {
										sysKnowIds : _sysKnowIds
									},
									success : function(response) {
										Ext.ux.Toast.msg(__actioninfo, '发布成功');
										Ext.getCmp('UkChaxunSysKnowGrid')
												.getStore().reload();
										Ext.getCmp('zhishichaxunwin').close();
									},
									failure : function() {
										Ext.ux.Toast.msg(__actioninfo, '发布失败');
									}
								});
					} else {
						Ext.ux.Toast.msg(__actioninfo, '请选择要发布的知识!');
					}
				}
			}, {
				text : '取消',
				handler : function() {
					Ext.getCmp('zhishichaxunwin').close();
				}
			}],
			items : [{
				xtype : 'tabpanel',
				activeTab : 0,
				items : [{
					xtype : 'panel',
					title : '角色',
					items : [{
						xtype : 'itemselector',
						id : 'AppUserRoles_',
						name : 'AppUserRoles_',
						fromLegend : '',
						flex : 1,
						imagePath : __ctxPath + '/ext3/ux/images/',
						defaults : {
							anchor : '100%,100%'
						},
						layout : {
							type : 'hbox',
							align : 'stretch'
						},
						multiselects : [{
							id : 'chooseRoles',
							title : '可选角色',
							height : 220,
							width : Ext.getCmp('centerTabPanel')
									.getInnerWidth()
									/ 2,
							autoWidth : true,
							store : new Ext.data.SimpleStore({
										autoLoad : true,
										baseParams : {
											userId : 1
										},
										url : __ctxPath
												+ '/system/chooseRolesAppUser.do',
										fields : ['roleId', 'roleName']
									}),
							displayField : 'roleName',
							valueField : 'roleId'
						}, {
							id : 'selectedRoles',
							name : 'selectedRoles',
							title : '已有角色',
							height : 220,
							width : Ext.getCmp('centerTabPanel')
									.getInnerWidth()
									/ 2,
							store : new Ext.data.SimpleStore({
										autoLoad : true,
										baseParams : {
											userId : 1
										},
										url : __ctxPath
												+ '/system/selectedRolesAppUser.do',
										fields : ['roleId', 'roleName']
									}),
							tbar : [{
								text : '清除所选',
								handler : function() {
									Ext.getCmp('AppUserForm').getForm()
											.findField('AppUserRoles').reset();
								}
							}],
							displayField : 'roleName',
							valueField : 'roleId'
						}]

					}]
				}, {
					xtype : 'panel',
					title : '用户组',
					items : [AppUserForm.prototype.initGroupSelectPanel()]
				}, {
					xtype : 'panel',
					title : '用户',
					items : [ugUserSelector.getView(function() {
							}, false, false, false, '', true)]
				}]
			}]
		}).show();
		// new UkSysKnowForm().show();
		// var tabs = Ext.getCmp('centerTabPanel');
		// var aForm = Ext.getCmp('UkSysKnowForm');
		// if (aForm != null) {
		// tabs.remove('UkSysKnowForm');
		// }
		// aForm = new UkSysKnowForm();
		// tabs.add(aForm);
		// tabs.activate(aForm);

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
	editRs : function(record) {
		var tabs = Ext.getCmp('centerTabPanel');
		var edit = tabs.getItem('UkKnowCollectForm');

		if (edit != null) {
			tabs.remove('UkKnowCollectForm');
		}

		if (Ext.getCmp('UkSysKnowShow') != null) {
			tabs.remove('UkSysKnowShow');
		}
		edit = new UkKnowCollectForm({
			knowId : record.data.knowId,
			knowTmpId : record.data.ukKnowTemplate.knowTmpId
		});
		tabs.add(edit);
		tabs.activate(edit);
	},
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
			case 'btn-edit' :
				this.editRs.call(this, record);
				break;
			case 'btn-readdocument' :
				this.showRs.call(this, record);
				break;
			case 'btn-mail_move' :
			    this.showRs.call(this, record);
				break;
			case 'menu-flowNew' :
			    this.showRs.call(this, record);
				break;
			default :
				break;
		}
	}
});
//知识回收
zhishichaxun.recovery = function(_ids) {
	Ext.Msg.confirm('回收操作', '你确定要回收该知识吗?', function(btn) {
		if (btn == 'yes') {
			Ext.Ajax.request({
				url : __ctxPath + '/know/queryKnowListUkSysKnow.do',
				method : 'post',
				params : {
					ids : _ids
				},
				success : function(response) {
					Ext.ux.Toast.msg("操作信息", '回收知识成功');
					Ext.getCmp('UkChaxunSysKnowGrid').getStore().reload();
				},
				failure : function() {
					Ext.ux.Toast.msg("操作信息", "回收知识失败");
				}
			});
		}
	});

};
//知识归档
zhishichaxun.file = function(_ids) {
	Ext.Msg.confirm('归档操作', '你确定要归档该知识吗?', function(btn) {
		if (btn == 'yes') {
			Ext.Ajax.request({
				url : __ctxPath + '/know/queryKnowListUkSysKnow.do',
				method : 'post',
				params : {
					ids : _ids
				},
				success : function(response) {
					Ext.ux.Toast.msg("操作信息", "知识归档成功");
					Ext.getCmp('UkChaxunSysKnowGrid').getStore().reload();
				},
				failure : function() {
					Ext.ux.Toast.msg("操作信息", "知识归档失败");
				}
			});
		}
	});

};