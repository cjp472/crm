Ext.ns('SearchNews');
/**
 * 新闻列表
 */
var SearchNews = function(_searchContent) {
	return this.getView(_searchContent);
}
/**
 * 显示列表
 * 
 * @return {}
 */
SearchNews.prototype.getView = function(_searchContent) {
	return new Ext.Panel({
		id : 'SearchNews',
		title : '新闻搜索',
		layout : 'border',
		iconCls : 'menu-news',
		border : false,
		//style : 'padding-bottom:10px;',
		autoScroll : true,
		items : [new Ext.FormPanel({
						id : 'ALLNewsSearchForm',
						height : 40,
						frame : false,
						border : false,
						layout : 'hbox',
						region:'north',
						layoutConfig : {
							padding : '5',
							align : 'middle'
						},
						defaults : {
							xtype : 'label',
							margins : {
								top : 0,
								right : 4,
								bottom : 4,
								left : 4
							}
						},
						items : [{
									text : '请输入条件:'
								}, {
									xtype : 'textfield',
									name : 'searchContent',
									width : 150
								}, {
									xtype : 'button',
									text : '查询',
									iconCls : 'search',
									handler : function() {
										var searchPanel = Ext
												.getCmp('ALLNewsSearchForm');
										var gridPanel = Ext
												.getCmp('SearchNewsGrid');
										if (searchPanel.getForm().isValid()) {
											$search({
														searchPanel : searchPanel,
														gridPanel : gridPanel
													});
										}

									}
								}, {
									xtype : 'button',
									text : '重置',
									iconCls : 'reset',
									handler : function() {
										var searchPanel = Ext
												.getCmp('ALLNewsSearchForm');
										searchPanel.getForm().reset();
									}
								}, {
									name : 'isNotice',
									value : 0,
									xtype : 'hidden'
								}]
					}), this.setup(_searchContent)]
	});
};
/**
 * 建立视图
 */
SearchNews.prototype.setup = function(_searchContent) {
	return this.grid(_searchContent);
};
/**
 * 建立DataGrid
 */
SearchNews.prototype.grid = function(_searchContent) {
	var cm = new Ext.grid.ColumnModel({
				columns : [new Ext.grid.RowNumberer(), {
							header : 'newsId',
							dataIndex : 'newsId',
							hidden : true
						}, {
							header : '新闻标题',
							width : 1000,
							dataIndex : 'subject'
						}, {
							header : '作者',
							width : 120,
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
							header : '回复次数',
							width : 120,
							dataIndex : 'replyCounts'
						}, {
							header : '浏览数',
							width : 120,
							dataIndex : 'viewCounts'
						}],
				defaults : {
					sortable : true,
					menuDisabled : false,
					width : 100
				}
			});

	var store = this.store();
	store.load({
				params : {
					start : 0,
					limit :  25,
					searchContent : _searchContent
				}
			});
	var grid = new Ext.grid.GridPanel({
				id : 'SearchNewsGrid',
				store : store,
				region : 'center',
				trackMouseOver : true,
				disableSelection : false,
				//autoScroll : true,
				loadMask : true,
				autoWidth:true,
				//autoExpandColumn : 'subject', 
				sortable : false,
				cm : cm,
				viewConfig : {
					forceFit : true,
					
					enableRowBody : false,
					showPreview : false
				},
				//autoExpandColumn: 'subject',
				bbar : new HT.PagingBar({
							store : store,
							pageSize :  25
						})
			});

	grid.addListener('rowdblclick', function(grid, rowindex, e) {
				grid.getSelectionModel().each(function(rec) {
							App.clickTopTab('NewsDetail', rec.data.newsId,
									function() {
										AppUtil.removeTab('NewsDetail');
									});
						});
			});
	return grid;

};

/**
 * 初始化数据
 */
SearchNews.prototype.store = function() {
	var store = new Ext.data.Store({
				baseParams : {
					'isNotice' : 0
				},
				proxy : new Ext.data.HttpProxy({
							url : __ctxPath + '/info/searchNews.do'
						}),
				reader : new Ext.data.JsonReader({
							root : 'result',
							totalProperty : 'totalCounts',
							id : 'id',
							fields : [{
										name : 'newsId',
										type : 'int'
									}, 'sectionId', 'subjectIcon', 'subject',
									'author', 'createtime', 'expTime',
									'replyCounts', 'viewCounts', 'issuer',
									'content', 'updateTime', 'status',
									'isDeskImage', 'isNotice', 'sn', 'section']
						}),
				remoteSort : true
			});
	store.setDefaultSort('newsId', 'desc');
	return store;
};
