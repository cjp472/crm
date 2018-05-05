/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class UkQiusuoForm
 * @extends Ext.Window
 * @description UkQiusuo表单
 * @company 优创融联科技
 */
UkQiusuoForm = Ext.extend(Ext.Panel, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				UkQiusuoForm.superclass.constructor.call(this, {
							id : 'UkQiusuoFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[UkQiusuo]详细信息',
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
							//id : 'UkQiusuoForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'ukQiusuo.qiusuoId',
								xtype : 'hidden',
								value : this.qiusuoId == null ? '' : this.qiusuoId
							}
																																																								
														
							,{  
							    																			fieldLabel : '内容',	
									 																			name : 'ukQiusuo.content'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 1000
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '发起时间',	
									 																			name : 'ukQiusuo.createtime'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '发起人',	
									 																			name : 'ukQiusuo.createby'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '状态',	
									 																			name : 'ukQiusuo.status'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '悬赏分数',	
									 																			name : 'ukQiusuo.score'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '说明',	
									 																			name : 'ukQiusuo.mark'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 1000
									 															}
							 							
																																			]
						});
				//加载表单对应的数据	
				if (this.qiusuoId != null && this.qiusuoId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/know/getUkQiusuo.do?qiusuoId='+ this.qiusuoId,
								root : 'data',
								preName : 'ukQiusuo'
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
						url:__ctxPath + '/know/saveUkQiusuo.do',
						msgSuccess : '成功删除该记录！',
						msgFailure : '操作出错，请联系管理员！',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('UkQiusuoGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});