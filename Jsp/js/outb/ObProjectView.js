/**
 * @author:cf0666@gmail.com
 * @class ObProjectView
 * @extends Ext.Panel
 * @description [ObProject]管理
 * @company 优创融联科技
 * @createtime:
 */
ObProjectView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
	
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				ObProjectView.superclass.constructor.call(this, {
							id : 'ObProjectViewWin',
							title : '营销项目管理',
							region : 'center',
							layout : 'border',
							iconCls:'menu-section-view', 
							
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
				var fieldnameComboData = [
						['projNam', '项目名称','text',''],
						['projAliNam', '项目简称', 'text',''],
						['projCod', '项目编号','text',''],
						['projTypId', '项目类别','text',''],
						['ownerTeam', '所属机构','text',''],
						['perIncharge', '负责人', 'text',''],
						['srouceId', '来源','combo','CONOB_PROJECT_YWLX'],
						['staDat', '开始时间', 'date',''],
						['endDat', '截止时间', 'date',''],
						['busiTypId', '业务类型','combo','CONOB_PROJECT_YWLX'],
						['execTypId','执行方式','combo','CONOB_PROJECT_ZXFS'],
						['projJianjie', '项目简介','textarea']]
				var ObProjectAdvancedSearchWin = Ext.extend(
						MT.AdvancedSearchWin, {
							title : '营销项目高级查询',
							fieldData : fieldnameComboData
						});
				// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'ObProjectSearchPanel',
							height : 35,
							items : [{
								xtype:'panel',
								width:70,
								style:'text-align:right',
								html:'项目名称：'
							},{
										name : 'Q_projNam_S_LK',
										xtype : 'textfield'
							},
							{
								xtype:'panel',
								width:70,
								style:'text-align:right',
								html:'项目类型：'
							}, {
										name : 'obProject.busiTypName',
										hiddenName : 'obProject.busiTypId',
										id : 'OB_Project_Tree_01',
										anchor : '100%',
										xtype : 'treecomboz',
										lazyInit : false,
										tplId : 'tree_tpl',
										rootVisible : false,
										editable : false,
								    	forceSelection : false,
								    	url : __ctxPath+ '/system/treeByMapNameDictionary.do?mapName=CONTPJYLX&relDic=10841'
							}, {
								xtype:'panel',
								width:45,
								style:'text-align:right',
								html:'状态：'
							},
							 {
								hiddenName : 'Q_projStaId_SN_EQ',
								xtype : 'mtdiccombo',
								editable : false,
								lazyInit : false,
								forceSelection : false,
								itemKey : 'CONOB_PROJECT_ZT'
							},
//							{
//								xtype:'panel',
//								width:70,
//								style:'text-align:right',
//								html:'项目阶段：'
//							},{
//
//										hiddenName : 'Q_projTypId_SN_EQ',
//										xtype : 'mtdiccombo',
//										editable : true,
//										lazyInit : false,
//										forceSelection : false,
//										itemKey : 'CONOB_PROJECT_XMLB'
//							}, 
									{
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
											new ObProjectAdvancedSearchWin()
													.show();
										}
									}, {
										name : 'Q_busiTypId_SN_EQ',
										id : 'OB_Project_Tree_Hidden_01',
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

				this.topbar = new Ext.Toolbar({
							items : ['->',{
										iconCls : 'btn-add',
										// text : __create+'[ObProject]',
										text : __create,
										xtype : 'button',
										scope : this,
										handler : this.createRs
									}
//									,
//										{
//										iconCls : 'btn-newFlow',
//										// text : __create+'[ObProject]',
//										text : '申请',
//										xtype : 'button',
//										scope : this,
//										handler:this.newFlow
////										handler : function(){
////											var tabs = Ext.getCmp('centerTabPanel');
////											var aForm = Ext.getCmp('ObProjectApplyForm');
////											if (aForm != null) {
////												tabs.remove('ObProjectApplyForm');
////											}
////											aForm = new ObProjectApplyForm();
////											tabs.add(aForm);
////											tabs.activate(aForm);
////										}
//									},
//									{
//										iconCls : 'btn-setting',
//										// text : __create+'[ObProject]',
//										text : '启用',
//										xtype : 'button',
//										scope : this,
//										handler : this.doneSelRs
//									}
//									, {
//										iconCls : 'btn-del',
//										// text : __delete+'[ObProject]',
//										text :'删除 / 注销' ,//__delete
//										xtype : 'button',
//										scope : this,
//										handler : this.removeSelRs
//									}
									]
						});

				this.gridPanel = new HT.GridPanel({
					region : 'center',
					tbar : this.topbar,
					// 使用RowActions
					rowActions : true,
					printable : false,
					exportable : false,
					showSm : false,
					id : 'ObProjectGrid',
					url : __ctxPath + "/outb/listObProject.do",
					fields : [{
								name : 'projId',
								type : 'int'
							}, 'projNam', 'projAliNam', 'projCod', 'projTypId',
							'ownerTeam', 'perIncharge', 'srouceId', 'staDat',
							'endDat', 'busiTypId', 'execTypId', 'projJianjie',
							'projConFile', 'remark', 'creUseId', 'creTime',
							'updUseId', 'updTime', 'projStaId', 'runid',
							'nodeName','ownerTeamName','perInchargeName'],
					columns : [{
								header : 'projId',
								dataIndex : 'projId',
								hidden : true
							}, {
								header : '项目名称',
								isExp : false,
								dataIndex : 'projNam'
							}, {
								header : '项目编号',
								isExp : false,
								dataIndex : 'projCod'
							}, 
							{
								header : '项目类型',
								isExp : false,
								dataIndex : 'busiTypId',
								renderer : function(value) {
									return CONTPJYLX.get(value);
								}
							},
								{
								header : '阶段',
								isExp : false,
								dataIndex : 'projTypId',
								renderer : function(value) {
									return CONOB_PROJECT_XMLB.get(value);
								}
							}, {
								header : '开始时间',
								isExp : false,
								dataIndex : 'staDat',
								renderer : function(value) {
									if(value != null){
										return value.substr(0,10);
									}
									return value;
								}
							}, {
								header : '结束时间',
								isExp : false,
								dataIndex : 'endDat',
								renderer : function(value) {
									if(value != null){
										return value.substr(0,10);
									}
									return value;
								}
							}, {
								header : '负责人',
								isExp : false,
//								dataIndex : 'perIncharge'
								dataIndex : 'perInchargeName'
							}, {
								header : '状态',
								isExp : false,

								dataIndex : 'projStaId',
								renderer : function(value) {
									return CONOB_PROJECT_ZT.get(value);
								}
							}, new Ext.ux.grid.RowActions({
										header : __action,
										width : 100,
										actions : [ {
													iconCls : 'btn-edit',
													qtip : '修改',
													style : 'margin:0 3px 0 3px'
												}, {
													iconCls : 'control_pause', 
													id : 'OB_P_control_pause',
													qtip : '暂停',
													style : 'margin:0 3px 0 3px'
													,fn : function(record) {
														var status = record.get('projStaId');
														if (status == '2') {//2——执行中
															return true;
														} else {
//															Ext.getCmp("OB_P_control_pause").setVisiable(false);
															return false;
														}
													}
												},{},{
													iconCls : 'btn-reset',
													qtip : '恢复',
													style : 'margin:0 3px 0 3px'
													,fn : function(record) {
														var status = record.get('projStaId');
														if(status=='3') {//3——停止
															return true;
														} else {
															return false;
														}
													}
												},
//													{
//													iconCls : 'btn-newFlow',
//													qtip : '申请',
//													style : 'margin:0 3px 0 3px'
//												},
//													{
//													iconCls : 'btn-setting',
//													qtip : '启用',
//													style : 'margin:0 3px 0 3px'
//												}, 
												{
													iconCls : 'btn-del',
													qtip : '注销/删除',
													style : 'margin:0 3px 0 3px'
													,fn : function(record) {
														var status = record.get('projStaId');
														if(status=='0' || status=='2') {//0——未启用、2——执行中
															return true;
														} else {
															return false;
														}
													}
												}
//												,{
//													iconCls : 'btn-del',
//													qtip : '注销',
//													style : 'margin:0 3px 0 3px',
//													fn : function(record) {
//														var status = record.get('projStaId');
//														if(status=='0') {//3——停止
//															return true;
//														} else {
//															return false;
//														}
//													}
//												}
												],
										listeners : {
											scope : this,
											'action' : this.onRowAction
										}
									})]
						// end of columns
				});

				this.gridPanel.addListener('rowdblclick', this.rowClick);

			},// end of the initComponents()
			newFlow : function(record) {
				defId = '10200';
				name = '启动流程';
				var contentPanel = App.getContentPanel();
				var startForm = contentPanel.getItem('ProcessRunStart' + defId);
		
				if (!startForm) {
					startForm = new ProcessRunStart({
								id : 'ProcessRunStart' + defId,
								defId : defId,
								flowName : name
							});
					contentPanel.add(startForm);
				}
				contentPanel.activate(startForm);
			},
			// 重置查询表单
			reset : function() {
				Ext.getCmp("OB_Project_Tree_01").setValue('');
				Ext.getCmp("OB_Project_Tree_01").setItemIndex('');
				this.searchPanel.getForm().reset();
			},
			// 按条件搜索
			onSearch : function(obj) {
				var busiTypId = Ext.getCmp("OB_Project_Tree_01").getItemIndex();
				Ext.getCmp("OB_Project_Tree_Hidden_01").setValue(busiTypId);
				$search({
						searchPanel : this.searchPanel,
						gridPanel : this.gridPanel
					});
			},
			// GridPanel行点击处理事件
			rowClick : function(grid, rowindex, e) {
				
				var record = grid.getSelectionModel().each(function(record) {
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ObProjectDelFormWin');
				if (aForm != null||aForm != undefined) {
					tabs.removeAll('ObProjectDelFormWin');
				}
				aForm = new ObProjectDelForm({
							projId : record.data.projId
						});
				tabs.add(aForm);
				tabs.activate(aForm);
				});
			},
			// 创建记录
			createRs : function() {
				// new ObProjectForm().show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ObProjectFormWin');
				if (aForm != null) {
					tabs.remove('ObProjectFormWin');
				}
				aForm = new ObProjectForm();
				tabs.add(aForm);
				tabs.activate(aForm);

			},
			// 按ID删除记录
			removeRs : function(id,projStaId) {
				if('0'==projStaId) {
					$postSubmit({
							url : __ctxPath + '/outb/multiDelObProject.do',
							ids : id,
							grid : this.gridPanel,
							msgTip : '您确认要删除所选记录吗？',
							msgSuccess : '成功删除该记录！',
							msgFailure : '操作出错，请联系管理员！'
					});					
				} else {
						Ext.Ajax.request({
							url :  __ctxPath + '/outb/changeStatusObProject.do?projId='+id,
							method : 'post',
							success : function(response) {
								var result = Ext.util.JSON.decode(response.responseText);//解析数据
								var isStatus = result.success;
								if(false == isStatus) {
									Ext.MessageBox.confirm('提示信息', '该项目下还有未完成的活动，是否确认注销？', function(btn){
										if('yes' == btn) {
											Ext.Ajax.request({
												url :  __ctxPath + '/outb/closeObProject.do?ids='+id,
												method : 'post',
												success : function(response) {
													var result = Ext.util.JSON.decode(response.responseText);//解析数据
													if(true == result.success) {
														Ext.ux.Toast.msg('提示信息', '成功暂停该项目!');
														Ext.getCmp('ObProjectGrid').getStore().reload();
													} else {
														Ext.ux.Toast.msg('提示信息', '暂停该项目失败，请联系管理员!');
													}
												},
												failure : function() {
												}
											});
										}
									});
								} else {
									$postSubmit({
										url : __ctxPath + '/outb/multiDelObProject.do',
										ids : id,
										grid : Ext.getCmp('ObProjectGrid'),
										msgTip : '您确认要注销所选记录吗？',
										msgSuccess : '成功注销该记录！',
										msgFailure : '操作出错，请联系管理员！'
									});
								}
							},
							failure : function() {
							}
						});
				}
			},
			// 把选中ID删除
			removeSelRs : function() {
				$gridRs({
							url : __ctxPath + '/outb/multiDelObProject.do',
							grid : this.gridPanel,
							idName : 'projId',
							msgNull : '请选择要删除的记录！',
							msgTip : '您确认要删除所选记录吗？',
							msgSuccess : '成功删除所选记录！',
							msgFailure : '操作出错，请联系管理员！'
						});
			},
			// 修改Rs
			editRs : function(record) {
				// new ObProjectForm({
				// projId : record.data.projId
				// }).show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ObProjectDelFormWin');
				if (aForm != null) {
					tabs.remove('ObProjectDelFormWin');
				}
				aForm = new ObProjectDelForm({
							projId : record.data.projId
						});
				tabs.add(aForm);
				tabs.activate(aForm);
			},
			//把选中的项目启动
			doneSelRs:function(){
				$gridRs({
					url : __ctxPath + '/outb/enableObProject.do',
					grid : this.gridPanel,
					idName : 'projId',
					msgNull : '请选择要启动的项目！',
					msgTip : '您确认要启动所选项目吗？',
					msgSuccess : '成功启动所选项目！',
					msgFailure : '操作出错，请联系管理员！'
				});
			},
			// 按ID启用记录
			doneRs : function(id) {
				$postSubmit({
							url : __ctxPath + '/outb/enableObProject.do',
							ids : id,
							grid : this.gridPanel,
							msgTip : '您确认要启动该项目吗？',
							msgSuccess : '成功启动该项目！',
							msgFailure : '操作出错，请联系管理员！'
						});
			},

			// 暂停
			pauseSta : function(id) {
				Ext.Ajax.request({
					url :  __ctxPath + '/outb/changeStatusObProject.do?projId='+id,
					method : 'post',
					success : function(response) {
						var result = Ext.util.JSON.decode(response.responseText);//解析数据
						var isStatus = result.success;
						if(false == isStatus) {
							Ext.MessageBox.confirm('提示信息', '该项目下还有未完成的活动，是否确认暂停？', function(btn){
								if('yes' == btn) {
									Ext.Ajax.request({
										url :  __ctxPath + '/outb/pauseObProject.do?ids='+id,
										method : 'post',
										success : function(response) {
											var result = Ext.util.JSON.decode(response.responseText);//解析数据
											if(true == result.success) {
												Ext.ux.Toast.msg('提示信息', '成功暂停该项目!');
												Ext.getCmp('ObProjectGrid').getStore().reload();
											} else {
												Ext.ux.Toast.msg('提示信息', '暂停该项目失败，请联系管理员!');
											}
										},
										failure : function() {
										}
									});
								}
							});
						} else {
							$postSubmit({
								url : __ctxPath + '/outb/pauseObProject.do',
								ids : id,
								grid : Ext.getCmp('ObProjectGrid'),//获取gridPanel，切记，不可用this.gridPanel，因为this此时指向的是Ajax的对象
								msgTip : '您确认要暂停该项目吗？',
								msgSuccess : '成功暂停该项目！',
								msgFailure : '操作出错，请联系管理员！'
							});
						}
					},
					failure : function() {
					}
				});
			},
			// 状态值转换
			resetSta : function(id) {
				$postSubmit({
							url : __ctxPath + '/outb/recoverObProject.do',
							ids : id,
							grid : this.gridPanel,
							msgTip : '您确认要恢复该项目吗？',
							msgSuccess : '成功恢复该项目！',
							msgFailure : '操作出错，请联系管理员！'
						});
			},
			// 行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' ://删除
						this.removeRs.call(this, record.data.projId,record.data.projStaId);
						break;
					case 'btn-edit' ://修改
						this.editRs.call(this, record);
						break;
					case 'btn-setting' ://启用
						this.doneRs.call(this, record.data.projId);
						break;
					case 'btn-newFlow' ://申请
						this.newFlow.call(this, record);
						break;
						
					case 'control_pause' ://暂停
						this.pauseSta.call(this, record.data.projId);
						break;
					case 'btn-reset' ://恢复
						this.resetSta.call(this, record.data.projId);
						break;
					default :
						break;
				}
			}
		});
