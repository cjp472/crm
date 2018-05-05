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
	
	String softphone = "./softphone1/newqmanager/mySoftPhone.jsp?agentID=" + username;
	
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
		<script type="text/javascript" src="<%=basePath%>/js/photo_add.jsp"></script>
    <script type="text/javascript" src="<%=basePath%>/js/PhotosImgs.jsp"></script>
		
		
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

		<!-- 记录登录记录报表数据引用 2014-12-17   huyang -->
		<script type="text/javascript" src="<%=basePath%>/js/App.LoginWin.js"></script>
		

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
		
		
          //--------------------------员工信息-坐席照片信息		
					var x="xy";
					var y="xy";
					var w="xy";
					var h="xy";
					var ImgPhotoPaths="";
					var widths="";
					var heights="";
					var ImgSouPaths="";
					var photoCount=0;////标记上传的是否是坐席照片0-标识不是 ，>0标识就是坐席照片
	     //-----------------------------------员工信息-坐席照片信息
		
		
		
		
		
		
		
		
		
			var machineID = "";  //话机号
			var agentID = '<%=username%>';    //座席ID
			var str = "<%=basePath%>";
		   /***********************************************************************************
			****************	新版软电话ocx接口调用 ********************************************
			****************	2016/01/08			*******************************************
			****************	Fernando_Hu		 	*******************************************
			***********************************************************************************/
			//读elvish.properties文件 
			function readFile(){
				try{
					var fso = new ActiveXObject("Scripting.FileSystemObject"); 
					var f = fso.OpenTextFile("C:\\elvish.properties",1);//只读
					var line; 
					while (!f.AtEndOfStream){
						line = f.ReadLine();
						//读取话机号
						if(line.indexOf('phoneNum=')==0){
							machineID = line.substring('phoneNum='.length,line.length);
						}
					}
					f.Close();
				}catch(ex){
					//alert("读取配置文件"+filePath+"失败!");
					return false;
				}
				return true;
			}
			function testlogin(){
				try{
					writeLog("新接口调用 testlogin(), agentID = " + agentID + "   machineID=" + machineID);
					//parent.window.new_cti_login(agentID,machineID,"");
					myocx.AgentLoginV2(agentID,machineID,"ECCRM_客户关系管理系统");
					
				} catch (e){
					alert("testlogin:" + e);
				}
			}
			var restT = "";
			function selectClick(){
				restT = document.getElementById('rest').value;
			}
			function selectChange(){
				try{
					var restType = document.getElementById('rest').value;
					if(restType == "0"){ 
						document.getElementById('rest').value = restT;
					}else if(restType == "1"){
						writeLog("小休下拉框selectChange事件：就餐");
						document.getElementById('restStatus').innerText = "状态：就餐"; myocx.AgentSetRest(0,"");
					}else if(restType == "2"){
						writeLog("小休下拉框selectChange事件：离开");
						document.getElementById('restStatus').innerText = "状态：离开"; myocx.AgentSetRest(1,"");
					}else if(restType == "3"){
						writeLog("小休下拉框selectChange事件：临时工作");
						document.getElementById('restStatus').innerText = "状态：临时工作"; myocx.AgentSetRest(2,"");
					}else if(restType == "4"){
						writeLog("小休下拉框selectChange事件：管理");
						document.getElementById('restStatus').innerText = "状态：管理"; myocx.AgentSetRest(3,"");
					}else if(restType == "5"){
						writeLog("小休下拉框selectChange事件：培训");
						document.getElementById('restStatus').innerText = "状态：培训"; myocx.AgentSetRest(4,"");
					}
					///测试： 选择完下拉框后将 假设软电话登录成功，需要变更按钮的背景图；
					//document.getElementById('imgLogin').src = str+"/softphone1/newqmanager/img/logout-1.jpg";
					document.getElementById('imgZhunbei').src = str+"/softphone1/newqmanager/img/zhunbei-1.jpg";
				}catch (e){
					alert("selectChange Exception:"+e);
				}
				document.getElementById('CallNum').focus(); //将焦点移动，避免座席误操作切换致其他小休状态；
			}
			function imglog(){
				try{
					///测试： 选择完下拉框后将 假设软电话登录成功，需要变更按钮的背景图；
					var type = (document.getElementById('imgLogin').src).split('/')[7].split('.')[0];
					//alert(type);
					if(type == "logout-1"){  //表示当前的按钮时  登出，表示座席需要登录
						//alert(agentID+","+machineID);
						myocx.AgentLogoutV2(agentID,machineID);
					}else if(type == "login-1"){   //表示当前按钮是 登录， 表示座席需要登出  替换成登出状态按钮
						myocx.AgentLoginV2(agentID,machineID,"ECCRM_客户关系管理系统");
					}
				}catch (e){
					alert("imglog Exception:"+e);
				}
			}
			
			
			
			
			//点击准备好了按钮
			function zhunbei(){
				try{
					//alert(document.getElementById('imgZhunbei').src);
					var ZBtype = (document.getElementById('imgZhunbei').src).split('/')[7].split('.')[0];
					var LOGtype = (document.getElementById('imgLogin').src).split('/')[7].split('.')[0];
					//alert(type);
					if(ZBtype == "zhunbei-1" && LOGtype == "logout-1"){  //
						document.getElementById('imgZhunbei').src = str+"/softphone1/newqmanager/img/zhunbei-0.jpg";
						document.getElementById('restStatus').innerText = "状态：空闲";
						
						//document.getElementById('rest').add(new Option("选择小休","0"));
						document.getElementById('rest').value = "0";
						myocx.AgentSetReady("");
					}
				}catch (e){
					alert("zhunbei Exception:"+e);
				}
			}
			
			//挂断电话 单击事件
			function imgClosePhone(){
				try{
					writeLog("座席点击挂断电话按钮，imgClosePhone单击事件 ");
					var type = (document.getElementById('ClosePhoneImage').src).split('/')[7].split('.')[0];
					if(type == 'guaduan-0'){
						//表示当前座席已经需要挂断电话
						
						clearTimeout(cleartimeOut);
						clearTimeout(cleartime1);
						myocx.AgentStopConferenceEx();
						writeLog("调用 myocx.AgentStopConferenceEx();");
					}
				}catch (e){
					alert("imgClosePhone Exception:"+e);
				}
			}
			var cleartimeOut;
			//来电振铃  开始使图片闪烁
			function RingingBegin(){
				try{
					//alert(document.getElementById('CallInImage').src);
					var type = (document.getElementById('CallInImage').src).split('/')[7].split('.')[0];
					if(type == 'laidian-1'){
						document.getElementById('CallInImage').src = str+"/softphone1/newqmanager/img/laidian-0.jpg";  //变成红色  按钮
					}else if("laidian-0"){
						document.getElementById('CallInImage').src = str+"/softphone1/newqmanager/img/laidian-1.jpg";  //变成正常颜色  按钮
					}
					document.getElementById('rest').disabled = true;
					document.getElementById('ClosePhoneImage').src = str+"/softphone1/newqmanager/img/guaduan-0.jpg";
					document.getElementById('imgZhunbei').src = str+"/softphone1/newqmanager/img/zhunbei-0.jpg";
					document.getElementById('imgLogin').src = str+"/softphone1/newqmanager/img/logout-0.jpg";
					cleartimeOut = setTimeout("RingingBegin()",300);
				}catch (e){
					alert("RingingBegin Exception:"+e);
				}
			}
			
			//////////
			//js计时器
			/////
			 var hour = 0; minute = 0; second = 0;
			 var t = 0 ; t1 = 0; t2 = 0;
			 var flag11,flag22,flag33;
			 function setTimeGJ_1 (){
			 	//parent.window.writeLog("setTimeGJ");
				hour = parseInt(t/60/60);
				minute = parseInt(t/60%60);
				second = parseInt(t%60);
				document.getElementById('GenJinTime').value  = hour+":"+minute+":"+second;
				t = t + 1 ;
				flag11 = setTimeout("setTimeGJ_1()",1000);
			}
			function setTimeLeave_1 (){
				hour = parseInt(t1/60/60);
				minute = parseInt(t1/60%60);
				second = parseInt(t1%60);
				document.getElementById('leaveTime').value = hour+":"+minute+":"+second;
				t1 = t1 + 1 ;
				flag22 = setTimeout("setTimeLeave_1()",1000);
			}
			function setTimeLogin_1 (){
				hour = parseInt(t2/60/60);
				minute = parseInt(t2/60%60);
				second = parseInt(t2%60);
				document.getElementById('loginTime').value = hour+":"+minute+":"+second;
				t2 = t2 + 1 ;
				flag33 = setTimeout("setTimeLogin_1()",1000);
			}
			
			function stopTime_1(type){
					if(type == 3){
						clearTimeout(flag33);//停止登录时间
						clearTimeout(flag22);//停止小休时间
						clearTimeout(flag11);
						updateLogOutCTI();
					}else if(type == 2){
						clearTimeout(flag22);//停止小休时间
					}else if(type == 1){
						clearTimeout(flag11);
					}else {
						clearTimeout(cleartimeOut);
						clearTimeout(cleartime1);
					}
				}
			/**********************************************************************************
			****************	新版软电话ocx接口调用  *******************************************
			****************	end					*******************************************
			****************	Fernando_Hu			*******************************************
			***********************************************************************************/
				
				//var manageCallNum = 0 ;  //此变量用来存储处理电话个数
				
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
					tfile = "C://AgentLog/Develop_" + new Date().pattern('yyyyMMdd') + ".txt";   //当天的交易记录在一个文件里
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
							//alert("Exception：" + "日志存储失败！请检查" + tfile + "是否存在！");
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
							//alert("Exception：" + "日志存储失败！请检查" + tfile + "是否存在！");
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
				function myocxAgentSetCallRingInfo(no,callid,time){
					jsLog(logStrMsg("调用myocx.AgentSetCallRingInfo()来电振铃接口  no="+no +" , time="+time+" , callid="+callid,"INFO"));
					myocx.AgentSetCallRingInfo(no+","+callid+","+time);
				}
				function callAddressInfo(info){
					//jsLog(logStrMsg(WDNAME002.get(info),"INFO"));
					if(info == "null"){
						Ext.get('callAddressInfo').dom.innerHTML = " ";
					}else{
						//addressInfos = WDNAME002.get(info);
						var one = info.substring(0,1);
						if(one == "2"){
							info = "T" + info.substring(1,info.length);
						}else if(one == "3"){
							info = "C" + info.substring(1,info.length);
						}
						//info = "T" + info.substring(1,info.length);
						jsLog(logStrMsg("截取info字符串为："+info ,"INFO"));
						addressInfos = selectMachineInfo(info);
						Ext.get('callAddressInfo').dom.innerHTML = addressInfos;
						blinkLink();
					}
				}
				
				
				var call_ipAddress = "";   //存储呼入VTM的IP地址，传入makecall函数
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
			                        call_ipAddress = res.data.ipAddress;
			                        //call_ipAddress = "10.160.4.162";
			                        jsLog(logStrMsg("来电网点名称："+res.data.equipmentName + ", IP:" + call_ipAddress , "INFO"));
			                        
			                    }
							
							})
				} catch (e) {
					jsLog(logStrMsg("动态查询网点名称出现异常：" + e +"res.data.equipmentName?","ERROR"));
				}
				return res.data.equipmentName;
			}
			
				/**
				 * 后台动态查询Operation表中BS_Num字段最大的值；
				 */
				function selectMaxOpera(){
					jsLog(logStrMsg("进入后台动态查询BS_Num" ,"INFO"));
					var res ;
					try {
						Ext.Ajax.request({
									url : __ctxPath + '/customer/selectMaxOperaConHis.do',
									method : 'post',
									async: false,
									method : 'post',
									success : function(response) {
				                        res = Ext.util.JSON.decode(response.responseText);
				                        BS_num = res.data.BS_Num;
				                        BS_num = BS_num + 1;
				                        jsLog(logStrMsg("OperationData 中 BS_Num最大的值是：" + BS_num,"INFO"));
				                    }
								
								})
					} catch (e) {
						jsLog(logStrMsg("动态查询网点名称出现异常：" + e +"res.data.equipmentName?","ERROR"));
					}
					return res.data.equipmentName;
				}
				
				
			/**
			 *	2014/12/18
			 *	Hyman
			 *	存储后台数据  Opeartion 表中的 进入系统、登录CTI、退出系统 的数据
			 */
			function insertOperationData(BS_Num , time , SysType){
				jsLog(logStrMsg("进入insertOperationData方法:","INFO"));
				try {
					Ext.Ajax.request({
								url : __ctxPath + '/customer/insertOperationConHis.do',
								method : 'post',
								async: false,
								params : {
									bsnum : BS_Num,
									agentID : curUserInfo_1.username,
									insertTime : time,
									Stype : SysType 
								},
								success : function(response, options){
									jsLog(logStrMsg("insertOperationData SUCCESS"  ,"INFO"));
								},
								failure : function(response, options){
									jsLog(logStrMsg("insertOperationData ERROR:" + options ,"ERROR"));
								}
							});
				} catch (e) {
					jsLog(logStrMsg("Exception insertOperationData()  ERROR: " + e,"ERROR"));
				}
			}
				
			/**
			 *	2014/12/18
			 *	Hyman
			 *	存储后台数据  WorkAttendance 表
			 */
			function insertWorkAttendance(BS_Num , loginSysTime , loginCtiTime , logoutSysTime ,status , reason, remarks){
				if(logoutStatus == 0){
					//异常退出，也需要录入登录的结束时间Cti_Login_Info
					updateLogOutCTI();
				}  
				//并且需要判断异常退出的时候，当前状态处于什么状态，小休的话也需要录入数据
				if(statusRest != ""){
					updateRestCTI();
				}
				if(signMark == "5"){
					updateAfterWorkCTI();
				}
				try {
					Ext.Ajax.request({
								url : __ctxPath + '/customer/insertWorkAttendanceConHis.do',
								method : 'post',
								async: false,
								params : {
									bsnum : BS_Num,
									agentID : curUserInfo_1.username,
									loginSysTime : loginSysTime,
									loginCtiTime : loginCtiTime,
									logoutSysTime : logoutSysTime,
									Status : status,
									Reason : reason,
									Remarks : remarks 
								},
								success : function(response, options){
									jsLog(logStrMsg("insertWorkAttendance SUCCESS"  ,"INFO"));
								},
								failure : function(response, options){
									jsLog(logStrMsg("insertWorkAttendance ERROR:" + options ,"ERROR"));
								}
							});
				} catch (e) {
					jsLog(logStrMsg("Exception insertWorkAttendance()  ERROR:" + e,"ERROR"));
				}
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
					
					//注册新的软电话接口事件
					myocx.attachEvent("AgentEvtLogin", AgentEvtLogin);  //登录成功事件
					myocx.attachEvent("AgentEvtLogout", AgentEvtLogout);  //登录成功事件
					myocx.attachEvent("AgentEvtAlertingEx", AgentEvtAlertingEx);  //来电振铃事件 AgentEvtAlertingEx(strCallMessage)
					myocx.attachEvent("AgentEvtConnectEx", AgentEvtConnectEx);  //应答成功事件  AgentEvtConnectEx(strCallMessage)
					myocx.attachEvent("AgentRecordStart", AgentRecordStart);  //应答成功事件 AgentRecordStart(strAgentExtNo, strCallRefID, strRecordFile, strRecordData)
					myocx.attachEvent("AgentEvtDisconnectSP", AgentEvtDisconnectSP);  //AgentEvtDisconnect()
					myocx.attachEvent("AgentRecordStop", AgentRecordStop);  //AgentRecordStop(strAgentExtNo, strCallRefID, strRecordFile, strRecordData)
					myocx.attachEvent("AgentEvtStateRest", AgentEvtStateRest);   //(strWorkNo, strExtNo, iRestType, strRestData)
					myocx.attachEvent("AgentEvtStateReady", AgentEvtStateReady);  //(strWorkNo, strExtNo, strReadyData)
					myocx.attachEvent("AgentEvtStateAfterCall", AgentEvtStateAfterCall);  //strWorkNo, strExtNo, strAfterCallData    
					myocx.attachEvent("AgentEvtStateCancelAfterCall", AgentEvtStateCancelAfterCall);  //(strWorkNo, strExtNo, strCancelData)
					myocx.attachEvent("AgentEvtServerDown", AgentEvtServerDown);   //服务器故障或者崩溃
					myocx.attachEvent("AgentEvtServerDisconnect", AgentEvtServerDisconnect);	//网络连接断开
					//注册首页form
					myocx.attachEvent("FormMessageEvt", RegFormMessageEvt);
					
					myocx.attachEvent("VideoRecordFileStartSuccess",Regvideofilesucc);
					myocx.attachEvent("VideoRecordFileStartFailed",Regvideofilefail);
					
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
	    	
	        var softSrc = "<%=softphone%>";
	        
			window.onload = function(){
				//soft_div_tit
				//document.getElementById("showError").style.display = 'none';
				//setTimeout("regOcxActiveScreen()",5000);
				//document.onkeydown = doKey;
				document.onkeydown = ppPressF5; 
				regOcxActiveScreen();
				selectMaxOpera();
				systemLoginTime = new Date().format("yyyy-MM-dd hh:mm:ss");
				jsLog(logStrMsg("登录系统时间是：" + systemLoginTime,"INFO"));
				if(curUserInfo_1.username != "admin" && curUserInfo_1.username != "V1000"){
					jsLog(logStrMsg("登录用户不是admin，记录该条记录" ,"INFO"));
					insertOperationData(BS_num,systemLoginTime,"进入系统");	
				}
				if(isGranted_1('ComPhone') && curUserInfo_1.username != "admin"){
					jsLog(logStrMsg("当前用户是坐席需要显示软电话" ,"INFO"));
					readFile();
					setTimeout("testlogin()", 1000);
				}else{
					jsLog(logStrMsg("当前用户不是坐席需要隐藏软电话" ,"INFO"));
					document.getElementById("soft_div_tit").style.display = 'none';
				}
				
			  App.init();
			};
			
			
			//window.open(www.32pic.com,"32pic","fullscreen=3,height=100, width=400, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no");
			
			window.onbeforeunload = function () {
				jsLog(logStrMsg("--->window.onbeforeunload" ,"INFO"));
				//myocx.AgentLogoutV2(agentID,machineID);
				systemOutTime = new Date().format("yyyy-MM-dd hh:mm:ss");
				jsLog(logStrMsg("errorCloseForm = " + errorCloseForm + " systemOutTime = "+ systemOutTime + "BS_num="+ BS_num ,"INFO"));
				if(errorCloseForm == "true"){
					
					//alert("属于异常退出，需要存储后台数据！");
					if(curUserInfo_1.username != "admin" && curUserInfo_1.username != "V1000"){
						insertOperationData(BS_num,systemOutTime,"退出系统");
						insertWorkAttendance(BS_num , systemLoginTime , cti_loginTime , systemOutTime ,"异常退出","","");	
						//退出异常系统处理
					}
				}
				if(logoutStatus == 0){
					//异常退出，也需要录入登录的结束时间Cti_Login_Info
					updateLogOutCTI();
				} 
				//并且需要判断异常退出的时候，当前状态处于什么状态，小休的话也需要录入数据
				if(statusRest != ""){
					updateRestCTI();
				}
				if(signMark == "5"){
					updateAfterWorkCTI();
				}
			}
	        Ext.onReady(function() {
				var storeTheme = getCookie('theme');
				if (storeTheme == null || storeTheme == '') {
					storeTheme = 'ext-all';
				}
				Ext.util.CSS.swapStyleSheet("theme", __ctxPath + "/ext3/resources/css/" + storeTheme + ".css");
				//loginPwdCheck(userInfo, false);
			});
			
			/**********************************************************************************
			****************	新版软电话对应事件函数 *******************************************
			****************	2016/01/08			*******************************************
			****************	Fernando_Hu		 	*******************************************
			***********************************************************************************/
			var recordingPath1 = '';
			var callCount = 0;
			var starTime = "";
			var endTime = "";
			var callID = "";
			var callFrom = "";
			var manageCallNum = 0 ;  //用来累计接听电话个数变量
			var afterWorkFlag = false;  //此处为了解决曲总sipServer的事件冲突，用bool变量判断当前状态是否在跟进状态；
			var agentStatus = "";

			//登录成功 OCX抛出事件
			function AgentEvtLogin(strResult, strWorkNo, strExtNo, strData){
				try{
					writeLog(" OCX抛出事件 AgentEvtLogin ");
					if(strResult == "FAIL"){
						writeLog("登录失败! -> " + strResult + "   strWorkNo：" + strWorkNo + "   strExtNo：" +strExtNo + "   strData：" + strData);
						document.getElementById('ErrorInfo').innerText = "登录失败，请确认登录信息或稍后重试！";
						document.getElementById("showError").style.display = 'block';
						document.getElementById("soft_div_tit").style.display = 'none';
					}else{
						//登录成功
						agentStatus = "Login";
						writeLog(" 登录成功  str ="+str);
						document.getElementById('machineNum').innerText = machineID;
						writeLog("赋值成功");
						document.getElementById('imgLogin').src = str+"/softphone1/newqmanager/img/logout-1.jpg";
						document.getElementById('imgZhunbei').src = str+"/softphone1/newqmanager/img/zhunbei-1.jpg";
						document.getElementById('rest').value = "0";document.getElementById('restStatus').innerText = "状态：离开";
						document.getElementById('rest').disabled = false;
						
						setTimeLogin_1();  //计时
						myocx.AgentSetRest(1,"");
						
						//parent.window.setTimeLogin();
						biaoLoginTime();
						writeLog("坐席进入呼叫平台登录软电话成功并开始计时;");
						logoutStatus = 0;  //重新标记一下该变量，表示处于登录状态
					}
				}catch (e){
					alert("AgentEvtLogin Exception:"+e);
				}
			}
			
			//登出成功 OCX抛出事件
			function AgentEvtLogout(strResult, strWorkNo, strExtNo, strData){
				try{
					agentStatus = "Logout";  
					document.getElementById('machineNum').innerText = "";
					document.getElementById('restStatus').innerText = "状态：未登录";
					document.getElementById('rest').value = "0";
					document.getElementById('imgLogin').src = str+"/softphone1/newqmanager/img/login-1.jpg";
					document.getElementById('imgZhunbei').src = str+"/softphone1/newqmanager/img/zhunbei-0.jpg";
					document.getElementById('rest').disabled = true;
					
					stopTime_1(3);  //停止计时  登出停止所有计时 类别为3
					
					writeLog("AgentEvtLogout,softphone坐席登出软电话;");
					
					//登出软电话同时，要判断是否需要停止其他状态时间
					if(signMark == "5"){
						writeLog("AgentEvtLogout, updateAfterWorkCTI();");
						updateAfterWorkCTI();
					}else if(signMark != ""){
						writeLog("AgentEvtLogout, updateRestCTI();");
						updateRestCTI();
					}
					
					statusRest = "";
					signMark = "";
				}catch (e){
					alert("AgentEvtLogout Exception:"+e);
				}
			}
			//来电振铃事件
			function AgentEvtAlertingEx(strCallMessage){
				try{
					agentStatus = "Ringing";
					parent.window.writeLog(" AgentEvtAlertingEx , strCallMessage = " + strCallMessage);
					var callNo = strCallMessage.split(',')[1];
					callFrom = callNo;
					var callid = strCallMessage.split(',')[2];
					callID = callid;
					//收到振铃时间开始闪烁 来电图片
					document.getElementById('callAddress').innerText = "来电号码：" + callNo;
					RingingBegin(); //图片闪烁
					var time = new Date().pattern("HH:mm:ss");
					document.getElementById('callTime').innerText = "来电时间：" + time;
					document.getElementById('restStatus').innerText = "状态：振铃中";
					
					
					writeLog("来电振铃事件日志--〉来电号码："+callNo+" , callID:"+callid + " , time:" + new Date().pattern("yyyy-MM-dd HH:mm:ss"));
					myocxAgentSetCallRingInfo(callNo,callid,new Date().pattern("yyyy-MM-dd HH:mm:ss"));
					callAddressInfo(callNo);
					saveCallIdOrAgentName(callid,agentID);
					saveOrUpdateRingingCTI(callNo,callid);//AgentSetCallRingInfo
					
				}catch (e){
					alert("AgentEvtAlertingEx Exception:"+e);
				}
			}
			//接通电话事件
			function AgentEvtConnectEx(strCallMessage){
				try{
					agentStatus = "Calling";
					parent.window.writeLog("接通电话事件, AgentEvtConnectEx : " + strCallMessage);
					clearTimeout(cleartimeOut);
					document.getElementById('CallInImage').src = str+"/softphone1/newqmanager/img/laidian-1.jpg"; 
					document.getElementById('ClosePhoneImage').src = str+"/softphone1/newqmanager/img/guaduan-0.jpg";  //挂断电话变为红色
					if(strCallMessage.indexOf("|")>=0){callCount++;}
					if(callCount == 0){
						document.getElementById('restStatus').innerText = "状态：通话中";
						stopTime_1(100);
						signMark = "5";
						updateRingingCTI(1);
						saveOrUpdateCallInfoCTI();
					    starTime = new Date().pattern("yyyy-MM-dd HH:mm:ss");
					    manageCallNum = manageCallNum + 1 ;
					    document.getElementById('CallNum').value = manageCallNum;
						callCount++;
						var allStr = callID + ",null";
						popupCustomerPageByCallin(callFrom,allStr);
						
						setMyocxInfo(1,"");
						setMyocxInfo(0,"");
						setTimeout('keepfile()', 10000);
					}
					
				}catch (e){
					alert("AgentEvtConnectEx Exception:"+e);
				}
			}
			function keepfile(){
				writeLog("keepfile() , recordingPath1="+recordingPath1);
				saveWav(recordingPath1,starTime);
			}
			//录音开始事件
			function AgentRecordStart(strAgentExtNo, strCallRefID, strRecordFile, strRecordData){
				try{
					//alert("AgentRecordStart 录音成功  ,"+strAgentExtNo+","+strCallRefID+","+strRecordFile+","+strRecordData);
					writeLog("录音开始事件, AgentRecordStart() : " + strAgentExtNo + "," + strCallRefID + "," + strRecordFile + "," + strRecordData);
					recordingPath1=strRecordFile;
					
					writeLog("开始录音");
				}catch (e){
					alert("AgentRecordStart Exception:"+e);
				}
			}
			//断开连接 事件
			function AgentEvtDisconnectSP(){
				try{
					//agentStatus = "Calling";
					writeLog("index.jsp坐席挂断软电话，进入onReleaseEvent事件; parent.window.signMark = " + signMark);
					document.getElementById('callTime').innerText = "来电时间：";
					document.getElementById('callAddress').innerText = "来电号码：";
					
					callAddressInfo("null");
					if(signMark == "" || callCount == 0){
						updateRingingCTI(0);   //记录30秒未接电话后，修改振铃结束时间
					}else{
						//表示电话已经接通，客户办理完业务座席主动挂断电话，修改通话结束时间
						updateCallInfoCTI();
					}
					callCount=0;
					endTime = new Date().pattern("yyyy-MM-dd HH:mm:ss");
					//挂断电话开始计时跟进时间；
					changeCallflag(1,endTime,callID);
					setMyocxInfo(1,"");
					setMyocxInfo(0,"");
					//agenthangup();
					//Regagentdisconn();  //调用挂断响应事件，
						
					writeLog("index.jsp进入SoftPhone -> OnReleaseEvent() 事件中....");
				 	//关闭C#form窗口
				 	BusFormClose();
				 	writeLog("index.jsp调用完关闭Form方法");

				}catch (e){
					alert("AgentEvtDisconnect Exception:"+e);
				}
			}
			//停止录音事件
			function AgentRecordStop(strAgentExtNo, strCallRefID, strRecordFile, strRecordData){
				try{
					writeLog("停止录音事件 AgentRecordStop();");
					//alert("AgentRecordStart 停止录音成功  ,"+strAgentExtNo+","+strCallRefID+","+strRecordFile+","+strRecordData);
				}catch (e){
					alert("AgentRecordStop Exception:"+e);
				}
			}
			//小休状态事件
			function AgentEvtStateRest(strWorkNo, strExtNo, iRestType, strRestData){
				try{
					agentStatus = "Resting";
					afterWorkFlag = false;
					writeLog("进入小休状态 AgentEvtStateRest , strWorkNo=" + strWorkNo + ",strExtNo=" + strExtNo + ",iRestType=" + iRestType +",strRestData=" + strRestData);
					writeLog("signMark初始值："+signMark+"-");
					if(statusRest != "" && signMark != "5"){
						updateRestCTI();
					}else {
						//在此还需判断是否修改事后处理结束时间....
						if(signMark == "5"){
							updateAfterWorkCTI();
						}
						//如果座席进入小休状态，进入跟进状态后才记录后台数据
					}
					saveOrUpdateRestCTI(iRestType);  //后台计时
					stopTime_1(1);
					if(iRestType == 1){
						setTimeLeave_1();
					}else{
						writeLog("停止计算离开时间...");
						stopTime_1(2);
					}
					if(iRestType == 0){
						statusRest = "6";  //特殊情况：选择用餐时暂用6表示
						signMark = "6";  //特殊情况：选择用餐时暂用6表示
					}else{
						statusRest = iRestType;
						signMark = iRestType;
					}
				}catch(e){
					alert("AgentEvtStateRest Exception:"+e);
				}
			}
			//准备好了事件 
			function AgentEvtStateReady(strWorkNo, strExtNo, strReadyData){
				try{
					if(!afterWorkFlag){
						agentStatus = "GetReady";
						stopTime_1(2);  //停止计时
						writeLog("坐席点击准备好了;");
						//parent.window.stopTime(2);
						
						updateRestCTI();
						statusRest = "";
						signMark = "";
					}
					
				}catch(e){
					alert("AgentEvtStateReady Exception:"+e);
				}
			}
			//挂断电话进入事后处理事件
			function AgentEvtStateAfterCall(strWorkNo, strExtNo, strAfterCallData){
				try{
					agentStatus = "AfterWorking";
					afterWorkFlag = true;
					writeLog("AgentEvtStateAfterCall().......");
					document.getElementById('CallInImage').src = str+"/softphone1/newqmanager/img/laidian-1.jpg";  //变成红色  按钮
					document.getElementById('ClosePhoneImage').src = str+"/softphone1/newqmanager/img/guaduan-1.jpg";
					document.getElementById('imgLogin').src = str+"/softphone1/newqmanager/img/logout-1.jpg";
					document.getElementById('rest').disabled = false;
					document.getElementById('imgZhunbei').src = str+"/softphone1/newqmanager/img/zhunbei-1.jpg";
					document.getElementById('rest').value = "0";document.getElementById('restStatus').innerText = "状态：跟进";
					writeLog("AgentEvtStateAfterCall 挂断电话进入事后处理事件-开始计时   "+signMark+"-");
					setTimeGJ_1();
					saveOrUpdateAfterWorkCTI();
					stopTime_1(100);
					
				}catch(e){
					alert("AgentEvtStateAfterCall Exception:"+e);
				}
			}
			//取消事后处理事件
			function AgentEvtStateCancelAfterCall (strWorkNo, strExtNo, strAfterCallData){
				try{
					agentStatus = "GetReady";
					signMark = "";
					writeLog("AgentEvtStateCancelAfterCall 取消事后处理事件-停止计时   " +strWorkNo+ ","+strExtNo+","+strAfterCallData);
					stopTime_1(1);
					updateAfterWorkCTI();
				}catch(e){
					alert("AgentEvtStateCancelAfterCall Exception:"+e);
				}
			}
			
			function save_cti_data(status){
				writeLog("save_cti_data(status)," + status);
				switch(status){
					case "Calling":
						updateCallInfoCTI();
						break;
					case "Ringing":
						updateRingingCTI(1);
						break;
					case "AfterWork":
						updateAfterWorkCTI();
						break;
					case "Resting":
						updateRestCTI();  //当消息时出现了服务崩溃需要修改rest表结束时间
						break;
					case "GetReady":
						updateLogOutCTI();  //当空闲状态出现了服务崩溃就需要修改login表登出时间
						break;
				}
			}
			
			function AgentEvtServerDown(strEventData){
				try{
					//服务器故障
					document.getElementById('ErrorInfo').innerText = "服务器故障，请注销ECCRM系统，重新登录！";
					writeLog("AgentEvtServerDown(strEventData)...");
					document.getElementById("showError").style.display = 'block';
					document.getElementById("soft_div_tit").style.display = 'none';
					//save_cti_data(agentStatus);
					agentStatus = "";
					AgentEvtLogout("","","","");
				}catch(e){
					alert("AgentEvtServerDown(strEventData)  Exception");
				}
			}
			
			function AgentEvtServerDisconnect(strEventData){
				try{
					//网络连接断开
					document.getElementById('ErrorInfo').innerText = "网络连接断开，请注销ECCRM系统，重新登录！";
					writeLog("AgentEvtServerDisconnect(strEventData)...");
					document.getElementById("showError").style.display = 'block';
					document.getElementById("soft_div_tit").style.display = 'none';
					save_cti_data(agentStatus);
					agentStatus = "";
					AgentEvtLogout("","","","");
				}catch(e){
					alert("AgentEvtServerDisconnect(strEventData)  Exception");
				}
			}
			
			
			/**********************************************************************************
			****************	新版软电话对应事件函数 *******************************************
			****************	end					*******************************************
			****************	Fernando_Hu		 	*******************************************
			***********************************************************************************/
			
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
			var machineSelfId = "2";
			//--------------------针对报表记录------------------------
			var AddSDate = "";
			var AddEDate = "";
			var AddWDno = "";
			var AddGYno = "";
			var ConSDate = "";
			var ConEDate = "";
			var ConWDno = "";
			var ConGYno = "";
			
			//-------------------------------------------------------
			var BS_num = 0 ;        //接收后台 Operation表中取出的 BS_Num 字段最大的值
			var cti_loginTime = "";  //记录软电话登录时间
			var systemLoginTime = ""; //登录系统时间
			var systemOutTime = "";  //登出系统时间
			var errorCloseForm = "true" ; //标记关闭IE时是异常关闭还是正常关闭
			
			var YesOrNo_FUND = "";   //开借记卡
			var obj= Ext.util.JSON.decode(userInfo);
			// 取得当前登录用户的相关信息，包括权限
			var users = obj.user;
			var curUserInfo_1 = new UserInfo(users);
			
			var indexCount = 0;   //成员变量 判断考勤表中存储第一次登录CTI的时间
			
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
			//读取agent.config配置文件的phoneNum
			var phoneNum = "";
			var statusRest = "";
			var signMark = "";  //标记最后一次进入小休是什么状态
			var CallNum = "";   //标记本通电话的来电话机号码
			var conAttachX = ""; 
			//0表示未登出，1表示已经修改了登出时间，在此调用时，我需要修改
			var logoutStatus = 0;  
			
			
			function isGranted_1(funKey){
				if(curUserInfo_1.rights.indexOf('__ALL')!=-1){
					return true;
				}
				if(curUserInfo_1.rights.indexOf(funKey)!=-1){
					return true;
				}
				return false;
			}
			
			
			//禁止用F5键     
			function ppPressF5(){  
				//jsLog(logStrMsg("signMark=" + signMark,"INFO"));
				var ev = window.event; //获取event对象
				var obj = ev.target || ev.srcElement; //获取事件源
				var t = obj.type || obj.getAttribute('type'); //获取事件源类型
				//jsLog(logStrMsg("ppPressF5() = "+event.keyCode,"INFO"));   
			    if(event.keyCode==116){
			   	   jsLog(logStrMsg("--->ppPressF5()-屏蔽F5","INFO"));   
			       event.keyCode=0;   
			       event.returnValue=false;    
			       return false;     
			    }else if(event.keyCode == 115 && event.altKey){  
				   jsLog(logStrMsg("--->ppPressF5()-屏蔽Alt + F4","INFO"));
				   event.keyCode=0;   
				   event.altKey = false;
			       event.returnValue=false;    
			       window.showModelessDialog("about:blank", "", "dialogWidth:1px;dialogheight:1px");  
			       return false;     
				} else if((event.keyCode == 8) && (t != "password" && t != "text" && t != "textarea" && t != "combobox")){
					jsLog(logStrMsg("--->ppPressF5()-屏蔽backSpace","INFO"));
					event.keyCode=0;   
			        event.returnValue=false;   
					return false;
				}  
			} 
			
			
			function doKey(e){
				//jsLog(logStrMsg("--->doKey = " + e,"INFO"));
				//jsLog(logStrMsg("doKey();","INFO"));
				var TermID = "";  //
				var SiteID = "";
				var ev = e || window.event; //获取event对象
				var obj = ev.target || ev.srcElement; //获取事件源
				var t = obj.type || obj.getAttribute('type'); //获取事件源类型
				if(ev.keyCode == 116){
					jsLog(logStrMsg("--->屏蔽F5","INFO"));
					return false; 
				}else if(ev.altKey && ev.keyCode == 115){  
					jsLog(logStrMsg("--->屏蔽Alt + F4","INFO"));
					//window.showModelessDialog("about:blank", "", "dialogWidth:1px;dialogheight:1px");  
					return false;
				}else if(ev.altKey && (ev.keyCode == 37 || ev.keyCode == 39)){  
					jsLog(logStrMsg("--->屏蔽Alt + 方向键","INFO"));
					return false;
				}else if(ev.ctrlKey && ev.keyCode == 78){  
					jsLog(logStrMsg("---屏蔽Ctrl + n 打开当前新页面键","INFO"));
					return false;
				}else if(ev.ctrlKey && ev.keyCode == 82){  
					jsLog(logStrMsg("---屏蔽Ctrl + r 刷新","INFO"));
					return false;
				}else if(ev.altKey && ev.keyCode == 82){  
					jsLog(logStrMsg("---屏蔽alt+R 刷新键","INFO"));
					return false;
				}else if(ev.keyCode == 112){  
					jsLog(logStrMsg("---屏蔽F1 刷新键","INFO"));
					return false;
				}else if((ev.keyCode == 8) && (t != "password" && t != "text" && t != "textarea" && t != "combobox")){
					jsLog(logStrMsg("--->屏蔽backSpace","INFO   "));
					return false;
				}
 			}
			
			
			//////////////////////////////////////////////////CTI-DATA//////////////////////////////////////////////////////
			
			/**
			LOGINTIME	VARCHAR2(128)	Y		登录时间
			LOGOUTTIME	VARCHAR2(128)	Y		登出时间
			LOGDATE		VARCHAR2(128)	Y		登录日期
			LAGENTID	VARCHAR2(128)	Y		坐席ID
			LMACHINEID	VARCHAR2(128)	Y		话机号
			*/
			function saveOrUpdateLoginCTI(){
				jsLog(logStrMsg("登录软电话 数据录入","INFO"));
				var loginDate = new Date().format("yyyy-MM-dd");
				try {
					Ext.Ajax.request({
								url : __ctxPath + '/customer/saveOrUpdateLoginCTIConHis.do',
								method : 'post',
								async: false,
								params : {
								//参数更换...
									loginDate : loginDate,
									machineID : machineID,
									agentID : curUserInfo_1.username
								},
								success : function(response, options){
									jsLog(logStrMsg("saveOrUpdateLoginCTI SUCCESS"  ,"INFO"));
								},
								failure : function(response, options){
									jsLog(logStrMsg("saveOrUpdateLoginCTI failure:" + options ,"ERROR"));
								}
							});
				} catch (e) {
					jsLog(logStrMsg("Exception saveOrUpdateLoginCTI() catch: " + e,"ERROR"));
				}
			}
			
			function updateLogOutCTI(){
				jsLog(logStrMsg("登出软电话 数据修改","INFO"));
				//需要查询当前座席工号最近的一笔登录的记录的ID，再更改该ID的登出时间即可
				try {
					Ext.Ajax.request({
								url : __ctxPath + '/customer/updateLogOutCTIConHis.do',
								method : 'post',
								async: false,
								params : {
								//参数更换...
									agentID : curUserInfo_1.username
								},
								success : function(response, options){
									jsLog(logStrMsg("updateLogOutCTI SUCCESS"  ,"INFO"));
									logoutStatus = 1;
								},
								failure : function(response, options){
									jsLog(logStrMsg("updateLogOutCTI failure:" + options ,"ERROR"));
								}
							});
				} catch (e) {
					jsLog(logStrMsg("Exception updateLogOutCTI() catch: " + e,"ERROR"));
				}
			}
			/*
			RSTARTTIME	VARCHAR2(128)	Y		小休开始时间
			RENDTIMEVA	VARCHAR2(128)	Y		小休结束时间
			RDATE		VARCHAR2(128)	Y		小休日期
			RAGENTID	VARCHAR2(128)	Y		坐席工号
			RMACHINEID	VARCHAR2(128)	Y		话机号
			*/
			function saveOrUpdateRestCTI(type){
				jsLog(logStrMsg("软电话小休状态录入表... type = " + type,"INFO"));
				//小休类别 、 开始时间、结束时间、日期、座席工号、话机号
				var rDate = new Date().format("yyyy-MM-dd");
				try {
					Ext.Ajax.request({
								url : __ctxPath + '/customer/saveOrUpdateRestCTIConHis.do',
								method : 'post',
								async: false,
								params : {
								//参数更换...
									rDate : rDate,
									rType : type,
									rAgentID : curUserInfo_1.username,
									rMachineID : machineID
								},
								success : function(response, options){
									jsLog(logStrMsg("saveOrUpdateRestCTI SUCCESS"  ,"INFO"));
								},
								failure : function(response, options){
									jsLog(logStrMsg("saveOrUpdateRestCTI failure:" + options ,"ERROR"));
								}
							});
				} catch (e) {
					jsLog(logStrMsg("Exception saveOrUpdateRestCTI() catch: " + e,"ERROR"));
				}
			}
			function updateRestCTI(){
				//staType 用来表示是 0:直接点击准备好了 , 1:切换致其他小休状态
				//type   表示什么小休状态，要从SUCCESS中调用insertRestCTI开始后台计数
				jsLog(logStrMsg("软电话小休完毕准备好了或者直接切换其他小休状态录入表...","INFO"));
				try {
					Ext.Ajax.request({
								url : __ctxPath + '/customer/updateRestCTIConHis.do',
								method : 'post',
								async: false,
								params : {
									rAgentID : curUserInfo_1.username
								},
								success : function(response, options){
									jsLog(logStrMsg("updateRestCTI SUCCESS"  ,"INFO"));
								},
								failure : function(response, options){
									jsLog(logStrMsg("updateRestCTI failure:" + options ,"ERROR"));
								}
							});
				} catch (e) {
					jsLog(logStrMsg("Exception updateRestCTI() catch: " + e,"ERROR"));
				}
			}
			/*
			ASTARTTIME	VARCHAR2(128)	Y		事后处理开始时间
			AENDTIME	VARCHAR2(128)	Y		事后处理结束时间
			ADATE		VARCHAR2(128)	Y		事后处理日期
			AAGENTID	VARCHAR2(128)	Y		坐席工号
			AMACHINEID	VARCHAR2(128)	Y		话机号
			*/
			function saveOrUpdateAfterWorkCTI(){
				jsLog(logStrMsg("进入事后处理录入表数据...","INFO"));
				var aDate = new Date().format("yyyy-MM-dd");
				try {
					Ext.Ajax.request({
								url : __ctxPath + '/customer/saveOrUpdateAfterWorkCTIConHis.do',
								method : 'post',
								async: false,
								params : {
									aDate : aDate,
									aAgentID : curUserInfo_1.username,
									aMachineID : machineID
								},
								success : function(response, options){
									jsLog(logStrMsg("saveOrUpdateAfterWorkCTI SUCCESS"  ,"INFO"));
								},
								failure : function(response, options){
									jsLog(logStrMsg("saveOrUpdateAfterWorkCTI failure:" + options ,"ERROR"));
								}
							});
				} catch (e) {
					jsLog(logStrMsg("Exception saveOrUpdateAfterWorkCTI() catch: " + e,"ERROR"));
				}
			}
			function updateAfterWorkCTI(){
				jsLog(logStrMsg("准备好了，取消事后处理更改表数据...","INFO"));
				try {
					Ext.Ajax.request({
								url : __ctxPath + '/customer/updateAfterWorkCTIConHis.do',
								method : 'post',
								async: false,
								params : {
									agentID : curUserInfo_1.username
								},
								success : function(response, options){
									jsLog(logStrMsg("updateAfterWorkCTI SUCCESS"  ,"INFO"));
								},
								failure : function(response, options){
									jsLog(logStrMsg("updateAfterWorkCTI failure:" + options ,"ERROR"));
								}
							});
				} catch (e) {
					jsLog(logStrMsg("Exception updateAfterWorkCTI() catch: " + e,"ERROR"));
				}
			}
			
			/*
			RSTARTTIME	VARCHAR2(128)	Y		振铃时间
			RDATE		VARCHAR2(128)	Y		振铃日期
			RAGENTID	VARCHAR2(128)	Y		坐席工号
			CALLID		VARCHAR2(128)	Y		振铃开始时间
			MACHINEID	VARCHAR2(128)	Y		话机号
			*/
			function saveOrUpdateRingingCTI(Num,call_id){
				jsLog(logStrMsg("开始插入振铃原始数据...call_id = " + call_id,"INFO"));
				CallNum = Num;
				var rDate = new Date().format("yyyy-MM-dd");
				try {
					Ext.Ajax.request({
								url : __ctxPath + '/customer/saveOrUpdateRingingCTIConHis.do',
								method : 'post',
								async: false,
								params : {
									rDate : rDate,
									rAgentID : curUserInfo_1.username,
									rCallID : call_id,
									rCallNum : Num,
									rMachineID : machineID
								},
								success : function(response, options){
									jsLog(logStrMsg("saveOrUpdateRingingCTI SUCCESS"  ,"INFO"));
								},
								failure : function(response, options){
									jsLog(logStrMsg("saveOrUpdateRingingCTI failure:" + options ,"ERROR"));
								}
							});
				} catch (e) {
					jsLog(logStrMsg("Exception saveOrUpdateRingingCTI() catch: " + e,"ERROR"));
				}
			}
			function updateRingingCTI(type){
				jsLog(logStrMsg("[振铃结束]-看是接通结束振铃还是挂断结束振铃... type = " + type,"INFO"));
				try {
					Ext.Ajax.request({
								url : __ctxPath + '/customer/updateRingingCTIConHis.do',
								method : 'post',
								async: false,
								params : {
									rAgentID : curUserInfo_1.username,
									rType : type
								},
								success : function(response, options){
									jsLog(logStrMsg("updateRingingCTI SUCCESS"  ,"INFO"));
								},
								failure : function(response, options){
									jsLog(logStrMsg("updateRingingCTI failure:" + options ,"ERROR"));
								}
							});
				} catch (e) {
					jsLog(logStrMsg("Exception updateRingingCTI() catch: " + e,"ERROR"));
				}
			}
			
			//来电通话时长数据记录
			function saveOrUpdateCallInfoCTI(){
				jsLog(logStrMsg("插入通话开始时间原始数据...  来电号码："+CallNum,"INFO"));
				var cDate = new Date().format("yyyy-MM-dd");
				try {
					Ext.Ajax.request({
								url : __ctxPath + '/customer/saveOrUpdateCallInfoCTIConHis.do', 
								method : 'post',
								async: false,
								params : {
									cDate : cDate,
									cCallNum : CallNum,
									cAgentID : curUserInfo_1.username,
									cMachineID : machineID
								},
								success : function(response, options){
									jsLog(logStrMsg("saveOrUpdateCallInfoCTI SUCCESS"  ,"INFO"));
								},
								failure : function(response, options){
									jsLog(logStrMsg("saveOrUpdateCallInfoCTI failure:" + options ,"ERROR"));
								}
							});
				} catch (e) {
					jsLog(logStrMsg("Exception saveOrUpdateCallInfoCTI() catch: " + e,"ERROR"));
				}
			}
			function updateCallInfoCTI(){
				jsLog(logStrMsg("[通话结束]需要记录听话结束时间段... ","INFO"));
				try {
					Ext.Ajax.request({
								url : __ctxPath + '/customer/updateCallInfoCTIConHis.do',
								method : 'post',
								async: false,
								params : {
									cAgentID : curUserInfo_1.username
								},
								success : function(response, options){
									jsLog(logStrMsg("updateCallInfoCTI SUCCESS"  ,"INFO"));
								},
								failure : function(response, options){
									jsLog(logStrMsg("updateCallInfoCTI failure:" + options ,"ERROR"));
								}
							});
				} catch (e) {
					jsLog(logStrMsg("Exception updateCallInfoCTI() catch: " + e,"ERROR"));
				}
			}
			
			///////////////////////////////////////////////////CTI-DATA/////////////////////////////////////////////////////
			//////////
			//js计时器
			/////
			 var hour = 0; minute = 0; second = 0;
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
					
					hour = parseInt(t2/60/60);
					minute = parseInt(t2/60%60);
					second = parseInt(t2%60);
					Ext.get('loginTime').dom.value = hour+" : "+minute+" : "+second;
					t2 = t2 + 1 ;
					flag3 = setTimeout("setTimeLogin()",1000);
					
				}
				function biaoLoginTime (){
					//document.onkeydown = doKey;
					jsLog(logStrMsg("document.onkeydown = doKey; or indexCount=" + indexCount,"INFO"));
					//登录登出记录报表计数
					if(indexCount == 0){
						cti_loginTime = new Date().format("yyyy-MM-dd hh:mm:ss");
						indexCount = 1;
					}
					
					jsLog(logStrMsg("登录CTI时间是：" + cti_loginTime,"INFO"));
					if(curUserInfo_1.username != "admin" && curUserInfo_1.username != "V1000"){
						insertOperationData(BS_num,new Date().format("yyyy-MM-dd hh:mm:ss"),"登录CTI");
					}
					saveOrUpdateLoginCTI();
				}
				function stopTime(type){
					if(type == 3){
						clearTimeout(flag3);//停止登录时间
						clearTimeout(flag2);//停止小休时间
						clearTimeout(flag1);
						if(logoutStatus == 0){
							updateLogOutCTI();
						}
					}else if(type == 2){
						clearTimeout(flag2);//停止小休时间
					}else if(type == 1){
						jsLog(logStrMsg("stopTime () clearTimeOut flag1 = 1" ,"INFO"));
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
										var response = Ext.util.JSON.decode(response.responseText);
										conhisId = response.conHisId;
										_conHisId = response.conHisId;
										//alert("#createHisConHis:");
										//拼接参数字符串，暂时有客户id，呼入电话及联络记录id
										var _cfg = customerId + ','+ CALLINNO + ','+ conhisId + ','+ serviceRequestId+ ',' + planId + ',' + customerNo + ',' 
										+ callinId + "," + curagent.user.photo;
										//jsLog("走你！");
										
										
										var one = _cfg.split(',')[1].substring(0,1);
										if(one == "2"){
											TermID = "T" + _cfg.split(',')[1].substring(1);
										}else if(one == "3"){
											TermID = "C" + _cfg.split(',')[1].substring(1);
										}
										
										jsLog(TermID);
										jsLog("S" + (_cfg.split(',')[1] + "").substring(1));
										//TermID = "T" + (_cfg.split(',')[1] + "").substring(1);
										SiteID =  "S" + (_cfg.split(',')[1] + "").substring(1);
										var dealno = TermID + new Date().pattern('yyyyMMddHHmm');
										jsLog("流水号："+dealno);
										updatedealNum(_conHisId,"未知",dealno);
										
										VtmAgentInit(TermID,SiteID+","+call_ipAddress);
										jsLog(logStrMsg("调用完Video所有接口并渲染完JS之后查看strCallMessage_1值 = "+strCallMessage_1,"INFO")); //记录日志
										//-------------------给设备号复制----------
										Regagentconn_1(strCallMessage_1);
										//关闭左侧导航
										/**
										Ext.getCmp('westPanel').collapse();
										App.clickTopTab("CusPersonalFormCallin",_cfg,function() {},function(){
											var tid = window.setInterval(function(){
												if(typeof(CusPersonalFormCallin) != 'undefined'){
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
										**/
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
				//App.clickTopTab("CusPersonalFormCallin","");
				document.getElementById("showError").style.display = 'block';
				document.getElementById("soft_div_tit").style.display = 'none';
				//App.clickTopTab("IndexPage","");
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
								_conHisId = response.conHisId;
								jsLog(logStrMsg("callInsertData(callno = "+callno+")  插入后台conHis数据成功返回id="+_conHisId,"INFO"));
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
				//manageCallNum = manageCallNum + 1 ;
				//Ext.get('callNum').dom.value = manageCallNum;  //每接一通电话，处理电话个数将加1
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
				//测试发现刷新后获取不到弹屏页面的videoocx，说明已经释放了。
				//var videoocx = document.getElementById("videoocx");
				killer("allOcx", "myocx");
				killer("app-header", "soft_div_tit");
				/**测试卸载后是否还有*/
				//myocx = document.getElementById("myocx");
				//测试发现刷新后获取不到弹屏页面的videoocx，说明已经释放了。
				//videoocx = document.getElementById("videoocx");
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
							<a href="#" onclick="javascript:opencallin();">来电111</a> 
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
				style="position: absolute; float: right; right: 0px; margin-top:-3px; width:888px; height:70px;">
				
				<!-- 将软电话写在index.jsp中，为了不让ocx初始化两次 -->
				  <table width="887" border="0" style="background-image:url(<%=basePath%>/softphone1/newqmanager/img/beijingtu-1.jpg); background-repeat:repeat;">
					    <tr>
					      <td width="70" rowspan="2"><img id="CallInImage" src = "<%=basePath%>/softphone1/newqmanager/img/laidian-1.jpg" style="background-repeat:space"/></td>
					      <td width="150" height="32"><font style="color:#ACFB37;" id="callAddress" size="3">来电号码: </font></td>
					      <td width="70" rowspan="2"><input type="image" id="ClosePhoneImage" onClick="imgClosePhone()" src = "<%=basePath%>/softphone1/newqmanager/img/guaduan-1.jpg" style="background-repeat:space" ></td>
					      <td width="140" >
					      <div style="background-image:url(<%=basePath%>/softphone1/newqmanager/img/textBeijing.jpg);">
					        <select name="select" disabled="true" id="rest" onClick="selectClick();" onChange="selectChange()" style="background-image:url(<%=basePath%>/softphone1/newqmanager/img/textBeijing.jpg);width:130;font-size:20px;">
					          <option value="0" selected >--请选择--</option>
					          <option value="1">就餐</option>
					          <option value="2">离开</option>
					          <option value="3">临时工作</option>
					          <option value="4">管理</option>
					          <option value="5">培训</option>
					        </select>
					        </div>
					      </td>
					      <td width="70" rowspan="2"><input type="image" id="imgZhunbei" onClick="zhunbei()" src = "<%=basePath%>/softphone1/newqmanager/img/zhunbei-0.jpg" style="background-repeat:space"></td>
					      <td width="70" rowspan="2" ><input type="image" id="imgLogin" onClick="imglog()" src = "<%=basePath%>/softphone1/newqmanager/img/logout-0.jpg" style="background-repeat:space" ></td>
					      <td width="67" align="center"><font style="color:#ACFB37;" size="3">离开时间</font></td>
					      <td width="68" align="center"><font style="color:#ACFB37;" size="3">登录时间 </font></td>
					      <td width="69" align="center"><font style="color:#ACFB37;" size="3">跟进时间 </font></td>
					      <td width="71" align="center"><font style="color:#ACFB37;" size="3">接听个数</font></td>
					    </tr>
					    <tr>
					      <td height="21"><font style="color:#ACFB37;" id="callTime" size="3">来电时间: </font></td>
					      <td>
					      	[<font style="color:red;" size="2" id="machineNum"></font>]
					      	<font style="color:#ACFB37;" size="2" id="restStatus">状态：未登录</font>
					      </td>
					      <td align="center"><font style="color:#F00;" size="2">
					        <input name="textfield8" type="text" id="leaveTime" value="0:0:0" disabled=true size="5">
					      </td>
					      <td align="center"><font style="color:#F00;" size="2">
					        <input name="textfield9" type="text" id="loginTime" value="0:0:0" disabled=true size="5">
					      </td>
					      <td align="center"><font style="color:#F00;" size="2">
					        <input name="textfield10" type="text" id="GenJinTime" value="0:0:0" disabled=true size="5">
					      </td>
					      <td align="center"><font style="color:#F00;" size="2">
					        <input name="textfield" type="text" id="CallNum" value="" size="1">
					      </td>
					    </tr>
					  </table>
			</div>
			
			<div id="showError"
				style="position: absolute; float: right; right: 0px; margin-top:-3px; width:888px; height:70px; background-image:url(<%=basePath%>/softphone1/newqmanager/img/showError.png);display: none;" >
				<div style="padding-top:20px;">
					<h1 align="center" style="color:yellow;padding-top:12px; font-size:14px;" id="ErrorInfo"></h1><br/>
					
				</div>
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