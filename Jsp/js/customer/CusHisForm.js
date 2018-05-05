/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class CusHisForm
 * @extends Ext.Window
 * @description CusHis表单
 * @company 优创融联科技
 */
CusHisForm = Ext.extend(Ext.Panel, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				CusHisForm.superclass.constructor.call(this, {
							id : 'CusHisFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[CusHis]详细信息',
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
							//id : 'CusHisForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'cusHis.opeHisId',
								xtype : 'hidden',
								value : this.opeHisId == null ? '' : this.opeHisId
							}
																																																								
														
							,{  
							    																			fieldLabel : '客户ID',	
									 																			hiddenName : 'cusHis.customerid'
																												,allowBlank:false
									 																		        											,xtype:'combo'
											,editabel : false
											,lazyInit : false
											,triggerAction : 'all'
											,store : new Ext.data.SimpleStore( {
												autoLoad : true,
												url : __ctxPath + '/financial/combocustomerid.do',
												fields : [ 'customerid', 'customeridName' ],
												listeners : {
													load : function() {
														var combo = Ext.getCmp('customerid');
														var store = combo.getStore();
														var rows = [];//定义数组
														for(var i=0;i<store.getCount();i++){ //store.getCount()为store的长度
															if(store.getAt(i).data['customerid']==combo.getValue()){
																combo.setValue(store.getAt(i).data['customeridName']);
																break;
															}
														}
													}
												}
											})
											,displayField : 'customeridName'
											,valueField : 'customerid'
											,id : 'customerid'
																				 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '操作人',	
									 																			name : 'cusHis.opeUseId'
																												,allowBlank:false
									 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '记录时间',	
									 																			name : 'cusHis.rowDat'
																												,allowBlank:false
									 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '操作类型：手工录入、导入、复制生成、修改、分配、回收、拨打',	
									 																			name : 'cusHis.opeTypId'
																												,allowBlank:false
									 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '操作结果描述',	
									 																			name : 'cusHis.opeResDesc'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 2048
									 															}
							 							
																																			]
						});
				//加载表单对应的数据	
				if (this.opeHisId != null && this.opeHisId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/customer/getCusHis.do?opeHisId='+ this.opeHisId,
								root : 'data',
								preName : 'cusHis'
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
				$postForm({
						formPanel:this.formPanel,
						scope:this,
						url:__ctxPath + '/customer/saveCusHis.do',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('CusHisGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});