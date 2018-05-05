ObCallbatchView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				ObCallbatchView.superclass.constructor.call(this, {
							id : 'ObCallbatchViewWin',
							title : '导入批次管理',
							region : 'center',
							iconCls:'btn-changeTask',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
				/**
				 * var fieldnameComboData = [ ['calllistId', '名单列表内码', new
				 * Ext.form.ComboBox({ editabel : false, lazyInit : false,
				 * triggerAction : 'all', store : new Ext.data.SimpleStore({
				 * autoLoad : true, url : __ctxPath + '/outb/listcalllistId.do',
				 * fields : ['calllistId', 'calllistIdName'] }), displayField :
				 * 'calllistIdName', valueField : 'calllistId', id :
				 * 'calllistId' })], ['callbatchNam', '批次名称', new
				 * Ext.form.TextField({ name : 'callbatchNam', allowBlank : true
				 * })], ['callbatchDes', '批次描述', new Ext.form.TextField({ name :
				 * 'callbatchDes', allowBlank : true })], ['callbatchTypId',
				 * '批次类型：号码段、客户名单&CONOB_CALLBATCH_PCLX', new MT.DicComboBox({
				 * hiddenName : 'callbatchTypId', itemKey : 'CONOB_CALLBATCH_ZT'
				 * })], ['callbatchSrcId',
				 * '批次来源：本地文件、名单抽取、客户资料&CONOB_CALLBATCH_PCLY', new
				 * MT.DicComboBox({ hiddenName : 'callbatchSrcId', itemKey :
				 * 'CONOB_CALLBATCH_ZT' })], ['callbatchRegion', '所属地区,手工输入',
				 * new Ext.form.TextField({ name : 'callbatchRegion', allowBlank :
				 * true })], ['numberSta', '号码段开始，批次类型为号码段时必填', new
				 * Ext.form.TextField({ name : 'numberSta', allowBlank : true
				 * })], ['numberEnd', '号码段结束，批次类型为号码段时必填', new
				 * Ext.form.TextField({ name : 'numberEnd', allowBlank : true
				 * })], ['staDat', '开始时间', new Ext.form.DateField({ hiddenName :
				 * 'staDat', format : 'Y-m-d' })], ['endDat', '结束时间', new
				 * Ext.form.DateField({ hiddenName : 'endDat', format : 'Y-m-d'
				 * })], ['impDur', '导入时长(秒)', new MT.DicComboBox({ hiddenName :
				 * 'impDur', itemKey : 'CONOB_CALLBATCH_ZT' })], ['totalCount',
				 * '总数', new MT.DicComboBox({ hiddenName : 'totalCount', itemKey :
				 * 'CONOB_CALLBATCH_ZT' })], ['avlidCount', '有效数量', new
				 * MT.DicComboBox({ hiddenName : 'avlidCount', itemKey :
				 * 'CONOB_CALLBATCH_ZT' })], ['inavlidCount', '无效名单数', new
				 * MT.DicComboBox({ hiddenName : 'inavlidCount', itemKey :
				 * 'CONOB_CALLBATCH_ZT' })], ['holdCount',
				 * '剩余数量，数据管理员可分配的数量。默认等于导入有效数量。', new MT.DicComboBox({
				 * hiddenName : 'holdCount', itemKey : 'CONOB_CALLBATCH_ZT' })],
				 * ['useId', '导入人', new MT.DicComboBox({ hiddenName : 'useId',
				 * itemKey : 'CONOB_CALLBATCH_ZT' })], ['creDat', '创建时间', new
				 * Ext.form.DateField({ hiddenName : 'creDat', format : 'Y-m-d'
				 * })], ['callbatchStaId',
				 * '状态：未分配完毕、已分配完毕、已关闭&CONOB_CALLBATCH_ZT', new MT.DicComboBox({
				 * hiddenName : 'callbatchStaId', itemKey : 'CONOB_CALLBATCH_ZT'
				 * })]]
				 */
				var ObCallbatchAdvancedSearchWin = Ext.extend(
						MT.AdvancedSearchWin, {
							title : '导入批次高级查询'
							// fieldData : fieldnameComboData
					});
				// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'ObCallbatchSearchPanel',
							height : 35,
							items : [{
										xtype : 'panel',
										width : 50,
										style : 'text-align:right',
										html : '名称：'
									}, {

										name : 'Q_callbatchNam_S_LK',
										xtype : 'textfield'
									},
									{
								        xtype : 'panel',
								        border : false,
								        width : 70,
								        style : 'text-align:right',
								        html : '导入时间：'
									}, {
		
										//name : 'staDat',
										name : 'Q_staDat_D_GE',
										id:'callbatchStaDat',
										xtype : 'datefield',
										format : 'Y-m-d'
									}, {
										xtype : 'panel',
										width : 10,
										style : 'text-align:center',
										html : '-'
									},{
		
										//name : 'staDat',
										name : 'Q_staDat_D_LE',
										id:'callbatchEndDat',
										xtype : 'datefield',
										format : 'Y-m-d'
									},
//									{
//										xtype : 'panel',
//										width : 50,
//										style : 'text-align:right',
//										html : '类型:：'
//									}, {
//
//										hiddenName : 'Q_callbatchTypId_SN_EQ',
//										xtype : 'mtdiccombo',
//										editable : true,
//										lazyInit : false,
//										forceSelection : false,
//										itemKey : 'CONOB_CALLBATCH_PCLX'
//									}, 
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
											new ObCallbatchAdvancedSearchWin()
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
										iconCls : 'btn-setting',
										// text : __delete+'[QcTarget]',
										text : '启用',
										xtype : 'button',
										scope : this,
										handler : function() {
											ObCallbatchView.multiAction();
										}
									}, {
										iconCls : 'btn-del',
										// text : __delete+'[ObCallbatch]',
										text : '注销',
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
					lazyLoad:false,
					id : 'ObCallbatchGrid',
					url : __ctxPath + "/outb/listObCallbatch.do",
					fields : [{
								name : 'callbatchId',
								type : 'int'
							}, 'callbatchNam','callbatchTypId','callbatchSrcId','callbatchRegion','staDat'
							,'endDat','totalCount','inavlidCount','avlidCount','holdCount','callbatchStaId' 
							//'obCallbatch', 'callbatchDes', 'numberSta', 'numberEnd','impDur', 'useId','creDat'
							],
					columns : [{
								header : 'callbatchId',
								dataIndex : 'callbatchId',
								hidden : true
							}, {
								header : '批次名称',
								isExp : false,

								dataIndex : 'callbatchNam'
							}, {
								header : '批次类型',
								isExp : false,

								dataIndex : 'callbatchTypId',
								renderer : function(value) {
									return CONOB_CALLBATCH_PCLX.get(value);
								}
							}, {
								header : '批次来源',
								isExp : false,

								dataIndex : 'callbatchSrcId',
								renderer : function(value) {
									return CONOB_CALLBATCH_PCLY.get(value);
								}
							}, {
								header : '所属地区',
								isExp : false,

								dataIndex : 'callbatchRegion'
							}, {
								header : '导入时间',
								isExp : false,

								dataIndex : 'staDat'
//                                renderer : function(val) {
//									return val.substring(0,11);
//								}								
							}, {
								header : '结束时间',
								isExp : false,

								dataIndex : 'endDat'
							}, {
								header : '总数',
								isExp : false,

								dataIndex : 'totalCount'
							}, {
								header : '有效数量',
								isExp : false,

								dataIndex : 'avlidCount'
							}, {
								header : '无效数量',
								isExp : false,

								dataIndex : 'inavlidCount'
							}, {
								header : '可分配数量',
								isExp : false,

								dataIndex : 'holdCount'
							}, {
								header : '状态',
								isExp : false,

								dataIndex : 'callbatchStaId',
								renderer : function(value) {
									return CONOB_CALLBATCH_ZT.get(value);
								}
							}, new Ext.ux.grid.RowActions({
										header : __action,
										width : 140,
										actions : [{
													iconCls : 'btn-readdocument',
													qtip : '查看',
													style : 'margin:0 3px 0 3px'
												}, {
													iconCls : 'btn-dynamic-unbind',
													qtip : '抽取',
													style : 'margin:0 3px 0 3px'
													,fn : function(record) {
														var status = record.get('callbatchStaId');
														if (status == '2') {
															return true;
														} else {
															return false;
														}
													}
												},  {
													iconCls : 'btn-borrow',
													qtip : '清洗',
													style : 'margin:0 3px 0 3px'
													,fn : function(record) {
														var status = record.get('callbatchStaId');
														if (status == '0') {
															return true;
														} else {
															return false;
														}
													}
												},{
													iconCls : 'btn-setting',
													qtip : '启用',
													style : 'margin:0 3px 0 3px'
													,fn : function(record) {
														var status = record.get('callbatchStaId');
														if (status == '0') {
															return true;
														} else {
															return false;
														}
													}
												}, {
													iconCls : 'btn-del',
													qtip : '注销',
													style : 'margin:0 3px 0 3px'
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
				Ext.getCmp('callbatchStaDat').setRawValue('');
				Ext.getCmp('callbatchEndDat').setRawValue('');
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
//							new ObCallbatchForm({
//										callbatchId : rec.data.callbatchId,
//										callbatchStaId : rec.data.callbatchStaId
//									}).show();
					var tabs = Ext.getCmp('centerTabPanel');
					var aForm = Ext.getCmp('ObCallbatchFormWin');
					if (aForm != null) {
						tabs.remove('ObCallbatchFormWin');
					}
					aForm = new ObCallbatchForm({
								callbatchId : rec.data.callbatchId,
								callbatchStaId : rec.data.callbatchStaId
							});
					tabs.add(aForm);
					tabs.activate(aForm);						
						});
			},
			// 创建记录
			createRs : function() {
				// new ObCallbatchForm().show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ObCallbatchForm');
				if (aForm != null) {
					tabs.remove('ObCallbatchForm');
				}
				aForm = new ObCallbatchForm();
				tabs.add(aForm);
				tabs.activate(aForm);

			},
			// 按ID删除记录
			removeRs : function(id) {
				$postSubmit({
							url : __ctxPath + '/outb/multiDelObCallbatch.do',
							ids : id,
							grid : this.gridPanel,
							msgTip : '您确认要注销所选记录吗？',
							msgSuccess : '成功注销该记录！',
							msgFailure : '操作出错，请联系管理员！'
						});
			},
			// 把选中ID删除
			removeSelRs : function() {
				$gridRs({
							url : __ctxPath + '/outb/multiDelObCallbatch.do',
							grid : this.gridPanel,
							idName : 'callbatchId',
							msgNull : '请选择要注销的记录！',
							msgTip : '您确认要注销所选记录吗？',
							msgSuccess : '成功注销该记录！',
							msgFailure : '操作出错，请联系管理员！'
						});
			},
			// 启用
			recover : function(id) {
				var actionText = "您确定启用这个批次?";
				var actionUrl = '/outb/multiEnableObCallbatch.do';
				Ext.Msg.confirm(__toastMessage, actionText, function(btn) {
							if (btn == 'yes') {
								
				  var myMask = new Ext.LoadMask(Ext.getBody(), {
				                        msg: '正在启用，请稍后...',
				                        removeMask: true //完成后移除
				                    });
				                myMask.show();
								
								Ext.Ajax.request({
											url : __ctxPath + actionUrl
													+ '?callbatchId=' + id,
											success : function(result, request) {
												var res = Ext.util.JSON
														.decode(result.responseText);
												if (res.success == false) {
													Ext.ux.Toast.msg('操作信息',
															res.message);
												} else {
													Ext.ux.Toast.msg('操作信息',
															__operationsuccess);
												}
												Ext.getCmp('ObCallbatchGrid')
														.getStore().reload();
												myMask.hide();		
												//myMask.close();
												//myMask.removeMask();		
											},
											failure : function(result, request) {
												myMask.hide();
											}
										});
							}
						});
			},
			// 编辑Rs
			editRs : function(record) {
				// new ObCallbatchForm({
				// callbatchId : record.data.callbatchId
				// }).show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ObCallbatchFormWin');
				if (aForm != null) {
					tabs.remove('ObCallbatchFormWin');
				}
				aForm = new ObCallbatchForm({
							callbatchId : record.data.callbatchId,
							callbatchStaId : record.data.callbatchStaId
						});
				tabs.add(aForm);
				tabs.activate(aForm);
			},
			// 行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this, record.data.callbatchId);
						break;
					case 'btn-readdocument' :
						this.editRs.call(this, record);
						break;
					case 'btn-dynamic-unbind' :
						var tabs = Ext.getCmp('centerTabPanel');
						var aForm = Ext.getCmp('ObCalllistCchouquFormWin');
						if (aForm != null) {
							tabs.remove('ObCalllistCchouquFormWin');
						}
						aForm = new ObCalllistCchouquForm({
						    callbatchId:record.data.callbatchId
						});
						tabs.add(aForm);
						tabs.activate(aForm);
						break;
					case 'btn-setting' :
						this.recover.call(this, record.data.callbatchId);
						break;
					case 'btn-borrow' :
//						new ObCallbatchWindow().show();// 调用清洗window
						new ObCallListClearnWindow({
										isClearnView : 'false',
										inChanel : 'ObCallbatch',
										callbatchId : record.data.callbatchId,
										callbatchNam : record.data.callbatchNam
									}).show();// 调用清洗window
						break;
					default :
						break;
				}
			}
		});

ObCallbatchView.multiAction = function(action) {
	var grid = Ext.getCmp('ObCallbatchGrid');
	var rows = grid.getSelectionModel().getSelections();
	if (rows != null && rows.length > 0) {
		var ids = new Array();
		for (var i = 0; i < rows.length; i++) {
			if(rows[i].data.callbatchStaId != '0') {
				//Ext.Msg.alert('只有未启用的批次才能被启用,请重新选择!');
				Ext.ux.Toast.msg('操作提示', '只有未启用的批次才能被启用,请重新选择');
				return;
			}
			ids.push(rows[i].data.callbatchId);
		}
		ObCallbatchView.action_ids(ids, action);
	} else {
		Ext.ux.Toast.msg('操作提示', __noData);
	}
};

ObCallbatchView.action_ids = function(_ids, action) {
	var actionText = '是否确定启用这些批次?';
	var actionUrl = '/outb/multiEnableObCallbatch.do';
	Ext.Msg.confirm(__toastMessage, actionText, function(btn) {
				if (btn == 'yes') {
					Ext.Ajax.request({
								url : __ctxPath + actionUrl,
								method : 'post',
								params : {
									ids : _ids
								},
								success : function(response) {
									Ext.ux.Toast
											.msg("操作信息", __operationsuccess);
									Ext.getCmp('ObCallbatchGrid').getStore()
											.reload();
								},
								failure : function() {
									Ext.ux.Toast.msg("操作信息", __operationFailed);
								}
							});
				}
			});
};
