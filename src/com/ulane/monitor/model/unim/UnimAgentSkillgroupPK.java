package com.ulane.monitor.model.unim;

import java.io.Serializable;
import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;


/** @author Hibernate CodeGenerator */
public class UnimAgentSkillgroupPK implements Serializable {

    /** identifier field */
    private Long agentId;

    /** identifier field */
    private Long skillgroupId;

    /** full constructor */
    public UnimAgentSkillgroupPK(Long agentId, Long skillgroupId) {
        this.agentId = agentId;
        this.skillgroupId = skillgroupId;
    }

    /** default constructor */
    public UnimAgentSkillgroupPK() {
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

	public String toString() {
        return new ToStringBuilder(this)
            .append("agentId", getAgentId())
            .append("skillgroupId", getSkillgroupId())
            .toString();
    }

    public boolean equals(Object other) {
        if ( (this == other ) ) return true;
        if ( !(other instanceof UnimAgentSkillgroupPK) ) return false;
        UnimAgentSkillgroupPK castOther = (UnimAgentSkillgroupPK) other;
        return new EqualsBuilder()
            .append(this.getAgentId(), castOther.getAgentId())
            .append(this.getSkillgroupId(), castOther.getSkillgroupId())
            .isEquals();
    }

    public int hashCode() {
        return new HashCodeBuilder()
            .append(getAgentId())
            .append(getSkillgroupId())
            .toHashCode();
    }

}
