Ext.ns('MyToDoFlowManagerView');
/**
 * 我的任务流程 
 */
var MyToDoFlowManagerView=function(){
	var searchPanel = new HT.SearchPanel({
							layout : 'hbox',
							region : 'north',
							id : 'MyToDoFlowManagerSearchForm',
							// colNums : 3,
							height : 35,
							items : [{
										text : "工单类别"// __ukKnowApproveApproveTitle
									}, {
										hiddenName : 'busType',
										xtype : 'mtdiccombo',
										editable : true,
										lazyInit : false,
										forceSelection : false,
										itemKey : 'FLOW_BUSTYPE'
									}, {
										text : "受理人"
									}, {
										name : 'creater',
										xtype : 'textfield'
									}, {
										xtype : 'button',
										text : __search,
										iconCls : 'search',
										scope : this,
										handler : function() {
											var searchPanel = Ext.getCmp('MyToDoFlowManagerSearchForm');
											var gridPanel = Ext.getCmp('MyToDoFlowManagerGrid');
											if (searchPanel.getForm().isValid()) {
												$search({
													searchPanel :searchPanel,
													gridPanel : gridPanel
												});
											}
				
										}
									}, {
										xtype : 'button',
										text : __reset,
										scope : this,
										iconCls : 'btn-reset',
										handler : function(){
											var searchPanel = Ext.getCmp('MyToDoFlowManagerSearchForm');
											searchPanel.getForm().reset();
										}
									}, {
										xtype : 'button',
										text : __advancedSearch,
										iconCls : 'search',
										scope : this,
										handler : function() {
											new UkKnowApproveAdvancedSearchWin()
													.show()
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
	var panel=new Ext.Panel({
		id:'MyToDoFlowManagerView',
		iconCls:'menu-flowWait', 
		bodyStyle:'padding:2px 2px 2px 2px',
		layout:'border',
		region:'center',
		title:'我的待办工单',
		autoScroll:true,
		items:[searchPanel,this.setup()]
	});
	return panel;
};

MyToDoFlowManagerView.prototype.setup=function(){
	//显示一个GridPanel先即可
	var store=this.initData();
	store.load({params:{start:0, limit:25}});
	var cm = new Ext.grid.ColumnModel({
		 columns:[new Ext.grid.RowNumberer(),{
	          header: "userId",
	          dataIndex: 'userId',
	          width: 20,
	          hidden: true,
	          sortable: true
	      },{
	          header:'工单类别',
		      dataIndex:'busType',
		      width:100,
		      renderer : function(value) {
						return FLOW_BUSTYPE.get(value);
					}
	      },{
	          header:'工单类型',
		      dataIndex:'runType',
		      width:100,
		      renderer : function(value) {
			  if(value != null){
				 return value.itemValue
				}
			  }
	      },{
	          header:'申请人',
		      dataIndex:'applyName'
	      },{
	          header:'申请时间',
		      dataIndex:'applyTime',
		      width:120
	      },{
	          header:'受理人',
		      dataIndex:'creater',
		      width:100,
                        renderer : function(value) {
                            if (value == null) {
                                return '';
                            } else {
                                return value.fullname;
                            }
                        }
	      },{
	          header:'受理时间',
		      dataIndex:'createTime',
		      width:120
	      },{
	          header:'要求完成时间',
		      dataIndex:'needsTime',
		      width:120
	      },{
	          header:'当前节点',
		      dataIndex:'taskName',
		      width:80
	      },{
	          header:'状态',
		      dataIndex:'runStatus',
		      width:60,
		      renderer : function(value) {
						return PROCESSRUN_STATUS.get(value);
					}
	      },
//	      	{
//								header : '工单类型',
//								dataIndex : 'taskType',
//								width:150
//							},{
//	          header:'执行人',
//		      dataIndex:'assignee',
//		      width:140,
//		      renderer:function(value,metadata,record,rowIndex,colIndex){
//		      	var assignee=record.data.assignee;
//		      	if(assignee==null || assignee==''){
//		      		return '<font color="red">暂无执行人</font>';
//		      	}else{
//		      		return assignee;
//		      	}
//		      }
//	      },{
//	      	  header:'开始时间',
//	      	  dataIndex:'createTime',
//	      	  width:100
//	      },{
//	      	   header:'到期时间',
//	      	   dataIndex:'dueDate',
//	      	   width:100,
//	      	   renderer:function(value){
//	      	   	if(value==''){
//	      	   		return '无限制';
//	      	   	}else{
//	      	   		return value;
//	      	   	}
//	      	   }
//	      },
	      	{
		      	hidden:true,
		      	dataIndex:'executionId'
	      },{
		      	hidden:true,
		      	dataIndex:'taskId'
	      },{
	      		hidden:'true',
	      		dataIndex:'isMultipleTask'
	      },{
	      		hidden:'true',
	      		dataIndex:'flowType'
	      },{
	      		hidden:'true',
	      		dataIndex:'flowPk'
	      },{
	      		hidden:'true',
	      		dataIndex:'runId'
	      },{
	      	header:'管理',
	      	dataIndex:'taskdbid',
	      	width:80,
	      	renderer:function(value,metadata,record,rowIndex,colIndex){
	      		var taskId=record.data.taskId;
	      		var exeId=record.data.executionId;
//	      		var assignee=record.data.assignee;
	      		var assignee=record.data.taskUserName;
//	      		var activityName=record.data.activityName;
	      		var activityName=record.data.taskName;
	      		var isMultipleTask=record.data.isMultipleTask;
	      		var runId=record.data.runId;
	      		var flowPk=record.data.flowPk;
	      		var flowType=record.data.flowType;
	      		var fm = flowType.replace(/FlowView/, "FlowForm");
	      		var runStatus=record.data.runStatus;
	      		var str='';
	      		str+='<button title="查看" class="btn-detail" onclick="MyToDoFlowManagerView.trackRs(\''+flowPk+'\',\''+runId+'\',\''+fm+'\')"></button>';
	      		if(runStatus != 2){
	      		if(assignee==null){
	      			str+='<button title="锁定任务" class="btn-lockTask" onclick="MyToDoFlowManagerView.lockTask('+taskId+')"></button>';
	      		}else{
	      			str+='<button title="处理任务" class="btn-approvalTask" onclick="MyToDoFlowManagerView.nextStep(\''+taskId+'\',\''+activityName+'\')"></button>';
	      			
	      			str+='&nbsp;<button title="代办" class="btn-changeTask" onclick="MyToDoFlowManagerView.changeTask('+taskId+',\''+activityName+'\')"></button>';
	      			
	      			if(isMultipleTask==1){//多人的任务，自己可以解锁由其他人来执行
	      				str+='&nbsp;<button title="解锁任务" class="btn-unlockTask" onclick="MyToDoFlowManagerView.unlockTask('+taskId+')"></button>';
	      			}
	      		}}
	      		return str;
	      	}
	      }
      	],
	    defaults: {
	        sortable: true,
	        menuDisabled: true,
	        width: 100
	    }
	});
	//显示任务
	var grid = new Ext.grid.GridPanel({
	  id:'MyToDoFlowManagerGrid',
      closable:true,
      store: store,     
      shim: true,
      region : 'center',
      trackMouseOver:true,
      loadMask: true,
//      tbar : new Ext.Toolbar({
//							height : 28,
//							items : [{
//										text : '刷新',
//										iconCls : 'btn-refresh',
//										handler : function() {
//											Ext.getCmp('MyToDoFlowManagerGrid').getStore().reload();
//										}
//									}]
//		}),
  		cm:cm,
	  	viewConfig: {
	      forceFit:true,
	      showPreview:false  
	  	},
      	bbar : new HT.PagingBar({store : store})
  });
  
//  grid.addListener('rowdblclick', function(grid,
//								rowindex, e) {
//							grid.getSelectionModel().each(function(rec) {
//										MyToDoFlowManagerView.nextStep(rec.data.taskId,rec.data.activityName);
//							});
//						});
 
  return grid;
};


MyToDoFlowManagerView.prototype.initData=function(){
	var store = new Ext.data.Store({  
        proxy: new Ext.data.HttpProxy({  
            url: __ctxPath+'/flow/taskListTask.do'
        }),  
        // create reader that reads the Topic records  
        reader: new Ext.data.JsonReader({
            root: 'result',  
            totalProperty: 'totalCounts',  
            fields: [
            	'flowPk',
	            'runId',
	            'flowType',
	            'creater',
	            'piId',
	            'taskUser',
	            'taskName',
	            'dueDate','busType','busClasses','createTime','acceptanceTime','taskId','runStatus','needsTime','finishTime','taskUserName','applyName','applyTime','residueTime','runType'
	            ]  
        }), 
        remoteSort: true  
    });  
    store.setDefaultSort('dbId', 'desc');
    store.setBaseParam('runStatus',1);
    store.setBaseParam('taskUser',curUserInfo.userId);
    return store;
};


/**
 * 锁定任务，则表示申请执行该任务
 * @param {} taskdbid
 */
MyToDoFlowManagerView.lockTask=function(taskId){
	Ext.Ajax.request({
		url:__ctxPath+'/flow/lockTask.do',
		params:{
			taskId:taskId
		},
		method:'post',
		success:function(result,response){
			var grid=Ext.getCmp("MyToDoFlowManagerGrid");
			var resultObj=Ext.util.JSON.decode(result.responseText)
			if(resultObj.hasAssigned==true){
				Ext.ux.Toast.msg("操作提示","该任务已经被其他用户锁定执行！");
			}else{
				Ext.ux.Toast.msg("操作提示","该任务已经成功锁定，请执行下一步操作！");
			}
			grid.getStore().reload();
		}
	});
};

/**
 * 任务变更，则转由代办人来处理
 * @param {} taskId
 */
MyToDoFlowManagerView.changeTask=function(taskId,taskname){
	grid = 'MyToDoFlowManagerGrid';
	new ChangeTaskView(taskId,taskname,grid);
};

/**
 * 锁定任务，则表示自己退出执行该任务，其他人员可以申请执行该任务 
 * @param {} taskdbid
 */
MyToDoFlowManagerView.unlockTask=function(taskId){
	Ext.Ajax.request({
		url:__ctxPath+'/flow/unlockTask.do',
		params:{
			taskId:taskId
		},
		method:'post',
		success:function(result,response){
			var grid=Ext.getCmp("MyToDoFlowManagerGrid");
			var resultObj=Ext.util.JSON.decode(result.responseText)
			
			if(resultObj.unlocked==true){
				Ext.ux.Toast.msg("操作提示","该任务已经成功解锁！");
			}else{
				Ext.ux.Toast.msg("操作提示","该任务解锁失败(任务已经由其他人员执行完成)！");
			}
			grid.getStore().reload();
		}
	});
};
/**
 * 下一步的任务
 * @param {} taskdbid
 */
MyToDoFlowManagerView.nextStep=function(taskId,activityName){
	var contentPanel=App.getContentPanel();
	var formView=contentPanel.getItem('ProcessNextForm'+taskId);
	if(formView==null){
		formView=new ProcessNextForm({taskId:taskId,activityName:activityName,flowGrid : 'MyToDoFlowManagerGrid'});
		contentPanel.add(formView);
	}
	contentPanel.activate(formView);
};

MyToDoFlowManagerView.trackRs = function(flowPk, runId, fm) {
	var tabs = Ext.getCmp('centerTabPanel');
	var edit = tabs.getItem(fm);

	if (edit != null) {
		tabs.remove(fm.toString());
	}
	var view = eval(fm);
	edit = new view({
				id : flowPk,
				runId : runId
			});
	tabs.add(edit);
	tabs.activate(edit);
};
