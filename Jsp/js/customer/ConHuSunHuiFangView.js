/**
 * @author:cf0666@gmail.com
 * @class ConHushouView
 * @extends Ext.Panel
 * @description [ConHushou]管理
 * @company 优创融联科技
 * @createtime:
 */
ConHuSunHuiFangView = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		ConHuSunHuiFangView.superclass.constructor.call(this, {
					id : 'ConHuSunHuiFangViewWin',
					title : '呼损回访',
					region : 'center',
					layout : 'border',
					items : [this.tabpanel]
				});
	},// end of constructor
	// 初始化组件
	initUIComponents : function() {
		var fieldnameComboData = [['origAni', '主叫', new Ext.form.TextField({
									name : 'origAni',
									allowBlank : true
								})],
				['origDnis', '被叫', new Ext.form.TextField({
									name : 'origDnis',
									allowBlank : true
								})],
				['enterTime', '开始时间', new Ext.form.DateField({
									hiddenName : 'enterTime',
									format : 'Y-m-d'
								})],
				['endTime', '结束时间', new Ext.form.DateField({
									hiddenName : 'endTime',
									format : 'Y-m-d'
								})],
				['endReason', '呼损原因&CONHSYY', new Ext.form.NumberField({
									name : 'endReason',
									allowBlank : true
								})], ['vdn', 'VDN', new Ext.form.TextField({
									name : 'vdn',
									allowBlank : true
								})], ['split', '技能组', new Ext.form.TextField({
									name : 'split',
									allowBlank : true
								})],
				['ivrNod', 'IVR节点', new Ext.form.TextField({
									name : 'ivrNod',
									allowBlank : true
								})],
				['agentid', '接入工号', new Ext.form.TextField({
									name : 'agentid',
									allowBlank : true
								})],
				['station', '接入分机号', new Ext.form.TextField({
									name : 'station',
									allowBlank : true
								})], ['dur', '时长', new Ext.form.NumberField({
									name : 'dur',
									allowBlank : true
								})],
				['synTime', '同步时间', new Ext.form.TextField({
									name : 'synTime',
									allowBlank : true
								})],
				['assignId', '分配人', new Ext.form.NumberField({
									name : 'assignId',
									allowBlank : true
								})],
				['assignTime', '分配时间', new Ext.form.DateField({
									hiddenName : 'assignTime',
									format : 'Y-m-d'
								})],
				['ownerId', '负责人', new Ext.form.NumberField({
									name : 'ownerId',
									allowBlank : true
								})],
				['acceptTime', '领用时间', new Ext.form.DateField({
									hiddenName : 'acceptTime',
									format : 'Y-m-d'
								})],
				['dealStaId', '处理状态&CONCLZT', new Ext.form.NumberField({
									name : 'dealStaId',
									allowBlank : true
								})],
				['dealResId', '处理结果&CONCLZT', new Ext.form.NumberField({
									name : 'dealResId',
									allowBlank : true
								})],
				['dealRemarks', '处理备注', new Ext.form.TextField({
									name : 'dealRemarks',
									allowBlank : true
								})]]
		var ConHushouAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : '[ConHushou]高级查询',
					fieldData : fieldnameComboData
				});
		// 初始化搜索条件Panel
		this.searchPanel = new Ext.FormPanel({
					layout : 'hbox',
					region : 'north',
					id : 'ConHushouSearchPanel',
					height : 35,
					items : [{
								border : false,
								width : 70,
								style : 'text-align:right',
								html : '主叫：'
							}, {
								name : 'Q_origAni_S_EQ',
								xtype : 'textfield'
							}, {
								border : false,
								width : 70,
								style : 'text-align:right',
								html : '处理人：'
							}, {
								name : 'Q_origDnis_S_EQ',
								xtype : 'textfield'
							}, {
								border : false,
								width : 70,
								style : 'text-align:right',
								html : '处理状态：'
							}, {
								hiddenName : 'Q_dealResId_SN_EQ',
										xtype : 'mtdiccombo',
										editable : true,
										lazyInit : false,
										forceSelection : false,
										itemKey : 'CONCLZT'
							}	, {
								xtype : 'button',
								text : __reset,
								scope : this,
								iconCls : 'btn-reset',
								handler : this.reset
							}, {
								xtype : 'button',
								text : __advancedSearch,
								iconCls : 'search',
								scope : this,
								handler : function() {
									new ConHushouAdvancedSearchWin().show();
								}
							}],
					layoutConfig : {
						padding : '5',
						align : 'middle'
					},
					defaults : {
						xtype : 'label',
						border : false,
						margins : {
							top : 0,
							right : 4,
							bottom : 4,
							left : 4
						}
					},
					border : false,
					frame : false
				});// end of searchPanel
		this.preSearchPanel = new Ext.FormPanel({
					layout : 'hbox',
					region : 'north',
					id : 'PreConHushouSearchPanel',
					height : 35,
					items : [{
								border : false,
								width : 70,
								style : 'text-align:right',
								html : '主叫：'
							}, {
								name : 'Q_origAni_S_EQ',
								xtype : 'textfield'
							}, {
								border : false,
								width : 70,
								style : 'text-align:right',
								html : '处理人：'
							}, {
								name : 'Q_origDnis_S_EQ',
								xtype : 'textfield'
							}, {
								border : false,
								width : 70,
								style : 'text-align:right',
								html : '处理状态：'
							}, {
								hiddenName : 'Q_dealResId_SN_EQ',
										xtype : 'mtdiccombo',
										editable : true,
										lazyInit : false,
										forceSelection : false,
										itemKey : 'CONCLZT'
							}, {
								xtype : 'button',
								text : __reset,
								scope : this,
								iconCls : 'btn-reset',
								handler : this.reset
							}, {
								xtype : 'button',
								text : __advancedSearch,
								iconCls : 'search',
								scope : this,
								handler : function() {
									new ConHushouAdvancedSearchWin().show();
								}
							}],
					layoutConfig : {
						padding : '5',
						align : 'middle'
					},
					defaults : {
						xtype : 'label',
						border : false,
						margins : {
							top : 0,
							right : 4,
							bottom : 4,
							left : 4
						}
					},
					border : false,
					frame : false
				});// end of searchPanel
		this.allSearchPanel = new Ext.FormPanel({
					layout : 'hbox',
					region : 'north',
					id : 'AllConHushouSearchPanel',
					height : 35,
					items : [{
								border : false,
								width : 70,
								style : 'text-align:right',
								html : '主叫：'
							}, {
								name : 'Q_origAni_S_EQ',
								xtype : 'textfield'
							}, {
								border : false,
								width : 70,
								style : 'text-align:right',
								html : '处理人：'
							}, {
								name : 'Q_origDnis_S_EQ',
								xtype : 'textfield'
							}, {
								border : false,
								width : 70,
								style : 'text-align:right',
								html : '处理状态：'
							}, {
								xtype : 'button',
								text : __reset,
								scope : this,
								iconCls : 'btn-reset',
								handler : this.reset
							}, {
								xtype : 'button',
								text : __advancedSearch,
								iconCls : 'search',
								scope : this,
								handler : function() {
									new ConHushouAdvancedSearchWin().show();
								}
							}],
					layoutConfig : {
						padding : '5',
						align : 'middle'
					},
					defaults : {
						xtype : 'label',
						border : false,
						margins : {
							top : 0,
							right : 4,
							bottom : 4,
							left : 4
						}
					},
					border : false,
					frame : false
				});// end of searchPanel

		this.allSearchPanel = new Ext.FormPanel({
					layout : 'hbox',
					region : 'north',
					id : 'AllConHushouSearchPanel',
					height : 35,
					items : [{
								border : false,
								width : 70,
								style : 'text-align:right',
								html : '主叫：'
							}, {
								name : 'Q_origAni_S_EQ',
								xtype : 'textfield'
							}, {
								border : false,
								width : 70,
								style : 'text-align:right',
								html : '处理人：'
							}, {
								name : 'Q_origDnis_S_EQ',
								xtype : 'textfield'
							}, {
								border : false,
								width : 70,
								style : 'text-align:right',
								html : '处理状态：'
							}, {
								hiddenName : 'Q_dealResId_SN_EQ',
										xtype : 'mtdiccombo',
										editable : true,
										lazyInit : false,
										forceSelection : false,
										itemKey : 'CONCLZT'
							}, {
								xtype : 'button',
								text : __reset,
								scope : this,
								iconCls : 'btn-reset',
								handler : this.reset
							}, {
								xtype : 'button',
								text : __advancedSearch,
								iconCls : 'search',
								scope : this,
								handler : function() {
									new ConHushouAdvancedSearchWin().show();
								}
							}],
					layoutConfig : {
						padding : '5',
						align : 'middle'
					},
					defaults : {
						xtype : 'label',
						border : false,
						margins : {
							top : 0,
							right : 4,
							bottom : 4,
							left : 4
						}
					},
					border : false,
					frame : false
				});// end of searchPanel
		this.readySearchPanel = new Ext.FormPanel({
					layout : 'hbox',
					region : 'north',
					id : 'AllConHushouSearchPanel',
					height : 35,
					items : [{
								border : false,
								width : 70,
								style : 'text-align:right',
								html : '主叫：'
							}, {
								name : 'Q_origAni_S_EQ',
								xtype : 'textfield'
							}, {
								border : false,
								width : 70,
								style : 'text-align:right',
								html : '处理人：'
							}, {
								name : 'Q_origDnis_S_EQ',
								xtype : 'textfield'
							}, {
								border : false,
								width : 70,
								style : 'text-align:right',
								html : '处理状态：'
							}, {
								hiddenName : 'Q_dealResId_SN_EQ',
										xtype : 'mtdiccombo',
										editable : true,
										lazyInit : false,
										forceSelection : false,
										itemKey : 'CONCLZT'
							}, {
								xtype : 'button',
								text : __reset,
								scope : this,
								iconCls : 'btn-reset',
								handler : this.reset
							}, {
								xtype : 'button',
								text : __advancedSearch,
								iconCls : 'search',
								scope : this,
								handler : function() {
									new ConHushouAdvancedSearchWin().show();
								}
							}],
					layoutConfig : {
						padding : '5',
						align : 'middle'
					},
					defaults : {
						xtype : 'label',
						border : false,
						margins : {
							top : 0,
							right : 4,
							bottom : 4,
							left : 4
						}
					},
					border : false,
					frame : false
				});// end of searchPanel
		this.noSearchPanel = new Ext.FormPanel({
					layout : 'hbox',
					region : 'north',
					id : 'NoConHushouSearchPanel',
					height : 35,
					items : [{
								border : false,
								width : 70,
								style : 'text-align:right',
								html : '主叫：'
							}, {
								name : 'Q_origAni_S_EQ',
								xtype : 'textfield'
							}, {
								border : false,
								width : 70,
								style : 'text-align:right',
								html : '处理人：'
							}, {
								name : 'Q_origDnis_S_EQ',
								xtype : 'textfield'
							}, {
								border : false,
								width : 70,
								style : 'text-align:right',
								html : '处理状态：'
							}, {
								hiddenName : 'Q_dealResId_SN_EQ',
										xtype : 'mtdiccombo',
										editable : true,
										lazyInit : false,
										forceSelection : false,
										itemKey : 'CONCLZT'
							}, {
								xtype : 'button',
								text : __reset,
								scope : this,
								iconCls : 'btn-reset',
								handler : this.reset
							}, {
								xtype : 'button',
								text : __advancedSearch,
								iconCls : 'search',
								scope : this,
								handler : function() {
									new ConHushouAdvancedSearchWin().show();
								}
							}],
					layoutConfig : {
						padding : '5',
						align : 'middle'
					},
					defaults : {
						xtype : 'label',
						border : false,
						margins : {
							top : 0,
							right : 4,
							bottom : 4,
							left : 4
						}
					},
					border : false,
					frame : false
				});// end of searchPanel
		this.topbar = new Ext.Toolbar({
					items : [{
								iconCls : 'btn-add',
								// text : __create+'[ConHushou]',
								text : __create,
								xtype : 'button',
								scope : this,
								handler : this.createRs
							}, {
								iconCls : 'btn-del',
								// text : __delete+'[ConHushou]',
								text : __delete,
								xtype : 'button',
								scope : this,
								handler : this.removeSelRs
							}]
				});
		this.gridPanel = new HT.GridPanel({
			region : 'center',
			// tbar : this.topbar,
			// 使用RowActions
			rowActions : true,
			printable : false,
			exportable : false,
			id : 'ConHushouGrid',
			url : __ctxPath + "/customer/listConHushou.do",
			fields : [{
						name : 'conId',
						type : 'int'
					}, 'origAni', 'origDnis', 'enterTime', 'endTime',
					'endReason', 'vdn', 'split', 'ivrNod', 'agentid',
					'station', 'dur', 'synTime', 'assignId', 'assignTime',
					'ownerId', 'acceptTime', 'dealStaId', 'dealResId',
					'dealRemarks'],
			columns : [{
						header : 'conId',
						dataIndex : 'conId',
						hidden : true
					}, {
						header : '主叫',
						isExp : false,
						dataIndex : 'origAni'
					}, {
						header : '被叫',
						isExp : false,
						dataIndex : 'origDnis'
					}, {
						header : '最后呼叫时间',
						isExp : false,
						dataIndex : 'endTime'
					}, {
						header : '重复次数',
						isExp : false,
						dataIndex : 'enterTime'
						// }, {
					// header : '呼损原因',
					// isExp : false,
					// dataIndex : 'endReason',
					// renderer : function(value) {
					// return CONHSYY.value;
					// }
					// }, {
					// header : 'VDN',
					// isExp : false,
					// dataIndex : 'vdn'
					// }, {
					// header : '技能组',
					// isExp : false,
					// dataIndex : 'split'
					// }, {
					// header : '工号',
					// isExp : false,
					// dataIndex : 'agentid'
					// }, {
					// header : '分机号',
					// isExp : false,
					// dataIndex : 'station'
					// }, {
					// header : 'IVR节点',
					// isExp : false,
					// dataIndex : 'ivrNod'
					// }, {
					// header : '时长',
					// isExp : false,
					// dataIndex : 'dur'
					// }, {
					// header : '同步时间',
					// isExp : false,
					// dataIndex : 'synTime'
					// }, {
					// header : '分配人',
					// isExp : false,
					// dataIndex : 'assignId'
				}	, {
						header : '分配时间',
						isExp : false,
						dataIndex : 'assignTime'
					}, {
						header : '负责人',
						isExp : false,
						dataIndex : 'ownerId'
						// }, {
					// header : '领用时间',
					// isExp : false,
					// dataIndex : 'acceptTime'
				}	, {
						header : '处理状态',
						isExp : false,
						dataIndex : 'dealStaId',
						renderer : function(value) {
							return CONCLZT.value;
						}
					}, {
						header : '处理结果',
						isExp : false,
						dataIndex : 'dealResId',
						renderer : function(value) {
							return CONCLZT.value;
						}
						// }, {
					// header : '处理备注',
					// isExp : false,
					// dataIndex : 'dealRemarks'
				}	, new Ext.ux.grid.RowActions({
								header : __action,
								width : 100,
								actions : [{
											iconCls : 'callme',
											qtip : '回拨',
											style : 'margin:0 3px 0 3px'
										}, {
											iconCls : 'btn-form-design',
											qtip : '详情',
											style : 'margin:0 3px 0 3px'
										}],
								listeners : {
									scope : this,
									'action' : this.onRowAction
								}
							})]
				// end of columns
			});

		this.gridPanel.addListener('rowdblclick', this.rowClick);

		this.allGridPanel = new HT.GridPanel({
			region : 'center',
			// tbar : this.topbar,
			// 使用RowActions
			rowActions : true,
			layout : 'fit',
			printable : false,
			exportable : false,
			id : 'AllConHushouGrid',
			url : __ctxPath + "/customer/listConHushou.do",
			fields : [{
						name : 'conId',
						type : 'int'
					}, 'origAni', 'origDnis', 'enterTime', 'endTime',
					'endReason', 'vdn', 'split', 'ivrNod', 'agentid',
					'station', 'dur', 'synTime', 'assignId', 'assignTime',
					'ownerId', 'acceptTime', 'dealStaId', 'dealResId',
					'dealRemarks'],
			columns : [{
						header : 'conId',
						dataIndex : 'conId',
						hidden : true
					}, {
						header : '主叫',
						isExp : false,
						dataIndex : 'origAni'
					}, {
						header : '被叫',
						isExp : false,
						dataIndex : 'origDnis'
					}, {
						header : '最后呼叫时间',
						isExp : false,
						dataIndex : 'endTime'
					}, {
						header : '重复次数',
						isExp : false,
						dataIndex : 'enterTime'
					}, {
						header : '分配时间',
						isExp : false,
						dataIndex : 'assignTime'
					}, {
						header : '负责人',
						isExp : false,
						dataIndex : 'ownerId'
					}, {
						header : '处理状态',
						isExp : false,
						dataIndex : 'dealStaId',
						renderer : function(value) {
							return CONCLZT.value;
						}
					}, {
						header : '处理结果',
						isExp : false,
						dataIndex : 'dealResId',
						renderer : function(value) {
							return CONCLZT.value;
						}
					}, {
						header : '预约时间',
						isExp : false,
						dataIndex : 'assignTime'
					}, {
						header : '预约号码',
						isExp : false,
						dataIndex : 'ownerId'
					}, new Ext.ux.grid.RowActions({
								header : __action,
								width : 100,
								actions : [{
											iconCls : 'callme',
											qtip : '回拨',
											style : 'margin:0 3px 0 3px'
										}, {
											iconCls : 'btn-form-design',
											qtip : '详情',
											style : 'margin:0 3px 0 3px'
										}],
								listeners : {
									scope : this,
									'action' : this.onRowAction
								}
							})]
				// end of columns
			});

		this.allGridPanel.addListener('rowdblclick', this.rowClick);

		this.readyGridPanel = new HT.GridPanel({
			region : 'center',
			// tbar : this.topbar,
			// 使用RowActions
			rowActions : true,
			printable : false,
			exportable : false,
			id : 'AllConHushouGrid',
			url : __ctxPath + "/customer/listConHushou.do",
			fields : [{
						name : 'conId',
						type : 'int'
					}, 'origAni', 'origDnis', 'enterTime', 'endTime',
					'endReason', 'vdn', 'split', 'ivrNod', 'agentid',
					'station', 'dur', 'synTime', 'assignId', 'assignTime',
					'ownerId', 'acceptTime', 'dealStaId', 'dealResId',
					'dealRemarks'],
			columns : [{
						header : 'conId',
						dataIndex : 'conId',
						hidden : true
					}, {
						header : '主叫',
						isExp : false,
						dataIndex : 'origAni'
					}, {
						header : '被叫',
						isExp : false,
						dataIndex : 'origDnis'
					}, {
						header : '最后呼叫时间',
						isExp : false,
						dataIndex : 'endTime'
					}, {
						header : '重复次数',
						isExp : false,
						dataIndex : 'enterTime'
					}, {
						header : '分配时间',
						isExp : false,
						dataIndex : 'assignTime'
					}, {
						header : '负责人',
						isExp : false,
						dataIndex : 'ownerId'
					}, {
						header : '处理状态',
						isExp : false,
						dataIndex : 'dealStaId',
						renderer : function(value) {
							return CONCLZT.value;
						}
					}, {
						header : '处理结果',
						isExp : false,
						dataIndex : 'dealResId',
						renderer : function(value) {
							return CONCLZT.value;
						}
					}, new Ext.ux.grid.RowActions({
								header : __action,
								width : 100,
								actions : [{
											iconCls : 'callme',
											qtip : '回拨',
											style : 'margin:0 3px 0 3px'
										}, {
											iconCls : 'btn-form-design',
											qtip : '详情',
											style : 'margin:0 3px 0 3px'
										}],
								listeners : {
									scope : this,
									'action' : this.onRowAction
								}
							})]
				// end of columns
			});

		this.readyGridPanel.addListener('rowdblclick', this.rowClick);

		this.noGridPanel = new HT.GridPanel({
			region : 'center',
			// tbar : this.topbar,
			// 使用RowActions
			rowActions : true,
			printable : false,
			exportable : false,
			id : 'NoConHushouGrid',
			url : __ctxPath + "/customer/listConHushou.do",
			fields : [{
						name : 'conId',
						type : 'int'
					}, 'origAni', 'origDnis', 'enterTime', 'endTime',
					'endReason', 'vdn', 'split', 'ivrNod', 'agentid',
					'station', 'dur', 'synTime', 'assignId', 'assignTime',
					'ownerId', 'acceptTime', 'dealStaId', 'dealResId',
					'dealRemarks'],
			columns : [{
						header : 'conId',
						dataIndex : 'conId',
						hidden : true
					}, {
						header : '主叫',
						isExp : false,
						dataIndex : 'origAni'
					}, {
						header : '被叫',
						isExp : false,
						dataIndex : 'origDnis'
					}, {
						header : '最后呼叫时间',
						isExp : false,
						dataIndex : 'endTime'
					}, {
						header : '重复次数',
						isExp : false,
						dataIndex : 'enterTime'
					}, {
						header : '处理时间',
						isExp : false,
						dataIndex : 'acceptTime'

					}, {
						header : '分配时间',
						isExp : false,
						dataIndex : 'assignTime'
					}, {
						header : '负责人',
						isExp : false,
						dataIndex : 'ownerId'
					}, {
						header : '处理状态',
						isExp : false,
						dataIndex : 'dealStaId',
						renderer : function(value) {
							return CONCLZT.value;
						}
					}, {
						header : '处理结果',
						isExp : false,
						dataIndex : 'dealResId',
						renderer : function(value) {
							return CONCLZT.value;
						}
					}, new Ext.ux.grid.RowActions({
								header : __action,
								width : 100,
								actions : [{
											iconCls : 'callme',
											qtip : '回拨',
											style : 'margin:0 3px 0 3px'
										}, {
											iconCls : 'btn-form-design',
											qtip : '详情',
											style : 'margin:0 3px 0 3px'
										}],
								listeners : {
									scope : this,
									'action' : this.onRowAction
								}
							})]
				// end of columns
			});

		this.noGridPanel.addListener('rowdblclick', this.rowClick);

		this.preGridPanel = new HT.GridPanel({
			region : 'center',
			// tbar : this.topbar,
			// 使用RowActions
			rowActions : true,
			printable : false,
			exportable : false,
			id : 'PreConHushouGrid',
			url : __ctxPath + "/customer/listConHushou.do",
			fields : [{
						name : 'conId',
						type : 'int'
					}, 'origAni', 'origDnis', 'enterTime', 'endTime',
					'endReason', 'vdn', 'split', 'ivrNod', 'agentid',
					'station', 'dur', 'synTime', 'assignId', 'assignTime',
					'ownerId', 'acceptTime', 'dealStaId', 'dealResId',
					'dealRemarks'],
			columns : [{
						header : 'conId',
						dataIndex : 'conId',
						hidden : true
					}, {
						header : '主叫',
						isExp : false,
						dataIndex : 'origAni'
					}, {
						header : '被叫',
						isExp : false,
						dataIndex : 'origDnis'
					}, {
						header : '最后呼叫时间',
						isExp : false,
						dataIndex : 'endTime'
					}, {
						header : '重复次数',
						isExp : false,
						dataIndex : 'enterTime'

					}, {
						header : '分配时间',
						isExp : false,
						dataIndex : 'assignTime'
					}, {
						header : '负责人',
						isExp : false,
						dataIndex : 'ownerId'
					}, {
						header : '预约时间',
						isExp : false,
						dataIndex : 'acceptTime'
					}, {
						header : '处理状态',
						isExp : false,
						dataIndex : 'dealStaId',
						renderer : function(value) {
							return CONCLZT.value;
						}
					}, {
						header : '处理结果',
						isExp : false,
						dataIndex : 'dealResId',
						renderer : function(value) {
							return CONCLZT.value;
						}
					}, new Ext.ux.grid.RowActions({
								header : __action,
								width : 100,
								actions : [{
											iconCls : 'callme',
											qtip : '回拨',
											style : 'margin:0 3px 0 3px'
										}, {
											iconCls : 'btn-form-design',
											qtip : '详情',
											style : 'margin:0 3px 0 3px'
										}],
								listeners : {
									scope : this,
									'action' : this.onRowAction
								}
							})]
				// end of columns
			});

		this.preGridPanel.addListener('rowdblclick', this.rowClick);

		this.tabpanel = new Ext.TabPanel({
					activeTab : 0,// 激活第一个panel
					plain : true,
					region : 'center',
					defaultType : 'panel',
					bodyStyle : 'padding:5px;',
					items : [{
								title : '全部任务',
								layout : 'border',
								defaultType : 'textfield',
								defaults : {
									anchor : '100%,100%'
								},
								items : [this.allSearchPanel, this.allGridPanel]
							}, {
								title : '待执行任务',
								layout : 'border',
								defaultType : 'textfield',
								defaults : {
									anchor : '100%,100%'
								},
								items : [this.readySearchPanel,
										this.readyGridPanel]
							}, {
								title : '未执行任务',
								layout : 'border',
								defaultType : 'textfield',
								defaults : {
									anchor : '100%,100%'
								},
								items : [this.noSearchPanel, this.noGridPanel]
							}, {
								title : '预约任务',
								layout : 'border',
								defaultType : 'textfield',
								defaults : {
									anchor : '100%,100%'
								},
								items : [this.preSearchPanel, this.preGridPanel]
							}, {
								title : '待跟踪任务',
								layout : 'border',
								defaultType : 'textfield',
								defaults : {
									anchor : '100%,100%'
								},
								items : [this.searchPanel, this.gridPanel]
							}]
				});
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
	// GridPanel行点击处理事件
	rowClick : function(grid, rowindex, e) {
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ConHuSunHuiFangDelForm');
				if (aForm != null) {
					tabs.remove('ConHuSunHuiFangDelForm');
				}
				aForm = new ConHuSunHuiFangDelForm({
				         grid : grid
				  });
				tabs.add(aForm);
				tabs.activate(aForm);	
			},
	// 创建记录
	createRs : function() {
		// new ConHushouForm().show();
		var tabs = Ext.getCmp('centerTabPanel');
		var aForm = Ext.getCmp('ConHushouForm');
		if (aForm != null) {
			tabs.remove('ConHushouForm');
		}
		aForm = new ConHushouForm();
		tabs.add(aForm);
		tabs.activate(aForm);

	},
	// 按ID删除记录
	removeRs : function(id) {
		$postDel({
					url : __ctxPath + '/customer/multiDelConHushou.do',
					ids : id,
					grid : this.gridPanel
				});
	},
	// 把选中ID删除
	removeSelRs : function() {
		$delGridRs({
					url : __ctxPath + '/customer/multiDelConHushou.do',
					grid : this.gridPanel,
					idName : 'conId'
				});
	},
	// 编辑Rs
	editRs : function(record) {
		// new ConHushouForm({
		// conId : record.data.conId
		// }).show();
		var tabs = Ext.getCmp('centerTabPanel');
		var aForm = Ext.getCmp('ConHushouForm');
		if (aForm != null) {
			tabs.remove('ConHushouForm');
		}
		aForm = new ConHushouForm({
					conId : record.data.conId
				});
		tabs.add(aForm);
		tabs.activate(aForm);
	},
	// 行的Action
	onRowAction : function(grid, record, action, row, col) {
		switch (action) {
			case 'callme' :{
				var tabs = Ext.getCmp('centerTabPanel');
					var aForm = Ext.getCmp('CushusunhuifanghuiboForm');
					if (aForm != null) {
						tabs.remove('ConhusunhuifangFormWin');
					}
					aForm = new ConhusunhuifangForm();
					tabs.add(aForm);
					tabs.activate(aForm);
				break;
			}
			case 'btn-form-design' :{
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ConHuSunHuiFangDelForm');
				if (aForm != null) {
					tabs.remove('ConHuSunHuiFangDelForm');
				}
				aForm = new ConHuSunHuiFangDelForm({
				         grid : this.preGridPanel
				  });
				tabs.add(aForm);
				tabs.activate(aForm);	
				break;
			}
			default :
				break;
		}
	}
});
