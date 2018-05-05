package com.ulane.monitor.model.unim;
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
 * UnimAssStatus Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class UnimAssStatus extends com.htsoft.core.model.BaseModel {

    protected Long statusId;
	protected String statusName;
	protected String statusCode;
	protected String extend1;
	protected String extend2;
	protected String extend3;
	protected String extend4;
	protected String remark;
	protected Short status;
	public static final Short UNIM_ASS_STATUS_YYOUXIAO = 1;	//有效
	public static final Short UNIM_ASS_STATUS_ZHUXIAO = 2;	//有效

	//处理字段
	protected String ziChanLx;
	public String getZiChanLx() {
		return ziChanLx;
	}

	public void setZiChanLx(String ziChanLx) {
		this.ziChanLx = ziChanLx;
	}
	protected com.ulane.monitor.model.unim.UnimAssCategory unimAssCategory;


	/**
	 * Default Empty Constructor for class UnimAssStatus
	 */
	public UnimAssStatus () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class UnimAssStatus
	 */
	public UnimAssStatus (
		 Long in_statusId
        ) {
		this.setStatusId(in_statusId);
    }

	
	public com.ulane.monitor.model.unim.UnimAssCategory getUnimAssCategory () {
		return unimAssCategory;
	}	
	
	public void setUnimAssCategory (com.ulane.monitor.model.unim.UnimAssCategory in_unimAssCategory) {
		this.unimAssCategory = in_unimAssCategory;
	}
    

	/**
	 * 资产状态ID	 * @return Long
     * @hibernate.id column="STATUS_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getStatusId() {
		return this.statusId;
	}
	
	/**
	 * Set the statusId
	 */	
	public void setStatusId(Long aValue) {
		this.statusId = aValue;
	}	

	/**
	 * 资产类型ID	 * @return Long
	 */
	public Long getCatId() {
		return this.getUnimAssCategory()==null?null:this.getUnimAssCategory().getCatId();
	}
	
	/**
	 * Set the catId
	 */	
	public void setCatId(Long aValue) {
	    if (aValue==null) {
	    	unimAssCategory = null;
	    } else if (unimAssCategory == null) {
	        unimAssCategory = new com.ulane.monitor.model.unim.UnimAssCategory(aValue);
	        unimAssCategory.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
			unimAssCategory.setCatId(aValue);
	    }
	}	

	/**
	 * 资产状态名称	 * @return String
	 * @hibernate.property column="STATUS_NAME" type="java.lang.String" length="128" not-null="true" unique="false"
	 */
	public String getStatusName() {
		return this.statusName;
	}
	
	/**
	 * Set the statusName
	 * @spring.validator type="required"
	 */	
	public void setStatusName(String aValue) {
		this.statusName = aValue;
	}	

	/**
	 * 资产状态编号	 * @return String
	 * @hibernate.property column="STATUS_CODE" type="java.lang.String" length="128" not-null="true" unique="false"
	 */
	public String getStatusCode() {
		return this.statusCode;
	}
	
	/**
	 * Set the statusCode
	 * @spring.validator type="required"
	 */	
	public void setStatusCode(String aValue) {
		this.statusCode = aValue;
	}	

	/**
	 * 扩展字段1（显示颜色1）	 * @return String
	 * @hibernate.property column="EXTEND1" type="java.lang.String" length="256" not-null="false" unique="false"
	 */
	public String getExtend1() {
		return this.extend1;
	}
	
	/**
	 * Set the extend1
	 */	
	public void setExtend1(String aValue) {
		this.extend1 = aValue;
	}	

	/**
	 * 扩展字段2	 * @return String
	 * @hibernate.property column="EXTEND2" type="java.lang.String" length="256" not-null="false" unique="false"
	 */
	public String getExtend2() {
		return this.extend2;
	}
	
	/**
	 * Set the extend2
	 */	
	public void setExtend2(String aValue) {
		this.extend2 = aValue;
	}	

	/**
	 * 扩展字段3	 * @return String
	 * @hibernate.property column="EXTEND3" type="java.lang.String" length="256" not-null="false" unique="false"
	 */
	public String getExtend3() {
		return this.extend3;
	}
	
	/**
	 * Set the extend3
	 */	
	public void setExtend3(String aValue) {
		this.extend3 = aValue;
	}	

	/**
	 * 扩展字段4	 * @return String
	 * @hibernate.property column="EXTEND4" type="java.lang.String" length="256" not-null="false" unique="false"
	 */
	public String getExtend4() {
		return this.extend4;
	}
	
	/**
	 * Set the extend4
	 */	
	public void setExtend4(String aValue) {
		this.extend4 = aValue;
	}	

	/**
	 * 备注	 * @return String
	 * @hibernate.property column="REMARK" type="java.lang.String" length="4000" not-null="false" unique="false"
	 */
	public String getRemark() {
		return this.remark;
	}
	
	/**
	 * Set the remark
	 */	
	public void setRemark(String aValue) {
		this.remark = aValue;
	}	

	/**
	 * 状态：启用、注销	 * @return Short
	 * @hibernate.property column="STATUS" type="java.lang.Short" length="5" not-null="true" unique="false"
	 */
	public Short getStatus() {
		return this.status;
	}
	
	/**
	 * Set the status
	 * @spring.validator type="required"
	 */	
	public void setStatus(Short aValue) {
		this.status = aValue;
	}	

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof UnimAssStatus)) {
			return false;
		}
		UnimAssStatus rhs = (UnimAssStatus) object;
		return new EqualsBuilder()
				.append(this.statusId, rhs.statusId)
						.append(this.statusName, rhs.statusName)
				.append(this.statusCode, rhs.statusCode)
				.append(this.extend1, rhs.extend1)
				.append(this.extend2, rhs.extend2)
				.append(this.extend3, rhs.extend3)
				.append(this.extend4, rhs.extend4)
				.append(this.remark, rhs.remark)
				.append(this.status, rhs.status)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.statusId) 
						.append(this.statusName) 
				.append(this.statusCode) 
				.append(this.extend1) 
				.append(this.extend2) 
				.append(this.extend3) 
				.append(this.extend4) 
				.append(this.remark) 
				.append(this.status) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("statusId", this.statusId) 
						.append("statusName", this.statusName) 
				.append("statusCode", this.statusCode) 
				.append("extend1", this.extend1) 
				.append("extend2", this.extend2) 
				.append("extend3", this.extend3) 
				.append("extend4", this.extend4) 
				.append("remark", this.remark) 
				.append("status", this.status) 
				.toString();
	}



}
