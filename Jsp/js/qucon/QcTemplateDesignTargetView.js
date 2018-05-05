/**
 * @author:cf0666@gmail.com
 * @class QcTemplateDesignTargetView
 * @extends Ext.Panel
 * @description [QcTarget]管理
 * @company 优创融联科技
 * @createtime:
 */
QcTemplateDesignTargetView = Ext.extend(Ext.Window, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		QcTemplateDesignTargetView.superclass.constructor.call(this, {
					id : 'QcTemplateDesignTargetViewWin',
					title : '考核指标选择',
					width:700,
					height:500,
					scrollHeight:true,
					layout : 'border',
					buttons:[{
						text:'确定',
						iconCls:'btn-ok'
					},{
						text:'取消',
						iconCls:'btn-cancel'
					}],
					items : [this.treePanel,{
						layout:'border',
						region:'center',
						items:[this.searchPanel, this.gridPanel]
					}]
				});
	},// end of constructor
	// 初始化组件
	initUIComponents : function() {
		var fieldnameComboData = [['tarTopic', '标题', new Ext.form.TextField({
									name : 'tarTopic',
									allowBlank : true
								})],
				['tarContent', '描述', new Ext.form.TextField({
									name : 'tarContent',
									allowBlank : true
								})], ['remark', '备注', new Ext.form.TextField({
									name : 'remark',
									allowBlank : true
								})], ['creUseId', '创建人ID', new MT.DicComboBox({
									hiddenName : 'creUseId',
									itemKey : 'QC_ZT'
								})],
				['creDat', '创建日期', new Ext.form.TextField({
									name : 'creDat',
									allowBlank : true
								})], ['updUseId', '修改人ID', new MT.DicComboBox({
									hiddenName : 'updUseId',
									itemKey : 'QC_ZT'
								})],
				['updDat', '修改日期', new Ext.form.TextField({
									name : 'updDat',
									allowBlank : true
								})],
				['staId', '状态：有效、注销&QC_ZT', new MT.DicComboBox({
									hiddenName : 'staId',
									itemKey : 'QC_ZT'
								})]]
		var QcTargetAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : '[QcTarget]高级查询',
					fieldData : fieldnameComboData
				});
		// 初始化搜索条件Panel
		this.searchPanel = new Ext.FormPanel({
			layout : 'hbox',
			region : 'north',
			id : 'QcTargetSearchPanel',
			height : 35,
			items : [{
						border:false,
						width:70,
						style:'text-align:right',
						html:'标题：'
					},{

						name : 'Q_tarTopic_S_EQ',
						xtype : 'textfield'
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

		this.gridPanel = new HT.GridPanel({
			region : 'center',
			//rowActions : true,
			printable : false,
			exportable : false,
			id : 'QcTargetGrid',
			url : __ctxPath + "/qucon/listQcTarget.do",
			fields : [{
						name : 'tarId',
						type : 'int'
					}, 'tarTopic', 'tarContent', 'remark', 'creUseId',
					'creDat', 'updUseId', 'updDat', 'staId'],
			columns : [{
						header : 'tarId',
						dataIndex : 'tarId',
						hidden : true
					}, {
						header : '标题',
						isExp : false,

						dataIndex : 'tarTopic'
					}, {
						header : '描述',
						isExp : false,

						dataIndex : 'tarContent'
					}, {
						header : '状态',
						isExp : false,

						dataIndex : 'staId',
						renderer : function(value) {
							return QC_ZT.value;
						}
					}]
				// end of columns
			});

		this.gridPanel.addListener('rowdblclick', this.rowClick);
		
		 this.treePanel =new Ext.tree.TreePanel({
				// TODO treePanel[机构信息列表]
				region : 'west',
				id : 'ukKnowTypeTreePanel',
				title : '指标分类',//__ukKnowTypeListHeading,
				collapsible : true,
				autoScroll : true,
				split : true,
				height : 800,
				width : 180,
				tbar : new Ext.Toolbar({
							items : [{
										xtype : 'button',
										iconCls : 'btn-refresh',
										text : '刷新',
										handler : function() {
											treePanel.root.reload();
										}
									}, '-', {
										xtype : 'button',
										text : '展开',
										iconCls : 'btn-expand',
										handler : function() {
											treePanel.expandAll();
										}
									}, '-', {
										xtype : 'button',
										text : '收起',
										iconCls : 'btn-collapse',
										handler : function() {
											treePanel.collapseAll();
										}
									}]
						}),
				loader : new Ext.tree.TreeLoader({
							url : __ctxPath + '/know/listUkKnowType.do'
						}),
				root : new Ext.tree.AsyncTreeNode({
							expanded : true
						}),
				rootVisible : false,
				listeners : {
					
				}
			}); // end of this treePanel
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
					new QcTargetForm({
								tarId : rec.data.tarId
							}).show();
				});
	},
	// 创建记录
	createRs : function() {
		// new QcTargetForm().show();
		var tabs = Ext.getCmp('centerTabPanel');
		var aForm = Ext.getCmp('QcTargetForm');
		if (aForm != null) {
			tabs.remove('QcTargetForm');
		}
		aForm = new QcTargetForm();
		tabs.add(aForm);
		tabs.activate(aForm);

	},
	// 按ID删除记录
	removeRs : function(id) {
		$postDel({
					url : __ctxPath + '/qucon/multiDelQcTarget.do',
					ids : id,
					grid : this.gridPanel
				});
	},
	// 把选中ID删除
	removeSelRs : function() {
		$delGridRs({
					url : __ctxPath + '/qucon/multiDelQcTarget.do',
					grid : this.gridPanel,
					idName : 'tarId'
				});
	},
	// 编辑Rs
	editRs : function(record) {
		// new QcTargetForm({
		// tarId : record.data.tarId
		// }).show();
		var tabs = Ext.getCmp('centerTabPanel');
		var aForm = Ext.getCmp('QcTargetForm');
		if (aForm != null) {
			tabs.remove('QcTargetForm');
		}
		aForm = new QcTargetForm({
					tarId : record.data.tarId
				});
		tabs.add(aForm);
		tabs.activate(aForm);
	},
	// 行的Action
	onRowAction : function(grid, record, action, row, col) {
		switch (action) {
			case 'btn-del' :
				this.removeRs.call(this, record.data.tarId);
				break;
			case 'btn-edit' :
				this.editRs.call(this, record);
				break;
			default :
				break;
		}
	}
});
