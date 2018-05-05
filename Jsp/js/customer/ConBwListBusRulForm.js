/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class ConBwListBusRulForm
 * @extends Ext.Window
 * @description ConBwListBusRul表单
 * @company 优创融联科技
 */
ConBwListBusRulForm = Ext.extend(Ext.Panel, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				ConBwListBusRulForm.superclass.constructor.call(this, {
							id : 'ConBwListBusRulFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[ConBwListBusRul]详细信息',
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
							//id : 'ConBwListBusRulForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'conBwListBusRul.bwListBusRulId',
								xtype : 'hidden',
								value : this.bwListBusRulId == null ? '' : this.bwListBusRulId
							}
																																										
														
							,{  
							    																			fieldLabel : '黑白名单ID',	
									 																			hiddenName : 'conBwListBusRul.bwId'
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
							    																			fieldLabel : '限制类型：外呼项目、外呼活动、业务&CONXZLX',	
									 																			hiddenName : 'conBwListBusRul.staTime'
																												,allowBlank:false
									 																		        																									,xtype : 'mtdiccombo'
													,editable : true
													,lazyInit : false
													,forceSelection : false
													,itemKey : 'CONXZLX'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '业务对象',	
									 																			name : 'conBwListBusRul.busObj'
																												,allowBlank:false
									 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	]
						});
				//加载表单对应的数据	
				if (this.bwListBusRulId != null && this.bwListBusRulId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/customer/getConBwListBusRul.do?bwListBusRulId='+ this.bwListBusRulId,
								root : 'data',
								preName : 'conBwListBusRul'
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
						url:__ctxPath + '/customer/saveConBwListBusRul.do',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('ConBwListBusRulGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});