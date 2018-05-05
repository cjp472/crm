Ext.ns("App");
App.LoginWin = function(_isCodeEnabled, _isDyPwdEnabled) {
	Ext.form.Field.prototype.msgTarget = 'side'; 
	this.isCodeEnabled = _isCodeEnabled;
	this.isDyPwdEnabled = _isDyPwdEnabled;
	var formPanel = new Ext.form.FormPanel({
		id : 'LoginFormPanel',
		bodyStyle : 'background-color: transparent;padding-top:6px; z-index:5000;',
		defaultType : 'textfield',
		width:150,
		labelAlign : 'right',
		labelWidth : 55,
		labelPad : 0,
		border : false,
		layout : 'form',
		defaults : {
			style : 'margin:0 0 0 0',
			// anchor : '90%,120%',
			selectOnFocus : true
		},
		items : [{
					name : 'username',
					fieldLabel : '账      号',
					hideLabel:true,
//					cls : 'text-user',
					width : 120,
					msgTarget : 'side', 
					style:'border:none;height:16px',
//                    fieldClass : 'font-size?:40px;' ,
					allowBlank : false,
					blankText : '账号不能为空'
				}, {
					name : 'password',
					fieldLabel : '密      码',
					hideLabel:true,
					allowBlank : false,
					width : 120,
					labelStyle : 'margin-top:10px;',
					style : 'margin-top:14px;border:none;height:16px',
					blankText : '密码不能为空',
//					cls : 'text-lock',
					inputType : 'password'
				}, {
					name : 'usernumber',
					id : 'usernumber',
					width : 120,
					fieldLabel : '工      号',
					hideLabel:true,
					labelStyle : 'margin-top:10px;',
					style : 'margin-top:13px;border:none;height:16px',
					// allowBlank : false,
					blankText : '工号不能为空'
//					cls : 'call-me'
				}, {
					name : 'checkCode',
					id : 'checkCode',
					fieldLabel : '验证码',
					style : 'margin-top:10px',
					allowBlank : false,
					hidden : true,
					cls : 'text-code',
					blankText : '验证码不能为空'
				}, {
					name : 'curDynamicPwd',
					hidden : true,
					id : 'curDynamicPwd',
					fieldLabel : '令     牌',
					cls : 'text-dynamic',
					blankText : '令牌不能为空'
				}, {
					xtype : 'container',
					id : 'codeContainer',
					layout : 'table',
					defaultType : 'textfield',
					hideLabel : false,
					layoutConfig : {
						columns : 3
					}
				}, {
					xtype : 'container',
					style : 'padding-left:57px;margin-top:10px',
					layout : 'column',
					items : [{
						xtype : 'checkbox',
						hidden : true,
						name : '_spring_security_remember_me',
						boxLabel : '让系统记住我 '
							// }, {
							// xtype : 'panel',
							// border : false,
							// bodyStyle :
							// 'font-size:12px;padding-left:80px;background-color:
							// transparent',
							// html : '<a
							// href="javascript:toSuggestBox()">意见箱</a>'
						}]
				}]
	});

	if (this.isCodeEnabled != 'undefined' && this.isCodeEnabled != ''
			&& this.isCodeEnabled != '1' || this.isCodeEnabled == 'close') {// 不需要验证码
		formPanel.remove(Ext.getCmp('checkCode'));
	} else {
		Ext.getCmp('checkCode').show();
		var items = [{
					width : 55,
					xtype : 'label',
					text : '　　　　'// 这里的排序以后再改
				}, {
					width : 150,
					id : 'loginCode',
					xtype : 'panel',
					border : false,
					html : '<img border="0" height="30" width="150" src="'
							+ __ctxPath + '/CaptchaImg"/>'
				}, {
					width : 55,
					xtype : 'panel',
					border : false,
					bodyStyle : 'font-size:12px;padding-left:12px',
					html : '<a href="javascript:refeshCode()">看不清</a>'
				}];
		var codeContainer = Ext.getCmp('codeContainer');
		codeContainer.add(items);
		codeContainer.doLayout();
	}

	if (this.isDyPwdEnabled != 'undefined' && this.isDyPwdEnabled != ''
			&& this.isDyPwdEnabled != '1' || this.isDyPwdEnabled == 'close') {// 不需要动态密码
		formPanel.remove(Ext.getCmp('curDynamicPwd'));
	} else {
		Ext.getCmp('curDynamicPwd').show();
	}

	var LoginHandler = function() {
		if (formPanel.form.isValid()) {
			formPanel.form.submit({
						waitTitle : "请稍候",
						waitMsg : '正在登录......',
						url : __ctxPath + '/login.do',
						success : function(form, action) {
							handleLoginResult(action.result);
						},
						failure : function(form, action) {
							handleLoginResult(action.result);
							form.findField("password").setRawValue("");
							form.findField("username").focus(true);
						}
					});
		}
	};
//	var margin_1 = "",margin_2 = "";
//	if(Ext.isIE7){
//		//document.get
//	//margin_1 = 'margin-top:-150px;margin-left:190px;';
//	//margin_2 = 'margin-left:590px;';
//	}
//alert(navigator.userAgent.toLowerCase())
	var loginWin = new Ext.Window({
		id : 'LoginWin',
		// title : '用户登录',
		// iconCls : 'login-icon',
		// bodyStyle : 'background-color: white',
		bodyStyle : 'background: url(' + __ctxPath
				+ '/images/bg.jpg) no-repeat;',
		border : false,
		closable : false,
		resizable : false,
		plain : false, 
		buttonAlign : 'center',
		height : 395,
		//unstyled : true,
		// bodyStyle: 'background: none',
		baseCls : 'myWi',
		width : 1030,
		keys : {
			key : Ext.EventObject.ENTER,
			fn : LoginHandler,
			scope : this
		},
		items : [{
			xtype : 'panel',
			border : false,
			bodyStyle : 'background-color: transparent',
			items : [{
				xtype : 'label',
				width:1000,
				height:100,
//				html : '<div class="labelLeft" ><img src="images/title.png" /></div><div class="labelMiddle" ><div class="labelRight" ></div></div>'
				html:'&nbsp;'
			}, {
				xtype : 'panel',
				//style:margin_1,
				bodyStyle : 'background-color: transparent;margin-left:0px; margin-top:185px;margin-left:750px ',
				border : false,
//				layout : 'column',
				items : [formPanel]
			}, {
				xtype : 'panel',
				//style:margin_2,
				bodyStyle : 'background-color: transparent; margin-top:185px;margin-left:710px;margin-top:40px',
				border : false,
				layout : 'column',
				items : [{
							xtype : 'button',
							text : '登录',
							width : 80,
							iconCls : 'btn-login',
							handler : LoginHandler.createDelegate(this)
						}, {
							xtype : 'button',
							text : '重置',
							width : 80,
							style : 'margin-left:10px',
							iconCls : 'btn-login-reset',
							handler : function() {
								formPanel.getForm().reset();
							}
						}]
			}]
		}]
	});
	return loginWin;
};

