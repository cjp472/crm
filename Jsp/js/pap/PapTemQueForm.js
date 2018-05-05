/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class PapTemQueForm
 * @extends Ext.Window
 * @description PapTemQue表单
 * @company 优创融联科技
 */
PapTemQueForm = Ext.extend(Ext.Panel, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				PapTemQueForm.superclass.constructor.call(this, {
							id : 'PapTemQueFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[PapTemQue]详细信息',
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
							//id : 'PapTemQueForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'papTemQue.papQueId',
								xtype : 'hidden',
								value : this.papQueId == null ? '' : this.papQueId
							}
																																																								
														
							,{  
							    																			fieldLabel : '问卷模板ID',	
									 																			hiddenName : 'papTemQue.tmpId'
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
							    																			fieldLabel : '章节编号ID',	
									 																			hiddenName : 'papTemQue.queCatId'
																		 																		        											,xtype:'combo'
											,editabel : false
											,lazyInit : false
											,triggerAction : 'all'
											,store : new Ext.data.SimpleStore( {
												autoLoad : true,
												url : __ctxPath + '/pap/listqueCatId.do',
												fields : [ 'queCatId', 'queCatIdName' ],
												listeners : {
													load : function() {
														var combo = Ext.getCmp('queCatId');
														var store = combo.getStore();
														var rows = [];//定义数组
														for(var i=0;i<store.getCount();i++){ //store.getCount()为store的长度
															if(store.getAt(i).data['queCatId']==combo.getValue()){
																combo.setValue(store.getAt(i).data['queCatIdName']);
																break;
															}
														}
													}
												}
											})
											,displayField : 'queCatIdName'
											,valueField : 'queCatId'
											,id : 'queCatId'
																				 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '题目编号ID',	
									 																			hiddenName : 'papTemQue.queId'
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
							    																			fieldLabel : '序号',	
									 																			name : 'papTemQue.disorder'
																												,allowBlank:false
									 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																			]
						});
				//加载表单对应的数据	
				if (this.papQueId != null && this.papQueId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/pap/getPapTemQue.do?papQueId='+ this.papQueId,
								root : 'data',
								preName : 'papTemQue'
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
						url:__ctxPath + '/pap/savePapTemQue.do',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('PapTemQueGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});