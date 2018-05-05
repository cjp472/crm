/**
 * @author:cf0666@gmail.com
 * @class ScProductAttrView
 * @extends Ext.Panel
 * @description [ScProductAttr]管理
 * @company 优创融联科技
 * @createtime:
 */
ScProductAttrView = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		ScProductAttrView.superclass.constructor.call(this, {
					id : 'ScProductAttrViewWin',
					title : '产品属性管理',
					region : 'center',
					layout : 'border',
					items : [this.searchPanel, this.gridPanel]
				});
	},// end of constructor
	// 初始化组件
	initUIComponents : function() {
		var fieldnameComboData = [
				['productClassifyId', '产品分类 内码', new Ext.form.ComboBox({
							editabel : false,
							lazyInit : false,
							triggerAction : 'all',
							store : new Ext.data.SimpleStore({
										autoLoad : true,
										url : __ctxPath
												+ '/goods/listproductClassifyId.do',
										fields : ['productClassifyId',
												'productClassifyIdName']
									}),
							displayField : 'productClassifyIdName',
							valueField : 'productClassifyId',
							id : 'productClassifyId'
						})],
				['productAttrVal', '产品属性名', new Ext.form.TextField({
									name : 'productAttrVal',
									allowBlank : true
								})],
				['fieldName', '字段名', new Ext.form.TextField({
									name : 'fieldName',
									allowBlank : true
								})],
				['fieldType', '字段类型文本、数值、时间&CON_T_FLELD_TYPE',
						new Ext.form.NumberField({
									name : 'fieldType',
									allowBlank : true
								})],
				['formType', '表单类型&CON_T_FORM_TYPE', new Ext.form.NumberField({
									name : 'formType',
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
		var ScProductAttrAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : '[ScProductAttr]高级查询',
					fieldData : fieldnameComboData
				});
		// 初始化搜索条件Panel
		this.searchPanel = new Ext.FormPanel({
			layout : 'hbox',
			region : 'north',
			id : 'ScProductAttrSearchPanel',
			height : 35,
			items : [ {
				border:false,
				style:'text-align:right',
				width:70,
				html:'属性名：'
			
			},{

				name : 'Q_productAttrVal_S_EQ',
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
					new ScProductAttrAdvancedSearchWin().show();
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
								// text : __create+'[ScProductAttr]',
								text : __create,
								xtype : 'button',
								scope : this,
								handler : this.createRs
							}, {
								iconCls : 'btn-del',
								// text : __delete+'[ScProductAttr]',
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
			id : 'ScProductAttrGrid',
			url : __ctxPath + "/goods/listScProductAttr.do",
			fields : [{
						name : 'productAttrCode',
						type : 'int'
					}, 'scProductAttr', 'productAttrVal', 'fieldName',
					'fieldType', 'formType', 'createUserId', 'createTime',
					'updateUserId', 'updateTime', 'desc'],
			columns : [{
						header : 'productAttrCode',
						dataIndex : 'productAttrCode',
						hidden : true
					}, {
						header : '分类',
						isExp : false,

						dataIndex : 'productClassifyId',
						renderer : function(val) {
							return val.productClassifyIdName;
						}
					}, {
						header : '属性名',
						isExp : false,

						dataIndex : 'productAttrVal'
					}, {
						header : '字段名',
						isExp : false,

						dataIndex : 'fieldName'
					}, {
						header : '字段类型',
						isExp : false,

						dataIndex : 'fieldType',
						renderer : function(value) {
							return CON_T_FLELD_TYPE.get(value);
						}
					}, {
						header : '表单类型',
						isExp : false,

						dataIndex : 'formType',
						renderer : function(value) {
							return CON_T_FORM_TYPE.get(value);
						}
					}, {
						header : '创建人',
						isExp : false,
						hidden : true,
						dataIndex : 'createUserId'
					}, {
						header : '创建时间',
						isExp : false,
						hidden : true,
						dataIndex : 'createTime'
					}, {
						header : '修改人',
						isExp : false,
						hidden : true,
						dataIndex : 'updateUserId'
					}, {
						header : '修改时间',
						isExp : false,
						hidden : true,
						dataIndex : 'updateTime'
					}, {
						header : '备注',
						isExp : false,
						hidden : true,
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
		// var searchPanel = Ext.getCmp('ScProductAttrSearchPanel');
		// var gridPanel = Ext.getCmp('ScProductAttrGrid');
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
					new ScProductAttrForm({
								productAttrCode : rec.data.productAttrCode
							}).show();
				});
	},
	// 创建记录
	createRs : function() {
		// new ScProductAttrForm().show();
		var tabs = Ext.getCmp('centerTabPanel');
		var aForm = Ext.getCmp('ScProductAttrForm');
		if (aForm != null) {
			tabs.remove('ScProductAttrForm');
		}
		aForm = new ScProductAttrForm();
		tabs.add(aForm);
		tabs.activate(aForm);

	},
	// 按ID删除记录
	removeRs : function(id) {
		$postSubmit({
					url : __ctxPath + '/goods/multiDelScProductAttr.do',
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
					url : __ctxPath + '/goods/multiDelScProductAttr.do',
					grid : this.gridPanel,
					idName : 'productAttrCode',
					msgNull : '请选择要删除的记录！',
					msgTip : '您确认要删除所选记录吗？',
					msgSuccess : '成功删除该记录！',
					msgFailure : '操作出错，请联系管理员！'
				});
	},
	// 编辑Rs
	editRs : function(record) {
		// new ScProductAttrForm({
		// productAttrCode : record.data.productAttrCode
		// }).show();
		var tabs = Ext.getCmp('centerTabPanel');
		var aForm = Ext.getCmp('ScProductAttrForm');
		if (aForm != null) {
			tabs.remove('ScProductAttrForm');
		}
		aForm = new ScProductAttrForm({
					productAttrCode : record.data.productAttrCode
				});
		tabs.add(aForm);
		tabs.activate(aForm);
	},
	// 行的Action
	onRowAction : function(grid, record, action, row, col) {
		switch (action) {
			case 'btn-del' :
				this.removeRs.call(this, record.data.productAttrCode);
				break;
			case 'btn-edit' :
				this.editRs.call(this, record);
				break;
			default :
				break;
		}
	}
});
