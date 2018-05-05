/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class UnimChaTarParForm
 * @extends Ext.Window
 * @description UnimChaTarPar表单
 * @company 优创融联科技
 */
UnimChaTarParForm = Ext.extend(Ext.Panel, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				UnimChaTarParForm.superclass.constructor.call(this, {
							id : 'UnimChaTarParFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[UnimChaTarPar]详细信息',
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
							//id : 'UnimChaTarParForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'unimChaTarPar.paraId',
								xtype : 'hidden',
								value : this.paraId == null ? '' : this.paraId
							}
																																																								
														
							,{  
							    																			fieldLabel : '指标ID',	
									 																			hiddenName : 'unimChaTarPar.targetId'
																												,allowBlank:false
									 																		        											,xtype:'combo'
											,editabel : false
											,lazyInit : false
											,triggerAction : 'all'
											,store : new Ext.data.SimpleStore( {
												autoLoad : true,
												url : __ctxPath + '/unim/listtargetId.do',
												fields : [ 'targetId', 'targetIdName' ],
												listeners : {
													load : function() {
														var combo = Ext.getCmp('targetId');
														var store = combo.getStore();
														var rows = [];//定义数组
														for(var i=0;i<store.getCount();i++){ //store.getCount()为store的长度
															if(store.getAt(i).data['targetId']==combo.getValue()){
																combo.setValue(store.getAt(i).data['targetIdName']);
																break;
															}
														}
													}
												}
											})
											,displayField : 'targetIdName'
											,valueField : 'targetId'
											,id : 'targetId'
																				 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '渠道ID',	
									 																			hiddenName : 'unimChaTarPar.channelId'
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
							    																			fieldLabel : '参数名称',	
									 																			name : 'unimChaTarPar.paraName'
																												,allowBlank:false
									 																			 										,maxLength: 128
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '参数值',	
									 																			name : 'unimChaTarPar.paraValue'
																												,allowBlank:false
									 																			 										,maxLength: 128
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '备注',	
									 																			name : 'unimChaTarPar.remark'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 4000
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '顺序号',	
									 																			name : 'unimChaTarPar.orderno'
																												,allowBlank:false
									 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '状态：启用、注销',	
									 																			name : 'unimChaTarPar.status'
																												,allowBlank:false
									 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																			]
						});
				//加载表单对应的数据	
				if (this.paraId != null && this.paraId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/unim/getUnimChaTarPar.do?paraId='+ this.paraId,
								root : 'data',
								preName : 'unimChaTarPar'
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
						url:__ctxPath + '/unim/saveUnimChaTarPar.do',
						msgSuccess : '成功删除该记录！',
						msgFailure : '操作出错，请联系管理员！',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('UnimChaTarParGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});