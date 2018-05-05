/**
 * @author:cf0666@gmail.com
 * @class ScBizOrderStockView
 * @extends Ext.Panel
 * @description [ScBizOrderStock]管理
 * @company 优创融联科技
 * @createtime:
 */
ScBizOrderStockView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				ScBizOrderStockView.superclass.constructor.call(this, {
							id : 'ScBizOrderStockViewWin',
							title : '[ScBizOrderStock]管理',
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
							var fieldnameComboData=[
																				 																																		[
											'bizOrderType',
											'业务单类型：&CON_T_BO_TYPE',
																																																					new Ext.form.NumberField({name : 'bizOrderType',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'bizOrderDispName',
											'业务单显示名称',
																								new Ext.form.TextField({name : 'bizOrderDispName',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'alertTime',
											'预警时间',
																								new Ext.form.DateField({hiddenName : 'alertTime',format : 'Y-m-d'})
																						 ]
																				,
																			 								 																																		[
											'masterBizOrderId',
											'主业务单内码',
																																																					new Ext.form.NumberField({name : 'masterBizOrderId',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'totalOutAmount',
											'应支出总费用',
																																																					new Ext.form.NumberField({name : 'totalOutAmount',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'totalInAmount',
											'应收入总费用',
																																																					new Ext.form.NumberField({name : 'totalInAmount',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'totalCount',
											'应发生总数量',
																																																					new Ext.form.NumberField({name : 'totalCount',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'createUserId',
											'创建用户内码',
																																																					new Ext.form.NumberField({name : 'createUserId',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'factTotalOutAmount',
											'已支出总费用',
																																																					new Ext.form.NumberField({name : 'factTotalOutAmount',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'factTotalInAmount',
											'已收入总费用',
																																																					new Ext.form.NumberField({name : 'factTotalInAmount',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'factTotalCount',
											'已发生数量',
																																																					new Ext.form.NumberField({name : 'factTotalCount',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'planOutAmount',
											'计划支出总费用',
																																																					new Ext.form.NumberField({name : 'planOutAmount',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'planInAmount',
											'计划收入总费用',
																																																					new Ext.form.NumberField({name : 'planInAmount',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'createTime',
											'生成时间',
																								new Ext.form.DateField({hiddenName : 'createTime',format : 'Y-m-d'})
																						 ]
																				,
																			 								 																																		[
											'approvedUserId',
											'审批用户内码',
																																																					new Ext.form.NumberField({name : 'approvedUserId',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'updateTime',
											'更新时间',
																								new Ext.form.DateField({hiddenName : 'updateTime',format : 'Y-m-d'})
																						 ]
																				,
																			 								 																																		[
											'createDeptId',
											'创建用户部门内码',
																																																					new Ext.form.NumberField({name : 'createDeptId',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'salesUserId',
											'销售用户内码',
																																																					new Ext.form.NumberField({name : 'salesUserId',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'salesDeptId',
											'销售用户部门内码',
																																																					new Ext.form.NumberField({name : 'salesDeptId',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'custContPerson',
											'客户联系人',
																								new Ext.form.TextField({name : 'custContPerson',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'custContPhone',
											'客户联系电话',
																								new Ext.form.TextField({name : 'custContPhone',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'finishTime',
											'结束时间',
																								new Ext.form.DateField({hiddenName : 'finishTime',format : 'Y-m-d'})
																						 ]
																				,
																			 								 																																		[
											'custId',
											'客户内码',
																																																					new Ext.form.NumberField({name : 'custId',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'warehouseId',
											'仓库内码',
																																																					new Ext.form.NumberField({name : 'warehouseId',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'bizOrderRelationType',
											'业务单关联类型',
																								new Ext.form.TextField({name : 'bizOrderRelationType',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'bizOrderDesc',
											'业务单描述',
																								new Ext.form.TextField({name : 'bizOrderDesc',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'bizOrderStatus',
											'业务单状态0--已生成、1--审核中、2--执行中、3--完成、4--回退中、5--注销、6--关闭&CON_T_BO_STATUS',
																																																					new Ext.form.NumberField({name : 'bizOrderStatus',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'bizOrderSubStatus',
											'业务单子状态0--未付款、1--已付款、2--部分付款、3--正在入库、4--已收货等&CON_T_BO_SUB_STATUS',
																																																					new Ext.form.NumberField({name : 'bizOrderSubStatus',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'stockModelType',
											'库存模式&CON_T_STOCK_MODEL',
																																																					new Ext.form.NumberField({name : 'stockModelType',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'desc',
											'备注',
																								new Ext.form.TextField({name : 'desc',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'ext1',
											'扩展1',
																								new Ext.form.TextField({name : 'ext1',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'ext2',
											'扩展2',
																								new Ext.form.TextField({name : 'ext2',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'ext3',
											'扩展3',
																								new Ext.form.TextField({name : 'ext3',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'ext4',
											'扩展4',
																								new Ext.form.TextField({name : 'ext4',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'ext5',
											'扩展5',
																								new Ext.form.TextField({name : 'ext5',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'ext6',
											'扩展6',
																								new Ext.form.TextField({name : 'ext6',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'ext7',
											'扩展7',
																								new Ext.form.TextField({name : 'ext7',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'ext8',
											'扩展8',
																								new Ext.form.TextField({name : 'ext8',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'ext9',
											'扩展9',
																								new Ext.form.TextField({name : 'ext9',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'ext10',
											'扩展10',
																								new Ext.form.TextField({name : 'ext10',allowBlank:true})
																						 ]
																				,
																			 								 																																		[
											'ext11',
											'扩展11',
																																																					new Ext.form.NumberField({name : 'ext11',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'ext12',
											'扩展12',
																																																					new Ext.form.NumberField({name : 'ext12',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'ext13',
											'扩展13',
																																																					new Ext.form.NumberField({name : 'ext13',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'ext14',
											'扩展14',
																																																					new Ext.form.NumberField({name : 'ext14',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'ext15',
											'扩展15',
																																																					new Ext.form.NumberField({name : 'ext15',allowBlank:true})
																																																	 ]
																				,
																			 								 																																		[
											'ext16',
											'扩展16',
																								new Ext.form.DateField({hiddenName : 'ext16',format : 'Y-m-d'})
																						 ]
																				,
																			 								 																																		[
											'ext17',
											'扩展17',
																								new Ext.form.DateField({hiddenName : 'ext17',format : 'Y-m-d'})
																						 ]
																				,
																			 								 																																		[
											'ext18',
											'扩展18',
																								new Ext.form.DateField({hiddenName : 'ext18',format : 'Y-m-d'})
																						 ]
																				,
																			 								 																																		[
											'ext19',
											'扩展19',
																								new Ext.form.DateField({hiddenName : 'ext19',format : 'Y-m-d'})
																						 ]
																				,
																			 								 																																		[
											'ext20',
											'扩展20',
																								new Ext.form.DateField({hiddenName : 'ext20',format : 'Y-m-d'})
																						 ]
																			 								 							 											]
				var ScBizOrderStockAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : '[ScBizOrderStock]高级查询',
					fieldData : fieldnameComboData
				});
								// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'ScBizOrderStockSearchPanel',
							height : 35,
													items:[
																						 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_bizOrderType_SN_EQ',
																																																																													xtype : 'mtdiccombo',
															editable : true,
															lazyInit : false,
															forceSelection : false,
															itemKey : 'CON_T_BO_TYPE'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_bizOrderDispName_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_alertTime_D_EQ',
																																																xtype:'datefield',
													format:'Y-m-d'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_masterBizOrderId_L_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_totalOutAmount_S_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_totalInAmount_S_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_totalCount_S_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_createUserId_L_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_factTotalOutAmount_S_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_factTotalInAmount_S_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_factTotalCount_S_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_planOutAmount_S_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_planInAmount_S_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_createTime_D_EQ',
																																																xtype:'datefield',
													format:'Y-m-d'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_approvedUserId_L_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_updateTime_D_EQ',
																																																xtype:'datefield',
													format:'Y-m-d'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_createDeptId_L_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_salesUserId_L_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_salesDeptId_L_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_custContPerson_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_custContPhone_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_finishTime_D_EQ',
																																																xtype:'datefield',
													format:'Y-m-d'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_custId_L_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_warehouseId_L_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_bizOrderRelationType_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_bizOrderDesc_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_bizOrderStatus_SN_EQ',
																																																																													xtype : 'mtdiccombo',
															editable : true,
															lazyInit : false,
															forceSelection : false,
															itemKey : 'CON_T_BO_STATUS'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_bizOrderSubStatus_SN_EQ',
																																																																													xtype : 'mtdiccombo',
															editable : true,
															lazyInit : false,
															forceSelection : false,
															itemKey : 'CON_T_BO_SUB_STATUS'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				hiddenName : 'Q_stockModelType_SN_EQ',
																																																																													xtype : 'mtdiccombo',
															editable : true,
															lazyInit : false,
															forceSelection : false,
															itemKey : 'CON_T_STOCK_MODEL'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_desc_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_ext1_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_ext2_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_ext3_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_ext4_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_ext5_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_ext6_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_ext7_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_ext8_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_ext9_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_ext10_S_EQ',
																																																xtype : 'textfield'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_ext11_S_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_ext12_S_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_ext13_S_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_ext14_S_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_ext15_S_EQ',
																																																																													xtype:'numberfield'
																																																												}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_ext16_D_EQ',
																																																xtype:'datefield',
													format:'Y-m-d'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_ext17_D_EQ',
																																																xtype:'datefield',
													format:'Y-m-d'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_ext18_D_EQ',
																																																xtype:'datefield',
													format:'Y-m-d'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_ext19_D_EQ',
																																																xtype:'datefield',
													format:'Y-m-d'
																																	}
																				,
																			 								 																																												 										{
																																																													
																						
																																				name : 'Q_ext20_D_EQ',
																																																xtype:'datefield',
													format:'Y-m-d'
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
										handler :function(){ new ScBizOrderStockAdvancedSearchWin().show();}
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
									//text : __create+'[ScBizOrderStock]',
									text : __create,
									xtype : 'button',
									scope : this,
									handler : this.createRs
								}, {
									iconCls : 'btn-del',
									//text : __delete+'[ScBizOrderStock]',
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
					id:'ScBizOrderStockGrid',
					url : __ctxPath + "/stock/listScBizOrderStock.do",
					fields : [{
									name : 'bizOrderId',
									type : 'int'
								}
																																																																			,'bizOrderType'
																																																																								,'bizOrderDispName'
																																																																								,'alertTime'
																																																																								,'masterBizOrderId'
																																																																								,'totalOutAmount'
																																																																								,'totalInAmount'
																																																																								,'totalCount'
																																																																								,'createUserId'
																																																																								,'factTotalOutAmount'
																																																																								,'factTotalInAmount'
																																																																								,'factTotalCount'
																																																																								,'planOutAmount'
																																																																								,'planInAmount'
																																																																								,'createTime'
																																																																								,'approvedUserId'
																																																																								,'updateTime'
																																																																								,'createDeptId'
																																																																								,'salesUserId'
																																																																								,'salesDeptId'
																																																																								,'custContPerson'
																																																																								,'custContPhone'
																																																																								,'finishTime'
																																																																								,'custId'
																																																																								,'warehouseId'
																																																																								,'bizOrderRelationType'
																																																																								,'bizOrderDesc'
																																																																								,'bizOrderStatus'
																																																																								,'bizOrderSubStatus'
																																																																								,'stockModelType'
																																																																								,'desc'
																																																																								,'ext1'
																																																																								,'ext2'
																																																																								,'ext3'
																																																																								,'ext4'
																																																																								,'ext5'
																																																																								,'ext6'
																																																																								,'ext7'
																																																																								,'ext8'
																																																																								,'ext9'
																																																																								,'ext10'
																																																																								,'ext11'
																																																																								,'ext12'
																																																																								,'ext13'
																																																																								,'ext14'
																																																																								,'ext15'
																																																																								,'ext16'
																																																																								,'ext17'
																																																																								,'ext18'
																																																																								,'ext19'
																																																																								,'ext20'
																																																],
					columns:[
								{
									header : 'bizOrderId',
									dataIndex : 'bizOrderId',
									hidden : true
								}
																																																								,{
																	header : '业务单类型：&CON_T_BO_TYPE',
																isExp : false,
																
																	dataIndex : 'bizOrderType',
									renderer : function(value) {
										return CON_T_BO_TYPE.get(value);
									}
																}
																																																,{
																	header : '业务单显示名称',
																isExp : false,
																
																	dataIndex : 'bizOrderDispName'
																}
																																																,{
																	header : '预警时间',
																isExp : false,
																
																	dataIndex : 'alertTime'
																}
																																																,{
																	header : '主业务单内码',
																isExp : false,
																
																	dataIndex : 'masterBizOrderId'
																}
																																																,{
																	header : '应支出总费用',
																isExp : false,
																
																	dataIndex : 'totalOutAmount'
																}
																																																,{
																	header : '应收入总费用',
																isExp : false,
																
																	dataIndex : 'totalInAmount'
																}
																																																,{
																	header : '应发生总数量',
																isExp : false,
																
																	dataIndex : 'totalCount'
																}
																																																,{
																	header : '创建用户内码',
																isExp : false,
																
																	dataIndex : 'createUserId'
																}
																																																,{
																	header : '已支出总费用',
																isExp : false,
																
																	dataIndex : 'factTotalOutAmount'
																}
																																																,{
																	header : '已收入总费用',
																isExp : false,
																
																	dataIndex : 'factTotalInAmount'
																}
																																																,{
																	header : '已发生数量',
																isExp : false,
																
																	dataIndex : 'factTotalCount'
																}
																																																,{
																	header : '计划支出总费用',
																isExp : false,
																
																	dataIndex : 'planOutAmount'
																}
																																																,{
																	header : '计划收入总费用',
																isExp : false,
																
																	dataIndex : 'planInAmount'
																}
																																																,{
																	header : '生成时间',
																isExp : false,
																
																	dataIndex : 'createTime'
																}
																																																,{
																	header : '审批用户内码',
																isExp : false,
																
																	dataIndex : 'approvedUserId'
																}
																																																,{
																	header : '更新时间',
																isExp : false,
																
																	dataIndex : 'updateTime'
																}
																																																,{
																	header : '创建用户部门内码',
																isExp : false,
																
																	dataIndex : 'createDeptId'
																}
																																																,{
																	header : '销售用户内码',
																isExp : false,
																
																	dataIndex : 'salesUserId'
																}
																																																,{
																	header : '销售用户部门内码',
																isExp : false,
																
																	dataIndex : 'salesDeptId'
																}
																																																,{
																	header : '客户联系人',
																isExp : false,
																
																	dataIndex : 'custContPerson'
																}
																																																,{
																	header : '客户联系电话',
																isExp : false,
																
																	dataIndex : 'custContPhone'
																}
																																																,{
																	header : '结束时间',
																isExp : false,
																
																	dataIndex : 'finishTime'
																}
																																																,{
																	header : '客户内码',
																isExp : false,
																
																	dataIndex : 'custId'
																}
																																																,{
																	header : '仓库内码',
																isExp : false,
																
																	dataIndex : 'warehouseId'
																}
																																																,{
																	header : '业务单关联类型',
																isExp : false,
																
																	dataIndex : 'bizOrderRelationType'
																}
																																																,{
																	header : '业务单描述',
																isExp : false,
																
																	dataIndex : 'bizOrderDesc'
																}
																																																,{
																	header : '业务单状态0--已生成、1--审核中、2--执行中、3--完成、4--回退中、5--注销、6--关闭&CON_T_BO_STATUS',
																isExp : false,
																
																	dataIndex : 'bizOrderStatus',
									renderer : function(value) {
										return CON_T_BO_STATUS.get(value);
									}
																}
																																																,{
																	header : '业务单子状态0--未付款、1--已付款、2--部分付款、3--正在入库、4--已收货等&CON_T_BO_SUB_STATUS',
																isExp : false,
																
																	dataIndex : 'bizOrderSubStatus',
									renderer : function(value) {
										return CON_T_BO_SUB_STATUS.get(value);
									}
																}
																																																,{
																	header : '库存模式&CON_T_STOCK_MODEL',
																isExp : false,
																
																	dataIndex : 'stockModelType',
									renderer : function(value) {
										return CON_T_STOCK_MODEL.get(value);
									}
																}
																																																,{
																	header : '备注',
																isExp : false,
																
																	dataIndex : 'desc'
																}
																																																,{
																	header : '扩展1',
																isExp : false,
																
																	dataIndex : 'ext1'
																}
																																																,{
																	header : '扩展2',
																isExp : false,
																
																	dataIndex : 'ext2'
																}
																																																,{
																	header : '扩展3',
																isExp : false,
																
																	dataIndex : 'ext3'
																}
																																																,{
																	header : '扩展4',
																isExp : false,
																
																	dataIndex : 'ext4'
																}
																																																,{
																	header : '扩展5',
																isExp : false,
																
																	dataIndex : 'ext5'
																}
																																																,{
																	header : '扩展6',
																isExp : false,
																
																	dataIndex : 'ext6'
																}
																																																,{
																	header : '扩展7',
																isExp : false,
																
																	dataIndex : 'ext7'
																}
																																																,{
																	header : '扩展8',
																isExp : false,
																
																	dataIndex : 'ext8'
																}
																																																,{
																	header : '扩展9',
																isExp : false,
																
																	dataIndex : 'ext9'
																}
																																																,{
																	header : '扩展10',
																isExp : false,
																
																	dataIndex : 'ext10'
																}
																																																,{
																	header : '扩展11',
																isExp : false,
																
																	dataIndex : 'ext11'
																}
																																																,{
																	header : '扩展12',
																isExp : false,
																
																	dataIndex : 'ext12'
																}
																																																,{
																	header : '扩展13',
																isExp : false,
																
																	dataIndex : 'ext13'
																}
																																																,{
																	header : '扩展14',
																isExp : false,
																
																	dataIndex : 'ext14'
																}
																																																,{
																	header : '扩展15',
																isExp : false,
																
																	dataIndex : 'ext15'
																}
																																																,{
																	header : '扩展16',
																isExp : false,
																
																	dataIndex : 'ext16'
																}
																																																,{
																	header : '扩展17',
																isExp : false,
																
																	dataIndex : 'ext17'
																}
																																																,{
																	header : '扩展18',
																isExp : false,
																
																	dataIndex : 'ext18'
																}
																																																,{
																	header : '扩展19',
																isExp : false,
																
																	dataIndex : 'ext19'
																}
																																																,{
																	header : '扩展20',
																isExp : false,
																
																	dataIndex : 'ext20'
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
//				var searchPanel = Ext.getCmp('ScBizOrderStockSearchPanel');
//				var gridPanel = Ext.getCmp('ScBizOrderStockGrid');
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
					new ScBizOrderStockForm({bizOrderId:rec.data.bizOrderId}).show();
				});
			},
			//创建记录
			createRs : function() {
				//new ScBizOrderStockForm().show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ScBizOrderStockForm');
				if (aForm != null) {
					tabs.remove('ScBizOrderStockForm');
				}
				aForm = new ScBizOrderStockForm();
				tabs.add(aForm);
				tabs.activate(aForm);

			},
			//按ID删除记录
			removeRs : function(id) {
				$postSubmit({
					url:__ctxPath+ '/stock/multiDelScBizOrderStock.do',
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
					url:__ctxPath + '/stock/multiDelScBizOrderStock.do',
					grid:this.gridPanel,
					idName:'bizOrderId',
					msgNull : '请选择要删除的记录！',
					msgTip : '您确认要删除所选记录吗？',
					msgSuccess : '成功删除该记录！',
					msgFailure : '操作出错，请联系管理员！'
				});
			},
			//编辑Rs
			editRs : function(record) {
				//new ScBizOrderStockForm({
				//	bizOrderId : record.data.bizOrderId
				//}).show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ScBizOrderStockForm');
				if (aForm != null) {
					tabs.remove('ScBizOrderStockForm');
				}
				aForm = new ScBizOrderStockForm({bizOrderId : record.data.bizOrderId});
				tabs.add(aForm);
				tabs.activate(aForm);
			},
			//行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this,record.data.bizOrderId);
						break;
					case 'btn-edit' :
						this.editRs.call(this,record);
						break;
					default :
						break;
				}
			}
});
