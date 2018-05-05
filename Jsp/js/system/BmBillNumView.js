/**
 * @author: chenfeng
 * @class BmBillNumView
 * @extends Ext.Panel
 * @description 单据号管理
 * @company 北京灵信互动信息技术有限公司
 * @createtime:
 */
BmBillNumView = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		BmBillNumView.superclass.constructor.call(this, {
					id : 'BmBillNumView',
					title : '单据号管理',
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
					colNums : 6,
					items : [{
								fieldLabel : '单据类型',
								hiddenName : 'Q_billType_L_EQ',
								flex : 1,
								xtype : 'diccombo',
								forceSelection : false,
								itemName : '单据类型及业务处理'
							}, {
								fieldLabel : '生成单据号时检查唯一性',
								hiddenName : 'Q_isCheckUniqueness_L_EQ',
								flex : 1,
								xtype : 'combo',
								editable : false,
								mode : 'local',
								triggerAction : 'all',
								store : [['1', '是'], ['0', '否']]
							}, {
								fieldLabel : '删除单据时保留占用',

								hiddenName : 'Q_isDeleteRetain_L_EQ',
								flex : 1,
								xtype : 'combo',
								editable : false,
								mode : 'local',
								triggerAction : 'all',
								store : [['1', '是'], ['0', '否']]
							}, {
								fieldLabel : '自动进行断号补号',

								hiddenName : 'Q_isAutoFill_L_EQ',
								flex : 1,
								xtype : 'combo',
								editable : false,
								mode : 'local',
								triggerAction : 'all',
								store : [['1', '是'], ['0', '否']]
							}, {
								fieldLabel : '前缀',

								name : 'Q_prefix_S_EQ',
								flex : 1,
								xtype : 'textfield'
							}, {
								fieldLabel : '对象一影响因素',
								hiddenName : 'Q_bmFactor1.factorName_S_EQ',
								flex : 1,
								xtype : 'combo',
								editabel : false,
								lazyInit : false,
								triggerAction : 'all',
								store : new Ext.data.SimpleStore({
											autoLoad : true,
											url : __ctxPath+ '/financial/comboBmFactor.do',
											fields : ['factor1Id','factor1Name']
										}),
								displayField : 'factor1Name',
								valueField : 'factor1Id'
							}, {
								fieldLabel : '对象一选项',
								hiddenName : 'Q_factor1Median_L_EQ',
								flex : 1,
								xtype : 'combo',
								editable : false,
								mode : 'local',
								triggerAction : 'all',
								store : [['1', '是'], ['0', '否']]
							}, {
								fieldLabel : '对象二影响因素',
								name : 'Q_bmFactor2.factorName_S_EQ',
								flex : 1,
								xtype : 'combo',
								editabel : false,
								lazyInit : false,
								triggerAction : 'all',
								store : new Ext.data.SimpleStore({
											autoLoad : true,
											url : __ctxPath + '/financial/comboBmFactor.do',
											fields : ['factor2Id','factor2Name']
										}),
								displayField : 'factor2Name',
								valueField : 'factor2Id'
							}, {
								fieldLabel : '对象二选项',
								hiddenName : 'Q_factor2Median_L_EQ',
								flex : 1,
								xtype : 'combo',
								editable : false,
								mode : 'local',
								triggerAction : 'all',
								store : [['1', '是'], ['0', '否']]
							}, {
								fieldLabel : '年位数',
								name : 'Q_yearMedian_L_EQ',
								flex : 1,
								xtype : 'numberfield'
							}, {
								fieldLabel : '年选项',
								hiddenName : 'Q_isYear_L_EQ',
								flex : 1,
								xtype : 'combo',
								editable : false,
								mode : 'local',
								triggerAction : 'all',
								store : [['1', '是'], ['0', '否']]
							}, {
								fieldLabel : '月位数',
								name : 'Q_monthMedian_L_EQ',
								flex : 1,
								xtype : 'numberfield'
							}, {
								fieldLabel : '月选项',
								hiddenName : 'Q_isMonth_L_EQ',
								flex : 1,
								xtype : 'combo',
								editable : false,
								mode : 'local',
								triggerAction : 'all',
								store : [['1', '是'], ['0', '否']]
							}, {
								fieldLabel : '日位数',
								name : 'Q_dayMedian_L_EQ',
								flex : 1,
								xtype : 'numberfield'
							}, {
								fieldLabel : '日选项',
								hiddenName : 'Q_isDay_L_EQ',
								flex : 1,
								xtype : 'combo',
								editable : false,
								mode : 'local',
								triggerAction : 'all',
								store : [['1', '是'], ['0', '否']]
							}, {
								fieldLabel : '流水号归零标示',
								name : 'Q_zeroLogo_L_EQ',
								flex : 1,
								xtype : 'combo',
								editable : false,
								mode : 'local',
								triggerAction : 'all',
								store : [['1', '年'], ['2', '月'], ['3', '日'], ['0', '不归零']]
							}, {
								fieldLabel : '流水号位数',
								name : 'Q_numberMedian_L_EQ',
								flex : 1,
								xtype : 'numberfield'
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
								text : '添加单据号',
								xtype : 'button',
								scope : this,
								handler : this.createRs
							}, {
								iconCls : 'btn-del',
								text : '删除单据号',
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
			id : 'BmBillNumGrid',
			url : __ctxPath + "/financial/listBmBillNum.do",
			fields : [{
						name : 'billNumId',
						type : 'int'
					}, 'billType', 'isCheckUniqueness', 'isDeleteRetain',
					'isAutoFill', 'prefix', 'bmFactor1', 'factor1Median',
					'bmFactor2', 'factor2Median', 'yearMedian', 'isYear',
					'monthMedian', 'isMonth', 'dayMedian', 'isDay', 'zeroLogo',
					'numberMedian', 'createDate', 'updateDate', 'createBy',
					'updateBy', 'comments'],
			columns : [{
						header : '单据号内码',
						dataIndex : 'billNumId',
						hidden : true
					}, {
						header : '单据类型',
						sortable : true,
						dataIndex : 'billType',
						renderer : function(value) {
							var revalue="无";
							Ext.Ajax.request({
								url : __ctxPath + '/system/getByItemNameDictionary.do',
								async:false,
								scope:this,
								params : {'Q_itemIndex_S_EQ' : value ,'Q_itemName_S_EQ':'单据类型及业务处理'},
								method : 'post',
								success : function(response) {
									var result = Ext.util.JSON.decode(response.responseText);
									revalue = result.data.itemValue;
		                        }
							});
							return revalue;
						}
					}, {
						header : '生成单据号时检查唯一性',
						dataIndex : 'isCheckUniqueness',
						renderer : function(value) {
							return value == '0'?'否':'是';
						}

					}, {
						header : '删除单据时保留占用',

						dataIndex : 'isDeleteRetain',
						renderer : function(value) {
							return value == '0'?'否':'是';
						}

					}, {
						header : '自动进行断号补号',
						dataIndex : 'isAutoFill',
						renderer : function(value) {
							return value == '0'?'否':'是';
						}

					}, {
						header : '前缀',
						sortable : true,
						dataIndex : 'prefix'
					}, {
						header : '对象一影响因素',
						dataIndex : 'bmFactor1',
						renderer : function(val) {
							return val == null?'':val.factorName;
						}
					}, {
						header : '对象一选项',
						dataIndex : 'factor1Median',
						renderer : function(value) {
							return value == '0'?'否':'是';
						}
					}, {
						header : '对象二影响因素',
						dataIndex : 'bmFactor2',
						renderer : function(val) {
							return val == null?'':val.factorName;
						}
					}, {
						header : '对象二选项',
						dataIndex : 'factor2Median',
						renderer : function(value) {
							return value == '0'?'否':'是';
						}
					}, {
						header : '年位数',
						dataIndex : 'yearMedian'
					}, {
						header : '年选项',
						dataIndex : 'isYear',
						renderer : function(value) {
							return value == '0'?'否':'是';
						}

					}, {
						header : '月位数',
						dataIndex : 'monthMedian'
					}, {
						header : '月选项',

						dataIndex : 'isMonth',
						renderer : function(value) {
							return value == '0'?'否':'是';
						}

					}, {
						header : '日位数',
						dataIndex : 'dayMedian'
					}, {
						header : '日选项',

						dataIndex : 'isDay',
						renderer : function(value) {
							return value == '0'?'否':'是';
						}

					}, {
						header : '流水号归零标示',

						dataIndex : 'zeroLogo',
						renderer : function(value) {
							switch(value){
								case 0:
    								return '不归零';
		    						break;
		    					case 1:
		    					    return '年';
		    					    break;
		    					case 2:
		    					    return '月';
		    					    break;
		    					case 3:
		    					    return '日';
		    					    break;
							} 
						}
					}, {
						header : '流水号位数',
						dataIndex : 'numberMedian'
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
					new BmBillNumForm({
								billNumId : rec.data.billNumId
							}).show();
				});
	},
	// 创建记录
	createRs : function() {
		new BmBillNumForm().show();
	},
	// 按ID删除记录
	removeRs : function(id) {
		$postDel({
					url : __ctxPath + '/financial/multiDelBmBillNum.do',
					ids : id,
					grid : this.gridPanel
				});
	},
	// 把选中ID删除
	removeSelRs : function() {
		$delGridRs({
					url : __ctxPath + '/financial/multiDelBmBillNum.do',
					grid : this.gridPanel,
					idName : 'billNumId'
				});
	},
	// 编辑Rs
	editRs : function(record) {
		new BmBillNumForm({
					billNumId : record.data.billNumId
				}).show();
	},
	// 行的Action
	onRowAction : function(grid, record, action, row, col) {
		switch (action) {
			case 'btn-del' :
				this.removeRs.call(this, record.data.billNumId);
				break;
			case 'btn-edit' :
				this.editRs.call(this, record);
				break;
			default :
				break;
		}
	}
});
