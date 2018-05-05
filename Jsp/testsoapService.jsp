<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<%@page import="com.ulane.core.plugin.soap.impl.NcSoapServerImpl"%>
<%@page import="com.ulane.core.plugin.soap.impl.ConHisSoapServerImpl"%>
<%@page import="com.ulane.core.plugin.soap.impl.BlackWListSoapServerImpl"%>
<%@page import="com.ulane.core.plugin.soap.impl.CustomerSoapServerImpl"%>
<%@page import="com.ulane.customer.dao.customer.CusPersonalDao"%>
<%@page import="com.ulane.customer.dao.customer.impl.CusPersonalDaoImpl"%>
<%@page import="com.ulane.core.plugin.soap.impl.ServiceRequestSoapServerImpl"%>
<%@page import="com.ulane.customer.model.customer.CusPersonal"%>
<%@page import="java.util.List"%>
<%@page import="java.util.ArrayList"%>
<%@page import="com.htsoft.core.util.StringUtil"%>
<%@page import="com.htsoft.core.util.AppUtil"%>
<%@page import="com.ulane.core.plugin.soap.impl.GongDanSoapServerImpl"%>
<%@page import="com.ulane.core.plugin.soap.impl.DingDanSoapServerImpl"%>
<%@page import="com.ulane.core.plugin.soap.impl.ChanPinSoapServerImpl"%>

<%@page import="com.htsoft.core.util.AppUtil"%>
<%@page import="com.htsoft.core.util.ContextUtil"%>
<%
String basePath=request.getContextPath();
//登录成功后，需要把该用户显示至在线用户
%>
<script type="text/javascript" src="<%=basePath%>/ext3/adapter/ext/ext-base.gzjs"></script>
<script type="text/javascript" src="<%=basePath%>/ext3/ext-all.gzjs"></script>
<script type="text/javascript" src="<%=basePath%>/ext3/ext-basex.js"></script>
<script type="text/javascript" src="<%=basePath%>/ext3/ext-lang-zh_CN.js"></script>
<!--使用iframe加载的依赖JS  -->
<script type="text/javascript" src="<%=basePath%>/ext3/miframe-debug.js"></script>
<div class="contentDiv">

<%
//	NcSoapServerImpl nssi=new NcSoapServerImpl();
//	BlackWListSoapServerImpl bwlssi = new BlackWListSoapServerImpl();
//	String result = bwlssi.blackList("1");
//	String result = bwlssi.whiteList("1");
//	String result = nssi.yeWuFeiLv("test");
//临时注释  KYQ
ConHisSoapServerImpl chssi = new ConHisSoapServerImpl();
//	String result1 = chssi.list("");
//临时注释  KYQ
//	String result = chssi.list("{success:true,'start':1,'limit':5,'Q_customer.customerId_L_EQ':10020}");
//	BlackWListSoapServerImpl bwlssi = new BlackWListSoapServerImpl();
//  添加联络历史
//	StringBuffer str1 = new StringBuffer("{'statusId':1,'dirId': 1,'busTypId':2,'class':'com.ulane.customer.model.customer.ConHis','conResId':null,'conResRemarks':'渠道','contactTypeId':1,'content':null,'cusLinkman':null}");
//  修改联络历史并添加联络文件
  	StringBuffer str2 = new StringBuffer("{'conAttachs':[{'conHis':{'conHisId':10429},'fileType':1,'fileSource':1,'filePath':'d:/log/','cusName':'张三','credNum':'410009982818128221'}],'conHisId': 10429,'statusId':1,'dirId': 1,'busTypId':2,'class':'com.ulane.customer.model.customer.ConHis','conResId':null,'conResRemarks':'渠道','contactTypeId':1,'content':null,'cusLinkman':null}");
