/**
 * @author:cf0666@gmail.com
 * @class AgentReport
 * @extends Ext.Panel
 * @description [AgentReport]管理
 * @company 
 * @createtime:
 */
var store ;

EveryDayReport = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				EveryDayReport.superclass.constructor.call(this, {
							id : 'EveryDayReport',
							title : '系统每日报表',
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel],
							listeners : {
								'beforeclose' :  function(p){

								}
							}
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
				
				//加载后台所有报表数据
					var store =new Ext.data.SimpleStore({
					
       				 autoLoad : true,
       				 
       				 url : __ctxPath + "/customer/getEveryDayReportConHis.do",
       				 
					 fields:["bottime","logincount","fwshuiping",
							 "endinboundcount","queueendcallcount",
							 "succendinbountcall","averagecalltime",
							 "avaafterworktime","liyonglv","keyonglv",
							 "avaqueuetime","maxqueuetime","sixtyreturn"
						 	]
					});
				

				// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							region:'north',
							height : 35,
							frame : false,
							border:false,
							id : 'EveryDayReportSearchPanel',
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
										text : '区域'
									}, {
//										hiddenName : 'Searc_Report_cunc',
//										xtype : 'textfield'
										name:'Searc_Report_cunc',
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
										 name : 'Searc_start_day',
										 xtype:'datetimefield',
										 width : '100',
										 format:'Y-m-d H'
							 	    }, {
										text:'结束时间'
									}, {
										 name : 'Searc_end_day',
										 xtype:'datetimefield',
										 width : '100',
										 format:'Y-m-d H'
							 	    }
