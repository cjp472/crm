package com.htsoft.oa.service.communicate;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.service.BaseService;
import com.htsoft.oa.model.communicate.PhoneGroup;

public interface PhoneGroupService extends BaseService<PhoneGroup>{
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


