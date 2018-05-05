//二期修改章程内容  赋值给成员变量  （以便动态显示不同章程）
var textCont_PY = "A",textCont_SJ = "B",textCont_call = "C",textCont_qucall = "D",textCont_YB = "E",textCont_EM = "F",textCont_DW = "J",textCont_XX = "H";


//----------------------------------------------------

var conhisid_DTMM_SQ = "";  //动态密码申请
var conhisid_DTMM_XG = "";  //动态密码修改
var conhisid_DTMM_JS = "";  //动态密码解锁
var conhisid_SJYH_SQ = "";  //手机银行申请
var conhisid_SJYH_TJ = "";  //手机银行添加下挂账户
var conhisid_SJYH_CZ = "";  //手机银行重置登录密码
var conhisid_SJYH_ZZ = "";  //手机银行转账支付
var conhisid_SJYH_ZX = "";  //手机银行注销
var conhisid_DZYH_SQ = "";  //电子银行密码管理申请
var conhisid_DZYH_CZ = "";  //电子银行密码管理重置
var conhisid_DZYH_XG = "";  //电子银行密码管理修改
var conhisid_DHYH_SQ = "";  //电话银行密码管理申请
var conhisid_DHYH_CZ = "";  //电话银行密码管理重置
var conhisid_DHYH_XG = "";  //电话银行密码管理修改

//WYZS_code 2014/08/08
var conhisid_WYZS_SQ = "";  //网银证书 申请
var conhisid_WYZS_TJ = "";  //   添加下挂账户
var conhisid_WYZS_GS = "";  //   电子密盾开机密码挂失
var conhisid_WYZS_XE = "";  //   修改最高转账限额
var conhisid_WYZS_HFQY = "";  //恢复启用网银
var conhisid_WYZS_HFYZ = "";  //恢复电子密盾验证

var conhisid_TZLC = "";   //投资理财
var conhisid_JJGS = "";   //借记卡挂失
var conhisid_DZQD = "";   //借记卡挂失
var conhisid_KJJK = "";   //开借记卡
var conhisid_FUND = "";   //开借记卡
//----------------------------------------------------

var savePicIndex = 0;

var agentprints = "";

var EBankPDFpath = "";

var ZYW_DTWY_OK = 0;
var ZYW_SJYH_OK = 0;
var ZYW_DZMM_OK = 0;
var ZYW_DHMM_OK = 0;
var ZYW_WYZS_OK = 0;  //判断网银证书业务是否提交  2014/7/8 WYZS_code

var dtmm_sq = "";
var dtmm_xg = "";
var dtmm_js = "";

var sjyh_sq = "";
var sjyh_tj = "";
var sjyh_cz = "";
var sjyh_zz = "";
var sjyh_zx = "";

// 2014/7/9 WYZS_code
var wyzs_sq = "";
var wyzs_xg = "";
var wyzs_gs = "";
var wyzs_xe = "";   //限额变量
var wyzs_hfqy = ""; //恢复启用
var wyzs_hfyz = ""; //恢复密盾验证


//判断C#form中选择的业务类型   2014/08/26
var BussChoicType = "";
var WF_FUND_LC = "";

var dzyh_sq = false;
var dzyh_xg = false;
var dzyh_cz = false;
var dhyh_sq = false;
var dhyh_xg = false;
var dhyh_cz = false;

var goNextYN = 0;  //次变量用来判断是否有没有填写的问卷题目

var checkbox_KJJK = false;
var checkbox_DZQD = false;
var checkbox_TZLC = false;
var checkbox_JJGS = false;
var checkbox = 0;

//----专业版网银证书单选按钮变量！-- 2014/7/8 WYZS_code--
var checkbox_money_1 = false;
var checkbox_money_2 = false;
var checkbox_money_3 = false;
var checkbox_money_4 = false;

//----手机银行单选按钮防止重复消息变量  2016/110/8
var checkbox_money_1_sjyh = false;
var checkbox_money_2_sjyh = false;
var checkbox_money_3_sjyh = false;

var checkbox = 0;

var arrUserNames = "";  //用于记录始终 授权坐席用户名


// 2013-04-22 优化弹屏速度
// 2012-12-31.去掉所有url = ctxpath + ""。 测试环境websphere已调试，不再报空指针错误
var cardpath = __ctxPath + "/images/bkcards/";// 指定使用的北京银行卡片存放路径。
var nowBusinessType = "";   //当前业务类型的变量

var WJpage = 0;
var WJXX = 0;


//记录相应子业务类型的conhisid
//var conhisid_bus;

var isConn = 0;// 是否连接中，1：是，0：否
var isCheckID = 0;// 是否刷过身份证。0：否，1：是
var videoip = "";
// videoip = "192.168.1.4";
// videoip = "192.168.30.129

// 初始化是的坐席号、坐席使用的电话号、坐席端站点。弹屏传入参数
var agentno, agcallno, agsite , phoneNum;
var termno, termsite;

var agentName = "";

//--------------------
var totalBussines = "one";  //得知 一期Term  还是二期Term
//--------------------


var checkSF = 0; //是否点击身份核查按钮  0：未点击   1：已点击
var savepicDir;// 截图路径
// 第一个视频的变量值
var tmid, site, videoip, port;

var callinId = "";// 软电话callid

//办理综合页面时显示对应的卡号str
//var str_Cards_1 = "";  //卡1 str 
//var str_Cards_2 = "";  //卡2 str 
var card = "";         //总显示

//记录是否经过扫描客户的证件过程
var rememberBuss = 0 ;
var rememberScanCard = 0;   //记住是否扫描了身份证
//记录是否是第一次呼入进来插入后台数据记录 主要是操作： conhisid++
var fristBusiness = 0;

//txt身份核查文件路径
var textTXT = "";
//当前业务的卡号
var cardNumber = "";

// 系统使用的
var globalcurpage = 0;
var isManaged = 1;// 0：坐席没获得权限，1：坐席获得权限
var closecallflag = 0;// 0弹屏后未关闭软电话；1弹屏后已关闭软电话 ; 2电话通话中状态
var isSavepic = 0;// 0未拍照；1已拍照

// 统一封装alert
var dev_mode = false;

var scanPeCard = 0;  //记录二期需求中：随时可以扫描客户的证件信息变量
var showPrintpic = 0;//记录二期需求中：金博会 中 打印回收之后弹窗显示扫描的结果
var button_rem = 0;  //记住客户是否点击了子业务页面中的‘确认’按钮

//-------用于身份核查生成txt文件字段属性------
var SF_name=""; //用户姓名
var SF_cardID="";//用户身份证号码
var SF_result="";//核对结果
var SF_dName="";//业务名称
var SF_wangID="";//网点号
var SF_cp=""; //操作员
var SF_year="";//日期
var SF_time="";//时间
//----------------------------------------


var DTMM_counts=0;  	//动态密码勾选索引判断值       
var SJYH_counts=0;  	//手机银行..... 
var DZYH_counts=0;  	//电子银行密码.....
var DHYH_counts=0;  	//电话银行密码.....

var checkPwdType="";	//验证校验密码的类型
var checkClick = false;   //判断是否点击了核查结果
var checkERROR = false;    //判断核查结果是否是ERROR
var clickFlag = false;    //判断是否选择了核查结果类型，并确认保存text文件
var saveTakeImg = "";     //拍照图片变量

var NotPaper = "True";

var MessageCheckCode_TimeOut = 0;
var TimeOut_flag;
var TimeOut_flag_wyzs;
var sjyh_phone_checkcode = "";
var wyzs_phone_checkcode = "";
var MessageCheckCode_TimeOut_wyzs = 0;
var saveClearWav = "";  //标记高清录音路径变量


//-----------------------------------查看核查结果信息的页面--------------------------------
showCheckFuncInfo = function(scanInfo,checkInfo,PZImg) {};

function prn(str) {}

/**********************************************************
 * 按钮提示信息
 * */
function butInfoShow(str){}

/**
 * 恢复打印凭条按钮
 */
function resetButton(str){}


/********
 *   
 * 据审核通过判断客户选择的对应业务  将分类存储在后台，并分类明细
 * 业务类型： 1->动态网银(申)  2->动态网银(修)   3->动态网银(解锁)
 * 			4->手机银行(申)  5->手机银行(下挂)  6->手机银行(重置)
 * 			7->手机银行(设)  8->手机银行(注销)  10->电子渠道(总)
 * 			11->投资理财     12->密码挂失....
 * 			13->电子银行密码(申) 14->电子银行密码(修) 15->电子银行密码(重)
 * 		    16->电话银行密码(申) 17->电话银行密码(修) 18->电话银行密码(重)
 * */

/***
 *  conhisid_DTMM_JS = "19138";
	conhisid_SJYH_ZX = "19139";
	conhisid_DZYH_XG = "19140";
 */


/***********************************************************
 *  在同意章程之后判断选择的业务调整显示 相应的界面
 */
function ReadZCChoice(){}



/**
 * 读取日志文件判断是否发送了这条消息
 * @return {TypeName} 
 */
function readLog(){
		try{
			var fso = new ActiveXObject("Scripting.FileSystemObject"); 
			//node=node16&nodeip=192.168.10.16&device=ph-sip-1-node16&agent=5001&pwd=5001
			var f = fso.OpenTextFile(tfile,1);//只读
			var line; 
			while (!f.AtEndOfStream){
				line = f.ReadLine();
			}
			f.Close();
		}catch(ex){
			jsLog(logStrMsg("读取配置文件"+tfile+"失败!","INFO"));
			//alert("读取配置文件"+tfile+"失败!");
			return false;
		}
		return line;
	}


/*************************************
 * 身份核查
 */
var data = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",""];
var cus_name = "";
var cus_cerno = "";
var username = "";// agent

// 核查结果事件、审核照片缓存
var arrCheck = new Array(2);// 缓存索引。

function getDealno(filePath) {
	var node, min, max, cur;
	try {
		var fso = new ActiveXObject("Scripting.FileSystemObject");
		// node=node16&nodeip=192.168.10.16&device=ph-sip-1-node16&agent=5001&pwd=5001
		var f = fso.OpenTextFile(filePath, 1, true);// 只读
		var line;
		while (!f.AtEndOfStream) {
			line = f.ReadLine();
			if (line.indexOf('node=') == 0) {
				node = line.substring('node='.length, line.length);
			}
			if (line.indexOf('min=') == 0) {
				min = line.substring('min='.length, line.length);
			}
			if (line.indexOf('max=') == 0) {
				max = line.substring('max='.length, line.length);
			}
			if (line.indexOf('cur=') == 0) {
				cur = line.substring('cur='.length, line.length);
			}
		}
		// alert(max +"|" + min + "|" + cur);
		if (parseInt(cur) < parseInt(max)) {
			cur++;
		} else {
			cur = min;
		}
		// alert(cur < max);
		if (!node || !min || !max || !cur) {
			alert("流水号配置文件c:\\bobdealno.txt缺少数据！");
			return -1;
		}

		f.Close();

		var fh = fso.OpenTextFile(filePath, 2, true);	// 只读=1 ，只写=2 ，追加=8 等权限
		fh.WriteLine("node=" + node);
		fh.WriteLine("min=" + min);
		fh.WriteLine("max=" + max);
		fh.WriteLine("cur=" + cur);
		fh.Close();

	} catch (ex) {
		jsLog(logStrMsg("读取配置文件" + filePath + "失败!"+ ex,"ERROR"));
		//alert("读取配置文件" + filePath + "失败!" + ex);
		return -1;
	}
	// alert("current dealno is:" + cur);
	return cur;
}
function win_load() {}

//隐藏确认页面的信息以及清空值对应的
function visibledSomePage(type){}

function getNull(src, len, str) {}
function checkFunc() {
	jsLog(logStrMsg("Agent Click CheckIndentity Button !" ,"INFO"));
	SF_year = new Date().format('yyyy/MM/dd');
	SF_time = new Date().format('hh:mm:ss')
	checkSF = 1;
	//var ret = "error" ;
	//setTimeout("parseXmlFunc('error')",60000);   //模拟测试 ，延迟1分钟后自动给一个参数   赋值身份核查页面
	//暂时模拟身份核查的事件
	myocx.BankIDCardVeryfication("00301", getNull(getDealno("c:\\checkidcard.txt") + "", 6, "0"), "3v4","0000", cus_name, cus_cerno);
}
function parseXml(xml) {

}
var checkretInfo = "";  //核查返回的结果拼接字符串
function parseXmlFunc(xml) {}
function checkret(value) {}
function checkpic(value) {}
function checkAll(){}
/**
 * @param:
 * @param {Object} value
 */
function checkhuji(value) {}

function saveData(value, index) {}

function checkphone(value, id) {}
function checkphoneAny() {}

function checkNull(id) {}

function selected() {}

function checkPSResult(info) {}

function makePrintFile() {}

function showPage() {
	makePrintFile();
}

// 表单数据缓存
var cus_Map = new Map();
function agentParam() {
	try {
		jsLog(logStrMsg("开始读取agentParam配置文件","INFO"));
		var fso = new ActiveXObject("scripting.filesystemobject");
		var txtstream = fso.openTextFile('c:\\agent.config');
		while (!txtstream.atEndOfLine) {
			var line = txtstream.ReadLine();
			if (line.indexOf('agentno=') == 0) {// var agentno, agcallno,
				// agsite;
				agentno = line.substring('agentno='.length, line.length);
				jsLog(logStrMsg("agentno="+agentno,"INFO"));
			} else if (line.indexOf('agentcallno=') == 0) {
				agcallno = line.substring('agentcallno='.length, line.length);
				jsLog(logStrMsg("agcallno="+agcallno,"INFO"));
			} else if (line.indexOf('agentsite=') == 0) {
				agsite = line.substring('agentsite='.length, line.length);
				jsLog(logStrMsg("agsite="+agsite,"INFO"));
			} else if (line.indexOf('savepicDir=') == 0) {
				savepicDir = line.substring('savepicDir='.length, line.length);
				jsLog(logStrMsg("savepicDir="+savepicDir,"INFO"));
			} else if (line.indexOf('videoIndex0=') == 0) {
				videoIndex[0] = line.substring('videoIndex0='.length,
						line.length);
				jsLog(logStrMsg("videoIndex[0]="+videoIndex[0],"INFO"));
			} else if (line.indexOf('videoIndex1=') == 0) {
				videoIndex[1] = line.substring('videoIndex1='.length,
						line.length);
				jsLog(logStrMsg("videoIndex[1]="+videoIndex[1],"INFO"));
			}

		}
		txtstream.close();
		txtstream = null;
		fso = null;
	} catch (e) {
		jsLog(logStrMsg("read C:\\agent.config loss try catch info : " + e,"ERROR"));
	}
}
//2015-11-09 新增方法，读取elvish.properties文件
function readElvish(){
	try {
		jsLog(logStrMsg("开始读取elvish配置文件","INFO"));
		var fso = new ActiveXObject("scripting.filesystemobject");
		var txtstream = fso.openTextFile('c:\\elvish.properties');
		while (!txtstream.atEndOfLine) {
			var line = txtstream.ReadLine();
			if (line.indexOf('phoneNum=') == 0) {// var agentno, agcallno,
				phoneNum = line.substring('phoneNum='.length, line.length);
				jsLog(logStrMsg("phoneNum="+phoneNum,"INFO"));
			}
		}
		txtstream.close();
		txtstream = null;
		fso = null;
	} catch (e) {
		jsLog(logStrMsg("read C:\\elvish.properties loss try catch info : " + e,"ERROR"));
	}
}

var arr;
var videoIndex = [1, 0];

function videoinit() {
	//alert("videoinit function begin ...");
	myocx.VideoInitEx1(agentno, agsite, 2, 6006);
	jsLog(logStrMsg("调用myocx.VideoInitEx1接口完成 Path：agentno="+agentno+"//agsite="+agsite,"INFO"));
}
function videosetpara() {
	myocx.VideoAgentSetParaEx1(tmid, site, videoip, port, 0);
	myocx.VideoAgentSetParaEx1(tmid, site, videoip, port, 1);
	jsLog(logStrMsg("videosetpara()-->tmid="+tmid+"//site="+site+"//videoip="+videoip+"//port="+port,"VIDEO"));
}

function videostartvedio() {
	jsLog(logStrMsg("videostartvedio()-->videoIndex[0] = "+videoIndex[0],"VIDEO"));
	myocx.VideoStartConferenceEx2(0, 12345, 0, 1, "", videoIndex[0], 0, 0,320, 240);
}
function videostopvedio() {
	jsLog(logStrMsg("videostopvedio()-->videoIndex[0] = "+videoIndex[0],"VIDEO"));
	try {
		myocx.VideoStopConferenceEx(0, 12345, 0, videoIndex[0]);
	} catch (e) {
		jsLog(logStrMsg(e,"VIDEOERROR"));	
	}
}
function videosavepic() {
	var picpath = savepicDir + "C" + dealno + ".bmp";
	myocx.VideoSaveVideoFrameEx(picpath, videoIndex[0]);
	jsLog(logStrMsg("videosavepic()-->myocx.VideoSaveVideoFrameEx(picpath, videoIndex[0])","INFO"));
	return picpath;
}

function videoexit() {
	myocx.VideoExit();
}
function videorate1() {
	var rate = myocx.VideoGetRateEx(videoIndex[0]);
}

function videostartvedio1() {
	jsLog(logStrMsg("videostartvedio1() videoIndex[1] = "+videoIndex[1],"VIDEO"));
	myocx.VideoStartConferenceEx2(0, 12345, 0, 1, "", videoIndex[1], 0, 0,320, 240);
}
function videostopvedio1() {
	jsLog(logStrMsg("videostopvedio1() videoIndex[1] = "+videoIndex[1],"VIDEO"));
	myocx.VideoStopConferenceEx(0, 12345, 0, videoIndex[1]);
}
function videorate2() {
	var rate = myocx.VideoGetRateEx(videoIndex[1]);
}

function VideoSetDealno(str) {
	myocx.VideoSetBusinessCode(str);
}// 视频文件名接口
// 脚本
function agentinit() {
	if (isConn == 0) {
		//alert("agentinit function begin ...");
		 agentParam();
		 readElvish();
		jsLog(logStrMsg("agentinit()函数调用videoInit();","INFO")); //记录日志
		videoinit();
		myocx.AgentInitEX(agentno, agcallno, agsite);
		jsLog(logStrMsg("调用myocx.AgentInitEX接口完成 Path：agentno="+agentno+"//agcallno="+agcallno+"//agsite="+agsite,"INFO"));
	} else {
		prn("isconn:" + isConn);
	}
}
function agentmakecall(t,s){
	jsLog(logStrMsg("agentmakecall()","INFO"));
	if (isConn == 0) {
		/** 参数化 */
		myocx.AgentMakeCall(t, s, 123456, 654321, 1, 1, 15000);
	} else {// 请求连接时，发现已连接，先断开，再连接
		myocx.AgentMakeCall(t, s, 123456, 654321, 1, 1, 15000);
	}
}
function agentanswer() {
	myocx.AgentAcceptCallEx();
}
function agentexit() {
	myocx.AgentExit();
}
function getvideo() {
	var a = myocx.AgentGetVideoInfoEx();
	// 格式：终端编号,IP地址,端口号，IP地址和端口号用于视频控件
	var videoPm = a.split(",");
	if (videoPm.length != 3) {
		prn("获取视频信息失败！此级别是否停止办理业务？");// TODO 此级别是否停止办理业务？
	} else {
		tmid = videoPm[0];
		site = videoPm[1];
		videoip = videoPm[2];
		port = videoPm[3];
	}
}

function posPlay() {
	myocx.AgentSendMessage(1, 2, "qqqqqqqqqqqqqqqq");
}
//对应相应的事件函数 RegAgentEvtScanResult(lScanResult, strScanFilePath)
function scandoc() {
	prn('agent scandoc');
	if (cus_cerno == null || cus_cerno == undefined) {
		alert("扫描签字文件时，发现客户的证件号不存在，请确认是否存在此问题!");
		cus_cerno = "Agent has checked that var is not null";
	} else {
		myocx.AgentScanDoc(cerno + "bob.jpg", 0);// 调用此接口，传入文件名无意义？
	}
}

function confirmCusInfos(){}

function showprotocol() {}
// 控制权,code:被控对象id，flag:是否被控制（可编辑）。只有填单页1005、1006才控制
function manage(code, flag) {}
// 控制客户端。释放坐席端
// function
var cus_sheng = "";  //缓存数据
var cus_city = "";
var cus_qu = "";
var cus_addinfo = ""; 
var addr2 = "";     //总体的地址信息
var cus_sheng_key = ""; //缓存省的id
var cus_sheng_key_ts="";  //对特殊直辖市的消息传送保证无误
var cus_city_key = "";


function sysn(name) {}

//同步地址信息
function sysAdd(name,id){}

//测试 挂失业务填写页面省市县显示传值‘
function GS_sysAdd(name , id){}


function combosysn(name, itemid, value) {}

function rel() {}

function agenthangup() {
	myocx.Agentstopconferenceex();
}
function printidcard(str) {
	if(str == "888"){
		getMsgBody4G2("M0888","P888",4,"",""); 
	}else{
		myocx.AgentCheckID("123.bmp"); //传参调用发送消息
	}
}
// 同步select
function sysVoc(name, index) {
	var mysel = Ext.getCmp(name);
	mysel.setValue(index);
}
// 封装弹出框
function myAlert(title, content) {}
function myConfirm(title, content, fn_ok, fn_no) {}

/**
 * ‘友情提示’弹窗专用
 */
function friendShipMsg(mes){}

/**
 * ‘友情提示2’弹窗专用2
 */
function friendShipMsg_1(mes){
	var win = new Ext.Window({
			width : 500,
			title : '友情提示',
			height : 200,
			html : '<font style="font-size:28px;color:red"><br>&nbsp;&nbsp;&nbsp;&nbsp'+mes+'</font>',
			modal : true,
			buttonAlign : 'center',
			buttons : [{
				text : '<font style="font-size:16px;margin-top:0px">确定</font>',
				width : 60,
				height : 30,
				handler : function() {
					win.close();
					
				}
			}]
		});
		win.show();
}



/**
 * 超3张专用弹窗
 */
function outOfThreeCards(mes){}



/**
 * ‘电子渠道’电子银行密码输错3次弹窗专用   cus_dzyhpwd',cus_checkpwdinfo
 */
function transactionReturnMsg(mes){
	var win = new Ext.Window({
			width : 500,
			title : '友情提示',
			height : 200,
			//html : '<font style="font-size:28px;color:red"><br>&nbsp;&nbsp;&nbsp;&nbsp'+mes+'</font>',
			html : '<font style="font-size:28px;color:red"><br>&nbsp;&nbsp;&nbsp;&nbsp'+mes+'</font>',
			modal : true,
			buttonAlign : 'center',
			buttons : [{
				text : '<font style="font-size:16px;margin-top:0px">返回视频页</font>',
				width : 60,
				height : 30,
				handler : function() {
					//Ext.getCmp("101902").setValue("已有客户卡号，等待客户确认卡号并进行下一步");
					//并且发送消息告诉曲晓跳转到视频通话页面
					getMsgBody4G2("M0202","P034",1,"P004",""); 
					fristBusiness ++;
					synWithTerm(0,1);
					visibledSomePage(0);
					//Ext.getCmp("tow_TZLC").setValue(false);	Ext.getCmp("tow_JJGS").setValue(false);Ext.getCmp("tow_KJJK").setValue(false);	Ext.getCmp("tow_DZQD").setValue(false);
					BussChoicType == "";
					win.close();
					
					//myocx.InvokeBusinessForm(1,"",0,YesOrNo_FUND);
					myocx.InvokeBusinessForm(10,"",101,"");
					jsLog(logStrMsg("调用winform->myocx.InvokeBusinessForm[AgentModuleChoice.exe]","INFO"));
				}
			},{
				text : '<font style="font-size:16px;margin-top:0px">返回综合填写页</font>',
				width : 60,
				height : 30,
				handler : function() {
					 //并且告诉VTM返回到填写页面
					//visibledSomePage(0);
					getMsgBody4G2("M0202","P034",1,"P012","");
					visibledSomePage(1);
					synWithTerm(12,1);
					win.close();
				}
			},{
				text : '<font style="font-size:16px;margin-top:0px">继续输入密码</font>',
				width : 60,
				height : 30,
				handler : function() {
					//发送消息让VTM继续输入密码环节
					getMsgBody4G2("M0202","P034",1,"P018","");
					Ext.getCmp("cus_dzyhpwd").setValue("");
					Ext.getCmp("cus_checkpwdinfo").setValue("");
					win.close();
				}
			}]
		});
		win.show();
}


