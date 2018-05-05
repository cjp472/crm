package com.htsoft.oa.dao.flow;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.dao.BaseDao;
import com.htsoft.oa.model.flow.FormField;

/**
 * 
 * @author 
 *
 */
public interface FormFieldDao extends BaseDao<FormField>{
	/**
	 * 取某个表的标题字段
	 * @param tableId
	 * @param isFlowTitle
	 * @return
	 */
	public FormField find(Long tableId,Short isFlowTitle);
	/**
	 * 按外键表名及外键取得字段列表
	 * @param foreignTable
	 * @param foreignKey
	 * @return
	 */
	public List<FormField> getByForeignTableAndKey(String foreignTable,String foreignKey);
}