/**
 * @description 用户选择器
 * @class UserSelector
 * @author 优创融联科技
 * @updater zhangyl
 * @createtime 2011-1-19PM
 */
var QcTemplateSelector = {

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
	getView : function(callbackOrConf) {
		// 单选
		if (typeof(callbackOrConf) == 'object') {
			this.scope = callbackOrConf.scope;
			this.callback = callbackOrConf.callback;
		} else {
			this.scope = this;
			this.callback = callbackOrConf;
		}
		
		var panel = this.initPanel();
		
		// window
		var window = new Ext.Window({
					id : 'QcTemplateSelectorWin',
					title : '选择一个模版',
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
								//TODO
								url : __ctxPath + '/qucon/getOneListQcTempRelease.do?channel=10'
							}),
					reader : new Ext.data.JsonReader({
								root : 'result',
								totalProperty : 'totalCounts',
								id : 'id',
								fields : [{
											name : 'tempReleId',
											type : 'long'
										}, 'releName', 'chkTypeId','releContent', 'remark','relaseUerName','qcTemplate']
							}),
					remoteSort : true
				});
		store.setDefaultSort('tempReleId', 'desc');
		store.load({
					params : {
						start : 0,
						limit : 12
					}
				});
//		alert(store.getAt(0).data.tempReleId);
		var sm = new Ext.grid.CheckboxSelectionModel({
						singleSelect : true
					});
		var cm = new Ext.grid.ColumnModel({
					columns : [sm, new Ext.grid.RowNumberer(), {
						header : "名称",
						dataIndex : 'releName',
						width : 60
					},{
						header : "描述",
						dataIndex : 'releContent'
					},{
						header : "考评方式",
						dataIndex : 'chkTypeId',
						renderer : function(value) {
							return QC_PFFS.get(value);
						}
					},{
						header : "备注",
						dataIndex : 'remark'
					},{
						header : "发布人",
						dataIndex : 'relaseUerName'
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

		///////////////////contactGrid[模版列表] start///////////////////
		var contactGrid = new Ext.grid.EditorGridPanel({
					// TODO EditorGridPanel用户列表
					title : '模版列表',
					autoScroll : true,
					id : 'contactGrid',
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
				}); // end of this contactGrid
		// ////////////////////contactGrid[用户列表] end///////////////////////
		
		var panel = new Ext.Panel({
					// TODO panel总面板
					id : 'contactPanel',
					layout : 'border',
					region : 'center',
					border : false,
					anchor : '100%,100%',
					items : [contactGrid]
				}); // end of this contactPanel
		return panel;
	
	}, // init

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
		var grid = Ext.getCmp('contactGrid');
		var rows = grid.getSelectionModel().getSelections();
		data = rows[0].data;
		
		if (this.callback != null)
			this.callback.call(this.scope, data);
		Ext.getCmp('QcTemplateSelectorWin').close();
	},

	/**
	 * 关闭当前窗口
	 */
	close : function() {
		Ext.getCmp('QcTemplateSelectorWin').close();
	}
};
