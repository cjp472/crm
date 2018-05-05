package com.ulane.monitor.dao.unim.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.ulane.monitor.dao.unim.UnimAssTarThrlevlDao;
import com.ulane.monitor.model.unim.UnimAssTarThrlevl;
import com.ulane.monitor.model.unim.UnimChaTarThrlevl;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

@SuppressWarnings("unchecked")
public class UnimAssTarThrlevlDaoImpl extends BaseDaoImpl<UnimAssTarThrlevl> implements UnimAssTarThrlevlDao{

	public UnimAssTarThrlevlDaoImpl() {
		super(UnimAssTarThrlevl.class);
	}

	  //当前状态下的阀值
	  public List<UnimAssTarThrlevl> getByCatId(Long targetId)
	  {
	    String Hql = "select t from UnimAssTarThrlevl t  where t.unimAssetsTarget.targetId=" + targetId;
	    return this.findByHql(Hql); 
	  }	
}