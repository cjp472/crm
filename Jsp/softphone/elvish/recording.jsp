<%@ page language="java" contentType="text/html; charset=UTF-8" 
	import="java.util.logging.Logger,java.net.URL,javax.xml.namespace.QName,java.net.MalformedURLException,cn.com.pccw.service.asteriskwebservicev1.*, java.util.*"
  pageEncoding="UTF-8"%>
	<% 
	String path = "";
	/*
	try{
		String cti_ip=request.getParameter("cti_ip");
		Logger logger = Logger.getLogger(cn.com.pccw.service.asteriskwebservicev1.OverallInfo.class.getName());
		  URL wsdlLocation = null;
			try {
				URL baseUrl = cn.com.pccw.service.asteriskwebservicev1.OverallInfo.class.getResource(".");
				wsdlLocation = new URL(baseUrl,"http://" + cti_ip + ":8080/spservice/services/overallInfoWebservice?wsdl");
				//wsdlLocation = new URL(baseUrl,"http://10.160.4.61:8080/spservice/services/overallInfoWebservice?wsdl");
				} catch (MalformedURLException e) {
				e.printStackTrace();
				logger.warning(e.getMessage());
			}
		  QName serviceName = new QName("http://www.pccw.com.cn/service/AsteriskWebServiceV1.0","OverallInfo");
		  OverallInfo overallInfo =  new OverallInfo(wsdlLocation, serviceName);
		  OverallInfoWebservice ow = overallInfo.getOverallInfoImplPort();
		  String recording = request.getParameter("recordId");
		  out.println(recording + "<br>");
		 
		  path=ow.findRecordingPath(recording);
		  String outMsg = "{success:true,path:'"+path+"'}";
			if(path==null || !path.endsWith(".wav")) {
				outMsg = "{failure:true,msg:'The recording file has not been found.'}";
			}
		 	out.println(outMsg + "<br>" + path);
	} catch (Exception e) {
		e.printStackTrace();
		out.println(e.toString() + path);
	}
	*/
	%>
	<script type="text/javascript">
	
	setTimeout("makepdfret()", 100);
	
	function makepdfret(){
		try{
			var pRet="<%=path%>";
			//parent.window.keepfile(pRet);
			//parent.parent.window.parentP(pRet);
		} catch(e){
			alert(e);
		}
		
	}
	
	
	</script>