/**
 * @author:zhangyl
 * @class UkKnowCollectView
 * @extends Ext.Panel
 * @description [UkSysKnow]管理
 * @company 优创融联科技
 * @createtime:
 */
var knowTmpId = this.knowTmpId ? this.knowTmpId : -1; // 全局变量 用于动态调用VM
UkKnowApplayToView = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		UkKnowCollectView.superclass.constructor.call(this, {
					id : 'UkKnowCollectViewWin',
					title : __menuViewUkKnowCollect,// '[UkSysKnow]管理',
					region : 'center',
					layout : 'border',
					items : [this.treePanel,this.searchPanel, this.gridPanel]
				});
	},// end of constructor
	// 初始化组件
	initUIComponents : function() {
		var fieldnameComboData = [
				['knowTmpId', '知识模板编号', new Ext.form.ComboBox({
									name : 'knowTmpId',
									allowBlank : true
								})],
				['knowApproveId', '知识审批单内码', new Ext.form.TextField({
									name : 'knowApproveId',
									allowBlank : true

								})], ['tiTle', '标题', new Ext.form.TextField({
									name : 'tiTle',
									allowBlank : true
								})],
				['busiType', '业务分类&BUSI_TYPE', new Ext.form.NumberField({
									name : 'busiType',
									allowBlank : true
								})],
				['enableTime', '生效时间', new Ext.form.DateField({
									hiddenName : 'enableTime',
									format : 'Y-m-d'
								})],
				['pastTime', '过期时间', new Ext.form.DateField({
									hiddenName : 'pastTime',
									format : 'Y-m-d'
								})],
				['sysKnowStatus', '状态&KNOW_STATUS', new Ext.form.NumberField({
									name : 'sysKnowStatus',
									allowBlank : true
								})],
				['viewCount', '浏览数', new Ext.form.NumberField({
									name : 'viewCount',
									allowBlank : true
								})],
				['sysKnowComment', '摘要', new Ext.form.TextField({
									name : 'sysKnowComment',
									allowBlank : true
								})],
				['plus1', '附加字段1', new Ext.form.TextField({
									name : 'plus1',
									allowBlank : true
								})],
				['plus2', '附加字段2', new Ext.form.TextField({
									name : 'plus2',
									allowBlank : true
								})],
				['plus3', '附加字段3', new Ext.form.TextField({
									name : 'plus3',
									allowBlank : true
								})],
				['plus4', '附加字段4', new Ext.form.TextField({
									name : 'plus4',
									allowBlank : true
								})],
				['plus5', '附加字段5', new Ext.form.TextField({
									name : 'plus5',
									allowBlank : true
								})],
				['plus6', '附加字段6', new Ext.form.TextField({
									name : 'plus6',
									allowBlank : true
								})],
				['plus7', '附加字段7', new Ext.form.TextField({
									name : 'plus7',
									allowBlank : true
								})],
				['plus8', '附加字段8', new Ext.form.TextField({
									name : 'plus8',
									allowBlank : true
								})],
				['sysKnowVersion', '版本号', new Ext.form.NumberField({
									name : 'sysKnowVersion',
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
								})],
				['userid', '创建人内码', new Ext.form.NumberField({
									name : 'userid',
									allowBlank : true
								})]]
		var UkSysKnowAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : '[UkSysKnow]高级查询',
					fieldData : fieldnameComboData
				});
		// 初始化搜索条件Panel
		this.searchPanel = new Ext.FormPanel({
					layout : 'hbox',
					region : 'north',
					id : 'UkKnowCollectSearchPanel',
					height : 35,
					items : [{
						text : __ukSysKnowTiTle
							// 知识标题
						}, {

						name : 'Q_tiTle_S_EQ',
						xtype : 'textfield'
					}, {
						text : __ukSysKnowBusiType
					}, {
						hiddenName : 'Q_busiType_L_EQ',
						xtype : 'mtdiccombo',
						editable : false,
						lazyInit : false,
						forceSelection : false,
						itemKey : 'BUSI_TYPE'
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
							new UkSysKnowAdvancedSearchWin().show()
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
        this.treePanel = new Ext.tree.TreePanel({
				region : 'west',
				id : 'ukKnowCollectTreePanel',
				title : '知识采集列表',//__ukKnowTypeListHeading,
				collapsible : true,
				autoScroll : true,
				split : true,
				height : 800,
				width : 180,
				tbar : new Ext.Toolbar({
							items : [{
										xtype : 'button',
										iconCls : 'btn-refresh',
										text : '刷新',
										handler : function() {
											treePanel.root.reload();
										}
									}, '-', {
										xtype : 'button',
										text : '展开',
										iconCls : 'btn-expand',
										handler : function() {
											treePanel.expandAll();
										}
									}, '-', {
										xtype : 'button',
										text : '收起',
										iconCls : 'btn-collapse',
										handler : function() {
											treePanel.collapseAll();
										}
									}]
						}),
				loader : new Ext.tree.TreeLoader({
							url : __ctxPath + '/know/listUkKnowType.do'
						}),
				root : new Ext.tree.AsyncTreeNode({
							expanded : true
						}),
				rootVisible : false,
				listeners : {
					//'click' : UkKnowTypeView.clickNode
				}
			});
		this.topbar = new Ext.Toolbar({
					items : ['->', {
								iconCls : 'btn-del',
								text : __delete,
								xtype : 'button',
								scope : this,
								handler : this.removeSelRs
							}, '->', {
								iconCls : 'btn-add',
								text : '添加',//__create
								xtype : 'button',
								scope : this,
								handler : this.createRs
							},{
								iconCls : 'btn-import',
								text : '导入',//__create
								xtype : 'button',
								scope : this,
								handler :function(){
								UkKnowCollectImport();// 在UkKnowCollectImport.js 里定义
								}
							}]
				});

		this.gridPanel = new HT.GridPanel({
			region : 'center',
			tbar : this.topbar,
			// 使用RowActions
			rowActions : true,
			printable : false,
			exportable : false,
			id : 'UkKnowCollectGrid',
			url : __ctxPath + "/know/ukCollectlistUkSysKnow.do",
			fields : [{
						name : 'knowId',
						type : 'int'
					}, 'ukSysKnow', 'ukSysKnow', 'tiTle', 'busiType',
					'enableTime', 'pastTime', 'sysKnowStatus', 'viewCount',
					'sysKnowComment', 'plus1', 'plus2', 'plus3', 'plus4',
					'plus5', 'plus6', 'plus7', 'plus8', 'sysKnowVersion',
					'createBy', 'updateBy', 'createDate', 'updateDate',
					'userid', 'ukKnowTemplate'],
			columns : [{
						header : __ukSysKnowKnowId,// 'knowId',
						dataIndex : 'knowId',
						hidden : true
					}
					// , {
					// header : __ukSysKnowKnowTmpId,// '知识模板编号',
					// isExp : false,
					// dataIndex : 'knowTmpId',
					// renderer : function(val) {
					// if (val != null) {
					// return val.knowTmpIdName;
					// } else {
					// return '';
					// }
					// }
					// }, {
					// header : __ukSysKnowKnowApproveId,// '知识审批单内码',
					// isExp : false,
					// dataIndex : 'knowApproveId',
					// renderer : function(val) {
					// if (val != null) {
					// return val.knowApproveIdName;
					// } else {
					// return '';
					// }
					//
					// }
					// }
					, {
						header : __ukSysKnowTiTle,// '标题',
						isExp : false,
						width : 160,
						dataIndex : 'tiTle'
					}, {
						header : __ukSysKnowBusiType,// '业务分类&BUSI_TYPE',
						isExp : false,

						dataIndex : 'busiType',
						renderer : function(value) {
							return BUSI_TYPE.get(value);
						}
					}, {
						header : __ukSysKnowEnableTime,// '生效时间',
						isExp : false,
                        format:'Y-m-d',
						dataIndex : 'enableTime'
					}, {
						format : 'Y-m-d',
						header : __ukSysKnowPastTime,// '过期时间',
						isExp : false,

						dataIndex : 'pastTime'
					}, {
						header : __ukSysKnowSysKnowStatus,// '状态&KNOW_STATUS',
						isExp : false,

						dataIndex : 'sysKnowStatus',
						renderer : function(value) {
							return KNOW_STATUS.get(value);
						}
						}, 
//					{
//						header : __ukSysKnowViewCount,// '浏览数',
//						isExp : false,
//
//						dataIndex : 'viewCount'
//					}, {
//						header : __ukSysKnowSysKnowComment,// '摘要',
//						isExp : false,
//
//						dataIndex : 'sysKnowComment'
//					},
					// {
					// header : __ukSysKnowSysKnowVersion,// '版本号',
					// isExp : false,
					//
					// dataIndex : 'sysKnowVersion'
					// },
					{
						header : '采集人' ,// '创建人内码',  __ukSysKnowCreateBy
						isExp : false,
						dataIndex : 'userid'
					}, new Ext.ux.grid.RowActions({
								header : __action,
								width : 100,
								actions : [{
											iconCls : 'btn-edit',
											qtip : __edit,
											style : 'margin:0 3px 0 3px'
										}, {
											iconCls : 'btn-del',
											qtip : __delete,
											style : 'margin:0 3px 0 3px'
										}],
								listeners : {
									scope : this,
									'action' : this.onRowAction
								}
							})]
				// end of columns
		});

		// this.gridPanel.addListener('rowdblclick', this.rowClick);

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
					new UkSysKnowForm({
								knowId : rec.data.knowId
							}).show();
				});
	},
	// 创建记录
	createRs : function() {
		// // new UkSysKnowForm().show();
		// var tabs = Ext.getCmp('centerTabPanel');
		// var aForm = Ext.getCmp('UkSysKnowForm');
		// if (aForm != null) {
		// tabs.remove('UkKnowCollectForm');
		// }
		// aForm = new UkKnowCollectForm();
		// tabs.add(aForm);
		// tabs.activate(aForm);
		new knowTmpForm().show();

	},
	// 按ID删除记录
	removeRs : function(id) {
		$postDel({
					url : __ctxPath + '/know/multiDelUkSysKnow.do',
					ids : id,
					grid : this.gridPanel
				});
	},
	// 把选中ID删除
	removeSelRs : function() {
		$delGridRs({
					url : __ctxPath + '/know/multiDelUkSysKnow.do',
					grid : this.gridPanel,
					idName : 'knowId'
				});
	},
	// 编辑Rs
	editRs : function(record) {
		var tabs = Ext.getCmp('centerTabPanel');
		var edit = tabs.getItem('UkKnowCollectForm');

		if (edit != null) {
			tabs.remove('UkKnowCollectForm');
		}
		edit = new UkKnowCollectForm({
					knowId : record.data.knowId,
					knowTmpId : record.data.ukKnowTemplate.knowTmpId
				});
		tabs.add(edit);
		tabs.activate(edit);
	},
	// 行的Action
	onRowAction : function(grid, record, action, row, col) {
		switch (action) {
			case 'btn-del' :
				this.removeRs.call(this, record.data.knowId);
				break;
			case 'btn-edit' :
				this.editRs.call(this, record);
				break;
			default :
				break;
		}
	}
});

