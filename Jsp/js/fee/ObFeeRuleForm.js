/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class ObFeeRuleForm
 * @extends Ext.Window
 * @description ObFeeRule表单
 * @company 优创融联科技
 */
ObFeeRuleForm = Ext.extend(Ext.Panel, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				ObFeeRuleForm.superclass.constructor.call(this, {
							id : 'ObFeeRuleFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[ObFeeRule]详细信息',
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
							//id : 'ObFeeRuleForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'obFeeRule.feeRuleId',
								xtype : 'hidden',
								value : this.feeRuleId == null ? '' : this.feeRuleId
							}
																																																								
														
							,{  
							    																			fieldLabel : '内码',	
									 																			hiddenName : 'obFeeRule.feeIndexProjectId'
																		 																		        											,xtype:'combo'
											,editabel : false
											,lazyInit : false
											,triggerAction : 'all'
											,store : new Ext.data.SimpleStore( {
												autoLoad : true,
												url : __ctxPath + '/fee/listfeeIndexProjectId.do',
												fields : [ 'feeIndexProjectId', 'feeIndexProjectIdName' ],
												listeners : {
													load : function() {
														var combo = Ext.getCmp('feeIndexProjectId');
														var store = combo.getStore();
														var rows = [];//定义数组
														for(var i=0;i<store.getCount();i++){ //store.getCount()为store的长度
															if(store.getAt(i).data['feeIndexProjectId']==combo.getValue()){
																combo.setValue(store.getAt(i).data['feeIndexProjectIdName']);
																break;
															}
														}
													}
												}
											})
											,displayField : 'feeIndexProjectIdName'
											,valueField : 'feeIndexProjectId'
											,id : 'feeIndexProjectId'
																				 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '规则名',	
									 																			name : 'obFeeRule.ruleName'
																		 																			 										,maxLength: 120
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '有效时间',	
									 																			name : 'obFeeRule.effectiveTime'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '失效时间',	
									 																			name : 'obFeeRule.failureTime'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '计算方式',	
									 																			name : 'obFeeRule.calculationWay'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '计算方法',	
									 																			name : 'obFeeRule.calculationMethod'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																										 							
																																										 							
																																										 							
																																										 							
																																																	
														
							,{  
							    																			fieldLabel : '备注',	
									 																			name : 'obFeeRule.comments'
																		 																			 										,maxLength: 255
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '状态',	
									 																			name : 'obFeeRule.staId'
																												,allowBlank:false
									 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																			]
						});
				//加载表单对应的数据	
				if (this.feeRuleId != null && this.feeRuleId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/fee/getObFeeRule.do?feeRuleId='+ this.feeRuleId,
								root : 'data',
								preName : 'obFeeRule'
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
						url:__ctxPath + '/fee/saveObFeeRule.do',
						msgSuccess : '成功删除该记录！',
						msgFailure : '操作出错，请联系管理员！',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('ObFeeRuleGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});