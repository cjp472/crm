package com.ulane.customer.action.customer;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.lang.reflect.Type;
import java.util.List;

import javax.annotation.Resource;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.JsonUtil;
import com.htsoft.core.web.action.BaseAction;
import com.ulane.customer.model.customer.ConWeichuli;
import com.ulane.customer.service.customer.ConLanjieService;
import com.ulane.customer.service.customer.ConWeichuliService;

import flexjson.JSONSerializer;
import flexjson.transformer.DateTransformer;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class ConWeichuliAction extends BaseAction{
	@Resource
	private ConWeichuliService conWeichuliService;
	@Resource
	private ConLanjieService conLanjieService;
	private ConWeichuli conWeichuli;
	
	private Long conId;

	public Long getConId() {
		return conId;
	}

	public void setConId(Long conId) {
		this.conId = conId;
	}

	public ConWeichuli getConWeichuli() {
		return conWeichuli;
	}

	public void setConWeichuli(ConWeichuli conWeichuli) {
		this.conWeichuli = conWeichuli;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<ConWeichuli> list= conWeichuliService.getAll(filter);
		
		Type type=new TypeToken<List<ConWeichuli>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(filter.getPagingBean().getTotalItems()).append(",result:");
		
		Gson gson=new Gson();
		buff.append(gson.toJson(list, type));
		buff.append("}");
		
		jsonString=buff.toString();
		
		return SUCCESS;
	}
	/**
	 * 批量删除
	 * @return
	 */
	public String multiDel(){
		
		String[]ids=getRequest().getParameterValues("ids");
		if(ids!=null){
			for(String id:ids){
				conWeichuliService.remove(new Long(id));
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
		ConWeichuli conWeichuli=conWeichuliService.get(conId);
		
//		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
		sb.append(jsonSer.serialize(conWeichuli));
//		sb.append(gson.toJson(conWeichuli));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	
	 /**
     * 显示详细信息for加入黑名单
     * @return
     */
    public String getForHMD(){
    	ConWeichuli conWeichuli=conWeichuliService.get(conId);

        //将数据转成JSON格式
        StringBuffer sb = new StringBuffer("{success:true,data:");
        
        JSONSerializer serializer = new JSONSerializer();
        serializer.transform(new DateTransformer("yyyy-MM-dd HH:mm:ss"),new String[] { "staTime","endTime" });
        
        sb.append(serializer.exclude(new String[] { "class","cusLinkman.customer","customer.class","cusLinkman.class","owner"}).serialize(conWeichuli));
        
        sb.deleteCharAt(sb.length()-1);
        sb.append(",\"objTypId\":2}");
        sb.append("}");
        setJsonString(sb.toString());
        
        return SUCCESS;
    }
    
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(conWeichuli.getConId()==null){
			conWeichuliService.save(conWeichuli);
		}else{
			ConWeichuli orgConWeichuli=conWeichuliService.get(conWeichuli.getConId());
			try{
				BeanUtil.copyNotNullProperties(orgConWeichuli, conWeichuli);
				conWeichuliService.save(orgConWeichuli);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
	/**
	 * 保存从拦截中转移的操作
	 */
	public String saveFromLanjie(){
		String conIds = getRequest().getParameter("conIds");
		String lanjieMove = getRequest().getParameter("lanjieMove");
		String dealResId = getRequest().getParameter("dealResId");//放入垃圾箱原因
		String dealRemarks = getRequest().getParameter("dealRemarks");//放入垃圾箱备注
		String[] ids = conIds.trim().split(",");
		boolean flag = conWeichuliService.moveToConWeichuli(ids,lanjieMove,dealResId,dealRemarks);
		if(flag){
			setJsonString("{success:true}");
		}
		
		return SUCCESS;
		
	}
	/**
	 * 保存从未处理中放入垃圾箱的操作
	 */
	public String saveFromWeichuli(){
		String conIds = getRequest().getParameter("conIds");
		String dealResId = getRequest().getParameter("dealResId");//放入垃圾箱原因
		String dealRemarks = getRequest().getParameter("dealRemarks");//放入垃圾箱备注
		String[] ids = conIds.trim().split(",");
		for(String id : ids){
			ConWeichuli orgConWeichuli = conWeichuliService.get(new Long(id));
			orgConWeichuli.setDealStaId((short)2);
			orgConWeichuli.setDealResId(Short.parseShort(dealResId));
			orgConWeichuli.setDealRemarks(dealRemarks);
			conWeichuliService.merge(orgConWeichuli);
		}
		setJsonString("{success:true}");
		return SUCCESS;
	}
	/**
	 * 批量恢复
	 * @return
	 */
	public String recover(){
		String[] ids = getRequest().getParameterValues("ids");
		if(ids!=null){
			for(String id:ids){
				ConWeichuli orgConWeichuli = conWeichuliService.get(new Long(id));
				orgConWeichuli.setDealStaId((short)1);
				conWeichuliService.save(orgConWeichuli);
			}
		}
		jsonString="{success:true}";
		return SUCCESS;
	}
}
