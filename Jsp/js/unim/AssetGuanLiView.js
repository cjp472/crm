
AssetGuanLiView = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		AssetGuanLiView.superclass.constructor.call(this, {
					id : 'AssetGuanLiViewWin',
					title : '资产管理',
					region : 'center',
					layout : 'border',
					items : [this.treepanel,this.gridPanel]
				});
	},// end of constructor
	// 初始化组件
	initUIComponents : function() {
		
		this.treepanel = new Ext.tree.TreePanel({
			title : '资产类型',
			region : 'west',
			collapsible : true,
			autoScroll : true,
			split : true,
			height : 800,
			width : 180,
			id : 'Unim_AssetMan_Tree_Id',
			tbar : new Ext.Toolbar({
				items : [{
							xtype : 'button',
							iconCls : 'btn-refresh',
							text : '刷新',
							handler : function() {
								var tree = Ext.getCmp('Unim_AssetMan_Tree_Id');
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
								var tree = Ext.getCmp('Unim_AssetMan_Tree_Id');
								tree.expandAll();
							}
						}, {
							xtype : 'button',
							text : '收起',
							iconCls : 'btn-collapse',
							handler : function() {
								var tree = Ext.getCmp('Unim_AssetMan_Tree_Id');
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
						url : __ctxPath + '/unim/listTreeUnimAssCategory.do'
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
		
		this.topbar = new Ext.Toolbar({
					items : ['->',{
								iconCls : 'btn-add',
								// text : __create+'[UnimAgentMap]',
								text : __create,
								xtype : 'button',
								scope : this,
								handler : this.createRs
							}, {
								iconCls : 'btn-del',
								// text : __delete+'[UnimAgentMap]',
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
			id : 'AssetGuanLiViewGrid',
			url : __ctxPath + "/unim/listUnimAssets.do",
			fields : [{
						name : 'assetsId',
						type : 'int'
					}, 'assetsName', 'assetsCode', 'depId', 'remark','assDesc',
					'status','perName','typName'],
					columns : [{
						header : 'assetsId',
						dataIndex : 'assetsId',
						hidden : true
					}, {
						header : '名称',
						isExp : false,
						dataIndex : 'assetsName'
					}, {
						header : '编号',
						isExp : false,
						dataIndex : 'assetsCode'
					}, {
						header : '类别',
						isExp : false,
						dataIndex : 'typName'
					}, {
						header : '描述',
						isExp : false,
						dataIndex : 'assDesc'
					}, {
						header : '负责人',
						isExp : false,
						dataIndex : 'perName'
					}, {
						header : '状态',
						isExp : false,
						dataIndex : 'status',
						renderer : function(value) {
							return ZZJGZT0001.get(value);
						}
					}, new Ext.ux.grid.RowActions({
								header : __action,
								width : 100,
								actions : [{
											iconCls : 'btn-edit',
											qtip : '明细',
											style : 'margin:0 3px 0 3px'
										},{
											iconCls : 'btn-del',
											qtip : '注销',
											style : 'margin:0 3px 0 3px'
										}],
								listeners : {
									scope : this,
									'action' : this.onRowAction
								}
							})]
				// end of columns
			});
//		var recordType = this.gridPanel.getStore().recordType;
//				this.gridPanel.getStore().add(new recordType({
//					mapName:'深航贵宾厅',
//					mapNavId:'2000002',
//					address:'厅房',
//					reamrk:'',
//					width:'',
//					height:''
//				}));
				
		this.gridPanel.addListener('rowdblclick', this.rowClick);

	},// end of the initComponents()
	clickNode : function(node) {
		var catId =  node.id>0?node.id:'';
		var users = Ext.getCmp('AssetGuanLiViewGrid');
		var store = users.getStore();
		store.url = __ctxPath + "/unim/listUnimAssets.do",
		store.baseParams = { 
					'Q_unimAssCategory.catId_L_EQ' : catId
				};
		store.reload({
			params : {
				start : 0,
				limit : store.baseParams.limit
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
		// var gridPanel = Ext.getCmp('UnimAgentMapGrid');
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
					new AssetGuanLiForm({
								assetsId : rec.data.assetsId
							}).show();
				});
	},
	// 创建记录
	createRs : function() {
		new AssetGuanLiForm().show();
	},
	// 按ID删除记录
	removeRs : function(id) {
		$postSubmit({
					url : __ctxPath + '/unim/multiDelUnimAssets.do',
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
					url : __ctxPath + '/unim/multiDelUnimAssets.do',
					grid : this.gridPanel,
					idName : 'assetsId',
					msgNull : '请选择要注销的记录！',
					msgTip : '您确认要注销所选记录吗？',
					msgSuccess : '成功注销该记录！',
					msgFailure : '操作出错，请联系管理员！'
				});
	},
	// 编辑Rs
	editRs : function(record) {
		 new AssetGuanLiForm({
			assetsId : record.data.assetsId
		 }).show();
	},
	// 行的Action
	onRowAction : function(grid, record, action, row, col) {
		switch (action) {
			case 'btn-del' :
				this.removeRs.call(this, record.data.assetsId);
				break;
			case 'btn-edit' :
				this.editRs.call(this, record);
				break;
			default :
				break;
		}
	}
});
