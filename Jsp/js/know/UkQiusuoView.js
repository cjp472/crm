/**
 * @author:cf0666@gmail.com
 * @class UkQiusuoView
 * @extends Ext.Panel
 * @description [UkQiusuo]管理
 * @company 优创融联科技
 * @createtime:
 */
UkQiusuoView = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		UkQiusuoView.superclass.constructor.call(this, {
					id : 'UkQiusuoViewWin',
					title : '[UkQiusuo]管理',
					region : 'center',
					layout : 'border',
					items : [this.searchPanel, this.gridPanel]
				});
	},// end of constructor
	// 初始化组件
	initUIComponents : function() {
		var fieldnameComboData = [
				['content', '内容', new Ext.form.TextField({
									name : 'content',
									allowBlank : true
								})],
				['createtime', '发起时间', new Ext.form.DateField({
									hiddenName : 'createtime',
									format : 'Y-m-d'
								})],
				['createby', '发起人', new Ext.form.NumberField({
									name : 'createby',
									allowBlank : true
								})],
				['status', '状态', new Ext.form.NumberField({
									name : 'status',
									allowBlank : true
								})],
				['score', '悬赏分数', new Ext.form.NumberField({
									name : 'score',
									allowBlank : true
								})],
				['mark', '说明', new Ext.form.TextField({
									name : 'mark',
									allowBlank : true
								})]]
		var UkQiusuoAdvancedSearchWin = Ext.extend(
			MT.AdvancedSearchWin, {
				title : '[UkQiusuo]高级查询',
				fieldData : fieldnameComboData
		});
		// 初始化搜索条件Panel
		this.searchPanel = new Ext.FormPanel({
					layout : 'hbox',
					region : 'north',
					id : 'UkQiusuoSearchPanel',
					height : 35,
					items : [{
								name : 'Q_content_S_EQ',
								xtype : 'textfield'
							}, {
								name : 'Q_createtime_D_EQ',
								xtype : 'datefield',
								format : 'Y-m-d'
							}, {
								name : 'Q_createby_L_EQ',
								xtype : 'numberfield'
							}, {
								name : 'Q_status_L_EQ',
								xtype : 'numberfield'
							}, {
								name : 'Q_score_L_EQ',
								xtype : 'numberfield'
							}, {
								name : 'Q_mark_S_EQ',
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
									new UkQiusuoAdvancedSearchWin()
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
								// text : __create+'[UkQiusuo]',
								text : __create,
								xtype : 'button',
								scope : this,
								handler : this.createRs
							}, {
								iconCls : 'btn-del',
								// text : __delete+'[UkQiusuo]',
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
			id : 'UkQiusuoGrid',
			url : __ctxPath + "/know/listUkQiusuo.do",
			fields : [{
						name : 'qiusuoId',
						type : 'int'
					}, 'content', 'createtime', 'createby', 'status',
					'score', 'mark'],
			columns : [{
						header : 'qiusuoId',
						dataIndex : 'qiusuoId',
						hidden : true
					}, {
						header : '内容',
						isExp : false,

						dataIndex : 'content'
					}, {
						header : '发起时间',
						isExp : false,

						dataIndex : 'createtime'
					}, {
						header : '发起人',
						isExp : false,

						dataIndex : 'createby'
					}, {
						header : '状态',
						isExp : false,

						dataIndex : 'status'
					}, {
						header : '悬赏分数',
						isExp : false,

						dataIndex : 'score'
					}, {
						header : '说明',
						isExp : false,

						dataIndex : 'mark'
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
				// var searchPanel = Ext.getCmp('UkQiusuoSearchPanel');
				// var gridPanel = Ext.getCmp('UkQiusuoGrid');
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
							new UkQiusuoForm({
										qiusuoId : rec.data.qiusuoId
									}).show();
						});
			},
			// 创建记录
			createRs : function() {
				// new UkQiusuoForm().show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('UkQiusuoForm');
				if (aForm != null) {
					tabs.remove('UkQiusuoForm');
				}
				aForm = new UkQiusuoForm();
				tabs.add(aForm);
				tabs.activate(aForm);

			},
			// 按ID删除记录
			removeRs : function(id) {
				$postSubmit({
							url : __ctxPath + '/know/multiDelUkQiusuo.do',
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
							url : __ctxPath + '/know/multiDelUkQiusuo.do',
							grid : this.gridPanel,
							idName : 'qiusuoId',
							msgNull : '请选择要删除的记录！',
							msgTip : '您确认要删除所选记录吗？',
							msgSuccess : '成功删除该记录！',
							msgFailure : '操作出错，请联系管理员！'
						});
			},
			// 编辑Rs
			editRs : function(record) {
				// new UkQiusuoForm({
				// qiusuoId : record.data.qiusuoId
				// }).show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('UkQiusuoForm');
				if (aForm != null) {
					tabs.remove('UkQiusuoForm');
				}
				aForm = new UkQiusuoForm({
							qiusuoId : record.data.qiusuoId
						});
				tabs.add(aForm);
				tabs.activate(aForm);
			},
			// 行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this, record.data.qiusuoId);
						break;
					case 'btn-edit' :
						this.editRs.call(this, record);
						break;
					default :
						break;
				}
			}
		});
