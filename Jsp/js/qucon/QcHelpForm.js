/**
 * @author cf0666@gmail.com
 * @createtime
 * @class QcHelpForm
 * @extends Ext.Window
 * @description QcCheck表单
 * @company 优创融联科技
 */
QcHelpForm = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		QcHelpForm.superclass.constructor.call(this, {
					id : 'QcHelpFormWin',
					layout : 'fit',
					items : this.formPanel,
					modal : true,
					height : 400,
					width : 500,
					maximizable : true,
					title : '质检辅导详细信息',
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
		var gridPanel_contact1 = new HT.EditorGridPanel({
			region : 'center',
			height : 150,
			scrollHeight : true,
			clicksToEdit : 1,
			url : __ctxPath + "/xitong/getContactUlEmployee.do?useid=",
			fields : [{
						name : 'contactEmplId',
						type : 'int'
					}, 'contactType', 'contactValue'],
			columns : [{
						header : '类型',
						dataIndex : 'contactType',
						editor : new Ext.form.ComboBox({
									xtype : 'combo',
									editable : false,
									mode : 'local',
									triggerAction : 'all',
									store : [['1', '类型1'], ['0', '类型2']]
								})
					}, {
						header : '说明',
						dataIndex : 'contactValue',
						editor : new Ext.form.TextField({

						})
					}, {
						header : '文件',
						dataIndex : 'contactType',
						editor : new Ext.form.TextField({
									inputType : 'file'
								})
					}]
				// end of columns
			});
		var gridPanel_contact2 = new HT.EditorGridPanel({
			region : 'center',
			height : 150,
			scrollHeight : true,
			clicksToEdit : 1,
			url : __ctxPath + "/xitong/getContactUlEmployee.do?useid=",
			fields : [{
						name : 'contactEmplId',
						type : 'int'
					}, 'contactType', 'contactValue'],
			columns : [{
						header : '名称',
						dataIndex : 'contactType',
						editor : new Ext.form.TextField({

						})
					}, {
						header : '说明',
						dataIndex : 'contactValue',
						editor : new Ext.form.TextField({

						})
					}, {
						header : '讲师',
						dataIndex : 'contactType',
						editor : new Ext.form.TextField({
									inputType : 'file'
								})
					}]
				// end of columns
			});
		var gridPanel_contact3 = new HT.EditorGridPanel({
			region : 'center',
			height : 150,
			scrollHeight : true,
			clicksToEdit : 1,
			url : __ctxPath + "/xitong/getContactUlEmployee.do?useid=",
			fields : [{
						name : 'contactEmplId',
						type : 'int'
					}, 'contactType', 'contactValue'],
			columns : [{
						header : '标题',
						dataIndex : 'contactType'
					}, {
						header : '摘要',
						dataIndex : 'contactValue'
					}, {
						header : '业务类别',
						dataIndex : 'contactType'
					}, {
						header : '过期时间',
						dataIndex : 'contactType'
					}]
				// end of columns
			});
		this.formPanel = new Ext.FormPanel({
			layout : 'form',
			bodyStyle : 'padding:10px',
			border : false,
			autoScroll : true,
			labelAlign:'right',
			// id : 'QcHelpForm',
			defaults : {
				anchor : '96%,96%'
			},
			defaultType : 'textfield',
			items : [{
				xtype:'textarea',
				fieldLabel:'推荐说明',
				height:50,
				anchor:'95%'
			},{
				xtype : 'fieldset',
				title : "推荐资料",
				collapsible : true,
				autoHeight : true,
				defaults : {
					anchor : '100%,100%'
				},
				items : [gridPanel_contact1]
			},{
				xtype : 'fieldset',
				title : "课件",
				collapsible : true,
				autoHeight : true,
				defaults : {
					anchor : '100%,100%'
				},
				items : [gridPanel_contact2]
			},{
				xtype : 'fieldset',
				title : "知识",
				collapsible : true,
				autoHeight : true,
				defaults : {
					anchor : '100%,100%'
				},
				items : [gridPanel_contact3]
			}

			]
		});
		// 加载表单对应的数据
		if (this.chkId != null && this.chkId != 'undefined') {
			this.formPanel.loadData({
						url : __ctxPath + '/qucon/getQcCheck.do?chkId='
								+ this.chkId,
						root : 'data',
						preName : 'qcCheck'
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
					url : __ctxPath + '/qucon/saveQcCheck.do',
					callback : function(fp, action) {
						var gridPanel = Ext.getCmp('QcCheckGrid');
						if (gridPanel != null) {
							gridPanel.getStore().reload();
						}
						this.close();
					}
				});
	}// end of save

});