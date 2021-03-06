package com.htsoft.oa.action.system;
/*
 *  北京优创融联科技有限公司企业管理平台   -- http://www.ulane.cn
 *  Copyright (C) 2008-20010 Beijing Ulane Technology Co., LTD
*/
import java.lang.reflect.Type;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.model.system.GlobalType;
import com.htsoft.oa.service.system.GlobalTypeService;
/**
 * 
 * @author 
 *
 */
public class GlobalTypeAction extends BaseAction{
	@Resource
	private GlobalTypeService globalTypeService;
	private GlobalType globalType;
	
	private Long proTypeId;
	
	private String catKey=GlobalType.CAT_PRODUCT_TYPE;

	public String getCatKey() {
		return catKey;
	}

	public void setCatKey(String catKey) {
		this.catKey = catKey;
	}

	public Long getProTypeId() {
		return proTypeId;
	}

	public void setProTypeId(Long proTypeId) {
		this.proTypeId = proTypeId;
	}

	public GlobalType getGlobalType() {
		return globalType;
	}

	public void setGlobalType(GlobalType globalType) {
		this.globalType = globalType;
	}
	
	/**
	 * 取得其子类节点列表
	 * @return
	 */
	public String sub(){
		Long parentId=null;
		String sParentId=getRequest().getParameter("parentId");
		if(StringUtils.isNotEmpty(sParentId)){
			parentId=new Long(sParentId);
		}
		List<GlobalType> typeList=globalTypeService.getByParentIdCatKey(parentId,catKey);
		
		Type type=new TypeToken<List<GlobalType>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,result:");
		
		Gson gson=new Gson();
		buff.append(gson.toJson(typeList, type));
		buff.append("}");
		
		jsonString=buff.toString();
		
		return SUCCESS;
	}
	
	public String mulSave(){
		String data =getRequest().getParameter("data");
		
		logger.info("data:" + data);
		
		if(StringUtils.isNotEmpty(data)){
			Gson gson=new Gson();
			GlobalType[]types=gson.fromJson(data, GlobalType[].class);
			
			for(int i=0;i<types.length;i++){
				GlobalType newType=globalTypeService.get(types[i].getProTypeId());
				try{
					BeanUtil.copyNotNullProperties(newType, types[i]);
					newType.setSn(i+1);
					globalTypeService.save(newType);
				}catch(Exception ex){
					logger.error(ex.getMessage());
				};
			}
		}
		
		jsonString="{success:true}";
		return SUCCESS;
	}
	
	/**
	 * 产生树
	 * @return
	 */
	public String tree(){
		StringBuffer buff = new StringBuffer("[{id:'"+0+"',text:'总分类',expanded:true,children:[");
		List<GlobalType> typeList=globalTypeService.getByParentIdCatKey(new Long(0l),catKey);
		for(GlobalType type:typeList){
			buff.append("{id:'"+type.getProTypeId()).append("',text:'"+type.getTypeName()).append("',isTree:'"+type.getIsTree()).append("',nodekey:'"+type.getNodeKey()).append("',");
		    buff.append(getChildType(type.getProTypeId(),catKey));
		}
		if (!typeList.isEmpty()) {
			buff.deleteCharAt(buff.length() - 1);
	    }
		buff.append("]}]");
		setJsonString(buff.toString());
		
		logger.info("tree json:" + buff.toString());		
		return SUCCESS;
	}
	
	/**
	 * 根据类别（系统参数、业务参数）产生树
	 * @author wangzhongjin
	 * 2012年9月9日17:16:51
	 * @return
	 */
	public String treeByCat(){
		String paramCat = getRequest().getParameter("category");
		StringBuffer buff = new StringBuffer("[");
//		List<GlobalType> typeList=globalTypeService.getByParentIdCatKey(new Long(0l),catKey);
		QueryFilter filter = new QueryFilter();
		filter.addFilter("Q_parentId_L_EQ", "0");
		filter.addFilter("Q_catKey_S_EQ", catKey);
		filter.addFilter("Q_category_N_EQ", paramCat);
		List<GlobalType> typeList = globalTypeService.getAllNoRequest(filter);
		for(GlobalType type:typeList){
			buff.append("{id:'"+type.getProTypeId()).append("',text:'"+type.getTypeName()).append("',isTree:'"+type.getIsTree()).append("',nodekey:'"+type.getNodeKey()).append("',");
			buff.append(getChildType(type.getProTypeId(),catKey));
		}
		if (!typeList.isEmpty()) {
			buff.deleteCharAt(buff.length() - 1);
		}
		buff.append("]");
		setJsonString(buff.toString());
		
		logger.info("tree json:" + buff.toString());		
		return SUCCESS;
	}
	
