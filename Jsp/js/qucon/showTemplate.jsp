<%@ page contentType="text/html; charset=utf-8" %>
<%@ page import="java.util.*,com.ulane.running.model.qucon.*" language="java"%>
<%!
	public String getRemark(Long id, QcCheck qc){
		if(qc != null){
			for(QcCheckDetail qcd : qc.getQcCheckDetails()){
				if(qcd.getQcTempTar().getTmpTarId().equals(id)){
					return qcd.getRemark();
				}
			}
		}
		return "";
	}
%> 
<%
	QcTemplate qt = (QcTemplate)request.getAttribute("template");
	QcCheck qc = (QcCheck)request.getAttribute("check");
	String name = qt.getTmpName();
	StringBuffer ids_bs = new StringBuffer(); 
	for(QcTempTar tmp : qt.getQcTempTars()){
		Short typeValue = tmp.getQcTempChapcter().getType();
		if(!typeValue.equals(QcTempChapcter.YANZHONG)){
			String type = typeValue.equals(QcTempChapcter.ADD) ? "+" : "-";
			ids_bs.append(tmp.getTmpTarId() + "@" + type + ",");
		}else{
			String type = "#";
			ids_bs.append(tmp.getTmpTarId() + "@" + type + ",");
		}
	}
	String ids = ids_bs.toString();
	int scoreNum = qt.getQcScoreOpts().size();
	int colNum = 2 + scoreNum;
	if(qt.getAllowRemark().equals(QcTemplate.YES)){
		colNum++;
	}
	if(qt.getAllowTarRemark().equals(QcTemplate.YES)){
		colNum++;
	}
	if(qt.getChkTypeId().equals(QcTemplate.SCORE_INPUT)){
		colNum++;
	}
	String type = qt.getChkTypeId().equals(QcTemplate.SCORE_OPT) ? "opt" : "input";
%>
<style>
	*{
		font:12px arial,tahoma,helvetica,sans-serif
	}
</style>
<body onload="disInput()">
<form id="kaohe" method="post" target="result">
<input type="hidden" value="<%=ids %>" name="ids" id="ids">
<input type="hidden" value="<%=qt.getMinScore() %>" id="min">
<input type="hidden" value="<%=qt.getBaseScore() %>" id="basic">
<input type="hidden" value="<%=type %>" id="type">
<input type="hidden" name="qcCheck.confirmResult" value="<%=qt.getAllowRecheck() %>">
<input type="hidden" name="qcCheck.chkResult" id="chkResult">
<input type="hidden" value="<%=request.getAttribute("disable") %>" id="disable">
<table class="bordertable" width="100%" align="center">
	<tr class="head">
		<td style="font-size:16px" colspan="<%=colNum %>"><%=name %></td>
	</tr>
	<!-- 表头字段 -->
	<tr class="head">
		<td width="50%" colspan="2">评分项目</td>
		<%if(qt.getAllowTarRemark().equals(QcTemplate.YES)){%>
			<td width="10%">说明</td>
		<%} %>
		<%if(qt.getChkTypeId().equals(QcTemplate.SCORE_OPT)){ %>
			<%for(QcScoreOpt qso : qt.getQcScoreOpts()){ %>
		<td width="4%"><%=qso.getOptName() %></td>
			<%} %>
		<%}else{ %>
		<td width="15%" colspan="<%=scoreNum %>">分值</td>
		<%} %>
		<%if(qt.getAllowRemark().equals(QcTemplate.YES)){%>
		<td>备注</td>
		<%} %>
	</tr>
	<!-- 表数据 -->
	<%for(QcTempChapcter qtc : qt.getQcTempChapcters()){ %>
	<tr class="header">
		<td colspan="<%=colNum %>" style="text-align: left;background-color:#f1f1f1;"><%=qtc.getCatName() %></td>
	</tr>
		<%for(QcTempTar qtt : qtc.getQcTempTars()){ %>
	<tr>
	<td width="60%" style="text-align: left;" colspan="2">
		<span style="padding-left:15px;"><%=qtt.getQcTarget().getTarTopic() %></span>
	</td>
	<%if(qt.getAllowTarRemark().equals(QcTemplate.YES)){%>
		<td><span><%=qtt.getQcTarget().getTarContent() %></span></td>
	<%} %>
	<!-- 核心部分的html代码  均在QcTemplateAction.showTemplate中调用setQcHTML配置 -->
	<%=qtt.getQcHTML() %>
	
	<%if(qt.getAllowRemark().equals(QcTemplate.YES)){%>
		<td><input type="text" style="width:90%" name="remark_<%=qtt.getTmpTarId() %>" 
			value="<%=getRemark(qtt.getTmpTarId(), qc) %>"/></td>
	<%} %>
	</tr>
		<%}%>
	<%}%>
	
	<tr class="header">
		<td style="text-align: right" width="30%">总分</td>
		<td colspan="<%=colNum-1 %>">
			<span id="score">
			<%=qc != null ? qc.getChkResult() : qt.getBaseScore() %></span>/
			<span id="max"><%=qt.getMaxScore() %></span>
		</td>
	</tr>
	<tr class="header">
		<td style="text-align: right" width="30%">总体评语</td>
		<td colspan="<%=colNum-1 %>">
			<textarea name="qcCheck.chkSummary" style="width:90%"><%=qc != null ? qc.getChkSummary(): "" %></textarea></td>
	</tr>
	<tr class="header">
		<td style="text-align: right" width="30%">沟通内容</td>
		<td colspan="<%=colNum-1 %>">
			<textarea style="width:90%"><%=qc != null ? qc.getConfirmRemark(): "" %></textarea></td>
	</tr>
</table>
<iframe id="forres" name="result" src="" style="display:none"></iframe>
</form>
</body>