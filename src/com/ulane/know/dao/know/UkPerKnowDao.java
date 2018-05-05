package com.ulane.know.dao.know;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.dao.BaseDao;
import com.ulane.know.model.know.UkPerKnow;

/**
 * 
 * @author cf0666@gmail.com
 *
 */
public interface UkPerKnowDao extends BaseDao<UkPerKnow>{
	
	/**
	 * 别人推荐的 和别人推荐的 (1:我推荐的 2:别人推荐的) 
	 * 根据知识名称和知识关键字 和知识状态查找我推荐的知识
	 * @author zhangyl
	 * @createtime 2012年6月19日 15:40:18
	 * @param String title, String keyWordName,String knowTypeName
	 */
	public List<UkPerKnow> tuiJianList(String title,String keyWordName,String knowTypeName,Long tuijian);
	
	/**
	 * 别人推荐的 和别人推荐的 (1:我推荐的 2:别人推荐的) 
	 * 根据知识关键字和(推荐人或被推荐人)和知识推荐时间或接收时间查推荐的知识
	 * @author gst
	 * @createtime 
	 * @param String keyWordName, String recommender, String receiver, String startTime, String endTime
	 */
	public List<UkPerKnow> tuiJianList(final int start,final int limit,String keyWordName,String recommender,String receiver,String startTime,String endTime,Long tuijian);
	
	/**查询多少条数
	 * 别人推荐的 和别人推荐的 (1:我推荐的 2:别人推荐的) 
	 * 根据知识关键字和(推荐人或被推荐人)和知识推荐时间或接收时间查推荐的知识
	 * @author gst
	 * @createtime 
	 * @param String keyWordName, String recommender, String receiver, String startTime, String endTime
	 */
	public int queryPerKnowCount(final int start,final int limit,String keyWordName, String recommender , String receiver, String startTime, String endTime ,Long tuijian);
	
	/**
	 * 根据知识分类找我的推荐
	 * @author Zhangyl
	 * @createtime 2012年6月20日 16:18:56
	 * @param typeId
	 * @return
	 */
	public List<UkPerKnow> findPerKnowByType(String typeId);
}