<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@page import="com.htsoft.core.util.AppUtil"%>
<%@page import="com.ulane.know.service.know.UkSysKnowService"%>
<%@page import="com.htsoft.core.web.paging.PagingBean"%>
<%@page import="com.htsoft.core.command.QueryFilter"%>
<%@page import="com.ulane.know.model.know.UkSysKnow" %>
<%@page import="java.util.List"%>
<%
	Long knowId = null;
	String strId = request.getParameter("knowId");
	String opt = request.getParameter("opt");
	UkSysKnowService ukSysKnowService = (UkSysKnowService) AppUtil.getBean("ukSysKnowService");
	//通过id得到News
	UkSysKnow ukSysKnow = null;
	if (strId != null && !"".equals(strId)) {
		knowId = new Long(strId);
	}
	
	//使用页面的方法实现获取上一条,下一条的记录
	
	if(opt != null && !"".equals(opt)){
		QueryFilter filter=new QueryFilter(request);
		filter.getPagingBean().setPageSize(1);//只取一条记录
		List<UkSysKnow> list = null;
		filter.addFilter("Q_sysKnowStatus_SN_EQ","1");//只取生效的新闻
		if(opt.equals("_next")){
			//点击下一条按钮,则取比当前ID大的下一条记录
			filter.addFilter("Q_knowId_L_GT", knowId.toString());
			list= ukSysKnowService.getAll(filter);
			if(filter.getPagingBean().getStart()+1==filter.getPagingBean().getTotalItems()){
				request.setAttribute("__haveNextKnowFlag","endNext");
			}
		}else if(opt.equals("_pre")){
			//点击上一条按钮,则取比当前ID小的下一条记录
			filter.addFilter("Q_knowId_L_LT", knowId.toString());
			filter.addSorted("knowId","desc");
			list= ukSysKnowService.getAll(filter);
			if(filter.getPagingBean().getStart()+1==filter.getPagingBean().getTotalItems()){
				request.setAttribute("__haveNextKnowFlag","endPre");
			}
		}
		if(list.size()>0){
			ukSysKnow = list.get(0);
		}else{
			ukSysKnow = ukSysKnowService.get(knowId);
		}
	}else{
		ukSysKnow = ukSysKnowService.get(knowId);
		request.setAttribute("__haveNextKnowFlag","");
	}
	
	request.setAttribute("ukSysKnow",ukSysKnow);
	request.setAttribute("ctxPath",request.getContextPath());
	//浏览后的新闻浏览次数加1
	ukSysKnow.setViewCount(ukSysKnow.getViewCount()+1);
	ukSysKnowService.save(ukSysKnow);
%>

<table width="98%" cellpadding="0" cellspacing="1" style="border: 5px 5px 5px 5px;">
	<tr>
		<td align="center" style="font:2.0em 宋体  ;color:black;font-weight: bold;padding:10px 0px 10px 0px; ">
			${ukSysKnow.tiTle }
			<input type="hidden" value="${ukSysKnow.knowId }" id="__curKnowId"/>
			<input type="hidden" value="${__haveNextKnowFlag}" id="__haveNextKnowFlag"/>
		</td>
	</tr>
	<tr>
		<td align="center" style="padding:0px 0px 10px 0px;">
			<font color="red">
				<fmt:formatDate value="${ukSysKnow.enableTime}" pattern="yyyy-MM-dd HH:mm"/>
			</font>
			
			&nbsp;&nbsp;浏览次数:
			<font color="red">
				${ukSysKnow.viewCount }
			</font>
			&nbsp;&nbsp;点评次数:
			<font color="red">
				${ukSysKnow.dianpingCount }
			</font>
		</td>
	</tr>
	
	<tr>
		<td style="border-top:dashed 1px #ccc;" height="28">
			
		</td>
	</tr>
	
	<tr >
		<td style="font:13px 宋体;color: black;line-height:24px;">
			${ukSysKnow.sysKnowComment}
		</td>
	</tr>
	<tr>
		<td align="right">
				(作者:
			<font color="green">
				${ukSysKnow.createBy.userId}
			</font>
				&nbsp;&nbsp;发布人:
			<font color="green">
				${ukSysKnow.createBy.userId}
			</font>
				 )
		</td>
	</tr>
	
</table>
