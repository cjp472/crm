/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class ObFeeForm
 * @extends Ext.Window
 * @description ObFee表单
 * @company 优创融联科技
 */
ObFeeForm = Ext.extend(Ext.Panel, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				ObFeeForm.superclass.constructor.call(this, {
							id : 'ObFeeFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[ObFee]详细信息',
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
							//id : 'ObFeeForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'obFee.feeId',
								xtype : 'hidden',
								value : this.feeId == null ? '' : this.feeId
							}
																																																								
														
							,{  
							    																			fieldLabel : '用户内码',	
									 																			hiddenName : 'obFee.userid'
																		 																		        											,xtype:'combo'
											,editabel : false
											,lazyInit : false
											,triggerAction : 'all'
											,store : new Ext.data.SimpleStore( {
												autoLoad : true,
												url : __ctxPath + '/fee/listuserid.do',
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
							    																			fieldLabel : '指标项内码',	
									 																			hiddenName : 'obFee.feeIndexProjectId'
																		 																		        											,xtype:'combo'
											,editabel : false
											,lazyInit : false
											,triggerAction : 'all'
											,store : new Ext.data.SimpleStore( {
												autoLoad : true,
												url : __ctxPath + '/fee/listfeeIndexProjectId.do',
												fields : [ 'feeIndexProjectId', 'feeIndexProjectIdName' ],
												listeners : {
													load : function() {
														var combo = Ext.getCmp('feeIndexProjectId');
														var store = combo.getStore();
														var rows = [];//定义数组
														for(var i=0;i<store.getCount();i++){ //store.getCount()为store的长度
															if(store.getAt(i).data['feeIndexProjectId']==combo.getValue()){
																combo.setValue(store.getAt(i).data['feeIndexProjectIdName']);
																break;
															}
														}
													}
												}
											})
											,displayField : 'feeIndexProjectIdName'
											,valueField : 'feeIndexProjectId'
											,id : 'feeIndexProjectId'
																				 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '月份',	
									 																			name : 'obFee.month'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '季度',	
									 																			name : 'obFee.quarter'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '金额',	
									 																			name : 'obFee.amount'
																		 									 															}
							 							
																																										 							
																																										 							
																																										 							
																																										 							
																																																	
														
							,{  
							    																			fieldLabel : '增减款',	
									 																			name : 'obFee.changedAmount'
																		 									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '备注',	
									 																			name : 'obFee.comments'
																		 																			 										,maxLength: 255
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '状态',	
									 																			name : 'obFee.staId'
																												,allowBlank:false
									 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																			]
						});
				//加载表单对应的数据	
				if (this.feeId != null && this.feeId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/fee/getObFee.do?feeId='+ this.feeId,
								root : 'data',
								preName : 'obFee'
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
						url:__ctxPath + '/fee/saveObFee.do',
						msgSuccess : '成功删除该记录！',
						msgFailure : '操作出错，请联系管理员！',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('ObFeeGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});