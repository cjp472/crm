
UkKnowDimensionalityView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				UkKnowDimensionalityView.superclass.constructor.call(this, {
							id : 'UkKnowDimensionalityViewWin',
							title : '知识维度',
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel,
									{
								title:'知识维度',
								region:'west',
		//						collapsible : true,
								autoScroll : true,
								split : true,
								width : 200,
								split:true,
									items:[this.treepanel1,this.treepanel2,this.treepanel3]
							}]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
//				this.treePanel = new Ext.tree.TreePanel({
//							// TODO treePanel[机构信息列表]
//							region : 'west',
//							title : '知识维度列表',// __ukKnowTypeListHeading,
//							id : 'UkKnowDimensionalityTreePanel',
//							collapsible : true,
//							autoScroll : true,
//							split : true,
//							height : 800,
//							width : 180,
//							tbar : new Ext.Toolbar({
//										items : [{
//													xtype : 'button',
//													iconCls : 'btn-refresh',
//													text : '刷新',
//													handler : function() {
//														var treePanel = Ext.getCmp('UkKnowDimensionalityTreePanel');
//														treePanel.root.reload();
//													}
//												}, '-', {
//													xtype : 'button',
//													text : '展开',
//													iconCls : 'btn-expand',
//													handler : function() {
//														var treePanel = Ext.getCmp('UkKnowDimensionalityTreePanel');
//														treePanel.expandAll();
//													}
//												}, '-', {
//													xtype : 'button',
//													text : '收起',
//													iconCls : 'btn-collapse',
//													handler : function() {
//														var treePanel = Ext.getCmp('UkKnowDimensionalityTreePanel');
//														treePanel.collapseAll();
//													}
//												}]
//									}),
//							loader : new Ext.tree.TreeLoader({
//										url : __ctxPath
//												+ '/know/listTreeUkKnowDimensionality.do'
//									}),
//							root : new Ext.tree.AsyncTreeNode({
//										expanded : true
//									}),
//							rootVisible : false
//						}); // end of this treePanel
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
						         expanded : false
							}),
	//				listeners : {
	//					'click' : UkGuiDangView.getData
	//				},
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
						         expanded : false
							}),
