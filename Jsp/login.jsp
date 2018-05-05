<%@page pageEncoding="UTF-8"%>
<%@page import="com.htsoft.core.util.AppUtil"%>
<%@page import="com.opensymphony.xwork2.ActionContext"%>
<%@taglib prefix="s" uri="/struts-tags"%>
<%@page import="org.apache.commons.lang.StringUtils"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="X-UA-Compatible" content="IE=8">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<meta name="viewport" content="width=device-width, initial-scale=1">
	    <link rel="shortcut icon" href="images/favo.ico" type="image/x-icon" />
		<title><s:property
				value="%{getText('login.jsp.huanyingdenglu')}" />ECCRM<s:property
				value="%{getText('login.jsp.system.name')}" /></title>
		<link rel="stylesheet" type="text/css"
			href="<%=request.getContextPath()%>/ext3/resources/css/ext-all.css" />
		<link rel="stylesheet" type="text/css"
			href="<%=request.getContextPath()%>/ext3/resources/css/ext-patch.css" />
		<link rel="stylesheet" type="text/css"
			href="<%=request.getContextPath()%>/css/login.css" />
		<style type="text/css">
body {
	margin: 0px;
	padding: 0px;
	background: #ecf0f0;
	background-position: center;
	background-attachment: fixed repeat-x;
}

.labelLeft {
	position: relative;
	margin-left: 80px;
	margin-top: 50px;
	float: left;
}

.labelMiddle {
	position: relative;
	width: 34px;
	height: 278px;
	float: left;
	margin-top: 70px;
	margin-left:-5px;
	background: url('images/split.png') no-repeat;
}
.myWi{
  background: none;
  margin-top: 2000px;
}
.labelRight {
	position: absolute;
	width: 256px;
	height: 39px;
	float: left;
	margin-left:40px;
	margin-top:40px;
	background: url('images/denglu.png') no-repeat;
}

.x-window-plain .x-window-mc {
	background-color: #FFFFFF;
	border-color: #FFFFFF #EEEEEE #EEEEEE #FFFFFF;
}

.x-panel-body {
	background-color: #EFEFEF;
	border-color: #FFFFFF;
}

</style>
		<%
			response.addHeader("__timeout", "true");
			String codeEnabled = (String) AppUtil.getSysConfig().get(
					"codeConfig");
			String dyPwdEnabled = (String) AppUtil.getSysConfig().get(
					"dynamicPwd");
			if (StringUtils.isEmpty(codeEnabled)) {//若当前数据库没有配置验证码参数
				codeEnabled = "close";//代表需要输入
			}
			if (StringUtils.isEmpty(dyPwdEnabled)) {//若当前数据库没有配置动态密码参数
				dyPwdEnabled = "close";//代表需要输入
			}
		%>
		<script type="text/javascript">
var __ctxPath = "<%=request.getContextPath()%>";
var __loginImage = __ctxPath + "<%=AppUtil.getCompanyLogo()%>";
</script>
		<script type="text/javascript"
			src="<%=request.getContextPath()%>/ext3/adapter/ext/ext-base.gzjs">
</script>
		<script type="text/javascript"
			src="<%=request.getContextPath()%>/ext3/ext-all.gzjs">
</script>
		<script type="text/javascript"
			src="<%=request.getContextPath()%>/ext3/ext-lang-zh_CN.js">
</script>
		<script type="text/javascript"
			src="<%=request.getContextPath()%>/js/App.LoginWin.js">
</script>
		<!--<script type="text/javascript" src="/js/myTestJs/loginPwdCheck.js"></script>	-->
		<script type="text/javascript">
Ext.onReady(function() {
	Ext.QuickTips.init();
	new App.LoginWin('<%=codeEnabled%>', '<%=dyPwdEnabled%>').show();
});
</script>
	</head>
	<body>
		<div style="text-align: center;">
			<div id="loginArea">

			</div>
		</div>
	</body>
</html>