/**
 * @author:cf0666@gmail.com
 * @class ConBwListBusRulView
 * @extends Ext.Panel
 * @description [ConBwListBusRul]管理
 * @company 优创融联科技
 * @createtime:
 */
ConBwListBusRulView = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		ConBwListBusRulView.superclass.constructor.call(this, {
					id : 'ConBwListBusRulViewWin',
					title : '[ConBwListBusRul]管理',
					region : 'center',
					layout : 'border',
					items : [this.searchPanel, this.gridPanel]
				});
	},// end of constructor
	// 初始化组件
	initUIComponents : function() {
		var fieldnameComboData = [
				['bwId', '黑白名单ID', new Ext.form.ComboBox({
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
						})],
				['staTime', '限制类型：外呼项目、外呼活动、业务&CONXZLX',
						new Ext.form.NumberField({
									name : 'staTime',
									allowBlank : true
								})],
				['busObj', '业务对象', new Ext.form.NumberField({
									name : 'busObj',
									allowBlank : true
								})]

		]
		var ConBwListBusRulAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin,
				{
					title : '[ConBwListBusRul]高级查询',
					fieldData : fieldnameComboData
				});
		// 初始化搜索条件Panel
		this.searchPanel = new Ext.FormPanel({
					layout : 'hbox',
					region : 'north',
					id : 'ConBwListBusRulSearchPanel',
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

								hiddenName : 'Q_staTime_SN_EQ',
								xtype : 'mtdiccombo',
								editable : true,
								lazyInit : false,
								forceSelection : false,
								itemKey : 'CONXZLX'
							}, {

								name : 'Q_busObj_L_EQ',
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
									new ConBwListBusRulAdvancedSearchWin()
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
								// text : __create+'[ConBwListBusRul]',
								text : __create,
								xtype : 'button',
								scope : this,
								handler : this.createRs
							}, {
								iconCls : 'btn-del',
								// text : __delete+'[ConBwListBusRul]',
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
			id : 'ConBwListBusRulGrid',
			url : __ctxPath + "/customer/listConBwListBusRul.do",
			fields : [{
						name : 'bwListBusRulId',
						type : 'int'
					}, 'conBwListBusRul', 'staTime', 'busObj'],
			columns : [{
						header : 'bwListBusRulId',
						dataIndex : 'bwListBusRulId',
						hidden : true
					}, {
						header : '黑白名单ID',
						isExp : false,

						dataIndex : 'bwId',
						renderer : function(val) {
							return val.bwIdName;
						}
					}, {
						header : '限制类型：外呼项目、外呼活动、业务&CONXZLX',
						isExp : false,

						dataIndex : 'staTime',
						renderer : function(value) {
							return CONXZLX.value;
						}
					}, {
						header : '业务对象',
						isExp : false,

						dataIndex : 'busObj'
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
		$search({
					searchPanel : this.searchPanel,
					gridPanel : this.gridPanel
				});
	},
	// GridPanel行点击处理事件
	rowClick : function(grid, rowindex, e) {
		grid.getSelectionModel().each(function(rec) {
					new ConBwListBusRulForm({
								bwListBusRulId : rec.data.bwListBusRulId
							}).show();
				});
	},
	// 创建记录
	createRs : function() {
		// new ConBwListBusRulForm().show();
		var tabs = Ext.getCmp('centerTabPanel');
		var aForm = Ext.getCmp('ConBwListBusRulForm');
		if (aForm != null) {
			tabs.remove('ConBwListBusRulForm');
		}
		aForm = new ConBwListBusRulForm();
		tabs.add(aForm);
		tabs.activate(aForm);

	},
	// 按ID删除记录
	removeRs : function(id) {
		$postDel({
					url : __ctxPath + '/customer/multiDelConBwListBusRul.do',
					ids : id,
					grid : this.gridPanel
				});
	},
	// 把选中ID删除
	removeSelRs : function() {
		$delGridRs({
					url : __ctxPath + '/customer/multiDelConBwListBusRul.do',
					grid : this.gridPanel,
					idName : 'bwListBusRulId'
				});
	},
	// 编辑Rs
	editRs : function(record) {
		// new ConBwListBusRulForm({
		// bwListBusRulId : record.data.bwListBusRulId
		// }).show();
		var tabs = Ext.getCmp('centerTabPanel');
		var aForm = Ext.getCmp('ConBwListBusRulForm');
		if (aForm != null) {
			tabs.remove('ConBwListBusRulForm');
		}
		aForm = new ConBwListBusRulForm({
					bwListBusRulId : record.data.bwListBusRulId
				});
		tabs.add(aForm);
		tabs.activate(aForm);
	},
	// 行的Action
	onRowAction : function(grid, record, action, row, col) {
		switch (action) {
			case 'btn-del' :
				this.removeRs.call(this, record.data.bwListBusRulId);
				break;
			case 'btn-edit' :
				this.editRs.call(this, record);
				break;
			default :
				break;
		}
	}
});
