/**
 * @author:
 * @class TaskSignView
 * @extends Ext.Panel
 * @description [TaskSign]管理
 * @company 北京优创融联科技有限公司
 * @createtime:
 */
TaskSignView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				TaskSignView.superclass.constructor.call(this, {
							id : 'TaskSignView',
							title : '[TaskSign]管理',
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
									fieldLabel:'所属流程设置',
									name : 'Q_assignId_L_EQ',
									flex:1,
																		xtype:'numberfield'
																	}
																,
															 							 																													 								 								{
									fieldLabel:'绝对票数',
									name : 'Q_voteCounts_N_EQ',
									flex:1,
																		xtype:'numberfield'
																	}
																,
															 							 																													 								 								{
									fieldLabel:'百分比票数',
									name : 'Q_votePercents_N_EQ',
									flex:1,
																		xtype:'numberfield'
																	}
																,
															 							 																																					 								{
									fieldLabel:'1=pass 通过',
									name : 'Q_decideType_SN_EQ',
									flex:1,
																		xtype:'numberfield'
																	}
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
									text : '添加[TaskSign]',
									xtype : 'button',
									scope : this,
									handler : this.createRs
								}, {
									iconCls : 'btn-del',
									text : '删除[TaskSign]',
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
					id:'TaskSignGrid',
					url : __ctxPath + "/flow/listTaskSign.do",
					fields : [{
									name : 'signId',
									type : 'int'
								}
																																																	,'assignId'
																																										,'voteCounts'
																																										,'votePercents'
																																										,'decideType'
																																			],
					columns:[
								{
									header : 'signId',
									dataIndex : 'signId',
									hidden : true
								}
																																																								,{
																	header : '所属流程设置',	
																	dataIndex : 'assignId'
								}
																																																,{
																	header : '绝对票数',	
																	dataIndex : 'voteCounts'
								}
																																																,{
																	header : '百分比票数',	
																	dataIndex : 'votePercents'
								}
																																																,{
																	header : '1=pass 通过  2=reject 拒绝',	
																	dataIndex : 'decideType'
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
					new TaskSignForm({signId:rec.data.signId}).show();
				});
			},
			//创建记录
			createRs : function() {
				new TaskSignForm().show();
			},
			//按ID删除记录
			removeRs : function(id) {
				$postDel({
					url:__ctxPath+ '/flow/multiDelTaskSign.do',
					ids:id,
					grid:this.gridPanel
				});
			},
			//把选中ID删除
			removeSelRs : function() {
				$delGridRs({
					url:__ctxPath + '/flow/multiDelTaskSign.do',
					grid:this.gridPanel,
					idName:'signId'
				});
			},
			//编辑Rs
			editRs : function(record) {
				new TaskSignForm({
					signId : record.data.signId
				}).show();
			},
			//行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this,record.data.signId);
						break;
					case 'btn-edit' :
						this.editRs.call(this,record);
						break;
					default :
						break;
				}
			}
});
