/**
 * @author YungLocke
 */
ReMessageWin=Ext.extend(Ext.Window,{
	formPanel:null,
	constructor:function(_cfg){
	   Ext.applyIf(this,_cfg);
	   this.initUI();
	   ReMessageWin.superclass.constructor.call(this,{
		    id : 'ReplyWindow',
			iconCls:'btn-mail_reply',
			title:'回复',
			width:400,
			height:350,
			x : screen.width,
	        y : screen.height,
	        border:false,
		    items:this.formPanel,
			buttons : [ {
				text : '发送',
				iconCls: 'menu-mail_send',
				handler : this.send.createCallback(this,this.formPanel)

			}, {
				text : '重置',
				iconCls:'reset',
				handler : this.reset.createCallback(this.formPanel)
			} ]
	   });
     },
     initUI:function(){
    	 this.formPanel = new Ext.form.FormPanel( {
    			id : 'mmFormPanel',
    			frame : false,
    			bodyStyle : 'padding:5px 20px 0',
    			width : 390,
    			height : 310,
    			defaultType : 'textarea',
    			url : __ctxPath + '/info/sendShortMessage.do',
    			layout:'absolute',
    			items : [{
    					xtype : 'hidden',
    					name : 'userId',
    					id : 'ReMessageWin.userId',
    					value:this.id
    				},{
    					xtype : 'hidden',
    					name : 'fileid_1',
    					id : 'ReMessageWin.fileid',
    					//消息回复统统就使用0，不要携带附件
    					value: '0'  
    				},{
    					xtype : 'hidden',
    					name : 'filename_1',
    					id : 'ReMessageWin.filename',
    					value: ' '
    				}, {
    					x:0,
    					y:10,
    					xtype:'label',
    					text:'收信人:'
    				},
    				{
    					    x:40,
    					    y:10,
    						xtype : 'field',
    						width : 330,
    						name : 'userFullname',
    						id : 'ReMessageWin.userFullname',
    						allowBlank : false,
    						readOnly : true,
    						value:this.name
    				},
 			       {
 			    	   x:0,
 			    	   y:40,
 			    	   xtype:'label',
 			    	   text:'类别:'
 			       }, {
					    x:40,
					    y:40,
						xtype : 'field',
						width : 330,
						name : 'sendMesType_1',
						id : 'ReMessageWin.sendMsgType',
						allowBlank : false,
						readOnly : true,
						value:this.msgType
				} , {
		    	     x:0,
		    	     y:70,
		    	     xtype:'label',
		    	     text:'附件:'
		        }, {
		    	    x:40,
		    	    y:70,
		    	    width : 260,
					xtype : 'panel',
					height : 50,
					name : 'filenames',
					id : 'filenames',
					items : '',
					autoScroll : true
				},{
					x:310,
					y:70,
					xtype:'button',
					text:'上传附件',
					handler : function() {
						var dialog = App.createUploadDialog({
							file_cat : 'communication/innerMail',
							callback : uploadMailAttachs
						});
						dialog.show();
					}
				},{
					x:310,
					y:95,
					xtype:'button',
					text:'清除附件',
					handler : function() {
						alert(Ext.getCmp('ReMessageWin.filename').getValue());
						alert(Ext.getCmp('ReMessageWin.fileid').getValue());
						Ext.getCmp('ReMessageWin.filename').setValue('');
						Ext.getCmp('ReMessageWin.fileid').setValue('');
						Ext.getCmp('filenames').update();
					}
				},{
		    	   x:0,
		    	   y:130,
		    	   xtype:'label',
		    	   text:'内容:'
		        }, {
		    	    x:40,
		    	    y:130,
					id : 'ReMessageWin.sendContent',
					xtype : 'textarea',
					width : 330,
					height : 140,
					name : 'content',
					allowBlank:true
		       }]
    		});
     },
     send:function(self,panel){
    	 var message =panel;
			if (message.getForm().isValid()) {
				message.getForm().submit( {
					waitMsg : '正在 发送信息',
					success : function(message, o) {
						Ext.ux.Toast.msg('操作信息', '信息发送成功！');
						self.close();
					}
				});
			}
     },
     reset:function(panel){
    	 panel.getForm().findField("content").reset();
     }
});

function uploadMailAttachs(data) {
	//alert(data.length);
	//alert(data[0].fileId);
	var htmls = '';
	//var fileIds = "";
	var ids = "";
	//alert(ids);
	if(ids != null && ids != '')
		ids += ',';
	//var filenames = Ext.getCmp('mail.filenames');
	var names = "";//filenames.getValue();
	//alert(names);
	if(names != null && ids != '')
		names +=',';
	var display = Ext.getCmp('filenames');
//	var placeholder = Ext.getCmp('placeholder');
//	if (placeholder != null) {// 隐藏点位符
//		placeholder.hide();
//	}
//	alert(placeholder);
	for (var i = 0; i < data.length; i++) {
		ids += data[i].fileId;
		names += data[i].fileName;
		if(i < data.length - 1){
			ids += ',';
			names += ',';
		}
		htmls += '<span><a href="#" onclick="FileAttachDetail.show('
			+ data[i].fileId + ')">'
			+ data[i].fileName + '</a> <img class="img-delete" src="' + __ctxPath
			+ '/images/system/delete.gif" onclick="deleteAttach(this,'
			+ data[i].fileId + ')"/>&nbsp;|&nbsp;</span>';
	}
	//alert(ids+ "    " +names);
	Ext.DomHelper.append(display.body,htmls);
	Ext.getCmp('ReMessageWin.filename').setValue(names);Ext.getCmp('ReMessageWin.fileid').setValue(ids);
	
	
}