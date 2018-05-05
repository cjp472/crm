/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class ScGoodsPriceHisForm
 * @extends Ext.Window
 * @description ScGoodsPriceHis表单
 * @company 优创融联科技
 */
ScGoodsPriceHisForm = Ext.extend(Ext.Panel, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				ScGoodsPriceHisForm.superclass.constructor.call(this, {
							id : 'ScGoodsPriceHisFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[ScGoodsPriceHis]详细信息',
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
							//id : 'ScGoodsPriceHisForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'scGoodsPriceHis.goodsPriceHisSeq',
								xtype : 'hidden',
								value : this.goodsPriceHisSeq == null ? '' : this.goodsPriceHisSeq
							}
																																																								
														
							,{  
							    																			fieldLabel : '商品标识',	
									 																			hiddenName : 'scGoodsPriceHis.goodsId'
																												,allowBlank:false
									 																		        											,xtype:'combo'
											,editabel : false
											,lazyInit : false
											,triggerAction : 'all'
											,store : new Ext.data.SimpleStore( {
												autoLoad : true,
												url : __ctxPath + '/goods/listgoodsId.do',
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
							    																			fieldLabel : '进货价格',	
									 																			name : 'scGoodsPriceHis.purchasePrice'
																												,allowBlank:false
									 									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '上报价格',	
									 																			name : 'scGoodsPriceHis.reportPrice'
																												,allowBlank:false
									 									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '零售价格',	
									 																			name : 'scGoodsPriceHis.retailPrice'
																												,allowBlank:false
									 									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '平台直供价格',	
									 																			name : 'scGoodsPriceHis.wholesalePrice'
																												,allowBlank:false
									 									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '缺省平台补贴金额',	
									 																			name : 'scGoodsPriceHis.defaultSubsidyAmount'
																												,allowBlank:false
									 									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '更新时间',	
									 																			name : 'scGoodsPriceHis.updateTime'
																												,allowBlank:false
									 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '操作员内码',	
									 																			name : 'scGoodsPriceHis.optUserId'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																			]
						});
				//加载表单对应的数据	
				if (this.goodsPriceHisSeq != null && this.goodsPriceHisSeq != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/goods/getScGoodsPriceHis.do?goodsPriceHisSeq='+ this.goodsPriceHisSeq,
								root : 'data',
								preName : 'scGoodsPriceHis'
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
						url:__ctxPath + '/goods/saveScGoodsPriceHis.do',
						msgSuccess : '成功删除该记录！',
						msgFailure : '操作出错，请联系管理员！',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('ScGoodsPriceHisGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});