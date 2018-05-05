/**
 * @author:
 * @class NoticeView
 * @extends Ext.Panel
 * @description 公告管理
 * @company 北京优创融联科技有限公司
 * @createtime:
 */
NoticeView = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		NoticeView.superclass.constructor.call(this, {
					id : 'NoticeView',
					title : '公告管理',
					region : 'center',
					iconCls : 'menu-notice',
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
					id : 'UkNoticeSearchPanel',
					height : 35,
					items : [{
								text : '类别'
							}, {
								hiddenName : 'Q_sectionId_L_EQ',
								xtype : 'mtdiccombo',
								editable : true,
								lazyInit : false,
								forceSelection : false,
								itemKey : 'GG001'
							}, {
								text : '发布人'
							}, {
								name : 'Q_issuer_S_LK',
								xtype : 'textfield'
							}, {
								text : '状态'
							}, {
								name : 'Q_status_SN_EQ',
								flex : 1,
								hiddenName : 'Q_status_SN_EQ', // 提交至后台的参数
								xtype : 'combo', // 输入框的类型
								triggerAction : 'all',
								editable : false,
								width : 150,
								displayField : 'name', // combo下拉框里显示的值
								valueField : 'id', // combo下拉框选中提交的值
								mode : 'local',
								store : [['1', '已发布'], ['0', '未发布']]
							}, {
								xtype : 'button',
								text : __search,
								iconCls : 'search',
								scope : this,
								handler : this.search
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
								scope : this
								// handler : function() {
							// new UkKnowTemplateAdvancedSearchWin()
							// .show()
							// }
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
				});
		// end of searchPanel

		this.topbar = new Ext.Toolbar({
					items : ['->', {
								iconCls : 'btn-add',
								text : '添加',
								xtype : 'button',
								scope : this,
								handler : this.createRs
							}, '-', {
								iconCls : 'btn-del',
								text : '删除',
								xtype : 'button',
								scope : this,
								handler : this.removeSelRs
							}]
				});

		this.gridPanel = new HT.GridPanel({
			region : 'center',
			tbar : this.topbar,
			// 使用RowActions
			rowActions : true,
			id : 'NoticeGrid',
			baseParams : {
				'Q_isNotice_SN_EQ' : 1
				// 1是公告
			},
			url : __ctxPath + "/info/listNews.do",
			fields : [{
						name : 'newsId',
						type : 'int'
					}, 'sectionId', 'subjectIcon', 'subject', 'author',
					'createtime', 'expTime', 'replyCounts', 'viewCounts',
					'issuer', 'content', 'updateTime', 'status', 'isDeskImage',
					'isNotice', 'sn'],
			columns : [{
						header : '公告内码',
						dataIndex : 'newsId',
						hidden : true
					}, {
						header : '标题',
						width : 280,
						dataIndex : 'subject',
						renderer : function(value, metadata, record) {
							var reVal = '';
							reVal += '<a href="#" onclick="App.MyDesktopClickTopTab(\'NoticeDetail\','
									+ record.data.newsId + ')">';
							reVal += value
							reVal += "</a>";
							reVal += '&nbsp;&nbsp;';
							return reVal;
						}
					}, {
						header : '类别',
						dataIndex : 'sectionId',
						renderer : function(value) {
							return GG001.get(value);
						}
					}, {
						header : '作者',
						dataIndex : 'author'
					}, {
						header : '创建时间',
						dataIndex : 'createtime',
						renderer : function(value) {
							if (value != null) {
								return value.substring(0, 10);
							}
						}
					}, {
						header : '失效时间',
						dataIndex : 'expTime',
						renderer : function(value) {
							if (value != null) {
								return value.substring(0, 10);
							}
						}
					}, {
						header : '发布人',
						dataIndex : 'issuer'
					}, {
						header : '状态',
						dataIndex : 'status',
						renderer : function(value) {
							if (value != null && value == 0) {
								return '<font color="red">未发布</font>';
							} else if (value == 1) {
								return '<font color="green">已发布</font>';
							}
						}
					}, new Ext.ux.grid.RowActions({
								header : '管理',
								width : 100,
								actions : [{
											iconCls : 'btn-fabu',
											qtip : '发布',
											style : 'margin:0 3px 0 3px',
											fn : function(record) {
												var status = record
														.get('status');
												if (status == '0') {
													return true;
												} else {
													return false;
												}
											}
										}, {
											iconCls : 'btn-edit',
											qtip : '编辑',
											style : 'margin:0 3px 0 3px',
											fn : function(record) {
												var status = record
														.get('status');
												if (status == '0') {
													return true;
												} else {
													return false;
												}
											}
										}, {
											iconCls : 'btn-del',
											qtip : '删除',
											style : 'margin:0 3px 0 3px',
											fn : function(record) {
												var status = record
														.get('status');
												if (status == '0') {
													return true;
												} else {
													return false;
												}
											}
										}],
								listeners : {
									scope : this,
									'action' : this.onRowAction
								}
							})]
				// end of columns
		});

		// this.gridPanel.addListener('rowdblclick', this.rowClick);

	},// end of the initComponents()
	// 重置查询表单
	reset : function() {
		this.searchPanel.getForm().reset();
	},
	// 按条件搜索
	search : function() {
		$search({
					searchPanel : this.searchPanel,
					gridPanel : this.gridPanel
				});
	},
	// 按条件搜索
//	onSearch : function(obj) {
//		var searchPanel = Ext.getCmp('UkNoticeSearchPanel');
//		var gridPanel = Ext.getCmp('NewsGrid');
//		if (searchPanel.getForm().isValid()) {
//			$search({
//						searchPanel : searchPanel,
//						gridPanel : gridPanel
//					});
//		}
//	},
	// GridPanel行点击处理事件
	rowClick : function(grid, rowindex, e) {
		grid.getSelectionModel().each(function(rec) {
					new NoticeForm({
								newsId : rec.data.newsId
							}).show();
				});
	},
	// 创建记录
	createRs : function() {
		new NoticeForm().show();
	},
	// 按ID删除记录
	removeRs : function(id) {
		$postDel({
					url : __ctxPath + '/info/multiDelNews.do',
					ids : id,
					grid : this.gridPanel
				});
	},
	// 把选中ID删除
	removeSelRs : function() {
		$delGridRs({
					url : __ctxPath + '/info/multiDelNews.do',
					grid : this.gridPanel,
					idName : 'newsId'
				});
	},
	// 编辑Rs
	editRs : function(record) {
		new NoticeForm({
					newsId : record.data.newsId
				}).show();
	},
	// 修改话题状态
	fabuSelRs : function(id, record) {
		$postFabu({
					url : __ctxPath + '/info/newsUpdateNews.do',
					ids : id,
					grid : this.gridPanel,
					detail : 'NoticeDetailWin'
				});
	},
	// 行的Action
	onRowAction : function(grid, record, action, row, col) {
		switch (action) {
			case 'btn-fabu' :
				this.fabuSelRs.call(this, record.data.newsId);
				break;
			case 'btn-del' :
				this.removeRs.call(this, record.data.newsId);
				break;
			case 'btn-edit' :
				this.editRs.call(this, record);
				break;
			default :
				break;
		}
	}
});
