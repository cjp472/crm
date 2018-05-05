/**
 * @author cf0666@gmail.com
 * @createtime
 * @class UnimThrlevlForm
 * @extends Ext.Window
 * @description UnimThrlevl表单
 * @company 优创融联科技
 */
UnimThrlevlForm = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		UnimThrlevlForm.superclass.constructor.call(this, {
					id : 'UnimThrlevlFormWin',
					layout : 'fit',
					items : this.formPanel,
					modal : true,
					height : 400,
					width : 500,
					maximizable : true,
					title : '[UnimThrlevl]详细信息',
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
			// id : 'UnimThrlevlForm',
			defaults : {
				anchor : '96%,96%'
			},
			defaultType : 'textfield',
			items : [{
						name : 'unimThrlevl.thrlevlId',
						xtype : 'hidden',
						value : this.thrlevlId == null ? '' : this.thrlevlId
					}

					, {
						fieldLabel : '班长ID',
						hiddenName : 'unimThrlevl.monitorId',
						xtype : 'combo',
						editabel : false,
						lazyInit : false,
						triggerAction : 'all',
						store : new Ext.data.SimpleStore({
							autoLoad : true,
							url : __ctxPath + '/unim/listmonitorId.do',
							fields : ['monitorId', 'monitorIdName'],
							listeners : {
								load : function() {
									var combo = Ext.getCmp('monitorId');
									var store = combo.getStore();
									var rows = [];// 定义数组
									for (var i = 0; i < store.getCount(); i++) { // store.getCount()为store的长度
										if (store.getAt(i).data['monitorId'] == combo
												.getValue()) {
											combo
													.setValue(store.getAt(i).data['monitorIdName']);
											break;
										}
									}
								}
							}
						}),
						displayField : 'monitorIdName',
						valueField : 'monitorId',
						id : 'monitorId'
					}

					, {
						fieldLabel : '状态ID',
						hiddenName : 'unimThrlevl.statusId',
						xtype : 'combo',
						editabel : false,
						lazyInit : false,
						triggerAction : 'all',
						store : new Ext.data.SimpleStore({
							autoLoad : true,
							url : __ctxPath + '/unim/liststatusId.do',
							fields : ['statusId', 'statusIdName'],
							listeners : {
								load : function() {
									var combo = Ext.getCmp('statusId');
									var store = combo.getStore();
									var rows = [];// 定义数组
									for (var i = 0; i < store.getCount(); i++) { // store.getCount()为store的长度
										if (store.getAt(i).data['statusId'] == combo
												.getValue()) {
											combo
													.setValue(store.getAt(i).data['statusIdName']);
											break;
										}
									}
								}
							}
						}),
						displayField : 'statusIdName',
						valueField : 'statusId',
						id : 'statusId'
					}

					, {
						fieldLabel : '注意阀值',
						name : 'unimThrlevl.thrlevladv',
						xtype : 'numberfield'
					}

					, {
						fieldLabel : '警告阀值',
						name : 'unimThrlevl.thrlevlwar',
						xtype : 'numberfield'
					}

			]
		});
		// 加载表单对应的数据
		if (this.thrlevlId != null && this.thrlevlId != 'undefined') {
			this.formPanel.loadData({
						url : __ctxPath + '/unim/getUnimThrlevl.do?thrlevlId='
								+ this.thrlevlId,
						root : 'data',
						preName : 'unimThrlevl'
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
					url : __ctxPath + '/unim/saveUnimThrlevl.do',
					msgSuccess : '成功删除该记录！',
					msgFailure : '操作出错，请联系管理员！',
					callback : function(fp, action) {
						var gridPanel = Ext.getCmp('UnimThrlevlGrid');
						if (gridPanel != null) {
							gridPanel.getStore().reload();
						}
						this.close();
					}
				});
	}// end of save

});