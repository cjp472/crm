/**
 * 
 */
// a.style.display = 'block';
//b.style.display = 'none';
//缓存所有数据，用于打印和校验是否有空值。按照顺序映射
//1、姓名、身份证号、签发机关、交易结果。0,1,2,4
//var data = new Array(17);
//data[0] = "testname";
//data[1] = "1111111";
//data[2] = "bob";
//data[4] = "ok";
var data = ["testname","1111111","bob", "","ok","","","","","","","","","","","","",""];
var cus_name = "李奇";
var cus_cerno = "11111111";
var username = "测试1";//agent

//核查结果事件、审核照片缓存
var arrCheck = new Array(2);

function win_load(){
	document.forms[0].reset();
	$("input.base").attr("disabled", true);//控制基础域
	$(".agent").attr("disabled", true);
	
	$("input").css({clolr: "#ff0011"});
	
}

function getDealno(filePath){
	var node, min, max, cur;
	try{
		var fso = new ActiveXObject("Scripting.FileSystemObject"); 
		//node=node16&nodeip=192.168.10.16&device=ph-sip-1-node16&agent=5001&pwd=5001
		var f = fso.OpenTextFile(filePath, 1 , true);//只读
		var line;
		while (!f.AtEndOfStream){
			line = f.ReadLine();
			if(line.indexOf('node=')==0) {
				node = line.substring('node='.length,line.length);
			}if(line.indexOf('min=')==0) {
				min = line.substring('min='.length,line.length);
			}if(line.indexOf('max=')==0) {
				max = line.substring('max='.length,line.length);
			}if(line.indexOf('cur=')==0) {
				cur = line.substring('cur='.length,line.length);
			}
		}
		//alert(max +"|" + min + "|" + cur);
		
		if(parseInt(cur) < parseInt(max)){
			cur ++;
		} else {
			cur = min;
		}
		//alert(cur < max);
		if(!node || !min || !max || !cur ) {
			alert("流水号配置文件c:\\bobdealno.txt缺少数据！");
			return -1;
		}
		
		f.Close();
		
		var fh = fso.OpenTextFile(filePath, 2, true);//只读=1，只写=2 ，追加=8 等权限
		fh.WriteLine("node=" + node);
		fh.WriteLine("min=" + min);
		fh.WriteLine("max=" + max);
		fh.WriteLine("cur=" + cur);
		fh.Close();
		
	}catch(ex){
		alert("读取配置文件"+filePath+"失败!" + ex);
		return -1;
	}
	//alert("current dealno is:" + cur);
	return cur;
}
function getNull(src, len, str) {
	//str = getByteLen(src);
	var tmp = "";
	//alert(src + ":length:" + str);
	for ( var a = 0; a < len - src.length; a++) {
		tmp += str;

	}
	return tmp + src;
}
function checkFunc(){
	
	var ret = myocx.BankIDCardVeryfication("00301",getNull(getDealno("c:\\checkidcard.txt") + "", 6, "0"),
			"3v4","0000",cus_name, cus_cerno);
	
	if(ret == "ERROR"){
		alert("ERROR");
	} else {
		parseXmlFunc(ret);
	}
	
}
function parseXml(xml){
	
}
function parseXmlFunc(xml) {
//	<RETCODE>90000</RETCODE><RETMSG>正常返回报文</RETMSG>
//	<OUT><RESULT>00</RESULT><JYLSH>20121107000008003802</JYLSH>
//	<ISSUEOFFICE>中国北京</ISSUEOFFICE><NAME>测试姓名</NAME>
//	<ID>110221465678952223</ID><PHOTO>D:\00.jpg</PHOTO></OUT>
var test;
//	test = "<RETCODE>90000</RETCODE><RETMSG>正常返回报文</RETMSG>"
//			+ "<OUT><RESULT>00</RESULT><JYLSH>20121107000008003802</JYLSH>"
//			+ "<ISSUEOFFICE>中国北京</ISSUEOFFICE><NAME>测试姓名</NAME>"
//			+ "<ID>110221465678952223</ID><PHOTO>D:\\160.png</PHOTO></OUT>";
	test = xml; 
	test = test.split("<RESULT>")[1].split("</RESULT>");
	$("input[name=check_deal]").attr("value", test[0]);
	test = test[1].split("<ISSUEOFFICE>")[1].split("</ISSUEOFFICE>");
	$("input[name=check_jiguan]").attr("value", test[0]);
	test = test[1].split("<NAME>")[1].split("</NAME>");
	$("input[name=check_name]").attr("value", test[0]);
	cus_name = test[0];
	test = test[1].split("<ID>")[1].split("</ID>");
	$("input[name=check_cerno]").attr("value", test[0]);
	cus_cerno = test[0];
	test = test[1].split("<PHOTO>")[1].split("</PHOTO>");
	$("img[name=check_pic]").attr("src", test[0]);
}
function checkret(value){
	data[3] = value;
	arrCheck[0] = value;
	checkAll();
}
function checkpic(value){
	data[5] = value;
	arrCheck[1] = value;
	checkAll();
}
function checkAll(){
	if(arrCheck[0] == "00" && arrCheck[1] == "2"){
//		others.style.display = 'block';
//		bottoms.style.display = 'block';
		//$("#check_huji").attr("disabled", false);
		try{
//			$("#check_huji select option").attr("disabled", "");
			$("#check_huji").attr("disabled","");
			$("#check_phone").attr("disabled","");
			$("#check_mobile").attr("disabled","");
			$("#check_circs").attr("disabled","");
		}catch(e){
			alert(e);
		}
		
	} else {
		//others.style.display = 'none';
		//huji.style.display = 'none';
		//bottoms.style.display = 'none';
		$(".agent").attr("disabled", true);
	}
}
function checkhuji(value){
	data[6] = value;
	alert(value);
	if(value == "5"){
		$("input[name=check_province]").attr("disabled", "");
		$("input[name=check_city]").attr("disabled", "");
		$("#check_province").focus();
	} else if(value == ""){
		alert("户籍必输！");
	} else {
		$("#check_phone").focus();
		$("input[name=check_province]").attr("disabled", true);
		$("input[name=check_city]").attr("disabled", true);
	}
}

