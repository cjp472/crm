package com.ulane.base.service.xitong;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.service.BaseService;
import com.ulane.base.model.xitong.SysTemType;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public interface SysTemTypeService extends BaseService<SysTemType>{
	/**
	 * 根据父节点查找
	 * @return List<SysTemType>
	 * @param parentId
	 * @author zhangyl
	 * @createtime 2012年7月5日 15:32:39
	 */
	public List<SysTemType> getByParentId(Long parentId);
	 
	/**
	 * 根据ID获得所有的子节点
	 * @param path 根据path 模糊查询
	 * @return List<SysTemType> 
	 */
	public List<SysTemType> getByPath(Long temId);
}


