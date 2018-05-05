<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	String agentLoginID = request.getParameter("agent");
	String agentPassword = request.getParameter("agentPassword");
	if(agentPassword==null) agentPassword = agentLoginID;
	String extensionNumber = request.getParameter("extensionNumber");
	String sdkAddress = request.getParameter("sdkAddress");
	
	String datacenter_ip = request.getParameter("datacenter_ip");
	String datacenter_port = request.getParameter("datacenter_port");
	String endFlag = request.getParameter("endFlag");
	
	String isAutoLogin = "1";
	String spEnvFilePath = "C:\\ulinksoftphone\\aicenv.properties";
%>

<html>
<head>
<title>Soft-phone interface</title>
<meta http-equiv=Content-Type content="text/html; charset=utf-8">
<META   HTTP-EQUIV="Pragma"   CONTENT="no-cache">   
<META   HTTP-EQUIV="Cache-Control"   CONTENT="no-cache">   
<META   HTTP-EQUIV="Expires"   CONTENT="0">
<link href="spcss/softphone.css?v20110401_01" rel="stylesheet" type="text/css">
<script>
	function $(id)      {return document.getElementById(id);}
	function $value(id) {try{return document.getElementById(id).value;}catch(e){return "";}}
	function $p(id)     {try{return parent.document.getElementById(id);}catch(e){return null;}}
	function $pvalue(id){try{return parent.document.getElementById(id).value;}catch(e){return "";}}
	function $display(id, displayVal){return $(id).style.display=displayVal;}
	function $v(objId){return document.getElementById(objId).value;}
	function GetHeader(src) {
			 var ForReading=1; 
			 var fso=new ActiveXObject("Scripting.FileSystemObject"); 
			 var f=fso.OpenTextFile(src,ForReading); 
			 return(f.ReadAll()); 
	}
	String.prototype.replaceAll=function(s1,s2){var demo=this;
	 while(demo.indexOf(s1)!=-1){
 		demo=demo.replace(s1,s2);
 		}
 		return demo;
	}
	
	var agentLoginID = '';
	var agentPassword = '';
	var extensionNumber = '';
	var sdkAddress = '';
	
	var datacenter_ip = '';//如果不要适配器,datacenter_ip保持为''即可
	var datacenter_port = '5000';
	var endFlag = ''; 
	
	var isAutoLogin = "1";//1=自动登录 0=非自动登录
	var spEnvFilePath = "C:\\ulinksoftphone\\aicenv.properties";
	
	agentLoginID = '<%=agentLoginID==null?"":agentLoginID%>';
	agentPassword = '<%=agentPassword==null?"":agentPassword%>';
	extensionNumber = '<%=extensionNumber==null?"":extensionNumber%>';
	sdkAddress = '<%=sdkAddress==null?"":sdkAddress%>';
	
	datacenter_ip = '<%=datacenter_ip==null?"":datacenter_ip%>';
	datacenter_port = '<%=datacenter_port==null?"":datacenter_port%>';
	endFlag = '<%=endFlag==null?"":endFlag%>';
	
	//isAutoLogin = '<%=isAutoLogin==null?"":isAutoLogin%>';
	//spEnvFilePath = '<%=spEnvFilePath==null?"":spEnvFilePath%>';
	
	var isForReport = datacenter_ip?true:false;
</script>
</head>

<body onload="_init();">
<applet
  id       = "ulinkSP" name="Ulink IC SoftPhone" 
  archive  = "ulinkSP.jar"
  code     = "com.ulane.softphone.ic.AppletMain.class"  base="." 
  style    = "width:1;height:1" hspace="0" vspace="0" align="left"
>
<param name="sdkAddress" value="http://192.168.255.72:9700/icsdk">
<param name="sdkAddress2" value="">
<param name="agentLoginID" value="cc48951">
<param name="agentPassword" value="cc48951">
<param name="extensionNumber" value="2112">
</applet>
<div marginheight="0" marginwidth="0" style="border:0px #ffffff solid;background-color: transparent;margin-top: 3px;">


<!--applet
  id       = "SoftphoneAdapter" name="Ulink Softphone Adapter" 
  archive  = "SoftphoneAdapter.jar"
  code     = "com.ulane.softphone.adapter.AppletMain.class"  base="." 
  style    = "width:1;height:1" hspace="0" vspace="0" align="right"
>
<param name="datacenter_ip" value="">
<param name="datacenter_port" value="">
<param name="defaultAgentID" value="">
<param name="defaultExt" value="">
<param name="endFlag" value="">
</applet-->

<!--
<table width="900" height="36" border="0" cellpadding="0" cellspacing="5" bgcolor="#A8BDD7" class="space">
<tr>
	<td><input type='text' id='cmd' size=80><button onclick='sendCmd()'>发送消息</button></td>
</tr>
<tr>
	<td><select id='handupCode'>
		<option value='100'>举手原因0</option>
		<option value='101'>举手原因1</option>
		<option value='102'>举手原因2</option>
		<option value='103'>举手原因3</option>
	</select><input type='text' id='handupDesc' size=50><button onclick='sendHandup()'>举手</button></td>
</tr>
</table>
-->
</div>
<div marginheight="0" marginwidth="0" style="border:0px #ffffff solid">


