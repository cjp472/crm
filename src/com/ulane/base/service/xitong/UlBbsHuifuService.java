package com.ulane.base.service.xitong;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.service.BaseService;
import com.htsoft.core.web.paging.PagingBean;
import com.ulane.base.model.xitong.UlBbsHuifu;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public interface UlBbsHuifuService extends BaseService<UlBbsHuifu>{
	/**
	 * 查找发布话题
	 * @param pb
	 * @return
	 */
	public List<UlBbsHuifu> findHuaTi(Long sectionId,PagingBean pb);
}

