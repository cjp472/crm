package com.htsoft.oa.action.communicate;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.oa.model.communicate.PhoneBook;
import com.htsoft.oa.model.communicate.PhoneGroup;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.service.communicate.PhoneBookService;
import com.htsoft.oa.service.communicate.PhoneGroupService;
import com.ulane.base.model.xitong.UlEmployee;
import com.ulane.base.service.xitong.UlEmployeeService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class PhoneGroupAction extends BaseAction{
	@Resource
	private PhoneGroupService phoneGroupService;
	
	private PhoneGroup phoneGroup;
	@Resource
	private PhoneBookService phoneBookService;
	
	@Resource
    private UlEmployeeService ulEmployeeService;
	public UlEmployeeService getUlEmployeeService() {
		return ulEmployeeService;
	}

	public void setUlEmployeeService(UlEmployeeService ulEmployeeService) {
		this.ulEmployeeService = ulEmployeeService;
	}



	private Long groupId;

	public Long getGroupId() {
		return groupId;
	}

	public void setGroupId(Long groupId) {
		this.groupId = groupId;
	}

	public PhoneGroup getPhoneGroup() {
		return phoneGroup;
	}

	public void setPhoneGroup(PhoneGroup phoneGroup) {
		this.phoneGroup = phoneGroup;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		String isPublic =getRequest().getParameter("isPublic");
		List<PhoneGroup> list=new ArrayList<PhoneGroup>();
		if(StringUtils.isNotEmpty(isPublic)&&"true".equals(isPublic)){
			list= phoneGroupService.getPublicAll();
		}else{
			list= phoneGroupService.getAll(ContextUtil.getCurrentUserId());
		}
		String method=getRequest().getParameter("method");
		StringBuffer buff = new StringBuffer();
		int i=0;
		if(StringUtils.isNotEmpty(method)){			
			buff.append("[");
		}else{
			i++;
			buff.append("[{id:'"+0+"',text:'联系人分组',expanded:true,children:[");
		}
		for(PhoneGroup pg:list){
			buff.append("{id:'"+pg.getGroupId()+"',text:'"+pg.getGroupName()+"',leaf:true},");
		}
		if (!list.isEmpty()) {
			buff.deleteCharAt(buff.length() - 1);
	    }
		if(i==0){
			buff.append("]");
		}else{
		    buff.append("]}]");
		}
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
				Long groupId=new Long(id);
				PhoneGroup phoneGroup=phoneGroupService.get(groupId);
				phoneGroupService.remove(groupId);
				List<PhoneGroup> list=phoneGroupService.findBySnDown(phoneGroup.getSn(),phoneGroup.getAppUser().getUserId());
				for(PhoneGroup pg:list){
					pg.setSn(pg.getSn()-1);
					phoneGroupService.save(pg);
				}
			}
		}
		
		jsonString="{success:true}";
		
		return SUCCESS;
	}
	
	public String count(){
		QueryFilter filter=new QueryFilter(getRequest());
		List<PhoneBook> pbList= phoneBookService.getAll(filter);
		setJsonString("{success:true,count:"+pbList.size()+"}");
		return SUCCESS;
	}
	
	/**
	 * 显示详细信息
	 * @return
	 */
	public String get(){
		PhoneGroup phoneGroup=phoneGroupService.get(groupId);
		Gson gson=new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(phoneGroup));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	
	/**
	 * 添加及保存删除操作
	 * 
	 * @author liuzhimin
	 * @createtime 2012年6月5日
	 */
	public String save(){
 		String  useids =getRequest().getParameter("useid");
 		String[] uids=useids.split(",");
		String  groupId =getRequest().getParameter("groupId");
		String  deleteId =getRequest().getParameter("deleteId");
		//添加联系人
		if(deleteId==null){
			PhoneGroup phoneGroup=phoneGroupService.get(Long.parseLong(groupId));
			if(uids.length>0){
				for(String useid:uids){
					UlEmployee ulEmployee = ulEmployeeService.get(Long.parseLong(useid));
					phoneGroup.getUlEmployees().add(ulEmployee);
				}
			 
			AppUser appUser=ContextUtil.getCurrentUser();
			Integer sn=0;
			
			phoneGroup.setSn(sn);
			phoneGroup.setAppUser(appUser);

			phoneGroupService.save(phoneGroup);
			}
		}else{
			//删除联系人
			PhoneGroup phoneGroup=phoneGroupService.get(Long.parseLong(groupId));
			if(uids.length>0){
				for(String useid:uids){
					UlEmployee ulEmployee = ulEmployeeService.get(Long.parseLong(useid));
					phoneGroup.getUlEmployees().remove(ulEmployee);
				}
			 
			AppUser appUser=ContextUtil.getCurrentUser();
			Integer sn=0;
			
			phoneGroup.setSn(sn);
			phoneGroup.setAppUser(appUser);

			phoneGroupService.save(phoneGroup);
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
	}
	
	/**
	 * 添加联系人分组
	 * 
	 * @author liuzhimin
	 * @createtime 2012年6月5日
	 */
	public String saveGroup(){
		Integer sn=0;
		AppUser appUser=ContextUtil.getCurrentUser();
//		if(PhoneGroup.IS_PUBLIC==phoneGroup.getIsPublic()){
//			sn=phoneGroupService.findPublicLastSn();
//		}else{
//			sn=phoneGroupService.findLastSn(appUser.getUserId());
//		}
//		if(sn==null)sn=0;
		phoneGroup.setSn(sn);
		phoneGroup.setAppUser(appUser);
		phoneGroupService.merge(phoneGroup);
		setJsonString("{success:true}");
		return SUCCESS;
	}
	
	public String move(){
		String strOpt=getRequest().getParameter("optId");
		String strGroupId=getRequest().getParameter("groupId");
		Long userId=ContextUtil.getCurrentUserId();
		if(StringUtils.isNotEmpty(strGroupId)){
			Integer opt=Integer.parseInt(strOpt);
			Long groupId=Long.parseLong(strGroupId);
			phoneGroup=phoneGroupService.get(groupId);
			Integer sn=phoneGroup.getSn();
			if(opt==1){/*上移*/
				if(sn>1){
					PhoneGroup pg=phoneGroupService.findBySn(sn-1,userId);
					pg.setSn(sn);
					phoneGroupService.save(pg);
					phoneGroup.setSn(sn-1);
					phoneGroupService.save(phoneGroup);
				}
			}
			if(opt==2){//move down
				if(sn<phoneGroupService.findLastSn(userId)){
					PhoneGroup pg=phoneGroupService.findBySn(sn+1,userId);
					pg.setSn(sn);	
					phoneGroup.setSn(sn+1);
					phoneGroupService.save(pg);
					phoneGroupService.save(phoneGroup);
				}
			}
			if(opt==3){//move top
				if(sn>1){
					List<PhoneGroup> list=phoneGroupService.findBySnUp(sn, userId);
					for(PhoneGroup pg:list){
						pg.setSn(pg.getSn()+1);
						phoneGroupService.save(pg);
					}
					phoneGroup.setSn(1);
					phoneGroupService.save(phoneGroup);
				}
			}
			if(opt==4){
				if(sn<phoneGroupService.findLastSn(userId)){
					List<PhoneGroup> list=phoneGroupService.findBySnDown(sn, userId);
					for(PhoneGroup pg:list){
						pg.setSn(pg.getSn()-1);
						phoneGroupService.save(pg);
					}
					phoneGroup.setSn(phoneGroupService.findLastSn(userId)+1);
					phoneGroupService.save(phoneGroup);
				}
			}
			setJsonString("{success:true}");
		}else{
			setJsonString("{success:false}");
		}
		return SUCCESS;
	}
}
