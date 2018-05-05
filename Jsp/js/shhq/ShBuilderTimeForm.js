/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class ShBuilderTimeForm
 * @extends Ext.Window
 * @description ShBuilderTime表单
 * @company 优创融联科技
 */
ShBuilderTimeForm = Ext.extend(Ext.Panel, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				ShBuilderTimeForm.superclass.constructor.call(this, {
							id : 'ShBuilderTimeFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[ShBuilderTime]详细信息',
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
							//id : 'ShBuilderTimeForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'shBuilderTime.timeId',
								xtype : 'hidden',
								value : this.timeId == null ? '' : this.timeId
							}
																																										
														
							,{  
							    																			fieldLabel : '申请内码',	
									 																			hiddenName : 'shBuilderTime.applyId'
																		 																		        											,xtype:'combo'
											,editabel : false
											,lazyInit : false
											,triggerAction : 'all'
											,store : new Ext.data.SimpleStore( {
												autoLoad : true,
												url : __ctxPath + '/shhq/listapplyId.do',
												fields : [ 'applyId', 'applyIdName' ],
												listeners : {
													load : function() {
														var combo = Ext.getCmp('applyId');
														var store = combo.getStore();
														var rows = [];//定义数组
														for(var i=0;i<store.getCount();i++){ //store.getCount()为store的长度
															if(store.getAt(i).data['applyId']==combo.getValue()){
																combo.setValue(store.getAt(i).data['applyIdName']);
																break;
															}
														}
													}
												}
											})
											,displayField : 'applyIdName'
											,valueField : 'applyId'
											,id : 'applyId'
																				 															}
							 							
																																																															
														
							,{  
							    																			fieldLabel : '开始日期(年月日)',	
									 																			name : 'shBuilderTime.开始日期'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '结束日期(年月日)',	
									 																			name : 'shBuilderTime.结束日期'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '开始时间(时分)',	
									 																			name : 'shBuilderTime.开始时间'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '结束时间(时分)',	
									 																			name : 'shBuilderTime.结束时间'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																			]
						});
				//加载表单对应的数据	
				if (this.timeId != null && this.timeId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/shhq/getShBuilderTime.do?timeId='+ this.timeId,
								root : 'data',
								preName : 'shBuilderTime'
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
						url:__ctxPath + '/shhq/saveShBuilderTime.do',
						msgSuccess : '成功删除该记录！',
						msgFailure : '操作出错，请联系管理员！',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('ShBuilderTimeGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});