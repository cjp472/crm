var indexin = 2;
YXtaskActionForm.HeiMingDan = function(cusId,cusName) {
	var topbar_contact = new Ext.Toolbar({
				items : ['->', {
							iconCls : 'btn-del',
							text : '删除',
							xtype : 'button',
							handler : function() {
										var store = Ext.getCmp('ConWwListTimeRul').getStore();
										var sm = Ext.getCmp('ConWwListTimeRul').getSelectionModel();
										var cell = sm.getSelections();
										if (cell.length < 1) {
											Ext.ux.Toast.msg('提示信息', '请至少选择一条记录!');
										} else {
											store.remove(cell);
										}
									}
						}, '->', {
							iconCls : 'btn-add',
							text : '添加',
							xtype : 'button',
							handler : function() {
										var store = gridPanel.getStore();
										var recordType = store.recordType;
										store.add(new recordType({})); // 添加一行空store
									}
						}]
			});

	var gridPanel = new HT.EditorGridPanel({             
		region : 'center',
		tbar : topbar_contact,
		showPaging : false,
		height : 100,
		scrollHeight : true,
		clicksToEdit : 1,
		id : 'ConWwListTimeRul',
//		url : __ctxPath
//				+ "/customer/listConBwListTimeRul.do?Q_conBwList.bwId_L_EQ=",
		fields : [{
					name : 'bwListTimeRulId',
					type : 'int'
				},'staDate','endDate', {
					name : 'staTime',
					type : 'date',
					dateFormat : 'H:i:s'
				}, {
					name : 'endTime',
					type : 'date',
					dateFormat : 'H:i:s'
				}],
		columns : [{
					header : '内码',
					id : 'ConWwListForm.bwListTimeRulId',
					hidden : true,
					dataIndex : 'bwListTimeRulId'
				}, {
					header : '开始日期',
					id : 'ConWwListForm.staDate',
					dataIndex : 'staDate',
					xtype : 'datecolumn', // 使用xtype代替渲染器 use xtype
					// instead of renderer
					format : 'Y-m-d',// configuration property for
					// Ext.grid.DateColumn
					editor : new Ext.form.DateField({
								format : 'Y-m-d',
								editable : false
							})
				}, {
					header : '开始时间',
					id : 'ConWwListForm.staTime',
					dataIndex : 'staTime',
					editor : new Ext.grid.GridEditor(new Cls.form.DateTimeField(
							{
								format : 'H:i:s',
								editable : false
							})),
					renderer : function(value) {
						if (value instanceof Date) {
							return new Date(value).format('H:i:s');
						} else {
							return value;
						}
					}
				}, {
					header : '结束日期',
					id : 'ConWwListForm.endDate',
					dataIndex : 'endDate',
					xtype : 'datecolumn',
					format : 'Y-m-d',
					editor : new Ext.form.DateField({
								format : 'Y-m-d',
								editable : false
							})
				}, {
					header : '结束时间',
					id : 'ConWwListForm.endTime',
					dataIndex : 'endTime',
					editor : new Ext.grid.GridEditor(new Cls.form.DateTimeField(
							{
								format : 'H:i:s',
								editable : false
							})),
					renderer : function(value) {
						if (value instanceof Date) {
							return new Date(value).format('H:i:s');
						} else {
							return value;
						}
					}
				}]
			// end of columns
	});
	var gridPanel_contact = new HT.GridPanel({
		height : 80,
		layout : 'fit',
		showPaging : false,
		id : 'UlContactGrid_hmd',
		url : __ctxPath + "",                       
		fields : [{
					name : 'contactId',
					type : 'int'
				}, 'contactTypeId', 'mainContactNum', 'status'],
		columns : [{
					header : 'contactId',
					dataIndex : 'contactId',
					hidden : true
				},{
					header : '联络方式',
					dataIndex : 'contactTypeId',
					isExp : false
				}, {
					header : '地址/号码',
					isExp : false,
					dataIndex : 'mainContactNum'
				}, {
					header : '状态',
					isExp : false,
					dataIndex : 'status'
				}]
			// end of columns
		});
				//**加载联系方式数据
		var store = Ext.getCmp('UlContactGrid_hmd').getStore();
		var recordType = store.recordType;
		Ext.getCmp('UlContactGrid_empl_lxfs_AF').getStore().each(function(record){
			store.add(new recordType({
				contactId : record.data.contactId,
				contactTypeId : record.data.contactTypeId,
				mainContactNum : record.data.mainContactNum,
				status : record.data.statusId
			}));
		});
//		var store = Ext.getCmp('UlContactGrid_hmd').getStore();
//		var recordType = store.recordType;
//		store.add(new recordType({
//					'contactTypeId' : LXFS001.get(1),
//					'mainContactNum':CusPersonalFormCallnumber,
//					'status':CONZT.get(1)
//				})); 
		
	var formPanel = new Ext.FormPanel({            
		// TODO panel总面板
		id : 'ConWwListForm.BMDPanel',
		region : 'center',
		layout : 'form',
		labelWidth : 70,
		labelAlign : 'right',
		style : 'padding:10px;background-color:#fff',
		border : false,
		url : __ctxPath + '/customer/saveMostConBwList.do?',
		defualts : {
			padding : '5px 0 5px 0'
		},
		plain : true,
		items : [{
				name : 'conBwList.bwId',
				xtype : 'hidden',
				value : this.bwId == null ? '' : this.bwId
			}, {
				name : 'conBwList.bwTypId',
				xtype : 'hidden',
				value : 1
			}, {
				name : 'conBwList.contactTypeId',
				xtype : 'hidden'
			},{
			border : false,
			layout : 'column',
			items : [{
				columnWidth : .5,
				layout : 'form',
				border : false,
				items : [{
						xtype : 'hidden',
						name : 'conBwList.objTypId',
						id : 'conBwList.objTypId_hid',
						value : '2'
					}, {
					fieldLabel : '类型',
					id : 'conBwList.objTypId_form',
					xtype : 'combo',
					anchor : '100%',
					mode : 'local',
					triggerAction : 'all',
					allowBlank : false,
					value : '联系方式',
					store : [['1', '联系方式'], ['0', '客户']],
					listeners : {
						'select' : function(combo, record, index) {
						indexin = index;
							if (index == 0) {
								Ext.get('lianxifangshi').dom.style.display = 'block';
								Ext.get('kehu').dom.style.display = 'none';
								Ext.getCmp('UlContactGrid_hmd').doLayout();
								Ext.getCmp('conBwList.objTypId_hid').setValue('2');
							} else {
								Ext.get('lianxifangshi').dom.style.display = 'none';
								Ext.getCmp('conBwList.objTypId_hid').setValue('1');
							}
//							Ext.getCmp('conBwList.objTypId_hid').setValue(combo.value);
						}
					}
				}]
			}, {
				columnWidth : .5,
				layout : 'form',
				border : false,
				items : [{
							layout : 'column',
							border : false,
							items : [{
										layout : 'form',
										border : false,
										columnWidth : .9,
										items : [{
														xtype : 'hidden',
														name : 'conBwList.customer.customerId',
														id : 'conBwList.customer.customerId',
														anchor : '100%',
														value : cusId
													}, {
													xtype : 'textfield',
													fieldLabel : '客户',
													name : 'conBwList.customer.customerName',
													id : 'conBwList.customer.customerName',
													readOnly : true,
													anchor : '100%',
													value : cusName
												}]
									}
//									, {
//										columnWidth : .1,
//										xtype : 'button',
//										iconCls : 'btn-search',
//										handler : function() {
//												CustomerSelector.getView(function(customerId,customerName){
//													Ext.getCmp('conBwList.customer.customerId').setValue(customerId);
//													Ext.getCmp('conBwList.customer.customerName').setValue(customerName);
//												},true).show();
//											}
//									}
									]

						}]
			}]
		}, {
			xtype : 'fieldset',
			title : "联系方式",
			collapsed : false,
			collapsible : true,
			id : 'lianxifangshi',
			autoHeight : true,
			items : gridPanel_contact
		}, {
			xtype : 'fieldset',
			title : "时间限制",
			collapsed : false,
			collapsible : true,
			autoHeight : true,
			defaults : {
				anchor : '100%,100%'
			},
			items : gridPanel
		}, {
			border : false,
			layout : 'column',
			items : [{
						columnWidth : .5,
						layout : 'form',
						border : false,
						items : [{
									xtype : 'hidden',
									name : 'conBwList.applyReaId',
									id : 'conWwListForm.applyReaId_hid'
								},{
									fieldLabel : '申请原因',
									id : 'conWwListForm.applyReaId_form',
									xtype : 'mtdiccombo',
									forceSelection : false,
									editable : false,
									lazyInit : true,
									mode : 'local',
									allowBlank : false,
									itemKey : 'CONSQYY',
									anchor : '100%',
									listeners : getDicListeners('conWwListForm.applyReaId_form','conWwListForm.applyReaId')
								}]
					}]
		}, {
			fieldLabel : '申请说明',
			name : 'conBwList.applyRemark',
			xtype : 'textarea',
			anchor : '100%',
			allowBlank : false,
			maxLength : 120
		}, {
			border : false,
			layout : 'column',
			items : [{
						columnWidth : .5,
						layout : 'form',
						border : false,
						items : []
					}, {
						columnWidth : .5,
						layout : 'form',
						border : false,
						items : []
					}]
		}
//		, {
//			xtype : 'hidden',
//			name : 'conBwList.dealTypId',
//			id : 'conWwListForm.dealTypId_hid'
//		}, {
//			border : false,
//			layout : 'column',
//			items : [{
//						columnWidth : .5,
//						layout : 'form',
//						border : false,
//						items : [{
//										xtype : 'hidden',
//										name : 'conBwList.dirId',
//										id : 'conWwListFormJiaRu.dirId_hid'
//									},{
//									xtype : 'mtdiccombo',
//									id : 'conWwListFormJiaRu.dirId_form',
//									name : 'dirId',
//									editable : false,
//									lazyInit : false,
//									forceSelection : false,
//									itemKey : 'CONFX',
//									fieldLabel : "禁呼范围",
//									allowBlank : false,
//									anchor : '100%',
//									listeners : getDicListeners('conWwListFormJiaRu.dirId_form','conWwListFormJiaRu.dirId')
//								}]
//					}, {
//						columnWidth : .5,
//						layout : 'form',
//						border : false,
//						items : [{
//						xtype : 'hidden',
//						name : 'conBwList.dealTypId',
//						id : 'conWwListForm.dealTypId_hid'
//					},{
//									xtype : 'mtdiccombo',
//									id:'conWwListForm.dealTypId_form',
//									name : 'dealTypId',
//									editable : false,
//									lazyInit : false,
//									forceSelection : false,
//									itemKey : 'CONWWCL',
//									fieldLabel : "处理方式",
//									allowBlank : false,
//									anchor : '100%',
//									listeners : getDicListeners('conWwListFormJiaRu.dirId_form','conWwListFormJiaRu.dirId')
//								}]
//					}]
//		}
		]
	});
	
	var win = new Ext.Window({
				id : 'HeiMingDanWin',
				title : '黑名单申请',
				iconCls : 'menu-appuser',
				width : 800,
				height : 540,
				layout : 'fit',
				border : false,
				maximizable : true,
				resizable : true,
				modal : true,
				items : formPanel,
				buttonAlign : 'center',
				buttons : [{
							text : __save,
							iconCls : 'btn-save',
							handler : function() {
								var customerId = Ext.getCmp('conBwList.customer.customerId').getValue();
								var typeFlag =indexin;
								if(typeFlag==1){
									if(customerId==-1){
										Ext.ux.Toast.msg('操作提示', '请选择客户信息后再加入黑名单！');
										return false;
									}
								}
								var editstore = Ext.getCmp('ConWwListTimeRul').getStore();
								var flagtime = true;
								editstore.each(function(record){
								    var staDate = record.get('staDate');
								    var staNum = new String(staDate);
									var staTime = record.get('staTime');
									var endDate = record.get('endDate');
									var endTime = record.get('endTime');
									if(staDate != null && staDate != ""){
										if(endDate == null || endDate == ""){
											Ext.ux.Toast.msg('操作提示', '开始日期与结束日期必须同时存在！');
											flagtime = false;
											return false;
											
										}
									}else if(endDate != null && endDate != ""){
										Ext.ux.Toast.msg('操作提示', '开始日期与结束日期必须同时存在！');
										flagtime = false;
										return false;
									}
								
									if(staTime != null && staTime != ""){
										if(endTime == null || endTime == ""){
											Ext.ux.Toast.msg('操作提示', '开始时间与结束时间必须同时存在！');
											flagtime = false;
											return false;
										}
									}else if(endTime != null && endTime != ""){
										Ext.ux.Toast.msg('操作提示', '开始时间与结束时间必须同时存在！');
										flagtime = false;
										return false;
									}
								});
								if(flagtime == false){
									return;
								}
								
								// 将行信息从grid中取出并放入rows变量中
								var store = gridPanel.getStore();
								var rows = [];// 定义数组
								for (var i = 0; i < store.getCount(); i++) { // store.getCount()为store的长度
									if(store.getAt(i).get('staDate')!=null || store.getAt(i).get('staTime')!=null || store.getAt(i).get('endDate')!=null || store.getAt(i).get('endTime')!=null){
										// 放到数组里
										rows.push(store.getAt(i).data);
									}
									
								}
								
								var dataHMD =Ext.getCmp('UlContactGrid_hmd').getSelectionModel().getSelections();
								var rootlist = '';
								for(var i=0; i<dataHMD.length; i++){
									rootlist = rootlist + dataHMD[i].data.contactTypeId + ',';
									rootlist = rootlist + dataHMD[i].data.mainContactNum + ';';
								}
								
								var conform = Ext.getCmp('ConWwListForm.BMDPanel');
								if(conform.getForm().isValid()){
									if(customerId != -1){
										Ext.Ajax.request({
											method : 'post',
											url : __ctxPath + '/customer/getMessageByCusIdConBwList.do?',
											params : {
												customerId : cusId
											},
											success : function(response) {
												var result = Ext.util.JSON.decode(response.responseText);
												if(result.success==false){
													Ext.Msg.confirm('确认信息', '该客户已加入黑名单，是否确认继续申请？', function(btn) {
														if (btn=='yes') {
															conform.getForm().submit({
																params : {
																	details : Ext.encode(rows),
																	root: rootlist
//																	//外呼不存在服务请求和任务
//																	,serviceId : arr[3],
//																	planId : arr[4]
																},
																success : function(response) {
																		Ext.ux.Toast.msg('操作信息', '申请成功，请等待审核！');
																		Ext.getCmp('HeiMingDanWin').close();
																},
																failure : function(form, o) {
																	if (o.result.success==false) {
																		Ext.ux.Toast.msg('提示信息', o.result.msg);
																	}
																}
															});
														}
													})
												}else{
													conform.getForm().submit({
														params : {
															details : Ext.encode(rows),
															root: rootlist
//															//外呼不存在服务请求和任务
//															,serviceId : arr[3],
//															planId : arr[4]
														},
														success : function(response) {
																Ext.ux.Toast.msg('操作信息', '申请成功，请等待审核！');
																Ext.getCmp('HeiMingDanWin').close();
														},
														failure : function(form, o) {
															if (o.result.success==false) {
																Ext.ux.Toast.msg('提示信息', o.result.msg);
															}
														}
													});
												}
											},
											failure : function(request) {
												Ext.ux.Toast.msg('操作信息',
													'设置出错，请联系管理员!');
											}
									})
								}else{
									conform.getForm().submit({
										params : {
											details : Ext.encode(rows),
											root: rootlist
//											//外呼不存在服务请求和任务
//											,serviceId : arr[3],
//											planId : arr[4]
										},
										success : function(response) {
												Ext.ux.Toast.msg('操作信息', '申请成功，请等待审核！');
												Ext.getCmp('HeiMingDanWin').close();
										},
										failure : function(form, o) {
											if (o.result.success==false) {
												Ext.ux.Toast.msg('提示信息', o.result.msg);
											}
										}
									});
								}
							}
							
							}
						}, {
							text : __reset,
							iconCls : 'btn-reset',
							handler : function() {
										formPanel.getForm().reset();
									}
						}, {
							text : __cancel,
							iconCls : 'btn-cancel',
							handler : function() {
										Ext.getCmp('HeiMingDanWin').close();
									}
						}]
			})
	win.show();
}