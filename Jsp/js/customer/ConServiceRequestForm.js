ConServiceRequestForm = Ext.extend(Ext.Panel,{
	//构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		//必须先初始化组件
		this.initUIComponents(_cfg);
		this.getTab();
		ConServiceRequestForm.superclass.constructor.call(this,{
			id : 'ConServiceRequestFormWin',
			layout : 'border',
			items : [this.formPanel, this.tabpanel],
			modal : true,
			height : 400,
			width : 500,
			maximizable : true,
			title : _cfg.flag == 'show' ?'服务请求详细信息':'服务请求处理',
			buttonAlign : 'center',
			buttons : _cfg.flag == 'show' ?[{
				text : __cancel,
				iconCls : 'btn-cancel',
				scope : this,
				handler : function(){
					var tabs = Ext.getCmp('centerTabPanel');
					var aForm = Ext.getCmp('ConServiceRequestFormWin');
					tabs.remove(aForm);
				}
			}] :[{
				text : __save,
				iconCls : 'btn-save',
				scope : this,
				handler : this.save
			}, {
				text : __reset,
				iconCls : 'btn-reset',
				scope : this,
				handler : this.reset
			}, {
				text : __cancel,
				iconCls : 'btn-cancel',
				scope : this,
				handler : function(){
					var tabs = Ext.getCmp('centerTabPanel');
					var aForm = Ext.getCmp('ConServiceRequestFormWin');
					tabs.remove(aForm);
				}
			}]
		});
	},//end of the constructor
	//初始化组件
	initUIComponents : function(_cfg) {
		this.formPanel = new Ext.FormPanel({
			layout : 'form',
			bodyStyle : 'padding:10px',
			border : false,
			region : 'north',
			height : 230,
			labelAlign : 'right',
			autoScroll : true,
//			id : 'con_ConServiceRequestForm_form',
			defaults : {
				anchor : '96%,96%'
			},
			items : [{
						name : 'conServiceRequest.serviceRequestId',
						id : 'con_ServiceRequest.serviceRequestId',
						xtype : 'hidden',
						value : this.serviceRequestId == null
								? ''
								: this.serviceRequestId
					},
					{
						layout : 'column',
						border : false,
						items : [{
							layout : 'form',
							border : false,
							columnWidth : .33,
							items : [{
								fieldLabel : '客户编号',
								name : 'conServiceRequest.customerNo',
								id : 'con_ServiceRequest.customerNo',
								xtype : 'textfield',
								readOnly: true ,
								anchor : '100%'
							},{
								fieldLabel : '客户Id',
								name : 'conServiceRequest.cusId',
								id : 'con_ServiceRequest.cusId',
								xtype : 'hidden',
								readOnly: true ,
								anchor : '100%'
							},
							{
								fieldLabel : '紧急程度',
								name : 'conServiceRequest.urgent',
								id : 'con_ServiceRequest.urgent',
								xtype : 'mtdiccombo',
								readOnly: _cfg.flag == 'show' ?true:false,
								itemKey : 'COM_YXJ',
								anchor : '100%'
							}]
						},
						{
							layout : 'form',
							border : false,
							columnWidth : .33,
							items : [{
								fieldLabel : '联系方式',
								name : 'conServiceRequest.linkType',
								id : 'con_ServiceRequest.linkType',
								xtype : 'mtdiccombo',
								readOnly : true,
								itemKey : 'LXFS001',
								anchor : '100%'
							},
							{
								fieldLabel : '服务类型',
								name : 'conServiceRequest.type',
								id : 'con_ServiceRequest.type',
								xtype : 'mtdiccombo',
								readOnly : true,
								itemKey : 'CONTPJYLX',
								anchor : '100%'
							}]
						},
						{
							layout : 'form',
							border : false,
							columnWidth : .333,
							items : [{
								fieldLabel : '号码/地址',
								name : 'conServiceRequest.callNo',
								xtype : 'textfield',
								readOnly: true ,
								anchor : '100%'
							},{
								fieldLabel : '请求事项',
								name : 'conServiceRequest.busType',
								id : 'con_ServiceRequest.busType',
								xtype : 'mtdiccombo',
								readOnly: _cfg.flag == 'show' ?true:false,
								itemKey : 'CONTPCLJG',
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
								fieldLabel : '请求时间',
								name : 'conServiceRequest.acceptDate',
								id : 'con_ServiceRequest.acceptDate',
								xtype : 'datefield',
								readOnly: true,
								format : 'Y-m-d H:i:s',
								anchor : '100%'
							}]
						},
						{
							layout : 'form',
							border : false,
							columnWidth : .33,
							items : [{
								fieldLabel : '要求完成时间',
								name : 'conServiceRequest.starttime',
								xtype : 'datefield',
								readOnly: _cfg.flag == 'show' ?true:false,
								format : 'Y-m-d H:i:s',
								anchor : '100%'
							}]
						},
						{
							layout : 'form',
							border : false,
							columnWidth : .33,
							items : [{
								fieldLabel : '完成时间',
								name : 'conServiceRequest.endtime',
								xtype : 'datefield',
								readOnly: true,
								format : 'Y-m-d H:i:s',
								anchor : '100%'
							}]
						}]
					},
					{
						fieldLabel : '内容',
						name : 'conServiceRequest.content',
						xtype : 'textarea',
						maxLength : 500,
						anchor : '95%',
						height : 80
					},
					{
						layout : 'column',
						border : false,
						items : [{
								layout : 'form',
								border : false,
								columnWidth : .33,
								items : [{
									fieldLabel : '受理人',
									name : 'conServiceRequest.accept',
									xtype : 'textfield',
									anchor : '100%'
								}]
							},
							{
								layout : 'form',
								border : false,
								columnWidth : .33,
								items : [{
									fieldLabel : '状态',
									name : 'conServiceRequest.status',
									id : 'con_ServiceRequest.status',
									xtype : 'mtdiccombo',
									readOnly: _cfg.flag == 'show' ? true:false,
									itemKey : 'CON_REQ_STATUS',
									anchor : '100%'
								}]
							},
							{
								layout : 'form',
								border : false,
								columnWidth : .33,
								items : [{
									fieldLabel : '子状态',
									name : 'conServiceRequest.substatus',
									id : 'con_ServiceRequest.substatus',
									xtype : 'mtdiccombo',
									readOnly: _cfg.flag == 'show' ?true:false,
									itemKey : 'CON_REQ_SUBSTATUS',
									anchor : '100%'
								}]
							}]
					}]
		});
		//加载表单对应的数据	
		if (_cfg.serviceRequestId != null && _cfg.serviceRequestId != 'undefined') {
			this.formPanel.loadData({
				url : __ctxPath + '/customer/getConServiceRequest.do?serviceRequestId=' + this.serviceRequestId,
				root : 'data',
				preName : 'conServiceRequest',
				success : function(response, options) {
					var thisObj = Ext.util.JSON.decode(response.responseText).data;
					if(thisObj.customer!=null){
						if(thisObj.customer.customerNo!=null){
							Ext.getCmp('con_ServiceRequest.customerNo').setValue(thisObj.customer.customerNo);
							Ext.getCmp('con_ServiceRequest.cusId').setValue(thisObj.customer.customerId);
						}
					}
					Ext.getCmp('con_ServiceRequest.linkType').setValue(thisObj.linkType);
					Ext.getCmp('con_ServiceRequest.busType').setValue(thisObj.busType);
					Ext.getCmp('con_ServiceRequest.type').setValue(thisObj.type);
					Ext.getCmp('con_ServiceRequest.urgent').setValue(thisObj.urgent);
					Ext.getCmp('con_ServiceRequest.status').setValue(thisObj.status);
					Ext.getCmp('con_ServiceRequest.substatus').setValue(thisObj.substatus);
				},
				failure : function() {
					Ext.ux.Toast.msg('操作提示','对不起，数据加载失败！');
				}
			});
			var cusIdOne = Ext.getCmp('con_ServiceRequest.cusId').getValue();
			if (cusIdOne != null && cusIdOne != 'undefined' && cusIdOne != '' && cusIdOne != -1) {
			Ext.getCmp('C_CustomerData_Form').loadData({
				url : __ctxPath + '/customer/getCusPersonal.do?customerId=' + cusIdOne,
				root : 'data',
				preName : 'customer',
				success : function(response, options) {
					var thisObj = Ext.util.JSON.decode(response.responseText).data;
					if(thisObj != null){
						Ext.getCmp('customer.credTypId_form').setValue(GGZJLX.get(thisObj.credTypId));
						Ext.getCmp('customer.gender_form').setValue(XB001.get(thisObj.gender));
//						Ext.getCmp('cusPersonalCallin.gender_hid').setValue(thisObj.gender);
						Ext.getCmp('customer.cusGraId_form').setValue(CONKHJB.get(thisObj.cusGraId));
//						Ext.getCmp('cusPersonal.cusGraId_hid').setValue(thisObj.cusGraId);
						Ext.getCmp('customer.cusFromId_form').setValue(CONKHLY.get(thisObj.cusFromId));
						
					}
					
				},
				failure : function(response, options) {
					Ext.ux.Toast.msg('操作信息', '操作出错，请联系管理员！');
				}
			});
			}
		}

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
		var subStatus = Ext.getCmp('con_ServiceRequest.substatus').getValue();
		if (subStatus == '处理中'){
			subStatus = 11;
		}else if (subStatus == '完成'){
			subStatus = 20;
		}else if (subStatus == '取消'){
			subStatus = 21;
		}
		var status = Ext.getCmp('con_ServiceRequest.status').getValue();
		if (status == '处理中'){
			status = 1;
		}else if (status == '已结案'){
			status = 2;
		}
		var serviceRequestId = Ext.getCmp('con_ServiceRequest.serviceRequestId').getValue();
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
				var aForm = Ext.getCmp('ConServiceRequestFormWin');
				if (aForm != null) {
					tabs.remove('ConServiceRequestFormWin');
				}
			}
		});
	},//end of save
	getTab : function() {
		var gridPanel_renwu = new HT.GridPanel({
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
			url : __ctxPath + "/task/listByServiceIdCalendarPlan.do",
			baseParams : {
				serviceId : this.serviceRequestId
			},
			fields : [{
				name : 'planId',
				type : 'int'
			},'taskTitle','taskCategory', 'status', 'startTime', 'endTime',
			'userId', 'content', 'fullname','effeciency',
			'assignerName', 'taskBusiType','taskType','completeTime'],
			columns : [{
				header : '内码',
				dataIndex : 'planId',
				hidden : true
			}, {
				header : '标题',
				isExp : false,
				dataIndex : 'taskTitle'
			}, {
				header : '任务类型',
				isExp : false,
				dataIndex : 'taskType',
				renderer : function(value) {
					return CONFX.get(value);
				}
			}, {
				header : '任务类别',
				isExp : false,
				dataIndex : 'taskCategory',
				renderer : function(value) {
					return CONTPJYLX.get(value);
				}
			}, {
				header : '任务事项',
				isExp : false,
				dataIndex : 'taskBusiType',
				renderer : function(value) {
					return CONTPCLJG.get(value);
				}
			}, {
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
			}, {
				header : '状态',
				isExp : false,
				dataIndex : 'status',
				renderer:function(value){
						if(value!=null || value!=""){
							return CON_REQ_STATUS.get(value);
						}else{
							return '';
						}
				}
			}, {
					header : '管理',
					dataIndex : 'planId',
					width : 40,
					sortable : false,
					renderer : function(value, metadata, record, rowIndex, colIndex) {
						var editId = record.data.planId;
						var status=record.data.status;
						var assignerId=record.data.assignerId;
						var str = '&nbsp;<button title="查看" value=" " class="btn-readdocument" onclick="ConServiceRequestForm.edit('+ editId + ')"></button>';
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
			url : __ctxPath + "/customer/listByServiceIdConHis.do",
			baseParams : {
				serviceId : this.serviceRequestId
			},
			fields : [{
				name : 'conHisId',
				type : 'int'
			},  'contactTypeId', 'dirId',
			'staTime', 'owner', 'busTypId',
			'conResId', 'dealStaId'],
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
				}})
		]
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
		this.tabpanel = new Ext.TabPanel({
			activeTab : 0,
			region : 'center',
			items : [
//				{
//				title : '客户档案',
//				border : false,
//				layout : 'fit',
//				items : [
//				new CustomerDetailForm()
//					new Ext.form.FormPanel({
//					layout : 'form',
//					border : false,
//					id : 'C_CustomerData_Form',
//					items : [{
//						layout : "column",
//						xtype : 'container',
//						style : 'padding:10px',
//						defaults : {
//							border : false,
//							anchor : '100%,100%'
//						},
//						items : [{
//							columnWidth : .5,// 第1列
//							layout : "form",
//							labelAlign : 'right',
//							labelWidth : 70,
//							anchor : '100%',
//							items : [{
//									fieldLabel : '客户号',
//									xtype : 'textfield',
//									name : 'customer.customerNo',
//									id : 'customer.customerNo_form',
//									allowBlank : false,
//									editable : false,
//									readOnly : true,
//									maxLength : 128,
//									anchor : '100%'
//								},
//								{
//									fieldLabel : '证件类型',
//									xtype : 'textfield',
//									name : 'customer.credTypId',
//									id : 'customer.credTypId_form',
//									editable : false,
//									lazyInit : false,
//									itemKey : 'GGZJLX',
//									forceSelection : false,
//									readOnly : true,
//									anchor : '100%'
//								},
//								{
//									xtype : 'hidden',
//									id : 'customerCallin.gender_hid'
//								},
//								{
//									fieldLabel : '性别',
//									xtype : 'mtdiccombo',
//									name : 'customer.gender',
//									id : 'customer.gender_form',
//									editable : false,
//									lazyInit : false,
//									forceSelection : false,
//									readOnly : true,
//									itemKey : 'XB001',
//									anchor : '100%'
//								},
//								{
//									layout : 'column',
//									border : false,
//									items : [{
//										columnWidth : .7,
//										border : false,
//										layout : 'form',
//										labelWidth : 70,
//										labelAlign : 'right',
//										items : [{
//											xtype : 'datefield',
//											fieldLabel : '出生日期',
//											name : 'customer.birthday',
//											id : 'customer.birthday_baseForm',
//											readOnly : true,
//											format : 'Y-m-d'
//										}]
//									},
//									{
//										columnWidth : .15,
//										xtype : 'radio',
//										name : 'customer.birthdayType',
//										readOnly : true,
//										boxLabel : '阴历',
//										inputValue : 1
//
//									},
//									{
//										columnWidth : .15,
//										xtype : 'radio',
//										name : 'customer.birthdayType',
//										readOnly : true,
//										boxLabel : '阳历',
//										inputValue : 2
//
//									}]
//								},
//								{
//									layout : 'column',
//									border : false,
//									style : 'margin-left:70px',
//									items : [{
//										columnWidth : .3,
//										xtype : 'checkbox',
//										name : 'customer.isMail',
//										readOnly : true,
//										boxLabel : '发送邮件',
//										autoShow : true
//									},
//									{
//										columnWidth : .3,
//										xtype : 'checkbox',
//										name : 'customer.happyCall',
//										readOnly : true,
//										boxLabel : 'happy_call',
//										autoShow : true
//									},
//									{
//										columnWidth : .3,
//										xtype : 'checkbox',
//										name : 'customer.isDm',
//										readOnly : true,
//										boxLabel : '来电与否',
//										autoShow : true
//									}]
//								}]
//							},
//							{
//								columnWidth : .5,// 第2列
//								layout : "form",
//								labelAlign : 'right',
//								labelWidth : 70,
//								items : [{
//									fieldLabel : '客户姓名',
//									name : 'customer.nameCn',
//									id : 'customer.nameCn_form',
//									xtype : 'textfield',
//									readOnly : true,
//									editable : false,
//									maxLength : 128,
//									anchor : '100%'
//								},
//								{
//									fieldLabel : '证件号码',
//									xtype : 'textfield',
//									name : 'customer.credNum',
//									readOnly : true,
//									editable : false,
//									maxLength : 128,
//									anchor : '100%'
//								},
//								{
//									xtype : 'hidden',
//									id : 'customer.cusGraId_hid'
//								},
//								{
//									fieldLabel : '客户等级',
//									xtype : 'mtdiccombo',
//									name : 'customer.cusGraId',
//									id : 'customer.cusGraId_form',
//									editable : false,
//									lazyInit : false,
//									forceSelection : true,
//									readOnly : true,
//									itemKey : 'CONKHJB',
//									anchor : '100%'
//								},
//								{
//									fieldLabel : '来源',
//									xtype : 'mtdiccombo',
//									name : 'customer.cusFromId',
//									id : 'customer.cusFromId_form',
//									editable : false,
//									lazyInit : false,
//									forceSelection : false,
//									readOnly : true,
//									itemKey : 'CONLYLB',
//									anchor : '100%'
//								}]
//							}]
//							}]
//						})
//				]
//					},
			{
				title : '任务事件',
				border : false,
				layout : 'fit',
				items : [gridPanel_renwu]
			},
			{
				title : '联络历史',
				border : false,
				layout : 'fit',
				items : [gridPanel_lianluolishi]
			}
//			,{
//						title : '电子工单',
//						border : false,
//						layout : 'fit',
//						items : [gridPanel_gongdan]
//					}
			]
				});
			},
//查看
	editRs : function(record) {
		var tabs = Ext.getCmp('centerTabPanel');
		var aForm = Ext.getCmp('ConHisFormWin');
		if (aForm != null||aForm != undefined) {
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
		case 'btn-readdocument':
			this.editRs.call(this, record);
			break;
		default:
			break;
		}
	}
});
ConServiceRequestForm.edit = function(id) {
	var tabs = Ext.getCmp('centerTabPanel');
	var aForm = Ext.getCmp('TASK_CalendarPlanFormViewWin');
	if (aForm != null) {
		tabs.remove('TASK_CalendarPlanFormViewWin');
	}
	aForm = new CalendarPlanFormView({
		planId : id,
		flag:'show'
	});
	tabs.add(aForm);
	tabs.activate(aForm);
}


