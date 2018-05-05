package com.ulane.know.service.know.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.know.dao.know.UkKnowTypeDao;
import com.ulane.know.model.know.UkKnowType;
import com.ulane.know.service.know.UkKnowTypeService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class UkKnowTypeServiceImpl extends BaseServiceImpl<UkKnowType> implements UkKnowTypeService{
	@SuppressWarnings("unused")
	private UkKnowTypeDao dao;
	
	public UkKnowTypeServiceImpl(UkKnowTypeDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public List<UkKnowType> findByParentId(Long long1) {
		// TODO Auto-generated method stub
		return dao.findByParentId(long1);
	}
	
	/**
	 * 查找树下面的子节点 子节点信息按照父节点名称排序
	 * @param path
	 * @return
	 */
	@Override
	public List<UkKnowType> findByParentIdForSql(final int start,final int limit,String path){
		return dao.findByParentIdForSql(start, limit, path);
	}
	/**
	 * 查找树下面的子节点 子节点信息按照父节点名称排序(获得数量)
	 * @param path
	 * @return
	 */
	@Override
	public int findByParentIdForSqlCount(final int start,final int limit,String path) {
		return dao.findByParentIdForSqlCount(start, limit, path);
	}
	/**
	 * 查找树,根据权限
	 * @param parentId
	 * @return
	 */
	public List<UkKnowType> findByParentIdForRole(Long parentId){
		return dao.findByParentIdForRole(parentId);
	}
	
	/**
	 * 查找采集权限树,根据权限
	 * @param parentId
	 * @return
	 */
	@Override
	public List<UkKnowType> collectFindByParentIdForRole(Long parentId){
		return dao.collectFindByParentIdForRole(parentId);
	}
	/**
	 * 根据中间表uk_know_type_know查找knowId
	 * @param knowTypeIds
	 * @author wangzhongjin
	 */
	@Override
	public List findKnowTypeKnowid(String knowTypeIds) {
		// TODO Auto-generated method stub
		return dao.findKnowTypeKnowid(knowTypeIds);
	}

}