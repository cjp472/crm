

/**
 * 来电弹屏扩展函数
 * @param CALLINNO    主叫号码
 * @param eduDatasAll 全部随入数据,格式为:"dnis":"5511","ucid":"00021012481301301413","Agencies":"123456","ani":"4104","Card":"789"
 * @return
 */
function calling_poppage_ext(CALLINNO,eduDatasAll){
	//此处填写来电接通后的弹屏处理逻辑
	//alert('来电弹屏,随路数据为:'+CALLINNO+','+eduDatasAll);
	top.popupCustomerPageByCallin(CALLINNO,eduDatasAll);
	
	//1.调用ulink提供的软电话弹屏接收接口
	
	//var ulinkUrl = 'http://192.168.10.19:8080/ulink/callinfo.action?CALLINNO='+CALLINNO;
	//var ulinkUrl = "http://www.baidu.com/s?bs=1#CALLNO="+CALLINNO;
	//parent.tempForm.action = ulinkUrl;
	//parent.tempForm.target="_blank";
	//parent.tempForm.submit();

	//2.调用UOSP提供的软电话弹屏接收接口
	//var uospUrl = 'http://192.168.1.1:999/uosp/callinfo.asp?CALLINNO='+CALLINNO+'eduDatasAll='+eduDatasAll;
	//parent.document.uospFrame.src = uospUrl;	
	
}

function calling_poppage_media(CALLINNO,eduDatasAll){
	//此处填写多媒体的弹屏处理逻辑
	//alert('多媒体接入弹屏,随路数据为:'+CALLINNO+','+eduDatasAll);
	top.popupCustomerPageByMediain(CALLINNO,eduDatasAll);
}

function agentDial(destno){
	text_transfer_number.value = destno;
	UIforTalkingEvent();
}