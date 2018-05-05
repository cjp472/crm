package com.ulane.know.action.know;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
 */
import java.sql.Timestamp;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;

import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.oa.model.system.AppRole;
import com.htsoft.oa.service.system.AppRoleService;

import com.ulane.know.model.know.UkKnowTemplate;
import com.ulane.know.model.know.UkKnowType;
import com.ulane.know.service.know.UkKnowTemplateService;
import com.ulane.know.service.know.UkKnowTypeService;

import flexjson.JSONSerializer;
import flexjson.transformer.DateTransformer;

/**
 * 
 * @author cf0666@gmail.com
 * 
 */
public class UkKnowTypeAction extends BaseAction {
	@Resource
	private UkKnowTypeService ukKnowTypeService;
	@Resource
	private UkKnowTemplateService ukKnowTemplateService;
	@Resource
	private AppRoleService appRoleService;
	private UkKnowType ukKnowType;

	private Long knowTypeId;

	public Long getKnowTypeId() {
		return knowTypeId;
	}

	public void setKnowTypeId(Long knowTypeId) {
		this.knowTypeId = knowTypeId;
	}

	public UkKnowType getUkKnowType() {
		return ukKnowType;
	}

	public void setUkKnowType(UkKnowType ukKnowType) {
		this.ukKnowType = ukKnowType;
	}

	/**
	 * 显示树形列表，实际上是tree()
	 */
	public String list() {
		String opt = getRequest().getParameter("opt");
		StringBuffer buff = new StringBuffer();
		if (StringUtils.isNotEmpty(opt)) {
			buff.append("[");
		} else {
			buff.append("[{id:'" + 0 + "',text:'" + "知识类别"
					+ "',expanded:true,checked:'none',children:[");
		}
		List<UkKnowType> listParent = ukKnowTypeService
				.findByParentId(new Long(0));// 最顶层父节点
		for (UkKnowType ktp : listParent) {
			buff.append("{id:'" + ktp.getKnowTypeId() + "',text:'"
					+ ktp.getName() + "',");
			buff.append(listChild(ktp.getKnowTypeId()));
		}
		if (!listParent.isEmpty()) {
			buff.deleteCharAt(buff.length() - 1);
		}
		if (StringUtils.isNotEmpty(opt)) {
			buff.append("]");
		} else {
			buff.append("]}]");
		}
		setJsonString(buff.toString());
		return SUCCESS;

		// QueryFilter filter=new QueryFilter(getRequest());
		// List<UkKnowType> list= ukKnowTypeService.getAll(filter);
		//		
		// Type type=new TypeToken<List<UkKnowType>>(){}.getType();
		// StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		// .append(filter.getPagingBean().getTotalItems()).append(",result:");
		// JSONSerializer serializer = new JSONSerializer();
		// serializer.transform(new DateTransformer("yyyy-MM-dd"),
		// new String[] { "appUser.accessionTime" });
		// buff.append(serializer.serialize(list));
		//
		// buff.append("}");
		// jsonString = buff.toString();
		//		
		// return SUCCESS;
	}

	
	protected String listChild(Long id) {
		StringBuffer childSB = new StringBuffer("");
		List<UkKnowType> childs = ukKnowTypeService.findByParentId(id);
		if (childs.size() == 0) {
			childSB.append("checked:'none',leaf:true},");
			return childSB.toString();
		}
		childSB.append("checked:'none',children:[");
		for (UkKnowType ukt : childs) {
			childSB.append("{id:'" + ukt.getKnowTypeId() + "' ,text:'"
					+ ukt.getName() + "',");
			childSB.append(CollectListChildForRole(ukt.getKnowTypeId()));
		}
		childSB.deleteCharAt(childSB.length() - 1);
		childSB.append("]},");
		return childSB.toString();
	}
	
	/**
	 * 采集下拉框tree(只查找拥有采集权限的)
	 */
	public String CollectListForRole() {
		String opt = getRequest().getParameter("opt");
		StringBuffer buff = new StringBuffer();
		if (StringUtils.isNotEmpty(opt)) {
			buff.append("[");
		} else {
			buff.append("[{id:'" + 0 + "',text:'" + "知识类别"
					+ "',expanded:true,checked:'none',children:[");
		}
		List<UkKnowType> listParent = ukKnowTypeService
				.collectFindByParentIdForRole(new Long(0));// 最顶层父节点
		for (UkKnowType ktp : listParent) {
			buff.append("{id:'" + ktp.getKnowTypeId() + "',text:'"
					+ ktp.getName() + "',");
			buff.append(CollectListChildForRole(ktp.getKnowTypeId()));
		}
		if (!listParent.isEmpty()) {
			buff.deleteCharAt(buff.length() - 1);
		}
		if (StringUtils.isNotEmpty(opt)) {
			buff.append("]");
		} else {
			buff.append("]}]");
		}
		setJsonString(buff.toString());
		return SUCCESS;
	}
	
