/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class CusSpeEveForm
 * @extends Ext.Window
 * @description CusSpeEve表单
 * @company 优创融联科技
 */
CusSpeEveForm = Ext.extend(Ext.Panel, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				CusSpeEveForm.superclass.constructor.call(this, {
							id : 'CusSpeEveFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[CusSpeEve]详细信息',
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
							//id : 'CusSpeEveForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'cusSpeEve.eveId',
								xtype : 'hidden',
								value : this.eveId == null ? '' : this.eveId
							}
																																																								
														
							,{  
							    																			fieldLabel : '客户ID',	
									 																			hiddenName : 'cusSpeEve.customerid'
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
							    																			fieldLabel : '事项内容',	
									 																			name : 'cusSpeEve.eveContent'
																												,allowBlank:false
									 																			 											,xtype:'textarea'
																															 										,maxLength: 2000
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '备注',	
									 																			name : 'cusSpeEve.remark'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 2048
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '创建人ID',	
									 																			name : 'cusSpeEve.creUseId'
																												,allowBlank:false
									 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '创建日期',	
									 																			name : 'cusSpeEve.creDat'
																												,allowBlank:false
									 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '修改人ID',	
									 																			name : 'cusSpeEve.updUseId'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '修改日期',	
									 																			name : 'cusSpeEve.updDat'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '状态&CONZT',	
									 																			hiddenName : 'cusSpeEve.staId'
																												,allowBlank:false
									 																		        																									,xtype : 'mtdiccombo'
													,editable : true
													,lazyInit : false
													,forceSelection : false
													,itemKey : 'CONZT'
																																 															}
							 							
																																			]
						});
				//加载表单对应的数据	
				if (this.eveId != null && this.eveId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/customer/getCusSpeEve.do?eveId='+ this.eveId,
								root : 'data',
								preName : 'cusSpeEve'
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
						url:__ctxPath + '/customer/saveCusSpeEve.do',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('CusSpeEveGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});