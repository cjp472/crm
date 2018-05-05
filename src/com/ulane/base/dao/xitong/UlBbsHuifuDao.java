package com.ulane.base.dao.xitong;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.dao.BaseDao;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.model.info.News;
import com.ulane.base.model.xitong.UlBbsHuifu;

/**
 * 
 * @author cf0666@gmail.com
 *
 */
public interface UlBbsHuifuDao extends BaseDao<UlBbsHuifu>{
	
	/**
	 * 查找发布话题
	 * @param pb
	 * @return
	 */
	public List<UlBbsHuifu> findHuaTi(Long sectionId,PagingBean pb);
}