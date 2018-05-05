package com.ulane.base.service.xitong.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.ArrayList;
import java.util.List;

import com.htsoft.core.Constants;
import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.base.dao.xitong.SysTemTypeDao;
import com.ulane.base.model.xitong.SysTemType;
import com.ulane.base.service.xitong.SysTemTypeService;
import com.ulane.know.model.know.UkKnowTemplate;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class SysTemTypeServiceImpl extends BaseServiceImpl<SysTemType> implements SysTemTypeService{
	@SuppressWarnings("unused")
	private SysTemTypeDao dao;
	
	public SysTemTypeServiceImpl(SysTemTypeDao dao) {
		super(dao);
		this.dao=dao;
	}

	/**
	 * 根据父节点查找
	 * @return List<SysTemType>
	 * @param parentId
	 * @author zhangyl
	 * @createtime 2012年7月5日 15:32:39
	 */
	@Override
	public List<SysTemType> getByParentId(Long parentId) {
		return dao.getByParentId(parentId);
	}
	
	 
	/**
	 * 根据ID获得所有的子节点
	 * @param path 根据path 模糊查询
	 * @return List<SysTemType> 
	 */
	@Override
	public List<SysTemType> getByPath(Long temId){
		List<SysTemType> list = new ArrayList<SysTemType>();
		SysTemType sysTemType = dao.get(temId);
		if(sysTemType!=null){
			list = dao.likePath(sysTemType.getPath());
		}
		return list;
	}

}