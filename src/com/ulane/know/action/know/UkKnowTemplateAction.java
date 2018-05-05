package com.ulane.know.action.know;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/

import java.io.File;
import java.io.FileInputStream;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;

import com.htsoft.core.Constants;
import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.AppUtil;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.util.FileUtil;
import com.htsoft.core.util.JsonUtil;
import com.htsoft.core.util.json.JSONArray;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.oa.model.system.Dictionary;
import com.htsoft.oa.service.system.DictionaryService;
import com.ulane.base.model.xitong.SysTemType;
import com.ulane.base.service.xitong.SysTemTypeService;
import com.ulane.know.model.know.UkKnowKeywordType;
import com.ulane.know.model.know.UkKnowTemplate;
import com.ulane.know.service.know.UkKnowTemplateService;

import flexjson.JSONSerializer;
import flexjson.transformer.DateTransformer;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class UkKnowTemplateAction extends BaseAction{
	@Resource
	private UkKnowTemplateService ukKnowTemplateService;
	@Resource
	private SysTemTypeService sysTemTypeService;
	@Resource
	private DictionaryService dictionaryService;
	private UkKnowTemplate ukKnowTemplate;
	//默认的版本号
	private static final long ukKnowVersion = 1;
	private Long knowTmpId;

	public Long getKnowTmpId() {
		return knowTmpId;
	}

	public void setKnowTmpId(Long knowTmpId) {
		this.knowTmpId = knowTmpId;
	}

	public UkKnowTemplate getUkKnowTemplate() {
		return ukKnowTemplate;
	}

	public void setUkKnowTemplate(UkKnowTemplate ukKnowTemplate) {
		this.ukKnowTemplate = ukKnowTemplate;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		filter.addFilter("Q_isDelete_L_EQ", String.valueOf(Constants.FLAG_UNDELETED));
		List<UkKnowTemplate> list= ukKnowTemplateService.getAll(filter);
		
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(filter.getPagingBean().getTotalItems()).append(",result:");
		
		JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
		
		buff.append(jsonSer.serialize(list));
		buff.append("}");
		
		jsonString=buff.toString();
		
		return SUCCESS;
	}
	/**
	 * 批量启用
	 * @return
	 */
	public String multiStart(){
		
		String[]ids=getRequest().getParameterValues("ids");
		if(ids!=null){
			for(String id:ids){
				UkKnowTemplate ukt = ukKnowTemplateService.get(new Long(id));
				ukt.setKnowStatus(1);
				ukt.setUpdateDate(new Date());
				ukt.setUpdateBy(ContextUtil.getCurrentUser().getUsername());
				ukKnowTemplateService.save(ukt);
			}
		}
		
		jsonString="{success:true}";
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
				UkKnowTemplate ukt = ukKnowTemplateService.get(Long.parseLong(id));
				ukt.setKnowStatus(2);
				ukt.setUpdateDate(new Date());
				ukt.setUpdateBy(ContextUtil.getCurrentUser().getUsername());
				ukKnowTemplateService.save(ukt);
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
		String knowTmpId = getRequest().getParameter("knowTmpId");
		UkKnowTemplate ukKnowTemplate=ukKnowTemplateService.get(Long.parseLong(knowTmpId));
		
		JSONSerializer jsonSer = new JSONSerializer();
//		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		jsonSer.transform(new DateTransformer("yyyy-MM-dd"), new String[]{"beginTime","closeTime","updateTime"});
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(jsonSer.serialize(ukKnowTemplate));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
//		importVm();
		if(ukKnowTemplate.getKnowTmpId()==null){
			ukKnowTemplate.setCreateBy(ContextUtil.getCurrentUser().getUsername());
			ukKnowTemplate.setIsDelete((long)Constants.FLAG_UNDELETED);
			ukKnowTemplate.setCreateDate(new Date());
			ukKnowTemplate.setKnowStatus(1);
			ukKnowTemplate.setKnowVersion(ukKnowVersion);
			ukKnowTemplateService.save(ukKnowTemplate);
		}
		else{
			UkKnowTemplate orgUkKnowTemplate=ukKnowTemplateService.get(ukKnowTemplate.getKnowTmpId());
			
			orgUkKnowTemplate.setUpdateBy(ContextUtil.getCurrentUser().getFamilyName());
			orgUkKnowTemplate.setUpdateDate(new Date());
			
			try{
				BeanUtil.copyNotNullProperties(orgUkKnowTemplate, ukKnowTemplate);
				orgUkKnowTemplate.setUpdateDate(new Date());
				orgUkKnowTemplate.setUpdateBy(ContextUtil.getCurrentUser().getUsername());
//				ukKnowTemplateService.save(orgUkKnowTemplate);
				ukKnowTemplateService.merge(orgUkKnowTemplate);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
	
	public String importVm(){
		String fileName = getRequest().getParameter("fileName");
		String uploadFold = System.getProperty("user.dir");

		File file = new File(uploadFold, fileName);
		String excelFilePath = file.toString();
		try {
			FileInputStream excelFile = new FileInputStream(excelFilePath);
		}catch (Exception e) {
			e.printStackTrace();
		}
		
		return "sd;";
	}
	
	public String combo(){
		String key = getRequest().getParameter("key");
		List<UkKnowTemplate> list = ukKnowTemplateService.getByIsDelete((long)Constants.ENABLED,key);
		StringBuffer buff = new StringBuffer("[");
		for (UkKnowTemplate ukt : list) {
			buff.append("['").append(ukt.getKnowTmpId()).append("','")
					.append(ukt.getTmpName()).append("'],");

		}
		if (list.size() > 0) {
			buff.deleteCharAt(buff.length() - 1);
		}
		buff.append("]");
		setJsonString(buff.toString());
		return SUCCESS;
	}
	
	/**
	 * 添加及保存操作
	 */
	public String saveTemplate(){
		    String projName = "default";
		    String tmpName=getRequest().getParameter("tmpName");
			String extFormDef=getRequest().getParameter("extFormDef");
			
			UkKnowTemplate ukKnowTemplate = ukKnowTemplateService.get(knowTmpId);
			ukKnowTemplate.setTempContent(extFormDef);
			
			
			//保存该表单的Ext项目配置,为下次加载修改恢复提供数据来源
			String extDef=getRequest().getParameter("extDef");
			ukKnowTemplate.setExtDef(extDef);
			
			UkKnowTemplate ukKnowTemplate1 = ukKnowTemplateService.saveUkKnowTemplate(ukKnowTemplate);
			if(ukKnowTemplate1 != null){
				projName = ukKnowTemplate1.getKnowTmpType().getMapName();
			}
			//取得流程对应的定义，把该任务的表单写至表单模板的js中，同时生成对应的映射文件.
			String formItemDef=getRequest().getParameter("formItemDef");
			
			logger.info("extFormDef:" + extFormDef);
			logger.info("formItemDef:" + formItemDef);
			
			String formPath=AppUtil.getAppAbsolutePath() + "/WEB-INF/FlowForm/FormVm/" + projName+"/"+ukKnowTemplate1.getKnowTmpId()+"/";
			
			File flowDirPath=new File(formPath);
			if(!flowDirPath.exists()){//若不存在目录，则创建
				flowDirPath.mkdirs();
			}
			
			if(projName!=null){
				//把表单的定义写至文件
				String extFilePath=formPath + "/" + ukKnowTemplate1.getKnowVersion() + ".vm";
				FileUtil.writeFile(extFilePath,extFormDef);
			}
		
		return SUCCESS;
		
	}
	
	public String sub(){
		String parentId = getRequest().getParameter("parentId");
//		List<SysTemType> typeList = sysTemTypeService.getByPath(new Long(parentId));
//		StringBuffer sb = new StringBuffer();
//		for(SysTemType sysTemType : typeList){
//			sb.append(sysTemType.getTmpTypeId());
//			sb.append(",");
//		}
//		if (typeList.size() > 0) {
//			sb.deleteCharAt(sb.length() - 1);
//		}
		QueryFilter filter = new QueryFilter();
		filter.addFilter("Q_knowTmpType.dicId_L_EQ", parentId);
//		List<UkKnowTemplate> tempList = ukKnowTemplateService.getByInTypeId(sb.toString());
		List<UkKnowTemplate> tempList = ukKnowTemplateService.getAllNoRequest(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(tempList.size()).append(",result:");
		
		JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
		
		buff.append(jsonSer.serialize(tempList));
		buff.append("}");
		
		jsonString=buff.toString();
		return SUCCESS;
	}
	
	/**
	 * 根据传入的dicID产生字典树
	 * @author zhangyl 
	 * @createtime 2012年10月25日 15:12:43
	 * @return
	 */
	public String treeByMapName() {
		StringBuffer buff = new StringBuffer();
		buff.append("[{id:'" + 0 + "',text:'模板类型',expanded:true,children:[");
		String mapName = getRequest().getParameter("mapName");
		String relDic = getRequest().getParameter("relDic");
		String dicId = getRequest().getParameter("dicID");
		QueryFilter filter = new QueryFilter();
		filter.addFilter("Q_mapName_S_EQ", mapName);
		
		//relDic限制
		if(StringUtils.isNotBlank(relDic)) {
			filter.addFilter("Q_relDic_L_EQ", relDic);
		}
		//dicId限制
		if(StringUtils.isNotBlank(dicId)) {
			filter.addFilter("Q_dicId_L_EQ", dicId);
		}
		
		List<Dictionary> dicList = dictionaryService.getAllNoRequest(filter); // 多个父节点

		for (Dictionary type : dicList) {
			buff.append("{id:'" + type.getDicId() + "',text:'"
					+ type.getItemValue() + "',leaf:true},");
		}
		if (!dicList.isEmpty()) {
			buff.deleteCharAt(buff.length() - 1);
		}
		buff.append("]}]");
		setJsonString(buff.toString());
		return SUCCESS;
	}
	
	

}
