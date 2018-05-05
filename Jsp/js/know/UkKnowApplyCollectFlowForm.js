/**
 * @author zhangyl
 * @createtime 2012年5月17日 11:25:26
 * @class UkKnowApplyCollectFlowForm
 * @extends Ext.Window
 * @description 知识申请表单
 * @company 优创融联科技
 */
var applyId = '';
UkKnowApplyCollectFlowForm = Ext.extend(Ext.Panel, {
	// 构造函数

	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		applyId=_cfg.applyId;
		this.initUIComponents();
		UkKnowApplyCollectFlowForm.superclass.constructor.call(this, {
					id : 'UkKnowApplyCollectFlowFormWin',
					layout : 'form',
					items : [this.formPanel,this.panel],
					modal : true,
					autoWidth : true,
					anchor : '98%,98%',
					bodyStyle:'overflow-x:hidden;',
					maximizable : true,
					title : __ukKnowApplyDetailHeading,
					buttonAlign : 'center',
					tbar : this.initToolbar()
				});
	},// end of the constructor
	// 初始化组件
	initUIComponents : function() {
		// 增加审核记录
		this.panel = new Ext.Panel();
//		if (this.piId != null) {
			this.panel = new Ext.Panel({
						title : __allApprovalInfo,
						anchor : '98%,98%',
						autoScroll : true,
						autoLoad : {
							url : __ctxPath + '/flow/processRunDetail.do?piId='
									+ this.piId + "&runId=" + this.runId,
							nocache : true
						}
					});
//		}
					
		var markId = this.id;
		  this.gridPanel_know = new HT.EditorGridPanel({
            region : 'center',
            showPaging : false,
            // 单击一下触发修改
            clicksToEdit : 1,
            autoHeight : true,
            id : 'relative_know',
            fields : [{
                        name : 'knowId',
                        type : 'int'
                    }, 'tiTle', 'pastTime'],
            columns : [{
                        header : '标题',
                        dataIndex : 'tiTle'
                    }, {
                        header : '岗位知识',
                        dataIndex : 'tiTle'
                    }, {
                        header : '纬度',
                        dataIndex : 'tiTle'
                    }, {
                        header : '到期时间',
                        dataIndex : 'pastTime'
                    }]
                // end of columns
            });

        var panel_secondRow = new Ext.Panel({
            xtype : 'panel',
            layout : 'column',
            border : false,
            defaults : {
                border : false,
                anchor : '98%'
            },
            items : [{
                        columnWidth : .33,
                        layout : 'form',
                        border : false,
                        items : [{
                                    xtype : 'mtdiccombo',
                                    fieldLabel : '采集类型',
                                    name : 'ukKnowApply.applyType',
                                    allowBlank : false,
                                    editable : false,
                                    id : 'apply',
                                    lazyInit : false,
                                    forceSelection : false,
                                    itemKey : 'KNOW_CJLX',
                                    anchor : '100%',
                                    disable : true
                                }]
                    }, {
                        columnWidth : .33,
                        border : false,
                        layout : 'form',
                        items : [{
                                    fieldLabel : '要求完成时间', // '要求完成时间',
                                    name : 'ukKnowApply.requireTime',
                                    allowBlank : false,
                                    maxLength : 50,
                                    anchor : '100%',
                                    xtype : 'datefield',
                                    format : 'Y-m-d',
                                    value : new Date()
                                }]
                    }, {
                        columnWidth : .33,
                        border : false,
                        layout : 'form',
                        id : 'know_type',
                        items : [{
                                    xtype : 'mtdiccombo',
                                    allowBlank : false,
                                    editable : false,
                                    lazyInit : false,
                                    forceSelection : false,
                                    itemKey : 'KNOW_CATE',
                                    fieldLabel : '知识类型', // '要求完成时间',
                                    allowBlank : false,
                                    anchor : '100%',
                                    id : 'know_type_com'
                                }]
                    }]
        });

        this.formPanel = new Ext.Panel({
            layout : 'form',
            bodyStyle : 'padding:16px 4px 4px 20px',
            border : false,
            autoScroll : true,
            id : 'UkKnowApplyForm1ss' + markId,
            defaults : {
                anchor : '98%,98%'
            },
            defaultType : 'textfield',
            items : [{
                        fieldLabel : __ukKnowApplyApplyTitle,// '标题',
                        name : 'ukKnowApply.applyTitle',
                        maxLength : 255,
                        allowBlank : false,
                        xtype : 'textfield'
                    }, panel_secondRow, {
                        xtype : 'fieldset',
                        title : '申请的知识',
                        collapsed : false,
                        id : 'relative_know_fs',
                        collapsible : true,
                        autoHeight : true,
                        layout : 'fit',
                        defaults : {
                            anchor : '100%,100%'
                        },
                        items : [this.gridPanel_know]
                    }, {
                        fieldLabel : '申请说明', // '说明',
                        name : 'ukKnowApply.applyDescribe',
                        xtype : 'textarea',
                        allowBlank : false,
                        maxLength : 300
                    }, {
                        xtype : 'container',
                        layout : 'column',
                        id : 'ukKnowApply.KnowledgeExpand' + markId,
                        name : 'ukKnowApply.KnowledgeExpand',
                        border : false,
                        defaults : {
                            border : false,
                            anchor : '98%'
                        },
                        items : [{
                            columnWidth : .90,
                            layout : 'form',
                            border : false,
                            items : [{
                                        fieldLabel : '推荐资料',
                                        xtype : 'panel',
                                        id : 'ukKnowApply.relatedFile' + markId,
                                        frame : false,
                                        border : true,
                                        bodyStyle : 'padding:4px 4px 4px 4px',
                                        height : 80,
                                        autoScroll : true,
                                        html : ''
                                    }]
                        }, {
                            columnWidth : .10,
                            border : false,
                            items : [{
                                        xtype : 'button',
                                        text : '选择',
                                        border : false,
                                        iconCls : 'menu-file',
                                        handler : this.chooseFile
                                    }, {
                                        xtype : 'button',
                                        border : false,
                                        text : '清空',
                                        iconCls : 'reset',
                                        handler : this.clearChooseFile
                                    }, {
                                        xtype : 'hidden',
                                        id : 'relatedFile' + markId,
                                        name : 'relatedFileIds'
                                    }]
                        }]
                    }, {
                        fieldLabel : "备注",
                        name : 'ukKnowApply.applyComment',
                        xtype : 'textarea',
                        allowBlank : true,
                        maxLength : 300
                    }, {
                        xtype : 'hidden',
                        name : 'preHandler',
                        value : 'ukKnowApplyService.saveHeadId'
                    }, {
                        xtype : 'hidden',
                        name : 'afterHandler',
                        value : 'ukKnowApplyService.saveRunId'
                    }, {
                        xtype : 'hidden',
                        name : 'flowType',
                        value : 'UkKnowApplyFlowView'
                    }, {
                        name : 'pKId',
                        xtype : 'hidden',
                        value : this.applyId == null ? '' : this.applyId
                    }, {
                        name : 'params',
                        xtype : 'hidden'
                    }, {// 关联的知识
                        xtype : 'hidden',
                        name : 'relatedKnowIds',
                        id : 'relatedKnowIds'
                    }]
		});
		// 加载表单对应的数据
		if (this.id != null && this.id != 'undefined') {
			this.formPanel.loadData({
				url : __ctxPath + '/know/getUkKnowApply.do?applyId='
						+ this.id,
				root : 'data',
				preName : 'ukKnowApply',
				success : function(response, options) {
					var thisObj = Ext.util.JSON.decode(response.responseText).data;
					var applyType = thisObj.applyType;
                    Ext.getCmp('apply').setValue(applyType);
					//根据事项加载相关知识是否显示
                    var type_com =  Ext.getCmp('know_type');
                    var relative_know_fs = Ext.getCmp('relative_know_fs');
					if (applyType != 1) {
						 type_com.setVisible(false);
                         relative_know_fs.setVisible(true);
                         var type_combo =  Ext.getCmp('know_type_com');
                         type_combo.setValue(1);
					} else {
                        type_com.setVisible(true);
                        relative_know_fs.setVisible(false);
                        var type_combo =  Ext.getCmp('know_type_com');
						type_combo.setValue(thisObj.konwType);
					}
                    // 开始加载相关知识 知识ID
                    var ukRelativeKnows = thisObj.ukRelativeKnows;
                    if (ukRelativeKnows != undefined) {
                    	var knowIds = '';
                        for (var i = 0; i < ukRelativeKnows.length; i++) {
                            var data_good = {
                                knowId : ukRelativeKnows[i].knowId,
                                tiTle : ukRelativeKnows[i].tiTle,
                                pastTime : ukRelativeKnows[i].pastTime
                            }
                            knowIds+=ukRelativeKnows[i].knowId;
                            knowIds+=',';
                            var grid = Ext.getCmp('relative_know');
                            var store = grid.getStore();
                            var newRecord = new store.recordType(data_good);
                            grid.stopEditing();
                            store.add(newRecord);
                        }
                        Ext.getCmp('relatedKnowIds').setValue(knowIds);
                    }
                    
                var fileIds = Ext.getCmp('relatedFile' + markId);
                var filePanel = Ext.getCmp('ukKnowApply.relatedFile'
                        + markId);
                if(thisObj.ukRelativeFiles != undefined){    
                for (var i = 0; i < thisObj.ukRelativeFiles.length; i++) {
                    if (fileIds.getValue() != '') {
                        fileIds.setValue(fileIds.getValue() + ',');
                    }
                    fileIds.setValue(fileIds.getValue() + thisObj.ukRelativeFiles[i].fileId);
                    Ext.DomHelper
                            .append(
                                    filePanel.body,
                                    '<span><a href="#" onclick="FileAttachDetail.show('
                                            + thisObj.ukRelativeFiles[i].fileId
                                            + ')">'
                                            + thisObj.ukRelativeFiles[i].fileName
                                            + '</a>'
                                            + ' <img class="img-delete" src="'
                                            + __ctxPath
                                            + '/images/system/delete.gif"'
                                            + ' onclick="FileAttachDetail.removeResumeFile(this, '
                                            + thisObj.ukRelativeFiles[i].fileId + ', relatedFile'
                                            + markId + ')"/>'
                                            + '&nbsp;|&nbsp;</span>');
                }}
				}
			});
		}

	},// end of the initcomponents

	/**
	 * 取消
	 * 
	 * @param {}
	 *            window
	 */
	cancel : function() {
		var tabs = Ext.getCmp('centerTabPanel');
		tabs.remove('UkKnowApplyCollectFlowFormWin');
		this.destroy();
	},
	selectTemplate : function() {
//		var tabs = Ext.getCmp('centerTabPanel');
//		var edit = tabs.getItem('UkKnowCollectForm');
//		if (edit != null) {
//				tabs.remove('UkKnowCollectForm');
//				edit.destroy();
//			}
//		edit = new UkKnowCollectForm({
//				applyId : applyId,
//				knowTypeId : ''
//		});
//				tabs.add(edit);
//				tabs.activate(edit);
		
		new KnowTmpForm({
		applyId : applyId
		}).show(
		);
	},
	/**
	 * 显示流程图
	 */
	showFlowImage : function() {
		var window=new Ext.Window({
			autoScroll:true,
				iconCls:'btn-flow-chart',
				bodyStyle:'background-color:white',
				maximizable : true,
				title:'流程示意图',
				width:600,
				height:500,
				modal:true,
				layout:'fit',
				html:'<img src="'+__ctxPath+ '/jbpmImage?taskId='+this.taskId+ '&rand=' + Math.random()+ '"/>'
		});
		window.show();
	}

});

/**
 * 顶部保存 取消按钮()
 * 
 * @return {}
 */

UkKnowApplyCollectFlowForm.prototype.initToolbar = function() {
	var toolbar = new Ext.Toolbar({
				width : '100%',
				height : 30,
				items : ['->', {
							text : __cancel,
							iconCls : 'btn-cancel',
							scope : this,
							handler : this.cancel
						},'->', {
							text : '采集知识',
							iconCls : 'btn-fabu',
							scope : this,
							handler : this.selectTemplate
						}]
			});
	return toolbar;
}