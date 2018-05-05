/**
 * @author:cf0666@gmail.com
 * @class UlBbsHuatiView
 * @extends Ext.Panel
 * @description [UlBbsHuati]管理
 * @company 优创融联科技
 * @createtime:
 */
UlBbsHuatiView = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		UlBbsHuatiView.superclass.constructor.call(this, {
					id : 'UlBbsHuatiViewWin',
					title : '知识互动',
					region : 'center',
					layout : 'border',
					items : [this.gridPanel,
							this.contentsPanel]
				});
	},// end of constructor
	// 初始化组件
	initUIComponents : function() {
		this.topbar = new Ext.Toolbar({
					items : ['->', {
								iconCls : 'btn-add',
								text : '添加',
								xtype : 'button',
								scope : this,
								handler : this.createRs
							}, {
								iconCls : 'btn-del',
								text : '关闭',
								xtype : 'button',
								scope : this,
								handler : this.removeSelRs
							}]
				});
		this.contentsPanel = new Ext.Panel({
					region : 'center',
					id : 'UIBbsHuatiContentpanel',
					// title : '互动 详情',// __ukKnowTypeListHeading,
					iconCls : 'menu-news',
					autoScroll : true,
					border : false,
					defaults : {
						width : '98%'
					},
					collapsible : false,
					autoScroll : true,
					split : true,
					height : 800,
					width : 400,
					items : []
				});
		function renderTopic(value, p, record) {
			return String
					.format(
							'<b><a href="http://extjs.com/forum/showthread.php?t={2}" target="_blank">{0}</a></b><a href="http://extjs.com/forum/forumdisplay.php?f={3}" target="_blank">{1} Forum</a>',
							value, record.data.forumtitle, record.id,
							record.data.forumid);
		}
		function renderLast(value, p, r) {
			return String.format('{0}<br/>by {1}', value
							.dateFormat('M j, Y, g:i a'), r.data['lastposter']);
		}
		this.gridPanel = new HT.GridPanel({
			region : 'north',
			id : 'ukKnowCollectTreePanel',
			title : '知识互动',// __ukKnowTypeListHeading,
			collapsible : true,
			autoScroll : true,
			split : true,
			height : 200,
			tbar : this.topbar,
			// 使用RowActions
			// rowActions : true,
			id : 'UlBbsHuatiGrid',
			url : __ctxPath + "/xitong/listUlBbsHuati.do",
			fields : [{
						name : 'bbsHuatiId',
						type : 'int'
					}, 'title', 'businessType', 'content', 'attachmentUrl',
					'joinerGroup', 'joiner', 'updateby', 'updatetime',
					'createtime', 'createby', 'status', 'appUser', 'huifushu'],
			columns : [{
						header : 'bbsHuatiId',
						dataIndex : 'bbsHuatiId',
						hidden : true
					}, {
						header : '主题',
						dataIndex : 'title'
						// renderer : function(value, metadata, record) {
					// var reVal = '';
					// reVal += '<a href="#"
					// onclick="App.MyDesktopClickTopTab(\'HuiFuDetail\','
					// + record.data.bbsHuatiId + ')">';
					// reVal += value
					// reVal += "</a>";
					// reVal += '&nbsp;&nbsp;';
					// return reVal;
					// }

				},{
					header : '创建人',
					dataIndex : 'appUser',
					renderer : function(value, metadata, record) {
						if(value != null){
							return value.fullname;
						}
					}
				},{
					header : '创建时间',
					dataIndex : 'createtime'
				}]
				// end of columns
			});

		this.gridPanel.addListener('rowclick', this.rowClick);

	},// end of the initComponents()
	// 重置查询表单
	reset : function() {
		this.searchPanel.getForm().reset();
	},
	// 按条件搜索
	search : function() {
		$search({
					searchPanel : this.searchPanel,
					gridPanel : this.gridPanel
				});
	},
	// GridPanel行点击处理事件

	rowClick : function(grid, rowindex, e) {
		// var grid = Ext.getCmp('UlBbsHuatiGrid');
		var rows = grid.getSelectionModel().getSelections();

		var _id = rows[0].data.bbsHuatiId; // 获得id

		Ext.getCmp('UIBbsHuatiContentpanel').removeAll();
		Ext.getCmp('UIBbsHuatiContentpanel').add(new Ext.Panel({
			id : 'HomeNewsDisplayPanel',
			autoScroll : true,
			style : 'padding-left:1%;padding-top:10px;',
			autoHeight : true,
			border : false,
			autoLoad : {
				url : __ctxPath + '/pages/info/huifudetail.jsp?bbsHuifu=' + _id,
				scripts : true
			}
		}), {
			xtype : 'panel',
			border : false,
			id : 'NewsCommentContainer',
			style : 'padding-left:1%;padding-top:10px;',
			items : [new NewsCommentDisplayGrid(_id)]
		}, new Ext.FormPanel({
			url : __ctxPath + '/xitong/huifusaveUlBbsHuifu.do',
			id : 'bbsHuifuForm',
			iconCls : 'menu-info',
			// title : '我要评论',
			autoScroll : true,
			style : 'padding-left:1%;padding-top:10px',
			autoHeight : true,
			defaultType : 'textfield',
			formId : 'bbsHuifuFormId',
			labelWidth : 55,
			defaults : {
				width : 550,
				anchor : '98%,98%'
			},
			border : false,
			layout : 'form',
			items : [{
				xtype : 'fieldset',
				id : 'UiBbsHuatiSet',
				checkboxToggle : false,
				title : '发布',
				labelWidth : 55,
				defaults : {
					width : 550,
					anchor : '98%,98%'
				},
				// border : false,
				layout : 'form',
				collapsible : true,
				autoHeight : true,
				collapsed : true,
				items : [{
							name : 'ulBbsHuifu.bbsHuatiId',
							xtype : 'hidden',
							id : 'bbsHuifu'
						}, {
							xtype : 'hidden',
							value : curUserInfo.userId
						}, {
							fieldLabel : '用户',
							xtype : 'hidden',
							name : 'ulBbsHuifu.reply',
							readOnly : true,
							value : curUserInfo.fullname
						}, {
							fieldLabel : '发布内容',
							xtype : 'textarea',
							blankText : '评论内容为必填!',
							allowBlank : false,
							name : 'ulBbsHuifu.content',
							id : 'UlBbsHuifucontent',
							maxLength : 300
						}, {
							fieldLabel : '附件',
							name : '_ulBbsHuati.attachmentUrl',
							id : '_ulBbsHuati.attachmentUrl',
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
										var dialog = App.createUploadDialog({
											file_cat : 'xitong/ulBbsHuati',
											callback : function(data) {
												var fileIds = Ext
														.getCmp("ulBbsHuatifileIds");
												var filePanel = Ext
														.getCmp('ulBbsHuatiPanel');

												for (var i = 0; i < data.length; i++) {
													if (fileIds.getValue() != '') {
														fileIds
																.setValue(fileIds
																		.getValue()
																		+ ',');
													}
													fileIds.setValue(fileIds
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
											fieldLabel : '相关知识',
											xtype : 'panel',
											id : '_xiangguanzhishi_ulBbsHuatiPanel',
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
									text : '选择知识',
									border : false,
									iconCls : 'menu-file',
									handler : function() {
										knowledgeSelector.getView().show();
										var filePanel = Ext
												.getCmp('_xiangguanzhishi_ulBbsHuatiPanel');
										var fileIdsin = Ext
												.getCmp("__Konw_ulBbsHuatifileIds");
										Ext.getCmp('knowledgeSelector_btn_ok')
												.on('click', function() {
													filePanel.body.update('');
													var store = Ext
															.getCmp('knowledgeSelectorSelectTree')
															.getStore();// 获得选中数据
													store.each(
															function(record) {
																fileIdsin
																		.setValue(fileIdsin
																				.getValue()
																				+ record
																						.get('knowId')
																				+ ',');
																Ext.DomHelper
																		.append(
																				filePanel.body,
																				'<span><a href="#" >'
																						+ record
																								.get('tiTle')
																						+ '</a >&nbsp;|&nbsp;</span>');
															});
													Ext
															.getCmp('knowledgeSelectorWindow')
															.close();
												});
									}
								}, {
									xtype : 'button',
									border : false,
									text : '清除知识',
									iconCls : 'reset',
									handler : function() {
										var fileIds = Ext
												.getCmp("__Konw_ulBbsHuatifileIds");
										var filePanel = Ext.getCmp('_xiangguanzhishi_ulBbsHuatiPanel');
										filePanel.body.update('');
										fileIds.setValue('');

										filePanel.body.update('');
										// fileAttaches.setValue('');
									}
								}, {
									xtype : 'hidden',
									id : '__Konw_ulBbsHuatifileIds',
									name : 'knowIds'
								}]
							}]
						}, {
							xtype : 'container',
							layout : 'column',
							border : false,
							defaults : {
								border : false,
								anchor : '98%'
							},
							items : [{
								columnWidth : .50,
								layout : 'form',

								border : false,
								items : [{
									text : '发布',
									iconCls : 'btn-sendMessage',
									id : 'huifu-fabu-btn',
									xtype : 'button',
									style : 'float:right;',
									handler : function() {
										Ext
												.getCmp('bbsHuifu')
												.setValue(document
														.getElementById("__bbsHuifuId").value);
										var fp = Ext.getCmp('bbsHuifuForm');
										if (fp.getForm().isValid()) {
											fp.getForm().submit({
												method : 'post',
												waitMsg : '正在提交数据...',
												success : function(fp, action) {
													Ext.ux.Toast.msg('操作信息','成功保存信息！');
													Ext.getCmp('_xiangguanzhishi_ulBbsHuatiPanel').body.update('');
													Ext.getCmp('UlBbsHuifucontent').setValue('');
													Ext.getCmp('ulBbsHuatiPanel').body.update('');
													Ext.getCmp('ulBbsHuatifileIds').setValue('');
													Ext.getCmp('__Konw_ulBbsHuatifileIds').setValue('');
													Ext.getCmp('bbsHuifuDispalyGrid').getStore().reload();
													var NewsCommentGrid = Ext
															.getCmp('NewsCommentGrid');
													if (NewsCommentGrid != null) {
														NewsCommentGrid
																.getStore()
																.reload();
													}
												},
												failure : function(fp, action) {
													Ext.MessageBox.show({
														title : '操作信息',
														msg : '信息保存出错，请联系管理员！',
														buttons : Ext.MessageBox.OK,
														icon : Ext.MessageBox.ERROR
													});
												}
											});
										}
									}
								}]
							}, {
								columnWidth : .50,
								border : false,
								items : [{
									xtype : 'button',
									text : '重置',
									iconCls : 'btn-cancel',
									id : 'huifu-cz-btn',
									handler : function() {
										Ext.getCmp('UlBbsHuifucontent').setValue('');
										Ext.getCmp('_xiangguanzhishi_ulBbsHuatiPanel').body.update('');
													Ext.getCmp('UlBbsHuifucontent').setValue('');
													Ext.getCmp('ulBbsHuatiPanel').body.update('');
													Ext.getCmp('ulBbsHuatifileIds').setValue('');
													Ext.getCmp('__Konw_ulBbsHuatifileIds').setValue('');
									}
								}]
							}]
						}]
			}]
		}));
		Ext.getCmp('UIBbsHuatiContentpanel').doLayout();
		// var tabs = Ext.getCmp('centerTabPanel');
		// var aForm = Ext.getCmp('UlBbsHuatiForm');
		// if (aForm != null) {
		// tabs.remove('UlBbsHuatiForm');
		// }
		// var record = grid.getSelectionModel().getSelected();
		// aForm = new UlBbsHuatiForm({
		// bbsHuatiId : record.data.bbsHuatiId
		// });
		// tabs.add(aForm);
		// tabs.activate(aForm);
	},
	// 创建记录
	createRs : function() {

		new UlBbsHuatiForm().show();
		// var tabs = Ext.getCmp('centerTabPanel');
		// var aForm = Ext.getCmp('UlBbsHuatiForm');
		// if (aForm != null) {
		// tabs.remove('UlBbsHuatiForm');
		// }
		// aForm = new UlBbsHuatiForm();
		// tabs.add(aForm);
		// tabs.activate(aForm);

	},

	// 创建记录
	createRss : function() {
		new NewsForm().show();
	},

	// 按ID删除记录
	removeRs : function(id) {

		$postDelFabu({
					url : __ctxPath + '/xitong/multiDelUlBbsHuati.do',
					ids : id,
					grid : this.gridPanel
				});
	},
	// 修改话题状态
	fabuSelRs : function(id, record) {
		$postFabu({
					url : __ctxPath + '/xitong/huatiUpdateUlBbsHuati.do',
					ids : id,
					grid : this.gridPanel
				});
	},
	// 把选中ID删除
	removeSelRs : function() {

		$delGridRsFubu({
					url : __ctxPath + '/xitong/multiDelUlBbsHuati.do',
					grid : this.gridPanel,
					idName : 'bbsHuatiId'
				});
	},
	// 编辑Rs
	editRs : function(record) {

		// new UlBbsHuatiForm({
		// bbsHuatiId : record.data.bbsHuatiId
		// }).show();
		var tabs = Ext.getCmp('centerTabPanel');
		var aForm = Ext.getCmp('UlBbsHuatiForm');
		if (aForm != null) {
			tabs.remove('UlBbsHuatiForm');
		}
		aForm = new UlBbsHuatiForm({
					bbsHuatiId : record.data.bbsHuatiId
				});
		tabs.add(aForm);
		tabs.activate(aForm);
	},
	// 行的Action fabuSelRs
	onRowAction : function(grid, record, action, row, col) {
		switch (action) {
			// case 'btn-fb':
			// this.fabuSelRs.call(this, record.data.bbsHuatiId);
			// break;
			case 'btn-del' :
				this.removeRs.call(this, record.data.bbsHuatiId);
				break;
			case 'btn-fabu' :
				// this.editRs.call(this, record);
				this.fabuSelRs.call(this, record.data.bbsHuatiId);
				break;
			case 'btn-edit' :
				this.editRs.call(this, record);
				break;
			default :
				break;
		}
	}
});
var NewsCommentDisplayGrid = function(_id) {

	var cm = new Ext.grid.ColumnModel({
		columns : [{
					width : 40,
					dataIndex : 'start',
					renderer : function(value, metadata, record, rowIndex,
							colIndex) {
						return rowIndex + 1 + '楼';
					}
				}, {
					dataIndex : 'commentId',
					hidden : true
				}, {
					width : 400,
					dataIndex : 'content',
					renderer : function(value, metadata, record, rowIndex,
							colIndex) {// style="font:13px 宋体;color:
						// black;line-height:24px;"
						// 开始加载附件
					var filePanel = '';
					var hf = record.data.ulBbsHuifuFiles;
					for (var i = 0; i < hf.length; i++) {
						if (i > 0){
						filePanel += '<b>&nbsp&nbsp&nbsp&nbsp|&nbsp&nbsp&nbsp&nbsp</b>';}
						filePanel += '<font color="Black">'
						filePanel += hf[i].fileName;
						filePanel += '</font>'
						
					}
					
					var knowPanel = '';
					var fk = record.data.ulBbsHuifuKnows;
					for (var i = 0; i < fk.length; i++) {
						if (i > 0){
						knowPanel += '<b>&nbsp&nbsp&nbsp&nbsp|&nbsp&nbsp&nbsp&nbsp</b>';}
						knowPanel += '<font color="Black"> '
						knowPanel += fk[i].tiTle;
						knowPanel += '</font>'
					}
								
								
								
						html = '<table width="100%"><tr><td align="left"><font color="gray" >回复内容:'
								+ value
								+ '</br> 相关知识:' + knowPanel
								+ '</td><td align="right"><font color="gray">评论人:'
								+ record.data.reply
								+ '</font></td></tr><tr><td rowspan="2"><a href="#"><font font color="gray">'
								+ '附件:'
								+ filePanel
								+ '</font></a></td><td align="right" rowspan="2"><font  color="gray" >'
								+ record.data.replytime
								+ '</font></td></tr>'
								+ '' + '</table>'
						return html;
					}
				}],
		defaults : {
			sortable : true,
			menuDisabled : false,
			width : 100
		}
	});

	var store = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
			url : __ctxPath
					+ '/xitong/huifulistUlBbsHuifu.do?Q_ulBbsHuati.bbsHuatiId_L_EQ='
					+ _id
		}),
		baseParams : {
			limit : 4
		},
		reader : new Ext.data.JsonReader({
					root : 'result',
					totalProperty : 'totalCounts',
					id : 'id',

					fields : [{
								name : 'commentId',
								type : 'int'
							}, 'content', 'reply', 'replytime', 'start','ulBbsHuifuFiles','ulBbsHuifuKnows']
				}),
		remoteSort : false
	});
	// store.setDefaultSort('createtime', 'asc');
	store.load({
				params : {
					start : 0,
					limit : 10
				}
			});
	var grid = new HT.GridPanel({
				store : store,
				// hideHeaders : true,
				trackMouseOver : true,
				disableSelection : false,
				loadMask : true,
				id : 'bbsHuifuDispalyGrid',
				autoWidth : true,
				height : 320,
				// title : '查看评论',
				// iconCls : 'menu-info',
				collapsible : false,
				collapsed : false,
				cm : cm,
				viewConfig : {
					forceFit : true,
					enableRowBody : false,
					showPreview : false
				},
				bbar : new HT.PagingBar({
							store : store
						})
			});
	grid.addListener('rowclick', function() {
		Ext.getCmp('UiBbsHuatiSet').expand();// 展开
		Ext.getCmp('_xiangguanzhishi_ulBbsHuatiPanel').body.update('');
		Ext.getCmp('UlBbsHuifucontent').setValue('');
		Ext.getCmp('ulBbsHuatiPanel').body.update('');
		Ext.getCmp('ulBbsHuatifileIds').setValue('');
		Ext.getCmp('__Konw_ulBbsHuatifileIds').setValue('');
		
		var rows = grid.getSelectionModel().getSelections();

		if(rows[0].data.reply != curUserInfo.fullname){
			Ext.getCmp('huifu-fabu-btn').disable();
			Ext.getCmp('huifu-cz-btn').disable();
		}else{
			Ext.getCmp('huifu-fabu-btn').enable();
			Ext.getCmp('huifu-cz-btn').enable();
		}
		
		var content = rows[0].data.content;
		Ext.getCmp('UlBbsHuifucontent').setValue(content);// 内容
		var bbsHuifu = rows[0].data.bbsHuifu;
		Ext.getCmp('bbsHuifu').setValue(bbsHuifu);// 内容
		//查看的附件
		var filePanel = Ext.getCmp('ulBbsHuatiPanel');	
		var fileIds = Ext.getCmp("ulBbsHuatifileIds");
		var af = rows[0].data.ulBbsHuifuFiles;
		for (var i = 0; i < af.length; i++) {
			if (fileIds.getValue() != '') {
				fileIds.setValue(fileIds.getValue() + ',');
			}
			fileIds.setValue(fileIds.getValue() + af[i].fileId);
			Ext.DomHelper.append(
							filePanel.body,
							'<span><a href="#" onclick="FileAttachDetail.show('
									+ af[i].fileId
									+ ')">'
									+ af[i].fileName
									+ '</a><img class="img-delete" src="'
									+ __ctxPath
									+ '/images/system/delete.gif" onclick="removeResumeFile(this,'
									+ af[i].fileId + ')"/>&nbsp;|&nbsp;</span>');
		}
		//查看的相关知识
		var knowPanel = Ext.getCmp('_xiangguanzhishi_ulBbsHuatiPanel');	
		var knowIds = Ext.getCmp("__Konw_ulBbsHuatifileIds");
		var hk = rows[0].data.ulBbsHuifuKnows;
		for (var i = 0; i < hk.length; i++) {
			if (knowIds.getValue() != '') {
				knowIds.setValue(knowIds.getValue() + ',');
			}
			knowIds.setValue(knowIds.getValue() + hk[i].knowId);
			Ext.DomHelper.append(
							knowPanel.body,
//							'<span><a href="#" onclick="FileAttachDetail.show('
//									+ hk[i].knowIds
//									+ ')">'
									hk[i].tiTle
//									+ '</a><img class="img-delete" src="'
//									+ __ctxPath
//									+ '/images/system/delete.gif" onclick="removeResumeFile(this,'
//									+ hk[i].fileId + '/>&nbsp;)"'
									+'&nbsp;|&nbsp;</span>');
		}
//		var neirong = '';
//		var fujian = '<a href="#" >测试文档.doc</a>';

//		// Ext.getCmp('_ulBbsHuatiPanel').setValue(fujian);
//		Ext.DomHelper
//				.append(
//						Ext.getCmp('ulBbsHuatiPanel').body,
//						'<span><a href="#" onclick="FileAttachDetail.show()">'
//								+ fujian
//								+ '</a> <img class="img-delete" src="'
//								+ __ctxPath
//								+ '/images/system/delete.gif" onclick="removeResumeFile(this)"/>&nbsp;|&nbsp;</span>');
	});
	return grid;
}