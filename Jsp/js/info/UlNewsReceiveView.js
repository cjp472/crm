/**
 * @author:cf0666@gmail.com
 * @class UlNewsReceiveView
 * @extends Ext.Panel
 * @description [UlNewsReceive]管理
 * @company 优创融联科技
 * @createtime:
 */
UlNewsReceiveView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				UlNewsReceiveView.superclass.constructor.call(this, {
							id : 'UlNewsReceiveViewWin',
							title : '[UlNewsReceive]管理',
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
				var fieldnameComboData = [
						['newsId', '新闻公告内码', new Ext.form.ComboBox({
									editabel : false,
									lazyInit : false,
									triggerAction : 'all',
									store : new Ext.data.SimpleStore({
												autoLoad : true,
												url : __ctxPath
														+ '/financial/combonewsId.do',
												fields : ['newsId',
														'newsIdName']
											}),
									displayField : 'newsIdName',
									valueField : 'newsId',
									id : 'newsId'
								})],
						['receiver', '接收人', new Ext.form.NumberField({
											name : 'receiver',
											allowBlank : true
										})],
						['receivetime', '接收时间', new Ext.form.DateField({
											hiddenName : 'receivetime',
											format : 'Y-m-d'
										})],
						['readtime', '阅读事件', new Ext.form.DateField({
											hiddenName : 'readtime',
											format : 'Y-m-d'
										})],
						['readstatus', '阅读状态  0:未阅读 1:已阅读',
								new Ext.form.NumberField({
											name : 'readstatus',
											allowBlank : true
										})]]
				UlNewsReceiveAdvancedSearchWin = Ext.extend(
						MT.AdvancedSearchWin, {
							title : '[UlNewsReceive]高级查询',
							fieldData : fieldnameComboData

						});
				// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'UlNewsReceiveSearchPanel',
							colNums : 3,
							items : [{
								fieldLabel : '新闻公告内码',

								hiddenName : 'Q_newsId_L_EQ',
								flex : 1,
								xtype : 'combo',
								editabel : false,
								lazyInit : false,
								triggerAction : 'all',
								store : new Ext.data.SimpleStore({
											autoLoad : true,
											url : __ctxPath
													+ '/financial/combonewsId.do',
											fields : ['newsId', 'newsIdName']
										}),
								displayField : 'newsIdName',
								valueField : 'newsId',
								id : 'newsId'
							}, {
								fieldLabel : '接收人',

								name : 'Q_receiver_L_EQ',
								flex : 1,
								xtype : 'numberfield'
							}, {
								fieldLabel : '接收时间',

								name : 'Q_receivetime_D_EQ',
								flex : 1,
								xtype : 'datefield',
								format : 'Y-m-d'
							}, {
								fieldLabel : '阅读事件',

								name : 'Q_readtime_D_EQ',
								flex : 1,
								xtype : 'datefield',
								format : 'Y-m-d'
							}, {
								fieldLabel : '阅读状态  0:未阅读 1:已阅读',

								name : 'Q_readstatus_L_EQ',
								flex : 1,
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
								handler : new UlNewsReceiveAdvancedSearchWin()
										.show()
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
										text : __create + '[UlNewsReceive]',
										xtype : 'button',
										scope : this,
										handler : this.createRs
									}, {
										iconCls : 'btn-del',
										text : __delete + '[UlNewsReceive]',
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
					id : 'UlNewsReceiveGrid',
					url : __ctxPath + "/info/listUlNewsReceive.do",
					fields : [{
								name : 'receiveId',
								type : 'int'
							}, 'ulNewsReceive', 'receiver', 'receivetime',
							'readtime', 'readstatus'],
					columns : [{
								header : 'receiveId',
								dataIndex : 'receiveId',
								hidden : true
							}, {
								header : '新闻公告内码',
								isExp : false,

								dataIndex : 'newsId',
								renderer : function(val) {
									return val.newsIdName;
								}
							}, {
								header : '接收人',
								isExp : false,

								dataIndex : 'receiver'
							}, {
								header : '接收时间',
								isExp : false,

								dataIndex : 'receivetime'
							}, {
								header : '阅读事件',
								isExp : false,

								dataIndex : 'readtime'
							}, {
								header : '阅读状态  0:未阅读 1:已阅读',
								isExp : false,

								dataIndex : 'readstatus'
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
							new UlNewsReceiveForm({
										receiveId : rec.data.receiveId
									}).show();
						});
			},
			// 创建记录
			createRs : function() {
				// new UlNewsReceiveForm().show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('UlNewsReceiveForm');
				if (aForm != null) {
					tabs.remove('UlNewsReceiveForm');
				}
				aForm = new UlNewsReceiveForm();
				tabs.add(aForm);
				tabs.activate(aForm);

			},
			// 按ID删除记录
			removeRs : function(id) {
				$postDel({
							url : __ctxPath + '/info/multiDelUlNewsReceive.do',
							ids : id,
							grid : this.gridPanel
						});
			},
			// 把选中ID删除
			removeSelRs : function() {
				$delGridRs({
							url : __ctxPath + '/info/multiDelUlNewsReceive.do',
							grid : this.gridPanel,
							idName : 'receiveId'
						});
			},
			// 编辑Rs
			editRs : function(record) {
				new UlNewsReceiveForm({
							receiveId : record.data.receiveId
						}).show();
			},
			// 行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this, record.data.receiveId);
						break;
					case 'btn-edit' :
						this.editRs.call(this, record);
						break;
					default :
						break;
				}
			}
		});
