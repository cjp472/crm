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
 * UkKnowDingyue Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class UkKnowDingyue extends com.htsoft.core.model.BaseModel {

    protected Long dingyueId;
	protected String busiType;
	protected String desCribe;
	protected Long userid;
	protected String knowTypeDingyue;
	protected String knowKeyword;
//	protected com.ulane.know.model.know.UkKnowType ukKnowType;


	/**
	 * Default Empty Constructor for class UkKnowDingyue
	 */
	public UkKnowDingyue () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class UkKnowDingyue
	 */
	public UkKnowDingyue (
		 Long in_dingyueId
        ) {
		this.setDingyueId(in_dingyueId);
    }

	
//	public com.ulane.know.model.know.UkKnowType getUkKnowType () {
//		return ukKnowType;
//	}	
//	
//	public void setUkKnowType (com.ulane.know.model.know.UkKnowType in_ukKnowType) {
//		this.ukKnowType = in_ukKnowType;
//	}
    

	/**
	 * 订阅内码	 * @return Long
     * @hibernate.id column="DINGYUE_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getDingyueId() {
		return this.dingyueId;
	}
	
	/**
	 * Set the dingyueId
	 */	
	public void setDingyueId(Long aValue) {
		this.dingyueId = aValue;
	}	

	/**
	 * 知识分类内码	 * @return Long
	 */
//	public Long getKnowTypeId() {
//		return this.getUkKnowType()==null?null:this.getUkKnowType().getKnowTypeId();
//	}
	
	/**
	 * Set the knowTypeId
	 */	
//	public void setKnowTypeId(Long aValue) {
//	    if (aValue==null) {
//	    	ukKnowType = null;
//	    } else if (ukKnowType == null) {
//	        ukKnowType = new com.ulane.know.model.know.UkKnowType(aValue);
//	        ukKnowType.setVersion(new Integer(0));//set a version to cheat hibernate only
//	    } else {
//	    	//
//			ukKnowType.setKnowTypeId(aValue);
//	    }
//	}	

	/**
	 * 业务分类&BUSI_TYPE	 * @return Long
	 * @hibernate.property column="BUSI_TYPE" type="java.lang.Long" length="38" not-null="false" unique="false"
	 */
	
	public String getBusiType() {
		return busiType;
	}

	public void setBusiType(String busiType) {
		this.busiType = busiType;
	}

	/**
	 * 说明	 * @return String
	 * @hibernate.property column="DES_CRIBE" type="java.lang.String" length="300" not-null="false" unique="false"
	 */
	public String getDesCribe() {
		return this.desCribe;
	}

	/**
	 * Set the desCribe
	 */	
	public void setDesCribe(String aValue) {
		this.desCribe = aValue;
	}	

	/**
	 * 用户	 * @return Long
	 * @hibernate.property column="USERID" type="java.lang.Long" length="38" not-null="false" unique="false"
	 */
	public Long getUserid() {
		return this.userid;
	}
	
	/**
	 * Set the userid
	 */	
	public void setUserid(Long aValue) {
		this.userid = aValue;
	}	

	public String getKnowTypeDingyue() {
		return knowTypeDingyue;
	}

	public void setKnowTypeDingyue(String knowTypeDingyue) {
		this.knowTypeDingyue = knowTypeDingyue;
	}

	public String getKnowKeyword() {
		return knowKeyword;
	}

	public void setKnowKeyword(String knowKeyword) {
		this.knowKeyword = knowKeyword;
	}

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof UkKnowDingyue)) {
			return false;
		}
		UkKnowDingyue rhs = (UkKnowDingyue) object;
		return new EqualsBuilder()
				.append(this.dingyueId, rhs.dingyueId)
				.append(this.busiType, rhs.busiType)
				.append(this.desCribe, rhs.desCribe)
				.append(this.userid, rhs.userid)
				.append(this.knowTypeDingyue, rhs.knowTypeDingyue)
				.append(this.knowKeyword, rhs.knowKeyword)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.dingyueId) 
				.append(this.busiType) 
				.append(this.desCribe) 
				.append(this.userid) 
				.append(this.knowTypeDingyue)
				.append(this.knowKeyword)
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("dingyueId", this.dingyueId) 
				.append("busiType", this.busiType) 
				.append("desCribe", this.desCribe) 
				.append("userid", this.userid) 
				.append("knowTypeDingyue", this.knowTypeDingyue)
				.append("knowKeyword", this.knowKeyword)
				.toString();
	}



}
