<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<%
	String boxId = request.getParameter("boxId");
	String messageId = request.getParameter("messageId");
	String[] str=boxId.split(",");
	System.out.println(str[0]+"aa"+str[1]);
	ShortMessageService shortMessageService = (ShortMessageService)AppUtil.getBean("shortMessageService");
	InMessageService inMessageService = (InMessageService)AppUtil.getBean("inMessageService");
	
	ShortMessage shortMessage=new ShortMessage();
	InMessage inMessage =new InMessage ();
	if(StringUtils.isNotEmpty(boxId)){
		shortMessage=shortMessageService.get(new Long(str[1]));
		System.out.println("shortMessage"+shortMessage.getContent());
		inMessage=inMessageService.get(new Long(str[0]));
		
	}
	String[] filename;
	String[] fileid;
	Map<String,String> file = new HashMap<String,String>();
	try{
		if(shortMessage.getFileid().indexOf(",") >= 0){
			filename = shortMessage.getFilename().split(",");
			fileid = shortMessage.getFileid().split(",");
			for(int i = 0 ; i < fileid.length ; i++){
				file.put(fileid[i],filename[i]);
			}
		}else{
			file.put(shortMessage.getFileid(),shortMessage.getFilename());
		}
	}catch(Exception e){
		file = null;
	}
	request.setAttribute("shortMessage",shortMessage);
	request.setAttribute("inMessage",inMessage);
%>
		
<%@page import="com.htsoft.oa.service.info.InMessageService"%>
<%@page import="com.htsoft.oa.service.info.ShortMessageService"%>
<%@page import="com.htsoft.core.util.AppUtil"%>
<%@page import="com.htsoft.oa.model.info.ShortMessage"%>
<%@page import="com.htsoft.oa.model.info.InMessage"%>
<%@page import="org.apache.commons.lang.StringUtils"%>
<%@page import="java.util.*"%>
<table width="98%" cellpadding="0" cellspacing="1" style="padding:5px 5px 5px 5px;font:12px 宋体;color: black;line-height:24px;">
		
			<tr >
				<td width="10%" style="background-color: #c7e3fa;text-align: center;">
					消息类型:
				</td>
				<td width="90%" style="padding-left:10px;border: 1px #c7e3fa solid;">
					<font style="font-weight: bold;"> ${shortMessage.sendMsgType}
					<!--<c:if test="${shortMessage.msgType==0}">
						消息报备
					</c:if>
					<c:if test="${shortMessage.msgType==1}">
						最新业务提醒
					</c:if>
					<c:if test="${shortMessage.msgType==2}">
						机具故障提醒
					</c:if>
					<c:if test="${shortMessage.msgType==3}">
						业务话术
					</c:if>
					<c:if test="${shortMessage.msgType==4}">
						其他
					</c:if>
					-->
					</font>
				</td>
			</tr>
			
		<c:if test="${inMessage.readFlag==1}">
			<tr >
				<td width="10%" style="background-color: #c7e3fa;text-align: center;">
					状态:
				</td>
				<td width="90%" style="padding-left:10px;border: 1px #c7e3fa solid;">
					<font color="red">
						已读
					</font>
				</td>
			</tr>
			</c:if>
		<c:if test="${inMessage.readFlag==0}">
			<tr >
				<td width="10%" style="background-color: #c7e3fa;text-align: center;">
					状态:
				</td>
				<td width="90%" style="padding-left:10px;border: 1px #c7e3fa solid;">
					<font color="red">
						未读
					</font>
				</td>
			</tr>
			</c:if>
			
			<tr >
				<td width="10%" style="background-color: #c7e3fa;text-align: center;">
					时　间:
				</td>
				<td width="90%" style="padding-left:10px;border: 1px #c7e3fa solid;">
					<font color="red">
						<fmt:formatDate value="${shortMessage.sendTime}" />
					</font>
				</td>
			</tr>
				<tr >
						<td width="10%" style="background-color: #c7e3fa;text-align: center;">
							回复人:
						</td>
						<td width="90%" style="padding-left:10px;border: 1px #c7e3fa solid;">
							<font color="green">
								${shortMessage.sender }
							</font>
						</td>
					</tr>
					<tr >
					<td width="10%" style="background-color: #c7e3fa;text-align: center;">
						附　件:
					</td>
					<!--<td width="90%" style="padding-left:10px;border: 1px #c7e3fa solid;">
					
						<a href="#" onclick="FileAttachDetail.show(${shortMessage.fileid});">${shortMessage.filename}</a>
					
					 
					</td>
					
					-->
					<td width="90%" style="padding-left:10px;border: 1px #c7e3fa solid;">
						<c:forEach items="<%=file %>" var="file">
							<a href="#" onclick="FileAttachDetail.show(${file.key});"><c:out value="${file.value}"></c:out></a>&nbsp;&nbsp;
						</c:forEach>
					</td>
				</tr>
			
			<tr >
					<td width="100%"  colspan="2" >
						&nbsp;&nbsp;${shortMessage.content}
					</td>
			</tr>
	    </table>