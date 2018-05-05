
//软电话按钮
var img_login = $("img_login");
var img_ready = $("img_ready");
//var img_rest = $("img_rest");
var img_answer = $("img_answer");
var img_hold = $("img_hold");
var img_acw = $("img_acw");
var img_tpin = $("img_tpin");
var img_textinput = $("img_textinput");
var img_dial = $("img_dial");
var img_consult = $("img_consult");
var img_transfer = $("img_transfer");
var img_conferentce = $("img_conferentce");
var img_ivr = $("img_ivr");
var img_handup = $("img_handup");

var img_email = $("img_email");
var img_fax = $("img_fax");
var img_sms = $("img_sms");

var sel_aux_reasoncode = $("sel_aux_reasoncode");
var text_transfer_number = $("text_transfer_number");

function checkReasoncode(){
	if(!sel_aux_reasoncode.value){
		alert('请选择小休状态!'); sel_aux_reasoncode.focus();return false;
	}
	return true;
}

function checkNumber(){
	if(!text_transfer_number.value){
		alert('请输入号码!'); text_transfer_number.focus();return false;
	}
	return true;
}

//登录/登出
img_login.onclick = function(){
	if(img_login.disabled==true) return;last_ope_img=img_login;
	var action=img_login.name;//alert("action="+action);
	if(action=="login"){//执行登录操作
		UIforLoginSuccessedEvent();
	}else if(action=="logout"){//执行登出操作
		UIforLogout();
	}
}

//就绪/未就绪
img_ready.onclick = function(){
	if(img_ready.disabled==true) return;last_ope_img=img_ready;
	var action=img_ready.name;//alert("action="+action);
	if(action=="ready"){//执行就绪操作
		
		UIforIdleEvent();
//		alert(text_transfer_number.value + "==softphoneinit.js==");
		if(text_transfer_number.value != null && text_transfer_number.value != 'undefied' && text_transfer_number.value != ''){
			UIforRingEvent();
		}
		
		//下面是判断测试用的
		if(text_transfer_number.value=='test') {
			text_transfer_number.value='18701575605';
			UIforRingEvent();
		}
	}else if(action=="rest"){//执行未就绪操作
		if(!checkReasoncode()) return;
		UIforBusyEvent();
	}
}

//应答/挂机
img_answer.onclick = function(){
	if(img_answer.disabled==true) return;last_ope_img=img_answer;
	var action=img_answer.name;//alert("action="+action);
	if(action=="answer"){//执行应答操作
		UIforTalkingEvent();
		
//		alert('应答 ' + text_transfer_number.value);
		calling_poppage_ext(text_transfer_number.value,'IVR1,0F33030333000,2,201,20101');
		//下面是写死的测试用的，上面要写成活的。
//		calling_poppage_ext('18701575605','IVR1,0F33030333000,2,201,20101');
	}else if(action=="hangup"){//执行挂机操作
			UIforHangupEvent();
	}
}

//保持/取回
img_hold.onclick = function(){
	if(img_hold.disabled==true) return;last_ope_img=img_hold;
	var action=img_hold.name;//alert("action="+action);
	if(action=="hold"){
		UIforHoldCallEvent();
	}else if(action=="unhold"){
		UIforUnholdCallEvent();
	}
}

//ACW
img_acw.onclick = function(){
	
}

//TPIN
img_tpin.onclick = function(){
	UIforRingEvent();
}

//外呼
img_dial.onclick = function(){
	if(img_dial.disabled==true) return;last_ope_img=img_dial;
	var action=img_dial.name;//alert("action="+action);
	if(!checkNumber()) return;
	UIforTalkingEvent();
}

//咨询
img_consult.onclick = function(){
	if(img_consult.disabled==true) return;last_ope_img=img_consult;
	var action=img_consult.name;//alert("action="+action);
	if(!checkNumber()) return;
	UIforConsultCallInit();
}

//转接
img_transfer.onclick = function(){
	if(img_transfer.disabled==true) return;last_ope_img=img_transfer;
	var action=img_transfer.name;//alert("action="+action);
	if(!checkNumber()) return;
	UIforTransferCallInit();
}

