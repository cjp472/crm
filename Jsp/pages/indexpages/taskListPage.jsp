<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/flow/ProcessNextForm.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/flow/MyToDoFlowManagerView.js"></script>
<div class="contentDiv">
<table class="newsList" cellpadding="0" cellspacing="0" rules="rows">
	<c:forEach var="task" items="${taskList}">
		<tr>
			<td width="26"><img
				src="<%=request.getContextPath()%>/images/menus/flow/task.png" /></td>
			
			<td width="26" nowrap="nowrap">
				<c:choose>
					<c:when test="${empty task.dueDatePass}">
					<img src="<%=request.getContextPath()%>/images/task/reminder.gif" title="已过期"/>	
					</c:when>
				</c:choose>
			</td>					
			<td><a href="#"
				onclick="App.MyDesktopClickTopTab('ProcessNextForm',{taskId:${task.taskId},activityName:'${task.taskName}'})">${task.busTypeName}</a></td>
		<!--<td width="80" nowrap="nowrap">
				<c:choose>
					<c:when test="${not empty task.taskUser}">${task.taskUser}</c:when>
					<c:otherwise><font color='red'>暂无执行人</font></c:otherwise>
				</c:choose>
			</td>  -->	
			<td width="150" nowrap="nowrap">
				<c:choose>
					<c:when test="${not empty task.dueDatePass}">
						<a><fmt:formatDate value="${task.dueDate}" pattern="yyyy-MM-dd HH:mm:ss" /></a>
					</c:when>
					<c:otherwise><font color='red'><fmt:formatDate value="${task.dueDate}" pattern="yyyy-MM-dd HH:mm:ss" /></font></c:otherwise>
				</c:choose>
			</td>
			<td width="120" nowrap="nowrap">
			<c:choose>
					<c:when test="${not empty task.dueDatePass}">
						<a>${task.dueDateStr}</a>
					</c:when>
					<c:otherwise><font color='red'>${task.dueDateStr}</font></c:otherwise>
				</c:choose>
			</td>
		</tr>
	</c:forEach>
</table>
</div>
<div class="moreDiv"><span><a href="#"
	onclick="App.clickTopTab('MyToDoFlowManagerView')">更多...</a></span></div>