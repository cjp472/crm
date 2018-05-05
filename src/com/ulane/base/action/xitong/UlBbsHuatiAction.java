package com.ulane.base.action.xitong;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
 */
import java.lang.reflect.Type;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.util.JsonUtil;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.model.system.FileAttach;
import com.htsoft.oa.service.system.AppUserService;
import com.htsoft.oa.service.system.FileAttachService;
import com.ulane.base.model.xitong.UlBbsHuati;
import com.ulane.base.model.xitong.UlBbsJieshou;
import com.ulane.base.model.xitong.UlUsergroup;
import com.ulane.base.service.xitong.UlBbsHuatiService;
import com.ulane.base.service.xitong.UlBbsHuifuService;
import com.ulane.base.service.xitong.UlBbsJieshouService;
import com.ulane.base.service.xitong.UlUsergroupService;

import flexjson.JSONSerializer;

/**
 * 
 * @author cf0666@gmail.com
 * 
 */
public class UlBbsHuatiAction extends BaseAction {
	@Resource
	private UlBbsHuatiService ulBbsHuatiService;
	@Resource
	private UlBbsHuifuService ulBbsHuifuService;
	@Resource
	private UlBbsJieshouService ulBbsJieshouService;
	@Resource
	private AppUserService appUserService;
	@Resource
	private UlUsergroupService ulUsergroupService;
	@Resource
	private FileAttachService fileAttachService; 

	private UlBbsHuati ulBbsHuati;
	private UlBbsJieshou ulbbsJieshou;
    
	public UlBbsJieshou getUlbbsJieshou() {
		return ulbbsJieshou;
	}

	public void setUlbbsJieshou(UlBbsJieshou ulbbsJieshou) {
		this.ulbbsJieshou = ulbbsJieshou;
	}

	private Long bbsHuatiId;

	public Long getBbsHuatiId() {
		return bbsHuatiId;
	}

	public void setBbsHuatiId(Long bbsHuatiId) {
		this.bbsHuatiId = bbsHuatiId;
	}

	public UlBbsHuati getUlBbsHuati() {
		return ulBbsHuati;
	}

	public void setUlBbsHuati(UlBbsHuati ulBbsHuati) {
		this.ulBbsHuati = ulBbsHuati;
	}

	/**
	 * 显示列表
	 */
	public String list() {
		//获得当前用户的ID
//		Long userId = ContextUtil.getCurrentUser().getUserId();
//		List<UlBbsHuati> htList = ulBbsHuatiService.getMy(userId);
//		List<UlBbsHuati> huatiList = new ArrayList<UlBbsHuati>();
//		List<UlBbsHuati> ulist = new ArrayList<UlBbsHuati>();
//		List<UlBbsJieshou> jsList = ulBbsJieshouService.findByUser(userId);
//		for(UlBbsJieshou ulBbsJieshou : jsList){
//			
//			huatiList.add(ulBbsJieshou.getUlBbsHuati());
//		}
//		
//		QueryFilter filter = new QueryFilter(getRequest());
//		filter.addFilter("Q_appUser.userId_L_EQ", userId.toString());
//		ulist = ulBbsHuatiService.getAll(filter);
//		
//		
////		List<UlBbsHuati> list =  new ArrayList<UlBbsHuati>();
////		list.addAll(huatiList);
////		for (Iterator<UlBbsHuati> iterator = list.iterator(); iterator.hasNext();) {
////			UlBbsHuati u =iterator.next();
////			if(ulist.contains(u)){
////				iterator.remove();
////			}
////		}
////		list.addAll(ulist);
//		
//		Set<UlBbsHuati> huatiSet = new HashSet<UlBbsHuati>();
//		huatiSet.addAll(ulist);
//		huatiSet.addAll(huatiList);
//		
//		List<UlBbsHuati> list = new ArrayList<UlBbsHuati>();
//		for(UlBbsHuati bbsHuati : huatiSet){
//			try {
//				UlBbsHuati orgUlBbsHuati = new UlBbsHuati();
//				BeanUtil.copyNotNullProperties(orgUlBbsHuati, bbsHuati);
//				list.add(orgUlBbsHuati);
//			} catch (Exception e) {
//				e.printStackTrace();
//			}
//		}
//		
//		
		QueryFilter filter = new QueryFilter(getRequest());
		filter.addFilter("", "");
		filter.addSorted("createtime", "desc");
		List<UlBbsHuati> htList = ulBbsHuatiService.getAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(htList.size()).append(
						",result:");

		JSONSerializer jsonSer = JsonUtil.getJSONSerializer("createtime");
		buff.append(jsonSer.serialize(htList));
		buff.append("}");

		jsonString = buff.toString();
		return SUCCESS;
	}

	/**
	 * 批量删除
	 * 
	 * @return
	 */
	public String multiDel() {

		String[] ids = getRequest().getParameterValues("ids");
		if (ids != null) {
			for (String id : ids) {
				ulBbsHuatiService.remove(new Long(id));
				
			}
		}

		jsonString = "{success:true}";

		return SUCCESS;
	}

