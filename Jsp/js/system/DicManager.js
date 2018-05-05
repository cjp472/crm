/**
 * 分类管理
 * 
 * @class ProModalManager
 * @extends Ext.Panel
 */
DicManager = Ext.extend(Ext.Panel, {
	constructor : function(config) {
		Ext.applyIf(this, config);
		this.initUIComponents();
		DicManager.superclass.constructor.call(this, {
					id : 'DicManager',
					height : 450,
					autoScroll : true,
					layout : 'border',
					title : '系统参数',
					iconCls : "menu-dictionary",
					items : [this.leftPanel, this.centerPanel]
				});
	},
	initUIComponents : function() {
		var flag = this.flag;
		        
		this.leftPanel = new htsoft.ux.TreePanelEditor({
			region : 'west',
			id : 'dicType',
			plugins : ['multifilter'],// 加载 树节点智能过滤
			title : '数据字典分类',
			collapsible : true,
			split : true,
			height : 450,
			expanded : true,
			collapseFirst : true,
			width : 220,
			autoScroll : true,
			url : __ctxPath
					+ '/system/treeByCatGlobalType.do?catKey=DIC&category=0',
			onclick : function(node) {
				this.selectedNode = node;
				var parentId = node.id;
				var grid = Ext.getCmp('dicGrid');
				if (grid != null) {
					if (parentId == 0) {
						grid.setTitle('系统参数数据字典');
					} else {
						grid.setTitle(node.text + '-数据字典');
						var store = grid.getStore();
						store.url = __ctxPath + "/system/listDictionary.do";
						store.baseParams = {
							parentId : parentId
						};
						store.reload();
					}
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
										flag : flag,
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
										flag : flag,
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
		// this.leftPanel.collapseAll () ;
		this.store = new Ext.data.JsonStore({
					url : __ctxPath + '/system/listDictionary.do',
					baseParams : {
						parentId : 10000
					},
					root : 'result',
					totalProperty : 'totalCounts',
					remoteSort : true,
					fields : [{
								name : 'dicId',
								type : 'int'
							}, 'itemName', 'itemValue', 'mapName', 'itemIndex',
							'descp', 'sn', 'globalType', 'parentName',
							'statusId', 'relaOperation', 'relDic','relType','relDictionary','relGlobalType']
				});
		this.store.setDefaultSort('dicId', 'desc');
		// 加载数据
		this.store.load({
					params : {
						start : 0,
						limit : 25
					}
				});
        var comxstore = new Ext.data.SimpleStore({
										fields : [{name: 'dicId', type: 'int'}, {name: 'itemValue'}]
					});
	    var bools =false;
	    var boolss =false,texre="";
		// 初始化ColumnModel
		var sm = new Ext.grid.CheckboxSelectionModel();
		var cm = new Ext.grid.ColumnModel({
			columns : [new Ext.grid.RowNumberer(), sm, {
						header : 'ID',
						dataIndex : 'dicId',
						hidden : true
					}, {
						header : 'parentId',
						dataIndex : 'globalType',
						hidden : true,
						renderer : function(globalType) {
							if (globalType)
								return globalType.parentId;
							else
								return 0;
						}
					}, {
						header : 'proTypeId',
						dataIndex : 'globalType',
						hidden : true,
						renderer : function(globalType) {
							if (globalType)
								return globalType.proTypeId;

						}
					}, {
						header : '分类名称',
						dataIndex : 'itemName'
					}, {
						header : '分类Key',
						dataIndex : 'mapName'
					}, {
						header : '参数名',
						dataIndex : 'itemValue',
						editor : new Ext.form.TextField({
									allowBlank : false
								})
					}, {
						header : '参数值',
						dataIndex : 'itemIndex'
					}, {
						header : '级联类别',
						dataIndex : 'relGlobalType',
						renderer : function(value){
							return value ? value.typeName : '';
						}
//						editor : {
//							xtype : 'treecomboy',
//							editable : true,
//							lazyInit : true,
//							tplId : 'tree_tpl',
//							listWidth : 200,
//							id : 'dictionary-trell-proType',
//							rootVisible : false,
//							url : __ctxPath
//									+ '/system/treeGlobalType.do?catKey=DIC',
//							forceSelection : false,
//							listeners : {
//								change : function(treecomboy) {
//									//alert(node.id);
//									Ext.getCmp('dictionary-comboParentId').clearValue();
//									this.selectedNode = treecomboy;
//									boolss = true;
//									texre = treecomboy.getNode();
//									var parentId = Ext.getCmp('dictionary-trell-proType').getHiddenValue();
//									
//									if (parentId != null && parentId != '') {
//										Ext.Ajax.request({
//											url : __ctxPath
//													+ '/system/comboByParentDictionary.do',
//											params : {
//												'parentId' : parentId
//											},
//											method : 'post',
//											success : function(response) {
//												var result = Ext.util.JSON.decode(response.responseText);
//												Ext.getCmp('dictionary-comboParentId').getStore().loadData(result);
//												Ext.getCmp('dictionary-comboParentId').clearValue();
//												bools = true;
//												
//												//(node.id);
//												//Ext.getCmp('dictionary-trell-proType').setHiddenValue(node.id);
//											}
//										});
//									}
//								}
//							}
//						},
//						renderer:function(value){
//							if(boolss){
//								return texre.text;
//							}else{
//								return value ? value.typeName : '';
//							}
//						}
					}, {
						header : '级联参数',
						dataIndex : 'relDictionary',
						renderer : function(value){
							return value ? value.itemValue : '';
						}
//						editor : {
//							xtype : 'combo',
//							editable : true,
//							listWidth : 200,
//							lazyInit : false,
//							triggerAction : 'all',
//							mode : 'local',
//							id : 'dictionary-comboParentId',
//							store : comxstore,
//							forceSelection : false,
//							displayField : 'itemValue',
//							valueField : 'dicId',
//							listeners : {
//								scope : this,
//								'select' : function(combo, record, index) {
//									// Ext.getCmp('dic.relDic').setValue(combo.value);
//								}
//							}
//						},
//						renderer:function(value){
//							if(bools){
//								//alert(value);
//								var index = comxstore.find('dicId',value);  
//								return comxstore.getAt(index).get('itemValue');
//							}else{
//								return value ? value.itemValue : '';
//							}
//						}
					}, {
						header : '序号',
						dataIndex : 'sn',
						editor : new Ext.form.TextField()
					}, {
						header : '描述',
						dataIndex : 'descp',
						editor : new Ext.form.TextField()
					}, {
						header : '状态',
						dataIndex : 'statusId',
						editor : new MT.DicComboBox({
									hiddenName : 'dictionary.statusId',
									xtype : 'mtdiccombo',
									editable : true,
									lazyInit : false,
									forceSelection : false,
									itemKey : 'CONZT'
								}),
						renderer : function(value) {
							return CONZT.get(value);
						}
					}, {
						header : '父节点项字典',
						dataIndex : 'parentName',
						hidden : true
					}],
			defaults : {
				sortable : true,
				menuDisabled : false,
				width : 100
			}
		});

		var tbar = new Ext.Toolbar({
			items : ['->', {
						text : '添加',
						iconCls : 'btn-add',
						id : 'dic-add-btn',
						scope : this,
						handler : function() {
							var gridPanel = this.centerPanel;
							var dicType = Ext.getCmp('dicType');

							var selectedNode = dicType.selectedNode;
							if (selectedNode != null) {
								var isTree = selectedNode.attributes.isTree;
								var typeName = dicType.selectedNode.text;

								var parentId = 0;
								if (selectedNode != null) {
									parentId = selectedNode.id;
								}
								if (parentId == 0) {
									Ext.ux.Toast.msg('操作信息', '请选择除总分类以外的字典分类!');
									return;
								}
								new DictionaryForm({
											parentId : parentId,
											typeName : typeName,
											isTree : isTree,
											callback : function() {
												gridPanel.getStore().reload();
											}
										}).show();
							} else {
								Ext.ux.Toast.msg('操作信息', '请从左选择字典分类!');
							}
						}
					}, '-', {
						text : '编辑',
						iconCls : 'btn-edit',
						id : 'dic-edit-btn',
						disabled : true,
						scope : this,
						handler : function() {
							var gridPanel = this.centerPanel;
							
							var selectRecords = gridPanel.getSelectionModel().getSelections();
							if (selectRecords.length == 0) {
								Ext.ux.Toast.msg("信息", "请选择一条要编辑的记录！");
								return;
							}
							if (selectRecords.length > 1) {
								Ext.ux.Toast.msg("信息", "只能选择一条记录进行编辑！");
								return;
							}
							var dicId = selectRecords[0].data.dicId;
							new DictionaryEditForm({
								dicId : dicId,
								callback : function() {
									gridPanel.getStore().reload();
								}
							}).show();
						}
					}, '-', {
						xtype : 'button',
						text : '保存',
						iconCls : 'btn-save',
						id : 'dic-save-btn',
						disabled : true,
						scope : this,
						handler : function() {
							var params = [];
							var grid = this.centerPanel;
							var store = grid.getStore();

							for (var i = 0; i < store.getCount(); i += 1) {
								var record = store.getAt(i);
								if (record.dirty) {
									params.push(record.data);
								}
							}

							if (params.length == 0) {
								Ext.ux.Toast.msg('信息', '没有对数据进行任何更改');
								return;
							}
							Ext.Ajax.request({
										method : 'post',
										url : __ctxPath
												+ '/system/mulSaveDictionary.do',
										params : {
											data : Ext.encode(params)
										},
										success : function(request) {
											Ext.ux.Toast.msg('操作信息', '成功设置');
											store.reload();
											grid.getView().refresh();
										},
										failure : function(request) {
											Ext.ux.Toast.msg('操作信息',
													'设置出错，请联系管理员!');
										}
									});

						}
					}, '-', {
						text : '删除',
						iconCls : 'btn-del',
						id : 'dic-del-btn',
						disabled : true,
						scope : this,
						handler : function() {
							var gridPanel = this.centerPanel;
							var selectRecords = gridPanel.getSelectionModel()
									.getSelections();
							if (selectRecords.length == 0) {
								Ext.ux.Toast.msg("信息", "请选择要删除的记录！");
								return;
							}
							var ids = Array();
							for (var i = 0; i < selectRecords.length; i++) {
								ids.push(selectRecords[i].data.dicId);
							}

							Ext.Msg.confirm('信息确认', '您确认要删除所选记录吗？', function(
									btn) {
								if (btn == 'yes') {
									Ext.Ajax.request({
										url : __ctxPath
												+ '/system/multiDelDictionary.do',
										params : {
											ids : ids
										},
										method : 'POST',
										success : function(response, options) {
											Ext.ux.Toast.msg('操作信息',
													'成功删除该数字字典！');
											gridPanel.getStore().reload();
										},
										failure : function(response, options) {
											Ext.ux.Toast.msg('操作信息',
													'操作出错，请联系管理员！');
										}
									});
								}
							});
						}
					}, '-', {
						text : '转移类型',
						iconCls : '',
						handler : function() {
							var grid = Ext.getCmp('dicGrid');
							var rows = grid.getSelectionModel().getSelections();
							var dicIds = '';
							if (rows.length == 0) {
								Ext.ux.Toast.msg('操作信息', '请选择记录!');
								return;
							}
							for (var i = 0; i < rows.length; i++) {
								if (i > 0) {
									dicIds += ',';
								}
								dicIds += rows[i].data.dicId;
							}

							new DicTypeChangeWin({
										dicIds : dicIds,
										callbal : function() {
											grid.getStore().reload();
										}
									}).show();
						}
					}, '-', {
						text : '同步脚本',
						iconCls : '',
						handler : function() {
							Ext.Msg.confirm('信息确认', '您确认要生成脚本，刷新缓存？', function(
									btn) {
								if (btn == 'yes') {

									Ext.Ajax.request({
										url : __ctxPath
												+ '/system/createJsDictionary.do',
										method : 'post',
										success : function(response, options) {
											Ext.ux.Toast.msg('操作信息',
													'生成脚本该数字字典！');
											gridPanel.getStore().reload();
										},
										failure : function(response, options) {
											Ext.ux.Toast.msg('操作信息',
													'操作出错，请联系管理员！');
										}
									});
								}
							});
						}
					}]
		});

		this.centerPanel = new Ext.grid.EditorGridPanel({
					region : 'center',
					title : '数字字典',
					tbar : tbar,
					clicksToEdit : 1,
					id : 'dicGrid',
					store : this.store,
					sm : sm,
					cm : cm,
					layout : 'fit',
					autoWidth : true,
					autoScroll : true,
					height : 450,
					viewConfig : {
						forceFit : true,
						autoFill : true
					},
					bbar : new Ext.PagingToolbar({
								pageSize : 25,
								store : this.store,
								displayInfo : true,
								displayMsg : '当前页记录索引{0}-{1}， 共{2}条记录',
								emptyMsg : "当前没有记录"
							})
				});
		this.centerPanel.getSelectionModel().on('selectionchange',
				function(sm) {
					Ext.getCmp('dic-save-btn').setDisabled(sm.getCount() < 1);
					Ext.getCmp('dic-del-btn').setDisabled(sm.getCount() < 1);
					Ext.getCmp('dic-edit-btn').setDisabled(sm.getCount() < 1);
				});
	}// end of initUIComponents

});