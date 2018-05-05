package com.htsoft.oa.service.system;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.service.BaseService;
import com.htsoft.oa.model.system.Company;

public interface CompanyService extends BaseService<Company> {

	public List<Company> findByHql(final String hql);
	public List<Company> findCompany();
}
