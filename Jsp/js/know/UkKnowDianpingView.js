
UkKnowDianpingView = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		UkKnowDianpingView.superclass.constructor.call(this, {
					id : 'UkKnowDianpingViewWin',
					title : '知识评价',
					region : 'center',
					layout : 'border',
					items : [this.searchPanel, this.gridPanel]
				});
	},// end of constructor
	// 初始化组件
	initUIComponents : function() {
		var fieldnameComboData = [
				['knowId', __ukKnowDianpingKnowId, new Ext.form.ComboBox({
							editabel : false,
							lazyInit : false,
							triggerAction : 'all',
							store : new Ext.data.SimpleStore({
										autoLoad : true,
										url : __ctxPath
												+ '/know/comboUkSysKnow.do',
										fields : ['knowId', 'knowIdName']
									}),
							displayField : 'knowIdName',
							valueField : 'knowId',
							id : 'knowId'
						})],
				['dianpingValue', __ukKnowDianpingDianpingValue,
						new MT.DicComboBox({
									hiddenName : 'dianpingValue',
									itemKey : 'KNOW_STATUS'
								})],
				['dianpingTime', __ukKnowDianpingDianpingTime,
						new Ext.form.DateField({
									hiddenName : 'dianpingTime',
									format : 'Y-m-d'
								})],
				['dianpingComment', __ukKnowDianpingDianpingComment,
						new Ext.form.TextField({
									name : 'dianpingComment',
									allowBlank : true
								})],
				['userid', __ukKnowDianpingUserid, new MT.DicComboBox({
									hiddenName : 'userid',
									itemKey : 'KNOW_STATUS'
								})],
				['knowStatus', __ukKnowDianpingKnowStatus, new MT.DicComboBox({
									hiddenName : 'knowStatus',
									itemKey : 'KNOW_STATUS'
								})]];
		var UkKnowDianpingAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin,
				{
					title : __ukKnowDianping + '高级查询',
					fieldData : fieldnameComboData
				});
		// 初始化搜索条件Panel
		this.searchPanel = new Ext.FormPanel({
					layout : 'hbox',
					region : 'north',
					id : 'UkKnowDianpingSearchPanel',
					height : 35,
					items : [{
								text : '标题：',
								style:'margin-top:-3px'
							}, {
								name : 'Q_tiTle_S_LK',
								xtype : 'textfield',
								width : 100
							}
//							, {
//								text : '知识类型:',
//								style:'margin-top:-3px'
//							}, {
//
//								hiddenName : 'Q_busiType_L_EQ',
//								xtype : 'mtdiccombo',
//								editable : false,
//								lazyInit : false,
//								forceSelection : false,
//								itemKey : 'BUSI_TYPE',
//								width : 120
//								// items : [typeSelector]
//							}
						, {
								text : '关键字:',
								style:'margin-top:-3px'
							},{
								xtype:'textfield',
								name : 'ukKnowKeyWord'
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
									new UkKnowDianpingAdvancedSearchWin().show()
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
					items : ['->', {
								iconCls : 'btn-add',
								text : __create + __ukKnowDianping,
								xtype : 'button',
								scope : this,
								hidden : true,
								handler : this.createRs
							}, {
								iconCls : 'btn-del',
								text : __delete + __ukKnowDianping,
								xtype : 'button',
								scope : this,
								hidden : true,
								handler : this.removeSelRs
							}, '->']
				});

		this.gridPanel = new HT.GridPanel({
			region : 'center',
			showSm:false,
			tbar : this.topbar,
			// 使用RowActions
//			rowActions : true,
			// printable : false,
			// exportable : false,
			// shim : true,
			// trackMouseOver : true,
			// disableSelection : false,
			// loadMask : true,
			id : 'UkKnowDianpingGrid',
			url : __ctxPath + "/know/listSysKnowUkKnowDianping.do",
			fields : [{
						name : 'knowId',
						type : 'int'
					}, 'ukSysKnow', 'ukSysKnow', 'tiTle', 'busiType',
					'enableTime', 'pastTime', 'sysKnowStatus', 'viewCount',
					'sysKnowComment', 'plus1', 'plus2', 'plus3', 'plus4',
					'plus5', 'plus6', 'plus7', 'plus8', 'sysKnowVersion',
					'createBy', 'updateBy', 'createDate', 'updateDate',
					'userid', 'ukKnowTemplate', 'ukKnowApprove', 'ukKnowTypes',
					'ukKnowKeywords', 'dianpingCount', 'dianpingValue', 'dianpingTime'],
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
//							reVal += '<a href="#" onclick="App.MyDesktopClickTopTab(\'UkKnowDianpingDetail\','
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
					// header : '业务类别',
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
						hidden : true,
						dataIndex : 'busiType',
						renderer : function(value) {
							return BUSI_TYPE.get(value);
						}
					},
					// {
					// header : '关键字',
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
						header : '发布时间 ',// '生效时间',
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
						header : '点评时间',// '点评时间',
						isExp : false,
						dataIndex : 'dianpingTime'
					},
					 {
					 header : __ukSysKnowSysKnowStatus,//'状态,
					 isExp : false,
					 dataIndex : 'sysKnowStatus',
					 renderer : function(value) {
						 return KNOW_FLOW.get(value);
					 }
					 }, {
					// header : __ukSysKnowViewCount,//'浏览数',
					// isExp : false,
					// dataIndex : 'viewCount'
					// }, {
					// header : '点评数',//'浏览数',
					// isExp : false,
					// dataIndex : 'dianpingCount'
					// // },{
					// // header : __ukSysKnowSysKnowVersion,//'版本号',
					// // isExp : false,
					// // dataIndex : 'sysKnowVersion'
					// }, {
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
					},{
						header : '评价',// '点评时间',
						isExp : false,
						dataIndex : 'dianpingValue'
					}
//					new Ext.ux.grid.RowActions({
//								header : __action,
//								actions : [{
//											iconCls : 'btn-readdocument',
//											qtip : '详情',
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
				// var fieldName = grid.getColumnModel().getDataIndex(columnIndex); //
				// Get field name
				// var data = record.get(fieldName);
		
				aForm = new UkSysKnowShow({
							knowId : record.get('knowId'),
							knowTmpId : record.get('knowTmpId'),
							knowTitle : record.get('tiTle')
						});
				tabs.add(aForm);
				tabs.activate(aForm);
			},
	// 创建记录
	createRs : function() {
		// new UkKnowDianpingForm().show();
		var tabs = Ext.getCmp('centerTabPanel');
		var aForm = Ext.getCmp('UkKnowDianpingForm');
		if (aForm != null) {
			tabs.remove('UkKnowDianpingForm');
		}
		aForm = new UkKnowDianpingForm();
		tabs.add(aForm);
		tabs.activate(aForm);

	},
	// 按ID删除记录
	removeRs : function(id) {
		$postDel({
					url : __ctxPath + '/know/multiDelUkKnowDianping.do',
					ids : id,
					grid : this.gridPanel
				});
	},
	// 把选中ID删除
	removeSelRs : function() {
		$delGridRs({
					url : __ctxPath + '/know/multiDelUkKnowDianping.do',
					grid : this.gridPanel,
					idName : 'dianpingId'
				});
	},
	// 编辑Rs
	editRs : function(record) {
		// new UkKnowDianpingForm({
		// dianpingId : record.data.dianpingId
		// }).show();

		var tabs = Ext.getCmp('centerTabPanel');
		var aForm = Ext.getCmp('UkKnowDianpingFormWin');
		if (aForm != null) {
			tabs.remove('UkKnowDianpingFormWin');
		}
		// alert(record.data.dianpingId);
		// alert(record.data.ukSysKnow != null ? record.data.ukSysKnow.knowId :
		// '');
		// alert(record.data.knowStatus);
		aForm = new UkKnowDianpingForm(record.data.dianpingId,
				record.data.ukSysKnow != null
						? record.data.ukSysKnow.knowId
						: '', record.data.knowStatus);
		aForm.setTitle(__ukKnowDianpingDetailHeading);
		tabs.add(aForm);
		tabs.activate(aForm);
	},
	// 查看Rs
	showRs : function(record) {
		var tabs = Ext.getCmp('centerTabPanel');
		var aForm = Ext.getCmp('UkSysKnowShow');
		if(aForm != null){
			tabs.remove('UkSysKnowShow');
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
			// case 'btn-del':
			// this.removeRs.call(this, record.data.dianpingId);
			// break;
			case 'btn-edit' :
				this.editRs.call(this, record);
				break;
			case 'btn-readdocument' :
				this.showRs.call(this, record);
				break;	
			default :
				break;
		}
	}
});
