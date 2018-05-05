/**
 * @author:cf0666@gmail.com
 * @class UnimAssStatusView
 * @extends Ext.Panel
 * @description [UnimAssStatus]管理
 * @company 优创融联科技
 * @createtime:
 */
UnimAssStatusView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				UnimAssStatusView.superclass.constructor.call(this, {
							id : 'UnimAssStatusViewWin',
							title : '[UnimAssStatus]管理',
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
							var fieldnameComboData=[
																				 																																		[
											'catId',
											'资产类型ID',
																																						new Ext.form.ComboBox({
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/unim/listcatId.do',
															fields : [ 'catId', 'catIdName' ]
														}),
														displayField : 'catIdName',
														valueField : 'catId',
														id : 'catId'
														})
																																			 ]
																				,
																			 								 																																		[
											'statusName',
											'资产状态名称',
																								new Ext.form.TextField({name : 'statusName',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'statusCode',
											'资产状态编号',
																								new Ext.form.TextField({name : 'statusCode',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'extend1',
											'扩展字段1（显示颜色1）',
																								new Ext.form.TextField({name : 'extend1',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'extend2',
											'扩展字段2',
																								new Ext.form.TextField({name : 'extend2',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'extend3',
											'扩展字段3',
																								new Ext.form.TextField({name : 'extend3',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'extend4',
											'扩展字段4',
																								new Ext.form.TextField({name : 'extend4',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'remark',
											'备注',
																								new Ext.form.TextField({name : 'remark',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'status',
											'状态：启用、注销',
																																																					new Ext.form.NumberField({name : 'status',allowBlank:true})
																																																	 ]
																			 								 							 											]
				var UnimAssStatusAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : '[UnimAssStatus]高级查询',
					fieldData : fieldnameComboData
				});
								// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'UnimAssStatusSearchPanel',
							height : 35,
													items:[
																						 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_catId_L_EQ',
																																																														xtype:'combo',
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/unim/listcatId.do',
															fields : [ 'catId', 'catIdName' ]
														}),
														displayField : 'catIdName',
														valueField : 'catId',
														id : 'catId'
																																														}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_statusName_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_statusCode_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_extend1_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_extend2_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_extend3_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_extend4_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_remark_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_status_SN_EQ',
																																																																													xtype:'numberfield'
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
										handler :function(){ new UnimAssStatusAdvancedSearchWin().show();}
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
									//text : __create+'[UnimAssStatus]',
									text : __create,
									xtype : 'button',
									scope : this,
									handler : this.createRs
								}, {
									iconCls : 'btn-del',
									//text : __delete+'[UnimAssStatus]',
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
					id:'UnimAssStatusGrid',
					url : __ctxPath + "/unim/listUnimAssStatus.do",
					fields : [{
									name : 'statusId',
									type : 'int'
								}
																																																																			,'unimAssStatus'
																																																																								,'statusName'
																																																																								,'statusCode'
																																																																								,'extend1'
																																																																								,'extend2'
																																																																								,'extend3'
																																																																								,'extend4'
																																																																								,'remark'
																																																																								,'status'
																																																],
					columns:[
								{
									header : 'statusId',
									dataIndex : 'statusId',
									hidden : true
								}
																																																								,{
																	header : '资产类型ID',
																isExp : false,
																
																    dataIndex : 'catId',
								    renderer:function(val){
								    	return val.catIdName;
								    }
																}
																																																,{
																	header : '资产状态名称',
																isExp : false,
																
																	dataIndex : 'statusName'
																}
																																																,{
																	header : '资产状态编号',
																isExp : false,
																
																	dataIndex : 'statusCode'
																}
																																																,{
																	header : '扩展字段1（显示颜色1）',
																isExp : false,
																
																	dataIndex : 'extend1'
																}
																																																,{
																	header : '扩展字段2',
																isExp : false,
																
																	dataIndex : 'extend2'
																}
																																																,{
																	header : '扩展字段3',
																isExp : false,
																
																	dataIndex : 'extend3'
																}
																																																,{
																	header : '扩展字段4',
																isExp : false,
																
																	dataIndex : 'extend4'
																}
																																																,{
																	header : '备注',
																isExp : false,
																
																	dataIndex : 'remark'
																}
																																																,{
																	header : '状态：启用、注销',
																isExp : false,
																
																	dataIndex : 'status'
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
//				var searchPanel = Ext.getCmp('UnimAssStatusSearchPanel');
//				var gridPanel = Ext.getCmp('UnimAssStatusGrid');
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
					new UnimAssStatusForm({statusId:rec.data.statusId}).show();
				});
			},
			//创建记录
			createRs : function() {
				//new UnimAssStatusForm().show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('UnimAssStatusForm');
				if (aForm != null) {
					tabs.remove('UnimAssStatusForm');
				}
				aForm = new UnimAssStatusForm();
				tabs.add(aForm);
				tabs.activate(aForm);

			},
			//按ID删除记录
			removeRs : function(id) {
				$postSubmit({
					url:__ctxPath+ '/unim/multiDelUnimAssStatus.do',
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
					url:__ctxPath + '/unim/multiDelUnimAssStatus.do',
					grid:this.gridPanel,
					idName:'statusId',
					msgNull : '请选择要删除的记录！',
					msgTip : '您确认要删除所选记录吗？',
					msgSuccess : '成功删除该记录！',
					msgFailure : '操作出错，请联系管理员！'
				});
			},
			//编辑Rs
			editRs : function(record) {
				//new UnimAssStatusForm({
				//	statusId : record.data.statusId
				//}).show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('UnimAssStatusForm');
				if (aForm != null) {
					tabs.remove('UnimAssStatusForm');
				}
				aForm = new UnimAssStatusForm({statusId : record.data.statusId});
				tabs.add(aForm);
				tabs.activate(aForm);
			},
			//行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this,record.data.statusId);
						break;
					case 'btn-edit' :
						this.editRs.call(this,record);
						break;
					default :
						break;
				}
			}
});
