/**
 * @author : chenfeng
 * @createtime
 * @class BmFactorValueForm
 * @extends Ext.Window
 * @description BmFactorValue表单
 * @company 北京灵信互动信息技术有限公司
 */
BmFactorValueForm = Ext.extend(Ext.Window, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		BmFactorValueForm.superclass.constructor.call(this, {
					id : 'BmFactorValueFormWin',
					layout : 'fit',
					items : this.formPanel,
					modal : true,
					height : 400,
					width : 500,
					maximizable : true,
					title : '影响因素取值详细信息',
					buttonAlign : 'center',
					buttons : [{
								text : '保存',
								iconCls : 'btn-save',
								scope : this,
								handler : this.save
							}, {
								text : '清空',
								iconCls : 'btn-reset',
								scope : this,
								handler : this.reset
							}, {
								text : '取消',
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
			// id : 'BmFactorValueForm',
			defaults : {
				anchor : '96%,96%'
			},
			defaultType : 'textfield',
			items : [{
						name : 'bmFactorValue.factorValueId',
						xtype : 'hidden',
						value : this.factorValueId == null
								? ''
								: this.factorValueId
					}, {
						fieldLabel : '影响因素主键',
						hiddenName : 'bmFactorValue.factorId',
						xtype : 'combo',
						editabel : false,
						lazyInit : false,
						triggerAction : 'all',
						forceSelection : true,
						store : new Ext.data.SimpleStore({
							autoLoad : true,
							url : __ctxPath + '/financial/comboBmFactor.do',
							fields : ['factorId', 'factorName'],
							listeners : {
								load : function() {
									var combo = Ext.getCmp('factorId');
									var store = combo.getStore();
									var rows = [];// 定义数组
									for (var i = 0; i < store.getCount(); i++) { // store.getCount()为store的长度
										if (store.getAt(i).data['factorId'] == combo
												.getValue()) {
											combo
													.setValue(store.getAt(i).data['factorName']);
											break;
										}
									}
								}
							}
						}),
						displayField : 'factorName',
						valueField : 'factorId',
						id : 'factorId'
					}

					, {
						fieldLabel : '影响因素标识',
						name : 'bmFactorValue.factorNum',
						maxLength : 30
					}

					, {
						fieldLabel : '影响因素值',
						name : 'bmFactorValue.factorValue',
						maxLength : 255
					}

					, {
						fieldLabel : '描述',
						name : 'bmFactorValue.comments',
						maxLength : 255
					}

			]
		});
		// 加载表单对应的数据
		if (this.factorValueId != null && this.factorValueId != 'undefined') {
			this.formPanel.loadData({
						url : __ctxPath
								+ '/financial/getBmFactorValue.do?factorValueId='
								+ this.factorValueId,
						root : 'data',
						preName : 'bmFactorValue'
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
					url : __ctxPath + '/financial/saveBmFactorValue.do',
					callback : function(fp, action) {
						var gridPanel = Ext.getCmp('BmFactorValueGrid');
						if (gridPanel != null) {
							gridPanel.getStore().reload();
						}
						this.close();
					}
				});
	}// end of save

});