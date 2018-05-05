<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/flow/ProcessNextForm.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/know/UkSysKnowShow.js"></script>
<div class="contentDiv">
<table class="newsList" cellpadding="0" cellspacing="0" rules="rows">
	<c:forEach var="hotKnow" items="${hotKnowList}">
		<tr>
			<!-- <td width="26"><img
				src="<%=request.getContextPath()%>/images/menus/flow/task.png" /></td> -->
			<td><a href="#"
				onclick="App.MyDesktopClickTopTab('UkSysKnowShow',{knowId:${hotKnow.knowId}})">${hotKnow.tiTle}</a></td>
			<td width="80" nowrap="nowrap">
				<a>${hotKnow.createBy.fullname}</a>
			</td>
			<td width="80" nowrap="nowrap">
				<a>${hotKnow.viewCount}</a>
			</td>
		</tr>
	</c:forEach>
</table>
</div>
<div class="moreDiv"><span><a href="#"
	onclick="App.clickTopTab('UkTopSysKnowView')">更多...</a></span></div>