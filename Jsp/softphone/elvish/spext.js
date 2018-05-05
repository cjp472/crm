
//系统参数定义区，软电话需要用到的参数填写在下面


//业务系统参数定义区，业务系统需要用到的参数填写在下面
var conId;//联络历史ID

//来电接通时的扩展函数，可调用业务系统
//参数：callID，呼叫ID
//参数：turnOnDateTime，呼叫接入坐席时间
//参数：remoteNo，来电号码
//参数：routeDatas，随路数据，以逗号,分割。callID+","+remoteNo+","+localNo+","+agentUID+","+isComing+","+bridgeDateTime+","+turnOnDateTime+","+ispredict+","+ivrTrace+","+otherData
function ext_onInboundCall(callID, turnOnDateTime, remoteNo, routeDatas){
		//调用业务系统，代码填写在下面：
//		alert('ext_onInboundCall: '+callID+','+turnOnDateTime+','+remoteNo+','+routeDatas);
		//parent.setCallid(callID);
		top.popupCustomerPageByCallin(remoteNo,routeDatas);
}

//外呼成功时的扩展函数，可调用业务系统
//参数：callID，呼叫ID
//参数：turnOnDateTime，呼叫接入坐席时间
//参数：remoteNo，来电号码
//参数：routeDatas，随路数据，以逗号,分割。callID+","+remoteNo+","+localNo+","+agentUID+","+isComing+","+bridgeDateTime+","+turnOnDateTime+","+ispredict+","+ivrTrace+","+otherData
function ext_onOutboundCall(callID, turnOnDateTime, remoteNo, routeDatas){
		//调用业务系统，代码填写在下面：
		//alert('ext_onOutboundCall: '+callID+','+turnOnDateTime+','+remoteNo+','+routeDatas);
}

//挂机时的扩展函数，可调用业务系统
//参数：callID，呼叫ID
//参数：releaseDateTime，电话挂断时间
function ext_onReleaseEvent(callID,	releaseDateTime){
	//调用业务系统，代码填写在下面：
	//alert('ext_onReleaseEvent: '+callID+','+releaseDateTime);
	

	/*
	Ext.Ajax.request({
		url : __ctxPath+'/customer/listCusPersonal.do',
		method : 'POST',
		success : function(response, options) {
			
		},
		failure : function(response, options) {
			
		}
	});
	*/
}

//业务系统调用软电话接口进行外呼的函数
function ext_agentCall(phone){
	//alert('ext_agentCall: '+phone);
  //placeCall(phone);
	var obj = document.frames["softphone_frame"];
	obj.document.getElementById('SoftPhone').jsPlaceCall(phone);
}

function setConId(conId){
	this.conId = conId;
}

