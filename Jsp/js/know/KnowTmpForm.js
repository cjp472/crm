/**
 * 增加修改FORM
 * 
 * @class KnowTmpForm
 * @extends Ext.Window
 */
var applyId = '';
KnowTmpForm = Ext.extend(Ext.Window, {
	// 内嵌FormPanel
	formPanel : null,
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		applyId = _cfg.applyId;
		// 必须先初始化组件
		this.initUIComponents();
		KnowTmpForm.superclass.constructor.call(this, {
					layout : 'fit',
					items : this.formPanel,
					modal : true,
					height : 100,
					width : 250,
					maximizable : true,
					title : '知识模版选择',
					buttonAlign : 'center',
					buttons : this.buttons
				});
	},// end of the constructor
	// 初始化组件
	initUIComponents : function() {
		this.formPanel = new Ext.FormPanel({
			layout : 'form',
			bodyStyle : 'padding:10px 10px 10px 10px',
			border : false,
			id : 'KnowTmpForm',
			labelAlign : 'right',
			labelWidth : 60,
			defaults : {
				anchor : '98%,98%'
			},
			defaultType : 'textfield',
			items : [{
						id : 'knowTypeId',
						xtype : 'hidden',
						value : this.knowTypeId == null ? '' : this.knowTypeId
					}, {
						id : 'applyId',
						xtype : 'hidden',
						value : this.applyId == null ? '' : this.applyId
					}, {
						labelAlign : 'right',
						fieldLabel : '知识模板',
						hiddenName : 'ukSysKnow.knowTmpId',
						allowBlank : false,
						xtype : 'combo',
						editable : false,
						lazyInit : false,
						triggerAction : 'all',
						store : new Ext.data.SimpleStore({
							autoLoad : true,
							url : __ctxPath
									+ '/know/comboUkKnowTemplate.do?key=22850',
							fields : ['knowTmpId', 'knowTmpIdName'],
							listeners : {
								load : function() {
									var combo = Ext.getCmp('knowTmpId');
									var store = combo.getStore();
									var rows = [];// 定义数组
									for (var i = 0; i < store.getCount(); i++) { //
										store.getCount()
										if (store.getAt(i).data['knowTmpId'] == combo.getValue()) {
											combo.setValue(store.getAt(i).data['knowTmpIdName']);
											break;
										}
									}
								}
							}
						}),
						displayField : 'knowTmpIdName',
						valueField : 'knowTmpId',
						id : 'knowTmpId'
					}

			]

		});

		// 初始化功能按钮
		this.buttons = [{
					text : '下一步',
					iconCls : 'add-all',
					handler : this.save.createCallback(this.formPanel, this)
				}, {
					text : '返回',
					iconCls : 'btn-cancel',
					handler : this.cancel.createCallback(this)
				}];
	},// end of the initcomponents

	/**
	 * 取消
	 * 
	 * @param {}
	 *            window
	 */
	cancel : function(window) {
		window.close();
	},

	/**
	 * 保存记录
	 */
	save : function(formPanel, window) {
		if (formPanel.getForm().isValid()) {
			var knowTmpId = Ext.getCmp('knowTmpId').getValue();
			var applyId = Ext.getCmp('applyId').getValue();
			var knowTypeId = Ext.getCmp('knowTypeId').getValue();
			var tabs = Ext.getCmp('centerTabPanel');
			var edit = tabs.getItem('UkKnowCollectFormWin');
			if (edit != null) {
				tabs.remove('UkKnowCollectFormWin');
				edit.destroy();
			}
			if (Ext.getCmp('UkSysKnowShow') != null) {
			tabs.remove('UkSysKnowShow');
		}
			edit = new UkKnowCollectForm({
						knowTmpId : knowTmpId,
						applyId : applyId,
						knowTypeId : knowTypeId
					});
			tabs.add(edit);
			tabs.activate(edit);
			window.close();
		}
	}// end of save

});
