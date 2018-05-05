package com.ulane.base.dao.xitong.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.ulane.base.dao.xitong.BmBillNumDao;
import com.ulane.base.model.xitong.BmBillNum;

@SuppressWarnings("unchecked")
public class BmBillNumDaoImpl extends BaseDaoImpl<BmBillNum> implements BmBillNumDao{

	public BmBillNumDaoImpl() {
		super(BmBillNum.class);
	}

	@Override
	public BmBillNum getByBillType(int billType) {
		// TODO Auto-generated method stub
		BmBillNum bmBillNum = new BmBillNum();
		String hql=" from BmBillNum ggl where ggl.billType = ? ";
		try{
			List<BmBillNum> rlist = findByHql(hql,new Object[]{(long)billType});
			if(!rlist.isEmpty())
				bmBillNum = rlist.get(0);
		}
		catch(Exception e){
			System.out.println(e);
		}
		
		return bmBillNum;
	}

}