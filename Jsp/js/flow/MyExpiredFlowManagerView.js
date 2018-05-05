MyExpiredFlowManagerView = Ext.extend(Ext.Panel, {
	constructor : function(conf) {
		Ext.applyIf(this, conf);
		this.initUIComponents();
		MyExpiredFlowManagerView.superclass.constructor.call(this, {
					id : 'MyExpiredFlowManagerView',
					title : '我的过期工单',
					iconCls : 'menu-task-manage',
					layout : 'border',
					items : [this.searchPanel, this.gridPanel]
				});
	},
	initUIComponents : function() {
		this.searchPanel = new HT.SearchPanel({
					layout : 'hbox',
					region : 'north',
					id : 'MyExpiredFlowManagerSearchForm',
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
								text : "受理人"
							}, {
								name : 'creater',
								xtype : 'textfield'
							}, {
								xtype : 'button',
								text : __search,
								iconCls : 'search',
								scope : this,
								handler : function() {
									var searchPanel = Ext
											.getCmp('MyExpiredFlowManagerSearchForm');
									var gridPanel = Ext
											.getCmp('MyExpiredFlowGrid');
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
											.getCmp('MyExpiredFlowManagerSearchForm');
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
						runStatus : '0,1',
						taskUser : curUserInfo.userId
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
			columns : [
					// sm,new Ext.grid.RowNumberer(), {
					// header : "taskId",
					// dataIndex : 'taskId',
					// hidden:true
					// }, {
					// header : '任务名称',
					// dataIndex : 'taskName',
					// width:350
					// }, {
					// header : '执行人',
					// dataIndex : 'assignee',
					// renderer : function(value, metadata, record,
					// rowIndex, colIndex) {
					// var assignee = record.data.assignee;
					// if (assignee == null || assignee == '') {
					// return '<font color="red">暂无执行人</font>';
					// } else {
					// return assignee;
					// }
					// },
					// width:100
					// }, {
					// header : '开始时间',
					// dataIndex : 'createTime',
					// width : 150
					// }, {
					// header : '到期时间',
					// dataIndex : 'dueDate',
					// width : 150,
					// renderer : function(value) {
					// if (value == '') {
					// return '无限制';
					// } else {
					// return value;
					// }
					// }
					// }
					// , {
					// header : '管理',
					// dataIndex : 'taskdbid',
					// width : 80,
					// renderer : function(value, metadata, record,rowIndex,
					// colIndex) {
					// var defId = record.data.defId;
					// var name = record.data.name;
					// var deployId = record.data.deployId;
					// var drawDefXml=record.data.drawDefXml;
					// var str = '';
					// if (deployId != null) {
					// str += '&nbsp;<button title="查看" class="btn-preview"
					// onclick="ExpiredProDefinitionView.view('
					// + defId + ',\'' + name + '\')"></button>';
					// str += '&nbsp;<button title="新建流程" class="btn-newFlow"
					// onclick="ExpiredProDefinitionView.newFlow('
					// + '' + defId + ',\'' + name + '\')"></button>';
					// }
					// return str;
					// }
					// }
					new Ext.grid.RowNumberer(), {
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
						header : '完成时间',
						dataIndex : 'finishTime',
						width : 120
					}, {
						header : '要求完成时间',
						dataIndex : 'needsTime',
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
						hidden : true,
						dataIndex : 'taskUserName',
						width : 80
					}, {
						header : '状态',
						dataIndex : 'runStatus',
						width : 60,
						renderer : function(value) {
							return PROCESSRUN_STATUS.get(value);
						}
					},
					// {
					// header : '工单类型',
					// dataIndex : 'taskType',
					// width:150
					// },{
					// header:'执行人',
					// dataIndex:'assignee',
					// width:140,
					// renderer:function(value,metadata,record,rowIndex,colIndex){
					// var assignee=record.data.assignee;
					// if(assignee==null || assignee==''){
					// return '<font color="red">暂无执行人</font>';
					// }else{
					// return assignee;
					// }
					// }
					// },{
					// header:'开始时间',
					// dataIndex:'createTime',
					// width:100
					// },{
					// header:'到期时间',
					// dataIndex:'dueDate',
					// width:100,
					// renderer:function(value){
					// if(value==''){
					// return '无限制';
					// }else{
					// return value;
					// }
					// }
					// },
					{
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
							str += '<button title="查看" class="btn-detail" onclick="MyExpiredFlowManagerView.trackRs(\''
									+ flowPk
									+ '\',\''
									+ runId
									+ '\',\''
									+ fm
									+ '\')"></button>';
							if (assignee == null) {
								str += '<button title="锁定任务" class="btn-lockTask" onclick="MyExpiredFlowManagerView.lockTask('
										+ taskId + ')"></button>';
							} else {
								str += '<button title="处理任务" class="btn-approvalTask" onclick="MyExpiredFlowManagerView.nextStep(\''
										+ taskId
										+ '\',\''
										+ activityName
										+ '\')"></button>';

								str += '&nbsp;<button title="代办" class="btn-changeTask" onclick="MyExpiredFlowManagerView.changeTask('
										+ taskId
										+ ',\''
										+ activityName
										+ '\')"></button>';

								if (isMultipleTask == 1) {// 多人的任务，自己可以解锁由其他人来执行
									str += '&nbsp;<button title="解锁任务" class="btn-unlockTask" onclick="MyExpiredFlowManagerView.unlockTask('
											+ taskId + ')"></button>';
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
					id : 'MyExpiredFlowGrid',
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
		var taskGrid = Ext.getCmp('MyExpiredFlowGrid');
		var rs = taskGrid.getSelectionModel().getSelections();
		if (rs.length == 0) {
			Ext.ux.Toast.msg('操作信息', '请选择任务记录!');
			return;
		}
		new TaskDueDateWindow().show();
	},
	// 为任务设置待办人
	setHandler : function() {
		var taskGrid = Ext.getCmp('MyExpiredFlowGrid');
		var rs = taskGrid.getSelectionModel().getSelections();
		if (rs.length == 0) {
			Ext.ux.Toast.msg('操作信息', '请选择任务记录!');
			return;
		}
		new TaskHandlerWindow().show();
	},

	setPath : function() {
		var taskGrid = Ext.getCmp('MyExpiredFlowGrid');
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
		var taskGrid = Ext.getCmp('MyExpiredFlowGrid');
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
MyExpiredFlowManagerView.lockTask = function(taskId) {
	Ext.Ajax.request({
				url : __ctxPath + '/flow/lockTask.do',
				params : {
					taskId : taskId
				},
				method : 'post',
				success : function(result, response) {
					var grid = Ext.getCmp("MyExpiredFlowGrid");
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
MyExpiredFlowManagerView.changeTask = function(taskId, taskname) {
	var isOk = true;
	grid = 'MyExpiredFlowGrid';
	new ChangeTaskView(taskId, taskname, grid, isOk);
};

/**
 * 锁定任务，则表示自己退出执行该任务，其他人员可以申请执行该任务
 * 
 * @param {}
 *            taskdbid
 */
MyExpiredFlowManagerView.unlockTask = function(taskId) {
	Ext.Ajax.request({
				url : __ctxPath + '/flow/unlockTask.do',
				params : {
					taskId : taskId
				},
				method : 'post',
				success : function(result, response) {
					var grid = Ext.getCmp("MyExpiredFlowGrid");
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
MyExpiredFlowManagerView.nextStep = function(taskId, activityName) {
	var contentPanel = App.getContentPanel();
	var formView = contentPanel.getItem('ProcessNextForm' + taskId);
	if (formView == null) {
		formView = new ProcessNextForm({
					taskId : taskId,
					activityName : activityName,
					flowGrid : 'MyExpiredFlowGrid'
				});
		contentPanel.add(formView);
	}
	contentPanel.activate(formView);
};

MyExpiredFlowManagerView.trackRs = function(flowPk, runId, fm) {
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
