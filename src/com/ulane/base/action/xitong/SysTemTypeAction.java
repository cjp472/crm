package com.ulane.base.action.xitong;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;
import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;

import java.lang.reflect.Type;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.htsoft.core.Constants;
import com.htsoft.core.util.BeanUtil;

import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.web.action.BaseAction;


import com.ulane.base.model.xitong.SysTemType;
import com.ulane.base.service.xitong.SysTemTypeService;
import com.ulane.know.model.know.UkKnowTemplate;
import com.ulane.know.model.know.UkSysKnow;
import com.ulane.know.service.know.UkKnowTemplateService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class SysTemTypeAction extends BaseAction{
	@Resource
	private SysTemTypeService sysTemTypeService;
	@Resource
	private UkKnowTemplateService ukKnowTemplateService;
	private SysTemType sysTemType;
	
	private Long tmpTypeId;

	public Long getTmpTypeId() {
		return tmpTypeId;
	}

	public void setTmpTypeId(Long tmpTypeId) {
		this.tmpTypeId = tmpTypeId;
	}

	public SysTemType getSysTemType() {
		return sysTemType;
	}

	public void setSysTemType(SysTemType sysTemType) {
		this.sysTemType = sysTemType;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<SysTemType> list= sysTemTypeService.getAll(filter);
		
		Type type=new TypeToken<List<SysTemType>>(){}.getType();
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
	 * 批量删除
	 * @return
	 */
	public String multiDel(){
		
		String[]ids=getRequest().getParameterValues("ids");
		String s ="";
		if(ids!=null){
			for(String id:ids){
				List<SysTemType> typeList = sysTemTypeService.getByPath(new Long(id));
				StringBuffer sb = new StringBuffer();
				for(SysTemType sysTemType : typeList){
					sb.append(sysTemType.getTmpTypeId());
					sb.append(",");
				}
				if (typeList.size() > 0) {
					sb.deleteCharAt(sb.length() - 1);
				}
				List<UkKnowTemplate> tempList = ukKnowTemplateService.getByInTypeId(sb.toString());
				if(tempList.size()>0){
					s="对不起,您无法删除已被引用的分类";
				}else{
//					sysTemTypeService.remove(new Long(id));
					SysTemType sysTemType = sysTemTypeService.get(new Long(id));
					sysTemType.setUkTmpTypeStatus(new Integer(Constants.FLAG_DELETED));
					sysTemTypeService.merge(sysTemType);
					s="删除成功!";
				}
			}
		}
		jsonString="{success:true,msg:'"+s+"'}";
		
		return SUCCESS;
	}
	
	/**
	 * 显示详细信息
	 * @return
	 */
	public String get(){
		SysTemType sysTemType=sysTemTypeService.get(tmpTypeId);
		
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(sysTemType));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		
		if (sysTemType != null && sysTemType.getTmpTypeId() != null) {
			SysTemType orgSysTemType=sysTemTypeService.get(sysTemType.getTmpTypeId());
			try {
				BeanUtil.copyNotNullProperties(orgSysTemType, sysTemType);
				orgSysTemType.setUkTmpTypeStatus(new Integer(Constants.FLAG_UNDELETED));
				sysTemTypeService.save(orgSysTemType);
			} catch (Exception ex) {
				logger.error(ex.getMessage());
			}
		} else {
			String parentPath = "0.";
			if (sysTemType != null
					&& sysTemType.getTmpTypeId() != null
					&& sysTemType.getTmpTypeId() != 0) {
				SysTemType parentType = sysTemTypeService.get(sysTemType.getTmpTypeId());
				if (parentType != null) {
					parentPath = parentType.getPath();
				}
			}
			sysTemType.setUkTmpTypeStatus(new Integer(Constants.FLAG_UNDELETED));
			sysTemTypeService.save(sysTemType);
			sysTemType.setPath(parentPath+ sysTemType.getTmpTypeId() + ".");
			sysTemTypeService.save(sysTemType);
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
	
	/**
	 * 加载树
	 * 
	 * @return
	 */
	public String tree() {
		String method=getRequest().getParameter("parentId");
		StringBuffer buff = new StringBuffer();
		boolean flag=false;
		if(StringUtils.isNotEmpty(method)){
			buff.append("[");
			flag=true;
		}else{
		 buff = new StringBuffer("[{id:'" + 0
					+ "',text:'模版类型',expanded:true,children:[");
		}
		
		List<SysTemType> typeList = sysTemTypeService
				.getByParentId(new Long(0l));
		for (SysTemType type : typeList) {
			buff.append("{id:'" + type.getTmpTypeId()).append(
					"',text:'" + type.getTmpTypeName()).append("',");
			buff.append(getChildType(type.getTmpTypeId()));
		}
		if (!typeList.isEmpty()) {
			buff.deleteCharAt(buff.length() - 1);
		}
		if(flag==true){
			buff.append("]");
		}else{
		    buff.append("]}]");
		}
		setJsonString(buff.toString());
		return SUCCESS;
	}
	
	/**
	 * 树子节点
	 * @param parentId
	 * @return
	 */
	public String getChildType(Long parentId) {
		StringBuffer buff = new StringBuffer();
		List<SysTemType> typeList = sysTemTypeService
				.getByParentId(parentId);
		if (typeList.size() == 0) {
			buff.append("leaf:true,expanded:true},");
			return buff.toString();
		} else {
			buff.append("expanded:true,children:[");
			for (SysTemType type : typeList) {
				buff.append("{id:'" + type.getTmpTypeId()).append(
						"',text:'" + type.getTmpTypeName()).append("',");
				buff.append(getChildType(type.getTmpTypeId()));
			}
			buff.deleteCharAt(buff.length() - 1);
			buff.append("]},");
			return buff.toString();
		}
	}
}
