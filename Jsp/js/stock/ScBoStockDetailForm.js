/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class ScBoStockDetailForm
 * @extends Ext.Window
 * @description ScBoStockDetail表单
 * @company 优创融联科技
 */
ScBoStockDetailForm = Ext.extend(Ext.Panel, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				ScBoStockDetailForm.superclass.constructor.call(this, {
							id : 'ScBoStockDetailFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[ScBoStockDetail]详细信息',
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
							//id : 'ScBoStockDetailForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'scBoStockDetail.bizOrderDetailId',
								xtype : 'hidden',
								value : this.bizOrderDetailId == null ? '' : this.bizOrderDetailId
							}
																																																								
														
							,{  
							    																			fieldLabel : '业务单内码',	
									 																			hiddenName : 'scBoStockDetail.bizOrderId'
																		 																		        											,xtype:'combo'
											,editabel : false
											,lazyInit : false
											,triggerAction : 'all'
											,store : new Ext.data.SimpleStore( {
												autoLoad : true,
												url : __ctxPath + '/stock/listbizOrderId.do',
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
							    																			fieldLabel : '商品内码',	
									 																			hiddenName : 'scBoStockDetail.goodsId'
																		 																		        											,xtype:'combo'
											,editabel : false
											,lazyInit : false
											,triggerAction : 'all'
											,store : new Ext.data.SimpleStore( {
												autoLoad : true,
												url : __ctxPath + '/stock/listgoodsId.do',
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
									 																			name : 'scBoStockDetail.goodsUnitPrice'
																		 									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '商品数量',	
									 																			name : 'scBoStockDetail.goodsCount'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '仓库内码',	
									 																			hiddenName : 'scBoStockDetail.warehouseId'
																		 																		        											,xtype:'combo'
											,editabel : false
											,lazyInit : false
											,triggerAction : 'all'
											,store : new Ext.data.SimpleStore( {
												autoLoad : true,
												url : __ctxPath + '/stock/listwarehouseId.do',
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
							    																			fieldLabel : '备注',	
									 																			name : 'scBoStockDetail.desc'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 500
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展1',	
									 																			name : 'scBoStockDetail.ext1'
																		 																			 										,maxLength: 60
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展2',	
									 																			name : 'scBoStockDetail.ext2'
																		 																			 										,maxLength: 60
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展3',	
									 																			name : 'scBoStockDetail.ext3'
																		 																			 										,maxLength: 60
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展4',	
									 																			name : 'scBoStockDetail.ext4'
																		 																			 										,maxLength: 60
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展5',	
									 																			name : 'scBoStockDetail.ext5'
																		 																			 										,maxLength: 60
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展6',	
									 																			name : 'scBoStockDetail.ext6'
																		 																			 										,maxLength: 60
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展7',	
									 																			name : 'scBoStockDetail.ext7'
																		 																			 										,maxLength: 60
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展8',	
									 																			name : 'scBoStockDetail.ext8'
																		 																			 										,maxLength: 60
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展9',	
									 																			name : 'scBoStockDetail.ext9'
																		 																			 										,maxLength: 60
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展10',	
									 																			name : 'scBoStockDetail.ext10'
																		 																			 										,maxLength: 60
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展11',	
									 																			name : 'scBoStockDetail.ext11'
																		 									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展12',	
									 																			name : 'scBoStockDetail.ext12'
																		 									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展13',	
									 																			name : 'scBoStockDetail.ext13'
																		 									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展14',	
									 																			name : 'scBoStockDetail.ext14'
																		 									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展15',	
									 																			name : 'scBoStockDetail.ext15'
																		 									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展16',	
									 																			name : 'scBoStockDetail.ext16'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展17',	
									 																			name : 'scBoStockDetail.ext17'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展18',	
									 																			name : 'scBoStockDetail.ext18'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展19',	
									 																			name : 'scBoStockDetail.ext19'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展20',	
									 																			name : 'scBoStockDetail.ext20'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																			]
						});
				//加载表单对应的数据	
				if (this.bizOrderDetailId != null && this.bizOrderDetailId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/stock/getScBoStockDetail.do?bizOrderDetailId='+ this.bizOrderDetailId,
								root : 'data',
								preName : 'scBoStockDetail'
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
						url:__ctxPath + '/stock/saveScBoStockDetail.do',
						msgSuccess : '成功删除该记录！',
						msgFailure : '操作出错，请联系管理员！',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('ScBoStockDetailGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});