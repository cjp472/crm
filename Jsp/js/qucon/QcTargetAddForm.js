/**
 * @author cf0666@gmail.com
 * @createtime
 * @class QcTargetForm
 * @extends Ext.Window
 * @description QcTarget表单
 * @company 优创融联科技
 */
QcTargetAddForm = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		QcTargetForm.superclass.constructor.call(this, {
					id : 'QcTargetAddFormWin',
					layout : 'fit',
					items : this.formPanel,
					modal : true,
					height : 400,
					width : 500,
					maximizable : true,
					title : '添加考核指标',
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
					labelAlign : 'right',
					autoScroll : true,
					// id : 'QcTargetForm',
					defaults : {
						anchor : '96%,96%'
					},
					defaultType : 'textfield',
					items : [{
								name : 'qcTarget.tarId',
								xtype : 'hidden',
								value : this.tarId == null ? '' : this.tarId
							},{
						        name : 'qcTarget.tarCatId',
						        xtype : 'hidden',
						        value : this.typeId
					         }
							, {
								fieldLabel : '标题',
								name : 'qcTarget.tarTopic',
								allowBlank : false,
								xtype : 'textarea',
								maxLength : 512
							}

							, {
								fieldLabel : '描述',
								name : 'qcTarget.tarContent',
								xtype : 'textarea',
								maxLength : 2048
							}

							, {
								fieldLabel : '备注',
								name : 'qcTarget.remark',
								xtype : 'textarea',
								maxLength : 2048
							}
					]
				});
		// 加载表单对应的数据
		if (this.tarId != null && this.tarId != 'undefined') {
			this.formPanel.loadData({
						url : __ctxPath + '/qucon/getQcTarget.do?tarId='
								+ this.tarId,
						root : 'data',
						preName : 'qcTarget'
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
		var panel=Ext.getCmp("centerTabPanel");
		panel.remove("QcTargetAddFormWin");
	},
	/**
	 * 保存记录
	 */
	save : function() {
		$postForm({
					formPanel : this.formPanel,
					scope : this,
					url : __ctxPath + '/qucon/saveQcTarget.do',
					callback : function(fp, action) {
						var gridPanel = Ext.getCmp('QcTargetGrid');
						if (gridPanel != null) {
							gridPanel.getStore().reload();
						}
						//this.close();
						var panel=Ext.getCmp("centerTabPanel");
						panel.remove("QcTargetAddFormWin");
					}
				});
	}// end of save

});