//会议
img_conferentce.onclick = function(){
	if(img_conferentce.disabled==true) return;last_ope_img=img_conferentce;
	var action=img_conferentce.name;//alert("action="+action);
	if(!checkNumber()) return;
	UIforConferenceCallInit();
}

//转IVR
img_ivr.onclick = function(){
	if(img_ivr.disabled==true) return;last_ope_img=img_ivr;
	var action=img_transfer.name;//alert("action="+action);
	UIforIVRInit();	
}

//举手
img_handup.onclick = function(){
	if(img_handup.disabled==true) return;last_ope_img=img_handup;
	var action=img_handup.name;//alert("action="+action);
	var paras = "height=120, width=400, left="+(screen.width-400)/2+",top="+(screen.height-260)/2 + ", toolbar=no, menubar=no, scrollbars=no, resizable=no,location=n o, status=no";
	window.open("sputil/handup.htm", "handupwindow", paras);
}

//Email
img_email.onclick = function(){
	if(img_email.disabled==true) return;last_ope_img=img_email;
	var action=img_email.name;//alert("action="+action);
	$('div_msg').innerHTML="多媒体处理中...";
	calling_poppage_media('qinghuasunny@163.com','SERV1,192.168.0.22,cc@cqnsh.com');
}

//Fax
img_fax.onclick = function(){
	if(img_fax.disabled==true) return;last_ope_img=img_fax;
	var action=img_fax.name;//alert("action="+action);	
	$('div_msg').innerHTML="传真处理中...";
}

//Sms
img_sms.onclick = function(){
	if(img_sms.disabled==true) return;last_ope_img=img_sms;
	var action=img_sms.name;//alert("action="+action);		
	$('div_msg').innerHTML="短信处理中...";
}

////////////////////各种操作成功后对应的界面更新函数////////////////////////////////////////////////////////////
//界面初始化
function UIforInit(){
	img_tmp = img_login;img_tmp.src  = "spimg/UN_login_enable.png";		  img_tmp.disabled = false;img_tmp.name="login";    $('div_login').innerHTML="登录";
	img_tmp = img_ready;img_tmp.src  = "spimg/UN_ready_disable.png";		img_tmp.disabled = true; img_tmp.name="";         $('div_ready').innerHTML="就绪";
	img_tmp = img_answer;img_tmp.src = "spimg/UN_answer_disable.png";   img_tmp.disabled = true; img_tmp.name="";         $('div_answer').innerHTML="应答";
	img_tmp = img_hold;img_tmp.src   = "spimg/UN_hold_disable.png";		  img_tmp.disabled = true; img_tmp.name="";         $('div_hold').innerHTML="保持";
	img_tmp = img_acw;img_tmp.src    = "spimg/UN_acw_disable.png";		  img_tmp.disabled = true; img_tmp.name="";         $('div_acw').innerHTML="ACW";
	img_tmp = img_tpin;img_tmp.src   = "spimg/UN_tpin_disable.png";		  img_tmp.disabled = true; img_tmp.name="";         

	img_tmp = img_textinput;img_tmp.src  = "spimg/UN_textinput_disable.png";	img_tmp.disabled = true; img_tmp.name=""; 	
	img_tmp = img_dial;img_tmp.src       = "spimg/UN_dial_disable.png";				img_tmp.disabled = true; img_tmp.name="";   $('div_dial').innerHTML="外拨";
	img_tmp = img_consult;img_tmp.src    = "spimg/UN_consult_disable.png";		img_tmp.disabled = true; img_tmp.name="";   $('div_consult').innerHTML="咨询";
	img_tmp = img_transfer;img_tmp.src   = "spimg/UN_transfer_disable.png";		img_tmp.disabled = true; img_tmp.name="";   $('div_transfer').innerHTML="转接";
	img_tmp = img_conferentce;img_tmp.src= "spimg/UN_conference_disable.png";img_tmp.disabled = true; img_tmp.name="";   $('div_conferentce').innerHTML="会议";
	img_tmp = img_ivr;img_tmp.src        = "spimg/UN_ivr_disable.png";				img_tmp.disabled = true; img_tmp.name="";   $('div_ivr').innerHTML="IVR";
	
	img_tmp = img_email;img_tmp.src  = "spimg/UN_email_enable.png";	img_tmp.disabled = false; img_tmp.name=""; 	$('div_email').innerHTML="多媒体";
	img_tmp = img_fax;img_tmp.src    = "spimg/UN_fax_enable.png";		img_tmp.disabled = false; img_tmp.name=""; 	$('div_fax').innerHTML="传真";
	img_tmp = img_sms;img_tmp.src    = "spimg/UN_sms_enable.png";		img_tmp.disabled = false; img_tmp.name=""; 	$('div_sms').innerHTML="短信";
	
	sel_aux_reasoncode.length=0;
	var objSelect=sel_aux_reasoncode;
	//objSelect.options.add(new Option('', ''));
	var arrTmp = '0=外呼,,,1=休息,,,2=会议,,,3=离席,,,4=多媒体处理'.split(",,,");
	var op = '';
	for(var i = 0; i < arrTmp.length; i++){
		op = arrTmp[i].split("=");
		var varItem = new Option(op[1], op[0]);
		objSelect.options.add(varItem);
	}
	
	sel_aux_reasoncode.disabled = true;
	text_transfer_number.disabled = true;
	
	$('div_msg').innerHTML="未登录";
}

