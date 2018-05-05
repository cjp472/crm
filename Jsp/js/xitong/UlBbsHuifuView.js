/**
 * @author:cf0666@gmail.com
 * @class UlBbsHuatiView
 * @extends Ext.Panel
 * @description [UlBbsHuati]管理
 * @company 优创融联科技
 * @createtime:
 */

// 一般栏目
Portlet = Ext.extend(Ext.ux.Portlet, {
	tools : null,
	url : null,
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		this.initTool(_cfg);
	this.url = __ctxPath + '/pages/indexpages/huiFuListPage.jsp'//+?status= _cfg.status
Portlet.superclass.constructor.call(this, {
	// id : 'DepPlanPanelView',
	title : _cfg.title,
	iconCls : _cfg.iconCls,
	tools : this.tools,
	autoLoad : {
		url : this.url,
		scripts : true
	}
});
},
initTool : function(_cfg) {
this.tools = [ {
	id : 'refresh',
	scope : this,
	handler : function() {
		this.getUpdater().update(this.url);
	} 
  }];
}

});


UlBbsHuifuView = Ext.extend(Ext.Panel, {
	//portalPanel : null,
	toolbar : null,
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		this.initUIComponents();
		UlBbsHuifuView.superclass.constructor.call(this, {
					title : '回复信息',
					closable : false,
					id : 'UlBbsHuifuView',
					iconCls : 'menu-section-view',
					layout : 'fit',
					defaults : {
						padding : '0 5 0 0'
					},
					tbar : this.toolbar,
					items : []
				});
	},
	initUIComponents : function() {
		this.toolbar = new Ext.Toolbar({
					height : 30,
					items : [{
								iconCls : 'btn-refresh',
								text : '刷新视图',
								xtype : 'button',
								scope : this,
								handler : this.refreshRs.createCallback(this)
							}]
				});

		var tools = [{
					id : 'gear',
					handler : function() {
						Ext.Msg.alert('Message',
								'The Settings tool was clicked.');
					}
				}, {
					id : 'close',
					handler : function(e, target, panel) {
						panel.ownerCt.remove(panel, true);
					}
				}];
				
		this.refreshRs(this);
	},
	/**
	 * 
	 * @param {} self
	 * @param {} columnType 视图显示的列出
	 */
	refreshRs : function(self,columnType) {
		//self.items[0].destory();
		self.removeAll(true);
		self.doLayout();
		var column0 = [];
		var column1 = [];
		var column2 = [];
		Ext.Ajax.request({
			url : __ctxPath + '/xitong/listUlBbsHuati.do',
			method : 'POST',
			success : function(response) {
				var res = Ext.util.JSON.decode(response.responseText);
				var ress={success:true,'totalCounts':1,result:[{"attachmentUrl":"阿斯多夫","bbsHuatiId":25,"businessType":1
					,"content":"阿斯多夫","createby":null,"createtime":null,"joiner":"ad司法",
					"joinerGroup":"阿斯多夫","status":1,"title":"44","updateby":"阿斯多夫","updatetime":null},
					{"attachmentUrl":null,"bbsHuatiId":84,"businessType":null,"content":"111",
				 "createby":null,"createtime":null,"joiner":null,"joinerGroup":null,"status":1,"title":"1","updateby":null,"updatetime":null}]}

				var data = res.result;
				if(columnType == null || columnType == undefined || columnType ==''){
					columnType = res.columnType;
				}
				for (var i = 0; i < 1; i++) {
					var section = data[i];
						column0.push(new Portlet({
										status : section.status
							}));
				}
				var _items = null;
					_items = [{
										columnWidth : .98,
										style : 'padding:10px 0 10px 10px',
										name : 'FirstColumn',
										items : column0
									}]
				self.add({
							xtype : 'portal',
							region : 'center',
							border : false,
							id : 'SectionPortal',
							margins : '35 5 5 0',
							items : _items
						});
				self.doLayout();
			},
			failure : function() {

			}
		})
	}
});