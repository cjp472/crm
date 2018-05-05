/**
 * @author cf0666@gmail.com
 * @createtime
 * @class ObCallbatchImpTmpForm
 * @extends Ext.Window
 * @description ObCallbatchImpTmp表单
 * @company 优创融联科技
 */
ObCallbatchImpTmpForm = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		ObCallbatchImpTmpForm.superclass.constructor.call(this, {
					id : 'ObCallbatchImpTmpFormWin',
					layout : 'fit',
					items : this.formPanel,
					modal : true,
					height : 400,
					width : 500,
					maximizable : true,
					title : '[ObCallbatchImpTmp]详细信息',
					buttonAlign : 'center',
					buttons : [{
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
								handler : this.cancel
							}]
				});
	},// end of the constructor
	// 初始化组件
	initUIComponents : function() {
		this.formPanel = new Ext.FormPanel({
			layout : 'form',
			bodyStyle : 'padding:10px',
			border : false,
			autoScroll : true,
			// id : 'ObCallbatchImpTmpForm',
			defaults : {
				anchor : '96%,96%'
			},
			defaultType : 'textfield',
			items : [{
						name : 'obCallbatchImpTmp.tmpCusId',
						xtype : 'hidden',
						value : this.tmpCusId == null ? '' : this.tmpCusId
					}

					, {
						fieldLabel : '名单批次内码',
						hiddenName : 'obCallbatchImpTmp.callbatchId',
						allowBlank : false,
						xtype : 'combo',
						editabel : false,
						lazyInit : false,
						triggerAction : 'all',
						store : new Ext.data.SimpleStore({
							autoLoad : true,
							url : __ctxPath + '/outb/listcallbatchId.do',
							fields : ['callbatchId', 'callbatchIdName'],
							listeners : {
								load : function() {
									var combo = Ext.getCmp('callbatchId');
									var store = combo.getStore();
									var rows = [];// 定义数组
									for (var i = 0; i < store.getCount(); i++) { // store.getCount()为store的长度
										if (store.getAt(i).data['callbatchId'] == combo
												.getValue()) {
											combo
													.setValue(store.getAt(i).data['callbatchIdName']);
											break;
										}
									}
								}
							}
						}),
						displayField : 'callbatchIdName',
						valueField : 'callbatchId',
						id : 'callbatchId'
					}

					, {
						fieldLabel : '联络名单客户内码',
						hiddenName : 'obCallbatchImpTmp.cusId',
						xtype : 'combo',
						editabel : false,
						lazyInit : false,
						triggerAction : 'all',
						store : new Ext.data.SimpleStore({
							autoLoad : true,
							url : __ctxPath + '/outb/listcusId.do',
							fields : ['cusId', 'cusIdName'],
							listeners : {
								load : function() {
									var combo = Ext.getCmp('cusId');
									var store = combo.getStore();
									var rows = [];// 定义数组
									for (var i = 0; i < store.getCount(); i++) { // store.getCount()为store的长度
										if (store.getAt(i).data['cusId'] == combo
												.getValue()) {
											combo
													.setValue(store.getAt(i).data['cusIdName']);
											break;
										}
									}
								}
							}
						}),
						displayField : 'cusIdName',
						valueField : 'cusId',
						id : 'cusId'
					}

					, {
						fieldLabel : '是否已绑定客户：生成了客户基础表后回写该字段。0-否，1-是&CONOB_CALLBATCH_IMP_TMP_SFBDKH',
						hiddenName : 'obCallbatchImpTmp.inCustBase',
						allowBlank : false,
						maxLength : 5
					}

					, {
						fieldLabel : '客户名称',
						name : 'obCallbatchImpTmp.nameCn',
						allowBlank : false,
						maxLength : 128
					}

					, {
						fieldLabel : '简称',
						name : 'obCallbatchImpTmp.nameAli',
						maxLength : 128
					}

					, {
						fieldLabel : '客户类型：个人客户、联系人',
						name : 'obCallbatchImpTmp.cusTypId',
						xtype : 'numberfield'
					}

					, {
						fieldLabel : '性别：0-女，1-男&CONOB_CALLBATCH_IMP_TMP_SEX',
						hiddenName : 'obCallbatchImpTmp.gender',
						maxLength : 5
					}

					, {
						fieldLabel : '生日',
						name : 'obCallbatchImpTmp.birthday',
						maxLength : 10
					}

					, {
						fieldLabel : '证件类型：0-身份证，1-户口薄&CONOB_CALLBATCH_IMP_TMP_ZJLX',
						hiddenName : 'obCallbatchImpTmp.credTypId',
						xtype : 'mtdiccombo',
						editable : true,
						lazyInit : false,
						forceSelection : false,
						itemKey : 'CONOB_CALLBATCH_IMP_TMP_ZJLX'
					}

					, {
						fieldLabel : '证件号码',
						name : 'obCallbatchImpTmp.credNum',
						maxLength : 128
					}

					, {
						fieldLabel : '证件有效期',
						name : 'obCallbatchImpTmp.credDurDat',
						xtype : 'datefield',
						format : 'Y-m-d',
						value : new Date()
					}

					, {
						fieldLabel : '备注',
						name : 'obCallbatchImpTmp.remark',
						xtype : 'textarea',
						maxLength : 2048
					}

					, {
						fieldLabel : '创建人内码',
						name : 'obCallbatchImpTmp.creUseId',
						allowBlank : false,
						xtype : 'numberfield'
					}

					, {
						fieldLabel : '创建日期',
						name : 'obCallbatchImpTmp.creDat',
						allowBlank : false,
						xtype : 'datefield',
						format : 'Y-m-d',
						value : new Date()
					}

					, {
						fieldLabel : '修改人',
						name : 'obCallbatchImpTmp.updUseId',
						xtype : 'numberfield'
					}

					, {
						fieldLabel : '修改日期',
						name : 'obCallbatchImpTmp.updDat',
						xtype : 'datefield',
						format : 'Y-m-d',
						value : new Date()
					}

					, {
						fieldLabel : '扩展1',
						name : 'obCallbatchImpTmp.ext1',
						maxLength : 256
					}

					, {
						fieldLabel : '扩展2',
						name : 'obCallbatchImpTmp.ext2',
						maxLength : 256
					}

					, {
						fieldLabel : '扩展3',
						name : 'obCallbatchImpTmp.ext3',
						maxLength : 256
					}

					, {
						fieldLabel : '扩展4',
						name : 'obCallbatchImpTmp.ext4',
						maxLength : 256
					}

					, {
						fieldLabel : '扩展5',
						name : 'obCallbatchImpTmp.ext5',
						maxLength : 256
					}

					, {
						fieldLabel : '扩展6',
						name : 'obCallbatchImpTmp.ext6',
						maxLength : 256
					}

					, {
						fieldLabel : '扩展7',
						name : 'obCallbatchImpTmp.ext7',
						maxLength : 256
					}

					, {
						fieldLabel : '扩展8',
						name : 'obCallbatchImpTmp.ext8',
						maxLength : 256
					}

					, {
						fieldLabel : '扩展9',
						name : 'obCallbatchImpTmp.ext9',
						maxLength : 256
					}

					, {
						fieldLabel : '扩展10',
						name : 'obCallbatchImpTmp.ext10',
						maxLength : 256
					}

					, {
						fieldLabel : '状态：0-无效、有效-1&CONOB_CALLBATCH_IMP_TMP_ZT',
						hiddenName : 'obCallbatchImpTmp.staId',
						allowBlank : false,
						xtype : 'mtdiccombo',
						editable : true,
						lazyInit : false,
						forceSelection : false,
						itemKey : 'CONOB_CALLBATCH_IMP_TMP_ZT'
					}

					, {
						fieldLabel : '无效原因：0-黑名单、1-数据不完整、2-字段格式不正确、3-合并&CONOB_CALLBATCH_IMP_TMP_WXYY',
						hiddenName : 'obCallbatchImpTmp.inavailableId',
						xtype : 'mtdiccombo',
						editable : true,
						lazyInit : false,
						forceSelection : false,
						itemKey : 'CONOB_CALLBATCH_IMP_TMP_WXYY'
					}

			]
		});
		// 加载表单对应的数据
		if (this.tmpCusId != null && this.tmpCusId != 'undefined') {
			this.formPanel.loadData({
						url : __ctxPath
								+ '/outb/getObCallbatchImpTmp.do?tmpCusId='
								+ this.tmpCusId,
						root : 'data',
						preName : 'obCallbatchImpTmp'
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
					url : __ctxPath + '/outb/saveObCallbatchImpTmp.do',
					msgSuccess : '成功删除该记录！',
					msgFailure : '操作出错，请联系管理员！',
					callback : function(fp, action) {
						var gridPanel = Ext.getCmp('ObCallbatchImpTmpGrid');
						if (gridPanel != null) {
							gridPanel.getStore().reload();
						}
						this.close();
					}
				});
	}// end of save

});