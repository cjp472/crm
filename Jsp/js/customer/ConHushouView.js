/**
 * @author:cf0666@gmail.com
 * @class ConHushouView
 * @extends Ext.Panel
 * @description [ConHushou]管理
 * @company 优创融联科技
 * @createtime:
 */
ConHushouView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				ConHushouView.superclass.constructor.call(this, {
							id : 'ConHushouViewWin',
							title : '放弃的请求',
							region : 'center',
							layout:'border',
							items : [this.searchPanel,this.tabpanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
				var fieldnameComboData = [
						['origAni', '主叫', new Ext.form.TextField({
											name : 'origAni',
											allowBlank : true
										})],
						['origDnis', '被叫', new Ext.form.TextField({
											name : 'origDnis',
											allowBlank : true
										})],
						['enterTime', '开始时间', new Ext.form.DateField({
											hiddenName : 'enterTime',
											format : 'Y-m-d'
										})],
						['endTime', '结束时间', new Ext.form.DateField({
											hiddenName : 'endTime',
											format : 'Y-m-d'
										})],
						['endReason', '呼损原因&CONHUSHUN_HSYY',
								new Ext.form.NumberField({
											name : 'endReason',
											allowBlank : true
										})],
						['vdn', 'VDN', new Ext.form.TextField({
											name : 'vdn',
											allowBlank : true
										})],
						['split', '技能组', new Ext.form.TextField({
											name : 'split',
											allowBlank : true
										})],
						['ivrNod', 'IVR节点', new Ext.form.TextField({
											name : 'ivrNod',
											allowBlank : true
										})],
						['agentid', '接入工号', new Ext.form.TextField({
											name : 'agentid',
											allowBlank : true
										})],
						['station', '接入分机号', new Ext.form.TextField({
											name : 'station',
											allowBlank : true
										})],
						['dur', '时长', new Ext.form.NumberField({
											name : 'dur',
											allowBlank : true
										})],
						['synTime', '同步时间', new Ext.form.TextField({
											name : 'synTime',
											allowBlank : true
										})],
						['assignId', '分配人', new Ext.form.NumberField({
											name : 'assignId',
											allowBlank : true
										})],
						['assignTime', '分配时间', new Ext.form.DateField({
											hiddenName : 'assignTime',
											format : 'Y-m-d'
										})],
						['ownerId', '负责人', new Ext.form.NumberField({
											name : 'ownerId',
											allowBlank : true
										})],
						['acceptTime', '领用时间', new Ext.form.DateField({
											hiddenName : 'acceptTime',
											format : 'Y-m-d'
										})],
						['dealStaId', '处理状态&CONHUSHUN_CLZT',
								new Ext.form.NumberField({
											name : 'dealStaId',
											allowBlank : true
										})],
						['dealResId', '处理结果&CONHUSHUN_CLJG',
								new Ext.form.NumberField({
											name : 'dealResId',
											allowBlank : true
										})],
						['dealRemarks', '处理备注', new Ext.form.TextField({
											name : 'dealRemarks',
											allowBlank : true
										})]]
				var ConHushouAdvancedSearchWin = Ext.extend(
						MT.AdvancedSearchWin, {
							title : '放弃请求的高级查询',
							fieldData : fieldnameComboData
						});
				// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'ConHushouSearchPanel',
							style:'margin-bottom:10px',
							height : 35,
							items : [{
										text:'主叫',
										style:'text-align:right'
									},{
										name : 'Q_origAni_S_LK',
										xtype : 'textfield'
										
									},{
										text:'被叫',
										style:'text-align:right'
									}, {
										name : 'Q_origDnis_S_LK',
										xtype : 'textfield'
									},{
										text:'是否分配',
										style:'text-align:right'
									},{
										allowBlank : true,
										xtype : 'mtdiccombo',
										editable : true,
										lazyInit : false,
										forceSelection : false,
										width : 50,
										itemKey : 'YorN'
//									}, {
//										name : 'Q_enterTime_D_EQ',
//										xtype : 'datefield',
//										format : 'Y-m-d'
//									}, {
//										name : 'Q_endTime_D_EQ',
//										xtype : 'datefield',
//										format : 'Y-m-d'
//									}, {
//										hiddenName : 'Q_endReason_SN_EQ',
//										xtype : 'mtdiccombo',
//										editable : true,
//										lazyInit : false,
//										forceSelection : false,
//										itemKey : 'CONHSYY'
//									}, {
//										name : 'Q_vdn_S_EQ',
//										xtype : 'textfield'
//									}, {
//										name : 'Q_split_S_EQ',
//										xtype : 'textfield'
//									}, {
//										name : 'Q_ivrNod_S_EQ',
//										xtype : 'textfield'
//									}, {
//										name : 'Q_agentid_S_EQ',
//										xtype : 'textfield'
//									}, {
//
//										name : 'Q_station_S_EQ',
//										xtype : 'textfield'
//									}, {
//
//										name : 'Q_dur_N_EQ',
//										xtype : 'numberfield'
//									}, {
//
//										name : 'Q_synTime_S_EQ',
//										xtype : 'textfield'
//									}, {
//
//										name : 'Q_assignId_N_EQ',
//										xtype : 'numberfield'
//									}, {
//
//										name : 'Q_assignTime_D_EQ',
//										xtype : 'datefield',
//										format : 'Y-m-d'
//									}, {
//
//										name : 'Q_ownerId_N_EQ',
//										xtype : 'numberfield'
//									}, {
//
//										name : 'Q_acceptTime_D_EQ',
//										xtype : 'datefield',
//										format : 'Y-m-d'
//									}, {
//
//										hiddenName : 'Q_dealStaId_SN_EQ',
//										xtype : 'mtdiccombo',
//										editable : true,
//										lazyInit : false,
//										forceSelection : false,
//										itemKey : 'CONCLZT'
//									}, {
//
//										hiddenName : 'Q_dealResId_SN_EQ',
//										xtype : 'mtdiccombo',
//										editable : true,
//										lazyInit : false,
//										forceSelection : false,
//										itemKey : 'CONCLJG'
//									}, {
//
//										name : 'Q_dealRemarks_S_EQ',
//										xtype : 'textfield'
//									}, {
//										xtype : 'button',
//										text : __search,
//										iconCls : 'search',
//										scope : this,
//										handler : this.onSearch
//												.createCallback(this)
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
											new ConHushouAdvancedSearchWin()
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
							items : ['->',{
										iconCls : 'btn-add',
										// text : __create+'[ConHushou]',
										text : '分配',
										xtype : 'button',
										scope : this,
										//handler : this.createRs
										handler:function(){
											var grid = this.gridPanelList;
											var selectRecords = grid.getSelectionModel().getSelections();
											if (selectRecords != null && selectRecords.length >= 1) {
												var husunIds = Array();
												for (var i = 0; i < selectRecords.length; i++) {
													husunIds.push(selectRecords[i].data.conId);
												}
												UserSelector.getView(
													function(userId,fullName) {
														Ext.Ajax.request( {
															url : __ctxPath + '/customer/assignConHushou.do',
															method : 'post',
															params : {
																husunIds : husunIds,
																userId : userId
															},
															success : function() {
																Ext.ux.Toast.msg('操作提示', '分配成功!');
																var gridList = this.gridPanelList;
																if (gridList != null) {
																	gridList.getStore().reload();
																}
															},
															failure : function() {
																Ext.ux.Toast.msg('操作提示', '分配失败!');
															}
														});
												},true).show();
											}else{
												Ext.ux.Toast.msg("信息", "请选择要分配的记录!");
											}
//											fenpeiSelector.getView().show();
											
										}
//									}, {
//										iconCls : 'btn-del',
//										// text : __delete+'[ConHushou]',
//										text : __delete,
//										xtype : 'button',
//										scope : this,
//										handler : this.removeSelRs
									}]
						});
				this.gridPanel = new HT.GridPanel({
					//region : 'center',
//					tbar : this.topbar,
					// 使用RowActions
					rowActions : false,
					layout:'fit',
					printable : false,
					exportable : false,
					id : 'ConHushouGrid',
					url : __ctxPath + "/customer/listConHushou.do",
					fields : [{
								name : 'conId',
								type : 'int'
							}, 'origAni', 'origDnis', 'enterTime', 'endTime',
							'endReason', 'vdn', 'split', 'ivrNod', 'agentid',
							'station', 'dur', 'synTime', 'assignId',
							'assignTime', 'ownerId','ownerName', 'acceptTime', 'dealStaId',
							'dealResId', 'dealRemarks'],
					columns : [{
								header : 'conId',
								dataIndex : 'conId',
								hidden : true
							}, {
								header : '主叫',
								isExp : false,
								dataIndex : 'origAni'
							}, {
								header : '被叫',
								isExp : false,
								dataIndex : 'origDnis'
							}, {
								header : '开始时间',
								isExp : false,
								dataIndex : 'enterTime'
							}, {
								header : '结束时间',
								isExp : false,
								dataIndex : 'endTime'
							}, {
								header : '呼损原因',
								isExp : false,
								dataIndex : 'endReason',
								renderer : function(value) {
									return CONHUSHUN_HSYY.get(value);
								}
							}, {
								header : 'VDN',
								isExp : false,
								dataIndex : 'vdn'
							}, {
								header : '技能组',
								isExp : false,
								dataIndex : 'split'
							}, {
								header : '工号',
								isExp : false,
								dataIndex : 'agentid'
							}, {
								header : '分机号',
								isExp : false,
								dataIndex : 'station'
							}, {
								header : 'IVR节点',
								isExp : false,
								dataIndex : 'ivrNod'
							}, {
								header : '时长',
								isExp : false,
								dataIndex : 'dur'
//							}, {
//								header : '同步时间',
//								isExp : false,
//								dataIndex : 'synTime'
//							}, {
//								header : '分配人',
//								isExp : false,
//								dataIndex : 'assignId'
							}, {
								header : '分配时间',
								isExp : false,
								dataIndex : 'assignTime'
							}, {
								header : '负责人',
								isExp : false,
								dataIndex : 'ownerName'
//							}, {
//								header : '领用时间',
//								isExp : false,
//								dataIndex : 'acceptTime'
							}, {
								header : '处理状态',
								isExp : false,
								dataIndex : 'dealStaId',
								renderer : function(value) {
									return CONHUSHUN_CLZT.get(value);
								}
							}, {
								header : '处理结果',
								isExp : false,
								dataIndex : 'dealResId',
								renderer : function(value) {
									return CONHUSHUN_CLJG.get(value);
								}
//							}, {
//								header : '处理备注',
//								isExp : false,
//								dataIndex : 'dealRemarks'
							}]
						// end of columns
				});

//				this.gridPanel.addListener('rowdblclick', this.rowClick);
				
				this.gridPanelList = new HT.GridPanel({
					//region : 'center',
					tbar : this.topbar,
					// 使用RowActions
					rowActions : false,
					printable : false,
					exportable : true,
					//id : 'ConHushouGridList',
					url : __ctxPath + "/customer/listConHushou.do",
					fields : [{
								name : 'conId',
								type : 'int'
							}, 'origAni', 'origDnis', 'enterTime', 'endTime',
							'endReason', 'vdn', 'split', 'ivrNod', 'agentid',
							'station', 'dur', 'synTime', 'assignId',
							'assignTime', 'ownerId', 'acceptTime', 'dealStaId',
							'dealResId', 'dealRemarks','ownerName'],
					columns : [{
								header : 'conId',
								dataIndex : 'conId',
								hidden : true
							}, {
								header : '主叫',
								isExp : false,
								dataIndex : 'origAni'
							}, {
								header : '被叫',
								isExp : false,
								dataIndex : 'origDnis'
							}, {
								header : '最初呼叫时间',
								isExp : false,
								dataIndex : 'endTime'
							}, {
								header : '最后呼叫时间',
								isExp : false,
								dataIndex : 'endTime'
							},{
								header : '重复次数',
								isExp : false,
								dataIndex : 'enterTime'
//							},  {
//								header : '呼损原因',
//								isExp : false,
//								dataIndex : 'endReason',
//								renderer : function(value) {
//									return CONHSYY.value;
//								}
//							}, {
//								header : 'VDN',
//								isExp : false,
//								dataIndex : 'vdn'
//							}, {
//								header : '技能组',
//								isExp : false,
//								dataIndex : 'split'
//							}, {
//								header : '工号',
//								isExp : false,
//								dataIndex : 'agentid'
//							}, {
//								header : '分机号',
//								isExp : false,
//								dataIndex : 'station'
//							}, {
//								header : 'IVR节点',
//								isExp : false,
//								dataIndex : 'ivrNod'
//							}, {
//								header : '时长',
//								isExp : false,
//								dataIndex : 'dur'
//							}, {
//								header : '同步时间',
//								isExp : false,
//								dataIndex : 'synTime'
//							}, {
//								header : '分配人',
//								isExp : false,
//								dataIndex : 'assignId'
							}, {
								header : '分配时间',
								isExp : false,
								dataIndex : 'assignTime'
							}, {
								header : '负责人',
								isExp : false,
								dataIndex : 'ownerName'
//							}, {
//								header : '领用时间',
//								isExp : false,
//								dataIndex : 'acceptTime'
							}, {
								header : '处理状态',
								isExp : false,
								dataIndex : 'dealStaId',
								renderer : function(value) {
									return CONCLZT.get(value);
								}
							}, {
								header : '处理结果',
								isExp : false,
								dataIndex : 'dealResId',
								renderer : function(value) {
									return CONHUSHUN_CLJG.get(value);
								}
//							}, {
//								header : '处理备注',
//								isExp : false,
//								dataIndex : 'dealRemarks'
							}]
						// end of columns
				});

//				this.gridPanelList.addListener('rowdblclick', this.rowClick);
				
				this.tabpanel = new Ext.TabPanel({
						activeTab : 1,//激活第一个panel
						region : 'center',
						//autoWidth : true,
						//width :'auto',
						border:false,
						plain:true,
						defaultType : 'panel',
						items : [
						{
								title : '呼损列表',
								layout : 'fit',
								defaultType : 'textfield',
								border:false,
								defaults : {
									anchor : '100%,100%'
								},
								items : [this.gridPanelList]
							},
							{
								title : '呼损明细',
								layout : 'fit',
								border:false,
								defaultType : 'textfield',
								defaults : {
									anchor : '100%,100%'
								},
								items : [this.gridPanel]
							}]
				});
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
							new ConHushouForm({
										conId : rec.data.conId
									}).show();
						});
			},
			// 创建记录
			createRs : function() {
				// new ConHushouForm().show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ConHushouForm');
				if (aForm != null) {
					tabs.remove('ConHushouForm');
				}
				aForm = new ConHushouForm();
				tabs.add(aForm);
				tabs.activate(aForm);

			},
			// 按ID删除记录
			removeRs : function(id) {
				$postDel({
							url : __ctxPath + '/customer/multiDelConHushou.do',
							ids : id,
							grid : this.gridPanel
						});
			},
			// 把选中ID删除
			removeSelRs : function() {
				$delGridRs({
							url : __ctxPath + '/customer/multiDelConHushou.do',
							grid : this.gridPanel,
							idName : 'conId'
						});
			},
			// 编辑Rs
			editRs : function(record) {
				// new ConHushouForm({
				// conId : record.data.conId
				// }).show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ConHushouForm');
				if (aForm != null) {
					tabs.remove('ConHushouForm');
				}
				aForm = new ConHushouForm({
							conId : record.data.conId
						});
				tabs.add(aForm);
				tabs.activate(aForm);
			},
			// 行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this, record.data.conId);
						break;
					case 'btn-edit' :
						this.editRs.call(this, record);
						break;
					default :
						break;
				}
			}
			
		});
