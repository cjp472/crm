package com.htsoft.oa.action.flow;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.Iterator;
import java.util.List;
import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.dom4j.Attribute;
import org.dom4j.Document;
import org.dom4j.Element;

import java.lang.reflect.Type;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.XmlUtil;

import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.web.action.BaseAction;


import com.htsoft.oa.model.flow.ProDefinition;
import com.htsoft.oa.model.flow.ProHandleComp;
import com.htsoft.oa.service.flow.JbpmService;
import com.htsoft.oa.service.flow.ProDefinitionService;
import com.htsoft.oa.service.flow.ProHandleCompService;
/**
 * 
 * @author 
 *
 */
public class ProHandleCompAction extends BaseAction{
	@Resource
	private ProHandleCompService proHandleCompService;
	@Resource
	private ProDefinitionService proDefinitionService;
	@Resource
	private JbpmService jbpmService;

	private ProHandleComp proHandleComp;
	
	private Long handleId;

	public Long getHandleId() {
		return handleId;
	}

	public void setHandleId(Long handleId) {
		this.handleId = handleId;
	}

	public ProHandleComp getProHandleComp() {
		return proHandleComp;
	}

	public void setProHandleComp(ProHandleComp proHandleComp) {
		this.proHandleComp = proHandleComp;
	}
	/**
	 * 取得某个节点的决定执行的代码
	 * @return
	 */
	public String getDecision(){
		String defId=getRequest().getParameter("defId");
		String activityName=getRequest().getParameter("activityName");
		ProDefinition proDefinition=proDefinitionService.get(new Long(defId));
		List<ProHandleComp> proHandleComps=proHandleCompService.getByDeployIdActivityNameHandleType(proDefinition.getDeployId(), activityName, ProHandleComp.HANDLE_TYPE_HANDLER);
		String exeCode="";
		if(proHandleComps.size()>0){
			ProHandleComp proHandleComp=proHandleComps.get(0);
			exeCode=proHandleComp.getExeCode();
		}
		Gson gson=new Gson();
		jsonString="{success:true,data:{exeCode:"+gson.toJson(exeCode)+"}}";
		
		return SUCCESS;
	}
	
	public String getCode(){
		HttpServletRequest request=getRequest();
		String activityName=request.getParameter("activityName");
		String defId=request.getParameter("defId");
		String includeDecision=request.getParameter("includeDecision");
		
		String startExeCode="";
		String endExeCode="";
		String decisonExeCode="";
		ProDefinition proDefinition=proDefinitionService.get(new Long(defId));
		
		ProHandleComp startEventHandle=proHandleCompService.getProHandleComp(proDefinition.getDeployId(), activityName, ProHandleComp.EVENT_START);
		ProHandleComp endEventHandle=proHandleCompService.getProHandleComp(proDefinition.getDeployId(), activityName, ProHandleComp.EVENT_END);
		
		if(startEventHandle!=null && StringUtils.isNotEmpty(startEventHandle.getExeCode())){
			startExeCode=startEventHandle.getExeCode();
		}
		
		if(endEventHandle!=null && StringUtils.isNotEmpty(endEventHandle.getExeCode())){
			endExeCode=endEventHandle.getExeCode();
		}
		
		if("true".equals(includeDecision)){
			List<ProHandleComp> proHandleCompDecisons=proHandleCompService.getByDeployIdActivityNameHandleType(proDefinition.getDeployId(), activityName, ProHandleComp.HANDLE_TYPE_HANDLER);
			if(proHandleCompDecisons.size()>0){
				ProHandleComp proHandleComp=proHandleCompDecisons.get(0);
				if(StringUtils.isNotEmpty(proHandleComp.getExeCode())){
					decisonExeCode=proHandleComp.getExeCode();
				}
			}
		}
		
		Gson gson=new Gson();
		jsonString="{success:true,startExeCode:"+gson.toJson(startExeCode)+",endExeCode:"+gson.toJson(endExeCode)+",decisionExeCode:"+gson.toJson(decisonExeCode)+"}";
		
		return SUCCESS;
	}
	
