package com.ulane.know.action.know;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.AppUtil;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.oa.model.system.AppRole;
import com.htsoft.oa.model.system.Department;
import com.htsoft.oa.model.system.Dictionary;
import com.htsoft.oa.service.system.AppRoleService;
import com.htsoft.oa.service.system.DictionaryService;
import com.ulane.base.model.xitong.UlDepartment;
import com.ulane.base.model.xitong.UlEmployee;
import com.ulane.base.service.xitong.UlDepartmentService;
import com.ulane.know.model.know.UkKnowDimensionality;
import com.ulane.know.service.know.UkKnowDimensionalityService;

import flexjson.JSONDeserializer;
import flexjson.JSONSerializer;
import flexjson.transformer.DateTransformer;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class UkKnowDimensionalityAction extends BaseAction{
	@Resource
	private UkKnowDimensionalityService ukKnowDimensionalityService;
	private UkKnowDimensionality ukKnowDimensionality;
	@Resource
	private AppRoleService appRoleService;
	@Resource
	private UlDepartmentService ulDepartmentService;
	@Resource
	private DictionaryService dictionaryService;
	
	private Long dimensionalityId;

	public Long getDimensionalityId() {
		return dimensionalityId;
	}

	public void setDimensionalityId(Long dimensionalityId) {
		this.dimensionalityId = dimensionalityId;
	}

	public UkKnowDimensionality getUkKnowDimensionality() {
		return ukKnowDimensionality;
	}

	public void setUkKnowDimensionality(UkKnowDimensionality ukKnowDimensionality) {
		this.ukKnowDimensionality = ukKnowDimensionality;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		String nodeId = getRequest().getParameter("Q_parentId_L_EQ");
		String isLeaf = getRequest().getParameter("isLeaf");
		QueryFilter filter=new QueryFilter(getRequest());
		filter.addSorted("classifyName", "asc");
		List<UkKnowDimensionality> list= ukKnowDimensionalityService.getAll(filter);
		int count = filter.getPagingBean().getTotalItems();
		if(nodeId!=null && !nodeId.equals("") && isLeaf!=null && isLeaf.equals("true")){
			UkKnowDimensionality dimensionality = ukKnowDimensionalityService.get(new Long(nodeId));
			list.add(dimensionality);
			count++;
		}
//		Type type=new TypeToken<List<UkKnowDimensionality>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(count).append(",result:[");

		JSONSerializer serializer = new JSONSerializer();
		serializer.transform(new DateTransformer("yyyy-MM-dd HH:mm:ss"),new String[] { "createDate", "updateDate"});
		int i = 0;
		for(UkKnowDimensionality knowDimen : list){
			if(i++>0)buff.append(",");
			serializer.include("createBy.fullname","updateBy.fullname").exclude("class","createBy.*","updateBy.*");
			buff.append(serializer.serialize(knowDimen));
			if(knowDimen.getParentId()!=null && knowDimen.getParentId()!=0L){
				UkKnowDimensionality dimensionality = ukKnowDimensionalityService.get(knowDimen.getParentId());
				buff.deleteCharAt(buff.length() - 1); // 去掉最后的大括号
				buff.append(",\"parentName\":\""+dimensionality.getClassifyName()+"\"");
				buff.append("}");
			} else {
				buff.deleteCharAt(buff.length() - 1); // 去掉最后的大括号
				buff.append(",\"parentName\":\""+AppUtil.getCompanyName()+"\"");
				buff.append("}");
			}
		}
		
//		Gson gson=new Gson();
//		buff.append(gson.toJson(list, type));
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
//				ukKnowDimensionalityService.remove(new Long(id));
				UkKnowDimensionality dimensionality = ukKnowDimensionalityService.get(new Long(id));
				dimensionality.setIsDelete(new Long(UkKnowDimensionality.CLOSE));
				ukKnowDimensionalityService.save(dimensionality);
			}
		}
		
		jsonString="{success:true}";
		
		return SUCCESS;
	}
	
	/**
	 * 批量启用
	 * @return
	 */
	public String multiEnabled(){
		
		String[]ids=getRequest().getParameterValues("ids");
		if(ids!=null){
			for(String id:ids){
				UkKnowDimensionality dimensionality = ukKnowDimensionalityService.get(new Long(id));
				dimensionality.setIsDelete(new Long(UkKnowDimensionality.QIYONG));
				ukKnowDimensionalityService.save(dimensionality);
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
		UkKnowDimensionality ukKnowDimensionality=ukKnowDimensionalityService.get(dimensionalityId);
		
//		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
//		sb.append(gson.toJson(ukKnowDimensionality));
		JSONSerializer serializer = new JSONSerializer();
		serializer.transform(new DateTransformer("yyyy-MM-dd HH:mm:ss"),new String[] {"createDate", "updateDate"});
        sb.append(serializer.exclude(new String[]{"class"}).serialize(ukKnowDimensionality));

		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(ukKnowDimensionality.getDimensionalityId()==null){
			ukKnowDimensionality.setCreateDate(new java.util.Date());
			ukKnowDimensionality.setCreateBy(ContextUtil.getCurrentUser());
			ukKnowDimensionality.setIsDelete(new Long(UkKnowDimensionality.UNQIYONG));
			ukKnowDimensionalityService.save(ukKnowDimensionality);
		}else{
			UkKnowDimensionality orgUkKnowDimensionality=ukKnowDimensionalityService.get(ukKnowDimensionality.getDimensionalityId());
			try{
				BeanUtil.copyNotNullProperties(orgUkKnowDimensionality, ukKnowDimensionality);
				if(ukKnowDimensionality.getVisitManage()==1){
					orgUkKnowDimensionality.setVisitRole(null);
				}
				orgUkKnowDimensionality.setUpdateDate(new java.util.Date());
				orgUkKnowDimensionality.setUpdateBy(ContextUtil.getCurrentUser());
				ukKnowDimensionalityService.save(orgUkKnowDimensionality);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
	/**
	 * 加载tree节点
	 */
	public String treeLoad() {
		StringBuffer sb = new StringBuffer("[{id:'0',text:'"
				+ AppUtil.getCompanyName() + "',expanded:true,children:[");
		// 查询顶级父节点
		List<UkKnowDimensionality> list = ukKnowDimensionalityService.findByParent(new Long(0));
		for (UkKnowDimensionality ukKnowDimen : list) {
			sb.append("{id:'" + ukKnowDimen.getDimensionalityId() + "',text:'" + ukKnowDimen.getClassifyName()
					+ "',");
			sb.append(findChildren(ukKnowDimen.getDimensionalityId()));
		}
		if (!list.isEmpty()) {
			sb.deleteCharAt(sb.length() - 1);
		}
		sb.append("]}]");
		jsonString = sb.toString();
		return SUCCESS;
	}
	/*
	 * 寻找子根节点
	 */

	public String findChildren(Long usergroupId) {
		StringBuffer buff1 = new StringBuffer("");
		List<UkKnowDimensionality> list = ukKnowDimensionalityService.findByParent(usergroupId);
		if (list.isEmpty() || list.size() == 0) {
			buff1.append("leaf:true},");
			return buff1.toString();
		} else {
			buff1.append("children:[");
			for (UkKnowDimensionality ukKnowDimen : list) {
				buff1.append("{id:'" + ukKnowDimen.getDimensionalityId() + "',text:'"
						+ ukKnowDimen.getClassifyName() + "',mark:'1',");
				buff1.append(findChildren(ukKnowDimen.getDimensionalityId()));
			}
			buff1.deleteCharAt(buff1.length() - 1);
			buff1.append("]},");
			return buff1.toString();
		}
	}

	/**
	 * 查询可选角色
	 * @return
	 */
	public String chooseRoles(){
		List<AppRole> chooseRoles = appRoleService.getAll();
		if(dimensionalityId != null && !dimensionalityId.equals("")){
			UkKnowDimensionality ukKnowDimensionality = ukKnowDimensionalityService.get(dimensionalityId);
			if(ukKnowDimensionality!=null && ukKnowDimensionality.getVisitRole()!=null){
				String roleIds = ukKnowDimensionality.getVisitRole();
				String[] roles = roleIds.split(",");
				for(String id : roles){
					AppRole appRole = appRoleService.get(new Long(id));
					chooseRoles.remove(appRole);
				}
			}
		}
		StringBuffer sb = new StringBuffer("[");
		for (AppRole role : chooseRoles) {
			if (role.getStatus() != 0) {
				sb.append("['" + role.getRoleId() + "','" + role.getRoleName() + "'],");
			}
		}
		sb.deleteCharAt(sb.length() - 1);
		sb.append("]");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	
	/**
	 * 查询已有角色
	 * @return
	 */
	public String selectedRoles(){
		if(dimensionalityId != null && !dimensionalityId.equals("")){
			UkKnowDimensionality ukKnowDimensionality = ukKnowDimensionalityService.get(dimensionalityId);
			if (ukKnowDimensionality != null && ukKnowDimensionality.getVisitRole()!=null) {
				String roleIds = ukKnowDimensionality.getVisitRole();
				String[] roles = roleIds.split(",");
				StringBuffer sb = new StringBuffer("[");
				for (String id : roles) {
					AppRole appRole = appRoleService.get(new Long(id));
					sb.append("['" + appRole.getRoleId() + "','" + appRole.getRoleName() + "'],");
				}
				sb.deleteCharAt(sb.length() - 1);
				sb.append("]");
				setJsonString(sb.toString());
			}
		}
		
		return SUCCESS;
	}
	
	public String listTree(){
		StringBuffer sb = new StringBuffer("[{id:'0',text:'业务维度',mark:'1',expanded:true,children:[");
		// 查询顶级父节点
		List<UkKnowDimensionality> list = ukKnowDimensionalityService.findByParent(new Long(0));
		for (UkKnowDimensionality ukKnowDimen : list) {
			sb.append("{id:'" + ukKnowDimen.getDimensionalityId() + "',text:'" + ukKnowDimen.getClassifyName()
					+ "',mark:'1',");
			sb.append(findChildren(ukKnowDimen.getDimensionalityId()));
		}
		if (!list.isEmpty()) {
			sb.deleteCharAt(sb.length() - 1);
		}
		sb.append("]},{id:'-1',text:'机构维度',mark:'2',expanded:true,children:[");
		List<UlDepartment> listDep = ulDepartmentService.findByParentId(new Long(0));// 最顶层父节点
		for (UlDepartment dep : removeDeleted(listDep)) {
			sb.append("{id:'" + dep.getDepid() + "',text:'" + dep.getDepname() + "',mark:'2',");
			sb.append(findDepChild(dep.getDepid()));
		}
		if(!listDep.isEmpty()){
			sb.deleteCharAt(sb.length() - 1);
		}
		sb.append("]},{id:'-2',text:'岗位维度',mark:'3',expanded:true,children:[");
		List<Dictionary> listDic_GW = dictionaryService.getZwRoot("ZW001");
		for(Dictionary dic : listDic_GW){
			sb.append("{id:'" + dic.getDicId() + "',text:'" + dic.getItemValue() + "',mark:'3',");
			sb.append(getChildDic(dic.getDicId()));
		}
		if(!listDic_GW.isEmpty()){
			sb.deleteCharAt(sb.length() - 1);
		}
		sb.append("]}");
		
		sb.append("]");
		jsonString = sb.toString();
		return SUCCESS;
	}
	
	public String listDimenTree(){
		String flag = getRequest().getParameter("flag");
		StringBuffer sb = new StringBuffer();
		if(flag!=null && flag.equals("0")){
			sb.append("[{id:'0',text:'业务维度',mark:'1',expanded:true,children:[");
		}else{
			sb.append("[");
		}
		if(flag!=null && flag.equals("1")){
//			Set<AppRole> setRole = ContextUtil.getCurrentUser().getRoles();
//			for(Iterator<AppRole> it = setRole.iterator();it.hasNext();){
//				AppRole role = it.next();
//				role.getRoleId();
//			}
			// 查询顶级父节点
			List<UkKnowDimensionality> list = ukKnowDimensionalityService.findByParent(new Long(0));
			for (UkKnowDimensionality ukKnowDimen : list) {
				sb.append("{id:'" + ukKnowDimen.getDimensionalityId() + "',text:'" + ukKnowDimen.getClassifyName()
						+ "',mark:'1',");
				sb.append(findChildren(ukKnowDimen.getDimensionalityId()));
			}
			if (!list.isEmpty()) {
				sb.deleteCharAt(sb.length() - 1);
			}
		}else{
			// 查询顶级父节点
			List<UkKnowDimensionality> list = ukKnowDimensionalityService.findByParent(new Long(0));
			for (UkKnowDimensionality ukKnowDimen : list) {
				sb.append("{id:'" + ukKnowDimen.getDimensionalityId() + "',text:'" + ukKnowDimen.getClassifyName()
						+ "',mark:'1',");
				sb.append(findChildren(ukKnowDimen.getDimensionalityId()));
			}
			if (!list.isEmpty()) {
				sb.deleteCharAt(sb.length() - 1);
			}
		}
		if(flag!=null && flag.equals("0")){
			sb.append("]}");
		}
		
		sb.append("]");
		jsonString = sb.toString();
		return SUCCESS;
	}
	
	public String listDepTree(){
		String flag = getRequest().getParameter("flag");
		StringBuffer sb = new StringBuffer();
		if(flag!=null && flag.equals("0")){
			sb.append("[{id:'-1',text:'机构维度',mark:'2',expanded:true,children:[");
		}else{
			sb.append("[");
		}
		if(flag!=null && flag.equals("1")){
			Department dep = ContextUtil.getCurrentUser().getDepartment();
			if(dep != null){
				sb.append("{id:'" + dep.getDepId() + "',text:'" + dep.getDepName() + "',mark:'2',leaf:true}");
			}else{
				// 查询顶级父节点
				List<UlDepartment> listDep = ulDepartmentService.findByParentId(new Long(0));// 最顶层父节点
				for (UlDepartment dep1 : removeDeleted(listDep)) {
					sb.append("{id:'" + dep1.getDepid() + "',text:'" + dep1.getDepname() + "',mark:'2',");
					sb.append(findDepChild(dep1.getDepid()));
				}
				if(!listDep.isEmpty()){
					sb.deleteCharAt(sb.length() - 1);
				}
			}
		}else{
			// 查询顶级父节点
			List<UlDepartment> listDep = ulDepartmentService.findByParentId(new Long(0));// 最顶层父节点
			for (UlDepartment dep : removeDeleted(listDep)) {
				sb.append("{id:'" + dep.getDepid() + "',text:'" + dep.getDepname() + "',mark:'2',");
				sb.append(findDepChild(dep.getDepid()));
			}
			if(!listDep.isEmpty()){
				sb.deleteCharAt(sb.length() - 1);
			}
		}
		if(flag!=null && flag.equals("0")){
			sb.append("]}");
		}
		
		sb.append("]");
		jsonString = sb.toString();
		return SUCCESS;
	}
	
	public String listJobTree(){
		String flag = getRequest().getParameter("flag");
		StringBuffer sb = new StringBuffer();
		if(flag!=null && flag.equals("0")){
			sb.append("[{id:'-2',text:'岗位维度',mark:'3',expanded:true,children:[");
		}else{
			sb.append("[");
		}
		if(flag!=null && flag.equals("1")){
			UlEmployee ulEmp = ContextUtil.getCurrentUser().getUlEmployee();
			String zhiWei = null;
			if(ulEmp!=null){
				zhiWei = ulEmp.getZhiwei();
			}
			if(zhiWei!=null && !zhiWei.equals("")){
				List<Dictionary> dicZw = dictionaryService.getByMapNameAndItemIndex("ZW001", new String[]{zhiWei});
				sb.append("{id:'" + dicZw.get(0).getDicId() + "',text:'" + dicZw.get(0).getItemValue() + "',mark:'3',leaf:true}");
			}else{
				// 查询顶级父节点
				List<Dictionary> listDic_GW = dictionaryService.getZwRoot("ZW001");
				for(Dictionary dic : listDic_GW){
					sb.append("{id:'" + dic.getDicId() + "',text:'" + dic.getItemValue() + "',mark:'3',");
					sb.append(getChildDic(dic.getDicId()));
				}
				if(!listDic_GW.isEmpty()){
					sb.deleteCharAt(sb.length() - 1);
				}
			}
		}else{
			// 查询顶级父节点
			List<Dictionary> listDic_GW = dictionaryService.getZwRoot("ZW001");
			for(Dictionary dic : listDic_GW){
				sb.append("{id:'" + dic.getDicId() + "',text:'" + dic.getItemValue() + "',mark:'3',");
				sb.append(getChildDic(dic.getDicId()));
			}
			if(!listDic_GW.isEmpty()){
				sb.deleteCharAt(sb.length() - 1);
			}
		}
		if(flag!=null && flag.equals("0")){
			sb.append("]}");
		}
		
		sb.append("]");
		jsonString = sb.toString();
		return SUCCESS;
	}
	
	public String getChildDic(Long parentId) {
		StringBuffer buff = new StringBuffer();
		if (null == parentId) {
			buff.append("leaf:true},");
			return buff.toString();
		}

		List<Dictionary> typeList = dictionaryService.getByParentDicId(parentId);
		if (typeList.size() == 0) {
			buff.append("leaf:true},");
			return buff.toString();
		} else {
			buff.append("children:[");
			for (Dictionary dic : typeList) {
				buff.append("{id:'" + dic.getDicId())
						.append("',text:'" + dic.getItemValue()).append("',mark:'3',");
				buff.append(getChildDic(dic.getDicId()));
			}
			buff.deleteCharAt(buff.length() - 1);
			buff.append("]},");
			return buff.toString();
		}
	}

	/**
	 * 寻找子根节点
	 */
	public String findDepChild(Long depId) {
		StringBuffer buff1 = new StringBuffer("");
		List<UlDepartment> list = removeDeleted(ulDepartmentService.findByParentId(depId));
		if (list.size() == 0) {
			buff1.append("leaf:true},");
			return buff1.toString();
		} else {
			buff1.append("children:[");
			for (UlDepartment dep2 : list) {
				buff1.append("{id:'" + dep2.getDepid() + "',text:'"
						+ dep2.getDepname() + "',mark:'2',");
				buff1.append(findDepChild(dep2.getDepid()));
			}
			buff1.deleteCharAt(buff1.length() - 1);
			buff1.append("]},");
			return buff1.toString();
		}
	}

	/**
	 * 将list中的已标记删除的节点去掉
	 * 
	 * @param list
	 * @return
	 */
	public List<UlDepartment> removeDeleted(List<UlDepartment> list) {
		Iterator<UlDepartment> i_list = list.iterator();
		while (i_list.hasNext()) {
			if (i_list.next().getStatus()
					.equals(UlDepartment.FLAG_DELETED.longValue()))
				i_list.remove();
		}
		return list;
	}
	
	/**
	 * 通过维度的ids去查找
	 * @return
	 */
	public String findbyIdStr(){
		String dimenIdStr = getRequest().getParameter("dimenIdStr");
		if(dimenIdStr!=null && !dimenIdStr.equals("")){
			JSONDeserializer<List> jsonDeser = new JSONDeserializer<List>();
			StringBuffer sb = new StringBuffer("[");
			List list = jsonDeser.deserialize(dimenIdStr);
			for(int i=0;i<list.size();i++){
				List arrList = (List)list.get(i);
				String idStr = arrList.get(0).toString();
				Long id = Long.parseLong(idStr);
				if((Integer)arrList.get(1)==1){
					UkKnowDimensionality dimensionality = ukKnowDimensionalityService.get(id);
					if(dimensionality!=null){
						sb.append("['" + dimensionality.getDimensionalityId() + "','" + dimensionality.getClassifyName() + "'],");
					}
				}
				if((Integer)arrList.get(1)==2){
					UlDepartment department = ulDepartmentService.get(id);
					if(department!=null){
						sb.append("['" + department.getDepid() + "','" + department.getDepname() + "'],");
					}
				}
				if((Integer)arrList.get(1)==3){
					Dictionary dictionary = dictionaryService.get(id);
					if(dictionary!=null){
						sb.append("['" + dictionary.getDicId() + "','" + dictionary.getItemValue() + "'],");
					}
				}
			}
			sb.deleteCharAt(sb.length() - 1);
			sb.append("]");
			setJsonString(sb.toString());
		}
		
		return SUCCESS;
	}
	
	/**
	 * 通过节点的点击来查询
	 * @return
	 */
	public String clickNode(){
//		int counts = 0;
		String ids = getRequest().getParameter("dimenId");
		String mark = getRequest().getParameter("mark");
		String isLeaf = getRequest().getParameter("isLeaf");
		String dimeName = getRequest().getParameter("dimeName");
		List<UkKnowDimensionality> dimenList = new ArrayList<UkKnowDimensionality>();
		List<UlDepartment> depList = new ArrayList<UlDepartment>();
		List<Dictionary> dicList = new ArrayList<Dictionary>();
		QueryFilter filter = new QueryFilter(getRequest());
		int count = 0;
		if(mark!=null && !mark.equals("")){
			if(mark.equals("1")){
				if(dimeName!=null && !dimeName.equals("")){
					filter.addFilter("Q_classifyName_S_LK", dimeName);
				}
				filter.addFilter("Q_parentId_L_EQ", ids);
				filter.addFilter("Q_isDelete_L_EQ", "1");
				dimenList = ukKnowDimensionalityService.getAll(filter);
				count = filter.getPagingBean().getTotalItems();
				if(ids!=null && !ids.equals("0") && isLeaf!=null && isLeaf.equals("true")){
					UkKnowDimensionality dimensionality = ukKnowDimensionalityService.get(new Long(ids));
					dimenList.add(dimensionality);
					count++;
				}
//				getChildList(ids,mark,dimenList);
//				counts = dimenList.size();
			}
			if(mark.equals("2")){
				if(ids.equals("-1"))ids = "0";
				if(dimeName!=null && !dimeName.equals("")){
					filter.addFilter("Q_depname_S_LK", dimeName);
				}
				filter.addFilter("Q_parentid_L_EQ", ids);
				filter.addFilter("Q_status_L_EQ", "1");
				depList = ulDepartmentService.getAll(filter);
				count = filter.getPagingBean().getTotalItems();
				if(ids!=null && !ids.equals("0") && isLeaf!=null && isLeaf.equals("true")){
					UlDepartment department = ulDepartmentService.get(new Long(ids));
					depList.add(department);
					count++;
				}
//				getChildList(ids,mark,depList);
//				counts = depList.size();
			}
			if(mark.equals("3")){
				if(ids.equals("-2"))ids = null;
				if(dimeName!=null && !dimeName.equals("")){
					filter.addFilter("Q_itemValue_S_LK", dimeName);
				}
				filter.addFilter("Q_mapName_S_EQ", "ZW001");
				filter.addFilter("Q_statusId_SN_EQ", "1");
				filter.addFilter("Q_relDic_L_EQ", ids);
				dicList = dictionaryService.getAll(filter);
				count = filter.getPagingBean().getTotalItems();
				if(ids!=null && !ids.equals("0") && isLeaf!=null && isLeaf.equals("true")){
					Dictionary dictionary = dictionaryService.get(new Long(ids));
					dicList.add(dictionary);
					count++;
				}
//				getChildList(ids,mark,dicList);
//				counts = dicList.size();
			}
		}
		
		Map<String, String> data_map = new HashMap<String, String>();
		
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(count).append(",result:[");
		JSONSerializer serializer = new JSONSerializer();
		serializer.transform(new DateTransformer("yyyy-MM-dd HH:mm:ss"),new String[] { "createDate", "updateDate"});
		serializer.include("createBy.fullname","updateBy.fullname").exclude("class","createBy.*","updateBy.*");
		if(dimenList!=null && dimenList.size()>0){
			int i = 0;
			for(UkKnowDimensionality dimen : dimenList){
				if(i++>0)buff.append(",");
				data_map.put("dimensionalityId", dimen.getDimensionalityId().toString());
				data_map.put("dimeName", dimen.getClassifyName());
				data_map.put("mark", mark);
				buff.append(serializer.serialize(data_map));
			}
		}
		if(depList!=null && depList.size()>0){
			int i = 0;
			for(UlDepartment dep : depList){
				if(i++>0)buff.append(",");
				data_map.put("dimensionalityId", dep.getDepid().toString());
				data_map.put("dimeName", dep.getDepname());
				data_map.put("mark", mark);
				buff.append(serializer.serialize(data_map));
			}
		}
		if(dicList!=null && dicList.size()>0){
			int i = 0;
			for(Dictionary dic : dicList){
				if(i++>0)buff.append(",");
				data_map.put("dimensionalityId", dic.getDicId().toString());
				data_map.put("dimeName", dic.getItemValue());
				data_map.put("mark", mark);
				buff.append(serializer.serialize(data_map));
			}
		}
		buff.append("]}");
		jsonString = buff.toString();

		return SUCCESS;
	}
	
	public void getChildList(String id,String mark,List obj){
		if(mark.equals("1")){
			List<UkKnowDimensionality> listDimen = ukKnowDimensionalityService.findByParent(new Long(id));
			if(listDimen.size() == 0){
				return;
			} else {
				for(UkKnowDimensionality dimen : listDimen){
					obj.add(dimen);
					getChildList(dimen.getDimensionalityId().toString(),mark,obj);
				}
			}
		}
		if(mark.equals("2")){
			if(id.equals("-1")){
				id = "0";
			}
			List<UlDepartment> listdep = ulDepartmentService.findByParentId(new Long(id));
			if(listdep.size() == 0){
				return;
			} else {
				for(UlDepartment dep : listdep){
					obj.add(dep);
					getChildList(dep.getDepid().toString(),mark,obj);
				}
			}
		}
		if(mark.equals("3")){
			if(!id.equals("-2")){
				List<Dictionary> listDic = dictionaryService.getByParentDicId(new Long(id));
				if(listDic.size() == 0){
					return;
				} else {
					for(Dictionary dic : listDic){
						obj.add(dic);
						getChildList(dic.getDicId().toString(),mark,obj);
					}
				}
			}else{
				List<Dictionary> listDic = dictionaryService.getZwRoot("ZW001");
				if(listDic.size() == 0){
					return;
				} else {
					for(Dictionary dic : listDic){
						obj.add(dic);
						getChildList(dic.getDicId().toString(),mark,obj);
					}
				}
			}
		}
		
	}
	
	/**
	 * 根据权限寻找维度树
	 * @return
	 */
	public String listDimenByRole(){
		StringBuffer sb = new StringBuffer();
		// 查询顶级父节点
		List<UkKnowDimensionality> list = ukKnowDimensionalityService.findDimenRole(new Long(0));
		sb.append("[");
		for (UkKnowDimensionality ukKnowDimen : list) {
			sb.append("{id:'" + ukKnowDimen.getDimensionalityId() + "',text:'" + ukKnowDimen.getClassifyName()
					+ "',mark:'1',");
			sb.append(findChildrenByRole(ukKnowDimen.getDimensionalityId()));
		}
		if (!list.isEmpty()) {
			sb.deleteCharAt(sb.length() - 1);
		}
		sb.append("]");
		jsonString = sb.toString();
		
		return SUCCESS;
	}
	
	/**
	 * 根据权限寻找子根节点
	 */
	public String findChildrenByRole(Long parentId) {
		StringBuffer buff1 = new StringBuffer("");
		List<UkKnowDimensionality> list = ukKnowDimensionalityService.findDimenRole(parentId);
		if (list.isEmpty() || list.size() == 0) {
			buff1.append("leaf:true},");
			return buff1.toString();
		} else {
			buff1.append("children:[");
			for (UkKnowDimensionality ukKnowDimen : list) {
				buff1.append("{id:'" + ukKnowDimen.getDimensionalityId() + "',text:'"
						+ ukKnowDimen.getClassifyName() + "',mark:'1',");
				buff1.append(findChildrenByRole(ukKnowDimen.getDimensionalityId()));
			}
			buff1.deleteCharAt(buff1.length() - 1);
			buff1.append("]},");
			return buff1.toString();
		}
	}
}
