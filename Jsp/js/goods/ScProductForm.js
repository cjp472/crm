/**
 * @author cf0666@gmail.com
 * @createtime
 * @class ScProductForm
 * @extends Ext.Window
 * @description ScProduct表单
 * @company 优创融联科技
 */
ScProductForm = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		ScProductForm.superclass.constructor.call(this, {
					id : 'ScProductFormWin',
					layout : 'fit',
					items : this.formPanel,
					modal : true,
					height : 400,
					width : 500,
					maximizable : true,
					title : '商品详细信息',
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
					labelAlign:'right',
					autoScroll : true,
					// id : 'ScProductForm',
					defaults : {
						anchor : '96%,96%'
					},
					defaultType : 'textfield',
					items : [{
								name : 'scProduct.productId',
								xtype : 'hidden',
								value : this.productId == null
										? ''
										: this.productId
							}

							, {
								fieldLabel : '产品名称',
								name : 'scProduct.productName',
								maxLength : 60
							}
							, {
								fieldLabel : '产品型号标志',
								hiddenName : 'scProduct.productModelFlag',
								allowBlank : false,
								xtype : 'mtdiccombo',
								editable : true,
								lazyInit : false,
								forceSelection : false,
								itemKey : 'CON_T_PMODEL_FLAG'
							}

							, {
								fieldLabel : '备注',
								name : 'scProduct.desc',
								xtype : 'textarea',
								maxLength : 500
							}

							, {
								fieldLabel : '扩展1',
								name : 'scProduct.ext1',
								maxLength : 60
							}

							, {
								fieldLabel : '扩展2',
								name : 'scProduct.ext2',
								maxLength : 60
							}

							, {
								fieldLabel : '扩展3',
								name : 'scProduct.ext3',
								maxLength : 60
							}

							, {
								fieldLabel : '扩展4',
								name : 'scProduct.ext4',
								maxLength : 60
							}

							, {
								fieldLabel : '扩展5',
								name : 'scProduct.ext5',
								maxLength : 60
							}

							, {
								fieldLabel : '扩展6',
								name : 'scProduct.ext6',
								maxLength : 60
							}

							, {
								fieldLabel : '扩展7',
								name : 'scProduct.ext7',
								maxLength : 60
							}

							, {
								fieldLabel : '扩展8',
								name : 'scProduct.ext8',
								maxLength : 60
							}

							, {
								fieldLabel : '扩展9',
								name : 'scProduct.ext9',
								maxLength : 60
							}

							, {
								fieldLabel : '扩展10',
								name : 'scProduct.ext10',
								maxLength : 60
							}

							, {
								fieldLabel : '扩展11',
								name : 'scProduct.ext11'
							}

							, {
								fieldLabel : '扩展12',
								name : 'scProduct.ext12'
							}

							, {
								fieldLabel : '扩展13',
								name : 'scProduct.ext13'
							}

							, {
								fieldLabel : '扩展14',
								name : 'scProduct.ext14'
							}

							, {
								fieldLabel : '扩展15',
								name : 'scProduct.ext15'
							}

							, {
								fieldLabel : '扩展16',
								name : 'scProduct.ext16',
								xtype : 'datefield',
								format : 'Y-m-d',
								value : new Date()
							}

							, {
								fieldLabel : '扩展17',
								name : 'scProduct.ext17',
								xtype : 'datefield',
								format : 'Y-m-d',
								value : new Date()
							}

							, {
								fieldLabel : '扩展18',
								name : 'scProduct.ext18',
								xtype : 'datefield',
								format : 'Y-m-d',
								value : new Date()
							}

							, {
								fieldLabel : '扩展19',
								name : 'scProduct.ext19',
								xtype : 'datefield',
								format : 'Y-m-d',
								value : new Date()
							}

							, {
								fieldLabel : '扩展20',
								name : 'scProduct.ext20',
								xtype : 'datefield',
								format : 'Y-m-d',
								value : new Date()
							}

					]
				});
		// 加载表单对应的数据
		if (this.productId != null && this.productId != 'undefined') {
			this.formPanel.loadData({
						url : __ctxPath + '/goods/getScProduct.do?productId='
								+ this.productId,
						root : 'data',
						preName : 'scProduct'
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
					url : __ctxPath + '/goods/saveScProduct.do',
					msgSuccess : '成功删除该记录！',
					msgFailure : '操作出错，请联系管理员！',
					callback : function(fp, action) {
						var gridPanel = Ext.getCmp('ScProductGrid');
						if (gridPanel != null) {
							gridPanel.getStore().reload();
						}
						this.close();
					}
				});
	}// end of save

});