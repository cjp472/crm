/**
 * 新闻详情
 */
var NewsDetailWin = function(_cfg) {
	var msgId = _cfg.idType;
	return new Ext.Panel({
		title : '新闻详情',
		iconCls : 'menu-news',
		id : 'NewsDetailWin',
		autoScroll : true,
		autoWidth : true,
		border : false,
		defaults:{
			width:'98%'
		},
		items : [new Ext.Panel({
					id : 'HomeNewsDisplayPanel',
					autoScroll : true,
					style : 'padding-left:1%;padding-top:10px;',
					autoHeight : true,
					border : false,
					autoLoad : {
						url : __ctxPath + '/pages/info/newsdetail.jsp?newsId='
								+ _cfg.id,
						scripts:true
					}
				}),{
					xtype:'panel',
					border:false,
					id:'NewsCommentContainer',
					style : 'padding-left:1%;padding-top:10px;',
					items:[new NewsCommentDisplayGrid(_cfg.id)]
				}, new Ext.FormPanel({
					url : __ctxPath + '/info/saveAndReadNewsComment.do?messageId='+msgId,
					id : 'NewsCommentForm',
					iconCls : 'menu-info',
					title : '我要评论',
					autoScroll : true,
					style : 'padding-left:1%;padding-top:10px',
					autoHeight : true,
					defaultType : 'textfield',
					formId : 'NewsCommentFormId',
					labelWidth : 55,
					defaults : {
						width : 550,
						anchor:'98%,98%'
					},
					layout : 'form',
					items : [{
								name : 'newsComment.newsId',
								xtype : 'hidden',
								id : 'newsCommentNewsId'
							}, {
								name : 'newsComment.userId',
								xtype : 'hidden',
								value : curUserInfo.userId
							}, {
								fieldLabel : '用户',
								name : 'newsComment.fullname',
								readOnly : true,
								value : curUserInfo.fullname
							}, {
								fieldLabel : '内容',
								xtype : 'textarea',
								name : 'newsComment.content',
								id : 'newsCommentContent'
							}],
					buttonAlign : 'center',
					buttons : [{
						text : '提交',
						iconCls : 'btn-save',
						handler : function() {
							Ext.getCmp('newsCommentNewsId').setValue(document.getElementById("__curNewsId").value);
							var fp = Ext.getCmp('NewsCommentForm');
							alert(msgId);
							if (fp.getForm().isValid()) {
								fp.getForm().submit({
									method : 'post',
									waitMsg : '正在提交数据...',
									success : function(fp, action) {
										Ext.ux.Toast.msg('操作信息', '成功保存信息！');
										var tabs = Ext.getCmp('centerTabPanel');
										tabs.remove('NewsDetailWin');
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
							Ext.getCmp('newsCommentContent').setValue('');
						}
					}]
				})]
	});
}
var NewsCommentDisplayGrid = function(_id) {

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
							url : __ctxPath + '/info/listNewsComment.do?Q_news.newsId_L_EQ='+_id
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
				id : 'NewsCommentDispalyGrid',
				autoWidth : true,
				title : '查看评论',
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