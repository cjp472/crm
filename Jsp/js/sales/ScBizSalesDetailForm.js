/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class ScBizSalesDetailForm
 * @extends Ext.Window
 * @description ScBizSalesDetail表单
 * @company 优创融联科技
 */
ScBizSalesDetailForm = Ext.extend(Ext.Panel, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				ScBizSalesDetailForm.superclass.constructor.call(this, {
							id : 'ScBizSalesDetailFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[ScBizSalesDetail]详细信息',
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
							//id : 'ScBizSalesDetailForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'scBizSalesDetail.bizOrderDetailId',
								xtype : 'hidden',
								value : this.bizOrderDetailId == null ? '' : this.bizOrderDetailId
							}
																																																								
														
							,{  
							    																			fieldLabel : '业务单内码',	
									 																			hiddenName : 'scBizSalesDetail.bizOrderId'
																		 																		        											,xtype:'combo'
											,editabel : false
											,lazyInit : false
											,triggerAction : 'all'
											,store : new Ext.data.SimpleStore( {
												autoLoad : true,
												url : __ctxPath + '/sales/listbizOrderId.do',
												fields : [ 'bizOrderId', 'bizOrderIdName' ],
												listeners : {
													load : function() {
														var combo = Ext.getCmp('bizOrderId');
														var store = combo.getStore();
														var rows = [];//定义数组
														for(var i=0;i<store.getCount();i++){ //store.getCount()为store的长度
															if(store.getAt(i).data['bizOrderId']==combo.getValue()){
																combo.setValue(store.getAt(i).data['bizOrderIdName']);
																break;
															}
														}
													}
												}
											})
											,displayField : 'bizOrderIdName'
											,valueField : 'bizOrderId'
											,id : 'bizOrderId'
																				 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '仓库内码',	
									 																			hiddenName : 'scBizSalesDetail.warehouseId'
																		 																		        											,xtype:'combo'
											,editabel : false
											,lazyInit : false
											,triggerAction : 'all'
											,store : new Ext.data.SimpleStore( {
												autoLoad : true,
												url : __ctxPath + '/sales/listwarehouseId.do',
												fields : [ 'warehouseId', 'warehouseIdName' ],
												listeners : {
													load : function() {
														var combo = Ext.getCmp('warehouseId');
														var store = combo.getStore();
														var rows = [];//定义数组
														for(var i=0;i<store.getCount();i++){ //store.getCount()为store的长度
															if(store.getAt(i).data['warehouseId']==combo.getValue()){
																combo.setValue(store.getAt(i).data['warehouseIdName']);
																break;
															}
														}
													}
												}
											})
											,displayField : 'warehouseIdName'
											,valueField : 'warehouseId'
											,id : 'warehouseId'
																				 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '商品内码',	
									 																			hiddenName : 'scBizSalesDetail.goodsId'
																		 																		        											,xtype:'combo'
											,editabel : false
											,lazyInit : false
											,triggerAction : 'all'
											,store : new Ext.data.SimpleStore( {
												autoLoad : true,
												url : __ctxPath + '/sales/listgoodsId.do',
												fields : [ 'goodsId', 'goodsIdName' ],
												listeners : {
													load : function() {
														var combo = Ext.getCmp('goodsId');
														var store = combo.getStore();
														var rows = [];//定义数组
														for(var i=0;i<store.getCount();i++){ //store.getCount()为store的长度
															if(store.getAt(i).data['goodsId']==combo.getValue()){
																combo.setValue(store.getAt(i).data['goodsIdName']);
																break;
															}
														}
													}
												}
											})
											,displayField : 'goodsIdName'
											,valueField : 'goodsId'
											,id : 'goodsId'
																				 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '商品价格',	
									 																			name : 'scBizSalesDetail.goodsUnitPrice'
																		 									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '商品数量',	
									 																			name : 'scBizSalesDetail.goodsCount'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '折前小计',	
									 																			name : 'scBizSalesDetail.discountForeSubtotal'
																		 									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '折扣',	
									 																			name : 'scBizSalesDetail.discount'
																		 																			 										,maxLength: 8
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '增减款',	
									 																			name : 'scBizSalesDetail.changedAmount'
																		 									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '折后小计',	
									 																			name : 'scBizSalesDetail.discountAfterSubtotal'
																		 									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '备注',	
									 																			name : 'scBizSalesDetail.desc'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 500
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展1',	
									 																			name : 'scBizSalesDetail.ext1'
																		 																			 										,maxLength: 60
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展2',	
									 																			name : 'scBizSalesDetail.ext2'
																		 																			 										,maxLength: 60
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展3',	
									 																			name : 'scBizSalesDetail.ext3'
																		 																			 										,maxLength: 60
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展4',	
									 																			name : 'scBizSalesDetail.ext4'
																		 																			 										,maxLength: 60
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展5',	
									 																			name : 'scBizSalesDetail.ext5'
																		 																			 										,maxLength: 60
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展6',	
									 																			name : 'scBizSalesDetail.ext6'
																		 																			 										,maxLength: 60
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展7',	
									 																			name : 'scBizSalesDetail.ext7'
																		 																			 										,maxLength: 60
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展8',	
									 																			name : 'scBizSalesDetail.ext8'
																		 																			 										,maxLength: 60
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展9',	
									 																			name : 'scBizSalesDetail.ext9'
																		 																			 										,maxLength: 60
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展10',	
									 																			name : 'scBizSalesDetail.ext10'
																		 																			 										,maxLength: 60
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展11',	
									 																			name : 'scBizSalesDetail.ext11'
																		 									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展12',	
									 																			name : 'scBizSalesDetail.ext12'
																		 									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展13',	
									 																			name : 'scBizSalesDetail.ext13'
																		 									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展14',	
									 																			name : 'scBizSalesDetail.ext14'
																		 									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展15',	
									 																			name : 'scBizSalesDetail.ext15'
																		 									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展16',	
									 																			name : 'scBizSalesDetail.ext16'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展17',	
									 																			name : 'scBizSalesDetail.ext17'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展18',	
									 																			name : 'scBizSalesDetail.ext18'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展19',	
									 																			name : 'scBizSalesDetail.ext19'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展20',	
									 																			name : 'scBizSalesDetail.ext20'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																			]
						});
				//加载表单对应的数据	
				if (this.bizOrderDetailId != null && this.bizOrderDetailId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/sales/getScBizSalesDetail.do?bizOrderDetailId='+ this.bizOrderDetailId,
								root : 'data',
								preName : 'scBizSalesDetail'
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
						url:__ctxPath + '/sales/saveScBizSalesDetail.do',
						msgSuccess : '成功删除该记录！',
						msgFailure : '操作出错，请联系管理员！',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('ScBizSalesDetailGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});