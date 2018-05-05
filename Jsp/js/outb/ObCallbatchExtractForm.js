/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class ObCallbatchExtractForm
 * @extends Ext.Window
 * @description ObCallbatchExtract表单
 * @company 优创融联科技
 */
ObCallbatchExtractForm = Ext.extend(Ext.Panel, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				ObCallbatchExtractForm.superclass.constructor.call(this, {
							id : 'ObCallbatchExtractFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[ObCallbatchExtract]详细信息',
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
							//id : 'ObCallbatchExtractForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'obCallbatchExtract.extractId',
								xtype : 'hidden',
								value : this.extractId == null ? '' : this.extractId
							}
																																																								
														
							,{  
							    																			fieldLabel : '抽取人',	
									 																			name : 'obCallbatchExtract.userId'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '来源批次',	
									 																			name : 'obCallbatchExtract.fromCallbatchId'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '目标批次',	
									 																			name : 'obCallbatchExtract.toCallbatchId'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '抽取时间',	
									 																			name : 'obCallbatchExtract.staDat'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																			]
						});
				//加载表单对应的数据	
				if (this.extractId != null && this.extractId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/outb/getObCallbatchExtract.do?extractId='+ this.extractId,
								root : 'data',
								preName : 'obCallbatchExtract'
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
						url:__ctxPath + '/outb/saveObCallbatchExtract.do',
						msgSuccess : '成功删除该记录！',
						msgFailure : '操作出错，请联系管理员！',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('ObCallbatchExtractGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});