/**
 * 增加修改FORM
 * 
 * @class knowTmpForm
 * @extends Ext.Window
 */

knowTmpForm = Ext.extend(Ext.Window, {
	// 内嵌FormPanel
	formPanel : null,
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		knowTmpForm.superclass.constructor.call(this, {
					layout : 'fit',
					items : this.formPanel,
					modal : true,
					height : 100,
					width : 300,
					maximizable : true,
					title : '知识模版信息',
					buttonAlign : 'center',
					buttons : this.buttons
				});
	},// end of the constructor
	// 初始化组件
	initUIComponents : function() {
		this.formPanel = new Ext.FormPanel({
			layout : 'form',
			bodyStyle : 'padding:10px 10px 10px 10px',
			border : false,
			id : 'knowTmpForm',
			defaults : {
				anchor : '98%,98%'
			},
			defaultType : 'textfield',
			items : [{
				fieldLabel : '知识模板编号',
				hiddenName : 'ukSysKnow.knowTmpId',
				xtype : 'combo',
				editabel : false,
				lazyInit : false,
				editable : false,
				triggerAction : 'all',
				store : new Ext.data.SimpleStore({
					autoLoad : true,
					url : __ctxPath + '/know/comboUkKnowTemplate.do',
					fields : ['knowTmpId', 'knowTmpIdName'],
					listeners : {
						load : function() {
							var combo = Ext.getCmp('knowTmpId');
							var store = combo.getStore();
							var rows = [];// 定义数组
							for (var i = 0; i < store.getCount(); i++) { //
								store.getCount()
								if (store.getAt(i).data['knowTmpId'] == combo
										.getValue()) {
									combo
											.setValue(store.getAt(i).data['knowTmpIdName']);
									break;
								}
							}
						}
					}
				}),
				displayField : 'knowTmpIdName',
				valueField : 'knowTmpId',
				id : 'knowTmpId'
			}

			]

		});

		// 初始化功能按钮
		this.buttons = [{
					text : '保存',
					iconCls : 'btn-save',
					handler : this.save.createCallback(this.formPanel, this)
				}, {
					text : '返回',
					iconCls : 'btn-cancel',
					handler : this.cancel.createCallback(this)
				}];
	},// end of the initcomponents

	/**
	 * 取消
	 * 
	 * @param {}
	 *            window
	 */
	cancel : function(window) {
		window.close();
	},

	/**
	 * 保存记录
	 */
	save : function(formPanel, window) {
		if (formPanel.getForm().isValid()) {
			var knowTmpId = Ext.getCmp('knowTmpId').getValue();
			alert(knowTmpId);
			var tabs = Ext.getCmp('centerTabPanel');
			var edit = tabs.getItem('UkKnowCollectForm');

			if (edit != null) {
				tabs.remove('UkKnowCollectForm');
				edit.destroy();
			}

			edit = new UkKnowCollectForm({
						knowTmpId : knowTmpId
					});
			tabs.add(edit);
			tabs.activate(edit);
			window.close();
		}
	}// end of save

});