<table width="800" height="36" border="0" cellpadding="0" cellspacing="5" bgcolor="#A8BDD7" class="space">
  <tr>
    <td><img style="cursor: pointer;"  id="img1001" name="logon" src="spimg/UN_login_enable.gif" height="31" width="57" alt="Login"> </td>
    <td>
      <select id="text_aux_reasoncode" name="text_aux_reasoncode"  class="select" style='width:89px;height:22px;' disabled>
      	<option></option>
      </select>
    </td>
    <td><img id="img1002" name="idle" src="spimg/UN_manulBusy_unselected.gif" height="31" width="57" alt="Ready"> </td>
    <td><img id="img1003" name="hangup" src="spimg/UN_hangup.gif" height="31" width="57"  alt="Hangup"> </td>
    <td><img id="img1004" name="answer" src="spimg/UN_dial_unselected.gif" height="31" width="57"  alt="AcceptCall"> </td>
    <td><img id="img1005" name="hold" src="spimg/UN_held_unselected.gif" height="31" width="57" alt="HoldCall"> </td>
    <td>
	 <div style="position:relative;">
	  <span style="margin-top:1px;margin-left:0px;width:129px;overflow:hidden;">
	   <select id="list_transfer_number" style="width:128px;height:22px;margin-left:0px" onclick="this.parentNode.nextSibling.value=this.value">
	   	<option></option>
	   </select>
	  </span><input id='text_transfer_number' name="text_transfer_number" style="margin-top:1px;width:109px;height:22px;position:absolute;left:0px;">
	 </div>
	</td>
    <td><img id="img1006" name="consult" src="spimg/UN_initConsult_disable.gif" height="31" width="57" alt="Consult"> </td>
    <td><img id="img1007" name="transfer" src="spimg/UN_initTransfer_unselected.gif" height="31" width="57" alt="Transfer"> </td>
    <td><img id="img1008" name="conference" src="spimg/UN_initConference_unselected.gif" height="31" width="57" alt="Conference"> </td>
    <td><img id="img1011" name="handup" src="spimg/UN_handup_disable.gif"  height="31" width="57" alt="Handup"></td>
   <td><img id="img1009" name="dtmf" src="spimg/dtmf_e.gif" width="30" alt="SendDTMF" class="nondis"></td>
 		<td><img id="img1010" name="yz" src="spimg/UN_yz_disable.gif"  height="31" width="57" alt="TPIN"  class="nondis"></td>
 		</tr>
   <select id="workitemlist" name="workitemlist" style="display:none;">
</table>
<table width="800" border="1" cellpadding="0" cellspacing="0" bordercolor="#FFFFFF" bgcolor="#000000">
  <tr>
    <td width="25%" class="style0"><span class="style1" id="span_ope_info0">Ope Info:</span><span id="span_ope_info" class="style2">&nbsp;</span></td>
    <td width="25%" class="style0">&nbsp;<span class="style1" id="span_agent_info0">Agent Info:</span><span id="span_agent_info" class="style2 ">&nbsp;</span></td>
    <td width="17%" class="style0">&nbsp;<span class="style1 nondis" id="span_call_number0">Call Number:</span><span id="span_call_number" class="style2">&nbsp;</span></td>
    <td width="15%" class="style0">&nbsp;<span class="style1 nondis" id="span_call_time0">Call Time:</span><span id="span_call_time" class="style2">&nbsp;</span></td>
    <td width="15%" class="style0">&nbsp;<span class="style1 nondis" id="span_summary_info0">Total Time:</span><span id="span_summary_info" class="style2">&nbsp;</span></td>
    <td width="3%" class="style0"><span id="sp_setting" class="style1" style="cursor: pointer;" >Setting</span></td>
  </tr>
</table>
</div>
<div id="testSPUI" style="display:none">
	<div style="display:none">
	   <select id="testSPEval">
	   	<option value="UIforLogout()">UIforLogout()</option>
	   	<option value="UIforBusyEvent()">UIforBusyEvent()</option>
	   	<option value="UIforIdleEvent()">UIforIdleEvent()</option>
	   	<option value="UIforHangupEvent()">UIforHangupEvent()</option>
	   	<option value="UIforRingEvent()">UIforRingEvent()</option>
	   	<option value="UIforTalkingEvent()">UIforTalkingEvent()</option>
	   	<option value="UIforHoldCallEvent()">UIforHoldCallEvent()</option>
	   	<option value="UIforUnholdCallEvent()">UIforUnholdCallEvent()</option>
	   	<option value="UIforConsultCallInit()">UIforConsultCallInit()</option>
	   	<option value="UIforConsultCallSwapEvent()">UIforConsultCallSwapEvent()</option>
	   	<option value="UIforConsultCallCompleteEvent()">UIforConsultCallCompleteEvent()</option>
	   	<option value="UIforTransferCallInit()">UIforTransferCallInit()</option>
	   	<option value="UIforConferenceCallInit()">UIforConferenceCallInit()</option>
	   	<option value="UIforConferenceCallCompleteEvent()">UIforConferenceCallCompleteEvent()</option>
	   	<option value="UIforConferenceCallCancelEvent()">UIforConferenceCallCancelEvent()</option>
	   </select>
	</div>
</div>
<div style="margin-top:15px;">
	呼叫ID：<input id="callID" type="text" value="100001111">电话号码：<input id="telNumber" type="text">
	<input type="button" value="来电" onclick="calling_poppage_ext($v('telNumber'), $v('callID') );">
	<input type="button" value="挂机" onclick="warpUp_ext();">
	<input type="button" value="外呼" onclick="ext_agentCall( $v('telNumber') );">
</div>

<script src="adapterjs/adapterinit.js?v20120910_01" type="text/javascript"></script>
<script src="adapterjs/adapterext.js?v20120910_01" type="text/javascript"></script>
<script src="spjs/spinit.js?v20120923_01" type="text/javascript"></script>
<script src="spjs/spext.js?v20120925_01" type="text/javascript"></script>

<script>
function _init(){
	UIforInit();
	initPara();
	resetInitDataAll(datacenter_ip,
			datacenter_port,
			agentLoginID,
			extensionNumber,
			endFlag);
}
</script>

</body>

</html>