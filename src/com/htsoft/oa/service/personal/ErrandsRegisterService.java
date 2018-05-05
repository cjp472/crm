package com.htsoft.oa.service.personal;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/

import com.htsoft.core.service.BaseService;
import com.htsoft.oa.action.flow.FlowRunInfo;
import com.htsoft.oa.model.personal.ErrandsRegister;

public interface ErrandsRegisterService extends BaseService<ErrandsRegister>{
	/**
	 * 在流程中保存流程申请记录
	 * @param flowRunInfo 流程相关运行信息
	 * @return
	 */
	public Integer saveRegister(FlowRunInfo flowRunInfo);
}


