var RegionView = function() {
	return this.setup();
};

RegionView.prototype.setup = function() {
	var store = this.initData();
	var sm = new Ext.grid.CheckboxSelectionModel();
	var cm = new Ext.grid.ColumnModel({
		columns : [new Ext.grid.RowNumberer(), sm, {
					header : "regionid",
					dataIndex : 'regionId',
					hidden : true
				}, {
                    header : "path",
                    dataIndex : 'path',
                    hidden : true
                },{
                    header : "parentId",
                    dataIndex : 'parentId',
                    hidden : true
                }, {
					header : "地区名称",
					sortable : true,
					dataIndex : 'regionName',
					width : 200
				}, {
					header : "地区类型",
					sortable : true,
					dataIndex : 'regionType',
					width : 60,
					renderer : function(value) {
						return XZQYLX.get(value);
					}
				}, {
                    header : "编号",
                    sortable : true,
                    dataIndex : 'areaNo',
                    width : 60
                },{
					header : "所属地区",
					sortable : true,
					dataIndex : 'parentName',
					width : 60
				}, {
					header : '管理',
					dataIndex : 'regionId',
					sortable : true,
					width : 45,
					renderer : function(regionid, metadata, record, rowIndex,
							colIndex, store) {
						if (regionid) {
                            var type = record.data.regionType;
                            var path = record.data.path;
							var str = ''; 
							//TODO 权限限制
							if (true) {
								str += '<button title="删除" value=" " class="btn-del" onclick="RegionView.remove('
										+ regionid	+ ')"></button>';
							} else {
								str += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
							}
							//TODO 权限限制 isGranted('_DepartmentEdit')
							if (true) {
//								str += '&nbsp;<button title="编辑" value=" " class="btn-edit" onclick="RegionView.edit('
//										+ regionid + ')"></button>';
//							} else {
								str += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
							}
							return str;
						}
					}
				}],
		defaults : {
			sortable : true,
			menuDisabled : true,
			width : 100
		},
		listeners : {
			hiddenchange : function(cm, colIndex, hidden) {
				saveConfig(colIndex, hidden);
			}
		}
	});

	var grid = new Ext.grid.GridPanel({
				region : 'center',
				id : 'RegionView_grid',
				tbar : new Ext.Toolbar({
					defaultType : 'button',
					items : ['->',{
							text : '删除',
							iconCls : 'btn-del',
							handler : function() {
								RegionView.multiRemove();
							}
//						},'->', {
//							text : '添加',
//							iconCls : 'add-user',
//							handler : function() {
//								var node = Ext.getCmp('RegionTreePanel').
//									getSelectionModel().getSelectedNode();
//								if(node == null){
//									RegionView.add(0);
//								}else{
//                                    RegionView.add(node.id);
//								}	
//							}
						}]
				}),
				height : 800,
				title : '行政区域列表',
				store : store,
				shim : true,
				trackMouseOver : true,
				disableSelection : false,
				loadMask : true,
				cm : cm,
				sm : sm,
				viewConfig : {
					forceFit : true,
					enableRowBody : false,
					showPreview : false
				},
				// paging bar on the bottom
				bbar : new HT.PagingBar({
							store : store
						})
			}); // end of this grid
  
	//双击编辑该行
//	grid.addListener('rowdblclick', rowdblclickFn);
//	function rowdblclickFn(grid, rowindex, e) {
//		grid.getSelectionModel().each(function(rec) {
//			RegionView.edit(rec.data.depid);
//		});
//	}
    
    var root = new Ext.tree.AsyncTreeNode({
        text:'中华人民共和国',
        expanded :true,
        children: [
            {text: '省/直辖市', id : '1', leaf: true},
            {text: '市', id : '2', leaf: true},
            {text: '县', id : '3', leaf: true},
            {text: '街道', id : '4', leaf: true}
        ]
    });
	var treePanel = new Ext.tree.TreePanel({
				region : 'west',
				id : 'RegionTreePanel',
				title : '行政区域列表',
				collapsible : true,
				autoScroll : true,
				split : true,
				height : 800,
				width : 180,
				listeners : {
					'click' : RegionView.clickNode
				}
			}); // end of this treePanel
    treePanel.setRootNode(root);


	var panel = new Ext.Panel({
				// TODO panel RegionView总面板
				id : 'RegionView',
				title : '行政区域',
				closable : true,
				iconCls : 'menu-news',
				layout : 'border',
				items : [treePanel, grid],//searchPanel
				keys : [{
							key : Ext.EventObject.ESC,
							fn : RegionView.reset,
							scope : this
						}, {
							key : Ext.EventObject.ENTER,
							fn : RegionView.search,
							scope : this
						}]
			});
	return panel;
};

