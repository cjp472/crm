package com.ulane.callout.model.outb;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;

/**
 * ObProject Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
@SuppressWarnings("serial")
public class ObProjExecType extends com.htsoft.core.model.BaseModel {
	protected Long projExecTypeId;
    protected Short projectZxfs;

    protected com.ulane.callout.model.outb.ObProject obProject;

	/**
	 * Default Empty Constructor for class ObProject
	 */
	public ObProjExecType () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class ObProject
	 */
	public ObProjExecType (
		 Long projExecTypeId
        ) {
		this.setProjExecTypeId(projExecTypeId);
    }
	
	public Long getProjExecTypeId() {
		return projExecTypeId;
	}

	public void setProjExecTypeId(Long projExecTypeId) {
		this.projExecTypeId = projExecTypeId;
	}


	public Short getProjectZxfs() {
		return projectZxfs;
	}

	public void setProjectZxfs(Short projectZxfs) {
		this.projectZxfs = projectZxfs;
	}

	public com.ulane.callout.model.outb.ObProject getObProject() {
		return obProject;
	}

	public void setObProject(com.ulane.callout.model.outb.ObProject obProject) {
		this.obProject = obProject;
	}

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof ObProjExecType)) {
			return false;
		}
		ObProjExecType rhs = (ObProjExecType) object;
		return new EqualsBuilder()
				.append(this.projExecTypeId, rhs.projExecTypeId)
				.append(this.projectZxfs, rhs.projectZxfs)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.projExecTypeId) 
				.append(this.projectZxfs) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("projExecTypeId", this.projExecTypeId) 
				.append("projectZxfs", this.projectZxfs) 
				.toString();
	}



}
