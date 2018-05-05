package com.ulane.know.dao.know.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.ulane.know.dao.know.UkKnowApproveDao;
import com.ulane.know.model.know.UkKnowApprove;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

@SuppressWarnings("unchecked")
public class UkKnowApproveDaoImpl extends BaseDaoImpl<UkKnowApprove> implements UkKnowApproveDao{

	public UkKnowApproveDaoImpl() {
		super(UkKnowApprove.class);
	}

	@Override
	public void saveRunidAndNodeName(Long runId, String nodeName, Long headerId) {
		String hql="update UkKnowApprove set runid="+runId+" ,nodeName='"+nodeName+"' where knowApproveId="+headerId;	
		update(hql);
	}

	@Override
	public void updateStatusByNodeName(String status, Long headerId) {
		String hql="update UkKnowApprove set approvalStatus='"+status+"'  where knowApproveId="+headerId;	
		update(hql);
	}

}