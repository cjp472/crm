/**
 * 
 */

var login_curDate = new Date().format('Y-m-d');
var new_enddate;
var login_dic_query = new Array();
var login_getDicValueByName = function(dicFind_paramName, value_param) {
	
	// alert("getDicValueByName code!");
	var dicFind_paramValue;
	var dicRecord = Ext.data.Record.create([{
						name : 'dicId',
						mapping : 'dicId'
					}, {
						name : 'itemValue',
						mapping : 'itemValue'
					}, {
						name : 'itemIndex',
						mapping : 'itemIndex'
					}]);
	var dicMemoryProxy = new Ext.data.HttpProxy({
				url : __ctxPath + '/system/loadItemRecordDictionary.do'
			});
	var dicJsonReader = new Ext.data.JsonReader({
				root : 'data',
				// totalProperty : 'totalCounts',
				id : 'dicId'
			}, dicRecord

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
				Ext.Msg.alert("ERROR",
						"There was an error parsing the Country Combo.");
			} else {
				// alert("pwd_store.getCount():" + pwd_store.getCount());
				if (pwd_store.getCount() > 0) {
					login_dic_query[value_param] = pwd_store.getAt(0).data['itemIndex'];
					// alert("oh no :" + login_dic_query[value_param]);
				}
			}
		}
	});

};
login_getDicValueByName('密码有效间隔', 0);
var curUserFullName;
var isChange;
var loginPwdCheck = function(userInfo, changeFlag) {
	isChange = changeFlag;
	// getDicValueByName('密码有效间隔',1);
	new_enddate = new Date().add(Date.DAY,parseInt(login_dic_query[0])).format('Y-m-d');
//	alert(new Date(login_curDate) + '=login_curDate=');

	var object = Ext.util.JSON.decode(userInfo);
	// 取得当前登录用户的相关信息，包括权限
	var user = object.user;
	var conf = user.items;
	curUserInfo = new UserInfo(user);
	//alert(curUserInfo.username);
	if (curUserInfo.userId != 1) {
		if (!changeFlag) {
			var bdate = curUserInfo.begindate.substr(0, 10);
			var edate = curUserInfo.enddate.substr(0, 10);
			curUserFullName = curUserInfo.fullname;
			var curDate = new Date().format('Y-m-d');
			// alert(bdate + "|" + bdate.substr(0,10));
			// alert(login_curDate + "|"+ curDate.substr(0,10));
			// alert(bdate.substr(0,10) > curDate.substr(0,10));
			if (bdate > curDate) {
				// Ext.Msg.alert("警告！", "用户无法登陆，请联系管理员！", function(){2012-05-08
				// // window.location.href = __ctxPath
				// +"/js/myTestJs/sessiondestroy.jsp";
				// alert("destory session!");
				// window.close();
				// window.open(__ctxPath
				// +"/js/myTestJs/sessiondestroy.jsp",false);
				// // window.location.href = __ctxPath+ "/login.jsp";
				// });
			} else if (edate <= curDate) {
				IndexResetPwdWindow(curUserInfo.userId, '密码已过期，请修改密码！');
			} else {// ok
			// alert( edate <= curDate);
			}
		} else {
			IndexResetPwdWindow(curUserInfo.userId, '修改密码！');
		}
	} else {
		if (changeFlag) {
			IndexResetPwdWindow(curUserInfo.userId, '修改密码！');
		}

	}

};

