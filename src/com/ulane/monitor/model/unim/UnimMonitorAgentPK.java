package com.ulane.monitor.model.unim;

import java.io.Serializable;
import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;


/** @author Hibernate CodeGenerator */
public class UnimMonitorAgentPK implements Serializable {

    /** identifier field */
    private Long agentId;

    /** identifier field */
    private Long monitorAgentId;

    /** full constructor */
    public UnimMonitorAgentPK(Long agentId, Long monitorAgentId) {
        this.agentId = agentId;
        this.monitorAgentId = monitorAgentId;
    }

    /** default constructor */
    public UnimMonitorAgentPK() {
    }


    public Long getAgentId() {
		return agentId;
	}

	public void setAgentId(Long agentId) {
		this.agentId = agentId;
	}

	public Long getMonitorAgentId() {
		return monitorAgentId;
	}

	public void setMonitorAgentId(Long monitorAgentId) {
		this.monitorAgentId = monitorAgentId;
	}

	public String toString() {
        return new ToStringBuilder(this)
            .append("agentId", getAgentId())
            .append("monitorAgentId", getMonitorAgentId())
            .toString();
    }

    public boolean equals(Object other) {
        if ( (this == other ) ) return true;
        if ( !(other instanceof UnimMonitorAgentPK) ) return false;
        UnimMonitorAgentPK castOther = (UnimMonitorAgentPK) other;
        return new EqualsBuilder()
            .append(this.getAgentId(), castOther.getAgentId())
            .append(this.getMonitorAgentId(), castOther.getMonitorAgentId())
            .isEquals();
    }

    public int hashCode() {
        return new HashCodeBuilder()
            .append(getAgentId())
            .append(getMonitorAgentId())
            .toHashCode();
    }

}
