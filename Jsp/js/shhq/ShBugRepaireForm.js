/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class ShBugRepaireForm
 * @extends Ext.Window
 * @description ShBugRepaire表单
 * @company 优创融联科技
 */
ShBugRepaireForm = Ext.extend(Ext.Panel, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				ShBugRepaireForm.superclass.constructor.call(this, {
							id : 'ShBugRepaireFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[ShBugRepaire]详细信息',
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
							//id : 'ShBugRepaireForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'shBugRepaire.repId',
								xtype : 'hidden',
								value : this.repId == null ? '' : this.repId
							}
																																																								
														
							,{  
							    																			fieldLabel : '申请内码',	
									 																			hiddenName : 'shBugRepaire.applyId'
																		 																		        											,xtype:'combo'
											,editabel : false
											,lazyInit : false
											,triggerAction : 'all'
											,store : new Ext.data.SimpleStore( {
												autoLoad : true,
												url : __ctxPath + '/shhq/listapplyId.do',
												fields : [ 'applyId', 'applyIdName' ],
												listeners : {
													load : function() {
														var combo = Ext.getCmp('applyId');
														var store = combo.getStore();
														var rows = [];//定义数组
														for(var i=0;i<store.getCount();i++){ //store.getCount()为store的长度
															if(store.getAt(i).data['applyId']==combo.getValue()){
																combo.setValue(store.getAt(i).data['applyIdName']);
																break;
															}
														}
													}
												}
											})
											,displayField : 'applyIdName'
											,valueField : 'applyId'
											,id : 'applyId'
																				 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '维修情况',	
									 																			name : 'shBugRepaire.applyContent'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 500
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '状态',	
									 																			name : 'shBugRepaire.status'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '维修参与人',	
									 																			name : 'shBugRepaire.applyPersons'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 300
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '开始时间',	
									 																			name : 'shBugRepaire.staDat'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '完成时间',	
									 																			name : 'shBugRepaire.finishDat'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '维修结果',	
									 																			name : 'shBugRepaire.applyResult'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '未维修原因',	
									 																			name : 'shBugRepaire.unApplyReason'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 1024
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '创建人',	
									 																			name : 'shBugRepaire.creUserid'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '负责人',	
									 																			name : 'shBugRepaire.perIncharge'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '创建时间',	
									 																			name : 'shBugRepaire.creDat'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '修改时间',	
									 																			name : 'shBugRepaire.updDat'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																			]
						});
				//加载表单对应的数据	
				if (this.repId != null && this.repId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/shhq/getShBugRepaire.do?repId='+ this.repId,
								root : 'data',
								preName : 'shBugRepaire'
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
						url:__ctxPath + '/shhq/saveShBugRepaire.do',
						msgSuccess : '成功删除该记录！',
						msgFailure : '操作出错，请联系管理员！',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('ShBugRepaireGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});