//	String result = chssi.updateConHis(str2.toString());
//  添加放弃的请求
//	StringBuffer str3 = new StringBuffer("{'origAni':'18801575605','origDnis':'95556','enterTime':'2012-6-1 9:00:01','endTime':'2012-6-1 9:04:01','endReason':1,'vdn':'114001','dur':30,'synTime':'2012-06-01 12:00:00','dealStaId':1}");
//  修改放弃的请求
//  StringBuffer str4 = new StringBuffer("{'conId':21,'origAni':'18801575605','origDnis':'95556','enterTime':'2012-6-1 9:00:01','endTime':'2012-6-1 9:04:01','endReason':1,'vdn':'114001','dur':30,'synTime':'2012-06-01 12:00:00','dealStaId':1}");
//	chssi.createConHuXun(str3.toString());
//  修改未处理的请求
//	StringBuffer str5 = new StringBuffer("{'conId':5,'srcTypeId':1,'dirId':3,'contactTypeId':1,'mainContactNum':'www.sina.com.cn','content':'xuyaoxinxineirong','creTime':'2012-6-1 9:00:01','synTime':'2012-06-01 12:00:00','dealStaId':1}");
//	添加未处理的请求
//	StringBuffer str6 = new StringBuffer("{'srcTypeId':1,'dirId':1,'contactTypeId':1,'mainContactNum':'www.bleachcn.net','content':'xuyaoxinxineirong','creTime':'2012-6-1 9:00:01','synTime':'2012-06-01 12:00:00','dealStaId':1}");
//	chssi.createConWeiChuLi(str5.toString());
//  添加拦截记录
//	StringBuffer str7 = new StringBuffer("{'srcTypeId':1,'dirId':1,'contactTypeId':1,'mainContactNum':'LanJie北京市海淀区花园路999号','interceptTime':'2012-6-1 9:00:00','interceptReason':1,'synTime':'2012-6-1 12:00:00','isMove':0}");
//  修改拦截记录
//	StringBuffer str8 = new StringBuffer("{'conId':3,'srcTypeId':1,'dirId':1,'contactTypeId':1,'mainContactNum':'北京市海淀区花园路999号','content':'xuyaoxinxineirong','interceptTime':'2012-6-1 9:00:00','interceptReason':1,'synTime':'2012-6-1 12:00:00','isMove':0}");
//	chssi.createConLanJie(str7.toString());
	/**
	 * 根据id获得联络记录
	 * 
	 */
//	String result = chssi.queryById("102");
	/**
	 * 多id获得联络记录
	 */
//	String result = chssi.queryByMultId("102,1,2");
	/**
	 * 测试根据电话号码测试黑名单
	 * @return true or false
	 */
//	String result = bwlssi.checkBwByContact("18701575605");
	/**
	 * 测试根据电话号码测试白名单
	 * @return true or false
	 */
//	String result = bwlssi.checkWwByContact("");
/*	CustomerSoapServerImpl cssi = new CustomerSoapServerImpl();
*/	
	
	//最终的json格式
/*	String json3 = "{'birthday':'2012-02-01 9:00:00','class':'com.ulane.customer.model.customer.CusPersonal','credNum':'412778172387238871','credTypId':1,'customerNo':'PER0101118111','gender':'1','nameCn':'郭沈厅'}";
*/	//添加客户
//	String result = cssi.addSingleCustomer(json3);
	
	/*String credNum = "412778172387238871";
	String phone = "12800002222";*/
//	根据联系方式查询
//	String result = cssi.checkByCallNo(phone);
//	根据身份证号查询
//	String result = cssi.checkByCardNo(credNum);
//  添加操作历史记录
//	String result = cssi.addCusHis("{'customer':{'customerId':10162},'opeUseId':1,'opeTypId':1,'opeResDesc':'对外呼产品进行销售'}");
//	根据身份证号和手机号查询
//	String result = cssi.checkByCardAndCallNo("412778172387238871,13899999999");
//  根据客户id查询客户
//	String result = cssi.queryByCustomerId("10124");
//	返回结果如下
//  {"accountsNo":null,"address":null,"birthday":"2012-06-01 00:00:00","busiCode":"YWBM1206290002","city":null,"companyScale":null,"country":100,"creDat":"2012-06-29 11:11:08","creUseId":1,"credDurDat":"2012-06-30 00:00:00","credNum":"9327866567231","credTypId":7,"currencyUnit":null,"cusCatId":1,"cusEduId":5,"cusFromId":1,"cusGraId":2,"cusTitId":1,"cusTraId":34,"customerId":10124,"customerManager":null,"customerName":"李小四","customerNo":"PER12062900001","customerSource":null,"customerType":null,"email":null,"ext1":null,"ext10":null,"ext11":null,"ext12":null,"ext13":null,"ext14":null,"ext15":null,"ext16":null,"ext17":null,"ext18":null,"ext19":null,"ext2":null,"ext20":null,"ext3":null,"ext4":null,"ext5":null,"ext6":null,"ext7":null,"ext8":null,"ext9":null,"fax":null,"gender":"男","hasChecked":1,"hasMarried":1,"haveChild":1,"industryType":null,"jobTypId":12,"nameAli":"小四","nameCn":"李小四","nameEn":"lisi","notes":null,"openBank":null,"otherDesc":null,"phone":null,"principal":null,"regionId":10,"registerFun":null,"remark":null,"rights":null,"salaryId":20000,"site":null,"staId":1,"state":null,"taxNo":null,"turnOver":null,"updDat":"2012-06-29 11:16:14","updUseId":1,"workCompany":"北京","zip":null} 
//  根据客户id查询联系方式
	//String result = cssi.queryContactByCusId("10367");
