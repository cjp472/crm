package com.ulane.monitor.model.unim;

import java.io.Serializable;
import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;


/** @author Hibernate CodeGenerator */
public class UnimMapAgentPK implements Serializable {

    /** identifier field */
    private Long agentId;

    /** identifier field */
    private Long mapId;

    /** full constructor */
    public UnimMapAgentPK(Long agentId, Long mapId) {
        this.agentId = agentId;
        this.mapId = mapId;
    }

    /** default constructor */
    public UnimMapAgentPK() {
    }


    public Long getAgentId() {
		return agentId;
	}

	public void setAgentId(Long agentId) {
		this.agentId = agentId;
	}

	public Long getMapId() {
		return mapId;
	}

	public void setMapId(Long mapId) {
		this.mapId = mapId;
	}

	public String toString() {
        return new ToStringBuilder(this)
            .append("agentId", getAgentId())
            .append("mapId", getMapId())
            .toString();
    }

    public boolean equals(Object other) {
        if ( (this == other ) ) return true;
        if ( !(other instanceof UnimMapAgentPK) ) return false;
        UnimMapAgentPK castOther = (UnimMapAgentPK) other;
        return new EqualsBuilder()
            .append(this.getAgentId(), castOther.getAgentId())
            .append(this.getMapId(), castOther.getMapId())
            .isEquals();
    }

    public int hashCode() {
        return new HashCodeBuilder()
            .append(getAgentId())
            .append(getMapId())
            .toHashCode();
    }

}
