/**
 * @description 知识维度选择器
 * @class UserSelector
 * @author 优创融联科技
 * @updater zhangyl
 * @createtime 2011-1-19PM
 * 
 * @demo     UkKnowDimensionalitySelector.getView(function(data) {
					var fm = Ext.getCmp('UkKnowCollectFormWin');
					var dimensionalityId = '';
					var keyWord = '';
					for (var i = 0; i < data.length; i++) {
						if (i > 0) {
							dimensionalityId += ',';
							keyWord += ',';
						}
						dimensionalityId += data[i].dimensionalityId;
						keyWord += data[i].keyWord;
					}
					fm.getCmpByName('sysKnowDimensionalityIds').setValue(dimensionalityId);				//需要赋值的隐藏域
					fm.getCmpByName('keyWord').setValue(keyWord);							//需要赋值的显示域
				}, false, null).show();
 */
var UkKnowDimensionalitySelector = {

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
	getView : function(callbackOrConf, isSingle, isForFlow,dimenId,bussType) {
		
		this.dimenId = dimenId;
		this.url = '';//2=机构，3=岗位，1=业务
		this.mark = 1;
		this.know_dimen = 0;
		if(bussType==1){
			this.mark = 1;
			this.know_dimen = 0;
			this.url = __ctxPath + '/know/listDimenTreeUkKnowDimensionality.do?flag=0'
		}
		if(bussType==2){
			this.mark = 2;
			this.know_dimen = -1;
			this.url = __ctxPath + '/know/listDepTreeUkKnowDimensionality.do?flag=0'
		}
		if(bussType==3){
			this.mark = 3;
			this.know_dimen = -2;
			this.url = __ctxPath + '/know/listJobTreeUkKnowDimensionality.do?flag=0'
		}
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
					id : 'DimenSelectorWin',
					title : '选择知识维度',
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
								url : __ctxPath + '/know/clickNodeUkKnowDimensionality.do'
							}),
					reader : new Ext.data.JsonReader({
								root : 'result',
								totalProperty : 'totalCounts',
								id : 'id',
								fields : [{
											name : 'dimensionalityId',
											type : 'long'
										}, 'dimeName', 'mark']
							}),
//					remoteSort : true,
					baseParams : {
						start : 0,
						limit : 12,
						dimenId : this.know_dimen,
						mark : this.mark
					}
				});
