Ext.ns('UkKnowApplyItemView');
/**
 * 采集知识列表
 */

var UkKnowApplyItemView = function(_id) {
	return this.setup(_id);
};
/**
 * 建立视图
 */
UkKnowApplyItemView.prototype.setup = function(_id) {
	return this.grid(_id);
};
/**
 * 建立DataGrid
 */
UkKnowApplyItemView.prototype.grid = function(_id) {
	var sm = new Ext.grid.CheckboxSelectionModel({
		listeners:{
	        'rowselect' : function( selectionModel, rowIndex, record){
				var rows = selectionModel.getSelections();
	            var ids = Ext.getCmp('_sysKnowIds');
	            var sysKnowIds = '';
				if (rows != null && rows.length >= 1) {
					for(var i=0; i<rows.length; i++) {
						sysKnowIds+= rows[i].data.knowId + ",";
					}
					ids.reset();
					ids.setValue(sysKnowIds);
				}else {
					Ext.ux.Toast.msg(__actioninfo,'请选择要审批的知识!');
				}
	        }
//			'rowdeselect':function(sm,rowIndex,record){
//	        	Ext.ux.Toast.msg(__actioninfo,'请选择要审批的知识!');
//	        }
	    }
	});
	var cm = new Ext.grid.ColumnModel({
		columns : [ new Ext.grid.RowNumberer(),sm, {
					header : 'knowId',
					dataIndex : 'knowId',
					hidden : true
				}, {
					header : '标题',
					dataIndex : 'tiTle'
				}, {
					header : '知识模板',
					dataIndex : 'ukKnowTemplate',
					renderer : function(val) {
						return val!=null?val.tmpName:'';
					}
				}, {
					header : '业务分类',
					dataIndex : 'busiType',
					renderer : function(value) {
						return BUSI_TYPE.get(value);
					}
				}, {
					header : '状态',
					dataIndex : 'sysKnowStatus',
					renderer : function(value) {
						return KNOW_FLOW.get(value);
					}
				}
//				,{
//					header : '管理',
//					dataIndex : 'knowId',
//					width : 50,
//					sortable : false,
//					renderer : function(value, metadata, record, rowIndex, colIndex) {
//						var editId = record.data.applyId;
//						var str = '<button title="删除" value=" " class="btn-del" onclick="UkKnowApplyItemView.remove(' + editId + ')">&nbsp;&nbsp;</button>';
//						return str;
//					}
//				}
				],
		defaults : {
			sortable : true,
			menuDisabled : false,
			width : 100
		}
	});

	var store = this.store(_id);

	if (_id != '' && _id != null && _id != 'undefined') {
		store.load({
			params : {
				start : 0,
				limit : 25
			}
		});
	}

	var grid = new Ext.grid.EditorGridPanel({
		id : 'UkKnowApplyItemGrid',
		title : '申请的知识',//'知识审批列表',
		tbar :new Ext.Toolbar({
				width : '100%',
				items : ['->', {
							text : '删除',
							iconCls : 'btn-cancel',
							scope : this,
							handler : function(){
								var grid = Ext.getCmp("UkKnowApplyItemGrid");
								grid.stopEditing();
								var s = grid.getSelectionModel().getSelections();
								if(s.length>0){
									for (var i = 0, r; r = s[i]; i++) {
									grid.getStore().remove(r);
								}
									grid.getView().refresh();
									grid.startEditing(0, 0);
								}else{
									Ext.ux.Toast.msg(__actioninfo,'请选择需要删除的知识');
								}
							}
						}]
			}),
		store : store,
		width : '98%',
		height : 268,
		trackMouseOver : true,
		autoScroll : true,
		disableSelection : false,
		loadMask : true,
		// autoHeight : true,
		cm : cm,
		sm : sm,
		viewConfig : {
			forceFit : true,
			enableRowBody : false,
			showPreview : false
		}
	});

	grid.addListener('rowupdated', function(grid, rowindex, record) {
		    var grid = Ext.getCmp('UkKnowApplyItemGrid');
			var rows = grid.getSelectionModel().getSelections();
			
			var ids = '';
			if (rows != null && rows.length >= 1) {
				for(var i=0; i<rows.length; i++) 
					ids+= rows[i].data.knowTypeId + ",";
				this.save
			}else {
				Ext.ux.Toast.msg(__actioninfo,'请选择要审批的知识!');
			}
	 });
	return grid;

};

/**
 * 初始化数据
 */
UkKnowApplyItemView.prototype.store = function(_id) {
	var store = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
			url : __ctxPath+ '/know/listUkSysKnow.do'
		}),
		baseParams : {
			'Q_sysKnowStatus_N_EQ' : 2
		},
		reader : new Ext.data.JsonReader({
			root : 'result',
			totalProperty : 'totalCounts',
			id : 'id',
			fields : [{
						name : 'knowId',
						type : 'int'
					},'tiTle', 'ukKnowTemplate', 'sysKnowStatus', 'busiType']
		}),
		remoteSort : true
	});
	store.setDefaultSort('knowId', 'desc');
	return store;
};

/**
 * 建立操作的Toolbar
 */
UkKnowApplyItemView.prototype.topbar = function() {
	var toolbar = new Ext.Toolbar({
		id : 'UkKnowApplyItemFootBar',
		height : 30,
		bodyStyle : 'text-align:left',
		items : ['->',{
			iconCls : 'btn-add',
			text : '添加',
			align : 'right',
			xtype : 'button',
			handler : function() {
				var _store = Ext.getCmp('UkKnowApplyItemGrid').getStore();
				var _exclude = '';
				// 拼出已选的薪酬项目ID
				for (var i = 0; i < _store.getCount(); i++) {
					_exclude += _store.getAt(i).get('salaryItemId')
							+ ',';
				}
				SalaryItemSelector.getView(
//						function(salaryItemId, itemName, defaultVal) {
//							var ids = salaryItemId.split(',');
//							var names = itemName.split(',');
//							var values = defaultVal.split(',');
//							var grid = Ext
//									.getCmp('UkKnowApplyItemGrid');
//							var store = grid.getStore();
//							var Plant = grid.getStore().recordType;
//							grid.stopEditing();
//
//							for (var i = 0; i < ids.length; i++) {
//								var p = new Plant();
//								p.set('salaryItemId', ids[i]);
//								p.set('itemName', names[i]);
//								p.set('amount', values[i]);
//								p.commit();
//								store.insert(store.getCount(), p);
//							}
//
//							grid.getView().refresh();
//							grid.startEditing(0, 0);
//							StandSalaryItemView.onCalcTotalMoney();
//						}, _exclude
						).show();
					}
				}]
			});
	return toolbar;
};

/**
 * 删除单个记录
 */
UkKnowApplyItemView.remove = function(id) {
	var grid = Ext.getCmp("UkKnowApplyItemGrid");
	grid.stopEditing();
	var s = grid.getSelectionModel().getSelections();
	for (var i = 0, r; r = s[i]; i++) {
		grid.getStore().remove(r);
	}
//	var deleteItemIds = Ext.getCmp('deleteItemIds');
//	deleteItemIds.setValue(deleteItemIds.getValue()+','+id)
	grid.getView().refresh();
	grid.startEditing(0, 0);
};