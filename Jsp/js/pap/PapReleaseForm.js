/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class PapReleaseForm
 * @extends Ext.Window
 * @description PapRelease表单
 * @company 优创融联科技
 */
PapReleaseForm = Ext.extend(Ext.Panel, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				PapReleaseForm.superclass.constructor.call(this, {
							id : 'PapReleaseFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[PapRelease]详细信息',
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
							//id : 'PapReleaseForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'papRelease.papId',
								xtype : 'hidden',
								value : this.papId == null ? '' : this.papId
							}
																																																								
														
							,{  
							    																			fieldLabel : '问卷模板ID',	
									 																			hiddenName : 'papRelease.tmpId'
																												,allowBlank:false
									 																		        											,xtype:'combo'
											,editabel : false
											,lazyInit : false
											,triggerAction : 'all'
											,store : new Ext.data.SimpleStore( {
												autoLoad : true,
												url : __ctxPath + '/pap/listtmpId.do',
												fields : [ 'tmpId', 'tmpIdName' ],
												listeners : {
													load : function() {
														var combo = Ext.getCmp('tmpId');
														var store = combo.getStore();
														var rows = [];//定义数组
														for(var i=0;i<store.getCount();i++){ //store.getCount()为store的长度
															if(store.getAt(i).data['tmpId']==combo.getValue()){
																combo.setValue(store.getAt(i).data['tmpIdName']);
																break;
															}
														}
													}
												}
											})
											,displayField : 'tmpIdName'
											,valueField : 'tmpId'
											,id : 'tmpId'
																				 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '发布渠道：网站、呼叫中心&PAP_FBQD',	
									 																			hiddenName : 'papRelease.relChannel'
																												,allowBlank:false
									 																		        																									,xtype : 'mtdiccombo'
													,editable : true
													,lazyInit : false
													,forceSelection : false
													,itemKey : 'PAP_FBQD'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '名称',	
									 																			name : 'papRelease.papName'
																												,allowBlank:false
									 																			 										,maxLength: 256
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '描述',	
									 																			name : 'papRelease.papContent'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 2048
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '开始时间',	
									 																			name : 'papRelease.staDat'
																												,allowBlank:false
									 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '结束时间',	
									 																			name : 'papRelease.endDat'
																												,allowBlank:false
									 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '业务方向：呼入、呼出&PAP_YWFX',	
									 																			hiddenName : 'papRelease.busiDir'
																												,allowBlank:false
									 																		        																									,xtype : 'mtdiccombo'
													,editable : true
													,lazyInit : false
													,forceSelection : false
													,itemKey : 'PAP_YWFX'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '发布文件',	
									 																			name : 'papRelease.releaseFilePath'
																												,allowBlank:false
									 																			 											,xtype:'textarea'
																															 										,maxLength: 2048
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '是否允许匿名答卷&YorN',	
									 																			hiddenName : 'papRelease.applyAnsNo'
																												,allowBlank:false
									 																		        																									,xtype : 'mtdiccombo'
													,editable : true
													,lazyInit : false
													,forceSelection : false
													,itemKey : 'YorN'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '是否需要密码验证&YorN',	
									 																			hiddenName : 'papRelease.needPassChk'
																												,allowBlank:false
									 																		        																									,xtype : 'mtdiccombo'
													,editable : true
													,lazyInit : false
													,forceSelection : false
													,itemKey : 'YorN'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '是否允许多次答卷&YorN',	
									 																			hiddenName : 'papRelease.applyAnsMuti'
																												,allowBlank:false
									 																		        																									,xtype : 'mtdiccombo'
													,editable : true
													,lazyInit : false
													,forceSelection : false
													,itemKey : 'YorN'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '是否允许查看结果&YorN',	
									 																			hiddenName : 'papRelease.applyViewRes'
																												,allowBlank:false
									 																		        																									,xtype : 'mtdiccombo'
													,editable : true
													,lazyInit : false
													,forceSelection : false
													,itemKey : 'YorN'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '是否显示前导页&YorN',	
									 																			hiddenName : 'papRelease.displayGuide'
																												,allowBlank:false
									 																		        																									,xtype : 'mtdiccombo'
													,editable : true
													,lazyInit : false
													,forceSelection : false
													,itemKey : 'YorN'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '备注',	
									 																			name : 'papRelease.remark'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 2048
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '发布人ID',	
									 																			name : 'papRelease.relaseUseId'
																												,allowBlank:false
									 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '发布日期',	
									 																			name : 'papRelease.relaseDat'
																												,allowBlank:false
									 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '状态：有效、注销&PAP_ZT',	
									 																			hiddenName : 'papRelease.staId'
																												,allowBlank:false
									 																		        																									,xtype : 'mtdiccombo'
													,editable : true
													,lazyInit : false
													,forceSelection : false
													,itemKey : 'PAP_ZT'
																																 															}
							 							
																																			]
						});
				//加载表单对应的数据	
				if (this.papId != null && this.papId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/pap/getPapRelease.do?papId='+ this.papId,
								root : 'data',
								preName : 'papRelease'
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
						url:__ctxPath + '/pap/savePapRelease.do',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('PapReleaseGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});