UkKnowApplyView = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		UkKnowApplyView.superclass.constructor.call(this, {
					id : 'UkKnowApplyViewWin',
					title : '知识采集申请管理',
					region : 'center',
					layout : 'border',
					items : [this.searchPanel, this.gridPanel]
				});
	},// end of constructor
	// 初始化组件

	initUIComponents : function() {
		var fieldnameComboData = []
		var UkKnowApplyAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : '高级查询',
					fieldData : fieldnameComboData
				});
		// 初始化搜索条件Panel
		this.searchPanel = new Ext.FormPanel({
					layout : 'hbox',
					region : 'north',
					id : 'UkKnowApplySearchPanel',
					height : 35,
					items : [{
								text : '采集类型'
							}, {
								hiddenName : 'Q_applyType_L_EQ',
								xtype : 'mtdiccombo',
								mode : 'local',
								editable : false,
								triggerAction : 'all',
                                itemKey : 'KNOW_CJLX',
								valueField : 'myId',
								displayField : 'displayText'
							}, {
								text : '申请人'
							}, {
								name : 'Q_applyUser.fullname_S_LK',
								xtype : 'textfield'
							},
							{
								text : '状态'
							}, {
								hiddenName : 'Q_approvalStatus_S_EQ',
								xtype : 'combo',
								mode : 'local',
								editable : false,
								triggerAction : 'all',
								store : new Ext.data.ArrayStore({
											fields : ['myId', 'displayText'],
											data : [['审批完毕', '审批完毕'],
													['审批中', '审批中']]
										}),
								valueField : 'myId',
								displayField : 'displayText'
								// }, {
								// text : __ukKnowApplyApplyUserid
								// }, {
								// xtype : 'textfield',
								// id : 'chkName',
								// listeners: {
								// focus: function() {
								// UserSelector.getView(function(id, name){
								// Ext.getCmp('chkName').setValue(name);
								// Ext.getCmp('chkId').setValue(id);
								// }, true,false).show();
								// }
								// }
							}, {
								xtype : 'button',
								text : __search,
								iconCls : 'search',
								scope : this,
								handler : this.onSearch
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
									new UkKnowApplyAdvancedSearchWin().show()
								}
								// },{
							// name : 'Q_applyUser.userId_L_EQ',
							// xtype : 'hidden',
							// id : 'chkId'
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
		var defID = this.defId;
		this.topbar = new Ext.Toolbar({
					items : ['->', {
								iconCls : 'btn-flow-design',
								text : '申请',
								scope : this,
								handler : this.newFlow
							}, {
								iconCls : 'menu-arch-undertake',
								text : '领用',
								scope : this,
								handler : function() {
									var rs = Ext.getCmp('UkKnowApplyGrid').getSelectionModel().getSelections();
									var taskIds='';
									var Tmsg = '';
									if (rs.length == 0) {
										Ext.ux.Toast.msg('操作信息', '请选择单据!');
										return;
									}
									for(var i=0;i<rs.length;i++){
										var tasks = rs[i].data.tasks;
										if (tasks.length > 0) {
											for (var i = 0; i < tasks.length; i++) {
												if (tasks[i].userId == '') {
													if(i>0)taskIds+=',';
													taskIds+=tasks[i].taskId;
												}else{
													Tmsg = '对不起,选中的单据中有无法领用的单据,请重新选择!';
												}
											}
										}else{
												Tmsg = '对不起,选中的单据中有无法领用的单据,请重新选择!';
										}
										
									}
									if(Tmsg!=''){
										Ext.ux.Toast.msg(__actioninfo, Tmsg);
										return;
									}else{
										Ext.Ajax.request({
											url:__ctxPath+'/flow/locksTask.do',
											params:{
												taskIds:taskIds
											},
											method:'post',
											success:function(result,response){
												var grid=Ext.getCmp("UkKnowApplyGrid");
												var resultObj=Ext.util.JSON.decode(result.responseText)
												if(resultObj.hasAssigned==true){
													Ext.ux.Toast.msg("操作提示",resultObj.msg);
												}else{
													Ext.ux.Toast.msg("操作提示","该任务已经成功锁定，请执行下一步操作！");
												}
												grid.getStore().reload();
											}
										});
									}
									
									
								}
							}, {
								iconCls : 'btn-mail_move',
								text : '转移',
								scope : this,
								handler : function() {
											var taskGrid = Ext.getCmp('UkKnowApplyGrid');
											var rs = taskGrid.getSelectionModel().getSelections();
											var Tmsg = '';
											if (rs.length == 0) {
												Ext.ux.Toast.msg('操作信息', '请选择任务记录!');
												return;
											}else{
												for(var i=0;i<rs.length;i++){
												var tasks = rs[i].data.tasks;
												if (tasks.length > 0) {
													for (var i = 0; i < tasks.length; i++) {
														if (curUserInfo.userId == tasks[i].userId) {
															new TaskChargeWindow({grid : 'UkKnowApplyGrid',hasTask : 'false'}).show();
														}else{
																Tmsg = '对不起,您只能操作自己的单据!';
														}
													}
													}
												}
												if(Tmsg!=''){
												Ext.ux.Toast.msg('操作信息',Tmsg);
												return;
												}
											}
											
											
										}
							}]
				});

		this.gridPanel = new HT.GridPanel({
			region : 'center',
			tbar : this.topbar,
			// 使用RowActions
			rowActions : true,
			printable : false,
			exportable : false,
			id : 'UkKnowApplyGrid',
			url : __ctxPath + "/know/listFlowUkKnowApply.do",
			baseParams : {
				flowType : 'UkKnowApplyFlowView'// 流程类型key
			},
			fields : [{
						name : 'applyId',
						type : 'int'
					}, 'applyUserid', 'applyTime', 'applyTitle',
					'applyDescribe', 'applyContent', 'applyComment',
					'requireTime', 'holdTime', 'busiType', 'applyType',
					'applyStatus', 'runid', 'createBy', 'updateBy',
					'createDate', 'updateDate', 'approvalStatus', 'tasks',
					'runid', 'nodeName', 'piId', 'applyUser'],
			columns : [{
						header : __ukKnowApplyApplyId,
						dataIndex : 'applyId',
						hidden : true
					}, {
						header : '采集类型   ',// 标题 采集类型 申请人 申请时间 要求完成时间 当前节点 负责人
											// 处理状态 子状态 管理
						isExp : false,
						width : 100,
						dataIndex : 'applyType',
                        renderer : function(value) {
                            return KNOW_CJLX.get(value);
                        }
					}, {
						header : '申请人',// 业务类别
						isExp : false,
						dataIndex : 'applyUser',
                        renderer : function(value) {
                            return value.fullname;
                        }
					}, {
						header : '申请时间', // 事项
						isExp : false,
						dataIndex : 'applyTime'
//						renderer : function(value) {
//							if (value == 1) {
//								return '新增';
//							} else if (value == 2) {
//								return '合并';
//							} else if (value == 3) {
//								return '拆分';
//							} else if (value == 4) {
//								return '注销';
//							} else {
//								return '';
//							}
//						}
					}, {
						header : '要求完成时间',// 备注
						isExp : false,
						dataIndex : 'requireTime'
					}, {
						header : '当前节点 ',// 说明
						isExp : false,
						dataIndex : 'tasks',
						renderer : function(tasks, metadata, record, rowIndex,
								colIndex) {
							var reVal = '';
							if (tasks != undefined && tasks.length > 0) {
								reVal += tasks[0].taskName;
//								if (tasks[0].userId) {
//									reVal += '(';
//								}
//								for (var i = 0; i < tasks.length; i++) {
//									if (tasks[i].userId) {
//										reVal += tasks[i].fullname;
//										if (i == 0 && tasks.length > 1
//												|| i < tasks.length - 1) {
//											reVal += ',';
//										}
//									} else {
//										reVal += '(<font color="red">';
//										reVal += '无';
//										reVal += '</font>)&nbsp;&nbsp;';
//									}
//								}
//								if (tasks[0].userId) {
//									reVal += ')&nbsp;&nbsp;';
//								}
							} else {
								reVal = "流程结束";
							}
							return reVal;
						}
					}, {
						header : ' 负责人 ',// 申请人
						isExp : false,
						dataIndex : 'tasks',
						renderer : function(tasks, metadata, record, rowIndex,
								colIndex) {
							var reVal = '';
							if (tasks != undefined && tasks.length > 0) {
								for (var i = 0; i < tasks.length; i++) {
									if (tasks[i].userId) {
										reVal += tasks[i].fullname;
										if (i == 0 && tasks.length > 1
												|| i < tasks.length - 1) {
											reVal += ',';
										}
									} else {
										reVal += '(<font color="red">';
										reVal += '无';
										reVal += '</font>)&nbsp;&nbsp;';
									}
								}
							} else {
								reVal = "无";
							}
							return reVal;
						}
					}, {
						header : __ukKnowApplyApplyTime,// 申请时间
						isExp : false,
						hidden : true,
						dataIndex : 'applyTime'
					}
//					, {
//						header : '处理状态 ',// 要求完成时间
//						isExp : false,
//						dataIndex : 'tasks',
//						renderer : function(value) {
////							return value[value.length - 1].fullname;
//						}
//					}
					, {
						header : "子状态",// __allApprovalStatus
						dataIndex : 'approvalStatus'

					}, {
						header : '当前任务',// __allApprovalInfo 流程审批信息
						dataIndex : 'tasks',
						width : 200,
						hidden : true,
						renderer : function(tasks, metadata, record, rowIndex,
								colIndex) {
							var reVal = '';
							if (tasks != undefined && tasks.length > 0) {
								reVal += tasks[0].taskName;
								if (tasks[0].userId) {
									reVal += '(';
								}
								for (var i = 0; i < tasks.length; i++) {
									if (tasks[i].userId) {
										reVal += tasks[i].fullname;
										if (i == 0 && tasks.length > 1
												|| i < tasks.length - 1) {
											reVal += ',';
										}
									} else {
										reVal += '(<font color="red">';
										reVal += '无';
										reVal += '</font>)&nbsp;&nbsp;';
									}
								}
								if (tasks[0].userId) {
									reVal += ')&nbsp;&nbsp;';
								}
							} else {
								reVal = "流程结束";
							}
							return reVal;
						}
					}, new Ext.ux.grid.RowActions({
						header : __action,
						width : 80,
						actions : [{
							iconCls : 'btn-ok',
							qtip : '处理',
							style : 'margin:0 3px 0 3px',
							fn : function(record) {
								var tasks = record.get('tasks');
								if (tasks.length > 0) {
									for (var i = 0; i < tasks.length; i++) {
										if (curUserInfo.userId == tasks[i].userId) {
											return true;
										}
									}
								}
							}
						}, {
							iconCls : 'btn-lockTask',
							qtip : '领用',
							style : 'margin:0 3px 0 3px',
							fn : function(record) {
								var tasks = record.get('tasks');
								if (tasks.length > 0) {
									for (var i = 0; i < tasks.length; i++) {
										if (tasks[i].userId == '') {
											return true;
										}
									}
								}

							}
						}, {
							iconCls : 'btn-operation',
							qtip : '查看',
							style : 'margin:0 3px 0 3px'
						}, {
							iconCls : 'btn-fabu',
							qtip : '采集',
							style : 'margin:0 3px 0 3px',
							fn : function(record) {
								var node = record.get('nodeName');
								var tasks = record.get('tasks');
								if (node == '知识采集' && tasks.length > 0) {
									for (var i = 0; i < tasks.length; i++) {
										if (curUserInfo.userId == tasks[i].userId) {
											return true;
										}
									}
								}
							}
						}],
						listeners : {
							scope : this,
							'action' : this.onRowAction
						}
					})]
				// end of columns
		});

		this.gridPanel.addListener('rowdblclick', this.rowClick);

	},// end of the initComponents()
	// 重置查询表单
	reset : function() {
		this.searchPanel.getForm().reset();
	},
	// 按条件搜索
	onSearch : function(obj) {
		$search({
					searchPanel : this.searchPanel,
					gridPanel : this.gridPanel
				});
	},
	// GridPanel行点击处理事件
	rowClick : function(grid, rowindex, e) {
		grid.getSelectionModel().each(function(rec) {
					new UkKnowApplyForm({
								applyId : rec.data.applyId
							}).show();
				});
	},
	// 创建记录
	createRs : function() {
		// new UkKnowApplyForm().show();
		var tabs = Ext.getCmp('centerTabPanel');
		var aForm = Ext.getCmp('UkKnowApplyForm');
		if (aForm != null) {
			tabs.remove('UkKnowApplyForm');
		}
		aForm = new UkKnowApplyForm();
		tabs.add(aForm);
		tabs.activate(aForm);

	},
	// 按ID删除记录
	removeRs : function(id) {
		$postDel({
					url : __ctxPath + '/know/multiDelUkKnowApply.do',
					ids : id,
					grid : this.gridPanel
				});
	},
	// 把选中ID删除
	removeSelRs : function() {
		$delGridRs({
					url : __ctxPath + '/know/multiDelUkKnowApply.do',
					grid : this.gridPanel,
					idName : 'applyId'
				});
	},

	newFlow_zh : function(record) {
		var tasks = record.get('tasks');
		var contentPanel = App.getContentPanel();
		var nextForm = contentPanel.getItem('ProcessNextForm');
		if (tasks.length > 0) {// 其实，只有length>0,才可能到这个函数中
			for (var i = 0; i < tasks.length; i++) {
				if (tasks[i].userId) {
					if (curUserInfo.userId == tasks[i].userId) {
						if (!nextForm) {
							nextForm = new ProcessNextForm({
										taskId : tasks[i].taskId,
										activityName : tasks[i].taskName,
										gridPanel : this.gridPanel
									});
							contentPanel.add(nextForm);
						}
					}
				}
			}
		}

		contentPanel.activate(nextForm);
	},

	newFlows : function(record) {
		var runid = record.data.runid;
		var nodeName = record.data.nodeName;
		Ext.Ajax.request({
			url : __ctxPath + '/core/getTaskFlowResult.do',
			// async : true,
			scope : this,
			params : {
				'runid' : runid
			},
			method : 'post',
			success : function(response) {
				var result = Ext.util.JSON.decode(response.responseText);
				var revalue = result.data.piId;
				var tasks = result.data.tasks;
				var contentPanel = App.getContentPanel();
				var nextForm = contentPanel.getItem('ProcessNextForm');
				if (tasks.length > 0 && revalue != 'undefined') {
					for (var i = 0; i < tasks.length; i++) {
						if (tasks[i].userId) {
							if (curUserInfo.userId == tasks[i].userId) {
								if (tasks[i].taskName == '驳回') {
									if (!nextForm) {
										nextForm = new ProcessNextForm({
													taskId : tasks[i].taskId,
													activityName : tasks[i].taskName,
													gridPanel : this.gridPanel
												});
										contentPanel.add(nextForm);
									}
								}
							}
						}
					}
				}
				contentPanel.activate(nextForm);
			}
		});
		// App.newFlow(10160, '驳回', record.data.applyId).show();

	},
	newFlow : function(record) {
		 defId = '10160';
		 name = '知识采集申请';
		 var contentPanel = App.getContentPanel();
		 var startForm = contentPanel.getItem('ProcessRunStart' + defId);
		
		 if (!startForm) {
		 startForm = new ProcessRunStart({
		 id : 'ProcessRunStart' + defId,
		 defId : defId,
		 flowName : name,
		 gridPanel : this.gridPanel
		 });
		 contentPanel.add(startForm);
		 }
		 contentPanel.activate(startForm);
		 //UkKnowApplyNewForm
//		var tabs = Ext.getCmp('centerTabPanel');
//		var edit = tabs.getItem('UkKnowApplyNewFormWin');
//
//		if (edit != null) {
//			tabs.remove('UkKnowApplyNewFormWin');
//		}
//		edit = new UkKnowApplyNewForm({
//
//		});
//		tabs.add(edit);
//		tabs.activate(edit);
	},
	// 编辑Rs
	editRs : function(record) {
		var tabs = Ext.getCmp('centerTabPanel');
		var edit = tabs.getItem('UkKnowApplyForm');

		if (edit != null) {
			tabs.remove('UkKnowApplyForm');
		}
		edit = new UkKnowApplyForm({
					applyId : record.data.applyId
				});
		tabs.add(edit);
		tabs.activate(edit);
	},
	// 知识采集
	knowCollect : function(record) {
		var tabs = Ext.getCmp('centerTabPanel');
		var edit = tabs.getItem('UkKnowApplyCollectFlowFormWin');

		if (edit != null) {
			tabs.remove('UkKnowApplyCollectFlowFormWin');
		}
		edit = new UkKnowApplyCollectFlowForm({
					id : record.data.applyId,
					runId : record.data.runid,
					piId : record.data.piId
				});
		tabs.add(edit);
		tabs.activate(edit);
	},
	// 审核跟踪
	trackRs : function(record) {
		var tabs = Ext.getCmp('centerTabPanel');
		var edit = tabs.getItem('UkKnowApplyFlowForm');

		if (edit != null) {
			tabs.remove('UkKnowApplyFlowForm');
		}
		edit = new UkKnowApplyFlowForm({
					id : record.data.applyId,
					runId : record.data.runid,
					piId : record.data.piId
				});
		tabs.add(edit);
		tabs.activate(edit);
	},
	// 锁定单据执行人
	lockTask : function(record) {
		var tasks = record.get('tasks');
		var taskId = tasks[0].taskId;
		Ext.Ajax.request({
					url : __ctxPath + '/flow/lockTask.do',
					params : {
						taskId : taskId
					},
					method : 'post',
					success : function(result, response) {
						var grid = Ext.getCmp("UkKnowApproveGrid");
						var resultObj = Ext.util.JSON
								.decode(result.responseText)
						if (resultObj.hasAssigned == true) {
							Ext.ux.Toast.msg("操作提示", "该任务已经被其他用户锁定执行！");
						} else {
							Ext.ux.Toast.msg("操作提示", "该任务已经成功锁定，请执行下一步操作！");
						}
						grid.getStore().reload();
					}
				});
	},
	// 行的Action
	onRowAction : function(grid, record, action, row, col) {
		switch (action) {
			case 'btn-del' :
				this.removeRs.call(this, record.data.applyId);
				break;
			case 'btn-edit' :
				this.editRs.call(this, record);
				break;
			case 'btn-ok' :
				this.newFlow_zh.call(this, record);
				break;
			case 'btn-operation' :
				this.trackRs.call(this, record);
				break;
			case 'btn-fabu' :
				this.knowCollect.call(this, record);
				break;
			case 'btn-lockTask' :
				this.lockTask.call(this, record);
				break;
			default :
				break;
		}
	}
});

/**
 * 新建流程
 * 
 * @param {}
 *            defId
 * @param {}
 *            name
 */
// UkKnowApplyView.newFlow = function(defId, name) {
// defId = '10160';
// name = '启动流程';
// var contentPanel = App.getContentPanel();
// var startForm = contentPanel.getItem('ProcessRunStart' + defId);
//
// if (!startForm) {
// startForm = new ProcessRunStart({
// id : 'ProcessRunStart' + defId,
// defId : defId,
// flowName : name
// });
// contentPanel.add(startForm);
// }
// contentPanel.activate(startForm);
// };
