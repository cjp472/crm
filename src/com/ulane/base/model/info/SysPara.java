package com.ulane.base.model.info;
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
 * SysPara Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class SysPara extends com.htsoft.core.model.BaseModel {

    protected Long sysParaId;
	protected String sysParaName;
	protected String sysParaKey;
	protected String sysParaValue;

	protected java.util.Set sysParaOpts = new java.util.HashSet();

	/**
	 * Default Empty Constructor for class SysPara
	 */
	public SysPara () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class SysPara
	 */
	public SysPara (
		 Long in_sysParaId
        ) {
		this.setSysParaId(in_sysParaId);
    }


	public java.util.Set getSysParaOpts () {
		return sysParaOpts;
	}	
	
	private void setSysParaOpts (java.util.Set in_sysParaOpts) {
		this.sysParaOpts = in_sysParaOpts;
	}
    
	public void addOpt(SysParaOpt spo){
		this.sysParaOpts.add(spo);
	}

	/**
	 * 系统参数内码	 * @return Long
     * @hibernate.id column="SYS_PARA_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getSysParaId() {
		return this.sysParaId;
	}
	
	/**
	 * Set the sysParaId
	 */	
	public void setSysParaId(Long aValue) {
		this.sysParaId = aValue;
	}	

	/**
	 * 系统参数名称	 * @return String
	 * @hibernate.property column="SYS_PARA_NAME" type="java.lang.String" length="512" not-null="false" unique="false"
	 */
	public String getSysParaName() {
		return this.sysParaName;
	}
	
	/**
	 * Set the sysParaName
	 */	
	public void setSysParaName(String aValue) {
		this.sysParaName = aValue;
	}	

	/**
	 * 系统参数键	 * @return String
	 * @hibernate.property column="SYS_PARA_KEY" type="java.lang.String" length="512" not-null="false" unique="false"
	 */
	public String getSysParaKey() {
		return this.sysParaKey;
	}
	
	/**
	 * Set the sysParaKey
	 */	
	public void setSysParaKey(String aValue) {
		this.sysParaKey = aValue;
	}	

	/**
	 * 系统参数值	 * @return String
	 * @hibernate.property column="SYS_PARA_VALUE" type="java.lang.String" length="512" not-null="false" unique="false"
	 */
	public String getSysParaValue() {
		return this.sysParaValue;
	}
	
	/**
	 * Set the sysParaValue
	 */	
	public void setSysParaValue(String aValue) {
		this.sysParaValue = aValue;
	}	

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof SysPara)) {
			return false;
		}
		SysPara rhs = (SysPara) object;
		return new EqualsBuilder()
				.append(this.sysParaId, rhs.sysParaId)
				.append(this.sysParaName, rhs.sysParaName)
				.append(this.sysParaKey, rhs.sysParaKey)
				.append(this.sysParaValue, rhs.sysParaValue)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.sysParaId) 
				.append(this.sysParaName) 
				.append(this.sysParaKey) 
				.append(this.sysParaValue) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("sysParaId", this.sysParaId) 
				.append("sysParaName", this.sysParaName) 
				.append("sysParaKey", this.sysParaKey) 
				.append("sysParaValue", this.sysParaValue) 
				.toString();
	}



}
