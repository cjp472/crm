/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class UnimChannelNavigationForm
 * @extends Ext.Window
 * @description UnimChannelNavigation表单
 * @company 优创融联科技
 */
UnimChannelNavigationForm = Ext.extend(Ext.Panel, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				UnimChannelNavigationForm.superclass.constructor.call(this, {
							id : 'UnimChannelNavigationFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[UnimChannelNavigation]详细信息',
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
							//id : 'UnimChannelNavigationForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'unimChannelNavigation.mapNavId',
								xtype : 'hidden',
								value : this.mapNavId == null ? '' : this.mapNavId
							}
																																																								
														
							,{  
							    																			fieldLabel : '导航名称',	
									 																			name : 'unimChannelNavigation.navName'
																		 																			 										,maxLength: 64
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '上级节点',	
									 																			name : 'unimChannelNavigation.parentid'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '顺序号',	
									 																			name : 'unimChannelNavigation.orderno'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '状态：未启用 启用 注销',	
									 																			name : 'unimChannelNavigation.status'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '备注',	
									 																			name : 'unimChannelNavigation.remark'
																		 																			 										,maxLength: 256
									 															}
							 							
																																			]
						});
				//加载表单对应的数据	
				if (this.mapNavId != null && this.mapNavId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/unim/getUnimChannelNavigation.do?mapNavId='+ this.mapNavId,
								root : 'data',
								preName : 'unimChannelNavigation'
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
						url:__ctxPath + '/unim/saveUnimChannelNavigation.do',
						msgSuccess : '成功删除该记录！',
						msgFailure : '操作出错，请联系管理员！',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('UnimChannelNavigationGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});