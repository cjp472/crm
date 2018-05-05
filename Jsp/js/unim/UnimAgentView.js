UnimAgentView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				UnimAgentView.superclass.constructor.call(this, {
							id : 'UnimAgentViewWin',
							title : '员工管理',
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
				var fieldnameComboData = [
						['aid', '工号', new Ext.form.TextField({
											name : 'aid',
											allowBlank : true
										})],
						['agentName', '名称', new Ext.form.TextField({
											name : 'agentName',
											allowBlank : true
										})],
						['agentPass', '密码', new Ext.form.TextField({
											name : 'agentPass',
											allowBlank : true
										})],
						/*
						['serverId', '所属服务器', new Ext.form.ComboBox({
									editabel : false,
									lazyInit : false,
									triggerAction : 'all',
									store : new Ext.data.SimpleStore({
												autoLoad : true,
												url : __ctxPath
														+ '/unim/listUnimServerConfig.do',
												fields : ['serverId',
														'serverIdName']
											}),
									displayField : 'serverIdName',
									valueField : 'serverId',
									id : 'serverId'
								})],*/
						['agentCode', '分类', new Ext.form.TextField({
											name : 'agentCode',
											allowBlank : true
										})],
						['ismonitor', '是否监控1是2否', new Ext.form.NumberField({
											name : 'ismonitor',
											allowBlank : true
										})],
						['remark', '备注', new Ext.form.TextField({
											name : 'remark',
											allowBlank : true
										})]]
				var UnimAgentAdvancedSearchWin = Ext.extend(
						MT.AdvancedSearchWin, {
							title : '座席高级查询',
							fieldData : fieldnameComboData
						});
				// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'UnimAgentSearchPanel',
							height : 35,
							items : [{
										style : 'margin-top:-3px',
										html : '座席编号：'
									}, {
										name : 'Q_aid_S_LK',
										xtype : 'textfield'
									}, {
										style : 'margin-top:-3px',
										html : '工号：'
									}, {
										name : 'empNo',
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
											new UnimAgentAdvancedSearchWin()
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
							items : ['->', {
										iconCls : 'btn-add',
										// text : __create+'[UnimAgent]',
										text : '添加',
										xtype : 'button',
										scope : this,
										handler : this.createRs
									}, {
										iconCls : 'btn-del',
										// text : __delete+'[UnimAgent]',
										text : '注销',
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
					id : 'UnimAgentGrid',
					url : __ctxPath + "/unim/listUnimAgent.do?Q_ismonitor_L_EQ=0",
					fields : [{
								name : 'agentId',
								type : 'int'
							}, 'aid', 'agentName', 'agentPass','depName','employeeId',
							'agentCode', 'ismonitor', 'remark','status','jobType','jobClass'],
					columns : [{
								header : 'agentId',
								dataIndex : 'agentId',
								hidden : true
							}, {
								header : '员工编号',
								isExp : false,
								dataIndex : 'aid'
							}, {
								header : '工号',
								isExp : false,

								dataIndex : 'employeeId'
							}, {
								header : '姓名',
								isExp : false,
								dataIndex : 'agentName'
							}, {
								header : '部门',
								isExp : false,
								dataIndex : 'depName'
							}, {
								header : '职务',
								isExp : false,
								dataIndex : 'jobType',
								renderer : function(value) {
									if(value) {
										return ZW001.get(value);
									}
									return '';
								}
							}, {
								header : '级别',
								isExp : false,
								dataIndex : 'jobClass',
								renderer : function(value) {
									if(value) {
										return ZJ001.get(value);																			
									}
									return ''
								}
							}, {
								header : '状态',
								isExp : false,
								dataIndex : 'status',
								renderer : function(value) {
									if(value) {
										return ZZJGZT0001.get(value);																			
									}
									return ''
								}
							}, new Ext.ux.grid.RowActions({
										header : __action,
										width : 50,
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
				// var searchPanel = Ext.getCmp('UnimAgentSearchPanel');
				// var gridPanel = Ext.getCmp('UnimAgentGrid');
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
							var tabs = Ext.getCmp('centerTabPanel');
							var aForm = Ext.getCmp('UnimAgentForm');
							if (aForm != null) {
								tabs.remove('UnimAgentForm');
							}
							aForm = new UnimAgentForm({
										agentId : rec.data.agentId
									});
							tabs.add(aForm);
							tabs.activate(aForm);
						});
			},
			// 创建记录
			createRs : function() {
//				new UnimAgentForm().show();
				 var tabs = Ext.getCmp('centerTabPanel');
				 var aForm = Ext.getCmp('UnimAgentFormWin');
				 if (aForm != null) {
				 tabs.remove('UnimAgentFormWin');
				 }
				 aForm = new UnimAgentForm();
				 tabs.add(aForm);
				 tabs.activate(aForm);

			},
			// 按ID删除记录
			removeRs : function(id) {
				$postSubmit({
							url : __ctxPath + '/unim/multiDelUnimAgent.do',
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
							url : __ctxPath + '/unim/multiDelUnimAgent.do',
							grid : this.gridPanel,
							idName : 'agentId',
							msgNull : '请选择要删除的记录！',
							msgTip : '您确认要删除所选记录吗？',
							msgSuccess : '成功删除该记录！',
							msgFailure : '操作出错，请联系管理员！'
						});
			},
			// 编辑Rs
			editRs : function(record) {
//				 new UnimAgentForm({
//				 	agentId : record.data.agentId
//				 }).show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('UnimAgentForm');
				if (aForm != null) {
					tabs.remove('UnimAgentForm');
				}
				aForm = new UnimAgentForm({
							agentId : record.data.agentId
						});
				tabs.add(aForm);
				tabs.activate(aForm);
			},
			// 行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this, record.data.agentId);
						break;
					case 'btn-edit' :
						this.editRs.call(this, record);
						break;
					default :
						break;
				}
			}
		});
