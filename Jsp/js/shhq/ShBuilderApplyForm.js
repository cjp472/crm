/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class ShBuilderApplyForm
 * @extends Ext.Window
 * @description ShBuilderApply表单
 * @company 优创融联科技
 */
ShBuilderApplyForm = Ext.extend(Ext.Panel, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				ShBuilderApplyForm.superclass.constructor.call(this, {
							id : 'ShBuilderApplyFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[ShBuilderApply]详细信息',
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
							//id : 'ShBuilderApplyForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'shBuilderApply.applyId',
								xtype : 'hidden',
								value : this.applyId == null ? '' : this.applyId
							}
																																																								
														
							,{  
							    																			fieldLabel : '方案内码',	
									 																			hiddenName : 'shBuilderApply.metdId'
																		 																		        											,xtype:'combo'
											,editabel : false
											,lazyInit : false
											,triggerAction : 'all'
											,store : new Ext.data.SimpleStore( {
												autoLoad : true,
												url : __ctxPath + '/shhq/listmetdId.do',
												fields : [ 'metdId', 'metdIdName' ],
												listeners : {
													load : function() {
														var combo = Ext.getCmp('metdId');
														var store = combo.getStore();
														var rows = [];//定义数组
														for(var i=0;i<store.getCount();i++){ //store.getCount()为store的长度
															if(store.getAt(i).data['metdId']==combo.getValue()){
																combo.setValue(store.getAt(i).data['metdIdName']);
																break;
															}
														}
													}
												}
											})
											,displayField : 'metdIdName'
											,valueField : 'metdId'
											,id : 'metdId'
																				 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '申请人',	
									 																			name : 'shBuilderApply.applyUserid'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '申请时间',	
									 																			name : 'shBuilderApply.applyTime'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '标题',	
									 																			name : 'shBuilderApply.applyTitle'
																		 																			 										,maxLength: 128
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '备注',	
									 																			name : 'shBuilderApply.applyComment'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 500
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '施工内容',	
									 																			name : 'shBuilderApply.applyContent'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 500
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '施工内容说明',	
									 																			name : 'shBuilderApply.applyDescribe'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 500
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '编号',	
									 																			name : 'shBuilderApply.code'
																		 																			 										,maxLength: 128
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '施工地点',	
									 																			name : 'shBuilderApply.buldAddress'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 300
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '机房名称',	
									 																			name : 'shBuilderApply.buildHouse'
																		 																			 										,maxLength: 128
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '施工面积',	
									 																			name : 'shBuilderApply.buildArear'
																		 																			 										,maxLength: 128
									 															}
							 							
																																																	
														
							,{  
							       								
																			fieldLabel : '是否动火施工',	
									 									hiddenName : 'shBuilderApply.isFire'
									 									,xtype:'combo'
									,editable : false
									,mode : 'local'
									,triggerAction : 'all'
									,store : [['1',__yes],['0',__no]]
															}
							 							
																																																	
														
							,{  
							       								
																			fieldLabel : '是否登高施工',	
									 									hiddenName : 'shBuilderApply.isHeight'
									 									,xtype:'combo'
									,editable : false
									,mode : 'local'
									,triggerAction : 'all'
									,store : [['1',__yes],['0',__no]]
															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '负责人',	
									 																			name : 'shBuilderApply.perIncharge'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '负责人电话',	
									 																			name : 'shBuilderApply.perCall'
																		 																			 										,maxLength: 128
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '负责人手机',	
									 																			name : 'shBuilderApply.perPhone'
																		 																			 										,maxLength: 128
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '状态',	
									 																			name : 'shBuilderApply.applyStatus'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : 'RUNID',	
									 																			name : 'shBuilderApply.runid'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																										 							
																																										 							
																																										 							
																																										 							
																																																	
														
							,{  
							    																			fieldLabel : '审批节点名称',	
									 																			name : 'shBuilderApply.nodeName'
																		 																			 										,maxLength: 30
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '审批状态',	
									 																			name : 'shBuilderApply.approvalStatus'
																		 																			 										,maxLength: 30
									 															}
							 							
																																			]
						});
				//加载表单对应的数据	
				if (this.applyId != null && this.applyId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/shhq/getShBuilderApply.do?applyId='+ this.applyId,
								root : 'data',
								preName : 'shBuilderApply'
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
						url:__ctxPath + '/shhq/saveShBuilderApply.do',
						msgSuccess : '成功删除该记录！',
						msgFailure : '操作出错，请联系管理员！',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('ShBuilderApplyGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});