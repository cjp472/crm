package com.ulane.monitor.model.unim;

import java.io.Serializable;
import java.util.List;

import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;

/** 
 *        @hibernate.class
 *         table="OB_CALLBATCH_CUS"
 *     
*/
public class UnimMonitorAgent implements Serializable {
    private com.ulane.monitor.model.unim.UnimMonitorAgentPK comp_id;
    
	public UnimMonitorAgent(){
    }
    
	public UnimMonitorAgent(UnimMonitorAgentPK comp_id){
    	this.comp_id = comp_id;
    }
    
    public UnimMonitorAgent(Long agentId, Long mapId){
    	this.comp_id = new UnimMonitorAgentPK(agentId, mapId);
    }

	public com.ulane.monitor.model.unim.UnimMonitorAgentPK getComp_id() {
		return comp_id;
	}

	public void setComp_id(com.ulane.monitor.model.unim.UnimMonitorAgentPK comp_id) {
		this.comp_id = comp_id;
	}
    
    

}
