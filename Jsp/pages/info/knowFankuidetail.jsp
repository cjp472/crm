<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@page import="com.htsoft.core.util.AppUtil"%>
<%@page import="com.ulane.know.service.know.UkSysKnowService"%>
<%@page import="com.ulane.know.service.know.impl.UkSysKnowServiceImpl"%>
<%@page import="com.htsoft.core.web.paging.PagingBean"%>
<%@page import="com.ulane.know.model.know.UkSysKnow"%>
<%@page import="com.htsoft.core.command.QueryFilter"%>
<%@page import="com.ulane.know.service.know.UkKnowFankuiService"%>
<%@page import="java.util.List"%>
<%@page import="com.ulane.know.model.know.UkKnowFankui"%>

<%
	Long knowFankui = null;
	String strId = request.getParameter("knowId");
	String opt = null;
	UkSysKnowService sysKnowService = (UkSysKnowService) AppUtil
			.getBean("ukSysKnowService");

	//通过id得到sysKnow
	UkSysKnow sysKnow = null;
	if (strId != null && !"".equals(strId)) {
		knowFankui = new Long(strId);
	}
	sysKnow = sysKnowService.get(knowFankui);
	request.setAttribute("__haveNextFlag", "");
	request.setAttribute("ukSysKnow", sysKnow);
	request.setAttribute("ctxPath", request.getContextPath());
	//浏览后的话题浏览次数加1
	if ("".equals(sysKnow.getViewCount()) || null==sysKnow.getViewCount() ) {
		sysKnow.setViewCount(new Integer(1));
		sysKnowService.merge(sysKnow);
	} else {
		sysKnow.setViewCount(sysKnow.getViewCount() + 1);
		sysKnowService.merge(sysKnow);
	}
%>

<table width="98%" cellpadding="0" cellspacing="1"
	style="border: 5px 5px 5px 5px;">
	<tr>
			<td align="center" style="font:2.0em 宋体  ;color:black;font-weight: bold;padding:10px 0px 10px 0px; ">
			${ukSysKnow.tiTle}
			<input type="hidden" value="${ukSysKnow.knowId}" id="__knowFankuiId"/>
			<input type="hidden" value="${__haveNextFlag }" id="__haveNextFlag"/>
		</td>
     </tr>
     	<tr>
		<td align="center" style="padding:0px 0px 10px 0px;">
			<font color="red">
				<fmt:formatDate value="${ukSysKnow.createDate}" pattern="yyyy-MM-dd HH:mm"/>
			</font>
			&nbsp;&nbsp;浏览次数:
			<font color="red">
				${ukSysKnow.viewCount}
			</font>
			&nbsp;&nbsp;反馈次数:
			<font color="red">
				${ukSysKnow.fankuiShu}
			</font>
		</td>
				<td align="right">
				(&nbsp;发布人:
			<font color="green">
				${ukSysKnow.createBy.fullname}
			</font>
				 )
		</td>
	</tr>
		<tr>
		<td align="left">
				&nbsp;&nbsp;内容:
			<font color="green">
				${ukSysKnow.sysKnowComment}
			</font>
				 
		</td>
		
	</tr>
	
</table>
