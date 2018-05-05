/**
 * @author cf0666@gmail.com
 * @createtime
 * @class BeanObjectColumnsForm
 * @extends Ext.Window
 * @description BeanObjectColumns表单
 * @company 优创融联科技
 */
BeanObjectColumnsForm = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		BeanObjectColumnsForm.superclass.constructor.call(this, {
					id : 'BeanObjectColumnsFormWin',
					layout : 'fit',
					items : this.formPanel,
					modal : true,
					height : 400,
					width : 500,
					maximizable : true,
					title : '[BeanObjectColumns]详细信息',
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
			// id : 'BeanObjectColumnsForm',
			defaults : {
				anchor : '96%,96%'
			},
			defaultType : 'textfield',
			items : [{
				name : 'beanObjectColumns.beanObjectColumnsId',
				xtype : 'hidden',
				value : this.beanObjectColumnsId == null
						? ''
						: this.beanObjectColumnsId
			}

			, {
				fieldLabel : '数据实体内码',
				hiddenName : 'beanObjectColumns.beanObjectId',
				xtype : 'combo',
				editabel : false,
				lazyInit : false,
				triggerAction : 'all',
				store : new Ext.data.SimpleStore({
					autoLoad : true,
					url : __ctxPath + '/xitong/listbeanObjectId.do',
					fields : ['beanObjectId', 'beanObjectIdName'],
					listeners : {
						load : function() {
							var combo = Ext.getCmp('beanObjectId');
							var store = combo.getStore();
							var rows = [];// 定义数组
							for (var i = 0; i < store.getCount(); i++) { // store.getCount()为store的长度
								if (store.getAt(i).data['beanObjectId'] == combo
										.getValue()) {
									combo
											.setValue(store.getAt(i).data['beanObjectIdName']);
									break;
								}
							}
						}
					}
				}),
				displayField : 'beanObjectIdName',
				valueField : 'beanObjectId',
				id : 'beanObjectId'
			}

			, {
				fieldLabel : '数据实体参数',
				name : 'beanObjectColumns.beanObjectColumns',
				maxLength : 50
			}

			, {
				fieldLabel : '数据实体参数名',
				name : 'beanObjectColumns.beanObjectColumnsName',
				maxLength : 50
			}

			, {
				fieldLabel : '数据实体参数字段名',
				name : 'beanObjectColumns.beanObjectColumnsTame',
				maxLength : 50
			}

			, {
				fieldLabel : '备注',
				name : 'beanObjectColumns.comment',
				maxLength : 255
			}

			]
		});
		// 加载表单对应的数据
		if (this.beanObjectColumnsId != null
				&& this.beanObjectColumnsId != 'undefined') {
			this.formPanel.loadData({
				url : __ctxPath
						+ '/xitong/getBeanObjectColumns.do?beanObjectColumnsId='
						+ this.beanObjectColumnsId,
				root : 'data',
				preName : 'beanObjectColumns'
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
					url : __ctxPath + '/xitong/saveBeanObjectColumns.do',
					msgSuccess : '成功删除该记录！',
					msgFailure : '操作出错，请联系管理员！',
					callback : function(fp, action) {
						var gridPanel = Ext.getCmp('BeanObjectColumnsGrid');
						if (gridPanel != null) {
							gridPanel.getStore().reload();
						}
						this.close();
					}
				});
	}// end of save

});