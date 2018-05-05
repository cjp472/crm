<%@page pageEncoding="UTF-8" import="com.htsoft.core.util.AppUtil"%>
<%@taglib prefix="s" uri="/struts-tags"%>
var __ctxPath='<%=request.getContextPath() %>';
var __fullPath='<%=request.getScheme() + "://" + request.getHeader("host") +  request.getContextPath()%>';
var __name='<s:property value="%{getText('name')}"/>';
var __sex='<s:property value="%{getText('sex')}"/>';

var __save='<s:property value="%{getText('save')}"/>';
var __reset='<s:property value="%{getText('reset')}"/>';
var __cancel='<s:property value="%{getText('cancel')}"/>';
var __search='<s:property value="%{getText('search')}"/>';
var __action='<s:property value="%{getText('action')}"/>';
var __delete='<s:property value="%{getText('delete')}"/>';
var __edit='<s:property value="%{getText('edit')}"/>';
var __create='<s:property value="%{getText('create')}"/>';
var __advancedSearch='<s:property value="%{getText('advancedSearch')}"/>';
var __yes='<s:property value="%{getText('yes')}"/>';
var __no='<s:property value="%{getText('no')}"/>';
var __toastMessage='<s:property value="%{getText('toast.message')}"/>';
var __success='<s:property value="%{getText('success')}"/>';
var __operationFailed='<s:property value="%{getText('operation.failed')}"/>';
<!-- add by zhangh -->
var __operationsuccess = '<s:property value="%{getText('operation.success')}"/>';
var __add = '<s:property value="%{getText('add')}"/>';
var __enable = '<s:property value="%{getText('enable')}"/>';
var __status = '<s:property value="%{getText('status')}"/>';
var __reload = '<s:property value="%{getText('reload')}"/>';
var __expand = '<s:property value="%{getText('expand')}"/>';
var __collapse = '<s:property value="%{getText('collapse')}"/>';
var __noData = '<s:property value="%{getText('noData')}"/>';



var __treepanelRefresh='<s:property value="%{getText('treepanel.refresh')}"/>';
var __treepanelEpand='<s:property value="%{getText('treepanel.epand')}"/>';
var __treepanelCollapse='<s:property value="%{getText('treepanel.collapse')}"/>';
var __treepanelAll='<s:property value="%{getText('treepanel.all')}"/>';
var __treepanelNone='<s:property value="%{getText('treepanel.none')}"/>';
var __maskLoading='<s:property value="%{getText('mask.loading')}"/>';


var __interface = {
	url : '<%=AppUtil.getSysConfig().get("interface_url") %>',
	url_pic : '<%=AppUtil.getSysConfig().get("interface_pic_url") %>',
	sys : '<%=AppUtil.getSysConfig().get("interface_sys") %>',
	account : '<%=AppUtil.getSysConfig().get("interface_account") %>',
	password : '<%=AppUtil.getSysConfig().get("interface_password") %>'
};

var __company = '<%=AppUtil.getCompanyName() %>';



<!-- 服务器地址信息  -->
var __fileAttachServer = '<%=AppUtil.getSysConfig().get("file_attach_server") %>';