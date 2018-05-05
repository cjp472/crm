/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class QcChkRulDetailForm
 * @extends Ext.Window
 * @description QcChkRulDetail表单
 * @company 优创融联科技
 */
QcChkRulDetailForm = Ext.extend(Ext.Panel, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				QcChkRulDetailForm.superclass.constructor.call(this, {
							id : 'QcChkRulDetailFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[QcChkRulDetail]详细信息',
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
							//id : 'QcChkRulDetailForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'qcChkRulDetail.detailId',
								xtype : 'hidden',
								value : this.detailId == null ? '' : this.detailId
							}
																																																								
														
							,{  
							    																			fieldLabel : '考核规则内码',	
									 																			name : 'qcChkRulDetail.chkRulId'
																												,allowBlank:false
									 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '方式:按百分比、指定个数',	
									 																			name : 'qcChkRulDetail.typId'
																												,allowBlank:false
									 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '值',	
									 																			name : 'qcChkRulDetail.val'
																												,allowBlank:false
									 																			 										,maxLength: 10
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '条件开始值',	
									 																			name : 'qcChkRulDetail.valSta'
																		 																			 										,maxLength: 10
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '条件结束值',	
									 																			name : 'qcChkRulDetail.valEnd'
																		 																			 										,maxLength: 10
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '规则状态',	
									 																			name : 'qcChkRulDetail.rulStaId'
																												,allowBlank:false
									 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																			]
						});
				//加载表单对应的数据	
				if (this.detailId != null && this.detailId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/qucon/getQcChkRulDetail.do?detailId='+ this.detailId,
								root : 'data',
								preName : 'qcChkRulDetail'
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
						url:__ctxPath + '/qucon/saveQcChkRulDetail.do',
						msgSuccess : '成功删除该记录！',
						msgFailure : '操作出错，请联系管理员！',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('QcChkRulDetailGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});