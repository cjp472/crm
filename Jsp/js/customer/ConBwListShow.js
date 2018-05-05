/**
 * @description 分配放弃的请求
 * @class UserSelector
 * @author 优创融联科技
 * @updater cyy
 * @createtime
 */
ConBwListShow = Ext.extend(Ext.Window, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		ConBwListShow.superclass.constructor.call(this, {
					id : 'ConBwListShowWin',
					title : '黑名单详细信息',
					iconCls : 'menu-appuser',
					width : 800,
					height : 500,
					layout : 'fit',
					bodyStyle:'background-color:#fff',
					border : false,
					maximizable : true,
					resizable : true,
					modal : true,
					// items : [ this.formPanel, this.gridPanel ],
					items : this.formPanel,
					buttonAlign : 'center',
					buttons : [{
//								text : __save,
//								iconCls : 'btn-save',
//								scope : this,
//								handler : this.save
//							}, {
//								text : __reset,
//								iconCls : 'btn-reset',
//								scope : this,
//								handler : this.reset
//							}, {
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
//			tbar : this.topbar_contact,
			height : 150,
			showSm:false,
			scrollHeight : true,
			showPaging:false,
//			clicksToEdit : 1,
			id : 'ConBwListShowGrid',
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
						id : 'ConBwListShow.bwListTimeRulId',
						hidden : true,
						dataIndex : 'bwListTimeRulId'
					}, {
						header : '开始日期',
						id : 'ConBwListShow.staDate',
						dataIndex : 'staDate',
						xtype: 'datecolumn', // 使用xtype代替渲染器 use xtype instead of renderer
                        format: 'Y-m-d'
					}, {
						header : '开始时间',
						id : 'ConBwListShow.staTime',
						dataIndex : 'staTime',
						xtype: 'datecolumn',
                        format: 'H:i:s'
					}, {
						header : '结束日期',
						id : 'ConBwListShow.endDate',
						dataIndex : 'endDate',
						xtype: 'datecolumn',
                        format: 'Y-m-d'
					}, {
						header : '结束时间',
						id : 'ConBwListShow.endTime',
						dataIndex : 'endTime',
						xtype: 'datecolumn',
                        format: 'H:i:s'
					}]
				// end of columns
		});
		// 联系方式
//		var gridPanel_contact = new HT.GridPanel({
//			region : 'center',
//			id : 'UlContactGrid_emplPanel',
//			showPaging : false,
//			height:80,
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
//				header : '内码',
//				dataIndex : 'contactId',
//				hidden : true
//				},{
//				header : '联络方式',
//				dataIndex : 'contactTypeId',
//				renderer : function(value) {
//					if (value != null) {
//						return LXFS001.get(value);
//					} else {
//						return ' ';
//					}
//				}
//			},{
//				header : '地址/号码',
//				dataIndex : 'mainContactNum',
//				renderer : function(value) {
//					if(value!=undefined){
//						if(value.length==11) {
//							return value.replace(/(\d{3})(\d{4})(\d{4})/,"$1****$3");
//						}else if(value.length==8){
//							return value.replace(/(\d{2})(\d{3})(\d{3})/,"$1***$3");
//						}
//					}
//					return value;
//				}
//			}]
//				// end of columns
//		});
		this.formPanel = new Ext.FormPanel({
			// TODO panel总面板
			id : 'ConBwListShowHMDPanel',
			bodyStyle:'overflow-y:auto',
			layout : 'form',
			labelWidth : 70,
			labelAlign : 'right',
			style : 'padding:10px;background-color:#fff',
			border : false,
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
						xtype : 'hidden',
						value : 1
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
								id : 'ConBwListShow.objTypId_hid'
							},{
								fieldLabel : '类型',
								id : 'ConBwListShow.objTypId_form',
								xtype : 'mtdiccombo',
								editable : true,
								readOnly : true,
								lazyInit : false,
								forceSelection : false,
								itemKey : 'CONJHLX',
								anchor : '100%',
								listeners : {
									'select' : function(combo, record, index) {
										if (combo.getValue() == 3) {
											Ext.get('kehu').dom.style.display = 'none';
											Ext.get('lianxiren').dom.style.display = 'block';
										} else {
											Ext.get('kehu').dom.style.display = 'block';
											Ext.get('lianxiren').dom.style.display = 'none';
										}
										var fm = Ext.getCmp('ConBwListShow.objTypId_form');
										Ext.getCmp('ConBwListShow.objTypId_hid').setValue(combo.value);
									}
								}
							}]
						}, {
							columnWidth : .5,
							layout : 'form',
							border : false,
							items : [{
										xtype : 'hidden',
										name : 'conBwList.dirId',
										id : 'ConBwListShow.dirId_hid'
									}, {
								layout : 'column',
								border : false,
								id : 'ConBwListShowkehu',
								items : [{
											layout : 'form',
											border : false,
											columnWidth : 1,
											items : [{
														xtype : 'hidden',
														name : 'conBwList.customer.customerId',
														anchor : '100%'
													}, {
														xtype : 'textfield',
														name : 'conBwList.nameCn',
														fieldLabel : '客户',
														readOnly : true,
														anchor : '100%'
													}]
										}]

							}]
						}]
					}, {
						xtype : 'textfield',
						name : 'conBwList.mainContactNum',
						fieldLabel : '地址/号码',
						readOnly : true,
						anchor : '50%'
//					}, {
//						xtype : 'fieldset',
//						title : "联系方式",
//						collapsed : false,
//						collapsible : true,
//						id : 'lianxifangshi',
//						autoHeight : true,
//						items : gridPanel_contact
					}, {
						xtype : 'fieldset',
						title : "时间限制",
						collapsed : false,
						anchor:'98%',
						collapsible : true,
						autoHeight : true,
						defaults : {
							anchor : '100%,100%'
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
												id : 'ConBwListShow.applyReaId_hid'
											},{
												fieldLabel : '申请原因',
												id : 'ConBwListShow.applyReaId_form',
												xtype : 'mtdiccombo',
												forceSelection : false,
												editable : false,
												readOnly:true,
												lazyInit : true,
												mode : 'local',
												itemKey : 'CONSQYY',
												anchor : '100%',
												listeners : getDicListeners('ConBwListShow.applyReaId_form','ConBwListShow.applyReaId')
											}]
								}]
					}, {
						fieldLabel : '申请说明',
						name : 'conBwList.applyRemark',
						xtype : 'textarea',
						anchor : '97%',
						readOnly:true,
						maxLength : 120
					}
					, {
						xtype : 'fieldset',
						title : '审批信息',
						anchor:'98%',
						hidden:(this.flag == 1 || this.flag== '1') ? true : false ,
						id : 'ConBwListShow.ShenpiField',
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
									id : 'ConBwListShow.checkedValue',
									fieldLabel : '审批意见',
									items : [{
										name : 'conBwList.checkStateId',
										id : 'ConBwListShow.checked_tongyi',
										checked : true,
										inputValue : 3,
										disabled:true,
										boxLabel : '同意',
										listeners : {
											'check' : function(checkbox, checked) {
												if (checked) {
													Ext.getCmp('ConBwListShow.reason_con').hide();
													Ext.getCmp('ConBwListShow.jinhu').show();
												}
											}
										}
									}, {
										name : 'conBwList.checkStateId',
										id : 'ConBwListShow.checked_butongyi',
										inputValue : 4,
										disabled:true,
										boxLabel : '不同意',
										listeners : {
											'check' : function(checkbox, checked) {
												if (checked) {
													Ext.getCmp('ConBwListShow.reason_con').show();
													Ext.getCmp('ConBwListShow.jinhu').hide();
												}
											}
										}
									}]
								}]
							}]
						},{
							layout : 'column',
							border : false,
							id:'ConBwListShow.jinhu',
							items : [{
								layout : 'form',
								border : false,
								columnWidth : .5,
								items : [{
											xtype : 'hidden',
											id : 'ConBwListShow.dirId_hid'
										}, {
											xtype : 'mtdiccombo',
											id : 'ConBwListShow.dirId_form',
											name : 'conBwList.dirId',
											editable : false,
											lazyInit : false,
											forceSelection : false,
											readOnly:true,
											anchor : '96%',
											itemKey : 'CONFX',
											fieldLabel : "禁呼范围",
											listeners : getDicListeners(
													'ConBwListShow.dirId_form',
													'ConBwListShow.dirId')
										}]
							}, {
								xtype : 'hidden',
								name : 'conBwList.dealTypId',
								id : 'ConBwListShow.dealTypId_hid'
							}, {
								layout : 'form',
								border : false,
								columnWidth : .5,
								items : [{
									xtype : 'mtdiccombo',
									id : 'ConBwListShow.dealTypId_form',
									editable : true,
									lazyInit : false,
									forceSelection : false,
									readOnly:true,
									itemKey : 'CONCLFS',
									anchor : '96%',
									fieldLabel : "处理方式",
									listeners : getDicListeners(
											'ConBwListShow.dealTypId_form',
											'ConBwListShow.dealTypId')
								}]
							}]
						}, {
							layout : 'column',
							border : false,
							hidden:true,
							id : 'ConBwListShow.reason_con',
							items : [{
								layout : 'form',
								border : false,
								columnWidth : .5,
								items : [{
										xtype : 'mtdiccombo',
										id : 'ConBwListShow.approveReason_form',
										anchor : '96%',
										fieldLabel : '拒绝原因',
										editable : true,
										lazyInit : true,
										readOnly:true,
										forceSelection : false,
										itemKey : 'YWCS_HMDJJYY',
										listeners : getDicListeners(
												'ConBwListShow.approveReason_form',
												'ConBwListShow.approveReason')
									}, {
									xtype : 'hidden',
									name : 'conBwList.approveReason',
									id : 'ConBwListShow.approveReason_hid'
								}]
							}]
						}, {
							xtype : 'textarea',
							name : 'conBwList.approveDesc',
							height : 50,
							readOnly:true,
							anchor : '98%',
							fieldLabel : '备注'
						}]
					}
					]
		});
		function getDicListeners(comId, hidName){
			return {
				select : function(cbo,record,index) {
					var fm = Ext.getCmp(comId);
					Ext.getCmp(hidName+'_hid').setValue(cbo.value);
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
					Ext.getCmp('ConBwListShow.dealTypId_form').setValue(thisObj.dealTypId);
					Ext.getCmp('ConBwListShow.applyReaId_form').setValue(thisObj.applyReaId);
					Ext.getCmp('ConBwListShow.objTypId_form').setValue(thisObj.objTypId);
					Ext.getCmp('ConBwListShow.dirId_form').setValue(thisObj.dirId);
					Ext.getCmp('ConBwListShow.approveReason_form').setValue(thisObj.approveReason);
					var checkStateId = thisObj.checkStateId;
					if(checkStateId == 3){
						Ext.getCmp('ConBwListShow.reason_con').hide();
						Ext.getCmp('ConBwListShow.jinhu').show();
					}
					if(checkStateId == 4){
						Ext.getCmp('ConBwListShow.reason_con').show();
						Ext.getCmp('ConBwListShow.jinhu').hide();
					}
				},
				failure : function() {
					Ext.ux.Toast.msg('操作提示', '对不起，数据加载失败！');
				}
			});
		}
		// 加载联络记录对应的数据
