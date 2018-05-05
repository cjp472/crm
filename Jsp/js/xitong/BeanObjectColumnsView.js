/**
 * @author:cf0666@gmail.com
 * @class BeanObjectColumnsView
 * @extends Ext.Panel
 * @description [BeanObjectColumns]管理
 * @company 优创融联科技
 * @createtime:
 */
BeanObjectColumnsView = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		BeanObjectColumnsView.superclass.constructor.call(this, {
					id : 'BeanObjectColumnsViewWin',
					title : '[BeanObjectColumns]管理',
					region : 'center',
					layout : 'border',
					items : [this.searchPanel, this.gridPanel]
				});
	},// end of constructor
	// 初始化组件
	initUIComponents : function() {
		var fieldnameComboData = [
				['beanObjectId', '数据实体内码', new Ext.form.ComboBox({
					editabel : false,
					lazyInit : false,
					triggerAction : 'all',
					store : new Ext.data.SimpleStore({
								autoLoad : true,
								url : __ctxPath + '/xitong/listbeanObjectId.do',
								fields : ['beanObjectId', 'beanObjectIdName']
							}),
					displayField : 'beanObjectIdName',
					valueField : 'beanObjectId',
					id : 'beanObjectId'
				})], ['beanObjectColumns', '数据实体参数', new Ext.form.TextField({
									name : 'beanObjectColumns',
									allowBlank : true
								})],
				['beanObjectColumnsName', '数据实体参数名', new Ext.form.TextField({
									name : 'beanObjectColumnsName',
									allowBlank : true
								})],
				['beanObjectColumnsTame', '数据实体参数字段名', new Ext.form.TextField({
									name : 'beanObjectColumnsTame',
									allowBlank : true
								})],
				['createBy', '创建人', new Ext.form.NumberField({
									name : 'createBy',
									allowBlank : true
								})],
				['updateBy', '修改人', new Ext.form.NumberField({
									name : 'updateBy',
									allowBlank : true
								})],
				['createDate', '创建时间', new Ext.form.DateField({
									hiddenName : 'createDate',
									format : 'Y-m-d'
								})],
				['updateDate', '修改时间', new Ext.form.DateField({
									hiddenName : 'updateDate',
									format : 'Y-m-d'
								})], ['comment', '备注', new Ext.form.TextField({
									name : 'comment',
									allowBlank : true
								})]]
		var BeanObjectColumnsAdvancedSearchWin = Ext.extend(
				MT.AdvancedSearchWin, {
					title : '[BeanObjectColumns]高级查询',
					fieldData : fieldnameComboData
				});
		// 初始化搜索条件Panel
		this.searchPanel = new Ext.FormPanel({
					layout : 'hbox',
					region : 'north',
					id : 'BeanObjectColumnsSearchPanel',
					height : 35,
					items : [{

						hiddenName : 'Q_beanObjectId_L_EQ',
						xtype : 'combo',
						editabel : false,
						lazyInit : false,
						triggerAction : 'all',
						store : new Ext.data.SimpleStore({
									autoLoad : true,
									url : __ctxPath
											+ '/xitong/listbeanObjectId.do',
									fields : ['beanObjectId',
											'beanObjectIdName']
								}),
						displayField : 'beanObjectIdName',
						valueField : 'beanObjectId',
						id : 'beanObjectId'
					}, {

						name : 'Q_beanObjectColumns_S_EQ',
						xtype : 'textfield'
					}, {

						name : 'Q_beanObjectColumnsName_S_EQ',
						xtype : 'textfield'
					}, {

						name : 'Q_beanObjectColumnsTame_S_EQ',
						xtype : 'textfield'
					}, {

						name : 'Q_createBy_L_EQ',
						xtype : 'numberfield'
					}, {

						name : 'Q_updateBy_L_EQ',
						xtype : 'numberfield'
					}, {

						name : 'Q_createDate_D_EQ',
						xtype : 'datefield',
						format : 'Y-m-d'
					}, {

						name : 'Q_updateDate_D_EQ',
						xtype : 'datefield',
						format : 'Y-m-d'
					}, {

						name : 'Q_comment_S_EQ',
						xtype : 'textfield'
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
							new BeanObjectColumnsAdvancedSearchWin().show();
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
								// text : __create+'[BeanObjectColumns]',
								text : __create,
								xtype : 'button',
								scope : this,
								handler : this.createRs
							}, {
								iconCls : 'btn-del',
								// text : __delete+'[BeanObjectColumns]',
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
			id : 'BeanObjectColumnsGrid',
			url : __ctxPath + "/xitong/listBeanObjectColumns.do",
			fields : [{
						name : 'beanObjectColumnsId',
						type : 'int'
					}, 'beanObjectColumns', 'beanObjectColumns',
					'beanObjectColumnsName', 'beanObjectColumnsTame',
					'createBy', 'updateBy', 'createDate', 'updateDate',
					'comment'],
			columns : [{
						header : 'beanObjectColumnsId',
						dataIndex : 'beanObjectColumnsId',
						hidden : true
					}, {
						header : '数据实体内码',
						isExp : false,

						dataIndex : 'beanObjectId',
						renderer : function(val) {
							return val.beanObjectIdName;
						}
					}, {
						header : '数据实体参数',
						isExp : false,

						dataIndex : 'beanObjectColumns'
					}, {
						header : '数据实体参数名',
						isExp : false,

						dataIndex : 'beanObjectColumnsName'
					}, {
						header : '数据实体参数字段名',
						isExp : false,

						dataIndex : 'beanObjectColumnsTame'
					}, {
						header : '创建人',
						isExp : false,

						dataIndex : 'createBy'
					}, {
						header : '修改人',
						isExp : false,

						dataIndex : 'updateBy'
					}, {
						header : '创建时间',
						isExp : false,

						dataIndex : 'createDate'
					}, {
						header : '修改时间',
						isExp : false,

						dataIndex : 'updateDate'
					}, {
						header : '备注',
						isExp : false,

						dataIndex : 'comment'
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
					new BeanObjectColumnsForm({
								beanObjectColumnsId : rec.data.beanObjectColumnsId
							}).show();
				});
	},
	// 创建记录
	createRs : function() {
		// new BeanObjectColumnsForm().show();
		var tabs = Ext.getCmp('centerTabPanel');
		var aForm = Ext.getCmp('BeanObjectColumnsForm');
		if (aForm != null) {
			tabs.remove('BeanObjectColumnsForm');
		}
		aForm = new BeanObjectColumnsForm();
		tabs.add(aForm);
		tabs.activate(aForm);

	},
	// 按ID删除记录
	removeRs : function(id) {
		$postSubmit({
					url : __ctxPath + '/xitong/multiDelBeanObjectColumns.do',
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
					url : __ctxPath + '/xitong/multiDelBeanObjectColumns.do',
					grid : this.gridPanel,
					idName : 'beanObjectColumnsId',
					msgNull : '请选择要删除的记录！',
					msgTip : '您确认要删除所选记录吗？',
					msgSuccess : '成功删除该记录！',
					msgFailure : '操作出错，请联系管理员！'
				});
	},
	// 编辑Rs
	editRs : function(record) {
		// new BeanObjectColumnsForm({
		// beanObjectColumnsId : record.data.beanObjectColumnsId
		// }).show();
		var tabs = Ext.getCmp('centerTabPanel');
		var aForm = Ext.getCmp('BeanObjectColumnsForm');
		if (aForm != null) {
			tabs.remove('BeanObjectColumnsForm');
		}
		aForm = new BeanObjectColumnsForm({
					beanObjectColumnsId : record.data.beanObjectColumnsId
				});
		tabs.add(aForm);
		tabs.activate(aForm);
	},
	// 行的Action
	onRowAction : function(grid, record, action, row, col) {
		switch (action) {
			case 'btn-del' :
				this.removeRs.call(this, record.data.beanObjectColumnsId);
				break;
			case 'btn-edit' :
				this.editRs.call(this, record);
				break;
			default :
				break;
		}
	}
});
