var MailForm = function(mailId, boxId, opt,useIds, usename) {
 
	return this.setup(mailId, boxId, opt,useIds, usename);
};

MailForm.prototype.setup = function(mailId, boxId, opt,useIds, usename) {
	var toolbar = this.initToolbar();
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
	
				var formPanel = new Ext.FormPanel({
					url : __ctxPath + '/communicate/saveMail.do',
					id:'mailFormPanel',
					border:false,
					autoHeight:true,
					//autoWidth:true,
					width:'100%',
					reader : reader,
					labelAlign:'right',
			        labelWidth : 80,
					defaults:{
						anchor : '200%'
					},
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
								maxLength : 128,
								blankText : '邮件主题为必填'
							}, 
							{
								xtype : 'compositefield',
								fieldLabel : '收件人',
								anchor : '95%',
								layout:'column',
								items : [{
									width : "80%",
									height : 21,
									name : 'mail.recipientNames',
									id : 'mail.recipientNames',
									xtype : 'textfield',
									allowBlank : false,
									blankText : '请选择收件人',
									readOnly : true,
									value:usename
						
									
								}, {
									xtype : 'button',
									text : '选择收件人',
									iconCls : 'btn-mail_recipient',
									handler : function() {
										UserSelector.getView(
											function(userIds, fullnames) {
												var recipientIDs = Ext.getCmp('mail.recipientIDs');
												var recipientNames = Ext.getCmp('mail.recipientNames');
												var oldname=recipientNames.getValue();
												var olduseid=recipientIDs.getValue();
												recipientIDs.setValue(olduseid+','+userIds);
												recipientNames.setValue(oldname+','+fullnames);
											}
										).show();
									}
								}, {
									xtype : 'button',
									text : '我要抄送',
									iconCls : 'btn-mail_copy',
									handler : function() {
										var copyField = Ext.getCmp('copyField');
										copyField.show();
									}
								}]
							}, 
							{
								xtype : 'container',// 抄送人container
								id : 'copyField',
								layout : 'column',
								height:32,
								hidden : true,
								defaultType : 'textfield',
								items : [copyFieldItem]
							}, {
								xtype : 'compositefield',
								fieldLabel : '优先级',
								items : [{
									fieldLabel : '邮件优先级',
									hiddenName : 'mail.importantFlag',
									id : 'mailImportantFlag',
									xtype : 'combo',
									mode : 'local',
									editable : false,
									value : '1',
									triggerAction : 'all',
									store : [['1', '一般'], ['2', '重要'],
											['3', '非常重要']]
								}, {
									xtype : 'checkbox',
									name : 'sendMessage',
									boxLabel : '告诉他有信'
								}]
							}, {
								xtype : 'container',
								layout : 'column',
								fieldLabel : '附件',
								anchor : '100%',
								items : [ {
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
									buttonAlign:'right',
									defaultType : 'button',
									items : [{
										text : '上传附件',
										iconCls : 'menu-attachment',
										handler : function() {
											var dialog = App.createUploadDialog({
												file_cat : 'communication/innerMail',
												callback : uploadMailAttach
											});
											dialog.show();
										}
									}, {
										text : '清除附件',
										iconCls : 'reset',
										handler : function(){
											Ext.getCmp('mail.fileIds').setValue('');
											Ext.getCmp('mail.filenames').setValue('');
											Ext.getCmp('filenames.display').update();
										}
									}]
								}]
							}, {
								fieldLabel : '内容',
								name : 'mail.content',
								id : 'mail.content',
								xtype : 'htmleditor',
								height : 300,
								maxLength : 32767,
								anchor : '95%'
							}

					]
			// form items
	});
	if (mailId != null && mailId != 'undefined') {
		var _mailId = Ext.getCmp('mail.mailId');
		_mailId.setValue(mailId);
		if (opt == 'draft') {// 重载草稿
			formPanel.getForm().load({
				deferredRender : false,
				url : __ctxPath + '/communicate/getMail.do',
				method : 'post',
				params : {
					mailId : mailId,
					folderId : 3,
					boxId : boxId
				},
				waitMsg : '正在载入数据...',
				success : function(form, action) {
					var copyToIDs = Ext.getCmp('mail.copyToIDs');
					if (copyToIDs.getValue() != '') {// 假如草稿有抄送人,激活抄送人控件
						var copyField = Ext.getCmp('copyField');
						copyField.show();
					}

					var filenames = Ext.getCmp('mail.filenames').getValue();
					if (filenames != '') {
						var display = Ext.getCmp('filenames.display');
						var placeholder = Ext.getCmp('placeholder');
						if (placeholder != null) {// 载入草稿并有附件时,点位行隐藏
							placeholder.hide();
						}
						var fnames = filenames.split(',');
						var fids = Ext.getCmp('mail.fileIds').getValue().split(',');
						var htmls = '';
						for (var i = 0; i < fnames.length; i++) {// 显示附件
							htmls += '<span><a href="#" onclick="FileAttachDetail.show('
								+ fids[i] + ')">'
								+ fnames[i] + '</a> <img class="img-delete" src="' + __ctxPath
								+ '/images/system/delete.gif" onclick="deleteAttach(this,'
								+ fids[i] + ')"/>&nbsp;|&nbsp;</span>';
						}
						Ext.DomHelper.append(display.body,htmls);
					}
				},
				failure : function(form, action) {

				}
			});
		} else if (opt == 'reply') {// 回复
			formPanel.getForm().load({
				deferredRender : false,
				url : __ctxPath + '/communicate/optMail.do',
				method : 'post',
				params : {
					mailId : mailId,
					boxId : boxId,
					opt : '回复'
				},
				waitMsg : '正在载入数据...',
				success : function(form, action) {
					Ext.getCmp('mail.replyBoxId').setValue(boxId);
				},
				failure : function(form, action) {
				}
			});
		} else if (opt == 'forward') {
			formPanel.getForm().load({
				deferredRender : false,
				url : __ctxPath + '/communicate/optMail.do',
				method : 'post',
				params : {
					mailId : mailId,
					opt : '转发'
				},
				waitMsg : '正在载入数据...',
				success : function(form, action) {
				},
				failure : function(form, action) {
				}
			});
		}
	}
	if (boxId != null && boxId != 'undefined') {
		var mailBoxId = Ext.getCmp('mailBoxId');
		mailBoxId.setValue(boxId);
	}
	
	var mailFormPanel=new Ext.Panel({
		title : '发送邮件',
		iconCls : 'menu-mail_send',
		autoScroll:true,
		tbar : toolbar,
		id:'MailForm',
		layout:'hbox',
		margins:'0 0 6 0',
		layoutConfig: {
            padding:'5',
            pack:'center',
            align:'middle'
        },
        defaults:{margins:'0 5 0 0'},
        items:[formPanel]
	});
	
	return mailFormPanel;

};

/**
 * 
 * @return {}
 */
MailForm.prototype.initToolbar = function() {

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
				var mailForm = Ext.getCmp('mailFormPanel');
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
/**
 * 增加抄送控件
 * 
 * @return {}
 */
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
/**
 * 附件上传,可多附件
 * 
 * @param {}
 *            data
 */
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
