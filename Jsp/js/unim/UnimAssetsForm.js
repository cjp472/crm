/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class UnimAssetsForm
 * @extends Ext.Window
 * @description UnimAssets表单
 * @company 优创融联科技
 */
UnimAssetsForm = Ext.extend(Ext.Panel, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				UnimAssetsForm.superclass.constructor.call(this, {
							id : 'UnimAssetsFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[UnimAssets]详细信息',
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
							//id : 'UnimAssetsForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'unimAssets.assetsId',
								xtype : 'hidden',
								value : this.assetsId == null ? '' : this.assetsId
							}
																																																								
														
							,{  
							    																			fieldLabel : '资产名称',	
									 																			name : 'unimAssets.assetsName'
																												,allowBlank:false
									 																			 										,maxLength: 128
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '资产编号',	
									 																			name : 'unimAssets.assetsCode'
																												,allowBlank:false
									 																			 										,maxLength: 128
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '资产类型ID',	
									 																			hiddenName : 'unimAssets.catId'
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
							    																			fieldLabel : '资产类别ID',	
									 																			hiddenName : 'unimAssets.typeId'
																		 																		        											,xtype:'combo'
											,editabel : false
											,lazyInit : false
											,triggerAction : 'all'
											,store : new Ext.data.SimpleStore( {
												autoLoad : true,
												url : __ctxPath + '/unim/listtypeId.do',
												fields : [ 'typeId', 'typeIdName' ],
												listeners : {
													load : function() {
														var combo = Ext.getCmp('typeId');
														var store = combo.getStore();
														var rows = [];//定义数组
														for(var i=0;i<store.getCount();i++){ //store.getCount()为store的长度
															if(store.getAt(i).data['typeId']==combo.getValue()){
																combo.setValue(store.getAt(i).data['typeIdName']);
																break;
															}
														}
													}
												}
											})
											,displayField : 'typeIdName'
											,valueField : 'typeId'
											,id : 'typeId'
																				 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '部门ID',	
									 																			name : 'unimAssets.depId'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '负责人ID',	
									 																			name : 'unimAssets.perincharId'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '描述',	
									 																			name : 'unimAssets.desc'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 4000
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '备注',	
									 																			name : 'unimAssets.remark'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 4000
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '状态：未启用、启用、注销',	
									 																			name : 'unimAssets.status'
																												,allowBlank:false
									 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																			]
						});
				//加载表单对应的数据	
				if (this.assetsId != null && this.assetsId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/unim/getUnimAssets.do?assetsId='+ this.assetsId,
								root : 'data',
								preName : 'unimAssets'
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
						url:__ctxPath + '/unim/saveUnimAssets.do',
						msgSuccess : '成功删除该记录！',
						msgFailure : '操作出错，请联系管理员！',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('UnimAssetsGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});