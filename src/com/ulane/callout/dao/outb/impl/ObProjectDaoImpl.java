package com.ulane.callout.dao.outb.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.ulane.callout.dao.outb.ObProjectDao;
import com.ulane.callout.model.outb.ObProject;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

@SuppressWarnings("unchecked")
public class ObProjectDaoImpl extends BaseDaoImpl<ObProject> implements ObProjectDao{

	public ObProjectDaoImpl() {
		super(ObProject.class);
	}

	@Override
	public void saveRunidAndNodeName(Long runId, String nodeName, Long headerId) {
		String hql="update ObProject set runid="+runId+" ,nodeName='"+nodeName+"' where projId="+headerId;	
		update(hql);
	}

	@Override
	public void updateStatusByNodeName(String status, Long headerId) {
		String hql="update ObProject set aprovalStatus='"+status+"'  where projId="+headerId;	
		update(hql);
	}

}