//									, {
//										 text : '服务水平'
//											 
//									} , {
//										 name : 'Searc_FW',
//										 xtype : 'textfield',
//										 width: 70
//									 }
									, {
										xtype : 'button',
										text : '查询',
										iconCls : 'search',
										scope:this,
										//handler : this.search
										handler : function (){
							 	    		var start = Ext.get("Searc_start_day").getValue();
							 	    		var end = Ext.get("Searc_end_day").getValue();
							 	    		var str = start + "#" + end;
							 	    		//alert(day);
											if(start == "" && end == ""){
												store.load({
													params : {
														'eveReport':'all'
													}
												});
											}else if(start != "" && end != ""){
												store.load({
													params : {
														'eveReport':str
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
											var strs = Ext.get("Searc_start_day").getValue() +"~"+ Ext.get("Searc_end_day").getValue()+"";
											//alert(strs);
											window.open('http://10.160.4.87:8088/s2sh_pro/index.jsp?day="'+strs+'"*DayReport');
										}
									}]
						});
				
				
				
				this.gridPanel = new HT.GridPanel({
					
					region : 'center',
					
					height:750,
					
					tbar : this.topbar,
					
				  //bbar : this.bbar,
					
					store : store,
					
					width:1000, 
					
					columns:[
							{header:"起始时间",dataIndex:"bottime"},
							
							{header:"在线人数",dataIndex:"logincount"},
							
							{header:"服务水平",hidden:true,dataIndex:"fwshuiping"},
							
							{header:"呼入数",dataIndex:"endinboundcount"},
							
							{header:"成功接听数",dataIndex:"queueendcallcount"},
							
							{header:"成功接通率",dataIndex:"succendinbountcall"},
							
							{header:"平均通话时长",dataIndex:"averagecalltime"},
							
							{header:"平均跟进时长",dataIndex:"avaafterworktime"},
							
							{header:"有效利用率",dataIndex:"liyonglv"},
							
							{header:"可用率",dataIndex:"keyonglv"},
							
							{header:"队列平均等待时长",dataIndex:"avaqueuetime"},
							
							{header:"队列最长等待时长",dataIndex:"maxqueuetime"},
							
							{header:"60秒返回首页",dataIndex:"sixtyreturn"}
							
							//{header:"60秒返回首页",value:"null"}
							
//							, new Ext.ux.grid.RowActions({
//										header : '管理',
//										width : 40,
//										actions : [{
//													iconCls : 'btn-edit',
//													qtip : '查看',
//													style : 'margin:0 3px 0 3px'
//												}],
//										listeners : {
//											scope : this,
//											'action' : this.onRowAction
//										}
//									})
					],
					autoExpandColumn:2
					
						// end of columns
				});

				//this.gridPanel.addListener('rowdblclick', this.rowClick);

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
			// 按ID删除记录  按行删除
//			removeRs : function(id) {
//                Ext.Ajax.request({
//                    url : __ctxPath + '/xitong/multiDelUlEmployee.do',
//                    params : {
//                        ids : id
//                    },
//                    method : 'post',
//                    success : function(result, request) {
//                         var res = Ext.util.JSON.decode(result.responseText);
//                         if (res.success == false) {
//                            Ext.ux.Toast.msg('操作信息', '员工'+res.data+'存在关联，删除失败。\n其余用户成功删除');
//                         } else {
//                            Ext.ux.Toast.msg('操作信息', '删除成功!');
//                         }
//                         Ext.getCmp('UlEmployeeGrid').getStore().reload();
//                    }
//                });
//			},
			// 把选中ID删除
//			removeSelRs : function() {
//                var grid = this.gridPanel;
//                var rows = grid.getSelectionModel().getSelections();
//                if (rows != null && rows.length > 0) {
//                    var ids = new Array();
//                    for (var i = 0; i < rows.length; i++)
//                        ids.push(rows[i].data.useid);
//                }
//                Ext.Ajax.request({
//                    url : __ctxPath + '/xitong/multiDelUlEmployee.do',
//                    params : {
//                        ids : ids
//                    },
//                    method : 'post',
//                    success : function(result, request) {
//                         var res = Ext.util.JSON.decode(result.responseText);
//                         if (res.success == false) {
//                            Ext.ux.Toast.msg('操作信息', '员工'+res.data+'存在关联，删除失败。\n其余用户成功删除');
//                         } else {
//                            Ext.ux.Toast.msg('操作信息', '删除成功!');
//                         }
//                         Ext.getCmp('UlEmployeeGrid').getStore().reload();
//                    }
//                });
//			},
			// 按ID启用记录  按行启用
//			enableRs : function(record) {
//				Ext.Msg.confirm('启用操作', '你确定启用该员工?', function(btn) {
//					if (btn == 'yes') {
//						Ext.Ajax.request({
//							url : __ctxPath + '/xitong/multiEnableUlEmployee.do',
//							params : {
//								ids : record.data.useid
//							},
//							success : function(result, request) {
//								var res = Ext.util.JSON.decode(result.responseText);
//								if (res.success == false) {
//									Ext.ux.Toast.msg('操作信息', res.message);
//								} else {
//									Ext.ux.Toast.msg('操作信息', '启用成功!');
//								}
//								Ext.getCmp('UlEmployeeGrid').getStore().reload();
//							},
//							failure : function(result, request) {}
//						});
//					}
//				});
//			},
			// 把选中ID启用
//			enableSelRs : function() {
//				var grid = Ext.getCmp('UlEmployeeGrid');
//				var rows = grid.getSelectionModel().getSelections();
//				if (rows != null && rows.length > 0) {
//					var ids = new Array();
//					for (var i = 0; i < rows.length; i++)
//						ids.push(rows[i].data.useid);
//				}
//				Ext.Msg.confirm('启用操作', '你确定启用该员工?', function(btn) {
//					if (btn == 'yes') {
//						Ext.Ajax.request({
//							url : __ctxPath + '/xitong/multiEnableUlEmployee.do',
//							params : {
//								ids :ids
//							},
//							success : function(result, request) {
//								var res = Ext.util.JSON.decode(result.responseText);
//								if (res.success == false) {
//									Ext.ux.Toast.msg('操作信息', res.message);
//								} else {
//									Ext.ux.Toast.msg('操作信息', '启用成功!');
//								}
//								Ext.getCmp('UlEmployeeGrid').getStore().reload();
//							},
//							failure : function(result, request) {}
//						});
//					}
//				});
//			},
			// 编辑Rs
//			editRs : function(record) {
//	            var tabs = Ext.getCmp('centerTabPanel');
//	            var aForm = Ext.getCmp('UlEmployeeForm');
//	            if (aForm != null) {
//	                tabs.remove('UlEmployeeForm');
//	            }
//	            aForm = new UlEmployeeForm({
//	                        useid : record.data.useid,
//	                        huji : [0, record.data.hujiSheng, 
//	                                record.data.hujiShi, record.data.hujiDiqu],
//	                        gongzuodi : [0, record.data.gongzuodiSheng, 
//	                                        record.data.gongzuodiShi, record.data.hujiDiqu ]
//	                    });
//	            aForm.setTitle('员工:' + record.data.fullname + '详情');
//	            tabs.add(aForm);
//	            tabs.activate(aForm);
//	        },
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
