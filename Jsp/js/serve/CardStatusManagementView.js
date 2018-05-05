/**
 * @author:cf0666@gmail.com
 * @class CusHisView
 * @extends Ext.Panel
 * @description [CusHis]管理
 * @company 优创融联科技
 * @createtime:
 */
CardStatusManagementView = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		CardStatusManagementView.superclass.constructor.call(this, {
			id : 'CardStatusManagementViewWin',
			title : '卡状态管理',
			region : 'center',
			layout : 'border',
			items : [ this.mainPanel,this.knowsPanel,this.hisPanel  ]
		});
	},// end of constructor
	// 初始化组件
	initUIComponents : function() {
		
		// 初始化搜索条件Panel
		this.searchPanel = new Ext.FormPanel( {
			layout : 'hbox',
			region : 'north',
			id : 'CusHisSearchPanel',
			height : 35,
			items : [  {text:'卡号'},{

				name : 'Q_opeUseId_N_EQ',
				xtype : 'numberfield'
			}, {text:'账单年月'},{
				name : 'Q_rowDat_D_EQ',
				xtype : 'numberfield'
			}, {
				xtype : 'button',
				text : __search,
				iconCls : 'search',
				scope : this,
				handler : this.onSearch
			}, {
				xtype : 'button',
				text : __reset,
				scope : this,
				iconCls : 'btn-reset',
				handler : this.reset
			} ],
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
		this.gridPanel = new HT.GridPanel( {
			region : 'center',
			printable : false,
			foxable:true,
			emailable:true,
			exportable : false,
			id : 'CusHisGrid',
			url : __ctxPath + "/customer/listCusHis.do",
			fields : [ {
				name : 'opeHisId',
				type : 'int'
			}, 'cusHis', 'opeUseId', 'rowDat', 'opeTypId', 'opeResDesc' ],
			columns : [ {
				header : 'opeHisId',
				dataIndex : 'opeHisId',
				hidden : true
			}, {
				header : '记录日期',
				isExp : true,
				dataIndex : 'customerid',
				renderer : function(val) {
					return val.customeridName;
				}
			}, {
				header : '消费时间',
				isExp : true,

				dataIndex : 'opeUseId'
			}, {
				header : '交易流水号',
				isExp : true,

				dataIndex : 'rowDat'
			}, {
				header : '交易金额',
				isExp : true,

				dataIndex : 'opeTypId'
			}, {
				header : '交易金额符号',
				isExp : true,

				dataIndex : 'opeResDesc'
			}, {
				header : '交易描述',
				isExp : false,

				dataIndex : 'opeResDesc'
			}, {
				header : '卡号后四位',
				isExp : false,

				dataIndex : 'opeResDesc'
			}, {
				header : '分期付款标志',
				isExp : false,

				dataIndex : 'opeResDesc'
			}, {
				header : '撤销冲正标志',
				isExp : false,

				dataIndex : 'opeResDesc'
			}]
		//end of columns
	});

		this.gridPanel.addListener('rowdblclick', this.rowClick);
		
		// 主框架开始
		this.mainPanel = new Ext.Panel({
					region : 'center',
					layout : 'border',
					title : '卡状态管理',
					collapsible : true,
					autoScroll : true,
					id : 'MainPanel',
					split : true,
					items : [this.searchPanel, this.gridPanel]
				});
		//主框架结束
		
		// 相关知识列表开始
		this.knowsSearchPanel = new Ext.FormPanel({
			layout : 'hbox',
			region : 'north',
			id : 'UkSysKnowSearchPanel',
			height : 35,
			items : [{
						name : 'Q_tiTle_S_EQ',
						xtype : 'textfield'
					},{
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
	this.knowsPanelGrid = new HT.GridPanel( {
			region : 'center',
			printable : false,
			exportable : false,
			id : 'knowsPanelGrid',
			url : __ctxPath + "/know/newListUkSysKnow.do",
			fields : [ {
						name : 'knowId',
						type : 'int'
					}, 'ukSysKnow', 'ukSysKnow', 'tiTle', 'busiType',
					'enableTime', 'pastTime', 'sysKnowStatus', 'viewCount',
					'sysKnowComment', 'plus1', 'plus2', 'plus3', 'plus4',
					'plus5', 'plus6', 'plus7', 'plus8', 'sysKnowVersion',
					'createBy', 'updateBy', 'createDate', 'updateDate',
					'userid'],
			columns : [ {
				header : 'knowId',
				dataIndex : 'opeHisId',
				hidden : true
			}, {
				header : '知识标题',
				isExp : false,
				dataIndex : 'tiTle'
			}]
		//end of columns
	});
		
		this.knowsPanel = new Ext.Panel({
					region : 'east',
					layout : 'border',
					collapsible : true,
					autoScroll : true,
					id : 'KnowsPanel',
					title : '相关知识列表',
					split : true,
					width : 240,
					items : [this.knowsSearchPanel,this.knowsPanelGrid]
				});
		

		//相关知识列表结束
		
		
		// 交易历史开始
	this.hisPanelGrid = new HT.GridPanel( {
			region : 'center',
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
			columns : [ {
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
			},{
				header : '交易类型',
				isExp : false,
				dataIndex : 'busiTypeId',
						renderer : function(value) {
							return CUSJYLX.value;
						}
			},{
				header : '开始时间',
				isExp : false,
				dataIndex : 'staTime'
			},{
				header : '结束时间',
				isExp : false,
				dataIndex : 'endTime'
			},{
				header : '交易码',
				isExp : false,
				dataIndex : 'busiCode'
			},{
				header : '交易状态',
				isExp : false,
				dataIndex : 'busiResId',
						renderer : function(value) {
							return CUSJYZT.value;
						}
			},{
				header : '客户卡号',
				isExp : false,
				dataIndex : 'cusCardNo'
			},{
				header : '备注',
				isExp : false,
				dataIndex : 'remarks'
			}]
		//end of columns
	});
		this.hisPanel = new Ext.Panel({
					region : 'south',
					layout : 'anchor',
					collapsible : true,
					autoScroll : true,
					id : 'HisPanel',
					title : '交易历史',
					split : true,
					height : 60,
					items : [this.hisPanelGrid]
				});
		//交易历史结束


	},// end of the initComponents()
	//重置查询表单
	reset : function() {
		this.searchPanel.getForm().reset();
	},
	//按条件搜索
	onSearch : function(obj) {
		$search({
				searchPanel : this.searchPanel,
				gridPanel : this.gridPanel
			});
	},
	
	//按条件搜索
	onKnowSearch : function(obj) {
		$search({
				searchPanel : this.knowsSearchPanel,
				gridPanel : this.knowsPanelGrid
			});
	},
	//GridPanel行点击处理事件
	rowClick : function(grid, rowindex, e) {
		grid.getSelectionModel().each(function(rec) {
			new CusHisForm( {
				opeHisId : rec.data.opeHisId
			}).show();
		});
	},
	//创建记录
	createRs : function() {
		//new CusHisForm().show();
		var tabs = Ext.getCmp('centerTabPanel');
		var aForm = Ext.getCmp('CusHisForm');
		if (aForm != null) {
			tabs.remove('CusHisForm');
		}
		aForm = new CusHisForm();
		tabs.add(aForm);
		tabs.activate(aForm);

	},
	//按ID删除记录
	removeRs : function(id) {
		$postDel( {
			url : __ctxPath + '/customer/multiDelCusHis.do',
			ids : id,
			grid : this.gridPanel
		});
	},
	//把选中ID删除
	removeSelRs : function() {
		$delGridRs( {
			url : __ctxPath + '/customer/multiDelCusHis.do',
			grid : this.gridPanel,
			idName : 'opeHisId'
		});
	},
	//编辑Rs
	editRs : function(record) {
		new CusHisForm( {
			opeHisId : record.data.opeHisId
		}).show();
	},
	//行的Action
	onRowAction : function(grid, record, action, row, col) {
		switch (action) {
		case 'btn-del':
			this.removeRs.call(this, record.data.opeHisId);
			break;
		case 'btn-edit':
			this.editRs.call(this, record);
			break;
		default:
			break;
		}
	}
});
