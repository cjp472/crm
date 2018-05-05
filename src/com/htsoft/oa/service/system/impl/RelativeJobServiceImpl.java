package com.htsoft.oa.service.system.impl;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
 */

import java.util.List;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.system.RelativeJobDao;
import com.htsoft.oa.model.system.RelativeJob;
import com.htsoft.oa.service.system.RelativeJobService;

/**
 * @description 相对岗位管理
 * @author 优创融联科技
 * @company www.ulane.cn
 * @data 2010-12-13PM
 * 
 */
public class RelativeJobServiceImpl extends BaseServiceImpl<RelativeJob>
		implements RelativeJobService {

	private RelativeJobDao dao;

	public RelativeJobServiceImpl(RelativeJobDao dao) {
		super(dao);
		this.dao = dao;
	}

	/**
	 * 根据parentId查询对应的父节点信息
	 */
	@Override
	public List<RelativeJob> findByParentId(Long parentId) {
		return dao.findByParentId(parentId);
	}

}