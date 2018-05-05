/**
 * @author:cf0666@gmail.com
 * @class UnimServerConfigView
 * @extends Ext.Panel
 * @description [UnimServerConfig]管理
 * @company 优创融联科技
 * @createtime:
 */
UnimServerConfigView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				UnimServerConfigView.superclass.constructor.call(this, {
							id : 'UnimServerConfigViewWin',
							title : '[UnimServerConfig]管理',
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
				var fieldnameComboData = [
						['serverCode', '编号', new Ext.form.TextField({
											name : 'serverCode',
											allowBlank : true
										})],
						['serverName', '名称', new Ext.form.TextField({
											name : 'serverName',
											allowBlank : true
										})],
						['serverType', '类型', new Ext.form.TextField({
											name : 'serverType',
											allowBlank : true
										})],
						['ipAddress', 'IP地址', new Ext.form.TextField({
											name : 'ipAddress',
											allowBlank : true
										})],
						['ipPort', '端口', new Ext.form.NumberField({
											name : 'ipPort',
											allowBlank : true
										})],
						['remark', '描述', new Ext.form.TextField({
											name : 'remark',
											allowBlank : true
										})]]
				var UnimServerConfigAdvancedSearchWin = Ext.extend(
						MT.AdvancedSearchWin, {
							title : '[UnimServerConfig]高级查询',
							fieldData : fieldnameComboData
						});
				// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'UnimServerConfigSearchPanel',
							height : 35,
							items : [{

										name : 'Q_serverCode_S_EQ',
										xtype : 'textfield'
									}, {

										name : 'Q_serverName_S_EQ',
										xtype : 'textfield'
									}, {

										name : 'Q_serverType_S_EQ',
										xtype : 'textfield'
									}, {

										name : 'Q_ipAddress_S_EQ',
										xtype : 'textfield'
									}, {

										name : 'Q_ipPort_L_EQ',
										xtype : 'numberfield'
									}, {

										name : 'Q_remark_S_EQ',
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
											new UnimServerConfigAdvancedSearchWin()
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
										// text : __create+'[UnimServerConfig]',
										text : __create,
										xtype : 'button',
										scope : this,
										handler : this.createRs
									}, {
										iconCls : 'btn-del',
										// text : __delete+'[UnimServerConfig]',
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
					id : 'UnimServerConfigGrid',
					url : __ctxPath + "/unim/listUnimServerConfig.do",
					fields : [{
								name : 'serverId',
								type : 'int'
							}, 'serverCode', 'serverName', 'serverType',
							'ipAddress', 'ipPort', 'remark'],
					columns : [{
								header : 'serverId',
								dataIndex : 'serverId',
								hidden : true
							}, {
								header : '编号',
								isExp : false,

								dataIndex : 'serverCode'
							}, {
								header : '名称',
								isExp : false,

								dataIndex : 'serverName'
							}, {
								header : '类型',
								isExp : false,

								dataIndex : 'serverType'
							}, {
								header : 'IP地址',
								isExp : false,

								dataIndex : 'ipAddress'
							}, {
								header : '端口',
								isExp : false,

								dataIndex : 'ipPort'
							}, {
								header : '描述',
								isExp : false,

								dataIndex : 'remark'
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
				// var searchPanel = Ext.getCmp('UnimServerConfigSearchPanel');
				// var gridPanel = Ext.getCmp('UnimServerConfigGrid');
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
							new UnimServerConfigForm({
										serverId : rec.data.serverId
									}).show();
						});
			},
			// 创建记录
			createRs : function() {
				// new UnimServerConfigForm().show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('UnimServerConfigForm');
				if (aForm != null) {
					tabs.remove('UnimServerConfigForm');
				}
				aForm = new UnimServerConfigForm();
				tabs.add(aForm);
				tabs.activate(aForm);

			},
			// 按ID删除记录
			removeRs : function(id) {
				$postSubmit({
							url : __ctxPath
									+ '/unim/multiDelUnimServerConfig.do',
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
									+ '/unim/multiDelUnimServerConfig.do',
							grid : this.gridPanel,
							idName : 'serverId',
							msgNull : '请选择要删除的记录！',
							msgTip : '您确认要删除所选记录吗？',
							msgSuccess : '成功删除该记录！',
							msgFailure : '操作出错，请联系管理员！'
						});
			},
			// 编辑Rs
			editRs : function(record) {
				// new UnimServerConfigForm({
				// serverId : record.data.serverId
				// }).show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('UnimServerConfigForm');
				if (aForm != null) {
					tabs.remove('UnimServerConfigForm');
				}
				aForm = new UnimServerConfigForm({
							serverId : record.data.serverId
						});
				tabs.add(aForm);
				tabs.activate(aForm);
			},
			// 行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this, record.data.serverId);
						break;
					case 'btn-edit' :
						this.editRs.call(this, record);
						break;
					default :
						break;
				}
			}
		});