//					listeners : {
//						'click' : UkGuiDangView.getData
//					},
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
						         expanded : false
							}),
					listeners : {
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

				var UkKnowDimensionalityAdvancedSearchWin = Ext.extend(
						MT.AdvancedSearchWin, {
							title : '[UkKnowDimensionality]高级查询',
							fieldData : []
						});
				// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'UkKnowDimensionalitySearchPanel',
							height : 35,
							items : [{
										style : 'text-align:right',
										text : '名称'
									}, {
										name : 'Q_classifyName_S_LK',
										xtype : 'textfield'
									},{
										style : 'text-align:right',
										text : '状态'
									}, {
										hiddenName : 'Q_isDelete_L_EQ',
										xtype : 'mtdiccombo',
										editable : true,
										lazyInit : false,
										forceSelection : false,
										itemKey : 'UG001'
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
											new UkKnowDimensionalityAdvancedSearchWin()
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
								items : ['->',{
											xtype : 'button',
											iconCls : 'btn-add',
											text : '增加',
											handler :this.createRs
										}, '-', {
											xtype : 'button',
											text : '启用',
											iconCls : 'btn-setting',
											handler : this.enabledSelRs
										}, {
											xtype : 'button',
											text : '维度树',
											hidden:true,
											iconCls : 'btn-collapse',
											handler : function() {
												treePanel.collapseAll();
											}
										}, '-', {
											xtype : 'button',
											text : '注销',
											iconCls : 'btn-del',
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
					id : 'UkKnowDimensionalityGrid',
					url : __ctxPath + "/know/listUkKnowDimensionality.do",
					fields : [{
								name : 'dimensionalityId',
								type : 'int'
							}, 'classifyName', 'parentId', 'describe',
							'bussinessType', 'visitManage', 'visitRole',
							'isDelete', 'createDate', 'updateDate', 'createBy',
							'updateBy', 'category', 'parentName'],
					columns : [{
								header : 'dimensionalityId',
								dataIndex : 'dimensionalityId',
								hidden : true
							}, {
								header : '名称',
								isExp : false,
								dataIndex : 'classifyName'
							}, {
								header : '上级分类',
								isExp : false,
								dataIndex : 'parentName'
							}, {
								header : '业务类型',
								isExp : false,
								dataIndex : 'bussinessType',
								renderer : function(value) {
									return value ? KNOW_YWFL.get(value) : '';
								}
							}, {
								header : '描述',
								isExp : false,
								dataIndex : 'describe'
							}, {
								header : '访问管理',
								hidden : true,
								isExp : false,
								dataIndex : 'visitManage',
								renderer : function(value) {
									return value!=null ? KNOW_FWGL.get(value) : '';
								}
							}, {
								header : '访问授权',
								hidden : true,
								isExp : false,
								dataIndex : 'visitRole'
//							}, {
//								header : '删除标示',
//								isExp : false,
//								hidden : true,
//								dataIndex : 'isDelete',
//								renderer : function(value) {
//									return value == '0' ? __no : __yes;
//								}
							}, {
								header : '创建时间',
								isExp : false,
								hidden : true,
								dataIndex : 'createDate'
							}, {
								header : '修改时间',
								isExp : false,
								hidden : true,
								dataIndex : 'updateDate'
							}, {
								header : '创建人',
								isExp : false,
								hidden : true,
								dataIndex : 'createBy',
								renderer : function(value) {
									return value!=null ? value.fullname : '';
								}
							}, {
								header : '修改人',
								isExp : false,
								hidden : true,
								dataIndex : 'updateBy',
								renderer : function(value) {
									return value!=null ? value.fullname : '';
								}
							}, {
								header : '状态',
								isExp : false,
								dataIndex : 'isDelete',
								renderer : function(value) {
									return value!=null ? UG001.get(value) : '';
								}
							}, new Ext.ux.grid.RowActions({
										header : __action,
										width : 50,
										actions : [{
													iconCls : 'btn-setting',
													qtip : '启用',
													style : 'margin:0 3px 0 3px'
												}, {
													iconCls : 'btn-edit',
													qtip : '编辑',
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
				// var searchPanel =
				// Ext.getCmp('UkKnowDimensionalitySearchPanel');
				// var gridPanel = Ext.getCmp('UkKnowDimensionalityGrid');
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
							new UkKnowDimensionalityForm({
										dimensionalityId : rec.data.dimensionalityId
									}).show();
						});
			},
			// 创建记录
			createRs : function() {
				// new UkKnowDimensionalityForm().show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('UkKnowDimensionalityFormPanel');
				if (aForm != null) {
					tabs.remove('UkKnowDimensionalityFormPanel');
				}
				aForm = new UkKnowDimensionalityForm().show();

			},
			// 按ID删除记录
			removeRs : function(id) {
				var gridPanel = Ext.getCmp('UkKnowDimensionalityGrid');
				$postSubmit({
							url : __ctxPath
									+ '/know/multiDelUkKnowDimensionality.do',
							ids : id,
							grid : gridPanel,
							msgTip : '您确认要删除所选记录吗？',
							msgSuccess : '成功删除该记录！',
							msgFailure : '操作出错，请联系管理员！'
						});
			},
			// 把选中ID删除
			removeSelRs : function() {
				var gridPanel = Ext.getCmp('UkKnowDimensionalityGrid');
				var rows = gridPanel.getSelectionModel().getSelections();
				if (rows != null && rows.length > 0) {
					var ids = new Array();
					for (var i = 0; i < rows.length; i++)
						ids.push(rows[i].data.dimensionalityId);
					Ext.Msg.confirm('信息确认', '您确认要注销所选记录吗？', function(btn) {
						if (btn == 'yes') {
							Ext.Ajax.request({
										url : __ctxPath + '/know/multiDelUkKnowDimensionality.do',
										params : {
											ids : ids
										},
										method : 'POST',
										success : function(response, options) {
											Ext.ux.Toast.msg('操作信息', '注销成功！');
											gridPanel.getStore().reload();
											Ext.getCmp('UkKnowDimensionalityTreePanel_3').root.reload();
										},
										failure : function(response, options) {
											Ext.ux.Toast.msg('操作信息', '操作出错，请联系管理员！');
										}
									});
						}
					});
				} else {
					Ext.ux.Toast.msg('操作提示', __noData);
				}
//				$gridRs({
//							url : __ctxPath
//									+ '/know/multiDelUkKnowDimensionality.do',
//							grid : gridPanel,
//							idName : 'dimensionalityId',
//							msgNull : '请选择要注销的记录！',
//							msgTip : '您确认要注销所选记录吗？',
//							msgSuccess : '成功注销所选记录！',
//							msgFailure : '操作出错，请联系管理员！'
//						});
			},
			// 按ID启用记录
			enabledRs : function(id) {
				var gridPanel = Ext.getCmp('UkKnowDimensionalityGrid');
				Ext.Msg.confirm('信息确认', '您确认要启用所选记录吗？', function(btn) {
					if (btn == 'yes') {
						Ext.Ajax.request({
									url : __ctxPath + '/know/multiEnabledUkKnowDimensionality.do',
									params : {
										ids : id
									},
									method : 'POST',
									success : function(response, options) {
										Ext.ux.Toast.msg('操作信息', '启用成功！');
										gridPanel.getStore().reload();
										Ext.getCmp('UkKnowDimensionalityTreePanel_3').root.reload();
									},
									failure : function(response, options) {
										Ext.ux.Toast.msg('操作信息', '操作出错，请联系管理员！');
									}
								});
					}
				});
//				$postSubmit({
//							url : __ctxPath
//									+ '/know/multiEnabledUkKnowDimensionality.do',
//							ids : id,
//							grid : gridPanel,
//							msgTip : '您确认要启用所选记录吗？',
//							msgSuccess : '成功启用该记录！',
//							msgFailure : '操作出错，请联系管理员！'
//						});
			},
			// 把选中记录启用
			enabledSelRs : function() {
				var gridPanel = Ext.getCmp('UkKnowDimensionalityGrid');
				var rows = gridPanel.getSelectionModel().getSelections();
				if (rows != null && rows.length > 0) {
					var ids = new Array();
					for (var i = 0; i < rows.length; i++)
						ids.push(rows[i].data.dimensionalityId);
					Ext.Msg.confirm('信息确认', '您确认要启用所选记录吗？', function(btn) {
						if (btn == 'yes') {
							Ext.Ajax.request({
										url : __ctxPath + '/know/multiEnabledUkKnowDimensionality.do',
										params : {
											ids : ids
										},
										method : 'POST',
										success : function(response, options) {
											Ext.ux.Toast.msg('操作信息', '启用成功！');
											gridPanel.getStore().reload();
											Ext.getCmp('UkKnowDimensionalityTreePanel_3').root.reload();
										},
										failure : function(response, options) {
											Ext.ux.Toast.msg('操作信息', '操作出错，请联系管理员！');
										}
									});
						}
					});
				} else {
					Ext.ux.Toast.msg('操作提示', __noData);
				}
//				$gridRs({
//							url : __ctxPath
//									+ '/know/multiEnabledUkKnowDimensionality.do',
//							grid : gridPanel,
//							idName : 'dimensionalityId',
//							msgNull : '请选择要启用的记录！',
//							msgTip : '您确认要启用所选记录吗？',
//							msgSuccess : '成功启用所选记录！',
//							msgFailure : '操作出错，请联系管理员！'
//						});
				
			},
			// 编辑Rs
			editRs : function(record) {
				// new UkKnowDimensionalityForm({
				// dimensionalityId : record.data.dimensionalityId
				// }).show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('UkKnowDimensionalityFormPanel');
				if (aForm != null) {
					tabs.remove('UkKnowDimensionalityFormPanel');
				}
				aForm = new UkKnowDimensionalityForm({
							dimensionalityId : record.data.dimensionalityId
						}).show();
			},
			clickNode : function(node){
				var grid = Ext.getCmp('UkKnowDimensionalityGrid');
				var store = grid.getStore();
				store.url = __ctxPath + '/know/listUkKnowDimensionality.do';
				var paramObj = {
					start : 0,
					limit : 25
				};
			
				if (node != null && node.id > 0) {
					paramObj["Q_parentId_L_EQ"] = node.id;
					paramObj["isLeaf"] = node.attributes.leaf;
				}
				store.reload({
							params : paramObj
						});
			},
			// 行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this, record.data.dimensionalityId);
						break;
					case 'btn-edit' :
						this.editRs.call(this, record);
						break;
					case 'btn-setting' :
						this.enabledRs.call(this, record.data.dimensionalityId);
						break;
					default :
						break;
				}
			}
		});
