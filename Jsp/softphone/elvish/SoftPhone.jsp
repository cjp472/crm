<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html lang="en">

<!-- 
Smart developers always View Source. 

This application was built using Adobe Flex, an open source framework
for building rich Internet applications that get delivered via the
Flash Player or to desktops via Adobe AIR. 

Learn more about Flex at http://flex.org 
// -->

<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

<!--  BEGIN Browser History required section -->
<link rel="stylesheet" type="text/css" href="history/history.css" />
<!--  END Browser History required section -->

<title></title>
<script>function $(objId){return document.getElementById(objId);}</script>
<script>function $v(objId){return document.getElementById(objId).value;}</script>
<SCRIPT language=javascript src="./AC_OETags.js"></SCRIPT>
<SCRIPT language=javascript src="./spext.js"></SCRIPT>
<SCRIPT language=javascript src="./date.js"></SCRIPT>
<SCRIPT language=javascript src="history/history.js"></SCRIPT>

<style>
body { margin: 0px; overflow:hidden }
</style>
<script language="JavaScript" type="text/javascript">
//------------------------------------------------对时间的格式化---------------------------------------------------
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

//---------------------------------------------------------------------------------------------------------------
function placeCall(phone){
		var swfObj = document.getElementById('SoftPhone');
		swfObj.jsPlaceCall(phone);
		
}
var recordingPath1 = '';
var callCount = 0;
var starTime = "";
var endTime = "";
var ringingCount = 0;

function inboundCall(callID, remoteNo, localNo, agentUID, isComing, bridgeDateTime, turnOnDateTime, recordingPath, ivrTrace, otherData	){

		if(callCount == 0){
			releaseCount = 0;
			parent.window.stopTime(100);
			parent.window.signMark = "5";
			ringingCount = 0;
			parent.window.updateRingingCTI(1);
			parent.window.saveOrUpdateCallInfoCTI();
		    starTime = new Date().pattern("yyyy-MM-dd hh:mm:ss");
			callCount++;
			//alert("呼入"+callID+" "+remoteNo+" "+localNo+" "+agentUID+" "+isComing+" "+bridgeDateTime+" "+turnOnDateTime+" "+recordingPath+" "+ivrTrace+" "+otherData);
			var routeDatas = callID+","+remoteNo+","+localNo+","+agentUID+","+isComing+","+bridgeDateTime+","+turnOnDateTime+","+recordingPath+","+ivrTrace+","+otherData + "," + "asdasdasdasdasd051109";
			ext_onInboundCall(callID, turnOnDateTime, remoteNo, routeDatas);
			recordingPath1=recordingPath;
			parent.window.setMyocxInfo(1,"");
			parent.window.setMyocxInfo(0,"");
			setTimeout('keepfile()', 10000);
			
			//keepfile();
			//alert("----recordingPath:" + recordingPath);	
		}
}
function outboundCall(callID, remoteNo, localNo, agentUID, isComing, bridgeDateTime, turnOnDateTime, ispredict, ivrTrace, otherData	){
		//alert("呼出"+callID+" "+remoteNo+" "+localNo+" "+agentUID+" "+isComing+" "+bridgeDateTime+" "+turnOnDateTime+" "+ispredict+" "+ivrTrace+" "+otherData);
		var routeDatas = callID+","+remoteNo+","+localNo+","+agentUID+","+isComing+","+bridgeDateTime+","+turnOnDateTime+","+ispredict+","+ivrTrace+","+otherData;
		ext_onOutboundCall(callID, turnOnDateTime, remoteNo, routeDatas);	
		
}
var releaseCount = 0;
//挂断电话赋值变量
function onReleaseEvent(callID,	releaseDateTime	){
			if(releaseCount == 0){
				releaseCount ++;
				parent.window.writeLog("old SIP 坐席挂断软电话，进入onReleaseEvent事件; parent.window.signMark = " + parent.window.signMark);
				callCount=0;
				//alert("挂机"+callID+" "+releaseDateTime);
				closecallflag = 1;
				
				parent.window.callAddressInfo("null");
				if(parent.window.signMark == ""){
					ringingCount = 0;
					parent.window.updateRingingCTI(0);   //记录30秒未接电话后，修改振铃结束时间
				}else{
					//表示电话已经接通，客户办理完业务座席主动挂断电话，修改通话结束时间
					parent.window.updateCallInfoCTI();
				}
				if(callID && callID!='undefined'){
					endTime = new Date().pattern("yyyy-MM-dd hh:mm:ss");
					afterWork();
					//挂断电话开始计时跟进时间；
					parent.window.setTimeGJ();
					parent.window.saveOrUpdateAfterWorkCTI();
					//清楚来电区域闪烁
					parent.window.stopTime(100);
					parent.window.changeCallflag(1,endTime,callID);
					//setMyocxInfo(1,"");setMyocxInfo(0,"");
					parent.window.setMyocxInfo(1,"");
					parent.window.setMyocxInfo(0,"");
					parent.window.agenthangup();
					parent.window.Regagentdisconn();  //调用挂断响应事件，
					//document.all.wavfile.src = "recording.jsp?recordId="+callID + "&cti_ip=" + nodeip;
				}
				ext_onReleaseEvent(callID, releaseDateTime);
				parent.window.writeLog("进入SoftPhone -> OnReleaseEvent() 事件中....");
			 	//关闭C#form窗口
			 	parent.window.BusFormClose();
			 	parent.window.writeLog("调用完关闭Form方法");
			}
			
}



