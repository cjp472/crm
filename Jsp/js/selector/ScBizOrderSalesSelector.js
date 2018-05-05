/**
 * @description 知识选择器
 * @class UserSelector
 * @author 优创融联科技
 * @updater zhangyl
 * @createtime 2011-1-19PM
 */
var ScBizOrderSalesSelector = {

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
	getView : function(callbackOrConf, isSingle, isForFlow,customerNo) {
		
		// 单选
		if (typeof(callbackOrConf) == 'object') {
			this.scope = callbackOrConf.scope;
			this.callback = callbackOrConf.callback;
		} else {
			this.scope = this;
			this.callback = callbackOrConf;
		}
		this.isSingle = (isSingle != null) ? isSingle : true;
		var panel = this.initPanel(isSingle,customerNo);
		// window
		var window = new Ext.Window({
					id : 'ScBizOrderSalesSelectorWin',
					title : '选择订单',
					iconCls : 'menu-appuser',
					width : 700,
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
	initPanel : function(isSingle,customerNo) {
		// //////////////store[获取数据] start////////////////////////////
		var store = new Ext.data.Store({
					proxy : new Ext.data.HttpProxy({
								url : __ctxPath + '/supply/listSoapByCusScBizOrderSales.do?customerNo='+customerNo
							}),
					reader : new Ext.data.JsonReader({
								root : 'result',
								totalProperty : 'totalCounts',
								id : 'id',
								fields : [{
											name : 'bizOrderId',
											type : 'long'
										}, 'totalInAmount', 'state','bizOrderNumber','deliverState']
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
					columns : [sm, new Ext.grid.RowNumberer(), {
//						header : "订单内码",
//						dataIndex : 'bizOrderId',
//						hidden : true,
//						width : 60
//					},{
						header : "订单编号",
						dataIndex : 'bizOrderNumber',
						sortable : false,
						width : 60
					},{
						header : "订单金额",
						dataIndex : 'totalInAmount',
						width : 60,
						sortable : false,
                        renderer : function(value){
                            return Number(value).toFixed(2);
                        }
					},{
						header : "订单状态",
						dataIndex : 'state',
						sortable : false,
						width : 60,
	                    renderer :function(value){
	                        return value != null ? ORD_STAT_CD.get(value) : '';
	                    }
					},{
						header : "配送方式",
						dataIndex : 'deliverState',
						sortable : false,
						width : 60,
	                    renderer :function(value){
	                        return value != null ? DLV_CD.get(value) : '';
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
		var orderSalesGrid = new HT.GridPanel({
					// TODO EditorGridPanel用户列表
					title : '订单列表',
					autoScroll : true,
					id : 'orderSalesGrid',
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
		orderSalesGrid.on('rowdblclick', this.addAll); // end of contact grid
		// ////////////////////contactGrid[用户列表] end///////////////////////

		// /////////////////searchPanel[搜索面板] start//////////////////////
		var searchPanel = new HT.SearchPanel({
					// TODO searchPanel[搜索面板]
					id : 'orderSalesSelectorSearchPanel',
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
								text : '订单编号'
							}, {
								xtype : 'textfield',
								name : 'bizOrderNumber',
								width : 260,
								maxLength : 256
							}, {
								xtype : 'button',
								text : '查询',
								iconCls : 'btn-search',
								scope : this,
								handler : this.search
							}, {
								xtype : 'hidden',
								name : 'customerNo',
								value : customerNo!=null&&customerNo!='' ? customerNo : ''
							}]
				}); // end of this searchPanel
		// ////////////////////searchPanel[搜索面板]
		// end//////////////////////////////////

		// ////////////////////selectedUserGrid[已选用户列表]
		// start/////////////////////
		var csm = new Ext.grid.CheckboxSelectionModel();
		var selectedOrderGrid = new Ext.grid.EditorGridPanel({
					// TODO selectedUserGrid[已选用户列表]
					id : 'selectedOrderGrid',
					title : '已选订单',
					layout : 'form',
					region : 'center',
					width : '100%',
					autoWidth : true,
					height : '100%',
					autoHeight : true,
					autoScroll : true,
					border : false,
					store : new Ext.data.ArrayStore({
						fields : ['totalInAmount', 'cusName', 'bizOrderId']
					}),
					displayField : 'bizOrderId,cusName',
					valueField : 'bizOrderId',
					trackMouseOver : true,
					sm : csm,
					columns : [csm, new Ext.grid.RowNumberer(), {
								header : "客户",
								dataIndex : 'cusName'
							},{
                                header : "编号",
                                dataIndex : 'bizOrderId'
                            }]
				}); // end of this selectedUserGrid
		selectedOrderGrid.addListener('rowdblclick', function(grid, e) {
					var grid = Ext.getCmp('selectedOrderGrid');
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
					width : '255',
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
								items : [selectedOrderGrid]
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
					items : [searchPanel, orderSalesGrid]
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
		var contactGrid = Ext.getCmp('orderSalesGrid');
		var selGrid = Ext.getCmp('selectedOrderGrid');
		var selStore = selGrid.getStore();
		var rows = contactGrid.getSelectionModel().getSelections();
		for (var i = 0; i < rows.length; i++) {
			var bizOrderId = rows[i].data.bizOrderId;
			var cusName = rows[i].data.cusName;
			var totalInAmount = rows[i].data.totalInAmount;
			var isExist = false;
			// 查找是否存在该记录
			for (var j = 0; j < selStore.getCount(); j++) {
				if (selStore.getAt(j).data.bizOrderId == bizOrderId) {
					isExist = true;
					break;
				}
			}
			if (!isExist) {
				var newData = {
					bizOrderId : bizOrderId,
					cusName : cusName,
					totalInAmount : totalInAmount
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
		var selGrid = Ext.getCmp('selectedOrderGrid');
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
		var searchPanel = Ext.getCmp('orderSalesSelectorSearchPanel');
		var contactGrid = Ext.getCmp('orderSalesGrid');
		if(searchPanel.getForm().isValid()){
			var store = contactGrid.getStore();
			var baseParam = Ext.Ajax.serializeForm(searchPanel.getForm().getEl());
			var deParams = Ext.urlDecode(baseParam);
			deParams.start = 0;
			deParams.limit = store.baseParams.limit;
			store.baseParams = deParams;
			contactGrid.getBottomToolbar().moveFirst();
		}
//		searchPanel.getForm().submit({
//			waitMsg : '正在提交查询',
//			url : __ctxPath + '/supply/listSoapByCusScBizOrderSales.do',
//			baseParams : {
//				start : 0,
//				limit : 12
//			},
//			success : function(formPanel, action) {
//				contactGrid.getStore().proxy.conn.url = __ctxPath
//						+ '/supply/listSoapByCusScBizOrderSales.do';
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
		var data = null;//= new Object();
		if (this.isSingle == null || this.isSingle) {// 选择单个用户
			var grid = Ext.getCmp('orderSalesGrid');
			var rows = grid.getSelectionModel().getSelections();
			if(rows!=null && rows!=''){
				data = rows[0].data;
			} else {
				Ext.ux.Toast.msg(__toastMessage, '请选择一条订单记录!');
			}
		} else {
			data = new Array();
			var selStore = Ext.getCmp('selectedOrderGrid').getStore();
			for (var i = 0; i < selStore.getCount(); i++) {
				data.push(selStore.getAt(i).data);
			}
		}

		if (this.callback != null && data != null){
			this.callback.call(this.scope, data);
			Ext.getCmp('ScBizOrderSalesSelectorWin').close();
		}
	},

	/**
	 * 关闭当前窗口
	 */
	close : function() {
		Ext.getCmp('ScBizOrderSalesSelectorWin').close();
	}
};
