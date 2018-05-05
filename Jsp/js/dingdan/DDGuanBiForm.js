DDGuanBiForm = Ext
		.extend(
				Ext.Window,
				{
					// 构造函数
					constructor : function(_cfg) {
						Ext.applyIf(this, _cfg);
						// 必须先初始化组件
						this.initUIComponents();
						DDGuanBiForm.superclass.constructor.call(this, {
							id : 'DDGuanBiFormWin',
							layout : 'fit',
							items : this.panel,
							width : 550,
							height : 260,
							modal : true,
							maximizable : true,
							title : '关闭订单',
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
						var ulBbsHuatiPanel = new Ext.Panel({
							fieldLabel : '附件',
							xtype : 'panel',
							name : 'ulBbsHuatiPanel',
							frame : false,
							border : true,
							bodyStyle : 'padding:4px 4px 4px 4px',
							height : 80,
							autoScroll : true,
							html : ''
						});
						var ulBbsHuatifileIds = new Ext.form.Hidden({
							id : 'ulBbsHuatifileIds',
							xtype : 'hidden',
							name : 'fileIds'
						});
						this.panel = new Ext.FormPanel(
								{
									border : false,
									labelAlign : 'right',
									labelWidth : 70,
									bodyStyle : 'overflow-y:auto;padding:10px;background-color:#fff',
									items : [
											{
												layout : 'column',
												border : false,
												items : [{
													layout : 'form',
													border : false,
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
												height : 50,
												fieldLabel : '说明',
												anchor : '100%'
											}

											,
											{
												xtype : 'container',
												layout : 'column',
												border : false,
												anchor : '100%',
												defaults : {
													border : false,
													anchor : '100%'
												},
												items : [
														{
															columnWidth : .82,
															layout : 'form',
															border : false,
															items : [ulBbsHuatiPanel]
														},
														{
															columnWidth : .18,
															border : false,
															items : [
																	{
																		xtype : 'button',
																		text : '添加附件',
																		border : false,
																		iconCls : 'menu-attachment',
																		handler : function() {
																			var dialog = App
																					.createUploadDialog({
																						file_cat : 'outb/ObProject',
																						callback : function(
																								data) {
																							var fileIds = ulBbsHuatifileIds;
																							var filePanel = ulBbsHuatiPanel;

																							for ( var i = 0; i < data.length; i++) {
																								if (fileIds
																										.getValue() != '') {
																									fileIds
																											.setValue(fileIds
																													.getValue() + ',');
																								}
																								fileIds
																										.setValue(fileIds
																												.getValue()
																												+ data[i].fileId);
																								Ext.DomHelper
																										.append(
																												filePanel.body,
																												'<span><a href="#" onclick="FileAttachDetail.show('
																														+ data[i].fileId
																														+ ')">'
																														+ data[i].fileName
																														+ '</a> <img class="img-delete" src="'
																														+ __ctxPath
																														+ '/images/system/delete.gif" onclick="ObProjectForm.removeResumeFile(this,'
																														+ data[i].fileId
																														+ ')"/>&nbsp;|&nbsp;</span>');
																							}
																						}
																					});
																			dialog
																					.show(this);
																		}
																	},
																	{
																		xtype : 'button',
																		border : false,
																		text : '清除附件',
																		iconCls : 'reset',
																		handler : function() {
																			var fileIds = ulBbsHuatifileIds;
																			var filePanel = ulBbsHuatiPanel;

																			filePanel.body
																					.update('');
																			fileIds
																					.setValue('');
																		}
																	},
																	ulBbsHuatifileIds]
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