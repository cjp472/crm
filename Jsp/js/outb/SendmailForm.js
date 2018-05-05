/**
 * @author:cf0666@gmail.com
 * @class ConHushouView
 * @extends Ext.Panel
 * @description [ConHushou]管理
 * @company 优创融联科技
 * @createtime:
 */
YXtaskActionForm.sendMail = function(Email) {
		var toolbar = YXtaskActionForm.initToolbar();
		var copyFieldItem = new copyFieldItems();
		
		var reader=new Ext.data.JsonReader({
					root : 'data'
				}, [{
							name : 'mail.recipientIDs',
							mapping : 'recipientIDs'
						}, {
							name : 'mail.copyToIDs',
							mapping : 'copyToIDs'
						}, {
							name : 'mail.mailStatus',
							mapping : 'mailStatus'
						}, {
							name : 'mail.fileIds',
							mapping : 'fileIds'
						}, {
							name : 'mail.mailId',
							mapping : 'mailId'
						}, {
							name : 'mail.recipientNames',
							mapping : 'recipientNames'
						}, {
							name : 'mail.subject',
							mapping : 'subject'
						}, {
							name : 'mailImportantFlag',
							mapping : 'importantFlag'
						}, {
							name : 'mail.filenames',
							mapping : 'filenames'
						}, {
							name : 'mail.content',
							mapping : 'content'
						}, {
							name : 'mail.copyToNames',
							mapping : 'copyToNames'
						}]);
						
	var formpanel = new Ext.FormPanel({
		url : __ctxPath + '/communicate/saveMail.do',
		id : 'mailFormPanel',
		style : 'padding-top:10px;background-color:#fff',
		border : false,
		labelAlign : 'right',
		labelWidth : 70,
		autoHeight: true,
		items : [
			// -----------------------------------------hidden 的属性
					{
						fieldLabel : '收件人ID列表用,分隔',
						name : 'mail.recipientIDs',
						id : 'mail.recipientIDs',
						xtype : 'hidden'
					}, {
						fieldLabel : '抄送人ID列表用,分开',
						name : 'mail.copyToIDs',
						id : 'mail.copyToIDs',
						xtype : 'hidden'
					}, {
						fieldLabel : '邮件状态',
						name : 'mail.mailStatus',
						id : 'mail.mailStatus',
						xtype : 'hidden',
						value : 1
					}, {
						fieldLabel : '附件IDs',
						name : 'mail.fileIds',
						xtype : 'hidden',
						id : 'mail.fileIds'
					}, {
						fieldLabel : 'BOXID',
						name : 'boxId',
						xtype : 'hidden',
						id : 'mailBoxId'
					}, {
						fieldLabel : 'MailId',
						name : 'mail.mailId',
						xtype : 'hidden',
						id : 'mail.mailId'
					}, {
						fieldLabel : '操作',
						name : 'replyBoxId',
						xtype : 'hidden',
						id : 'mail.replyBoxId'
					}, {
						fieldLabel : '附件名称列表',
						name : 'mail.filenames',
						xtype : 'hidden',
						id : 'mail.filenames'
					},
			// ------------------------------------------ hidden end

				{
					fieldLabel : '主题',
					xtype : 'textfield',
					name : 'mail.subject',
					id : 'mail.subject',
					allowBlank : false,
					anchor : '95%',
					blankText : '邮件主题为必填'
				}, {
					xtype : 'compositefield',
					fieldLabel : '收件人',
					anchor : '95%',
					layout : 'column',
					items : [
//						{
//								width : "73%",
//								height : 21,
//								name : 'mail.recipientNames',
//								id : 'mail.recipientNames',
//								xtype : 'textfield',
//								value : Email,
//								allowBlank : false,
//								blankText : '请选择收件人'
//							}, {
//								xtype : 'button',
//								text : '选择收件人',
//								iconCls : 'btn-mail_recipient',
//								handler : function() {
//								}
//							}, 
								{
								xtype : 'button',
								text : '我要抄送',
								iconCls : 'btn-mail_copy',
									handler : function() {
										var copyField = Ext.getCmp('copyField');
										copyField.show();
									}
							}]
				}, 	{
					xtype : 'container',// 抄送人container
					id : 'copyField',
					layout : 'column',
					height:32,
					hidden : true,
					defaultType : 'textfield',
					items : [copyFieldItem]
				}, {
					layout : 'column',
					border : false,
					items : [{
								columnWidth : .48,
								layout : 'form',
								border : false,
								items : [{
											hiddenName : 'mail.importantFlag',
											id : 'mailImportantFlag',
											xtype : 'combo',
											mode : 'local',
											editable : false,
											value : '1',
											triggerAction : 'all',
											store : [['1', '一般'], ['2', '重要'],
											['3', '非常重要']],
											fieldLabel : '优先级',
											anchor : '95%'
										}]
							}, {
								columnWidth : .49,
								layout : 'form',
								border : false,
								items : [{
											xtype : 'combo',
											mode : 'local',
											store : [],
											fieldLabel : '模板',
											anchor : '95%'
										}]
							}]
				}, {
					fieldLabel : '内容',
					xtype : 'htmleditor',
					height : 250,
					anchor : '95%'
				}, {
					xtype : 'container',
					layout : 'column',
					fieldLabel : '附件',
					anchor : '100%',
					items : [{
								columnWidth : .85,
								border : false,
								layout : 'form',
								items : [{
											xtype : 'panel',
											height : 50,
											name : 'filenames.display',
											id : 'filenames.display',
											items : '',
											autoScroll : true
										}]
							}, {
								columnWidth : .15,
								border : false,
								layout : 'form',
								buttonAlign : 'right',
								defaultType : 'button',
								items : [{
											text : '上传附件',
											iconCls : 'menu-attachment',
											handler : function() {

											}
										}, {
											text : '清除附件',
											iconCls : 'reset',
											handler : function() {
												Ext.getCmp('mail.fileIds').setValue('');
												Ext.getCmp('mail.filenames').setValue('');
												Ext.getCmp('filenames.display').update();
											}
										}]
							}]
				}, {
					layout : 'column',
					border : false,
					style : 'margin-left:90px',
					items : [{
						xtype : 'radio',
						columnWidth : .2,
						name : 'mailradio',
						check : true,
						boxLabel : '立即发送',
						listeners : {
							'check' : function(radio, check) {
								if (check) {
									Ext.get('mailtime').dom.style.display = 'none';
								}

							}
						}
					}, {
						xtype : 'radio',
						name : 'mailradio',
						columnWidth : .2,
						boxLabel : '定时发送',
						listeners : {
							'check' : function(radio, check) {
								if (check) {
									Ext.get('mailtime').dom.style.display = 'block';
								}
							}
						}
					}, {
						id : 'mailtime',
						columnWidth : .3,
						style : 'display:none',
						border : false,
						items : [{
									xtype : 'datefield',
									format : 'y-m-s h:s',
									width : 120
								}]
					}]
				}

		]
			// form items
	});
	
	
	var win = new Ext.Window({
				width : 800,
				title : '发送邮件',
				height : 500,
				id : 'sendWin',
				autoScroll : true,
				layout : 'fit',
				items : [formpanel],
				buttonAlign : 'center',
				buttons : [{
							text : '存草稿',
							iconCls : 'btn-save',
							handler : function() {
//								Ext.getCmp('btn-mail_send').close();
								var mailStatus = Ext.getCmp('mail.mailStatus');
								mailStatus.setValue(0);
								var mailform = Ext.getCmp('mailFormPanel');
								if(mailform.getForm().isValid()){
									mailform.getForm().submit({
										waitMsg : '正在保存草稿,请稍候...',
										success : function(mailform, o) {
											Ext.Msg.confirm('操作信息', '草稿保存成功！继续发邮件?', function(btn) {
												if (btn == 'yes') {
													mailform.getForm().reset();
												} else {
													var tabs = Ext.getCmp('centerTabPanel');
													tabs.remove('MailForm');
												}
											});
										},
										failure : function(mailform, o) {
											Ext.ux.Toast.msg('错误信息', o.result.msg);
										}
									});
								}
							}
						}, {
							text : '发送',
							iconCls : 'btn-mail_send',
							handler : function() {
//								Ext.getCmp('btn-mail_send').close();
								var mailform = Ext.getCmp('mailFormPanel');
								var mailStatus = Ext.getCmp('mail.mailStatus');
								if(mailform.getForm().isValid()){
									mailStatus.setValue(1);
									mailform.getForm().submit({
										waitMsg : '正在发送邮件,请稍候...',
										success : function(fp, o) {
											Ext.Msg.confirm('操作信息', '邮件发送成功！继续发邮件?', function(btn) {
												if (btn == 'yes') {
													mailform.getForm().reset();
												} else {
													var tabs = Ext.getCmp('centerTabPanel');
													tabs.remove('MailForm');
												}
											});
										},
										failure : function(mailform, o) {
											Ext.ux.Toast.msg('错误信息', o.result.msg);
										}
									});
								}
							}
						}]
			});
	win.show();
}
YXtaskActionForm.initToolbar = function() {

	var toolbar = new Ext.Toolbar({
		height : 30,
		items : ['->',{
			text : '立即发送',
			iconCls : 'btn-mail_send',
			handler : function() {
				var mailform = Ext.getCmp('mailFormPanel');
				var mailStatus = Ext.getCmp('mail.mailStatus');
				if(mailform.getForm().isValid()){
					mailStatus.setValue(1);
					mailform.getForm().submit({
						waitMsg : '正在发送邮件,请稍候...',
						success : function(fp, o) {
							Ext.Msg.confirm('操作信息', '邮件发送成功！继续发邮件?', function(btn) {
								if (btn == 'yes') {
									mailform.getForm().reset();
								} else {
									var tabs = Ext.getCmp('centerTabPanel');
									tabs.remove('MailForm');
								}
							});
						},
						failure : function(mailform, o) {
							Ext.ux.Toast.msg('错误信息', o.result.msg);
						}
					});
				}
			}

		}, {
			text : '存草稿',
			iconCls : 'btn-mail_save',
			handler : function() {
				var mailStatus = Ext.getCmp('mail.mailStatus');
				mailStatus.setValue(0);
				var mailform = Ext.getCmp('mailFormPanel');
				if(mailform.getForm().isValid()){
					mailform.getForm().submit({
						waitMsg : '正在保存草稿,请稍候...',
						success : function(mailform, o) {
							Ext.Msg.confirm('操作信息', '草稿保存成功！继续发邮件?', function(btn) {
								if (btn == 'yes') {
									mailform.getForm().reset();
								} else {
									var tabs = Ext.getCmp('centerTabPanel');
									tabs.remove('MailForm');
								}
							});
						},
						failure : function(mailform, o) {
							Ext.ux.Toast.msg('错误信息', o.result.msg);
						}
					});
				}
			}
		}, {
			text : '重置',
			iconCls : 'reset',
			handler : function() {
				var mailForm = Ext.getCmp('MailFormPanel');
				mailForm.getForm().reset();
			}
		}, {
			text : '取消',
			iconCls : 'btn-mail_remove',
			handler : function() {
				var tabs = Ext.getCmp('centerTabPanel');
				tabs.remove('MailForm');
			}
		}
		]
	});
	return toolbar;
};
function copyFieldItems() {
	var items = [{
				xtype : 'label',
				text : '抄送人:',
				style : 'padding-left:0px;padding-top:3px;text-align:right;',
				width : 84
			}, {
				width : 330,
				fieldLabel : '抄送人姓名列表',
				name : 'mail.copyToNames',
				id : 'mail.copyToNames',
				readOnly : true
			}, {
				xtype : 'button',
				text : '选择抄送人',
				style : 'padding-left:5px;',
				iconCls : 'btn-mail_recipient',
				handler : function() {
					UserSelector.getView(function(userIds, fullnames) {
						var copyToIDs = Ext.getCmp('mail.copyToIDs');
						var copyToNames = Ext.getCmp('mail.copyToNames');
						copyToIDs.setValue(userIds);
						copyToNames.setValue(fullnames);
					}).show();
				}
			}, {
				xtype : 'button',
				text : '取消抄送',
				style : 'padding-left:5px;',
				iconCls : 'btn-delete_copy',
				handler : function() {// 取消抄送时设置为空
					var copyField = Ext.getCmp('copyField');
					var mailForm = Ext.getCmp('mailFormPanel');
					mailForm.getForm().findField('mail.copyToIDs').setValue('');
					mailForm.getForm().findField('mail.copyToNames').setValue('');
					copyField.hide();
				}
			}];
	return items;
}
function uploadMailAttach(data) {
	
	var htmls = '';
	var fileIds = Ext.getCmp('mail.fileIds');
	var ids = fileIds.getValue();
	if(ids != null && ids != '')
		ids += ',';
	var filenames = Ext.getCmp('mail.filenames');
	var names = filenames.getValue();
	if(names != null && ids != '')
		names +=',';
	var display = Ext.getCmp('filenames.display');
	var placeholder = Ext.getCmp('placeholder');
	if (placeholder != null) {// 隐藏点位符
		placeholder.hide();
	}
	for (var i = 0; i < data.length; i++) {
		ids += data[i].fileId;
		names += data[i].fileName;
		if(i < data.length - 1){
			ids += ',';
			names += ',';
		}
		htmls += '<span><a href="#" onclick="FileAttachDetail.show('
			+ data[i].fileId + ')">'
			+ data[i].fileName + '</a> <img class="img-delete" src="' + __ctxPath
			+ '/images/system/delete.gif" onclick="deleteAttach(this,'
			+ data[i].fileId + ')"/>&nbsp;|&nbsp;</span>';
	}
	fileIds.setValue(ids);
	filenames.setValue(names);
	Ext.DomHelper.append(display.body,htmls);
}

