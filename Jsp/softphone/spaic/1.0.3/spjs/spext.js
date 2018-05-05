
//系统参数定义区，软电话需要用到的参数填写在下面

//业务系统参数定义区，业务系统需要用到的参数填写在下面
var conId;//联络历史ID
var callType; // callout 外呼    callin 呼入


/**
 * 来电弹屏扩展函数
 * @param CALLINNO    主叫号码
 * @param eduDatasAll 全部随入数据,格式为:"dnis":"5511","ucid":"00021012481301301413","Agencies":"123456","ani":"4104","Card":"789","service_number":"4008678999"
 * @return
 */
function calling_poppage_ext(CALLINNO,eduDatasAll){
	//此处填写来电接通后的弹屏处理逻辑
	//alert('弹屏,随路数据为:'+CALLINNO+','+eduDatasAll);

	//家有购物的频道号码通过解析随路数据eduDatasAll的service_number获得	
	callType = 'callin';	
	try{
		top.popupCustomerPageByCallin(CALLINNO,eduDatasAll);	
	}catch(e){
//	alert(e);
	}
}

function dial(CALLINNO,showNo, extStr){//电话外呼的js接口
//	alert("呼叫号码:"+CALLINNO+","+showNo+","+showNo);
	callType = 'callout';	
//	var obj=document.getElementById("softphone_frame").contentWindow;
//	var obji1=eval(obj.document.getElementById("text_transfer_number")).value;
	document.getElementById("text_transfer_number").value = showNo?showNo:CALLINNO;

	if(confirm("是否为贵阳市电话?")){
		CALLINNO = "9"+CALLINNO;
	}else {
		CALLINNO = "90"+CALLINNO;
	}
	
	real_transfer_number = CALLINNO;
	if(currentCallDirection != "outbound"){
		alert('当前状态无法外呼,请将软电话登录并按“休息”按钮!');return false;
	}
	img1004.click();
}

//结束挂机时的扩展处理
function warpUp_ext(){
//	alert('2');
	//弹出来电小结
	
	try{
		var path = '';
		if (callType == 'callin')
		{
			//呼入弹出来电小结
			window.parent.CusPersonalFormCallin.LDxiaojie(path);
		}else if (callType == 'callout'){
			//外呼的操作
			window.parent.YXtaskActionForm.LDxiaojie();
		}else{
			//默认是呼入弹出来电小结
			window.parent.CusPersonalFormCallin.LDxiaojie(path);
		}
	}catch(e){
//		alert(e);
	}		
}


//业务系统调用软电话接口进行外呼的函数
function ext_agentCall(phone){
	//alert('ext_agentCall: '+phone);
  //placeCall(phone);
	callType = 'callout';
	
	dial(phone,getMarkNumber(phone), '');
}

//获取屏蔽后的电话号码
function getMarkNumber(srcPhone){
	var tLen = srcPhone.length;
	if(tLen>8){//13810273999--138****3999, 02788888888-027****8888
		return srcPhone.substring(0,tLen-8)+'****'+srcPhone.substring(tLen-4,tLen);
	}else if(tLen<=4){//2111--2111
		return srcPhone;	
	}else{//82437688-****7688
		var retStr = '';
		for(j=0; j<tLen-4; j++){
			retStr += '*';
		}
		retStr += srcPhone.substring(tLen-4,tLen);
		return retStr;
	}
	return srcPhone;
}

function setConId(conId){
	this.conId = conId;
}



