DictionaryEditForm = Ext.extend(Ext.Window, {
	// 内嵌FormPanel
	formPanel : null,
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		DictionaryEditForm.superclass.constructor.call(this, {
					layout : 'fit',
					id : 'DictionaryEditFormWin',
					iconCls : 'menu-dictionary',
					items : this.formPanel,
					title : '字典详细信息',
					width : 500,
					height : 320,
					modal : true,
					buttonAlign : 'center',
					buttons : this.buttons
				});
	},// end of the constructor
	// 初始化组件
	initUIComponents : function() {
		
		var comboparent = new Ext.data.SimpleStore({
					autoLoad : true,
					url : __ctxPath + '/system/comboByParentDictionary.do',
					fields : ['dicId', 'itemValue'],
					listeners : {
						afterload : function() {
							// Ext.getCmp('comboParentId').setValue(Ext.getCmp('dic.parentId').getValue());
						}
					}
				});
				
		checkItemIndex = function(val) {
			var itemIndex = Ext.get('itemIndex_edit').dom.value;
			var dicId = Ext.get('dicId_edit').dom.value;
			var parentId = Ext.getCmp('dicForm.proTypeId_edit').getValue();
			
				Ext.Ajax.request({
						url : __ctxPath + '/system/listDictionary.do',
						params : {
							'Q_itemIndex_S_EQ' : itemIndex,
							'Q_dicId_L_NEQ' : dicId,
							'parentId' : parentId
						},
						success : function(form, action) {
							if (val.length <= 0) {
								Ext.getCmp('itemIndex_edit').markInvalid('参数值不能为空!');
								Ext.getCmp('dic_btnSave_edit').disable();
							} else {
								var info = Ext.decode(form.responseText);
								if (info.totalCounts > 0) {
									Ext.getCmp('itemIndex_edit').markInvalid('参数值不能重复!');
									Ext.getCmp('dic_btnSave_edit').disable();
								} else {
									Ext.getCmp('itemIndex_edit').clearInvalid(true);
									Ext.getCmp('dic_btnSave_edit').enable();
								}
							}
						}
					});
		}

		this.formPanel = new Ext.FormPanel({
			url : __ctxPath + '/system/saveDictionary.do',
			layout : 'form',
			id : 'DictionaryEditForm',
			bodyStyle : 'padding:5px',
			border : false,
			labelWidth : 70,
			labelAlign : 'right',
			formId : 'DictionaryEditFormId',
			defaults : {
				anchor : '98%,98%'
			},
			items : [{
						name : 'dictionary.dicId',
						id : 'dicId_edit',
						xtype : 'hidden',
						value : this.dicId == null ? '' : this.dicId
					}, {
						xtype : 'hidden',
						id : 'dicForm.proTypeId_edit',
						name : 'dictionary.globalType.proTypeId'
					}, {
						fieldLabel : '所属分类',
						xtype : 'textfield',
						disabled : true,
						name : 'dictionary.itemName'
					}, {
						layout : 'column',
						border : false,
						items : [{
									layout : 'form',
									columnWidth : .5,
									border : false,
									items : [{
												fieldLabel : '名称',
												xtype : 'textfield',
												name : 'dictionary.itemValue',
												id : 'itemValue_edit',
												readOnly : true,
												allowBlank : false,
												anchor : '100%'
											}, {
												fieldLabel : '参数值',
												name : 'dictionary.itemIndex',
												id : 'itemIndex_edit',
												allowBlank : false,
												readOnly : true,
												validator : checkItemIndex,
												validationEvent : 'blur',
												xtype : 'textfield',
												anchor : '100%'
											}]
								}, {
									layout : 'form',
									columnWidth : .5,
									border : false,
									items : [{
												fieldLabel : '序号',
												xtype : 'textfield',
												readOnly : true,
												name : 'dictionary.sn',
												anchor : '100%'
//											}, {
//												xtype : 'checkbox',
//												name : 'calendarPlan',
//												anchor : '100%',
//												boxLabel : '高级设置',
//												listeners : {
//													check : function(com,checked) {
//														var pan1 = Ext.getCmp('dictionary.relaOperation_edit');
//														if (checked) {
//															pan1.show();
//														} else {
//															pan1.hide();
//														}
//
//													}
//												}
											}]
								}]
					}, {
						xtype : 'panel',
						border:false,
						labelWidth : 70,
						layout:'form',
//						hidden:true,
						id:'dictionary.relaOperation_edit',
			            labelAlign : 'right',
						anchor : '100%',
						items : [{
									fieldLabel : '关联操作',
									hiddenName : 'dictionary.relaOperation',
									xtype : 'mtdiccombo',
									editable : false,
									lazyInit : false,
									id : 'dictionary.relaOperation_id_edit',
									forceSelection : false,
									anchor : '99%',
									itemKey : 'XTGLCZ'
								}, {
									xtype : 'hidden',
									id : 'dictionary.proTypeId_hid_edit',
									name : 'dictionary.relType'
							}	, {
									fieldLabel : '级联分类',
									anchor : '99%',
									xtype : 'treecboType',
									editable : false,
									allowBlank : false,
									lazyInit : true,
									forceSelection : false,
									tplId : 'tree_tpl',
									id : 'trell-proType_edit',
									rootVisible : false,
									maxHeight : 300,
									url : __ctxPath
											+ '/system/treeGlobalType.do?catKey=DIC',
									forceSelection : false,
									listeners : {
										change : function(node) {
											Ext.getCmp('comboParentId_edit')
													.clearValue();
											this.selectedNode = node;
											// var parentId = node.id;
											var parentId = Ext
													.getCmp('trell-proType_edit')
													.getHiddenValue();
											if (parentId != null
													&& parentId != '') {
												Ext.getCmp('dictionary.proTypeId_hid_edit').setValue(parentId);
												Ext.Ajax.request({
													url : __ctxPath
															+ '/system/comboByParentDictionary.do',
													params : {
														'parentId' : parentId
													},
													method : 'post',
													success : function(response) {
														var result = Ext.util.JSON
																.decode(response.responseText);
														Ext
																.getCmp('comboParentId_edit')
																.getStore()
																.loadData(result);
														Ext
																.getCmp('comboParentId_edit')
																.clearValue();
													}
												});
											}
										}
									}
								}, {
									fieldLabel : '级联参数',
									// hideLabel : this.isTree == 0 ? true :
									// false,
									id : 'comboParentId_edit',
									xtype : 'combo',
									anchor : '99%',
									editable : false,
									allowBlank : false,
									lazyInit : false,
									// allowBlank : this.isTree == 0 ? true :
									// false,
									triggerAction : 'all',
									mode : 'local',
									// hidden : this.isTree == 0 ? true : false,
									store : [['', '']],
									forceSelection : false,
									displayField : 'itemValue',
									valueField : 'dicId',
									listeners : {
										scope : this,
										'select' : function(combo, record,
												index) {
											Ext.getCmp('dic.relDic_edit')
													.setValue(combo.value);
										}
									}
								}]
					}, {
						fieldLabel : '备注',
						name : 'dictionary.descp',
						id : 'descp_edit',
						readOnly : true,
						xtype : 'textarea',
						anchor : '99%'
					}, {
						name : 'dictionary.relDic',
						id : 'dic.relDic_edit',
						xtype : 'hidden'
					}]
		});

		if (this.dicId != null && this.dicId != 'undefined') {
			this.formPanel.loadData({
				deferredRender : false,
				url : __ctxPath + '/system/getDictionary.do?dicId='
						+ this.dicId,
				waitMsg : '正在载入数据...',
				root : 'data',
				preName : 'dictionary',
				success : function(form, action) {
					var result = Ext.decode(form.responseText);
					Ext.getCmp('dictionary.relaOperation_id_edit').setValue(result.data.relaOperation);
					var relDic = result.data.relDic;
					if(relDic!=null){
						Ext.Ajax.request({
									url : __ctxPath + '/system/getDictionary.do',
									async : true,
									scope : this,
									params : {
										'dicId' : relDic
									},
									method : 'post',
									success : function(response) {
										var res = Ext.util.JSON.decode(response.responseText);
										var typeName = res.data.globalType.typeName;
										var itemValue = res.data.itemValue;
										Ext.getCmp('comboParentId_edit').setValue(itemValue);
										Ext.getCmp('trell-proType_edit').setValue(typeName);
									}
								});
					}
				},
				failure : function(form, action) {
					// Ext.Msg.alert('编辑', '载入失败');
				}
			});
		};

		// 初始化功能按钮
		this.buttons = [{
					text : '保存',
					iconCls : 'btn-save',
					id : 'dic_btnSave_edit',
					handler : this.save.createCallback(this.formPanel, this)
				}, {
					text : '清空',
					iconCls : 'btn-reset',
					handler : this.reset.createCallback(this.formPanel)
				}, {
					text : '取消',
					iconCls : 'btn-cancel',
					handler : this.cancel.createCallback(this)
				}];
	},// end of the initcomponents
	/**
	 * 重置
	 * 
	 * @param {}
	 *            formPanel
	 */
	reset : function(formPanel) {
		formPanel.getForm().reset();
	},
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
		var callback = window.callback;
		if (formPanel.getForm().isValid()) {
			formPanel.getForm().submit({
						method : 'POST',
						waitMsg : '正在提交数据...',
						success : function(fp, action) {
							Ext.ux.Toast.msg('操作信息', action.result.msg);
							if (window.callback) {
								window.callback.call(this);
							}
							window.close();
						},
						failure : function(fp, action) {
							Ext.MessageBox.show({
										title : '操作信息',
										msg : action.result.msg,
										buttons : Ext.MessageBox.OK,
										icon : Ext.MessageBox.ERROR
									});
							window.close();
						}
					});
		}
	}// end of save
});
