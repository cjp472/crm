/**
 * @author cf0666@gmail.com
 * @createtime
 * @class ObCallListClearnView
 * @extends Ext.Window
 * @description ObCallbatch表单
 * @company 优创融联科技
 */
ObCallListClearnView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function() {
				// 必须先初始化组件
				this.initUIComponents();
				ObCallListClearnView.superclass.constructor.call(this, {
							id : 'ObCallListClearnViewWin',
							region : 'center',
							layout : 'border',
							iconCls:'btn-borrow',
							title : '名单清洗',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of the constructor
			initUIComponents : function() {

				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							height : 35,
							items : [{
										xtype : 'panel',
										width : 70,
										style : 'text-align:right',
										html : '清洗时间：'
									}, {
										name : 'startTime',
										id : 'startTimeWash',
										xtype : 'datefield',
										format : 'Y-m-d',
										width : 120
									}, {
										xtype : 'panel',
										width : 10,
										style : 'text-align:center',
										html : '-'
									}, {
										name : 'endTime',
										id : 'endTimeWash',
										xtype : 'datefield',
										format : 'Y-m-d',
										width : 120
									},{
										xtype : 'panel',
										width : 70,
										style : 'text-align:right',
										html : '清洗方式 ：'
									}, {

										hiddenName : 'clearnTyp',
										xtype : 'mtdiccombo',
										editable : false,
										lazyInit : false,
										width : 120,
										forceSelection : false,
										itemKey : 'CONOB_BATCH_QXFS'
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
											new ObComAdvancedSearchWin().show();
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
										iconCls : 'btn-borrow',
										text : '名单清洗',
										xtype : 'button',
										scope : this,
										handler : this.showQX
									}
//									, {
//										iconCls : 'btn-del',
//										text : '删除',
//										xtype : 'button',
//										scope : this,
//										handler : this.removeSelRs
//									}
									]
						});

				this.gridPanel = new HT.GridPanel({
					region : 'center',
					tbar : this.topbar,
					rowActions : true,
					printable : false,
					exportable : false,
					id : 'ObCallListClearnViewGrid',
					url : __ctxPath + "/outb/listObWashHis.do",
					fields : [
							{
								name : 'washHisId',
								type : 'int'
							},
							'projId','comId','calllistId','callbatchId','isCallbatchEnable',
							'projName', 'comName', 'calllistName', 'callbatchName','clearnOptName',
							'clearnDate', 'clearnTyp', 'clearnOpt', 'clearnCounts','clearnDat','clearnRual'],
					columns : [
							{
								header : 'washHisId',
								dataIndex : 'washHisId',
								hidden : true
							},
							{
								header : 'callbatchId',
								dataIndex : 'callbatchId',
								hidden : true
							},
							{	
								header : 'clearnRual',
								dataIndex : 'clearnRual',
								hidden : true
							},
							{	
								header : 'isCallbatchEnable',
								dataIndex : 'isCallbatchEnable',
								hidden : true
							},
							{
								header : '营销项目',
								isExp : false,
								dataIndex : 'projName'
							}, {
								header : '营销活动',
								isExp : false,
								dataIndex : 'comName'
							}, {
								header : '名单',
								isExp : false,
								dataIndex : 'calllistName'
							}, {
								header : '批次',
								isExp : false,
								dataIndex : 'callbatchName'
							}, {
								header : '清洗时间',
								isExp : false,
								dataIndex : 'clearnDat'
							}, {
								header : '清洗方式 ',
								isExp : false,
								dataIndex : 'clearnTyp',
								renderer : function(value) {
									return CONOB_BATCH_QXFS.get(value);
								}
							}, {
								header : '处理人',
								isExp : false,
								dataIndex : 'clearnOptName'
							}, {
								header : '数量',
								isExp : false,
								dataIndex : 'clearnCounts'
							}, new Ext.ux.grid.RowActions({
										header : __action,
										width : 80,
										actions : [{
													iconCls : 'btn-readdocument',
													qtip : '明细',
													style : 'margin:0 3px 0 3px'
												},{
													iconCls : 'btn-del',
													qtip : '删除',
													style : 'margin:0 3px 0 3px'
												}],
										listeners : {
											scope : this,
											'action' : this.onRowAction
										}
									})]
						// end of columns
				});
				var gridPanels = this.gridPanel;
				var store = this.gridPanel.getStore();
				var recordType = store.recordType;
				store.add(new recordType({
				'comId':'庆十一',
				'obCom':'买一送一',
				'obComNam':'2012-01-01',
				'comCod': '5',
				'obComDes':'201-07-01 12:12:12',
				'busiTypId':'销毁',
				'staDat':'管理员',
				'obComStaId':'管理员',
				'ownerTeamNam':'4',
				'perInchargeNam':'管理员'
				})); // 添加一行空store
				// this.gridPanel.addListener('rowdblclick', this.rowClick);
			},
			showQX : function() {
				new ObCallListClearnWindow({
					isClearnView : 'true'
				}).show();// 调用清洗window
			},
			reset : function() {
				Ext.getCmp('startTimeWash').setRawValue('');
				Ext.getCmp('endTimeWash').setRawValue('');
				this.searchPanel.getForm().reset();
			},
			onSearch : function(obj) {
				$search({
						searchPanel : this.searchPanel,
						gridPanel : this.gridPanel
				});
			},
			rowClick : function(grid, rowindex, e) {
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ObCallListClearnForm');
				if (aForm != null) {
					tabs.remove('ObCallListClearnForm');
				}
				aForm = new ObCallListClearnForm({
							comId : null
						});
				tabs.add(aForm);
				tabs.activate(aForm);
			},
			// 把选中ID删除
			removeSelRs : function() {
				$gridRs({
							url : __ctxPath + '/outb/multiDelObWashHis.do',
							grid : this.gridPanel,
							idName : 'washHisId',
							msgNull : '请选择要删除的记录！',
							msgTip : '您确认要删除所选记录吗？',
							msgSuccess : '成功删除所选记录！',
							msgFailure : '操作出错，请联系管理员！'
				});
			},
			removeRs : function(id) {
				Ext.Ajax.request({
					url :  __ctxPath + '/outb/isExistByWashIdObCallbatchImpWash.do?Q_washHisId_L_EQ='+id,
					method : 'post',
					success : function(response) {
						var result = Ext.util.JSON.decode(response.responseText);//解析数据
						if(true == result.success) {
							Ext.Msg.alert("提示信息","请先清空该历史下的清洗数据！");
						} else {
							$postSubmit({
									url : __ctxPath + '/outb/multiDelObWashHis.do',
									ids : id,
									grid : Ext.getCmp("ObCallListClearnViewGrid"),
									msgTip : '您确认要删除所选记录吗？',
									msgSuccess : '成功删除该记录！',
									msgFailure : '操作出错，请联系管理员！'
							});
//							Ext.MessageBox.confirm('提示信息', '该清洗历史下还有为清空的清洗数据，您确认删除该记录？', function(btn){
//								if('yes' == btn) {
//									Ext.Ajax.request({
//										url :  __ctxPath + '/outb/closeObProject.do?ids='+id,
//										method : 'post',
//										success : function(response) {
//											var result = Ext.util.JSON.decode(response.responseText);//解析数据
//											if(true == result.success) {
//												Ext.ux.Toast.msg('提示信息', '成功停用该项目!');
//												Ext.getCmp('ObProjectGrid').getStore().reload();
//											} else {
//												Ext.ux.Toast.msg('提示信息', '停用该项目失败，请联系管理员!');
//											}
//										},
//										failure : function() {
//										}
//									});
//								}
//							});
						}
					},
					failure : function() {
					}
				});
			},
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-readdocument' :
						var tabs = Ext.getCmp('centerTabPanel');
						var aForm = Ext.getCmp('ObCallListClearnFormWin');
						if (aForm != null) {
							tabs.remove('ObCallListClearnFormWin');
						}
						aForm = new ObCallListClearnForm({
									isCallbatchEnable : record.data.isCallbatchEnable,
									washHisId : record.data.washHisId,
									projName : record.data.projName,
									comName : record.data.comName,
									calllistName : record.data.calllistName,
									callbatchId : record.data.callbatchId,
									callbatchName : record.data.callbatchName,
									clearnOptName : record.data.clearnOptName,
									clearnDat : record.data.clearnDat,
									clearnTyp : CONOB_BATCH_QXFS.get(record.data.clearnTyp),
									clearnRual : record.data.clearnRual
								});
						tabs.add(aForm);
						tabs.activate(aForm);
						break;
					case 'btn-del':
						this.removeRs.call(this, record.data.washHisId);
						break;
					default :
						break;
				}
			}
		});