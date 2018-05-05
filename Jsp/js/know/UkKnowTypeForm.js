
UkKnowTypeForm = Ext.extend(Ext.Window, {// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		UkKnowTypeForm.superclass.constructor.call(this, {
					id : 'UkKnowTypeFormWin',
					layout : 'fit',
					items : this.formPanel,
					modal : true,
					height : 490,
					width : 620,
					maximizable : true,
					title : __ukKnowTypeDetailHeading,
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
//			bodyStyle : 'padding:10px',
			border : false,
			autoScroll : true,
			id : 'UkKnowTypeForm',
			labelAlign : 'right',
			labelWidth : 70,
			defaults : {
				anchor : '100%,100%'
			},
			defaultType : 'textfield',
			items : [{
						// fieldLabel : __ukKnowTypeKnowTypeId,
						name : 'ukKnowType.knowTypeId',
						hidden : true,
						value : this.knowTypeId == 'undefined'
								? ''
								: this.knowTypeId
					}, {
						anchor : '96%',
						layout : 'column',
						border : false,
						xtype : 'panel',
						items : [{
									xtype : 'panel',
									layout : 'form',
									columnWidth : .5,
									border : false,
									labelWidth : 70,
									anchor : '100%',
									items : [{
										fieldLabel : '分类名称 ',
										name : 'ukKnowType.name',
										xtype : 'textfield',
										anchor : '100%',
										labelWidth : 70,
										allowBlank : false
											// blankText : '名称必须输入！'
										}]
								}, {
									xtype : 'panel',
									layout : 'form',
									anchor : '100%',
									columnWidth : .5,
									border : false,
									items : [{
										fieldLabel : '上级分类',
										xtype : 'textfield',
										labelWidth : 70,
										anchor : '100%',
										id : 'ukKnowTypeForm.ukKnowTypeName',
										allowBlank : false,
										readOnly : true,
										value : this.nodeText == 'undefined'
												? ''
												: this.nodeText
									}]
								}]

					}, {
						fieldLabel : '描述',
						name : 'ukKnowType.comMent',
						xtype : 'textarea',
						anchor:'96%',
						maxLength : 30
					}, {
						fieldLabel : '模板',
						name : 'ukKnowType.parentId',
						xtype : 'hidden',
						value : this.nodeId == 'undefined' ? '' : this.nodeId,
						readOnly : true
					}
								,{
						fieldLabel : __ukKnowTypeKnowTmpId,
						displayField : 'knowTmpIdName',
						valueField : 'knowTmpId',
						id : 'bad_knowTmpId',anchor:'96%',
						// hiddenName : 'ukKnowType.knowTmpId',
						xtype : 'combo',
						mode : 'local',
						// allowBlank : false,
						editable : false,
						triggerAction : 'all',
						store : new Ext.data.SimpleStore({
							autoLoad : true,
							url : __ctxPath
									+ '/know/comboUkKnowTemplate.do?key=22850',
							fields : ['knowTmpId', 'knowTmpIdName'],
							listeners : {
								load : function() {
									var combo = Ext.getCmp('bad_knowTmpId');
									var store = combo.getStore();
									var rows = [];// 定义数组
									for (var i = 0; i < store.getCount(); i++) { // store.getCount()为store的长度
										if (store.getAt(i).data['knowTmpId'] == combo
												.getValue()) {
											combo
													.setValue(store.getAt(i).data['knowTmpIdName']);
											break;
										}
									}
								}
							}
						}),
						listeners : {
							select : function(cbo, record, index) {
								Ext.getCmp('ukKnowType.knowTmpId')
										.setValue(cbo.value);
							}
						}

					}, {
						anchor : '96%',
						layout : 'column',
						border : false,
						xtype : 'panel',
						items : [{
							xtype : 'panel',
							layout : 'form',

							columnWidth : .5,
							border : false,
							anchor : '100%',
							items : [{
								fieldLabel : '访问管理',
								xtype : 'mtdiccombo',
								allowBlank : false,
								editable : false,
								forceSelection : false,
								hiddenName : 'ukKnowType.grantAccess',
								id : 'ukKnowTypeForm.grantAccess',
								itemKey : 'KNOW_FWGL',
								anchor : '100%',
								listeners : {
									select : function(cbo, record, index) {
										var p = Ext
												.getCmp('UkKnowTypeForm_panel');
										if (cbo.value == 1) {
											p.hide();
										} else {
											p.show();
										}
									}
								}
							}]
						}, {
							xtype : 'panel',
							layout : 'form',
							anchor : '100%',
							columnWidth : .5,
							border : false,
							items : [{
								fieldLabel : '访问权限',
								xtype : 'mtdiccombo',
								allowBlank : false,
								editable : false,
								forceSelection : false,
								hiddenName : 'ukKnowType.accessPurview',
								id : 'ukKnowTypeForm.accessPurview',
								itemKey : 'KNOWCATE_QUANXIAN',
								anchor : '100%',
								listeners : {}
							}]
						}]

					}, {
						xtype : 'panel',
						border : false,
						anchor : '100%',
						layout : 'form',

						id : 'UkKnowTypeForm_panel',
						height : 230,
						items : [{
							xtype : 'fieldset',
							title : '访问授权',
							anchor : '100%',
							layout:'fit',
							height : 200,
							items : [{
								xtype : 'itemselector',
								fromLegend : '',
								flex : 1,
								name : 'ukKnowTypeRoles',
								imagePath : __ctxPath + '/ext3/ux/images/',
								defaults : {
									anchor : '100%,100%'
								},
								labelWidth : 1,
								layout : {
									type : 'hbox',
									align : 'stretch'
								},
								multiselects : [{
									height : 150,
									width : 250,
									autoWidth : true,
									store : new Ext.data.SimpleStore({
										autoLoad : true,
										baseParams : {
//											userId : curUserInfo.userId
											knowTypeId : this.knowTypeId
										},
										url : __ctxPath
												+ '/know/chooseRolesUkKnowType.do',
										fields : ['roleId', 'roleName']
									}),
									displayField : 'roleName',
									valueField : 'roleId'
								}, {
									name : 'selectedRoles',
									height : 150,
									width : 250,
									store : new Ext.data.SimpleStore({
										autoLoad : true,
										baseParams : {
//											userId : curUserInfo.userId
											knowTypeId : this.knowTypeId
										},
										url : __ctxPath
												+ '/know/selectedRolesUkKnowType.do',
										fields : ['roleId', 'roleName']
									}),
									displayField : 'roleName',
									valueField : 'roleId'
								}]

							}],
							listeners : {
								afterlayout : function(cp) {
									Ext.getCmp('UkKnowTypeForm_panel').hide();
								}
							}
						}]
					}, {
						// fieldLabel : __ukKnowTypeKnowSort,
						name : 'ukKnowType.knowSort',
						xtype : 'numberfield',
						hidden : true
						// allowBlank : false
				}	, {
						// fieldLabel : '模板编号',
						name : 'ukKnowType.knowTmpId',
						id : 'ukKnowType.knowTmpId'
						,
						hidden : true
						// value : this.knowTmpId == null ? '' : this.knowTmpId
				}	, {
						name : 'curDate',
						xtype : 'datefield',
						format : 'Y-m-d',
						hidden : true,
						value : new Date()
					}]
		});
		// 加载表单对应的数据
		if (this.knowTypeId != null && this.knowTypeId != 'undefined') {
			this.formPanel.loadData({
				url : __ctxPath + '/know/getUkKnowType.do?knowTypeId='
						+ this.knowTypeId,
				root : 'data',
				preName : 'ukKnowType',
				success : function(res, opt) {
					// alert(res.responseText);
					var tmpUKT = Ext.util.JSON.decode(res.responseText).data;
					Ext.getCmp('ukKnowTypeForm.ukKnowTypeName').setValue(tmpUKT.parentName);
					// var combo = Ext.getCmp('tmpKnowStatus');
					// combo.setValue(tmpUKT.knowTypeStatus);
					// var comboknowTypeStatus =
					// Ext.getCmp('ukKnowType.knowTypeStatus');
					// comboknowTypeStatus.setValue(tmpUKT.knowTypeStatus);
					// if(this.knowTypeId == 'undefined'){
					// Ext.getCmp('tmpKnowStatus').setDisabled(true);
					// }
					if (tmpUKT.ukKnowTemplate != null) {
						var comboKT = Ext.getCmp('bad_knowTmpId');
						comboKT.setValue(tmpUKT.ukKnowTemplate.knowTmpId);
						var comboknowTmpId = Ext.getCmp('ukKnowType.knowTmpId');
						comboknowTmpId
								.setValue(tmpUKT.ukKnowTemplate.knowTmpId);
					}
//					if (tmpUKT.parentId != null && tmpUKT.parentId != 'undefined') {
//						Ext.Ajax.request({
//									url : __ctxPath+ '/know/getUkKnowType.do?knowTypeId='+ tmpUKT.parentId,
//									async : true,
//									scope : this,
//									method : 'post',
//									success : function(response) {
//										result = Ext.util.JSON.decode(response.responseText).data;
//										Ext.getCmp('ukKnowTypeForm.ukKnowTypeName').setValue(result.name);
//									}
//								});
//					}else if(tmpUKT.parentId==0){
//							Ext.getCmp('ukKnowTypeForm.ukKnowTypeName').setValue('知识类别');
//					}
					if (tmpUKT.grantAccess != null) {
						var comboKT = Ext.getCmp('ukKnowTypeForm.grantAccess');
						comboKT.setValue(tmpUKT.grantAccess);
						
						//判断显示还是隐藏
						var p = Ext.getCmp('UkKnowTypeForm_panel');
						if (tmpUKT.grantAccess == 1) {
							p.hide();
						} else {
							p.show();
						}
					}
					if (tmpUKT.accessPurview != null) {
						var comboAP = Ext.getCmp('ukKnowTypeForm.accessPurview');
						comboAP.setValue(tmpUKT.accessPurview);
					}
					

				}
			});
			// this.fireEvent('quit', this);
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
		// Ext.getCmp('ukKnowTypeTreePanel').root.reload();
		// Ext.getCmp('UkKWTypeView').getStore().reload();
	},
	/**
	 * 保存记录
	 */
	save : function() {
		// Ext.getCmp('tmpKnowStatus').setValue(this.knowTypeStatus);
		// Ext.getCmp('bad_knowTmpId').setValue(this.knowTmpId);
		// var v = Ext.getCmp('file').getValue();
		//alert(ts)
		$postForm({// 在HTExt.js中
			formPanel : this.formPanel,
			scope : this,
			url : __ctxPath + '/know/saveUkKnowType.do',
			// params : {
			// fileAddress : v
			// },
			callback : function(fp, action) {
				var gridPanel = Ext.getCmp('UkKnowTypeGrid');
				if (gridPanel != null) {
					gridPanel.getStore().reload();
				}
				this.close();
				Ext.getCmp('ukKnowTypeTreePanel').root.reload();
				Ext.getCmp('UkKWTypeView').getStore().reload();
			}
		});

	}// end of save
});