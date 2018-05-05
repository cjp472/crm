/**
 * @description 用户组选择器
 * @author guost
 * @updater zhangyl
 * @createtime 2012年5月9日 17:33:21
 */
var UsergroupSelector = {
	/**
	 * @description 获取UsergroupSelector窗口[window]
	 * @param callback
	 *            回传函数
	 * @param isSingle
	 *            是否单选，默认[单选]
	 */
	getView : function(callback, isSingle,groupIds) {
		  this.groupId = groupIds;
		isSingle = false;
		var panel = this.initUIComponent(isSingle);
		var win = new Ext.Window({
					id : 'UsergroupSelectorWin',
					title : '用户组选择器',
					layout : 'fit',
					region : 'center',
					maximizable : true,
					modal : true,
					width : 600,
					minWidth : 400,
					height : 425,
					minHeight : 425,
					items : [panel],
					buttonAlign : 'center',
					buttons : [{
						text : '确定',
						iconCls : 'btn-ok',
						handler : function() {
							var ids = '';
							var names = '';
							var isSingle = false;
							if (isSingle == null || isSingle == true) { // 单选
								var node = Ext
										.getCmp('UsergroupSelectorTreePanel')
										.getSelectionModel().getSelectedNode();
								if (node != null && node.id > 0) {
									ids = node.id;
									names = node.text;
								}
							} else {
								var store = Ext
										.getCmp('UsergroupSelectorEditorPanel')
										.getStore();
								for (var i = 0; i < store.getCount(); i++) {
									ids += store.getAt(i).data.pkUsergroupId
											+ ',';
									names += store.getAt(i).data.usergroupName
											+ ',';
								}
								ids = ids.substring(0, ids.length - 1);
								names = names.substring(0, names.length - 1);
							}
							if (callback != null)
								callback.call(this, ids, names);
							win.close();
						},
						scope : this
					}, {
						text : '取消',
						iconCls : 'btn-cancel',
						handler : function() {
							win.close();
						}
					}]

				}); // end of thie win
		return win;
	}, // end of this getView

	// 组件初始化,参数：isSingle[是否单选]
	initUIComponent : function(isSingle) {
		// /////////////jobTreePanel start////////////////////////
		isSingle = false;
		var rg = isSingle != null && isSingle == true ? 'center' : 'west';
		var usergroupTreePanel = new Ext.tree.TreePanel({
					id : 'UsergroupSelectorTreePanel',
					layout : 'form',
					region : rg,
					width : 200,
					collapsible : true,
					autoScroll : true,
					split : true,
					title : '用户组信息列表',
					tbar : new Ext.Toolbar({
								defaultType : 'button',
								items : [{
									text : '刷新',
									iconCls : 'btn-refresh',
									handler : function() {
										Ext
												.getCmp('UsergroupSelectorTreePanel').root
												.reload();
									}
								}, {
									text : '展开',
									iconCls : 'btn-expand',
									handler : function() {
										Ext
												.getCmp('UsergroupSelectorTreePanel')
												.expandAll();
									}
								}, {
									text : '收起',
									iconCls : 'btn-collapse',
									handler : function() {
										Ext
												.getCmp('UsergroupSelectorTreePanel')
												.collapseAll();
									}
								}]
							}),
					loader : new Ext.tree.TreeLoader({
								url : __ctxPath
										+ '/xitong/treeLoadUlUsergroup.do'
							}),
					root : new Ext.tree.AsyncTreeNode({
								expanded : true
							}),
					rootVisible : false,
					listeners : {
						'dblclick' : this.nodeDBClick
					}
				}); // end of this jobTreePanel
		// ////////////jobTreePanel end////////////////////////

		// ///////////////selectGridPanel start////////////////////////////
		var csm = new Ext.grid.CheckboxSelectionModel();
		var selectGridPanel = new Ext.grid.EditorGridPanel({
			id : 'UsergroupSelectorEditorPanel',
			title : '已选中的职位列表',
			layout : 'form',
			region : 'center',
			width : '100%',
			autoWidth : true,
			height : '100%',
			autoHeight : true,
			border : false,
			autoScroll : true,
			viewConfig : {
				forceFit : true,
				enableRowBody : false,
				showPreview : false
			},
			store : new Ext.data.ArrayStore({

						autoLoad : true,
						baseParams : {
							groupIdStrs : this.groupId
						},
						url : __ctxPath
										+ '/xitong/findbyGroupIdUlUsergroup.do',
						fields : [{
									name : 'pkUsergroupId',
									type : 'int'
								}, 'usergroupName']

					}),
			displayField : 'usergroupName',
			valueField : 'pkUsergroupId',
			trackMouseOver : true,
			sm : csm,
			columns : [csm, new Ext.grid.RowNumberer(), {
				header : '用户组编号',
				dataIndex : 'pkUsergroupId'
					// hidden : true
				}, {
				header : '用户组名称',
				dataIndex : 'usergroupName',
				anchor : '90%'
			}]
		}); // end of this selectGridPanel
		// 双击移除数据
		selectGridPanel.addListener('dblclick', function(grid, e) {
					var grid = Ext.getCmp('UsergroupSelectorEditorPanel');
					var rows = grid.getSelectionModel().getSelections();
					var store = grid.getStore();
					for (var i = 0; i < rows.length; i++) {
						grid.stopEditing();
						store.remove(rows[i]);
					}
				});
		// //////////////selectGridPanel end/////////////////////////////

		// ////多选添加的面板//////////selectedPanel[多选面板] start ///////
		var selectedPanel = new Ext.Panel({
					layout : 'border',
					region : 'center',
					width : '50%',
					height : '50%',
					border : false,
					autoScroll : true,
					items : [new Ext.Panel({
										region : 'west',
										frame : true,
										width : 40,
										layout : {
											type : 'vbox',
											pack : 'center',
											align : 'stretch'
										},
										defaultType : 'button',
										items : [{
													iconCls : 'add-all',
													text : '',
													scope : this,
													handler : this.addAll
												}, {
													iconCls : 'rem-all',
													text : '',
													scope : this,
													handler : this.removeAll
												}]
									}), {
								region : 'center',
								autoScroll : true,
								items : [selectGridPanel]
							}]
				}); // selectedPanel
		// //////////////selectedPanel[多选面板]
		// end////////////////////////////////////////

		// 总面板
		var panel = new Ext.Panel({
					layout : 'border',
					region : 'center',
					autoScroll : true,
					border : false,
					anchor : '98%,98%',
					items : [usergroupTreePanel]
				}); // end of this panel

		// 添加：[中间] 多选面板
		if (isSingle != null && isSingle == false) {
			panel.add(selectedPanel);
			panel.doLayout();
		}
		return panel;

	}, // end of this initUIComponent

	/**
	 * 节点双击事件
	 */
	nodeDBClick : function(node) {
		if (node != null && node.id > 0) {
			var gridPanel = Ext.getCmp('UsergroupSelectorEditorPanel');
			var selStore = gridPanel.getStore();
			var rows = gridPanel.getSelectionModel().getSelections();
			var isExists = false; // 默认不存在
			// 查询是否存在该记录
			for (var i = 0; i < selStore.getCount(); i++) {
				if (selStore.getAt(i).data.pkUsergroupId == node.id) {
					isExists = true; // 存在
					break;
				}
			}
			if (!isExists) { // 可以添加
				var data = {
					pkUsergroupId : node.id,
					usergroupName : node.text
				};
				var record = new selStore.recordType(data);
				gridPanel.stopEditing();
				selStore.add(record);
			}
		}
	},

	/**
	 * 添加所有
	 */
	addAll : function() {
		var tree = Ext.getCmp('UsergroupSelectorTreePanel');
		var grid = Ext.getCmp('UsergroupSelectorEditorPanel');
		// 1.获取选中的节点
		var node = tree.getSelectionModel().getSelectedNode();
		if (node != null && node.id > 0) {
			// 2.获取store
			var store = grid.getStore();
			// 3.判断是否已经存在
			var isExist = true;// 默认不存在
			for (var i = 0; i < store.getCount(); i++) {
				if (store.getAt(i).data.pkUsergroupId == node.id) {
					isExist = false;
					break;
				}
			}
			// 4.添加数据
			if (isExist) {
				var newData = {
					pkUsergroupId : node.id,
					usergroupName : node.text
				};
				var newRecord = new store.recordType(newData);
				grid.stopEditing();
				store.add(newRecord);
			}
		}
	},

	/**
	 * 移除所有
	 */
	removeAll : function() {
		var grid = Ext.getCmp('UsergroupSelectorEditorPanel');
		var rows = grid.getSelectionModel().getSelections();
		var store = grid.getStore();
		for (var i = 0; i < rows.length; i++) {
			grid.stopEditing();
			store.remove(rows[i]);
		}
	}
};
// /**
// * @param callback 回调函数
// * @param isSingle 是否单选
// */
// getView : function(callback, isSingle) {
// var treeUsergroup = new Ext.tree.TreePanel(
// {
// title : '用户组信息显示',
// region : 'west',
// width : 180,
// height : 300,
// split : true,
// collapsible : true,
// autoScroll : true,
// bbar : new Ext.Toolbar( {
// items : [ {
// xtype : 'button',
// iconCls : 'btn-refresh',
// text : '刷新',
// handler : function() {
// treeUsergroup.root.reload();
// }
// }, {
// xtype : 'button',
// text : '展开',
// iconCls : 'btn-expand',
// handler : function() {
// treeUsergroup.expandAll();
// }
// }, {
// xtype : 'button',
// text : '收起',
// iconCls : 'btn-collapse',
// handler : function() {
// treeUsergroup.collapseAll();
// }
// } ]
// }),
// loader : new Ext.tree.TreeLoader( {
// url : __ctxPath + '/xitong/treeLoadUlUsergroup.do'
// }),
// root : new Ext.tree.AsyncTreeNode( {
// expanded : true
// }),
// rootVisible : false,
// listeners : {
// 'click' : function(node) {
// if (node != null) {
// var ugroups = Ext
// .getCmp('UsergroupSelectorGrid');
// var store = ugroups.getStore();
// store.proxy.conn.url = __ctxPath + '/xitong/treeLoadUlUsergroup.do';
// store.baseParams = {
// pkUsergroupId : node.id
// };
// store.load( {
// params : {
// start : 0,
// limit : 12
// }
// });
// }
// }
// }
// });
//		
// var sm = null;
// if (isSingle) {
// var sm = new Ext.grid.CheckboxSelectionModel( {
// singleSelect : true
// });
// } else {
// sm = new Ext.grid.CheckboxSelectionModel();
// }
// var cm = new Ext.grid.ColumnModel(
// {
// columns : [
// sm,
// new Ext.grid.RowNumberer(),
// {
// header : 'pkUsergroupId',
// dataIndex : 'pkUsergroupId',
// hidden : true
// },
// {
// header : "用户组名称",
// dataIndex : 'usergroupName',
// renderer : function(value, metadata, record) {
// var str = '';
// var level = record.data.parentId;
// if (level != null && !isNaN(level)) {
// for ( var i = 2; i <= level; i++) {
// str += '<img src="' + __ctxPath + '/images/system/down.gif"/>';
// }
// }
// str += value;
// return str;
// },
// width : 60
// } ]
// });
//
// var store = new Ext.data.Store( {
// proxy : new Ext.data.HttpProxy( {
// url : __ctxPath + '/xitong/treeLoadUlUsergroup.do'
// }),
// reader : new Ext.data.JsonReader( {
// root : 'result',
// totalProperty : 'totalCounts',
// id : 'pkUsergroupId',
// fields : [ {
// name : 'pkUsergroupId',
// type : 'int'
// }, 'usergroupName', {
// name : 'parentId',
// type : 'int'
// } ]
// }),
// remoteSort : true
// });
//
// var gridPanel = new Ext.grid.GridPanel( {
// id : 'UsergroupSelectorGrid',
// width : 400,
// height : 300,
// region : 'center',
// title : '用户组列表',
// store : store,
// shim : true,
// trackMouseOver : true,
// disableSelection : false,
// loadMask : true,
// cm : cm,
// sm : sm,
// viewConfig : {
// forceFit : true,
// enableRowBody : false,
// showPreview : false
// },
// // paging bar on the bottom
// bbar : new HT.PagingBar( {
// store : store
// })
// });
//
// store.load( {
// params : {
// start : 0,
// limit : 25
// }
// });
//
// var window = new Ext.Window( {
// title : '用户组选择器',
// width : 630,
// height : 380,
// layout : 'border',
// border : false,
// items : [ treeUsergroup, gridPanel ],
// modal : true,
// buttonAlign : 'center',
// buttons : [ {
// iconCls : 'btn-ok',
// text : '确定',
// handler : function() {
// var grid = Ext.getCmp('UsergroupSelectorGrid');
// var rows = grid.getSelectionModel().getSelections();
// var usergroupIds = '';
// var usergroupNames = '';
// for ( var i = 0; i < rows.length; i++) {
//
// if (i > 0) {
// usergroupIds += ',';
// usergroupNames += ',';
// }
//
// usergroupIds += rows[i].data.pkUsergroupId;
// usergroupNames += rows[i].data.usergroupName;
// }
//
// if (callback != null) {
// callback.call(this, usergroupIds, usergroupNames);
// }
// window.close();
// }
// }, {
// text : '取消',
// iconCls : 'btn-cancel',
// handler : function() {
// window.close();
// }
// } ]
// });
// return window;
// }
// };
