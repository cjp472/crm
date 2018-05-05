/**
 * @author:cf0666@gmail.com
 * @class ScPriceVersionView
 * @extends Ext.Panel
 * @description [ScPriceVersion]管理
 * @company 优创融联科技
 * @createtime:
 */
ScPriceVersionView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				ScPriceVersionView.superclass.constructor.call(this, {
							id : 'ScPriceVersionViewWin',
							title : '价格版本管理',
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
				var fieldnameComboData = [
						['versionType', '版本类型', new Ext.form.NumberField({
											name : 'versionType',
											allowBlank : true
										})],
						['versionNum', '版本号', new Ext.form.TextField({
											name : 'versionNum',
											allowBlank : true
										})],
						['versionName', '版本名', new Ext.form.TextField({
											name : 'versionName',
											allowBlank : true
										})],
						['effectTime', '生效时间', new Ext.form.DateField({
											hiddenName : 'effectTime',
											format : 'Y-m-d'
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
				var ScPriceVersionAdvancedSearchWin = Ext.extend(
						MT.AdvancedSearchWin, {
							title : '价格版本高级查询',
							fieldData : fieldnameComboData
						});
				// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'ScPriceVersionSearchPanel',
							height : 35,
							items : [{
										border : false,
										style : 'text-align:right',
										width : 50,
										html : '版本号：'
									}, {

										name : 'Q_versionType_SN_EQ',
										xtype : 'numberfield'
									}, {
										border : false,
										style : 'text-align:right',
										width : 50,
										html : '版本号：'
									}, {

										name : 'Q_versionNum_S_EQ',
										xtype : 'textfield'
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
											new ScPriceVersionAdvancedSearchWin()
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
										// text : __create+'[ScPriceVersion]',
										text : __create,
										xtype : 'button',
										scope : this,
										handler : this.createRs
									}, {
										iconCls : 'btn-del',
										// text : __delete+'[ScPriceVersion]',
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
					id : 'ScPriceVersionGrid',
					url : __ctxPath + "/goods/listScPriceVersion.do",
					fields : [{
								name : 'versionId',
								type : 'int'
							}, 'versionType', 'versionNum', 'versionName',
							'effectTime', 'createUserId', 'createTime',
							'updateUserId', 'updateTime2', 'desc'],
					columns : [{
								header : 'versionId',
								dataIndex : 'versionId',
								hidden : true
							}, {
								header : '版本类型',
								isExp : false,

								dataIndex : 'versionType'
							}, {
								header : '版本号',
								isExp : false,

								dataIndex : 'versionNum'
							}, {
								header : '版本名',
								isExp : false,

								dataIndex : 'versionName'
							}, {
								header : '生效时间',
								isExp : false,

								dataIndex : 'effectTime'
							}, {
								header : '过期时间',
								isExp : false,

								dataIndex : 'effectTime'
							}, {
								header : '创建人',
								isExp : false,

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
				// var searchPanel = Ext.getCmp('ScPriceVersionSearchPanel');
				// var gridPanel = Ext.getCmp('ScPriceVersionGrid');
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
							new ScPriceVersionForm({
										versionId : rec.data.versionId
									}).show();
						});
			},
			// 创建记录
			createRs : function() {
				new ScPriceVersionForm().show();
			},
			// 按ID删除记录
			removeRs : function(id) {
				$postSubmit({
							url : __ctxPath
									+ '/goods/multiDelScPriceVersion.do',
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
									+ '/goods/multiDelScPriceVersion.do',
							grid : this.gridPanel,
							idName : 'versionId',
							msgNull : '请选择要删除的记录！',
							msgTip : '您确认要删除所选记录吗？',
							msgSuccess : '成功删除该记录！',
							msgFailure : '操作出错，请联系管理员！'
						});
			},
			// 编辑Rs
			editRs : function(record) {
				// new ScPriceVersionForm({
				// versionId : record.data.versionId
				// }).show();
				var tabs = Ext.getCmp('centerTabPanel');
				var aForm = Ext.getCmp('ScPriceVersionForm');
				if (aForm != null) {
					tabs.remove('ScPriceVersionForm');
				}
				aForm = new ScPriceVersionForm({
							versionId : record.data.versionId
						});
				tabs.add(aForm);
				tabs.activate(aForm);
			},
			// 行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this, record.data.versionId);
						break;
					case 'btn-edit' :
						this.editRs.call(this, record);
						break;
					default :
						break;
				}
			}
		});
