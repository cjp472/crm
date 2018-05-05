/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class ObFeeRuleValueForm
 * @extends Ext.Window
 * @description ObFeeRuleValue表单
 * @company 优创融联科技
 */
ObFeeRuleValueForm = Ext.extend(Ext.Panel, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				ObFeeRuleValueForm.superclass.constructor.call(this, {
							id : 'ObFeeRuleValueFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[ObFeeRuleValue]详细信息',
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
							//id : 'ObFeeRuleValueForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'obFeeRuleValue.feeRuleValueId',
								xtype : 'hidden',
								value : this.feeRuleValueId == null ? '' : this.feeRuleValueId
							}
																																																								
														
							,{  
							    																			fieldLabel : '佣金规则内码',	
									 																			hiddenName : 'obFeeRuleValue.feeRuleId'
																		 																		        											,xtype:'combo'
											,editabel : false
											,lazyInit : false
											,triggerAction : 'all'
											,store : new Ext.data.SimpleStore( {
												autoLoad : true,
												url : __ctxPath + '/fee/listfeeRuleId.do',
												fields : [ 'feeRuleId', 'feeRuleIdName' ],
												listeners : {
													load : function() {
														var combo = Ext.getCmp('feeRuleId');
														var store = combo.getStore();
														var rows = [];//定义数组
														for(var i=0;i<store.getCount();i++){ //store.getCount()为store的长度
															if(store.getAt(i).data['feeRuleId']==combo.getValue()){
																combo.setValue(store.getAt(i).data['feeRuleIdName']);
																break;
															}
														}
													}
												}
											})
											,displayField : 'feeRuleIdName'
											,valueField : 'feeRuleId'
											,id : 'feeRuleId'
																				 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '最小值',	
									 																			name : 'obFeeRuleValue.minimum'
																		 									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '最大值',	
									 																			name : 'obFeeRuleValue.maximum'
																		 									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '系数',	
									 																			name : 'obFeeRuleValue.coefficient'
																		 									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '增加额度',	
									 																			name : 'obFeeRuleValue.increase'
																		 									 															}
							 							
																																										 							
																																										 							
																																										 							
																																										 							
																																			]
						});
				//加载表单对应的数据	
				if (this.feeRuleValueId != null && this.feeRuleValueId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/fee/getObFeeRuleValue.do?feeRuleValueId='+ this.feeRuleValueId,
								root : 'data',
								preName : 'obFeeRuleValue'
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
						url:__ctxPath + '/fee/saveObFeeRuleValue.do',
						msgSuccess : '成功删除该记录！',
						msgFailure : '操作出错，请联系管理员！',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('ObFeeRuleValueGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});