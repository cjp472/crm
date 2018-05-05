package com.ulane.customer.action.fee;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;

import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.service.system.AppUserService;
import com.htsoft.oa.service.system.DepartmentService;
import com.ulane.base.model.xitong.UlDepartment;
import com.ulane.base.model.xitong.UlEmployee;
import com.ulane.base.service.xitong.UlEmployeeService;
import com.ulane.customer.model.fee.ObFeeIndex;
import com.ulane.customer.model.fee.ObFeeIndexLevel;
import com.ulane.customer.model.fee.ObFeeIndexProject;
import com.ulane.customer.service.fee.ObFeeIndexLevelService;
import com.ulane.customer.service.fee.ObFeeIndexProjectService;
import com.ulane.customer.service.fee.ObFeeIndexService;

import flexjson.JSONSerializer;
import flexjson.transformer.DateTransformer;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class ObFeeIndexAction extends BaseAction{
	@Resource
	private ObFeeIndexService obFeeIndexService;
	@Resource
	private AppUserService appUserService;
	@Resource
	private DepartmentService departmentService;
	@Resource
	private ObFeeIndexProjectService obFeeIndexProjectService;
	@Resource
	private ObFeeIndexLevelService obFeeIndexLevelService;
	@Resource
	private UlEmployeeService ulEmployeeService;
	
	private ObFeeIndex obFeeIndex;
	
	private Long feeIndexId;

	public Long getFeeIndexId() {
		return feeIndexId;
	}

	public void setFeeIndexId(Long feeIndexId) {
		this.feeIndexId = feeIndexId;
	}

	public ObFeeIndex getObFeeIndex() {
		return obFeeIndex;
	}

	public void setObFeeIndex(ObFeeIndex obFeeIndex) {
		this.obFeeIndex = obFeeIndex;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		String userno = getRequest().getParameter("gonghao_id");
		String Q_annual_S_EQ = getRequest().getParameter("Q_annual_S_EQ");
//		try{
		if(userno!=null && !("").equals(userno) && Q_annual_S_EQ==null || ("").equals(Q_annual_S_EQ)){
			List<ObFeeIndex> listuno=new ArrayList();
			QueryFilter filterByNo=new QueryFilter(getRequest());
			filterByNo.addSorted("createDate", "desc");
			List<ObFeeIndex> list= obFeeIndexService.getAll(filterByNo);
			filterByNo.clearFilter();
			for(ObFeeIndex obindex:list){
				if(obindex.getCreateBy()!=null && !obindex.getCreateBy().equals("0") || obindex.getCreateBy()!=0){
					AppUser users=appUserService.get(new Long(obindex.getCreateBy()));
					UlEmployee ulEmployee = ulEmployeeService.getEmployeeByUserNo(users.getEmployeeid());
					if(ulEmployee!=null) {
						obindex.setUseNam(ulEmployee.getFullname());
						obindex.setDepNam(ulEmployee.getUlDepartment().getDepname());
					}
					for(UlEmployee ulEmployeeNo :obindex.getUlEmployees()){
						if(ulEmployeeNo.getUserNo()==userno || (userno).equals(ulEmployeeNo.getUserNo())){
							listuno.add(obindex);
						}
					}
				}
			}
			StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filterByNo.getPagingBean().getTotalItems()).append(",result:");

			JSONSerializer serializer = new JSONSerializer();
			serializer.transform(new DateTransformer("yyyy-MM-dd"),new String[] { "createDate","updateDate"});
			buff.append(serializer.exclude(new String[]{"class"}).serialize(listuno));
			
			buff.append("}");
			
			jsonString=buff.toString();

		}
		if(Q_annual_S_EQ!=null && !("").equals(Q_annual_S_EQ)  && userno==null || ("").equals(userno)){
			QueryFilter filter=new QueryFilter(getRequest());
			filter.addSorted("createDate", "desc");
			List<ObFeeIndex> list= obFeeIndexService.getAll(filter);
			filter.clearFilter();
			for(ObFeeIndex obindex:list){
				if(obindex.getCreateBy()!=null && !obindex.getCreateBy().equals("0") || obindex.getCreateBy()!=0){
					AppUser users=appUserService.get(new Long(obindex.getCreateBy()));
					UlEmployee ulEmployee = ulEmployeeService.getEmployeeByUserNo(users.getEmployeeid());
					if(ulEmployee!=null) {
						obindex.setUseNam(ulEmployee.getFullname());
						obindex.setDepNam(ulEmployee.getUlDepartment().getDepname());
					}
				}
			}
			StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");

			JSONSerializer serializer = new JSONSerializer();
			serializer.transform(new DateTransformer("yyyy-MM-dd"),new String[] { "createDate","updateDate"});
			buff.append(serializer.exclude(new String[]{"class"}).serialize(list));
			
			buff.append("}");
			
			jsonString=buff.toString();

		}
		//统一指标同一个工号
		if(Q_annual_S_EQ!=null && !("").equals(Q_annual_S_EQ) && userno!=null && !("").equals(userno)){
			QueryFilter filterNamNo=new QueryFilter(getRequest());
			filterNamNo.addSorted("createDate", "desc");
			List<ObFeeIndex> list= obFeeIndexService.getAll(filterNamNo);
			filterNamNo.clearFilter();
			List<ObFeeIndex> listshiji=new ArrayList();;
			for(ObFeeIndex obindex:list){
				if(obindex.getCreateBy()!=null && !obindex.getCreateBy().equals("0") || obindex.getCreateBy()!=0){
					AppUser users=appUserService.get(new Long(obindex.getCreateBy()));
					UlEmployee ulEmployee = ulEmployeeService.getEmployeeByUserNo(users.getEmployeeid());
					obindex.setUseNam(ulEmployee.getFullname());
					obindex.setDepNam(ulEmployee.getUlDepartment().getDepname());
					for(UlEmployee ulEmployeeNo :obindex.getUlEmployees()){
						System.out.println(ulEmployeeNo.getUserNo()+"=="+userno);
						if(ulEmployeeNo.getUserNo()==userno || (userno).equals(ulEmployeeNo.getUserNo())){
							listshiji.add(obindex);
						}
					}
				}
			}
			StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filterNamNo.getPagingBean().getTotalItems()).append(",result:");

			JSONSerializer serializer = new JSONSerializer();
			serializer.transform(new DateTransformer("yyyy-MM-dd"),new String[] { "createDate","updateDate"});
			buff.append(serializer.exclude(new String[]{"class"}).serialize(listshiji));
			
			buff.append("}");
			
			jsonString=buff.toString();
		}
