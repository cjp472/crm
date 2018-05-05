package com.ulane.monitor.action.unim;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;

import java.lang.reflect.Type;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.htsoft.core.util.BeanUtil;

import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.web.action.BaseAction;


import com.ulane.monitor.model.unim.UnimAgent;
import com.ulane.monitor.model.unim.UnimSkillgroup;
import com.ulane.monitor.service.unim.UnimSkillgroupService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class UnimSkillgroupAction extends BaseAction{
	@Resource
	private UnimSkillgroupService unimSkillgroupService;
	private UnimSkillgroup unimSkillgroup;
	
	private Long skgId;

	public Long getSkgId() {
		return skgId;
	}

	public void setSkgId(Long skgId) {
		this.skgId = skgId;
	}

	public UnimSkillgroup getUnimSkillgroup() {
		return unimSkillgroup;
	}

	public void setUnimSkillgroup(UnimSkillgroup unimSkillgroup) {
		this.unimSkillgroup = unimSkillgroup;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		filter.addSorted("skgCode", QueryFilter.ORDER_ASC);
		List<UnimSkillgroup> list= unimSkillgroupService.getAll(filter);
		
		Type type=new TypeToken<List<UnimSkillgroup>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");

//		JSONSerializer serializer = new JSONSerializer();
//		serializer.transform(new DateTransformer("yyyy-MM-dd HH:mm:ss"),new String[] { "applyTime"});
//		buff.append(serializer.exclude(new String[]{"class","conHiss","conBwListBusRuls"}).serialize(list));
		
		Gson gson=new Gson();
		buff.append(gson.toJson(list, type));
		buff.append("}");
		
		jsonString=buff.toString();
		
		return SUCCESS;
	}
	
	/**
	 * 显示列表
	 */
	public String listGroupOnly(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		filter.addSorted("skgCode", QueryFilter.ORDER_ASC);
		filter.addFilter("Q_status_SN_EQ", UnimSkillgroup.STA_ENABLE.toString());
		List<UnimSkillgroup> list= unimSkillgroupService.getAll(filter);

		Type type=new TypeToken<List<UnimSkillgroup>>(){}.getType();
		StringBuffer buff = new StringBuffer();

//		JSONSerializer serializer = new JSONSerializer();
//		serializer.transform(new DateTransformer("yyyy-MM-dd HH:mm:ss"),new String[] { "applyTime"});
//		buff.append(serializer.exclude(new String[]{"class","conHiss","conBwListBusRuls"}).serialize(list));
		
		Gson gson=new Gson();
		buff.append(gson.toJson(list, type));
		
		jsonString=buff.toString();
		
		return SUCCESS;
	}
	
	/**
	 * 显示坐席/班长所属的技能组unim/listByAgentForUnimSkillgroup.do?agentId=1,agentId为班长ID(流水号)
	 */
	public String listByAgentFor(){
		String agentId = super.getRequest().getParameter("agentId");
		if(StringUtils.isBlank(agentId)) {
			jsonString = "{success:true,'totalCounts':0,result:[]}";
			return SUCCESS;
		}
		List<UnimSkillgroup> list= unimSkillgroupService.listByMonitorForUnimAgent(new Long(agentId));
		
		Type type=new TypeToken<List<UnimSkillgroup>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(list.size()).append(",result:");

		Gson gson=new Gson();
		buff.append(gson.toJson(list, type));
		buff.append("}");
		
		jsonString=buff.toString();
		
		return SUCCESS;
	}
	
	/**
	 * 批量注销
	 * @return
	 */
	public String multiDel(){
		
		String[]ids=getRequest().getParameterValues("ids");
		if(ids!=null){
			for(String id:ids){
				if(StringUtils.isNotBlank(id)) {
					UnimSkillgroup skg = unimSkillgroupService.get(Long.parseLong(id));
					skg.setStatus(UnimSkillgroup.STA_DISABLE);
					unimSkillgroupService.save(skg);
				}
			}
		}
		
		jsonString="{success:true}";
		
		return SUCCESS;
	}
	
	/**
	 * 显示详细信息
	 * @return
	 */
	public String get(){
		UnimSkillgroup unimSkillgroup=unimSkillgroupService.get(skgId);
		
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(unimSkillgroup));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(unimSkillgroup.getSkgId()==null){
			unimSkillgroupService.save(unimSkillgroup);
		}else{
			UnimSkillgroup orgUnimSkillgroup=unimSkillgroupService.get(unimSkillgroup.getSkgId());
			try{
				BeanUtil.copyNotNullProperties(orgUnimSkillgroup, unimSkillgroup);
				unimSkillgroupService.save(orgUnimSkillgroup);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
	}
	
	public String isRepeatSkgCode() {
		String skgCode = getRequest().getParameter("skgCode");
		if(StringUtils.isNotBlank(skgCode)) {
			QueryFilter filter = new QueryFilter(getRequest());
			filter.addFilter("Q_skgCode_S_EQ", skgCode);
			List<UnimSkillgroup> list = unimSkillgroupService.getAll(filter);
			if(list.size()>0) {
				//业务组编号重复
				setJsonString("{success:true}");
				return SUCCESS;
			}
		}
		setJsonString("{success:false}");
		return SUCCESS;
	}
	
	//HTTP接口
    public void getSkillgroup()
    {
        try
        {
            Long agentId = Long.valueOf(getRequest().getParameter("id"));
            List list = this.unimSkillgroupService.listByMonitorForUnimAgent(agentId);
            
            writeToPage(Boolean.valueOf(true), "班长监控的技能组查询成功", list);
        }
        catch(Exception e)
        {
            e.printStackTrace();
            writeToPage(Boolean.valueOf(false), "操作失败，请重新操作或联系管理员", null);
        }
    }
	
}
