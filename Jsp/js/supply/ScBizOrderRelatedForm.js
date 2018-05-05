/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class ScBizOrderRelatedForm
 * @extends Ext.Window
 * @description ScBizOrderRelated表单
 * @company 优创融联科技
 */
ScBizOrderRelatedForm = Ext.extend(Ext.Panel, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				ScBizOrderRelatedForm.superclass.constructor.call(this, {
							id : 'ScBizOrderRelatedFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[ScBizOrderRelated]详细信息',
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
							//id : 'ScBizOrderRelatedForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'scBizOrderRelated.bizOrderRelatedId',
								xtype : 'hidden',
								value : this.bizOrderRelatedId == null ? '' : this.bizOrderRelatedId
							}
																																																								
														
							,{  
							    																			fieldLabel : '主业务单标识',	
									 																			name : 'scBizOrderRelated.masterBizOrderId'
																												,allowBlank:false
									 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '主业务单类型&CON_T_BIZ_ORDER_TYPE',	
									 																			hiddenName : 'scBizOrderRelated.masterBizOrderType'
																		 																		        																									,xtype : 'mtdiccombo'
													,editable : true
													,lazyInit : false
													,forceSelection : false
													,itemKey : 'CON_T_BIZ_ORDER_TYPE'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '从业务单标识',	
									 																			name : 'scBizOrderRelated.slaveBizOrderId'
																												,allowBlank:false
									 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '从业务单类型&CON_T_BIZ_ORDER_TYPE',	
									 																			hiddenName : 'scBizOrderRelated.slaveBizOrderType'
																		 																		        																									,xtype : 'mtdiccombo'
													,editable : true
													,lazyInit : false
													,forceSelection : false
													,itemKey : 'CON_T_BIZ_ORDER_TYPE'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '业务单关联类型',	
									 																			hiddenName : 'scBizOrderRelated.bizOrderRelationType'
																												,allowBlank:false
									 																		        											,xtype:'combo'
											,editabel : false
											,lazyInit : false
											,triggerAction : 'all'
											,store : new Ext.data.SimpleStore( {
												autoLoad : true,
												url : __ctxPath + '/supply/listbizOrderRelationType.do',
												fields : [ 'bizOrderRelationType', 'bizOrderRelationTypeName' ],
												listeners : {
													load : function() {
														var combo = Ext.getCmp('bizOrderRelationType');
														var store = combo.getStore();
														var rows = [];//定义数组
														for(var i=0;i<store.getCount();i++){ //store.getCount()为store的长度
															if(store.getAt(i).data['bizOrderRelationType']==combo.getValue()){
																combo.setValue(store.getAt(i).data['bizOrderRelationTypeName']);
																break;
															}
														}
													}
												}
											})
											,displayField : 'bizOrderRelationTypeName'
											,valueField : 'bizOrderRelationType'
											,id : 'bizOrderRelationType'
																				 															}
							 							
																																			]
						});
				//加载表单对应的数据	
				if (this.bizOrderRelatedId != null && this.bizOrderRelatedId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/supply/getScBizOrderRelated.do?bizOrderRelatedId='+ this.bizOrderRelatedId,
								root : 'data',
								preName : 'scBizOrderRelated'
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
				$postSubForm({
						formPanel:this.formPanel,
						scope:this,
						url:__ctxPath + '/supply/saveScBizOrderRelated.do',
						msgSuccess : '成功删除该记录！',
						msgFailure : '操作出错，请联系管理员！',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('ScBizOrderRelatedGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});