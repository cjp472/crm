/**
 * @description 子组织机构列表选择器
 * @class ObGuiZeShiYongDuiXiangSelector
 * @author 优创融联科技
 * @updater zhangyl
 * @createtime 2011-1-19PM
 * 
 * 
 */
Ext.ns('ObGuiZeShiYongDuiXiangSelector');

var ObGuiZeShiYongDuiXiangSelector = function() {
	return this.setup();
};

ObGuiZeShiYongDuiXiangSelector.prototype.setup = function(fn) {
	var selected;
	var store = this.initData();
	var sm = new Ext.grid.CheckboxSelectionModel();
	var cm = new Ext.grid.ColumnModel({
		columns : [sm, {
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
						return JYYW0001.get(value);
					}
				}, {
					header : "业务说明",
					sortable : true,
					dataIndex : 'yewushuoming',
					width : 60,
					hidden:true
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

	var grid = new HT.GridPanel({
				region : 'center',
				id : 'UlDepSelectorView',
				height : 800,
				title : '子组织机构列表',
				store : store,
				region : 'center',
				height : 380,singleSelect:false,
				autoWidth : false,
//				shim : true,
//				trackMouseOver : true,
//				disableSelection : false,
//				singleSelect:true,
//				loadMask : true,
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
			ObGuiZeShiYongDuiXiangSelector.edit(rec.data.depid);
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
					'click' : ObGuiZeShiYongDuiXiangSelector.clickNode
				}
			}); // end of this treePanel

	if (isGranted('_DepartmentAdd') || isGranted('_DepartmentEdit')
			|| isGranted('_DepartmentDel')) {
		// 树的右键菜单
		treePanel.on('contextmenu', treePanel);
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
						text : '删除机构',
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
		ObGuiZeShiYongDuiXiangSelector.add(nodeId);
	}
	function deteleNode() {
		var depId = selected.id;
		if (depId > 0) {
			ObGuiZeShiYongDuiXiangSelector.remove(depId);
		} else {
			Ext.ux.Toast.msg('警告', "总公司不能被删除");
		}
	}
	function editNode() {
		var depId = selected.id;
		if (depId > 0) {
			ObGuiZeShiYongDuiXiangSelector.edit(depId);
		} else {
			Ext.ux.Toast.msg('警告', "总公司不能修改！");
		}

	}

	var panel = new Ext.Window({
				id : 'ObGuiZeShiYongDuiXiangSelector',
				title : '组织机构',
				closable : true,
				width : 640,
				minWidth : 640,
				height : 480,
				minHeight : 480,
				iconCls : 'menu-department',
				layout : 'border',
				items : [treePanel, grid],//searchPanel
				buttonAlign : 'center',
			    buttons : [{
						text : '确认',
						iconCls : 'btn-ok',
						scope : this,
						handler : function(){
			    			ObGuiZeShiYongDuiXiangSelector.submit(fn);
						}
					}, {
						text : '关闭',
						iconCls : 'btn-cancel',
						scope : this,
						handler : ObGuiZeShiYongDuiXiangSelector.close
					}],
				keys : [{
							key : Ext.EventObject.ESC,
							fn : ObGuiZeShiYongDuiXiangSelector.reset,
							scope : this
						}, {
							key : Ext.EventObject.ENTER,
							fn : ObGuiZeShiYongDuiXiangSelector.search,
							scope : this
						}]
			});
	return panel;
};

/**
 * Store对象
 */
ObGuiZeShiYongDuiXiangSelector.prototype.initData = function() {
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

ObGuiZeShiYongDuiXiangSelector.add = function(depId) {
		if (depId > 0) {
			new UlDepartmentForm({//引用UlDepartmentForm.js line9 声明的变量名
				nodeId : depId
			}).show();
		} else {
			new UlDepartmentForm({
				nodeId : 0
			}).show();
		}
		Ext.getCmp('uldepartmentTreePanel').root.reload();
		Ext.getCmp('UlDepSelectorView').getStore().reload();
};
ObGuiZeShiYongDuiXiangSelector.adrList;

ObGuiZeShiYongDuiXiangSelector.edit = function(depId) {
	var departmentForm = Ext.getCmp('uldepartmentForm');
	
	Ext.Ajax.request({
		url : __ctxPath + '/xitong/getUlDepartment.do',
		params : {
			depId : depId
		},
		method : 'post',
		success : function(response) {
			var result = Ext.util.JSON.decode(response.responseText);
			ObGuiZeShiYongDuiXiangSelector.adrList = [0, result.data.guojia, result.data.sheng, result.data.shi];
			if (departmentForm == null) {//如果框不存在，则生成一个，然后获取它
				new UlDepartmentForm({
					depid : depId,
					adrList : ObGuiZeShiYongDuiXiangSelector.adrList,
					guojia : result.data.guojia,
					sheng : result.data.sheng,
					shi : result.data.shi,
					qu : result.data.qu
				}).show();
				departmentForm = Ext.getCmp('uldepartmentForm');
			}
			departmentForm.form.load({
				url : __ctxPath + '/xitong/detailUlDepartment.do',
				params : {
					depId : depId,
					adrList : ObGuiZeShiYongDuiXiangSelector.adrList,
					guojia : result.data.guojia,
					sheng : result.data.sheng,
					shi : result.data.shi,
					qu : result.data.qu
				},
				method : 'post',
				deferredRender : true,
				layoutOnTabChange : true,
				success : function() {
					
				},
				failure : function() {
					Ext.ux.Toast.msg('编辑', '载入失败');
				}
			});
		}
	});
	
};

ObGuiZeShiYongDuiXiangSelector.multiAction = function(action) {
	var grid = Ext.getCmp('UlDepSelectorView');
	var rows = grid.getSelectionModel().getSelections();
	if (rows != null && rows.length > 0) {
		var ids = new Array();
		for (var i = 0; i < rows.length; i++)
			ids.push(rows[i].data.depid);
		ObGuiZeShiYongDuiXiangSelector.action_ids(ids, action);
	} else
		Ext.ux.Toast.msg('操作提示', '对不起，请选择你要操作的数据！');
};

ObGuiZeShiYongDuiXiangSelector.action_ids = function(_ids, action) {
	var actionText = '启用';
	var actionUrl = '/xitong/multiEnableUlDepartment.do';
	if(action == 'del'){
		actionText = '删除';
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
									Ext.getCmp('UlDepSelectorView').getStore()
											.reload();
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
 * 删除组织机构
 */
ObGuiZeShiYongDuiXiangSelector.action = function(depId, action) {
	var actionText = '启用';
	var actionUrl = '/xitong/enableUlDepartment.do';
	if(action == 'del'){
		actionText = '删除';
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
					Ext.getCmp('UlDepSelectorView').getStore().reload();
				},
				failure : function(result, request) {}
			});
		}
	});
};


	/**
	 * 确定，提交
	 * 
	 * @param isSingle
	 *            是否单选
	 * @param callback
	 *            回传函数
	 */
