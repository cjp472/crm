<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    
    <title>模拟控件</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->

  </head>
  
  <script type="text/javascript">
  function loa(){
  	alert("loa");
		ringocx.attachEvent("Alerting", Regalerting);
				alert("loa-Over");	
  }
  
  function exitOcx(){
  	alert("exitOcx");
  	ringocx.TestEvtAlerting();
  }
  
  function Regalerting(str){
  	alert("ringing->"+str);
  }
  </script>
  
  <script language='javascript' for='myocx' event='Alerting(strCallerNo)'>
	alert("Alerting," + strCallerNo);
</script>
  
  
  <body  onload="loa();">
    This is my JSP page. <br>
    <object classid="clsid:5E49E2E9-E37D-4D7C-8279-0FE456F4B683"  name="ringocx" 
	class="C:\OFFICE_WORK\ocx\SanHuiAnalogSoftPhone.ocx"  height="0" width="0" VIEWASTEXT ID=Object1>
	</object>
    	<input type="button" value="来电" onClick="exitOcx()">
  </body>
</html>
