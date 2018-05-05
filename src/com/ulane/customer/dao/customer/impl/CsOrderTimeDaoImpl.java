package com.ulane.customer.dao.customer.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import org.jbpm.api.Execution;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.ulane.customer.dao.customer.CsOrderTimeDao;
import com.ulane.customer.model.customer.CsOrderTime;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

@SuppressWarnings("unchecked")
public class CsOrderTimeDaoImpl extends BaseDaoImpl<CsOrderTime> implements CsOrderTimeDao{

	public CsOrderTimeDaoImpl() {
		super(CsOrderTime.class);
	}
	/**
	 * 根据时间配置名称获取工单时间设置项
	 */
	public CsOrderTime getByDicId(Long dicId){
		String hql="from CsOrderTime c where c.idDictionary.dicId=?";
		return(CsOrderTime)findUnique(hql,new Object[]{dicId});
	}

}