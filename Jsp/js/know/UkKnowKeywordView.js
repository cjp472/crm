Ext.ns('UkKnowKeywordView');

var UkKnowKeywordView = function() {
	return this.setup();
};

UkKnowKeywordView.prototype.setup = function() {
	var selected;
	var store = this.initData();
	var sm = new Ext.grid.CheckboxSelectionModel();
	var cm = new Ext.grid.ColumnModel({
		columns : [sm, {
					header : "keywordId",
					dataIndex : 'keywordId',
					hidden : true
				}, {
					header : "名称",
					sortable : true,
					dataIndex : 'keyWord',
					width : 200
				}, {
					header : __ukKnowKeywordcomMent,
					sortable : true,
					dataIndex : 'comMent',
					width : 60
				}, {
					header : "分类",
					sortable : true,
					dataIndex : 'type',
					width : 60,
					renderer : function(value) {
						return value.name;
					}
				}, {
					header : __status,
					sortable : true,
					dataIndex : 'knowStatus',
					width : 60,
					renderer : function(value) {
						return ZZJGZT0001.get(value);
					}
				}, {
					header : __action,
					dataIndex : 'keywordId',
					sortable : true,
					width : 60,
					renderer : function(keywordId, metadata, record, rowIndex,
							colIndex, store) {
						if (keywordId) {
							var status = record.get('knowStatus');
							var str = '';
							
//							if (isGranted('_DepartmentEdit')) {
								str += '&nbsp;<button title="修改" value=" " class="btn-edit" onclick="UkKnowKeywordView.edit('
										+ keywordId + ')"></button>';
//							} else {
//								str += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
//							}
							if(status!=1){
							str += '&nbsp;<button title="启用" value=" " class="btn-setting" onclick="UkKnowKeywordView.action('
									+ keywordId + ',\'enable\')"></button>';
							}else{
								str += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
							}
							if (status!=2) {  //isGranted('_DepartmentDel')&&
								str += '<button title="注销" value=" " class="btn-del" onclick="UkKnowKeywordView.action('
										+ keywordId + ',\'del\')"></button>';
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
		id : 'KeywordView',
		tbar : new Ext.Toolbar({
					defaultType : 'button',
					items : ['->', {
								text : '注销',
								iconCls : 'btn-del',
								id : 'keyword-btn-del',disabled : true,
								handler : function() {
									UkKnowKeywordView.multiAction('del');
								}
							}, '->', {
								text : '启用',
								iconCls : 'btn-setting',disabled : true,
								id : 'keyword-btn-setting',
								handler : function() {
									UkKnowKeywordView.multiAction('enable');
								}
							}, '->', {
								text : '转移', //
								iconCls : 'btn-mail_move',disabled : true,
								id : 'keyword-btn-mail_move',
								handler : function() {
									UkKnowKeywordView.moveto();
								}
							}, '->',{
								text : __add,
								iconCls : 'btn-add',
								handler : function() {
									var node = Ext
											.getCmp('UkKnowKeywordTypeTreePanel')
											.getSelectionModel()
											.getSelectedNode();
									if (node == null) {
										UkKnowKeywordView.add(0);
									} else {
										UkKnowKeywordView.add(node.id);
									}
								}
							}]
				}),
		height : 800,
		title : __ukKnowKeywordlist,
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
	
	Ext.getCmp('KeywordView').getSelectionModel().on(
		'selectionchange', function(sm) {
			Ext.getCmp('keyword-btn-del').setDisabled(sm.getCount() < 1);
			Ext.getCmp('keyword-btn-setting').setDisabled(sm.getCount() < 1);
		    Ext.getCmp('keyword-btn-mail_move').setDisabled(sm.getCount() < 1);
	});
		
	// 双击编辑该行
	grid.addListener('rowdblclick', rowdblclickFn);
	function rowdblclickFn(grid, rowindex, e) {
		grid.getSelectionModel().each(function(rec) {
					UkKnowKeywordView.edit(rec.data.keywordId);
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
				id : 'UkKnowKeywordTypeTreePanel',
				title : __ukKnowKeywordTyperoot,
				collapsible : true,
				autoScroll : true,
				split : true,
				height : 800,
				width : 180,
				tbar : new Ext.Toolbar({
							items : [{
										xtype : 'button',
										iconCls : 'btn-refresh',
										text : __reload,
										handler : function() {
											treePanel.root.reload();
										}
									}, '-', {
										xtype : 'button',
										text : __expand,
										iconCls : 'btn-expand',
										handler : function() {
											treePanel.expandAll();
										}
									}, '-', {
										xtype : 'button',
										text : __collapse,
										iconCls : 'btn-collapse',
										handler : function() {
											treePanel.collapseAll();
										}
									}]
						}),
				loader : new Ext.tree.TreeLoader({
							url : __ctxPath + '/know/typeListUkKnowKeyword.do'
						}),
				root : new Ext.tree.AsyncTreeNode({
							expanded : true
						}),
				rootVisible : false,
				listeners : {
					'click' : UkKnowKeywordView.clickNode
				}
			}); // end of this treePanel

//	if (isGranted('_DepartmentAdd') || isGranted('_DepartmentEdit')
//			|| isGranted('_DepartmentDel')) {
		// 树的右键菜单
		treePanel.on('contextmenu', contextmenu, treePanel);
//	}

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
//		if (isGranted('_DepartmentAdd')) {
			treeMenu.add({
						text : __ukKnowKeywordTypeadd,
						iconCls : 'btn-add',
						scope : this,
						handler : createNode
					});
//		}
//		if (isGranted('_DepartmentEdit')) {
			treeMenu.add({
						text : __ukKnowKeywordTypeupdate,
						iconCls : 'btn-edit',
						scope : this,
						handler : editNode
					});
//		}
//		if (isGranted('_DepartmentDel')) {
			treeMenu.add({
						text : __ukKnowKeywordTypedel,
						iconCls : 'btn-delete',
						scope : this,
						handler : deteleNode
					});

//		}

		treeMenu.showAt(e.getXY());
	}
	/**
	 * 菜单事件
	 */
	function createNode() {
		var nodeId = selected.id;
		UkKnowKeywordView.addType(nodeId);
	}
	function deteleNode() {
		var nodeId = selected.id;
		if (nodeId > 0) {
			UkKnowKeywordView.delType(nodeId);
		} else {
			Ext.ux.Toast.msg('警告', __ukKnowKeywordTyperootMessage);
		}
	}
	function editNode() {
		var nodeId = selected.id;
		if (nodeId > 0) {
			UkKnowKeywordView.editType(nodeId);
		} else {
			Ext.ux.Toast.msg('警告', __ukKnowKeywordTyperootMessage);
		}

	}
		// 初始化搜索条件Panel
		this.searchPanel = new Ext.FormPanel({
					layout : 'hbox',
					region : 'north',
					id : 'UkKnowKeyWordSearchPanel',
					height : 35,
					items : [{
								text : '名称'
							}, {

								name : 'keyWord',
								id : 'keyWord',
								xtype : 'textfield'
							},{
								xtype : 'button',
								text : __search,
								iconCls : 'search',
								scope : this,
								handler :  function() {
									var users = Ext.getCmp('KeywordView');
									var keyWord = Ext.getCmp('keyWord').getValue();
									users.setTitle('关键字列表');
									var store = users.getStore();
									var node = Ext.getCmp('UkKnowKeywordTypeTreePanel').getSelectionModel().getSelectedNode();
									store.url = __ctxPath + '/know/childlist_typeUkKnowKeyword.do';
									var paramObj = {
										start : 0,
										limit : 25
									};
									if (node != null && node.id > 0) {
										paramObj["typeId"] = node.id;
									}
									if(keyWord != null){
										paramObj["keyWord"] = keyWord;
									}
									store.reload({
												params : paramObj
											});

								}
							}, {
								xtype : 'button',
								text : __reset,
								scope : this,
								iconCls : 'btn-reset',
								handler : function(){
									var searchPanel = Ext.getCmp('UkKnowKeyWordSearchPanel');
									searchPanel.getForm().reset();
										}
							}, {
								xtype : 'button',
								text : __advancedSearch,
								iconCls : 'search',
								scope : this,
								handler : function() {
									new UkKnowTemplateAdvancedSearchWin()
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
	var panel = new Ext.Panel({
				id : 'UkKnowKeywordView',
				title : __ukKnowKeywordlist,
				closable : true,
				iconCls : 'menu-department',
				layout : 'border',
				items : [treePanel, grid,this.searchPanel],// searchPanel
				keys : [{
							key : Ext.EventObject.ESC,
							fn : UkKnowKeywordView.reset,
							scope : this
						}, {
							key : Ext.EventObject.ENTER,
							fn : UkKnowKeywordView.search,
							scope : this
						}]
			});
	return panel;
};

/**
 * Store对象
 */
UkKnowKeywordView.prototype.initData = function() {
	var store = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : __ctxPath
									+ '/know/childlist_typeUkKnowKeyword.do'
						}),
				reader : new Ext.data.JsonReader({
							root : 'result',
							totalProperty : 'totalCounts',
							fields : ['keywordId', 'keyWord', 'comMent',
									'knowStatus', 'type']
						}),
				remoteSort : true
			});
	store.setDefaultSort('keywordId', 'desc');
	return store;
};

UkKnowKeywordView.addType = function(typeId) {
	if (typeId > 0) {
		new UkKnowKeywordTypeForm({
					nodeId : typeId
				}).show();
	} else {
		new UkKnowKeywordTypeForm({
					nodeId : 0
				}).show();
	}
};

UkKnowKeywordView.editType = function(typeId) {
	var KeywordTypeForm = Ext.getCmp('UkKnowKeywordTypeForm');
	if (KeywordTypeForm == null) {// 如果框不存在，则生成一个，然后获取它
		new UkKnowKeywordTypeForm({
					typeId : typeId
				}).show();
		KeywordTypeForm = Ext.getCmp('UkKnowKeywordTypeForm');
	}
	KeywordTypeForm.show();
};

/**
 * 删除分类
 */
UkKnowKeywordView.delType = function(typeId) {
	Ext.Msg.confirm('删除操作', __ukKnowKeywordTypedelMessage, function(btn) {
		if (btn == 'yes') {
			Ext.Ajax.request({
						url : __ctxPath
								+ '/know/delTypeUkKnowKeyword.do?typeId='
								+ typeId,
						success : function(result, request) {
							var res = Ext.util.JSON.decode(result.responseText);
							if (res.success == false) {
								Ext.ux.Toast.msg('操作信息',
										__ukKnowKeywordTypedelResponse);
							} else {
								Ext.ux.Toast.msg('操作信息', __operationsuccess);
							}
							Ext.getCmp('UkKnowKeywordTypeTreePanel').root
									.reload();
                            Ext.getCmp('UkKnowKeywordTypeTreePanel').expandAll();
						},
						failure : function(result, request) {
							Ext.ux.Toast.msg('操作信息', __operationFailed);
						}
					});
		}
	});
};

UkKnowKeywordView.add = function(typeId) {
	if (typeId == 0) {
		Ext.ux.Toast.msg("操作信息", __ukKnowKeywordaddMessage);
		return;
	}
	new UkKnowKeywordForm({
				typeId : typeId
			}).show();
};

UkKnowKeywordView.edit = function(keywordId) {
	var KeywordForm = Ext.getCmp('UkKnowKeywordForm');
	if (KeywordForm == null) {// 如果框不存在，则生成一个，然后获取它
		new UkKnowKeywordForm({
					keywordId : keywordId
				}).show();
		KeywordForm = Ext.getCmp('UkKnowKeywordForm');
	}
	KeywordForm.show();
};

UkKnowKeywordView.moveto = function(){
	var grid = Ext.getCmp('KeywordView');
	var rows = grid.getSelectionModel().getSelections();
	
	var ids = '';
	if (rows != null && rows.length >= 1) {
		for(var i=0; i<rows.length; i++) ids+= rows[i].data.keywordId + ",";
		var _moveFormPanel = new UkKnowKeywordView.moveFormPanel(ids,0);
	}else {
		Ext.ux.Toast.msg(__actioninfo,'请选择转移的数据！');
	}

	var selectFolder = new Ext.Window({
				x:350,
				y:100,
				width : 340,
				height : 300,
				title : '移动关键字',
				iconCls : 'btn-mail_move',
				modal : true,
				buttonAlign : 'center',
				plain : true,
				layout : 'fit',
				border : false,
				bodyStyle : 'padding:10px 10px 10px 10px',
				items : [_moveFormPanel],
				buttons : [{
					text : '确定移动',
					iconCls : 'btn-mail_move',
					handler : function() {
						var folderId = Ext.getCmp('folderId').value;
						
						if (folderId == '' || folderId == null || folderId == 'undefined') {
							Ext.ux.Toast.msg('操作信息', '请先选择目录');
						} else {
							var moveFolderForm = Ext.getCmp("moveFolderForm");
							moveFolderForm.getForm().submit({
								
								waitMsg : '正在提交用户信息',
								success : function(moveFolderForm, o) {
									// 成功之后关闭窗口,显示邮件列表Panel,reload()
									Ext.ux.Toast.msg('操作信息', '移动成功！');
									selectFolder.close();
//									Ext.getCmp('ukKnowTypeTreePanel').root.reload();
									Ext.getCmp('KeywordView').getStore().reload();
								},
								failure : function(moveFolderForm, o) {
									// 移动失败后提示失败原因
									Ext.ux.Toast.msg('提示信息','移动失败');
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

UkKnowKeywordView.moveFormPanel = function(_id,actionModel) {
	var treePanel = new Ext.tree.TreePanel({
		// id:'',
		title : '请选择目标分类',
		
		loader : new Ext.tree.TreeLoader({
					url : __ctxPath + '/know/typeListUkKnowKeyword.do'
				}),
		root : new Ext.tree.AsyncTreeNode({
					expanded : true
				}),
		rootVisible : false,
		listeners : {
			'click' : function(node) {
				if (node != null && node.id != 0) {
					Ext.getCmp('dispalyFolderName').setValue(node.text);
					Ext.getCmp('folderId').setValue(node.id);
				}
			}
		}
	})
	var formPanel = new Ext.FormPanel({
		url : __ctxPath + '/know/movenodeUkKnowKeyword.do',
		layout : 'table',
		id : 'moveFolderForm',
		autoScroll : true,
		frame : true,
		defaultType : 'textfield',
		
		layoutConfig : {
			columns : 1
		},
		defaults : {
			width : 280
		},
		baseParams : {
			newknowTypeId : _id,
			actionMode : actionModel
		},
		items : [{
					xtype : 'label',
					text : '移至:'
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

UkKnowKeywordView.multiAction = function(action) {
	var grid = Ext.getCmp('KeywordView');
	var rows = grid.getSelectionModel().getSelections();
	if (rows != null && rows.length > 0) {
		var ids = new Array();
		for (var i = 0; i < rows.length; i++)
			ids.push(rows[i].data.keywordId);
		UkKnowKeywordView.action_ids(ids, action);
	} else {
		Ext.ux.Toast.msg('操作提示', __noData);
	}
};

UkKnowKeywordView.action_ids = function(_ids, action) {
	var actionText = __ukKnowKeywordenableMessage;
	var actionUrl = '/know/multiEnableUkKnowKeyword.do';
	if (action == 'del') {
		actionText = '您确定要注销这些关键字吗?';
		actionUrl = '/know/multiDelUkKnowKeyword.do';
	}
	Ext.Msg.confirm(__toastMessage, actionText, function(btn) {
				if (btn == 'yes') {
					Ext.Ajax.request({
								url : __ctxPath + actionUrl,
								method : 'post',
								params : {
									ids : _ids
								},
								success : function(response) {
									Ext.ux.Toast
											.msg("操作信息", __operationsuccess);
									Ext.getCmp('KeywordView').getStore()
											.reload();
								},
								failure : function() {
									Ext.ux.Toast.msg("操作信息", __operationFailed);
								}
							});
				}
			});
};
/**
 * 删除关键字
 */
UkKnowKeywordView.action = function(keywordId, action) {
	var actionText = __ukKnowKeywordenableMessage;
	var actionUrl = '/know/enableUkKnowKeyword.do';
	if (action == 'del') {
		actionText = '您确定要注销这些关键字吗?';
		actionUrl = '/know/delUkKnowKeyword.do';
	}
	Ext.Msg.confirm(__toastMessage, actionText, function(btn) {
		if (btn == 'yes') {
			Ext.Ajax.request({
						url : __ctxPath + actionUrl + '?keywordId=' + keywordId,
						success : function(result, request) {
							var res = Ext.util.JSON.decode(result.responseText);
							if (res.success == false) {
								Ext.ux.Toast.msg('操作信息', res.message);
							} else {
								Ext.ux.Toast.msg('操作信息', __operationsuccess);
							}
							Ext.getCmp('KeywordView').getStore().reload();
						},
						failure : function(result, request) {
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
UkKnowKeywordView.clickNode = function(node) {
	UkKnowKeywordView.select(node);
};

/**
 * 条件查询
 * 
 * @param node
 */
UkKnowKeywordView.select = function(node) {
	var users = Ext.getCmp('KeywordView');
	var keyWord = Ext.getCmp('keyWord').getValue();
	users.setTitle('关键字列表');
	var store = users.getStore();
	store.url = __ctxPath + '/know/childlist_typeUkKnowKeyword.do';
	var paramObj = {
		start : 0,
		limit : 25
	};
	if (node != null && node.id > 0) {
		paramObj["typeId"] = node.id;
	}
	if(keyWord != null){
		paramObj["keyWord"] = keyWord;
	}
	store.reload({
				params : paramObj
			});
};