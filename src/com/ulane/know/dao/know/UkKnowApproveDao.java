package com.ulane.know.dao.know;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.dao.BaseDao;
import com.ulane.know.model.know.UkKnowApprove;

/**
 * 
 * @author cf0666@gmail.com
 *
 */
public interface UkKnowApproveDao extends BaseDao<UkKnowApprove>{
	void saveRunidAndNodeName(Long runId,String nodeName,Long headerId);
	void updateStatusByNodeName(String status,Long headerId);
}