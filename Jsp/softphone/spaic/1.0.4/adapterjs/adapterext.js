var isDemoAdapter = false;

//1.接收班长的监听请求
//触发时机：1、软电话端收到班长发送的监听指令
function ReceiveListen(TargetDevice, MonitorDevice){
    if(!$('ulinkSP')) return false;
	if(isDemoAdapter) alert('ReceiveListen('+TargetDevice+','+ MonitorDevice+')');
	//此处为操作软电话的代码begin
	var agentState = $('ulinkSP').getAgentState();
	if( AGENT_STATE_Ready==agentState || AGENT_STATE_Acw==agentState //已就绪或事后处理
		|| STATION_STATE_Released==agentState) {//分机空闲中才能发起监听
		//invokeConferenceCall(MonitorDevice);
		
		text_transfer_number.value = MonitorDevice;
		isUILocked = false;
		img1004.disabled=false;
		img1004.name = "dial";
		//img1004.click();
		invokeMakeCall("*83 "+TargetDevice);
		UIforOutboundInit();
		UIforTalkingEvent();
		
		$('ulinkSP').ReportListen(TargetDevice, MonitorDevice, "0");
		//alert('收到班长发送监听请求.');
	}else {
		$('ulinkSP').ReportListen(TargetDevice, MonitorDevice, "1");
	}
	//此处为操作软电话的代码end
}

//2.接收班长的强插请求
//触发时机：1、软电话端收到班长发送的强插指令
function ReceiveInsert(TargetDevice, MonitorDevice){
    if(!$('ulinkSP')) return false;
	if(isDemoAdapter) alert('ReceiveInsert('+TargetDevice+','+ MonitorDevice+')');
	//此处为操作软电话的代码begin
	var agentState = $('ulinkSP').getAgentState();
	if(STATION_STATE_Talking==agentState  || STATION_STATE_Outgoing==agentState) {//通话中才能进行强插
		//alert('通话中,与'+MonitorDevice+'建立会议');
		//invokeConferenceCall(MonitorDevice);
		
		text_transfer_number.value = MonitorDevice;
		isUILocked = false;
		img1008.disabled=false;
		img1008.name = "initConference";
		img1008.click();
		
		$('ulinkSP').ReportInsert(TargetDevice, MonitorDevice, "0");
		//alert('收到班长发送强插请求.');
	}else {
		//alert('非通话中,无法与'+MonitorDevice+'建立会议');
		$('ulinkSP').ReportInsert(TargetDevice, MonitorDevice, "1");
	}
	//此处为操作软电话的代码end
}

//3.接收班长的拦截请求
//触发时机：1、软电话端收到班长发送的拦截指令
function ReceiveIntercept(TargetDevice, MonitorDevice){
    if(!$('ulinkSP')) return false;
	if(isDemoAdapter) alert('ReceiveIntercept('+TargetDevice+','+ MonitorDevice+')');
	//此处为操作软电话的代码begin
	var agentState = $('ulinkSP').getAgentState();
	if(STATION_STATE_Talking==agentState || STATION_STATE_Outgoing==agentState) {//通话中才能进行拦截
		//invokeTransferCall(MonitorDevice);
		text_transfer_number.value = MonitorDevice;
		isUILocked = false;
		img1007.disabled=false;
		img1007.name = "initTransfer";
		img1007.click();
		$('ulinkSP').ReportIntercept(TargetDevice, MonitorDevice, "0");
		//alert('收到班长发送拦截请求.');
	}else {
		$('ulinkSP').ReportIntercept(TargetDevice, MonitorDevice, "1");
	}
	//此处为操作软电话的代码end
}

//4.接收班长的结束监听请求
//触发时机：1、软电话端收到班长发送的结束监听指令
function ReceiveStopListen(TargetDevice, MonitorDevice){
    if(!$('ulinkSP')) return false;
	if(isDemoAdapter) alert('ReceiveStopListen('+TargetDevice+','+ MonitorDevice+')');
	//此处为操作软电话的代码begin
	//alert('收到班长发送的取消监听请求.');
	releaseCurrentCall();
	//此处为操作软电话的代码end
}

//5.接收班长的结束强插请求
//触发时机：1、软电话端收到班长发送的结束强插指令
function ReceiveStopInsert(TargetDevice, MonitorDevice){
    if(!$('ulinkSP')) return false;
	if(isDemoAdapter) alert('ReceiveStopInsert('+TargetDevice+','+ MonitorDevice+')');
	//此处为操作软电话的代码begin
	//alert('收到班长发送的取消强插请求.');
	releaseCurrentCall();
	//此处为操作软电话的代码end
}


