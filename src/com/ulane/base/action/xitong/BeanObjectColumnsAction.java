package com.ulane.base.action.xitong;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;
import javax.annotation.Resource;

import java.lang.reflect.Type;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.JsonUtil;

import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.web.action.BaseAction;


import com.ulane.base.model.xitong.BeanExtSet;
import com.ulane.base.model.xitong.BeanObjectColumns;
import com.ulane.base.service.xitong.BeanExtSetService;
import com.ulane.base.service.xitong.BeanObjectColumnsService;

import flexjson.JSONSerializer;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class BeanObjectColumnsAction extends BaseAction{
	@Resource
	private BeanObjectColumnsService beanObjectColumnsService;
	@Resource
	private BeanExtSetService beanExtSetService;
	private BeanObjectColumns beanObjectColumns;
	
	private Long beanObjectColumnsId;

	public Long getBeanObjectColumnsId() {
		return beanObjectColumnsId;
	}

	public void setBeanObjectColumnsId(Long beanObjectColumnsId) {
		this.beanObjectColumnsId = beanObjectColumnsId;
	}

	public BeanObjectColumns getBeanObjectColumns() {
		return beanObjectColumns;
	}

	public void setBeanObjectColumns(BeanObjectColumns beanObjectColumns) {
		this.beanObjectColumns = beanObjectColumns;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<BeanObjectColumns> list= beanObjectColumnsService.getAll(filter);
		
//		Type type=new TypeToken<List<BeanObjectColumns>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");

//		JSONSerializer serializer = new JSONSerializer();
//		serializer.transform(new DateTransformer("yyyy-MM-dd HH:mm:ss"),new String[] { "applyTime"});
//		buff.append(serializer.exclude(new String[]{"class","conHiss","conBwListBusRuls"}).serialize(list));
		
//		Gson gson=new Gson();
//		buff.append(gson.toJson(list, type));

		JSONSerializer ser = JsonUtil.getJSONSerializer();
		buff.append(ser.serialize(list));
		buff.append("}");
		
		jsonString=buff.toString();
		
		return SUCCESS;
	}
	/**
	 * 显示扩展信息列表
	 */
	public String listExt(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		filter.addFilter("Q_isExt_L_EQ", "1");
		List<BeanObjectColumns> list= beanObjectColumnsService.getAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:[");
		JSONSerializer ser = JsonUtil.getJSONSerializer();
		int i = 0;
		for(BeanObjectColumns listObj : list){
			if(i++>0)buff.append(",");
			Object extSetId = beanExtSetService.getByColumnsId(listObj.getBeanObjectColumnsId());
			if(extSetId!=null&&!extSetId.equals("")){
				long Id  = Long.valueOf(extSetId.toString());
				BeanExtSet listextSet = beanExtSetService.get(Id);
				buff.append(ser.exclude("beanObjectColumns").serialize(listextSet));
			} else {
				buff.append("{\"beanExtSet\":null}");
			}
			buff.deleteCharAt(buff.length() - 1); // 去掉最后的大括号
			buff.append(",\"beanObjectColumnsTame\":\""+listObj.getBeanObjectColumnsTame()+"\"");
			buff.append(",\"beanObjectColumnsId\":\""+listObj.getBeanObjectColumnsId()+"\"");
			buff.append(",\"extType\":\""+listObj.getColumnType()+"\"");
			buff.append("}");
		}
		
		buff.append("]}");
		
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
				beanObjectColumnsService.remove(new Long(id));
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
		BeanObjectColumns beanObjectColumns=beanObjectColumnsService.get(beanObjectColumnsId);
		
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(beanObjectColumns));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(beanObjectColumns.getBeanObjectColumnsId()==null){
			beanObjectColumnsService.save(beanObjectColumns);
		}else{
			BeanObjectColumns orgBeanObjectColumns=beanObjectColumnsService.get(beanObjectColumns.getBeanObjectColumnsId());
			try{
				BeanUtil.copyNotNullProperties(orgBeanObjectColumns, beanObjectColumns);
				beanObjectColumnsService.save(orgBeanObjectColumns);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
}
