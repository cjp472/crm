package com.htsoft.oa.service.system;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
 */
import java.util.List;

import com.htsoft.core.service.BaseService;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.model.system.Diary;

/**
 * @description 日志管理
 * @class DiaryService
 * @updater YHZ
 * @company www.ulane.cn
 * @data 2010-12-27AM
 * 
 */
public interface DiaryService extends BaseService<Diary> {

	public List<Diary> getAllBySn(PagingBean pb);

	/**
	 * 查找下属的所有工作日志
	 * 
	 * @param userIds
	 * @param pb
	 * @return
	 */
	public List<Diary> getSubDiary(String userIds, PagingBean pb);

}
