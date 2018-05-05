package com.htsoft.oa.action.info;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.util.JsonUtil;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.model.info.InMessage;
import com.htsoft.oa.model.info.ShortMessage;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.service.info.InMessageService;
import com.htsoft.oa.service.info.ShortMessageService;
import com.htsoft.oa.service.system.AppUserService;

import flexjson.JSONSerializer;

public class ShortMessageAction extends BaseAction {

	static short NOT_DELETE=(short)0;
	private ShortMessage shortMessage;
    private Date from;
    private Date to;
	private List<InMessage> inList=new ArrayList<InMessage>();
	
	public List<InMessage> getInList() {
		return inList;
	}

	public void setInList(List<InMessage> inList) {
		this.inList = inList;
	}

	public Date getFrom() {
		return from;
	}

	public void setFrom(Date from) {
		this.from = from;
	}

	public Date getTo() {
		return to;
	}

	public void setTo(Date to) {
		this.to = to;
	}

	public ShortMessage getShortMessage() {
		return shortMessage;
	}

	public void setShortMessage(ShortMessage shortMessage) {
		this.shortMessage = shortMessage;
	}
	
	@Resource
	private ShortMessageService shortMessageService;
	@Resource
	private InMessageService inMessageService;
	@Resource
	private AppUserService appUserService;
	
	/**
	 * 发送列表
	 */
	public String list(){
		List<InMessage> list;
		PagingBean pb=getInitPagingBean();
		AppUser appUser=ContextUtil.getCurrentUser();
//		list=shortMessageService.searchShortMessage(appUser.getUserId(), shortMessage, from, to, pb,null);
		QueryFilter filter = new QueryFilter(getRequest());
		filter.addFilter("Q_userId_L_EQ", ContextUtil.getCurrentUserId().toString());
		filter.addFilter("Q_readFlag_SN_EQ", "0");
		filter.addSorted("receiveId", "desc");
		list = inMessageService.getAll(filter);
	
		List<InMessage> inList=new ArrayList<InMessage>();
		for(int i=0;i<list.size();i++){
		    InMessage inMessage=list.get(i);
			if (inMessage.getShortMessage().getMsgType().equals(ShortMessage.MSG_TYPE_NEWS)
					|| inMessage.getShortMessage().getMsgType().equals(ShortMessage.MSG_TYPE_NOTICE)) {
		    	inList.add(inMessage);
		    }
	    }
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':"+inList.size()+",result:");
		JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
		buff.append(jsonSer.serialize(inList));
		buff.append("}");
		setJsonString(buff.toString());
	    return SUCCESS;
	}
	
	/**
	 * 发送
	 * @return
	 */
	public String send(){
		String reId=getRequest().getParameter("userId");
		String content=getRequest().getParameter("content");
		String userFullname=getRequest().getParameter("userFullname");
		String sendMsgType=getRequest().getParameter("sendMesType_1");
		
		System.out.println("reId="+reId);
		System.out.println("content="+content);
		System.out.println("userFullname="+userFullname);
		System.out.println("sendMsgType="+sendMsgType);
		String fileId = "";
		String fileName = "";
		try{
			fileId=getRequest().getParameter("fileid_1");
			fileName=getRequest().getParameter("filename_1");
		}catch(Exception e){
			System.err.println("send 进入异常,表示没有添加附件的消息,就使用默认值");
		}
		
		System.out.println("fileId="+fileId);
		System.out.println("fileName="+fileName);
		AppUser appUser=ContextUtil.getCurrentUser();
		if(StringUtils.isNotEmpty(reId)&&StringUtils.isNotEmpty(content)){
			String st[]=reId.split(",");
			ShortMessage message=new ShortMessage();
			message.setContent(content);
			message.setMsgType((short)1);
			message.setSendMsgType(sendMsgType);
			message.setSenderId(appUser.getUserId());
			message.setSender(appUser.getFullname());
			message.setSendTime(new Date());
			message.setFileid(fileId);
			message.setFilename(fileName);
			shortMessageService.save(message);
			for(int i=0;i<st.length;i++){
				InMessage in=new InMessage();	
				in.setUserId(Long.parseLong(st[i]));
				AppUser user=appUserService.get(Long.parseLong(st[i]));
				in.setUserFullname(user.getFullname());
				in.setDelFlag(NOT_DELETE);
				in.setReadFlag((short)0);
				in.setShortMessage(message);
				in.setMessageForm("MessageDetailInfo");
				in.setFormId(message.getMessageId());
				inMessageService.save(in);
			}						
			setJsonString("{success:true}");
		}else{
			setJsonString("{success:false}");
		}
		return SUCCESS;
	}
	
	public void add(){
		String reId=getRequest().getParameter("userId");
		String content=getRequest().getParameter("content");
		
		AppUser appUser=ContextUtil.getCurrentUser();
		
		if(StringUtils.isNotEmpty(reId)&&StringUtils.isNotEmpty(content)){
			String st[]=reId.split(",");
			ShortMessage message=new ShortMessage();
			message.setContent(content);
			message.setMsgType((short)1);
			message.setSenderId(appUser.getUserId());
			message.setSender(appUser.getFullname());
			message.setSendTime(new Date());
			shortMessageService.save(message);
			for(int i=0;i<st.length;i++){
				InMessage in=new InMessage();	
				in.setUserId(Long.parseLong(st[i]));
				AppUser user=appUserService.get(Long.parseLong(st[i]));
				in.setUserFullname(user.getFullname());
				in.setDelFlag(NOT_DELETE);
				in.setReadFlag((short)0);
				in.setShortMessage(message);
				in.setMessageForm("MessageDetailInfo");
				in.setFormId(message.getMessageId());
				inMessageService.save(in);
			}	
			writeToPage(Boolean.valueOf(true), "发送成功", null);
		}else{
			writeToPage(Boolean.valueOf(false), "收件人或内容不能为空", null);
		}
	}	

	public void reply(){
		String reId=getRequest().getParameter("senderId");
		String content=getRequest().getParameter("content");
		
		AppUser appUser=ContextUtil.getCurrentUser();
		
		if(StringUtils.isNotEmpty(reId)&&StringUtils.isNotEmpty(content)){
			String st[]=reId.split(",");
			ShortMessage message=new ShortMessage();
			message.setContent(content);
			message.setMsgType((short)1);
			message.setSenderId(appUser.getUserId());
			message.setSender(appUser.getFullname());
			message.setSendTime(new Date());
			shortMessageService.save(message);
			for(int i=0;i<st.length;i++){
				InMessage in=new InMessage();	
				in.setUserId(Long.parseLong(st[i]));
				AppUser user=appUserService.get(Long.parseLong(st[i]));
				in.setUserFullname(user.getFullname());
				in.setDelFlag(NOT_DELETE);
				in.setReadFlag((short)0);
				in.setShortMessage(message);
				in.setMessageForm("MessageDetailInfo");
				in.setFormId(message.getMessageId());
				inMessageService.save(in);
			}
			writeToPage(Boolean.valueOf(true), "发送成功", null);
		}else{
			writeToPage(Boolean.valueOf(false), "收件人或内容不能为空", null);
		}
	}	

}
