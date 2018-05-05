/**
 * @author
 * @createtime
 * @class NewsForm
 * @extends Ext.Window
 * @description News表单
 * @company 优创融联科技
 */
NewsForm = Ext.extend(Ext.Window, {
	imagePanlbar : null,
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		NewsForm.superclass.constructor.call(this, {
					id : 'NewsFormWin',
					layout : 'fit',
					items : this.formPanel,
					modal : true,
					height : 550,
					width : 1030,
					maximizable : true,
					iconCls : 'menu-news',
					title : '新闻详细新闻',
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
							}
//					, {
//								iconCls : 'btn-del',
//								text : '删除',
//								scope : this,
//								handler : function() {
//								}
//							}
					]
				});
		this.formPanel = new Ext.FormPanel({
			layout : 'hbox',
			frame : false,
			id : 'NewsForm',
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
				title : '新闻内容',
				layout : 'form',
				flex : 2,
				labelWidth : 60,
				width : '60%',
				defaultType : 'textfield',
				// autoWidth : true,
				autoHeight : true,
				defaults : {
					width : '97%'
				},
				items : [{
							name : 'news.newsId',
							xtype : 'hidden',
							value : this.newsId == null ? '' : this.newsId
						}, {
							fieldLabel : '是否新闻',
							name : 'news.isNotice',
							xtype : 'hidden',
							value : 0
						}, {
							xtype : 'mtdiccombo',
							fieldLabel:'类型',
							hiddenName : 'news.sectionId',
							id : 'news.Type',
							editable : false,
							lazyInit : false,
							forceSelection : false,
							itemKey : 'XW001',
							anchor:'100%',
							mode:'local'
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
							id : 'news.content',
							allowBlank : false,
							anchor : '100%',
							height : 360,
							xtype : 'htmleditor',
							maxLength : 32767
						}]
			}, {
				xtype : 'fieldset',
				title : '其他信息',
				flex : 1,
				layout : 'form',
				labelWidth : 60,
				defaultType : 'textfield',
				width : '34%',
				// autoWidth : true,
				autoHeight : true,
				defaults : {
					width : '97%'
				},
				items : [{
							fieldLabel : '新闻图片',
							name : 'news.subjectIcon',
							maxLength : 128,
							xtype : 'hidden'
						}, {
							fieldLabel : '创建时间',
							name : 'news.createtime',
							allowBlank : false,
							readOnly : true,
							xtype : 'datefield',
							format : 'Y-m-d',
							value : new Date()
						}, {
							fieldLabel : '发布人',
							name : 'news.issuer',
							id : 'news.issuer',
							allowBlank : false,
							readOnly : true,
							maxLength : 16,
							value : curUserInfo.fullname
						}, {
							name : 'news.joiner',
							id : 'news.joiner',
							xtype : 'hidden'
						}, {
							fieldLabel : '接收人',
							id : 'news.joinerName',
							maxLength : 100,
							allowBlank : false,
							listeners : {
								'focus' : function(pp) {
									if(Ext.getCmp('UserSelectorWin')){
										Ext.getCmp('UserSelectorWin').show();
									}else{
										var userId = Ext.getCmp('news.joiner')
											.getValue();
									UserSelector
											.getView(
													function(userId, fullname) {
														var fm = Ext
																.getCmp('NewsForm');
														fm
																.getCmpByName('news.joiner')
																.setValue(userId);
														fm
																.getCmpByName('news.joinerName')
																.setValue(fullname);
													}, false, false, false,
													userId)
											.show();
									}
								},
								scope : this
							}
						}, {
							name : 'news.joinerGroup',
							id : 'news.joinerGroup',
							xtype : 'hidden'
						}, {
							fieldLabel : '接收组',
							id : 'news.joinerGroupName',
							allowBlank : false,
							maxLength : 100,
							listeners : {
								'focus' : function(pp) {
									UsergroupSelector.getView(
											function(usergroupIds,
													usergroupName) {
												var fm = Ext.getCmp('NewsForm');
												fm
														.getCmpByName('news.joinerGroup')
														.setValue(usergroupIds);
												fm
														.getCmpByName('news.joinerGroupName')
														.setValue(usergroupName);
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
						// store : [['0', '未发布'], ['1', '已发布']],
						// value : 1
						// }
//						, {
//							fieldLabel : '顺序',
//							name : 'news.sn',
//							xtype : 'numberfield'
//						}
						, {
							xtype : 'panel',
							title : '图片',
							name : 'NewsImageScanPanel',
							height : 337,
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
					fPanel.getCmpByName('news.sectionId').setValue(news.sectionId);
//					fPanel.getCmpByName('sectionName').setValue(news.section.sectionName);
					fPanel.getCmpByName('news.createtime')
							.setValue(new Date(getDateFromFormat(
									news.createtime, 'yyyy-MM-dd HH:mm:ss')));

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
		Ext.getCmp('news.content').setValue('');
		Ext.getCmp('news.issuer').setValue(curUserInfo.fullname);
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
	getDicListeners : function(comId, hidName) {
		return {
			select : function(cbo,record,index) {
				var fm = Ext.getCmp(comId);
				Ext.getCmp(hidName+'_hid').setValue(cbo.value);
			}
		}
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
						var gridPanel = Ext.getCmp('NewsGrid');
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
		var dialog = App.createUploadDialog({
					file_cat : 'info/news',
					callback : function(data) {
						subjectIcon.setValue(data[0].filePath);
						displayPanel.body
								.update('<img style="border:0;"  src="'
										+ __ctxPath + '/attachFiles/'
										+ data[0].filePath + '" border="0"/>');
					}
				});
		if (subjectIcon.value != '' && subjectIcon.value != null
				&& subjectIcon.value != 'undefined') {
			var msg = '再次上传需要先删除原有图片,';
			Ext.Msg.confirm('新闻确认', msg + '是否删除？', function(btn) {
				if (btn == 'yes') {
					// 删除图片
					Ext.Ajax.request({
						url : __ctxPath + '/system/deleteFileAttach.do',
						method : 'post',
						params : {
							filePath : subjectIcon.value
						},
						success : function() {
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