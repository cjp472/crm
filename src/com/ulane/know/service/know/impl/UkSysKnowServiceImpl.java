package com.ulane.know.service.know.impl;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
 */
import java.util.List;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.core.web.paging.PagingBean;
import com.ulane.know.dao.know.UkSysKnowDao;
import com.ulane.know.model.know.UkSysKnow;
import com.ulane.know.service.know.UkSysKnowService;

/**
 * 
 * @author cf0666@gmail.com
 * 
 */

public class UkSysKnowServiceImpl extends BaseServiceImpl<UkSysKnow> implements
		UkSysKnowService {

	private UkSysKnowDao dao;

	public UkSysKnowServiceImpl(UkSysKnowDao dao) {
		super(dao);
		this.dao = dao;
	}

	@Override
	public List<UkSysKnow> findDianPing() {
		// TODO Auto-generated method stub
		return dao.findDianPing();
	}

	@Override
	public List<UkSysKnow> findByStatus(int status) {
		// TODO Auto-generated method stub
		return dao.findByStatus(status);
	}
	@Override
	public List<UkSysKnow> findInStatus(String status){
		return dao.findInStatus(status);
	}
	@Override
	public List<UkSysKnow> findByStatusAndId(int status, long knowApproveId) {
		// TODO Auto-generated method stub
		return dao.findByStatusAndId(status, knowApproveId);
	}

	@Override
	public List<UkSysKnow> findByApproveId(long knowApproveId) {
		// TODO Auto-generated method stub
		return dao.findByApproveId(knowApproveId);
	}

	/**
	 * 过期知识查询
	 * @param keyWordName
	 * @param knowTypeName
	 * @param minPastTime
	 * @param maxPastTime
	 * @param title
	 * @return
	 * @updateTime 2012年8月30日 12:21:19
	 */
	public List<UkSysKnow> expiredKnow(String keyWordName, String knowTypeName,
			String minPastTime, String maxPastTime,String title) {
		return dao.expiredKnow(keyWordName, knowTypeName, minPastTime, maxPastTime, title);
	}

	/**
	 * @methodName 知识全文搜索(*用于知识搜索*)
	 * @param searchContent
	 *            搜索内容
	 * @param pb
	 *            分页
	 * @param uploadPath
	 *            索引路径
	 * @param old
	 *            是否过期
	 * @param drop
	 *            是否废弃
	 * @return List<UkSysKnow>
	 * @author zhangyl
	 * @createtime 2012年6月29日 16:49:04
	 */
	public List<UkSysKnow> findBySearch(String searchContent, PagingBean pb,
			String uploadPath, String old, String drop) {
		return dao.findBySearch(searchContent, pb, uploadPath, old, drop);
	}

	/**
	 * @methodName 根据标题,业务类型,关键字,是否过期,是否作废查询(*用于知识搜索*)
	 * @param searchContent
	 *            搜索内容
	 * @param pb
	 *            分页
	 * @param title
	 *            标题
	 * @param type
	 *            业务类型
	 * @param keyword
	 *            关键字
	 * @param old
	 *            是否过期
	 * @param drop
	 *            是否作废
	 * @return List<UkSysKnow>
	 * @author zhangyl
	 * @createtime 2012年6月29日 16:49:04
	 */
	public List<UkSysKnow> findByNoSearch(String searchContent, PagingBean pb,
			String title, String type, String keyword, String old, String drop) {
		return dao.findByNoSearch(searchContent, pb, title, type, keyword, old,
				drop);
	}

	@Override
	public boolean delete_real(Long ukKnowId) {
		// 删除点击信息
		dao.delete_real(ukKnowId);
		return true;
	}
	
	/**
	 *  知识查询通用方法
	 *  @param title 知识标题
	 *  @param keyWordName 关键字名称
	 *  @param knowTypeName 知识类型名称
	 *  @param isNew  是否是最新的
	 *  @param isViewCount 是否是排行榜
	 *  @param isdianpingCount 点评榜
	 *  @param status 知识状态
	 *  @param isDel 是否删除
	 *  @param isOverdue 是否过期
	 *  @param knowTypeId 知识类型ID(用于知识分类树型控件检索)
	 *  @param minPastTime 最小过期时间
	 *  @param maxPastTime 最大过期时间
	 *  @param NEQStatus  不等于什么状态
	 *  @param isPermission 是否验证权限
	 *  @param busiType 业务类型
	 *  @param checkTypeRole 分类权限验证
	 *  @author zhangyl
	 *  @createtime 2012年8月30日 10:44:29
	 */
	@Override
	public List<UkSysKnow> queryKnow(final int start,final int limit,String title,String keyWordName, String knowTypeName , String isNew, String isViewCount, String isdianpingCount , String status , String IS_DEL , String isOverdue ,String knowTypeId,String minPastTime, String maxPastTime , String NEQStatus , String isPermission,String busiType,String checkTypeRole){
		return dao.queryKnow(start, limit, title, keyWordName, knowTypeName, isNew, isViewCount, isdianpingCount, status, IS_DEL, isOverdue, knowTypeId, minPastTime, maxPastTime, NEQStatus, isPermission, busiType,checkTypeRole);
	}
	
	/**
	 *  知识查询通用方法(获得查询条数)
	 *  @param title 知识标题
	 *  @param keyWordName 关键字名称
	 *  @param knowTypeName 知识类型名称
	 *  @param isNew  是否是最新的
	 *  @param isViewCount 是否是排行榜
	 *  @param isdianpingCount 点评榜
	 *  @param status 知识状态
	 *  @param isDel 是否删除
	 *  @param isOverdue 是否过期
	 *  @param knowTypeId 知识类型ID(用于知识分类树型控件检索)
	 *  @param minPastTime 最小过期时间
	 *  @param maxPastTime 最大过期时间
	 *  @param NEQStatus  不等于什么状态
	 *  @param isPermission 是否验证权限
	 *  @param busiType 业务类型
	 *  @param checkTypeRole 分类权限验证
	 *  @author zhangyl
	 *  @createtime 2012年8月30日 10:44:29
	 */
	@Override
	public int queryKnowCount(final int start,final int limit,String title,String keyWordName, String knowTypeName , String isNew, String isViewCount, String isdianpingCount , String status , String IS_DEL , String isOverdue ,String knowTypeId,String minPastTime, String maxPastTime , String NEQStatus , String isPermission , String busiType,String checkTypeRole) {
		return dao.queryKnowCount(start, limit, title, keyWordName, knowTypeName, isNew, isViewCount, isdianpingCount, status, IS_DEL, isOverdue, knowTypeId, minPastTime, maxPastTime, NEQStatus, isPermission, busiType,checkTypeRole);
	}
	
	//保存浏览数
	@Override
	public void saveCount(Long knowId){
		UkSysKnow ukSysKnow = dao.get(knowId);
		 if (ukSysKnow.getSysKnowStatus().equals(5)) {
			 ukSysKnow.setViewCount(ukSysKnow.getViewCount() + 1);
		 }
		dao.saveCount(knowId, ukSysKnow.getViewCount());
	}
	
	/**
	 * 查询知识订阅
	 * @param start
	 * @param limit
	 * @param busiType
	 * @param knowType
	 * @param keyWord
	 * @param STitle
	 * @param SBusiType
	 * @return
	 */
	@Override
	public List<UkSysKnow> findByDingYue(final int start,final int limit,String busiType,String knowType,String keyWord,String STitle,String SBusiType){
		return dao.findByDingYue(start, limit, busiType, knowType, keyWord, STitle, SBusiType);
	}
	
	/**
	 * 查询知识订阅(条目)
	 * @param start
	 * @param limit
	 * @param busiType
	 * @param knowType
	 * @param keyWord
	 * @param STitle
	 * @param SBusiType
	 * @return
	 */
	@Override
	public int findByDingYueCount(final int start,final int limit,String busiType,String knowType,String keyWord,String STitle,String SBusiType){
		return dao.findByDingYueCount(start, limit, busiType, knowType, keyWord, STitle, SBusiType);
	}

	@Override
	public boolean delete_dimensionality_know(Long ukKnowId) {
		// TODO Auto-generated method stub
		dao.delete_dimensionality_know(ukKnowId);
		return true;
	}

	@Override
	public List<UkSysKnow> findMyKnow(int start, int limit, String title,
			String keyWordName, String mark, String dimenId, String dimStrIds) {
		// TODO Auto-generated method stub
		return dao.findMyKnow(start, limit, title, keyWordName, mark, dimenId,dimStrIds);
	}

	@Override
	public int countMyKnow(int start, int limit, String title,
			String keyWordName, String mark, String dimenId, String dimStrIds) {
		// TODO Auto-generated method stub
		return dao.countMyKnow(start, limit, title, keyWordName, mark, dimenId, dimStrIds);
	}
	
	/**
	 * 修改知识的状态
	 * @param knowId
	 */
	@Override
	public void updateKnowStatus(String knowId,String knowStatus){
		dao.updateKnowStatus(knowId, knowStatus);
	}
	
}