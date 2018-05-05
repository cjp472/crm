/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class CusBusiInvokeForm
 * @extends Ext.Window
 * @description CusBusiInvoke表单
 * @company 优创融联科技
 */
CusBusiInvokeForm = Ext.extend(Ext.Panel, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				CusBusiInvokeForm.superclass.constructor.call(this, {
							id : 'CusBusiInvokeFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[CusBusiInvoke]详细信息',
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
							//id : 'CusBusiInvokeForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'cusBusiInvoke.busiHisId',
								xtype : 'hidden',
								value : this.busiHisId == null ? '' : this.busiHisId
							}
																																																								
														
							,{  
							    																			fieldLabel : '客户ID',	
									 																			hiddenName : 'cusBusiInvoke.customerid'
																		 																		        											,xtype:'combo'
											,editabel : false
											,lazyInit : false
											,triggerAction : 'all'
											,store : new Ext.data.SimpleStore( {
												autoLoad : true,
												url : __ctxPath + '/financial/combocustomerid.do',
												fields : [ 'customerid', 'customeridName' ],
												listeners : {
													load : function() {
														var combo = Ext.getCmp('customerid');
														var store = combo.getStore();
														var rows = [];//定义数组
														for(var i=0;i<store.getCount();i++){ //store.getCount()为store的长度
															if(store.getAt(i).data['customerid']==combo.getValue()){
																combo.setValue(store.getAt(i).data['customeridName']);
																break;
															}
														}
													}
												}
											})
											,displayField : 'customeridName'
											,valueField : 'customerid'
											,id : 'customerid'
																				 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '渠道类别&CUSQDLB',	
									 																			hiddenName : 'cusBusiInvoke.chanTypeId'
																												,allowBlank:false
									 																		        																									,xtype : 'mtdiccombo'
													,editable : true
													,lazyInit : false
													,forceSelection : false
													,itemKey : 'CUSQDLB'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '业务处理人（坐席）',	
									 																			name : 'cusBusiInvoke.ownerId'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '交易类型&CUSJYLX',	
									 																			hiddenName : 'cusBusiInvoke.busiTypeId'
																												,allowBlank:false
									 																		        																									,xtype : 'mtdiccombo'
													,editable : true
													,lazyInit : false
													,forceSelection : false
													,itemKey : 'CUSJYLX'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '开始时间',	
									 																			name : 'cusBusiInvoke.staTime'
																												,allowBlank:false
									 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '结束时间',	
									 																			name : 'cusBusiInvoke.endTime'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '交易码',	
									 																			name : 'cusBusiInvoke.busiCode'
																		 																			 										,maxLength: 256
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '交易状态&CUSJYZT',	
									 																			hiddenName : 'cusBusiInvoke.busiResId'
																												,allowBlank:false
									 																		        																									,xtype : 'mtdiccombo'
													,editable : true
													,lazyInit : false
													,forceSelection : false
													,itemKey : 'CUSJYZT'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '客户卡号',	
									 																			name : 'cusBusiInvoke.cusCardNo'
																		 																			 										,maxLength: 128
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '备注',	
									 																			name : 'cusBusiInvoke.remarks'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 2000
									 															}
							 							
																																			]
						});
				//加载表单对应的数据	
				if (this.busiHisId != null && this.busiHisId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/customer/getCusBusiInvoke.do?busiHisId='+ this.busiHisId,
								root : 'data',
								preName : 'cusBusiInvoke'
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
				$postForm({
						formPanel:this.formPanel,
						scope:this,
						url:__ctxPath + '/customer/saveCusBusiInvoke.do',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('CusBusiInvokeGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});