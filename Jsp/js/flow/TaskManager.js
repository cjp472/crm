TaskManager = Ext.extend(Ext.Panel, {
	constructor : function(conf) {
		Ext.applyIf(this, conf);
		this.initUIComponents();
		TaskManager.superclass.constructor.call(this, {
					id : 'TaskManager',
					title : '流程任务管理',
					iconCls : 'menu-task-manage',
					layout : 'border',
					items : [this.searchPanel, this.gridPanel]
				});
	},
	initUIComponents : function() {
		this.searchPanel = new Ext.form.FormPanel({
					layout : 'hbox',
					region : 'north',
					// colNums : 3,
					height : 35,
					items : [{
								text : "流程名"// __ukKnowApproveApproveTitle
							}, {
								name : 'proDefinitionName',
								xtype : 'textfield'
							}, {
								text : "执行人"
							}, {
										id : 'task.taskUserName',
										xtype : 'textfield',
										listeners : {
											'focus' : function(pp) {
												var userId = Ext.getCmp('tak.taskUser')
														.getValue();
												UserSelector.getView(
													function(userId, fullname) {
																	Ext.getCmp('tak.taskUser').setValue(userId);
																	Ext.getCmp('task.taskUserName').setValue(fullname);
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
								handler : this.search
							}, {
								xtype : 'button',
								text : __reset,
								scope : this,
								iconCls : 'btn-reset',
								handler : this.reset
							}, {
								xtype : 'button',
								text : __advancedSearch,
								iconCls : 'search',
								scope : this,
								handler : function() {
									new UkKnowApproveAdvancedSearchWin().show()
								}
							},{
										name : 'taskUser',
										id : 'tak.taskUser',
										xtype : 'hidden'}],
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
				});

		this.store = new Ext.data.JsonStore({
					baseParams : {
						start : 0,
						limit : 25
					},
					url : __ctxPath + '/flow/taskListTask.do',
					root : 'result',
					totalProperty : 'totalCounts',
					fields : [{
								name : 'runId',
								type : 'int'
							}, 'flowPk', 'flowType', 'creater', 'piId',
							'taskUser', 'taskName', 'dueDate', 'busType',
							'busClasses', 'createTime', 'acceptanceTime',
							'taskId', 'runStatus', 'needsTime', 'finishTime',
							'taskUserName', 'applyName', 'applyTime', 'defId',
							'defName']
				});
		this.store.load();
		var sm = new Ext.grid.CheckboxSelectionModel({
					singleSelect : false
				});
		var cm = new Ext.grid.ColumnModel({
			columns : [sm, new Ext.grid.RowNumberer(), {
						header : "taskId",
						dataIndex : 'taskId',
						hidden : true
					}, {
						header : "defName",
						dataIndex : 'defName',
						hidden : true
					}, {
						header : "flowPk",
						dataIndex : 'flowPk',
						hidden : true
					}, {
						header : '流程名',
						dataIndex : 'defName'
					}, {
						header : '流程实例编号',
						dataIndex : 'runId'
					}, {
						header : '任务名',
						dataIndex : 'taskName',
						width : 350,
						renderer : function(value, metadata, record, rowIndex,
								colIndex) {
							var defName = record.data.defName;
							var flowPk = record.data.flowPk;
							var val = '';
							if (value == null) {
								value = '流程结束';
							}
							return defName + '-' + value + '-' + flowPk;
						}
					}, {
						header : '执行人',
						dataIndex : 'taskUserName',
						width : 80
					}, {
						header : '开始时间',
						dataIndex : 'createTime',
						width : 200
					}, {
						header : '要求完成时间',
						dataIndex : 'dueDate',
						width : 200
					}, {
						header : '结束时间',
						dataIndex : 'finishTime',
						width : 200
					}, {
						header : '耗时(秒)',
						hidden : true,
						dataIndex : 'piId'
					}, {
						header : '状态',
						width : 100,
						dataIndex : 'runStatus',
						renderer : function(value) {
							return PROCESSRUN_STATUS.get(value);
						}
					}, {
						header : '处理结果',
						dataIndex : 'assignee',
						hidden : true
					}, {
						header : '管理',
						dataIndex : 'taskdbid',
						width : 100,
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
							str += '<button title="查看" class="btn-detail" onclick="TaskManager.trackRs(\''
									+ flowPk
									+ '\',\''
									+ runId
									+ '\',\''
									+ fm
									+ '\')"></button>';
							if (runStatus != 2) {
								if (assignee == null) {
									str += '<button title="锁定任务" class="btn-lockTask" onclick="TaskManager.lockTask('
											+ taskId + ')"></button>';
								} else {
									str += '<button title="处理任务" class="btn-approvalTask" onclick="TaskManager.nextStep(\''
											+ taskId
											+ '\',\''
											+ activityName
											+ '\')"></button>';

									str += '&nbsp;<button title="代办" class="btn-changeTask" onclick="TaskManager.changeTask('
											+ taskId
											+ ',\''
											+ activityName
											+ '\')"></button>';

									if (isMultipleTask == 1) {// 多人的任务，自己可以解锁由其他人来执行
										str += '&nbsp;<button title="解锁任务" class="btn-unlockTask" onclick="TaskManager.unlockTask('
												+ taskId + ')"></button>';
									}
								}
							}
							return str;
						}
					}],
			defaults : {
				sortable : false,
				menuDisabled : true,
				width : 150
			}
		});

		this.gridPanel = new Ext.grid.GridPanel({
					id : 'allTaskGrid',
					region : 'center',
					store : this.store,
					shim : true,
					viewConfig : {
						forceFit : true
					},
					trackMouseOver : true,
					loadMask : true,
					tbar : new Ext.Toolbar({
								items : [
										'->'
										// , {
										// text : '刷新',
										// iconCls : 'btn-refresh',
										// scope : this,
										// handler : this.refresh
										// }, {
										// iconCls : 'control_pause',
										// text : '暂停',
										// xtype : 'button',
										// scope : this,
										// handler : this.refreshRs
										// }, {
										// iconCls : 'btn-confApply-no',
										// text : '恢复',
										// xtype : 'button',
										// scope : this,
										// handler : this.refreshRs
										// }, {
										// iconCls : 'btn-system-config',
										// text : '设置优先级',
										// xtype : 'button',
										// scope : this,
										// handler : this.refreshRs
										// }
										, {
											iconCls : 'menu-diary',
											text : '设置到期时间',
											scope : this,
											handler : this.setDueDate
										}, {
											iconCls : 'menu-appointment',
											text : '更改待办人',
											scope : this,
											handler : this.setHandler
										}, {
											iconCls : 'control_stop',
											text : '强制结束',
											xtype : 'button',
											scope : this,
											handler : this.closeIns
										}
								// , {
								// iconCls : 'btn-mail_back',
								// text : '重启',
								// xtype : 'button',
								// scope : this,
								// handler : this.detailRsM
								// }
								// '-', {
								// text : '更改执行路径',
								// scope : this,
								// handler : this.setPath
								// }, '-', {
								// text : '任务代办',
								// scope : this,
								// handler : this.handlerTask
								//
								// }
								]
							}),
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
		var taskGrid = Ext.getCmp('allTaskGrid');
		var rs = taskGrid.getSelectionModel().getSelections();
		if (rs.length == 0) {
			Ext.ux.Toast.msg('操作信息', '请选择任务记录!');
			return;
		}
		new TaskDueDateWindow().show();
	},
	// 为任务设置待办人
	setHandler : function() {
		var taskGrid = Ext.getCmp('allTaskGrid');
		var rs = taskGrid.getSelectionModel().getSelections();
		if (rs.length == 0) {
			Ext.ux.Toast.msg('操作信息', '请选择任务记录!');
			return;
		}
		new TaskHandlerWindow().show();
	},
	// 重置查询表单
			reset : function() {
				this.searchPanel.getForm().reset();
			},
			// 按条件搜索
			search : function() {
				$search({
							searchPanel : this.searchPanel,
							gridPanel : this.gridPanel
						});
			},
	closeIns : function() {
		var gridPanel = this.gridPanel;
		var ids = $getGdSelectedIds(gridPanel, 'runId');
		if (ids.length == 0) {
			Ext.ux.Toast.msg('操作信息', '请选择记录！');
			return;
		}
		var strIds = '';
		for (var i = 0; i < ids.length; i++) {
			if (strIds != '') {
				strIds += ',';
			}
			strIds += ids[i];
		}
		Ext.Msg.confirm('信息确认', '您确认要结束所选实例吗？', function(btn) {
					if (btn == 'yes') {
						Ext.Ajax.request({
									url : __ctxPath + '/flow/endProcessRun.do',
									params : {
										runIds : strIds
									},
									method : 'post',
									success : function(resp, op) {
										var res = Ext.util.JSON
												.decode(resp.responseText);
										if (res.success) {
											Ext.ux.Toast.msg('信息提示', '成功结束实例！');
											gridPanel.getStore().reload();
										} else {
											Ext.ux.Toast.msg('信息提示',
													'出错，请联系管理员！');
											gridPanel.getStore().reload();
										}
									},
									failure : function() {
										Ext.ux.Toast.msg('信息提示', '出错，请联系管理员！');
										gridPanel.getStore().reload();
									}

								});
					}
				});
	},
	setPath : function() {
		var taskGrid = Ext.getCmp('allTaskGrid');
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
		var taskGrid = Ext.getCmp('allTaskGrid');
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
TaskManager.lockTask = function(taskId) {
	Ext.Ajax.request({
				url : __ctxPath + '/flow/lockTask.do',
				params : {
					taskId : taskId
				},
				method : 'post',
				success : function(result, response) {
					var grid = Ext.getCmp("allTaskGrid");
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
TaskManager.changeTask = function(taskId, taskname) {
	var isOk = true;
	grid = 'allTaskGrid';
	new ChangeTaskView(taskId, taskname, grid, isOk);
};

/**
 * 锁定任务，则表示自己退出执行该任务，其他人员可以申请执行该任务
 * 
 * @param {}
 *            taskdbid
 */
TaskManager.unlockTask = function(taskId) {
	Ext.Ajax.request({
				url : __ctxPath + '/flow/unlockTask.do',
				params : {
					taskId : taskId
				},
				method : 'post',
				success : function(result, response) {
					var grid = Ext.getCmp("allTaskGrid");
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
TaskManager.nextStep = function(taskId, activityName) {
	var contentPanel = App.getContentPanel();
	var formView = contentPanel.getItem('ProcessNextForm' + taskId);
	if (formView == null) {
		formView = new ProcessNextForm({
					taskId : taskId,
					activityName : activityName
				});
		contentPanel.add(formView);
	}
	contentPanel.activate(formView);
};
/**
 * 审批跟踪
 * 
 * @param {}
 *            flowPk
 * @param {}
 *            runId
 * @param {}
 *            fm
 */

TaskManager.trackRs = function(flowPk, runId, fm) {
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
