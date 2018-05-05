/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class SysTemTypeForm
 * @extends Ext.Window
 * @description SysTemType表单
 * @company 优创融联科技
 */
SysTemTypeForm = Ext.extend(Ext.Panel, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				SysTemTypeForm.superclass.constructor.call(this, {
							id : 'SysTemTypeFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[SysTemType]详细信息',
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
							//id : 'SysTemTypeForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'sysTemType.tmpTypeId',
								xtype : 'hidden',
								value : this.tmpTypeId == null ? '' : this.tmpTypeId
							}
																																																								
														
							,{  
							    																			fieldLabel : '名称',	
									 																			name : 'sysTemType.tmpTypeName'
																		 																			 										,maxLength: 30
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '备注',	
									 																			name : 'sysTemType.comMent'
																		 																			 										,maxLength: 100
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '父模板分类对象',	
									 																			name : 'sysTemType.parentId'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '更新时间',	
									 																			name : 'sysTemType.updateTime'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '状态&UK_TMP_TYPE_STATUS',	
									 																			hiddenName : 'sysTemType.ukTmpTypeStatus'
																		 																		        																									,xtype : 'mtdiccombo'
													,editable : true
													,lazyInit : false
													,forceSelection : false
													,itemKey : 'UK_TMP_TYPE_STATUS'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '顺序',	
									 																			name : 'sysTemType.kukTmpTypeSort'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																										 							
																																										 							
																																										 							
																																										 							
																																																	
														
							,{  
							    																			fieldLabel : '路径',	
									 																			name : 'sysTemType.path'
																		 																			 										,maxLength: 100
									 															}
							 							
																																			]
						});
				//加载表单对应的数据	
				if (this.tmpTypeId != null && this.tmpTypeId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/xitong/getSysTemType.do?tmpTypeId='+ this.tmpTypeId,
								root : 'data',
								preName : 'sysTemType'
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
						url:__ctxPath + '/xitong/saveSysTemType.do',
						msgSuccess : '成功删除该记录！',
						msgFailure : '操作出错，请联系管理员！',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('SysTemTypeGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});