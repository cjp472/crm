<%@page import="com.htsoft.oa.service.system.AppUserService"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="security"
	uri="http://www.springframework.org/security/tags"%>
<%@taglib prefix="s" uri="/struts-tags"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@page import="com.htsoft.core.util.AppUtil"%>
<%@page import="com.htsoft.core.util.ContextUtil"%>
<%
	String basePath = request.getContextPath();
	//登录成功后，需要把该用户显示至在线用户
	AppUtil.addOnlineUser(request.getSession().getId(), ContextUtil.getCurrentUser());
	if (ContextUtil.getCurrentUser().getRights().contains("__ALL")) {
		request.setAttribute("IS_MANAGER", true);
	}
	String usernumber = (String) request.getSession().getAttribute("usernumber");
	String username = (String) request.getSession().getAttribute("username");
	String softphone_src = "./softphone/elvish/SoftPhone.jsp?agent="+ (usernumber==null?"":usernumber);
	//String softphone_src = "./softphone/spaic/1.0.3/spUI.jsp?agent="
			//+ (usernumber == null ? "" : usernumber);

	AppUserService appUserService = (AppUserService) AppUtil.getBean("appUserService");
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta http-equiv="msthemecompatible" content="no">
		<meta http-equiv="pragma" content="no-cache">
		
        <link rel="shortcut icon" href="images/favo.ico" type="image/x-icon" />
		<title>ECCRM_<s:property value="%{getText('login.jsp.system.name')}" /></title>
		<link rel="stylesheet" type="text/css" 	href="<%=basePath%>/ext3/resources/css/ext-all-notheme.css" />
		<link rel="stylesheet" type="text/css" 	href="<%=basePath%>/ext3/resources/css/ext-patch.css" />
		<link rel="stylesheet" type="text/css"  href="<%=basePath%>/ext3/ux/css/Portal.css" />
		<link rel="stylesheet" type="text/css" 	href="<%=basePath%>/ext3/ux/css/Ext.ux.UploadDialog.css" />
		<link rel="stylesheet" type="text/css" 	href="<%=basePath%>/css/admin.css" />
		<link rel="stylesheet" type="text/css"  href="<%=basePath%>/ext3/ux/css/ux-all.css" />
		<link rel="stylesheet" type="text/css"  href="<%=basePath%>/ext3/ux/caltask/calendar.css" />
		<!-- load the extjs libary -->
		<script type="text/javascript" src="<%=basePath%>/js/dynamic.jsp"></script>
		<script type="text/javascript" src="<%=basePath%>/js/know_i18n_js.jsp"></script>
		<!-- Ext 核心JS -->
		<script type="text/javascript"
			src="<%=basePath%>/ext3/adapter/ext/ext-base.gzjs"></script>
		<script type="text/javascript" src="<%=basePath%>/ext3/ext-all-min.gzjs"></script>
		<!--<script type="text/javascript" src="<%=basePath%>/ext3/ext-all-debug.js"></script>-->
		<script type="text/javascript" src="<%=basePath%>/ext3/ext-basex.js"></script>
		<script type="text/javascript" src="<%=basePath%>/ext3/ext-lang-zh_CN.js"></script>

		<!--使用iframe加载的依赖JS  <script type="text/javascript" src="<%=basePath%>/ext3/miframe-debug.js"></script>-->
		<!-- FCK控件JS -->
		<script type="text/javascript" src="<%=basePath%>/js/fckeditor/fckeditor.js"></script>
		<script type="text/javascript" src="<%=basePath%>/ext3/ux/Fckeditor.js"></script>
		<script type="text/javascript" src="<%=basePath%>/js/fckeditor/custom/plugins/flvPlayer/swfobject.js"></script>

		<!-- 附件上传对话框 -->
		<script type="text/javascript" src="<%=basePath%>/ext3/ux/UploadDialog.js"></script>
		<!-- 附件明细JS,多处用到 -->
		<script type="text/javascript" src="<%=basePath%>/js/system/FileAttachDetail.js"></script>
		<!-- AppUtil.js中引用附件上传的JS -->
		<script type="text/javascript" src="<%=basePath%>/js/system/FileUploadManager.js"></script>
		<script type="text/javascript" src="<%=basePath%>/js/system/FileUploadImageDetailForm.js"></script>

		<!-- 分页栏JS HTExt.js中引用 -->
		<script type="text/javascript" src="<%=basePath%>/ext3/ux/PageComboResizer.js"></script>

		<!-- 提示信息JS -->
		<script type="text/javascript" src="<%=basePath%>/ext3/ux/Toast.js"></script>

		<!-- GirdPanel中引用 -->
		<script type="text/javascript"	src="<%=basePath%>/ext3/ux/Ext.ux.grid.RowActions.js"></script>

		<!-- 需要的 JS-->
		<script type="text/javascript" src="<%=basePath%>/js/App.import.js"></script>
		<script type="text/javascript" src="<%=basePath%>/js/App.importflow.js"></script>
		<script type="text/javascript" src="<%=basePath%>/ext3/ux/XmlTreeLoader.js"></script>
		<script type="text/javascript" src="<%=basePath%>/ext3/ux/TabCloseMenu.js"></script>
		<script type="text/javascript"	src="<%=basePath%>/ext3/ux/DateTimeField.js"></script>
	

		<script type="text/javascript" src="<%=basePath%>/ext3/ux/ItemSelector.js"></script>
		<script type="text/javascript" src="<%=basePath%>/ext3/ux/MultiSelect.js"></script>

		<script type="text/javascript" src="<%=basePath%>/js/know/UkKnowApplyNoItemView.js"></script>
		<script type="text/javascript" src="<%=basePath%>/js/know/UkKnowApplyItemView.js"></script>
		<!-- 用户选择器,多处用到 -->
		<script type="text/javascript" src="<%=basePath%>/js/selector/UserSelector.js"></script>
		<script type="text/javascript" src="<%=basePath%>/js/selector/ugUserSelector.js"> </script>
		<script type="text/javascript" src="<%=basePath%>/js/selector/CustomerSelector.js"> </script>
		<script type="text/javascript" src="<%=basePath%>/js/know/UkKnowTuiJianUser.js"> </script>
		<!-- 来电弹屏和外呼所用的接受CS   by wangzj -->
		<script type="text/javascript" src="<%=basePath%>/js/outb/JieShouCsOrder.js"> </script>
		<!-- 用户组选择器 -->
		<script type="text/javascript" src="<%=basePath%>/js/selector/UsergroupSelector.js"></script>
		<!-- 部门选择器,多处用到 -->
		<script type="text/javascript" src="<%=basePath%>/js/selector/DepSelector.js"></script>
		<!-- 知识的show页面,多处用到 -->
		<script type="text/javascript" src="<%=basePath%>/js/know/UkSysKnowShow.js"></script>
		<!-- 在线用户选择器,在主页面显示在线用户时用到 -->
		<script type="text/javascript" src="<%=basePath%>/js/selector/OnlineUserSelector.js"> </script>
		<!-- 树型下拉选择器,多处用到 -->
		<script type="text/javascript" src="<%=basePath%>/js/core/TreeSelector.js"></script>
		<script type="text/javascript" src="<%=basePath%>/js/selector/UsergroupTreeSelector.js"> </script>
		<!-- core 工具JS -->
		<script type="text/javascript" src="<%=basePath%>/js/core/ux/HTExt.js"> </script>
		<script type="text/javascript" src="<%=basePath%>/js/core/ScriptMgr.js"> </script>
		<script type="text/javascript" src="<%=basePath%>/js/core/AppUtil.js"> </script>
		<script type="text/javascript" src="<%=basePath%>/js/core/ux/TreePanelEditor.js"> </script>
		<script type="text/javascript" src="<%=basePath%>/js/core/ux/TreeXmlLoader.js"> </script>
		<script type="text/javascript" src="<%=basePath%>/js/core/ux/WebOffice.js">  </script>
		<script type="text/javascript" src="<%=basePath%>/js/core/ux/TreeCombo.js"> </script>
		<script type="text/javascript" src="<%=basePath%>/ext3/ux/TreeCombox.js"> </script>
		<!-- 日期转换JS,目前AppUtil.js已提供$parseDate()方法 ,后续可将此JS换掉-->
		<script type="text/javascript" src="<%=basePath%>/js/core/date.js"> </script>
		<!-- 接收站内短消息时所用JS -->
		<script type="text/javascript" src="<%=basePath%>/js/info/MessageWin.js"> </script>
		<script type="text/javascript" src="<%=basePath%>/js/info/MessageReplyWin.js"> </script>
		<script type="text/javascript" src="<%=basePath%>/js/info/MessageDetail.js"> </script>

		<!-- 启动流程JS,多处用到-->
		<script type="text/javascript" src="<%=basePath%>/js/flow/ProcessRunStart.js"> </script>
		<script type="text/javascript" src="<%=basePath%>/js/flow/ProcessNextForm.js"> </script>

		<!-- 公文流程任务结点JS,多处用到-->
		<script type="text/javascript"  src="<%=basePath%>/js/archive/ArchivesNode.js">  </script>
		<script type="text/javascript" src="<%=basePath%>/js/util/DicType.js"> </script>
		<script type="text/javascript" src="<%=basePath%>/js/util/DicMap.js" charset="utf-8"> </script>
		<!-- 陈峰的JS -->
		<script type="text/javascript" src="<%=basePath%>/js/core/ux/MTExt.js"></script>
		<!-- 加载消息弹屏的js -->
		<script type="text/javascript" 	src="<%=basePath%>/js/info/MessageDetailInfo.js"> </script>
		<!-- 首页样式加载 -->
		<link href="<%=basePath%>/css/desktop.css" rel="stylesheet" type="text/css" />
		<script type="text/javascript" src="<%=basePath%>/js/myTestJs/loginPwdCheck.js"></script>
		<script type="text/javascript">
	        var __companyName = "<%=AppUtil.getCompanyName()%>";
	        var userInfo = "<%=appUserService.getCurUserInfo()%>";
	        var softSrc = "<%=softphone_src%>";
	        
			window.onload = function(){
			  App.init();
			};
	        Ext.onReady(function() {
				var storeTheme = getCookie('theme');
				if (storeTheme == null || storeTheme == '') {
					storeTheme = 'ext-all';
				}
				Ext.util.CSS.swapStyleSheet("theme", __ctxPath + "/ext3/resources/css/" + storeTheme + ".css");
				loginPwdCheck(userInfo, false);
	
			});
		</script>

		<!-- 登录信息,工具JS -->
		<script type="text/javascript" src="<%=basePath%>/js/App.js"></script>

		<!-- 个人首页JS -->
		<script type="text/javascript" src="<%=basePath%>/js/IndexPage.js"></script>

		<script type="text/javascript" src="<%=basePath%>/js/product/ProductForm.js"></script>
		<script type="text/javascript" src="<%=basePath%>/fusioncharts/FusionCharts.js"></script>
		
		<script type="text/javascript" >
			var callinId = "";
			baseMessage = function(CALLINNO, customerId ,customerNo) {
				var serviceRequestId;
				var planId;
				//添加或更新服务请求
				Ext.Ajax.request( {
					url : __ctxPath + '/customer/addRequestConServiceRequest.do',
					method : 'post',
					params : {
						customerId : customerId,
						'callNumber' : CALLINNO
					},
					success : function(response, options) {
						var responseResult = Ext.util.JSON.decode(response.responseText);
						serviceRequestId = responseResult.serviceRequestId;
						//添加任务
						Ext.Ajax.request( {
							url : __ctxPath + '/task/addCalendarPlan.do',
							method : 'post',
							params : {
								customerId : customerId,
								serviceRequestId : serviceRequestId
							},
							success : function(response, options) {
								var resResult = Ext.util.JSON.decode(response.responseText);
								planId = resResult.planId;
								Ext.Ajax.request({
									url : __ctxPath + '/customer/createHisConHis.do?callinno=' + CALLINNO,
									method : 'post',
									params : {
										customerId : customerId,
										serviceRequestId : serviceRequestId,
										planId : planId
									},
									success : function(response,options) {
										var response = Ext.util.JSON.decode(response.responseText);
										conhisId = response.conHisId;

										//拼接参数字符串，暂时有客户id，呼入电话及联络记录id
										var _cfg = customerId + ','+ CALLINNO + ','+ conhisId + ','+ serviceRequestId+ ',' + planId + ',' + customerNo + ',' + callinId;
										//alert(_cfg + '拼接的参数');
										//关闭左侧导航
										Ext.getCmp('westPanel').collapse();
										App.clickTopTab("CusPersonalFormCallin",_cfg,function() {},function(){
											var tid = window.setInterval(function(){
												if(typeof(CusPersonalFormCallin) != 'undefined'){
													//CusPersonalFormCallin.initPanel(customerId);
													window.clearInterval(tid);
												}
											},1000)
											
										},function() {
											CusPersonalFormCallin.initData(customerId,CALLINNO,customerNo);
											arr = _cfg.split(',');
											cusId = arr[0];
											CusPersonalFormCallnumber = arr[1];
											cusNo = arr[5];
											if (cusId == 'null') {
												cusId = -1;
											}
										});
										//关闭左侧导航
										//alert("close! w");
										Ext.getCmp('westPanel').collapse();
									},
									failure : function(response,options) {
										
									}
								});
							},
							failure : function(response, options) {
								
							}
						});
					},
					failure : function(response, options) {
						
					}
				});
			}
			function popupCustomerPageByCallin(CALLINNO, eduDatasAll) {
				//CALLINNO = '5021';
				
				try {
					callinId = eduDatasAll.split(",")[0];
				} catch (e) {
					alert(e);
				}
				//调家有接口查询客户信息
//				 Ext.ns('YXtask.getCur');
//			        YXtask.getCur.ulr = AppUtil.proxyURL + '/getCustInfo';
//			        YXtask.getCur.getCusPara = { 
//				        'cust_id' : cusNo
//				    };
//				    AppUtil.copy(AppUtil.interfaceBase, YXtask.getCur.getCusPara);
//				    YXtask.getCur.getCusPara__ = {
//				        wsUrl : YXtask.getCur.ulr,
//				        jsonData_ : Ext.util.JSON.encode(YXtask.getCur.getCusPara)
//				    };
//				    YXtask.getCur.result = AppUtil.synchroAjax(__ctxPath + '/system/proxyRestfulWSProxy.do', 
//				        YXtask.getCur.getCusPara__).result;
				//检验数据库里是否有客户的信息
				Ext.Ajax.request({
					url : __ctxPath+ '/customer/checkByCallInNoCusPersonal.do?callinno='+ CALLINNO,
					method : 'post',
					sync : true,
					success : function(response, options) {
						var response = Ext.util.JSON.decode(response.responseText);
						//var customerId = response.customerId;
						var customerId = "3267407";
						var customerNo = "1001417";
						var totals = response.totals;
						var result = response.result;
						var conhisId;
			
						if (totals > 1) {
							var gridPanel = new HT.GridPanel({
								scrollHeight : true,
								id : 'gridPanelPersonal',
								region : 'center',
								singleSelect : true,
								printable : false,
								border : false,
								showPaging : false,
								lazyLoad : false,
								exportable : false,
								url : __ctxPath + '/customer/checkByCallInNoCusPersonal.do?callinno=' + CALLINNO,
								fields : [ {
									name : 'customerId',
									type : 'int',
									hidden : true
								}, 'customerNo', 'nameCn', 'credTypId',
										'credNum', 'gender', 'cusGraId',
										'birthday', 'cusFromId' ],
								columns : [ {
									header : 'customerId',
									dataIndex : 'customerId',
									hidden : true
								}, {
									header : '客户编号',
									isExp : false,
									dataIndex : 'customerNo'
								}, {
									header : '客户姓名',
									isExp : false,
									dataIndex : 'nameCn'
								}, {
									header : '证件类型',
									isExp : false,
									dataIndex : 'credTypId',
									renderer : function(value) {
										return GGZJLX.get(value);
									}
								}, {
									header : '证件号码',
									isExp : false,
									dataIndex : 'credNum'
								}, {
									header : '性别',
									isExp : false,
									dataIndex : 'gender',
									renderer : function(value) {
										return XB001.get(value);
									}
								}, {
			
									header : '客户等级',
									isExp : false,
									dataIndex : 'cusGraId',
									renderer : function(value) {
										return CONKHJB.get(value);
									}
								}, {
									header : '出生日期',
									isExp : false,
									dataIndex : 'birthday'
								}, {
									header : '来源',
									isExp : false,
									dataIndex : 'cusFromId',
									renderer : function(value) {
										return CONKHLY.get(value);
									}
								} ]
							});
							var win = new Ext.Window({
								width : 700,
								title : '客户列表',
								height : 200,
								id : 'fixedkehu',
								autoScroll : true,
								layout : 'border',
								closable : false,
								items : [ gridPanel ],
								buttonAlign : 'center',
								buttons : [
									{
										text : '确定',
										iconCls : 'btn-save',
										handler : function() {
											var id = $getGdSelectedIds(Ext.getCmp('gridPanelPersonal'),'customerId');
											var cusPersonalNo = $getGdSelectedIds(Ext.getCmp('gridPanelPersonal'),'customerNo');
											
											if (id == null || id == '' || id == 'undefined') {
												Ext.ux.Toast.msg('操作提示','请选择客户!');
											} else {
												customerId = id;
												customerNo = cusPersonalNo;
												
												Ext.getCmp('fixedkehu').close();
												baseMessage(CALLINNO,customerId,customerNo);
											}
										}
									},
									{
										text : '关闭',
										iconCls : 'btn-cancel',
										scope : this,
										handler : function() {
											Ext.getCmp('fixedkehu').close();
											baseMessage(CALLINNO, null ,null);
										}
									}]
							});
							win.show();
						} else {
							if (customerId == 'undefined') {
								customerId == null;
							}
							if (customerNo == 'undefined'){
								customerNo == null;
							}
							baseMessage(CALLINNO, customerId, customerNo);
						}
					},
					failure : function(response, options) {
						alert('内部错误,请联系管理员!');
					}
				});
			}
			function popupCustomerPageByMediain(CALLINNO, eduDatasAll) {
				App.clickTopTab("CusPersonalFormMediain", "{customerId : 10062}");
			}
			function dial(telNumber) {
				//document.getElementById('softphone_frame').agentDial(telNumber);
				//document.frames("softphone_frame").UIforTalkingEvent();
				document.frames("softphone_frame").ext_agentCall(telNumber);
			}
			function setConId(conId) {
				document.frames("softphone_frame").setConId(conId);
			}
			
			
			/**测试保存文件的联络历史*/
			
			function saveSomeFile(conhisid, filetype, filesource, filepath, createby, cusname, crednum){
				try{
					Ext.Ajax.request({
						url:__ctxPath + '/customer/updateHisAndFileConHis.do',
						method:'post',
						params:{
							conHisId : conhisid,
							fileType : filetype,
							fileSource : filesource,
							filePath : filepath,
							createBy : createby,
							cusName : cusname,
							credNum : crednum
						},
					success : function(response, options){
						//alert('save file succes!' + filepath);
						//var ret = Ext.util.JSON.decode(response.responseText);
					},
					failure : function(response, options){
						alert('save file fail!' + filepath);
					}
					});
				} catch (e){
					alert("Exception happened in saveSomeFile:" + e);
				}
				
			}
			
			function testForBob(){
				var conhisid  = "123456", filetype = "2", filesource ="2", filepath = "d:\\aa\\BT001201212201220.bmp", createby = "A001", cusname = "", crednum = "";
				saveSomeFile(conhisid, filetype, filesource, filepath, createby, cusname, crednum);
				
				pauser(50);
				
				cusname = "bobT", crednum = "4112311115678", filetype = "5", filepath = "d:\\ddasd\\VT001201212201220.wmv";
				saveSomeFile(conhisid, filetype, filesource, filepath, createby, cusname, crednum);
				//new ConHisMaxWindow("asd").show();
				
				cusname = "bobT", crednum = "4112311115678", filetype = "1", filepath = "http://10.1.1.2:8080/softphone/s123123sad123.mp3";
				saveSomeFile(conhisid, filetype, filesource, "M" + "T001201212201220" + "," + filepath, createby, cusname, crednum);
				
				cusname = "bobT", crednum = "4112311115678", filetype = "13", filepath = "\\\\12.20.1.20\\share\\PT001201212201220.pdf";
				saveSomeFile(conhisid, filetype, filesource, filepath, createby, cusname, crednum);
			}
			
			/** pause current program*/
			function pauser(interval){
				var time = new Date().format("hhmmss");
				if(typeof interval != "string" && typeof interval != "number"){
					alert("Detect error type of var[interval#" + typeof interval + "]");
				}
				var Itime = parseInt(time) + interval;
				//var Icur = "0";
				do {
					time = new Date().format("hhmmss");//extend with format like yyyyMMddhhmmss
					var Icur = parseInt(time);
				} while(Icur <= Itime);
				alert("end pause!");//exit pause
			}
       </script>
	</head>
	<body oncontextmenu="return false">
		<div id="loading">
			<div class="loading-indicator">
				<img src="<%=basePath%>/images/loading.gif" alt="" width="153" height="16" style="margin-right: 8px;" align="absmiddle" />
				<div class="clear"></div>
				<s:property value="%{getText('index.jsp.jiazaizhong')}" />
			</div>
		</div>
		<div id="loading-mask"></div>
		
		<div id="app-header" style="height: 70px;" >
			<div id="header-left">
				<!-- <img id ="CompanyLogo" src="<%=basePath + AppUtil.getCompanyLogo()%>" height="50" style="max-width:230px;"/> -->
				<img id="CompanyLogo" src="<%=basePath + AppUtil.getCompanyLogo()%>" />
			</div>
			<div>
				<div>
				
					<div id="header-main">
						<div id="header-info">
							<!--<a href="#" onclick="App.MyDesktopClick()" style="text-indent:25px;padding-left: 28px;" class="menu-index-company" >公司主页</a>
							<a href="#" onclick="App.clickTopTab('AppHome')" style="text-indent:25px; padding-left: 28px" class="menu-desktop">个人桌面</a>
							 <a href="#" onclick="App.clickTopTab('PersonalMailBoxView')" style="text-indent:25px; padding-left: 28px" class="menu-mail_box">邮件</a>
							&nbsp;-->
							<!-- 这里是个人信息的具体信息 -->
							<!-- <s:property value="%{getText('index.jsp.huanyingnin')}"/>，<security:authentication property="principal.fullname"/>，
							 -->
							<!--<c:if test="${IS_MANAGER == 'true'}">
								<a href="#" onclick="App.clickTopTab('SysConfigView')">管理系统</a>
							</c:if>
							
							<a href="#" onclick=loginPwdCheck(userInfo,true);>修改密码</a>-->
						</div>
						<!-- <div id="header-nav"></div> -->
						<div><a href="#" onclick = "javascript:popupCustomerPageByCallin(2001,null);">来电</a></div>
					<div><a href="#" onclick = "testForBob();">bobfile</a></div>
					
					</div>
					<div id="header-right">
						<!-- <div id="setting">
							<div class="help">
						    	<a href="<%=basePath%>/help/manual.zip" target="blank"><s:property value="%{getText('index.jsp.help')}"/></a>
						    </div>
							 <c:if test="${IS_MANAGER ==true}">|&nbsp;<a href="#" onclick="App.clickTopTab('SysConfigView')"><s:property value="%{getText('index.jsp.install')}"/></a>
							</c:if>|&nbsp;<a href="/jforum" target="blank">论坛连接</a>
							 
						</div>
						 -->
						<div style="z-index: 5555;" id="searchFormDisplay">&nbsp;</div>
					</div>
				</div>
				<!--div style="position:absolute;top:30px;float:right;right:1px;width:866px;"-->
				
				<!--iframe id="softphone_frame" name="softphone_frame" src="./softphone/demo/index.jsp?v20110328_01" width="100%" height="64" scrolling="no" frameborder="0"
       	marginheight="0" marginwidth="0" style="margin-top:-1px;border:0px #ffffff solid" allowtransparency="true"></iframe-->



				<!--嵌入软电话条end-->
				<!--<div class="floatright cursorhand" style="margin-left:10px">
						<div><img src="<%=basePath%>/images/softtel/duanxin.png"/></div>
						<div style="*margin-top:2px"><s:property value="%{getText('index.jsp.duanxing')}"/></div>
					</div>
					<div class="floatright cursorhand" style="margin-left:10px">
						<div><img src="<%=basePath%>/images/softtel/chuanzhenhui.png"/></div>
						<div style="*margin-top:2px"><s:property value="%{getText('index.jsp.chuanzhen')}"/></div>
					</div>
					<div class="floatright cursorhand" style="margin-left:10px">
						<div><img src="<%=basePath%>/images/softtel/youjianhui.png"/></div>
						<div style="*margin-top:2px"><s:property value="%{getText('index.jsp.youjian')}"/></div>
					</div>
					<div class="floatright cursorhand" style="margin-left:10px">
						<div><img src="<%=basePath%>/images/softtel/IVRhui.png"/></div>
						<div style="*margin-top:2px">IVR</div>
					</div>
					<div class="floatright cursorhand" style="margin-left:10px">
						<div><img src="<%=basePath%>/images/softtel/huiyi.png"/></div>
						<div style="*margin-top:2px"><s:property value="%{getText('index.jsp.huiyi')}"/></div>
					</div>
					<div class="floatright cursorhand" style="margin-left:10px">
						<div><img src="<%=basePath%>/images/softtel/zhuanyihui.png"/></div>
						<div style="*margin-top:2px"><s:property value="%{getText('index.jsp.zhuanyi')}"/></div>
					</div>
					<div class="floatright cursorhand" style="margin-left:10px">
						<div><img src="<%=basePath%>/images/softtel/zixun.png"/></div>
						<div style="*margin-top:2px"><s:property value="%{getText('index.jsp.zixun')}"/></div>
					</div>
					<div class="floatright cursorhand" style="margin-left:10px">
						<div><img src="<%=basePath%>/images/softtel/waibo.png"/></div>
						<div style="*margin-top:2px"><s:property value="%{getText('index.jsp.waibo')}"/></div>
					</div>
					<div class="floatright cursorhand" style="margin-left:10px">
						<div><img src="<%=basePath%>/images/softtel/ruandianhuatiao.png"/></div>
					</div>
					<div class="floatright cursorhand" style="margin-left:10px">
						<div><img src="<%=basePath%>/images/softtel/jianpan.png"/></div>
					</div>
					<div class="floatright cursorhand" style="margin-left:10px">
						<div><img src="<%=basePath%>/images/softtel/ACWhui.png"/></div>
						<div style="*margin-top:2px">ACW</div>
					</div>
					<div class="floatright cursorhand" style="margin-left:10px">
						<div><img src="<%=basePath%>/images/softtel/baochihui.png"/></div>
						<div style="*margin-top:2px"><s:property value="%{getText('index.jsp.baochi')}"/></div>
					</div>
					<div class="floatright cursorhand" style="margin-left:10px">
						<div><img src="<%=basePath%>/images/softtel/jieting.png"/></div>
						<div style="*margin-top:2px"><s:property value="%{getText('index.jsp.jieting')}"/></div>
					</div>
					<div class="floatright cursorhand" style="margin-left:10px">
						<div><img src="<%=basePath%>/images/softtel/xiuxi.png"/></div>
						<div style="*margin-top:2px"><s:property value="%{getText('index.jsp.xiuxi')}"/></div>
					</div>
				  	<div class="floatright cursorhand" style="margin:0 10px">
						<div><img src="<%=basePath%>/images/softtel/jiuxu.png"/></div>
						<div style="*margin-top:2px"><s:property value="%{getText('index.jsp.jiuxu')}"/></div>
					</div>
					<div class="floatright cursorhand" style="margin:0 10px">
						<div><img src="<%=basePath%>/images/softtel/jiuxuhui.png"/></div>
						<div style="*margin-top:2px"><s:property value="%{getText('index.jsp.logout')}"/></div>
					</div>-->

			</div>
			<div id="soft_div_tit" style="position: absolute; float: right; right: 0px;margin-top:-2px; width: 800px; height: 70px;">
			</div>
		</div>
		<div id="floatParentDiv"
			style="position: absolute; right: 31px; display: none;" class="a">
			<div class="b">
				<div id="floatDiv" style="width: 210px; overflow-y: auto; background-color: #fff" class="c">
					<div id="rightTabContent0" style="position: relative; display: none">
						<input type="hidden" id="rightTabFlag0" value="false" />

					</div>
					<div id="rightTabContent1" style="display: none; overflow: auto">
						<input type="hidden" id="rightTabFlag1" value="false" />

					</div>
					<div id="rightTabContent2" style="display: none" style="position:relative">
						<jsp:include page="agentStatList.htm"></jsp:include>
					</div>
					<div id="rightTabContent3" style="display: none">
						<input type="hidden" id="rightTabFlag3" value="false" />
					</div>
				</div>
			</div>
		</div>
	</body>
</html>