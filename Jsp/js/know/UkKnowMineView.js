
UkKnowMineView = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		UkKnowMineView.superclass.constructor.call(this, {
					id : 'UkKnowMineViewWin',
					title : '我的知识',
					region : 'center',
					layout : 'border',
					items : [{
						title:'知识维度',
						region:'west',
//						collapsible : true,
						autoScroll : true,
						split : true,
						width : 200,
						split:true,
							items:[this.treepanel1,this.treepanel2,this.treepanel3]
					}, this.contentPanel]
				});
	},// end of constructor
	// 初始化组件
	initUIComponents : function() {
		this.searchPanel = new Ext.FormPanel({
					layout : 'hbox',
					region : 'north',
					id : 'UkKnowSysMapPanel',
					height : 35,
					items : [{
								text : '标题:',
								style:'margin-top:-3px'
							}, {
								name : 'Q_tiTle_S_LK',
								xtype : 'textfield'
							}, {
								text : "关键字:",
								style:'margin-top:-3px'
							}, {
								name : 'ukKnowKeyWord',
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
								handler : function() {
									var searchPanel = Ext
											.getCmp('UkKnowSysMapPanel');
									searchPanel.getForm().reset();
								}
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
		// 初始化树形Panel
		this.treepanel1 = new Ext.tree.TreePanel({
//			autoScroll : true,
			autoHeight : true,
			animate : true,
			containerScroll : true,
			lines : true,// 节点之间连接的横竖线
			rootVisible : true,// 是否显示根节点
			split : true,
			border : false,
			frame : false,
			loader : new Ext.tree.TreeLoader({
						url : __ctxPath + '/know/listDepTreeUkKnowDimensionality.do?flag=1'
					}),
			
			root : new Ext.tree.AsyncTreeNode({
						 id:"-1",
				         text:"机构知识",//节点名称
					     mark : 2,
				         expanded : false
					}),
			listeners : {
				'click' : UkKnowMineView.getData
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
		this.treepanel2 = new Ext.tree.TreePanel({
//			autoScroll : true,
			autoHeight : true,
			animate : true,
			containerScroll : true,
			lines : true,// 节点之间连接的横竖线
			rootVisible : true,// 是否显示根节点
			split : true,
			border : false,
			frame : false,
			loader : new Ext.tree.TreeLoader({
						url : __ctxPath + '/know/listJobTreeUkKnowDimensionality.do?flag=1'
					}),
			root : new Ext.tree.AsyncTreeNode({
						 id:"-2",
				         text:"岗位知识",//节点名称
						 mark : 3,
				         expanded:false//展开
					}),
			listeners : {
				'click' : UkKnowMineView.getData
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
		this.treepanel3 = new Ext.tree.TreePanel({
//			collapsible : true,
//			autoScroll : true,
			autoHeight : true,
			split : true,
//			width : 180,
			animate : true,
			// checkModel : 'multiple',
			containerScroll : true,
			lines : true,// 节点之间连接的横竖线
			rootVisible : true,// 是否显示根节点
//			collapsible : true,
			split : true,
			// cascadeCheck : 'all',
			border : false,
			frame : false,
			loader : new Ext.tree.TreeLoader({
						url : __ctxPath + '/know/listDimenByRoleUkKnowDimensionality.do'
					}),
			root : new Ext.tree.AsyncTreeNode({
						 id:"-3",
				         text:"业务知识",//节点名称
						 mark : 1,
				         expanded:false//展开
					}),
			listeners : {
				'click' : UkKnowMineView.getData
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
		this.gridPanel = new HT.GridPanel({
			region : 'center',
			// tbar : this.topbar,
			// 使用RowActions
//			rowActions : true,
			printable : false,
			showSm:false,
			exportable : false,
			id : 'UkKnowMineViewGrid',
			url : __ctxPath + "/know/listMyKnowUkSysKnow.do",
//			url : __ctxPath + "/know/queryKnowListUkSysKnow.do",
			baseParams :{
					status : 5
				}, 
			fields : [{
						name : 'knowId',
						type : 'int'
					}, 'ukKnowTemplate', 'ukKnowApprove', 'tiTle', 'busiType',
					'enableTime', 'pastTime', 'sysKnowStatus', 'viewCount',
					'sysKnowComment', 'plus1', 'plus2', 'plus3', 'plus4',
					'plus5', 'plus6', 'plus7', 'plus8', 'sysKnowVersion',
					'createBy', 'updateBy', 'createDate', 'updateDate',
					'userid', 'ukKnowTypes', 'ukKnowKeywords'],
			columns : [{
						header : __ukSysKnowKnowId,// 'knowId',
						dataIndex : 'knowId',
						hidden : true
					}, {
						header : __ukSysKnowKnowTmpId,// '知识模板编号',
						isExp : false,
						hidden : true,
						dataIndex : 'ukKnowTemplate',
						renderer : function(val) {
							return val != null ? val.tmpName : '';
						}
					}, {
						header : __ukSysKnowTiTle,// '标题',
						isExp : false,
						width:500,
						dataIndex : 'tiTle'
					}, {
						header : '开始时间',// '过期时间',
						isExp : false,
						dataIndex : 'pastTime'
					}, {
						header : '结束时间',// '过期时间',
						isExp : false,
						dataIndex : 'pastTime'
					},
					{
						header : '浏览数',// '浏览数',
						isExp : false,
						dataIndex : 'viewCount'
					}
					]
				// end of columns
			});
		this.contentPanel = new Ext.Panel({
					region : 'center',
					layout : 'border',
					items : [this.searchPanel, this.gridPanel]
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
			var tabs = Ext.getCmp('centerTabPanel');
			var aForm = Ext.getCmp('UkSysKnowShow');
			if (aForm != null) {
				tabs.remove('UkSysKnowShow');
			}
			var record = grid.getStore().getAt(rowindex); // Get the Record
			// var fieldName = grid.getColumnModel().getDataIndex(columnIndex); //
			// Get field name
			// var data = record.get(fieldName);
	
			aForm = new UkSysKnowShow({
						knowId : record.get('knowId'),
//						knowTmpId : record.get('knowTmpId'),
						knowTitle : record.get('tiTle')
					});
			tabs.add(aForm);
			tabs.activate(aForm);
		},
	// 创建记录
	createRs : function() {
		// new UkSysKnowForm().show();
		var tabs = Ext.getCmp('centerTabPanel');
		var aForm = Ext.getCmp('UkSysKnowForm');
		if (aForm != null) {
			tabs.remove('UkSysKnowForm');
		}
		aForm = new UkSysKnowForm();
		tabs.add(aForm);
		tabs.activate(aForm);

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
		new UkSysKnowForm({
					knowId : record.data.knowId
				}).show();
	},
	showRs : function(record) {
		var tabs = Ext.getCmp('centerTabPanel');
		var aForm = Ext.getCmp('UkSysKnowShow');
		if (aForm != null) {
			tabs.remove('UkSysKnowShow');
		}
		var collForm = Ext.getCmp('UkKnowCollectFormWin');
				if (collForm != null) {
					tabs.remove(collForm);
				}
		aForm = new UkSysKnowShow({
					knowId : record.data.knowId,
					knowTmpId : record.data.ukKnowTemplate.knowTmpId,
					knowTitle : record.data.tiTle
				});
		tabs.add(aForm);
		tabs.activate(aForm);
	},
	getDataRs : function() {
		var treePanel = Ext.getCmp('UkKnowMineViewSearchPanel');
		var knowTypeIds = treePanel.getSelectValue().toString();
		var grid = Ext.getCmp('UkKnowMineViewGrid');
		grid.setTitle('知识列表');
		var store = grid.getStore();
		store.url = __ctxPath + '/know/listMyKnowUkSysKnow.do';
		var paramObj = {
			start : 0,
			limit : 25
		};
		if (knowTypeIds != null && knowTypeIds != '') {
			paramObj["knowTypeIds"] = knowTypeIds;
		}
		store.reload({
					params : paramObj
				});
	},
	// 行的Action
	onRowAction : function(grid, record, action, row, col) {
		switch (action) {
			case 'btn-del' :
				this.removeRs.call(this, record.data.knowId);
				break;
			case 'btn-readdocument' :
				this.showRs.call(this, record);
				break;
			default :
				break;
		}
	}
});
/*
 * 
 * method: 用于树相应的节点打开相应的grid
 * 
 */
UkKnowMineView.getData = function(node) {
	var grid = Ext.getCmp('UkKnowMineViewGrid');
	var store = grid.getStore();
//	store.proxy.conn.url = __ctxPath + '/know/listMapUkSysKnow.do';
//	store.proxy = new Ext.data.HttpProxy({
//            url : __ctxPath + '/know/listMyKnowUkSysKnow.do'
//        });
	store.baseParams['dimenId'] = node.id;
	store.baseParams['mark'] = node.attributes.mark;
	var paramObj = {
		start : 0,
		limit : 25
	};

	if (node != null && node.id > 0) {
		paramObj["dimenId"] = node.id;
		paramObj["mark"] = node.attributes.mark;
	}
	store.reload({
				params : paramObj
			});
}