//登录成功
function UIforLoginSuccessedEvent(){
	img_tmp = img_login;img_tmp.src  = "spimg/UN_logout_enable.png";		img_tmp.disabled = false;img_tmp.name="logout";    $('div_login').innerHTML="登出";
	img_tmp = img_ready;img_tmp.src  = "spimg/UN_ready_enable.png";			img_tmp.disabled = false; img_tmp.name="ready";         $('div_ready').innerHTML="就绪";
	//img_tmp = img_rest;img_tmp.src   = "spimg/UN_rest_disable.png";		  img_tmp.disabled = false; img_tmp.name="";         $('div_rest').innerHTML="休息";
	img_tmp = img_answer;img_tmp.src = "spimg/UN_answer_disable.png";   img_tmp.disabled = true; img_tmp.name="";         $('div_answer').innerHTML="应答";
	img_tmp = img_hold;img_tmp.src   = "spimg/UN_hold_disable.png";		  img_tmp.disabled = true; img_tmp.name="";         $('div_hold').innerHTML="保持";
	img_tmp = img_acw;img_tmp.src    = "spimg/UN_acw_disable.png";		  img_tmp.disabled = true; img_tmp.name="";         $('div_acw').innerHTML="ACW";
	img_tmp = img_tpin;img_tmp.src   = "spimg/UN_tpin_disable.png";		  img_tmp.disabled = true; img_tmp.name="";         

	img_tmp = img_textinput;img_tmp.src  = "spimg/UN_textinput_disable.png";	img_tmp.disabled = false; img_tmp.name=""; 	
	img_tmp = img_dial;img_tmp.src       = "spimg/UN_dial_disable.png";				img_tmp.disabled = true; img_tmp.name="";   $('div_dial').innerHTML="外拨";
	img_tmp = img_consult;img_tmp.src    = "spimg/UN_consult_disable.png";		img_tmp.disabled = true; img_tmp.name="";   $('div_consult').innerHTML="咨询";
	img_tmp = img_transfer;img_tmp.src   = "spimg/UN_transfer_disable.png";		img_tmp.disabled = true; img_tmp.name="";   $('div_transfer').innerHTML="转接";
	img_tmp = img_conferentce;img_tmp.src= "spimg/UN_conference_disable.png";img_tmp.disabled = true; img_tmp.name="";   $('div_conferentce').innerHTML="会议";
	img_tmp = img_ivr;img_tmp.src        = "spimg/UN_ivr_disable.png";				img_tmp.disabled = true; img_tmp.name="";   $('div_ivr').innerHTML="IVR";
	
	img_tmp = img_email;img_tmp.src  = "spimg/UN_email_enable.png";	img_tmp.disabled = false; img_tmp.name=""; 	$('div_email').innerHTML="多媒体";
	img_tmp = img_fax;img_tmp.src    = "spimg/UN_fax_enable.png";		img_tmp.disabled = false; img_tmp.name=""; 	$('div_fax').innerHTML="传真";
	img_tmp = img_sms;img_tmp.src    = "spimg/UN_sms_enable.png";		img_tmp.disabled = false; img_tmp.name=""; 	$('div_sms').innerHTML="短信";	
	
	sel_aux_reasoncode.disabled = true;
	text_transfer_number.disabled = true;
	
	$('div_msg').innerHTML="已登录";
}


