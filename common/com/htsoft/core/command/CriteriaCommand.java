package com.htsoft.core.command;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import org.hibernate.Criteria;


/**
 * Creates a command to wrap the Hibernate criteria API.
 * @author cf0666@gmail.com
 * 
 */
public interface CriteriaCommand {
	public final static String SORT_DESC="desc";
	public final static String SORT_ASC="asc";
	
	public Criteria execute(Criteria criteria);
}
