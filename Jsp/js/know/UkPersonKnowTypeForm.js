/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class UkPersonKnowTypeForm
 * @extends Ext.Window
 * @description UkPersonKnowType表单
 * @company 优创融联科技
 */
UkPersonKnowTypeForm = Ext.extend(Ext.Panel, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				UkPersonKnowTypeForm.superclass.constructor.call(this, {
							id : 'UkPersonKnowTypeFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[UkPersonKnowType]详细信息',
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
							//id : 'UkPersonKnowTypeForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'ukPersonKnowType.personKnowTypeId',
								xtype : 'hidden',
								value : this.personKnowTypeId == null ? '' : this.personKnowTypeId
							}
																																																								
														
							,{  
							    																			fieldLabel : '用户内码',	
									 																			hiddenName : 'ukPersonKnowType.userid'
																		 																		        											,xtype:'combo'
											,editabel : false
											,lazyInit : false
											,triggerAction : 'all'
											,store : new Ext.data.SimpleStore( {
												autoLoad : true,
												url : __ctxPath + '/know/listuserid.do',
												fields : [ 'userid', 'useridName' ],
												listeners : {
													load : function() {
														var combo = Ext.getCmp('userid');
														var store = combo.getStore();
														var rows = [];//定义数组
														for(var i=0;i<store.getCount();i++){ //store.getCount()为store的长度
															if(store.getAt(i).data['userid']==combo.getValue()){
																combo.setValue(store.getAt(i).data['useridName']);
																break;
															}
														}
													}
												}
											})
											,displayField : 'useridName'
											,valueField : 'userid'
											,id : 'userid'
																				 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '知识模板编号',	
									 																			name : 'ukPersonKnowType.knowTmpId'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '名称',	
									 																			name : 'ukPersonKnowType.name'
																		 																			 										,maxLength: 30
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '备注',	
									 																			name : 'ukPersonKnowType.comMent'
																		 																			 										,maxLength: 100
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '父知识对象',	
									 																			name : 'ukPersonKnowType.parentId'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '更新时间',	
									 																			name : 'ukPersonKnowType.updateTime'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '状态',	
									 																			name : 'ukPersonKnowType.knowTypeStatus'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '顺序',	
									 																			name : 'ukPersonKnowType.knowSort'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																										 							
																																										 							
																																										 							
																																										 							
																																																	
														
							,{  
							    																			fieldLabel : '路径',	
									 																			name : 'ukPersonKnowType.path'
																		 																			 										,maxLength: 100
									 															}
							 							
																																			]
						});
				//加载表单对应的数据	
				if (this.personKnowTypeId != null && this.personKnowTypeId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/know/getUkPersonKnowType.do?personKnowTypeId='+ this.personKnowTypeId,
								root : 'data',
								preName : 'ukPersonKnowType'
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
						url:__ctxPath + '/know/saveUkPersonKnowType.do',
						msgSuccess : '成功删除该记录！',
						msgFailure : '操作出错，请联系管理员！',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('UkPersonKnowTypeGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});