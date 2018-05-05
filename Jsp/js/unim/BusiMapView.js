
BusiMapView = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		BusiMapView.superclass.constructor.call(this, {
					id : 'BusiMapViewWin',
					title : '监控视图管理',
					region : 'center',
					layout : 'border',
					items : [this.treepanel,this.gridPanel]
				});
	},// end of constructor
	// 初始化组件
	initUIComponents : function() {
		this.treepanel = new Ext.tree.TreePanel({
			title : '监控视图导航',
			region : 'west',
			collapsible : true,
			autoScroll : true,
			split : true,
			height : 800,
			width : 180,
			id : 'ChannelViewSearchPanel',
			tbar : new Ext.Toolbar({
				items : [{
							xtype : 'button',
							iconCls : 'btn-refresh',
							text : '刷新',
							handler : function() {
								var tree = Ext.getCmp('ChannelViewSearchPanel');
								tree.body.mask(__maskLoading, 'x-mask-loading');
								tree.root.reload();
								tree.root.collapse(true, false);
								tree.root.expand(false, false, function() {
											tree.body.unmask();// 全部展开之后让蒙版消失
										});
							}
						}, {
							xtype : 'button',
							text : '展开',
							iconCls : 'btn-expand',
							handler : function() {
								var tree = Ext
										.getCmp('ChannelViewSearchPanel');
								tree.expandAll();
							}
						}, {
							xtype : 'button',
							text : '收起',
							iconCls : 'btn-collapse',
							handler : function() {
								var tree = Ext
										.getCmp('ChannelViewSearchPanel');
								tree.collapseAll();
							}
						}]
			}),
			autoScroll : true,
			animate : true,
			// checkModel : 'multiple',
			containerScroll : true,
			lines : true,// 节点之间连接的横竖线
			rootVisible : false,// 是否显示根节点
			collapsible : true,
			split : true,
			// cascadeCheck : 'all',
			border : false,
			frame : false,
			loader : new Ext.tree.TreeLoader({
						url : __ctxPath + '/unim/listUnimChannelNavigation.do'
					}),
			root : new Ext.tree.AsyncTreeNode({
					}),
			listeners : {
				scope:this,
				'click' : this.clickNode
			},
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
			}
		});
