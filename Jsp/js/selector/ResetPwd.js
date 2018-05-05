
/**
 * 重置密码

 */
var dic_query = new Array();
var getDicValueByName = function(dicFind_paramName,value_param){
//	alert("getDicValueByName code!");
	var dicFind_paramValue;
	var dicRecord = Ext.data.Record.create(
			[	{ name: 'dicId', mapping: 'dicId'}, 
		        { name: 'itemValue', mapping: 'itemValue'}, 
		        { name: 'itemIndex', mapping: 'itemIndex'}
		    ]
			);
	    	var dicMemoryProxy = new Ext.data.HttpProxy({
	    				url: __ctxPath+ '/system/loadItemRecordDictionary.do'
	    			});
	    	var dicJsonReader = new Ext.data.JsonReader(
	    			{  
	    				root:'data',
//	    				totalProperty : 'totalCounts',
	    				id : 'dicId'},dicRecord
	    				
	    					);
	    	var pwd_store = new Ext.data.Store({
	    				proxy : dicMemoryProxy,
	    				reader : dicJsonReader,
	    				autoLoad : true
	    			});
	    	pwd_store.on('beforeload', function(pwd_store) {
	    					pwd_store.baseParams = {
	    							itemName : dicFind_paramName
	    				};
	    			});	
		pwd_store.load({
				callback : function(r, options, success) {
					if (success == false) {
						Ext.Msg.alert("ERROR","There was an error parsing the Country Combo.");
					} else {
						if (pwd_store.getCount() > 0) {
							dic_query[value_param] = pwd_store.getAt(0).data['itemIndex'];
						}
					}
				}
			}
		);

	    	
};
getDicValueByName('密码',0);
var resetPwdWindow = function(userId){	
//	var defaultPwd = getDicValueByName('密码');
	var defaultPwd = dic_query[0];
	
	var formPanel = new Ext.FormPanel({
				url : __ctxPath+ '/system/createPasswordAppUser.do',
				layout : 'form',
				id:'setPasswordForm',
				bodyStyle:'padding:5px',                                     
				border:false,
				defaults : {
					widht : 200,
					anchor : '100%,100%'
				},
//	        	defaultType : 'textfield',
				items : [{
							name : 'appUserUserId',
							id : 'appUserUserId',
							xtype:'hidden',
							value : userId
						}, 
						{
//							fieldLabel : '默认密码',
							name:'newpassword',
							id:'newpassword',
//							inputType : 'password',
//							maxLength:0,
//							maxLengthText:'密码不能超过0—18位',
//							allowBlank : false,
//							blankText : '密码不能为空!',
							xtype : 'hidden',
//							readOnly : true,
							value : defaultPwd
						},
						{
							xtype : 'label',
							text : '将改为系统默认密码！是否重置？',
							layout : 'fit'
							
						},
						{
//							fieldLabel : '确认密码',
							name:'password',
							id:'password',
//							inputType : 'password',
//							maxLength:0,
//							maxLengthText:'密码不能超过0—18位',
//							allowBlank : false,
//							blankText : '密码不能为空!',
							xtype : 'hidden',
//							readOnly : true,
							value : defaultPwd
						}
						]
			});
			
	var setPassword = new Ext.Window({
		title:'重置为系统默认密码',
		iconCls:'btn-password',
		width : 350,
		height : 175,
		modal: true,
		layout : 'fit',
		buttonAlign : 'center',
		items:[formPanel],
		buttons : [{
					text : '确定',
					iconCls:'btn-save',
					handler : function() {
						var fp=Ext.getCmp('setPasswordForm');
								if (fp.getForm().isValid()) {
								fp.getForm().submit({
											method: 'post',
											waitMsg : '正在提交数据...',
											success : function(fp,action) {
												Ext.ux.Toast.msg('操作信息', '重置密码成功！');
												setPassword.close();
											},
											failure : function(fp,action) {
												Ext.ux.Toast.msg('错误提示',action.result.msg);
												Ext.getCmp('setPasswordForm').getForm().reset();
											}
								});
							}
					}
				}, {
					text : '取消',
					iconCls:'btn-cancel',
					handler : function() {
						setPassword.close();
					}
				}]
			});
	setPassword.show();
};