function UIforLogout(){
	UIforInit();
	$('div_msg').innerHTML="已登出";
}

function UIforIdleEvent(){
	img_tmp = img_login;img_tmp.src  = "spimg/UN_logout_enable.png";		img_tmp.disabled = false;img_tmp.name="logout";    $('div_login').innerHTML="登出";
	img_tmp = img_ready;img_tmp.src  = "spimg/UN_rest_enable.png";		img_tmp.disabled = false; img_tmp.name="rest";         $('div_ready').innerHTML="休息";
	img_tmp = img_answer;img_tmp.src = "spimg/UN_answer_disable.png";   img_tmp.disabled = true; img_tmp.name="";         $('div_answer').innerHTML="应答";
	img_tmp = img_hold;img_tmp.src   = "spimg/UN_hold_disable.png";		  img_tmp.disabled = true; img_tmp.name="";         $('div_hold').innerHTML="保持";
	img_tmp = img_acw;img_tmp.src    = "spimg/UN_acw_disable.png";		  img_tmp.disabled = true; img_tmp.name="";         $('div_acw').innerHTML="ACW";
	img_tmp = img_tpin;img_tmp.src   = "spimg/UN_tpin_enable.png";		  img_tmp.disabled = false; img_tmp.name="";         
	
	img_tmp = img_textinput;img_tmp.src  = "spimg/UN_textinput_disable.png";	img_tmp.disabled = false; img_tmp.name=""; 	
	img_tmp = img_dial;img_tmp.src       = "spimg/UN_dial_disable.png";				img_tmp.disabled = true; img_tmp.name="";   $('div_dial').innerHTML="外拨";
	img_tmp = img_consult;img_tmp.src    = "spimg/UN_consult_disable.png";		img_tmp.disabled = true; img_tmp.name="";   $('div_consult').innerHTML="咨询";
	img_tmp = img_transfer;img_tmp.src   = "spimg/UN_transfer_disable.png";		img_tmp.disabled = true; img_tmp.name="";   $('div_transfer').innerHTML="转接";
	img_tmp = img_conferentce;img_tmp.src= "spimg/UN_conference_disable.png";	img_tmp.disabled = true; img_tmp.name="";   $('div_conferentce').innerHTML="会议";
	img_tmp = img_ivr;img_tmp.src        = "spimg/UN_ivr_disable.png";				img_tmp.disabled = true; img_tmp.name="";   $('div_ivr').innerHTML="IVR";
	
	img_tmp = img_email;img_tmp.src  = "spimg/UN_email_disable.png";	img_tmp.disabled = true; img_tmp.name=""; 	$('div_email').innerHTML="多媒体";
	img_tmp = img_fax;img_tmp.src    = "spimg/UN_fax_disable.png";		img_tmp.disabled = true; img_tmp.name=""; 	$('div_fax').innerHTML="传真";
	img_tmp = img_sms;img_tmp.src    = "spimg/UN_sms_disable.png";		img_tmp.disabled = true; img_tmp.name=""; 	$('div_sms').innerHTML="短信";	
	
	sel_aux_reasoncode.disabled = false;
	text_transfer_number.disabled = true;
	
	$('div_msg').innerHTML="就绪中...";
}


