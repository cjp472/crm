Ext.ns("App");

//首页PORTAL元素
var PortalItem=function(panelId,column,row){
   this.panelId=panelId;
   this.column=column;
   this.row=row;
};
//栏目PROTAL元素
var SectionItem = function(sectionId,colNumber,rowNumber){
	this.sectionId=sectionId;
	this.colNumber=colNumber;
	this.rowNumber=rowNumber;
};
//用户信息
var UserInfo=function(user){
	this.userId=user.userId;
	this.username=user.username;
	this.buLu=user.buLu;   //2014/06/18核查补录获取当前座席的补录权限 索引  0：不可补录 ， 1：可补录
	this.fullname=user.fullname;
	this.depId=user.depId;
	this.depName=user.depName;
	this.rights=user.rights;
	this.portalConfig=user.items;
	this.topModules=user.topModules;
	this.begindate = user.begindate;
	this.enddate = user.enddate;
	this.interval = user.interval;
};
//系统配置
var SysConfig=function(sysConfigs){
	this.dynamicPwd=sysConfigs.dynamicPwd;
};

//当前登录用户
var curUserInfo=null;
//取得当前系统配置
var sysConfigInfo=null

//检查当前用户有权访问funKey对应的功能
function isGranted(funKey){
	if(curUserInfo.rights.indexOf('__ALL')!=-1){
		return true;
	}
	if(curUserInfo.rights.indexOf(funKey)!=-1){
		return true;
	}
	return false;
}

App.init = function() {
	Ext.QuickTips.init();//这句为表单验证必需的代码
	Ext.BLANK_IMAGE_URL=__ctxPath+'/ext3/resources/images/default/s.gif';
	setTimeout(function() {
		        document.getElementById('loading').style.top = "-2000px";
		         document.getElementById('loading-mask').style.top = "-2000px";
				//Ext.get('loading').remove();
				//Ext.get('loading-mask').fadeOut({remove:true});
				//document.getElementById('app-header').style.display='block';
			}, 200); 
	
	Ext.util.Observable.observeClass(Ext.data.Connection);
	Ext.data.Connection.on('requestcomplete', function(conn, resp,options ){
		if (resp && resp.getResponseHeader){
		    if(resp.getResponseHeader('__timeout')) {
		    	Ext.ux.Toast.msg('操作提示：','操作已经超时，请重新登录!');
	        	window.location.href=__ctxPath+'/index.jsp?randId=' + parseInt(1000*Math.random());
	    	}else if(resp.getResponseHeader('__403_error')){
	    		Ext.ux.Toast.msg('系统访问权限提示：','你目前没有权限访问：{0}',options.url);
	    	}
		}
	});
	Ext.data.Connection.on('requestexception',function(conn,resp,options){
		if (resp && resp.getResponseHeader){
			if(resp.getResponseHeader('__500_error')){
	    		Ext.ux.Toast.msg('后台出错','您访问的URL:{0}出错了，具体原因请联系管理员。',options.url);
	    	}else if(resp.getResponseHeader('__404_error')){
	    		Ext.ux.Toast.msg('后台出错','您访问的URL:{0}对应的页面不存在，具体原因请联系管理员。',options.url);
	    	}
		}
	});

	//userinfo 变量来自index.jsp
	var object=Ext.util.JSON.decode(userInfo);
	//取得当前登录用户的相关信息，包括权限
	var user=object.user;
	var conf=user.items;
	curUserInfo=new UserInfo(user);
	var sysConfigs=object.sysConfigs;
	sysConfigInfo=new SysConfig(sysConfigs);
	//显示主页
	var indexPage=new IndexPage();
	//indexPage.doLayout();
	//显示应用程序首页
	//App.clickTopTab('ComIndexPage');//公司主页
	App.clickTopTab('AppHome');	//个人桌面ow()
	var pan = Ext.getCmp('centerTabPanel');
	pan.setSize ({width:window.screen.width-248, height:document.body.clientHeight-106});
	pan.doLayout();
	ShowPaoMaDengMessageIndex();//调用跑马灯
	//	softSrc<iframe id="softphone_frame" name="softphone_frame" src='<%=softphone_src%>' width="100%" height="70" scrolling="no" frameborder="0" marginheight="0" marginwidth="0" allowtransparency="true"></iframe>
//		setTimeout(document.getElementById('soft_div_tit').innerHTML='<iframe id="softphone_frame" name="softphone_frame" src='+softSrc+' width="100%" height="70" scrolling="no" frameborder="0" marginheight="0" marginwidth="0" allowtransparency="true"></iframe>'
//	,100000);
	setTimeout('App.addApplet()',1500)
	//Ext.getCmp('alltitle').doLayout();
};

