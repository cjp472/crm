	//坐席状态：-1=离线，0=就绪，1=离席，2=事后处理
	var AGENT_STATE_Logoff = "-1";
	var AGENT_STATE_Ready = "0";
	var AGENT_STATE_Aux = "1";
	var AGENT_STATE_Acw = "2";
	//分机状态：0-空闲，1-振铃（包括呼入和呼出振铃），2-通话，3-保持，4-咨询（保持一方呼叫第3方），5-发起呼叫
var STATION_STATE_Released = "10";
	var STATION_STATE_Incoming = "11";
	var STATION_STATE_Talking = "12";
	var STATION_STATE_Holding = "13";
	var STATION_STATE_Consulting = "14";
	var STATION_STATE_Outgoing = "15";
	//呼叫方向：1-呼入，2-呼出
	var CAll_DIRECTION_IN = "1";
	var CAll_DIRECTION_OUT = "2";

//1)	发送坐席登录信息
//报告坐席登录信息。
//触发时机：1、坐席登录成功
function ReportLogin(AgentID, Passwd, DeviceNumber, AgentType, Skills){
	$('ulinkSP').ReportLogin(AgentID, Passwd, DeviceNumber, AgentType, Skills);
}

//2)	发送坐席登出信息
//报告坐席登出信息。
//触发时机：1、坐席登出成功
function ReportLogout(ulinkSP){
	$('ulinkSP').ReportLogout();
}

//***********************************************************************//
//1*ReportAgentMode发送坐席状态-空闲（Available）
//触发时机：坐席状态发生改变为空闲。向服务器报告座席状态，座席状态发生改变时，必须向服务器发送状态报告，这样才能保证服务器状态与座席一致。
function ReportAgentModeAvailable(ulinkSP){
	$('ulinkSP').ReportAgentModeAvailable();
}

//2*ReportAgentMode发送坐席状态-示忙（AUX）
//触发时机：坐席状态发生改变为Aux。向服务器报告座席状态，座席状态发生改变时，必须向服务器发送状态报告，这样才能保证服务器状态与座席一致。
function ReportAgentModeAUX(ReasonCode){
	if($('ulinkSP')) $('ulinkSP').ReportAgentModeAUX(ReasonCode)
}

//3*ReportAgentMode发送坐席状态-事后处理（ACW）
//触发时机：坐席状态发生改变为ACW。向服务器报告座席状态，座席状态发生改变时，必须向服务器发送状态报告，这样才能保证服务器状态与座席一致。
function ReportAgentModeACW(ulinkSP){
	if($('ulinkSP')) $('ulinkSP').ReportAgentModeACW()
}

//4*ReportIncoming发送分机状态：振铃
//触发时机：分机状态变为振铃。通知服务器，当前正在振铃。
//当座席端来话振铃时，需要调用此方法。
function ReportIncoming(CustomerNo){
	$('ulinkSP').ReportIncoming(CustomerNo)
}

//5*ReportOutgoing发送分机状态：外呼
//触发时机：分机状态变为外呼。通知服务器，正在执行呼出。
//呼出成功时，调用此方法。
function ReportOutgoing(CustomerNo){
	$('ulinkSP').ReportOutgoing(CustomerNo)
}

//6*ReportTalking发送分机状态：通话
//触发时机：分机状态变为通话。通知服务器，当前正在通话。
//调用时机：
//摘机成功后，通话建立；
//保持状态被取消时；
//商议操作被取消时；
//两步会议建立时；
function ReportTalking(ulinkSP){
	$('ulinkSP').ReportTalking()
}

//7*ReportHolding发送分机状态：保持
//触发时机：分机状态变为保持。通知服务器，通话被保持。
//当通话被保持时，调用此方法。
function ReportHolding(ulinkSP){
	$('ulinkSP').ReportHolding()
}

//8*ReportConsulting发送分机状态：咨询
//触发时机：分机状态变为咨询。通知服务器，正在执行商议操作。
//商议为两步会议和两步转移的第一步。
function ReportConsulting(ulinkSP){
	$('ulinkSP').ReportConsulting()
}

