/**
 * @author cf0666@gmail.com
 * @createtime
 * @class UkKnowDianpingForm
 * @extends Ext.Window
 * @description UkKnowDianping表单
 * @company 优创融联科技
 */
/**
 * 新闻详情
 */
var UkKnowDianpingForm = function(_dianpingId,_id,_dianpingStatus) {
//	alert('dpId:' + _dianpingId + ' | knowId:' + _id + '__dianpingStatus:' + _dianpingStatus);
	return new Ext.Panel({
		title : '知识点评详情',
		iconCls : 'menu-news',
		id : 'UkKnowDianpingForm',
		autoScroll : true,
		autoWidth : true,
		border : false,

		defaults:{
			width:'98%'
		},
		items : [new Ext.Panel({
					id : 'HomeDianPingDisplayPanel',
					autoScroll : true,
					style : 'padding-left:1%;padding-top:10px;',
					autoHeight : true,
					border : false,
					autoLoad : {
						url : __ctxPath + '/pages/info/UkKnowDianpingForm.jsp?knowId='
								+ _id,
						scripts:true
					}
				}),{
					xtype:'panel',
					border:false,
					id:'DianpingCommentContainer',
					style : 'padding-left:1%;padding-top:10px;',
					items:[new DianpingCommentDisplayGrid(_id)]
				}
		, new Ext.FormPanel({
					url : __ctxPath + '/know/saveUkKnowDianping.do',
					id : 'UkKnowDianpingAddForm',
					iconCls : 'menu-info',
					title : '我要点评',
					autoScroll : true,
					style : 'padding-left:1%;padding-top:10px',
					autoHeight : true,
					defaultType : 'textfield',
					formId : 'UkKnowDianpingAddFormId',
					labelWidth : 55,
					defaults : {
						width : 550,
						anchor:'98%,98%'
					},
					layout : 'form',
					items : [{
								name : 'ukKnowDianping.ukSysKnow.knowId',
								xtype : 'hidden',
								id : 'ukKnowDianpingKnowId'
							}, {
								name : 'ukKnowDianping.userid',
								xtype : 'hidden',
								value : curUserInfo.userId
							}, {
								fieldLabel : '用户',
								name : 'ukKnowDianpingfullname',
								readOnly : true,
								value : curUserInfo.fullname
							}, {
								fieldLabel : '内容',
								xtype : 'textarea',
								blankText : '评论内容为必填!',
								allowBlank : false,
								name : 'ukKnowDianping.dianpingComment',
								id : 'ukKnowDianpingdianpingComment'
							}],
					buttonAlign : 'center',
					buttons : [{
						text : '提交',
						iconCls : 'btn-save',
						handler : function() {
							Ext.getCmp('ukKnowDianpingKnowId').setValue(document
									.getElementById("__curKnowId").value);
							var fp = Ext.getCmp('UkKnowDianpingAddForm');
							if (fp.getForm().isValid()) {
								fp.getForm().submit({
									method : 'post',
									waitMsg : '正在提交数据...',
									success : function(fp, action) {
										Ext.ux.Toast.msg('操作信息', '成功保存信息！');
										Ext.getCmp('ukKnowDianpingdianpingComment').setValue('');
										Ext.getCmp('DianPingCommentDispalyGrid').getStore().reload();
//										var UkKnowDianpingForm = Ext.getCmp('UkKnowDianpingForm');
//										if (UkKnowDianpingForm != null) {
//											UkKnowDianpingForm.doLayout();
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
							Ext.getCmp('ukKnowDianpingdianpingComment').setValue('');
						}
					}]
				})
		]
	});
}
var DianpingCommentDisplayGrid = function(_id) {

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
					renderer : function(value, metadata, record, rowIndex,
							colIndex) {
						html = '<table width="100%"><tr><td><font color="gray">评论人:'
								+ record.data.fullname
								+ '</font></td><td align="right"><font color="gray">'
								+ record.data.createtime
								+ '</font></td></tr><tr><td rowspan="2"><font style="font:13px 宋体;color: black;line-height:24px;">'
								+ value + '</font></td></tr></table>'
						return html;
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
					url : __ctxPath + '/know/dianpinglistUkKnowDianping.do?Q_ukSysKnow.knowId_L_EQ='+_id
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
				id : 'DianPingCommentDispalyGrid',
				autoWidth : true,
				title : '查看点评',
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
//UkKnowDianpingForm = Ext
//		.extend(
//				Ext.Panel,
//				{
//					// 构造函数
//					constructor : function(_cfg) {
//						Ext.applyIf(this, _cfg);
//						// 必须先初始化组件
//						this.initUIComponents();
//						UkKnowDianpingForm.superclass.constructor.call(this, {
//							id : 'UkKnowDianpingFormWin',
//							layout : 'fit',
//							items : this.formPanel,
//							modal : true,
//							height : 400,
//							width : 500,
//							maximizable : true,
//							title : __ukKnowDianpingDetailHeading,
//							buttonAlign : 'center',
//							tbar : [ '->',{
//								text : __save,
//								iconCls : 'btn-save',
//								scope : this,
//								hidden : true,
//								handler : this.save
//							}, {
//								text : __reset,
//								iconCls : 'btn-reset',
//								scope : this,
//								hidden : true,
//								handler : this.reset
//							},  {
//								text : __cancel,
//								iconCls : 'btn-cancel',
//								scope : this,
//								handler : this.cancel
//							} , '->']
//						});
//					},// end of the constructor
//					// 初始化组件
//					initUIComponents : function() {
//						this.formPanel = new Ext.FormPanel(
//								{
//									layout : 'form',
//									bodyStyle : 'padding:10px',
//									border : false,
//									autoScroll : true,
//									// id : 'UkKnowDianpingForm',
//									defaults : {
//										anchor : '96%,96%'
//										,readOnly : true
//									},
//									defaultType : 'textfield',
//									items : [
//											{
////												fieldLabel : __ukKnowDianpingDianpingId,
//												name : 'ukKnowDianping.dianpingId',
//												xtype : 'hidden',
//												value : this.dianpingId == null ? ''
//														: this.dianpingId
//											}
//
//											,
//											{
//												fieldLabel : __ukKnowDianpingKnowId,
//												hiddenName : 'ukKnowDianping.ukSysKnow.knowId',
//												xtype : 'combo',
//												editabel : false,
//												lazyInit : false,
//												triggerAction : 'all',
//												store : new Ext.data.SimpleStore(
//														{
//															autoLoad : true,
//															url : __ctxPath
//																	+ '/know/comboUkSysKnow.do',
//															fields : [
//																	'knowId',
//																	'knowIdName' ],
//															listeners : {
//																load : function() {
//																	var combo = Ext
//																			.getCmp('knowId');
//																	var store = combo
//																			.getStore();
//																	var rows = [];// 定义数组
//																	for ( var i = 0; i < store
//																			.getCount(); i++) { // store.getCount()为store的长度
//																		if (store
//																				.getAt(i).data['knowId'] == combo
//																				.getValue()) {
//																			combo
//																					.setValue(store
//																							.getAt(i).data['knowIdName']);
//																			break;
//																		}
//																	}
//																}
//															}
//														}),
//												displayField : 'knowIdName',
//												valueField : 'knowId',
//												id : 'knowId',
//												listeners : {
//													select : function(cbo,record, index){
//														Ext.getCmp('use_knowId').setValue(cbo.value);
//													}
//												}
//											}
//
//											,
//											{
//												fieldLabel : __ukKnowDianpingDianpingValue,
//												name : 'ukKnowDianping.dianpingValue',
//												xtype : 'numberfield'
//											}
//
//											,
//											{
//												fieldLabel : __ukKnowDianpingDianpingTime,
//												name : 'ukKnowDianping.dianpingTime',
//												xtype : 'datefield',
//												format : 'Y-m-d H:i:s',
//												value : new Date()
//											}
//
//											,
//											{
//												fieldLabel : __ukKnowDianpingDianpingComment,
//												name : 'ukKnowDianping.dianpingComment',
//												xtype : 'textarea',
//												maxLength : 200
//											}
//
//											,
//											{
//												fieldLabel : __ukKnowDianpingUserid,
//												name : 'ukKnowDianping.userid',
//												xtype : 'numberfield',
//												value : curUserInfo.userId
//											}
//
//											,
//											{
//												fieldLabel : __ukKnowDianpingKnowStatus,
//												Name : 'ukKnowDianping.knowStatus',
//												hiddenName : 'ukKnowDianping.knowStatus',
//												editable : true,
//												lazyInit : false,
//												forceSelection : false,
//												
//												id : 'tmpKnowStatus',
//												displayField : 'itemName',
//												valueField : 'itemId',
//												xtype : 'combo',
//												mode : 'local',
////												allowBlank : false,
//												editable : false,
//												triggerAction : 'all',
//												store : new Ext.data.SimpleStore({
//													url : __ctxPath
//															+ '/system/loadItemDictionary.do',
//													baseParams : {
//														itemName : '知识库通用状态'
//													},
//													fields : ['itemId', 'itemName'],
//													autoLoad : true,
//													method : "post",
//													listeners : {
//														load : function() {
//															var combo = Ext.getCmp('tmpKnowStatus');
//															var store = combo.getStore();
//															var rows = [];// 定义数组
//															for (var i = 0; i < store.getCount(); i++) { // store.getCount()为store的长度
//																if (store.getAt(i).data['itemId'] == combo.getValue()) {
//																	combo.setValue(store.getAt(i).data['itemName']);
//																	Ext.getCmp('use_knowStatus').setValue(store.getAt(i).data['itemId']);
//																	break;
//																}
//															}
//								
//														}
//													}
//												}),
//												listeners : {
////													render : function(){
////														alert('afs');
////														Ext.getCmp('tmpKnowStatus').setValue(22);
////													},
//													select : function(cbo,record, index) {
//														Ext.getCmp('use_knowStatus').setValue(Ext.getCmp('tmpKnowStatus').getValue());
//
//													}
//												}
//											},{
////												fieldLabel : '传入后台状态',
//												name : 'use_knowStatus',
//												id : 'use_knowStatus',
//												hidden : true,
//												value : this.knowStatus == null ? '' : this.knowStatus
//											},{
////												fieldLabel : '传入后台知识编号',
//												name : 'use_knowId',
//												id : 'use_knowId',
//												hidden : true,
//												value : this.knowId == null ? '' : this.knowId
//											}
//
//									]
//								});
//						// 加载表单对应的数据
//						if (this.dianpingId != null
//								&& this.dianpingId != 'undefined') {
//							this.formPanel.loadData({
//										url : __ctxPath
//												+ '/know/getUkKnowDianping.do?dianpingId='
//												+ this.dianpingId,
//										root : 'data',
//										preName : 'ukKnowDianping'
////										,callback : function(){
////											alert('callback scope!');
////											Ext.getCmp('use_knowId').setValue(ukKnowDianping.knowId);
////										}
//									});
//						}
//
//					},// end of the initcomponents
//
//					/**
//					 * 重置
//					 * 
//					 * @param {}
//					 *            formPanel
//					 */
//					reset : function() {
//						this.formPanel.getForm().reset();
//					},
//					/**
//					 * 取消
//					 * 
//					 * @param {}
//					 *            window
//					 */
//					cancel : function() {
//						var tabs = Ext.getCmp('centerTabPanel');
//						var eform = Ext.getCmp('UkKnowDianpingFormWin');
//						tabs.remove(eform);
//					},
//					/**
//					 * 保存记录
//					 */
//					save : function() {
//						$postForm({
//							formPanel : this.formPanel,
//							scope : this,
//							url : __ctxPath + '/know/saveUkKnowDianping.do',
//							callback : function(fp, action) {
//								var gridPanel = Ext
//										.getCmp('UkKnowDianpingGrid');
//								if (gridPanel != null) {
//									gridPanel.getStore().reload();
//								}
//								var tabs = Ext.getCmp('centerTabPanel');
//								var eform = Ext.getCmp('UkKnowDianpingFormWin');
//								tabs.remove(eform);
//							}
//						});
//					}// end of save
//
//				});