package com.htsoft.oa.service.system;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.service.BaseService;
import com.htsoft.oa.model.system.Department;

public interface DepartmentService extends BaseService<Department> {

	public List<Department> findByParentId(Long parentId);
	public List<Department> findByDepName(String depName);
	public List<Department> findByPath(String path);
}
