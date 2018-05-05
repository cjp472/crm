/**
 * 点评知识详情
 */
var UkKnowDianpingDetail = function(_id) {
	return new Ext.Panel({
		title : '点评详情',
		iconCls : 'menu-news',
		id : 'UkKnowDianpingDetail',
		autoScroll : true,
		autoWidth : true,
		border : false,

		defaults:{
			width:'98%'
		},
		items : [new Ext.Panel({
					id : 'KnowDianpingDisplayPanel',
					autoScroll : true,
					style : 'padding-left:1%;padding-top:10px;',
					autoHeight : true,
					border : false,
					autoLoad : {
						url : __ctxPath + '/pages/info/knowDianpingdetail.jsp?knowDianping='
								+ _id,
						scripts:true
					}
				}),{
					xtype:'panel',
					border:false,
					id:'DianpingCommentContainer',
					style : 'padding-left:1%;padding-top:10px;',
					items:[new KnowDianpingDisplayGrid(_id)]
				}, new Ext.FormPanel({ 
					url : __ctxPath + '/know/dianpingsaveUkKnowDianping.do',
					id : 'KnowDianpingDetailForm',
					iconCls : 'menu-info',
					title : '我要点评',
					autoScroll : true,
					style : 'padding-left:1%;padding-top:10px',
					autoHeight : true,
					defaultType : 'textfield',
					formId : 'KnowDianpingFormId',
					labelWidth : 55,
					defaults : {
						width : 550,  
						anchor:'98%,98%'
					},
					layout : 'form',
					items : [{
								name : 'ukKnowDianping.knowId',
								xtype : 'hidden',
								id : 'knowDianping'
							}, {
								xtype : 'hidden',
								value : curUserInfo.userId
							}, {
								fieldLabel : '用户',
								name : 'ukKnowDianping.userid',
								readOnly : true,
								value : curUserInfo.username
							}, {
								fieldLabel : '内容',
								xtype : 'textarea',
								blankText : '点评内容为必填!',
								allowBlank : false,
								name : 'ukKnowDianping.dianpingComment',
								id : 'UkKnowDianpingComment'
							}],
					buttonAlign : 'center',
					buttons : [{
						text : '提交',
						iconCls : 'btn-save',
						handler : function() {
							Ext.getCmp('knowDianping').setValue(document
									.getElementById("__knowDianpingId").value);
							var fp = Ext.getCmp('KnowDianpingDetailForm');
							if (fp.getForm().isValid()) {
								fp.getForm().submit({
									method : 'post',
									waitMsg : '正在提交数据...',
									success : function(fp, action) {
										Ext.ux.Toast.msg('操作信息', '成功保存信息！');
										Ext.getCmp('KnowDianpingDetailForm').getCmpByName('ukKnowDianping.dianpingComment').reset();
										Ext.getCmp('DianpingCommentDispalyGrid').getStore().reload();
//										Ext.getCmp('KnowDianpingDisplayPanel').getStore().reload();
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
							Ext.getCmp('KnowDianpingDetailForm').getCmpByName('ukKnowDianping.dianpingComment').reset();
						}
					}]
				})]
	});
}
var KnowDianpingDisplayGrid = function(_id) {

	var cm = new Ext.grid.ColumnModel({
		columns : [{
					width : 40,
					dataIndex : 'start',
					renderer : function(value, metadata, record, rowIndex,
							colIndex) {
						return rowIndex + 1 + '楼';
					}
				}, {
					dataIndex : 'dianpingId',
					hidden : true
				}, {
					width : 400,
					dataIndex : 'dianpingComment',
					renderer : function(value, metadata, record, rowIndex,
							colIndex) {
						html = '<table width="100%"><tr><td><font color="gray">点评人:'
								+ record.data.userid
								+ '</font></td><td align="right"><font color="gray">'
								+ record.data.dianpingTime
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
			url : __ctxPath + '/know/dianpinglistUkKnowDianping.do?Q_ukSysKnow.knowId_L_EQ='+_id
		}),
		reader : new Ext.data.JsonReader({
			root : 'result',
			totalProperty : 'totalCounts',
			id : 'id',
			fields : [{
						name : 'dianpingId',
						type : 'int'
					}, 'dianpingComment', 'userid','dianpingTime']
		}),
//				'dianpingComment', 'userid','dianpingTime','start']
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
				id : 'DianpingCommentDispalyGrid',
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