App.addApplet = function(){
//	if(isGranted('ComPhone'))
//		//alert(softSrc);
//		document.getElementById('soft_div_tit').innerHTML='<iframe id="softphone_frame" name="softphone_frame" src='+softSrc+' width="100%" height="70" scrolling="no" frameborder="0" marginheight="0" marginwidth="0" allowtransparency="true"></iframe>';
};

/**
 * 
 * @param {} id
 * @param {} callback 回调函数
 */
App.clickTopTab=function(id,params,precall,callback,existcallback){
	if(precall!=null){
		precall.call(this);
	}
	var tabs = Ext.getCmp('centerTabPanel');
	var tabItem = tabs.getItem(id) || tabs.getItem(id + 'Win');
	
	if (tabItem == null) {
		$ImportJs(id, function(view) {
			tabItem = tabs.add(view);
			tabs.activate(tabItem);
		},params);
	}else {
		if(existcallback!=null){
			existcallback.call(this);
		}
		tabs.activate(tabItem);
	}
	if(callback!=null){
			callback.call(this);
		}
};
App.clickTopTabIframe = function(node){
	if (node.id == null || node.id == '' || node.id.indexOf('xnode') != -1) {
		return;
	}
	// alert(node.id);
	var tabs = Ext.getCmp('centerTabPanel');
	var tabItem = tabs.getItem(node.id);
	if (tabItem == null) {
		tabItem = tabs.add( {
			xtype : 'iframepanel',
			title : node.text,
			id : node.id,
			loadMask : {
				msg : '正在加载...,请稍等...'
			},
			iconCls : node.attributes.iconCls,
			defaultSrc : __ctxPath + '/pages/iframe/'+node.attributes.model+'/' + node.id + '.jsp?id='
					+ Math.random(),
			listeners : {
				domready : function(iframe) {
				}
			}
		});
	}
	tabs.activate(tabItem);
};
App.clickTopTabUrl = function(node){
	if (node.id == null || node.id == '' || node.id.indexOf('xnode') != -1) {
		return;
	}
	// alert(node.id);
	var tabs = Ext.getCmp('centerTabPanel');
	var _url = node.attributes.url;
	if(!_url.substring(0,5)=="http:"){
		_url = __ctxPath + _url;
	}
	var tabItem = tabs.getItem(node.id);
	if (tabItem == null) {
		tabItem = tabs.add( {
			xtype : 'iframepanel',
			title : node.text,
			id : node.id,
			loadMask : {
				msg : '正在加载...,请稍等...'
			},
			iconCls : node.attributes.iconCls,
			defaultSrc : _url,
			listeners : {
				domready : function(iframe) {
				}
			}
		});
	}
	tabs.activate(tabItem);
};
/**
 * 菜单启动流程
 * @param {} node
 */
App.clickStartFlow = function(node){
	var contentPanel = App.getContentPanel();
	var startForm = contentPanel.getItem('ProcessRunStart' + node.attributes.defId);

	if (startForm == null) {
		startForm = new ProcessRunStart({
					id : 'ProcessRunStart' + node.attributes.defId,
					defId : node.attributes.defId,
					flowName : node.attributes.flowName
				});
		contentPanel.add(startForm);
	}
	contentPanel.activate(startForm);
};
/**
 * 配置工作流菜单
 * @param {} node
 */
App.clickStartFlowConf = function(node){
	var jsArr=[
	           __ctxPath+'/js/selector/FlowSelector.js'
	            ];
	$ImportSimpleJs(jsArr,null);
	var contentPanel = App.getContentPanel();
	var startForm = contentPanel.getItem('FlowConfView');

	if (startForm == null) {
		startForm = new FlowConfView({
					id : 'FlowConfView',
					mod : node.attributes.mod
				});
		contentPanel.add(startForm);
	}
	contentPanel.activate(startForm);
};
/**
 * liuhuiyong
 * @param {} id
 * @param {} params
 * @param {} precall
 * @param {} callback
 */
