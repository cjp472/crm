Ext.ns('UlDepartmentView');

var UlDepartmentView = function() {
	return this.setup();
};

UlDepartmentView.prototype.setup = function() {
	var selected;
	var store = this.initData();
	var sm = new Ext.grid.CheckboxSelectionModel();
	var cm = new Ext.grid.ColumnModel({
		columns : [new Ext.grid.RowNumberer(), sm, {
					header : "depid",
					dataIndex : 'depid',
					hidden : true
				}, {
					header : "机构名称",
					sortable : true,
					dataIndex : 'depname',
					width : 200
				}, {
					header : "机构类型",
					sortable : true,
					dataIndex : 'type',
					width : 60,
					renderer : function(value) {
						return ZZJGLX0001.get(value);
					}
				}, {
					header : "经营业务",
					sortable : true,
					dataIndex : 'jingyingyewu',
					width : 60,
					renderer : function(value) {
						return CONKHHY.get(value);
					}
				}, {
					header : "业务说明",
					sortable : true,
					dataIndex : 'yewushuoming',
					width : 60
				}, {
					header : "上级机构",
					sortable : true,
					dataIndex : 'parentName',
					width : 60
				}, {
					header : "状态",
					sortable : true,
					dataIndex : 'status',
					width : 60,
					renderer : function(value) {
						return ZZJGZT0001.get(value);
					}
				}, {
					header : '管理',
					dataIndex : 'depid',
					sortable : true,
					width : 45,
					renderer : function(depid, metadata, record, rowIndex,
							colIndex, store) {
						if (depid) {
							var str = '';
							
							if (isGranted('_DepartmentEdit')) {
								str += '&nbsp;<button title="明细" value=" " class="btn-edit" onclick="UlDepartmentView.edit('
										+ depid + ')"></button>';
							} else {
								str += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
							}

                            str += '&nbsp;<button title="启用" value=" " class="btn-setting" onclick="UlDepartmentView.action('
                                + depid + ',\'enable\')"></button>&nbsp;';
                            
							if (isGranted('_DepartmentDel')) {
								str += '<button title="注销" value=" " class="btn-del" onclick="UlDepartmentView.action('
										+ depid	+ ',\'del\')"></button>';
							} else {
								str += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
							}
							
							return str;
						}
					}
				}],
		defaults : {
			sortable : true,
			menuDisabled : true,
			width : 100
		},
		listeners : {
			hiddenchange : function(cm, colIndex, hidden) {
				saveConfig(colIndex, hidden);
			}
		}
	});
    
	var grid = new Ext.grid.GridPanel({
		region : 'center',
		id : 'UlDepView',
		tbar : new Ext.Toolbar({
					defaultType : 'button',
					items : ['->',{
						text : '注销',
						iconCls : 'btn-del',
						handler : function() {
							UlDepartmentView.multiAction('del');
						}
					},'->',{
						text : '启用',
						iconCls : 'btn-setting',
						handler : function() {
							UlDepartmentView.multiAction('enable');
						}
					},'->',{
						text : '添加',
						iconCls : 'btn-add',
						handler : function() {
							var node = Ext.getCmp('uldepartmentTreePanel').
								getSelectionModel().getSelectedNode();
							if(node == null){
                                Ext.ux.Toast.msg('操作信息', '请在左侧选择一个上级部门!');
                                //UlDepartmentView.add(0);
							}else{
								UlDepartmentView.add(node.id);
							}	
						}
					}]
				}),
		height : 800,
		title : '子组织机构列表',
		store : store,
		shim : true,
		trackMouseOver : true,
		disableSelection : false,
		loadMask : true,
		cm : cm,
		sm : sm,
		viewConfig : {
			forceFit : true,
			enableRowBody : false,
			showPreview : false
		},
		// paging bar on the bottom
		bbar : new HT.PagingBar({
					store : store
				})
	}); // end of this grid
	//双击编辑该行
//	grid.addListener('rowdblclick', rowdblclickFn);
	function rowdblclickFn(grid, rowindex, e) {
		grid.getSelectionModel().each(function(rec) {
			UlDepartmentView.edit(rec.data.depid);
		});
	}
	store.load({
				params : {
					start : 0,
					limit : 25
				}
			});

	var treePanel = new Ext.tree.TreePanel({
		region : 'west',
		id : 'uldepartmentTreePanel',
		title : '组织机构列表',
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
							treePanel.root.reload();
						}
					}, '-', {
						xtype : 'button',
						text : '展开',
						iconCls : 'btn-expand',
						handler : function() {
							treePanel.expandAll();
						}
					}, '-', {
						xtype : 'button',
						text : '收起',
						iconCls : 'btn-collapse',
						handler : function() {
							treePanel.collapseAll();
						}
					}]
		}),
		loader : new Ext.tree.TreeLoader({
					url : __ctxPath + '/xitong/listUlDepartment.do'
				}),
		root : new Ext.tree.AsyncTreeNode({
					expanded : true
				}),
		rootVisible : false,
		listeners : {
			'click' : UlDepartmentView.clickNode
		}
	}); // end of this treePanel

	if (isGranted('_DepartmentAdd') || isGranted('_DepartmentEdit')
			|| isGranted('_DepartmentDel')) {
		// 树的右键菜单
//		treePanel.on('contextmenu', contextmenu, treePanel);
	}

	function contextmenu(node, e) {
		selected = new Ext.tree.TreeNode({
					id : node.id,
					text : node.text
				});
		// 创建右键菜单
		var treeMenu = new Ext.menu.Menu({
					// id : 'DepartmentTreeMenu',
					items : []
				});
		treeMenu.clearMons();
		if (isGranted('_DepartmentAdd')) {
			treeMenu.add({
						text : '新建机构',
						iconCls : 'btn-add',
						scope : this,
						handler : createNode
					});
		}
		if (isGranted('_DepartmentEdit')) {
			treeMenu.add({
						text : '修改机构信息',
						iconCls : 'btn-edit',
						scope : this,
						handler : editNode
					});
		}
		if (isGranted('_DepartmentDel')) {
			treeMenu.add({
						text : '注销机构',
						iconCls : 'btn-delete',
						scope : this,
						handler : deteleNode
					});

		}

		treeMenu.showAt(e.getXY());
	}
	/**
	 * 菜单事件
	 */
	function createNode() {
		var nodeId = selected.id;
		UlDepartmentView.add(nodeId);
	}
	function deteleNode() {
		var depId = selected.id;
		if (depId > 0) {
			UlDepartmentView.action(depId, 'del');
		} else {
			Ext.ux.Toast.msg('警告', "总公司不能被注销");
		}
	}
	function editNode() {
		var depId = selected.id;
		if (depId > 0) {
			UlDepartmentView.edit(depId);
		} else {
			Ext.ux.Toast.msg('警告', "总公司不能修改！");
		}

	}

	var panel = new Ext.Panel({
		id : 'UlDepartmentView',
		title : '组织机构',
		closable : true,
		iconCls : 'menu-department',
		layout : 'border',
		items : [treePanel, grid],//searchPanel
		keys : [{
					key : Ext.EventObject.ESC,
					fn : UlDepartmentView.reset,
					scope : this
				}, {
					key : Ext.EventObject.ENTER,
					fn : UlDepartmentView.search,
					scope : this
				}]
	});
	return panel;
};

