Ext.ns('UkKnowTypeView');

var UkKnowTypeView = function() {
	return this.setup();
};

UkKnowTypeView.prototype.setup = function() {
	var selected;
	var Tstatus;
	var TknowTmpId;
	var store = this.initData();
	var sm = new Ext.grid.CheckboxSelectionModel();
	var cm = new Ext.grid.ColumnModel({
		columns : [sm, {
					header : __ukKnowTypeKnowTypeId,
					dataIndex : 'knowTypeId',
					hidden : true
				}, {
					header : __ukKnowTypeName,
					sortable : true,
					dataIndex : 'name',
					width : 80
//					,renderer : function(value) {
//						return ZZJGLX0001.get(value);
//					}
				},{
					header : '上级分类',
//					dataIndex : 'ukKnowTemplate.beginTime',
					dataIndex : 'parentName',
					sortable : false,
					menuDisabled : false
//					,
//					tooltip : __ukKnowTypeKnowTmpId,
//					renderer : function(value) {
//						TknowTmpId = value;
//						return value;
//					}
				},{

					header : '访问类型',
					sortable : true,
					dataIndex : 'grantAccess'
					,renderer : function(value) {
						return KNOW_FWGL.get(value);
					}
				},{
					header : __ukKnowTypeComMent,
					sortable : true,
					dataIndex : 'comMent',
					width : 120
				},   {
					header : '模板',//__ukKnowTypeParentId
					sortable : true,
					dataIndex : 'ukKnowTemplate',
					renderer : function(value) {
						if(value==null){
						  return '';
						}else{
						  return value.tmpName;
						}
					},
					width : 80
				},
//				{
//					header : __ukKnowTypeUpdateTime,
//					sortable : true,
//					dataIndex : 'updateTime',
//					width : 60
//				}, 
//				{
//					header : __ukKnowTypeUserid,
//					sortable : true,
//					dataIndex : 'userid',
//					width : 60
//				},
				{
					header : __ukKnowTypeKnowTypeStatus,
					dataIndex : 'knowTypeStatus'
					,renderer : function(value) {
						Tstatus = value;
						return KNOW_STATUS.get(value);
					},
					width : 50
				},
//				{
//
//					header : __ukKnowTypeCreateBy,
//					sortable : true,
//					dataIndex : 'createBy',
//					width : 60
//				
//				},{
//
//					header : __ukKnowTypeCreateDate,
//					sortable : true,
//					dataIndex : 'createDate',
//					width : 60
//				
//				},{
//
//					header : __ukKnowTypeUpdateBy,
//					sortable : true,
//					dataIndex : 'updateBy',
//					width : 60
//				
//				},{
//
//					header : __ukKnowTypeUpdateDate,
//					sortable : true,
//					dataIndex : 'updateDate',
//					width : 60
//				
//				},
//				{
//
//					header : "创建人",
//					sortable : true,
//					dataIndex : 'userid',
//					width : 60
//				
//				},
				{
					header : '管理',//__menuViewUkKnowTypes
					dataIndex : 'knowTypeId',
					sortable : true,
					width : 40,
					renderer : function(knowTypeId, metadata, record, rowIndex,
							colIndex, store) {
						var status = record.data.knowTypeStatus;
						if (knowTypeId) {
							var str = '';
//							if (isGranted('_UknowTypeDel')) {
								if(status != 1){
									str += '&nbsp;<button title="启用" value=" " class="btn-setting" onclick="UkKnowTypeView.remove('
									+ knowTypeId + ',1' + ')"></button>';
								} else {
									str += '<button title="停用" value=" " class="btn-del" onclick="UkKnowTypeView.remove('+ knowTypeId + ',2' + ')"></button>';
								}
								
//							} else {
//								str += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
//							}
//							if (isGranted('_UknowTypeEdit')) {
								str += '&nbsp;<button title="编辑" value=" " class="btn-edit" onclick="UkKnowTypeView.edit('+ knowTypeId +')"></button>';
//							} else {
//								str += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
//							}
							
							return str;
						}
					}
				}],
		defaults : {
			sortable : true,
			menuDisabled : false,
			width : 100
		}
//		,
//		listeners : {
//			hiddenchange : function(cm, colIndex, hidden) {
//				saveConfig(colIndex, hidden);
//			}
//		}
	});

	var grid = new Ext.grid.GridPanel({
				// TODO grid数据展示
				region : 'center',
				id : 'UkKWTypeView',
				tbar : new Ext.Toolbar({
							defaultType : 'button',
							items : [ '->',{
										text : '增加',
										iconCls : 'btn-add',
										handler : function() {
//											var node = Ext.getCmp('ukKnowTypeTreePanel').
//												getSelectionModel().getSelectedNode();
//											if(node == null){
//											UkKnowTypeView.add(0);}else{
//												UkKnowTypeView.add(node.id);
//											}//提供给grid的操作
//											var grid = Ext.getCmp('ukKnowTypeTreePanel');
											var node = Ext.getCmp('ukKnowTypeTreePanel').getSelectionModel().getSelectedNode();
											if (node == null) {
												Ext.ux.Toast.msg("操作信息", "请选择知识分类!");
												return;
											}else {
													UkKnowTypeView.add(node.id);
											}
//											if (rows != null && rows.length == 1) {
////												var ids = new Array();
////												for (var i = 0; i < rows.length; i++)
////												ids.push(rows[i].data.knowTypeId);
//												UkKnowTypeView.add(rows[0].data.knowTypeId);
//											} else if(rows.length < 1){
//												UkKnowTypeView.add(0);
//											} else {
//												Ext.ux.Toast.msg(__actioninfo, __ukKnowTypeCopyTishi);
//											}
										}
									},{
										text : '启用',
										iconCls : 'btn-setting',
										handler : function() {
											UkKnowTypeView.multiStart();
										}
									},{
										text : '复制', // __ukKnowTypecopy,
										iconCls : 'assets-type',
										handler : function(){
											UkKnowTypeView.copyto();
											//UkKnowTypeView.copynode();
										}
									}
									,{
										text : '注销', //
										iconCls : 'btn-del',
										handler : function(){
											var grid = Ext.getCmp('UkKWTypeView');
											var rows = grid.getSelectionModel().getSelections();
											if (rows != null && rows.length > 0) {
												var ids = '';
												for (var i = 0; i < rows.length; i++){
													ids+=rows[i].data.knowTypeId;
													ids+=',';
												}
												UkKnowTypeView.remove(ids,2);
											} else {
												Ext.ux.Toast.msg('操作提示', '请选择需要注销的数据!');
											}
											
											
											//UkKnowTypeView.movenode();
										}
									}
									]
						}),
				height : 800,
				title : '知识分类', //__ukKnowTypeListHeading,
				store : store,
				shim : true,
				trackMouseOver : true,
				disableSelection : false,
				loadMask : true,
				cm : cm,
				sm : sm,
				stateful:true,  
			    stateId: 'cookieUkKWTypeViewgrid',
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
			UkKnowTypeView.edit(rec.data.knowTypeId);
		});
	}
	store.load({
				params : {
					start : 0,
					limit : 25
				}
			});

	var treePanel = new Ext.tree.TreePanel({
				// TODO treePanel[机构信息列表]
				region : 'west',
				id : 'ukKnowTypeTreePanel',
				title : '知识分类列表',//__ukKnowTypeListHeading,
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
							url : __ctxPath + '/know/listUkKnowType.do'
						}),
				root : new Ext.tree.AsyncTreeNode({
							expanded : true
						}),
				rootVisible : false,
				listeners : {
					'click' : UkKnowTypeView.clickNode
				}
			}); // end of this treePanel

