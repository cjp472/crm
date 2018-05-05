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
 * UnimAssTarThrlevl Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class UnimAssTarThrlevl extends com.htsoft.core.model.BaseModel {

    protected Long thrlevlId;
	protected Long monitorId;
	protected Long thrlevl1;
	protected Long thrlevl2;
	protected Long thrlevl3;
	protected Long thrlevl4;
	protected String extend1;
	protected String extend2;
	protected String extend3;
	protected String extend4;
	protected com.ulane.monitor.model.unim.UnimAssets unimAssets;
	protected com.ulane.monitor.model.unim.UnimAssetsTarget unimAssetsTarget;


	/**
	 * Default Empty Constructor for class UnimAssTarThrlevl
	 */
	public UnimAssTarThrlevl () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class UnimAssTarThrlevl
	 */
	public UnimAssTarThrlevl (
		 Long in_thrlevlId
        ) {
		this.setThrlevlId(in_thrlevlId);
    }

	
	public com.ulane.monitor.model.unim.UnimAssets getUnimAssets () {
		return unimAssets;
	}	
	
	public void setUnimAssets (com.ulane.monitor.model.unim.UnimAssets in_unimAssets) {
		this.unimAssets = in_unimAssets;
	}
	
	public com.ulane.monitor.model.unim.UnimAssetsTarget getUnimAssetsTarget () {
		return unimAssetsTarget;
	}	
	
	public void setUnimAssetsTarget (com.ulane.monitor.model.unim.UnimAssetsTarget in_unimAssetsTarget) {
		this.unimAssetsTarget = in_unimAssetsTarget;
	}
    

	/**
	 * 阀值ID	 * @return Long
     * @hibernate.id column="THRLEVL_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getThrlevlId() {
		return this.thrlevlId;
	}
	
	/**
	 * Set the thrlevlId
	 */	
	public void setThrlevlId(Long aValue) {
		this.thrlevlId = aValue;
	}	

	/**
	 * 资产ID	 * @return Long
	 */
	public Long getAssetsId() {
		return this.getUnimAssets()==null?null:this.getUnimAssets().getAssetsId();
	}
	
	/**
	 * Set the assetsId
	 */	
	public void setAssetsId(Long aValue) {
	    if (aValue==null) {
	    	unimAssets = null;
	    } else if (unimAssets == null) {
	        unimAssets = new com.ulane.monitor.model.unim.UnimAssets(aValue);
	        unimAssets.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
			unimAssets.setAssetsId(aValue);
	    }
	}	

	/**
	 * 指标ID	 * @return Long
	 */
	public Long getTargetId() {
		return this.getUnimAssetsTarget()==null?null:this.getUnimAssetsTarget().getTargetId();
	}
	
	/**
	 * Set the targetId
	 */	
	public void setTargetId(Long aValue) {
	    if (aValue==null) {
	    	unimAssetsTarget = null;
	    } else if (unimAssetsTarget == null) {
	        unimAssetsTarget = new com.ulane.monitor.model.unim.UnimAssetsTarget(aValue);
	        unimAssetsTarget.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
			unimAssetsTarget.setTargetId(aValue);
	    }
	}	

	/**
	 * 班长ID	 * @return Long
	 * @hibernate.property column="MONITOR_ID" type="java.lang.Long" length="18" not-null="false" unique="false"
	 */
	public Long getMonitorId() {
		return this.monitorId;
	}
	
	/**
	 * Set the monitorId
	 */	
	public void setMonitorId(Long aValue) {
		this.monitorId = aValue;
	}	

	/**
	 * 阀值1	 * @return Long
	 * @hibernate.property column="THRLEVL1" type="java.lang.Long" length="18" not-null="false" unique="false"
	 */
	public Long getThrlevl1() {
		return this.thrlevl1;
	}
	
	/**
	 * Set the thrlevl1
	 */	
	public void setThrlevl1(Long aValue) {
		this.thrlevl1 = aValue;
	}	

	/**
	 * 阀值2	 * @return Long
	 * @hibernate.property column="THRLEVL2" type="java.lang.Long" length="18" not-null="false" unique="false"
	 */
	public Long getThrlevl2() {
		return this.thrlevl2;
	}
	
	/**
	 * Set the thrlevl2
	 */	
	public void setThrlevl2(Long aValue) {
		this.thrlevl2 = aValue;
	}	

	/**
	 * 阀值3	 * @return Long
	 * @hibernate.property column="THRLEVL3" type="java.lang.Long" length="18" not-null="false" unique="false"
	 */
	public Long getThrlevl3() {
		return this.thrlevl3;
	}
	
	/**
	 * Set the thrlevl3
	 */	
	public void setThrlevl3(Long aValue) {
		this.thrlevl3 = aValue;
	}	

	/**
	 * 阀值4	 * @return Long
	 * @hibernate.property column="THRLEVL4" type="java.lang.Long" length="18" not-null="false" unique="false"
	 */
	public Long getThrlevl4() {
		return this.thrlevl4;
	}
	
	/**
	 * Set the thrlevl4
	 */	
	public void setThrlevl4(Long aValue) {
		this.thrlevl4 = aValue;
	}	

	/**
	 * 扩展字段1（颜色1）	 * @return String
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
	 * 扩展字段2（颜色2）	 * @return String
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
	 * 扩展字段3（颜色3）	 * @return String
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
	 * 扩展字段4（颜色4）	 * @return String
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
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof UnimAssTarThrlevl)) {
			return false;
		}
		UnimAssTarThrlevl rhs = (UnimAssTarThrlevl) object;
		return new EqualsBuilder()
				.append(this.thrlevlId, rhs.thrlevlId)
								.append(this.monitorId, rhs.monitorId)
				.append(this.thrlevl1, rhs.thrlevl1)
				.append(this.thrlevl2, rhs.thrlevl2)
				.append(this.thrlevl3, rhs.thrlevl3)
				.append(this.thrlevl4, rhs.thrlevl4)
				.append(this.extend1, rhs.extend1)
				.append(this.extend2, rhs.extend2)
				.append(this.extend3, rhs.extend3)
				.append(this.extend4, rhs.extend4)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.thrlevlId) 
								.append(this.monitorId) 
				.append(this.thrlevl1) 
				.append(this.thrlevl2) 
				.append(this.thrlevl3) 
				.append(this.thrlevl4) 
				.append(this.extend1) 
				.append(this.extend2) 
				.append(this.extend3) 
				.append(this.extend4) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("thrlevlId", this.thrlevlId) 
								.append("monitorId", this.monitorId) 
				.append("thrlevl1", this.thrlevl1) 
				.append("thrlevl2", this.thrlevl2) 
				.append("thrlevl3", this.thrlevl3) 
				.append("thrlevl4", this.thrlevl4) 
				.append("extend1", this.extend1) 
				.append("extend2", this.extend2) 
				.append("extend3", this.extend3) 
				.append("extend4", this.extend4) 
				.toString();
	}



}
