/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class QcChkListForm
 * @extends Ext.Window
 * @description QcChkList表单
 * @company 优创融联科技
 */
QcChkListForm = Ext.extend(Ext.Panel, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				QcChkListForm.superclass.constructor.call(this, {
							id : 'QcChkListFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[QcChkList]详细信息',
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
							//id : 'QcChkListForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'qcChkList.chkListId',
								xtype : 'hidden',
								value : this.chkListId == null ? '' : this.chkListId
							}
																																																								
														
							,{  
							    																			fieldLabel : '质检人',	
									 																			name : 'qcChkList.chkUseId'
																												,allowBlank:false
									 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '考核对象类型:联络历史、工单等',	
									 																			name : 'qcChkList.objTyeId'
																												,allowBlank:false
									 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '对象编号',	
									 																			name : 'qcChkList.objId'
																												,allowBlank:false
									 																			 										,maxLength: 100
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '分配时间',	
									 																			name : 'qcChkList.assTime'
																												,allowBlank:false
									 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '考核状态',	
									 																			name : 'qcChkList.chkStaId'
																												,allowBlank:false
									 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '考核开始时间',	
									 																			name : 'qcChkList.chkTimeSta'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '考核完成时间',	
									 																			name : 'qcChkList.chkTimeEnd'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																			]
						});
				//加载表单对应的数据	
				if (this.chkListId != null && this.chkListId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/qucon/getQcChkList.do?chkListId='+ this.chkListId,
								root : 'data',
								preName : 'qcChkList'
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
						url:__ctxPath + '/qucon/saveQcChkList.do',
						msgSuccess : '成功删除该记录！',
						msgFailure : '操作出错，请联系管理员！',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('QcChkListGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});