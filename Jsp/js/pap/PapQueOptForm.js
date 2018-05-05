/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class PapQueOptForm
 * @extends Ext.Window
 * @description PapQueOpt表单
 * @company 优创融联科技
 */
PapQueOptForm = Ext.extend(Ext.Panel, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				PapQueOptForm.superclass.constructor.call(this, {
							id : 'PapQueOptFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[PapQueOpt]详细信息',
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
							//id : 'PapQueOptForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'papQueOpt.optId',
								xtype : 'hidden',
								value : this.optId == null ? '' : this.optId
							}
																																																								
														
							,{  
							    																			fieldLabel : '题目编号ID',	
									 																			hiddenName : 'papQueOpt.queId'
																												,allowBlank:false
									 																		        											,xtype:'combo'
											,editabel : false
											,lazyInit : false
											,triggerAction : 'all'
											,store : new Ext.data.SimpleStore( {
												autoLoad : true,
												url : __ctxPath + '/pap/listqueId.do',
												fields : [ 'queId', 'queIdName' ],
												listeners : {
													load : function() {
														var combo = Ext.getCmp('queId');
														var store = combo.getStore();
														var rows = [];//定义数组
														for(var i=0;i<store.getCount();i++){ //store.getCount()为store的长度
															if(store.getAt(i).data['queId']==combo.getValue()){
																combo.setValue(store.getAt(i).data['queIdName']);
																break;
															}
														}
													}
												}
											})
											,displayField : 'queIdName'
											,valueField : 'queId'
											,id : 'queId'
																				 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '题项',	
									 																			name : 'papQueOpt.optContent'
																												,allowBlank:false
									 																			 											,xtype:'textarea'
																															 										,maxLength: 2048
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '序号',	
									 																			name : 'papQueOpt.disorder'
																												,allowBlank:false
									 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							       								
																			fieldLabel : '是否默认&YorN',	
									 									hiddenName : 'papQueOpt.isDefault'
																			,allowBlank:false
									 									,xtype:'combo'
									,editable : false
									,mode : 'local'
									,triggerAction : 'all'
									,store : [['1',__yes],['0',__no]]
															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '状态：有效、注销&PAP_ZT',	
									 																			hiddenName : 'papQueOpt.staId'
																												,allowBlank:false
									 																		        																									,xtype : 'mtdiccombo'
													,editable : true
													,lazyInit : false
													,forceSelection : false
													,itemKey : 'PAP_ZT'
																																 															}
							 							
																																			]
						});
				//加载表单对应的数据	
				if (this.optId != null && this.optId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/pap/getPapQueOpt.do?optId='+ this.optId,
								root : 'data',
								preName : 'papQueOpt'
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
						url:__ctxPath + '/pap/savePapQueOpt.do',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('PapQueOptGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});