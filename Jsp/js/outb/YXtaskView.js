/**
 * @author:cf0666@gmail.com
 * @class YXtaskView
 * @extends Ext.Panel
 * @description [ObCom]管理
 * @company 优创融联科技
 * @createtime:
 */
YXtaskView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				YXtaskView.superclass.constructor.call(this, {
							id : 'YXtaskViewWin',
							title : '营销任务管理',
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
				var ObComAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : '[ObCom]高级查询'
					});
				// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'YXtaskViewSearchPanel',
							height : 35,
							items : [{
										xtype : 'panel',
										width : 40,
										style : 'text-align:right',
										html : '类型：'
									}
									, {
										name : 'obProject.busiTypName',
										hiddenName : 'obProject.busiTypId',
										id : 'OB_Saletask_Tree_01',
										anchor : '100%',
										xtype : 'treecomboz',
										lazyInit : false,
										tplId : 'tree_tpl',
										rootVisible : false,
										editable : false,
								    	forceSelection : false,
								    	url : __ctxPath+ '/system/treeByMapNameDictionary.do?mapName=CONTPJYLX&relDic=10841'
									}
									,{
										xtype : 'panel',
										width : 70,
										style : 'text-align:right',
										html : '状态：'
									}, {
										hiddenName : 'Q_obComStaId_L_EQ',
										xtype : 'mtdiccombo',
										id : 'OB_YXtaskView_combo_Id',
										editable : false,
										lazyInit : false,
										forceSelection : false,
										itemKey : 'CONOB_COM_HDZT'
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
									}, {
										name : 'obCom.busiTypId',
										id : 'OB_YXtaskView_Hidden_01',
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

				this.gridPanel = new HT.GridPanel({
					showSm:false,
					region : 'center',
					// 使用RowActions
					rowActions : true,
					printable : false,
					exportable : false,
					id : 'YXtaskViewGrid',
					url : __ctxPath + "/outb/listFilterObCom.do",
					fields : [{
								name : 'comId',
								type : 'int'
							}, 'projNam','obComNam', 'comCod', {
								name : 'staDat',
								dateFormat : 'Y-m-d H:i:s',
								type : 'date'
							}, {
								name : 'endDat',
								dateFormat : 'Y-m-d H:i:s',
								type : 'date'
							}, 'busiTypeId','assCount', 'execTypId', 'obComStaId','assignTypeId','maxDiaNum','maxDiaSpace','isDiaTime'],
					columns : [{
								header : 'comId',
								dataIndex : 'comId',
								hidden : true
							}, {
								header : 'assignTypeId',
								dataIndex : 'assignTypeId',
								hidden : true
							},{
								header : 'maxDiaNum',
								dataIndex : 'maxDiaNum',
								hidden : true
							}, {
								header : 'maxDiaSpace',
								dataIndex : 'maxDiaSpace',
								hidden : true
							}, {
								header : 'isDiaTime',
								dataIndex : 'isDiaTime',
								hidden : true
							},  {
								header : '活动主题',
								isExp : false,
								dataIndex : 'obComNam',
								renderer : function(value) {
									if(value) {
										return '<font qtip="双击查看活动明细">' + value + '</font>';
									}
								}
							}, {
								header : '分配数量',
								isExp : false,
								dataIndex : 'assCount'
							}, {
								header : '活动编号',
								isExp : false,
								dataIndex : 'comCod'
							}, {
								header : '活动类型',
								isExp : false,
								dataIndex : 'busiTypeId'
								,renderer : function(value) {
									return CONTPJYLX.get(value);
								 }
						}	, {
								header : '执行方式',
								isExp : false,
								dataIndex : 'execTypId',
								renderer : function(value) {
									return LXFS001.get(value);
								}
							},
							{
								header : '开始时间',
								isExp : false,
								xtype : 'datecolumn',
								format : 'Y-m-d',
								dataIndex : 'staDat'
							}, {
								header : '结束时间',
								isExp : false,
								xtype : 'datecolumn',
								format : 'Y-m-d',
								dataIndex : 'endDat'
							}, {
								header : '营销项目',
								isExp : false,
								dataIndex : 'projNam'
							}, {
								header : '状态',
								isExp : false,
								dataIndex : 'obComStaId',
								renderer : function(value) {
									return CONOB_COM_HDZT.get(value);
								}
							}, new Ext.ux.grid.RowActions({
										header : __action,
										width : 100,
										actions : [{
											iconCls : 'btn-form-design',
											qtip : '查看',
											style : 'margin:0 3px 0 3px',
											fn : function(record) {
												var status = record.get('obComStaId');
												if (status != '2') {
													return true;
												}
												return false;
											}
										}, {
											iconCls : 'menu-goods',
											qtip : '执行',
											style : 'margin:0 3px 0 3px',
											fn : function(record) {
												var status = record.get('obComStaId');
												var execType = record.get('execTypId');
												if (status == '2' && execType=='1') {//活动处于启用状态
													return true;
												}
												return false
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
				Ext.getCmp("OB_YXtaskView_combo_Id").setValue('');
				Ext.getCmp("OB_Saletask_Tree_01").setValue('');
				Ext.getCmp("OB_Saletask_Tree_01").setItemIndex('');
			},
			// 按条件搜索
			onSearch : function(obj) {
				var busiTypId = Ext.getCmp("OB_Saletask_Tree_01").getItemIndex();
				Ext.getCmp("OB_YXtaskView_Hidden_01").setValue(busiTypId);
//				this.searchPanel.baseParams = {
//					
//				}
				$search({
							searchPanel : this.searchPanel,
							gridPanel : this.gridPanel
						});
			},
			// GridPanel行点击处理事件
			// GridPanel行点击处理事件
			rowClick : function(grid, rowindex, e) {
				str = '';
				productids = '';
				ctscr = '';
				paprelease = '';
				usergroupids = '';
				var aForm = Ext.getCmp('ObComTaskDelFormWin');
				var tabs = Ext.getCmp('centerTabPanel');
				if (aForm != null) {
					tabs.remove('ObComTaskDelFormWin');
				}
				grid.getSelectionModel().each(function(rec) {
					aForm = new ObComTaskDelForm({
								comId : rec.data.comId,
								execTypId : rec.data.execTypId,
								obComStaId : rec.data.obComStaId
					});
						 tabs.add(aForm);
						 tabs.activate(aForm);
					});

			},
			// 营销明细界面
			taskDetail : function(record) {
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('YXtaskFormWin');
				if (aForm != null) {
					tabs.remove('YXtaskFormWin');
				}
				aForm = new YXtaskForm({
							comId : record.data.comId,
							assignTypeId : record.data.assignTypeId,
							busiTypeId : record.data.busiTypeId,
							maxDiaNum : record.data.maxDiaNum,
							maxDiaSpace : record.data.maxDiaSpace,
							isDiaTime : record.data.isDiaTime
						});
				tabs.add(aForm);
				tabs.activate(aForm);
//				//**********************测试代码+数据*********************************
//				var tabs = Ext.getCmp('centerTabPanel');
//				var aForm = Ext.getCmp('YXtaskActionFormWin');
//				if (aForm != null) {
//					tabs.remove('YXtaskActionFormWin');
//				}
//                alert(1);
//				aForm = new YXtaskActionForm({
//				});
//				tabs.add(aForm);
//				tabs.activate(aForm);
			},
			
			// 营销明细界面：活动状态不为“执行中”的活动，只显示明细，不可操作
			taskShowDetail : function(record) {
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('YXtaskDetailFormWin');
				if (aForm != null) {
					tabs.remove('YXtaskDetailFormWin');
				}
				aForm = new YXtaskDetailForm({
							comId : record.data.comId
						});
				tabs.add(aForm);
				tabs.activate(aForm);
			},
			// 行的Action control_pause btn-reset
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'menu-goods' :
						this.taskDetail.call(this, record);
						break;
					case 'btn-form-design' :
						this.taskShowDetail.call(this, record);
						break;
					default :
						break;
				}
			}
		});
