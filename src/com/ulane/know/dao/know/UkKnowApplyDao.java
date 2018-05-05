package com.ulane.know.dao.know;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
 */
import java.util.Map;

import com.htsoft.core.dao.BaseDao;
import com.ulane.know.model.know.UkKnowApply;

/**
 * 
 * @author cf0666@gmail.com
 * 
 */
public interface UkKnowApplyDao extends BaseDao<UkKnowApply> {

	void saveRunidAndNodeName(Long runId, String nodeName, Long headerId);

	void updateStatusByNodeName(String status, Long headerId, boolean isEnd);

	public Map<Long, Boolean> getSelectId(int start, int limit, Long userId,
			String type, String firstId);

	public int getSelectIdCount(int start, int limit, Long userId, String type,
			String firstId);
}