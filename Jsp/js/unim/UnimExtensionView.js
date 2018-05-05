UnimExtensionView = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		UnimExtensionView.superclass.constructor.call(this, {
			id : 'UnimExtensionViewWin',
			title : '电脑管理',
			region : 'center',
			layout : 'border',
			items : [this.searchPanel, this.gridPanel]
		});
	},// end of constructor
	// 初始化组件
	initUIComponents : function() {
		var fieldnameComboData = [['extCode', '编码', new Ext.form.TextField({
			name : 'extCode',
			allowBlank : true
		})], ['ipaddress', 'IP地址', new Ext.form.TextField({
			name : 'ipaddress',
			allowBlank : true
		})], ['ipport', '端口', new Ext.form.TextField({
			name : 'ipport',
			allowBlank : true
		})], ['username', '用户名', new Ext.form.TextField({
			name : 'username',
			allowBlank : true
		})], ['password', '密码', new Ext.form.TextField({
			name : 'password',
			allowBlank : true
		})]]
		var UnimExtensionAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
			title : '座席分机高级查询',
			fieldData : fieldnameComboData
		});
		// 初始化搜索条件Panel
		this.searchPanel = new Ext.FormPanel({
			layout : 'hbox',
			region : 'north',
			id : 'UnimExtensionSearchPanel',
			height : 35,
			items : [{
				width : 50,
				style : 'text-align:right',
				html : '分机：'
			}, {

				name : 'Q_extCode_S_LK',
				xtype : 'textfield'
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
					new UnimExtensionAdvancedSearchWin().show();
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
			items : ['->',{
				iconCls : 'btn-add',
				// text : __create+'[UnimExtension]',
				text : '添加',
				xtype : 'button',
				scope : this,
				handler : this.createRs
			}, {
				iconCls : 'btn-del',
				// text : __delete+'[UnimExtension]',
				text : '删除',
				xtype : 'button',
				scope : this,
				handler : this.removeSelRs
			}]
		});

		this.gridPanel = new HT.GridPanel({
			region : 'center',
			tbar : this.topbar,
			// 使用RowActions
			rowActions : true,
			printable : false,
			exportable : false,
			id : 'UnimExtensionGrid',
			url : __ctxPath + "/unim/listUnimExtension.do",
			fields : [{
				name : 'extId',
				type : 'int'
			}, 'extCode', 'ipaddress', 'ipport', 'username', 'password'],
			columns : [{
				header : 'extId',
				dataIndex : 'extId',
				hidden : true
			}, {
				header : '分机号',
				isExp : false,

				dataIndex : 'extCode'
			}, {
				header : 'IP地址',
				isExp : false,

				dataIndex : 'ipaddress'
			},new Ext.ux.grid.RowActions({
				header : __action,
				width : 50,
				actions : [{
					iconCls : 'btn-edit',
					qtip : '明细',
					style : 'margin:0 3px 0 3px'
				},{
					iconCls : 'btn-del',
					qtip : '删除',
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

	},// end of the initComponents()
	// 重置查询表单
	reset : function() {
		this.searchPanel.getForm().reset();
	},
	// 按条件搜索
	onSearch : function(obj) {
		// var searchPanel = Ext.getCmp('UnimExtensionSearchPanel');
		// var gridPanel = Ext.getCmp('UnimExtensionGrid');
		// if (searchPanel.getForm().isValid()) {
		$search({
			searchPanel : this.searchPanel,
			gridPanel : this.gridPanel
		});
		// }
	},
	// GridPanel行点击处理事件
	rowClick : function(grid, rowindex, e) {
		grid.getSelectionModel().each(function(rec) {
			new UnimExtensionForm({
				extId : rec.data.extId
			}).show();
		});
	},
	// 创建记录
	createRs : function() {
		new UnimExtensionForm().show();
//		var tabs = Ext.getCmp('centerTabPanel');
//		var aForm = Ext.getCmp('UnimExtensionForm');
//		if (aForm != null) {
//			tabs.remove('UnimExtensionForm');
//		}
//		aForm = new UnimExtensionForm();
//		tabs.add(aForm);
//		tabs.activate(aForm);

	},
	// 按ID删除记录
	removeRs : function(id) {
		$postSubmit({
			url : __ctxPath + '/unim/multiDelUnimExtension.do',
			ids : id,
			grid : this.gridPanel,
			msgTip : '您确认要删除所选记录吗？',
			msgSuccess : '成功删除该记录！',
			msgFailure : '操作出错，请联系管理员！'
		});
	},
	// 把选中ID删除
	removeSelRs : function() {
		$gridRs({
			url : __ctxPath + '/unim/multiDelUnimExtension.do',
			grid : this.gridPanel,
			idName : 'extId',
			msgNull : '请选择要删除的记录！',
			msgTip : '您确认要删除所选记录吗？',
			msgSuccess : '成功删除该记录！',
			msgFailure : '操作出错，请联系管理员！'
		});
	},
	// 编辑Rs
	editRs : function(record) {
		 new UnimExtensionForm({
		 extId : record.data.extId
		 }).show();
//		var tabs = Ext.getCmp('centerTabPanel');
//		var aForm = Ext.getCmp('UnimExtensionForm');
//		if (aForm != null) {
//			tabs.remove('UnimExtensionForm');
//		}
//		aForm = new UnimExtensionForm({
//			extId : record.data.extId
//		});
//		tabs.add(aForm);
//		tabs.activate(aForm);
	},
	// 行的Action
	onRowAction : function(grid, record, action, row, col) {
		switch (action) {
			case 'btn-del' :
				this.removeRs.call(this, record.data.extId);
				break;
			case 'btn-edit' :
				this.editRs.call(this, record);
				break;
			default :
				break;
		}
	}
});
