package com.ulane.monitor.dao.unim.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.ulane.monitor.dao.unim.UnimCategoryDao;
import com.ulane.monitor.model.unim.UnimCategory;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

@SuppressWarnings("unchecked")
public class UnimCategoryDaoImpl extends BaseDaoImpl<UnimCategory> implements UnimCategoryDao{

	public UnimCategoryDaoImpl() {
		super(UnimCategory.class);
	}


	  public List<UnimCategory> listGetCategory(Short typeId)
	  {
	    String hql = "from UnimCategory t where t.typeId=" + typeId +" order by t.catCode";
	    return this.findByHql(hql);
	  }
	  
	  public List<UnimCategory> listGetCategory(Short typeId, Short statusId)
	  {
	    String hql = "from UnimCategory t where t.typeId=" + typeId + " and t.status="+statusId +" order by t.catCode";
	    return this.findByHql(hql);
	  }
}