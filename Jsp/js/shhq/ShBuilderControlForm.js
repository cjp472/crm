/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class ShBuilderControlForm
 * @extends Ext.Window
 * @description ShBuilderControl表单
 * @company 优创融联科技
 */
ShBuilderControlForm = Ext.extend(Ext.Panel, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				ShBuilderControlForm.superclass.constructor.call(this, {
							id : 'ShBuilderControlFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[ShBuilderControl]详细信息',
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
							//id : 'ShBuilderControlForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'shBuilderControl.contlId',
								xtype : 'hidden',
								value : this.contlId == null ? '' : this.contlId
							}
																																																								
														
							,{  
							    																			fieldLabel : '申请内码',	
									 																			hiddenName : 'shBuilderControl.applyId'
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
							    																			fieldLabel : '标题',	
									 																			name : 'shBuilderControl.title'
																		 																			 										,maxLength: 128
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '编号',	
									 																			name : 'shBuilderControl.code'
																		 																			 										,maxLength: 60
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '监管内容',	
									 																			name : 'shBuilderControl.contlContent'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 500
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '施工地点',	
									 																			name : 'shBuilderControl.applyAddress'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 300
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '机房名称',	
									 																			name : 'shBuilderControl.hourseName'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 300
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '动用资源',	
									 																			name : 'shBuilderControl.resource'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 300
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '施工方',	
									 																			name : 'shBuilderControl.applyUserid'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '施工单位',	
									 																			name : 'shBuilderControl.applyDepid'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '负责人',	
									 																			name : 'shBuilderControl.perIncharge'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '施工时间',	
									 																			name : 'shBuilderControl.applyDat'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '状态',	
									 																			name : 'shBuilderControl.status'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '签字人',	
									 																			name : 'shBuilderControl.signPerson'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '创建人',	
									 																			name : 'shBuilderControl.creUserid'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '创建时间',	
									 																			name : 'shBuilderControl.creDat'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																			]
						});
				//加载表单对应的数据	
				if (this.contlId != null && this.contlId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/shhq/getShBuilderControl.do?contlId='+ this.contlId,
								root : 'data',
								preName : 'shBuilderControl'
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
						url:__ctxPath + '/shhq/saveShBuilderControl.do',
						msgSuccess : '成功删除该记录！',
						msgFailure : '操作出错，请联系管理员！',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('ShBuilderControlGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});