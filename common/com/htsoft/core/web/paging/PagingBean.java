package com.htsoft.core.web.paging;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/

/**
 * 分页类
 */
public class PagingBean{
	
	public static final String PAGING_BEAN="_paging_bean";
	
	public static Integer DEFAULT_PAGE_SIZE=25;
	
	/**
	 * 最多显示页码数
	 */
	public static final int SHOW_PAGES=6;
	
	/**
	 * 每页开始的索引号
	 */
	public Integer start;
	//页码大小
	private Integer pageSize;

	//总记录数
	private Integer totalItems;
	
	public PagingBean(int start,int limit){
		this.pageSize=limit;
		this.start=start;
	}

	public Integer getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public int getTotalItems() {
		return totalItems;
	}

	public Integer getStart() {
		return start;
	}

	public void setStart(Integer start) {
		this.start = start;
	}

	public void setTotalItems(Integer totalItems) {
		this.totalItems = totalItems;
	}

	public void setTotalItems(int totalItems) {
		this.totalItems = totalItems;		
				
	}
	
	public int getFirstResult(){
		return start;
	}

}
