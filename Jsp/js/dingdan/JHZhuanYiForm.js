JHZhuanYiForm = Ext.extend(Ext.Window, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		var panel_yuangong = this.initPanel();
		this.panel_bumen = this.initpanel_bumen();
		JHZhuanYiForm.superclass.constructor.call(this, {
			id : 'JHZhuanYiFormWin',
			layout:'border',
			items : [this.panel,{
				region:'center',
				border:false,
				items:[this.panel_bumen,panel_yuangong]
			}],
			width : 800,
			height : 600,
			modal : true,
			maximizable : true,
			title : '机会转移',
			buttonAlign : 'center',
			buttons : [{
				text : __save,
				iconCls : 'btn-save',
				scope : this,
				handler : this.save
			}, {
				text : __reset,
				iconCls : 'btn-reset',
				scope : this,
				handler : this.reset
			}, {
				text : __cancel,
				iconCls : 'btn-cancel',
				scope : this,
				handler : this.cancel
			}]
		});
	},// end of the constructor
	// 初始化组件
	initUIComponents : function() {
		this.panel = new Ext.FormPanel({
			border : false,
			labelAlign : 'right',
			region:'north',
			height:50,
			labelWidth : 50,
			bodyStyle : 'overflow-y:auto;padding:10px;background-color:#fff',
			items : [{
				layout : 'column',
				border : false,
				items : [{
					columnWidth : .5,
					border : false,
					xtype : 'radio',
					name:'jhbumenradio',
					checked:true,
					boxLabel : '转移到部门',
					listeners:{
						'check':function(radio,checked){
							if(checked){
								Ext.getCmp('yuangongPanel').hide();
								Ext.getCmp('bumenPanel').show();
							}
						}
					}
				}, {
					columnWidth : .5,
					border : false,
					name:'jhbumenradio',
					xtype : 'radio',
					boxLabel : '转移到员工',
					listeners:{
						'check' : function(radio,checked){
							if(checked){
								Ext.getCmp('yuangongPanel').show();
								Ext.getCmp('bumenPanel').hide();
							}
							
						}
					}
				}]
			}]
		});

	},// end of the initcomponents
	initPanel : function() {
		// //////////////store[获取数据] start////////////////////////////
	var store = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
			url : __ctxPath + '/xitong/selectUlEmployee.do'
		}),
		reader : new Ext.data.JsonReader({
			root : 'result',
			totalProperty : 'totalCounts',
			id : 'id',
			fields : [{
				name : 'userId',
				type : 'int'
			}, 'fullname', 'sex', 'useid', 'zhiwei', 'ulDepartment', 'userNo']
		}),
		remoteSort : true
	});
	store.setDefaultSort('id', 'desc');
	var sm = new Ext.grid.CheckboxSelectionModel();
	var cm = new Ext.grid.ColumnModel({
		columns : [sm, new Ext.grid.RowNumberer(), {

			header : "工号",
			dataIndex : 'userNo',
			width : 60

		}, {
			header : "姓名",
			dataIndex : 'fullname',
			width : 60
		}, {
			header : "性别",
			dataIndex : 'sex',
			width : 60,
			renderer : function(value) {
				return XB001.get(value);
			}
		}, {

			header : "职位",
			dataIndex : 'zhiwei',
			width : 60,
			renderer : function(value) {
				return ZW001.get(value);
			}
		}],
		defaults : {
			sortable : true,
			menuDisabled : true,
			width : 120
		}
	}); 
	var treePanel = new Ext.tree.TreePanel({
		// TODO left节点treePanel
		id : 'treePanels',
		autoScroll : true,
		title : '按组织机构分类 ',
		iconCls : 'dep-user',
		loader : new Ext.tree.TreeLoader({
			url : __ctxPath + '/xitong/listUlDepartment.do'
		}),
		root : new Ext.tree.AsyncTreeNode({
			expanded : true
		}),
		rootVisible : false,
		listeners : {
//			'click' : this.clickNode
		}
	});
	var contactGrid = new HT.GridPanel({
		// TODO EditorGridPanel员工列表
		title : '员工列表',
		autoScroll : true,
		id : 'contactGrid',
		region : 'center',
		height : 380,
		singleSelect : true,
		autoWidth : false,
		url : __ctxPath + '/xitong/selectsUlEmployee.do',
		fields : [{
			name : 'userId',
			type : 'int'
		}, 'fullname', 'sex', 'useid', 'zhiwei', 'ulDepartment', 'userNo'],
		cm : cm
	}); // end of this contactGrid
	store.setDefaultSort('userId', 'desc');

	contactGrid.on('rowdblclick', function(grid, rowIndex, e) {
		var contactGrid = Ext.getCmp('contactGrid');
		var selGrid = Ext.getCmp('selectedEmpGrid');
		var selStore = selGrid.getStore();
		var rows = contactGrid.getSelectionModel().getSelections();
		for ( var i = 0; i < rows.length; i++) {
			var userId = rows[i].data.userId;
			var fullname = rows[i].data.fullname;
			var sex = rows[i].data.sex;
			var useid = rows[i].data.useid;
			var zhiwei = rows[i].data.zhiwei;
			var userNo = rows[i].data.userNo;
			var isExist = false;
			// 查找是否存在该记录
			for ( var j = 0; j < selStore.getCount(); j++) {
				if (selStore.getAt(j).data.userId == userId) {
					isExist = true;
					break;
				}
			}
			if (!isExist) {
				var newData = {
					userId : userId,
					fullname : fullname,
					sex : sex,
					useid : useid,
					zhiwei : zhiwei
				};
				var newRecord = new selStore.recordType(newData);
				selGrid.stopEditing();
				selStore.add(newRecord);
			}
		}
	});
	var searchPanel = new HT.SearchPanel({
		// TODO searchPanel[搜索面板]
		id : 'UlEmployeeSelectorSearchPanel',
		width : 600,
		height : 100,
		region : 'north',
		labelAlign : 'right',
		labelWidth : 50,
		colNums : 4,
		layout : 'form',
		keys : {
			key : Ext.EventObject.ENTER,
			scope : this,
			fn : this.search
		},
		items : [{
			fieldLabel : '姓名',
			name : 'Q_fullname_S_LK',
			width : 120,
			xtype : 'textfield'
		}, {
			xtype : 'textfield',
			fieldLabel : '工号',
			name : 'Q_userNo_S_LK',
			width : 120,
			maxLength : 256
		}, {
			xtype : 'button',
			text : '查询',
			width : 50,
			iconCls : 'btn-search',
			scope : this,
			handler : this.search
		}, {
			xtype : 'button',
			text : __reset,
			scope : this,
			width : 50,
			iconCls : 'btn-reset',
			handler : function() {
				var searchPanel = Ext.getCmp('UlEmployeeSelectorSearchPanel');
				searchPanel.getForm().reset();
			}
		}]
	}); 
	var csm = new Ext.grid.CheckboxSelectionModel();
	var selectedEmpGrid = new Ext.grid.EditorGridPanel({
		// TODO selectedEmpGrid[已选员工列表]
		id : 'selectedEmpGrid',
		title : '已选员工',
		layout : 'form',
		region : 'center',
		width : '100%',
		autoWidth : true,
		height : '100%',
		autoHeight : true,
		autoScroll : true,
		border : false,
		store : new Ext.data.ArrayStore({
			fields : ['userId', 'fullname', 'sex', 'useid', 'zhiwei',
					'ulDepartment', 'userNo']
		}),
		trackMouseOver : true,
		sm : csm,
		columns : [csm, new Ext.grid.RowNumberer(), {
			header : "员工名",
			dataIndex : 'fullname'
		}]
	}); // end of this selectedEmpGrid
	selectedEmpGrid.addListener('rowdblclick', function(grid, e) {
		var grid = Ext.getCmp('selectedEmpGrid');
		var store = grid.getStore();
		var rows = grid.getSelectionModel().getSelections();
		for ( var i = 0; i < rows.length; i++) {
			grid.stopEditing();
			store.remove(rows[i]);
		}
	});
	var selectedPanel = new Ext.Panel({
		layout : 'border',
		region : 'east',
		width : '200',
		height : '100%',
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
			items : [selectedEmpGrid]
		}]
	}); 
	var westPanel = new Ext.Panel({
		layout : 'accordion',
		region : 'west',
		width : 200,
		split : true,
		header : false,
		collapsible : true,
		items : [treePanel]
			}); 

	var panel = new Ext.Panel({
		// TODO panel总面板
		id : 'yuangongPanel',
		region:'south',
		hidden:true,
		layout : 'border',
		height:480,
		anchor : '100%,100%',
		items : [searchPanel, westPanel, contactGrid,selectedPanel]
	});
	return panel;
},
initpanel_bumen : function(){
	
	var selected;
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
					width : 100
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
					hidden:true,
					renderer : function(value) {
						return JYYW0001.get(value);
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
					hidden:true,
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
				height : 380,singleSelect:true,
				autoWidth : false,
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
			}); 
	function rowdblclickFn(grid, rowindex, e) {
		grid.getSelectionModel().each(function(rec) {
			ObZuZhiJiGouSelector.edit(rec.data.depid);
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
				rootVisible : false
			}); // end of this treePanel


	var panel = new Ext.Panel({
				region:'center',
				layout : 'border',
				height:480,
				id:'bumenPanel',
				items : [treePanel, grid]
			});
	return panel;
},
/**
 * 重置
 * 
 * @param {}
 *            formPanel
 */
reset : function() {
	this.formPanel.getForm().reset();
},
/**
 * 取消
 * 
 * @param {}
 *            window
 */
cancel : function() {
	this.close();
},
/**
 * 保存记录
 */
save : function() {
	$postSubForm({
		formPanel : this.formPanel,
		scope : this,
		url : __ctxPath + '/outb/saveObCallbatch.do',
		msgSuccess : '成功删除该记录！',
		msgFailure : '操作出错，请联系管理员！',
		callback : function(fp, action) {
			var gridPanel = Ext.getCmp('ObCallbatchGrid');
			if (gridPanel != null) {
				gridPanel.getStore().reload();
			}
			this.close();
		}
	});
}// end of save

});