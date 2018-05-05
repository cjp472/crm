/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class PapQueForm
 * @extends Ext.Window
 * @description PapQue表单
 * @company 优创融联科技
 */
PapQueForm = Ext.extend(Ext.Panel, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				PapQueForm.superclass.constructor.call(this, {
							id : 'PapQueFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[PapQue]详细信息',
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
							//id : 'PapQueForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'papQue.queId',
								xtype : 'hidden',
								value : this.queId == null ? '' : this.queId
							}
																																																								
														
							,{  
							    																			fieldLabel : '标题',	
									 																			name : 'papQue.queTopic'
																												,allowBlank:false
									 																			 											,xtype:'textarea'
																															 										,maxLength: 512
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '说明',	
									 																			name : 'papQue.queContent'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 2048
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '题目类型：单选题、多选题、是非题、问答题&PAP_TMLX',	
									 																			hiddenName : 'papQue.queTypeId'
																												,allowBlank:false
									 																		        																									,xtype : 'mtdiccombo'
													,editable : true
													,lazyInit : false
													,forceSelection : false
													,itemKey : 'PAP_TMLX'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '展现方式：下拉选择、展开选择&PAP_ZXFS',	
									 																			hiddenName : 'papQue.displayTypeId'
																												,allowBlank:false
									 																		        																									,xtype : 'mtdiccombo'
													,editable : true
													,lazyInit : false
													,forceSelection : false
													,itemKey : 'PAP_ZXFS'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '显示尺寸：长中短，对应配置&PAP_XXCC',	
									 																			hiddenName : 'papQue.displayStyleId'
																												,allowBlank:false
									 																		        																									,xtype : 'mtdiccombo'
													,editable : true
													,lazyInit : false
													,forceSelection : false
													,itemKey : 'PAP_XXCC'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '布局：横排、竖排&PAP_BJ',	
									 																			hiddenName : 'papQue.layloutTypeId'
																												,allowBlank:false
									 																		        																									,xtype : 'mtdiccombo'
													,editable : true
													,lazyInit : false
													,forceSelection : false
													,itemKey : 'PAP_BJ'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '初始值：初始显示的内容',	
									 																			name : 'papQue.initVal'
																		 																			 										,maxLength: 128
									 															}
							 							
																																																	
														
							,{  
							       								
																			fieldLabel : '是否必填&YorN',	
									 									hiddenName : 'papQue.isNeed'
																			,allowBlank:false
									 									,xtype:'combo'
									,editable : false
									,mode : 'local'
									,triggerAction : 'all'
									,store : [['1',__yes],['0',__no]]
															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '选项来源：手动、系统参数&PAP_XXLY',	
									 																			hiddenName : 'papQue.optSrcTypeId'
																		 																		        																									,xtype : 'mtdiccombo'
													,editable : true
													,lazyInit : false
													,forceSelection : false
													,itemKey : 'PAP_XXLY'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '来源对象：文本，对应参数值',	
									 																			name : 'papQue.optSrcObj'
																		 																			 										,maxLength: 128
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '备注',	
									 																			name : 'papQue.remark'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 2048
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '创建人ID',	
									 																			name : 'papQue.creUseId'
																												,allowBlank:false
									 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '创建日期',	
									 																			name : 'papQue.creDat'
																												,allowBlank:false
									 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '修改人ID',	
									 																			name : 'papQue.updUseId'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '修改日期',	
									 																			name : 'papQue.updDat'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '状态：有效、注销&PAP_ZT',	
									 																			hiddenName : 'papQue.staId'
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
				if (this.queId != null && this.queId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/pap/getPapQue.do?queId='+ this.queId,
								root : 'data',
								preName : 'papQue'
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
						url:__ctxPath + '/pap/savePapQue.do',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('PapQueGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});