	/**
	 * 设置事件代码
	 * @return
	 */
	public String saveCode(){
		HttpServletRequest request=getRequest();
		
		String startExeCode=request.getParameter("startExeCode");
		String endExeCode=request.getParameter("endExeCode");
		String decisionExeCode=request.getParameter("decisionExeCode");
		//String nodeType=request.getParameter("nodeType");
		String activityName=request.getParameter("activityName");
		String defId=request.getParameter("defId");
		
		ProDefinition proDefinition=proDefinitionService.get(new Long(defId));
		
		String defXml=jbpmService.getDefinitionXmlByDpId(proDefinition.getDeployId());
		
		Document document=XmlUtil.stringToDocument(defXml);
		

		ProHandleComp startEventHandle=proHandleCompService.getProHandleComp(proDefinition.getDeployId(), activityName, ProHandleComp.EVENT_START);
		if(startEventHandle==null){
			startEventHandle=new ProHandleComp();
			startEventHandle.setActivityName(activityName);
			startEventHandle.setDeployId(proDefinition.getDeployId());
			startEventHandle.setEventName(ProHandleComp.EVENT_START);
			startEventHandle.setHandleType(ProHandleComp.HANDLE_TYPE_LISTENER);
		}
		startEventHandle.setExeCode(startExeCode);
		
		proHandleCompService.save(startEventHandle);
		if(StringUtils.isNotEmpty(startExeCode)){
			writeXml(document,activityName,"start");
		}

		ProHandleComp endEventHandle=proHandleCompService.getProHandleComp(proDefinition.getDeployId(), activityName, ProHandleComp.EVENT_END);
		if(endEventHandle==null){
			endEventHandle=new ProHandleComp();
			endEventHandle.setActivityName(activityName);
			endEventHandle.setDeployId(proDefinition.getDeployId());
			endEventHandle.setEventName(ProHandleComp.EVENT_END);
			endEventHandle.setHandleType(ProHandleComp.HANDLE_TYPE_LISTENER);
		}
		endEventHandle.setExeCode(endExeCode);
		
		proHandleCompService.save(endEventHandle);
		if(StringUtils.isNotEmpty(endExeCode)){
			writeXml(document,activityName,"end");
		}

		List<ProHandleComp> proHandleCompDecisons=proHandleCompService.getByDeployIdActivityNameHandleType(proDefinition.getDeployId(), activityName, ProHandleComp.HANDLE_TYPE_HANDLER);
		ProHandleComp decisionHandle=null;
		if(proHandleCompDecisons.size()>0){
			decisionHandle=proHandleCompDecisons.get(0);
		}else{
			decisionHandle=new ProHandleComp();
			decisionHandle.setActivityName(activityName);
			decisionHandle.setDeployId(proDefinition.getDeployId());
			decisionHandle.setHandleType(ProHandleComp.HANDLE_TYPE_HANDLER);
		}
		
		decisionHandle.setExeCode(decisionExeCode);
		proHandleCompService.save(decisionHandle);
		if(StringUtils.isNotEmpty(decisionExeCode)){
			writeXml(document,activityName,"decision");
		}

		defXml=XmlUtil.docToString(document);
		
		jbpmService.wirteDefXml(proDefinition.getDeployId(), defXml);
		proDefinition.setDefXml(defXml);
		proDefinitionService.save(proDefinition);
			
		
		return SUCCESS;
	}
	
	public String saveDecision(){
		String exeCode=getRequest().getParameter("exeCode");
		String defId=getRequest().getParameter("defId");
		String activityName=getRequest().getParameter("activityName");
		ProDefinition proDefinition=proDefinitionService.get(new Long(defId));
		List<ProHandleComp> proHandleComps=proHandleCompService.getByDeployIdActivityNameHandleType(proDefinition.getDeployId(), activityName, ProHandleComp.HANDLE_TYPE_HANDLER);
		ProHandleComp proHandleComp=null;
		if(proHandleComps.size()>0){
			proHandleComp=proHandleComps.get(0);
		}else{
			proHandleComp=new ProHandleComp();
			proHandleComp.setActivityName(activityName);
			proHandleComp.setDeployId(proDefinition.getDeployId());
			proHandleComp.setHandleType(ProHandleComp.HANDLE_TYPE_HANDLER);
		}
		
		proHandleComp.setExeCode(exeCode);
		
		proHandleCompService.save(proHandleComp);
		
		//取得现在的Xml
		String defXml=jbpmService.getDefinitionXmlByDpId(proHandleComp.getDeployId());
		
		Document document=XmlUtil.stringToDocument(defXml);
		Element rootEl=document.getRootElement();
		
//		Element decisionEl=(Element)rootEl.selectSingleNode("/process/decision[@name='" + activityName + "']");
		
		Iterator<Element> it=rootEl.elementIterator();
		while(it.hasNext()){
			Element el=it.next();
			if("decision".equals(el.getName())){
				String name=el.attributeValue("name");
				if(name.equals(activityName)){
					Attribute exprAttr=el.attribute("expr");
					if(exprAttr!=null){
						el.remove(exprAttr);
					}
					Element handlerEl=(Element)el.selectSingleNode("./handler");
					if(handlerEl==null){
						handlerEl=el.addElement("handler");
						handlerEl.addAttribute("class", "com.htsoft.oa.workflow.handler.DecisionHandlerImpl");
					}
					break;
				}
			}
		}

		defXml=document.asXML();
		logger.info("xml:"+defXml);
		try{
			defXml=new String(defXml.getBytes(), "UTF-8");
		}catch(Exception ex){
			logger.error(ex);
		}
		logger.debug("lastXml:"+ defXml);
		//修改xml
		jbpmService.wirteDefXml(proHandleComp.getDeployId(), defXml);
		proDefinition.setDefXml(defXml);
		proDefinitionService.save(proDefinition);
		
		return SUCCESS;
	}
	