function UIforBusyEvent(){
	img_tmp = img_login;img_tmp.src  = "spimg/UN_logout_enable.png";		img_tmp.disabled = false;img_tmp.name="logout";    $('div_login').innerHTML="登出";
	img_tmp = img_ready;img_tmp.src  = "spimg/UN_ready_enable.png";		img_tmp.disabled = false; img_tmp.name="ready";         $('div_ready').innerHTML="就绪";
	img_tmp = img_answer;img_tmp.src = "spimg/UN_answer_disable.png";   img_tmp.disabled = true; img_tmp.name="";         $('div_answer').innerHTML="应答";
	img_tmp = img_hold;img_tmp.src   = "spimg/UN_hold_disable.png";		  img_tmp.disabled = true; img_tmp.name="";         $('div_hold').innerHTML="保持";
	img_tmp = img_acw;img_tmp.src    = "spimg/UN_acw_disable.png";		  img_tmp.disabled = true; img_tmp.name="";         $('div_acw').innerHTML="ACW";
	img_tmp = img_tpin;img_tmp.src   = "spimg/UN_tpin_disable.png";		  img_tmp.disabled = true; img_tmp.name="";         
	
	img_tmp = img_textinput;img_tmp.src  = "spimg/UN_textinput_disable.png";	img_tmp.disabled = false; img_tmp.name=""; 	
	img_tmp = img_dial;img_tmp.src       = "spimg/UN_dial_enable.png";				img_tmp.disabled = false; img_tmp.name="";   $('div_dial').innerHTML="外拨";
	img_tmp = img_consult;img_tmp.src    = "spimg/UN_consult_disable.png";		img_tmp.disabled = true; img_tmp.name="";   $('div_consult').innerHTML="咨询";
	img_tmp = img_transfer;img_tmp.src   = "spimg/UN_transfer_disable.png";		img_tmp.disabled = true; img_tmp.name="";   $('div_transfer').innerHTML="转接";
	img_tmp = img_conferentce;img_tmp.src= "spimg/UN_conference_disable.png";	img_tmp.disabled = true; img_tmp.name="";   $('div_conferentce').innerHTML="会议";
	img_tmp = img_ivr;img_tmp.src        = "spimg/UN_ivr_disable.png";				img_tmp.disabled = true; img_tmp.name="";   $('div_ivr').innerHTML="IVR";
	
	img_tmp = img_email;img_tmp.src  = "spimg/UN_email_enable.png";	img_tmp.disabled = false; img_tmp.name=""; 	$('div_email').innerHTML="多媒体";
	img_tmp = img_fax;img_tmp.src    = "spimg/UN_fax_enable.png";		img_tmp.disabled = false; img_tmp.name=""; 	$('div_fax').innerHTML="传真";
	img_tmp = img_sms;img_tmp.src    = "spimg/UN_sms_enable.png";		img_tmp.disabled = false; img_tmp.name=""; 	$('div_sms').innerHTML="短信";
	
	sel_aux_reasoncode.disabled = true;
	text_transfer_number.disabled = false;
	
	var codetext = sel_aux_reasoncode.options[sel_aux_reasoncode.selectedIndex].text;
	$('div_msg').innerHTML="休息中("+codetext+")...";
}



