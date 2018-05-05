/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class ScProductAttrValForm
 * @extends Ext.Window
 * @description ScProductAttrVal表单
 * @company 优创融联科技
 */
ScProductAttrValForm = Ext.extend(Ext.Panel, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				ScProductAttrValForm.superclass.constructor.call(this, {
							id : 'ScProductAttrValFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[ScProductAttrVal]详细信息',
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
							//id : 'ScProductAttrValForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'scProductAttrVal.productAttrVal',
								xtype : 'hidden',
								value : this.productAttrVal == null ? '' : this.productAttrVal
							}
																																																								
														
							,{  
							    																			fieldLabel : '产品属性编码',	
									 																			hiddenName : 'scProductAttrVal.productAttrCode'
																		 																		        											,xtype:'combo'
											,editabel : false
											,lazyInit : false
											,triggerAction : 'all'
											,store : new Ext.data.SimpleStore( {
												autoLoad : true,
												url : __ctxPath + '/goods/listproductAttrCode.do',
												fields : [ 'productAttrCode', 'productAttrCodeName' ],
												listeners : {
													load : function() {
														var combo = Ext.getCmp('productAttrCode');
														var store = combo.getStore();
														var rows = [];//定义数组
														for(var i=0;i<store.getCount();i++){ //store.getCount()为store的长度
															if(store.getAt(i).data['productAttrCode']==combo.getValue()){
																combo.setValue(store.getAt(i).data['productAttrCodeName']);
																break;
															}
														}
													}
												}
											})
											,displayField : 'productAttrCodeName'
											,valueField : 'productAttrCode'
											,id : 'productAttrCode'
																				 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '显示值',	
									 																			name : 'scProductAttrVal.productDispVal'
																		 																			 										,maxLength: 60
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '传递值',	
									 																			name : 'scProductAttrVal.productTranVal'
																		 																			 										,maxLength: 60
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '创建人',	
									 																			name : 'scProductAttrVal.createUserId'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '创建时间',	
									 																			name : 'scProductAttrVal.createTime'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '修改人',	
									 																			name : 'scProductAttrVal.updateUserId'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '修改时间',	
									 																			name : 'scProductAttrVal.updateTime'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '备注',	
									 																			name : 'scProductAttrVal.desc'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 500
									 															}
							 							
																																			]
						});
				//加载表单对应的数据	
				if (this.productAttrVal != null && this.productAttrVal != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/goods/getScProductAttrVal.do?productAttrVal='+ this.productAttrVal,
								root : 'data',
								preName : 'scProductAttrVal'
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
						url:__ctxPath + '/goods/saveScProductAttrVal.do',
						msgSuccess : '成功删除该记录！',
						msgFailure : '操作出错，请联系管理员！',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('ScProductAttrValGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});