//		Ext.getCmp('ChannelViewSearchPanel').on('contextmenu', this.contextmenu, this);
//		this.treePanel.on('contextmenu', this.contextmenu, this);
		
		this.topbar = new Ext.Toolbar({
					items : ['->',{
								iconCls : 'btn-add',
								// text : __create+'[UnimAgentMap]',
								text : __create,
								xtype : 'button',
								scope : this,
								handler : this.createRs
							},{
								iconCls : 'btn-setting',
								// text : __create+'[UnimAgentMap]',
								text : '批量启用',
								xtype : 'button',
								scope : this,
								handler : this.qiyonglRs
							}, {
								iconCls : 'btn-del',
								// text : __delete+'[UnimAgentMap]',
								text : '批量删除',
								xtype : 'button',
								scope : this,
								handler : this.removeall
							}]
				});

		this.gridPanel = new HT.GridPanel({
			region : 'center',
			tbar : this.topbar,
			// 使用RowActions
			rowActions : true,
			printable : false,
			exportable : false,
			id : 'UnimChanneltMapGrid',
			url : __ctxPath + "/unim/listNavingaUnimChannelNavigation.do",
			fields : [{
						name : 'mapNavId',
						type : 'Long'
					},'navName', 'orderno', 'parentid', 'status',
					'remark','parentNam','mapNam'],
			columns : [{
						header : 'mapNavId',
						dataIndex : 'mapNavId',
						hidden : true
					}, {
						header : '导航名称',
						name:'navName',
						isExp : false,
						dataIndex : 'navName'
					}, {
						header : '上级导航',
						name:'parentNam',
						isExp : false,
						dataIndex : 'parentNam'
					}, {
						header : '座监控视图',
						isExp : false,
						dataIndex : 'mapNam'
					}, {
						header : '状态',
						isExp : false,
						dataIndex : 'status',
						renderer : function(value) {
							return QC_ZBZT.get(value);	
						}
					}, new Ext.ux.grid.RowActions({
								header : __action,
								width : 100,
								actions : [{
											iconCls : 'btn-edit',
											qtip : '明细',
											style : 'margin:0 3px 0 3px'
										}, {
											iconCls : 'btn-setting',
											qtip : '启用',
											style : 'margin:0 3px 0 3px'
										},{
											iconCls : 'btn-del',
											qtip :'删除/注销',
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
//		Ext.getCmp('UnimChanneltMapGrid').on('contextmenu', this.contextmenu, this);

	},// end of the initComponents()
	/**
 * 节点单击事件
 * 
 * @param node
 */
	clickNode:function(node) {
		if (node != null) {
			var bookView = this.gridPanel;
			if (node.id == 0) {
				bookView.setTitle('所有联系人');
			} else {
				bookView.setTitle(node.text + '组列表');
			}
			this.select(node);
		}
	},

	
	/**
 * 条件查询
 * 
 * @param node
 */
   select : function(node) {
	var users = Ext.getCmp('UnimChanneltMapGrid');
	var store = users.getStore();
	store.url = __ctxPath + '/unim/listNavingaUnimChannelNavigation.do';
	store.baseParams = { 
				'Q_mapNavId_L_EQ' : node.id>0?node.id:''
//				'Q_appUser.userId_L_EQ':curUserInfo.userId
//				'Q_phoneGroup.isPublic_SN_EQ':0
			};
	store.reload({
		params : {
			start : 0,
			limit : store.baseParams.limit
		}
	});
},
	contextmenu:function(node, e) {
		var treeMenu = new Ext.menu.Menu({
			items : [{
						text : '新建组',
						scope : this,
						iconCls : 'btn-add',
						handler : this.createNode
					}, {
						text : '修改组',
						scope : this,
						iconCls : 'btn-edit',
						handler : this.editNode
					}, {
						text : '删除组',
						scope : this,
						iconCls : 'btn-delete',
						handler : this.deleteNode
						}
					]
		});
		this.selectedNode = new Ext.tree.TreeNode({
					id : node.id,
					text : node.text
				});
		treeMenu.showAt(e.getXY());
	},
	createNode:function(){
		var parentid = this.selectedNode.id;
	    new BusiMapForm({parentid:parentid}).show();
	},
	editNode:function(){
	    var parentid = this.selectedNode.id;
		if (parentid > 0) {
			new BusiMapForm({mapNavId:parentid}).show();
		} else {
			Ext.MessageBox.show({
				title : '操作信息',
				msg : '该处不能被修改',
				buttons : Ext.MessageBox.OK,
				icon : 'ext-mb-error'
			});
		}
	},
	deleteNode:function(){
	    var groupId = this.selectedNode.id;
	    var treePanel=Ext.getCmp('ChannelViewSearchPanel');
		Ext.Ajax.request({
			url : __ctxPath + '/unim/listUnimAgentMap.do',
			params : {
				'Q_unimMapNavigation.mapNavId_L_EQ' : groupId
			},
			method : 'post',
			success : function(result, request) {
				var count = Ext.util.JSON.decode(result.responseText).count;
				Ext.Msg.confirm('删除操作', '组里还有' + count + '个地图，你确定删除目录组吗?',
						function(btn) {
							if (btn == 'yes') {
								Ext.Ajax.request({
									url : __ctxPath + '/unim/multiDelUnimChannelNavigation.do',
									params : {
										ids : groupId
									},
									method : 'post',
									success : function(result, request) {
										Ext.ux.Toast.msg('操作信息', '成功删除目录！');
										treePanel.root.reload();
	                                    var store= Ext.getCmp('UnimChanneltMapGrid').getStore();
										store.reload();
									},
									failure : function(result, request) {
										Ext.MessageBox.show({title : '操作信息',msg : '信息保存出错，请联系管理员！',buttons : Ext.MessageBox.OK,icon : 'ext-mb-error'});
									}
								});

							}
						});
				
			},
			failure : function(result, request) {
			}
		});
	},

	// 重置查询表单
	reset : function() {
		this.searchPanel.getForm().reset();
	},
	// 按条件搜索
	onSearch : function(obj) {
		// var searchPanel = Ext.getCmp('UnimAgentMapSearchPanel');
		// var gridPanel = Ext.getCmp('UnimChanneltMapGrid');
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
					new BusiMapForm({
								mapNavId : rec.data.mapNavId
							}).show();
				});
	},
	// 创建记录
	createRs : function() {
		var node = Ext.getCmp('ChannelViewSearchPanel').getSelectionModel().getSelectedNode();
		if(node!=null){
			var parentid = node.id;
		    new BusiMapForm({parentid:parentid}).show();
	    }
		else{
			Ext.ux.Toast.msg('操作信息', '请选择父节点！');
		}
//		var tabs = Ext.getCmp('centerTabPanel');
//		var aForm = Ext.getCmp('BusiMapForm');
//		if (aForm != null) {
//			tabs.remove('BusiMapForm');
//		}
//		aForm = new BusiMapForm();
//		tabs.add(aForm);
//		tabs.activate(aForm);

	},
	//批量删除
	removeall:function(id){
		$gridRs( {
		url : __ctxPath + '/unim/multiDelUnimChannelNavigation.do',
		grid : this.gridPanel,
		idName : 'mapNavId',
		msgTip : '您确认要删除所选记录吗？',
		msgSuccess : '成功删除该记录！',
		msgFailure : '操作出错，请联系管理员！'
	});
	},
		// 按ID删除记录or注销
	removeRs : function(id) {
		var rows = Ext.getCmp("UnimChanneltMapGrid").getSelectionModel().getSelections();
		var huosta = rows[0].data.status;
		if (huosta == 1) {
			$gridRs( {
				url : __ctxPath + '/unim/zhuXiaoUnimChannelNavigation.do',
				grid : this.gridPanel,
//				ids : id,
				idName : 'mapNavId',
				msgNull : '请选择要注销的记录！',
				msgTip : '您确认要注销所选记录吗？',
				msgSuccess : '成功注销该记录！',
				msgFailure : '操作出错，请联系管理员！'
			});

		}
			if (huosta == 0 || huosta==2) {
				$gridRs( {
					url : __ctxPath + '/unim/multiDelUnimChannelNavigation.do',
					grid : this.gridPanel,
//					ids : id,
					idName : 'mapNavId',
					msgTip : '您确认要删除所选记录吗？',
					msgSuccess : '成功删除该记录！',
					msgFailure : '操作出错，请联系管理员！'
				});
			}
		

	},
	// 批量启用活动
	qiyonglRs : function(id) {
		var rows = Ext.getCmp("UnimChanneltMapGrid").getSelectionModel().getSelections();
				    $gridRs( {
					url : __ctxPath + '/unim/qiYongUnimChannelNavigation.do',
					grid : this.gridPanel,
//					ids : id,
					idName : 'mapNavId',
					msgNull : '请选择要启用的记录！',
					msgTip : '是否启用导航地图？',
					msgSuccess : '成功启用该记录！',
					msgFailure : '操作出错，请联系管理员！'
			 });

	},
	// 把选中ID删除
	removeSelRs : function() {
		$gridRs({
					url : __ctxPath + '/unim/multiDelUnimChannelNavigation.do',
					grid : this.gridPanel,
					idName : 'mapNavId',
					msgNull : '请选择要删除的记录！',
					msgTip : '您确认要删除所选记录吗？',
					msgSuccess : '成功删除该记录！',
					msgFailure : '操作出错，请联系管理员！'
				});
	},
	// 编辑Rs
	editRs : function(record) {
		 new BusiMapForm({
		mapNavId : record.data.mapNavId
		 }).show();
//		var tabs = Ext.getCmp('centerTabPanel');
//		var aForm = Ext.getCmp('BusiMapForm');
//		if (aForm != null) {
//			tabs.remove('BusiMapForm');
//		}
//		aForm = new BusiMapForm({
//					mapNavId : record.data.mapNavId
//				});
//		tabs.add(aForm);
//		tabs.activate(aForm);
	},
	// 行的Action
	onRowAction : function(grid, record, action, row, col) {
		switch (action) {
			case 'btn-del' :
				this.removeRs.call(this, record.data.mapNavId);
				break;
			case 'btn-edit' :
				this.editRs.call(this, record);
				break;
			case 'btn-setting' :
				this.qiyonglRs.call(this, record.data.mapNavId);
				break;
				
			default :
				break;
		}
	}
});

