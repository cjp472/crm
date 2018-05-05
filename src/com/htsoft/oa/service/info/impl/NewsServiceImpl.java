package com.htsoft.oa.service.info.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import javax.annotation.Resource;

import com.htsoft.core.Constants;
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.dao.info.NewsDao;
import com.htsoft.oa.model.info.InMessage;
import com.htsoft.oa.model.info.News;
import com.htsoft.oa.model.info.ShortMessage;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.service.info.InMessageService;
import com.htsoft.oa.service.info.NewsService;
import com.htsoft.oa.service.info.ShortMessageService;
import com.htsoft.oa.service.system.AppUserService;
import com.ulane.base.model.info.UlNewsReceive;
import com.ulane.base.model.xitong.UlUsergroup;
import com.ulane.base.service.info.UlNewsReceiveService;
import com.ulane.base.service.xitong.UlUsergroupService;

public class NewsServiceImpl extends BaseServiceImpl<News> implements NewsService{
	@Resource
	private NewsService newsService;
	@Resource
	private UlNewsReceiveService newsReceiveService;
	@Resource
	private UlUsergroupService ulUsergroupService;
	@Resource
	private AppUserService appUserService;
	@Resource
	private ShortMessageService shortMessageService;
	@Resource
	private InMessageService inMessageService;
	
	private UlNewsReceive newsReceive;
	private InMessage inMessage;
	private ShortMessage shortMessage;
	
	private NewsDao newsDao;
	
	public NewsServiceImpl(NewsDao dao) {
		super(dao);
		this.newsDao=dao;
	}

	@Override
	public List<News> findByTypeId(Long typeId,PagingBean pb) {
		return newsDao.findByTypeId(typeId,pb);
	}

	@Override
	public List<News> findBySearch(Short isNotice,String searchContent,PagingBean pb) {
		return newsDao.findBySearch(isNotice,searchContent,pb);
	}

	@Override
	public List<News> findImageNews(Long sectionId,PagingBean pb) {
		return newsDao.findImageNews(sectionId,pb);
	}

	@Override
	public String deployNews(String id, String detail) {
		try {
			News news = newsService.get(new Long(id));
			if (!"".equals(news.getStatus()) && null != news.getStatus()) {
				if (news.getStatus() != 1) {
					news.setStatus(new Short("1"));
					newsService.merge(news);
				}
			}
			
			//发布后往短消息表中存数据
			if(news.getSubject()!=null && !news.getSubject().equals("")){
				shortMessage = new ShortMessage();
				shortMessage.setSenderId(ContextUtil.getCurrentUserId());
				shortMessage.setContent(news.getSubject());
				if(detail.equals("NewsDetailWin")){
					shortMessage.setMsgType(ShortMessage.MSG_TYPE_NEWS);//=5表示新闻类型
				}
				if(detail.equals("NoticeDetailWin")){
					shortMessage.setMsgType(ShortMessage.MSG_TYPE_NOTICE);//=6表示公告类型
				}
				shortMessage.setSender(ContextUtil.getCurrentUser().getFullname());
				shortMessage.setSendTime(new Date());
				shortMessageService.save(shortMessage);
			}
			
			//获得接收人
			String userStr = news.getJoiner();
			//按逗号截取 获得一个数组
			String[] userList = userStr.trim().split(",");
			
			//获得接收组
			String groupStr = news.getJoinerGroup();
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
				newsReceive = new UlNewsReceive();
				newsReceive.setNews(news);
				newsReceive.setReceivetime(new Timestamp(System.currentTimeMillis()));
				newsReceive.setAppUser(appGroupUser);
				newsReceiveService.save(newsReceive);
				//发布至消息表中
				inMessage = new InMessage();
				inMessage.setShortMessage(shortMessage);
				inMessage.setUserId(appGroupUser.getUserId());
				inMessage.setReadFlag((short)0);
				inMessage.setDelFlag(Constants.FLAG_UNDELETED);
				inMessage.setUserFullname(appGroupUser.getFullname());
				inMessage.setMessageForm(detail);
				inMessage.setFormId(new Long(id));
				inMessageService.save(inMessage);
			}
		} catch (Exception ex) {
			logger.error(ex.getMessage());
			ex.printStackTrace();
			return "fail";
		}
		return "success";
	}


}
