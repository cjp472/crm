package com.ulane.monitor.dao.unim.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.ulane.monitor.dao.unim.UnimAssTypeDao;
import com.ulane.monitor.model.unim.UnimAssType;
import com.ulane.monitor.model.unim.UnimAssetsNavigation;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

@SuppressWarnings("unchecked")
public class UnimAssTypeDaoImpl extends BaseDaoImpl<UnimAssType> implements UnimAssTypeDao{

	public UnimAssTypeDaoImpl() {
		super(UnimAssType.class);
	}

}