/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class CtScrTemGotoRuleForm
 * @extends Ext.Window
 * @description CtScrTemGotoRule表单
 * @company 优创融联科技
 */
CtScrTemGotoRuleForm = Ext.extend(Ext.Panel, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				CtScrTemGotoRuleForm.superclass.constructor.call(this, {
							id : 'CtScrTemGotoRuleFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[CtScrTemGotoRule]详细信息',
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
							//id : 'CtScrTemGotoRuleForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'ctScrTemGotoRule.scrTemGotoRuleId',
								xtype : 'hidden',
								value : this.scrTemGotoRuleId == null ? '' : this.scrTemGotoRuleId
							}
																																																								
														
							,{  
							    																			fieldLabel : '话术',	
									 																			hiddenName : 'ctScrTemGotoRule.tmpId'
																												,allowBlank:false
									 																		        											,xtype:'combo'
											,editabel : false
											,lazyInit : false
											,triggerAction : 'all'
											,store : new Ext.data.SimpleStore( {
												autoLoad : true,
												url : __ctxPath + '/comtech/listtmpId.do',
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
							    																			fieldLabel : '题目',	
									 																			name : 'ctScrTemGotoRule.queId'
																												,allowBlank:false
									 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '题项编号：对应数据字典或题项表ID',	
									 																			name : 'ctScrTemGotoRule.optVal'
																												,allowBlank:false
									 																			 										,maxLength: 128
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '目标题目',	
									 																			hiddenName : 'ctScrTemGotoRule.tarQueId'
																												,allowBlank:false
									 																		        											,xtype:'combo'
											,editabel : false
											,lazyInit : false
											,triggerAction : 'all'
											,store : new Ext.data.SimpleStore( {
												autoLoad : true,
												url : __ctxPath + '/comtech/listtarQueId.do',
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
				if (this.scrTemGotoRuleId != null && this.scrTemGotoRuleId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/comtech/getCtScrTemGotoRule.do?scrTemGotoRuleId='+ this.scrTemGotoRuleId,
								root : 'data',
								preName : 'ctScrTemGotoRule'
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
						url:__ctxPath + '/comtech/saveCtScrTemGotoRule.do',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('CtScrTemGotoRuleGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});