package com.htsoft.oa.dao.info;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.dao.BaseDao;
import com.htsoft.oa.model.info.Section;

/**
 * 
 * @author 
 *
 */
public interface SectionDao extends BaseDao<Section>{
	public Integer getLastColumn();
}