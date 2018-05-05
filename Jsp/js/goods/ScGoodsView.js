/**
 * @author:cf0666@gmail.com
 * @class ScGoodsView
 * @extends Ext.Panel
 * @description [ScGoods]管理
 * @company 优创融联科技
 * @createtime:
 */
ScGoodsView = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		ScGoodsView.superclass.constructor.call(this, {
					id : 'ScGoodsViewWin',
					title : '[ScGoods]管理',
					region : 'center',
					layout : 'border',
					items : [this.searchPanel, this.gridPanel]
				});
	},// end of constructor
	// 初始化组件
	initUIComponents : function() {
		var fieldnameComboData = [
				['productClassifyId', '产品分类内码', new Ext.form.ComboBox({
							editabel : false,
							lazyInit : false,
							triggerAction : 'all',
							store : new Ext.data.SimpleStore({
										autoLoad : true,
										url : __ctxPath
												+ '/goods/listproductClassifyId.do',
										fields : ['productClassifyId',
												'productClassifyIdName']
									}),
							displayField : 'productClassifyIdName',
							valueField : 'productClassifyId',
							id : 'productClassifyId'
						})],
				['goodsName', '商品名称', new Ext.form.TextField({
									name : 'goodsName',
									allowBlank : true
								})],
				['goodsClassifyCode', '商品分类编码', new Ext.form.TextField({
									name : 'goodsClassifyCode',
									allowBlank : true
								})],
				['isLocked', '是否锁定：0--未锁定、1--锁定&CON_T_IS_LOCK',
						new Ext.form.NumberField({
									name : 'isLocked',
									allowBlank : true
								})],
				['origGuidePrice', '原始指导价', new Ext.form.NumberField({
									name : 'origGuidePrice',
									allowBlank : true
								})],
				['retailPrice', '零售价', new Ext.form.NumberField({
									name : 'retailPrice',
									allowBlank : true
								})],
				['path', 'PATH', new Ext.form.TextField({
									name : 'path',
									allowBlank : true
								})],
				['goodsPriceId', '商品价目内码', new Ext.form.ComboBox({
							editabel : false,
							lazyInit : false,
							triggerAction : 'all',
							store : new Ext.data.SimpleStore({
										autoLoad : true,
										url : __ctxPath
												+ '/goods/listgoodsPriceId.do',
										fields : ['goodsPriceId',
												'goodsPriceIdName']
									}),
							displayField : 'goodsPriceIdName',
							valueField : 'goodsPriceId',
							id : 'goodsPriceId'
						})],
				['purPriceId', '商品采购价目内码', new Ext.form.ComboBox({
							editabel : false,
							lazyInit : false,
							triggerAction : 'all',
							store : new Ext.data.SimpleStore({
										autoLoad : true,
										url : __ctxPath
												+ '/goods/listpurPriceId.do',
										fields : ['purPriceId',
												'purPriceIdName']
									}),
							displayField : 'purPriceIdName',
							valueField : 'purPriceId',
							id : 'purPriceId'
						})],
				['goodsCount', '库存数量', new Ext.form.NumberField({
									name : 'goodsCount',
									allowBlank : true
								})],
				['productModelFlag', '0--配件、1--产品&CON_T_PMODEL_FLAG',
						new Ext.form.NumberField({
									name : 'productModelFlag',
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
				['updateTime', '修改时间', new Ext.form.DateField({
									hiddenName : 'updateTime',
									format : 'Y-m-d'
								})], ['desc', '备注', new Ext.form.TextField({
									name : 'desc',
									allowBlank : true
								})]]
		var ScGoodsAdvancedSearchWin = Ext.extend(MT.AdvancedSearchWin, {
					title : '[ScGoods]高级查询',
					fieldData : fieldnameComboData
				});
		// 初始化搜索条件Panel
		this.searchPanel = new Ext.FormPanel({
			layout : 'hbox',
			region : 'north',
			id : 'ScGoodsSearchPanel',
			height : 35,
			items : [{

				hiddenName : 'Q_productClassifyId_L_EQ',
				xtype : 'combo',
				editabel : false,
				lazyInit : false,
				triggerAction : 'all',
				store : new Ext.data.SimpleStore({
							autoLoad : true,
							url : __ctxPath + '/goods/listproductClassifyId.do',
							fields : ['productClassifyId',
									'productClassifyIdName']
						}),
				displayField : 'productClassifyIdName',
				valueField : 'productClassifyId',
				id : 'productClassifyId'
			}, {

				name : 'Q_goodsName_S_EQ',
				xtype : 'textfield'
			}, {

				name : 'Q_goodsClassifyCode_S_EQ',
				xtype : 'textfield'
			}, {

				hiddenName : 'Q_isLocked_SN_EQ',
				allowBlank : true,
				xtype : 'combo',
				editable : false,
				mode : 'local',
				triggerAction : 'all',
				store : [['1', __yes], ['0', __no]]
			}, {

				name : 'Q_origGuidePrice_S_EQ',
				xtype : 'numberfield'
			}, {

				name : 'Q_retailPrice_S_EQ',
				xtype : 'numberfield'
			}, {

				name : 'Q_path_S_EQ',
				xtype : 'textfield'
			}, {

				hiddenName : 'Q_goodsPriceId_L_EQ',
				xtype : 'combo',
				editabel : false,
				lazyInit : false,
				triggerAction : 'all',
				store : new Ext.data.SimpleStore({
							autoLoad : true,
							url : __ctxPath + '/goods/listgoodsPriceId.do',
							fields : ['goodsPriceId', 'goodsPriceIdName']
						}),
				displayField : 'goodsPriceIdName',
				valueField : 'goodsPriceId',
				id : 'goodsPriceId'
			}, {

				hiddenName : 'Q_purPriceId_L_EQ',
				xtype : 'combo',
				editabel : false,
				lazyInit : false,
				triggerAction : 'all',
				store : new Ext.data.SimpleStore({
							autoLoad : true,
							url : __ctxPath + '/goods/listpurPriceId.do',
							fields : ['purPriceId', 'purPriceIdName']
						}),
				displayField : 'purPriceIdName',
				valueField : 'purPriceId',
				id : 'purPriceId'
			}, {

				name : 'Q_goodsCount_L_EQ',
				xtype : 'numberfield'
			}, {

				hiddenName : 'Q_productModelFlag_SN_EQ',
				xtype : 'mtdiccombo',
				editable : true,
				lazyInit : false,
				forceSelection : false,
				itemKey : 'CON_T_PMODEL_FLAG'
			}, {

				name : 'Q_createUserId_L_EQ',
				xtype : 'numberfield'
			}, {

				name : 'Q_createTime_D_EQ',
				xtype : 'datefield',
				format : 'Y-m-d'
			}, {

				name : 'Q_updateUserId_L_EQ',
				xtype : 'numberfield'
			}, {

				name : 'Q_updateTime_D_EQ',
				xtype : 'datefield',
				format : 'Y-m-d'
			}, {

				name : 'Q_desc_S_EQ',
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
					new ScGoodsAdvancedSearchWin().show();
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
					items : [{
								iconCls : 'btn-add',
								// text : __create+'[ScGoods]',
								text : __create,
								xtype : 'button',
								scope : this,
								handler : this.createRs
							}, {
								iconCls : 'btn-del',
								// text : __delete+'[ScGoods]',
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
			id : 'ScGoodsGrid',
			url : __ctxPath + "/goods/listScGoods.do",
			fields : [{
						name : 'goodsId',
						type : 'int'
					}, 'scGoods', 'goodsName', 'goodsClassifyCode', 'isLocked',
					'origGuidePrice', 'retailPrice', 'path', 'scGoods',
					'scGoods', 'goodsCount', 'productModelFlag',
					'createUserId', 'createTime', 'updateUserId', 'updateTime',
					'desc'],
			columns : [{
						header : 'goodsId',
						dataIndex : 'goodsId',
						hidden : true
					}, {
						header : '产品分类内码',
						isExp : false,

						dataIndex : 'productClassifyId',
						renderer : function(val) {
							return val.productClassifyIdName;
						}
					}, {
						header : '商品名称',
						isExp : false,

						dataIndex : 'goodsName'
					}, {
						header : '商品分类编码',
						isExp : false,

						dataIndex : 'goodsClassifyCode'
					}, {
						header : '是否锁定：0--未锁定、1--锁定&CON_T_IS_LOCK',
						isExp : false,

						dataIndex : 'isLocked',
						renderer : function(value) {
							return value == '0' ? __no : __yes;
						}
					}, {
						header : '原始指导价',
						isExp : false,

						dataIndex : 'origGuidePrice'
					}, {
						header : '零售价',
						isExp : false,

						dataIndex : 'retailPrice'
					}, {
						header : 'PATH',
						isExp : false,

						dataIndex : 'path'
					}, {
						header : '商品价目内码',
						isExp : false,

						dataIndex : 'goodsPriceId',
						renderer : function(val) {
							return val.goodsPriceIdName;
						}
					}, {
						header : '商品采购价目内码',
						isExp : false,

						dataIndex : 'purPriceId',
						renderer : function(val) {
							return val.purPriceIdName;
						}
					}, {
						header : '库存数量',
						isExp : false,

						dataIndex : 'goodsCount'
					}, {
						header : '0--配件、1--产品&CON_T_PMODEL_FLAG',
						isExp : false,

						dataIndex : 'productModelFlag',
						renderer : function(value) {
							return CON_T_PMODEL_FLAG.get(value);
						}
					}, {
						header : '创建人',
						isExp : false,

						dataIndex : 'createUserId'
					}, {
						header : '创建时间',
						isExp : false,

						dataIndex : 'createTime'
					}, {
						header : '修改人',
						isExp : false,

						dataIndex : 'updateUserId'
					}, {
						header : '修改时间',
						isExp : false,

						dataIndex : 'updateTime'
					}, {
						header : '备注',
						isExp : false,

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
		// var searchPanel = Ext.getCmp('ScGoodsSearchPanel');
		// var gridPanel = Ext.getCmp('ScGoodsGrid');
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
					new ScGoodsForm({
								goodsId : rec.data.goodsId
							}).show();
				});
	},
	// 创建记录
	createRs : function() {
		// new ScGoodsForm().show();
		var tabs = Ext.getCmp('centerTabPanel');
		var aForm = Ext.getCmp('ScGoodsForm');
		if (aForm != null) {
			tabs.remove('ScGoodsForm');
		}
		aForm = new ScGoodsForm();
		tabs.add(aForm);
		tabs.activate(aForm);

	},
	// 按ID删除记录
	removeRs : function(id) {
		$postSubmit({
					url : __ctxPath + '/goods/multiDelScGoods.do',
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
					url : __ctxPath + '/goods/multiDelScGoods.do',
					grid : this.gridPanel,
					idName : 'goodsId',
					msgNull : '请选择要删除的记录！',
					msgTip : '您确认要删除所选记录吗？',
					msgSuccess : '成功删除该记录！',
					msgFailure : '操作出错，请联系管理员！'
				});
	},
	// 编辑Rs
	editRs : function(record) {
		// new ScGoodsForm({
		// goodsId : record.data.goodsId
		// }).show();
		var tabs = Ext.getCmp('centerTabPanel');
		var aForm = Ext.getCmp('ScGoodsForm');
		if (aForm != null) {
			tabs.remove('ScGoodsForm');
		}
		aForm = new ScGoodsForm({
					goodsId : record.data.goodsId
				});
		tabs.add(aForm);
		tabs.activate(aForm);
	},
	// 行的Action
	onRowAction : function(grid, record, action, row, col) {
		switch (action) {
			case 'btn-del' :
				this.removeRs.call(this, record.data.goodsId);
				break;
			case 'btn-edit' :
				this.editRs.call(this, record);
				break;
			default :
				break;
		}
	}
});