function saveData(value, index){
	data[index] = value;
}

function checkphone(value, id){
	try{
		if(value == "" && (document.getElementById(id).value) == ""){
			alert("联系电话和手机不能同时为空!");
		}
	} catch(e){
		alert(e);
	}
	
}
function checkphoneAny(){
	return $("#check_phone").attr("value") != "" || $("#check_mobile").attr("value") != "";
}
function checkcircs(value){
	data[11] = value;
	if(data[6] == "5" && $("#check_province").attr("value") == "" ){
		alert("户籍为其他时，省不能为空!");
		$("#check_province").focus();
	} else if(data[6] == "5" && $("#check_city").attr("value") == ""){
		alert("户籍为其他时，市不能为空!");
		$("#check_province").focus();
	}  else if(checkphoneAny()){
		if(value == "2"){
			$("#check_zuoz").attr("disabled", "");
			$("#check_other").attr("disabled", true);
			$("#check_giveup").attr("disabled", true);
			$("#check_real").attr("disabled", true);
			$("#check_police").attr("disabled", true);
			$("#check_zuoz").focus();
		} else if(value == "5"){
			$("#check_zuoz").attr("disabled", true);
			$("#check_other").attr("disabled", "");
			$("#check_giveup").attr("disabled", true);
			$("#check_real").attr("disabled", true);
			$("#check_police").attr("disabled", true);
			$("#check_other").focus();
		} else if(value == "0" || value == "1" || value == "4"){
			$("#check_zuoz").attr("disabled", true);
			$("#check_other").attr("disabled", true);
			$("#check_giveup").attr("disabled", true);
			$("#check_real").attr("disabled", true);
			$("#check_police").attr("disabled", true);
		} else if(value == "3"){
			$("#check_zuoz").attr("disabled", true);
			$("#check_other").attr("disabled", true);
			$("#check_giveup").attr("disabled", "");
			$("#check_real").attr("disabled", "");
			$("#check_police").attr("disabled", "");
		}
	} else {
		alert("联系电话和手机不能同时为空!");
		$("#check_phone").focus();
	} 
	
	
	
}
function checkNull(id){
	if($(("#" + id ).toString()).attr("value") == ""){
		$(("#" + id ).toString()).focus();
	}
}

function selected(){//需要查找jquery中过滤select选中的方法。
	if(data[3] == "00"){
		return "公民身份号码与姓名一致，且存在照片";
	} else if(data[3] == "01"){
		return "公民身份号码与姓名一致，但不存在照片";
	} else if(data[3] == "02"){
		return "公民身份号码存在，但与姓名不匹配";
	} else if(data[3] == "03"){
		return "公民身份号码不存在";
	} else if(data[3] == "04"){
		return "其他错误";
	} else if(data[3] == "05"){
		return "输入的参数错误";
	}
}

function makePrintFile(){
	var dealno = "T00120120101";//终端传入的本次业务流水号
	var filepath = "c:\\" + dealno + "checkRetFile.txt";
	var txt = "\n\n\n\n\n\n\n" +
			"\n				业务名称：		单笔核对交易结果" +
			"\n				核对人姓名： 	" + data[0] +
			"\n				身份证号：		" + data[1]	+
			"\n				核对结果：		" + selected()	+
			"\n\n" +
			"\n		网点号：00501		操作员：608	日期：" + new Date().format('yyyyMMdd') + "	时间" + new Date().format('hhmmss');
	alert(txt);
	try{
		var fso = new ActiveXObject("Scripting.FileSystemObject"); 
		var fh = fso.OpenTextFile(filepath, 2, true);//只读=1，只写=2 ，追加=8 等权限
		fh.WriteLine("\n\n\n\n\n\n\n");
		fh.WriteLine("\n	业务名称：	单笔核对交易结果");
		fh.WriteLine("\n	核对人姓名：	" + data[0]);
		fh.WriteLine("\n	身份证号：	" + data[1]);
		fh.WriteLine("\n	核对结果：	" + selected());
		fh.WriteLine("\n\n\n    网点号：00501    操作员：608    日期：" + new Date().format('yyyyMMdd') + "    时间：" + new Date().format('hhmmss'));
		
		fh.Close();
	} catch (e){
		alert(e);
	}
	
}

function showPage(){
	makePrintFile();
	//alert($("#check_circs").attr("value"));
//	$("#check_zuoz").attr("disabled", true);
//	$("#check_other").attr("disabled", true);
//	$("#check_giveup").attr("disabled", "");
//	$("#check_real").attr("disabled", "");
//	$("#check_police").attr("disabled", "");
//	alert(data[12]);
//	var ret = "";
//	for(var a in data){
//		ret += "--" + a;
//	}
//	alert(ret);
//	ret = "";
//	for(var a=0; a<data.length; a++){
//		ret += "--" + data[a];
//	}
//	alert(ret);
}