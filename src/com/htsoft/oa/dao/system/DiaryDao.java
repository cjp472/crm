package com.htsoft.oa.dao.system;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.dao.BaseDao;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.model.system.Diary;

/**
 * 
 * @author 
 *
 */
public interface DiaryDao extends BaseDao<Diary>{
	//public List<Diary> getAllBySn(PagingBean pb);
	/**
	 * 查找所有下属的工作日志
	 */
	public List<Diary> getSubDiary(String userIds,PagingBean pb);
}