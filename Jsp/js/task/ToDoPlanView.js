Ext.ns('CalendarPlanView');
/**
 * 日程列表
 */
var ToDoPlanView = function() {
	return new Ext.Panel({
		id : 'ToDoPlanView',
		layout : 'border',
		iconCls : 'menu-cal-plan-view',
		title : '待办任务',
		items : [new Ext.FormPanel({
			defaults : {
				border : false
			},
			region : 'north',
			height : 35,
			layout : 'hbox',
			id : 'ToDoPlanSearchForm',
			bodyStyle : 'padding:5px',
			items : [{
						border : false,
						style : 'text-align:right',
						html : '&nbsp;任务类型：&nbsp;&nbsp;'
					}, {
						hiddenName : 'Q_taskType_SN_EQ',
						xtype : 'mtdiccombo',
						mode : 'local',
						editable : false,
						triggerAction : 'all',
						flex : 1,
						lazyInit : false,
						itemKey : 'CONFX'
					}, {
						border : false,
						style : 'text-align:right',
						html : '&nbsp;分配时间：&nbsp;&nbsp;'
					}, {
						xtype : 'datefield',
						format : 'Y-m-d',
						name : 'Q_startTime_D_GE',
						id:'Q_startTime_D_GE__',
						editable : false
					}, {
						border : false,
						style : 'text-align:right',
						html : '&nbsp;-&nbsp;'
					}, {
						xtype : 'datefield',
						format : 'Y-m-d',
						name : 'Q_startTime_D_LE',
						id:'Q_startTime_D_LE__',
						editable : false
					},  {
						border : false,
						style : 'text-align:right',
						html : '&nbsp;负责人：&nbsp;&nbsp;'
					},{
						xtype : 'textfield',
						name : 'Q_fullname_S_LK'
					}, {
						border : false,
						style : 'text-align:right',
						html : '&nbsp;&nbsp;'
					}, {
						xtype : 'button',
						text : '查询',
						iconCls : 'search',
						handler : function() {
							var searchPanel = Ext.getCmp('ToDoPlanSearchForm');
							var gridPanel = Ext.getCmp('ToDoPlanGrid');
							gridPanel.getStore().proxy.conn.url = __ctxPath
									+ '/task/listPlanHandleCalendarPlan.do?Q_userId_L_EQ='
									+ curUserInfo.userId;
							if (searchPanel.getForm().isValid()) {
								$search({
									searchPanel : searchPanel,
									gridPanel : gridPanel
								});
							}
						}
					}, {
						border : false,
						style : 'text-align:right',
						html : '&nbsp;&nbsp;'
					},{
						xtype : 'button',
						text : '重置',
						iconCls : 'btn-reseted',
						bodyStyle : 'margin-left:10px',
						handler : function() {
							var searchPanel = Ext.getCmp('ToDoPlanSearchForm');
							Ext.getCmp('Q_startTime_D_GE__').setRawValue(""); 
							Ext.getCmp('Q_startTime_D_LE__').setRawValue(""); 
							searchPanel.getForm().reset();
						}
					}]

		}), this.setup()]
	});
};
/**
 * 建立视图
 */
ToDoPlanView.prototype.setup = function() {
	return this.grid();
};
/**
 * 建立DataGrid
 */
