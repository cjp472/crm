
UkSysKnowMap = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		UkSysKnowMap.superclass.constructor.call(this, {
					id : 'UkSysKnowMapWin',
					title : '知识地图',
					region : 'center',
					layout : 'border',
					items : [{
								title:'知识维度',
								region:'west',
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
//		this.treepanel = new Ext.tree.TreePanel({
//			title : '知识维度',
//			layout : 'fit',
//			region : 'west',
//			collapsible : true,
//			autoScroll : true,
//			split : true,
//			height : 800,
//			width : 180,
//			id : 'UkSysKnowMapSearchPanel',
//			tbar : new Ext.Toolbar({
//				items : [{
//							xtype : 'button',
//							iconCls : 'btn-refresh',
//							text : '刷新',
//							handler : function() {
//								var tree = Ext
//										.getCmp('UkSysKnowMapSearchPanel');
//								tree.body.mask(__maskLoading, 'x-mask-loading');
//								tree.root.reload();
//								tree.root.collapse(true, false);
//								tree.root.expand(false, false, function() {
//											tree.body.unmask();// 全部展开之后让蒙版消失
//										});
//							}
//						}, {
//							xtype : 'button',
//							text : '展开',
//							iconCls : 'btn-expand',
//							handler : function() {
//								var tree = Ext
//										.getCmp('UkSysKnowMapSearchPanel');
//								tree.expandAll();
//							}
//						}, {
//							xtype : 'button',
//							text : '收起',
//							iconCls : 'btn-collapse',
//							handler : function() {
//								var tree = Ext
//										.getCmp('UkSysKnowMapSearchPanel');
//								tree.collapseAll();
//							}
//						}]
//			}),
//			autoScroll : true,
//			animate : true,
//			// checkModel : 'multiple',
//			containerScroll : true,
//			lines : true,// 节点之间连接的横竖线
//			rootVisible : false,// 是否显示根节点
//			collapsible : true,
//			split : true,
//			// cascadeCheck : 'all',
//			border : false,
//			frame : false,
//			loader : new Ext.tree.TreeLoader({
//						url : __ctxPath + '/know/listTreeUkKnowDimensionality.do'
//					}),
//			root : new Ext.tree.AsyncTreeNode({
//						expanded : true
//					}),
//			listeners : {
//				'click' : UkSysKnowMap.getData
//			},
//			layoutConfig : {
//				padding : '5',
//				align : 'middle'
//			},
//			defaults : {
//				xtype : 'label',
//				border : false,
//				margins : {
//					top : 0,
//					right : 4,
//					bottom : 4,
//					left : 4
//				}
//			}
//		});// end of searchPanel
				this.treepanel1 = new Ext.tree.TreePanel({
//					autoScroll : true,
//					width : 180,
//					bodyStyle:'overflow-y:auto;overflow-x:hidden',
					autoHeight:true,
					animate : true,
					containerScroll : true,
					lines : true,// 节点之间连接的横竖线
					rootVisible : true,// 是否显示根节点
					split : true,
					border : false,
					frame : false,
					loader : new Ext.tree.TreeLoader({
								url : __ctxPath + '/know/listDepTreeUkKnowDimensionality.do'
							}),
					
					root : new Ext.tree.AsyncTreeNode({
								 id:"-1",
						         text:"机构知识",//节点名称
						         mark : 2,
						         expanded : false
							}),
					listeners : {
						'click' : UkSysKnowMap.getData
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
//					autoScroll : true,
					autoHeight:true,
					animate : true,
					containerScroll : true,
					lines : true,// 节点之间连接的横竖线
					rootVisible : true,// 是否显示根节点
					split : true,
					border : false,
					frame : false,
					loader : new Ext.tree.TreeLoader({
								url : __ctxPath + '/know/listJobTreeUkKnowDimensionality.do'
							}),
					root : new Ext.tree.AsyncTreeNode({
								 id:"-2",
						         text:"岗位知识",//节点名称
						         mark : 3,
						         expanded : false
							}),
					listeners : {
						'click' : UkSysKnowMap.getData
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
//					autoScroll : true,
					autoHeight:true,
					animate : true,
					containerScroll : true,
					lines : true,// 节点之间连接的横竖线
					rootVisible : true,// 是否显示根节点
					split : true,
					border : false,
					frame : false,
					loader : new Ext.tree.TreeLoader({
								url : __ctxPath + '/know/listDimenTreeUkKnowDimensionality.do'
							}),
					root : new Ext.tree.AsyncTreeNode({
								 id:"0",
						         text:"业务知识",//节点名称
						         mark : 1,
						         expanded : false
							}),
					listeners : {
						'click' : UkSysKnowMap.getData
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
					items : [{
								iconCls : 'btn-add',
								text : __create,
								xtype : 'button',
								scope : this,
								handler : this.createRs
							}, {
								iconCls : 'btn-del',
								text : __delete,
								xtype : 'button',
								scope : this,
								handler : this.removeSelRs
							}]
				});

		this.gridPanel = new HT.GridPanel({
			region : 'center',
			// tbar : this.topbar,
			// 使用RowActions
//			rowActions : true,
			printable : false,
			showSm:false,
			exportable : false,
			id : 'UkSysKnowMapGrid',
			url : __ctxPath + "/know/listMapUkSysKnow.do",
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
					'userid', 'ukKnowTypes', 'ukKnowKeywords','accessManage','knowKeyWords'],
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
						header : __ukSysKnowKnowApproveId,// '知识审批单内码',
						isExp : false,
						hidden : true,
						dataIndex : 'ukKnowApprove',
						renderer : function(val) {
							return val != null ? val.knowApproveIdName : '';
						}
					}, {
						header : __ukSysKnowTiTle,// '标题',
						isExp : false,
						width:500,
						dataIndex : 'tiTle'
					}, {
						header : __ukSysKnowSysKnowComment,// '摘要',
						isExp : false,
						hidden : true,
						dataIndex : 'sysKnowComment'
					},
					// {
					// header : "知识分类",
					// isExp : false,
					// dataIndex : 'ukKnowTypes',
					// renderer : function(value) {''
					// if (value == null) {
					// return '';
					// } else {
					// var str= "";
					// for(var i = 0; i < value.length; i++){
					// if(i>0)str+=",";
					// str += value[i].name;
					// }
					// return str;
					// }
					// }
					// },
					{
						header : "关键字",
						isExp : false,
						hidden : true,
						dataIndex : 'knowKeyWords'
//						,
//						renderer : function(value) {
//							if (value == null) {
//								return '';
//							} else {
//								var str = "";
//								for (var i = 0; i < value.length; i++) {
//									if (i > 0)
//										str += ",";
//									str += value[i].keyWord;
//								}
//								return str;
//							}
//						}
					}, {
						header : __ukSysKnowBusiType,// '业务分类&BUSI_TYPE',
						isExp : false,
						dataIndex : 'busiType',
						hidden : true,
						renderer : function(value) {
							return BUSI_TYPE.get(value);
						}
					}, {
						header : '发布时间',// '生效时间',__ukSysKnowEnableTime
						isExp : false,
						hidden : true,
						dataIndex : 'enableTime'
					}, {
						header : '结束时间',// '过期时间',
						isExp : false,
						dataIndex : 'pastTime'
					},
					// {
					// header : __ukSysKnowSysKnowStatus,// '状态&KNOW_STATUS',
					// isExp : false,
					// dataIndex : 'sysKnowStatus',
					// renderer : function(value) {
					// return KNOW_STATUS.get(value);
					// }
					// },
					{
						header : __ukSysKnowViewCount,// '浏览数',
						isExp : false,
						dataIndex : 'viewCount'
					}, {
						header : __ukSysKnowSysKnowVersion,// '版本号',
						isExp : false,
						hidden : true,
						dataIndex : 'sysKnowVersion'
					}
					// {
					// header : __ukSysKnowCreateBy,// '创建人内码',
					// isExp : false,
					// dataIndex : 'createBy',
					// renderer : function(value) {
					// if (value == null) {
					// return '';
					// } else {
					// return value.fullname;
					// }
					// }
					// },
//					new Ext.ux.grid.RowActions({
//								header : __action,
//								width : 50,
//								actions : [{
//											iconCls : 'btn-readdocument',
//											qtip : '查看',
//											style : 'margin:0 3px 0 3px'
//										}
//								// {
//								// iconCls : 'btn-edit',
//								// qtip : __edit,
//								// style : 'margin:0 3px 0 3px'
//								// }
//								],
//								listeners : {
//									scope : this,
//									'action' : this.onRowAction
//								}
//							})
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
		var record = grid.getStore().getAt(rowindex);// Get the Record
		if(record.get('accessManage')==1){
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
						knowId : record.get('knowId'),
						knowTmpId : record.get('knowTmpId'),
						knowTitle : record.get('tiTle')
					});
			tabs.add(aForm);
			tabs.activate(aForm);
		}else{
			Ext.Ajax.request({
				method : 'post',
				url : __ctxPath + '/know/hasReadKnowUkKnowDianping.do',
				params : {
					knowId : record.get('knowId'),
					busiType : record.get('busiType')
				},
				success : function(response, options) {
					var thisObj = Ext.util.JSON.decode(response.responseText);
					var hasRead = thisObj.hasRead;
					if (hasRead) {
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
									knowId : record.get('knowId'),
									knowTmpId : record.get('knowTmpId'),
									knowTitle : record.get('tiTle')
								});
						tabs.add(aForm);
						tabs.activate(aForm);
					} else {
						Ext.ux.Toast.msg("操作信息","对不起，您没有权限查看该知识!");
					}
				},
				failure : function(request) {
					Ext.ux.Toast.msg('操作信息', '操作出错，请联系管理员!');
				}
			});
		}
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
		var treePanel = Ext.getCmp('UkSysKnowMapSearchPanel');
		var knowTypeIds = treePanel.getSelectValue().toString();
		var grid = Ext.getCmp('UkSysKnowMapGrid');
		grid.setTitle('知识列表');
		var store = grid.getStore();
		store.url = __ctxPath + '/know/listMapUkSysKnow.do';
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
UkSysKnowMap.getData = function(node) {
	var grid = Ext.getCmp('UkSysKnowMapGrid');
	var store = grid.getStore();
	// store.url = __ctxPath + '/know/listMapUkSysKnow.do';
	store.baseParams['mark'] = node.attributes.mark;
	var paramObj = {
		start : 0,
		limit : 25
	};

	if (node != null && node.id > 0) {
		paramObj["dimenId"] = node.id;
//		paramObj["isOnNode"] = 1;
		paramObj["mark"] = node.attributes.mark;
	}
	store.reload({
				params : paramObj
			});
}
