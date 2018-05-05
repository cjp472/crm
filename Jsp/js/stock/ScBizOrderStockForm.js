/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class ScBizOrderStockForm
 * @extends Ext.Window
 * @description ScBizOrderStock表单
 * @company 优创融联科技
 */
ScBizOrderStockForm = Ext.extend(Ext.Panel, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				ScBizOrderStockForm.superclass.constructor.call(this, {
							id : 'ScBizOrderStockFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[ScBizOrderStock]详细信息',
							buttonAlign : 'center',
							buttons : [
										{
											text : __save,
											iconCls : 'btn-save',
											scope : this,
											handler : this.save
										}, {
											text : __reset,
											iconCls : 'btn-reset',
											scope : this,
											handler : this.reset
										}, {
											text : __cancel,
											iconCls : 'btn-cancel',
											scope : this,
											handler : this.cancel
										}
							         ]
				});
			},//end of the constructor
			//初始化组件
			initUIComponents : function() {
				this.formPanel = new Ext.FormPanel({
							layout : 'form',
							bodyStyle : 'padding:10px',
							border : false,
							autoScroll:true,
							//id : 'ScBizOrderStockForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'scBizOrderStock.bizOrderId',
								xtype : 'hidden',
								value : this.bizOrderId == null ? '' : this.bizOrderId
							}
																																																								
														
							,{  
							    																			fieldLabel : '业务单类型：&CON_T_BO_TYPE',	
									 																			hiddenName : 'scBizOrderStock.bizOrderType'
																		 																		        																									,xtype : 'mtdiccombo'
													,editable : true
													,lazyInit : false
													,forceSelection : false
													,itemKey : 'CON_T_BO_TYPE'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '业务单显示名称',	
									 																			name : 'scBizOrderStock.bizOrderDispName'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 500
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '预警时间',	
									 																			name : 'scBizOrderStock.alertTime'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '主业务单内码',	
									 																			name : 'scBizOrderStock.masterBizOrderId'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '应支出总费用',	
									 																			name : 'scBizOrderStock.totalOutAmount'
																												,allowBlank:false
									 									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '应收入总费用',	
									 																			name : 'scBizOrderStock.totalInAmount'
																												,allowBlank:false
									 									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '应发生总数量',	
									 																			name : 'scBizOrderStock.totalCount'
																		 									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '创建用户内码',	
									 																			name : 'scBizOrderStock.createUserId'
																												,allowBlank:false
									 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '已支出总费用',	
									 																			name : 'scBizOrderStock.factTotalOutAmount'
																												,allowBlank:false
									 									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '已收入总费用',	
									 																			name : 'scBizOrderStock.factTotalInAmount'
																												,allowBlank:false
									 									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '已发生数量',	
									 																			name : 'scBizOrderStock.factTotalCount'
																												,allowBlank:false
									 									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '计划支出总费用',	
									 																			name : 'scBizOrderStock.planOutAmount'
																		 									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '计划收入总费用',	
									 																			name : 'scBizOrderStock.planInAmount'
																		 									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '生成时间',	
									 																			name : 'scBizOrderStock.createTime'
																												,allowBlank:false
									 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '审批用户内码',	
									 																			name : 'scBizOrderStock.approvedUserId'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '更新时间',	
									 																			name : 'scBizOrderStock.updateTime'
																												,allowBlank:false
									 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '创建用户部门内码',	
									 																			name : 'scBizOrderStock.createDeptId'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '销售用户内码',	
									 																			name : 'scBizOrderStock.salesUserId'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '销售用户部门内码',	
									 																			name : 'scBizOrderStock.salesDeptId'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '客户联系人',	
									 																			name : 'scBizOrderStock.custContPerson'
																		 																			 										,maxLength: 60
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '客户联系电话',	
									 																			name : 'scBizOrderStock.custContPhone'
																		 																			 										,maxLength: 20
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '结束时间',	
									 																			name : 'scBizOrderStock.finishTime'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '客户内码',	
									 																			name : 'scBizOrderStock.custId'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '仓库内码',	
									 																			name : 'scBizOrderStock.warehouseId'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '业务单关联类型',	
									 																			name : 'scBizOrderStock.bizOrderRelationType'
																		 																			 										,maxLength: 60
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '业务单描述',	
									 																			name : 'scBizOrderStock.bizOrderDesc'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 500
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '业务单状态0--已生成、1--审核中、2--执行中、3--完成、4--回退中、5--注销、6--关闭&CON_T_BO_STATUS',	
									 																			hiddenName : 'scBizOrderStock.bizOrderStatus'
																		 																		        																									,xtype : 'mtdiccombo'
													,editable : true
													,lazyInit : false
													,forceSelection : false
													,itemKey : 'CON_T_BO_STATUS'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '业务单子状态0--未付款、1--已付款、2--部分付款、3--正在入库、4--已收货等&CON_T_BO_SUB_STATUS',	
									 																			hiddenName : 'scBizOrderStock.bizOrderSubStatus'
																		 																		        																									,xtype : 'mtdiccombo'
													,editable : true
													,lazyInit : false
													,forceSelection : false
													,itemKey : 'CON_T_BO_SUB_STATUS'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '库存模式&CON_T_STOCK_MODEL',	
									 																			hiddenName : 'scBizOrderStock.stockModelType'
																		 																		        																									,xtype : 'mtdiccombo'
													,editable : true
													,lazyInit : false
													,forceSelection : false
													,itemKey : 'CON_T_STOCK_MODEL'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '备注',	
									 																			name : 'scBizOrderStock.desc'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 500
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展1',	
									 																			name : 'scBizOrderStock.ext1'
																		 																			 										,maxLength: 60
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展2',	
									 																			name : 'scBizOrderStock.ext2'
																		 																			 										,maxLength: 60
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展3',	
									 																			name : 'scBizOrderStock.ext3'
																		 																			 										,maxLength: 60
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展4',	
									 																			name : 'scBizOrderStock.ext4'
																		 																			 										,maxLength: 60
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展5',	
									 																			name : 'scBizOrderStock.ext5'
																		 																			 										,maxLength: 60
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展6',	
									 																			name : 'scBizOrderStock.ext6'
																		 																			 										,maxLength: 60
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展7',	
									 																			name : 'scBizOrderStock.ext7'
																		 																			 										,maxLength: 60
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展8',	
									 																			name : 'scBizOrderStock.ext8'
																		 																			 										,maxLength: 60
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展9',	
									 																			name : 'scBizOrderStock.ext9'
																		 																			 										,maxLength: 60
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展10',	
									 																			name : 'scBizOrderStock.ext10'
																		 																			 										,maxLength: 60
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展11',	
									 																			name : 'scBizOrderStock.ext11'
																		 									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展12',	
									 																			name : 'scBizOrderStock.ext12'
																		 									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展13',	
									 																			name : 'scBizOrderStock.ext13'
																		 									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展14',	
									 																			name : 'scBizOrderStock.ext14'
																		 									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展15',	
									 																			name : 'scBizOrderStock.ext15'
																		 									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展16',	
									 																			name : 'scBizOrderStock.ext16'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展17',	
									 																			name : 'scBizOrderStock.ext17'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展18',	
									 																			name : 'scBizOrderStock.ext18'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展19',	
									 																			name : 'scBizOrderStock.ext19'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展20',	
									 																			name : 'scBizOrderStock.ext20'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																			]
						});
				//加载表单对应的数据	
				if (this.bizOrderId != null && this.bizOrderId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/stock/getScBizOrderStock.do?bizOrderId='+ this.bizOrderId,
								root : 'data',
								preName : 'scBizOrderStock'
							});
				}
				
			},//end of the initcomponents

			/**
			 * 重置
			 * @param {} formPanel
			 */
			reset : function() {
				this.formPanel.getForm().reset();
			},
			/**
			 * 取消
			 * @param {} window
			 */
			cancel : function() {
				this.close();
			},
			/**
			 * 保存记录
			 */
			save : function() {
				$postSubForm({
						formPanel:this.formPanel,
						scope:this,
						url:__ctxPath + '/stock/saveScBizOrderStock.do',
						msgSuccess : '成功删除该记录！',
						msgFailure : '操作出错，请联系管理员！',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('ScBizOrderStockGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});