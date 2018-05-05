package com.htsoft.oa.service.admin.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.admin.CarDao;
import com.htsoft.oa.model.admin.Car;
import com.htsoft.oa.service.admin.CarService;

public class CarServiceImpl extends BaseServiceImpl<Car> implements CarService{
	private CarDao dao;
	
	public CarServiceImpl(CarDao dao) {
		super(dao);
		this.dao=dao;
	}

}