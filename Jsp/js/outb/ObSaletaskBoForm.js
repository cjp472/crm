/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class ObSaletaskBoForm
 * @extends Ext.Window
 * @description ObSaletaskBo表单
 * @company 优创融联科技
 */
ObSaletaskBoForm = Ext.extend(Ext.Panel, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				ObSaletaskBoForm.superclass.constructor.call(this, {
							id : 'ObSaletaskBoFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[ObSaletaskBo]详细信息',
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
							//id : 'ObSaletaskBoForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'obSaletaskBo.saletaskBoId',
								xtype : 'hidden',
								value : this.saletaskBoId == null ? '' : this.saletaskBoId
							}
																																																								
														
							,{  
							    																			fieldLabel : '营销任务内码',	
									 																			hiddenName : 'obSaletaskBo.saletaskId'
																												,allowBlank:false
									 																		        											,xtype:'combo'
											,editabel : false
											,lazyInit : false
											,triggerAction : 'all'
											,store : new Ext.data.SimpleStore( {
												autoLoad : true,
												url : __ctxPath + '/outb/listsaletaskId.do',
												fields : [ 'saletaskId', 'saletaskIdName' ],
												listeners : {
													load : function() {
														var combo = Ext.getCmp('saletaskId');
														var store = combo.getStore();
														var rows = [];//定义数组
														for(var i=0;i<store.getCount();i++){ //store.getCount()为store的长度
															if(store.getAt(i).data['saletaskId']==combo.getValue()){
																combo.setValue(store.getAt(i).data['saletaskIdName']);
																break;
															}
														}
													}
												}
											})
											,displayField : 'saletaskIdName'
											,valueField : 'saletaskId'
											,id : 'saletaskId'
																				 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '预约时间',	
									 																			name : 'obSaletaskBo.booTim'
																												,allowBlank:false
									 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '被联络人内码',	
									 																			name : 'obSaletaskBo.conCusId'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '联系方式：0-电话、1-传真、2-短信、3-电邮、4-邮寄&CONOB_SALETASK_BO_LXFS',	
									 																			hiddenName : 'obSaletaskBo.tasMetId'
																		 																		        																									,xtype : 'mtdiccombo'
													,editable : true
													,lazyInit : false
													,forceSelection : false
													,itemKey : 'CONOB_SALETASK_BO_LXFS'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '地址/号码',	
									 																			name : 'obSaletaskBo.conNumber'
																		 																			 										,maxLength: 256
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '备注',	
									 																			name : 'obSaletaskBo.remark'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 1024
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '状态：0-待执行、1-已执行、2-已取消&CONOB_SALETASK_BO_ZT',	
									 																			hiddenName : 'obSaletaskBo.booStaId'
																												,allowBlank:false
									 																		        																									,xtype : 'mtdiccombo'
													,editable : true
													,lazyInit : false
													,forceSelection : false
													,itemKey : 'CONOB_SALETASK_BO_ZT'
																																 															}
							 							
																																			]
						});
				//加载表单对应的数据	
				if (this.saletaskBoId != null && this.saletaskBoId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/outb/getObSaletaskBo.do?saletaskBoId='+ this.saletaskBoId,
								root : 'data',
								preName : 'obSaletaskBo'
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
						url:__ctxPath + '/outb/saveObSaletaskBo.do',
						msgSuccess : '成功删除该记录！',
						msgFailure : '操作出错，请联系管理员！',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('ObSaletaskBoGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});