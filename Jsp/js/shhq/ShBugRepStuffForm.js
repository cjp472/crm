/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class ShBugRepStuffForm
 * @extends Ext.Window
 * @description ShBugRepStuff表单
 * @company 优创融联科技
 */
ShBugRepStuffForm = Ext.extend(Ext.Panel, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				ShBugRepStuffForm.superclass.constructor.call(this, {
							id : 'ShBugRepStuffFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[ShBugRepStuff]详细信息',
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
							//id : 'ShBugRepStuffForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'shBugRepStuff.stuffId',
								xtype : 'hidden',
								value : this.stuffId == null ? '' : this.stuffId
							}
																																																								
														
							,{  
							    																			fieldLabel : '维修单内码',	
									 																			hiddenName : 'shBugRepStuff.repId'
																		 																		        											,xtype:'combo'
											,editabel : false
											,lazyInit : false
											,triggerAction : 'all'
											,store : new Ext.data.SimpleStore( {
												autoLoad : true,
												url : __ctxPath + '/shhq/listrepId.do',
												fields : [ 'repId', 'repIdName' ],
												listeners : {
													load : function() {
														var combo = Ext.getCmp('repId');
														var store = combo.getStore();
														var rows = [];//定义数组
														for(var i=0;i<store.getCount();i++){ //store.getCount()为store的长度
															if(store.getAt(i).data['repId']==combo.getValue()){
																combo.setValue(store.getAt(i).data['repIdName']);
																break;
															}
														}
													}
												}
											})
											,displayField : 'repIdName'
											,valueField : 'repId'
											,id : 'repId'
																				 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '材料名称',	
									 																			name : 'shBugRepStuff.name'
																		 																			 										,maxLength: 128
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '规格',	
									 																			name : 'shBugRepStuff.stuffSpec'
																		 																			 										,maxLength: 128
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '数量',	
									 																			name : 'shBugRepStuff.num'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '单价',	
									 																			name : 'shBugRepStuff.price'
																		 									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '小计',	
									 																			name : 'shBugRepStuff.totalCash'
																		 									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '备注',	
									 																			name : 'shBugRepStuff.remark'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 300
									 															}
							 							
																																			]
						});
				//加载表单对应的数据	
				if (this.stuffId != null && this.stuffId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/shhq/getShBugRepStuff.do?stuffId='+ this.stuffId,
								root : 'data',
								preName : 'shBugRepStuff'
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
						url:__ctxPath + '/shhq/saveShBugRepStuff.do',
						msgSuccess : '成功删除该记录！',
						msgFailure : '操作出错，请联系管理员！',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('ShBugRepStuffGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});