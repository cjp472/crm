package com.ulane.know.service.know.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.know.dao.know.UkPerKnowDao;
import com.ulane.know.model.know.UkPerKnow;
import com.ulane.know.service.know.UkPerKnowService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class UkPerKnowServiceImpl extends BaseServiceImpl<UkPerKnow> implements UkPerKnowService{
	@SuppressWarnings("unused")
	private UkPerKnowDao dao;
	
	public UkPerKnowServiceImpl(UkPerKnowDao dao) {
		super(dao);
		this.dao=dao;
	}

	/**
	 * 别人推荐的 和别人推荐的     (1:我推荐的 2:别人推荐的) 
	 * 根据知识名称和知识关键字 和知识状态查找我推荐的知识
	 * @author ricoh.lin@gmail.com
	 * @createtime 2012年6月19日 15:40:18
	 * @param String title, String keyWordName,String knowTypeName
	 */
	
	public List<UkPerKnow> tuiJianList(String title, String keyWordName,
			String knowTypeName,Long tuijian) {
		return dao.tuiJianList(title, keyWordName, knowTypeName,tuijian);
	}

	/**
	 * 根据知识分类找我的推荐
	 * @author Zhangyl
	 * @createtime 2012年6月20日 16:18:56
	 * @param typeId
	 * @return
	 */
	@Override
	public List<UkPerKnow> findPerKnowByType(String typeId){
		return dao.findPerKnowByType(typeId);
	}
	/**
	 * 别人推荐的 和别人推荐的 (1:我推荐的 2:别人推荐的) 
	 * 根据知识关键字和(推荐人或被推荐人)和知识推荐时间或接收时间查推荐的知识
	 * @author gst
	 * @createtime 
	 * @param String keyWordName, String recommender, String receiver, String startTime, String endTime
	 */
	@Override
	public List<UkPerKnow> tuiJianList(int start, int limit,
			String keyWordName, String recommender, String receiver,
			String startTime, String endTime, Long tuijian) {
		// TODO Auto-generated method stub
		return dao.tuiJianList(start, limit, keyWordName, recommender, receiver, startTime, endTime, tuijian);
	}
	
	/**查询多少条数
	 * 别人推荐的 和别人推荐的 (1:我推荐的 2:别人推荐的) 
	 * 根据知识关键字和(推荐人或被推荐人)和知识推荐时间或接收时间查推荐的知识
	 * @author gst
	 * @createtime 
	 * @param String keyWordName, String recommender, String receiver, String startTime, String endTime
	 */
	@Override
	public int queryPerKnowCount(int start, int limit, String keyWordName,
			String recommender, String receiver, String startTime,
			String endTime,Long tuijian) {
		// TODO Auto-generated method stub
		return dao.queryPerKnowCount(start, limit, keyWordName, recommender, receiver, startTime, endTime, tuijian);
	}


}