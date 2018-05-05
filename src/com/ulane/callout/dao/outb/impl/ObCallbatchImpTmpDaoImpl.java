package com.ulane.callout.dao.outb.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.ulane.callout.dao.outb.ObCallbatchImpTmpDao;
import com.ulane.callout.model.outb.ObCallbatchImpTmp;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

@SuppressWarnings("unchecked")
public class ObCallbatchImpTmpDaoImpl extends BaseDaoImpl<ObCallbatchImpTmp> implements ObCallbatchImpTmpDao{

	public ObCallbatchImpTmpDaoImpl() {
		super(ObCallbatchImpTmp.class);
	}
	
	public List<ObCallbatchImpTmp> listImpTmpsByCallbathId(Long callbathId) {
		 String hql="selct vo from ObCallbatchImpTmp vo where obCallbatch.callbatchId=?";
		 return findByHql(hql,new Object[]{callbathId});
	}	

}