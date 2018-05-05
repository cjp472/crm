UkKnowRecommendMyView = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		UkKnowRecommendMyView.superclass.constructor.call(this, {
					id : 'UkKnowRecommendMyViewWin',
//					title : '我推荐的',// __UkKnowRecommendmyRecommend/
					region : 'center',
					layout : 'border',
					items : [this.searchPanel, this.gridPanel]
				});
	},// end of constructor
	// 初始化组件
	initUIComponents : function() {

		this.searchPanel = new Ext.FormPanel({
					layout : 'hbox',
					align : 'stretchmax',
					region : 'north',
					id : 'UkKnowRecomMySearchPanel',
					height : 35,
					items : [ {
								 text : '关键字：',
								 style:'margin-top:-3px'
							 }, {
								 xtype : 'textfield',
								 name : 'keywordName',
								 id : 'keywordName',
								 width : 100
							 },{
								text : '接收人:',
								style:'margin-top:-3px'
							}, {
//								name : 'Q_ukSysKnow.tiTle_S_LK',
								name : 'receiver',
								xtype : 'textfield',
								width : 100
							}, {
								text : '推荐时间:',
								style:'margin-top:-3px'
							}, {
								xtype:'datefield',
								id : 'myview_startTime',
								name : 'Q_operateTime_D_GT',
								format:'Y-m-d h-m-s',
								editable :false,
								width:100
							}, {
								xtype:'panel',
								border:false,
								html:'~'
							}, {
								xtype:'datefield',
								id : 'myview_endTime',
								name : 'Q_operateTime_D_LT',
								format:'Y-m-d h-m-s',
								editable :false,
								width:100
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
								handler : function(){
									this.searchPanel.getForm().reset();
									Ext.getCmp('myview_startTime').setRawValue('');
									Ext.getCmp('myview_endTime').setRawValue('');
								}
							}, {
								xtype : 'button',
								text : __advancedSearch,
								iconCls : 'search',
								scope : this,
								handler : function() {
									new UkSysKnowAdvancedSearchWin().show();
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
		this.gridPanel = new HT.GridPanel({
			region : 'center',
			// tbar : this.topbar,
			// 使用RowActions
//			rowActions : true,
			// printable : false,
			// exportable : false,
			// shim : true,
			// trackMouseOver : true,
			// disableSelection : false,
			// loadMask : true,
			id : 'UkKnowRecommendMyGrid',
			showSm:false,
//			url : __ctxPath + "/know/myTuiJianListUkPerKnow.do",
			url : __ctxPath + "/know/queryTuiJianListUkPerKnow.do",
			baseParams : {
				tuijian : '1'
			},
			fields : ['ukSysKnow', 'accepterName', 'operateTime' ,'readTime'],
			columns : [{
						header : '标题',
						width : 500,
						dataIndex : 'ukSysKnow',
						sortable : true,
						renderer : function(value) {
							if (value == null) {
								return '';
							} else {
								return value.tiTle;
							}
						}
					}, {
						header : '浏览数',
						dataIndex : 'ukSysKnow',
						sortable : true,
						renderer : function(value) {
							if (value == null) {
								return '';
							} else {
								return value.viewCount;
							}
						}
					}, {
						header : '接收人',
						dataIndex : 'accepterName',
						sortable : true
					}, {
						header : '推荐时间',
						dataIndex : 'operateTime',
						sortable : true
					}
					]
				// end of columns
			});

		this.gridPanel.addListener('rowdblclick', this.rowClick);

	},// end of the initComponents()
	// GridPanel行点击处理事件
	rowClick : function(grid, rowindex, e) {
		var tabs = Ext.getCmp('centerTabPanel');
		var aForm = Ext.getCmp('UkSysKnowShow');
		if (aForm != null) {
			tabs.remove('UkSysKnowShow');
		}
		var collForm = Ext.getCmp('UkKnowCollectFormWin');
		if (collForm != null) {
			tabs.remove(collForm);
		}
		var record = grid.getStore().getAt(rowindex); // Get the Record
		aForm = new UkSysKnowShow({
			knowId : record.get('ukSysKnow').knowId,
			knowTmpId : record.get('ukSysKnow').knowTmpId,
			knowTitle : record.get('ukSysKnow').tiTle
		});
		tabs.add(aForm);
		tabs.activate(aForm);
	},
	// 重置查询表单
	reset : function() {
		this.searchPanel.getForm().reset();
	},
	onSearch : function(obj) {
		$search({
				searchPanel : this.searchPanel,
				gridPanel : this.gridPanel
			});
	},
	// 编辑Rs
	showRs : function(record) {
		var tabs = Ext.getCmp('centerTabPanel');
		var aForm = Ext.getCmp('UkSysKnowShow');
		if (aForm != null) {
			tabs.remove('UkSysKnowShow');
		}
		var collForm = Ext.getCmp('UkKnowCollectFormWin');
				if (collForm != null) {
					tabs.remove(collForm);
				}
		aForm = new UkSysKnowShow({
					knowId : record.data.ukSysKnow.knowId,
					knowTmpId : record.data.ukSysKnow.ukKnowTemplate.knowTmpId,
					knowTitle : record.data.ukSysKnow.tiTle
				});
		tabs.add(aForm);
		tabs.activate(aForm);
	},
	// 行的Action
	onRowAction : function(grid, record, action, row, col) {
		switch (action) {
			// case 'btn-del':
			// this.removeRs.call(this, record.data.dianpingId);
			// break;
			case 'btn-readdocument' :
				this.showRs.call(this, record);
				break;
			default :
				break;
		}
	}

});