	/**
	 * 修改话题状态
	 * 
	 * @return
	 */
	public String huatiUpdate() {
		String id = getRequest().getParameter("ids");
		if(id!=null){
		try {
			UlBbsHuati orgUlBbsHuati = ulBbsHuatiService.get(new Long(id));
			

			//获得接收人
			String userStr = orgUlBbsHuati.getJoiner();
			//按逗号截取 获得一个数组
			String[] userList = userStr.trim().split(",");
			
			//获得接收组
			String groupStr = orgUlBbsHuati.getJoinerGroup();
			//按逗号截取 获得一个数组
			String[] groupList = groupStr.trim().split(",");
			
			List<AppUser> appUserList = new ArrayList<AppUser>();
			List<AppUser> appGroupUserList = new ArrayList<AppUser>();
			Set<AppUser> ugroupUsers = new HashSet<AppUser>();
			//循环遍历userList数组  把每一个user对象装载到appUserList中
			for(int i=0;i<userList.length;i++){
				AppUser appUser = appUserService.get(new Long(userList[i]));
				appUserList.add(appUser);
			}
			//循环遍历groupList数组  把每一个user对象装载到appGroupUserList中
			for(int i=0;i<groupList.length;i++){
				UlUsergroup ulUsergroup= ulUsergroupService.get(new Long(groupList[i]));
				ugroupUsers=ulUsergroup.getUsers();
				for(AppUser appGroupUser : ugroupUsers){
					appGroupUserList.add(appGroupUser);
				}
			}
			List<AppUser> result =  new ArrayList<AppUser>();
			result.addAll(appUserList);
			for (Iterator<AppUser> iterator = result.iterator(); iterator.hasNext();) {
				AppUser u =iterator.next();
				if(appGroupUserList.contains(u)){
					iterator.remove();
				}
			}
			result.addAll(appGroupUserList);
			
			for(AppUser appGroupUser : result){
				//发布至接收人
				ulbbsJieshou = new UlBbsJieshou();
				ulbbsJieshou.setUlBbsHuati(orgUlBbsHuati);
				ulbbsJieshou.setReceivetime(new Timestamp(System.currentTimeMillis()));
				ulbbsJieshou.setAppUser(appGroupUser);
				ulBbsJieshouService.save(ulbbsJieshou);
			}
			
			if (!"".equals(orgUlBbsHuati.getStatus())
					|| null != orgUlBbsHuati.getStatus()) {
				if (orgUlBbsHuati.getStatus() != 1) {
					orgUlBbsHuati.setStatus(1l);
					ulBbsHuatiService.merge(orgUlBbsHuati);
				}

			}
		} catch (Exception ex) {
			logger.error(ex.getMessage());
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
		UlBbsHuati ulBbsHuati = ulBbsHuatiService.get(bbsHuatiId);

		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd HH:mm:ss").create();
		// 将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
//		sb.append(jsonSer.serialize(ulBbsHuati));
		sb.append(gson.toJson(ulBbsHuati));
		sb.append("}");
		setJsonString(sb.toString());

		return SUCCESS;
	}

	/**
	 * 添加及保存操作
	 */
	public String save() {
		String fileIds=getRequest().getParameter("fileIds");
		if(StringUtils.isNotEmpty(fileIds)){
			ulBbsHuati.getUlBbsHuatiFile().clear();
			String[] ids=fileIds.split(",");
			for(int i=0;i<ids.length;i++){
			   FileAttach fileAttach=fileAttachService.get(new Long(ids[i]));
			   ulBbsHuati.getUlBbsHuatiFile().add(fileAttach);
			}
		}
		
		if (ulBbsHuati.getBbsHuatiId() == null) {
			ulBbsHuati.setAppUser(ContextUtil.getCurrentUser());
			ulBbsHuati.setCreatetime(new Timestamp(System.currentTimeMillis()));
			ulBbsHuati.setStatus(new Long(2));
			ulBbsHuatiService.save(ulBbsHuati);
		} else {
			UlBbsHuati orgUlBbsHuati = ulBbsHuatiService.get(ulBbsHuati
					.getBbsHuatiId());
			try {
				BeanUtil.copyNotNullProperties(orgUlBbsHuati, ulBbsHuati);
				orgUlBbsHuati.setUpdateby(ContextUtil.getCurrentUser().getFamilyName());
				orgUlBbsHuati.setUpdatetime(new Timestamp(System.currentTimeMillis()));
				ulBbsHuatiService.save(orgUlBbsHuati);
			} catch (Exception ex) {
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;

	}
	
	/**
	 * 显示列表
	 */
	public String display() {
		//获得当前用户的ID
		PagingBean pagingBean = new PagingBean(0, 10);
		List<UlBbsHuati> htList = ulBbsHuatiService.display(pagingBean);
		getRequest().setAttribute("qiuSuoKnowList", htList);
		return "display";
	}
}
