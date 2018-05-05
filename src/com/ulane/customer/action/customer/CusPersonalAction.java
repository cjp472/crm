package com.ulane.customer.action.customer;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
 */
import java.net.MalformedURLException;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.xml.namespace.QName;

import org.apache.commons.lang.StringUtils;
import org.apache.velocity.app.VelocityEngine;
import org.springframework.ui.velocity.VelocityEngineUtils;

import cn.com.pccw.service.asteriskwebservicev1.OverallInfo;
import cn.com.pccw.service.asteriskwebservicev1.OverallInfoWebservice;

import com.google.gson.Gson;
import com.htsoft.core.Constants;
import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.util.JsonUtil;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.oa.model.customer.Customer;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.model.system.RegionDetail;
import com.htsoft.oa.service.customer.CustomerService;
import com.htsoft.oa.service.system.AppUserService;
import com.htsoft.oa.service.system.RegionDetailService;
import com.ulane.core.plugin.client.NcSoapClientManager;
import com.ulane.core.util.HttpUtil;
import com.ulane.customer.model.customer.CusContact;
import com.ulane.customer.model.customer.CusPersonal;
import com.ulane.customer.model.customer.CusRelationship;
import com.ulane.customer.service.customer.CusContactService;
import com.ulane.customer.service.customer.CusPersonalService;
import com.ulane.customer.service.customer.CusRelationshipService;
import com.ulane.know.model.know.UkKnowTemplate;
import com.ulane.know.service.know.UkKnowTemplateService;

import flexjson.JSONDeserializer;
import flexjson.JSONSerializer;
import flexjson.transformer.DateTransformer;

/**
 * 
 * @author cf0666@gmail.com
 * 
 */
public class CusPersonalAction extends BaseAction {
	public static final String ADD_CUS_URL = "/createCust";

	@Resource
	private CusPersonalService cusPersonalService;
	@Resource
	private CusContactService cusContactService;
	@Resource
	private CusRelationshipService cusRelationshipService;
	@Resource
	private RegionDetailService regionDetailService;
	@Resource
	private AppUserService appUserService;

	private CusPersonal cusPersonal;
	@Resource
	private CustomerService customerService;
	@Resource
	private UkKnowTemplateService ukKnowTemplateService;
	@Resource
	private VelocityEngine flowVelocityEngine;
	@Resource
	private NcSoapClientManager ncSoapClientManager;

	private Long customerId;

	public Long getCustomerId() {
		return customerId;
	}

	public void setCustomerId(Long customerid) {
		this.customerId = customerid;
	}

	public CusPersonal getCusPersonal() {
		return cusPersonal;
	}

	public void setCusPersonal(CusPersonal cusPersonal) {
		this.cusPersonal = cusPersonal;
	}

	/**
	 * 显示列表
	 */
	public String list() {

		QueryFilter filter = new QueryFilter(getRequest());
		filter.addFilter("Q_isDelete_L_EQ", Constants.FLAG_UNDELETED.toString());
		List<CusPersonal> list = cusPersonalService.getAll(filter);

		// Type type=new TypeToken<List<CusPersonal>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(filter.getPagingBean().getTotalItems()).append(
						",result:");

		// Gson gson=new Gson();
		// buff.append(gson.toJson(list, type));
		JSONSerializer ser = JsonUtil.getJSONSerializer();
		ser.transform(new DateTransformer("yyyy-MM-dd"),new String[] { "birthday" });
		buff.append(ser.serialize(list));
		buff.append("}");

		jsonString = buff.toString();

