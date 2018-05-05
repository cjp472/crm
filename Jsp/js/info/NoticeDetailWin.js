/**
 * @author wangzj
 * 公告详情窗口
 */
NoticeDetailWin = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		var msgId = _cfg.idType
		// 必须先初始化组件
		this.initUIComponents(_cfg);
		NoticeDetailWin.superclass.constructor.call(this, {
					id : 'NoticeDetailWin',
					layout : 'fit',
					items : this.displayPanel,
					modal : true,
//					height : 550,
					autoWidth : true,
					iconCls : 'menu-notice',
					autoScroll:true,
					maximizable : true,
					title : '公告详情',
					tbar : new Ext.Toolbar({
						height : 30,
						bodyStyle : 'text-align:center',
						defaultType : 'button',
						items : [{
							text : '确定',
							iconCls:'btn-save',
							handler : function(){
//								var newsId = Ext.get('marquee_href_hidden').dom.innerHTML;
								Ext.Ajax.request({
										url : __ctxPath
												+ '/info/readUserFlagInMessage.do',
										params : {
											messageId : msgId
										},
										method : 'GET',
										success : function(response, options) {
											var tabs = Ext.getCmp('centerTabPanel');
											tabs.remove('NoticeDetailWin');
										},
										failure : function(response, options) {
											Ext.ux.Toast.msg('操作信息', '操作异常！');
										},
										scope : this
									});
							}
						}, {
							text : '取消',
							iconCls : 'btn-cancel',
							scope : this,
							handler : this.cancel
						}]
					})
				});
	},// end of the constructor
	// 初始化组件
	initUIComponents : function(_cfg) {
		
		this.displayPanel = new Ext.Panel({
//							width : 650,
							id : 'HomeNoticeDetailPanelWin',
							autoScroll : true,
							style : 'padding-left:10%;padding-top:10px;',
							autoHeight : true,
							border:false,
							autoLoad : {
								url : __ctxPath
										+ '/pages/info/noticedetail.jsp?noticeId='
										+ _cfg.id
							}
						});
		
	},// end of the initcomponents
	
	/**
	 * 取消
	 * @param {}
	 *  window
	 */
	cancel : function() {
		var tabs = Ext.getCmp('centerTabPanel');
		tabs.remove('NoticeDetailWin');
	}
});
