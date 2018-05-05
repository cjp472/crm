/**
 * @description 关键字选择器
 * @class UserSelector
 * @author 优创融联科技
 * @updater zhangyl
 * @createtime 2011-1-19PM
 * 
 * @demo     UkKnowKeywordSelector.getView(function(data) {
					var fm = Ext.getCmp('UkKnowCollectFormWin');
					var keywordId = '';
					var keyWord = '';
					for (var i = 0; i < data.length; i++) {
						if (i > 0) {
							keywordId += ',';
							keyWord += ',';
						}
						keywordId += data[i].keywordId;
						keyWord += data[i].keyWord;
					}
					fm.getCmpByName('sysKnowKeyWordIds').setValue(keywordId);				//需要赋值的隐藏域
					fm.getCmpByName('keyWord').setValue(keyWord);							//需要赋值的显示域
				}, false, null).show();
 */
var UkKnowKeywordSelector = {

	/**
	 * 
	 * @param {}
	 *            callbackOrConf 回调函数或配置选项，若为map类型，则表示为配置选项,
	 *            data参数在单选时，为一个对象，包含选择的数据的值，多选时为list，包含多个数据对象
	 * @param {}
	 *            isSingle 是否单选
	 * @param {}
	 *            isForFlow 是否为工作流的配置选择
	 * @return {}
	 */
	getView : function(callbackOrConf, isSingle, isForFlow,keyWordId) {
		
		this.keyWordId = keyWordId;
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
		var window = new Ext.Window({
					id : 'SelectorWin',
					title : '选择关键字',
					iconCls : 'menu-appuser',
					width : 640,
					minWidth : 640,
					height : 480,
					minHeight : 480,
					layout : 'fit',
					border : false,
					maximizable : true,
					resizable : true,
					modal : true,
					items : [panel],
					buttonAlign : 'center',
					buttons : [{
								text : '确认',
								iconCls : 'btn-ok',
								scope : this,
								handler : this.submit
							}, {
								text : '关闭',
								iconCls : 'btn-cancel',
								scope : this,
								handler : this.close
							}]
				});

		if (isForFlow) {
			window.addButton(new Ext.Button({
						text : '发起人',
						iconCls : 'menu-subuser',
						scope : this,
						handler : function() {
							this.callback.call(this, '__start', '[发起人]');
							window.close();
						}
					}));
		}

		return window;
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
								id : 'id',
								fields : [{
											name : 'keywordId',
											type : 'long'
										}, 'keyWord', 'comMent']
							}),
					remoteSort : true
				});
		store.setBaseParam('Q_knowStatus_L_EQ',1);		
		store.setDefaultSort('id', 'desc');
		store.load({
					params : {
						start : 0,
						limit : 12
					}
				});
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
						header : "编号",
						dataIndex : 'keywordId',
						width : 60
					},{
						header : "名称",
						dataIndex : 'keyWord',
						width : 60
					},{
						header : "备注",
						dataIndex : 'comMent',
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

		// /////////////////contactGrid[用户列表] start///////////////////
		var keywordGrid = new HT.GridPanel({
					// TODO EditorGridPanel用户列表
					title : '关键字列表',
					autoScroll : true,
					id : 'keywordGrid',
					region : 'center',
					height : 380,
					autoWidth : false,
					url : __ctxPath + '/know/listUkKnowKeyword.do',
					fields : [{
											name : 'keywordId',
											type : 'long'
										}, 'keyWord', 'comMent'],
					baseParams :{
					'Q_knowStatus_L_EQ' : 1
					},					
//					store : store,
//					shim : true,
//					trackMouseOver : true,
//					disableSelection : false,
//					loadMask : true,
					cm : cm
//					sm : sm,
//					viewConfig : {
//						forceFit : true,
//						enableRowBody : false,
//						showPreview : false
//					},
//					bbar : new HT.PagingBar({
//								store : store,
//								pageSize : 12
//							})
				}); // end of this contactGrid
		//点击知识，在多选面板中添加该项
		keywordGrid.on('rowdblclick', this.addAll); // end of contact grid
		// ////////////////////contactGrid[用户列表] end///////////////////////

		// /////////////////searchPanel[搜索面板] start//////////////////////
		var searchPanel = new HT.SearchPanel({
					// TODO searchPanel[搜索面板]
					id : 'keywordSelectorSearchPanel',
					height : 38,
					region : 'north',
					colNums : 2,labelWidth : 30,
					labelAlign:'right',
//					layout : 'hbox',
//					bodyStyle : 'padding:6px 2px 2px 2px',
//					layoutConfigs : {
//						align : 'middle'
//					},
					keys : {
						key : Ext.EventObject.ENTER,
						scope : this,
						fn : this.search
					},
//					defaultType : 'label',
//					defaults : {
//						margins : '0 0 0 4'
//					},
					items : [ {fieldLabel : '名称',
								xtype : 'textfield',
								name : 'Q_keyWord_S_LK',
								width : 260,flex : 1,
								id : 'search_name',
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

		var treePanel = new Ext.tree.TreePanel({
			region : 'west',
			id : 'UkKnowKeywordTypeTreePanel',
			title : '关键字分类',
			collapsible : true,
			autoScroll : true,
			split : true,
			height : 800,
			width : 180,
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
		}); // end of this treePanel
		
		// ////////////////////selectedUserGrid[已选用户列表]
		// start/////////////////////
		var csm = new Ext.grid.CheckboxSelectionModel();
		var selectedGrid = new Ext.grid.EditorGridPanel({
					// TODO selectedUserGrid[已选用户列表]
					id : 'selectedGrid',
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
									keyWordIdStr : this.keyWordId
								},
								url : __ctxPath
										+ '/know/findbyIdStrUkKnowKeyword.do',
								fields : [{
											name : 'keywordId',
											type : 'int'
										}, 'keyWord','comMent']
							}),
					displayField : 'keyWord,comMent',
					valueField : 'keywordId',
					trackMouseOver : true,
					sm : csm,
					columns : [csm, new Ext.grid.RowNumberer(), {
								header : "名称",
								dataIndex : 'keyWord'
							}]
				}); // end of this selectedUserGrid
		selectedGrid.addListener('rowdblclick', function(grid, e) {
					var grid = Ext.getCmp('selectedGrid');
					var store = grid.getStore();
					var rows = grid.getSelectionModel().getSelections();
					for (var i = 0; i < rows.length; i++) {
						grid.stopEditing();
						store.remove(rows[i]);
					}
				});
		// ///////////////////selectedUserGrid[已选用户列表] end //////////////

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
								items : [selectedGrid]
							}]
				}); // selectedPanel
		// /////////////////////selectedPanel end//////////////////////////////

		var westPanel = new Ext.Panel({
			layout : 'accordion',
			region : 'west',
			width : 200,
			split : true,
			header : false,
			collapsible : true,
			items : [treePanel]
				// , rolePanel, onlinePanel
			});

		var panel = new Ext.Panel({
					// TODO panel总面板
					id : 'contactPanel',
					layout : 'border',
					region : 'center',
					border : false,
					anchor : '100%,100%',
					items : [searchPanel, westPanel, keywordGrid]
				}); // end of this contactPanel
		// 添加：多选面板
		if (isSingle != null && isSingle == false) {
			panel.add(selectedPanel);
			panel.doLayout();
		}
		return panel;
	}, // init
	
	clickNode : function(node){
		var users = Ext.getCmp('keywordGrid');
		var store = users.getStore();
		store.proxy.conn.url = __ctxPath + '/know/childlist_typeDelUkKnowKeyword.do';
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
	},
	/**
	 * 添加所有
	 */
	addAll : function() {
		var contactGrid = Ext.getCmp('keywordGrid');
		var selGrid = Ext.getCmp('selectedGrid');
		var selStore = selGrid.getStore();
		var rows = contactGrid.getSelectionModel().getSelections();
		for (var i = 0; i < rows.length; i++) {
			var keywordId = rows[i].data.keywordId;
			var keyWord = rows[i].data.keyWord;
			var comMent = rows[i].data.comMent;
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
					keyWord : keyWord,
					comMent : comMent
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
		var selGrid = Ext.getCmp('selectedGrid');
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
//		var users = Ext.getCmp('keywordGrid');
//		var store = users.getStore();
//		var name = Ext.getCmp('search_name');
//		store.proxy.conn.url = __ctxPath + '/know/likeUkKnowKeyword.do';
//		var paramObj = {
//			start : 0,
//			limit : 25
//		};
//		paramObj["Q_keyWord_S_LK"] = name.getValue();
//		store.reload({
//					params : paramObj
//		});
		var searchPanel = Ext.getCmp('keywordSelectorSearchPanel');
									var gridPanel = Ext
											.getCmp('keywordGrid');
									if (searchPanel.getForm().isValid()) {
										var store = gridPanel.getStore();
										var baseParam = Ext.Ajax
												.serializeForm(searchPanel
														.getForm().getEl());
										var deParams = Ext.urlDecode(baseParam);
										deParams.start = 0;
										deParams.limit = store.baseParams.limit;
										store.baseParams = deParams;
										gridPanel.getBottomToolbar()
												.moveFirst();}
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
		var data ;//= new Object();
		
		if (this.isSingle == null || this.isSingle) {// 选择单个用户
			var grid = Ext.getCmp('keywordGrid');
			
			var rows = grid.getSelectionModel().getSelections();
			data = rows[0].data;
		} else {
			data = new Array();
			var selStore = Ext.getCmp('selectedGrid').getStore();
			for (var i = 0; i < selStore.getCount(); i++) {
				data.push(selStore.getAt(i).data);
			}
		}

		if (this.callback != null)
			this.callback.call(this.scope, data);
		Ext.getCmp('SelectorWin').close();
	},

	/**
	 * 关闭当前窗口
	 */
	close : function() {
		Ext.getCmp('SelectorWin').close();
	}
};