//支付密码输错3次以及电子银行密码输错6次锁定
function ZForDZsixError(mes , YWtype){
	var win = new Ext.Window({
			width : 500,
			title : '友情提示',
			height : 200,
			html : '<font style="font-size:28px;color:red"><br>&nbsp;&nbsp;&nbsp;&nbsp'+mes+'</font>',
			modal : true,
			buttonAlign : 'center',
			buttons : [{
				text : '<font style="font-size:16px;margin-top:0px">返回视频页</font>',
				width : 60,
				height : 30,
				handler : function() {
					//Ext.getCmp("101902").setValue("已有客户卡号，等待客户确认卡号并进行下一步");
					getMsgBody4G2(YWtype,"P034",1,"P004","");
					fristBusiness ++;
					synWithTerm(0,1);
					if(YWtype == "M0202"){
						visibledSomePage(0);
					}
					//Ext.getCmp("tow_TZLC").setValue(false);	Ext.getCmp("tow_JJGS").setValue(false);Ext.getCmp("tow_KJJK").setValue(false);	Ext.getCmp("tow_DZQD").setValue(false);
					BussChoicType == "";
					win.close();
					//myocx.InvokeBusinessForm(1,"",0,YesOrNo_FUND);
					myocx.InvokeBusinessForm(10,"",101,"");
					jsLog(logStrMsg("调用winform->myocx.InvokeBusinessForm[AgentModuleChoice.exe]","INFO"));
				}
			}]
		});
		win.show();
}


function DHYHWrithError(mes , YWtype){
	var win = new Ext.Window({
			width : 600,
			title : '友情提示',
			height : 200,
			html : '<font style="font-size:28px;color:red"><br>&nbsp;&nbsp;&nbsp;&nbsp'+mes+'</font>',
			modal : true,
			buttonAlign : 'center',
			buttons : [{
				text : '<font style="font-size:16px;margin-top:0px">返回综合填写页</font>',
				width : 60,
				height : 30,
				handler : function() {
				 //并且告诉VTM返回到填写页面
					getMsgBody4G2(YWtype,"P034",1,"P012","");
					synWithTerm(12,1);
					win.close();
				}
			}]
		});
		win.show();
}



function backToindex_ok(btn) {
	jsLog(logStrMsg("SENDMESSAGE:lObjectID:1,lItemID:1,message:backToindex","MESSAGE"));
	myocx.AgentSendMessage(1, 1, "backToindex");//
}
function backToindex_cancle(btn) {
}
// 日志变量
var begindate, enddate, actioninfos;
Date.prototype.format = function(format) // author: meizz
{
	var o = { 
		"M+" : this.getMonth() + 1, // month
		"d+" : this.getDate(), // day
		"h+" : this.getHours(), // hour
		"m+" : this.getMinutes(), // minute
		"s+" : this.getSeconds(), // second
		"q+" : Math.floor((this.getMonth() + 3) / 3), // quarter
		"S" : this.getMilliseconds()
		// millisecond
	};
	if (/(y+)/.test(format))
		format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4
						- RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(format))
			format = format.replace(RegExp.$1, RegExp.$1.length == 1
							? o[k]
							: ("00" + o[k]).substr(("" + o[k]).length));
	return format;
};
// 注册ocx事件
function Regagentalert(strCallMessage) {
	// prn("agent:有客户请求连接" + strCallMessage);
	// begindate = new Date().format("yyyy-MM-dd hh:mm:ss");
	// actioninfos = begindate + " agent:有客户请求连接\n";
}
// 发起连接超时AgentEvtMakeCallTimeoutEx(long
// lReason)、被连接超时AgentEvtAcceptCallTimeout(lReason)
function RegAgentCallTimeout(lReason) {// 发起呼叫，对方应答超时
	alert("AgentEvtMakeCallTimeoutEx:" + lReason);
}
function RegAgentAcceptCallTimeout(lReason) {// 被客户端连接时，才用
	alert("AgentEvtAcceptCallTimeout:" + lReason);
}

function Regagentconn_1(strCallMessage){
	jsLog(logStrMsg("Regagentconn_1(strCallMessage)  @Param:strCallMessage="+strCallMessage,"INFO")); //记录日志
	jsLog(logStrMsg("坐席员的照片路径 -> 111","INFO")); //记录日志
	jsLog(logStrMsg("坐席员的照片路径 -> ("+curagent.user.photo+");","INFO")); //记录日志
	
	myocx.AgentSendMessage(1, 8989, curagent.user.photo == null
					? "images/photo_01.jpg"
					: curagent.user.photo);
	myocx.AgentSendMessage(1, 8990, curagent.user.gonghao == null
					? "G001"
					: curagent.user.gonghao);
	
	
	
	//jsLog(logStrMsg("strCallMessage_1已经得到值 = "+strCallMessage_1,"INFO")); //记录日志
	// 初始化禁用表单。坐席先输入，屏蔽
	// manage('100501', true);//通信有bug
	// Ext.getCmp('100501').setDisabled(true);
	isConn = 1;
	// alert("agent:客户已连接" + strCallMessage);
	// 记录客户连接开始时间
	begindate = new Date().format("yyyy-MM-dd hh:mm:ss");
	actioninfos = begindate + "agent:客户已连接\n";
	// 获得strTerminalNo,strSiteID,lLogNo,lCallID,lBusinessType,lSubType,lResult
	// 设置设备号strTerminalNo和所属机构strSiteID
	//T002|S002|10.160.4.153|6006|0|0|0
	var stringArray = new Array();
	//stringArray = strCallMessage.split("|");
	// for(var tmp=0; tmp < stringArray.length; tmp++){
	// prn(stringArray[tmp]);
	// }TODO
	if (stringArray.length < 3) {
		Ext.getCmp('strTerminalNo').setValue('设备异常！未连接...');
		Ext.getCmp('strSiteID').setValue('设备异常！未连接...');
		return;
	}
//	Ext.getCmp('strTerminalNo').setValue(stringArray[0]);
//	Ext.getCmp('strSiteID').setValue(stringArray[1]);
	Ext.getCmp('call_date').setValue(begindate);
	if (curagent.user.photo == null || curagent.user.photo == "") {
		alert("坐席员的照片为空！请上传照片！");
	} else if (curagent.user.gonghao == null || curagent.user.gonghao == "") {
		alert("坐席员的工号为空！请联系管理员！");
	}
	//cifangfa shi zuo xi yuan no money no more 
	
	jsLog(logStrMsg("dealno[" + dealno + "]  siteNo["+ agsite+"]   agentNo["+agentno+"]   agcallno["+agcallno+"]","INFO")); //记录日志
	// videostartvedio();
}


function CallIn(){
	//打开CallIn页面；
	App.clickTopTab("CusPersonalFormCallin",_cfg_1,function() {},function(){
		var tid = window.setInterval(function(){
			jsLog(logStrMsg("经过手动延时一秒打开cusPersonalFormCallin弹屏js","INFO"));
			if(typeof(CusPersonalFormCallin) != 'undefined'){
				//CusPersonalFormCallin.initPanel(customerId);
				window.clearInterval(tid);
			}
		},1000)
	},function() {
		//alert("createHisConHis  _cfg:" + _cfg);
		//alert("customerId:" + customerId);
		//alert("CALLINNO:" + CALLINNO);
		//alert("customerNo:" + customerNo);
		jsLog(logStrMsg("CusPersonalFormCallin.initData(customerId,CALLINNO,customerNo);","INFO"));
		CusPersonalFormCallin.initData(customerId,CALLINNO,customerNo);
		var arr = _cfg_1.split(',');
		cusId = arr[0];
		CusPersonalFormCallnumber = arr[1];
		cusNo = arr[5];
		if (cusId == 'null') {
			cusId = -1;
		}
	});
}

//打开C#form窗口
function BusFormShow(){
	//myocx.InvokeBusinessForm(1,"",0,YesOrNo_FUND);
	myocx.InvokeBusinessForm(10,"",101,"");
	jsLog(logStrMsg("调用winform->myocx.InvokeBusinessForm[AgentModuleChoice.exe]","INFO"));
}
//关闭C#form窗口
function BusFormClose(){
	jsLog(logStrMsg("BusFormClose -> form接口","INFO"));
	myocx.InvokeBusinessForm(2,"",1,"");
	myocx.InvokeBusinessForm(3,"",1,"");
	myocx.InvokeBusinessForm(4,"",1,"");
	myocx.InvokeBusinessForm(5,"",1,"");
	myocx.InvokeBusinessForm(6,"",1,"");
	myocx.InvokeBusinessForm(7,"",1,"");
	myocx.InvokeBusinessForm(11,"",1,"");
	myocx.InvokeBusinessForm(8,"",777,"");
	jsLog(logStrMsg("BusFormClose -> 成功杀掉所有WinForm exe程序","INFO"));

	//setTimeout("closeCMP_FORM()",5000);
	
}

function closeCMP_FORM(){
	myocx.InvokeBusinessForm(9,"",777,"");
}
function Regagentconn(strCallMessage) {
	//jsLog(logStrMsg("Regagentconn(strCallMessage)  @Param:strCallMessage="+strCallMessage,"INFO   ")); //记录日志
	//myocx.InvokeBusinessForm(1,"",0,YesOrNo_FUND);  //打开首页选择业务程序
	//myocx.InvokeBusinessForm(10,"",0,"");
//	myocx.InvokeBusinessForm(9,"",0,"");  //打开消息弹窗程序
	//jsLog(logStrMsg("调用winform-> 成功打开agentIndexPage.exe和CPM_Message_Form.exe程序","INFO   "));
	// 连接成功后，初始化视频信息，开启视频
	//jsLog(logStrMsg("Regagentconn()函数调用videoInit();","INFO   ")); //记录日志
	//videoinit();
	//var a = myocx.AgentGetVideoInfoEx();
	//jsLog(logStrMsg("调用接口myocx.AgentGetVideoInfoEx()","INFO   ")); //记录日志
	// 格式：终端编号,IP地址,端口号，IP地址和端口号用于视频控件
//	var videoPm = a.split(",");
	//if (videoPm.length != 4) {
		//alert("获取视频信息失败！此级别是否停止办理业务？");// TODO 此级别是否停止办理业务？
		// exit（）
	//} else {
		//tmid = videoPm[0];
		//site = videoPm[1];
		//videoip = videoPm[2];
		//port = videoPm[3];
		// tmid = "T001";
		// site = "S002";
		// videoip = "10.10.142.188";
		// videoip = "192.168.30.129";
		// port = 6005;
		//videosetpara();
		// alert('video info:' + a);
		//jsLog(logStrMsg("发送消息myocx.AgentSendMessage(1, 1, videoinitok);","INFO")); //记录日志
		//myocx.AgentSendMessage(1, 1, "videoinitok");
	//}
	//strCallMessage_1 = strCallMessage;
//	jsLog(logStrMsg("setTimeOut","INFO")); //记录日志
	//setTimeout("CallIn()",2000);
//	jsLog(logStrMsg("setTimeOut_1","INFO")); //记录日志
	//CallIn();
	//setTimeOut('',3000);
	
	//Regagentconn_1(strCallMessage);
}
var idinfos = '';
var cusname = "", cerno = "", savepic = "" ,cus_oldName="" ,cus_oldCardID ="" ;
var picpath_copy="";
var checkName = "";  //核查时需要核对的信息，将扫描证件返回的信息拼接字符串保存
var cusName_1 = "";
function RegIDCardResult(lScanResult, strCardInfo) {
	//Ext.getCmp("scanIndentity").setDisabled(false);   //证明扫面事件响应， 显示扫描证件按钮
	jsLog(logStrMsg("Come in RegIDCardReslt(IScanResult,strCardInfo) Funciont","INFO")); //记录日志
	var testIDcard = "XXX,1,汉族,19790719,XX省XXXXXX区XXX小区XXX号楼X单元X号          ,370611XXXX07yy40xx,XXX市公安局XXX分局     ,20080201,20280201,,E:\tempfile\id.bmp,0"; // 12个
	testIDcard = strCardInfo;
	prn("扫描结果:[" + lScanResult + "]" + testIDcard);
	jsLog(logStrMsg("RegIDCardResult info：" + testIDcard,"INFO")); //记录日志
	var idInfoS_1 = testIDcard.split(",");
	var path = idInfoS_1[10];
	checkName = idInfoS_1[0]+"&"+(idInfoS_1[1] == 1 ? '男' : '女')+"&"+idInfoS_1[2]+
	                         "&"+idInfoS_1[3]+"&"+idInfoS_1[4]+"&"+idInfoS_1[5]+
	                         "&"+idInfoS_1[6]+"&"+idInfoS_1[7]+"-"+idInfoS_1[8]+
	                         "&"+idInfoS_1[10];
	jsLog(logStrMsg("Scanner IndentityCard StringBuffer Result -> " + checkName,"INFO")); //记录日志
	var img = '<img src="'+ path + '"style="width:80px;margin-left:10px"/>';
	if (lScanResult == 0) {
		rememberScanCard = 1;
		if(scanPeCard == 0){  //如果当前扫描的是在开卡或者电子渠道流程中扫描证件就要存储相应信息
			idinfos = testIDcard.split(",");
			cusname = idinfos[0];
			cus_name = cusname;
			cerno = idinfos[5];
			cus_cerno = cerno;
			cusName_1 = idinfos[0];
			// 填单页面的基本信息
			var num = idinfos.length;// 身份证的信息中带有代码，截取倒数第二个；10号
			var idpicarr = idinfos[num - 1].split('\\');
			var picpath = idpicarr[0];
			prn(idpicarr);
			for (var a = 1; a < idpicarr.length; a++) {
				picpath += '\\' + idpicarr[a];
			}
			var idpic = '<div style="width:100px;text-align:center"><img src="'
					+ picpath + '" style="width:80px;margin-left:20px"/></div>';
			prn('ag' + globalcurpage);
			globalcurpage = 2;// 身份识别
			
			if(BussChoicType == "FUND"){
				jsLog(logStrMsg("此处不用打开->myocx.InvokeBusinessForm[FundBusinessFlow.exe] 102：拍照Form SHOW","INFO"));
			}else{
			}
			cus_oldName = idinfos[0];
			cus_oldCardID = idinfos[5];
		}else{
			setTimeout("", 500); 
		}
	} else {
		jsLog(logStrMsg("RegIDCardResult lose info ：[ " + lScanResult +" ]","INFO")); //记录日志
	}
}
var isfirstIdcard = 0;
function agentMGfirst() {}
//2014/7/8 WYZS_code
function agentSetDisabled(name,type) {}

/********
 * 2014/08/13  Mr SeaBreeze
 * 扫描完身份证后，VTM做查询客户信息交易时，弹窗阻挡座席拍照，返回后即可进行拍照审核；
 * */
function checkCBOD(type){}


// 同步页面方法，0终端同步,1坐席页内自同步
function synWithTerm(curpage, flag) {
	var card = Ext.getCmp('cardpanel');
	var t = parseInt(curpage) + 0;
	// 程媛媛修改导致页码变动+1
	// prn(card);
	if (card != null) {
		if (flag == 0) {
			// 写死对应页码。
			if (curpage == 1) {// 返回、卡选择页面
				// t = isfirstIdcard == 0 ? 1 : 0;//对应客户端页面
				t = 0;
			} else if (curpage == 4) {// 填单页,1
				//agentMGfirst();// 坐席端先输入
				//t = 4;
				t = 5;  //测试-> 由于新增了一个viewpanl页签往后移动一位
				
			} else if (curpage == 5) {// 停留在客户信息审核页面，客户继续则展示审核按钮。
				jsLog(logStrMsg("SENDMESSAGE:lObjectID:1,lItemID:1,message:cus051109","MESSAGE"));
				myocx.AgentSendMessage(1, 1, "cus051109");// 避免两端同时点击按钮造成的客户被控制bug
				t = 4;// 跳过附加业务
			} else if (curpage == 6) {//
				t = 5;
			} else if (curpage == 7) {// 停留在客户信息审核页面，客户继续则展示审核按钮。
				t = 6;//
			} else if (curpage == 8) {
				t = 7;
			} else if (curpage == 9) {
				t = 7;// 由于坐席端缺少页面，导致需要修改对应页码
			} else if (curpage == 10) {
				t = 8;// 由于坐席端缺少页面，导致需要修改对应页码
			} else if (curpage == 11) {
				t = 10;// 由于坐席端缺少页面，导致需要修改对应页码
			} else if (curpage == 12) {
				t = 11;// 由于坐席端缺少页面，导致需要修改对应页码
				// 更新联络历史状态为成功。1001
			}else if(curpage == 13){
				t = 11;
			}else if(curpage == 14){    //----------↓ 都是 暂时测试
				t = 12;
			}else if(curpage == 15){
				t = 13;
			}else if(curpage == 16){
				t = 14;
			}else if(curpage == 17){
				t = 15;
			}else if(curpage == 18){
				t = 16;
			}else if(curpage == 19){
				t = 17;
			}else if(curpage == 20){
				t = 18;
			}else if(curpage == 21){
				t = 19; 				 //---------- ↑ ----------
			} else {
				prn('curpage:' + curpage);
			}
			globalcurpage = t;// 保存当前坐席端的页码。
			card.getLayout().setActiveItem(globalcurpage);
		} else {
			globalcurpage = t;// 保存当前坐席端的页码。  102111
			card.getLayout().setActiveItem(globalcurpage);
		}
	}
}

function testforscan() {
	var picpath = "d:\\tempfile\\bob.bmp";
	var pic = '<div style="width:800;height:700;overflow:auto;text-align:center"><img style="width:600;height:670;padding:10px;text-align:center" src="'
			+ picpath + '" /></div>';
}
function showcuspic(picpath) {}
var s = "";
/**
 * 随时都能扫描客户证件
 */
function showScanPeopleCard(PInfo,img) {}

//客户在确认页面点击返回按钮  清空变量
var c1 = 0 ;
var c2 = 0 ;
var c3 = 0 ;
var c4 = 0 ;
var c5 = 0 ;   //2014/7/10 WYZS_code

/***
 * 赋值确认业务项
 */
function setSurePage(){}
/**
 *	校验手机文本框等等的一些数据   ①  ②
 */
function checkOutText(type){}

//-------------------------金博会暂时使用-------------------------
function showCusInfo(str){}
//--------------------------------------------------------------
/**
 * 往曲晓控件里存储流水号 和 版本号
 */
function setMyocxInfo(type,info){
	if(type == 0){
		myocx.SetAgentLoginID(info,"");
	}else{
		myocx.SetVersionNo(info);
	}
}
/**
 * 读取控件里存储流水号 和 版本号
 */
function getMyocxInfo(type){
	if(type == 0){
		return myocx.GetDealNo();
	}else{
		return myocx.GetVersionNo();
	}
}


function Regagentdisconn(){
	jsLog(logStrMsg("Regagentdisconn()","INFO"));
	// prn("agent:客户断开连接");
	enddate = new Date().format("yyyy-MM-dd hh:mm:ss");
	actioninfos += enddate + " agent:客户断开连接\n";
	// prn(actioninfos);
	isConn = 0;// 重置连接标志
	isCheckID = 0;// 是否刷过身份证。0：否，1：是

	//videostopvedio();
	//videostopvedio1();

	//friendShipMsg_1("请注意：和客户端连接断开！");
	myocx.InvokeBusinessForm(9,"",222,"请注意：和客户端连接断开！");  //消息弹窗程序
}
function check_datafuncTest() {
	var info = "徐涛,X TA,男,中国,身份证,1980年1月1日,2000/8~2016/8,110102198001011234,2011年1月1日,2012年12月31,1391021102,010-66066666,企业事业单位负责人,北京市东城区建外大街甲66号,北京金宇集团有限公司,本人,100005";
	
	check_datafunc(info);
}


var phone_fm = "";
var call_fm = "";

/**
 * 
 * @param {Object} page  表示页数
 * @param {Object} sma	 表示行数索引 小
 * @param {Object} max	 表示行数索引 大
 */
function hiddenLiCaiPage(page,sma,max){
	WJXX = page;
	var s = sma;  //第一页  22行
	//表示页面要发生跳转  hiddenLiCaiPage(1,1,22);  hiddenLiCaiPage(2,23,38);  hiddenLiCaiPage(3,39,59);
	for(var i = 0 ; 58 >= i ; i++){
		Ext.getCmp("WJ_"+(i+1)+"").setVisible(false); //隐藏 
	}
	for(var i = 0 ; (max-sma) >= i ; i++){
		Ext.getCmp("WJ_"+s+"").setVisible(true);   //显示
		s+=1;
	}
}

function check_datafunc(info) {
	Ext.Ajax.request({
				url : __ctxPath + '/customer/checkdataConHis.do',
				method : 'post',
				params : {
					datas : info
				},
				success : function(response, options) {
					//陈娜,CHEN NA,女,中国,第二代居民身份证,19810105,有期限,420502198101050029,20070228,20270228,15988277260,-,不便分类的其他从业人员,湖北省,宜昌市,西陵区,常刘路23-5-105号,,本人,312000,T011201411161136,T011,_000zD,774517975@qq.com,end
					phone_fm = info.split(",")[10];
					call_fm = info.split(",")[11];
					if ((response.responseText).trim() == "SUCC") {//
						synWithTerm(6, 1);   // 坐席下一页
						jsLog(logStrMsg("后台校验客户信息后，跳转审核资料也。参数：info="+info,"INFO"));
						//后台校验客户信息后，跳转下一页，调用控件，弹窗form
						jsLog(logStrMsg("SENDMESSAGE:lObjectID:1,lItemID:6,message:051109next","MESSAGE"));
						isManaged = 0;
					} else {
						jsLog(logStrMsg("INFO:check_datafunc() 校验信息 = " + response.responseText,"INFO"));
						jsLog(logStrMsg("调用winform->myocx.InvokeBusinessForm[SetCustomerInfo.exe] 5：show button","INFO"));
					}
				},
				failure : function(response, options) {
				}
			});
}

function cusprintinfo(ret) {   
	if (ret == 0) {
		printdoc();
	} else {
		prn('gloval:' + globalcurpage);
		jsLog(logStrMsg("SENDMESSAGE:lObjectID:1,lItemID:5,message:needsyn","MESSAGE"));
		myocx.AgentSendMessage(1, 5, 'needsyn');
		synWithTerm(5, 1);
		
	}
}

function printdoc() {// 打印功能待开发********************************
	//Ext.getCmp("HSbutton").setVisible(true); //显示表单回收按钮
	if(BussChoicType == "KJJK"){
		jsLog(logStrMsg("SENDMESSAGE:lObjectID:1,lItemID:2,message:termprintdoc","MESSAGE"));
		myocx.AgentSendMessage(1, 2, "termprintdoc");// 修改为消息控制
	}else if(BussChoicType == "DZQD"){
		getMsgBody4G2("M0202","P022",1,"P019","termprintdoc");
	}else if(BussChoicType == "TZLC"){
		getMsgBody4G2("M0204","P022",1,"P019","termprintdoc");  
	}else if(BussChoicType == "JJGS"){
		getMsgBody4G2("M0206","P022",1,"P019","termprintdoc");
	}else if(BussChoicType == "FUND"){
		getMsgBody4G2("M0208","P022",1,"P019","termprintdoc");
	}
	if(BussChoicType != "FUND"){
		//打开C#窗口
		myocx.InvokeBusinessForm(2,"",0,"");
		myocx.InvokeBusinessForm(2,"",222,"NotPaper:"+NotPaper);
		jsLog(logStrMsg("调用winform->myocx.InvokeBusinessForm[SignPage.exe] 0：打开","INFO"));
	}
}

