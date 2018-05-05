package com.ulane.base.action.xitong;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
 */
import java.util.Date;
import java.util.List;
import javax.annotation.Resource;

import java.lang.reflect.Type;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.JsonUtil;
import com.htsoft.core.util.ContextUtil;

import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.web.action.BaseAction;


import com.ulane.base.model.xitong.BmBillNum;
import com.ulane.base.service.xitong.BmBillNumService;

import flexjson.JSONSerializer;
/**
 * 
 * @author 陈峰
 *
 */
public class BmBillNumAction extends BaseAction{
	@Resource
	private BmBillNumService bmBillNumService;
	private BmBillNum bmBillNum;
	
	private Long billNumId;

	public Long getBillNumId() {
		return billNumId;
	}

	public void setBillNumId(Long billNumId) {
		this.billNumId = billNumId;
	}

	public BmBillNum getBmBillNum() {
		return bmBillNum;
	}

	public void setBmBillNum(BmBillNum bmBillNum) {
		this.bmBillNum = bmBillNum;
	}


	/**
	 * combo  陈峰
	 */
/**	public String combo(){
		List<BmBillNum> list = bmBillNumService.getAll();
		StringBuffer sb= new StringBuffer("[");
		int i=0;
		for(BmBillNum type:list){
			if(i++>0) sb.append(",");
			sb.append("['").append(type.getBmBillNumId()).append("','").append(type.getBmBillNumIdName()).append("']");
		}
		sb.append("]");
		setJsonString(sb.toString());
		logger.info("sb:"+sb.toString());
		return SUCCESS;
	}
*/

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<BmBillNum> list= bmBillNumService.getAll(filter);
		
//		Type type=new TypeToken<List<BmBillNum>>(){}.getType();

		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(filter.getPagingBean().getTotalItems()).append(",result:");
		
//		Gson gson=new Gson();
//		buff.append(gson.toJson(list, type));
		
    	JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
		buff.append(jsonSer.serialize(list));		
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
				bmBillNumService.remove(new Long(id));
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
		BmBillNum bmBillNum=bmBillNumService.get(billNumId);
		
//		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
    	JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
    	sb.append(jsonSer.serialize(bmBillNum));		
		//sb.append(gson.toJson(bmBillNum));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(bmBillNum.getBillNumId()==null){
            bmBillNum.setCreateDate(new Date());
            bmBillNum.setCreateBy(ContextUtil.getCurrentUser().getFamilyName());
			bmBillNumService.save(bmBillNum);
		}else{
			BmBillNum orgBmBillNum=bmBillNumService.get(bmBillNum.getBillNumId());
			try{
				BeanUtil.copyNotNullProperties(orgBmBillNum, bmBillNum);
                orgBmBillNum.setUpdateDate(new Date());
                orgBmBillNum.setUpdateBy(ContextUtil.getCurrentUser().getFamilyName());
				bmBillNumService.save(orgBmBillNum);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
	
	/**
	 * 获取新的凭证号
	 * @return
	 */
	public String getNum(){
		String tableId=getRequest().getParameter("tableId");
		try{
			int l = Integer.parseInt(tableId);
			setJsonString("{success:true,'totalCounts':1,data:{\"certificateNum\":\""+bmBillNumService.getBillNum(l,new Long(0))+"\"}}");			
		}
		catch(Exception e){System.out.println(e);}
		return SUCCESS;
	}

	
}
