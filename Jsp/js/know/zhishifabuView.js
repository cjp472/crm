/**
 * @author:cf0666@gmail.com
 * @class UkPastSysKnowView
 * @extends Ext.Panel
 * @description [UkSysKnow]管理
 * @company 优创融联科技
 * @createtime:
 */
zhishifabu = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		zhishifabu.superclass.constructor.call(this, {
			id : 'zhishifabuWin',
			title : '知识发布',// '[UkSysKnow]管理',
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
					id : 'UkKnowApplySearchPanel',
					height : 35,
					items : [{
								text : '标题'
							}, {
								name : 'Q_tiTle_S_LK',
								xtype : 'textfield',
								flex : 1,
								width : 100
								
							}, {
//								text : '类型'
								text : '知识维度'
							}, {
								hiddenName : 'Q_busiType_L_EQ',
								xtype : 'mtdiccombo',
								editable : false,
								lazyInit : false,
								forceSelection : false,
								itemKey : 'KNOW_CATE',
								width : 120
								// items : [typeSelector]
//							}, {
//								text : '知识维度'
//							}, {
//								name : 'Q_ukDimensionalityKnows.dimName_S_LK',
//								xtype : 'textfield',
//								width : 100
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
			items : ["->", {
				iconCls : 'btn-grant',
				id : 'btn-grant-fabu',
				text : '发布',
				xtype : 'button',
				disabled : true,
				scope : this,
				handler : this.createRs
			}]
		});

		this.gridPanel = new HT.GridPanel({
			region : 'center',
			tbar : this.topbar,
			// 使用RowActions
			rowActions : true,
			printable : false,
			exportable : false,
			id : 'UkFabuSysKnowGrid',
			url : __ctxPath + "/know/listApprovedStatusUkSysKnow.do",
//			url : __ctxPath + "/know/queryKnowListUkSysKnow.do",
//			baseParams : {
//				status : 4
//			},
			fields : [{
						name : 'knowId',
						type : 'int'
					}, 'ukSysKnow', 'ukKnowTypes', 'tiTle', 'busiType',
					'enableTime', 'pastTime', 'sysKnowStatus', 'viewCount',
					'sysKnowComment', 'plus1', 'plus2', 'plus3', 'plus4',
					'plus5', 'plus6', 'plus7', 'plus8', 'sysKnowVersion',
					'createBy', 'updateBy', 'createDate', 'updateDate',
					'userid', 'ukKnowTemplate', 'ukKnowApprove',
					'ukKnowKeywords','accessManage'],
			columns : [{
						header : __ukSysKnowKnowId,// 'knowId',
						dataIndex : 'knowId',
						hidden : true
					}, {
						header : '标题',// '标题',
						isExp : false,
						width : 150,
						dataIndex : 'tiTle'
					}, {
						header : '访问方式',// 
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
//						renderer : function(value) {
//							''
//							if (value == null) {
//								return '';
//							} else {
//								var str = "";
//								for (var i = 0; i < value.length; i++) {
//									if (i > 0)
//										str += ",";
//									str += value[i].name;
//								}
//								return str;
//							}
//						}
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
					}, {
						header : "采集人",
						isExp : false,
						dataIndex : 'createBy',
						renderer : function(val) {
							if (val != null) {
								return val.fullname;
							} else {
								return '';
							}
						}
//						renderer : function(value) {
//							if (value == null) {
//								return '';
//							} else {
//								var str = "";
//								for (var i = 0; i < value.length; i++) {
//									if (i > 0)
//										str += ",";
//									str += value[i].keyWord;
//								}
//								return str;
//							}
//						}
					}, {
						// header : '知识审批单 ',//'知识审批单内码',
						// isExp : false,
						// dataIndex : 'ukKnowApprove',
						// renderer : function(val) {
						// if(val!=null){
						// return val.approveTitle;
						// }else{
						// return '';
						// }
						// }
						// }, {
						header : '采集时间 ',
						isExp : false,
						dataIndex : 'createDate'
					}, {
						header : "状态",// '状态&KNOW_STATUS',
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
								}],
						listeners : {
							scope : this,
							'action' : this.onRowAction
						}
					})]
				// end of columns
			});
		Ext.getCmp('UkFabuSysKnowGrid').getSelectionModel().on(
			'selectionchange', function(sm) {
				Ext.getCmp('btn-grant-fabu').setDisabled(sm.getCount() < 1);
			}
		);
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
		var selectstore = new Ext.data.SimpleStore({
			autoLoad : true,
			baseParams : {
				userId : curUserInfo.userId
			},
			url : __ctxPath + '/system/selectedRolesAppUser.do',
			fields : ['roleId', 'roleName']
		});
		new Ext.Window({
					id : 'zhishifabuwin_',
					model : true,
					width : 800,
					height : 520,
					layout : 'fit',
					buttonAlign : 'center',
					buttons : [{
						text : '发布',
						handler : function() {
							var grid = Ext.getCmp('UkFabuSysKnowGrid');
							var rows = grid.getSelectionModel().getSelections();
							var _sysKnowIds = '';
							if (rows != null && rows.length >= 1) {
								for (var i = 0; i < rows.length; i++) {
									_sysKnowIds += rows[i].data.knowId + ",";
								}
								var roleIds = '';
								selectstore.each(function(rec) {
											roleIds += rec.get('roleId');
											roleIds += ',';
										});
								Ext.Ajax.request({
											url : __ctxPath
													+ '/know/publishUkSysKnow.do',
											method : 'post',
											params : {
												sysKnowIds : _sysKnowIds,
												roleIds : roleIds
											},
											success : function(response) {
												Ext.ux.Toast.msg(__actioninfo,
														'发布成功');
												Ext.getCmp('UkFabuSysKnowGrid')
														.getStore().reload();
												Ext.getCmp('zhishifabuwin_')
														.close();
											},
											failure : function() {
												Ext.ux.Toast.msg(__actioninfo,
														'发布失败');
											}
										});
							} else {
								Ext.ux.Toast.msg(__actioninfo, '请选择要发布的知识!');
							}
						}
					}, {
						text : '取消',
						handler : function() {
							Ext.getCmp('zhishifabuwin_').close();
						}
					}],
					items : [{
						xtype : 'panel',
						title : '角色',
						items : [{
							xtype : 'itemselector',
							//id : 'AppUserRoles_',
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
								//id : 'chooseRoles',
								title : '可选角色',
								height : 220,
								width : Ext.getCmp('centerTabPanel')
										.getInnerWidth()
										/ 2,
								autoWidth : true,
								store : new Ext.data.SimpleStore({
									autoLoad : true,
									baseParams : {
										userId : curUserInfo.userId
									},
									url : __ctxPath
											+ '/system/chooseRolesAppRole.do',
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
								store : selectstore,
								tbar : [{
									text : '清除所选',
									handler : function() {
										Ext.getCmp('AppUserForm').getForm().findField('AppUserRoles').reset();
									}
								}],
								displayField : 'roleName',
								valueField : 'roleId'
							}]

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
		// 只允许有一个编辑窗口
		var tabs = Ext.getCmp('centerTabPanel');
		var eform = Ext.getCmp('UkSysKnowForm');
		if (eform != null) {
			tabs.add(eform);
		}
		eform = new UkSysKnowForm({
			knowId : record.data.knowId
		});
		tabs.add(eform);
		tabs.activate(eform);

		// new UkSysKnowForm({
		// knowId : record.data.knowId
		// }).show();
	},
	showRs : function(record) {
		var tabs = Ext.getCmp('centerTabPanel');
		var aForm = Ext.getCmp('UkSysKnowShow');
		if (aForm != null) {
			tabs.remove('UkSysKnowShow');
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
			default :
				break;
		}
	}
});
