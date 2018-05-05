Ext.ns('CalendarPlanView');
/**
 * 日程列表
 */
var ExpiredPlanView = function() {
	return new Ext.Panel({
		id : 'ExpiredPlanView',
		layout:'border',
		iconCls:'menu-cal-plan-view',
		title : '过期任务',
		items : [new Ext.FormPanel({
			defaults:{border:false},
			region:'north',
			height:32,
			id : 'ExpiredPlanSearchForm',
			bodyStyle:'padding:5px',
			items: [{
	            layout:'column',
	            defaults:{border:false},
	            items:[{
	                columnWidth:.2,
	                layout: 'form',
	                 labelWidth:60,
	                labelAlign:'right',
	                defaults:{border:false,anchor:'90%,90%'},
	                items: [{
							xtype : 'mtdiccombo',
							fieldLabel: '任务类型',
							labelWidth:60,
	              		  	labelAlign:'right',
							hiddenName : 'Q_taskType_SN_EQ',
							editable : true,
							lazyInit : false,
							forceSelection : false,
							itemKey : 'CONFX',
	                    	anchor:'95%'
	                }]
	            },{
	                columnWidth:.2,
	                layout: 'form',
	                labelWidth:60,
	                labelAlign:'right',
	                defaults:{border:false,anchor:'90%,90%'},
	                items: [{
							xtype : 'mtdiccombo',
							fieldLabel: '任务类别',
							labelWidth:60,
	              		  	labelAlign:'right',
							hiddenName : 'Q_taskCategory_L_EQ',
							editable : true,
							lazyInit : false,
							forceSelection : false,
							itemKey : 'CONTPJYLX',
	                    	anchor:'95%'
	                }]
	            },{
	                columnWidth:.2,
	                layout: 'form',
	                labelWidth:60,
	                labelAlign:'right',
	                defaults:{border:false,anchor:'90%,90%'},
	                items: [{
							xtype : 'datefield',
							fieldLabel: '从',
							labelWidth:20,
	              		  	labelAlign:'right',
	              		  	format : 'Y-m-d',
							name : 'Q_completeTime_D_GE',
							id : 'ExpiredPlan.completeTime_from',
							editable : false,
	                    	anchor:'95%'
	                }]
	            },{
	                columnWidth:.2,
	                layout: 'form',
	                labelWidth:20,
	                labelAlign:'right',
	                defaults:{border:false,anchor:'90%,90%'},
	                items: [{
							xtype : 'datefield',
							fieldLabel: '到',
							labelWidth:60,
							format : 'Y-m-d',
							name : 'Q_completeTime_D_LE',
							id : 'ExpiredPlan.completeTime_to',
							editable : false,
	                    	anchor:'95%'
	                }]
	            },{
	                layout: 'column',
	                columnWidth:.2,
	                defaults:{border:false,anchor:'90%,90%'},
	                items: [
	                        {
			    		xtype : 'button',
						text : '查询',
						iconCls : 'search',
						handler : function() {
							var searchPanel = Ext.getCmp('ExpiredPlanSearchForm');
							var gridPanel = Ext.getCmp('ExpiredPlanGrid');
							if (searchPanel.getForm().isValid()) {
								$search({
									searchPanel :searchPanel,
									gridPanel : gridPanel
								});
							}
						}
					},{
						xtype:'button',
						text:'重置',
						bodyStyle:'margin-left:10px',
						iconCls:'btn-reseted',
						handler:function(){
							var searchPanel = Ext.getCmp('ExpiredPlanSearchForm');
							document.getElementById('ExpiredPlan.completeTime_from').value = '';
							document.getElementById('ExpiredPlan.completeTime_to').value = '';
							searchPanel.getForm().reset();
						}
					}]
	            }]
			}
			]
			
			
		}), this.setup()]
	});
};
/**
 * 建立视图
 */
ExpiredPlanView.prototype.setup = function() {
	return this.grid();
};
/**
 * 建立DataGrid
 */
ExpiredPlanView.prototype.grid = function() {
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
					renderer:function(value){
						if (value != '' || value == '0') {
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
						if (value != '' || value == '0') {
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
						if (value != '' || value == '0') {
							return CONTPCLJG.get(value);
						} else {
							return ' ';
						}
					}
				}, {
					header : '要求完成时间',
					width:100,
					dataIndex : 'completeTime'
				}, {
					header : '剩余时间',
					width:100,
					dataIndex : 'content'
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
//						
//					}
				}, {
					header : '执行人',
					width:60,
					dataIndex : 'fullname'
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
				},{
					header : '管理',
					dataIndex : 'planId',
					width : 40,
					sortable : false,
					renderer : function(value, metadata, record, rowIndex,
							colIndex) {
						var editId = record.data.planId;
						var status=record.data.status;
						var assignerId=record.data.assignerId;
//						var str = '<button title="删除" value=" " class="btn-del" onclick="ExpiredPlanView.remove('+ editId + ')"></button>';
						var str = '';
						if(status==1){
							if(assignerId==curUserInfo.userId){//本人的分配的任务可以修改
								str += '&nbsp;<button title="编辑" value=" " class="btn-edit" onclick="ExpiredPlanView.edit('+ editId + ')"></button>';
							}
							str+='&nbsp;<button title="处理任务" value="" class="btn-task" onclick="ExpiredPlanView.finished('+ editId + ')"></button>';
						}else{
							str += '&nbsp;<button title="查看" value=" " class="btn-form-design" onclick="ExpiredPlanView.edit('+ editId + ')"></button>';
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
				id : 'ExpiredPlanGrid',
				//tbar : this.topbar(),
				store : store,
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
ExpiredPlanView.prototype.store = function() {
	var store = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
					url : __ctxPath + '/task/listExpiredCalendarPlan.do'
				}),
		reader : new Ext.data.JsonReader({
					root : 'result',
					totalProperty : 'totalCounts',
					id : 'id',
					fields : [{
						name : 'planId',
						type : 'int'
					}
					, 'taskTitle', 'taskType', 'taskCategory', 'taskBusiType','completeTime',
					'content', 'userId', 'fullname', 'status','effeciency','dicTaskCategory','dicTaskType','dicBusiType']
				}),
		remoteSort : true
	});
	store.setDefaultSort('planId', 'desc');
	return store;
};


/**
 * 删除单个记录
 */
ExpiredPlanView.remove = function(id) {
	var grid = Ext.getCmp("ExpiredPlanGrid");
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
ExpiredPlanView.edit = function(id) {
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
ExpiredPlanView.finished=function(id){
	var tabs = Ext.getCmp('centerTabPanel');
	var aForm = Ext.getCmp('CalendarPlanHandleFormWin');
	if (aForm != null) {
		tabs.remove('CalendarPlanHandleFormWin');
	}
	aForm = new CalendarPlanHandleForm({
		planId : id,
		flag:'add'
	});
	tabs.add(aForm);
	tabs.activate(aForm);
}
