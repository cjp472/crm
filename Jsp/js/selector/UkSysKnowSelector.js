/**
 * @description 知识选择器
 * @class UserSelector
 * @author 优创融联科技
 * @updater zhangyl
 * @createtime 2011-1-19PM
 */
var UkSysKnowSelector = {

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
	getView : function(callbackOrConf, isSingle, isForFlow) {
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
					id : 'UkKnowApplySelectorWin',
					title : '选择知识',
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
								url : __ctxPath + "/know/queryKnowListUkSysKnow.do"
							}),
					reader : new Ext.data.JsonReader({
								root : 'result',
								totalProperty : 'totalCounts',
								id : 'id',
								fields : [{
											name : 'knowId',
											type : 'long'
										}, 'tiTle', 'busiType']
							}),
					remoteSort : true
				});
		store.setDefaultSort('id', 'desc');
		store.setBaseParam('status',5);
		store.setBaseParam('isPermission','false');
		store.setBaseParam('checkTypeRole','false');
		store.setBaseParam('start',0);
		store.setBaseParam('limit',25);
		store.load({
					params : {
						start : 0
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
						dataIndex : 'knowId',
						width : 60
					},{
						header : "标题",
						dataIndex : 'tiTle',
						width : 60
					},{
						header : "业务分类",
						dataIndex : 'busiType',
						width : 60,
						renderer : function(value) {
							return SQ_BUSI_TYPE.get(value);
						}
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
		var sysKnowGrid = new  HT.GridPanel({
					// TODO EditorGridPanel用户列表
					title : '知识列表',
					autoScroll : true,
					id : 'sysKnowSelectorGrid',
					region : 'center',
					height : 380,
					autoWidth : false,
					url : __ctxPath + "/know/queryKnowListUkSysKnow.do",
					baseParams :{
						status : 5,
						checkTypeRole : 'false',
						isPermission : 'false'
					}, 
//					store : store,
//					shim : true,
//					trackMouseOver : true,
//					disableSelection : false,
//					loadMask : true,
					cm : cm,
					fields : [{
						name : 'knowId',
						type : 'int'
					}, 'ukSysKnow', 'ukKnowTypes', 'tiTle', 'busiType',
					'enableTime', 'pastTime', 'sysKnowStatus', 'viewCount',
					'sysKnowComment', 'plus1', 'plus2', 'plus3', 'plus4',
					'plus5', 'plus6', 'plus7', 'plus8', 'sysKnowVersion',
					'createBy', 'updateBy', 'createDate', 'updateDate',
					'userid', 'ukKnowTemplate', 'ukKnowApprove',
					'ukKnowKeywords']
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
		sysKnowGrid.on('rowdblclick', this.addAll); // end of contact grid
		// ////////////////////contactGrid[用户列表] end///////////////////////

		// /////////////////searchPanel[搜索面板] start//////////////////////
		var searchPanel = new HT.SearchPanel({
					// TODO searchPanel[搜索面板]
					id : 'sysKnowSelectorSearchPanel',
					height : 38,
					region : 'north',
					labelWidth : 30,
					labelAlign:'right',
					//layout : 'hbox',
//					bodyStyle : 'padding:6px 2px 2px 2px',
//					layoutConfigs : {
//						align : 'middle'
//					},
					keys : {
						key : Ext.EventObject.ENTER,
						scope : this,
						fn : function() {
									var searchPanel = Ext.getCmp('sysKnowSelectorSearchPanel');
									var gridPanel = Ext
											.getCmp('sysKnowSelectorGrid');
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
												.moveFirst();}}
					},
//					defaultType : 'label',
//					defaults : {
//						margins : '0 0 0 4'
//					},
					items : [{layout:'column',
					border:false,
					items:[{
					   xtype:'panel',
					   border:false,
					   columnWidth:.5,
					   layout:'form',
					   labelWidth : 60,
					  labelAlign:'right',
					  items:[{
								fieldLabel : '标题',
								name : 'title',
								anchor : '100%',
								maxLength : 256,
								xtype : 'textfield'
							}]
					},{
						 xtype:'panel',
					   border:false,
					   columnWidth:.5,
					   layout:'form',
					   labelWidth : 60,
					  labelAlign:'right',
					  items:[{
								xtype : 'button',
								text : '查询',
								iconCls : 'btn-search',
								scope : this,
								handler : function() {
									var searchPanel = Ext.getCmp('sysKnowSelectorSearchPanel');
									var gridPanel = Ext
											.getCmp('sysKnowSelectorGrid');
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
												.moveFirst();}}
							}]
					}]
					}]	
					
				}); // end of this searchPanel
		// ////////////////////searchPanel[搜索面板]
		// end//////////////////////////////////

		// ////////////////////selectedUserGrid[已选用户列表]
		// start/////////////////////
		var csm = new Ext.grid.CheckboxSelectionModel();
		var selectedKnowGrid = new Ext.grid.EditorGridPanel({
					// TODO selectedUserGrid[已选用户列表]
					id : 'selectedKnowGrid',
					title : '已选知识',
					layout : 'form',
					region : 'center',
					width : '100%',
					autoWidth : true,
					height : '100%',
					autoHeight : true,
					autoScroll : true,
					border : false,
					store : new Ext.data.ArrayStore({
						fields : ['knowId', 'tiTle','busiType']
					}),
					displayField : 'tiTle,busiType',
					valueField : 'knowId',
					trackMouseOver : true,
					sm : csm,
					columns : [csm, new Ext.grid.RowNumberer(), {
								header : "标题",
								dataIndex : 'tiTle'
							}]
				}); // end of this selectedUserGrid
		selectedKnowGrid.addListener('rowdblclick', function(grid, e) {
					var grid = Ext.getCmp('selectedKnowGrid');
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
								items : [selectedKnowGrid]
							}]
				}); // selectedPanel
		// /////////////////////selectedPanel end//////////////////////////////


		var panel = new Ext.Panel({
					// TODO panel总面板
					id : 'contactPanel',
					layout : 'border',
					region : 'center',
					border : false,
					anchor : '100%,100%',
					items : [searchPanel, sysKnowGrid]
				}); // end of this contactPanel
		// 添加：多选面板
		if (isSingle != null && isSingle == false) {
			panel.add(selectedPanel);
			panel.doLayout();
		}
		return panel;
	}, // init

	/**
	 * 添加所有
	 */
	addAll : function() {
		var contactGrid = Ext.getCmp('sysKnowSelectorGrid');
		var selGrid = Ext.getCmp('selectedKnowGrid');
		var selStore = selGrid.getStore();
		var rows = contactGrid.getSelectionModel().getSelections();
		for (var i = 0; i < rows.length; i++) {
			var knowId = rows[i].data.knowId;
			var tiTle = rows[i].data.tiTle;
			var busiType = rows[i].data.busiType;
			var isExist = false;
			// 查找是否存在该记录
			for (var j = 0; j < selStore.getCount(); j++) {
				if (selStore.getAt(j).data.knowId == knowId) {
					isExist = true;
					break;
				}
			}
			if (!isExist) {
				var newData = {
					knowId : knowId,
					tiTle : tiTle,
					busiType : busiType
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
		var selGrid = Ext.getCmp('selectedKnowGrid');
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
			alert('待添加lucene');
//		var searchPanel = Ext.getCmp('userSelectorSearchPanel');
//		var contactGrid = Ext.getCmp('contactGrid');
//		searchPanel.getForm().submit({
//			url : __ctxPath + '/system/listAppUser.do',
//			method : 'post',
//			success : function(formPanel, action) {
//				contactGrid.getStore().proxy.conn.url = __ctxPath
//						+ '/system/listAppUser.do';
//				var result = Ext.util.JSON.decode(action.response.responseText);
//				contactGrid.getStore().loadData(result);
//			}
//		});
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
			var grid = Ext.getCmp('selectedKnowGrid');
			var rows = grid.getSelectionModel().getSelections();
			
			data = rows[0].data;
		} else {
			data = new Array();
			var selStore = Ext.getCmp('selectedKnowGrid').getStore();
			for (var i = 0; i < selStore.getCount(); i++) {
				data.push(selStore.getAt(i).data);
			}
		}

		if (this.callback != null)
			this.callback.call(this.scope, data);
		Ext.getCmp('UkKnowApplySelectorWin').close();
	},

	/**
	 * 关闭当前窗口
	 */
	close : function() {
		Ext.getCmp('UkKnowApplySelectorWin').close();
	}
};
