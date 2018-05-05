/**
 * @author: chenfeng
 * @class BmFactorValueView
 * @extends Ext.Panel
 * @description [BmFactorValue]管理
 * @company 北京灵信互动信息技术有限公司
 * @createtime:
 */
BmFactorValueView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				BmFactorValueView.superclass.constructor.call(this, {
							id : 'BmFactorValueView',
							title : '影响因素取值管理',
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
				// 初始化搜索条件Panel
				this.searchPanel = new HT.SearchPanel({
							layout : 'form',
							region : 'north',
							colNums : 5,
							items : [{
								fieldLabel : '影响因素主键',
								hiddenName : 'Q_bmFactor.factorId_L_EQ',
								flex : 1,
								xtype : 'combo',
								editabel : false,
								lazyInit : false,
								triggerAction : 'all',
								forceSelection : true,
								store : new Ext.data.SimpleStore({
											autoLoad : true,
											url : __ctxPath+ '/financial/comboBmFactor.do',
											fields : ['factorId','factorName']
										}),
								displayField : 'factorName',
								valueField : 'factorId'
							}, {
								fieldLabel : '影响因素标识',
								name : 'Q_factorNum_S_EQ',
								flex : 1,
								xtype : 'textfield'
							}, {
								fieldLabel : '影响因素值',
								name : 'Q_factorValue_S_EQ',
								flex : 1,
								xtype : 'textfield'
//							}, {
//								fieldLabel : '创建时间',
//								name : 'Q_createDate_D_EQ',
//								flex : 1,
//								xtype : 'datefield',
//								format : 'Y-m-d'
//							}, {
//								fieldLabel : '修改时间',
//								name : 'Q_updateDate_D_EQ',
//								flex : 1,
//								xtype : 'datefield',
//								format : 'Y-m-d'
//							}, {
//								fieldLabel : '创建人',
//								name : 'Q_createBy_S_EQ',
//								flex : 1,
//								xtype : 'textfield'
//							}, {
//								fieldLabel : '修改人',
//								name : 'Q_updateBy_S_EQ',
//								flex : 1,
//								xtype : 'textfield'
							}, {
								fieldLabel : '描述',
								name : 'Q_comments_S_EQ',
								flex : 1,
								xtype : 'textfield'
							}],
							buttons : [{
										text : '查询',
										scope : this,
										iconCls : 'btn-search',
										handler : this.search
									}, {
										text : '清空',
										scope : this,
										iconCls : 'btn-reset',
										handler : this.reset
									}]
						});// end of searchPanel

				this.topbar = new Ext.Toolbar({
							items : [{
										iconCls : 'btn-add',
										text : '添加影响因素取值',
										xtype : 'button',
										scope : this,
										handler : this.createRs
									}, {
										iconCls : 'btn-del',
										text : '删除影响因素取值',
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
					id : 'BmFactorValueGrid',
					url : __ctxPath + "/financial/listBmFactorValue.do",
					fields : [{
								name : 'factorValueId',
								type : 'int'
							}, 'bmFactor', 'factorNum', 'factorValue',
							'createDate', 'updateDate', 'createBy', 'updateBy',
							'comments'],
					columns : [{
								header : '影响因素取值内码',
								dataIndex : 'factorValueId',
								hidden : true
							}, {
								header : '影响因素主键',
								sortable : true,
								dataIndex : 'bmFactor',
								renderer : function(val) {
									return val.factorName;
								}
							}, {
								header : '影响因素标识',
								sortable : true,
								dataIndex : 'factorNum'
							}, {
								header : '影响因素值',
								sortable : true,
								dataIndex : 'factorValue'
							}, {
								header : '创建时间',
								hidden : true,
								dataIndex : 'createDate'
							}, {
								header : '修改时间',
								hidden : true,
								dataIndex : 'updateDate'
							}, {
								header : '创建人',
								hidden : true,
								dataIndex : 'createBy'
							}, {
								header : '修改人',
								hidden : true,
								dataIndex : 'updateBy'
							}, {
								header : '描述',
								dataIndex : 'comments'
							}, new Ext.ux.grid.RowActions({
										header : '管理',
										width : 100,
										actions : [{
													iconCls : 'btn-del',
													qtip : '删除',
													style : 'margin:0 3px 0 3px'
												}, {
													iconCls : 'btn-edit',
													qtip : '编辑',
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
			search : function() {
				$search({
							searchPanel : this.searchPanel,
							gridPanel : this.gridPanel
						});
			},
			// GridPanel行点击处理事件
			rowClick : function(grid, rowindex, e) {
				grid.getSelectionModel().each(function(rec) {
							new BmFactorValueForm({
										factorValueId : rec.data.factorValueId
									}).show();
						});
			},
			// 创建记录
			createRs : function() {
				new BmFactorValueForm().show();
			},
			// 按ID删除记录
			removeRs : function(id) {
				$postDel({
							url : __ctxPath
									+ '/financial/multiDelBmFactorValue.do',
							ids : id,
							grid : this.gridPanel
						});
			},
			// 把选中ID删除
			removeSelRs : function() {
				$delGridRs({
							url : __ctxPath
									+ '/financial/multiDelBmFactorValue.do',
							grid : this.gridPanel,
							idName : 'factorValueId'
						});
			},
			// 编辑Rs
			editRs : function(record) {
				new BmFactorValueForm({
							factorValueId : record.data.factorValueId
						}).show();
			},
			// 行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this, record.data.factorValueId);
						break;
					case 'btn-edit' :
						this.editRs.call(this, record);
						break;
					default :
						break;
				}
			}
		});
