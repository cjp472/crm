package com.htsoft.oa.dao.system.impl;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
 */
import java.util.List;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.dao.system.DiaryDao;
import com.htsoft.oa.model.system.Diary;

/**
 * @description 日志管理
 * @class DiaryDaoImpl
 * @author YHZ
 * @company www.ulane.cn
 * @data 2010-12-27AM
 * 
 */
@SuppressWarnings("unchecked")
public class DiaryDaoImpl extends BaseDaoImpl<Diary> implements DiaryDao {

	public DiaryDaoImpl() {
		super(Diary.class);
	}

	@Override
	public List<Diary> getSubDiary(String userIds, PagingBean pb) {
		String hql = "from Diary vo where vo.appUser.userId in (" + userIds
				+ ") and vo.diaryType=1";
		return findByHql(hql, null, pb);
	}

}