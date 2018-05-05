/**
 * @author:cf0666@gmail.com
 * @class ShBuilderMethodView
 * @extends Ext.Panel
 * @description [ShBuilderMethod]管理
 * @company 优创融联科技
 * @createtime:
 */
ShBuilderMethodView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				ShBuilderMethodView.superclass.constructor.call(this, {
							id : 'ShBuilderMethodViewWin',
							title : '[ShBuilderMethod]管理',
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
							var fieldnameComboData=[
																				 																																		[
											'buildType',
											'施工类型',
																																																					new Ext.form.NumberField({name : 'buildType',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'applyContent',
											'申请说明',
																								new Ext.form.TextField({name : 'applyContent',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'staDat',
											'开始时间',
																								new Ext.form.DateField({hiddenName : 'staDat',format : 'Y-m-d'})
																						 ]
																				,
																			 								 																																		[
											'endDat',
											'结束时间',
																								new Ext.form.DateField({hiddenName : 'endDat',format : 'Y-m-d'})
																						 ]
																				,
																			 								 																																		[
											'buildPerson',
											'施工方',
																																																					new Ext.form.NumberField({name : 'buildPerson',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'buildDepid',
											'施工部门',
																																																					new Ext.form.NumberField({name : 'buildDepid',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'perIncharge',
											'负责人',
																																																					new Ext.form.NumberField({name : 'perIncharge',allowBlank:true})
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
											'userid',
											'申请人',
																																																					new Ext.form.NumberField({name : 'userid',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'applyDat',
											'申请时间',
																								new Ext.form.DateField({hiddenName : 'applyDat',format : 'Y-m-d'})
																						 ]
																				,
																			 								 																																		[
											'title',
											'标题',
																								new Ext.form.TextField({name : 'title',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'createBy',
											'创建人',
																																																					new Ext.form.NumberField({name : 'createBy',allowBlank:true})
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
											'isDelete',
											'删除标记',
																																																					new Ext.form.NumberField({name : 'isDelete',allowBlank:true})
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
																			 								 							 											]
				var ShBuilderMethodAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : '[ShBuilderMethod]高级查询',
					fieldData : fieldnameComboData
				});
								// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'ShBuilderMethodSearchPanel',
							height : 35,
													items:[
																						 																																												 										{
																																																													
																						
																																				name : 'Q_buildType_SN_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_applyContent_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_staDat_D_EQ',
																																																xtype:'datefield',
													format:'Y-m-d'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_endDat_D_EQ',
																																																xtype:'datefield',
													format:'Y-m-d'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_buildPerson_L_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_buildDepid_L_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_perIncharge_L_EQ',
																																																																													xtype:'numberfield'
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
																																																													
																						
																																				name : 'Q_userid_L_EQ',
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
																																																													
																						
																																				name : 'Q_title_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_createBy_L_EQ',
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
																																																													
																						
																							hiddenName : 'Q_isDelete_N_EQ'
																							 												,xtype:'combo'
												,editable : false
												,mode : 'local'
												,triggerAction : 'all'
												,store : [['1',__yes],['0',__no]]
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
										handler :function(){ new ShBuilderMethodAdvancedSearchWin().show();}
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
									//text : __create+'[ShBuilderMethod]',
									text : __create,
									xtype : 'button',
									scope : this,
									handler : this.createRs
								}, {
									iconCls : 'btn-del',
									//text : __delete+'[ShBuilderMethod]',
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
					id:'ShBuilderMethodGrid',
					url : __ctxPath + "/shhq/listShBuilderMethod.do",
					fields : [{
									name : 'metdId',
									type : 'int'
								}
																																																																			,'buildType'
																																																																								,'applyContent'
																																																																								,'staDat'
																																																																								,'endDat'
																																																																								,'buildPerson'
																																																																								,'buildDepid'
																																																																								,'perIncharge'
																																																																								,'status'
																																																																								,'runid'
																																																																								,'userid'
																																																																								,'applyDat'
																																																																								,'title'
																																																																								,'createBy'
																																																																								,'updateBy'
																																																																								,'createDate'
																																																																								,'updateDate'
																																																																								,'isDelete'
																																																																								,'nodeName'
																																																																								,'approvalStatus'
																																																],
					columns:[
								{
									header : 'metdId',
									dataIndex : 'metdId',
									hidden : true
								}
																																																								,{
																	header : '施工类型',
																isExp : false,
																
																	dataIndex : 'buildType'
																}
																																																,{
																	header : '申请说明',
																isExp : false,
																
																	dataIndex : 'applyContent'
																}
																																																,{
																	header : '开始时间',
																isExp : false,
																
																	dataIndex : 'staDat'
																}
																																																,{
																	header : '结束时间',
																isExp : false,
																
																	dataIndex : 'endDat'
																}
																																																,{
																	header : '施工方',
																isExp : false,
																
																	dataIndex : 'buildPerson'
																}
																																																,{
																	header : '施工部门',
																isExp : false,
																
																	dataIndex : 'buildDepid'
																}
																																																,{
																	header : '负责人',
																isExp : false,
																
																	dataIndex : 'perIncharge'
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
																	header : '申请人',
																isExp : false,
																
																	dataIndex : 'userid'
																}
																																																,{
																	header : '申请时间',
																isExp : false,
																
																	dataIndex : 'applyDat'
																}
																																																,{
																	header : '标题',
																isExp : false,
																
																	dataIndex : 'title'
																}
																																																,{
																	header : '创建人',
																isExp : false,
																
																	dataIndex : 'createBy'
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
																	header : '删除标记',
																isExp : false,
																
																	dataIndex : 'isDelete',
									renderer : function(value) {
										return value == '0'?__no:__yes;
									}
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
//				var searchPanel = Ext.getCmp('ShBuilderMethodSearchPanel');
//				var gridPanel = Ext.getCmp('ShBuilderMethodGrid');
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
					new ShBuilderMethodForm({metdId:rec.data.metdId}).show();
				});
			},
			//创建记录
			createRs : function() {
				//new ShBuilderMethodForm().show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ShBuilderMethodForm');
				if (aForm != null) {
					tabs.remove('ShBuilderMethodForm');
				}
				aForm = new ShBuilderMethodForm();
				tabs.add(aForm);
				tabs.activate(aForm);

			},
			//按ID删除记录
			removeRs : function(id) {
				$postSubmit({
					url:__ctxPath+ '/shhq/multiDelShBuilderMethod.do',
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
					url:__ctxPath + '/shhq/multiDelShBuilderMethod.do',
					grid:this.gridPanel,
					idName:'metdId',
					msgNull : '请选择要删除的记录！',
					msgTip : '您确认要删除所选记录吗？',
					msgSuccess : '成功删除该记录！',
					msgFailure : '操作出错，请联系管理员！'
				});
			},
			//编辑Rs
			editRs : function(record) {
				//new ShBuilderMethodForm({
				//	metdId : record.data.metdId
				//}).show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ShBuilderMethodForm');
				if (aForm != null) {
					tabs.remove('ShBuilderMethodForm');
				}
				aForm = new ShBuilderMethodForm({metdId : record.data.metdId});
				tabs.add(aForm);
				tabs.activate(aForm);
			},
			//行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this,record.data.metdId);
						break;
					case 'btn-edit' :
						this.editRs.call(this,record);
						break;
					default :
						break;
				}
			}
});