//	if (isGranted('_UknowTypeAdd') || isGranted('_UknowTypeEdit')
//			|| isGranted('_UknowTypeDel')) {
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
//		if (isGranted('_UknowTypeAdd')) {
			treeMenu.add({
						text : __create,
						iconCls : 'btn-add',
						scope : this,
						handler : createNode
					});
//		}
//		if (isGranted('_UknowTypeEdit')) {
			treeMenu.add({
						text : __edit,
						iconCls : 'btn-edit',
						scope : this,
						handler : editNode
					});
//		}
//		if (isGranted('_UknowTypeDel')) {
			treeMenu.add({
						text : __ukKnowTingyong,
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
		UkKnowTypeView.add(nodeId);
	}
	
	
	function deteleNode() {
		var knowTypeId = selected.id;
		if (knowTypeId > 0) {
			UkKnowTypeView.remove(knowTypeId, 2);
		} else {
			Ext.ux.Toast.msg(__actioninfo, "默认根分类不能被删除");//树形暂不提供增删改，暂时不国际化
		}
	}
	function editNode() {
		var knowTypeId = selected.id;
		if (knowTypeId > 0) {
			UkKnowTypeView.edit(knowTypeId);
		} else {
			Ext.ux.Toast.msg(__actioninfo, "默认根分类不能修改！");
		}

	}

	var panel = new Ext.Panel({
				// TODO panel UkKnowTypeView总面板
				id : 'UkKnowTypeView',
				title : '知识分类列表',//__ukKnowTypeListHeading,
				closable : true,
				iconCls : 'menu-dutyRegister',
				layout : 'border',
				items : [treePanel, grid],//searchPanel
				keys : [{
							key : Ext.EventObject.ESC,
							fn : UkKnowTypeView.reset,
							scope : this
						}, {
							key : Ext.EventObject.ENTER,
							fn : UkKnowTypeView.search,
							scope : this
						}]
			});
	return panel;
};

