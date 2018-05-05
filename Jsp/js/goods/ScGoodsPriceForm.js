/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class ScGoodsPriceForm
 * @extends Ext.Window
 * @description ScGoodsPrice表单
 * @company 优创融联科技
 */
ScGoodsPriceForm = Ext.extend(Ext.Panel, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				ScGoodsPriceForm.superclass.constructor.call(this, {
							id : 'ScGoodsPriceFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[ScGoodsPrice]详细信息',
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
							//id : 'ScGoodsPriceForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'scGoodsPrice.goodsPriceId',
								xtype : 'hidden',
								value : this.goodsPriceId == null ? '' : this.goodsPriceId
							}
																																																								
														
							,{  
							    																			fieldLabel : '进货价格',	
									 																			name : 'scGoodsPrice.purchasePrice'
																												,allowBlank:false
									 									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '上报价格',	
									 																			name : 'scGoodsPrice.reportPrice'
																												,allowBlank:false
									 									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '零售价格',	
									 																			name : 'scGoodsPrice.retailPrice'
																												,allowBlank:false
									 									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '平台直供价格',	
									 																			name : 'scGoodsPrice.wholesalePrice'
																												,allowBlank:false
									 									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '缺省平台补贴金额',	
									 																			name : 'scGoodsPrice.defaultSubsidyAmount'
																												,allowBlank:false
									 									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '创建人',	
									 																			name : 'scGoodsPrice.createUserId'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '创建时间',	
									 																			name : 'scGoodsPrice.createTime'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '修改人',	
									 																			name : 'scGoodsPrice.updateUserId'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '修改时间',	
									 																			name : 'scGoodsPrice.updateTime2'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '备注',	
									 																			name : 'scGoodsPrice.desc'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 500
									 															}
							 							
																																			]
						});
				//加载表单对应的数据	
				if (this.goodsPriceId != null && this.goodsPriceId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/goods/getScGoodsPrice.do?goodsPriceId='+ this.goodsPriceId,
								root : 'data',
								preName : 'scGoodsPrice'
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
						url:__ctxPath + '/goods/saveScGoodsPrice.do',
						msgSuccess : '成功删除该记录！',
						msgFailure : '操作出错，请联系管理员！',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('ScGoodsPriceGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});