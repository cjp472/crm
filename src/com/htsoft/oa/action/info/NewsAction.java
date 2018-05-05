package com.htsoft.oa.action.info;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.lang.reflect.Type;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import javax.annotation.Resource;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.util.JsonUtil;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.model.info.News;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.service.info.NewsService;
import com.htsoft.oa.service.system.AppUserService;
import com.ulane.base.model.info.UlNewsReceive;
import com.ulane.base.model.xitong.UlBbsHuati;
import com.ulane.base.model.xitong.UlBbsJieshou;
import com.ulane.base.model.xitong.UlUsergroup;
import com.ulane.base.service.info.UlNewsReceiveService;
import com.ulane.base.service.xitong.UlUsergroupService;
import com.ulane.know.model.know.UkSysKnow;

import flexjson.JSONSerializer;
/**
 * 
 * @author 
 *
 */
public class NewsAction extends BaseAction{
	@Resource
	private NewsService newsService;
	@Resource
	private AppUserService appUserService;
	@Resource 
	private UlUsergroupService ulUsergroupService;
	@Resource
	private UlNewsReceiveService newsReceiveService;
	
	private UlNewsReceive newsReceive;
	private News news;
	
	private Long newsId;

	public Long getNewsId() {
		return newsId;
	}

	public void setNewsId(Long newsId) {
		this.newsId = newsId;
	}

	public News getNews() {
		return news;
	}

	public void setNews(News news) {
		this.news = news;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		filter.addSorted("newsId", "desc");
		List<News> list= newsService.getAll(filter);
		
		
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		JSONSerializer json = JsonUtil.getJSONSerializer("createtime","expTime","updateTime");
		
		buff.append(json.serialize(list));
		buff.append("}");
		
		jsonString=buff.toString();
		
		return SUCCESS;                                                                                                                                                                                                                                                                                                                             
	}
	
	/**
	 * 跑马灯 未读新闻和公告
	 * 
	 * @author liuzhimin                                                                                                                                                                                                                                                                              
	 * @createtime 2012年6月13日
	 */
	public String paoMaDengList() { 
		QueryFilter filter = new QueryFilter(getRequest());
		filter.addFilter("Q_status_SN_EQ", "0");//0表示未发布的新闻和公告
		List<News> list= newsService.getAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		JSONSerializer json = JsonUtil.getJSONSerializer("createtime","expTime","updateTime");
		
		buff.append(json.serialize(list));
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
				newsService.remove(new Long(id));
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
		News news=newsService.get(newsId);
		
		JSONSerializer json = JsonUtil.getJSONSerializer("createtime","expTime","updateTime");
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(json.serialize(news));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
			if(news.getNewsId()==null){
				news.setViewCounts(0);
				news.setReplyCounts(0);
				news.setAppUser(ContextUtil.getCurrentUser());
				news.setStatus(new Short("0"));
				newsService.save(news);
			}else{
				News orgNews=newsService.get(news.getNewsId());
				try{
					BeanUtil.copyNotNullProperties(orgNews, news);
					orgNews.setUpdateTime(new Date());
					newsService.save(orgNews);
				}catch(Exception ex){
					logger.error(ex.getMessage());
				}
			}
			setJsonString("{success:true}");
		
		return SUCCESS;
		
	}
	
	/**
	 * 删除新闻图标在新闻表中的记录
	 */
	public String icon(){
		setNews(newsService.get(getNewsId()));
		news.setSubjectIcon("");
		newsService.save(news);
		return SUCCESS;
	}
	
	/**
	 * 收索栏中查询新闻的记录
	 */
	public String search(){
		PagingBean pb = getInitPagingBean();
		String searchContent = getRequest().getParameter("searchContent");
		String isNotice = getRequest().getParameter("isNotice");
		List<News> list = newsService.findBySearch(new Short(isNotice),searchContent,pb);
		
		Type type=new TypeToken<List<News>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(pb.getTotalItems()).append(",result:");
		
		Gson gson=new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
		buff.append(gson.toJson(list, type));
		buff.append("}");
		
		jsonString=buff.toString();
		return SUCCESS;
	}
	
	/**
	 * 发布新闻 公告
	 * 
	 * @return
	 */
	public String newsUpdate() {
		String id = getRequest().getParameter("ids");
		String detail = getRequest().getParameter("detail");
		String deployFlag = newsService.deployNews(id, detail);
		if(deployFlag.equals("success")){
			jsonString = "{success:true}";
		} else {
			jsonString = "{success:false}";
		}

		return SUCCESS;
	}
	/**
	 * 首页显示公告列表 
	 */
	 public String displayNotice(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		 
		filter.addFilter("Q_appUser.userId_L_EQ", ContextUtil.getCurrentUserId().toString());
		filter.addSorted("newsId","desc");
		List<News> list= newsService.getAll(filter);
		getRequest().setAttribute("noticeList", list);
		return "display";
	}
}
