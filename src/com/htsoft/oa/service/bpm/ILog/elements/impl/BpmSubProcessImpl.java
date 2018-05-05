package com.htsoft.oa.service.bpm.ILog.elements.impl;

import java.util.Map;
import java.util.Map.Entry;

import org.apache.commons.lang.StringUtils;
import org.dom4j.Document;
import org.dom4j.Element;

import com.htsoft.oa.service.bpm.ILog.elements.BpmElementsManager;
import com.htsoft.oa.service.bpm.ILog.helper.BpmHelper;

/**
 * @description 解析子流程
 * @class BpmSubProcessImpl
 * @extends BpmHelper
 * @implement BpmElementsManager
 * @author YHZ
 * @company www.ulane.cn
 * @createtime 2011-5-11PM
 * 
 */
public class BpmSubProcessImpl extends BpmHelper implements BpmElementsManager {

	public BpmSubProcessImpl(Document document) {
		super(document);
	}

	/**
	 * @descrption 子流程，包含属性：sub-process-key,outcome
	 * @param element
	 *            Element对象
	 * @return String
	 */
	@Override
	public String getInfo(Element element) {
		StringBuffer sbf = new StringBuffer("<sub-process ");
		sbf.append(super.getAttributes(element));
		Map<String, String> map = super.getNodeLabels(element, new String[] {
				"sub_process_key", "outcome" });
		String msg = "";
		for (Entry<String, String> et : map.entrySet()) {
		    	if("sub_process_key".equals(et.getKey())){
		    	    msg += " sub-process-key=\"" + et.getValue() + "\" ";
		    	}else{
		    	    msg += et.getKey() + "=\"" + et.getValue() + "\" ";		    	
		    	}
		}
		sbf.append(" " + msg);
		sbf.append(">\n");
		super.addTransition(element, sbf);
		sbf.append("</sub-process>\n");
		return sbf.toString();
	}

}