/** strScanFilePath格式： E:\aaa\b.txt|E:/aaa/b.txt 其实这样比较复杂啊 */
var scanfp = "";// "E:\\tempfile\\411325198712205037bob.bmp";
function RegAgentEvtScanResult(lScanResult, strScanFilePath) {
	// lScanResult = 0;//测试数据
	jsLog(logStrMsg("GETMESSAGE RegAgentEvtScanResult lScanResult:" + lScanResult , "MESSAGE"));
	if (lScanResult == 0) {// 如果扫描成功
		//Ext.getCmp("HSbutton").setVisible(true); //显示该按钮
		var tmp = strScanFilePath.split('|');
		var idpicarr = tmp[0].split('\\');
		var picpath = idpicarr[0];
		for (var a = 1; a < idpicarr.length; a++){
			picpath += '\\' + idpicarr[a];
		}
		scanfp = picpath;
		jsLog(logStrMsg("INFOMESSAGE RegAgentEvtScanResult picpath:" + picpath , "MESSAGE"));
		
		var pic = '<div style="width:800px;height:700px;overflow:auto;text-align:center"><img style="width:600px;height:600px;padding:10px;text-align:center" src="' + picpath + '" /></div>';

		if(BussChoicType == "DZQD"){
			//savePrintDoc();
		}else if(BussChoicType == "TZLC"){
			saveSomeFile(conhisid_TZLC, '2', '2', picpath, agentno, cusname, cerno);
		}else if(BussChoicType == "KJJK"){
			//saveSomeFile(conhisid_KJJK, '2', '2', picpath, agentno, cusname, cerno);
		}else if(BussChoicType == "FUND"){
			saveSomeFile(conhisid_FUND, '2', '2', picpath, agentno, cusname, cerno);
		}else if(BussChoicType == "JJGS"){
			saveSomeFile(conhisid_JJGS, '2', '2', picpath, agentno, cusname, cerno);
		}
		// 同步客户端页面至等待坐席审核客户签字页面
		globalcurpage = 7;// 审核签字
		prn('scandoc ' + 7);
		//synWithTerm(7, 1);
		//目前先暂时在这里进行判断 ,,  之后考虑别处是否会出现隐患
		if(showPrintpic == 0){
			if(BussChoicType == "KJJK"){
				jsLog(logStrMsg("SENDMESSAGE:lObjectID:1,lItemID:11,message:051109next","MESSAGE"));
				myocx.AgentSendMessage(1, 11, "051109next");
				synWithTerm(8, 1); 
			}else if(BussChoicType == "DZQD"){
				getMsgBody4G2("M0202","P019",1,"P022","");  //发送消息-->使VTM填出跳转到正在审核页面
				synWithTerm(8, 1); //测试  ==> 二期
			}else if(BussChoicType == "JJGS"){
				synWithTerm(8, 1); //测试  ==> 二期
				loginarr(userInfo);
				getMsgBody4G2("M0206","P019",1,"P022","");  //发送消息-->使VTM填出跳转到正在审核页面
			}else if(BussChoicType == "TZLC"){
				synWithTerm(8,1);
				getMsgBody4G2("M0204","P019",1,"P022","");  //发送消息-->使VTM填出跳转到正在审核页面
			}else if(BussChoicType == "FUND"){
				getMsgBody4G2("M0208","P019",1,"P022","");  //发送消息-->使VTM填出跳转到正在审核页面
			}
			
			if(BussChoicType != "FUND"){
				//隐藏C#窗口
				if(BussChoicType != "KJJK"){
					myocx.InvokeBusinessForm(2,"",1,"");
					jsLog(logStrMsg("Hidden WinForm[SignPage.exe] -> OK","INFO   "));
					myocx.InvokeBusinessForm(4,"",0,"NotPaper:"+NotPaper);
					jsLog(logStrMsg("Hidden WinForm[SignPage.exe] -> OOOOOKKKKK   checkClick="+checkClick+" , clickFlag="+clickFlag+" , picpath="+picpath,"INFO   "));
					myocx.InvokeBusinessForm(4,"",0,"checkClick:"+checkClick+"|clickFlag:"+clickFlag+"|path="+picpath);
					jsLog(logStrMsg("Hidden WinForm[SignPage.exe] -> Over","INFO   "));
				}
				//立马显示查看扫描件页面 Form    //最后一个参数 -> 路径  
				
				jsLog(logStrMsg("调用winform->myocx.InvokeBusinessForm[CheckSignForm.exe] 0：打开","INFO"));
			}
		}else{
			//直接弹窗出显示扫描结果
			showcuspic(scanfp);
			getMsgBody4G2("","",5,"P004","");  //告诉VTM 跳转到业务选择页
			videostopvedio1();  //关闭第二个视频
		}
	}else{
		myocx.InvokeBusinessForm(9,"",222,"扫描失败");  //消息弹窗程序
		jsLog(logStrMsg("INFO:将要隐藏签字页面form","INFO"));
		if(globalcurpage == 7){  //证明在首页
			jsLog(logStrMsg("调用winform->myocx.InvokeBusinessForm[SignPage.exe] 3：隐藏","INFO"));
		}else if(BussChoicType == "FUND"){
		}
	}
}
function sendactepp(lObjectID, lItemID) {
	jsLog(logStrMsg("SENDMESSAGE:lObjectID:"+lObjectID+",lItemID:"+lItemID+",message:activeEpp","MESSAGE"));
	myocx.AgentSendMessage(lObjectID, lItemID, "activeEpp");
}
//------------------网银证书手机验证码------------------
var ClickCheckCodeBtn_wyzs = 0;
var CheckCode_wyzs ;
function getWYZSCheckCode(){}
function checkMes_WYZS_TimeOut(){}
var ClickCheckCodeBtn = 0;
var CheckCode ; //在全局 定义验证码  
function getCheckCode(){}

function checkMes_TimeOut(){}

//------------------------------------------------------------------------------------------------------
/********************************<<二期消息格式定义>>*************************************
 * 二期消息格式定义  
 * @param strBusType,strCurPage,strFlagGo,strGoId,strMsg
 *        业务类型，当前页面id，是否跳转0/1，下一页id，消息内容str 
 */
function getMsgBody4G2(strBusType,strCurPage,strFlagGo,strGoId,strMsg){
	var str="";
	str += new Date().format("yyyy-MM-dd hh:mm:ss") + "|";//时间戳
	str += agentno + "|";							  	  //终端号
	str += agsite + "|";								  //站点号agentno, agcallno, agsite;
	str += agcallno + "|"; 								  //呼入id
	str += dealno + "|";								  //流水号
	str += strBusType + "|";							  //业务类型
	str += strCurPage + "|";							  //当前页ID
	str += strFlagGo + "|";								  //是否跳转页面
	str += strGoId + "|";								  //要跳转的页面ID
	str += strMsg;										  //消息内容<strMessage>
	jsLog(logStrMsg("SENDMESSAGE:" + str , "MESSAGE"));
	myocx.AgentSendMessage(999,999,str); 				  // Agent发送消息<二期消息格式>
}
/****************************************************
 * 恢复动态密码版网银的textFile填选项
 */
function huiFuDTMMTextFile(type){
	if(type == "choice"){
		Ext.getCmp("DTMM_oldPhone").setDisabled(false);
		Ext.getCmp("DTMM_newPhone").setDisabled(false);
		Ext.getCmp("DTMM_phoneNum").setDisabled(false);
		//Ext.getCmp("DTMM_newphoneRepeat").setDisabled(false);
	}else if(type == "clear"){
		Ext.getCmp("DTMM_oldPhone").setDisabled(true);
		Ext.getCmp("DTMM_newPhone").setDisabled(true);
		Ext.getCmp("DTMM_phoneNum").setDisabled(true);
		//Ext.getCmp("DTMM_newphoneRepeat").setDisabled(true);
		Ext.getCmp("DTMM_ZIYW").setValue("请选择");
		Ext.getCmp("check_ZH_info").setValue("");
		Ext.getCmp("DTMM_phoneNum").setValue("");
		Ext.getCmp("DTMM_oldPhone").setValue("");
		Ext.getCmp("DTMM_newPhone").setValue("");
	}else {
		alert("error huiFuDTMMTextFile(type)");
	}
}
function resetRadioButton(){}

/****************************************************
 * 2014/7/8 WYZS_code
 * 恢复网银证书业务的textFile填选项
 */
function huiFuWYZSTextFile(type){}

														
/****************************************************
 * 恢复手机银行的textFile填选项
 */
function huiFuSJYHTextFile(type){}

function setCardNumber(cardnum){}


/**
 * 设置新的密码类型函数 发送消息 逻辑判断
 * @param {Object} index    P025:1
 * P023 电子银行  p024电话银行  p025手机银行
 */
function setNewPWDPage(){}

/**
 * 校验要验证的密码  
 * 电子银行/电话银行/支付密码
 */
function checkPwdmethod(){}

/****************
 * 对子业务选择进行相应的操作 (动态密码办网银、手机银行)
 */
function makeBusiness(index,type,type_1){}


