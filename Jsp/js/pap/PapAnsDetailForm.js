/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class PapAnsDetailForm
 * @extends Ext.Window
 * @description PapAnsDetail表单
 * @company 优创融联科技
 */
PapAnsDetailForm = Ext.extend(Ext.Panel, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				PapAnsDetailForm.superclass.constructor.call(this, {
							id : 'PapAnsDetailFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[PapAnsDetail]详细信息',
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
							//id : 'PapAnsDetailForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'papAnsDetail.ansDetailId',
								xtype : 'hidden',
								value : this.ansDetailId == null ? '' : this.ansDetailId
							}
																																																								
														
							,{  
							    																			fieldLabel : '问卷题目ID',	
									 																			hiddenName : 'papAnsDetail.papQueId'
																												,allowBlank:false
									 																		        											,xtype:'combo'
											,editabel : false
											,lazyInit : false
											,triggerAction : 'all'
											,store : new Ext.data.SimpleStore( {
												autoLoad : true,
												url : __ctxPath + '/pap/listpapQueId.do',
												fields : [ 'papQueId', 'papQueIdName' ],
												listeners : {
													load : function() {
														var combo = Ext.getCmp('papQueId');
														var store = combo.getStore();
														var rows = [];//定义数组
														for(var i=0;i<store.getCount();i++){ //store.getCount()为store的长度
															if(store.getAt(i).data['papQueId']==combo.getValue()){
																combo.setValue(store.getAt(i).data['papQueIdName']);
																break;
															}
														}
													}
												}
											})
											,displayField : 'papQueIdName'
											,valueField : 'papQueId'
											,id : 'papQueId'
																				 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '题项编号ID',	
									 																			hiddenName : 'papAnsDetail.optId'
																												,allowBlank:false
									 																		        											,xtype:'combo'
											,editabel : false
											,lazyInit : false
											,triggerAction : 'all'
											,store : new Ext.data.SimpleStore( {
												autoLoad : true,
												url : __ctxPath + '/pap/listoptId.do',
												fields : [ 'optId', 'optIdName' ],
												listeners : {
													load : function() {
														var combo = Ext.getCmp('optId');
														var store = combo.getStore();
														var rows = [];//定义数组
														for(var i=0;i<store.getCount();i++){ //store.getCount()为store的长度
															if(store.getAt(i).data['optId']==combo.getValue()){
																combo.setValue(store.getAt(i).data['optIdName']);
																break;
															}
														}
													}
												}
											})
											,displayField : 'optIdName'
											,valueField : 'optId'
											,id : 'optId'
																				 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '问卷结果内码',	
									 																			hiddenName : 'papAnsDetail.papAnsId'
																		 																		        											,xtype:'combo'
											,editabel : false
											,lazyInit : false
											,triggerAction : 'all'
											,store : new Ext.data.SimpleStore( {
												autoLoad : true,
												url : __ctxPath + '/pap/listpapAnsId.do',
												fields : [ 'papAnsId', 'papAnsIdName' ],
												listeners : {
													load : function() {
														var combo = Ext.getCmp('papAnsId');
														var store = combo.getStore();
														var rows = [];//定义数组
														for(var i=0;i<store.getCount();i++){ //store.getCount()为store的长度
															if(store.getAt(i).data['papAnsId']==combo.getValue()){
																combo.setValue(store.getAt(i).data['papAnsIdName']);
																break;
															}
														}
													}
												}
											})
											,displayField : 'papAnsIdName'
											,valueField : 'papAnsId'
											,id : 'papAnsId'
																				 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '答案',	
									 																			name : 'papAnsDetail.ans'
																												,allowBlank:false
									 																			 											,xtype:'textarea'
																															 										,maxLength: 4000
									 															}
							 							
																																			]
						});
				//加载表单对应的数据	
				if (this.ansDetailId != null && this.ansDetailId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/pap/getPapAnsDetail.do?ansDetailId='+ this.ansDetailId,
								root : 'data',
								preName : 'papAnsDetail'
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
						url:__ctxPath + '/pap/savePapAnsDetail.do',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('PapAnsDetailGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});