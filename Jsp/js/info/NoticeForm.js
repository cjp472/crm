/**
 * @author
 * @createtime
 * @class NoticeForm
 * @extends Ext.Window
 * @description News表单
 * @company 优创融联科技
 */
NoticeForm = Ext.extend(Ext.Window, {
	imagePanlbar : null,
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		NoticeForm.superclass.constructor.call(this, {
					id : 'NoticeFormWin',
					layout : 'fit',
					items : this.formPanel,
					modal : true,
					height : 550,
					width : 1030,
					iconCls : 'menu-notice',
					maximizable : true,
					title : '公告详细公告',
					buttonAlign : 'center',
					buttons : [{
								text : '保存',
								iconCls : 'btn-save',
								scope : this,
								handler : this.save
							}, {
								text : '重置',
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
		this.imagePanlbar = new Ext.Toolbar({
					items : [{
								iconCls : 'btn-upload',
								text : '上传',
								scope : this,
								handler : this.uploadImage.createCallback(this)
							}, {
								iconCls : 'btn-del',
								text : '删除',
								scope : this,
								handler : function() {

								}
							}

					]
				});
		this.formPanel = new Ext.FormPanel({
			layout : 'hbox',
			frame : false,
			id : 'NoticeForm',
			// baseCls:'x-plain',
			layoutConfig : {
				padding : '5',
				pack : 'start',
				align : 'middle'
			},
			defaults : {
				margins : '0 5 0 0'
			},
			border : false,
			items : [{
				xtype : 'fieldset',
				title : '内容',
				layout : 'form',
				labelWidth : 60,
				defaultType : 'textfield',
				autoWidth : true,
				autoHeight : true,
				defaults : {
					width : 550
				},
				items : [{
							name : 'news.newsId',
							xtype : 'hidden',
							value : this.newsId == null ? '' : this.newsId
						},
						// {
						// name : 'news.sectionId',
						// xtype : 'textfield'
						// },
						{
							fieldLabel : '是否公告',
							name : 'news.isNotice',
							xtype : 'hidden',
							value : 1
							// 是公告
						}, {
							xtype : 'compositefield',
							fieldLabel : '类别',
							items : [{
								id : 'userType',
								hiddenName : 'news.sectionId',
								displayField : 'itemName',
								valueField : 'itemId',
								xtype : 'combo',
								mode : 'local',
								editable : false,
								allowBlank : false,
								triggerAction : 'all',
								// store : [['1', '临时'], ['0', '正式']],
								store : new Ext.data.SimpleStore({
									url : __ctxPath
											+ '/system/loadItemDictionary.do',
									baseParams : {
										itemName : '公告类别'
									},
									fields : ['itemId', 'itemName'],
									autoLoad : true,
									method : "post",
									listeners : {
										load : function() {
											var combo = Ext.getCmp('userType');
											var store = combo.getStore();
											var rows = [];// 定义数组
											for (var i = 0; i < store
													.getCount(); i++) { // store.getCount()为store的长度
												if (store.getAt(i).data['itemId'] == combo
														.getValue()) {
													combo
															.setValue(store
																	.getAt(i).data['itemName']);
													break;
												}
											}

										}
									}
								})
							}

							]
						}, {
							fieldLabel : '标题',
							name : 'news.subject',
							allowBlank : false,
							maxLength : 64
						}, {
							fieldLabel : '作者',
							name : 'news.author',
							allowBlank : false,
							maxLength : 16
						}, {
							fieldLabel : '内容',
							name : 'news.content',
							id : 'notice.content',
							allowBlank : false,
							anchor : '100%',
							height : 360,
							xtype : 'htmleditor',
							maxLength : 32767
						}]
			}, {
				xtype : 'fieldset',
				title : '其他',
				layout : 'form',
				labelWidth : 60,
				defaultType : 'textfield',
				autoWidth : true,
				autoHeight : true,
				defaults : {
					width : 280
				},
				items : [{
							fieldLabel : '公告图片',
							name : 'news.subjectIcon',
							maxLength : 128,
							xtype : 'hidden'
						}, {
							fieldLabel : '创建时间',
							name : 'news.createtime',
							allowBlank : false,
							xtype : 'datefield',
							format : 'Y-m-d',
							value : new Date()
						}, {
							fieldLabel : '失效时间',
							name : 'news.expTime',
							allowBlank : false,
							xtype : 'datefield',
							format : 'Y-m-d'
						}, {
							fieldLabel : '发布人',
							name : 'news.issuer',
							id : 'notice.issuer',
							allowBlank : false,
							readOnly : true,
							maxLength : 16,
							value : curUserInfo.fullname
						}, {
							name : 'news.joiner',
							id : 'notice.joiner',
							xtype : 'hidden'
						}, {
							fieldLabel : '接收人',
							id : 'notice.joinerName',
							allowBlank : false,
							maxLength : 100,
							listeners : {
								'focus' : function(pp) {
									UserSelector.getView(
											function(userId, fullname) {
												var fm = Ext.getCmp('NoticeForm');
												fm.getCmpByName('news.joiner').setValue(userId);
												fm.getCmpByName('notice.joinerName').setValue(fullname);
											}).show();
								},
								scope : this
							}
						}, {
							name : 'news.joinerGroup',
							id : 'notice.joinerGroup',
							xtype : 'hidden'
						}, {
							fieldLabel : '接收组',
							id : 'notice.joinerGroupName',
							allowBlank : false,
							maxLength : 100,
							listeners : {
								'focus' : function(pp) {
									UsergroupSelector.getView(
											function(usergroupIds,
													usergroupName) {
												var fm = Ext.getCmp('NoticeForm');
												fm.getCmpByName('news.joinerGroup').setValue(usergroupIds);
												fm.getCmpByName('notice.joinerGroupName').setValue(usergroupName);
											}, true).show();
								},
								scope : this
							}

						}
						// , {
						// fieldLabel : '状态',
						// hiddenName : 'news.status',
						// allowBlank : false,
						// xtype : 'combo',
						// editable : false,
						// mode : 'local',
						// triggerAction : 'all',
						// store : [['0', '禁用'], ['1', '激活']],
						// value : 1
						// }, {
						// fieldLabel : '顺序',
						// name : 'news.sn',
						// xtype : 'numberfield'
						// }
						, {
							xtype : 'panel',
							title : '图片',
							name : 'NewsImageScanPanel',
							height : 311,
							width : 345,
							tbar : this.imagePanlbar,
							html : '<img style="border:0;"  src="'
									+ __ctxPath
									+ '/images/default_newsIcon.jpg" border="0"/>'
						}]
			}]
		});
		// 加载表单对应的数据
		if (this.newsId != null && this.newsId != 'undefined') {
			var fPanel = this.formPanel;
			fPanel.loadData({
				url : __ctxPath + '/info/getNews.do?newsId=' + this.newsId,
				root : 'data',
				preName : 'news',
				success : function(response, options) {
					var news = Ext.util.JSON.decode(response.responseText).data;
					fPanel.getCmpByName('sectionName')
							.setValue(news.section.sectionName);
					fPanel.getCmpByName('news.createtime')
							.setValue(new Date(getDateFromFormat(
													news.createtime,
													'yyyy-MM-dd HH:mm:ss')));
					fPanel.getCmpByName('news.expTime')
							.setValue(new Date(getDateFromFormat(news.expTime,
													'yyyy-MM-dd HH:mm:ss')));
					var displayPanel = fPanel
							.getCmpByName('NewsImageScanPanel');
					if (news.subjectIcon != '') {
						displayPanel.body.update('<img style="border:0;" src="'
								+ __ctxPath + '/attachFiles/'
								+ news.subjectIcon + '" border="0"/>');
					}
				},
				failure : function(response, options) {
					Ext.ux.Toast.msg('编辑', '载入失败');
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
		Ext.getCmp('notice.content').setValue('');
		Ext.getCmp('notice.issuer').setValue(curUserInfo.fullname);
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
					url : __ctxPath + '/info/saveNews.do',
					callback : function(fp, action) {
						var gridPanel = Ext.getCmp('NoticeGrid');
						if (gridPanel != null) {
							gridPanel.getStore().reload();

						}
						this.close();
					}
				});
	},// end of save
	uploadImage : function(self) {
		var displayPanel = self.getCmpByName('NewsImageScanPanel');
		var subjectIcon = self.getCmpByName('news.subjectIcon');
		var newsId = self.getCmpByName('news.newsId').getValue();
		alert(subjectIcon)
		var dialog = App.createUploadDialog({
					file_cat : 'info/notice',
					callback : function(data) {
						subjectIcon.setValue(data[0].filePath);
						alert(subjectIcon.setValue(data[0].filePath));
						displayPanel.body
								.update('<img style="border:0;"  src="'
										+ __ctxPath + '/attachFiles/'
										+ data[0].filePath + '" border="0"/>');
					}
				});
		if (subjectIcon.value != '' && subjectIcon.value != null
				&& subjectIcon.value != 'undefined') {
			var msg = '再次上传需要先删除原有图片,';
			Ext.Msg.confirm('公告确认', msg + '是否删除？', function(btn) {
				if (btn == 'yes') {
					Ext.Ajax.request({
						url : __ctxPath + '/system/deleteFileAttach.do',
						method : 'post',
						params : {
							filePath : subjectIcon.value
						},
						success : function() {
							// var newsId = Ext.getCmp('newsId').value;
							if (newsId != '' && newsId != null
									&& newsId != 'undefined') {
								Ext.Ajax.request({
									url : __ctxPath + '/info/iconNews.do',
									method : 'post',
									params : {
										newsId : newsId
									},
									success : function() {
										subjectIcon.setValue('');
										// 改为默认图标
										displayPanel.body
												.update('<img style="border:0;"src="'
														+ __ctxPath
														+ '/images/default_newsIcon.jpg" border="0"/>');
										// Ext.getCmp('NewsGrid').getStore().reload();
										dialog.show('queryBtn');
									}
								});
							} else {
								subjectIcon.setValue('');
								// 改为默认图标
								displayPanel.body
										.update('<img style="border:0;" src="'
												+ __ctxPath
												+ '/images/default_newsIcon.jpg" border="0"/>');
								dialog.show('queryBtn');
							}
						}
					});
				}
			});
		} else {
			dialog.show('queryBtn');
		}
	},

	section : function(self) {
		new SectionSelector({
					callback : function(sectionId, sectionName) {
						this.close();
						self.getCmpByName('news.sectionId').setValue(sectionId);
						self.getCmpByName('sectionName').setValue(sectionName);
					}
				}).show();
	}

});