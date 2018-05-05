<%@ page language="java" contentType="text/html; charset=GBK" 
	import="java.util.logging.Logger,java.net.URL,javax.xml.namespace.QName,java.net.MalformedURLException,cn.com.pccw.service.asteriskwebservicev1.*, java.util.*"
  pageEncoding="GBK"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>TotalCTI softphone demo</title>
</head>
<script type="text/javascript">
	function changeNode(){
		document.forms[0].action="index.jsp";
		var obj = document.getElementById("nodeip");
		document.getElementById("node").value=obj.options[obj.selectedIndex].text;
		document.forms[0].submit();
	}
	function softphoneLogin(){
		if(document.getElementById("nodeip").value==null || document.getElementById("nodeip").value==""){
			alert("ÇëÑ¡Ôñ½Úµã£¡");
			return;
		}
		if(document.getElementById("agent").value==null || document.getElementById("agent").value==""){
			alert("ÇëÑ¡Ôñ×øÏ¯£¡");
			return;
		}
		if(document.getElementById("device").value==null || document.getElementById("device").value==""){
			alert("ÇëÑ¡ÔñÉè±¸£¡");
			return;
		}
		if(document.getElementById("pwd").value==null || document.getElementById("pwd").value==""){
			alert("ÇëÊäÈëÃÜÂë£¡");
			return;
		}
		var obj = document.getElementById("nodeip");
		document.getElementById("node").value=obj.options[obj.selectedIndex].text;
		
		//document.forms[0].action="http://localhost:8080/softphone/SoftPhone.html";
		//document.forms[0].submit();
		
		var node = document.getElementById("node").value;
		var nodeip = document.getElementById("nodeip").value;
		var agent = document.getElementById("agent").value;
		var device = document.getElementById("device").value;
		var pwd = document.getElementById("pwd").value;
		/*
		var toUrl = "http://localhost:8080/ulink2012/softphone/elvish/SoftPhone.html"
			+"?node="+node
			+"&nodeip="+nodeip
			+"&agent="+agent
			+"&device="+device
			+"&pwd="+pwd;
		opener.document.location.href=toUrl;
		*/
		opener.login(node, nodeip, agent, device, pwd);
		window.close();
		
	}
// 	function softphoneLogin(){
// 		if(document.getElementById("nodeip").value==null || document.getElementById("nodeip").value==""){
// 			alert("ÇëÑ¡Ôñ½Úµã£¡");
// 			return;
// 		}
// 		if(document.getElementById("agent").value==null || document.getElementById("agent").value==""){
// 			alert("ÇëÑ¡Ôñ×øÏ¯£¡");
// 			return;
// 		}
// 		if(document.getElementById("device").value==null || document.getElementById("device").value==""){
// 			alert("ÇëÑ¡ÔñÉè±¸£¡");
// 			return;
// 		}
// 		if(document.getElementById("pwd").value==null || document.getElementById("pwd").value==""){
// 			alert("ÇëÊäÈëÃÜÂë£¡");
// 			return;
// 		}
// 		var obj = document.getElementById("nodeip");
// 		parent.softphoneFrame.login(obj.options[obj.selectedIndex].text,
// 									obj.value,
// 									document.getElementById("agent").value,
// 									document.getElementById("device").value,
// 									document.getElementById("pwd").value);
// 	}
</script>
<body>
<form name="from1" action="index.jsp" method="get">
	<input type="hidden" id="node" name="node" />
	<table border="0">
		<tr>
			<td>½Úµã£º</td>
			<td>
	<select id="nodeip" name="nodeip" onchange="changeNode()" >
		<option value=''>------ÇëÑ¡Ôñ------</option>
	<% 
		Logger logger = Logger.getLogger(cn.com.pccw.service.asteriskwebservicev1.TotalAdmin.class.getName());
	  URL wsdlLocation = null;
		try {
			URL baseUrl = cn.com.pccw.service.asteriskwebservicev1.TotalAdmin.class.getResource(".");
			wsdlLocation = new URL(baseUrl,"http://192.168.10.16:8080/spadminservice/services/TotalAdminWebService?wsdl");
		} catch (MalformedURLException e) {
			logger.warning(e.getMessage());
		}
	  QName serviceName = new QName("http://www.pccw.com.cn/service/AsteriskWebServiceV1.0","TotalAdmin");
		TotalAdmin totalAdmin =  new TotalAdmin(wsdlLocation, serviceName);
		TotalAdminWebservice taw = totalAdmin.getTotalAdminPort();
		List<NodeInfo> nodeList = taw.getNodes();
		for(NodeInfo nodeInfo : nodeList){
			if(request.getParameter("nodeip")!=null && request.getParameter("nodeip").equals(nodeInfo.getNodeIp())){
	%>
				<option value='<%= nodeInfo.getNodeIp() %>' selected="true"><%= nodeInfo.getNodeName() %></option>
	<%			
			}else{
	%>
				<option value='<%= nodeInfo.getNodeIp() %>'><%= nodeInfo.getNodeName() %></option>
	<%		
			}
		}
	%>
	</select>			
			</td>
		</tr>
		<tr>
			<td>Éè±¸£º</td>
			<td>
	<select id="device" name="device">
		<option value=''>------ÇëÑ¡Ôñ------</option>
	<% 
		if(request.getParameter("node")!=null && request.getParameter("node").equals("")==false){

			List<DeviceInfo> deviceList = taw.getDevices(request.getParameter("node").toString());
			for(DeviceInfo deviceInfo : deviceList){
	%>
			<option value='<%= deviceInfo.getDevice() %>'><%= deviceInfo.getDevice() %></option>
	<%		
			}
		}
	%>
	</select>		
			</td>
		</tr>
		<tr>
			<td>×øÏ¯£º</td>
			<td>
	<select id="agent" name="agent">
		<option value=''>------ÇëÑ¡Ôñ------</option>
	<% 
		if(request.getParameter("node")!=null && request.getParameter("node").equals("")==false){

			List<AgentInfo> agentList = taw.getAgents(request.getParameter("node").toString());
			for(AgentInfo agentInfo : agentList){
	%>
			<option value='<%= agentInfo.getAgent() %>'><%= agentInfo.getAgent() %></option>
	<%		
			}
		}
	%>
	</select>	
			</td>
		</tr>
		<tr>
			<td>ÃÜÂë£º</td>
			<td>
				<input type="password" id="pwd" name="pwd">
			</td>
		</tr>
		<tr>
			<td colspan="2" align="center">
				<input type="button" value="È·¶¨" onclick="softphoneLogin()">
			</td>
		</tr>
	</table>
	
</form>
	
</body>
</html>