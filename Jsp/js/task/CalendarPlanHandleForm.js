CalendarPlanHandleForm = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		CalendarPlanHandleForm.superclass.constructor.call(this, {
			id : 'CalendarPlanHandleFormWin',
			iconCls : 'menu-cal-plan-view',
			title : '任务处理',
			border : false,
			items : this.formPanel,
			modal : true,
			height : 400,
			width : 500,
			labelAlign : 'right',
			border : false,
			autoScroll : true,
			defaults : {
				anchor : '96%,96%'
			},
			maximizable : true,
			buttonAlign : 'center',
			buttons : [{
				text : '保存',
				iconCls : 'btn-save',
				handler : function() {
					var handle_id = Ext.getCmp('handlePlan_planHandleId').getValue();
					var dResult = Ext.getCmp('calendarPlanHandle_result').getValue();
					var dReason = Ext.getCmp('calendarPlanHandle_reason').getValue();
//					var dEffec = Ext.getCmp('calendssarPlanHandle_effiency').getValue();
					var dDesc = Ext.getCmp('calendarPlanHandle_dreason').getValue();
					
					$postForm({
						formPanel : Ext.getCmp('CalendarPlanHandelForm_panel'),
						scope : this,
						url : __ctxPath + '/task/saveHandlePlanCalendarPlan.do',
						params : {
							dHandleId : handle_id,
							dResult : dResult,
							dReason : dReason,
							dEffec : '',
							dDesc : dDesc
					    },
						callback : function(fp, action) {
							var calenarPlanGrid = Ext.getCmp('CalendarPlanGrid');
							if (calenarPlanGrid != null) {
								calenarPlanGrid.getStore().reload();
							}
							if(Ext.getCmp('ToDoPlanGrid')){
								Ext.getCmp('ToDoPlanGrid').getStore().reload();
							}
							if(Ext.getCmp('ExpiredPlanGrid')){
								Ext.getCmp('ExpiredPlanGrid').getStore().reload();
							}
							var tabs = Ext.getCmp('centerTabPanel');
							tabs.remove(Ext.getCmp('CalendarPlanHandleFormWin'));
							this.destroy();
						}
					});
				}
			}, {
				text : '重置',
				iconCls : 'btn-reset',
				scope : this,
				handler : function() {
					Ext.getCmp('CalendarPlanHandelForm_panel').getForm().reset();
				}
			}, {
				text : '取消',
				iconCls : 'btn-cancel',
				handler : function() {
					var tab = Ext.getCmp('centerTabPanel');
					tab.remove(Ext.getCmp('CalendarPlanHandleFormWin'));
				}
			}]
		});
	},// end of the constructor
	// 初始化组件
	initUIComponents : function() {
		var CalendarPlanHandle_history = new HT.GridPanel({
			height : 130,
			layout : 'fit',
			showPaging : false,
			id : 'CalendarPlanHandlegrid',
			url : __ctxPath + "/task/listHandleCalendarPlan.do?planId="+this.planId,
			fields : [{
						name : 'handleId',
						type : 'int'
					}, 'assignerId','fullname', 'assignerName', 'assignTime', 'executorName', 'executeTime', 'finishTime','dealHandleResult'],

			columns : [{
						header : 'handleId',
						dataIndex : 'handleId',
						hidden : true
					}, {
						header : '分配时间',
						dataIndex : 'assignTime',
						isExp : false
					}, {
						header : '分配人',
						isExp : false,
						dataIndex : 'assignerName'
					}, {
						header : '处理人',
						isExp : false,
						dataIndex : 'executorName'
					}, {
						header : '处理时间',
						isExp : false,
						dataIndex : 'executeTime'
					}, {
						header : '处理结果',
						isExp : false,
						dataIndex : 'dealHandleResult',
						renderer : function(value) {
							if (value != '' || value=='0') {
								return CON_REQ_STATUS.get(value);
							} else {
								return ' ';
							}
						}
					}]
				// end of columns
			});

		this.formPanel = new Ext.FormPanel({
			layout : 'form',
			bodyStyle : 'padding:10px',
			labelAlign : 'right',
			border : false,
			autoScroll : true,
			id : 'CalendarPlanHandelForm_panel',
			defaults : {
				anchor : '96%,96%'
			},
			defaultType : 'textfield',
			items : [{
						name : 'handlePlan.planId',
						xtype : 'hidden',
						value : this.planId == null ? '' : this.planId
					}, {
						id : 'handlePlan_planHandleId',
						name : 'handlePlan.planHandleId',
						xtype : 'hidden'
					},{
						fieldLabel : '标题',
						id : 'calendarPlan_taskTitle',
						name : 'handlePlan.taskTitle',
						xtype : 'textfield',
						readOnly : true,
						maxLength : 128
					}, {
						layout : "column",
						xtype : 'panel',
						border : false,
						defaults : {
							border : false,
							columnWidth : .333,
							anchor : '100%',
							layout : "form"
						},
						items : [{
							items : [{
								fieldLabel : '任务类型',
								xtype : 'mtdiccombo',
								name : 'handlePlan.taskType',
								id : 'handle_calendarPlan_taskType',
								editable : false,
								lazyInit : false,
								forceSelection : false,
								itemKey : 'CONFX',
//								store :  new Ext.data.SimpleStore({
//									autoLoad : true,
//									url : __ctxPath + '/system/comboDictionary.do',
//									fields : [ 'dicId', 'itemValue' ],
//									listeners : {
//										load : function() {
//											var dicid = Ext.getCmp('handle_calendarPlan_taskType').getValue();
//											
//											Ext.Ajax.request({
//												url : __ctxPath + '/system/comboDictionary.do',
//												params : {
//													'Q_dicId_L_EQ' : dicid
//												},
//												fields : [ 'dicId', 'itemValue' ],
//												method : 'post',
//												success : function(response) {
//													var result = Ext.util.JSON.decode(response.responseText);
//													var arr = new Array();
//													arr = result.toString().split(",");
//													var arrType = arr[1];
//													Ext.getCmp('handle_calendarPlan_taskType').setValue(arrType);
//													if (arrType == '内部'){
//														Ext.getCmp('task_CalendarPlanHandleForm_handle_panel').hide();
//													}else{
//														Ext.getCmp('task_CalendarPlanHandleForm_handle_panel').show();
//													}
//												}
//											});
//										}
//									}
//								}),
//								displayField : 'itemValue',
//								valueField : 'dicId',
								readOnly : true,
								anchor : '100%'
							}]
						}, {
							items : [{
								fieldLabel : '任务类别',
								xtype : 'mtdiccombo',
								name : 'handlePlan.taskCategory',
								id : 'calendarPlan_taskCategory',
								editable : false,
								lazyInit : false,
								forceSelection : false,
								itemKey : 'CONTPJYLX',
								readOnly : true,
								anchor : '100%'
								
							}]
						}, {
							items : [{
								fieldLabel : '任务事项',
								xtype : 'mtdiccombo',
								hiddenName : 'handlePlan.taskBusiType',
								id : 'calendarPlan_taskBusiType',
								itemKey : 'CONTPCLJG',
								editable : false,
								lazyInit : false,
								forceSelection : false,
								readOnly : true,
								anchor : '100%'
								
							}]
						}]
					}, {
						layout : "column",
						xtype : 'panel',
						id : 'task_CalendarPlanHandleForm_handle_panel',
						border : false,
						defaults : {
							border : false,
							columnWidth : .333,
							anchor : '100%',
							layout : "form"
						},
						items : [{
							items : [{
								fieldLabel : '客户',
								xtype : 'textfield',
								name : 'handlePlan.cusName',
								id : 'calendarPlan_cusName',
								readOnly : true,
								anchor : '100%'
							}]
						}, {
							items : [{
								fieldLabel : '联系人',
								xtype : 'textfield',
								name : 'handlePlan.linkMan',
								id : 'calendarPlan_linkMan',
								readOnly : true,
								anchor : '100%'
								
							}]
						}, {
							items : [{
								fieldLabel : '联系地址/号码',
								xtype : 'textfield',
								name : 'handlePlan.numAddress',
								id : 'calendarPlan_numAddress',
								readOnly : true,
								anchor : '100%'
								
							}]
						}]
					},
					{
						layout : "column",
						xtype : 'panel',
						border : false,
						defaults : {
							border : false,
							columnWidth : .333,
							anchor : '100%',
							layout : "form"
						},
						items : [{
									items : [{
										fieldLabel : '开始时间',
										name : 'handlePlan.startTime',
										xtype : 'textfield',
										id : 'calendarPlan_startTime',
										readOnly : true,
										anchor : '100%'
									}]
								}, {
									items : [{
										fieldLabel : '要求完成时间',
										name : 'handlePlan.completeTime',
										xtype : 'textfield',
										id : 'handlePlan_completeTime',
										readOnly : true,
										anchor : '100%'
									}]
								}, {
									items : [{
										fieldLabel : '执行方式',
										xtype : 'mtdiccombo',
										anchor : '100%',
										name : 'handlePlan.execType',
										id : 'handlePlan_execType',
										itemKey : 'LXFS001',
										readOnly : true
									}]
								}]
					}, {
						layout : "column",
						xtype : 'panel',
						border : false,
						defaults : {
							border : false,
							columnWidth : .333,
							anchor : '100%',
							layout : "form"
						},
						items : [{
							items : [{
								fieldLabel : '优先级',
								xtype : 'mtdiccombo',
								anchor : '100%',
								name : 'handlePlan.urgent',
								id : 'handlePlan_urgent',
								itemKey : 'COM_YXJ',
								readOnly : true
							}]
						}, {
							items : [{
								xtype : 'checkbox',
								name : 'handlePlan.showStyle',
								id : 'handlePlan_showStyle',
								anchor : '100%',
								boxLabel : '放入日程',
								readOnly : true,
								autoShow : true
							}]
						},{
							items : [{
								xtype : 'checkbox',
								name : 'handlePlan.remind',
								id : 'handlePlan_remind',
								anchor : '100%',
								boxLabel : '提醒',
								readOnly : true,
								autoShow : true,
								listeners : {
									check: function(com, checked) {
										 var pan =  Ext.getCmp('handle.remindWaymtdiccombo');
										 if(checked){
											 pan.show();
										 }else{
											 pan.hide();
										 }
										 
									}
								}
							}]
							}]
					},{
						layout : "column",
						xtype : 'panel',
						hidden:true,
						border : false,
						id:'handle.remindWaymtdiccombo',
						defaults : {
							border : false,
							columnWidth : .333,
							anchor : '100%',
							layout : "form"
						},
						items : [ {
								items : [{
									fieldLabel : '提醒方式',
									xtype : 'mtdiccombo',
									name : 'handlePlan.remindWay',
									id : 'handle_calendarPlan.remindWay',
									editable : false,
									anchor : '100%',
									itemKey : 'COM_TXFS',
									readOnly : true,
									lazyInit : false,
									forceSelection : true
								}]
							}, {
								items : [{
									fieldLabel : '提醒时间',
									name : 'handlePlan.remindTime',
									xtype : 'textfield',
									readOnly : true,
									anchor : '100%'
								}]
							}]
					}, {
						fieldLabel : '内容',
						xtype : 'htmleditor',
						height : 100,
						name : 'handlePlan.content',
						id : 'handlePlan_content',
						readOnly : true
					}, {
						layout : "column",
						xtype : 'panel',
						border : false,
						defaults : {
							border : false,
							columnWidth : .333,
							anchor : '100%',
							layout : "form"
						},
						items : [{
							items : [{
								fieldLabel : '处理结果',
								xtype : 'mtdiccombo',
								id : 'calendarPlanHandle_result',
								editable : false,
								lazyInit : false,
								anchor : '100%',
								forceSelection : true,
								listeners:{
									'select':function(combo,record,index){
										if(combo.value == 2){
											Ext.getCmp('calendarPlanHandlePanel').show();
										}else{
											Ext.getCmp('calendarPlanHandlePanel').hide();
										}
									}
								},
								itemKey : 'CON_REQ_STATUS'
								}]
						}, {
							id:'calendarPlanHandlePanel',
							hidden:true,
							items : [{
								fieldLabel : '原因',
								xtype : 'mtdiccombo',
								id : 'calendarPlanHandle_reason',
								editable : false,
								lazyInit : false,
								anchor : '100%',
								itemKey : 'CONTPHYY',
								forceSelection : false
							}]
//						}, {
//							items : [{
//								fieldLabel : '完成率',
//								xtype : 'textfield',
//								id : 'calendssarPlanHandle_effiency',
//								anchor : '100%'
//							}]
						}]
					}, {
						fieldLabel : '处理说明',
						xtype : 'textarea',
						height : 40,
						id : 'calendarPlanHandle_dreason',
						allowBlank : false
					}, {
						xtype : 'fieldset',
						title : "处理历史",
//						collapsed : true,
						style:'padding-left:20px;',
						hidden:true,
						collapsible : true,
						id : 'calendarPlanHandle_history',
						autoHeight : true,
						items : CalendarPlanHandle_history
					}]
		});
	
		if (this.planId != null && this.planId != '' && this.planId != 'undefined' && this.planId != 'ext-gen2') {
			this.formPanel.loadData({
				url : __ctxPath + '/task/getHandleCalendarPlan.do?planId=' + this.planId,
				root : 'data',
				preName : 'handlePlan',
				waitMsg : '正在载入数据...',
				success : function(response, options) {
					var thisObj = Ext.util.JSON.decode(response.responseText).data;
					//任务类型
					var taskType = thisObj.taskType;
					Ext.getCmp('handle_calendarPlan_taskType').setValue(taskType);
					if (Ext.getCmp('handle_calendarPlan_taskType').getValue() == 3){
						Ext.getCmp('task_CalendarPlanHandleForm_handle_panel').hide();
					}else{
						Ext.getCmp('task_CalendarPlanHandleForm_handle_panel').show();
					}
					//任务类别
					var taskCategory = thisObj.taskCategory;
					Ext.getCmp('calendarPlan_taskCategory').setValue(taskCategory);
					//任务事项
					var taskBusiType = thisObj.taskBusiType;
					Ext.getCmp('calendarPlan_taskBusiType').setValue(taskBusiType);
					//开始时间
					var startTime = thisObj.startTime;
					Ext.getCmp('calendarPlan_startTime').setValue(startTime);
					//结束时间
					var completeTime = thisObj.completeTime;
					Ext.getCmp('handlePlan_completeTime').setValue(completeTime);
					//执行方式
					var exectype = thisObj.execType;
					Ext.getCmp('handlePlan_execType').setValue(exectype);
					//优先级
					var Urgent = thisObj.urgent;
					Ext.getCmp('handlePlan_urgent').setValue(Urgent);
					//提醒方式
					var remindWay = thisObj.remindWay;
					Ext.getCmp('handle_calendarPlan.remindWay').setValue(remindWay);
					
					var dealHResult = thisObj.dealHandleResult;
					var dealHReason = thisObj.dealHandleReason;
					
					var indesxPeople =  thisObj.executor;//执行人(也就是被分配人)
					var secondPeople =  thisObj.assignerId;//被分配人
//					alert(indesxPeople +' '+secondPeople)
					//alert(secondPeople+"-----"+indesxPeople);
//					if(indesxPeople == secondPeople){
						Ext.getCmp('calendarPlanHandle_history').show();
//					}
					
					Ext.getCmp("calendarPlanHandle_result").setValue(dealHResult);
					if (dealHReason != 'null'){
						Ext.getCmp("calendarPlanHandle_dreason").setValue(dealHReason);
					}else{
						Ext.getCmp("calendarPlanHandle_dreason").setValue(' ');
					}
					
			},
				failure : function(form, action) {
					
				}
			});
		}
	},// end of the initcomponents

	/**
	 * 重置
	 * 
	 * @param {}
	 * formPanel
	 */
	reset : function() {
		this.formPanel.getForm().reset();
	}
});