function UIforRingEvent(){
	img_tmp = img_login;img_tmp.src  = "spimg/UN_logout_disable.png";		img_tmp.disabled = true;img_tmp.name="";   $('div_login').innerHTML="登出";
	img_tmp = img_ready;img_tmp.src  = "spimg/UN_ready_disable.png";		img_tmp.disabled = true; img_tmp.name="";        	$('div_ready').innerHTML="就绪";
	img_tmp = img_answer;img_tmp.src = "spimg/UN_answer_enable.png";   	img_tmp.disabled = false; img_tmp.name="answer";  $('div_answer').innerHTML="应答";
	img_tmp = img_hold;img_tmp.src   = "spimg/UN_unhold_disable.png";		  img_tmp.disabled = true; img_tmp.name="";        $('div_hold').innerHTML="保持";
	img_tmp = img_acw;img_tmp.src    = "spimg/UN_acw_disable.png";		  img_tmp.disabled = true; img_tmp.name="";         $('div_acw').innerHTML="ACW";
	img_tmp = img_tpin;img_tmp.src   = "spimg/UN_tpin_disable.png";		  img_tmp.disabled = true; img_tmp.name="";         
	
	img_tmp = img_textinput;img_tmp.src  = "spimg/UN_textinput_disable.png";	img_tmp.disabled = false; img_tmp.name=""; 	
	img_tmp = img_dial;img_tmp.src       = "spimg/UN_dial_disable.png";				img_tmp.disabled = true; img_tmp.name="";   $('div_dial').innerHTML="外拨";
	img_tmp = img_consult;img_tmp.src    = "spimg/UN_consult_disable.png";		img_tmp.disabled = true; img_tmp.name="";   $('div_consult').innerHTML="咨询";
	img_tmp = img_transfer;img_tmp.src   = "spimg/UN_transfer_disable.png";		img_tmp.disabled = true; img_tmp.name="";   $('div_transfer').innerHTML="转接";
	img_tmp = img_conferentce;img_tmp.src= "spimg/UN_conference_disable.png";	img_tmp.disabled = true; img_tmp.name="";   $('div_conferentce').innerHTML="会议";
	img_tmp = img_ivr;img_tmp.src        = "spimg/UN_ivr_disable.png";				img_tmp.disabled = true; img_tmp.name="";   $('div_ivr').innerHTML="IVR";
	
	img_tmp = img_email;img_tmp.src  = "spimg/UN_email_disable.png";	img_tmp.disabled = true; img_tmp.name=""; 	$('div_email').innerHTML="多媒体";
	img_tmp = img_fax;img_tmp.src    = "spimg/UN_fax_disable.png";		img_tmp.disabled = true; img_tmp.name=""; 	$('div_fax').innerHTML="传真";
	img_tmp = img_sms;img_tmp.src    = "spimg/UN_sms_disable.png";		img_tmp.disabled = true; img_tmp.name=""; 	$('div_sms').innerHTML="短信";
	
	sel_aux_reasoncode.disabled = true;
	text_transfer_number.disabled = true;
	
	$('div_msg').innerHTML="振铃中...";
}

function UIforTalkingEvent(){
	img_tmp = img_login;img_tmp.src  = "spimg/UN_logout_disable.png";		img_tmp.disabled = true;img_tmp.name="logout";   $('div_login').innerHTML="登出";
	img_tmp = img_ready;img_tmp.src  = "spimg/UN_ready_disable.png";		img_tmp.disabled = true; img_tmp.name="";        	$('div_ready').innerHTML="就绪";
	img_tmp = img_answer;img_tmp.src = "spimg/UN_hangup_enable.png";   	img_tmp.disabled = false; img_tmp.name="hangup";  $('div_answer').innerHTML="挂机";
	img_tmp = img_hold;img_tmp.src   = "spimg/UN_hold_enable.png";		  img_tmp.disabled = false; img_tmp.name="hold";        $('div_hold').innerHTML="保持";
	img_tmp = img_acw;img_tmp.src    = "spimg/UN_acw_disable.png";		  img_tmp.disabled = true; img_tmp.name="";         $('div_acw').innerHTML="ACW";
	img_tmp = img_tpin;img_tmp.src   = "spimg/UN_tpin_disable.png";		  img_tmp.disabled = true; img_tmp.name="";         
	
	img_tmp = img_textinput;img_tmp.src  = "spimg/UN_textinput_disable.png";	img_tmp.disabled = false; img_tmp.name=""; 	
	img_tmp = img_dial;img_tmp.src       = "spimg/UN_dial_disable.png";				img_tmp.disabled = true; img_tmp.name="";   $('div_dial').innerHTML="外拨";
	img_tmp = img_consult;img_tmp.src    = "spimg/UN_consult_enable.png";		img_tmp.disabled = false; img_tmp.name="";   $('div_consult').innerHTML="咨询";
	img_tmp = img_transfer;img_tmp.src   = "spimg/UN_transfer_enable.png";		img_tmp.disabled = false; img_tmp.name="";   $('div_transfer').innerHTML="转接";
	img_tmp = img_conferentce;img_tmp.src= "spimg/UN_conference_enable.png";	img_tmp.disabled = false; img_tmp.name="";   $('div_conferentce').innerHTML="会议";
	img_tmp = img_ivr;img_tmp.src        = "spimg/UN_ivr_enable.png";				img_tmp.disabled = false; img_tmp.name="";   $('div_ivr').innerHTML="IVR";
	
	img_tmp = img_email;img_tmp.src  = "spimg/UN_email_disable.png";	img_tmp.disabled = true; img_tmp.name=""; 	$('div_email').innerHTML="多媒体";
	img_tmp = img_fax;img_tmp.src    = "spimg/UN_fax_disable.png";		img_tmp.disabled = true; img_tmp.name=""; 	$('div_fax').innerHTML="传真";
	img_tmp = img_sms;img_tmp.src    = "spimg/UN_sms_disable.png";		img_tmp.disabled = true; img_tmp.name=""; 	$('div_sms').innerHTML="短信";
	
	sel_aux_reasoncode.disabled = true;
	text_transfer_number.disabled = false;
	
	$('div_msg').innerHTML="通话中...";
}



