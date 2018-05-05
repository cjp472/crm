/**
 * @author
 * @createtime
 * @class DepartmentForm
 * @extends Ext.Window
 * @description DepartmentForm表单
 * @company 优创融联科技
 */
UlContactEmplForm = Ext.extend(Ext.Window, {
			// 内嵌FormPanel
			formPanel : null,
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 必须先初始化组件
				this.initUIComponents();
				UlContactEmplForm.superclass.constructor.call(this, {
							id : 'UlContactEmplFormWin',
							title : '添加联系方式',
//							iconCls : 'menu-department',
							layout : 'fit',
							width : 400,
							height : 300,
							items : this.formPanel,
							border : false,
							modal : true,
							plain : true,
							keys : {
								key : Ext.EventObject.ENTER,
								fn : this.save,
								scope : this
							},
							buttonAlign : 'center',
							buttons : [{
										text : '保存',
										iconCls : 'btn-save',
										handler : this.save,
										scope : this
									}, {
										text : '取消',
										iconCls : 'btn-cancel',
										handler : function() {
											Ext.getCmp('UlContactEmplFormWin')
													.close();
										}
									}]
						});
			},// end of the constructor
			// 初始化组件
			initUIComponents : function() {
				this.formPanel = new Ext.form.FormPanel({
							frame : false,
							id : 'UlContactEmplForm',
							bodyStyle : 'padding : 5px;',
							layout : 'form',
							defaultType : 'textfield',
							url : __ctxPath + '/xitong/addContactUlEmployee.do',
							
							reader : new Ext.data.JsonReader({
										root : 'data'
									}, [{
												name : 'contactType',
												mapping : 'contactType'
											}, {
												name : 'contactValue',
												mapping : 'contactValue'
											}]),

							defaults : {
								anchor : '95%,95%',
								allowBlank : false,
								selectOnFocus : true,
								msgTarget : 'side'
							},
							items : [{
										xtype : 'hidden',
										name : 'ulContactEmpl.contactEmplId',
										id : 'contactEmplId'
									}, {
										xtype : 'hidden',
										name : 'ulContactEmpl.useid',
										id : 'useid',
										value : this.useid
									}, {
										fieldLabel : '类型',
										hiddenName : 'ulContactEmpl.contactType',
										blankText : '类型为必填!',
										id : 'contactType',
										itemKey:'LXFS001',
										xtype : 'mtdiccombo'
									}, {
										fieldLabel : '地址/号码',
										name : 'ulContactEmpl.contactValue',
										blankText : '地址/号码为必填!',
										id : 'contactValue',
									}]
						});
			},

			/**
			 * 保存
			 */
			save : function() {
				if (Ext.getCmp('UlContactEmplForm').getForm().isValid()) {
					Ext.getCmp('UlContactEmplForm').getForm().submit({
								waitMsg : '正在提交联系方式信息',
								success : function(formPanel, o) {
									Ext.ux.Toast.msg('操作信息', '数据操作成功！');
									//更新信息
									Ext.getCmp('UlContactGrid_empl').getStore().reload();
									Ext.getCmp('UlContactEmplFormWin').close();
								}
							});
				}
			}

		});