/**
 * @author:cf0666@gmail.com
 * @class ScProductSearchView
 * @extends Ext.Panel
 * @description [ScProduct]管理
 * @company 优创融联科技
 * @createtime:
 */
ScProductSearchView = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		ScProductSearchView.superclass.constructor.call(this, {
					id : 'ScProductSearchViewWin',
					title : '商品查询',
					region : 'center',
					layout : 'border',
					items : [this.leftPanel, this.searchPanel, this.gridPanel]
				});
	},// end of constructor
	// 初始化组件
	initUIComponents : function() {
		var fieldnameComboData = [
				['productName', '产品名称', new Ext.form.TextField({
									name : 'productName',
									allowBlank : true
								})],
				['origGuidePrice', '原始指导价', new Ext.form.NumberField({
									name : 'origGuidePrice',
									allowBlank : true
								})],
				['productModelFlag', '产品型号标志0--配件、1--产品&CON_T_PMODEL_FLAG',
						new Ext.form.NumberField({
									name : 'productModelFlag',
									allowBlank : true
								})], ['desc', '备注', new Ext.form.TextField({
									name : 'desc',
									allowBlank : true
								})], ['ext1', '扩展1', new Ext.form.TextField({
									name : 'ext1',
									allowBlank : true
								})], ['ext2', '扩展2', new Ext.form.TextField({
									name : 'ext2',
									allowBlank : true
								})], ['ext3', '扩展3', new Ext.form.TextField({
									name : 'ext3',
									allowBlank : true
								})], ['ext4', '扩展4', new Ext.form.TextField({
									name : 'ext4',
									allowBlank : true
								})], ['ext5', '扩展5', new Ext.form.TextField({
									name : 'ext5',
									allowBlank : true
								})], ['ext6', '扩展6', new Ext.form.TextField({
									name : 'ext6',
									allowBlank : true
								})], ['ext7', '扩展7', new Ext.form.TextField({
									name : 'ext7',
									allowBlank : true
								})], ['ext8', '扩展8', new Ext.form.TextField({
									name : 'ext8',
									allowBlank : true
								})], ['ext9', '扩展9', new Ext.form.TextField({
									name : 'ext9',
									allowBlank : true
								})], ['ext10', '扩展10', new Ext.form.TextField({
									name : 'ext10',
									allowBlank : true
								})],
				['ext11', '扩展11', new Ext.form.NumberField({
									name : 'ext11',
									allowBlank : true
								})],
				['ext12', '扩展12', new Ext.form.NumberField({
									name : 'ext12',
									allowBlank : true
								})],
				['ext13', '扩展13', new Ext.form.NumberField({
									name : 'ext13',
									allowBlank : true
								})],
				['ext14', '扩展14', new Ext.form.NumberField({
									name : 'ext14',
									allowBlank : true
								})],
				['ext15', '扩展15', new Ext.form.NumberField({
									name : 'ext15',
									allowBlank : true
								})], ['ext16', '扩展16', new Ext.form.DateField({
									hiddenName : 'ext16',
									format : 'Y-m-d'
								})], ['ext17', '扩展17', new Ext.form.DateField({
									hiddenName : 'ext17',
									format : 'Y-m-d'
								})], ['ext18', '扩展18', new Ext.form.DateField({
									hiddenName : 'ext18',
									format : 'Y-m-d'
								})], ['ext19', '扩展19', new Ext.form.DateField({
									hiddenName : 'ext19',
									format : 'Y-m-d'
								})], ['ext20', '扩展20', new Ext.form.DateField({
									hiddenName : 'ext20',
									format : 'Y-m-d'
								})]]
		var ScProductAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : '商品高级查询',
					fieldData : fieldnameComboData
				});
		// 初始化搜索条件Panel
		this.searchPanel = new Ext.FormPanel({
					layout : 'hbox',
					region : 'north',
					id : 'ScProductSearchPanel',
					height : 35,
					items : [{
								border : false,
								style : 'text-align:right',
								width : 50,
								html : '名称：'
							}, {

								name : 'Q_productName_S_EQ',
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
							}, {
								xtype : 'button',
								text : __advancedSearch,
								iconCls : 'search',
								scope : this,
								handler : function() {
									new ScProductAdvancedSearchWin().show();
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
		this.leftPanel = new htsoft.ux.TreePanelEditor({
			region : 'west',
			id : 'dicType',
			plugins : ['multifilter'],// 加载 树节点智能过滤
			title : '商品分类',
			collapsible : true,
			split : true,
			height : 450,
			width : 220,
			autoScroll : true,
			url : __ctxPath + '/system/treeGlobalType.do?catKey=DIC',
			onclick : function(node) {
				this.selectedNode = node;
				var parentId = node.id;
				var grid = Ext.getCmp('dicGrid');
				if (grid != null) {
					if (parentId == 0) {
						grid.setTitle('所有数据字典');
					} else {
						grid.setTitle(node.text + '-数据字典');
					}
					var store = grid.getStore();
					store.url = __ctxPath + "/system/listDictionary.do";
					store.baseParams = {
						parentId : parentId
					};

					store.reload();
				}

			},
			contextMenuItems : [{
						text : '新建分类',
						scope : this,
						iconCls : 'btn-add',
						handler : function() {
							var dicType = Ext.getCmp('dicType');
							var parentId = dicType.selectedNode.id;

							var globalTypeForm = new GlobalTypeForm({
										parentId : parentId,
										catKey : 'DIC',
										callback : function() {
											dicType.root.reload();
										}
									});
							globalTypeForm.show();
						}
					}, {
						text : '修改分类',
						scope : this,
						iconCls : 'btn-edit',
						handler : function() {
							var dicType = Ext.getCmp('dicType');
							var proTypeId = dicType.selectedNode.id;

							var globalTypeForm = new GlobalTypeForm({
										proTypeId : proTypeId,
										callback : function() {
											Ext.getCmp('dicType').root.reload();
										}
									});
							globalTypeForm.show();
						}
					}, {
						text : '添加字典项',
						scope : this,
						iconCls : 'btn-add',
						handler : function() {
							var gridPanel = this.centerPanel;
							var dicType = Ext.getCmp('dicType');
							var selectedNode = dicType.selectedNode;
							var typeName = selectedNode.text;
							var parentId = 0;
							if (selectedNode != null) {
								parentId = selectedNode.id;
							}
							if (parentId == 0) {
								Ext.ux.Toast.msg('操作信息', '请从左选择字典分类');
								return;
							}
							new DictionaryForm({
										parentId : parentId,
										typeName : typeName,
										callback : function() {
											gridPanel.getStore().reload();
										}
									}).show();
						}
					}]
		});
		this.gridPanel = new HT.GridPanel({
			region : 'center',
			printable : false,
			exportable : false,
			id : 'ScProductGrid',
			url : __ctxPath + "/goods/listScProduct.do",
			fields : [{
						name : 'productId',
						type : 'int'
					}, 'productName', 'origGuidePrice', 'productModelFlag',
					'desc', 'ext1', 'ext2', 'ext3', 'ext4', 'ext5', 'ext6',
					'ext7', 'ext8', 'ext9', 'ext10', 'ext11', 'ext12', 'ext13',
					'ext14', 'ext15', 'ext16', 'ext17', 'ext18', 'ext19',
					'ext20'],
			columns : [{
						header : 'productId',
						dataIndex : 'productId',
						hidden : true
					}, {
						header : '产品名称',
						isExp : false,

						dataIndex : 'productName'
					}, {
						header : '原始指导价',
						isExp : false,

						dataIndex : 'origGuidePrice'
					}, {
						header : '产品型号',
						isExp : false,

						dataIndex : 'productModelFlag',
						renderer : function(value) {
							return CON_T_PMODEL_FLAG.get(value);
						}
					}, {
						header : '备注',
						isExp : false,
						hidden : true,
						dataIndex : 'desc'
					}, {
						header : '扩展1',
						isExp : false,
						hidden : true,
						dataIndex : 'ext1'
					}, {
						header : '扩展2',
						isExp : false,
						hidden : true,
						dataIndex : 'ext2'
					}, {
						header : '扩展3',
						isExp : false,
						hidden : true,
						dataIndex : 'ext3'
					}, {
						header : '扩展4',
						isExp : false,
						hidden : true,
						dataIndex : 'ext4'
					}, {
						header : '扩展5',
						isExp : false,
						hidden : true,
						dataIndex : 'ext5'
					}, {
						header : '扩展6',
						isExp : false,
						hidden : true,
						dataIndex : 'ext6'
					}, {
						header : '扩展7',
						isExp : false,
						hidden : true,
						dataIndex : 'ext7'
					}, {
						header : '扩展8',
						isExp : false,
						hidden : true,
						dataIndex : 'ext8'
					}, {
						header : '扩展9',
						isExp : false,
						hidden : true,
						dataIndex : 'ext9'
					}, {
						header : '扩展10',
						isExp : false,
						hidden : true,
						dataIndex : 'ext10'
					}, {
						header : '扩展11',
						isExp : false,
						hidden : true,
						dataIndex : 'ext11'
					}, {
						header : '扩展12',
						isExp : false,
						hidden : true,
						dataIndex : 'ext12'
					}, {
						header : '扩展13',
						isExp : false,
						hidden : true,
						dataIndex : 'ext13'
					}, {
						header : '扩展14',
						isExp : false,
						hidden : true,
						dataIndex : 'ext14'
					}, {
						header : '扩展15',
						isExp : false,
						hidden : true,
						dataIndex : 'ext15'
					}, {
						header : '扩展16',
						isExp : false,
						hidden : true,
						dataIndex : 'ext16'
					}, {
						header : '扩展17',
						isExp : false,
						hidden : true,
						dataIndex : 'ext17'
					}, {
						header : '扩展18',
						isExp : false,
						hidden : true,
						dataIndex : 'ext18'
					}, {
						header : '扩展19',
						isExp : false,
						hidden : true,
						dataIndex : 'ext19'
					}, {
						header : '扩展20',
						isExp : false,
						hidden : true,
						dataIndex : 'ext20'
					}]
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
		// var searchPanel = Ext.getCmp('ScProductSearchPanel');
		// var gridPanel = Ext.getCmp('ScProductGrid');
		// if (searchPanel.getForm().isValid()) {
		$search({
					searchPanel : this.searchPanel,
					gridPanel : this.gridPanel
				});
		// }
	},
	// GridPanel行点击处理事件
	rowClick : function(grid, rowindex, e) {
		grid.getSelectionModel().each(function(rec) {
					new ScProductForm({
								productId : rec.data.productId
							}).show();
				});
	},
	// 创建记录
	createRs : function() {
		// new ScProductForm().show();
		var tabs = Ext.getCmp('centerTabPanel');
		var aForm = Ext.getCmp('ScProductForm');
		if (aForm != null) {
			tabs.remove('ScProductForm');
		}
		aForm = new ScProductForm();
		tabs.add(aForm);
		tabs.activate(aForm);

	},
	// 按ID删除记录
	removeRs : function(id) {
		$postSubmit({
					url : __ctxPath + '/goods/multiDelScProduct.do',
					ids : id,
					grid : this.gridPanel,
					msgTip : '您确认要删除所选记录吗？',
					msgSuccess : '成功删除该记录！',
					msgFailure : '操作出错，请联系管理员！'
				});
	},
	// 把选中ID删除
	removeSelRs : function() {
		$gridRs({
					url : __ctxPath + '/goods/multiDelScProduct.do',
					grid : this.gridPanel,
					idName : 'productId',
					msgNull : '请选择要删除的记录！',
					msgTip : '您确认要删除所选记录吗？',
					msgSuccess : '成功删除该记录！',
					msgFailure : '操作出错，请联系管理员！'
				});
	},
	// 编辑Rs
	editRs : function(record) {
		// new ScProductForm({
		// productId : record.data.productId
		// }).show();
		var tabs = Ext.getCmp('centerTabPanel');
		var aForm = Ext.getCmp('ScProductForm');
		if (aForm != null) {
			tabs.remove('ScProductForm');
		}
		aForm = new ScProductForm({
					productId : record.data.productId
				});
		tabs.add(aForm);
		tabs.activate(aForm);
	},
	// 行的Action
	onRowAction : function(grid, record, action, row, col) {
		switch (action) {
			case 'btn-del' :
				this.removeRs.call(this, record.data.productId);
				break;
			case 'btn-edit' :
				this.editRs.call(this, record);
				break;
			default :
				break;
		}
	}
});