/**
 * Store对象
 */
UlDepartmentView.prototype.initData = function() {
	var store = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
					url : __ctxPath + '/xitong/list_childDepUlDepartment.do'
				}),
		reader : new Ext.data.JsonReader({
					root : 'result',
					totalProperty : 'totalCounts',
					fields : ['depid','depname','type',
						'jingyingyewu','yewushuoming','parentid','status','parentName'
						]
				}),
		remoteSort : true
	});
	//store.setDefaultSort('id', 'desc');
	return store;
};

UlDepartmentView.add = function(depId) {
	new UlDepartmentForm({//引用UlDepartmentForm.js line9 声明的变量名
		nodeId : depId,
		title : '添加组织机构'
	}).show();
//  Ext.getCmp('uldepartmentTreePanel').root.reload();
//	Ext.getCmp('UlDepView').getStore().reload();
};

UlDepartmentView.adrList;

UlDepartmentView.edit = function(depId) {
	var departmentForm = Ext.getCmp('uldepartmentForm');
	
	Ext.Ajax.request({
		url : __ctxPath + '/xitong/getUlDepartment.do',
		params : {
			depId : depId
		},
		method : 'post',
		success : function(response) {
			var result = Ext.util.JSON.decode(response.responseText);
			UlDepartmentView.adrList = [0, result.data.sheng, result.data.shi];
//                alert(UlDepartmentView.adrList);
			if (departmentForm == null) {//如果框不存在，则生成一个，然后获取它
				new UlDepartmentForm({
					depid : depId,
					adrList : UlDepartmentView.adrList,
					sheng : result.data.sheng,
					shi : result.data.shi,
					qu : result.data.qu,
					title : '组织机构详细信息'
				}).show();
				departmentForm = Ext.getCmp('uldepartmentForm');
			}
			departmentForm.form.load({
				url : __ctxPath + '/xitong/detailUlDepartment.do',
				params : {
					depId : depId
				},
				method : 'post',
				deferredRender : true,
				layoutOnTabChange : true,
				failure : function() {
					Ext.ux.Toast.msg('编辑', '载入失败');
				}
			});
		}
	});
};

