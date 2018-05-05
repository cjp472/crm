/**
 * @author:cf0666@gmail.com
 * @class ShBuilderAcceptView
 * @extends Ext.Panel
 * @description [ShBuilderAccept]管理
 * @company 优创融联科技
 * @createtime:
 */
ShBuilderAcceptView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				ShBuilderAcceptView.superclass.constructor.call(this, {
							id : 'ShBuilderAcceptViewWin',
							title : '[ShBuilderAccept]管理',
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
							var fieldnameComboData=[
																				 																																		[
											'title',
											'标题',
																								new Ext.form.TextField({name : 'title',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'code',
											'编号',
																								new Ext.form.TextField({name : 'code',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'applyUserid',
											'申请人',
																																																					new Ext.form.NumberField({name : 'applyUserid',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'applyDat',
											'申请时间',
																								new Ext.form.DateField({hiddenName : 'applyDat',format : 'Y-m-d'})
																						 ]
																				,
																			 								 																																		[
											'applyContent',
											'申请说明',
																								new Ext.form.TextField({name : 'applyContent',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'perIncharge',
											'负责人',
																																																					new Ext.form.NumberField({name : 'perIncharge',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'perCall',
											'负责人电话',
																								new Ext.form.TextField({name : 'perCall',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'perPhone',
											'负责人手机',
																								new Ext.form.TextField({name : 'perPhone',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'acptResult',
											'验收结果',
																																																					new Ext.form.NumberField({name : 'acptResult',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'acptContent',
											'验收说明',
																								new Ext.form.TextField({name : 'acptContent',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'creUserid',
											'创建人',
																																																					new Ext.form.NumberField({name : 'creUserid',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'creDat',
											'创建时间',
																								new Ext.form.DateField({hiddenName : 'creDat',format : 'Y-m-d'})
																						 ]
																				,
																			 								 																																		[
											'updUserid',
											'修改人',
																																																					new Ext.form.NumberField({name : 'updUserid',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'updDat',
											'修改时间',
																								new Ext.form.DateField({hiddenName : 'updDat',format : 'Y-m-d'})
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
											'status',
											'状态',
																																																					new Ext.form.NumberField({name : 'status',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'runid',
											'RUNID',
																																																					new Ext.form.NumberField({name : 'runid',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'isDelete',
											'删除标记',
																																																					new Ext.form.NumberField({name : 'isDelete',allowBlank:true})
																																																	 ]
																			 								 							 											]
				var ShBuilderAcceptAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : '[ShBuilderAccept]高级查询',
					fieldData : fieldnameComboData
				});
								// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'ShBuilderAcceptSearchPanel',
							height : 35,
													items:[
																						 																																												 										{
																																																													
																						
																																				name : 'Q_title_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_code_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_applyUserid_L_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_applyDat_D_EQ',
																																																xtype:'datefield',
													format:'Y-m-d'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_applyContent_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_perIncharge_L_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_perCall_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_perPhone_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_acptResult_SN_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_acptContent_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_creUserid_L_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_creDat_D_EQ',
																																																xtype:'datefield',
													format:'Y-m-d'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_updUserid_L_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_updDat_D_EQ',
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
																																																													
																						
																																				name : 'Q_status_SN_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																		 										 										{
																																																													
																						
																																				name : 'Q_runid_N_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																		 										 										{
																																																													
																						
																							hiddenName : 'Q_isDelete_N_EQ'
																							 												,xtype:'combo'
												,editable : false
												,mode : 'local'
												,triggerAction : 'all'
												,store : [['1',__yes],['0',__no]]
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
										handler :function(){ new ShBuilderAcceptAdvancedSearchWin().show();}
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
									//text : __create+'[ShBuilderAccept]',
									text : __create,
									xtype : 'button',
									scope : this,
									handler : this.createRs
								}, {
									iconCls : 'btn-del',
									//text : __delete+'[ShBuilderAccept]',
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
					id:'ShBuilderAcceptGrid',
					url : __ctxPath + "/shhq/listShBuilderAccept.do",
					fields : [{
									name : 'acptId',
									type : 'int'
								}
																																																																			,'title'
																																																																								,'code'
																																																																								,'applyUserid'
																																																																								,'applyDat'
																																																																								,'applyContent'
																																																																								,'perIncharge'
																																																																								,'perCall'
																																																																								,'perPhone'
																																																																								,'acptResult'
																																																																								,'acptContent'
																																																																								,'creUserid'
																																																																								,'creDat'
																																																																								,'updUserid'
																																																																								,'updDat'
																																																																								,'nodeName'
																																																																								,'approvalStatus'
																																																																								,'status'
																																																																								,'runid'
																																																																								,'isDelete'
																																																],
					columns:[
								{
									header : 'acptId',
									dataIndex : 'acptId',
									hidden : true
								}
																																																								,{
																	header : '标题',
																isExp : false,
																
																	dataIndex : 'title'
																}
																																																,{
																	header : '编号',
																isExp : false,
																
																	dataIndex : 'code'
																}
																																																,{
																	header : '申请人',
																isExp : false,
																
																	dataIndex : 'applyUserid'
																}
																																																,{
																	header : '申请时间',
																isExp : false,
																
																	dataIndex : 'applyDat'
																}
																																																,{
																	header : '申请说明',
																isExp : false,
																
																	dataIndex : 'applyContent'
																}
																																																,{
																	header : '负责人',
																isExp : false,
																
																	dataIndex : 'perIncharge'
																}
																																																,{
																	header : '负责人电话',
																isExp : false,
																
																	dataIndex : 'perCall'
																}
																																																,{
																	header : '负责人手机',
																isExp : false,
																
																	dataIndex : 'perPhone'
																}
																																																,{
																	header : '验收结果',
																isExp : false,
																
																	dataIndex : 'acptResult'
																}
																																																,{
																	header : '验收说明',
																isExp : false,
																
																	dataIndex : 'acptContent'
																}
																																																,{
																	header : '创建人',
																isExp : false,
																
																	dataIndex : 'creUserid'
																}
																																																,{
																	header : '创建时间',
																isExp : false,
																
																	dataIndex : 'creDat'
																}
																																																,{
																	header : '修改人',
																isExp : false,
																
																	dataIndex : 'updUserid'
																}
																																																,{
																	header : '修改时间',
																isExp : false,
																
																	dataIndex : 'updDat'
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
																	header : '状态',
																isExp : false,
																
																	dataIndex : 'status'
																}
																																																,{
																	header : 'RUNID',
																isExp : false,
																
																	dataIndex : 'runid'
																}
																																																,{
																	header : '删除标记',
																isExp : false,
																
																	dataIndex : 'isDelete',
									renderer : function(value) {
										return value == '0'?__no:__yes;
									}
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
//				var searchPanel = Ext.getCmp('ShBuilderAcceptSearchPanel');
//				var gridPanel = Ext.getCmp('ShBuilderAcceptGrid');
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
					new ShBuilderAcceptForm({acptId:rec.data.acptId}).show();
				});
			},
			//创建记录
			createRs : function() {
				//new ShBuilderAcceptForm().show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ShBuilderAcceptForm');
				if (aForm != null) {
					tabs.remove('ShBuilderAcceptForm');
				}
				aForm = new ShBuilderAcceptForm();
				tabs.add(aForm);
				tabs.activate(aForm);

			},
			//按ID删除记录
			removeRs : function(id) {
				$postSubmit({
					url:__ctxPath+ '/shhq/multiDelShBuilderAccept.do',
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
					url:__ctxPath + '/shhq/multiDelShBuilderAccept.do',
					grid:this.gridPanel,
					idName:'acptId',
					msgNull : '请选择要删除的记录！',
					msgTip : '您确认要删除所选记录吗？',
					msgSuccess : '成功删除该记录！',
					msgFailure : '操作出错，请联系管理员！'
				});
			},
			//编辑Rs
			editRs : function(record) {
				//new ShBuilderAcceptForm({
				//	acptId : record.data.acptId
				//}).show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ShBuilderAcceptForm');
				if (aForm != null) {
					tabs.remove('ShBuilderAcceptForm');
				}
				aForm = new ShBuilderAcceptForm({acptId : record.data.acptId});
				tabs.add(aForm);
				tabs.activate(aForm);
			},
			//行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this,record.data.acptId);
						break;
					case 'btn-edit' :
						this.editRs.call(this,record);
						break;
					default :
						break;
				}
			}
});