/*	ServiceRequestSoapServerImpl srssi = new ServiceRequestSoapServerImpl();
*///  添加服务请求
//	String result = srssi.addConServiceRequest("{'content': '测试生成服务请求','busType':1,'creUseId':1,'creDat':'2012-06-29 11:11:08'}");
//  联系方式json串	注意customerId这个是；分号来区分，用来存联系方式时进行关连
//	String json = "{'customerId':10425='cusContact':'','contactTypeId':1,'mainContactNum':'88992001','statusId':1}";
//	String result = cssi.addCusContact(json);
//	GongDanSoapServerImpl gdssi = new GongDanSoapServerImpl();
//	String gongdanResult = gdssi.addGongDan("{'creUseId': 1,'tarTopic': 1,'tarContent':'中国','remark':null,'creDat':'2012-02-01 9:00:00','updUseId':1,'updDat':null,'staId':1}");
//	String conServiceRequest = srssi.listConServiceRequest("{'customer':['customerId':10020],'class':'com.ulane.customer.model.customer.ConServiceRequest'}");

	/*	String conServiceRequest = srssi.listConServiceRequestByCusId("10020");
*/

	/**
	  * 工单测试 KYQ
	  */
 	GongDanSoapServerImpl gdssi = new GongDanSoapServerImpl();
//	String  jsongd ="{'orderType': '1','customerName': '段三','customerGender': '2','customerNo': '090999999','contacta': '110','contactb': '112','orderSorce': '1','order': '1','orderProject': '2','level': '1','responseTime': '2012-8-14 15:00:00','completionTime': '2012-8-14 15:21:06','content': '天气太热','noteAppeal': '吃冰棍','detailType':'0','detailId':'1','orderTime':'2012-8-14 15:21:06'}";
	//添加appuser
//	String  jsongd ="{'orderType': '1','customerName': '段三','customerGender': '2','customerNo': '090999999','contacta': '110','contactb': '112','orderSorce': '1','order': '1','orderProject': '2','level': '1','responseTime': '2012-8-14 15:00:00','completionTime': '2012-8-14 15:21:06','content': '天气太热','noteAppeal': '吃冰棍','detailType':'0','detailId':'1','orderTime':'2012-8-14 15:21:06','appUser':{'employeeid':'80096958'}}";
	//添加Region
//String  jsongd ="{'orderType': '1','customerName': '段三','customerGender': '2','customerNo': '090999999','contacta': '110','contactb': '112','orderSorce': '1','order': '1','orderProject': '2','level': '1','responseTime': '2012-8-14 15:00:00','completionTime': '2012-8-14 15:21:06','content': '天气太热','noteAppeal': '吃冰棍','detailType':'0','detailId':'1','orderTime':'2012-8-14 15:21:06','appUser':{'employeeid':'80096958'},'region':{'areaNo':'10010002'}}";
	//添加UlDepartment
//String  jsongd ="{'orderType': '1','customerName': '段三','customerGender': '2','customerNo': '090999999','contacta': '110','contactb': '112','orderSorce': '1','order': '1','orderProject': '2','level': '1','responseTime': '2012-8-14 15:00:00','completionTime': '2012-8-14 15:21:06','content': '天气太热','noteAppeal': '吃冰棍','detailType':'0','detailId':'1','orderTime':'2012-8-14 15:21:06','appUser':{'employeeid':'80096958'},'region':{'areaNo':'10010002'},'ulDepartment':{'depNo':'10086000'}}";
	//修改 appuser + UlDepartment + Region 为(appUserNo、regionNo、ulDepartmentNo)外加orderNum、customerGrade
//	String  jsongd ="{'orderNum': '01','orderType': '2','customerName': '段三','customerGender': '1','customerGrade': '2','customerNo': '090999999','contacta': '110','contactb': '112','orderSorce': '12858','order': '12810','orderProject': '12765','level': '12840','responseTime': '2012-9-12 15:00:00','completionTime': '2012-9-12 15:21:06','content': '天气太热','noteAppeal': '吃冰棍','detailType': '0','detailId': '1','orderTime': '2012-9-12 16:20:00','appUserNo': '80096958','regionNo': '230000','ulDepartmentNo': '10086000'}";