var arrPwdCheck = function(userInfo, changeFlag) {
	isChange = changeFlag;
	// getDicValueByName('密码有效间隔',1);
	new_enddate = new Date().add(Date.DAY,parseInt(login_dic_query[0])).format('Y-m-d');
//	alert(new Date(login_curDate) + '=login_curDate=');

	var object = Ext.util.JSON.decode(userInfo);
	// 取得当前登录用户的相关信息，包括权限
	var user = object.user;
	var conf = user.items;
	curUserInfo = new UserInfo(user);
	
	if (curUserInfo.userId != 1) {
		if (!changeFlag) {
			var bdate = curUserInfo.begindate.substr(0, 10);
			var edate = curUserInfo.enddate.substr(0, 10);
			curUserFullName = curUserInfo.fullname;
			var curDate = new Date().format('Y-m-d');
			// alert(bdate + "|" + bdate.substr(0,10));
			// alert(login_curDate + "|"+ curDate.substr(0,10));
			// alert(bdate.substr(0,10) > curDate.substr(0,10));
			if (bdate > curDate) {
				// Ext.Msg.alert("警告！", "用户无法登陆，请联系管理员！", function(){2012-05-08
				// // window.location.href = __ctxPath
				// +"/js/myTestJs/sessiondestroy.jsp";
				// alert("destory session!");
				// window.close();
				// window.open(__ctxPath
				// +"/js/myTestJs/sessiondestroy.jsp",false);
				// // window.location.href = __ctxPath+ "/login.jsp";
				// });
			} else if (edate <= curDate) {
				setArrPwdWindow(curUserInfo.userId, '密码已过期，请修改密码！');
			} else {// ok
			// alert( edate <= curDate);
			}
		} else {
			setArrPwdWindow(curUserInfo.userId, '修改授权密码！');
			
		}
	} else {
		if (changeFlag) {
			setArrPwdWindow(curUserInfo.userId, '修改授权密码！');
		}

	}

};

var loginarr = function(userInfo){
	var object = Ext.util.JSON.decode(userInfo);
	// 取得当前登录用户的相关信息，包括权限
	var user = object.user;
	var conf = user.items;
	curUserInfo = new UserInfo(user);
	loginArrPwdUser(curUserInfo.username,"坐席授权登录");
}




