/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class QcChkGuidFileForm
 * @extends Ext.Window
 * @description QcChkGuidFile表单
 * @company 优创融联科技
 */
QcChkGuidFileForm = Ext.extend(Ext.Panel, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				QcChkGuidFileForm.superclass.constructor.call(this, {
							id : 'QcChkGuidFileFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[QcChkGuidFile]详细信息',
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
							//id : 'QcChkGuidFileForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'qcChkGuidFile.fileId',
								xtype : 'hidden',
								value : this.fileId == null ? '' : this.fileId
							}
																																																								
														
							,{  
							    																			fieldLabel : '考核辅导内码',	
									 																			hiddenName : 'qcChkGuidFile.chkGuidId'
																		 																		        											,xtype:'combo'
											,editabel : false
											,lazyInit : false
											,triggerAction : 'all'
											,store : new Ext.data.SimpleStore( {
												autoLoad : true,
												url : __ctxPath + '/qucon/listchkGuidId.do',
												fields : [ 'chkGuidId', 'chkGuidIdName' ],
												listeners : {
													load : function() {
														var combo = Ext.getCmp('chkGuidId');
														var store = combo.getStore();
														var rows = [];//定义数组
														for(var i=0;i<store.getCount();i++){ //store.getCount()为store的长度
															if(store.getAt(i).data['chkGuidId']==combo.getValue()){
																combo.setValue(store.getAt(i).data['chkGuidIdName']);
																break;
															}
														}
													}
												}
											})
											,displayField : 'chkGuidIdName'
											,valueField : 'chkGuidId'
											,id : 'chkGuidId'
																				 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '文件系统路径(从文件服务器根目录开始,不带斜杠)',	
									 																			name : 'qcChkGuidFile.url'
																												,allowBlank:false
									 																			 											,xtype:'textarea'
																															 										,maxLength: 1024
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '文件上传名称',	
									 																			name : 'qcChkGuidFile.uploadFileName'
																												,allowBlank:false
									 																			 										,maxLength: 256
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '文件系统保存名称',	
									 																			name : 'qcChkGuidFile.systemFileName'
																												,allowBlank:false
									 																			 										,maxLength: 256
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '文件后缀，如pdf、jpg、gif、doc等',	
									 																			name : 'qcChkGuidFile.fileSuffix'
																		 																			 										,maxLength: 10
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '文件大小(bt)',	
									 																			name : 'qcChkGuidFile.fileSize'
																		 																			 										,maxLength: 20
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '创建时间 YYYY-MM-DD hh:mm:ss',	
									 																			name : 'qcChkGuidFile.createTime'
																		 																			 										,maxLength: 20
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '状态：有效 无效',	
									 																			name : 'qcChkGuidFile.staId'
																												,allowBlank:false
									 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																			]
						});
				//加载表单对应的数据	
				if (this.fileId != null && this.fileId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/qucon/getQcChkGuidFile.do?fileId='+ this.fileId,
								root : 'data',
								preName : 'qcChkGuidFile'
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
						url:__ctxPath + '/qucon/saveQcChkGuidFile.do',
						msgSuccess : '成功删除该记录！',
						msgFailure : '操作出错，请联系管理员！',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('QcChkGuidFileGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});