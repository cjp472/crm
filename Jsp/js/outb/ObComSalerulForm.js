/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class ObComSalerulForm
 * @extends Ext.Window
 * @description ObComSalerul表单
 * @company 优创融联科技
 */
ObComSalerulForm = Ext.extend(Ext.Panel, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				ObComSalerulForm.superclass.constructor.call(this, {
							id : 'ObComSalerulFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[ObComSalerul]详细信息',
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
							//id : 'ObComSalerulForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'obComSalerul.rulId',
								xtype : 'hidden',
								value : this.rulId == null ? '' : this.rulId
							}
																																																								
														
							,{  
							    																			fieldLabel : '活动内码',	
									 																			hiddenName : 'obComSalerul.comId'
																		 																		        											,xtype:'combo'
											,editabel : false
											,lazyInit : false
											,triggerAction : 'all'
											,store : new Ext.data.SimpleStore( {
												autoLoad : true,
												url : __ctxPath + '/outb/listcomId.do',
												fields : [ 'comId', 'comIdName' ],
												listeners : {
													load : function() {
														var combo = Ext.getCmp('comId');
														var store = combo.getStore();
														var rows = [];//定义数组
														for(var i=0;i<store.getCount();i++){ //store.getCount()为store的长度
															if(store.getAt(i).data['comId']==combo.getValue()){
																combo.setValue(store.getAt(i).data['comIdName']);
																break;
															}
														}
													}
												}
											})
											,displayField : 'comIdName'
											,valueField : 'comId'
											,id : 'comId'
																				 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '规则名称',	
									 																			name : 'obComSalerul.rulNam'
																												,allowBlank:false
									 																			 										,maxLength: 128
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '规则类型：最大拨打次数、最小拨打次数等&CONOB_COM_SALERUL_GZLX',	
									 																			hiddenName : 'obComSalerul.rulTypeId'
																												,allowBlank:false
									 																		        																									,xtype : 'mtdiccombo'
													,editable : true
													,lazyInit : false
													,forceSelection : false
													,itemKey : 'CONOB_COM_SALERUL_GZLX'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '最小值：只有一个值时填该字段',	
									 																			name : 'obComSalerul.rulValMin'
																												,allowBlank:false
									 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '最大值',	
									 																			name : 'obComSalerul.rulValMax'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '顺序号&CONOB_COM_SALERUL_SXH',	
									 																			hiddenName : 'obComSalerul.rulDis'
																												,allowBlank:false
									 																		        																									,xtype : 'mtdiccombo'
													,editable : true
													,lazyInit : false
													,forceSelection : false
													,itemKey : 'CONOB_COM_SALERUL_SXH'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '状态&CONOB_COM_SALERUL_ZT',	
									 																			hiddenName : 'obComSalerul.rulStaId'
																												,allowBlank:false
									 																		        																									,xtype : 'mtdiccombo'
													,editable : true
													,lazyInit : false
													,forceSelection : false
													,itemKey : 'CONOB_COM_SALERUL_ZT'
																																 															}
							 							
																																			]
						});
				//加载表单对应的数据	
				if (this.rulId != null && this.rulId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/outb/getObComSalerul.do?rulId='+ this.rulId,
								root : 'data',
								preName : 'obComSalerul'
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
						url:__ctxPath + '/outb/saveObComSalerul.do',
						msgSuccess : '成功删除该记录！',
						msgFailure : '操作出错，请联系管理员！',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('ObComSalerulGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});