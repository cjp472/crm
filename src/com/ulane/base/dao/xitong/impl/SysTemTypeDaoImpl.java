package com.ulane.base.dao.xitong.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.Constants;
import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.ulane.base.dao.xitong.SysTemTypeDao;
import com.ulane.base.model.xitong.SysTemType;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

@SuppressWarnings("unchecked")
public class SysTemTypeDaoImpl extends BaseDaoImpl<SysTemType> implements SysTemTypeDao{

	public SysTemTypeDaoImpl() {
		super(SysTemType.class);
	}
	
	/**
	 * 根据父节点查找
	 * @return List<SysTemType>
	 * @param parentId
	 * @author zhangyl
	 * @createtime 2012年7月5日 15:32:39
	 */
	@Override
	public List<SysTemType> getByParentId(Long parentId) {
		String hql=" from SysTemType st where st.parentId = ? and st.ukTmpTypeStatus = "+Constants.FLAG_UNDELETED+" order by st.tmpTypeId asc";
		return findByHql(hql, new Object[]{parentId});
	}

	/**
	 * 根据path 查找所有的子节点
	 * @param path
	 * @return List<SysTemType>
	 * @author zhangyl
	 * @createtime 2012年7月5日 16:40:20
	 */
	@Override
	public List<SysTemType> likePath(String path) {
		String hql=" from SysTemType st where st.path like '"+path+"%' and st.ukTmpTypeStatus = 0 order by st.tmpTypeId asc";
		return findByHql(hql);
	}
	
	

}