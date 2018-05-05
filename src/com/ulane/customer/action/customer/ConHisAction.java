package com.ulane.customer.action.customer;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
 */
import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.Set;
import java.util.regex.Pattern;

import javax.annotation.Resource;
import javax.mail.Address;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;
import javax.swing.filechooser.FileFilter;
import javax.swing.filechooser.FileNameExtensionFilter;

import oracle.net.aso.a;
import oracle.net.aso.e;
import oracle.net.aso.r;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.kahadb.util.DiskBenchmark.Report;
import org.apache.struts2.ServletActionContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import sun.awt.AppContext;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.StringReader;

import com.google.common.base.Function;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.htsoft.core.service.GenericService;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.util.DateUtil;
import com.htsoft.core.util.JsonUtil;

import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.jbpm.pv.TaskInfo;
import com.htsoft.core.model.TaskLink;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.core.web.paging.PagingBean;

import com.htsoft.oa.model.customer.BankType;
import com.htsoft.oa.model.system.AgentReport;
import com.htsoft.oa.model.system.AppRole;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.model.system.DepUsers;
import com.htsoft.oa.model.system.Department;
import com.htsoft.oa.model.system.Region;

import com.opensymphony.xwork2.ActionContext;
import com.raq.dataserver.jdbc.Request;

import com.ulane.base.model.info.QJContractHZRecord;
import com.ulane.base.model.info.QJContractRecordId;
import com.ulane.base.model.info.QJAddCard;
import com.ulane.base.model.info.QJIssueCard;
import com.ulane.base.model.info.QJTransferAccounts;
import com.ulane.base.model.xitong.Equipment;
import com.ulane.core.plugin.soap.impl.ConHisSoapServerImpl;
import com.ulane.customer.model.customer.CTI_AfterWork_Info;
import com.ulane.customer.model.customer.CTI_Call_Info;
import com.ulane.customer.model.customer.CTI_Login_Info;
import com.ulane.customer.model.customer.CTI_Rest_Info;
import com.ulane.customer.model.customer.CTI_Ringing_Info;
import com.ulane.customer.model.customer.CallIdOrAgentInfo;
import com.ulane.customer.model.customer.ConAttach;
import com.ulane.customer.model.customer.ConHis;
import com.ulane.customer.model.customer.Count;
import com.ulane.customer.model.customer.EveryDayReport;
import com.ulane.customer.model.customer.Examine;
import com.ulane.customer.model.customer.MachineSelf;
import com.ulane.customer.model.customer.MachineSelfAttach;
import com.ulane.customer.model.customer.OperationData;
import com.ulane.customer.model.customer.ReportView;
import com.ulane.customer.model.customer.SysWorkattendance;
import com.ulane.customer.service.customer.ConAttachService;
import com.ulane.customer.service.customer.ConHisService;

import com.ulane.know.model.know.UkKnowTemplate;
import com.ulane.know.model.know.UkKnowType;

import flexjson.JSONSerializer;
import flexjson.transformer.DateTransformer;

/**
 * 
 * @author cf0666@gmail.com
 * 
 */
public class ConHisAction extends BaseAction {
	@Resource
	private ConHisService conHisService;
	@SuppressWarnings("unused")
	@Resource
	private ConAttachService conAttachService;

	// ------------
	@SuppressWarnings( { "unchecked", "unused" })
	private GenericService genericService;
	// ------------

	private ConHis conHis;

	private AgentReport agentReport;

	public AgentReport getAgentReport() {
		return agentReport;
	}

	public void setAgentReport(AgentReport agentReport) {
		this.agentReport = agentReport;
	}

	private Long conHisId;

	public Long getConHisId() {
		return conHisId;
	}

	public void setConHisId(Long conHisId) {
		this.conHisId = conHisId;
	}

	public ConHis getConHis() {
		return conHis;
	}

	public void setConHis(ConHis conHis) {
		this.conHis = conHis;
	}

	private BankType bankType;

	private Long bankTypeId;

	private Long parentId;

	public Long getParentId() {
		return parentId;
	}

	public void setParentId(Long parentId) {
		this.parentId = parentId;
	}

	public Long getBankTypeId() {
		return bankTypeId;
	}

	public void setBankTypeId(Long bankTypeId) {
		this.bankTypeId = bankTypeId;
	}

	public BankType getBankType() {
		return bankType;
	}

	public void setBankType(BankType bankType) {
		this.bankType = bankType;
	}

	/**
	 * 显示列表
	 */
	public String list() {

		AppUser currentUser = ContextUtil.getCurrentUser();
		Long userid = currentUser.getUserId();
		QueryFilter filter = new QueryFilter(getRequest()); // ---------->com.htsoft.core.command.QueryFilter@6ea3721e
		filter.addSorted("conHisId", "DESC");// System.out.pritln();
		List<ConHis> list = conHisService.getAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(filter.getPagingBean().getTotalItems()).append(
						",result:[");
		JSONSerializer serializer = JsonUtil.getJSONSerializer();
		serializer.transform(new DateTransformer("yyyy-MM-dd HH:mm:ss"),
				new String[] { "staTime", "endTime", "createDate" });
		for (ConHis conHis : list) {
			buff.append(serializer.include("conAttachs.cusName",
					"conAttachs.credNum", "conAttachs.terminalId",
					"conAttachs.createBy", "conAttachs.fileType",
					"conAttachs.createDate").exclude("conAttachs.conHis")
					.serialize(conHis));
			buff.deleteCharAt(buff.length() - 1); // 去掉最后的大括号
			buff.append(",\"contactNusm\":\"")
					.append(conHis.getPreContactNum()).append("-").append(
							conHis.getMainContactNum()).append("-").append(
							conHis.getLastContactNum()).append("\"");
			buff.append("},");
		}
		if (list.size() > 0) {
			buff.deleteCharAt(buff.length() - 1); // 去掉最后的,号
		}
		buff.append("]}");

		jsonString = buff.toString();
		return SUCCESS;
	}

	/**
	 * 显示列表
	 */

	/**
	 * HY 2013/12/25 报表内容 <展现所有的表数据，getAll>
	 * 
	 * @return String：SUCCESS
	 */
	public String getAllReport() {
		List<ReportView> reportsList = new ArrayList<ReportView>();
		StringBuffer buff = new StringBuffer("[");
		try {
			String reportInfo = getRequest().getParameter("ReportInfo");
			if (reportInfo.equals("all")) { // 如果参数ID传0 查询出所有表数据
				reportsList = conHisService.getReportAll("All");
				for (int i = 0; i < reportsList.size(); i++) {
					if (reportsList.get(i).getId().getLiyonglv().equals("1")|| reportsList.get(i).getId().getLiyonglv().equals("0")) {
						if (reportsList.get(i).getId().getLiyonglv().equals("1")) {
							reportsList.get(i).getId().setLiyonglv("100%");
						}
					} else {
						if (reportsList.get(i).getId().getLiyonglv().toString().split("[.]")[0].length() >= 1) {
							reportsList.get(i).getId().setLiyonglv("100%");
						} else {
							reportsList.get(i).getId().setLiyonglv(returnMasString(reportsList.get(i).getId().getLiyonglv().toString().split("[.]")[1]));
						}
					}
					if (reportsList.get(i).getId().getZongliyonglv().equals("1")|| reportsList.get(i).getId().getZongliyonglv().equals("0")) {
						if (reportsList.get(i).getId().getZongliyonglv().equals("1")) {
							reportsList.get(i).getId().setZongliyonglv("100%");
						}
					} else {
						if (reportsList.get(i).getId().getZongliyonglv().toString().split("[.]")[0].length() >= 1) {
							reportsList.get(i).getId().setZongliyonglv("100%");
						} else {
							reportsList.get(i).getId().setZongliyonglv(returnMasString(reportsList.get(i).getId().getZongliyonglv().toString().split("[.]")[1]));
						}
					}
					if (reportsList.get(i).getId().getKeyonglv().equals("1")|| reportsList.get(i).getId().getKeyonglv().equals("0")) {
						if (reportsList.get(i).getId().getKeyonglv().equals("1")) {
							reportsList.get(i).getId().setKeyonglv("100%");
						}
					} else {
						if (reportsList.get(i).getId().getKeyonglv().toString().split("[.]")[0].length() >= 1) {
							reportsList.get(i).getId().setKeyonglv("100%");
						} else {
							reportsList.get(i).getId().setKeyonglv(returnMasString(reportsList.get(i).getId().getKeyonglv().toString().split("[.]")[1]));
						}
					}
					if (reportsList.get(i).getId().getEndinboundcountlv().equals("1")|| reportsList.get(i).getId().getEndinboundcountlv().equals("0")) {
						if (reportsList.get(i).getId().getEndinboundcountlv().equals("1")) {
							reportsList.get(i).getId().setEndinboundcountlv("100%");
						}
					} else {
						if (reportsList.get(i).getId().getEndinboundcountlv().toString().split("[.]")[0].length() >= 1) {reportsList.get(i).getId().setEndinboundcountlv("100%");
						} else {
							reportsList.get(i).getId().setEndinboundcountlv(returnMasString(
									reportsList.get(i).getId().getEndinboundcountlv().toString().split("[.]")[1]));
						}
					}
					buff.append("['" + reportsList.get(i).getId().getLoginname())
							.append("','"+ reportsList.get(i).getId().getEndinboundcount())
							.append("','"+ reportsList.get(i).getId().getAvaqueuecalltime())
							.append("','"+ reportsList.get(i).getId().getXmiaosucccount())
							.append("','"+ reportsList.get(i).getId().getQueuecount())
							.append("','"+ reportsList.get(i).getId().getInboundtime())
							.append("','"+ reportsList.get(i).getId().getAvagecalltime())
							.append("','"+ reportsList.get(i).getId().getAfterworktime())
							.append("','"+ reportsList.get(i).getId().getAvageafterworktime())
							.append("','"+ reportsList.get(i).getId().getKongxiantime())
							.append("','"+ reportsList.get(i).getId().getLeavetime())
							.append("','"+ reportsList.get(i).getId().getLsworktime())
							.append("','"+ reportsList.get(i).getId().getMeetingtime())
							.append("','"+ reportsList.get(i).getId().getManagertime())
							.append("','"+ reportsList.get(i).getId().getTraintime())
							.append("','"+ reportsList.get(i).getId().getNologintime())
							.append("','"+ reportsList.get(i).getId().getLiyonglv())
							.append("','"+ reportsList.get(i).getId().getZongliyonglv())
							.append("','"+ reportsList.get(i).getId().getKeyonglv())
							.append("','"+ reportsList.get(i).getId().getUnansweredcount())
							.append("','"+ reportsList.get(i).getId().getEndinboundcountlv())
							.append("'],");
				}
			} else { // 否则查询该有的条件数据
				reportsList = conHisService.getSomeOneReport(reportInfo);
				System.out.println("查询后台成功回到action层" + reportsList.size());
				for (int i = 0; i < reportsList.size(); i++) {
					if (reportsList.get(i).getId().getLiyonglv().equals("1")|| reportsList.get(i).getId().getLiyonglv().equals("0")) {
						if (reportsList.get(i).getId().getLiyonglv().equals("1")) {
							reportsList.get(i).getId().setLiyonglv("100%");
						}
					} else {
						if (reportsList.get(i).getId().getLiyonglv().toString().split("[.]")[0].length() >= 1) 
							reportsList.get(i).getId().setLiyonglv("100%");
						else 
							reportsList.get(i).getId().setLiyonglv(returnMasString(reportsList.get(i).getId().getLiyonglv().toString().split("[.]")[1]));
					}
					if (reportsList.get(i).getId().getZongliyonglv().equals("1")|| reportsList.get(i).getId().getZongliyonglv().equals("0")) {
						if (reportsList.get(i).getId().getZongliyonglv().equals("1")) {
							reportsList.get(i).getId().setZongliyonglv("100%");
						}
					} else {
						if (reportsList.get(i).getId().getZongliyonglv().toString().split("[.]")[0].length() >= 1) 
							reportsList.get(i).getId().setZongliyonglv("100%");
						 else 
							reportsList.get(i).getId().setZongliyonglv(returnMasString(reportsList.get(i).getId().getZongliyonglv().toString().split("[.]")[1]));
						
					}
					if (reportsList.get(i).getId().getKeyonglv().equals("1")|| reportsList.get(i).getId().getKeyonglv().equals("0")) {
						if (reportsList.get(i).getId().getKeyonglv().equals("1")) {
							reportsList.get(i).getId().setKeyonglv("100%");
						}
					} else {
						if (reportsList.get(i).getId().getKeyonglv().toString().split("[.]")[0].length() >= 1) 
							reportsList.get(i).getId().setKeyonglv("100%");
						 else 
							reportsList.get(i).getId().setKeyonglv(returnMasString(reportsList.get(i).getId().getKeyonglv().toString().split("[.]")[1]));
						
					}
					if (reportsList.get(i).getId().getEndinboundcountlv().equals("1")|| reportsList.get(i).getId().getEndinboundcountlv().equals("0")) {
						if (reportsList.get(i).getId().getEndinboundcountlv().equals("1")) {
							reportsList.get(i).getId().setEndinboundcountlv("100%");
						}
					} else {
						if (reportsList.get(i).getId().getEndinboundcountlv().toString().split("[.]")[0].length() >= 1) 
							reportsList.get(i).getId().setEndinboundcountlv("100%");
						 else 
							reportsList.get(i).getId().setEndinboundcountlv(returnMasString(reportsList.get(i).getId().getEndinboundcountlv().toString().split("[.]")[1]));
						
					}
					buff.append("['" + reportsList.get(i).getId().getLoginname())
						.append("','"+ reportsList.get(i).getId().getEndinboundcount())
						.append("','"+ reportsList.get(i).getId().getAvaqueuecalltime())
						.append("','"+ reportsList.get(i).getId().getXmiaosucccount())
						.append("','"+ reportsList.get(i).getId().getQueuecount())
						.append("','"+ reportsList.get(i).getId().getInboundtime())
						.append("','"+ reportsList.get(i).getId().getAvagecalltime())
						.append("','"+ reportsList.get(i).getId().getAfterworktime())
						.append("','"+ reportsList.get(i).getId().getAvageafterworktime())
						.append("','"+ reportsList.get(i).getId().getKongxiantime())
						.append("','"+ reportsList.get(i).getId().getLeavetime())
						.append("','"+ reportsList.get(i).getId().getLsworktime())
						.append("','"+ reportsList.get(i).getId().getMeetingtime())
						.append("','"+ reportsList.get(i).getId().getManagertime())
						.append("','"+ reportsList.get(i).getId().getTraintime())
						.append("','"+ reportsList.get(i).getId().getNologintime())
						.append("','"+ reportsList.get(i).getId().getLiyonglv())
						.append("','"+ reportsList.get(i).getId().getZongliyonglv())
						.append("','"+ reportsList.get(i).getId().getKeyonglv())
						.append("','"+ reportsList.get(i).getId().getUnansweredcount())
						.append("','"+ reportsList.get(i).getId().getEndinboundcountlv())
						.append("'],");
				}
			}
			System.out.println("try");
		} catch (Exception e) {
			reportsList = conHisService.getReportAll("100");
			System.out.println("try3333");
			if (reportsList != null) {
				for (int i = 0; i < reportsList.size(); i++) {
					if (reportsList.get(i).getId().getLiyonglv().equals("1") || reportsList.get(i).getId().getLiyonglv().equals("0")) {
						if (reportsList.get(i).getId().getLiyonglv().equals("1")) {
							reportsList.get(i).getId().setLiyonglv("100%");
						}
					} else {
						if (reportsList.get(i).getId().getLiyonglv().toString().split("[.]")[0].length() >= 1) {
							reportsList.get(i).getId().setLiyonglv("100%");
						} else {
							reportsList.get(i).getId().setLiyonglv(returnMasString(reportsList.get(i).getId().getLiyonglv().toString().split("[.]")[1]));
						}
					}
					if (reportsList.get(i).getId().getZongliyonglv().equals("1") || reportsList.get(i).getId().getZongliyonglv().equals("0")) {
						if (reportsList.get(i).getId().getZongliyonglv().equals("1")) {
							reportsList.get(i).getId().setZongliyonglv("100%");
						}
					} else {
						if (reportsList.get(i).getId().getZongliyonglv().toString().split("[.]")[0].length() >= 1) {
							reportsList.get(i).getId().setZongliyonglv("100%");
						} else {
							reportsList.get(i).getId().setZongliyonglv(returnMasString(reportsList.get(i).getId().getZongliyonglv().toString().split("[.]")[1]));
						}
					}
					if (reportsList.get(i).getId().getKeyonglv().equals("1") || reportsList.get(i).getId().getKeyonglv().equals("0")) {
						if (reportsList.get(i).getId().getKeyonglv().equals("1")) {
							reportsList.get(i).getId().setKeyonglv("100%");
						}
					} else {
						if (reportsList.get(i).getId().getKeyonglv().toString().split("[.]")[0].length() >= 1) {
							reportsList.get(i).getId().setKeyonglv("100%");
						} else {
							reportsList.get(i).getId().setKeyonglv(returnMasString(reportsList.get(i).getId().getKeyonglv().toString().split("[.]")[1]));
						}
					}
					if (reportsList.get(i).getId().getEndinboundcountlv().equals("1") || reportsList.get(i).getId().getEndinboundcountlv().equals("0")) {
						if (reportsList.get(i).getId().getEndinboundcountlv().equals("1")) {
							reportsList.get(i).getId().setEndinboundcountlv("100%");
						}
					} else {
						if (reportsList.get(i).getId().getEndinboundcountlv().toString().split("[.]")[0].length() >= 1) {
							reportsList.get(i).getId().setEndinboundcountlv("100%");
						} else {
							reportsList.get(i).getId().setEndinboundcountlv(returnMasString(reportsList.get(i).getId().getEndinboundcountlv().toString().split("[.]")[1]));
						}
					}
					buff.append(
							"['" + reportsList.get(i).getId().getLoginname())
							.append("','"+ reportsList.get(i).getId().getEndinboundcount())
							.append("','"+ reportsList.get(i).getId().getAvaqueuecalltime())
							.append("','"+ reportsList.get(i).getId().getXmiaosucccount())
							.append("','"+ reportsList.get(i).getId().getQueuecount())
							.append("','"+ reportsList.get(i).getId().getInboundtime())
							.append("','"+ reportsList.get(i).getId().getAvagecalltime())
							.append("','"+ reportsList.get(i).getId().getAfterworktime())
							.append("','"+ reportsList.get(i).getId().getAvageafterworktime())
							.append("','"+ reportsList.get(i).getId().getKongxiantime())
							.append("','"+ reportsList.get(i).getId().getLeavetime())
							.append("','"+ reportsList.get(i).getId().getLsworktime())
							.append("','"+ reportsList.get(i).getId().getMeetingtime())
							.append("','"+ reportsList.get(i).getId().getManagertime())
							.append("','"+ reportsList.get(i).getId().getTraintime())
							.append("','"+ reportsList.get(i).getId().getNologintime())
							.append("','"+ reportsList.get(i).getId().getLiyonglv())
							.append("','"+ reportsList.get(i).getId().getZongliyonglv())
							.append("','"+ reportsList.get(i).getId().getKeyonglv())
							.append("','"+ reportsList.get(i).getId().getUnansweredcount())
							.append("','"+ reportsList.get(i).getId().getEndinboundcountlv())
							.append("'],");
				}
			}
			System.out.println("catch");
			// TODO: handle exception
		}
		if (reportsList != null) {
			if (reportsList.size() > 0) {
				buff.deleteCharAt(buff.length() - 1);// 去掉最后的,号
			}
		}

		buff.append("]");
		System.out.println("setJsonString.buff.toStr.length>>>>>>>>"
				+ buff.length());
		setJsonString(buff.toString());
		return SUCCESS;
	}

