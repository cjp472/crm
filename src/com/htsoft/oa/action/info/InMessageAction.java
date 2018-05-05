package com.htsoft.oa.action.info;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/

import java.lang.reflect.Type;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.model.info.InMessage;
import com.htsoft.oa.model.info.ShortMessage;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.service.info.InMessageService;
import com.htsoft.oa.service.info.ShortMessageService;

import flexjson.JSONSerializer;
import flexjson.transformer.DateTransformer;
public class InMessageAction extends BaseAction {

	static short HAVE_DELETE=(short)1;
	private InMessage inMessage;
    private ShortMessage shortMessage;
    private Date from;
    private Date to;
    
	public InMessage getInMessage() {
		return inMessage;
	}

	public void setInMessage(InMessage inMessage) {
		this.inMessage = inMessage;
	}	
	public ShortMessage getShortMessage() {
		return shortMessage;
	}

	public void setShortMessage(ShortMessage shortMessage) {
		this.shortMessage = shortMessage;
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
	@Resource
	private InMessageService inMessageService;
	@Resource
	private ShortMessageService shortMessageService;
	
	/**
	 * 收信息列表
	 */
	public String list(){
		List<Object[]> list;
		PagingBean pb=getInitPagingBean();
		AppUser appUser=ContextUtil.getCurrentUser();
//		if(inMessage!=null){
		  list=inMessageService.searchInMessage(appUser.getUserId(), inMessage, shortMessage, from, to, pb);
//		}else{
//		  list=inMessageService.findByUser(appUser.getUserId(),pb);	
//		}
		List<InMessage> inList=new ArrayList<InMessage>();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':"+pb.getTotalItems()+",result:");
		for(int i=0;i<list.size();i++){
			    InMessage inMessage=(InMessage)list.get(i)[0];
			    inList.add(inMessage);
		}
		Gson gson=new Gson();
		Type type=new TypeToken<List<InMessage>>(){}.getType();
		buff.append(gson.toJson(inList,type));
		buff.append("}");
		setJsonString(buff.toString());
		return SUCCESS;
	}
	
	/**
	 * 展示用户收到的个人信息
	 * @author wangzhongjin
	 * @time 2012-9-18 10:28:17
	 * @return
	 */
	public String listReceived(){
		QueryFilter filter = new QueryFilter(getRequest());
		filter.addFilter("Q_userId_L_EQ", ContextUtil.getCurrentUserId().toString());
		filter.addFilter("Q_shortMessage.msgType_SN_EQ", "1");
		filter.addFilter("Q_delFlag_SN_EQ", "0");
		List<InMessage> inMsgList = inMessageService.getAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		JSONSerializer serializer = new JSONSerializer();
		serializer.transform(new DateTransformer("yyyy-MM-dd HH:mm:ss"),new String[] { "shortMessage.sendTime"});
		buff.append(serializer.exclude(new String[]{"class"}).serialize(inMsgList));
		buff.append("}");
		jsonString=buff.toString();
		
		return SUCCESS;
	}
	
	/**
	 * 读信息
	 * @return
	 */
	public String know(){
		String strReceiveId=getRequest().getParameter("receiveId");
		Long receiveId=null;
		if(StringUtils.isNotEmpty(strReceiveId)){
			receiveId=Long.parseLong(strReceiveId);
		}		
		InMessage in=inMessageService.get(receiveId);
		in.setReadFlag((short)1);  //1标志为读
		inMessageService.save(in);
        setJsonString("{success:true}");
		return SUCCESS;
	}
	
	/**
	 * 单个或多个删除
	 * @return
	 */
	public String multiRemove(){
		String[]ids=getRequest().getParameterValues("ids");
		if(ids!=null){
			for(String id:ids){
				inMessage=inMessageService.get(Long.parseLong(id));
				inMessage.setDelFlag(HAVE_DELETE);
				inMessageService.save(inMessage);
			}
		}		
		jsonString="{success:true}";
		return SUCCESS;
	}
	
	/**
	 * 回复
	 * @return
	 */
	public String reply(){
		String strReplyId=getRequest().getParameter("receiveId");
		System.out.println("**********strReplyId************"+strReplyId);
		if(StringUtils.isNotEmpty(strReplyId)){
			Long replyId=Long.parseLong(strReplyId);
			inMessage=inMessageService.get(replyId);
			StringBuffer buff = new StringBuffer("{success:true,data:[");
			buff.append("{'messageId':"+inMessage.getShortMessage().getMessageId()+",'senderId':'"+inMessage.getShortMessage().getSenderId()+"','sender':'"+inMessage.getShortMessage().getSender()+"'}").append("]}");
			setJsonString(buff.toString());
		}
		else setJsonString("{success:false}");
		
		return SUCCESS;
	}
	
	/**
	 * 点击阅读
	 * @return
	 */
	public String read(){
		Long userId=ContextUtil.getCurrentUser().getUserId();
		boolean flag=false;
		if(userId!=null){
			inMessage=inMessageService.findByRead(userId);
			if(inMessage==null){
				flag=true;
				inMessage=inMessageService.findLatest(userId);
			}
			if(inMessage!=null){
//				inMessage.setReadFlag(InMessage.FLAG_READ);
//				inMessageService.save(inMessage);
				shortMessage=inMessage.getShortMessage();
				SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
				String date=sdf.format(shortMessage.getSendTime());
				StringBuffer buff=new StringBuffer("{success:true,message:");
				buff.append("{'receiveId':" + inMessage.getReceiveId()
						+ ",'messageForm':'" + inMessage.getMessageForm()
						+ "','formId':" + inMessage.getFormId()
						+ ",'readFlag':" + inMessage.getReadFlag()
						+ ",'messageId':" + shortMessage.getMessageId()
						+ ",'senderId':" + shortMessage.getSenderId()
						+ ",'sender':'" + shortMessage.getSender()
						+ "','content':'"
						+ shortMessage.getContent().replace("\n", " ")
						+ "','sendTime':'" + date + "','msgType':"
						+ shortMessage.getMsgType());
				if(!flag){
					InMessage in=inMessageService.findByRead(userId);
					if(in!=null){
						buff.append(",haveNext:true");
					}else{
						buff.append(",haveNext:false");
					}
				}else{
					buff.append(",haveNext:false");
				}
				buff.append("}}");
				setJsonString(buff.toString());
			}else{
				setJsonString("{success:false}");
			}
		}else{
			setJsonString("{success:true}");
		}
		return SUCCESS;
	}
	
	/**
	 * 更改阅读状态
	 * @return
	 */
	public String readFlag(){
		Long userId=ContextUtil.getCurrentUser().getUserId();
		if(userId!=null){
			inMessage=inMessageService.findByRead(userId);
			if(inMessage!=null){
				inMessage.setReadFlag(InMessage.FLAG_READ);
				inMessageService.save(inMessage);
			}
		}
		return SUCCESS;
	}
	
	/**
	 * 更改用户对应的阅读状态
	 * @return
	 */
	public String readUserFlag(){
		Long userId=ContextUtil.getCurrentUser().getUserId();
		String messageId = getRequest().getParameter("messageId");
		QueryFilter filter = new QueryFilter();
		filter.addFilter("Q_userId_L_EQ", userId.toString());
		filter.addFilter("Q_shortMessage.messageId_L_EQ", messageId);
		List<InMessage> inList = new ArrayList<InMessage>();
		if(userId!=null){
			inList = inMessageService.getAllNoRequest(filter);
			for(InMessage inMessage : inList){
				inMessage.setReadFlag(InMessage.FLAG_READ);
				inMessageService.save(inMessage);
			}
			StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
					.append(filter.getPagingBean().getTotalItems()).append(
							",result:");
			JSONSerializer json = new JSONSerializer();
			buff.append(json.serialize(inList));
			buff.append("}");
			jsonString = buff.toString();
		}
		return SUCCESS;
	}
	
	public String count(){
		Integer in=inMessageService.findByReadFlag(ContextUtil.getCurrentUser().getUserId());
		setJsonString("{success:true,count:'"+in+"'}");
		return SUCCESS;
	}	
	
	/**
	 * 首页读取详细信息内容
	 * 
	 * 
	 */
	public String detail(){
		String strReceiveId=getRequest().getParameter("receiveId");
		if(StringUtils.isNotEmpty(strReceiveId)){
			Long receiveId=new Long(strReceiveId);
			inMessage=inMessageService.get(receiveId);
			inMessage.setReadFlag((short)1);  //标识为已读
			inMessageService.save(inMessage);
		}
		return "detail";
	}
	
	/**
	 * 首页显示信息列表
	 */
	public String display(){
		QueryFilter filter = new QueryFilter(getRequest());
		filter.addFilter("Q_userId_L_EQ", ContextUtil.getCurrentUserId().toString());
		filter.addFilter("Q_shortMessage.msgType_SN_EQ", "1");
		filter.addFilter("Q_delFlag_SN_EQ", "0");
		List<InMessage> inMsgList = inMessageService.getAll(filter);
		
		getRequest().setAttribute("messageList",inMsgList);
		return "display";
	}
	
	public String multiRead(){
		String[]ids=getRequest().getParameterValues("ids");
		if(ids!=null){
			for(String id:ids){
				inMessage=inMessageService.get(Long.parseLong(id));
				inMessage.setReadFlag(InMessage.FLAG_READ);
				inMessageService.save(inMessage);
			}
		}		
		jsonString="{success:true}";
		return SUCCESS;
	}
	
	public void listMonitor() {
		List<Object[]> list;
		AppUser appUser=ContextUtil.getCurrentUser();
		  list=inMessageService.searchInMessageMonitor(appUser.getUserId());
		List<InMessage> inList=new ArrayList<InMessage>();
		for(int i=0;i<list.size();i++){
			    InMessage inMessage=(InMessage)list.get(i)[0];
			    inList.add(inMessage);
		}		
		
		List<InMessage> listReceivedMes=inMessageService.searchReceivedMsgInMessageMonitor(ContextUtil.getCurrentUserId());
	
		
		try {
			inList.addAll(listReceivedMes);
			// List list2 = new DozerHelper().convert(list);
			writeToPage(Boolean.valueOf(true), "查询成功", inList);
		} catch (Exception e) {
			e.printStackTrace();

			writeToPage(Boolean.valueOf(false), "操作失败，请重新操作或联系管理员", null);
		}		
	}
	
	
	public void getById() {
		String receiveId=getRequest().getParameter("receiveId");
		if(StringUtils.isNotEmpty(receiveId)){
			InMessage inMessage=inMessageService.get(Long.parseLong(receiveId));
			writeToPage(Boolean.valueOf(true), "回复成功", inMessage);
		}
		else writeToPage(Boolean.valueOf(false), "回复失败", null);		
	}
	
//	public String replyMonitor(){
//		String strReplyId=getRequest().getParameter("receiveId");
//		if(StringUtils.isNotEmpty(strReplyId)){
//			Long replyId=Long.parseLong(strReplyId);
//			inMessage=inMessageService.get(replyId);
//			writeToPage(Boolean.valueOf(true), "回复成功", inMessage);
//		}
//		else writeToPage(Boolean.valueOf(false), "回复失败", null);
//		
//		return SUCCESS;
//	}	
	
}
