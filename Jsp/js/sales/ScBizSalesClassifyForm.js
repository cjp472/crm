/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class ScBizSalesClassifyForm
 * @extends Ext.Window
 * @description ScBizSalesClassify表单
 * @company 优创融联科技
 */
ScBizSalesClassifyForm = Ext.extend(Ext.Panel, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				ScBizSalesClassifyForm.superclass.constructor.call(this, {
							id : 'ScBizSalesClassifyFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[ScBizSalesClassify]详细信息',
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
							//id : 'ScBizSalesClassifyForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'scBizSalesClassify.bizOrderDetailClassifyId',
								xtype : 'hidden',
								value : this.bizOrderDetailClassifyId == null ? '' : this.bizOrderDetailClassifyId
							}
																																																								
														
							,{  
							    																			fieldLabel : '业务单明细内码',	
									 																			hiddenName : 'scBizSalesClassify.bizOrderDetailId'
																		 																		        											,xtype:'combo'
											,editabel : false
											,lazyInit : false
											,triggerAction : 'all'
											,store : new Ext.data.SimpleStore( {
												autoLoad : true,
												url : __ctxPath + '/sales/listbizOrderDetailId.do',
												fields : [ 'bizOrderDetailId', 'bizOrderDetailIdName' ],
												listeners : {
													load : function() {
														var combo = Ext.getCmp('bizOrderDetailId');
														var store = combo.getStore();
														var rows = [];//定义数组
														for(var i=0;i<store.getCount();i++){ //store.getCount()为store的长度
															if(store.getAt(i).data['bizOrderDetailId']==combo.getValue()){
																combo.setValue(store.getAt(i).data['bizOrderDetailIdName']);
																break;
															}
														}
													}
												}
											})
											,displayField : 'bizOrderDetailIdName'
											,valueField : 'bizOrderDetailId'
											,id : 'bizOrderDetailId'
																				 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '备注',	
									 																			name : 'scBizSalesClassify.desc'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 500
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展1',	
									 																			name : 'scBizSalesClassify.ext1'
																		 																			 										,maxLength: 60
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展2',	
									 																			name : 'scBizSalesClassify.ext2'
																		 																			 										,maxLength: 60
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展3',	
									 																			name : 'scBizSalesClassify.ext3'
																		 																			 										,maxLength: 60
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展4',	
									 																			name : 'scBizSalesClassify.ext4'
																		 																			 										,maxLength: 60
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展5',	
									 																			name : 'scBizSalesClassify.ext5'
																		 																			 										,maxLength: 60
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展6',	
									 																			name : 'scBizSalesClassify.ext6'
																		 																			 										,maxLength: 60
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展7',	
									 																			name : 'scBizSalesClassify.ext7'
																		 																			 										,maxLength: 60
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展8',	
									 																			name : 'scBizSalesClassify.ext8'
																		 																			 										,maxLength: 60
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展9',	
									 																			name : 'scBizSalesClassify.ext9'
																		 																			 										,maxLength: 60
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展10',	
									 																			name : 'scBizSalesClassify.ext10'
																		 																			 										,maxLength: 60
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展11',	
									 																			name : 'scBizSalesClassify.ext11'
																		 									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展12',	
									 																			name : 'scBizSalesClassify.ext12'
																		 									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展13',	
									 																			name : 'scBizSalesClassify.ext13'
																		 									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展14',	
									 																			name : 'scBizSalesClassify.ext14'
																		 									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展15',	
									 																			name : 'scBizSalesClassify.ext15'
																		 									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展16',	
									 																			name : 'scBizSalesClassify.ext16'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展17',	
									 																			name : 'scBizSalesClassify.ext17'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展18',	
									 																			name : 'scBizSalesClassify.ext18'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展19',	
									 																			name : 'scBizSalesClassify.ext19'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展20',	
									 																			name : 'scBizSalesClassify.ext20'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																			]
						});
				//加载表单对应的数据	
				if (this.bizOrderDetailClassifyId != null && this.bizOrderDetailClassifyId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/sales/getScBizSalesClassify.do?bizOrderDetailClassifyId='+ this.bizOrderDetailClassifyId,
								root : 'data',
								preName : 'scBizSalesClassify'
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
						url:__ctxPath + '/sales/saveScBizSalesClassify.do',
						msgSuccess : '成功删除该记录！',
						msgFailure : '操作出错，请联系管理员！',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('ScBizSalesClassifyGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});