package com.htsoft.oa.dao.personal;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.dao.BaseDao;
import com.htsoft.oa.model.personal.DutyRegister;

/**
 * 
 * @author 
 *
 */
public interface DutyRegisterDao extends BaseDao<DutyRegister>{
	/**
	 * 查取当前用户当天上下班登记情况
	 * @param userId
	 * @param inOffFlag
	 * @param sectionId
	 * @return
	 */
	public DutyRegister getTodayUserRegister(Long userId,Short inOffFlag,Long sectionId);
}