package com.ulane.monitor.model.unim;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;

/**
 * UnimThrlevl Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class UnimThrlevl extends com.htsoft.core.model.BaseModel {

    protected Long thrlevlId;
	protected String thrlevladv;
	protected String thrlevlwar;
	protected com.ulane.monitor.model.unim.UnimAgent unimAgent;
	protected com.ulane.monitor.model.unim.UnimCategory unimCategory;


	/**
	 * Default Empty Constructor for class UnimThrlevl
	 */
	public UnimThrlevl () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class UnimThrlevl
	 */
	public UnimThrlevl (
		 Long in_thrlevlId
        ) {
		this.setThrlevlId(in_thrlevlId);
    }


	  public UnimThrlevl(Long thrlevlId, UnimCategory unimCategory, UnimAgent unimAgent, String thrlevladv, String thrlevlwar)
	  {
	    this.thrlevlId = thrlevlId;
	    this.unimCategory = unimCategory;
	    this.unimAgent = unimAgent;
	    this.thrlevladv = thrlevladv;
	    this.thrlevlwar = thrlevlwar;
	  }
	
	public com.ulane.monitor.model.unim.UnimAgent getUnimAgent () {
		return unimAgent;
	}	
	
	public void setUnimAgent (com.ulane.monitor.model.unim.UnimAgent in_unimAgent) {
		this.unimAgent = in_unimAgent;
	}
	
	public com.ulane.monitor.model.unim.UnimCategory getUnimCategory () {
		return unimCategory;
	}	
	
	public void setUnimCategory (com.ulane.monitor.model.unim.UnimCategory in_unimCategory) {
		this.unimCategory = in_unimCategory;
	}
    

	/**
	 * ID	 * @return Long
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
	 * 班长ID	 * @return Long
	 */
	public Long getMonitorId() {
		return this.getUnimAgent()==null?null:this.getUnimAgent().getAgentId();
	}
	
	/**
	 * Set the monitorId
	 */	
	public void setMonitorId(Long aValue) {
	    if (aValue==null) {
	    	unimAgent = null;
	    } else if (unimAgent == null) {
	        unimAgent = new com.ulane.monitor.model.unim.UnimAgent(aValue);
	        unimAgent.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
			unimAgent.setAgentId(aValue);
	    }
	}	

	/**
	 * 状态ID	 * @return Short
	 */
	public Long getStatusId() {
		return this.getUnimCategory()==null?null:this.getUnimCategory().getCatId();
	}
	
	/**
	 * Set the statusId
	 */	
	public void setStatusId(Long aValue) {
	    if (aValue==null) {
	    	unimCategory = null;
	    } else if (unimCategory == null) {
	        unimCategory = new com.ulane.monitor.model.unim.UnimCategory(aValue);
	        unimCategory.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
			unimCategory.setCatId(aValue);
	    }
	}	

	/**
	 * 注意阀值	 * @return Long
	 * @hibernate.property column="THRLEVLADV" type="java.lang.Long" length="18" not-null="false" unique="false"
	 */
	public String getThrlevladv() {
		return this.thrlevladv;
	}
	
	/**
	 * Set the thrlevladv
	 */	
	public void setThrlevladv(String aValue) {
		this.thrlevladv = aValue;
	}	

	/**
	 * 警告阀值	 * @return Long
	 * @hibernate.property column="THRLEVLWAR" type="java.lang.Long" length="18" not-null="false" unique="false"
	 */
	public String getThrlevlwar() {
		return this.thrlevlwar;
	}
	
	/**
	 * Set the thrlevlwar
	 */	
	public void setThrlevlwar(String aValue) {
		this.thrlevlwar = aValue;
	}	

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof UnimThrlevl)) {
			return false;
		}
		UnimThrlevl rhs = (UnimThrlevl) object;
		return new EqualsBuilder()
				.append(this.thrlevlId, rhs.thrlevlId)
								.append(this.thrlevladv, rhs.thrlevladv)
				.append(this.thrlevlwar, rhs.thrlevlwar)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.thrlevlId) 
								.append(this.thrlevladv) 
				.append(this.thrlevlwar) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("thrlevlId", this.thrlevlId) 
								.append("thrlevladv", this.thrlevladv) 
				.append("thrlevlwar", this.thrlevlwar) 
				.toString();
	}



}