/**
	  * 订单测试 KYQ
	  */
//	DingDanSoapServerImpl ddssi = new DingDanSoapServerImpl();
//SC_销售业务单
//	String  jsondd ="{'createUserId':'1','createTime':'2012-8-22 14:44:00'}";
//	SC_销售业务单 + SC_业务单费用
//	String  jsondd ="{'createUserId':'1','createTime':'2012-8-22 14:44:00','scBizOrderFees':[{'feeFlag':'1','changedAmount':'1','changedTime':'2012-8-22 17:00:00'},{'feeFlag':'2','changedAmount':'2','changedTime':'2012-8-22 18:00:00'}]}";
//	SC_销售业务单 + SC_业务单费用 +	SC_销售业务单明细
//	String  jsondd ="{'createUserId':'1','createTime':'2012-8-22 14:44:00','scBizOrderFees':[{'feeFlag':'1','changedAmount':'1','changedTime':'2012-8-22 17:00:00'},{'feeFlag':'2','changedAmount':'2','changedTime':'2012-8-22 18:00:00'}],'scBizSalesDetails':[{'goodsUnitPrice':'110.00'},{'goodsUnitPrice':'111.00'}]}";
//	SC_销售业务单 + SC_业务单费用 +	SC_销售业务单明细 + CUS配送地址
//	String  jsondd ="{'createUserId':'1','createTime':'2012-8-22 15:41:00','scBizOrderFees':[{'feeFlag':'1','changedAmount':'1','changedTime':'2012-8-22 15:41:00'},{'feeFlag':'2','changedAmount':'2','changedTime':'2012-8-22 15:41:00'}],'scBizSalesDetails':[{'goodsUnitPrice':'113.00'},{'goodsUnitPrice':'114.00'}],'cusDelivery':{'creUseId':'1','creDat':'2012-8-22 15:41:06'}}";

	/**
	 * 产品测试 KYQ
	 */
