/**
 * @author:zhangyl
 * @class UkKnowCollectView
 * @extends Ext.Panel
 * @description [UkSysKnow]管理
 * @company 优创融联科技
 * @createtime:
 */
var knowTmpId = this.knowTmpId ? this.knowTmpId : -1; // 全局变量 用于动态调用VM
UkKnowCollectView = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		UkKnowCollectView.superclass.constructor.call(this, {
					id : 'UkKnowCollectViewWin',
					title : __menuViewUkKnowCollect,// '[UkSysKnow]管理',
					region : 'center',
					layout : 'border',
					items : [this.treePanel, this.contentPanel]
				});
	},// end of constructor
	// 初始化组件
	initUIComponents : function() {
		var fieldnameComboData = [
				['knowTmpId', '知识模板编号', new Ext.form.ComboBox({
					name : 'knowTmpId',
					allowBlank : true
				})],
				['knowApproveId', '知识审批单内码', new Ext.form.TextField({
					name : 'knowApproveId',
					allowBlank : true

				})], ['tiTle', '标题', new Ext.form.TextField({
					name : 'tiTle',
					allowBlank : true
				})],
				['busiType', '业务分类&BUSI_TYPE', new Ext.form.NumberField({
					name : 'busiType',
					allowBlank : true
				})],
				['enableTime', '生效时间', new Ext.form.DateField({
					hiddenName : 'enableTime',
					format : 'Y-m-d'
				})],
				['pastTime', '过期时间', new Ext.form.DateField({
					hiddenName : 'pastTime',
					format : 'Y-m-d'
				})],
				['sysKnowStatus', '状态&KNOW_STATUS', new Ext.form.NumberField({
					name : 'sysKnowStatus',
					allowBlank : true
				})],
				['viewCount', '浏览数', new Ext.form.NumberField({
					name : 'viewCount',
					allowBlank : true
				})],
				['sysKnowComment', '摘要', new Ext.form.TextField({
					name : 'sysKnowComment',
					allowBlank : true
				})],
				['userid', '创建人内码', new Ext.form.NumberField({
					name : 'userid',
					allowBlank : true
				})]
			]
		var UkSysKnowAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : '[UkSysKnow]高级查询',
					fieldData : fieldnameComboData
				});
		// 初始化搜索条件Panel
		this.searchPanel = new Ext.FormPanel({
					layout : 'hbox',
					region : 'north',
					id : 'UkKnowCollectSearchPanel',
					height : 35,
					items : [{
						text : __ukSysKnowTiTle
							// 知识标题
						}, {
						name : 'title',
						id : 'ukknowCollectView.title',
						xtype : 'textfield'
					}, {
						text : '关键字'
					}, {
						name : 'ukKnowKeyWord',
						id : 'ukknowCollectView.ukKnowKeyWord',
						hiddenName : 'ukKnowKeyWord',
						xtype : 'textfield'
					}, {
						text : '状态'
					}, {
						hiddenName : 'status',
						xtype : 'mtdiccombo',
						editable : false,
						lazyInit : false,
						id : 'ukknowCollectView.status',
						forceSelection : false,
						itemKey : 'KNOW_FLOW'
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
							new UkSysKnowAdvancedSearchWin().show()
						}
					},{
						name : 'typeId',
						id : 'ukknowCollectView.typeId',
						xtype : 'hidden'
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
		this.treePanel = new Ext.tree.TreePanel({
					region : 'west',
					id : 'ukKnowCollectTreePanel',
					title : '知识分类',// __ukKnowTypeListHeading,
					collapsible : true,
					autoScroll : true,
					split : true,
					height : 800,
					width : 180,

					tbar : new Ext.Toolbar({
						items : [{
							xtype : 'button',
							iconCls : 'btn-refresh',
							text : '刷新',
							handler : function() {
								treePanel = Ext.getCmp('ukKnowCollectTreePanel');
								treePanel.root.reload();
							}
						}, '-', {
							xtype : 'button',
							text : '展开',
							iconCls : 'btn-expand',
							handler : function() {
								treePanel = Ext.getCmp('ukKnowCollectTreePanel');
								treePanel.expandAll();
							}
						}, '-', {
							xtype : 'button',
							text : '收起',
							iconCls : 'btn-collapse',
							handler : function() {
								treePanel = Ext.getCmp('ukKnowCollectTreePanel');
								treePanel.collapseAll();
							}
						}]
					}),
					loader : new Ext.tree.TreeLoader({
						url : __ctxPath + '/know/listForRoleUkKnowType.do'
					}),
					root : new Ext.tree.AsyncTreeNode({
						expanded : true
					}),
					rootVisible : false,
					listeners : {
						'click' : UkKnowCollectView.clickNode
					}
				});
		this.topbar = new Ext.Toolbar({
			items : ['->', {
						iconCls : 'btn-add',
						text : '增加',// __create
						xtype : 'button',
						scope : this,
						handler : this.createRs
					}, {
						iconCls : 'assets-type',
						text : '复制',
						id : 'copyBtn',
						ref : '../opyBtn',
						xtype : 'button',
						scope : this,
						handler : function() {
							UkKnowCollectView.copyto();
						}
					}, {
						iconCls : 'btn-system-copy',
						text : '转移',
						xtype : 'button',
						scope : this,
						id : 'shareBtn',
						disabled : true,
						handler : function() {
							UkKnowCollectView.moveto();
						}
					}

					, {
						iconCls : 'btn-mail_move',
						text : '回收',// __delete +
						id : 'dropBtn',
						disabled : true,
						// '[UkSysKnow]
						xtype : 'button',
						scope : this,
						handler : this.removeToDusbin
					}
					// , {
					// iconCls : 'btn-del',
					// id : 'delBtn',
					// disabled : true,
					// text : __delete,
					// xtype : 'button',
					// scope : this,
					// handler : this.removeSelRs
					// }
					, {
						iconCls : 'btn-import',
						text : '导入',// __create
						xtype : 'button',
						scope : this,
						hidden:true,
						handler : function() {
							UkKnowCollectImport();// 在UkKnowCollectImport.js
							// 里定义
						}
					}, {
						id : 'newFlowBtn',
						iconCls : 'menu-flowNew',
						text : '归档',// __create
						xtype : 'button',
						scope : this,
						handler : function() {
							var grid = Ext.getCmp('UkKnowCollectGrid');
							var selectRecords = grid.getSelectionModel().getSelections();
							var ids = Array();
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
												Ext.getCmp('UkKnowCollectGrid').getStore().reload();
											},
											failure : function() {
												Ext.ux.Toast.msg("操作信息", "知识归档失败");
											}
										});
									}
								});
							}
						}
					}]

		});

		// this.searchPanel

		this.gridPanel = new HT.GridPanel({
			region : 'center',
			tbar : this.topbar,
			// 使用RowActions
			rowActions : true,
			printable : false,
			// remoteSort : true,
			exportable : false,
			// sortInfo : {
			// field : 'sysKnowStatus',
			// direction : 'ASC'
			// },
			id : 'UkKnowCollectGrid',
			// url : __ctxPath + '/know/ukCollectlistUkSysKnow.do',
			url : __ctxPath + "/know/queryKnowListUkSysKnow.do",
			baseParams : {
				NEQStatus : '1,6,7,8',
				isPermission : 'false',
				checkTypeRole : 'false',
				isOverdue :　'notCheck'
				// ,typeId :
				// Ext.getCmp('ukKnowCollectTreePanel').getSelectionModel().getSelectedNode().id
			},
			// store : new Ext.data.Store({
			// autoLoad : true,
			// proxy : new Ext.data.HttpProxy({
			// url : __ctxPath
			// + '/know/ukCollectlistUkSysKnow.do'
			// }),
			// reader : new Ext.data.JsonReader({
			// root : 'result',
			// totalProperty : 'totalCounts',
			// fields : ['knowId', 'ukSysKnow',
			// 'ukSysKnow', 'tiTle', 'busiType',
			// 'enableTime', 'pastTime',
			// 'sysKnowStatus', 'viewCount',
			// 'sysKnowComment', 'plus1', 'plus2',
			// 'plus3', 'plus4', 'plus5', 'plus6',
			// 'plus7', 'plus8', 'sysKnowVersion',
			// 'createBy', 'updateBy',
			// 'createDate', 'updateDate',
			// 'ukKnowTemplate', 'runid',
			// 'nodeName', 'ukKnowApplys']
			// }),
			// remoteSort : true,
			// sortInfo : [{
			// field : 'sysKnowStatus',
			// direction : 'asc'
			// }, {
			// field : 'knowId',
			// direction : 'desc'
			// }]
			// }),
			// url : __ctxPath + "/know/getKnowByTypeUkSysKnow.do",
			fields : [{
						name : 'knowId',
						type : 'int'
					}, 'ukSysKnow', 'tiTle', 'busiType',
					'enableTime', 'pastTime', 'sysKnowStatus', 'viewCount',
					'sysKnowComment', 'plus1', 'plus2', 'plus3', 'plus4',
					'plus5', 'plus6', 'plus7', 'plus8', 'sysKnowVersion',
					'createBy', 'updateBy', 'createDate', 'updateDate',
					'ukKnowTemplate', 'runid', 'nodeName', 'ukKnowApplys','accessManage'],
			columns : [{
						header : __ukSysKnowKnowId,// 'knowId',
						dataIndex : 'knowId',
						hidden : true
					}, {
						header : __ukSysKnowTiTle,// '标题',
						isExp : false,
						width : 160,
						dataIndex : 'tiTle'
					}, {

						header : '访问方式',
						isExp : false,
						
						dataIndex : 'accessManage',
						renderer : function(val) {
							if (val != null) {
								return KNOW_FWGL.get(val);
							} else {
								return '';
							}
						}
					}, {
						header : '类型',// '业务分类&BUSI_TYPE',
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
						header : '采集人',// '创建人内码', __ukSysKnowCreateBy
						isExp : false,
						dataIndex : 'createBy',
						renderer : function(value) {
							if (value == null) {
								return '';
							} else {
								return value.fullname;
							}
						}

					}, {
						header : '采集时间 ',
						isExp : false,
						dataIndex : 'createDate'
					}, {
						header : __ukSysKnowSysKnowStatus,// '状态&KNOW_STATUS',
						isExp : false,
						dataIndex : 'sysKnowStatus',
						renderer : function(value) {
							if (value != null) {
								return KNOW_FLOW.get(value);
							} else {
								return '无';
							}
						}
					}, {
						header : '审批状态',// '状态&KNOW_STATUS',
						isExp : false,
						dataIndex : 'sysKnowStatus',
						renderer : function(value) {
							if (value != null) {
								return KNOW_FLOW.get(value);
							} else {
								return '无';
							}
						}
					}, new Ext.ux.grid.RowActions({
						header : __action,
						width : 100,
						actions : [{
							iconCls : 'btn-readdocument',
							qtip : '查看',
							style : 'margin:0 3px 0 3px'
						}, {
							iconCls : 'btn-edit',
							qtip : __edit,
							style : 'margin:0 3px 0 3px',
							fn : function(record) {
								var status = record.get('sysKnowStatus');
								if (status == '0' || status == '1' || status == '9') {
									return true;
								} else {
									return false;
								}
							}
						}
//						, {
//							iconCls : 'btn-operation',
//							qtip : '跟踪',
//							style : 'margin:0 3px 0 3px',
//							fn : function(record) {
//								var ukKnowApplys = record.get('ukKnowApplys');
//								if (ukKnowApplys != '') {
//									return true;
//								} else {
//									return false;
//								}
//							}
//						}
						, {
							iconCls : 'btn-del',
							qtip : '注销',
							style : 'margin:0 3px 0 3px',
							fn : function(record) {
								var status = record.get('sysKnowStatus');
								if (status == '0' || status == '1') {
									return true;
								} else {
									return false;
								}
							}
						}],
						listeners : {
							scope : this,
							'action' : this.onRowAction
						}
					})]
				// end of columns
			});
		Ext.getCmp('UkKnowCollectGrid').getSelectionModel().on(
			'selectionchange', function(sm) {
//					Ext.getCmp('newFlowBtn').setDisabled(sm.getCount() < 1);
				Ext.getCmp('dropBtn').setDisabled(sm.getCount() < 1);
				// Ext.getCmp('delBtn').setDisabled(sm.getCount() < 1);
				// Ext.getCmp('copyBtn').setDisabled(sm.getCount() < 1);
				Ext.getCmp('shareBtn').setDisabled(sm.getCount() < 1);

		});
		// this.gridPanel.getStore().setDefaultSort('keywordId', 'desc');
		this.contentPanel = new Ext.Panel({
			region : 'center',
			layout : 'border',
			items : [this.searchPanel, this.gridPanel]
		});
		 this.gridPanel.addListener('rowdblclick', this.rowClick);

	},// end of the initComponents()
	// 重置查询表单
	reset : function() {
		this.searchPanel.getForm().reset();
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
	// 按条件搜索
	onSearch : function(obj) {
		var node = Ext.getCmp('ukKnowCollectTreePanel').getSelectionModel().getSelectedNode();
		if (node != null && node != 'undefined'){
			Ext.getCmp('ukknowCollectView.typeId').setValue(node.id);
		}
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
		var node = Ext.getCmp('ukKnowCollectTreePanel').getSelectionModel().getSelectedNode();
		
		if (node == null) {
			Ext.ux.Toast.msg("操作信息", "请选择知识分类!");
			return;
		} else {
			if (node.id == 0) {
				Ext.ux.Toast.msg("操作信息", "请选择根节点下其他节点!");
				return;
			} else {
//				var knowTypeId = node.id;
//				var tabs = Ext.getCmp('centerTabPanel');
//				var edit = tabs.getItem('UkKnowCollectFormWin');
//				if (edit != null) {
//					tabs.remove('UkKnowCollectFormWin');
//					edit.destroy();
//				}
//				if (Ext.getCmp('UkSysKnowShow')!= null) {
//					tabs.remove('UkSysKnowShow');
//				}
//				edit = new UkKnowCollectForm({
//							knowTypeId : knowTypeId
//						});
//				tabs.add(edit);
//				tabs.activate(edit);
				

				var knowTypeId = node.id;
				Ext.Ajax.request({
					method : 'post',
					url : __ctxPath + '/know/getUkKnowType.do',
					params : {
						knowTypeId : knowTypeId
					},
					success : function(response, options) {
						var thisObj = Ext.util.JSON
								.decode(response.responseText).data;
						var knowTmpId = '';
						var objTmp = thisObj.ukKnowTemplate;
						var objPurview = thisObj.accessPurview;
						var objGrantAccess = thisObj.grantAccess;
						if(objGrantAccess=='1'){
							if (objTmp != null) {
								knowTmpId = objTmp.knowTmpId;
								var tabs = Ext.getCmp('centerTabPanel');
								var edit = tabs.getItem('UkKnowCollectFormWin');
								if (edit != null) {
									tabs.remove('UkKnowCollectFormWin');
									edit.destroy();
								}
								if (Ext.getCmp('UkSysKnowShow')!= null) {
									tabs.remove('UkSysKnowShow');
								}
								edit = new UkKnowCollectForm({
											knowTmpId : knowTmpId,
											knowTypeId : knowTypeId
										});
								tabs.add(edit);
								tabs.activate(edit);
							} else {
								new KnowTmpForm({
											knowTypeId : knowTypeId
										}).show();
							}
						}else{
							if(objPurview=='1'){
								if (objTmp != null) {
									knowTmpId = objTmp.knowTmpId;
									var tabs = Ext.getCmp('centerTabPanel');
									var edit = tabs.getItem('UkKnowCollectFormWin');
									if (edit != null) {
										tabs.remove('UkKnowCollectFormWin');
										edit.destroy();
									}
									if (Ext.getCmp('UkSysKnowShow')!= null) {
										tabs.remove('UkSysKnowShow');
									}
									edit = new UkKnowCollectForm({
												knowTmpId : knowTmpId,
												knowTypeId : knowTypeId
											});
									tabs.add(edit);
									tabs.activate(edit);
								} else {
									new KnowTmpForm({
												knowTypeId : knowTypeId
											}).show();
								}
							}else{
								Ext.ux.Toast.msg('操作信息', '对不起,您没有权限进行该操作!');
							}
						}
					},
					failure : function(request) {
						Ext.ux.Toast.msg('操作信息', '设置出错，请联系管理员!');
					}
				});
			}
		}
	},
	// 按ID删除记录
	removeRs : function(id) {
//		$postDel({
//			url : __ctxPath + '/know/multiDelRsUkSysKnow.do',
//			ids : id,
//			grid : this.gridPanel
//		});
		var ids = '';
		var grid = Ext.getCmp('UkKnowCollectGrid');

		var rows = grid.getSelectionModel().getSelections();
		for (var i = 0; i < rows.length; i++) {
			if (i > 0) {
				ids += ',';
			}
			ids += rows[i].data.knowId;
		}
		UkKnowCollectView.remove(ids);
	},
	removeToDusbin : function() {
		var grid = Ext.getCmp('UkKnowCollectGrid');
		var rows = grid.getSelectionModel().getSelections();
		var mygridpanel = 'UkKnowCollectGrid';
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
	},
	// 把选中ID删除
	removeSelRs : function() {
		var selStore = Ext.getCmp('UkKnowCollectGrid').getSelectionModel().getSelections();
		var statusFlag = true;
		for (var i = 0; i < selStore.length; i++) {
			var status = selStore[i].data.sysKnowStatus;
			if (status != '0' && status != '1') {
				statusFlag = false;

			}
		}
		if (statusFlag) {
			$delGridRs({
				url : __ctxPath + '/know/multiDelUkSysKnow.do',
				grid : this.gridPanel,
				idName : 'knowId'
			});
		} else {
			Ext.ux.Toast.msg("操作信息", "对不起,你只能删除采集中和已采集状态的知识!");
			return;
		}

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
	// 审核跟踪
	trackRs : function(record) {
		ukKnowApply = record.data.ukKnowApplys[0];
		var applyId = '';
		var runid = '';
		if (ukKnowApply != 'undefined') {
			applyId = ukKnowApply.applyId;
			runid = ukKnowApply.runid;
		}
		var tabs = Ext.getCmp('centerTabPanel');
		var edit = tabs.getItem('UkKnowApply');

		if (edit != null) {
			tabs.remove('UkKnowApply');
		}
		edit = new UkKnowApplyFlowForm({
			id : applyId,
			runId : runid,
			piId : record.data.piId
		});
		tabs.add(edit);
		tabs.activate(edit);
	},
	// 行的Action

	onRowAction : function(grid, record, action, row, col) {
		switch (action) {
			case 'btn-readdocument' :
				this.showRs.call(this, record);
				break;
			case 'btn-del' :
				this.removeRs.call(this, record.data.knowId);
				break;
			case 'btn-edit' :
				this.editRs.call(this, record);
				break;
			case 'btn-operation' :
				this.trackRs.call(this, record);
			default :
				break;
		}
	}
});
/**
 * 节点单击事件
 * 
 * @param node
 */
