package com.ulane.base.action.xitong;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;

import java.lang.reflect.Type;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.JsonUtil;

import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.oa.model.info.News;
import com.htsoft.oa.model.info.NewsComment;
import com.htsoft.oa.model.system.FileAttach;
import com.htsoft.oa.service.system.FileAttachService;


import com.ulane.base.model.xitong.UlBbsHuati;
import com.ulane.base.model.xitong.UlBbsHuifu;
import com.ulane.base.service.xitong.UlBbsHuatiService;
import com.ulane.base.service.xitong.UlBbsHuifuService;
import com.ulane.know.model.know.UkKnowApply;
import com.ulane.know.model.know.UkSysKnow;
import com.ulane.know.service.know.UkSysKnowService;

import flexjson.JSONSerializer;
import flexjson.transformer.DateTransformer;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class UlBbsHuifuAction extends BaseAction{
	@Resource
	private UlBbsHuifuService ulBbsHuifuService;
	
	@Resource
	private UlBbsHuatiService ulBbsHuatiService;
	@Resource
	private FileAttachService fileAttachService;
	@Resource
	private UkSysKnowService ukSysKnowService;
	private UlBbsHuifu ulBbsHuifu;
	private UlBbsHuati bbsHuati;
	
	
	private Long bbsHuifu;

	
	
	public UlBbsHuati getBbsHuati() {
		return bbsHuati;
	}

	public void setBbsHuati(UlBbsHuati bbsHuati) {
		this.bbsHuati = bbsHuati;
	}

	public Long getBbsHuifu() {
		return bbsHuifu;
	}

	public void setBbsHuifu(Long bbsHuifu) {
		this.bbsHuifu = bbsHuifu;
	}

	public UlBbsHuifu getUlBbsHuifu() {
		return ulBbsHuifu;
	}

	public void setUlBbsHuifu(UlBbsHuifu ulBbsHuifu) {
		this.ulBbsHuifu = ulBbsHuifu;
	}
	
	/**
	 * 显示回复信息列表
	 */
	public String huifulist(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		//String start = getRequest().getParameter("start");
		List<UlBbsHuifu> list= ulBbsHuifuService.getAll(filter);
//		Gson gson = new Gson();
		JSONSerializer ser = JsonUtil.getJSONSerializer();
		SimpleDateFormat simpleDate = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//		for(UlBbsHuifu newsComment : list){
//			buff.append("{bbsHuifu:'")
//				.append(newsComment.getBbsHuifu())
//				.append("',content:").append(gson.toJson(newsComment.getContent()))
//				.append(",reply:")
//				.append(gson.toJson(newsComment.getReply()))
//				.append(",replytime:'")
//				.append(simpleDate.format(newsComment.getReplytime()))
//				.append("',paertId:'")
//				.append("',huifuFiles:").append(gson.toJson(newsComment.getUlBbsHuifuFiles()))
//				.append("',huifuKnows:").append(gson.toJson(newsComment.getUlBbsHuifuKnows()))
//				.append(newsComment.getPaertId())
//				.append("'},");
//		}
//		if(list.size()>0){
//			buff.deleteCharAt(buff.length()-1);
//		}
//		buff.append("]}");
		
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(filter.getPagingBean().getTotalItems()).append(
						",result:");
		JSONSerializer serializer = new JSONSerializer();
		serializer.transform(new DateTransformer("yyyy-MM-dd HH:mm:ss"), new String[] {
				"reply" });
		buff.append(ser.include("ulBbsHuifuKnows").include("ulBbsHuifuFiles").serialize(list));
		buff.append("}");
		
		jsonString=buff.toString();
		return SUCCESS;
	}

	/**
	 * 添加及保存操作
	 */
	public String huifusave(){
		String fileIds = getRequest().getParameter("fileIds");
		String knowIds = getRequest().getParameter("knowIds");
		if (StringUtils.isNotEmpty(fileIds)) {
			ulBbsHuifu.getUlBbsHuifuFiles().clear();
			 String[] ids = fileIds.split(",");
			 for (int i = 0; i < ids.length; i++) {
			 FileAttach fileAttach = fileAttachService.get(new Long(ids[i]));
			 ulBbsHuifu.getUlBbsHuifuFiles().add(fileAttach);
			 }}
		
			if (StringUtils.isNotEmpty(knowIds)) {
				ulBbsHuifu.getUlBbsHuifuKnows().clear();
				String[] ids = knowIds.split(",");
				for (int i = 0; i < ids.length; i++) {
					UkSysKnow ukSysKnow = ukSysKnowService.get(new Long(
							ids[i]));
					ulBbsHuifu.getUlBbsHuifuKnows().add(ukSysKnow);
				}
			}
		//被回复的评论回复次数加1
		UlBbsHuati huati=ulBbsHuatiService.get(ulBbsHuifu.getBbsHuatiId());
		if ("".equals(huati.getHuifushu()) || null==huati.getHuifushu() ) {
			huati.setHuifushu(new Long(1));
			ulBbsHuatiService.merge(huati);
		} else {
			huati.setHuifushu(huati.getHuifushu() + 1);
			ulBbsHuatiService.merge(huati);
		}
		ulBbsHuifu.setUlBbsHuati(huati);
		Date date = new Date();
		ulBbsHuifu.setReplytime(new Timestamp(System.currentTimeMillis()));
		ulBbsHuifuService.save(ulBbsHuifu);
		setJsonString("{success:true}");
		return SUCCESS;
	}
	/**
	 * 显示发布信息列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<UlBbsHuifu> list= ulBbsHuifuService.getAll(filter);
		
		Type type=new TypeToken<List<UlBbsHuifu>>(){}.getType();
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
				ulBbsHuifuService.remove(new Long(id));
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
		UlBbsHuifu ulBbsHuifu=ulBbsHuifuService.get(bbsHuifu);
		
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(ulBbsHuifu));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(ulBbsHuifu.getBbsHuifu()==null){
			ulBbsHuifuService.save(ulBbsHuifu);
		}else{
			UlBbsHuifu orgUlBbsHuifu=ulBbsHuifuService.get(ulBbsHuifu.getBbsHuifu());
			try{
				BeanUtil.copyNotNullProperties(orgUlBbsHuifu, ulBbsHuifu);
				ulBbsHuifuService.save(orgUlBbsHuifu);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
}