	protected String CollectListChildForRole(Long id) {
		StringBuffer childSB = new StringBuffer("");
		List<UkKnowType> childs = ukKnowTypeService.collectFindByParentIdForRole(id);
		if (childs.size() == 0) {
			childSB.append("checked:'none',leaf:true},");
			return childSB.toString();
		}
		childSB.append("checked:'none',children:[");
		for (UkKnowType ukt : childs) {
			childSB.append("{id:'" + ukt.getKnowTypeId() + "' ,text:'"
					+ ukt.getName() + "',");
			childSB.append(listChild(ukt.getKnowTypeId()));
		}
		childSB.deleteCharAt(childSB.length() - 1);
		childSB.append("]},");
		return childSB.toString();
	}
	
	
	
	/**
	 * 显示树形列表，实际上是tree()
	 */
	public String listForRole() {
		String opt = getRequest().getParameter("opt");
		StringBuffer buff = new StringBuffer();
		List<UkKnowType> listParent = ukKnowTypeService.findByParentIdForRole(new Long(0));// 最顶层父节点
		
//		if (StringUtils.isNotEmpty(opt)) {
//			buff.append("[");
//		} else {
//			buff.append("[{id:'" + 0 + "',text:'" + "知识类别" + "',expanded:true,checked:'none',children:[");
//		}
		if(listParent.size()>0){
			buff.append("[{id:'" + 0 + "',text:'" + "知识类别" + "',expanded:true,checked:'none',children:[");
		}else{
			buff.append("[{id:'" + -1 + "',text:'" + "无查看分类权限" + "',expanded:true,checked:'none',children:[");
		}
		
		for (UkKnowType ktp : listParent) {
			buff.append("{id:'" + ktp.getKnowTypeId() + "',text:'"+ ktp.getName() + "',");
			buff.append(listChildForRole(ktp.getKnowTypeId()));
		}
		if (!listParent.isEmpty()) {
			buff.deleteCharAt(buff.length() - 1);
		}
		if (StringUtils.isNotEmpty(opt)) {
			buff.append("]");
		} else {
			buff.append("]}]");
		}
		setJsonString(buff.toString());
		return SUCCESS;
	}

	protected String listChildForRole(Long id) {
		StringBuffer childSB = new StringBuffer("");
		List<UkKnowType> childs = ukKnowTypeService.findByParentIdForRole(id);
		if (childs.size() == 0) {
			childSB.append("checked:'none',leaf:true},");
			return childSB.toString();
		}
		childSB.append("checked:'none',children:[");
		for (UkKnowType ukt : childs) {
			childSB.append("{id:'" + ukt.getKnowTypeId() + "' ,text:'"+ ukt.getName() + "',");
			childSB.append(listChildForRole(ukt.getKnowTypeId()));
		}
		childSB.deleteCharAt(childSB.length() - 1);
		childSB.append("]},");
		return childSB.toString();
	}