function UIforHangupEvent(){
	UIforLoginSuccessedEvent();
	
	$('div_msg').innerHTML="通话结束";
}



function UIforHoldCallEvent(){
	img_tmp = img_login;img_tmp.src  = "spimg/UN_logout_disable.png";		img_tmp.disabled = true;img_tmp.name="";   $('div_login').innerHTML="登出";
	img_tmp = img_ready;img_tmp.src  = "spimg/UN_ready_disable.png";		img_tmp.disabled = true; img_tmp.name="";        	$('div_ready').innerHTML="就绪";
	img_tmp = img_answer;img_tmp.src = "spimg/UN_hangup_disable.png";   	img_tmp.disabled = true; img_tmp.name="hangup";  $('div_answer').innerHTML="挂机";
	img_tmp = img_hold;img_tmp.src   = "spimg/UN_unhold_enable.png";		  img_tmp.disabled = false; img_tmp.name="unhold";        $('div_hold').innerHTML="取回";
	img_tmp = img_acw;img_tmp.src    = "spimg/UN_acw_disable.png";		  img_tmp.disabled = true; img_tmp.name="";         $('div_acw').innerHTML="ACW";
	img_tmp = img_tpin;img_tmp.src   = "spimg/UN_tpin_disable.png";		  img_tmp.disabled = true; img_tmp.name="";         
	
	img_tmp = img_textinput;img_tmp.src  = "spimg/UN_textinput_disable.png";	img_tmp.disabled = false; img_tmp.name=""; 	
	img_tmp = img_dial;img_tmp.src       = "spimg/UN_dial_disable.png";				img_tmp.disabled = true; img_tmp.name="";   $('div_dial').innerHTML="外拨";
	img_tmp = img_consult;img_tmp.src    = "spimg/UN_consult_disable.png";		img_tmp.disabled = true; img_tmp.name="";   $('div_consult').innerHTML="咨询";
	img_tmp = img_transfer;img_tmp.src   = "spimg/UN_transfer_disable.png";		img_tmp.disabled = true; img_tmp.name="";   $('div_transfer').innerHTML="转接";
	img_tmp = img_conferentce;img_tmp.src= "spimg/UN_conference_disable.png";	img_tmp.disabled = true; img_tmp.name="";   $('div_conferentce').innerHTML="会议";
	img_tmp = img_ivr;img_tmp.src        = "spimg/UN_ivr_disable.png";				img_tmp.disabled = true; img_tmp.name="";   $('div_ivr').innerHTML="IVR";
	
	img_tmp = img_email;img_tmp.src  = "spimg/UN_email_disable.png";	img_tmp.disabled = true; img_tmp.name=""; 	$('div_email').innerHTML="多媒体";
	img_tmp = img_fax;img_tmp.src    = "spimg/UN_fax_disable.png";		img_tmp.disabled = true; img_tmp.name=""; 	$('div_fax').innerHTML="传真";
	img_tmp = img_sms;img_tmp.src    = "spimg/UN_sms_disable.png";		img_tmp.disabled = true; img_tmp.name=""; 	$('div_sms').innerHTML="短信";
	
	sel_aux_reasoncode.disabled = true;
	text_transfer_number.disabled = true;
	
	$('div_msg').innerHTML="保持中...";
}