//		store.setBaseParam('Q_mark_L_EQ',1);
//		store.setDefaultSort('dimensionalityId', 'desc');
		store.load({
					params : {
						start : 0,
						limit : 12,
						dimenId : this.know_dimen,
						mark : this.mark
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
						header : "内码",
						hidden : true,
						dataIndex : 'dimensionalityId',
						width : 60
					},{
						header : "名称",
						dataIndex : 'dimeName',
						width : 60
//					},{
//						header : "类型",
//						dataIndex : 'mark',
//						width : 60,
//						renderer : function(value){
//							if(value == 1){
//								return '业务维度';
//							}
//							if(value == 2){
//								return '机构维度';
//							}
//							if(value == 3){
//								return '岗位维度';
//							}
//						}
					}],
					defaults : {
//						sortable : true,
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
		var dimensionalityGrid = new HT.GridPanel({
					// TODO EditorGridPanel用户列表
					title : '知识维度列表',
					autoScroll : true,
					id : 'dimensionalityGrid',
					region : 'center',
					height : 380,
					autoWidth : false,
					store : store,
					shim : true,
					trackMouseOver : true,
					disableSelection : false,
					loadMask : true,
					cm : cm,
//					sm : sm,
					viewConfig : {
						forceFit : true,
						enableRowBody : false,
						showPreview : false
					},
					bbar : new HT.PagingBar({
								store : store,
								pageSize : 12
							})
				}); // end of this contactGrid
		//点击知识，在多选面板中添加该项
//		dimensionalityGrid.on('rowdblclick', this.addAll); // end of contact grid
		// ////////////////////contactGrid[用户列表] end///////////////////////

		// /////////////////searchPanel[搜索面板] start//////////////////////
		var searchPanel = new HT.SearchPanel({
					// TODO searchPanel[搜索面板]
					id : 'dimenSelectorSearchPanel',
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
					items : [ {
								text : '名称'
							}, {
								xtype : 'textfield',
								name : 'dimeName',
								width : 260,flex : 1,
								id : 'search_name',
								maxLength : 256
							}, {
								xtype : 'button',
								text : '查询',
								iconCls : 'btn-search',
								scope : this,
								handler : this.search
							},{
								xtype : 'hidden',
								name : 'mark',
								value : this.mark,
								id : 'knowDimen_mark'
							}, {
								xtype : 'hidden',
								name : 'dimenId',
								value : this.know_dimen,
								id : 'knowDimen_dimenId'
							}]
				}); // end of this searchPanel
		// ////////////////////searchPanel[搜索面板]
		// end//////////////////////////////////

		var treePanel = new Ext.tree.TreePanel({
			region : 'west',
			id : 'UkKnowDimenTreePanel',
			title : '知识维度分类',
			collapsible : true,
			autoScroll : true,
			split : true,
			height : 800,
			width : 180,
			loader : new Ext.tree.TreeLoader({
						url : this.url
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
					title : '已选知识维度',
//					layout : 'form',
					region : 'center',
					width : '100%',
					autoWidth : true,
					height : '100%',
					autoHeight : true,
					autoScroll : true,
					border : false,
//					store : new Ext.data.ArrayStore({
//								autoLoad : true,
//								baseParams : {
//									dimenIdStr : this.dimenId
//								},
//								url : __ctxPath + '/know/findbyIdStrUkKnowDimensionality.do',
//								fields : [{
//											name : 'dimensionalityId',
//											type : 'long'
//										}, 'dimeName','mark']
//							}),
//					displayField : 'dimeName,mark',
//					valueField : 'dimensionalityId',
					trackMouseOver : true,
					sm : csm,
					columns : [csm, new Ext.grid.RowNumberer(), {
								header : "名称",
								dataIndex : 'dimeName'
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
					items : [searchPanel, westPanel, dimensionalityGrid]
				}); // end of this contactPanel
		// 添加：多选面板
		if (isSingle != null && isSingle == false) {
			panel.add(selectedPanel);
			panel.doLayout();
		}
		return panel;
	}, // init
	
	clickNode : function(node){
		var users = Ext.getCmp('dimensionalityGrid');
		Ext.getCmp('knowDimen_dimenId').setValue(node.id);
		Ext.getCmp('knowDimen_mark').setValue(node.attributes.mark);
		var store = users.getStore();
		store.baseParams['dimenId'] = node.id;
		store.baseParams['mark'] = node.attributes.mark;
		store.proxy.conn.url = __ctxPath + '/know/clickNodeUkKnowDimensionality.do';
		var paramObj = {
			start : 0,
			limit : 12
		};
		if (node != null) {
			paramObj["dimenId"] = node.id;
			paramObj["mark"] = node.attributes.mark;
			paramObj["isLeaf"] = node.attributes.leaf;
		}
		store.reload({
					params : paramObj
		});
	},
	/**
	 * 添加所有
	 */
	addAll : function() {
		var contactGrid = Ext.getCmp('dimensionalityGrid');
		var selGrid = Ext.getCmp('selectedGrid');
		var selStore = selGrid.getStore();
		var rows = contactGrid.getSelectionModel().getSelections();
		for (var i = 0; i < rows.length; i++) {
			var dimensionalityId = rows[i].data.dimensionalityId;
			var dimeName = rows[i].data.dimeName;
			var mark = rows[i].data.mark;
			var isExist = false;
			// 查找是否存在该记录
			for (var j = 0; j < selStore.getCount(); j++) {
				if (selStore.getAt(j).data.dimensionalityId == dimensionalityId) {
					isExist = true;
					break;
				}
			}
			if (!isExist) {
				var newData = {
					dimensionalityId : dimensionalityId,
					dimeName : dimeName,
					mark : mark
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
		var searchPanel = Ext.getCmp('dimenSelectorSearchPanel');
		var dimenGrid = Ext.getCmp('dimensionalityGrid');
		if(searchPanel.getForm().isValid()){
			var store = dimenGrid.getStore();
			var baseParam = Ext.Ajax.serializeForm(searchPanel.getForm().getEl());
			var deParams = Ext.urlDecode(baseParam);
			deParams.start = 0;
			deParams.limit = store.baseParams.limit;
			store.baseParams = deParams;
			dimenGrid.getBottomToolbar().moveFirst();
		}
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
		
		if (this.isSingle == null || this.isSingle) {// 选择单个
			var grid = Ext.getCmp('dimensionalityGrid');
			
			var rows = grid.getSelectionModel().getSelections();
			if(rows!=null && rows!=''){
				data = rows[0].data;
			}else{
				Ext.ux.Toast.msg("操作信息","请选择一条记录!");
				return;
			}
		} else {
			data = new Array();
			var selStore = Ext.getCmp('selectedGrid').getStore();
			for (var i = 0; i < selStore.getCount(); i++) {
				data.push(selStore.getAt(i).data);
			}
		}

		if (this.callback != null)
			this.callback.call(this.scope, data);
		Ext.getCmp('DimenSelectorWin').close();
	},

	/**
	 * 关闭当前窗口
	 */
	close : function() {
		Ext.getCmp('DimenSelectorWin').close();
	}
};