//		}catch(Exception ex){
//			logger.error(ex.getMessage());
//		}
		return SUCCESS;
	}
	/**
	 * 批量删除绑定的责任人
	 * @author lzm
	 */
	public String multiDelBDZePerson(){
		String[] ids = getRequest().getParameterValues("ids");
		String feeIndexId=getRequest().getParameter("feeIndexId");
		try{
		if(feeIndexId!=null){
			ObFeeIndex obindex= new ObFeeIndex();
			obindex=obFeeIndexService.get(new Long(feeIndexId));
			for(String id : ids){
				UlEmployee ulEmployee=new UlEmployee();
			if(obindex.getUlEmployees()!=null){
				for(UlEmployee emp:obindex.getUlEmployees()){
				 if(emp.getUseid()==Long.parseLong(id)){
					 ulEmployee = ulEmployeeService.get(emp.getUseid());
				 }
				}
				obindex.getUlEmployees().remove(ulEmployee);
				obFeeIndexService.save(obindex);
			}
			}
		}
		}catch(Exception ex){
			logger.error(ex.getMessage());
		}
		jsonString="{success:true}";
		
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
				ObFeeIndex feeindex = obFeeIndexService.get(new Long(id));
				feeindex.setStaId(Short.parseShort("2"));
				obFeeIndexService.save(feeindex);
			}
		}
		
		jsonString="{success:true}";
		
		return SUCCESS;
	}
	
	/**
	 * 批量启用
	 * @return
	 */
	public String multiStart(){
		String[]ids=getRequest().getParameterValues("ids");
		if(ids!=null){
			for(String id:ids){
				ObFeeIndex feeindex = obFeeIndexService.get(new Long(id));
				feeindex.setStaId(Short.parseShort("3"));
				obFeeIndexService.save(feeindex);
			}
		}
		
		jsonString="{success:true}";
		
		return SUCCESS;
	}
	/**
	 * 显示详细信息
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public String get(){
		JSONSerializer serializer = new JSONSerializer();
		serializer.transform(new DateTransformer("yyyy-MM-dd HH:mm:ss"),new String[] { "createDate","updateDate"});
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		ObFeeIndex obFeeIndex=obFeeIndexService.get(feeIndexId);
		sb.append(serializer.exclude(new String[]{"class"}).serialize(obFeeIndex));
		if (!obFeeIndex.getUlEmployees().isEmpty()){
			StringBuffer buffer = new StringBuffer("[");
			Iterator it = obFeeIndex.getUlEmployees().iterator();
			while (it.hasNext()){
				UlEmployee ulEmployee = (UlEmployee)it.next();
				buffer.append("{'userNo':'" + ulEmployee.getUserNo()+"'");
				buffer.append(",'fullname':'" + ulEmployee.getFullname()+ "'"); 
				buffer.append(",'depName':'" + ulEmployee.getUlDepartment().getDepname() + "'");
				buffer.append(",'useid':'" + ulEmployee.getUseid() + "'");
				buffer.append("}");
				if (it.hasNext()){
					buffer.append(",");
				}
			}
			buffer.append("]");
			sb.append(",'users':" + buffer.toString());
		}
		
		Set<ObFeeIndexLevel> obFeeIndexLevels = obFeeIndex.getObFeeIndexLevels();
		if(!obFeeIndexLevels.isEmpty()){
			StringBuffer strBuff = new StringBuffer("[");
			List<ObFeeIndexLevel> list = new ArrayList<ObFeeIndexLevel>();
			
			list.addAll(obFeeIndexLevels);
			Collections.sort(list, new Comparator<ObFeeIndexLevel>() {  
				  
	            public int compare(ObFeeIndexLevel o1, ObFeeIndexLevel o2) {  
	                if (o1.getFeeIndexLevelId() > o2.getFeeIndexLevelId()) {  
	                    return 1;  
	                } else if (o1.getFeeIndexLevelId() < o2.getFeeIndexLevelId()) {  
	                    return -1;  
	                } else {  
	                    return 0;  
	                }  
	            }  
	        });
			
			/** 
			 *对set集合进行排序
			 */
			for (int i=0; i<list.size(); i++){
				ObFeeIndexLevel obFeeLevel = (ObFeeIndexLevel)list.get(i);
				strBuff.append("{'feeIndexValue':" + obFeeLevel.getFeeIndexValue());
				strBuff.append(",'feeIndexId':" + obFeeLevel.getFeeIndexId());
				strBuff.append(",'getFeeIndexLevelId':" + obFeeLevel.getFeeIndexLevelId());
				strBuff.append(",'projecteId':" + obFeeLevel.getObFeeIndexProject().getFeeIndexProjectId() + "}");
				if (i < list.size()-1)
				{
					strBuff.append(",");
				}
			}
			strBuff.append("]");
			sb.append(",'obFeeIndexLevels':" + strBuff.toString());
		}else {
			sb.append(",'obFeeIndexLevels':" + "[]");
		}
		
		sb.append("}");
		setJsonString(sb.toString());
 		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		String details = getRequest().getParameter("details").replaceAll("\"", "");
		String months = getRequest().getParameter("allmonth").replaceAll("\"", "");
		String FeeIndexLevelIds=getRequest().getParameter("getFeeIndexLevelIds");
		String [] leveids=FeeIndexLevelIds.split(",");
		if(obFeeIndex.getFeeIndexId()==null){
			obFeeIndex.setCreateBy(ContextUtil.getCurrentUserId());
			obFeeIndex.setStaId(Short.parseShort("1"));
			obFeeIndex.setCreateDate(new Date());
			//添加负责人
			if (StringUtils.isNotEmpty(details)) {
				String[] idArr = details.substring(1,details.length()-1).split(",");
				Set<UlEmployee> list = new HashSet<UlEmployee>();
				if (idArr != null && !idArr.equals("")) {
					for (String detail : idArr) {
						UlEmployee ulEmployee = ulEmployeeService.get(new Long(Long.parseLong(detail)));
						obFeeIndex.getUlEmployees().add(ulEmployee);
					}
				}
			}
			obFeeIndex = obFeeIndexService.save(obFeeIndex);
			//处理指标的周期 月份or季度
			//周期——1按月份计算指标,(2,3,4,5)为按季度计算指标对应顺序（第一季度、第二季度、第三季度、第四季度）
			if (StringUtils.isNotEmpty(months))
			{
				String[] values = months.substring(1,months.length()-1).split(",");
				
				if (values != null && !values.equals(""))
				{
					//根据周期判断1-月份
					if (obFeeIndex.getCycle() == 1){
						for (int i=0;i<values.length ;i++){
							String [] value=values[i].split("-");
//							if( !("0").equals(values[i].trim())){
							ObFeeIndexLevel indexLevel = new ObFeeIndexLevel();
							indexLevel.setObFeeIndex(obFeeIndex);
							indexLevel.setMonth(value[2]);    
//							indexLevel.setQuarter(obFeeIndex.getCycle());
							//指标项
							ObFeeIndexProject obFeeIndexProject =obFeeIndexProjectService.get(new Long(value[1]));
							indexLevel.setFeeIndexValue(java.math.BigDecimal.valueOf(Long.parseLong(value[0])));
							if(obFeeIndexProject!=null){
							 indexLevel.setObFeeIndexProject(obFeeIndexProject);
							}
							indexLevel.setCreateDate(new Date());
							indexLevel.setCreateBy(ContextUtil.getCurrentUserId());
							obFeeIndexLevelService.save(indexLevel);
//							}
						}
					}
					//根据周期判断（2,3,4,5）-季度
					else if(obFeeIndex.getCycle() == 2){

						//添加新的指标值
						for (int i=0;i<values.length ;i++){
							String [] value=values[i].split("-");
//							if( !("0").equals(values[i].trim())){
							ObFeeIndexLevel indexLevel = new ObFeeIndexLevel();
							indexLevel.setObFeeIndex(obFeeIndex);
							if(("01").equals(value[2])){
//								indexLevel.setQuarter("2");	
								indexLevel.setMonth(value[2]);
							}
							 if(("02").equals(value[2])){
//								indexLevel.setQuarter("3");	
								indexLevel.setMonth(value[2]);
							}
							 if(("03").equals(value[2])){
//								indexLevel.setQuarter("4");	
								indexLevel.setMonth(value[2]);
							}
							 if(("04").equals(value[2])){
								indexLevel.setMonth(value[2]);
//								indexLevel.setQuarter("5");	
							}
//							indexLevel.setQuarter(obFeeIndex.getCycle());
							ObFeeIndexProject obFeeIndexProject =obFeeIndexProjectService.get(new Long(value[1]));
							indexLevel.setFeeIndexValue(java.math.BigDecimal.valueOf(Long.parseLong(value[0])));
							if(obFeeIndexProject!=null){
							 indexLevel.setObFeeIndexProject(obFeeIndexProject);
							}
							indexLevel.setObFeeIndexProject(obFeeIndexProject);
							indexLevel.setCreateDate(new Date());
							indexLevel.setCreateBy(ContextUtil.getCurrentUserId());
							indexLevel=obFeeIndexLevelService.save(indexLevel);
							obFeeIndex.getObFeeIndexLevels().add(indexLevel);
//							}
						}
					}
				}
			}
			 obFeeIndexService.save(obFeeIndex);
		}else{

			ObFeeIndex orgObFeeIndex=obFeeIndexService.get(obFeeIndex.getFeeIndexId());
			if (StringUtils.isNotEmpty(details)) {
				orgObFeeIndex.setCreateBy(ContextUtil.getCurrentUserId());
				orgObFeeIndex.setStaId(Short.parseShort("1"));
				orgObFeeIndex.setUpdateDate(new Date());
				String[] idArr = details.substring(1,details.length()-1).split(",");
				Set<UlEmployee> orignal = orgObFeeIndex.getUlEmployees();
				Set<UlEmployee> list = new HashSet<UlEmployee>();
				if (idArr != null && !idArr.equals("")) {
					for (String detail : idArr) {
						UlEmployee ulEmployee = ulEmployeeService.get(new Long(Long.parseLong(detail)));
						if(orignal.size()==0){
							list.add(ulEmployee);
						}else{
						for(UlEmployee ulEmployees: orignal){
							//不能指定同一个员工
							if (ulEmployees.getUseid()!=ulEmployee.getUseid() || ulEmployees.getUseid().equals(ulEmployee.getUseid()) ){
								list.add(ulEmployee);
							}
						}
				      }
				
					}
					obFeeIndex.setUlEmployees(list);
				}
			}
			//处理指标的周期 月份or季度
			//周期——1按月份计算指标,(2,3,4,5)为按季度计算指标对应顺序（第一季度、第二季度、第三季度、第四季度）
			if (StringUtils.isNotEmpty(months))
			{
				String[] values = months.substring(1,months.length()-1).split(",");
				
				if (values != null && !values.equals(""))
				{
					//删除已经绑定的指标值
					for(String leveid:leveids){
						if(!("").equals(leveid) && null!=leveid){
							obFeeIndexLevelService.remove(new Long(leveid));
						}
					}
					//根据周期判断1-月份
					if (orgObFeeIndex.getCycle() == 1){
						for (int i=0;i<values.length ;i++){
							String [] value=values[i].split("-");
//							if( !("0").equals(values[i].trim())){
							ObFeeIndexLevel indexLevel = new ObFeeIndexLevel();
							indexLevel.setObFeeIndex(obFeeIndex);
							indexLevel.setMonth(value[2]);
//							indexLevel.setQuarter(obFeeIndex.getCycle());
							ObFeeIndexProject obFeeIndexProject =obFeeIndexProjectService.get(new Long(value[1]));
							indexLevel.setFeeIndexValue(java.math.BigDecimal.valueOf(Long.parseLong(value[0])));
							
							if(obFeeIndexProject!=null){
							 indexLevel.setObFeeIndexProject(obFeeIndexProject);
							}
							indexLevel.setObFeeIndexProject(obFeeIndexProject);
							indexLevel.setCreateDate(new Date());
							indexLevel.setCreateBy(ContextUtil.getCurrentUserId());
							indexLevel=obFeeIndexLevelService.save(indexLevel);
							obFeeIndex.getObFeeIndexLevels().add(indexLevel);
//							}
						}
					}
					//根据周期判断（2,3,4,5）-季度
					else if(orgObFeeIndex.getCycle() == 2){

						//添加新的指标值
						for (int i=0;i<values.length ;i++){
							String [] value=values[i].split("-");
//							if( !("0").equals(values[i].trim())){
							ObFeeIndexLevel indexLevel = new ObFeeIndexLevel();
							indexLevel.setObFeeIndex(obFeeIndex);
							if(("01").equals(value[2])){
//								indexLevel.setQuarter("2");	
								indexLevel.setQuarter(value[2]);
							}
							 if(("02").equals(value[2])){
//								indexLevel.setQuarter("3");	
								indexLevel.setQuarter(value[2]);
							}
							 if(("03").equals(value[2])){
//								indexLevel.setQuarter("4");	
								indexLevel.setQuarter(value[2]);
							}
							 if(("04").equals(value[2])){
								indexLevel.setQuarter(value[2]);
//								indexLevel.setQuarter("5");	
							}
//							indexLevel.setQuarter(obFeeIndex.getCycle());
							ObFeeIndexProject obFeeIndexProject =obFeeIndexProjectService.get(new Long(value[1]));
							indexLevel.setFeeIndexValue(java.math.BigDecimal.valueOf(Long.parseLong(value[0])));
							if(obFeeIndexProject!=null){
							 indexLevel.setObFeeIndexProject(obFeeIndexProject);
							}
							indexLevel.setObFeeIndexProject(obFeeIndexProject);
							indexLevel.setCreateDate(new Date());
							indexLevel.setCreateBy(ContextUtil.getCurrentUserId());
							indexLevel=obFeeIndexLevelService.save(indexLevel);
							obFeeIndex.getObFeeIndexLevels().add(indexLevel);
//							}
						}
					}
				}
			}
			try{
				
				BeanUtil.copyNotNullProperties(orgObFeeIndex, obFeeIndex);
				obFeeIndexService.save(orgObFeeIndex);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
	
	public String getUserByObFeeIndex(){
		return SUCCESS;
	}
	//获得列
	public String getColumn(){
		StringBuffer buff = new StringBuffer("{'columns':'");
		List<ObFeeIndexProject> list= obFeeIndexProjectService.getAll();
		for (int i=0; i<list.size(); i++)
		{
			ObFeeIndexProject ofipj = list.get(i);
			buff.append(ofipj.getFeeIndexProjectName());
			if(i != list.size()-1)
			{
				buff.append(",");
			}
		}
		buff.append("'}");
		setJsonString(buff.toString());
		return SUCCESS;
	}
}
