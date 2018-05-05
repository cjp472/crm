/**
 * @author:cf0666@gmail.com
 * @class QcTargetView
 * @extends Ext.Panel
 * @description [QcTarget]管理
 * @company 优创融联科技
 * @createtime:
 */
QcTargetView = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		QcTargetView.superclass.constructor.call(this, {
					id : 'QcTargetViewWin',
					title : '考核指标管理',
					region : 'center',
					layout : 'border',
					items : [this.treePanel, {
								layout : 'border',
								region : 'center',
								items : [this.searchPanel, this.gridPanel]
							}]
				});
	},// end of constructor
	// 初始化组件
	initUIComponents : function() {
		var fieldnameComboData = [['tarTopic', '标题', new Ext.form.TextField({
									name : 'tarTopic',
									allowBlank : true
								})],
				['tarContent', '描述', new Ext.form.TextField({
									name : 'tarContent',
									allowBlank : true
								})], ['remark', '备注', new Ext.form.TextField({
									name : 'remark',
									allowBlank : true
								})], ['creUseId', '创建人ID', new MT.DicComboBox({
									hiddenName : 'creUseId',
									itemKey : 'QC_ZT'
								})],
				['creDat', '创建日期', new Ext.form.TextField({
									name : 'creDat',
									allowBlank : true
								})], ['updUseId', '修改人ID', new MT.DicComboBox({
									hiddenName : 'updUseId',
									itemKey : 'QC_ZT'
								})],
				['updDat', '修改日期', new Ext.form.TextField({
									name : 'updDat',
									allowBlank : true
								})],
				['staId', '状态：有效、注销&QC_ZT', new MT.DicComboBox({
									hiddenName : 'staId',
									itemKey : 'QC_ZT'
								})]]
		var QcTargetAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : '[QcTarget]高级查询',
					fieldData : fieldnameComboData
				});
		// 初始化搜索条件Panel
		this.searchPanel = new Ext.FormPanel({
			layout : 'hbox',
			region : 'north',
			id : 'QcTargetSearchPanel',
			height : 35,
			items : [{
						border : false,
						width : 70,
						style : 'text-align:right',
						html : '标题：'
					}, {
						name : 'Q_tarTopic_S_LK',
						xtype : 'textfield'
					},{
						border : false,
						width : 70,
						style : 'text-align:right',
						html : '状态：'
					},{
						hiddenName : 'Q_staId_SN_EQ',
						xtype : 'mtdiccombo',
						editable : true,
						lazyInit : false,
						forceSelection : false,
						itemKey:'QC_ZBZT'
					},{
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
							new QcTargetAdvancedSearchWin().show();
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
								iconCls : 'btn-add',
								// text : __create+'[QcTarget]',
								text : __create,
								xtype : 'button',
								scope : this,
								handler : this.createRs
							}, {
								iconCls : 'btn-del',
								// text : __delete+'[QcTarget]',
//								text : __delete,
								text : '注消',
								xtype : 'button',
								scope : this,
								handler :this.removeSelRs
							}, {
								iconCls : 'btn-setting',
								// text : __delete+'[QcTarget]',
								text : '启用',
								xtype : 'button',
								scope : this,
								handler : function() {
									QcTargetView.multiAction('enable');
								}
							}]
				});
				
				var store = this.initData();
				store.load();
		this.gridPanel = new HT.GridPanel({
			region : 'center',
			tbar : this.topbar,
			// 使用RowActions
			rowActions : true,
			printable : false,
			exportable : false,
			id : 'QcTargetGrid',
			store:store,
			//url : __ctxPath + "/qucon/childlist_targetQcTarget.do",
			fields : [{
						name : 'tarId',
						type : 'int'
					}, 'tarTopic', 'tarContent', 'remark', 'creUseId',
					'creDat', 'username2', 'updDat', 'staId'],
			columns : [{
						header : 'tarId',
						dataIndex : 'tarId',
						hidden : true
					}, {
						header : '标题',
						isExp : false,

						dataIndex : 'tarTopic'
					}, {
						header : '描述',
						isExp : false,

						dataIndex : 'tarContent'
					}, /*{
						header : '修改人',
						isExp : false,
						dataIndex : 'username2'
					},*/ {
						header : '修改日期',
						isExp : false,
						dataIndex : 'updDat'
					}, {
						header : '状态',
						isExp : false,
						dataIndex : 'staId',
						renderer : function(value) {
							return QC_ZBZT.get(value);
						}
					}, new Ext.ux.grid.RowActions({
								header : __action,
								width : 100,
								actions : [{
											iconCls : 'btn-del',
											qtip : '注销',
											style : 'margin:0 3px 0 3px'
										}, {
											iconCls : 'btn-edit',
											qtip : __edit,
											style : 'margin:0 3px 0 3px'
										}, {
											iconCls : 'btn-setting',
											qtip : '启用',
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

		this.treePanel = new Ext.tree.TreePanel({
					// TODO treePanel[机构信息列表]
					region : 'west',
					id : 'qcTarCatTreePanel',
					title : '指标分类',// __ukKnowTypeListHeading,
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
										var leftTree = Ext
												.getCmp("qcTarCatTreePanel");
										leftTree.root.reload();
									}
								}, '-', {
									xtype : 'button',
									text : '展开',
									iconCls : 'btn-expand',
									handler : function() {
										var leftTree = Ext.getCmp("qcTarCatTreePanel");
										leftTree.expandAll();
									}
								}, '-', {
									xtype : 'button',
									text : '收起',
									iconCls : 'btn-collapse',
									handler : function() {
										var leftTree = Ext
												.getCmp("qcTarCatTreePanel");
										leftTree.collapseAll();
									}
								}]
							}),
					loader : new Ext.tree.TreeLoader({
								url : __ctxPath + '/qucon/treeListQcTarCat.do'
							}),
					root : new Ext.tree.AsyncTreeNode({
								expanded : true
							}),
					rootVisible : false,
					listeners : {
                           'click' : QcTargetView.clickNode
		            }
				});

		if (isGranted('_DepartmentAdd') || isGranted('_DepartmentEdit')
				|| isGranted('_DepartmentDel')) {
			// 树的右键菜单
			var leftTree = Ext.getCmp("qcTarCatTreePanel");
			leftTree.on('contextmenu', contextmenu, leftTree);
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
							text : '添加分类',
							iconCls : 'btn-add',
							scope : this,
							handler : createNode
						});
			}
			if (isGranted('_DepartmentEdit')) {
				treeMenu.add({
							text : '修改分类',
							iconCls : 'btn-edit',
							scope : this,
							handler : editNode
						});
			}
			if (isGranted('_DepartmentDel')) {
				treeMenu.add({
							text : '删除分类',
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
			QcTargetView.addType(nodeId);
		}
		function deteleNode() {
			var nodeId = selected.id;
			if (nodeId > 0) {
				QcTargetView.delType(nodeId);
			} else {
				Ext.ux.Toast.msg('警告', __ukKnowKeywordTyperootMessage);
			}
		}
		function editNode() {
			var nodeId = selected.id;
			if (nodeId > 0) {
				QcTargetView.editType(nodeId);
			} else {
				Ext.ux.Toast.msg('警告', __ukKnowKeywordTyperootMessage);
			}

		}
		// end of this treePanel
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
        
//        var node = Ext.getCmp('qcTarCatTreePanel').
//            getSelectionModel().getSelectedNode();
//            
//        var users = Ext.getCmp('QcTargetGrid');
//        users.setTitle('考核指标列表');
//        var store = users.getStore();
//        store.url = __ctxPath + '/qucon/childlist_targetQcTarget.do';
//        var paramObj = {
//            start : 0,
//            limit : 25
//        };
//        if (node != null && node.id > 0) {
//            paramObj["typeId"] = node.id;
//        }
//        store.reload({
//            params : paramObj
//            });
//        
	},
	// GridPanel行点击处理事件
	rowClick : function(grid, rowindex, e) {
		grid.getSelectionModel().each(function(rec) {
					/**
					 * new QcTargetForm({ tarId : rec.data.tarId }).show();
					 */
					var tabs = Ext.getCmp('centerTabPanel');
					var aForm = Ext.getCmp('QcTargetPreviewForm');
					if (aForm != null) {
						tabs.remove('QcTargetPreviewForm');
					}
					aForm = new QcTargetPreviewForm({
								tarId : rec.data.tarId
							});
					tabs.add(aForm);
					tabs.activate(aForm);
				});
	},
	// 创建记录
	createRs : function(typeId) {
				var node = Ext.getCmp('qcTarCatTreePanel').getSelectionModel()
						.getSelectedNode();
				if (node == null) {
					Ext.ux.Toast.msg("操作信息", "请先选择一个分类（不能为根节点），然后在该分类下建立指标！");
					// Ext.ux.Toast.msg("操作信息", __ukKnowKeywordaddMessage);
					return;
				} else {
					var tabs = Ext.getCmp('centerTabPanel');
					var aForm = Ext.getCmp('QcTargetAddForm');
					if (aForm != null) {
						tabs.remove('QcTargetAddForm');
					}
					aForm = new QcTargetAddForm({
								typeId : node.id
							});
					tabs.add(aForm);
					tabs.activate(aForm);
				}

				// new QcTargetForm().show();

				// new QcTargetAddForm().show();//弹出框
			},
	// 按ID删除记录
	removeRs : function(id) {
		$postDel({
					url : __ctxPath + '/qucon/multiDelQcTarget.do',
					ids : id,
					grid : this.gridPanel
				});
	},
	// 把选中ID删除
	removeSelRs : function() {
		$delGridRs({
					url : __ctxPath + '/qucon/multiDelQcTarget.do',
					grid : this.gridPanel,
					idName : 'tarId'
				});
	},
	// 启用
    recover :function(id) {
		var actionText = "你确定启用这个指标?";
		var actionUrl = '/qucon/multiEnableQcTarget.do';
		Ext.Msg.confirm(__toastMessage, actionText, function(btn) {
			if (btn == 'yes') {
				Ext.Ajax.request({
					url : __ctxPath + actionUrl +'?tarId='
						+ id,
					success : function(result, request) {
						var res = Ext.util.JSON.decode(result.responseText);
						if (res.success == false) {
							Ext.ux.Toast.msg('操作信息', res.message);
						} else {
							Ext.ux.Toast.msg('操作信息', __operationsuccess);
						}
						Ext.getCmp('QcTargetGrid').getStore().reload();
					},
					failure : function(result, request) {}
				});
			}
		});
	},
	// 编辑Rs
	editRs : function(record) {
		// new QcTargetForm({
		// tarId : record.data.tarId
		// }).show();
		var tabs = Ext.getCmp('centerTabPanel');
		var aForm = Ext.getCmp('QcTargetForm');
		if (aForm != null) {
			tabs.remove('QcTargetForm');
		}
		aForm = new QcTargetForm({
					tarId : record.data.tarId
				});
		tabs.add(aForm);
		tabs.activate(aForm);
		// new QcTargetForm({tarId : record.data.tarId}).show();
	},
	// 行的Action
	onRowAction : function(grid, record, action, row, col) {
		switch (action) {
			case 'btn-del' :
				this.removeRs.call(this, record.data.tarId);
				break;
			case 'btn-edit' :
				this.editRs.call(this, record);
				break;
			case 'btn-setting' :
				this.recover.call(this, record.data.tarId);
				break;				
			default :
				break;
		}
	}
});
/**
 * Store对象
 */
