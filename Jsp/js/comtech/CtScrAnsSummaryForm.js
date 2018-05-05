/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class CtScrAnsSummaryForm
 * @extends Ext.Window
 * @description CtScrAnsSummary表单
 * @company 优创融联科技
 */
CtScrAnsSummaryForm = Ext.extend(Ext.Panel, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				CtScrAnsSummaryForm.superclass.constructor.call(this, {
							id : 'CtScrAnsSummaryFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[CtScrAnsSummary]详细信息',
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
							//id : 'CtScrAnsSummaryForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'ctScrAnsSummary.scrAnsId',
								xtype : 'hidden',
								value : this.scrAnsId == null ? '' : this.scrAnsId
							}
																																																								
														
							,{  
							    																			fieldLabel : '话术',	
									 																			hiddenName : 'ctScrAnsSummary.scrId'
																												,allowBlank:false
									 																		        											,xtype:'combo'
											,editabel : false
											,lazyInit : false
											,triggerAction : 'all'
											,store : new Ext.data.SimpleStore( {
												autoLoad : true,
												url : __ctxPath + '/comtech/listscrId.do',
												fields : [ 'scrId', 'scrIdName' ],
												listeners : {
													load : function() {
														var combo = Ext.getCmp('scrId');
														var store = combo.getStore();
														var rows = [];//定义数组
														for(var i=0;i<store.getCount();i++){ //store.getCount()为store的长度
															if(store.getAt(i).data['scrId']==combo.getValue()){
																combo.setValue(store.getAt(i).data['scrIdName']);
																break;
															}
														}
													}
												}
											})
											,displayField : 'scrIdName'
											,valueField : 'scrId'
											,id : 'scrId'
																				 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '答卷人',	
									 																			name : 'ctScrAnsSummary.ansUseId'
																												,allowBlank:false
									 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '答卷时间',	
									 																			name : 'ctScrAnsSummary.ansTimeSta'
																												,allowBlank:false
									 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '答卷结束时间',	
									 																			name : 'ctScrAnsSummary.ansTimeEnd'
																												,allowBlank:false
									 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '备注',	
									 																			name : 'ctScrAnsSummary.ansRemark'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 2048
									 															}
							 							
																																			]
						});
				//加载表单对应的数据	
				if (this.scrAnsId != null && this.scrAnsId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/comtech/getCtScrAnsSummary.do?scrAnsId='+ this.scrAnsId,
								root : 'data',
								preName : 'ctScrAnsSummary'
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
						url:__ctxPath + '/comtech/saveCtScrAnsSummary.do',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('CtScrAnsSummaryGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});