/**
 * @author:cf0666@gmail.com
 * @class UnimChannelNavigationView
 * @extends Ext.Panel
 * @description [UnimChannelNavigation]管理
 * @company 优创融联科技
 * @createtime:
 */
UnimChannelNavigationView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				UnimChannelNavigationView.superclass.constructor.call(this, {
							id : 'UnimChannelNavigationViewWin',
							title : '[UnimChannelNavigation]管理',
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
							var fieldnameComboData=[
																				 																																		[
											'navName',
											'导航名称',
																								new Ext.form.TextField({name : 'navName',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'parentid',
											'上级节点',
																																																					new Ext.form.NumberField({name : 'parentid',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'orderno',
											'顺序号',
																																																					new Ext.form.NumberField({name : 'orderno',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'status',
											'状态：未启用 启用 注销',
																																																					new Ext.form.NumberField({name : 'status',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'remark',
											'备注',
																								new Ext.form.TextField({name : 'remark',allowBlank:true})
																						 ]
																			 								 							 											]
				var UnimChannelNavigationAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : '[UnimChannelNavigation]高级查询',
					fieldData : fieldnameComboData
				});
								// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'UnimChannelNavigationSearchPanel',
							height : 35,
													items:[
																						 																																												 										{
																																																													
																						
																																				name : 'Q_navName_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_parentid_L_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_orderno_L_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_status_SN_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_remark_S_EQ',
																																																xtype : 'textfield'
																																	}
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
									},{
										xtype : 'button',
										text : __advancedSearch,
										iconCls : 'search',
										scope : this,
										handler :function(){ new UnimChannelNavigationAdvancedSearchWin().show();}
									}
								],
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
						items : [{
									iconCls : 'btn-add',
									//text : __create+'[UnimChannelNavigation]',
									text : __create,
									xtype : 'button',
									scope : this,
									handler : this.createRs
								}, {
									iconCls : 'btn-del',
									//text : __delete+'[UnimChannelNavigation]',
									text : __delete,
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
					printable : false,
					exportable : false,
					id:'UnimChannelNavigationGrid',
					url : __ctxPath + "/unim/listUnimChannelNavigation.do",
					fields : [{
									name : 'mapNavId',
									type : 'int'
								}
																																																																			,'navName'
																																																																								,'parentid'
																																																																								,'orderno'
																																																																								,'status'
																																																																								,'remark'
																																																],
					columns:[
								{
									header : 'mapNavId',
									dataIndex : 'mapNavId',
									hidden : true
								}
																																																								,{
																	header : '导航名称',
																isExp : false,
																
																	dataIndex : 'navName'
																}
																																																,{
																	header : '上级节点',
																isExp : false,
																
																	dataIndex : 'parentid'
																}
																																																,{
																	header : '顺序号',
																isExp : false,
																
																	dataIndex : 'orderno'
																}
																																																,{
																	header : '状态：未启用 启用 注销',
																isExp : false,
																
																	dataIndex : 'status'
																}
																																																,{
																	header : '备注',
																isExp : false,
																
																	dataIndex : 'remark'
																}
																																								, new Ext.ux.grid.RowActions({
									header:__action,
									width:100,
									actions:[{
											 iconCls:'btn-del',qtip:__delete,style:'margin:0 3px 0 3px'
										},{
											 iconCls:'btn-edit',qtip:__edit,style:'margin:0 3px 0 3px'
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
			onSearch : function(obj) {
//				var searchPanel = Ext.getCmp('UnimChannelNavigationSearchPanel');
//				var gridPanel = Ext.getCmp('UnimChannelNavigationGrid');
//				if (searchPanel.getForm().isValid()) {
					$search({
								searchPanel : this.searchPanel,
								gridPanel : this.gridPanel
							});
//				}
			},
			//GridPanel行点击处理事件
			rowClick:function(grid,rowindex, e) {
				grid.getSelectionModel().each(function(rec) {
					new UnimChannelNavigationForm({mapNavId:rec.data.mapNavId}).show();
				});
			},
			//创建记录
			createRs : function() {
				//new UnimChannelNavigationForm().show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('UnimChannelNavigationForm');
				if (aForm != null) {
					tabs.remove('UnimChannelNavigationForm');
				}
				aForm = new UnimChannelNavigationForm();
				tabs.add(aForm);
				tabs.activate(aForm);

			},
			//按ID删除记录
			removeRs : function(id) {
				$postSubmit({
					url:__ctxPath+ '/unim/multiDelUnimChannelNavigation.do',
					ids:id,
					grid:this.gridPanel,
					msgTip : '您确认要删除所选记录吗？',
					msgSuccess : '成功删除该记录！',
					msgFailure : '操作出错，请联系管理员！'
				});
			},
			//把选中ID删除
			removeSelRs : function() {
				$gridRs({
					url:__ctxPath + '/unim/multiDelUnimChannelNavigation.do',
					grid:this.gridPanel,
					idName:'mapNavId',
					msgNull : '请选择要删除的记录！',
					msgTip : '您确认要删除所选记录吗？',
					msgSuccess : '成功删除该记录！',
					msgFailure : '操作出错，请联系管理员！'
				});
			},
			//编辑Rs
			editRs : function(record) {
				//new UnimChannelNavigationForm({
				//	mapNavId : record.data.mapNavId
				//}).show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('UnimChannelNavigationForm');
				if (aForm != null) {
					tabs.remove('UnimChannelNavigationForm');
				}
				aForm = new UnimChannelNavigationForm({mapNavId : record.data.mapNavId});
				tabs.add(aForm);
				tabs.activate(aForm);
			},
			//行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this,record.data.mapNavId);
						break;
					case 'btn-edit' :
						this.editRs.call(this,record);
						break;
					default :
						break;
				}
			}
});
