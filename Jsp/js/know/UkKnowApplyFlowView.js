/**
 * @author:zhangyl
 * @class UkKnowApplyFlowView
 * @extends Ext.Panel
 * @description 知识申请管理
 * @company 优创融联科技
 * @createtime:
 */
UkKnowApplyFlowView = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		UkKnowApplyFlowView.superclass.constructor.call(this, {
					id : this.id ? this.id : 'UkKnowApplyView',
					title : this.title ? this.title : __menuViewUkKnowApplys,
					region : 'center',
					layout : 'border',
					items : [this.searchPanel, this.gridPanel]
				});
	},// end of constructor
	// 初始化组件
	initUIComponents : function() {
		var fieldnameComboData = [
				['applyUserid', '申请人', new Ext.form.NumberField({
									name : 'applyUserid',
									allowBlank : true
								})],
				['applyTime', '申请时间', new Ext.form.DateField({
									hiddenName : 'applyTime',
									format : 'Y-m-d'
								})],
				['applyTitle', '标题', new Ext.form.TextField({
									name : 'applyTitle',
									allowBlank : true
								})],
				['applyDescribe', '说明', new Ext.form.TextField({
									name : 'applyDescribe',
									allowBlank : true
								})],
				['applyContent', '内容', new Ext.form.TextField({
									name : 'applyContent',
									allowBlank : true
								})],
				['applyComment', '备注', new Ext.form.TextField({
									name : 'applyComment',
									allowBlank : true
								})],
				['requireTime', '要求时间', new Ext.form.DateField({
									hiddenName : 'requireTime',
									format : 'Y-m-d'
								})],
				['holdTime', '暂存时间', new Ext.form.DateField({
									hiddenName : 'holdTime',
									format : 'Y-m-d'
								})],
				['busiType', '业务类别&BUSI_TYPE', new Ext.form.NumberField({
									name : 'busiType',
									allowBlank : true
								})],
				['applyType', '事项', new Ext.form.NumberField({
									name : 'applyType',
									allowBlank : true
								})],
				['applyStatus', '状态&KNOW_STATUS', new Ext.form.NumberField({
									name : 'applyStatus',
									allowBlank : true
								})],
				['runid', 'RUNID', new Ext.form.NumberField({
									name : 'runid',
									allowBlank : true
								})],
				['createBy', '创建人', new Ext.form.NumberField({
									name : 'createBy',
									allowBlank : true
								})],
				['updateBy', '修改人', new Ext.form.NumberField({
									name : 'updateBy',
									allowBlank : true
								})],
				['createDate', '创建时间', new Ext.form.DateField({
									hiddenName : 'createDate',
									format : 'Y-m-d'
								})],
				['updateDate', '修改时间', new Ext.form.DateField({
									hiddenName : 'updateDate',
									format : 'Y-m-d'
								})]]
		var UkKnowApplyAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : '[UkKnowApply]高级查询',
					fieldData : fieldnameComboData
				});
		// 初始化搜索条件Panel
		this.searchPanel = new Ext.FormPanel({
					layout : 'hbox',
					region : 'north',
					id : 'UkKnowApplySearchFlowPanel',
					height : 35,
					items : [{
								text : __ukKnowApplyApplyTitle
							}, {
								name : 'Q_applyTitle_S_LK',
								xtype : 'textfield'
							},
							// {
							// text : __ukKnowApplyApplyContent
							// }, {
							// name : 'Q_applyContent_S_LK',
							// xtype : 'textfield'
							// },
							{
								text : '状态'
							}, {
								name : 'Q_approvalStatus_S_LK',
								xtype : 'textfield'
							}, {
								text : __ukKnowApplyApplyUserid
							}, {
								name : 'Q_applyUser.fullname_S_LK',
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
								handler : this.reset
							}, {
								xtype : 'button',
								text : __advancedSearch,
								iconCls : 'search',
								scope : this,
								handler : function() {
									new UkKnowApplyAdvancedSearchWin().show()
								}
							}, {
								fieldLabel : 'flowNode',
								id : 'flowNode',
								value : this.title,
								xtype : 'hidden'
							}, {
								fieldLabel : 'flowType',
								id : 'flowType',
								value : 'UkKnowApplyFlowView',
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
				});// end of searchPanel

		var node = this.title; // 增加node
		this.gridPanel = new HT.GridPanel({
			region : 'center',
			// 使用RowActions
			rowActions : true,
			printable : false,
			exportable : false,
			id : 'UkKnowApplyFlowGrid',
			url : __ctxPath + "/know/listFlowUkKnowApply.do",
			baseParams : {
				flowNode : this.title,
				flowType : 'UkKnowApplyFlowView'// 流程类型key
			},
			fields : [{
						name : 'applyId',
						type : 'int'
					}, 'applyUserid', 'applyTime', 'applyTitle',
					'applyDescribe', 'applyContent', 'applyComment',
					'requireTime', 'holdTime', 'busiType', 'applyType',
					'applyStatus', 'runid', 'createBy', 'updateBy',
					'createDate', 'updateDate', 'approvalStatus', 'tasks',
					'runid', 'nodeName', 'piId','applyUser'],
			columns : [{
						header : __ukKnowApplyApplyId,
						dataIndex : 'applyId',
						hidden : true
					}, {
						header : __ukKnowApplyApplyTitle,// 标题
						isExp : false,
						width : 140,
						dataIndex : 'applyTitle'
					}, {
						header : __ukKnowApplyBusiType,// 业务类别
						isExp : false,
						dataIndex : 'busiType',
						renderer : function(value) {
							return BUSI_TYPE.get(value);
						}
					}, {
						header : __ukKnowApplyApplyType, // 事项
						isExp : false,
						dataIndex : 'applyType',
						renderer : function(value) {
							if(value == 1){
								return '新增';
							}else if(value == 2){
								return '合并';
							}else if(value == 3){
								return '拆分';
							}else if(value == 4){
								return '注销';
							}else{
								return '';
							}
						}
					}, {
						header : __ukKnowApplyApplyDescribe,// 说明
						isExp : false,
						dataIndex : 'applyDescribe'
					},
					// {
					// header : __ukKnowApplyApplyContent,//内容
					// isExp : false,
					// dataIndex : 'applyContent'
					// }, {
					// header : __ukKnowApplyApplyComment,//备注
					// isExp : false,
					// dataIndex : 'applyComment'
					// },
					{
						header : __ukKnowApplyApplyUserid,// 申请人
						isExp : false,
						dataIndex : 'applyUser',
						renderer : function(value) {
							if (value == null) {
								return '';
							} else {
								return value.fullname;
							}
						}
					}, {
						header : __ukKnowApplyApplyTime,// 申请时间
						isExp : false,

						dataIndex : 'applyTime'
					}, {
						header : __ukKnowApplyRequireTime,// 要求完成时间
						isExp : false,
						dataIndex : 'requireTime',
						renderer : function(value) {
							if (value != null) {
								return value.substring(0, 10);
							}
						}
					}, {
						header : "完成时间",// 完成时间
						isExp : false,
						dataIndex : 'requireTime',
						renderer : function(value) {
							if (value != null) {
								return value.substring(0, 10);
							}
						}
					}, {
						header : "状态",// __allApprovalStatus
						dataIndex : 'approvalStatus'

					}, {
						header : '当前任务',// __allApprovalInfo 流程审批信息
						dataIndex : 'tasks',
						width : 200,
						renderer : function(tasks, metadata, record, rowIndex,
								colIndex) {
							var reVal = '';
							if (tasks.length > 0) {
								for (var i = 0; i < tasks.length; i++) {
									reVal += tasks[i].taskName;
									if (tasks[i].userId) {
										reVal += '(';
//										if (curUserInfo.userId == tasks[i].userId) {
//											if (tasks[i].taskName == node) {
//												reVal += '<a href="#"  onclick="App.MyDesktopClickTopTab(\'ProcessNextForm\',{taskId:'
//														+ tasks[i].taskId
//														+ ',activityName:\''
//														+ tasks[i].taskName
//														+ '\',gridPanel:\''
//														+ 'UkKnowApplyFlowGrid'
//														+ '\'})">';
//											}
//
//										}
										reVal += tasks[i].fullname
										if (curUserInfo.userId == tasks[i].userId) {
											reVal += "</a>";
										}
										reVal += ')&nbsp;&nbsp;';
									}
								}
							}
							return reVal;
						}
					}
					// ,
					// {
					// header : 'RUNID',
					// isExp : false,
					// dataIndex : 'runid'
					// }
					, new Ext.ux.grid.RowActions({
						header : __action,
						width : 100,
						actions : [{
							iconCls : 'btn-ok',
							qtip : '审批',
							style : 'margin:0 3px 0 3px',
							fn : function(record) {
								var tasks = record.get('tasks');
								if (tasks.length > 0) {
									for (var i = 0; i < tasks.length; i++) {
										if (tasks[i].userId) {
											if (curUserInfo.userId == tasks[i].userId) {
												if (tasks[i].taskName == node) {
													return true;
												}
											}
										}
									}
								}
							}
						}, {
							iconCls : 'btn-operation',
							qtip : '跟踪',
							style : 'margin:0 3px 0 3px'
						}, {
							iconCls : 'btn-fabu',
							qtip : '采集',
							style : 'margin:0 3px 0 3px',
							fn : function(record) {
								var node = Ext.getCmp('flowNode').getValue();
								if(node == '知识采集'){
									return true;
								}
							}
						}],
						listeners : {
							scope : this,
							'action' : this.onRowAction
						}
					})]
				// end of columns
		});

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

	// 审核跟踪
	trackRs : function(record) {
		var tabs = Ext.getCmp('centerTabPanel');
		var edit = tabs.getItem('UkKnowApply');

		if (edit != null) {
			tabs.remove('UkKnowApply');
		}
		edit = new UkKnowApplyFlowForm({
					applyId : record.data.applyId,
					runId : record.data.runid,
					piId : record.data.piId
				});
		tabs.add(edit);
		tabs.activate(edit);
	},
		//采集
	knowCollect : function(record) {
		var tabs = Ext.getCmp('centerTabPanel');
		var edit = tabs.getItem('UkKnowApply');

		if (edit != null) {
			tabs.remove('UkKnowApply');
		}
		edit = new UkKnowApplyCollectFlowForm({
					applyId : record.data.applyId,
					runId : record.data.runid,
					piId : record.data.piId
				});
		tabs.add(edit);
		tabs.activate(edit);
	},
	nextFlow : function(record) {
		var tasks = record.get('tasks');
		var contentPanel = App.getContentPanel();
		var nextForm = contentPanel.getItem('ProcessNextForm');
		if (tasks.length > 0) {
			for (var i = 0; i < tasks.length; i++) {
				if (tasks[i].userId) {
					if (curUserInfo.userId == tasks[i].userId) {
						if (tasks[i].taskName == this.title) {
							if (!nextForm) {
								nextForm = new ProcessNextForm({
											taskId : tasks[i].taskId,
											activityName : tasks[i].taskName,
											gridPanel : this.gridPanel
										});
								contentPanel.add(nextForm);
							}
						}
					}
				}
			}
		}

		contentPanel.activate(nextForm);
	},	// 创建记录
	selectTemplate : function(record) {
		new KnowTmpForm().show();
	},
	// 行的Action
	onRowAction : function(grid, record, action, row, col) {
		switch (action) {
			case 'btn-operation' :
				this.trackRs.call(this, record);
				break;
			case 'btn-ok' :
				this.nextFlow.call(this, record);
				break;
			case 'btn-fabu' :
				this.knowCollect.call(this, record);
				break;

			default :
				break;
		}
	}
});
