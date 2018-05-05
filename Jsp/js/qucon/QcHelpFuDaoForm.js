/**
 * @author:cf0666@gmail.com
 * @class QcHelpFuDaoForm
 * @extends Ext.Panel
 * @description [QcHelpFuDaoForm]管理
 * @company 优创融联科技
 * @createtime:
 */
QcHelpFuDaoForm = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		QcHelpFuDaoForm.superclass.constructor.call(this, {
					id : 'QcHelpFuDaoFormWin',
					title : '辅导',
					region : 'center',
					layout : 'border',
					items : [{
						region : 'north',
						border : false,
						height : 200,
						anchor : '100%',
						xtype : 'displayfield',
						value : '<img src="' + __ctxPath
								+ '/lineChart.jpg" style="height:200px"/>'
					}, this.tabpanel]
				});
	},// end of constructor
	// 初始化组件
	initUIComponents : function() {
		var fieldnameComboData = [['origAni', '主叫', new Ext.form.TextField({
									name : 'origAni',
									allowBlank : true
								})],
				['origDnis', '被叫', new Ext.form.TextField({
									name : 'origDnis',
									allowBlank : true
								})],
				['enterTime', '开始时间', new Ext.form.DateField({
									hiddenName : 'enterTime',
									format : 'Y-m-d'
								})],
				['endTime', '结束时间', new Ext.form.DateField({
									hiddenName : 'endTime',
									format : 'Y-m-d'
								})],
				['endReason', '呼损原因&CONHSYY', new Ext.form.NumberField({
									name : 'endReason',
									allowBlank : true
								})], ['vdn', 'VDN', new Ext.form.TextField({
									name : 'vdn',
									allowBlank : true
								})], ['split', '技能组', new Ext.form.TextField({
									name : 'split',
									allowBlank : true
								})],
				['ivrNod', 'IVR节点', new Ext.form.TextField({
									name : 'ivrNod',
									allowBlank : true
								})],
				['agentid', '接入工号', new Ext.form.TextField({
									name : 'agentid',
									allowBlank : true
								})],
				['station', '接入分机号', new Ext.form.TextField({
									name : 'station',
									allowBlank : true
								})], ['dur', '时长', new Ext.form.NumberField({
									name : 'dur',
									allowBlank : true
								})],
				['synTime', '同步时间', new Ext.form.TextField({
									name : 'synTime',
									allowBlank : true
								})],
				['assignId', '分配人', new Ext.form.NumberField({
									name : 'assignId',
									allowBlank : true
								})],
				['assignTime', '分配时间', new Ext.form.DateField({
									hiddenName : 'assignTime',
									format : 'Y-m-d'
								})],
				['ownerId', '负责人', new Ext.form.NumberField({
									name : 'ownerId',
									allowBlank : true
								})],
				['acceptTime', '领用时间', new Ext.form.DateField({
									hiddenName : 'acceptTime',
									format : 'Y-m-d'
								})],
				['dealStaId', '处理状态&CONCLZT', new Ext.form.NumberField({
									name : 'dealStaId',
									allowBlank : true
								})],
				['dealResId', '处理结果&CONCLJG', new Ext.form.NumberField({
									name : 'dealResId',
									allowBlank : true
								})],
				['dealRemarks', '处理备注', new Ext.form.TextField({
									name : 'dealRemarks',
									allowBlank : true
								})]]

		var topbar_contact1 = new Ext.Toolbar({
			items : ['->', {
						iconCls : 'btn-del',
						text : '删除',
						xtype : 'button',
						handler : function() {
							var store = gridPanel_contact1.getStore();
							var sm = gridPanel_contact1.getSelectionModel();
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
							App.createUploadDialog({
								file_cat : 'xitong/ulBbsHuati',
								callback : function(data) {
									var fileIds = Ext
											.getCmp("ulBbsHuatifileIds");
									var filePanel = Ext
											.getCmp('ulBbsHuatiPanel');

									for (var i = 0; i < data.length; i++) {
										if (fileIds.getValue() != '') {
											fileIds.setValue(fileIds.getValue()
													+ ',');
										}
										fileIds.setValue(fileIds.getValue()
												+ data[i].fileId);
										Ext.DomHelper
												.append(
														filePanel.body,
														'<span><a href="#" onclick="FileAttachDetail.show('
																+ data[i].fileId
																+ ')">'
																+ data[i].fileName
																+ '</a> <img class="img-delete" src="'
																+ __ctxPath
																+ '/images/system/delete.gif" onclick="removeResumeFile(this,'
																+ data[i].fileId
																+ ')"/>&nbsp;|&nbsp;</span>');
									}
								}
							}).show();
						}
					}]
		});
		var gridPanel_contact1 = new HT.EditorGridPanel({
			region : 'center',
			tbar : topbar_contact1,
			height : 150,
			scrollHeight : true,
			clicksToEdit : 1,
			url : __ctxPath + "/xitong/getContactUlEmployee.do?useid=",
			fields : [{
						name : 'contactEmplId',
						type : 'int'
					}, 'contactType', 'contactValue'],
			columns : [{
						header : '类型',
						dataIndex : 'contactType',
						editor : new Ext.form.ComboBox({
									xtype : 'combo',
									editable : false,
									mode : 'local',
									triggerAction : 'all',
									store : [['1', '类型1'], ['0', '类型2']]
								})
					}, {
						header : '说明',
						dataIndex : 'contactValue',
						editor : new Ext.form.TextField({

						})
					}, {
						header : '附件',
						dataIndex : 'contactType',
						editor : new Ext.form.TextField({
									inputType : 'file'
								})
					}]
				// end of columns
			});
		var topbar_contact2 = new Ext.Toolbar({
					items : ['->', {
								iconCls : 'btn-del',
								text : '删除',
								xtype : 'button',
								handler : function() {
									var store = gridPanel_contact2.getStore();
									var sm = gridPanel_contact2
											.getSelectionModel();
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
									var store = gridPanel_contact2.getStore();
									var recordType = store.recordType;
									store.add(new recordType({})); // 添加一行空store
								}
							}]
				});
		var gridPanel_contact2 = new HT.EditorGridPanel({
			region : 'center',
			tbar : topbar_contact2,
			height : 150,
			scrollHeight : true,
			clicksToEdit : 1,
			url : __ctxPath + "/xitong/getContactUlEmployee.do?useid=",
			fields : [{
						name : 'contactEmplId',
						type : 'int'
					}, 'contactType', 'contactValue'],
			columns : [{
						header : '名称',
						dataIndex : 'contactType',
						editor : new Ext.form.TextField({

						})
					}, {
						header : '说明',
						dataIndex : 'contactValue',
						editor : new Ext.form.TextField({

						})
					}, {
						header : '讲师',
						dataIndex : 'contactType',
						editor : new Ext.form.TextField({
									inputType : 'file'
								})
					}]
				// end of columns
			});
		var topbar_contact3 = new Ext.Toolbar({
					items : ['->', {
								iconCls : 'btn-del',
								text : '删除',
								xtype : 'button',
								handler : function() {
									var store = gridPanel_contact3.getStore();
									var sm = gridPanel_contact3
											.getSelectionModel();
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
									knowledgeSelector.getView().show();
								}
							}]
				});
		var gridPanel_contact3 = new HT.EditorGridPanel({
			region : 'center',
			tbar : topbar_contact3,
			height : 150,
			scrollHeight : true,
			clicksToEdit : 1,
			url : __ctxPath + "/xitong/getContactUlEmployee.do?useid=",
			fields : [{
						name : 'contactEmplId',
						type : 'int'
					}, 'contactType', 'contactValue'],
			columns : [{
						header : '标题',
						dataIndex : 'contactType'
					}, {
						header : '摘要',
						dataIndex : 'contactValue'
					}, {
						header : '业务类别',
						dataIndex : 'contactType'
					}, {
						header : '过期时间',
						dataIndex : 'contactType'
					}]
				// end of columns
			});
		var topbar_contact4 = new Ext.Toolbar({
					items : ['->', {
								iconCls : 'btn-del',
								text : '删除',
								xtype : 'button',
								handler : function() {
									var store = gridPanel_contact4.getStore();
									var sm = gridPanel_contact4
											.getSelectionModel();
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
									var store = gridPanel_contact4.getStore();
									var recordType = store.recordType;
									store.add(new recordType({})); // 添加一行空store
								}
							}]
				});
		var gridPanel_contact4 = new HT.EditorGridPanel({
			region : 'center',
			tbar : topbar_contact4,
			height : 150,
			scrollHeight : true,
			clicksToEdit : 1,
			url : __ctxPath + "/xitong/getContactUlEmployee.do?useid=",
			fields : [{
						name : 'contactEmplId',
						type : 'int'
					}, 'contactType', 'contactValue'],
			columns : [{
						header : '最小分数',
						dataIndex : 'contactType',
						editor : new Ext.form.TextField({

						})
					}, {
						header : '最大分数',
						dataIndex : 'contactType2',
						editor : new Ext.form.TextField({

						})
					}, {
						header : '方式',
						dataIndex : 'contactValue',
						editor : new Ext.form.ComboBox({
									xtype : 'combo',
									editable : false,
									mode : 'local',
									triggerAction : 'all',
									store : [['1', '数量'], ['0', '百分比']]
								})
					}, {
						header : '数量',
						dataIndex : 'contactType3',
						editor : new Ext.form.TextField({

						})
					}]
				// end of columns
			});
		var topbar_contact5 = new Ext.Toolbar({
					items : ['->', {
								iconCls : 'btn-del',
								text : '删除',
								xtype : 'button',
								handler : function() {
									var store = gridPanel_contact5.getStore();
									var sm = gridPanel_contact5
											.getSelectionModel();
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
									var store = gridPanel_contact5.getStore();
									var recordType = store.recordType;
									store.add(new recordType({})); // 添加一行空store
								}
							}]
				});
		var gridPanel_contact5 = new HT.EditorGridPanel({
			region : 'center',
			tbar : topbar_contact5,
			height : 150,
			scrollHeight : true,
			clicksToEdit : 1,
			url : __ctxPath + "/xitong/getContactUlEmployee.do?useid=",
			fields : [{
						name : 'contactEmplId',
						type : 'int'
					}, 'contactType', 'contactValue'],
			columns : [{
						header : '渠道',
						dataIndex : 'contactType',
						editor : new MT.DicComboBox({
									editable : true,
									lazyInit : false,
									forceSelection : false,
									itemKey : 'LXFS001'
								})

					}, {
						header : '方式',
						dataIndex : 'contactValue',
						editor : new Ext.form.ComboBox({
									xtype : 'combo',
									editable : false,
									mode : 'local',
									triggerAction : 'all',
									store : [['1', '数量'], ['0', '百分比']]
								})
					}, {
						header : '数量',
						dataIndex : 'contactType1',
						editor : new Ext.form.TextField({

						})
					}]
				// end of columns
			});
		this.tabpanel = new Ext.TabPanel({
					activeTab : 0,// 激活第一个panel
					region : 'center',
					// autoWidth : true,
					// width :'auto',
					border : false,
					plain : true,
					defaultType : 'panel',
					items : [{
								title : '推荐说明',
								border : false,
								layout : 'form',
								labelAlign : 'right',
								style : 'padding-top:20px',
								buttonAlign : 'center',
								buttons : [{
											text : '保存',
											iconCls : 'btn-save',
											handler : function() {
											}

										}, {
											text : '清空',
											iconCls : 'btn-cancel'
										}],
								items : [{
											fieldLabel : '推荐说明',
											xtype : 'textarea',
											anchor : '90%'
										}]
							}, {
								title : '推荐附件',
								layout : 'fit',
								defaultType : 'textfield',
								border : false,
								defaults : {
									anchor : '100%,100%'
								},
								items : [gridPanel_contact1]
							}, {
								title : '课件',
								layout : 'fit',
								border : false,
								defaultType : 'textfield',
								defaults : {
									anchor : '100%,100%'
								},
								items : [gridPanel_contact2]
							}, {
								title : '知识',
								layout : 'fit',
								border : false,
								defaultType : 'textfield',
								defaults : {
									anchor : '100%,100%'
								},
								items : [gridPanel_contact3]
							}]
				});
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
					new QcHelpFuDaoFormForm({
								conId : rec.data.conId
							}).show();
				});
	},
	// 创建记录
	createRs : function() {
		// new QcHelpFuDaoFormForm().show();
		var tabs = Ext.getCmp('centerTabPanel');
		var aForm = Ext.getCmp('QcHelpFuDaoFormForm');
		if (aForm != null) {
			tabs.remove('QcHelpFuDaoFormForm');
		}
		aForm = new QcHelpFuDaoFormForm();
		tabs.add(aForm);
		tabs.activate(aForm);

	},
	// 按ID删除记录
	removeRs : function(id) {
		$postDel({
					url : __ctxPath + '/customer/multiDelQcHelpFuDaoForm.do',
					ids : id,
					grid : this.gridPanel
				});
	},
	// 把选中ID删除
	removeSelRs : function() {
		$delGridRs({
					url : __ctxPath + '/customer/multiDelQcHelpFuDaoForm.do',
					grid : this.gridPanel,
					idName : 'conId'
				});
	},
	// 编辑Rs
	editRs : function(record) {
		// new QcHelpFuDaoFormForm({
		// conId : record.data.conId
		// }).show();
		var tabs = Ext.getCmp('centerTabPanel');
		var aForm = Ext.getCmp('QcHelpFuDaoFormForm');
		if (aForm != null) {
			tabs.remove('QcHelpFuDaoFormForm');
		}
		aForm = new QcHelpFuDaoFormForm({
					conId : record.data.conId
				});
		tabs.add(aForm);
		tabs.activate(aForm);
	},
	// 行的Action
	onRowAction : function(grid, record, action, row, col) {
		switch (action) {
			case 'btn-del' :
				this.removeRs.call(this, record.data.conId);
				break;
			case 'btn-edit' :
				this.editRs.call(this, record);
				break;
			default :
				break;
		}
	}
});
