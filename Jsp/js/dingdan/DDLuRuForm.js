DDLuRuForm = Ext
		.extend(
				Ext.Panel,
				{
					// 构造函数
					constructor : function(_cfg) {
						Ext.applyIf(this, _cfg);
						// 必须先初始化组件
						this.initUIComponents();
						DDLuRuForm.superclass.constructor.call(this, {
							id : 'DDLuRuFormWin',
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
							height : 100,
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
							height : 110,
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
																xtype : 'combo',
																fieldLabel : '单据类别',
																mode : 'local',
																store : [],
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
												}, {
													layout : 'form',
													columnWidth : .333,
													border : false,
													items : [{
														xtype : 'textfield',
														fieldLabel : '报价编号',
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
																			fieldLabel : '收货地址',
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
																					columnWidth : .8,
																					items : [{
																						xtype : 'textfield',
																						fieldLabel : '详细地址',
																						anchor : '100%'
																					}]
																				},
																				{
																					layout : 'column',
																					columnWidth : .2,
																					border : false,
																					items : [
																							{
																								xtype : 'button',
																								width : 60,
																								text : '选择地址'
																							},
																							{
																								xtype : 'button',
																								text : '设置为默认',
																								width : 60
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
																								xtype : 'textfield',
																								fieldLabel : '收货人',
																								allowBlank : false,
																								anchor : '100%'
																							},
																							{
																								xtype : 'textfield',
																								fieldLabel : '邮件地址',
																								anchor : '100%'
																							}]
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
																							fieldLabel : '联系方式',
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
															xtype : 'fieldset',
															title : '赠送推荐',
															columnWidth : .3,
															layout : 'fit',
															items : [this.grid_zengsongtuijian]
														}]
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
															items : [{
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
																						xtype : 'textfield',
																						fieldLabel : '商品价格',
																						anchor : '100%'
																					},
																					{
																						xtype : 'textfield',
																						fieldLabel : '订单金额',
																						anchor : '100%'
																					},
																					{
																						xtype : 'textfield',
																						fieldLabel : '运费',
																						anchor : '100%'
																					},
																					{
																						xtype : 'textfield',
																						fieldLabel : '优惠价格',
																						anchor : '100%'
																					}]
																		},
																		{
																			layout : 'form',
																			columnWidth : .5,
																			border : false,
																			items : [
																					{
																						xtype : 'textfield',
																						fieldLabel : '积分抵扣',
																						anchor : '100%'
																					},
																					{
																						xtype : 'textfield',
																						fieldLabel : '礼金抵扣',
																						anchor : '100%'
																					},
																					{
																						layout : 'column',
																						fieldLabel : '代金券抵扣',
																						border : false,
																						items : [
																								{
																									columnWidth : .9,
																									xtype : 'textfield',
																									anchor : '100%'
																								},
																								{
																									xtype : 'button',
																									iconCls : 'search'
																								}]
																					},
																					{
																						layout : 'column',
																						fieldLabel : '暂存款抵扣',
																						border : false,
																						items : [
																								{
																									columnWidth : .9,
																									xtype : 'textfield',
																									anchor : '100%'
																								},
																								{
																									xtype : 'button',
																									iconCls : 'search'
																								}]
																					},
																					{
																						layout : 'column',
																						fieldLabel : '储值卡抵扣',
																						border : false,
																						items : [
																								{
																									columnWidth : .9,
																									xtype : 'textfield',
																									anchor : '100%'
																								},
																								{
																									xtype : 'button',
																									iconCls : 'search'
																								}]
																					}]
																		}]
															}]
														},
														{
															xtype : 'fieldset',
															title : '营销活动',
															columnWidth : .3,
															layout : 'fit',
															items : [this.grid_yingxiaohuodong]
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
														fieldLabel : '发票类型',
														mode : 'local',
														store : [],
														anchor : '100%'
													}]
												}, {
													layout : 'form',
													columnWidth : .666,
													border : false,
													items : [{
														xtype : 'textfield',
														fieldLabel : '发票抬头',
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
														fieldLabel : '配送公司',
														mode : 'local',
														store : [],
														anchor : '100%'
													}]
												}, {
													layout : 'form',
													columnWidth : .333,
													border : false,
													items : [{
														xtype : 'datefield',
														fieldLabel : '要求配送时间',
														foemat : 'y-m-d',
														anchor : '100%'
													}]
												}]
											},
											{
												xtype : 'textarea',
												fieldLabel : '配送说明',
												height : 50,
												anchor : '100%'
											},
											{
												xtype : 'fieldset',
												title : '付款方式',
												items : [
														{
															border : false,
															html : '<div style="float:right"><div style="float:left;margin-right:15px;">订单金额：</div><div style="float:left;margin-right:15px;">已付金额：</div><div style="float:left;margin-right:15px;">应付金额：</div><div style="clear:both"></div></div><div style="clear:both"></div>'
														},
														{
															xtype : 'radio',
															name : 'dingdandetail',
															boxLabel : '在线支付',
															listeners : {
																'check' : function(
																		radio,
																		checked) {
																	if (checked) {
																		Ext
																				.getCmp(
																						'zhifuPanel')
																				.show();
																	} else {
																		Ext
																				.getCmp(
																						'zhifuPanel')
																				.hide();
																	}
																}
															}
														},
														{
															xtype : 'panel',
															hidden : true,
															border : false,
															id : 'zhifuPanel',
															bodyStyle : 'margin-left:200px',
															layout : 'column',
															items : [
																	{
																		xtype : 'radio',
																		name : 'yinhangka',
																		boxLabel : '<img src="' + __ctxPath + '/images/zhongguo.jpg"/>'
																	},
																	{
																		xtype : 'radio',
																		name : 'yinhangka',
																		boxLabel : '<img src="' + __ctxPath + '/images/zhaoshang.jpg"/>'
																	},
																	{
																		xtype : 'radio',
																		name : 'yinhangka',
																		boxLabel : '<img src="' + __ctxPath + '/images/nongye.jpg"/>'
																	},
																	{
																		xtype : 'radio',
																		name : 'yinhangka',
																		boxLabel : '<img src="' + __ctxPath + '/images/gongshang.jpg"/>'
																	}]
														},
														{
															xtype : 'radio',
															name : 'dingdandetail',
															boxLabel : '货到付款'
														},
														{
															xtype : 'radio',
															name : 'dingdandetail',
															boxLabel : '款到发货'
														},
														{
															xtype : 'textarea',
															fieldLabel : '付款要求',
															height : 50,
															anchor : '100%'
														}]
											}, {
												xtype : 'textarea',
												fieldLabel : '备注',
												height : 50,
												anchor : '100%'
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