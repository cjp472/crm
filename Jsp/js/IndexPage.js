
//此函数将设置弹屏后 视频控件展开
function showVideo(){
	//Ext.getCmp("callinfo").collapse();expand
	//Ext.getCmp("video_ocx").expand(true);
}

var IndexPage = Ext.extend(Ext.Viewport, {
	/**
	 * 头部导航
	 */
	 id : 'alltitle',
	 
	 top : new Ext.Panel({
	 region : 'north',
	 id : '__nortPanel',
	 contentEl : 'app-header',
	 height : 70,
	 bodyStyle:'height:70px;',
	 width : window.screen.width,
	 border : false
	 }),
	/**
	 * 中间内容部分
	 */
	center : null,
	/**
	 * 东部视频Panel
	 */
	
//	east : new Ext.Panel({
//						title:"来电客户信息",
//						region:"east",
//						width:330,
//						id : 'callinfo',
//						iconCls : 'menu-navigation',
//						collapsible:true,
//						collapsed : true,
//						items:[{
//							title : '来电信息',
//							collapsible : true,
//							collapsed : false,
//							border : false,
//							// layout : 'fit',
//							height : 133,
//							items : [{
//								border : false,
//								layout : 'form',
//								labelWidth : 55,
//								items : [{
//									layout : 'form',
//									labelAlign : 'right',
//									border : false,
//									items : [{
//												xtype : 'displayfield',
//												fieldLabel : '设备号',
//												id : '',
//												style : 'padding-top:1px',
//												value : ''
//											}, {
//												xtype : 'displayfield',
//												fieldLabel : '所属机构',
//												style : 'padding-top:1px',
//												id : '',
//												value : ''
//											}, {
//												xtype : 'displayfield',
//												fieldLabel : '来电时间',
//												style : 'padding-top:1px',
//												id : '',
//												value : ''
//		
//											}, {
//												xtype : 'button',
//												fieldLabel : '<font style="color:red">谨慎操作</font>',
//												style : 'padding-top:1px',
//												text : '客户端返回首页',
//												handler : function() {
//													var win = new Ext.Window({
//														width : 500,
//														title : '友情提示',
//														height : 200,
//														html : '<font style="font-size:28px;color:red"><br>&nbsp;&nbsp;&nbsp;&nbsp是否确定终止当前业务并让客户端返回首页?</font>',
//														modal : true,
//														buttonAlign : 'center',
//														buttons : [{
//															text : '<font style="font-size:16px;margin-top:0px">确定</font>',
//															width : 60,
//															height : 30,
//															handler : function() {
//																myocx.AgentSendMessage(1, 1,"backToindex");//
//																win.close();
//															}
//														}, {
//															text : '<font style="font-size:16px;margin-top:0px">放弃</font>',
//															width : 60,
//															height : 30,
//															handler : function() {
//																win.close();
//															}
//														}]
//													});
//													win.show();
//												}
//											}]
//									}]
//							}]
//						}, {
//							title : '视频',
//							collapsible : true,
//							collapsed : false,
//							border : false,
//							items : [{
//									border : false,
//									id : 'video_ocx',
//									xtype : 'displayfield',
//									html : varvideoocx
//								}]
//						},{
//							title : '提示信息',
//							collapsible : true,
//							collapsed : false,
//							border : false,
//							items : [{
//								border : false,
//								layout : 'form',
//								labelWidth : 55,
//								items : [{
//										layout : 'form',
//										labelAlign : 'right',
//										border : false,
//										items : [{
//												xtype : 'displayfield',
//												fieldLabel : '点击按钮提示',
//												id : 'butInfo',
//												value : ''
//												}]
//											}]
//									}]
//							}]
//					}),
	
	/**
	 * 西部菜单导航Panel
	 */
	west : new Ext.Panel({
				region : 'west',
				split : true,
				width : 240,
				border : false,
				autoScroll:false,
				id : 'westPanel',
				frame : false,
				layout : 'border',
				collapsible : true,
				collapsed : false,
//				iconCls : 'menu-navigation frameLeftLeft',
				iconCls : 'menu-navigation',
				title : '导航',
				items : [
//					{
//							region : 'west',
//							width : 9,
//							autoScroll:false,
//							iconCls : 'frameLeftLeft',
//							bodyStyle : 'background:transparent',
//							border : false,
//							frame : false,
//							html:''
//							//html : '<img src="' + __ctxPath
//							//		+ '/images/logo-left.png">'
//						}, 
						{
							region : 'center',
							id : 'west-panel',
							autoScroll : true,
							layout : 'accordion',
							autoScroll : true
							/*
							 * 导航刷新
							 */
//							 tools : [{
//							 id : 'refresh',
//							 handler : function() {
//							 if (curUserInfo.username == 'admin') {
//							 loadWestMenu('true');
//							 } else {
//							 Ext.ux.Toast.msg('操作提示',
//							 '仅对开发用户开放刷新菜单功能!');
//							 }
//							 }
//							 }]
						},
						{
							region : 'south',
							autoScroll : true,
							autoScroll:false,
							height : 180,
//							bodyStyle : 'margin-left:9px',
							html : '<div id="header-nav"></div>'
						}]
			}),
	/**
	 * 南部导航
	 */
	north : new Ext.Toolbar({
		border : false,
		id : 'south_div_top',
		region : 'north',
//		bodyStyle : 'background-image: url(' + __ctxPath
//				+ '/images/inline.png)',
		height : 28,
	//	style : 'background:url(' + __ctxPath+'/images/top_c_bg.png) repeat-x;',
		//contentEl : 'app-header',
		//unStyle : true,
		border : false,
		items : [{
					text : '',
					iconCls : 'btn-appClose',
					tooltip : '注销',
					handler : function() {
						logoutWindow("注销系统操作记录");
//						Ext.Msg.confirm('系统提示', '您确认要退出系统？', function(btn) {
//									if (btn == 'yes') {
//										systemOutTime = new Date().format("hhmmss");
//										jsLog(logStrMsg("登出系统时间是：" + systemOutTime,"INFO"));
//										App.Logout();
//										
//									}
//								});

					}
				}, '-', {
					text : '',
					pressed : false,
					iconCls : 'skin',
					tooltip : '换肤',
					xtype:'button',
					menu : new Ext.menu.Menu({
						id : 'skinMenu',
//						html : '<div class="cursorhand" style="height:20px;line-height:20px" onblur="javascript:{this.style.backgroundColor=\'#fff\';}" onfucs="javascript:{this.style.backgroundColor=\'red\';}" onclick="setSkin(\'ext-all\')">缺省浅蓝</div>'
//								+ '<div class="cursorhand" style="height:20px;line-height:20px" onblur="javascript:{this.style.backgroundColor=\'#fff\';}" onfucs="javascript:{this.style.backgroundColor=\'red\';}" onclick="setSkin(\'ext-all-css04\')">灰白主题</div>'
//								+ '<div class="cursorhand" style="height:20px;line-height:20px" onblur="javascript:{this.style.backgroundColor=\'#fff\';}" onfucs="javascript:{this.style.backgroundColor=\'red\';}" onclick="setSkin(\'xtheme-tp\')">灰色主题</div>'
//								+ '<div class="cursorhand" style="height:20px;line-height:20px" onblur="javascript:{this.style.backgroundColor=\'#fff\';}" onfucs="javascript:{this.style.backgroundColor=\'red\';}" onclick="setSkin(\'xtheme-default2\')">灰蓝主题</div>'
						items:[{
							border:false,
							html : '<div class="cursorhand" style="height:20px;line-height:20px;background :transparent none repeat scroll 0% 0% ;" onclick="setSkin(\'ext-all\')">缺省浅蓝</div>'
						},{
							border:false,
							html : '<div class="cursorhand" style="height:20px;line-height:20px;background :transparent none repeat scroll 0% 0% ;" onclick="setSkin(\'ext-all-css04\')">灰白主题</div>'
						},{
							border:false,
							html : '<div class="cursorhand" style="height:20px;line-height:20px;background :transparent none repeat scroll 0% 0% ;" onclick="setSkin(\'xtheme-tp\')">灰色主题</div>'
						},{
							border:false,
							html : '<div class="cursorhand" style="height:20px;line-height:20px;background :transparent none repeat scroll 0% 0% ;" onclick="setSkin(\'xtheme-default2\')">灰蓝主题</div>'
						}]
					})
				}, '-', {
					// text : '',
					// iconCls : 'btn-logout',
					// handler : function() {
					// App.Logout();
					// }
					// },'-',{
					text : '',
					iconCls : 'btn-onlineUser',
					tooltip : '在线用户',
					handler : function() {
						OnlineUserSelector.getView().show();
					}
				}, '-', {
					text : '',
					iconCls : 'btn-expand',
					tooltip : '窗口切换',
					handler : function() {
						var panel = Ext.getCmp("__nortPanel");
						if (panel.collapsed) {
							panel.expand(true);
							// document.getElementById('soft_div_tit').style.top
							// = '0px';
						} else {
							// document.getElementById('soft_div_tit').style.top
							// = '-70px';
							panel.collapse(true);
						}
					}
				}, '-', {
					pressed : false,
					text : '',
					iconCls : 'tipsTile',
					tooltip : '便签',
					handler : function() {
						App.clickTopTab('PersonalTipsView');
					}
					// },'-', {
				// pressed : false,
				// text : '',
				// iconCls:'callme',
				// handler:function(){
				// Ext.ux.Toast.msg("联系我们","电话：020-62652355<br/>网址：http://www.ulane.cn");
				// }
				// },'-',{
				// xtype:'combo',
				// mode : 'local',
				// editable : false,
				// value:'切换皮肤',
				// width:100,
				// triggerAction : 'all',
				// store
				// :[['ext-all','缺省浅蓝'],['ext-all-css04','灰白主题'],['ext-all-css05','绿色主题'],['ext-all-css03','粉红主题'],['xtheme-tp','灰色主题'],['xtheme-default2','灰蓝主题'],['xtheme-default16','绿色主题'],['xtheme-access','Access风格']],
				// listeners:{
				// scope: this,
				// 'select':function(combo,record, index){
				// if(combo.value!=''){
				// var expires = new Date();
				// expires.setDate(expires.getDate() + 300);
				// setCookie("theme",combo.value,expires, __ctxPath);
				// Ext.util.CSS.swapStyleSheet("theme", __ctxPath +
				// "/ext3/resources/css/" + combo.value + ".css");
				// }
				// }
				// }
			}	, {
					id : 'messageTip',
					xtype : 'button',
					hidden : true,
					width : 50,
					height : 20,
					handler : function() {
						var megBtn = Ext.getCmp('messageTip');
						var megWin = Ext.getCmp('win');
						if (megWin == null) {
							new MessageWin().show();
						}
						megBtn.hide();
					}
				}, {
					xtype : 'panel',
					id : 'marqueenInfo',
					width : window.screen.width-510,
					bodyStyle : 'background:none;',
					border : false,
					height : 23,
					style : 'margin-left:90px;',
					html : '<div  id="tipCenter" style="width:'+(window.screen.width-510)+'px;" >' +
							'<img style="margin-top:0px;float:left;" src="images/account_sound.png" />' +
							'<div class="textInde" >新闻公告:</div>'
							+ '<div class="margenInde" style="width:'+(window.screen.width-788)+'px;" >' +
							'<MARQUEE onmouseover=this.stop() onmouseout=this.start() direction="left" scrollAmount=3 scrollDelay=150 class="cursorhand" style="color:red" id="marquee" ></MARQUEE></div>'
							+ '<div class="textInde" >&nbsp;&nbsp;来电区域:<label id="callAddressInfo"></label></div>'+'</div><input type="hidden" id="marquee_hidden" />'

				}, '->', {
					id : 'searchContent',
					xtype : 'textfield',
					width : 120,
					height : 22
				}, {
					id : 'searchType',
					width : 60,
					xtype : 'combo',
					mode : 'local',
					editable : false,
					triggerAction : 'all',
					store : [['news', '新闻'], ['mail', '邮件'], ['notice', '公告'],
							 ['document', '文档'],
							['know', '知识']],
					value : 'news'
				}, {
					xtype : 'button',
					text : '搜索',
					width : 40,
					iconCls : 'search',
					handler : function() {
						var searchContent = Ext.getCmp('searchContent')
								.getValue();
						var searchType = Ext.getCmp('searchType').value;
						if (searchType == 'news') {
							App.clickTopTab('SearchNews', searchContent,
									function() {
										AppUtil.removeTab('SearchNews');
									});
						} else if (searchType == 'mail') {
							App.clickTopTab('SearchMail', searchContent,
									function() {
										AppUtil.removeTab('SearchMail');
									});
						} else if (searchType == 'notice') {
							App.clickTopTab('SearchNotice', searchContent,
									function() {
										AppUtil.removeTab('SearchNotice');
									});
						} else if (searchType == 'know') {
							App.clickTopTab('UkSysKnowView', {Q_search_S_LK:searchContent},
									function() {
										AppUtil.removeTab('UkSysKnowView');
									});
						} else if (searchType == 'document') {
							App.clickTopTab('SearchDocument', searchContent,
									function() {
										AppUtil.removeTab('SearchDocument');
									});
						}
					}
				}, new Ext.Panel({
							id : 'SearchForm',
							layout : 'hbox',
							width : 10,
							border : false,
							bodyStyle : 'background-color: transparent;',
							items : []
						})]
	}),

	
	south :new Ext.Panel({
				region : 'south',
				split : true,
				width : 240,
				height : 20,
				border : false,
				id : 'south_div',
				frame : false,
				layout : 'border',
				iconCls : 'menu-navigation',
				items : [{
							region : 'center',
							autoScroll : true,
							autoScroll:false,
							height : 20,
							width : '900',
							//style : 'margin-left:29px',
							//bodyStyle : 'margin-left:9px',
							html : '<div  id="tipCenter" style="width:'+(window.screen.width-510)+'px;margin-left:300px" >' +
//							'<img style="margin-top:0px;float:left;" src="images/account_sound.png" />' +
							'<div class="textInde" >考核指标:</div>'
							+ '<div class="margenInde" style="width:'+(window.screen.width-588)+'px;" >' +
							//'<MARQUEE onmouseover=this.stop() onmouseout=this.start() direction="left" scrollAmount=3 scrollDelay=150 class="cursorhand" style="color:red" id="marquees" ></MARQUEE>' 
							'<label style="margin-left:10px;margin-top:-8px;color:red">离开时间：</label>' +
							'<input type="text" style="margin-top:-5px;width:70px" id="leaveTime" value="0 : 0 : 0" readonly/>'+
							'<label style="margin-left:10px;margin-top:-8px;color:red">登录时间：</label>' +
							'<input type="text" style="margin-top:-5px;width:70px" id="loginTime" value="0 : 0 : 0" readonly/>'+
							'<label style="margin-left:10px;margin-top:-8px;color:red">跟进时间：</label>' +
							'<input type="text" style="margin-top:-5px;width:70px" id="GJTime" value="0 : 0 : 0" readonly/>'+
							'<label style="margin-left:10px;margin-top:-8px;color:red">处理电话个数：</label>' +
							'<input type="text" style="margin-top:-5px;width:20px" id="callNum" value="0" readonly/>'
							+'</div>'
							+'</div><input type="hidden" id="marquee_hidden" />'
						}]
		
	}),
	
	
	
	
	
	
	
	/**
	 * 构造函数
	 */
	constructor : function() {
		this.center = new Ext.TabPanel({
					id : 'centerTabPanel',
					region : 'center',
					deferredRender : true,
					forceLayout : true,
					//hidden : true, 
					//bodyStyle:'margin-top:-20px;',
					enableTabScroll : true,
					activeTab : 0, // first tab initially active,
					defaults : {
						autoScroll : true,
						closable : true
					},
					items : [],
					plugins : new Ext.ux.TabCloseMenu(),
					listeners : {
						'add' : function(tabPanel, comp, index) {

							if (tabPanel.items.length > 8) {
								tabPanel.remove(tabPanel.items.get(0));
								tabPanel.doLayout();
							}
						}
					}
				});
		this.cenerAll = new Ext.Panel({
					border : false,
					id : 'center_div',
					region : 'center',
					layout : "border",
					items : [this.west,this.center,this.north]
				});
		IndexPage.superclass.constructor.call(this, {
					border : false,
					layout : "border", // 指定布局为border布局
					items : [this.top,this.cenerAll
					// this.east
					]
				});
		// Ext.getCmp('south_div_top').setPosition(0,70);
		// 加上首页的导航菜单
		var activeTab = getCookie('_topNavId');
		// if(activeTab==null || activeTab==undefined) activeTab=0;
		/*
		 * this.navTab=new Ext.TabPanel({ width:620, id:'appNavTabPanel',
		 * deferredRender : true, enableTabScroll : true, activeTab:activeTab,
		 * frame:false, border:false, plain:true, height:0, renderTo:
		 * 'header-nav', tabMargin:20, defaults : { autoScroll : false, closable :
		 * false, bodyStyle : 'padding-bottom: 12px;' }, listeners:{ scope:this,
		 * 'tabchange':function(tabPanel, tab){ var expires = new Date();
		 * expires.setDate(expires.getDate() + 300);
		 * setCookie("_topNavId",tab.getId(),expires, __ctxPath); //切换左菜单
		 * loadWestMenu(); } }, items : [] });
		 */
		var html = [];
		for (var i = 0; i < curUserInfo.topModules.length; i++) {
			html
					.push('<div style="float:left;margin-top:10px;padding-left:5px;width:50px;">'
							+ '<div style="text-align:center;cursor:pointer" onclick="setCookieIndex(\''
							+ curUserInfo.topModules[i].id
							+ '\','
							+ i
							+ ')"><img src="'
							+ __ctxPath
							+ '/images/'
							+ curUserInfo.topModules[i].iconCls
							+ '.png"/></div>'
							+ '<div style="margin-top:4px;margin-bottom:5px;font-size:10px;font-familiy:宋体;text-align:center">'
							+ curUserInfo.topModules[i].title
							+ '</div>'
							+ '</div>');
			// html.push('<div onclick="" style="float:left;cursor:pointer"
			// class="'+curUserInfo.topModules[i].iconCls+'">'+curUserInfo.topModules[i].title+'</div>');
		}
		Ext.get('header-nav').dom.innerHTML = html.join('');
		// 设置日历、声音提示、首页
		this.afterPropertySet();
		// 加载菜单
		// loadWestMenu();
	},
	/**
	 * 设置日历、声音提示、首页
	 */
	afterPropertySet : function() {
		var centerPanel = this.center;
		// 显示信息条数按钮
		var addBtn = function(count) {
			var megBtn = Ext.getCmp('messageTip');
			var megWin = Ext.getCmp('win');
			var reMegWin = Ext.getCmp('wind');
			if (count > 0 && megWin == null && reMegWin == null) {
				// megBtn.setText('<div style="height:25px;"><img src="' +
				// __ctxPath + '/images/newpm.gif"
				// style="height:12px;"/>你有<strong style="color: red;">' + count
				// + '</strong>信息</div>');
				// megBtn.show();
				new MessageWin().show();
			} else {
				megBtn.hide();
			}
		};

		var addBtnFunction = function() {
			Ext.Ajax.request({
						url : __ctxPath + '/info/countInMessage.do',
						method : 'POST',
						success : function(response, options) {
							var result = Ext.util.JSON
									.decode(response.responseText);
							count = result.count;
							addBtn(count);
							setTimeout(addBtnFunction, 1000 * 60); // 设60秒响应一次
						},
						failure : function(response, options) {
						},
						scope : this
					});
		};

		// var navTab=this.navTab;
		// navTab.add(curUserInfo.topModules);
		setTimeout(function() {
					// 激活
					var actTabId = getCookie('_topNavId');
					var tabIndex = getCookie('_tabIndex');
					// 激活上一次点击的Panel
					if (actTabId) {
						// navTab.activate(actTabId);
						setCookieIndex(actTabId, tabIndex);
					} else {
						setCookieIndex(curUserInfo.topModules[0].id, 0);
					}
					/*
					 * if(navTab.getActiveTab()==null){ //激活第一个
					 * navTab.activate(navTab.items.get(0)); }
					 */
					// 显示当前日历
					addBtnFunction();
				}, 1200);

		Ext.getCmp('SearchForm').render('searchFormDisplay');
	}

});


