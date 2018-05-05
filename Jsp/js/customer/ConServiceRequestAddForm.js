ConServiceRequestAddForm = Ext
		.extend(
				Ext.Panel,
				{
					//构造函数
					constructor : function(_cfg) {
						Ext.applyIf(this, _cfg);
						//必须先初始化组件
						this.initUIComponents(_cfg);
						this.getTab();
						ConServiceRequestAddForm.superclass.constructor
								.call(
										this,
										{
											id : 'ConServiceRequestAddFormWin',
											layout : 'fit',
											items : [this.formPanel],
											modal : true,
											height : 400,
											width : 500,
											maximizable : true,
											title : '新增服务请求',
											buttonAlign : 'center',
											buttons : [
													{
														text : __save,
														iconCls : 'btn-save',
														scope : this,
														handler : this.save
													},
													{
														text : __reset,
														iconCls : 'btn-reset',
														scope : this,
														handler : this.reset
													},
													{
														text : __cancel,
														iconCls : 'btn-cancel',
														scope : this,
														handler : function() {
															var tabs = Ext
																	.getCmp('centerTabPanel');
															var aForm = Ext
																	.getCmp('ConServiceRequestAddFormWin');
															tabs.remove(aForm);
														}
													}]
										});
					},//end of the constructor
					//初始化组件
					initUIComponents : function(_cfg) {
						this.formPanel = new Ext.FormPanel(
								{
									layout : 'form',
									bodyStyle : 'padding:10px',
									border : false,
									region : 'north',
									height : 230,
									labelAlign : 'right',
									autoScroll : true,
									//			id : 'con_ConServiceRequestAddForm_form',
									defaults : {
										anchor : '96%,96%'
									},
									items : [
											{
												xtype : 'fieldset',
												title : '客户信息',
												collapsible : 'true',
												tbar : ['->', {
													text : '查客户',
													iconCls : 'search'
												}, {
													text : '新客户',
													iconCls : 'btn-add'
												}],
												items : [
														{
															layout : 'column',
															border : false,
															style : 'padding-top:10px;background-color:#fff',
															items : [
																	{
																		layout : 'form',
																		border : false,
																		columnWidth : .33,
																		items : [{
																			xtype : 'textfield',
																			fieldLabel : '客户编号',
																			anchor : '100%'
																		}]
																	},
																	{
																		layout : 'form',
																		border : false,
																		columnWidth : .33,
																		items : [{
																			xtype : 'textfield',
																			fieldLabel : '名称',
																			anchor : '100%'
																		}]
																	},
																	{
																		layout : 'form',
																		border : false,
																		columnWidth : .333,
																		items : [{
																			xtype : 'textfield',
																			fieldLabel : '客户类型',
																			anchor : '100%'
																		}]
																	}]
														},
														{
															layout : 'column',
															border : false,
															items : [
																	{
																		layout : 'form',
																		border : false,
																		columnWidth : .33,
																		items : [{
																			xtype : 'textfield',
																			fieldLabel : '发生时间',
																			anchor : '100%'
																		}]
																	},
																	{
																		layout : 'form',
																		border : false,
																		columnWidth : 66,
																		items : [{
																			xtype : 'textfield',
																			fieldLabel : '地理信息',
																			anchor : '100%'
																		}]
																	}]
														},

														{
															layout : 'column',
															border : false,
															items : [
																	{
																		layout : 'form',
																		border : false,
																		columnWidth : .33,
																		items : [{
																			xtype : 'textfield',
																			fieldLabel : '登记日期',
																			anchor : '100%'
																		}]
																	},
																	{
																		layout : 'form',
																		border : false,
																		columnWidth : .33,
																		items : [{
																			xtype : 'textfield',
																			fieldLabel : '过期日期',
																			anchor : '100%'
																		}]
																	}]
														}, {
															xtype : 'textarea',
															fieldLabel : '备注',
															height : 50,
															anchor : '98%'
														}]
											},
											{
												layout : 'column',
												border : false,
												items : [{
													layout : 'form',
													border : false,
													columnWidth : .33,
													items : [{
														xtype : 'combo',
														fieldLabel : '请求方式',
														mode : 'local',
														store : [],
														anchor : '100%'
													}]
												}, {
													layout : 'form',
													border : false,
													columnWidth : .33,
													items : [{
														xtype : 'textfield',
														fieldLabel : '请求号码',
														anchor : '100%'
													}]
												}]
											},
											{
												layout : 'column',
												border : false,
												items : [{
													layout : 'form',
													border : false,
													columnWidth : .33,
													items : [{
														xtype : 'combo',
														fieldLabel : '业务类型',
														mode : 'local',
														store : [],
														anchor : '100%'
													}]
												}, {
													layout : 'form',
													border : false,
													columnWidth : .33,
													items : [{
														xtype : 'textfield',
														fieldLabel : '请求类别',
														anchor : '100%'
													}]
												}]
											},
											{
												xtype : 'textarea',
												fieldLabel : '请求内容',
												anchor : '96%',
												height : 50
											},
											{
												layout : 'column',
												border : false,
												style : 'padding-top:10px;background-color:#fff',
												items : [{
													layout : 'form',
													border : false,
													columnWidth : .33,
													items : [{
														xtype : 'datefield',
														fieldLabel : '要求完成时间',
														format : 'y-m-d',
														anchor : '100%'
													}]
												}, {
													layout : 'form',
													border : false,
													columnWidth : .33,
													items : [{
														xtype : 'textfield',
														fieldLabel : '联系人',
														anchor : '100%'
													}]
												}, {
													layout : 'form',
													border : false,
													columnWidth : .333,
													items : [{
														xtype : 'textfield',
														fieldLabel : '联系号码',
														anchor : '100%'
													}]
												}]
											}, {
												xtype : 'textarea',
												fieldLabel : '请求内容',
												anchor : '96%',
												height : 50
											}]
								});
					},//end of the initcomponents

					/**
					 * 重置
					 * @param {} formPanel
					 */
					reset : function() {
						this.formPanel.getForm().reset();
					},
					/**
					 * 取消
					 * @param {} window
					 */
					cancel : function() {
						this.close();
					},
					/**
					 * 保存记录
					 */
					save : function() {
						var subStatus = Ext.getCmp(
								'con_ServiceRequest.substatus').getValue();
						if (subStatus == '处理中') {
							subStatus = 11;
						} else if (subStatus == '完成') {
							subStatus = 20;
						} else if (subStatus == '取消') {
							subStatus = 21;
						}
						var status = Ext.getCmp('con_ServiceRequest.status')
								.getValue();
						if (status == '处理中') {
							status = 1;
						} else if (status == '已结案') {
							status = 2;
						}
						var serviceRequestId = Ext.getCmp(
								'con_ServiceRequest.serviceRequestId')
								.getValue();
						$postSubForm({
							formPanel : this.formPanel,
							scope : this,
							url : __ctxPath + '/customer/updateHandleRequestConServiceRequest.do',
							params : {
								status : status,
								subStatus : subStatus,
								serviceRequestId : serviceRequestId
							},
							msgSuccess : '成功处理该记录！',
							msgFailure : '操作出错，请联系管理员！',
							callback : function(fp, action) {
								var gridPanel = Ext
										.getCmp('ConServiceRequestGrid');
								if (gridPanel != null) {
									gridPanel.getStore().reload();
								}
								var wantGridPanel = Ext
										.getCmp('WantConServiceRequestGrid');
								if (wantGridPanel != null) {
									wantGridPanel.getStore().reload();
								}
								var MyWantGridPanel = Ext
										.getCmp('MyWantConServiceRequestGrid');
								if (MyWantGridPanel != null) {
									MyWantGridPanel.getStore().reload();
								}
								var HaveOverGridPanel = Ext
										.getCmp('HaveOverConServiceRequestGrid');
								if (HaveOverGridPanel != null) {
									HaveOverGridPanel.getStore().reload();
								}
								var MyHaveOverGridPanel = Ext
										.getCmp('MyHaveOverConServiceRequestGrid');
								if (MyHaveOverGridPanel != null) {
									MyHaveOverGridPanel.getStore().reload();
								}
								var tabs = Ext.getCmp('centerTabPanel');
								var aForm = Ext
										.getCmp('ConServiceRequestAddFormWin');
								if (aForm != null) {
									tabs.remove('ConServiceRequestAddFormWin');
								}
							}
						});
					},//end of save
					getTab : function() {
						var gridPanel_renwu = new HT.GridPanel(
								{
									//			tbar : ['->',{
									//				text : '添加',
									//				iconCls : 'btn-add',
									//				handler : function() {
									//					var tabs = Ext.getCmp('centerTabPanel');
									//					var aForm = Ext.getCmp('addCalendarPlanFormWin');
									//					if (aForm != null) {
									//						tabs.remove('addCalendarPlanFormWin');
									//					}
									//					aForm = new addCalendarPlanForm({planId : id});
									//					tabs.add(aForm);
									//					tabs.activate(aForm);
									//				}
									//			}],
									printable : false,
									exportable : false,
									showSm : false,
									url : __ctxPath
											+ "/task/listByServiceIdCalendarPlan.do",
									baseParams : {
										serviceId : this.serviceRequestId
									},
									fields : [{
										name : 'planId',
										type : 'int'
									}, 'taskTitle', 'taskCategory', 'status',
											'startTime', 'endTime', 'userId',
											'content', 'fullname',
											'effeciency', 'assignerName',
											'taskBusiType', 'taskType',
											'completeTime'],
									columns : [
											{
												header : '内码',
												dataIndex : 'planId',
												hidden : true
											},
											{
												header : '标题',
												isExp : false,
												dataIndex : 'taskTitle'
											},
											{
												header : '任务类型',
												isExp : false,
												dataIndex : 'taskType',
												renderer : function(value) {
													return CONFX.get(value);
												}
											},
											{
												header : '任务类别',
												isExp : false,
												dataIndex : 'taskCategory',
												renderer : function(value) {
													return CONTPJYLX.get(value);
												}
											},
											{
												header : '任务事项',
												isExp : false,
												dataIndex : 'taskBusiType',
												renderer : function(value) {
													return CONTPCLJG.get(value);
												}
											},
											{
												header : '要求完成时间',
												isExp : false,
												dataIndex : 'completeTime'
											},
											//			{
											//				header : '完成率',
											//				isExp : false,
											//				dataIndex : 'effeciency',
											//					renderer:function(value){
											//						if(value==null || value==""){
											//							return '0%'
											//						}else{
											//							return value+'%';
											//						}
											//					}
											//			},
											{
												header : '执行人',
												isExp : false,
												dataIndex : 'fullname'
											},
											{
												header : '状态',
												isExp : false,
												dataIndex : 'status',
												renderer : function(value) {
													if (value != null
															|| value != "") {
														return CON_REQ_STATUS
																.get(value);
													} else {
														return '';
													}
												}
											},
											{
												header : '管理',
												dataIndex : 'planId',
												width : 40,
												sortable : false,
												renderer : function(value,
														metadata, record,
														rowIndex, colIndex) {
													var editId = record.data.planId;
													var status = record.data.status;
													var assignerId = record.data.assignerId;
													var str = '&nbsp;<button title="查看" value=" " class="btn-readdocument" onclick="ConServiceRequestAddForm.edit(' + editId + ')"></button>';
													return str;
												}
											}]
								//end of columns
								});
						var gridPanel_lianluolishi = new HT.GridPanel({
							//使用RowActions
							rowActions : true,
							printable : false,
							exportable : false,
							showSm : false,
							url : __ctxPath
									+ "/customer/listByServiceIdConHis.do",
							baseParams : {
								serviceId : this.serviceRequestId
							},
							fields : [{
								name : 'conHisId',
								type : 'int'
							}, 'contactTypeId', 'dirId', 'staTime', 'owner',
									'busTypId', 'conResId', 'dealStaId'],
							columns : [{
								header : '内码',
								dataIndex : 'conHisId',
								hidden : true
							}, {
								header : '联络方式',
								dataIndex : 'contactTypeId',
								renderer : function(value) {
									if (value != null) {
										return LXFS001.get(value);
									} else {
										return ' ';
									}
								}
							}, {
								header : '方向',
								dataIndex : 'dirId',
								renderer : function(value) {
									return CONFX.get(value);
								}
							}, {
								header : '联络时间',
								dataIndex : 'staTime'
							}, {
								header : '负责人',
								dataIndex : 'owner',
								renderer : function(val) {
									return val ? val.username : '';
								}
							}, {
								header : '联络事项',
								dataIndex : 'busTypId',
								renderer : function(value) {
									return CONTPCLJG.get(value);
								}
							}, {
								header : '联络结果',
								dataIndex : 'conResId',
								renderer : function(value) {
									return CON_REQ_STATUS.get(value);
								}
							}, {
								header : '联络状态',
								dataIndex : 'dealStaId',
								renderer : function(value) {
									return CON_REQ_SUBSTATUS.get(value);
								}
							}, new Ext.ux.grid.RowActions({
								header : __action,
								actions : [{
									iconCls : 'btn-readdocument',
									qtip : '查看',
									style : 'margin:0 3px 0 3px'
								}],
								listeners : {
									scope : this,
									'action' : this.onRowAction
								}
							})]
						//end of columns
								});
						var gridPanel_gongdan = new HT.GridPanel({
							//使用RowActions
							rowActions : true,
							printable : false,
							exportable : false,
							url : __ctxPath + "",
							fields : [{
								name : 'serviceRequestId',
								type : 'int'
							}, 'customerid', 'type', 'source', 'linkmanid',
									'1', 'busType', 'customerId', 'accept',
									'acceptDate', '2', '3', 'status'],
							columns : [{
								header : 'serviceRequestId',
								dataIndex : 'serviceRequestId',
								hidden : true
							}, {
								header : '工单类型',
								isExp : false,
								dataIndex : 'customerid'
							}, {
								header : '工单类别',
								isExp : false,
								dataIndex : 'type',
								renderer : function(value) {
									return CR_TYPE.get(value);
								}
							}, {
								header : '申请人',
								isExp : false,
								dataIndex : 'source',
								renderer : function(value) {
									return CONKHLY.get(value);
								}
							}, {
								header : '申请时间',
								isExp : false,
								dataIndex : 'linkmanid'
							}, {
								header : '受理人',
								isExp : false,
								dataIndex : '1',
								renderer : function(value) {
									return '服务事项1';
								}
							}, {
								header : '受理时间',
								isExp : false,
								dataIndex : 'customerId'
							}, {
								header : '要求完成时间',
								isExp : false,
								dataIndex : 'accept'
							}, {
								header : '完成时间',
								isExp : false,
								dataIndex : 'acceptDate'
							}, {
								header : '状态',
								isExp : false,
								dataIndex : 'acceptDate'
							}, new Ext.ux.grid.RowActions({
								header : __action,
								width : 100,
								actions : [{
									iconCls : 'btn-readdocument',
									qtip : '',
									style : 'margin:0 3px 0 3px'
								}],
								listeners : {
									scope : this,
									'action' : function() {
									}
								}
							})]
						//end of columns
								});
					},
					//查看
					editRs : function(record) {
						var tabs = Ext.getCmp('centerTabPanel');
						var aForm = Ext.getCmp('ConHisFormWin');
						if (aForm != null || aForm != undefined) {
							tabs.remove(aForm);
						}
						aForm = new ConHisForm({
							conHisId : record.data.conHisId
						});
						tabs.add(aForm);
						tabs.activate(aForm);
					},
					//行的Action
					onRowAction : function(grid, record, action, row, col) {
						switch (action) {
							case 'btn-readdocument' :
								this.editRs.call(this, record);
								break;
							default :
								break;
						}
					}
				});
ConServiceRequestAddForm.edit = function(id) {
	var tabs = Ext.getCmp('centerTabPanel');
	var aForm = Ext.getCmp('TASK_CalendarPlanFormViewWin');
	if (aForm != null) {
		tabs.remove('TASK_CalendarPlanFormViewWin');
	}
	aForm = new CalendarPlanFormView({
		planId : id,
		flag : 'show'
	});
	tabs.add(aForm);
	tabs.activate(aForm);
}
