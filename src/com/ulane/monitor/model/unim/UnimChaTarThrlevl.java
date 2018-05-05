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
 * UnimChaTarThrlevl Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class UnimChaTarThrlevl extends com.htsoft.core.model.BaseModel {

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
	protected com.ulane.monitor.model.unim.UnimChannel unimChannel;
	protected com.ulane.monitor.model.unim.UnimChannelTarget unimChannelTarget;


	/**
	 * Default Empty Constructor for class UnimChaTarThrlevl
	 */
	public UnimChaTarThrlevl () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class UnimChaTarThrlevl
	 */
	public UnimChaTarThrlevl (
		 Long in_thrlevlId
        ) {
		this.setThrlevlId(in_thrlevlId);
    }

	
	public com.ulane.monitor.model.unim.UnimChannel getUnimChannel () {
		return unimChannel;
	}	
	
	public void setUnimChannel (com.ulane.monitor.model.unim.UnimChannel in_unimChannel) {
		this.unimChannel = in_unimChannel;
	}
	
	public com.ulane.monitor.model.unim.UnimChannelTarget getUnimChannelTarget () {
		return unimChannelTarget;
	}	
	
	public void setUnimChannelTarget (com.ulane.monitor.model.unim.UnimChannelTarget in_unimChannelTarget) {
		this.unimChannelTarget = in_unimChannelTarget;
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
	 * 指标ID	 * @return Long
	 */
	public Long getTargetId() {
		return this.getUnimChannelTarget()==null?null:this.getUnimChannelTarget().getTargetId();
	}
	
	/**
	 * Set the targetId
	 */	
	public void setTargetId(Long aValue) {
	    if (aValue==null) {
	    	unimChannelTarget = null;
	    } else if (unimChannelTarget == null) {
	        unimChannelTarget = new com.ulane.monitor.model.unim.UnimChannelTarget(aValue);
	        unimChannelTarget.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
			unimChannelTarget.setTargetId(aValue);
	    }
	}	

	/**
	 * 渠道ID	 * @return Long
	 */
	public Long getChannelId() {
		return this.getUnimChannel()==null?null:this.getUnimChannel().getChannelId();
	}
	
	/**
	 * Set the channelId
	 */	
	public void setChannelId(Long aValue) {
	    if (aValue==null) {
	    	unimChannel = null;
	    } else if (unimChannel == null) {
	        unimChannel = new com.ulane.monitor.model.unim.UnimChannel(aValue);
	        unimChannel.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
			unimChannel.setChannelId(aValue);
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
		if (!(object instanceof UnimChaTarThrlevl)) {
			return false;
		}
		UnimChaTarThrlevl rhs = (UnimChaTarThrlevl) object;
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
