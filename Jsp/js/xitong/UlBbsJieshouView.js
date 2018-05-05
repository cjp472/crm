/**
 * @author:cf0666@gmail.com
 * @class UlBbsJieshouView
 * @extends Ext.Panel
 * @description [UlBbsJieshou]管理
 * @company 优创融联科技
 * @createtime:
 */
UlBbsJieshouView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				UlBbsJieshouView.superclass.constructor.call(this, {
							id : 'UlBbsJieshouViewWin',
							title : '[UlBbsJieshou]管理',
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
									fieldLabel:'bbsHuatiId',
									name : 'Q_bbsHuatiId_L_EQ',
									flex:1,
																		xtype:'numberfield'
																	}
																,
															 							 																																					 								{
									fieldLabel:'receiver',
									name : 'Q_receiver_S_EQ',
									flex:1,
																		xtype : 'textfield'
																	}
																,
															 							 																																					 								{
									fieldLabel:'receivetime',
									name : 'Q_receivetime_D_EQ',
									flex:1,
																		xtype:'datefield',
									format:'Y-m-d'
																	}
																,
															 							 																																					 								{
									fieldLabel:'readtime',
									name : 'Q_readtime_D_EQ',
									flex:1,
																		xtype:'datefield',
									format:'Y-m-d'
																	}
																,
															 							 																																					 								{
									fieldLabel:'readstatus',
									name : 'Q_readstatus_L_EQ',
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
									text : '添加[UlBbsJieshou]',
									xtype : 'button',
									scope : this,
									handler : this.createRs
								}, {
									iconCls : 'btn-del',
									text : '删除[UlBbsJieshou]',
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
					id:'UlBbsJieshouGrid',
					url : __ctxPath + "/xitong/listUlBbsJieshou.do",
					fields : [{
									name : 'bbsJieshouId',
									type : 'int'
								}
																																																	,'bbsHuatiId'
																																										,'receiver'
																																										,'receivetime'
																																										,'readtime'
																																										,'readstatus'
																																			],
					columns:[
								{
									header : 'bbsJieshouId',
									dataIndex : 'bbsJieshouId',
									hidden : true
								}
																																																								,{
																	header : 'bbsHuatiId',	
																	dataIndex : 'bbsHuatiId'
								}
																																																,{
																	header : 'receiver',	
																	dataIndex : 'receiver'
								}
																																																,{
																	header : 'receivetime',	
																	dataIndex : 'receivetime'
								}
																																																,{
																	header : 'readtime',	
																	dataIndex : 'readtime'
								}
																																																,{
																	header : 'readstatus',	
																	dataIndex : 'readstatus'
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
					new UlBbsJieshouForm({bbsJieshouId:rec.data.bbsJieshouId}).show();
				});
			},
			//创建记录
			createRs : function() {
				//new UlBbsJieshouForm().show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('UlBbsJieshouForm');
				if (aForm != null) {
					tabs.remove('UlBbsJieshouForm');
				}
				aForm = new UlBbsJieshouForm();
				tabs.add(aForm);
				tabs.activate(aForm);

			},
			//按ID删除记录
			removeRs : function(id) {
				$postDel({
					url:__ctxPath+ '/xitong/multiDelUlBbsJieshou.do',
					ids:id,
					grid:this.gridPanel
				});
			},
			//把选中ID删除
			removeSelRs : function() {
				$delGridRs({
					url:__ctxPath + '/xitong/multiDelUlBbsJieshou.do',
					grid:this.gridPanel,
					idName:'bbsJieshouId'
				});
			},
			//编辑Rs
			editRs : function(record) {
				new UlBbsJieshouForm({
					bbsJieshouId : record.data.bbsJieshouId
				}).show();
			},
			//行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this,record.data.bbsJieshouId);
						break;
					case 'btn-edit' :
						this.editRs.call(this,record);
						break;
					default :
						break;
				}
			}
});
