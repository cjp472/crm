/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class ConBwListTimeRulForm
 * @extends Ext.Window
 * @description ConBwListTimeRul表单
 * @company 优创融联科技
 */
ConBwListTimeRulForm = Ext.extend(Ext.Panel, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				ConBwListTimeRulForm.superclass.constructor.call(this, {
							id : 'ConBwListTimeRulFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[ConBwListTimeRul]详细信息',
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
							//id : 'ConBwListTimeRulForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'conBwListTimeRul.bwListTimeRulId',
								xtype : 'hidden',
								value : this.bwListTimeRulId == null ? '' : this.bwListTimeRulId
							}
																																										
														
							,{  
							    																			fieldLabel : '黑白名单ID',	
									 																			hiddenName : 'conBwListTimeRul.bwId'
																												,allowBlank:false
									 																		        											,xtype:'combo'
											,editabel : false
											,lazyInit : false
											,triggerAction : 'all'
											,store : new Ext.data.SimpleStore( {
												autoLoad : true,
												url : __ctxPath + '/customer/listbwId.do',
												fields : [ 'bwId', 'bwIdName' ],
												listeners : {
													load : function() {
														var combo = Ext.getCmp('bwId');
														var store = combo.getStore();
														var rows = [];//定义数组
														for(var i=0;i<store.getCount();i++){ //store.getCount()为store的长度
															if(store.getAt(i).data['bwId']==combo.getValue()){
																combo.setValue(store.getAt(i).data['bwIdName']);
																break;
															}
														}
													}
												}
											})
											,displayField : 'bwIdName'
											,valueField : 'bwId'
											,id : 'bwId'
																				 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '开始时间',	
									 																			name : 'conBwListTimeRul.staTime'
																												,allowBlank:false
									 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '结束时间',	
									 																			name : 'conBwListTimeRul.endTime'
																												,allowBlank:false
									 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	]
						});
				//加载表单对应的数据	
				if (this.bwListTimeRulId != null && this.bwListTimeRulId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/customer/getConBwListTimeRul.do?bwListTimeRulId='+ this.bwListTimeRulId,
								root : 'data',
								preName : 'conBwListTimeRul'
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
						url:__ctxPath + '/customer/saveConBwListTimeRul.do',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('ConBwListTimeRulGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});