<%@page import="com.htsoft.oa.service.system.AppUserService"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="security" uri="http://www.springframework.org/security/tags"%>
<%@taglib prefix="s" uri="/struts-tags"%>
<%@taglib uri= "http://java.sun.com/jsp/jstl/core" prefix= "c" %>
<%@page import="com.htsoft.core.util.AppUtil"%>
<%@page import="com.htsoft.core.util.ContextUtil"%>
<%
	String basePath=request.getContextPath();
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta http-equiv="msthemecompatible" content="no">
		<title><%=AppUtil.getCompanyName()%>－－<s:property value="%{getText('login.jsp.system.name')}"/></title>
		<link rel="stylesheet" type="text/css" href="<%=basePath%>/ext3/resources/css/ext-all-notheme.css" />
		<link rel="stylesheet" type="text/css" href="<%=basePath%>/ext3/resources/css/ext-patch.css" />
		<link rel="stylesheet" type="text/css" href="<%=basePath%>/ext3/ux/css/Portal.css" />
		<link rel="stylesheet" type="text/css" href="<%=basePath%>/ext3/ux/css/Ext.ux.UploadDialog.css" />
		<link rel="stylesheet" type="text/css" href="<%=basePath%>/css/admin.css"/>
		<link rel="stylesheet" type="text/css" href="<%=basePath%>/ext3/ux/css/ux-all.css"/>
		<link rel="stylesheet" type="text/css" href="<%=basePath%>/ext3/ux/caltask/calendar.css" />
    <!-- 首页样式加载 -->
    <link href="<%=basePath%>/css/desktop.css" rel="stylesheet" type="text/css" />
		<script>
			function $(id)      {return document.getElementById(id);}
			function $value(id) {try{return document.getElementById(id).value;}catch(e){return "";}}
			function $p(id)     {try{return parent.document.getElementById(id);}catch(e){return null;}}
			function $pvalue(id){try{return parent.document.getElementById(id).value;}catch(e){return "";}}
		</script>    
	</head>
	<body style="background-image:url(../../images/spbg.jpg);" onload="UIforInit();">
	 				<!--软电话条start-->
					<div class="floatright cursorhand" style="margin-left:10px;display:none">
						<div><img id="img_sms" src="./spimg/UN_sms_enable.png"/></div>
						<div id="div_sms" style="margin-top:2px">短信</div>
					</div>
					<div class="floatright cursorhand" style="margin-left:10px;display:none">
						<div><img id="img_fax" src="./spimg/UN_fax_enable.png"/></div>
						<div id="div_fax"  style="margin-top:2px">传真</div>
					</div>
					<div class="floatright cursorhand" style="margin-left:10px">
						<div><img id="img_email" src="./spimg/UN_email_enable.png"/></div>
						<div id="div_email"  style="margin-top:2px">邮件</div>
					</div>
					
					<div class="floatright cursorhand" style="margin-left:10px;">
						<div><img id="img_handup" src="./spimg/UN_handup_enable.png"/></div>
						<div id="div_sms" style="margin-top:2px">举手</div>
					</div>
					<div class="floatright cursorhand" style="margin-left:10px">
						<div><img id="img_ivr" src="./spimg/UN_ivr_disable.png"/></div>
						<div id="div_ivr"  style="margin-top:2px">IVR</div>
					</div>
					<div class="floatright cursorhand" style="margin-left:10px">
						<div><img id="img_conferentce" src="./spimg/UN_conference_disable.png"/></div>
						<div id="div_conferentce"  style="margin-top:2px">会议</div>
					</div>
					<div class="floatright cursorhand" style="margin-left:10px">
						<div><img id="img_transfer" src="./spimg/UN_transfer_disable.png"/></div>
						<div id="div_transfer"  style="margin-top:2px">转移</div>
					</div>
					<div class="floatright cursorhand" style="margin-left:10px">
						<div><img id="img_consult" src="./spimg/UN_consult_disable.png"/></div>
						<div id="div_consult"  style="margin-top:2px">咨询</div>
					</div>
					<div class="floatright cursorhand" style="margin-left:10px">
						<div><img id="img_dial" src="./spimg/UN_dial_disable.png"/></div>
						<div id="div_dial"  style="margin-top:2px">外拨</div>
					</div>
					<div class="floatright cursorhand" style="margin-left:10px">
						  <div><input type="text" id='text_transfer_number' name="text_transfer_number" style="margin-top:2px;width:109px;height:22px;left:0px;border:1px solid #909993;background-color:#ffffff" onkeyup="value=value.replace(/[^\d]/g,'') " ></div>
						  <div style="margin-top:4px;float:left;">*</div><div id="div_msg" style="margin-top:4px;margin-left:0px;">未登录</div>
					</div>
						 
					<div class="floatright cursorhand" style="margin-left:10px; display:none">
						<div><img id="img_textinput" src="./spimg/UN_textinput_disable.png"/></div>
					</div>
					<div class="floatright cursorhand" style="margin-left:10px; display:none">
						<div><img id="img_tpin" src="./spimg/UN_tpin_disable.png"/></div>
					</div>
					<div class="floatright cursorhand" style="margin-left:10px">
						<div><img id="img_acw" src="./spimg/UN_acw_disable.png"/></div>
						<div id="div_acw"  style="margin-top:2px">ACW</div>
					</div>
					<div class="floatright cursorhand" style="margin-left:10px">
						<div><img id="img_hold" src="./spimg/UN_hold_disable.png"/></div>
						<div id="div_hold"  style="margin-top:2px">保持</div>
					</div> 
					<div class="floatright cursorhand" style="margin-left:10px">
						<div><img id="img_answer" src="./spimg/UN_answer_disable.png"/></div>
						<div id="div_answer"  style="margin-top:2px">接听</div>
					</div>
					<!--div class="floatright cursorhand" style="margin-left:10px">
						<div><img id="img_rest" src="./spimg/UN_rest_disable.png"/></div>
						<div id="div_rest"  style="margin-top:2px">休息</div>
					</div-->
				  <div class="floatright cursorhand" style="margin-left:10px;">
						<div><img id="img_ready" src="./spimg/UN_ready_disable.png"/></div>
						<div id="div_ready"  style="margin-top:2px">就绪</div>
					</div>
					<div class="floatright cursorhand" style="margin-left:10px;">
						<select id="sel_aux_reasoncode" name="sel_aux_reasoncode"  class="select" style="position:relative;margin-top:2px;width:89px;height:25px;left:0px;border:1px solid #909993;background-color:#ffffff"">
						   <option></option>
						</select>
					</div>
					
					<div class="floatright cursorhand" style="margin-left:10px;">
						<div><img id="img_login" src="./spimg/UN_login_enable.png"/></div>
						<div id="div_login"  style="margin-top:2px">登录</div>
					</div>
	 				<!--软电话条end-->
	</body>

    <script src="./softphoneinit.js?v20110507_01" type="text/javascript"></script>
		<script src="./softphoneext.js?v20110501_01" type="text/javascript"></script>	
</html>