/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class UnimChannelTargetForm
 * @extends Ext.Window
 * @description UnimChannelTarget表单
 * @company 优创融联科技
 */
UnimChannelTargetForm = Ext.extend(Ext.Panel, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				UnimChannelTargetForm.superclass.constructor.call(this, {
							id : 'UnimChannelTargetFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[UnimChannelTarget]详细信息',
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
							//id : 'UnimChannelTargetForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'unimChannelTarget.targetId',
								xtype : 'hidden',
								value : this.targetId == null ? '' : this.targetId
							}
																																																								
														
							,{  
							    																			fieldLabel : '渠道ID',	
									 																			hiddenName : 'unimChannelTarget.channelId'
																		 																		        											,xtype:'combo'
											,editabel : false
											,lazyInit : false
											,triggerAction : 'all'
											,store : new Ext.data.SimpleStore( {
												autoLoad : true,
												url : __ctxPath + '/unim/listchannelId.do',
												fields : [ 'channelId', 'channelIdName' ],
												listeners : {
													load : function() {
														var combo = Ext.getCmp('channelId');
														var store = combo.getStore();
														var rows = [];//定义数组
														for(var i=0;i<store.getCount();i++){ //store.getCount()为store的长度
															if(store.getAt(i).data['channelId']==combo.getValue()){
																combo.setValue(store.getAt(i).data['channelIdName']);
																break;
															}
														}
													}
												}
											})
											,displayField : 'channelIdName'
											,valueField : 'channelId'
											,id : 'channelId'
																				 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '指标名称',	
									 																			name : 'unimChannelTarget.targetName'
																												,allowBlank:false
									 																			 										,maxLength: 128
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '指标编号',	
									 																			name : 'unimChannelTarget.targetCode'
																												,allowBlank:false
									 																			 										,maxLength: 128
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '数据来源：自动推送、参数配置',	
									 																			name : 'unimChannelTarget.srcTypeId'
																												,allowBlank:false
									 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '备注',	
									 																			name : 'unimChannelTarget.remark'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 4000
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '顺序号',	
									 																			name : 'unimChannelTarget.orderno'
																												,allowBlank:false
									 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '状态：启用、注销',	
									 																			name : 'unimChannelTarget.status'
																												,allowBlank:false
									 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																			]
						});
				//加载表单对应的数据	
				if (this.targetId != null && this.targetId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/unim/getUnimChannelTarget.do?targetId='+ this.targetId,
								root : 'data',
								preName : 'unimChannelTarget'
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
						url:__ctxPath + '/unim/saveUnimChannelTarget.do',
						msgSuccess : '成功删除该记录！',
						msgFailure : '操作出错，请联系管理员！',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('UnimChannelTargetGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});