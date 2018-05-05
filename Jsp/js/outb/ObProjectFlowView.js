/**
 * @author:cf0666@gmail.com
 * @class ObProjectFlowView
 * @extends Ext.Panel
 * @description [ObProject]管理
 * @company 优创融联科技
 * @createtime:
 */
ObProjectFlowView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				ObProjectFlowView.superclass.constructor.call(this, {
							id : this.id ? this.id : 'ObProjectView',
							title : this.title ? this.title : __menuViewObProject,
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
				var fieldnameComboData = [
						['projNam', '项目名称', new Ext.form.TextField({
											name : 'projNam',
											allowBlank : true
										})],
						['projAliNam', '项目简称', new Ext.form.TextField({
											name : 'projAliNam',
											allowBlank : true
										})],
						['projCod', '项目编号', new Ext.form.TextField({
											name : 'projCod',
											allowBlank : true
										})],
						['projTypId', '项目类别：自定义&CONOB_PROJECT_XMLB',
								new Ext.form.NumberField({
											name : 'projTypId',
											allowBlank : true
										})],
						['ownerTeam', '所属机构', new Ext.form.NumberField({
											name : 'ownerTeam',
											allowBlank : true
										})],
						['perIncharge', '负责人', new Ext.form.NumberField({
											name : 'perIncharge',
											allowBlank : true
										})],
						['srouceId', '来源：自定义&CONOB_PROJECT_LY',
								new Ext.form.NumberField({
											name : 'srouceId',
											allowBlank : true
										})],
						['staDat', '开始时间', new Ext.form.DateField({
											hiddenName : 'staDat',
											format : 'Y-m-d'
										})],
						['endDat', '截止时间', new Ext.form.DateField({
											hiddenName : 'endDat',
											format : 'Y-m-d'
										})],
						['busiTypId', '业务类型：自定义&CONOB_PROJECT_YWLX',
								new Ext.form.NumberField({
											name : 'busiTypId',
											allowBlank : true
										})],
						['execTypId',
								'执行方式：电话、邮件、传真、短信、邮寄等&CONOB_PROJECT_ZXFS',
								new Ext.form.NumberField({
											name : 'execTypId',
											allowBlank : true
										})],
						['projJianjie', '项目简介', new Ext.form.TextField({
											name : 'projJianjie',
											allowBlank : true
										})],
						['projConFile', '项目描述：文件路径', new Ext.form.TextField({
											name : 'projConFile',
											allowBlank : true
										})],
						['remark', '备注', new Ext.form.TextField({
											name : 'remark',
											allowBlank : true
										})],
						['creUseId', '创建人', new Ext.form.NumberField({
											name : 'creUseId',
											allowBlank : true
										})],
						['creTime', '创建时间', new Ext.form.DateField({
											hiddenName : 'creTime',
											format : 'Y-m-d'
										})],
						['updUseId', '修改人', new Ext.form.NumberField({
											name : 'updUseId',
											allowBlank : true
										})],
						['updTime', '修改时间', new Ext.form.DateField({
											hiddenName : 'updTime',
											format : 'Y-m-d'
										})],
						['projStaId', '状态：0=未启动 1=启用 2=关闭&CONOB_PROJECT_ZT',
								new Ext.form.NumberField({
											name : 'projStaId',
											allowBlank : true
										})],
						['runid', '流程内码', new Ext.form.NumberField({
											name : 'runid',
											allowBlank : true
										})],
						['nodeName', '审批节点名称', new Ext.form.TextField({
											name : 'nodeName',
											allowBlank : true
										})]]
				var ObProjectAdvancedSearchWin = Ext.extend(
						MT.AdvancedSearchWin, {
							title : '营销项目高级查询',
							fieldData : fieldnameComboData
						});
				// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'ObProjectSearchPanel',
							height : 35,
							items : [{
								xtype:'panel',
								width:70,
								style:'text-align:right',
								html:'项目名：'
							},{

										name : 'Q_projNam_S_LK',
										xtype : 'textfield'
									}, {
								xtype:'panel',
								width:70,
								style:'text-align:right',
								html:'类型：'
							},{

										hiddenName : 'Q_projTypId_SN_EQ',
										xtype : 'mtdiccombo',
										editable : true,
										lazyInit : false,
										forceSelection : false,
										itemKey : 'CONOB_PROJECT_XMLB'
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
											new ObProjectAdvancedSearchWin()
													.show();
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

				var node = this.title;
				this.gridPanel = new HT.GridPanel({
					region : 'center',
					tbar : this.topbar,
					// 使用RowActions
					rowActions : true,
					printable : false,
					exportable : false,
					id : 'ObProjectGrid',
					url : __ctxPath + "/outb/listFlowObProject.do",
					baseParams : {
						flowNode : this.title,
						flowType : 'ObProjectFlowView'// 流程类型key
					},
					fields : [{
								name : 'projId',
								type : 'int'
							}, 'projNam', 'projAliNam', 'projCod', 'projTypId',
							'ownerTeam', 'perIncharge', 'srouceId', 'staDat',
							'endDat', 'busiTypId', 'execTypId', 'projJianjie',
							'projConFile', 'remark', 'creUseId', 'creTime',
							'updUseId', 'updTime', 'projStaId','ownerTeamName',
							'perInchargeName','approvalStatus', 'tasks','runid',
							'nodeName', 'piId'],
					columns : [{
								header : 'projId',
								dataIndex : 'projId',
								hidden : true
							}, {
								header : '项目名',
								isExp : false,

								dataIndex : 'projNam'
							}, {
								header : '项目编号',
								isExp : false,

								dataIndex : 'projCod'
							}, {
								header : '业务类型',
								isExp : false,

								dataIndex : 'busiTypId',
								renderer : function(value) {
									return CONOB_PROJECT_YWLX.get(value);
								}
							}, {
								header : '项目类别',
								isExp : false,

								dataIndex : 'projTypId',
								renderer : function(value) {
									return CONOB_PROJECT_XMLB.get(value);
								}
							}, {
								header : '来源',
								isExp : false,

								dataIndex : 'srouceId',
								renderer : function(value) {
									return CONOB_PROJECT_LY.get(value);
								}
							}, {
								header : '开始时间',
								isExp : false,

								dataIndex : 'staDat',
								renderer : function(value) {
									if(value != null){
										return value.substr(0,10);
									}
									return value;
								}
							}, {
								header : '结束时间',
								isExp : false,

								dataIndex : 'endDat',
								renderer : function(value) {
									if(value != null){
										return value.substr(0,10);
									}
									return value;
								}
							}, {
								header : '所属机构',
								isExp : false,

//								dataIndex : 'ownerTeam'
								dataIndex : 'ownerTeamName'
							}, {
								header : '负责人',
								isExp : false,

//								dataIndex : 'perIncharge'
								dataIndex : 'perInchargeName'
							}, {
								header : '状态',
								isExp : false,

								dataIndex : 'projStaId',
								renderer : function(value) {
									return CONOB_PROJECT_ZT.get(value);
								}
							},{
								header : '当前任务',// __allApprovalInfo 流程审批信息
								dataIndex : 'tasks',
								width : 200,
								renderer : function(tasks, metadata, record, rowIndex,
										colIndex) {
									var reVal = '';
									if (tasks.length > 0) {
										for (var i = 0; i < tasks.length; i++) {
											reVal += tasks[i].taskName;
											if (tasks[i].userId) {
												reVal += '(';
												if (curUserInfo.userId == tasks[i].userId) {
													if (tasks[i].taskName == node) {
														reVal += '<a href="#"  onclick="App.MyDesktopClickTopTab(\'ProcessNextForm\',{taskId:'
																+ tasks[i].taskId
																+ ',activityName:\''
																+ tasks[i].taskName
																+ '\'})">';
													}
		
												}
												reVal += tasks[i].fullname
												if (curUserInfo.userId == tasks[i].userId) {
													reVal += "</a>";
												}
												reVal += ')&nbsp;&nbsp;';
											}
										}
									}
									return reVal;
								}
							}
							, new Ext.ux.grid.RowActions({
								header : __action,
								width : 100,
								actions : [{
									iconCls : 'btn-ok',
									qtip : '审批',
									style : 'margin:0 3px 0 3px',
									fn : function(record) {
										var tasks = record.get('tasks');
										if (tasks.length > 0) {
											for (var i = 0; i < tasks.length; i++) {
												if (tasks[i].userId) {
													if (curUserInfo.userId == tasks[i].userId) {
														if (tasks[i].taskName == node) {
															return true;
														}
													}
												}
											}
										}
									}
								}, {
									iconCls : 'btn-operation',
									qtip : '跟踪',
									style : 'margin:0 3px 0 3px'
								}, {
									iconCls : 'btn-fabu',
									qtip : '采集',
									style : 'margin:0 3px 0 3px',
									fn : function(record) {
										var node = Ext.getCmp('flowNode').getValue();
										if(node == '知识采集'){
											return true;
										}else{
											return false;
										}
									}
								}],
								listeners : {
									scope : this,
									'action' : this.onRowAction
								}
							})
					]
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
				// 审核跟踪
	trackRs : function(record) {
		var tabs = Ext.getCmp('centerTabPanel');
		var edit = tabs.getItem('UkKnowApply');

		if (edit != null) {
			tabs.remove('UkKnowApply');
		}
		edit = new UkKnowApplyFlowForm({
					applyId : record.data.applyId,
					runId : record.data.runid,
					piId : record.data.piId
				});
		tabs.add(edit);
		tabs.activate(edit);
	},
			// GridPanel行点击处理事件
			rowClick : function(grid, rowindex, e) {
				
//				grid.getSelectionModel().each(function(rec) {
//							new ObProjectForm({
//										projId : rec.data.projId
//									}).show();
//						});
				var record = grid.getSelectionModel().each(function(record) {
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ObProjectForm');
				if (aForm != null||aForm != undefined) {
					tabs.removeAll('ObProjectForm');
				}
				aForm = new ObProjectForm({
							projId : record.data.projId
						});
				tabs.add(aForm);
				tabs.activate(aForm);
				});
			},
			// 创建记录
			createRs : function() {
				// new ObProjectForm().show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ObProjectForm');
				if (aForm != null) {
					tabs.remove('ObProjectForm');
				}
				aForm = new ObProjectForm();
				tabs.add(aForm);
				tabs.activate(aForm);

			},
			// 按ID删除记录
			removeRs : function(id) {
				$postSubmit({
							url : __ctxPath + '/outb/multiDelObProject.do',
							ids : id,
							grid : this.gridPanel,
							msgTip : '您确认要删除所选记录吗？',
							msgSuccess : '成功删除该记录！',
							msgFailure : '操作出错，请联系管理员！'
						});
			},
			// 把选中ID删除
			removeSelRs : function() {
				$gridRs({
							url : __ctxPath + '/outb/multiDelObProject.do',
							grid : this.gridPanel,
							idName : 'projId',
							msgNull : '请选择要删除的记录！',
							msgTip : '您确认要删除所选记录吗？',
							msgSuccess : '成功删除所选记录！',
							msgFailure : '操作出错，请联系管理员！'
						});
			},
			// 编辑Rs
			editRs : function(record) {
				// new ObProjectForm({
				// projId : record.data.projId
				// }).show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ObProjectForm');
				if (aForm != null) {
					tabs.remove('ObProjectForm');
				}
				aForm = new ObProjectForm({
							projId : record.data.projId
						});
				tabs.add(aForm);
				tabs.activate(aForm);
			},
			//把选中的项目启动
			doneSelRs:function(){
				$gridRs({
					url : __ctxPath + '/outb/enableObProject.do',
					grid : this.gridPanel,
					idName : 'projId',
					msgNull : '请选择要启动的项目！',
					msgTip : '您确认要启动所选项目吗？',
					msgSuccess : '成功启动所选项目！',
					msgFailure : '操作出错，请联系管理员！'
				});
			},
			// 按ID启用记录
			doneRs : function(id) {
				$postSubmit({
							url : __ctxPath + '/outb/enableObProject.do',
							ids : id,
							grid : this.gridPanel,
							msgTip : '您确认要启动该项目吗？',
							msgSuccess : '成功启动该项目！',
							msgFailure : '操作出错，请联系管理员！'
						});
			},
			// 行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this, record.data.projId);
						break;
					case 'btn-edit' :
						this.editRs.call(this, record);
						break;
					case 'btn-setting' :
						this.doneRs.call(this, record.data.projId);
						break;
					case 'btn-newFlow' :
						this.newFlow.call(this, record);
						break;
					default :
						break;
				}
			}
		});
