package com.htsoft.oa.action.flow;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import javax.annotation.Resource;

import com.htsoft.core.web.action.BaseAction;
import com.htsoft.oa.model.flow.ProDefinition;
import com.htsoft.oa.service.flow.ProDefinitionService;
/**
 * 流程明细
 * @author cf0666@gmail.com
 *
 */
public class ProcessDetailAction extends BaseAction {
	@Resource
	private ProDefinitionService proDefinitionService;
	
	private ProDefinition proDefinition;

	public ProDefinition getProDefinition() {
		return proDefinition;
	}

	public void setProDefinition(ProDefinition proDefinition) {
		this.proDefinition = proDefinition;
	}

	@Override
	public String execute() throws Exception {
		String defId=getRequest().getParameter("defId");
		proDefinition=proDefinitionService.get(new Long(defId));
		return SUCCESS;
	}
}
