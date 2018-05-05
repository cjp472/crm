/**
 * @author cf0666@gmail.com
 * @createtime
 * @class BeanObjectForm
 * @extends Ext.Window
 * @description BeanObject表单
 * @company 优创融联科技
 */
BeanObjectForm = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		BeanObjectForm.superclass.constructor.call(this, {
					id : 'BeanObjectForm',
					layout : 'form',
					items : [this.formPanel, this.gridPanel],
					modal : true,
					height : 400,
					width : 500,
					maximizable : true,
					title : '数据实体详细信息',
					buttonAlign : 'center',
					tbar : this.initToolbar()
				});
	},// end of the constructor
	// 初始化组件
	initUIComponents : function() {
		var headId = this.beanObjectId ? this.beanObjectId : -1; // 主表Id
		
		checkOrgName = function() {
					var orgName = Ext.get('beanObject.beanObjectName').dom.value;
					var orgId = Ext.get('beanObject.beanObjectId').dom.value;
					if (orgName.length <= 0) {
						Ext.getCmp('btnSave').disable();
						return '数据实体名称不能为空!';
					} else {
						Ext.Ajax.request({
									url : __ctxPath
											+ '/xitong/listBeanObject.do',
									params : {
										'Q_beanObjectName_S_EQ' : orgName,
										'Q_beanObjectId_L_NEQ' : orgId
									},
									success : function(form, action) {
										var info = Ext
												.decode(form.responseText);
										if (info.totalCounts > 0) {
											Ext
													.getCmp('beanObject.beanObjectName')
													.markInvalid('该实体名称已被引用,请重新输入!');
											// Ext.getCmp("btnSave").hide();
											Ext.getCmp('btnSave').disable();
										} else {
											Ext
													.getCmp('beanObject.beanObjectName')
													.clearInvalid(true);
											// Ext.getCmp("btnSave").show();
											Ext.getCmp('btnSave').enable();
										}
									}
								});
					}
				};
				checkOrgName2 = function() {
					var orgName = Ext.get('beanObject.beanObjectName2').dom.value;
					var orgId = Ext.get('beanObject.beanObjectId').dom.value;
					if (orgName.length <= 0) {
						Ext.getCmp('btnSave').disable();
						return '数据实体不能为空!';
					} else {
						Ext.Ajax.request({
									url : __ctxPath
											+ '/xitong/listBeanObject.do',
									params : {
										'Q_beanObjectName2_S_EQ' : orgName,
										'Q_beanObjectId_L_NEQ' : orgId
									},
									success : function(form, action) {
										var info = Ext
												.decode(form.responseText);
										if (info.totalCounts > 0) {
											Ext
													.getCmp('beanObject.beanObjectName2')
													.markInvalid('该数据实体已被引用,请重新输入!');
											// Ext.getCmp("btnSave").hide();
											Ext.getCmp('btnSave').disable();
										} else {
											Ext
													.getCmp('beanObject.beanObjectName2')
													.clearInvalid(true);
											// Ext.getCmp("btnSave").show();
											Ext.getCmp('btnSave').enable();
										}
									}
								});
					}
				};
				checkOrgTname = function() {
					var orgName = Ext.get('beanObject.beanObjectTname').dom.value;
					var orgId = Ext.get('beanObject.beanObjectId').dom.value;
					if (orgName.length <= 0) {
						Ext.getCmp('btnSave').disable();
						return '数据实体表名不能为空!';
					} else {
						Ext.Ajax.request({
									url : __ctxPath
											+ '/xitong/listBeanObject.do',
									params : {
										'Q_beanObjectTname_S_EQ' : orgName,
										'Q_beanObjectId_L_NEQ' : orgId
									},
									success : function(form, action) {
										var info = Ext
												.decode(form.responseText);
										if (info.totalCounts > 0) {
											Ext
													.getCmp('beanObject.beanObjectTname')
													.markInvalid('该数据实体表名已被引用,请重新输入!');
											// Ext.getCmp("btnSave").hide();
											Ext.getCmp('btnSave').disable();
										} else {
											Ext
													.getCmp('beanObject.beanObjectTname')
													.clearInvalid(true);
											// Ext.getCmp("btnSave").show();
											Ext.getCmp('btnSave').enable();
										}
									}
								});
					}
				};
		this.formPanel = new Ext.FormPanel({
					layout : 'form',
					bodyStyle : 'padding:10px',
					border : false,
					autoScroll : true,
					// id : 'BeanObjectForm',
					defaults : {
						anchor : '96%,96%'
					},
					defaultType : 'textfield',
					items : [{
						name : 'beanObject.beanObjectId',
						id : 'beanObject.beanObjectId',
						xtype : 'hidden',
						value : this.beanObjectId == null
								? ''
								: this.beanObjectId
					}, {
						fieldLabel : '数据实体名称',
						name : 'beanObject.beanObjectName',
						id : 'beanObject.beanObjectName',
						maxLength : 50,
						allowBlank : false,
						validator : checkOrgName
					}, {
						fieldLabel : '数据实体',
						name : 'beanObject.beanObjectName2',
						id : 'beanObject.beanObjectName2',
						maxLength : 50,
						allowBlank : false,
						validator : checkOrgName2
					}, {
						fieldLabel : '数据实体表名',
						name : 'beanObject.beanObjectTname',
						id : 'beanObject.beanObjectTname',
						maxLength : 50,
						allowBlank : false,
						validator : checkOrgTname
					}, {
						fieldLabel : '备注',
						name : 'beanObject.comment',
						maxLength : 255
					}]
				});

		this.topbar = new Ext.Toolbar({
					items : [{
								iconCls : 'btn-add',
								text : '数据实体字段',
								id : 'add',
								xtype : 'button',
								scope : this,
								handler : this.createRs
							}, {
								iconCls : 'btn-del',
								text : '删除数据实体字段',
								id : 'del',
								xtype : 'button',
								scope : this,
								handler : this.removeSelRs
							}]
				});
		this.gridPanel = new HT.EditorGridPanel({
			tbar : this.topbar,
			showPaging : false, // 去掉分页
			autoHeight : true, // 自动增加高度
			clicksToEdit : 1,
			id : 'BeanObjectColumnsGrid',
			title : '数据实体字段信息',
			height : 220,
			defaults : {
				anchor : '96%,96%'
			},
			url : __ctxPath
					+ "/xitong/listBeanObjectColumns.do?Q_beanObject.beanObjectId_L_EQ="
					+ headId,
			fields : [{
						name : 'beanObjectColumnsId',
						type : 'int'
					}, 'beanObjectColumns', 'beanObjectColumns',
					'beanObjectColumnsName', 'beanObjectColumnsTame','isExt','columnType',
					'createBy', 'updateBy', 'createDate', 'updateDate',
					'comment'],
			columns : [{
						header : 'beanObjectColumnsId',
						dataIndex : 'beanObjectColumnsId',
						hidden : true
					}, {
						header : '数据实体参数名',
						dataIndex : 'beanObjectColumnsName',
						editor : new Ext.form.TextField({
									id : 'beanObjectColumnsName',
									maxLength : 50,
									allowBlank : false
								})

					}, {
						header : '数据实体参数',
						dataIndex : 'beanObjectColumns',
						editor : new Ext.form.TextField({
									id : 'beanObjectColumns',
									maxLength : 50,
									allowBlank : false
								})

					}, {
						header : '数据实体参数字段名',
						dataIndex : 'beanObjectColumnsTame',
						editor : new Ext.form.TextField({
									id : 'beanObjectColumnsTame',
									maxLength : 50,
									allowBlank : false
								})

					}, {
						header : '备注',
						dataIndex : 'comment',
						editor : new Ext.form.TextField({
									id : 'comment',
									maxLength : 50,
									allowBlank : false
								})

					},{
						header : '扩展字段',
						dataIndex : 'isExt',
						editor : new Ext.form.ComboBox({
								name : 'isExt',
								allowBlank : false,
								id : 'isExt',
								displayField : 'itemName',
								valueField : 'itemId',
								mode : 'local',
								triggerAction : 'all',
								forceSelection : false,
								hiddenName : 'isExt',
								store : new Ext.data.SimpleStore({
									url : __ctxPath + '/system/loadItemDictionary.do',
									baseParams : {
										itemName : '是否'
									},
									fields : ['itemId', 'itemName'],
									autoLoad : true,
									method : "post",
									listeners : {
										load : function() {
											var combo = Ext.getCmp('isExt');
											var store = combo.getStore();
											var rows = [];// 定义数组
											for (var i = 0; i < store.getCount(); i++) { // store.getCount()为store的长度
												if (store.getAt(i).data['itemId'] == combo.getValue()) {
													combo.setValue(store.getAt(i).data['itemName']);
													break;
												}
											}

										}
									}
								})
							}),
							renderer : function(value) {
								if (value != null) {
									return YorN.get(value);
								} else {
									return ' ';
								}
							}

					},{
						header : '字段类型',
						dataIndex : 'columnType',
						editor : new Ext.form.ComboBox({
								name : 'columnType',
								allowBlank : false,
								id : 'columnType',
								displayField : 'itemName',
								valueField : 'itemId',
								mode : 'local',
								triggerAction : 'all',
								forceSelection : false,
								hiddenName : 'columnType',
								store : new Ext.data.SimpleStore({
									url : __ctxPath + '/system/loadItemDictionary.do',
									baseParams : {
										itemName : '字段类型'
									},
									fields : ['itemId', 'itemName'],
									autoLoad : true,
									method : "post",
									listeners : {
										load : function() {
											var combo = Ext.getCmp('columnType');
											var store = combo.getStore();
											var rows = [];// 定义数组
											for (var i = 0; i < store.getCount(); i++) { // store.getCount()为store的长度
												if (store.getAt(i).data['itemId'] == combo.getValue()) {
													combo.setValue(store.getAt(i).data['itemName']);
													break;
												}
											}

										}
									}
								})
							}),
							renderer : function(value) {
								if (value != null) {
									return Column_Type.get(value);
								} else {
									return ' ';
								}
							}
					}]
				// end of columns
		});
		// 加载表单对应的数据
		if (this.beanObjectId != null && this.beanObjectId != 'undefined') {
			this.formPanel.loadData({
						url : __ctxPath
								+ '/xitong/getBeanObject.do?beanObjectId='
								+ this.beanObjectId,
						root : 'data',
						preName : 'beanObject'
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
		var tabs = Ext.getCmp('centerTabPanel');
		tabs.remove('BeanObjectFormWin');
	},
	/**
	 * 添加明细
	 */
	createRs : function() {
		var store = this.gridPanel.getStore();
		var recordType = store.recordType;
		store.add(new recordType({}))
	},
	/**
	 * 把选中ID删除
	 */
	removeSelRs : function() {
		var store = this.gridPanel.getStore();
		var sm = this.gridPanel.getSelectionModel();
		var cell = sm.getSelections();
		if(cell.length<1){
			Ext.ux.Toast.msg('提示信息', '请至少选择一条记录!');
		} else {
			store.remove(cell);
		}
	},
	/**
	 * 保存记录
	 */
	save : function() {
		var store = this.gridPanel.getStore();
		var rows = [];// 定义数组
		var flag1 = true;
		var flag2 = true;
		var flag3 = true;
		for (var i = 0; i < store.getCount(); i++) { // store.getCount()为store的长度
			rows.push(store.getAt(i).data);// 放到数组里
			if (store.getAt(i).data.beanObjectColumnsName == null) {
				flag1 = false;
			}
			if (store.getAt(i).data.beanObjectColumns == null) {
				flag2 = false;
			}
			if (store.getAt(i).data.beanObjectColumnsTame == null) {
				flag3 = false;
			}
		}
		if (store.getCount() > 0) {
			if (flag1 && flag2 && flag3) {
				$postSubForm({
							formPanel : this.formPanel,
							scope : this,
							url : __ctxPath + '/xitong/saveBeanObject.do',
							params : {
								details : Ext.encode(rows)
							},
							msgSuccess : '成功保存该记录！',
							msgFailure : '操作出错，请联系管理员！',
							callback : function(fp, action) {
								var gridPanel = Ext.getCmp('BeanObjectGrid');
								if (gridPanel != null) {
									gridPanel.getStore().reload();
								}
								var tabs = Ext.getCmp('centerTabPanel');
//								tabs.remove('BeanObjectFormWin');
								tabs.remove('BeanObjectForm');
							}
						});
			} else {
				if (flag1 == false)
					Ext.ux.Toast.msg('操作信息', '数据实体参数名是必填项！');
				if (flag2 == false)
					Ext.ux.Toast.msg('操作信息', '数据实体参数是必填项！');
				if (flag3 == false)
					Ext.ux.Toast.msg('操作信息', '数据实体参数字段名是必填项！');
			}

		} else {
			Ext.ux.Toast.msg('操作信息', '请添加数据实体字段！');
		}
	}// end of save

});

BeanObjectForm.prototype.initToolbar = function() {
	var toolbar = new Ext.Toolbar({
				width : '100%',
				height : 30,
				items : ['->', {
							text : __cancel,
							iconCls : 'btn-cancel',
							scope : this,
							handler : this.cancel
						}, '->', {
							text : __save,
							iconCls : 'btn-save',
							id : 'btnSave',
							scope : this,
							handler : this.save
						}
				// , {
				// text : __reset,
				// iconCls : 'btn-reset',
				// scope : this,
				// handler : this.reset
				// }
				]
			});
	return toolbar;
}