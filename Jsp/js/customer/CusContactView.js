/**
 * @author:cf0666@gmail.com
 * @class CusContactView
 * @extends Ext.Panel
 * @description [CusContact]管理
 * @company 优创融联科技
 * @createtime:
 */
CusContactView = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		CusContactView.superclass.constructor.call(this, {
					id : 'CusContactViewWin',
					title : '联系方式管理',
					region : 'center',
					layout : 'border',
					items : [this.searchPanel, this.gridPanel]
				});
	},// end of constructor
	// 初始化组件
	initUIComponents : function() {
		var fieldnameComboData = [
				['customerid', '客户ID', new Ext.form.ComboBox({
							editabel : false,
							lazyInit : false,
							triggerAction : 'all',
//							store : new Ext.data.SimpleStore({
//										autoLoad : true,
//										url : __ctxPath
//												+ '/financial/combocustomerid.do',
//										fields : ['customerid',
//												'customeridName']
//									}),
							displayField : 'customeridName',
							valueField : 'customerid',
							id : 'customerid'
						})],
				['contactTypeId', '联系方式',
						new Ext.form.NumberField({
									name : 'contactTypeId',
									allowBlank : true
								})],
				['contactSubTypeId', '电话',
						new Ext.form.NumberField({
									name : 'contactSubTypeId',
									allowBlank : true
								})],
				['preContactNum', '区号', new Ext.form.TextField({
									name : 'preContactNum',
									allowBlank : true
								})],
				['mainContactNum', '号码', new Ext.form.TextField({
									name : 'mainContactNum',
									allowBlank : true
								})],
				['lastContactNum', '分机号', new Ext.form.TextField({
									name : 'lastContactNum',
									allowBlank : true
								})],
				['isDefault', '默认', new Ext.form.NumberField({
									name : 'isDefault',
									allowBlank : true
								})],
				['isChecked', '已核实', new Ext.form.NumberField({
									name : 'isChecked',
									allowBlank : true
								})],
				['contactRemarks', '备注', new Ext.form.TextField({
									name : 'contactRemarks',
									allowBlank : true
								})],
				['createTime', '创建时间', new Ext.form.DateField({
									hiddenName : 'createTime',
									format : 'Y-m-d'
								})],
				['lastUpdateTime', '修改日期', new Ext.form.DateField({
									hiddenName : 'lastUpdateTime',
									format : 'Y-m-d'
								})],
				['statusId', '状态', new Ext.form.NumberField({
									name : 'statusId',
									allowBlank : true
								})]]
		var CusContactAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : '高级查询',
					fieldData : fieldnameComboData
				});
		// 初始化搜索条件Panel
		this.searchPanel = new Ext.FormPanel({
					layout : 'hbox',
					region : 'north',
					id : 'CusContactSearchPanel',
					height : 35,
					items : [{

						hiddenName : 'Q_customerid_L_EQ',
						xtype : 'combo',
						editabel : false,
						lazyInit : false,
						triggerAction : 'all',
//						store : new Ext.data.SimpleStore({
//									autoLoad : true,
//									url : __ctxPath
//											+ '/financial/combocustomerid.do',
//									fields : ['customerid', 'customeridName']
//								}),
						displayField : 'customeridName',
						valueField : 'customerid',
						id : 'customerid'
					}, {
//
//						name : 'Q_contactTypeId_SN_EQ',
//						xtype : 'numberfield'
//					}, {
//
//						name : 'Q_contactSubTypeId_SN_EQ',
//						xtype : 'numberfield'
//					}, {
//
//						name : 'Q_preContactNum_S_EQ',
//						xtype : 'textfield'
//					}, {
//
//						name : 'Q_mainContactNum_S_EQ',
//						xtype : 'textfield'
//					}, {
//
//						name : 'Q_lastContactNum_S_EQ',
//						xtype : 'textfield'
//					}, {
//
//						hiddenName : 'Q_isDefault_SN_EQ',
//						xtype : 'combo',
//						editable : false,
//						mode : 'local',
//						triggerAction : 'all',
//						store : [['1', __yes], ['0', __no]]
//					}, {

						hiddenName : 'Q_isChecked_SN_EQ',
						xtype : 'combo',
						editable : false,
						mode : 'local',
						triggerAction : 'all',
						store : [['1', __yes], ['0', __no]]
					}, {
//
//						name : 'Q_contactRemarks_S_EQ',
//						xtype : 'textfield'
//					}, {
//
//						name : 'Q_createTime_D_EQ',
//						xtype : 'datefield',
//						format : 'Y-m-d'
//					}, {
//
//						name : 'Q_lastUpdateTime_D_EQ',
//						xtype : 'datefield',
//						format : 'Y-m-d'
//					}, {

						name : 'Q_statusId_SN_EQ',
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
						handler : function(){
							new CusContactAdvancedSearchWin().show()
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
						text : __create,
						xtype : 'button',
						scope : this,
						handler : this.createRs
					}, {
						iconCls : 'btn-del',
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
			id : 'CusContactGrid',
			url : __ctxPath + "/customer/listCusContact.do",
			fields : [{
						name : 'contactId',
						type : 'int'
					}, 'cusContact', 'contactTypeId', 'contactSubTypeId',
					'preContactNum', 'mainContactNum', 'lastContactNum',
					'isDefault', 'isChecked', 'contactRemarks', 'createTime',
					'lastUpdateTime', 'statusId' ,'customer'],
			columns : [{
						header : 'contactId',
						dataIndex : 'contactId',
						hidden : true
					}, {
//						header : '客户',
//						isExp : false,
//
//						dataIndex : 'cusContact.customer.customerId',
//						renderer : function(val) {
//							return val.customeridName;
//						}
//					}, {
						header : '联系方式',
						isExp : false,
						dataIndex : 'contactTypeId'
					}, {
						header : '电话',
						isExp : false,

						dataIndex : 'contactSubTypeId'
					}, {
						header : '区号',
						isExp : false,

						dataIndex : 'preContactNum'
					}, {
						header : '号码',
						isExp : false,

						dataIndex : 'mainContactNum'
					}, {
						header : '分机号',
						isExp : false,

						dataIndex : 'lastContactNum'
					}, {
						header : '默认',
						isExp : false,

						dataIndex : 'isDefault',
						renderer : function(value) {
							return value == '0' ? __no : __yes;
						}
					}, {
						header : '已核实',
						isExp : false,

						dataIndex : 'isChecked',
						renderer : function(value) {
							return value == '0' ? __no : __yes;
						}
					}, {
						header : '备注',
						isExp : false,

						dataIndex : 'contactRemarks'
					}, {
						header : '创建时间',
						isExp : false,

						dataIndex : 'createTime'
					}, {
						header : '修改日期',
						isExp : false,

						dataIndex : 'lastUpdateTime'
					}, {
						header : '状态',
						isExp : false,

						dataIndex : 'statusId'
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
					new CusContactForm({
								contactId : rec.data.contactId
							}).show();
				});
	},
	// 创建记录
	createRs : function() {
		// new CusContactForm().show();
		var tabs = Ext.getCmp('centerTabPanel');
		var aForm = Ext.getCmp('CusContactForm');
		if (aForm != null) {
			tabs.remove('CusContactForm');
		}
		aForm = new CusContactForm();
		tabs.add(aForm);
		tabs.activate(aForm);

	},
	// 按ID删除记录
	removeRs : function(id) {
		$postDel({
					url : __ctxPath + '/customer/multiDelCusContact.do',
					ids : id,
					grid : this.gridPanel
				});
	},
	// 把选中ID删除
	removeSelRs : function() {
		$delGridRs({
					url : __ctxPath + '/customer/multiDelCusContact.do',
					grid : this.gridPanel,
					idName : 'contactId'
				});
	},
	// 编辑Rs
	editRs : function(record) {
		new CusContactForm({
					contactId : record.data.contactId
				}).show();
	},
	// 行的Action
	onRowAction : function(grid, record, action, row, col) {
		switch (action) {
			case 'btn-del' :
				this.removeRs.call(this, record.data.contactId);
				break;
			case 'btn-edit' :
				this.editRs.call(this, record);
				break;
			default :
				break;
		}
	}
});
