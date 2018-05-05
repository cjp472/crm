<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@page import="com.htsoft.core.util.AppUtil"%>
<%@page import="com.htsoft.oa.service.info.NewsService"%>
<%@page import="com.htsoft.oa.service.info.impl.NewsServiceImpl"%>
<%@page import="com.htsoft.core.web.paging.PagingBean"%>
<%@page import="com.htsoft.oa.model.info.News"%>
<%@page import="com.htsoft.core.command.QueryFilter"%>
<%@page import="com.ulane.base.service.xitong.UlBbsHuifuService"%>
<%@page import="com.ulane.base.service.xitong.UlBbsHuatiService"%>
<%@page import="java.util.List"%>
<%@page import="com.ulane.base.model.xitong.UlBbsHuifu"%>
<%@page import="com.ulane.base.model.xitong.UlBbsHuati"%>
<%
	Long bbsHuatiId = null;
	String strId = request.getParameter("bbsHuifu");
	String opt = null;
	UlBbsHuatiService huatiService = (UlBbsHuatiService) AppUtil
			.getBean("ulBbsHuatiService");

	//通过id得到bbsHuati
	UlBbsHuati huati = null;
	if (strId != null && !"".equals(strId)) {
		bbsHuatiId = new Long(strId);
	}
	huati = huatiService.get(bbsHuatiId);
	request.setAttribute("__haveNextNewsFlag", "");
	request.setAttribute("ulBbsHuifu", huati);
	request.setAttribute("ctxPath", request.getContextPath());
	//浏览后的话题浏览次数加1
	if ("".equals(huati.getLiulanshu()) || null==huati.getLiulanshu() ) {
		huati.setLiulanshu(new Long(1));
		huatiService.merge(huati);
	} else {
		huati.setLiulanshu(huati.getLiulanshu() + 1);
		huatiService.merge(huati);
	}
%>

<table width="98%" cellpadding="0" cellspacing="1"
	style="border: 5px 5px 5px 5px;">
	<tr>
			<td align="center" style="font:2.0em 宋体  ;color:black;font-weight: bold;padding:10px 0px 10px 0px; ">
			${ulBbsHuifu.title}
			<input type="hidden" value="${ulBbsHuifu.bbsHuatiId}" id="__bbsHuifuId"/>
			<input type="hidden" value="${__haveNextNewsFlag }" id="__haveNextNewsFlag"/>
		</td>
     </tr>
     	<tr>
		<td align="center" style="padding:0px 0px 10px 0px;">
			<font color="red">
				<fmt:formatDate value="${ulBbsHuifu.createtime}" pattern="yyyy-MM-dd HH:mm"/>
			</font>
			&nbsp;&nbsp;浏览次数:
			<font color="red">
				${ulBbsHuifu.liulanshu}
			</font>
			&nbsp;&nbsp;回复次数:
			<font color="red">
				${ulBbsHuifu.huifushu}
			</font>
		</td>
				<td style="width:300px;overflow:hidden; " align="right">
				(&nbsp;发布人:
			<font color="green">
				${ulBbsHuifu.appUser.username}
			</font>
				 )
		</td>
	</tr>
		<tr>
		<td align="left">
				&nbsp;&nbsp;内容:
			<font color="green">
				${ulBbsHuifu.content}
			</font>
				 
		</td>
		
	</tr>
	
</table>