//		if (this.conHisId != null && this.conHisId != 'undefined') {
//			this.formPanel.loadData({
//				url : __ctxPath + '/customer/getForHMDConHis.do?conHisId=' + this.conHisId,
//				root : 'data',
//				preName : 'ConBwListShow',
//				success : function(response, options) {
//					var thisObj = Ext.util.JSON.decode(response.responseText).data;
//					Ext.getCmp('ConBwListShow.dealTypId_form').setValue(thisObj.dealTypId);
//					Ext.getCmp('ConBwListShow.applyReaId_form').setValue(thisObj.applyReaId);
//					Ext.getCmp('ConBwListShow.objTypId_form').setValue(thisObj.objTypId);
//					Ext.getCmp('ConBwListShow.dirId_form').setValue(thisObj.dirId);
//				},
//				failure : function() {
//					Ext.ux.Toast.msg('操作提示', '对不起，数据加载失败！');
//				}
//			});
//		}

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
		this.close();
	},
	/**
	 * 保存记录
	 */
	save : function() {
		// 将行信息从grid中取出并放入rows变量中
		var store = this.gridPanel.getStore();
		var rows = [];// 定义数组
		for (var i = 0; i < store.getCount(); i++) { // store.getCount()为store的长度
			rows.push(store.getAt(i).data);// 放到数组里
		}
		$postForm({
					formPanel : this.formPanel,
					scope : this,
					url : __ctxPath + '/customer/saveConBwList.do',
					params : {
						details : Ext.encode(rows)
					},
					callback : function(fp, action) {
						var gridPanel = Ext.getCmp('ConBwListShowGrid');
						if (gridPanel != null) {
							gridPanel.getStore().reload();
						}
						this.close();
					}
				});
	}// end of save

});
