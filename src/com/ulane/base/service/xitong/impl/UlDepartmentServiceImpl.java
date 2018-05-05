package com.ulane.base.service.xitong.impl;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
 */
import java.util.List;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.base.dao.xitong.UlDepartmentDao;
import com.ulane.base.model.xitong.UlDepartment;
import com.ulane.base.service.xitong.UlDepartmentService;

/**
 * 
 * @author cf0666@gmail.com
 * 
 */

public class UlDepartmentServiceImpl extends BaseServiceImpl<UlDepartment>
        implements UlDepartmentService {
    private UlDepartmentDao dao;

    public UlDepartmentServiceImpl(UlDepartmentDao dao) {
        super(dao);
        this.dao = dao;
    }

    @Override
    public List<UlDepartment> findByParentId(Long parentId) {
        return dao.findByParentId(parentId);
    }

}