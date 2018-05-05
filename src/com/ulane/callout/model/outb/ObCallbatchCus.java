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
 * ObCallbatchCus Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
@SuppressWarnings("serial")
public class ObCallbatchCus extends com.htsoft.core.model.BaseModel {

	protected Long callbatchCusId;
	protected Short assStaId;
	protected Short assStepId;
	//protected Long retriveAssId;//被回收的任务
	protected Long fromUseId;
	protected Long toUseId;
	protected String toUserNo;              //接收人工号
	protected Long cusId;
	protected Long callbatchId;
	protected com.ulane.callout.model.outb.ObCallbatchAss obCallbatchAss;
	
    public static final String OB_CALLBATCH_CUS_STA_UNASSIGN="0";// 未分配
    public static final String OB_CALLBATCH_CUS_STA_ASSIGNED="1";// 已分配
    public static final String OB_CALLBATCH_CUS_STA_CLOSED="2";// 关闭


	/**
	 * Default Empty Constructor for class ObCallbatchCus
	 */
	public ObCallbatchCus () {
		super();
	}
	


	public Long getCallbatchCusId() {
        return callbatchCusId;
    }



    public void setCallbatchCusId(Long callbatchCusId) {
        this.callbatchCusId = callbatchCusId;
    }



    public Short getAssStaId() {
        return assStaId;
    }



    public void setAssStaId(Short assStaId) {
        this.assStaId = assStaId;
    }



    public Short getAssStepId() {
        return assStepId;
    }



    public void setAssStepId(Short assStepId) {
        this.assStepId = assStepId;
    }



    public Long getFromUseId() {
        return fromUseId;
    }



    public void setFromUseId(Long fromUseId) {
        this.fromUseId = fromUseId;
    }



    public Long getToUseId() {
        return toUseId;
    }



    public void setToUseId(Long toUseId) {
        this.toUseId = toUseId;
    }



    public com.ulane.callout.model.outb.ObCallbatchAss getObCallbatchAss() {
        return obCallbatchAss;
    }



    public void setObCallbatchAss(com.ulane.callout.model.outb.ObCallbatchAss obCallbatchAss) {
        this.obCallbatchAss = obCallbatchAss;
    }



    /**
	 * 分配历史内码	 * @return Long
	 */
	public Long getCallbatchAssId() {
		return this.getObCallbatchAss()==null?null:this.getObCallbatchAss().getCallbatchAssId();
	}
	
	/**
	 * Set the callbatchAssId
	 */	
	public void setCallbatchAssId(Long aValue) {
	    if (aValue==null) {
	    	obCallbatchAss = null;
	    } else if (obCallbatchAss == null) {
	        obCallbatchAss = new com.ulane.callout.model.outb.ObCallbatchAss(aValue);
	        obCallbatchAss.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
			obCallbatchAss.setCallbatchAssId(aValue);
	    }
	}	

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof ObCallbatchCus)) {
			return false;
		}
		ObCallbatchCus rhs = (ObCallbatchCus) object;
		return new EqualsBuilder()
				.append(this.callbatchCusId, rhs.callbatchCusId)
				.append(this.assStaId, rhs.assStaId)
				.append(this.assStepId, rhs.assStepId)
						.append(this.fromUseId, rhs.fromUseId)
				.append(this.toUseId, rhs.toUseId)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.callbatchCusId) 
				.append(this.assStaId) 
				.append(this.assStepId) 
						.append(this.fromUseId) 
				.append(this.toUseId) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("callbatchCusId", this.callbatchCusId) 
				.append("assStaId", this.assStaId) 
				.append("assStepId", this.assStepId) 
						.append("fromUseId", this.fromUseId) 
				.append("toUseId", this.toUseId) 
				.toString();
	}



	public Long getCusId() {
		return cusId;
	}



	public void setCusId(Long cusId) {
		this.cusId = cusId;
	}



	public Long getCallbatchId() {
		return callbatchId;
	}



	public void setCallbatchId(Long callbatchId) {
		this.callbatchId = callbatchId;
	}



	public ObCallbatchCus(Short assStaId, Long cusId, Long callbatchId) {
		super();
		this.assStaId = assStaId;
		this.cusId = cusId;
		this.callbatchId = callbatchId;
	}



	public String getToUserNo() {
		return toUserNo;
	}



	public void setToUserNo(String toUserNo) {
		this.toUserNo = toUserNo;
	}



//	public Long getRetriveAssId() {
//		return retriveAssId;
//	}
//
//
//
//	public void setRetriveAssId(Long retriveAssId) {
//		this.retriveAssId = retriveAssId;
//	}



}
