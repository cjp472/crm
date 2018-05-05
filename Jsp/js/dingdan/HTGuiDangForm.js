HTGuiDangForm = Ext
		.extend(
				Ext.Window,
				{
					// 构造函数
					constructor : function(_cfg) {
						Ext.applyIf(this, _cfg);
						// 必须先初始化组件
						this.initUIComponents();
						HTGuiDangForm.superclass.constructor.call(this, {
							id : 'HTGuiDangFormWin',
							layout : 'fit',
							items : this.panel,
							width : 550,
							height : 300,
							modal : true,
							maximizable : true,
							title : '合同归档',
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
									labelWidth : 70,
									bodyStyle : 'overflow-y:auto;padding:10px;background-color:#fff',
									items : [
											{
												xtype : 'textarea',
												height : 100,
												fieldLabel : '说明',
												anchor : '96%'
											},{
												xtype:'fieldset',
												title:'归档分类',
												items:[{
													xtype:'radio',
													boxLabel:'销售合同',
													name:'htradio'
												},{
													xtype:'radio',
													boxLabel:'服务合同',
													name:'htradio'
												},{
													xtype:'radio',
													boxLabel:'采购合同',
													name:'htradio'
												}]
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