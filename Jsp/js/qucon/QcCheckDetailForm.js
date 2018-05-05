/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class QcCheckDetailForm
 * @extends Ext.Window
 * @description QcCheckDetail表单
 * @company 优创融联科技
 */
QcCheckDetailForm = Ext.extend(Ext.Panel, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				QcCheckDetailForm.superclass.constructor.call(this, {
							id : 'QcCheckDetailFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[QcCheckDetail]详细信息',
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
							//id : 'QcCheckDetailForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'qcCheckDetail.checkDetailId',
								xtype : 'hidden',
								value : this.checkDetailId == null ? '' : this.checkDetailId
							}
																																																								
														
							,{  
							    																			fieldLabel : '考核结果ID',	
									 																			hiddenName : 'qcCheckDetail.chkId'
																		 																		        											,xtype:'combo'
											,editabel : false
											,lazyInit : false
											,triggerAction : 'all'
											,store : new Ext.data.SimpleStore( {
												autoLoad : true,
												url : __ctxPath + '/qucon/listchkId.do',
												fields : [ 'chkId', 'chkIdName' ],
												listeners : {
													load : function() {
														var combo = Ext.getCmp('chkId');
														var store = combo.getStore();
														var rows = [];//定义数组
														for(var i=0;i<store.getCount();i++){ //store.getCount()为store的长度
															if(store.getAt(i).data['chkId']==combo.getValue()){
																combo.setValue(store.getAt(i).data['chkIdName']);
																break;
															}
														}
													}
												}
											})
											,displayField : 'chkIdName'
											,valueField : 'chkId'
											,id : 'chkId'
																				 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '模板指标ID',	
									 																			hiddenName : 'qcCheckDetail.tmpTarId'
																												,allowBlank:false
									 																		        											,xtype:'combo'
											,editabel : false
											,lazyInit : false
											,triggerAction : 'all'
											,store : new Ext.data.SimpleStore( {
												autoLoad : true,
												url : __ctxPath + '/qucon/listtmpTarId.do',
												fields : [ 'tmpTarId', 'tmpTarIdName' ],
												listeners : {
													load : function() {
														var combo = Ext.getCmp('tmpTarId');
														var store = combo.getStore();
														var rows = [];//定义数组
														for(var i=0;i<store.getCount();i++){ //store.getCount()为store的长度
															if(store.getAt(i).data['tmpTarId']==combo.getValue()){
																combo.setValue(store.getAt(i).data['tmpTarIdName']);
																break;
															}
														}
													}
												}
											})
											,displayField : 'tmpTarIdName'
											,valueField : 'tmpTarId'
											,id : 'tmpTarId'
																				 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '评分项ID',	
									 																			hiddenName : 'qcCheckDetail.scoreOptId'
																												,allowBlank:false
									 																		        											,xtype:'combo'
											,editabel : false
											,lazyInit : false
											,triggerAction : 'all'
											,store : new Ext.data.SimpleStore( {
												autoLoad : true,
												url : __ctxPath + '/qucon/listscoreOptId.do',
												fields : [ 'scoreOptId', 'scoreOptIdName' ],
												listeners : {
													load : function() {
														var combo = Ext.getCmp('scoreOptId');
														var store = combo.getStore();
														var rows = [];//定义数组
														for(var i=0;i<store.getCount();i++){ //store.getCount()为store的长度
															if(store.getAt(i).data['scoreOptId']==combo.getValue()){
																combo.setValue(store.getAt(i).data['scoreOptIdName']);
																break;
															}
														}
													}
												}
											})
											,displayField : 'scoreOptIdName'
											,valueField : 'scoreOptId'
											,id : 'scoreOptId'
																				 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '分值,加分、减分时适用',	
									 																			name : 'qcCheckDetail.score'
																												,allowBlank:false
									 									 															}
							 							
																																			]
						});
				//加载表单对应的数据	
				if (this.checkDetailId != null && this.checkDetailId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/qucon/getQcCheckDetail.do?checkDetailId='+ this.checkDetailId,
								root : 'data',
								preName : 'qcCheckDetail'
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
						url:__ctxPath + '/qucon/saveQcCheckDetail.do',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('QcCheckDetailGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});