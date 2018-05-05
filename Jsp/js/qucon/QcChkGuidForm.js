/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class QcChkGuidForm
 * @extends Ext.Window
 * @description QcChkGuid表单
 * @company 优创融联科技
 */
QcChkGuidForm = Ext.extend(Ext.Panel, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				QcChkGuidForm.superclass.constructor.call(this, {
							id : 'QcChkGuidFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[QcChkGuid]详细信息',
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
							//id : 'QcChkGuidForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'qcChkGuid.chkGuidId',
								xtype : 'hidden',
								value : this.chkGuidId == null ? '' : this.chkGuidId
							}
																																																								
														
							,{  
							    																			fieldLabel : '考核结果内码',	
									 																			hiddenName : 'qcChkGuid.chkId'
																												,allowBlank:false
									 																		        											,xtype:'combo'
											,editabel : false
											,lazyInit : false
											,triggerAction : 'all'
											,store : new Ext.data.SimpleStore( {
												autoLoad : true,
												url : __ctxPath + '/qucon/listchkId.do',
												fields : [ 'chkId', 'chkIdName' ],
												listeners : {
													load : function() {
														var combo = Ext.getCmp('chkId');
														var store = combo.getStore();
														var rows = [];//定义数组
														for(var i=0;i<store.getCount();i++){ //store.getCount()为store的长度
															if(store.getAt(i).data['chkId']==combo.getValue()){
																combo.setValue(store.getAt(i).data['chkIdName']);
																break;
															}
														}
													}
												}
											})
											,displayField : 'chkIdName'
											,valueField : 'chkId'
											,id : 'chkId'
																				 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '辅导人',	
									 																			name : 'qcChkGuid.guidUseId'
																												,allowBlank:false
									 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '辅导说明',	
									 																			name : 'qcChkGuid.guidContent'
																												,allowBlank:false
									 																			 											,xtype:'textarea'
																															 										,maxLength: 2048
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '辅导备注',	
									 																			name : 'qcChkGuid.guidRemark'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 2048
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '创建人ID',	
									 																			name : 'qcChkGuid.creUseId'
																												,allowBlank:false
									 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '创建日期',	
									 																			name : 'qcChkGuid.creDat'
																												,allowBlank:false
									 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '修改人ID',	
									 																			name : 'qcChkGuid.updUseId'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '修改日期',	
									 																			name : 'qcChkGuid.updDat'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																			]
						});
				//加载表单对应的数据	
				if (this.chkGuidId != null && this.chkGuidId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/qucon/getQcChkGuid.do?chkGuidId='+ this.chkGuidId,
								root : 'data',
								preName : 'qcChkGuid'
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
						url:__ctxPath + '/qucon/saveQcChkGuid.do',
						msgSuccess : '成功删除该记录！',
						msgFailure : '操作出错，请联系管理员！',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('QcChkGuidGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});