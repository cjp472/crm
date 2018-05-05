
/**
 * 知识分类选择器
 */
var knowledgeSelector = {
	getView : function(callback, isSingle) {
		var panel = this.initPanel(isSingle);
		var window = new Ext.Window({
			title : '知识选择',
			iconCls : 'menu-appuser',
			width : 800,
			height : 400,
			border : false,
			id : 'knowledgeSelectorWindow',
			layout : 'fit',
			items : [panel],
			modal : true,
			buttonAlign : 'center',
			buttons : [{
						text : '确认',
						iconCls : 'btn-ok',
						scope : 'true',
						id : 'knowledgeSelector_btn_ok',
						handler : function() {
							
//							var grid = Ext.getCmp('contactGrid');
//							var rows = grid.getSelectionModel().getSelections();
//							var userIds = '';
//							var fullnames = '';
//							for (var i = 0; i < rows.length; i++) {
//								if (i > 0) {
//									userIds += ',';
//									fullnames += ',';
//								}
//								userIds += rows[i].data.userId;
//								fullnames += rows[i].data.fullname;
//							}
//
//							if (callback != null) {
//								callback.call(this, userIds, fullnames);
//							}
//							window.close();
//							
						}
					}, {
						text : '关闭',
						iconCls : 'btn-cancel',
						handler : function() {
							window.close();
						}
					}]
		});
		return window;
	},

	initPanel : function(isSingle) {
		this.actions = function() {

			var store = Ext.getCmp('knowledgeSelectorSelectTree').getStore();
			var recordType = store.recordType;

			var s = Ext.getCmp('knowledgeSelectorTree').getSelectionModel()
					.getSelections();// 获得选中数据
            //r=undefined，当i超出s的数组，s[i]=undefined
			for (var i = 0, r; r = s[i]; i++) {//亲，敢写的再奇葩点不
				// alert(s[i].get('tiTle'));
				store.each(function(record) {
							if (s[i].get('tiTle') == record.get('tiTle')) {
								store.remove(record);
							}
						});
				store.add(new recordType({
							tiTle : s[i].get('tiTle'),
							knowId : s[i].get('knowId')
						})); // 添加一行空store

			}
			// Ext.getCmp('knowledgeSelectorSelectTree').add();

		};
		this.searchPanel = new Ext.FormPanel({
					layout : 'hbox',
					region : 'north',
					id : 'UkKnowSysMapPanel',
					height : 35,
					items : [{
						text : '知识标题'
					}, {
						name : 'title',
						id : 'knowledgeSelector.title',
						xtype : 'textfield'
					}, {
						xtype : 'button',
						text : '查询',
						iconCls : 'search',
						scope : this,
							 handler : function(){
								var node = Ext.getCmp('UkSysKnowMapSearchPanel').getSelectionModel().getSelectedNode();
								if(node!= null){
									Ext.getCmp('knowledgeSelector.typeId').setValue(node.id);
								}
								$search({
									searchPanel : this.searchPanel,
									gridPanel : this.gridPanel
								});
							 }
					}, {
						xtype : 'button',
						text : '清空',
						scope : this,
						iconCls : 'btn-reset',
						handler : function() {
								var searchPanel = Ext.getCmp('UkKnowSysMapPanel');
								searchPanel.getForm().reset();
						}
					},{
						name : 'typeId',
						id : 'knowledgeSelector.typeId',
						xtype : 'hidden'
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
		// 初始化搜索条件Panel
		this.treepanel = new Ext.tree.TreePanel({
			title : '知识分类',
			layout : 'fit',
			region : 'west',
			collapsible : true,
			autoScroll : true,
			split : true,
			height : 800,
			width : 180,
			id : 'UkSysKnowMapSearchPanel',
			tbar : new Ext.Toolbar({
				items : [{
							xtype : 'button',
							iconCls : 'btn-refresh',
							text : '刷新',
							handler : function() {
								var tree = Ext
										.getCmp('UkSysKnowMapSearchPanel');
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
										.getCmp('UkSysKnowMapSearchPanel');
								tree.expandAll();
							}
						}, {
							xtype : 'button',
							text : '收起',
							iconCls : 'btn-collapse',
							handler : function() {
								var tree = Ext
										.getCmp('UkSysKnowMapSearchPanel');
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
//			bbar : [{
//						xtype : 'button',
//						iconCls : 'btn-refresh',
//						text : '刷新',
//						scope : this,
//						handler : function() {
//							// this.root.reload();
//						}
//					}, {
//						xtype : 'button',
//						text : '展开',
//						iconCls : 'btn-expand',
//						scope : this,
//						handler : function() {
//							// this.expandAll();
//						}
//					}, {
//						xtype : 'button',
//						text : '收起',
//						iconCls : 'btn-collapse',
//						scope : this,
//						handler : function() {
//							// this.collapseAll();
//						}
//					}],
			border : false,
			frame : false,
			loader : new Ext.tree.TreeLoader({
						url : __ctxPath + '/know/listForRoleUkKnowType.do'
					}),
			root : new Ext.tree.AsyncTreeNode({
						expanded : true
					}),
			listeners : {
				 'click' : function(node){
//				 		var node = Ext.getCmp('UkSysKnowMapSearchPanel').getSelectionModel().getSelectedNode();
						Ext.getCmp('knowledgeSelector.typeId').setValue(node.id);
						var grid = Ext.getCmp('knowledgeSelectorTree');
						var store = grid.getStore();
						var title = Ext.getCmp('knowledgeSelector.title').getValue()
						var paramObj = {
							start : 0,
							limit : 25
						};
						if(node.id==-1){
							Ext.ux.Toast.msg(__actioninfo, '没有可用的知识分类,请向知识分类管理员申请授权!');
						}else{
							if (node != null && node.id > 0) {
								paramObj["typeId"] = node.id;
							}
							paramObj["status"] = '5';
							paramObj["checkTypeRole"] = 'false';
							paramObj["title"] = title;	
							store.reload({
								params : paramObj
							});
						}
				 }
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
		});// end of searchPanel

		this.gridPanel = new HT.GridPanel({
					region : 'center',
					printable : false,
					exportable : false,
					border : false,
					layout : 'fit',
					id : 'knowledgeSelectorTree',
					url : __ctxPath + "/know/queryKnowListUkSysKnow.do",
					baseParams : {
						status : '5',
						isPermission : 'false',
						checkTypeRole : 'false'
					},
					fields : [{
								name : 'knowId',
								type : 'int'
							}, 'ukKnowTemplate', 'ukKnowApprove', 'tiTle',
							'busiType', 'enableTime', 'pastTime',
							'sysKnowStatus', 'viewCount', 'sysKnowComment',
							'plus1', 'plus2', 'plus3', 'plus4', 'plus5',
							'plus6', 'plus7', 'plus8', 'sysKnowVersion',
							'createBy', 'updateBy', 'createDate', 'updateDate',
							'userid', 'ukKnowTypes', 'ukKnowKeywords','knowKeyWords'],
					columns : [{
								header : '标题',
								isExp : false,
								dataIndex : 'tiTle'
							}, {
								header : '摘要',// '摘要',
								isExp : false,
								dataIndex : 'sysKnowComment'
							}, {
								header : "关键字",
								isExp : false,
								dataIndex : 'knowKeyWords'
//								,
//								renderer : function(value) {
//									if (value == null) {
//										return '';
//									} else {
//										var str = "";
//										for (var i = 0; i < value.length; i++) {
//											if (i > 0)
//												str += ",";
//											str += value[i].keyWord;
//										}
//										return str;
//									}
//								}
							}, {
								header : '业务分类',// '业务分类&BUSI_TYPE',
								isExp : false,
								dataIndex : 'busiType',
								renderer : function(value) {
									return BUSI_TYPE.get(value);
								}
							}, {
								header : '过期时间',// '过期时间',
								isExp : false,
								dataIndex : 'pastTime'
							}]
				});
		this.gridPanel.addListener('rowdblclick', this.actions );
		this.contentPanel = new Ext.Panel({
					region : 'center',
					layout : 'border',
					border : false,
					items : [this.searchPanel, this.gridPanel]
				});
		var selectPanel = new Ext.Panel({
					frame : false,
					border : true,
					columnWidth : .2,
					hideBorders : true,
					height : 400,
					bodyStyle : 'border-right:0px solid;border-top:0px solid;',
					width : 30,
					layout : {
						type : 'vbox',
						pack : 'center',
						align : 'stretch'
					},
					defaults : {
						anchor : '100%,100%'
					},
					defaults : {
						margins : '0 3 0 0'
					},
					items : [{
						xtype : 'button',
						iconCls : 'btn-right',
						handler : this.actions
					}, {
						xtype : 'button',
						iconCls : 'btn-left',
						handler : function() {
                            // TODO 删除已选知识
                            // 获得选中数据
//                            alert(1);
                            var sele = Ext.getCmp('knowledgeSelectorSelectTree').getSelectionModel()
                                .getSelections();
                            var store = Ext.getCmp('knowledgeSelectorSelectTree').getStore();
//                            var recordType = store.recordType;
//                            alert(sele.length);
                            for (var i = 0; i < sele.length; i++) {
                                store.remove(sele[i]);
                            }
						}
					}]
				});
	
		this.spanel = new Ext.Panel({
			width : 150,
			region : 'east',
			border : false,
			layout : 'column',
			items : [selectPanel, new Ext.grid.GridPanel({
						border : true,
						title : '已选知识',
						height : 400,
						bodyStyle : 'border-right:0px solid;border-top:0px solid;',
						columnWidth : .8,
						id : 'knowledgeSelectorSelectTree',
						ds : new Ext.data.Store({// 表格数据的store 可以用于数据的交互
							reader : new Ext.data.ArrayReader({}, [{
												name : 'knowId',
												type : 'int'
											}, 'tiTle']),
							data : []
								// 加载的数据
						}),
						columns : [{
									header : '标题',
									isExp : false,
									dataIndex : 'tiTle'
								}]
					})]
		});
		
		var panel = new Ext.Panel({
					id : 'UkSysKnowMapWin',
					region : 'center',
					layout : 'border',
					items : [this.treepanel, this.spanel, this.contentPanel]
				});
		return panel;
	}
};
