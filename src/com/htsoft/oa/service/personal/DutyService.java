package com.htsoft.oa.service.personal;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.util.Date;

import com.htsoft.core.service.BaseService;
import com.htsoft.oa.model.personal.Duty;

public interface DutyService extends BaseService<Duty>{
	/**
	 * 检查当前这个时间段是否横跨于现有的该用户班制时间
	 * @param userId
	 * @param startTime
	 * @param endTime
	 * @return
	 */
	public boolean isExistDutyForUser(Long userId,Date startTime,Date endTime);
	
	/**
	 * 取当前用户的班制
	 * @param userId
	 * @return
	 */
	public Duty getCurUserDuty(Long userId);
}


