/**
 * 新闻详情
 */
var UkKnowFankuiDetail = function(_id) {
	return new Ext.Panel({
		title : '反馈详情',
		iconCls : 'menu-news',
		id : 'UkKnowFankuiDetail',
		autoScroll : true,
		autoWidth : true,
		border : false,

		defaults:{
			width:'98%'
		},
		items : [new Ext.Panel({
					id : 'KnowFankuiDisplayPanel',
					autoScroll : true,
					style : 'padding-left:1%;padding-top:10px;',
					autoHeight : true,
					border : false,
					autoLoad : {
						url : __ctxPath + '/pages/info/knowFankuidetail.jsp?knowFankui='
								+ _id,
						scripts:true
					}
				}),{
					xtype:'panel',
					border:false,
					id:'UkKnowFankuiContainer',
					style : 'padding-left:1%;padding-top:10px;',
					items:[new KnowFankuiDisplayGrid(_id)]
				}, new Ext.FormPanel({ 
					url : __ctxPath + '/know/fankuisaveUkKnowFankui.do',
					id : 'KnowFankuiDetailForm',
					iconCls : 'menu-info',
					title : '我要反馈',
					autoScroll : true,
					style : 'padding-left:1%;padding-top:10px',
					autoHeight : true,
					defaultType : 'textfield',
					formId : 'KnowFankuiFormId',
					labelWidth : 55,
					defaults : {
						width : 550,  
						anchor:'98%,98%'
					},
					layout : 'form',
					items : [{
								name : 'ukKnowFankui.knowId',
								xtype : 'hidden',
								id : 'knowFankui'
							}, {
								xtype : 'hidden',
								value : curUserInfo.userId
							}, {
								fieldLabel : '用户',
								name : 'ukKnowFankui.userid',
								readOnly : true,
								value : curUserInfo.fullname
							}, {
								fieldLabel : '内容',
								xtype : 'textarea',
								blankText : '反馈内容为必填!',
								allowBlank : false,
								name : 'ukKnowFankui.fankuiContent',
								id : 'UkKnowFankuiContent'
							}],
					buttonAlign : 'center',
					buttons : [{
						text : '提交',
						iconCls : 'btn-save',
						handler : function() {
							Ext.getCmp('knowFankui').setValue(document
									.getElementById("__knowFankuiId").value);
							var fp = Ext.getCmp('KnowFankuiDetailForm');
							if (fp.getForm().isValid()) {
								fp.getForm().submit({
									method : 'post',
									waitMsg : '正在提交数据...',
									success : function(fp, action) {
										Ext.ux.Toast.msg('操作信息', '成功保存信息！');
										Ext.getCmp('KnowFankuiDetailForm').getCmpByName('ukKnowFankui.fankuiContent').reset();
										Ext.getCmp('FankuiCommentDispalyGrid').getStore().reload();
//										Ext.getCmp('KnowFankuiDisplayPanel').getStore().reload();
                                        var tabs = Ext.getCmp('centerTabPanel');
                                        var eform = Ext.getCmp('UkKnowFankuiDetail');
                                        if (eform != null) {
                                            tabs.remove('KnowFankuiDisplayPanel');
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
					}, {
						text : '重置',
						iconCls : 'reset',
						handler : function() {
							Ext.getCmp('KnowFankuiDetailForm').getCmpByName('ukKnowFankui.fankuiContent').reset();
						}
					}]
				})]
	});
}
var KnowFankuiDisplayGrid = function(_id) {

	var cm = new Ext.grid.ColumnModel({
		columns : [{
					width : 40,
					dataIndex : 'start',
					renderer : function(value, metadata, record, rowIndex,
							colIndex) {
						return rowIndex + 1 + '楼';
					}
				}, {
					dataIndex : 'fankuiId',
					hidden : true
				}, {
					width : 400,
					dataIndex : 'fankuiContent',
					renderer : function(value, metadata, record, rowIndex,
							colIndex) {
						html = '<table width="100%"><tr><td><font color="gray">反馈人:'
								+ record.data.userid
								+ '</font></td><td align="right"><font color="gray">'
								+ record.data.fankuiTime
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
							url : __ctxPath + '/know/fankuilistUkKnowFankui.do?Q_ukSysKnow.knowId_L_EQ='+_id
						}),
				reader : new Ext.data.JsonReader({
							root : 'result',
							totalProperty : 'totalCounts',
							id : 'id',
							fields : [{
										name : 'fankuiId',
										type : 'int'
									}, 
									'fankuiContent', 'userid','fankuiTime','start']
						}),
				remoteSort : false
			});
	//store.setDefaultSort('createtime', 'asc');
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
				id : 'FankuiCommentDispalyGrid',
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