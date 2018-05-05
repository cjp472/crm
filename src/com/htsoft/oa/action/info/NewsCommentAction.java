package com.htsoft.oa.action.info;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.lang.reflect.Type;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.oa.model.info.InMessage;
import com.htsoft.oa.model.info.News;
import com.htsoft.oa.model.info.NewsComment;
import com.htsoft.oa.service.info.InMessageService;
import com.htsoft.oa.service.info.NewsCommentService;
import com.htsoft.oa.service.info.NewsService;
import com.htsoft.oa.service.system.AppUserService;

import flexjson.transformer.DateTransformer;
import flexjson.JSONSerializer;
/**
 * 
 * @author 
 *
 */
public class NewsCommentAction extends BaseAction{
	@Resource
	private NewsCommentService newsCommentService;
	@Resource
	private AppUserService appUserService;
	@Resource
	private NewsService newsService;
	@Resource
	private InMessageService inMessageService;
	private NewsComment newsComment;
	
	private Long commentId;

	public Long getCommentId() {
		return commentId;
	}

	public void setCommentId(Long commentId) {
		this.commentId = commentId;
	}

	public NewsComment getNewsComment() {
		return newsComment;
	}

	public void setNewsComment(NewsComment newsComment) {
		this.newsComment = newsComment;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		String start = getRequest().getParameter("start");
		List<NewsComment> list= newsCommentService.getAll(filter);
		
		Gson gson = new Gson();
		SimpleDateFormat simpleDate = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(filter.getPagingBean().getTotalItems()).append(",result:[");
		for(NewsComment newsComment : list){
			buff.append("{commentId:'")
				.append(newsComment.getCommentId())
				.append("',subject:").append(gson.toJson(newsComment.getNews().getSubject()))
				.append(",content:")
				.append(gson.toJson(newsComment.getContent()))
				.append(",createtime:'")
				.append(simpleDate.format(newsComment.getCreatetime()))
				.append("',fullname:'")
				.append(newsComment.getFullname())
				.append("',start:'")
				.append(start)
				.append("'},");
		}
		if(list.size()>0){
			buff.deleteCharAt(buff.length()-1);
		}
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
				NewsComment delComment = newsCommentService.get(new Long(id));
				News news = delComment.getNews();
				if(news.getReplyCounts()>1){
					news.setReplyCounts(news.getReplyCounts()-1);
				}
				newsService.save(news);
				newsCommentService.remove(new Long(id));
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
		NewsComment newsComment=newsCommentService.get(commentId);
		
		Gson gson=new Gson();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(newsComment));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		//被回复的新闻回复次数加1
		News news = newsService.get(newsComment.getNewsId());
		news.setReplyCounts(news.getReplyCounts()+1);
		newsService.save(news);
		
		newsComment.setAppUser(appUserService.get(newsComment.getUserId()));
		newsComment.setCreatetime(new Date());
		newsComment.setNews(news);
		newsCommentService.save(newsComment);
		setJsonString("{success:true}");
		return SUCCESS;
	}
	/**
	 * 保存评论及修改已读状态操作
	 */
	public String saveAndRead(){
		Long userId=ContextUtil.getCurrentUser().getUserId();
		String messageId = getRequest().getParameter("messageId");
		QueryFilter filter = new QueryFilter();
		filter.addFilter("Q_userId_L_EQ", userId.toString());
		filter.addFilter("Q_shortMessage.messageId_L_EQ", messageId);
		List<InMessage> inList = new ArrayList<InMessage>();
		InMessage message = null;
		if(userId!=null){
			inList = inMessageService.getAllNoRequest(filter);
			for(InMessage inMessage : inList){
				inMessage.setReadFlag(InMessage.FLAG_READ);
				message = inMessageService.save(inMessage);
			}
			if(message != null){
				if(newsComment.getContent() != null && !newsComment.getContent().equals("")){
				//被回复的新闻回复次数加1
					News news = newsService.get(newsComment.getNewsId());
					news.setReplyCounts(news.getReplyCounts()+1);
					newsService.save(news);
					
					newsComment.setAppUser(appUserService.get(newsComment.getUserId()));
					newsComment.setCreatetime(new Date());
					newsComment.setNews(news);
					newsCommentService.save(newsComment);
				}
			}
		}
		
		setJsonString("{success:true}");
		return SUCCESS;
	}
}
