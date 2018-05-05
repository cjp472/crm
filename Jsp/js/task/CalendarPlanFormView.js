var assignerIds = '';
CalendarPlanFormView = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		CalendarPlanFormView.superclass.constructor.call(this, {
			id : 'TASK_CalendarPlanFormViewWin',
			iconCls : 'menu-cal-plan-view',
			title : this.flag == 'show' ? '任务查看':'任务添加',
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
			buttons : [ {
				text : '关闭',
				iconCls : 'btn-cancel',
				handler : function() {
					var tab = Ext.getCmp('centerTabPanel');
					tab.remove('TASK_CalendarPlanFormViewWin');
				}
			}]
		});
	},// end of the constructor
	// 初始化组件
	initUIComponents : function(_cfg) {
		var CalendarPlanHandle_history_view = new HT.GridPanel({
			height : 130,
			layout : 'fit',
			showPaging : false,
			id : 'CalendarPlanShowgrid',
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
			id : 'task_CalendarPlanForm_View',
			bodyStyle : 'padding:10px',
			labelAlign : 'right',
			border : false,
			autoScroll : true,
			defaults : {
				anchor : '96%,96%'
			},
			defaultType : 'textfield',
			items : [{
						name : 'calendarPlan.planId',
						xtype : 'hidden',
						value : this.planId == null ? '' : this.planId
					}, {
						fieldLabel : '标题',
						name : 'calendarPlan.taskTitle',
						allowBlank : false,
						readOnly:this.flag == 'show' ? true:false,
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
								id : 'view_calendarPlan.taskType',
								editable : false,
								lazyInit : true,
								allowBlank : false,
								itemKey : 'CONFX',
								forceSelection : false,
								triggerAction : 'all',
								readOnly:this.flag == 'show' ? true:false,
								anchor : '100%'
								
							}]
							}, {
								items : [{
									fieldLabel : '任务类别',
									xtype : 'mtdiccombo',
									id : 'view_calendarPlan.taskCategory',
									itemKey : 'CONTPJYLX',
									editable : false,
									lazyInit : false,
									forceSelection : false,
									triggerAction : 'all',
									anchor:'100%',
									readOnly:true
								}]
							}, {
								items : [{
									fieldLabel : '任务事项',
									xtype : 'mtdiccombo',
									id : 'view_calendarPlan.taskBusiType',
									itemKey : 'CONTPCLJG',
									editable : false,
									lazyInit : false,
									forceSelection : false,
									triggerAction : 'all',
									anchor : '100%',
									readOnly:true
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
						items : [ {
							items : [{
								fieldLabel : '开始时间',
								name : 'calendarPlan.startTime',
								id:'calendarPlan.startTime',
								xtype : 'datefield',
								format : 'Y-m-d H:i:s',
								readOnly:this.flag == 'show' ? true:false,
								anchor : '100%'
							}]
						}, {
							items : [{
								fieldLabel : '要求完成时间',
								name : 'calendarPlan.completeTime',
								xtype : 'datefield',
								format : 'Y-m-d H:i:s',
								id:'calendarPlan.completeTime',
								readOnly:this.flag == 'show' ? true:false,
								anchor : '100%'
							}]
						},{
							items : [{
								fieldLabel : '执行方式',
								xtype : 'mtdiccombo',
								name : 'handlePlan.execType',
								id : 'view_calendarPlan_execType',
								itemKey : 'LXFS001',
								readOnly:true,
								anchor : '100%'
							}]
						}]
					},{
						layout : "column",
						xtype : 'panel',
						hidden:true,
						id:'task_CalendarPlanFormView_addForm_panel',
						border : false,
						defaults : {
							border : false,
							columnWidth : .333,
							anchor : '100%',
							layout : "form"
						},
						items : [{
							columnWidth : 0.333,
					        xtype : 'panel',
							layout : 'column', 
						//	style : 'padding:5px 0px 0px 0px;',
							items : [{
								columnWidth : 0.9, 
								xtype : 'container',
								layout : 'form',
								items : [{
									fieldLabel : '客户ID',
									name : 'calendarPlan.sponsor',
									xtype : 'hidden',
									id : 'view_calendarPlan.sponsor',
									hidden : true
								},{
									fieldLabel : '客户',
									name : 'calendarPlan.cusName',
									id : 'view_calendarPlan.cusName',
									xtype : 'textfield',
									anchor : '100%'
								}]
							 } ,{
							 	columnWidth : 0.1, 
								xtype : 'container',
								layout : 'form',
								items : [{
									xtype:'button',	
									anchor: '100%',
									text : '选择',
									border:false,
									readOnly : true,
									handler:function(){
										
									}
								   }
								]}
							 ]}, {
							items : [{
								fieldLabel : '联系人',
								xtype : 'textfield',
								anchor : '100%',
								name : 'calendarPlan.linkMan',
								id : 'view_calendarPlan.linkMan'
							}]
						}, {
							items : [{
								fieldLabel : '联系地址/号码',
								xtype : 'textfield',
								anchor : '100%',
								name : 'calendarPlan.numAddress',
								id : 'view_calendarPlan.numAddress'
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
								hiddenName : 'calendarPlan.urgent',
								id : 'view_handlePlan_urgent',
								itemKey : 'COM_YXJ',
								lazyInit : false,
								readOnly : true,
								anchor : '100%'
							}]
						}, {
							items : [{
								xtype : 'checkbox',
								name : 'calendarPlan.showStyle',
								id : 'view_calendarPlan.showStyle',
								anchor : '100%',
								boxLabel : '放入日程',
								inputValue:1,
								autoShow : true
							}]
						},{
							items : [{
								xtype : 'checkbox',
								name : 'calendarPlan.remind',
								id : 'view_calendarPlan.remind',
								anchor : '100%',
								boxLabel : '提醒',
								inputValue:1,
								autoShow : true,
								listeners : {
								check: function(com, checked) {
									 var pan =  Ext.getCmp('view_calendarPlan.remindWaymtdiccombo');
									 if(checked){
										 pan.show();
									 }else{
										 pan.hide();
									 }
									 
								}
								}
							}]
							}]
					}, {
						layout : "column",
						xtype : 'panel',
						hidden:true,
						border : false,
						id:'view_calendarPlan.remindWaymtdiccombo',
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
									name : 'calendarPlan.remindWay',
									id : 'view_calendarPlan.remindWay',
									anchor : '100%',
									itemKey : 'COM_TXFS',
									readOnly : true
								}]
							}, {
								items : [{
									fieldLabel : '提醒时间',
									name : 'calendarPlan.remindTime',
									xtype : 'datefield',
									format : 'Y-m-d h:m:s',
									readOnly:this.flag == 'show' ? true:false,
									anchor : '100%'
								}]
							}]
					}, {
						layout : "column",
						xtype : 'panel',
						border : false,
						defaults : {
							border : false,
							columnWidth : 1,
							anchor : '100%',
							layout : "form"
						},
						items : [{
					        xtype : 'panel',
							layout : 'column',
							border:false,
							//style : 'padding:5px 0px 0px 0px;',
							items : [{
								columnWidth : 0.95, 
								xtype : 'panel',
								border:false,
								layout : 'form',
								//height : 25,
								items : [{
									xtype : 'hidden',
							    	name : 'calendarPlan.assignerId',
							    	id : 'view_calendarPlan.assignerId'
								},{
									fieldLabel : '分配人',
									name : 'calendarPlan.assignerName',
									id : 'view_calendarPlan.assignerName',
									xtype : 'textfield',
									anchor : '100%',
									readOnly  : true
								}]
							 } ,{	
							 	columnWidth : 0.05, 
								xtype : 'container',
								layout : 'form',
								items : [{
									xtype:'button',
									text : '选择',
									anchor: '100%',
									border:false,
									handler:function(){
										
									}
								   }
								]}
							 ]}]
					},{
						fieldLabel : '内容',
						xtype : 'htmleditor',
						name : 'calendarPlan.content',
						anchor:'96%',
						height : 150,
						allowBlank : false
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
								id : 'calendarPlanHandle_result_view',
								editable : false,
								lazyInit : false,
								readOnly : true,
								anchor : '100%',
								forceSelection : true,
								listeners:{
									'select':function(combo,record,index){
										if(combo.value == 2){
											Ext.getCmp('calendarPlanHandlePanel_view').show();
										}else{
											Ext.getCmp('calendarPlanHandlePanel_view').hide();
										}
									}
								},
								itemKey : 'CON_REQ_STATUS'
								}]
						}, {
							id:'calendarPlanHandlePanel_view',
							hidden:true,
							items : [{
								fieldLabel : '原因',
								xtype : 'mtdiccombo',
								id : 'calendarPlanHandle_reason_view',
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
						id : 'calendarPlanHandle_dreason_view',
						readOnly : true,
						allowBlank : false
					},{
						xtype : 'fieldset',
						title : "处理历史",
//						collapsed : true,
						style:'padding-left:20px;',
						hidden : true,
						collapsible : true,
						id : 'calendarPlanShow_history',
						autoHeight : true,
						items : CalendarPlanHandle_history_view
					}]
		});
		
		if (this.planId != null && this.planId != '' && this.planId != 'undefined' && this.planId != 'ext-gen2') {
			this.formPanel.loadData({
				url : __ctxPath + '/task/getHandleCalendarPlan.do?planId=' + this.planId,
				root : 'data',
				preName : 'calendarPlan',
				waitMsg : '正在载入数据...',
				success : function(response, options) {
					var thisObj = Ext.util.JSON.decode(response.responseText).data;
					
					//任务类型
					var taskType = thisObj.taskType;
					Ext.getCmp('view_calendarPlan.taskType').setValue(taskType);
					//任务类别
					var taskCategory = thisObj.taskCategory;
					Ext.getCmp('view_calendarPlan.taskCategory').setValue(taskCategory);
					//任务事项
					var taskBusiType = thisObj.taskBusiType;
					Ext.getCmp('view_calendarPlan.taskBusiType').setValue(taskBusiType);
					//执行方式
					var exectype = thisObj.execType;
					Ext.getCmp('view_calendarPlan_execType').setValue(exectype);
					//优先级
					var Urgent = thisObj.urgent;
					Ext.getCmp('view_handlePlan_urgent').setValue(Urgent);
					//开始时间
					var startTime = thisObj.startTime;
					Ext.getCmp('calendarPlan.startTime').setValue(startTime);
					//结束时间
					var completeTime = thisObj.completeTime;
					Ext.getCmp('calendarPlan.completeTime').setValue(completeTime);
					//提醒方式
					var remindWay = thisObj.remindWay;
					Ext.getCmp('view_calendarPlan.remindWay').setValue(remindWay);
					var indesxPeople =  thisObj.executor;//执行人(也就是被分配人)
					var secondPeople =  thisObj.assignerId;//分配人
					assignerIds =  thisObj.assignerId;//分配人
//					Ext.getCmp('CalendarPlanShowgrid').getStore().load({
//					params : {planId:thisObj.assignerId.toString()}
//					});
//					alert(indesxPeople +' '+secondPeople)
//					if(indesxPeople == secondPeople){
						Ext.getCmp('calendarPlanShow_history').show();
//					}
					var dealHResult = thisObj.dealHandleResult;
					var dealHReason = thisObj.dealHandleReason;
					Ext.getCmp("calendarPlanHandle_result_view").setValue(dealHResult);
					if (dealHReason != 'null'){
						Ext.getCmp("calendarPlanHandle_dreason_view").setValue(dealHReason);
					}else{
						Ext.getCmp("calendarPlanHandle_dreason_view").setValue('处理中');
					}
			},
				failure : function(form, action) {
					
				}
			});
		}
	}// end of the initcomponents
});
