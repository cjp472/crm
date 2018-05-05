package com.ulane.base.dao.xitong.impl;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
 */
import java.util.List;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.ulane.base.dao.xitong.UlDepartmentDao;
import com.ulane.base.model.xitong.UlDepartment;

/**
 * 
 * @author cf0666@gmail.com
 * 
 */

@SuppressWarnings("unchecked")
public class UlDepartmentDaoImpl extends BaseDaoImpl<UlDepartment> implements
        UlDepartmentDao {

    public UlDepartmentDaoImpl() {
        super(UlDepartment.class);
    }

    @Override
    public List<UlDepartment> findByParentId(Long parentId) {
        final String hql = "from UlDepartment d where d.parentid=? and d.status=1";
        Object[] params = { parentId };
        return findByHql(hql, params);
    }

}