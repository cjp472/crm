/**
 * @author : chenfeng
 * @createtime
 * @class BmFactorForm
 * @extends Ext.Window
 * @description BmFactor表单
 * @company 北京灵信互动信息技术有限公司
 */
BmFactorForm = Ext.extend(Ext.Window, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 必须先初始化组件
				this.initUIComponents();
				BmFactorForm.superclass.constructor.call(this, {
							id : 'BmFactorFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '影响因素详细信息',
							buttonAlign : 'center',
							buttons : [{
										text : '保存',
										iconCls : 'btn-save',
										scope : this,
										handler : this.save
									}, {
										text : '清空',
										iconCls : 'btn-reset',
										scope : this,
										handler : this.reset
									}, {
										text : '取消',
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
							// id : 'BmFactorForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'bmFactor.factorId',
								xtype : 'hidden',
								value : this.factorId == null
										? ''
										: this.factorId
							}, {
								fieldLabel : '影响因素名称',
								name : 'bmFactor.factorName',
								maxLength : 50
							}, {
								fieldLabel : '类对象',
								name : 'bmFactor.classObj',
								maxLength : 250
							}, {
								fieldLabel : '参数值',
								name : 'bmFactor.classValue',
								maxLength : 250
							}, {
								fieldLabel : '显示值',
								name : 'bmFactor.className',
								maxLength : 250
							}, {
								fieldLabel : '筛选条件',
								name : 'bmFactor.condition',
								maxLength : 250
							}

							, {
								fieldLabel : '描述',
								name : 'bmFactor.comments',
								maxLength : 255
							}

							]
						});
				// 加载表单对应的数据
				if (this.factorId != null && this.factorId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath
										+ '/financial/getBmFactor.do?factorId='
										+ this.factorId,
								root : 'data',
								preName : 'bmFactor'
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
							url : __ctxPath + '/financial/saveBmFactor.do',
							callback : function(fp, action) {
								var gridPanel = Ext.getCmp('BmFactorGrid');
								if (gridPanel != null) {
									gridPanel.getStore().reload();
								}
								this.close();
							}
						});
			}// end of save

		});