/**
 * @author:cf0666@gmail.com
 * @class ShBuilderApplyView
 * @extends Ext.Panel
 * @description [ShBuilderApply]管理
 * @company 优创融联科技
 * @createtime:
 */
ShBuilderApplyView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				ShBuilderApplyView.superclass.constructor.call(this, {
							id : 'ShBuilderApplyViewWin',
							title : '[ShBuilderApply]管理',
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
							var fieldnameComboData=[
																				 																																		[
											'metdId',
											'方案内码',
																																						new Ext.form.ComboBox({
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/shhq/listmetdId.do',
															fields : [ 'metdId', 'metdIdName' ]
														}),
														displayField : 'metdIdName',
														valueField : 'metdId',
														id : 'metdId'
														})
																																			 ]
																				,
																			 								 																																		[
											'applyUserid',
											'申请人',
																																																					new Ext.form.NumberField({name : 'applyUserid',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'applyTime',
											'申请时间',
																								new Ext.form.DateField({hiddenName : 'applyTime',format : 'Y-m-d'})
																						 ]
																				,
																			 								 																																		[
											'applyTitle',
											'标题',
																								new Ext.form.TextField({name : 'applyTitle',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'applyComment',
											'备注',
																								new Ext.form.TextField({name : 'applyComment',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'applyContent',
											'施工内容',
																								new Ext.form.TextField({name : 'applyContent',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'applyDescribe',
											'施工内容说明',
																								new Ext.form.TextField({name : 'applyDescribe',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'code',
											'编号',
																								new Ext.form.TextField({name : 'code',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'buldAddress',
											'施工地点',
																								new Ext.form.TextField({name : 'buldAddress',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'buildHouse',
											'机房名称',
																								new Ext.form.TextField({name : 'buildHouse',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'buildArear',
											'施工面积',
																								new Ext.form.TextField({name : 'buildArear',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'isFire',
											'是否动火施工',
																																																					new Ext.form.NumberField({name : 'isFire',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'isHeight',
											'是否登高施工',
																																																					new Ext.form.NumberField({name : 'isHeight',allowBlank:true})
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
				var ShBuilderApplyAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : '[ShBuilderApply]高级查询',
					fieldData : fieldnameComboData
				});
								// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'ShBuilderApplySearchPanel',
							height : 35,
													items:[
																						 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_metdId_L_EQ',
																																																														xtype:'combo',
														editabel : false,
														lazyInit : false,
														triggerAction : 'all',
														store : new Ext.data.SimpleStore( {
															autoLoad : true,
															url : __ctxPath + '/shhq/listmetdId.do',
															fields : [ 'metdId', 'metdIdName' ]
														}),
														displayField : 'metdIdName',
														valueField : 'metdId',
														id : 'metdId'
																																														}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_applyUserid_L_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_applyTime_D_EQ',
																																																xtype:'datefield',
													format:'Y-m-d'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_applyTitle_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_applyComment_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_applyContent_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_applyDescribe_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_code_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_buldAddress_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_buildHouse_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_buildArear_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																							hiddenName : 'Q_isFire_SN_EQ'
																							 												,xtype:'combo'
												,editable : false
												,mode : 'local'
												,triggerAction : 'all'
												,store : [['1',__yes],['0',__no]]
																					}
																				,
																			 								 																																												 										{
																																																													
																						
																							hiddenName : 'Q_isHeight_SN_EQ'
																							 												,xtype:'combo'
												,editable : false
												,mode : 'local'
												,triggerAction : 'all'
												,store : [['1',__yes],['0',__no]]
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
										handler :function(){ new ShBuilderApplyAdvancedSearchWin().show();}
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
									//text : __create+'[ShBuilderApply]',
									text : __create,
									xtype : 'button',
									scope : this,
									handler : this.createRs
								}, {
									iconCls : 'btn-del',
									//text : __delete+'[ShBuilderApply]',
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
					id:'ShBuilderApplyGrid',
					url : __ctxPath + "/shhq/listShBuilderApply.do",
					fields : [{
									name : 'applyId',
									type : 'int'
								}
																																																																			,'shBuilderApply'
																																																																								,'applyUserid'
																																																																								,'applyTime'
																																																																								,'applyTitle'
																																																																								,'applyComment'
																																																																								,'applyContent'
																																																																								,'applyDescribe'
																																																																								,'code'
																																																																								,'buldAddress'
																																																																								,'buildHouse'
																																																																								,'buildArear'
																																																																								,'isFire'
																																																																								,'isHeight'
																																																																								,'perIncharge'
																																																																								,'perCall'
																																																																								,'perPhone'
																																																																								,'applyStatus'
																																																																								,'runid'
																																																																								,'createBy'
																																																																								,'updateBy'
																																																																								,'createDate'
																																																																								,'updateDate'
																																																																								,'nodeName'
																																																																								,'approvalStatus'
																																																],
					columns:[
								{
									header : 'applyId',
									dataIndex : 'applyId',
									hidden : true
								}
																																																								,{
																	header : '方案内码',
																isExp : false,
																
																    dataIndex : 'metdId',
								    renderer:function(val){
								    	return val.metdIdName;
								    }
																}
																																																,{
																	header : '申请人',
																isExp : false,
																
																	dataIndex : 'applyUserid'
																}
																																																,{
																	header : '申请时间',
																isExp : false,
																
																	dataIndex : 'applyTime'
																}
																																																,{
																	header : '标题',
																isExp : false,
																
																	dataIndex : 'applyTitle'
																}
																																																,{
																	header : '备注',
																isExp : false,
																
																	dataIndex : 'applyComment'
																}
																																																,{
																	header : '施工内容',
																isExp : false,
																
																	dataIndex : 'applyContent'
																}
																																																,{
																	header : '施工内容说明',
																isExp : false,
																
																	dataIndex : 'applyDescribe'
																}
																																																,{
																	header : '编号',
																isExp : false,
																
																	dataIndex : 'code'
																}
																																																,{
																	header : '施工地点',
																isExp : false,
																
																	dataIndex : 'buldAddress'
																}
																																																,{
																	header : '机房名称',
																isExp : false,
																
																	dataIndex : 'buildHouse'
																}
																																																,{
																	header : '施工面积',
																isExp : false,
																
																	dataIndex : 'buildArear'
																}
																																																,{
																	header : '是否动火施工',
																isExp : false,
																
																	dataIndex : 'isFire',
									renderer : function(value) {
										return value == '0'?__no:__yes;
									}
																}
																																																,{
																	header : '是否登高施工',
																isExp : false,
																
																	dataIndex : 'isHeight',
									renderer : function(value) {
										return value == '0'?__no:__yes;
									}
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
//				var searchPanel = Ext.getCmp('ShBuilderApplySearchPanel');
//				var gridPanel = Ext.getCmp('ShBuilderApplyGrid');
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
					new ShBuilderApplyForm({applyId:rec.data.applyId}).show();
				});
			},
			//创建记录
			createRs : function() {
				//new ShBuilderApplyForm().show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ShBuilderApplyForm');
				if (aForm != null) {
					tabs.remove('ShBuilderApplyForm');
				}
				aForm = new ShBuilderApplyForm();
				tabs.add(aForm);
				tabs.activate(aForm);

			},
			//按ID删除记录
			removeRs : function(id) {
				$postSubmit({
					url:__ctxPath+ '/shhq/multiDelShBuilderApply.do',
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
					url:__ctxPath + '/shhq/multiDelShBuilderApply.do',
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
				//new ShBuilderApplyForm({
				//	applyId : record.data.applyId
				//}).show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ShBuilderApplyForm');
				if (aForm != null) {
					tabs.remove('ShBuilderApplyForm');
				}
				aForm = new ShBuilderApplyForm({applyId : record.data.applyId});
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