QcTargetView.prototype.initData = function() {
	var store = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : __ctxPath + '/qucon/childlist_targetQcTarget.do'
						}),
				reader : new Ext.data.JsonReader({
							root : 'result',
							totalProperty : 'totalCounts',
							fields : ['tarId','tarTopic','tarContent','username2',
								'updDat','staId']
						}),
				remoteSort : true
			});
	store.setDefaultSort('tarId', 'desc');
	return store;
};

QcTargetView.addType = function(typeId) {
		if (typeId > 0) {
			new QcTarCatForm({
				nodeId : typeId
			}).show();
		} else {
			new QcTarCatForm({
				nodeId : 0
			}).show();
		}
};

QcTargetView.editType = function(typeId) {
	var TarCatForm = Ext.getCmp('QcTarCatForm');
	if (TarCatForm == null) {//如果框不存在，则生成一个，然后获取它
		new QcTarCatForm({
			tarCatId : typeId
		}).show();
		TarCatForm = Ext.getCmp('QcTarCatForm');
	}
	TarCatForm.show();
};

/**
 * 删除分类
 */
QcTargetView.delType = function(tarCatId) {
	Ext.Msg.confirm('删除操作', __ukKnowKeywordTypedelMessage, function(btn) {
		if (btn == 'yes') {
			Ext.Ajax.request({
				url : __ctxPath + '/qucon/delCatQcTarCat.do?tarCatId='+tarCatId,
				success : function(result, request) {
					var res = Ext.util.JSON.decode(result.responseText);
					if (res.success == false) {
						Ext.ux.Toast.msg('操作信息', __ukKnowKeywordTypedelResponse);
					} else {
						Ext.ux.Toast.msg('操作信息', __operationsuccess);
					}
					Ext.getCmp('qcTarCatTreePanel').root.reload();
				},
				failure : function(result, request) {
					Ext.ux.Toast.msg('操作信息', __operationFailed);
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
QcTargetView.clickNode = function(node) {
	QcTargetView.select(node);
};

/**
 * 条件查询
 * 
 * @param node
 */
QcTargetView.select = function(node) {
	var users = Ext.getCmp('QcTargetGrid');
	users.setTitle('考核指标列表');
	var store = users.getStore();
	store.url = __ctxPath + '/qucon/childlist_targetQcTarget.do';
	var paramObj = {
		start : 0,
		limit : 25
	};
	if (node != null && node.id > 0) {
		paramObj["typeId"] = node.id;

	}
	store.reload({
				params : paramObj
	});
};

//2012.06.11
QcTargetView.multiAction = function(action) {
	var grid = Ext.getCmp('QcTargetGrid');
	var rows = grid.getSelectionModel().getSelections();
	if (rows != null && rows.length > 0) {
		var ids = new Array();
		for (var i = 0; i < rows.length; i++)
			ids.push(rows[i].data.tarId);
		QcTargetView.action_ids(ids, action);
	} else{
		Ext.ux.Toast.msg('操作提示', __noData);
	}
};

QcTargetView.action_ids = function(_ids, action) {
	var actionText = __ukKnowKeywordenableMessage;
	var actionUrl = '/qucon/multiEnableQcTarget.do';
	if(action == 'del'){
		actionText = __ukKnowKeyworddelMessage;
		actionUrl = '/qucon/multiDelQcTarget.do';
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
									Ext.ux.Toast.msg("操作信息", __operationsuccess);
									Ext.getCmp('QcTargetGrid').getStore().reload();
								},
								failure : function() {
									Ext.ux.Toast.msg("操作信息", __operationFailed);
								}
							});
				}
			});
};
