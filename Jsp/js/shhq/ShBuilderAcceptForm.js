/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class ShBuilderAcceptForm
 * @extends Ext.Window
 * @description ShBuilderAccept表单
 * @company 优创融联科技
 */
ShBuilderAcceptForm = Ext.extend(Ext.Panel, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				ShBuilderAcceptForm.superclass.constructor.call(this, {
							id : 'ShBuilderAcceptFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[ShBuilderAccept]详细信息',
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
							//id : 'ShBuilderAcceptForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'shBuilderAccept.acptId',
								xtype : 'hidden',
								value : this.acptId == null ? '' : this.acptId
							}
																																																								
														
							,{  
							    																			fieldLabel : '标题',	
									 																			name : 'shBuilderAccept.title'
																		 																			 										,maxLength: 128
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '编号',	
									 																			name : 'shBuilderAccept.code'
																		 																			 										,maxLength: 128
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '申请人',	
									 																			name : 'shBuilderAccept.applyUserid'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '申请时间',	
									 																			name : 'shBuilderAccept.applyDat'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '申请说明',	
									 																			name : 'shBuilderAccept.applyContent'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 500
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '负责人',	
									 																			name : 'shBuilderAccept.perIncharge'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '负责人电话',	
									 																			name : 'shBuilderAccept.perCall'
																		 																			 										,maxLength: 60
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '负责人手机',	
									 																			name : 'shBuilderAccept.perPhone'
																		 																			 										,maxLength: 60
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '验收结果',	
									 																			name : 'shBuilderAccept.acptResult'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '验收说明',	
									 																			name : 'shBuilderAccept.acptContent'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 500
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '创建人',	
									 																			name : 'shBuilderAccept.creUserid'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '创建时间',	
									 																			name : 'shBuilderAccept.creDat'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '修改人',	
									 																			name : 'shBuilderAccept.updUserid'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '修改时间',	
									 																			name : 'shBuilderAccept.updDat'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '审批节点名称',	
									 																			name : 'shBuilderAccept.nodeName'
																		 																			 										,maxLength: 30
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '审批状态',	
									 																			name : 'shBuilderAccept.approvalStatus'
																		 																			 										,maxLength: 30
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '状态',	
									 																			name : 'shBuilderAccept.status'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : 'RUNID',	
									 																			name : 'shBuilderAccept.runid'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							       								
																			fieldLabel : '删除标记',	
									 									hiddenName : 'shBuilderAccept.isDelete'
									 									,xtype:'combo'
									,editable : false
									,mode : 'local'
									,triggerAction : 'all'
									,store : [['1',__yes],['0',__no]]
															}
							 							
																																			]
						});
				//加载表单对应的数据	
				if (this.acptId != null && this.acptId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/shhq/getShBuilderAccept.do?acptId='+ this.acptId,
								root : 'data',
								preName : 'shBuilderAccept'
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
						url:__ctxPath + '/shhq/saveShBuilderAccept.do',
						msgSuccess : '成功删除该记录！',
						msgFailure : '操作出错，请联系管理员！',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('ShBuilderAcceptGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});