UkKnowCollectView.clickNode = function(node) {
//	var searchPanel = Ext.getCmp('UkKnowCollectSearchPanel');
//	searchPanel.getForm().reset();
	UkKnowCollectView.select(node);
};

/**
 * 条件查询
 * 
 * @param node
 */
UkKnowCollectView.select = function(node) {
//	var searchPanel = Ext.getCmp('UkKnowCollectSearchPanel');
//	searchPanel.getForm().reset();
	Ext.getCmp('ukknowCollectView.typeId').setValue(node.id);
	var grid = Ext.getCmp('UkKnowCollectGrid');
	// grid.setTitle('知识列表');
	var store = grid.getStore();
	// store.proxy.conn.url = __ctxPath + '/know/getKnowByTypeUkSysKnow.do';
	var title = Ext.getCmp('ukknowCollectView.title').getValue()
	var ukKnowKeyWord = Ext.getCmp('ukknowCollectView.ukKnowKeyWord').getValue()
	var status = Ext.getCmp('ukknowCollectView.status').getValue()
	var paramObj = {
		start : 0,
		limit : 25
	};
	if(node.id==-1){
		Ext.ux.Toast.msg(__actioninfo, '没有可用的知识分类,请向知识分类管理员申请授权!');
	}else{
	if (node != null && node.id > 0) {
		paramObj["typeId"] = node.id;
		paramObj["NEQStatus"] = '1,6,7,8';
		paramObj["isPermission"] = 'false';
		paramObj["checkTypeRole"] = 'false';
		paramObj["title"] = title;
		paramObj["ukKnowKeyWord"] = ukKnowKeyWord;
		paramObj["status"] = status;
	}
	store.reload({
		params : paramObj
	});
	}
	// store.setDefaultSort('knowId', 'desc');
	// stores = store;
	// store.reload({
	// params : paramObj,
	// callback : function() {
	// this.proxy.conn.url = __ctxPath + '/know/getKnowByTypeUkSysKnow.do';
	// this.multiSort([{
	// field : 'sysKnowStatus',
	// direction : 'DESC'
	// }, {
	// field : 'knowId',
	// direction : 'DESC'
	// }], 'DESC');
	// }
	// });

	// store.setDefaultSort('knowId', 'desc');

};
UkKnowCollectView.copyFormPanel = function(_id, actionModel) {
	var treePanel = new Ext.tree.TreePanel({
		// id:'',
		title : '请选择目标分类',
		loader : new Ext.tree.TreeLoader({
					url : __ctxPath + '/know/listUkKnowType.do'
				}),
		root : new Ext.tree.AsyncTreeNode({
					expanded : true
				}),
		autoScroll : true,
		rootVisible : false,
		listeners : {
			'click' : function(node) {
				if (node != null && node.id != 0) {
					var ids = '';
					var grid = Ext.getCmp('UkKnowCollectGrid');

					var rows = grid.getSelectionModel().getSelections();
					for (var i = 0; i < rows.length; i++) {
						if (i > 0) {
							ids += ',';
						}
						ids += rows[i].data.knowId;
					}
					Ext.getCmp('boxIds').setValue(ids);
					Ext.getCmp('dispalyFolderName').setValue(node.text);
					Ext.getCmp('folderId').setValue(node.id);
				}
			}
		}
	})
	var formPanel = new Ext.FormPanel({
		url : __ctxPath + '/know/copyToUkSysKnow.do',
		layout : 'table',
		id : 'copyFolderForm',
		frame : true,
		defaultType : 'textfield',

		layoutConfig : {
			columns : 1
		},
		defaults : {
			width : 296
		},
		baseParams : {
			newknowTypeId : _id,
			actionMode : actionModel
		},
		items : [{
				xtype : 'label',
				text : '复制至:'
			}, {
				id : 'dispalyFolderName',
				readOnly : true
			}, {
				xtype : 'hidden',
				id : 'folderId',
				name : 'folderId'
			}, {
				id : 'boxIds',
				name : 'boxIds',
				xtype : 'hidden',
				value : 2
			}, {
				xtype : 'panel',
				items : [treePanel]
			}]
	});
	return formPanel;
}
UkKnowCollectView.moveFormPanel = function(_id, actionModel) {
	var treePanel = new Ext.tree.TreePanel({
		// id:'',
		title : '请选择目标分类',
		loader : new Ext.tree.TreeLoader({
					url : __ctxPath + '/know/listUkKnowType.do'
				}),
		root : new Ext.tree.AsyncTreeNode({
					expanded : true
				}),
		autoScroll : true,
		rootVisible : false,
		listeners : {
			'click' : function(node) {
				if (node != null && node.id != 0) {
					var ids = '';
					var grid = Ext.getCmp('UkKnowCollectGrid');

					var rows = grid.getSelectionModel().getSelections();
					for (var i = 0; i < rows.length; i++) {
						if (i > 0) {
							ids += ',';
						}
						ids += rows[i].data.knowId;
					}
					Ext.getCmp('boxIds').setValue(ids);
					Ext.getCmp('dispalyFolderName').setValue(node.text);
					Ext.getCmp('folderId').setValue(node.id);
				}
			}
		}
	})
	var formPanel = new Ext.FormPanel({
				url : __ctxPath + '/know/moveToUkSysKnow.do',
				layout : 'table',
				id : 'copyFolderForm',
				frame : true,
				defaultType : 'textfield',

				layoutConfig : {
					columns : 1
				},
				defaults : {
					width : 296
				},
				baseParams : {
					newknowTypeId : _id,
					actionMode : actionModel
				},
				items : [{
							xtype : 'label',
							text : '转移至:'
						}, {
							id : 'dispalyFolderName',
							readOnly : true
						}, {
							xtype : 'hidden',
							id : 'folderId',
							name : 'folderId'
						}, {
							id : 'boxIds',
							name : 'boxIds',
							xtype : 'hidden',
							value : 2
						}, {
							xtype : 'panel',
							items : [treePanel]
						}]
			});
	return formPanel;
}
UkKnowCollectView.shareFormPanel = function(_id, actionModel) {
	var text_share = "";// 集合的名字
	var id_share = "";// 集合的id
	var treePanel = new Ext.tree.TreePanel({
				// id:'',
				title : '请选择共享分类',
				loader : new Ext.tree.TreeLoader({
							url : __ctxPath + '/know/listUkKnowType.do'
						}),
				root : new Ext.tree.AsyncTreeNode({
							expanded : true
						}),
				height : 180,
				autoScroll : true,
				rootVisible : false,
				listeners : {
					'click' : function(node) {
						if (node != null && node.id != 0) {
							if (text_share == '') {
								text_share += node.text;
								id_share += node.id;
							} else {
								if (text_share.indexOf(node.text) == -1) {
									text_share += "," + node.text;
									id_share += "," + node.id;
								} else {

								}

							}
							var ids = '';
							var grid = Ext.getCmp('UkKnowCollectGrid');

							var rows = grid.getSelectionModel().getSelections();
							for (var i = 0; i < rows.length; i++) {
								if (i > 0) {
									ids += ',';
								}
								ids += rows[i].data.knowId;
							}
							Ext.getCmp('dispalyFolderName')
									.setValue(text_share);
							Ext.getCmp('folderId').setValue(id_share);
							Ext.getCmp('boxIds').setValue(ids);
						}
					}
				}
			})
	var formPanel = new Ext.FormPanel({
				url : __ctxPath + '/know/shareToUkSysKnow.do',
				layout : 'table',
				id : 'shareFolderForm',
				frame : true,
				defaultType : 'textfield',
				layoutConfig : {
					columns : 1
				},
				defaults : {
					width : 296
				},
				baseParams : {
					newknowTypeId : _id,
					actionMode : actionModel
				},
				items : [{
							xtype : 'label',
							text : '共享到:'
						}, {
							id : 'dispalyFolderName',
							readOnly : true
						}, {
							xtype : 'hidden',
							id : 'folderId',
							name : 'folderId'
						}, {
							id : 'boxIds',
							name : 'boxIds',
							xtype : 'hidden',
							value : 2
						}, {
							xtype : 'panel',
							items : [treePanel]
						}]
			});
	return formPanel;
}
//元林写的复制方式
//UkKnowCollectView.copyto = function() {
//	var grid = Ext.getCmp('UkKnowCollectGrid');
//	var rows = grid.getSelectionModel().getSelections();
//
//	var ids = '';
//
//	if (rows != null && rows.length >= 1) {
//		for (var i = 0; i < rows.length; i++)
//			ids += rows[i].data.knowTypeId + ",";
//		var _moveFormPanel = new UkKnowCollectView.moveFormPanel(ids, 1);
//	} else {
//		Ext.ux.Toast.msg(__actioninfo, '请选择复制的数据！');
//	}
//
//	var selectFolder = new Ext.Window({
//		width : 340,
//		height : 300,
//		title : '复制知识',
//		iconCls : 'assets-type',
//		modal : true,
//		buttonAlign : 'center',
//		plain : true,
//		layout : 'fit',
//		border : false,
//		bodyStyle : 'padding:5px;',
//		items : [_moveFormPanel],
//		buttons : [{
//			text : '确定复制',
//			iconCls : 'assets-type',
//			handler : function() {
//				var folderId = Ext.getCmp('folderId').value;
//				if (folderId == '' || folderId == null
//						|| folderId == 'undefined') {
//					Ext.ux.Toast.msg('操作信息', '请先选择目录');
//				} else {
//					var copyFolderForm = Ext.getCmp("copyFolderForm");
//					copyFolderForm.getForm().submit({
//						waitMsg : '正在提交用户信息',
//						success : function(copyFolderForm, o) {
//							// 成功之后关闭窗口,显示邮件列表Panel,reload()
//							Ext.ux.Toast.msg('操作信息', '移动成功！');
//							selectFolder.close();
//							Ext.getCmp('ukKnowCollectTreePanel').root.reload();
//							Ext.getCmp('UkKnowCollectGrid').getStore().reload();
//						},
//						failure : function(copyFolderForm, o) {
//							// 移动失败后提示失败原因
//							Ext.ux.Toast.msg('提示信息', o.result.msg);
//						}
//					});
//				}
//			}
//		}, {
//			text : '取消',
//			iconCls : 'btn-del',
//			handler : function() {
//				selectFolder.close();
//			}
//		}]
//	})
//	selectFolder.show();
//
//};
UkKnowCollectView.shareto = function() {
	var grid = Ext.getCmp('UkKnowCollectGrid');
	var rows = grid.getSelectionModel().getSelections();

	var ids = '';

	if (rows != null && rows.length >= 1) {
		for (var i = 0; i < rows.length; i++)
			ids += rows[i].data.knowTypeId + ",";
		var _moveFormPanel = new UkKnowCollectView.shareFormPanel(ids, 1);
	} else {
		Ext.ux.Toast.msg(__actioninfo, '请选择共享的数据！');
	}

	var selectFolder = new Ext.Window({
		width : 340,
		height : 300,
		title : '共享知识',
		iconCls : 'assets-type',
		modal : true,
		buttonAlign : 'center',
		plain : true,
		layout : 'fit',
		border : false,
		bodyStyle : 'padding:5px;',
		items : [_moveFormPanel],
		buttons : [{
			text : '确定共享',
			iconCls : 'assets-type',
			handler : function() {
				var folderId = Ext.getCmp('folderId').value;
				if (folderId == '' || folderId == null
						|| folderId == 'undefined') {
					Ext.ux.Toast.msg('操作信息', '请先选择目录');
				} else {
					var moveFolderForm = Ext.getCmp("shareFolderForm");
					moveFolderForm.getForm().submit({
						waitMsg : '正在提交用户信息',
						success : function(moveFolderForm, o) {
							// 成功之后关闭窗口,显示邮件列表Panel,reload()
							Ext.ux.Toast.msg('操作信息', '共享成功！');
							selectFolder.close();
							Ext.getCmp('ukKnowCollectTreePanel').root.reload();
							Ext.getCmp('UkKnowCollectGrid').getStore().reload();
						},
						failure : function(moveFolderForm, o) {
							// 移动失败后提示失败原因
							Ext.ux.Toast.msg('提示信息', o.result.msg);
						}
					});
				}
			}
		}, {
			text : '取消',
			iconCls : 'btn-del',
			handler : function() {
				selectFolder.close();
			}
		}]
	})
	selectFolder.show();

};
UkKnowCollectView.copyto = function() {
	var grid = Ext.getCmp('UkKnowCollectGrid');
	var rows = grid.getSelectionModel().getSelections();

	var ids = '';

	if (rows != null && rows.length >= 1) {
		for (var i = 0; i < rows.length; i++)
			ids += rows[i].data.knowTypeId + ",";
		var _moveFormPanel = new UkKnowCollectView.copyFormPanel(ids, 1);
	} else {
		Ext.ux.Toast.msg(__actioninfo, '请选择复制的数据！');
	}

	var selectFolder = new Ext.Window({
		width : 340,
		height : 300,
		title : '复制知识',
		iconCls : 'assets-type',
		modal : true,
		buttonAlign : 'center',
		plain : true,
		layout : 'fit',
		border : false,
		bodyStyle : 'padding:5px;',
		items : [_moveFormPanel],
		buttons : [{
			text : '确定复制',
			iconCls : 'assets-type',
			handler : function() {
				var folderId = Ext.getCmp('folderId').value;
				if (folderId == '' || folderId == null
						|| folderId == 'undefined') {
					Ext.ux.Toast.msg('操作信息', '请先选择目录');
				} else {
					var copyFolderForm = Ext.getCmp("copyFolderForm");
					copyFolderForm.getForm().submit({
						waitMsg : '正在提交用户信息',
						success : function(copyFolderForm, o) {
							// 成功之后关闭窗口,显示邮件列表Panel,reload()
							Ext.ux.Toast.msg('操作信息', '复制成功！');
							selectFolder.close();
							Ext.getCmp('ukKnowCollectTreePanel').root.reload();
							Ext.getCmp('UkKnowCollectGrid').getStore().reload();
						},
						failure : function(copyFolderForm, o) {
							// 移动失败后提示失败原因
							Ext.ux.Toast.msg('提示信息', '复制失败！');
						}
					});
				}
			}
		}, {
			text : '取消',
			iconCls : 'btn-del',
			handler : function() {
				selectFolder.close();
			}
		}]
	})
	selectFolder.show();

};
// gst 2012.10.19号添加转移功能
UkKnowCollectView.moveto = function() {
	var grid = Ext.getCmp('UkKnowCollectGrid');
	var rows = grid.getSelectionModel().getSelections();

	var ids = '';

	if (rows != null && rows.length >= 1) {
		for (var i = 0; i < rows.length; i++)
			ids += rows[i].data.knowTypeId + ",";
		var _moveFormPanel = new UkKnowCollectView.moveFormPanel(ids, 1);
	} else {
		Ext.ux.Toast.msg(__actioninfo, '请选择转移的数据！');
	}

	var selectFolder = new Ext.Window({
		width : 340,
		height : 300,
		title : '转移知识',
		iconCls : 'assets-type',
		modal : true,
		buttonAlign : 'center',
		plain : true,
		layout : 'fit',
		border : false,
		bodyStyle : 'padding:5px;',
		items : [_moveFormPanel],
		buttons : [{
			text : '确定转移',
			iconCls : 'assets-type',
			handler : function() {
				var folderId = Ext.getCmp('folderId').value;
				if (folderId == '' || folderId == null
						|| folderId == 'undefined') {
					Ext.ux.Toast.msg('操作信息', '请先选择目录');
				} else {
					var copyFolderForm = Ext.getCmp("copyFolderForm");
					copyFolderForm.getForm().submit({
						waitMsg : '正在提交用户信息',
						success : function(copyFolderForm, o) {
							// 成功之后关闭窗口,显示邮件列表Panel,reload()
							Ext.ux.Toast.msg('操作信息', '转移成功！');
							selectFolder.close();
							Ext.getCmp('ukKnowCollectTreePanel').root.reload();
							Ext.getCmp('UkKnowCollectGrid').getStore().reload();
						},
						failure : function(copyFolderForm, o) {
							// 移动失败后提示失败原因
							Ext.ux.Toast.msg('提示信息', '转移失败！');
						}
					});
				}
			}
		}, {
			text : '取消',
			iconCls : 'btn-del',
			handler : function() {
				selectFolder.close();
			}
		}]
	})
	selectFolder.show();
};
UkKnowCollectView.remove = function(_ids) {
	Ext.Msg.confirm('注销操作', '你确定要注销该知识吗?', function(btn) {
		if (btn == 'yes') {
			Ext.Ajax.request({
				url : __ctxPath + '/know/multiZhuXiaoUkSysKnow.do',
				method : 'post',
				params : {
					ids : _ids
				},
				success : function(response) {
					Ext.ux.Toast.msg("操作信息", "注销成功");
					Ext.getCmp('UkKnowCollectGrid').getStore().reload();
					Ext.getCmp('ukKnowCollectTreePanel').root.reload();
				},
				failure : function() {
					Ext.ux.Toast.msg("操作信息", "注销失败");
				}
			});
		}
	});
};