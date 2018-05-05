/**
 * @author:cf0666@gmail.com
 * @class QcRuleView
 * @extends Ext.Panel
 * @description [QcTemplate]管理
 * @company 优创融联科技
 * @createtime:
 */
QcRuleView = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		QcRuleView.superclass.constructor.call(this, {
					id : 'QcRuleViewWin',
					title : '考核规则管理',
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
								html : '规则名：'
							}, {

								name : 'Q_tmpName_S_EQ',
								xtype : 'textfield'
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
								handler : this.createRs
							}, {
								iconCls : 'btn-setting',
								// text : __create+'[QcTemplate]',
								text : '启用',
								xtype : 'button',
								scope : this,
								handler : this.enableSelRs
							}, {
								iconCls : 'btn-del',
								// text : __delete+'[QcTemplate]',
								text : '注销',
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
			id : 'QcRuleGrid',
			url : __ctxPath + "/qucon/listQcChkRul.do",
			fields : [{
						name : 'chkRulId',
						type : 'int'
					}, 'rulName', 'objTyeId', 'objSubTyeId', 'rulTimeSta',
					'rulTimeEnd', 'createByName','createDate','remark','rulStaId'],
			columns : [{
						header : 'chkRulId',
						dataIndex : 'chkRulId',
						hidden : true
					}, {
						header : '规则名',
						dataIndex : 'rulName',
						isExp : false
					}, {
						header : '开始时间',
						isExp : false,
						dataIndex : 'rulTimeSta'
					}, {
						header : '结束时间',
						isExp : false,
						dataIndex : 'rulTimeEnd'
					}, {
						header : '创建人',
						isExp : false,
						dataIndex : 'createByName'
					}, {
						header : '创建时间',
						isExp : false,
						dataIndex : 'createDate'
					}, {
						header : '备注',
						isExp : false,
						dataIndex : 'remark'
					}, {
						header : '状态',
						isExp : false,
						dataIndex : 'rulStaId',
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
										},{
											iconCls : 'btn-setting',
											qtip : '启用',
											style : 'margin:0 3px 0 3px'
										},{
											iconCls : 'add-user',
											qtip : '分配',
											style : 'margin:0 3px 0 3px'
										}],
								listeners : {
									scope : this,
									'action' : this.onRowAction
								}
							})]
				// end of columns
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
	// 创建记录
	createRs : function() {
		var tabs = Ext.getCmp('centerTabPanel');
		var aForm = Ext.getCmp('QcRuleForm');
		if (aForm != null) {
			tabs.remove('QcRuleForm');
		}
		aForm = new QcRuleForm();
		tabs.add(aForm);
		tabs.activate(aForm);
	},
	// 按ID删除记录
	removeRs : function(id) {
		$postDel({
					url : __ctxPath + '/qucon/multiDelQcChkRul.do',
					ids : id,
					grid : this.gridPanel
				});
	},
	// 把选中ID删除
	removeSelRs : function() {
		$delGridRs({
					url : __ctxPath + '/qucon/multiDelQcChkRul.do',
					grid : this.gridPanel,
					idName : 'chkRulId'
				});
	},
	enableRs : function(id) {
		//在Ajax内部，this作用域改变了
		var grid = Ext.getCmp('QcRuleGrid');
		Ext.Msg.confirm('信息确认', '您确认要启用记录吗？', function(btn) {
			if (btn == 'yes') {
				Ext.Ajax.request( {
					url : __ctxPath + '/qucon/multiEnableQcChkRul.do',
					params : {
						ids : id
					},
					method : 'POST',
					success : function(response, options) {
						grid.getStore().reload();
						Ext.ux.Toast.msg('操作信息', '成功启用记录！');
					},
					failure : function(response, options) {
						Ext.ux.Toast.msg('操作信息', '操作出错，请联系管理员！');
					}
				});
			}
		});
	},
	enableSelRs : function() {
		var ids = $getGdSelectedIds(this.gridPanel, 'chkRulId');
		if (ids.length == 0) {
			Ext.ux.Toast.msg("操作信息", "请选择要启用的记录！");
			return;
		}
		this.enableRs.call(this, ids);
	},
	// 编辑Rs
	editRs : function(id) {
		var tabs = Ext.getCmp('centerTabPanel');
		var aForm = Ext.getCmp('QcRuleForm');
		if (aForm != null) {
			tabs.remove('QcRuleForm');
		}
		aForm = new QcRuleForm({
					ruleId : id
				});
		tabs.add(aForm);
		tabs.activate(aForm);
	},
	allocate : function(id_rule) {
		UserSelector.getView(function(id_user, name){
			Ext.Ajax.request( {
				url : __ctxPath + '/qucon/allocateQcChkRul.do',
				params : {
					userId : id_user,
					ruleId : id_rule
				},
				method : 'POST',
				success : function(response) {
					var result = Ext.util.JSON.decode(response.responseText);
					var data = result.data;
					Ext.ux.Toast.msg('操作信息', data);
				},
				failure : function(response, options) {
					Ext.ux.Toast.msg('操作信息', '操作出错，请联系管理员！');
				}
			});
		}, true, false).show();
	},
	// 行的Action
	onRowAction : function(grid, record, action, row, col) {
		switch (action) {
			case 'btn-del' :
				this.removeRs.call(this, record.data.chkRulId);
				break;
			case 'btn-edit' :
				this.editRs.call(this, record.data.chkRulId);
				break;
			case 'btn-setting' :
				this.enableRs.call(this, record.data.chkRulId);
				break;
			case 'add-user' :
				this.allocate.call(this, record.data.chkRulId);
				break;
			default :
				break;
		}
	}
});
