/**
	 * softphone���÷�����
	 * @author zhiwei Zhang
	 */

/**
	 * �绰�Ⲧ
	 * 
	 * @param phone���Ⲧ���루�뱣֤�����֣�
	 */
function placeCall(phone){
		var swfObj = document.getElementById('SoftPhone');   
		swfObj.jsPlaceCall(phone);
}

/**
	 * ��ϯ��¼
	 * 
	 * @param �ڵ����ƣ��ڵ�IP����ϯ��ţ��豸�ţ���ϯ����
	 */
function login(node, nodeip, agentUid, device, agentPwd, loginName, loginType){
		var swfObj = document.getElementById('SoftPhone');   
		swfObj.jsLogin(node, nodeip, agentUid, device, agentPwd);
}

/**
	 * ��ϯ�ǳ�
	 * 
	 * @param
	 */
function logoff(){
		var swfObj = document.getElementById('SoftPhone');   
		swfObj.jsLogoff();
}

/**
	 * �绰�һ�
	 * 
	 * @param
	 */
function hungUp(){
		var swfObj = document.getElementById('SoftPhone');   
		swfObj.jsHungUp();
}

/**
	 * ����
	 * 
	 * @param Ҫ����������һ���绰���롣
	 */
function meetingCall(transferAgent){
		var swfObj = document.getElementById('SoftPhone');   
		swfObj.jsMeetingCall(transferAgent);
}

/**
	 * ת��
	 * 
	 * @param ת�Ӻ��롢ת�Ӻ����Ƿ�Ϊ���ߡ��Ƿ�ת�ӵ�IVR��ת�ӵ�IVRʱ�Ƿ�ת�ء�ת��������ݡ�
	 */
function transferCall(transferPhone, isOutLine, isTurnToIVR, isTurnBack, callData){
		var swfObj = document.getElementById('SoftPhone');   
		swfObj.jsTransferCall(transferPhone, isOutLine, isTurnToIVR, isTurnBack, callData);
}

/**
	 * ��ϯС��
	 * 
	 * @param С�����͡�1���ò͡�2��ϴ�ּ䡣3����Ϣ��
	 */
function rest(restType){
		var swfObj = document.getElementById('SoftPhone');   
		swfObj.jsRest(restType);
}

/**
	 * ȡ����ϯС��
	 * 
	 * @param
	 */
function unRest(){
		var swfObj = document.getElementById('SoftPhone');   
		swfObj.jsUnRest();
}

/**
	 * ��ϯ�º���
	 * 
	 * @param �º������͡�1�����롣2��������3����ý�塣4��������
	 */
function afterWork(afterWorkType){
		var swfObj = document.getElementById('SoftPhone');   
		swfObj.jsAfterWork(afterWorkType);
}

/**
	 * ȡ����ϯ�º���
	 * 
	 * @param
	 */
function unAfterWork(){
		var swfObj = document.getElementById('SoftPhone');   
		swfObj.jsUnAfterWork();
}