function handleLoginResult(result) {
	var flag = result.msg.split('__');
	if (result.success) {
		Ext.getCmp('LoginWin').hide();
		var statusBar = new Ext.ProgressBar({
					text : '正在登录...'
				});
		statusBar.show();
		window.location.href = __ctxPath + '/index.jsp';
	} else {
		if (flag.length <= 1) {
			Ext.MessageBox.show({
						title : '操作信息',
						msg : result.msg,
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.ERROR
					});
		} else {
			if (1 == flag[0]) {// 开始时间大于当前时间
				Ext.MessageBox.show({
							title : '操作信息',
							msg : '允许登录时间大于当前时间，请联系管理员.',
							buttons : Ext.MessageBox.OK,
							icon : Ext.MessageBox.ERROR
						});
			} else if (2 == flag[0]) {// 密码过期
				Ext.MessageBox.show({
							title : '操作信息',
							msg : '密码过期，请联系管理员.',
							buttons : Ext.MessageBox.OK,
							icon : Ext.MessageBox.ERROR
						});
				// alert(flag[1]);
				// IndexResetPwdWindow(flag[1]);
			}
		}

	}
};

function refeshCode() {
	var loginCode = Ext.getCmp('loginCode');
	loginCode.body.update('<img border="0" height="30" width="150" src="'
			+ __ctxPath + '/CaptchaImg?rand=' + Math.random() + '"/>');
}
function toSuggestBox() {
	window.open(__ctxPath + '/info/suggest.do', '_blank');
}
