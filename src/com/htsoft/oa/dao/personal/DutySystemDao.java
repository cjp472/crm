package com.htsoft.oa.dao.personal;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.dao.BaseDao;
import com.htsoft.oa.model.personal.DutySystem;

/**
 * 
 * @author 
 *
 */
public interface DutySystemDao extends BaseDao<DutySystem>{
	/**
	 *  更新为非缺省
	 */
	public void updateForNotDefult();
	/**
	 * 取得缺省的班制
	 * @return
	 */
	public List<DutySystem> getDefaultDutySystem();
}