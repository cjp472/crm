ExpiredFlowManagerView = Ext.extend(Ext.Panel, {
	constructor : function(conf) {
		Ext.applyIf(this, conf);
		this.initUIComponents();
		ExpiredFlowManagerView.superclass.constructor.call(this, {
					id : 'ExpiredFlowManagerView',
					title : '过期工单',
					iconCls : 'menu-task-manage',
					layout : 'border',
					items : [this.searchPanel, this.gridPanel]
				});
	},
	initUIComponents : function() {
		this.searchPanel = new HT.SearchPanel({
					layout : 'hbox',
					region : 'north',
					id : 'ExpiredFlowManagerSearchForm',
					// colNums : 3,
					height : 35,
					items : [{
								text : "工单类别"// __ukKnowApproveApproveTitle
							}, {
								hiddenName : 'busType',
								xtype : 'mtdiccombo',
								editable : true,
								lazyInit : false,
								forceSelection : false,
								itemKey : 'FLOW_BUSTYPE'
							}, {
								text : "当前处理人"
							}, {
								id : 'Expried.taskUserName',
								xtype : 'textfield',
								listeners : {
									'focus' : function(pp) {
										var userId = Ext
												.getCmp('Expried.taskUser')
												.getValue();
										UserSelector
												.getView(
														function(userId,
																fullname) {
															Ext
																	.getCmp('Expried.taskUser')
																	.setValue(userId);
															Ext
																	.getCmp('Expried.taskUserName')
																	.setValue(fullname);
														}, false, false, false,
														userId)
												.show();
									},
									scope : this
								}
							}, {
								xtype : 'button',
								text : __search,
								iconCls : 'search',
								scope : this,
								handler : function() {
									var searchPanel = Ext
											.getCmp('ExpiredFlowManagerSearchForm');
									var gridPanel = Ext
											.getCmp('ExpiredFlowGrid');
									if (searchPanel.getForm().isValid()) {
										$search({
													searchPanel : searchPanel,
													gridPanel : gridPanel
												});
									}

								}
							}, {
								xtype : 'button',
								text : __reset,
								scope : this,
								iconCls : 'btn-reset',
								handler : function() {
									var searchPanel = Ext
											.getCmp('ExpiredFlowManagerSearchForm');
									searchPanel.getForm().reset();
								}
							}, {
								xtype : 'button',
								text : __advancedSearch,
								iconCls : 'search',
								scope : this,
								handler : function() {
									new UkKnowApproveAdvancedSearchWin().show()
								}
							}, {
								name : 'taskUser',
								id : 'Expried.taskUser',
								xtype : 'hidden'
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
				});// end of searchPanel
		this.store = new Ext.data.JsonStore({
					baseParams : {
						start : 0,
						limit : 25,
						isOverdue : true,
						runStatus : '0,1'
					},
					url : __ctxPath + '/flow/taskListTask.do',
					root : 'result',
					totalProperty : 'totalCounts',
					fields : ['flowPk', 'runId', 'flowType', 'creater', 'piId',
							'taskUser', 'taskName', 'dueDate', 'busType',
							'busClasses', 'createTime', 'acceptanceTime',
							'taskId', 'runStatus', 'needsTime', 'finishTime',
							'taskUserName', 'applyName', 'applyTime',
							'residueTime', 'runType']
				});
		this.store.load();
		var sm = new Ext.grid.CheckboxSelectionModel({
					singleSelect : false
				});
		var cm = new Ext.grid.ColumnModel({
			columns : [new Ext.grid.RowNumberer(), {
						header : "userId",
						dataIndex : 'userId',
						width : 20,
						hidden : true,
						sortable : true
					}, {
						header : '工单类别',
						dataIndex : 'busType',
						width : 100,
						renderer : function(value) {
							return FLOW_BUSTYPE.get(value);
						}
					}, {
						header : '工单类型',
						dataIndex : 'runType',
						width : 100,
						renderer : function(value) {
							if (value != null) {
								return value.itemValue
							}
						}
					}, {
						header : '申请人',
						dataIndex : 'applyName'
					}, {
						header : '申请时间',
						dataIndex : 'applyTime',
						width : 120
					}, {
						header : '受理人',
						dataIndex : 'creater',
						width : 100,
						renderer : function(value) {
							if (value == null) {
								return '';
							} else {
								return value.fullname;
							}
						}
					}, {
						header : '受理时间',
						dataIndex : 'createTime',
						width : 120
					}, {
						header : '要求完成时间',
						dataIndex : 'needsTime',
						width : 120
					}, {
						header : '完成时间',
						dataIndex : 'finishTime',
						width : 120
					}, {
						header : '过期时长',
						dataIndex : 'residueTime',
						width : 120,
						renderer : function(value) {
							if (value != null) {
								// var resdue = Math.abs(value);
								var arr = value.split('天');
								if (arr[0] < 0 || arr[0] == '-0') {
									return "<font color='red'>" + value
											+ "</font>";
								} else {
									return "<font color='green'>" + value
											+ "</font>";
								}
							} else {
								return '无限制';
							}
						}
					}, {
						header : '当前节点',
						dataIndex : 'taskName',
						width : 80
					}, {
						header : '当前处理人',
						dataIndex : 'taskUserName',
						width : 80
					}, {
						header : '状态',
						dataIndex : 'runStatus',
						width : 60,
						renderer : function(value) {
							return PROCESSRUN_STATUS.get(value);
						}
					}, {
						hidden : true,
						dataIndex : 'executionId'
					}, {
						hidden : true,
						dataIndex : 'taskId'
					}, {
						hidden : 'true',
						dataIndex : 'isMultipleTask'
					}, {
						hidden : 'true',
						dataIndex : 'flowType'
					}, {
						hidden : 'true',
						dataIndex : 'flowPk'
					}, {
						hidden : 'true',
						dataIndex : 'runId'
					}, {
						header : '管理',
						dataIndex : 'taskdbid',
						width : 80,
						renderer : function(value, metadata, record, rowIndex,
								colIndex) {
							var taskId = record.data.taskId;
							var exeId = record.data.executionId;
							// var assignee=record.data.assignee;
							var assignee = record.data.taskUserName;
							// var activityName=record.data.activityName;
							var activityName = record.data.taskName;
							var isMultipleTask = record.data.isMultipleTask;
							var runId = record.data.runId;
							var flowPk = record.data.flowPk;
							var flowType = record.data.flowType;
							var fm = flowType.replace(/FlowView/, "FlowForm");
							var runStatus = record.data.runStatus;
							var str = '';
							str += '<button title="查看" class="btn-detail" onclick="ExpiredFlowManagerView.trackRs(\''
									+ flowPk
									+ '\',\''
									+ runId
									+ '\',\''
									+ fm
									+ '\')"></button>';
							if (runStatus != 2) {
								if (assignee == null) {
									str += '<button title="锁定任务" class="btn-lockTask" onclick="ExpiredFlowManagerView.lockTask('
											+ taskId + ')"></button>';
								} else {
									str += '<button title="处理任务" class="btn-approvalTask" onclick="ExpiredFlowManagerView.nextStep(\''
											+ taskId
											+ '\',\''
											+ activityName
											+ '\')"></button>';

									str += '&nbsp;<button title="代办" class="btn-changeTask" onclick="ExpiredFlowManagerView.changeTask('
											+ taskId
											+ ',\''
											+ activityName
											+ '\')"></button>';

									if (isMultipleTask == 1) {// 多人的任务，自己可以解锁由其他人来执行
										str += '&nbsp;<button title="解锁任务" class="btn-unlockTask" onclick="ExpiredFlowManagerView.unlockTask('
												+ taskId + ')"></button>';
									}
								}
							}
							return str;
						}
					}

			],
			defaults : {
				sortable : false,
				menuDisabled : true,
				width : 150
			}
		});

		this.gridPanel = new Ext.grid.GridPanel({
					id : 'ExpiredFlowGrid',
					region : 'center',
					store : this.store,
					shim : true,
					trackMouseOver : true,
					loadMask : true,
					viewConfig : {
						forceFit : true,
						showPreview : false
					},
					// tbar : new Ext.Toolbar({
					// items : [{
					// text : '刷新',
					// iconCls : 'btn-refresh',
					// scope : this,
					// handler : this.refresh
					// }, '-', {
					// text : '设置到期时间',
					// scope : this,
					// handler : this.setDueDate
					// },'-',{
					// text:'更改待办人',
					// scope:this,
					// handler:this.setHandler
					// },'-',{
					// text:'更改执行路径',
					// scope:this,
					// handler:this.setPath
					// },'-',{
					// text:'任务代办',
					// scope:this,
					// handler:this.handlerTask
					//											
					// }]
					// }),
					cm : cm,
					bbar : new HT.PagingBar({
								store : this.store
							})
				});

	},// end of initUIComponents
	search : function() {

		var taskName = this.searchPanel.getCmpByName('taskName');

		this.store.baseParams = {
			start : 0,
			limit : this.store.baseParams.limit,
			taskName : taskName.getValue()
		};
		this.store.reload();
	},
	refresh : function() {
		this.store.reload();
	},
	// 为任务设置过期时间
	setDueDate : function() {
		var taskGrid = Ext.getCmp('ExpiredFlowGrid');
		var rs = taskGrid.getSelectionModel().getSelections();
		if (rs.length == 0) {
			Ext.ux.Toast.msg('操作信息', '请选择任务记录!');
			return;
		}
		new TaskDueDateWindow().show();
	},
	// 为任务设置待办人
	setHandler : function() {
		var taskGrid = Ext.getCmp('ExpiredFlowGrid');
		var rs = taskGrid.getSelectionModel().getSelections();
		if (rs.length == 0) {
			Ext.ux.Toast.msg('操作信息', '请选择任务记录!');
			return;
		}
		new TaskHandlerWindow().show();
	},

	setPath : function() {
		var taskGrid = Ext.getCmp('ExpiredFlowGrid');
		var rs = taskGrid.getSelectionModel().getSelections();
		if (rs.length == 0) {
			Ext.ux.Toast.msg('操作信息', '请选择任务记录!');
			return;
		}
		new PathChangeWindow({
					taskId : rs[0].data.taskId,
					taskGrid : taskGrid
				}).show();
	},
	handlerTask : function() {
		var taskGrid = Ext.getCmp('ExpiredFlowGrid');
		var rs = taskGrid.getSelectionModel().getSelections();
		if (rs.length == 0) {
			Ext.ux.Toast.msg('操作信息', '请选择任务记录!');
			return;
		}
		if (rs.length > 1) {
			Ext.ux.Toast.msg('操作信息', '只能选择一条任务记录!');
			return;
		}
		var record = rs[0];
		var contentPanel = App.getContentPanel();
		var formView = contentPanel.getItem('ProcessNextForm'
				+ record.data.taskId);
		if (formView == null) {
			formView = new ProcessNextForm({
						taskId : record.data.taskId,
						activityName : record.data.activityName
					});
			contentPanel.add(formView);
		}
		contentPanel.activate(formView);
	}

});

/**
 * 锁定任务，则表示申请执行该任务
 * 
 * @param {}
 *            taskdbid
 */
ExpiredFlowManagerView.lockTask = function(taskId) {
	Ext.Ajax.request({
				url : __ctxPath + '/flow/lockTask.do',
				params : {
					taskId : taskId
				},
				method : 'post',
				success : function(result, response) {
					var grid = Ext.getCmp("ExpiredFlowGrid");
					var resultObj = Ext.util.JSON.decode(result.responseText)
					if (resultObj.hasAssigned == true) {
						Ext.ux.Toast.msg("操作提示", "该任务已经被其他用户锁定执行！");
					} else {
						Ext.ux.Toast.msg("操作提示", "该任务已经成功锁定，请执行下一步操作！");
					}
					grid.getStore().reload();
				}
			});
};

/**
 * 任务变更，则转由代办人来处理
 * 
 * @param {}
 *            taskId
 */
ExpiredFlowManagerView.changeTask = function(taskId, taskname) {
	var isOk = true;
	grid = 'ExpiredFlowGrid';
	new ChangeTaskView(taskId, taskname, grid, isOk);
};

/**
 * 锁定任务，则表示自己退出执行该任务，其他人员可以申请执行该任务
 * 
 * @param {}
 *            taskdbid
 */
ExpiredFlowManagerView.unlockTask = function(taskId) {
	Ext.Ajax.request({
				url : __ctxPath + '/flow/unlockTask.do',
				params : {
					taskId : taskId
				},
				method : 'post',
				success : function(result, response) {
					var grid = Ext.getCmp("ExpiredFlowGrid");
					var resultObj = Ext.util.JSON.decode(result.responseText)

					if (resultObj.unlocked == true) {
						Ext.ux.Toast.msg("操作提示", "该任务已经成功解锁！");
					} else {
						Ext.ux.Toast.msg("操作提示", "该任务解锁失败(任务已经由其他人员执行完成)！");
					}
					grid.getStore().reload();
				}
			});
};
/**
 * 下一步的任务
 * 
 * @param {}
 *            taskdbid
 */
ExpiredFlowManagerView.nextStep = function(taskId, activityName) {
	var contentPanel = App.getContentPanel();
	var formView = contentPanel.getItem('ProcessNextForm' + taskId);
	if (formView == null) {
		formView = new ProcessNextForm({
					taskId : taskId,
					activityName : activityName,
					flowGrid : 'ExpiredFlowGrid'
				});
		contentPanel.add(formView);
	}
	contentPanel.activate(formView);
};

ExpiredFlowManagerView.trackRs = function(flowPk, runId, fm) {
	var tabs = Ext.getCmp('centerTabPanel');
	var edit = tabs.getItem(fm);

	if (edit != null) {
		tabs.remove(fm.toString());
	}
	var view = eval(fm);
	edit = new view({
				id : flowPk,
				runId : runId
			});
	tabs.add(edit);
	tabs.activate(edit);
};
