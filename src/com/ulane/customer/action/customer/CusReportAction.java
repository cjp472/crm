package com.ulane.customer.action.customer;

import java.util.List;

import com.htsoft.core.web.action.BaseAction;
import com.htsoft.oa.model.system.AgentReport;
import com.opensymphony.xwork2.ActionSupport;
import com.ulane.customer.service.customer.CusReportService;

public class CusReportAction extends ActionSupport {
	
	private CusReportService cusReportService;
	
	private AgentReport agentReport;

	public CusReportService getCusReportService() {
		return cusReportService;
	}

	public void setCusReportService(CusReportService cusReportService) {
		this.cusReportService = cusReportService;
	}

	public AgentReport getAgentReport() {
		return agentReport;
	}

	public void setAgentReport(AgentReport agentReport) {
		this.agentReport = agentReport;
	}
	
	
	
	/**
	 * 获取报表数据List展示
	 * @return
	 */
	public String getAllReport() {
		System.out.println("111action --- > list");
		List list = cusReportService.getAllReport();
		System.out.println("222action --- > list"+list.size());
		return SUCCESS ;
	}
	
	
}
