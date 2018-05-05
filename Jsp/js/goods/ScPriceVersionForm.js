/**
 * @author cf0666@gmail.com
 * @createtime
 * @class ScPriceVersionForm
 * @extends Ext.Window
 * @description ScPriceVersion表单
 * @company 优创融联科技
 */
ScPriceVersionForm = Ext.extend(Ext.Window, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		ScPriceVersionForm.superclass.constructor.call(this, {
					id : 'ScPriceVersionFormWin',
					layout : 'fit',
					items : this.formPanel,
					modal : true,
					height : 300,
					width : 500,
					maximizable : true,
					title : '价格版本详细信息',
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
			labelAlign:'right',
			labelWidth:70,
			autoScroll : true,
			// id : 'ScPriceVersionForm',
			defaults : {
				anchor : '96%,96%'
			},
			items : [{
						layout : 'column',
						border : false,
						items : [{
									layout : 'form',
									columnWidth : .5,
									border : false,
									items : [{
												fieldLabel : '版本类型',
												name : 'scPriceVersion.versionType',
												xtype : 'combo',
												mode : 'local',
												anchor:'100%',
												store : []
											}, {
												fieldLabel : '版本名',
												xtype : 'textfield',
												name : 'scPriceVersion.versionName',
												maxLength : 50,
												anchor:'100%'
											}

											, {
												fieldLabel : '生效时间',
												name : 'scPriceVersion.effectTime',
												xtype : 'datefield',
												format : 'Y-m-d',
												anchor:'100%',
												value : new Date()
											}]
								}, {
									layout : 'form',
									border : false,
									columnWidth : .5,
									items : [{
												fieldLabel : '版本号',
												xtype : 'textfield',
												anchor:'100%',
												name : 'scPriceVersion.versionNum',
												maxLength : 50
											}

											, {
												border : false,
												height : 25
											}, {
												fieldLabel : '生效时间',
												anchor:'100%',
												name : 'scPriceVersion.effectTime',
												xtype : 'datefield',
												format : 'Y-m-d',
												value : new Date()
											}

									]

								}]

					}, {
						fieldLabel : '备注',
						name : 'scPriceVersion.desc',
						xtype : 'textarea',
						anchor:'96%',
						maxLength : 500
					}

			]
		});
		// 加载表单对应的数据
		if (this.versionId != null && this.versionId != 'undefined') {
			this.formPanel.loadData({
						url : __ctxPath
								+ '/goods/getScPriceVersion.do?versionId='
								+ this.versionId,
						root : 'data',
						preName : 'scPriceVersion'
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
					url : __ctxPath + '/goods/saveScPriceVersion.do',
					msgSuccess : '成功删除该记录！',
					msgFailure : '操作出错，请联系管理员！',
					callback : function(fp, action) {
						var gridPanel = Ext.getCmp('ScPriceVersionGrid');
						if (gridPanel != null) {
							gridPanel.getStore().reload();
						}
						this.close();
					}
				});
	}// end of save

});