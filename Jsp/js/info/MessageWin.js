/**
 * @author lyy 查看消息窗口
 * @class MessageWin
 * @extends Ext.Window
 */
MessageWin = Ext.extend(Ext.Window, {
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		MessageWin.superclass.constructor.call(this, {
					id : 'win',
					title : '',
					iconCls : 'btn-replyM',
					region : 'west',
					width : 300,
					height : 200,
					x : screen.width,
					y : screen.height,
					layout : 'fit',
					plain : true,
					border : false,
					bodyStyle : 'padding:5px;',
					buttonAlign : 'center',
					items : [],
					buttons : []
				});

		this.addUI();
	},
	addUI : function() {
		Ext.Ajax.request({
			url : __ctxPath + '/info/readInMessage.do',
			method : 'Get',
			success : function(response, options) {
				var object = Ext.util.JSON.decode(response.responseText);
				var message = object.message;
				var win = Ext.getCmp('win');
				if (message != null) {
					win.setTitle(message.sender + '--发送的消息');
					win.add({
								id : 'pp',
								xtype : 'panel',
								height : 150,
								width : 160,
								html : '<p>  ' + message.sender + '  '
										+ message.sendTime
										+ '</p><p style="color:blue;">'
										+ '<a href="#" onclick="MessageWin.clickTopTab(\''+ message.receiveId +'\','
										+ message.formId + ',' + message.haveNext +')">'+ message.content +'</a></p>'
							});
//					if(message.haveNext){
//						win.addButton({
//						   text : '下一条',
//									iconCls : 'btn-down',
//									id : 'nextMessage',
//									handler : function() {
//										var win = Ext.getCmp('win');
//										if (win != null) {
//											win.close();
//										}
//										new MessageWin().show();
//									}
//						
//						});
//					}
//					if(message.msgType==1){
//						win.addButton({
//									text : '回复',
//									iconCls : 'btn-replyM',
//									id : 'replyMessage',
//									handler : function() {
//										var win = Ext.getCmp('win');
//										win.close();
//										new ReMessageWin({id:message.senderId,
//												name:message.sender}).show();
//									}});
//					}
					win.addButton({
								text : '查看',
								iconCls : 'btn-readdocument',
								handler : function() {
									MessageWin.clickTopTab(message.receiveId,message.formId);
									Ext.Ajax.request({
										url : __ctxPath + '/info/readFlagInMessage.do',
										method : 'GET',
										success : function(response, options) {
										},
										failure : function(response, options) {
											Ext.ux.Toast.msg('操作信息', '操作异常！');
										},
										scope : this
									});
								}
							});
					win.addButton({
								text : '删除',
								iconCls : 'btn-del',
								handler : function() {
									Ext.Ajax.request({
										url : __ctxPath
												+ '/info/multiRemoveInMessage.do',
										method : 'POST',
										params : {
											ids : message.receiveId
										},
										success : function(response, options) {
											var win = Ext.getCmp('win');
											win.close();
											Ext.ux.Toast.msg('操作信息', '信息删除成功！');

										},
										failure : function(response, options) {
											Ext.ux.Toast.msg('操作信息', '信息删除失败！');
										},
										scope : this
									});
								}
							});
					win.doLayout();
				    var messagePanel=Ext.getCmp('MessagePanelView');
				    if(messagePanel!=null){
					  messagePanel.getUpdater().update(__ctxPath+ '/info/displayInMessage.do');
				    }
				} else {
					if (win != null) {
						win.close();
					}

				}
			}
		});

	}

});

MessageWin.clickTopTab = function(id,messageId){
//	if(precall!=null){
//		precall.call(this);
//	}
//	var tabs = Ext.getCmp('centerTabPanel');
//	var tabItem = tabs.getItem(id);
//	
//	if (tabItem == null) {
//		$ImportJs(id, function(view) {
//			tabItem = tabs.add(view);
//			tabs.activate(tabItem);
//		},params);
//	}else {
//		if(callback!=null){
//			callback.call(this);
//		}
//		tabs.activate(tabItem);
//	}
//	var win = Ext.getCmp('win');
////	if(!haveNext){
//		win.close();
////	}else{
////		new MessageWin().show();
////	}
	
	new MessageDetailInfo({
			boxId : id,
			messageId:messageId
		}).show();
	
	Ext.Ajax.request({
		url : __ctxPath + '/info/readFlagInMessage.do',
		method : 'get',
		success : function(response) {
			Ext.getCmp('win').close();
		},
		failure : function() {
			Ext.ux.Toast.msg("操作信息", "操作异常!");
		}
	});
};
