package com.ulane.know.dao.know.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;


import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.ulane.know.dao.know.UkKnowTemplateDao;
import com.ulane.know.model.know.UkKnowTemplate;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

@SuppressWarnings("unchecked")
public class UkKnowTemplateDaoImpl extends BaseDaoImpl<UkKnowTemplate> implements UkKnowTemplateDao{

	public UkKnowTemplateDaoImpl() {
		super(UkKnowTemplate.class);
	}

	/**
	 * 根据是否删除查询
	 * @param isDelete
	 * @param key
	 * @return List
	 * @author zhangyl
	 * @createtime 2012年5月29日 18:21:25
	 */
	@Override
	public List<UkKnowTemplate> getByIsDelete(Long isDelete,String key) {
		Date sysDate = new Date();
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		String a = dateFormat.format(sysDate);
		try {
			sysDate = dateFormat.parse(a);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
//		String hql="from UkKnowTemplate uk where uk.isDelete ="+isDelete+" and uk.knowTmpType.key = '"+key+"' and uk.beginTime<= sysdate and uk.closeTime>= sysdate order by uk.createDate desc";
		StringBuffer sb = new StringBuffer();
		sb.append("from UkKnowTemplate uk where uk.knowStatus ="+isDelete);
		if(!"".equals(key) && key!= null){
			sb.append(" and uk.knowTmpType.dicId = '"+key+"'");
			if("22850".equals(key))sb.append(" and uk.knowTmpRange.dicId = 22854 ");
		}
		sb.append(" and uk.beginTime<= sysdate and uk.closeTime>= sysdate order by uk.createDate desc");
		return findByHql(sb.toString());
	}

	/**
	 * 根据模版类型查找 (in)
	 * @param TypeId    (如 : 1,2,3)
	 * @return List<UkKnowTemplate>
	 * @author zhangyl
	 * @createtime 2012年7月5日 16:59:25
	 */
	@Override
	public List<UkKnowTemplate> getByInTypeId(String TypeId) {
		String hql="";
		if(!"".equals(TypeId)){
			 hql="from UkKnowTemplate uk where uk.knowTmpType in("+TypeId+") and uk.isDelete = 0 order by uk.createDate desc";
		}else{
			 hql="from UkKnowTemplate uk where uk.isDelete = 0 order by uk.createDate desc";
		}
		
		return findByHql(hql);
	}

	
}