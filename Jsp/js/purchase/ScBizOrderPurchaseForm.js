/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class ScBizOrderPurchaseForm
 * @extends Ext.Window
 * @description ScBizOrderPurchase表单
 * @company 优创融联科技
 */
ScBizOrderPurchaseForm = Ext.extend(Ext.Panel, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				ScBizOrderPurchaseForm.superclass.constructor.call(this, {
							id : 'ScBizOrderPurchaseFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[ScBizOrderPurchase]详细信息',
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
							//id : 'ScBizOrderPurchaseForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'scBizOrderPurchase.bizOrderId',
								xtype : 'hidden',
								value : this.bizOrderId == null ? '' : this.bizOrderId
							}
																																																								
														
							,{  
							    																			fieldLabel : '业务单类型：&CON_T_BO_TYPE',	
									 																			hiddenName : 'scBizOrderPurchase.bizOrderType'
																		 																		        																									,xtype : 'mtdiccombo'
													,editable : true
													,lazyInit : false
													,forceSelection : false
													,itemKey : 'CON_T_BO_TYPE'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '业务单显示名称',	
									 																			name : 'scBizOrderPurchase.bizOrderDispName'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 500
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '预警时间',	
									 																			name : 'scBizOrderPurchase.alertTime'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '主业务单内码',	
									 																			name : 'scBizOrderPurchase.masterBizOrderId'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '应支出总费用',	
									 																			name : 'scBizOrderPurchase.totalOutAmount'
																												,allowBlank:false
									 									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '应收入总费用',	
									 																			name : 'scBizOrderPurchase.totalInAmount'
																												,allowBlank:false
									 									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '应发生总数量',	
									 																			name : 'scBizOrderPurchase.totalCount'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '创建用户内码',	
									 																			name : 'scBizOrderPurchase.createUserId'
																												,allowBlank:false
									 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '已支出总费用',	
									 																			name : 'scBizOrderPurchase.factTotalOutAmount'
																												,allowBlank:false
									 									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '已收入总费用',	
									 																			name : 'scBizOrderPurchase.factTotalInAmount'
																												,allowBlank:false
									 									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '已发生数量',	
									 																			name : 'scBizOrderPurchase.factTotalCount'
																												,allowBlank:false
									 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '计划支出总费用',	
									 																			name : 'scBizOrderPurchase.planOutAmount'
																		 									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '计划收入总费用',	
									 																			name : 'scBizOrderPurchase.planInAmount'
																		 									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '生成时间',	
									 																			name : 'scBizOrderPurchase.createTime'
																												,allowBlank:false
									 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '审批用户内码',	
									 																			name : 'scBizOrderPurchase.approvedUserId'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '更新时间',	
									 																			name : 'scBizOrderPurchase.updateTime'
																												,allowBlank:false
									 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '创建用户部门内码',	
									 																			name : 'scBizOrderPurchase.createDeptId'
																		 																			 										,maxLength: 8
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '采购用户内码',	
									 																			name : 'scBizOrderPurchase.purUserId'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '采购用户部门内码',	
									 																			name : 'scBizOrderPurchase.purDeptId'
																		 																			 										,maxLength: 8
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '客户联系人',	
									 																			name : 'scBizOrderPurchase.custContPerson'
																		 																			 										,maxLength: 60
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '客户联系电话',	
									 																			name : 'scBizOrderPurchase.custContPhone'
																		 																			 										,maxLength: 20
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '结束时间',	
									 																			name : 'scBizOrderPurchase.finishTime'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '客户内码',	
									 																			name : 'scBizOrderPurchase.custId'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '仓库内码',	
									 																			name : 'scBizOrderPurchase.warehouseId'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '业务单关联类型',	
									 																			name : 'scBizOrderPurchase.bizOrderRelationType'
																		 																			 										,maxLength: 60
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '业务单描述',	
									 																			name : 'scBizOrderPurchase.bizOrderDesc'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 500
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '折前小计',	
									 																			name : 'scBizOrderPurchase.discountForeSubtotal'
																		 									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '折扣',	
									 																			name : 'scBizOrderPurchase.discount'
																		 																			 										,maxLength: 8
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '增减款',	
									 																			name : 'scBizOrderPurchase.changedAmount'
																		 									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '折后小计',	
									 																			name : 'scBizOrderPurchase.discountAfterSubtotal'
																		 									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '采购模式：0--买断模式，1--铺货代销模式&CON_T_PUR_MODEL',	
									 																			hiddenName : 'scBizOrderPurchase.purchaseModelType'
																		 																		        																									,xtype : 'mtdiccombo'
													,editable : true
													,lazyInit : false
													,forceSelection : false
													,itemKey : 'CON_T_PUR_MODEL'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '业务单状态0--已生成、1--审核中、2--执行中、3--完成、4--回退中、5--注销、6--关闭&CON_T_BO_STATUS',	
									 																			hiddenName : 'scBizOrderPurchase.bizOrderStatus'
																		 																		        																									,xtype : 'mtdiccombo'
													,editable : true
													,lazyInit : false
													,forceSelection : false
													,itemKey : 'CON_T_BO_STATUS'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '业务单子状态0--未付款、1--已付款、2--部分付款、3--正在入库、4--已收货等&CON_T_BO_SUB_STATUS',	
									 																			hiddenName : 'scBizOrderPurchase.bizOrderSubStatus'
																												,allowBlank:false
									 																		        																									,xtype : 'mtdiccombo'
													,editable : true
													,lazyInit : false
													,forceSelection : false
													,itemKey : 'CON_T_BO_SUB_STATUS'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '备注',	
									 																			name : 'scBizOrderPurchase.desc'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 500
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展1',	
									 																			name : 'scBizOrderPurchase.ext1'
																		 																			 										,maxLength: 60
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展2',	
									 																			name : 'scBizOrderPurchase.ext2'
																		 																			 										,maxLength: 60
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展3',	
									 																			name : 'scBizOrderPurchase.ext3'
																		 																			 										,maxLength: 60
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展4',	
									 																			name : 'scBizOrderPurchase.ext4'
																		 																			 										,maxLength: 60
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展5',	
									 																			name : 'scBizOrderPurchase.ext5'
																		 																			 										,maxLength: 60
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展6',	
									 																			name : 'scBizOrderPurchase.ext6'
																		 																			 										,maxLength: 60
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展7',	
									 																			name : 'scBizOrderPurchase.ext7'
																		 																			 										,maxLength: 60
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展8',	
									 																			name : 'scBizOrderPurchase.ext8'
																		 																			 										,maxLength: 60
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展9',	
									 																			name : 'scBizOrderPurchase.ext9'
																		 																			 										,maxLength: 60
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展10',	
									 																			name : 'scBizOrderPurchase.ext10'
																		 																			 										,maxLength: 60
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展11',	
									 																			name : 'scBizOrderPurchase.ext11'
																		 									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展12',	
									 																			name : 'scBizOrderPurchase.ext12'
																		 									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展13',	
									 																			name : 'scBizOrderPurchase.ext13'
																		 									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展14',	
									 																			name : 'scBizOrderPurchase.ext14'
																		 									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展15',	
									 																			name : 'scBizOrderPurchase.ext15'
																		 									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展16',	
									 																			name : 'scBizOrderPurchase.ext16'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展17',	
									 																			name : 'scBizOrderPurchase.ext17'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展18',	
									 																			name : 'scBizOrderPurchase.ext18'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展19',	
									 																			name : 'scBizOrderPurchase.ext19'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展20',	
									 																			name : 'scBizOrderPurchase.ext20'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																			]
						});
				//加载表单对应的数据	
				if (this.bizOrderId != null && this.bizOrderId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/purchase/getScBizOrderPurchase.do?bizOrderId='+ this.bizOrderId,
								root : 'data',
								preName : 'scBizOrderPurchase'
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
						url:__ctxPath + '/purchase/saveScBizOrderPurchase.do',
						msgSuccess : '成功删除该记录！',
						msgFailure : '操作出错，请联系管理员！',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('ScBizOrderPurchaseGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});