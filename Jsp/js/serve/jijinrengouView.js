/**
 * @author:cf0666@gmail.com
 * @class CusHisView
 * @extends Ext.Panel
 * @description [CusHis]管理
 * @company 优创融联科技
 * @createtime:
 */
jijinrengouView = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		jijinrengouView.superclass.constructor.call(this, {
					id : 'jijinrengouViewWin',
					title : '基金认购',
					region : 'center',
					layout : 'border',
					items : [this.mainPanel, this.rightPanel]
				});
	},// end of constructor
	// 初始化组件
	initUIComponents : function() {

		// 初始化搜索条件Panel
		this.searchPanel = new Ext.FormPanel({
			region : 'north',
			height : 60,
			layout : 'form',
			labelAlign : 'right',
			items : [{
						layout : 'column',
						border : false,
						items : [{
									layout : 'form',
									border : false,
									columnWidth : .33,
									items : [{
												fieldLabel : '银行',
												name : 'Q_opeUseId_N_EQ',
												xtype : 'combo',
												mode : 'local',
												editable : false,
												allowBlank : false,
												triggerAction : 'all',
												store : [[]],
												anchor : '100%'
											}]
								}, {
									layout : 'form',
									border : false,
									columnWidth : .33,
									items : [{
												fieldLabel : '业务类型',
												name : 'Q_opeUseId_N_EQ',
												xtype : 'combo',
												mode : 'local',
												editable : false,
												allowBlank : false,
												triggerAction : 'all',
												store : [[]],
												anchor : '100%'
											}]
								}, {
									layout : 'form',
									border : false,
									columnWidth : .33,
									items : [{
												fieldLabel : '费率种类',
												name : 'Q_opeUseId_N_EQ',
												xtype : 'combo',
												mode : 'local',
												editable : false,
												allowBlank : false,
												triggerAction : 'all',
												store : [[]],
												anchor : '100%'
											}]
								}]
					}, {
						layout : 'column',
						border : false,
						items : [{
									layout : 'form',
									border : false,
									columnWidth : .33,
									items : [{
												fieldLabel : '服务渠道',
												name : 'Q_opeUseId_N_EQ',
												xtype : 'combo',
												mode : 'local',
												editable : false,
												allowBlank : false,
												triggerAction : 'all',
												store : [[]],
												anchor : '100%'
											}]
								}, {
									layout : 'column',
									border : false,
									columnWidth : .66,
									style : 'float:right',
									items : [{
										xtype : 'button',
										text : __search,
										style : 'margin-right:20px;margin-left:50px',
										iconCls : 'search',
										scope : this,
										handler : this.onSearch
									}, {
										xtype : 'button',
										text : __reset,
										scope : this,
										iconCls : 'btn-reset',
										handler : this.reset
									}]
								}]
					}],
			border : false,
			frame : false
		});// end of searchPanel
		this.gridPanel = new Ext.Panel({
					id:'jijinkaihuc',
					region : 'center',
					width : 478,
					layout : 'form',
					border : false,
					labelAlign:'right',
					autoScorll:true,
					defaults : {
						anchor : '50%,50%'
					},
					buttonAlign:'center',
					buttons:[{text:'确认',
					handler :function(){
					 	 Ext.getCmp('jijinkaihuc').removeAll();
					  Ext.getCmp('jijinkaihuc').add( {
								xtype : 'textfield',
								fieldLabel : '基金系统流水号'
							}, {
								xtype : 'textfield',
								fieldLabel : '客户号'
							}, {
								xtype : 'textfield',
								fieldLabel : '客户名'
							}, {
								xtype : 'numberfield',
								fieldLabel : '交易金额'
							}, {
								xtype : 'numberfield',
								anchor : '',
								fieldLabel : '手续费金额'
							},{
								xtype : 'textfield',
								anchor : '',
								fieldLabel : '费用'
							},{
								xtype : 'datefield',
								anchor : '',
								fieldLabel : '交易日期'
							},{
								xtype : 'datefield',
								anchor : '',
								fieldLabel : '交易时间'
							});
                      Ext.getCmp('jijinkaihuc').doLayout(); 
					}},{text:'取消'}],
					items : [{
								xtype : 'combo',
								fieldLabel : '渠道'
							}, {
								xtype : 'combo',
								fieldLabel : '业务种类'
							}, {
								xtype : 'textfield',
								fieldLabel : '客户号'
							}, {
								xtype : 'combo',
								fieldLabel : '个人/机构标志'

							}, {
								xtype : 'textfield',
								fieldLabel : '客户账号'
							}, {
								layout : 'column',
								border : false,
								items : [{
											columnWidth : .7,
											layout : 'form',
											anchor : '50%',
											border : false,
											items : [{
														xtype : 'textfield',
														fieldLabel : '交易密码'
													}]
										}, {
											columnWidth : .3,
											layout : 'form',
											border : false,
											items : [{
														xtype : 'button',
														text : '获取密码'
													}]
										}]
							},

							{
								xtype : 'combo',
								fieldLabel : '分红方式'
							}, {
								xtype : 'combo',
								fieldLabel : '账单寄送方式'
							}, {
								xtype : 'textfield',
								fieldLabel : '基金公司代码'
							}, {
								xtype : 'textfield',
								fieldLabel : '红利率'
							}, {
								xtype : 'datefield',
								fieldLabel : '交易日期'
							}, {
								xtype : 'datefield',
								fieldLabel : '交易时间'
							}]
				});

		this.gridPanel.addListener('rowdblclick', this.rowClick);
		// 交易历史开始
		this.hisPanelGrid = new HT.GridPanel({
			printable : false,
			exportable : false,
			id : 'hisPanelGrid',
			url : __ctxPath + "/customer/listCusSpeEve.do",
			url : __ctxPath + "/customer/listCusBusiInvoke.do",
			fields : [{
						name : 'busiHisId',
						type : 'int'
					}, 'cusBusiInvoke', 'chanTypeId', 'ownerId', 'busiTypeId',
					'staTime', 'endTime', 'busiCode', 'busiResId', 'cusCardNo',
					'remarks'],
			columns : [{
						header : 'knowId',
						dataIndex : 'opeHisId',
						hidden : true
					}, {
						header : '渠道类别',
						isExp : false,
						dataIndex : 'chanTypeId',
						renderer : function(value) {
							return CUSQDLB.value;
						}
					}, {
						header : '交易类型',
						isExp : false,
						dataIndex : 'busiTypeId',
						renderer : function(value) {
							return CUSJYLX.value;
						}
					}, {
						header : '开始时间',
						isExp : false,
						dataIndex : 'staTime'
					}, {
						header : '结束时间',
						isExp : false,
						dataIndex : 'endTime'
					}, {
						header : '交易码',
						isExp : false,
						dataIndex : 'busiCode'
					}, {
						header : '交易状态',
						isExp : false,
						dataIndex : 'busiResId',
						renderer : function(value) {
							return CUSJYZT.value;
						}
					}, {
						header : '客户卡号',
						isExp : false,
						dataIndex : 'cusCardNo'
					}, {
						header : '备注',
						isExp : false,
						dataIndex : 'remarks'
					}]
				// end of columns
			});
		this.hisPanel = new Ext.Panel({
					region : 'south',
					layout : 'fit',
					collapsible : true,
					autoScroll : true,
					id : 'HisPanel',
					title : '交易明细',
					split : true,
					height : 100
				});
		// 交易历史结束

		// 主框架开始
		this.mainPanel = new Ext.Panel({
			region : 'center',
			layout : 'border',
			title : '基金认购',
			collapsible : true,
			autoScroll : true,
			id : 'MainPanel',
			split : true,
			items : [this.gridPanel,this.hisPanel ]//
				// this.searchPanel,
			});
		// 主框架结束

		// 相关知识列表开始
		this.knowsSearchPanel = new Ext.FormPanel({
			layout : 'hbox',
			region : 'north',
			id : 'UkSysKnowSearchPanel',
			height : 35,
			items : [{
						name : 'Q_tiTle_S_EQ',
						xtype : 'textfield'
					}, {
						xtype : 'button',
						text : __search,
						iconCls : 'search',
						scope : this,
						handler : this.onKnowSearch
					}, {
						xtype : 'button',
						text : '更多',
						scope : this,
						iconCls : 'btn-reset',
						handler : function() {
							var searchPanel = ExtgetCmp('UkSysKnowSearchPanel');
							searchPanel.getForm().reset();
						}
					}]
		});
		this.knowsPanelGrid = new HT.GridPanel({
			region : 'center',
			printable : false,
			exportable : false,
			id : 'knowsPanelGrid',
			url : __ctxPath + "/know/newListUkSysKnow.do",
			fields : [{
						name : 'knowId',
						type : 'int'
					}, 'ukSysKnow', 'ukSysKnow', 'tiTle', 'busiType',
					'enableTime', 'pastTime', 'sysKnowStatus', 'viewCount',
					'sysKnowComment', 'plus1', 'plus2', 'plus3', 'plus4',
					'plus5', 'plus6', 'plus7', 'plus8', 'sysKnowVersion',
					'createBy', 'updateBy', 'createDate', 'updateDate',
					'userid'],
			columns : [{
						header : 'knowId',
						dataIndex : 'opeHisId',
						hidden : true
					}, {
						header : '知识标题',
						isExp : false,
						dataIndex : 'tiTle'
					}]
				// end of columns
			});

		this.knowsPanel = new Ext.Panel({
					region : 'center',
					layout : 'border',
					collapsible : true,
					autoScroll : true,
					id : 'KnowsPanel',
					title : '业务知识',
					split : true,
					items : [this.knowsSearchPanel, this.knowsPanelGrid]
				});

		// 相关知识列表结束

		this.customerformPanel = new Ext.FormPanel({
					layout : 'form',
					border : false,
					region : 'north',
					collapsible : true,
					height : 290,
					labelAlign : 'right',
					autoScroll : true,
					labelWidth : 70,
					defaults : {
						anchor : '95%,95%'
					},
					defaultType : 'textfield',
					items : [{
								fieldLabel : '标题',
								name : 'qcTarget.tarTopic',
								allowBlank : false,
								xtype : 'textfield',
								maxLength : 512
							}, {
								fieldLabel : '客户',
								name : 'qcTarget.tarTopic',
								allowBlank : false,
								xtype : 'textfield',
								maxLength : 512
							}, {
								fieldLabel : '性别',
								name : 'qcTarget.tarTopic',
								allowBlank : false,
								xtype : 'textfield',
								maxLength : 512
							}, {
								fieldLabel : '客户号',
								name : 'qcTarget.tarTopic',
								allowBlank : false,
								xtype : 'textfield',
								maxLength : 512
							}, {
								fieldLabel : '证件类型',
								name : 'qcTarget.tarTopic',
								allowBlank : false,
								xtype : 'textfield',
								maxLength : 512
							}, {
								fieldLabel : '证件号码',
								name : 'qcTarget.tarTopic',
								allowBlank : false,
								xtype : 'textfield',
								maxLength : 512
							}, {
								xtype : 'fieldset',
								title : "账号资料",
								collapsed : false,
								collapsible : true,
								autoHeight : true,
								defaults : {
									anchor : '100%,100%'
								},
								items : [{
											layout : 'form',
											border : false,
											items : [{
														fieldLabel : '账号',
														name : 'qcTarget.tarTopic',
														allowBlank : false,
														xtype : 'textfield',
														maxLength : 512
													}, {
														fieldLabel : '卡号',
														name : 'qcTarget.tarTopic',
														allowBlank : false,
														xtype : 'textfield',
														maxLength : 512
													}]
										}]
							}]
				})

		this.rightPanel = new Ext.Panel({
					layout : 'border',
					border : false,
					region : 'east',
					width : 240,
					items : [this.customerformPanel, this.knowsPanel]
				})
	},// end of the initComponents()
	// 重置查询表单
	reset : function() {
		this.searchPanel.getForm().reset();
	},
	// 按条件搜索
	onSearch : function(obj) {
		$search({
				searchPanel : this.searchPanel,
				gridPanel : this.gridPanel
			});
	},

	// 按条件搜索
	onKnowSearch : function(obj) {
		$search({
				searchPanel : this.knowsSearchPanel,
				gridPanel : this.knowsPanelGrid
			});
	},
	// GridPanel行点击处理事件
	rowClick : function(grid, rowindex, e) {
		grid.getSelectionModel().each(function(rec) {
					new CusHisForm({
								opeHisId : rec.data.opeHisId
							}).show();
				});
	},
	// 创建记录
	createRs : function() {
		// new CusHisForm().show();
		var tabs = Ext.getCmp('centerTabPanel');
		var aForm = Ext.getCmp('CusHisForm');
		if (aForm != null) {
			tabs.remove('CusHisForm');
		}
		aForm = new CusHisForm();
		tabs.add(aForm);
		tabs.activate(aForm);

	},
	// 按ID删除记录
	removeRs : function(id) {
		$postDel({
					url : __ctxPath + '/customer/multiDelCusHis.do',
					ids : id,
					grid : this.gridPanel
				});
	},
	// 把选中ID删除
	removeSelRs : function() {
		$delGridRs({
					url : __ctxPath + '/customer/multiDelCusHis.do',
					grid : this.gridPanel,
					idName : 'opeHisId'
				});
	},
	// 编辑Rs
	editRs : function(record) {
		new CusHisForm({
					opeHisId : record.data.opeHisId
				}).show();
	},
	// 行的Action
	onRowAction : function(grid, record, action, row, col) {
		switch (action) {
			case 'btn-del' :
				this.removeRs.call(this, record.data.opeHisId);
				break;
			case 'btn-edit' :
				this.editRs.call(this, record);
				break;
			default :
				break;
		}
	}
});