/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class PapTemGotoRuleForm
 * @extends Ext.Window
 * @description PapTemGotoRule表单
 * @company 优创融联科技
 */
PapTemGotoRuleForm = Ext.extend(Ext.Panel, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				PapTemGotoRuleForm.superclass.constructor.call(this, {
							id : 'PapTemGotoRuleFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[PapTemGotoRule]详细信息',
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
							//id : 'PapTemGotoRuleForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'papTemGotoRule.temGotoRuleId',
								xtype : 'hidden',
								value : this.temGotoRuleId == null ? '' : this.temGotoRuleId
							}
																																																								
														
							,{  
							    																			fieldLabel : '话术模板ID',	
									 																			hiddenName : 'papTemGotoRule.tmpId'
																												,allowBlank:false
									 																		        											,xtype:'combo'
											,editabel : false
											,lazyInit : false
											,triggerAction : 'all'
											,store : new Ext.data.SimpleStore( {
												autoLoad : true,
												url : __ctxPath + '/pap/listtmpId.do',
												fields : [ 'tmpId', 'tmpIdName' ],
												listeners : {
													load : function() {
														var combo = Ext.getCmp('tmpId');
														var store = combo.getStore();
														var rows = [];//定义数组
														for(var i=0;i<store.getCount();i++){ //store.getCount()为store的长度
															if(store.getAt(i).data['tmpId']==combo.getValue()){
																combo.setValue(store.getAt(i).data['tmpIdName']);
																break;
															}
														}
													}
												}
											})
											,displayField : 'tmpIdName'
											,valueField : 'tmpId'
											,id : 'tmpId'
																				 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '题目编号ID',	
									 																			name : 'papTemGotoRule.queId'
																												,allowBlank:false
									 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '题项编号：对应数据字典或题项表ID',	
									 																			name : 'papTemGotoRule.optVal'
																												,allowBlank:false
									 																			 										,maxLength: 128
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '目标题目ID',	
									 																			hiddenName : 'papTemGotoRule.tarQueId'
																												,allowBlank:false
									 																		        											,xtype:'combo'
											,editabel : false
											,lazyInit : false
											,triggerAction : 'all'
											,store : new Ext.data.SimpleStore( {
												autoLoad : true,
												url : __ctxPath + '/pap/listtarQueId.do',
												fields : [ 'tarQueId', 'tarQueIdName' ],
												listeners : {
													load : function() {
														var combo = Ext.getCmp('tarQueId');
														var store = combo.getStore();
														var rows = [];//定义数组
														for(var i=0;i<store.getCount();i++){ //store.getCount()为store的长度
															if(store.getAt(i).data['tarQueId']==combo.getValue()){
																combo.setValue(store.getAt(i).data['tarQueIdName']);
																break;
															}
														}
													}
												}
											})
											,displayField : 'tarQueIdName'
											,valueField : 'tarQueId'
											,id : 'tarQueId'
																				 															}
							 							
																																			]
						});
				//加载表单对应的数据	
				if (this.temGotoRuleId != null && this.temGotoRuleId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/pap/getPapTemGotoRule.do?temGotoRuleId='+ this.temGotoRuleId,
								root : 'data',
								preName : 'papTemGotoRule'
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
						url:__ctxPath + '/pap/savePapTemGotoRule.do',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('PapTemGotoRuleGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});