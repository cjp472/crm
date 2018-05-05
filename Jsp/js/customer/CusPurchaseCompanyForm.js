/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class CusPurchaseCompanyForm
 * @extends Ext.Window
 * @description CusPurchaseCompany表单
 * @company 优创融联科技
 */
CusPurchaseCompanyForm = Ext.extend(Ext.Panel, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				CusPurchaseCompanyForm.superclass.constructor.call(this, {
							id : 'CusPurchaseCompanyFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[CusPurchaseCompany]详细信息',
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
							//id : 'CusPurchaseCompanyForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'cusPurchaseCompany.customerid',
								xtype : 'hidden',
								value : this.customerid == null ? '' : this.customerid
							}
																																																								
														
							,{  
							    																			fieldLabel : '业务编码',	
									 																			name : 'cusPurchaseCompany.busiCode'
																		 																			 										,maxLength: 128
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '客户类别：冠名客户',	
									 																			name : 'cusPurchaseCompany.cusCatId'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '中文名称',	
									 																			name : 'cusPurchaseCompany.nameCn'
																												,allowBlank:false
									 																			 										,maxLength: 128
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '英文名称',	
									 																			name : 'cusPurchaseCompany.nameEn'
																		 																			 										,maxLength: 128
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '简称',	
									 																			name : 'cusPurchaseCompany.nameAli'
																		 																			 										,maxLength: 128
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '简码',	
									 																			name : 'cusPurchaseCompany.simpleCode'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 512
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '组织结构代码证',	
									 																			name : 'cusPurchaseCompany.enrollCode'
																		 																			 										,maxLength: 100
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '税务登记号',	
									 																			name : 'cusPurchaseCompany.taxnumber'
																		 																			 										,maxLength: 50
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '所属行业',	
									 																			name : 'cusPurchaseCompany.occupationId'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '企业性质，外企、国有、私营等',	
									 																			name : 'cusPurchaseCompany.companyCharacterId'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '企业类型，小规模纳税人等',	
									 																			name : 'cusPurchaseCompany.companyTypeId'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '供应商信用级别，AAA、BBB等',	
									 																			name : 'cusPurchaseCompany.companyCreditId'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '所在地区',	
									 																			name : 'cusPurchaseCompany.regionId'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '企业经营地址(包括地区和详细信息)',	
									 																			name : 'cusPurchaseCompany.tradeAddress'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 2048
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '经营地址邮编',	
									 																			name : 'cusPurchaseCompany.tradeZipcode'
																		 																			 										,maxLength: 6
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '企业经营范围',	
									 																			name : 'cusPurchaseCompany.tradeScope'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 4000
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '企业注册地址(包括地区和详细信息)',	
									 																			name : 'cusPurchaseCompany.registerAddress'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 2048
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '注册地址邮编',	
									 																			name : 'cusPurchaseCompany.registerZipcode'
																		 																			 										,maxLength: 6
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '法人名称',	
									 																			name : 'cusPurchaseCompany.legalName'
																		 																			 										,maxLength: 100
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '注册资金',	
									 																			name : 'cusPurchaseCompany.registerMoney'
																		 																			 										,maxLength: 20
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '注册日期',	
									 																			name : 'cusPurchaseCompany.regTime'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '公司网址',	
									 																			name : 'cusPurchaseCompany.companyUrl'
																		 																			 										,maxLength: 100
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '公司简介',	
									 																			name : 'cusPurchaseCompany.companyRemark'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 2048
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '是否已复核：1=是、0=否',	
									 																			name : 'cusPurchaseCompany.hasChecked'
																												,allowBlank:false
									 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '状态：有效、注销',	
									 																			name : 'cusPurchaseCompany.staId'
																												,allowBlank:false
									 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '备注',	
									 																			name : 'cusPurchaseCompany.remark'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 2048
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '创建人ID',	
									 																			name : 'cusPurchaseCompany.creUseId'
																												,allowBlank:false
									 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '创建日期',	
									 																			name : 'cusPurchaseCompany.creDat'
																												,allowBlank:false
									 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '修改人ID',	
									 																			name : 'cusPurchaseCompany.updUseId'
																		 																		        																									,xtype:'numberfield'
																																 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '修改日期',	
									 																			name : 'cusPurchaseCompany.updDat'
																		 																			,xtype:'datefield',
										format:'Y-m-d',
										value:new Date()
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展字段1',	
									 																			name : 'cusPurchaseCompany.ext1'
																		 																			 										,maxLength: 256
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展字段2',	
									 																			name : 'cusPurchaseCompany.ext2'
																		 																			 										,maxLength: 256
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展字段3',	
									 																			name : 'cusPurchaseCompany.ext3'
																		 																			 										,maxLength: 256
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展字段4',	
									 																			name : 'cusPurchaseCompany.ext4'
																		 																			 										,maxLength: 256
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展字段5',	
									 																			name : 'cusPurchaseCompany.ext5'
																		 																			 										,maxLength: 256
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展字段6',	
									 																			name : 'cusPurchaseCompany.ext6'
																		 																			 										,maxLength: 256
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展字段8',	
									 																			name : 'cusPurchaseCompany.ext8'
																		 																			 										,maxLength: 256
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展字段7',	
									 																			name : 'cusPurchaseCompany.ext7'
																		 																			 										,maxLength: 256
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展字段9',	
									 																			name : 'cusPurchaseCompany.ext9'
																		 																			 										,maxLength: 256
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展字段10',	
									 																			name : 'cusPurchaseCompany.ext10'
																		 																			 										,maxLength: 256
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展字段11',	
									 																			name : 'cusPurchaseCompany.ext11'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 1024
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展字段12',	
									 																			name : 'cusPurchaseCompany.ext12'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 1024
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展字段13',	
									 																			name : 'cusPurchaseCompany.ext13'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 1024
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展字段14',	
									 																			name : 'cusPurchaseCompany.ext14'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 1024
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展字段15',	
									 																			name : 'cusPurchaseCompany.ext15'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 1024
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展字段16',	
									 																			name : 'cusPurchaseCompany.ext16'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 2048
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展字段17',	
									 																			name : 'cusPurchaseCompany.ext17'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 2048
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展字段18',	
									 																			name : 'cusPurchaseCompany.ext18'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 2048
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展字段19',	
									 																			name : 'cusPurchaseCompany.ext19'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 2048
									 															}
							 							
																																																	
														
							,{  
							    																			fieldLabel : '扩展字段20',	
									 																			name : 'cusPurchaseCompany.ext20'
																		 																			 											,xtype:'textarea'
																															 										,maxLength: 2048
									 															}
							 							
																																			]
						});
				//加载表单对应的数据	
				if (this.customerid != null && this.customerid != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/customer/getCusPurchaseCompany.do?customerid='+ this.customerid,
								root : 'data',
								preName : 'cusPurchaseCompany'
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
						url:__ctxPath + '/customer/saveCusPurchaseCompany.do',
						msgSuccess : '成功删除该记录！',
						msgFailure : '操作出错，请联系管理员！',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('CusPurchaseCompanyGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});