var IndexResetPwdWindow = function(userId, qtip) {
//	alert("getDicValueByName code!");
	var formPanel = new Ext.FormPanel({
				url : __ctxPath + '/system/resetPasswordAppUser.do',
				layout : 'form',
				id : 'setPasswordForm',
				frame : true,
				defaults : {
					widht : 400,
					anchor : '97%,97%'
				},
				defaultType : 'textfield',
				items : [{
							name : 'appUserUserId',
							id : 'appUserUserId',
							xtype : 'hidden',
							value : userId
						}, {
							fieldLabel : '旧密码',
							name : 'oldPassword',
							id : 'oldPassword',
							inputType : 'password',
							allowBlank : false,
							blankText : '请输入旧密码！'
						}, {
							fieldLabel : '新密码',
							name : 'newPassword',
							id : 'newPassword',
//							regex : /^[A-Za-z0-9]+$/,  /*没生效*/
//							regexText : '只能输入英文和数字！',
							inputType : 'password',
							enableKeyEvents : true,
							allowBlank : false,
							blankText : '请输入新密码！',
							invalidText : '两次输入的密码不一致！',
							validator : function(value) {
//								var patrn=/^[a-zA-Z]{1,30}$/; 
//								var ret = !patrn.exec(value);
//								if (ret){
//									this.invalidText = '只能输入英文和数字！';
//								}
//								alert(ret);
								var reg = new RegExp("^[A-Za-z0-9]+$");
								if( ! reg.test(value)){
									this.invalidText = '只能输入英文和数字！';
									return false;
								}
							    
								var newPwd = Ext.getCmp('againPassword')
										.getValue();
								if (value == null || value == '') {
									this.invalidText = '请输入新密码！';
									return false;
								}
								if (newPwd != '' && value != '') {
									if (value != newPwd) {
										// Ext.getCmp('newPassword').setValue('');
										// value = '';
										this.invalidText = '两次输入的密码不一致！';
										return false;
									} else {
										return true;
									}
								}
							},
							listeners : {
								'focus' : function() {
									// alert("focus");
									// alert(this.value);
									// alert(Ext.getCmp('newPassword').getValue());
									pwStrength(Ext.getCmp('newPassword')
											.getValue(),0);
								},
								'keyup' : function() {
									// alert('keyup');
									pwStrength(Ext.getCmp('newPassword')
											.getValue(),0);
								}
							}
						}, {
							// var embeddedColumns = new Ext.Container({
							xtype : 'container',
							autoEl : 'div', // 默认的设置。This is the default
							layout : 'column',
							defaults : {
								// xtype: 'textfield',
								autoEl : 'TD', // 默认的设置。This is the default.
								layout : 'form',
								columnWidth : 0.5,
								style : {
									padding : '0px'
									// ,background : '#FFFFFF'
								}
							},
							// 下面两项都成为Ext.Containers，都是对<DIV>元素的封装。// The two
							// items below will be Ext.Containers, each
							// encapsulated by a <DIV> element.
							items : [{
										xtype : 'label',
										text : '密码强度:',
										name : 'startDate',
										columnWidth : 0.42
									}, {
										xtype : 'container',
										autoEl : 'div', // 默认的设置。This is the
														// default
										layout : 'column',
										columnWidth : 0.58,
										defaults : {
											// xtype: 'textfield',
											autoEl : 'TD', // 默认的设置。This is the
															// default.
											layout : 'form',
											columnWidth : 0.33,
											style : {
												padding : '0px'
											}
										},
										items : [{
													xtype : 'label',
													name : 'strength_L',
													id : 'strength_L',
													text : '弱',
													style : {
													}
												}, {
													xtype : 'label',
													name : 'strength_M',
													id : 'strength_M',
													text : '中'
												}, {
													xtype : 'label',
													name : 'strength_H',
													id : 'strength_H',
													text : '强'
												}]
										// });

								}]
							// });
					}	, {
							fieldLabel : '再输入',
							name : 'againPassword',
							id : 'againPassword',
							inputType : 'password',
							allowBlank : false,
							blankText : '请再次输入新密码！',
							invalidText : '两次输入的密码不一致！',
							validator : function(value) {
								var newPwd = Ext.getCmp('newPassword')
										.getValue();
								if (value == null || value == '') {
									this.invalidText = '请再次输入新密码！';
									return false;
								}
								if (newPwd != '' && value != '') {
									if (value != newPwd) {
										// Ext.getCmp('againPassword').setValue('');
										// this.value = '';
										this.invalidText = '两次输入的密码不一致！';
										return false;
									} else {
										return true;
									}
								}
							},
							listeners : {
								'blur' : function(value) {
									var newPwd = Ext.getCmp('newPassword')
											.getValue();
									if (newPwd != '' && value != '') {
										if (value != newPwd) {
											// Ext.getCmp('againPassword').setValue('');
											return false;
										} else {
											return true;
										}
									}
								}
							}
						}, {
							name : 'appUser.begindate',
							id : 'appUser.begindate',
							xtype : 'hidden',
							value : login_curDate
						}, {
							name : 'appUser.enddate',
							id : 'appUser.enddate',
							xtype : 'hidden',
							value : new_enddate
						}, {
							name : 'appUser.updateby',
							id : 'appUser.updateby',
							xtype : 'hidden',
							value : curUserFullName
						}]
			});

	var setPassword = new Ext.Window({
		title : qtip,
		iconCls : 'btn-password',
		id : 'setPassword_win',
		width : 300,
		height : 175,
		modal : true,
		layout : 'anchor',
		bodyStyle : 'padding:5px;',
		buttonAlign : 'center',
		items : [formPanel],
		closable : false,
		buttons : [{
			text : '保存',
			iconCls : 'btn-save',
			handler : function() {
				var fp = Ext.getCmp('setPasswordForm');
				if (fp.getForm().isValid()) {
					fp.getForm().submit({
						method : 'post',
						sync:true,
						waitMsg : '正在提交数据...',
						success : function(fp, action) {
							Ext.ux.Toast.msg('操作信息', '密码修改成功！');
//							document.getElementById('change_currentUser_beginDate').innerHTML = Ext.getCmp('appUser.begindate').getValue();
//							document.getElementById('change_currentUser_endDate').innerHTML =Ext.getCmp('appUser.enddate').getValue();
//							Ext.getCmp('setPassword_win').close();
							window.location.href = __ctxPath + '/login.jsp';
						},
						failure : function(fp, action) {
							Ext.ux.Toast.msg('错误提示', action.result.msg);
							Ext.getCmp('setPasswordForm').getForm().reset();
						}
					});
				}
			}
		}, {
			text : '取消',
			iconCls : 'btn-cancel',
			handler : function() {
				if (isChange) {
					setPassword.close();
				} else {
					window.location.href = __ctxPath + '';
				}

			}
		}]
	});
	setPassword.show();
};
/**
 * 
 */

