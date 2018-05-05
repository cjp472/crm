/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class CtScrAnsDetailForm
 * @extends Ext.Window
 * @description CtScrAnsDetail表单
 * @company 优创融联科技
 */
CtScrAnsDetailForm = Ext.extend(Ext.Panel, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				CtScrAnsDetailForm.superclass.constructor.call(this, {
							id : 'CtScrAnsDetailFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[CtScrAnsDetail]详细信息',
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
							//id : 'CtScrAnsDetailForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'ctScrAnsDetail.ctScrAnsDetailId',
								xtype : 'hidden',
								value : this.ctScrAnsDetailId == null ? '' : this.ctScrAnsDetailId
							}
																																																								
														
							,{  
							    																			fieldLabel : '话术结果',	
									 																			hiddenName : 'ctScrAnsDetail.scrAnsId'
																												,allowBlank:false
									 																		        											,xtype:'combo'
											,editabel : false
											,lazyInit : false
											,triggerAction : 'all'
											,store : new Ext.data.SimpleStore( {
												autoLoad : true,
												url : __ctxPath + '/comtech/listscrAnsId.do',
												fields : [ 'scrAnsId', 'scrAnsIdName' ],
												listeners : {
													load : function() {
														var combo = Ext.getCmp('scrAnsId');
														var store = combo.getStore();
														var rows = [];//定义数组
														for(var i=0;i<store.getCount();i++){ //store.getCount()为store的长度
															if(store.getAt(i).data['scrAnsId']==combo.getValue()){
																combo.setValue(store.getAt(i).data['scrAnsIdName']);
																break;
															}
														}
													}
												}
											})
											,displayField : 'scrAnsIdName'
											,valueField : 'scrAnsId'
											,id : 'scrAnsId'
																				 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '话术题目',	
									 																			hiddenName : 'ctScrAnsDetail.scrQueId'
																												,allowBlank:false
									 																		        											,xtype:'combo'
											,editabel : false
											,lazyInit : false
											,triggerAction : 'all'
											,store : new Ext.data.SimpleStore( {
												autoLoad : true,
												url : __ctxPath + '/comtech/listscrQueId.do',
												fields : [ 'scrQueId', 'scrQueIdName' ],
												listeners : {
													load : function() {
														var combo = Ext.getCmp('scrQueId');
														var store = combo.getStore();
														var rows = [];//定义数组
														for(var i=0;i<store.getCount();i++){ //store.getCount()为store的长度
															if(store.getAt(i).data['scrQueId']==combo.getValue()){
																combo.setValue(store.getAt(i).data['scrQueIdName']);
																break;
															}
														}
													}
												}
											})
											,displayField : 'scrQueIdName'
											,valueField : 'scrQueId'
											,id : 'scrQueId'
																				 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '题项编号',	
									 																			hiddenName : 'ctScrAnsDetail.optId'
																												,allowBlank:false
									 																		        											,xtype:'combo'
											,editabel : false
											,lazyInit : false
											,triggerAction : 'all'
											,store : new Ext.data.SimpleStore( {
												autoLoad : true,
												url : __ctxPath + '/comtech/listoptId.do',
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
							    																			fieldLabel : '答案',	
									 																			name : 'ctScrAnsDetail.ans'
																												,allowBlank:false
									 																			 											,xtype:'textarea'
																															 										,maxLength: 4000
									 															}
							 							
																																			]
						});
				//加载表单对应的数据	
				if (this.ctScrAnsDetailId != null && this.ctScrAnsDetailId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/comtech/getCtScrAnsDetail.do?ctScrAnsDetailId='+ this.ctScrAnsDetailId,
								root : 'data',
								preName : 'ctScrAnsDetail'
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
						url:__ctxPath + '/comtech/saveCtScrAnsDetail.do',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('CtScrAnsDetailGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});