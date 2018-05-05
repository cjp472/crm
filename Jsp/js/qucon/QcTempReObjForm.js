/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class QcTempReObjForm
 * @extends Ext.Window
 * @description QcTempReObj表单
 * @company 优创融联科技
 */
QcTempReObjForm = Ext.extend(Ext.Panel, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				QcTempReObjForm.superclass.constructor.call(this, {
							id : 'QcTempReObjFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[QcTempReObj]详细信息',
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
							//id : 'QcTempReObjForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'qcTempReObj.tempReObjId',
								xtype : 'hidden',
								value : this.tempReObjId == null ? '' : this.tempReObjId
							}
																																																								
														
							,{  
							    																			fieldLabel : '发布模板ID',	
									 																			hiddenName : 'qcTempReObj.tempReleId'
																												,allowBlank:false
									 																		        											,xtype:'combo'
											,editabel : false
											,lazyInit : false
											,triggerAction : 'all'
											,store : new Ext.data.SimpleStore( {
												autoLoad : true,
												url : __ctxPath + '/qucon/listtempReleId.do',
												fields : [ 'tempReleId', 'tempReleIdName' ],
												listeners : {
													load : function() {
														var combo = Ext.getCmp('tempReleId');
														var store = combo.getStore();
														var rows = [];//定义数组
														for(var i=0;i<store.getCount();i++){ //store.getCount()为store的长度
															if(store.getAt(i).data['tempReleId']==combo.getValue()){
																combo.setValue(store.getAt(i).data['tempReleIdName']);
																break;
															}
														}
													}
												}
											})
											,displayField : 'tempReleIdName'
											,valueField : 'tempReleId'
											,id : 'tempReleId'
																				 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '用户',	
									 																			name : 'qcTempReObj.usrId'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '用户组',	
									 																			name : 'qcTempReObj.usrGrpId'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																			]
						});
				//加载表单对应的数据	
				if (this.tempReObjId != null && this.tempReObjId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/qucon/getQcTempReObj.do?tempReObjId='+ this.tempReObjId,
								root : 'data',
								preName : 'qcTempReObj'
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
						url:__ctxPath + '/qucon/saveQcTempReObj.do',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('QcTempReObjGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});