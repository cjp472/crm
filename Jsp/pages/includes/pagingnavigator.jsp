<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@page import="com.htsoft.oa.common.SelectedLanguage;"%>


<%if(SelectedLanguage.getLanType().equals("Lan:1")) {%>
	<script language="javascript" src="<%=request.getContextPath()%>/js/changePage_cn.js"></script>
<%}else {%>
	<script language="javascript" src="<%=request.getContextPath()%>/js/changePage_en.js"></script>
<%}%>
<td align="right" nowrap class="tableControlBarText" height="26">	
    <script language="javascript">

    	showPaginationNavigator('<%=request.getParameter("formName")%>', <ww:property value="paginationSupport.page"/>, <ww:property value="paginationSupport.pageCount"/>, <ww:property value="paginationSupport.totalCount"/>);
    </script>
</td>
