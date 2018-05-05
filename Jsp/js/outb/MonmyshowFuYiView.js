Ext.ns('MonmyshowFuYiView');
/**
 * 我的任务流程
 */
var MonmyshowFuYiView = function() {
var store = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : __ctxPath + '/flow/NlistTask.do'
						}),
				// create reader that reads the Topic records
				reader : new Ext.data.JsonReader({
							root : 'result',
							totalProperty : 'totalCounts',
							fields : ['taskName', 'activityName', 'assignee',
									'createTime', 'dueDate', 'executionId',
									'pdId', 'taskId', 'isMultipleTask']
						}),
				remoteSort : true
			});
//	store.setDefaultSort('dbId', 'desc');
	store.load({
				params : {
					start : 0,
					limit : 25
				}
			});
	var cm = new Ext.grid.ColumnModel({
				columns : [new Ext.grid.RowNumberer(), {
							header : "userId",
							dataIndex : 'userId',
							width : 20,
							hidden : true,
							sortable : true
						}, {
							// header : '目标值',
							dataIndex : 'user',
							width : 100
						}, {
							header : '目标值',
							dataIndex : 'taskName',
							width : 100
						}, {
							header : '完成量',
							dataIndex : 'activityName',
							width : 100
						}, {
							header : '完成率(%)',
							dataIndex : 'assignee',
							width : 100
						}, {
							header : '佣金',
							dataIndex : 'assignee',
							width : 100
						}],
				defaults : {
					sortable : true,
					menuDisabled : true,
					width : 100
				}
			});
	// 显示任务
	var grid = new Ext.grid.GridPanel({
				id : 'MyTasgggggggggggggkGrid',
				closable : true,
				store : store,
				shim : true,
				border : true,
				region : 'center',
				trackMouseOver : true,
				loadMask : true,
				cm : cm,
				viewConfig : {
					forceFit : true,
					showPreview : false
				}
			});
	var recordType = store.recordType;
	store.add(new recordType({
				'user' : '结案客户数',
				'taskName' : 200,
				'activityName' : 199,
				'assignee' : 75
			}));
	store.add(new recordType({
				'user' : '有效订单金额',
				'taskName' : 600,
				'activityName' : 200,
				'assignee' : 33.3
			}));
	store.add(new recordType({
				'user' : '妥投率',
				'taskName' : 200,
				'activityName' : 150,
				'assignee' : 75
			}));
	store.add(new recordType({
				'user' : '搭销率',
				'taskName' : 100,
				'activityName' : 10,
				'assignee' : 10
			}));
	var infoPanel = new Ext.FormPanel({
		layout : 'form',
		border : false,
		height : 150,
		style:'padding:15px;background-color:#fff',
		region : 'north',
		labelAlign : 'right',
		defaults : {
			anchor : '96%'
		},
		labelWidth : 80,
		items : [{
			xtype:'textarea',
			height:80,
			anchor:'100%',
			fieldLabel:'复议说明'
		
		}]
	})
	var panel = new Ext.Panel({
				id : 'MonmyshowFuYiView',
				iconCls : 'menu-flowWait',
				bodyStyle : 'padding:2px 2px 2px 2px',
				layout : 'border',
				region : 'center',
				title : '佣金复议 ',
				autoScroll : true,
				items : [grid, infoPanel]
			});
	return panel;
};
