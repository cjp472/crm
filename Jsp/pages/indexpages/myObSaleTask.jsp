<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="org.apache.commons.lang.StringUtils,com.htsoft.core.util.DateUtil" %>
<%@ page import="orm.complex.query.framework.commtable.CommTable,orm.complex.query.framework.commtable.CommTableRecord" %>
<script language="text/javascript" >
$ImportSimpleJs(
		[__ctxPath + '/js/outb/YXtaskView.js',
			__ctxPath + '/js/outb/ObComTaskDelForm.js',
			__ctxPath + '/ext3/ux/TreeCombox.js',
			__ctxPath + '/js/outb/YXtaskForm.js',
			__ctxPath + '/js/outb/YXtaskDetailForm.js',
			__ctxPath + '/js/dingdan/DDhistory.js',
			__ctxPath + '/js/outb/YXtaskActionDetailForm.js',
			__ctxPath + '/js/outb/YXtaskActionForm.js',
			__ctxPath + '/js/outb/HeiMingDan.js',
			__ctxPath + '/js/outb/SendmailForm.js',
			__ctxPath + '/js/outb/YXtaskActionDetailForm.js',
			__ctxPath + '/js/selector/ScBizOrderSalesSelector.js',
			__ctxPath + '/js/task/addCalendarPlanForm.js'], function(){}, this);
  function showYXtaskForm(comId,assignTypeId,maxDiaNum,maxDiaSpace,isDiaTime){
	  var tabs = Ext.getCmp('centerTabPanel');
		var aForm = Ext.getCmp('YXtaskFormWin');
		if (aForm != null) {
			tabs.remove('YXtaskFormWin');
		}
		aForm = new YXtaskForm({
					comId :comId,
					assignTypeId : assignTypeId,
					maxDiaNum : maxDiaNum,
					maxDiaSpace : maxDiaSpace,
					isDiaTime : isDiaTime
				});
		tabs.add(aForm);
		tabs.activate(aForm);
  }
</script>

<div class="contentDiv">
<%
	CommTable cTable = null;
	cTable = (CommTable)request.getAttribute("cTable");
%>
<table class="newsList" cellpadding="0" cellspacing="0" rules="rows">
	<%
		if(null!=cTable) {
			int iCount = cTable.getRecordCount();
			for(int i=0;i<iCount;i++) {
			String comName = StringUtils.trimToEmpty(cTable.getRecord(i).get("OB_COM_NAM"));
			String comType = StringUtils.trimToEmpty(cTable.getRecord(i).get("BIZ_TYPE_NAME"));
			String startTime = StringUtils.trimToEmpty(cTable.getRecord(i).get("STA_DAT"));
			String endTime = StringUtils.trimToEmpty(cTable.getRecord(i).get("END_DAT"));
			
			String comId = StringUtils.trimToEmpty(cTable.getRecord(i).get("COM_ID"));
			String assignTypeId = cTable.getRecord(i).get("RUL_TYPE_ID");
			
			String maxDiaNum = cTable.getRecord(i).get("RUL_MAX_NUM");
			String maxDiaSpace = cTable.getRecord(i).get("RUL_MAX_SPACE");
			String isDiaTimeTmp = cTable.getRecord(i).get("RUL_DIA_TIME");
			String isDiaTime = "false";
			if("0".equals(isDiaTimeTmp)) {
				isDiaTime = "false";
			} else {
				isDiaTime = "true";
			}
			 
			
	%>

		<tr>
			<td width="80" nowrap="nowrap"><a href="#"><%=comType %></a></td>
			<td width="80" nowrap="nowrap"><a href="#" onclick="showYXtaskForm(<%=comId %>,<%=assignTypeId %>,<%=maxDiaNum %>,<%=maxDiaSpace %>,<%=isDiaTime %>);">
				<%=comName %></a></td>
			<td width="80" nowrap="nowrap"><a href="#"><%=DateUtil.getYMD(startTime) %></a></td>
			<td width="80" nowrap="nowrap"><a href="#"><%=DateUtil.getYMD(endTime) %></a></td>
		</tr>						
	<%		}
		}
	%>
</table>
</div>
<div class="moreDiv"><span><a href="#"
	onclick="App.clickTopTab('YXtaskView')">更多...</a></span></div>