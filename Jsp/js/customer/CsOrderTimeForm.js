/**
 * @author cf0666@gmail.com
 * @createtime
 * @class CsOrderTimeForm
 * @extends Ext.Window
 * @description CsOrderTime表单
 * @company 优创融联科技
 */
CsOrderTimeForm = Ext.extend(Ext.Window, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		CsOrderTimeForm.superclass.constructor.call(this, {
					id : 'CsOrderTimeFormWin',
					layout : 'fit',
					items : this.formPanel,
					modal : true,
					height : 400,
					width : 500,
					maximizable : true,
					title : '工单时间配置详细信息',
					buttonAlign : 'center',
					buttons : [{
								text : __save,
								iconCls : 'btn-save',
								id : 'btnSave',
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
								handler : this.cancel
							}]
				});
	},// end of the constructor
	// 初始化组件
	initUIComponents : function() {

		checkOrgName = function() {
			var orgName = Ext.get('csOrderTime.idDictionary.dicId').dom.value;
			var orgId = Ext.get('csOrderTime.orderTimeId').dom.value;
			if (orgName.length <= 0) {
				Ext.getCmp('btnSave').disable();
				return '名称不能为空!';
			} else {
				Ext.Ajax.request({
							url : __ctxPath + '/customer/listCsOrderTime.do',
							params : {
								'Q_idDictionary.dicId_L_EQ' : orgName,
								'Q_orderTimeId_L_NEQ' : orgId
							},
							success : function(form, action) {
								var info = Ext.decode(form.responseText);
								if (info.totalCounts > 0) {
									Ext.getCmp('csOrderTime.idDictionary')
											.markInvalid('该配置已被创建,请重新选择!');
									Ext.getCmp('btnSave').disable();
								} else {
									Ext.getCmp('csOrderTime.idDictionary')
											.clearInvalid(true);
									Ext.getCmp('btnSave').enable();
								}
							}
						});
			}
		};

		this.formPanel = new Ext.FormPanel({
			layout : 'form',
			bodyStyle : 'padding:10px',
			border : false,
			autoScroll : true,
			// id : 'CsOrderTimeForm',
			defaults : {
				anchor : '96%,96%'
			},
			defaultType : 'textfield',
			items : [{
						name : 'csOrderTime.orderTimeId',
						id : 'csOrderTime.orderTimeId',
						xtype : 'hidden',
						value : this.orderTimeId == null
								? ''
								: this.orderTimeId
					}, {
						fieldLabel : '工时配置类型',
						xtype : 'combo',
						hiddenName : 'csOrderTime.globalType.proTypeId',
						name : 'csOrderTime.globalType.proTypeId',
						id : 'csOrderTime.globalType',
						mode : 'local',
						editable : false,
						readOnly : this.orderTimeId == null ? false : true,
						triggerAction : 'all',
						store : [['11687', '投诉工单来源'], ['11688', '业务工单来源'],
								['10425', '客户级别']],
						allowBlank : false,
						listeners : {
							scope : this,
							'select' : function(combo, record, index) {
								var id = Ext.getCmp('csOrderTime.globalType')
										.getValue();
								Ext.Ajax.request({
											url : __ctxPath
													+ '/system/comboDictionary.do',
											params : {
												'Q_globalType.proTypeId_L_EQ' : id
											},
											method : 'post',
											success : function(response) {
												var result = Ext.util.JSON
														.decode(response.responseText)
												Ext
														.getCmp('csOrderTime.idDictionary')
														.getStore()
														.loadData(result);
												Ext
														.getCmp('csOrderTime.idDictionary')
														.setValue('');
											}
										});
							},
							'load' : function(combo, record, index) {
								Ext
										.getCmp('csOrderTime.globalType')
										.setValue(Ext
												.getCmp('csOrderTime.keyDictionary')
												.getValue());
							}
						}
					}, {
						fieldLabel : '工时配置名称',
						xtype : 'combo',
						allowBlank : false,
						hiddenName : 'csOrderTime.idDictionary.dicId',
						name : 'csOrderTime.idDictionary.dicId',
						id : 'csOrderTime.idDictionary',
						mode : 'local',
						editable : false,
						readOnly : this.orderTimeId == null ? false : true,
						triggerAction : 'all',
						store : [['', '']],
						allowBlank : false,
						blankText : '请选择工时配置名称!',
						validator : checkOrgName

					}, {
						fieldLabel : '要求响应时间',
						name : 'csOrderTime.responseTime',
						xtype : 'numberfield',
						// regex : /^[0-9]*(\.[0-9]{1,2})?$/,
						decimalPrecision : 2
					}

					, {
						fieldLabel : '要求完成时间',
						name : 'csOrderTime.completionTime',
						xtype : 'numberfield',
						// regex : /^[0-9]*(\.[0-9]{1,2})?$/,
						decimalPrecision : 2
					}

			// , {
			// fieldLabel : '授权ID',
			// hiddenName : 'csOrderTime.assignid',
			// xtype : 'combo',
			// editabel : false,
			// lazyInit : false,
			// triggerAction : 'all',
			// store : new Ext.data.SimpleStore({
			// autoLoad : true,
			// url : __ctxPath + '/customer/listassignid.do',
			// fields : ['assignid', 'assignidName'],
			// listeners : {
			// load : function() {
			// var combo = Ext.getCmp('assignid');
			// var store = combo.getStore();
			// var rows = [];// 定义数组
			// for (var i = 0; i < store.getCount(); i++) { //
			// store.getCount()为store的长度
			// if (store.getAt(i).data['assignid'] == combo
			// .getValue()) {
			// combo
			// .setValue(store.getAt(i).data['assignidName']);
			// break;
			// }
			// }
			// }
			// }
			// }),
			// displayField : 'assignidName',
			// valueField : 'assignid',
			// id : 'assignid'
			// }
			//
			// , {
			// fieldLabel : '工单来源',
			// name : 'csOrderTime.orderSorce',
			// xtype : 'numberfield'
			// }
			//
			// , {
			// fieldLabel : '工单类型',
			// name : 'csOrderTime.order',
			// xtype : 'numberfield'
			// }
			//
			// , {
			// fieldLabel : '工单项目',
			// name : 'csOrderTime.orderProject',
			// xtype : 'numberfield'
			// }
			//
			// , {
			// fieldLabel : '投诉等级',
			// name : 'csOrderTime.orderLevel',
			// xtype : 'numberfield'
			// }
			//
			// , {
			// fieldLabel : '客户等级',
			// name : 'csOrderTime.cusLevel',
			// xtype : 'numberfield'
			// }

			]
		});
		// 加载表单对应的数据
		if (this.orderTimeId != null && this.orderTimeId != 'undefined') {
			this.formPanel.loadData({
				url : __ctxPath + '/customer/getCsOrderTime.do?orderTimeId='
						+ this.orderTimeId,
				root : 'data',
				preName : 'csOrderTime',
				success : function(response, options) {
					var thisObj = Ext.util.JSON.decode(response.responseText).data;
					var proTypeId = thisObj.globalType.proTypeId;
					Ext.Ajax.request({
								url : __ctxPath + '/system/comboDictionary.do',
								params : {
									'Q_globalType.proTypeId_L_EQ' : proTypeId
								},
								async : true,
								scope : this,
								method : 'post',
								success : function(response) {
									var result = Ext.util.JSON
											.decode(response.responseText);
									Ext.getCmp('csOrderTime.idDictionary')
											.getStore().loadData(result);
									Ext
											.getCmp('csOrderTime.idDictionary')
											.setValue(Ext
													.getCmp('csOrderTime.idDictionary')
													.getValue());
								}
							});
							

				}
			});
		}

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
		$postSubForm({
					formPanel : this.formPanel,
					scope : this,
					url : __ctxPath + '/customer/saveCsOrderTime.do',
					msgSuccess : '成功保存该记录！',
					msgFailure : '操作出错，请联系管理员！',
					callback : function(fp, action) {
						var gridPanel = Ext.getCmp('CsOrderTimeGrid');
						if (gridPanel != null) {
							gridPanel.getStore().reload();
						}
						this.close();
					}
				});
	}// end of save

});