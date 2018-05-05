package com.ulane.customer.action.fee;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.util.JsonUtil;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.service.system.AppUserService;
import com.ulane.base.model.xitong.UlDepartment;
import com.ulane.base.model.xitong.UlUsergroup;
import com.ulane.base.service.xitong.UlDepartmentService;
import com.ulane.base.service.xitong.UlUsergroupService;
import com.ulane.customer.model.fee.ObFeeIndexProject;
import com.ulane.customer.model.fee.ObFeeRule;
import com.ulane.customer.model.fee.ObFeeRuleValue;
import com.ulane.customer.service.fee.ObFeeIndexProjectService;
import com.ulane.customer.service.fee.ObFeeRuleService;
import com.ulane.customer.service.fee.ObFeeRuleValueService;

import flexjson.JSONSerializer;
import flexjson.transformer.DateTransformer;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class ObFeeRuleAction extends BaseAction{
	@Resource
	private ObFeeRuleService obFeeRuleService;
	@Resource
	private AppUserService appUserService;
	@Resource
	private ObFeeRuleValueService obFeeRuleValueService;
	@Resource
	private UlUsergroupService ulUsergroupService;
	@Resource
	private ObFeeIndexProjectService obFeeIndexProjectService;
	@Resource
	private UlDepartmentService ulDepartmentService;
	
	
	private ObFeeRule obFeeRule;
	
	private Long feeRuleId;

	public Long getFeeRuleId() {
		return feeRuleId;
	}

	public void setFeeRuleId(Long feeRuleId) {
		this.feeRuleId = feeRuleId;
	}

	public ObFeeRule getObFeeRule() {
		return obFeeRule;
	}

	public void setObFeeRule(ObFeeRule obFeeRule) {
		this.obFeeRule = obFeeRule;
	}

	private void  setUserName(List<ObFeeRule> list,ObFeeRule obrule){
		if(list.size()>=0){
		for(ObFeeRule rule:list){
			AppUser app =appUserService.get(rule.getCreateBy());
			rule.setCreateByName(app.getFullname());
		}
		}
		if(!("").equals(obrule) && null!=obrule){
			AppUser app =appUserService.get(obrule.getCreateBy());
			obrule.setCreateByName(app.getFullname());
		}
		
	}
	/**
	 * 显示列表
	 * @author lzm
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		filter.addSorted("createDate", "desc");
		List<ObFeeRule> list= obFeeRuleService.getAll(filter);
		for(ObFeeRule rule:list){ 
			//创建人 
			AppUser app =appUserService.get(rule.getCreateBy());
			rule.setCreateByName(app.getFullname());
			//佣金指标项
			if(rule.getFeeIndexProjectId()!=null){
			ObFeeIndexProject obFeeIndexProject =obFeeIndexProjectService.get(new Long(rule.getFeeIndexProjectId()));
			rule.setObFeeIndexProjectNam(obFeeIndexProject.getFeeIndexProjectName());
			}
			}
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(filter.getPagingBean().getTotalItems()).append(
				",result:");
		JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
		jsonSer.transform(new DateTransformer("yyyy-MM-dd"), new String[] {
			"createDate", "effectiveTime","failureTime" });
		buff.append(jsonSer.serialize(list));
		buff.append("}");
		
		jsonString = buff.toString();
		
		return SUCCESS;
	}
	/**
	 * 批量删除
	 * @author lzm
	 */
	public String multiDel(){
		
		String[]ids=getRequest().getParameterValues("ids");
		if(ids!=null){
			for(String id:ids){
				obFeeRuleService.remove(new Long(id));
			}
		}
		
		jsonString="{success:true}";
		
		return SUCCESS;
	}
	
	/**
	 * 批量删除绑定的值
	 * @author lzm
	 */
	public String multiDelBDRuleValue(){
		String[] ids = getRequest().getParameterValues("ids");
		String feeRuleId=getRequest().getParameter("feeRuleId");
		try{
		if(!("").equals(feeRuleId)){
			ObFeeRule rules= new ObFeeRule();
			rules=obFeeRuleService.get(new Long(feeRuleId));
			for(String id : ids){
				ObFeeRuleValue obFeeRuleValue=new ObFeeRuleValue();
			if(rules.getObFeeRuleValues()!=null || !("").equals(rules.getObFeeRuleValues())){
				for(ObFeeRuleValue rulevalue:rules.getObFeeRuleValues()){
					if(!("").equals(id)){
						if(rulevalue.getFeeRuleValueId()==Long.parseLong(id)){
							obFeeRuleValueService.remove(rulevalue);
						}
					}
				}
			}
			}
		}
		}catch(Exception ex){
			logger.error(ex.getMessage());
		}
		jsonString="{success:true}";
		
		return SUCCESS;
	}
	/**
	 * 批量删除绑定的规则
	 * @author lzm
	 */
	public String multiDelBDZuiZe(){
		String[] ids = getRequest().getParameterValues("ids");
		String feeRuleId=getRequest().getParameter("feeRuleId");
		try{
		if(feeRuleId!=null){
			ObFeeRule rules= new ObFeeRule();
			rules=obFeeRuleService.get(new Long(feeRuleId));
			for(String id : ids){
				UlDepartment ulDepartment=new UlDepartment();
			if(rules.getUlDepartment().size()>0){
				for(UlDepartment dep:rules.getUlDepartment()){
					ulDepartment = ulDepartmentService.get(new Long(id));
				}
				rules.getUlDepartment().remove(ulDepartment);
				obFeeRuleService.save(rules);
			}
			}
		}
		}catch(Exception ex){
			logger.error(ex.getMessage());
		}
		jsonString="{success:true}";
		
		return SUCCESS;
	}
	//绑定组织机构
	public String obFeeRuleBDZuZhiJiGou(){
		//组织机构
		String id_rule = getRequest().getParameter("feeRuleId");
		String jigouId = getRequest().getParameter("jigouId");
		String [] depids=jigouId.split(",");
		if(id_rule.length()>=1 && jigouId.length()>=1){
		// 绑定组织机构
		if (jigouId != null && !"".equals(jigouId)) {
			try{
				for(String depid:depids){
					ObFeeRule orgObFeeRule=obFeeRuleService.get(new Long(id_rule));
					UlDepartment ulDepartment = ulDepartmentService.get(new Long(depid));
					orgObFeeRule.getUlDepartment().add(ulDepartment);
					obFeeRuleService.save(orgObFeeRule);
				}

			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		}
		setJsonString("{success:true}");
		return SUCCESS;
	}
	/**
	 * 注销规则
	 * 
	 * @author lzm
	 */
	public String zhuXiaoGuiZe() {
		String[] ids = getRequest().getParameterValues("ids");
		if (ids != null) {
		   // 注销
			for (String id : ids) {
				try {
					ObFeeRule obFeeRule=obFeeRuleService.get(new Long(id));
					obFeeRule.setStaId(ObFeeRule.YJGZ_WUXIAO);
					obFeeRuleService.save(obFeeRule);
				} catch (Exception ex) {
					logger.error(ex.getMessage());
				}
			}
		}

		jsonString = "{success:true}";

		return SUCCESS;
	}
	
	/**
	 * 启用规则
	 * 
	 * @author lzm
	 */
	public String qiYongGuiZe() {
		String[] ids = getRequest().getParameterValues("ids");
		if (ids != null) {
			Long zt = 1l;// 启用
			for (String id : ids) {
				try {
					ObFeeRule obFeeRule=obFeeRuleService.get(new Long(id));
					obFeeRule.setStaId(ObFeeRule.YJGZ_YOUXIAO);
					obFeeRuleService.save(obFeeRule);
				} catch (Exception ex) {
					logger.error(ex.getMessage());
				}
			}
		}
		jsonString = "{success:true}";

		return SUCCESS;
	}
	
	/**
	 * 显示详细信息
	 * @author lzm
	 */
	public String get(){
		String id_rule = getRequest().getParameter("feeRuleId");
		String jigouId = getRequest().getParameter("jigouId");

		ObFeeRule obFeeRule=obFeeRuleService.get(feeRuleId);
		JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
		jsonSer.transform(new DateTransformer("yyyy-MM-dd"), new String[] {
			"createDate", "effectiveTime","failureTime" });
		StringBuffer buff = new StringBuffer("{success:true,").append("data:");
		buff.append(jsonSer.serialize(obFeeRule));
		buff.append("}");
		jsonString = buff.toString();
		
		
		return SUCCESS;
	}


	/**
	 * 添加及保存操作
	 * @author lzm
	 */
	@SuppressWarnings("unchecked")
	public String save(){
		//佣金规则
		String feeRuleValueIdV=getRequest().getParameter("feeRuleValueId");
		String minimum = getRequest().getParameter("minimum");
		String maximum = getRequest().getParameter("maximum");
		String coefficient = getRequest().getParameter("coefficient");
		String increase = getRequest().getParameter("increase");
		//用户组id
		String usergroupids = getRequest().getParameter("usergroupid");
		//使用对象
		String duixiangid = getRequest().getParameter("duixiangid");
		//职位&职级
		String zhiwei = getRequest().getParameter("zhiwei");
		String zhiji = getRequest().getParameter("zhiji");

		//指标项ID
		String zhibiaoxiang = getRequest().getParameter("zhibiaoxiang");
		String [] minimums = minimum.split(",");
		String [] maximums = maximum.split(",");
		String [] coefficients = coefficient.split(",");
		String [] increases = increase.split(",");
		String [] usergroupid=usergroupids.split(",");
		String [] duixiangids=duixiangid.split(",");
		String [] feeRuleValueIdVlues=feeRuleValueIdV.split(",");
		String curUserId = String.valueOf(ContextUtil.getCurrentUserId());
		if(obFeeRule.getFeeRuleId()==null){
			try{
				//新增规则状态未启用——无效
				obFeeRule.setStaId(ObFeeRule.YJGZ_WEIQIYONG);
				String uname=ContextUtil.getCurrentUser().getFullname();
				obFeeRule.setCreateByName(uname);
				obFeeRule.setCreateBy(Long.parseLong(curUserId));
				obFeeRule.setCreateDate(new Date());
				obFeeRule.setZhiji(zhiji);
				obFeeRule.setZhiwei(zhiwei);
				//绑定指标项
				if(zhibiaoxiang!=null || !("").endsWith(zhibiaoxiang) ){
					ObFeeIndexProject obFeeIndexProject =obFeeIndexProjectService.get(new Long(zhibiaoxiang));
					obFeeRule.setObFeeIndexProject(obFeeIndexProject);
				}
				// 绑定执行人
				if (usergroupid.length >= 1) {
					for (String usergroup : usergroupid) {
						if (usergroup != null && !"".equals(usergroup)) {
							UlUsergroup ulUsergroup = ulUsergroupService
									.get(new Long(usergroup));
							obFeeRule.getUlUsergroups().add(ulUsergroup);
						}
					}
				}
				//绑定使用对象（组织机构）
				if(duixiangid.length()>=1){
					for(String dipid:duixiangids){
						UlDepartment ulDepartment = ulDepartmentService.get(new Long(dipid));
						obFeeRule.getUlDepartment().add(ulDepartment);
					}
				}
				ObFeeRule rule=obFeeRuleService.save(obFeeRule);
				//绑定规则值
				if(minimum.length()>=1){
				if(minimums.length>=1){
				for(int i=0;i<=minimums.length;i++){
					ObFeeRuleValue ruleValue=new ObFeeRuleValue();
					ruleValue.setFeeRuleId(rule.getFeeRuleId());    //规则id
					ruleValue.setCreateBy(ContextUtil.getCurrentUserId());
					ruleValue.setUpdateBy(ContextUtil.getCurrentUserId());
					ruleValue.setCreateDate(new Date());
					ruleValue.setUpdateDate(new Date());
					 // 佣金规则值
					if(minimums.length==maximums.length && minimums.length==maximums.length && 
							minimums.length==coefficients.length && minimums.length==increases.length){
						ruleValue.setMinimum(new java.math.BigDecimal(minimums[i])); //最小值
						ruleValue.setMaximum(new java.math.BigDecimal(maximums[i]));  //最大值
						ruleValue.setIncrease(new java.math.BigDecimal(increases[i]));  //增加额度
						ruleValue.setCoefficient(new java.math.BigDecimal(coefficients[i]));  //系数
					}
					obFeeRuleValueService.save(ruleValue);
					rule.getObFeeRuleValues().add(ruleValue);
				}
				}
				}

				//绑定用户组
				obFeeRuleService.save(rule);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}else{
			ObFeeRule orgObFeeRule=obFeeRuleService.get(obFeeRule.getFeeRuleId());
			try{
//				//新增规则状态未启用——无效
//				orgObFeeRule.setStaId(ObFeeRule.YJGZ_WEIQIYONG);
				String uname=ContextUtil.getCurrentUser().getFullname();
				orgObFeeRule.setCreateByName(uname);
				orgObFeeRule.setCreateBy(Long.parseLong(curUserId));
				orgObFeeRule.setZhiji(zhiji);
				orgObFeeRule.setZhiwei(zhiwei);
				//绑定指标项
				if(zhibiaoxiang!=null || !("").endsWith(zhibiaoxiang) ){
					ObFeeIndexProject obFeeIndexProject =obFeeIndexProjectService.get(new Long(zhibiaoxiang));
					orgObFeeRule.setObFeeIndexProject(obFeeIndexProject);
				}
				// 绑定执行人
				if (usergroupid.length >= 1) {
					for (String usergroup : usergroupid) {
						if (usergroup != null && !"".equals(usergroup)) {
							UlUsergroup ulUsergroup = ulUsergroupService
									.get(new Long(usergroup));
							orgObFeeRule.getUlUsergroups().add(ulUsergroup);
						}
					}
				}
				//绑定使用对象（组织机构）
				if(duixiangid.length()>=1){
					for(String dipid:duixiangids){
						UlDepartment ulDepartment = ulDepartmentService.get(new Long(dipid));
						obFeeRule.getUlDepartment().add(ulDepartment);
					}
				}
				if(minimum.length()>=1){
				if(minimums.length>=1){
				//删除已绑定的规则值
					if(feeRuleValueIdVlues.length>=1){
						for(String feeRuleValueId:feeRuleValueIdVlues){
							if(!("undefined").equals(feeRuleValueId)){
							obFeeRuleValueService.remove(new Long(feeRuleValueId));
							}
						}
					}
				//重新绑定规则值
				for(int i=0;i<minimums.length;i++){
					ObFeeRuleValue ruleValue=new ObFeeRuleValue();
					ruleValue.setFeeRuleId(orgObFeeRule.getFeeRuleId());    //规则id
					ruleValue.setCreateBy(ContextUtil.getCurrentUserId());
					ruleValue.setUpdateBy(ContextUtil.getCurrentUserId());
					ruleValue.setCreateDate(new Date());
					ruleValue.setUpdateDate(new Date());
					 // 佣金规则值
					if(minimums.length==maximums.length && minimums.length==maximums.length && 
							minimums.length==coefficients.length && minimums.length==increases.length){
						ruleValue.setMinimum(new java.math.BigDecimal(minimums[i])); //最小值
						ruleValue.setMaximum(new java.math.BigDecimal(maximums[i]));  //最大值
						ruleValue.setIncrease(new java.math.BigDecimal(increases[i]));  //增加额度
						ruleValue.setCoefficient(new java.math.BigDecimal(coefficients[i]));  //系数
					}
					obFeeRuleValueService.save(ruleValue);
					orgObFeeRule.getObFeeRuleValues().add(ruleValue);
				}
				}
				}
				BeanUtil.copyNotNullProperties(orgObFeeRule, obFeeRule);
				obFeeRuleService.save(orgObFeeRule);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
}
