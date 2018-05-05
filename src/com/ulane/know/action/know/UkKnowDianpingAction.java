package com.ulane.know.action.know;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
 */
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import javax.annotation.Resource;

import com.google.gson.Gson;
import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.oa.service.system.AppUserService;
import com.ulane.know.model.know.UkKnowDianping;
import com.ulane.know.model.know.UkSysKnow;
import com.ulane.know.service.know.UkKnowDianpingService;
import com.ulane.know.service.know.UkSysKnowService;

import flexjson.JSONSerializer;
import flexjson.transformer.DateTransformer;

/**
 * 
 * @author cf0666@gmail.com
 * 
 */
public class UkKnowDianpingAction extends BaseAction {
	@Resource
	private UkKnowDianpingService ukKnowDianpingService;
	@Resource
	private UkSysKnowService ukSysKnowService;
	private UkKnowDianping ukKnowDianping;
	@Resource
	private UkSysKnowService sysKnowService;
	@Resource
	protected AppUserService appUserService;

	private Long dianpingId;

	public Long getDianpingId() {
		return dianpingId;
	}

	public void setDianpingId(Long dianpingId) {
		this.dianpingId = dianpingId;
	}

	public UkKnowDianping getUkKnowDianping() {
		return ukKnowDianping;
	}

	public void setUkKnowDianping(UkKnowDianping ukKnowDianping) {
		this.ukKnowDianping = ukKnowDianping;
	}

	/**
	 * 显示列表
	 */
	public String list() {

		QueryFilter filter = new QueryFilter(getRequest());
		List<UkKnowDianping> list = ukKnowDianpingService.getAll(filter);
		List<UkKnowDianping> newList = new ArrayList<UkKnowDianping>();
		for (UkKnowDianping udp : list) {
			UkSysKnow usk = udp.getUkSysKnow();
			if (usk != null) {
				Long knowid = usk.getKnowId();
				// udp.setKnowId(knowid);
				UkSysKnow tmpUSK = ukSysKnowService.get(knowid);
				udp.setUkSysKnow(tmpUSK);
			}
			newList.add(udp);
		}

		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(filter.getPagingBean().getTotalItems()).append(
						",result:");

		// Gson gson=new Gson();
		// buff.append(gson.toJson(newList, type));
		JSONSerializer json = new JSONSerializer();
		json.transform(new DateTransformer("yyyy-MM-dd"),
				new String[] { "dianpingTime" });
		buff.append(json.serialize(newList));
		buff.append("}");

		jsonString = buff.toString();

		return SUCCESS;
	}