/**
 * Store对象
 */
UkKnowTypeView.prototype.initData = function() {
	var store = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
//							url : __ctxPath + '/know/list_child_detailUkKnowType.do'  //list_childDepUlDepartment.do
							url : __ctxPath + '/know/treeListUkKnowType.do'  //list_childDepUlDepartment.do
						}),
				reader : new Ext.data.JsonReader({
							root : 'result',
							totalProperty : 'totalCounts',
							fields : [ {
								name : 'knowTypeId',
								type : 'int'
							}, 'knowTmpId','ukKnowType', 'name', 'comMent', 'parentId', 'updateTime',
									'userid', 'knowTypeStatus', 'knowSort', 'createBy',
									'updateBy', 'createDate', 'updateDate' ,'ukKnowTemplate','parentName','grantAccess']
						}),
				remoteSort : true
			});
	//store.setDefaultSort('id', 'desc');
	return store;
};

UkKnowTypeView.add = function(knowTypeId) {
		var node = Ext.getCmp('ukKnowTypeTreePanel').getSelectionModel().getSelectedNode();
		var text = node.text;
		if (knowTypeId > 0) {
			new UkKnowTypeForm({//引用UkKnowTypeForm.js line9 声明的变量名
				nodeId : knowTypeId,
				nodeText : text
			}).show();
		} else {
			new UkKnowTypeForm({
				nodeId : 0,
				nodeText : text
			}).show();
		}
		
		
//		Ext.getCmp('ukKnowTypeTreePanel').root.reload();
//		Ext.getCmp('UkKWTypeView').getStore().reload();
};

