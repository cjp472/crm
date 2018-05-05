/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class ScWarehouseForm
 * @extends Ext.Window
 * @description ScWarehouse表单
 * @company 优创融联科技
 */
ScWarehouseForm = Ext.extend(Ext.Panel, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				ScWarehouseForm.superclass.constructor.call(this, {
							id : 'ScWarehouseFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[ScWarehouse]详细信息',
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
							//id : 'ScWarehouseForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'scWarehouse.warehouseId',
								xtype : 'hidden',
								value : this.warehouseId == null ? '' : this.warehouseId
							}
																																																								
														
							,{  
							    																			fieldLabel : '仓库名称',	
									 																			name : 'scWarehouse.warehouseName'
																												,allowBlank:false
									 																			 										,maxLength: 60
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '用于输入快速过虑',	
									 																			name : 'scWarehouse.warehousePinyin'
																												,allowBlank:false
									 																			 										,maxLength: 60
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '仓库负责人',	
									 																			name : 'scWarehouse.warehouseMgr'
																												,allowBlank:false
									 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '手机号码',	
									 																			name : 'scWarehouse.whCellphone'
																		 																			 										,maxLength: 20
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '固定电话',	
									 																			name : 'scWarehouse.whPhone'
																		 																			 										,maxLength: 20
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '传真',	
									 																			name : 'scWarehouse.whFax'
																		 																			 										,maxLength: 20
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '仓库地址',	
									 																			name : 'scWarehouse.whAddr'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 500
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '邮政编码',	
									 																			name : 'scWarehouse.whPostcode'
																		 																			 										,maxLength: 6
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '所属部门标识',	
									 																			name : 'scWarehouse.ownerDeptId'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '覆盖区域',	
									 																			name : 'scWarehouse.coverArea'
																		 																			 										,maxLength: 60
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '描述',	
									 																			name : 'scWarehouse.warehouseDesc'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 500
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '仓库状态&CON_T_WH_STATUS',	
									 																			hiddenName : 'scWarehouse.warehouseStatus'
																		 																		        																									,xtype : 'mtdiccombo'
													,editable : true
													,lazyInit : false
													,forceSelection : false
													,itemKey : 'CON_T_WH_STATUS'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '创建人',	
									 																			name : 'scWarehouse.createUserId'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '创建时间',	
									 																			name : 'scWarehouse.createTime'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '修改人',	
									 																			name : 'scWarehouse.updateUserId'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '修改时间',	
									 																			name : 'scWarehouse.updateTime2'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '备注',	
									 																			name : 'scWarehouse.desc'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 500
									 															}
							 							
																																			]
						});
				//加载表单对应的数据	
				if (this.warehouseId != null && this.warehouseId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/stock/getScWarehouse.do?warehouseId='+ this.warehouseId,
								root : 'data',
								preName : 'scWarehouse'
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
						url:__ctxPath + '/stock/saveScWarehouse.do',
						msgSuccess : '成功删除该记录！',
						msgFailure : '操作出错，请联系管理员！',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('ScWarehouseGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});