/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class ServiceWsdlMethodForm
 * @extends Ext.Window
 * @description ServiceWsdlMethod表单
 * @company 优创融联科技
 */
ServiceWsdlMethodForm = Ext.extend(Ext.Panel, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				ServiceWsdlMethodForm.superclass.constructor.call(this, {
							id : 'ServiceWsdlMethodFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[ServiceWsdlMethod]详细信息',
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
							//id : 'ServiceWsdlMethodForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'serviceWsdlMethod.serviceWsdlMethodId',
								xtype : 'hidden',
								value : this.serviceWsdlMethodId == null ? '' : this.serviceWsdlMethodId
							}
																																																								
														
							,{  
							    																			fieldLabel : '接口内码',	
									 																			hiddenName : 'serviceWsdlMethod.serviceWsdlId'
																		 																		        											,xtype:'combo'
											,editabel : false
											,lazyInit : false
											,triggerAction : 'all'
											,store : new Ext.data.SimpleStore( {
												autoLoad : true,
												url : __ctxPath + '/xitong/listserviceWsdlId.do',
												fields : [ 'serviceWsdlId', 'serviceWsdlIdName' ],
												listeners : {
													load : function() {
														var combo = Ext.getCmp('serviceWsdlId');
														var store = combo.getStore();
														var rows = [];//定义数组
														for(var i=0;i<store.getCount();i++){ //store.getCount()为store的长度
															if(store.getAt(i).data['serviceWsdlId']==combo.getValue()){
																combo.setValue(store.getAt(i).data['serviceWsdlIdName']);
																break;
															}
														}
													}
												}
											})
											,displayField : 'serviceWsdlIdName'
											,valueField : 'serviceWsdlId'
											,id : 'serviceWsdlId'
																				 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '接口方法名称',	
									 																			name : 'serviceWsdlMethod.serviceWsdlMethod'
																		 																			 										,maxLength: 50
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '接口方法',	
									 																			name : 'serviceWsdlMethod.serviceWsdlMethodName'
																		 																			 										,maxLength: 50
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '接口参数',	
									 																			name : 'serviceWsdlMethod.serviceWsdlMethodColumns'
																		 																			 										,maxLength: 150
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '接口数据返回格式',	
									 																			name : 'serviceWsdlMethod.serviceWsdlMethodReturn'
																		 																			 										,maxLength: 250
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '备注',	
									 																			name : 'serviceWsdlMethod.comment'
																		 																			 										,maxLength: 255
									 															}
							 							
																																										 							
																																										 							
																																										 							
																																										 							
																																			]
						});
				//加载表单对应的数据	
				if (this.serviceWsdlMethodId != null && this.serviceWsdlMethodId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/xitong/getServiceWsdlMethod.do?serviceWsdlMethodId='+ this.serviceWsdlMethodId,
								root : 'data',
								preName : 'serviceWsdlMethod'
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
						url:__ctxPath + '/xitong/saveServiceWsdlMethod.do',
						msgSuccess : '成功删除该记录！',
						msgFailure : '操作出错，请联系管理员！',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('ServiceWsdlMethodGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});