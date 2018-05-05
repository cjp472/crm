/**
 * @author:
 * @class UlUsergroupView
 * @extends Ext.Panel
 * @description 用户组管理
 * @company 优创融联科技
 * @createtime:
 */
UlUsergroupView = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		UlUsergroupView.superclass.constructor.call(this, {
			id : 'UlUsergroupViewWin',
			title : '用户组管理',
			region : 'center',
			layout : 'border',
			items : [ this.searchPanel, this.leftPanel, this.gridPanel ]
		});
	},// end of constructor
	// 初始化组件
	initUIComponents : function() {
		// 初始化搜索条件Panel
		this.searchPanel = new HT.SearchPanel( {
			layout : 'form',
//			region : 'north',
			id : 'UlUsergroupSearchPanel',
			colNums : 5,
			items : [ {
//				fieldLabel : '名称',
//				name : 'Q_usergroupName_S_EQ',
//				flex : 1,
//				xtype : 'textfield'
//			}, {
				fieldLabel : '上级节点',
				name : 'parentid',
				flex : 1,
				id : 'parentid',
				xtype : 'hidden'
//			}, {
//				fieldLabel : '上级组',
//				name : 'Q_parentId_L_EQ',
//				flex : 1,
//				xtype : 'numberfield'
//			}, {
//				fieldLabel : '备注',
//				name : 'Q_comment_S_EQ',
//				flex : 1,
//				xtype : 'textfield'
//			}, {
//				fieldLabel : '上级',
//				name : 'Q_usergroupLevel_L_EQ',
//				flex : 1,
//				xtype : 'numberfield'
//			}, {
//				fieldLabel : '路径',
//				name : 'Q_path_S_EQ',
//				flex : 1,
//				xtype : 'textfield'
			}]
//			,
//			buttons : [ {
//				text : '查询',
//				scope : this,
//				iconCls : 'btn-search',
//				handler : this.search
//			}, {
//				text : '重置',
//				scope : this,
//				iconCls : 'btn-reset',
//				handler : this.reset
//			} ]
		});// end of searchPanel

		// 用户组树开始
		this.leftPanel = new Ext.Panel({
					region : 'west',
					layout : 'anchor',
					collapsible : true,
					autoScroll : true,
					id : 'UlUsergroupTreePanel',
					title : '用户组信息列表',
					split : true,
					width : 200,
					items : [{
						xtype : 'treePanelEditor',
						id : 'UlUsergroupTree',
						split : true,
						rootVisible : false,
						border : false,
//						height : 380,
						autoHeight : true,
						showContextMenu:false,
//						autoScroll : true,
						scope : this,
						url : __ctxPath + '/xitong/treeLoadUlUsergroup.do',
						onclick : function(node) {
							var proTypeId = node.id;
							Ext.getCmp('UlUsergroupSearchPanel').getForm().findField('parentid').setValue(proTypeId);
							Ext.getCmp('UlUsergroupViewWin').search();
						}
					}]
				});
		// 用户组树结束
		
		this.topbar = new Ext.Toolbar( {
			items : [ '->', {
				iconCls : 'btn-del',
				text : '注销',
				xtype : 'button',
				scope : this,
				handler : function() {
						var grid = Ext.getCmp("UlUsergroupGrid");

						var selectRecords = grid.getSelectionModel().getSelections();
						if (selectRecords.length == 0) {
							Ext.ux.Toast.msg("信息", "请选择要注销的记录！");
							return;
						}
						var ids = Array();
						var idsUser = '';
						var idsRole = '';
						for (var i = 0; i < selectRecords.length; i++) {
							ids.push(selectRecords[i].data.pkUsergroupId);
							var groupId = selectRecords[i].data.pkUsergroupId;
							Ext.Ajax.request({
								url : __ctxPath + '/xitong/selectedUsersUlUsergroup.do',
								params : {
									pkUsergroupId : groupId
								},
								async:true,
								scope:this,
								method : 'post',
								success : function(response) {
									idsUser = Ext.util.JSON.decode(response.responseText);
									if(idsUser == null || idsUser == ''){
										Ext.Ajax.request({
											url : __ctxPath + '/xitong/selectedRolesUlUsergroup.do',
											params : {
												pkUsergroupId : groupId
											},
											async:true,
											scope:this,
											method : 'post',
											success : function(response) {
												idsRole = Ext.util.JSON.decode(response.responseText);
												UlUsergroupView.isDelete(idsUser,idsRole,ids);
					                        }
										});
									} else {
										UlUsergroupView.isDelete(idsUser,idsRole,ids);
									}
		                        }
							});

						}
					}
			},'->',{
				iconCls : 'btn-add',
				text : '添加',
				xtype : 'button',
				scope : this,
				handler : this.createRs
			}]
		});

		this.gridPanel = new HT.GridPanel( {
			region : 'center',
			tbar : this.topbar,
			//使用RowActions
			rowActions : true,
			id : 'UlUsergroupGrid',
			url : __ctxPath + "/xitong/listUlUsergroup.do",
			fields : [ {
				name : 'pkUsergroupId',
				type : 'int'
			}, 'usergroupName', 'parentId', 'comment' , 'usergroupLevel' , 'path',
			'isUpdate','isDelete','createDate','updateDate','createBy','updateBy','isHidden'],
			columns : [ {
				header : '用户组内码',
				dataIndex : 'pkUsergroupId',
				hidden : true
			}, {
				header : '名称',
				sortable : true,
				dataIndex : 'usergroupName'
//			}, {
//				header : '上级组',
//				dataIndex : 'parentId'
			}, {
				header : '备注',
				dataIndex : 'comment'
			}, {
				header : '状态',
				dataIndex : 'usergroupLevel',
				renderer : function(value) {
					return UG001.get(value);
				}
//			}, {
//				header : '注销标记',
//				dataIndex : 'isDelete',
//				hidden : true,
//				renderer : function(value) {
//					return value == '0'?'<img title="活动" src="'+ __ctxPath +'/images/flag/customer/effective.png"/>':'<img title="注销" src="'+ __ctxPath +'/images/flag/customer/invalid.png"/>';
//				}
			}, {
				header : '创建时间',
				hidden : true,
				dataIndex : 'createDate'
			}, {
				header : '修改时间',
				hidden : true,
				dataIndex : 'updateDate'
			}, {
				header : '创建人',
				hidden : true,
				dataIndex : 'createBy'
			}, {
				header : '修改人',
				hidden : true,
				dataIndex : 'updateBy'
//			}, {
//				header : '是否隐藏',
//				hidden : true,
//				dataIndex : 'isHidden'
			}, new Ext.ux.grid.RowActions( {
				header : '管理',
				width : 25,
				actions : [ {
					iconCls : 'btn-edit',
					qtip : '编辑',
					style : 'margin:0 3px 0 3px'
				}, {
					iconCls : 'btn-del',
					qtip : '注销',
					style : 'margin:0 3px 0 3px'
//				}, {
//					iconCls : 'btn-setting',
//					qtip : '启用用户组',
//					style : 'margin:0 3px 0 3px'
				}],
				listeners : {
					scope : this,
					'action' : this.onRowAction
				}
			}) ]
		//end of columns
				});

		this.gridPanel.addListener('rowdblclick', this.rowClick);
		
	},// end of the initComponents()
	//重置查询表单
	reset : function() {
		this.searchPanel.getForm().reset();
	},
	//按条件搜索
	search : function() {
		$search( {
			searchPanel : this.searchPanel,
			gridPanel : this.gridPanel
		});
	},
	//GridPanel行点击处理事件
	rowClick : function(grid, rowindex, e) {
		var tabs = Ext.getCmp('centerTabPanel');
		grid.getSelectionModel().each(function(rec) {
			var usergroupName = rec.data.usergroupName;
			var rform = Ext.getCmp('UlUsergroupForm');
			if (rform == null){
				rform = new UlUsergroupForm(usergroupName + "详细信息",rec.data.pkUsergroupId,rec.data.parentId,true);
				tabs.add(rform);
			}else {
				tabs.remove('UlUsergroupForm');
				rform = new UlUsergroupForm(usergroupName + "详细信息",rec.data.pkUsergroupId,rec.data.parentId,true);
				tabs.add(rform);
			}
			
			tabs.activate(rform);
			rform.form.load({
				url : __ctxPath + '/xitong/getUlUsergroup.do',
				params : {
					pkUsergroupId : rec.data.pkUsergroupId
				},
				method : 'post',
				waitMsg : '正在载入数据...',
				success : function(edit, o) {
				},
				failure : function(edit, o) {
					Ext.ux.Toast.msg('编辑失败', '载入失败' );
//					alert(o.response.responseText);
				}
			});
		});
		
//		grid.getSelectionModel().each(function(rec) {
//			tabs.add(new UlUsergroupForm("编辑用户组", rec.data.pkUsergroupId));
//		});
	},
	//创建记录
	createRs : function() {
		//new UlUsergroupForm().show();
		var tabs = Ext.getCmp('centerTabPanel');
		var aForm = Ext.getCmp('UlUsergroupForm');
		if (aForm != null) {
			tabs.remove('UlUsergroupForm');
		}
		aForm = new UlUsergroupForm("增加用户组");
		tabs.add(aForm);
		tabs.activate(aForm);
	},
	//按ID删除记录
	removeRs : function(id) {
		var idsUser = '';
		var idsRole = '';
		Ext.Ajax.request({
		url : __ctxPath + '/xitong/selectedUsersUlUsergroup.do',
		params : {
			pkUsergroupId : id
		},
		async:true,
		scope:this,
		method : 'post',
		success : function(response) {
			idsUser = Ext.util.JSON.decode(response.responseText);
			if(idsUser == null || idsUser == ''){
				Ext.Ajax.request({
					url : __ctxPath + '/xitong/selectedRolesUlUsergroup.do',
					params : {
						pkUsergroupId : id
					},
					async:true,
					scope:this,
					method : 'post',
					success : function(response) {
						idsRole = Ext.util.JSON.decode(response.responseText);
						UlUsergroupView.isDelete(idsUser,idsRole,id);
                    }
				});
			} else {
				UlUsergroupView.isDelete(idsUser,idsRole,id);
			}
        }
	});
	},
	startRs : function(id) {
		UlUsergroupView.isStart(id);
	},
	//把选中ID删除
