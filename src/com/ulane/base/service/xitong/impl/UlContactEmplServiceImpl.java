package com.ulane.base.service.xitong.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.base.dao.xitong.UlContactEmplDao;
import com.ulane.base.model.xitong.UlContactEmpl;
import com.ulane.base.service.xitong.UlContactEmplService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class UlContactEmplServiceImpl extends BaseServiceImpl<UlContactEmpl> implements UlContactEmplService{
	@SuppressWarnings("unused")
	private UlContactEmplDao dao;
	
	public UlContactEmplServiceImpl(UlContactEmplDao dao) {
		super(dao);
		this.dao=dao;
	}
	public List<UlContactEmpl> getAllByUseid(Long useid){
		return dao.getAllByUseid(useid);
	}
}