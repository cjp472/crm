<%@page import="com.htsoft.oa.service.system.AppUserService"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="security"
	uri="http://www.springframework.org/security/tags"%>
<%@taglib prefix="s" uri="/struts-tags"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@page import="com.htsoft.core.util.AppUtil"%>
<%@page import="com.htsoft.core.util.ContextUtil"%>
<%	
	
	String basePath = request.getContextPath();
	//登录成功后，需要把该用户显示至在线用户
	AppUtil.addOnlineUser(request.getSession().getId(), ContextUtil
			.getCurrentUser());
	if (ContextUtil.getCurrentUser().getRights().contains("__ALL")) {
		request.setAttribute("IS_MANAGER", true);
	}
	String usernumber = (String) request.getSession().getAttribute(
			"usernumber");
	String username = (String) request.getSession().getAttribute(
			"username");
			
	String softphone_src = "./softphone/elvish/SoftPhone.jsp?agent="
			+ (usernumber == null ? "" : usernumber)+"&uName="+username;
	//String softphone_src = "./softphone/spaic/1.0.3/spUI.jsp?agent="
	//+ (usernumber == null ? "" : usernumber);

	AppUserService appUserService = (AppUserService) AppUtil
			.getBean("appUserService");
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta http-equiv="msthemecompatible" content="no">
		<meta http-equiv="pragma" content="no-cache">

		<link rel="shortcut icon" href="images/favo.ico" type="image/x-icon" />
		<title>ECCRM_<s:property
				value="%{getText('login.jsp.system.name')}" /></title>
		<link rel="stylesheet" type="text/css"
			href="<%=basePath%>/ext3/resources/css/ext-all-notheme.css" />
		<link rel="stylesheet" type="text/css"
			href="<%=basePath%>/ext3/resources/css/ext-patch.css" />
		<link rel="stylesheet" type="text/css"
			href="<%=basePath%>/ext3/ux/css/Portal.css" />
		<link rel="stylesheet" type="text/css"
			href="<%=basePath%>/ext3/ux/css/Ext.ux.UploadDialog.css" />
		<link rel="stylesheet" type="text/css"
			href="<%=basePath%>/css/admin.css" />
		<link rel="stylesheet" type="text/css"
			href="<%=basePath%>/ext3/ux/css/ux-all.css" />
		<link rel="stylesheet" type="text/css"
			href="<%=basePath%>/ext3/ux/caltask/calendar.css" />
		<!-- load the extjs libary -->
		<script type="text/javascript" src="<%=basePath%>/js/dynamic.jsp"></script>
		<script type="text/javascript" src="<%=basePath%>/js/know_i18n_js.jsp"></script>
		<!-- Ext 核心JS -->
		<script type="text/javascript"
			src="<%=basePath%>/ext3/adapter/ext/ext-base.gzjs"></script>
		<script type="text/javascript"
			src="<%=basePath%>/ext3/ext-all-min.gzjs"></script>
		<!--<script type="text/javascript" src="<%=basePath%>/ext3/ext-all-debug.js"></script>-->
		<script type="text/javascript" src="<%=basePath%>/ext3/ext-basex.js"></script>
		<script type="text/javascript"
			src="<%=basePath%>/ext3/ext-lang-zh_CN.js"></script>

		<!--使用iframe加载的依赖JS  <script type="text/javascript" src="<%=basePath%>/ext3/miframe-debug.js"></script>-->
		<!-- FCK控件JS -->
		<script type="text/javascript"
			src="<%=basePath%>/js/fckeditor/fckeditor.js"></script>
		<script type="text/javascript"
			src="<%=basePath%>/ext3/ux/Fckeditor.js"></script>
		<script type="text/javascript"
			src="<%=basePath%>/js/fckeditor/custom/plugins/flvPlayer/swfobject.js"></script>
			

		<!-- 附件上传对话框 -->
		<script type="text/javascript"
			src="<%=basePath%>/ext3/ux/UploadDialog.js"></script>
		<!-- 附件明细JS,多处用到 -->
		<script type="text/javascript"
			src="<%=basePath%>/js/system/FileAttachDetail.js"></script>
		<!-- AppUtil.js中引用附件上传的JS -->
		<script type="text/javascript"
			src="<%=basePath%>/js/system/FileUploadManager.js"></script>
		<script type="text/javascript"
			src="<%=basePath%>/js/system/FileUploadImageDetailForm.js"></script>

		<!-- 分页栏JS HTExt.js中引用 -->
		<script type="text/javascript"
			src="<%=basePath%>/ext3/ux/PageComboResizer.js"></script>

		<!-- 提示信息JS -->
		<script type="text/javascript" src="<%=basePath%>/ext3/ux/Toast.js"></script>

		<!-- GirdPanel中引用 -->
		<script type="text/javascript"
			src="<%=basePath%>/ext3/ux/Ext.ux.grid.RowActions.js"></script>

		<!-- 需要的 JS-->
		<script type="text/javascript" src="<%=basePath%>/js/App.import.js"></script>
		<script type="text/javascript"
			src="<%=basePath%>/js/App.importflow.js"></script>
		<script type="text/javascript"
			src="<%=basePath%>/ext3/ux/XmlTreeLoader.js"></script>
		<script type="text/javascript"
			src="<%=basePath%>/ext3/ux/TabCloseMenu.js"></script>
		<script type="text/javascript"
			src="<%=basePath%>/ext3/ux/DateTimeField.js"></script>


		<script type="text/javascript"
			src="<%=basePath%>/ext3/ux/ItemSelector.js"></script>
		<script type="text/javascript"
			src="<%=basePath%>/ext3/ux/MultiSelect.js"></script>

		<script type="text/javascript"
			src="<%=basePath%>/js/know/UkKnowApplyNoItemView.js"></script>
		<script type="text/javascript"
			src="<%=basePath%>/js/know/UkKnowApplyItemView.js"></script>
		<!-- 用户选择器,多处用到 -->
		<script type="text/javascript"
			src="<%=basePath%>/js/selector/UserSelector.js"></script>
		<script type="text/javascript"
			src="<%=basePath%>/js/selector/ugUserSelector.js"> </script>
		<script type="text/javascript"
			src="<%=basePath%>/js/selector/CustomerSelector.js"> </script>
		<script type="text/javascript"
			src="<%=basePath%>/js/know/UkKnowTuiJianUser.js"> </script>
		<!-- 来电弹屏和外呼所用的接受CS   by wangzj -->
		<script type="text/javascript"
			src="<%=basePath%>/js/outb/JieShouCsOrder.js"> </script>
		<!-- 用户组选择器 -->
		<script type="text/javascript"
			src="<%=basePath%>/js/selector/UsergroupSelector.js"></script>
		<!-- 部门选择器,多处用到 -->
		<script type="text/javascript"
			src="<%=basePath%>/js/selector/DepSelector.js"></script>
		<!-- 知识的show页面,多处用到 -->
		<script type="text/javascript"
			src="<%=basePath%>/js/know/UkSysKnowShow.js"></script>
		<!-- 在线用户选择器,在主页面显示在线用户时用到 -->
		<script type="text/javascript"
			src="<%=basePath%>/js/selector/OnlineUserSelector.js"> </script>
		<!-- 树型下拉选择器,多处用到 -->
		<script type="text/javascript"
			src="<%=basePath%>/js/core/TreeSelector.js"></script>
		<script type="text/javascript"
			src="<%=basePath%>/js/selector/UsergroupTreeSelector.js"> </script>
		<!-- core 工具JS -->
		<script type="text/javascript" src="<%=basePath%>/js/core/ux/HTExt.js"> </script>
		<script type="text/javascript"
			src="<%=basePath%>/js/core/ScriptMgr.js"> </script>
		<script type="text/javascript" src="<%=basePath%>/js/core/AppUtil.js"> </script>
		<script type="text/javascript"
			src="<%=basePath%>/js/core/ux/TreePanelEditor.js"> </script>
		<script type="text/javascript"
			src="<%=basePath%>/js/core/ux/TreeXmlLoader.js"> </script>
		<script type="text/javascript"
			src="<%=basePath%>/js/core/ux/WebOffice.js">  </script>
		<script type="text/javascript"
			src="<%=basePath%>/js/core/ux/TreeCombo.js"> </script>
		<script type="text/javascript"
			src="<%=basePath%>/ext3/ux/TreeCombox.js"> </script>
		<!-- 日期转换JS,目前AppUtil.js已提供$parseDate()方法 ,后续可将此JS换掉-->
		<script type="text/javascript" src="<%=basePath%>/js/core/date.js"> </script>
		<!-- 接收站内短消息时所用JS -->
		<script type="text/javascript"
			src="<%=basePath%>/js/info/MessageWin.js"> </script>
		<script type="text/javascript"
			src="<%=basePath%>/js/info/MessageReplyWin.js"> </script>
		<script type="text/javascript"
			src="<%=basePath%>/js/info/MessageDetail.js"> </script>

		<!-- 启动流程JS,多处用到-->
		<script type="text/javascript"
			src="<%=basePath%>/js/flow/ProcessRunStart.js"> </script>
		<script type="text/javascript"
			src="<%=basePath%>/js/flow/ProcessNextForm.js"> </script>

		<!-- 公文流程任务结点JS,多处用到-->
		<script type="text/javascript"
			src="<%=basePath%>/js/archive/ArchivesNode.js">  </script>
		<script type="text/javascript" src="<%=basePath%>/js/util/DicType.js"> </script>
		
		<script type="text/javascript" src="<%=basePath%>/js/util/DicMap.js"
			charset="utf-8"> </script>
		<!-- 陈峰的JS -->
		<script type="text/javascript" src="<%=basePath%>/js/core/ux/MTExt.js"></script>
		<!-- 加载消息弹屏的js -->
		<script type="text/javascript"
			src="<%=basePath%>/js/info/MessageDetailInfo.js"> </script>
		<!-- 首页样式加载 -->
		<link href="<%=basePath%>/css/desktop.css" rel="stylesheet"
			type="text/css" />	 
		<script type="text/javascript"
			src="<%=basePath%>/js/myTestJs/loginPwdCheck.js"></script>
		<script type="text/javascript"
			src="<%=basePath%>/js/customer/ConHisForm.js"></script>
		<script type="text/javascript">
				var manageCallNum = 0 ;  //此变量用来存储处理电话个数
				var count = 0;   //成员变量 保证在刷新之前不会被重置
				
				//******************时间格式******************
				Date.prototype.pattern = function (fmt) {
	            var o = {
	                "M+": this.getMonth() + 1, //月份     
	                "d+": this.getDate(), //日     
	                "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时     
	                "H+": this.getHours(), //小时     
	                "m+": this.getMinutes(), //分     
	                "s+": this.getSeconds(), //秒     
	                "q+": Math.floor((this.getMonth() + 3) / 3), //季度     
	                "S": this.getMilliseconds() //毫秒     
	            };
	            var week = {
	                "0": "\u65e5",
	                "1": "\u4e00",
	                "2": "\u4e8c",
	                "3": "\u4e09",
	                "4": "\u56db",
	                "5": "\u4e94",
	                "6": "\u516d"
	            };
	            if (/(y+)/.test(fmt)) {
	                fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	            }
	            if (/(E+)/.test(fmt)) {
	                fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "\u661f\u671f" : "\u5468") : "") + week[this.getDay() + ""]);
	            }
	            for (var k in o) {
	                if (new RegExp("(" + k + ")").test(fmt)) {
	                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	                }
	            }
	            return fmt;
	        }
				//******************时间格式******************
				
				/****************************<<消息日志>>*************************************
				 * cusPersonalFormCall.js里面的所有消息日志
				 * @param tlog: 日志每一行记录的内容  Date().pattern("yyyy-MM-dd hh:mm:ss");
				 * */
				function writeDealno(textName,tlog){
					//不能每笔作为一个日志文件。现在按照每天一个日志文件
					try{
						var fso = new ActiveXObject("Scripting.FileSystemObject");
						var fh = fso.OpenTextFile(textName, 8, true);			//只读=1，只写=2 ，追加=8 等权限
						fh.WriteLine(tlog);
						fh.Close();
					}catch(e){
						try{
							//alert("Exception：" + "日志存储失败！请检查" + tfile + "是否存在！");
							var fso = new ActiveXObject("Scripting.FileSystemObject");
							var fh = fso.CreateTextFile("C://dealno.txt", 8, true);	//只读=1，只写=2 ，追加=8 等权限
							fh.WriteLine(tlog);
							fh.Close();
						}catch(e){
							alert("Exception：" + "日志存储失败！请检查" + "C://dealno.txt" + "是否存在！");
						}
					}
				}
				function readDealLog(textName){
					try{
						var fso = new ActiveXObject("Scripting.FileSystemObject"); 
						//node=node16&nodeip=192.168.10.16&device=ph-sip-1-node16&agent=5001&pwd=5001
						var f = fso.OpenTextFile(textName,1);//只读
						var line; 
						while (!f.AtEndOfStream){
							line = f.ReadLine();
						}
						f.Close();
					}catch(ex){
						alert("读取配置文件"+"C://dealno.txt"+"失败!");
						return false;
					}
					return line;
				}
				
				
				var tfile="";
				/****************************<<消息日志>>*************************************
				 * cusPersonalFormCall.js里面的所有消息日志
				 * @param tlog: 日志每一行记录的内容  Date().pattern("yyyy-MM-dd hh:mm:ss");
				 * */
				function jsLog(tlog){
					tfile = "C://AgentLog/" + new Date().pattern('yyyyMMdd') + "_Log.txt";   //当天的交易记录在一个文件里
					//不能每笔作为一个日志文件。现在按照每天一个日志文件
					try{
						var fso = new ActiveXObject("Scripting.FileSystemObject");
						var fh = fso.OpenTextFile(tfile, 8, true);			//只读=1，只写=2 ，追加=8 等权限
						fh.WriteLine(tlog);
						fh.Close();
					}catch(e){
						try{
							//alert("Exception：" + "日志存储失败！请检查" + tfile + "是否存在！");
							var fso = new ActiveXObject("Scripting.FileSystemObject");
							var fh = fso.CreateTextFile(tfile, 8, true);	//只读=1，只写=2 ，追加=8 等权限
							fh.WriteLine(tlog);
							fh.Close();
						}catch(e){
							alert("Exception：" + "日志存储失败！请检查" + tfile + "是否存在！");
						}
					}
				}
				
				function jsLog_admin(tlog){
					var file = "C://AgentLog/admin_" + new Date().pattern('yyyyMMdd') + "_Log.txt";   //当天的交易记录在一个文件里
					//不能每笔作为一个日志文件。现在按照每天一个日志文件
					try{
						var fso = new ActiveXObject("Scripting.FileSystemObject");
						var fh = fso.OpenTextFile(file, 8, true);			//只读=1，只写=2 ，追加=8 等权限
						fh.WriteLine(tlog);
						fh.Close();
					}catch(e){
						try{
							//alert("Exception：" + "日志存储失败！请检查" + tfile + "是否存在！");
							var fso = new ActiveXObject("Scripting.FileSystemObject");
							var fh = fso.CreateTextFile(tfile, 8, true);	//只读=1，只写=2 ，追加=8 等权限
							fh.WriteLine(tlog);
							fh.Close();
						}catch(e){
							alert("Exception：" + "日志存储失败！请检查" + tfile + "是否存在！");
						}
					}
				}
				
				var addressInfos = "";
				var cleartime1,cleartime2;
				/*************************************
				 * 记录日志
				 * @type 消息类型
				 * @sts 消息内容
				 */
				function logStrMsg(sts,type){
					var str = "# " + new Date().pattern('yyyy-MM-dd HH:mm:ss S') + "   [" + type + "]" + "   {" + sts + "} end";
					return str;
				}
				function callAddressInfo(info){
					//jsLog(logStrMsg(WDNAME002.get(info),"INFO"));
					if(info == "null"){
						Ext.get('callAddressInfo').dom.innerHTML = " ";
					}else{
						//addressInfos = WDNAME002.get(info);
						info = "T" + info.substring(1,info.length);
						jsLog(logStrMsg("截取info字符串为："+info ,"INFO"));
						addressInfos = selectMachineInfo(info);
						Ext.get('callAddressInfo').dom.innerHTML = addressInfos;
						blinkLink();
					}
				}
				
				/**
				 * 后台动态查询网点地址名称；
				 */
				function selectMachineInfo(id){
				jsLog(logStrMsg("进入后台动态查询网点名称" ,"INFO"));
				var res ;
				try {
					Ext.Ajax.request({
								url : __ctxPath + '/customer/selectEquipNameConHis.do',
								method : 'post',
								async: false,
								params : {
									Eid : id
								},
								method : 'post',
								success : function(response) {
			                        res = Ext.util.JSON.decode(response.responseText);
			                        jsLog(logStrMsg("来电网点名称："+res.data.equipmentName,"INFO"));
			                        
			                    }
							
							})
				} catch (e) {
					jsLog(logStrMsg("动态查询网点名称出现异常：" + e +"res.data.equipmentName?","ERROR"));
				}
				return res.data.equipmentName;
			}
				
				function blinkLink(){
					if(!Ext.get('callAddressInfo').dom.style.color){
						Ext.get('callAddressInfo').dom.style.color = "red";
					}
					if(Ext.get('callAddressInfo').dom.style.color == "red"){
						Ext.get('callAddressInfo').dom.style.color = "black"
					}else{
						Ext.get('callAddressInfo').dom.style.color = "red";
					}
					cleartime1 = setTimeout("blinkLink()",500);
				}
				
				
		</script>
		<script type="text/javascript">
			
		    var allOcxInclude = 1;
			function regOcxActiveScreen() {
				jsLog(logStrMsg("进入注册regOcxActiveScreen 方法中...","INFO"));
				// var focus = document.getElementById("myocx");
				if (navigator.userAgent.toLowerCase().indexOf("msie") > -1) {
					jsLog(logStrMsg("IE内核浏览器的注册方式","INFO"));
					// IE内核浏览器的注册方式
					myocx.attachEvent("AgentEvtAlertingEx", Regagentalert);
					myocx.attachEvent("AgentEvtConnectEx", Regagentconn);
					myocx.attachEvent("AgentEvtDisconnect", Regagentdisconn);
					myocx.attachEvent("AgentMessage", Regagentmsg);
					myocx.attachEvent("AgentEvtIDCardResultEx", RegIDCardResult);
					myocx.attachEvent("AgentEvtScanResult", RegAgentEvtScanResult);
					myocx.attachEvent("AgentEvtMakeCallTimeoutEx", RegAgentCallTimeout);
					myocx.attachEvent("AgentEvtAcceptCallTimeout", RegAgentAcceptCallTimeout);
					
					//注册首页form
					myocx.attachEvent("FormMessageEvt", RegFormMessageEvt);
					
					//videoocx.attachEvent("VideoRecordFileStartSuccess",Regvideofilesucc);
					//videoocx.attachEvent("VideoRecordFileStartFailed",Regvideofilefail);
					
					//不清楚是否有打印接口
				} else {
					jsLog(logStrMsg("非IE内核浏览器注册方式","INFO"));
					// 非IE内核浏览器注册方式
					// 当然这里其实没有必要，因为只有IE内核浏览器才能执行此处讨论的COM组件
					// focus_addEventListener("AgentEvtAlertingEx",agentalert);
				}
			}
			
			function regOcxActiveScreenWrapTimeDet() {
				// var focus = document.getElementById("myocx");
				if (navigator.userAgent.toLowerCase().indexOf("msie") > -1) {
					jsLog(logStrMsg("wrapTimeDet","INFO"));
					// IE内核浏览器的注册方式
					myocx.detachEvent("AgentEvtBankIDCardWrapTime", RegAgentBankIDCardResult);
					
					//不清楚是否有打印接口 
				} else {
					// 非IE内核浏览器注册方式
					// 当然这里其实没有必要，因为只有IE内核浏览器才能执行此处讨论的COM组件
					// focus_addEventListener("AgentEvtAlertingEx",agentalert);
				}
			}
			
			function regOcxActiveScreenWrapTime() {
				// var focus = document.getElementById("myocx");
				if (navigator.userAgent.toLowerCase().indexOf("msie") > -1) {
					jsLog(logStrMsg("wrapTime","INFO"));
					// IE内核浏览器的注册方式
					myocx.attachEvent("AgentEvtBankIDCardWrapTime", RegAgentBankIDCardResult);
					
					//不清楚是否有打印接口 
				} else {
					// 非IE内核浏览器注册方式
					// 当然这里其实没有必要，因为只有IE内核浏览器才能执行此处讨论的COM组件
					// focus_addEventListener("AgentEvtAlertingEx",agentalert);
				}
			}
			
	        var __companyName = "<%=AppUtil.getCompanyName()%>";
	        var userInfo = "<%=appUserService.getCurUserInfo()%>";
	        //var varvideoocx = '<div style="text-align:center;width:100%;"><object classid="clsid:E25AFF08-CAB8-47B4-82C0-704BE1585431"  name="videoocx"' + 'class="VideoOCX.ocx"  height="750" width="350" VIEWASTEXT ID=Object1>' + '</object></div>';
	       // var varvideoocx = "<div style='text-align:center;width:100%;'><object classid='clsid:E25AFF08-CAB8-47B4-82C0-704BE1585431' id='videoocx'  name='videoocx' class='VideoOCX.ocx'  height='510' width='350' > </object></div>";
			
	        var curagent = Ext.util.JSON.decode(userInfo);
	    	// 取得当前登录用户的相关信息，包括权限
	        //alert(curagent.user.photo);
	    	
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
				//loginPwdCheck(userInfo, false);
	
			});
		</script>

		<!-- 登录信息,工具JS -->
		<script type="text/javascript" src="<%=basePath%>/js/App.js"></script>
			<!-- 测试 -->
			<script type="text/javascript" src="<%=basePath%>/js/customer/CusPersonalFormCallin.js"> </script>  <!-- 测试----- --> 
		<!-- 个人首页JS -->
		<script type="text/javascript" src="<%=basePath%>/js/IndexPage.js"></script>

		<script type="text/javascript"
			src="<%=basePath%>/js/product/ProductForm.js"></script>
		<script type="text/javascript"
			src="<%=basePath%>/fusioncharts/FusionCharts.js"></script>

		<!-- 省市区的数据信息js -->
		<script type="text/javascript"
			src="<%=basePath%>/js/addressData/addInfoData.js"></script>
		<script type="text/javascript"
			src="<%=basePath%>/js/customer/Kaika.js"></script>
		<script type="text/javascript">
			var YesOrNo_FUND = "";   //开借记卡
			var obj= Ext.util.JSON.decode(userInfo);
			// 取得当前登录用户的相关信息，包括权限
			var users = obj.user;
			var curUserInfo_1 = new UserInfo(users);
			
			
			var _cfg_1= "";
			var dealno = "";// videoinitok 传入 流水号给出最大范围的变量访问
		
			var serviceid = ""
			var planid_1 = "";
			var customerid_1 = "";
			//给设备号复制变量
			var strCallMessage_1 = "";
			//-------------
			var callinId = "";
			var _conHisId= "";
			
			//////////
			//js计时器
			/////
			 var hour = 0;minute = 0;second = 0;
			 var t = 0 ; t1 = 0; t2 = 0;
			 var flag1,flag2,flag3;
			 function setTimeGJ (){
					hour = parseInt(t/60/60);
					minute = parseInt(t/60%60);
					second = parseInt(t%60);
					Ext.get('GJTime').dom.value = hour+" : "+minute+" : "+second;
					t = t + 1 ;
					flag1 = setTimeout("setTimeGJ()",1000);
				}
				function setTimeLeave (){
					hour = parseInt(t1/60/60);
					minute = parseInt(t1/60%60);
					second = parseInt(t1%60);
					Ext.get('leaveTime').dom.value = hour+" : "+minute+" : "+second;
					t1 = t1 + 1 ;
					flag2 = setTimeout("setTimeLeave()",1000);
				}
				function setTimeLogin (){
					//登录登出记录报表计数
					var cti_loginTime = new Date().format("hhmmss");
					
					hour = parseInt(t2/60/60);
					minute = parseInt(t2/60%60);
					second = parseInt(t2%60);
					Ext.get('loginTime').dom.value = hour+" : "+minute+" : "+second;
					t2 = t2 + 1 ;
					flag3 = setTimeout("setTimeLogin()",1000);
				}
				function stopTime(type){
					if(type == 3){
						clearTimeout(flag3);//停止登录时间
						clearTimeout(flag2);//停止小休时间
						clearTimeout(flag1);
					}else if(type == 2){
						clearTimeout(flag2);//停止小休时间
					}else if(type == 1){
						clearTimeout(flag1);
					}else {
						clearTimeout(cleartime1);
					}
				}
				function writeLog(mes){
					jsLog(logStrMsg(mes,"INFO"));
				}
			
			/**
			 *	2014/04/22
			 *	Mr.Hu
			 *	振铃时存储后台数据、对应的callid以及座席号、名称
			 */
			function saveCallIdOrAgentName(callid,machineid){
				
				jsLog(logStrMsg("agentID:"+curUserInfo_1.username,"INFO"));
				jsLog(logStrMsg("machineid:"+machineid,"INFO"));
				//alert(curUserInfo.username);
				try {
					Ext.Ajax.request({
								url : __ctxPath + '/customer/saveCallIDorAgentIDConHis.do',
								method : 'post',
								async: false,
								params : {
									callID : callid,
									agentID : curUserInfo_1.username,
									machineID : machineid
								},
								success : function(response, options){
									jsLog(logStrMsg("saveCallIdOrAgentName SUCCESS"  ,"INFO"));
								},
								failure : function(response, options){
									jsLog(logStrMsg("saveCallIdOrAgentName ERROR:" + options ,"ERROR"));
								}
							});
				} catch (e) {
					jsLog(logStrMsg("Exception SaveCallID ERROR: " + e,"ERROR"));
				}
			}
			
			
			baseMessage = function(CALLINNO, customerId ,customerNo) {
			jsLog(logStrMsg("baseMessage = function(CALLINNO="+CALLINNO+", customerId="+customerId+" ,customerNo="+customerId,"INFO"));
				try{
				var serviceRequestId;
				var planId;
				customerid_1 = customerId;
				//添加或更新服务请求
				Ext.Ajax.request( {
					url : __ctxPath + '/customer/addRequestConServiceRequest.do',
					method : 'post',
					params : {
						customerId : customerId,
						'callNumber' : CALLINNO
					},
					success : function(response, options) {
						jsLog(logStrMsg("调用后台addRequestConServiceRequest.do返回成功","INFO"));
						//alert("#addRequestConServiceRequest:");
						var responseResult = Ext.util.JSON.decode(response.responseText);
						serviceRequestId = responseResult.serviceRequestId;
						//测试 暂时副将serviceid存起来 方便插入数据使用；
						serviceid = responseResult.serviceRequestId;
						//添加任务
						Ext.Ajax.request( {
							url : __ctxPath + '/task/addCalendarPlan.do',
							method : 'post',
							params : {
								customerId : customerId,
								serviceRequestId : serviceRequestId
							},
							success : function(response, options) {
								jsLog(logStrMsg("调用后台addCalendarPlan.do返回成功","INFO"));
								//alert("#addCalendarPlan:");
								var resResult = Ext.util.JSON.decode(response.responseText);
								planId = resResult.planId;
								//暂时测试存储planId
								planid_1 = resResult.planId;
								Ext.Ajax.request({
									url : __ctxPath + '/customer/createHisConHis.do?callinno=' + CALLINNO,
											//+ '&termno=' + "T" + CALLINNO.substring(1),采用映射，不保存
									method : 'post',
									params : {
										customerId : customerId,
										serviceRequestId : serviceRequestId,
										planId : planId
									},
									success : function(response,options) {
										jsLog(logStrMsg("调用后台createHisConHis.do返回成功","INFO"));
										//alert("createHisConHis beg");
										var response = Ext.util.JSON.decode(response.responseText);
										conhisId = response.conHisId;
										_conHisId = response.conHisId;
										//alert("#createHisConHis:"+_conHisId);
										//拼接参数字符串，暂时有客户id，呼入电话及联络记录id
										_cfg_1 = customerId + ','+ CALLINNO + ','+ _conHisId + ','+ serviceRequestId+ ',' + planId + ',' + customerNo + ',' 
										+ callinId + "," + curagent.user.photo;
										//alert(_cfg + '拼接的参数');
										var arr = _cfg_1.split(',');
										jsLog(logStrMsg("字符串："+"T" + (arr[1] + "").substring(1) + "\\\\\\\\\\\\"+ "S" + (arr[1] + "").substring(1),"INFO"));
										//关闭左侧导航
										//alert(count);
										jsLog(logStrMsg("针对康文偶尔无法来电弹屏 -> 输出变量值count = "+count,"INFO"));
										///if(count == 0){
											//count ++;
											//jsLog(logStrMsg("进入count = 0   count ++"+count,"INFO"));
											Ext.getCmp('westPanel').collapse();
											var dealno = "T" + (arr[1] + "").substring(1) + new Date().pattern('yyyyMMddHHmm');
											//更改自己生成的流水号；
											jsLog(logStrMsg("自动生成流水号："+dealno+"<>conhisid："+_conHisId,"INFO"));
											//updatedealNo(_conHisId, '111', '222', "NULLT002201404141231,C0ssssss", "v1000", "未知", "333",dealno,'444');
											updatedealNum(_conHisId,"未知",dealno);
											
											jsLog(logStrMsg("先调用VtmAgentInit()函数","INFO"));
											//setTimeout("VtmAgentInit()", 500);
											VtmAgentInit("T" + (arr[1] + "").substring(1) , "S" + (arr[1] + "").substring(1));
											
											
											
											
											
											
										//}
										
										
										//关闭左侧导航
										//alert("close! w");
										//Ext.getCmp('westPanel').collapse();
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
				
			}catch (e){
				alert("base:" + e);
			}
			}
			var _callinno = "";
			var _eduDatasAll = "";
			
			
			/**
			 * 接听电话后立马存储自己这边生成的流水号  
			 //测试无流水情况是否能存储相应的流水信息
			 */
			 function updatedealNum(conhisid, cusname, dealnum ) {
				try {
					Ext.Ajax.request({
								url : __ctxPath + '/customer/updateDealNumConHis.do',
								method : 'post',
								async: false,
								params : {
									conHisId : conhisid,
									cusName : cusname,
									serialNum : dealnum
								},
								success : function(response, options){
									jsLog(logStrMsg("座席端生成流水号存储成功！","INFO"));
								},
								failure : function(response, options){
									jsLog(logStrMsg("座席端生成流水号存储失败！","ERROR"));
								}
							});
				} catch (e) {
					jsLog(logStrMsg("Exception happened in saveSomeFile: " + e,"ERROR"));
				}
			}
			
			
			function opencallin(){
				App.clickTopTab("CusPersonalFormCallin","");
			}
			
			function callInsertData(callno){
			   var id = "";
				try{
					Ext.Ajax.request({
							url : __ctxPath + '/customer/createHisConHis.do?callinno=' + callno,
							method : 'post',
							async: false,
							params : {
								customerId : customerid_1,
								serviceRequestId : serviceid,
								planId : planid_1
							},
							success : function(response,options) {
								var response = Ext.util.JSON.decode(response.responseText);
								id = response.conHisId;
							},
							failure : function(response,options) {
								alert("插入后台异常！！");
								return "null";
							}
						});
						
				}catch (e){
					alert("catch中异常"+e);
				}
				return id;
			}
			
			function returnConhisID(){
				//alert(_conHisId);
				return _conHisId;
			}
			
			function updateConHis(type){
				updateHisBusType(_conHisId , type);
			}
			function takeSomeFile(){
				takeSaveSomeFiles(_conHisId);
			}
			
			function popupCustomerPageByCallin(CALLINNO, eduDatasAll) {
				jsLog(logStrMsg("座席点击接听电话按钮->>调用popupCustomerPageByCallin : @PARAM  CALLINNO="+CALLINNO+"//eduDatasAll="+eduDatasAll,"INFO"));
				manageCallNum = manageCallNum + 1 ;
				Ext.get('callNum').dom.value = manageCallNum;  //每接一通电话，处理电话个数将加1
				//CALLINNO = '5021';
				//测试==↓
				//Ext.getCmp("callinfo").expand(true);  //测试
				_callinno = CALLINNO;
				_eduDatasAll = eduDatasAll;
				try {
					callinId = eduDatasAll.split(",")[0];
				} catch (e) {
					//alert("callin__eduDatasAll.split" + e);
					callinId = "111111";
				}
				var customerId = "3267407";
				var customerNo = "1001417";
				var conhisId;
				baseMessage(CALLINNO,customerId,customerNo);
				//return baseMessage(CALLINNO,customerId,customerNo);
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
			/*
			function updateHisBD(){
				var cusname = '张虹红';
				var crednum = '11022319820913004X';
				var conhisid = '12056';
				try{
					Ext.Ajax.request({
						url:__ctxPath + '/customer/updateHisBDConHis.do',
						method:'post',
						params:{
							conHisId : conhisid,
							cusName : cusname,
							credNum : crednum
						},
					success : function(response, options){
						//alert('save file succes!' + filepath);
						//var ret = Ext.util.JSON.decode(response.responseText);
					},
					failure : function(response, options){
						alert('update his buding error!');
					}
					});
				} catch (e){
					alert("Exception happened in saveSomeFile:" + e);
				}
			}
			*/
			function killer(ContianerID, AcitveXObjectID){
				try{//只卸载myocx
					//ContianerID = "allOcx";
					//AcitveXObjectID = "myocx";
					var ce=document.getElementById(ContianerID);
			        if (ce){
			            var cce=ce.children;
			            for(var i=0;i<cce.length;i=i+1){
			                if(cce[i].id==AcitveXObjectID){
			                    ce.removeChild(cce[i]);
			                }
			            }
			        }
			        
				} catch(e){
					alert("ActiveXKiller" + e);
				}
			}
			
			function ActiveXKiller(){
				
				//videoocx myocx
				//var myocx = document.getElementById("myocx");
				//var soft_div_tit = document.getElementById("soft_div_tit");
				//测试发现刷新后获取不到弹屏页面的videoocx，说明已经释放了。
				//var videoocx = document.getElementById("videoocx");
				//alert("myocx:" + myocx + "#videoocx:" + videoocx + "#soft_div_tit:" + soft_div_tit);
				killer("allOcx", "myocx");
				killer("app-header", "soft_div_tit");
				/**测试卸载后是否还有*/
				//myocx = document.getElementById("myocx");
				//soft_div_tit = document.getElementById("soft_div_tit");
				//测试发现刷新后获取不到弹屏页面的videoocx，说明已经释放了。
				//videoocx = document.getElementById("videoocx");
				//alert("myocx:" + myocx + "#videoocx:" + videoocx + "#soft_div_tit:" + soft_div_tit);
		      }
		      
		      //杀掉myocx控件
		      function myocxkiller(){
		      	killer("allOcx", "myocx");
		      	var com=document.createElement("div");
		      	document.getElementById("allOcx").appendChild(com);
		      }
		      
       </script>
	</head>
	<body oncontextmenu="return false" onunload="ActiveXKiller()" >
		<div id="allOcx">
			<object classid="clsid:CD3641E8-CF1F-40CC-ACA3-0C25A0DD7486"
				id="myocx" name="myocx" class="testOCX.ocx" height="0" width="0"
				VIEWASTEXT ID=Object1></object>
				
				<!-- 测试 -->
				<object classid="clsid:E25AFF08-CAB8-47B4-82C0-704BE1585431"
				id="videoocx" name="videoocx" class="VideoOCX.ocx" height="0" width="0"
				VIEWASTEXT ID=Object1></object>
				
			<!-- 视频音频同步播放控件
			<object classid="clsid:FB599ACE-14E0-47E0-B5AE-84B3A42BE7F5"
				id="videoPlayer" name="videoPlayer" class="SyncPlayerForRVA.ocx" height="0" width="0"
				VIEWASTEXT ID=Object1></object> -->
		</div>
		<div id="loading">
			<div class="loading-indicator">
				<img src="<%=basePath%>/images/loading.gif" alt="" width="153"
					height="16" style="margin-right: 8px;" align="absmiddle" />
				<div class="clear"></div>
				<s:property value="%{getText('index.jsp.jiazaizhong')}" />
			</div>
		</div>
		<div id="loading-mask"></div>

		<div id="app-header" style="height: 70px;">
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
						<!-- <div id="header-nav"></div>
						<div>
							<a href="#"
								onclick="javascript:popupCustomerPageByCallin(2001,null);">来电</a>
						</div>
						<div>
							<a href="#" onclick="updateHisBD();">bobupdate</a>
						</div>
						-->
						<div>
							<a href="#" onclick="javascript:opencallin();">来电</a> 
						</div>
						
						
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
						 
						<div style="z-index: 5555;" id="searchFormDisplay">
							&nbsp;
						</div>
					</div>
				</div>
				<!--div style="position:absolute;top:30px;float:right;right:1px;width:866px;"-->

				<!--iframe id="softphone_frame" name="softphone_frame" src="./softphone/demo/index.jsp?v20110328_01" width="100%" height="64" scrolling="no" frameborder="0"
       	marginheight="0" marginwidth="0" style="margin-top:-1px;border:0px #ffffff solid" allowtransparency="true"></iframe-->

			</div>
			<div id="soft_div_tit"
				style="position: absolute; float: right; right: 0px; margin-top: -2px; width: 800px; height: 70px;">
			</div>
		
		</div>
		<div id="floatParentDiv"
			style="position: absolute; right: 31px; display: none;" class="a">
			<div class="b">
				<div id="floatDiv"
					style="width: 210px; overflow-y: auto; background-color: #fff"
					class="c">
					<div id="rightTabContent0"
						style="position: relative; display: none">
						<input type="hidden" id="rightTabFlag0" value="false" />

					</div>
					<div id="rightTabContent1" style="display: none; overflow: auto">
						<input type="hidden" id="rightTabFlag1" value="false" />

					</div>
					<div id="rightTabContent2" style="display: none"
						style="position:relative">
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