//	removeSelRs : function() {
//		$delGridRs( {
//			url : __ctxPath + '/xitong/multiDelUlUsergroup.do',
//			grid : this.gridPanel,
//			idName : 'pkUsergroupId'
//		});
//	},
	//编辑Rs
	editRs : function(record) {
		// 只允许有一个编辑窗口
		var tabs = Ext.getCmp('centerTabPanel');
		var eform = Ext.getCmp('UlUsergroupForm');
		
		var pkUsergroupId = record.data.pkUsergroupId;
		var usergroupName = record.data.usergroupName;
		var groupParentId = record.data.parentId;
		
		if (eform == null) {
			eform = new UlUsergroupForm(usergroupName + "详细信息",pkUsergroupId,groupParentId,true);
			tabs.add(eform);
		} else {
			tabs.remove('UlUsergroupForm');
			eform = new UlUsergroupForm(usergroupName + "详细信息",pkUsergroupId,groupParentId,true);
			tabs.add(eform);
		}
		tabs.activate(eform);
		eform.form.load({
			url : __ctxPath + '/xitong/getUlUsergroup.do',
			params : {
				pkUsergroupId : pkUsergroupId
			},
			method : 'post',
			waitMsg : '正在载入数据...',
			success : function(edit, o) {
				Ext.getCmp('UlUsergroupGrid').getStore().reload();//重新加载list数据
				Ext.getCmp('UlUsergroupTree').root.reload();//树重新加载list数据
			},
			failure : function(edit, o) {
				Ext.ux.Toast.msg('编辑失败', '编辑失败' );
			}
		});
	},
	//行的Action
	onRowAction : function(grid, record, action, row, col) {
		switch (action) {
		case 'btn-del':
			this.removeRs.call(this, record.data.pkUsergroupId);
			break;
		case 'btn-edit':
			this.editRs.call(this, record);
			break;
		default:
			this.startRs.call(this, record.data.pkUsergroupId);
			break;
		}
	}
});
UlUsergroupView.isStart = function(ids) {
	Ext.Ajax.request({
		url : __ctxPath + '/xitong/startUlUsergroup.do',
		method : 'post',
		params : {
			ids : ids
		},
		success : function(response) {
			var result = Ext.util.JSON.decode(response.responseText);
			Ext.ux.Toast.msg("操作信息", result.message);
			Ext.getCmp('UlUsergroupGrid').getStore().reload();
			Ext.getCmp('UlUsergroupTree').root.reload();
		},
		failure : function() {
			Ext.ux.Toast.msg("操作信息", "用户组启用失败");
		}
	});
};
UlUsergroupView.remove = function(_ids) {
	Ext.Msg.confirm('注销操作', '你确定要注销该用户组吗?', function(btn) {
		if (btn == 'yes') {
			Ext.Ajax.request({
				url : __ctxPath + '/xitong/multiDelUlUsergroup.do',
				method : 'post',
				params : {
					ids : _ids
				},
				success : function(response) {
					var result = Ext.util.JSON.decode(response.responseText);
					Ext.ux.Toast.msg("操作信息", result.message);
					Ext.getCmp('UlUsergroupGrid').getStore().reload();
					Ext.getCmp('UlUsergroupTree').root.reload();
				},
				failure : function() {
					Ext.ux.Toast.msg("操作信息", "用户组注销失败");
				}
			});
		}
	});

};

UlUsergroupView.isDelete = function(_user,_role,_ids){
	if (_user == '' && _role == '') {
		UlUsergroupView.remove(_ids);
	} else {
		Ext.ux.Toast.msg("信息", "不允许注销!该用户组下还有用户或角色,请核实!");
	}
};