//9*ReportReleased发送分机状态：空闲
//触发时机：挂机时。通知服务器，通话结束。
//调用时机：
//两方通话时，由本方或他方引起的呼叫释放；
//呼叫被转移时；
function ReportReleased(ulinkSP){
	$('ulinkSP').ReportReleased()
}

//***********************************************************************//

//1)	监听功能
//返回结果给监控端。如果调用成功，ReturnValue为0，否则为非0。
//触发时机：1、执行监听成功（返回0） 2、执行监听失败（返回1）
function ReportListen(TargetDevice, MonitorDevice, ReturnValue){
	$('ulinkSP').ReportListen(TargetDevice, MonitorDevice, ReturnValue);
}

//2)	强插功能
//返回结果给监控端。如果调用成功，ReturnValue为0，否则为非0。
//触发时机：1、执行强插成功（返回0） 2、执行强插失败（返回1）
function ReportInsert(TargetDevice, MonitorDevice, ReturnValue){
	$('ulinkSP').ReportInsert(TargetDevice, MonitorDevice, ReturnValue);
}

//3)	拦截功能
//返回结果给监控端。如果调用成功，ReturnValue为0，否则为非0。
//触发时机：1、执行拦截成功（返回0） 2、执行拦截失败（返回1）
function ReportIntercept(TargetDevice, MonitorDevice, ReturnValue){
	$('ulinkSP').ReportIntercept(TargetDevice, MonitorDevice, ReturnValue);
}

//4)	结束监听
//返回结果给监控端。如果调用成功，ReturnValue为0，否则为非0。
//触发时机：1、结束监听成功（返回0） 2、结束监听失败（返回1）
function ReportStopListen(TargetDevice, MonitorDevice, ReturnValue){
	$('ulinkSP').ReportStopListen(TargetDevice, MonitorDevice, ReturnValue);
}

//5)	结束强插
//返回结果给监控端. 如果调用成功，ReturnValue为0，否则为非0。
//触发时机：1、结束强插成功（返回0） 2、结束强插失败（返回1）
function ReportStopInsert(TargetDevice, MonitorDevice, ReturnValue){
	$('ulinkSP').ReportStopInsert(TargetDevice, MonitorDevice, ReturnValue);
}

//6)	结束拦截
//返回结果给监控端. 如果调用成功，ReturnValue为0，否则为非0。
//触发时机：1、结束拦截成功（返回0） 2、结束拦截失败（返回1）
function ReportStopIntercept(TargetDevice, MonitorDevice, ReturnValue){
	$('ulinkSP').ReportStopIntercept(TargetDevice, MonitorDevice, ReturnValue);
}
	
//7)	强制签出
//返回结果给监控端. 如果调用成功，ReturnValue为0，否则为非0。
//触发时机：1、强制签出成功（返回0） 2、强制签出失败（返回1）
function ReportForceLogoff(TargetDevice, MonitorDevice, ReturnValue){
	$('ulinkSP').ReportForceLogoff(TargetDevice, MonitorDevice, ReturnValue);
}

//8)	强制就绪
//返回结果给监控端. 如果调用成功，ReturnValue为0，否则为非0。
//触发时机：1、强制就绪成功（返回0） 2、强制就绪失败（返回1）
function ReportForceReady(TargetDevice, MonitorDevice, ReturnValue){
	$('ulinkSP').ReportForceReady(TargetDevice, MonitorDevice, ReturnValue);
}

//9)	强制离席
//返回结果给监控端. 如果调用成功，ReturnValue为0，否则为非0。
//触发时机：1、强制离席成功（返回0） 2、强制离席失败（返回1）
function ReportForceAux(TargetDevice, MonitorDevice, ReturnValue){
	$('ulinkSP').ReportForceAux(TargetDevice, MonitorDevice, ReturnValue);
}



//***********************************************************************//

//1)	坐席发起举手
//软电话发起举手
//触发时机：坐席发起举手
function HandUp(AgentID, AgentDevice, ReasonCode, Desc){
	$('ulinkSP').HandUp(AgentID, AgentDevice, ReasonCode, Desc);
}