function keepfile(){
	//alert("----------starTime------------"+starTime);
	parent.window.saveWav(recordingPath1,starTime);
}
/**
	 * 取消坐席小休
	 * 
	 * @param
	 */
function unRest(){
		var swfObj = document.getElementById('SoftPhone');
		swfObj.jsUnRest();
		//alert("1111");
		setTimeout('logoff()',200);
}
/**
	 * 坐席登出
	 * 
	 * @param
	 */
function logoff(){
		var swfObj = document.getElementById('SoftPhone');   
		swfObj.jsLogoff();
		
}
/**
	 * 坐席事后处理
	 * 
	 * @param 事后处理类型。1：呼入。2：呼出。3：多媒体。4：其他。
	 */
function afterWork(){
		var swfObj = document.getElementById('SoftPhone');   
		swfObj.jsAfterWork(1);
}

function rest(){
		var swfObj = document.getElementById('SoftPhone');   
		swfObj.jsRest(2);
}

//node		节点名称
//nodeip		节点IP
//agentUid	坐席编号
//device		设备编号
//agentPwd	坐席密码
function login(node, nodeip, agentUid, device, agentPwd ,username){
		//alert(node+" "+nodeip+" "+agentUid+" "+device+" "+agentPwd+" "+username);
		try{
			var swfObj = document.getElementById('SoftPhone'); 
			
			swfObj.jsLogin(node,nodeip, agentUid, device, agentPwd,username,2);
			//setTimeout('unRest()',150);
			
			hasLogined = true;
			
		}catch(ex){
			hasLogined = false;
			alert("softphone-->login()" + ex);
		}
		//setTimeout("rest();",1000);
}

//挂机时调用Html页面的JavaScript，弹出窗口显示失败信息代码
//1：身份验证失败
//2：登录初始化失败
//3：节点不存在
//4：未找到坐席号码对应的用户
//5：无法将坐席添加到队列中
function loginFail(result){
	alert("loginFail:"+result);
	if(result) {
		hasLogined = false;
		var msg = "未知原因";
		if(result=="1") msg = "身份验证失败";
		else if(result=="2") msg = "登录初始化失败";
		else if(result=="3") msg = "节点不存在";
		else if(result=="4") msg = "未找到坐席号码对应的用户";
		else if(result=="5") msg = "无法将坐席添加到队列中";
		else if(result=="6") msg = "坐席编号为空";
		else if(result=="0") msg = "success";
		alert(result+":"+msg);
		//alert(result+":由于此PC机让其他用户登录并异常退出IE造成该问题！");
		//var paras = "height=260, width=400, left="+(screen.width-400)/2+",top="+(screen.height-260)/2 + ", toolbar=no, menubar=no, scrollbars=no, resizable=no,location=n o, status=no";
		//window.open("./ctidemo/index.jsp", "spsettingwindow", paras);
	}
}
function ringing(no,time,callid){
	parent.window.writeLog("事件:ringing(no,time,callid) ringingCount = " + ringingCount);
	if(ringingCount == 0){
		ringingCount++;
		parent.window.writeLog("收到来电振铃事件日志--〉来电号码："+no+" , callID:"+callid + " , time:" + time);
		parent.window.myocxAgentSetCallRingInfo(no,callid,time);
		parent.window.callAddressInfo(no);
		parent.window.saveCallIdOrAgentName(callid,agent);
		parent.window.saveOrUpdateRingingCTI(no,callid);//AgentSetCallRingInfo
	}else{
		parent.window.writeLog("收到来电振铃时间，但ringingCount不等于0，表示该话机正在振铃 ...");
	}
	
}
function kickOut(mes){
	parent.window.writeLog("被迫下线--〉"+mes);
}
/**
 * 软电话登小休类型事件
 */