	/**
	 * 获得所有分类 ，相当于list()
	 * 
	 * @return
	 */
	List<UkKnowType> tmpchild = new ArrayList<UkKnowType>();
	public String list_child_detail() {
		QueryFilter filter = new QueryFilter(getRequest());
		String knowtypeid = getRequest().getParameter("knowTypeId");
//		String path = "0.";
		String parentId = "0";
		if (StringUtils.isNotEmpty(knowtypeid)) {
//			UkKnowType ukt = ukKnowTypeService.get(Long.parseLong(knowtypeid));
//			path = ukt.getPath();
			parentId = knowtypeid;
			
		}
//		filter.addFilter("Q_path_L_LK", path);
		filter.addFilter("Q_parentId_L_EQ", parentId);
		
		List<UkKnowType> childList = ukKnowTypeService.getAll(filter);
		
		for (UkKnowType ukt : childList) {
//			UkKnowTemplate tmp = ukt.getUkKnowTemplate();
//			if (tmp != null) {
//				ukt.setKnowTmpId(tmp.getKnowTmpId());
//			}
			//加入ukt的孩子至childList
			getChild(ukt.getKnowTypeId());

		}
		childList.addAll(tmpchild);//采用递归查询孩子方法，没使用filter一次取出数据，导致sort失效！！！只能修改生成树策略为path而不是parentId
		
		tmpchild.clear();
		//加入当前节点本身
		if(!parentId.equals("0")){
			childList.add(ukKnowTypeService.get(Long.parseLong(parentId)));
		}
		
		//对合并后的list调用自定义排序。
		List<Object> oList = new ArrayList<Object>();
		if(childList.size() >0){
			for(UkKnowType ukKnowType :childList){
				if(ukKnowType.getParentId()!=null && ukKnowType.getParentId()!=0){
					UkKnowType ukKnowTypePatent = ukKnowTypeService.get(ukKnowType.getParentId());
					ukKnowType.setParentName(ukKnowTypePatent.getName());
				}
			}
			String sort = getRequest().getParameter("sort");
			String  dir = getRequest().getParameter("dir");
			knowTypeComparator kc = new knowTypeComparator();
			oList.addAll(childList);
//			System.out.println(oList.get(0).getClass().getName());
			oList = kc.listSort(dir, sort, oList, kc);
		}
		

		StringBuffer childlistSB = new StringBuffer(
				"{success:true,'totalCounts':").append(childList.size()).append(",result:");

		JSONSerializer jsonserializer = new JSONSerializer();
		jsonserializer.transform(new DateTransformer("yyyy-MM-dd"),
				new String[] { "updateTime", "updateDate", "createDate" });
		childlistSB.append(jsonserializer.serialize(oList));
		childlistSB.append("}");
		jsonString = childlistSB.toString();
		return SUCCESS;
	}
	/**
	 * 自定义通用list排序，解决合并list后排序问题。
	 * @author lq
	 *
	 */
	class knowTypeComparator  implements java.util.Comparator<Object>{
		public String sort;
		public String dir;
		public String beanname;

