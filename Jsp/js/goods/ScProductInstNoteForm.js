/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class ScProductInstNoteForm
 * @extends Ext.Window
 * @description ScProductInstNote表单
 * @company 优创融联科技
 */
ScProductInstNoteForm = Ext.extend(Ext.Panel, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				ScProductInstNoteForm.superclass.constructor.call(this, {
							id : 'ScProductInstNoteFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[ScProductInstNote]详细信息',
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
							//id : 'ScProductInstNoteForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'scProductInstNote.instStockId',
								xtype : 'hidden',
								value : this.instStockId == null ? '' : this.instStockId
							}
																																																								
														
							,{  
							    																			fieldLabel : '产品实例内码',	
									 																			hiddenName : 'scProductInstNote.productInstId'
																		 																		        											,xtype:'combo'
											,editabel : false
											,lazyInit : false
											,triggerAction : 'all'
											,store : new Ext.data.SimpleStore( {
												autoLoad : true,
												url : __ctxPath + '/goods/listproductInstId.do',
												fields : [ 'productInstId', 'productInstIdName' ],
												listeners : {
													load : function() {
														var combo = Ext.getCmp('productInstId');
														var store = combo.getStore();
														var rows = [];//定义数组
														for(var i=0;i<store.getCount();i++){ //store.getCount()为store的长度
															if(store.getAt(i).data['productInstId']==combo.getValue()){
																combo.setValue(store.getAt(i).data['productInstIdName']);
																break;
															}
														}
													}
												}
											})
											,displayField : 'productInstIdName'
											,valueField : 'productInstId'
											,id : 'productInstId'
																				 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '出入库类型：&CON_T_STOCK_TYPE',	
									 																			hiddenName : 'scProductInstNote.instStockType'
																		 																		        																									,xtype : 'mtdiccombo'
													,editable : true
													,lazyInit : false
													,forceSelection : false
													,itemKey : 'CON_T_STOCK_TYPE'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '业务单内码',	
									 																			name : 'scProductInstNote.bizOrderId'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '发生时间',	
									 																			name : 'scProductInstNote.entryTime'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '商品资源状态0-临时状态、1-正式未销售、2-零售销售、3-批发销售&CON_T_PRO_STATUS',	
									 																			hiddenName : 'scProductInstNote.productStatus'
																												,allowBlank:false
									 																		        																									,xtype : 'mtdiccombo'
													,editable : true
													,lazyInit : false
													,forceSelection : false
													,itemKey : 'CON_T_PRO_STATUS'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '销售地区',	
									 																			name : 'scProductInstNote.sellArea'
																		 																			 										,maxLength: 60
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '当前仓库内码',	
									 																			name : 'scProductInstNote.warehouseId'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '数量',	
									 																			name : 'scProductInstNote.count'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '单价',	
									 																			name : 'scProductInstNote.price'
																		 									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '状态变更时间',	
									 																			name : 'scProductInstNote.updateTime'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '创建人',	
									 																			name : 'scProductInstNote.createUserId'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '创建时间',	
									 																			name : 'scProductInstNote.createTime'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '修改人',	
									 																			name : 'scProductInstNote.updateUserId'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '修改时间',	
									 																			name : 'scProductInstNote.updateTime2'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '备注',	
									 																			name : 'scProductInstNote.desc'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 500
									 															}
							 							
																																			]
						});
				//加载表单对应的数据	
				if (this.instStockId != null && this.instStockId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/goods/getScProductInstNote.do?instStockId='+ this.instStockId,
								root : 'data',
								preName : 'scProductInstNote'
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
						url:__ctxPath + '/goods/saveScProductInstNote.do',
						msgSuccess : '成功删除该记录！',
						msgFailure : '操作出错，请联系管理员！',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('ScProductInstNoteGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});