function resting(restType){
	//alert(restType);
	parent.window.writeLog("坐席进入小休状态，statusRest初始值："+ parent.window.statusRest +" , 小休类型："+restType+"-->[类型=2时，表示离开状态，并开始计时]");
	parent.window.writeLog("signMark初始值："+parent.window.signMark+"- ");
	if(parent.window.statusRest != "" && parent.window.signMark != "5"){
		parent.window.updateRestCTI();
	}else {
		//在此还需判断是否修改事后处理结束时间....
		if(parent.window.signMark == "5"){
			parent.window.updateAfterWorkCTI();
		}
		//如果座席进入小休状态，进入跟进状态后才记录后台数据
	}
	
	
	
	parent.window.saveOrUpdateRestCTI(restType);  //后台计时
	parent.window.stopTime(1);
	if(restType == 2){
		parent.window.setTimeLeave();
	}else{
		parent.window.writeLog("停止计算离开时间...");
		parent.window.stopTime(2);
	}
	parent.window.statusRest = restType;
	parent.window.signMark = restType;
}
/**
 * 软电话登录成功响应事件
 */
function ctiLogin(){
	//alert("登录");
	parent.window.setTimeLogin();
	parent.window.biaoLoginTime();
	parent.window.logoutStatus = 0;  //重新标记一下该变量，表示处于登录状态
	parent.window.writeLog("坐席进入呼叫平台登录软电话成功并开始计时;");
}
/**
 * 软电话登出响应事件
 */
function ctiLogoff(){
	//alert("登出");
	parent.window.stopTime(3);
	parent.window.writeLog("坐席登出软电话;");
	
	//登出软电话同时，要判断是否需要停止其他状态时间 
	if(parent.window.signMark == "5"){
		parent.window.writeLog("parent.window.updateAfterWorkCTI();");
		parent.window.updateAfterWorkCTI();
	}else if(parent.window.signMark != ""){
		parent.window.writeLog("parent.window.updateRestCTI();");
		parent.window.updateRestCTI();
	}
	
	parent.window.statusRest = "";
	parent.window.signMark = "";
}
/**
 * 准备好了响应事件
 */
function ctiUnRest(){
	//alert("准备好了");
	//parent.window.stopTime(1);
	parent.window.writeLog("坐席点击准备好了;");
	parent.window.stopTime(2);
	
	parent.window.updateRestCTI();
	parent.window.statusRest = "";
	parent.window.signMark = "";
}
function unAfterWork(){
	parent.window.writeLog("取消事后处理状态，停止 计时...");
	//alert("quxiao afterwork");
	parent.window.stopTime(1);
}

function ctiUnWork(){
	parent.window.writeLog("取消事后处理状态，停止 计时...1");
	parent.window.stopTime(1);
	parent.window.updateAfterWorkCTI();
	parent.window.signMark = "";
}

//<!--
// -----------------------------------------------------------------------------
// Globals
// Major version of Flash required
var requiredMajorVersion = 9;
// Minor version of Flash required
var requiredMinorVersion = 0;
// Minor version of Flash required
var requiredRevision = 124;
// -----------------------------------------------------------------------------
// -->
</script>

<script>
	var filePath = "C:\\elvish.properties";
	var node = '';
	var nodeip = '';
	var device = '';
	var cti_ip = '';
	//分机号
	var phoneNum = '';
	var agent = '<%=request.getParameter("agent")%>';
	var username = '<%=request.getParameter("uName")%>';
	var pwd =  '';
	var configSuccess = false;
	//读文件 
	function readFile(){
		try{
			var fso = new ActiveXObject("Scripting.FileSystemObject"); 
			//node=node16&nodeip=192.168.10.16&device=ph-sip-1-node16&agent=5001&pwd=5001
			var f = fso.OpenTextFile(filePath,1);//只读
			var line; 
			while (!f.AtEndOfStream){
				line = f.ReadLine();
				if(line.indexOf('node=')==0) {
					node = line.substring('node='.length,line.length);
				}if(line.indexOf('nodeip=')==0) {
					nodeip = line.substring('nodeip='.length,line.length);
					cti_ip = nodeip;
				}if(line.indexOf('device=')==0) {
					device = line.substring('device='.length,line.length);
					//alert(device);
				}
				//读取话机号
				if(line.indexOf('phoneNum=')==0){
					pwd = line.substring('phoneNum='.length,line.length);
					agent = line.substring('phoneNum='.length,line.length);
					parent.window.phoneNum = line.substring('phoneNum='.length,line.length);
					
				}
			}
			f.Close();
			if(!node || !nodeip || !device || !agent || !pwd || !cti_ip) return false;
		}catch(ex){
			alert("读取配置文件"+filePath+"失败!");
			return false;
		}
		return true;
	}
	
	function init_sp(){
		
		configSuccess = readFile();
		monitorLogin();
	}
	
	var hasLogined = false;
	//监控登录
	function monitorLogin() {
		setTimeout("testlogin()", 5000);
	}
	function testlogin(){
	//alert(pwd);
	
		try{
			if(!hasLogined && configSuccess){
				login(node, nodeip, agent, device, pwd , username);
			}
		} catch (e){
			alert("monitorlogin:" + e);
		}
		//setTimeout("monitorLogin()", 2000);
		
	}
	
		
