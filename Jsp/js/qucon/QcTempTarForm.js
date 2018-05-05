/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class QcTempTarForm
 * @extends Ext.Window
 * @description QcTempTar表单
 * @company 优创融联科技
 */
QcTempTarForm = Ext.extend(Ext.Panel, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				QcTempTarForm.superclass.constructor.call(this, {
							id : 'QcTempTarFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[QcTempTar]详细信息',
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
							//id : 'QcTempTarForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'qcTempTar.tmpTarId',
								xtype : 'hidden',
								value : this.tmpTarId == null ? '' : this.tmpTarId
							}
																																																								
														
							,{  
							    																			fieldLabel : '模板ID',	
									 																			hiddenName : 'qcTempTar.tmpId'
																												,allowBlank:false
									 																		        											,xtype:'combo'
											,editabel : false
											,lazyInit : false
											,triggerAction : 'all'
											,store : new Ext.data.SimpleStore( {
												autoLoad : true,
												url : __ctxPath + '/qucon/listtmpId.do',
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
							    																			fieldLabel : '章节ID',	
									 																			hiddenName : 'qcTempTar.tempCatId'
																												,allowBlank:false
									 																		        											,xtype:'combo'
											,editabel : false
											,lazyInit : false
											,triggerAction : 'all'
											,store : new Ext.data.SimpleStore( {
												autoLoad : true,
												url : __ctxPath + '/qucon/listtempCatId.do',
												fields : [ 'tempCatId', 'tempCatIdName' ],
												listeners : {
													load : function() {
														var combo = Ext.getCmp('tempCatId');
														var store = combo.getStore();
														var rows = [];//定义数组
														for(var i=0;i<store.getCount();i++){ //store.getCount()为store的长度
															if(store.getAt(i).data['tempCatId']==combo.getValue()){
																combo.setValue(store.getAt(i).data['tempCatIdName']);
																break;
															}
														}
													}
												}
											})
											,displayField : 'tempCatIdName'
											,valueField : 'tempCatId'
											,id : 'tempCatId'
																				 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '指标ID',	
									 																			hiddenName : 'qcTempTar.tarId'
																												,allowBlank:false
									 																		        											,xtype:'combo'
											,editabel : false
											,lazyInit : false
											,triggerAction : 'all'
											,store : new Ext.data.SimpleStore( {
												autoLoad : true,
												url : __ctxPath + '/qucon/listtarId.do',
												fields : [ 'tarId', 'tarIdName' ],
												listeners : {
													load : function() {
														var combo = Ext.getCmp('tarId');
														var store = combo.getStore();
														var rows = [];//定义数组
														for(var i=0;i<store.getCount();i++){ //store.getCount()为store的长度
															if(store.getAt(i).data['tarId']==combo.getValue()){
																combo.setValue(store.getAt(i).data['tarIdName']);
																break;
															}
														}
													}
												}
											})
											,displayField : 'tarIdName'
											,valueField : 'tarId'
											,id : 'tarId'
																				 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '分值,加分、减分时适用',	
									 																			name : 'qcTempTar.score'
																												,allowBlank:false
									 									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '序号',	
									 																			name : 'qcTempTar.disorder'
																												,allowBlank:false
									 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '状态：有效、注销&QC_ZT',	
									 																			hiddenName : 'qcTempTar.staId'
																												,allowBlank:false
									 																		        																									,xtype : 'mtdiccombo'
													,editable : true
													,lazyInit : false
													,forceSelection : false
													,itemKey : 'QC_ZT'
																																 															}
							 							
																																			]
						});
				//加载表单对应的数据	
				if (this.tmpTarId != null && this.tmpTarId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/qucon/getQcTempTar.do?tmpTarId='+ this.tmpTarId,
								root : 'data',
								preName : 'qcTempTar'
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
						url:__ctxPath + '/qucon/saveQcTempTar.do',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('QcTempTarGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});