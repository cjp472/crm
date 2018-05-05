/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class CtScrTemplateForm
 * @extends Ext.Window
 * @description CtScrTemplate表单
 * @company 优创融联科技
 */
CtScrTemplateForm = Ext.extend(Ext.Panel, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				CtScrTemplateForm.superclass.constructor.call(this, {
							id : 'CtScrTemplateFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[CtScrTemplate]详细信息',
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
							//id : 'CtScrTemplateForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'ctScrTemplate.tmpId',
								xtype : 'hidden',
								value : this.tmpId == null ? '' : this.tmpId
							}
																																																								
														
							,{  
							    																			fieldLabel : '名称',	
									 																			name : 'ctScrTemplate.tmpName'
																												,allowBlank:false
									 																			 										,maxLength: 256
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '描述',	
									 																			name : 'ctScrTemplate.tmpContent'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 2048
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '展示布局：全部展示、按树展示、按标签展示&CT_HSZSBJ',	
									 																			hiddenName : 'ctScrTemplate.displayLayoutId'
																												,allowBlank:false
									 																		        																									,xtype : 'mtdiccombo'
													,editable : true
													,lazyInit : false
													,forceSelection : false
													,itemKey : 'CT_HSZSBJ'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '展示样式：按跳题展示、全部展示、展示当前题目&CT_ZSYS',	
									 																			hiddenName : 'ctScrTemplate.displayStyleId'
																												,allowBlank:false
									 																		        																									,xtype : 'mtdiccombo'
													,editable : true
													,lazyInit : false
													,forceSelection : false
													,itemKey : 'CT_ZSYS'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '备注',	
									 																			name : 'ctScrTemplate.remark'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 2048
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '创建人',	
									 																			name : 'ctScrTemplate.creUseId'
																												,allowBlank:false
									 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '创建日期',	
									 																			name : 'ctScrTemplate.creDat'
																												,allowBlank:false
									 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '修改人',	
									 																			name : 'ctScrTemplate.updUseId'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '修改日期',	
									 																			name : 'ctScrTemplate.updDat'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '状态：有效、注销&CT_ZT',	
									 																			hiddenName : 'ctScrTemplate.staId'
																												,allowBlank:false
									 																		        																									,xtype : 'mtdiccombo'
													,editable : true
													,lazyInit : false
													,forceSelection : false
													,itemKey : 'CT_ZT'
																																 															}
							 							
																																			]
						});
				//加载表单对应的数据	
				if (this.tmpId != null && this.tmpId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/comtech/getCtScrTemplate.do?tmpId='+ this.tmpId,
								root : 'data',
								preName : 'ctScrTemplate'
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
						url:__ctxPath + '/comtech/saveCtScrTemplate.do',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('CtScrTemplateGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});