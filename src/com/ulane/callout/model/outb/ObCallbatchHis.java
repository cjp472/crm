package com.ulane.callout.model.outb;
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
 * ObCallbatchHis Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
@SuppressWarnings("serial")
public class ObCallbatchHis extends com.htsoft.core.model.BaseModel {

    protected Long opeHisId;
	protected java.util.Date rowDat;
	protected Long opeUseId;
	protected Short opeTypId;
	protected String opeResDesc;
	protected com.ulane.callout.model.outb.ObCallbatch obCallbatch;
	protected com.ulane.callout.model.outb.ObCalllist obCalllist;
	protected com.ulane.callout.model.outb.ObCom obCom;


	/**
	 * Default Empty Constructor for class ObCallbatchHis
	 */
	public ObCallbatchHis () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class ObCallbatchHis
	 */
	public ObCallbatchHis (
		 Long in_opeHisId
        ) {
		this.setOpeHisId(in_opeHisId);
    }

	
	public com.ulane.callout.model.outb.ObCallbatch getObCallbatch () {
		return obCallbatch;
	}	
	
	public void setObCallbatch (com.ulane.callout.model.outb.ObCallbatch in_obCallbatch) {
		this.obCallbatch = in_obCallbatch;
	}
	
	public com.ulane.callout.model.outb.ObCalllist getObCalllist () {
		return obCalllist;
	}	
	
	public void setObCalllist (com.ulane.callout.model.outb.ObCalllist in_obCalllist) {
		this.obCalllist = in_obCalllist;
	}
	
	public com.ulane.callout.model.outb.ObCom getObCom () {
		return obCom;
	}	
	
	public void setObCom (com.ulane.callout.model.outb.ObCom in_obCom) {
		this.obCom = in_obCom;
	}
    

	/**
	 * 操作历史内码	 * @return Long
     * @hibernate.id column="OPE_HIS_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getOpeHisId() {
		return this.opeHisId;
	}
	
	/**
	 * Set the opeHisId
	 */	
	public void setOpeHisId(Long aValue) {
		this.opeHisId = aValue;
	}	

	/**
	 * 名单批次内码	 * @return Long
	 */
	public Long getCallbatchId() {
		return this.getObCallbatch()==null?null:this.getObCallbatch().getCallbatchId();
	}
	
	/**
	 * Set the callbatchId
	 */	
	public void setCallbatchId(Long aValue) {
	    if (aValue==null) {
	    	obCallbatch = null;
	    } else if (obCallbatch == null) {
	        obCallbatch = new com.ulane.callout.model.outb.ObCallbatch(aValue);
	        obCallbatch.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
			obCallbatch.setCallbatchId(aValue);
	    }
	}	

	/**
	 * 名单列表内码	 * @return Long
	 */
	public Long getCalllistId() {
		return this.getObCalllist()==null?null:this.getObCalllist().getCalllistId();
	}
	
	/**
	 * Set the calllistId
	 */	
	public void setCalllistId(Long aValue) {
	    if (aValue==null) {
	    	obCalllist = null;
	    } else if (obCalllist == null) {
	        obCalllist = new com.ulane.callout.model.outb.ObCalllist(aValue);
	        obCalllist.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
			obCalllist.setCalllistId(aValue);
	    }
	}	

	/**
	 * 活动内码	 * @return Long
	 */
	public Long getComId() {
		return this.getObCom()==null?null:this.getObCom().getComId();
	}
	
	/**
	 * Set the comId
	 */	
	public void setComId(Long aValue) {
	    if (aValue==null) {
	    	obCom = null;
	    } else if (obCom == null) {
	        obCom = new com.ulane.callout.model.outb.ObCom(aValue);
	        obCom.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
			obCom.setComId(aValue);
	    }
	}	

	/**
	 * 记录时间	 * @return java.util.Date
	 * @hibernate.property column="ROW_DAT" type="java.util.Date" length="7" not-null="true" unique="false"
	 */
	public java.util.Date getRowDat() {
		return this.rowDat;
	}
	
	/**
	 * Set the rowDat
	 * @spring.validator type="required"
	 */	
	public void setRowDat(java.util.Date aValue) {
		this.rowDat = aValue;
	}	

	/**
	 * 操作人	 * @return Long
	 * @hibernate.property column="OPE_USE_ID" type="java.lang.Long" length="18" not-null="true" unique="false"
	 */
	public Long getOpeUseId() {
		return this.opeUseId;
	}
	
	/**
	 * Set the opeUseId
	 * @spring.validator type="required"
	 */	
	public void setOpeUseId(Long aValue) {
		this.opeUseId = aValue;
	}	

	/**
	 * 操作类型：0-创建、1-分配、2-回收&OB_CALLBATCH_HIS_CZLX	 * @return Short
	 * @hibernate.property column="OPE_TYP_ID" type="java.lang.Short" length="5" not-null="true" unique="false"
	 */
	public Short getOpeTypId() {
		return this.opeTypId;
	}
	
	/**
	 * Set the opeTypId
	 * @spring.validator type="required"
	 */	
	public void setOpeTypId(Short aValue) {
		this.opeTypId = aValue;
	}	

	/**
	 * 操作结果描述	 * @return String
	 * @hibernate.property column="OPE_RES_DESC" type="java.lang.String" length="2048" not-null="false" unique="false"
	 */
	public String getOpeResDesc() {
		return this.opeResDesc;
	}
	
	/**
	 * Set the opeResDesc
	 */	
	public void setOpeResDesc(String aValue) {
		this.opeResDesc = aValue;
	}	

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof ObCallbatchHis)) {
			return false;
		}
		ObCallbatchHis rhs = (ObCallbatchHis) object;
		return new EqualsBuilder()
				.append(this.opeHisId, rhs.opeHisId)
										.append(this.rowDat, rhs.rowDat)
				.append(this.opeUseId, rhs.opeUseId)
				.append(this.opeTypId, rhs.opeTypId)
				.append(this.opeResDesc, rhs.opeResDesc)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.opeHisId) 
										.append(this.rowDat) 
				.append(this.opeUseId) 
				.append(this.opeTypId) 
				.append(this.opeResDesc) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("opeHisId", this.opeHisId) 
										.append("rowDat", this.rowDat) 
				.append("opeUseId", this.opeUseId) 
				.append("opeTypId", this.opeTypId) 
				.append("opeResDesc", this.opeResDesc) 
				.toString();
	}



}
