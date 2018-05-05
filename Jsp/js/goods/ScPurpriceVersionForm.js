/**
 * @author cf0666@gmail.com
 * @createtime
 * @class ScPurpriceVersionForm
 * @extends Ext.Window
 * @description ScPurpriceVersion表单
 * @company 优创融联科技
 */
ScPurpriceVersionForm = Ext.extend(Ext.Window, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		ScPurpriceVersionForm.superclass.constructor.call(this, {
					id : 'ScPurpriceVersionFormWin',
					layout : 'fit',
					items : this.formPanel,
					modal : true,
					height : 500,
					width : 700,
					maximizable : true,
					title : '销售价格详细信息',
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
		this.topbar = new Ext.Toolbar({
					items : ['->', {
								iconCls : 'btn-add',
								// text : __create+'[ScProduct]',
								text : __create,
								xtype : 'button',
								scope : this,
								handler : this.createRs
							}, {
								iconCls : 'btn-del',
								// text : __delete+'[ScProduct]',
								text : __delete,
								xtype : 'button',
								scope : this,
								handler : this.removeSelRs
							}]
				});
		this.gridPanel = new HT.GridPanel({
			region : 'center',
			tbar : this.topbar,
			printable : false,
			exportable : false,
			height:200,
			id : 'ScProductGrid',
			url : __ctxPath + "/goods/listScProduct.do",
			fields : [{
						name : 'productId',
						type : 'int'
					}, 'productName', 'origGuidePrice', 'productModelFlag',
					'desc', 'ext1', 'ext2', 'ext3', 'ext4', 'ext5', 'ext6',
					'ext7', 'ext8', 'ext9', 'ext10', 'ext11', 'ext12', 'ext13',
					'ext14', 'ext15', 'ext16', 'ext17', 'ext18', 'ext19',
					'ext20'],
			columns : [{
						header : 'productId',
						dataIndex : 'productId',
						hidden : true
					}, {
						header : '商品名称',
						isExp : false,

						dataIndex : 'productName'
					}, {
						header : '原始指导价',
						isExp : false,

						dataIndex : 'origGuidePrice'
					}, {
						header : '商品型号',
						isExp : false,

						dataIndex : 'productModelFlag',
						renderer : function(value) {
							return CON_T_PMODEL_FLAG.get(value);
						}
					}]
			});
		this.formPanel = new Ext.FormPanel({
			layout : 'form',
			bodyStyle : 'padding:10px',
			border : false,
			autoScroll : true,
			labelWidth:70,
			labelAlign:'right',
			// id : 'ScPurpriceVersionForm',
			defaults : {
				anchor : '96%,96%'
			},
			items : [{
				layout : 'column',
				border : false,
				items : [{
					layout : 'form',
					columnWidth : .5,
					border : false,
					items : [{
						fieldLabel : '版本',
						hiddenName : 'scPurpriceVersion.versionId',
						allowBlank : false,
						xtype : 'combo',
						editabel : false,
						anchor:'100%',
						lazyInit : false,
						triggerAction : 'all',
						store : new Ext.data.SimpleStore({
							autoLoad : true,
							url : __ctxPath + '/goods/listversionId.do',
							fields : ['versionId', 'versionIdName'],
							listeners : {
								load : function() {
									var combo = Ext.getCmp('versionId');
									var store = combo.getStore();
									var rows = [];// 定义数组
									for (var i = 0; i < store.getCount(); i++) { // store.getCount()为store的长度
										if (store.getAt(i).data['versionId'] == combo
												.getValue()) {
											combo
													.setValue(store.getAt(i).data['versionIdName']);
											break;
										}
									}
								}
							}
						}),
						displayField : 'versionIdName',
						valueField : 'versionId',
						id : 'versionId'
					}

					, {
						fieldLabel : '状态',
						hiddenName : 'scPurpriceVersion.status',
						xtype : 'mtdiccombo',
						editable : true,
						anchor:'100%',
						lazyInit : false,
						forceSelection : false,
						itemKey : 'CON_T_PRICE_ZT'
					}]
				}, {
					layout : 'form',
					border : false,
					columnWidth : .5,
					items : [{
								fieldLabel : '采购指导价',
								xtype:'textfield',
								anchor:'100%',
								name : 'scPurpriceVersion.purGuidPrice'
							}]

				}]

			}, {
				fieldLabel : '备注',
				name : 'scPurpriceVersion.desc',
				xtype : 'textarea',
				maxLength : 500
			},
			{
				xtype:'fieldset',
				collapsible:true,
				title:'选择商品',
				items:[this.gridPanel]
			}

			]
		});
		// 加载表单对应的数据
		if (this.purPriceId != null && this.purPriceId != 'undefined') {
			this.formPanel.loadData({
						url : __ctxPath
								+ '/goods/getScPurpriceVersion.do?purPriceId='
								+ this.purPriceId,
						root : 'data',
						preName : 'scPurpriceVersion'
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
					url : __ctxPath + '/goods/saveScPurpriceVersion.do',
					msgSuccess : '成功删除该记录！',
					msgFailure : '操作出错，请联系管理员！',
					callback : function(fp, action) {
						var gridPanel = Ext.getCmp('ScPurpriceVersionGrid');
						if (gridPanel != null) {
							gridPanel.getStore().reload();
						}
						this.close();
					}
				});
	}// end of save

});