/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class SysParaOptForm
 * @extends Ext.Window
 * @description SysParaOpt表单
 * @company 优创融联科技
 */
SysParaOptForm = Ext.extend(Ext.Panel, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				SysParaOptForm.superclass.constructor.call(this, {
							id : 'SysParaOptFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[SysParaOpt]详细信息',
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
							//id : 'SysParaOptForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'sysParaOpt.sysParaOptId',
								xtype : 'hidden',
								value : this.sysParaOptId == null ? '' : this.sysParaOptId
							}
																																																								
														
							,{  
							    																			fieldLabel : '系统参数内码',	
									 																			hiddenName : 'sysParaOpt.sysParaId'
																		 																		        											,xtype:'combo'
											,editabel : false
											,lazyInit : false
											,triggerAction : 'all'
											,store : new Ext.data.SimpleStore( {
												autoLoad : true,
												url : __ctxPath + '/customer/listsysParaId.do',
												fields : [ 'sysParaId', 'sysParaIdName' ],
												listeners : {
													load : function() {
														var combo = Ext.getCmp('sysParaId');
														var store = combo.getStore();
														var rows = [];//定义数组
														for(var i=0;i<store.getCount();i++){ //store.getCount()为store的长度
															if(store.getAt(i).data['sysParaId']==combo.getValue()){
																combo.setValue(store.getAt(i).data['sysParaIdName']);
																break;
															}
														}
													}
												}
											})
											,displayField : 'sysParaIdName'
											,valueField : 'sysParaId'
											,id : 'sysParaId'
																				 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '系统参数选项名称',	
									 																			name : 'sysParaOpt.sysParaOptName'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 512
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '系统参数选项值',	
									 																			name : 'sysParaOpt.sysParaOptValue'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 512
									 															}
							 							
																																			]
						});
				//加载表单对应的数据	
				if (this.sysParaOptId != null && this.sysParaOptId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/customer/getSysParaOpt.do?sysParaOptId='+ this.sysParaOptId,
								root : 'data',
								preName : 'sysParaOpt'
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
						url:__ctxPath + '/customer/saveSysParaOpt.do',
						msgSuccess : '成功删除该记录！',
						msgFailure : '操作出错，请联系管理员！',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('SysParaOptGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});