addCalendarPlanForm = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		addCalendarPlanForm.superclass.constructor.call(this, {
			id : 'addCalendarPlanFormWin',
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
			buttons : [{
				text : '保存',
				iconCls : 'btn-save',
				handler : function() {
					$postForm({
						formPanel : Ext.getCmp('task_addCalendarPlan_Form'),
						scope : this,
						url : __ctxPath + '/task/saveCalendarPlan.do',
//						params : {
//							details : Ext.encode(rows),
//							linkManLines : Ext.encode(rows_link),
//							delContactLines : delContactLines,
//							delLinkLines : delLinkLines
//					    },
						callback : function(fp, action) {
							var calenarPlanGrid = Ext.getCmp('CalendarPlanGrid');
							var ToDoPlanGrid = Ext.getCmp('ToDoPlanGrid');
							if (calenarPlanGrid != null) {
								calenarPlanGrid.getStore().reload();
							}
							if(ToDoPlanGrid != null){
								Ext.getCmp('ToDoPlanGrid').getStore().reload();
							}
							var tabs = Ext.getCmp('centerTabPanel');
							tabs.remove('addCalendarPlanFormWin');
							this.destroy();
						}
					});
					

				}
			}, {
				text : '重置',
				iconCls : 'btn-reset',
				scope : this,
				handler : function() {
				Ext.getCmp('task_addCalendarPlan_Form').getForm().reset();
				}
			}, {
				text : '取消',
				iconCls : 'btn-cancel',
				handler : function() {
					var tab = Ext.getCmp('centerTabPanel');
					tab.remove('addCalendarPlanFormWin');
				}
			}]
		});
	},// end of the constructor
	// 初始化组件
	initUIComponents : function(_cfg) {
		
//       var linkStore =  new Ext.data.JsonStore({
////			autoLoad : true,
//			url : __ctxPath + '/system/comboByMapNameDictionary.do?Q_mapName_S_EQ=CONFX',
//			
//			fields : [ 'itemIndex', 'itemValue']
//		});
		this.formPanel = new Ext.FormPanel({
			layout : 'form',
			id : 'task_addCalendarPlan_Form',
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
								xtype : 'hidden',
								id : 'add_calendarPlan.taskType_id',
								name : 'calendarPlan.taskType'
							},{
								fieldLabel : '任务类型',
								xtype : 'mtdiccombo',
								id : 'add_calendarPlan.taskType',
								editable : false,
								lazyInit : true,
								itemKey : 'CONFX',
								forceSelection : false,
								triggerAction : 'all',
								readOnly:this.flag == 'show' ? true:false,
//								store :  linkStore,
//								displayField : 'itemValue',
//								valueField : 'itemIndex',
								anchor : '100%',
								listeners:{
									scope : this,
									'select':function(combo,record,index){
										if( index != 2){
											Ext.getCmp('task_addCalendarPlanForm_addForm_panel').show();
										}else{
											Ext.getCmp('task_addCalendarPlanForm_addForm_panel').hide();
										}
										var itemIndex = record.get('itemIndex');
										
										Ext.getCmp('add_calendarPlan.taskType_id').setValue(combo.value);
										AppUtil.getCascadeStore('CONFX', 
											Ext.getCmp('add_calendarPlan.taskType_id').getValue(), 
											'add_calendarPlan.taskCategory','CONTPJYLX');
									}
								}
							}]
							}, {
								items : [{
									xtype : 'hidden',
									id : 'add_calendarPlan.taskCategory_id',
									name : 'calendarPlan.taskCategory'
								},{
									fieldLabel : '任务类别',
									xtype : 'combo',
									id : 'add_calendarPlan.taskCategory',
									store : [['','']],
									displayField : 'itemValue',
									valueField : 'itemIndex',
									editable : false,
									lazyInit : true,
									allowBlank : false,
									forceSelection : false,
									triggerAction : 'all',
									anchor:'100%',
									readOnly:this.flag == 'show' ? true:false,
									listeners : {
										scope : this,
										'select' : function(combo, record,index) {
											var dicId = combo.value;
											Ext.getCmp('add_calendarPlan.taskCategory_id').setValue(combo.value);
											
											AppUtil.getCascadeStore('CONTPJYLX',
											Ext.getCmp('add_calendarPlan.taskCategory_id').getValue(), 
											'add_calendarPlan.taskBusiType','CONTPCLJG');
										}
									}
								}]
							}, {
								items : [{
									xtype : 'hidden',
									id : 'add_calendarPlan_taskBusiType_id',
									name : 'calendarPlan.taskBusiType'
								},{
									fieldLabel : '任务事项',
									xtype : 'combo',
									id : 'add_calendarPlan.taskBusiType',
									store : [['','']],
									displayField : 'itemValue',
									valueField : 'dicId',
									anchor : '100%',
									readOnly:this.flag == 'show' ? true:false,
									listeners : {
										scope : this,
										'select' : function(combo, record,index) {
											Ext.getCmp('add_calendarPlan_taskBusiType_id').setValue(combo.value);
										}
									}
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
								xtype : 'datefield',
								format : 'Y-m-d H:i:s',
								enableKeyEvents : true,
								readOnly:this.flag == 'show' ? true:false,
								anchor : '100%'
							}]
						}, {
							items : [{
								fieldLabel : '要求完成时间',
								name : 'calendarPlan.completeTime',
								xtype : 'datefield',
								format : 'Y-m-d H:i:s',
								readOnly:this.flag == 'show' ? true:false,
								anchor : '100%'
							}]
						},{
							items : [{
								fieldLabel : '执行方式',
								xtype : 'mtdiccombo',
								hiddenName : 'calendarPlan.execType',
								id : 'add_calendarPlan_execType',
								itemKey : 'LXFS001',
								readOnly:this.flag == 'show' ? true:false,
								anchor : '100%'
							}]
						}]
					},{
						layout : "column",
						xtype : 'panel',
						hidden:true,
						id:'task_addCalendarPlanForm_addForm_panel',
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
									id : 'add_calendarPlan.sponsor',
									hidden : true
								},{
									fieldLabel : '客户',
									name : 'calendarPlan.cusName',
									id : 'add_calendarPlan.cusName',
									xtype : 'textfield',
									anchor : '100%',
									allowBlank : true
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
									handler:function(){
										CusPersonalSelector.getView(function(customerId,nameCn){
											Ext.getCmp('add_calendarPlan.cusName').setValue(nameCn);
										},true).show();
									}
								   }
								]}
							 ]}, {
							items : [{
								fieldLabel : '联系人',
								xtype : 'textfield',
								anchor : '100%',
								name : 'calendarPlan.linkMan',
								id : 'add_calendarPlan.linkMan'
							}]
						}, {
							items : [{
								fieldLabel : '联系地址/号码',
								xtype : 'textfield',
								anchor : '100%',
								name : 'calendarPlan.numAddress',
								id : 'add_calendarPlan.numAddress'
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
								id : 'add_calendarPlan.urgent',
								itemKey : 'COM_YXJ',
								lazyInit : false,
								anchor : '100%'
							}]
						}, {
							items : [{
								xtype : 'checkbox',
								name : 'calendarPlan.showStyle',
								id : 'add_calendarPlan.showStyle',
								anchor : '100%',
								boxLabel : '放入日程',
								inputValue:1,
								autoShow : true
							}]
						},{
							items : [{
								xtype : 'checkbox',
								name : 'calendarPlan.remind',
								id : 'add_calendarPlan.remind',
								anchor : '100%',
								boxLabel : '提醒',
								inputValue:1,
								autoShow : true,
								listeners : {
								check: function(com, checked) {
									 var pan =  Ext.getCmp('calendarPlan.remindWaymtdiccombo');
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
						id:'calendarPlan.remindWaymtdiccombo',
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
									hiddenName : 'calendarPlan.remindWay',
									id : 'add_calendarPlan.remindWay',
									editable : false,
									anchor : '100%',
									itemKey : 'COM_TXFS',
									lazyInit : false,
									forceSelection : true
								}]
							}, {
								items : [{
									fieldLabel : '提醒时间',
									name : 'calendarPlan.remindTime',
									xtype : 'datefield',
									format : 'Y-m-d',
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
							    	id : 'add_calendarPlan.assignerId'
								},{
									fieldLabel : '负责人',
									name : 'calendarPlan.assignerName',
									id : 'add_calendarPlan.assignerName',
									xtype : 'textfield',
									anchor : '100%',
									readOnly  : true,
									allowBlank : false
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
									UserSelector.getView(
											function(userId,fullName) {
												Ext.getCmp('add_calendarPlan.assignerId').setValue(userId);
												Ext.getCmp('add_calendarPlan.assignerName').setValue(fullName);
										},false).show();
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
					Ext.getCmp('add_calendarPlan.taskType').setValue(taskType);
					
					//任务类别
					var taskCategory = thisObj.taskCategory;
					Ext.getCmp('add_calendarPlan_taskCategory').setValue(taskCategory);
					//任务事项
					var taskBusiType = thisObj.busiType;
					Ext.getCmp('add_calendarPlan_busiType').setValue(taskBusiType);
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
					var dealHResult = thisObj.dealHandleResult;
					var dealHReason = thisObj.dealHandleReason;
					
					var indesxPeople =  thisObj.executor;//执行人(也就是被分配人)
					var secondPeople =  thisObj.assignerId;//分配人
					//alert(secondPeople+"-----"+indesxPeople);
					if(indesxPeople == secondPeople){
						Ext.getCmp('calendarPlanShow_history').show();
					}
					
					Ext.getCmp("calendarPlanHandle_result").setValue(dealHResult);
					if (dealHReason != 'null'){
						Ext.getCmp("calendarPlanHandle_reason").setValue(dealHReason);
					}else{
						Ext.getCmp("calendarPlanHandle_reason").setValue(' ');
					}
					
					
			},
				failure : function(form, action) {
					
				}
			});
		};
//		linkStore.load({baseParams : {
//			'Q_itemIndex_S_EQ' : Ext.getCmp('add_calendarPlan.taskType_id').getValue()
//		}});
	},// end of the initcomponents

	/**
	 * 重置
	 * 
	 * @param {}
	 *            formPanel
	 */
	reset : function() {
		this.formPanel.getForm().reset();
	},
	/**
	 * 取消
	 * 
	 * @param {}
	 *            window
	 */
	cancel : function() {
		this.close();
	},
	/**
	 * 保存记录
	 */
	save : function() {
	}// end of save

});