//--form事件相应---
function RegFormMessageEvt(IFormID,strFormName,strFormMessage){
	jsLog(logStrMsg("GETMESSAGE:(" + IFormID + ","+ strFormName + "," + strFormMessage + ")","MESSAGE"));
	if(IFormID == 1){
		if(strFormMessage == "1"){
			BussChoicType = "KJJK";
		}else if(strFormMessage == "2"){
			BussChoicType = "DZQD";
		}else if(strFormMessage == "3"){
			BussChoicType = "TZLC";
		}else if(strFormMessage == "4"){
			BussChoicType = "FUND";
		}else if(strFormMessage == "5"){
			BussChoicType = "TZLC";
			//Ext.getCmp("102103").setVisible(true);//显示‘继续办理基金业务’按钮
		}
		
		jsLog(logStrMsg("INFO:(BussChoicType = "+BussChoicType+")","MESSAGE"));
		
		if(getMyocxInfo(1) == "version2" || getMyocxInfo(1) == "version2.1"){
			totalBussines = "two";
			YWchoicePlay();
		}else if(getMyocxInfo(1) == "version1"){
			totalBussines = "one";
			if(!Ext.getCmp("tow_KJJK").getValue()){
				//friendShipMsg("终端是一期业务,请选择开卡业务！");
				myocx.InvokeBusinessForm(9,"",222,"终端是一期业务,请选择开卡业务！");  //消息弹窗程序
			}else{
				YWchoicePlay();
				//synWithTerm(22,1);  //测试使用最好页面
			}
		}else {
			jsLog(logStrMsg(" version3 存在网银盾业务 ","INFO"));
			totalBussines = "two";
			YWchoicePlay();
			
		}
		Ext.getCmp("SJ_zhuanzhang").setValue("01");   //转账下拉框设置初始值  '01'
		Ext.getCmp("SJ_zhifu").setValue("01");		  //支付下拉框设置初始值  '01'
		Ext.getCmp("butInfo").setValue("<font style='color:red'><h1>"+butInfoShow("办理业务")+"</h1></font>");
			
	}
	
	if(IFormID == 3){
		jsLog(logStrMsg("INFO:(收到IFormId == 3 , strFormMessage = "+strFormMessage+") ","MESSAGE"));
		if(strFormMessage == "1"){
			jsLog(logStrMsg("myocx.AgentSendMessage(1, 2, termprintdoc); ","MESSAGE"));
			//审核通过
			cusprintinfo(0);
			Ext.getCmp("butInfo").setValue("<font style='color:red'><h1>"+butInfoShow("审核通过")+"</h1></font>");
		}else if(strFormMessage == "2"){
			jsLog(logStrMsg("myocx.AgentSendMessage(1, 5, needsyn);","MESSAGE"));
			//审核不通过
			cusprintinfo(1);
			Ext.getCmp("butInfo").setValue("<font style='color:red'><h1>"+butInfoShow("审核不通过")+"</h1></font>");
		}
	}
	//审核签字页面 C#消息， [CheckSignForm]
	if(IFormID == 4){
		jsLog(logStrMsg("INFO:(收到IFormId == 4 , strFormMessage = "+strFormMessage+") ","MESSAGE"));
		//座席端点击WinForm的审核通过
		if(strFormMessage == "checkOK_KJJK"){
			videostopvedio1();    //关闭签字视频
			globalcurpage = 8;
			if(BussChoicType != "KJJK"){
				myocx.InvokeBusinessForm(4,"",4,"");
			}
			jsLog(logStrMsg("调用winform->myocx.InvokeBusinessForm[CheckSignForm.exe] 4：隐藏","INFO"));
			synWithTerm(9,1);  
			prn('审核通过');
			Ext.getCmp("butInfo").setValue("<font style='color:red'><h1>"+butInfoShow("审核通过")+"</h1></font>");
		}else if(strFormMessage == "checkOK_DZQD"){
			videostopvedio1();    //关闭签字视频
			globalcurpage = 8;
			jsLog(logStrMsg("VIDEO_2 Path : " + videofilePath ,"INFO"));
			synWithTerm(18,1);//跳转请稍后，页面正在跳转
			saveVideo_tow();
			// 目前测试 发送3个要设置的新密码(电子银行密码，电话银行密码，手机银行登录密码)
			setNewPWDPage();
			Ext.getCmp("butInfo").setValue("<font style='color:red'><h1>"+butInfoShow("审核通过")+"</h1></font>");
		}else if(strFormMessage == "checkOK_TZLC"){
			videostopvedio1();    //关闭签字视频
			globalcurpage = 8;
			jsLog(logStrMsg(" FormMessageEvt 事件 ： 理财不需要跳转，需受到消息跳转" ,"INFO"));
			Ext.getCmp("butInfo").setValue("<font style='color:red'><h1>"+butInfoShow("审核通过")+"</h1></font>");
		}
		//点击WinForm的重新打印
		if(strFormMessage == "printagin"){
			jsLog(logStrMsg("[AGENT] click printagin Button ...","MESSAGE"));
			prn('重新打印，调用打印接口，最后开发');
			printdoc();
			Ext.getCmp("butInfo").setValue("<font style='color:red'><h1>"+butInfoShow("重新打印")+"</h1></font>");
		}else if(strFormMessage == "check_indentity_info"){
			//受到C#消息  点击查看核查结果按钮
			jsLog(logStrMsg("Click ChecPersonal Result Button -> checkERROR="+checkERROR,"INFO   "));
			jsLog(logStrMsg("查看扫描件页面-> 联网核查输出字符串checkretInfo="+checkretInfo,"INFO   "));
			checkClick = true;    //暂时放此处，去调整;
			//判断核查返回的结果是否是ERROR 则弹窗核查
			if(checkERROR)
			{
				friendShipMsg("联网核查返回ERROR，可以事后进行补录！");
			}
			else
			{
				if(checkretInfo == "")
				{
					if(BussChoicType == "KJJK"){
						jsLog(logStrMsg("已经过联网核查，但未返回结果，并且该笔[开借记卡]业务办理已通过拍照页面，需要进行补录"+conhisid_KJJK,"INFO   "));
						setTimeout("updateCheckPersonal("+conhisid_KJJK+",'NEEDCHECK')",3000);
					}else if(BussChoicType == "DZQD"){
						jsLog(logStrMsg("已经过联网核查，但未返回结果，并且该笔[电子渠道]业务办理已通过拍照页面，需要进行补录"+conhisid_DZQD,"INFO   "));
						setTimeout("updateCheckPersonal("+conhisid_DZQD+",'NEEDCHECK')",3000);
					}else if(BussChoicType == "TZLC"){
						jsLog(logStrMsg("已经过联网核查，但未返回结果，并且该笔[投资理财]业务办理已通过拍照页面，需要进行补录"+returnConhisID(),"INFO   "));
						setTimeout("updateCheckPersonal("+returnConhisID()+",'NEEDCHECK')",3000);
					}
					friendShipMsg("联网核查暂未返回结果，可以事后进行补录！");
					//myocx.InvokeBusinessForm(9,"",222,"联网核查暂未返回结果，可以事后进行补录！");  //消息弹窗程序
					//Ext.getCmp("bulu").setDisabled(true);
					//myocx.InvokeBusinessForm(4,"",2,"ERROR");
				}
				else
				{
					jsLog(logStrMsg("Open showCheckFuncInfo Window -> saveTakeImg="+saveTakeImg,"INFO   "));
					//showCheckFuncInfo(checkName,checkretInfo,"C:\\CT002201403111749.bmp");   //查看核查返回的信息
					showCheckFuncInfo(checkName,checkretInfo,saveTakeImg);   //查看核查返回的信息
				}
			}
		}
	}
	
	//投资理财 问卷结果页面 C#消息， [TZLCResultForm]
	if(IFormID == 5){
		jsLog(logStrMsg("INFO:(收到IFormId == 5 , strFormMessage = "+strFormMessage+") ","MESSAGE"));
		//座席端点击WinForm的继续按钮
		if(strFormMessage == "clickNextBut"){
			synWithTerm(7,1);
			jsLog(logStrMsg("[问卷评估结果页] -> 座席点击继续按钮，并sysnWithTerm7,1","INFO"));
			getMsgBody4G2("M0204","P027",1,"P019","");   //发送消息-->
			//开启第二个视频
			//videostartvedio1();
			//发送C#消息形式，告诉WinForm程序来调打开第二个视频
			myocx.InvokeBusinessForm(10,"",103,"");
			jsLog(logStrMsg("INFO:(发送C#消息形式，告诉WinForm程序来调打开第二个视频...)","MESSAGE"));
			jsLog(logStrMsg("[问卷评估结果页] -> 开启第二个视频","INFO"));
			
			//关闭C# TZLCResultForm 窗口
			//myocx.InvokeBusinessForm(5,"",4,"");
			
			//显示C#窗口
			myocx.InvokeBusinessForm(2,"",0,"");
			myocx.InvokeBusinessForm(2,"",222,"NotPaper:"+NotPaper);
			jsLog(logStrMsg("调用winform->myocx.InvokeBusinessForm[SignPage.exe] 0：打开","INFO"));
		}
	}
	
	
	//投资理财 读取卡号页面， [ReadCardNumPage]
	if(IFormID == 7){
		jsLog(logStrMsg("INFO:(收到IFormId == 7 , strFormMessage = "+strFormMessage+") ","MESSAGE"));
		//座席端点击WinForm的继续按钮
		if(strFormMessage.split(':')[0] == "ReadCardPage"){
			if(strFormMessage.split(':')[1] == "go_Next"){          //继续进行下一步
				if(BussChoicType == "TZLC"){
				    //隐藏掉客户输入按钮 -- 默认为 跳转后客户来选择相应问卷题目
					Ext.getCmp("222").setVisible(false);
					Ext.getCmp("000").setVisible(false);
					Ext.getCmp("uppage").setDisabled(true);   //将上一页下一页两个按钮给灰调
					Ext.getCmp("downpage").setDisabled(true);
					getMsgBody4G2("M0204","P014",0,"","terminalChoice");
					//需要验证客户的支付密码;
					Ext.getCmp("cus_checkpwdinfo").setValue("");
					Ext.getCmp("cus_dzyhpwd").setValue("");
					Ext.getCmp("101600").setValue("验证取款密码");
					//synWithTerm(15,1);
					getMsgBody4G2("M0204","P011",1,"P017","");
					//synWithTerm(13,1);   //问卷页面
					//getMsgBody4G2("M0204","P011",1,"P01401","");   //发送消息-->跳转填写问卷页面第一页
					if(fristBusiness > 0){
						//takeSaveSomeFiles(conhisid_TZLC);//存储相应的资料文件
						jsLog(logStrMsg("INFO:(ConHisId  = "+conhisid_TZLC+") ","MESSAGE"));
						setTimeout("takeSaveSomeFiles(" + conhisid_TZLC + ")", 3000);
					}
				}else if(BussChoicType == "DZQD"){
					//synWithTerm(12,1);   //综合填写页面
					getMsgBody4G2("M0202","P011",1,"P012","");     //跳转电子渠道页面
					
				}
			}else if(strFormMessage.split(':')[1] == "go_Index"){   //返回首页视频页
				//返回视频首页消息
				fristBusiness ++;
				synWithTerm(0,1);
				//visibledSomePage(1);
				getMsgBody4G2("M0101","P004",1,"P004","");
//				Ext.getCmp("goBackVideo").setVisible(false);
//				Ext.getCmp("ReadCard").setDisabled(false);
//				Ext.getCmp("EjectCard").setDisabled(false);
				//Ext.getCmp("tow_TZLC").setValue(false);	Ext.getCmp("tow_JJGS").setValue(false);Ext.getCmp("tow_KJJK").setValue(false);	Ext.getCmp("tow_DZQD").setValue(false);
				BussChoicType == "";
				//myocx.InvokeBusinessForm(1,"",0,YesOrNo_FUND);
				myocx.InvokeBusinessForm(10,"",101,"");
				jsLog(logStrMsg("调用winform->myocx.InvokeBusinessForm[agentIndexPage.exe] 0：打开","INFO"));
			}
			
		}
	}
	
	//基金签约业务所有页面  FundBussinessFlow.exe
	if(IFormID == 8){
		jsLog(logStrMsg("INFO:(收到IFormId == 8 , strFormMessage = "+strFormMessage+") ","MESSAGE"));
		if(strFormMessage.split(':')[0] == "scanPCard_Form"){   //当前EXE程序在扫描证件 画面；
			jsLog(logStrMsg("INFO:(IFormId == 8 , 当前EXE程序在扫描证件画面) ","MESSAGE"));
			if(strFormMessage.split(':')[1] == "takeBtnScan"){
				jsLog(logStrMsg("INFO:(IFormId == 8 , 点击扫描证件按钮) ","MESSAGE"));
				Ext.getCmp("butInfo").setValue("<font style='color:blue'><h1>"+butInfoShow("证件扫描")+"</h1></font>");
				printidcard("");
			}
		}else if(strFormMessage.split(':')[0] == "CheckIndentity_Form"){   //当前EXE程序在身份核查画面
			jsLog(logStrMsg("INFO:(IFormId == 8 , 当前EXE程序在身份核查画面) ","MESSAGE"));
			if(strFormMessage.split(':')[1] == "takePhoto"){   //点击拍照按钮
				isSavepic = 1;
				videosavepic();
				Ext.getCmp("butInfo").setValue("<font style='color:red'><h1>"+butInfoShow("拍照")+"</h1></font>");
	
			}else if(strFormMessage.split(':')[1] == "CheckInfo"){  //点击身份核查
				var hour = new Date().pattern('HH');
				var minute = new Date().pattern('mm');
				if(hour=="08"||hour=="09"||hour=="10"||hour=="11"||hour=="12"||hour=="13"||hour=="14"||hour=="15"||hour=="16"||hour=="17"||hour=="18"||hour=="19"){
					if(hour=="19"){
						if(minute == "00"){
							//Ext.getCmp('indentityCheck').setDisabled(true);
							checkFunc();
							
						}else{
							alert("该时间段无法进行联网核查，请继续办理业务，并事后进行补录！");
						}
					}else{
						//Ext.getCmp('indentityCheck').setDisabled(true);
						checkFunc();
					}
				}else{
					alert("该时间段无法进行联网核查，请继续办理业务，并事后进行补录！");
				}
			}else if(strFormMessage.split(':')[1] == "FUND_zhangcheng"){
				
				jsLog(logStrMsg(" WinForm程序选择的核查结果 combox框的值为："+strFormMessage.split(':')[2],"INFO   ")); //记录日志
				isSavepic = 0;
				rememberBuss = 1;   //作为标记证明此次通话已扫描过客户证件
				clickFlag = true;
				//不为空的话就直接在点击确认的时候将所有的存储
				SF_result = strFormMessage.split(':')[2];
				jsLog(logStrMsg("反馈照片信息 -> ConsoleCode need Update ...","INFO   ")); //记录日志
				SF_cp = agentno;
				var str = "dName="+SF_dName+"\npName="+SF_name+"\nID="+SF_cardID+"\nresult="+checkPSResult(SF_result)+"\nwangID="+SF_wangID+"\ncp="+SF_cp+"\nyearMD="+SF_year+"\ntime="+SF_time+"\nagentName="+agentName;
				jsLog(logStrMsg("反馈照片信息 -> str = " + str,"INFO   ")); //记录日志
				//-----------------数据-------------------
				textTXT = savepicDir + "X" + dealno + ".html";
				
				/**
				jsLog(logStrMsg("待调曲晓接口，存储‘身份核查’txt文件  agentSetPersonalCheckInfo('','','','');","INFO   ")); //记录日志
				jsLog(logStrMsg("@Param1:  dealno （流水号）","INFO   ")); //记录日志
				jsLog(logStrMsg("@Param2:  str （文本txt里面显示内容）","INFO   ")); //记录日志
				jsLog(logStrMsg("@Param3:  'X' + dealno + '.txt' (文件上传的名称)","INFO   ")); //记录日志
				jsLog(logStrMsg("@param4:  ''  传空字符串,","INFO   ")); //记录日志
				myocx.agentSetPersonalCheckInfo(dealno,str,"X" + dealno + ".txt","");    //曲晓接口： 上传txt身份核查 文件
				jsLog(logStrMsg("反馈照片信息 -> myocx.agentSetPersonalCheckInfo...","INFO   ")); //记录日志
				saveSomeFile(returnConhisID(), '99', '2', textTXT,agentno, cusname, cerno);  //存储一个txt文件的路径 --> 只确定一次存储联网核查文件路径即可（无论是否核查都存储）
				jsLog(logStrMsg("反馈照片信息 -> Save Txt OK _","INFO")); //记录日志
				jsLog(logStrMsg("反馈照片信息 -> Look CheckIn... Disabled : true ","INFO   ")); //记录日志

				*/
				
				var line_head = "<HTML>\n<head>\n<meta http-equiv='Content-Type' content='charset=utf-8' />\n<title>身份核查信息</title>\n</head>";
				var line_Table = "<body>\n<table width='778' height='195' border='1' align='center' >" +
		                         "<tr>\n<td width='381' height='37' align='right'>业务名称：</td>\n" +
		                         "<td width='381'>" + SF_dName + "</td>\n</tr>\n" +
		                         "<tr>\n<td height='36' align='right'>核对人姓名：</td>\n" +
		                         "<td>" + SF_name + "</td>\n</tr>\n" +
		                         "<tr>\n<td height='36' align='right'>身份证号：</td>\n" +
		                         "<td>" + SF_cardID + "</td>\n</tr>\n" +
		                         "<tr>\n<td height='36' align='right'>核对结果：</td>\n" +
		                         "<td>" + SF_result + "</td>\n</tr>\n" +
		                         "<tr>\n<td height='36' colspan='2' align='center'>网点号：" + 
		                         SF_wangID + " 座席员号:" + agentName + " 操作员号:" 
		                         + SF_cp + " 日期:" + SF_year + " 时间: " + SF_time + 
		                         "</td>\n</tr>\n" + 
		                         "</table>\n</body>\n</HTML>";
				var fso = new ActiveXObject("Scripting.FileSystemObject");
				var fh = fso.OpenTextFile(textTXT, 8, true);			//只读=1，只写=2 ，追加=8 等权限
				fh.WriteLine(line_head);
				fh.WriteLine(line_Table);
				fh.Close();
				jsLog(logStrMsg("--------------->保存html文件成功<------------------")); //记录日志
				
				saveSomeFile(returnConhisID(), '2', '2', savepic,agentno, cusname, cerno);//点击确定，将拍照图片路径存储在数据库
				
				ReadZC(0);
				//告诉C#已经不用查看身份核查结果！
				myocx.InvokeBusinessForm(10,"",102,"");
				
				Ext.getCmp("butInfo").setValue("<font style='color:red'><h1>"+butInfoShow("确定")+"</h1></font>");
			}else if(strFormMessage.split(':')[1] == "GO_ON"){
					rememberBuss = 1;   //作为标记证明此次通话已扫描过客户证件
					isSavepic = 0;
					ReadZC(0);
					jsLog(logStrMsg("未经过联网核查，并且该笔[投资理财]业务办理已通过拍照页面，需要进行补录"+returnConhisID(),"INFO   "));
					setTimeout("updateCheckPersonal("+returnConhisID()+",'NEEDCHECK')",3000);
					checkClick = true;
					jsLog(logStrMsg("Take Photo Click Sure_Button show -> checkClick="+checkClick,"INFO   ")); //记录日志
					jsLog(logStrMsg("[No CheckIndentity]Ready Save Pic -> begin  _ savepic = "+savepic,"INFO   ")); //记录日志
					saveSomeFile(returnConhisID(), '2', '2', savepic,agentno, cusname, cerno);//拍完照片立即将路径存储在数据库
					jsLog(logStrMsg("[No CheckIndentity]Save Pic OK -> Over  _ savepic = "+savepic,"INFO   ")); //记录日志
			}else if(strFormMessage.split(':')[1] == "FUND_BULU"){
				jsLog(logStrMsg("联网核查未返回结果，暂时继续办理业务，告诉终端跳转画面！","INFO   "));
				isSavepic = 0;
				rememberBuss = 1;   //作为标记证明此次通话已扫描过客户证件
				ReadZC(0);
			}
		}else if(strFormMessage.split(':')[0] == "Rule_Form"){   //当前EXE程序在阅读章程画面
			jsLog(logStrMsg("INFO:(IFormId == 8 , 当前EXE程序在阅读章程画面) ","MESSAGE"));
		}else if(strFormMessage.split(':')[0] == "ReadCard_Form"){   //当前EXE程序在读取卡号画面
			jsLog(logStrMsg("INFO:(IFormId == 8 , 当前EXE程序在读取卡号画面) ","MESSAGE"));
			if(strFormMessage.split(':')[1] == "WinForm_goNext"){ //点击下一步
				getMsgBody4G2("M0208","P010",1,"P017","");   //告诉Terminal 跳转到验证取款密码画面
				Ext.getCmp("butInfo").setValue("<font style='color:red'><h1>"+butInfoShow("下一步")+"</h1></font>");
			}
			
		}else if(strFormMessage.split(':')[0] == "CheckPWD_Form"){   //当前EXE程序在验证支付密码画面
			jsLog(logStrMsg("INFO:(IFormId == 8 , 当前EXE程序在验证支付密码画面) ","MESSAGE"));
			
		}else if(strFormMessage.split(':')[0] == "MainFundInfo_Form"){   //当前EXE程序在基金问卷填写画面
			jsLog(logStrMsg("INFO:(IFormId == 8 , 当前EXE程序在基金问卷填写画面) ","MESSAGE"));
			if(strFormMessage.split(':')[1] == "customerChoice"){  //customerChoice
				getMsgBody4G2("M0208","P041",0,"","terminalChoice");
				Ext.getCmp("butInfo").setValue("<font style='color:red'><h1>"+butInfoShow("客户选择")+"</h1></font>");
			}else if(strFormMessage.split(':')[1] == "agentChoice"){
				getMsgBody4G2("M0208","P041",0,"","agentChoice");
				Ext.getCmp("butInfo").setValue("<font style='color:red'><h1>"+butInfoShow("座席选择")+"</h1></font>");
			}else if(strFormMessage.split(':')[1] == "choiceOK"){
				getMsgBody4G2("M0208","P041",1,"P043","");
				getMsgBody4G2("M0208","P043",0,"","terminalChoice");    //告诉终端  默认客户输入
				Ext.getCmp("butInfo").setValue("<font style='color:red'><h1>"+butInfoShow("提交")+"</h1></font>");
			}else if(strFormMessage.split(':')[1] == "show-1"){  //显示第一页
				getMsgBody4G2("M0208","P04102",1,"P04101","");
				Ext.getCmp("butInfo").setValue("<font style='color:red'><h1>"+butInfoShow("上一页")+"</h1></font>");
			}else if(strFormMessage.split(':')[1] == "1-show-2"){  //显示第二页
				getMsgBody4G2("M0208","P04101",1,"P04102","");
				Ext.getCmp("butInfo").setValue("<font style='color:red'><h1>"+butInfoShow("下一页")+"</h1></font>");
			}else if(strFormMessage.split(':')[1] == "3-show-2"){  //显示第二页
				getMsgBody4G2("M0208","P04103",1,"P04102","");
				Ext.getCmp("butInfo").setValue("<font style='color:red'><h1>"+butInfoShow("上一页")+"</h1></font>");
			}else if(strFormMessage.split(':')[1] == "show-3"){  //显示第三页
				getMsgBody4G2("M0208","P04102",1,"P04103","");
				Ext.getCmp("butInfo").setValue("<font style='color:red'><h1>"+butInfoShow("下一页")+"</h1></font>");
			}
		}else if(strFormMessage.split(':')[0] == "CusInfo_Form"){   //当前EXE程序在客户资料填写画面
			jsLog(logStrMsg("INFO:(IFormId == 8 , 当前EXE程序在客户资料填写画面) ","MESSAGE"));
			if(strFormMessage.split(':')[1] == "GoNext_Form"){//GoNext_Form
				getMsgBody4G2("M0208","P043",0,"P042","");
				Ext.getCmp("butInfo").setValue("<font style='color:red'><h1>"+butInfoShow("继续")+"</h1></font>");
			}else if(strFormMessage.split(':')[1] == "agentChoice"){   //坐席输入
				getMsgBody4G2("M0208","P043",0,"","agentChoice");
				Ext.getCmp("butInfo").setValue("<font style='color:red'><h1>"+butInfoShow("坐席输入")+"</h1></font>");
			}else if(strFormMessage.split(':')[1] == "customerChoice"){
				getMsgBody4G2("M0208","P043",0,"","terminalChoice");
				Ext.getCmp("butInfo").setValue("<font style='color:red'><h1>"+butInfoShow("客户输入")+"</h1></font>");
			}
		}else if(strFormMessage.split(':')[0] == "FundResultInfo_Form"){   //当前EXE程序在基金问卷结果画面
			jsLog(logStrMsg("INFO:(IFormId == 8 , 当前EXE程序在基金问卷结果画面) ","MESSAGE"));
			if(strFormMessage.split(':')[1]  == "FundGoNext"){  //FundGoNext
				getMsgBody4G2("M0208","P042",1,"P019","");   //发送消息-->跳转到 打印表单页面
				//videostartvedio1();
				//发送C#消息形式，告诉WinForm程序来调打开第二个视频
				myocx.InvokeBusinessForm(10,"",103,"");
				jsLog(logStrMsg("INFO:(发送C#消息形式，告诉WinForm程序来调打开第二个视频...)","MESSAGE"));
				jsLog(logStrMsg("INFO:发送消息完毕，并开启第二个视频","MESSAGE"));
				//隐藏当前 C#画面，显示打印表单 4个按钮换面  signPageForm
				//myocx.InvokeBusinessForm(8,"",109,"");
				//jsLog(logStrMsg("调用winform->myocx.InvokeBusinessForm[FundBusinessFlow.exe] 109：审核签字Form","INFO"));
				//Ext.getCmp("butInfo").setValue("<font style='color:red'><h1>"+butInfoShow("继续")+"</h1></font>");
			}
		}else if(strFormMessage.split(':')[0] == "SignPage_Form"){   //当前EXE程序在表单签字画面
			jsLog(logStrMsg("INFO:(IFormId == 8 , 当前EXE程序在表单签字画面) ","MESSAGE"));
			if(strFormMessage.split(':')[1] == "BDHS"){   //表单回收按钮
				getMsgBody4G2("M0208","P019",1,"P021","scandoc");   //
				Ext.getCmp("butInfo").setValue("<font style='color:red'><h1>"+butInfoShow("表单回收")+"</h1></font>");
			}else if(strFormMessage.split(':')[1] == "QZDH"){
				getMsgBody4G2("M0208","P019",1,"P020","");   //
				Ext.getCmp("butInfo").setValue("<font style='color:red'><h1>"+butInfoShow("签字动画")+"</h1></font>");
			}else if(strFormMessage.split(':')[1] == "HSDH"){
				getMsgBody4G2("M0208","P019",1,"P021","");   //
				Ext.getCmp("butInfo").setValue("<font style='color:red'><h1>"+butInfoShow("回收动画")+"</h1></font>");
			}else if(strFormMessage.split(':')[1] == "CXDY"){
				getMsgBody4G2("M0208","P022",1,"P019","termprintdoc");   //
				Ext.getCmp("butInfo").setValue("<font style='color:red'><h1>"+butInfoShow("重新打印")+"</h1></font>");
			}
		}else if(strFormMessage.split(':')[0] == "CheckSignInfo_Form"){   //当前EXE程序在审核表单签字画面
			jsLog(logStrMsg("INFO:(IFormId == 8 , 当前EXE程序在审核表单签字画面) ","MESSAGE"));
			if(strFormMessage.split(':')[1] == "printagin"){
				jsLog(logStrMsg("[AGENT] click printagin Button ...","MESSAGE"));
				prn('重新打印，调用打印接口，最后开发');
				printdoc();//
				//videostartvedio1();  //调用第二个视频
				//发送C#消息形式，告诉WinForm程序来调打开第二个视频
				myocx.InvokeBusinessForm(10,"",103,"");
				jsLog(logStrMsg("INFO:(发送C#消息形式，告诉WinForm程序来调打开第二个视频...)","MESSAGE"));
				Ext.getCmp("butInfo").setValue("<font style='color:red'><h1>"+butInfoShow("重新打印")+"</h1></font>");
			}else if(strFormMessage.split(':')[1] == "checkOK_FUND"){ //checkOK_FUND
				getMsgBody4G2("M0208","P022",1,"P029","");   //发送消息-->告诉终端去做交易，成功后跳转
				videostopvedio1();    //关闭签字视频
				globalcurpage = 8;
				Ext.getCmp("butInfo").setValue("<font style='color:red'><h1>"+butInfoShow("审核通过")+"</h1></font>");
			}
			jsLog(logStrMsg("INFO:(strmessage =  " + strFormMessage.split(':')[1],"MESSAGE"));
			 if(strFormMessage.split(':')[1] == "check_indentity"){   //基金业务点击查看核查结果
				Ext.getCmp("butInfo").setValue("<font style='color:red'><h1>"+butInfoShow("查看核查结果")+"</h1></font>");
				//受到C#消息  点击查看核查结果按钮
				jsLog(logStrMsg("Click ChecPersonal Result Button -> checkERROR="+checkERROR,"INFO   "));
				jsLog(logStrMsg("查看扫描件页面-> 联网核查输出字符串checkretInfo="+checkretInfo,"INFO   "));
				//checkClick = true;    //暂时放此处，去调整;
	
				if(checkERROR)
				{
					alert("联网核查返回ERROR，可以事后进行补录！");
					//myocx.InvokeBusinessForm(8,"",983,"");   //调用弹窗
					//jsLog(logStrMsg("调用winform->myocx.InvokeBusinessForm[FundBusinessFlow.exe] 983：CheckSignInfo_Form SHOW","INFO"));
				}else{
					if(checkretInfo == "")
					{
						setTimeout("updateCheckPersonal("+returnConhisID()+",'NEEDCHECK')",3000);
						alert("联网核查暂未返回结果，可以事后进行补录！");
						//myocx.InvokeBusinessForm(8,"",983,"");   //调用弹窗
						//jsLog(logStrMsg("调用winform->myocx.InvokeBusinessForm[FundBusinessFlow.exe] 983：CheckSignInfo_Form SHOW","INFO"));
					}
					else
					{
						jsLog(logStrMsg("[FUND Busniess] : Open showCheckFuncInfo Window -> saveTakeImg="+saveTakeImg,"INFO   "));
						showCheckFuncInfo(checkName,checkretInfo,saveTakeImg);   //查看核查返回的信息
					}
				}
			}
			
		}else if(strFormMessage.split(':')[0] == "Result_Form"){   //当前EXE程序在最终交易结果画面
			jsLog(logStrMsg("INFO:(IFormId == 8 , 当前EXE程序在最终交易结果画面) ","MESSAGE"));
			if(strFormMessage.split(':')[1] == "fromToVideoPage"){   //WinForm点击继续办理业务按钮
				jsLog(logStrMsg("INFO:(IFormId == 8 ,fromToVideoPage 准备跳转到视频首页) ","MESSAGE"));
				getMsgBody4G2("M0208","P029",1,"P004","");   // 返回视频页面
				BussChoicType == "";
				fristBusiness ++;
				//调用控件 show 首页的 form   BussChoicType != "KJJK"
				//myocx.InvokeBusinessForm(1,"",0,YesOrNo_FUND);
				myocx.InvokeBusinessForm(10,"",101,"");  //打开首页公共代码Form
				jsLog(logStrMsg("调用winform->myocx.InvokeBusinessForm[agentIndexPage.exe] 0：打开","INFO"));
			}
		}
		
	}
	
	//AgentModuleTZLC
	if(IFormID == 11){
		if(strFormMessage.split(':')[0] == "SaveText"){  ///保存身份核查文件路径
			jsLog(logStrMsg("INFO:(IFormId == 10 , 收到C#程序发送的 SaveText 保存身份核查文件路径... ) ","MESSAGE"));
			textTXT = strFormMessage.split('=')[1];
			saveSomeFile(returnConhisID(), '99', '2', textTXT,agentno, cusname, cerno);  //存储一个txt文件的路径 --> 只确定一次存储联网核查文件路径即可（无论是否核查都存储）
		}
		if(strFormMessage == "GoNext_TakeFUND"){  ///保存身份核查文件路径
			BussChoicType = "FUND";   //点击继续之后，业务变成基金业务类型
			conhisid_FUND = callInsertData(_callinno);   //新增一个基金的业务记录
			synWithTerm(0,1);
			WF_FUND_LC = "YES";
		}
		if(strFormMessage == "GoIndexPage"){  //返回首页继续办理
			fristBusiness++; 	//记录fristBusiness变量已经不是第一次呼入了;
			BussChoicType == "";  
		}
		if(strFormMessage == "SaveSomeFiles"){
			jsLog(logStrMsg("如果fristBusiness>0 ["+fristBusiness+"],成立的话需要存储业务资料中的路径记录","MESSAGE"));
			if(fristBusiness > 0){
				jsLog(logStrMsg("INFO:(takeSaveSomeFiles,ConHisId  = "+conhisid_TZLC+") ","MESSAGE"));
				setTimeout("takeSaveSomeFiles(" + conhisid_TZLC + ")", 3000);
			}
		}
	}
	
	//AgentModuleChoice
	if(IFormID == 10){
		//jsLog(logStrMsg("INFO:(IFormId == 10 , setMyocxInfo(0,AgentName = "+agentName+")) ","MESSAGE"));
		if (strFormMessage.split(':')[0] == "CallPhone_Begin") {
			jsLog(logStrMsg("GETMESSAGE:(CallPhone_Begin : "+strFormMessage.split(":")[1]+")","MESSAGE"));
			var conId = returnConhisID();
			jsLog(logStrMsg("GETMESSAGE:(conId : "+conId+")","MESSAGE"));
			if(strFormMessage.split(":")[1] == "1"){
				BussChoicType = "KJJK";
				updateHisBusType(conId ,'0');
			}else if(strFormMessage.split(":")[1] == "2"){
				BussChoicType = "DZQD";
				updateHisBusType(conId ,'10');
			}else if(strFormMessage.split(":")[1] == "3"){
				BussChoicType = "TZLC";
				updateHisBusType(conId ,'11');
			}
		}
		
		if(strFormMessage.split(':')[0] == "VideoInitOK"){
			dealno = strFormMessage.split('=')[1].split(',')[0];
			setMyocxInfo(1,strFormMessage.split('=')[2].split(',')[0]);  //赋值VersionNO版本号
			NotPaper = strFormMessage.split('=')[3];
			jsLog(logStrMsg("INFO:(dealno == 10 , VersionNO = "+getMyocxInfo(1)+" , NotPaper = "+NotPaper+") ","MESSAGE"));
			if(getMyocxInfo(1) == "version2" || getMyocxInfo(1) == "version2.1"){
				totalBussines = "two";
				//YWchoicePlay();
			}
			
			jsLog(logStrMsg("INFO:(IFormId == 10 , 收到C#程序发送的videoinitOK后 赋值流水号： dealno = "+dealno+"，成功后Softphone延时10秒调用SaveWav(); ) ","MESSAGE"));
			//jsLog(logStrMsg("INFO:(IFormId == 10 , saveWavpath = "+saveWavpath+" , starT = "+startT+" , Mes = "+strFormMessage.split('=')[1]+") ","MESSAGE"));
			//saveWav(saveWavpath,startT);
			var object = Ext.util.JSON.decode(userInfo);
			// 取得当前登录用户的相关信息，包括权限
			var user = object.user;
			var curUserInfo = new UserInfo(user);
			agentName = curUserInfo.username;
			setMyocxInfo(0,agentName);
			jsLog(logStrMsg("INFO:(IFormId == 10 , setMyocxInfo(0,AgentName = "+agentName+")) ","MESSAGE"));
		}
		//
		if(strFormMessage.split(':')[0] == "IDCardScandResult"){
			jsLog(logStrMsg("INFO:(IFormId == 10 , 收到C#程序发送的IDCardScandResult扫描身份证的消息，准备存储照片路径... ) ","MESSAGE"));
			rememberScanCard = 1;  //用来标记已扫描证件，
			var Str = strFormMessage.split('=')[1];
			picpath_copy = Str.split(',')[0];
			cusname = Str.split(',')[1];
			cerno = Str.split(',')[2];
			jsLog(logStrMsg("INFO:(IFormId == 10 , , picpath_copy = "+picpath_copy+" , cusname = "+cusname+" , cerno = "+cerno+") ","MESSAGE"));
			saveSomeFile(returnConhisID(), '2', '2', picpath_copy, agentno, cusname, cerno);
		}
		if(strFormMessage.split(':')[0] == "Video_SnapShot"){// 拍照
			rememberBuss = 1;   //作为标记证明此次通话已扫描过客户证件
			jsLog(logStrMsg("INFO:(IFormId == 10 , 收到C#程序发送的Video_SnapShot拍照返回的消息，准备存储照片路径... ) ","MESSAGE"));
			savepic = strFormMessage.split('=')[1];
			saveSomeFile(returnConhisID(), '2', '2', savepic, agentno, cusname, cerno);
		}
		if(strFormMessage.split(':')[0] == "Video_groupPhoto"){// 合影消息
			//rememberBuss = 1;   //作为标记证明此次通话已扫描过客户证件
			jsLog(logStrMsg("INFO:(IFormId == 10 , 收到C#程序发送的Video_groupPhoto合影拍照返回的消息，准备存储照片路径... ) ","MESSAGE"));
			var path = strFormMessage.split('=')[1];
			saveSomeFile(returnConhisID(), '77', '2', path, agentno, cusname, cerno);
		}
		if(strFormMessage.split(':')[0] == "DocScan_Resp"){  //表单回收 存储路径
			jsLog(logStrMsg("INFO:(IFormId == 10 , 收到C#程序发送的DocScan_Resp扫描表单返回的消息，准备存储路径... ) ","MESSAGE"));
			scanfp = strFormMessage.split('=')[1];
			saveSomeFile(returnConhisID(), '2', '2', scanfp, agentno, cusname, cerno);
		}
		if(strFormMessage.split(':')[0] == "SaveText"){  ///保存身份核查文件路径
			jsLog(logStrMsg("INFO:(IFormId == 10 , 收到C#程序发送的 SaveText 保存身份核查文件路径... ) ","MESSAGE"));
			textTXT = strFormMessage.split('=')[1];
			saveSomeFile(returnConhisID(), '99', '2', textTXT,agentno, cusname, cerno);  //存储一个txt文件的路径 --> 只确定一次存储联网核查文件路径即可（无论是否核查都存储）
			//myocx.InvokeBusinessForm(8,"",981,"");   //通知基金C#流程，将查看核查结果按钮 灰掉
		}
		if(strFormMessage.split(':')[0] == "Clear_SaveWav"){//C#发送消息 -> 存储高清录音文件
			jsLog(logStrMsg("INFO:(IFormId == 10 , 收到C#程序发送的 Clear_SaveWav 存储高清录音文件路径... ) ","MESSAGE"));
			saveClearWav = strFormMessage.split('=')[1];
			saveSomeFile(returnConhisID(), '88', '1', strFormMessage.split('=')[1], agentno, cusname, cerno);
		}
		if(strFormMessage.split(':')[0] == "StartVideo_Success"){//StartVideo_Success
			jsLog(logStrMsg("INFO:(IFormId == 10 , 收到C#程序发送的 StartVideo_Success 准备存储'主/签字'视频路径... ) ","MESSAGE"));
			var index = strFormMessage.split('=')[1].split(',')[0];
			if(index == 0){
				videofilePath = strFormMessage.split('=')[1].split(',')[1];
				saveSomeFile(returnConhisID(), '5', '1', videofilePath, agentno, "", "");
				jsLog(logStrMsg("INFO:(IFormId == 10 , 收到C#程序发送的 StartVideo_Success 存储'主视频'录像路径路径 videofilePath="+videofilePath+"... ) ","MESSAGE"));
			}else{
				strVideoFilePath_copy = strFormMessage.split('=')[1].split(',')[1];
				saveSomeFile(returnConhisID(), '5', '1', strVideoFilePath_copy, agentno, "", "");
				jsLog(logStrMsg("INFO:(IFormId == 10 , 收到C#程序发送的 StartVideo_Success 存储'签字视频'录像路径路径 strVideoFilePath_copy="+strVideoFilePath_copy+"... ) ","MESSAGE"));
			}
		}
		if(strFormMessage.split(':')[0] == "0511P_SavePDF"){//0511P_SavePDF  存储 PDF 路径消息
			if(NotPaper == "False"){
				jsLog(logStrMsg("INFO:(IFormId == 10 , 收到C#程序发送的 0511P_SavePDF 存储 PDF 路径消息... ) ","MESSAGE"));
				saveSomeFile(returnConhisID(), '13', '2', strFormMessage.split('=')[1],agentno, cusname, cerno);
			}
		}
		if(strFormMessage == "UpdateStatus_SUCC"){  //开卡交易成功，修改后台记录为 1001状态
			jsLog(logStrMsg("INFO:(IFormId == 10 , 收到C#程序发送的 UpdateStatus_SUCC 开卡交易成功，修改后台记录为 1001状态... ) ","MESSAGE"));
			updateDealStaId(returnConhisID(), '1001');
		}
		if(strFormMessage.split(':')[0] == "WinForm_CardNum"){ //座席点击 ‘继续办理’ 收到卡号消息
			jsLog(logStrMsg("INFO:(IFormId == 10 , 收到C#程序发送的 WinForm_CardNum 座席点击 ‘继续办理’ 收到卡号消息 cardNum = "+strFormMessage.split(':')[1]+"... ) ","MESSAGE"));
			fristBusiness++; 	//记录fristBusiness变量已经不是第一次呼入了;
			setCardNumber(strFormMessage.split(':')[1]);   //给电子渠道页面 赋值已有的卡号
			cardNumber = strFormMessage.split(':')[1];
			BussChoicType == "";  
		}
		
		if(strFormMessage.split(':')[0] == "Page_Go_BUSS"){//跳转到 指定画面
			jsLog(logStrMsg("INFO:(IFormId == 10 , 收到C#程序发送的 Page_Go_BUSS 跳转到 相关业务 指定画面... ) ","MESSAGE"));
			if(strFormMessage.split(':')[1].split('|')[0] == "DZQD"){
				BussChoicType = "DZQD";
			}else if(strFormMessage.split(':')[1].split('|')[0] == "TZLC"){
				BussChoicType = "TZLC";
			}else if(strFormMessage.split(':')[1].split('|')[0] == "FUND"){
				BussChoicType = "FUND";
			}
			jsLog(logStrMsg("INFO:(IFormId == 10 , 收到C#程序发送的 Page_Go_BUSS 当前业务是： "+BussChoicType+"... ) ","MESSAGE"));
			ReadZC(fristBusiness);
			if(BussChoicType == "FUND"){
				//myocx.InvokeBusinessForm(8,"",103,checkName);   //打开阅读章程 Form
			}else{
				confirmCusInfos();
			}
				
			rememberBuss = 1;   //作为标记证明此次通话已扫描过客户证件
			//不为空的话就直接在点击确认的时候将所有的存储
			jsLog(logStrMsg("INFO:(IFormId == 10 , 判断clickFlag = "+strFormMessage.split(':')[2]+") ","MESSAGE"));
			if(strFormMessage.split(':')[2] == "true"){
				
				clickFlag = true;
			}
			//clickFlag = true;
		}
		if(strFormMessage.split(':')[0] == "click_IdentityCheck_btn_flag"){//是否在拍照页面返回了身份核查信息
			jsLog(logStrMsg("INFO:(IFormId == 10 ,click_IdentityCheck_btn_flag  变量=) "+ strFormMessage.split(':')[1],"MESSAGE"));
			if(strFormMessage.split(':')[1] == "true"){
				clickFlag = true;
			}
		}
		
		if(strFormMessage.split('+')[0] == "CheckID_Info"){ // 方便其他业务 查看核查结果
			jsLog(logStrMsg("INFO:(IFormId == 10 , 收到C#程序发送的 CheckID_Info 方便其他业务 查看核查结果 ... ) ","MESSAGE"));
			
			//CheckID_Info:Info=
			//胡杨&1&汉&19930104&河北省保定市北市区天鹅中路151号&500224199301041430&保定市公安局北市分局&20101209-20201209&D:\BOBRVA\tempfile\TT002201505191710.bmp,
			//张馨月&452502199411258265&此项暂不返回核查结果&00&D:\BOBRVA\idpic\93538.jpg,
			//D:\BOBRVA\tempfile\1
			//*CheckERROR=False
			var checkinfo = strFormMessage.split('+')[1].split('*')[0].split('=')[1];
			jsLog(logStrMsg("INFO:(checkinfo = "+checkinfo+") ","MESSAGE"));
			checkName = checkinfo.split(',')[0];
			jsLog(logStrMsg("INFO:(checkName = "+checkName+") ","MESSAGE"));
			checkretInfo = checkinfo.split(',')[1];
			jsLog(logStrMsg("INFO:(checkretInfo = "+checkretInfo+") ","MESSAGE"));
			saveTakeImg = checkinfo.split(',')[2];
			jsLog(logStrMsg("INFO:(saveTakeImg = "+saveTakeImg+") ","MESSAGE"));
			//checkERROR = strFormMessage.split('*')[1].split('=')[1];
			//jsLog(logStrMsg("INFO:(checkERROR = "+checkERROR+") ","MESSAGE"));
			if(strFormMessage.split('*')[1].split('=')[1] == "True"){
				checkERROR = true;
				setTimeout("updateCheckPersonal("+returnConhisID()+",'NEEDCHECK')",3000);
			}else{
				checkERROR = false;
			}
			jsLog(logStrMsg("INFO:(checkERROR = "+checkERROR+") ","MESSAGE"));
			if(checkretInfo != ""){
				jsLog(logStrMsg("INFO:(-->checkretInfo="+checkretInfo+") ","MESSAGE"));
				checkClick = true;
				if(BussChoicType == "FUND"){
					//myocx.InvokeBusinessForm(8,"",981,"");   //通知基金C#流程，将查看核查结果按钮 灰掉
				}
			}
			jsLog(logStrMsg("INFO:(IFormId == 10 , checkName = "+checkinfo.split(',')[0]+" , checkretInfo = "+checkinfo.split(',')[1]+" , saveTakeImg = "+checkinfo.split(',')[2]+" , checkERROR = "+checkERROR+" ... ) ","MESSAGE"));
			//myocx.InvokeBusinessForm(4,"",0,"checkClick:"+checkClick+"|clickFlag:"+clickFlag+"|path="+picpath);
		}
		if(strFormMessage.split(':')[0] == "UpdateStatus_NeedCheck"){	//  身份核查返回ERROR 或 未联网核查，需补录
			jsLog(logStrMsg("INFO:(IFormId == 10 , 收到C#程序发送的 UpdateStatus_NeedCheck 身份核查返回ERROR 或 未联网核查，需补录 ... ) ","MESSAGE"));
			checkClick = true;
			setTimeout("updateCheckPersonal("+returnConhisID()+",'NEEDCHECK')",3000);
			jsLog(logStrMsg("INFO:(IFormId == 10 , 经过updateCheckPersonal-> "+returnConhisID()+"  改为 NEEDCHECK ... ) ","MESSAGE"));
		}
		//WinFormClickCheckBtn
		if(strFormMessage.split(':')[0] == "WinFormClickCheckBtn"){	//  收到C#的消息，是否点击身份核查
			jsLog(logStrMsg("INFO:(IFormId == 10 , 收到C#程序发送的 WinFormClickCheckBtn 收到C#的消息，是否点击身份核查 ... ) ","MESSAGE"));
			if(strFormMessage.split(':')[1] == "false"){   //没有点击身份核查
				//myocx.InvokeBusinessForm(8,"",981,"");   //通知基金C#流程，将查看核查结果按钮 灰掉
			}
		}
		
		
		//WinFormPDFResult返回PDF路径
		if(strFormMessage.split('=')[0] == "WinFormPDFResult"){
			jsLog(logStrMsg("INFO:(IFormId == 10 , 收到C#程序发送的 WinFormPDFResult  PDF 返回路径 BussChoicType = "+BussChoicType+"... ) ","MESSAGE"));
			var PDFpath = strFormMessage.split('=')[1];
			if(BussChoicType == "DZQD"){
				savePrintDoc(PDFpath);
			}else if(BussChoicType == "TZLC"){
				saveSomeFile(conhisid_TZLC, '13', '2', PDFpath, agentno, cusname, cerno);
			}else if(BussChoicType == "KJJK"){
				if(NotPaper == "True"){
					saveSomeFile(conhisid_KJJK, '13', '2', PDFpath, agentno, cusname, cerno);
				}
				//saveSomeFile(conhisid_KJJK, '13', '2', picpath, agentno, cusname, cerno);
			}else if(BussChoicType == "FUND"){
				saveSomeFile(conhisid_FUND, '13', '2', PDFpath, agentno, cusname, cerno);
				
				jsLog(logStrMsg("调用winform->myocx.InvokeBusinessForm[FundBusinessFlow.exe] 110、982","INFO"));
			}
			
		}
		if(strFormMessage.split('=')[0] == "OpenCheckSignForm"){
			//隐藏C#窗口
			jsLog(logStrMsg("INFO:(IFormId == 10 , OpenCheckSignForm : "+strFormMessage+")","INFO"));
			if(strFormMessage.split('=')[1] != "FUND"){
				myocx.InvokeBusinessForm(2,"",1,"");
				jsLog(logStrMsg("Hidden WinForm[SignPage.exe] -> OK","INFO   "));
				myocx.InvokeBusinessForm(4,"",0,"NotPaper:"+NotPaper);
				jsLog(logStrMsg("Open WinForm[SignPage.exe] -> OOOOOKKKKK   checkClick="+checkClick + " , clickFlag="+clickFlag ,"INFO   "));
				myocx.InvokeBusinessForm(4,"",202,"checkClicks:"+checkClick+"|clickFlag:"+clickFlag);
				jsLog(logStrMsg("Open WinForm[SignPage.exe] -> Over","INFO   "));
				
				jsLog(logStrMsg("调用winform->myocx.InvokeBusinessForm[CheckSignForm.exe] 0：打开","INFO"));
			}else{
				jsLog(logStrMsg("IFormId == 10  并且当前业务是基金业务,发送  982 checkERROR="+checkERROR,"INFO"));
				//myocx.InvokeBusinessForm(8,"",982,checkERROR);
			}
		}
		
		
		if(strFormMessage == "WinForm_Exit"){   //关闭 所有WinForm流程的exe
			fristBusiness ++;
			BusFormClose();
		}
	}
}


