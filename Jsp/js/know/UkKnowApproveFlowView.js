/**
 * @author:cf0666@gmail.com
 * @class UkKnowApproveFlowView
 * @extends Ext.Panel
 * @description 知识审批管理
 * @company 优创融联科技
 * @createtime:
 */
UkKnowApproveFlowView = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		UkKnowApproveView.superclass.constructor.call(this, {
			id : this.id ? this.id : 'UkKnowApproveView',
			title : this.title ? this.title : __menuViewUkKnowApproves,
			region : 'center',
			layout : 'border',
			items : [ this.searchPanel, this.gridPanel ]
		});
	},// end of constructor
	// 初始化组件
	initUIComponents : function() {
		var fieldnameComboData = [ 
  		[ 'approveTitle', __ukKnowApproveApproveTitle, new Ext.form.TextField( {
  			name : 'approveTitle',
  			allowBlank : true
  		}) ], [ 'knowStatus', __ukKnowApproveKnowStatus, new Ext.form.NumberField( {
  			name : 'knowStatus',
  			allowBlank : true
  		}) ], [ 'createDate', __ukKnowApproveCreateDate, new Ext.form.DateField( {
  			hiddenName : 'createDate',
  			format : 'Y-m-d'
  		}) ], [ 'updateDate', __ukKnowApproveUpdateDate, new Ext.form.DateField( {
  			hiddenName : 'updateDate',
  			format : 'Y-m-d'
  		}) ] ]
		var UkKnowApproveAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
			title : __advanceQueryUkKnowApproves,
			fieldData : fieldnameComboData
		});
		// 初始化搜索条件Panel
		this.searchPanel = new Ext.FormPanel( {
			layout : 'hbox',
			region : 'north',
			id : 'UkKnowApproveSearchPanel',
			height : 35,//申请人 状态 审批状态
			items : [{
				text : "标题"//__ukKnowApproveApproveTitle
			},
			{
				name : 'Q_approveTitle_S_LK',
				xtype : 'textfield'
			}, {
				text : "状态"
			}, {
				name : 'Q_approvalStatus_S_LK',
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
				handler : function(){
					new UkKnowApproveAdvancedSearchWin().show()
				}
			},{
				fieldLabel : 'flowNode',
				id : 'flowNode',
				value : this.title,
				xtype : 'hidden'
			}, {
				fieldLabel : 'flowType',
				id : 'flowType',
				value : 'UkKnowApplyFlowView',
				xtype : 'hidden'
			} ],
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
		
		this.gridPanel = new HT.GridPanel( {
			region : 'center',
			//使用RowActions
			rowActions : true,
			printable : false,
			exportable : false,
			id : 'UkKnowApproveGrid',
			url : __ctxPath + "/know/listFlowUkKnowApprove.do",
			baseParams : {
				flowNode : this.title,
				flowType : 'UkKnowApproveFlowView'// 流程类型key
			},
			fields : [ {
				name : 'knowApproveId',
				type : 'int'
			}, 'ukKnowApprove', 'approveTitle', 'approveComment', 'knowStatus',
					'runid', 'createBy', 'updateBy', 'createDate',
					'updateDate', 'userid', 'approvalStatus',
					'tasks', 'runid', 'nodeName', 'piId'],
			columns : [ {
				header : 'knowApproveId',
				dataIndex : 'knowApproveId',
				hidden : true
//			}, {
//				header : "工单编号",//__ukKnowApproveApplyId,
//				isExp : false,
//				hidden : true,
//				dataIndex : 'applyId',
//				renderer : function(val) {
//					return val.applyIdName;
//				}
			}, {
				header : "工单标题",//__ukKnowApproveApproveTitle,
				isExp : false,

				dataIndex : 'approveTitle'
			}, {
				header : __ukKnowApproveApproveComment,
				isExp : false,

				dataIndex : 'approveComment'
//			}, {
//				header : __ukKnowApproveKnowStatus,
//				isExp : false,
//
//				dataIndex : 'knowStatus',
//				renderer : function(value) {
//					return KNOW_STATUS.value;
//				}
			}, {
				header : '申请人',//__ukKnowApproveCreateBy,
				isExp : false,

				dataIndex : 'createBy'
//			}, {
//				header : __ukKnowApproveUpdateBy,
//				isExp : false,
//
//				dataIndex : 'updateBy'
			}, {
				header : '申请时间',//__ukKnowApproveCreateDate,
				isExp : false,
				dataIndex : 'createDate',
				renderer:function(value){  
				    return value.substring(0,10);
				}
			},{
				header : '当前任务',// __allApprovalInfo 流程审批信息
				dataIndex : 'tasks',
				width : 200,
				renderer : function(tasks, metadata, record, rowIndex, colIndex) {
					var reVal = '';
					if (tasks.length > 0) {
						for (var i = 0; i < tasks.length; i++) {
							reVal += tasks[i].taskName;
							if (tasks[i].userId) {
								reVal += '(';
//								if (curUserInfo.userId == tasks[i].userId) {
//									if (tasks[i].taskName == node) {
//										reVal += '<a href="#"  onclick="App.MyDesktopClickTopTab(\'ProcessNextForm\',{taskId:'
//												+ tasks[i].taskId
//												+ ',activityName:\''
//												+ tasks[i].taskName
//												+ '\'})">';
//									}
//
//								}
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
//			}, {
//				header : __ukKnowApproveUpdateDate,
//				isExp : false,
//
//				dataIndex : 'updateDate'
//			}, {
//				header : __ukKnowApproveUserid,
//				isExp : false,
//
//				dataIndex : 'userid'
//			},{
//				header : __ukKnowApproveApprovalStatus,
//				dataIndex : 'approvalStatus'
//			},{
//				header : __allStartTask,
//				dataIndex : 'tasks',
//				renderer : function(tasks, metadata, record, rowIndex,
//						colIndex) {
//					var reVal = '';
//					if (tasks.length > 0) {
//
//						for (var i = 0; i < tasks.length; i++) {
//							reVal += tasks[i].taskName;
//							if (tasks[i].userId) {
//								reVal += '(';
//								if (curUserInfo.userId == tasks[i].userId) {
//									if (tasks[i].taskName == node) {
//										reVal += '<a href="#" onclick="App.MyDesktopClickTopTab(\'ProcessNextForm\',{taskId:'
//												+ tasks[i].taskId
//												+ ',activityName:\''
//												+ tasks[i].taskName
//												+ '\'})">';
//									}
//
//								}
//								reVal += tasks[i].fullname
//								if (curUserInfo.userId == tasks[i].userId) {
//									reVal += "</a>";
//								}
//								reVal += ')&nbsp;&nbsp;';
//							}
//						}
//					}
//					return reVal;
//				}
			},new Ext.ux.grid.RowActions({
				header : __action,
				width : 50,
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
				}],
				listeners : {
					scope : this,
					'action' : this.onRowAction
				}
			})]
			//end of columns
		});
		this.gridPanel.addListener('rowdblclick', this.rowClick);

	},// end of the initComponents()
	//重置查询表单
	reset : function() {
		this.searchPanel.getForm().reset();
	},
	//按条件搜索
	onSearch : function(obj) {
		$search({
				searchPanel : this.searchPanel,
				gridPanel : this.gridPanel
			});
	},
	// 审核跟踪
	trackRs : function(rec) {
		var tabs = Ext.getCmp('centerTabPanel');
		var edit = tabs.getItem('UkKnowApprove');

		if (edit != null) {
			tabs.remove('UkKnowApprove');
		}
		edit = new UkKnowApproveFlowForm({
			knowApproveId : rec.data.knowApproveId,
			runId : rec.data.runid,
			piId : rec.data.piId
		});
		tabs.add(edit);
		tabs.activate(edit);
	},
	//获取下一节点
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
	},
	//行的Action
	onRowAction : function(grid, record, action, row, col) {
		switch (action) {
			case 'btn-operation' :
				this.trackRs.call(this, record);
				break;
			case 'btn-ok' :
				this.nextFlow.call(this, record);
				break;
			default:
				break;
		}
	}
});
