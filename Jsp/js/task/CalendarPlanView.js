Ext.ns('CalendarPlanView');
/**
 * 日程列表
 */
var CalendarPlanView = function() {
	return new Ext.Panel({
		id : 'CalendarPlanView',
		layout:'border',
		iconCls:'menu-cal-plan-view',
		title : '所有任务',
		items : [new Ext.FormPanel({
			defaults:{border:false},
			region:'north',
			height:35,
			layout : 'hbox',
			id : 'CalendarPlanSearchForm',
			bodyStyle:'padding:5px',
			items: [{
						border : false,
						style : 'text-align:right',
						html : '&nbsp;任务类型：&nbsp;&nbsp;'
					}, {
						hiddenName : 'Q_taskType_SN_EQ',
						xtype : 'mtdiccombo',
						mode : 'local',
						editable : false,
						triggerAction : 'all',
						flex : 1,
						lazyInit : false,
						itemKey : 'CONFX'
//						store : [['1', '呼入'], ['2', '呼出'],['3', '内部']]
					}, {
						border : false,
						style : 'text-align:right',
						html : '&nbsp;分配时间：&nbsp;&nbsp;'
					}, {
						xtype : 'datefield',
						format : 'Y-m-d',
						id:'Q_startTime_D_GE_',
						name : 'Q_startTime_D_GE',
						editable : false
					}, {
						border : false,
						style : 'text-align:right',
						html : '&nbsp;-&nbsp;'
					}, {
						xtype : 'datefield',
						format : 'Y-m-d',
						id:'Q_startTime_D_LE_',
						name : 'Q_startTime_D_LE',
						editable : false
					},  {
						border : false,
						style : 'text-align:right',
						html : '&nbsp;负责人：&nbsp;&nbsp;'
					},{
						xtype : 'textfield',
						name : 'Q_fullname_S_LK'
					}, {
						border : false,
						style : 'text-align:right',
						html : '&nbsp;&nbsp;'
					}, {
						xtype : 'button',
						text : '查询',
						iconCls : 'search',
						handler : function() {
							var searchPanel = Ext.getCmp('CalendarPlanSearchForm');
							var gridPanel = Ext.getCmp('CalendarPlanGrid');
							if (searchPanel.getForm().isValid()) {
								$search({
									searchPanel :searchPanel,
									gridPanel : gridPanel
								});
							}
						}
					}, {
						border : false,
						style : 'text-align:right',
						html : '&nbsp;&nbsp;'
					},{
						
						xtype:'button',
						bosyStyle:'margin-left:10px',
						text:'重置',
						iconCls:'btn-reseted',
						handler:function(){
							var searchPanel = Ext.getCmp('CalendarPlanSearchForm');
							searchPanel.getForm().reset();
							Ext.getCmp('Q_startTime_D_GE_').setRawValue(""); 
							Ext.getCmp('Q_startTime_D_LE_').setRawValue(""); 
							//document.getElementById('Q_startTime_D_GE_').innerHTML = "";
						}

					}]
		}), this.setup()]
	});
};
/**
 * 建立视图
 */
CalendarPlanView.prototype.setup = function() {
	return this.grid();
};
/**
 * 建立DataGrid
 */
