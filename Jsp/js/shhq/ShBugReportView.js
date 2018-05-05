/**
 * @author:cf0666@gmail.com
 * @class ShBugReportView
 * @extends Ext.Panel
 * @description [ShBugReport]管理
 * @company 优创融联科技
 * @createtime:
 */
ShBugReportView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				ShBugReportView.superclass.constructor.call(this, {
							id : 'ShBugReportViewWin',
							title : '[ShBugReport]管理',
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
							var fieldnameComboData=[
																				 																																		[
											'applyDepid',
											'所在单位',
																																																					new Ext.form.NumberField({name : 'applyDepid',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'reportPhone',
											'报修电话',
																								new Ext.form.TextField({name : 'reportPhone',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'bugResource',
											'故障来源',
																																																					new Ext.form.NumberField({name : 'bugResource',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'bugAddress',
											'故障地点',
																								new Ext.form.TextField({name : 'bugAddress',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'bugTime',
											'故障时间',
																								new Ext.form.DateField({hiddenName : 'bugTime',format : 'Y-m-d'})
																						 ]
																				,
																			 								 																																		[
											'bugProperties',
											'故障性质',
																																																					new Ext.form.NumberField({name : 'bugProperties',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'bugType',
											'故障分类',
																																																					new Ext.form.NumberField({name : 'bugType',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'effectArear',
											'影响范围',
																																																					new Ext.form.NumberField({name : 'effectArear',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'bugDesc',
											'故障描述',
																								new Ext.form.TextField({name : 'bugDesc',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'urgencyLevel',
											'紧急程度',
																																																					new Ext.form.NumberField({name : 'urgencyLevel',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'bugPriority',
											'故障优先级',
																																																					new Ext.form.NumberField({name : 'bugPriority',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'registerPerson',
											'登记人',
																																																					new Ext.form.NumberField({name : 'registerPerson',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'registerTime',
											'登记时间',
																								new Ext.form.DateField({hiddenName : 'registerTime',format : 'Y-m-d'})
																						 ]
																				,
																			 								 																																		[
											'creUserid',
											'创建人',
																																																					new Ext.form.NumberField({name : 'creUserid',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'perDepid',
											'负责部门',
																																																					new Ext.form.NumberField({name : 'perDepid',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'bugFacility',
											'故障设备',
																								new Ext.form.TextField({name : 'bugFacility',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'applyUserid',
											'报修人',
																																																					new Ext.form.NumberField({name : 'applyUserid',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'applyComment',
											'备注',
																								new Ext.form.TextField({name : 'applyComment',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'code',
											'编号',
																								new Ext.form.TextField({name : 'code',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'perIncharge',
											'负责人',
																																																					new Ext.form.NumberField({name : 'perIncharge',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'applyStatus',
											'状态',
																																																					new Ext.form.NumberField({name : 'applyStatus',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'runid',
											'RUNID',
																																																					new Ext.form.NumberField({name : 'runid',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'updateBy',
											'修改人',
																																																					new Ext.form.NumberField({name : 'updateBy',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'createDate',
											'创建时间',
																								new Ext.form.DateField({hiddenName : 'createDate',format : 'Y-m-d'})
																						 ]
																				,
																			 								 																																		[
											'updateDate',
											'修改时间',
																								new Ext.form.DateField({hiddenName : 'updateDate',format : 'Y-m-d'})
																						 ]
																				,
																			 								 																																		[
											'nodeName',
											'审批节点名称',
																								new Ext.form.TextField({name : 'nodeName',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'approvalStatus',
											'审批状态',
																								new Ext.form.TextField({name : 'approvalStatus',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'cusSatisDegree',
											'客户满意度',
																																																					new Ext.form.NumberField({name : 'cusSatisDegree',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'cusFeebackInfo',
											'用户反馈信息',
																																																					new Ext.form.NumberField({name : 'cusFeebackInfo',allowBlank:true})
																																																	 ]
																			 								 							 											]
				var ShBugReportAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : '[ShBugReport]高级查询',
					fieldData : fieldnameComboData
				});
								// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'ShBugReportSearchPanel',
							height : 35,
													items:[
																						 																																												 										{
																																																													
																						
																																				name : 'Q_applyDepid_L_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_reportPhone_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_bugResource_SN_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_bugAddress_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_bugTime_D_EQ',
																																																xtype:'datefield',
													format:'Y-m-d'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_bugProperties_SN_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_bugType_SN_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_effectArear_SN_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_bugDesc_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_urgencyLevel_SN_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_bugPriority_SN_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_registerPerson_L_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_registerTime_D_EQ',
																																																xtype:'datefield',
													format:'Y-m-d'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_creUserid_L_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_perDepid_L_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_bugFacility_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_applyUserid_L_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_applyComment_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_code_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_perIncharge_L_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_applyStatus_SN_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_runid_L_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_updateBy_L_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_createDate_D_EQ',
																																																xtype:'datefield',
													format:'Y-m-d'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_updateDate_D_EQ',
																																																xtype:'datefield',
													format:'Y-m-d'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_nodeName_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_approvalStatus_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_cusSatisDegree_SN_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_cusFeebackInfo_SN_EQ',
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
										handler :function(){ new ShBugReportAdvancedSearchWin().show();}
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
									//text : __create+'[ShBugReport]',
									text : __create,
									xtype : 'button',
									scope : this,
									handler : this.createRs
								}, {
									iconCls : 'btn-del',
									//text : __delete+'[ShBugReport]',
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
					id:'ShBugReportGrid',
					url : __ctxPath + "/shhq/listShBugReport.do",
					fields : [{
									name : 'applyId',
									type : 'int'
								}
																																																																			,'applyDepid'
																																																																								,'reportPhone'
																																																																								,'bugResource'
																																																																								,'bugAddress'
																																																																								,'bugTime'
																																																																								,'bugProperties'
																																																																								,'bugType'
																																																																								,'effectArear'
																																																																								,'bugDesc'
																																																																								,'urgencyLevel'
																																																																								,'bugPriority'
																																																																								,'registerPerson'
																																																																								,'registerTime'
																																																																								,'creUserid'
																																																																								,'perDepid'
																																																																								,'bugFacility'
																																																																								,'applyUserid'
																																																																								,'applyComment'
																																																																								,'code'
																																																																								,'perIncharge'
																																																																								,'applyStatus'
																																																																								,'runid'
																																																																								,'updateBy'
																																																																								,'createDate'
																																																																								,'updateDate'
																																																																								,'nodeName'
																																																																								,'approvalStatus'
																																																																								,'cusSatisDegree'
																																																																								,'cusFeebackInfo'
																																																],
					columns:[
								{
									header : 'applyId',
									dataIndex : 'applyId',
									hidden : true
								}
																																																								,{
																	header : '所在单位',
																isExp : false,
																
																	dataIndex : 'applyDepid'
																}
																																																,{
																	header : '报修电话',
																isExp : false,
																
																	dataIndex : 'reportPhone'
																}
																																																,{
																	header : '故障来源',
																isExp : false,
																
																	dataIndex : 'bugResource'
																}
																																																,{
																	header : '故障地点',
																isExp : false,
																
																	dataIndex : 'bugAddress'
																}
																																																,{
																	header : '故障时间',
																isExp : false,
																
																	dataIndex : 'bugTime'
																}
																																																,{
																	header : '故障性质',
																isExp : false,
																
																	dataIndex : 'bugProperties'
																}
																																																,{
																	header : '故障分类',
																isExp : false,
																
																	dataIndex : 'bugType'
																}
																																																,{
																	header : '影响范围',
																isExp : false,
																
																	dataIndex : 'effectArear'
																}
																																																,{
																	header : '故障描述',
																isExp : false,
																
																	dataIndex : 'bugDesc'
																}
																																																,{
																	header : '紧急程度',
																isExp : false,
																
																	dataIndex : 'urgencyLevel'
																}
																																																,{
																	header : '故障优先级',
																isExp : false,
																
																	dataIndex : 'bugPriority'
																}
																																																,{
																	header : '登记人',
																isExp : false,
																
																	dataIndex : 'registerPerson'
																}
																																																,{
																	header : '登记时间',
																isExp : false,
																
																	dataIndex : 'registerTime'
																}
																																																,{
																	header : '创建人',
																isExp : false,
																
																	dataIndex : 'creUserid'
																}
																																																,{
																	header : '负责部门',
																isExp : false,
																
																	dataIndex : 'perDepid'
																}
																																																,{
																	header : '故障设备',
																isExp : false,
																
																	dataIndex : 'bugFacility'
																}
																																																,{
																	header : '报修人',
																isExp : false,
																
																	dataIndex : 'applyUserid'
																}
																																																,{
																	header : '备注',
																isExp : false,
																
																	dataIndex : 'applyComment'
																}
																																																,{
																	header : '编号',
																isExp : false,
																
																	dataIndex : 'code'
																}
																																																,{
																	header : '负责人',
																isExp : false,
																
																	dataIndex : 'perIncharge'
																}
																																																,{
																	header : '状态',
																isExp : false,
																
																	dataIndex : 'applyStatus'
																}
																																																,{
																	header : 'RUNID',
																isExp : false,
																
																	dataIndex : 'runid'
																}
																																																,{
																	header : '修改人',
																isExp : false,
																
																	dataIndex : 'updateBy'
																}
																																																,{
																	header : '创建时间',
																isExp : false,
																
																	dataIndex : 'createDate'
																}
																																																,{
																	header : '修改时间',
																isExp : false,
																
																	dataIndex : 'updateDate'
																}
																																																,{
																	header : '审批节点名称',
																isExp : false,
																
																	dataIndex : 'nodeName'
																}
																																																,{
																	header : '审批状态',
																isExp : false,
																
																	dataIndex : 'approvalStatus'
																}
																																																,{
																	header : '客户满意度',
																isExp : false,
																
																	dataIndex : 'cusSatisDegree'
																}
																																																,{
																	header : '用户反馈信息',
																isExp : false,
																
																	dataIndex : 'cusFeebackInfo'
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
//				var searchPanel = Ext.getCmp('ShBugReportSearchPanel');
//				var gridPanel = Ext.getCmp('ShBugReportGrid');
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
					new ShBugReportForm({applyId:rec.data.applyId}).show();
				});
			},
			//创建记录
			createRs : function() {
				//new ShBugReportForm().show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ShBugReportForm');
				if (aForm != null) {
					tabs.remove('ShBugReportForm');
				}
				aForm = new ShBugReportForm();
				tabs.add(aForm);
				tabs.activate(aForm);

			},
			//按ID删除记录
			removeRs : function(id) {
				$postSubmit({
					url:__ctxPath+ '/shhq/multiDelShBugReport.do',
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
					url:__ctxPath + '/shhq/multiDelShBugReport.do',
					grid:this.gridPanel,
					idName:'applyId',
					msgNull : '请选择要删除的记录！',
					msgTip : '您确认要删除所选记录吗？',
					msgSuccess : '成功删除该记录！',
					msgFailure : '操作出错，请联系管理员！'
				});
			},
			//编辑Rs
			editRs : function(record) {
				//new ShBugReportForm({
				//	applyId : record.data.applyId
				//}).show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ShBugReportForm');
				if (aForm != null) {
					tabs.remove('ShBugReportForm');
				}
				aForm = new ShBugReportForm({applyId : record.data.applyId});
				tabs.add(aForm);
				tabs.activate(aForm);
			},
			//行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this,record.data.applyId);
						break;
					case 'btn-edit' :
						this.editRs.call(this,record);
						break;
					default :
						break;
				}
			}
});
