package com.ulane.know.model.know;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.EqualsBuilder;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

/**
 * UkKnowKeyword Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class UkKnowKeyword extends com.htsoft.core.model.BaseModel {

    /**
	 * 
	 */
	private static final long serialVersionUID = 1723953743986100643L;
	protected Long keywordId;
	protected String keyWord;
	protected String comMent;
	protected Long knowStatus;
	protected Long createBy;
	protected Long updateBy;
	protected java.sql.Timestamp createDate;
	protected java.sql.Timestamp updateDate;

	protected UkKnowKeywordType type;
	
	protected java.util.Set<UkSysKnow> ukSysKnows = new java.util.HashSet<UkSysKnow>();
	
    /**
     * 代表未启用
     */
    public static final Short FLAG_DISABLED = 0;
    /**
     * 代表已启用
     */
    public static final Short FLAG_ENABLED = 1;
    /**
     * 代表已删除
     */
    public static final Short FLAG_DELETED = 2;
	
	public UkKnowKeywordType getType() {
		return type;
	}

	public void setType(UkKnowKeywordType type) {
		this.type = type;
	}

	/**
	 * Default Empty Constructor for class UkKnowKeyword
	 */
	public UkKnowKeyword () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class UkKnowKeyword
	 */
	public UkKnowKeyword (
		 Long in_keywordId
        ) {
		this.setKeywordId(in_keywordId);
    }

    public java.util.Set<UkSysKnow> getUkSysKnows () {
        return ukSysKnows;
    }
    
    public void setUkSysKnows (java.util.Set<UkSysKnow> in_ukSysKnows) {
        this.ukSysKnows = in_ukSysKnows;
    }
    

	/**
	 * 关键字内码	 * @return Long
     * @hibernate.id column="KEYWORD_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getKeywordId() {
		return this.keywordId;
	}
	
	/**
	 * Set the keywordId
	 */	
	public void setKeywordId(Long aValue) {
		this.keywordId = aValue;
	}	

	/**
	 * 关键字	 * @return String
	 * @hibernate.property column="KEY_WORD" type="java.lang.String" length="20" not-null="false" unique="false"
	 */
	public String getKeyWord() {
		return this.keyWord;
	}
	
	/**
	 * Set the keyWord
	 */	
	public void setKeyWord(String aValue) {
		this.keyWord = aValue;
	}	

	/**
	 * 备注	 * @return String
	 * @hibernate.property column="COM_MENT" type="java.lang.String" length="300" not-null="false" unique="false"
	 */
	public String getComMent() {
		return this.comMent;
	}
	
	/**
	 * Set the comMent
	 */	
	public void setComMent(String aValue) {
		this.comMent = aValue;
	}	

	/**
	 * 状态&KNOW_STATUS	 * @return Integer
	 * @hibernate.property column="KNOW_STATUS" type="java.lang.Integer" length="10" not-null="false" unique="false"
	 */
	public Long getKnowStatus() {
		return this.knowStatus;
	}
	
	/**
	 * Set the knowStatus
	 */	
	public void setKnowStatus(Long aValue) {
		this.knowStatus = aValue;
	}	

	/**
	 * 创建人	 * @return Long
	 * @hibernate.property column="CREATE_BY" type="java.lang.Long" length="38" not-null="false" unique="false"
	 */
	public Long getCreateBy() {
		return this.createBy;
	}
	
	/**
	 * Set the createBy
	 */	
	public void setCreateBy(Long aValue) {
		this.createBy = aValue;
	}	

	/**
	 * 修改人	 * @return Long
	 * @hibernate.property column="UPDATE_BY" type="java.lang.Long" length="38" not-null="false" unique="false"
	 */
	public Long getUpdateBy() {
		return this.updateBy;
	}
	
	/**
	 * Set the updateBy
	 */	
	public void setUpdateBy(Long aValue) {
		this.updateBy = aValue;
	}	

	/**
	 * 创建时间	 * @return java.sql.Timestamp
	 * @hibernate.property column="CREATE_DATE" type="java.sql.Timestamp" length="11" not-null="false" unique="false"
	 */
	public java.sql.Timestamp getCreateDate() {
		return this.createDate;
	}
	
	/**
	 * Set the createDate
	 */	
	public void setCreateDate(java.sql.Timestamp aValue) {
		this.createDate = aValue;
	}	

	/**
	 * 修改时间	 * @return java.sql.Timestamp
	 * @hibernate.property column="UPDATE_DATE" type="java.sql.Timestamp" length="11" not-null="false" unique="false"
	 */
	public java.sql.Timestamp getUpdateDate() {
		return this.updateDate;
	}
	
	/**
	 * Set the updateDate
	 */	
	public void setUpdateDate(java.sql.Timestamp aValue) {
		this.updateDate = aValue;
	}	

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof UkKnowKeyword)) {
			return false;
		}
		UkKnowKeyword rhs = (UkKnowKeyword) object;
		return new EqualsBuilder()
				.append(this.keywordId, rhs.keywordId)
						.append(this.keyWord, rhs.keyWord)
				.append(this.comMent, rhs.comMent)
				.append(this.knowStatus, rhs.knowStatus)
				.append(this.createBy, rhs.createBy)
				.append(this.updateBy, rhs.updateBy)
				.append(this.createDate, rhs.createDate)
				.append(this.updateDate, rhs.updateDate)
				.append(this.type, rhs.type)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.keywordId) 
						.append(this.keyWord) 
				.append(this.comMent) 
				.append(this.knowStatus) 
				.append(this.createBy) 
				.append(this.updateBy) 
				.append(this.createDate) 
				.append(this.updateDate) 
				.append(this.type) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("keywordId", this.keywordId) 
						.append("keyWord", this.keyWord) 
				.append("comMent", this.comMent) 
				.append("knowStatus", this.knowStatus) 
				.append("createBy", this.createBy) 
				.append("updateBy", this.updateBy) 
				.append("createDate", this.createDate) 
				.append("updateDate", this.updateDate) 
				.append("type",this.type)
				.toString();
	}



}