//	ChanPinSoapServerImpl cpssi = new ChanPinSoapServerImpl();
//商品
//	String  jsoncp ="{'isLocked':1,'productModelFlag':1,'goodsType':1,'salesWay':1,'distribution':0821,'integral':10,'integralType':1}";	
//商品+商品分组数据
//	String  jsoncp ="{'isLocked':1,'productModelFlag':1,'goodsType':1,'salesWay':1,'distribution':0820,'integral':10,'integralType':1,'scProductComs':[{'productId':{'goodsId':'3'},'comboGoodsId':{'goodsId':'3'},'procomCount':4.0000},{'productId':{'goodsId':'3'},'comboGoodsId':{'goodsId':'3'},'procomCount':5.0000}]}";
//商品+商品价目
//	String  jsoncp ="{'isLocked':1,'productModelFlag':1,'goodsType':1,'salesWay':1,'distribution':0821,'integral':10,'integralType':1,'scGoodsPrice':{'purchasePrice':1.00,'reportPrice':50.00,'retailPrice':10.00,'wholesalePrice':1.00,'defaultSubsidyAmount':1.00}}";
//商品+产品分类
//String  jsoncp ="{'isLocked':'1','productModelFlag':'1','goodsType':'1','salesWay':'1','distribution':'0821','integral':'10','integralType':'1','scProductClassify':{'productClassifyName':'圣代','productClassifyDispCode':'shengdai','productModelFlag':'22'}}";	
//商品+商品价目+产品分类
//String  jsoncp ="{'isLocked':'1','productModelFlag':'1','goodsType':'1','salesWay':'1','distribution':'0821','integral':'10','integralType':'1','scGoodsPrice':{'purchasePrice':'1.00','reportPrice':'50.00','retailPrice':'10.00','wholesalePrice':'1.00','defaultSubsidyAmount':'1.00'},'scProductClassify':{'productClassifyName':'圣代','productClassifyDispCode':'shengdai','productModelFlag':'22'}}";	
//商品+商品价目+产品分类+商品附件
//加createtime	
//	String  jsoncp ="{'isLocked':'1','productModelFlag':'1','goodsType':'1','salesWay':'1','distribution':'0821','integral':'10','integralType':'1','scGoodsPrice':{'purchasePrice':'1.00','reportPrice':'50.00','retailPrice':'10.00','wholesalePrice':'1.00','defaultSubsidyAmount':'1.00'},'scProductClassify':{'productClassifyName':'圣代','productClassifyDispCode':'shengdai','productModelFlag':'22'},'fileAttachs':[{'fileName':'精通EXT88','filePath':'/xitong/ulBbsHuati/201206/adbae0db742a4e39a3937c0be7c2d815.bmp','createtime':'2012-8-21 17:00:00','Ext':'bmp','fileType':'Other','Note':'108.50 KB','creator':'姚旭3','totalBytes':'777777','delFlag':'0','appUser':{'userId':'1'}},{'fileName':'精通EXT8','filePath':'/201208/53c462327fa34fe789590b3d175e4a69.doc','createtime':'2012-8-21 17:00:00','Ext':'doc','fileType':'/xitong/ulBbsHuati','Note':'787.55 KB','creator':'超级管理员(姚旭)','totalBytes':'888888','delFlag':'0','appUser':{'userId':'1'}}]}";// 测试添加单个客户
//	String  jsoncp ="{'isLocked':'1','goodsName':'张益达','productModelFlag':'1','goodsType':'1','salesWay':'1','distribution':'0821','integral':'10','integralType':'1','scGoodsPrice':{'purchasePrice':'1.00','reportPrice':'50.00','retailPrice':'10.00','wholesalePrice':'1.00','defaultSubsidyAmount':'1.00'},'scProductClassify':{'productClassifyDispCode':'shengdai'},'fileAttachs':[{'fileId':'10800','fileName':'精通EXT2222222','filePath':'/xitong/ulBbsHuati/201206/adbae0db742a4e39a3937c0be7c2d815.bmp','Ext':'bmp','fileType':'Other','Note':'108.50 KB','creator':'姚旭3','totalBytes':'111104','delFlag':'0','appUser':{'userId':'1'}},{'fileId':'10801','fileName':'精通EXT145673','filePath':'/201208/53c462327fa34fe789590b3d175e4a69.doc','Ext':'doc','fileType':'/xitong/ulBbsHuati','Note':'787.55 KB','creator':'超级管理员(姚旭)','totalBytes':'806454','delFlag':'0','appUser':{'userId':'1'}}]}";
//多条数据 未写完
//String  jsoncp ="[{'isLocked':'1','goodsName':'张益达','productModelFlag':'1','goodsType':'1','salesWay':'1','distribution':'0821','integral':'10','integralType':'1','scGoodsPrice':{'purchasePrice':'1.00','reportPrice':'50.00','retailPrice':'10.00','wholesalePrice':'1.00','defaultSubsidyAmount':'1.00'},'scProductClassify':{'productClassifyDispCode':'shengdai'},'fileAttachs':[{'fileId':'10800','fileName':'精通EXT2222222','filePath':'/xitong/ulBbsHuati/201206/adbae0db742a4e39a3937c0be7c2d815.bmp','Ext':'bmp','fileType':'Other','Note':'108.50 KB','creator':'姚旭3','totalBytes':'111104','delFlag':'0','appUser':{'userId':'1'}},{'fileId':'10801','fileName':'精通EXT145673','filePath':'/201208/53c462327fa34fe789590b3d175e4a69.doc','Ext':'doc','fileType':'/xitong/ulBbsHuati','Note':'787.55 KB','creator':'超级管理员(姚旭)','totalBytes':'806454','delFlag':'0','appUser':{'userId':'1'}}]},{'isLocked':'2','goodsName':'张益达','productModelFlag':'1','goodsType':'1','salesWay':'1','distribution':'0821','integral':'10','integralType':'1','scGoodsPrice':{'purchasePrice':'1.00','reportPrice':'50.00','retailPrice':'10.00','wholesalePrice':'1.00','defaultSubsidyAmount':'1.00'},'scProductClassify':{'productClassifyDispCode':'shengdai'},'fileAttachs':[{'fileId':'10800','fileName':'精通EXT2222222','filePath':'/xitong/ulBbsHuati/201206/adbae0db742a4e39a3937c0be7c2d815.bmp','Ext':'bmp','fileType':'Other','Note':'108.50 KB','creator':'姚旭3','totalBytes':'111104','delFlag':'0','appUser':{'userId':'1'}},{'fileId':'10801','fileName':'精通EXT145673','filePath':'/201208/53c462327fa34fe789590b3d175e4a69.doc','Ext':'doc','fileType':'/xitong/ulBbsHuati','Note':'787.55 KB','creator':'超级管理员(姚旭)','totalBytes':'806454','delFlag':'0','appUser':{'userId':'1'}}]}]";
//String  jsoncp ="{'isLocked':'1','goodsName':'张益达','productModelFlag':'1','goodsType':'1','salesWay':'1','distribution':'0821','integral':'10','integralType':'1','scGoodsPrice':{'purchasePrice':'1.00','reportPrice':'50.00','retailPrice':'10.00','wholesalePrice':'1.00','defaultSubsidyAmount':'1.00'},'scProductClassify':{'productClassifyDispCode':'shengdai'},'fileAttachs':[{'fileId':'10800','fileName':'精通EXT2222222','filePath':'/xitong/ulBbsHuati/201206/adbae0db742a4e39a3937c0be7c2d815.bmp','Ext':'bmp','fileType':'Other','Note':'108.50 KB','creator':'姚旭3','totalBytes':'111104','delFlag':'0','appUser':{'userId':'1'}},{'fileId':'10801','fileName':'精通EXT145673','filePath':'/201208/53c462327fa34fe789590b3d175e4a69.doc','Ext':'doc','fileType':'/xitong/ulBbsHuati','Note':'787.55 KB','creator':'超级管理员(姚旭)','totalBytes':'806454','delFlag':'0','appUser':{'userId':'1'}}]},{'isLocked':'2','goodsName':'张益达','productModelFlag':'1','goodsType':'1','salesWay':'1','distribution':'0821','integral':'10','integralType':'1','scGoodsPrice':{'purchasePrice':'1.00','reportPrice':'50.00','retailPrice':'10.00','wholesalePrice':'1.00','defaultSubsidyAmount':'1.00'},'scProductClassify':{'productClassifyDispCode':'shengdai'},'fileAttachs':[{'fileId':'10800','fileName':'精通EXT2222222','filePath':'/xitong/ulBbsHuati/201206/adbae0db742a4e39a3937c0be7c2d815.bmp','Ext':'bmp','fileType':'Other','Note':'108.50 KB','creator':'姚旭3','totalBytes':'111104','delFlag':'0','appUser':{'userId':'1'}},{'fileId':'10801','fileName':'精通EXT145673','filePath':'/201208/53c462327fa34fe789590b3d175e4a69.doc','Ext':'doc','fileType':'/xitong/ulBbsHuati','Note':'787.55 KB','creator':'超级管理员(姚旭)','totalBytes':'806454','delFlag':'0','appUser':{'userId':'1'}}]}";

