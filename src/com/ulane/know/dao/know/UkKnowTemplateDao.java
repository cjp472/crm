package com.ulane.know.dao.know;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.dao.BaseDao;
import com.ulane.know.model.know.UkKnowTemplate;

/**
 * 
 * @author cf0666@gmail.com
 *
 */
public interface UkKnowTemplateDao extends BaseDao<UkKnowTemplate>{
	/**
	 * 根据是否删除和key查询
	 * @param isDelete
	 * @param key
	 * @return List
	 * @author zhangyl
	 * @createtime 2012年5月29日 18:21:25
	 */
	public List<UkKnowTemplate> getByIsDelete(Long isDelete,String key);
	
	/**
	 * 根据模版类型查找 (in)
	 * @param TypeId
	 * @return List<UkKnowTemplate>
	 * @author zhangyl
	 * @createtime 2012年7月5日 16:59:25
	 */
	public List<UkKnowTemplate> getByInTypeId(String TypeId);
}