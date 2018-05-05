package com.htsoft.oa.service.personal;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.BaseService;
import com.htsoft.oa.model.personal.DutySystem;

public interface DutySystemService extends BaseService<DutySystem>{
	/**
	 * 取得缺省的班次
	 * @return
	 */
	public DutySystem getDefaultDutySystem();
}