UkKnowTypeView.edit = function(knowTypeId) {
	var ukknowtypeFormWin = Ext.getCmp('UkKnowTypeFormWin');
	if (ukknowtypeFormWin == null) {//如果框不存在，则生成一个，然后获取它
		//TODO 传递id给form页
		new UkKnowTypeForm({
			knowTypeId : knowTypeId
//			knowTypeStatus : knowTypeStatus,
//			knowTmpId : knowTmpId
		}).show();
		ukknowtypeFormWin = Ext.getCmp('UkKnowTypeFormWin');
	}
	
//	var tabs = Ext.getCmp('centerTabPanel');
//	var aForm = Ext.getCmp('UkKnowTypeFormWin');
//	if (aForm != null) {
//		tabs.remove('UkKnowTypeFormWin');
//	}
//	aForm = new UkKnowTypeForm({
//		knowTypeId : knowTypeId
//	});
//	aForm.setTitle('模板:' + knowTypeId + '详情');
//	tabs.add(aForm);
//	tabs.activate(aForm);
//	ukknowtypeFormWin.formPanel.load({
//		url : __ctxPath + '/know/detailUkKnowType.do',
//		params : {
//			knowTypeId : knowTypeId	
//		},
//		method : 'post',
//		deferredRender : true,
//		layoutOnTabChange : true,
//		success : function() {
//
//		},
//		failure : function() {
//			Ext.ux.Toast.msg('编辑', '载入失败');
//		}
//	});
	
//	Ext.getCmp('ukKnowTypeTreePanel').root.reload();
//	Ext.getCmp('UkKWTypeView').getStore().reload();
};

UkKnowTypeView.multiStart = function() {
	var grid = Ext.getCmp('UkKWTypeView');
	var rows = grid.getSelectionModel().getSelections();
	if (rows != null && rows.length > 0) {
		var ids = new Array();
		for (var i = 0; i < rows.length; i++)
			ids.push(rows[i].data.knowTypeId);
		UkKnowTypeView.start_ids(ids);
	} else
		Ext.ux.Toast.msg(__actioninfo,'对不起，请选择你要启用的数据！');
};

UkKnowTypeView.start_ids = function(_ids) {
	Ext.Msg.confirm(__actioninfo,'你确定要启用知识分类吗?', function(btn) {
				if (btn == 'yes') {
					Ext.Ajax.request({
								url : __ctxPath + '/know/multiStartUkKnowType.do',
								method : 'post',
								params : {
									ids : _ids
								},
								success : function(response) {
									Ext.ux.Toast.msg(__actioninfo, '您已经成功启用您所选的知识分类。');
									Ext.getCmp('UkKWTypeView').getStore().reload();
									Ext.getCmp('ukKnowTypeTreePanel').root.reload();
								},
								failure : function() {
									Ext.ux.Toast.msg(__actioninfo, '启用知识分类失败。');
								}
							});
				}
			});
};

/**
 * 停用/启用知识分类
 */
