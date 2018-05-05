/**
 * @author YungLocke
 * @class ProInstanceView
 * @extends Ext.Panel
 */
ProInstanceView = Ext.extend(Ext.Panel, {
	searchPanel : null,
	gridPanel : null,
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		this.initUI();
		ProInstanceView.superclass.constructor.call(this, {
					layout : 'border',
					iconCls : 'menu-instance',
					title : this.flowName + '--实例管理',
//					items : [this.formPanel, this.gridPanel]
					items : [this.gridPanel]
				});
	},
	initUI : function() {
		// this.picturePanel = new Ext.Panel({
		// layout : 'fit',
		// border : false,
		// region : 'east',
		// width:350,
		// title:'流程图',
		// labelAlign : 'right',
		// defaults : {
		// anchor : '96%'
		// },
		// html:'<img src="'+__ctxPath+ '/jbpmImage?taskId='+1260074+ '&rand=' +
		// Math.random()+ '"/>'
		//					
		// });
		this.formPanel = new Ext.FormPanel({
			layout : 'form',
			border : false,
			region : 'north',
			labelWidth : 120,
			height : 100,
			bodyStyle : 'padding:10px;',
			labelAlign : 'right',
			border : false,
			autoScroll : true,
			// id : 'ObCallbatchImpWashForm',
			defaults : {
				anchor : '96%,96%'
			},
			defaultType : 'textfield',
			items : [{
				layout : 'column',
				border : false,
				anchor : '96%',
				xtype : 'panel',
				items : [{
							layout : 'form',
							columnWidth : .33,
							xtype : 'panel',
							border : false,
							items : [{
										fieldLabel : '流程实例编号 ',
										anchor : '100%',
										readOnly : true,
										xtype : 'textfield'
									}, {
										fieldLabel : '启动时间 ',
										anchor : '100%',
										readOnly : true,
										xtype : 'textfield'
									}, {
										fieldLabel : '状态 ',
										anchor : '100%',
										readOnly : true,
										xtype : 'textfield'
									}]

						}, {
							layout : 'form',
							columnWidth : .33,
							xtype : 'panel',
							border : false,
							items : [{
								layout : 'column',
								border : false,
								items : [{
											xtype : 'panel',
											layout : 'form',
											columnWidth : .9,
											border : false,
											items : [{
														fieldLabel : '流程名',
														xtype : 'textfield',
														anchor : '100%'
													}]
										}, {
											xtype : 'button',
											columnWidth : .1,
											iconCls : 'btn-search',
											handler : function() {
												var window = new Ext.Window({
													autoScroll : true,
													iconCls : 'btn-flow-chart',
													bodyStyle : 'background-color:white',
													maximizable : true,
													title : '流程示意图',
													width : 600,
													height : 500,
													modal : true,
													layout : 'fit',
													html : '<img src="'
															+ __ctxPath
															+ '/jbpmImage?taskId='
															+ 1260074
															+ '&rand='
															+ Math.random()
															+ '"/>'
												});
												window.show();
											}
										}]
							}, {
								fieldLabel : '启动人员 ',
								anchor : '100%',
								readOnly : true,
								xtype : 'textfield'
							}]

						}, {
							layout : 'form',
							columnWidth : .33,
							xtype : 'panel',
							border : false,
							items : [{
										fieldLabel : '优先级 ',
										anchor : '100%',
										readOnly : true,
										xtype : 'textfield'
									}, {
										fieldLabel : '最后修改时间 ',
										anchor : '100%',
										readOnly : true,
										xtype : 'textfield'
									}]

						}]
			}]
		})

		// this.topPanel = new Ext.Panel({
		// layout : 'border',
		// border : false,
		// region : 'north',
		// labelAlign : 'right',
		// bodyStyle : 'padding:10px;',
		// labelWidth : 120,
		// defaults : {
		// anchor : '96%,96%'
		// },
		// height : 140,
		// items : [this.formPanel]
		//
		// });
		// 初始化搜索条件Panel
		this.searchPanel = new HT.SearchPanel({
					layout : 'form',
					region : 'north',
					colNums : 3,
					items : [{
								fieldLabel : '标题',
								name : 'Q_subject_S_LK',
								flex : 1,
								xtype : 'textfield'
							}, {
								xtype : 'hidden',
								name : 'Q_proDefinition.defId_L_EQ',
								value : this.defId
							}, {
								xtype : 'hidden',
								name : 'Q_runStatus_SN_EQ',
								value : 1
							}],
					buttons : [{
								text : '查询',
								scope : this,
								iconCls : 'btn-search',
								handler : this.search
							}, {
								text : '重置',
								scope : this,
								iconCls : 'btn-reset',
								handler : this.reset
							}]
				});// end of searchPanel

		this.topbar = new Ext.Toolbar({
					items : ['->',
//							 {
//								iconCls : 'control_pause',
//								text : '暂停',
//								xtype : 'button',
//								scope : this,
//								handler : this.refreshRs
//							}, {
//								iconCls : 'btn-confApply-no',
//								text : '恢复',
//								xtype : 'button',
//								scope : this,
//								handler : this.refreshRs
//							}, {
//								iconCls : 'btn-system-config',
//								text : '设置优先级',
//								xtype : 'button',
//								scope : this,
//								handler : this.refreshRs
//							}, 
								{
								iconCls : 'control_stop',
								text : '强制结束',
								xtype : 'button',
								scope : this,
								handler : this.closeIns
							}
//							 ,{
//								iconCls : 'btn-mail_back',
//								text : '重启',
//								xtype : 'button',
//								scope : this,
//								handler : this.detailRsM
//							}
					// {
					// iconCls : 'btn-close',
					// text : '结束实例',
					// xtype : 'button',
					// scope : this,
					// handler : this.closeIns
					//
					// }
					]
				});
		this.gridPanel = new HT.GridPanel({
			region : 'center',
			tbar : this.topbar,
			// 使用RowActions
			rowActions : false,
			url : __ctxPath + '/flow/instanceProcessRun.do',
			baseParams : {
				'Q_proDefinition.defId_L_EQ' : this.defId,
				'Q_runStatus_SN_EQ' : 1
			},// 正在运行的实例
			fields : [{
						name : 'runId',
						type : 'int'
					}, 'subject', 'createtime', 'proDefinition', 'piId', 'runStatus','customerTime','needsTime','finishTime'],
			columns : [{
						header : '任务名',
						dataIndex : 'subject'
					}, {
						header : '执行人',
						hidden : true,
						dataIndex : 'defId'
					}, {
						header : '开始时间',
						dataIndex : 'createtime'
					}, {
						header : '要求完成时间',
						dataIndex : 'needsTime',
						width : 150
					}, {
						header : '结束时间',
						dataIndex : 'finishTime'
					}, {
						header : '耗时(秒)',
						hidden : true,
						dataIndex : 'piId'
					}, {
			          header:'状态',
				      dataIndex:'runStatus',
				      width:60,
				      renderer : function(value) {
								return PROCESSRUN_STATUS.get(value);
							}
			        }, {
						header : '处理结果',
						hidden :true,
						dataIndex : 'subject'
					},{
					header : '管理',
					dataIndex : 'runId',
					width : 50,
					renderer : function(value, metadata, record, rowIndex,colIndex) {
						var runId = record.data.runId;
						var defId=record.data.proDefinition.defId;
						var piId=record.data.piId;
						var subject=record.data.subject;
						var str= '&nbsp;<button type="button" title="审批明细" value=" " class="btn-flowView" onclick="ProInstanceView.detail('+
							runId+','+defId+',\''+ piId + '\',\''+ subject + '\')"></button>';
							
						return str;
					}
				}
			// ,{
			// header:'标题',
			// dataIndex:'subject'
			// },{
			// header:'创建时间',
			// hidden:true,
			// dataIndex:'createtime'
			//					
			// }
			// new Ext.ux.grid.RowActions({
			// header : '管理',
			// width : 32,
			// fixed:true,
			// resizable:false,
			// actions : [{
			// iconCls : 'btn-detail',
			// qtip : '查看',
			// style : 'margin:0 3px 0 3px'
			// }],
			// listeners : {
			// scope : this,
			// 'action' : this.onRowAction
			// }
			// })
			]
				// end of columns
			});

	},
	// 重置查询表单
	reset : function() {
		this.searchPanel.getForm().reset();
	},
	// 按条件搜索
	search : function() {
		$search({
					searchPanel : this.searchPanel,
					gridPanel : this.gridPanel
				});
	},
	// 刷新记录
	refreshRs : function() {
		this.gridPanel.getStore().reload();
	},
	detailRsM : function() {
		var selRs = this.gridPanel.getSelectionModel().getSelections();
		if (selRs.length == 0) {
			Ext.ux.Toast.msg('操作信息', '请选择记录！');
			return;
		}
		if (selRs.length > 1) {
			Ext.ux.Toast.msg('操作信息', '只能选择一条记录！');
			return;
		}
		this.detailRs(selRs[0]);
	},
	closeIns : function() {
		var gridPanel = this.gridPanel;
		var ids = $getGdSelectedIds(gridPanel, 'runId');
		if (ids.length == 0) {
			Ext.ux.Toast.msg('操作信息', '请选择记录！');
			return;
		}
		var strIds = '';
		for (var i = 0; i < ids.length; i++) {
			if (strIds != '') {
				strIds += ',';
			}
			strIds += ids[i];
		}
		Ext.Msg.confirm('信息确认', '您确认要结束所选实例吗？', function(btn) {
					if (btn == 'yes') {
						Ext.Ajax.request({
									url : __ctxPath + '/flow/endProcessRun.do',
									params : {
										runIds : strIds
									},
									method : 'post',
									success : function(resp, op) {
										var res = Ext.util.JSON
												.decode(resp.responseText);
										if (res.success) {
											Ext.ux.Toast.msg('信息提示', '成功结束实例！');
											gridPanel.getStore().reload();
										} else {
											Ext.ux.Toast.msg('信息提示',
													'出错，请联系管理员！');
											gridPanel.getStore().reload();
										}
									},
									failure : function() {
										Ext.ux.Toast.msg('信息提示', '出错，请联系管理员！');
										gridPanel.getStore().reload();
									}

								});
					}
				});
	},
	detailRs : function(record) {
		new ProInstanceDetail({
					runId : record.data.runId,
					subject : record.data.subject
				}).show();
	},
	// 行的Action
	onRowAction : function(grid, record, action, row, col) {
		switch (action) {
			case 'btn-detail' :
				this.detailRs.call(this, record);
				break;
			default :
				break;
		}
	}

});

/**
 * 显示明细
 * @param {} runId
 * @param {} name
 */
ProInstanceView.detail=function(runId,defId,piId,name){
	var contentPanel=App.getContentPanel();
	var detailView=contentPanel.getItem('ProcessRunDetail'+runId);
	if(detailView==null){
		detailView=new ProcessRunDetail(runId,defId,piId,name);
		contentPanel.add(detailView);
	}
	contentPanel.activate(detailView);
};