// CharMode函数
// 测试某个字符是属于哪一类.
var CharMode = function(iN) {
	// alert("charmode");
	if (iN >= 48 && iN <= 57) // 数字
		return 1;
	if (iN >= 65 && iN <= 90) // 大写字母
		return 2;
	if (iN >= 97 && iN <= 122) // 小写
		return 4;
	else
		return 8; // 特殊字符
};
// bitTotal函数
// 计算出当前密码当中一共有多少种模式
var bitTotal = function(num) {
	// alert("bitTotal");
	var modes = 0;
	for (i = 0; i < 4; i++) {
		if (num & 1)
			modes++;
		num >>= 1;
	}
	return modes;
};
// checkStrong函数
// 返回密码的强度级别
var checkStrong = function(sPW) {
	// alert("checkStrong");
	if (sPW.length <= 4)
		return 0; // 密码太短
	var Modes = 0;
	for (i = 0; i < sPW.length; i++) {
		// 测试每一个字符的类别并统计一共有多少种模式.
		// alert(CharMode(sPW.charCodeAt(i)));
		Modes |= CharMode(sPW.charCodeAt(i));
		// alert(Modes);
	}
	return bitTotal(Modes);
};
// pwStrength函数
// 当用户放开键盘或密码输入框失去焦点时,根据不同的级别显示不同的颜色
var pwStrength = function(pwd,type) {
	// alert('pwd' + pwd);
	// alert('pwStrength');
	var O_color = '';
	var L_color = '#FF0000';
	var M_color = '#FF9900';
	var H_color = '#33CC00';
	var Lcolor, Mcolor, Hcolor, S_level;
	if (pwd == null || pwd == '') {
		Lcolor = Mcolor = Hcolor = O_color;
	} else {
		S_level = checkStrong(pwd);
		// alert(S_level);
		switch (S_level) {
			case 0 :
				Lcolor = Mcolor = Hcolor = O_color;
			case 1 :
				Lcolor = L_color;
				Mcolor = Hcolor = O_color;
				break;
			case 2 :
				Lcolor = Mcolor = M_color;
				Hcolor = O_color;
				break;
			default :
				Lcolor = Mcolor = Hcolor = H_color;
		}
	}
	// document.getElementById('strength_L').style.background = Lcolor;
	// document.getElementById('strength_M').style.background = Mcolor;
	// document.getElementById('strength_H').style.background = Hcolor;
	// alert('Lcolor' + Lcolor);
	if(type == 0){
		Ext.getCmp('strength_L').getEl().applyStyles({
				'background' : Lcolor
			});
		Ext.getCmp('strength_M').getEl().applyStyles({
					'background' : Mcolor
				});
		Ext.getCmp('strength_H').getEl().applyStyles({
					'background' : Hcolor
				});
	}else{
		Ext.getCmp('arr_strength_1').getEl().applyStyles({
				'background' : Lcolor
			});
		Ext.getCmp('arr_strength_2').getEl().applyStyles({
					'background' : Mcolor
				});
		Ext.getCmp('arr_strength_3').getEl().applyStyles({
					'background' : Hcolor
				});
	}
	
	// alert( 'Lcolor:'+ Lcolor + '|| Mcolor :' + Mcolor +'|| Hcolor :' +Hcolor
	// );
	// Ext.getCmp('strength_L').getEl().setStyle('width', '300px');
	// alert(Ext.getCmp('strength_L').getEl().getStyle('background'));

	return;
};

// var IndexResetPwdWindow = function(userId, qtip){
// alert('ok');
// };


