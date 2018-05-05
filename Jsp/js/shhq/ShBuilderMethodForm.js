/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class ShBuilderMethodForm
 * @extends Ext.Window
 * @description ShBuilderMethod表单
 * @company 优创融联科技
 */
ShBuilderMethodForm = Ext.extend(Ext.Panel, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				ShBuilderMethodForm.superclass.constructor.call(this, {
							id : 'ShBuilderMethodFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[ShBuilderMethod]详细信息',
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
							//id : 'ShBuilderMethodForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'shBuilderMethod.metdId',
								xtype : 'hidden',
								value : this.metdId == null ? '' : this.metdId
							}
																																																								
														
							,{  
							    																			fieldLabel : '施工类型',	
									 																			name : 'shBuilderMethod.buildType'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '申请说明',	
									 																			name : 'shBuilderMethod.applyContent'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 500
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '开始时间',	
									 																			name : 'shBuilderMethod.staDat'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '结束时间',	
									 																			name : 'shBuilderMethod.endDat'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '施工方',	
									 																			name : 'shBuilderMethod.buildPerson'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '施工部门',	
									 																			name : 'shBuilderMethod.buildDepid'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '负责人',	
									 																			name : 'shBuilderMethod.perIncharge'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '状态',	
									 																			name : 'shBuilderMethod.status'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : 'RUNID',	
									 																			name : 'shBuilderMethod.runid'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '申请人',	
									 																			name : 'shBuilderMethod.userid'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '申请时间',	
									 																			name : 'shBuilderMethod.applyDat'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '标题',	
									 																			name : 'shBuilderMethod.title'
																		 																			 										,maxLength: 128
									 															}
							 							
																																										 							
																																										 							
																																										 							
																																										 							
																																																	
														
							,{  
							       								
																			fieldLabel : '删除标记',	
									 									hiddenName : 'shBuilderMethod.isDelete'
									 									,xtype:'combo'
									,editable : false
									,mode : 'local'
									,triggerAction : 'all'
									,store : [['1',__yes],['0',__no]]
															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '审批节点名称',	
									 																			name : 'shBuilderMethod.nodeName'
																		 																			 										,maxLength: 30
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '审批状态',	
									 																			name : 'shBuilderMethod.approvalStatus'
																		 																			 										,maxLength: 30
									 															}
							 							
																																			]
						});
				//加载表单对应的数据	
				if (this.metdId != null && this.metdId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/shhq/getShBuilderMethod.do?metdId='+ this.metdId,
								root : 'data',
								preName : 'shBuilderMethod'
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
						url:__ctxPath + '/shhq/saveShBuilderMethod.do',
						msgSuccess : '成功删除该记录！',
						msgFailure : '操作出错，请联系管理员！',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('ShBuilderMethodGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});