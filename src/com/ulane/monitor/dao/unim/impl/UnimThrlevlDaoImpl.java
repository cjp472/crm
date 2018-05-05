package com.ulane.monitor.dao.unim.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.ulane.monitor.dao.unim.UnimThrlevlDao;
import com.ulane.monitor.model.unim.UnimThrlevl;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

@SuppressWarnings("unchecked")
public class UnimThrlevlDaoImpl extends BaseDaoImpl<UnimThrlevl> implements UnimThrlevlDao{

	public UnimThrlevlDaoImpl() {
		super(UnimThrlevl.class);
	}
	
	  public List<UnimThrlevl> getByMonitorId(Long monitorId)
	  {
	    String Hql = "select t from UnimThrlevl t left join t.unimAgent where t.unimAgent.agentId=" + monitorId;
	    return this.findByHql(Hql);
	  }	
	  //当前状态下的阀值
	  public List<UnimThrlevl> getByCatId(Long catid)
	  {
	    String Hql = "select t from UnimThrlevl t  where t.unimCategory.catId=" + catid;
	    return this.findByHql(Hql);
	  }	

}