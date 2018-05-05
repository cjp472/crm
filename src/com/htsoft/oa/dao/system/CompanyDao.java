package com.htsoft.oa.dao.system;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.util.List;
import com.htsoft.core.dao.BaseDao;
import com.htsoft.oa.model.system.Company;

/**
 * @author Student LHH
 *
 */
public interface CompanyDao extends BaseDao<Company> {
	
	public List<Company> findByHql(final String hql);
	public List<Company> findCompany();
	
}
