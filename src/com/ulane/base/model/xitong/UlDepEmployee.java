package com.ulane.base.model.xitong;
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
 * UlDepEmployee Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class UlDepEmployee extends com.htsoft.core.model.BaseModel {

    protected Long depuserid;
	protected Long ismain;
	protected Long sn;
	protected com.ulane.base.model.xitong.UlDepartment ulDepartment;
	protected com.ulane.base.model.xitong.UlEmployee ulEmployee;


	/**
	 * Default Empty Constructor for class UlDepEmployee
	 */
	public UlDepEmployee () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class UlDepEmployee
	 */
	public UlDepEmployee (
		 Long in_depuserid
        ) {
		this.setDepuserid(in_depuserid);
    }

	
	public com.ulane.base.model.xitong.UlDepartment getUlDepartment () {
		return ulDepartment;
	}	
	
	public void setUlDepartment (com.ulane.base.model.xitong.UlDepartment in_ulDepartment) {
		this.ulDepartment = in_ulDepartment;
	}
	
	public com.ulane.base.model.xitong.UlEmployee getUlEmployee () {
		return ulEmployee;
	}	
	
	public void setUlEmployee (com.ulane.base.model.xitong.UlEmployee in_ulEmployee) {
		this.ulEmployee = in_ulEmployee;
	}
    

	/**
	 * 	 * @return Long
     * @hibernate.id column="DEPUSERID" type="java.lang.Long" generator-class="native"
	 */
	public Long getDepuserid() {
		return this.depuserid;
	}
	
	/**
	 * Set the depuserid
	 */	
	public void setDepuserid(Long aValue) {
		this.depuserid = aValue;
	}	

	/**
	 * 	 * @return Long
	 */
	public Long getUserid() {
		return this.getUlEmployee()==null?null:this.getUlEmployee().getUseid();
	}
	
	/**
	 * Set the userid
	 */	
	public void setUserid(Long aValue) {
	    if (aValue==null) {
	    	ulEmployee = null;
	    } else if (ulEmployee == null) {
	        ulEmployee = new com.ulane.base.model.xitong.UlEmployee(aValue);
	        ulEmployee.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
			ulEmployee.setUseid(aValue);
	    }
	}	

	/**
	 * 	 * @return Long
	 */
	public Long getDepid() {
		return this.getUlDepartment()==null?null:this.getUlDepartment().getDepid();
	}
	
	/**
	 * Set the depid
	 */	
	public void setDepid(Long aValue) {
	    if (aValue==null) {
	    	ulDepartment = null;
	    } else if (ulDepartment == null) {
	        ulDepartment = new com.ulane.base.model.xitong.UlDepartment(aValue);
	        ulDepartment.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
			ulDepartment.setDepid(aValue);
	    }
	}	

	/**
	 * 	 * @return Long
	 * @hibernate.property column="ISMAIN" type="java.lang.Long" length="22" not-null="false" unique="false"
	 */
	public Long getIsmain() {
		return this.ismain;
	}
	
	/**
	 * Set the ismain
	 */	
	public void setIsmain(Long aValue) {
		this.ismain = aValue;
	}	

	/**
	 * 	 * @return Long
	 * @hibernate.property column="SN" type="java.lang.Long" length="18" not-null="false" unique="false"
	 */
	public Long getSn() {
		return this.sn;
	}
	
	/**
	 * Set the sn
	 */	
	public void setSn(Long aValue) {
		this.sn = aValue;
	}	

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof UlDepEmployee)) {
			return false;
		}
		UlDepEmployee rhs = (UlDepEmployee) object;
		return new EqualsBuilder()
				.append(this.depuserid, rhs.depuserid)
								.append(this.ismain, rhs.ismain)
				.append(this.sn, rhs.sn)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.depuserid) 
								.append(this.ismain) 
				.append(this.sn) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("depuserid", this.depuserid) 
								.append("ismain", this.ismain) 
				.append("sn", this.sn) 
				.toString();
	}



}
