package com.ulane.base.service.xitong;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.service.BaseService;
import com.htsoft.oa.model.hrm.Job;
import com.ulane.base.model.xitong.UlUsergroup;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public interface UlUsergroupService extends BaseService<UlUsergroup>{
	/**
	 * @description 根据parentId条件查询; othername : findByParentId
	 * @param parentId
	 *            父节点Id
	 * @return List<Job>
	 */
	List<UlUsergroup> findByCondition(Long parentId);
}


