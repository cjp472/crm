/**
 * @author:cf0666@gmail.com
 * @class QcTemplateView
 * @extends Ext.Panel
 * @description [QcTemplate]管理
 * @company 优创融联科技
 * @createtime:
 */
QcTemplateView = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		QcTemplateView.superclass.constructor.call(this, {
					id : 'QcTemplateViewWin',
					title : '考核模板管理',
					region : 'center',
					layout : 'border',
					items : [this.searchPanel, this.gridPanel]
				});
	},// end of constructor
	// 初始化组件
	initUIComponents : function() {
		var fieldnameComboData = [['tmpName', '名称', new Ext.form.TextField({
									name : 'tmpName',
									allowBlank : true
								})],
				['tmpContent', '描述', new Ext.form.TextField({
									name : 'tmpContent',
									allowBlank : true
								})],
				['chkTypeId', '考评方式&QC_PFFS', new MT.DicComboBox({
									hiddenName : 'chkTypeId',
									itemKey : 'QC_MBZT'
								})],
				['allowRemark', '是否允许填写备注&YorN', new MT.DicComboBox({
									hiddenName : 'allowRemark',
									itemKey : 'QC_MBZT'
								})],
				['allowRecheck', '是否允许复议&YorN', new MT.DicComboBox({
									hiddenName : 'allowRecheck',
									itemKey : 'QC_MBZT'
								})], ['baseScore', '基础分', new MT.DicComboBox({
									hiddenName : 'baseScore',
									itemKey : 'QC_MBZT'
								})], ['minScore', '最低分', new MT.DicComboBox({
									hiddenName : 'minScore',
									itemKey : 'QC_MBZT'
								})], ['maxScore', '最高分', new MT.DicComboBox({
									hiddenName : 'maxScore',
									itemKey : 'QC_MBZT'
								})], ['remark', '备注', new Ext.form.TextField({
									name : 'remark',
									allowBlank : true
								})], ['creUseId', '创建人ID', new MT.DicComboBox({
									hiddenName : 'creUseId',
									itemKey : 'QC_MBZT'
								})],
				['creDat', '创建日期', new Ext.form.DateField({
									hiddenName : 'creDat',
									format : 'Y-m-d'
								})], ['updUseId', '修改人ID', new MT.DicComboBox({
									hiddenName : 'updUseId',
									itemKey : 'QC_MBZT'
								})],
				['updDat', '修改日期', new Ext.form.DateField({
									hiddenName : 'updDat',
									format : 'Y-m-d'
								})],
				['staId', '状态：有效、注销&QC_MBZT', new MT.DicComboBox({
									hiddenName : 'staId',
									itemKey : 'QC_MBZT'
								})]]
		var QcTemplateAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : '考核模板高级查询',
					fieldData : fieldnameComboData
				});
		// 初始化搜索条件Panel
		this.searchPanel = new Ext.FormPanel({
					layout : 'hbox',
					region : 'north',
					id : 'QcTemplateSearchPanel',
					height : 35,
					items : [{
								border : false,
								width : 50,
								style : 'text-align:right',
								html : '名称：'
							}, {

								name : 'Q_tmpName_S_LK',
								xtype : 'textfield'
							}, {
								border : false,
								width : 70,
								style : 'text-align:right',
								html : '考评方式：'
							}, {
								hiddenName : 'Q_chkTypeId_SN_EQ',
								xtype : 'mtdiccombo',
								editable : true,
								lazyInit : false,
								forceSelection : false,
								itemKey : 'QC_PFFS'
							}, {
								border : false,
								width : 50,
								style : 'text-align:right',
								html : '状态：'
							}, {

								hiddenName : 'Q_staId_SN_EQ',
								xtype : 'mtdiccombo',
								editable : true,
								lazyInit : false,
								forceSelection : false,
								itemKey : 'QC_MBZT'
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
									new QcTemplateAdvancedSearchWin().show();
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
								// text : __create+'[QcTemplate]',
								text : __create,
								xtype : 'button',
								scope : this,
								handler : function() {
									var tabs = Ext.getCmp('centerTabPanel');
									var aForm = Ext.getCmp('QcTemplateAddForm');
									if (aForm != null) {
										tabs.remove('QcTemplateAddForm');
									}
									aForm = new QcTemplateAddForm();
									tabs.add(aForm);
									tabs.activate(aForm);
								}
							}, {
								iconCls : 'btn-del',
								// text : __delete+'[QcTemplate]',
								text : __delete,
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
			id : 'QcTemplateGrid',
			url : __ctxPath + "/qucon/listQcTemplate.do",
			fields : [{
						name : 'tmpId',
						type : 'int'
					}, 'tmpName', 'tmpContent', 'chkTypeId', 'allowRemark',
					'allowRecheck', 'baseScore', 'minScore', 'maxScore',
					'remark', 'creUseId', 'creDat', 'updUseId', 'updDat',
					'staId', 'updName'],
			columns : [{
						header : 'tmpId',
						dataIndex : 'tmpId',
						hidden : true
					}, {
						header : '名称',
						isExp : false,

						dataIndex : 'tmpName'
					}, {
						header : '考评方式',
						dataIndex : 'chkTypeId',
						renderer : function(value) {
							return QC_PFFS.get(value);
						}
					}, {
						header : '是否备注',
						isExp : false,
						dataIndex : 'allowRemark',
						renderer : function(value) {
							return YorN.get(value);
						}
					}, {
						header : '是否复议',
						isExp : false,
						dataIndex : 'allowRecheck',
						renderer : function(value) {
							return YorN.get(value);
						}
					}, {
						header : '基础分',
						isExp : false,
						dataIndex : 'baseScore'
					}, {
						header : '最低分',
						isExp : false,
						dataIndex : 'minScore'
					}, {
						header : '最高分',
						isExp : false,
						dataIndex : 'maxScore'
					}, {
						header : '最后修改人',
						isExp : false,
						dataIndex : 'updName'
					}, {
						header : '最后修改日期',
						isExp : false,
						dataIndex : 'updDat'
					}, {
						header : '状态',
						isExp : false,
						dataIndex : 'staId',
						renderer : function(value) {
							return QC_MBZT.get(value);
						}
					}, new Ext.ux.grid.RowActions({
								header : __action,
								width : 100,
								actions : [{
											iconCls : 'btn-del',
											qtip : __delete,
											style : 'margin:0 3px 0 3px'
										}, {
											iconCls : 'btn-edit',
											qtip : __edit,
											style : 'margin:0 3px 0 3px'
										}, {
											iconCls : 'search',
											qtip : '设计',
											style : 'margin:0 3px 0 3px'
										},{
											iconCls : 'btn-next',
											qtip : '发布',
											style : 'margin:0 3px 0 3px'
										}],
								listeners : {
									scope : this,
									'action' : this.onRowAction
								}
							})]
				// end of columns
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
					new QcTemplateForm({
								tmpId : rec.data.tmpId
							}).show();
				});
	},
	// 创建记录
	createRs : function() {
		// new QcTemplateForm().show();
		var tabs = Ext.getCmp('centerTabPanel');
		var aForm = Ext.getCmp('QcTemplateForm');
		if (aForm != null) {
			tabs.remove('QcTemplateForm');
		}
		aForm = new QcTemplateForm();
		tabs.add(aForm);
		tabs.activate(aForm);

	},
	// 按ID删除记录
	removeRs : function(id) {
		$postDel({
					url : __ctxPath + '/qucon/multiDelQcTemplate.do',
					ids : id,
					grid : this.gridPanel
				});
	},
	// 把选中ID删除
	removeSelRs : function() {
		$delGridRs({
					url : __ctxPath + '/qucon/multiDelQcTemplate.do',
					grid : this.gridPanel,
					idName : 'tmpId'
				});
	},
	// 编辑Rs
	editRs : function(record) {
		// new QcTemplateForm({
		// tmpId : record.data.tmpId
		// }).show();
		var tabs = Ext.getCmp('centerTabPanel');
		var aForm = Ext.getCmp('QcTemplateForm');
		if (aForm != null) {
			tabs.remove('QcTemplateForm');
		}
		aForm = new QcTemplateForm({
					tmpId : record.data.tmpId
				});
		tabs.add(aForm);
		tabs.activate(aForm);
	},
	// 设计Rs
	designRs : function(record) {
		Ext.Ajax.request({
			url : __ctxPath + '/qucon/getQcTemplate.do',
			params : {
				tmpId : record.data.tmpId
			},
			method : 'post',
			success : function(response) {
				var result = Ext.util.JSON.decode(response.responseText)
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('QcTemplateDesignForm');
				if (aForm != null) {
					tabs.remove('QcTemplateDesignForm');
				}
				aForm = new QcTemplateDesignForm({
							template : result.data
						});
				tabs.add(aForm);
				tabs.activate(aForm);
			}
		});
	},
	publishRs : function(record) {
		var tempId = record.data.tmpId;
		PublishSelector.getView(
			{
				scope : this,
				callback: function(userids, fullname, qudao){
//				function(userid, fullname, qudao){
					this.publish(userids, qudao, tempId);
				}	
			}, false, false, false, null).show();
	},
	publish : function(userids,qudao, tempId){
		Ext.Ajax.request({
			url : __ctxPath	+ '/qucon/publishQcTempRelease.do',
			params : {
				'userIds' : userids,
				'qudao' : qudao,
				'tempId' : tempId
			},
			method : 'post',
			success : function(response) {
				Ext.ux.Toast.msg('操作信息', '发布成功!');
			}
		});
	},
	// 行的Action
	onRowAction : function(grid, record, action, row, col) {
		switch (action) {
			case 'btn-del' :
				this.removeRs.call(this, record.data.tmpId);
				break;
			case 'btn-edit' :
				this.editRs.call(this, record);
				break;
			case 'search' :
				this.designRs.call(this, record);
				break;
			case 'btn-next' :
				this.publishRs.call(this, record);
				break;
			default :
				break;
		}
	}
});