		return SUCCESS;
	}

	/**
	 * 批量删除改成批量注销
	 * 
	 * @return
	 */
	public String multiDel() {

		String[] ids = getRequest().getParameterValues("ids");
		if (ids != null) {
			for (String id : ids) {
				CusPersonal cusPer = cusPersonalService.get(new Long(id));
				cusPer.setIsDelete(1L);
				cusPersonalService.save(cusPer);
			}
		}

		jsonString = "{success:true}";

		return SUCCESS;
	}

	/**
	 * 显示详细信息
	 * 
	 * @return
	 */
	public String get() {
		StringBuffer sb = new StringBuffer();
		if (customerId != null && !customerId.equals("undefined")) {
			CusPersonal cusPersonal = cusPersonalService.get(customerId);
			JSONSerializer serializer = new JSONSerializer();
			serializer.transform(new DateTransformer("yyyy-MM-dd HH:mm:ss"),
					new String[] { "staTime", "endTime", "creDat" });
			serializer.transform(new DateTransformer("yyyy-MM-dd"),
					new String[] { "birthday", "credDurDat" });
			// 将数据转成JSON格式
			sb.append("{success:true,data:");
			sb.append(serializer.include("cusContacts").serialize(cusPersonal));

			// Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
			// //将数据转成JSON格式
			// StringBuffer sb = new StringBuffer("{success:true,data:");
			// sb.append(gson.toJson(cusPersonal));

		} else {
			sb.append("{success:true,data:[]");
		}
		sb.append("}");
		setJsonString(sb.toString());

		return SUCCESS;
	}

	/**
	 * 保存推荐客户操作
	 */
	public String addRecommend() {
		String regionId = getRequest().getParameter("regionId");
		String remark = getRequest().getParameter("remark");
		if (remark != null) {
			cusPersonal.setRemark(remark);
		}
		if (regionId != null) {
			cusPersonal.setRegionId(Long.parseLong(regionId));
		}
		if (cusPersonal.getHappyCall() == null) {
			cusPersonal.setHappyCall(new Short("0"));
		}
		if (cusPersonal.getIsDm() == null) {
			cusPersonal.setIsDm(new Short("0"));
		}
		if (cusPersonal.getIsMail() == null) {
			cusPersonal.setIsMail(new Short("0"));
		}
		String relationship = getRequest().getParameter("relationship"); // 得到传过来的客户关系
		String cusId = getRequest().getParameter("customerId"); // 得到传过来的客户Id
		Customer customer = null;
		if (cusId != null && !cusId.equals("")) {
			customer = customerService.get(new Long(cusId));
			// customer = cusPersonalService.get(new Long(cusId));
		}

		cusPersonal.setHasChecked(new Short("0"));
		cusPersonal.setStaId(new Short("0"));
		cusPersonal.setCreDat(new Date());
		cusPersonal.setCreUseId(ContextUtil.getCurrentUserId());
		cusPersonal.setIsDelete(0L);
		cusPersonal = cusPersonalService.save(cusPersonal);

		String data = getRequest().getParameter("data");
		if (StringUtils.isNotEmpty(data)) {
			Gson gson = new Gson();
			CusContact[] cons = gson.fromJson(data, CusContact[].class);
			for (int i = 0; i < cons.length; i++) {
				CusContact con = new CusContact();
				try {
					BeanUtil.copyNotNullProperties(con, cons[i]);
					con.setStatusId(new Short("1"));
					con.setCustomerId(cusPersonal.getCustomerId());
					con.setCreateTime(new Date());
				} catch (Exception e) {
					e.printStackTrace();
				}
				cusContactService.save(con);
			}
		}

		CusRelationship cusRelationShip = new CusRelationship();
		cusRelationShip.setCreDat(new Date());
		cusRelationShip.setCreUseId(ContextUtil.getCurrentUserId());
		cusRelationShip.setRelationshipType(Short.parseShort(relationship));
		cusRelationShip.setCustomer(customer);
		cusRelationShip.setCusCustomer(cusPersonal);

		cusRelationshipService.save(cusRelationShip);
		return SUCCESS;
	}

	/**
	 * 添加及保存操作
	 */
	public String save() {

		String details = getRequest().getParameter("details"); // 得到传过来的联系方式行信息。
		String linkManLines = getRequest().getParameter("linkManLines"); // 得到传过来的联系人行信息。
		String delContactLines = getRequest().getParameter("delContactLines"); // 得到传过来的联系方式Ids
		String delLinkLines = getRequest().getParameter("delLinkLines"); // 得到传过来的联系人Ids
		cusPersonal.setIsDelete(0L);
		String strCus = cusPersonalService.saveCusPer(details, linkManLines,
				delContactLines, delLinkLines, cusPersonal);
		if (strCus.equals("success")) {
			setJsonString("{success:true}");
		} else {
			setJsonString("{success:false}");
		}
		return SUCCESS;

	}

	// 根据手机号判断是否有此客户信息
	public String checkByCallInNo() {
		String callinno = getRequest().getParameter("callinno");
		StringBuffer msg = new StringBuffer("{success:true");
		List<CusPersonal> curPersonalList = cusPersonalService
				.checkNo(callinno);
		JSONSerializer ser = JsonUtil.getJSONSerializer();
		if (curPersonalList.size() == 0) {
			msg.append(",'customerId': '' ,'customerNo': ''");
		} else {
			if (curPersonalList.size() == 1) {
				msg.append(",'customerId':");
				msg.append(curPersonalList.get(0).getCustomerId());
				msg.append(",'cusNo':\""
						+ curPersonalList.get(0).getCustomerNo() + "\"");
			} else if (curPersonalList.size() > 1) {
				msg.append(",'totals':");
				msg.append(curPersonalList.size());
				msg.append(",'result':");
				msg.append(ser.serialize(curPersonalList));
			}
		}
		msg.append("}");
		setJsonString(msg.toString());

		return SUCCESS;
	}

	/**
	 * 定位客户
	 * 
	 * @return
	 */
	public String location() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<CusPersonal> list = cusPersonalService.getAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(filter.getPagingBean().getTotalItems()).append(
						",result:");
		JSONSerializer serializer = JsonUtil.getJSONSerializer();
		serializer.transform(new DateTransformer("yyyy-MM-dd HH:mm:ss"),
				new String[] { "staTime", "endTime", "creDat" });
		serializer.transform(new DateTransformer("yyyy-MM-dd"), new String[] {
				"birthday", "credDurDat" });
		buff.append(serializer.serialize(list));
		buff.append("}");
		jsonString = buff.toString();
		return SUCCESS;
	}

	/**
	 * 匿名客户
	 * 
	 * @return
	 */
	public String getAnonymous() {
		SimpleDateFormat dateFormat = new SimpleDateFormat(
				"yyyyMMddHHmmss-SSSS");
		String nameCn = dateFormat.format(new Date());
		String customerNo = dateFormat.format(new Date());
		Long namiao = System.nanoTime();
		Long namiao1 = System.nanoTime();
		// 将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,totalCounts:1,data:{");
		// sb.append("\"nameCn\":\""+UUID.randomUUID().toString().replace("-",
		// "")+"\"");
		sb.append("\"nameCn\":\"" + namiao + "\"");
		sb.append(",\"customerNo\":\"" + namiao1 + "\"");
		sb.append("}}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	/**
	 * 系统匿名客户号
	 * 
	 * @return
	 */
	public String number() {
		SimpleDateFormat date = new SimpleDateFormat("yyyyMMddHHmmss-SSSS");
		String cusPersonalNo = date.format(new Date());
		setJsonString("{success:true,cusPersonalNo:'CN" + cusPersonalNo + "'}");
		return SUCCESS;
	}

	/**
	 * 个人客户 动态VM调用方法
	 * 
	 * @return formHtml
	 * @throws Exception
	 * @author guost
	 * @createtime
	 */
	public String getVm() {
		String knowTmpId = getRequest().getParameter("knowTmpId");
		if (knowTmpId != null) {
			// 表单变量
			UkKnowTemplate ukKnowTemplate = new UkKnowTemplate();
			ukKnowTemplate = ukKnowTemplateService.get(new Long(knowTmpId));
			Map formVars = new HashMap();
			HttpServletRequest request = getRequest();

			String formUiJs = null;
			// 节点路径
			String nodeVmPath = ukKnowTemplate.getKnowVersion() + ".vm";
			// 程序绝对路径
			String absPath = "FormVm/UkKnowTemplate/" + knowTmpId + "/";
			formVars.put("activityName", knowTmpId);
			String vmPath = absPath + nodeVmPath;
			formUiJs = VelocityEngineUtils.mergeTemplateIntoString(
					flowVelocityEngine, vmPath, "UTF-8", formVars);

			request.setAttribute("formUiJs", formUiJs);
		}
		return "formExt";

	}

	/**
	 * 保存未处理中领用的信息
	 * 
	 * @return
	 */
	public String saveLingyong() {
		String retStr = "";
		String special = getRequest().getParameter("special"); // 得到传过来的行信息。
		String delLines = getRequest().getParameter("delLines");// 得到要删除的行Ids

		String saveStr = cusPersonalService.saveWeichuliLingyong(delLines,
				special, cusPersonal);
		if (saveStr.equals("success")) {
			retStr = "{success:true,message:'" + "成功保存信息!'}";
		} else {
			retStr = "{success:false,message:'" + "操作失败,请联系管理员!'}";
		}
		jsonString = retStr;
		return SUCCESS;
	}

	/**
	 * 根据证件号码查找客户
	 */
	public String checkByCredNum() {
		String credNum = getRequest().getParameter("credNum");
		StringBuffer msg = new StringBuffer("{success:true");
		List<CusPersonal> curPersonalList = cusPersonalService
				.checkCredNum(credNum);
		JSONSerializer ser = JsonUtil.getJSONSerializer();
		if (curPersonalList.size() == 0) {
			msg.append(",'customerId': null");
		} else {
			if (curPersonalList.size() == 1) {
				msg.append(",'customerId':");
				msg.append(curPersonalList.get(0).getCustomerId());
			} else if (curPersonalList.size() > 1) {
				msg.append(",'totals':");
				msg.append(curPersonalList.size());
				msg.append(",'result':");
				msg.append(ser.serialize(curPersonalList));
			}
		}
		msg.append("}");
		setJsonString(msg.toString());

		return SUCCESS;
	}

	/**
	 * 根据手机号和身份证号码查找客户
	 * 
	 * @author wangzhongjin
	 * @return
	 */
	public String checkByCrednumAndPhone() {
		String callinno = getRequest().getParameter("callinno");
		String credNum = getRequest().getParameter("credNum");
		StringBuffer msg = new StringBuffer("{success:true");
		List<CusPersonal> curPersonalList = cusPersonalService
				.checkByCredAndNo(credNum, callinno);
		JSONSerializer ser = JsonUtil.getJSONSerializer();
		if (curPersonalList.size() == 0) {
			msg.append(",'customerId': null");
		} else {
			if (curPersonalList.size() == 1) {
				msg.append(",'customerId':");
				msg.append(curPersonalList.get(0).getCustomerId());
			} else if (curPersonalList.size() > 1) {
				msg.append(",'totals':");
				msg.append(curPersonalList.size());
				msg.append(",'result':");
				msg.append(ser.serialize(curPersonalList));
			}
		}
		msg.append("}");
		setJsonString(msg.toString());
		return SUCCESS;
	}

	/**
	 * 保存新客户操作
	 */
	public String addNew() {
		String regionId = getRequest().getParameter("regionId");
		String remark = getRequest().getParameter("remark");
		if (regionId != null) {
			cusPersonal.setRemark(remark);
		}
		if (regionId != null) {
			cusPersonal.setRegionId(Long.parseLong(regionId));
		}
		if (cusPersonal.getHappyCall() == null) {
			cusPersonal.setHappyCall(new Short("0"));
		}
		if (cusPersonal.getIsDm() == null) {
			cusPersonal.setIsDm(new Short("0"));
		}
		if (cusPersonal.getIsMail() == null) {
			cusPersonal.setIsMail(new Short("0"));
		}
		
		String tel = "";
		String mobile = "";
		//获得联系方式内容
		String data = getRequest().getParameter("data");
		Gson gson = new Gson();
		CusContact[] cons1 = gson.fromJson(data, CusContact[].class);
		if (isMobileNO(cons1[0].getMainContactNum())){
			tel = cons1[0].getMainContactNum();
//			System.out.println("固定电话" + tel);
		}
		if (isTelNO(cons1[0].getMainContactNum())){
			mobile = cons1[0].getMainContactNum();
//			System.out.println("手机" + mobile);
		}
		// zhanghao
		SimpleDateFormat from = new SimpleDateFormat("yyyyMMdd");
		Date birthDay = cusPersonal.getBirthday();
		String time = null;
		if (birthDay != null){
			time = from.format(cusPersonal.getBirthday());
		}

		String sex = "F";// 女
		if (cusPersonal.getGender().equals("1")) {
			sex = "M";
		}

		RegionDetail rd = regionDetailService.get(cusPersonal.getRegionId());

		Map<String, String> post_data = new HashMap<String, String>();

		post_data.put("cust_nm", cusPersonal.getNameCn());
		// TODO 创建者id待补充
		AppUser onlineUser = appUserService.get(ContextUtil.getCurrentUserId());
		if (onlineUser.getUlEmployee() == null) {
			System.err.println("禁用没有员工的admin");
		}

		post_data.put("etr_id", onlineUser.getUlEmployee().getUserNo());
		post_data.put("citi_no", cusPersonal.getCredNum());
		post_data.put("birth_ymd", time);
		post_data.put("sex_cd", sex);
		post_data.put("zip_no", rd.getPostCode());
		post_data.put("zip_no_seq", rd.getAreaNo());
		post_data.put("tel", tel);
		post_data.put("mobile", mobile);

		JSONSerializer json = JsonUtil.getJSONSerializer();
		String jsonData_ = json.serialize(post_data);
		logger.info("Call Proxy Interface");
		logger.info("------1.URL-----------"
				+ (HttpUtil.PROXY_URL + CusPersonalAction.ADD_CUS_URL));
		logger.info("------2.jsonData-----------" + jsonData_);
		String result = HttpUtil.post(
				(HttpUtil.PROXY_URL + CusPersonalAction.ADD_CUS_URL),
				jsonData_, "UTF-8");
		logger.info("------3.json结果-----------" + result);
		
		// TODO 处理返回结果
		JSONDeserializer<Map> ds = new JSONDeserializer<Map>();
		Map<String, Object> rs_data = ds.deserialize(result);
		List list = (List) rs_data.get("result");
		for (Object one : list) {
			// ((Map) one).get("cust_id");// 获取客户号
		}
		Integer cusNo = (Integer) rs_data.get("cust_id");
		
		cusPersonal.setCusGraId(new Short("0"));
//		cusPersonal.setCusFromId(new Short("7"));
		cusPersonal.setHasChecked(new Short("0"));
		cusPersonal.setStaId(new Short("0"));
		cusPersonal.setCreDat(new Date());
		cusPersonal.setCreUseId(ContextUtil.getCurrentUserId());
		cusPersonal.setIsDelete(0L);
		cusPersonal.setCusType(new Short("1"));
//		cusPersonal.setCustomerNo("1"); //测试是接口问题还是其它问题
		cusPersonal.setCustomerNo(String.valueOf(cusNo)); //调接口返回的值
		cusPersonal = cusPersonalService.save(cusPersonal);
		
		if (StringUtils.isNotEmpty(data)) {
			CusContact[] cons = gson.fromJson(data, CusContact[].class);
			for (int i = 0; i < cons.length; i++) {
				CusContact con = new CusContact();
				try {
					BeanUtil.copyNotNullProperties(con, cons[i]);
					con.setStatusId(new Short("1"));
					con.setCustomerId(cusPersonal.getCustomerId());
					con.setCreateTime(new Date());
					
//					if (con.getContactSubTypeId() == 2)
//						mobile = con.getMainContactNum();
//					if (con.getContactSubTypeId() == 3)
//						tel = con.getMainContactNum();
				} catch (Exception e) {
					e.printStackTrace();
				}
				cusContactService.save(con);
			}
		}
		StringBuffer buff = new StringBuffer();
		buff.append("{success : true,'customerId':" + cusPersonal.getCustomerId() + ",'customerNo':" + cusNo + "}");
		setJsonString(buff.toString());
		
//		CusPersonal cusP = cusPersonalService.get(cusPersonal.getCustomerId());
//		cusPersonal.setCustomerNo(String.valueOf(cusNo));
//		try {
//			BeanUtil.copyNotNullProperties(cusP, cusPersonal);
//			cusPersonalService.save(cusP);
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
		
		return SUCCESS;
	}

	/**
	 * 根据客户号查找电话号接口
	 * 
	 * @author wangzhongjin
	 * @return
	 */
	public String listPhoneNum() {
		String cusNo = getRequest().getParameter("");
		StringBuffer x = new StringBuffer("{success:true,data:{");
		if (cusNo != null && !cusNo.equals("")) {
			x.append("\"customerNo\":\"").append(cusNo).append("\"");
		}
		x.append("}}");
		ncSoapClientManager.getListPhoneNum(x.toString());

		return SUCCESS;
	}

	/**
	 * 根据电话号查找客户号接口
	 * 
	 * @author wangzhongjin
	 * @return
	 */
	public String listCustomerNo() {
		String phoneNum = getRequest().getParameter("");
		StringBuffer x = new StringBuffer("{success:true,data:{");
		if (phoneNum != null && !phoneNum.equals("")) {
			x.append("\"phoneNum\":\"").append(phoneNum).append("\"");
		}
		x.append("}}");
		ncSoapClientManager.getListPhoneNum(x.toString());

		return SUCCESS;
	}

	public String getRecordPath() {
		Logger logger = Logger
				.getLogger(cn.com.pccw.service.asteriskwebservicev1.OverallInfo.class
						.getName());
		String recordId = getRequest().getParameter("recordId");
		URL wsdlLocation = null;
		try {
			URL baseUrl = cn.com.pccw.service.asteriskwebservicev1.OverallInfo.class
					.getResource(".");
			wsdlLocation = new URL(baseUrl,
					"http://192.168.10.16:8080/spservice/services/overallInfoWebservice?wsdl");
		} catch (MalformedURLException e) {
			logger.warning(e.getMessage());
		}

		QName serviceName = new QName(
				"http://www.pccw.com.cn/service/AsteriskWebServiceV1.0",
				"OverallInfo");
		OverallInfo overallInfo = new OverallInfo(wsdlLocation, serviceName);
		OverallInfoWebservice ow = overallInfo.getOverallInfoImplPort();

		String path = ow.findRecordingPath(recordId);
		String outMsg = "{success:true,path:'" + path + "'}";
		if (path == null || !path.endsWith(".wav")) {
			outMsg = "{failure:true,msg:'The recording file has not been found.'}";
		}
		setJsonString(outMsg);
		return SUCCESS;
	}
	
	public boolean isMobileNO(String mobiles){  
		Pattern p = Pattern.compile("^((13[0-9])|(15[^4,\\D])|(18[0,5-9]))\\d{8}$");  
	    Matcher m = p.matcher(mobiles);
	    return m.matches();  
	}
	
	public boolean isTelNO(String tel){  
		Pattern p = Pattern.compile("^\\d{3}-?\\d{7,8}|\\d{4}-?\\d{7,8}$");  
	    Matcher m = p.matcher(tel);
	    return m.matches();  
	}
}
