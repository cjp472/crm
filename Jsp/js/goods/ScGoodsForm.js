/**
 * @author cf0666@gmail.com
 * @createtime
 * @class ScGoodsForm
 * @extends Ext.Window
 * @description ScGoods表单
 * @company 优创融联科技
 */
ScGoodsForm = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		ScGoodsForm.superclass.constructor.call(this, {
					id : 'ScGoodsFormWin',
					layout : 'fit',
					items : this.formPanel,
					modal : true,
					height : 400,
					width : 500,
					maximizable : true,
					title : '[ScGoods]详细信息',
					buttonAlign : 'center',
					buttons : [{
								text : __save,
								iconCls : 'btn-save',
								scope : this,
								handler : this.save
							}, {
								text : __reset,
								iconCls : 'btn-reset',
								scope : this,
								handler : this.reset
							}, {
								text : __cancel,
								iconCls : 'btn-cancel',
								scope : this,
								handler : this.cancel
							}]
				});
	},// end of the constructor
	// 初始化组件
	initUIComponents : function() {
		this.formPanel = new Ext.FormPanel({
			layout : 'form',
			bodyStyle : 'padding:10px',
			border : false,
			autoScroll : true,
			// id : 'ScGoodsForm',
			defaults : {
				anchor : '96%,96%'
			},
			defaultType : 'textfield',
			items : [{
						name : 'scGoods.goodsId',
						xtype : 'hidden',
						value : this.goodsId == null ? '' : this.goodsId
					}

					, {
						fieldLabel : '产品分类内码',
						hiddenName : 'scGoods.productClassifyId',
						xtype : 'combo',
						editabel : false,
						lazyInit : false,
						triggerAction : 'all',
						store : new Ext.data.SimpleStore({
							autoLoad : true,
							url : __ctxPath + '/goods/listproductClassifyId.do',
							fields : ['productClassifyId',
									'productClassifyIdName'],
							listeners : {
								load : function() {
									var combo = Ext.getCmp('productClassifyId');
									var store = combo.getStore();
									var rows = [];// 定义数组
									for (var i = 0; i < store.getCount(); i++) { // store.getCount()为store的长度
										if (store.getAt(i).data['productClassifyId'] == combo
												.getValue()) {
											combo
													.setValue(store.getAt(i).data['productClassifyIdName']);
											break;
										}
									}
								}
							}
						}),
						displayField : 'productClassifyIdName',
						valueField : 'productClassifyId',
						id : 'productClassifyId'
					}

					, {
						fieldLabel : '商品名称',
						name : 'scGoods.goodsName',
						maxLength : 60
					}

					, {
						fieldLabel : '商品分类编码',
						name : 'scGoods.goodsClassifyCode',
						maxLength : 60
					}

					, {

						fieldLabel : '是否锁定：0--未锁定、1--锁定&CON_T_IS_LOCK',
						hiddenName : 'scGoods.isLocked',
						allowBlank : false,
						xtype : 'combo',
						editable : false,
						mode : 'local',
						triggerAction : 'all',
						store : [['1', __yes], ['0', __no]]
					}

					, {
						fieldLabel : '原始指导价',
						name : 'scGoods.origGuidePrice'
					}

					, {
						fieldLabel : '零售价',
						name : 'scGoods.retailPrice'
					}

					, {
						fieldLabel : 'PATH',
						name : 'scGoods.path',
						maxLength : 200
					}

					, {
						fieldLabel : '商品价目内码',
						hiddenName : 'scGoods.goodsPriceId',
						xtype : 'combo',
						editabel : false,
						lazyInit : false,
						triggerAction : 'all',
						store : new Ext.data.SimpleStore({
							autoLoad : true,
							url : __ctxPath + '/goods/listgoodsPriceId.do',
							fields : ['goodsPriceId', 'goodsPriceIdName'],
							listeners : {
								load : function() {
									var combo = Ext.getCmp('goodsPriceId');
									var store = combo.getStore();
									var rows = [];// 定义数组
									for (var i = 0; i < store.getCount(); i++) { // store.getCount()为store的长度
										if (store.getAt(i).data['goodsPriceId'] == combo
												.getValue()) {
											combo
													.setValue(store.getAt(i).data['goodsPriceIdName']);
											break;
										}
									}
								}
							}
						}),
						displayField : 'goodsPriceIdName',
						valueField : 'goodsPriceId',
						id : 'goodsPriceId'
					}

					, {
						fieldLabel : '商品采购价目内码',
						hiddenName : 'scGoods.purPriceId',
						xtype : 'combo',
						editabel : false,
						lazyInit : false,
						triggerAction : 'all',
						store : new Ext.data.SimpleStore({
							autoLoad : true,
							url : __ctxPath + '/goods/listpurPriceId.do',
							fields : ['purPriceId', 'purPriceIdName'],
							listeners : {
								load : function() {
									var combo = Ext.getCmp('purPriceId');
									var store = combo.getStore();
									var rows = [];// 定义数组
									for (var i = 0; i < store.getCount(); i++) { // store.getCount()为store的长度
										if (store.getAt(i).data['purPriceId'] == combo
												.getValue()) {
											combo
													.setValue(store.getAt(i).data['purPriceIdName']);
											break;
										}
									}
								}
							}
						}),
						displayField : 'purPriceIdName',
						valueField : 'purPriceId',
						id : 'purPriceId'
					}

					, {
						fieldLabel : '库存数量',
						name : 'scGoods.goodsCount',
						xtype : 'numberfield'
					}

					, {
						fieldLabel : '0--配件、1--产品&CON_T_PMODEL_FLAG',
						hiddenName : 'scGoods.productModelFlag',
						allowBlank : false,
						xtype : 'mtdiccombo',
						editable : true,
						lazyInit : false,
						forceSelection : false,
						itemKey : 'CON_T_PMODEL_FLAG'
					}

					, {
						fieldLabel : '创建人',
						name : 'scGoods.createUserId',
						xtype : 'numberfield'
					}

					, {
						fieldLabel : '创建时间',
						name : 'scGoods.createTime',
						xtype : 'datefield',
						format : 'Y-m-d',
						value : new Date()
					}

					, {
						fieldLabel : '修改人',
						name : 'scGoods.updateUserId',
						xtype : 'numberfield'
					}

					, {
						fieldLabel : '修改时间',
						name : 'scGoods.updateTime',
						xtype : 'datefield',
						format : 'Y-m-d',
						value : new Date()
					}

					, {
						fieldLabel : '备注',
						name : 'scGoods.desc',
						xtype : 'textarea',
						maxLength : 500
					}

			]
		});
		// 加载表单对应的数据
		if (this.goodsId != null && this.goodsId != 'undefined') {
			this.formPanel.loadData({
						url : __ctxPath + '/goods/getScGoods.do?goodsId='
								+ this.goodsId,
						root : 'data',
						preName : 'scGoods'
					});
		}

	},// end of the initcomponents

	/**
	 * 重置
	 * 
	 * @param {}
	 *            formPanel
	 */
	reset : function() {
		this.formPanel.getForm().reset();
	},
	/**
	 * 取消
	 * 
	 * @param {}
	 *            window
	 */
	cancel : function() {
		this.close();
	},
	/**
	 * 保存记录
	 */
	save : function() {
		$postSubForm({
					formPanel : this.formPanel,
					scope : this,
					url : __ctxPath + '/goods/saveScGoods.do',
					msgSuccess : '成功删除该记录！',
					msgFailure : '操作出错，请联系管理员！',
					callback : function(fp, action) {
						var gridPanel = Ext.getCmp('ScGoodsGrid');
						if (gridPanel != null) {
							gridPanel.getStore().reload();
						}
						this.close();
					}
				});
	}// end of save

});