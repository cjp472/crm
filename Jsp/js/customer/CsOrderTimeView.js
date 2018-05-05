/**
 * @author:cf0666@gmail.com
 * @class CsOrderTimeView
 * @extends Ext.Panel
 * @description [CsOrderTime]管理
 * @company 优创融联科技
 * @createtime:
 */
CsOrderTimeView = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		CsOrderTimeView.superclass.constructor.call(this, {
					id : 'CsOrderTimeViewWin',
					title : '工单时间配置',
					region : 'center',
					layout : 'border',
					items : [this.searchPanel, this.gridPanel]
				});
	},// end of constructor
	// 初始化组件
	initUIComponents : function() {
		var fieldnameComboData = [['assignid', '授权ID', new Ext.form.ComboBox({
									editabel : false,
									lazyInit : false,
									triggerAction : 'all',
									store : new Ext.data.SimpleStore({}),
									displayField : 'assignidName',
									valueField : 'assignid',
									id : 'assignid'
								})],
				['orderSorce', '工单来源', new Ext.form.NumberField({
									name : 'orderSorce',
									allowBlank : true
								})],
				['order', '工单类型', new Ext.form.NumberField({
									name : 'order',
									allowBlank : true
								})],
				['orderProject', '工单项目', new Ext.form.NumberField({
									name : 'orderProject',
									allowBlank : true
								})],
				['orderLevel', '投诉等级', new Ext.form.NumberField({
									name : 'orderLevel',
									allowBlank : true
								})],
				['cusLevel', '客户等级', new Ext.form.NumberField({
									name : 'cusLevel',
									allowBlank : true
								})],
				['responseTime', '要求响应时间', new Ext.form.NumberField({
									name : 'responseTime',
									allowBlank : true
								})],
				['completionTime', '要求完成时间', new Ext.form.NumberField({
									name : 'completionTime',
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
								})]]
		var CsOrderTimeAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : '[CsOrderTime]高级查询',
					fieldData : fieldnameComboData
				});
		// 初始化搜索条件Panel
		this.searchPanel = new Ext.FormPanel({
			layout : 'hbox',
			region : 'north',
			id : 'CsOrderTimeSearchPanel',
			height : 35,
			items : [{
						text : '工时配置类型'
					}, {
						xtype : 'combo',
						hiddenName : 'Q_globalType.proTypeId_L_EQ',
						name : 'Q_globalType.proTypeId_L_EQ',
						id : 'view.csOrderTime.globalType',
						mode : 'local',
						editable : false,
						triggerAction : 'all',
						store : [['11687', '投诉工单来源'], ['11688', '业务工单来源'],
								['10425', '客户级别']],
						listeners : {
							scope : this,
							'select' : function(combo, record, index) {
								var id = Ext.getCmp('view.csOrderTime.globalType')
										.getValue();
								Ext.Ajax.request({
											url : __ctxPath
													+ '/system/comboDictionary.do',
											params : {
												'Q_globalType.proTypeId_L_EQ' : id
											},
											method : 'post',
											success : function(response) {
												var result = Ext.util.JSON
														.decode(response.responseText)
												Ext
														.getCmp('view.csOrderTime.idDictionary')
														.getStore()
														.loadData(result);
												Ext
														.getCmp('view.csOrderTime.idDictionary')
														.setValue('');
											}
										});
							}
						}

					}, {
						text : "工时配置名称"
					}, {
						xtype : 'combo',
						hiddenName : 'Q_idDictionary.dicId_L_EQ',
						name : 'Q_idDictionary.dicId_L_EQ',
						id : 'view.csOrderTime.idDictionary',
						mode : 'local',
						editable : false,
						triggerAction : 'all',
						store : [['', '']]

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
							new CsOrderTimeAdvancedSearchWin().show();
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
								// text : __create+'[CsOrderTime]',
								text : __create,
								xtype : 'button',
								scope : this,
								handler : this.createRs
							}
//							, {
//								iconCls : 'btn-del',
//								// text : __delete+'[CsOrderTime]',
//								text : __delete,
//								xtype : 'button',
//								scope : this,
//								handler : this.removeSelRs
//							}
							]
				});

		this.gridPanel = new HT.GridPanel({
			region : 'center',
			tbar : this.topbar,
			// 使用RowActions
			rowActions : true,
			printable : false,
			exportable : false,
			id : 'CsOrderTimeGrid',
			url : __ctxPath + "/customer/listCsOrderTime.do",
			fields : [{
						name : 'orderTimeId',
						type : 'int'
					}, 'csOrderTime', 'orderSorce', 'order', 'orderProject',
					'orderLevel', 'cusLevel', 'responseTime', 'completionTime',
					'createUser', 'createTime', 'updateUser', 'updateTime',
					'idDictionary', 'globalType', 'responseTimeType',
					'completionTimeType'],
			columns : [{
						header : 'orderTimeId',
						dataIndex : 'orderTimeId',
						hidden : true
					}, {
						header : '工时配置类型',
						dataIndex : 'globalType',
						renderer : function(val) {
							return val.typeName;
						}
					}, {
						header : '工时配置名称',
						dataIndex : 'idDictionary',
						renderer : function(val) {
							return val.itemValue;
						}
					}, {
						header : '要求响应时间',
						isExp : false,
						dataIndex : 'responseTime',
						renderer : function(val) {
							return val + "小时";
						}
					}, {
						header : '要求完成时间',
						isExp : false,
						dataIndex : 'completionTime',
						renderer : function(val) {
							return val + "小时";
						}
					}
					// ,{
					// header : '授权ID',
					// isExp : false,
					//
					// dataIndex : 'assignid',
					// renderer : function(val) {
					// return val.assignidName;
					// }
					// }, {
					// header : '工单来源',
					// isExp : false,
					//
					// dataIndex : 'orderSorce'
					// }, {
					// header : '工单类型',
					// isExp : false,
					//
					// dataIndex : 'order'
					// }, {
					// header : '工单项目',
					// isExp : false,
					//
					// dataIndex : 'orderProject'
					// }, {
					// header : '投诉等级',
					// isExp : false,
					//
					// dataIndex : 'orderLevel'
					// }, {
					// header : '客户等级',
					// isExp : false,
					//
					// dataIndex : 'cusLevel'
					// }
					, new Ext.ux.grid.RowActions({
								header : __action,
								width : 100,
								actions : [
//									{
//											iconCls : 'btn-del',
//											qtip : __delete,
//											style : 'margin:0 3px 0 3px'
//										},
										 {
											iconCls : 'btn-edit',
											qtip : __edit,
											style : 'margin:0 3px 0 3px'
										}
										],
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
		// var searchPanel = Ext.getCmp('CsOrderTimeSearchPanel');
		// var gridPanel = Ext.getCmp('CsOrderTimeGrid');
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
					new CsOrderTimeForm({
								orderTimeId : rec.data.orderTimeId
							}).show();
				});
	},
	// 创建记录
	createRs : function() {
		new CsOrderTimeForm().show();
		// var tabs = Ext.getCmp('centerTabPanel');
		// var aForm = Ext.getCmp('CsOrderTimeForm');
		// if (aForm != null) {
		// tabs.remove('CsOrderTimeForm');
		// }
		// aForm = new CsOrderTimeForm();
		// tabs.add(aForm);
		// tabs.activate(aForm);

	},
	// 按ID删除记录
	removeRs : function(id) {
		$postSubmit({
					url : __ctxPath + '/customer/multiDelCsOrderTime.do',
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
					url : __ctxPath + '/customer/multiDelCsOrderTime.do',
					grid : this.gridPanel,
					idName : 'orderTimeId',
					msgNull : '请选择要删除的记录！',
					msgTip : '您确认要删除所选记录吗？',
					msgSuccess : '成功删除该记录！',
					msgFailure : '操作出错，请联系管理员！'
				});
	},
	// 编辑Rs
	editRs : function(record) {
		new CsOrderTimeForm({
					orderTimeId : record.data.orderTimeId
				}).show();
		// var tabs = Ext.getCmp('centerTabPanel');
		// var aForm = Ext.getCmp('CsOrderTimeForm');
		// if (aForm != null) {
		// tabs.remove('CsOrderTimeForm');
		// }
		// aForm = new CsOrderTimeForm({
		// orderTimeId : record.data.orderTimeId
		// });
		// tabs.add(aForm);
		// tabs.activate(aForm);
	},
	// 行的Action
	onRowAction : function(grid, record, action, row, col) {
		switch (action) {
			case 'btn-del' :
				this.removeRs.call(this, record.data.orderTimeId);
				break;
			case 'btn-edit' :
				this.editRs.call(this, record);
				break;
			default :
				break;
		}
	}
});
