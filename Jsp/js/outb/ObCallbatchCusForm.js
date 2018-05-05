/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class ObCallbatchCusForm
 * @extends Ext.Window
 * @description ObCallbatchCus表单
 * @company 优创融联科技
 */
ObCallbatchCusForm = Ext.extend(Ext.Panel, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				ObCallbatchCusForm.superclass.constructor.call(this, {
							id : 'ObCallbatchCusFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[ObCallbatchCus]详细信息',
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
							//id : 'ObCallbatchCusForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'obCallbatchCus.callbatchId',
								xtype : 'hidden',
								value : this.callbatchId == null ? '' : this.callbatchId
							}
																																																																																				
														
							,{  
							    																			fieldLabel : '分配状态&CONOB_CALLBATCH_CUS_FPZT',	
									 																			hiddenName : 'obCallbatchCus.assStaId'
																												,allowBlank:false
									 																		        																									,xtype : 'mtdiccombo'
													,editable : true
													,lazyInit : false
													,forceSelection : false
													,itemKey : 'CONOB_CALLBATCH_CUS_FPZT'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '阶段&CONOB_CALLBATCH_CUS_JD',	
									 																			hiddenName : 'obCallbatchCus.assStepId'
																		 																		        																									,xtype : 'mtdiccombo'
													,editable : true
													,lazyInit : false
													,forceSelection : false
													,itemKey : 'CONOB_CALLBATCH_CUS_JD'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '分配历史内码',	
									 																			hiddenName : 'obCallbatchCus.callbatchAssId'
																		 																		        											,xtype:'combo'
											,editabel : false
											,lazyInit : false
											,triggerAction : 'all'
											,store : new Ext.data.SimpleStore( {
												autoLoad : true,
												url : __ctxPath + '/outb/listcallbatchAssId.do',
												fields : [ 'callbatchAssId', 'callbatchAssIdName' ],
												listeners : {
													load : function() {
														var combo = Ext.getCmp('callbatchAssId');
														var store = combo.getStore();
														var rows = [];//定义数组
														for(var i=0;i<store.getCount();i++){ //store.getCount()为store的长度
															if(store.getAt(i).data['callbatchAssId']==combo.getValue()){
																combo.setValue(store.getAt(i).data['callbatchAssIdName']);
																break;
															}
														}
													}
												}
											})
											,displayField : 'callbatchAssIdName'
											,valueField : 'callbatchAssId'
											,id : 'callbatchAssId'
																				 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '分配人内码',	
									 																			name : 'obCallbatchCus.fromUseId'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '接收人内码',	
									 																			name : 'obCallbatchCus.toUseId'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																			]
						});
				//加载表单对应的数据	
				if (this.callbatchId != null && this.callbatchId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/outb/getObCallbatchCus.do?callbatchId='+ this.callbatchId,
								root : 'data',
								preName : 'obCallbatchCus'
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
						url:__ctxPath + '/outb/saveObCallbatchCus.do',
						msgSuccess : '成功删除该记录！',
						msgFailure : '操作出错，请联系管理员！',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('ObCallbatchCusGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});