/**
 * @author cf0666@gmail.com
 * @createtime
 * @class ConWwListForm
 * @extends Ext.Window
 * @description ConBwList表单
 * @company 优创融联科技
 */
ConWwListForm = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		ConWwListForm.superclass.constructor.call(this, {
					id : 'ConWwListFormWin',
					layout : 'fit',
					items : this.formPanel,
					modal : true,
					height : 400,
					width : 500,
					maximizable : true,
					title : '黑名单详细信息',
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
					// id : 'ConWwListForm',
					defaults : {
						anchor : '96%,96%'
					},
					defaultType : 'textfield',
					items : [{
								name : 'conBwList.bwId',
								xtype : 'hidden',
								value : this.bwId == null ? '' : this.bwId
							}

							, {
								fieldLabel : '禁呼类别',
								hiddenName : 'conBwList.bwTypId',
								allowBlank : false,
								xtype : 'mtdiccombo',
								editable : true,
								lazyInit : false,
								forceSelection : false,
								itemKey : 'CONJHLB'
							}

							, {
								fieldLabel : '禁呼类型',
								hiddenName : 'conBwList.objTypId',
								allowBlank : false,
								xtype : 'mtdiccombo',
								editable : true,
								lazyInit : false,
								forceSelection : false,
								itemKey : 'CONJHLX'
							}

							, {
								fieldLabel : '方向',
								hiddenName : 'conBwList.dirId',
								allowBlank : false,
								xtype : 'mtdiccombo',
								editable : true,
								lazyInit : false,
								forceSelection : false,
								itemKey : 'CONFX'
							}

							, {
								fieldLabel : '客户',
								name : 'conBwList.cusId',
								xtype : 'numberfield'
							}

							, {
								fieldLabel : '联系方式',
								hiddenName : 'conBwList.contactTypeId',
								allowBlank : false,
								xtype : 'mtdiccombo',
								editable : true,
								lazyInit : false,
								forceSelection : false,
								itemKey : 'CONLXLX'
							}

							, {
								fieldLabel : '区号/地区号',
								name : 'conBwList.preContactNum',
								maxLength : 256
							}

							, {
								fieldLabel : '号码/详细地址',
								name : 'conBwList.mainContactNum',
								allowBlank : false,
								maxLength : 256
							}

							, {
								fieldLabel : '分机号/邮编',
								name : 'conBwList.lastContactNum',
								maxLength : 256
							}

							, {
								fieldLabel : '处理方式',
								hiddenName : 'conBwList.dealTypId',
								allowBlank : false,
								xtype : 'mtdiccombo',
								editable : true,
								lazyInit : false,
								forceSelection : false,
								itemKey : 'CONCLFS'
							}

							, {
								fieldLabel : '时间限制',
								hiddenName : 'conBwList.bwTime',
								allowBlank : false,
								xtype : 'mtdiccombo',
								editable : true,
								lazyInit : false,
								forceSelection : false,
								itemKey : 'CONSJXZ'
							}

							, {
								fieldLabel : '业务限制',
								hiddenName : 'conBwList.bwBusi',
								allowBlank : false,
								xtype : 'mtdiccombo',
								editable : true,
								lazyInit : false,
								forceSelection : false,
								itemKey : 'CONYWXZ'
							}

							, {
								fieldLabel : '申请原因',
								hiddenName : 'conBwList.applyReaId',
								allowBlank : false,
								xtype : 'mtdiccombo',
								editable : true,
								lazyInit : false,
								forceSelection : false,
								itemKey : 'CONSQYY'
							}

							, {
								fieldLabel : '申请人',
								name : 'conBwList.applyId',
								allowBlank : false,
								xtype : 'numberfield'
							}

							, {
								fieldLabel : '申请时间',
								name : 'conBwList.applyTime',
								allowBlank : false,
								xtype : 'datefield',
								format : 'Y-m-d',
								value : new Date()
							}

							, {
								fieldLabel : '申请备注',
								name : 'conBwList.applyRemark',
								allowBlank : false,
								maxLength : 256
							}

							, {
								fieldLabel : '审核状态',
								hiddenName : 'conBwList.checkStateId',
								allowBlank : false,
								xtype : 'mtdiccombo',
								editable : true,
								lazyInit : false,
								forceSelection : false,
								itemKey : 'CONSHZT'
							}

							, {
								fieldLabel : '状态',
								hiddenName : 'conBwList.statusId',
								allowBlank : false,
								xtype : 'mtdiccombo',
								editable : true,
								lazyInit : false,
								forceSelection : false,
								itemKey : 'CONZT'
							}

					]
				});
		// 加载表单对应的数据
		if (this.bwId != null && this.bwId != 'undefined') {
			this.formPanel.loadData({
				url : __ctxPath + '/customer/getConBwList.do?bwId=' + this.bwId,
				root : 'data',
				preName : 'conBwList'
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
		$postForm({
					formPanel : this.formPanel,
					scope : this,
					url : __ctxPath + '/customer/saveMostConBwList.do',
					callback : function(fp, action) {
						var gridPanel = Ext.getCmp('ConBwListGrid');
						if (gridPanel != null) {
							gridPanel.getStore().reload();
						}
						this.close();
					}
				});
	}// end of save

});