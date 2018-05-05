DictionaryForm = Ext.extend(Ext.Window, {
	// 内嵌FormPanel
	formPanel : null,
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		DictionaryForm.superclass.constructor.call(this, {
					layout : 'fit',
					id : 'DictionaryFormWin',
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
			var itemIndex = Ext.get('itemIndex').dom.value;
			var dicId = Ext.get('dicId').dom.value;
			var parentId = Ext.getCmp('dicForm.parentId').getValue();
			
				Ext.Ajax.request({
						url : __ctxPath + '/system/listDictionary.do',
						params : {
							'Q_itemIndex_S_EQ' : itemIndex,
							'Q_dicId_L_NEQ' : dicId,
							'parentId' : parentId
						},
						success : function(form, action) {
							if (val.length <= 0) {
								Ext.getCmp('itemIndex').markInvalid('参数值不能为空!');
								Ext.getCmp('dic_btnSave').disable();
							} else {
								var info = Ext.decode(form.responseText);
								if (info.totalCounts > 0) {
									Ext.getCmp('itemIndex').markInvalid('参数值不能重复!');
									Ext.getCmp('dic_btnSave').disable();
								} else {
									Ext.getCmp('itemIndex').clearInvalid(true);
									Ext.getCmp('dic_btnSave').enable();
								}
							}
						}
					});
		}

		this.formPanel = new Ext.FormPanel({
			url : __ctxPath + '/system/saveDictionary.do',
			layout : 'form',
			id : 'DictionaryForm',
			bodyStyle : 'padding:5px',
			border : false,
			labelWidth : 70,
			labelAlign : 'right',
			formId : 'DictionaryFormId',
			defaults : {
				anchor : '98%,98%'
			},
			items : [{
						name : 'dictionary.dicId',
						id : 'dicId',
						xtype : 'hidden',
						value : this.dicId == null ? '' : this.dicId
					}, {
						xtype : 'hidden',
						value : this.parentId,
						id : 'dicForm.parentId',
						name : 'parentId'
					}, {
						xtype : 'hidden',
						id : 'itemName',
						name : 'dictionary.itemName',
						value : this.typeName
						// }, {
					// xtype : 'hidden',
					// id : 'sn',
					// name : 'dictionary.sn',
					// value : 0
				}	, {
						fieldLabel : '所属分类',
						xtype : 'label',
						text : this.typeName
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
												id : 'itemValue',
												allowBlank : false,
												maxLength : 64,
												anchor : '100%'
											}, {
												fieldLabel : '参数值',
												name : 'dictionary.itemIndex',
												id : 'itemIndex',
												allowBlank : false,
												validator : checkItemIndex,
												validationEvent : 'blur',
												xtype : 'textfield',
												maxLength : 64,
												anchor : '100%'
											}]
								}, {
									layout : 'form',
									columnWidth : .5,
									border : false,
									items : [{
												fieldLabel : '序号',
												xtype : 'textfield',
												name : 'dictionary.sn',
												maxLength : 18,
												anchor : '100%'
											}, {
												xtype : 'checkbox',
												name : 'calendarPlan',
												anchor : '100%',
												boxLabel : '高级设置',
												listeners : {
													check : function(com,checked) {
														var pan1 = Ext.getCmp('dictionary.relaOperation_panel');
														if (checked) {
															pan1.show();
														} else {
															pan1.hide();
														}

													}
												}
											}]
								}]
					}, {
						xtype : 'panel',
						border:false,
						labelWidth : 70,
						layout:'form',
						hidden:true,
						id:'dictionary.relaOperation_panel',
			            labelAlign : 'right',
						anchor : '100%',
						items : [{
									fieldLabel : '关联操作',
									hiddenName : 'dictionary.relaOperation',
									xtype : 'mtdiccombo',
									editable : true,
									lazyInit : false,
									id : 'dictionary.relaOperation_id',
									forceSelection : false,
									anchor : '99%',
									itemKey : 'XTGLCZ'
								}, {
									xtype : 'hidden',
									id : 'dictionary.proTypeId_hid',
									name : 'dictionary.relType'
							}	, {
									fieldLabel : '级联分类',
									anchor : '99%',
									xtype : 'treecboType',
									editable : true,
									lazyInit : true,
									tplId : 'tree_tpl',
									id : 'trell-proType',
									rootVisible : false,
									// rootText : '全国',
									maxHeight : 300,
									// value : '全国',
									// hiddenValue : '000000',
									// allowBlank : false,
									url : __ctxPath
											+ '/system/treeGlobalType.do?catKey=DIC',
									forceSelection : false,
									listeners : {
										change : function(node) {
											Ext.getCmp('comboParentId')
													.clearValue();
											this.selectedNode = node;
											// var parentId = node.id;
											var parentId = Ext
													.getCmp('trell-proType')
													.getHiddenValue();
											if (parentId != null
													&& parentId != '') {
												Ext.getCmp('dictionary.proTypeId_hid').setValue(parentId);
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
																.getCmp('comboParentId')
																.getStore()
																.loadData(result);
														Ext
																.getCmp('comboParentId')
																.clearValue();
													}
												});
											}
										}
									}
									// tree : {
									// loader : new Ext.ux.tree.JsonTreeLoader(
									// {
									// //root : 'menus',
									// url : __ctxPath +
									// '/system/treeLoadGlobalType.do?catKey=DIC'
									// }),
									// root : new Ext.tree.AsyncTreeNode()
									// }
								}, {
									fieldLabel : '级联参数',
									// hideLabel : this.isTree == 0 ? true :
									// false,
									id : 'comboParentId',
									xtype : 'combo',
									anchor : '99%',
									editable : true,
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
											Ext.getCmp('dic.relDic')
													.setValue(combo.value);
										}
									}
								}]
					}, {
						fieldLabel : '备注',
						name : 'dictionary.descp',
						id : 'descp',
						xtype : 'textarea',
						maxLength : 128,
						anchor : '99%'
					}, {
						name : 'dictionary.relDic',
						id : 'dic.relDic',
						xtype : 'hidden'
					}, {
						fieldLabel : '状态',
//						hiddenName : 'dictionary.statusId',
						name : 'dictionary.statusId',
						//allowBlank : false,
						xtype : 'hidden',
//						editable : false,
//						lazyInit : false,
//						forceSelection : false,
						anchor : '99%',
						value:1,
						itemKey : 'CONZT'
						
					}]
		});

		if (this.dicId != null && this.dicId != 'undefined') {
			this.formPanel.getForm().load({
				deferredRender : false,
				url : __ctxPath + '/system/getDictionary.do?dicId='
						+ this.dicId,
				waitMsg : '正在载入数据...',
				success : function(form, action) {
					// Ext.Msg.alert('编辑', '载入成功！');
					var result = Ext.decode(form.responseText);
					var relDic = result.data.relDic;
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
									var itemName = res.data.itemName;
									var itemValue = res.data.itemValue;
									Ext.getCmp('comboParentId').setValue(itemValue);
								}
							});
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
					id : 'dic_btnSave',
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
