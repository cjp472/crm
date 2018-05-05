UkGuiDangView = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		UkGuiDangView.superclass.constructor.call(this, {
			id : 'UkGuiDangViewWin',
			title : '归档知识',
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
			},{
				text : '知识维度:',
				style:'margin-top:-3px'
			}, {
//				name : 'Q_ukDimensionalityKnows.dimName_S_LK',
//				xtype : 'textfield'
				hiddenName : 'Q_busiType_L_EQ',
				xtype : 'mtdiccombo',
				editable : false,
				lazyInit : false,
				forceSelection : false,
				itemKey : 'KNOW_CATE',
				width : 120
			},{
				text : "关键字:",
				style:'margin-top:-3px'
			}, {
				name : 'Q_ukKnowKeywords.keyWord_S_LK',
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
						'click' : UkGuiDangView.getData
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
						'click' : UkGuiDangView.getData
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
					id : 'UkKnowDimensionalityTreePanel_3',
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
						'click' : UkGuiDangView.getData
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
			rowActions : true,
			printable : false,
			exportable : false,
			tbar:['->',{
				text:'回收',
				iconCls:'btn-mail_move',
				handler : function(){
					var grid = Ext.getCmp('UkGuiDangViewGrid');
					var rows = grid.getSelectionModel().getSelections();
					var mygridpanel = 'UkGuiDangViewGrid';
					if (rows != null && rows.length > 0) {
						var flag = true;
						var knowIds = '';
						for (i = 0; i < rows.length; i++) {
							if (rows[i].data.sysKnowStatus != 5) {
								flag = false;
							}
							if (i > 0) {
								knowIds += ',';
							}
							knowIds += rows[i].data.knowId
	
						}
						if (flag) {
							new RubbishForm({
								knowIds : knowIds,
								mygridpanel : mygridpanel
							}).show();
						} else {
							Ext.ux.Toast.msg(__toastMessage, "只能将已发布的知识放入垃圾箱!");
							return;
						}
					} else {
						Ext.ux.Toast.msg(__toastMessage, "请至少选择一条记录!");
						return;
					}
				}
			},{
				text:'恢复',
				iconCls:'btn-mail_back',
				handler : function() {
					var grid = Ext.getCmp("UkGuiDangViewGrid");
					var ids = Array();
					var selectRecords = grid.getSelectionModel().getSelections();
					if (selectRecords.length == 0) {
						Ext.ux.Toast.msg("信息", "请选择要恢复的记录！");
						return;
					}
					else{
						for (var i = 0; i < selectRecords.length; i++) {
							ids.push(selectRecords[i].data.knowId);
						}
						UkGuiDangView.recovery(ids);
					}
				}
			}],
			id : 'UkGuiDangViewGrid',
			url : __ctxPath + "/know/listGuiDangUkSysKnow.do",
//			url : __ctxPath + "/know/queryKnowListUkSysKnow.do",
//			baseParams :{
//					status : 5
//				},
			fields : [{
						name : 'knowId',
						type : 'int'
					}, 'ukKnowTemplate', 'ukKnowApprove', 'tiTle', 'busiType',
					'enableTime', 'pastTime', 'sysKnowStatus', 'viewCount',
					'sysKnowComment', 'plus1', 'plus2', 'plus3', 'plus4',
					'plus5', 'plus6', 'plus7', 'plus8', 'sysKnowVersion',
					'createBy', 'updateBy', 'createDate', 'updateDate','filingTime',
					'userid', 'ukKnowTypes', 'ukKnowKeywords','accessManage'],
			columns : [{
						header : __ukSysKnowKnowId,// 'knowId',
						dataIndex : 'knowId',
						hidden : true
					}, {
						header : '标题',
						width:350,
						isExp : false,
						dataIndex : 'tiTle'
					}, {
						header : '类型',
						isExp : false,
						dataIndex : 'busiType',
						renderer : function(value) {
							if (value != null){
								return KNOW_CATE.get(value);
							}else {
								return '';	
							}
						}
					}, {
						header : '开始时间',// '生效时间',__ukSysKnowEnableTime
						isExp : false,
						dataIndex : 'enableTime'
					}, {
						header : '结束时间',// '过期时间',
						isExp : false,
						dataIndex : 'pastTime'
					}, {
						header : '归档时间',// '过期时间',
						isExp : false,
						dataIndex : 'filingTime'
					},{
//					 header : __ukSysKnowSysKnowStatus,// '状态&KNOW_STATUS',
//					 isExp : false,
//					 dataIndex : 'sysKnowStatus',
//					 renderer : function(value) {
//							return KNOW_FLOW.get(value);
//						}
//					},{
						header : __ukSysKnowViewCount,// '浏览数',
						isExp : false,
						dataIndex : 'viewCount'
					}, {
						header : '评价',// '版本号',
						isExp : false,
						dataIndex : 'viewCount'
					},
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
					new Ext.ux.grid.RowActions({
						header : __action,
						width : 50,
						actions : [{
									iconCls : 'btn-readdocument',
									qtip : '查看',
									style : 'margin:0 3px 0 3px'
								}
						// {
						// iconCls : 'btn-edit',
						// qtip : __edit,
						// style : 'margin:0 3px 0 3px'
						// }
						],
						listeners : {
							scope : this,
							'action' : this.onRowAction
						}
					})]
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
		grid.getSelectionModel().each(function(record) {
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
				});
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
		var treePanel = Ext.getCmp('UkGuiDangViewSearchPanel');
		var knowTypeIds = treePanel.getSelectValue().toString();
		var grid = Ext.getCmp('UkGuiDangViewGrid');
		grid.setTitle('知识列表');
		var store = grid.getStore();
		store.url = __ctxPath + '/know/listGuiDangUkSysKnow.do';
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
//UkGuiDangView.getData = function(node) {
//	var grid = Ext.getCmp('UkGuiDangViewGrid');
//	var store = grid.getStore();
//	// store.url = __ctxPath + '/know/listMapUkSysKnow.do';
//	var paramObj = {
//		start : 0,
//		limit : 25
//	};
//
//	if (node != null && node.id > 0) {
//		paramObj["typeId"] = node.id;
//		paramObj["isOnNode"] = 1;
//
//	}
//	store.reload({
//				params : paramObj
//			});
//}
//知识恢复
UkGuiDangView.recovery = function(_ids) {
	Ext.Msg.confirm('回收操作', '你确定要恢复该知识吗?', function(btn) {
		if (btn == 'yes') {
			Ext.Ajax.request({
				url : __ctxPath + '/know/recoveryUkSysKnow.do',
				method : 'post',
				params : {
					ids : _ids
				},
				success : function(response) {
					Ext.ux.Toast.msg("操作信息", '知识恢复成功');
					Ext.getCmp('UkGuiDangViewGrid').getStore().reload();
				},
				failure : function() {
					Ext.ux.Toast.msg("操作信息", "知识恢复失败");
				}
			});
		}
	});
};

UkGuiDangView.getData = function(node) {
	var grid = Ext.getCmp('UkGuiDangViewGrid');
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