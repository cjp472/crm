/**
 * @author cf0666@gmail.com
 * @createtime
 * @class CusCompanyForm
 * @extends Ext.Window
 * @description CusCompany表单
 * @company 优创融联科技
 */
CusCompanyForm = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 必须先初始化组件
				this.initUIComponents();
				CusCompanyForm.superclass.constructor.call(this, {
							id : 'CusCompanyFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '企业客户详细信息',
							buttonAlign : 'center',
							buttons : [{
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
									}]
						});
			},// end of the constructor
			// 初始化组件
			initUIComponents : function() {
				this.formPanel = new Ext.FormPanel({
							layout : 'form',
							bodyStyle : 'padding:10px',
							border : false,
							autoScroll : true,
							// id : 'CusCompanyForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'cusCompany.customerId',
								xtype : 'hidden',
								value : this.customerId == null
										? ''
										: this.customerId
							}

							, {
								fieldLabel : '客户编码',
								name : 'cusCompany.customerNo',
								maxLength : 128
							}
							, {
								fieldLabel : '业务编码',
								name : 'cusCompany.busiCode',
								maxLength : 128
							}

							, {
								fieldLabel : '客户类别：冠名客户',
								name : 'cusCompany.cusCatId',
								xtype : 'numberfield'
							}

							, {
								fieldLabel : '中文名称',
								name : 'cusCompany.nameCn',
								allowBlank : false,
								maxLength : 128
							}

							, {
								fieldLabel : '英文名称',
								name : 'cusCompany.nameEn',
								maxLength : 128
							}

							, {
								fieldLabel : '简称',
								name : 'cusCompany.nameAli',
								maxLength : 128
							}

							, {
								fieldLabel : '简码',
								name : 'cusCompany.simpleCode',
								xtype : 'textarea',
								maxLength : 512
							}

							, {xtype : 'tabpanel',
								activeTab : 0,//激活第一个panel
								plain:true,
								height : 195,
								defaultType : 'panel',
								bodyStyle : 'padding:5px;',
								items : [{
											title : '联系方式',
											layout : 'form',
											defaultType : 'textfield',
											defaults : {
												widht : 400,
												anchor : '100%,100%'
											},
											items : [{fieldLabel : '组织结构代码证',
														name : 'cusCompany.enrollCode',
														maxLength : 100
												}, {
													fieldLabel : '税务登记号',
													name : 'cusCompany.taxnumber',
													maxLength : 50
												}, {
													fieldLabel : '所属行业',
													name : 'cusCompany.occupationId',
													xtype : 'numberfield'
												}, {
													fieldLabel : '企业性质，外企、国有、私营等',
													name : 'cusCompany.companyCharacterId',
													xtype : 'numberfield'
												}]
								},{
											title : '联系方式',
											layout : 'form',
											defaultType : 'textfield',
											defaults : {
												widht : 400,
												anchor : '100%,100%'
											},
											items : [{
													fieldLabel : '企业类型，小规模纳税人等',
													name : 'cusCompany.companyTypeId',
													xtype : 'numberfield'
												}, {
													fieldLabel : '供应商信用级别，AAA、BBB等',
													name : 'cusCompany.companyCreditId',
													xtype : 'numberfield'
												}, {
													fieldLabel : '所在地区',
													name : 'cusCompany.regionId',
													xtype : 'numberfield'
												}, {
													fieldLabel : '企业经营地址(包括地区和详细信息)',
													name : 'cusCompany.tradeAddress',
													xtype : 'textarea',
													maxLength : 2048
												}]
								},{
											title : '联系方式',
											layout : 'form',
											defaultType : 'textfield',
											defaults : {
												widht : 400,
												anchor : '100%,100%'
											},
											items : [{
													fieldLabel : '经营地址邮编',
													name : 'cusCompany.tradeZipcode',
													maxLength : 6
												}
					
												, {
													fieldLabel : '企业经营范围',
													name : 'cusCompany.tradeScope',
													xtype : 'textarea',
													maxLength : 4000
												}
					
												, {
													fieldLabel : '企业注册地址(包括地区和详细信息)',
													name : 'cusCompany.registerAddress',
													xtype : 'textarea',
													maxLength : 2048
												}
					
												, {
													fieldLabel : '注册地址邮编',
													name : 'cusCompany.registerZipcode',
													maxLength : 6
												}]
								},{
											title : '联系方式',
											layout : 'form',
											defaultType : 'textfield',
											defaults : {
												widht : 400,
												anchor : '100%,100%'
											},
											items : [{
													fieldLabel : '法人名称',
													name : 'cusCompany.legalName',
													maxLength : 100
												}
					
												, {
													fieldLabel : '注册资金',
													name : 'cusCompany.registerMoney',
													maxLength : 20
												}
					
												, {
													fieldLabel : '注册日期',
													name : 'cusCompany.regTime',
													xtype : 'datefield',
													format : 'Y-m-d',
													value : new Date()
												},{
													fieldLabel : '是否已复核：1=是、0=否',
													name : 'cusCompany.hasChecked',
													allowBlank : false,
													xtype : 'numberfield'
												}, {
													fieldLabel : '状态：有效、注销',
													name : 'cusCompany.staId',
													allowBlank : false,
													xtype : 'numberfield'
												}]
								},{
											title : '联系方式',
											layout : 'form',
											defaultType : 'textfield',
											defaults : {
												widht : 400,
												anchor : '100%,100%'
											},
											items : [ {
													fieldLabel : '公司网址',
													name : 'cusCompany.companyUrl',
													maxLength : 100
												}
					
												, {
													fieldLabel : '公司简介',
													name : 'cusCompany.companyRemark',
													xtype : 'textarea',
													maxLength : 2048
												}]
								},{
											title : '备注',
											layout : 'form',
											defaultType : 'textfield',
											defaults : {
												widht : 400,
												anchor : '100%,100%'
											},
											items : [ {
													fieldLabel : '备注',
													name : 'cusCompany.remark',
													xtype : 'textarea',
													maxLength : 2048
												}]
								}]
								
							}
//							, {
//								fieldLabel : '创建人ID',
//								name : 'cusCompany.creUseId',
//								allowBlank : false,
//								xtype : 'numberfield'
//							}
//
//							, {
//								fieldLabel : '创建日期',
//								name : 'cusCompany.creDat',
//								allowBlank : false,
//								xtype : 'datefield',
//								format : 'Y-m-d',
//								value : new Date()
//							}
//
//							, {
//								fieldLabel : '修改人ID',
//								name : 'cusCompany.updUseId',
//								xtype : 'numberfield'
//							}
//
//							, {
//								fieldLabel : '修改日期',
//								name : 'cusCompany.updDat',
//								xtype : 'datefield',
//								format : 'Y-m-d',
//								value : new Date()
//							}
//
//							, {
//								fieldLabel : '扩展字段1',
//								name : 'cusCompany.ext1',
//								maxLength : 256
//							}
//
//							, {
//								fieldLabel : '扩展字段',
//								name : 'cusCompany.ext2',
//								maxLength : 256
//							}
//
//							, {
//								fieldLabel : '扩展字段',
//								name : 'cusCompany.ext3',
//								maxLength : 256
//							}
//
//							, {
//								fieldLabel : '扩展字段',
//								name : 'cusCompany.ext4',
//								maxLength : 256
//							}
//
//							, {
//								fieldLabel : '扩展字段',
//								name : 'cusCompany.ext5',
//								maxLength : 256
//							}
//
//							, {
//								fieldLabel : '扩展字段',
//								name : 'cusCompany.ext6',
//								maxLength : 256
//							}
//
//							, {
//								fieldLabel : '扩展字段',
//								name : 'cusCompany.ext8',
//								maxLength : 256
//							}
//
//							, {
//								fieldLabel : '扩展字段',
//								name : 'cusCompany.ext7',
//								maxLength : 256
//							}
//
//							, {
//								fieldLabel : '扩展字段',
//								name : 'cusCompany.ext9',
//								maxLength : 256
//							}
//
//							, {
//								fieldLabel : '扩展字段',
//								name : 'cusCompany.ext10',
//								maxLength : 256
//							}
//
//							, {
//								fieldLabel : '扩展字段',
//								name : 'cusCompany.ext11',
//								xtype : 'textarea',
//								maxLength : 1024
//							}
//
//							, {
//								fieldLabel : '扩展字段',
//								name : 'cusCompany.ext12',
//								xtype : 'textarea',
//								maxLength : 1024
//							}
//
//							, {
//								fieldLabel : '扩展字段',
//								name : 'cusCompany.ext13',
//								xtype : 'textarea',
//								maxLength : 1024
//							}
//
//							, {
//								fieldLabel : '扩展字段',
//								name : 'cusCompany.ext14',
//								xtype : 'textarea',
//								maxLength : 1024
//							}
//
//							, {
//								fieldLabel : '扩展字段',
//								name : 'cusCompany.ext15',
//								xtype : 'textarea',
//								maxLength : 1024
//							}
//
//							, {
//								fieldLabel : '扩展字段',
//								name : 'cusCompany.ext16',
//								xtype : 'textarea',
//								maxLength : 2048
//							}
//
//							, {
//								fieldLabel : '扩展字段',
//								name : 'cusCompany.ext17',
//								xtype : 'textarea',
//								maxLength : 2048
//							}
//
//							, {
//								fieldLabel : '扩展字段',
//								name : 'cusCompany.ext18',
//								xtype : 'textarea',
//								maxLength : 2048
//							}
//
//							, {
//								fieldLabel : '扩展字段',
//								name : 'cusCompany.ext19',
//								xtype : 'textarea',
//								maxLength : 2048
//							}
//
//							, {
//								fieldLabel : '扩展字段',
//								name : 'cusCompany.ext20',
//								xtype : 'textarea',
//								maxLength : 2048
//							}

							]
						});
				// 加载表单对应的数据
				if (this.customerId != null && this.customerId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath
										+ '/customer/getCusCompany.do?customerId='
										+ this.customerId,
								root : 'data',
								preName : 'cusCompany'
							});
				}

			},// end of the initcomponents

			/**
			 * 重置
			 * 
			 * @param {}
			 *            formPanel
			 */
			reset : function() {
				this.formPanel.getForm().reset();
			},
			/**
			 * 取消
			 * 
			 * @param {}
			 *            window
			 */
			cancel : function() {
				this.close();
			},
			/**
			 * 保存记录
			 */
			save : function() {
				$postForm({
							formPanel : this.formPanel,
							scope : this,
							url : __ctxPath + '/customer/saveCusCompany.do',
							callback : function(fp, action) {
								var gridPanel = Ext.getCmp('CusCompanyGrid');
								if (gridPanel != null) {
									gridPanel.getStore().reload();
								}
								this.close();
							}
						});
			}// end of save

		});