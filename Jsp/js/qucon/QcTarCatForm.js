/**
 * @author cf0666@gmail.com
 * @createtime
 * @class QcTarCatForm
 * @extends Ext.Window
 * @description QcTarCat表单
 * @company 优创融联科技
 */
QcTarCatForm = Ext.extend(Ext.Window, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 必须先初始化组件
				this.initUIComponents();
				QcTarCatForm.superclass.constructor.call(this, {
							id : 'QcTarCatFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 200,
							width : 350,
							maximizable : true,
							title : '考核指标分类详细信息',
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
							id : 'QcTarCatForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'qcTarCat.tarCatId',
								xtype : 'hidden',
								value : this.tarCatId == null
										? ''
										: this.tarCatId
							}

							, {
								fieldLabel : '上级ID',
								name : 'qcTarCat.parTarCatId',
								xtype : 'hidden',
								value : this.nodeId
							}

							, {
								fieldLabel : '名称',
								name : 'qcTarCat.catName',
								allowBlank : false,
								maxLength : 256
							}

							, {
								fieldLabel : '序号',
								name : 'qcTarCat.disorder',
								allowBlank : false,
								xtype : 'numberfield'
							}
							]
						});
				// 加载表单对应的数据
				if (this.tarCatId != null && this.tarCatId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath
										+ '/qucon/getQcTarCat.do?tarCatId='
										+ this.tarCatId,
								root : 'data',
								preName : 'qcTarCat'
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
				$postForm({
							formPanel : this.formPanel,
							scope : this,
							url : __ctxPath + '/qucon/saveQcTarCat.do',
							callback : function(fp, action) {
								var gridPanel = Ext.getCmp('qcTarCatTreePanel');
								if (gridPanel != null) {
									this.close();
									gridPanel.root.reload();
								}
							}
						});
			}// end of save

		});