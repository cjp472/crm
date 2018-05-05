/**
 * @author:cf0666@gmail.com
 * @class ScGoodsPriceVersionView
 * @extends Ext.Panel
 * @description [ScGoodsPriceVersion]管理
 * @company 优创融联科技
 * @createtime:
 */
ScGoodsPriceVersionView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				ScGoodsPriceVersionView.superclass.constructor.call(this, {
							id : 'ScGoodsPriceVersionViewWin',
							title : '销售价格管理',
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
				var fieldnameComboData = [
						['versionId', '版本内码', new Ext.form.ComboBox({
									editabel : false,
									lazyInit : false,
									triggerAction : 'all',
									store : new Ext.data.SimpleStore({
												autoLoad : true,
												url : __ctxPath
														+ '/goods/listversionId.do',
												fields : ['versionId',
														'versionIdName']
											}),
									displayField : 'versionIdName',
									valueField : 'versionId',
									id : 'versionId'
								})],
						['purchasePrice', '进货价格', new Ext.form.NumberField({
											name : 'purchasePrice',
											allowBlank : true
										})],
						['reportPrice', '上报价格', new Ext.form.NumberField({
											name : 'reportPrice',
											allowBlank : true
										})],
						['retailPrice', '零售价格', new Ext.form.NumberField({
											name : 'retailPrice',
											allowBlank : true
										})],
						['wholesalePrice', '平台直供价格', new Ext.form.NumberField({
											name : 'wholesalePrice',
											allowBlank : true
										})],
						['defaultSubsidyAmount', '缺省平台补贴金额',
								new Ext.form.NumberField({
											name : 'defaultSubsidyAmount',
											allowBlank : true
										})],
						['createUserId', '创建人', new Ext.form.NumberField({
											name : 'createUserId',
											allowBlank : true
										})],
						['createTime', '创建时间', new Ext.form.DateField({
											hiddenName : 'createTime',
											format : 'Y-m-d'
										})],
						['updateUserId', '修改人', new Ext.form.NumberField({
											name : 'updateUserId',
											allowBlank : true
										})],
						['updateTime2', '修改时间', new Ext.form.DateField({
											hiddenName : 'updateTime2',
											format : 'Y-m-d'
										})],
						['desc', '备注', new Ext.form.TextField({
											name : 'desc',
											allowBlank : true
										})]]
				var ScGoodsPriceVersionAdvancedSearchWin = Ext.extend(
						MT.AdvancedSearchWin, {
							title : '[ScGoodsPriceVersion]高级查询',
							fieldData : fieldnameComboData
						});
				// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'ScGoodsPriceVersionSearchPanel',
							height : 35,
							items : [{
										border : false,
										style : 'text-align:right',
										width : 50,
										html : '版本：'
									}, {

										name : 'Q_purchasePrice_S_EQ',
										xtype : 'combo',
										mode:'local',
										store:[]
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
											new ScGoodsPriceVersionAdvancedSearchWin()
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
										// text :
										// __create+'[ScGoodsPriceVersion]',
										text : __create,
										xtype : 'button',
										scope : this,
										handler : this.createRs
									}, {
										iconCls : 'btn-del',
										// text :
										// __delete+'[ScGoodsPriceVersion]',
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
					id : 'ScGoodsPriceVersionGrid',
					url : __ctxPath + "/goods/listScGoodsPriceVersion.do",
					fields : [{
								name : 'goodsPriceId',
								type : 'int'
							}, 'scGoodsPriceVersion', 'purchasePrice',
							'reportPrice', 'retailPrice', 'wholesalePrice',
							'defaultSubsidyAmount', 'createUserId',
							'createTime', 'updateUserId', 'updateTime2', 'desc'],
					columns : [{
								header : 'goodsPriceId',
								dataIndex : 'goodsPriceId',
								hidden : true
							}, {
								header : '版本',
								isExp : false,

								dataIndex : 'versionId',
								renderer : function(val) {
									return val.versionIdName;
								}
							}, {
								header : '进货价格',
								isExp : false,

								dataIndex : 'purchasePrice'
							}, {
								header : '上报价格',
								isExp : false,

								dataIndex : 'reportPrice'
							}, {
								header : '零售价格',
								isExp : false,

								dataIndex : 'retailPrice'
							}, {
								header : '平台直供价格',
								isExp : false,

								dataIndex : 'wholesalePrice'
							}, {
								header : '缺省平台补贴金额',
								isExp : false,

								dataIndex : 'defaultSubsidyAmount'
							}, {
								header : '创建人',
								isExp : false,
								hidden : true,
								dataIndex : 'createUserId'
							}, {
								header : '创建时间',
								isExp : false,
								hidden : true,
								dataIndex : 'createTime'
							}, {
								header : '修改人',
								isExp : false,
								hidden : true,
								dataIndex : 'updateUserId'
							}, {
								header : '修改时间',
								isExp : false,
								hidden : true,
								dataIndex : 'updateTime2'
							}, {
								header : '备注',
								isExp : false,
								hidden : true,
								dataIndex : 'desc'
							}, new Ext.ux.grid.RowActions({
										header : __action,
										width : 100,
										actions : [{
													iconCls : 'btn-del',
													qtip : __delete,
													style : 'margin:0 3px 0 3px'
												}, {
													iconCls : 'btn-edit',
													qtip : __edit,
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
				this.searchPanel.getForm().reset();
			},
			// 按条件搜索
			onSearch : function(obj) {
				// var searchPanel =
				// Ext.getCmp('ScGoodsPriceVersionSearchPanel');
				// var gridPanel = Ext.getCmp('ScGoodsPriceVersionGrid');
				// if (searchPanel.getForm().isValid()) {
				$search({
							searchPanel : this.searchPanel,
							gridPanel : this.gridPanel
						});
				// }
			},
			// GridPanel行点击处理事件
			rowClick : function(grid, rowindex, e) {
				grid.getSelectionModel().each(function(rec) {
							new ScGoodsPriceVersionForm({
										goodsPriceId : rec.data.goodsPriceId
									}).show();
						});
			},
			// 创建记录
			createRs : function() {
				new ScGoodsPriceVersionForm().show();

			},
			// 按ID删除记录
			removeRs : function(id) {
				$postSubmit({
							url : __ctxPath
									+ '/goods/multiDelScGoodsPriceVersion.do',
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
							url : __ctxPath
									+ '/goods/multiDelScGoodsPriceVersion.do',
							grid : this.gridPanel,
							idName : 'goodsPriceId',
							msgNull : '请选择要删除的记录！',
							msgTip : '您确认要删除所选记录吗？',
							msgSuccess : '成功删除该记录！',
							msgFailure : '操作出错，请联系管理员！'
						});
			},
			// 编辑Rs
			editRs : function(record) {
				// new ScGoodsPriceVersionForm({
				// goodsPriceId : record.data.goodsPriceId
				// }).show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ScGoodsPriceVersionForm');
				if (aForm != null) {
					tabs.remove('ScGoodsPriceVersionForm');
				}
				aForm = new ScGoodsPriceVersionForm({
							goodsPriceId : record.data.goodsPriceId
						});
				tabs.add(aForm);
				tabs.activate(aForm);
			},
			// 行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this, record.data.goodsPriceId);
						break;
					case 'btn-edit' :
						this.editRs.call(this, record);
						break;
					default :
						break;
				}
			}
		});
