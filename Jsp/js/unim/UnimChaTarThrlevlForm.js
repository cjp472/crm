/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class UnimChaTarThrlevlForm
 * @extends Ext.Window
 * @description UnimChaTarThrlevl表单
 * @company 优创融联科技
 */
UnimChaTarThrlevlForm = Ext.extend(Ext.Panel, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				UnimChaTarThrlevlForm.superclass.constructor.call(this, {
							id : 'UnimChaTarThrlevlFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[UnimChaTarThrlevl]详细信息',
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
							//id : 'UnimChaTarThrlevlForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'unimChaTarThrlevl.thrlevlId',
								xtype : 'hidden',
								value : this.thrlevlId == null ? '' : this.thrlevlId
							}
																																																								
														
							,{  
							    																			fieldLabel : '指标ID',	
									 																			hiddenName : 'unimChaTarThrlevl.targetId'
																												,allowBlank:false
									 																		        											,xtype:'combo'
											,editabel : false
											,lazyInit : false
											,triggerAction : 'all'
											,store : new Ext.data.SimpleStore( {
												autoLoad : true,
												url : __ctxPath + '/unim/listtargetId.do',
												fields : [ 'targetId', 'targetIdName' ],
												listeners : {
													load : function() {
														var combo = Ext.getCmp('targetId');
														var store = combo.getStore();
														var rows = [];//定义数组
														for(var i=0;i<store.getCount();i++){ //store.getCount()为store的长度
															if(store.getAt(i).data['targetId']==combo.getValue()){
																combo.setValue(store.getAt(i).data['targetIdName']);
																break;
															}
														}
													}
												}
											})
											,displayField : 'targetIdName'
											,valueField : 'targetId'
											,id : 'targetId'
																				 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '渠道ID',	
									 																			hiddenName : 'unimChaTarThrlevl.channelId'
																		 																		        											,xtype:'combo'
											,editabel : false
											,lazyInit : false
											,triggerAction : 'all'
											,store : new Ext.data.SimpleStore( {
												autoLoad : true,
												url : __ctxPath + '/unim/listchannelId.do',
												fields : [ 'channelId', 'channelIdName' ],
												listeners : {
													load : function() {
														var combo = Ext.getCmp('channelId');
														var store = combo.getStore();
														var rows = [];//定义数组
														for(var i=0;i<store.getCount();i++){ //store.getCount()为store的长度
															if(store.getAt(i).data['channelId']==combo.getValue()){
																combo.setValue(store.getAt(i).data['channelIdName']);
																break;
															}
														}
													}
												}
											})
											,displayField : 'channelIdName'
											,valueField : 'channelId'
											,id : 'channelId'
																				 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '班长ID',	
									 																			name : 'unimChaTarThrlevl.monitorId'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '阀值1',	
									 																			name : 'unimChaTarThrlevl.thrlevl1'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '阀值2',	
									 																			name : 'unimChaTarThrlevl.thrlevl2'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '阀值3',	
									 																			name : 'unimChaTarThrlevl.thrlevl3'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '阀值4',	
									 																			name : 'unimChaTarThrlevl.thrlevl4'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展字段1（颜色1）',	
									 																			name : 'unimChaTarThrlevl.extend1'
																		 																			 										,maxLength: 256
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展字段2（颜色2）',	
									 																			name : 'unimChaTarThrlevl.extend2'
																		 																			 										,maxLength: 256
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展字段3（颜色3）',	
									 																			name : 'unimChaTarThrlevl.extend3'
																		 																			 										,maxLength: 256
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展字段4（颜色4）',	
									 																			name : 'unimChaTarThrlevl.extend4'
																		 																			 										,maxLength: 256
									 															}
							 							
																																			]
						});
				//加载表单对应的数据	
				if (this.thrlevlId != null && this.thrlevlId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/unim/getUnimChaTarThrlevl.do?thrlevlId='+ this.thrlevlId,
								root : 'data',
								preName : 'unimChaTarThrlevl'
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
						url:__ctxPath + '/unim/saveUnimChaTarThrlevl.do',
						msgSuccess : '成功删除该记录！',
						msgFailure : '操作出错，请联系管理员！',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('UnimChaTarThrlevlGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});