App.clickFLowNode=function(node,params){
	var jsArr=[
	           __ctxPath+'/js/flow/ProcessNextForm.js',
	           __ctxPath+'/js/flow/ProcessRunDetail.js',
	           __ctxPath+'/js/flow/ProcessRunStart.js'];
	           
	$ImportSimpleJs(jsArr,null);
	
	var id=node.id.substring(0,node.id.length-2);
	var tabs = Ext.getCmp('centerTabPanel');
	var tabItem = tabs.getItem(id);
	
	if (tabItem == null) {
		$ImportJsf(id, function(view) {
			tabItem = tabs.add(view);
			tabs.activate(tabItem);
		},params,node);
	}else {
		if(callback!=null){
			callback.call(this);
		}
		tabs.activate(tabItem);
	}
};
/**
 * 点击了公文流程的结点
 
App.clickFLowNode = function(node){
	
	var jsArr=[
	           __ctxPath+'/js/archive/ArchivesDetailWin.js',
	           __ctxPath+'/js/archive/ArchHastenForm.js',
	           __ctxPath+'/js/flow/ProcessNextForm.js',
	           __ctxPath+'/js/flow/ProcessRunDetail.js'];
	$ImportSimpleJs(jsArr,null);
	
	var contentPanel = App.getContentPanel();
	//alert(node.id);
	var nodePanel = contentPanel.getItem(node.id);

	if (nodePanel == null) {
		nodePanel = new ArchivesNode({
					id : 'ProcessRunStart' + node.id,
					title : node.attributes.text
				});
		contentPanel.add(nodePanel);
	}
	contentPanel.activate(nodePanel);
};*/
App.clickNode = function(node) {
	if(node.id==null || node.id=='' || node.id.indexOf('xnode')!=-1){
		return ;
	}
	//报表,id带参的情况解析
	var id = node.id;
	var title=node.text;
	if(id.indexOf('?')>0){
		var str=id.split('?');
		var paramsString="";
		if(str.length>0){
			id=str[0];
			var paramsStr=str[1];
			var paramArray=paramsStr.split('&');
			for(i=0;i<paramArray.length;i++){
				var pstr=paramArray[i];
				var parr=pstr.split('=');
				var p=parr[0];
				var v=parr[1];
				paramsString+=p+':\''+v+'\',';
			}
			paramsString+='title:\''+title+'\'';
			paramsString="{"+paramsString+"}";
		}
		if(node.attributes.url){
			App.clickTopTabUrl(node);
		}else if(node.attributes.iframe){
			App.clickTopTabIframe(node);
		}else if(node.attributes.defId){//启动工作流
			App.clickStartFlow(node);
		}else if (node.attributes.flowNode){//启动工作流
			App.clickFLowNode(node,Ext.decode(paramsString));
		}else if (node.attributes.mod){//配置菜单
			App.clickStartFlowConf(node);
		}else{
			App.clickTopTab(id,Ext.decode(paramsString));
		}
		
	}else{
		if(node.attributes.url){
			App.clickTopTabUrl(node);
		}else if(node.attributes.iframe){
			App.clickTopTabIframe(node);
		}else if(node.attributes.defId){
			App.clickStartFlow(node);
		}else if (node.attributes.flowNode){
			App.clickFLowNode(node,Ext.decode(node.attributes.params));
		}else if (node.attributes.mod){//配置菜单
			App.clickStartFlowConf(node);
		}else{
			App.clickTopTab(node.id,Ext.decode(node.attributes.params));
		}
	}
};
/**
 * 桌面点击
 */
App.MyDesktopClick=function(){
	var desktopPanel=Ext.getCmp("MyDesktop");
	if(desktopPanel!=null){
		desktopPanel.expand(true);
	}
	App.clickTopTab('ComIndexPage');
};
/**
 * 点击个人主页
 */
App.MyDesktopClickTopTab=function(id,params,precall,callback){
	if(precall!=null){
		precall.call(this);
	}
	var tabs = Ext.getCmp('centerTabPanel');
	var tabItem = tabs.getItem(id);
	
	if (tabItem == null) {
		$ImportJs(id, function(view) {
			tabItem = tabs.add(view);
			tabs.activate(tabItem);
		},params);
	}else {
		tabs.remove(tabItem);
		var str='new ' + id ;
		if(params!=null){
			str+='(params);';
		}else{
			str+='();';
		}
		var view= eval(str);
		tabItem = tabs.add(view);
		tabs.activate(tabItem);
	}
};
/**
 * 退出系统
 */
App.Logout = function() {
	Ext.Ajax.request({
				url : __ctxPath + '/j_logout.do',
				success : function() {
					deleteCookie("jforumSSOCookieNameUser","/",0);
					window.location.href = __ctxPath + '/login.jsp';
				}
	});
};

/**
 * 新建流程
 * @param {}
 *            defId
 * @param {}
 *            name
 * @author zhangyl           
 */
App.newFlow = function(defId, name,pk) {
	var contentPanel = App.getContentPanel();
	var startForm = contentPanel.getItem('ProcessRunStart' + defId);
	if (!startForm) {
		startForm = new ProcessRunStart({
					id : 'ProcessRunStart' + defId,
					defId : defId,
					flowName : name,
					vmParams:'{PKid:'+pk+'}'
				});
		contentPanel.add(startForm);
	}
	contentPanel.activate(startForm);
};
	
//应用程序总入口
//Ext.onReady(function(){App.init()});
