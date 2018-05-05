/**
 * @description 员工选择器(多选)
 * @class UlEmployeeSelectors
 * @author 优创融联科技
 * @updater zhangyl
 * @createtime 2011-1-19PM
 */
 
 /**
  * 使用实例
  * {
									xtype:'button',		
									border:false,
									iconCls:'btn-user-sel',
									text:'选择员工',
									handler:function(){
										UlEmployeeSelectors.getView(function(userId,fullname){			UlEmployeeSelectors调用UlEmployeeSelectors这个JS
//											Ext.getCmp("userId").setValue(userId);						给隐藏域  用户ID赋值
											Ext.getCmp("ulEmployee.parent_form").setValue(fullname);    给显示域  用户名赋值
										}).show();
									}
								}
  */
UlEmployeeSelectors = {

	/**
	 * 
	 * @param {}
	 *            callbackOrConf 回调函数或配置选项，若为map类型，则表示为配置选项
	 * @param {}
	 *            isSingle 是否单选
	 * @param {}
	 *            isForFlow 是否为工作流的配置选择
	 * @return {}
	 */
	getView : function(callbackOrConf, isSingle, isForFlow, mobileFlag) {
		// 单选
		if (typeof(callbackOrConf) == 'object') {
			this.scope = callbackOrConf.scope;
			this.callback = callbackOrConf.callback;
		} else {
			this.scope = this;
			this.callback = callbackOrConf;
		}
		this.isSingle = (isSingle != null) ? isSingle : true;
		this.mobileFlag = (mobileFlag != null) ? mobileFlag : false;
		var panel = this.initPanel(isSingle);
		// window
		var window = new Ext.Window({
					id : 'UlEmployeeSelectorsWin',
					title : '选择员工',
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
								url : __ctxPath + '/xitong/selectUlEmployee.do'
							}),
					reader : new Ext.data.JsonReader({
								root : 'result',
								totalProperty : 'totalCounts',
								id : 'id',
								fields : [{
											name : 'useid',
											type : 'int'
										}, 'fullname','sex','zhiwei','ulDepartment','userNo']
							}),
					remoteSort : true
				});
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
					columns : [sm, new Ext.grid.RowNumberer(), 
//						{
//						header : 'useid',
//						dataIndex : 'useid'
//					},
//					
					{
						header : "员工姓名",
						dataIndex : 'fullname',
						renderer : function(value, meta, record) {
							var title = record.data.title;
							if (title == 1)
								return '<img src="' + __ctxPath
										+ '/images/flag/man.png"/>&nbsp;'
										+ value;
							else
								return '<img src="' + __ctxPath
										+ '/images/flag/women.png"/>&nbsp;'
										+ value;
						},
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
		var treePanel = new Ext.tree.TreePanel({
					// TODO left节点treePanel
					id : 'treePanels',
					autoScroll : true,
					title : '按部门分类 ',
					iconCls : 'dep-user',
					loader : new Ext.tree.TreeLoader({
								url : __ctxPath + '/xitong/listUlDepartment.do'
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

		// ////////////////onlinePanel start////////////////////////////////
		var onlinePanel = new Ext.Panel({
					id : 'onlinePanel',
					autoScroll : true,
					iconCls : 'online-user',
					title : '在线员工  ',
					listeners : {
						'expand' : this.clickOnlinePanel
					}
				}); // end of this onlinePanel
		// /////////////////onlinePanel end/////////////////////////////

		// /////////////////contactGrid[员工列表] start///////////////////
		var contactGrid = new HT.GridPanel({
					// TODO EditorGridPanel员工列表
					title : '员工列表',
					autoScroll : true,
					id : 'contactGrid',
					region : 'center',
					height : 380,
					autoWidth : false,
					url : __ctxPath + '/xitong/selectUlEmployee.do',
						fields : [{name : 'useid',
											type : 'int'
										}, 'userId','fullname','sex','zhiwei','ulDepartment','userNo'],
					cm : cm
					
				}); // end of this contactGrid
				store.setDefaultSort('useid', 'desc');
		// 加载数据
		store.load({
					params : {
						start : 0,
						limit : 25
					}
				});

//		contactGrid.on('rowdblclick', function(grid, rowIndex, e) {
//					var contactGrid = Ext.getCmp('contactGrid');
//					var selGrid = Ext.getCmp('selectedEmpGrid');
//					var selStore = selGrid.getStore();
//					var rows = contactGrid.getSelectionModel().getSelections();
//					for (var i = 0; i < rows.length; i++) {
//						var fullname = rows[i].data.fullname;
//						var sex = rows[i].data.sex;
//						var useId = rows[i].data.useid;
//						var zhiwei = rows[i].data.zhiwei;
//						var userNo = rows[i].data.userNo;
//						var isExist = false;
//						// 查找是否存在该记录
//						for (var j = 0; j < selStore.getCount(); j++) {
//							if (selStore.getAt(j).data.useid == useId) {
//								isExist = true;
//								break;
//							}
//						}
//						if (!isExist) {
//							var newData = {
//								fullname : fullname,
//								sex : sex,
//								useid : useId,
//								zhiwei : zhiwei,
//								userNo:userNo
//								
//							};
//							var newRecord = new selStore.recordType(newData);
//							selGrid.stopEditing();
//							selStore.add(newRecord);
//						}
//					}
//				}); // end of contact grid
		// ////////////////////contactGrid[员工列表] end///////////////////////

		// /////////////////searchPanel[搜索面板] start//////////////////////
		var searchPanel = new HT.SearchPanel({
					// TODO searchPanel[搜索面板]
					id : 'UlEmployeeSelectorsSearchPanel',
					width : 600,
					height : 100,
					region : 'north',colNums : 2,
					layout : 'form',
					items : [{
								fieldLabel : '员工姓名',width : 230,
								name : 'Q_fullname_S_LK',
								flex : 1,
								xtype : 'textfield'
							}, {
								xtype : 'button',width : 50,
								text : '查询',flex : 1,
								iconCls : 'btn-search',
								scope : this,
								handler : this.search
							}]
				}); // end of this searchPanel
		// ////////////////////searchPanel[搜索面板]
		// end//////////////////////////////////

		// ////////////////////selectedEmpGrid[已选员工列表]
		// start/////////////////////
		var csm = new Ext.grid.CheckboxSelectionModel();
		var selectedEmpGrid = new Ext.grid.EditorGridPanel({
					// TODO selectedEmpGrid[已选员工列表]
					id : 'selectedEmpGrid',
					title : '已选员工',
					layout : 'form',
					region : 'center',
					width : '100%',
					autoWidth : true,
					height : '100%',
					autoHeight : true,
					autoScroll : true,
					border : false,
					store : new Ext.data.ArrayStore({
//								fields : ['useid', 'fullname']
									fields : ['fullname','sex','useid','zhiwei','ulDepartment','userNo']
							}),
					trackMouseOver : true,
					sm : csm,
					columns : [csm, new Ext.grid.RowNumberer(), 
//						{header:"useid",
//						 dataIndex : 'useid'
//						},
						{
								header : "员工名",
								dataIndex : 'fullname'
							}]
				}); // end of this selectedEmpGrid
		selectedEmpGrid.addListener('rowdblclick', function(grid, e) {
					var grid = Ext.getCmp('selectedEmpGrid');
					var store = grid.getStore();
					var rows = grid.getSelectionModel().getSelections();
					for (var i = 0; i < rows.length; i++) {
						grid.stopEditing();
						store.remove(rows[i]);
					}
				});
		// ///////////////////selectedEmpGrid[已选员工列表] end //////////////

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
								items : [selectedEmpGrid]
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
			items : [treePanel]
				// , rolePanel, onlinePanel
			}); // end of this westPanel
		// ///////////////westPanel end///////////////////////

		var panel = new Ext.Panel({
					// TODO panel总面板
					id : 'contactPanel',
					layout : 'border',
					region : 'center',
					border : false,
					anchor : '100%,100%',
					items : [searchPanel, westPanel, contactGrid]
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
			var users = Ext.getCmp('contactGrid');
			var store = users.getStore();
			store.proxy.conn.url = __ctxPath + '/xitong/selectUlEmployee.do';
			store.baseParams = {
				depId : node.id
			};
			store.load({
						params : {
							start : 0,
							limit : 12
						}
					});
		}
	},

	/**
	 * 在线员工
	 */
	clickOnlinePanel : function() {
		var users = Ext.getCmp('contactGrid');
		var store = users.getStore();
		store.proxy.conn.url = __ctxPath + '/xitong/onlineEmployee.do';
		store.load({
					params : {
						start : 0,
						limit : 200
					}
				});
	},

	/**
	 * 添加所有
	 */
	addAll : function() {
		var contactGrid = Ext.getCmp('contactGrid');
		var selGrid = Ext.getCmp('selectedEmpGrid');
		var selStore = selGrid.getStore();
		var rows = contactGrid.getSelectionModel().getSelections();
		
		for (var i = 0; i < rows.length; i++) {
//			var userId = rows[i].data.useid;
//			
//			var fullname = rows[i].data.fullname;

			var fullname = rows[i].data.fullname;
			var sex = rows[i].data.sex;
			var useId = rows[i].data.useid;
			var zhiwei = rows[i].data.zhiwei;
			var userNo = rows[i].data.userNo;
//			alert("添加所有userId="+userId+"fullname="+fullname+"useid="+useid);
			var isExist = false;
			// 查找是否存在该记录
			for (var j = 0; j < selStore.getCount(); j++) {
				if (selStore.getAt(j).data.useid == useId) {
					isExist = true;
					break;
				}
			}
			if (!isExist) {
				var newData = {
					fullname : fullname,
					sex : sex,
					useid : useId,
					zhiwei : zhiwei,
					userNo:userNo
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
		var selGrid = Ext.getCmp('selectedEmpGrid');
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
		var searchPanel = Ext.getCmp('UlEmployeeSelectorsSearchPanel');
		var gridPanel = Ext.getCmp('contactGrid');
		if (searchPanel.getForm().isValid()) {
			var store = gridPanel.getStore();
			var baseParam = Ext.Ajax.serializeForm(searchPanel.getForm()
					.getEl());
			var deParams = Ext.urlDecode(baseParam);
			deParams.start = 0;
			deParams.limit = store.baseParams.limit;
			store.baseParams = deParams;
			gridPanel.getBottomToolbar().moveFirst();
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
		var useIds = '';
		var fullnames = '';
		var sex = '';
		var zhiwei = '';
		
		if (this.isSingle == null || this.isSingle) {
			// 选择单个员工
			var grid = Ext.getCmp('contactGrid');
			var rows = grid.getSelectionModel().getSelections();

			for (var i = 0; i < rows.length; i++) {
				if (i > 0) {
					userIds += ',';
					fullnames += ',';
				}
				userIds += rows[i].data.userId;
				sex += rows[i].data.sex;
				useid += rows[i].data.useid;
				zhiwei += rows[i].data.zhiwei;
				depName += rows[i].data.ulDepartment.depname;
				depId += rows[i].data.ulDepartment.depid;
				userNo +=  rows[i].data.userNo;
				if (this.mobileFlag) {
					fullnames += rows[i].data.fullname + '('
							+ rows[i].data.mobile + ')';
				} else {
					fullnames += rows[i].data.fullname;
				}
			}
		} else {
			var rows = Ext.getCmp('selectedEmpGrid').getStore();
			
			for (var i = 0; i < rows.getCount(); i++) {
				if (i > 0) {
					useIds += ',';
					fullnames += ',';
				}
				useIds += rows.getAt(i).data.useid;
				sex += rows.getAt(i).data.sex;
				zhiwei += rows.getAt(i).data.zhiwei;
				if (this.mobileFlag) {
					fullnames += rows.getAt(i).data.fullname + '('
							+ rows.getAt(i).data.mobile + ')';
				} else {
					fullnames += rows.getAt(i).data.fullname;
				}
			}
			
		}
		if (this.callback != null)
			this.callback.call(this.scope, useIds);
		     Ext.getCmp('UlEmployeeGrid1').getStore().reload();
		    Ext.getCmp('UlEmployeeSelectorsWin').close();
//		    alert(Ext.getCmp('UlEmployeeGrid1').getStore());
//		    Ext.getCmp('UlEmployeeGrid1').getStore().reload();
	},

	/**
	 * 关闭当前窗口
	 */
	close : function() {
		Ext.getCmp('UlEmployeeSelectorsWin').close();
	}
};
