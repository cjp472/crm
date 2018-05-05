<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%

		PagingBean pb=new PagingBean(0,8);
		//查找发布的前五条新闻
		//String sectionId = request.getParameter("paertId");
		UlBbsHuatiService huatiService = (UlBbsHuatiService)AppUtil.getBean("ulBbsHuatiService");
		List<UlBbsHuati> list = huatiService.findHuaTi();
		List<UlBbsHuati> newsList=new ArrayList<UlBbsHuati>();
		for(UlBbsHuati news:list){
			String content=StringUtil.html2Text(news.getContent());
			if(content.length()>250){
				content=content.substring(0, 250);
			}
			news.setContent(content);
			newsList.add(news);
		}
		request.setAttribute("newsList",newsList);
%>

<%@page import="com.htsoft.core.web.paging.PagingBean"%>
<%@page import="com.ulane.base.service.xitong.UlBbsHuifuService"%>
<%@page import="com.ulane.base.service.xitong.UlBbsHuatiService"%>
<%@page import="java.util.List"%>
<%@page import="com.ulane.base.model.xitong.UlBbsHuifu"%>
<%@page import="com.ulane.base.model.xitong.UlBbsHuati"%>
<%@page import="java.util.ArrayList"%>
<%@page import="com.htsoft.core.util.StringUtil"%>
<%@page import="com.htsoft.core.util.AppUtil"%><div class="contentDiv">
<table class="newsList" cellpadding="0" cellspacing="0" rules="rows">
	<c:forEach var="news" items="${newsList}">
		<tr>
			<td width="26"><c:choose>
				<c:when test="${fn:length(news.content)>0}">
					<img
						src="<%=request.getContextPath()%>/attachFiles/${news.content}" />
				</c:when>
				<c:otherwise>
					<img
						src="<%=request.getContextPath()%>/images/default_newsIcon.jpg" />
				</c:otherwise>
			</c:choose></td>
			<td><a href="#"
				onclick="App.MyDesktopClickTopTab('HuiFuDetail',${news.bbsHuatiId})">${news.title}</a></td>
			<td width="80" nowrap="nowrap"><a>${news.content}</a></td>
			<td width="80" nowrap="nowrap"><a><fmt:formatDate
				value="${news.updatetime}" pattern="yyyy-MM-dd" /></a></td>
		</tr>
	</c:forEach>
</table>
</div>