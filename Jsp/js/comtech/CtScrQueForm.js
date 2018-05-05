/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class CtScrQueForm
 * @extends Ext.Window
 * @description CtScrQue表单
 * @company 优创融联科技
 */
CtScrQueForm = Ext.extend(Ext.Panel, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				CtScrQueForm.superclass.constructor.call(this, {
							id : 'CtScrQueFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							//title : '[CtScrQue]详细信息',
							title:'增加题目',
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
							//id : 'CtScrQueForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'ctScrQue.queId',
								xtype : 'hidden',
								value : this.queId == null ? '' : this.queId
							}
																																																								
														
							,{  
							    																			fieldLabel : '标题',	
									 																			name : 'ctScrQue.queTopic'
																												,allowBlank:false
									 																			 											,xtype:'textarea'
																															 										,maxLength: 512
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '说明',	
									 																			name : 'ctScrQue.queContent'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 2048
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '题目类型：',	
									 																			hiddenName : 'ctScrQue.queTypeId'
																												,allowBlank:false
									 																		        																									,xtype : 'mtdiccombo'
													,editable : true
													,lazyInit : false
													,forceSelection : false
													,itemKey : 'CT_TMLX'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '展现方式：下拉选择、展开选择&CT_ZXFS',	
									 																			hiddenName : 'ctScrQue.displayTypeId'
																												,allowBlank:false
									 																		        																									,xtype : 'mtdiccombo'
													,editable : true
													,lazyInit : false
													,forceSelection : false
													,itemKey : 'CT_ZXFS'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '显示尺寸：长中短，对应配置&CT_XSCC',	
									 																			hiddenName : 'ctScrQue.displayStyleId'
																												,allowBlank:false
									 																		        																									,xtype : 'mtdiccombo'
													,editable : true
													,lazyInit : false
													,forceSelection : false
													,itemKey : 'CT_XSCC'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '布局：横排、竖排&CT_BJ',	
									 																			hiddenName : 'ctScrQue.layloutTypeId'
																												,allowBlank:false
									 																		        																									,xtype : 'mtdiccombo'
													,editable : true
													,lazyInit : false
													,forceSelection : false
													,itemKey : 'CT_BJ'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '初始值：初始显示的内容',	
									 																			name : 'ctScrQue.initVal'
																		 																			 										,maxLength: 128
									 															}
							 							
																																																	
														
							,{  
							       								
																			fieldLabel : '是否必填&YorN',	
									 									hiddenName : 'ctScrQue.isNeed'
																			,allowBlank:false
									 									,xtype:'combo'
									,editable : false
									,mode : 'local'
									,triggerAction : 'all'
									,store : [['1',__yes],['0',__no]]
															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '选项来源：手动、系统参数&CT_XXLY',	
									 																			hiddenName : 'ctScrQue.optSrcTypeId'
																		 																		        																									,xtype : 'mtdiccombo'
													,editable : true
													,lazyInit : false
													,forceSelection : false
													,itemKey : 'CT_XXLY'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '来源对象：文本，对应参数值',	
									 																			name : 'ctScrQue.optSrcObj'
																		 																			 										,maxLength: 128
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '备注',	
									 																			name : 'ctScrQue.remark'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 2048
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '创建人',	
									 																			name : 'ctScrQue.creUseId'
																												,allowBlank:false
									 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '创建日期',	
									 																			name : 'ctScrQue.creDat'
																												,allowBlank:false
									 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '修改人',	
									 																			name : 'ctScrQue.updUseId'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '修改日期',	
									 																			name : 'ctScrQue.updDat'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '状态：有效、注销&CT_ZT',	
									 																			hiddenName : 'ctScrQue.staId'
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
				if (this.queId != null && this.queId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/comtech/getCtScrQue.do?queId='+ this.queId,
								root : 'data',
								preName : 'ctScrQue'
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
					url : __ctxPath + '/comtech/saveCtScrQue.do',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('CtScrQueGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});