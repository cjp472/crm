/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class QcTempReleaseForm
 * @extends Ext.Window
 * @description QcTempRelease表单
 * @company 优创融联科技
 */
QcTempReleaseForm = Ext.extend(Ext.Panel, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				QcTempReleaseForm.superclass.constructor.call(this, {
							id : 'QcTempReleaseFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[QcTempRelease]详细信息',
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
							//id : 'QcTempReleaseForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'qcTempRelease.tempReleId',
								xtype : 'hidden',
								value : this.tempReleId == null ? '' : this.tempReleId
							}
																																																								
														
							,{  
							    																			fieldLabel : '模板ID',	
									 																			hiddenName : 'qcTempRelease.tmpId'
																												,allowBlank:false
									 																		        											,xtype:'combo'
											,editabel : false
											,lazyInit : false
											,triggerAction : 'all'
											,store : new Ext.data.SimpleStore( {
												autoLoad : true,
												url : __ctxPath + '/qucon/listtmpId.do',
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
							    																			fieldLabel : '考核渠道&CONLYLB',	
									 																			hiddenName : 'qcTempRelease.chkChannel'
																												,allowBlank:false
									 																		        																									,xtype : 'mtdiccombo'
													,editable : true
													,lazyInit : false
													,forceSelection : false
													,itemKey : 'CONLYLB'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '名称',	
									 																			name : 'qcTempRelease.releName'
																												,allowBlank:false
									 																			 										,maxLength: 256
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '描述',	
									 																			name : 'qcTempRelease.releContent'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 2048
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '考评方式&QC_PFFS',	
									 																			hiddenName : 'qcTempRelease.chkTypeId'
																												,allowBlank:false
									 																		        																									,xtype : 'mtdiccombo'
													,editable : true
													,lazyInit : false
													,forceSelection : false
													,itemKey : 'QC_PFFS'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '是否允许填写备注&YorN',	
									 																			hiddenName : 'qcTempRelease.allowRemark'
																												,allowBlank:false
									 																		        																									,xtype : 'mtdiccombo'
													,editable : true
													,lazyInit : false
													,forceSelection : false
													,itemKey : 'YorN'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '是否允许复议&YorN',	
									 																			hiddenName : 'qcTempRelease.allowRecheck'
																												,allowBlank:false
									 																		        																									,xtype : 'mtdiccombo'
													,editable : true
													,lazyInit : false
													,forceSelection : false
													,itemKey : 'YorN'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '基础分',	
									 																			name : 'qcTempRelease.baseScore'
																												,allowBlank:false
									 									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '最低分',	
									 																			name : 'qcTempRelease.minScore'
																												,allowBlank:false
									 									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '最高分',	
									 																			name : 'qcTempRelease.maxScore'
																												,allowBlank:false
									 									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '开始时间',	
									 																			name : 'qcTempRelease.staDat'
																												,allowBlank:false
									 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '结束时间',	
									 																			name : 'qcTempRelease.endDat'
																												,allowBlank:false
									 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '发布文件',	
									 																			name : 'qcTempRelease.releaseFilePath'
																												,allowBlank:false
									 																			 											,xtype:'textarea'
																															 										,maxLength: 2048
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '备注',	
									 																			name : 'qcTempRelease.remark'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 2048
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '发布人ID',	
									 																			name : 'qcTempRelease.relaseUseId'
																												,allowBlank:false
									 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '发布日期',	
									 																			name : 'qcTempRelease.relaseDat'
																												,allowBlank:false
									 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '状态：有效、注销&QC_ZT',	
									 																			hiddenName : 'qcTempRelease.staId'
																												,allowBlank:false
									 																		        																									,xtype : 'mtdiccombo'
													,editable : true
													,lazyInit : false
													,forceSelection : false
													,itemKey : 'QC_ZT'
																																 															}
							 							
																																			]
						});
				//加载表单对应的数据	
				if (this.tempReleId != null && this.tempReleId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/qucon/getQcTempRelease.do?tempReleId='+ this.tempReleId,
								root : 'data',
								preName : 'qcTempRelease'
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
						url:__ctxPath + '/qucon/saveQcTempRelease.do',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('QcTempReleaseGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});