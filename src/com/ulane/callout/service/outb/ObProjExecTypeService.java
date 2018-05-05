package com.ulane.callout.service.outb;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.BaseService;
import com.ulane.callout.model.outb.ObProjExecType;
import com.ulane.callout.model.outb.ObProject;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public interface ObProjExecTypeService extends BaseService<ObProjExecType>{
	/**
	 * 保存项目的执行方式——项目可以有多种执行方式
	 * @param types
	 * @param obProject
	 */
	public void save(String typesStr,ObProject obProject);
	
	public void removeObj(Long projId);
	
}


