/**
 * @author: YHZ
 * @class RelativeJobView
 * @extends Ext.Panel
 * @description 上下级管理
 * @company 北京优创融联科技有限公司
 * @createtime: 2010-12-13PM
 */
RelativeJobView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				RelativeJobView.superclass.constructor.call(this, {
					id : 'RelativeJobView',
					title : '上下级管理',
					region : 'center',
					layout : 'border',
					iconCls : 'menu-relativeJob',
					items : [this.treePanel ,this.searchPanel , this.gridPanel]
				});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
				
				//////////////searchPanel[搜索]//////////////////
				this.searchPanel = new Ext.FormPanel({
					id : 'relativeJobSearchPanel',
					height : 35,
					frame : false,
					border : false,
					region : 'north',
					layout : 'hbox',
					layoutConfig : {
						padding : '5px',
						align : 'middle'
					},
					defaults : {
						xtype : 'label',
						border : false,
						margins : {top:0,left:4,right:4,bottom:4}
					},
					keys : {
						key : Ext.EventObject.ENTER,
						fn : this.search.createCallback(this),
						scope : this
					},
					items : [{
							text : '用户账号：'
						},{
							xtype : 'textfield',
							name : 'Q_username_S_LK',
							maxLength : 256
						},{
							text : '用户名称：'
						},{
							xtype : 'textfield',
							name : 'Q_fullname_S_LK',
							maxLength : 256
						},{
							text : '入职时间:从'
						}, {
							xtype : 'datefield',
							format: 'Y-m-d',
							name : 'Q_accessionTime_D_GT'
						}, {
							text : '至'
						},{
							xtype : 'datefield',
							format: 'Y-m-d',
							name : 'Q_accessionTime_D_LT'
						},{
							xtype : 'button',
							text : '搜索',
							scope : this,
							iconCls : 'search',
							handler : this.search.createCallback(this)
						},{
							xtype : 'button',
							text : '清空',
							scope : this,
							iconCls : 'reset',
							handler : this.reset
						}
					]
				});
				///////////////////////////////////////////////
				
				//treeView加载部门信息列表
				this.treePanel = new Ext.tree.TreePanel({
					id : 'relativeJobViewTreePanel',
					region : 'west',
					collapsible : true,
					autoScroll : true,
					split : true,
					width : 150,
					title : '部门信息列表',
					tbar : new Ext.Toolbar({
						items : [{
							xtype : 'button',
							iconCls : 'btn-refresh',
							text : '刷新',
							handler : function() {
								Ext.getCmp('relativeJobViewTreePanel').root.reload();
							}
						}, {
							xtype : 'button',
							text : '展开',
							iconCls : 'btn-expand',
							handler : function() {
								Ext.getCmp('relativeJobViewTreePanel').expandAll();
							}
						}, {
							xtype : 'button',
							text : '收起',
							iconCls : 'btn-collapse',
							handler : function() {
								Ext.getCmp('relativeJobViewTreePanel').collapseAll();
							}
						}]
					}),
					loader : new Ext.tree.TreeLoader({
						url : __ctxPath + '/system/listDepartment.do'
					}),
					root : new Ext.tree.AsyncTreeNode({
						expanded : true
					}),
					rootVisible : false,
					listeners : {
						'click' : function(node){
							if (node != null) {
								var store = Ext.getCmp('RelativeJobView').gridPanel.getStore();
								store.url = __ctxPath + '/system/listAppUser.do';
								store.baseParams = {
									'Q_department.depId_L_EQ' : node.id
								};
								store.reload({
									params : {
										start : 0,
										limit : 25
									}
								});
							}
						}
					}
				}); // end of this treePanel
				
				if (isGranted('_RelativeJobAdd') || isGranted('_RelativeJobEdit')
						|| isGranted('_RelativeJobDel')) {
					// 树的右键菜单的
					this.treePanel.on('contextmenu', contextmenu, this.treePanel);
				}
				// 创建右键菜单
				var treeMenu = new Ext.menu.Menu({
					id : 'RelativeJobTreeMenu',
					items : [{
							text : '新建部门',
							iconCls : 'btn-add',
							scope : this,
							handler : createNode
						},{
							text : '修改部门信息',
							iconCls : 'btn-edit',
							scope : this,
							handler : editNode
						},{
							text : '删除部门',
							iconCls : 'btn-delete',
							scope : this,
							handler : deteleNode
						}
					]
				});

				function contextmenu(node, e) {
					selected = new Ext.tree.TreeNode({
						id : node.id,
						text : node.text
					});
					treeMenu.showAt(e.getXY());
				}
				
				//添加节点
				function createNode() {
					var nodeId = selected.id;
					var departmentForm = Ext.getCmp('departmentForm');
					if (departmentForm == null) {
						if (nodeId > 0) {
							new DepartmentForm({
								nodeId : nodeId
							}).show();
						} else {
							new DepartmentForm({
								nodeId : 0
							}).show();
						}
					}
				}
				//删除节点
				function deteleNode() {
					var depId = selected.id;
					var type = Ext.getCmp('relativeJobViewTreePanel');
					if (depId > 0) {
						Ext.Msg.confirm('删除操作', '你确定删除部门?', function(btn) {
							if (btn == 'yes') {
								Ext.Ajax.request({
									url : __ctxPath + '/system/removeDepartment.do?depId='
											+ depId,
									success : function(result, request) {
										var res = Ext.util.JSON.decode(result.responseText);
										if(res.success){
											Ext.ux.Toast.msg('操作信息', '删除成功!');
											type.root.reload();
										}else
											Ext.ux.Toast.msg('操作信息', '对不起，删除');
										
									},
									failure : function(result, request) {}
								});
							}
						});
					} else {
						Ext.ux.Toast.msg('警告', "总公司不能被删除");
					}
				}
				//修改节点
				function editNode() {
					var depId = selected.id;
					if (depId > 0) {
						var departmentForm = Ext.getCmp('departmentForm');
						if (departmentForm == null) {
							new DepartmentForm().show();
							departmentForm = Ext.getCmp('departmentForm');
						}
						departmentForm.form.load({
								url : __ctxPath + '/system/detailDepartment.do',
								params : {
									depId : depId
								},
								method : 'post',
								deferredRender : true,
								layoutOnTabChange : true,
								success : function() {
								},
								failure : function() {
									Ext.ux.Toast.msg('编辑', '载入失败');
								}
							});
					} else {
						Ext.ux.Toast.msg('警告', "总公司不能修改！");
					}

				}
				
				this.topbar = new Ext.Toolbar({
					defaultType : 'button',
					items : [{
						iconCls : 'btn-del',
						text : '删除用户信息',
						scope : this,
						handler : this.removeSelRs
					}]
				});
				//gridPanel加载用户列表
				this.gridPanel=new HT.GridPanel({
					title : '用户信息列表',
					region : 'center',
					tbar : this.topbar,
					//使用RowActions
					rowActions:true,
					id : 'RelativeJobGrid',
					url : __ctxPath + '/system/listAppUser.do?',
					fields : [{
							name : 'userId',
							type : 'int'
						},'username','address','fullname','email','department','position','accessionTime'],
					columns:[
					    {
							header : 'userId',
							dataIndex : 'userId',
							hidden : true
						},
						{
							header : '账号',
							dataIndex : 'username',
							width : 60
						}, {
							header:'地址',
							dataIndex:'address',
							hidden:true,
							exprint:true
						},{
							header : '用户名',
							dataIndex : 'fullname',
							width : 60
						}, {
							header : '邮箱',
							dataIndex : 'email',
							width : 120
						}, {// 先不显示
							header : '所属部门',
							dataIndex : 'department',
							renderer : function(value) {
								return value == null ? '' : value.depName; 
							},
							width : 60
						}, {
							header : '入职时间',
							dataIndex : 'accessionTime',
							width : 100
						}, new Ext.ux.grid.RowActions({
							header:'管理',
							width:100,
							actions:[{
									 iconCls:'btn-relativeJob',qtip:'添加上下级',style:'margin:0 3px 0 3px'
								},{
									iconCls : 'btn-del',qtip:'删除',style:'margin:0 3px 0 3px'
								}
							],
							listeners:{
								scope:this,
								'action':this.onRowAction
							}
						})
					]//end of columns
				});
				
				this.gridPanel.addListener('rowdblclick',this.rowClick);
					
			},// end of the initComponents()
			//GridPanel行点击处理事件
			rowClick:function(grid,rowindex, e) {
				grid.getSelectionModel().each(function(rec) {
					new RelativeUserView({
						userId : rec.data.userId, //用户编号
						username : rec.data.username,
						depId : rec.data.department.depId //部门编号
					}).show();
				});
			},
			//创建记录
			createRs : function() {
				new RelativeJobForm().show();
			},
			//按ID删除记录
			removeRs : function(id) {
				$postDel({
					url:__ctxPath+ '/system/multiDelAppUser.do',
					ids:id,
					grid:this.gridPanel
				});
			},
			//把选中ID删除
			removeSelRs : function() {
				$delGridRs({
					url:__ctxPath + '/system/multiDelAppUser.do',
					grid:this.gridPanel,
					idName:'userId'
				});
			},
			
			//添加上下级别
			addRelativeJob : function(record){
				new RelativeUserView({
					userId : record.data.userId, //用户编号
					username : record.data.username,
					depId : record.data.department.depId //部门编号
				}).show();
			},
		
			//行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-relativeJob' : //添加上下级别
						this.addRelativeJob.call(this,record);
						break;
					case 'btn-del' : //删除数据
						this.removeRs.call(this,record.data.userId);
						break;
					default :
						break;
				}
			},
			
			/**
			 * 清空
			 */
			reset : function(){
				var searchPanel = Ext.getCmp('relativeJobSearchPanel');
				searchPanel.getForm().reset();
			},
			
			/**
			 * 搜索
			 */
			search : function(obj){
				var searchPanel = Ext.getCmp('relativeJobSearchPanel');

				var gridPanel = Ext.getCmp('RelativeJobGrid');
				if (searchPanel.getForm().isValid()) {
					$search({
						searchPanel :searchPanel,
						gridPanel : gridPanel
					});
				}
}
});