/*
 * 附件删除
 */
function deleteAttach(obj,_fileId) {
	// 删除隐藏域中的附件信息
	var fids = Ext.getCmp('mail.fileIds').getValue();
	var fnames = Ext.getCmp('mail.filenames').getValue();
	var fileIds = '';
	var filenames = '';
	if (fids.indexOf(',') < 0) {// 仅有一个附件
		Ext.getCmp('mail.fileIds').setValue('');
	} else {
		fids = fids.replace(',' + _fileId, '').replace(_fileId + ',', '');
		Ext.getCmp('mail.fileIds').setValue(fids);
	}
	Ext.get(obj.parentNode).remove();

	if (Ext.getCmp('mail.fileIds').getValue() == '') {// 假如没有附件，则显示占位行
		Ext.getCmp('placeholder').show();
	}
	var _mailId = Ext.getCmp('mail.mailId').getValue();
	if (_mailId != null && _mailId != '' && _mailId != 'undefined') {// 假如是草稿,则存草稿
		Ext.Ajax.request({
			url : __ctxPath + '/communicate/attachMail.do',
			method : 'post',
			params : {
				mailId : _mailId,
				fileId : _fileId,
				fileIds : fileIds,
				filenames : filenames
			},
			success : function() {
			}
		});
	} else {// 新邮件的时候
		Ext.Ajax.request({
			url : __ctxPath + '/system/multiDelFileAttach.do',
			params : {
				ids : _fileId
			},
			method : 'post',
			success : function() {
				Ext.ux.Toast.msg("信息提示", "成功删除所选记录！");
			}
		});
	}
}

