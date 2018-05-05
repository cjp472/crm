/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class UnimAssStatusForm
 * @extends Ext.Window
 * @description UnimAssStatus表单
 * @company 优创融联科技
 */
UnimAssStatusForm = Ext.extend(Ext.Panel, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				UnimAssStatusForm.superclass.constructor.call(this, {
							id : 'UnimAssStatusFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[UnimAssStatus]详细信息',
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
							//id : 'UnimAssStatusForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'unimAssStatus.statusId',
								xtype : 'hidden',
								value : this.statusId == null ? '' : this.statusId
							}
																																																								
														
							,{  
							    																			fieldLabel : '资产类型ID',	
									 																			hiddenName : 'unimAssStatus.catId'
																												,allowBlank:false
									 																		        											,xtype:'combo'
											,editabel : false
											,lazyInit : false
											,triggerAction : 'all'
											,store : new Ext.data.SimpleStore( {
												autoLoad : true,
												url : __ctxPath + '/unim/listcatId.do',
												fields : [ 'catId', 'catIdName' ],
												listeners : {
													load : function() {
														var combo = Ext.getCmp('catId');
														var store = combo.getStore();
														var rows = [];//定义数组
														for(var i=0;i<store.getCount();i++){ //store.getCount()为store的长度
															if(store.getAt(i).data['catId']==combo.getValue()){
																combo.setValue(store.getAt(i).data['catIdName']);
																break;
															}
														}
													}
												}
											})
											,displayField : 'catIdName'
											,valueField : 'catId'
											,id : 'catId'
																				 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '资产状态名称',	
									 																			name : 'unimAssStatus.statusName'
																												,allowBlank:false
									 																			 										,maxLength: 128
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '资产状态编号',	
									 																			name : 'unimAssStatus.statusCode'
																												,allowBlank:false
									 																			 										,maxLength: 128
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展字段1（显示颜色1）',	
									 																			name : 'unimAssStatus.extend1'
																		 																			 										,maxLength: 256
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展字段2',	
									 																			name : 'unimAssStatus.extend2'
																		 																			 										,maxLength: 256
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展字段3',	
									 																			name : 'unimAssStatus.extend3'
																		 																			 										,maxLength: 256
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展字段4',	
									 																			name : 'unimAssStatus.extend4'
																		 																			 										,maxLength: 256
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '备注',	
									 																			name : 'unimAssStatus.remark'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 4000
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '状态：启用、注销',	
									 																			name : 'unimAssStatus.status'
																												,allowBlank:false
									 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																			]
						});
				//加载表单对应的数据	
				if (this.statusId != null && this.statusId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/unim/getUnimAssStatus.do?statusId='+ this.statusId,
								root : 'data',
								preName : 'unimAssStatus'
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
						url:__ctxPath + '/unim/saveUnimAssStatus.do',
						msgSuccess : '成功删除该记录！',
						msgFailure : '操作出错，请联系管理员！',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('UnimAssStatusGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});