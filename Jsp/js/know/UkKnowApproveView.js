/**
 * @author:cf0666@gmail.com
 * @class UkKnowApproveViewWin
 * @extends Ext.Panel
 * @description [UkKnowApprove]管理
 * @company 优创融联科技
 * @createtime:
 */
UkKnowApproveView = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		UkKnowApproveView.superclass.constructor.call(this, {
					id : 'UkKnowApproveViewWin',
					title : '知识审核',
					region : 'center',
					layout : 'border',
					items : [this.searchPanel, this.gridPanel]
				});
	},// end of constructor
	// 初始化组件
	initUIComponents : function() {
		var fieldnameComboData = [
				['approveTitle', __ukKnowApproveApproveTitle,
						new Ext.form.TextField({
									name : 'approveTitle',
									allowBlank : true
								})],
				['knowStatus', __ukKnowApproveKnowStatus,
						new Ext.form.NumberField({
									name : 'knowStatus',
									allowBlank : true
								})],
				['createDate', __ukKnowApproveCreateDate,
						new Ext.form.DateField({
									hiddenName : 'createDate',
									format : 'Y-m-d'
								})],
				['updateDate', __ukKnowApproveUpdateDate,
						new Ext.form.DateField({
									hiddenName : 'updateDate',
									format : 'Y-m-d'
								})]]
		var UkKnowApproveAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : __advanceQueryUkKnowApproves,
					fieldData : fieldnameComboData
				});
		// 初始化搜索条件Panel
		this.searchPanel = new Ext.FormPanel({
					layout : 'hbox',
					region : 'north',
					id : 'UkKnowApproveSearchPanel',
					height : 35,// 申请人 状态 审批状态
					items : [{
								text : "标题"// __ukKnowApproveApproveTitle
							}, {
								name : 'title',
								xtype : 'textfield'
							},{
								text : '知识维度'
							}, {
								hiddenName : 'busiType',
								xtype : 'mtdiccombo',
								editable : false,
								lazyInit : false,
								forceSelection : false,
								itemKey : 'KNOW_CATE',
								width : 120
							}
//							, {
//								text : "知识维度"// __ukKnowApproveApproveTitle
//							}, {
//								name : 'Q_approveINdex_S_LK',
//								xtype : 'textfield'
//							}
//							, {
//								text : "知识分类"// __ukKnowApproveApproveTitle
//							}
							, {
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

		this.topbar = new Ext.Toolbar({
					items : ['->', {
								iconCls : 'btn-add',
								text : __create,
								xtype : 'button',
								scope : this,
								handler : this.newFlow
							}, '-', {
								iconCls : 'btn-del',
								text : __delete,
								xtype : 'button',
								scope : this,
								handler : this.removeSelRs
							}]
				});
		var defID = this.defId;
		
		
		this.gridPanel = new HT.GridPanel({
			region : 'center',
			id : 'UkKnowApproveGrid',
			// 使用RowActions
			rowActions : true,
			printable : false,
			tbar : new Ext.Toolbar({
						items : ['->', 
						{
							iconCls : 'btn-signIn',
							text : '通过',
							xtype : 'button',
							scope : this,
//							handler : this.trasCheck(1)
							handler : function() {
								var grid = Ext.getCmp('UkKnowApproveGrid');
								var rows = grid.getSelectionModel().getSelections();
								if(rows.length ==0){
									Ext.ux.Toast.msg('操作信息', '请选择需要操作的知识!');
									return;
								}
								var ids = '';
								if (rows != null && rows.length >= 1) {
									for (var i = 0; i < rows.length; i++) {
										ids += rows[i].data.knowId + ",";
									}
								}
								Ext.Msg.confirm('信息确认', '您确认这些知识可以通过吗?', function(btn) {
									if (btn == 'yes') {
										Ext.Ajax.request({
													url : __ctxPath + "/know/trasCheckUkKnowApprove.do",
													params : {
														ids : ids,
														pass : 1 // 1为通过 2为不通过
													},
													waitMsg : '正在提交数据...',
													method : 'POST',
													success : function(response, options) {
														Ext.ux.Toast.msg('操作信息', '操作已成功!');
														grid.getStore().reload();
													},
													failure : function(response, options) {
														Ext.ux.Toast.msg('操作信息', '操作出错，请联系管理员！');
													}
												});
									}
								});
							}
						},{
						
							iconCls : 'btn-signOff',
							text : '不通过',
							xtype : 'button',
							scope : this,
//							handler : this.trasCheck(2)
							handler : function() {
							var grid = Ext.getCmp('UkKnowApproveGrid');
							var rows = grid.getSelectionModel().getSelections();
							if(rows.length ==0){
									Ext.ux.Toast.msg('操作信息', '请选择需要操作的知识!');
									return;
							}
							var ids = '';
							if (rows != null && rows.length >= 1) {
								for (var i = 0; i < rows.length; i++) {
									ids += rows[i].data.knowId + ",";
								}
							}
							Ext.Msg.confirm('信息确认', '您确认这些知识不通过吗?', function(btn) {
								if (btn == 'yes') {
									Ext.Ajax.request({
												url : __ctxPath + "/know/trasCheckUkKnowApprove.do",
												params : {
													ids : ids,
													pass : 2 // 1为通过 2为不通过
												},
												waitMsg : '正在提交数据...',
												method : 'POST',
												success : function(response, options) {
													Ext.ux.Toast.msg('操作信息', '操作已成功!');
													grid.getStore().reload();
												},
												failure : function(response, options) {
													Ext.ux.Toast.msg('操作信息', '操作出错，请联系管理员！');
												}
											});
								}
							});
	
							}
						}
//							{
//									iconCls : 'btn-add',
//									text : '申请',
//									xtype : 'button',
//									scope : this,
////									handler : this.createRs
//									handler : function() {
//				//							var grid = Ext.getCmp('UkKnowCollectGrid');
//											var rows = this.gridPanel.getSelectionModel().getSelections();
//											var ids = '';
//											if (rows != null && rows.length >= 1) {
//												for (var i = 0; i < rows.length; i++) {
//													ids += rows[i].data.knowId + ",";
//												}
//												defId = '10181';
//												name = '知识审批发布';
//												var contentPanel = App.getContentPanel();
//												var startForm = contentPanel
//														.getItem('ProcessRunStart' + defId);
//				
//												if (!startForm) {
//													startForm = new ProcessRunStart({
//																id : 'ProcessRunStart' + defId,
//																defId : defId,
//																flowName : name,
//																ids : ids,
//																gridPanel : this.gridPanel
//															});
//													contentPanel.add(startForm);
//												}
//												contentPanel.activate(startForm);
//											} else {
//												Ext.ux.Toast.msg(__actioninfo, '请选择需要审核的知识!');
//											}
//										}
//								}
								
								]
					}),
			exportable : false,
//			url : __ctxPath + "/know/listFlowUkKnowApprove.do",
//			baseParams : {
//				flowNode : this.title,
//				flowType : 'UkKnowApproveFlowView'// 流程类型key
//			},
			url : __ctxPath + "/know/queryKnowListUkSysKnow.do",
			baseParams :{
					status : 2,
					isPermission : 'false',
					isOverdue :　'notCheck'
				}, 
//			fields : [{
//						name : 'knowApproveId',
//						type : 'int'
//					}, 'ukKnowApprove', 'approveTitle', 'approveComment',
//					'knowStatus', 'runid', 'createBy', 'updateBy',
//					'createDate', 'updateDate', 'userid', 'approvalStatus',
//					'tasks', 'runid', 'nodeName', 'piId'],
			fields : [{
						name : 'knowId',
						type : 'int'
					}, 'ukSysKnow', 'tiTle', 'busiType',
					'enableTime', 'pastTime', 'sysKnowStatus', 'viewCount',
					'sysKnowComment', 'plus1', 'plus2', 'plus3', 'plus4',
					'plus5', 'plus6', 'plus7', 'plus8', 'sysKnowVersion',
					'createBy', 'updateBy', 'createDate', 'updateDate',
					'ukKnowTemplate', 'runid', 'nodeName', 'ukKnowApplys','accessManage'],
			columns : [{
								header : __ukSysKnowKnowId,// 'knowId',
								dataIndex : 'knowId',
								hidden : true
							}, {
								header : __ukSysKnowKnowTmpId,// '知识模板编号',
								isExp : false,
								dataIndex : 'ukKnowTemplate',
								hidden : true,
								renderer : function(val) {
									return val != null ? val.tmpName : '';
								}
							}, {
								header : __ukSysKnowKnowApproveId,// '知识审批单内码',
								isExp : false,
								hidden : true,
								dataIndex : 'ukKnowApprove',
								renderer : function(val) {
									if (val != null) {
										return val.knowApproveIdName;
									} else {
										return '';
									}
								}
							}, {
								header : __ukSysKnowTiTle,// '标题',
								isExp : false,
								id : 'know_title',
								width:300,
								dataIndex : 'tiTle'
							}, {
								header : '访问方式',// '摘要',
								isExp : false,
								dataIndex : 'accessManage',
									width : 120,
									renderer : function(val) {
										if (val != null) {
											return KNOW_FWGL.get(val);
										} else {
											return '';
										}
									}
							}, {
								header : "类型",
								isExp : false,
								dataIndex : 'busiType',
								renderer : function(value) {
									if (value != null){
										return KNOW_CATE.get(value);
									}else {
										return '';	
									}
								}
							}, {
								header : '开始时间',// '生效时间',
								isExp : false,
								dataIndex : 'enableTime'
							}, {
								header : '结束时间',// '过期时间',
								isExp : false,
								dataIndex : 'pastTime'
							}, {
								header : __ukSysKnowViewCount,// '浏览数',
								isExp : false,
								dataIndex : 'viewCount'
							}, {
								header : '评价',// '版本号',
								isExp : false,
								hidden : true,
								dataIndex : 'sysKnowVersion'
							}, {
								header : __ukSysKnowCreateBy,// '创建人内码',
								isExp : false,
								hidden:true,
								dataIndex : 'createBy',
								hidden : true,
								renderer : function(value) {
									if (value == null) {
										return '';
									} else {
										return value.fullname;
									}
								}
							}, {
								header : __ukSysKnowSysKnowStatus,// '状态&KNOW_STATUS',
								isExp : false,
								dataIndex : 'sysKnowStatus',
								renderer : function(value) {
									return KNOW_FLOW.get(value);
								}
							}, new Ext.ux.grid.RowActions({
										header : __action,
										width : 80,
										actions : [{
													iconCls : 'btn-signIn',
													qtip : "通过",
													style : 'margin:0 3px 0 3px'
												},{
													iconCls : 'btn-signOff',
													qtip : "不通过",
													style : 'margin:0 3px 0 3px'
												},
													{
													iconCls : 'btn-readdocument',
													qtip : "查看",
													style : 'margin:0 3px 0 3px'
												}
										// {
										// iconCls : 'btn-del',
										// qtip : __delete,
										// style : 'margin:0 3px 0 3px'
										// }, {
										// iconCls : 'btn-edit',
										// qtip : __edit,
										// style : 'margin:0 3px 0 3px'
										// }
										],
										listeners : {
											scope : this,
											'action' : this.onRowAction
										}
									})]		
//			columns : [{
//						header : 'knowApproveId',
//						dataIndex : 'knowApproveId',
//						hidden : true
//					}, {
//						header : '申请说明',
//						isExp : false,
//						dataIndex : 'approveComment'
//					}
////					, {
////						header : "标题",// __ukKnowApproveApproveTitle,
////						isExp : false,
////
////						dataIndex : 'approveTitle'
////					}, {
////						header : '类型',
////						isExp : false,
////
////						dataIndex : 'knowStatus',
////						renderer : function(value) {
////							return KNOW_STATUS.value;
////						}
////					}, {
////						header : '开始时间',
////						isExp : false,
////
////						dataIndex : 'updateDate'
////					}, {
////						header : '结束时间',
////						isExp : false,
////
////						dataIndex : 'updateDate'
////					}
//					, {
//						header : '申请人',// __ukKnowApproveCreateBy,
//						isExp : false,
//						dataIndex : 'createBy'
//						// }, {
//					// header : __ukKnowApproveUpdateBy,
//					// isExp : false,
//					//
//					// dataIndex : 'updateBy'
//				}	, {
//						header : '申请时间',// __ukKnowApproveCreateDate,
//						isExp : false,
//						dataIndex : 'createDate',
//						renderer : function(value) {
//							return value.substring(0, 10);
//						}
//					}, {
//						header : "状态",// __allApprovalStatus
//						dataIndex : 'approvalStatus'
//					}, {
//						header : '当前任务',// __allApprovalInfo 流程审批信息
//						dataIndex : 'tasks',
//						width : 200,
//						hidden : true,
//						renderer : function(tasks, metadata, record, rowIndex,
//								colIndex) {
//							var reVal = '';
//							if (tasks.length > 0) {
//								reVal += tasks[0].taskName;
//								if (tasks[0].userId) {
//									reVal += '(';
//								}
//								for (var i = 0; i < tasks.length; i++) {
//									if (tasks[i].userId) {
//										// if (curUserInfo.userId ==
//										// tasks[i].userId) {
//										// if (tasks[i].taskName == node) {
//										// reVal += '<a href="#"
//										// onclick="App.MyDesktopClickTopTab(\'ProcessNextForm\',{taskId:'
//										// + tasks[i].taskId
//										// + ',activityName:\''
//										// + tasks[i].taskName
//										// + '\'})">';
//										// }
//										//
//										// }
//										reVal += tasks[i].fullname;
//										if (i == 0 && tasks.length > 1
//												|| i < tasks.length - 1) {
//											reVal += ',';
//										}
//										// if (curUserInfo.userId ==
//										// tasks[i].userId) {
//										// reVal += "</a>";
//										// }
//									} else {
//										reVal += '(<font color="red">';
//										reVal += '无';
//										reVal += '</font>)&nbsp;&nbsp;';
//									}
//								}
//								if (tasks[0].userId) {
//									reVal += ')&nbsp;&nbsp;';
//								}
//							} else {
//								reVal = '流程结束';
//							}
//							return reVal;
//						}
//						// }, {
//						// header : __ukKnowApproveUpdateDate,
//						// isExp : false,
//						//
//						// dataIndex : 'updateDate'
//						// }, {
//						// header : __ukKnowApproveUserid,
//						// isExp : false,
//						//
//						// dataIndex : 'userid'
//						// },{
//						// header : __ukKnowApproveApprovalStatus,
//						// dataIndex : 'approvalStatus'
//						// },{
//						// header : __allStartTask,
//						// dataIndex : 'tasks',
//						// renderer : function(tasks, metadata, record,
//						// rowIndex,
//						// colIndex) {
//						// var reVal = '';
//						// if (tasks.length > 0) {
//						//
//						// for (var i = 0; i < tasks.length; i++) {
//						// reVal += tasks[i].taskName;
//						// if (tasks[i].userId) {
//						// reVal += '(';
//						// if (curUserInfo.userId == tasks[i].userId) {
//						// if (tasks[i].taskName == node) {
//						// reVal += '<a href="#"
//						// onclick="App.MyDesktopClickTopTab(\'ProcessNextForm\',{taskId:'
//						// + tasks[i].taskId
//						// + ',activityName:\''
//						// + tasks[i].taskName
//						// + '\'})">';
//						// }
//						//
//						// }
//						// reVal += tasks[i].fullname
//						// if (curUserInfo.userId == tasks[i].userId) {
//						// reVal += "</a>";
//						// }
//						// reVal += ')&nbsp;&nbsp;';
//						// }
//						// }
//						// }
//						// return reVal;
//						// }
//					}, new Ext.ux.grid.RowActions({
//						header : __action,
//						width : 50,
//						actions : [{
//							iconCls : 'btn-ok',
//							qtip : '审批',
//							style : 'margin:0 3px 0 3px',
//							fn : function(record) {
//								var tasks = record.get('tasks');
//								if (tasks.length > 0) {
//									for (var i = 0; i < tasks.length; i++) {
//										if (curUserInfo.userId == tasks[i].userId) {
//											return true;
//										}
//									}
//								}
//							}
//						}, {
//							iconCls : 'btn-lockTask',
//							qtip : '锁定',
//							style : 'margin:0 3px 0 3px',
//							fn : function(record) {
//								var tasks = record.get('tasks');
//								if (tasks.length > 0) {
//									for (var i = 0; i < tasks.length; i++) {
//										if (tasks[i].userId == '') {
//											return true;
//										}
//									}
//								}
//
//							}
//						}, {
//							iconCls : 'btn-operation',
//							qtip : '跟踪',
//							style : 'margin:0 3px 0 3px'
//						}],
//						listeners : {
//							scope : this,
//							'action' : this.onRowAction
//						}
//					})]
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

	// 审核跟踪2
	trackRs : function(rec) {
		var tabs = Ext.getCmp('centerTabPanel');
		var edit = tabs.getItem('UkKnowApprove');

		if (edit != null) {
			tabs.remove('UkKnowApprove');
		}
		edit = new UkKnowApproveFlowForm({
					id : rec.data.knowApproveId,
					runId : rec.data.runid,
					piId : rec.data.piId
				});
		tabs.add(edit);
		tabs.activate(edit);
	},
	// 获取下一节点
	nextFlow : function(record) {
		var tasks = record.get('tasks');
		var contentPanel = App.getContentPanel();
		var nextForm = contentPanel.getItem('ProcessNextForm');
		if (tasks.length > 0) {
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
	trasCheck : function(pass) {
		var grid = Ext.getCmp('UkKnowApproveGrid');
		var rows = grid.getSelectionModel().getSelections();
		var ids = '';
		if (rows != null && rows.length >= 1) {
			for (var i = 0; i < rows.length; i++) {
				ids += rows[i].data.knowId + ",";
			}
		}
		var msg = '';
		if(pass==1){
			msg = '您确认这些知识可以通过吗?'
		}else if(pass==2){
			msg = '您确认这些知识不通过吗?'
		}
		Ext.Msg.confirm('信息确认', msg, function(btn) {
			if (btn == 'yes') {
				Ext.Ajax.request({
							url : __ctxPath + "/know/trasCheckUkKnowApprove.do",
							params : {
								ids : ids,
								pass : pass // 1为通过 2为不通过
							},
							waitMsg : '正在提交数据...',
							method : 'POST',
							success : function(response, options) {
								Ext.ux.Toast.msg('操作信息', '操作已成功!');
								grid.getStore().reload();
								Ext.get('marquee').dom.innerHTML = record.data.tiTle;
							},
							failure : function(response, options) {
								Ext.ux.Toast.msg('操作信息', '操作出错，请联系管理员！');
							}
						});
			}else{
				alert(Ext.getCmp('know_title').getValue());
			}
		});
	},
	
	
	// 审批跟踪1
	// trackRs : function(record) {
	// var tabs = Ext.getCmp('centerTabPanel');
	// var edit = Ext.getCmp('UkKnowApproveFlowFormWin');
	// // alert(edit);
	// if (edit != null) {
	// tabs.remove('UkKnowApproveFlowFormWin');
	// }
	// edit = new UkKnowApproveFlowForm({
	// knowApproveId : record.data.knowApproveId,
	// runId : record.data.runid,
	// piId : record.data.piId
	// });
	// // alert(edit);
	// tabs.add(edit);
	// tabs.activate(edit);
	// },
	// GridPanel行点击处理事件
	rowClick : function(grid, rowindex, e) {
		grid.getSelectionModel().each(function(record) {
					var tabs = Ext.getCmp('centerTabPanel');
					var aForm = Ext.getCmp('UkSysKnowShow');
					if (aForm != null) {
						tabs.remove('UkSysKnowShow');
					}
					var collForm = Ext.getCmp('UkKnowCollectFormWin');
					if (collForm != null) {
						tabs.remove(collForm);
					}
					aForm = new UkSysKnowShow({
								knowId : record.data.knowId,
								knowTmpId : record.data.ukKnowTemplate.knowTmpId,
								knowTitle : record.data.tiTle
							});
					tabs.add(aForm);
					tabs.activate(aForm);
				});
	},
	// 创建记录
	createRs : function() {

		 defId = '10181';
		 name = '知识审批发布';
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
		
//		var tabs = Ext.getCmp('centerTabPanel');
//		var aForm = Ext.getCmp('UkKnowApproveForm');
//		if (aForm != null) {
//			tabs.remove('UkKnowApproveForm');
//		}
//		aForm = new UkKnowApproveForm();
//		tabs.add(aForm);
//		tabs.activate(aForm);

	},
	// 按ID删除记录
	removeRs : function(id) {
		$postDel({
					url : __ctxPath + '/know/multiDelUkKnowApprove.do',
					ids : id,
					grid : this.gridPanel
				});
	},
	// 把选中ID删除
	removeSelRs : function() {
		$delGridRs({
					url : __ctxPath + '/know/multiDelUkKnowApprove.do',
					grid : this.gridPanel,
					idName : 'knowApproveId'
				});
	},
	newFlows : function(record) {
		App.newFlow(10181, '启动流程', record.data.knowApproveId).show();

	},
	// 编辑Rs
	editRs : function(record) {
		// 只允许有一个编辑窗口
		var tabs = Ext.getCmp('centerTabPanel');
		var eform = Ext.getCmp('UkKnowApproveForm');

		var knowApproveId = record.data.knowApproveId;
		if (eform != null) {
			tabs.remove('UkKnowApproveForm');
		}
		eform = new UkKnowApproveForm({
					knowApproveId : knowApproveId
				});
		tabs.add(eform);
		tabs.activate(eform);

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
		showRs : function(record) {
		var tabs = Ext.getCmp('centerTabPanel');
		var aForm = Ext.getCmp('UkSysKnowShow');
		if (aForm != null) {
			tabs.remove('UkSysKnowShow');

		}
		if (Ext.getCmp('UkKnowCollectFormWin') != null) {
			tabs.remove('UkKnowCollectFormWin');
		}
		aForm = new UkSysKnowShow({
			knowId : record.data.knowId,
			knowTmpId : record.data.ukKnowTemplate.knowTmpId,
			knowTitle : record.data.tiTle
		});
		tabs.add(aForm);
		tabs.activate(aForm);
	},
	
	// 新流程启动
	// newFlow : function() {
	// defId = '10181';
	// name ='开始';
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
	// },
	// 行的Action
	// onRowAction : function(grid, record, action, row, col) {
	// switch (action) {
	// case 'btn-del':
	// this.removeRs.call(this, record.data.knowApproveId);
	// break;
	// case 'btn-edit':
	// this.editRs.call(this, record);
	// break;
	// case 'btn-operation':
	// this.trackRs.call(this, record);
	// // case 'btn-newFlow' :
	// // this.newFlows.call(this, record);
	// // break;
	// default:
	// break;
	// }
	// }
	// 行的Action
	onRowAction : function(grid, record, action, row, col) {
		switch (action) {
			case 'btn-operation' :
				this.trackRs.call(this, record);
				break;
			case 'btn-ok' :
				this.nextFlow.call(this, record);
				break;
			case 'btn-lockTask' :
				this.lockTask.call(this, record);
				break;
			case 'btn-readdocument' :
				this.showRs.call(this, record);
				break;
			case 'btn-signIn' :
				this.trasCheck.call(this, 1);
				break;
			case 'btn-signOff' :
				this.trasCheck.call(this, 2);
				break;
			default :
				break;
		}
	}
});