
//系统参数定义区，软电话需要用到的参数填写在下面

//业务系统参数定义区，业务系统需要用到的参数填写在下面
var conId;//联络历史ID
var callType; // callout 外呼    callin 呼入


/**
 * 来电弹屏扩展函数
 * @param CALLINNO    主叫号码
 * @param eduDatasAll 全部随入数据,格式为:"dnis":"5511","ucid":"00021012481301301413","Agencies":"123456","ani":"4104","Card":"789"
 * @return
 */
function calling_poppage_ext(CALLINNO,eduDatasAll){
	//此处填写来电接通后的弹屏处理逻辑
	alert('弹屏,随路数据为:'+CALLINNO+','+eduDatasAll);
	
	callType = 'callin';	
	top.popupCustomerPageByCallin(CALLINNO,eduDatasAll);	
}

function dial(CALLINNO,showNo, extStr){//电话外呼的js接口
	alert("呼叫号码:"+CALLINNO+","+showNo+","+showNo);
	
	text_transfer_number.value = showNo?showNo:CALLINNO;
	
	if(confirm("是否为贵阳市电话?")){
		CALLINNO = "9"+CALLINNO;
	}else {
		CALLINNO = "90"+CALLINNO;
	}
	
	real_transfer_number = CALLINNO;
	img1004.click();
}

//结束挂机时的扩展处理
function warpUp_ext(){
	alert('通话结束');
	//弹出来电小结
	if (callType == 'callin')
	{
		//呼入弹出来电小结
		window.parent.CusPersonalFormCallin.LDxiaojie(path);
	}else{
		//外呼的操作
		
		window.parent.YXtaskActionForm.LDxiaojie();
	}
}


//业务系统调用软电话接口进行外呼的函数
function ext_agentCall(phone){
	//alert('ext_agentCall: '+phone);
  //placeCall(phone);
	callType = 'callout';
	
	dial(phone,phone, '');
}

function setConId(conId){
	this.conId = conId;
}