//6.接收班长的结束拦截请求
//触发时机：1、软电话端收到班长发送的结束拦截指令
function ReceiveStopIntercept(TargetDevice, MonitorDevice){
    if(!$('ulinkSP')) return false;
	if(isDemoAdapter) alert('ReceiveStopIntercept('+TargetDevice+','+ MonitorDevice+')');
	//此处为操作软电话的代码begin
	//alert('收到班长发送的取消接管请求.');
	releaseCurrentCall();
	//此处为操作软电话的代码end
}

function releaseCurrentCall(){
	var agentState = $('ulinkSP').getAgentState();
	if(STATION_STATE_Talking==agentState  || STATION_STATE_Outgoing==agentState) {//通话中才能挂机
		//alert('坐席软电话执行挂机');
		img1003.click();
	}else {
		
	}	
}


//7.接收班长的强制签出请求
//触发时机：1、软电话端收到班长发送的强制签出指令
function ReceiveForceLogoff(TargetDevice, MonitorDevice){
    if(!$('ulinkSP')) return false;
	if(isDemoAdapter) alert('ReceiveForceLogoff('+TargetDevice+','+ MonitorDevice+')');
	//此处为操作软电话的代码begin
	var agentState = $('ulinkSP').getAgentState();
	if(AGENT_STATE_Logoff==agentState){//已经是签出状态
		$('ulinkSP').ReportForceLogoff(TargetDevice, MonitorDevice, "0");
	}else if( AGENT_STATE_Ready==agentState || AGENT_STATE_Acw==agentState || AGENT_STATE_Aux==agentState //已就绪或事后处理、忙碌
		|| STATION_STATE_Released==agentState) {//空闲才能强制签出
		//invokeAgentLogout();
		img1001.click();
		$('ulinkSP').ReportForceLogoff(TargetDevice, MonitorDevice, "0");
	}else {
		$('ulinkSP').ReportForceLogoff(TargetDevice, MonitorDevice, "1");
	}
	//此处为操作软电话的代码end	
}


//8.接收班长的强制就绪请求
//触发时机：1、软电话端收到班长发送的强制就绪指令
function ReceiveForceReady(TargetDevice, MonitorDevice){
    if(!$('ulinkSP')) return false;
	if(isDemoAdapter) alert('ReceiveForceReady('+TargetDevice+','+ MonitorDevice+')');
	//此处为操作软电话的代码begin
	var agentState = $('ulinkSP').getAgentState();
	if(AGENT_STATE_Ready==agentState){//已经是就绪状态
		$('ulinkSP').ReportForceReady(TargetDevice, MonitorDevice, "0");
	}else if( AGENT_STATE_Aux==agentState || AGENT_STATE_Acw==agentState  //未就绪或事后处理
		|| STATION_STATE_Released==agentState) {//空闲
		//invokeMakeAvailable();
		img1002.click();
		$('ulinkSP').ReportForceReady(TargetDevice, MonitorDevice, "0");
	}else {
		$('ulinkSP').ReportForceReady(TargetDevice, MonitorDevice, "1");
	}
	//此处为操作软电话的代码end
}


//9.接收班长的强制离席请求
//触发时机：1、软电话端收到班长发送的强制离席指令
function ReceiveForceAux(TargetDevice, MonitorDevice){
    if(!$('ulinkSP')) return false;
	if(isDemoAdapter) alert('ReceiveForceAux('+TargetDevice+','+ MonitorDevice+')');
	//此处为操作软电话的代码begin
	var agentState = $('ulinkSP').getAgentState();
	if(AGENT_STATE_Aux==agentState){//已经是离席状态
		$('ulinkSP').ReportForceAux(TargetDevice, MonitorDevice, "0");
	}else if( AGENT_STATE_Ready==agentState || AGENT_STATE_Acw==agentState //已就绪或事后处理
		|| STATION_STATE_Released==agentState) {//空闲
		//invokeEnterAuxwork('');
		img1002.click();
		$('ulinkSP').ReportForceAux(TargetDevice, MonitorDevice, "0");
	}else {
		$('ulinkSP').ReportForceAux(TargetDevice, MonitorDevice, "1");
	}
	//此处为操作软电话的代码end
}


//***********************************************************************//

//1.举手成功
//触发时机：举手信息发送成功
function HandUpSuccess(AgentID, AgentDevice, ReasonCode, Desc){
    if(!$('ulinkSP')) return false;
	if(isDemoAdapter) alert('HandUpSuccess('+AgentID+','+ AgentDevice+','+ ReasonCode+','+ Desc+')');
	//此处为处理信息begin
	//…
	//此处为处理信息end
}

//2.举手失败
//触发时机：举手信息没有发送成功
function HandUpFail(AgentID, AgentDevice, ReasonCode, Desc , FailReasonCode, FailReasonDesc){
    if(!$('ulinkSP')) return false;
	if(isDemoAdapter) alert('HandUpFail('+AgentID+','+ AgentDevice+','+ ReasonCode+','+ Desc+','+ FailReasonCode+','+ FailReasonDesc+')');
	//此处为处理信息begin
	//…
	//此处为处理信息end
}