	/**
	 * HY 2014/3/3 专用返回函数
	 * 
	 * @return String
	 */
	public String returnMasString(String info) {
		String str = "";
		if (info.length() == 4) {
			str = info.substring(0, 2).toString() + "."
					+ info.substring(2).toString();
			// 01.79%
			if (info.split("[.]")[0].equals("00")) {
				str = "0." + info.substring(2).toString();
			} else if (info.split("[.]")[0].indexOf("0") == 0) {
				str = info.substring(1, 2).toString() + "."
						+ info.substring(2).toString();
			}
		} else if (info.length() == 3) {
			str = info.substring(0, 2).toString() + "."
					+ info.substring(2).toString() + "0";
			if (info.split("[.]")[0].indexOf("0") == 0) {
				str = info.substring(1, 2).toString() + "."
						+ info.substring(2).toString() + "0";
			}
		} else if (info.length() == 2) {
			str = info + ".00";
		} else if (info.length() == 1) {
			str = info + "0.00";
		}
		// System.out.println("string info-----"+info+"%");
		return str + "%";
	}

	/**
	 * HY 2013/1/20 系统日报表内容 <按条件查询相应的数据>
	 * 
	 * @return String：SUCCESS
	 */
	public String getEveryDayReport() {
		System.out.println("getEveryDayReport Method");
		List<EveryDayReport> eveReports = new ArrayList<EveryDayReport>();
		StringBuffer buff = new StringBuffer("[");
		try {
			String eveRep = getRequest().getParameter("eveReport");
			System.out.println("request : " + eveRep);
			if (eveRep.equals("all")) {
				// 查询所有的数据
				eveReports = conHisService.getEveryDayReport("All");
				for (int i = 0; i < eveReports.size(); i++) {
					if (eveReports.get(i).getId().getSuccendinbountcall().equals("1") || eveReports.get(i).getId().getSuccendinbountcall().equals("0")) {
						if (eveReports.get(i).getId().getSuccendinbountcall().equals("1")) {
							eveReports.get(i).getId().setSuccendinbountcall("100%");
						}
					} else {
						// 调用字符串解析函数returnmasString(string info);
						eveReports.get(i).getId().setSuccendinbountcall(returnMasString(eveReports.get(i).getId().getSuccendinbountcall().substring(1).toString()));
					}
					// 格式化服务水平
					if (eveReports.get(i).getId().getFwshuiping().equals("1") || eveReports.get(i).getId().getFwshuiping().equals("0")) {
						if (eveReports.get(i).getId().getFwshuiping().equals("1")) {
							eveReports.get(i).getId().setFwshuiping("100%");
						}
					} else {
						// 调用字符串解析函数returnmasString(string info);
						if (eveReports.get(i).getId().getFwshuiping().toString().split("[.]")[0].length() >= 1) {
							eveReports.get(i).getId().setFwshuiping("100%");
						} else {
							eveReports.get(i).getId().setFwshuiping(returnMasString(eveReports.get(i).getId().getFwshuiping().toString().split("[.]")[1]));
						}
					}
					if (eveReports.get(i).getId().getLiyonglv().equals("1") || eveReports.get(i).getId().getLiyonglv().equals("0")) {
						if (eveReports.get(i).getId().getLiyonglv().equals("1")) {
							eveReports.get(i).getId().setLiyonglv("100%");
						}
					} else {
						// 调用字符串解析函数returnmasString(string info);
						if (eveReports.get(i).getId().getLiyonglv().toString().split("[.]")[0].length() >= 1) {
							eveReports.get(i).getId().setLiyonglv("100%");
						} else {
							eveReports.get(i).getId().setLiyonglv(returnMasString(eveReports.get(i).getId().getLiyonglv().toString().split("[.]")[1]));
						}
					}
					if (eveReports.get(i).getId().getKeyonglv().equals("1") || eveReports.get(i).getId().getKeyonglv().equals("0")) {
						if (eveReports.get(i).getId().getKeyonglv().equals("1")) {
							eveReports.get(i).getId().setKeyonglv("100%");
						}
					} else {
						// 调用字符串解析函数returnmasString(string info);
						if (eveReports.get(i).getId().getKeyonglv().toString().split("[.]")[0].length() >= 1) {
							eveReports.get(i).getId().setKeyonglv("100%");
						} else {
							eveReports.get(i).getId().setKeyonglv(returnMasString(eveReports.get(i).getId().getKeyonglv().toString().split("[.]")[1]));
						}
					}
					buff.append("['" + eveReports.get(i).getId().getBothtime())
							.append("','"+ eveReports.get(i).getId().getLogincount())
							.append("','"+ eveReports.get(i).getId().getFwshuiping())
							.append("','"+ eveReports.get(i).getId().getEndinboundcount())
							.append("','"+ eveReports.get(i).getId().getQueueendcallcount())
							.append("','"+ eveReports.get(i).getId().getSuccendinbountcall())
							.append("','"+ eveReports.get(i).getId().getAveragecalltime())
							.append("','"+ eveReports.get(i).getId().getAvaafterworktime())
							.append("秒','"+ eveReports.get(i).getId().getLiyonglv())
							.append("','"+ eveReports.get(i).getId().getKeyonglv())
							.append("','"+ eveReports.get(i).getId().getAvaqueuetime())
							.append("秒','"+ eveReports.get(i).getId().getMaxqueuetime())
							.append("秒','"+ eveReports.get(i).getId().getSixtyreturn())
							.append("'],");
				}
			} else {
				// 按条件查询数据
				eveReports = conHisService.getEveryDayReportByDay(eveRep);
				for (int i = 0; i < eveReports.size(); i++) {
					if (eveReports.get(i).getId().getSuccendinbountcall().equals("1") || eveReports.get(i).getId().getSuccendinbountcall().equals("0")) {
						if (eveReports.get(i).getId().getSuccendinbountcall().equals("1")) {
							eveReports.get(i).getId().setSuccendinbountcall("100%");
						}
					} else {
						// 调用字符串解析函数returnmasString(string info);
						eveReports.get(i).getId().setSuccendinbountcall(returnMasString(eveReports.get(i).getId().getSuccendinbountcall().substring(1).toString()));
					}
					// 格式化服务水平
					if (eveReports.get(i).getId().getFwshuiping().equals("1") || eveReports.get(i).getId().getFwshuiping().equals("0")) {
						if (eveReports.get(i).getId().getFwshuiping().equals("1")) {
							eveReports.get(i).getId().setFwshuiping("100%");
						}
					} else {
						// 调用字符串解析函数returnmasString(string info);
						if (eveReports.get(i).getId().getFwshuiping().toString().split("[.]")[0].length() >= 1) {
							eveReports.get(i).getId().setFwshuiping("100%");
						} else {
							eveReports.get(i).getId().setFwshuiping(returnMasString(eveReports.get(i).getId().getFwshuiping().toString().split("[.]")[1]));
						}
					}
					if (eveReports.get(i).getId().getLiyonglv().equals("1") || eveReports.get(i).getId().getLiyonglv().equals("0")) {
						if (eveReports.get(i).getId().getLiyonglv().equals("1")) {
							eveReports.get(i).getId().setLiyonglv("100%");
						}
					} else {
						// 调用字符串解析函数returnmasString(string info);
						if (eveReports.get(i).getId().getLiyonglv().toString().split("[.]")[0].length() >= 1) {
							eveReports.get(i).getId().setLiyonglv("100%");
						} else {
							eveReports.get(i).getId().setLiyonglv(returnMasString(eveReports.get(i).getId().getLiyonglv().toString().split("[.]")[1]));
						}
					}
					if (eveReports.get(i).getId().getKeyonglv().equals("1") || eveReports.get(i).getId().getKeyonglv().equals("0")) {
						if (eveReports.get(i).getId().getKeyonglv().equals("1")) {
							eveReports.get(i).getId().setKeyonglv("100%");
						}
					} else {
						// 调用字符串解析函数returnmasString(string info);
						if (eveReports.get(i).getId().getKeyonglv().toString().split("[.]")[0].length() >= 1) {
							eveReports.get(i).getId().setKeyonglv("100%");
						} else {
							eveReports.get(i).getId().setKeyonglv(returnMasString(eveReports.get(i).getId().getKeyonglv().toString().split("[.]")[1]));
						}
					}
					buff.append("['" + eveReports.get(i).getId().getBothtime())
							.append("','"+ eveReports.get(i).getId().getLogincount())
							.append("','"+ eveReports.get(i).getId().getFwshuiping())
							.append("','"+ eveReports.get(i).getId().getEndinboundcount())
							.append("','"+ eveReports.get(i).getId().getQueueendcallcount())
							.append("','"+ eveReports.get(i).getId().getSuccendinbountcall())
							.append("','"+ eveReports.get(i).getId().getAveragecalltime())
							.append("','"+ eveReports.get(i).getId().getAvaafterworktime())
							.append("秒','"+ eveReports.get(i).getId().getLiyonglv())
							.append("','"+ eveReports.get(i).getId().getKeyonglv())
							.append("','"+ eveReports.get(i).getId().getAvaqueuetime())
							.append("秒','"+ eveReports.get(i).getId().getMaxqueuetime())
							.append("秒','"+ eveReports.get(i).getId().getSixtyreturn())
							.append("'],");
				}
			}

		} catch (Exception e) {
			// TODO: handle exception
			eveReports = conHisService.getEveryDayReport("100");
			for (int i = 0; i < eveReports.size(); i++) {
				if (eveReports.get(i).getId().getSuccendinbountcall().equals("1") || eveReports.get(i).getId().getSuccendinbountcall().equals("0")) {
					if (eveReports.get(i).getId().getSuccendinbountcall().equals("1")) {
						eveReports.get(i).getId().setSuccendinbountcall("100%");
					}
				} else {
					// 调用字符串解析函数returnmasString(string info);
					eveReports.get(i).getId().setSuccendinbountcall(returnMasString(eveReports.get(i).getId().getSuccendinbountcall().substring(1).toString()));
				}
				// 格式化服务水平
				if (eveReports.get(i).getId().getFwshuiping().equals("1") || eveReports.get(i).getId().getFwshuiping().equals("0")) {
					if (eveReports.get(i).getId().getFwshuiping().equals("1")) {
						eveReports.get(i).getId().setFwshuiping("100%");
					}
				} else {
					// 调用字符串解析函数returnmasString(string info);
					if (eveReports.get(i).getId().getFwshuiping().toString().split("[.]")[0].length() >= 1) {
						eveReports.get(i).getId().setFwshuiping("100%");
					} else {
						eveReports.get(i).getId().setFwshuiping(returnMasString(eveReports.get(i).getId().getFwshuiping().toString().split("[.]")[1]));
					}
				}
				if (eveReports.get(i).getId().getLiyonglv().equals("1") || eveReports.get(i).getId().getLiyonglv().equals("0")) {
					if (eveReports.get(i).getId().getLiyonglv().equals("1")) {
						eveReports.get(i).getId().setLiyonglv("100%");
					}
				} else {
					// 调用字符串解析函数returnmasString(string info);
					if (eveReports.get(i).getId().getLiyonglv().toString().split("[.]")[0].length() >= 1) {
						eveReports.get(i).getId().setLiyonglv("100%");
					} else {
						eveReports.get(i).getId().setLiyonglv(returnMasString(eveReports.get(i).getId().getLiyonglv().toString().split("[.]")[1]));
					}
				}
				if (eveReports.get(i).getId().getKeyonglv().equals("1") || eveReports.get(i).getId().getKeyonglv().equals("0")) {
					if (eveReports.get(i).getId().getKeyonglv().equals("1")) {
						eveReports.get(i).getId().setKeyonglv("100%");
					}
				} else {
					// 调用字符串解析函数returnmasString(string info);
					if (eveReports.get(i).getId().getKeyonglv().toString().split("[.]")[0].length() >= 1) {
						eveReports.get(i).getId().setKeyonglv("100%");
					} else {
						eveReports.get(i).getId().setKeyonglv(returnMasString(eveReports.get(i).getId().getKeyonglv().toString().split("[.]")[1]));
					}
				}
				buff
						.append("['" + eveReports.get(i).getId().getBothtime())
						.append("','"+ eveReports.get(i).getId().getLogincount())
						.append("','"+ eveReports.get(i).getId().getFwshuiping())
						.append("','"+ eveReports.get(i).getId().getEndinboundcount())
						.append("','"+ eveReports.get(i).getId().getQueueendcallcount())
						.append("','"+ eveReports.get(i).getId().getSuccendinbountcall())
						.append("','"+ eveReports.get(i).getId().getAveragecalltime())
						.append("','"+ eveReports.get(i).getId().getAvaafterworktime())
						.append("秒','"+ eveReports.get(i).getId().getLiyonglv())
						.append("','" + eveReports.get(i).getId().getKeyonglv())
						.append("','"+ eveReports.get(i).getId().getAvaqueuetime())
						.append("秒','"+ eveReports.get(i).getId().getMaxqueuetime())
						.append("秒','"+ eveReports.get(i).getId().getSixtyreturn())
						.append("'],");
			}
		}
		if (eveReports.size() > 0) {
			buff.deleteCharAt(buff.length() - 1);// 去掉最后的,号
		}
		buff.append("]");
		System.out.println("setJsonString(buff.toStr.length>>>>>>>>" + buff);
		setJsonString(buff.toString());
		return SUCCESS;
	}

	/**
	 * HY 2014/01/20 stringbuffer 拼接
	 */
	public String everyDayBuffer(int i) {
		System.out.println("count = 0  ->  OK");
		return SUCCESS;
	}

	/**
	 * 打印Excel 表格
	 */
	public String print() {
		System.out.println("print----------------");
		return SUCCESS;
	}

	/**
	 * 存储相应的Callid以及对应座席编号 2014/04/22
	 * 
	 * @author Mr.Hu
	 */
	public String saveCallIDorAgentID() {
		try {
			String callid = getRequest().getParameter("callID");
			String agentid = getRequest().getParameter("agentID");
			String machineid = getRequest().getParameter("machineID");
			conHisService.saveCallIdOrAgentId(callid, agentid, machineid);
		} catch (Exception e) {
			System.out.println("catch");
		}
		return SUCCESS;
	}

	/**
	 * 批量删除
	 * 
	 * @return
	 */
	public String multiDel() {

		String[] ids = getRequest().getParameterValues("ids");
		if (ids != null) {
			for (String id : ids) {
				conHisService.remove(new Long(id));
			}
		}

		jsonString = "{success:true}";

		return SUCCESS;
	}

