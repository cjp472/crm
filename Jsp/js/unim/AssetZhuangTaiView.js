

AssetZhuangTaiView = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		AssetZhuangTaiView.superclass.constructor.call(this, {
					id : 'AssetZhuangTaiViewWin',
					title : '资产状态管理',
					region : 'center',
					layout : 'border',
					items : [this.treepanel,{
						layout:'border',
						region:'center',
						border:false,
						items:[this.searchPanel,this.gridPanel]
					}]
				});
	},// end of constructor
	// 初始化组件
	initUIComponents : function() {
		
		this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							height : 35,
							items : [{

										width : 50,
										style : 'text-align:right',
										html : '名称：'
									}, {

										name : 'Q_statusName_S_LK',
										xtype : 'textfield'
									}, {

										width : 50,
										style : 'text-align:right',
										html : '编号：'
									}, {

										name : 'Q_statusCode_S_LK',
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
											new UnimCategoryAdvancedSearchWin()
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
		this.treepanel = new Ext.tree.TreePanel({
			title : '资产状态',
			region : 'west',
			collapsible : true,
			autoScroll : true,
			split : true,
			height : 800,
			id:'UnimAssStatusSearchPanel',
			width : 180,
			tbar : new Ext.Toolbar({
				items : [{
							xtype : 'button',
							iconCls : 'btn-refresh',
							text : '刷新',
							handler : function() {
								var tree = Ext
										.getCmp('UnimAssStatusSearchPanel');
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
										.getCmp('UnimAssStatusSearchPanel');
								tree.expandAll();
							}
						}, {
							xtype : 'button',
							text : '收起',
							iconCls : 'btn-collapse',
							handler : function() {
								var tree = Ext
										.getCmp('UnimAssStatusSearchPanel');
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
						url : __ctxPath + '/unim/listTreeUnimAssStatus.do'
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
							},
//							{
//								iconCls : 'btn-add',
//								// text : __create+'[UnimAgentMap]',
//								text : '启用',
//								xtype : 'button',
//								scope : this,
//								handler : function(){}
//							},
							{
								iconCls : 'btn-del',
								text : '注销',
								xtype : 'button',
								scope : this,
								handler : this.removeRs
							}]
				});

		this.gridPanel = new HT.GridPanel({
			region : 'center',
			tbar : this.topbar,
			// 使用RowActions
			rowActions : true,
			printable : false,
			exportable : false,
			id : 'UnimAssStatusGrid',
			url : __ctxPath + "/unim/listUnimAssStatus.do",
			fields : [{
						name : 'statusId',
						type : 'Long'
					}, 'statusId', 'statusName', 'statusCode', 'extend1',
					'status'],
			columns : [{
						header : 'statusId',
						dataIndex : 'statusId',
						hidden : true
					}, {
						header : '名称',
						isExp : false,
						dataIndex : 'statusName'
					}, {
						header : '编号',
						isExp : false,
						dataIndex : 'statusCode'
					}, {
						header : '显示颜色',
						isExp : false,
						dataIndex : 'extend1'
//						renderer:function(val){
//							return '<div style="background-color:red;width:100%">&nbsp;</div>'
//						}
					}, {
						header : '状态',
						isExp : false,
						dataIndex : 'status',
						renderer : function(value) {
						if(value) {
						   return QC_ZBZT.get(value);	
						}
						   return '';
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
		var recordType = this.gridPanel.getStore().recordType;
				this.gridPanel.getStore().add(new recordType({
					mapName:'车辆',
					mapNavId:'ZC_CL',
					address:'',
					bkfileUrl:'正常'
				}));
		
		this.gridPanel.addListener('rowdblclick', this.rowClick);

	},// end of the initComponents()
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
					new AssetZhuangTaiForm({
								statusId : rec.data.statusId
							}).show();
				});
	},
		/**
 * 节点单击事件
 * 
 * @param node
 */
	clickNode:function(node) {
		if (node != null) {
			this.select(node);
		}
	},
	
	/**
 * 条件查询
 * 
 * @param node
 */
   select : function(node) {
	var users = Ext.getCmp('UnimAssStatusGrid');
	var store = users.getStore();
	store.url = __ctxPath + '/unim/listUnimAssStatus.do';
	store.baseParams = { 
				'Q_unimAssCategory.catId_L_EQ' : node.id>0?node.id:''
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
	// 创建记录
	createRs : function() {
		new AssetZhuangTaiForm().show();
//		var tabs = Ext.getCmp('centerTabPanel');
//		var aForm = Ext.getCmp('AssetZhuangTaiForm');
//		if (aForm != null) {
//			tabs.remove('AssetZhuangTaiForm');
//		}
//		aForm = new AssetZhuangTaiForm();
//		tabs.add(aForm);
//		tabs.activate(aForm);

	},
	// 按ID删除记录
	removeRs : function(id) {
			$gridRs( {
				url : __ctxPath + '/unim/zhuXiaoUnimAssStatus.do',
				grid : this.gridPanel,
//				ids : id,
				idName : 'statusId',
				msgNull : '请选择要注销的记录！',
				msgTip : '您确认要注销所选记录吗？',
				msgSuccess : '成功注销该记录！',
				msgFailure : '操作出错，请联系管理员！'
			});
	},
	// 把选中ID删除
	removeSelRs : function() {
		$gridRs({
					url : __ctxPath + '/unim/multiDelUnimAgentMap.do',
					grid : this.gridPanel,
					idName : 'mapId',
					msgNull : '请选择要删除的记录！',
					msgTip : '您确认要删除所选记录吗？',
					msgSuccess : '成功删除该记录！',
					msgFailure : '操作出错，请联系管理员！'
				});
	},
	// 编辑Rs
	editRs : function(record) {
		 new AssetZhuangTaiForm({
		 statusId: record.data.statusId
		 }).show();
//		var tabs = Ext.getCmp('centerTabPanel');
//		var aForm = Ext.getCmp('AssetZhuangTaiForm');
//		if (aForm != null) {
//			tabs.remove('AssetZhuangTaiForm');
//		}
//		aForm = new AssetZhuangTaiForm({
//					mapId : record.data.mapId
//				});
//		tabs.add(aForm);
//		tabs.activate(aForm);
	},
	// 行的Action
	onRowAction : function(grid, record, action, row, col) {
		switch (action) {
			case 'btn-del' :
				this.removeRs.call(this, record.data.typeId);
				break;
			case 'btn-edit' :
				this.editRs.call(this, record);
				break;
			default :
				break;
		}
	}
});

