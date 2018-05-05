package com.htsoft.oa.dao.communicate.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.hibernate.Query;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.oa.dao.communicate.OutMailDao;
import com.htsoft.oa.model.communicate.MailBox;
import com.htsoft.oa.model.communicate.OutMail;

public class OutMailDaoImpl extends BaseDaoImpl<OutMail> implements OutMailDao{

	public OutMailDaoImpl() {
		super(OutMail.class);
	}
	public List<OutMail> findByFolderId(Long folderId){
		String hql = "from OutMail where folderId = ?";
		return findByHql(hql, new Object[]{folderId});
	}
	
	@Override
	public Long CountByFolderId(Long folderId) {
		String hql = "select count(*) from OutMail where folderId ="+folderId;
		return (Long)getHibernateTemplate().find(hql).get(0);
	}
	@Override
	public Map getUidByUserId(Long userId){
		String hql = "select om.uid from OutMail om where om.userId ="+userId;
		List<String> uidList= getHibernateTemplate().find(hql);
		Map uidMap = new HashMap();
		for(String uid:uidList){
			uidMap.put(uid, "Y");
		}
		return uidMap;
	}
	
}