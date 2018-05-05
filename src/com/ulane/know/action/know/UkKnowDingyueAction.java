package com.ulane.know.action.know;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.Iterator;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;

import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.util.JsonUtil;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.oa.model.system.Dictionary;
import com.htsoft.oa.service.system.AppUserService;
import com.htsoft.oa.service.system.DictionaryService;
import com.ulane.know.model.know.UkKnowDingyue;
import com.ulane.know.model.know.UkKnowType;
import com.ulane.know.model.know.UkSysKnow;
import com.ulane.know.service.know.UkKnowDingyueService;
import com.ulane.know.service.know.UkKnowTypeService;
import com.ulane.know.service.know.UkSysKnowService;

import flexjson.JSONSerializer;
import flexjson.transformer.DateTransformer;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class UkKnowDingyueAction extends BaseAction{
	@Resource
	private UkKnowDingyueService ukKnowDingyueService;
	@Resource
	private UkKnowTypeService ukKnowTypeService;
	@Resource
	private AppUserService appUserService;
	@Resource
	private UkSysKnowService ukSysKnowService;
	@Resource
	private DictionaryService dictionaryService;
	private UkKnowDingyue ukKnowDingyue;
	
	private Long dingyueId;
	private Long dingyueUserid;

	public Long getDingyueUserid() {
		return dingyueUserid;
	}

	public void setDingyueUserid(Long dingyueUserid) {
		this.dingyueUserid = dingyueUserid;
	}

	public Long getDingyueId() {
		return dingyueId;
	}

	public void setDingyueId(Long dingyueId) {
		this.dingyueId = dingyueId;
	}

	public UkKnowDingyue getUkKnowDingyue() {
		return ukKnowDingyue;
	}

	public void setUkKnowDingyue(UkKnowDingyue ukKnowDingyue) {
		this.ukKnowDingyue = ukKnowDingyue;
	}

	/**
	 * 显示所有列表
	 */
	public String list(){
		
		QueryFilter filter = new QueryFilter(getRequest());
		List<UkKnowDingyue> list = ukKnowDingyueService.getAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(filter.getPagingBean().getTotalItems()).append(
						",result:[");
		JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
		int i = 0;
		for (UkKnowDingyue type : list) {
			if (i++ > 0)
				buff.append(",");
			buff.append(jsonSer.serialize(type));
			buff.deleteCharAt(buff.length() - 1); // 去掉最后的大括号
			buff.append(",\"userName\":\""+appUserService.get(type.getUserid()).getFullname()+"\"");
			buff.append("}");
		}
		buff.append("]}");
		jsonString=buff.toString();
		
		return SUCCESS;
	}
	
	/**
	 * 显示所有列表
	 */
	public String dingYueList(){
		String start = getRequest().getParameter("start");						
		String limit = getRequest().getParameter("limit");		
		String STitle = getRequest().getParameter("Q_ukSysKnow.tiTle_S_LK");		
		String SBusiType = getRequest().getParameter("Q_ukSysKnow.busiType_L_EQ");		
		
		QueryFilter filter = new QueryFilter();
		filter.addFilter("Q_userid_L_EQ", ContextUtil.getCurrentUserId().toString());
		List<UkKnowDingyue> list = ukKnowDingyueService.getAllNoRequest(filter);
		UkKnowDingyue ukKnowDingyue = list.get(0);
		String busiType = ukKnowDingyue.getBusiType();
		String knowType = ukKnowDingyue.getKnowTypeDingyue();
		String keyWord = ukKnowDingyue.getKnowKeyword();
		List<UkSysKnow> knowlist =  ukSysKnowService.findByDingYue(new Integer(start), new Integer(limit), busiType, knowType, keyWord, STitle, SBusiType);
		
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(ukSysKnowService.findByDingYueCount(new Integer(start), new Integer(limit), busiType, knowType, keyWord, STitle, SBusiType)).append(",result:");
		JSONSerializer jsonSer = JsonUtil.getJSONSerializer(); 
		jsonSer.transform(new DateTransformer("yyyy-MM-dd"), new String[] {"enableTime", "pastTime", "createDate", "updateDate" });
		buff.append(jsonSer
				.include("knowId","tiTle","busiType","knowKeyWords","enableTime","pastTime","sysKnowStatus","viewCount","dianpingCount","sysKnowComment","plus1","plus2","plus3","plus4","plus5","plus6","plus7","plus8","isDel","sysKnowVersion","createDate","updateDate","userid","fankuiShu","busiTypeMapName","delRemark","delReason")
				.include("ukKnowApprove.knowApproveId","ukKnowApprove.runid","ukKnowTypes.knowTypeId","ukKnowTypes.name","ukKnowKeywords.keywordId","ukKnowKeywords.keyWord","ukKnowApplys.applyId","ukKnowApplys.runid","ukKnowTemplate","createBy.userId","createBy.fullname","fileAttachs.fileId","fileAttachs.fileName","fileAttachs.filePath")
				.exclude("*")
				.serialize(knowlist));
		buff.append("}");
		
		jsonString = buff.toString();
		
		return SUCCESS;
	}
	
	
	/**
	 * 订阅知识分类的树
	 * @return
	 */
	public String listJson(){
		String opt = getRequest().getParameter("opt");
		StringBuffer buff = new StringBuffer();
		if (StringUtils.isNotEmpty(opt)) {
			buff.append("[");
		} else {
			buff.append("[{id:'" + 0 + "',text:'" + "ROOT"
					+ "',expanded:true,checked:'none',children:[");
		}
		List<UkKnowType> listParent = ukKnowTypeService
				.findByParentId(new Long(0));// 最顶层父节点
		for (UkKnowType ktp : listParent) {
			buff.append("{id:'" + ktp.getKnowTypeId() + "',text:'"
					+ ktp.getName() + "',");
			buff.append(listChild(ktp.getKnowTypeId()));
		}
		if (!listParent.isEmpty()) {
			buff.deleteCharAt(buff.length() - 1);
		}
		if (StringUtils.isNotEmpty(opt)) {
			buff.append("]");
		} else {
			buff.append("]}]");
		}
		setJsonString(buff.toString());
		return SUCCESS;
	}

	protected String listChild(Long id) {
		StringBuffer childStr = new StringBuffer("");
		List<UkKnowType> childs = ukKnowTypeService.findByParentId(id);
		if (childs.size() == 0) {
			childStr.append("checked:'none',leaf:true},");
			return childStr.toString();
		}
		childStr.append("checked:'none',children:[");
		for (UkKnowType ukt : childs) {
			childStr.append("{id:'" + ukt.getKnowTypeId() + "' ,text:'"
					+ ukt.getName() + "',");
			childStr.append(listChild(ukt.getKnowTypeId()));
		}
		childStr.deleteCharAt(childStr.length() - 1);
		childStr.append("]},");
		return childStr.toString();
	}
	
	/**
	 * 批量删除
	 * @return
	 */
	public String multiDel(){
		
		String[]ids=getRequest().getParameterValues("ids");
		if(ids!=null){
			for(String id:ids){
				ukKnowDingyueService.remove(new Long(id));
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
		UkKnowDingyue ukKnowDingyue=ukKnowDingyueService.get(dingyueId);
		
		JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
		// 将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,totalCounts:1,data:");
		sb.append(jsonSer.serialize(ukKnowDingyue));
		sb.deleteCharAt(sb.length() - 1);
		sb.append(",\"userName\":\""+ContextUtil.getCurrentUser().getFullname()+"\"");
		sb.append("}}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	
	public String getDingyueByUser(){
		UkKnowDingyue ukKnowDingyue=ukKnowDingyueService.findByUserid(dingyueUserid);
		
		JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
		// 将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,totalCounts:1,data:");
		sb.append(jsonSer.serialize(ukKnowDingyue));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	
	public String getByUserid(){
		UkKnowDingyue ukKnowDingyue = ukKnowDingyueService.findByUserid(ContextUtil.getCurrentUserId());
		JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
		// 将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,totalCounts:1,data:");
		sb.append(jsonSer.serialize(ukKnowDingyue));
		sb.append("}");
		setJsonString(sb.toString());
		return SUCCESS;
	}
	
	public String getUserid(){
		QueryFilter filter = new QueryFilter(getRequest());
		filter.addFilter("Q_userid_L_EQ", ContextUtil.getCurrentUserId().toString());
		List<UkKnowDingyue> listKnowDingyue = ukKnowDingyueService.getAll(filter);
		StringBuffer sb = new StringBuffer("{success:true,totalCounts:1,data:{");
		if(!listKnowDingyue.isEmpty()){
			UkKnowDingyue ukKnowDingyue = ukKnowDingyueService.findByUserid(ContextUtil.getCurrentUserId());
			sb.append("\"knowKeyword\":\""+ukKnowDingyue.getKnowKeyword()+"\",");
		}
		sb.append("\"dingyueUserid\":"+ContextUtil.getCurrentUserId());
		sb.append("}}");
		setJsonString(sb.toString());
		return SUCCESS;
	}
	
	public String showgrid() {
		UkKnowDingyue knowDingyue = ukKnowDingyueService.findByUserid(ContextUtil.getCurrentUserId());
		if(knowDingyue!=null && !knowDingyue.equals("")){
			String strDingyue = knowDingyue.getKnowTypeDingyue();
			String[] arrDingyue = strDingyue.split(",");
			
			StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(arrDingyue.length).append(",result:[{");
			for (int i = 0; i < arrDingyue.length; i++) {
				Long knowId = Long.parseLong(arrDingyue[i]);
				if (i > 0)
					buff.append(",{");
				buff.append("\"knowTypeId\":" + knowId);
				buff.append(",\"parentId\":\""+ukKnowTypeService.get(knowId).getParentId()+"\"");
				buff.append(",\"knowTypeName\":\""+ukKnowTypeService.get(knowId).getName()+"\"");
				buff.append("}");
			}
			buff.append("]}");
			jsonString=buff.toString();
		}
		return SUCCESS;
	}
	
	/**
	 * 查询已有业务分类
	 */
	public String selectedBusiType() {
		UkKnowDingyue knowDingyue = ukKnowDingyueService.findByUserid(ContextUtil.getCurrentUserId());
		if(knowDingyue!=null){
			String strBusitype = knowDingyue.getBusiType();
			if(strBusitype!=null && !strBusitype.equals("")){
				String[] arrDingyue = strBusitype.split(",");
				StringBuffer sb = new StringBuffer("[");
				List<Dictionary> dictionarys = dictionaryService.getByMapNameAndItemIndex("BUSI_TYPE", arrDingyue);
				for(Dictionary d:dictionarys){
					sb.append("['" + d.getItemIndex() + "','" + d.getItemValue() + "'],");
				}
				if(dictionarys.size()>0)
					sb.deleteCharAt(sb.length() - 1);
				sb.append("]");
				setJsonString(sb.toString());				
			}
		}

		return SUCCESS;
	}

	/**
	 * 查询可选业务分类
	 * 
	 * @return
	 */
	public String chooseBusiType() {
		
		List<Dictionary> chooseBusiType = dictionaryService.getByMapName("BUSI_TYPE");
		
		UkKnowDingyue knowDingyue = ukKnowDingyueService.findByUserid(ContextUtil.getCurrentUserId());
		if(knowDingyue!=null){
			String strBusitype = knowDingyue.getBusiType();
			if(strBusitype!=null && !strBusitype.equals("")){
				String[] arrDingyue = strBusitype.split(",");
				Iterator<Dictionary> i = chooseBusiType.iterator();
				for(String tmp_id :  arrDingyue){
					while(i.hasNext()){
						Dictionary d = i.next();
						if(d.getItemIndex().equals(tmp_id) && d.getMapName().equals("BUSI_TYPE")){
							i.remove();
						}
					}
				}
			}
		}
		
		StringBuffer sb = new StringBuffer("[");
		for(Dictionary d : chooseBusiType){
			sb.append("['" + d.getItemIndex() + "','" + d.getItemValue() + "'],");
		}
		if(chooseBusiType.size()>0)
			sb.deleteCharAt(sb.length() - 1);
		sb.append("]");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	/**
	 * 添加及保存操作
	 */
	public String save(){
		UkKnowDingyue knowDingyue = ukKnowDingyueService.findByUserid(ContextUtil.getCurrentUserId());
		String busiTypeIds = getRequest().getParameter("busiTypeSelect");
		String typeParams = getRequest().getParameter("typeParams");
		String keywordParams = getRequest().getParameter("keywordParams");
		
		String regEx="['\"\\[\\]]"; 
		Pattern p = Pattern.compile(regEx);
		Matcher matType = p.matcher(typeParams);
		Matcher matKey = p.matcher(keywordParams);
        
		String typeStr = matType.replaceAll("").trim();
        String keyStr = matKey.replaceAll("").trim();
		
		if(knowDingyue==null){
			
			ukKnowDingyue.setUserid(ContextUtil.getCurrentUserId());
			ukKnowDingyue.setBusiType(busiTypeIds);
			ukKnowDingyue.setKnowTypeDingyue(typeStr);
			ukKnowDingyue.setKnowKeyword(keyStr);
			ukKnowDingyueService.save(ukKnowDingyue);
		}else{
			UkKnowDingyue orgUkKnowDingyue=ukKnowDingyueService.findByUserid(ContextUtil.getCurrentUserId());
			try{
				BeanUtil.copyNotNullProperties(orgUkKnowDingyue, ukKnowDingyue);
				orgUkKnowDingyue.setBusiType(busiTypeIds);
				orgUkKnowDingyue.setKnowTypeDingyue(typeStr);
				orgUkKnowDingyue.setKnowKeyword(keyStr);
				ukKnowDingyueService.save(orgUkKnowDingyue);
			}catch(Exception ex){
				logger.error(ex.getMessage());
				ex.printStackTrace();
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
}
