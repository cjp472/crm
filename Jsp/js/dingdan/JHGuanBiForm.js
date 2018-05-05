JHGuanBiForm = Ext
		.extend(
				Ext.Window,
				{
					// 构造函数
					constructor : function(_cfg) {
						Ext.applyIf(this, _cfg);
						// 必须先初始化组件
						this.initUIComponents();
						JHGuanBiForm.superclass.constructor.call(this, {
							id : 'JHGuanBiFormWin',
							layout : 'fit',
							items : this.panel,
							width : 400,
							height : 240,
							modal : true,
							maximizable : true,
							title : '关闭机会',
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
						this.panel = new Ext.FormPanel(
								{
									border : false,
									labelAlign : 'right',
									labelWidth : 50,
									bodyStyle : 'overflow-y:auto;padding:10px;background-color:#fff',
									items : [
											{
												layout : 'column',
												border : false,
												items : [{
													layout : 'form',
													border : false,
													labelWidth : 50,
													columnWidth : .5,
													items : [{
														xtype : 'combo',
														fieldLabel : '原因',
														mode : 'local',
														store : [],
														anchor : '100%',
														allowBlank : false
													}]
												}]
											},
											{
												xtype : 'textarea',
												height : 100,
												fieldLabel : '说明',
												anchor : '95%'
											}]
								})

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
							url : __ctxPath + '/outb/saveObCallbatch.do',
							msgSuccess : '成功删除该记录！',
							msgFailure : '操作出错，请联系管理员！',
							callback : function(fp, action) {
								var gridPanel = Ext.getCmp('ObCallbatchGrid');
								if (gridPanel != null) {
									gridPanel.getStore().reload();
								}
								this.close();
							}
						});
					}// end of save

				});