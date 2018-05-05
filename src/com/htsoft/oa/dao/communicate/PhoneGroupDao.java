package com.htsoft.oa.dao.communicate;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.dao.BaseDao;
import com.htsoft.oa.model.communicate.PhoneGroup;

/**
 * 
 * @author 
 *
 */
public interface PhoneGroupDao extends BaseDao<PhoneGroup>{
	
	public Integer findLastSn(Long userId);
	public PhoneGroup findBySn(Integer sn,Long userId);
	public List<PhoneGroup> findBySnUp(Integer sn,Long userId);
	public List<PhoneGroup> findBySnDown(Integer sn,Long userId);
	public List<PhoneGroup> getAll(Long userId);
	
	public Integer findPublicLastSn();
	public PhoneGroup findPublicBySn(Integer sn);
	public List<PhoneGroup> findPublicBySnUp(Integer sn);
	public List<PhoneGroup> findPublicBySnDown(Integer sn);
	public List<PhoneGroup> getPublicAll();
}