ToDoPlanView.prototype.grid = function() {
	var sm = new Ext.grid.CheckboxSelectionModel();
	var cm = new Ext.grid.ColumnModel({
		columns : [sm, new Ext.grid.RowNumberer(), {
					header : 'planId',
					dataIndex : 'planId',
					hidden : true
				}, {
					width : 120,
					header : '标题',
					dataIndex : 'taskTitle'
				}, {
					header : '任务类型',
					width : 60,
					dataIndex : 'taskType',
					renderer : function(value) {
						if (value != '' || value == '0') {
							return CONFX.get(value);
						} else {
							return ' ';
						}
					}
				}, {
					header : '任务类别',
					width : 50,
					dataIndex : 'taskCategory',
					renderer : function(value) {
						if (value != '' || value == '0') {
							return CONTPJYLX.get(value);
						} else {
							return ' ';
						}
					}
				}, {
					header : '任务事项',
					width : 60,
					dataIndex : 'taskBusiType',
					renderer : function(value) {
						if (value != '' || value == '0') {
							return CONTPCLJG.get(value);
						} else {
							return ' ';
						}
					}
				}, {
					header : '分配时间',
					width : 100,
					dataIndex : 'startTime'
				}, {
					header : '要求完成时间',
					width : 100,
					dataIndex : 'completeTime',
					format : 'Y-m-d H:i:s'
					// }, {
				// header : '剩余时间',
				// width:100,
				// dataIndex : 'content'
				// }, {
				// header : '完成率',
				// width:60,
				// dataIndex : 'effeciency',
				// renderer:function(value){
				// if(value==null || value==""){
				// return '0%'
				// }else{
				// return value+'%';
				// }
				//						
				// }
			}	, {
					header : '负责人',
					width : 60,
					dataIndex : 'fullname'
				}, {
					header : '状态',
					width : 50,
					dataIndex : 'status',
					renderer : function(value) {
						if (value != null && !value == "") {
							return CON_REQ_STATUS.get(value);
						} else {
							return '';
						}
					}
				}, {
					header : '管理',
					dataIndex : 'planId',
					width : 40,
					sortable : false,
					renderer : function(value, metadata, record, rowIndex,
							colIndex) {
						var editId = record.data.planId;
						var status = record.data.status;
						var assignerId = record.data.assignerId;
						// var str = '<button title="删除" value=" "
						// class="btn-del" onclick="ToDoPlanView.remove('+
						// editId + ')"></button>';
						var str = '';
						if (status == 1) {
							if (assignerId == curUserInfo.userId) {// 本人的分配的任务可以修改
								str += '&nbsp;<button title="编辑" value=" " class="btn-edit" onclick="ToDoPlanView.edit('
										+ editId + ')"></button>';
							}
							str += '&nbsp;<button title="处理任务" value="" class="btn-task" onclick="ToDoPlanView.finished('
									+ editId + ')"></button>';
						}
						return str;
					}
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
			limit : 25
		}
	});
	var grid = new Ext.grid.GridPanel({
		region : 'center',
		id : 'ToDoPlanGrid',
		tbar : this.topbar(),
		store : store,
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
		bbar : new Ext.PagingToolbar({
			pageSize : 25,
			store : store,
			displayInfo : true,
			displayMsg : '当前显示从{0}至{1}， 共{2}条记录',
			emptyMsg : "当前没有记录"
		})
	});
	return grid;

};

/**
 * 初始化数据
 */
ToDoPlanView.prototype.store = function() {
	var store = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
			url : __ctxPath
					+ '/task/listPlanHandleCalendarPlan.do?Q_executor_L_EQ='
					+ curUserInfo.userId
		}),
		reader : new Ext.data.JsonReader({
			root : 'result',
			totalProperty : 'totalCounts',
			id : 'id',
			fields : [{
				name : 'planId',
				type : 'int'
			}, 'taskTitle', 'taskType', 'taskCategory',
			'taskBusiType', 'startTime','completeTime', 'content',
			'userId', 'fullname', 'status', 'effeciency',
			'dicTaskCategory', 'dicTaskType', 'dicBusiType']
		})
	});
	store.setDefaultSort('planId', 'desc');
	return store;
};

/**
 * 建立操作的Toolbar
 */
