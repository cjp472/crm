/**
 * @author cf0666@gmail.com
 * @createtime
 * @class ScGoodsPriceRuleForm
 * @extends Ext.Window
 * @description ScGoodsPriceRule表单
 * @company 优创融联科技
 */
ScGoodsPriceRuleForm = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		ScGoodsPriceRuleForm.superclass.constructor.call(this, {
					id : 'ScGoodsPriceRuleFormWin',
					layout : 'fit',
					items : this.formPanel,
					modal : true,
					height : 400,
					width : 500,
					maximizable : true,
					title : '销售定价规则详细信息',
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
			// id : 'ScGoodsPriceRuleForm',
			defaults : {
				anchor : '96%,96%'
			},
			defaultType : 'textfield',
			items : [{
						name : 'scGoodsPriceRule.priceRuleId',
						xtype : 'hidden',
						value : this.priceRuleId == null
								? ''
								: this.priceRuleId
					}

					, {
						fieldLabel : '版本内码',
						hiddenName : 'scGoodsPriceRule.versionId',
						allowBlank : false,
						xtype : 'combo',
						editabel : false,
						lazyInit : false,
						triggerAction : 'all',
						store : new Ext.data.SimpleStore({
							autoLoad : true,
							url : __ctxPath + '/goods/listversionId.do',
							fields : ['versionId', 'versionIdName'],
							listeners : {
								load : function() {
									var combo = Ext.getCmp('versionId');
									var store = combo.getStore();
									var rows = [];// 定义数组
									for (var i = 0; i < store.getCount(); i++) { // store.getCount()为store的长度
										if (store.getAt(i).data['versionId'] == combo
												.getValue()) {
											combo
													.setValue(store.getAt(i).data['versionIdName']);
											break;
										}
									}
								}
							}
						}),
						displayField : 'versionIdName',
						valueField : 'versionId',
						id : 'versionId'
					}

					, {
						fieldLabel : '价格变化',
						name : 'scGoodsPriceRule.priceChange',
						xtype : 'textarea',
						maxLength : 300
					}

					, {
						fieldLabel : '价格条件',
						name : 'scGoodsPriceRule.priceCondition',
						xtype : 'textarea',
						maxLength : 300
					}

					, {
						fieldLabel : '优先级',
						name : 'scGoodsPriceRule.priorLevel',
						xtype : 'combo',
						mode:'local',
						store:[]
					}
					, {
						fieldLabel : '备注',
						name : 'scGoodsPriceRule.desc',
						xtype : 'textarea',
						maxLength : 500
					}

			]
		});
		// 加载表单对应的数据
		if (this.priceRuleId != null && this.priceRuleId != 'undefined') {
			this.formPanel.loadData({
						url : __ctxPath
								+ '/goods/getScGoodsPriceRule.do?priceRuleId='
								+ this.priceRuleId,
						root : 'data',
						preName : 'scGoodsPriceRule'
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
					url : __ctxPath + '/goods/saveScGoodsPriceRule.do',
					msgSuccess : '成功删除该记录！',
					msgFailure : '操作出错，请联系管理员！',
					callback : function(fp, action) {
						var gridPanel = Ext.getCmp('ScGoodsPriceRuleGrid');
						if (gridPanel != null) {
							gridPanel.getStore().reload();
						}
						this.close();
					}
				});
	}// end of save

});