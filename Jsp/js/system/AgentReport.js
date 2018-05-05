/**
 * @author:Fernando Hu
 * @class AgentReport
 * @extends Ext.Panel
 * @description [AgentReport]管理
 * @company 
 * @createtime:
 */
var store ;
var type = 0;


AgentReport = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				AgentReport.superclass.constructor.call(this, {
							id : 'AgentReportDay',
							title : '座席运营报表',
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel],
							listeners : {
								'beforeclose' :  function(p){
										//alert("beforeclose");
//									Ext.Ajax.request({
//						                    url : __ctxPath + "/customer/resetCountConHis.do", 
//						                    method : 'post',
//						                    success : function(response) {
//						                        alert("success");
//						                    }
//						                });
								}
							}
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
				
				//加载后台所有报表数据
					var store =new Ext.data.SimpleStore({
					
       				 autoLoad : true,
       				 

       				 url : __ctxPath + "/customer/getAllReportConHis.do",
       				 
					 fields:["loginname","endinboundcount","avaqueuecalltime","xmiaosucccount","queuecount","inboundtime","avagecalltime","afterworktime","avageafterworktime","kongxiantime",
						 	 "leavetime","lsworktime","meetingtime",
						 	 "managertime","traintime","nologintime","liyonglv","zongliyonglv","keyonglv","unansweredcount","endinboundcountlv"]
					});
				
				
				
				this.bbar = new Ext.PagingToolbar( {
	                pageSize :5,
	                store :store,
	                displayInfo :true,
	                displayMsg :'显示第{0}条到{1}条记录，一共{2}条',
	                emptyMsg :'没有记录'
	            });

				// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
//							layout : 'form',
//							region : 'north',
//							id : 'UlEmployeeSearchPanel',
//							colNums : 3,
							region:'north',
							height : 35,
							frame : false,
							border:false,
							id : 'AgentReportSearchPanel',
							layout : 'hbox',
							layoutConfig: {
				                    padding:'5',
				                    align:'middle'
				            },
							defaults : {
								xtype : 'label',
								border:false,
								margins:{top:0, right:4, bottom:4, left:4}
							},
							items : [{
                                        text : '座席号'
                                    }, {
                                        name : 'Searc_Report_agentid',
                                        xtype : 'textfield'
                                    }, {
										text : '区域'
									}, {
										name:'Searc_Reports_cunc',
		                                xtype : 'combo',
		                                hideLabel:true,
		                                lazyInit : false,
		                                store : [['1', '北京'],
												 ['2', '西安'],
												 ['3', '南京'],
												 ['4', '上海']]
									}, {
										text:'开始时间'
									}, {
										 name : 'Searc_Report_StarTime',
										 id : 'Searc_Report_StarTime',
										 xtype : 'datetimefield',
										 width : '100',
										 format:'Y-m-d H'
							 	    },
									{
										text:'结束时间'
									}, {
										 name : 'Searc_Report_EndTime',
										 id : 'Searc_Report_EndTime',
										 xtype : 'datetimefield',
										 width : '100',
										 format:'Y-m-d H'
							 	    }, {
										xtype : 'button',
										text : '查询',
										iconCls : 'search',
										scope:this,
										//handler : this.search
										handler : function (){
							 	    		var ReportInfo = "";

							 	    		var star = Ext.get("Searc_Report_StarTime").getValue();
							 	    		var end = Ext.get("Searc_Report_EndTime").getValue();
							 	    		var str = star + "#" + end;
							 	    		alert(str);
											if(star == "" && end == ""){//显示所有
												store.load({
													params : {
														'ReportInfo':'all'
													}
												});
											}else if(star != "" && end != ""){   
												store.load({
													params : {
														'ReportInfo':str
													}
												});
											}
										}
									}]
						});// end of searchPanel 

				this.topbar = new Ext.Toolbar({
							items : ['->', {
										iconCls : 'btn-add',
										text : '打印报表',
										hidden : false,
										xtype : 'button',
										scope : this,
										handler : function (){
											var strs = Ext.get("Searc_Report_StarTime").getValue() +"~"+ Ext.get("Searc_Report_EndTime").getValue()+"";
											//var strs = "2014-04-15 ~ 2014-04-15";
											//alert(strs);
											window.open('http://10.7.0.131:8080/s2sh_pro/index.jsp?day="'+strs+'"*AgentReport');
										}
									} ]
						});
				
				var sm =new Ext.grid.CheckboxSelectionModel({singleSelect:true});
				var cm = new Ext.grid.ColumnModel([sm,{}]);
				
				this.gridPanel = new HT.GridPanel({
					
					region : 'center',
					
					height:750,
					
					tbar : this.topbar,
					
				    bbar : this.bbar,
					
					store : store,
					
					//sm:new Ext.grid.CheckboxSelectionModel({singleSelect:true}),
					
					width:1000, 
					
					//sm : sm,
					
					//cm:cm,
					
					/*
					 * "loginname","endinboundcount","inboundtime","avagecalltime","afterworktime","avageafterworktime","kongxiantime",
						 	 "dates","leavetime","lsworktime","meetingtime",
						 	 "managertime","traintime","liyonglv","zongliyonglv","keyonglv","unansweredcount","endinboundcountlv"
					 */
					
					columns:[
							{header:"坐席名",dataIndex:"loginname"},
							
							{header:"接听电话个数",dataIndex:"endinboundcount"},
							
							{header:"平均电话等待时长",dataIndex:"avaqueuecalltime"},
							
							{header:"8秒后成功接听数",dataIndex:"xmiaosucccount"},
							
							{header:"转接数",dataIndex:"queuecount"},
							
							{header:"呼入通话时长",dataIndex:"inboundtime"},
							
							{header:"呼入平均通话时长",dataIndex:"avagecalltime"},
							
							{header:"呼入跟进时长",dataIndex:"afterworktime"},
							
							{header:"呼入平均跟进时长",dataIndex:"avageafterworktime"},
							
							{header:"空闲时间",dataIndex:"kongxiantime"},
							
							//{header:"日期",dataIndex:"dates"},
							
							{header:"离开时间",dataIndex:"leavetime"},
							
							{header:"临时工作时间",dataIndex:"lsworktime"},
							
							{header:"就餐时间",dataIndex:"meetingtime"},
							
							{header:"管理时间",dataIndex:"managertime"},
							
							{header:"培训时间",dataIndex:"traintime"},
							
							{header:"未登录时间",dataIndex:"nologintime"},
							
							{header:"有效利用率",dataIndex:"liyonglv"},
							
							{header:"总利用率",dataIndex:"zongliyonglv"},
							
							{header:"可用率",dataIndex:"keyonglv"},
							
							{header:"放弃数",dataIndex:"unansweredcount"},
							
							{header:"成功接听率",dataIndex:"endinboundcountlv"}
					],
					
					autoExpandColumn:2

				});


			},// end of the initComponents()
			// 重置查询表单
			reset : function() {
				this.searchPanel.getForm().reset();
			},
			// 按条件搜索
			search : function() {
				
				$search({
							//searchPanel : this.searchPanel,
							gridPanel : this.gridPanel
						});
			},
			// GridPanel行双击 处理事件
			rowClick : function(grid, rowindex, e) {
				grid.getSelectionModel().each(function(record) {
							var tabs = Ext.getCmp('centerTabPanel');
							var aForm = Ext.getCmp('UlEmployeeFormWin');
							if (aForm != null) {
								tabs.remove('UlEmployeeFormWin');
							}
							aForm = new UlEmployeeForm({
										useid : record.data.useid,
										huji : [0, record.data.hujiSheng, 
										        record.data.hujiShi, record.data.hujiDiqu],
										gongzuodi : [0, record.data.gongzuodiSheng, 
												        record.data.gongzuodiShi, record.data.hujiDiqu ]
									});
							aForm.setTitle('员工:' + record.data.fullname + '详情');
							tabs.add(aForm);
							tabs.activate(aForm);
						});
			},
			// 创建记录
			createRs : function() {
				// new UlEmployeeForm().show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('UlEmployeeFormWin');
				if (aForm != null) {
					aForm.destroy();
				}
				aForm = new UlEmployeeForm();
				aForm.setTitle('员工档案添加');
				tabs.add(aForm);
				tabs.activate(aForm);
			},
			// 行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this, record.data.useid);
						break;
					case 'btn-edit' :
						this.editRs.call(this, record);
						break;
					case 'btn-setting' :
						this.enableRs.call(this, record);
						break;
					default :
						break;
				}
			}
		});
