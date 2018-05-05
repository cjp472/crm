Ext.ns('ScProductClassifyView');

var ScProductClassifyView = function() {
	return this.setup();
};

ScProductClassifyView.prototype.setup = function() {
	var selected;
	var store = this.initData();
	var sm = new Ext.grid.CheckboxSelectionModel();
	var cm = new Ext.grid.ColumnModel({
		columns : [new Ext.grid.RowNumberer(), sm, {
					header : 'productClassifyId',
					dataIndex : 'productClassifyId',
					hidden : true
				},{
					header : "分类名称",
					sortable : true,
					dataIndex : 'productClassifyName',
					width : 100
				}, {
					header : "分类拼音",
					sortable : true,
					dataIndex : 'productClassifyPinyin',
					width : 60
				}, {
					header : "分类代码",
					sortable : true,
					dataIndex : 'productClassifyDispCode',
					width : 60
				}, {
					header : "分类描述",
					sortable : true,
					dataIndex : 'productClassifyRemarks',
					width : 60
				}, {
					header : "型号标识",
					sortable : true,
					dataIndex : 'productModelFlag',
					width : 60
					/*renderer : function(value) {
							return CON_T_PMODEL_FLAG.get(value);
						}*/
				}, {
					header : "状态",
					sortable : true,
					dataIndex : 'status',
					width : 60,
					renderer : function(value) {
						return SC_CPZT.get(value);
					}
				}, {
					header : '管理',
					dataIndex : 'productClassifyId',
					sortable : true,
					width : 100,
					renderer : function(productClassifyId, metadata, record, rowIndex,
							colIndex, store) {
						if (productClassifyId) {
							var str = '';
							str += '&nbsp;<button title="启用" value=" " class="btn-setting" onclick="ScProductClassifyView.action('
								+ productClassifyId + ',\'enable\')"></button>';
							if (isGranted('_ScProductClassifyEdit')) {
								str += '&nbsp;<button title="编辑" value=" " class="btn-edit" onclick="ScProductClassifyView.edit('
										+ productClassifyId + ')"></button>';
							} else {
								str += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
							}

							if (isGranted('_ScProductClassifyDel')) {
								str += '<button title="删除" value=" " class="btn-del" onclick="ScProductClassifyView.action('
										+ productClassifyId	+ ',\'del\')"></button>';
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
				id : 'SCProView',
				tbar : new Ext.Toolbar({
							defaultType : 'button',
							items : ['->',{
								text : '删除',
								iconCls : 'btn-del',
								handler : function() {
									ScProductClassifyView.multiAction('del');
								}
							},'->',{
								text : '启用',
								iconCls : 'btn-setting',
								handler : function() {
									ScProductClassifyView.multiAction('enable');
								}
							},'->',{
								text : '添加',
								iconCls : 'add-user',
								handler : function() {
									var node = Ext.getCmp('scProductClassifyTreePanel').
										getSelectionModel().getSelectedNode();
									if(node == null){
										ScProductClassifyView.add(0);
									}else{
										ScProductClassifyView.add(node.id);
									}	
								}
							}]
						}),
				height : 800,
				title : '商品分类列表',
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
	grid.addListener('rowdblclick', rowdblclickFn);
	function rowdblclickFn(grid, rowindex, e) {
		grid.getSelectionModel().each(function(rec) {
			ScProductClassifyView.edit(rec.data.productClassifyId);
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
				id : 'scProductClassifyTreePanel',
				title : '商品分类管理',
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
							url: __ctxPath + '/supply/listScProductClassify.do'
						}),
				root : new Ext.tree.AsyncTreeNode({
							expanded : true
						}),
				rootVisible : false,
				listeners : {
					'click' : ScProductClassifyView.clickNode
				}
			}); // end of this treePanel

	if (isGranted('_ScProductClassifyAdd') || isGranted('_ScProductClassifyEdit')
			|| isGranted('_ScProductClassifyDel')) {
		// 树的右键菜单
		treePanel.on('contextmenu', contextmenu, treePanel);
	}

	function contextmenu(node, e) {
		selected = new Ext.tree.TreeNode({
					id : node.id,
					text : node.text
				});
		// 创建右键菜单
		var treeMenu = new Ext.menu.Menu({
					// id : 'ScProductClassifyTreeMenu',
					items : []
				});
		treeMenu.clearMons();
		if (isGranted('_ScProductClassifyAdd')) {
			treeMenu.add({
						text : '新建分类',
						iconCls : 'btn-add',
						scope : this,
						handler : createNode
					});
		}
		if (isGranted('_ScProductClassifyEdit')) {
			treeMenu.add({
						text : '修改分类',
						iconCls : 'btn-edit',
						scope : this,
						handler : editNode
					});
		}
		if (isGranted('_ScProductClassifyDel')) {
			treeMenu.add({
						text : '删除产品分类',
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
		ScProductClassifyView.add(nodeId);
	}
	function deteleNode() {
		var productClassifyId = selected.id;
		if (productClassifyId > 0) {
			ScProductClassifyView.action(productClassifyId, 'del');
		} else {
			Ext.ux.Toast.msg('警告', "根节点不能被删除");
		}
	}
	function editNode() {
		var productClassifyId = selected.id;
		if (productClassifyId > 0) {
			ScProductClassifyView.edit(productClassifyId);
		} else {
			Ext.ux.Toast.msg('警告', "根节点不能修改！");
		}
	}

	var panel = new Ext.Panel({
				id : 'ScProductClassifyView',
				title : '商品分类管理',
				closable : true,
				iconCls : 'menu-ScProductClassify',
				layout : 'border',
				items : [treePanel, grid],//searchPanel
				keys : [{
							key : Ext.EventObject.ESC,
							fn : ScProductClassifyView.reset,
							scope : this
						}, {
							key : Ext.EventObject.ENTER,
							fn : ScProductClassifyView.search,
							scope : this
						}]
			});
	return panel;
};

/**
 * Store对象
 */
ScProductClassifyView.prototype.initData = function() {
	var store = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
				     url : __ctxPath + '/supply/list_childProScProductClassify.do'
						}),
				reader : new Ext.data.JsonReader({
							root : 'result',
							totalProperty : 'totalCounts',
							fields : ['productClassifyId','productClassifyName','productClassifyPinyin',
								'productClassifyDispCode','productClassifyRemarks','productModelFlag','parentid','status','parentName'
								]
						}),
				remoteSort : true
			});
	//store.setDefaultSort('id', 'desc');
	return store;
};

ScProductClassifyView.add = function(masterProductClassifyId) {

			new ScProductClassifyForm({//引用ScProductClassifyForm.js line9 声明的变量名
				parentId : masterProductClassifyId,
				tie : '产品分类详细信息'
			}).show();
		
		Ext.getCmp('scProductClassifyTreePanel').root.reload();
		Ext.getCmp('SCProView').getStore().reload();
};

//修改产品分类
ScProductClassifyView.edit = function(productClassifyId) {
	var productClassifyForm = Ext.getCmp('ScProductClassifyForm');
	
		if (productClassifyForm == undefined) {//如果框不存在，则生成一个，然后获取它
			var newWin = new ScProductClassifyForm({
				productClassifyId : productClassifyId,
				title : '产品分类详细信息'
			}).show();
		}
};

ScProductClassifyView.multiAction = function(action) {
	var grid = Ext.getCmp('SCProView');
	var rows = grid.getSelectionModel().getSelections();
	if (rows != null && rows.length > 0) {
		var ids = new Array();
		for (var i = 0; i < rows.length; i++)
			ids.push(rows[i].data.productClassifyId);
		ScProductClassifyView.action_ids(ids, action);
	} else
		Ext.ux.Toast.msg('操作提示', '对不起，请选择你要操作的数据！');
};

ScProductClassifyView.action_ids = function(_ids, action) {
	var actionText = '启用';
	var actionUrl = '/supply/multiEnableScProductClassify.do';
	if(action == 'del'){
		actionText = '删除';
		actionUrl = '/supply/multiDelScProductClassify.do';
	}
	Ext.Msg.confirm(actionText+'操作', '你确定要'+actionText+'产品分类吗?', function(btn) {
				if (btn == 'yes') {
					Ext.Ajax.request({
								url : __ctxPath + actionUrl,
								method : 'post',
								params : {
									ids : _ids
								},
								success : function(response) {
									Ext.ux.Toast.msg("操作信息", "产品分类"+actionText+"成功");
									Ext.getCmp('SCProView').getStore().reload();
									Ext.getCmp('scProductClassifyTreePanel').root.reload();
								},
								failure : function() {
									Ext.ux.Toast.msg("操作信息", "产品分类"+actionText+"失败");
								}
							});
				}
			});
};

/**
 * 删除组织机构
 */
ScProductClassifyView.action = function(productClassifyId, action) {
//	alert(action)
	var actionText = '启用';
	var actionUrl = '/supply/enableScProductClassify.do';
	if(action == 'del'){
		actionText = '删除';
		actionUrl = '/supply/delScProductClassify.do';
		
	}
	Ext.Msg.confirm(''+actionText+'操作', '你确定'+actionText+'产品分类?', function(btn) {
		if (btn == 'yes') {
			Ext.Ajax.request({
				url : __ctxPath + actionUrl +'?productClassifyId='
					+ productClassifyId,
				success : function(result, request) {
					var res = Ext.util.JSON.decode(result.responseText);
					if (res.success == false) {
						Ext.ux.Toast.msg('操作信息', res.message);
					} else {
						Ext.ux.Toast.msg('操作信息', actionText+'成功!');
					}
					Ext.getCmp('scProductClassifyTreePanel').root.reload();
					Ext.getCmp('SCProView').getStore().reload();
				},
				failure : function(result, request) {}
			});
		}
	});
};

/**
 * 节点单击事件
 * 
 * @param node
 */
ScProductClassifyView.clickNode = function(node) {
	ScProductClassifyView.select(node);
};

/**
 * 条件查询
 * 
 * @param node
 */
ScProductClassifyView.select = function(node) {
	var users = Ext.getCmp('SCProView');
	users.setTitle(node.text + '--子产品分类列表');
	var store = users.getStore();
	store.url = __ctxPath + '/supply/list_childProScProductClassify.do';
	var paramObj = {
		start : 0,
		limit : 25
	};
	if (node != null && node.id > 0) {
		paramObj["productClassifyId"] = node.id;
	}
	store.reload({
				params : paramObj
	});
};