/************************
 * 判断章程页消息传送；
 */
function ReadZC(type){
	//只有开卡的状态时发送消息给VTM一个章程
	if(BussChoicType == "KJJK"){
		//getMsgBody4G2("M0201","P005",1,"P007","KK");  //告诉VTM端放入证件页面  显示的章程只有一个
		//setTimeout("updateHisBusType(" + returnConhisID() + ",'0')", 500);
		
		updateHisBusType(conhisid_KJJK , '0');   //修改业务类型为开卡业务 0
	}else if(BussChoicType == "DZQD" || BussChoicType == "TZLC"){   //理财和电子渠道都输入  <<综合章程>>
		if(BussChoicType == "DZQD"){
			//------------------------------------------------------------
			//------------------------------------------------------------
		}
		if(BussChoicType == "TZLC"){
			//修改当前业务的类型 修改成‘投资理财’业务
			updateHisBusType(conhisid_TZLC , '11');
			jsLog(logStrMsg("修改当前业务类型为：投资理财","INFO"));
			//setTimeout("updateConHis('11')",1000); 
			getMsgBody4G2("M0204","P005",1,"P010",""); 
			//Ext.getCmp("111").setVisible(false);  //隐藏坐席输入按钮
		}else{
			if(type == 0){
				getMsgBody4G2("M0202","P005",1,"P008","ZH"); 
			}else if(type == 1){
				getMsgBody4G2("M0202","P004",1,"P008","ZH"); 
			}
		}
	}else if(BussChoicType == "FUND"){
		updateHisBusType(conhisid_FUND , '12');   //  基金业务类型定义为  12	
		jsLog(logStrMsg("修改当前业务类型为：基金签约","INFO"));
		//setTimeout("updateConHis('11')",1000); 
		//myocx.InvokeBusinessForm(8,"",103,checkName);   //打开阅读章程 Form
		//jsLog(logStrMsg("调用winform->myocx.InvokeBusinessForm[FundBusinessFlow.exe] 103：章程画面","INFO"));
		//getMsgBody4G2("M0208","P005",1,"P00801","FUND");
	}else {  // 密码挂失
		updateHisBusType(conhisid_JJGS , '12');
		jsLog(logStrMsg("修改当前业务类型为：借记卡挂失","INFO"));
		//setTimeout("updateConHis('12')",1000); //修改后台次交易记录的业务类型
		
		getMsgBody4G2("M0206","P005",1,"P010","");
	}
}



/*******
 * 业务办理根据选择的业务判断跳转页面处理
 * */
function YWchoicePlay(){
	jsLog(logStrMsg("YWchoicePlay rememberBuss="+rememberBuss+"//rememberScanCard="+rememberScanCard,"BUTTON"));
	//判断是否选择了一级业务项  "开借记卡" "电子渠道" "投资理财" "借记卡挂失"
	if(BussChoicType == ""){
	}else{
			if(BussChoicType == "KJJK"){
				conhisid_KJJK = returnConhisID();
			}else if(BussChoicType == "DZQD"){
				Ext.getCmp("flexoButton").setText("查询客户");
				conhisid_DZQD = returnConhisID();
			}else if(BussChoicType == "TZLC"){
				Ext.getCmp("flexoButton").setText("签约查询");
				conhisid_TZLC = returnConhisID();
			}else if(BussChoicType == "JJGS"){
				Ext.getCmp("flexoButton").setText("挂失查询");
				conhisid_JJGS = returnConhisID();
			}else if(BussChoicType == "FUND"){
				conhisid_FUND = returnConhisID();
			}
		//添加新的通话记录
		if(fristBusiness > 0){
			if(BussChoicType == "KJJK"){
				conhisid_KJJK = callInsertData(_callinno);
				setTimeout("takeSaveSomeFiles(" + conhisid_KJJK + ")", 4000);
				
			}else if(BussChoicType == "DZQD"){
				//conhisid_DZQD = callInsertData(_callinno);   //电子渠道 在后面分细的存储相应的业务
				//setTimeout("takeSaveSomeFiles(" + conhisid_DZQD + ")", 2000);
			}else if(BussChoicType == "TZLC"){
				conhisid_TZLC = callInsertData(_callinno);
			}else if(BussChoicType == "JJGS"){
				conhisid_JJGS = callInsertData(_callinno);
			}else if(BussChoicType == "FUND"){
				conhisid_FUND = callInsertData(_callinno);
			}
			//popupCustomerPageByCallin(_callinno,_eduDatasAll);   //测试数据 ‘来电’	
			
		}
		/*************后台修改交易的‘业务类型****************
		 * <<此函数应该放在最后的所有交易成功之后判断修改业务类型>>
		 **/
		//*******************判断选择的业务来进行js页面的索引跳转******************
		if(BussChoicType == "KJJK"){
		}else if(BussChoicType == "DZQD" || BussChoicType == "TZLC"){
			
		}else if(BussChoicType == "FUND" || BussChoicType == "FUND_OR_LC"){
		}else{
			
		}
	}
	
	
	var object = Ext.util.JSON.decode(userInfo);
	// 取得当前登录用户的相关信息，包括权限
	var user = object.user;
	var curUserInfo = new UserInfo(user);
	agentName = curUserInfo.username;
	jsLog(logStrMsg("Now Agent ID : "+agentName,"INFO"));
	
}