//----------------
var logoutWindow = function(qtip) {
	var formPanel = new Ext.FormPanel({
				//url : __ctxPath + '/system/resetArrpwdAppUser.do',
				layout : 'form',
				id : 'logoutForm',
				frame : true,
				defaults : {
					widht : 400,
					anchor : '97%,97%'
				},
				//defaultType : 'textfield',
				items : [ {
								fieldLabel : '注销类别',
								anchor : '100%',
								xtype : 'combo',
								mode : 'local',
								lazyInit : false,
								id : 'logout',
								name : 'LG',
								valueField : 'desc',
								hiddenName : 'logoutCode',
								displayField : 'desc',
								triggerAction : 'all',
								store : new Ext.data.SimpleStore({
											fields : ['code','desc'],
											data : [['00', '下班'],
													['01', '故障'],
													['02', '切换'],
													['03', '其他工作']],
											autoLoad : true
										}),
								editable : false,
								value : '',
								listeners : {
									select : function(combobox,record, index) {
										if(index == 3){
											Ext.getCmp('reason').setVisible(true);
										}else{
											Ext.getCmp('reason').setVisible(false);
										}
									}
								}
							}, {
								fieldLabel : '原因',
								xtype : 'textarea',
								id :'reason',
								hidden : true,
								width : 79,
								height : 130,
								value : ''
							}]
			});

	var logout = new Ext.Window({
		title : qtip,
		iconCls : 'btn-password',
		id : 'logout_win',
		width : 300,
		height : 265,
		modal : true,
		layout : 'anchor',
		bodyStyle : 'padding:5px;',
		buttonAlign : 'center',
		items : [formPanel],
		closable : false,
		buttons : [{
			text : '确定',
			iconCls : 'btn-save',
			handler : function() {
				var logout = Ext.getCmp('logout').getValue();
				var reason = Ext.getCmp('reason').getValue();
				if(logout == "其他工作" && reason == ""){
					alert("请填写原因!");
				}else if(logout == ""){
					alert("请选择注销类别");
				}else{
					var rea = Ext.getCmp('reason').getValue();
					//alert(rea);
					errorCloseForm = "false";  //改为正常退出
					systemOutTime = new Date().format("yyyy-MM-dd hh:mm:ss");
					jsLog(logStrMsg("退出系统时间是：" + systemOutTime + "   BS_num = " + BS_num,"INFO"));
					if(curUserInfo_1.username != "admin" && curUserInfo_1.username != "V1000"){
						insertOperationData(BS_num,systemOutTime,"退出系统");
						insertWorkAttendance(BS_num , systemLoginTime , cti_loginTime , systemOutTime ,"正常退出" ,logout,rea);
					}
					App.Logout();
				}
			}
		}, {
			text : '取消',
			iconCls : 'btn-cancel',
			handler : function(){
				logout.close();
			}
		}]
	});
	logout.show();
};
//----------------





