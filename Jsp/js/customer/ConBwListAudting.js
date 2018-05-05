/**
 * @description 分配放弃的请求
 * @class UserSelector
 * @author 优创融联科技
 * @updater cyy
 * @createtime
 */
ConBwListAudting = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		ConBwListAudting.superclass.constructor.call(this, {
					id : 'ConBwListAudtingWin',
					title : '黑名单审核',
					iconCls : 'menu-appuser',
					width : 800,
					height : 540,
					layout : 'fit',
					border : false,
					maximizable : true,
					resizable : true,
					modal : true,
					// items : [ this.formPanel, this.gridPanel ],
					items : this.formPanel,
					buttonAlign : 'center',
					buttons : [{
						text : __save,
						iconCls : 'btn-save',
						scope : this,
						handler : this.save
							// }, {
							// text : __reset,
							// iconCls : 'btn-reset',
							// scope : this,
							// handler : this.reset
						}, {
						text : '关闭',
						iconCls : 'btn-cancel',
						scope : this,
						handler : this.cancel
					}]
				});

	},
	// BUTTON区域：
	addNewLine : function() {
		var store = this.gridPanel.getStore();
		var recordType = store.recordType;
		store.add(new recordType({})); // 添加一行空store
	},
	// 把选中ID删除
	removeSelRs : function() {
		var store = this.gridPanel.getStore();
		var sm = this.gridPanel.getSelectionModel();
		var cell = sm.getSelections();
		if (cell.length < 1) {
			Ext.ux.Toast.msg('提示信息', '请至少选择一条记录!');
		} else {
			store.remove(cell);
		}
	},
	/**
	 * 组件初始化
	 * 
	 * @param isSingle
	 *            是否单选,默认单选
	 */
	initUIComponents : function() {

		this.topbar_contact = new Ext.Toolbar({
					items : ['->', {
								iconCls : 'btn-del',
								text : '删除',
								xtype : 'button',
								scope : this,
								handler : this.removeSelRs
							}, '->', {
								iconCls : 'btn-add',
								text : '添加',
								xtype : 'button',
								scope : this,
								handler : this.addNewLine
							}]
				});

		var bwId = this.bwId ? this.bwId : -1; // 主表Id
		this.gridPanel = new HT.GridPanel({
			region : 'center',
			// tbar : this.topbar_contact,
			height : 150,
			scrollHeight : true,
			showPaging : false,
			// clicksToEdit : 1,
			id : 'ConBwListAudtingGrid',
			url : __ctxPath
					+ "/customer/listConBwListTimeRul.do?Q_conBwList.bwId_L_EQ="
					+ bwId,
			fields : [{
						name : 'bwListTimeRulId',
						type : 'int'
					}, {
						name : 'staDate',
						type : 'date',
						dateFormat:'Y-m-d'
					}, {
						name : 'endDate',
						type : 'date',
						dateFormat:'Y-m-d'
					}, {
						name : 'staTime',
						type : 'date',
						dateFormat:'H:i:s'
					}, {
						name : 'endTime',
						type : 'date',
						dateFormat:'H:i:s'
					}],
			columns : [{
						header : '内码',
						id : 'ConBwListAudting.bwListTimeRulId',
						hidden : true,
						dataIndex : 'bwListTimeRulId'
					}, {
						header : '开始日期',
						id : 'ConBwListAudting.staDate',
						dataIndex : 'staDate',
						xtype : 'datecolumn', // 使用xtype代替渲染器 use xtype
						// instead of renderer
						format : 'Y-m-d',// configuration property for
						// Ext.grid.DateColumn
						editor : new Ext.form.DateField({
									format : 'Y-m-d'
								})
					}, {
						header : '开始时间',
						id : 'ConBwListAudting.staTime',
						dataIndex : 'staTime',
						xtype : 'datecolumn',
						format : 'H:i:s',
						editor : new Cls.form.DateTimeField({
									format : 'H:i:s'
								})
					}, {
						header : '结束日期',
						id : 'ConBwListAudting.endDate',
						dataIndex : 'endDate',
						xtype : 'datecolumn',
						format : 'Y-m-d',
						editor : new Ext.form.DateField({
									format : 'Y-m-d'
								})
					}, {
						header : '结束时间',
						id : 'ConBwListAudting.endTime',
						dataIndex : 'endTime',
						xtype : 'datecolumn',
						format : 'H:i:s',
						editor : new Cls.form.DateTimeField({
									format : 'H:i:s'
								})
					}]
				// end of columns
		});
		// 联系方式
//		var gridPanel_contact = new HT.GridPanel({
//			region : 'center',
//			id : 'ConBwListAudting_emplPanel',
//			showPaging : false,
//			height : 80,
//			showSm : false,
//			clicksToEdit : 1,
//			showNum : false,
//			autoHeight : false,
//			url : __ctxPath + "/customer/listByCusIdCusContact.do",
//			baseParams : {
//				customerId : cusId
//			},
//			fields : [{
//						name : 'contactId',
//						type : 'int'
//					}, 'cusContact', 'contactTypeId', 'contactSubTypeId',
//					'preContactNum', 'mainContactNum', 'lastContactNum',
//					'isDefault', 'isChecked', 'contactRemarks', 'createTime',
//					'lastUpdateTime', 'statusId'],
//			columns : [{
//						header : '内码',
//						dataIndex : 'contactId',
//						hidden : true
//					}, {
//						header : '联络方式',
//						dataIndex : 'contactTypeId',
//						renderer : function(value) {
//							if (value != null) {
//								return LXFS001.get(value);
//							} else {
//								return ' ';
//							}
//						}
//					}, {
//						header : '地址/号码',
//						dataIndex : 'mainContactNum',
//						renderer : function(value) {
//							if (value != undefined) {
//								if (value.length == 11) {
//									return value
//											.replace(/(\d{3})(\d{4})(\d{4})/,
//													"$1****$3");
//								} else if (value.length == 8) {
//									return value.replace(
//											/(\d{2})(\d{3})(\d{3})/, "$1***$3");
//								}
//							}
//							return value;
//						}
//					}]
//				// end of columns
//		});
		this.formPanel = new Ext.FormPanel({
			// TODO panel总面板
			id : 'ConBwListAudtingHMDPanel',
			region : 'center',
			layout : 'form',
			labelWidth : 70,
			bodyStyle : 'overflow-y:auto',
			labelAlign : 'right',
			style : 'padding:10px;background-color:#fff',
			border : false,
			defualts : {
				padding : '5px 0 5px 0',
				anchor : '90%,90%'
			},
			plain : true,
			items : [{
						name : 'conBwList.bwId',
						xtype : 'hidden',
						value : this.bwId == null ? '' : this.bwId
					}, {
						border : false,
						layout : 'column',
						items : [{
									columnWidth : .5,
									layout : 'form',
									border : false,
									items : [{
												xtype : 'hidden',
												name : 'conBwList.objTypId',
												id : 'ConBwListAudting.objTypId_hid'
											}, {
												fieldLabel : '类型',
												id : 'ConBwListAudting.objTypId_form',
												hiddenName : 'conBwList.objTypId',
												xtype : 'mtdiccombo',
												editable : true,
												readOnly : true,
												lazyInit : false,
												forceSelection : false,
												itemKey : 'CONJHLX',
												anchor : '100%'
											}]
								}, {
									columnWidth : .5,
									layout : 'form',
									border : false,
									items : [{
												layout : 'column',
												border : false,
												id : 'ConBwListAudtingkehu',
												items : [{
													layout : 'form',
													border : false,
													columnWidth : 1,
													items : [{
														xtype : 'hidden',
														name : 'conBwList.customer.customerId',
														anchor : '96%'
													}, {
														xtype : 'textfield',
														name : 'conBwList.nameCn',
														fieldLabel : '客户',
														readOnly : true,
														anchor : '96%'
													}]
												}]

											}]
								}]
						// }, {
						// xtype : 'fieldset',
						// title : "联系方式",
						// collapsed : false,
						// collapsible : true,
						// id : 'ConBwListAudtinglianxifangshi',
						// autoHeight : true,
						// items : gridPanel_contact
					}, {
						xtype : 'textfield',
						name : 'conBwList.mainContactNum',
						fieldLabel : '地址/号码',
						readOnly : true,
						anchor : '50%'
					}, {
						xtype : 'fieldset',
						title : "时间限制",
						collapsed : false,
						collapsible : true,
						anchor:'99%',
						autoHeight : true,
						defaults : {
							anchor : '98%,98%'
						},
						items : this.gridPanel
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
										id : 'ConBwListAudting.applyReaId_hid'
									}, {
										fieldLabel : '申请原因',
										id : 'ConBwListAudting.applyReaId_form',
										xtype : 'mtdiccombo',
										forceSelection : false,
										editable : false,
										readOnly : true,
										lazyInit : true,
										mode : 'local',
										itemKey : 'CONSQYY',
										anchor : '98%',
										listeners : getDicListeners(
												'ConBwListAudting.applyReaId_form',
												'ConBwListAudting.applyReaId')
									}]
						}]
					}, {
						fieldLabel : '申请说明',
						name : 'conBwList.applyRemark',
						xtype : 'textarea',
						anchor : '98%',
						readOnly : true,
						maxLength : 120
					}, {
						xtype : 'fieldset',
						title : '审批信息',
						id : 'ConBwListAudting.ShenpiField',
						layout : 'form',
						items : [{
							layout : 'column',
							border : false,
							items : [{
								columnWidth : .7,
								layout : 'form',
								border : false,
								items : [{
									xtype : 'radiogroup',
									border : false,
									id : 'ConBwListAudting.checkedValue',
									allowBlank : false,
									blankText : '请选择审批意见',
									fieldLabel : '<font color="red">*</font>审批意见',
									items : [{
										name : 'conBwList.checkStateId',
										id : 'ConBwListAudting.checked_tongyi',
//										checked : true,
										inputValue : 3,
										boxLabel : '同意',
										listeners : {
											'check' : function(checkbox, checked) {
												if (checked) {
													Ext.getCmp('ConBwListAudting.approveReason_form').allowBlank = true;
													Ext.getCmp('ConBwListAudting.dirId_form').allowBlank = false;
													Ext.getCmp('ConBwListAudting.reason_con').hide();
													Ext.getCmp('ConBwListAudting.jinhu').show();
												}
											}
										}
									}, {
										name : 'conBwList.checkStateId',
										id : 'ConBwListAudting.checked_butongyi',
										inputValue : 4,
										boxLabel : '不同意',
										listeners : {
											'check' : function(checkbox, checked) {
												if (checked) {
													Ext.getCmp('ConBwListAudting.approveReason_form').allowBlank = false;
													Ext.getCmp('ConBwListAudting.dirId_form').allowBlank = true;
													Ext.getCmp('ConBwListAudting.reason_con').show();
													Ext.getCmp('ConBwListAudting.jinhu').hide();
												}
											}
										}
									}]
								}]
							}, {
								xtype : 'button',
								width : 100,
								text : '调阅联络记录',
								iconCls : 'menu-arch-controll',
								handler : function() {
								}

							}]
						}, {
							layout : 'column',
							border : false,
							id:'ConBwListAudting.jinhu',
							items : [{
								layout : 'form',
								border : false,
								columnWidth : .5,
								items : [{
											xtype : 'hidden',
											name : 'conBwList.dirId',
											id : 'ConBwListAudting.dirId_hid'
										}, {
											xtype : 'mtdiccombo',
											id : 'ConBwListAudting.dirId_form',
											editable : false,
											lazyInit : false,
											forceSelection : false,
											anchor : '96%',
											itemKey : 'CONFX',
											fieldLabel : '<font color="red">*</font>禁呼范围',
//											allowBlank : false,
											listeners : getDicListeners('ConBwListAudting.dirId_form','ConBwListAudting.dirId')
										}]
							}, {
								xtype : 'hidden',
								name : 'conBwList.dealTypId',
								id : 'ConBwListAudting.dealTypId_hid'
							}, {
								layout : 'form',
								border : false,
								columnWidth : .5,
								items : [{
									xtype : 'mtdiccombo',
									id : 'ConBwListAudting.dealTypId_form',
									editable : true,
									lazyInit : false,
									forceSelection : false,
									itemKey : 'CONCLFS',
									anchor : '96%',
									fieldLabel : "处理方式",
									listeners : getDicListeners('ConBwListAudting.dealTypId_form','ConBwListAudting.dealTypId')
								}]
							}]
						}, {
							layout : 'column',
							border : false,
							hidden:true,
							id : 'ConBwListAudting.reason_con',
							items : [{
								layout : 'form',
								border : false,
								columnWidth : .5,
								items : [{
										xtype : 'mtdiccombo',
										id : 'ConBwListAudting.approveReason_form',
										anchor : '96%',
										fieldLabel : '<font color="red">*</font>拒绝原因',
										editable : true,
										lazyInit : true,
//										allowBlank : true,
										forceSelection : false,
										itemKey : 'YWCS_HMDJJYY',
										listeners : getDicListeners(
												'ConBwListAudting.approveReason_form',
												'ConBwListAudting.approveReason')
									}, {
									xtype : 'hidden',
									name : 'conBwList.approveReason',
									id : 'ConBwListAudting.approveReason_hid'
								}]
							}]
						}, {
							xtype : 'textarea',
							name : 'conBwList.approveDesc',
							height : 50,
							anchor : '98%',
							fieldLabel : '备注'
						}]
					}]
		});
		function getDicListeners(comId, hidName) {
			return {
				select : function(cbo, record, index) {
					var fm = Ext.getCmp(comId);
					Ext.getCmp(hidName + '_hid').setValue(cbo.value);
				}
			}
		};

		// 加载表单对应的数据
		if (this.bwId != null && this.bwId != 'undefined') {
			this.formPanel.loadData({
				url : __ctxPath + '/customer/getConBwList.do?bwId=' + this.bwId,
				root : 'data',
				preName : 'conBwList',
				success : function(response, options) {
					var thisObj = Ext.util.JSON.decode(response.responseText).data;
//					Ext.getCmp('ConBwListAudting.dealTypId_form').setValue(thisObj.dealTypId);
					Ext.getCmp('ConBwListAudting.applyReaId_form').setValue(thisObj.applyReaId);
					Ext.getCmp('ConBwListAudting.objTypId_form').setValue(thisObj.objTypId);
//					Ext.getCmp('ConBwListAudting.dirId_form').setValue(thisObj.dirId);
					// if(thisObj.objTypId == 2){//联系方式
					// Ext.getCmp('ConBwListAudting_emplPanel').show();
					// } else {
					// Ext.getCmp('ConBwListAudting_emplPanel').hide();
					// }
				},
				failure : function() {
					Ext.ux.Toast.msg('操作提示', '对不起，数据加载失败！');
				}
			});
		}
		// 加载联络记录对应的数据
		// if (this.conHisId != null && this.conHisId != 'undefined') {
		// this.formPanel.loadData({
		// url : __ctxPath + '/customer/getForHMDConHis.do?conHisId='
		// + this.conHisId,
		// root : 'data',
		// preName : 'ConBwList',
		// success : function(response, options) {
		// var thisObj = Ext.util.JSON.decode(response.responseText).data;
		// Ext.getCmp('ConBwListAudting.dealTypId_form')
		// .setValue(thisObj.dealTypId);
		// Ext.getCmp('ConBwListAudting.applyReaId_form')
		// .setValue(thisObj.applyReaId);
		// Ext.getCmp('ConBwListAudting.objTypId_form')
		// .setValue(thisObj.objTypId);
		// Ext.getCmp('ConBwListAudting.dirId_form')
		// .setValue(thisObj.dirId);
		// },
		// failure : function() {
		// Ext.ux.Toast.msg('操作提示', '对不起，数据加载失败！');
		// }
		// });
		// }

	} // init

	,// end of the initcomponents

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
		var tabs = Ext.getCmp('centerTabPanel');// 获得tab
		tabs.remove('ConBwListAudtingWin');// 移除创建的窗口
	},
	/**
	 * 保存记录
	 */
	save : function() {
		$postForm({
					formPanel : this.formPanel,
					scope : this,
					url : __ctxPath + '/customer/saveApproveConBwList.do',
					callback : function(fp, action) {
						var reasonId = this.formPanel.getCmpByName('conBwList.checkStateId').getValue();
						var tongguo = Ext.getCmp('ConBwListAudting.checked_tongyi').getValue();
						var butongguo = Ext.getCmp('ConBwListAudting.checked_butongyi').getValue();
						
						var gridPanel = Ext.getCmp('ConBwListDaispGrid');
						if (gridPanel != null) {
							gridPanel.getStore().reload();
						}
						var gridAll = Ext.getCmp('ConBwListGrid4');
						if (gridAll != null) {
							gridAll.getStore().reload();
						}
						if(tongguo){
							var tongguoGrid = Ext.getCmp('ConBwListGrid2');
							if(tongguoGrid != null){
								tongguoGrid.getStore().reload();
							}
						}
						if(butongguo){
							var butongguoGrid = Ext.getCmp('ConBwListGrid3');
							if(butongguoGrid != null){
								butongguoGrid.getStore().reload();
							}
						}
						var tabs = Ext.getCmp('centerTabPanel');// 获得tab
						tabs.remove('ConBwListAudtingWin');// 移除创建的窗口
					}
				});
	}// end of save

});