//--------------------------------------------------startmessage----------------------------------------------------
var count = 0;
function Regagentmsg(lObjectID, lItemID, strMessage) {
	// prn(lObjectID + "|" + lItemID + "|" + strMessage);
	if (strMessage.indexOf('enddeal') >= 0) {}
	// 激活epp
	if (strMessage == 'activeEpp') {}

	if (lItemID == 511606) {}
	if (strMessage == '3cards') {}
	// 提示消息444
	if (lItemID == 8899) {}
	// 提示消息444
	if (lItemID == 444) {}
	
	if (strMessage.indexOf('videoinitok') >= 0) {
		jsLog(logStrMsg("GETMESSAGE:(" + lObjectID + ","+ lItemID + "," + strMessage + ")","MESSAGE"));
		if(strMessage.split("|").length > 2){
			setMyocxInfo(1,"version2");
			jsLog(logStrMsg("setmyocxinfo() --> setVersion = version2","INFO"));
			if(strMessage.split("|")[2] == "Version3"){
				setMyocxInfo(1,"version3");
				jsLog(logStrMsg("setmyocxinfo() --> setVersion = 网银盾版本","INFO"));
			}
			if(strMessage.split("|")[2] == "Version2.1"){
				setMyocxInfo(1,"version2.1");
				jsLog(logStrMsg("setmyocxinfo() --> setVersion = version2.1","INFO"));
			}
		}else{
			setMyocxInfo(1,"version1");
			jsLog(logStrMsg("setmyocxinfo() --> setVersion = version1","INFO"));
		}
		dealno = strMessage.split("|")[1];
		setMyocxInfo(0,dealno);    //把流水号放入曲晓控件里；
		jsLog(logStrMsg("setmyocxinfo() --> setDealNo = "+dealno,"TEXT"));
		jsLog(logStrMsg("INFO:(getMessage - videoinitok - > dealno="+dealno+")","MESSAGE"));
		jsLog(logStrMsg("INFO:(getMessage - videoinitok - > saveWavfail="+saveWavfail+")","MESSAGE"));
		if(saveWavfail == "true"){
			jsLog(logStrMsg("INFo:(保存录音文件方法)","MESSAGE"));
			saveWav(saveWavpath,new Date().format('yyyy-MM-dd hh:mm:ss'));
		}
		VideoSetDealno(dealno);
		// videostartvedio();
		// videostartvedio1();
		// 在两边initok后，坐席端先开启视屏，通知终端开启终端视频
		jsLog(logStrMsg("SENDMESSAGE:lObjectID:1,lItemID:9,message:videostart","MESSAGE"));
		myocx.AgentSendMessage(1, 9, "videostart");
		//videostartvedio();
		// 获取当前用户的photo，并告诉终端。
	}
	if (strMessage.indexOf('agentscanidcard') >= 0) {}
	var ZCcount=0;
	/***********************<<接受章程>>***************************
	 * protocolchecked终端接受章程
	 * */
	if (strMessage.indexOf('protocolchecked') >= 0) {}
	
/*****************************<<拒绝章程>>************************************
 * refusechecked终端拒绝章程
 * 收到的消息格式将为二期的格式定义：(999,999,"|||||||||refusechecked,KK,0")
 * */
	if(strMessage.indexOf('refusechecked') >= 0){}
	if (strMessage == 'pError') {}

	// 客户申请协助
	if (strMessage == 'applyhelp'){}

	if (strMessage.indexOf('0511P') >= 0) {}
	if (strMessage.indexOf('511') < 0) {}
	if (strMessage.indexOf('DealFail') >= 0) {}

	if (strMessage.indexOf('ulane') >= 0) {
		jsLog(logStrMsg("GETMESSAGE:(" + lObjectID + ","+ lItemID + "," + strMessage + ")","MESSAGE"));
		var curpage = strMessage.substring(5, strMessage.length);
		synWithTerm(curpage, 0);
	}
	if (strMessage == 'cusprintinfo') {}
	if (strMessage == 'cusscaninfo') {}
	if (strMessage == '0511777') {}
	if (strMessage == "选择了这个卡！") {}
	// 判断是否接受章程，下一步填单
	if (strMessage == "客户确定章程") {}
	
	//新客户关闭阻拦交易弹窗
	if (lItemID == "666666") {}
	
	if (lItemID == "777777") {}
	// 两边填表数据同步code:309   lObjectID, lItemID,
	if (strMessage.indexOf('0511309') >= 0) {}
	
	if (strMessage == 'eppstsError') {}
	if (strMessage == '051109next') {}

	if (lItemID == 8991) {}
	if (strMessage == "pwdsynlen") {}
	//-----------------------------------------------
	if(strMessage == "您输入的密码不足6位！"){}
	//-----------------------------------------------
	if (strMessage == "pwdnotmatch") {}
	//密码过于简单问题
	if(strMessage == "pwdSoEasy"){}
	if (strMessage == "pwdtmatch") {}
	if (strMessage.indexOf('0511409') >= 0) {}
	if (strMessage.indexOf('0511509') >= 0) {}

	if (lItemID == 9999) {}

	// 同步提示坐席客户的发卡进度
	if (strMessage.indexOf("FKJstatus") >= 0) {}
	
	/**********************	OMG|SeaBreeze  二期坐席端接收消息的判断**********************
	 * annotation  
	 * 二期坐席端接收消息的判断
	 */
	//整个消息是电子渠道业务
	//if(strMessage.split("|")[5] == "M0202"){
		//此消息是VTM发送的消息是否是跳转的 1 or 0 
		if(strMessage.split("|")[7] == "1"){   			//跳转的消息
				jsLog(logStrMsg("GETMESSAGE:(" + lObjectID + ","+ lItemID + "," + strMessage + ")","MESSAGE"));
				if(strMessage.split("|")[8] == "P026"){
					if(strMessage.split("|")[9].indexOf("P01201:1") >= 0){
						Ext.getCmp("over_WY_SQ_result").setValue("成功");
						updateDealStaId(conhisid_DTMM_SQ, '1001');
					}
					if(strMessage.split("|")[9].indexOf("P01202:1") >= 0){
						Ext.getCmp("over_WY_XG_result").setValue("成功");
						updateDealStaId(conhisid_DTMM_XG, '1001');
					}
					if(strMessage.split("|")[9].indexOf("P01203:1") >= 0){
						Ext.getCmp("over_WY_JS_result").setValue("成功");
						updateDealStaId(conhisid_DTMM_JS, '1001');
					}
					if(strMessage.split("|")[9].indexOf("P01204:1") >= 0){
						Ext.getCmp("over_SJ_SQ_result").setValue("交易成功");
						updateDealStaId(conhisid_SJYH_SQ, '1001');
					}
					if(strMessage.split("|")[9].indexOf("P01205:1") >= 0){
						Ext.getCmp("over_SJ_TJ_result").setValue("成功");
						updateDealStaId(conhisid_SJYH_TJ, '1001');
					}
					if(strMessage.split("|")[9].indexOf("P01206:1") >= 0){
						Ext.getCmp("over_SJ_CZ_result").setValue("成功");
						updateDealStaId(conhisid_SJYH_CZ, '1001');
					}
					if(strMessage.split("|")[9].indexOf("P01207:1") >= 0){
						Ext.getCmp("over_SJ_ZZ_result").setValue("成功");
						updateDealStaId(conhisid_SJYH_ZZ, '1001');
					}
					if(strMessage.split("|")[9].indexOf("P01208:1") >= 0){
						Ext.getCmp("over_SJ_ZX_result").setValue("成功");
						updateDealStaId(conhisid_SJYH_ZX, '1001');
					}
					if(strMessage.split("|")[9].indexOf("P01209:1") >= 0){
						Ext.getCmp("over_result_dzmmgl").setValue("成功");
						updateDealStaId(conhisid_DZYH_SQ, '1001');
					}
					if(strMessage.split("|")[9].indexOf("P01210:1") >= 0){
						Ext.getCmp("over_result_dzmmgl").setValue("成功");
						updateDealStaId(conhisid_DZYH_CZ, '1001');
					}
					if(strMessage.split("|")[9].indexOf("P01211:1") >= 0){
						Ext.getCmp("over_result_dzmmgl").setValue("成功");
						updateDealStaId(conhisid_DZYH_XG, '1001');
					}
					if(strMessage.split("|")[9].indexOf("P01212:1") >= 0){
						Ext.getCmp("over_result_dhmmgl").setValue("成功");
						updateDealStaId(conhisid_DHYH_SQ, '1001');
					}
					if(strMessage.split("|")[9].indexOf("P01213:1") >= 0){
						Ext.getCmp("over_result_dhmmgl").setValue("成功");
						updateDealStaId(conhisid_DHYH_CZ, '1001');
					}
					if(strMessage.split("|")[9].indexOf("P01214:1") >= 0){
						Ext.getCmp("over_result_dhmmgl").setValue("成功");
						updateDealStaId(conhisid_DHYH_XG, '1001');
					}
					//--------------2014/7/11 WYZS_code_over -------------
					if(strMessage.split("|")[9].indexOf("P01215:1") >= 0){
						Ext.getCmp("over_WYZS_SQ_result").setValue("交易成功");
						updateDealStaId(conhisid_WYZS_SQ, '1001');
					}
					if(strMessage.split("|")[9].indexOf("P01215:0") >= 0){
						Ext.getCmp("over_WYZS_SQ_result").setValue("交易失败");
					}
					if(strMessage.split("|")[9].indexOf("P01216:1") >= 0){
						Ext.getCmp("over_WYZS_XG_result").setValue("成功");
						updateDealStaId(conhisid_WYZS_TJ, '1001');
					}
					if(strMessage.split("|")[9].indexOf("P01217:1") >= 0){
						Ext.getCmp("over_WYZS_GS_result").setValue("成功");
						updateDealStaId(conhisid_WYZS_GS, '1001');
					}
					if(strMessage.split("|")[9].indexOf("P01218:1") >= 0){
						Ext.getCmp("over_WYZS_XE_result").setValue("成功");
						updateDealStaId(conhisid_WYZS_XE, '1001');
					}
					if(strMessage.split("|")[9].indexOf("P01219:1") >= 0){
						Ext.getCmp("over_WYZS_HFQY_result").setValue("成功");
						updateDealStaId(conhisid_WYZS_HFQY, '1001');
					}
					if(strMessage.split("|")[9].indexOf("P01220:1") >= 0){
						Ext.getCmp("over_WYZS_HFYZ_result").setValue("成功");
						updateDealStaId(conhisid_WYZS_HFYZ, '1001');
					}
				}
		}
		
		if(strMessage.split("|")[7] == "0"){  			 //不跳转的消息
			jsLog(logStrMsg("GETMESSAGE:(" + lObjectID + ","+ lItemID + "," + strMessage + ")","MESSAGE"));
		}
		
		if(strMessage.split("|")[7] == "2"){}
		//专属字段校验消息
		if(strMessage.split("|")[7] == "4"){}
		//专用于弹窗交易提示信息
		if(strMessage.split("|")[7] == "7"){}
		//--------二期用来传递密码的消息--------
		if(strMessage.split("|")[7] == "6"){}
		//专属生成PDF文件消息 存储后台路径
		if(strMessage.split("|")[7] == "8"){
			jsLog(logStrMsg("GETMESSAGE:(" + lObjectID + ","+ lItemID + "," + strMessage + ")","MESSAGE"));
			jsLog(logStrMsg("StrMessage[999-type] saveSomeFile Save:PDF path : " + strMessage.split("|")[9] ,"MESSAGE"));
			EBankPDFpath = strMessage.split("|")[9];
			if(NotPaper == "False"){
				if(BussChoicType == "DZQD"){
					if(fristBusiness == 0){
						saveSomeFile(conhisid_DZQD, '13', '2', strMessage.split("|")[9],agentno, cusname, cerno);	
					}
				}else if(BussChoicType == "TZLC"){
					saveSomeFile(conhisid_TZLC, '13', '2', strMessage.split("|")[9],agentno, cusname, cerno);
				}else if(BussChoicType == "FUND"){
					saveSomeFile(conhisid_FUND, '13', '2', strMessage.split("|")[9],agentno, cusname, cerno);
				}else if(BussChoicType == "JJGS"){
					saveSomeFile(conhisid_JJGS, '13', '2', strMessage.split("|")[9],agentno, cusname, cerno);
				}
			}
		}
		
		//随时监视终端当前页面在哪一页？
		if(strMessage.split("|")[7] == "9"){}
		
		// 结束页面处理结果  类型 10  ----  ||9||P01201:电子银行88211错误
		if(strMessage.split("|")[7] == "10"){
			jsLog(logStrMsg("GETMESSAGE:(" + lObjectID + ","+ lItemID + "," + strMessage + ")","MESSAGE"));
			if(strMessage.split("|")[9].indexOf("P01201:") >= 0){
				Ext.getCmp("over_WY_SQ_result").setValue(strMessage.split("|")[9].split("01201:")[1]);
			}
			if(strMessage.split("|")[9].indexOf("P01202:") >= 0){
				Ext.getCmp("over_WY_XG_result").setValue(strMessage.split("|")[9].split("01202:")[1]);
			}
			if(strMessage.split("|")[9].indexOf("P01203:") >= 0){
				Ext.getCmp("over_WY_JS_result").setValue(strMessage.split("|")[9].split("01203:")[1]);
			}
			if(strMessage.split("|")[9].indexOf("P01204:") >= 0){
				Ext.getCmp("over_SJ_SQ_result").setValue(strMessage.split("|")[9].split("01204:")[1]);
			}
			if(strMessage.split("|")[9].indexOf("P01205:") >= 0){
				Ext.getCmp("over_SJ_TJ_result").setValue(strMessage.split("|")[9].split("01205:")[1]);
			}
			if(strMessage.split("|")[9].indexOf("P01206:") >= 0){
				Ext.getCmp("over_SJ_CZ_result").setValue(strMessage.split("|")[9].split("01206:")[1]);
			}
			if(strMessage.split("|")[9].indexOf("P01207:") >= 0){
				Ext.getCmp("over_SJ_ZZ_result").setValue(strMessage.split("|")[9].split("01207:")[1]);
			}
			if(strMessage.split("|")[9].indexOf("P01208:") >= 0){
				Ext.getCmp("over_SJ_ZX_result").setValue(strMessage.split("|")[9].split("01208:")[1]);
			}
			//密码管理
			if(strMessage.split("|")[9].indexOf("P01209:") >= 0 || strMessage.split("|")[9].indexOf("P01210:") >= 0 || strMessage.split("|")[9].indexOf("P01211:") >= 0){
				Ext.getCmp("over_result_dzmmgl").setValue(strMessage.split("|")[9].split("P012")[1]);
			}
			if(strMessage.split("|")[9].indexOf("P01212:") >= 0 || strMessage.split("|")[9].indexOf("P01213:") >= 0 || strMessage.split("|")[9].indexOf("P01214:") >= 0){
				Ext.getCmp("over_result_dhmmgl").setValue(strMessage.split("|")[9].split("P012")[1]);
			}
			//- - - - - - - - - - - - - 网银证书结果页错误信息 - - - - - - - - - - - - - - - 
			if(strMessage.split("|")[9].indexOf("P01215:") >= 0){
				Ext.getCmp("over_WYZS_SQ_result").setValue(strMessage.split("|")[9].split("01215:")[1]);
			}
			if(strMessage.split("|")[9].indexOf("P01216:") >= 0){
				Ext.getCmp("over_WYZS_XG_result").setValue(strMessage.split("|")[9].split("01216:")[1]);
			}
			if(strMessage.split("|")[9].indexOf("P01217:") >= 0){
				Ext.getCmp("over_WYZS_GS_result").setValue(strMessage.split("|")[9].split("01217:")[1]);
			}
			if(strMessage.split("|")[9].indexOf("P01218:") >= 0){
				Ext.getCmp("over_WYZS_XE_result").setValue(strMessage.split("|")[9].split("01218:")[1]);
			}
			if(strMessage.split("|")[9].indexOf("P01219:") >= 0){
				Ext.getCmp("over_WYZS_HFQY_result").setValue(strMessage.split("|")[9].split("01219:")[1]);
			}
			//- - - - - - - - - - - - - - - - - - - - - - - - - -- - - - - - - - - - - - -
			//20140822   WYZS_code 
			if(strMessage.split("|")[9].indexOf("P01208:") >= 0){
				Ext.getCmp("over_SJ_ZX_result").setValue(strMessage.split("|")[9].split("01208:")[1]);
			}
			
		}
		//具体的值得变量
	//}  Ext.getCmp("goNext").setVisible(true);
	//受到此消息使坐席端读卡页面‘下一步’按钮制亮
	if(strMessage.split("|")[7] == "11"){}
	/**
	 * 所有的投资理财业务消息
	 */
	if(strMessage.split("|")[5] == "M0204"){
		if(strMessage.split("|")[7] == "0"){}
		//表示页面要发生跳转  hiddenLiCaiPage(1,1,21);  hiddenLiCaiPage(2,22,37);  hiddenLiCaiPage(3,38,52);
		if(strMessage.split("|")[7] == "1"){}
	}
	//金额，开户日期
	if(strMessage.split("|")[5] == "M0206"){
		if(strMessage.split("|")[7] == "1"){}
		//交易在打印合约之前的消息
		if(strMessage.split("|")[7] == "0"){}
		//文本框赋值
		if(strMessage.split("|")[7] == "2"){}
		if(strMessage.split("|")[7] == "6"){}
	}
	
	/**
	 * 基金签约业务 选择添问卷的消息  WinForm程序
	 * @param {Object} conhisid
	 */
	if(strMessage.split("|")[5] == "M0208"){
		if(strMessage.split("|")[7] == "1"){}
		if(strMessage.split("|")[7] == "0"){}
	}
	
	
	if(strMessage.split("|")[5] == "M0101"){}
	
	
	/**
	 * 拍照 返回消息
	 * lObjectID, lItemID ,strMessage
	 */
	if(lObjectID == 8007 && lItemID == 8007){
		jsLog(logStrMsg("GETMESSAGE:(" + lObjectID + ","+ lItemID + "," + strMessage + ")","MESSAGE"));
		saveTakeImg = strMessage;
		savepic = strMessage;
		var aa = Ext.getCmp('pic_cur');
		Ext.DomHelper.overwrite(aa.body,'<div style="margin-right:30px;margin-top:10px;"><img src="' + strMessage + '" style="width:100%;"/></div>');
		jsLog(logStrMsg("play take a picture imgPath : " + strMessage ,"INFO"));
	}
	
	/**
	 * 联网核查异步： 返回消息
	 * lObjectID, lItemID ,strMessage
	 */
	if(lObjectID == 8008 && lItemID == 8008){
		jsLog(logStrMsg("GETMESSAGE:(" + lObjectID + ","+ lItemID + "," + strMessage + ")","MESSAGE"));
		if(strMessage == "ERROR" || strMessage == ""){
			//checkPersonal = "needcheck";
			//核查返回ERROR...
			//需要进行补录
			if(BussChoicType == "KJJK"){
				jsLog(logStrMsg("已经过联网核查，但核查返回error，并且该笔[开借记卡]业务办理已通过拍照页面，需要进行补录"+conhisid_KJJK,"INFO   "));
				setTimeout("updateCheckPersonal("+conhisid_KJJK+",'NEEDCHECK')",3000);
			}else if(BussChoicType == "DZQD"){
				jsLog(logStrMsg("已经过联网核查，但核查返回error，并且该笔[电子渠道]业务办理已通过拍照页面，需要进行补录"+conhisid_DZQD,"INFO   "));
				setTimeout("updateCheckPersonal("+conhisid_DZQD+",'NEEDCHECK')",3000);
			}else if(BussChoicType == "TZLC"){
				jsLog(logStrMsg("已经过联网核查，但核查返回error，并且该笔[投资理财]业务办理已通过拍照页面，需要进行补录"+returnConhisID(),"INFO   "));
				setTimeout("updateCheckPersonal("+returnConhisID()+",'NEEDCHECK')",3000);
			}else if(BussChoicType == "FUND"){
				jsLog(logStrMsg("已经过联网核查，但核查返回error，并且该笔[基金签约]业务办理已通过拍照页面，需要进行补录"+returnConhisID(),"INFO   "));
				setTimeout("updateCheckPersonal("+returnConhisID()+",'NEEDCHECK')",3000);
			}
			checkERROR = true;
			jsLog(logStrMsg("Internation Check Indentity(身份) -> ERROR" ,"INFO   "));
			//告诉C#已经不用查看身份核查结果！
			myocx.InvokeBusinessForm(10,"",102,"");
		}else{
			//返回核查结果...
			jsLog(logStrMsg("Internation Check Indentity(身份) -> OK  Result:" + strMessage ,"INFO"));
			parseXmlFunc(strMessage);
		}
	}
	
	if(lItemID == 8888){
		jsLog(logStrMsg("GETMESSAGE:(" + lObjectID + ","+ lItemID + "," + strMessage + ")","MESSAGE"));
		jsLog(logStrMsg("GETMESSAGE:("+strMessage+")","MESSAGE"));
		if(strMessage.split("|")[0] == "ukeyno"){
			//赋值ukey编号  over_WYZS_SQ_SBNum
			jsLog(logStrMsg("GETMESSAGE:(-----ukeyno2----->手机银行也新增设备号显示信息："+strMessage.split("|")[1]+")","MESSAGE"));
			Ext.getCmp("over_WYZS_SQ_SBNum").setValue(strMessage.split("|")[1]);
			Ext.getCmp("over_SJ_SQ_MACHINENUM").setValue(strMessage.split("|")[1]);
			jsLog(logStrMsg("GETMESSAGE:(-----ukeyno2----->手机银行也新增设备号显示信息："+strMessage.split("|")[1]+")OVER","MESSAGE"));
		}
	}
	
	if(lItemID == 8010){
		jsLog(logStrMsg("GETMESSAGE:(" + lObjectID + ","+ lItemID + "," + strMessage + ")","MESSAGE"));
		if(BussChoicType != "KJJK"){
			saveSomeFile(returnConhisID(), '88', '1', strMessage, agentno, cusname, cerno);
			jsLog(logStrMsg("INFo : 存储高清录音成功！conhisid="+returnConhisID(),"MESSAGE"));
		}
	}
	
	if(lItemID == 888 && lObjectID == 888){
		jsLog(logStrMsg("GETMESSAGE:(" + lObjectID + ","+ lItemID + "," + strMessage + ")","MESSAGE"));
		if(Ext.getCmp("SJYH_ZIYW").getValue() == "01"){
			clearTimeout(TimeOut_flag);
			MessageCheckCode_TimeOut ++;
		}
		if(Ext.getCmp("WYZS_ZIYW").getValue() == "01"){
			clearTimeout(TimeOut_flag_wyzs);
			MessageCheckCode_TimeOut_wyzs ++;
		}
		if(strMessage.split(',')[0] == "SUCCESS"){
			jsLog(logStrMsg("GETMESSAGE:(验证码发送成功，请客户查收!)","MESSAGE"));
			myocx.InvokeBusinessForm(9,"",222,"验证码发送成功，请客户查收!");
		}else{
			jsLog(logStrMsg("GETMESSAGE:(验证码发送失败，错误代码："+strMessage.split(',')[1]+")","MESSAGE"));
			myocx.InvokeBusinessForm(9,"",222,"验证码发送失败，错误代码："+strMessage.split(',')[1]);
		}
		Ext.getCmp("CheckCode_btn").setDisabled(false);
	}
}
//  --   endmessage   --

/**
 * 文件检索相关
 */
var conHisId;// 联络历史ID
function saveSomeFile(conhisid, filetype, filesource, filepath, createby,cusname, crednum) {
	try {
		Ext.Ajax.request({
			url : __ctxPath + '/customer/updateHisAndFileConHis.do',
			method : 'post',
			//async: false,
			params : {
				conHisId : conhisid,
				fileType : filetype,
				fileSource : filesource,
				filePath : filepath,
				createBy : createby,
				cusName : cusname,
				credNum : crednum,
				serialNum : dealno,
				terminalId : termno
			},
			success : function(response, options){
				jsLog(logStrMsg("SAVE-存储文件成功，输出当前座席名称：" + agentName ,"INFO"));
			},
			failure : function(response, options){
				jsLog(logStrMsg("SAVESOMEFILE ERROR FAIL THE PATH :" + filepath ,"ERROR"));
			}
		});
	} catch (e) {
		jsLog(logStrMsg("Exception happened in saveSomeFile: " + e,"ERROR"));
	}
}
/** 最后开卡成功时修改状态为conhis.dealStaId=1001 */
function updateDealStaId(conhisid, dealStaId) {
	try {
		Ext.Ajax.request({
			url : __ctxPath + '/customer/updateHisStateConHis.do',
			method : 'post',
			params : {
				conHisId : conhisid,
				dealStaId : dealStaId
			},
			success : function(response, options) {
				jsLog(logStrMsg("UpdateDealStaId — Result SUCCESS conhisid="+conhisid+"\\\dealStaid=" + dealStaId,"INFO"));
			},
			failure : function(response, options) {
				alert('update conhis fail!#id=' + conhisid);
			}
		});
	} catch (e) {
		jsLog(logStrMsg("updateDealStaId() come /customer/updateHisStateConHis.do try catch info : " + e,"ERROR"));
	}
}
/** 最后挂断电话时，将电话结束时间 */
function updateConHisETime(conhisid) {
	try {
		Ext.Ajax.request({
			url : __ctxPath + '/customer/updateETimeConHis.do',
			method : 'post',
			params : {
				conHisId : conhisid
			},
			success : function(response, options) {
				jsLog(logStrMsg("updateConHisETime — Result SUCCESS conhisid="+conhisid,"INFO"));
			},
			failure : function(response, options) {
				alert('update conhis fail!#id=' + conhisid);
			}
		});
	} catch (e) {
		jsLog(logStrMsg("updateDealStaId() come /customer/updateHisStateConHis.do try catch info : " + e,"ERROR"));
	}
}

/**
 * 身份核查补录信息，更新后台数据库
 * @param {Object}  
 * 2014/05/23  -> 07/23(实)
 * Mr.Hu
 */
function updateCheckPersonal(conhisid, remarks) {
	try {
		Ext.Ajax.request({
			url : __ctxPath + '/customer/updateCheckPersonalConHis.do',
			method : 'post',
			//async: true,
			params : {
				conHisId : conhisid,
				remarks : remarks
			},
			success : function(response, options) {
				jsLog(logStrMsg("Console System Update CheckIndentity SUCCESS! ->conhisid="+conhisid ,"INFO   "));
			},
			failure : function(response, options) {
				jsLog(logStrMsg("Console System Update CheckIndentity Failure! ->conhisid="+conhisid ,"INFO   "));
			}
		});
	} catch (e) {
		jsLog(logStrMsg("updateCheckPersonal() catch info : " + e,"ERROR  "));
	}
}


/** 最后修改此次的业务是和类型(开卡、电子渠道：1、投资理财:2、借记卡挂失：3)*/
function updateHisBusType(conhisid, bustypeid) {
	try {
		Ext.Ajax.request({
					url : __ctxPath + '/customer/updateHisBusTypeConHis.do',
					method : 'post',
					params : {
						conHisId : conhisid,
						busTypeId : bustypeid
					},
					success : function(response, options) {
						jsLog(logStrMsg("updateHisBusType() 修改业务类型函数返回成功 conhisid=" + conhisid,"INFO"));
					},
					failure : function(response, options) {
						alert(' updateHisBusType  update conhis fail!#id=' + conhisid);
					}
				});
	} catch (e) {
		jsLog(logStrMsg("updateHisBusType() come /customer/updateHisStateConHis.do try catch info : " + e,"ERROR"));
	}
}

/**
 * 存储表单回收的文件，分类存储；
 * @param {Object} id
 */
function savePrintDoc(path){
	if(Ext.getCmp("DTMM_ZIYW").getValue() == "01"){
		saveSomeFile(conhisid_DTMM_SQ, '13', '2', path, agentno, cusname, cerno);
	}else if(Ext.getCmp("DTMM_ZIYW").getValue() == "02"){
		saveSomeFile(conhisid_DTMM_XG, '13', '2', path, agentno, cusname, cerno);
	}else if(Ext.getCmp("DTMM_ZIYW").getValue() == "03"){
		saveSomeFile(conhisid_DTMM_JS, '13', '2', path, agentno, cusname, cerno);
	}
	if(Ext.getCmp("SJYH_ZIYW").getValue() == "01"){
		saveSomeFile(conhisid_SJYH_SQ, '13', '2', path, agentno, cusname, cerno);
	}else if(Ext.getCmp("SJYH_ZIYW").getValue() == "02"){  
		saveSomeFile(conhisid_SJYH_TJ, '13', '2', path, agentno, cusname, cerno);
	}else if(Ext.getCmp("SJYH_ZIYW").getValue() == "03"){
		saveSomeFile(conhisid_SJYH_CZ, '13', '2', path, agentno, cusname, cerno);
	}else if(Ext.getCmp("SJYH_ZIYW").getValue() == "04"){
		saveSomeFile(conhisid_SJYH_ZZ, '13', '2', path, agentno, cusname, cerno);
	}else if(Ext.getCmp("SJYH_ZIYW").getValue() == "05"){ 
		saveSomeFile(conhisid_SJYH_ZX, '13', '2', path, agentno, cusname, cerno);
	}
	if(Ext.getCmp("dzyh_shenqing").getValue()){
		saveSomeFile(conhisid_DZYH_SQ, '13', '2', path, agentno, cusname, cerno);
	}else if(Ext.getCmp("dzyh_xiugai").getValue()){
		saveSomeFile(conhisid_DZYH_XG, '13', '2', path, agentno, cusname, cerno);
	}else if(Ext.getCmp("dzyh_chongzhi").getValue()){
		saveSomeFile(conhisid_DZYH_CZ, '13', '2', path, agentno, cusname, cerno);
	}
	if(Ext.getCmp("dhyh_shenqings").getValue()){
		saveSomeFile(conhisid_DHYH_SQ, '13', '2', path, agentno, cusname, cerno);
	}else if(Ext.getCmp("dhyh_xiugai").getValue()){
		saveSomeFile(conhisid_DHYH_XG, '13', '2', path, agentno, cusname, cerno);
	}else if(Ext.getCmp("dhyh_chongzhi").getValue()){
		saveSomeFile(conhisid_DHYH_CZ, '13', '2', path, agentno, cusname, cerno);
	}
	// WYZS_code 2014/08/08
	if(Ext.getCmp("WYZS_ZIYW").getValue() == "01"){ 
		saveSomeFile(conhisid_WYZS_SQ, '13', '2', path, agentno, cusname, cerno);
	}else if(Ext.getCmp("WYZS_ZIYW").getValue() == "02"){  
		saveSomeFile(conhisid_WYZS_TJ, '13', '2', path, agentno, cusname, cerno);
	}else if(Ext.getCmp("WYZS_ZIYW").getValue() == "03"){
		saveSomeFile(conhisid_WYZS_GS, '13', '2', path, agentno, cusname, cerno);
	}else if(Ext.getCmp("WYZS_ZIYW").getValue() == "04"){
		saveSomeFile(conhisid_WYZS_XE, '13', '2', path, agentno, cusname, cerno);
	}else if(Ext.getCmp("WYZS_ZIYW").getValue() == "05"){ 
		saveSomeFile(conhisid_WYZS_HFQY, '13', '2', path, agentno, cusname, cerno);
	}else if(Ext.getCmp("WYZS_ZIYW").getValue() == "06"){ 
		saveSomeFile(conhisid_WYZS_HFYZ, '13', '2', path, agentno, cusname, cerno);
	}
}