	private void writeXml(Document document,String activityName,String handleType){
		Element rootEl=document.getRootElement();
		Iterator<Element> it=rootEl.elementIterator();
		while(it.hasNext()){
			Element el=it.next();
			if("decision".equals(handleType)){//decsion的handler加入
				if("decision".equals(el.getName())){
					String name=el.attributeValue("name");
					if(name.equals(activityName)){
						Attribute exprAttr=el.attribute("expr");
						if(exprAttr!=null){
							el.remove(exprAttr);
						}
						boolean isHandlerExist=false;
						Iterator<Element> subIt=el.elementIterator();
						while(subIt.hasNext()){
							Element subEl=subIt.next();
							if("handler".equals(subEl.getName())){
								isHandlerExist=true;
								break;
							}
						}
						if(!isHandlerExist){
							Element handlerEl=el.addElement("handler");
							handlerEl.addAttribute("class", "com.htsoft.oa.workflow.handler.DecisionHandlerImpl");
						}
						break;
					}
				}
			}else if("start".equals(handleType)){//节点的开始事件
				String name=el.attributeValue("name");
				if(name.equals(activityName)){
					boolean isStartEventExist=false;
					Iterator<Element> subIt=el.elementIterator();
					while(subIt.hasNext()){
						Element subEl=subIt.next();
						if("on".equals(subEl.getName()) 
								&& "start".equals(subEl.attributeValue("event"))){
							isStartEventExist=true;
							break;
						}
					}
					if(!isStartEventExist){
						Element startEvent=el.addElement("on");
						Element onEl=startEvent.addAttribute("event", "start");
						Element listEl=onEl.addElement("event-listener");
						listEl.addAttribute("class", "com.htsoft.oa.workflow.event.NodeEventListener");
						Element fieldEl=listEl.addElement("field");
						fieldEl.addAttribute("name", "eventType");
						Element stringEl=fieldEl.addElement("string");
						stringEl.addAttribute("value", "start");
					}
					break;
				}
			}else if("end".equals(handleType)){
				String name=el.attributeValue("name");
				if(name.equals(activityName)){
					boolean isEndEventExist=false;
					Iterator<Element> subIt=el.elementIterator();
					while(subIt.hasNext()){
						Element subEl=subIt.next();
						if("on".equals(subEl.getName()) 
								&& "end".equals(subEl.attributeValue("event"))){
							isEndEventExist=true;
							break;
						}
					}
					if(!isEndEventExist){
						Element eventEvent=el.addElement("on");
						Element onEl=eventEvent.addAttribute("event", "end");
						Element listEl=onEl.addElement("event-listener");
						listEl.addAttribute("class", "com.htsoft.oa.workflow.event.NodeEventListener");
						Element fieldEl=listEl.addElement("field");
						fieldEl.addAttribute("name", "eventType");
						Element stringEl=fieldEl.addElement("string");
						stringEl.addAttribute("value", "end");
					}
					break;
				}
			}
		}
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<ProHandleComp> list= proHandleCompService.getAll(filter);
		
		Type type=new TypeToken<List<ProHandleComp>>(){}.getType();
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
				proHandleCompService.remove(new Long(id));
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
		ProHandleComp proHandleComp=proHandleCompService.get(handleId);
		
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(proHandleComp));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(proHandleComp.getHandleId()==null){
			proHandleCompService.save(proHandleComp);
		}else{
			ProHandleComp orgProHandleComp=proHandleCompService.get(proHandleComp.getHandleId());
			try{
				BeanUtil.copyNotNullProperties(orgProHandleComp, proHandleComp);
				proHandleCompService.save(orgProHandleComp);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
	
	public static void main(String[]args){
		String file="D:/tools/jbpm/jbpm-4.4/jbpm-4.4/examples/src/org/jbpm/examples/decision/expression/process.jpdl.xml";
		Document document=XmlUtil.load(file);
		System.out.println("xml:" + document.asXML());
		Element rootEl=document.getRootElement();
		
		//Element decisionEl=(Element)rootEl.selectSingleNode("./decision");
		
		Iterator<Element> it=rootEl.elementIterator();
		
		while(it.hasNext()){
			Element el=it.next();
			System.out.println("el:"+el.getName());
			if("decision".equals(el.getName())){
				String name=el.attributeValue("name");
				if("evaluate document".equals(name)){
					
					Attribute exprAttr=el.attribute("expr");
					if(exprAttr!=null){
						el.remove(exprAttr);
					}
					Element handlerEl=(Element)el.selectSingleNode("./handler");
					if(handlerEl==null){
						handlerEl=el.addElement("handler");
						handlerEl.addAttribute("class", "com.htsoft.oa.workflow.handler.DecisionHandlerImpl");
					}
					
					break;
				}
			}
		}
		
//		System.out.println("<<<<<<<<<<<<<<<<<<<<<<<<<<<");
//		if(decisionEl!=null){
//			System.out.println("enter decision...>>>>>>>>>>..................");
//			Attribute exprAttr=decisionEl.attribute("expr");
//			if(exprAttr!=null){
//				decisionEl.remove(exprAttr);
//			}
//			Element handlerEl=(Element)decisionEl.selectSingleNode("./handler");
//			if(handlerEl==null){
//				handlerEl=decisionEl.addElement("handler");
//				handlerEl.addAttribute("class", "com.htsoft.oa.workflow.handler.DecisionHandlerImpl");
//			}
//		}
		System.out.println("xml:" + document.asXML());
	}
}
