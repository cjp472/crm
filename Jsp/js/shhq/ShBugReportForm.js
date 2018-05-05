/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class ShBugReportForm
 * @extends Ext.Window
 * @description ShBugReport表单
 * @company 优创融联科技
 */
ShBugReportForm = Ext.extend(Ext.Panel, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				ShBugReportForm.superclass.constructor.call(this, {
							id : 'ShBugReportFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[ShBugReport]详细信息',
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
							//id : 'ShBugReportForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'shBugReport.applyId',
								xtype : 'hidden',
								value : this.applyId == null ? '' : this.applyId
							}
																																																								
														
							,{  
							    																			fieldLabel : '所在单位',	
									 																			name : 'shBugReport.applyDepid'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '报修电话',	
									 																			name : 'shBugReport.reportPhone'
																		 																			 										,maxLength: 60
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '故障来源',	
									 																			name : 'shBugReport.bugResource'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '故障地点',	
									 																			name : 'shBugReport.bugAddress'
																		 																			 										,maxLength: 128
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '故障时间',	
									 																			name : 'shBugReport.bugTime'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '故障性质',	
									 																			name : 'shBugReport.bugProperties'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '故障分类',	
									 																			name : 'shBugReport.bugType'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '影响范围',	
									 																			name : 'shBugReport.effectArear'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '故障描述',	
									 																			name : 'shBugReport.bugDesc'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 500
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '紧急程度',	
									 																			name : 'shBugReport.urgencyLevel'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '故障优先级',	
									 																			name : 'shBugReport.bugPriority'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '登记人',	
									 																			name : 'shBugReport.registerPerson'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '登记时间',	
									 																			name : 'shBugReport.registerTime'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '创建人',	
									 																			name : 'shBugReport.creUserid'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '负责部门',	
									 																			name : 'shBugReport.perDepid'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '故障设备',	
									 																			name : 'shBugReport.bugFacility'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 500
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '报修人',	
									 																			name : 'shBugReport.applyUserid'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '备注',	
									 																			name : 'shBugReport.applyComment'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 500
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '编号',	
									 																			name : 'shBugReport.code'
																		 																			 										,maxLength: 60
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '负责人',	
									 																			name : 'shBugReport.perIncharge'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '状态',	
									 																			name : 'shBugReport.applyStatus'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : 'RUNID',	
									 																			name : 'shBugReport.runid'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																										 							
																																										 							
																																										 							
																																																	
														
							,{  
							    																			fieldLabel : '审批节点名称',	
									 																			name : 'shBugReport.nodeName'
																		 																			 										,maxLength: 30
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '审批状态',	
									 																			name : 'shBugReport.approvalStatus'
																		 																			 										,maxLength: 30
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '客户满意度',	
									 																			name : 'shBugReport.cusSatisDegree'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '用户反馈信息',	
									 																			name : 'shBugReport.cusFeebackInfo'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																			]
						});
				//加载表单对应的数据	
				if (this.applyId != null && this.applyId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/shhq/getShBugReport.do?applyId='+ this.applyId,
								root : 'data',
								preName : 'shBugReport'
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
						url:__ctxPath + '/shhq/saveShBugReport.do',
						msgSuccess : '成功删除该记录！',
						msgFailure : '操作出错，请联系管理员！',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('ShBugReportGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});