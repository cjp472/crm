/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class UnimChannelMapForm
 * @extends Ext.Window
 * @description UnimChannelMap表单
 * @company 优创融联科技
 */
UnimChannelMapForm = Ext.extend(Ext.Panel, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				UnimChannelMapForm.superclass.constructor.call(this, {
							id : 'UnimChannelMapFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[UnimChannelMap]详细信息',
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
							//id : 'UnimChannelMapForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'unimChannelMap.mapId',
								xtype : 'hidden',
								value : this.mapId == null ? '' : this.mapId
							}
																																																								
														
							,{  
							    																			fieldLabel : '视图名称',	
									 																			name : 'unimChannelMap.mapName'
																		 																			 										,maxLength: 128
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '导航节点ID',	
									 																			hiddenName : 'unimChannelMap.navigationId'
																		 																		        											,xtype:'combo'
											,editabel : false
											,lazyInit : false
											,triggerAction : 'all'
											,store : new Ext.data.SimpleStore( {
												autoLoad : true,
												url : __ctxPath + '/unim/listnavigationId.do',
												fields : [ 'navigationId', 'navigationIdName' ],
												listeners : {
													load : function() {
														var combo = Ext.getCmp('navigationId');
														var store = combo.getStore();
														var rows = [];//定义数组
														for(var i=0;i<store.getCount();i++){ //store.getCount()为store的长度
															if(store.getAt(i).data['navigationId']==combo.getValue()){
																combo.setValue(store.getAt(i).data['navigationIdName']);
																break;
															}
														}
													}
												}
											})
											,displayField : 'navigationIdName'
											,valueField : 'navigationId'
											,id : 'navigationId'
																				 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '地址',	
									 																			name : 'unimChannelMap.address'
																		 																			 										,maxLength: 256
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : 'URL',	
									 																			name : 'unimChannelMap.bkfileUrl'
																		 																			 										,maxLength: 128
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '宽度',	
									 																			name : 'unimChannelMap.height'
																		 																			 										,maxLength: 32
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '高度',	
									 																			name : 'unimChannelMap.width'
																		 																			 										,maxLength: 32
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '描述符文件',	
									 																			name : 'unimChannelMap.designxml'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 4000
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '描述',	
									 																			name : 'unimChannelMap.reamrk'
																		 																			 										,maxLength: 256
									 															}
							 							
																																			]
						});
				//加载表单对应的数据	
				if (this.mapId != null && this.mapId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/unim/getUnimChannelMap.do?mapId='+ this.mapId,
								root : 'data',
								preName : 'unimChannelMap'
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
						url:__ctxPath + '/unim/saveUnimChannelMap.do',
						msgSuccess : '成功删除该记录！',
						msgFailure : '操作出错，请联系管理员！',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('UnimChannelMapGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});