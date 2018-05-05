
UnimSkillgroupView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				UnimSkillgroupView.superclass.constructor.call(this, {
							id : 'UnimSkillgroupViewWin',
							title : '业务组管理',
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
				var fieldnameComboData = [
						['skgCode', '编码', new Ext.form.TextField({
											name : 'skgCode',
											allowBlank : true
										})],
						['skgName', '名称', new Ext.form.TextField({
											name : 'skgName',
											allowBlank : true
										})],
						['remark', '描述', new Ext.form.TextField({
											name : 'remark',
											allowBlank : true
										})]]
				var UnimSkillgroupAdvancedSearchWin = Ext.extend(
						MT.AdvancedSearchWin, {
							title : '[UnimSkillgroup]高级查询',
							fieldData : fieldnameComboData
						});
				// 初始化搜索条件Panel
				this.searchPanel = new Ext.FormPanel({
							layout : 'hbox',
							region : 'north',
							id : 'UnimSkillgroupSearchPanel',
							height : 35,
							items : [{
										width:50,
										style:'text-align:right',
										html:'名称:'
									},{

										name : 'Q_skgName_S_LK',
										xtype : 'textfield'
									}, {
								width:50,
								style:'text-align:right',
								html:'编号:'
							},{

										name : 'Q_skgCode_S_LK',
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
											new UnimSkillgroupAdvancedSearchWin()
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
										// text : __create+'[UnimSkillgroup]',
										text : '添加',
										xtype : 'button',
										scope : this,
										handler : this.createRs
									}, {
										iconCls : 'btn-del',
										// text : __delete+'[UnimSkillgroup]',
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
					id : 'UnimSkillgroupGrid',
					url : __ctxPath + "/unim/listUnimSkillgroup.do",
					fields : [{
								name : 'skgId',
								type : 'int'
							}, 'skgCode', 'skgName', 'remark','status'],
					columns : [{
								header : 'skgId',
								dataIndex : 'skgId',
								hidden : true
							}, {
								header : '编号',
								isExp : false,
								dataIndex : 'skgCode'
							}, {
								header : '名称',
								isExp : false,

								dataIndex : 'skgName'
							}, {
								header : '描述',
								isExp : false,

								dataIndex : 'remark'
							}, {
								header : '状态',
								isExp : false,
								dataIndex : 'status',
								renderer : function(value) {
									if(value) {
										return QC_MBZT.get(value);	
									}
									return '';
								}
							},new Ext.ux.grid.RowActions({
										header : __action,
										width : 40,
										actions : [ {
													iconCls : 'btn-edit',
													qtip : '明细',
													style : 'margin:0 3px 0 3px'
												},{
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
				this.searchPanel.getForm().reset();
			},
			// 按条件搜索
			onSearch : function(obj) {
				// var searchPanel = Ext.getCmp('UnimSkillgroupSearchPanel');
				// var gridPanel = Ext.getCmp('UnimSkillgroupGrid');
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
							new UnimSkillgroupForm({
										skgId : rec.data.skgId
									}).show();
						});
			},
			// 创建记录
			createRs : function() {
				new UnimSkillgroupForm().show();
//				var tabs = Ext.getCmp('centerTabPanel');
//				var aForm = Ext.getCmp('UnimSkillgroupForm');
//				if (aForm != null) {
//					tabs.remove('UnimSkillgroupForm');
//				}
//				aForm = new UnimSkillgroupForm();
//				tabs.add(aForm);
//				tabs.activate(aForm);

			},
			// 按ID删除记录
			removeRs : function(id) {
				$postSubmit({
							url : __ctxPath + '/unim/multiDelUnimSkillgroup.do',
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
							url : __ctxPath + '/unim/multiDelUnimSkillgroup.do',
							grid : this.gridPanel,
							idName : 'skgId',
							msgNull : '请选择要删除的记录！',
							msgTip : '您确认要删除所选记录吗？',
							msgSuccess : '成功删除该记录！',
							msgFailure : '操作出错，请联系管理员！'
						});
			},
			// 编辑Rs
			editRs : function(record) {
				 new UnimSkillgroupForm({
				 skgId : record.data.skgId
				 }).show();
//				var tabs = Ext.getCmp('centerTabPanel');
//				var aForm = Ext.getCmp('UnimSkillgroupForm');
//				if (aForm != null) {
//					tabs.remove('UnimSkillgroupForm');
//				}
//				aForm = new UnimSkillgroupForm({
//							skgId : record.data.skgId
//						});
//				tabs.add(aForm);
//				tabs.activate(aForm);
			},
			// 行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this, record.data.skgId);
						break;
					case 'btn-edit' :
						this.editRs.call(this, record);
						break;
					default :
						break;
				}
			}
		});
