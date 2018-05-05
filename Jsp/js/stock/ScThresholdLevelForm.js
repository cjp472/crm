/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class ScThresholdLevelForm
 * @extends Ext.Window
 * @description ScThresholdLevel表单
 * @company 优创融联科技
 */
ScThresholdLevelForm = Ext.extend(Ext.Panel, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				ScThresholdLevelForm.superclass.constructor.call(this, {
							id : 'ScThresholdLevelFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[ScThresholdLevel]详细信息',
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
							//id : 'ScThresholdLevelForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'scThresholdLevel.threshLevelId',
								xtype : 'hidden',
								value : this.threshLevelId == null ? '' : this.threshLevelId
							}
																																																								
														
							,{  
							    																			fieldLabel : '商品内码',	
									 																			hiddenName : 'scThresholdLevel.goodsId'
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
									 																			hiddenName : 'scThresholdLevel.warehouseId'
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
							    																			fieldLabel : '上线',	
									 																			name : 'scThresholdLevel.upLevel'
																		 									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '下线',	
									 																			name : 'scThresholdLevel.downLevel'
																		 									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '创建人',	
									 																			name : 'scThresholdLevel.createUserId'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '创建时间',	
									 																			name : 'scThresholdLevel.createTime'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '修改人',	
									 																			name : 'scThresholdLevel.updateUserId'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '修改时间',	
									 																			name : 'scThresholdLevel.updateTime2'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '备注',	
									 																			name : 'scThresholdLevel.desc'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 500
									 															}
							 							
																																			]
						});
				//加载表单对应的数据	
				if (this.threshLevelId != null && this.threshLevelId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/stock/getScThresholdLevel.do?threshLevelId='+ this.threshLevelId,
								root : 'data',
								preName : 'scThresholdLevel'
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
						url:__ctxPath + '/stock/saveScThresholdLevel.do',
						msgSuccess : '成功删除该记录！',
						msgFailure : '操作出错，请联系管理员！',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('ScThresholdLevelGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});