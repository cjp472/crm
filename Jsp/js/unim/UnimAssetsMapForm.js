/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class UnimAssetsMapForm
 * @extends Ext.Window
 * @description UnimAssetsMap表单
 * @company 优创融联科技
 */
UnimAssetsMapForm = Ext.extend(Ext.Panel, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				UnimAssetsMapForm.superclass.constructor.call(this, {
							id : 'UnimAssetsMapFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[UnimAssetsMap]详细信息',
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
							//id : 'UnimAssetsMapForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'unimAssetsMap.mapId',
								xtype : 'hidden',
								value : this.mapId == null ? '' : this.mapId
							}
																																																								
														
							,{  
							    																			fieldLabel : '视图名称',	
									 																			name : 'unimAssetsMap.mapName'
																		 																			 										,maxLength: 128
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '导航节点ID',	
									 																			hiddenName : 'unimAssetsMap.navigationId'
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
									 																			name : 'unimAssetsMap.address'
																		 																			 										,maxLength: 256
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : 'URL',	
									 																			name : 'unimAssetsMap.bkfileUrl'
																		 																			 										,maxLength: 128
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '宽度',	
									 																			name : 'unimAssetsMap.height'
																		 																			 										,maxLength: 32
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '高度',	
									 																			name : 'unimAssetsMap.width'
																		 																			 										,maxLength: 32
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '描述符文件',	
									 																			name : 'unimAssetsMap.designxml'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 4000
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '描述',	
									 																			name : 'unimAssetsMap.reamrk'
																		 																			 										,maxLength: 256
									 															}
							 							
																																			]
						});
				//加载表单对应的数据	
				if (this.mapId != null && this.mapId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/unim/getUnimAssetsMap.do?mapId='+ this.mapId,
								root : 'data',
								preName : 'unimAssetsMap'
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
						url:__ctxPath + '/unim/saveUnimAssetsMap.do',
						msgSuccess : '成功删除该记录！',
						msgFailure : '操作出错，请联系管理员！',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('UnimAssetsMapGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});