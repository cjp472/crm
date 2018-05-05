UkKnowQiuSuoView = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();//this.function,function的scope就是this,这里就是指向UkKnowQiuSuoView
		// 调用父类构造
		UkKnowQiuSuoView.superclass.constructor.call(this, {
			id : 'UkKnowQiuSuoViewWin',
			title : '我的求索',
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
                id : 'fullname_on',
                xtype : 'textfield',
                listeners : {
                    'focus' : function() {
                        UserSelector.getView(function(userId, fullname) {
                                Ext.getCmp('userid_on').setValue(userId);
                                Ext.getCmp('fullname_on').setValue(fullname);
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
                id:'ge_createtime_on',
                name : 'Q_createtime_D_GE'
            },{
                border:false,
                html:'~'
            }, {
                xtype:'datefield',
                format:'Y-m-d',
                width:100,
                id:'le_createtime_on',
                editable : false,
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
                id : 'userid_on',
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
        var topbar_gird_on = new Ext.Toolbar({
            items : ['->',{
                text:'增加',
                iconCls:'btn-add',
                scope : this,//指定handler方法的scope
                handler: this.addQiusuo
            }]
        });
        
		this.gridPanel_on = new HT.GridPanel({
			region : 'center',
            tbar : topbar_gird_on,
            rowActions : true,
            printable : false,
            showSm : false,
            exportable : false,
            id : 'UkKnowCollectGrid_on',
            url : __ctxPath + "/know/listOnMyUkQiusuo.do",
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
						width : 80,
						actions : [{
									iconCls : 'reset',
									qtip : '关闭',
									style : 'margin:0 3px 0 3px'
								},{
									iconCls : 'btn-confApply-no',
									qtip : '回复',
									style : 'margin:0 3px 0 3px'
								}],
						listeners : {
							scope : this,
							'action' : this.onRowAction
						}
					})]// end of columns
			});
        //已关闭求索
		this.searchPanel_off = new Ext.FormPanel({
            layout : 'hbox',
            region : 'north',
            id : 'UkKnowCollectSearchPanel2',
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
                id : 'fullname_off',
                xtype : 'textfield',
                listeners : {
                    'focus' : function() {
                        UserSelector.getView(function(userId, fullname) {
                                Ext.getCmp('userid_off').setValue(userId);
                                Ext.getCmp('fullname_off    ').setValue(fullname);
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
                id : 'ge_createtime_off',
                name : 'Q_createtime_D_GE'
            },{
                border:false,
                html:'~'
            }, {
                xtype:'datefield',
                format:'Y-m-d',
                width:100,
                editable : false,
                id : 'le_createtime_off',
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
                id : 'userid',
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
            id : 'UkKnowCollectGrid2',
            url : __ctxPath + "/know/listOffMyUkQiusuo.do",
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
                    }]// end of columns
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
        document.getElementById('le_createtime_on').value = "";
        document.getElementById('ge_createtime_on').value = "";
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
        document.getElementById('ge_createtime_off').value = "";
        document.getElementById('le_createtime_off').value = "";
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
			case 'reset' : 
				var tabs = Ext.getCmp('centerTabPanel');
				var edit = tabs.getItem('UkKnowMineHuiFuViewWin');
				if (edit != null) {
					tabs.remove('UkKnowMineHuiFuViewWin');
				}
				edit = new UkKnowMineHuiFuView({
                    qiusuoId : record.data.qiusuoId
                });
				tabs.add(edit);
				tabs.activate(edit);
				break;
			case 'btn-confApply-no' : 
				var tabs = Ext.getCmp('centerTabPanel');
				var edit = tabs.getItem('UkKnowHuiFuQiuSuoViewWin');
				if (edit != null) {
					tabs.remove('UkKnowHuiFuQiuSuoViewWin');
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
	},
    
    addQiusuo : function(){
	    var win = new Ext.Window({
	        height:240,
	        width:500,
	        title:'新建求索',
	        layout:'fit',
            id : 'win_addQiusuo',
	        buttonAlign:'center',
	        buttons:[{
	            text:'保存',
	            iconCls:'btn-save',
                scope : this,
                handler : this.saveQiusuo//function(){scope.saveQiusuo();}
	        },{
	            text:'取消',
	            iconCls:'btn-delete',
	            handler:function(){
	                win.close();
	            }
	        }],
	        items:[{
	            layout:'form',
	            style:'padding:10px;background-color:#fff',
	            border:false,
                xtype : 'form',
	            labelAlign:'right',
                id : 'qiusuoForm',
	            items:[{
	                xtype:'textarea',
	                height : 100,
                    name : 'ukQiusuo.content',
	                allowBlank : false,
	                fieldLabel : '求索内容',
	                anchor : '100%',
                    maxLength : 100
	            },{
	                xtype : 'numberfield',
	                allowBlank : false,
                    name : 'ukQiusuo.score',
	                fieldLabel : '悬赏分数',
	                anchor : '100%'
	            }]
	        }]
	    })
	    win.show();
	},
    
    saveQiusuo : function(){
        var form = Ext.getCmp('qiusuoForm');
        var grid = this.gridPanel_on;
        form.getForm().submit({
            url : __ctxPath + '/know/saveUkQiusuo.do',
            success: function(fp, action) {
                grid.getStore().reload();      
                Ext.ux.Toast.msg('操作信息', '成功保存信息！');
                Ext.getCmp('win_addQiusuo').close();
            }
        });
       
    }
    
});
