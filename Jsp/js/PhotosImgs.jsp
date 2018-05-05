<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<% 
String path = request.getContextPath();
String basePath =request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
//String strP = request.getParameter("Souncepath");//出现了中文乱码
//String paths=new String(request.getParameter("pathStr").getBytes("ISO-8859-1"),"UTF-8");

%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	  <head>
	    <base href="<%=basePath%>"/>
	   
	    <title>图片裁剪示例</title>
	    <link rel="stylesheet" href="css/common.css" type="text/css" />
	    <link rel="stylesheet" href="css/jquery.Jcrop.css" type="text/css" />
	    <script type="text/javascript" src="js/jquery-1.3.2-min.js"></script>
	    <script type="text/javascript" src="js/jquery.Jcrop.js"></script>
	    <style type="text/css">
		       .crop_preview{position:absolute; left:100px;top:0; width:200px; height:200px;margin:40px; overflow:hidden;}
		    </style> 
	</head>
	 <script type="text/javascript">
   function cutPath(){
          //alert("测试数据")
		parent.window.ImgPhotoPaths=document.getElementById("paths").value;
		parent.window.widths=document.getElementById("width").value;
		parent.window.heights=document.getElementById("height").value;
		//document.getElementById('CutPhotoPath').src =__ctxPath+'/attachFiles/'+document.getElementById("paths").value;
            //alert(""+__ctxPath+'/attachFiles/'+document.getElementById("paths").value);
   }
</script>
	<body onload="cutPath();"> 
	  
		<input type="hidden" id="paths" name="h2" value="<%=request.getAttribute("zip")%>" />
		<input type="hidden" id="width" name="width" value="<%=request.getAttribute("width")%>" />
		<input type="hidden" id="height" name="height" value="<%=request.getAttribute("height")%>" />
		<input type="hidden" id="height" name="height" value="<%=request.getAttribute("height")%>" />
			 <div style= left:430px;top:20px; "width:<%=request.getAttribute("width")%>px; height : <%=request.getAttribute("height")%>px;"> 
			  <h2 align=left:20px font color="#009966">预览裁剪照片信息:</h2></br>
			   <center>
			   </br>
			   <img id="aa" src="<%=request.getContextPath()%>/attachFiles/<%=request.getAttribute("zip")%>" />
			   </center>
			 </div>      
				
	</body>			
				
</html>