		public List<Object> listSort(String dir,String sort,List<Object> list, knowTypeComparator cpt){
			cpt.dir = dir;
			cpt.sort = sort;
			cpt.beanname = list.get(0).getClass().getName();
			try{
				if(sort != null)
					java.util.Collections.sort(list,cpt);
				return list;
			} catch ( Exception e){
				return list;
			}
		}
		@SuppressWarnings("unchecked")
		@Override
		public int compare(Object arg0, Object arg1) {
			
			try {
				String sortMethod = "get"
						+ sort.substring(0,1).toUpperCase()
						+ sort.substring(1);
				Class clazz = Class.forName(beanname);
				java.lang.reflect.Method m1 = clazz.getMethod(sortMethod, null);
				Object ob0 = m1.invoke(arg0, null);
				Object ob1 = m1.invoke(arg1, null);
				String TypeStr = m1.getReturnType().toString();
				int beg = m1.getReturnType().toString().lastIndexOf(".");
				TypeStr = TypeStr.substring(beg + 1, TypeStr.length());
//				System.out.println(ob0 + " || " + m1.getReturnType());
				
				if("ASC".equals(dir)){
					if(ob0 == null || ob1 ==null){
						return (ob0 == null && ob1 == null) ? 0 : (ob0 == null ? -1 : 1);//保持null在前，同时避免两个null时的数据稳定性
					} else {
						if("String".equals(TypeStr)){
							return ((String)ob0).compareTo((String)ob1);
						} else if("Long".equals(TypeStr)){
							return ((Long)ob0).compareTo((Long)ob1);
						} else if("Timestamp".equals(TypeStr)){
							return ((Timestamp)ob0).compareTo((Timestamp)ob1);
						} else if("Integer".equals(TypeStr)){
							return ((Integer)ob0).compareTo((Integer)ob1);
						} else {
							return 0;//待扩展属性类型，不排序。扩展策略：如果属性是关联对象AA，获取AA的主见比较；或者封装为list再次调用listSort。
						}
					}
				} else {
					if(ob0 == null || ob1 ==null){
						return (ob0 == null && ob1 == null) ? 0 : (ob0 == null ? 1 : -1);//保持null在前，同时避免两个null时的数据稳定性
					} else {
						if("String".equals(TypeStr)){
							return ((String)ob1).compareTo((String)ob0);
						} else if("Long".equals(TypeStr)){
							return ((Long)ob1).compareTo((Long)ob0);
						} else if("Timestamp".equals(TypeStr)){
							return ((Timestamp)ob1).compareTo((Timestamp)ob0);
						} else if("Integer".equals(TypeStr)){
							return ((Integer)ob1).compareTo((Integer)ob0);
						} else {
							return 0;//待扩展属性类型，不排序
						}
					}
				}
			} catch (Exception e) {
				e.printStackTrace();
				if (logger.isDebugEnabled()) {
					logger.debug("getXXXX", e);
				}
				return 0;
			}
		}
		
	}
	public void getChild(Long knowtypeid){
		QueryFilter filter = new QueryFilter(getRequest());
		filter.addFilter("Q_parentId_L_EQ", String.valueOf(knowtypeid));
		List<UkKnowType> childList = ukKnowTypeService.getAll(filter);
		tmpchild.addAll(childList);
		for(UkKnowType ukt : childList){
			getChild(ukt.getKnowTypeId());
		}
	}
	/**
	 * 批量停用
	 * 
	 * @return
	 */
	public String multiDel() {

		String[] ids = getRequest().getParameterValues("ids");
		if (ids != null) {
			for (String id : ids) {
				remove2(Long.parseLong(id), "2");
				// ukKnowTypeService.remove(new Long(id));
			}
		}

		jsonString = "{success:true}";

		return SUCCESS;
	}
	/**
	 * 批量启用
	 * 
	 * @return
	 */
	public String multiStart() {

		String[] ids = getRequest().getParameterValues("ids");
		if (ids != null) {
			for (String id : ids) {
//				remove2(Long.parseLong(id), "2");
//				ukKnowTypeService.remove(new Long(id));
				
				UkKnowType curUKT = ukKnowTypeService.get(Long.parseLong(id));
				curUKT.setKnowTypeStatus(1);
				ukKnowTypeService.save(curUKT);
			}
		}

		jsonString = "{success:true}";

		return SUCCESS;
	}
	/**
	 * 显示详细信息
	 * 
	 * @return
	 */
	public String get() {
		UkKnowType ukKnowType = ukKnowTypeService.get(knowTypeId);
		UkKnowTemplate tmp = ukKnowType.getUkKnowTemplate();
		if (tmp != null){
			ukKnowType.setKnowTmpId(tmp.getKnowTmpId());
		}
		if(ukKnowType.getParentId()!=null && ukKnowType.getParentId() != 0){
			UkKnowType ukKnowTypePatent = ukKnowTypeService.get(ukKnowType.getParentId());
			ukKnowType.setParentName(ukKnowTypePatent.getName());
		}else if(ukKnowType.getParentId() == 0){
			ukKnowType.setParentName("知识类别");
		}
		// 将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");

		JSONSerializer jsonserializer = new JSONSerializer();
		jsonserializer.transform(new DateTransformer("yyyy-MM-dd"),
				new String[] { "updateTime", "updateDate", "createDate" });
		sb.append(jsonserializer.serialize(ukKnowType));
		sb.append("}");
		jsonString = sb.toString();

		return SUCCESS;
	}

	/**
	 * 显示详情
	 */
	public String detail() {
		Long knowTypeId = Long.parseLong(getRequest()
				.getParameter("knowTypeId"));
		UkKnowType ukKnowType = ukKnowTypeService.get(knowTypeId);
		UkKnowTemplate tmp = ukKnowType.getUkKnowTemplate();
		if (tmp != null)
			ukKnowType.setKnowTmpId(tmp.getKnowTmpId());
		JSONSerializer ser = new JSONSerializer(); // JsonUtil.getJSONSerializer();
		ser.transform(new DateTransformer("yyyy-MM-dd"), new String[] {
				"updateTime", "updateDate", "createDate" });
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(ser.serialize(ukKnowType));
		sb.append("}");
		setJsonString(sb.toString());

		return SUCCESS;
	}

