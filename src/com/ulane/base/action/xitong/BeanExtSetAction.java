package com.ulane.base.action.xitong;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;
import javax.annotation.Resource;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.JsonUtil;

import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.web.action.BaseAction;

import com.ulane.base.model.xitong.BeanExtSet;
import com.ulane.base.service.xitong.BeanExtSetService;
import com.ulane.base.service.xitong.BeanObjectColumnsService;

import flexjson.JSONSerializer;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class BeanExtSetAction extends BaseAction{
	@Resource
	private BeanExtSetService beanExtSetService;
	@Resource
	private BeanObjectColumnsService beanObjectColumnsService;
	private BeanExtSet beanExtSet;
	
	private Long extSetId;

	public BeanExtSet getBeanExtSet() {
		return beanExtSet;
	}
	public void setBeanExtSet(BeanExtSet beanExtSet) {
		this.beanExtSet = beanExtSet;
	}
	public Long getExtSetId() {
		return extSetId;
	}
	public void setExtSetId(Long extSetId) {
		this.extSetId = extSetId;
	}
	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<BeanExtSet> list= beanExtSetService.getAll(filter);
		
//		Type type=new TypeToken<List<BeanObject>>(){}.getType();
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
	 * 批量删除
	 * @return
	 */
	public String multiDel(){
		
		String[]ids=getRequest().getParameterValues("ids");
		if(ids!=null){
			for(String id:ids){
				beanExtSetService.remove(new Long(id));
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
		BeanExtSet beanObject=beanExtSetService.get(extSetId);
		JSONSerializer ser = JsonUtil.getJSONSerializer();
//		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
//		sb.append(gson.toJson(beanObject));
		sb.append(ser.serialize(beanObject));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
	    String details = getRequest().getParameter("details"); // 得到传过来的行信息。
        if (org.apache.commons.lang.StringUtils.isNotEmpty(details)) {
            Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
            BeanExtSet[] extSetArr = (BeanExtSet[]) gson.fromJson(details, BeanExtSet[].class);
            if (extSetArr != null) {
                for (BeanExtSet extSet : extSetArr) {
                    if (extSet.getExtSetId() == null || extSet.getExtSetId() == 0) {  //新增
                    	BeanExtSet beanExtSet = new BeanExtSet();
                    	if(extSet.getExtName()!=null&&!extSet.getExtName().equals(""))
                    		beanExtSet.setExtName(extSet.getExtName());
                    	if(extSet.getExtParam()!=null&&!extSet.getExtParam().equals(""))
                    		beanExtSet.setExtParam(extSet.getExtParam());
                    	if(extSet.getExtType()!=null&&!extSet.getExtType().equals(""))
                    		beanExtSet.setExtType(extSet.getExtType());
                    	beanExtSet.setIsStart(extSet.getIsStart());
                    	if(!"".equals(extSet.getBeanObjectColumnsId()))
                    		beanExtSet.setBeanObjectColumns(beanObjectColumnsService.get(extSet.getBeanObjectColumnsId()));
                    	beanExtSetService.save(beanExtSet);
                    } else {  //修改
                    	BeanExtSet orgExtSet = beanExtSetService.get(extSet.getExtSetId());
                        try {
                            BeanUtil.copyNotNullProperties(orgExtSet,extSet);
                            beanExtSetService.save(orgExtSet);
                        } catch (Exception ex) {
                            logger.error(ex.getMessage());
                            ex.printStackTrace();
                        }
                    }
                }
            }
        }

		return SUCCESS;
		
	}
}
