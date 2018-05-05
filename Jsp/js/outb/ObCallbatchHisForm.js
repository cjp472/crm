/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class ObCallbatchHisForm
 * @extends Ext.Window
 * @description ObCallbatchHis表单
 * @company 优创融联科技
 */
ObCallbatchHisForm = Ext.extend(Ext.Panel, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				ObCallbatchHisForm.superclass.constructor.call(this, {
							id : 'ObCallbatchHisFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[ObCallbatchHis]详细信息',
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
							//id : 'ObCallbatchHisForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'obCallbatchHis.opeHisId',
								xtype : 'hidden',
								value : this.opeHisId == null ? '' : this.opeHisId
							}
																																																								
														
							,{  
							    																			fieldLabel : '名单批次内码',	
									 																			hiddenName : 'obCallbatchHis.callbatchId'
																												,allowBlank:false
									 																		        											,xtype:'combo'
											,editabel : false
											,lazyInit : false
											,triggerAction : 'all'
											,store : new Ext.data.SimpleStore( {
												autoLoad : true,
												url : __ctxPath + '/outb/listcallbatchId.do',
												fields : [ 'callbatchId', 'callbatchIdName' ],
												listeners : {
													load : function() {
														var combo = Ext.getCmp('callbatchId');
														var store = combo.getStore();
														var rows = [];//定义数组
														for(var i=0;i<store.getCount();i++){ //store.getCount()为store的长度
															if(store.getAt(i).data['callbatchId']==combo.getValue()){
																combo.setValue(store.getAt(i).data['callbatchIdName']);
																break;
															}
														}
													}
												}
											})
											,displayField : 'callbatchIdName'
											,valueField : 'callbatchId'
											,id : 'callbatchId'
																				 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '名单列表内码',	
									 																			hiddenName : 'obCallbatchHis.calllistId'
																												,allowBlank:false
									 																		        											,xtype:'combo'
											,editabel : false
											,lazyInit : false
											,triggerAction : 'all'
											,store : new Ext.data.SimpleStore( {
												autoLoad : true,
												url : __ctxPath + '/outb/listcalllistId.do',
												fields : [ 'calllistId', 'calllistIdName' ],
												listeners : {
													load : function() {
														var combo = Ext.getCmp('calllistId');
														var store = combo.getStore();
														var rows = [];//定义数组
														for(var i=0;i<store.getCount();i++){ //store.getCount()为store的长度
															if(store.getAt(i).data['calllistId']==combo.getValue()){
																combo.setValue(store.getAt(i).data['calllistIdName']);
																break;
															}
														}
													}
												}
											})
											,displayField : 'calllistIdName'
											,valueField : 'calllistId'
											,id : 'calllistId'
																				 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '活动内码',	
									 																			hiddenName : 'obCallbatchHis.comId'
																												,allowBlank:false
									 																		        											,xtype:'combo'
											,editabel : false
											,lazyInit : false
											,triggerAction : 'all'
											,store : new Ext.data.SimpleStore( {
												autoLoad : true,
												url : __ctxPath + '/outb/listcomId.do',
												fields : [ 'comId', 'comIdName' ],
												listeners : {
													load : function() {
														var combo = Ext.getCmp('comId');
														var store = combo.getStore();
														var rows = [];//定义数组
														for(var i=0;i<store.getCount();i++){ //store.getCount()为store的长度
															if(store.getAt(i).data['comId']==combo.getValue()){
																combo.setValue(store.getAt(i).data['comIdName']);
																break;
															}
														}
													}
												}
											})
											,displayField : 'comIdName'
											,valueField : 'comId'
											,id : 'comId'
																				 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '记录时间',	
									 																			name : 'obCallbatchHis.rowDat'
																												,allowBlank:false
									 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '操作人',	
									 																			name : 'obCallbatchHis.opeUseId'
																												,allowBlank:false
									 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '操作类型：0-创建、1-分配、2-回收&OB_CALLBATCH_HIS_CZLX',	
									 																			hiddenName : 'obCallbatchHis.opeTypId'
																												,allowBlank:false
									 																		        																									,xtype : 'mtdiccombo'
													,editable : true
													,lazyInit : false
													,forceSelection : false
													,itemKey : 'OB_CALLBATCH_HIS_CZLX'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '操作结果描述',	
									 																			name : 'obCallbatchHis.opeResDesc'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 2048
									 															}
							 							
																																			]
						});
				//加载表单对应的数据	
				if (this.opeHisId != null && this.opeHisId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/outb/getObCallbatchHis.do?opeHisId='+ this.opeHisId,
								root : 'data',
								preName : 'obCallbatchHis'
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
						url:__ctxPath + '/outb/saveObCallbatchHis.do',
						msgSuccess : '成功删除该记录！',
						msgFailure : '操作出错，请联系管理员！',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('ObCallbatchHisGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});