	/**
	 * 添加及保存操作
	 */
	public String save() {
		String path = "";
		String curDate = getRequest().getParameter("curDate");
		String temId = getRequest().getParameter("ukKnowType.knowTmpId");		//模版ID
		java.text.DateFormat df = new java.text.SimpleDateFormat("yyyy-MM-dd");
		try {
			UkKnowTemplate uktt = null;
			java.util.Date cureDate = df.parse(curDate);
			Long curUser = ContextUtil.getCurrentUser().getUserId();
			if (ukKnowType.getKnowTmpId() != null) {
				uktt = ukKnowTemplateService.get(ukKnowType.getKnowTmpId());
				ukKnowType.setUkKnowTemplate(null);
			} else {
			}
			Long parentId = ukKnowType.getParentId();
			if (parentId < 1) {
				path = "0";
			} else {
				path = ukKnowTypeService.get(parentId).getPath();
			}
			if(temId!= null && temId != ""){
				UkKnowTemplate ukKnowTemplate = ukKnowTemplateService.get(new Long(temId));
				ukKnowType.setUkKnowTemplate(ukKnowTemplate);
			}
			
			Set<AppRole> roles = new HashSet<AppRole>();
			String rolesIds = getRequest().getParameter("ukKnowTypeRoles");
			if (rolesIds != null) {
				String[] ids = rolesIds.split(",");
				for (String id : ids) {
					if (!"".equals(id)) {
						AppRole role = appRoleService.get(new Long(id));
						ukKnowType.getUkKnowTypeRoles().add(role);
					}
				}
			}
			
			if (ukKnowType.getKnowTypeId() == null) {
				ukKnowType.setKnowTypeStatus(0);// 新增未启用
//				ukKnowTypeService.save(ukKnowType);
				ukKnowType.setCreateBy(curUser);
				ukKnowType.setCreateDate(new Timestamp(cureDate.getTime()));
				ukKnowTypeService.save(ukKnowType);
				ukKnowType.setPath(path + "." + ukKnowType.getKnowTypeId());
				ukKnowTypeService.save(ukKnowType);
			} else {
				ukKnowType.setUpdateBy(curUser);
				ukKnowType.setUpdateDate(new Timestamp(cureDate.getTime()));
				ukKnowType.setPath(path + "." + ukKnowType.getKnowTypeId());
				UkKnowType orgUkKnowType = ukKnowTypeService.get(ukKnowType.getKnowTypeId());
				if (orgUkKnowType.getKnowTmpId() != null)
				{
					orgUkKnowType.setUkKnowTemplate(null);
				}
				try {
					BeanUtil.copyNotNullProperties(orgUkKnowType, ukKnowType);
					orgUkKnowType.setUkKnowTemplate(uktt);
					ukKnowTypeService.save(orgUkKnowType);
				} catch (Exception ex) {
					logger.error(ex.getMessage());
				}
			}
			setJsonString("{success:true}");
			return SUCCESS;
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}

	}

	public String remove() {
//		Long knowTypeId = Long.parseLong(getRequest().getParameter("knowTypeId"));
		String knowTypeId =	getRequest().getParameter("knowTypeId");
		String[] ids = knowTypeId.split(",");
		String opts = getRequest().getParameter("opts");
		for(String id : ids){
			if(id!=null&&!"".equals(id))
			remove2(new Long(id), opts);	
		}
		setJsonString("{success:true}");
		return SUCCESS;
	}

	public void remove2(long knowTypeId, String opts) {
		UkKnowType curUKT = ukKnowTypeService.get(knowTypeId);
		if("2".equals(opts)){//opts : 2--tingyong; 1--qiyong
			curUKT.setKnowTypeStatus(2);
		} else if("1".equals(opts)){
			curUKT.setKnowTypeStatus(1);
		}
		ukKnowTypeService.save(curUKT);
	}