// 点击左下图标触发
var setCookieIndex = function(id, index) {
	var expires = new Date();
	expires.setDate(expires.getDate() + 300);
	setCookie("_topNavId", id, expires, __ctxPath);
	setCookie("_tabIndex", index, expires, __ctxPath);
	// 切换左菜单
	loadWestMenu();

}
// 切换皮肤
var setSkin = function(value) {
	Ext.getCmp('skinMenu').hidden;

	var expires = new Date();
	expires.setDate(expires.getDate() + 300);
	setCookie("theme", value, expires, __ctxPath);
	Ext.util.CSS.swapStyleSheet("theme", __ctxPath + "/ext3/resources/css/"
					+ value + ".css");
}
function loadWestMenu(isReload) {
	if (!isReload) {
		isReload = '';
	}
	var westPanel = Ext.getCmp('west-panel');
	// var iconCls=Ext.getCmp('appNavTabPanel').getActiveTab().iconCls;
	var actTabId = getCookie('_topNavId');
	var tabIndex = getCookie('_tabIndex');
	var iconCls;
	if (tabIndex > curUserInfo.topModules.length) {
		if (curUserInfo.topModules.length == 0) {
			iconCls = 'mod-setting';
		} else {
			iconCls = curUserInfo.topModules[0].iconCls;
		}
	} else {
		iconCls = curUserInfo.topModules[tabIndex].iconCls;
	}
	// var iconCls = curUserInfo.topModules[tabIndex].iconCls;
	// alert(iconCls);
	var topMenuId = iconCls.split('-')[1];
	// alert(topMenuId);
	Ext.Ajax.request({
				url : __ctxPath + '/panelTreeMenu.do?topMenuId=' + topMenuId
						+ '&isReload=' + isReload,
				success : function(response, options) {
					var arr = eval(response.responseText);
					var __activedPanelId = getCookie("__activedPanelId");

					westPanel.removeAll();
					westPanel.doLayout();

					for (var i = 0; i < arr.length; i++) {
						var doc = strToDom(arr[i].subXml);
						var root = doc.documentElement || doc;
						var panel = new Ext.tree.TreePanel({
									id : arr[i].id,
									title : arr[i].text,
									iconCls : arr[i].iconCls,
									layout : 'fit',
									animate : true,
									border : false,
									autoScroll : true,
									loader : new htsoft.ux.TreeXmlLoader({
												preloadChildren : true
											}),
									root : new Ext.tree.AsyncTreeNode({
												text : root.tagName,
												xmlNode : root
											}),
									listeners : {
										'click' : App.clickNode
									},
									rootVisible : false
								});
						westPanel.add(panel);
						panel.on('expand', function(p) {
									// 记住上次点激的panel
									var expires = new Date();
									expires.setDate(expires.getDate() + 30);
									setCookie("__activedPanelId", p.id,
											expires, __ctxPath);
								});
						// 激活上次点击的panel
						if (arr[i].id == __activedPanelId) {
							westPanel.layout.activeItem = panel;
						}
					}
					westPanel.doLayout();
				}
			});
}// end of the loadWestMenu function

