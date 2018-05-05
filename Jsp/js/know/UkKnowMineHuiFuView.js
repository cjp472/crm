UkKnowMineHuiFuView = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		UkKnowMineHuiFuView.superclass.constructor.call(this, {
			id : 'UkKnowMineHuiFuViewWin',
			title : '关闭求索',
			region : 'center',
			layout : 'border',
			items : [this.contentPanel],
			buttonAlign : 'center',
			buttons : [{
						text : '提交',
                        scope : this,
                        handler : this.save
					}, {
						text : '取消',
                        scope : this,
                        handler : this.cancle
					}]
		});
	},// end of constructor
	// 初始化组件
	initUIComponents : function() {
		this.formPanel = new Ext.Panel({
            layout : 'form',
            border : false,
            labelAlign : 'right',
            autoScroll : true,
            defaults : {
                anchor : '96%,96%'
            },
            items : [{
                fieldLabel : '求索内容',
                xtype : 'textarea',
                name : 'ukQiusuo.content',
                readOnly : true,
                height : 50
            }, {
                fieldLabel : '说明',
                xtype : 'textarea',
                name : 'ukQiusuo.mark',
                readOnly : true,
                height : 50
            },{
                border : false,
                layout : 'column',
                items : [{
                    columnWidth : .333,
                    border : false,
                    layout : 'form',
                    items : [{
                        fieldLabel : '求索人',
                        xtype : 'textfield',
                        name : 'ukQiusuo.createby.fullname',
                        readOnly : true,
                        anchor : '100%'
                    }]
                }, {
                    columnWidth : .333,
                    border : false,
                    layout : 'form',
                    items : [{
                        fieldLabel : '求索时间',
                        xtype : 'textfield',
                        anchor : '100%',
                        readOnly : true,
                        name : 'ukQiusuo.createtime'
                    }]
                }, {
                    columnWidth : .333,
                    border : false,
                    layout : 'form',
                    items : [{
                        fieldLabel : '悬赏分数',
                        xtype : 'textfield',
                        anchor : '100%',
                        readOnly : true,
                        name : 'ukQiusuo.score'
                    }]
                }]
            }]
        });

        this.formPanel.loadData({
            url : __ctxPath + '/know/loadDataUkQiusuo.do',
            params : {
                id : this.qiusuoId
            },
            root : 'data',
            preName : 'ukQiusuo',
            method : 'post',
            failure : function() {
                Ext.ux.Toast.msg('编辑', '载入失败');
            }
        });
        
        this.gridPanel = new HT.GridPanel({
            hideHeaders : true,
            printable : false,
            height : 150,
            id : 'huifuList',
            showSm : true,
            exportable : false,
            url : __ctxPath + "/know/listOneUkQiusuoHuifu.do?id="+this.qiusuoId,
            fields : [{
                name : 'qiusuoHuifuId',
                type : 'int'
            }, 'content', 'reply', 'replytime', 'ukQiusuo', 
            'ukQiusuoHuifuFiles', 'ukQiusuoHuifuKnows'],
            columns : [{
                header : '',
                dataIndex : 'knowId',
                renderer : function(val, cls, record) {
                    return '<div>' +
                        '<p>'+record.data.content+'</p></div>' +
                        '<div style="margin-top:10px"><div style="float:right;;margin-left:10px">' +
                        '回复时间：'+record.data.replytime+'</div><div style="float:right;margin-left:20px">' +
                        '回复人：'+record.data.reply.fullname+'</div><div style="float:right;;margin-left:20px">' +
                        '<a href="javascript:{}">附件</a>|' +
                        '<a href="javascript:{}">相关知识</a></div><div style="clear:both"></div></div>';
                }
            }]// end of columns
        });
		this.contentPanel = new Ext.Panel({
			border : false,
			region : 'center',
			style : 'overflow-y:auto',
			items : [{
						xtype : 'fieldset',
						title : '求索内容',
						collapsible : true,
						items : [this.formPanel]
					}, {
						xtype : 'fieldset',
						title : '回复历史',
						collapsible : true,
						items : [this.gridPanel]
					}, {
						layout : 'form',
						labelAlign : 'right',
						border : false,
						items : [{
									xtype : 'combo',
									fieldLabel : '求索结果',
                                    id : 'result_huifu',
									mode : 'local',
	                                triggerAction : 'all',// 不然就只能选择一个
									store : [[1, '关闭求索'],[2, '取消求索']],
                                    editable : false
								}]
					}]
		});
	},
    
    save : function(){
        var result = Ext.getCmp('result_huifu');
        if(result.getValue() == ''){
            Ext.ux.Toast.msg('操作信息', '请选择结果');
            return;
        }
        var grid = Ext.getCmp('huifuList');
        var sm = grid.getSelectionModel().getSelections();
        var rows = [];
//        debugger
        for(var i = 0; i < sm.length; i++) {
            rows.push(sm[i].data.qiusuoHuifuId);
        }
        //验证
        if(result.getValue() == 1){//关闭,必须选择回复
            if(rows.length == 0){
                Ext.ux.Toast.msg('操作信息', '请至少选择一条回复!');
                return;
            }
        }
        var id_qiusuo = this.qiusuoId;
        if(result.getValue() == 2){//取消,不能选择回复
            if(rows.length != 0){
                Ext.ux.Toast.msg('操作信息', '取消话题不能选择回复!');
                return;
            }
        }
        Ext.Ajax.request({
            url : __ctxPath + '/know/closeUkQiusuo.do',
            params : {
                result : result.getValue(),
                ids : Ext.encode(rows),
                id : id_qiusuo
            },
            method : 'post',
            success : function(response) {
                Ext.getCmp('UkKnowCollectGrid_on').getStore().reload();
                Ext.getCmp('UkKnowCollectGrid2').getStore().reload();
                var result = Ext.util.JSON.decode(response.responseText);
                var tabs = Ext.getCmp('centerTabPanel');
                Ext.ux.Toast.msg('操作信息', '操作成功!');
                tabs.remove('UkKnowMineHuiFuViewWin');      
            }
        });
    },
    
    cancle : function(){
        var tabs = Ext.getCmp('centerTabPanel');
        tabs.remove('UkKnowMineHuiFuViewWin');
    }
});