	/**
	 * 知识分类的下拉列表框
	 * 
	 * @return
	 */
	public String combo() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<UkKnowType> list = ukKnowTypeService.getAll(filter);
		StringBuffer sb = new StringBuffer("[");
		int i = 0;
		for (UkKnowType type : list) {
			if (i++ > 0)
				sb.append(",");
			sb.append("['").append(type.getKnowTypeId()).append("','").append(
					type.getName()).append("']");
		}
		sb.append("]");
		setJsonString(sb.toString());
		logger.info("sb:" + sb.toString());
		return SUCCESS;
	}
	public String movenode(){
		String actionMode = getRequest().getParameter("actionMode");
		
		//选择的知识分类id
		String newknowTypeId = getRequest().getParameter("newknowTypeId");
		String ids[] = newknowTypeId.split(",");
		for(String id : ids){
			moveOneNode(id, actionMode);
		}
		return SUCCESS;
	}
	public String moveOneNode(String newknowTypeId, String actionMode){
		UkKnowType ukt = ukKnowTypeService.get(Long.parseLong(newknowTypeId));
		String parentId = getRequest().getParameter("folderId");
		UkKnowType Pukt = ukKnowTypeService.get(Long.parseLong(parentId));
		if("0".equals(actionMode)){//0 : move ; 1 : copy
			
			ukt.setPath(Pukt.getPath() + "." + ukt.getKnowTypeId());
			ukt.setParentId(Pukt.getKnowTypeId());
			//递归修改ukt孩子的path。但是list（）计算树是按照parentId进行，所以path被舍弃，不用修改。
			ukKnowTypeService.save(ukt);
		} else if("1".equals(actionMode)){
			UkKnowType tmpUKT = new UkKnowType();
			ukKnowTypeService.save(tmpUKT);
			Long tmpId = tmpUKT.getKnowTypeId();
			try {
				BeanUtil.copyNotNullProperties(tmpUKT, ukt);
			} catch (Exception ex) {
				logger.error(ex.getMessage());
			}
			tmpUKT.setKnowTypeId(tmpId);
			tmpUKT.setParentId(Pukt.getKnowTypeId());
			tmpUKT.setPath(Pukt.getPath() + "." + tmpId);
			/**
			 * 清空新增的ukKnowType对象从原对象copy过来的和其他对象的关联关系。
			 */
			tmpUKT.setGrantAccess(Pukt.getGrantAccess());
			tmpUKT.setAccessPurview(Pukt.getAccessPurview());
			tmpUKT.setUkKnowDingyues(null);
			tmpUKT.setUkKnowKeywords(null);
			tmpUKT.setUkKnowTemplate(null);
			tmpUKT.setUkSysKnows(null);
			
			Set<AppRole> puktRoles =  Pukt.getUkKnowTypeRoles();
			tmpUKT.setUkKnowTypeRoles(null);
//			tmpUKT.getUkKnowTypeRoles().clear();
			Set<AppRole> newTypeRoles = new HashSet<AppRole>();
			for(AppRole role  : puktRoles){
				AppRole trole = new AppRole();
				trole = appRoleService.get(role.getRoleId());
				newTypeRoles.add(trole);
			}
			tmpUKT.setUkKnowTypeRoles(newTypeRoles);
//			ukKnowType.setVersion(new Integer(0));
//			System.out.print(tmpId);
			tmpUKT = ukKnowTypeService.save(tmpUKT);
		} else {
			return null;
		}
		
		return SUCCESS;
	}

	
	
	/**
	 * 查询已有角色
	 */
	public String selectedRoles() {
		if (knowTypeId != null) {
			setUkKnowType(ukKnowTypeService.get(knowTypeId));
			Set<AppRole> roles = ukKnowType.getUkKnowTypeRoles();
			StringBuffer sb = new StringBuffer("[");
			for (AppRole role : roles) {
				sb.append("['" + role.getRoleId() + "','" + role.getRoleName()
						+ "'],");
			}
			sb.deleteCharAt(sb.length() - 1);
			sb.append("]");
			setJsonString(sb.toString());
		}
		return SUCCESS;
	}
	
	/**
	 * 查询可选角色
	 * 
	 * @return
	 */
	public String chooseRoles() {
		List<AppRole> chooseRoles = appRoleService.getAll();
		if (knowTypeId != null) {
			setUkKnowType(ukKnowTypeService.get(knowTypeId));
			Set<AppRole> selectedRoles = ukKnowType.getUkKnowTypeRoles();
			for (AppRole role : selectedRoles) {
				chooseRoles.remove(role);
			}
		}
		StringBuffer sb = new StringBuffer("[");
		for (AppRole role : chooseRoles) {
			if (role.getStatus() != 0) {
				sb.append("['" + role.getRoleId() + "','" + role.getRoleName()
						+ "'],");
			}
		}
		sb.deleteCharAt(sb.length() - 1);
		sb.append("]");
		setJsonString(sb.toString());
		return SUCCESS;
	}
	
	public String treeList(){
		String knowtypeid = getRequest().getParameter("knowTypeId");
		String start = getRequest().getParameter("start");						
		String limit = getRequest().getParameter("limit");
		String parentId = "0";
		if (StringUtils.isNotEmpty(knowtypeid)) {
			parentId = knowtypeid;
		}
		List<UkKnowType> childList = ukKnowTypeService.findByParentIdForSql(new Integer(start), new Integer(limit), parentId);
		StringBuffer childlistSB = new StringBuffer("{success:true,'totalCounts':").append(ukKnowTypeService.findByParentIdForSqlCount(new Integer(start), new Integer(limit), parentId)).append(",result:");

		JSONSerializer jsonserializer = new JSONSerializer();
		jsonserializer.transform(new DateTransformer("yyyy-MM-dd"),
				new String[] { "updateTime", "updateDate", "createDate" });
		childlistSB.append(jsonserializer.serialize(childList));
		childlistSB.append("}");
		jsonString = childlistSB.toString();
		return SUCCESS;
	}
}
