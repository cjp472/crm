/**
	 * softphone内置方法。
	 * @author zhiwei Zhang
	 */

/**
	 * 电话外拨
	 * 
	 * @param phone：外拨号码（请保证是数字）
	 */
function placeCall(phone){
		var swfObj = document.getElementById('SoftPhone');   
		swfObj.jsPlaceCall(phone);
}

/**
	 * 坐席登录
	 * 
	 * @param 节点名称，节点IP，坐席编号，设备号，坐席密码
	 */
function login(node, nodeip, agentUid, device, agentPwd, loginName, loginType){
		var swfObj = document.getElementById('SoftPhone');   
		swfObj.jsLogin(node, nodeip, agentUid, device, agentPwd);
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
	 * 电话挂机
	 * 
	 * @param
	 */
function hungUp(){
		var swfObj = document.getElementById('SoftPhone');   
		swfObj.jsHungUp();
}

/**
	 * 会议
	 * 
	 * @param 要加入会议的另一个电话号码。
	 */
function meetingCall(transferAgent){
		var swfObj = document.getElementById('SoftPhone');   
		swfObj.jsMeetingCall(transferAgent);
}

/**
	 * 转接
	 * 
	 * @param 转接号码、转接号码是否为外线、是否转接到IVR、转接到IVR时是否转回、转接外带数据。
	 */
function transferCall(transferPhone, isOutLine, isTurnToIVR, isTurnBack, callData){
		var swfObj = document.getElementById('SoftPhone');   
		swfObj.jsTransferCall(transferPhone, isOutLine, isTurnToIVR, isTurnBack, callData);
}

/**
	 * 坐席小休
	 * 
	 * @param 小休类型。1：用餐。2：洗手间。3：休息。
	 */
function rest(restType){
		var swfObj = document.getElementById('SoftPhone');   
		swfObj.jsRest(restType);
}

/**
	 * 取消坐席小休
	 * 
	 * @param
	 */
function unRest(){
		var swfObj = document.getElementById('SoftPhone');   
		swfObj.jsUnRest();
}

/**
	 * 坐席事后处理
	 * 
	 * @param 事后处理类型。1：呼入。2：呼出。3：多媒体。4：其他。
	 */
function afterWork(afterWorkType){
		var swfObj = document.getElementById('SoftPhone');   
		swfObj.jsAfterWork(afterWorkType);
}

/**
	 * 取消坐席事后处理
	 * 
	 * @param
	 */
function unAfterWork(){
		var swfObj = document.getElementById('SoftPhone');   
		swfObj.jsUnAfterWork();
}