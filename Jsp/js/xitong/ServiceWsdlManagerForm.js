/**
 * @author cf0666@gmail.com
 * @createtime
 * @class ServiceWsdlManagerForm
 * @extends Ext.Window
 * @description ServiceWsdlManager表单
 * @company 优创融联科技
 */
ServiceWsdlManagerForm = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		ServiceWsdlManagerForm.superclass.constructor.call(this, {
					id : 'ServiceWsdlManagerFormWin',
					layout : 'fit',
					items : this.formPanel,
					modal : true,
					height : 400,
					width : 500,
					maximizable : true,
					title : '接口详细信息',
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
		var gridPanel_method = new HT.EditorGridPanel({
			region : 'center',
			tbar : this.getTopBar('gridPanel_method'),
			height : 150,
			id : 'gridPanel_method',
			scrollHeight : true,
			clicksToEdit : 1,
			url : __ctxPath + "/xitong/getMethodServiceWsdlManager.do?serviceWsdlId="
			 + this.serviceWsdlId,
			fields : [{
						name : 'serviceWsdlMethodId',
						type : 'long'
					}, 'serviceWsdlMethod', 'serviceWsdlMethodName',
					'serviceWsdlMethodColumns', 'serviceWsdlMethodReturn',
					"comment"],
			columns : [{
						id : 'serviceWsdlMethodId',
						dataIndex : 'serviceWsdlMethodId',
						hidden : true
					}, {
						header : '接口方法名称',
						dataIndex : 'serviceWsdlMethod',
						editor : new Ext.form.TextField({})
					}, {
						header : '接口方法',
						dataIndex : 'serviceWsdlMethodName',
						editor : new Ext.form.TextField({})
					}, {
						header : '接口参数',
						dataIndex : 'serviceWsdlMethodColumns',
						editor : new Ext.form.TextField({})
					}, {
						header : '接口数据返回格式',
						dataIndex : 'serviceWsdlMethodReturn',
						editor : new Ext.form.TextField({})
					}, {
						header : '备注',
						dataIndex : 'comment',
						editor : new Ext.form.TextField({

						})
					}]
				// end of columns
			});
		this.formPanel = new Ext.FormPanel({
					layout : 'form',
					bodyStyle : 'padding:10px',
					border : false,
					autoScroll : true,
					// id : 'ServiceWsdlManagerForm',
					defaults : {
						anchor : '96%,96%'
					},
					defaultType : 'textfield',
					items : [{
						name : 'serviceWsdlManager.serviceWsdlId',
						xtype : 'hidden',
						value : this.serviceWsdlId == null ? '': this.serviceWsdlId
					}

					, {
						fieldLabel : '接口名称',
						name : 'serviceWsdlManager.serviceWsdlName',
						maxLength : 30
					}

					, {
						fieldLabel : '接口URL地址',
						name : 'serviceWsdlManager.serviceWsdlUrl',
						maxLength : 150
					}

					, {
						fieldLabel : '备注',
						name : 'serviceWsdlManager.comment',
						maxLength : 255
					}, gridPanel_method]
				});
		// 加载表单对应的数据
		if (this.serviceWsdlId != null && this.serviceWsdlId != undefined) {
			this.formPanel.loadData({
						url : __ctxPath
								+ '/xitong/getServiceWsdlManager.do?serviceWsdlId='
								+ this.serviceWsdlId,
						root : 'data',
						preName : 'serviceWsdlManager'
					});
		}

	},// end of the initcomponents

	getTopBar : function(gridId) {
		return new Ext.Toolbar({
					items : ['->', {
								iconCls : 'btn-del',
								text : '删除',
								xtype : 'button',
								handler : function() {
									var grid = Ext.getCmp(gridId);
									var store = grid.getStore();
									var sm = grid.getSelectionModel();
									var cell = sm.getSelections();
									if (cell.length < 1) {
										Ext.ux.Toast.msg('提示信息', '请至少选择一条记录!');
									} else {
										store.remove(cell);
									}
								}
							}, '->', {
								iconCls : 'btn-add',
								text : '添加',
								xtype : 'button',
								handler : function() {
									var grid = Ext.getCmp(gridId);
									var store = grid.getStore();
									var recordType = store.recordType;
									store.add(new recordType({})); // 添加一行空store
								}
							}]
				});
	},
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
		var tabs = Ext.getCmp('centerTabPanel');
		tabs.remove('ServiceWsdlManagerFormWin');
		this.destroy();
	},
	/**
	 * 保存记录
	 */
	save : function() {
		if (this.formPanel.getForm().isValid()) {
			var store = Ext.getCmp('gridPanel_method').getStore();
			var rows = [];
			for (var i = 0; i < store.getCount(); i++) {
				rows.push(store.getAt(i).data);
			}
		}
		$postSubForm({
					formPanel : this.formPanel,
					scope : this,
					url : __ctxPath + '/xitong/saveServiceWsdlManager.do',
					params : {
						method : Ext.encode(rows)
					},
					msgSuccess : '成功保存该记录！',
					msgFailure : '操作出错，请联系管理员！',
					callback : function(fp, action) {
						var gridPanel = Ext.getCmp('ServiceWsdlManagerGrid');
						if (gridPanel != null) {
							gridPanel.getStore().reload();
						}
						this.cancel();
					}
				});
	}// end of save

});