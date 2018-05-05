var MessageForm = {
	getView : function(callback,isSingle) {
	
	
	
	
		this.initUIComponents();
		var win = new Ext.Window({
					id : 'MessageForm',
					flex:1,
					title:'发送消息',
					layout : 'fit',
					width:580,
					height:480,
					autoScroll:true,
					border : false,
					items : [this.formPanel]
				});
		return win;
	},
	initUIComponents : function() {
		
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
					name : 'mail.content',
					mapping : 'content'
				}, {
					name : 'mail.copyToNames',
					mapping : 'copyToNames'
				}]);
		
		this.formPanel = new Ext.FormPanel({
			id : 'mFormPanel',
			frame : false,
			border : false,
			
			url : __ctxPath + '/info/sendShortMessage.do',
			reader : reader,
			defaults : {
				allowBlank : false,
				//selectOnFocus : true,
				msgTarget : 'side'
			},
			modal : true,
			layout : 'form',
			plain : true,
			//scope : this,
			buttonAlign : 'center',
			items : [{
						xtype : 'hidden',
						name : 'userId',
						id : 'userId'
					}, {
						xtype : 'fieldset',
						style : 'padding:0px',
						border : false,
						hight : 70,
						layout : 'column',
						items : [{
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
						},{
									xtype : 'label',
									text : '收信人:',
									width : 80
								}, {
									xtype : 'textarea',
									name : 'userFullname',
									id : 'userFullname',
									allowBlank : false,
									readOnly : true,
									width : 290,
									height : 50
								}, {
									xtype : 'textarea',
									hidden : true,
									name : 'fileid_1',
									id : 'fileid_1'
								}, {
									xtype : 'textarea',
									hidden : true,
									name : 'filename_1',
									id : 'filename_1'
								}, {
									xtype : 'textarea',
									hidden : true,
									name : 'sendMesType_1',
									id : 'sendMesType_1'
								}, {
									xtype : 'container',
									border : true,
									width : 100,
									heigth : 30,
									items : [{
										xtype : 'button',
										iconCls : 'btn-mail_recipient',
										text : '添加联系人 ',
										width : 80,
										handler : function() {
											UserRoleSelector.getView(
															function(userIds, fullnames) {
																var userId = Ext.getCmp('userId');
																var userFullname = Ext.getCmp('userFullname');
																if (userId.getValue() != ''&& userFullname.getValue() != '') {
																	var stId = (userId.getValue() + ',').concat(userIds);
																	var stName = (userFullname.getValue() + ',').concat(fullnames);
																	var ids = uniqueArray(stId.split(','));
																	var names = uniqueArray(stName.split(','));
																	userId.setValue(ids.toString());
																	userFullname.setValue(names.toString());
																} else {
																	userId.setValue(userIds);
																	userFullname.setValue(fullnames);
																}

															}).show();
										}
									}, {
										xtype : 'button',
										text : '清除联系人',
										iconCls : 'btn-del',
										width : 80,
										handler : function() {
											var name = Ext.getCmp('userFullname');
											var id = Ext.getCmp('userId');
											name.reset();
											id.reset();
										}
									}]
								}]
					}, {
						xtype : 'fieldset',
						border : false,
						style : 'padding:0px',
						layout : 'column',
						height : 30,
						items : [{
							xtype : 'label',
							text : '消息类别：',
							width : 80
						},{
							fieldLabel : '',
							anchor : '100%',
							xtype : 'combo',
							mode : 'local',
							lazyInit : false,
							allowBlank : false,
							id : 'mesType',
							name : 'mesType',
							valueField : 'desc',
							hiddenName : 'zxx',
							displayField : 'desc',
							triggerAction : 'all',
							store : new Ext.data.SimpleStore({
										fields : ['code','desc'],
										data : [['1', '信息报备'],
												['2', '最新业务提醒'],
												['3', '机具故障提醒'],
												['4', '业务话术'],
												['5', '其他']],
										autoLoad : true
									}),
							editable : false,
							value : '',
							listeners : {
								select : function(combobox,record, index) {
									//alert();
									if(index == 0)
										Ext.getCmp('sendMesType_1').setValue("信息报备");
									else if(index == 1)
										Ext.getCmp('sendMesType_1').setValue("最新业务提醒");
									else if(index == 2)
										Ext.getCmp('sendMesType_1').setValue("机具故障提醒");
									else if(index == 3)
										Ext.getCmp('sendMesType_1').setValue("业务话术");
									else if(index == 4)
										Ext.getCmp('sendMesType_1').setValue("其他");
								}
							}
						}]
					},{
						xtype : 'container',
						layout : 'column',
						width : 500,
						items : [{
							columnWidth : .18,
							xtype : 'label',
							text : '·'
						}, {
							columnWidth : .67,
							border : false,
							layout : 'form',
							items : [{
								xtype : 'panel',
								height : 50,
								name : 'filenames',
								id : 'filenames',
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
									Ext.getCmp('filename_1').setValue('');
									Ext.getCmp('fileid_1').setValue('');
									Ext.getCmp('filenames').update();
								}
							}]
						}]
					}, {
						xtype : 'fieldset',
						border : false,
						style : 'padding:0px',
						layout : 'column',
						height : 230,
						items : [{
									xtype : 'label',
									text : '内容:',
									width : 80
								}, {
									id : 'sendContent',
									xtype : 'textarea',
									name : 'content',
									width : 400,
									height:220,
									//maxLength : 128,
									autoScroll:true,
									allowBlank : false
								}]
					}],
			buttons : [{
						text : '发送',
						iconCls : 'btn-mail_send',
						handler :this.send

					}, {
						text : '重置',
						iconCls : 'reset',
						handler :this.reset
					}, {
								text : '关闭',
								iconCls : 'btn-cancel',
								scope : this,
								handler : this.close
							}
					
					]
		});

	},//end of initUIComponents
	send:function(){
	    var message = Ext.getCmp('mFormPanel');
		if (message.getForm().isValid()) { 
			message.getForm().submit({
						waitMsg : '正在 发送信息',
						success : function(message, o) {
							var grid = Ext.getCmp('ReceiveMessage');
							if(grid){
								grid.getStore().reload();
							}
							var messagewidow = Ext.getCmp('MessageForm');
							
							messagewidow.close();
							var message = Ext
									.getCmp('mFormPanel');
							Ext.ux.Toast.msg('操作信息',
									'信息发送成功！');
							

						}
					});
		}
	},
		/**
	 * 关闭当前窗口
	 */
	close : function() {
		Ext.getCmp('MessageForm').close();
	},
	reset:function(){
	   var message = Ext.getCmp('mFormPanel');
	   message.getForm().reset();
	}
}


/**
 * 附件上传,可多附件
 * 
 * @param {}
 *            data
 */
function uploadMailAttach(data) {
	//alert(data.length);
	//alert(data[0].fileId);
	var htmls = '';
	var fileIds = Ext.getCmp('mail.fileIds');
	var ids = fileIds.getValue();
	//alert(ids);
	if(ids != null && ids != '')
		ids += ',';
	var filenames = Ext.getCmp('mail.filenames');
	var names = filenames.getValue();
	//alert(names);
	if(names != null && ids != '')
		names +=',';
	var display = Ext.getCmp('filenames');
	var placeholder = Ext.getCmp('placeholder');
	if (placeholder != null) {// 隐藏点位符
		placeholder.hide();
	}
	//alert(placeholder);
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
	//alert(ids+ "    " +names);
	Ext.DomHelper.append(display.body,htmls);
	Ext.getCmp('filename_1').setValue(names);Ext.getCmp('fileid_1').setValue(ids);
	
	
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
