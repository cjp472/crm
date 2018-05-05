/**
 * @author:cf0666@gmail.com
 * @class ConBwListTimeRulView
 * @extends Ext.Panel
 * @description [ConBwListTimeRul]管理
 * @company 优创融联科技
 * @createtime:
 */
ConBwListTimeRulView = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		ConBwListTimeRulView.superclass.constructor.call(this, {
					id : 'ConBwListTimeRulViewWin',
					title : '[ConBwListTimeRul]管理',
					region : 'center',
					layout : 'border',
					items : [this.searchPanel, this.gridPanel]
				});
	},// end of constructor
	// 初始化组件
	initUIComponents : function() {
		var fieldnameComboData = [['bwId', '黑白名单ID', new Ext.form.ComboBox({
							editabel : false,
							lazyInit : false,
							triggerAction : 'all',
							store : new Ext.data.SimpleStore({
										autoLoad : true,
										url : __ctxPath
												+ '/customer/listbwId.do',
										fields : ['bwId', 'bwIdName']
									}),
							displayField : 'bwIdName',
							valueField : 'bwId',
							id : 'bwId'
						})], ['staTime', '开始时间', new Ext.form.DateField({
							hiddenName : 'staTime',
							format : 'Y-m-d'
						})], ['endTime', '结束时间', new Ext.form.DateField({
							hiddenName : 'endTime',
							format : 'Y-m-d'
						})]]
		var ConBwListTimeRulAdvancedSearchWin = Ext.extend(
				MT.AdvancedSearchWin, {
					title : '[ConBwListTimeRul]高级查询',
					fieldData : fieldnameComboData
				});
		// 初始化搜索条件Panel
		this.searchPanel = new Ext.FormPanel({
					layout : 'hbox',
					region : 'north',
					id : 'ConBwListTimeRulSearchPanel',
					height : 35,
					items : [{

								hiddenName : 'Q_bwId_L_EQ',
								xtype : 'combo',
								editabel : false,
								lazyInit : false,
								triggerAction : 'all',
								store : new Ext.data.SimpleStore({
											autoLoad : true,
											url : __ctxPath
													+ '/customer/listbwId.do',
											fields : ['bwId', 'bwIdName']
										}),
								displayField : 'bwIdName',
								valueField : 'bwId',
								id : 'bwId'
							}, {

								name : 'Q_staTime_D_EQ',
								xtype : 'datefield',
								format : 'Y-m-d'
							}, {

								name : 'Q_endTime_D_EQ',
								xtype : 'datefield',
								format : 'Y-m-d'
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
									new ConBwListTimeRulAdvancedSearchWin()
											.show();
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
								//text : __create+'[ConBwListTimeRul]',
								text : __create,
								xtype : 'button',
								scope : this,
								handler : this.createRs
							}, {
								iconCls : 'btn-del',
								//text : __delete+'[ConBwListTimeRul]',
								text : __delete,
								xtype : 'button',
								scope : this,
								handler : this.removeSelRs
							}]
				});

		this.gridPanel = new HT.GridPanel({
			region : 'center',
			tbar : this.topbar,
			//使用RowActions
			rowActions : true,
			printable : false,
			exportable : false,
			id : 'ConBwListTimeRulGrid',
			url : __ctxPath + "/customer/listConBwListTimeRul.do",
			fields : [{
						name : 'bwListTimeRulId',
						type : 'int'
					}, 'conBwListTimeRul', 'staTime', 'endTime'],
			columns : [{
						header : 'bwListTimeRulId',
						dataIndex : 'bwListTimeRulId',
						hidden : true
					}, {
						header : '黑白名单ID',
						isExp : false,

						dataIndex : 'bwId',
						renderer : function(val) {
							return val.bwIdName;
						}
					}, {
						header : '开始时间',
						isExp : false,

						dataIndex : 'staTime'
					}, {
						header : '结束时间',
						isExp : false,

						dataIndex : 'endTime'
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
				//end of columns
			});

		this.gridPanel.addListener('rowdblclick', this.rowClick);

	},// end of the initComponents()
	//重置查询表单
	reset : function() {
		this.searchPanel.getForm().reset();
	},
	//按条件搜索
	onSearch : function(obj) {
		$search({
					searchPanel : this.searchPanel,
					gridPanel : this.gridPanel
				});
	},
	//GridPanel行点击处理事件
	rowClick : function(grid, rowindex, e) {
		grid.getSelectionModel().each(function(rec) {
					new ConBwListTimeRulForm({
								bwListTimeRulId : rec.data.bwListTimeRulId
							}).show();
				});
	},
	//创建记录
	createRs : function() {
		//new ConBwListTimeRulForm().show();
		var tabs = Ext.getCmp('centerTabPanel');
		var aForm = Ext.getCmp('ConBwListTimeRulForm');
		if (aForm != null) {
			tabs.remove('ConBwListTimeRulForm');
		}
		aForm = new ConBwListTimeRulForm();
		tabs.add(aForm);
		tabs.activate(aForm);

	},
	//按ID删除记录
	removeRs : function(id) {
		$postDel({
					url : __ctxPath + '/customer/multiDelConBwListTimeRul.do',
					ids : id,
					grid : this.gridPanel
				});
	},
	//把选中ID删除
	removeSelRs : function() {
		$delGridRs({
					url : __ctxPath + '/customer/multiDelConBwListTimeRul.do',
					grid : this.gridPanel,
					idName : 'bwListTimeRulId'
				});
	},
	//编辑Rs
	editRs : function(record) {
		//new ConBwListTimeRulForm({
		//	bwListTimeRulId : record.data.bwListTimeRulId
		//}).show();
		var tabs = Ext.getCmp('centerTabPanel');
		var aForm = Ext.getCmp('ConBwListTimeRulForm');
		if (aForm != null) {
			tabs.remove('ConBwListTimeRulForm');
		}
		aForm = new ConBwListTimeRulForm({
					bwListTimeRulId : record.data.bwListTimeRulId
				});
		tabs.add(aForm);
		tabs.activate(aForm);
	},
	//行的Action
	onRowAction : function(grid, record, action, row, col) {
		switch (action) {
			case 'btn-del' :
				this.removeRs.call(this, record.data.bwListTimeRulId);
				break;
			case 'btn-edit' :
				this.editRs.call(this, record);
				break;
			default :
				break;
		}
	}
});