//String  jsoncp ="[{'isLocked':'1','goodsName':'张益达','productModelFlag':'1','goodsType':'1','salesWay':'1','distribution':'0823','integral':'10','integralType':'1'},{'isLocked':'2','goodsName':'张益达','productModelFlag':'1','goodsType':'1','salesWay':'1','distribution':'0823','integral':'10','integralType':'1'}]";
//KYQ
//	String csr = gdssi.addGongDan(jsongd);
//	String csr = cpssi.addChanPin(jsoncp);
//String csr = ddssi.addDingDan(jsondd);


//	String conServiceRequest = srssi.listConServiceRequestByCusId("10020");


%>
<script type="text/javascript" >
	function start(){
		Ext.Ajax.request( {
			url : '/Develop/customer/updateHisAndFileConHis.do',
			method : 'post',
			params : {
				conId : '4233',
				fileType : '1',
				fileSource : '1',
				filePath : 'd:/log/find.jpg',
				createBy : 't0001',
				cusName : '张弓',
				credNum : '4100092983828192'
			},
			success : function(response, options) {
				var resResult = Ext.util.JSON.decode(response.responseText);
				alert('success');
			},
			failure : function(response, options) {
				
			}
		});
	}
</script>
<h2>返回结果是：</h2>
<input name="startButton" value="开始" type="button" onclick="javascript:start();" />
<!--%=result %-->
<script type="text/javascript" >
function start(){
	Ext.Ajax.request( {
		url : __ctxPath+ '/customer/updateHisAndFileConHis.do',
		method : 'post',
		params : {
			conHisId : '11574',
			fileType : '1',
			fileSource : '1',
			filePath : 'd:/log/find.jpg',
			createBy : 't0001',
			cusName : '张弓',
			credNum : '4100092983828192',
			serialNum : '100000021'
		},
		success : function(response, options) {
			var resResult = Ext.util.JSON.decode(response.responseText);
//			alert('success');
		},
		failure : function(response, options) {
			
		}
	});
}
</script>
<input name="startButton" value="开始" type="button" onclick="javascript:start();" />

</div>
