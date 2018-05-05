///**
// * @author cf0666@gmail.com
// * @createtime 
// * @class UkKnowFankuiForm
// * @extends Ext.Window
// * @description UkKnowFankui表单
// * @company 优创融联科技
// */UkKnowFankuiForm
var  UkKnowFankuiForm = function(_dianpingId, _id) {
//	alert('dpId:' + _dianpingId + ' | knowId:' + _id);

	return new Ext.Panel({
		title : '知识反馈详情',
//		iconCls : 'menu-news',
		id : 'UkKnowFankuiFormWin',
		autoScroll : true,
		autoWidth : true,
		border : false,

		defaults:{
			width:'98%'
		},
		items : [new Ext.Panel({
					id : 'HomeFanKuiDisplayPanel',
					autoScroll : true,
					style : 'padding-left:1%;padding-top:10px;',
					autoHeight : true,
					border : false,
					autoLoad : {
						url : __ctxPath + '/pages/info/knowFankuidetail.jsp?knowId=' + _id,
						scripts:true
					}
				}),{
					xtype:'panel',
					border:false,
					id:'DianpingCommentContainer',
					style : 'padding-left:1%;padding-top:10px;',
					items:[new FanKuiCommentDisplayGrid(_id)]
				}
				, new Ext.FormPanel({
					url : __ctxPath + '/know/saveInfoUkKnowFankui.do',
					id : 'UkKnowFanKuiAddForm',
					iconCls : 'menu-info',
					title : '我要反馈',
					autoScroll : true,
					style : 'padding-left:1%;padding-top:10px',
					autoHeight : true,
					defaultType : 'textfield',
					formId : 'UkKnowFanKuiAddFormId',
					labelWidth : 55,
					defaults : {
						width : 550,
						anchor:'98%,98%'
					},
					layout : 'form',
					items : [{
								name : 'ukKnowFankui.ukSysKnow.knowId',
								xtype : 'hidden',
								id : 'ukKnowFankuiKnowId'
							}, {
								name : 'ukKnowFankui.userid',
								xtype : 'hidden',
								value : curUserInfo.userId
							}, {
								fieldLabel : '用户',
								name : 'ukKnowFankui.fullname',
								readOnly : true,
								value : curUserInfo.fullname
							}, {
								fieldLabel : '内容',
								xtype : 'textarea',
								blankText : '评论内容为必填!',
								allowBlank : false,
								name : 'ukKnowFankui.fankuiContent',
								id : 'ukKnowFankuifankuiContent'
							}],
					buttonAlign : 'center',
					buttons : [{
						text : '提交',
						iconCls : 'btn-save',
						handler : function() {
							Ext.getCmp('ukKnowFankuiKnowId').setValue(_id);
							var fp = Ext.getCmp('UkKnowFanKuiAddForm');
							if (fp.getForm().isValid()) {
								fp.getForm().submit({
									method : 'post',
									waitMsg : '正在提交数据...',
									success : function(fp, action) {
										Ext.ux.Toast.msg('操作信息', '成功保存信息！');
										Ext.getCmp('ukKnowFankuifankuiContent').reset();
										Ext.getCmp('FanKuiCommentDispalyGrid').getStore().reload();
//										var UkKnowFankuiForm = Ext.getCmp('UkKnowFankuiForm');
//										if (UkKnowFankuiForm != null) {
//											UkKnowFankuiForm.doLayout();
//										}
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
					}, {
						text : '重置',
						iconCls : 'reset',
						handler : function() {
							Ext.getCmp('ukKnowFankuifankuiContent').setValue('');
						}
					}]
				})
		]
	});
};
var FanKuiCommentDisplayGrid = function(_id) {

	var cm = new Ext.grid.ColumnModel({
		columns : [{
					width : 40,
					dataIndex : 'start',
					renderer : function(value, metadata, record, rowIndex,
							colIndex) {
						return parseInt(value)+rowIndex + 1 + '楼';
					}
				}, {
					dataIndex : 'commentId',
					hidden : true
				}, {
					width : 400,
					dataIndex : 'content',
					renderer : function(value, metadata, record, rowIndex,colIndex) {
						if ( value != null && value != '' && value != 'undefined') {
							html = '<table width="100%"><tr><td><font color="gray">评论人:'
								+ record.data.fullname
								+ '</font></td><td align="right"><font color="gray">'
								+ record.data.createtime
								+ '</font></td></tr><tr><td rowspan="2"><font style="font:13px 宋体;color: black;line-height:24px;">'
								+ value + '</font></td></tr></table>'
							return html;
						}else {
							return '';
						}
					}
				}
		],
		defaults : {
			sortable : true,
			menuDisabled : false,
			width : 100
		}
	});

	var store = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
//					url : __ctxPath + '/info/listNewsComment.do?Q_news.newsId_L_EQ='+10100
			url : __ctxPath + '/know/dianpinglistUkKnowFankui.do?Q_ukSysKnow.knowId_L_EQ='+_id
				}),
		reader : new Ext.data.JsonReader({
					root : 'result',
					totalProperty : 'totalCounts',
					id : 'id',
					fields : [{
								name : 'commentId',
								type : 'int'
							}
							, 'content', 'createtime',
							'fullname','start']
				}),
		remoteSort : false
	});
	store.setDefaultSort('createtime', 'asc');
	store.load({
				params : {
					start : 0,
					limit : 10
				}
			});
	var grid = new Ext.grid.GridPanel({
				store : store,
				hideHeaders:true,
				trackMouseOver : true,
				disableSelection : false,
				loadMask : true,
				autoHeight : true,
				id : 'FanKuiCommentDispalyGrid',
				autoWidth : true,
				title : '查看反馈',
				iconCls : 'menu-info',
				collapsible : true,
				collapsed : true,
				cm : cm,
				viewConfig : {
					forceFit : true,
					enableRowBody : false,
					showPreview : false
				},
				bbar : new HT.PagingBar({store : store,pageSize:10})
			});
	return grid;
}

//UkKnowFankuiForm = Ext.extend(Ext.Panel, {
//	//构造函数
//	constructor : function(_cfg) {
//		Ext.applyIf(this, _cfg);
//		//必须先初始化组件
//		this.initUIComponents();
//		UkKnowFankuiForm.superclass.constructor.call(this, {
//					id : 'UkKnowFankuiFormWin',
//					layout : 'fit',
//					items : this.formPanel,
//					modal : true,
//					height : 400,
//					width : 500,
//					maximizable : true,
//					title : __ukKnowFankuiDetailHeading,
//					buttonAlign : 'center',
//					tbar : this.initToolbar()
//				});
//	},//end of the constructor
//	//初始化组件
//	initUIComponents : function() {
//		this.formPanel = new Ext.FormPanel({
//			layout : 'form',
//			bodyStyle : 'padding:10px',
//			border : false,
//			autoScroll : true,
//			//id : 'UkKnowFankuiForm',
//			defaults : {
//				anchor : '96%,96%'
//					,readOnly : true
//			},
//			defaultType : 'textfield',
//			items : [{
//						name : 'ukKnowFankui.fankuiId',
//						xtype : 'hidden',
//						value : this.fankuiId == null ? '' : this.fankuiId
//					}, {
//						fieldLabel : __ukKnowFankuiKnowId,
//						hiddenName : 'ukKnowFankui.knowId',
//						xtype : 'combo',
//						editabel : false,
//						lazyInit : false,
//						allowBlank : false,
//						triggerAction : 'all',
//						store : new Ext.data.SimpleStore({
//							autoLoad : true,
//							url : __ctxPath + '/know/comboUkSysKnow.do',
//							fields : ['knowId', 'knowIdName'],
//							listeners : {
//								load : function() {
//									var combo = Ext.getCmp('knowId');
//									var store = combo.getStore();
//									var rows = [];//定义数组
//									for (var i = 0; i < store.getCount(); i++) { //store.getCount()为store的长度
//										if (store.getAt(i).data['knowId'] == combo.getValue()) {
//											combo.setValue(store.getAt(i).data['knowIdName']);
//											break;
//										}
//									}
//								}
//							}
//						}),
//						displayField : 'knowIdName',
//						valueField : 'knowId',
//						id : 'knowId'
//					}, {
//						fieldLabel : __ukKnowFankuiFankuiTitle,
//						name : 'ukKnowFankui.fankuiTitle',
//						allowBlank : false,
//						maxLength : 30
//					}, {
//						fieldLabel : __ukKnowFankuiFankuiTime,
//						name : 'ukKnowFankui.fankuiTime',
//						xtype : 'datefield',
//						format : 'Y-m-d H:i:s'
////						allowBlank : false
//					}, {
//						fieldLabel : __ukKnowFankuiFankuiContent,
//						name : 'ukKnowFankui.fankuiContent',
//						xtype : 'textarea',
//						allowBlank : false,
//						maxLength : 300
//					}, {
//						fieldLabel : __ukKnowFankuiUserid,
//						name : 'ukKnowFankui.userName',
//						readOnly : true,
//						xtype : this.fankuiId==null?'hidden':'textfield'
//					}, {
//						fieldLabel : __ukKnowFankuiKnowStatus,
//						hiddenName : 'ukKnowFankui.knowStatus',
//						id : 'ukKnowFankui.knowStatus',
//						xtype : 'mtdiccombo',
//						editable : true,
//						lazyInit : false,
//						forceSelection : false,
//						allowBlank : false,
//						itemKey : 'KNOW_STATUS'
//					}, {
//						fieldLabel : '附件IDs',
//						name : 'ukKnowFankui.fileIds',
//						xtype : 'hidden',
//						id : 'ukKnowFankui.fileIds'
//					}, {
//						fieldLabel : '附件名称列表',
//						name : 'fankui.filenames',
//						xtype : 'hidden',
//						id : 'fankui.filenames'
//					}, {
//						xtype : 'container',
//						layout : 'column',
//						fieldLabel : __ukKnowFankuiFileid,
//						items : [ {
//							columnWidth : .85,
//							border : false,
//							layout : 'form',
//							items : [{
//								xtype : 'panel',
//								height : 50,
//								name : 'fankui.display',
//								id : 'fankui.display',
//								items : '',
//								autoScroll : true
//							}]
//						}, {
//							columnWidth : .15,
//							border : false,
//							layout : 'form',
//							defaultType : 'button',
//							items : [
////							         {
////								text : __ukKnowFankuiUploadFiles,
////								iconCls : 'menu-attachment',
////								handler : function() {
////									var dialog = App.createUploadDialog({
////										file_cat : 'communication/innerMail',
////										callback : uploadMailAttach
////									});
////									dialog.show();
////								}
////							}, {
////								text : __ukKnowFankuiClearFiles,
////								iconCls : 'reset',
////								handler : function(){
////									Ext.getCmp('ukKnowFankui.fileIds').setValue('');
////									Ext.getCmp('fankui.filenames').setValue('');
////									Ext.getCmp('fankui.display').update();
////								}
////							}
//							]
//						}]
//					}
//			]
//		});
//		//加载表单对应的数据	
//		if (this.fankuiId != null && this.fankuiId != 'undefined') {
//			this.formPanel.loadData({
//						url : __ctxPath + '/know/getUkKnowFankui.do?fankuiId='
//								+ this.fankuiId,
//						root : 'data',
//						preName : 'ukKnowFankui',
//						success : function(response, options){
//							var thisObj = Ext.util.JSON.decode(response.responseText).data;
//							Ext.getCmp('ukKnowFankui.knowStatus').setValue(thisObj.knowStatus);
//							// 开始加载附件
//							var filePanel = Ext.getCmp('fankui.display');
//							var fileIds = Ext.getCmp("ukKnowFankui.fileIds");
//							var af = thisObj.ukKnowFankuiFile;
//							for (var i = 0; i < af.length; i++) {
//								if (fileIds.getValue() != '') {
//									fileIds.setValue(fileIds.getValue() + ',');
//								}
//								fileIds.setValue(fileIds.getValue() + af[i].fileId);
//								Ext.DomHelper.append(
//												filePanel.body,
////												'<span><a href="#" onclick="FileAttachDetail.show('
////												+ af[i].fileId + ')">'
////												+ af[i].fileName + '</a> <img class="img-delete" src="' + __ctxPath
////												+ '/images/system/delete.gif" onclick="deleteAttach(this,'
////												+ af[i].fileId + ')"/>&nbsp;|&nbsp;</span>');
//												'<span>' + af[i].fileName + '&nbsp;|&nbsp</span>');
//							}
//						},
//						failure : function(response, options){
//							Ext.ux.Toast.msg(__toastMessage, __operationFailed);
//						}
//					});
//		}
//
//	},//end of the initcomponents
//
//	/**
//	 * 重置
//	 * @param {} formPanel
//	 */
//	reset : function() {
//		this.formPanel.getForm().reset();
//	},
//	/**
//	 * 取消
//	 * @param {} window
//	 */
//	cancel : function() {
//		var tabs = Ext.getCmp('centerTabPanel');
//		tabs.remove('UkKnowFankuiFormWin');
//		this.destroy();
//	},
//	/**
//	 * 保存记录
//	 */
//	save : function() {
//		$postForm({
//					formPanel : this.formPanel,
//					scope : this,
//					url : __ctxPath + '/know/saveUkKnowFankui.do',
//					callback : function(fp, action) {
//						var gridPanel = Ext.getCmp('UkKnowFankuiGrid');
//						if (gridPanel != null) {
//							gridPanel.getStore().reload();
//						}
//						var tabs = Ext.getCmp('centerTabPanel');
//						tabs.remove('UkKnowFankuiFormWin');
//						this.destroy();
//					}
//				});
//	}//end of save
//
//});
//
//UkKnowFankuiForm.prototype.initToolbar = function() {
//	var toolbar = new Ext.Toolbar({
//				width : '100%',
//				height : 30,
//				items : [ '->', {
//							iconCls : 'btn-cancel',
//							text : __cancel,
//							xtype : 'button',
//							scope : this,
//							handler : this.cancel
////						},'->', {
////							iconCls : 'btn-reset',
////							text : __reset,
////							xtype : 'button',
////							scope : this,
////							handler : this.reset
//						}
////						,'->'
////						, {
////							iconCls : 'btn-save',
////							text : __save,
////							xtype : 'button',
////							scope : this,
////							handler : this.save
////						}
//	]
//			});
//	return toolbar;
//}
//
///**
// * 附件上传,可多附件
// * 
// * @param {}
// *            data
// */
//function uploadMailAttach(data) {
//	var htmls = '';
//	var fileIds = Ext.getCmp('ukKnowFankui.fileIds');
//	var ids = fileIds.getValue();
//	if(ids != null && ids != '')
//		ids += ',';
//	var filenames = Ext.getCmp('fankui.filenames');
//	var names = filenames.getValue();
//	if(names != null && ids != '')
//		names +=',';
//	var display = Ext.getCmp('fankui.display');
//	var placeholder = Ext.getCmp('placeholder');
//	if (placeholder != null) {// 隐藏点位符
//		placeholder.hide();
//	}
//	for (var i = 0; i < data.length; i++) {
//		ids += data[i].fileId;
//		names += data[i].fileName;
//		if(i < data.length - 1){
//			ids += ',';
//			names += ',';
//		}
////		htmls += '<span><a href="#" onclick="FileAttachDetail.show('
////			+ data[i].fileId + ')">'
////			+ data[i].fileName + '</a> <img class="img-delete" src="' + __ctxPath
////			+ '/images/system/delete.gif" onclick="deleteAttach(this,'
////			+ data[i].fileId + ')"/>&nbsp;|&nbsp;</span>';
//	}
//	fileIds.setValue(ids);
//	filenames.setValue(names);
////	Ext.DomHelper.append(display.body,htmls);
//	Ext.DomHelper.append(display.body,names);
//}
//
///*
// * 附件删除
// */
//function deleteAttach(obj,_fileId) {
//	// 删除隐藏域中的附件信息
//	var fids = Ext.getCmp('ukKnowFankui.fileIds').getValue();
//	var fnames = Ext.getCmp('fankui.filenames').getValue();
//	var fileIds = '';
//	var filenames = '';
//	if (fids.indexOf(',') < 0) {// 仅有一个附件
//		Ext.getCmp('ukKnowFankui.fileIds').setValue('');
//	} else {
//		fids = fids.replace(',' + _fileId, '').replace(_fileId + ',', '');
//		Ext.getCmp('ukKnowFankui.fileIds').setValue(fids);
//	}
//	Ext.get(obj.parentNode).remove();
//}
