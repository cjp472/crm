/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class CtScrReleaseForm
 * @extends Ext.Window
 * @description CtScrRelease表单
 * @company 优创融联科技
 */
CtScrReleaseForm = Ext.extend(Ext.Panel, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				CtScrReleaseForm.superclass.constructor.call(this, {
							id : 'CtScrReleaseFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[CtScrRelease]详细信息',
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
							//id : 'CtScrReleaseForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'ctScrRelease.scrId',
								xtype : 'hidden',
								value : this.scrId == null ? '' : this.scrId
							}
																																																								
														
							,{  
							    																			fieldLabel : '话术模板',	
									 																			hiddenName : 'ctScrRelease.tmpId'
																												,allowBlank:false
									 																		        											,xtype:'combo'
											,editabel : false
											,lazyInit : false
											,triggerAction : 'all'
											,store : new Ext.data.SimpleStore( {
												autoLoad : true,
												url : __ctxPath + '/comtech/listtmpId.do',
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
							    																			fieldLabel : '名称',	
									 																			name : 'ctScrRelease.scrName'
																												,allowBlank:false
									 																			 										,maxLength: 256
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '描述',	
									 																			name : 'ctScrRelease.scrContent'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 2048
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '开始时间',	
									 																			name : 'ctScrRelease.staDat'
																												,allowBlank:false
									 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '结束时间',	
									 																			name : 'ctScrRelease.endDat'
																												,allowBlank:false
									 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '业务方向：呼入、呼出&CT_YWFX',	
									 																			hiddenName : 'ctScrRelease.busiDir'
																												,allowBlank:false
									 																		        																									,xtype : 'mtdiccombo'
													,editable : true
													,lazyInit : false
													,forceSelection : false
													,itemKey : 'CT_YWFX'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '使用用户：用逗号分隔',	
									 																			name : 'ctScrRelease.userUser'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 2048
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '使用用户组：用逗号分隔',	
									 																			name : 'ctScrRelease.userUsegroup'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 2048
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '使用人员技能：用逗号分隔',	
									 																			name : 'ctScrRelease.userSkill'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 2048
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '发布文件',	
									 																			name : 'ctScrRelease.releaseFilePath'
																												,allowBlank:false
									 																			 											,xtype:'textarea'
																															 										,maxLength: 2048
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '备注',	
									 																			name : 'ctScrRelease.remark'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 2048
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '发布人',	
									 																			name : 'ctScrRelease.relaseUseId'
																												,allowBlank:false
									 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '发布日期',	
									 																			name : 'ctScrRelease.relaseDat'
																												,allowBlank:false
									 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '状态：有效、注销&CT_ZT',	
									 																			hiddenName : 'ctScrRelease.staId'
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
				if (this.scrId != null && this.scrId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/comtech/getCtScrRelease.do?scrId='+ this.scrId,
								root : 'data',
								preName : 'ctScrRelease'
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
						url:__ctxPath + '/comtech/saveCtScrRelease.do',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('CtScrReleaseGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});