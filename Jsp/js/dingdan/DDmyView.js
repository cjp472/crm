/**
 * @author:cf0666@gmail.com
 * @class DDmyView
 * @extends Ext.Panel
 * @description [ObCalllist]管理
 * @company 优创融联科技
 * @createtime:
 */
DDmyView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents(_cfg);
				// 调用父类构造
				DDmyView.superclass.constructor.call(this, {
							id : 'DDmyViewWin',
							title : '我的订单',
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
										html : '订单编号:'

									}, {

										name : 'Q_calllistNam_S_LK',
										xtype : 'textfield'
									}, {
										xtype : 'panel',
										width : 70,
										style : 'text-align:right',
										html : '订单类型:'

									}, {

										hiddenName : 'Q_calllistResouce_SN_EQ',
										xtype : 'mtdiccombo',
										editable : true,
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
						});
				this.gridPanel = new HT.GridPanel({
					region : 'center',
					printable : false,
					exportable : false,
					id : 'ObCalllistGrid',
					url : __ctxPath + "/outb/listObCalllist.do",
					fields : [{
								name : 'calllistId',
								type : 'int'
							}, 'obCalllist', 'calllistNam', 'calllistResouce',
							'ownerTeam', 'calllistTypId', 'cusTypId', 'staDat',
							'endDat', 'remark', 'creUseId', 'creTime',
							'updUseId', 'updTime', 'calllistStaId',
							'ownerTeamName'],
					columns : [{
								header : 'calllistId',
								dataIndex : 'calllistId',
								hidden : true
							}, {
								header : '编号',
								isExp : false,

								dataIndex : 'calllistNam'
							}, {
								header : '订单类型',
								isExp : false,

								dataIndex : 'projId'
							}, {
								header : '订单金额',
								isExp : false,

								dataIndex : 'calllistTypId',
								renderer : function(value) {
									return CONOB_CALLLIST_MDLX.get(value);
								}
							}, {
								header : '订购时间',
								isExp : false,

								dataIndex : 'calllistResouce',
								renderer : function(value) {
									return CONOB_MDLY.get(value);
								}
							}, {
								header : '订购人',
								isExp : false,

								dataIndex : 'calllistNam'
							}, {
								header : '收货人',
								isExp : false,

								dataIndex : 'ownerTeamName'
							}, {
								header : '送货地址',
								isExp : false,

								dataIndex : 'staDat',
								renderer : function(value) {
									return value.substring(0, 10);
								}
							}, {
								header : '配送地区',
								isExp : false,
								dataIndex : 'endDat',
								renderer : function(value) {
									return value.substring(0, 10);
								}
							}, {
								header : '付款方式',
								isExp : false,

								dataIndex : 'calllistStaId',
								renderer : function(value) {
									return CONOB_CALLLIST_ZT.get(value);
								}
							}, {
								header : '状态',
								isExp : false,

								dataIndex : 'calllistStaId',
								renderer : function(value) {
									return CONOB_CALLLIST_ZT.get(value);
								}
							}, {
								header : '配送状态',
								isExp : false,

								dataIndex : 'calllistStaId',
								renderer : function(value) {
									return CONOB_CALLLIST_ZT.get(value);
								}
							}]
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
			// 按ID删除记录
			removeRs : function(id) {
				$postSubmit({
							url : __ctxPath + '/outb/multiDelObCalllist.do',
							ids : id,
							grid : this.gridPanel,
							msgTip : '您确认要删除所选记录吗？',
							msgSuccess : '成功删除该记录！',
							msgFailure : '操作出错，请联系管理员！'
						});
			},
			// 把选中ID删除
			removeSelRs : function() {
				$gridRs({
							url : __ctxPath + '/outb/multiDelObCalllist.do',
							grid : this.gridPanel,
							idName : 'calllistId',
							msgNull : '请选择要删除的记录！',
							msgTip : '您确认要删除所选记录吗？',
							msgSuccess : '成功删除该记录！',
							msgFailure : '操作出错，请联系管理员！'
						});
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
							calllistId : record.data.calllistId
						});
				tabs.add(aForm);
				tabs.activate(aForm);
			},
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
						ObCallbatchFormDaoRu(record.data.calllistId);
						break;
					case 'btn-borrow':
					new ObCallListWindow().show();//调用清洗window 
					break;
					default :
						break;
				}
			}
		});
