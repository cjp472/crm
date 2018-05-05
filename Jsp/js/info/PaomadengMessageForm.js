var MessageForm = {
	getView : function(callback,isSingle) {
		this.initUIComponents();
		var win = new Ext.Window({
					id : 'paomadengMessageForm',
					flex:1,
					title:'新消息',
					layout : 'fit',
					width:500,
					height:280,
					modal : true,
					autoScroll:true,
					border : false,
					items : [this.formPanel]
				});
		return win;
	},
	initUIComponents : function() {
		this.formPanel = new Ext.FormPanel({
			id : 'mFormPanel',
			frame : false,
			//draggable : true,
			border : false,
			//defaultType : 'textarea',
			url : __ctxPath + '/info/sendShortMessage.do',
			//method : 'post',
			reader : new Ext.data.JsonReader({
						root : 'data',
						id : 'messageId'
					}, [{
								name : 'userId',
								mapping : 'senderId'
							}, {
								name : 'userFullname',
								mapping : 'sender'
							}]),
			defaults : {
				allowBlank : false,
				//selectOnFocus : true,
				msgTarget : 'side'
			},
			modal : true,
			layout : 'form',
			plain : true,
			//scope : this,
			buttonAlign : 'center',
			items : [{
						xtype : 'hidden',
						name : 'userId',
						id : 'userId'
					},
					{
						xtype : 'fieldset',
						border : false,
						style : 'padding:0px',
						layout : 'column',
						height : 140,
						items : [
								{
									id : 'sendContent',
									xtype : 'textarea',
									name : 'content',
									width : 380,
									height:120,
									autoScroll:true,
									allowBlank : false
								}]
					}],
			buttons : [{
						text : '查看',
								iconCls : 'btn-readdocument',
								scope : this,
								handler : this.close

					}
			, 
					{
								text : '关闭',
								iconCls : 'btn-cancel',
								scope : this,
								handler : this.close
							}
					
					]
		});

	},//end of initUIComponents
	send:function(){
	    var message = Ext.getCmp('mFormPanel');
		if (message.getForm().isValid()) { 
			message.getForm().submit({
						waitMsg : '正在 发送信息',
						success : function(message, o) {
							var grid = Ext.getCmp('ReceiveMessage');
							if(grid){
								grid.getStore().reload();
							}
							var messagewidow = Ext.getCmp('paomadengMessageForm');
							
							messagewidow.close();
							var message = Ext
									.getCmp('mFormPanel');
							Ext.ux.Toast.msg('操作信息',
									'信息发送成功！');
							

						}
					});
		}
	},
		/**
	 * 关闭当前窗口
	 */
	close : function() {
		Ext.getCmp('paomadengMessageForm').close();
	},
	reset:function(){
	   var message = Ext.getCmp('mFormPanel');
	   message.getForm().reset();
	}
}
