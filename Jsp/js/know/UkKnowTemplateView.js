/**
 * @author:cf0666@gmail.com
 * @class UkKnowTemplateView
 * @extends Ext.Panel
 * @description [UkKnowTemplate]管理
 * @company 优创融联科技
 * @createtime:
 */
UkKnowTemplateView = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		UkKnowTemplateView.superclass.constructor.call(this, {
					id : 'UkKnowTemplateViewWin',
					title : '智能表单',
					region : 'center',
					layout : 'border',
					items : [this.treePanel, this.contentPanel]
				});
	},// end of constructor
	// 初始化组件
	initUIComponents : function() {
		var fieldnameComboData = [
				['tmpName', '名称', new Ext.form.TextField({
									name : 'tmpName',
									allowBlank : false
								})],
				['tmpDescribe', '描述', new Ext.form.TextField({
									name : 'tmpDescribe',
									allowBlank : false
								})],
				['beginTime', '启用时间', new Ext.form.DateField({
									hiddenName : 'beginTime',
									format : 'Y-m-d',
									allowBlank : false
								})],
				['closeTime', '关闭时间', new Ext.form.DateField({
									hiddenName : 'closeTime',
									format : 'Y-m-d',
									allowBlank : false
								})],
				// [ 'updateTime', '更新时间', new Ext.form.DateField( {
				// hiddenName : 'updateTime',
				// format : 'Y-m-d',
				// allowBlank : false
				// }) ], [ 'knowStatus', '状态', new Ext.form.NumberField( {
				// name : 'knowStatus',
				// allowBlank : false
				// }) ],
				['knowVersion', '版本号', new Ext.form.NumberField({
									name : 'knowVersion',
									allowBlank : true
								})],
				['createBy', '创建人', new Ext.form.NumberField({
									name : 'createBy',
									allowBlank : true
								})],
				['updateBy', '修改人', new Ext.form.NumberField({
									name : 'updateBy',
									allowBlank : true
								})],
				['createDate', '创建时间', new Ext.form.DateField({
									hiddenName : 'createDate',
									format : 'Y-m-d'
								})],
				['updateDate', '修改时间', new Ext.form.DateField({
									hiddenName : 'updateDate',
									format : 'Y-m-d'
								})]]
		var UkKnowTemplateAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin,
				{
					title : __advanceQueryUkKnowTemplates,
					fieldData : fieldnameComboData
				});

		// 加载树
		this.treePanel = new Ext.Panel({
			region : 'west',
			layout : 'fit',
			collapsible : true,
			width : 200,
			split : true,
			title : '模板类型',
			items : [{
				xtype : 'treePanelEditor',
				id : 'UkKnowTemplateTypeTree',
				split : true,
				showContextMenu : true, // 隐藏树形节点右键菜单
				rootVisible : false,
				border : false,
				autoScroll : true,
				scope : this,
				url : __ctxPath + '/know/treeByMapNameUkKnowTemplate.do?mapName=TEMP_TYPE',
				onclick : function(node) {
					var parentId = node.id;
					var grid = Ext.getCmp('UkKnowTemplateGrid');
					if (grid != null) {
						var store = grid.getStore();
						store.proxy.conn.url = __ctxPath
								+ "/know/subUkKnowTemplate.do";
						store.baseParams = {
							parentId : parentId
						};
						store.reload();
					}
				}
//				,contextMenuItems : [{
//					text : '新建分类',
//					scope : this,
//					iconCls : 'btn-add',
//					handler : function() {
//						var gridPanel = this.gridPanel;
//						var globalTypeTree = Ext
//								.getCmp('UkKnowTemplateTypeTree');
//						var parentId = globalTypeTree.selectedNode.id;
//						var globalTypeForm = new GlobalTypeForm({
//									parentId : parentId,
//									callback : function() {
//										gridPanel.getStore().reload();
//										Ext.getCmp('UkKnowTemplateTypeTree').root
//												.reload();
//									}
//								});
//						globalTypeForm.show();
//
//					}
//				}, {
//					text : '修改分类',
//					scope : this,
//					hidden : true,
//					iconCls : 'btn-edit',
//					handler : function() {
//						var gridPanel = this.gridPanel;
//						var globalTypeTree = Ext
//								.getCmp('UkKnowTemplateTypeTree');
//						var typeId = globalTypeTree.selectedNode.id;
//
//						var globalTypeForm = new GlobalTypeForm({
//									tmpTypeId : typeId,
//									callback : function() {
//										gridPanel.getStore().reload();
//										Ext.getCmp('UkKnowTemplateTypeTree').root
//												.reload();
//									}
//								});
//						globalTypeForm.show();
//					}
//				}, {
//					text : '删除分类',
//					scope : this,
//					iconCls : 'btn-del',
//					handler : function() {
//						var gridPanel = this.gridPanel;
//						var globalTypeTree = Ext
//								.getCmp('UkKnowTemplateTypeTree');
//						var typeId = globalTypeTree.selectedNode.id;
//						var ids = Array();
//						ids.push(typeId);
//						Ext.Msg.confirm('信息确认', '您确认要删除所选记录吗？', function(btn) {
//							if (btn == 'yes') {
//								Ext.Ajax.request({
//									url : __ctxPath
//											+ '/xitong/multiDelSysTemType.do',
//									params : {
//										ids : ids
//									},
//									method : 'POST',
//									success : function(response, options) {
//										var msg = Ext.util.JSON
//												.decode(response.responseText).msg;
//										Ext.ux.Toast.msg('操作信息', msg);
//										gridPanel.getStore().reload();
//										Ext.getCmp('UkKnowTemplateTypeTree').root
//												.reload();
//									},
//									failure : function(response, options) {
//										Ext.ux.Toast
//												.msg('操作信息', '操作出错，请联系管理员！');
//									}
//								});
//							}
//						});
//
//					}
//
//				}]
			}]
		}

		);
		// 初始化搜索条件Panel
		this.searchPanel = new Ext.FormPanel({
					layout : 'hbox',
					region : 'north',
					id : 'UkKnowTemplateSearchPanel',
					height : 35,
					items : [{
								text : '模板名'
							}, {

								name : 'Q_tmpName_S_LK',
								xtype : 'textfield'
							}, {
								text : __ukKnowTemplateKnowStatus
							}, {

								hiddenName : 'Q_knowStatus_N_EQ',
								xtype : 'mtdiccombo',
								editable : false,
								lazyInit : false,
								forceSelection : false,
								itemKey : 'KNOW_STATUS'
							}, {
								xtype : 'button',
								text : __search,
								iconCls : 'search',
								scope : this,
								handler : this.onSearch
							}, {
								xtype : 'button',
								text : __reset,
								scope : this,
								iconCls : 'btn-reset',
								handler : this.reset
							}, {
								xtype : 'button',
								text : __advancedSearch,
								iconCls : 'search',
								scope : this,
								handler : function() {
									new UkKnowTemplateAdvancedSearchWin()
											.show()
								}
							}],
					layoutConfig : {
						padding : '5',
						align : 'middle'
					},
					defaults : {
						xtype : 'label',
						border : false,
						margins : {
							top : 0,
							right : 4,
							bottom : 4,
							left : 4
						}
					},
					border : false,
					frame : false
				});// end of searchPanel

		this.topbar = new Ext.Toolbar({
					items : ['->', {
								iconCls : 'btn-add',
								text : '增加',
								xtype : 'button',
								scope : this,
								handler : this.createRs
							}, '-', {
								text : '注销',
								iconCls : 'btn-del',
								xtype : 'button',
								scope : this,
								handler : this.removeSelRs
							}]
				});

		this.gridPanel = new HT.GridPanel({
			region : 'center',
			tbar : this.topbar,
			// 使用RowActions
			rowActions : true,
			printable : false,
			exportable : false,
			id : 'UkKnowTemplateGrid',
			url : __ctxPath + "/know/listUkKnowTemplate.do",
			fields : [{
						name : 'knowTmpId',
						type : 'int'
					}, 'tmpName', 'tmpDescribe', 'beginTime', 'closeTime',
					'updateTime', 'knowStatus', 'knowVersion', 'createBy',
					'updateBy', 'createDate', 'updateDate', 'knowTmpType','knowTmpClass','knowTmpRange'],
			columns : [{
						header : 'knowTmpId',
						dataIndex : 'knowTmpId',
						hidden : true
					}, {
						header : '模板名',
						dataIndex : 'tmpName',
						width : 160
					}, {
						header : '类别',// 所属分类
						dataIndex : 'knowTmpClass',
						width : 145,
						renderer : function(value) {
							if(value!=null){
								return TEMP_CATEGORY.get(value.itemIndex);
							}
							
						}
					}, {
						header : '范围',
						dataIndex : 'knowTmpRange',
						width : 160,
						renderer : function(value) {
							if(value!=null){
								return TEMP_SCOPE.get(value.itemIndex);
							}
						}
					}, {
						header : '描述',
						dataIndex : 'tmpDescribe',
						width : 145
					}, {
						header : '状态',// 所属Key
						width : 160,
						dataIndex : 'knowStatus',
						renderer : function(value) {
							return KNOW_STATUS.get(value);
						}
					}, {
						header : __ukKnowTemplateBeginTime,
						dataIndex : 'beginTime',
							hidden : true,
						renderer : function(value) {
							return value.substring(0, 10);
						}
					}, {
						header : __ukKnowTemplateCloseTime,
						dataIndex : 'closeTime',
									hidden : true,
						renderer : function(value) {
							return value.substring(0, 10);
						}
					}, {
						header : __ukKnowTemplateKnowStatus,
						dataIndex : 'knowStatus',
									hidden : true,
						renderer : function(value) {
							return KNOW_STATUS.get(value);
						}
					}, {
						header : __ukKnowTemplateKnowVersion,
						dataIndex : 'knowVersion',
									hidden : true,
						hidden : true
					}, {
						header : __ukKnowTemplateCreateBy,
						dataIndex : 'createBy',
						
						hidden : true
					}, {
						header : __ukKnowTemplateUpdateBy,
						dataIndex : 'updateBy',
						hidden : true
					}, {
						header : __ukKnowTemplateCreateDate,
						format : 'Y-m-d',
						dataIndex : 'createDate',
						hidden : true
					}, {
						header : __ukKnowTemplateUpdateDate,
						format : 'Y-m-d',
						dataIndex : 'updateDate',
						hidden : true
					}, new Ext.ux.grid.RowActions({
								header : __action,
								width : 100,
								actions : [{
											iconCls : 'btn-edit',
											qtip : __edit,
											style : 'margin:0 3px 0 3px'
										}, {
											iconCls : 'btn-form-design',
											qtip : '预览',
											style : 'margin:0 3px 0 3px'
										},{
											iconCls : 'btn-setting',
											qtip : '启用',
											style : 'margin:0 3px 0 3px',
											fn : function(record) {
												var status = record.get('knowStatus');
												if (status == 1) {
													return false;
												} else {
													return true;
												}
											}
										}, {
											iconCls : 'btn-del',
											qtip : '注销',
											style : 'margin:0 3px 0 3px',
											fn : function(record) {
												var status = record
														.get('knowStatus');
												if (status == 1) {
													return true;
												} else {
													return false;
												}
											}
										}],
								listeners : {
									scope : this,
									'action' : this.onRowAction
								}
							})]
				// end of columns
			});
		this.contentPanel = new Ext.Panel({
					region : 'center',
					layout : 'border',
					items : [this.searchPanel, this.gridPanel]
				});
		this.gridPanel.addListener('rowdblclick', this.rowClick);

	},// end of the initComponents()
	// 重置查询表单
	reset : function() {
		this.searchPanel.getForm().reset();
	},
	// 按条件搜索
	onSearch : function(obj) {
		$search({
					searchPanel : this.searchPanel,
					gridPanel : this.gridPanel
				});
	},
	// GridPanel行点击处理事件
	rowClick : function(grid, rowindex, e) {
		grid.getSelectionModel().each(function(rec) {
			var tabs = Ext.getCmp('centerTabPanel');
			var aForm = Ext.getCmp('UkKnowTemplateFormWin');
			if (aForm != null) {
				aForm.remove();
				// tabs.remove('UkKnowTemplateFormWin');
			}
			aForm = new UkKnowTemplateForm({
						knowTmpId : rec.data.knowTmpId
					});
			aForm.setTitle('模板:' + rec.data.tmpName + '详情');
			aForm.show();
				// tabs.add(aForm);
				// tabs.activate(aForm);
			});
	},
	// 创建记录
	createRs : function() {
		var tabs = Ext.getCmp('centerTabPanel');
		var aForm = Ext.getCmp('UkKnowTemplateForm');
		if (aForm != null) {
			aForm.remove();
		}
		aForm = new UkKnowTemplateForm();
		aForm.show();
		// tabs.add(aForm);
		// tabs.activate(aForm);

//		Ext.getCmp('UkKnowTemplateGrid').getStore().reload();// 重新加载list数据
	},
	// 按ID启用记录
	startRs : function(id) {
		// UkKnowTemplateView.startRS(id);
		$postStart({
					url : __ctxPath + '/know/multiStartUkKnowTemplate.do',
					ids : id,
					grid : this.gridPanel
				});
	},
	// 按ID启用记录
	startSelRs : function() {
		$startGridRs({
					url : __ctxPath + '/know/multiStartUkKnowTemplate.do',
					grid : this.gridPanel,
					idName : 'knowTmpId'
				});
	},
	// 按ID删除记录/注销
	removeRs : function(id) {
		$postLogOut({
					url : __ctxPath + '/know/multiDelUkKnowTemplate.do',
					ids : id,
					grid : this.gridPanel
				});
	},
	// 把选中ID删除/注销
	removeSelRs : function() {
		$delGridRs({
					url : __ctxPath + '/know/multiDelUkKnowTemplate.do',
					grid : this.gridPanel,
					idName : 'knowTmpId'
				});
	},
	// 编辑Rs
	editRs : function(record) {
		// var tabs = Ext.getCmp('centerTabPanel');
		var aForm = Ext.getCmp('UkKnowTemplateFormWin');
		if (aForm != null) {
			aForm.remove();
			// tabs.remove('UkKnowTemplateFormWin');
		}
		aForm = new UkKnowTemplateForm({
					knowTmpId : record.data.knowTmpId
				});
		aForm.setTitle('模板:' + record.data.tmpName + '详情');
		aForm.show();
		// tabs.add(aForm);
		// tabs.activate(aForm);
	},
	// 表单模版配置
	formDesigner : function(record) {
			var tabs = Ext.getCmp('centerTabPanel');
	var aForm = Ext.getCmp('UkKnowTemplateShowFormWin');
	if (aForm != null) {
		tabs.remove('UkKnowTemplateShowFormWin');
	}
	aForm = new UkKnowTemplateShowForm({
		knowTmpId : record.get('knowTmpId')
		//knowTypeId : record.adta.id
	});
	tabs.add(aForm);
	tabs.activate(aForm);
		
//		var designWin = new TemplateFormDesignWindow({
//					knowTmpId : record.data.knowTmpId,
//					tmpName : record.data.tmpName
//				});
//		designWin.show();
	},

	// 行的Action
	onRowAction : function(grid, record, action, row, col) {
		switch (action) {
			case 'btn-edit' :
				this.editRs.call(this, record);
				break;
			case 'btn-del' :
				this.removeRs.call(this, record.data.knowTmpId);
				break;
			case 'btn-form-design' :
				this.formDesigner.call(this, record);
				break;
			case 'btn-setting' :
				this.startRs.call(this, record.data.knowTmpId);
				break;
			default :
				break;
		}
	}
});

