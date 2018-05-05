/**
 * @author:cf0666@gmail.com
 * @class UnimThrlevlView
 * @extends Ext.Panel
 * @description [UnimThrlevl]管理
 * @company 优创融联科技
 * @createtime:
 */
UnimThrlevlView = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		UnimThrlevlView.superclass.constructor.call(this, {
					id : 'UnimThrlevlViewWin',
					title : '[UnimThrlevl]管理',
					region : 'center',
					layout : 'border',
					items : [this.searchPanel, this.gridPanel]
				});
	},// end of constructor
	// 初始化组件
	initUIComponents : function() {
		var fieldnameComboData = [['monitorId', '班长ID', new Ext.form.ComboBox({
							editabel : false,
							lazyInit : false,
							triggerAction : 'all',
							store : new Ext.data.SimpleStore({
										autoLoad : true,
										url : __ctxPath
												+ '/unim/listmonitorId.do',
										fields : ['monitorId', 'monitorIdName']
									}),
							displayField : 'monitorIdName',
							valueField : 'monitorId',
							id : 'monitorId'
						})], ['statusId', '状态ID', new Ext.form.ComboBox({
							editabel : false,
							lazyInit : false,
							triggerAction : 'all',
							store : new Ext.data.SimpleStore({
										autoLoad : true,
										url : __ctxPath
												+ '/unim/liststatusId.do',
										fields : ['statusId', 'statusIdName']
									}),
							displayField : 'statusIdName',
							valueField : 'statusId',
							id : 'statusId'
						})], ['thrlevladv', '注意阀值', new Ext.form.NumberField({
							name : 'thrlevladv',
							allowBlank : true
						})], ['thrlevlwar', '警告阀值', new Ext.form.NumberField({
							name : 'thrlevlwar',
							allowBlank : true
						})]]
		var UnimThrlevlAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : '[UnimThrlevl]高级查询',
					fieldData : fieldnameComboData
				});
		// 初始化搜索条件Panel
		this.searchPanel = new Ext.FormPanel({
					layout : 'hbox',
					region : 'north',
					id : 'UnimThrlevlSearchPanel',
					height : 35,
					items : [{

								hiddenName : 'Q_monitorId_L_EQ',
								xtype : 'combo',
								editabel : false,
								lazyInit : false,
								triggerAction : 'all',
								store : new Ext.data.SimpleStore({
											autoLoad : true,
											url : __ctxPath
													+ '/unim/listmonitorId.do',
											fields : ['monitorId',
													'monitorIdName']
										}),
								displayField : 'monitorIdName',
								valueField : 'monitorId',
								id : 'monitorId'
							}, {

								hiddenName : 'Q_statusId_SN_EQ',
								xtype : 'combo',
								editabel : false,
								lazyInit : false,
								triggerAction : 'all',
								store : new Ext.data.SimpleStore({
											autoLoad : true,
											url : __ctxPath
													+ '/unim/liststatusId.do',
											fields : ['statusId',
													'statusIdName']
										}),
								displayField : 'statusIdName',
								valueField : 'statusId',
								id : 'statusId'
							}, {

								name : 'Q_thrlevladv_L_EQ',
								xtype : 'numberfield'
							}, {

								name : 'Q_thrlevlwar_L_EQ',
								xtype : 'numberfield'
							}, {
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
									new UnimThrlevlAdvancedSearchWin().show();
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
					items : [{
								iconCls : 'btn-add',
								// text : __create+'[UnimThrlevl]',
								text : __create,
								xtype : 'button',
								scope : this,
								handler : this.createRs
							}, {
								iconCls : 'btn-del',
								// text : __delete+'[UnimThrlevl]',
								text : __delete,
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
			id : 'UnimThrlevlGrid',
			url : __ctxPath + "/unim/listUnimThrlevl.do",
			fields : [{
						name : 'thrlevlId',
						type : 'int'
					}, 'unimThrlevl', 'unimThrlevl', 'thrlevladv', 'thrlevlwar'],
			columns : [{
						header : 'thrlevlId',
						dataIndex : 'thrlevlId',
						hidden : true
					}, {
						header : '班长ID',
						isExp : false,

						dataIndex : 'monitorId',
						renderer : function(val) {
							return val.monitorIdName;
						}
					}, {
						header : '状态ID',
						isExp : false,

						dataIndex : 'statusId',
						renderer : function(val) {
							return val.statusIdName;
						}
					}, {
						header : '注意阀值',
						isExp : false,

						dataIndex : 'thrlevladv'
					}, {
						header : '警告阀值',
						isExp : false,

						dataIndex : 'thrlevlwar'
					}, new Ext.ux.grid.RowActions({
								header : __action,
								width : 100,
								actions : [{
											iconCls : 'btn-del',
											qtip : __delete,
											style : 'margin:0 3px 0 3px'
										}, {
											iconCls : 'btn-edit',
											qtip : __edit,
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
		// var searchPanel = Ext.getCmp('UnimThrlevlSearchPanel');
		// var gridPanel = Ext.getCmp('UnimThrlevlGrid');
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
					new UnimThrlevlForm({
								thrlevlId : rec.data.thrlevlId
							}).show();
				});
	},
	// 创建记录
	createRs : function() {
		// new UnimThrlevlForm().show();
		var tabs = Ext.getCmp('centerTabPanel');
		var aForm = Ext.getCmp('UnimThrlevlForm');
		if (aForm != null) {
			tabs.remove('UnimThrlevlForm');
		}
		aForm = new UnimThrlevlForm();
		tabs.add(aForm);
		tabs.activate(aForm);

	},
	// 按ID删除记录
	removeRs : function(id) {
		$postSubmit({
					url : __ctxPath + '/unim/multiDelUnimThrlevl.do',
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
					url : __ctxPath + '/unim/multiDelUnimThrlevl.do',
					grid : this.gridPanel,
					idName : 'thrlevlId',
					msgNull : '请选择要删除的记录！',
					msgTip : '您确认要删除所选记录吗？',
					msgSuccess : '成功删除该记录！',
					msgFailure : '操作出错，请联系管理员！'
				});
	},
	// 编辑Rs
	editRs : function(record) {
		// new UnimThrlevlForm({
		// thrlevlId : record.data.thrlevlId
		// }).show();
		var tabs = Ext.getCmp('centerTabPanel');
		var aForm = Ext.getCmp('UnimThrlevlForm');
		if (aForm != null) {
			tabs.remove('UnimThrlevlForm');
		}
		aForm = new UnimThrlevlForm({
					thrlevlId : record.data.thrlevlId
				});
		tabs.add(aForm);
		tabs.activate(aForm);
	},
	// 行的Action
	onRowAction : function(grid, record, action, row, col) {
		switch (action) {
			case 'btn-del' :
				this.removeRs.call(this, record.data.thrlevlId);
				break;
			case 'btn-edit' :
				this.editRs.call(this, record);
				break;
			default :
				break;
		}
	}
});
