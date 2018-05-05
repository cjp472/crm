/**
 * @author cf0666@gmail.com
 * @createtime
 * @class UlBbsHuatiForm
 * @extends Ext.Window
 * @description UlBbsHuati表单
 * @company 优创融联科技
 */
UlBbsHuatiForm = Ext.extend(Ext.Window, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		UlBbsHuatiForm.superclass.constructor.call(this, {
					id : 'UlBbsHuatiFormWin',
					layout : 'fit',
					items : this.formPanel,
					modal : true,
					height : 310,
					width : 500,
					maximizable : true,
					title : '知识信息',
					buttonAlign : 'center',
					buttons : [{
								iconCls : 'btn-save',
								text : '保存',
								xtype : 'button',
								scope : this,
								handler : this.save
							}, {
								iconCls : 'btn-cancel',
								text : '取消',
								xtype : 'button',
								scope : this,
								handler : this.cancel
							}, {
								iconCls : 'btn-reset',
								text : '清空',
								xtype : 'button',
								scope : this,
								handler : this.reset
							}]
				});
	},// end of the constructor
	// 初始化组件
	initUIComponents : function() {
		this.formPanel = new Ext.FormPanel({
			layout : 'form',
			bodyStyle : 'padding:10px',
			id : 'UlBbsHuatiForm',
			border : false,
			autoScroll : true,
			// id : 'UlBbsHuatiForm',
			defaults : {
				anchor : '98%,98%',
				margins : {
					top : 4,
					right : 4,
					bottom : 4,
					left : 4
				}
			},
			defaultType : 'textfield',
			items : [{
						name : 'ulBbsHuati.bbsHuatiId',
						xtype : 'hidden',
						value : this.bbsHuatiId == null ? '' : this.bbsHuatiId
					}, {
						fieldLabel : '主题',
						name : 'ulBbsHuati.title',
						allowBlank : false,
						maxLength : 20
					},{
						fieldLabel : '分类',
						id : 'UI.form.type',
						xtype : 'mtdiccombo',
						editable : false,
						lazyInit : false,
						forceSelection : false,
						itemKey : 'BUSI_TYPE'

					},

					// {
					// fieldLabel : '类型',
					// hiddenName : 'ulBbsHuati.businessType',
					// allowBlank : false,
					// xtype : 'combo',
					// editable : false,
					// mode : 'local',
					// triggerAction : 'all',
					// emptyText : '',
					// store : [['1', '企业'], ['2', '个人'], ['3', '滚动公告']]
					// },
					// {
					// fieldLabel : '类型',
					// name : 'ulBbsHuati.businessType',
					// xtype : 'numberfield'
					// },
					{
						fieldLabel : '内容',
						name : 'ulBbsHuati.content',
						xtype : 'textarea',
						maxLength : 300
					}, 
					{
						fieldLabel : '附件',
						name : 'ulBbsHuati.attachmentUrl',
						id : 'ulBbsHuati.attachmentUrl',
						xtype : 'hidden',
						maxLength : 200
					}, {
						xtype : 'container',
						layout : 'column',
						border : false,
						defaults : {
							border : false,
							anchor : '98%'
						},
						items : [{
									columnWidth : .82,
									layout : 'form',
									border : false,
									items : [{
												fieldLabel : '附件',
												xtype : 'panel',
												id : 'ulBbsHuatiPanel',
												frame : false,
												border : true,
												bodyStyle : 'padding:4px 4px 4px 4px',
												height : 80,
												autoScroll : true,
												html : ''
											}]
								}, {
									columnWidth : .18,
									border : false,
									items : [{
										xtype : 'button',
										text : '添加附件',
										border : false,
										iconCls : 'menu-attachment',
										handler : function() {
											var dialog = App
													.createUploadDialog({
														file_cat : 'xitong/ulBbsHuati',
														callback : function(
																data) {
															var fileIds = Ext
																	.getCmp("ulBbsHuatifileIds");
															var filePanel = Ext
																	.getCmp('ulBbsHuatiPanel');

															for (var i = 0; i < data.length; i++) {
																if (fileIds
																		.getValue() != '') {
																	fileIds
																			.setValue(fileIds
																					.getValue()
																					+ ',');
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
																						+ '/images/system/delete.gif" onclick="removeResumeFile(this,'
																						+ data[i].fileId
																						+ ')"/>&nbsp;|&nbsp;</span>');
															}
														}
													});
											dialog.show(this);
										}
									}, {
										xtype : 'button',
										border : false,
										text : '清除附件',
										iconCls : 'reset',
										handler : function() {
											var fileAttaches = Ext
													.getCmp("ulBbsHuatifileIds");
											var filePanel = Ext
													.getCmp('ulBbsHuatiPanel');
											filePanel.body.update('');
											fileAttaches.setValue('');
										}
									}, {
										xtype : 'hidden',
										id : 'ulBbsHuatifileIds',
										name : 'fileIds'
									}]
								}]
					}, {
						name : 'ulBbsHuati.joinerGroup',
						id : 'ulBbsHuati.joinerGroup',
						xtype : 'hidden'
					}
			// {
			// fieldLabel : '接收组',
			// id : 'ulBbsHuati.joinerGroupName',
			// allowBlank : false,
			// maxLength : 200,
			// listeners : {
			// 'focus' : function(pp) {
			// var joinerGroup =
			// Ext.getCmp('ulBbsHuati.joinerGroup').getValue();
			// UsergroupSelector.getView(
			// function(usergroupIds, usergroupName) {
			// var fm = Ext
			// .getCmp('UlBbsHuatiForm');
			// fm
			// .getCmpByName('ulBbsHuati.joinerGroup')
			// .setValue(usergroupIds);
			// fm
			// .getCmpByName('ulBbsHuati.joinerGroupName')
			// .setValue(usergroupName);
			// }, true,joinerGroup).show();
			// },
			// scope : this
			// }
			//
			// }, {
			// name : 'ulBbsHuati.joiner',
			// id : 'ulBbsHuati.joiner',
			// xtype : 'hidden'
			// },
			//
			// {
			// fieldLabel : '接收人',
			// // name : 'ulBbsHuati.joinerName',
			// id : 'ulBbsHuati.joinerName',
			// allowBlank : false,
			// maxLength : 200,
			// listeners : {
			// 'focus' : function(pp) {
			// var userId = Ext.getCmp('ulBbsHuati.joiner').getValue();
			// UserSelector.getView(
			// function(userId, fullname) {
			// var fm = Ext
			// .getCmp('UlBbsHuatiForm');
			// fm
			// .getCmpByName('ulBbsHuati.joiner')
			// .setValue(userId);
			// fm
			// .getCmpByName('ulBbsHuati.joinerName')
			// .setValue(fullname);
			// },false,false,false,userId).show();
			// },
			// scope : this
			// }
			// }
			// , {
			// fieldLabel : '状态',
			// hiddenName : 'ulBbsHuati.status',
			// allowBlank : false,
			// xtype : 'combo',
			// editable : false,
			// mode : 'local',
			// triggerAction : 'all',
			// emptyText : '',
			// // disabled: true,
			// store : [['1', '正常'], ['2', '关闭']]
			// // value : 2
			// }

			]
		});
		// 加载表单对应的数据
		if (this.bbsHuatiId != null && this.bbsHuatiId != 'undefined') {
			this.formPanel.loadData({
				url : __ctxPath + '/xitong/getUlBbsHuati.do?bbsHuatiId='
						+ this.bbsHuatiId,
				root : 'data',
				preName : 'ulBbsHuati',
				success : function(response, options) {
					var thisObj = Ext.util.JSON.decode(response.responseText).data;
					var pkUsergroupId = thisObj.joinerGroup;
					var joiner = thisObj.joiner;
					Ext.getCmp('ulBbsHuati.joinerGroup')
							.setValue(pkUsergroupId);
					Ext.getCmp('ulBbsHuati.joiner').setValue(joiner);

					// 加载用户组名字
					Ext.Ajax.request({
								url : __ctxPath
										+ '/xitong/getGroupNameUlUsergroup.do',
								async : false,
								scope : this,
								params : {
									'pkUsergroupStr' : pkUsergroupId
								},
								method : 'post',
								success : function(response) {
									var result = Ext.util.JSON
											.decode(response.responseText);
									var usergroupName = result.data.usergroupName;
									Ext.getCmp('ulBbsHuati.joinerGroupName')
											.setValue(usergroupName);
								}
							});
					// 加载用户名
					Ext.Ajax.request({
								url : __ctxPath
										+ '/system/getUserNameAppUser.do',
								async : false,
								scope : this,
								params : {
									'joiner' : joiner
								},
								method : 'post',
								success : function(response) {
									var result = Ext.util.JSON
											.decode(response.responseText);
									var username = result.data.username;
									Ext.getCmp('ulBbsHuati.joinerName')
											.setValue(username);
								}
							});

					// 开始加载附件
					var filePanel = Ext.getCmp('ulBbsHuatiPanel');
					var fileIds = Ext.getCmp("ulBbsHuatifileIds");
					var af = thisObj.ulBbsHuatiFile;
					for (var i = 0; i < af.length; i++) {
						if (fileIds.getValue() != '') {
							fileIds.setValue(fileIds.getValue() + ',');
						}
						fileIds.setValue(fileIds.getValue() + af[i].fileId);
						Ext.DomHelper
								.append(
										filePanel.body,
										'<span><a href="#" onclick="FileAttachDetail.show('
												+ af[i].fileId
												+ ')">'
												+ af[i].fileName
												+ '</a><img class="img-delete" src="'
												+ __ctxPath
												+ '/images/system/delete.gif" onclick="removeResumeFile(this,'
												+ af[i].fileId
												+ ')"/>&nbsp;|&nbsp;</span>');
					}
				},
				failure : function(response, options) {
					Ext.ux.Toast.msg('操作信息', '操作出错，请联系管理员！');
				}
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
		Ext.getCmp('UlBbsHuatiFormWin').close();

		// tabs.remove('UlBbsHuatiFormWin');
	},
	/**
	 * 保存记录
	 */
	save : function() {
		$postForm({
					formPanel : this.formPanel,
					scope : this,
					url : __ctxPath + '/xitong/saveUlBbsHuati.do',
					callback : function(fp, action) {
						var gridPanel = Ext.getCmp('UlBbsHuatiGrid');
						if (gridPanel != null) {
							gridPanel.getStore().reload();
						}
						var sgridPanel = Ext.getCmp('UlBbsHuatiGrid');
//						var tabs = Ext.getCmp('centerTabPanel');
//						tabs.remove('UlBbsHuatiFormWin');
						Ext.getCmp('UlBbsHuatiFormWin').close();
					}
				});
	}// end of save

});

// 删除附件
function removeResumeFile(obj, fileId) {
	var fileIds = Ext.getCmp("ulBbsHuatifileIds");
	var value = fileIds.getValue();
	if (value.indexOf(',') < 0) {// 仅有一个附件
		fileIds.setValue('');
	} else {
		value = value.replace(',' + fileId, '').replace(fileId + ',', '');
		fileIds.setValue(value);
	}
	var el = Ext.get(obj.parentNode);
	el.remove();
};

UlBbsHuatiForm.prototype.initToolbar = function() {
	var toolbar = new Ext.Toolbar({
				width : '100%',
				height : 30,
				items : []
			});
	return toolbar;
}
