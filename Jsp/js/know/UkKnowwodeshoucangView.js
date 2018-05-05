
UkKnowwodeshoucangView = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();

		// 调用父类构造
		UkKnowwodeshoucangView.superclass.constructor.call(this, {
					id : 'UkKnowwodeshoucangViewWin',
					title : '我的收藏',//'[UkSysKnow]管理',
					region : 'center',
					layout : 'border',
					items : [this.leftPanel,this.contentPanel]//[, this.gridPanel]
				});
	},// end of constructor
	// 初始化组件
	initUIComponents : function() {
		this.searchPanel = new Ext.FormPanel({
					layout : 'hbox',
					region : 'north',
					hidden : false,
					id : 'UkKnowChouCangManageSearchPanel',
					height : 35,
					items : [
					{
										text : '标题:',
										style:'margin-top:-3px'
									}, {
										name : 'Q_tiTle_S_LK',
										xtype : 'textfield',
										width : 100
									}, {
										text : '关键字:',
										style:'margin-top:-3px'
									}, {
										xtype:'textfield',
										name : 'ukKnowKeyWord',
										width : 120
										// items : [typeSelector]
								}
//						{
//						text : __ukKnowDingyueKnowTypeId
//					}, {
//						hiddenName : 'Q_ukKnowType.knowTypeId_L_EQ',
//						xtype : 'combo',
//						editabel : false,
//						lazyInit : false,
//						triggerAction : 'all',
//						store : new Ext.data.SimpleStore({
//									autoLoad : true,
//									url : __ctxPath
//											+ '/know/comboUkKnowType.do',
//									fields : ['knowTypeId', 'knowTypeIdName']
//								}),
//						displayField : 'knowTypeIdName',
//						valueField : 'knowTypeId',
//						id : 'knowTypeId'
//					}, {
//						text : __ukKnowDingyueBusiType
//					}, {
//						hiddenName : 'Q_busiType_L_EQ',
//						xtype : 'mtdiccombo',
//						editable : true,
//						lazyInit : false,
//						forceSelection : false,
//						itemKey : 'BUSI_TYPE'
//					}, {
//						text : __ukKnowDingyueDesCribe
//					}, {
//						name : 'Q_desCribe_S_LK',
//						xtype : 'textfield'
////					}, {
////
////						name : 'Q_userid_L_EQ',
////						xtype : 'numberfield'
//					}
					, {
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
						handler : function(){
							new UkKnowDingyueAdvancedSearchWin().show()
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

//		this.treePanel = new Ext.tree.TreePanel({
//					region : 'west',
//					id : 'ukKnowwodeshoucangTreePanel',
//					title : '知识收藏分类',// __ukKnowTypeListHeading,
//					collapsible : true,
//					autoScroll : true,
//					split : true,
//					height : 800,
//					width : 180,
//					tbar : new Ext.Toolbar({
//								items : [{
//									xtype : 'button',
//									iconCls : 'btn-refresh',
//									text : '刷新',
//									handler : function() {
//										treePanel = Ext.getCmp('ukKnowwodeshoucangTreePanel');
//										treePanel.root.reload();
//									}
//								}, '-', {
//									xtype : 'button',
//									text : '展开',
//									iconCls : 'btn-expand',
//									handler : function() {
//                                        treePanel = Ext.getCmp('ukKnowwodeshoucangTreePanel');
//										treePanel.expandAll();
//									}
//								}, '-', {
//									xtype : 'button',
//									text : '收起',
//									iconCls : 'btn-collapse',
//									handler : function() {
//                                        treePanel = Ext.getCmp('ukKnowwodeshoucangTreePanel');
//										treePanel.collapseAll();
//									}
//								}]
//							}),
//					loader : new Ext.tree.TreeLoader({
////								url : __ctxPath + '/know/listUkKnowType.do'
//							}),
//					root : new Ext.tree.AsyncTreeNode({
//								 id:"root",   
//						         text:"知识收藏分类树",//节点名称   
//						         expanded:false,//展开   
//						         leaf:false,//是否为叶子节点   
//						         children:[{   
//						             id:'iui',   
//						             text:'子节点一',   
//						             leaf:true  
//						         },{   
//						             id:'child2',   
//						             text:'子节点二',
//						              leaf:true  
//						         }]   
//							}),
//					rootVisible : true,
//					listeners : {
//						'click' : UkKnowwodeshoucangView.clickNode
//					}
//				});
				
		this.leftPanel = new Ext.Panel({
			region : 'west',
			layout : 'anchor',
			collapsible : true,
			split : true,
			width : 200,
			items : [{
				xtype : 'treePanelEditor',
				id : 'UkKnowShoucangTypeTree',
				split : true,
				rootVisible : false,
				border : false,
				height : 380,
				autoScroll : true,
				scope : this,
				url : __ctxPath + '/know/treeLoadUkKnowCollectType.do',
				onclick : UkKnowwodeshoucangView.clickNode,
				contextMenuItems : [{
					text : '新建分类',
					scope : this,
					iconCls : 'btn-add',
					handler : function() {
						var globalTypeTree = Ext.getCmp('UkKnowShoucangTypeTree');
						var parentId = globalTypeTree.selectedNode.id;
						var typeForm = new UkKnowCollectTypeForm({
									parentId : parentId,
									callback : function() {
										Ext.getCmp('UkKnowShoucangTypeTree').root.reload();
									}
								});
						typeForm.show();

					}
				}, {
					text : '修改分类',
					scope : this,
					iconCls : 'btn-edit',
					handler : function() {
						var typeTree = Ext.getCmp('UkKnowShoucangTypeTree');
						var typeId = typeTree.selectedNode.id;
						if(typeId!=0){
							var typeForm = new UkKnowCollectTypeForm({
										knowCollectTypeId : typeId,
										callback : function() {
											Ext.getCmp('UkKnowShoucangTypeTree').root.reload();
										}
									});
							typeForm.show();
						}else{
							Ext.ux.Toast.msg('操作信息', '根节点分类不允许修改，请修改其它分类!');
						}
					}
				}, {

					text : '删除分类',
					scope : this,
					iconCls : 'btn-del',
					handler : function() {
						var typeTree = Ext.getCmp('UkKnowShoucangTypeTree');
						var typeId = typeTree.selectedNode.id;
						if(typeId!=0){
							var ids = Array();
							ids.push(typeId);
							Ext.Msg.confirm('信息确认', '您确认要删除所选记录吗？', function(btn) {
								if (btn == 'yes') {
									Ext.Ajax.request({
										url : __ctxPath
												+ '/know/multiDelUkKnowCollectType.do',
										params : {
											ids : ids
										},
										method : 'POST',
										success : function(response, options) {
											Ext.ux.Toast.msg('操作信息', '删除成功!');
											Ext.getCmp('UkKnowShoucangTypeTree').root.reload();
											Ext.getCmp('UkKnowShouCangManageGrid').getStore().reload();
										},
										failure : function(response, options) {
											Ext.ux.Toast.msg('操作信息', '操作出错，请联系管理员！');
										}
									});
								}
							});
						}else{
							Ext.ux.Toast.msg('操作信息', '根节点分类不允许被删除，请删除其它分类!');
						}
					}
				}]
			}]
		});

		
		var rowAction = new Ext.ux.grid.RowActions({
				header : __action,
				width : 100,
				actions : [{
//							iconCls : 'btn-del',
//							qtip : __delete,
//							style : 'margin:0 3px 0 3px'
//						}, {
							iconCls : 'btn-readdocument',
							qtip : __edit,
							style : 'margin:0 3px 0 3px'
						}],
				listeners : {
					scope : this,
					'action' : this.onRowAction
				}
			});
		
		this.gridPanel = UkPerKnowGridPanel.getView("UkKnowShouCangManageGrid","/know/listKnowUkKnowCollectType.do","收藏时间",null,rowAction);
	  	this.contentPanel = new Ext.Panel({
					region : 'center',
					layout : 'border',
					items : [this.searchPanel, this.gridPanel]
				});
		this.gridPanel.addListener('rowdblclick', this.rowClick);
	},
	//GridPanel行点击处理事件
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
						knowTmpId : record.get('knowTmpId'),
						knowTitle : record.get('tiTle')
					});
			tabs.add(aForm);
			tabs.activate(aForm);
		},

	// 编辑Rs
	showRs : function(record) {
		var tabs = Ext.getCmp('centerTabPanel');
		var aForm = Ext.getCmp('UkSysKnowShow');
		if(aForm != null){
			tabs.remove('UkSysKnowShow');
		}
		var collForm = Ext.getCmp('UkKnowCollectFormWin');
				if (collForm != null) {
					tabs.remove(collForm);
				}
		aForm = new UkSysKnowShow({
				knowId : record.data.ukSysKnow.knowId,
				knowTmpId : record.data.ukSysKnow.ukKnowTemplate.knowTmpId,
				knowTitle : record.data.ukSysKnow.tiTle
				});
		tabs.add(aForm);
		tabs.activate(aForm);
	},
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
UkKnowwodeshoucangView.clickNode = function(node) {
	UkKnowwodeshoucangView.select(node);
};

/**
 * 条件查询
 * 
 * @param node
 */
UkKnowwodeshoucangView.select = function(node) {
	var searchPanel = Ext.getCmp('UkKnowChouCangManageSearchPanel');
	searchPanel.getForm().reset();
	
	var grid = Ext.getCmp('UkKnowShouCangManageGrid');
	var store = grid.getStore();
//	store.proxy.conn.url = __ctxPath + '/know/listKnowUkKnowCollectType.do';
	store.baseParams['collectTypeId'] = node.id;
	var paramObj = {
		start : 0,
		limit : 25
	};
	if (node != null && node.id > 0) {
		paramObj["collectTypeId"] = node.id;

	}
	store.reload({
				params : paramObj
			});
};