</script>

</head>

<body scroll="no" BACKGROUND= 'spbg.jpg' style="background-repeat: repeat-x;background-attachment: scroll;margin: auto;"
		onload="init_sp()";>
<script language="JavaScript" type="text/javascript">
<!--
// Version check for the Flash Player that has the ability to start Player Product Install (6.0r65)
var hasProductInstall = DetectFlashVer(6, 0, 65);
// Version check based upon the values defined in globals
var hasRequestedVersion = DetectFlashVer(requiredMajorVersion, requiredMinorVersion, requiredRevision);

if ( hasProductInstall && !hasRequestedVersion ) {
	// DO NOT MODIFY THE FOLLOWING FOUR LINES
	// Location visited after installation is complete if installation is required
	var MMPlayerType = (isIE == true) ? "ActiveX" : "PlugIn";
	var MMredirectURL = window.location;
    document.title = document.title.slice(0, 47) + " - Flash Player Installation";
    var MMdoctitle = document.title;

	AC_FL_RunContent(
		"src", "playerProductInstall",
		"FlashVars", "MMredirectURL="+MMredirectURL+'&MMplayerType='+MMPlayerType+'&MMdoctitle='+MMdoctitle+"",
		"width", "863",
		"height", "74",
		"align", "middle",
		"id", "SoftPhone",
		"quality", "high",
		"bgcolor", "#015e9a",
		"wmode", "transparent", 
		"name", "SoftPhone",
		"allowScriptAccess","sameDomain",
		"type", "application/x-shockwave-flash",
		"pluginspage", "http://www.adobe.com/go/getflashplayer"
	);
} else if (hasRequestedVersion) {
	// if we've detected an acceptable version
	// embed the Flash Content SWF when all tests are passed
	AC_FL_RunContent(
			"src", "SoftPhone",
			"width", "863",
			"height", "74",
			"align", "middle",
			"id", "SoftPhone",
			"quality", "high",
			"bgcolor", "#015e9a",
			"wmode", "transparent", 
			"name", "SoftPhone",
			"allowScriptAccess","sameDomain",
			"type", "application/x-shockwave-flash",
			"pluginspage", "http://www.adobe.com/go/getflashplayer"
	);
  } else {  // flash is too old or we can't detect the plugin
    var alternateContent = 'Alternate HTML content should be placed here. '
  	+ 'This content requires the Adobe Flash Player. '
   	+ '<a href=http://www.adobe.com/go/getflash/>Get Flash</a>';
    document.write(alternateContent);  // insert non-flash content
  }
// -->
</script>
<noscript>
  	<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
			id="SoftPhone" width="863" height="74"
			codebase="http://fpdownload.macromedia.com/get/flashplayer/current/swflash.cab">
			<param name="movie" value="SoftPhone.swf" />
			<param name="quality" value="high" />
			<param name="bgcolor" value="#015e9a" />
			<param name="allowScriptAccess" value="sameDomain" />
			<param name="wmode" value="transparent">
			<embed src="SoftPhone.swf" quality="high" bgcolor="#015e9a"
				width="863" height="74" name="SoftPhone" align="middle"
				play="true"
				loop="false"
				quality="high"
				wmode="transparent"
				allowScriptAccess="sameDomain"
				type="application/x-shockwave-flash"
				pluginspage="http://www.adobe.com/go/getflashplayer">
			</embed>
	</object>
</noscript>
<div>
					<iframe id="wavfile" name="wavfile" src='' width="100%" height="104" scrolling="no" frameborder="0"
       	marginheight="0" marginwidth="0"  allowtransparency="true"></iframe></div>
<!--div>
	呼叫ID：<input id="callID" type="text" value="100001111">电话号码：<input id="telNumber" type="text" value="01088888888">
	<input type="button" value="来电" onclick="inboundCall($v('callID'), $v('telNumber'), '1', '1', 'true', getCurrentDatetime(), getCurrentDatetime(), 'false', '', '');">
	<input type="button" value="挂机" onclick="onReleaseEvent($v('callID'),	getCurrentDatetime());">
	<input type="button" value="外呼" onclick="ext_agentCall( $v('telNumber') );">
</div-->
</body>
</html>
