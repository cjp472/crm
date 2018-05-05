/**
 * @author YungLocke
 * @class FlowEntityView
 * @extends Ext.Panel
 */
ProInstanceMgr = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				ProInstanceMgr.superclass.constructor.call(this, {
							id : 'ProInstanceMgr',
							iconCls : 'menu-instance',
							title : '流程实例管理',
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
				// 初始化搜索条件Panel
				this.searchPanel = new HT.SearchPanel({
							layout : 'hbox',
							region : 'north',
							// colNums : 3,
							height : 35,
							items : [

									// , {
									// text : "状态"
									// }, {
									// name : 'Q_ProStatus_S_LK',
									// xtype : 'combo',
									// store:[]
									// }
//									{
//								text : "流程实例编号"// __ukKnowApproveApproveTitle
//							}, {
//								name : 'Q_runId_L_EQ',
//								xtype : 'textfield'
//							},
							{
								text : "流程名"// __ukKnowApproveApproveTitle
							}, {
								name : 'Q_proDefinition.name_S_LK',
								xtype : 'textfield'
							},{
								text : "状态"// __ukKnowApproveApproveTitle
							}, {
										hiddenName : 'Q_runStatus_SN_EQ',
										xtype : 'mtdiccombo',
										editable : false,
										lazyInit : false,
										forceSelection : false,
										itemKey : 'PROCESSRUN_STATUS'
							}, {
								xtype : 'button',
								text : __search,
								iconCls : 'search',
								scope : this,
								handler : this.search
							}, {
								xtype : 'button',
								text : __reset,
								scope : this,
								iconCls : 'btn-reset',
								handler : this.reset
							}, {
								xtype : 'button',
								text : __advancedSearch,
								iconCls : 'search',
								scope : this,
								handler : function() {
									new UkKnowApproveAdvancedSearchWin().show()
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

				this.topbar = new Ext.Toolbar({
							items : [
							'->',{
								iconCls : 'control_stop',
								text : '强制结束',
								xtype : 'button',
								scope : this,
								handler : this.closeIns
							}
							
							// '->', {
							// iconCls : 'btn-refresh',
							// text : '刷新',
							// xtype : 'button',
							// scope : this,
							// handler : this.refreshRs
							// }, {
							// iconCls : 'control_pause',
							// text : '挂起',
							// xtype : 'button',
							// scope : this,
							// handler : this.refreshRs
							// }, {
							// iconCls : 'btn-confApply-no',
							// text : '恢复',
							// xtype : 'button',
							// scope : this,
							// handler : this.refreshRs
							// }, {
							// iconCls : 'control_stop',
							// text : '终止',
							// xtype : 'button',
							// scope : this,
							// handler : this.refreshRs
							// }, {
							// iconCls : 'btn-mail_back',
							// text : '重新启动',
							// xtype : 'button',
							// scope : this,
							// handler : this.refreshRs
							// }
							// {
							// iconCls : 'btn-detail',
							// text : '查看',
							// xtype : 'button',
							// scope : this,
							// handler : this.detailRsM
							// }
							]
						});

				this.gridPanel = new HT.GridPanel({
					region : 'center',
					tbar : this.topbar,
					// 使用RowActions
					rowActions : true,
					// url : __ctxPath + "/flow/inListProDefinition.do",
					url : __ctxPath + '/flow/instanceProcessRun.do',
//					baseParams : {
//						'Q_runStatus_SN_EQ' : 1
//					},// 正在运行的实例
					fields : [{
						name : 'runId',
						type : 'int'
					}, 'subject', 'createtime', 'proDefinition', 'piId', 'runStatus','customerTime','needsTime','finishTime','appUser','lastHandleTime'],
					columns : [{
								header : '流程实例编号',
								dataIndex : 'runId'
							}, {
								header : '流程名',
								dataIndex : 'proDefinition',
								 renderer : function(value) {
								 if(value!=null){
								 	return value.name;
								 }
								 }
							}, {
								header : '启动时间',
								dataIndex : 'createtime'
							}, {
								header : '启动人员',
								dataIndex : 'appUser',
								 renderer : function(value) {
								 if(value!=null){
								 	return value.fullname;
								  }
								 }
							}, {
								header : '最后修改时间',
								dataIndex : 'lastHandleTime'
							}, {
								header : '状态',
								dataIndex : 'runStatus',
				      			renderer : function(value) {
								return PROCESSRUN_STATUS.get(value);
							}
							}
//							, {
//								header : '分类名称',
//								hidden : true,
//								dataIndex : 'typeName',
//								renderer : function(value) {
//									if (value != null && value != '')
//										return value;
//									else
//										return '<font color=\'red\'>未定义</font>';
//								}
//							}, {
//								header : '正在运行的实例数目',
//								dataIndex : 'subTotal',
//								hidden : true,
//								renderer : function(value) {
//									return '<font color="red">' + value
//											+ '</font>';
//								}
//							}
							, new Ext.ux.grid.RowActions({
										header : '管理',
										width : 32,
										fixed : true,
										resizable : false,
										actions : [{
													iconCls : 'btn-flowView',
													qtip : '流程详情',
													style : 'margin:0 3px 0 3px'
												}],
										listeners : {
											scope : this,
											'action' : this.onRowAction
										}
									})]
						// end of columns
				});

//				this.gridPanel.addListener('rowdblclick', this.rowClick);

			},// end of the initComponents()
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
			// GridPanel行点击处理事件
			rowClick : function(grid, rowindex, e) {
				grid.getSelectionModel().each(function(record) {
					var defId = record.data.defId;
					var name = record.data.name;
					var contentPanel = App.getContentPanel();
					var startForm = contentPanel.getItem('ProcessRunList'
							+ defId);

					if (startForm == null) {
						startForm = new ProInstanceView({
									id : 'ProcessRunList' + defId,
									defId : defId,
									flowName : name
								});
						contentPanel.add(startForm);
					}
					contentPanel.activate(startForm);
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
			detailRs : function(record) {
//				var defId = record.data.defId;
//				var name = record.data.name;
//				var contentPanel = App.getContentPanel();
//				var startForm = contentPanel.getItem('ProcessRunList' + defId);
//
//				if (startForm == null) {
//					startForm = new ProInstanceView({
//								id : 'ProcessRunList' + defId,
//								defId : defId,
//								flowName : name
//							});
//					contentPanel.add(startForm);
//				}
//				contentPanel.activate(startForm);
				var runId = record.data.runId;
				var defId=record.data.proDefinition.defId;
				var piId=record.data.piId;
				var subject=record.data.subject;
				
				var contentPanel=App.getContentPanel();
				var detailView=contentPanel.getItem('ProcessRunDetail'+runId);
				if(detailView==null){
					detailView=new ProcessRunDetail(runId,defId,piId,name);
					contentPanel.add(detailView);
				}
				contentPanel.activate(detailView);
			},
			// 行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
//					case 'btn-detail' :
//						this.detailRs.call(this, record);
//						break;
					case 'btn-flowView' :
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
ProInstanceMgr.detail=function(runId,defId,piId,name){
	var contentPanel=App.getContentPanel();
	var detailView=contentPanel.getItem('ProcessRunDetail'+runId);
	if(detailView==null){
		detailView=new ProcessRunDetail(runId,defId,piId,name);
		contentPanel.add(detailView);
	}
	contentPanel.activate(detailView);
};