CalendarPlanView.prototype.grid = function() {
	var sm = new Ext.grid.CheckboxSelectionModel();
	var cm = new Ext.grid.ColumnModel({
		columns : [sm, new Ext.grid.RowNumberer(), {
					header : 'planId',
					dataIndex : 'planId',
					hidden : true
				},{
					width:120,
					header : '标题',
					dataIndex : 'taskTitle'
				},{
					header : '任务类型',
					width:60,
					dataIndex : 'taskType',
					renderer : function(value) {
						if (value != '' || value=='0') {
							return CONFX.get(value);
						} else {
							return ' ';
						}
					}
				},{
					header : '任务类别',
					width: 50,
					dataIndex : 'taskCategory',
					renderer:function(value){
						if (value != '' || value=='0') {
							return CONTPJYLX.get(value);
						} else {
							return ' ';
						}
						
					}
				}, {
					header : '任务事项',
					width:60,
					dataIndex : 'taskBusiType',
					renderer:function(value){
						if (value != '' || value=='0') {
							return CONTPCLJG.get(value);
						} else {
							return ' ';
						}
					}
				}, {
					header : '创建时间',
					dataIndex : 'startTime',
					width:80
				}, {
					header : '要求完成时间',
					dataIndex : 'completeTime',
					width:80
//				}, {
//					header : '完成率',
//					width:60,
//					dataIndex : 'effeciency',
//					renderer:function(value){
//						if(value==null || value==""){
//							return '0%'
//						}else{
//							return value+'%';
//						}
//					}
				}, {
					header : '分配人',
					width:60,
					dataIndex : 'fullname'
				},{
					header : '负责人',
					width:60,
					dataIndex : 'assignerName'
				},{
					header : '状态',
					width: 50,
					dataIndex : 'status',
					renderer:function(value){
						if(value!=null && !value==""){
							return CON_REQ_STATUS.get(value);
						}else{
							return '';
						}
						
					}
				}
//				, {width:250,
//					header : '内容',
//					dataIndex : 'content',
//					renderer:function(value, metadata, record){
//						var status=record.data.status;
//						if(status==1){
//							return '<font style="text-decoration:line-through;color:red;">' + value + '</font>';
//						}else{
//							return value;
//						}
//					}
//				}
				, {
					header : '管理',
					dataIndex : 'planId',
					width : 40,
					sortable : false,
					renderer : function(value, metadata, record, rowIndex, colIndex) {
						var editId = record.data.planId;
						var status=record.data.status;
						var assignerId=record.data.assignerId;
						var str = '';
						if(status==1 || status==2){
//							if(assignerId==curUserInfo.userId){//本人的分配的任务可以修改
//								str += '&nbsp;<button title="编辑" value=" " class="btn-edit" onclick="CalendarPlanView.edit('+ editId + ')"></button>';
//							}
							str += '&nbsp;<button title="查看" value=" " class="btn-readdocument" onclick="CalendarPlanView.edit('+ editId + ')"></button>';
//							str+='&nbsp;<button title="处理任务" value="" class="btn-task" onclick="CalendarPlanView.finished('+ editId + ')"></button>';
						}
						return str;
					}
				}],
		defaults : {
			sortable : true,
			menuDisabled : false,
			width : 100
		}
	});

	var store = this.store();
	store.load({
		params : {
			start : 0,
			limit : 25
		}
	});
	var grid = new Ext.grid.GridPanel({
		region:'center',
		id : 'CalendarPlanGrid',
		//tbar : this.topbar(),
		store : store,
		showSm : false,
		trackMouseOver : true,
		disableSelection : false,
		loadMask : true,
		cm : cm,
		sm : sm,
		viewConfig : {
			forceFit : true,
			enableRowBody : false,
			showPreview : false
		},
		bbar : new Ext.PagingToolbar({
			pageSize : 25,
			store : store,
			displayInfo : true,
			displayMsg : '当前显示从{0}至{1}， 共{2}条记录',
			emptyMsg : "当前没有记录"
		})
	});
	return grid;

};

/**
 * 初始化数据
 */
CalendarPlanView.prototype.store = function() {
	var store = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
			url : __ctxPath + '/task/listCalendarPlan.do'
		}),
		reader : new Ext.data.JsonReader({
			root : 'result',
			totalProperty : 'totalCounts',
			id : 'id',
			fields : [{
				name : 'planId',
				type : 'int'
			}
			, 'taskTitle', 'taskType', 'taskCategory', 'taskBusiType','startTime',
			'completeTime', 'userId','assignerName', 'fullname', 'status','effeciency','dicTaskCategory','dicTaskType','dicBusiType']
		}),
		remoteSort : true
	});
	store.setDefaultSort('planId', 'desc');
	return store;
};



/**
 * 删除单个记录
 */
CalendarPlanView.remove = function(id) {
	var grid = Ext.getCmp("CalendarPlanGrid");
	Ext.Msg.confirm('信息确认', '您确认要删除该记录吗？', function(btn) {
		if (btn == 'yes') {
			Ext.Ajax.request({
				url : __ctxPath
						+ '/task/multiDelCalendarPlan.do',
				params : {
					ids : id
				},
				method : 'post',
				success : function() {
					Ext.ux.Toast.msg("信息提示", "成功删除所选记录！");
					grid.getStore().reload({
						params : {
							start : 0,
							limit : 25
						}
					});
				}
			});
		}
	});
};

/**
 * 
 */
CalendarPlanView.edit = function(id) {
	var tabs = Ext.getCmp('centerTabPanel');
	var aForm = Ext.getCmp('TASK_CalendarPlanFormViewWin');
	if (aForm != null) {
		tabs.remove('TASK_CalendarPlanFormViewWin');
	}
	aForm = new CalendarPlanFormView({
		planId : id,
		flag:'show'
	});
	tabs.add(aForm);
	tabs.activate(aForm);
}
/**
 * 完成任务，填写反馈意见
 * @param {} id
 */
CalendarPlanView.finished=function(id){
	var tabs = Ext.getCmp('centerTabPanel');
	var aForm = Ext.getCmp('ObCallbatchHisForm');
	if (aForm != null) {
		tabs.remove('ObCallbatchHisForm');
	}
	aForm = new CalendarPlanHandleForm({planId : id});
	tabs.add(aForm);
	tabs.activate(aForm);
}
