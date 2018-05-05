/**
 * @author:cf0666@gmail.com
 * @class UkKnowDingyueView
 * @extends Ext.Panel
 * @description [UkKnowDingyue]管理
 * @company 优创融联科技
 * @createtime:
 */
UkKnowDingyueManageView = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		UkKnowDingyueManageView.superclass.constructor.call(this, {
					id : 'UkKnowDingyueManageViewWin',
					title : __ukKnowDingyueManage,
					region : 'center',
					layout : 'border',
					items : [this.searchPanel, this.gridPanel]
				});
	},// end of constructor
	// 初始化组件
	initUIComponents : function() {
		var fieldnameComboData = [
				['knowTypeId', __ukKnowDingyueKnowTypeId, new Ext.form.ComboBox({
							editabel : false,
							lazyInit : false,
							triggerAction : 'all',
							store : new Ext.data.SimpleStore({
										autoLoad : true,
										url : __ctxPath
												+ '/know/comboUkKnowType.do',
										fields : ['knowTypeId',
												'knowTypeIdName']
									}),
							displayField : 'knowTypeIdName',
							valueField : 'knowTypeId',
							id : 'knowTypeId'
						})],
				['busiType', __ukKnowDingyueBusiType, new Ext.form.NumberField({
									name : 'busiType',
									allowBlank : true
								})],
				['desCribe', __ukKnowDingyueDesCribe, new Ext.form.TextField({
									name : 'desCribe',
									allowBlank : true
								})],
				['userid', __ukKnowDingyueUserid, new Ext.form.NumberField({
									name : 'userid',
									allowBlank : true
								})]]
		var UkKnowDingyueAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : __ukKnowDingyueManage+__advancedSearch,
					fieldData : fieldnameComboData
				});
		// 初始化搜索条件Panel
		this.searchPanel = new Ext.FormPanel({
					layout : 'hbox',
					region : 'north',
					hidden : true,
					id : 'UkKnowDingyueManageSearchPanel',
					height : 35,
					items : [{
						text : __ukKnowDingyueKnowTypeId
					}, {
						hiddenName : 'Q_ukKnowType.knowTypeId_L_EQ',
						xtype : 'combo',
						editabel : false,
						lazyInit : false,
						triggerAction : 'all',
						store : new Ext.data.SimpleStore({
									autoLoad : true,
									url : __ctxPath
											+ '/know/comboUkKnowType.do',
									fields : ['knowTypeId', 'knowTypeIdName']
								}),
						displayField : 'knowTypeIdName',
						valueField : 'knowTypeId',
						id : 'knowTypeId'
					}, {
						text : __ukKnowDingyueBusiType
					}, {
						hiddenName : 'Q_busiType_L_EQ',
						xtype : 'mtdiccombo',
						editable : false,
						lazyInit : false,
						forceSelection : false,
						itemKey : 'BUSI_TYPE'
					}, {
						text : __ukKnowDingyueDesCribe
					}, {
						name : 'Q_desCribe_S_LK',
						xtype : 'textfield'
//					}, {
//
//						name : 'Q_userid_L_EQ',
//						xtype : 'numberfield'
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
							new UkKnowDingyueAdvancedSearchWin().show()
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
					items : [
//						'->', {
//								iconCls : 'btn-del',
//								text : __delete,
//								xtype : 'button',
//								scope : this,
//								handler : this.removeSelRs
//							},
							'->', {
								iconCls : 'btn-add',
								text : __ukKnowDingyueKnowDingyue,
								xtype : 'button',
								scope : this,
								handler : this.createRs
							}]
				});

		this.gridPanel = new HT.GridPanel({
			region : 'center',
			tbar : this.topbar,
			// 使用RowActions
			rowActions : true,
			printable : false,
			exportable : false,
			id : 'UkKnowDingyueManageGrid',
			url : __ctxPath + "/know/listMineUkKnowDingyue.do",
			fields : [{
						name : 'dingyueId',
						type : 'int'
					}, 'ukKnowType', 'busiType', 'desCribe', 'userid', 'userName','knowTypeName'],
			columns : [{
						header : 'dingyueId',
						dataIndex : 'dingyueId',
						hidden : true
					}, {
						header : __ukKnowDingyueKnowTypeId,
						isExp : false,
						dataIndex : 'knowTypeName'
//						,
//						renderer : function(val) {
//							if(val!=null && val!=''){
//								return val.name;
//							}else{
//								return '';
//							}
//						}
//					}, {
//						header : __ukKnowDingyueBusiType,
//						isExp : false,
//						dataIndex : 'busiType',
//						renderer : function(value) {
//							return BUSI_TYPE.get(value);
//						}
//					}, {
//						header : __ukKnowDingyueDesCribe,
//						isExp : false,
//						dataIndex : 'desCribe'
					}, {
						header : __ukKnowDingyueUserid,
						isExp : false,
						dataIndex : 'userName'
					}, new Ext.ux.grid.RowActions({
								header : __action,
								width : 100,
								hidden : true,
								actions : [
//									{
//											iconCls : 'btn-del',
//											qtip : __delete,
//											style : 'margin:0 3px 0 3px'
//										}, {
//											iconCls : 'btn-edit',
//											qtip : __edit,
//											style : 'margin:0 3px 0 3px'
//										}
										],
								listeners : {
									scope : this,
									'action' : this.onRowAction
								}
							})]
				// end of columns
			});

//		this.gridPanel.addListener('rowdblclick', this.rowClick);

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
			var tabs = Ext.getCmp('centerTabPanel');
			var eform = Ext.getCmp('UkKnowDingyueManageFormWin');
			if (eform != null) {
				tabs.remove('UkKnowDingyueManageFormWin');
			}
			eform = new UkKnowDingyueManageForm({
						dingyueId : rec.data.dingyueId
				});
			tabs.add(eform);
			tabs.activate(eform);
		});
	},
	// 创建记录
	createRs : function() {
		 new UkKnowDingyueTree();
//		var tabs = Ext.getCmp('centerTabPanel');
//		var aForm = Ext.getCmp('dingyueKnowWin');
//		if (aForm != null) {
//			tabs.remove('dingyueKnowWin');
//		}
//		aForm = new UkKnowDingyueTree();
//		tabs.add(aForm);
//		tabs.activate(aForm);
	},
	// 按ID删除记录
	removeRs : function(id) {
		$postDel({
					url : __ctxPath + '/know/multiDelUkKnowDingyue.do',
					ids : id,
					grid : this.gridPanel
				});
	},
	// 把选中ID删除
	removeSelRs : function() {
		$delGridRs({
					url : __ctxPath + '/know/multiDelUkKnowDingyue.do',
					grid : this.gridPanel,
					idName : 'dingyueId'
				});
	},
	// 编辑Rs
	editRs : function(record) {
//		new UkKnowDingyueForm({
//					dingyueId : record.data.dingyueId
//				}).show();
		var tabs = Ext.getCmp('centerTabPanel');
		var eform = Ext.getCmp('UkKnowDingyueManageFormWin');
		
		if (eform != null) {
			tabs.remove('UkKnowDingyueManageFormWin');
		}
		eform = new UkKnowDingyueManageForm({
						dingyueId : record.data.dingyueId
			});
		tabs.add(eform);
		tabs.activate(eform);
	},
	// 行的Action
	onRowAction : function(grid, record, action, row, col) {
		switch (action) {
			case 'btn-del' :
				this.removeRs.call(this, record.data.dingyueId);
				break;
			case 'btn-edit' :
				this.editRs.call(this, record);
				break;
			default :
				break;
		}
	}
});