function UIforUnholdCallEvent(){
	UIforTalkingEvent();
	
	$('div_msg').innerHTML="通话中...";
}

function UIforConsultCallInit(){
	alert('咨询成功!');
	UIforTalkingEvent();
	
	$('div_msg').innerHTML="咨询中...";
}


function UIforTransferCallInit(){
	alert('转移成功!');
	UIforLoginSuccessedEvent();
	
	$('div_msg').innerHTML="转移成功";
}

function UIforConferenceCallInit(){
	alert('会议成功!');
	UIforTalkingEvent();
	
	$('div_msg').innerHTML="会议中...";
}

function UIforIVRInit(){
	img_tmp = img_login;img_tmp.src  = "spimg/UN_logout_disable.png";		img_tmp.disabled = true;img_tmp.name="";   $('div_login').innerHTML="登出";
	img_tmp = img_ready;img_tmp.src  = "spimg/UN_ready_disable.png";		img_tmp.disabled = true; img_tmp.name="";        	$('div_ready').innerHTML="就绪";
	img_tmp = img_answer;img_tmp.src = "spimg/UN_hangup_disable.png";   	img_tmp.disabled = true; img_tmp.name="hangup";  $('div_answer').innerHTML="挂机";
	img_tmp = img_hold;img_tmp.src   = "spimg/UN_hold_disable.png";		  img_tmp.disabled = true; img_tmp.name="unhold"; $('div_hold').innerHTML="保持";
	img_tmp = img_acw;img_tmp.src    = "spimg/UN_acw_disable.png";		  img_tmp.disabled = true; img_tmp.name="";         $('div_acw').innerHTML="ACW";
	img_tmp = img_tpin;img_tmp.src   = "spimg/UN_tpin_disable.png";		  img_tmp.disabled = true; img_tmp.name="";         
	
	img_tmp = img_textinput;img_tmp.src  = "spimg/UN_textinput_disable.png";	img_tmp.disabled = false; img_tmp.name=""; 	
	img_tmp = img_dial;img_tmp.src       = "spimg/UN_dial_disable.png";				img_tmp.disabled = true; img_tmp.name="";   $('div_dial').innerHTML="外拨";
	img_tmp = img_consult;img_tmp.src    = "spimg/UN_consult_disable.png";		img_tmp.disabled = true; img_tmp.name="";   $('div_consult').innerHTML="咨询";
	img_tmp = img_transfer;img_tmp.src   = "spimg/UN_transfer_disable.png";		img_tmp.disabled = true; img_tmp.name="";   $('div_transfer').innerHTML="转接";
	img_tmp = img_conferentce;img_tmp.src= "spimg/UN_conference_disable.png";	img_tmp.disabled = true; img_tmp.name="";   $('div_conferentce').innerHTML="会议";
	img_tmp = img_ivr;img_tmp.src        = "spimg/UN_ivr_disable.png";				img_tmp.disabled = true; img_tmp.name="";   $('div_ivr').innerHTML="IVR";
	
	img_tmp = img_email;img_tmp.src  = "spimg/UN_email_disable.png";	img_tmp.disabled = true; img_tmp.name=""; 	$('div_email').innerHTML="多媒体";
	img_tmp = img_fax;img_tmp.src    = "spimg/UN_fax_disable.png";		img_tmp.disabled = true; img_tmp.name=""; 	$('div_fax').innerHTML="传真";
	img_tmp = img_sms;img_tmp.src    = "spimg/UN_sms_disable.png";		img_tmp.disabled = true; img_tmp.name=""; 	$('div_sms').innerHTML="短信";	
	
	sel_aux_reasoncode.disabled = true;
	text_transfer_number.disabled = true;
	
	$('div_msg').innerHTML="转IVR中...";
	
	alert('转IVR成功');
	alert('话路从IVR转回,随路数据为:'+'18701575605,Y,201');
	UIforTalkingEvent();
	
	$('div_msg').innerHTML="IVR已转回";
}

