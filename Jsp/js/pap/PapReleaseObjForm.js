/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class PapReleaseObjForm
 * @extends Ext.Window
 * @description PapReleaseObj表单
 * @company 优创融联科技
 */
PapReleaseObjForm = Ext.extend(Ext.Panel, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				PapReleaseObjForm.superclass.constructor.call(this, {
							id : 'PapReleaseObjFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[PapReleaseObj]详细信息',
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
							//id : 'PapReleaseObjForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'papReleaseObj.releaseObjId',
								xtype : 'hidden',
								value : this.releaseObjId == null ? '' : this.releaseObjId
							}
																																																								
														
							,{  
							    																			fieldLabel : '问卷发布ID',	
									 																			hiddenName : 'papReleaseObj.papId'
																												,allowBlank:false
									 																		        											,xtype:'combo'
											,editabel : false
											,lazyInit : false
											,triggerAction : 'all'
											,store : new Ext.data.SimpleStore( {
												autoLoad : true,
												url : __ctxPath + '/pap/listpapId.do',
												fields : [ 'papId', 'papIdName' ],
												listeners : {
													load : function() {
														var combo = Ext.getCmp('papId');
														var store = combo.getStore();
														var rows = [];//定义数组
														for(var i=0;i<store.getCount();i++){ //store.getCount()为store的长度
															if(store.getAt(i).data['papId']==combo.getValue()){
																combo.setValue(store.getAt(i).data['papIdName']);
																break;
															}
														}
													}
												}
											})
											,displayField : 'papIdName'
											,valueField : 'papId'
											,id : 'papId'
																				 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '用户',	
									 																			name : 'papReleaseObj.usrId'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '用户组',	
									 																			name : 'papReleaseObj.usrGrpId'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																			]
						});
				//加载表单对应的数据	
				if (this.releaseObjId != null && this.releaseObjId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/pap/getPapReleaseObj.do?releaseObjId='+ this.releaseObjId,
								root : 'data',
								preName : 'papReleaseObj'
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
						url:__ctxPath + '/pap/savePapReleaseObj.do',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('PapReleaseObjGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});