// the right content of indexPage
// 点击右侧快捷键
var currentRightTab = -1;

// 点击一个右侧页签
var clickRightTab = function(tabId, param) {
	
	var width = Ext.getBody().getViewSize().width;
	var height = Ext.getBody().getViewSize().height;
	var displayFlag = Ext.get('floatParentDiv').dom.style.display == 'none'
			? true
			: false;
	if (tabId == currentRightTab && !displayFlag) {
		Ext.get('floatParentDiv').dom.style.display = 'none';
		Ext.get('rightTab' + tabId).removeClass('RightTabSelected');
	} else {
		if (currentRightTab != -1) {
			Ext.get('rightTabContent' + currentRightTab).dom.style.display = 'none';
			Ext.get('rightTab' + currentRightTab)
					.removeClass('RightTabSelected');
		}
		currentRightTab = tabId;
		Ext.get('floatParentDiv').dom.style.top = '70px';
		Ext.get('floatDiv').dom.style.height = (parseInt(height) - 102 - 46)
				+ 'px';
		if (param) {
			Ext.get('floatDiv').dom.style.width = (parseInt(width) - 31 - 245)
					+ 'px';
		} else {
			Ext.get('floatDiv').dom.style.width = '210px';
		}
		Ext.get('rightTabContent' + currentRightTab).dom.style.display = 'block';
		Ext.get('rightTab' + currentRightTab).addClass('RightTabSelected');
		Ext.get('floatParentDiv').dom.style.display = 'block';
	}
}

