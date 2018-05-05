/**
 * @author:cf0666@gmail.com
 * @class ScProductAttrValView
 * @extends Ext.Panel
 * @description [ScProductAttrVal]管理
 * @company 优创融联科技
 * @createtime:
 */
ScProductAttrValView = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		ScProductAttrValView.superclass.constructor.call(this, {
					id : 'ScProductAttrValViewWin',
					title : '[ScProductAttrVal]管理',
					region : 'center',
					layout : 'border',
					items : [this.searchPanel, this.gridPanel]
				});
	},// end of constructor
	// 初始化组件
	initUIComponents : function() {
		var fieldnameComboData = [
				['productAttrCode', '产品属性编码', new Ext.form.ComboBox({
							editabel : false,
							lazyInit : false,
							triggerAction : 'all',
							store : new Ext.data.SimpleStore({
										autoLoad : true,
										url : __ctxPath
												+ '/goods/listproductAttrCode.do',
										fields : ['productAttrCode',
												'productAttrCodeName']
									}),
							displayField : 'productAttrCodeName',
							valueField : 'productAttrCode',
							id : 'productAttrCode'
						})], ['productDispVal', '显示值', new Ext.form.TextField({
									name : 'productDispVal',
									allowBlank : true
								})],
				['productTranVal', '传递值', new Ext.form.TextField({
									name : 'productTranVal',
									allowBlank : true
								})],
				['createUserId', '创建人', new Ext.form.NumberField({
									name : 'createUserId',
									allowBlank : true
								})],
				['createTime', '创建时间', new Ext.form.DateField({
									hiddenName : 'createTime',
									format : 'Y-m-d'
								})],
				['updateUserId', '修改人', new Ext.form.NumberField({
									name : 'updateUserId',
									allowBlank : true
								})],
				['updateTime', '修改时间', new Ext.form.DateField({
									hiddenName : 'updateTime',
									format : 'Y-m-d'
								})], ['desc', '备注', new Ext.form.TextField({
									name : 'desc',
									allowBlank : true
								})]]
		var ScProductAttrValAdvancedSearchWin = Ext.extend(
				MT.AdvancedSearchWin, {
					title : '[ScProductAttrVal]高级查询',
					fieldData : fieldnameComboData
				});
		// 初始化搜索条件Panel
		this.searchPanel = new Ext.FormPanel({
					layout : 'hbox',
					region : 'north',
					id : 'ScProductAttrValSearchPanel',
					height : 35,
					items : [{

						hiddenName : 'Q_productAttrCode_L_EQ',
						xtype : 'combo',
						editabel : false,
						lazyInit : false,
						triggerAction : 'all',
						store : new Ext.data.SimpleStore({
									autoLoad : true,
									url : __ctxPath
											+ '/goods/listproductAttrCode.do',
									fields : ['productAttrCode',
											'productAttrCodeName']
								}),
						displayField : 'productAttrCodeName',
						valueField : 'productAttrCode',
						id : 'productAttrCode'
					}, {

						name : 'Q_productDispVal_S_EQ',
						xtype : 'textfield'
					}, {

						name : 'Q_productTranVal_S_EQ',
						xtype : 'textfield'
					}, {

						name : 'Q_createUserId_L_EQ',
						xtype : 'numberfield'
					}, {

						name : 'Q_createTime_D_EQ',
						xtype : 'datefield',
						format : 'Y-m-d'
					}, {

						name : 'Q_updateUserId_L_EQ',
						xtype : 'numberfield'
					}, {

						name : 'Q_updateTime_D_EQ',
						xtype : 'datefield',
						format : 'Y-m-d'
					}, {

						name : 'Q_desc_S_EQ',
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
							new ScProductAttrValAdvancedSearchWin().show();
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
								// text : __create+'[ScProductAttrVal]',
								text : __create,
								xtype : 'button',
								scope : this,
								handler : this.createRs
							}, {
								iconCls : 'btn-del',
								// text : __delete+'[ScProductAttrVal]',
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
			id : 'ScProductAttrValGrid',
			url : __ctxPath + "/goods/listScProductAttrVal.do",
			fields : [{
						name : 'productAttrVal',
						type : 'int'
					}, 'scProductAttrVal', 'productDispVal', 'productTranVal',
					'createUserId', 'createTime', 'updateUserId', 'updateTime',
					'desc'],
			columns : [{
						header : 'productAttrVal',
						dataIndex : 'productAttrVal',
						hidden : true
					}, {
						header : '产品属性编码',
						isExp : false,

						dataIndex : 'productAttrCode',
						renderer : function(val) {
							return val.productAttrCodeName;
						}
					}, {
						header : '显示值',
						isExp : false,

						dataIndex : 'productDispVal'
					}, {
						header : '传递值',
						isExp : false,

						dataIndex : 'productTranVal'
					}, {
						header : '创建人',
						isExp : false,

						dataIndex : 'createUserId'
					}, {
						header : '创建时间',
						isExp : false,

						dataIndex : 'createTime'
					}, {
						header : '修改人',
						isExp : false,

						dataIndex : 'updateUserId'
					}, {
						header : '修改时间',
						isExp : false,

						dataIndex : 'updateTime'
					}, {
						header : '备注',
						isExp : false,

						dataIndex : 'desc'
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
		// var searchPanel = Ext.getCmp('ScProductAttrValSearchPanel');
		// var gridPanel = Ext.getCmp('ScProductAttrValGrid');
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
					new ScProductAttrValForm({
								productAttrVal : rec.data.productAttrVal
							}).show();
				});
	},
	// 创建记录
	createRs : function() {
		// new ScProductAttrValForm().show();
		var tabs = Ext.getCmp('centerTabPanel');
		var aForm = Ext.getCmp('ScProductAttrValForm');
		if (aForm != null) {
			tabs.remove('ScProductAttrValForm');
		}
		aForm = new ScProductAttrValForm();
		tabs.add(aForm);
		tabs.activate(aForm);

	},
	// 按ID删除记录
	removeRs : function(id) {
		$postSubmit({
					url : __ctxPath + '/goods/multiDelScProductAttrVal.do',
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
					url : __ctxPath + '/goods/multiDelScProductAttrVal.do',
					grid : this.gridPanel,
					idName : 'productAttrVal',
					msgNull : '请选择要删除的记录！',
					msgTip : '您确认要删除所选记录吗？',
					msgSuccess : '成功删除该记录！',
					msgFailure : '操作出错，请联系管理员！'
				});
	},
	// 编辑Rs
	editRs : function(record) {
		// new ScProductAttrValForm({
		// productAttrVal : record.data.productAttrVal
		// }).show();
		var tabs = Ext.getCmp('centerTabPanel');
		var aForm = Ext.getCmp('ScProductAttrValForm');
		if (aForm != null) {
			tabs.remove('ScProductAttrValForm');
		}
		aForm = new ScProductAttrValForm({
					productAttrVal : record.data.productAttrVal
				});
		tabs.add(aForm);
		tabs.activate(aForm);
	},
	// 行的Action
	onRowAction : function(grid, record, action, row, col) {
		switch (action) {
			case 'btn-del' :
				this.removeRs.call(this, record.data.productAttrVal);
				break;
			case 'btn-edit' :
				this.editRs.call(this, record);
				break;
			default :
				break;
		}
	}
});
