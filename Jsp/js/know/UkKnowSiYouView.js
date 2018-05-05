
UkKnowSiYouView = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		UkKnowSiYouView.superclass.constructor.call(this, {
					id : 'UkKnowSiYouViewWin',
					title : '私有知识',
					region : 'center',
					layout : 'border',
					items : [this.treePanel, this.contentPanel]
				});
	},// end of constructor
	// 初始化组件
	initUIComponents : function() {
		this.searchPanel = new Ext.FormPanel({
			layout : 'hbox',
			region : 'north',
			id : 'UkKnowSysMapPanel',
			height : 35,
			items : [{
						text : '标题:',
						style:'margin-top:-3px'
					}, {
						name : 'title',
						xtype : 'textfield'
					}, {
						text : "关键字:",
						style:'margin-top:-3px'
					}, {
						name : 'ukKnowKeyWord',
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
						handler : function() {
							var searchPanel = Ext
									.getCmp('UkKnowSysMapPanel');
							searchPanel.getForm().reset();
						}
					}, {
						xtype : 'button',
						text : __advancedSearch,
						iconCls : 'search',
						scope : this,
						handler : function() {
							new UkSysKnowAdvancedSearchWin().show()
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

		// 初始化树形Panel
		this.treePanel = new Ext.tree.TreePanel({
	        region : 'west',
	        id : 'uldepartmentTreePanel',
	        title : '私有知识分类',
            layout : 'fit',
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
                            scope : this,
	                        handler : function() {
	                            this.treePanel.root.reload();
	                        }
	                    }, '-', {
	                        xtype : 'button',
	                        text : '展开',
	                        iconCls : 'btn-expand',
                            scope : this,
	                        handler : function() {
	                            this.treePanel.expandAll();
	                        }
	                    }, '-', {
	                        xtype : 'button',
	                        text : '收起',
	                        iconCls : 'btn-collapse',
                            scope : this,
	                        handler : function() {
	                            this.treePanel.collapseAll();
	                        }
	                    }]
	        }),
	        loader : new Ext.tree.TreeLoader({
	                    url : __ctxPath + '/know/listUkPersonKnowType.do'
	                }),
	        root : new Ext.tree.AsyncTreeNode({
	                    expanded : true
	                }),
	        rootVisible : false,
	        listeners : {
//	            'click' : this.clickNode
	        }
	    });
        
        this.treePanel.on('contextmenu', contextmenu, this);
        
        function contextmenu(node, e) {
	        // 创建右键菜单
	        var treeMenu = new Ext.menu.Menu({
	                    items : []
	                });
	        treeMenu.clearMons();
            treeMenu.add({
                        text : '新建分类',
                        iconCls : 'btn-add',
                        scope : this,
                        handler : function(){
                            this.createNode(node.id);
                        }
                    });
            treeMenu.add({
                        text : '修改分类信息',
                        iconCls : 'btn-edit',
                        scope : this,
                        handler : function(){
                            this.editNode(node.id);
                        }
                    });
            treeMenu.add({
                        text : '删除分类',
                        iconCls : 'btn-delete',
                        scope : this,
                        handler : function(){
                            this.deteleNode(node.id);
                        }
                    });
            treeMenu.showAt(e.getXY());
        }
        
		this.topbar = new Ext.Toolbar({
			items : ['->',{
						iconCls : 'btn-add',
						text : __create,
						xtype : 'button',
						scope : this,
						handler : this.createRs
					}, '->', {
						iconCls : 'btn-del',
						text : __delete,
						xtype : 'button',
						scope : this,
						handler : this.removeSelRs
					}]
		});
               
		this.gridPanel = new HT.GridPanel({
			region : 'center',
			// tbar : this.topbar,
			// 使用RowActions
			rowActions : true,
			printable : false,
			tbar:this.topbar,
			exportable : false,
			id : 'UkKnowSiYouViewGrid',
//			url : __ctxPath + "/know/listMapUkSysKnow.do",
			url : __ctxPath + "/know/queryKnowListUkSysKnow.do",
			fields : [{
                        name : 'knowId',
                        type : 'int'
                    }, 'ukKnowTemplate', 'ukKnowApprove', 'tiTle', 'busiType',
                    'enableTime', 'pastTime', 'sysKnowStatus', 'viewCount',
                    'sysKnowComment', 'plus1', 'plus2', 'plus3', 'plus4',
                    'plus5', 'plus6', 'plus7', 'plus8', 'sysKnowVersion',
                    'createBy', 'updateBy', 'createDate', 'updateDate',
                    'userid', 'ukKnowTypes', 'ukKnowKeywords'],
			columns : [{
						header : __ukSysKnowKnowId,// 'knowId',
						dataIndex : 'knowId',
						hidden : true
					}, {
						header : __ukSysKnowTiTle,// '标题',
						isExp : false,
						width:400,
						dataIndex : 'tiTle'
					}, {
						header : '开始时间',// '过期时间',
						isExp : false,
						dataIndex : 'pastTime'
					}, {
						header : '结束时间',// '过期时间',
						isExp : false,
						dataIndex : 'pastTime'
					}, {
						header : '状态',// '浏览数',
						isExp : false,
						dataIndex : 'viewCount'
					}, {
						header : __ukSysKnowSysKnowVersion,// '版本号',
						isExp : false,
						hidden : true,
						dataIndex : 'sysKnowVersion'
					},new Ext.ux.grid.RowActions({
						header : __action,
						width:80,
						actions : [{
									iconCls : 'btn-edit',
									qtip : '编辑',
									style : 'margin:0 3px 0 3px'
								},{
									iconCls : 'btn-delete',
									qtip : '删除',
									style : 'margin:0 3px 0 3px'
								}],
						listeners : {
							scope : this,
							'action' : this.onRowAction
						}
					})]
				// end of columns
		});
      
		this.contentPanel = new Ext.Panel({
					region : 'center',
					layout : 'border',
					items : [this.searchPanel, this.gridPanel]
				});
                   alert(1);
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
    
    createNode : function(nodeId) {
        var win = new Ext.Window({
	        width : 300,
	        height : 200,
	        layout : 'border',
	        id : 'TypeWin',
	        closeAction : 'hide',
	        title : '添加分类',
	        closeAction : 'close',
	        items : [new Ext.form.FormPanel({
	            region : 'center',
	            height : 100,
	            layout : 'form',
	            buttonAlign : 'center',
	            labelAlign : 'right',
	            labelWidth : 70,
	            border : false,
	            items : [{
                    xtype : 'textfield',
                    fieldLabel : '名称',
                    anchor : '70%',
                    id : 'name_type',
                    maxLength : 20
                }],
                buttons : [{
                    text : '确定',
                    iconCls : 'btn-save',
                    handler : function() {
	                    Ext.Ajax.request({
						    url : __ctxPath + '/know/saveUkPersonKnowType.do',
						    params : {
						        depId : depId
						    },
						    method : 'post',
						    success : function(response) {}
                        });
                    }
                }]
	        })]
	    });
	    win.show();
    },
    
    deteleNode : function (nodeId) {
        if (nodeId > 0) {
            UlDepartmentView.action(nodeId, 'del');
        } else {
            Ext.ux.Toast.msg('警告', "总分类不能删除");
        }
    },
    
    editNode : function(nodeId) {
        if (nodeId > 0) {
            UlDepartmentView.edit(nodeId);
        } else {
            Ext.ux.Toast.msg('警告', "总分类不能修改！");
        }
    },
    
	// 创建记录
	createRs : function() {

    },
	// 按ID删除记录
	removeRs : function(id) {
		$postDel({
					url : __ctxPath + '/know/multiDelUkSysKnow.do',
					ids : id,
					grid : this.gridPanel
				});
	},
	// 把选中ID删除
	removeSelRs : function() {
		$delGridRs({
					url : __ctxPath + '/know/multiDelUkSysKnow.do',
					grid : this.gridPanel,
					idName : 'knowId'
				});
	},
	// 行的Action
	onRowAction : function(grid, record, action, row, col) {
		switch (action) {
			case 'btn-del' :
				this.removeRs.call(this, record.data.knowId);
				break;
			case 'btn-readdocument' :
				this.showRs.call(this, record);
				break;
			default :
				break;
		}
	}
});