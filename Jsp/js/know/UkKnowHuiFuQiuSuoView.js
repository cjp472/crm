UkKnowHuiFuQiuSuoView = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		UkKnowHuiFuQiuSuoView.superclass.constructor.call(this, {
			id : 'UkKnowHuiFuQiuSuoViewWin',
			title : '回复求索',
			region : 'center',
			layout : 'border',
			items : [this.contentPanel],
			buttonAlign : 'center',
			buttons : [{
				text : '提交',
                handler : this.save
			}, {
				text : '取消',
                handler : this.cancel
			}]
		});
	},// end of constructor
	// 初始化组件
	initUIComponents : function() {
		this.formPanel = new Ext.Panel({
			layout : 'form',
			border : false,
            autoHeight:true,
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
                xtype : 'hidden',
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
			showSm : false,
			exportable : false,
			url : __ctxPath + "/know/listOneUkQiusuoHuifu.do?id="+this.qiusuoId,
			fields : [{
				name : 'qiusuoHuifuId',
				type : 'int'
			}, 'content', 'reply', 'replytime',	'ukQiusuo', 
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

		var ulBbsHuatifileIds = new Ext.form.Hidden({
			id : 'ulBbsHuatifileIds',
			xtype : 'hidden',
			name : 'fileIds'
		});
		var ulBbsHuatiPanel = new Ext.Panel({
			fieldLabel : '附件',
			xtype : 'panel',
			name : 'ulBbsHuatiPanel',
			frame : false,
			border : true,
			bodyStyle : 'padding:4px 4px 4px 4px',
			height : 80,
			autoScroll : true,
			html : ''
		});
        //知识的隐藏域和panel
        var knowIds = new Ext.form.Hidden({
            id : 'knowIds',
            xtype : 'hidden',
            name : 'knowIds'
        });
        var knowPanel = new Ext.Panel({
            fieldLabel : '相关知识',
            xtype : 'panel',
            frame : false,
            border : true,
            bodyStyle : 'padding:4px 4px 4px 4px',
            height : 80,
            autoScroll : true,
            html : ''
        });
        var qiusuoIds = new Ext.form.Hidden({
            value : this.qiusuoId,
            xtype : 'hidden',
            name : 'ukQiusuoHuifu.ukQiusuo.qiusuoId'
        });
        var scope = this;
        
		this.formPanelhuifu = new Ext.FormPanel({
			layout : 'form',
			border : false,
			autoScroll : true,
            id : 'huifuPanel',
			labelAlign : 'right',
			defaults : {
				anchor : '96%,96%'
			},
			items : [qiusuoIds, {
				fieldLabel : '回复内容',
				xtype : 'textarea',
				height : 50,
                name : 'ukQiusuoHuifu.content',
                allowBlank : false
			}, {
				xtype : 'container',
				layout : 'column',
				border : false,
				anchor : '100%',
				defaults : {
					border : false,
					anchor : '100%'
				},
				items : [{
					columnWidth : .9,
					layout : 'form',
					border : false,
					items : [ulBbsHuatiPanel]
				}, {
					columnWidth : .1,
					border : false,
					items : [{
						xtype : 'button',
						text : '添加附件',
						border : false,
						iconCls : 'menu-attachment',
						handler : function(){
                            scope.chooseFile(ulBbsHuatiPanel, ulBbsHuatifileIds);
                        }
					}, {
						xtype : 'button',
						border : false,
						text : '清除附件',
						iconCls : 'reset',
						handler : function() {
							scope.clearFile(ulBbsHuatiPanel, ulBbsHuatifileIds);
						}
					}, ulBbsHuatifileIds]
				}]
			},{
                xtype : 'container',
                layout : 'column',
                border : false,
                anchor : '100%',
                defaults : {
                    border : false,
                    anchor : '100%'
                },
                items : [{
                    columnWidth : .9,
                    layout : 'form',
                    border : false,
                    items : [knowPanel]
                }, {
                    columnWidth : .1,
                    border : false,
                    items : [{
                        xtype : 'button',
                        text : '添加知识',
                        border : false,
                        iconCls : 'menu-attachment',
                        handler : function(){
                            scope.chooseKnow(knowPanel, knowIds);
                        }
                    }, {
                        xtype : 'button',
                        border : false,
                        text : '清除知识',
                        iconCls : 'reset',
                        handler : function() {
                            scope.clearKnow(knowPanel, knowIds);
                        }
                    }, knowIds]
                }]
            }]
		});
		this.contentPanel = new Ext.Panel({
			border : false,
            autoScroll:true,
            height:700,
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
				xtype : 'fieldset',
				title : '回复',
				collapsible : true,
				items : [this.formPanelhuifu]
			}]
		});
	},
    
    chooseFile : function(filePanel, fileIds) {
	    var dialog = App.createUploadDialog({
		    file_cat : 'outb/ObProject',
		    callback : function(data) {
		        for(var i = 0; i < data.length; i++) {
		            if(fileIds.getValue() != '') {
		                fileIds.setValue(fileIds.getValue() + ',');
		            }
		            fileIds.setValue(fileIds.getValue() + data[i].fileId);
		            Ext.DomHelper.append(filePanel.body,
		                '<span><a href="#" onclick="FileAttachDetail.show('
		                        + data[i].fileId
		                        + ')">'
		                        + data[i].fileName
		                        + '</a> <img class="img-delete" src="'
		                        + __ctxPath
		                        + '/images/system/delete.gif" onclick="ObProjectForm.removeResumeFile(this,'
		                        + data[i].fileId
		                        + ')"/>&nbsp;|&nbsp;</span>');
		        }
		    }
		});
	   dialog.show(this);
	},
    
    clearFile : function(filePanel, fileIds){
        filePanel.body.update('');
        fileIds.setValue('');
    },
    
    chooseKnow : function(filePanel, fileIds){
		knowledgeSelector.getView().show();
	
		Ext.getCmp('knowledgeSelector_btn_ok').on('click', function() {
	        filePanel.body.update('');
	        var store = Ext.getCmp('knowledgeSelectorSelectTree').getStore();// 获得选中数据
	        store.each(
                function(record) {
                    fileIds.setValue(fileIds.getValue() + record.get('knowId') + ',');
                    Ext.DomHelper.append(filePanel.body,
                        '<span><a href="#" onclick="' +
                        ' new UkSysKnowShow_win({'+
                            'knowId : ' + record.get('knowId') +
                        '}).show();'+
                        '" >' + record.get('tiTle') + '</a >&nbsp;|&nbsp;</span>');
                });
	        Ext.getCmp('knowledgeSelectorWindow').close();
        });
    },
    
    clearKnow : function(filePanel, fileIds){
        filePanel.body.update('');
        fileIds.setValue('');
        filePanel.body.update('');
    },
    
    save : function() {
        // 获得gridPanel_contact的store
        var formPanel = Ext.getCmp('huifuPanel');
        if (formPanel.getForm().isValid()) {//会验证表单
		    $postForm({
                formPanel : formPanel,
                scope : this,
                url : __ctxPath + '/know/saveUkQiusuoHuifu.do',
                callback : function(fp, action) {//刷新回复历史
                    var huifuList = Ext.getCmp('huifuList');
                    huifuList.getStore().reload();
                }
            });
        }
    },
    
    cancel : function(){
        var tabs = Ext.getCmp('centerTabPanel');
        tabs.remove('UkKnowHuiFuQiuSuoViewWin');
    }
});