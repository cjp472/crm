DDXuanZeForm = Ext
		.extend(
				Ext.Window,
				{
					// 构造函数
					constructor : function(_cfg) {
						Ext.applyIf(this, _cfg);
						// 必须先初始化组件
						this.initUIComponents();
						DDXuanZeForm.superclass.constructor.call(this, {
							id : 'DDXuanZeFormWin',
							layout : 'fit',
							items : this.panel,
							width : 300,
							height : 150,
							modal : true,
							maximizable : true,
							title : '选择订单类型',
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
									items : [{
														xtype : 'combo',
														fieldLabel : '单据类别',
														mode : 'local',
														store : [['1','服务单'],['2','销售单'],['3','电子订单']],
														anchor : '100%',
														allowBlank : false,
														listeners:{
															'select':function(combo,record,index){
																	if(index == 0){
																		var tabs = Ext.getCmp('centerTabPanel');
																		var aForm = Ext.getCmp('DDFuWuDanFormWin');
																		if (aForm != null) {
																			tabs.remove('DDFuWuDanFormWin');
																		}
																		aForm = new DDFuWuDanForm();
																		tabs.add(aForm);
																		tabs.activate(aForm);
																	}else if(index == 1 || index == 2){
																		var tabs = Ext.getCmp('centerTabPanel');
																		var aForm = Ext.getCmp('DDLuRuFormWin');
																		if (aForm != null) {
																			tabs.remove('DDLuRuFormWin');
																		}
																		aForm = new DDLuRuForm();
																		tabs.add(aForm);
																		tabs.activate(aForm);
																	}
																	
														Ext.getCmp('DDXuanZeFormWin').close();
															}
														}
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