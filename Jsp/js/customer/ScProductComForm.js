/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class ScProductComForm
 * @extends Ext.Window
 * @description ScProductCom表单
 * @company 优创融联科技
 */
ScProductComForm = Ext.extend(Ext.Panel, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				ScProductComForm.superclass.constructor.call(this, {
							id : 'ScProductComFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[ScProductCom]详细信息',
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
							//id : 'ScProductComForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'scProductCom.productComId',
								xtype : 'hidden',
								value : this.productComId == null ? '' : this.productComId
							}
																																																								
														
							,{  
							    																			fieldLabel : '产品内码',	
									 																			name : 'scProductCom.productId'
																												,allowBlank:false
									 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '组合内码',	
									 																			hiddenName : 'scProductCom.comboGoodsId'
																												,allowBlank:false
									 																		        											,xtype:'combo'
											,editabel : false
											,lazyInit : false
											,triggerAction : 'all'
											,store : new Ext.data.SimpleStore( {
												autoLoad : true,
												url : __ctxPath + '/customer/listcomboGoodsId.do',
												fields : [ 'comboGoodsId', 'comboGoodsIdName' ],
												listeners : {
													load : function() {
														var combo = Ext.getCmp('comboGoodsId');
														var store = combo.getStore();
														var rows = [];//定义数组
														for(var i=0;i<store.getCount();i++){ //store.getCount()为store的长度
															if(store.getAt(i).data['comboGoodsId']==combo.getValue()){
																combo.setValue(store.getAt(i).data['comboGoodsIdName']);
																break;
															}
														}
													}
												}
											})
											,displayField : 'comboGoodsIdName'
											,valueField : 'comboGoodsId'
											,id : 'comboGoodsId'
																				 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '数量',	
									 																			name : 'scProductCom.procomCount'
																												,allowBlank:false
									 									 															}
							 							
																																			]
						});
				//加载表单对应的数据	
				if (this.productComId != null && this.productComId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/customer/getScProductCom.do?productComId='+ this.productComId,
								root : 'data',
								preName : 'scProductCom'
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
						url:__ctxPath + '/customer/saveScProductCom.do',
						msgSuccess : '成功删除该记录！',
						msgFailure : '操作出错，请联系管理员！',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('ScProductComGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});