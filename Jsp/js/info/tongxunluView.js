Ext.ns("tongxunlu");

var tongxunlu = function() {
	return this.setup();
};
//
tongxunlu.prototype.setup = function() {
	var selected;
	var store = this.initData();
	var sm = new Ext.grid.CheckboxSelectionModel();
	var cm = new Ext.grid.ColumnModel({
				columns : [sm, {
							header : "keywordId",
							dataIndex : 'keywordId',
							hidden : true
						}, {
							header : '工号',
							sortable : true,
							dataIndex : 'keyWord'
						}, {
							header : '姓名',
							sortable : true,
							dataIndex : 'comMent'
						}, {
							header : "性别",
							sortable : true,
							dataIndex : 'type',
							renderer : function(value) {
								return value.name;
							}
						}, {
							header : '部门',
							sortable : true,
							dataIndex : 'knowStatus'
						}, {
							header : '职务',
							sortable : true,
							dataIndex : 'dept'
						}, {
							header : '邮箱',
							dataIndex : 'createDate'
						}, {
							header : '电话',
							dataIndex : 'updateDate'
						}, {
							header : 'IM',
							dataIndex : 'createBy'
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
		id : 'tongxunluView',
		tbar : new Ext.Toolbar({
			defaultType : 'button',
			items : [{
						html : '工号: ',
						style : 'margin-right:10px;margin-left:100px;'
					}, {
						xtype : 'field',
						id : 'search_unmber',
						width : 100
					}, {
						style : 'margin-left:10px; margin-right:10px;',
						html : '部门:'
					}, {
						xtype : 'field',
						id : 'search_gate',
						width : 100
					}, {
						style : 'margin-left:10px;margin-right:10px;',
						html : '姓名:'
					}, {
						xtype : 'field',
						id : 'search_name',
						width : 100
					}, {
						xtype : 'button',
						text : '查询',
						iconCls : 'search',
						handler : function(){
						
						}
					}, '->', {
						text : __delete,
						iconCls : 'btn-del',
						handler : function() {
							tongxunlu.multiAction('del');
						}
					}, '->', '->', {
						text : __add,
						iconCls : 'add-user',
						handler : function() {

							UlEmployeeSelector.getView(
									function(userId, fullname, sex, useid,
											zhiwei, depName, depId, userNo) { // UlEmployeeSelectors调用UlEmployeeSelectors这个JS
									// Ext.getCmp("userId").setValue(userId);
									// 给隐藏域 用户ID赋值
										Ext.getCmp("appUser.empName")
												.setValue(fullname); // 给显示域
																		// 用户名赋值
										Ext.getCmp("Title").setValue(sex);
										var photo = Ext.getCmp('appUser.photo');
										if (photo.value == ''
												|| photo.value == 'undefined'
												|| photo.value == null) {
											var display = Ext
													.getCmp('displayUserPhoto');
											if (sex == '2') {
												display.body
														.update('<img src="'
																+ __ctxPath
																+ '/images/default_image_female.jpg"/>');
											} else {
												display.body
														.update('<img src="'
																+ __ctxPath
																+ '/images/default_image_male.jpg"/>');
											}
										}

										Ext.getCmp("appUser.useid")
												.setValue(useid);
										Ext.getCmp("appUser.userNo")
												.setValue(userNo);
										Ext.getCmp("appUser.zhiwei")
												.setValue(zhiwei);
										Ext.getCmp("appUser.depName")
												.setValue(depName);
										// alert(depId);
										Ext.getCmp("appUser.depId")
												.setValue(depId);
										// 联系方式
										Ext.Ajax.request({
											url : __ctxPath
													+ '/xitong/contactsUlEmployee.do?employeeid='
													+ useid,
											method : 'get',
											async : true,
											success : function(response, opts) {
												var ret = Ext.util.JSON
														.decode(response.responseText).data;
												// var btn = new Ext.Button({
												// text:'hi 你好'
												// });
												// Ext.getCmp('empContacts').add(btn);
												// var empContacts =
												// Ext.getCmp('empContacts');
												// var makeTextField =
												// function(mid, mlabelname,
												// mvalue){
												// var mtf = new
												// Ext.form.TextField({
												// id : mid,
												// name : mlabelname,
												// value : mvalue
												// });
												// return mtf;
												// };
												for (var i = 0; i < ret.length; i++) {
													if (ret[i].contactType == 1) {// 手机
														Ext
																.getCmp('empMobile')
																.setValue(ret[i].contactValue);
														// var mp =
														// makeTextField('empMobilePhone','移动电话',ret[i].contactValue);
														// empContacts.add(mp);
													} else if (ret[i].contactType == 2) {// 电话
														Ext
																.getCmp('empPhone')
																.setValue(ret[i].contactValue);
													} else if (ret[i].contactType == 3) {// 邮箱
														Ext
																.getCmp('empZip')
																.setValue(ret[i].contactValue);

													}
													// empContacts.doLayout();
												}
												// alert(obj.data.contactType);
												// Ext.getCmp('empPhone').setValue(obj.data.contactType);
												// Ext.getCmp('empMobilePhone').setValue(obj.data.contactValue);
												// Ext.getCmp('empZip').setValue(user.ulEmployee.contacts[0]);
											},

											failure : function(response, opts) {

											}

										});
									}).show();
						}
					}]
		}),
		height : 800,
		title : "联系人",
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
	// 双击编辑该行
	// grid.addListener('rowdblclick', rowdblclickFn);
	// function rowdblclickFn(grid, rowindex, e) {
	// grid.getSelectionModel().each(function(rec) {
	// tongxunlu.edit(rec.data.keywordId);
	// });
	// }
	store.load({
				params : {
					start : 0,
					limit : 25
				}
			});

	var treePanel = new Ext.tree.TreePanel({
				region : 'west',
				id : 'tongxunluTreePanel',
				title : "客户列表",
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
					'click' : tongxunlu.clickNode
				}
			}); // end of this treePanel

	if (isGranted('_DepartmentAdd') || isGranted('_DepartmentEdit')
			|| isGranted('_DepartmentDel')) {
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
					// id : 'DepartmentTreeMenu',
					items : []
				});
		treeMenu.clearMons();
		if (isGranted('_DepartmentAdd')) {
			treeMenu.add({
						text : "添加",
						iconCls : 'btn-add',
						scope : this,
						handler : createNode
					});
		}
		if (isGranted('_DepartmentEdit')) {
			treeMenu.add({
						text : "编辑",
						iconCls : 'btn-edit',
						scope : this,
						handler : editNode
					});
		}
		if (isGranted('_DepartmentDel')) {
			treeMenu.add({
						text : "删除",
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
		tongxunlu.addType(nodeId);
	}
	function deteleNode() {
		var nodeId = selected.id;
		if (nodeId > 0) {
			tongxunlu.delType(nodeId);
		} else {
			Ext.ux.Toast.msg('警告', __ukKnowKeywordTyperootMessage);
		}
	}
	function editNode() {
		var nodeId = selected.id;
		if (nodeId > 0) {
			tongxunlu.editType(nodeId);
		} else {
			Ext.ux.Toast.msg('警告', __ukKnowKeywordTyperootMessage);
		}

	}

	var panel = new Ext.Panel({
				id : 'tongxunlu',
				title : '通讯录',
				closable : true,
				iconCls : 'menu-department',
				layout : 'border',
				items : [treePanel, grid],// searchPanel
				keys : [{
							key : Ext.EventObject.ESC,
							fn : tongxunlu.reset,
							scope : this
						}, {
							key : Ext.EventObject.ENTER,
							fn : tongxunlu.search,
							scope : this
						}]
			});
	return panel;
};

/**
 * Store对象
 */
tongxunlu.prototype.initData = function() {
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

tongxunlu.addType = function(typeId) {
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

tongxunlu.editType = function(typeId) {
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
tongxunlu.delType = function(typeId) {
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
						},
						failure : function(result, request) {
							Ext.ux.Toast.msg('操作信息', __operationFailed);
						}
					});
		}
	});
};

tongxunlu.add = function(typeId) {
	// if (typeId == 0) {
	// Ext.ux.Toast.msg("操作信息", __ukKnowKeywordaddMessage);
	// return;
	// }
	new tongxunluForm({
				typeId : typeId
			}).show();
};

tongxunlu.multiAction = function(action) {
	var grid = Ext.getCmp('tongxunluView');
	var rows = grid.getSelectionModel().getSelections();
	if (rows != null && rows.length > 0) {
		var ids = new Array();
		for (var i = 0; i < rows.length; i++)
			ids.push(rows[i].data.keywordId);
		tongxunlu.action_ids(ids, action);
	} else {
		Ext.ux.Toast.msg('操作提示', __noData);
	}
};

tongxunlu.action_ids = function(_ids, action) {
	var actionText = "确定删除?";
	var actionUrl = '/know/multiEnableUkKnowKeyword.do';
	Ext.Msg.confirm(__toastMessage, actionText, function(btn) {
				if (btn == 'yes') {
					var s = Ext.getCmp('tongxunluView').getSelectionModel()
							.getSelections();// 获得此条数据
					var store = Ext.getCmp('tongxunluView').getStore();
					for (var i = 0, r; r = s[i]; i++) {
						store.remove(r);

					};
					Ext.getCmp('tongxunluView').getView().refresh();
					// alert("删除此数据");

					// Ext.Ajax.request({
					// url : __ctxPath + actionUrl,
					// method : 'post',
					// params : {
					// ids : _ids
					// },
					// success : function(response) {
					// Ext.ux.Toast
					// .msg("操作信息", __operationsuccess);
					// Ext.getCmp('KeywordView').getStore()
					// .reload();
					// },
					// failure : function() {
					// Ext.ux.Toast.msg("操作信息", __operationFailed);
					// }
					// });
				}
			});
};
/**
 * 删除关键字
 */
tongxunlu.action = function(keywordId, action) {
	var actionText = __ukKnowKeywordenableMessage;
	var actionUrl = '/know/enableUkKnowKeyword.do';
	if (action == 'del') {
		actionText = __ukKnowKeyworddelMessage;
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
tongxunlu.clickNode = function(node) {
	tongxunlu.select(node);
};

/**
 * 条件查询
 * 
 * @param node
 */
tongxunlu.select = function(node) {
	var users = Ext.getCmp('tongxunluView');
	users.setTitle("联系人");
	var store = users.getStore();
	store.url = __ctxPath + '/know/childlist_typeUkKnowKeyword.do';
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
/**
 * 分类 : 通讯录
 */

/*
 * var tongxunlu = Ext.extend(Ext.Panel, { // 构造函数 constructor : function(_cfg) {
 * Ext.applyIf(this, _cfg); // 初始化组件 this.initUIComponents(); // 调用父类构造
 * tongxunlu.superclass.constructor.call(this, { id : 'tongxunlu', title :
 * '通讯录', region : 'center', layout : 'border', items : [this.leftPanel,
 * this.gridPanel] }); },// end of constructor // 初始化组件 initUIComponents :
 * function() { // 通讯录树 this.leftPanel = new Ext.Panel({ region : 'west', layout :
 * 'anchor', collapsible : true, autoScroll : true, id : 'tongxunluTreePanel',
 * title : '员工通讯录', split : true, width : 200, items : [{ xtype : 'treepanel',
 * id : 'tongxunluTree', split : true, rootVisible : true, border : false,
 * autoHeight : true, scope : this, // url : __ctxPath + //
 * '/xitong/treeLoadUlUsergroup.do', dataUrl : __ctxPath +
 * '/xitong/treeLoadUlUsergroup.do',
 * 
 * root : { nodeType : 'async', text : 'Ext JS', draggable : false, id :
 * 'source' }, // onclick : function(node) { // // var proTypeId = node.id; // //
 * Ext.getCmp('UlUsergroupSearchPanel').getForm().findField('parentid').setValue(proTypeId); // //
 * Ext.getCmp('UlUsergroupViewWin').search(); // }, listeners : { 'contextmenu' :
 * function(node, e) { contextmenu(node, e); e.stopEvent(); }, 'dblclick' :
 * function(node, e) { }, scope : this }, tbar : new Ext.Toolbar({ items : [{
 * xtype : 'button', iconCls : 'btn-refresh', text : __reload, handler :
 * function() { Ext.getCmp('tongxunluTree').root.reload(); } }, '-', { xtype :
 * 'button', text : __expand, iconCls : 'btn-expand', handler : function() {
 * Ext.getCmp('tongxunluTree').expandAll(); } }, '-', { xtype : 'button', text :
 * __collapse, iconCls : 'btn-collapse', handler : function() {
 * Ext.getCmp('tongxunluTree').collapseAll(); } }] }) }] });
 * 
 * function contextmenu(node, e) { selected = new Ext.tree.TreeNode({ id :
 * node.id, text : node.text }); // 创建右键菜单 var treeMenu = new Ext.menu.Menu({ //
 * id : 'DepartmentTreeMenu', items : [] }); treeMenu.clearMons(); if
 * (isGranted('_DepartmentAdd')) { treeMenu.add({ text : '添加', iconCls :
 * 'btn-add', scope : this, handler : createNode }); } if
 * (isGranted('_DepartmentEdit')) { treeMenu.add({ text : '修改', iconCls :
 * 'btn-edit', scope : this, handler : editNode }); } if
 * (isGranted('_DepartmentDel')) { treeMenu.add({ text : '删除', iconCls :
 * 'btn-delete', scope : this, handler : deteleNode }); }
 * 
 * treeMenu.showAt(e.getXY()); } function createNode() { var nodeId =
 * selected.id; Ext.getCmp('tongxunluTree').addType(nodeId); } function
 * deteleNode() { var nodeId = selected.id; if (nodeId > 0) { selected.remove(); }
 * else { Ext.ux.Toast.msg('警告', __ukKnowKeywordTyperootMessage); } } function
 * editNode() { var nodeId = selected.id; if (nodeId > 0) {
 * Ext.getCmp('tongxunluTree').editType(nodeId); } else { Ext.ux.Toast.msg('警告',
 * __ukKnowKeywordTyperootMessage); } } // 用户组树结束
 * 
 * this.topbar = new Ext.Toolbar({ items : ['->', { iconCls : 'btn-del', text :
 * '删除', xtype : 'button', scope : this, handler : function() { } }, '->', {
 * iconCls : 'btn-add', text : '增加', xtype : 'button', scope : this, handler :
 * this.createRs }] });
 * 
 * this.gridPanel = new HT.GridPanel({ region : 'center', tbar : this.topbar, //
 * 使用RowActions // rowActions : true, id : 'UlUsergroupGrid', // url : __ctxPath +
 * "/xitong/listUlUsergroup.do", fields : [{ name : 'pkUsergroupId', type :
 * 'int' }, 'usergroupName', 'parentId', 'comment', 'usergroupLevel', 'path',
 * 'isUpdate', 'isDelete', 'createDate', 'updateDate', 'createBy'], columns : [{
 * header : '工号', sortable : true, dataIndex : 'usergroupName' // }, { // header :
 * '上级组', // dataIndex : 'parentId' }, { header : '姓名', dataIndex : 'comment' }, {
 * header : '性别', dataIndex : 'usergroupLevel', renderer : function(value) {
 * return UG001.get(value); } }, { header : '部门', dataIndex : 'isDelete' }, {
 * header : '邮箱', dataIndex : 'createDate' }, { header : '电话', dataIndex :
 * 'updateDate' }, { header : 'IM', dataIndex : 'createBy' }] // end of columns
 * });
 * 
 * this.gridPanel.addListener('rowdblclick', this.rowClick);
 * 
 * },// end of the initComponents() // 重置查询表单 reset : function() {
 * this.searchPanel.getForm().reset(); }, // 按条件搜索 search : function() {
 * $search({ searchPanel : this.searchPanel, gridPanel : this.gridPanel }); }, //
 * GridPanel行点击处理事件 rowClick : function(grid, rowindex, e) { var tabs =
 * Ext.getCmp('centerTabPanel'); grid.getSelectionModel().each(function(rec) {
 * var usergroupName = rec.data.usergroupName; var rform = new
 * UlUsergroupForm(usergroupName + "详细信息", rec.data.pkUsergroupId,
 * rec.data.parentId, true); tabs.add(rform); tabs.activate(rform);
 * rform.form.load({ url : __ctxPath + '/xitong/getUlUsergroup.do', params : {
 * pkUsergroupId : rec.data.pkUsergroupId }, method : 'post', waitMsg :
 * '正在载入数据...', success : function(edit, o) { }, failure : function(edit, o) {
 * Ext.ux.Toast.msg('编辑失败', '载入失败'); // alert(o.response.responseText); } });
 * }); // grid.getSelectionModel().each(function(rec) { // tabs.add(new
 * UlUsergroupForm("编辑用户组", rec.data.pkUsergroupId)); // }); }, // 创建记录 createRs :
 * function() { // new UlUsergroupForm().show(); var tabs =
 * Ext.getCmp('centerTabPanel'); var aForm = Ext.getCmp('UlUsergroupForm'); if
 * (aForm != null) { tabs.remove('UlUsergroupForm'); } aForm = new
 * UlUsergroupForm("增加用户组"); tabs.add(aForm); tabs.activate(aForm); }, //
 * 按ID删除记录 removeRs : function(id) { var idsUser = ''; var idsRole = '';
 * Ext.Ajax.request({ url : __ctxPath + '/xitong/selectedUsersUlUsergroup.do',
 * params : { pkUsergroupId : id }, async : true, scope : this, method : 'post',
 * success : function(response) { idsUser =
 * Ext.util.JSON.decode(response.responseText); if (idsUser == null || idsUser ==
 * '') { Ext.Ajax.request({ url : __ctxPath +
 * '/xitong/selectedRolesUlUsergroup.do', params : { pkUsergroupId : id }, async :
 * true, scope : this, method : 'post', success : function(response) { idsRole =
 * Ext.util.JSON .decode(response.responseText);
 * UlUsergroupView.isDelete(idsUser, idsRole, id); } }); } else {
 * UlUsergroupView.isDelete(idsUser, idsRole, id); } } }); }, startRs :
 * function(id) { UlUsergroupView.isStart(id); }, // 把选中ID删除 // removeSelRs :
 * function() { // $delGridRs( { // url : __ctxPath +
 * '/xitong/multiDelUlUsergroup.do', // grid : this.gridPanel, // idName :
 * 'pkUsergroupId' // }); // }, // 编辑Rs editRs : function(record) { //
 * 只允许有一个编辑窗口 var tabs = Ext.getCmp('centerTabPanel'); var eform =
 * Ext.getCmp('UlUsergroupForm');
 * 
 * var pkUsergroupId = record.data.pkUsergroupId; var usergroupName =
 * record.data.usergroupName; var groupParentId = record.data.parentId;
 * 
 * if (eform == null) { eform = new UlUsergroupForm(usergroupName + "详细信息",
 * pkUsergroupId, groupParentId, true); tabs.add(eform); } else {
 * tabs.remove('UlUsergroupForm'); eform = new UlUsergroupForm(usergroupName +
 * "详细信息", pkUsergroupId, groupParentId, true); tabs.add(eform); }
 * tabs.activate(eform); eform.form.load({ url : __ctxPath +
 * '/xitong/getUlUsergroup.do', params : { pkUsergroupId : pkUsergroupId },
 * method : 'post', waitMsg : '正在载入数据...', success : function(edit, o) {
 * Ext.getCmp('UlUsergroupGrid').getStore().reload();// 重新加载list数据
 * Ext.getCmp('UlUsergroupTree').root.reload();// 树重新加载list数据 }, failure :
 * function(edit, o) { Ext.ux.Toast.msg('编辑失败', '编辑失败'); } }); }, // 行的Action
 * onRowAction : function(grid, record, action, row, col) { switch (action) {
 * case 'btn-del' : this.removeRs.call(this, record.data.pkUsergroupId); break;
 * case 'btn-edit' : this.editRs.call(this, record); break; default :
 * this.startRs.call(this, record.data.pkUsergroupId); break; } } });
 * 
 */