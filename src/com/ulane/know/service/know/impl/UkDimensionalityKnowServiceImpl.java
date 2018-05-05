package com.ulane.know.service.know.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.know.dao.know.UkDimensionalityKnowDao;
import com.ulane.know.model.know.UkDimensionalityKnow;
import com.ulane.know.service.know.UkDimensionalityKnowService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class UkDimensionalityKnowServiceImpl extends BaseServiceImpl<UkDimensionalityKnow> implements UkDimensionalityKnowService{
	
	private UkDimensionalityKnowDao dao;
	
	public UkDimensionalityKnowServiceImpl(UkDimensionalityKnowDao dao) {
		super(dao);
		this.dao=dao;
	}
	/**
	 * 根据中间表uk_dimensionality_know查找knowId
	 * @param knowDimenIds
	 * @param type
	 * @author wangzhongjin
	 */
	public List findKnowDimenKnowid(String knowDimenIds,String type){
		return dao.findKnowDimenKnowid(knowDimenIds, type);
	}
}