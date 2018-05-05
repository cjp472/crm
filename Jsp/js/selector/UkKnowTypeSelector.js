/**
 * @description 知识分类选择器
 * @class UkKnowTypeSelector
 * @author 优创融联科技
 * @updater wangzj
 */
var UkKnowTypeSelector = {
	getView : function() {
		Ext.QuickTips.init();
		/* 用户组树 */
		var selectNode = null;
		var knowType_url = __ctxPath + '/know/listJsonUkKnowDingyue.do';
		var knowTypeTree = new Ext.tree.TreePanel({
				height : 200,
				flex : 7,
				useArrows : false,
				autoScroll : true,
				animate : false,
				enableDD : false,
				containerScroll : true,
				border : true,
				dataUrl : knowType_url,
				rootVisible : false,
				root : {
					nodeType : 'async',
					text : 'Ext JS',
					draggable : false
	
				},
				listeners : {
					'click' : function(node) {
						selectNode = node;
					},
					'beforeload' : function(node) {
						node.attributes.qtip = '双击添加';
						node.attributes.description = '双击添加';
					}
	
				}
			});
	
	/* 选择按钮 */
	var add = function() {
		if (selectNode == null) {
			Ext.ux.Toast.msg("信息", "请选择要添加的知识分类!");
			return;
		}
	
		var isRe = false;
		for (i = 0; i < knowTypeStore.getCount(); i++) {
			var r = knowTypeStore.getAt(i);
			if (r.data.knowTypeId == selectNode.id) {
				isRe = true;
			}
		}
		if (isRe == true) {
	
			Ext.ux.Toast.msg("操作信息", "知识分类重复，请选择其它知识分类!");
			return;
	
		}
	
		var ukKnowType = {};
		Ext.apply(ukKnowType, {
					knowTypeId : selectNode.id,
					knowTypeName : selectNode.text
					
				});
	
		var recrod = new knowTypeStore.recordType();
	
		recrod.data = {};
	
		Ext.apply(recrod.data, {
					knowTypeId : selectNode.id,
					knowTypeName : selectNode.text
				});
	
		knowTypeStore.insert(0, recrod);
	
		knowTypeStore.commitChanges();
		selectNode = null;
	
	};
	var del = function() {
	
		var selectRecords = knowTypeGrid.getSelectionModel().getSelections();
		if (selectRecords.length == 0) {
			Ext.ux.Toast.msg("操作信息", "请选择要删除的记录!");
			return;
		}
	
		knowTypeStore.remove(selectRecords[0]);
		knowTypeStore.commitChanges();
	
	};
	var selectPanel = new Ext.Panel({
				frame : false,
				border : false,
				hideBorders : true,
				height : 220,
				flex : 0.4,
				layout : {
					type : 'vbox',
					pack : 'center',
					align : 'stretch'
				},
				defaults : {
					anchor : '100%,100%'
				},
				defaults : {
					margins : '0 3 0 0'
				},
				items : [{
							xtype : 'button',
							iconCls : 'btn-right',
							scope : this,
							handler : add
						}, {
							xtype : 'button',
							iconCls : 'btn-left',
							scope : this,
							handler : del
						}]
			});
	/* 知识分类grid */
	var dellAll = function() {
		var ids = Array();
		for (i = 0; i < knowTypeStore.getCount(); i++) {
			var r = knowTypeStore.getAt(i);
			if (r.data.knowTypeId != null && r.data.knowTypeId != '') {
				ids.push(r.data.knowTypeId);
			};
	
		}
		if (ids.length > 0) {
	//		alert(ids.length);
	//		dellTrue(ids);
		}
		knowTypeStore.removeAll();
		knowTypeStore.commitChanges();
	
	};
	var gridTopbar = new Ext.Toolbar({
				items : [{
							text : '清除所选',
							scope : this,
							handler : dellAll
						}]
			});
	
	
	var knowTypeRecord = Ext.data.Record.create([{
		name : 'knowTypeId',
		type : 'int'
	}, 'parentId','knowTypeName']);
	
	var gridMemoryProxy = new Ext.data.HttpProxy({
				url : __ctxPath + "/know/showgridUkKnowDingyue.do"
			});
	
	var gridJsonReader = new Ext.data.JsonReader({
				root : 'result',
				totalProperty : 'totalCounts',
				idProperty : "knowTypeId"
			}, knowTypeRecord);
	
	var knowTypeStore = new Ext.data.Store({
				id : 'UkKnowDingyueForm.knowTypeStore',
				proxy : gridMemoryProxy,
				reader : gridJsonReader
			});
	
	knowTypeStore.on('beforeload', function(store) {
					store.baseParams = {
					start : 0,
					limit : 10000
				};
			});
	knowTypeStore.setDefaultSort('knowTypeId');
	
	knowTypeStore.load();
	
	var sm = new Ext.grid.CheckboxSelectionModel({
				singleSelect : true
			});
	
	var knowTypeGrid = new Ext.grid.EditorGridPanel({
				frame : false,
				border : true,
				flex : 6,
				height : 220,
				tbar : gridTopbar,
				store : knowTypeStore,
				clicksToEdit : 1,
				sm : sm,
				viewConfig : {
					forceFit : true,
					autoFill : true
				},
				columns : [{
							header : '知识分类编码',
							dataIndex : 'knowTypeId',
							sortable : true,
							hidden : false
						} , {
							header : '知识分类名称',
							sortable : true,
							dataIndex : 'knowTypeName',
							renderer : function(knowTypeName) {
								if (knowTypeName)
									return '<font qtip="双击删除">' + knowTypeName + '</font>';
							}
						}]
			});
	Ext.QuickTips.init();
	
	knowTypeGrid.on('dblclick', function(e) {
	
				var selectRecords = knowTypeGrid.getSelectionModel().getSelections();
				if (selectRecords.length == 0) {
					Ext.ux.Toast.msg("信息", "请选择要删除的记录！");
					return;
				}
	
				knowTypeStore.remove(selectRecords[0]);
				knowTypeStore.commitChanges();
	
			}, this);
	knowTypeTree.on('dblclick', function(selectNode) {
				
				if (selectNode == null) {
					Ext.ux.Toast.msg("信息", "请选择要添加的知识分类!");
					return;
				}
	
				var isRe = false;
				for (i = 0; i < knowTypeStore.getCount(); i++) {
					var r = knowTypeStore.getAt(i);
					if (r.data.knowTypeId == selectNode.id) {
						isRe = true;
					}
				}
				if (isRe == true) {
	
					Ext.ux.Toast.msg("信息", "知识分类重复，请选择其它知识分类!");
					return;
	
				}
	
				var recrod = new knowTypeStore.recordType();
				recrod.data = {};
				Ext.apply(recrod.data, {
							knowTypeId : selectNode.id, 
							knowTypeName : selectNode.text
						});
	
				knowTypeStore.insert(0, recrod);
				knowTypeStore.commitChanges();
				selectNode = null;
			}, this);
	
	/**
	 * 总容器
	*/
			var panel = new Ext.Panel({
				xtype : 'panel',
				height : 220,
				border : false,
				layout : {
					type : 'hbox',
					align : 'stretch'
				},
				height : 220,
				items : [knowTypeTree, selectPanel, knowTypeGrid]
			});
			return panel;
}
};
