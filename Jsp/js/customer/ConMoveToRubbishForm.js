/**
 * @author:wangzj
 * @class ConMoveToRubbishForm
 * @extends Ext.Window
 * @description 转移
 * @company 优创融联科技
 * @createtime: 2012年6月18日 17:53:08
 */
ConMoveToRubbishForm = Ext.extend(Ext.Window, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		ConMoveToRubbishForm.superclass.constructor.call(this, {
					layout : 'fit',
					items : this.formPanel,
					modal : true,
					width:500,
					height:280,
					maximizable : true,
					title:'放入垃圾箱',
					id:'ConMoveToRubbishFormWin',
					buttonAlign : 'center',
					buttons : this.buttons
				});
	},// end of the constructor
	// 初始化组件
	initUIComponents : function() {
		this.formPanel = new Ext.FormPanel({
					layout : 'form',
					labelWidth : 50,
					style : 'padding:10px;background-color:#fff',
					bodyStyle : 'padding:10px 10px 10px 10px',
					border : false,
					id : 'ConMoveToRubbishForm',
					labelAlign : 'right',
					defaults : {
						anchor : '98%,98%'
					},
					defaultType : 'textfield',
					items : [{
								name : 'conIds',
								xtype : 'hidden',
								value : this.conId == null ? '' : this.conId
							}, {
								fieldLabel : '原因',
								hiddenName : 'dealResId',
								allowBlank : false,
								xtype : 'mtdiccombo',
								editable : true,
								lazyInit : false,
								forceSelection : false,
								itemKey : 'CONLJXREASON',
								anchor : '100%'
							}, {
								xtype : 'textarea',
								fieldLabel : '备注',
								name : 'dealRemarks',
								anchor : '100%',
								height : 100
							}]
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
		var mygridpanel = this.mygridpanel;
		var lajixiangGrid = this.lajixiangGrid;
		$postForm({
					formPanel : this.formPanel,
					scope : this,
					url : __ctxPath + '/customer/saveFromWeichuliConWeichuli.do',
					callback : function(fp, action) {
						var gridPanel = Ext.getCmp(mygridpanel);
						if (gridPanel != null) {
							gridPanel.getStore().reload();
						}
						var gridPan = Ext.getCmp(lajixiangGrid);
						if (gridPan != null) {
							gridPan.getStore().reload();
						}
						this.close();
					}
				});
	}// end of save

});