YXtaskActionForm.LDxiaojie = function() {
	var formpanel = new Ext.FormPanel({
		id : 'summaryFormPanel',
		style : 'padding-top:10px;background-color:#fff',
		border : false,
		labelAlign : 'right',
		labelWidth : 70,
		items : [{
					xtype : 'mtdiccombo',
					fieldLabel : '营销阶段',
					hiddenName : 'busiStagId',
					name : 'busiStagIdSow',
					id : 'busiStagId_form',
					editable : true,
					lazyInit : false,
					allowBlank : false,
					triggerAction : 'all',
					forceSelection : false,
					itemKey : 'CONOB_SALETASK_YXJD',
					anchor : '98%'
				}, {
					layout : 'column',
					border : false,
					items : [{
						columnWidth : .5,
						layout : 'form',
						border : false,
						items : [{
							xtype : 'combo',
							hiddenName : 'busiStaId',
							id : 'busiStaId_form',
							mode : 'local',
							allowBlank : false,
							triggerAction : 'all',
							store : [['2', '搁置'], ['3', '待跟踪'], ['0', '预约'],
									['4', '成功'], ['5', '失败']],
							fieldLabel : '营销状态',
							anchor : '95%',
							listeners : {
								'select' : function(combo, record, index) {
									var val = index == 2 ? 'block' : 'none';
									var value = index == 4 ?'block':'none';
									Ext.get('area1').dom.style.display = val;
									Ext.get('area2').dom.style.display = val;
									Ext.get('area3').dom.style.display = value;
								}

							}
						}]
					}, {
						columnWidth : .5,
						layout : 'form',
						border : false,
						items : [
							{
									fieldLabel : '拨打结果',
									name : 'conStaIdShow',
									hiddenName : 'conStaId',
									id : 'OB_YXtask_Tree_ConStaId',
									anchor : '95%',
									xtype : 'treecomboz',
									lazyInit : false,
									tplId : 'tree_tpl',
									rootVisible : false,
									allowBlank : false,
									editable : false,
							    	forceSelection : false,
							    	url : __ctxPath+ '/system/treeByMapNameDictionary.do?mapName=CONTPHXZT&relDic=10841'
							}
						]
					}]
				}, {
					layout : 'column',
					border : false,
					items : [{
								columnWidth : .5,
								layout : 'form',
								id : 'area1',
								style : 'display:none',
								border : false,
								items : [{
											xtype : 'datefield',
											fieldLabel : '预约时间',
											name : 'booTim',
											id : 'booTim_form',
											format : 'Y-m-d',
											anchor : '95%'
										}]
							}]
				},{
					layout : 'column',
					border : false,
					style : 'display:none',
					id : 'area2',
					items : [{
								columnWidth : .5,
								layout : 'form',
								border : false,
								items : [{
											xtype : 'textfield',
											fieldLabel : '联系人',
											width : 160,
											name : 'conCusId',
											id : 'conCusId_form',
											anchor : '100%'
										}]
							}, {
								columnWidth : .5,
								layout : 'form',
								border : false,
								items : [{
											xtype : 'textfield',
											fieldLabel : '联系号码',
											name : 'conNumber',
											id : 'conNumber_form',
											width : 150
										}]
							}]
				},{
					border : false,
					layout : 'form',
					id:'area3',
					style:'display:none',
					items : [{
								xtype : 'textarea',
								height : 20,
								fieldLabel : '失败原因',
								name : 'taskExecType',
								id : 'taskExecType_form',
								anchor : '98%'
							}]
				},{
					border : false,
					layout : 'form',
					items : [{
								xtype : 'textarea',
								height : 50,
								fieldLabel : '备注',
								name : 'remark',
								anchor : '98%'
							}]
				}

		]
			// form items
		});
		
	var win = new Ext.Window({
				width : 500,
				title : '联系小结',
				height : 300,
				id : 'LDxiaojie',
				autoScroll : true,
				layout : 'fit',
				items : [formpanel],
				buttonAlign : 'center',
				buttons : [{
							text : '保存',
							iconCls : 'btn-save',
							handler : function() {
								var conStaId = Ext.getCmp("OB_YXtask_Tree_ConStaId").getItemIndex();
									$postForm({
										formPanel : Ext.getCmp("summaryFormPanel"),
										params : {
											conhisId : g_conhisId_AF,
											taskId : g_taskId_AF,
											conStaIdParam : conStaId,
											customerId : g_cusId_AF
										},
										url : __ctxPath + '/outb/saveSummaryObSaletask.do',
										msgSuccess : '成功添加该记录！',
										msgFailure : '操作出错，请联系管理员！',
										callback : function(fp, action) {
											Ext.getCmp('LDxiaojie').close();
											Ext.getCmp("UlContactHisGrid_tmp_AF").getStore().reload();
											g_isStartCon_AF = true;
										}
									});		
							}
						}]
			});
	win.show();
}