	/**
	 * 显示列表
	 */
	// public String dianpinglist(){
	//
	// QueryFilter filter=new QueryFilter(getRequest());
	// String start = getRequest().getParameter("start");
	// List<UkKnowDianping> list= ukKnowDianpingService.getAll(filter);
	//
	// Gson gson = new Gson();
	// SimpleDateFormat simpleDate = new
	// SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	// StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
	// .append(filter.getPagingBean().getTotalItems()).append(",result:[");
	// for(UkKnowDianping ukdp : list){
	// buff.append("{commentId:'")
	// .append(ukdp.getDianpingId())
	// .append("',subject:").append(gson.toJson("不懂"))//为什么必须有这个字段才展示点评列表呢？
	//
	// .append(",content:")
	// .append(gson.toJson(ukdp.getDianpingComment()))
	// .append(",createtime:'")
	// .append(simpleDate.format(ukdp.getDianpingTime()))
	// .append("',fullname:'")
	// .append(ukdp.getUserid())
	// .append("',start:'")
	// .append(start)
	// .append("'},");
	// }
	//
	// if(list.size()>0){
	// buff.deleteCharAt(buff.length()-1);
	// }
	// buff.append("]}");
	//
	// jsonString=buff.toString();
	// // jsonString =
	// "{success:true,'totalCounts':3,result:[{commentId:'10160',subject:\"中方:菲外长称中国是许多南海国家威胁误导舆论\",content:\"我们不要惧怕战争！美国人自认他们的生命最珍贵，但他们的战争没停止过，美国人喜欢把战火燃烧在他国，但他们也必须知道，中国有能力把战火引向美国，一定程度上，美国对中 国是有顾忌的。菲佣别错判形势，中国打到你们妈里那（马尼拉）是很容易的。\",createtime:'2012-04-26 12:55:59',fullname:'超级管理员',start:'0'}]}";
	// // jsonString =
	// "{success:true,'totalCounts':1,result:[{commentId:'1',subject:\"靠\",content:\"hahahhahah\",createtime:'2012-03-15 00:00:00',fullname:'1',start:'0'}]}";
	// return SUCCESS;
	// }
	/**
	 * 批量删除
	 * 
	 * @return
	 */
	public String multiDel() {

		String[] ids = getRequest().getParameterValues("ids");
		if (ids != null) {
			for (String id : ids) {
				// ukKnowDianpingService.remove(new Long(id));
				UkKnowDianping ukd = ukKnowDianpingService.get(Long
						.parseLong(id));
				ukd.setKnowStatus(2);// 伪删除，修改状态为停用
				try {
					ukKnowDianpingService.save(ukd);
				} catch (Exception e) {
					e.printStackTrace();
				}
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
		UkKnowDianping ukKnowDianping = ukKnowDianpingService.get(dianpingId);

		// Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		JSONSerializer json = new JSONSerializer();
		// 将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		json.transform(new DateTransformer("yyyy-MM-dd"),
				new String[] { "dianpingTime" });
		sb.append(json.serialize(ukKnowDianping));
		sb.append("}");
		setJsonString(sb.toString());

		return SUCCESS;
	}
	
	public String getDetail(){
		String knowId = getRequest().getParameter("knowId");
		QueryFilter filter = new QueryFilter();
		filter.addFilter("Q_ukSysKnow.knowId_L_EQ", knowId);
		filter.addFilter("Q_userid_L_EQ", ContextUtil.getCurrentUserId().toString());
		List<UkKnowDianping> dianping = ukKnowDianpingService.getAllNoRequest(filter);
		if(dianping!=null && dianping.size()>0){
			UkKnowDianping knowDianping = dianping.get(0);
			JSONSerializer json = new JSONSerializer();
			// 将数据转成JSON格式
			StringBuffer sb = new StringBuffer("{success:true,data:");
			json.transform(new DateTransformer("yyyy-MM-dd"),
					new String[] { "dianpingTime" });
			sb.append(json.serialize(knowDianping));
			sb.append("}");
			setJsonString(sb.toString());
		}
		
		return SUCCESS;
	}

	// /**
	// * 添加及保存操作
	// */
	// public String save(){
	// String knowId = getRequest().getParameter("use_knowId");
	// String knowStatus = getRequest().getParameter("use_knowStatus");
	// String dianpingtime =
	// getRequest().getParameter("ukKnowDianping.dianpingTime");
	// if(StringUtils.isNotEmpty(dianpingtime)){
	// java.text.DateFormat df = new java.text.SimpleDateFormat("yyyy-MM-dd");
	// java.sql.Timestamp ts = null;
	// try {
	// java.util.Date dd = df.parse(dianpingtime);
	// ts = new java.sql.Timestamp(dd.getTime());
	// ukKnowDianping.setDianpingTime(ts);
	// } catch (ParseException e) {
	// e.printStackTrace();
	// }
	// }
	//
	// if(StringUtils.isNotEmpty(knowId)){
	// // ukKnowDianping.setKnowId(Long.parseLong(knowId));
	// ukKnowDianping.setUkSysKnow(ukSysKnowService.get(Long.parseLong(knowId)));
	// } else {
	// ukKnowDianping.setUkSysKnow(null);
	// }
	// if(StringUtils.isNotEmpty(knowStatus)){
	// ukKnowDianping.setKnowStatus(Integer.valueOf(knowStatus));
	// }
	// if(ukKnowDianping.getDianpingId()==null){
	// ukKnowDianpingService.save(ukKnowDianping);
	// }else{
	// UkKnowDianping
	// orgUkKnowDianping=ukKnowDianpingService.get(ukKnowDianping.getDianpingId());
	// try{
	// BeanUtil.copyNotNullProperties(orgUkKnowDianping, ukKnowDianping);
	// ukKnowDianpingService.save(orgUkKnowDianping);
	// }catch(Exception ex){
	// ex.printStackTrace();
	// logger.error(ex.getMessage());
	// }
	// }
	// setJsonString("{success:true}");
	// return SUCCESS;
	//
	// }
	/**
	 * 添加及保存操作
	 */
	public String save() {
		// 被回复的新闻回复次数加1
		String dpKnowId = getRequest().getParameter("knowId");
		String beizhu = getRequest().getParameter("beizhu");
		String dianpingValue = getRequest().getParameter("dianpingValue");
		
		QueryFilter filter = new QueryFilter(getRequest());
		filter.addFilter("Q_ukSysKnow.knowId_L_EQ", dpKnowId);
		filter.addFilter("Q_userid_L_EQ", ContextUtil.getCurrentUserId().toString());
		List<UkKnowDianping> dianpingList = ukKnowDianpingService.getAll(filter);
		Long knowId = Long.parseLong(dpKnowId);
		if(dianpingList.size()==0){
//			String biaoti = getRequest().getParameter("biaoti");
//			Integer type = Integer.parseInt(getRequest().getParameter("libie"));
			UkSysKnow know = ukSysKnowService.get(knowId);
			ukKnowDianping = new UkKnowDianping();
//			ukKnowDianping.setTitle(biaoti);
//			ukKnowDianping.setDianpingValue(type);
			ukKnowDianping.setDianpingComment(beizhu);
			ukKnowDianping.setUserid(ContextUtil.getCurrentUserId());
			ukKnowDianping.setDianpingTime(new Timestamp(new Date().getTime()));
			ukKnowDianping.setUkSysKnow(know);
			ukKnowDianping.setKnowStatus(1);
			ukKnowDianping.setDianpingValue(new Integer(dianpingValue));
			ukKnowDianping.setUkSysKnow(know);
			ukKnowDianpingService.save(ukKnowDianping);
			
			if (know.getSysKnowStatus().equals(5)) {
				know.setDianpingCount(know.getDianpingCount() + 1);
			}
			know.setAverageCount(ukKnowDianpingService.getAvgValue(knowId));
			ukSysKnowService.save(know);

			setJsonString("{success:true,msg:'点评成功!'}");
		}else{
//			setJsonString("{success:false,msg:'您已经点评过了,请勿重复点评!'}");
			UkKnowDianping orgKnowDp = dianpingList.get(0);
			orgKnowDp.setDianpingComment(beizhu);
			orgKnowDp.setDianpingTime(new Timestamp(new Date().getTime()));
			orgKnowDp.setDianpingValue(new Integer(dianpingValue));
			ukKnowDianpingService.merge(orgKnowDp);
			
			UkSysKnow know = ukSysKnowService.get(knowId);
			know.setAverageCount(ukKnowDianpingService.getAvgValue(knowId));
			ukSysKnowService.save(know);
			setJsonString("{success:false,msg:'成功修改点评!'}");
		}
		
		return SUCCESS;
	}

	/**
	 * 添加及保存操作点评内容
	 */
	public String dianpingsave() {
		// 点评的次数加1
		UkSysKnow sysKnow = sysKnowService.get(ukKnowDianping.getKnowId());

		if ("".equals(sysKnow.getDianpingCount())
				|| null == sysKnow.getDianpingCount()) {
			sysKnow.setDianpingCount(1);
			sysKnowService.merge(sysKnow);
		} else {
			sysKnow.setDianpingCount(sysKnow.getDianpingCount() + 1);
			sysKnowService.merge(sysKnow);
		}
		ukKnowDianping.setUkSysKnow(sysKnow);
		ukKnowDianping.setUserid(ContextUtil.getCurrentUserId());
		ukKnowDianping
				.setDianpingTime(new Timestamp(System.currentTimeMillis()));
		ukKnowDianpingService.save(ukKnowDianping);
		setJsonString("{success:true}");
		return SUCCESS;
	}

	/**
	 * 显示点评信息列表
	 */
	public String dianpinglist() {

		QueryFilter filter = new QueryFilter(getRequest());
		// String start = getRequest().getParameter("start");
		List<UkKnowDianping> list = ukKnowDianpingService.getAll(filter);
		Gson gson = new Gson();
		SimpleDateFormat simpleDate = new SimpleDateFormat(
				"yyyy-MM-dd HH:mm:ss");
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(filter.getPagingBean().getTotalItems()).append(
						",result:[");
		for (UkKnowDianping knowDianping : list) {
			buff.append("{dianpingId:'")
					.append(knowDianping.getDianpingId())
					.append("',dianpingComment:")
					.append(gson.toJson(knowDianping.getDianpingComment()))
					.append(",userid:")
					.append(gson.toJson(appUserService.get(
							knowDianping.getUserid()).getUsername()))
					.append(",dianpingTime:'")
					.append(simpleDate.format(knowDianping.getDianpingTime()))
					.append("'},");
		}
		if (list.size() > 0) {
			buff.deleteCharAt(buff.length() - 1);
		}
		buff.append("]}");

		jsonString = buff.toString();
		return SUCCESS;
	}

	/**
	 * 显示系统知识列表
	 */
	public String listSysKnow() {
		String keyWord = getRequest().getParameter("ukKnowKeyWord");
		QueryFilter filter = new QueryFilter(getRequest());
		filter.addFilter("Q_ukKnowDianpings.userid_L_EQ", ContextUtil
				.getCurrentUserId().toString());
		if(keyWord!=null && !keyWord.equals("")){
//			filter.addFilter("Q_ukKnowKeywords.keyWord_S_LK", keyWord);
			filter.addFilter("Q_knowKeyWords_S_LK", keyWord);
		}
		filter.addSorted("ukKnowDianpings.dianpingTime", "desc");
		// filter.addFilter("Q_viewCount_N_EQ", "desc");
		List<UkSysKnow> list = sysKnowService.getAll(filter);
//		Set set = new HashSet();// 保持快速去重复值，必须用HashSet
//		for (Iterator it = list.iterator(); it.hasNext();) {
//			UkSysKnow item = (UkSysKnow) it.next();
//			if (set.add(item) == false) {
//				it.remove();
//			}
//		}
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(filter.getPagingBean().getTotalItems()).append(",result:[");
		JSONSerializer serializer = new JSONSerializer();
		serializer.transform(new DateTransformer("yyyy-MM-dd"), new String[] {
				"enableTime", "pastTime"});
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		int i = 0;
		for(UkSysKnow sysKnow : list){
			if(i++>0)buff.append(",");
			buff.append(serializer
					.include("knowId","tiTle","busiType","knowKeyWords","enableTime","pastTime","sysKnowStatus","viewCount","dianpingCount","sysKnowComment","plus1","plus2","plus3","plus4","plus5","plus6","plus7","plus8","isDel","sysKnowVersion","createDate","updateDate","userid","fankuiShu","busiTypeMapName","delRemark","delReason","accessManage","averageCount")
					.include("ukKnowApprove.knowApproveId","ukKnowApprove.runid","ukKnowTypes.knowTypeId","ukKnowTypes.name","ukKnowKeywords.keywordId","ukKnowKeywords.keyWord","ukKnowApplys.applyId","ukKnowApplys.runid","ukKnowTemplate.knowTmpId","ukKnowTemplate.tmpName","createBy.userId","createBy.fullname","fileAttachs.fileId","fileAttachs.fileName","fileAttachs.filePath")
					.exclude("*").serialize(sysKnow));
			QueryFilter dpFilter = new QueryFilter();
			dpFilter.addFilter("Q_ukSysKnow.knowId_L_EQ", sysKnow.getKnowId().toString());
			dpFilter.addFilter("Q_userid_L_EQ", ContextUtil.getCurrentUserId().toString());
			List<UkKnowDianping> dianpingList = ukKnowDianpingService.getAllNoRequest(dpFilter);
			if(dianpingList!=null && dianpingList.size()>0){
				String dpTime = df.format(dianpingList.get(0).getDianpingTime());
				buff.deleteCharAt(buff.length() - 1); // 去掉最后的大括号
				buff.append(",\"dianpingValue\":"+dianpingList.get(0).getDianpingValue());
				buff.append(",\"dianpingTime\":\""+dpTime+"\"");
				buff.append("}");
			}
		}
		
		buff.append("]}");

		jsonString = buff.toString();
		return SUCCESS;
	}
	
	public String hasReadKnow(){
		String knowId = getRequest().getParameter("knowId");
		String busiType = getRequest().getParameter("busiType");
		boolean hasRead = ukKnowDianpingService.hasKnowRead(knowId,busiType);
		StringBuffer buff = new StringBuffer("{success:true,'hasRead':").append(hasRead).append("}");
		jsonString = buff.toString();
		
		return SUCCESS;
	}
}