/**
 * 增加修改FORM
 * 
 * @class GlobalTypeForm
 * @extends Ext.Window
 */
GlobalTypeForm = Ext.extend(Ext.Window, {
	// 内嵌FormPanel
	formPanel : null,
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		GlobalTypeForm.superclass.constructor.call(this, {
					layout : 'fit',
					items : this.formPanel,
					modal : true,
					height : 220,
					width : 500,
					maximizable : true,
					title : '分类明细',
					buttonAlign : 'center',
					buttons : [{
								text : __save,
								iconCls : 'btn-save',
								id : 'btnSave',
								scope : this,
								handler : this.save
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
		checkOrgName = function() {
			var orgName = Ext.get('sysTemType.tmpTypeName').dom.value;
			var orgId = Ext.get('sysTemType.tmpTypeId').dom.value;
			if (orgName.length <= 0) {
				Ext.getCmp('btnSave').disable();
				return '名称不能为空!';
			} else {
				Ext.Ajax.request({
							url : __ctxPath + '/xitong/listSysTemType.do',
							params : {
								'Q_tmpTypeName_S_EQ' : orgName,
								'Q_tmpTypeId_L_NEQ' : orgId
							},
							success : function(form, action) {
								var info = Ext.decode(form.responseText);
								if (info.totalCounts > 0) {
									Ext.getCmp('sysTemType.tmpTypeName')
											.markInvalid('该分类已被创建,请重新创建!');
									// Ext.getCmp("btnSave").hide();
									Ext.getCmp('btnSave').disable();
								} else {
									Ext.getCmp('sysTemType.tmpTypeName')
											.clearInvalid(true);
									// Ext.getCmp("btnSave").show();
									Ext.getCmp('btnSave').enable();
								}
							}
						});
			}
		};
		checkOrgKey = function() {
			var orgName = Ext.get('sysTemType.key').dom.value;
			var orgId = Ext.get('sysTemType.tmpTypeId').dom.value;
			if (orgName.length <= 0) {
				Ext.getCmp('btnSave').disable();
				return 'key不能为空!';
			} else {
				Ext.Ajax.request({
							url : __ctxPath + '/xitong/listSysTemType.do',
							params : {
								'Q_tmpTypeName_S_EQ' : orgName,
								'Q_tmpTypeId_L_NEQ' : orgId
							},
							success : function(form, action) {
								var info = Ext.decode(form.responseText);
								if (info.totalCounts > 0) {
									Ext.getCmp('sysTemType.key')
											.markInvalid('该key已被创建,请重新创建!');
									Ext.ux.Toast.msg('操作信息', '该key已被创建,请重新创建');
									// Ext.getCmp("btnSave").hide();
									Ext.getCmp('btnSave').disable();
								} else {
									Ext.getCmp('sysTemType.key')
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
			labelAlign:'right',
			labelWidth:60,
			// id : 'SysTemTypeForm',
			defaults : {
				anchor : '96%,96%'
			},
			defaultType : 'textfield',
			items : [{
						name : 'sysTemType.tmpTypeId',
						id : 'sysTemType.tmpTypeId',
						xtype : 'hidden',
						value : this.tmpTypeId == null ? '' : this.tmpTypeId
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
												fieldLabel : '名称',
												name : 'sysTemType.tmpTypeName',
												id : 'sysTemType.tmpTypeName',
												maxLength : 30,
												anchor : '100%',
												xtype:'textfield',
												allowBlank : false,
												blankText : '分类名称不能为空!',
												validator : checkOrgName
											}]
								}, {
									xtype : 'panel',
									layout : 'form',
									anchor : '100%',
									columnWidth : .5,
									border : false,
									items : [{
												fieldLabel : '编号',
												name : 'sysTemType.key',
												id : 'sysTemType.key',
												xtype:'textfield',
												maxLength : 30,
												anchor : '100%',
												validator : checkOrgKey
											}]
								}]

					}, {
						fieldLabel : '备注',
						name : 'sysTemType.comMent',
						xtype:'textarea',
						height:100,
						maxLength : 100
					}, {
						fieldLabel : '父模板分类对象',
						name : 'sysTemType.parentId',
						xtype : 'numberfield',
						value : this.parentId,
						xtype : 'hidden'
					}]
		});
		// 加载表单对应的数据
		if (this.tmpTypeId != null && this.tmpTypeId != 'undefined') {
			this.formPanel.loadData({
						url : __ctxPath + '/xitong/getSysTemType.do?tmpTypeId='
								+ this.tmpTypeId,
						root : 'data',
						preName : 'sysTemType'
					});
		};
	},// end of the initcomponents

	/**
	 * 重置
	 * 
	 * @param {}
	 *            formPanel
	 */
	// reset : function() {
	// this.formPanel.getForm().reset();
	// },
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
					url : __ctxPath + '/xitong/saveSysTemType.do',
					callback : function(fp, action) {
						var gridPanel = Ext.getCmp('SysTemTypeGrid');
						Ext.getCmp('UkKnowTemplateTypeTree').root.reload();
						if (gridPanel != null) {
							gridPanel.getStore().reload();
						}
						this.close();
					}
				});
	}// end of save

});
