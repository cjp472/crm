package com.ulane.shsh.model.shhq;
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
 * ShBugRepStuff Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class ShBugRepStuff extends com.htsoft.core.model.BaseModel {

    protected Long stuffId;
	protected String name;
	protected String stuffSpec;
	protected Integer num;
	protected java.math.BigDecimal price;
	protected java.math.BigDecimal totalCash;
	protected String remark;
	protected com.ulane.shsh.model.shhq.ShBugRepaire shBugRepaire;


	/**
	 * Default Empty Constructor for class ShBugRepStuff
	 */
	public ShBugRepStuff () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class ShBugRepStuff
	 */
	public ShBugRepStuff (
		 Long in_stuffId
        ) {
		this.setStuffId(in_stuffId);
    }

	
	public com.ulane.shsh.model.shhq.ShBugRepaire getShBugRepaire () {
		return shBugRepaire;
	}	
	
	public void setShBugRepaire (com.ulane.shsh.model.shhq.ShBugRepaire in_shBugRepaire) {
		this.shBugRepaire = in_shBugRepaire;
	}
    

	/**
	 * 内码	 * @return Long
     * @hibernate.id column="STUFF_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getStuffId() {
		return this.stuffId;
	}
	
	/**
	 * Set the stuffId
	 */	
	public void setStuffId(Long aValue) {
		this.stuffId = aValue;
	}	

	/**
	 * 维修单内码	 * @return Long
	 */
	public Long getRepId() {
		return this.getShBugRepaire()==null?null:this.getShBugRepaire().getRepId();
	}
	
	/**
	 * Set the repId
	 */	
	public void setRepId(Long aValue) {
	    if (aValue==null) {
	    	shBugRepaire = null;
	    } else if (shBugRepaire == null) {
	        shBugRepaire = new com.ulane.shsh.model.shhq.ShBugRepaire(aValue);
	        shBugRepaire.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
			shBugRepaire.setRepId(aValue);
	    }
	}	

	/**
	 * 材料名称	 * @return String
	 * @hibernate.property column="NAME" type="java.lang.String" length="128" not-null="false" unique="false"
	 */
	public String getName() {
		return this.name;
	}
	
	/**
	 * Set the name
	 */	
	public void setName(String aValue) {
		this.name = aValue;
	}	

	/**
	 * 规格	 * @return String
	 * @hibernate.property column="STUFF_SPEC" type="java.lang.String" length="128" not-null="false" unique="false"
	 */
	public String getStuffSpec() {
		return this.stuffSpec;
	}
	
	/**
	 * Set the stuffSpec
	 */	
	public void setStuffSpec(String aValue) {
		this.stuffSpec = aValue;
	}	

	/**
	 * 数量	 * @return Integer
	 * @hibernate.property column="NUM" type="java.lang.Integer" length="10" not-null="false" unique="false"
	 */
	public Integer getNum() {
		return this.num;
	}
	
	/**
	 * Set the num
	 */	
	public void setNum(Integer aValue) {
		this.num = aValue;
	}	

	/**
	 * 单价	 * @return java.math.BigDecimal
	 * @hibernate.property column="PRICE" type="java.math.BigDecimal" length="10" not-null="false" unique="false"
	 */
	public java.math.BigDecimal getPrice() {
		return this.price;
	}
	
	/**
	 * Set the price
	 */	
	public void setPrice(java.math.BigDecimal aValue) {
		this.price = aValue;
	}	

	/**
	 * 小计	 * @return java.math.BigDecimal
	 * @hibernate.property column="TOTAL_CASH" type="java.math.BigDecimal" length="10" not-null="false" unique="false"
	 */
	public java.math.BigDecimal getTotalCash() {
		return this.totalCash;
	}
	
	/**
	 * Set the totalCash
	 */	
	public void setTotalCash(java.math.BigDecimal aValue) {
		this.totalCash = aValue;
	}	

	/**
	 * 备注	 * @return String
	 * @hibernate.property column="REMARK" type="java.lang.String" length="300" not-null="false" unique="false"
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
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof ShBugRepStuff)) {
			return false;
		}
		ShBugRepStuff rhs = (ShBugRepStuff) object;
		return new EqualsBuilder()
				.append(this.stuffId, rhs.stuffId)
						.append(this.name, rhs.name)
				.append(this.stuffSpec, rhs.stuffSpec)
				.append(this.num, rhs.num)
				.append(this.price, rhs.price)
				.append(this.totalCash, rhs.totalCash)
				.append(this.remark, rhs.remark)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.stuffId) 
						.append(this.name) 
				.append(this.stuffSpec) 
				.append(this.num) 
				.append(this.price) 
				.append(this.totalCash) 
				.append(this.remark) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("stuffId", this.stuffId) 
						.append("name", this.name) 
				.append("stuffSpec", this.stuffSpec) 
				.append("num", this.num) 
				.append("price", this.price) 
				.append("totalCash", this.totalCash) 
				.append("remark", this.remark) 
				.toString();
	}



}
