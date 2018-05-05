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
public class UnimMapAgent implements Serializable {
    private com.ulane.monitor.model.unim.UnimMapAgentPK comp_id;
    
	public UnimMapAgent(){
    }
    
	public UnimMapAgent(UnimMapAgentPK comp_id){
    	this.comp_id = comp_id;
    }
    
    public UnimMapAgent(Long agentId, Long mapId){
    	this.comp_id = new UnimMapAgentPK(agentId, mapId);
    }

	public com.ulane.monitor.model.unim.UnimMapAgentPK getComp_id() {
		return comp_id;
	}

	public void setComp_id(com.ulane.monitor.model.unim.UnimMapAgentPK comp_id) {
		this.comp_id = comp_id;
	}
    
    

}
