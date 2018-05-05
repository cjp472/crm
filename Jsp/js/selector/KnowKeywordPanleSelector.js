/**
 * @description 关键字面板选择器
 * @class KnowKeywordSelector
 * @author 优创融联科技
 * @updater wangzj
 */
var keywordId = 0;
var KnowKeywordPanleSelector = {

	getView : function(callbackOrConf, isSingle, isForFlow, pkKeywordId) {
		this.keywordId = pkKeywordId;
		// 单选
		if (typeof(callbackOrConf) == 'object') {
			this.scope = callbackOrConf.scope;
			this.callback = callbackOrConf.callback;
		} else {
			this.scope = this;
			this.callback = callbackOrConf;
		}
		this.isSingle = (isSingle != null) ? isSingle : true;
		var panel = this.initPanel(isSingle);
		// window
		var keywindow = new Ext.Panel({
					id : 'KeywordSelectorWin',
					anchor : '100%',
					minWidth : '90%',
					height : 300,
					layout : 'fit',
					border : false,
//					maximizable : true,
					resizable : true,
					modal : true,
					items : [panel]
				});

		if (isForFlow) {
			keywindow.addButton(new Ext.Button({
						
					}));
		}

		return keywindow;
	},

	/**
	 * 组件初始化
	 * 
	 * @param isSingle
	 *            是否单选,默认单选
	 */
	initPanel : function(isSingle) {
		// //////////////store[获取数据] start////////////////////////////
		var store = new Ext.data.Store({
					proxy : new Ext.data.HttpProxy({
								url : __ctxPath + '/know/listUkKnowKeyword.do'
							}),
					reader : new Ext.data.JsonReader({
								root : 'result',
								totalProperty : 'totalCounts',
								fields : ['keywordId','keyWord','comMent',
									'knowStatus','type']
							}),
					remoteSort : true
				});
//		store.setDefaultSort('keywordId', 'desc');
		store.load({
					params : {
						start : 0,
						limit : 10
					}
				});
//		return store;
		
		var sm = null;
		if (isSingle) {
			sm = new Ext.grid.CheckboxSelectionModel({
						singleSelect : true
					});
		} else {
			sm = new Ext.grid.CheckboxSelectionModel();
		}
		var cm = new Ext.grid.ColumnModel({
					columns : [sm, new Ext.grid.RowNumberer(), {
						header : "关键字",
						dataIndex : 'keyWord',
						width : 60
					}],
					defaults : {
						sortable : true,
						menuDisabled : true,
						width : 120
					},
					listeners : {
						hiddenchange : function(cm, colIndex, hidden) {
							saveConfig(colIndex, hidden);
						}
					}
				}); // end of cm
		// /////////////////////store end///////////////////////////////////

		// //////////////////treePanel[left节点]
		// start/////////////////////////////
		// treePanel
		var keywordPanel = new Ext.tree.TreePanel({
					// TODO left节点treePanel
					id : 'keywordPanels',
					autoScroll : true,
					title : '关键字分类 ',
					loader : new Ext.tree.TreeLoader({
								url : __ctxPath + '/know/typeListUkKnowKeyword.do'
							}),
					root : new Ext.tree.AsyncTreeNode({
								expanded : true
							}),
					rootVisible : false,
					listeners : {
						'click' : this.clickNode
					}
				});
		// //////////////////treePanel[left节点] end/////////////////////////////

		// /////////////////keywordGrid[关键字列表] start///////////////////
		var keywordGrid = new Ext.grid.EditorGridPanel({
					// TODO EditorGridPanel关键字列表
					title : '关键字列表',
					autoScroll : true,
					id : 'keywordGrid',
					region : 'center',
					height : 380,
					autoWidth : false,
					store : store,
					shim : true,
					trackMouseOver : true,
					disableSelection : false,
					loadMask : true,
					cm : cm,
					sm : sm,
					viewConfig : {
						forceFit : true,
						enableRowBody : false,
						showPreview : false
					},
					bbar : new HT.PagingBar({
								store : store,
								pageSize : 12
							})
				}); // end of this keywordGrid

		keywordGrid.on('rowdblclick', function(grid, rowIndex, e) {
					var keywordGrid = Ext.getCmp('keywordGrid');
					var selGrid = Ext.getCmp('selectedKeywordGrid');
					var selStore = selGrid.getStore();
					var rows = keywordGrid.getSelectionModel().getSelections();
					for (var i = 0; i < rows.length; i++) {
						var keywordId = rows[i].data.keywordId;
						var keyWord = rows[i].data.keyWord;
						var isExist = false;
						// 查找是否存在该记录
						for (var j = 0; j < selStore.getCount(); j++) {
							if (selStore.getAt(j).data.keywordId == keywordId) {
								isExist = true;
								break;
							}
						}
						if (!isExist) {
							var newData = {
								keywordId : keywordId,
								keyWord : keyWord
							};
							var newRecord = new selStore.recordType(newData);
							selGrid.stopEditing();
							selStore.add(newRecord);
						}
					}
				}); // end of contact grid
		// ////////////////////keywordGrid[关键字列表] end///////////////////////

		// /////////////////searchPanel[搜索面板] start//////////////////////
		var searchPanel = new Ext.FormPanel({
					// TODO searchPanel[搜索面板]
					id : 'keywordSelectorSearchPanel',
					height : 38,
					region : 'north',
					layout : 'hbox',
					bodyStyle : 'padding:6px 2px 2px 2px',
					layoutConfigs : {
						align : 'middle'
					},
					keys : {
						key : Ext.EventObject.ENTER,
						scope : this,
						fn : this.search
					},
					defaultType : 'label',
					defaults : {
						margins : '0 0 0 4'
					},
					items : [{
								text : '关键字'
							}, {
								xtype : 'textfield',
								name : 'Q_keyWord_S_LK',
								width : 260,
								maxLength : 256
							}, {
								xtype : 'button',
								text : '查询',
								iconCls : 'btn-search',
								scope : this,
								handler : this.search
							}]
				}); // end of this searchPanel
		// ////////////////////searchPanel[搜索面板]
		// end//////////////////////////////////

		// ////////////////////selectedKeywordGrid[已选关键字列表]
		// start/////////////////////
		var csm = new Ext.grid.CheckboxSelectionModel();
		var selectedKeywordGrid = new Ext.grid.EditorGridPanel({
					// TODO selectedKeywordGrid[已选关键字列表]
					id : 'selectedKeywordGrid',
					title : '已选关键字',
					layout : 'form',
					region : 'center',
					width : '100%',
					autoWidth : true,
					height : '100%',
					autoHeight : true,
					autoScroll : true,
					border : false,
					store : new Ext.data.ArrayStore({
								autoLoad : true,
								baseParams : {
									keywordIdStrs : this.keywordId
								},
								url : __ctxPath
										+ '/know/findbyKeywordStrUkKnowKeyword.do',
								fields : [{
											name : 'keywordId',
											type : 'int'
										}, 'keyWord', 'type']
							}),
					displayField : 'keyWord',
					valueField : 'keywordId',
					trackMouseOver : true,
					sm : csm,
					columns : [csm, new Ext.grid.RowNumberer(), {
								header : "关键字",
								dataIndex : 'keyWord'
							}]
				}); // end of this selectedKeywordGrid
		selectedKeywordGrid.addListener('rowdblclick', function(grid, e) {
					var grid = Ext.getCmp('selectedKeywordGrid');
					var store = grid.getStore();
					var rows = grid.getSelectionModel().getSelections();
					for (var i = 0; i < rows.length; i++) {
						grid.stopEditing();
						store.remove(rows[i]);
					}
				});
		// ///////////////////selectedKeywordGrid[已选关键字列表] end //////////////

		// ///////////////////selectedPanel[多选面板] start/////////////////////
		// 多选添加的面板
		var selectedPanel = new Ext.Panel({
					layout : 'border',
					region : 'east',
					width : '200',
					height : '100%',
					border : false,
					autoScroll : true,
					items : [new Ext.Panel({
										region : 'west',
										frame : true,
										width : 40,
										layout : {
											type : 'vbox',
											pack : 'center',
											align : 'stretch'
										},
										defaultType : 'button',
										items : [{
													iconCls : 'add-all',
													text : '',
													scope : this,
													handler : this.addAll
												}, {
													iconCls : 'rem-all',
													text : '',
													scope : this,
													handler : this.removeAll
												}]
									}), {
								region : 'center',
								autoScroll : true,
								items : [selectedKeywordGrid]
							}]
				}); // selectedPanel
		// /////////////////////selectedPanel end//////////////////////////////

		// ///////////////westPanel start///////////////////////
		var westPanel = new Ext.Panel({
					layout : 'accordion',
					region : 'west',
					width : 200,
					split : true,
					header : false,
					collapsible : true,
					items : [keywordPanel]
				}); // end of this westPanel
		// ///////////////westPanel end///////////////////////

		var panel = new Ext.Panel({
					// TODO panel总面板
					id : 'contactPanel',
					layout : 'border',
					region : 'center',
					border : false,
					anchor : '100%,100%',
					items : [westPanel, keywordGrid]
				}); // end of this contactPanel
		// 添加：多选面板
		if (isSingle != null && isSingle == false) {
			panel.add(selectedPanel);
			panel.doLayout();
		}
		return panel;
	}, // init

	// //////////////###方法###///////////////////////

	clickNode : function(node) {
		if (node != null) {
			var keywords = Ext.getCmp('keywordGrid');
			var store = keywords.getStore();
			store.proxy.conn.url = __ctxPath + '/know/childlist_typeUkKnowKeyword.do';
			var paramObj = {
				start : 0,
				limit : 25
			};
			if (node != null && node.id > 0) {
				paramObj["typeId"] = node.id;
		
			}
			store.reload({
						params : paramObj
			});
		}
	},

	/**
	 * 添加所有
	 */
	addAll : function() {
		var keywordGrid = Ext.getCmp('keywordGrid');
		var selGrid = Ext.getCmp('selectedKeywordGrid');
		var selStore = selGrid.getStore();
		var rows = keywordGrid.getSelectionModel().getSelections();
		for (var i = 0; i < rows.length; i++) {
			var keywordId = rows[i].data.keywordId;
			var keyWord = rows[i].data.keyWord;
			var isExist = false;
			// 查找是否存在该记录
			for (var j = 0; j < selStore.getCount(); j++) {
				if (selStore.getAt(j).data.keywordId == keywordId) {
					isExist = true;
					break;
				}
			}
			if (!isExist) {
				var newData = {
					keywordId : keywordId,
					keyWord : keyWord
				};
				var newRecord = new selStore.recordType(newData);
				selGrid.stopEditing();
				selStore.add(newRecord);
			}
		}
	},

	/**
	 * 移除所有
	 */
	removeAll : function() {
		var selGrid = Ext.getCmp('selectedKeywordGrid');
		var rows = selGrid.getSelectionModel().getSelections();
		var selStore = selGrid.getStore();
		for (var i = 0; i < rows.length; i++) {
			selGrid.stopEditing();
			selStore.remove(rows[i]);
		}
	},

	/**
	 * 搜索
	 */
	search : function() {
		var searchPanel = Ext.getCmp('keywordSelectorSearchPanel');
		var keywordGrid = Ext.getCmp('keywordGrid');
		searchPanel.getForm().submit({
			url : __ctxPath + '/know/listUkKnowKeyword.do',
			method : 'post',
			success : function(formPanel, action) {
				keywordGrid.getStore().proxy.conn.url = __ctxPath
						+ '/know/listUkKnowKeyword.do';
				var result = Ext.util.JSON.decode(action.response.responseText);
				keywordGrid.getStore().loadData(result);
			}
		});
	},

	/**
	 * 确定，提交
	 * 
	 * @param isSingle
	 *            是否单选
	 * @param callback
	 *            回传函数
	 */
	submit : function() {
		var keywordIds = '';
		var keyWords = '';
		if (this.isSingle == null || this.isSingle) {// 选择单个关键字
			var grid = Ext.getCmp('keywordGrid');
			var rows = grid.getSelectionModel().getSelections();

			for (var i = 0; i < rows.length; i++) {
				if (i > 0) {
					keywordIds += ',';
					keyWords += ',';
				}
				keywordIds += rows[i].data.keywordId;
				keyWords += rows[i].data.keyWord;
			}
		} else {
			var selStore = Ext.getCmp('selectedKeywordGrid').getStore();
			for (var i = 0; i < selStore.getCount(); i++) {
				if (i > 0) {
					keywordIds += ',';
					keyWords += ',';
				}
				keywordIds += selStore.getAt(i).data.keywordId;
				keyWords += selStore.getAt(i).data.keyWord;
			}
		}

		if (this.callback != null)
			this.callback.call(this.scope, keywordIds);
//			this.callback.call(this.scope, keywordIds, keyWords);
//		Ext.getCmp('KeywordSelectorWin').close();
	},

	/**
	 * 关闭当前窗口
	 */
	close : function() {
		Ext.getCmp('KeywordSelectorWin').close();
	}
};
