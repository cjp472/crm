/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class ScGoodsStockForm
 * @extends Ext.Window
 * @description ScGoodsStock表单
 * @company 优创融联科技
 */
ScGoodsStockForm = Ext.extend(Ext.Panel, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				ScGoodsStockForm.superclass.constructor.call(this, {
							id : 'ScGoodsStockFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[ScGoodsStock]详细信息',
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
							//id : 'ScGoodsStockForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'scGoodsStock.goodsStockId',
								xtype : 'hidden',
								value : this.goodsStockId == null ? '' : this.goodsStockId
							}
																																																								
														
							,{  
							    																			fieldLabel : '商品内码',	
									 																			hiddenName : 'scGoodsStock.goodsId'
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
							    																			fieldLabel : '仓库内码',	
									 																			hiddenName : 'scGoodsStock.warehouseId'
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
							    																			fieldLabel : '商品库存数量',	
									 																			name : 'scGoodsStock.goodsCount'
																												,allowBlank:false
									 									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '锁定数量',	
									 																			name : 'scGoodsStock.lockCount'
																		 									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '均价',	
									 																			name : 'scGoodsStock.averagePrice'
																		 									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '库存合计',	
									 																			name : 'scGoodsStock.stockTotal'
																		 									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '创建人',	
									 																			name : 'scGoodsStock.createUserId'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '创建时间',	
									 																			name : 'scGoodsStock.createTime'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '修改人',	
									 																			name : 'scGoodsStock.updateUserId'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '修改时间',	
									 																			name : 'scGoodsStock.updateTime2'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '备注',	
									 																			name : 'scGoodsStock.desc'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 500
									 															}
							 							
																																			]
						});
				//加载表单对应的数据	
				if (this.goodsStockId != null && this.goodsStockId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/stock/getScGoodsStock.do?goodsStockId='+ this.goodsStockId,
								root : 'data',
								preName : 'scGoodsStock'
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
						url:__ctxPath + '/stock/saveScGoodsStock.do',
						msgSuccess : '成功删除该记录！',
						msgFailure : '操作出错，请联系管理员！',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('ScGoodsStockGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});