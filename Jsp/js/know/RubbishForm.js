/**
 * @author:zhangyl
 * @class RubbishForm
 * @extends Ext.Panel
 * @description 放入垃圾箱
 * @company 优创融联科技
 * @createtime: 2012年6月7日 19:25:04
 */
RubbishForm = Ext.extend(Ext.Window, {
	// 内嵌rubbishFormPanel
	// rubbishFormPanel : null,
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		RubbishForm.superclass.constructor.call(this, {
					layout : 'fit',
					items : this.formPanel,
					modal : true,
					height : 200,
					width : 400,
					maximizable : true,
					title : '放入垃圾箱',
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
			id : 'RubbishForm',
			labelAlign : 'right',
			labelWidth : 80,
			defaults : {
				anchor : '98%,98%'
			},
			defaultType : 'textfield',
			items : [{
						name : 'knowIds',
						xtype : 'hidden',
						value : this.knowIds == null ? '' : this.knowIds
					}, {
						fieldLabel : '放入垃圾箱',
						id : 'ukSysKnow.DelReason',
						hiddenName : 'delReason',
						displayField : 'itemName',
						valueField : 'itemId',
						xtype : 'combo',
						mode : 'local',
						editable : false,
						allowBlank : false,
						triggerAction : 'all',
						store : new Ext.data.SimpleStore({
							url : __ctxPath + '/system/loadItemByTypeDictionary.do',
							baseParams : {
								proTypeId : 10769
							},
							fields : ['itemId', 'itemName'],
							autoLoad : true,
							method : "post",
							listeners : {
								load : function() {
									var combo = Ext
											.getCmp('ukSysKnow.DelReason');
									var store = combo.getStore();
									var rows = [];// 定义数组
									for (var i = 0; i < store.getCount(); i++) { // store.getCount()为store的长度
										if (store.getAt(i).data['itemId'] == combo
												.getValue()) {
											combo
													.setValue(store.getAt(i).data['itemName']);
											break;
										}
									}

								}
							}
						})
					}, {
						fieldLabel : '备注',
						name : 'delRemark',
						maxLength : 200,
						xtype : 'textarea'
					},{
						name : 'mygridpanel',
						id : 'mygridpanel',
						maxLength : 200,
						xtype : 'hidden',
						value : this.mygridpanel == null ? '' : this.mygridpanel
					}

			]

		});

		// 初始化功能按钮
		this.buttons = [{
					text : '保存',
					iconCls : 'btn-save',
					scope : this,
					handler : this.save

				}, {
					text : '返回',
					iconCls : 'btn-cancel',
					scope : this,
					handler : this.cancel
				}];
	},// end of the initcomponents

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
		var mygridpanel = Ext.getCmp('mygridpanel').getValue();
		$postForm({
					formPanel : this.formPanel,
					scope : this,
					url : __ctxPath + '/know/rubbishUkSysKnow.do',
					callback : function(fp, action) {
						var gridPanel = Ext.getCmp(mygridpanel);
						if (gridPanel != null) {
							gridPanel.getStore().reload();
						}
						this.close();
					}
				});
	}// end of save

});