var setArrPwdWindow = function(userId, qtip) {
//	alert("getDicValueByName code!");
	var formPanel = new Ext.FormPanel({
				url : __ctxPath + '/system/resetArrpwdAppUser.do',
				layout : 'form',
				id : 'setARRwpwdForm',
				frame : true,
				defaults : {
					widht : 400,
					anchor : '97%,97%'
				},
				defaultType : 'textfield',
				items : [{
							name : 'appUserUserId_1',
							id : 'appUserUserId_1',
							xtype : 'hidden',
							value : userId
						}, {
							fieldLabel : '旧密码',
							name : 'oldArrPwd',
							id : 'oldArrPwd',
							inputType : 'password',
							allowBlank : false,
							blankText : '请输入旧密码！'
						}, {
							fieldLabel : '新密码',
							name : 'newArrPwd',
							id : 'newArrPwd',
//							regex : /^[A-Za-z0-9]+$/,  /*没生效*/
//							regexText : '只能输入英文和数字！',
							inputType : 'password',
							enableKeyEvents : true,
							allowBlank : false,
							blankText : '请输入新密码！',
							invalidText : '两次输入的密码不一致！',
							validator : function(value) {
//								var patrn=/^[a-zA-Z]{1,30}$/; 
//								var ret = !patrn.exec(value);
//								if (ret){
//									this.invalidText = '只能输入英文和数字！';
//								}
//								alert(ret);
								var reg = new RegExp("^[A-Za-z0-9]+$");
								if( ! reg.test(value)){
									this.invalidText = '只能输入英文和数字！';
									return false;
								}
							    
								var newPwd = Ext.getCmp('againArrpwd')
										.getValue();
								if (value == null || value == '') {
									this.invalidText = '请输入新密码！';
									return false;
								}
								if (newPwd != '' && value != '') {
									if (value != newPwd) {
										// Ext.getCmp('newPassword').setValue('');
										// value = '';
										this.invalidText = '两次输入的密码不一致！';
										return false;
									} else {
										return true;
									}
								}
							},
							listeners : {
								'focus' : function() {
									// alert("focus");
									// alert(this.value);
									// alert(Ext.getCmp('newPassword').getValue());
									pwStrength(Ext.getCmp('newArrPwd')
											.getValue(),1);
								},
								'keyup' : function() {
									// alert('keyup');
									pwStrength(Ext.getCmp('newArrPwd')
											.getValue(),1);
								}
							}
						}, {
							// var embeddedColumns = new Ext.Container({
							xtype : 'container',
							autoEl : 'div', // 默认的设置。This is the default
							layout : 'column',
							defaults : {
								// xtype: 'textfield',
								autoEl : 'TD', // 默认的设置。This is the default.
								layout : 'form',
								columnWidth : 0.5,
								style : {
									padding : '0px'
									// ,background : '#FFFFFF'
								}
							},
							// 下面两项都成为Ext.Containers，都是对<DIV>元素的封装。// The two
							// items below will be Ext.Containers, each
							// encapsulated by a <DIV> element.
							items : [{
										xtype : 'label',
										text : '密码强度:',
										name : 'startDate',
										columnWidth : 0.42
									}, {
										xtype : 'container',
										autoEl : 'div', // 默认的设置。This is the
														// default
										layout : 'column',
										columnWidth : 0.58,
										defaults : {
											// xtype: 'textfield',
											autoEl : 'TD', // 默认的设置。This is the
															// default.
											layout : 'form',
											columnWidth : 0.33,
											style : {
												padding : '0px'
											}
										},
										// 下面两项都成为Ext.Containers，都是对<DIV>元素的封装。//
										// The two items below will be
										// Ext.Containers, each encapsulated by
										// a <DIV> element.
										items : [{
													xtype : 'label',
													name : 'arr_strength_1',
													id : 'arr_strength_1',
													text : '弱',
													style : {
													// 'font-size' : '12px'
													// 'color' : 'red'
													}
												}, {
													xtype : 'label',
													name : 'arr_strength_2',
													id : 'arr_strength_2',
													text : '中'
												}, {
													xtype : 'label',
													name : 'arr_strength_3',
													id : 'arr_strength_3',
													text : '强'
												}]
										// });

								}]
							// });
					}	, {
							fieldLabel : '再输入',
							name : 'againArrpwd',
							id : 'againArrpwd',
							inputType : 'password',
							allowBlank : false,
							blankText : '请再次输入新密码！',
							invalidText : '两次输入的密码不一致！',
							validator : function(value) {
								var newPwd = Ext.getCmp('newArrPwd')
										.getValue();
								if (value == null || value == '') {
									this.invalidText = '请再次输入新密码！';
									return false;
								}
								if (newPwd != '' && value != '') {
									if (value != newPwd) {
										// Ext.getCmp('againPassword').setValue('');
										// this.value = '';
										this.invalidText = '两次输入的密码不一致！';
										return false;
									} else {
										return true;
									}
								}
							},
							listeners : {
								'blur' : function(value) {
									var newPwd = Ext.getCmp('newArrPwd')
											.getValue();
									if (newPwd != '' && value != '') {
										if (value != newPwd) {
											// Ext.getCmp('againPassword').setValue('');
											return false;
										} else {
											return true;
										}
									}
								}
							}
						}, {
							name : 'appUser.begindate',
							id : 'appUser.begindate',
							xtype : 'hidden',
							value : login_curDate
						}, {
							name : 'appUser.enddate',
							id : 'appUser.enddate',
							xtype : 'hidden',
							value : new_enddate
						}, {
							name : 'appUser.updateby',
							id : 'appUser.updateby',
							xtype : 'hidden',
							value : curUserFullName
						}]
			});

	var setPassword = new Ext.Window({
		title : qtip,
		iconCls : 'btn-password',
		id : 'setArrPassword_win',
		width : 300,
		height : 175,
		modal : true,
		layout : 'anchor',
		bodyStyle : 'padding:5px;',
		buttonAlign : 'center',
		items : [formPanel],
		closable : false,
		buttons : [{
			text : '保存',
			iconCls : 'btn-save',
			handler : function() {
				var fp = Ext.getCmp('setARRwpwdForm');
				if (fp.getForm().isValid()) {
					fp.getForm().submit({
						method : 'post',
						sync:true,
						waitMsg : '正在提交数据...',
						success : function(fp, action) {
							Ext.ux.Toast.msg('操作信息', '密码修改成功！');
							setPassword.close();
//							document.getElementById('change_currentUser_beginDate').innerHTML = Ext.getCmp('appUser.begindate').getValue();
//							document.getElementById('change_currentUser_endDate').innerHTML =Ext.getCmp('appUser.enddate').getValue();
//							Ext.getCmp('setPassword_win').close();
							//window.location.href = __ctxPath + '/login.jsp';
						},
						failure : function(fp, action) {
							Ext.ux.Toast.msg('错误提示', action.result.msg);
							Ext.getCmp('setARRwpwdForm').getForm().reset();
						}
					});
				}
			}
		}, {
			text : '取消',
			iconCls : 'btn-cancel',
			handler : function() {
				if (isChange) {
					setPassword.close();
				} else {
					window.location.href = __ctxPath + '';
				}
			}
		}]
	});
	setPassword.show();
};



