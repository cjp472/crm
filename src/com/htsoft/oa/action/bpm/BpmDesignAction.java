package com.htsoft.oa.action.bpm;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;

import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.oa.model.flow.ProDefinition;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.service.flow.ProDefinitionService;
import com.htsoft.oa.service.system.AppUserService;
import com.htsoft.oa.service.system.GlobalTypeService;
import com.htsoft.oa.model.system.GlobalType;

/**
 * @description 在线流程设计
 * @class BpmDesignAction
 * @extends BaseAction
 * @author YHZ
 * @company www.ulane.cn
 * @createtime w2011-5-4AM
 * 
 */
public class BpmDesignAction extends BaseAction {

	@Resource
	private AppUserService appUserSerivce;
	@Resource
	private ProDefinitionService proDefinitionService;

	@Resource
	private GlobalTypeService globalTypeService;

	private Long defId; // defId流程定义Id

	private String name;

	public Long getDefId() {
		return defId;
	}

	public void setDefId(Long defId) {
		this.defId = defId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Override
	public String execute() throws Exception {
		HttpServletRequest request  = getRequest();
		String defId=request.getParameter("defId");
		if(StringUtils.isNotEmpty(defId)){
			ProDefinition proDefintion=proDefinitionService.get(new Long(defId));
			request.setAttribute("proDefinition", proDefintion);
			request.setAttribute("title", proDefintion.getName());
		}else{
			request.setAttribute("title", "未命名");
		}
		Long uId = ContextUtil.getCurrentUserId();
		List<GlobalType> record = new ArrayList<GlobalType>();
		String catKey = "FLOW"; // 流程模块
		//AppUser appUser = appUserSerivce.get(Long.valueOf(uId));
		record = globalTypeService.getByCatKeyUserId(ContextUtil.getCurrentUser(), catKey);

		request.setAttribute("record", record);
		request.setAttribute("uId", uId);
		
		return SUCCESS;
	}

}
