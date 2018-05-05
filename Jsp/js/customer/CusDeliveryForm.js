/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class CusDeliveryForm
 * @extends Ext.Window
 * @description CusDelivery表单
 * @company 优创融联科技
 */
CusDeliveryForm = Ext.extend(Ext.Panel, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				CusDeliveryForm.superclass.constructor.call(this, {
							id : 'CusDeliveryFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[CusDelivery]详细信息',
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
							//id : 'CusDeliveryForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'cusDelivery.deliveryId',
								xtype : 'hidden',
								value : this.deliveryId == null ? '' : this.deliveryId
							}
																																																								
														
							,{  
							    																			fieldLabel : '客户内码',	
									 																			hiddenName : 'cusDelivery.customerid'
																		 																		        											,xtype:'combo'
											,editabel : false
											,lazyInit : false
											,triggerAction : 'all'
											,store : new Ext.data.SimpleStore( {
												autoLoad : true,
												url : __ctxPath + '/customer/listcustomerid.do',
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
							    																			fieldLabel : '地区内码',	
									 																			hiddenName : 'cusDelivery.regionid'
																		 																		        											,xtype:'combo'
											,editabel : false
											,lazyInit : false
											,triggerAction : 'all'
											,store : new Ext.data.SimpleStore( {
												autoLoad : true,
												url : __ctxPath + '/customer/listregionid.do',
												fields : [ 'regionid', 'regionidName' ],
												listeners : {
													load : function() {
														var combo = Ext.getCmp('regionid');
														var store = combo.getStore();
														var rows = [];//定义数组
														for(var i=0;i<store.getCount();i++){ //store.getCount()为store的长度
															if(store.getAt(i).data['regionid']==combo.getValue()){
																combo.setValue(store.getAt(i).data['regionidName']);
																break;
															}
														}
													}
												}
											})
											,displayField : 'regionidName'
											,valueField : 'regionid'
											,id : 'regionid'
																				 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '地址',	
									 																			name : 'cusDelivery.deliveryAddress'
																		 																			 										,maxLength: 255
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '姓名',	
									 																			name : 'cusDelivery.deliveryName'
																		 																			 										,maxLength: 50
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '电话',	
									 																			name : 'cusDelivery.deliveryPhone'
																		 																			 										,maxLength: 50
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '创建人ID',	
									 																			name : 'cusDelivery.creUseId'
																												,allowBlank:false
									 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '创建日期',	
									 																			name : 'cusDelivery.creDat'
																												,allowBlank:false
									 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '修改人ID',	
									 																			name : 'cusDelivery.updUseId'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '修改日期',	
									 																			name : 'cusDelivery.updDat'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '备注',	
									 																			name : 'cusDelivery.note'
																		 																			 										,maxLength: 128
									 															}
							 							
																																			]
						});
				//加载表单对应的数据	
				if (this.deliveryId != null && this.deliveryId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/customer/getCusDelivery.do?deliveryId='+ this.deliveryId,
								root : 'data',
								preName : 'cusDelivery'
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
						url:__ctxPath + '/customer/saveCusDelivery.do',
						msgSuccess : '成功删除该记录！',
						msgFailure : '操作出错，请联系管理员！',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('CusDeliveryGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});