	/**
	 * 产品产生树
	 * @return
	 */
	public String proTree(){
		StringBuffer buff = new StringBuffer("[{id:'"+0+"',text:'总分类',expanded:true,children:[");
		List<GlobalType> typeList=globalTypeService.getByParentIdCatKey(new Long(0l),catKey);
		for(GlobalType type:typeList){
			buff.append("{id:'"+type.getProTypeId()).append("',text:'"+type.getTypeName()).append("',");
			buff.append("leaf:true,expanded:true},");
		}
		if (!typeList.isEmpty()) {
			buff.deleteCharAt(buff.length() - 1);
	    }
		buff.append("]}]");
		setJsonString(buff.toString());
		
		logger.info("tree json:" + buff.toString());		
		return SUCCESS;
	}
	
	/**
	 * 个人计划树
	 * @param catKey
	 * @return
	 */
	public String pwTree(){
		StringBuffer buff = new StringBuffer("[{id:'"+0+"',text:'总分类',expanded:true,children:[");
		List<GlobalType> typeList=globalTypeService.getByParentIdCatKeyUserId(new Long(0l),catKey,ContextUtil.getCurrentUserId());
		for(GlobalType type:typeList){
			buff.append("{id:'"+type.getProTypeId()).append("',text:'"+type.getTypeName()).append("',");
			buff.append("leaf:true,expanded:true},");
		}
		if (!typeList.isEmpty()) {
			buff.deleteCharAt(buff.length() - 1);
	    }
		buff.append("]}]");
		setJsonString(buff.toString());
		logger.info("tree json:" + buff.toString());
		return SUCCESS;
	}
	/**
	 * 个人计划类型下拉
	 * @param catKey
	 * @return
	 */
    public String combo(){
    	StringBuffer sb=new StringBuffer();
    	List<GlobalType> typeList=globalTypeService.getByParentIdCatKeyUserId(new Long(0l),catKey,ContextUtil.getCurrentUserId());
    	sb.append("[");
		for(GlobalType globalType:typeList){
			sb.append("['").append(globalType.getProTypeId()).append("','").append(globalType.getTypeName()).append("'],");
		}
		if(typeList.size()>0){
			sb.deleteCharAt(sb.length()-1);
		}
		sb.append("]");
		setJsonString(sb.toString());
    	return SUCCESS;
    }	
	
