/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class UlNewsReceiveForm
 * @extends Ext.Window
 * @description UlNewsReceive表单
 * @company 优创融联科技
 */
UlNewsReceiveForm = Ext.extend(Ext.Panel, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				UlNewsReceiveForm.superclass.constructor.call(this, {
							id : 'UlNewsReceiveFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[UlNewsReceive]详细信息',
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
							//id : 'UlNewsReceiveForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'ulNewsReceive.receiveId',
								xtype : 'hidden',
								value : this.receiveId == null ? '' : this.receiveId
							}
																																																								
														
							,{  
							    																			fieldLabel : '新闻公告内码',	
									 																			hiddenName : 'ulNewsReceive.newsId'
																		 																		        											,xtype:'combo'
											,editabel : false
											,lazyInit : false
											,triggerAction : 'all'
											,store : new Ext.data.SimpleStore( {
												autoLoad : true,
												url : __ctxPath + '/financial/combonewsId.do',
												fields : [ 'newsId', 'newsIdName' ],
												listeners : {
													load : function() {
														var combo = Ext.getCmp('newsId');
														var store = combo.getStore();
														var rows = [];//定义数组
														for(var i=0;i<store.getCount();i++){ //store.getCount()为store的长度
															if(store.getAt(i).data['newsId']==combo.getValue()){
																combo.setValue(store.getAt(i).data['newsIdName']);
																break;
															}
														}
													}
												}
											})
											,displayField : 'newsIdName'
											,valueField : 'newsId'
											,id : 'newsId'
																				 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '接收人',	
									 																			name : 'ulNewsReceive.receiver'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '接收时间',	
									 																			name : 'ulNewsReceive.receivetime'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '阅读事件',	
									 																			name : 'ulNewsReceive.readtime'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '阅读状态  0:未阅读 1:已阅读',	
									 																			name : 'ulNewsReceive.readstatus'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																			]
						});
				//加载表单对应的数据	
				if (this.receiveId != null && this.receiveId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/info/getUlNewsReceive.do?receiveId='+ this.receiveId,
								root : 'data',
								preName : 'ulNewsReceive'
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
				$postForm({
						formPanel:this.formPanel,
						scope:this,
						url:__ctxPath + '/info/saveUlNewsReceive.do',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('UlNewsReceiveGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});