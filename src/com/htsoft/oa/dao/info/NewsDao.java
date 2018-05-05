package com.htsoft.oa.dao.info;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.dao.BaseDao;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.model.info.News;

public interface NewsDao extends BaseDao<News>{
	public List<News> findByTypeId(Long typeId,PagingBean pb);

	public List<News> findBySearch(Short isNotice,String searchContent,PagingBean pb);
	/**
	 * 查找图片新闻
	 * @param pb
	 * @return
	 */
	public List<News> findImageNews(Long sectionId,PagingBean pb);
}
