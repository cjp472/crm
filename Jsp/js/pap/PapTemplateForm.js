/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class PapTemplateForm
 * @extends Ext.Window
 * @description PapTemplate表单
 * @company 优创融联科技
 */
PapTemplateForm = Ext.extend(Ext.Panel, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				PapTemplateForm.superclass.constructor.call(this, {
							id : 'PapTemplateFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[PapTemplate]详细信息',
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
							//id : 'PapTemplateForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'papTemplate.tmpId',
								xtype : 'hidden',
								value : this.tmpId == null ? '' : this.tmpId
							}
																																																								
														
							,{  
							    																			fieldLabel : '名称',	
									 																			name : 'papTemplate.tmpName'
																												,allowBlank:false
									 																			 										,maxLength: 256
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '描述',	
									 																			name : 'papTemplate.tmpContent'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 2048
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '展示布局：全部展示、按树展示、按标签展示',	
									 																			name : 'papTemplate.displayLayoutId'
																												,allowBlank:false
									 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '展示样式：按跳题展示、全部展示、展示当前题目',	
									 																			name : 'papTemplate.displayStyleId'
																												,allowBlank:false
									 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '备注',	
									 																			name : 'papTemplate.remark'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 2048
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '前导页文件地址',	
									 																			name : 'papTemplate.guideFilePath'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 2048
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '是否允许匿名答卷&YorN',	
									 																			hiddenName : 'papTemplate.applyAnsNo'
																												,allowBlank:false
									 																		        																									,xtype : 'mtdiccombo'
													,editable : true
													,lazyInit : false
													,forceSelection : false
													,itemKey : 'YorN'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '是否需要密码验证&YorN',	
									 																			hiddenName : 'papTemplate.needPassChk'
																												,allowBlank:false
									 																		        																									,xtype : 'mtdiccombo'
													,editable : true
													,lazyInit : false
													,forceSelection : false
													,itemKey : 'YorN'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '是否允许多次答卷&YorN',	
									 																			hiddenName : 'papTemplate.applyAnsMuti'
																												,allowBlank:false
									 																		        																									,xtype : 'mtdiccombo'
													,editable : true
													,lazyInit : false
													,forceSelection : false
													,itemKey : 'YorN'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '是否允许查看结果&YorN',	
									 																			hiddenName : 'papTemplate.applyViewRes'
																												,allowBlank:false
									 																		        																									,xtype : 'mtdiccombo'
													,editable : true
													,lazyInit : false
													,forceSelection : false
													,itemKey : 'YorN'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '是否显示前导页&YorN',	
									 																			hiddenName : 'papTemplate.displayGuide'
																												,allowBlank:false
									 																		        																									,xtype : 'mtdiccombo'
													,editable : true
													,lazyInit : false
													,forceSelection : false
													,itemKey : 'YorN'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '创建人ID',	
									 																			name : 'papTemplate.creUseId'
																												,allowBlank:false
									 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '创建日期',	
									 																			name : 'papTemplate.creDat'
																												,allowBlank:false
									 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '修改人ID',	
									 																			name : 'papTemplate.updUseId'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '修改日期',	
									 																			name : 'papTemplate.updDat'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '状态：有效、注销&PAP_ZT',	
									 																			hiddenName : 'papTemplate.staId'
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
				if (this.tmpId != null && this.tmpId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/pap/getPapTemplate.do?tmpId='+ this.tmpId,
								root : 'data',
								preName : 'papTemplate'
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
						url:__ctxPath + '/pap/savePapTemplate.do',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('PapTemplateGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});