	/**
	 * 此动作会在每次访问此目录时执行。存在影响响应时间的风险，此风险依据文件多少，一般不超过1个，忽略风险。同时需保证多线程的同步机制，防止误删。
	 * */
	synchronized static boolean delete_when_begin() {
		System.out.println("#now:"
				+ new SimpleDateFormat("hh:mm:ss").format(new Date()));
		try {
			String tFilePath = Thread.currentThread().getContextClassLoader()
					.getResource("").toString().substring(5).split("WEB-INF")[0];
			/** 先删除此目录中的pdf文件。 */
			File pdf_dir = new File(tFilePath + "attachFiles/temp/");
			FileFilter ff = new FileNameExtensionFilter(null, "pdf");// doc未扩展
			for (File pdf_file : pdf_dir.listFiles()) {
				if (ff.accept(pdf_file)) {

					pdf_file.delete();
					System.out.println("#delete:" + pdf_file.getName());
				}
			}
			// java.util.Date date = new java.util.Date();
			// date.setMinutes(new java.util.Date().getSeconds() + 10);
			// while(true){
			// System.out.println( "#now in while...");
			// if(!new java.util.Date().before(date))
			// break;
			// }
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	/**
	 * 显示详细信息
	 * 
	 * @return
	 */
	public String get() {
		ConHis conHis = conHisService.get(conHisId);
		String bobShare = getRequest().getParameter("bobShare");
		logger.debug("share:" + bobShare);
		// tmpFP:缓存截取的文件名+后缀PT001201212201220.pdf;tmpdir缓存映射后的目录;wav缓存此conhis的唯一录音路径;
		// allvideo存放所有视频文件路径（绝对），已“，”分隔。
		String tFilePath = "", tmpFP = "", tmpdir = "", wav = "", allVideo = "";
		/**
		 * 此补丁用于：
		 * 1、修复保存联络历史时，子表con_attach中的cus_name和cred_num、terminalid字段未保存，保存在了
		 * 主表con_his中，导致在获取明细时这两个字段为空。
		 * 2、修复文件路径。【针对北京银行的业务需求而添加，建议添加一个字段标示来区分是否需要此操作】
		 * 由于文件需要每天按照交易号进行跑批分类，导致原来的文件物理被修改。此时获取
		 * 的联络历史文件路径不是真实的物理路径，需要按照北京银行的交易号进行物理路径映射。
		 * 从/D:/XXXX/XXXXX/PT001201212201220.pdf到result:
		 * $(share)/2012/12/20/T001201212201220/PT001201212201220.pdf
		 * $(share)为网络共享目录。采用在前端取读agent.config方式，便于配置。 Begin：
		 * */
		try {
			for (ConAttach cona : conHis.getConAttachs()) {
				cona.setCusName(conHis.getCusName());
				cona.setCredNum(conHis.getCredNum());
				/**
				 * 针对每一个附件记录进行路径映射。除了音频文件格式外，其他都类似PT001201212201220.pdf。17位名字加后缀
				 * ，总长为21位， 兼容后缀不统一的情况，最多为22位。截取前5位，进行路径映射 注意：
				 * 1、存放联络历史时，转换了路径分隔符。\ --> / 2、格式校验依次精准：
				 * Pattern.matches("\\d{12}","201212201220")
				 * Pattern.matches("[1-9][0-9]{3}\\d{4}\\d{4}","201212201220")
				 * Pattern.matches(
				 * "[1-9][0-9]{3}([0][1-9]|(10|11|12))([0][1-9]|[1-2][0-9]|3[0-1])\\d{4}"
				 * ,"201212201220") Pattern.matches("[1-9][0-9]{3}([0][1-9]|(10|11|12))([0][1-9]|[1-2][0-9]|3[0-1])(0[0-9]|1[0-9]|2[0-4])([0-5][0-9]|60])"
				 * ,"201212201220")
				 * */
				tFilePath = cona.getFilePath();

				logger.debug("第一个：" + tFilePath);
				try {
					if (tFilePath != "" && tFilePath != "/"
							&& !"/".equals(tFilePath)) {
						// 音频文件dealno + "," +
						// http://120.2.1.10:8080/ss/aaa/PT001201212201220w303020a30201012312adasd.mp3
						boolean mp3 = false;
						if (tFilePath.indexOf(",") >= 0) {
							tmpdir = tFilePath.split(",")[1];
							wav = tFilePath.split(",")[1];
							tmpFP = tFilePath.split(",")[0]
									+ tmpdir.split("/")[tmpdir.split("/").length - 1];
							tmpFP = tmpFP.replaceAll("[/|//|\\|\\\\]", "");
							logger.debug("indexOf:,==>" + tmpFP);
							tFilePath = tmpFP.substring(5, 17);// PT001201212201220.pdf
																// -->
																// 201212201220
							System.out.println("mp3:" + tFilePath);
							logger.debug("mp3:" + tFilePath);
							tmpdir = "";
							mp3 = true;

						} else {
							tmpFP = tFilePath.split("/")[tFilePath.split("/").length - 1];
							System.out.println(tmpFP);
							logger.debug(tmpFP);
							tFilePath = tmpFP.substring(5, 17);// PT001201212201220.pdf
																// -->
																// 201212201220
							logger.debug("第2个：" + tFilePath);
						}

						if (Pattern
								.matches(
										"[1-9][0-9]{3}([0][1-9]|(10|11|12))([0][1-9]|[1-2][0-9]|3[0-1])\\d{4}",
										tFilePath)) {
							tmpdir = "/" + tFilePath.substring(0, 4) + "/"
									+ tFilePath.substring(4, 6) + "/"
									+ tFilePath.substring(6, 8) + "/"
									+ tmpFP.substring(1, 17) + "/";
							if (!mp3) {// 发现预览pdf文件时，pdf必须在服务器上，否则访问拒绝。
								if ("pdf".equalsIgnoreCase(tmpFP.substring(18,
										21))) {// 如果是pdf，请求copy至服务器目录下
									/** 假设获得了${share} */
									tFilePath = bobShare + tmpdir + tmpFP;// 获得文件的真是路径
									try {
										String str = new String();
										StringBuffer sb = new StringBuffer();
										byte[] tbyte = new byte[1024];
										FileInputStream fis = new FileInputStream(tFilePath);
										BufferedInputStream bis = new BufferedInputStream(fis);
										tFilePath = Thread.currentThread()
												.getContextClassLoader()
												.getResource("").toString()
												.substring(5).split("WEB-INF")[0];
										/** 先删除此目录中的pdf文件 **/
										delete_when_begin();

										// tFilePath + "attachFiles/temp/" +
										// tmpFP 存放在应用中
										// 。前端conhisform访问时，依据相对路径即可。[././attachFiles/temp/]
										// + filename;
										FileOutputStream outSTr = new FileOutputStream(
												new File(tFilePath
														+ "attachFiles/temp/"
														+ tmpFP));
										BufferedOutputStream buff = new BufferedOutputStream(
												outSTr);
										while (bis.read(tbyte) != -1) {
											buff.write(tbyte);
											str = new String(tbyte);
											sb.append(str);
										}
										buff.close();
										outSTr.close();
										bis.close();
										fis.close();

										tFilePath = "/"
												+ "././attachFiles/temp/"
												+ tmpFP;
									} catch (FileNotFoundException e) {
										e.printStackTrace();
									} catch (IOException e) {
										e.printStackTrace();
									}
								} else {
									tFilePath = tmpdir + tmpFP;// result:
																// [$(share)]/2012/12/20/T001201212201220/ST001201212201220.bmp
									// 保存所有视频文件路径
									if (tmpFP.contains("avi")) {
										allVideo += "," + tFilePath;// ,VT0012123123.avi,VT13123123.avi
																	// 第一位多了逗号
									}
								}
							} else {// 音频文件或者非北京银行的数据【恰巧匹配了正则的非北京银行数据】。MT001201212201220softphonefile.mp3
								/**
								 * 为确保这里准确区分音频文件，在客户端保存时，
								 * 对软电话抛出的音频路径前面加上S+dealno，
								 * 同时把dealno后面一位占用（.除外），这里就能保证第18位不是.了。
								 * 下周来继续开发>>>
								 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
								 * 1、音频路径映射 2、前端在获取路径后，添加$(share)头，即可 已完成！
								 * */
								// tFilePath = tmpdir + tmpFP.substring(17);//
								// /2012/12/14/T001201212141551/ +
								// queue-1355500269-9000-bjbank-2001.wav
								tFilePath = tmpdir + tmpFP;// /2012/12/14/T001201212141551/
															// +
															// MT001201212141551queue-1355500269-9000-bjbank-2001.wav
								wav += "," + tFilePath;
							}
							logger.debug(tmpdir);
							logger.debug(tFilePath);
							cona.setFilePath(tFilePath);
						} else {
							throw new Exception(
									"Warn:System is not used in bob Env!");
						}
					}
				} catch (Exception e) {
					e.printStackTrace();
					logger.error("#con_attach_id:"+ cona.getConAttachId()+ "#Array outofbound error. Continue next con_attach...");
				}

			}
		} catch (Exception e) {
			e.printStackTrace();
			// 如果不是北京银行的业务，那么此处的映射过程会出现异常。那么重新获取一次联络历史，恢复即可！
			conHis = null;
			conHis = conHisService.get(conHisId);
		}
		if (!"".equals(allVideo))
			allVideo = allVideo.substring(0);

		/** End */
		// 将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,wav : '" + wav
				+ "',allVideo : '" + allVideo + "',data:");

		JSONSerializer serializer = new JSONSerializer();
		serializer.transform(new DateTransformer("yyyy-MM-dd HH:mm:ss"),
				new String[] { "staTime", "endTime", "conAttachs.createDate" });

		sb.append(serializer.include("conAttachs.cusName",
				"conAttachs.credNum", "conAttachs.createBy",
				"conAttachs.fileType", "conAttachs.terminalId").exclude(
				"conAttachs.conHis").serialize(conHis));
		sb.append("}");

		setJsonString(sb.toString());

		logger.debug("#####" + conHisId + "########\n" + jsonString
				+ "\n#########");
		return SUCCESS;
	}

	/**
	 * 获取txt文件内容
	 */
	public String getContent() {
		String path = getRequest().getParameter("content");
		// try {
		// java.net.URLDecoder.decode(path,"UTF-8");
		// } catch (UnsupportedEncodingException e1) {
		// e1.printStackTrace();
		// }
		StringBuffer sb = new StringBuffer("{success:true,content:[");
		int line = 0;
		// StringBuffer sb = new
		// StringBuffer("{success:true,content:'测试txt文件'");//测试数据
		if (path != null && path != "") {
			String contextPath = Thread.currentThread().getContextClassLoader()
					.getResource("").getPath();
			String cp = getRequest().getSession().getServletContext()
					.getRealPath("/");
			File attachFile = new File(cp + path);

			if (attachFile.exists()) {
				try {
					// FileReader fis = new FileReader(attachFile, "");
					// new InputStreamReader(new FileInputStream(file),"UTF-16")
					// System.out.print("########\n" +fis.getEncoding() +
					// "\n #######");
					BufferedReader bd = new BufferedReader(
							new InputStreamReader(new FileInputStream(
									attachFile), "utf-8"));
					String tmp = null;

					while ((tmp = bd.readLine()) != null) {
						sb.append("{line:'" + tmp + "'},");
						line++;
					}
					bd.close();
					sb.deleteCharAt(sb.length() - 1);
				} catch (FileNotFoundException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}

			} else {
				sb.append(contextPath + path + "文件不存在!");
			}
		}
		sb.append("],lines:" + line);
		sb.append("}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	/**
	 * 获取eml文件内容
	 */
	public String getEmlContent() {
		String path = getRequest().getParameter("content");
		StringBuffer sb = new StringBuffer("{success:true,content:[");
		int line = 0;
		if (path != null && path != "") {
			String contextPath = Thread.currentThread().getContextClassLoader()
					.getResource("").getPath();
			String cp = getRequest().getSession().getServletContext()
					.getRealPath("/");
			File attachFile = new File(cp + path);

			if (attachFile.exists()) {
				try {
					Properties props = System.getProperties();
					Session mailSession = Session.getDefaultInstance(props,
							null);
					InputStream source = new FileInputStream(attachFile);
					MimeMessage message = new MimeMessage(mailSession, source);

					Address address = message.getFrom()[0];
					InternetAddress addr = (InternetAddress) address;
					String eml = "";
					DateFormat df = new SimpleDateFormat(
							"yyyy年MM月dd日  hh:mm (E)");
					eml = "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\"> "
							+ "<html xmlns=\"http://www.w3.org/1999/xhtml\"> "
							+ "<head></head><body><table align=\"center\"><tr><td>"
							+

							"<strong>[主&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp题]:</strong> "
							+ message.getSubject()
							+ "<br>\n"
							+ "<strong>[发&nbsp&nbsp件&nbsp人]:</strong> "
							+ addr.getAddress()
							+ "<br>\n"
							+ "<strong>[发件人名]:</strong> "
							+ addr.getPersonal()
							+ "<br>\n"
							+ "<strong>[日&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp期]:</strong> "
							+ df.format(message.getSentDate())
							+ "<br>\n"
							+ "<hr><br>\n"
							+ "</tr></td><tr><td>"
							+ message.getContent() + // body
							"</td></tr></table></body>	</html>";
					System.out.println(java.net.URLDecoder.decode(addr
							.getPersonal(), "UTF-8"));
					System.out.println(eml);
					eml = eml.replaceAll("'", "\"");

					// String name = addr.getPersonal();
					// name = new String(name.getBytes("utf-8"), "gb2312");
					// System.out.println(name);
					// name = new String(name.getBytes("ISO8859_1"), "gb2312");
					// System.out.println(name);
					// name = new String(name.getBytes("GBK"), "utf-8");
					// System.out.println(name);
					StringReader fr = new StringReader(eml);
					BufferedReader bd = new BufferedReader(fr);
					String tmp = null;
					while ((tmp = bd.readLine()) != null) {
						sb.append("{line:'" + tmp + "'},");
						line++;
					}
					bd.close();
					sb.deleteCharAt(sb.length() - 1);
				} catch (FileNotFoundException e) {
					e.printStackTrace();
				} catch (IOException e) {
					e.printStackTrace();
				} catch (MessagingException e) {
					e.printStackTrace();
				}

			} else {
				sb.append(contextPath + path + "文件不存在!");
			}
		}
		sb.append("],lines:" + line);
		sb.append("}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	/**
	 * 显示详细信息for加入黑名单
	 * 
	 * @return
	 */
	public String getForHMD() {
		ConHis conHis = conHisService.get(conHisId);

		// 将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");

		JSONSerializer serializer = new JSONSerializer();
		serializer.transform(new DateTransformer("yyyy-MM-dd HH:mm:ss"),
				new String[] { "staTime", "endTime" });

		sb.append(serializer.exclude(
				new String[] { "class", "cusLinkman.customer",
						"customer.class", "cusLinkman.class", "owner" })
				.serialize(conHis));

		sb.deleteCharAt(sb.length() - 1);
		sb.append(",\"objTypId\":2}");
		sb.append("}");
		setJsonString(sb.toString());

		return SUCCESS;
	}

	/**
	 * 添加及保存操作
	 */
	public String save() {
		System.err.println("save_ConHis.class");

		if (conHis.getConHisId() == null) {
			conHisService.save(conHis);
		} else {

			ConHis orgConHis = conHisService.get(conHis.getConHisId());
			try {
				BeanUtil.copyNotNullProperties(orgConHis, conHis);
				conHisService.save(orgConHis);
			} catch (Exception ex) {
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;

	}

	/**
	 * 根据 客户id显示列表
	 */
	public String listByCusId() {

		QueryFilter filter = new QueryFilter(getRequest());
		List<ConHis> list = conHisService.getAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(filter.getPagingBean().getTotalItems()).append(
						",result:[");
		JSONSerializer serializer = JsonUtil.getJSONSerializer();
		serializer.transform(new DateTransformer("yyyy-MM-dd HH:mm:ss"),
				new String[] { "staTime", "endTime" });
		for (ConHis conHis : list) {
			buff.append(serializer.serialize(conHis));
			buff.deleteCharAt(buff.length() - 1); // 去掉最后的大括号
			buff.append(",\"contactNum\":\"").append(conHis.getPreContactNum())
					.append("-").append(conHis.getMainContactNum()).append("-")
					.append(conHis.getLastContactNum()).append("\"");
			buff.append("},");
		}
		if (list.size() > 0) {
			buff.deleteCharAt(buff.length() - 1);// 去掉最后的,号
		}
		buff.append("]}");

		jsonString = buff.toString();

		return SUCCESS;
	}

	/**
	 * 根据接口创建联络历史
	 */
	public String createHis() {
		logger.debug("ConHisAction is CreateHis class come in");
		String customerId = getRequest().getParameter("customerId");
		String serviceId = getRequest().getParameter("serviceRequestId");
		String planId = getRequest().getParameter("planId");

		ConHisSoapServerImpl chssi = new ConHisSoapServerImpl();
		String phoneNo = getRequest().getParameter("callinno");
		// String termno =
		// getRequest().getParameter("termno");//保存设备号（设备号和电话号映射为头部不同，2001-->T001）；
		// phoneNo.toString();
		/** 修改为2001--> T001 */
		phoneNo = "T" + phoneNo.substring(1);
		StringBuffer str = new StringBuffer(
				"{'statusId':1,'dirId': 1,'class':'com.ulane.customer.model.customer.ConHis','contactTypeId':1,'mainContactNum':'"
						+ phoneNo + "'");
		str.append(",'ownerId':" + ContextUtil.getCurrentUserId());
		str.append(",'agentName':'"
				+ ContextUtil.getCurrentUser().getUsername() + "'");
		System.out.println("当前座席工号："
				+ ContextUtil.getCurrentUser().getUsername());
		// 添加来源类别 手机网络：4,
		str.append(",'srcTypeId':1,'dealStaId':11");

		if (customerId != null && !customerId.equals("")) {
			str.append(",'customer':{'customerId':" + new Long(customerId)
					+ "}");
		}
		if (serviceId != null && !serviceId.equals("")) {
			str.append(",'serviceId':" + Long.parseLong(serviceId));
		}
		if (planId != null && !planId.equals("")) {
			str.append(",'planId':" + planId);
		}
		str.append("}");
		logger.debug(str.toString());
		String msg = chssi.createConHis(str.toString());
		jsonString = msg;
		return SUCCESS;
	}

	/**
	 * 创建外呼联络历史
	 */
	public String createOutHis() {
		String phoneNo = getRequest().getParameter("calloutno");
		String customerId = getRequest().getParameter("customerId");
		String planId = getRequest().getParameter("planId");
		String sourceId = getRequest().getParameter("saletaskId");

		ConHisSoapServerImpl chssi = new ConHisSoapServerImpl();
		Long ownerId = ContextUtil.getCurrentUserId();
		StringBuilder sb = new StringBuilder();
		sb.append("{'statusId':" + ConHis.STA_EXECUTING)
				// 状态
				.append(",'dirId': " + ConHis.DIR_OUT)
				// 方向
				.append(",'class':'com.ulane.customer.model.customer.ConHis'")
				.append(",'contactTypeId':1")// 联系方式：1——电话
				.append(",'planId':" + planId)// 任务内码（CalendarPlan）
				.append(",'ownerId':" + ownerId).append(
						",'mainContactNum':" + phoneNo).append(
						",'srcTypeId':" + ConHis.SRC_TYPE_CUS_MARKET).append(
						",'serviceId':" + sourceId);

		// 添加来源类别 手机网络：4,
		sb.append(",'srcTypeId':" + ConHis.SRC_TYPE_PHONE + "");

		if (customerId != null && !customerId.equals("")) {
			sb
					.append(",'customer':{'customerId':" + new Long(customerId)
							+ "}");
		}
		sb.append("}");

		String msg = chssi.createConHis(sb.toString());
		jsonString = msg;

		return SUCCESS;
	}

	/**
	 * 根据接口更新联络历史
	 */
	public String updateHis() {
		// 从弹屏页面获得交易类型（联络事项）、处理结果（对应联络记录的处理状态）、联络结果、备注（对应联络历史中的联络内容）
		ConHisSoapServerImpl chssi = new ConHisSoapServerImpl();
		String conhisId = getRequest().getParameter("conhisId");
		String customerId = getRequest().getParameter("customerId");
		// 获得录音地址
		String recordPath = getRequest().getParameter("path");
		// 服务类型
		String conResId = getRequest().getParameter("conResId");
		// 处理结果(子状态与状态)
		String dealResult = getRequest().getParameter("dealResult");
		String statusResult = getRequest().getParameter("statusResult");

		// 联络事项
		String busiType_formx = getRequest().getParameter("busiType_form");
		// 联络内容
		String callContent = getRequest().getParameter("callContent");

		StringBuffer str = new StringBuffer(
				"{'class':'com.ulane.customer.model.customer.ConHis'");
		if (conhisId != null && !conhisId.equals("")) {
			str.append(",'conHisId':" + conhisId);
			if (busiType_formx != null && !busiType_formx.equals("")) {
				str.append(",'busTypId':" + busiType_formx);
			}
			// if (conResId != null && !conResId.equals("")){
			// str.append(",'conResId':" + conResId);
			// }
			if (!recordPath.equals("") && recordPath != null) {
				str.append(",'content':'" + recordPath + "'");
			}

			if (!callContent.equals("") && !callContent.equals("")) {
				str.append(",'remarks':'" + callContent + "'");
			}
			if (dealResult != null && !dealResult.equals("")) {
				str.append(",'dealStaId':" + dealResult);
			}
			if (statusResult != null && !statusResult.equals("")) {
				str.append(",'conResId':" + statusResult);
			}

			if (customerId != null && !customerId.equals("")) {
				str.append(",'customer':{'customerId':"
						+ Long.parseLong(customerId) + "}");
			}
		}

		str.append("}");
		// 更新的字符串
		// System.out.println(str.toString() + "更新的字符串 conHisId=" + conhisId);
		String msg = chssi.updateConHis(str.toString());
		jsonString = msg;
		return SUCCESS;
	}

	/**
	 * 根据接口更新客户联络历史
	 */
	public String updateCusHis() {
		// 从弹屏页面获得交易类型（联络事项）、处理结果（对应联络记录的处理状态）、联络结果、备注（对应联络历史中的联络内容）
		ConHisSoapServerImpl chssi = new ConHisSoapServerImpl();
		String conhisId = getRequest().getParameter("conhisId");
		String customerId = getRequest().getParameter("customerId");

		StringBuffer str = new StringBuffer(
				"{'class':'com.ulane.customer.model.customer.ConHis','conResRemarks':'渠道','contactTypeId':1,'cusLinkman':null");
		str.append(",'ownerId':" + ContextUtil.getCurrentUserId());
		if (conhisId != null && !conhisId.equals("")) {
			str.append(",'conHisId':");
			str.append(conhisId);
		}
		if (customerId != null && !customerId.equals("")) {
			str.append(",'customerId':");
			str.append(customerId);
		}
		str.append("}");
		// 更新的字符串
		String msg = chssi.updateConHis(str.toString());
		jsonString = msg;
		return SUCCESS;
	}

	/**
	 * 根据接口列出联络历史
	 */
	public String listHis() {
		String start = getRequest().getParameter("start");
		String limit = getRequest().getParameter("limit");
		String customerId = getRequest().getParameter(
				"Q_customer.customerId_L_EQ");

		String serviceId = getRequest().getParameter("serviceId");

		// 搜索框查询参数
		String startTime = getRequest().getParameter("Q_staTime_D_GE"); // 开始时间
		String endTime = getRequest().getParameter("Q_endTime_D_LE"); // 结束时间
		String inChargeMan = getRequest().getParameter(
				"Q_owner.employeeid_S_LK"); // 负责人
		String conResId = getRequest().getParameter("Q_conResId_SN_EQ"); // 联络结果
		String dirId = getRequest().getParameter("Q_dirId_SN_EQ"); // 方向
		StringBuffer str = new StringBuffer();
		ConHisSoapServerImpl chssi = new ConHisSoapServerImpl();
		if (start == null || start.equals("")) {
			start = "0";
		}
		if (limit == null || limit.equals("")) {
			limit = "25";
		}
		str.append("{success:true,'start':" + start + ",'limit':" + limit);
		if (customerId != "-1" && !customerId.equals("-1")
				&& !customerId.equals("")) {
			str.append(",'Q_customer.customerId_L_EQ':" + customerId);
		} else if (serviceId != null && !serviceId.equals("")) {
			str.append(",'serviceId':" + serviceId);
		}

		// 搜索框查询参数拼接
		if (StringUtils.isNotBlank(startTime)) {
			str.append(",'startTime':" + startTime);
		}
		if (StringUtils.isNotBlank(endTime)) {
			str.append(",'endTime':" + endTime);
		}
		if (StringUtils.isNotBlank(inChargeMan)) {
			str.append(",'inChargeMan':" + inChargeMan);
		}
		if (StringUtils.isNotBlank(conResId)) {
			str.append(",'conResId':" + conResId);
		}
		if (StringUtils.isNotBlank(dirId)) {
			str.append(",'dirId':" + dirId);
		}
		str.append("}");
		// {success:true,'start':0,'limit':25,'serviceId':7708,'startTime':2012-10-01,'endTime':2012-10-26,'inChargeMan':鹏,'conResId':1}
		String msg = chssi.list(str.toString());
		jsonString = msg;
		return SUCCESS;
	}

	/**
	 * 根据 服务请求id显示列表
	 */
	public String listByServiceId() {
		String serviceId = getRequest().getParameter("serviceId");
		QueryFilter filter = new QueryFilter(getRequest());
		filter.addFilter("Q_serviceId_L_EQ", serviceId);
		List<ConHis> list = conHisService.getAll(filter);

		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(filter.getPagingBean().getTotalItems()).append(
						",result:[");
		JSONSerializer serializer = JsonUtil.getJSONSerializer();
		serializer.transform(new DateTransformer("yyyy-MM-dd HH:mm:ss"),
				new String[] { "staTime", "endTime" });
		for (ConHis conHis : list) {
			buff.append(serializer.serialize(conHis));
			buff.deleteCharAt(buff.length() - 1); // 去掉最后的大括号
			buff.append(",\"contactNum\":\"").append(conHis.getPreContactNum())
					.append("-").append(conHis.getMainContactNum()).append("-")
					.append(conHis.getLastContactNum()).append("\"");
			buff.append("},");
		}
		if (list.size() > 0) {
			buff.deleteCharAt(buff.length() - 1);// 去掉最后的,号
		}
		buff.append("]}");

		jsonString = buff.toString();

		return SUCCESS;
	}

	/**
	 * 20140606 查看业务资料时查询对应的网点名称
	 */
	public String selectEquipName() {
		System.out.println("进入selectEquipName！");
		try {
			String eid = getRequest().getParameter("Eid");
			Equipment equipment = conHisService.selectEquiName(eid);
			System.out.println("equipment = " + equipment);
			Gson gson = new Gson();
			StringBuffer sb = new StringBuffer("{success:true,data:");
			if (equipment == null) {
				Equipment equipment2 = new Equipment();
				equipment2.setEId(Long.parseLong("1111"));
				equipment2.setEquipmentId("9999");
				equipment2.setEquipmentName("无");
				sb.append(gson.toJson(equipment2));
			} else {
				sb.append(gson.toJson(equipment));
			}
			sb.append("}");
			setJsonString(sb.toString());
			System.out.println(sb);
		} catch (Exception e) {
			System.out.println(e);
		}

		return SUCCESS;
	}

	/**
	 * 20140603 Mr.Hu 无流水号问题更改， 自动生成流水号update后台conhis语句
	 */
	public String updateDealNum() {
		System.out.println("--->updateDealNum<---");
		String conHisId = getRequest().getParameter("conHisId");
		String cusName = getRequest().getParameter("cusName");
		String serialNum = getRequest().getParameter("serialNum");
		System.out.println(conHisId + "|" + cusName + "|" + serialNum);
		conHisService.updateDealNum(conHisId, cusName, serialNum);
		return SUCCESS;
	}

	/**
	 * 根据接口更新联络历史并保存联络文件
	 */
	public String updateHisAndFile() {
		// 'conAttachs':[{'conHis':{'conHisId':10429},'fileType':1,'fileSource':1,'filePath':'d:/log/','cusName':'张三','credNum':'410009982818128221'}],'conHisId':
		// 10429,
		logger.debug("进入ConHisAction类updateHisAndFile()执行SaveSomeFile method");
		// 从页面获取联络文件需要的参数
		ConHisSoapServerImpl chssi = new ConHisSoapServerImpl();
		String conHisId = getRequest().getParameter("conHisId");
		String fileType = getRequest().getParameter("fileType");
		String fileSource = getRequest().getParameter("fileSource");
		String filePath = getRequest().getParameter("filePath");
		String createBy = getRequest().getParameter("createBy");
		String cusName = getRequest().getParameter("cusName");
		String credNum = getRequest().getParameter("credNum");
		String serialNum = getRequest().getParameter("serialNum");
		String terminalId = getRequest().getParameter("terminalId");
		logger.debug("updateHisAndFile()执行SaveSomeFile【conHisId-->" + conHisId
				+ "fileType-->" + fileType + "fileSource-->" + fileSource
				+ "filePath-->" + filePath + "createBy-->" + createBy
				+ "cusName-->" + cusName + "credNum-->" + credNum
				+ "serialNum-->" + serialNum + "terminalId-->" + terminalId
				+ "】");

		/** 转义文件路径\ to / */
		filePath = filePath.replaceAll("\\\\\\\\", "/");
		filePath = filePath.replaceAll("\\\\", "/");
		filePath = "/" + filePath;

		StringBuffer str = new StringBuffer(
				"{'class':'com.ulane.customer.model.customer.ConHis'");
		if (conHisId != null && !conHisId.equals("")) {
			str.append(",'conHisId':" + Long.parseLong(conHisId));
			if (cusName != null && !cusName.equals("")) {
				str.append(",'cusName':'" + cusName + "'");
			}
			if (credNum != null && !credNum.equals("")) {
				str.append(",'credNum':'" + credNum + "'");
			}
			if (serialNum != null && !serialNum.equals("")) {
				str.append(",'serialNum':'" + serialNum + "'");
			}
			str.append(",'conAttachs':[{'conHis':{'conHisId':"
					+ Long.parseLong(conHisId) + "}");
			if (fileType != null && !fileType.equals("")) {
				str.append(",'fileType':" + fileType);
			}

			if (!fileSource.equals("") && fileSource != null) {
				str.append(",'fileSource':" + fileSource);
			}

			if (!filePath.equals("") && !filePath.equals("")) {
				str.append(",'filePath':'" + filePath + "'");
			}
			if (terminalId != null && !terminalId.equals("")) {
				str.append(",'terminalId':'" + terminalId + "'");
			}
			str.append(",'createBy':'"
					+ ContextUtil.getCurrentUser().getUsername() + "'");
			// if (createBy != null && !createBy.equals("")){
			// str.append(",'createBy':'" + createBy + "'");
			// }
			// JSONSerializer serializer = JsonUtil.getJSONSerializer();
			// serializer.transform(new
			// DateTransformer("yyyy-MM-dd HH:mm:ss"),new String[] {
			// "createDate"});
			str.append(",'createDate': '"
					+ new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")
							.format(new Date()) + "'}]}");
			// str.append(",'createDate': '"+serializer.transform(new
			// DateTransformer("yyyy-MM-dd HH:mm:ss"),new String[] {
			// "createDate"}));
			// if (credNum != null && !credNum.equals("")){
			// str.append(",'credNum':'" + Long.parseLong(credNum) + "'}]}");
			// }
		}

		str.append("}");
		// 更新的字符串
		logger.debug(str.toString() + "更新的字符串");
		String msg = chssi.updateConHis(str.toString());
		jsonString = msg;
		return SUCCESS;
	}

	/*** 数据校验添加 */
	// 拼音姓名：只能大写英文字母，中间必须有且只能有1个空格字符
	// 手机号码：只能输入数字，长度需小于13位。
	// 邮编：只能输入数字，长度必须为6位
	// 固定电话：格式为xxx-xxxxxx，只能输入数字，中间包含1个"-"，总长度<18位
	// 单位名称、地址信息：总长度小于40字节
	// "徐涛,xue tao,男,中国,身份证,1980年1月1日,2000/8~2016/8,110102198001011234,2011年1月1日,2012年12月31,1391021102,010-66066666,企业事业单位负责人,北京市东城区建外大街甲66号,北京金宇集团有限公司,本人,100005";
	public String checkdata() {
		String tmp = "";
		jsonString = "SUCC";
		try {
			/***
			 * 
			 if(!Pattern.matches("[A-Z]+\\s[A-Z]+", datas[1])){
			 * System.out.println("#pinyin fail!" + datas[1]); jsonString =
			 * "拼音数据格式不对！[只能大写英文字母，中间必须有且只能有1个空格字符]"; } else
			 * if(!Pattern.matches("\\d{1,13}", datas[10])){//10 phone
			 * System.out.println("#phone fail!" + datas[10]); jsonString =
			 * "手机号码数据格式不对！[只能输入数字，长度需小于13位]"; } else if( ! (datas[11].length()
			 * <18) || ! Pattern.matches("\\d+\\-\\d+", datas[11])){//11 call
			 * System.out.println("#call fail!" + datas[11]); jsonString =
			 * "固定电话数据格式不对！[格式为xxx-xxxxxx，只能输入数字，中间包含1个'-'，总长度<18位]"; } else
			 * if(!Pattern.matches("\\d{6}", datas[16])){//16 postcode
			 * System.out.println("#postcode fail!" + datas[16]); jsonString =
			 * "邮编数据格式不对！[只能输入数字，长度必须为6位]"; } else
			 * if(datas[13].getBytes().length >= 40){
			 * System.out.println("#addr2 fail!" + datas[13]); jsonString =
			 * "单位名称数据格式不对！[总长度小于40字节]"; } else if(datas[14].getBytes().length
			 * >= 40){ System.out.println("#com fail!" + datas[14]); jsonString
			 * = "地址信息数据格式不对！[总长度小于40字节]"; } else {
			 * System.out.println("#pinyin ok!" + datas[1]);
			 * System.out.println("#phone ok!" + datas[10]);
			 * System.out.println("#call ok!" + datas[11]);
			 * System.out.println("#postcode ok!" + datas[16]);
			 * System.out.println("#addr2 ok!" + datas[13]);
			 * System.out.println("#com ok!" + datas[14]); } } catch (Exception
			 * e){ jsonString = "info_data_format_error"; }
			 */
			System.out.println("#datas:[" + getRequest().getParameter("datas")
					+ "]");

			String[] datas = getRequest().getParameter("datas").split(",");
			System.out.println("字符个数：=》" + datas.length);
			System.out.println("手机号datas[10] :" + datas[10]);
			System.out.println("电话号datas[11] :" + datas[11]);
			System.out.println("职位datas[12] ：" + datas[12]);
			System.out.println("省datas[13] ：" + datas[13]);
			System.out.println("市datas[14] ：" + datas[14]);
			System.out.println("县datas[15] ：" + datas[15]);
			System.out.println("详细地址datas[16] ：" + datas[16]);
			System.out.println("拼音datas[1] ：" + datas[1]);
			System.out.println("单位地址datas[17] ：" + datas[17]);
			System.out.println("邮编datas[19] ：" + datas[19]);
			System.out.println("Emaildatas[23] ：" + datas[23]);
			logger.debug("流程进行校验字符串：" + datas);
			if (datas.length > 25) {
				tmp += "界面填值中含有逗号，请检查并删除逗号！<br>";
			} else {

				int a = datas[11].indexOf("-");
				String b = datas[11].substring(0, a);
				String c = datas[11].substring(a + 1, datas[11].length());
				/**
				 * 升级版：一次检查出所有不匹配的项。
				 * 对比：升级版每次都检查所有项，效率会低，适用情况是输入项有多个错误；上一版本，效率高，适用情况是错误少。
				 * */
				if (!Pattern.matches("[A-Z]+\\s[A-Z]+", datas[1])) {
					System.out.println("#pinyin fail!" + datas[1]);
					tmp += "拼音数据格式不对！[只能大写英文字母，中间必须有且只能有1个空格字符]<br>";

				}

				/*--------4带核心新添校验-------*/
				if (c.length() == 0 && datas[10].length() == 0
						&& b.length() == 0) {
					System.out.println("进入手机号校验");
					tmp += "手机号和固定电话必填一项！<br>";
				} else {
					if (datas[10].length() > 0) {
						if (datas[10].length() != 11
								|| !Pattern.compile("^[0-9]*$").matcher(
										datas[10]).matches()) {
							System.out.println("#phone fail!" + datas[10]);
							tmp += "手机号码数据格式不对！[只能输入数字，长度需等于11位]<br>";
						}
					}
					if ((!(datas[11].length() < 18) || !Pattern.matches(
							"\\d+\\-\\d+", datas[11]))
							&& datas[10].length() == 0) {// 11 call
						System.out.println("#call fail!" + datas[11]);
						tmp += "固定电话数据格式不对！[格式为xxx-xxxxxx，只能输入数字，中间包含1个'-'，总长度<18位]<br>";
					}
					if (b.length() == 0 && c.length() > 0) {
						System.out.println("#call fail!" + datas[11]);
						tmp += "固定电话区号必填！[格式为xxx-xxxxxx，只能输入数字，中间包含1个'-'，总长度<18位]<br>";
					}
					if (b.length() > 0 && c.length() == 0) {
						System.out.println("#call fail!" + datas[11]);
						tmp += "固定电话数据格式不对！[格式为xxx-xxxxxx，只能输入数字，中间包含1个'-'，总长度<18位]<br>";
					}
					if (b.length() > 0 && !(c.length() == 8 || c.length() == 7)) {
						System.out.println("#call fail!" + datas[11]);
						tmp += "固定号必须为7位或8位！[格式为xxx-xxxxxx，只能输入数字，中间包含1个'-'，总长度<18位]<br>";
					}
					if ((b.length() < 3 || b.length() > 4) && c.length() > 0) {
						System.out.println("#callquhao fail!" + b);
						tmp += "固话的区号必须为3位或4位的长度,且必须为数字！<br>";
					}
				}
				// 校验固话区号 必须为数字且长度不能超过4位
				if (!Pattern.compile("^[0-9]*$").matcher(b).matches()) {
					System.out.println("#callquhao fail!" + b);
					tmp += "固话的区号必须为数字！<br>";
				}

				// 校验固话号 000-XXXX 必须为数字
				if (!Pattern.compile("^[0-9]*$").matcher(c).matches()) {
					System.out.println("#callquhao fail!" + c);
					tmp += "固话号必须为数字！<br>";
				}

				if (!Pattern.matches("\\d{6}", datas[19])
						|| !Pattern.compile("^[0-9]*$").matcher(datas[19])
								.matches()) {// 16 postcode
					System.out.println("#postcode fail!" + datas[19]);
					tmp += "邮编数据格式不对！[只能输入数字，长度必须为6位]<br>";
				}

				/*--------4带核心新添校验-------*/
				if (datas[17].getBytes().length == 0) {
					if (!datas[12].equals("不便分类的其他从业人员")) {
						System.out.println("#vocation fail!" + datas[12]);
						tmp += "您的职业需必填工作单位名称！[除了‘不便分类的其他从业人员’职业可不填]<br>";
					}
				}
				if (datas[12].equals("")) {
					System.out.println("#postcode fail!" + datas[13]);
					tmp += "职业内容不能为空！<br>";
				}
				if (datas[13].getBytes().length == 0) {
					System.out.println("#addr2 fail!" + datas[13]);
					tmp += "省的地址信息必填！[总长度要大于40字节]<br>";
				}
				if (datas[14].getBytes().length == 0) {
					System.out.println("#addr2 fail!" + datas[14]);
					tmp += "市的地址信息必填！[总长度要大于40字节]<br>";
				}
				if (datas[15].getBytes().length == 0) {
					System.out.println("#addr2 fail!" + datas[15]);
					tmp += "县的地址信息必填！[总长度要大于40字节]<br>";
				}
				if (datas[16].getBytes().length == 0) {
					System.out.println("#addr2 fail!" + datas[16]);
					tmp += "您的详细地址信息必填！[总长度要大于40字节]<br>";
				}
				if (datas[16].indexOf("#") >= 0) {
					tmp += "您的详细地址信息不能有特殊字符'#'！[总长度要大于40字节]<br>";
				}

			}
		} catch (Exception e) {
			e.printStackTrace();
			tmp += "info_data_format_error";
		}
		jsonString = tmp.equals("") ? jsonString : tmp;
		return SUCCESS;
	}

	/** 
	 * 2015/10/09
	 * Fernando Hu
	 * 修改结束时间方法 
	 * */
	public String updateETime(){
			String conhisId = getRequest().getParameter("conHisId");
			Date Edate = new Date();
			if (conhisId == null || "".equals(conhisId)) {
				jsonString = "fail";
				return SUCCESS;
			}
			conHis = conHisService.get(Long.valueOf(conhisId));
			conHis.setEndTime(Edate);
			conHisService.merge(conHis);
			jsonString = "succ";
			return SUCCESS;
	}	
	public String updateHisState() {
		String conhisId = getRequest().getParameter("conHisId");
		Short dealStaId = Short.parseShort(getRequest().getParameter("dealStaId"));
		if (conhisId == null || "".equals(conhisId)) {
			jsonString = "fail";
			return SUCCESS;
		}
		conHis = conHisService.get(Long.valueOf(conhisId));
		conHis.setDealStaId(dealStaId);// 北京银行默认为1001，成功开卡了。
		conHisService.merge(conHis);
		jsonString = "succ";
		return SUCCESS;
	}

	/**
	 * 身份核查补录； 20140521 Mr.Hu
	 * 
	 * @return
	 */
	public String updateCheckPersonal() {
		String conhisId = getRequest().getParameter("conHisId");
		String remarks = getRequest().getParameter("remarks");
		if (conhisId == null || "".equals(conhisId)) {
			jsonString = "fail";
			return SUCCESS;
		}
		conHis = conHisService.get(Long.valueOf(conhisId));
		conHis.setRemarks(remarks);// 北京银行默认为1001，成功开卡了。
		logger.debug("后台修改补录标记变量‘成功’");
		conHisService.merge(conHis);
		jsonString = "succ";
		return SUCCESS;
	}

	/**
	 * 2014/07/29 17:10 SeaBreeze 身份核查补录时，存储操作记录，报表数据提供
	 */
	public String InsertExamineInfo() {
		try {
			String dealnum = getRequest().getParameter("dealnum");
			String cusname = getRequest().getParameter("cusname");
			String transactP = getRequest().getParameter("transactpersonal");
			String examineP = getRequest().getParameter("examinepersonal");
			String examineD = getRequest().getParameter("examinedate");
			String examineR = getRequest().getParameter("examineresult");
			Examine examine = new Examine();
			examine.setCusName(cusname);
			examine.setDealNum(dealnum);
			examine.setExamineD(examineD);
			examine.setExamineP(examineP);
			examine.setExamineR(examineR);
			examine.setTransactP(transactP);
			conHisService.insertExamineInfo(examine);
		} catch (Exception e) {
			System.out.println("InsertExamineInfo _catch");
		}
		return SUCCESS;
	}

	/***
	 * 2013/09/23 SeaBreeze *** 测试将联络记录的业务类型修改 (开卡：0、电子渠道：1、投资理财:2、借记卡挂失：3)
	 * */
	public String updateHisBusType() {
		String conhisId = getRequest().getParameter("conHisId");
		Short busTypId = Short.parseShort(getRequest().getParameter("busTypeId"));
		if (conhisId == null || "".equals(conhisId)) {
			jsonString = "fail";
			return SUCCESS;
		}
		conHis = conHisService.get(Long.valueOf(conhisId));
		conHis.setBusTypId(busTypId);
		conHisService.merge(conHis);
		jsonString = "succ";
		return SUCCESS;
	}

	/**
	 * 为数据补丁接口。发现在北京银行中存在网络问题、控件问题、坐席操作不对，会导致数据保存时缺失。
	 * */
	public String updateHisBD() {
		String conhisId = getRequest().getParameter("conHisId");
		String cusname = getRequest().getParameter("cusName");
		String crednum = getRequest().getParameter("credNum");
		if (conhisId == null || "".equals(conhisId)) {
			jsonString = "fail";
			return SUCCESS;
		}
		conHis = conHisService.get(Long.valueOf(conhisId));
		conHis.setCusName(cusname);
		conHis.setCredNum(crednum);
		conHisService.merge(conHis);
		jsonString = "succ";
		return SUCCESS;
	}

	// --------------------------------------补录报表的查询以及分页显示-----------------------------------
	private PagingBean pagingBean = null;

	public PagingBean getPagingBean() {
		return pagingBean;
	}

	public void setPagingBean(PagingBean pagingBean) {
		this.pagingBean = pagingBean;
	}

	public PagingBean paging() {
		// 取得分页的信息
		Integer start = 0;
		Integer limit = PagingBean.DEFAULT_PAGE_SIZE;

		String s_start = getRequest().getParameter("start");
		String s_limit = getRequest().getParameter("limit");
		if (StringUtils.isNotEmpty(s_start)) {
			start = new Integer(s_start);
		}
		if (StringUtils.isNotEmpty(s_limit)) {
			limit = new Integer(s_limit);
		}

		this.pagingBean = new PagingBean(start, limit);
		return pagingBean;
	}

	/**
	 * 2014 /11/2 补录报表* 1 带条件的查询（怎么判断条件 a 条件为null或"" ,查询所有，b 条件不为null，条件查询） 2
	 * 查询所有 需要显示分页： 开始（） 结束 查询总数count,(条件查询或查询所有)
	 * 
	 * @anthor nk
	 * */
	public String ExamineReport() {
		String dealNum = getRequest().getParameter("dealNum"); // 流水号
		// System.out.println("====dealNum"+dealNum);
		String cusName = getRequest().getParameter("cusName"); // 客户姓名
		String transactP = getRequest().getParameter("transactP"); // 办理人
		String examineP = getRequest().getParameter("examineP"); // 补录人
		String examineD = getRequest().getParameter("examineD"); // 补录时间
		String examineR = getRequest().getParameter("examineR"); // 补录结果
		System.out.println("===[ConHisAction.java]=ExamineReport()=" + dealNum
				+ cusName + transactP + examineP + examineP + examineD
				+ examineR);
		Integer start = 0;
		Integer limit = PagingBean.DEFAULT_PAGE_SIZE;
		String s_start = getRequest().getParameter("start");
		String s_limit = getRequest().getParameter("limit");
		if (StringUtils.isNotEmpty(s_start)) {
			start = new Integer(s_start);
		}
		if (StringUtils.isNotEmpty(s_limit)) {
			limit = new Integer(s_limit);
		}
		System.out.println("start" + start + "limit=" + limit);
		int count = 0;// 查询记录的总数
		List<Examine> list = new ArrayList<Examine>();
		// if(dealNum==null && cusName==null && transactP==null &&
		// examineP==null && examineD==null && examineR==null){
		// 查询总数
		System.out.println("[ConHisAction.java] -if  ----- 查询所有====");
		list = conHisService.ExamineReport(start, limit, dealNum, cusName,
				transactP, examineP, examineD, examineR);
		count = conHisService.ExamineReportCount(dealNum, cusName, transactP,
				examineP, examineD, examineR);
		System.out.println("[ConHisAction.java]=count" + count);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(count).append(",result:[");
		for (int i = 0; i < list.size(); i++) {

			if (list.get(i).getId() != null && !"".equals(list.get(i).getId())) {
				buff.append("[").append("" + list.get(i).getId() + ",'");
			} else {
				buff.append("[").append("" + "<null>" + "','");// 是为了防止数据库中取出来的值为null
			}
			if (list.get(i).getDealNum() != null
					&& !"".equals(list.get(i).getDealNum())) {
				buff.append(list.get(i).getDealNum() + "','");
			} else {
				buff.append("<null>" + "','");
			}
			if (list.get(i).getCusName() != null
					&& !"".equals(list.get(i).getCusName())) {
				buff.append(list.get(i).getCusName() + "','");
			} else {
				buff.append("<null>" + "','");
			}
			if (list.get(i).getTransactP() != null
					&& !"".equals(list.get(i).getTransactP())) {
				buff.append(list.get(i).getTransactP() + "','");
			} else {
				buff.append("<null>" + "','");
			}
			if (list.get(i).getExamineP() != null
					&& !"".equals(list.get(i).getExamineP())) {
				buff.append(list.get(i).getExamineP() + "','");
			} else {
				buff.append("<null>" + "','");
			}
			if (list.get(i).getExamineD() != null
					&& !"".equals(list.get(i).getExamineD())) {
				buff.append(list.get(i).getExamineD() + "','");
			} else {
				buff.append("<null>" + "','");
			}
			if (list.get(i).getExamineR() != null
					&& !"".equals(list.get(i).getExamineR())) {
				buff.append(list.get(i).getExamineR() + "'],");
			} else {
				buff.append("<null>" + "'],");
			}

			// buff.append("[").append(
			// "" + list.get(i).getId() + ",'"
			// + list.get(i).getDealNum() + "','"
			// + list.get(i).getCusName() + "','"
			// + list.get(i).getTransactP() + "','"
			// + list.get(i).getExamineP() + "','"
			// + list.get(i).getExamineD() + "','"
			// + list.get(i).getExamineR() + "'],");
		}

		if (list.size() > 0) {
			buff.deleteCharAt(buff.length() - 1);
		}
		buff.append("]}");
		System.out.println("buff----" + buff);
		setJsonString(buff.toString());
		System.out.println("list=" + list.size());
		this.pagingBean = new PagingBean(start, limit);
		return SUCCESS;
	}

	/**
	 * ==============================================
	 * 
	 * /** 2014 /11/2 质检考核* 1 带条件的查询（怎么判断条件 a 条件为null或"" ,查询所有，b 条件不为null，条件查询）
	 * 2 查询所有 需要显示分页： 开始（） 结束 查询总数count,(条件查询或查询所有)
	 * 
	 * @anthor nk
	 * */
	public String SysWorkattendanceReport() {
		String loginTime = getRequest().getParameter("loginTime"); // 补录时间
		String logoutTime = getRequest().getParameter("logoutTime"); // 补录结果
		Integer start = 0;
		Integer limit = PagingBean.DEFAULT_PAGE_SIZE;
		String s_start = getRequest().getParameter("start");
		String s_limit = getRequest().getParameter("limit");
		if (StringUtils.isNotEmpty(s_start)) {
			start = new Integer(s_start);
		}
		if (StringUtils.isNotEmpty(s_limit)) {
			limit = new Integer(s_limit);
		}
		int count = 0;// 查询记录的总数
		List<SysWorkattendance> list = new ArrayList<SysWorkattendance>();
		list = conHisService.SysWorkattendance(start, limit, loginTime,
				logoutTime);
		count = conHisService.SysWorkattendanceCount(loginTime, logoutTime);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(count).append(",result:[");
		for (int i = 0; i < list.size(); i++) {
				if (list.get(i).getId() != null && !"".equals(list.get(i).getId())) {
					buff.append("[").append("" + list.get(i).getId() + ",'");
				} else {
					buff.append("[").append("" + "<null>" + "','");// 是为了防止数据库中取出来的值为null
				}
				if (list.get(i).getAgentId() != null
						&& !"".equals(list.get(i).getAgentId())) {
					buff.append(list.get(i).getAgentId() + "','");
				} else {
					buff.append("<null>" + "','");
				}
				if (list.get(i).getLoginTime() != null
						&& !"".equals(list.get(i).getLoginTime())) {
					buff.append(list.get(i).getLoginTime() + "','");
				} else {
					buff.append("<null>" + "','");
				}
				if (list.get(i).getLoginCtiTime() != null
						&& !"".equals(list.get(i).getLoginCtiTime())) {
					buff.append(list.get(i).getLoginCtiTime() + "','");
				} else {
					buff.append("<null>" + "','");
				}
				if (list.get(i).getLogoutTime() != null
						&& !"".equals(list.get(i).getLogoutTime())) {
					buff.append(list.get(i).getLogoutTime() + "','");
				} else {
					buff.append("<null>" + "','");
				}
				if (list.get(i).getStatus() != null
						&& !"".equals(list.get(i).getStatus())) {
					buff.append(list.get(i).getStatus() + "','");
				} else {
					buff.append("<null>" + "','");
				}
				if (list.get(i).getReason() != null
						&& !"".equals(list.get(i).getReason())) {
					buff.append(list.get(i).getReason() + "','");
				} else {
					buff.append("<null>" + "','");
				}
				if (list.get(i).getBsNum() != null
						&& !"".equals(list.get(i).getBsNum())) {
					buff.append(list.get(i).getBsNum() + "','");
				} else {
					buff.append("<null>" + "','");
				}
				if (list.get(i).getRemarks() != null
						&& !"".equals(list.get(i).getRemarks())) {
					buff.append(list.get(i).getRemarks() + "'],");
				} else {
					buff.append("<null>" + "'],");
				}
		}
		if (list.size() > 0) {
			buff.deleteCharAt(buff.length() - 1);
		}
		buff.append("]}");
		setJsonString(buff.toString());
		this.pagingBean = new PagingBean(start, limit);
		return SUCCESS;
	}

	/****************************
	 * ========================================================2014年12月19日======
	 * ===============机构部门名称（总分支行）====== 机构部门的增删改
	 * 
	 * @author wkj@nk
	 */

	/**
	 * 显示树形列表，实际上是tree()
	 */
	public String BankListTree() {
		try {
			String opt = getRequest().getParameter("opt");
			StringBuffer buff = new StringBuffer();
			if (StringUtils.isNotEmpty(opt)) {
				buff.append("[");
			} else {
				buff.append("[{id:'" + 0 + "',text:'" + "总行"
						+ "',expanded:true,checked:'none',children:[");
			}
			List<BankType> listParent = conHisService.findByParentId(new Long(0));// 最顶层父节点
			for (BankType ktp : listParent) {
				buff.append("{id:'" + ktp.getBankTypeId() + "',text:'"
						+ ktp.getBankname() + "',");
				buff.append(listChild(ktp.getBankTypeId()));
			}
			if (!listParent.isEmpty()) {
				buff.deleteCharAt(buff.length() - 1);
			}
			if (StringUtils.isNotEmpty(opt)) {
				buff.append("]");
			} else {
				buff.append("]}]");
			}
			setJsonString(buff.toString());
		} catch (Exception e) {
			System.out.println(e);
		}
		return SUCCESS;
	}

	protected String listChild(Long id) {
		StringBuffer childSB = new StringBuffer("");
		List<BankType> childs = conHisService.findByParentId(id);
		if (childs.size() == 0) {
			childSB.append("checked:'none',leaf:true},");
			return childSB.toString();
		}
		childSB.append("checked:'none',children:[");
		for (BankType ukt : childs) {
			childSB.append("{id:'" + ukt.getBankTypeId() + "' ,text:'" + ukt.getBankname() + "',");
			childSB.append(CollectListChildForRole(ukt.getBankTypeId()));
		}
		childSB.deleteCharAt(childSB.length() - 1);
		childSB.append("]},");
		return childSB.toString();
	}

	protected String CollectListChildForRole(Long id) {
		StringBuffer childSB = new StringBuffer("");
		List<BankType> childs = conHisService.collectFindByParentIdForRole(id);
		if (childs.size() == 0) {
			childSB.append("checked:'none',leaf:true},");
			return childSB.toString();
		}
		childSB.append("checked:'none',children:[");
		for (BankType ukt : childs) {
			childSB.append("{id:'" + ukt.getBankTypeId() + "' ,text:'" + ukt.getBankname() + "',");
			childSB.append(listChild(ukt.getBankTypeId()));
		}
		childSB.deleteCharAt(childSB.length() - 1);
		childSB.append("]},");
		return childSB.toString();
	}

	public String treeList() {
		try {
			String bankTypeId = getRequest().getParameter("bankTypeId");
			String start = getRequest().getParameter("start");
			String limit = getRequest().getParameter("limit");
			String parentId = "0";
			if (StringUtils.isNotEmpty(bankTypeId)) {
				parentId = bankTypeId;
			}
			List<BankType> childList = conHisService.findByParentIdForSql(
					new Integer(start), new Integer(limit), parentId);
			StringBuffer childlistSB = new StringBuffer(
					"{success:true,'totalCounts':").append(
					conHisService.findByParentIdForSqlCount(new Integer(start),
							new Integer(limit), parentId)).append(",result:");
			JSONSerializer jsonserializer = new JSONSerializer();
			jsonserializer.transform(new DateTransformer("yyyy-MM-dd"),
					new String[] { "createDate" });
			childlistSB.append(jsonserializer.serialize(childList));
			childlistSB.append("}");
			jsonString = childlistSB.toString();
			this.pagingBean = new PagingBean(new Integer(start), new Integer(limit));
		} catch (Exception e) {
			System.out.println(e);
		}
		return SUCCESS;
	}

	/**
	 * 机构部门的添加及保存操作
	 * 
	 * @author wkj
	 */
	public String bankTypeSave() {
		try {
			String path = "";
			String curDate = getRequest().getParameter("id");
			String bankName = getRequest().getParameter("name");
			Long nodeId = Long.parseLong(getRequest().getParameter("nodeId"));
			String branchId = getRequest().getParameter("branchId");
			Long parentId = nodeId;
			List<BankType> list = conHisService.selectName();
			int flag = 0;// 标记名称
			int falg1 = 1;// 标记网点号
			for (int i = 0; i < list.size(); i++) {
				if (bankName == "" || bankName.equals(list.get(i).getBankname())) {
					flag = flag + 1;
				}
				if (branchId == "" || branchId.equals(list.get(i).getBranchId())) {
					falg1 = falg1 + 1;
				}
			}
			if (StringUtils.isNotEmpty(branchId)) {
				if (StringUtils.isNotEmpty(bankName) && flag == 0 && falg1 == 1) {
					conHisService.addBankType(curDate, bankName, parentId, branchId);
					jsonString = "{success:true}";
				} else {
					if (flag != 0) {
						setJsonString("{success:false,message:'该机构部门名称已被占用，请修改!'}");
					} else if (falg1 != 1) {
						setJsonString("{success:false,message:'该网点号已被占用，请修改!'}");
					}
				}
			} else {
				if (StringUtils.isNotEmpty(bankName) && flag == 0) {
					conHisService.addBankType(curDate, bankName, parentId, branchId);
					jsonString = "{success:true}";
				} else {
					setJsonString("{success:false,message:'该机构部门名称已被占用或名称为空，请修改!'}");
				}
			}
		} catch (Exception e) {
			System.out.println(e);
		}
		return SUCCESS;
	}

	public String multiDelBank() {
		try {
			String bankTypeId = getRequest().getParameter("bankTypeId");
			String[] ids = bankTypeId.split(",");
			String opts = getRequest().getParameter("opts");
			if (ids != null) {
				for (String id : ids) {
					if (id != null && !"".equals(id)) {
						if ("2".equals(opts)) {// opts : 2--tingyong; 1--qiyong
							List<BankType> listbank = conHisService
									.findByParentId(new Long(id));
							if (listbank.size() == 0) {// 删除
								conHisService.getDelBank(new Long(id));
								setJsonString("{success:false,message:'你已成功删除该机构部门。'}");
							} else if (listbank.size() != 0) {
								setJsonString("{success:false,message:'该机构部门还有子部门，请将子部门转移后再删除该部门!'}");
							}
						}
					}

				}
			}
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println(e);
		}
		return SUCCESS;
	}

	/*
	 * 2015-01-17
	 * 
	 * @anthor :wkj@nk 机构部门的修改
	 */
	public String updateBankType() {
		try {
			Long bankTypeId = Long.parseLong(getRequest().getParameter("bankTypeId"));
			String parentName = getRequest().getParameter("parentName");
			String bankName = getRequest().getParameter("bankName");
			String updateDate = getRequest().getParameter("update_Date");
			String branchId = getRequest().getParameter("branchId");
			if (parentName != "" && bankName != "") {
				conHisService.updateBankType(bankTypeId, bankName, updateDate,branchId);
			}
			if (parentName != "" && bankName != "") {
				jsonString = "{success:true}";
			} else {
				jsonString = "{success:false}";
			}
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println(e);
		}
		return SUCCESS;
	}

	/**
	 * 显示上级部门名称列表
	 */
	public String listparentName() {
		try {
			List<BankType> list = null;
			StringBuffer buff = new StringBuffer("[");
			if (bankTypeId == null || bankTypeId == 0) {
				list = conHisService.getProvince();
				if (list.size() > 0) {
					for (BankType r : list) {
						buff.append("['" + r.getBankTypeId() + "','" + r.getBankname() + "'],");
					}
				}
			} else {
				System.out.println("[ConHisAction.java] -else");
				list = conHisService.findByParentId(bankTypeId);
				if (list.size() > 0) {
					for (BankType r : list) {
						buff.append("['" + r.getBankTypeId() + "','" + r.getBankname() + "'],");
					}
				}
			}
			buff.deleteCharAt(buff.length() - 1);
			buff.append("]");
			setJsonString(buff.toString());
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println(e);
		}
		return SUCCESS;
	}

	/**
	 * 20140606 查看业务资料时查询对应的网点名称
	 */
	public String selectparentName() {
		try {
			Long Id = Long.parseLong(getRequest().getParameter("parentId"));
			Gson gson = new Gson();
			StringBuffer sb = new StringBuffer("{success:true,data:");
			if (bankType == null) {
				BankType bankType2 = new BankType();
				bankType2.setParentId(new Long(0));
				bankType2.setBankname("总行");
				sb.append(gson.toJson(bankType2));
			} else {
				sb.append(gson.toJson(bankType));
			}
			sb.append("}");
			setJsonString(sb.toString());
		} catch (Exception e) {
			System.out.println(e);
		}
		return SUCCESS;
	}

	// ==================================================================================
	/**
	 * 存储Operation表数据 进入系统、登录Cti、退出系统 2014/12/18
	 * 
	 * @author Hyman
	 */
	public String insertOperation() {
		try {
			Long BS_Num = Long.parseLong(getRequest().getParameter("bsnum"));
			String agentId = getRequest().getParameter("agentID");
			String insertTime = getRequest().getParameter("insertTime");
			String Stype = getRequest().getParameter("Stype");
			conHisService.insertOperationData(BS_Num, agentId, insertTime,Stype);
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println("insertOperation() catch Exception e " + e);
		}
		return SUCCESS;
	}

	/**
	 * 获取Operation表中的最大的BS_Num值 2014/12/18
	 * 
	 * @author Hyman
	 */
	public String selectMaxOpera() {
		try {
			OperationData oData = conHisService.selectMaxOpera();
			Gson gson = new Gson();
			StringBuffer sb = new StringBuffer("{success:true,data:");
			sb.append(gson.toJson(oData));
			sb.append("}");
			setJsonString(sb.toString());
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println("selectMaxOpera() catch Exception e " + e);
		}
		return SUCCESS;
	}

	/**
	 * 插入Attendance数据值 考勤记录 2014/12/18
	 * 
	 * @author Hyman
	 */
	public String insertWorkAttendance() {
		try {
			Long BS_Num = Long.parseLong(getRequest().getParameter("bsnum"));
			String agentId = getRequest().getParameter("agentID");
			String loginSysTime = getRequest().getParameter("loginSysTime");
			String loginCtiTime = getRequest().getParameter("loginCtiTime");
			String logoutSysTime = getRequest().getParameter("logoutSysTime");
			String Status = getRequest().getParameter("Status");
			String Reason = getRequest().getParameter("Reason");
			String remarks = getRequest().getParameter("Remarks");
			conHisService.insertWorkAttendance(BS_Num, agentId, loginSysTime,
					loginCtiTime, logoutSysTime, Status, Reason, remarks);
		} catch (Exception e) {
			System.out.println("insertWorkAttendance() catch Exception e " + e);
		}
		return SUCCESS;
	}

	/**
	 * 自助终端业务资料查询展示 2015/02/06 Fernando ..
	 */
	public String machineList() {
		try {
			String wdNum = getRequest().getParameter("wdNum"); 
			String cusName = getRequest().getParameter("cusName");
			String tellernum = getRequest().getParameter("tellernum");
			String tradedateStart = getRequest().getParameter("tradedateStart");
			String tradedateEnd = getRequest().getParameter("tradedateEnd"); 
			String traderesult = getRequest().getParameter("traderesult");
			Integer start = 0;
			Integer limit = PagingBean.DEFAULT_PAGE_SIZE;
			String s_start = getRequest().getParameter("start");
			String s_limit = getRequest().getParameter("limit");
			if (StringUtils.isNotEmpty(s_start)) {
				start = new Integer(s_start);
			}
			if (StringUtils.isNotEmpty(s_limit)) {
				limit = new Integer(s_limit);
			}
			int count = 0;// 查询记录的总数
			List<MachineSelf> list = new ArrayList<MachineSelf>();

			list = conHisService.machineSelfList(start, limit, wdNum, cusName,
					tellernum, tradedateStart, tradedateEnd, traderesult);
			count = conHisService.machineSelfCount(wdNum, cusName, tellernum,
					tradedateStart, tradedateEnd, traderesult);
			StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
					.append(count).append(",result:[");
			for (int i = 0; i < list.size(); i++) {
				buff.append("[").append(
						"" + list.get(i).getMsid() + ",'" + list.get(i).getWdNum()
							+ "','" + list.get(i).getWdName() + "','"
							+ list.get(i).getTellernum() + "','"
							+ list.get(i).getBustype() + "','"
							+ list.get(i).getTradedate() + "','"
							+ list.get(i).getDealnum() + "','"
							+ list.get(i).getTraderesult() + "','"
							+ list.get(i).getCusName() + "','"
							+ list.get(i).getCertigier() + "','"
							+ list.get(i).getCardnum() + "','"
							+ list.get(i).getIdcardnum() + "','"
							+ list.get(i).getPresentID() + "','"
							+ list.get(i).getParentID() + "','"
							+ list.get(i).getBusDealNum() + "','"
							+ list.get(i).getAmount() + "'],");
			}
			if (list.size() > 0) {
				buff.deleteCharAt(buff.length() - 1);
			}
			buff.append("]}");
			setJsonString(buff.toString());
			this.pagingBean = new PagingBean(start, limit);
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println("machineList, Exception:"+e.toString());
		}
		return SUCCESS;
	}

	/**
	 * 查询自助设备的文件路径
	 * 
	 * @return
	 */
	public String getMachineSelfAttach() {
		try {
			String machselfid = getRequest().getParameter("machSelfId"); // 自助资料ID
			List<MachineSelfAttach> machineSelfAttachs = new ArrayList<MachineSelfAttach>();
			machineSelfAttachs = conHisService.machSelfAttachList(machselfid);
			StringBuffer buff = new StringBuffer("[");
			for (int i = 0; i < machineSelfAttachs.size(); i++) {
				buff.append("['" + machineSelfAttachs.get(i).getMachineSelfid())
						.append("','" + machineSelfAttachs.get(i).getFiletype())
						.append("','" + machineSelfAttachs.get(i).getFilepath())
						.append("','" + machineSelfAttachs.get(i).getCreatetime())
						.append("'],");
			}
			if (machineSelfAttachs.size() > 0) {
				buff.deleteCharAt(buff.length() - 1);// 去掉最后的,号
			}
			buff.append("]");
			setJsonString(buff.toString());
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println("getMachineSelfAttach, Exception:"+e.toString());
		}
		return SUCCESS;
	}

	// ==============================================================重写业务资料数据展示

	/**
	 * 业务资料显示列表
	 * 
	 * @author wangkaijuan 2015/05/06
	 */
	public String listCon() {
		try {
			AppUser currentUser = ContextUtil.getCurrentUser();
			Long userid = currentUser.getUserId();
			String bulu_S = getRequest().getParameter("bulu_S"); // 办理人
			String serialNum = getRequest().getParameter("serialNum"); // 补录人
			String startimes = getRequest().getParameter("startimes"); // 补录时间
			String endtimes = getRequest().getParameter("endtimes"); // 补录结果
			String mainContactNum = getRequest().getParameter("mainContactNum"); // 补录时间
			String agentName = getRequest().getParameter("agentName"); // 补录结果
			String dealStaId = getRequest().getParameter("fllgdealStaId");// '1001','成功','11','失败'
			String busTypId = getRequest().getParameter("busTypId");
			Integer start1 = 1;
			Integer limit1 = 25;
			String s_start1 = getRequest().getParameter("start1");
			String s_limit1 = getRequest().getParameter("limit1");
			if (StringUtils.isNotEmpty(s_start1)) {
				start1 = new Integer(s_start1);
			}
			if (StringUtils.isNotEmpty(s_limit1)) {
				limit1 = new Integer(s_limit1);
			}
			int count = 0;// 查询记录的总数
			List<ConHis> list = new ArrayList<ConHis>();
			list = conHisService.conHisList(start1, limit1 - 1, userid, dealStaId,
					busTypId, bulu_S, serialNum, startimes, endtimes,
					mainContactNum, agentName);// 根据条件查询
			count = conHisService.conHisListCount(userid, dealStaId, busTypId,
					bulu_S, serialNum, startimes, endtimes, mainContactNum,
					agentName);// 总数目
			StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
					.append(count).append(",result:");
			JSONSerializer serializer = new JSONSerializer();
			serializer.transform(new DateTransformer("yyyy-MM-dd HH:mm:ss"),
					new String[] { "staTime", "endTime", "createDate" });
			buff.append(serializer.serialize(list));
			buff.append("}");
			jsonString = buff.toString();
			this.pagingBean = new PagingBean(start1, limit1 - 1);
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println("listCon, Exception:"+e.toString());
		}
		return SUCCESS;
	}

	// =============================================================请机加卡==========================================

	// 远程智能柜员易转账明细清单
	public String listTransferAccounts() {
		try {
			String branchId = getRequest().getParameter("branchId"); // 补录人
			String operatorId = getRequest().getParameter("operatorId"); // 补录时间
			String equipmentName = getRequest().getParameter("equipmentName"); // 补录结果
			String startimes = getRequest().getParameter("startimes");
			String endtimes = getRequest().getParameter("endtimes");
			Integer start = 0;
			Integer limit = PagingBean.DEFAULT_PAGE_SIZE;
			String s_start = getRequest().getParameter("start");
			String s_limit = getRequest().getParameter("limit");
			if (StringUtils.isNotEmpty(s_start)) {
				start = new Integer(s_start);
			}
			if (StringUtils.isNotEmpty(s_limit)) {
				limit = new Integer(s_limit);
			}
			int count = 0;// 查询记录的总数
			List<QJTransferAccounts> list = new ArrayList<QJTransferAccounts>();
			list = conHisService.TransferAccountsList(start, limit, branchId,
					operatorId, equipmentName, startimes, endtimes);// 根据条件查询
			count = conHisService.TransferAccountsCount(branchId, operatorId,
					equipmentName, startimes, endtimes);
			StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
					.append(count).append(",result:");
			JSONSerializer serializer = new JSONSerializer();
			serializer.transform(new DateTransformer("yyyy-MM-dd"), new String[] {
					"contractDate", "printDate" });
			serializer.transform(new DateTransformer(" HH:mm:ss "), new String[] {
					"traAccTime", "printTime" });
			buff.append(serializer.serialize(list));
			buff.append("}");
			jsonString = buff.toString();
			this.pagingBean = new PagingBean(start, limit);
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println("listTransferAccounts, Exception:"+e.toString());
		}
		return SUCCESS;
	}

	// ---显示远程智能柜员机重空汇总清单
	public String listQJAddCard() {
		try {
			String branchId = getRequest().getParameter("branchId"); // 补录人
			String operatorId = getRequest().getParameter("operatorId"); // 补录时间
			String equipmentName = getRequest().getParameter("equipmentName"); // 补录结果
			String startimes = getRequest().getParameter("startimes");
			String endtimes = getRequest().getParameter("endtimes");
			Integer start = 0;
			Integer limit = PagingBean.DEFAULT_PAGE_SIZE;
			String s_start = getRequest().getParameter("start");
			String s_limit = getRequest().getParameter("limit");
			if (StringUtils.isNotEmpty(s_start)) {
				start = new Integer(s_start);
			}
			if (StringUtils.isNotEmpty(s_limit)) {
				limit = new Integer(s_limit);
			}
			int count = 0;// 查询记录的总数
			List<QJAddCard> list = new ArrayList<QJAddCard>();
			
			list = conHisService.qJAddCardList(start, limit, branchId, operatorId,
					equipmentName, startimes, endtimes);// 根据条件查询
			count = conHisService.qJAddCardCount(branchId, operatorId,
					equipmentName, startimes, endtimes);
			StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
					.append(count).append(",result:");
			JSONSerializer serializer = new JSONSerializer();
			serializer.transform(new DateTransformer("yyyy-MM-dd"), new String[] {
					"addcardDate", "printDate" });
			serializer.transform(new DateTransformer(" HH:mm:ss "), new String[] {
					"addcardTime", "printTime" });
			buff.append(serializer.serialize(list));
			buff.append("}");
			jsonString = buff.toString();
			this.pagingBean = new PagingBean(start, limit);
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println("listQJAddCard, Exception:"+e.toString());
		}
		
		return SUCCESS;
	}

	// ---显示远程智能柜员机重空明细汇总清单
	public String listQJIssueCard() {
		try {
			ContextUtil.getCurrentUserId();
			String branchId = getRequest().getParameter("branchId"); // 
			String operatorId = getRequest().getParameter("operatorId"); // 
			String equipmentName = getRequest().getParameter("equipmentName"); // 
			String startimes = getRequest().getParameter("startimes");
			String endtimes = getRequest().getParameter("endtimes");
			Integer start = 0;
			Integer limit = PagingBean.DEFAULT_PAGE_SIZE;
			String s_start = getRequest().getParameter("start");
			String s_limit = getRequest().getParameter("limit");
			if (StringUtils.isNotEmpty(s_start)) {
				start = new Integer(s_start);
			}
			if (StringUtils.isNotEmpty(s_limit)) {
				limit = new Integer(s_limit);
			}
			int count = 0;// 查询记录的总数
			List<QJIssueCard> list = new ArrayList<QJIssueCard>();
			list = conHisService.QJIssueCardList(start, limit, branchId, operatorId, equipmentName, startimes, endtimes);// 根据条件查询
			count = conHisService.QJIssueCardCount(branchId, operatorId, equipmentName, startimes, endtimes);
			StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
					.append(count).append(",result:");
			JSONSerializer serializer = new JSONSerializer();
			serializer.transform(new DateTransformer("yyyy-MM-dd "), new String[] {
					"tradeDate", "printDate" });
			serializer.transform(new DateTransformer("HH:mm:ss"), new String[] {
					"transactionTime", "printTime" });
			buff.append(serializer.serialize(list));
			buff.append("}");
			jsonString = buff.toString();
			this.pagingBean = new PagingBean(start, limit);
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println("listQJIssueCard, Exception:"+e.toString());
		}
		return SUCCESS;
	}
	
	public String getQJAddCardZuiJinList(){
		System.out.println(" getQJAddCardZuiJinList , ");
		String MaxDate = getRequest().getParameter("MaxDate"); // 
		String MinDate = getRequest().getParameter("MinDate"); // 
		
		
		
		return SUCCESS;
	}

	// ----远程智能柜员机合约汇总清单

	public String listCount() throws ParseException {
		String branchId = getRequest().getParameter("branchId"); // 补录人
		String operatorId = getRequest().getParameter("operatorId"); // 补录时间
		String equipmentName = getRequest().getParameter("equipmentName"); // 补录结果
		String startimes = getRequest().getParameter("startimes");
		String endtimes = getRequest().getParameter("endtimes");
		Integer start = 0;
		Integer limit = PagingBean.DEFAULT_PAGE_SIZE;
		String s_start = getRequest().getParameter("start");
		String s_limit = getRequest().getParameter("limit");
		if (StringUtils.isNotEmpty(s_start)) {
			start = new Integer(s_start);
		}
		if (StringUtils.isNotEmpty(s_limit)) {
			limit = new Integer(s_limit);
		}
		int count = 0;// 查询记录的总数
		List<QJContractHZRecord> list = new ArrayList<QJContractHZRecord>();
		list = conHisService.QJContractRecordZKlist(start, limit, branchId,
				operatorId, equipmentName, startimes, endtimes);// 根据条件查询
		count = conHisService.QJContractRecordZKCount(branchId, operatorId,
				equipmentName, startimes, endtimes);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(count).append(",result:");
		JSONSerializer serializer = new JSONSerializer();
		serializer.transform(new DateTransformer("yyyy-MM-dd "),new String[] { "conDate" });
		serializer.transform(new DateTransformer("HH:mm:ss"),new String[] { "conTime" });
		buff.append(serializer.serialize(list));
		buff.append("}");
		jsonString = buff.toString();
		this.pagingBean = new PagingBean(start, limit);
		return SUCCESS;
	}

	/**
	 * *设备根据权限显示
	 */

	public String listEquipmentRole() {
		String suoshuhang = getRequest().getParameter("bankTypeId");
		String branchId = getRequest().getParameter("branchId");
		String operatorId = getRequest().getParameter("operatorId");
		Integer start = 0;
		Integer limit = PagingBean.DEFAULT_PAGE_SIZE;
		String s_start = getRequest().getParameter("start");
		String s_limit = getRequest().getParameter("limit");
		if (StringUtils.isNotEmpty(s_start)) {
			start = new Integer(s_start);
		}
		if (StringUtils.isNotEmpty(s_limit)) {
			limit = new Integer(s_limit);
		}
		int count = 0;// 查询记录的总数
		List<Equipment> list = new ArrayList<Equipment>();
		// 查询总数
		list = conHisService.listEquipmentRole(start, limit, suoshuhang,
				branchId, operatorId);
		count = conHisService.listEquipmentRoleCount(suoshuhang, branchId,
				operatorId);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(count).append(",result:[");
		for (int i = 0; i < list.size(); i++) {
			if (list.get(i).getEId() != null
					&& !"".equals(list.get(i).getEId())) {
				buff.append("[").append("" + list.get(i).getEId() + ",");
			} else {
				buff.append("[").append("" + ",");// 是为了防止数据库中取出来的值为null
			}
			if (list.get(i).getBankTypeId() != null
					&& !"".equals(list.get(i).getBankTypeId())) {
				buff.append(list.get(i).getBankTypeId() + ",");
			} else {
				buff.append(",");// 是为了防止数据库中取出来的值为null
			}
			if (list.get(i).getParentId() != null
					&& !"".equals(list.get(i).getParentId())) {
				buff.append(list.get(i).getParentId() + ",'");
			} else {
				buff.append("" + ",'");// 是为了防止数据库中取出来的值为null
			}
			if (list.get(i).getEquipmentId() != null
					&& !"".equals(list.get(i).getEquipmentId())) {
				buff.append(list.get(i).getEquipmentId() + "','");
			} else {
				buff.append("" + "','");
			}
			if (list.get(i).getBranchId() != null
					&& !"".equals(list.get(i).getBranchId())) {
				buff.append(list.get(i).getBranchId() + "','");
			} else {
				buff.append("" + "','");
			}
			if (list.get(i).getEquipmentName() != null
					&& !"".equals(list.get(i).getEquipmentName())) {
				buff.append(list.get(i).getEquipmentName() + "','");
			} else {
				buff.append("" + "','");
			}

			if (list.get(i).getBankname() != null
					&& !"".equals(list.get(i).getBankname())) {
				buff.append(list.get(i).getBankname() + "','");
			} else {
				buff.append("" + "','");
			}
			if (list.get(i).getParentName() != null
					&& !"".equals(list.get(i).getParentName())) {
				buff.append(list.get(i).getParentName() + "','");
			} else {
				buff.append("" + "','");
			}
			if (list.get(i).getOperatorId() != null
					&& !"".equals(list.get(i).getOperatorId())) {
				buff.append(list.get(i).getOperatorId() + "','");
			} else {
				buff.append("" + "','");
			}
			if (list.get(i).getCurdate() != null
					&& !"".equals(list.get(i).getCurdate())) {
				buff.append(list.get(i).getCurdate() + "','");
			} else {
				buff.append("" + "','");
			}
			if (list.get(i).getIpAddress() != null
					&& !"".equals(list.get(i).getIpAddress())) {
				buff.append(list.get(i).getIpAddress() + "','");
			} else {
				buff.append("" + "','");
			}
			if (list.get(i).getAddress() != null
					&& !"".equals(list.get(i).getAddress())) {
				buff.append(list.get(i).getAddress() + "'],");
			} else {
				buff.append("" + "'],");
			}

		}

		if (list.size() > 0) {
			buff.deleteCharAt(buff.length() - 1);
		}
		buff.append("]}");
		setJsonString(buff.toString());
		this.pagingBean = new PagingBean(start, limit);
		return SUCCESS;
	}

	/*************************************************************************
	 * ***************************************************************业务资料******
	 * ***********
	 */

	/**
	 * 业务资料显示列表
	 * 
	 * @author wangkaijuan 2015/05/06
	 */
	public String SelectRoleCon() {
		try {
			AppUser currentUser = ContextUtil.getCurrentUser();
			Long userid = currentUser.getUserId();
			String bulu_S = getRequest().getParameter("bulu_S"); // 办理人
			String serialNum = getRequest().getParameter("serialNum"); // 补录人
			String startimes = getRequest().getParameter("startimes"); // 补录时间
			String endtimes = getRequest().getParameter("endtimes"); // 补录结果
			String mainContactNum = getRequest().getParameter("mainContactNum"); // 补录时间
			String agentName = getRequest().getParameter("agentName"); // 补录结果
			String dealStaId = getRequest().getParameter("fllgdealStaId");// '1001','成功','11','失败'
			String busTypId = getRequest().getParameter("busTypId");
			Integer start = 0;
			Integer limit = PagingBean.DEFAULT_PAGE_SIZE;
			String s_start = getRequest().getParameter("start");
			String s_limit = getRequest().getParameter("limit");
			if (StringUtils.isNotEmpty(s_start)) {
				start = new Integer(s_start);
			}
			if (StringUtils.isNotEmpty(s_limit)) {
				limit = new Integer(s_limit);
			}
			int count = 0;// 查询记录的总数
			List<ConHis> list = new ArrayList<ConHis>();
			list = conHisService.SelectRoleCon(start, limit, dealStaId, busTypId,
					bulu_S, serialNum, startimes, endtimes, mainContactNum,
					agentName);// 根据条件查询
			count = conHisService.SelectRoleCount(dealStaId, busTypId, bulu_S,
					serialNum, startimes, endtimes, mainContactNum, agentName);// 总数目
			StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(count).append(",result:");
			JSONSerializer serializer = new JSONSerializer();
			serializer.transform(new DateTransformer("yyyy-MM-dd HH:mm:ss"),
					new String[] { "staTime", "endTime", "createDate" });
			buff.append(serializer.serialize(list));
			buff.append("}");
			jsonString = buff.toString();
			this.pagingBean = new PagingBean(start, limit);
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println(" -> SelectRoleCon Exception e : " + e.toString());
		}
		
		return SUCCESS;
	}

	/*********
	 * 查询重空汇总表中的记录
	 */
	public String SelectAddCard() {
		try {
			String operatorId = getRequest().getParameter("operatorId");
			String branchId = getRequest().getParameter("branchId");
			List<QJAddCard> list = conHisService.SelectAddCardR(operatorId,branchId);
			String str = "";
			if (list.size() == 0) 
				str = "0";
			else if (list.size() == 1)
				str = "1";
			else if (list.size() > 1) 
				str = "2";
			jsonString = "{success:" + str + "}";
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println(" -> SelectAddCard Exception e : " + e.toString());
		}
		return SUCCESS;
	}

	/**
	 * 查询重空汇总明细表中的记录
	 */
	public String SelectAddMX() {
		try {
			String operatorId = getRequest().getParameter("operatorId");
			String branchId = getRequest().getParameter("branchId");
			String addId = getRequest().getParameter("addId");
			List<QJAddCard> list = conHisService.SelectAddCardR(operatorId,branchId);		 // 查询重空明细中的表
			List<QJAddCard> list2 = conHisService.SelectAddRMX(operatorId, branchId , addId);// 查询最后两条记录方法
			String str = "";
			String staDate = "";
			String endDate = "";
			SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			SimpleDateFormat mat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			if (list2.size() == 0) {// 不打印重空汇总明细
				String date1 = "0" + "~" + mat.format(new Date()) + "~" + format.format(new Date());// 最大时间
				str = date1;
			}
			if (list2.size() == 1) {// 只有一条记录
				endDate = "1999-12-31 00:00:00";// 最大时间
				staDate=format.format(list2.get(0).getAddcardTime());
				List<QJIssueCard> Issue = conHisService.selectIssueR(operatorId,branchId, staDate, endDate ,addId);// 查询重空明细表
				if (Issue.size() == 0) {
					String date1 = "01" + "~" + format.format(list2.get(0).getAddcardTime()) +"~"+"1999-12-31 00:00:00";// 最大时间
					str = date1;
				} else {
					String date1 = "2" +"~"+ format.format(list2.get(0).getAddcardTime())+ "~"+"1999-12-31 00:00:00";// 最大时间
					str = date1;
				}
			}
			if (list2.size() > 1) {// 至少有两条
				staDate = mat.format(list2.get(0).getAddcardTime());// 最大时间
				endDate = format.format(list2.get(1).getAddcardTime());// 最小时间
				List<QJIssueCard> Issue = conHisService.selectIssueR(operatorId,branchId, staDate, endDate,addId);// 查询重空明细表
				if (Issue.size() == 0) {
					String date1 = "02" + "~" + mat.format(list2.get(0).getAddcardTime()) + "~" + format.format(list2.get(1).getAddcardTime());
					str = date1;
				} else {
					String date1 = "2" + "~" + mat.format(list2.get(0).getAddcardTime()) + "~" + format.format(list2.get(1).getAddcardTime());// 最大时间
					str = date1;
				}
			}
			jsonString = "{success:" + str + "}";
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println(" -> SelectAddMX Exception e : " + e.toString());
		}
		return SUCCESS;
	}

	/**
	 * 查询重空汇总明细表中的记录
	 */
	public String SelectZHMX() {
		try {
			String operatorId = getRequest().getParameter("operatorId");
			String branchId = getRequest().getParameter("branchId");
			String addId = getRequest().getParameter("addId");
			List<QJAddCard> list = conHisService.SelectAddCardR(operatorId, branchId);// 查询重空明细中的表
			List<QJAddCard> list2 = conHisService.SelectAddRMX(operatorId, branchId,addId);// 查询最后两条记录方法
			String str = "";
			String staDate = "";
			String endDate = "";
			SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd ");
			SimpleDateFormat mat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			if (list.size() == 0) {// 不打印重空汇总明细
				String date1 = "0" + "~" + mat.format(new Date()) + "~" + format.format(new Date());// 最大时间
				str = date1;
			}
			if (list.size() == 1) {// 只有一条记录
				staDate = format.format(list.get(0).getAddcardDate());// 最小时间
				endDate = mat.format(new Date());// 最大时间
				List<QJContractRecordId> Contra = conHisService.selectContraR(
						operatorId, branchId, staDate, endDate);// 查询重空明细表
				if (Contra.size() == 0) {
					String date1 = "01" + "~" + mat.format(new Date()) + "~"
							+ format.format(new Date());// 最大时间
					str = date1;
				} else {
					// str=staDate;
					SimpleDateFormat format1 = new SimpleDateFormat("yyyy-MM-dd ");
					String date1 = "2" + "~" + mat.format(new Date()) + "~" + format.format(list2.get(1).getAddcardDate());// 最大时间
					str = date1;
				}
			}
			if (list.size() > 1) {// 至少有两条
				staDate = mat.format(list2.get(0).getAddcardTime());// 最大时间
				endDate = format.format(list2.get(1).getAddcardDate());// 最小时间
				List<QJContractRecordId> Contra = conHisService.selectContraR(operatorId, branchId, staDate, endDate);// 查询重空明细表
				if (Contra.size() == 0) {
					String date1 = "02" + "~" + mat.format(new Date()) + "~" + format.format(new Date());// 最大时间
					str = date1;
				} else {
					SimpleDateFormat format1 = new SimpleDateFormat("yyyy-MM-dd ");
					String date1 = "2" + "~" + mat.format(list2.get(0).getAddcardTime()) + "~" + format.format(list2.get(1).getAddcardDate());// 最大时间
					str = date1;
				}
			}
			jsonString = "{success:" + str + "}";
		} catch (Exception e) {
			System.out.println(" -> SelectZHMX Exception e : " + e.toString());
		}
		return SUCCESS;

	}
	
	// 远程智能柜员机合约明细清单
	public String listContractRecord() {
		try {
			String branchId = getRequest().getParameter("branchId"); // 补录人
			String operatorId = getRequest().getParameter("operatorId"); // 补录时间
			String equipmentName = getRequest().getParameter("equipmentName"); // 补录结果
			String startimes = getRequest().getParameter("startimes");
			String endtimes = getRequest().getParameter("endtimes");
			Integer start = 0;
			Integer limit = PagingBean.DEFAULT_PAGE_SIZE;
			String s_start = getRequest().getParameter("start");
			String s_limit = getRequest().getParameter("limit");
			if (StringUtils.isNotEmpty(s_start)) {
				start = new Integer(s_start);
			}
			if (StringUtils.isNotEmpty(s_limit)) {
				limit = new Integer(s_limit);
			}
			int count = 0;// 查询记录的总数
			List<QJContractRecordId> list = new ArrayList<QJContractRecordId>();
			list = conHisService.ContractRecordList(start, limit, branchId,
					operatorId, equipmentName, startimes, endtimes);// 根据条件查询
			count = conHisService.ContractRecordCount(branchId, operatorId,
					equipmentName, startimes, endtimes);
			StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
					.append(count).append(",result:");
			JSONSerializer serializer = new JSONSerializer();
			serializer.transform(new DateTransformer("yyyy-MM-dd"), new String[] {
					"contracttime", "printDate" });
			serializer.transform(new DateTransformer(" HH:mm:ss "),
					new String[] { "printTime" });
			buff.append(serializer.serialize(list));
			buff.append("}");
			jsonString = buff.toString();
			this.pagingBean = new PagingBean(start, limit);
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println(" -> listContractRecord Exception e : " + e.toString());
		}
		return SUCCESS;
	}

	/*********
	 * 查询合约汇总表中的记录
	 */
	public String SelectHYZK() {
		try {
			String operatorId = getRequest().getParameter("operatorId");
			String branchId = getRequest().getParameter("branchId");
			String conId = getRequest().getParameter("conId");
			SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			//考虑生产“重空汇总记录和合约汇总记录数据”肯定一致，就直接应用从查询重空中的最近两条数据  所以主键ID也会一致
			List<QJContractHZRecord> conList = conHisService.selectConRMX(operatorId, branchId,conId);//
			//根据前台选中的conId查询合约汇总中最进的两天的数据...
			//获取当前最近的两天的日期 yyyy-MM-dd 
			String str = "";
			if(conList.size() == 1){
				str = "1~"+"1999-12-31 00:00:00"+"~"+conList.get(0).getConTime();
			}else{
				String startDate = format.format(conList.get(1).getConTime());
				String endDate = format.format(conList.get(0).getConTime());
				//endDate = endDate + (new SimpleDateFormat("HH:mm:ss"));
				//带着刚才从合约汇总中查询出来的两个日期，去合约明细表中查询是否有数据 QJContractRecordId
				List<QJContractRecordId> recoList = conHisService.selectReoMX(operatorId, branchId,startDate,endDate);//
				//判断recoList 是否为空，如果为空的话，需要提示前台该笔合约汇总，没有明细可查询
				if(recoList.size() == 0) {
					str = "0~"+startDate+"~"+endDate;
				}else{
					str = "1~"+startDate+"~"+endDate;
				}
			}
			jsonString = "{success:" + str + "}";
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println(" -> SelectHYZK Exception e : " + e.toString());
		}
		return SUCCESS;
	}

	/**
	 * 业务资料屏蔽支行操作员与后督管理员不能查看音频与视频
	 * */
	public String SelectRole() {
		try {
			AppUser user = ContextUtil.getCurrentUser();
			List<AppRole> listRole = conHisService.selectRoleName(user.getUserId());
			String strR = listRole.get(0).getRoleName();
			jsonString = "{success:" + strR + "}";
			
//			AppRole ar = new AppRole();
//			ar = commonManager.findFirstByCustomized(AppRole.class, param("appUsers.userId", OP.equal, user.getUserId()));
//			System.out.println("用广州智安的接口来调用后台查询数据："+ar.getRoleName());
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println(" -> SelectRole Exception e : " + e.toString());
		}
		return SUCCESS;
	}
	
	/**
	 * 根据时间段->统计异转账的总金额
	 * @return
	 */
	public String CountMoney(){
		try{
			String startimes = getRequest().getParameter("StartT");
			String endtimes = getRequest().getParameter("EndT");
			String wdNum = getRequest().getParameter("wdNum"); // 
			String cusName = getRequest().getParameter("cusname"); // 
			String tellernum = getRequest().getParameter("tellernum"); // 
			String traderesult = getRequest().getParameter("tradeResult"); // 
			String count = conHisService.CountAmount(startimes,endtimes,wdNum,cusName,tellernum,traderesult);
			jsonString = "{success:" + count + "}";
		}catch (Exception e) {
			// TODO: handle exception
			System.out.println(" -> CountMoney Exception e : " + e.toString());
		}
		return SUCCESS;
	}
	
	/**
	 * insertLoginCTI
	 * Fernando Hu
	 * 2015/10/14 9:34 星期三
	 */
	public String saveOrUpdateLoginCTI(){
		try {
			SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			String loginTime = format.format(new Date());
			String loginDate = getRequest().getParameter("loginDate");
			String machineID = getRequest().getParameter("machineID");
			String agentID = getRequest().getParameter("agentID");
			
			//先判断当前座席最大的login数据的结束时间是否是null，若是null就将当前的时间修改该条数据
			//20160311.....有空指针异常提示，此处想办法解决空值情况
			List<CTI_Login_Info> maxLog = conHisService.getMaxLoginInfo(agentID);
			
			CTI_Login_Info loginInfo = new CTI_Login_Info();
			loginInfo.setLoginTime(loginTime);
			loginInfo.setLogoutTime("");
			loginInfo.setLoginDate(loginDate);
			loginInfo.setMachineID(machineID);
			loginInfo.setAgentID(agentID);
			conHisService.saveOrUpdateLoginCTI(loginInfo);
			
			if(maxLog.get(0).getLogoutTime() == null && loginTime.indexOf(maxLog.get(0).getLoginDate()) >= 0){
				//进行修改登录详情表数据
				System.out.println("loginTime = "+loginTime);
				maxLog.get(0).setLogoutTime(loginTime);
				conHisService.saveOrUpdateLoginCTI(maxLog.get(0));
			}
			
			
		} catch (Exception e) {
			// TODO: handle exception
			System.err.println(" -> saveOrUpdateLoginCTI Exception e : " + e.toString());
		}
		return SUCCESS;
	}
	/**
	 * updateLogOutCTI 、
	 * 首先查询该座席最大的一条数据，用来更改登出时间
	 * 2015/10/15  Fernando Hu
	 */
	public String updateLogOutCTI(){
		try {
			SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			String logoutTime = format.format(new Date());
			String agentID = getRequest().getParameter("agentID");
			//首先拿agentID去查询该座席主键ID最大的一条数据（也就是最近的一条记录）
			List<CTI_Login_Info> maxLog = conHisService.getMaxLoginInfo(agentID);
			//进行修改登录详情表数据
			if(logoutTime.indexOf(maxLog.get(0).getLoginDate()) >= 0){
				maxLog.get(0).setLogoutTime(logoutTime);
				conHisService.saveOrUpdateLoginCTI(maxLog.get(0));
			}
			
		} catch (Exception e) {
			System.out.println("-[ConHisAction] updateLogOutCTI catch(Exception e : "+e.toString()+")" );
		}
		return SUCCESS;
	}
	/**
	 * insertRestCTI 
	 * 软电话CTI - 插入小休表原始数据
	 * 2015/10/16  Fernando Hu
	 */
	public String saveOrUpdateRestCTI(){
		try {
			SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			String typeStr = "";
			String startTime = format.format(new Date());
			String rDate = getRequest().getParameter("rDate");
			String rMachineID = getRequest().getParameter("rMachineID");
			String rAgentID = getRequest().getParameter("rAgentID");
			String rType = getRequest().getParameter("rType");
			CTI_Rest_Info restInfo = new CTI_Rest_Info();
			//判断当前小休的数字类型，分别以字符串形式存入后台
			if(rType.equals("0")){   	 //就餐
				typeStr = "REST_DINING";
			}else if(rType.equals("1")){  //离开
				typeStr = "REST_BATHROOM";
			}else if(rType.equals("2")){  //临时工作
				typeStr = "REST_REST";
			}else if(rType.equals("3")){  //管理
				typeStr = "REST_OTHER";
			}else if(rType.equals("4")){  //培训
				typeStr = "REST_TRAIN";
			}else{
				typeStr = "未知";
			}
			//先判断该坐席当前最大的小休结束时间是否是空的，如果是空的表示座席又异常切换PC电脑，这时候要做异常处理
			//.....
			List<CTI_Rest_Info> maxRest = conHisService.getMaxRestInfo(rAgentID);
			
			//先注释掉此处的小休类别，Rest_Train教学类别的时间顺序
			restInfo.setrStartTime(startTime);
			restInfo.setrEndTime("");
			restInfo.setrDate(rDate);
			restInfo.setrType(typeStr);
			restInfo.setrMachineID(rMachineID);
			restInfo.setrAgentID(rAgentID);
			conHisService.saveOrUpdateRestCTI(restInfo);
			
			if(maxRest.get(0).getrEndTime() == null && startTime.indexOf(maxRest.get(0).getrDate()) >= 0){
				System.out.println("-[ConHisAction] saveOrUpdateRestCTI XX==null && XX>=0 " );
				maxRest.get(0).setrEndTime(startTime);
				conHisService.saveOrUpdateRestCTI(maxRest.get(0));
			}
			
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println("-[ConHisAction] saveOrUpdateRestCTI catch(Exception e : "+e.toString()+")" );
		}
		return SUCCESS;
	}
	/**
	 * updateRestCTI 
	 * 软电话CTI - 修改小休结束时间
	 * 2015/10/16  Fernando Hu   10413604618
	 */
	public String updateRestCTI(){
		try {
			SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			//先根据座席名来查询最大的小休数据，更改结束时间
			String rAgentID = getRequest().getParameter("rAgentID");
			String endTime = format.format(new Date());
			//首先获得最大的ID
			List<CTI_Rest_Info> maxRest = conHisService.getMaxRestInfo(rAgentID);
			if(endTime.indexOf(maxRest.get(0).getrDate()) >= 0){
				//update数据....
				System.out.println("-[ConHisAction] updateRestCTI XX>=0 " );
				maxRest.get(0).setrEndTime(endTime);
				conHisService.saveOrUpdateRestCTI(maxRest.get(0));
			}
			
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println("-[ConHisAction] updateRestCTI catch(Exception e : "+e.toString()+")");
		}
		
		return SUCCESS;
	}
	/**
	 * insertAfterWorkCTI 进入事后处理记录数据
	 * Fernando Hu
	 * 2015/10/19 15:13 星期一
	 */
	public String saveOrUpdateAfterWorkCTI(){
		try {
			SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			String astartTime = format.format(new Date());
			String aDate = getRequest().getParameter("aDate");
			String aAgentID = getRequest().getParameter("aAgentID");
			String aMachineID = getRequest().getParameter("aMachineID");
			CTI_AfterWork_Info afterWorkInfo = new CTI_AfterWork_Info();
			afterWorkInfo.setaStartTime(astartTime);
			afterWorkInfo.setaDate(aDate);
			afterWorkInfo.setaEndTime("");
			afterWorkInfo.setaMachineID(aMachineID);
			afterWorkInfo.setaAgentID(aAgentID);
			conHisService.saveOrUpdateAfterWorkCTI(afterWorkInfo);
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println("-[ConHisAction] saveOrUpdateAfterWorkCTI catch(Exception e : "+e.toString()+")");
		}
		return SUCCESS;
	}
	/**
	 * insertAfterWorkCTI 进入事后处理记录数据
	 * Fernando Hu
	 * 2015/10/19 15:13 星期一
	 */
	public String updateAfterWorkCTI(){
		try {
			SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			String aAgentID = getRequest().getParameter("agentID");
			String aEndTime = format.format(new Date());
			List<CTI_AfterWork_Info> maxAfterWork = conHisService.getMaxAfterWorkInfo(aAgentID);
			//update数据....
			maxAfterWork.get(0).setaEndTime(aEndTime);
			conHisService.saveOrUpdateAfterWorkCTI(maxAfterWork.get(0));
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println("-[ConHisAction] updateAfterWorkCTI catch(Exception e : "+e.toString()+")");
		}
		return SUCCESS;
	}
	
	/**
	 * insertRingingCTI 来电振铃记录数据
	 * Fernando Hu
	 * 2015/10/19 17:13 星期一
	 */
	public String saveOrUpdateRingingCTI(){
		try {
			SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			//String rStartTime = getRequest().getParameter("rStartTime");
			String rStartTime = format.format(new Date());
			String rDate = getRequest().getParameter("rDate");
			String rAgentID = getRequest().getParameter("rAgentID");
			String rMachineID = getRequest().getParameter("rMachineID");
			String rCallID = getRequest().getParameter("rCallID");
			String rCallNum = getRequest().getParameter("rCallNum");
			CTI_Ringing_Info ringingInfo = new CTI_Ringing_Info();
			ringingInfo.setrAgentID(rAgentID);
			ringingInfo.setrCallID(rCallID);
			ringingInfo.setrDate(rDate);
			ringingInfo.setrEndTime("");
			ringingInfo.setrMachineID(rMachineID);
			ringingInfo.setrStartTime(rStartTime);
			ringingInfo.setrType(1);
			ringingInfo.setrCallNum(rCallNum);
			ringingInfo.setrRingingTime(0);
			ringingInfo.setrBothTime("");
			ringingInfo.setrBothTimeType(0);
			conHisService.saveOrUpdateRingingCTI(ringingInfo);
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println("-[ConHisAction] saveOrUpdateRingingCTI catch(Exception e : "+e.toString()+")");
		}
		return SUCCESS;
	}
	/**
	 * updateRingingCTI 修改来电振铃结束时间数据
	 * Fernando Hu
	 * 2015/10/19 17:30 星期一
	 */
	public String updateRingingCTI(){
		try {
			SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			String rEndTime = format.format(new Date());
			String rType = getRequest().getParameter("rType");
			String rAgentID = getRequest().getParameter("rAgentID");
			List<CTI_Ringing_Info> maxRinging = conHisService.getMaxRingingInfo(rAgentID);
			Date S = format.parse(maxRinging.get(0).getrStartTime());
			Date e = format.parse(rEndTime);
			long interval = (e.getTime() - S.getTime()) / 1000;
			//当类别type=0时，判断振铃开始到结束是否是30秒超时，若超时表示该通电话属于超时未接听，类型记为转接
			if(rType.equals("0") && interval >= 29){
				rType = "2";  //类别2 表示转接
			}
			long bothType = RetBothType(S.getHours(),S.getMinutes());
			String bothTime = RetTimeType(Integer.parseInt(String.valueOf(bothType)));
			maxRinging.get(0).setrEndTime(rEndTime);
			maxRinging.get(0).setrRingingTime(interval);
			maxRinging.get(0).setrBothTime(bothTime);
			maxRinging.get(0).setrBothTimeType(bothType);
			maxRinging.get(0).setrType(Long.parseLong(rType));
			conHisService.saveOrUpdateRingingCTI(maxRinging.get(0));
		}catch (Exception e) {
			// TODO: handle exception
			logger.error("-[ConHisAction] updateRingingCTI catch(Exception e : "+e.toString()+")");
		}
		return SUCCESS;
	}
	private long RetBothType(int hour,int minute){
		System.out.println("RetBothType,小时hour = " + hour +"   分钟 minute = " + minute);
		long TT = 0;
		switch (hour)
	    {
	        case 0: 
	        	if(minute >= 0 && minute <= 29) TT = 0;
	        	else TT = 1;
	        	break;
	        case 1: 
	        	if(minute >= 0 && minute <= 29) TT = 2;
	        	else TT = 3;
	        	break;
	        case 2: 
	        	if(minute >= 0 && minute <= 29) TT = 4;
	        	else TT = 5;
	        	break;
	        case 3: 
	        	if(minute >= 0 && minute <= 29) TT = 6;
	        	else TT = 7;
	        	break;
	        case 4: 
	        	if(minute >= 0 && minute <= 29) TT = 8;
	        	else TT = 9;
	        	break;
	        case 5: 
	        	if(minute >= 0 && minute <= 29) TT = 10;
	        	else TT = 11;
	        	break;
	        case 6: 
	        	if(minute >= 0 && minute <= 29) TT = 12;
	        	else TT = 13;
	        	break;
	        case 7: 
	        	if(minute >= 0 && minute <= 29) TT = 14;
	        	else TT = 15;
	        	break;
	        case 8: 
	        	if(minute >= 0 && minute <= 29) TT = 16;
	        	else TT = 17;
	        	break;
	        case 9: 
	        	if(minute >= 0 && minute <= 29) TT = 18;
	        	else TT = 19;
	        	break;
	        case 10: 
	        	if(minute >= 0 && minute <= 29) TT = 20;
	        	else TT = 21;
	        	break;
	        case 11: 
	        	if(minute >= 0 && minute <= 29) TT = 22;
	        	else TT = 23;
	        	break;
	        case 12: 
	        	if(minute >= 0 && minute <= 29) TT = 24;
	        	else TT = 25;
	        	break;
	        case 13: 
	        	if(minute >= 0 && minute <= 29) TT = 26;
	        	else TT = 27;
	        	break;
	        case 14: 
	        	if(minute >= 0 && minute <= 29) TT = 28;
	        	else TT = 29;
	        	break;
	        case 15: 
	        	if(minute >= 0 && minute <= 29) TT = 30;
	        	else TT = 31;
	        	break;
	        case 16: 
	        	if(minute >= 0 && minute <= 29) TT = 32;
	        	else TT = 33;
	        	break;
	        case 17: 
	        	if(minute >= 0 && minute <= 29) TT = 34;
	        	else TT = 35;
	        	break;
	        case 18: 
	        	if(minute >= 0 && minute <= 29) TT = 36;
	        	else TT = 37;
	        	break;
	        case 19: 
	        	if(minute >= 0 && minute <= 29) TT = 38;
	        	else TT = 39;
	        	break;
	        case 20: 
	        	if(minute >= 0 && minute <= 29) TT = 40;
	        	else TT = 41;
	        	break;
	        case 21: 
	        	if(minute >= 0 && minute <= 29) TT = 42;
	        	else TT = 43;
	        	break;
	        case 22: 
	        	if(minute >= 0 && minute <= 29) TT = 44;
	        	else TT = 45;
	        	break;
	        case 23: 
	        	if(minute >= 0 && minute <= 29) TT = 46;
	        	else TT = 47;
	        	break;
	    }
		return TT;
	}
	private String RetTimeType(int type){
		String TT = "";
        switch (type)
        {
            case 0: TT = "0:00 - 0:30"; break;
            case 1: TT = "0:30 - 1:00"; break;
            case 2: TT = "1:00 - 1:30"; break;
            case 3: TT = "1:30 - 2:00"; break;
            case 4: TT = "2:00 - 2:30"; break;
            case 5: TT = "2:30 - 3:00"; break;
            case 6: TT = "3:00 - 3:30"; break;
            case 7: TT = "3:30 - 4:00"; break;
            case 8: TT = "4:00 - 4:30"; break;
            case 9: TT = "4:30 - 5:00"; break;
            case 10: TT = "5:00 - 5:30"; break;
            case 11: TT = "5:30 - 6:00"; break;
            case 12: TT = "6:00 - 6:30"; break;
            case 13: TT = "6:30 - 7:00"; break;
            case 14: TT = "7:00 - 7:30"; break;
            case 15: TT = "7:30 - 8:00"; break;
            case 16: TT = "8:00 - 8:30"; break;
            case 17: TT = "8:30 - 9:00"; break;
            case 18: TT = "9:00 - 9:30"; break;
            case 19: TT = "9:30 - 10:00"; break;
            case 20: TT = "10:00 - 10:30"; break;
            case 21: TT = "10:30 - 11:00"; break;
            case 22: TT = "11:00 - 11:30"; break;
            case 23: TT = "11:30 - 12:00"; break;
            case 24: TT = "12:00 - 12:30"; break;
            case 25: TT = "12:30 - 13:00"; break;
            case 26: TT = "13:00 - 13:30"; break;
            case 27: TT = "13:30 - 14:00"; break;
            case 28: TT = "14:00 - 14:30"; break;
            case 29: TT = "14:30 - 15:00"; break;
            case 30: TT = "15:00 - 15:30"; break;
            case 31: TT = "15:30 - 16:00"; break;
            case 32: TT = "16:00 - 16:30"; break;
            case 33: TT = "16:30 - 17:00"; break;
            case 34: TT = "17:00 - 17:30"; break;
            case 35: TT = "17:30 - 18:00"; break;
            case 36: TT = "18:00 - 18:30"; break;
            case 37: TT = "18:30 - 19:00"; break;
            case 38: TT = "19:00 - 19:30"; break;
            case 39: TT = "19:30 - 20:00"; break;
            case 40: TT = "20:00 - 20:30"; break;
            case 41: TT = "20:30 - 21:00"; break;
            case 42: TT = "21:00 - 21:30"; break;
            case 43: TT = "21:30 - 22:00"; break;
            case 44: TT = "22:00 - 22:30"; break;
            case 45: TT = "22:30 - 23:00"; break;
            case 46: TT = "23:00 - 23:30"; break;
            case 47: TT = "23:30 - 0:00"; break;
        }
        return TT;
	}
	/**
	 * saveOrUpdateCallInfoCTI 插入通话开始时间原始数据
	 * Fernando Hu
	 * 2015/10/20 17:30 星期三
	 */
	public String saveOrUpdateCallInfoCTI(){
		try {
			SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			String cStartTime = format.format(new Date());
			String cDate = getRequest().getParameter("cDate");
			String cAgentID = getRequest().getParameter("cAgentID");
			String cMachineID = getRequest().getParameter("cMachineID");
			String cTermNum = getRequest().getParameter("cCallNum");
			CTI_Call_Info callInfo = new CTI_Call_Info();
			callInfo.setcAgentID(cAgentID);
			callInfo.setcDate(cDate);
			callInfo.setcEndTime("");
			callInfo.setcMachineID(cMachineID);
			callInfo.setcStartTime(cStartTime);
			callInfo.setcTermNum(cTermNum);
			conHisService.saveOrUpdateCallInfoCTI(callInfo);
			logger.debug("-> conHisService.saveOrUpdateCallInfoCTI(callInfo)执行完毕 ");
		} catch (Exception e) {
			// TODO: handle exception
			logger.error("-[ConHisAction] saveOrUpdateCallInfoCTI catch(Exception e : "+e.toString()+")");
		}
		return SUCCESS;
	}
	/**
	 * updateCallInfoCTI 修改通话结束时间原始数据
	 * Fernando Hu
	 * 2015/10/20 17:30 星期三
	 */
	public String updateCallInfoCTI(){
		try {
			SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			String cEndTime = format.format(new Date());
			String cAgentID = getRequest().getParameter("cAgentID");
			List<CTI_Call_Info> maxCallInfo = conHisService.getMaxCallInfo(cAgentID);
			maxCallInfo.get(0).setcEndTime(cEndTime);
			conHisService.saveOrUpdateCallInfoCTI(maxCallInfo.get(0));
		} catch (Exception e) {
			// TODO: handle exception
			logger.error("-[ConHisAction] updateCallInfoCTI catch(Exception e : "+e.toString()+")");
		}
		return SUCCESS;
	}
	

	/**
	 * 20140606 查看终端业务资料时查询对应的身份证号，客户姓名，
	 */
	public String selectQJTransferAccount() {
		String machineSelfid = getRequest().getParameter("machineSelfid");
		System.out.println("machineSelfid"+machineSelfid);
		if(StringUtils.isNotEmpty(machineSelfid)){
			try {
				List<QJTransferAccounts>qjta = conHisService.selectQJTransferAcco(machineSelfid);
				Gson gson = new Gson();
				StringBuffer sb = new StringBuffer("{success:true,data:");
				if (qjta == null) {
					QJTransferAccounts qjt = new QJTransferAccounts();
					qjt.setCardNumber("");
					qjt.setCustomerName("");
					qjt.setIdCardNumber("");
					sb.append(gson.toJson(qjt));
				} else {
					QJTransferAccounts qjt1 = new QJTransferAccounts();
					for(int i=0;i<qjta.size();i++){
						qjt1.setCardNumber(qjta.get(i).getCardNumber());
						qjt1.setCustomerName(qjta.get(i).getCustomerName());
						qjt1.setIdCardNumber(qjta.get(i).getIdCardNumber());
					}
					sb.append(gson.toJson(qjt1));
				}
				sb.append("}");
				setJsonString(sb.toString());
			} catch (Exception e) {
				System.out.println(e);
			}
		}else{
			Gson gson = new Gson();
			StringBuffer sb = new StringBuffer("{success:true,data:");
			QJTransferAccounts qjt = new QJTransferAccounts();
			qjt.setCardNumber("");
			qjt.setCustomerName("");
			qjt.setIdCardNumber("");
			sb.append(gson.toJson(qjt));
		}
	  return SUCCESS;
	}
	
	public String WXRequestDemo() {
		System.out.println("恭喜微信小程序连接后台接口成功！");
		return "SUCESS";
	}
}
