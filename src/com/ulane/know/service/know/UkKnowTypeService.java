package com.ulane.know.service.know;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.service.BaseService;
import com.ulane.know.model.know.UkKnowType;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public interface UkKnowTypeService extends BaseService<UkKnowType>{

	List<UkKnowType> findByParentId(Long long1);
	
	/**
	 * 查找树下面的子节点 子节点信息按照父节点名称排序
	 * @param path
	 * @return
	 */
	public List<UkKnowType> findByParentIdForSql(final int start,final int limit,String path);
	/**
	 * 查找树下面的子节点 子节点信息按照父节点名称排序(获得数量)
	 * @param path
	 * @return
	 */
	public int findByParentIdForSqlCount(final int start,final int limit,String path);
	/**
	 * 查找树,根据权限
	 * @param parentId
	 * @return
	 */
	public List<UkKnowType> findByParentIdForRole(Long parentId);
	
	/**
	 * 查找采集权限树,根据权限
	 * @param parentId
	 * @return
	 */
	public List<UkKnowType> collectFindByParentIdForRole(Long parentId);
	/**
	 * 根据中间表uk_know_type_know查找knowId
	 * @param knowTypeIds
	 * @author wangzhongjin
	 */
	public List findKnowTypeKnowid(String knowTypeIds);
}


