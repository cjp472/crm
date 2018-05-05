/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class ScBizOrderFeeForm
 * @extends Ext.Window
 * @description ScBizOrderFee表单
 * @company 优创融联科技
 */
ScBizOrderFeeForm = Ext.extend(Ext.Panel, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				ScBizOrderFeeForm.superclass.constructor.call(this, {
							id : 'ScBizOrderFeeFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[ScBizOrderFee]详细信息',
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
							//id : 'ScBizOrderFeeForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'scBizOrderFee.bizOrderFeeInst',
								xtype : 'hidden',
								value : this.bizOrderFeeInst == null ? '' : this.bizOrderFeeInst
							}
																																																								
														
							,{  
							    																			fieldLabel : '商品内码',	
									 																			name : 'scBizOrderFee.goodsId'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '业务单内码',	
									 																			name : 'scBizOrderFee.bizOrderId'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '业务单费用类型',	
									 																			name : 'scBizOrderFee.bizOrderFeeType'
																												,allowBlank:false
									 																			 										,maxLength: 60
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '费用标志0-现金、1-银行转帐、2-代金券、3-供货商抵用金&CON_T_FEE_FLAG',	
									 																			hiddenName : 'scBizOrderFee.feeFlag'
																												,allowBlank:false
									 																		        																									,xtype : 'mtdiccombo'
													,editable : true
													,lazyInit : false
													,forceSelection : false
													,itemKey : 'CON_T_FEE_FLAG'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '参与计算标志-1--减、0--不参与计算、1--增&CON_T_SUM_FLAG',	
									 																			hiddenName : 'scBizOrderFee.sumFlag'
																												,allowBlank:false
									 																		        																									,xtype : 'mtdiccombo'
													,editable : true
													,lazyInit : false
													,forceSelection : false
													,itemKey : 'CON_T_SUM_FLAG'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '操作员标识',	
									 																			name : 'scBizOrderFee.optUserId'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '凭证流水号',	
									 																			name : 'scBizOrderFee.bankTransferReceiptNumber'
																		 																			 										,maxLength: 60
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '公私标识：0--对私、1--对公&CON_T_BP_FLAG',	
									 																			hiddenName : 'scBizOrderFee.businessPersonalFlag'
																		 																		        																									,xtype : 'mtdiccombo'
													,editable : true
													,lazyInit : false
													,forceSelection : false
													,itemKey : 'CON_T_BP_FLAG'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '它方银行名称',	
									 																			name : 'scBizOrderFee.extBankName'
																		 																			 										,maxLength: 60
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '它方银行账号',	
									 																			name : 'scBizOrderFee.extBankAcct'
																		 																			 										,maxLength: 60
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '凭证附件集如果有多个附件，则用逗号分割',	
									 																			name : 'scBizOrderFee.receiptSet'
																		 																			 										,maxLength: 200
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '发生金额-为减、+为增',	
									 																			name : 'scBizOrderFee.changedAmount'
																												,allowBlank:false
									 									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '发生时间',	
									 																			name : 'scBizOrderFee.changedTime'
																												,allowBlank:false
									 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '状态0-未完成、1-已完成、2-已取消&CON_T_FEE_STATUS',	
									 																			hiddenName : 'scBizOrderFee.status'
																												,allowBlank:false
									 																		        																									,xtype : 'mtdiccombo'
													,editable : true
													,lazyInit : false
													,forceSelection : false
													,itemKey : 'CON_T_FEE_STATUS'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '付款模式：0--小金额现付、1--打款、2--铺货代销&CON_T_PAY_MODEL',	
									 																			hiddenName : 'scBizOrderFee.payModelType'
																		 																		        																									,xtype : 'mtdiccombo'
													,editable : true
													,lazyInit : false
													,forceSelection : false
													,itemKey : 'CON_T_PAY_MODEL'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '创建人',	
									 																			name : 'scBizOrderFee.createUserId'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '创建时间',	
									 																			name : 'scBizOrderFee.createTime'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '修改人',	
									 																			name : 'scBizOrderFee.updateUserId'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '修改时间',	
									 																			name : 'scBizOrderFee.updateTime'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '备注',	
									 																			name : 'scBizOrderFee.desc'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 500
									 															}
							 							
																																			]
						});
				//加载表单对应的数据	
				if (this.bizOrderFeeInst != null && this.bizOrderFeeInst != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/supply/getScBizOrderFee.do?bizOrderFeeInst='+ this.bizOrderFeeInst,
								root : 'data',
								preName : 'scBizOrderFee'
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
						url:__ctxPath + '/supply/saveScBizOrderFee.do',
						msgSuccess : '成功删除该记录！',
						msgFailure : '操作出错，请联系管理员！',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('ScBizOrderFeeGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});