/**
 * Store对象
 */
RegionView.prototype.initData = function() {
	var store = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
					url : __ctxPath + '/system/listTypeNewRegion.do'
				}),
		reader : new Ext.data.JsonReader({
					root : 'result',
					totalProperty : 'totalCounts',
					fields : ['regionId','regionName','regionType',
						'parentId','parentName','areaNo', 'path']
				}),
		remoteSort : true,
        baseParams : {
            start : 0,
            limit : 25,
            "Q_regionType_SN_EQ" : 0
        }
	});
	return store;
};

RegionView.add = function(typeId) {
//    alert('type : ' + typeId);
	new RegionForm({//引用RegionForm.js line9 声明的变量名
		typeId : typeId
	}).show();
};

RegionView.edit = function(regionId) {
	var regionForm = Ext.getCmp('RegionForm');
    var record = Ext.getCmp('RegionView_grid').getSelectionModel().getSelections()[0];
    if (regionForm == null) {//如果框不存在，则生成一个，然后获取它
		//TODO 传递id给form页
        new RegionForm({
            addres : record.data.path,
            typeId : record.data.regionType,
			regionId : regionId
		}).show();
		departmentForm = Ext.getCmp('RegionForm');
	}
    departmentForm.form.load({
        url : __ctxPath + '/system/detailNewRegion.do',
        params : {
            regionId : regionId,
            typeId : record.data.regionType
        },
	    method : 'post',
	    deferredRender : true,
	    layoutOnTabChange : true,
	    failure : function() {
	        Ext.ux.Toast.msg('编辑', '载入失败');
	    }
    });
};

RegionView.multiRemove = function() {
	var grid = Ext.getCmp('RegionView_grid');
	var rows = grid.getSelectionModel().getSelections();
	if (rows != null && rows.length > 0) {
		var ids = new Array();
		for (var i = 0; i < rows.length; i++)
			ids.push(rows[i].data.regionId);
		RegionView.remove_ids(ids);
	} else
		Ext.ux.Toast.msg('操作提示', '对不起，请选择你要删除的数据！');
};

RegionView.remove_ids = function(_ids) {
	Ext.Msg.confirm('删除操作', '你确定要删除该地区吗?', function(btn) {
		if (btn == 'yes') {
			Ext.Ajax.request({
				url : __ctxPath + '/system/multiDelRegion.do',
				method : 'post',
				params : {
					ids : _ids
				},
				success : function(response) {
                    var res = Ext.util.JSON.decode(result.responseText);
                    if (res.success == false) {
                        Ext.ux.Toast.msg('操作信息', '地区存在子地区!');
                    } else {
                        Ext.ux.Toast.msg('操作信息', '删除成功!');
                    }
					Ext.getCmp('RegionView_grid').getStore()
							.reload();
					Ext.getCmp('RegionTreePanel').root.reload();
				},
				failure : function() {
					Ext.ux.Toast.msg("操作信息", "机构删除失败,机构存在子机构");
				}
			});
		}
	});
};

/**
 * 删除组织机构
 */
RegionView.remove = function(regionId) {
	Ext.Msg.confirm('删除操作', '你确定删除该地区?', function(btn) {
		if (btn == 'yes') {
			Ext.Ajax.request({
				url : __ctxPath + '/system/removeRegion.do?regionId='
					+ regionId,
				success : function(result, request) {
					var res = Ext.util.JSON.decode(result.responseText);
					if (res.success == false) {
						Ext.ux.Toast.msg('操作信息', '地区存在子地区!');
					} else {
						Ext.ux.Toast.msg('操作信息', '删除成功!');
					}
					Ext.getCmp('RegionTreePanel').root.reload();
					Ext.getCmp('RegionView_grid').getStore().reload();
				},
				failure : function(result, request) {}
			});
		}
	});
};

/**
 * 节点单击事件
 * 
 * @param node
 */
RegionView.clickNode = function(node) {
    var regions = Ext.getCmp('RegionView_grid');
    regions.setTitle(node.text + ' 区域列表');
    var store = regions.getStore();
    if(node.id != 4){
        store.baseParams['Q_regionType_SN_EQ'] = node.id;
        store.proxy = new Ext.data.HttpProxy({
            url : __ctxPath + '/system/listTypeNewRegion.do'
        });
    }else{
//  alert(store.url);
//  alert(store.proxy.url)
        store.proxy = new Ext.data.HttpProxy({
            url:__ctxPath + '/system/detailListTypeNewRegion.do'
        });
    }
    store.reload({
        params : {
            start : 0,
            limit : 25
        }
    });
};