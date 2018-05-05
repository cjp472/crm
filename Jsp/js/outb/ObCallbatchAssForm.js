/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class ObCallbatchAssForm
 * @extends Ext.Window
 * @description ObCallbatchAss表单
 * @company 优创融联科技
 */
ObCallbatchAssForm = Ext.extend(Ext.Panel, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				ObCallbatchAssForm.superclass.constructor.call(this, {
							id : 'ObCallbatchAssFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[ObCallbatchAss]详细信息',
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
							//id : 'ObCallbatchAssForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'obCallbatchAss.callbatchAssId',
								xtype : 'hidden',
								value : this.callbatchAssId == null ? '' : this.callbatchAssId
							}
																																																								
														
							,{  
							    																			fieldLabel : '上级分配历史内码',	
									 																			name : 'obCallbatchAss.parentCallbatchAssId'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '名单批次内码',	
									 																			hiddenName : 'obCallbatchAss.callbatchId'
																												,allowBlank:false
									 																		        											,xtype:'combo'
											,editabel : false
											,lazyInit : false
											,triggerAction : 'all'
											,store : new Ext.data.SimpleStore( {
												autoLoad : true,
												url : __ctxPath + '/outb/listcallbatchId.do',
												fields : [ 'callbatchId', 'callbatchIdName' ],
												listeners : {
													load : function() {
														var combo = Ext.getCmp('callbatchId');
														var store = combo.getStore();
														var rows = [];//定义数组
														for(var i=0;i<store.getCount();i++){ //store.getCount()为store的长度
															if(store.getAt(i).data['callbatchId']==combo.getValue()){
																combo.setValue(store.getAt(i).data['callbatchIdName']);
																break;
															}
														}
													}
												}
											})
											,displayField : 'callbatchIdName'
											,valueField : 'callbatchId'
											,id : 'callbatchId'
																				 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '名单列表内码',	
									 																			hiddenName : 'obCallbatchAss.calllistId'
																												,allowBlank:false
									 																		        											,xtype:'combo'
											,editabel : false
											,lazyInit : false
											,triggerAction : 'all'
											,store : new Ext.data.SimpleStore( {
												autoLoad : true,
												url : __ctxPath + '/outb/listcalllistId.do',
												fields : [ 'calllistId', 'calllistIdName' ],
												listeners : {
													load : function() {
														var combo = Ext.getCmp('calllistId');
														var store = combo.getStore();
														var rows = [];//定义数组
														for(var i=0;i<store.getCount();i++){ //store.getCount()为store的长度
															if(store.getAt(i).data['calllistId']==combo.getValue()){
																combo.setValue(store.getAt(i).data['calllistIdName']);
																break;
															}
														}
													}
												}
											})
											,displayField : 'calllistIdName'
											,valueField : 'calllistId'
											,id : 'calllistId'
																				 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '活动内码',	
									 																			hiddenName : 'obCallbatchAss.comId'
																												,allowBlank:false
									 																		        											,xtype:'combo'
											,editabel : false
											,lazyInit : false
											,triggerAction : 'all'
											,store : new Ext.data.SimpleStore( {
												autoLoad : true,
												url : __ctxPath + '/outb/listcomId.do',
												fields : [ 'comId', 'comIdName' ],
												listeners : {
													load : function() {
														var combo = Ext.getCmp('comId');
														var store = combo.getStore();
														var rows = [];//定义数组
														for(var i=0;i<store.getCount();i++){ //store.getCount()为store的长度
															if(store.getAt(i).data['comId']==combo.getValue()){
																combo.setValue(store.getAt(i).data['comIdName']);
																break;
															}
														}
													}
												}
											})
											,displayField : 'comIdName'
											,valueField : 'comId'
											,id : 'comId'
																				 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '分配人内码',	
									 																			name : 'obCallbatchAss.fromUseId'
																												,allowBlank:false
									 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '阶段：0-数据管理员分配、1-组长分配、2-班长分配&CONOB_CALLBATCH_ASS_JD',	
									 																			hiddenName : 'obCallbatchAss.assStepId'
																												,allowBlank:false
									 																		        																									,xtype : 'mtdiccombo'
													,editable : true
													,lazyInit : false
													,forceSelection : false
													,itemKey : 'CONOB_CALLBATCH_ASS_JD'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '分配方式：0=名单分配 1=名单池分配&CONOB_CALLBATCH_ASS_FPFS',	
									 																			hiddenName : 'obCallbatchAss.assTypId'
																												,allowBlank:false
									 																		        																									,xtype : 'mtdiccombo'
													,editable : true
													,lazyInit : false
													,forceSelection : false
													,itemKey : 'CONOB_CALLBATCH_ASS_FPFS'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '接收人内码：分配方式为名单分配必填',	
									 																			name : 'obCallbatchAss.toUseId'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '开始时间',	
									 																			name : 'obCallbatchAss.staDat'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '结束时间',	
									 																			name : 'obCallbatchAss.endDat'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '接收分配数量，此次被上级分配到的数量',	
									 																			name : 'obCallbatchAss.assignCount'
																												,allowBlank:false
									 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '被回收数量',	
									 																			name : 'obCallbatchAss.retriveCount'
																												,allowBlank:false
									 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '剩余数量，可分配给下级的数量。如果接收人身份为坐席，则可分配数量不可用，置为0，否则：未分配给下级时=分配数量，分配给下级后要减去分配给下级的数量，直至为0.',	
									 																			name : 'obCallbatchAss.holdCount'
																												,allowBlank:false
									 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																			]
						});
				//加载表单对应的数据	
				if (this.callbatchAssId != null && this.callbatchAssId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/outb/getObCallbatchAss.do?callbatchAssId='+ this.callbatchAssId,
								root : 'data',
								preName : 'obCallbatchAss'
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
						url:__ctxPath + '/outb/saveObCallbatchAss.do',
						msgSuccess : '成功删除该记录！',
						msgFailure : '操作出错，请联系管理员！',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('ObCallbatchAssGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});