// 获取右侧功能菜单对应的内容
var getRightContent = function(tab, param) {
	// $('rightTabContent'+tab).innerHTML +=tab;
	if (tab == 0) {
		// getTask();
	} else if (tab == 1) {
	} else if (tab == 2) {
	} else if (tab == 3) {
	}
}
function showIndexWindow(input) {
	if (Ext.get('marquee_hidden').dom.innerHTML != '') {
		PaoMaDengMessageIndexForm.getView().show();
	}
}
var PaoMaDengMessageIndexForm = {
	getView : function(callback, isSingle) {
		this.initUIComponents();
		var win = new Ext.Window({
					id : 'paomadengMessageForm',
					flex : 1,
					title : '新消息',
					layout : 'fit',
					modal : true,
					width : 400,
					height : 220,
					autoScroll : true,
					border : false,
					items : [this.formPanel]
				});
		return win;
	},
	initUIComponents : function() {
		this.formPanel = new Ext.FormPanel({
			id : 'mFormPanel_index',
			frame : false,
			border : false,
			layout : 'form',
			plain : true,
			buttonAlign : 'center',
			items : [{
						xtype : 'hidden',
						name : 'IndexPage.messageId',
						id : 'IndexPage.messageId',
						value : Ext.get('marquee_hidden').dom.innerHTML
					}, {
						xtype : 'fieldset',
						border : false,
						style : 'padding:0px',
						layout : 'column',
						height : 140,
						items : [{
									id : 'sendContent',
									xtype : 'textarea',
									name : 'content',
									width : 350,
									height : 120,
									value : Ext.get('marquee').dom.innerHTML,
									autoScroll : true,
									readOnly : true
								}]
					}],
			buttons : [{
				text : '查看',
				iconCls : 'btn-readdocument',
				scope : this,
				handler : function() {
					var msgId = Ext.getCmp('IndexPage.messageId').getValue();
					if (msgId != null && msgId != '') {
						Ext.Ajax.request({
									url : __ctxPath
											+ '/info/readUserFlagInMessage.do',
									params : {
										messageId : msgId
									},
									method : 'GET',
									success : function(response, options) {
										var result = Ext.util.JSON
												.decode(response.responseText).result;
										var formName = result[0].messageForm;
										var formId = result[0].formId;
										App.MyDesktopClickTopTab(formName,
												formId);
										this.close();
									},
									failure : function(response, options) {
										Ext.ux.Toast.msg('操作信息', '操作异常！');
									},
									scope : this
								});
					} else {
						this.close();
					}
				}
			}, {
				text : '关闭',
				iconCls : 'btn-cancel',
				scope : this,
				handler : this.close
			}]
		});

	},// end of initUIComponents
	send : function() {
		var message = Ext.getCmp('mFormPanel_index');
		if (message.getForm().isValid()) {
			message.getForm().submit({
						waitMsg : '正在 发送信息',
						success : function(message, o) {
							var grid = Ext.getCmp('ReceiveMessage');
							if (grid) {
								grid.getStore().reload();
							}
							var messagewidow = Ext
									.getCmp('paomadengMessageForm');

							messagewidow.close();
							var message = Ext.getCmp('mFormPanel_index');
							Ext.ux.Toast.msg('操作信息', '信息发送成功！');

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
	reset : function() {
		var message = Ext.getCmp('mFormPanel_index');
		message.getForm().reset();
	}
};
function ShowPaoMaDengMessageIndex(){
	/**
	 *   添加滚动跑马灯显示信息
	 */
	var to_getInfos = function to_getInfo() {
//		Ext.Ajax.request( {
//					url : __ctxPath + '/info/listShortMessage.do',
//					method : 'POST',
//					success : function(response, options) {
//						var responseArray = Ext.util.JSON.decode(response.responseText);
//						var doc =  document.getElementById('marquee');
////						alert(responseArray.totalCounts);
//						var str = '';
//						
////						'<span style="margin-left:20px;" id="" title= >内容</span>'
//						if (responseArray.result != null&& responseArray.result != "") {
////							doc.innerHTML = responseArray.result[0].shortMessage.messageId;
////							doc.innerHTML = responseArray.result[0].shortMessage.content;
//							for(var i = 0; i < responseArray.totalCounts; i++){
//								var idType = responseArray.result[i].shortMessage.messageId;
//								var messageForm = responseArray.result[i].messageForm;
//								var formId = responseArray.result[i].formId;
//								var msgType = responseArray.result[i].shortMessage.msgType;
//								var typeStr = '';
//								if(msgType == '6'){
//									typeStr = '【新闻】';
//								}
//								if(msgType == '7'){
//									typeStr = '【公告】';
//								}
//								str += '<a style="margin-left:20px; text-decoration:none;" id="'+idType+'" href="#" onclick="App.MyDesktopClickTopTab(\''+messageForm+'\',{id:'+formId+',idType:'+idType+'})">'+typeStr+responseArray.result[i].shortMessage.content+'</a>';
//							}
//							doc.innerHTML = str;
//						} else {
////							doc.innerHTML = '';
//							doc.innerHTML = '';
//						}
//					},
//					failure : function(response, options) {
//
//					}
//				});
	}

	setInterval(to_getInfos, 10000);
};