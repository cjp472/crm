package com.ulane.know.model.know;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/


/**
 * UkKnowKeyword Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
@SuppressWarnings("serial")
public class UkKnowKeywordType extends com.htsoft.core.model.BaseModel {

    protected Long keywordTypeId;
	protected String name;
	protected String comMent;
	protected Long parentId;
	protected Long knowSort;
	protected Long keywordTypeStatus;
	protected Long createBy;
	protected Long updateBy;
	protected java.sql.Timestamp createDate;
	protected java.sql.Timestamp updateDate;
	protected com.ulane.know.model.know.UkKnowType ukKnowType;
	
    /**
     * 代表已启用
     */
    public static final Short FLAG_ENABLED = 1;
    /**
     * 代表已删除
     */
    public static final Short FLAG_DELETED = 2;
	
	public Long getKeywordTypeId() {
		return keywordTypeId;
	}
	public void setKeywordTypeId(Long keywordTypeId) {
		this.keywordTypeId = keywordTypeId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getComMent() {
		return comMent;
	}
	public void setComMent(String comMent) {
		this.comMent = comMent;
	}
	public Long getParentId() {
		return parentId;
	}
	public void setParentId(Long parentId) {
		this.parentId = parentId;
	}
	public Long getKeywordTypeStatus() {
		return keywordTypeStatus;
	}
	public void setKeywordTypeStatus(Long keywordTypeStatus) {
		this.keywordTypeStatus = keywordTypeStatus;
	}
	public Long getCreateBy() {
		return createBy;
	}
	public void setCreateBy(Long createBy) {
		this.createBy = createBy;
	}
	public Long getUpdateBy() {
		return updateBy;
	}
	public void setUpdateBy(Long updateBy) {
		this.updateBy = updateBy;
	}
	public java.sql.Timestamp getCreateDate() {
		return createDate;
	}
	public void setCreateDate(java.sql.Timestamp createDate) {
		this.createDate = createDate;
	}
	public java.sql.Timestamp getUpdateDate() {
		return updateDate;
	}
	public void setUpdateDate(java.sql.Timestamp updateDate) {
		this.updateDate = updateDate;
	}
	public com.ulane.know.model.know.UkKnowType getUkKnowType() {
		return ukKnowType;
	}
	public void setUkKnowType(com.ulane.know.model.know.UkKnowType ukKnowType) {
		this.ukKnowType = ukKnowType;
	}
	public Long getKnowSort() {
		return knowSort;
	}
	public void setKnowSort(Long knowSort) {
		this.knowSort = knowSort;
	}
}
