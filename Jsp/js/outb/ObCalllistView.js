/**
 * @author:cf0666@gmail.com
 * @class ObCalllistView
 * @extends Ext.Panel
 * @description [ObCalllist]管理
 * @company 优创融联科技
 * @createtime:
 */
ObCalllistView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents(_cfg);
				// 调用父类构造
				ObCalllistView.superclass.constructor.call(this, {
							id : 'ObCalllistViewWin',
							title : '呼叫名单管理',
							region : 'center',
							layout : 'border',
							iconCls:'menu-mobile',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function(_cfg) {

				var fieldnameComboData = [
						['projId', '项目内码', new Ext.form.ComboBox({
									editabel : false,
									lazyInit : false,
									triggerAction : 'all',
									store : new Ext.data.SimpleStore({
												autoLoad : true,
												url : __ctxPath
														+ '/outb/listProjObProject.do',
												fields : ['projId',
														'projIdName']
											}),
									displayField : 'projIdName',
									valueField : 'projId',
									id : 'projId'
								})],
						['calllistNam', '名单列表名称', new Ext.form.TextField({
											name : 'calllistNam',
											allowBlank : true
										})],
						['calllistResouce', '名单来源&CONOB_MDLY',
								new MT.DicComboBox({
											hiddenName : 'calllistResouce',
											itemKey : 'CONOB_CALLLIST_ZT'
										})],
						['ownerTeam', '所属机构', new MT.DicComboBox({
											hiddenName : 'ownerTeam',
											itemKey : 'CONOB_CALLLIST_ZT'
										})],
						['calllistTypId', '名单类型：自定义&CONOB_CALLLIST_MDLX',
								new MT.DicComboBox({
											hiddenName : 'calllistTypId',
											itemKey : 'CONOB_CALLLIST_ZT'
										})],
						['cusTypId', '客户类型：个人客户，企业客户&CONOB_CALLLIST_KHLX',
								new MT.DicComboBox({
											hiddenName : 'cusTypId',
											itemKey : 'CONOB_CALLLIST_ZT'
										})],
						['staDat', '开始时间', new Ext.form.DateField({
											hiddenName : 'staDat',
											format : 'Y-m-d'
										})],
						['endDat', '结束时间', new Ext.form.DateField({
											hiddenName : 'endDat',
											format : 'Y-m-d'
										})],
						['remark', '备注', new Ext.form.TextField({
											name : 'remark',
											allowBlank : true
										})],
						['creUseId', '创建人', new MT.DicComboBox({
											hiddenName : 'creUseId',
											itemKey : 'CONOB_CALLLIST_ZT'
										})],
						['creTime', '创建时间', new Ext.form.DateField({
											hiddenName : 'creTime',
											format : 'Y-m-d'
										})],
						['updUseId', '修改人', new MT.DicComboBox({
											hiddenName : 'updUseId',
											itemKey : 'CONOB_CALLLIST_ZT'
										})],
						['updTime', '修改时间', new Ext.form.DateField({
											hiddenName : 'updTime',
											format : 'Y-m-d'
										})],
						['calllistStaId',
								'状态：0=有效 1=无效 2=关闭&CONOB_CALLLIST_ZT',
								new MT.DicComboBox({
											hiddenName : 'calllistStaId',
											itemKey : 'CONOB_CALLLIST_ZT'
										})]]
				var ObCalllistAdvancedSearchWin = Ext.extend(
						MT.AdvancedSearchWin, {
							title : '[ObCalllist]高级查询',
							fieldData : fieldnameComboData
						});
				// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'ObCalllistSearchPanel',
							height : 35,
							items : [{
										xtype : 'panel',
										width : 70,
										style : 'text-align:right',
										html : '名单名称:'

									}, {

										name : 'Q_calllistNam_S_LK',
										xtype : 'textfield'
									}, {
										xtype : 'panel',
										width : 70,
										style : 'text-align:right',
										html : '来源:'

									}, {

										hiddenName : 'Q_calllistResouce_SN_EQ',
										xtype : 'mtdiccombo',
										editable : false,
										lazyInit : false,
										forceSelection : false,
										itemKey : 'CONOB_MDLY'
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
											new ObCalllistAdvancedSearchWin()
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
							items : ['->', {
										iconCls : 'btn-add',
										// text : __create+'[ObCalllist]',
										text : __create,
										xtype : 'button',
										scope : this,
										handler : this.createRs
									}, {
										iconCls : 'btn-setting',
										// text : __create+'[ObCalllist]',
										text : '启动',
										xtype : 'button',
										scope : this,
										handler : this.doneSelRs
									}, {
										iconCls : 'btn-del',
										// text : __delete+'[ObCalllist]',
										text : __delete,
										xtype : 'button',
										scope : this,
										handler : this.removeSelRs
									}]
						});

				this.gridPanel = new HT.GridPanel({
					region : 'center',
					tbar : this.topbar,
					// 使用RowActions
					rowActions : true,
					printable : false,
					exportable : false,
					id : 'ObCalllistGrid',
					url : __ctxPath + "/outb/listObCalllist.do",
					fields : [{
								name : 'calllistId',
								type : 'int'
							},'calllistNam','calllistCode','calllistTypId','calllistResouce','comNam','ownerTeamName','staDat',
							'endDat','calllistStaId','isCanClear','comId','calllistId'    
							//'obCalllist','ownerTeam',  'cusTypId',  'remark', 'creUseId', 'creTime','updUseId', 'updTime' 
							],
					columns : [{
								header : 'calllistId',
								dataIndex : 'calllistId',
								hidden : true
							}, {
								header : '名称',
								isExp : false,

								dataIndex : 'calllistNam'
							}, {
								header : '名单编号',
								isExp : false,

								dataIndex : 'calllistCode'
							}, {
								header : '名单类型',
								isExp : false,

								dataIndex : 'calllistTypId',
								renderer : function(value) {
									return CONOB_CALLLIST_MDLX.get(value);
								}
							}, {
								header : '名单来源',
								isExp : false,

								dataIndex : 'calllistResouce',
								renderer : function(value) {
									return CONOB_MDLY.get(value);
								}
							}, {
								header : '所属活动',
								isExp : false,

								dataIndex : 'comNam'
							}, {
								header : '所属机构',
								isExp : false,

								dataIndex : 'ownerTeamName'
							}, {
								header : '开始时间',
								isExp : false,

								dataIndex : 'staDat',
								renderer : function(value) {
									return value.substring(0, 10);
								}
							}, {
								header : '结束时间',
								isExp : false,
								dataIndex : 'endDat',
								renderer : function(value) {
									return value.substring(0, 10);
								}
							}, {
								header : '状态',
								isExp : false,

								dataIndex : 'calllistStaId',
								renderer : function(value) {
									return CONOB_CALLLIST_ZT.get(value);
								}
							}, new Ext.ux.grid.RowActions({
										header : __action,
										width : 120,
										actions : [{
													iconCls : 'btn-edit',
													qtip : __edit,
													style : 'margin:0 3px 0 3px'
//													,fn : function(record) {
//														var status = record.get('calllistStaId');
//														if (status == '0') {
//															return true;
//														} else {
//															return false;
//														}
//													}
												},{
													iconCls : 'btn-import',
													qtip : '导入',
													style : 'margin:0 3px 0 3px'
													,fn : function(record) {
														var status = record.get('calllistStaId');
														if (status == '0') {
															return true;
														} else {
															return false;
														}
													}
												}, {
													iconCls : 'btn-borrow',
													qtip : '清洗',
													style : 'margin:0 3px 0 3px'
													,fn : function(record) {
														var status = record.get('calllistStaId');
														var isCanClear=record.get('isCanClear');
														if (status == '0'&&isCanClear=='1') {
															return true;
														} else {
															return false;
														}
													}
												}, {
													iconCls : 'btn-setting',
													qtip : '启用',
													style : 'margin:0 3px 0 3px'
													,fn : function(record) {
														var status = record.get('calllistStaId');
														if (status == '2') {
															return true;
														} else {
															return false;
														}
													}
												},{
													iconCls : 'btn-del',
													qtip : '删除/注销',
													style : 'margin:0 3px 0 3px'
													,fn : function(record) {
														var status = record.get('calllistStaId');
														if (status == '1') {
															return false;
														} else {
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

				this.gridPanel.addListener('rowdblclick', this.rowClick);

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
			// GridPanel行点击处理事件
			rowClick : function(grid, rowindex, e) {
				grid.getSelectionModel().each(function(rec) {
							var tabs = Ext.getCmp('centerTabPanel');
							var aForm = Ext.getCmp('ObCalllistForm');
							if (aForm != null) {
								tabs.remove('ObCalllistForm');
							}
							aForm = new ObCalllistForm({
										calllistId : rec.data.calllistId
									});
							tabs.add(aForm);
							tabs.activate(aForm);
						});
			},
			// 创建记录
			createRs : function() {
				// new ObCalllistForm().show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ObCalllistFormWin');
				if (aForm != null) {
					tabs.remove('ObCalllistFormWin');
				}
				aForm = new ObCalllistForm();
				tabs.add(aForm);
				tabs.activate(aForm);

			},
			// 按ID删除记录(单行)
			removeRs : function(id) {
				Ext.Ajax.request({
							url : __ctxPath + '/outb/checkCanDelObCallbatch.do?index=0',
							params : {
								calllistID : id
							},
							method : 'post',
							success : function(response) {
								var result = Ext.util.JSON
										.decode(response.responseText);
								var status=result.success;		
								if(false==status) {
									Ext.ux.Toast.msg('操作提示', '该名单下有正在启用的批次,不能被删除！');
									return;
								} else {
//									$postSubmit({
//												url : __ctxPath + '/outb/multiDelObCalllist.do',
//												ids : id,
//												grid : this.gridPanel,
//												msgTip : '您确认要删除所选记录吗？',
//												msgSuccess : '成功删除该记录！',
//												msgFailure : '操作出错，请联系管理员！'
//											});
										$gridRs({
													url : __ctxPath + '/outb/multiDelObCalllist.do',
													grid : Ext.getCmp('ObCalllistGrid'),
													idName : 'calllistId',
													//msgNull : '请选择要删除的记录！',
													msgTip : '您确认要删除所选记录吗？',
													msgSuccess : '成功删除该记录！',
													msgFailure : '操作出错，请联系管理员！'
												});											
											
								}
							}
						});				
				
			},
			// 把选中ID删除(多行)
			removeSelRs : function() {
				var rows = this.gridPanel.getSelectionModel().getSelections();
				if (rows != null && rows.length > 0) {
				    var ids = '';
				     for (var i = 0; i < rows.length; i++) {
					     var calllistId=rows[i].data.calllistId;
				  	  	 if(ids=='') {
				  	     	 ids=calllistId;
				  	     } else {
			    	  		 ids+=','+calllistId;
				  	 	 }			    
				     }	
					Ext.Ajax.request({
								url : __ctxPath + '/outb/checkCanDelObCallbatch.do?index=1',
								params : {
									calllistID : ids
								},
								method : 'post',
								success : function(response) {
									var result = Ext.util.JSON
											.decode(response.responseText);
									var status=result.success;	
									if(false==status) {
										Ext.ux.Toast.msg('操作提示', '所选名单下有正在启用的批次,不能被删除！');
										return;
									} else {
										$gridRs({
													url : __ctxPath + '/outb/multiDelObCalllist.do',
													grid : Ext.getCmp('ObCalllistGrid'),
													idName : 'calllistId',
													msgNull : '请选择要删除的记录！',
													msgTip : '您确认要删除所选记录吗？',
													msgSuccess : '成功删除该记录！',
													msgFailure : '操作出错，请联系管理员！'
												});
									}
								}
							});					     
				} else {
				    	Ext.ux.Toast.msg('操作提示','请至少选择一个名单!');
			        	return;	
				}					
			},
			// 编辑Rs
			editRs : function(record) {
				// new ObCalllistForm({
				// calllistId : record.data.calllistId
				// }).show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ObCalllistFormWin');
				if (aForm != null) {
					tabs.remove('ObCalllistFormWin');
				}
				aForm = new ObCalllistForm({
							calllistId : record.data.calllistId,
							calllistSta:record.data.calllistStaId
						});
				tabs.add(aForm);
				tabs.activate(aForm);
			},
			//把选中的名单启动
			doneSelRs:function(){
				var flag=0;
				var rows = this.gridPanel.getSelectionModel().getSelections();
				if (rows != null && rows.length > 0) {
					var ids = new Array();
					for (var i = 0; i < rows.length; i++)
						if(rows[i].data.calllistStaId==0||rows[i].data.calllistStaId==1) {
					      flag=1;
						  Ext.ux.Toast.msg('操作提示', '您选择了不能启用的项,请重新选择！');
						  break;
						}
			    }
			    if(flag==0) {
					$gridRs({
						url : __ctxPath + '/outb/enableObCalllist.do',
						grid : this.gridPanel,
						idName : 'calllistId',
						msgNull : '请选择要启动的名单！',
						msgTip : '您确认要启动所选名单吗？',
						msgSuccess : '成功启动所选名单！',
						msgFailure : '操作出错，请联系管理员！'
					});
			    }
			},
			// 按ID启用记录
			doneRs : function(id) {
				$postSubmit({
							url : __ctxPath + '/outb/enableObCalllist.do',
							ids : id,
							grid : this.gridPanel,
							msgTip : '您确认要启动该名单吗？',
							msgSuccess : '成功启动该名单！',
							msgFailure : '操作出错，请联系管理员！'
						});
			},	
//			daoru : function(calllistId) {
//				// new ObCalllistForm({
//				// calllistId : record.data.calllistId
//				// }).show();
//				var tabs = Ext.getCmp('centerTabPanel');
//				var aForm = Ext.getCmp('step1');
//				var aForm2 = Ext.getCmp('step2');
//				if (aForm != null) {
//					tabs.remove('step1');
//				}
//				if (aForm2 != null) {
//					tabs.remove('step2');
//				}
//				ObCallbatchFormDaoRu(calllistId);
////				aForm = new ObCallbatchFormDaoRu({
////							calllistId : record.data.calllistId
////						});
////				tabs.add(aForm);
////				tabs.activate(aForm);
//			},			
			// 行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this, record.data.calllistId);
						break;
					case 'btn-edit' :
						this.editRs.call(this, record);
						break;
					case 'btn-import' :
						new ObCallbatchFormDaoRu(record.data.calllistId,record.data.comId);
						break;
					case 'btn-setting' ://启用
						this.doneRs.call(this, record.data.calllistId);
						break;	
					case 'btn-borrow':
//						new ObCallListWindow().show();//调用清洗window 
						new ObCallListClearnWindow({
										isClearnView : 'false',
										inChanel : 'ObCalllist',
										calllistId : record.data.calllistId
									}).show();// 调用清洗window
					break;
					default :
						break;
				}
			}
		});