ToDoPlanView.prototype.topbar = function() {
	var toolbar = new Ext.Toolbar({
		id : 'ToDoPlanFootBar',
		height : 30,
		bodyStyle : 'text-align:left',
		items : ['->', {
					iconCls : 'btn-add',
					text : '添加任务',
					xtype : 'button',
					handler : function() {
						// new CalendarPlanForm();
						var tabs = Ext.getCmp('centerTabPanel');
						var aForm = Ext.getCmp('addCalendarPlanFormWin');
						if (aForm != null) {
							tabs.remove('addCalendarPlanFormWin');
						}
						aForm = new addCalendarPlanForm({
									planId : id
								});
						tabs.add(aForm);
						tabs.activate(aForm);
					}
				}
				// , {
				// iconCls : 'btn-del',
				// text : '删除日程',
				// xtype : 'button',
				// handler : function() {
				//
				// var grid = Ext.getCmp("ToDoPlanGrid");
				//
				// var selectRecords = grid.getSelectionModel()
				// .getSelections();
				//
				// if (selectRecords.length == 0) {
				// Ext.ux.Toast.msg("信息", "请选择要删除的记录！");
				// return;
				// }
				// var ids = Array();
				// for (var i = 0; i < selectRecords.length; i++) {
				// ids.push(selectRecords[i].data.planId);
				// }
				//
				// CalendarPlanView.remove(ids);
				// }
				// }
				, {
					text : '我分配的任务',
					xtype : 'button',
					hidden : true,
					iconCls : 'btn-myAssign',
					handler : function() {
						var form = Ext.getCmp('ToDoPlanSearchForm').getForm();
						form.submit({
							waitMsg : '正在提交查询',
							url : __ctxPath
									+ '/task/listCalendarPlan.do',
							params : {
								'Q_userId_L_EQ' : curUserInfo.userId
							},
							success : function(formPanel, action) {
								var result = Ext.util.JSON
										.decode(action.response.responseText);
								Ext.getCmp('ToDoPlanGrid').getStore()
										.loadData(result);
							}
						});
					}
				}, {
					text : '分配给我的任务',
					xtype : 'button',
					hidden : true,
					iconCls : 'btn-myAssign',
					handler : function() {
						var form = Ext.getCmp('ToDoPlanSearchForm').getForm();
						form.submit({
							waitMsg : '正在提交查询',
							url : __ctxPath
									+ '/task/listPlanHandleCalendarPlan.do',
							params : {
								'Q_assignerId_L_EQ' : curUserInfo.userId
							},
							success : function(formPanel, action) {
								var result = Ext.util.JSON
										.decode(action.response.responseText);
								Ext.getCmp('ToDoPlanGrid').getStore()
										.loadData(result);
							}
						});
					}
				}, {
					text : '今日常务',
					xtype : 'button',
					hidden : true,
					iconCls : 'menu-cal-plan',
					handler : function() {
						App.clickTopTab('MyPlanTaskView');
					}
				}]
	});
	return toolbar;
};

/**
 * 删除单个记录
 */
ToDoPlanView.remove = function(id) {
	var grid = Ext.getCmp("ToDoPlanGrid");
	Ext.Msg.confirm('信息确认', '您确认要删除该记录吗？', function(btn) {
				if (btn == 'yes') {
					Ext.Ajax.request({
						url : __ctxPath
								+ '/task/multiDelCalendarPlan.do',
						params : {
							ids : id
						},
						method : 'post',
						success : function() {
							Ext.ux.Toast.msg("信息提示", "成功删除所选记录！");
							grid.getStore().reload({
								params : {
									start : 0,
									limit : 25
								}
							});
						}
					});
				}
			});
};

/**
 * 
 */
ToDoPlanView.edit = function(id) {
	new CalendarPlanForm(id);
}
/**
 * 完成任务，填写反馈意见
 * 
 * @param {}
 *            id
 */
ToDoPlanView.finished = function(id) {
	// new CalendarPlanFinishForm(id);

	var tabs = Ext.getCmp('centerTabPanel');
	var aForm = Ext.getCmp('CalendarPlanHandleFormWin');
	if (aForm != null) {
		tabs.remove('CalendarPlanHandleFormWin');
	}
	aForm = new CalendarPlanHandleForm({
				planId : id,
				flag : 'add'
			});
	tabs.add(aForm);
	tabs.activate(aForm);
}
