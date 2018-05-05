package com.ulane.monitor.model.unim;

import java.io.Serializable;
import java.util.List;

import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;

/** 
 *        @hibernate.class
 *         table="OB_CALLBATCH_CUS"
 *     
*/
public class UnimAgentSkillgroup implements Serializable {
    private com.ulane.monitor.model.unim.UnimAgentSkillgroupPK comp_id;
    protected Long agentId;
    protected Long skillgroupId;
    
	public UnimAgentSkillgroup(){
    }
    
	public UnimAgentSkillgroup(UnimAgentSkillgroupPK comp_id){
    	this.comp_id = comp_id;
    }
    
    public UnimAgentSkillgroup(Long agentId, Long skillgroupId){
    	this.comp_id = new UnimAgentSkillgroupPK(agentId, skillgroupId);
    }

	public com.ulane.monitor.model.unim.UnimAgentSkillgroupPK getComp_id() {
		return comp_id;
	}

	public void setComp_id(
			com.ulane.monitor.model.unim.UnimAgentSkillgroupPK comp_id) {
		this.comp_id = comp_id;
	}

	public Long getAgentId() {
		return agentId;
	}

	public void setAgentId(Long agentId) {
		this.agentId = agentId;
	}

	public Long getSkillgroupId() {
		return skillgroupId;
	}

	public void setSkillgroupId(Long skillgroupId) {
		this.skillgroupId = skillgroupId;
	}
	
	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof UnimAgentSkillgroup)) {
			return false;
		}
		UnimAgentSkillgroup rhs = (UnimAgentSkillgroup) object;
		return new EqualsBuilder()
				.append(this.agentId, rhs.agentId)
				.append(this.skillgroupId, rhs.skillgroupId)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.agentId)
				.append(this.skillgroupId)
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("agentId", this.agentId)
				.append("skillgroupId",this.skillgroupId)
				.toString();
	}

}
