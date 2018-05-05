/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class UnimAssTarParForm
 * @extends Ext.Window
 * @description UnimAssTarPar表单
 * @company 优创融联科技
 */
UnimAssTarParForm = Ext.extend(Ext.Panel, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				UnimAssTarParForm.superclass.constructor.call(this, {
							id : 'UnimAssTarParFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[UnimAssTarPar]详细信息',
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
							//id : 'UnimAssTarParForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'unimAssTarPar.paraId',
								xtype : 'hidden',
								value : this.paraId == null ? '' : this.paraId
							}
																																																								
														
							,{  
							    																			fieldLabel : '资产ID',	
									 																			hiddenName : 'unimAssTarPar.assetsId'
																												,allowBlank:false
									 																		        											,xtype:'combo'
											,editabel : false
											,lazyInit : false
											,triggerAction : 'all'
											,store : new Ext.data.SimpleStore( {
												autoLoad : true,
												url : __ctxPath + '/unim/listassetsId.do',
												fields : [ 'assetsId', 'assetsIdName' ],
												listeners : {
													load : function() {
														var combo = Ext.getCmp('assetsId');
														var store = combo.getStore();
														var rows = [];//定义数组
														for(var i=0;i<store.getCount();i++){ //store.getCount()为store的长度
															if(store.getAt(i).data['assetsId']==combo.getValue()){
																combo.setValue(store.getAt(i).data['assetsIdName']);
																break;
															}
														}
													}
												}
											})
											,displayField : 'assetsIdName'
											,valueField : 'assetsId'
											,id : 'assetsId'
																				 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '指标ID',	
									 																			hiddenName : 'unimAssTarPar.targetId'
																												,allowBlank:false
									 																		        											,xtype:'combo'
											,editabel : false
											,lazyInit : false
											,triggerAction : 'all'
											,store : new Ext.data.SimpleStore( {
												autoLoad : true,
												url : __ctxPath + '/unim/listtargetId.do',
												fields : [ 'targetId', 'targetIdName' ],
												listeners : {
													load : function() {
														var combo = Ext.getCmp('targetId');
														var store = combo.getStore();
														var rows = [];//定义数组
														for(var i=0;i<store.getCount();i++){ //store.getCount()为store的长度
															if(store.getAt(i).data['targetId']==combo.getValue()){
																combo.setValue(store.getAt(i).data['targetIdName']);
																break;
															}
														}
													}
												}
											})
											,displayField : 'targetIdName'
											,valueField : 'targetId'
											,id : 'targetId'
																				 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '参数名称',	
									 																			name : 'unimAssTarPar.paraName'
																												,allowBlank:false
									 																			 										,maxLength: 128
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '参数值',	
									 																			name : 'unimAssTarPar.paraValue'
																												,allowBlank:false
									 																			 										,maxLength: 128
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '备注',	
									 																			name : 'unimAssTarPar.remark'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 4000
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '顺序号',	
									 																			name : 'unimAssTarPar.orderno'
																												,allowBlank:false
									 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '状态：启用、注销',	
									 																			name : 'unimAssTarPar.status'
																												,allowBlank:false
									 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																			]
						});
				//加载表单对应的数据	
				if (this.paraId != null && this.paraId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/unim/getUnimAssTarPar.do?paraId='+ this.paraId,
								root : 'data',
								preName : 'unimAssTarPar'
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
						url:__ctxPath + '/unim/saveUnimAssTarPar.do',
						msgSuccess : '成功删除该记录！',
						msgFailure : '操作出错，请联系管理员！',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('UnimAssTarParGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});