	public String getChildType(Long parentId,String catKey){
		StringBuffer buff=new StringBuffer();
		List<GlobalType> typeList=globalTypeService.getByParentIdCatKey(parentId,catKey);
		if(typeList.size()==0){
			buff.append("leaf:true,expanded:true},");
			return buff.toString(); 
		}else {
			buff.append("expanded:true,children:[");
			for(GlobalType type:typeList){
				buff.append("{id:'"+type.getProTypeId()).append("',text:'"+type.getTypeName()).append("',isTree:'"+type.getIsTree()).append("',");
			    buff.append(getChildType(type.getProTypeId(),catKey));
			}
			buff.deleteCharAt(buff.length() - 1);
			buff.append("]},");
			return buff.toString();
		}
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<GlobalType> list= globalTypeService.getAll(filter);
		
		Type type=new TypeToken<List<GlobalType>>(){}.getType();
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
				//删除该分类时，需要删除该分类下的所有子分类，包括其子子分类
				globalTypeService.mulDel(new Long(id));
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
		GlobalType globalType=globalTypeService.get(proTypeId);
		
		Gson gson=new Gson();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(globalType));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(globalType!=null && globalType.getProTypeId()!=null){
			GlobalType orgGlobalType=globalTypeService.get(globalType.getProTypeId());
			try{
				BeanUtil.copyNotNullProperties(orgGlobalType, globalType);
				
				if(globalType.getSuperSort()!=null && !globalType.getSuperSort().equals("")){
					GlobalType parentType=globalTypeService.get(globalType.getSuperSort());
					if(parentType!=null){
						String parentPath1=parentType.getPath();
						int level1=parentType.getDepth()+1;
						orgGlobalType.setPath(parentPath1+globalType.getProTypeId()+".");
						orgGlobalType.setParentId(globalType.getSuperSort());
						orgGlobalType.setDepth(level1);
					}
				}
				globalTypeService.save(orgGlobalType);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}else{
			
//			QueryFilter filter=new QueryFilter(getRequest());
//			filter.addFilter("Q_typeName_S_EQ",globalType.getTypeName());
//			List<GlobalType> list= globalTypeService.getAll(filter);
//			
//			if(list.size()==0){
				//缺省0代表父节点
				String parentPath="0.";
				int level=1;
				if(globalType!=null && globalType.getParentId()!=null && globalType.getParentId()!=0){
					GlobalType parentType=globalTypeService.get(globalType.getParentId());
					if(parentType!=null){
						parentPath=parentType.getPath();
						level=parentType.getDepth()+1;
					}
				}
				globalType.setDepth(level);
				
				//set sn
				
				Integer sn=globalTypeService.getCountsByParentId(globalType.getParentId());
				globalType.setSn(sn+1);
				globalTypeService.save(globalType);
				globalType.setPath(parentPath+ globalType.getProTypeId()+"." ) ;
				
				globalTypeService.save(globalType);
				setJsonString("{success:true}");
//			}else{
//				setJsonString("{success:false,msg:'对不起,该分类名称已存在,请重新输入!'}");
//			}
			
		}
		
		return SUCCESS;
	}
	
	/**
	 * 根据当前用户权限产生流程分类树
	 * @return
	 */
	public String flowTree(){
		StringBuffer buff = new StringBuffer("[{id:'"+0+"',text:'总分类',expanded:true,children:[");
		AppUser curUser = ContextUtil.getCurrentUser();
		List<GlobalType> typeList = null;
//		if(curUser.isSupperManage()){//假如是超级管理员,则有全部权限
			typeList=globalTypeService.getByParentIdCatKey(new Long(0l),catKey);
//		}else{
//			typeList=globalTypeService.getByRightsCatKey(curUser,catKey);
//		}
		Set<GlobalType> record = new HashSet<GlobalType>();
		for(GlobalType type:typeList){
			if(!record.contains(type)){
					record.add(type);
					buff.append("{id:'"+type.getProTypeId()).append("',text:'"+type.getTypeName()).append("',");
				    buff.append(getTypeByRights(type.getProTypeId(),catKey,record));
			}
		}
		if (!typeList.isEmpty()) {
			buff.deleteCharAt(buff.length() - 1);
	    }
		buff.append("]}]");
		setJsonString(buff.toString());
		
		logger.info("tree json:" + buff.toString());		
		return SUCCESS;
	}
	
	private String getTypeByRights(Long parentId,String catKey,Set<GlobalType> record){
		StringBuffer buff=new StringBuffer();
		List<GlobalType> typeList=globalTypeService.getByParentIdCatKey(parentId,catKey);
		
		if(typeList.size()==0){
			buff.append("leaf:true,expanded:true},");
			return buff.toString(); 
		}else {
			buff.append("expanded:true,children:[");
			for(GlobalType type:typeList){
				if(!record.contains(type)){
					record.add(type);
					System.out.println(type.getPath()); 
					buff.append("{id:'"+type.getProTypeId()).append("',text:'"+type.getTypeName()).append("',");
				    buff.append(getTypeByRights(type.getProTypeId(),catKey,record));
				}else{
					System.out.print("已经存在"+type.getTypeName());
				}
				
			}
			buff.deleteCharAt(buff.length() - 1);
			buff.append("]},");
			return buff.toString();
		}
	}

}
