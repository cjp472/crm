package com.ulane.know.service.know;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
 */
import java.util.Map;

import com.htsoft.core.service.BaseService;
import com.htsoft.oa.action.flow.FlowRunInfo;
import com.ulane.know.model.know.UkKnowApply;

/**
 * 
 * @author cf0666@gmail.com
 * 
 */

public interface UkKnowApplyService extends BaseService<UkKnowApply> {

	public Integer saveHeadId(FlowRunInfo flowRunInfo);

	public Integer saveRunId(FlowRunInfo flowRunInfo);

	public UkKnowApply save(FlowRunInfo flowRunInfo);

	/**
	 * 分页计算函数
	 * 
	 * @param start
	 * @param limit
	 * @param userId
	 * @return
	 */
	public Map<Long, Boolean> getSelectId(int start, int limit, Long userId,
			String type, String firstId);

	/**
	 * 分页计算得到记录数
	 * 
	 * @param start
	 * @param limit
	 * @param userId
	 * @return
	 */
	public int getSelectIdCount(int start, int limit, Long userId, String type,
			String firstId);
}
