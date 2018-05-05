/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class ObFeeIndexForm
 * @extends Ext.Window
 * @description ObFeeIndex表单
 * @company 优创融联科技
 */
ObFeeIndexForm = Ext.extend(Ext.Panel, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				ObFeeIndexForm.superclass.constructor.call(this, {
							id : 'ObFeeIndexFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[ObFeeIndex]详细信息',
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
							//id : 'ObFeeIndexForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'obFeeIndex.feeIndexId',
								xtype : 'hidden',
								value : this.feeIndexId == null ? '' : this.feeIndexId
							}
																																																								
														
							,{  
							    																			fieldLabel : '名称',	
									 																			name : 'obFeeIndex.feeIndexName'
																		 																			 										,maxLength: 120
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '年度',	
									 																			name : 'obFeeIndex.annual'
																		 																			 										,maxLength: 4
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '周期',	
									 																			name : 'obFeeIndex.cycle'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '备注',	
									 																			name : 'obFeeIndex.comments'
																		 																			 										,maxLength: 255
									 															}
							 							
																																										 							
																																										 							
																																										 							
																																										 							
																																																	
														
							,{  
							    																			fieldLabel : '状态',	
									 																			name : 'obFeeIndex.staId'
																												,allowBlank:false
									 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																			]
						});
				//加载表单对应的数据	
				if (this.feeIndexId != null && this.feeIndexId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/fee/getObFeeIndex.do?feeIndexId='+ this.feeIndexId,
								root : 'data',
								preName : 'obFeeIndex'
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
						url:__ctxPath + '/fee/saveObFeeIndex.do',
						msgSuccess : '成功删除该记录！',
						msgFailure : '操作出错，请联系管理员！',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('ObFeeIndexGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});