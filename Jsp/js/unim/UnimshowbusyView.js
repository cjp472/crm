
UnimshowbusyView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				UnimshowbusyView.superclass.constructor.call(this, {
							id : 'UnimshowbusyViewWin',
							title : '小休类型管理',
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
				var fieldnameComboData = [
						['typeId', '类型 1 坐席分类 2 坐席状态 3 示忙原因 4 举手原因',
								new Ext.form.NumberField({
											name : 'typeId',
											allowBlank : true
										})],
						['catName', '名称', new Ext.form.TextField({
											name : 'catName',
											allowBlank : true
										})],
						['catCode', '值(可以是编号)', new Ext.form.TextField({
											name : 'catCode',
											allowBlank : true
										})],
						['extend1', '扩展字段1', new Ext.form.TextField({
											name : 'extend1',
											allowBlank : true
										})],
						['extend2', '扩展字段2', new Ext.form.TextField({
											name : 'extend2',
											allowBlank : true
										})],
						['statustype', '状态类别', new Ext.form.TextField({
											name : 'statustype',
											allowBlank : true
										})],
						['remark', '备注', new Ext.form.TextField({
											name : 'remark',
											allowBlank : true
										})]]
				var UnimCategoryAdvancedSearchWin = Ext.extend(
						MT.AdvancedSearchWin, {
							title : '座席分类高级查询',
							fieldData : fieldnameComboData
						});
				// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'UnimCategorySearchPanel',
							height : 35,
							items : [{

										width:50,
										style:'text-align:right',
										html:'名称：'
									}, {

										name : 'Q_catName_S_LK',
										xtype : 'textfield'
									}, {

										width:50,
										style:'text-align:right',
										html:'类型值：'
									},{

										name : 'Q_catCode_S_LK',
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
											new UnimCategoryAdvancedSearchWin()
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
										// text : __create+'[Unimshowbusy]',
										text : '添加',
										xtype : 'button',
										scope : this,
										handler : this.createRs
									}, {
										iconCls : 'btn-del',
										// text : __delete+'[Unimshowbusy]',
										text : '删除',
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
					id : 'UnimCategoryGridXU',
					url : __ctxPath + "/unim/listUnimCategory.do?Q_typeId_SN_EQ=3",
					fields : [{
								name : 'catId',
								type : 'int'
							}, 'typeId', 'catName', 'catCode', 'extend1',
							'extend2', 'statustype', 'remark'],
					columns : [{
								header : 'catId',
								dataIndex : 'catId',
								hidden : true
							}, {
								header : '名称',
								isExp : false,

								dataIndex : 'catName'
							}, {
								header : '值',
								isExp : false,
								dataIndex : 'catCode'
							},{
								header : '备注',
								isExp : false,

								dataIndex : 'remark'
							}, new Ext.ux.grid.RowActions({
										header : __action,
										width : 50,
										actions : [ {
													iconCls : 'btn-edit',
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

				this.gridPanel.addListener('rowdblclick', this.rowClick);

			},// end of the initComponents()
			// 重置查询表单
			reset : function() {
				this.searchPanel.getForm().reset();
			},
			// 按条件搜索
			onSearch : function(obj) {
				// var searchPanel = Ext.getCmp('UnimCategorySearchPanel');
				// var gridPanel = Ext.getCmp('UnimCategoryGrid');
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
							new UnimshowbusyForm({
										catId : rec.data.catId
									}).show();
						});
			},
			// 创建记录
			createRs : function() {
				new UnimshowbusyForm().show();
//				var tabs = Ext.getCmp('centerTabPanel');
//				var aForm = Ext.getCmp('UnimCategoryForm');
//				if (aForm != null) {
//					tabs.remove('UnimCategoryForm');
//				}
//				aForm = new UnimCategoryForm();
//				tabs.add(aForm);
//				tabs.activate(aForm);

			},
			// 按ID删除记录
			removeRs : function(id) {
				$postSubmit({
							url : __ctxPath + '/unim/multiDelUnimCategory.do',
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
							url : __ctxPath + '/unim/multiDelUnimCategory.do',
							grid : this.gridPanel,
							idName : 'catId',
							msgNull : '请选择要删除的记录！',
							msgTip : '您确认要删除所选记录吗？',
							msgSuccess : '成功删除该记录！',
							msgFailure : '操作出错，请联系管理员！'
						});
			},
			// 编辑Rs
			editRs : function(record) {
				 new UnimshowbusyForm({
				 catId : record.data.catId
				 }).show();
//				var tabs = Ext.getCmp('centerTabPanel');
//				var aForm = Ext.getCmp('UnimCategoryForm');
//				if (aForm != null) {
//					tabs.remove('UnimCategoryForm');
//				}
//				aForm = new UnimCategoryForm({
//							catId : record.data.catId
//						});
//				tabs.add(aForm);
//				tabs.activate(aForm);
			},
			// 行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this, record.data.catId);
						break;
					case 'btn-edit' :
						this.editRs.call(this, record);
						break;
					default :
						break;
				}
			}
		});
