/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class UkQiusuoHuifuForm
 * @extends Ext.Window
 * @description UkQiusuoHuifu表单
 * @company 优创融联科技
 */
UkQiusuoHuifuForm = Ext.extend(Ext.Panel, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				UkQiusuoHuifuForm.superclass.constructor.call(this, {
							id : 'UkQiusuoHuifuFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[UkQiusuoHuifu]详细信息',
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
							//id : 'UkQiusuoHuifuForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'ukQiusuoHuifu.qiusuoHuifuId',
								xtype : 'hidden',
								value : this.qiusuoHuifuId == null ? '' : this.qiusuoHuifuId
							}
																																																								
														
							,{  
							    																			fieldLabel : '求索内码',	
									 																			hiddenName : 'ukQiusuoHuifu.qiusuoId'
																		 																		        											,xtype:'combo'
											,editabel : false
											,lazyInit : false
											,triggerAction : 'all'
											,store : new Ext.data.SimpleStore( {
												autoLoad : true,
												url : __ctxPath + '/know/listqiusuoId.do',
												fields : [ 'qiusuoId', 'qiusuoIdName' ],
												listeners : {
													load : function() {
														var combo = Ext.getCmp('qiusuoId');
														var store = combo.getStore();
														var rows = [];//定义数组
														for(var i=0;i<store.getCount();i++){ //store.getCount()为store的长度
															if(store.getAt(i).data['qiusuoId']==combo.getValue()){
																combo.setValue(store.getAt(i).data['qiusuoIdName']);
																break;
															}
														}
													}
												}
											})
											,displayField : 'qiusuoIdName'
											,valueField : 'qiusuoId'
											,id : 'qiusuoId'
																				 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '回复内容',	
									 																			name : 'ukQiusuoHuifu.content'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 1000
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '回复人',	
									 																			name : 'ukQiusuoHuifu.reply'
																		 																			 										,maxLength: 200
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '回复时间',	
									 																			name : 'ukQiusuoHuifu.replytime'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							       								
																			fieldLabel : '删除标记',	
									 									hiddenName : 'ukQiusuoHuifu.isdelete'
									 									,xtype:'combo'
									,editable : false
									,mode : 'local'
									,triggerAction : 'all'
									,store : [['1',__yes],['0',__no]]
															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '修改时间',	
									 																			name : 'ukQiusuoHuifu.updatetime'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																			]
						});
				//加载表单对应的数据	
				if (this.qiusuoHuifuId != null && this.qiusuoHuifuId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/know/getUkQiusuoHuifu.do?qiusuoHuifuId='+ this.qiusuoHuifuId,
								root : 'data',
								preName : 'ukQiusuoHuifu'
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
						url:__ctxPath + '/know/saveUkQiusuoHuifu.do',
						msgSuccess : '成功删除该记录！',
						msgFailure : '操作出错，请联系管理员！',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('UkQiusuoHuifuGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});