function saveVideo_tow(){
	if(Ext.getCmp("DTMM_ZIYW").getValue() == "01"){
		if(fristBusiness > 0){saveSomeFile(conhisid_DTMM_SQ, '5', '1', videofilePath, agentno, cusname, cerno);}              	 	 //放此处存储第一个视频路径
	}else if(Ext.getCmp("DTMM_ZIYW").getValue() == "02"){
		if(fristBusiness > 0){saveSomeFile(conhisid_DTMM_XG, '5', '1', videofilePath, agentno, cusname, cerno);}              	 	 //放此处存储第一个视频路径
	}else if(Ext.getCmp("DTMM_ZIYW").getValue() == "03"){
		if(fristBusiness > 0){saveSomeFile(conhisid_DTMM_JS, '5', '1', videofilePath, agentno, cusname, cerno);}              	 	 //放此处存储第一个视频路径
	}
	if(Ext.getCmp("SJYH_ZIYW").getValue() == "01"){
		if(c1 > 0 || fristBusiness > 0){saveSomeFile(conhisid_SJYH_SQ, '5', '1', videofilePath, agentno, cusname, cerno);}
	}else if(Ext.getCmp("SJYH_ZIYW").getValue() == "02"){
		if(c1 > 0 || fristBusiness > 0){saveSomeFile(conhisid_SJYH_TJ, '5', '1', videofilePath, agentno, cusname, cerno);}              	 	 //放此处存储第一个视频路径
	}else if(Ext.getCmp("SJYH_ZIYW").getValue() == "03"){
		if(c1 > 0 || fristBusiness > 0){saveSomeFile(conhisid_SJYH_CZ, '5', '1', videofilePath, agentno, cusname, cerno);}          	 	 //放此处存储第一个视频路径	
	}else if(Ext.getCmp("SJYH_ZIYW").getValue() == "04"){
		if(c1 > 0 || fristBusiness > 0){saveSomeFile(conhisid_SJYH_ZZ, '5', '1', videofilePath, agentno, cusname, cerno);}              	 	 //放此处存储第一个视频路径	
	}else if(Ext.getCmp("SJYH_ZIYW").getValue() == "05"){
		if(c1 > 0 || fristBusiness > 0){saveSomeFile(conhisid_SJYH_ZX, '5', '1', videofilePath, agentno, cusname, cerno);}              	 	 //放此处存储第一个视频路径	
	}
	if(Ext.getCmp("dzyh_shenqing").getValue()){
		if(c1 > 0 || c2 > 0 || fristBusiness > 0){saveSomeFile(conhisid_DZYH_SQ, '5', '1', videofilePath, agentno, cusname, cerno);}              	 	 //放此处存储第一个视频路径
	}else if(Ext.getCmp("dzyh_xiugai").getValue()){
		if(c1 > 0 || c2 > 0 || fristBusiness > 0){saveSomeFile(conhisid_DZYH_XG, '5', '1', videofilePath, agentno, cusname, cerno);}              	 	 //放此处存储第一个视频路径
	}else if(Ext.getCmp("dzyh_chongzhi").getValue()){
		if(c1 > 0 || c2 > 0 || fristBusiness > 0){saveSomeFile(conhisid_DZYH_CZ, '5', '1', videofilePath, agentno, cusname, cerno);}              	 	 //放此处存储第一个视频路径
	}
	if(Ext.getCmp("dhyh_shenqings").getValue()){
		if(c1 > 0 || c2 > 0 || c3 > 0 || fristBusiness > 0){saveSomeFile(conhisid_DHYH_SQ, '5', '1', videofilePath, agentno, cusname, cerno);}              	 	 //放此处存储第一个视频路径
	}else if(Ext.getCmp("dhyh_xiugai").getValue()){
		if(c1 > 0 || c2 > 0 || c3 > 0 || fristBusiness > 0){saveSomeFile(conhisid_DHYH_XG, '5', '1', videofilePath, agentno, cusname, cerno);}              	 	 //放此处存储第一个视频路径
	}else if(Ext.getCmp("dhyh_chongzhi").getValue()){
		if(c1 > 0 || c2 > 0 || c3 > 0 || fristBusiness > 0){saveSomeFile(conhisid_DHYH_CZ, '5', '1', videofilePath, agentno, cusname, cerno);}              	 	 //放此处存储第一个视频路径
	}
	
	//WYZS_code 2014/08/08
	if(Ext.getCmp("WYZS_ZIYW").getValue() == "01"){
		if(c1 > 0 || c2 > 0 || c3 > 0 || c4 > 0 || fristBusiness > 0){saveSomeFile(conhisid_WYZS_SQ, '5', '1', videofilePath, agentno, cusname, cerno);}
	}else if(Ext.getCmp("WYZS_ZIYW").getValue() == "02"){
		if(c1 > 0 || c2 > 0 || c3 > 0 || c4 > 0 || fristBusiness > 0){saveSomeFile(conhisid_WYZS_TJ, '5', '1', videofilePath, agentno, cusname, cerno);}              	 	 //放此处存储第一个视频路径
	}else if(Ext.getCmp("WYZS_ZIYW").getValue() == "03"){
		if(c1 > 0 || c2 > 0 || c3 > 0 || c4 > 0 || fristBusiness > 0){saveSomeFile(conhisid_WYZS_GS, '5', '1', videofilePath, agentno, cusname, cerno);}          	 	 //放此处存储第一个视频路径	
	}else if(Ext.getCmp("WYZS_ZIYW").getValue() == "04"){
		if(c1 > 0 || c2 > 0 || c3 > 0 || c4 > 0 || fristBusiness > 0){saveSomeFile(conhisid_WYZS_XE, '5', '1', videofilePath, agentno, cusname, cerno);}              	 	 //放此处存储第一个视频路径	
	}else if(Ext.getCmp("WYZS_ZIYW").getValue() == "05"){
		if(c1 > 0 || c2 > 0 || c3 > 0 || c4 > 0 || fristBusiness > 0){saveSomeFile(conhisid_WYZS_HFQY, '5', '1', videofilePath, agentno, cusname, cerno);}              	 	 //放此处存储第一个视频路径	
	}else if(Ext.getCmp("WYZS_ZIYW").getValue() == "06"){
		if(c1 > 0 || c2 > 0 || c3 > 0 || c4 > 0 || fristBusiness > 0){saveSomeFile(conhisid_WYZS_HFYZ, '5', '1', videofilePath, agentno, cusname, cerno);}              	 	 //放此处存储第一个视频路径	
	}
}
/**
 * 存储每一通电话 共同的文件路径
 */
function takeSaveSomeFiles(id){

	jsLog(logStrMsg("takeSaveSomeFiles() saveWavpath = " + saveWavpath ,"INFO"));
	jsLog(logStrMsg("takeSaveSomeFiles() picpath_copy = " + picpath_copy ,"INFO"));
	jsLog(logStrMsg("takeSaveSomeFiles() strVideoFilePath_copy = " + strVideoFilePath_copy ,"INFO"));
	jsLog(logStrMsg("takeSaveSomeFiles() savepic = " + savepic ,"INFO"));
	jsLog(logStrMsg("takeSaveSomeFiles() textTXT = " + textTXT ,"INFO"));
	
	saveSomeFile(id, '1', '1', "M" + dealno + "," + saveWavpath, agentno, cusname, cerno);	 //保存音频文件softphone
	saveSomeFile(id, '2', '2', picpath_copy, agentno, cusname, cerno);			          	 //照片
	saveSomeFile(id, '5', '1', strVideoFilePath_copy, agentno, cusname, cerno);          	 //存储第二个视频路径
	saveSomeFile(id, '2', '2', savepic,agentno, cusname, cerno);				             //照片
	saveSomeFile(id, '88', '1', saveClearWav, agentno, cusname, cerno);
	if(textTXT != ""){
		saveSomeFile(id, '99', '2', textTXT,agentno, cusname, cerno);  //判断不为空的时候，才存储核查文件
	}
	if(BussChoicType == "DZQD"){
		saveSomeFile(id, '13', '2', EBankPDFpath ,agentno, cusname, cerno);	
	}
	jsLog(logStrMsg("takeSaveSomeFiles() SUCCESS FOR conHisId:" + id ,"INFO"));
}

function insertLog(){}
/**
 * updateHisBusType(_conHisId , type);   //updateConHis
 */
function updateHis(){}

/**
 * takeSaveSomeFiles(_conHisId);
 */
function takeSomeFiles(){}


/**    
 * 据审核通过判断客户选择的对应业务  将分类存储在后台，并分类明细
 * 业务类型：  1->动态网银(申)  2->动态网银(修)   3->动态网银(解锁)
 * 		   4->手机银行(申)  5->手机银行(重置)  6->手机银行(下挂)
 * 		   7->手机银行(修)  8->手机银行(注销)  10->电子渠道(总)
 * 		   11->投资理财     12->密码挂失....
 * 		   13->电子银行密码(申) 14->电子银行密码(修) 15->电子银行密码(重)
 * 		   16->电话银行密码(申) 17->电话银行密码(修) 18->电话银行密码(重)
 */
function saveBusTypeConHis(){}

function changeCallflag(flag,endTime,callid) {
	jsLog(logStrMsg("座席挂断电话输出gchangecallflag() --> callID = "+callid,"INFO"));
	closecallflag = flag;
	myocx.AgentSetVoiceReleaseInfo(endTime);   	//告诉曲晓挂断事件
}

var saveWavpath="";
var startT = "";
var saveWavfail="false";
function saveWav(filepath,starTime) {   //此处弹屏慢时会导致收不到消息 Video -> 调用曲晓控件
	jsLog(logStrMsg("INFo:(111 saveWav --> filepath = "+filepath,"MESSAGE"));
	if(saveWavfail == "false"){
		if(filepath.indexOf("wav") >= 0){
			jsLog(logStrMsg("INFo:(录音文件已经存在wav后缀名，无需添加...)","MESSAGE"));
		}else{
			jsLog(logStrMsg("INFo:(录音文件没有后缀名wav需添加...)","MESSAGE"));
			filepath = filepath + ".wav";
		}
		//将后缀名更改为MP3格式
		filepath = filepath.split('.wav')[0] + ".mp3";
	}
	jsLog(logStrMsg("C# --> getDealNo = "+dealno,"TEXT"));
	jsLog(logStrMsg("INFo:(saveWav --> dealno"+dealno+"filepath = "+filepath,"MESSAGE"));
	saveWavpath = filepath;
	startT = starTime;
	//alert("dealno:"+dealno);
	//alert("filepath"+filepath);
	saveWavfail="false";
	jsLog(logStrMsg("***phoneNum = " +phoneNum　+ "   username = " + curUserInfo_1.username,"MESSAGE"));
	if(dealno ==""){
		saveWavpath=filepath;
		saveWavfail="true";
	}else{
		try {
			//alert("filepath"+filepath);
			myocx.AgentSetVoiceInfo(startT + "," + dealno + "," + callinId + "," + filepath + "," + phoneNum + "," + curUserInfo_1.username); 			 // 传给曲晓.
			jsLog(logStrMsg("INFo:(myocx.AgentSetVoiceInfo)","MESSAGE"));
		} catch (e) {
			jsLog(logStrMsg("SaveWav method try catch of [dealno:"+dealno+"] [callinId:"+callinId+"] [filepath:"+filepath+"]","ERROR"));
			//alert(dealno + "," + callinId + "," + filepath + "\n" + e);
		}
		jsLog(logStrMsg("INFo:(dealno 存储录音前的流水号："+dealno+"filepath = "+filepath+")","MESSAGE"));
		saveSomeFile(returnConhisID(), '1', '1', "M" + dealno + "," + filepath, agentno, cusname, cerno);// 保存音频文件softphone
		jsLog(logStrMsg("INFo:(保存录音文件方法成功)","MESSAGE"));
	}
}

/** 弹屏时没客户信息，所以暂时不存。刷身份证后存储 */
var videofilePath = "";
var strVideoFilePath_copy="";
function Regvideofilesucc(lCamaraIndex, strVideoFilePath) {
	jsLog(logStrMsg(" Regvideofilesucc(lCamaraIndex="+lCamaraIndex+", strVideoFilePath="+strVideoFilePath+")","INFO"));
	if(strVideoFilePath.split("_")[6].split(".")[0] == "1"){strVideoFilePath_copy = strVideoFilePath;}
	if(strVideoFilePath.split("_")[6].split(".")[0] == "0"){videofilePath = strVideoFilePath;}
	if(BussChoicType != "KJJK"){
		saveSomeFile(returnConhisID(), '5', '1', strVideoFilePath, agentno, cusname, cerno);
		jsLog(logStrMsg("SAVE VIDEO OK FILES FRIST conhisid : " + returnConhisID() +"  path : " + strVideoFilePath,"INFO"));
	}
	
	//parseInt - 1 
}

function Regvideofilefail(lCamaraIndex, strVideoFilePath) {
	jsLog(logStrMsg(" Regvideofilefail(lCamaraIndex="+lCamaraIndex+", strVideoFilePath="+strVideoFilePath+")","INFO"));
}
// 自动触发
function VtmAgentInit(t,s) {

	jsLog(logStrMsg("VTM AgentInit Begin , param (t="+t+",s="+s+")","INFO"));
	if(t == "T022"){
		jsLog(logStrMsg("判断当前呼入的VTM设备是否是T022？若是T022便将基金业务按钮变为可选择","INFO"));
		YesOrNo_FUND = "yes";
	}
	/** 视频控件 */
	if (!dev_mode) {
		//alert("VtmAgentInit function begin ...");
		agentinit();// 初始化连接server
		//放入此处视频存储方法
		jsLog(logStrMsg("如果allOcxInclude等于1将存储第一个主视频! allOcxInclude="+allOcxInclude,"INFO"));
		if (allOcxInclude == 1) {
			
		}
		allOcxInclude++;
		agentmakecall(t,s);// 初始化连接终端
	}
}

/**************************************清空数据***********************************************
 * 但关闭弹屏页面之后将所有要清空的数据在此函数中清除 空 
 * @class CusPersonalFormCallin
 * @extends Ext.Panel
 */
function resetData(){
	globalcurpage = 0;
	YesOrNo_FUND = "";   //是否是基金业务？
	count = 0;			//重置关闭做、index.jsp中的左侧栏函数
	closecallflag = 0;  //重置
	checkSF = 0 ;       //点击身份核查按钮记录  重置
	totalBussines = "one";
	card = "";          //总显示
	rememberBuss = 0;   //清空--变量
	rememberScanCard = 0;
	checkPwdType = "";  //清空验证密码类型
	fristBusiness = 0;  //重置是否是第一次呼入业务
	checkbox_KJJK = false;
	checkbox_DZQD = false;
	checkbox_TZLC = false;
	checkbox_JJGS = false;
	
	NotPaper = "True";
	c1 = 0 ;
	c2 = 0 ;
	c3 = 0 ;
	c4 = 0 ;
	c5 = 0 ;
	goNextYN = 0;  //次变量用来判断是否有没有填写的问卷题目
	agentprints = ""; 
	cardNumber = "";  //清空卡号变量
	strCallMessage_1 = "";
	savePicIndex = 0;
	
	textCont_PY = "A";
	textCont_SJ = "B";
	textCont_call = "C";
	textCont_qucall = "D";
	textCont_YB = "E";
	textCont_EM = "F";
	textCont_DW = "J";
	textCont_XX = "H";

	wyzs_sq = "";
	wyzs_xg = "";
	wyzs_gs = "";
	wyzs_xe = "";   //限额变量
	wyzs_hfqy = ""; //恢复启用
	wyzs_hfyz = "";
	
	checkretInfo = "";   //清空身份核查的返回的字符串值
	checkClick = false;  //将查看审核结果 按钮标记事件还原
	checkERROR = false;  //将联网核查是否是ERROR还原
	clickFlag = false; 
	saveTakeImg = "";
	
	textTXT = ""; // 身份核查txt文件路径 - 清空
	
	conhisid_DTMM_SQ = ""; conhisid_DTMM_XG = ""; conhisid_DTMM_JS = "";
	conhisid_SJYH_SQ = ""; conhisid_SJYH_TJ = ""; conhisid_SJYH_CZ = ""; conhisid_SJYH_ZZ = "";  conhisid_SJYH_ZX = "";
	conhisid_DZYH_SQ = ""; conhisid_DZYH_CZ = ""; conhisid_DZYH_XG = ""; 
	conhisid_DHYH_SQ = ""; conhisid_DHYH_CZ = ""; conhisid_DHYH_XG = "";
	conhisid_WYZS_SQ = ""; conhisid_WYZS_TJ = ""; conhisid_WYZS_GS = "";conhisid_WYZS_XE = ""; conhisid_WYZS_HFQY = ""; conhisid_WYZS_HFYZ = "";
	
	//----2016/1/25 重置变量----
	ZYW_DTWY_OK = 0; ZYW_SJYH_OK = 0; ZYW_DZMM_OK = 0; ZYW_DHMM_OK = 0; ZYW_WYZS_OK = 0;
}

//***************************************************************************************** //TODO 成员变量和局部变量的分界线

