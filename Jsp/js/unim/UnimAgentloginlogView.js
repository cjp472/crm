/**
 * @author:cf0666@gmail.com
 * @class UnimAgentloginlogView
 * @extends Ext.Panel
 * @description [UnimAgentloginlog]管理
 * @company 优创融联科技
 * @createtime:
 */
UnimAgentloginlogView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				UnimAgentloginlogView.superclass.constructor.call(this, {
							id : 'UnimAgentloginlogViewWin',
							title : '[UnimAgentloginlog]管理',
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
				var fieldnameComboData = [
						['station', '登录的分机号', new Ext.form.TextField({
											name : 'station',
											allowBlank : true
										})],
						['locId', 'CTI地址  可以是IP地址等CTI的连接信息',
								new Ext.form.TextField({
											name : 'locId',
											allowBlank : true
										})],
						['alTenant', '租户  备注：对应多租户平台',
								new Ext.form.NumberField({
											name : 'alTenant',
											allowBlank : true
										})],
						['loginDate', '登录日期  YYYY-MM-DD',
								new Ext.form.TextField({
											name : 'loginDate',
											allowBlank : true
										})],
						['loginTime', '登录时间  YYYY-MM-DD 24H:MM:SS',
								new Ext.form.DateField({
											hiddenName : 'loginTime',
											format : 'Y-m-d'
										})],
						['logoutDate', '登出日期  YYYY-MM-DD',
								new Ext.form.TextField({
											name : 'logoutDate',
											allowBlank : true
										})],
						['logoutTime', '登出时间  YYYY-MM-DD 24H:MM:SS',
								new Ext.form.DateField({
											hiddenName : 'logoutTime',
											format : 'Y-m-d'
										})],
						['logoutReason', '登出原因  0、默认；99、强制签出',
								new Ext.form.NumberField({
											name : 'logoutReason',
											allowBlank : true
										})]]
				var UnimAgentloginlogAdvancedSearchWin = Ext.extend(
						MT.AdvancedSearchWin, {
							title : '[UnimAgentloginlog]高级查询',
							fieldData : fieldnameComboData
						});
				// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'UnimAgentloginlogSearchPanel',
							height : 35,
							items : [{

										name : 'Q_station_S_EQ',
										xtype : 'textfield'
									}, {

										name : 'Q_locId_S_EQ',
										xtype : 'textfield'
									}, {

										name : 'Q_alTenant_L_EQ',
										xtype : 'numberfield'
									}, {

										name : 'Q_loginDate_S_EQ',
										xtype : 'textfield'
									}, {

										name : 'Q_loginTime_D_EQ',
										xtype : 'datefield',
										format : 'Y-m-d'
									}, {

										name : 'Q_logoutDate_S_EQ',
										xtype : 'textfield'
									}, {

										name : 'Q_logoutTime_D_EQ',
										xtype : 'datefield',
										format : 'Y-m-d'
									}, {

										name : 'Q_logoutReason_SN_EQ',
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
											new UnimAgentloginlogAdvancedSearchWin()
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
										// text :
										// __create+'[UnimAgentloginlog]',
										text : __create,
										xtype : 'button',
										scope : this,
										handler : this.createRs
									}, {
										iconCls : 'btn-del',
										// text :
										// __delete+'[UnimAgentloginlog]',
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
					id : 'UnimAgentloginlogGrid',
					url : __ctxPath + "/unim/listUnimAgentloginlog.do",
					fields : [{
								name : 'aid',
								type : 'int'
							}, 'station', 'locId', 'alTenant', 'loginDate',
							'loginTime', 'logoutDate', 'logoutTime',
							'logoutReason'],
					columns : [{
								header : 'aid',
								dataIndex : 'aid',
								hidden : true
							}, {
								header : '登录的分机号',
								isExp : false,

								dataIndex : 'station'
							}, {
								header : 'CTI地址  可以是IP地址等CTI的连接信息',
								isExp : false,

								dataIndex : 'locId'
							}, {
								header : '租户  备注：对应多租户平台',
								isExp : false,

								dataIndex : 'alTenant'
							}, {
								header : '登录日期  YYYY-MM-DD',
								isExp : false,

								dataIndex : 'loginDate'
							}, {
								header : '登录时间  YYYY-MM-DD 24H:MM:SS',
								isExp : false,

								dataIndex : 'loginTime'
							}, {
								header : '登出日期  YYYY-MM-DD',
								isExp : false,

								dataIndex : 'logoutDate'
							}, {
								header : '登出时间  YYYY-MM-DD 24H:MM:SS',
								isExp : false,

								dataIndex : 'logoutTime'
							}, {
								header : '登出原因  0、默认；99、强制签出',
								isExp : false,

								dataIndex : 'logoutReason'
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
				// var searchPanel = Ext.getCmp('UnimAgentloginlogSearchPanel');
				// var gridPanel = Ext.getCmp('UnimAgentloginlogGrid');
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
							new UnimAgentloginlogForm({
										aid : rec.data.aid
									}).show();
						});
			},
			// 创建记录
			createRs : function() {
				// new UnimAgentloginlogForm().show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('UnimAgentloginlogForm');
				if (aForm != null) {
					tabs.remove('UnimAgentloginlogForm');
				}
				aForm = new UnimAgentloginlogForm();
				tabs.add(aForm);
				tabs.activate(aForm);

			},
			// 按ID删除记录
			removeRs : function(id) {
				$postSubmit({
							url : __ctxPath
									+ '/unim/multiDelUnimAgentloginlog.do',
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
							url : __ctxPath
									+ '/unim/multiDelUnimAgentloginlog.do',
							grid : this.gridPanel,
							idName : 'aid',
							msgNull : '请选择要删除的记录！',
							msgTip : '您确认要删除所选记录吗？',
							msgSuccess : '成功删除该记录！',
							msgFailure : '操作出错，请联系管理员！'
						});
			},
			// 编辑Rs
			editRs : function(record) {
				// new UnimAgentloginlogForm({
				// aid : record.data.aid
				// }).show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('UnimAgentloginlogForm');
				if (aForm != null) {
					tabs.remove('UnimAgentloginlogForm');
				}
				aForm = new UnimAgentloginlogForm({
							aid : record.data.aid
						});
				tabs.add(aForm);
				tabs.activate(aForm);
			},
			// 行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this, record.data.aid);
						break;
					case 'btn-edit' :
						this.editRs.call(this, record);
						break;
					default :
						break;
				}
			}
		});