UlDepartmentView.multiAction = function(action) {
	var grid = Ext.getCmp('UlDepView');
	var rows = grid.getSelectionModel().getSelections();
	if (rows != null && rows.length > 0) {
		var ids = new Array();
		for (var i = 0; i < rows.length; i++)
			ids.push(rows[i].data.depid);
		UlDepartmentView.action_ids(ids, action);
	} else
		Ext.ux.Toast.msg('操作提示', '对不起，请选择你要操作的数据！');
};

UlDepartmentView.action_ids = function(_ids, action) {
	var actionText = '启用';
	var actionUrl = '/xitong/multiEnableUlDepartment.do';
	if(action == 'del'){
		actionText = '注销';
		actionUrl = '/xitong/multiDelUlDepartment.do';
	}
	Ext.Msg.confirm(actionText+'操作', '你确定要'+actionText+'该机构吗?', function(btn) {
		if (btn == 'yes') {
			Ext.Ajax.request({
				url : __ctxPath + actionUrl,
				method : 'post',
				params : {
					ids : _ids
				},
				success : function(response) {
					Ext.ux.Toast.msg("操作信息", "机构"+actionText+"成功");
					Ext.getCmp('UlDepView').getStore().reload();
					Ext.getCmp('uldepartmentTreePanel').root.reload();
				},
				failure : function() {
					Ext.ux.Toast.msg("操作信息", "机构"+actionText+"失败");
				}
			});
		}
	});
};

/**
 * 注销组织机构
 */
UlDepartmentView.action = function(depId, action) {
//	alert(action)
	var actionText = '启用';
	var actionUrl = '/xitong/enableUlDepartment.do';
	if(action == 'del'){
		actionText = '注销';
		actionUrl = '/xitong/delUlDepartment.do';
	}
	Ext.Msg.confirm(''+actionText+'操作', '你确定'+actionText+'机构?', function(btn) {
		if (btn == 'yes') {
			Ext.Ajax.request({
				url : __ctxPath + actionUrl +'?depId='
					+ depId,
				success : function(result, request) {
					var res = Ext.util.JSON.decode(result.responseText);
					if (res.success == false) {
						Ext.ux.Toast.msg('操作信息', res.message);
					} else {
						Ext.ux.Toast.msg('操作信息', actionText+'成功!');
					}
					Ext.getCmp('uldepartmentTreePanel').root.reload();
					Ext.getCmp('UlDepView').getStore().reload();
				}
			});
		}
	});
};

/**
 * 节点单击事件
 * 
 * @param node
 */
UlDepartmentView.clickNode = function(node) {
	UlDepartmentView.select(node);
};

/**
 * 条件查询
 * 
 * @param node
 */
UlDepartmentView.select = function(node) {
	var users = Ext.getCmp('UlDepView');
	users.setTitle(node.text + '--子机构列表');
	var store = users.getStore();
	store.url = __ctxPath + '/xitong/list_childDepUlDepartment.do';
//	store.baseParams['limit'] = 25;
    var toolBar = users.getBottomToolbar();
    var limit = toolBar.pageSize;
    var paramObj = {
		start : 0,
		limit : limit
	};
	if (node != null && node.id > 0) {
		paramObj["depId"] = node.id;
	}
	store.reload({
				params : paramObj
	});
//    toolBar.pageSize = 30;可以修改到limit的值，但是下拉框的值，没有改变
    users.getBottomToolbar().doLayout();
};