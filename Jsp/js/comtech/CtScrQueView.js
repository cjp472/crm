/**
 * @author:cf0666@gmail.com
 * @class CtScrQueView
 * @extends Ext.Panel
 * @description [CtScrQue]管理
 * @company 优创融联科技
 * @createtime:
 */
CtScrQueView = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		CtScrQueView.superclass.constructor.call(this, {
					id : 'CtScrQueViewWin',
					// title : '[CtScrQue]管理',
					title : '题库管理',
					region : 'center',
					layout : 'border',
					items : [this.searchPanel, this.gridPanel]
				});
	},// end of constructor
	// 初始化组件
	initUIComponents : function() {
		var fieldnameComboData = [
				['queTopic', '标题', new Ext.form.TextField({
									name : 'queTopic',
									allowBlank : true
								})],
				['queContent', '说明', new Ext.form.TextField({
									name : 'queContent',
									allowBlank : true
								})],
				['queTypeId', '题目类型：单选题、多选题、是非题、问答题&CT_TMLX',
						new MT.DicComboBox({
									hiddenName : 'queTypeId',
									itemKey : 'CT_ZT'
								})],
				['displayTypeId', '展现方式：下拉选择、展开选择&CT_ZXFS',
						new MT.DicComboBox({
									hiddenName : 'displayTypeId',
									itemKey : 'CT_ZT'
								})],
				['displayStyleId', '显示尺寸：长中短，对应配置&CT_XSCC',
						new MT.DicComboBox({
									hiddenName : 'displayStyleId',
									itemKey : 'CT_ZT'
								})],
				['layloutTypeId', '布局：横排、竖排&CT_BJ', new MT.DicComboBox({
									hiddenName : 'layloutTypeId',
									itemKey : 'CT_ZT'
								})],
				['initVal', '初始值：初始显示的内容', new Ext.form.TextField({
									name : 'initVal',
									allowBlank : true
								})],
				['isNeed', '是否必填&YorN', new MT.DicComboBox({
									hiddenName : 'isNeed',
									itemKey : 'CT_ZT'
								})],
				['optSrcTypeId', '选项来源：手动、系统参数&CT_XXLY', new MT.DicComboBox({
									hiddenName : 'optSrcTypeId',
									itemKey : 'CT_ZT'
								})],
				['optSrcObj', '来源对象：文本，对应参数值', new Ext.form.TextField({
									name : 'optSrcObj',
									allowBlank : true
								})], ['remark', '备注', new Ext.form.TextField({
									name : 'remark',
									allowBlank : true
								})], ['creUseId', '创建人', new MT.DicComboBox({
									hiddenName : 'creUseId',
									itemKey : 'CT_ZT'
								})],
				['creDat', '创建日期', new Ext.form.DateField({
									hiddenName : 'creDat',
									format : 'Y-m-d'
								})], ['updUseId', '修改人', new MT.DicComboBox({
									hiddenName : 'updUseId',
									itemKey : 'CT_ZT'
								})],
				['updDat', '修改日期', new Ext.form.DateField({
									hiddenName : 'updDat',
									format : 'Y-m-d'
								})],
				['staId', '状态：有效、注销&CT_ZT', new MT.DicComboBox({
									hiddenName : 'staId',
									itemKey : 'CT_ZT'
								})]]
		var CtScrQueAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : '[CtScrQue]高级查询',
					fieldData : fieldnameComboData
				});
		// 初始化搜索条件Panel
		this.searchPanel = new Ext.FormPanel({
			layout : 'hbox',
			region : 'north',
			id : 'CtScrQueSearchPanel',
			height : 35,
			items : [{

						name : 'Q_queTopic_S_EQ',
						xtype : 'textfield'
					}, {

						name : 'Q_queContent_S_EQ',
						xtype : 'textfield'
					}, {

						hiddenName : 'Q_queTypeId_SN_EQ',
						xtype : 'mtdiccombo',
						editable : true,
						lazyInit : false,
						forceSelection : false,
						itemKey : 'CT_TMLX'
					}, {

						hiddenName : 'Q_displayTypeId_SN_EQ',
						xtype : 'mtdiccombo',
						editable : true,
						lazyInit : false,
						forceSelection : false,
						itemKey : 'CT_ZXFS'
					}, {

						hiddenName : 'Q_displayStyleId_SN_EQ',
						xtype : 'mtdiccombo',
						editable : true,
						lazyInit : false,
						forceSelection : false,
						itemKey : 'CT_XSCC'
					}, {

						hiddenName : 'Q_layloutTypeId_SN_EQ',
						xtype : 'mtdiccombo',
						editable : true,
						lazyInit : false,
						forceSelection : false,
						itemKey : 'CT_BJ'
					}, {

						name : 'Q_initVal_S_EQ',
						xtype : 'textfield'
					}, {

						hiddenName : 'Q_isNeed_SN_EQ',
						allowBlank : true,
						xtype : 'combo',
						editable : false,
						mode : 'local',
						triggerAction : 'all',
						store : [['1', __yes], ['0', __no]]
					}, {

						hiddenName : 'Q_optSrcTypeId_SN_EQ',
						xtype : 'mtdiccombo',
						editable : true,
						lazyInit : false,
						forceSelection : false,
						itemKey : 'CT_XXLY'
					}, {

						name : 'Q_optSrcObj_S_EQ',
						xtype : 'textfield'
					}, {

						name : 'Q_remark_S_EQ',
						xtype : 'textfield'
					}, {

						name : 'Q_creUseId_L_EQ',
						xtype : 'numberfield'
					}, {

						name : 'Q_creDat_D_EQ',
						xtype : 'datefield',
						format : 'Y-m-d'
					}, {

						name : 'Q_updUseId_L_EQ',
						xtype : 'numberfield'
					}, {

						name : 'Q_updDat_D_EQ',
						xtype : 'datefield',
						format : 'Y-m-d'
					}, {

						hiddenName : 'Q_staId_SN_EQ',
						xtype : 'mtdiccombo',
						editable : true,
						lazyInit : false,
						forceSelection : false,
						itemKey : 'CT_ZT'
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
							new CtScrQueAdvancedSearchWin().show();
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
					items : [{
								iconCls : 'btn-add',
								// text : __create+'[CtScrQue]',
								text : __create,
								xtype : 'button',
								scope : this,
								handler : this.createRs
							}, {
								iconCls : 'btn-del',
								// text : __delete+'[CtScrQue]',
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
			id : 'CtScrQueGrid',
			url : __ctxPath + "/comtech/listCtScrQue.do",
			fields : [{
						name : 'queId',
						type : 'int'
					}, 'queTopic', 'queContent', 'queTypeId', 'displayTypeId',
					'displayStyleId', 'layloutTypeId', 'initVal', 'isNeed',
					'optSrcTypeId', 'optSrcObj', 'remark', 'creUseId',
					'creDat', 'updUseId', 'updDat', 'staId'],
			columns : [{
						header : 'queId',
						dataIndex : 'queId',
						hidden : true
					}, {
						header : '标题',
						isExp : false,

						dataIndex : 'queTopic'
					}, {
						header : '说明',
						isExp : false,

						dataIndex : 'queContent'
					}, {
						header : '题目类型：单选题、多选题、是非题、问答题&CT_TMLX',
						isExp : false,

						dataIndex : 'queTypeId',
						renderer : function(value) {
							return CT_TMLX.value;
						}
					}, {
						header : '展现方式：下拉选择、展开选择&CT_ZXFS',
						isExp : false,

						dataIndex : 'displayTypeId',
						renderer : function(value) {
							return CT_ZXFS.value;
						}
					}, {
						header : '显示尺寸：长中短，对应配置&CT_XSCC',
						isExp : false,

						dataIndex : 'displayStyleId',
						renderer : function(value) {
							return CT_XSCC.value;
						}
					}, {
						header : '布局：横排、竖排&CT_BJ',
						isExp : false,

						dataIndex : 'layloutTypeId',
						renderer : function(value) {
							return CT_BJ.value;
						}
					}, {
						header : '初始值：初始显示的内容',
						isExp : false,

						dataIndex : 'initVal'
					}, {
						header : '是否必填&YorN',
						isExp : false,

						dataIndex : 'isNeed',
						renderer : function(value) {
							return value == '0' ? __no : __yes;
						}
					}, {
						header : '选项来源：手动、系统参数&CT_XXLY',
						isExp : false,

						dataIndex : 'optSrcTypeId',
						renderer : function(value) {
							return CT_XXLY.value;
						}
					}, {
						header : '来源对象：文本，对应参数值',
						isExp : false,

						dataIndex : 'optSrcObj'
					}, {
						header : '备注',
						isExp : false,

						dataIndex : 'remark'
					}, {
						header : '创建人',
						isExp : false,

						dataIndex : 'creUseId'
					}, {
						header : '创建日期',
						isExp : false,

						dataIndex : 'creDat'
					}, {
						header : '修改人',
						isExp : false,

						dataIndex : 'updUseId'
					}, {
						header : '修改日期',
						isExp : false,

						dataIndex : 'updDat'
					}, {
						header : '状态：有效、注销&CT_ZT',
						isExp : false,

						dataIndex : 'staId',
						renderer : function(value) {
							return CT_ZT.value;
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
					new CtScrQueForm({
								queId : rec.data.queId
							}).show();
				});
	},
	// 创建记录
	createRs : function() {
		// new CtScrQueForm().show();
		var tabs = Ext.getCmp('centerTabPanel');
		var aForm = Ext.getCmp('CtScrQueForm');
		if (aForm != null) {
			tabs.remove('CtScrQueForm');
		}
		aForm = new CtScrQueForm();
		tabs.add(aForm);
		tabs.activate(aForm);

	},
	// 按ID删除记录
	removeRs : function(id) {
		$postDel({
					url : __ctxPath + '/comtech/multiDelCtScrQue.do',
					ids : id,
					grid : this.gridPanel
				});
	},
	// 把选中ID删除
	removeSelRs : function() {
		$delGridRs({
					url : __ctxPath + '/comtech/multiDelCtScrQue.do',
					grid : this.gridPanel,
					idName : 'queId'
				});
	},
	// 编辑Rs
	editRs : function(record) {
		// new CtScrQueForm({
		// queId : record.data.queId
		// }).show();
		var tabs = Ext.getCmp('centerTabPanel');
		var aForm = Ext.getCmp('CtScrQueForm');
		if (aForm != null) {
			tabs.remove('CtScrQueForm');
		}
		aForm = new CtScrQueForm({
					queId : record.data.queId
				});
		tabs.add(aForm);
		tabs.activate(aForm);
	},
	// 行的Action
	onRowAction : function(grid, record, action, row, col) {
		switch (action) {
			case 'btn-del' :
				this.removeRs.call(this, record.data.queId);
				break;
			case 'btn-edit' :
				this.editRs.call(this, record);
				break;
			default :
				break;
		}
	}
});
