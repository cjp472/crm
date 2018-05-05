DDFuWuDanForm = Ext
		.extend(
				Ext.Panel,
				{
					// 构造函数
					constructor : function(_cfg) {
						Ext.applyIf(this, _cfg);
						// 必须先初始化组件
						this.initUIComponents();
						DDFuWuDanForm.superclass.constructor.call(this, {
							id : 'DDFuWuDanFormWin',
							layout : 'fit',
							items : this.panel,
							autoScroll : true,
							//							collapsible:true,
							region : 'center',
							modal : true,
							maximizable : true,
							title : _cfg && _cfg.flag ? '' : '订单录入',
							buttonAlign : 'center',
							buttons : _cfg && _cfg.flag ? [] : [{
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
						this.grid_shangpin = new HT.GridPanel({
							region : 'center',
							printable : false,
							height : 150,
							showPaging : false,
							exportable : false,
							tbar : ['->', {
								text : '新增',
								iconCls : 'btn-add',
								handler : function() {

								}
							}, {
								text : '删除',
								iconCls : 'btn-delete',
								handler : function() {

								}
							}],
							url : '',
							fields : [{
								name : 'calllistId',
								type : 'int'
							}, 'obCalllist', 'calllistNam', 'calllistResouce',
									'ownerTeam', 'calllistTypId', 'cusTypId',
									'staDat', 'endDat', 'remark', 'creUseId',
									'creTime', 'updUseId', 'updTime',
									'calllistStaId', 'ownerTeamName'],
							columns : [{
								header : '商品编号',
								isExp : false,

								dataIndex : 'calllistNam'
							}, {
								header : '商品名称',
								isExp : false,

								dataIndex : 'projId'
							}, {
								header : '类别',
								isExp : false,

								dataIndex : 'calllistTypId'
							}, {
								header : '颜色',
								isExp : false,

								dataIndex : 'calllistTypId'
							}, {
								header : '样式',
								isExp : false,

								dataIndex : 'calllistNam'
							}, {
								header : '单位',
								isExp : false,

								dataIndex : 'calllistResouce'
							}, {
								header : '市场价',
								isExp : false,

								dataIndex : 'calllistNam'
							}, {
								header : '销售价',
								isExp : false,

								dataIndex : 'ownerTeamName'
							}, {
								header : '折扣',
								isExp : false,

								dataIndex : 'staDat'
							}, {
								header : '可订数量',
								isExp : false,
								dataIndex : 'endDat'
							}, {
								header : '数量',
								isExp : false,

								dataIndex : 'staDat'
							}, {
								header : '小计',
								isExp : false,
								dataIndex : 'endDat'
							}, {
								header : '备注',
								isExp : false,

								dataIndex : 'staDat'
							}]
						});
						this.grid_zengsongtuijian = new HT.GridPanel({
							region : 'center',
							printable : false,
							border : false,
							height : 140,
							showPaging : false,
							exportable : false,
							url : '',
							fields : [{
								name : 'calllistId',
								type : 'int'
							}, 'obCalllist', 'calllistNam', 'calllistResouce',
									'ownerTeam', 'calllistTypId', 'cusTypId',
									'staDat', 'endDat', 'remark', 'creUseId',
									'creTime', 'updUseId', 'updTime',
									'calllistStaId', 'ownerTeamName'],
							columns : [{
								header : '类型',
								isExp : false,

								dataIndex : 'calllistNam'
							}, {
								header : '商品',
								isExp : false,

								dataIndex : 'projId'
							}, {
								header : '市场价',
								isExp : false,

								dataIndex : 'calllistTypId'
							}, {
								header : '价格',
								isExp : false,

								dataIndex : 'calllistTypId'
							}]
						});
						this.grid_yingxiaohuodong = new HT.GridPanel({
							region : 'center',
							printable : false,
							border : false,
							height : 130,
							showPaging : false,
							exportable : false,
							url : '',
							fields : [{
								name : 'calllistId',
								type : 'int'
							}, 'obCalllist', 'calllistNam', 'calllistResouce',
									'ownerTeam', 'calllistTypId', 'cusTypId',
									'staDat', 'endDat', 'remark', 'creUseId',
									'creTime', 'updUseId', 'updTime',
									'calllistStaId', 'ownerTeamName'],
							columns : [{
								header : '类型',
								isExp : false,

								dataIndex : 'calllistNam'
							}, {
								header : '编号',
								isExp : false,

								dataIndex : 'projId'
							}, {
								header : '到期时间',
								isExp : false,

								dataIndex : 'calllistTypId'
							}]
						});
						this.grid_fuwukehu = new HT.GridPanel({
							region : 'center',
							printable : false,
							border : false,
							height : 130,
							showPaging : false,
							exportable : false,
							tbar : ['->', {
								text : '添加',
								iconCls : 'btn-add',
								handler : function() {

								}
							}, {
								text : '删除',
								iconCls : 'btn-delete',
								handler : function() {

								}
							}],
							url : '',
							fields : [{
								name : 'calllistId',
								type : 'int'
							}, 'obCalllist', 'calllistNam', 'calllistResouce',
									'ownerTeam', 'calllistTypId', 'cusTypId',
									'staDat', 'endDat', 'remark', 'creUseId',
									'creTime', 'updUseId', 'updTime',
									'calllistStaId', 'ownerTeamName'],
							columns : [{
								header : '名称',
								isExp : false,

								dataIndex : 'calllistNam'
							}, {
								header : '职务',
								isExp : false,

								dataIndex : 'projId'
							}, {
								header : '单位名称',
								isExp : false,

								dataIndex : 'calllistTypId'
							}, {
								header : '手机',
								isExp : false,

								dataIndex : 'calllistTypId'
							}, {
								header : '客户级别',
								isExp : false,

								dataIndex : 'calllistTypId'
							}, {
								header : '车牌号',
								isExp : false,

								dataIndex : 'calllistTypId'
							}, {
								header : '航班号',
								isExp : false,

								dataIndex : 'calllistTypId'
							}, {
								header : '航程',
								isExp : false,

								dataIndex : 'calllistTypId'
							}, {
								header : '航班时间',
								isExp : false,

								dataIndex : 'calllistTypId'
							}, {
								header : '备注',
								isExp : false,

								dataIndex : 'calllistTypId'
							}]
						});
						this.panel = new Ext.FormPanel(
								{
									border : false,
									style : 'padding:10px 0 0 0;',
									bodyStyle : 'overflow-y:auto',
									buttonAlign : 'center',
									labelAlign : 'right',
									items : [
											{
												layout : 'column',
												border : false,
												items : [
														{
															layout : 'form',
															columnWidth : .333,
															border : false,
															items : [{
																xtype : 'textfield',
																fieldLabel : '单据类别',
																value : '服务单',
																readOnly : true,
																anchor : '100%'
															}]
														},
														{
															layout : 'form',
															columnWidth : .333,
															border : false,
															items : [{
																xtype : 'panel',
																fieldLabel : '<font style="color:red">*</font>客户名称',
																anchor : '100%',
																border : false,
																allowBlank : false,
																layout : 'column',
																items : [
																		{
																			xtype : 'textfield',
																			anchor : '100%',
																			columnWidth : .9
																		},
																		{
																			columnWidth : .1,
																			xtype : 'button',
																			iconCls : 'search'
																		}]
															}]
														},
														{
															layout : 'form',
															columnWidth : .333,
															border : false,
															items : [{
																xtype : 'textfield',
																allowBlank : false,
																fieldLabel : '订购人名称',
																anchor : '100%'
															}]
														}]
											},
											{
												layout : 'column',
												border : false,
												items : [{
													layout : 'form',
													columnWidth : .333,
													border : false,
													items : [{
														xtype : 'combo',
														fieldLabel : '订购方式',
														mode : 'local',
														allowBlank : false,
														store : [],
														anchor : '100%'
													}]
												}, {
													layout : 'form',
													columnWidth : .666,
													border : false,
													items : [{
														xtype : 'textfield',
														fieldLabel : '号码/地址',
														anchor : '100%'
													}]
												}]
											},
											{
												layout : 'column',
												border : false,
												items : [{
													layout : 'form',
													columnWidth : .333,
													border : false,
													items : [{
														xtype : 'datefield',
														fieldLabel : '订购日期',
														format : 'y-m-d',
														anchor : '100%'
													}]
												}, {
													layout : 'form',
													columnWidth : .333,
													border : false,
													items : [{
														xtype : 'textfield',
														fieldLabel : '合同编码',
														anchor : '100%'
													}]
												}]
											},
											{
												xtype : 'fieldset',
												title : '订单商品',
												collapsible : true,
												items : [this.grid_shangpin]
											},
											{
												layout : 'column',
												border : false,
												items : [
														{
															layout : 'column',
															border : false,
															style : 'padding-right:10px',
															columnWidth : .7,
															items : [
																	{
																		layout : 'form',
																		border : false,
																		items : [{
																			layout : 'column',
																			border : false,
																			allowBlank : false,
																			fieldLabel : '服务地址',
																			items : [
																					{
																						xtype : 'combo',
																						columnWidth : .25,
																						mode : 'local',
																						store : [],
																						anchor : '100%',
																						value : '省'
																					},
																					{
																						xtype : 'combo',
																						columnWidth : .25,
																						mode : 'local',
																						store : [],
																						anchor : '100%',
																						value : '市'
																					},
																					{
																						xtype : 'combo',
																						columnWidth : .25,
																						mode : 'local',
																						store : [],
																						anchor : '100%',
																						value : '区'
																					},
																					{
																						xtype : 'combo',
																						columnWidth : .25,
																						mode : 'local',
																						store : [],
																						anchor : '100%',
																						value : '县/街道'
																					}]
																		}]
																	},
																	{
																		layout : 'column',
																		border : false,
																		width : '100%',
																		items : [
																				{
																					layout : 'form',
																					border : false,
																					columnWidth : .5,
																					items : [
																							{
																								xtype : 'combo',
																								store : [],
																								mode : 'local',
																								fieldLabel : '服务区域',
																								allowBlank : false,
																								anchor : '100%'
																							},
																							{
																								xtype : 'datefield',
																								fieldLabel : '开始时间',
																								format : 'y-m-d',
																								anchor : '100%'
																							},
																							{
																								xtype : 'textfield',
																								fieldLabel : '总人数',
																								allowBlank : false,
																								anchor : '100%'
																							},
																							{
																								layout : 'column',
																								columnWidth : .5,
																								border : false,
																								items : [
																										{
																											layout : 'form',
																											columnWidth : .9,
																											border : false,
																											items : [{
																												xtype : 'textfield',
																												fieldLabel : '手机',
																												allowBlank : false,
																												anchor : '100%'
																											}]
																										},
																										{
																											xtype : 'button',
																											text : '',
																											iconCls : 'callme',
																											handler : function() {
																												Ext
																														.getCmp(
																																'westPanel')
																														.collapse();
																												var tabs = Ext
																														.getCmp('centerTabPanel');
																												var aForm = Ext
																														.getCmp('DDHuiFangDetailFormWin');
																												if (aForm != null) {
																													tabs
																															.remove('DDHuiFangDetailFormWin');
																												}
																												aForm = new DDHuiFangDetailForm(
																														{
																															cusId : '',
																															cusNo : '',
																															comId : '',
																															isDiaTime : '',
																															busiStaId : '',
																															taskId : ''
																														});
																												tabs
																														.add(aForm);
																												tabs
																														.activate(aForm);
																											}
																										}]
																							}]
																				},
																				{
																					layout : 'form',
																					columnWidth : .5,
																					border : false,
																					items : [
																							{
																								xtype : 'combo',
																								store : [],
																								mode : 'local',
																								fieldLabel : '服务类型',
																								allowBlank : false,
																								anchor : '100%'
																							},
																							{
																								xtype : 'datefield',
																								fieldLabel : '结束时间',
																								format : 'y-m-d',
																								anchor : '100%'
																							},
																							{
																								xtype : 'textfield',
																								fieldLabel : '联系人',
																								allowBlank : false,
																								anchor : '100%'
																							},
																							
																				{
																					layout : 'column',
																					columnWidth : .5,
																					border : false,
																					items : [{
																						layout : 'form',
																						columnWidth:.9,
																						border : false,
																						items : [{
																							xtype : 'textfield',
																							fieldLabel : '固定电话',
																							allowBlank : false,
																							anchor : '100%'
																						}]
																					},{
																						xtype:'button',
																						text:'',
																						iconCls:'callme',
																						handler:function(){
																							Ext.getCmp('westPanel').collapse();
																							var tabs = Ext.getCmp('centerTabPanel');
																							var aForm = Ext.getCmp('DDHuiFangDetailFormWin');
																							if (aForm != null) {
																								tabs.remove('DDHuiFangDetailFormWin');
																							}
																							aForm = new DDHuiFangDetailForm({
																								cusId : '',
																								cusNo : '',
																								comId : '',
																								isDiaTime : '',
																								busiStaId : '',
																								taskId : ''
																							});
																							tabs.add(aForm);
																							tabs.activate(aForm);
																						}
																					}]
																				}]
																				}]
																	},
																	{
																		layout : 'form',
																		border : false,
																		width : '100%',
																		items : [{
																			xtype : 'textarea',
																			fieldLabel : '服务要求',
																			height : 50,
																			anchor : '100%'
																		}]
																	},
																	{
																		xtype : 'panel',
																		border : false,
																		width : '100%',
																		items : [{
																			xtype : 'fieldset',
																			title : '服务客户',
																			bodyStyle : 'margin-left:10px',
																			layout : 'fit',
																			items : [this.grid_fuwukehu]
																		}]
																	}]
														},
														{
															border : false,
															columnWidth : .3,
															items : [
																	{
																		xtype : 'fieldset',
																		title : '赠送推荐',
																		layout : 'fit',
																		items : [this.grid_zengsongtuijian]
																	},
																	{
																		xtype : 'fieldset',
																		title : '营销活动',
																		layout : 'fit',
																		items : [this.grid_yingxiaohuodong]
																	}]
														}]
											}]
								});

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
						$postSubForm({
							formPanel : this.formPanel,
							scope : this,
							url : __ctxPath + '/outb/saveObCallbatch.do',
							msgSuccess : '成功删除该记录！',
							msgFailure : '操作出错，请联系管理员！',
							callback : function(fp, action) {
								var gridPanel = Ext.getCmp('ObCallbatchGrid');
								if (gridPanel != null) {
									gridPanel.getStore().reload();
								}
								this.close();
							}
						});
					}// end of save

				});