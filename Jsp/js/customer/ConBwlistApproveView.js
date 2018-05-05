/**
 * @author:cf0666@gmail.com
 * @class ConBwlistApproveView
 * @extends Ext.Panel
 * @description [ConBwlistApprove]管理
 * @company 优创融联科技
 * @createtime:
 */
ConBwlistApproveView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				ConBwlistApproveView.superclass.constructor.call(this, {
							id : 'ConBwlistApproveViewWin',
							title : '黑名单审批管理',
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
				var fieldnameComboData = [
						['approveTitle', '黑名单审批单头', new Ext.form.TextField({
											name : 'approveTitle',
											allowBlank : true
										})],
						['approveComment', '备注', new Ext.form.TextField({
											name : 'approveComment',
											allowBlank : true
										})],
						['bwlistStatus', '状态&CONZT',
								new Ext.form.NumberField({
											name : 'bwlistStatus',
											allowBlank : true
										})],
						['runid', 'RUNID', new Ext.form.NumberField({
											name : 'runid',
											allowBlank : true
										})],
						['createBy', '创建人', new Ext.form.TextField({
											name : 'createBy',
											allowBlank : true
										})],
						['updateBy', '修改人', new Ext.form.TextField({
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
										})],
						['userid', '申请人', new Ext.form.NumberField({
											name : 'userid',
											allowBlank : true
										})],
						['isDelete', '删除标记', new Ext.form.NumberField({
											name : 'isDelete',
											allowBlank : true
										})],
						['nodeName', '审批节点名称', new Ext.form.TextField({
											name : 'nodeName',
											allowBlank : true
										})],
						['approvalStatus', '审批状态', new Ext.form.TextField({
											name : 'approvalStatus',
											allowBlank : true
										})]]
				var ConBwlistApproveAdvancedSearchWin = Ext.extend(
						MT.AdvancedSearchWin, {
							title : '[ConBwlistApprove]高级查询',
							fieldData : fieldnameComboData
						});
				// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'ConBwlistApproveSearchPanel',
							height : 35,
							items : [{
										text : '黑名单审批标题'
									},{

										name : 'Q_approveTitle_S_LK',
										xtype : 'textfield'
//									}, {
//										name : 'Q_approveComment_S_EQ',
//										xtype : 'textfield'
//									}, {
//										hiddenName : 'Q_bwlistStatus_N_EQ',
//										xtype : 'mtdiccombo',
//										editable : true,
//										lazyInit : false,
//										forceSelection : false,
//										itemKey : 'CONZT'
//									}, {
//										name : 'Q_runid_N_EQ',
//										xtype : 'numberfield'
//									}, {
//										name : 'Q_createBy_S_EQ',
//										xtype : 'textfield'
//									}, {
//										name : 'Q_updateBy_S_EQ',
//										xtype : 'textfield'
//									}, {
//										name : 'Q_createDate_D_EQ',
//										xtype : 'datefield',
//										format : 'Y-m-d'
//									}, {
//										name : 'Q_updateDate_D_EQ',
//										xtype : 'datefield',
//										format : 'Y-m-d'
//									}, {
//										name : 'Q_userid_L_EQ',
//										xtype : 'numberfield'
//									}, {
//										hiddenName : 'Q_isDelete_N_EQ',
//										xtype : 'combo',
//										editable : false,
//										mode : 'local',
//										triggerAction : 'all',
//										store : [['1', __yes], ['0', __no]]
//									}, {
//
//										name : 'Q_nodeName_S_EQ',
//										xtype : 'textfield'
									}, {
										text : "审批状态"
									}, {
										hiddenName : 'Q_approvalStatus_S_EQ',
						                                xtype : 'combo',
						                                mode : 'local',
						                                editable : false,
						                                triggerAction : 'all',
						                                store : new Ext.data.ArrayStore({
						                                                fields : ['myId', 'displayText'],
						                                                data : [['审批完毕', '审批完毕'], ['审批中', '审批中']]
						                                            }),
						                                valueField : 'myId',
						                                displayField : 'displayText'
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
											new ConBwlistApproveAdvancedSearchWin()
													.show();
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
							items : [{
										iconCls : 'btn-add',
										//text : __create+'[ConBwlistApprove]',
										text : __create,
										xtype : 'button',
										scope : this,
										handler : this.createRs
									}, {
										iconCls : 'btn-del',
										//text : __delete+'[ConBwlistApprove]',
										text : __delete,
										xtype : 'button',
										scope : this,
										handler : this.removeSelRs
									}]
						});

				this.gridPanel = new HT.GridPanel({
					region : 'center',
//					tbar : this.topbar,
					//使用RowActions
					rowActions : true,
					printable : false,
					exportable : false,
					id : 'ConBwlistApproveGrid',
					url : __ctxPath + "/customer/listFlowConBwlistApprove.do",
					 baseParams : {
              		  flowType : 'ConBwListFlowView'// 流程类型key
          			  },
					fields : [{
								name : 'bwlistApproveId',
								type : 'int'
							}, 'approveTitle', 'approveComment',
							'bwlistStatus', 'createBy', 'updateBy',
							'createDate', 'updateDate', 'applyUser', 'isDelete',
							'nodeName', 'approvalStatus','tasks', 'runid', 'nodeName', 'piId'],
					columns : [{
								header : 'bwlistApproveId',
								dataIndex : 'bwlistApproveId',
								hidden : true
							}, {
								header : '黑名单审批标题',
								isExp : false,
								dataIndex : 'approveTitle'
							}, {
								header : '备注',
								isExp : false,
								dataIndex : 'approveComment'
//							}, {
//								header : '状态',
//								isExp : false,
//								dataIndex : 'bwlistStatus',
//								renderer : function(value) {
//									return CONZT.get(value);
//								}
//							}, {
//								header : 'RUNID',
//								isExp : false,
//								dataIndex : 'runid'
//							}, {
//								header : '创建人',
//								isExp : false,
//								dataIndex : 'createBy'
//							}, {
//								header : '修改人',
//								isExp : false,
//								dataIndex : 'updateBy'
//							}, {
//								header : '创建时间',
//								isExp : false,
//								dataIndex : 'createDate'
//							}, {
//								header : '修改时间',
//								isExp : false,
//								dataIndex : 'updateDate'
							}, {
								header : '申请人',
								isExp : false,
								dataIndex : 'applyUser',
								renderer : function(value){
									return value != null ? value.fullname : '';
								}
//							}, {
//								header : '删除标记',
//								isExp : false,
//								dataIndex : 'isDelete',
//								renderer : function(value) {
//									return value == '0' ? __no : __yes;
//								}
//							}, {
//								header : '审批节点名称',
//								isExp : false,
//								dataIndex : 'nodeName'
							}, {
								header : '审批状态',
								isExp : false,
								dataIndex : 'approvalStatus'
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
			//                              if (curUserInfo.userId == tasks[i].userId) {
			//                                  if (tasks[i].taskName == node) {
			//                                      reVal += '<a href="#"  onclick="App.MyDesktopClickTopTab(\'ProcessNextForm\',{taskId:'
			//                                              + tasks[i].taskId
			//                                              + ',activityName:\''
			//                                              + tasks[i].taskName
			//                                              + '\'})">';
			//                                  }
			//
			//                              }
			                                reVal += tasks[i].fullname
			                                if(i>1)
                                        	reVal += ',';
			                                if (curUserInfo.userId == tasks[i].userId) {
			                                    reVal += "</a>";
			                                }
			                                reVal += ')&nbsp;&nbsp;';
			                            }
			                        }
			                    }else{
			                        reVal = '流程结束';
			                    }
			                    return reVal;
			                }
			//        
			            }, new Ext.ux.grid.RowActions({
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
				                                        if (curUserInfo.userId == tasks[i].userId) {
				                                            return true;
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

//				this.gridPanel.addListener('rowdblclick', this.rowClick);

			},// end of the initComponents()
			//重置查询表单
			reset : function() {
				this.searchPanel.getForm().reset();
			},
			//按条件搜索
			onSearch : function(obj) {
				//				var searchPanel = Ext.getCmp('ConBwlistApproveSearchPanel');
				//				var gridPanel = Ext.getCmp('ConBwlistApproveGrid');
				//				if (searchPanel.getForm().isValid()) {
				$search({
							searchPanel : this.searchPanel,
							gridPanel : this.gridPanel
						});
				//				}
			},
			//GridPanel行点击处理事件
			rowClick : function(grid, rowindex, e) {
				grid.getSelectionModel().each(function(rec) {
							new ConBwlistApproveForm({
										bwlistApproveId : rec.data.bwlistApproveId
									}).show();
						});
			},
			//创建记录
			createRs : function() {
				//new ConBwlistApproveForm().show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ConBwlistApproveForm');
				if (aForm != null) {
					tabs.remove('ConBwlistApproveForm');
				}
				aForm = new ConBwlistApproveForm();
				tabs.add(aForm);
				tabs.activate(aForm);
			},
			//按ID删除记录
			removeRs : function(id) {
				$postSubmit({
							url : __ctxPath
									+ '/customer/multiDelConBwlistApprove.do',
							ids : id,
							grid : this.gridPanel,
							msgTip : '您确认要删除所选记录吗？',
							msgSuccess : '成功删除该记录！',
							msgFailure : '操作出错，请联系管理员！'
						});
			},
			//把选中ID删除
			removeSelRs : function() {
				$gridRs({
							url : __ctxPath
									+ '/customer/multiDelConBwlistApprove.do',
							grid : this.gridPanel,
							idName : 'bwlistApproveId',
							msgNull : '请选择要删除的记录！',
							msgTip : '您确认要删除所选记录吗？',
							msgSuccess : '成功删除该记录！',
							msgFailure : '操作出错，请联系管理员！'
						});
			},
			//编辑Rs
			editRs : function(record) {
				//new ConBwlistApproveForm({
				//	bwlistApproveId : record.data.bwlistApproveId
				//}).show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ConBwlistApproveForm');
				if (aForm != null) {
					tabs.remove('ConBwlistApproveForm');
				}
				aForm = new ConBwlistApproveForm({
							bwlistApproveId : record.data.bwlistApproveId
						});
				tabs.add(aForm);
				tabs.activate(aForm);
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
		
		        contentPanel.activate(nextForm);
		    },
			 // 审核跟踪
			trackRs : function(rec) {
				var tabs = Ext.getCmp('centerTabPanel');
				var edit = tabs.getItem('ConBwListFlowForm');
		
				if (edit != null) {
					tabs.remove('ConBwListFlowForm');
				}
				edit = new ConBwListFlowForm({
							id : rec.data.bwlistApproveId,
							runId : rec.data.runid,
							piId : rec.data.piId
						});
				tabs.add(edit);
				tabs.activate(edit);
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
					default :
					break;
				}
			}
		});
