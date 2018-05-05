/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class CusRelationshipForm
 * @extends Ext.Window
 * @description CusRelationship表单
 * @company 优创融联科技
 */
CusRelationshipForm = Ext.extend(Ext.Panel, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				CusRelationshipForm.superclass.constructor.call(this, {
							id : 'CusRelationshipFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[CusRelationship]详细信息',
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
							//id : 'CusRelationshipForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'cusRelationship.relationshipId',
								xtype : 'hidden',
								value : this.relationshipId == null ? '' : this.relationshipId
							}
																																																								
														
							,{  
							    																			fieldLabel : '推荐客户',	
									 																			hiddenName : 'cusRelationship.customerid'
																												,allowBlank:false
									 																		        											,xtype:'combo'
											,editabel : false
											,lazyInit : false
											,triggerAction : 'all'
											,store : new Ext.data.SimpleStore( {
												autoLoad : true,
												url : __ctxPath + '/customer/listcustomerid.do',
												fields : [ 'customerid', 'customeridName' ],
												listeners : {
													load : function() {
														var combo = Ext.getCmp('customerid');
														var store = combo.getStore();
														var rows = [];//定义数组
														for(var i=0;i<store.getCount();i++){ //store.getCount()为store的长度
															if(store.getAt(i).data['customerid']==combo.getValue()){
																combo.setValue(store.getAt(i).data['customeridName']);
																break;
															}
														}
													}
												}
											})
											,displayField : 'customeridName'
											,valueField : 'customerid'
											,id : 'customerid'
																				 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '被推荐客户',	
									 																			name : 'cusRelationship.cusCustomerid'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '创建时间',	
									 																			name : 'cusRelationship.creDat'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '类型',	
									 																			name : 'cusRelationship.relationshipType'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '创建人ID',	
									 																			name : 'cusRelationship.creUseId'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																			]
						});
				//加载表单对应的数据	
				if (this.relationshipId != null && this.relationshipId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/customer/getCusRelationship.do?relationshipId='+ this.relationshipId,
								root : 'data',
								preName : 'cusRelationship'
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
						url:__ctxPath + '/customer/saveCusRelationship.do',
						msgSuccess : '成功删除该记录！',
						msgFailure : '操作出错，请联系管理员！',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('CusRelationshipGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});