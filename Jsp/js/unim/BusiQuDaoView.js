BusiQuDaoView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				BusiQuDaoView.superclass.constructor.call(this, {
							id : 'BusiQuDaoViewWin',
							title : '渠道管理',
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
							height : 35,
							items : [{
										style : 'margin-top:-3px',
										html : '名称：'
									}, {
										name : 'Q_channelName_S_LK',
										xtype : 'textfield'
									}, {
										style : 'margin-top:-3px',
										html : '编号：'
									}, {
										name : 'Q_channelCode_S_LK',
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
//					showPaging : false,	
					id : 'UnimChannelGrid',
					url : __ctxPath + "/unim/listUnimChannel.do",
					fields : [{
								name : 'channelId',
								type : 'int'
							}, 'channelName', 'channelCode', 'remark',
							'orderno', 'status'],
					columns : [{
								header : 'channelId',
								dataIndex : 'channelId',
								hidden : true
							}, {
								header : '名称',
								isExp : false,
								dataIndex : 'channelName'
							}, {
								header : '编号',
								isExp : false,
								dataIndex : 'channelCode'
							}, {
								header : '备注',
								isExp : false,
								dataIndex : 'remark'
							}, {
								header : '状态',
								isExp : false,
								dataIndex : 'status',
								renderer : function(value) {
									if(value) {
										return ZZJGZT0001.get(value);
									}
									return '';
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
				$search({
					searchPanel : this.searchPanel,
					gridPanel : this.gridPanel	
				});
			},
			// GridPanel行点击处理事件
			rowClick : function(grid, rowindex, e) {
				grid.getSelectionModel().each(function(rec) {
							new BusiQudaoForm({
										channelId : rec.data.channelId
									}).show();
						});
			},
			// 创建记录
			createRs : function() {
				new BusiQudaoForm().show();
//				 var tabs = Ext.getCmp('centerTabPanel');
//				 var aForm = Ext.getCmp('BusiQudaoFormWin');
//				 if (aForm != null) {
//				 tabs.remove('BusiQudaoFormWin');
//				 }
//				 aForm = new BusiQudaoForm();
//				 tabs.add(aForm);
//				 tabs.activate(aForm);

			},
			// 按ID删除记录
			removeRs : function(id) {
				$postSubmit({
							url : __ctxPath + '/unim/multiDelUnimChannel.do',
							ids : id,
							grid : this.gridPanel,
							msgTip : '您确认要注销所选记录吗？',
							msgSuccess : '成功注销该记录！',
							msgFailure : '操作出错，请联系管理员！'
						});
			},
			// 把选中ID删除
			removeSelRs : function() {
				$gridRs({
							url : __ctxPath + '/unim/multiDelUnimChannel.do',
							grid : this.gridPanel,
							idName : 'channelId',
							msgNull : '请选择要注销的记录！',
							msgTip : '您确认要注销所选记录吗？',
							msgSuccess : '成功注销该记录！',
							msgFailure : '操作出错，请联系管理员！'
						});
			},
			// 编辑Rs
			editRs : function(record) {
				 new BusiQudaoForm({
				 	channelId : record.data.channelId,
				 	channelName : record.data.channelName,
				 	channelCode : record.data.channelCode
				 }).show();
//				var tabs = Ext.getCmp('centerTabPanel');
//				var aForm = Ext.getCmp('BusiQudaoForm');
//				if (aForm != null) {
//					tabs.remove('BusiQudaoForm');
//				}
//				aForm = new BusiQudaoForm({
//							agentId : record.data.agentId
//						});
//				tabs.add(aForm);
//				tabs.activate(aForm);
			},
			// 行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this, record.data.channelId);
						break;
					case 'btn-edit' :
						this.editRs.call(this, record);
						break;
					default :
						break;
				}
			}
		});
