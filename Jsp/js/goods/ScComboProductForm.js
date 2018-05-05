/**
 * @author cf0666@gmail.com
 * @createtime
 * @class ScComboProductForm
 * @extends Ext.Window
 * @description ScComboProduct表单
 * @company 优创融联科技
 */
ScComboProductForm = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 必须先初始化组件
				this.initUIComponents();
				ScComboProductForm.superclass.constructor.call(this, {
							id : 'ScComboProductFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '商品打包详细信息',
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
							height : 200,
							id : 'ScProductGrid',
							url : __ctxPath + "/goods/listScProduct.do",
							fields : [{
										name : 'productId',
										type : 'int'
									}, 'productName', 'origGuidePrice',
									'productModelFlag', 'desc', 'ext1', 'ext2',
									'ext3', 'ext4', 'ext5', 'ext6', 'ext7',
									'ext8', 'ext9', 'ext10', 'ext11', 'ext12',
									'ext13', 'ext14', 'ext15', 'ext16',
									'ext17', 'ext18', 'ext19', 'ext20'],
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
							labelAlign:'rigth',
							labelWidth:70,
							// id : 'ScComboProductForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'scComboProduct.comboGoodsId',
								xtype : 'hidden',
								value : this.comboGoodsId == null
										? ''
										: this.comboGoodsId
							}

							, {
								fieldLabel : '组合商品名称',
								name : 'scComboProduct.comboGoodsName',
								maxLength : 60
							}

							, {
								fieldLabel : '组合商品描述',
								name : 'scComboProduct.productComDesc',
								xtype : 'textarea',
								maxLength : 500
							}

							, {
								fieldLabel : '扩展1',
								name : 'scComboProduct.ext1',
								maxLength : 60
							}

							, {
								fieldLabel : '扩展2',
								name : 'scComboProduct.ext2',
								maxLength : 60
							}

							, {
								fieldLabel : '扩展3',
								name : 'scComboProduct.ext3',
								maxLength : 60
							}

							, {
								fieldLabel : '扩展4',
								name : 'scComboProduct.ext4',
								maxLength : 60
							}

							, {
								fieldLabel : '扩展5',
								name : 'scComboProduct.ext5',
								maxLength : 60
							}

							, {
								fieldLabel : '扩展6',
								name : 'scComboProduct.ext6',
								maxLength : 60
							}

							, {
								fieldLabel : '扩展7',
								name : 'scComboProduct.ext7',
								maxLength : 60
							}

							, {
								fieldLabel : '扩展8',
								name : 'scComboProduct.ext8',
								maxLength : 60
							}

							, {
								fieldLabel : '扩展9',
								name : 'scComboProduct.ext9',
								maxLength : 60
							}

							, {
								fieldLabel : '扩展10',
								name : 'scComboProduct.ext10',
								maxLength : 60
							}

							, {
								fieldLabel : '扩展11',
								name : 'scComboProduct.ext11'
							}

							, {
								fieldLabel : '扩展12',
								name : 'scComboProduct.ext12'
							}

							, {
								fieldLabel : '扩展13',
								name : 'scComboProduct.ext13'
							}

							, {
								fieldLabel : '扩展14',
								name : 'scComboProduct.ext14'
							}

							, {
								fieldLabel : '扩展15',
								name : 'scComboProduct.ext15'
							}

							, {
								fieldLabel : '扩展16',
								name : 'scComboProduct.ext16',
								xtype : 'datefield',
								format : 'Y-m-d',
								value : new Date()
							}

							, {
								fieldLabel : '扩展17',
								name : 'scComboProduct.ext17',
								xtype : 'datefield',
								format : 'Y-m-d',
								value : new Date()
							}

							, {
								fieldLabel : '扩展18',
								name : 'scComboProduct.ext18',
								xtype : 'datefield',
								format : 'Y-m-d',
								value : new Date()
							}

							, {
								fieldLabel : '扩展19',
								name : 'scComboProduct.ext19',
								xtype : 'datefield',
								format : 'Y-m-d',
								value : new Date()
							}

							, {
								fieldLabel : '扩展20',
								name : 'scComboProduct.ext20',
								xtype : 'datefield',
								format : 'Y-m-d',
								value : new Date()
							}, {
								xtype : 'fieldset',
								collapsible : true,
								title : '选择商品',
								items : [this.gridPanel]
							}

							]
						});
				// 加载表单对应的数据
				if (this.comboGoodsId != null
						&& this.comboGoodsId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath
										+ '/goods/getScComboProduct.do?comboGoodsId='
										+ this.comboGoodsId,
								root : 'data',
								preName : 'scComboProduct'
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
							url : __ctxPath + '/goods/saveScComboProduct.do',
							msgSuccess : '成功删除该记录！',
							msgFailure : '操作出错，请联系管理员！',
							callback : function(fp, action) {
								var gridPanel = Ext
										.getCmp('ScComboProductGrid');
								if (gridPanel != null) {
									gridPanel.getStore().reload();
								}
								this.close();
							}
						});
			}// end of save

		});