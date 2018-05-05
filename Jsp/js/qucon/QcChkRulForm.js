/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class QcChkRulForm
 * @extends Ext.Window
 * @description QcChkRul表单
 * @company 优创融联科技
 */
QcChkRulForm = Ext.extend(Ext.Panel, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				QcChkRulForm.superclass.constructor.call(this, {
							id : 'QcChkRulFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[QcChkRul]详细信息',
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
							//id : 'QcChkRulForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'qcChkRul.chkRulId',
								xtype : 'hidden',
								value : this.chkRulId == null ? '' : this.chkRulId
							}
																																																								
														
							,{  
							    																			fieldLabel : '规则名称',	
									 																			name : 'qcChkRul.rulName'
																												,allowBlank:false
									 																			 										,maxLength: 256
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '考核对象类型:联络历史、工单等',	
									 																			name : 'qcChkRul.objTyeId'
																												,allowBlank:false
									 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '考核对象子类型:联络历史的录音、邮件等',	
									 																			name : 'qcChkRul.objSubTyeId'
																												,allowBlank:false
									 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '开始时间',	
									 																			name : 'qcChkRul.rulTimeSta'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '结束时间',	
									 																			name : 'qcChkRul.rulTimeEnd'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '规则状态',	
									 																			name : 'qcChkRul.rulStaId'
																												,allowBlank:false
									 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																			]
						});
				//加载表单对应的数据	
				if (this.chkRulId != null && this.chkRulId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/qucon/getQcChkRul.do?chkRulId='+ this.chkRulId,
								root : 'data',
								preName : 'qcChkRul'
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
						url:__ctxPath + '/qucon/saveQcChkRul.do',
						msgSuccess : '成功删除该记录！',
						msgFailure : '操作出错，请联系管理员！',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('QcChkRulGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});