/**
 * @author:cf0666@gmail.com
 * @class UlUgroupUserView
 * @extends Ext.Panel
 * @description [UlUgroupUser]管理
 * @company 优创融联科技
 * @createtime:
 */
UlUgroupUserView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				UlUgroupUserView.superclass.constructor.call(this, {
							id : 'UlUgroupUserViewWin',
							title : '[UlUgroupUser]管理',
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
				// 初始化搜索条件Panel
				this.searchPanel=new HT.SearchPanel({
							layout : 'form',
							region : 'north',
							colNums:3,
							items:[
																																												 								{
									fieldLabel:'pkUsergroupId',
									name : 'Q_pkUsergroupId_L_EQ',
									flex:1,
																		xtype:'numberfield'
																	}
																,
															 							 																																					 								{
									fieldLabel:'userid',
									name : 'Q_userid_L_EQ',
									flex:1,
																		xtype:'numberfield'
																	}
																,
															 							 														 							 															],
								buttons:[
									{
										text:'查询',
										scope:this,
										iconCls:'btn-search',
										handler:this.search
									},{
										text:'重置',
										scope:this,
										iconCls:'btn-reset',
										handler:this.reset
									}							
								]	
				});// end of searchPanel

				this.topbar = new Ext.Toolbar({
						items : [{
									iconCls : 'btn-add',
									text : '添加[UlUgroupUser]',
									xtype : 'button',
									scope : this,
									handler : this.createRs
								}, {
									iconCls : 'btn-del',
									text : '删除[UlUgroupUser]',
									xtype : 'button',
									scope:this,
									handler : this.removeSelRs
								}]
				});
	
				this.gridPanel=new HT.GridPanel({
					region:'center',
					tbar:this.topbar,
					//使用RowActions
					rowActions:true,
					id:'UlUgroupUserGrid',
					url : __ctxPath + "/xitong/listUlUgroupUser.do",
					fields : [{
									name : 'ugUId',
									type : 'int'
								}
																																			,'pkUsergroupId'
																																										,'userid'
																																																	],
					columns:[
								{
									header : 'ugUId',
									dataIndex : 'ugUId',
									hidden : true
								}
																																								,{
																	header : 'pkUsergroupId',	
																	dataIndex : 'pkUsergroupId'
								}
																																																,{
																	header : 'userid',	
																	dataIndex : 'userid'
								}
																																																								, new Ext.ux.grid.RowActions({
									header:'管理',
									width:100,
									actions:[{
											 iconCls:'btn-del',qtip:'删除',style:'margin:0 3px 0 3px'
										},{
											 iconCls:'btn-edit',qtip:'编辑',style:'margin:0 3px 0 3px'
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
			//重置查询表单
			reset : function(){
				this.searchPanel.getForm().reset();
			},
			//按条件搜索
			search : function() {
				$search({
					searchPanel:this.searchPanel,
					gridPanel:this.gridPanel
				});
			},
			//GridPanel行点击处理事件
			rowClick:function(grid,rowindex, e) {
				grid.getSelectionModel().each(function(rec) {
					new UlUgroupUserForm({ugUId:rec.data.ugUId}).show();
				});
			},
			//创建记录
			createRs : function() {
				//new UlUgroupUserForm().show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('UlUgroupUserForm');
				if (aForm != null) {
					tabs.remove('UlUgroupUserForm');
				}
				aForm = new UlUgroupUserForm();
				tabs.add(aForm);
				tabs.activate(aForm);

			},
			//按ID删除记录
			removeRs : function(id) {
				$postDel({
					url:__ctxPath+ '/xitong/multiDelUlUgroupUser.do',
					ids:id,
					grid:this.gridPanel
				});
			},
			//把选中ID删除
			removeSelRs : function() {
				$delGridRs({
					url:__ctxPath + '/xitong/multiDelUlUgroupUser.do',
					grid:this.gridPanel,
					idName:'ugUId'
				});
			},
			//编辑Rs
			editRs : function(record) {
				new UlUgroupUserForm({
					ugUId : record.data.ugUId
				}).show();
			},
			//行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this,record.data.ugUId);
						break;
					case 'btn-edit' :
						this.editRs.call(this,record);
						break;
					default :
						break;
				}
			}
});