ObGuiZeShiYongDuiXiangSelector.submit = function(fn) {
//		var jigouNam = '';
//		var jigouId = '';
//		var type='';
//		var jingyingyewu='';
//		var yewushuoming='';
//		var parentid='';
//		var status='';
//		var parentName='';
//		if (this.isSingle == null || this.isSingle) {// 选择单个员工
//			var grid = Ext.getCmp('UlDepSelectorView');
//			var rows = grid.getSelectionModel().getSelections();
//
//			for (var i = 0; i < rows.length; i++) {
//				if (i > 0) {
//					jigouNam += ',';
//					jigouId += ',';
//					type+=',';
//					jingyingyewu+=',';
//					yewushuoming+=',';
//					parentid+=',';
//					status+=',';
//					parentName+=',';
//				}
//				jigouNam += rows[i].data.depname
//				jigouId += rows[i].data.depid;
//				type += rows[i].data.type;
//				jingyingyewu += rows[i].data.jingyingyewu;
//				yewushuoming += rows[i].data.yewushuoming;
//				parentid += rows[i].data.parentid;
//				status += rows[i].data.status;
//				parentName += rows[i].data.parentName;
//			}
//		} else {
//			var selStore = Ext.getCmp('selectedEmpGrid').getStore();
//			for (var i = 0; i < selStore.getCount(); i++) {
//				if (i > 0) {
//					userIds += ',';
//					fullnames += ',';
//				}
//				userIds += selStore.getAt(i).data.userId;
//				if (this.mobileFlag) {
//					fullnames += selStore.getAt(i).data.fullname + '('
//							+ selStore.getAt(i).data.mobile + ')';
//				} else {
//					fullnames += selStore.getAt(i).data.fullname;
//				}
//			}
//		}
//		fn.call(this.scope,jigouNam,jigouId,type,jingyingyewu,yewushuoming,parentid,status,parentName);
//		Ext.getCmp('ObGuiZeShiYongDuiXiangSelector').close();
	   var grid = Ext.getCmp('UlDepSelectorView');
//	   alert(grid);
	   var rows = grid.getSelectionModel().getSelections();
	   	for (var i = 0, r; r = rows[i]; i++) {
//	   alert( rows[i].get('depid'));
//	   alert( rows[i].get('depname'));
//	   alert( rows[i].get('type'));
//	   alert( rows[i].get('jingyingyewu'));
//	   alert( rows[i].get('yewushuoming'));
//	   alert( rows[i].get('parentid'));
//	   alert( rows[i].get('status'));
//	   alert( rows[i].get('parentName'));
	   }
		
			fn.call(this.scope,rows);
		Ext.getCmp('ObGuiZeShiYongDuiXiangSelector').close();
	},

	/**
	 * 关闭当前窗口
	 */
ObGuiZeShiYongDuiXiangSelector.close = function() {
		Ext.getCmp('ObGuiZeShiYongDuiXiangSelector').close();
	}
/**
 * 节点单击事件
 * 
 * @param node
 */
ObGuiZeShiYongDuiXiangSelector.clickNode = function(node) {
	ObGuiZeShiYongDuiXiangSelector.select(node);
};

/**
 * 条件查询
 * 
 * @param node
 */
ObGuiZeShiYongDuiXiangSelector.select = function(node) {
	var users = Ext.getCmp('UlDepSelectorView');
	users.setTitle(node.text + '--子机构列表');
	var store = users.getStore();
	store.url = __ctxPath + '/xitong/list_childDepUlDepartment.do';
	var paramObj = {
		start : 0,
		limit : 25
	};
	if (node != null && node.id > 0) {
		paramObj["depId"] = node.id;
	}
	store.reload({
				params : paramObj
	});
};