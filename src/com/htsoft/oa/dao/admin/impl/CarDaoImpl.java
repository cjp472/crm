package com.htsoft.oa.dao.admin.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.oa.dao.admin.CarDao;
import com.htsoft.oa.model.admin.Car;

public class CarDaoImpl extends BaseDaoImpl<Car> implements CarDao{

	public CarDaoImpl() {
		super(Car.class);
	}

}