UkKnowTypeView.remove = function(knowTypeId, opts) {//opts: 0--未启用； 1--启用；2--停止
	var infos = '';
	if(opts == 1){
		infos = '你确定要启用该知识分类吗？';
	} else {
		infos = __deleteTishi;
	}
	Ext.Msg.confirm(__actioninfo, infos, function(btn) {
		if (btn == 'yes') {
			Ext.Ajax.request({
				url : __ctxPath + '/know/removeUkKnowType.do?knowTypeId='
					+ knowTypeId + '&opts=' + opts,
				success : function(result, request) {
					var res = Ext.util.JSON.decode(result.responseText);
					if (res.success == false) {
						Ext.ux.Toast.msg(__actioninfo, res.message);
					} else {
                        if(opts == 2){
						  Ext.ux.Toast.msg(__actioninfo, __ukKnowTypeMutiDeleted);
                        }else{
                          Ext.ux.Toast.msg(__actioninfo, '你已成功启用该分类。');
                        }
					}
					Ext.getCmp('ukKnowTypeTreePanel').root.reload();
					Ext.getCmp('UkKWTypeView').getStore().reload();
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
UkKnowTypeView.clickNode = function(node) {
	UkKnowTypeView.select(node);
};

/**
 * 条件查询
 * 
 * @param node
 */
UkKnowTypeView.select = function(node) {
	var users = Ext.getCmp('UkKWTypeView');
	users.setTitle(node.text + '知识分类列表');
//	users.title = node.text + '--子机构列表';
	var store = users.getStore();
	store.url = __ctxPath + '/know/list_child_detailUkKnowType.do';
	var paramObj = {
		start : 0,
		limit : 25
	};
	if (node != null && node.id > 0) {
		paramObj["knowTypeId"] = node.id;
	}
	store.reload({
				params : paramObj
	});
};

/**
 * 转移node
 */
UkKnowTypeView.movenode = function(){
	var grid = Ext.getCmp('UkKWTypeView');
	var rows = grid.getSelectionModel().getSelections();
	if (rows != null && rows.length >= 1) {
//		var ids = new Array();
//		for (var i = 0; i < rows.length; i++)
//		ids.push(rows[i].data.knowTypeId);
		var ids = '';
		for(var i=0; i<rows.length; i++) ids+= rows[i].data.knowTypeId + ",";
		UkKnowTypeView.changeTypeNode(ids, 0);
		
	} else
		Ext.ux.Toast.msg(__actioninfo,'请选择转移的数据！');
};
UkKnowTypeView.copynode = function(){
	var grid = Ext.getCmp('UkKWTypeView');
	var rows = grid.getSelectionModel().getSelections();
	if (rows != null && rows.length >= 1) {
//		var ids = new Array();
//		for (var i = 0; i < rows.length; i++)
//		ids.push(rows[i].data.knowTypeId);
		var ids = '';
		for(var i=0; i<rows.length; i++) ids+= rows[i].data.knowTypeId + ",";
		UkKnowTypeView.changeTypeNode(ids, 1);
		
	} else
		Ext.ux.Toast.msg(__actioninfo,'请选择一个复制的数据！');
};

UkKnowTypeView.changeTypeNode = function(ids, actionMode){//actionMode : 0--move ; 1--copy

	var w=new Ext.Window({
//      contentEl:"win",//主体显示的html元素，也可以写为el:"win"
      width:300,
      height:200,
      id : 'movenode',
      title:"转移分类",
      items : new Ext.FormPanel({
    	  	layout : 'form',
			bodyStyle : 'padding:10px',
			border : false,
			autoScroll : true,
			id : 'MoveNodeForm',
			defaults : {
				anchor : '96%,96%'
			},
			defaultType : 'textfield',
			items : [{
        	  fieldLabel : '当前节点编号',
        	  id : 'move_knowTypeId',
        	  readOlny : true,
        	  value : ids != null ? ids : ''
//        	  listeners : {
//        		  load : function(){
//        			  alert(ids);
//        			  if(ids!=null){
//        				  var idString;
//        				  for(var id in ids){
//        					  idString += id + ',';
//        				  }
//        				  idString = idString.substring(0,idString.length-1);
//        				  Ext.getCmp('move_knowTypeId').setValue(idString);
//        			  }
//        		  }
//        	  }
          },{
        	  	fieldLabel : '目标父亲节点',
        	  	id : 'all_parentId',
        	  	displayField : 'knowTypeIdName',
				valueField : 'knowTypeId',
				xtype : 'combo',
				mode : 'local',
				allowBlank : false,
				editable : false,
				triggerAction : 'all',
				store : new Ext.data.SimpleStore(
						{
							autoLoad : true,
							url : __ctxPath
									+ '/know/comboUkKnowType.do',
							fields : [
									'knowTypeId',
									'knowTypeIdName' ],
							listeners : {
								load : function() {
									var combo = Ext.getCmp('all_parentId');
									var store = combo.getStore();
									var rows = [];// 定义数组
									for ( var i = 0; i < store
											.getCount(); i++) { // store.getCount()为store的长度
										if (store.getAt(i).data['knowTypeId'] == combo.getValue()) {
											combo.setValue(store.getAt(i).data['knowTypeIdName']);
//											Ext.getCmp('move_parentId').setValue(store.getAt(i).data['knowTypeId']);
											break;
										}
									}
								}
							}
						}),
						listeners : {
//							select : function(cbo,record, index){
//								Ext.getCmp('move_parentId').setValue(cbo.value);
//							}
						}
          
          }
          ]
    	  
      
      }),
    	  
      modal : true,
      buttons : [{
      			text : __save,
      			iconCls : 'btn_save',
      			scope : this,
      			handler : function(){
      				UkKnowTypeView.MoveSave(ids, actionMode);
      			}
      			},{
      			text : __cancel,
      	        iconCls : 'btn_cancel',
      	        handler : function(){
      	        	UkKnowTypeView.MoveCancel();
      	        }
      			}
                 ]
      
   });
	w.show();
};
/**
 * @author:cf0666@gmail.com
 * @class UkKnowTypeView
 * @extends Ext.Panel
 * @description [UkKnowType]管理
 * @company 优创融联科技
 * @createtime:
 */
UkKnowTypeView.MoveSave = function(ids, actionMode){
	Ext.Ajax.request({
		url : __ctxPath + '/know/movenodeUkKnowType.do',
		params : {
			'ukKnowType.ParentId' : Ext.getCmp('all_parentId').getValue(),
			newknowTypeId : ids,
			actionMode : actionMode
		},
		method : 'post',
		success : function(res){
			Ext.getCmp('movenode').close();
			Ext.getCmp('ukKnowTypeTreePanel').root.reload();
			Ext.getCmp('UkKWTypeView').getStore().reload();
			actionMode == 0 ? Ext.ux.Toast.msg('转移', '转移成功') : Ext.ux.Toast.msg('复制', '复制成功');
		}
	});
};
UkKnowTypeView.MoveCancel = function(){
	Ext.getCmp('movenode').close();
};

UkKnowTypeView.moveto = function(){
	var grid = Ext.getCmp('UkKWTypeView');
	var rows = grid.getSelectionModel().getSelections();
	
	var ids = '';
	if (rows != null && rows.length >= 1) {
		for(var i=0; i<rows.length; i++) ids+= rows[i].data.knowTypeId + ",";
		var _moveFormPanel = new UkKnowTypeView.moveFormPanel(ids,0);
	}else {
		Ext.ux.Toast.msg(__actioninfo,'请选择转移的数据！');
	}

	var selectFolder = new Ext.Window({
				x:350,
				y:100,
				width : 340,
				height : 300,
				title : '移动知识类别',
				iconCls : 'btn-mail_move',
				modal : true,
				buttonAlign : 'center',
				plain : true,
				layout : 'fit',
				border : false,
				bodyStyle : 'padding:5px;',
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
									Ext.getCmp('ukKnowTypeTreePanel').root.reload();
									Ext.getCmp('UkKWTypeView').getStore().reload();
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
UkKnowTypeView.moveFormPanel = function(_id,actionModel) {
	var treePanel = new Ext.tree.TreePanel({
		// id:'',
		title : '请选择目标分类',
		
		loader : new Ext.tree.TreeLoader({
					url : __ctxPath + '/know/listUkKnowType.do'
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
		url : __ctxPath + '/know/movenodeUkKnowType.do',
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
UkKnowTypeView.copyto = function(){
	var grid = Ext.getCmp('UkKWTypeView');
	var rows = grid.getSelectionModel().getSelections();
	
	var ids = '';
	
	if (rows != null && rows.length >= 1) {
		for(var i=0; i<rows.length; i++) ids+= rows[i].data.knowTypeId + ",";
		var _moveFormPanel = new UkKnowTypeView.moveFormPanel(ids,1);
	}else {
		Ext.ux.Toast.msg(__actioninfo,'请选择复制的数据！');
	}
	
	var selectFolder = new Ext.Window({
				x:350,
				y:100,
				width : 340,
				height : 300,
				title : '复制知识类别',
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
									Ext.getCmp('ukKnowTypeTreePanel').root.reload();
									Ext.getCmp('UkKWTypeView').getStore().reload();
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
UkKnowTypeView.copyFormPanel = function(_id,actionModel) {
	var treePanel = new Ext.tree.TreePanel({
				// id:'',
				title : '请选择目标类别',
				loader : new Ext.tree.TreeLoader({
//							url : __ctxPath + '/communicate/listMailFolder.do'
							url : __ctxPath + '/know/listUkKnowType.do'
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
				url : __ctxPath + '/know/movenodeUkKnowType.do',
				layout : 'table',
				id : 'moveFolderForm',
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
							text : '复制到:'
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