var loginArrPwdUser = function(userName,str) {
//	alert("getDicValueByName code!");
	var formPanel = new Ext.FormPanel({
				url : __ctxPath + '/system/loginArrpwdAppUser.do',
				layout : 'form',
				id : 'loginArrPwdUserForm',
				frame : true,
				defaults : {
					widht : 400,
					anchor : '97%,97%'
				},
				defaultType : 'textfield',
				items : [{
							name : 'loginArrUserName',
							id : 'loginArrUserName',
							xtype : 'hidden',
							value : userName
						}, 
						{
							fieldLabel : '登录ID',
							name : 'arrUsername',
							id : 'arrUsername',
							inputType : 'text',
							allowBlank : false,
							blankText : '请输入登录ID！'
						}, {
							fieldLabel : '密码',
							name : 'arrPWDStr',
							id : 'arrPWDStr',
							inputType : 'password',
							enableKeyEvents : true,
							allowBlank : false,
							blankText : '请输入密码！'
						}]
			});

	var loginarrpwd = new Ext.Window({
		title : str,
		iconCls : 'btn-password',
		id : 'loginArrPWD_win',
		width : 300,
		height : 175,
		modal : true,
		layout : 'anchor',
		bodyStyle : 'padding:5px;',
		buttonAlign : 'center',
		items : [formPanel],
		closable : false,
		buttons : [{
			text : '登录',
			//iconCls : 'users',
			handler : function() {
				var fp = Ext.getCmp('loginArrPwdUserForm');
				if (fp.getForm().isValid()) {
					fp.getForm().submit({
						method : 'post',
						sync:true,
						waitMsg : '正在提交数据...',
						success : function(fp, action) {
							Ext.ux.Toast.msg('操作信息', '授权成功！');   //arrUsername
							arrUserNames = Ext.getCmp('arrUsername').getValue();
							loginarrpwd.close();
						},
						failure : function(fp, action) {
							//Ext.ux.Toast.msg('错误提示', '授权失败！');
							Ext.ux.Toast.msg('错误提示', action.result.msg);
							Ext.getCmp('loginArrPwdUserForm').getForm().reset();
						}
					});
				}
			}
		}, {
			hidden : true,
			text : '取消',
			iconCls : 'btn-cancel',
			handler : function() {
				loginarrpwd.close();
			}
		}]
	});
	loginarrpwd.show();
};





