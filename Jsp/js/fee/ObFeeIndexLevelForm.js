/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class ObFeeIndexLevelForm
 * @extends Ext.Window
 * @description ObFeeIndexLevel表单
 * @company 优创融联科技
 */
ObFeeIndexLevelForm = Ext.extend(Ext.Panel, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				ObFeeIndexLevelForm.superclass.constructor.call(this, {
							id : 'ObFeeIndexLevelFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[ObFeeIndexLevel]详细信息',
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
							//id : 'ObFeeIndexLevelForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'obFeeIndexLevel.feeIndexLevelId',
								xtype : 'hidden',
								value : this.feeIndexLevelId == null ? '' : this.feeIndexLevelId
							}
																																																								
														
							,{  
							    																			fieldLabel : '佣金指标内码',	
									 																			hiddenName : 'obFeeIndexLevel.feeIndexId'
																		 																		        											,xtype:'combo'
											,editabel : false
											,lazyInit : false
											,triggerAction : 'all'
											,store : new Ext.data.SimpleStore( {
												autoLoad : true,
												url : __ctxPath + '/fee/listfeeIndexId.do',
												fields : [ 'feeIndexId', 'feeIndexIdName' ],
												listeners : {
													load : function() {
														var combo = Ext.getCmp('feeIndexId');
														var store = combo.getStore();
														var rows = [];//定义数组
														for(var i=0;i<store.getCount();i++){ //store.getCount()为store的长度
															if(store.getAt(i).data['feeIndexId']==combo.getValue()){
																combo.setValue(store.getAt(i).data['feeIndexIdName']);
																break;
															}
														}
													}
												}
											})
											,displayField : 'feeIndexIdName'
											,valueField : 'feeIndexId'
											,id : 'feeIndexId'
																				 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '佣金指标项内码',	
									 																			hiddenName : 'obFeeIndexLevel.feeIndexProjectId'
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
									 																			name : 'obFeeIndexLevel.month'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '季度',	
									 																			name : 'obFeeIndexLevel.quarter'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '值',	
									 																			name : 'obFeeIndexLevel.feeIndexValue'
																		 									 															}
							 							
																																										 							
																																										 							
																																										 							
																																										 							
																																			]
						});
				//加载表单对应的数据	
				if (this.feeIndexLevelId != null && this.feeIndexLevelId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/fee/getObFeeIndexLevel.do?feeIndexLevelId='+ this.feeIndexLevelId,
								root : 'data',
								preName : 'obFeeIndexLevel'
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
						url:__ctxPath + '/fee/saveObFeeIndexLevel.do',
						msgSuccess : '成功删除该记录！',
						msgFailure : '操作出错，请联系管理员！',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('ObFeeIndexLevelGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});