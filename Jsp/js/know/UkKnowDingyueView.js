/**
 * @author:cf0666@gmail.com
 * @class UkKnowDingyueView
 * @extends Ext.Panel
 * @description [UkKnowDingyue]管理
 * @company 优创融联科技
 * @createtime:
 */
UkKnowDingyueView = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		UkKnowDingyueView.superclass.constructor.call(this, {
					id : 'UkKnowDingyueViewWin',
					title : __ukKnowDingyueManage,
					region : 'center',
					layout : 'border',
					items : [this.searchPanel, this.gridPanel]
				});
	},// end of constructor
	// 初始化组件
	initUIComponents : function() {
		var fieldnameComboData = [
				['knowTypeId', __ukKnowDingyueKnowTypeId, new Ext.form.ComboBox({
							editabel : false,
							lazyInit : false,
							triggerAction : 'all',
							store : new Ext.data.SimpleStore({
										autoLoad : true,
										url : __ctxPath
												+ '/know/comboUkKnowType.do',
										fields : ['knowTypeId',
												'knowTypeIdName']
									}),
							displayField : 'knowTypeIdName',
							valueField : 'knowTypeId',
							id : 'knowTypeId'
						})],
				['busiType', __ukKnowDingyueBusiType, new Ext.form.NumberField({
									name : 'busiType',
									allowBlank : true
								})],
				['desCribe', __ukKnowDingyueDesCribe, new Ext.form.TextField({
									name : 'desCribe',
									allowBlank : true
								})],
				['userid', __ukKnowDingyueUserid, new Ext.form.NumberField({
									name : 'userid',
									allowBlank : true
								})]]
		var UkKnowDingyueAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : __ukKnowDingyueManage+__advancedSearch,
					fieldData : fieldnameComboData
				});
		// 初始化搜索条件Panel
		this.searchPanel = new Ext.FormPanel({
					layout : 'hbox',
					region : 'north',
					hidden : false,
					id : 'UkKnowDingyueManageSearchPanel',
					height : 35,
					items : [
					{
										text : '标题：'
									}, {
										name : 'Q_ukSysKnow.tiTle_S_LK',
										xtype : 'textfield',
										width : 100
									}, {
										text : '业务分类'
									}, {

										hiddenName : 'Q_ukSysKnow.busiType_L_EQ',
										xtype : 'mtdiccombo',
										editable : false,
										lazyInit : false,
										forceSelection : false,
										itemKey : 'BUSI_TYPE',
										width : 120
										// items : [typeSelector]
								}
//						{
//						text : __ukKnowDingyueKnowTypeId
//					}, {
//						hiddenName : 'Q_ukKnowType.knowTypeId_L_EQ',
//						xtype : 'combo',
//						editabel : false,
//						lazyInit : false,
//						triggerAction : 'all',
//						store : new Ext.data.SimpleStore({
//									autoLoad : true,
//									url : __ctxPath
//											+ '/know/comboUkKnowType.do',
//									fields : ['knowTypeId', 'knowTypeIdName']
//								}),
//						displayField : 'knowTypeIdName',
//						valueField : 'knowTypeId',
//						id : 'knowTypeId'
//					}, {
//						text : __ukKnowDingyueBusiType
//					}, {
//						hiddenName : 'Q_busiType_L_EQ',
//						xtype : 'mtdiccombo',
//						editable : true,
//						lazyInit : false,
//						forceSelection : false,
//						itemKey : 'BUSI_TYPE'
//					}, {
//						text : __ukKnowDingyueDesCribe
//					}, {
//						name : 'Q_desCribe_S_LK',
//						xtype : 'textfield'
////					}, {
////
////						name : 'Q_userid_L_EQ',
////						xtype : 'numberfield'
//					}
					, {
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
						handler : function(){
							new UkKnowDingyueAdvancedSearchWin().show()
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
					items : [
//						'->', {
//								iconCls : 'btn-del',
//								text : __delete,
//								xtype : 'button',
//								scope : this,
//								handler : this.removeSelRs
//							},
							'->', {
								iconCls : 'btn-add',
								text : __ukKnowDingyueKnowDingyue,
								xtype : 'button',
								scope : this,
								handler : this.createRs
							}]
				});
				var rowAction = new Ext.ux.grid.RowActions({
						header : __action,
						width : 100,
						actions : [{
//									iconCls : 'btn-del',
//									qtip : __delete,
//									style : 'margin:0 3px 0 3px'
//								}, {
									iconCls : 'btn-readdocument',
									qtip : __edit,
									style : 'margin:0 3px 0 3px'
								}],
						listeners : {
							scope : this,
							'action' : this.onRowAction
						}
					});
				
//		this.gridPanel = UkPerKnowGridPanel.getView("UkKnowDingyueManageGrid","/know/dingYueListUkKnowDingyue.do","订阅时间",this.topbar,rowAction);

		this.gridPanel = new HT.GridPanel({
			region : 'center',
			// 使用RowActions
			rowActions : true,
			printable : false,
			exportable : false,
			id : 'UkKnowDingyueManageGrid',
//			url : __ctxPath + "/know/releaseListUkSysKnow.do",
			url : __ctxPath + "/know/dingYueListUkKnowDingyue.do",
			baseParams :{
					status : 5
				}, 
			fields : [{
						name : 'knowId',
						type : 'int'
					}, 'ukSysKnow', 'ukKnowTypes', 'tiTle', 'busiType',
					'enableTime', 'pastTime', 'sysKnowStatus', 'viewCount',
					'sysKnowComment', 'plus1', 'plus2', 'plus3', 'plus4',
					'plus5', 'plus6', 'plus7', 'plus8', 'sysKnowVersion',
					'createBy', 'updateBy', 'createDate', 'updateDate',
					'userid', 'ukKnowTemplate', 'ukKnowApprove',
					'ukKnowKeywords','knowKeyWords'],
			columns : [{
						header : __ukSysKnowKnowId,// 'knowId',
						dataIndex : 'knowId',
						hidden : true
					}, {
						header : "标题",
						isExp : false,
						width : 150,
						dataIndex : 'tiTle'
					}, {
						header : "摘要",
						isExp : false,
						dataIndex : 'sysKnowComment'
					}, {
						header : '业务分类',
						width : 100,
						dataIndex : 'busiType',
						sortable : true,
						renderer : function(value) {
							if (value == null) {
								return '';
							} else {
								return BUSI_TYPE.get(value);
							}
						}
					}, {
						header : "关键字",
						isExp : false,
						dataIndex : 'knowKeyWords'
//						,
//						renderer : function(value) {
//							if (value == null) {
//								return '';
//							} else {
//								var str = "";
//								for (var i = 0; i < value.length; i++) {
//									if (i > 0)
//										str += ",";
//									str += value[i].keyWord;
//								}
//								return str;
//							}
//						}
					}, {
						header : "发布时间",// '生效时间',
						isExp : false,
						dataIndex : 'updateDate'
					}, {
						header : "结束时间",// '过期时间',
						isExp : false,
						dataIndex : 'pastTime'
					}, {
						header : "浏览数",// '浏览数',
						isExp : false,
						dataIndex : 'viewCount'
					}, new Ext.ux.grid.RowActions({
								header : __action,
								width : 60,
								actions : [{
											iconCls : 'btn-readdocument',
											qtip : "查看",
											style : 'margin:0 3px 0 3px'
										}],
								listeners : {
									scope : this,
									'action' : this.onRowAction
								}
							})]
				// end of columns
			});
		
//		this.gridPanel.addListener('rowdblclick', this.rowClick);

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
			var tabs = Ext.getCmp('centerTabPanel');
			var eform = Ext.getCmp('UkKnowDingyueFormWin');
			if (eform != null) {
				tabs.remove('UkKnowDingyueFormWin');
			}
			eform = new UkKnowDingyueForm({
						dingyueId : rec.data.dingyueId
				});
			tabs.add(eform);
			tabs.activate(eform);
		});
	},
	// 创建记录
	createRs : function() {
		Ext.Ajax.request({
			url : __ctxPath + '/know/getUseridUkKnowDingyue.do',
			method : 'GET',
			success : function(response, options) {
				var thisObj = Ext.util.JSON.decode(response.responseText).data;
				new UkKnowDingyueForm({
					dingyueUserid : thisObj.dingyueUserid,
					knowKeyword : thisObj.knowKeyword
				}).show();
			},
			failure : function(response, options) {
				Ext.ux.Toast.msg(__toastMessage, __operationFailed);
			},
			scope : this
		});
	},
	// 按ID删除记录
	removeRs : function(id) {
		$postDel({
					url : __ctxPath + '/know/multiDelUkKnowDingyue.do',
					ids : id,
					grid : this.gridPanel
				});
	},
	// 把选中ID删除
	removeSelRs : function() {
		$delGridRs({
					url : __ctxPath + '/know/multiDelUkKnowDingyue.do',
					grid : this.gridPanel,
					idName : 'dingyueId'
				});
	},
	// 编辑Rs
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
			case 'btn-del' :
				this.removeRs.call(this, record.data.dingyueId);
				break;
			case 'btn-readdocument' :
				this.showRs.call(this, record);
				break;
			default :
				break;
		}
	}
});