CusPersonalFormCallin = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		
		Ext.applyIf(this, _cfg);
		arr = _cfg.split(',');
		//alert(arr[2]);
		isConn = 0;
		isCheckID = 0;

		agentno = "";
		agcallno = "";
		agsite = "";

		termno = "";
		termsite = "";

		savepicDir = "";
		tmid = "";
		site = "";
		videoip = "";
		port = "";

		dealno = "";
		callinId = 0;

		globalcurpage = 0;
		isManaged = 0;
		closecallflag = 0;
		isSavepic = 0;


		data = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "","", ""];
		arrCheck = new Array(2);// 缓存索引。;
		idinfos = '';
		cusname = "";
		cerno = "";
		savepic = "";
		scanfp = "";// "E:\\tempfile\\411325198712205037bob.bmp";

		this.customerId = arr[0];
		this.numberPhone = arr[1];
		/**
		 * *依据电话号码映射终端设备号，替换头为T。2001--> T001。注意在弹屏时生成conhis，那里也保存了termno = "T" +
		 * (arr[1] + "").substring(1);
		 */
		// alert("T" + "2001".substring(1));
		termno = "T" + (arr[1] + "").substring(1);
		termsite = "S" + (arr[1] + "").substring(1);
		callinId = arr[6];
		// alert(_cfg, callinId);
		conHisId = arr[2];
		agentParam();// 配置文件中获取坐席参数
		if (this.customerId == 'null') {
			this.customerId = -1;
		}
		// 必须先初始化组件
		this.initUIComponents();
		// alert("init end!");
		CusPersonalFormCallin.superclass.constructor.call(this,{
					id : 'CusPersonalFormCallinWin',
					layout : 'fit',
					items : this.formPanel,
					modal : true,
					region : 'center',
					title : '来电弹屏',
					iconCls : 'server_go',
					listeners : {
						'beforeclose' :  function(p){
							if(closecallflag == 0) {
								alert("请先挂断电话！");
								return false;
							} else if(closecallflag == 1){
//								if(!window.confirm("确认关闭弹屏页面吗?")){
//									return false;
//								}else{
//									setMyocxInfo(1,"");setMyocxInfo(0,"");
//									resetData(); //重置数据变量
//									jsLog(logStrMsg("结束业务办理  totalBussines : " + totalBussines ,"MAIN"));
//									return true;
//								}
								
								setMyocxInfo(1,"");setMyocxInfo(0,"");
								resetData(); //重置数据变量
								updateConHisETime(returnConhisID());
								jsLog(logStrMsg("结束业务办理  totalBussines : " + totalBussines ,"MAIN"));
								return true;
							}
						}
					}
				});
		//  自动触发视频初始化连接操作。
		// setTimeout("win_l                oad()", 2500);
	},// end of the constructor
	// 初始化组件
	initUIComponents : function() {
		// 联系方式
		this.gridPanel_contact = new HT.EditorGridPanel({
			region : 'center',
			showPaging : false,
			showSm : false,
			clicksToEdit : 1,
			showNum : false,
			tbar : ['->', {
				iconCls : 'btn-save',
				text : '保存',
				xtype : 'button',
				scope : this,
				handler : function() {
					var params = [];
					var grid = this.gridPanel_contact;
					var store = grid.getStore();
					for (var i = 0; i < store.getCount(); i += 1) {
						var record = store.getAt(i);
						if (record.dirty) {
							params.push(record.data);
						}
					}
					if (params.length == 0) {
						Ext.ux.Toast.msg('信息', '没有对数据进行任何更改');
						return ;
					}
					Ext.Ajax.request({
								method : 'post',
								url : __ctxPath
										+ '/customer/mulSaveCusContact.do?customerId='
										+ this.customerId,
								params : {
									data : Ext.encode(params),
									customerId:this.customerId
								},
								success : function(request){
									Ext.ux.Toast.msg('操作信息', '成功设置');
									store.reload();
									// this.gridPanel_contact.getStore().reload();
								},
								failure : function(request) {
									Ext.ux.Toast.msg('操作信息', '设置出错，请联系管理员!');
								}
							});
				}
			}, '->', {
				iconCls : 'btn-add',
				text : '添加',
				xtype : 'button',
				scope : this,
				handler : this.createRs_contact
			}],
			autoHeight : false,
			height : 150,
			id : 'UlContactGrid_empl',
			url : __ctxPath + "/customer/listByCusIdCusContact.do?customerId="
					+ this.customerId,
			fields : [{
						name : 'contactId',
						type : 'int'
					}, 'cusContact', 'contactTypeId', 'contactSubTypeId',
					'preContactNum', 'mainContactNum', 'lastContactNum',
					'isDefault', 'isChecked', 'contactRemarks', 'createTime',
					'lastUpdateTime', 'statusId'],
			columns : [{
						header : '内码',
						dataIndex : 'contactId',
						hidden : true
					},{
						header : '联络方式',
						dataIndex : 'contactTypeId',
						editor : new Ext.form.ComboBox({
							name : 'cusContact.contactTypeId',
							allowBlank : false,
							id : 'cusContact.contactTypeId',
							displayField : 'itemName',
							valueField : 'itemId',
							mode : 'local',
							triggerAction : 'all',
							forceSelection : false,
							hiddenName : 'cusContact.contactTypeId',
							store : new Ext.data.SimpleStore({
								url : __ctxPath
										+ '/system/loadItemDictionary.do',
								baseParams : {
									itemName : '联络方式'
								},
								fields : ['itemId', 'itemName'],
								autoLoad : true,
								method : "post",
								listeners : {
									load : function(){
										var combo = Ext.getCmp('cusContact.contactTypeId');  
										var store = combo.getStore();
										var rows = [];// 定义数组
										for (var i = 0; i < store.getCount(); i++) { // store.getCount()为store的长度
											if (store.getAt(i).data['itemId'] == combo.getValue()) {
												combo.setValue(store.getAt(i).data['itemName']);
												break;
											}
										}
									}
								}
							})
						}),
						renderer : function(value) {
							if (value != null) {
								return LXFS001.get(value);
							} else {
								return ' ';
							}
						}
					}, {
						header : '地址/号码',
						dataIndex : 'mainContactNum',
						editor : new Ext.form.TextField({
									allowBlank : false,
									id : 'mainContactNum'
								})
					}, {
						header : '状态',
						dataIndex : 'statusId',
						editor : new Ext.form.ComboBox({
							name : 'cusPersonal.statusId',
							allowBlank : false,
							id : 'cusPersonal.statusId',
							displayField : 'itemName',
							valueField : 'itemId',
							mode : 'local',
							triggerAction : 'all',
							forceSelection : false,
							hiddenName : 'cusPersonal.statusId',
							store : new Ext.data.SimpleStore({
								url : __ctxPath
										+ '/system/loadItemDictionary.do',
								baseParams : {
									itemName : '是否'
								},
								fields : ['itemId', 'itemName'],
								autoLoad : true,
								method : "post",
								listeners : {
									load : function() {
										var combo = Ext.getCmp('cusPersonal.statusId');
										var store = combo.getStore();
										var rows = [];// 定义数组
										for (var i = 0; i < store.getCount(); i++) { // store.getCount()为store的长度
											if (store.getAt(i).data['itemId'] == combo.getValue()) {
												combo.setValue(store.getAt(i).data['itemName']);
												break;
											}
										}
									}
								}
							})
						}),
						renderer : function(value) {
							if (value != null) {
								return YorN.get(value);
							} else {
								return ' ';
							}
						}
					}]
				// end of columns
		});

		// 联络历史
		this.gridPanel_contacthistory = new HT.EditorGridPanel({
			region : 'center',
			autoHeight : false,
			id : 'gridPanel_contacthistoryPanel',
			clicksToEdit : 1,
			url : __ctxPath
					+ "/customer/listConHis.do?Q_customer.customerId_L_EQ="
					+ this.customerId,
			fields : [{
						name : 'conHisId',
						type : 'int'
					},'contactTypeId', 'dirId', 'staTime', 'ownerId',
					'busTypId', 'conResId', 'dealStaId'],
			columns : [{
						header : '内码',
						dataIndex : 'conHisId',
						hidden : true
					 },{
						header : '联络方式',
						dataIndex : 'contactTypeId',
						editor : new Ext.form.ComboBox({
							name : 'cusContact.contactTypeId',
							allowBlank : false,
							id : 'cusContact.contactTypeId',
							displayField : 'itemName',
							valueField : 'itemId',
							mode : 'local',
							triggerAction : 'all',
							forceSelection : false,
							hiddenName : 'cusContact.contactTypeId',
							store : new Ext.data.SimpleStore({
								url : __ctxPath
										+ '/system/loadItemDictionary.do',
								baseParams : {
									itemName : '联系方式'
								},
								fields : ['itemId', 'itemName'],
								autoLoad : true,
								method : "post",
								listeners : {
									load : function() {
										var combo = Ext.getCmp('cusContact.contactTypeId');
										var store = combo.getStore();
										var rows = [];// 定义数组
										for (var i = 0; i < store.getCount(); i++) { // store.getCount()为store的长度
											if (store.getAt(i).data['itemId'] == combo.getValue()) {
												combo.setValue(store.getAt(i).data['itemName']);
												break;
											}
										}

									}
								}
							})
						}),
						renderer : function(value) {
							if (value != null) {
								return LXFS001.get(value);
							} else {
								return ' ';
							}
						}
					}, {
						header : '方向',
						dataIndex : 'dirId',
						renderer : function(value) {
							return CONFX002.get(value);
						}

					}, {
						header : '联络时间',
						dataIndex : 'staTime',
						editor : new Ext.form.TextField({
									allowBlank : false,
									id : 'createTime'
								})
					}, {
						header : '负责人',
						dataIndex : 'ownerId'
					}, {
						header : '联络事项',
						dataIndex : 'busTypId',
						renderer : function(value) {
							return CONLLSX.get(value);
						}
					}, {
						header : '联络结果',
						dataIndex : 'conResId',
						renderer : function(value) {
							return CONLLJG.get(value);
						}
					}, {
						header : '联络状态',
						dataIndex : 'dealStaId',
						renderer : function(value) {
							return CONCLZT.get(value);
						}
					}]
				// end of columns
		});
		// 服务历史
		this.gridPanel_fuwuhistory = new HT.GridPanel({
			id : 'gridPanel_fuwuhistoryPanel',
			region : 'center',
			autoHeight : false,
			url : __ctxPath
					+ "/customer/listServiceRequestConServiceRequest.do",
			baseParams : {
				'customerId' : this.customerId
			},
			fields : [{
						name : 'serviceRequestId',
						type : 'int'
					}, 'type', 'source', 'starttime', 'accept', 'accept',
					'customer.customerName', 'status', 'endtime'],
			columns : [{
						header : '服务类型',
						dataIndex : 'type',
						renderer : function(value) {
							return CR_TYPE.get(value);
						}
					}, {
						header : '来源',
						dataIndex : 'source',
						renderer : function(value) {
							return CONLYLB.get(value);
						}
					}, {
						header : '处理时间',
						dataIndex : 'starttime',
						editor : new Ext.form.TextField({
									allowBlank : false,
									id : 'starttime'
								})
					}, {
						header : '处理人',
						dataIndex : 'accept'
					}, {
						header : '处理对象',
						dataIndex : 'customer.customerName'
					}, {
						header : '状态',
						dataIndex : 'status',
						renderer : function(value) {
							return CONTPCLJG.get(value);
						}
					}, {
						header : '完成时间',
						dataIndex : 'endtime'
					}]
				// end of columns
			});

		// 开卡设定
		var i = 0;

		function cardHandler(direction) {
			i = isConn == 1 ? globalcurpage : i;  //从当前也开始上下移动。
			if (direction == -1) {
				i--;
				if (i < 0) {
					i = 0;
				}
			}
			if (direction == 1) {
				i++;
			}
			globalcurpage = i;
			this.cardActionPanel.getLayout().setActiveItem(i);
		};

		this.buttongrps = new Ext.ButtonGroup({
					title : 'btns',
					items : [{
								xtype : 'button',
								text : '上一步',
								handler : cardHandler
										.createDelegate(this, [-1])
							}, {
								xtype : 'button',
								text : '下一步',
								handler : cardHandler.createDelegate(this, [1])
							}, {
								xtype : 'button',
								text : '坐席输入',
								handler : function() {
									//manage('100501', false);
								}

							}, {
								xtype : 'button',
								text : '客户输入',
								handler : function() {
									//manage('100501', true);
								}
							}]
				});
		
				this.viewPanl = new Ext.Panel({     	//TODO viewpanl业务办理菜单
							title:'<font style="color:#bf1919">业务办理菜单</font>>卡选择>身份核实>开户章程>客户资料>客户签字>审核客户资料>附加设置>开卡完成',
							layout:"column",
							id : '1000',// 页码标签从1000开始
							width:1000,
							height:100,
							autoScroll : true,
							items:[]  
						});
				
				this.viewPanl2 = new Ext.Panel({     	//TODO viewpanl2业务办理菜单
							title:'<font style="color:#bf1919">业务办理菜单</font>>卡选择>身份核实>开户章程>客户资料>客户签字>审核客户资料>附加设置>开卡完成',
							layout:"column",
							id : '1008',// 页码标签从1000开始
							width:1000,
							height:100,
							autoScroll : true,
							items:[]  
						});
				




/********
 * 是否点击”身份核查“按钮函数
 * */
function checkSFyesorno(){
	var win = new Ext.Window({
			width : 500,
			title : '友情提示',
			height : 200,
			html : '<font style="font-size:28px;color:red"><br>&nbsp;&nbsp;&nbsp;&nbsp您还未进行联网核查，是否继续？</font>',
			modal : true,
			buttonAlign : 'center',
			buttons : [{
				text : '<font style="font-size:16px;margin-top:0px">继续</font>',
				width : 60,
				height : 30,
				handler : function() {
					rememberBuss = 1;   //作为标记证明此次通话已扫描过客户证件
					//synWithTerm(12,1);
					isSavepic = 0;
					if(BussChoicType != "FUND"){
						confirmCusInfos();
					}
					if(totalBussines == "two"){
						ReadZC(0);
					}
					
					//证明该笔业务没有点击联网核查，需要修改-〉补录标记   Check_Indentity  2014/7/24
					if(BussChoicType == "KJJK"){
						jsLog(logStrMsg("未经过联网核查，并且该笔[开借记卡]业务办理已通过拍照页面，需要进行补录"+conhisid_KJJK,"INFO   "));
						setTimeout("updateCheckPersonal("+conhisid_KJJK+",'NEEDCHECK')",3000);
					}else if(BussChoicType == "DZQD"){
						jsLog(logStrMsg("未经过联网核查，并且该笔[电子渠道]业务办理已通过拍照页面，需要进行补录"+conhisid_DZQD,"INFO   "));
						setTimeout("updateCheckPersonal("+conhisid_DZQD+",'NEEDCHECK')",3000);
					}else if(BussChoicType == "TZLC"){
						jsLog(logStrMsg("未经过联网核查，并且该笔[投资理财]业务办理已通过拍照页面，需要进行补录"+returnConhisID(),"INFO   "));
						setTimeout("updateCheckPersonal("+returnConhisID()+",'NEEDCHECK')",3000);
					}else if(BussChoicType == "FUND"){
						jsLog(logStrMsg("未经过联网核查，并且该笔[投资理财]业务办理已通过拍照页面，需要进行补录"+returnConhisID(),"INFO   "));
						setTimeout("updateCheckPersonal("+returnConhisID()+",'NEEDCHECK')",3000);
					}
					//-------------------------------------
					//Ext.getCmp("bulu").setDisabled(true);
					checkClick = true;
					jsLog(logStrMsg("Take Photo Click Sure_Button show -> checkClick="+checkClick,"INFO   ")); //记录日志
					
					jsLog(logStrMsg("[No CheckIndentity]Ready Save Pic -> begin  _ savepic = "+savepic,"INFO   ")); //记录日志
					saveSomeFile(returnConhisID(), '2', '2', savepic,agentno, cusname, cerno);//拍完照片立即将路径存储在数据库
					jsLog(logStrMsg("[No CheckIndentity]Save Pic OK -> Over  _ savepic = "+savepic,"INFO   ")); //记录日志
					
					win.close();
				}
			},{
				text : '<font style="font-size:16px;margin-top:0px">取消</font>',
				width : 60,
				height : 30,
				handler : function() {
					if(BussChoicType == "FUND"){
						//myocx.InvokeBusinessForm(8,"",985,"");   //打开当前所在的WinForm流程
					}
					win.close();
				}
			}]
		});
		win.show();
}







/**********************************<<校验综合页面文本框信息>>*******************************
 * @param1: str 内容
 * @param2: type 内容类型  1:表示手机号数字类型； 2：字符串类型;
 * @param3: busType 业务类型；
 * @param4: suBusType 子业务选择项
 */
function check_zh_date(str,type,busType,suBusType){
	if(busType == "DTMM"){
		if(suBusType == ""){
			Ext.getCmp("check_ZH_info").setValue("请选择子业务项...");
		}else if(suBusType == "01"){
			if(str.split("|")[0].length != 11){
				Ext.getCmp("check_ZH_info").setValue("绑定手机号必须为11位");
			}else{
				Ext.getCmp("check_ZH_info").setValue("");
			}
		}else if(suBusType == "02"){
			if(str.split("|")[1].length != 11 && str.split("|")[2].length != 11){
				Ext.getCmp("check_ZH_info").setValue("原手机号必须为11位!//新手机号必须为11位!");
			}else if(str.split("|")[1].length != 11){
				Ext.getCmp("check_ZH_info").setValue("原手机号必须为11位!");
			}else if(str.split("|")[2].length != 11){
				Ext.getCmp("check_ZH_info").setValue("新手机号必须为11位!");
			}else{
				Ext.getCmp("check_ZH_info").setValue("");
			}
		}else if(suBusType == "03"){
			if(str.split("|")[1].length != 11){
				Ext.getCmp("check_ZH_info").setValue("原手机号必须为11位!");
			}else{
				Ext.getCmp("check_ZH_info").setValue("");
			}
		}
	}else if(busType == "SJYH"){
		if(suBusType == ""){
			Ext.getCmp("check_ZH_info").setValue("请选择子业务项...");	
		}else if(suBusType == "01" || suBusType == "02"){
			if(str.toString().length != 11){
				Ext.getCmp("check_ZH_info").setValue("绑定手机号必须为11位!");
			}else{
				Ext.getCmp("check_ZH_info").setValue("");
			}
		}
	}
}


/**************************<<提交校验的数据.友情提示>>*********************************
 * 提交校验的数据
 */
function takePrintYN(msg){
	var win = new Ext.Window({
				width : 520,
				title : '友情提示',
				height : 180,
				html : '<font style="font-size:24px;color:red;"><br>&nbsp;&nbsp;&nbsp;&nbsp是否确定打印《'+msg+'》？</font>',
				modal : true,
				buttonAlign : 'center',
				buttons : [{
					text : '<font style="font-size:16px;margin-top:0px">是</font>',
					width : 60,
					height : 30,
					handler : function() {
						/***
						//提交当前的数据之后，设计方案是否存入一个变量里面，发送消息给VTM端；但是当两张卡，每个卡选择业务不一致时，就会考虑到是否用两个变量，这样增加了代码负重；
						//首先判断提交的数据是‘动态密码’的数据还是‘手机银行’的数据
						//动态密码 ：1：两个卡号办理同样的业务；发送一个字符串消息“str|busType(业务类型)|phoneNum|oldNum|newNum”
						//手机银行 : 
						if(Ext.getCmp("check_" + type).getValue() == ""){
							//会判断传入的type是DTMM还是SJYH；将分别记录对应的数据
							Ext.ux.Toast.msg('操作信息', '提交信息成功!');
						}else{
							Ext.ux.Toast.msg('操作信息', '您提交的数据有误，请确认后提交!');  
						}
						*/
						     if(Ext.getCmp("leixin").getValue() == "01" || Ext.getCmp("leixin").getValue() == "理财问卷"){
								getMsgBody4G2("","",5,"","LC");
							}else if(Ext.getCmp("leixin").getValue() == "02"){
								getMsgBody4G2("","",5,"","JJ");
							}else if(Ext.getCmp("leixin").getValue() == "0201"){
								getMsgBody4G2("","",5,"P019","type_JJ_Result");
								videostartvedio1();// 第二个视频。
							}else if(Ext.getCmp("leixin").getValue() == "03"){
								getMsgBody4G2("","",5,"P019","type_JJ");
								videostartvedio1();// 第二个视频。
							}else if(Ext.getCmp("leixin").getValue() == "04"){
								getMsgBody4G2("","",5,"P019","type_JQ");
								videostartvedio1();// 第二个视频。
							}else if(Ext.getCmp("leixin").getValue() == "05"){
								getMsgBody4G2("","",5,"P019","type_PH");
								videostartvedio1();// 第二个视频。
							}else if(Ext.getCmp("leixin").getValue() == "06"){
								getMsgBody4G2("","",5,"P019","type_WJ");
								videostartvedio1();// 第二个视频。
							}else if(Ext.getCmp("leixin").getValue() == "07"){
								getMsgBody4G2("","",5,"P019","type_JS");
								videostartvedio1();// 第二个视频。
							}else{
								alert("请选择打印内容!");
							}
						win.close();
					}
				},{
					text : '<font style="font-size:16px;margin-top:0px">否</font>',
					width : 60,
					height : 30,
					handler : function() {
						win.close();
					}
				}]
			});
			win.show();
}		
		jsLog(logStrMsg("开始加载callIn页面中this.cardActionPanel元素","INFO"));
//========================================= CARD总面板 =========================================
		this.cardActionPanel = new Ext.Panel({
			layout : 'card',
			border : false,
			activeItem : 0,
			id : 'cardpanel',
			heigth : 540,
			tbar : ['->',{
						id : 'thanks_do_',
						text : '显示感谢使用',
						handler : function (){
							getMsgBody4G2("M0207","",5,"","type_Thanks");
						}
					}, {
						id : 'tbarmove-prev',
						//text : '上一步',
						hidden : true,
						iconCls : 'btn-top',
						handler : cardHandler.createDelegate(this, [-1])
					}, {
						id : 'tbarmove-next',
						//text : '下一步',
						hidden : false,
						iconCls : 'btn-down',
						handler : cardHandler.createDelegate(this, [1])
					}
			],
			items : [
			  this.viewPanl,  //综合选择菜单
			  {
				border : false,
				title : '<font style="color:#bf1919">卡选择</font>>身份核实>业务章程>客户资料>客户签字>审核客户资料>附加设置>开卡完成',
				layout : 'border',
				name : '借记卡申请首页',// 展示各种类型卡
				id : '1001',// 页码标签从1001开始
				items : [{
					region : 'center',
					border : false,
					layout : 'border',
					buttonAlign : 'center',
					style : 'background-color:#fff',
					items : [{
						region : 'center',
						layout : 'column',
						border : false,
						items : []
					}]
				}]
			}, {
				border : false,
				layout : 'border',
				title : '业务选择><font style="color:#bf1919">身份核实</font>>业务章程>客户资料>客户签字>审核客户资料>附加设置',
				name : '客户信息识别页',
				id : '1002',//
				buttonAlign : 'center', 
				items : [{
					region : 'center',
					border : false,
					layout : 'form',
					autoScroll : true,
					items : []
				}]
			}, {
				border : false,
				title : '业务选择><font style="color:#bf1919">身份核实</font>>业务章程>客户资料>客户签字>审核客户资料>附加设置>开卡完成',
				id : '1003',
				autoScroll : true,
				layout : 'border',
				items : [{
					style : 'background-color:#fff',
					border : false,
					region : 'center',
					autoScroll : true,  //---------------------
					items : []
				}]
			}, {
				border : false,
				title : '业务选择>身份核实><font style="color:#bf1919">业务章程</font>>客户资料>客户签字>审核客户资料>附加设置>开卡完成',
				name : '展示章程',
				id : '1004',
				style : 'background-color:#fff',
				layout : 'border',
				items : [{
						region:"center",
						border : false,
						//autoHeight : true,
						autoScroll : true,
						items:[] 
					}]
			}, {
				layout : 'border',
				border : false,
				title : '业务选择>身份核实>业务章程><font style="color:#bf1919">客户资料</font>>客户签字>审核客户资料>附加设置>开卡完成',
				name : '客户基础信息填单页',
				autoScroll : true,
				id : '1005',
				labelWidth : 100,
				labelAlign : 'right',
				items : [{
					region : 'center',
					border : false,
					labelAlign : 'right',
					id : '100501',
					layout : 'form',
					bodyStyle : 'padding-top:370px',
					items : []
				}]
			}
			, {
				layout : 'border',
				border : false,
				title : '业务选择>身份核实>业务章程><font style="color:#bf1919">客户资料</font>>客户签字>审核客户资料>附加设置>开卡完成',
				name : '客户资料审核页',
				id : '1006',
				labelWidth : 100,
				labelAlign : 'right',
				defaults : {
				},
				items : [{
					region : 'center',
					border : false,
					labelAlign : 'right',
					layout : 'form',
					style : 'background-color:#fff',
					items : [{
						layout : 'column',
						border : false,
						style : 'padding-top:40px;padding-bottom:150px',
						bodyStyle : 'padding-bottom:150px',
						buttonAlign : 'center',
						items : []
					}]
				}]
			}, 
			this.viewPanl2
			, {
				layout : 'border',
				border : false,
				title : '业务选择>身份核实>业务章程>客户资料>客户签字><font style="color:#bf1919">审核客户资料</font>>附加设置>开卡完成',
				name : '客户基础信息填单页',
				autoScroll : true,
				id : '1009',
				labelWidth : 100,
				labelAlign : 'right',
				items : []
			},{
				border : false,
				layout : 'border',
				title : '业务选择>身份核实>业务章程>客户资料>客户签字>审核客户资料><font style="color:#bf1919">附加设置</font>>开卡完成',
				name : '客户信息识别页',
				id : '1010',
				items : [{
					region : 'center',
					border : false,
					items : []
				}]
			}, {
				border : false,
				layout : 'border',
				id : '1011',
				title : '业务选择>身份核实>业务章程>客户资料>客户签字>审核客户资料><font style="color:#bf1919">附加设置</font>>开卡完成',
				name : '客户信息识别页',
				items : [{
					region : 'center',
					border : false,
					items : []
				}]
			}, {
				border : false,
				layout : 'border',
				autoScroll : true,
				id : '1012',
				title : '业务选择>身份核实>业务章程>客户资料>客户签字>审核客户资料>附加设置><font style="color:#bf1919">开卡完成</font>',
				name : '客户信息识别页',
				items : [{
					region : 'center',
					border : false,
					items : []
				}]
			}
			//====================== 二期开发新增的模块二js代码 ====================== 			TODO 二期开发新增的模块二js代码
			, {
				title : '业务选择>身份核实>业务章程><font style="color:#bf1919">客户资料</font>>客户签字>审核客户资料>附加设置>办理完成',
				layout : 'border',
				autoScroll : true,
				labelWidth : 100,
				labelAlign : 'right',
				border : false,
				id : '1013',
				name : '客户业务功能项',
				items : []
			}
			,{
				//--------------------------------------------- ↓ 理财风险评估问卷 TZLCbegin ↓ -------------------------------------------
				layout : 'border',
				autoScroll : true,
				labelWidth : 100,
				labelAlign : 'right',
				border : false,
				id : '1014',
				title : '业务选择>身份核实>业务章程><font style="color:#bf1919">评估问卷</font>>客户资料>客户签字>审核客户资料>附加设置>办理完成',
				name : 'TZLC',
				items : []
			}
//------------------------------------------------------ ↑ 评估问卷end ↑ -------------------------------------------------------------
			,{
				title : '业务选择>身份核实>业务章程><font style="color:#bf1919">客户资料</font>>客户签字>审核客户资料>附加设置>办理完成',
				layout : 'border',
				autoScroll : true,
				labelWidth : 100,
				labelAlign : 'right',
				border : false,
				id : '1015',
				name : '客户业务功能确认',
				region : 'center',
				items : []
			},{
				border : false,
				layout : 'border',
				id : '1016',
				title : '业务选择>身份核实>业务章程>客户资料><font style="color:#bf1919">关于密码</font>>客户签字>审核客户资料>附加设置>开卡完成',
				name : '验证密码页',
				items : [{
					region : 'center',
					border : false,
					items : []
				}]
			},{
				border : false,
				layout : 'border',
				id : '1017',
				title : '业务选择>身份核实>业务章程>客户资料><font style="color:#bf1919">关于密码</font>>客户签字>审核客户资料>附加设置>开卡完成',
				name : '客户信息密码识别页',
				items : [{
					region : 'center',
					border : false,
					items : []
				}]
			},{
				border : false,
				layout : 'border',
				id : '1018',
				title : '业务选择>身份核实>业务章程>客户资料>关于密码>客户签字>审核客户资料>附加设置><font style="color:#bf1919">业务办理完成</font>',
				name : '客户信息密码识别页',
				items : [{
					region : 'center',
					border : false,
					autoScroll : true,
					items : []
				}]
			},{
				border : false,
				layout : 'border',
				title : '业务选择>身份核实>业务章程>评估问卷><font style="color:#bf1919">评估结果</font>>客户签字>审核客户资料>附加设置>业务办理完成',
				name : '客户信息识别页',
				id : '1020',//
				buttonAlign : 'center',
				items : [{
					region : 'center',
					border : false,
					id : '102000',
					layout : 'form',
					autoScroll : true,
					items : []
				}]
			}
			,{
				border : false,
				layout : 'border',
				title : '业务选择>身份核实>业务章程>评估问卷><font style="color:#bf1919">评估结果</font>>客户签字>审核客户资料>附加设置>业务办理完成',
				name : '客户信息识别页',
				id : '1021',//
				buttonAlign : 'center',
				items : [{
					region : 'center',
					border : false,
					id : '102100',
					layout : 'form',
					autoScroll : true,
					items : []
				}]
			}
			,{
				border : false,
				layout : 'border',
				id : '1022',
				title : '业务选择>身份核实>业务章程>客户资料><font style="color:#bf1919">关于密码</font>>客户签字>审核客户资料>附加设置>开卡完成',
				name : '输入手机号页面',
				buttonAlign : 'center',
				items : [{
					region : 'center',
					border : false,
					items : []
				}]

			}
			
			,{
				border : false,
				layout : 'border',
				id : '1023',
				title : '业务选择>身份核实>读卡选择>><font style="color:#bf1919">填写资料</font>>客户签字>审核客户资料>关于密码>挂失完成',
				name : '挂失填写',
				buttonAlign : 'center',
				items : [],
				buttons : []
			}
//=====================================================================================================================
		]
		});// card end
		jsLog(logStrMsg("开始加载this.formPanel元素","INFO"));
		this.formPanel = new Ext.Panel({
			border : false,
			layout : 'border',
			id : 'customerFormPanelWin',
			autoScroll : true,
			items : [{
				layout : 'border',
				region : 'center',
				border : false,
				items : [{
					region : 'center',
					border : false,
					layout : 'border',
					items : [{
						xtype : 'tabpanel',
						activeTab : 0,// 激活第四个panel，柜台交易
						plain : true,
						region : 'center',
						region : 'center',
						bodyStyle : 'padding:5px;',
						autoScroll : true,
						items : [{
							title : '柜台交易',
							border : false,
							layout : 'fit',
							items : [{
								layout : 'border',
								border : false,
								items : [{
									region : 'center',
									layout : 'fit',
									items : [this.cardActionPanel]
								}]
							}]
						}]
					}]
				}]
			},{
				region : 'west',
				autoScroll : true,
				width : 330,
				split : true,
				items : [{
					title : '来电信息',
					collapsible : true,
					collapsed : false,
					border : false,
					layout : 'fit',
					height : 133,
					items : [{
						border : false,
						layout : 'form',
						labelWidth : 55,
						labelAlign : 'left',
						items : [{
							layout : 'form',
							labelAlign : 'right',
							border : false,
							items : [{
										xtype : 'displayfield',
										fieldLabel : '设备号',
										id : 'strTerminalNo',
										style : 'padding-top:1px',
										value : ''
									}, {
										xtype : 'displayfield',
										fieldLabel : '所属机构',
										style : 'padding-top:1px',
										id : 'strSiteID',
										value : ''
									}, {
										xtype : 'displayfield',
										fieldLabel : '来电时间',
										style : 'padding-top:1px',
										// anchor : '100%',
										id : 'call_date',
										value : ''
									}]
						}
						]
					}]
				},{
					title : '视频',
					collapsible : true,
					collapsed : false,
					border : false,
					items : [{
							border : true,
							id : 'video',
							//width : 300,
							height : 500,
							xtype : 'displayfield',
							html : ""
							// 头部视频
						}]
				},{
					title : '提示信息',
					collapsible : true,
					collapsed : false,
					border : false,
					items : []
					}]
			}]
		});
		// TODO 自动触发视频初始化连接操作。
		VtmAgentInit(TermID,SiteID+","+call_ipAddress);
		jsLog(logStrMsg("调用完Video所有接口并渲染完JS之后查看strCallMessage_1值 = "+strCallMessage_1,"INFO")); //记录日志
		//-------------------给设备号复制----------
		Regagentconn_1(strCallMessage_1);
		//—--------------------------------------
	},// end of the initcomponents

	createRs_contact : function(){
		var store = this.gridPanel_contact.getStore();
		var recordType = store.recordType;
		store.add(new recordType({})); // 添加一行空store
	},

	removeSelRs_contact : function(){
		$delGridRs({
					url : __ctxPath + '/customer/multiDelCusSpeEve.do',
					grid : Ext.getCmp('UlSpecialGrid_empl'),
					idName : 'eveId'
				});
		Ext.getCmp('UlSpecialGrid_empl').getStore().reload();
	},
	dial : function() {
		top.dial('18701575606');
	}

});
