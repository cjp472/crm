package com.ulane.know.action.know;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.sql.Timestamp;
import java.util.Date;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import javax.annotation.Resource;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.htsoft.core.Constants;
import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.web.action.BaseAction;
import com.ulane.know.model.know.UkKnowCollectType;
import com.ulane.know.model.know.UkSysKnow;
import com.ulane.know.service.know.UkKnowCollectTypeService;
import com.ulane.know.service.know.UkSysKnowService;

import flexjson.JSONSerializer;
import flexjson.transformer.DateTransformer;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class UkKnowCollectTypeAction extends BaseAction{
	@Resource
	private UkKnowCollectTypeService ukKnowCollectTypeService;
	@Resource
	private UkSysKnowService ukSysKnowService;
	private UkKnowCollectType ukKnowCollectType;
	
	private Long knowCollectTypeId;

	public Long getKnowCollectTypeId() {
		return knowCollectTypeId;
	}

	public void setKnowCollectTypeId(Long knowCollectTypeId) {
		this.knowCollectTypeId = knowCollectTypeId;
	}

	public UkKnowCollectType getUkKnowCollectType() {
		return ukKnowCollectType;
	}

	public void setUkKnowCollectType(UkKnowCollectType ukKnowCollectType) {
		this.ukKnowCollectType = ukKnowCollectType;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<UkKnowCollectType> list= ukKnowCollectTypeService.getAll(filter);
		
//		Type type=new TypeToken<List<UkKnowCollectType>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");

		JSONSerializer serializer = new JSONSerializer();
		serializer.transform(new DateTransformer("yyyy-MM-dd HH:mm:ss"),new String[] { "applyTime"});
		buff.append(serializer.exclude(new String[]{"class","conHiss","conBwListBusRuls"}).serialize(list));
		
//		Gson gson=new Gson();
//		buff.append(gson.toJson(list, type));
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
				ukKnowCollectTypeService.remove(new Long(id));
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
		UkKnowCollectType ukKnowCollectType=ukKnowCollectTypeService.get(knowCollectTypeId);
		
//		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		JSONSerializer json=new JSONSerializer();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
//		sb.append(gson.toJson(ukKnowCollectType));
		json.transform(new DateTransformer("yyyy-MM-dd"),new String[]{"createDate","createDate"});
		sb.append(json.serialize(ukKnowCollectType));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(ukKnowCollectType.getKnowCollectTypeId()==null){
			ukKnowCollectType.setAppUser(ContextUtil.getCurrentUser());
			ukKnowCollectType.setCreateBy(ContextUtil.getCurrentUser().getFullname());
			ukKnowCollectType.setCreateDate(new Timestamp(new Date().getTime()));
			ukKnowCollectType.setKnowTypeStatus(1);
			ukKnowCollectTypeService.save(ukKnowCollectType);
			if(ukKnowCollectType!=null){
				String typePath = "";
				if(!ukKnowCollectType.getParentId().equals(new Long(0))){
					UkKnowCollectType collectType = ukKnowCollectTypeService.get(ukKnowCollectType.getParentId());
					if(collectType!=null){
						typePath = collectType.getPath() + ukKnowCollectType.getKnowCollectTypeId() + ".";
						ukKnowCollectType.setPath(typePath);
						ukKnowCollectTypeService.save(ukKnowCollectType);		
					}
					setJsonString("{success:true}");
				}else{
					typePath = "0.";
					typePath += ukKnowCollectType.getKnowCollectTypeId().toString()+".";
					ukKnowCollectType.setPath(typePath);
					ukKnowCollectTypeService.save(ukKnowCollectType);		
					setJsonString("{success:true}");
				}
			}else{
				setJsonString("{success:false}");
			}
		}else{
			UkKnowCollectType orgUkKnowCollectType=ukKnowCollectTypeService.get(ukKnowCollectType.getKnowCollectTypeId());
			try{
				BeanUtil.copyNotNullProperties(orgUkKnowCollectType, ukKnowCollectType);
				orgUkKnowCollectType.setUpdateBy(ContextUtil.getCurrentUser().getFullname());
				orgUkKnowCollectType.setUpdateDate(new Timestamp(new Date().getTime()));
				ukKnowCollectTypeService.save(orgUkKnowCollectType);
				setJsonString("{success:true}");
			}catch(Exception ex){
				logger.error(ex.getMessage());
				setJsonString("{success:false}");
			}
		}
		return SUCCESS;
		
	}
	
	public String treeLoad(){
		StringBuffer sb = new StringBuffer("[{id:'0',text:'知识收藏总分类',expanded:true,children:[");
		List<UkKnowCollectType> collectTypes = ukKnowCollectTypeService.findByParent(new Long(0), ContextUtil.getCurrentUserId());
		for(UkKnowCollectType type : collectTypes){
			sb.append("{id:'" + type.getKnowCollectTypeId() + "',text:'" + type.getName() + "',");
			sb.append(findChildren(type.getKnowCollectTypeId()));
		}
		if (!collectTypes.isEmpty()) {
			sb.deleteCharAt(sb.length() - 1);
		}
		sb.append("]}]");
		jsonString = sb.toString();
		
		return SUCCESS;
	}
	
	public String findChildren(Long parentId){
		StringBuffer buff = new StringBuffer("");
		List<UkKnowCollectType> list = ukKnowCollectTypeService.findByParent(parentId, ContextUtil.getCurrentUserId());
		if (list.isEmpty() || list.size() == 0) {
			buff.append("leaf:true},");
			return buff.toString();
		} else {
			buff.append("children:[");
			for(UkKnowCollectType type : list){
				buff.append("{id:'" + type.getKnowCollectTypeId() + "',text:'" + type.getName() + "',");
				buff.append(findChildren(type.getKnowCollectTypeId()));
			}
			buff.deleteCharAt(buff.length() - 1);
			buff.append("]},");
			return buff.toString();
		}
	}
	
	public String listKnow(){
		String collectTypeId = getRequest().getParameter("collectTypeId");
		String keyWordStr = getRequest().getParameter("ukKnowKeyWord");
		QueryFilter filter = new QueryFilter(getRequest());
		filter.addFilter("Q_isDel_S_EQ", "false");
		filter.addSorted("viewCount", "desc");
		
		if(keyWordStr!=null && !keyWordStr.equals("")){
//			filter.addFilter("Q_ukKnowKeywords.keyWord_S_LK", keyWordStr);
			filter.addFilter("Q_knowKeyWords_S_LK", keyWordStr);
		}
		if(collectTypeId!=null && !collectTypeId.equals("") && !collectTypeId.equals("0")){
			filter.addFilter("Q_ukKnowCollectTypes.knowCollectTypeId_L_EQ", collectTypeId);
		}else{
			filter.addFilter("Q_ukKnowCollectTypes.appUser.userId_L_EQ", ContextUtil.getCurrentUserId().toString());
		}
		
		List<UkSysKnow> list = ukSysKnowService.getAll(filter);
//		Set set = new HashSet();// 保持快速去重复值，必须用HashSet
//		for (Iterator it = list.iterator(); it.hasNext();) {
//			UkSysKnow item = (UkSysKnow) it.next();
//			if (set.add(item) == false) {
//				it.remove();
//			}
//		}
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(filter.getPagingBean().getTotalItems()).append(",result:");
		JSONSerializer serializer = new JSONSerializer();
		serializer.transform(new DateTransformer("yyyy-MM-dd"), new String[] {
				"enableTime", "pastTime", "createDate", "updateDate" });
		buff.append(serializer
				.include("knowId","tiTle","knowKeyWords","busiType","enableTime","pastTime","sysKnowStatus","viewCount","dianpingCount","sysKnowComment","plus1","plus2","plus3","plus4","plus5","plus6","plus7","plus8","isDel","sysKnowVersion","createDate","updateDate","userid","fankuiShu","busiTypeMapName","delRemark","delReason","accessManage","averageCount")
				.include("ukKnowApprove.knowApproveId","ukKnowApprove.runid","ukKnowTypes.knowTypeId","ukKnowTypes.name","ukKnowKeywords.keywordId","ukKnowKeywords.keyWord","ukKnowApplys.applyId","ukKnowApplys.runid","ukKnowTemplate.knowTmpId","ukKnowTemplate.tmpName","createBy.userId","createBy.fullname","fileAttachs.fileId","fileAttachs.fileName","fileAttachs.filePath")
				.exclude("*")
				.serialize(list));
		buff.append("}");

		jsonString = buff.toString();

		
		return SUCCESS;
	}
	
	public String shoucangSave(){
		
		String knowCollectTypeId = getRequest().getParameter("knowCollectTypeId");
		String knowId = getRequest().getParameter("knowId");
		if(knowCollectTypeId != null && knowId != null){
			UkKnowCollectType knowCollectType = ukKnowCollectTypeService.get(new Long(knowCollectTypeId));
			Set<UkSysKnow> set = knowCollectType.getUkCollectKnows();
			UkSysKnow know = ukSysKnowService.get(new Long(knowId));
			set.add(know);
			
			knowCollectType.setUkCollectKnows(set);
			ukKnowCollectTypeService.save(knowCollectType);
		}
		
		return SUCCESS;
	}
	
	public String removeMyKnow(){
		String knowCollectTypeId = getRequest().getParameter("knowCollectTypeId");
		String knowIds = getRequest().getParameter("knowIds");
		if(knowCollectTypeId != null && knowIds != null){
			UkKnowCollectType knowCollectType = ukKnowCollectTypeService.get(new Long(knowCollectTypeId));
			Set<UkSysKnow> set = knowCollectType.getUkCollectKnows();
			String[] ids = knowIds.split(",");
			for(String id : ids){
				UkSysKnow know = ukSysKnowService.get(new Long(id));
				set.remove(know);
			}
			
			knowCollectType.setUkCollectKnows(set);
			ukKnowCollectTypeService.save(knowCollectType);
		}
		
		return SUCCESS;
	}
}
