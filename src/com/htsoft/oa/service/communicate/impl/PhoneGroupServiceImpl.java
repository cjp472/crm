package com.htsoft.oa.service.communicate.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.communicate.PhoneGroupDao;
import com.htsoft.oa.model.communicate.PhoneGroup;
import com.htsoft.oa.service.communicate.PhoneGroupService;

public class PhoneGroupServiceImpl extends BaseServiceImpl<PhoneGroup> implements PhoneGroupService{
	private PhoneGroupDao dao;
	
	public PhoneGroupServiceImpl(PhoneGroupDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public Integer findLastSn(Long userId) {
		return dao.findLastSn(userId);
	}

	@Override
	public PhoneGroup findBySn(Integer sn, Long userId) {
		return dao.findBySn(sn, userId);
	}

	@Override
	public List<PhoneGroup> findBySnUp(Integer sn, Long userId) {
		return dao.findBySnUp(sn, userId);
	}

	@Override
	public List<PhoneGroup> findBySnDown(Integer sn, Long userId) {
		return dao.findBySnDown(sn, userId);
	}

	@Override
	public List<PhoneGroup> getAll(Long userId) {
		return dao.getAll(userId);
	}

	@Override
	public PhoneGroup findPublicBySn(Integer sn) {
		return dao.findPublicBySn(sn);
	}

	@Override
	public List<PhoneGroup> findPublicBySnDown(Integer sn) {
		return dao.findPublicBySnDown(sn);
	}

	@Override
	public List<PhoneGroup> findPublicBySnUp(Integer sn) {
		return dao.findPublicBySnUp(sn);
	}

	@Override
	public Integer findPublicLastSn() {
		return dao.findPublicLastSn();
	}

	@Override
	public List<PhoneGroup> getPublicAll() {
		return dao.getPublicAll();
	}

}