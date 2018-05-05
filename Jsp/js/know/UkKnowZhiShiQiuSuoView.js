UkKnowZhiShiQiuSuoView = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		UkKnowZhiShiQiuSuoView.superclass.constructor.call(this, {
					id : 'UkKnowZhiShiQiuSuoViewWin_',
					title : '知识求索',
					region : 'center',
					layout : 'border',
					items : [this.contentPanel]
				});
	},// end of constructor
	// 初始化组件
	initUIComponents : function() {
		// 初始化搜索条件Panel
		this.searchPanel_on = new Ext.FormPanel({
			layout : 'hbox',
			region : 'north',
			id : 'UkKnowCollectSearchPanel_',
			height : 35,
			items : [{
				text : '内容：',
				style:'margin-top:-3px'
			}, {
				name : 'Q_content_S_LK',
				xtype : 'textfield'
			}, {
				text : '求索人：',
				style:'margin-top:-3px'
			}, {
                id : 'fullname_on_',
                xtype : 'textfield',
                listeners : {
                    'focus' : function() {
                        UserSelector.getView(function(userId, fullname) {
                                Ext.getCmp('userid_on_').setValue(userId);
                                Ext.getCmp('fullname_on_').setValue(fullname);
                            }, true, false, false).show();
                    },
                    scope : this
                }
            }, {
				text : '求索时间:',
				style:'margin-top:-3px'
			}, {
				xtype:'datefield',
				format:'Y-m-d',
				width:100,
                id:'ge_createtime_on_',
                editable : false,
                name : 'Q_createtime_D_GE'
			},{
				border:false,
				html:'~'
			}, {
				xtype:'datefield',
				format:'Y-m-d',
				width:100,
                editable : false,
                id:'le_createtime_on_',
                name : 'Q_createtime_D_LE'
			}, {
				xtype : 'button',
				text : __search,
				iconCls : 'search',
				scope : this,
				handler : this.onSearch_on
			}, {
				xtype : 'button',
				text : __reset,
				scope : this,
				iconCls : 'btn-reset',
				handler : this.reset_on
			}, {
				xtype : 'button',
				text : __advancedSearch,
				iconCls : 'search',
				scope : this,
				handler : function() {
					new UkSysKnowAdvancedSearchWin().show()
				}
			}, {
                name : 'Q_createby.userId_L_EQ',
                id : 'userid_on_',
                xtype : 'hidden'
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
		});
		this.gridPanel_on = new HT.GridPanel({
			region : 'center',
			rowActions : true,
			printable : false,
			showSm : false,
			exportable : false,
			id : 'UkKnowCollectGrid_on_',
			url : __ctxPath + "/know/listOnUkQiusuo.do",
			fields : [{
                        name : 'qiusuoId',
                        type : 'int'
                    }, 'content', 'createtime', 'content', 'createby',
                    'status', 'score', 'mark', 'huifuCount'],
			columns : [{
						header : '内容',
						width:500,
						dataIndex : 'content'
					}, {
						header : '求索人',
						isExp : false,
						dataIndex : 'createby',
                        renderer : function(value){
                            return value.fullname;
                        }
					}, {
						header : '求索时间',
						isExp : false,
						dataIndex : 'createtime'
					},{
						header : '回复数',
						isExp : false,
						dataIndex : 'huifuCount'
					}, new Ext.ux.grid.RowActions({
								header : __action,
								width : 60,
								actions : [{
											iconCls : 'btn-confApply-no',
											qtip : '回复',
											style : 'margin:0 3px 0 3px'
										}],
								listeners : {
									scope : this,
									'action' : this.onRowAction
								}
							})]
				// end of columns
		});
    
    //已关闭求索
    this.searchPanel_off = new Ext.FormPanel({
			layout : 'hbox',
			region : 'north',
			height : 35,
			items : [{
                text : '内容：',
                style:'margin-top:-3px'
            }, {
                name : 'Q_content_S_LK',
                xtype : 'textfield'
            }, {
                text : '求索人：',
                style:'margin-top:-3px'
            }, {
                id : 'fullname_off_',
                xtype : 'textfield',
                listeners : {
                    'focus' : function() {
                        UserSelector.getView(function(userId, fullname) {
                                Ext.getCmp('userid_off_').setValue(userId);
                                Ext.getCmp('fullname_off_').setValue(fullname);
                            }, true, false, false).show();
                    },
                    scope : this
                }
            }, {
                text : '求索时间:',
                style:'margin-top:-3px'
            }, {
                xtype:'datefield',
                format:'Y-m-d',
                width:100,
                editable : false,
                id:'ge_createtime_off_',
                name : 'Q_createtime_D_GE'
            },{
                border:false,
                html:'~'
            }, {
                xtype:'datefield',
                format:'Y-m-d',
                width:100,
                editable : false,
                id:'le_createtime_off_',
                name : 'Q_createtime_D_LE'
            }, {
                xtype : 'button',
                text : __search,
                iconCls : 'search',
                scope : this,
                handler : this.onSearch_off
            }, {
                xtype : 'button',
                text : __reset,
                scope : this,
                iconCls : 'btn-reset',
                handler : this.reset_off
            }, {
                xtype : 'button',
                text : __advancedSearch,
                iconCls : 'search',
                scope : this,
                handler : function() {
                    new UkSysKnowAdvancedSearchWin().show()
                }
            }, {
                name : 'Q_createby.userId_L_EQ',
                id : 'userid_off_',
                xtype : 'hidden'
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
		});
		this.gridPanel_off = new HT.GridPanel({
			region : 'center',
			printable : false,
			exportable : false,
            showSm : false,
			url : __ctxPath + "/know/listOffUkQiusuo.do",
			fields : [{
                        name : 'qiusuoId',
                        type : 'int'
                    }, 'content', 'createtime', 'content', 'createby',
                    'status', 'score', 'mark', 'huifuCount'],
			columns : [{
                        header : '内容',
                        width:500,
                        dataIndex : 'content'
                    }, {
                        header : '求索人',
                        isExp : false,
                        dataIndex : 'createby',
                        renderer : function(value){
                            return value.fullname;
                        }
                    }, {
                        header : '求索时间',
                        isExp : false,
                        dataIndex : 'createtime'
                    },{
                        header : '回复数',
                        isExp : false,
                        dataIndex : 'huifuCount'
                    }, {
						header : '处理结果',
						isExp : false,
						dataIndex : 'status',
                        renderer : function(value){
                            if(value == 1){
                                return '已关闭';
                            }
                            if(value == 2){
                                 return '已取消';
                            }
                        }
					}]
				// end of columns
		});
		
        this.contentPanel = new Ext.TabPanel({
			region : 'center',
			activeTab:0,
			items : [{
				border:false,
				layout:'border',
				title:'未关闭求索',
				items:[this.searchPanel_on, this.gridPanel_on]
			},{
				border:false,
				title:'已关闭求索',
				layout:'border',
				items:[this.searchPanel_off, this.gridPanel_off]
			}]
		});
	},// end of the initComponents()
	// 重置查询表单
	reset_on : function() {
		this.searchPanel_on.getForm().reset();
        document.getElementById('ge_createtime_on_').value = "";
        document.getElementById('le_createtime_on_').value = "";
	},
	// 按条件搜索
	onSearch_on : function() {
		$search({
			searchPanel : this.searchPanel_on,
			gridPanel : this.gridPanel_on
		});
	},
    reset_off : function() {
        this.searchPanel_off.getForm().reset();
        document.getElementById('ge_createtime_off_').value = "";
        document.getElementById('le_createtime_off_').value = "";
    },
    // 按条件搜索
    onSearch_off : function() {
        $search({
            searchPanel : this.searchPanel_off,
            gridPanel : this.gridPanel_off
        });
    },

	onRowAction : function(grid, record, action, row, col) {
		switch (action) {
			case 'btn-confApply-no' : 
				var tabs = Ext.getCmp('centerTabPanel');
				var edit = tabs.getItem('UkKnowZhiShiQiuSuoViewWin_');
				if (edit != null) {
					tabs.remove('UkKnowZhiShiQiuSuoViewWin_');
				}
				edit = new UkKnowHuiFuQiuSuoView({
                    qiusuoId : record.data.qiusuoId
                });
				tabs.add(edit);
				tabs.activate(edit);
				break;
			default :
				break;
		}
	}
});
