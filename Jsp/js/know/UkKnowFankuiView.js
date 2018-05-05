
UkKnowFankuiView = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		UkKnowFankuiView.superclass.constructor.call(this, {
			id : 'UkKnowFankuiViewWin',
			title : '知识反馈',
			region : 'center',
			layout : 'border',
			items : [this.searchPanel, this.gridPanel]
		});
	},// end of constructor
	// 初始化组件
	initUIComponents : function() {
		// 初始化搜索条件Panel
		this.searchPanel = new Ext.FormPanel({
			layout : 'hbox',
			region : 'north',
			id : 'UkKnowFankuiSearchPanel',
			height : 35,
			items : [{
						text : '标题:',
						style:'margin-top:-3px'
					}, {
						name : 'Q_tiTle_S_LK',
						xtype : 'textfield',
						width : 100
					}
//					, {
//						text : '类型:',
//						style:'margin-top:-3px'
//					}, {
//
//						hiddenName : 'Q_busiType_L_EQ',
//						xtype : 'mtdiccombo',
//						editable : false,
//						lazyInit : false,
//						forceSelection : false,
//						itemKey : 'KNOW_CATE',
//						width : 120
//						// items : [typeSelector]
//					}
					, {
						text : '关键字:',
						style:'margin-top:-3px'
					}, {
						name : 'Q_ukKnowKeywords.keyWord_S_LK',
						xtype : 'textfield'
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
			}, {
				xtype : 'button',
				text : __advancedSearch,
				iconCls : 'search',
				scope : this,
				handler : function() {
					new UkKnowFankuiAdvancedSearchWin().show();
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
				text : __create + '[UkSysKnow]',
				xtype : 'button',
				scope : this,
				handler : this.createRs
			}, {
				iconCls : 'btn-del',
				text : __delete + '[UkSysKnow]',
				xtype : 'button',
				scope : this,
				handler : this.removeSelRs
			}]
		});
		
		this.gridPanel = new HT.GridPanel({
			region : 'center',
			// tbar : this.topbar,
			// 使用RowActions
//			rowActions : true,
			printable : false,
			showSm:false,
			exportable : false,
			id : 'UkKnowFankuiGrid',
			url : __ctxPath + "/know/listSysKnowUkKnowFankui.do",
			fields : [{
						name : 'knowId',
						type : 'int'
					}, 'ukSysKnow', 'tiTle', 'busiType', 'enableTime',
					'pastTime', 'sysKnowStatus', 'viewCount', 'sysKnowComment',
					'plus1', 'plus2', 'plus3', 'plus4', 'plus5', 'plus6',
					'plus7', 'plus8', 'sysKnowVersion', 'createBy', 'updateBy',
					'createDate', 'updateDate', 'userid', 'ukKnowTemplate','ukKnowFankuis',
					'ukKnowApprove', 'ukKnowTypes', 'ukKnowKeywords','ukKnowFankuis.fankuiTime'],
			columns : [{
						header : __ukSysKnowKnowId,// 'knowId',
						dataIndex : 'knowId',
						hidden : true
					}, {
						header : __ukSysKnowTiTle,// '标题',
						isExp : false,
						width:500,
						dataIndex : 'tiTle'
//						,
//						renderer : function(value, metadata, record) {
//							var reVal = '';
//							reVal += '<a href="#" onclick="App.MyDesktopClickTopTab(\'UkKnowFankuiDetail\','
//									+ record.data.knowId + ')">';
//							reVal += value
//							reVal += "</a>";
//							reVal += '&nbsp;&nbsp;';
//							return reVal;
//						}
					}, {
						header : __ukSysKnowSysKnowComment,// '摘要',
						isExp : false,
						hidden : true,
						dataIndex : 'sysKnowComment'
					},
					// {
					// header : '类别',
					// dataIndex : 'ukKnowTypes',
					// sortable : true,
					// renderer : function(value) {
					// if (value == null) {
					// return '';
					// } else {
					// var str= "";
					// for(var i = 0; i < value.length; i++){
					// if(i>0)str+=",";
					// str += value[i].name;
					// }
					// return str;
					// }
					// }
					// },
					{
						header : __ukSysKnowBusiType,// '业务分类&BUSI_TYPE',
						isExp : false,
						dataIndex : 'busiType',
						hidden : true,
						renderer : function(value) {
							if (value != null){
								return KNOW_CATE.get(value);
							}else {
								return '';	
							}
						}
					},
					// {
					// header : '关键字',
					// width : 100,
					// dataIndex : 'ukKnowKeywords',
					// sortable : true,
					// renderer : function(value) {
					// if (value == null) {
					// return '';
					// } else {
					// var str= "";
					// for(var i = 0; i < value.length; i++){
					// if(i>0)str+=",";
					// str += value[i].keyWord;
					// }
					// return str;
					// }
					// }
					// },
					{
						header : '发布时间',// '生效时间',
						isExp : false,
						hidden : true,
						dataIndex : 'enableTime'
					}, {
						header : __ukSysKnowPastTime,// '过期时间',
						isExp : false,
						hidden : true,
						dataIndex : 'pastTime'
					}, {
						header : '浏览数',// '点评时间',
						isExp : false,
						dataIndex : 'viewCount'
					}, {
						header : '反馈时间',// '点评时间',
						isExp : false,
						dataIndex : 'ukKnowFankuis',
						format : 'Y-m-d',
						renderer : function(value){
							for (var i=0; i<value.length; i++){
								return value[0].fankuiTime;
							}
						}
					},
					// {
					// header : __ukSysKnowSysKnowStatus,//'状态,
					// isExp : false,
					// dataIndex : 'sysKnowStatus',
					// renderer : function(value) {
					// return KNOW_STATUS.get(value);
					// }
					// }, {
					// header : __ukSysKnowViewCount,//'浏览数',
					// isExp : false,
					// dataIndex : 'viewCount'
					// // },{
					// // header : __ukSysKnowSysKnowVersion,//'版本号',
					// // isExp : false,
					// // dataIndex : 'sysKnowVersion'
					// },
					{
						header : __ukSysKnowCreateBy,// '创建人内码',
						isExp : false,
						hidden : true,
						dataIndex : 'createBy',
						renderer : function(value) {
							if (value == null) {
								return '';
							} else {
								return value.username;
							}
						}
					}
//					, new Ext.ux.grid.RowActions({
//								header : __action,
//								width : 100,
//								actions : [{
//											iconCls : 'btn-readdocument',
//											qtip : '查看',
//											style : 'margin:0 3px 0 3px'
//										}],
//								listeners : {
//									scope : this,
//									'action' : this.onRowAction
//								}
//							})
					]
				// end of columns
		});

		 this.gridPanel.addListener('rowdblclick', this.rowClick);

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
		grid.getSelectionModel().each(function(rec) {
			// new UkKnowFankuiForm({
			// fankuiId : rec.data.fankuiId
			// }).show();
			var tabs = Ext.getCmp('centerTabPanel');
			var eform = Ext.getCmp('UkKnowFankuiFormWin');
			if (eform != null) {
				tabs.remove('UkKnowFankuiFormWin');
			}
			eform = new UkKnowFankuiForm('',rec.data.knowId);
			tabs.add(eform);
			tabs.activate(eform);
		});
	},
	// 创建记录
	createRs : function() {
		// new UkKnowFankuiForm().show();
		var tabs = Ext.getCmp('centerTabPanel');
		var aForm = Ext.getCmp('UkKnowFankuiForm');
		if (aForm != null) {
			tabs.remove('UkKnowFankuiForm');
		}
		aForm = new UkKnowFankuiForm();
		tabs.add(aForm);
		tabs.activate(aForm);

	},
	// 按ID删除记录
	removeRs : function(id) {
		$postDel({
					url : __ctxPath + '/know/multiDelUkKnowFankui.do',
					ids : id,
					grid : this.gridPanel
				});
	},
	// 把选中ID删除
	removeSelRs : function() {
		$delGridRs({
					url : __ctxPath + '/know/multiDelUkKnowFankui.do',
					grid : this.gridPanel,
					idName : 'fankuiId'
				});
	},
	// 编辑Rs
	editRs : function(record) {
		// new UkKnowFankuiForm({
		// fankuiId : record.data.fankuiId
		// }).show();
		var tabs = Ext.getCmp('centerTabPanel');
		var eform = Ext.getCmp('UkKnowFankuiFormWin');
		if (eform != null) {
			tabs.remove('UkKnowFankuiFormWin');
		}
		eform = new UkKnowFankuiForm({
					fankuiId : record.data.fankuiId
				});
		tabs.add(eform);
		tabs.activate(eform);
	},
    read : function(record){
		var tabs = Ext.getCmp('centerTabPanel');
		var aForm = Ext.getCmp('UkSysKnowShow');
		if(aForm != null){
			tabs.remove('UkSysKnowShow');
		}
		var collForm = Ext.getCmp('UkKnowCollectFormWin');
				if (collForm != null) {
					tabs.remove(collForm);
				}
		aForm = new UkSysKnowShow({
				knowId : record.data.knowId,
				knowTmpId : record.data.ukKnowTemplate.knowTmpId,
				knowTitle : record.data.tiTle
				});
		tabs.add(aForm);
		tabs.activate(aForm);
	},
	// 行的Action
	onRowAction : function(grid, record, action, row, col) {
		switch (action) {
			case 'btn-del' :
				this.removeRs.call(this, record.data.fankuiId);
				break;
			case 'btn-edit' :
				this.editRs.call(this, record);
				break;
            case 'btn-readdocument' :
                this.read.call(this, record);
                break;
			default :
				break;
		}
	}
});
