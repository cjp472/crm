/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class ObSaletaskForm
 * @extends Ext.Window
 * @description ObSaletask表单
 * @company 优创融联科技
 */
ObSaletaskForm = Ext.extend(Ext.Panel, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				ObSaletaskForm.superclass.constructor.call(this, {
							id : 'ObSaletaskFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[ObSaletask]详细信息',
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
							//id : 'ObSaletaskForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'obSaletask.saletaskId',
								xtype : 'hidden',
								value : this.saletaskId == null ? '' : this.saletaskId
							}
																																																								
														
							,{  
							    																			fieldLabel : '任务内码',	
									 																			name : 'obSaletask.tasId'
																												,allowBlank:false
									 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '名单获取方式：0=指定名单 1=取名单池&CONOB_SALETASK_MDHQFS',	
									 																			hiddenName : 'obSaletask.typId'
																												,allowBlank:false
									 																		        																									,xtype : 'mtdiccombo'
													,editable : true
													,lazyInit : false
													,forceSelection : false
													,itemKey : 'CONOB_SALETASK_MDHQFS'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '用户组内码：名单池营销必填',	
									 																			name : 'obSaletask.cusGrpId'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '执行坐席内码：名单营销必填',	
									 																			name : 'obSaletask.useId'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '客户内码',	
									 																			name : 'obSaletask.cusId'
																												,allowBlank:false
									 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '分配历史内码',	
									 																			hiddenName : 'obSaletask.callbatchAssId'
																		 																		        											,xtype:'combo'
											,editabel : false
											,lazyInit : false
											,triggerAction : 'all'
											,store : new Ext.data.SimpleStore( {
												autoLoad : true,
												url : __ctxPath + '/outb/listcallbatchAssId.do',
												fields : [ 'callbatchAssId', 'callbatchAssIdName' ],
												listeners : {
													load : function() {
														var combo = Ext.getCmp('callbatchAssId');
														var store = combo.getStore();
														var rows = [];//定义数组
														for(var i=0;i<store.getCount();i++){ //store.getCount()为store的长度
															if(store.getAt(i).data['callbatchAssId']==combo.getValue()){
																combo.setValue(store.getAt(i).data['callbatchAssIdName']);
																break;
															}
														}
													}
												}
											})
											,displayField : 'callbatchAssIdName'
											,valueField : 'callbatchAssId'
											,id : 'callbatchAssId'
																				 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '名单批次内码',	
									 																			hiddenName : 'obSaletask.callbatchId'
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
							    																			fieldLabel : '批次名称',	
									 																			name : 'obSaletask.callbatchNam'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 512
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '名单列表内码',	
									 																			hiddenName : 'obSaletask.calllistId'
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
							    																			fieldLabel : '名单列表名称',	
									 																			name : 'obSaletask.calllistNam'
																		 																			 										,maxLength: 128
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '外拨活动内码',	
									 																			hiddenName : 'obSaletask.comId'
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
							    																			fieldLabel : '活动主题',	
									 																			name : 'obSaletask.comNam'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 1024
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '分配时间',	
									 																			name : 'obSaletask.asgDat'
																												,allowBlank:false
									 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '预约时间',	
									 																			name : 'obSaletask.booTim'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '预约备注',	
									 																			name : 'obSaletask.booRemark'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 1024
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '已外拨次数',	
									 																			name : 'obSaletask.diaCou'
																												,allowBlank:false
									 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '拨打结果：拨打结果定义表&CONOB_SALETASK_BDJG',	
									 																			hiddenName : 'obSaletask.conStaId'
																		 																		        																									,xtype : 'mtdiccombo'
													,editable : true
													,lazyInit : false
													,forceSelection : false
													,itemKey : 'CONOB_SALETASK_BDJG'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '首次拨打时间',	
									 																			name : 'obSaletask.firstDiaDat'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '最后拨打时间',	
									 																			name : 'obSaletask.lastDiaDat'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '结果描述',	
									 																			name : 'obSaletask.des'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 2048
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '营销状态：业务自定义回写&CONOB_SALETASK_YXZT',	
									 																			hiddenName : 'obSaletask.busiStaId'
																		 																		        																									,xtype : 'mtdiccombo'
													,editable : true
													,lazyInit : false
													,forceSelection : false
													,itemKey : 'CONOB_SALETASK_YXZT'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '营销结果：对应生成结果的内码&CONOB_SALETASK_YXJG',	
									 																			hiddenName : 'obSaletask.busiRelId'
																		 																		        																									,xtype : 'mtdiccombo'
													,editable : true
													,lazyInit : false
													,forceSelection : false
													,itemKey : 'CONOB_SALETASK_YXJG'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '服务类型：0-可自定义，1-挽留、2-扣款失败通知等&CONOB_SALETASK_FWLX',	
									 																			hiddenName : 'obSaletask.servTypId'
																		 																		        																									,xtype : 'mtdiccombo'
													,editable : true
													,lazyInit : false
													,forceSelection : false
													,itemKey : 'CONOB_SALETASK_FWLX'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '服务状态：0-处理中、1-已关闭&CONOB_SALETASK_FWZT',	
									 																			hiddenName : 'obSaletask.servStaId'
																		 																		        																									,xtype : 'mtdiccombo'
													,editable : true
													,lazyInit : false
													,forceSelection : false
													,itemKey : 'CONOB_SALETASK_FWZT'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '任务状态：回收、撤销',	
									 																			name : 'obSaletask.taskStaId'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																			]
						});
				//加载表单对应的数据	
				if (this.saletaskId != null && this.saletaskId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/outb/getObSaletask.do?saletaskId='+ this.saletaskId,
								root : 'data',
								preName : 'obSaletask'
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
						url:__ctxPath + '/outb/saveObSaletask.do',
						msgSuccess : '成功删除该记录！',
						msgFailure : '操作出错，请联系管理员！',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('ObSaletaskGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});