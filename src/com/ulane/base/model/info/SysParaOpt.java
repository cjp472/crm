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
 * SysParaOpt Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class SysParaOpt extends com.htsoft.core.model.BaseModel {

    protected Long sysParaOptId;
	protected String sysParaOptName;
	protected String sysParaOptValue;
	protected com.ulane.base.model.info.SysPara sysPara;


	/**
	 * Default Empty Constructor for class SysParaOpt
	 */
	public SysParaOpt () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class SysParaOpt
	 */
	public SysParaOpt (
		 Long in_sysParaOptId
        ) {
		this.setSysParaOptId(in_sysParaOptId);
    }

	
	public com.ulane.base.model.info.SysPara getSysPara () {
		return sysPara;
	}	
	
	public void setSysPara (com.ulane.base.model.info.SysPara in_sysPara) {
		this.sysPara = in_sysPara;
	}
    

	/**
	 * 系统参数选项内码	 * @return Long
     * @hibernate.id column="SYS_PARA_OPT_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getSysParaOptId() {
		return this.sysParaOptId;
	}
	
	/**
	 * Set the sysParaOptId
	 */	
	public void setSysParaOptId(Long aValue) {
		this.sysParaOptId = aValue;
	}	

	/**
	 * 系统参数内码	 * @return Long
	 */
	public Long getSysParaId() {
		return this.getSysPara()==null?null:this.getSysPara().getSysParaId();
	}
	
	/**
	 * Set the sysParaId
	 */	
	public void setSysParaId(Long aValue) {
	    if (aValue==null) {
	    	sysPara = null;
	    } else if (sysPara == null) {
	        sysPara = new com.ulane.base.model.info.SysPara(aValue);
	        sysPara.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
			sysPara.setSysParaId(aValue);
	    }
	}	

	/**
	 * 系统参数选项名称	 * @return String
	 * @hibernate.property column="SYS_PARA_OPT_NAME" type="java.lang.String" length="512" not-null="false" unique="false"
	 */
	public String getSysParaOptName() {
		return this.sysParaOptName;
	}
	
	/**
	 * Set the sysParaOptName
	 */	
	public void setSysParaOptName(String aValue) {
		this.sysParaOptName = aValue;
	}	

	/**
	 * 系统参数选项值	 * @return String
	 * @hibernate.property column="SYS_PARA_OPT_VALUE" type="java.lang.String" length="512" not-null="false" unique="false"
	 */
	public String getSysParaOptValue() {
		return this.sysParaOptValue;
	}
	
	/**
	 * Set the sysParaOptValue
	 */	
	public void setSysParaOptValue(String aValue) {
		this.sysParaOptValue = aValue;
	}	

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof SysParaOpt)) {
			return false;
		}
		SysParaOpt rhs = (SysParaOpt) object;
		return new EqualsBuilder()
				.append(this.sysParaOptId, rhs.sysParaOptId)
						.append(this.sysParaOptName, rhs.sysParaOptName)
				.append(this.sysParaOptValue, rhs.sysParaOptValue)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.sysParaOptId) 
						.append(this.sysParaOptName) 
				.append(this.sysParaOptValue) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("sysParaOptId", this.sysParaOptId) 
						.append("sysParaOptName", this.sysParaOptName) 
				.append("sysParaOptValue", this.sysParaOptValue) 
				.toString();
	}



}
