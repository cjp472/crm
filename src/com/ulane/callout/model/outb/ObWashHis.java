package com.ulane.callout.model.outb;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;

/**
 * ObWashHis Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
@SuppressWarnings("serial")
public class ObWashHis extends com.htsoft.core.model.BaseModel {

	protected Long washHisId;
    protected Long projId;
    protected Long comId;
    protected Long calllistId;
    protected Long callbatchId;
	protected Short clearnTyp;
	protected java.util.Date clearnDat;
	protected Long clearnOpt;
	protected String clearnRual;
	protected Integer clearnCounts;
    
	protected String projName;
	protected String comName;
	protected String calllistName;
	protected String callbatchName;
	protected String clearnOptName;
	protected Short isCallbatchEnable;

	//	清洗方式：0-无效数据、1-名单修复、2-黑名单、3-名单去重、4-业务去重
	public static final Short CLEARN_TYP_UNVAILABLE 		= 0;
	public static final Short CLEARN_TYP_LIST_REPAIR 		= 1;
	public static final Short CLEARN_TYP_BLACK_LIST 		= 2;
	public static final Short CLEARN_TYP_LIST_CLEAR_SAME 	= 3;
	public static final Short CLEARN_TYP_BUSI_CALEAR_SAME  	= 4;
	
//	清洗条件数据：
	
	public Long getWashHisId() {
		return washHisId;
	}

	public void setWashHisId(Long washHisId) {
		this.washHisId = washHisId;
	}

	public Long getProjId() {
		return projId;
	}

	public void setProjId(Long projId) {
		this.projId = projId;
	}

	public Long getComId() {
		return comId;
	}

	public void setComId(Long comId) {
		this.comId = comId;
	}

	public Long getCalllistId() {
		return calllistId;
	}

	public void setCalllistId(Long calllistId) {
		this.calllistId = calllistId;
	}

	public Long getCallbatchId() {
		return callbatchId;
	}

	public void setCallbatchId(Long callbatchId) {
		this.callbatchId = callbatchId;
	}

	public Short getClearnTyp() {
		return clearnTyp;
	}

	public void setClearnTyp(Short clearnTyp) {
		this.clearnTyp = clearnTyp;
	}

	public java.util.Date getClearnDat() {
		return clearnDat;
	}

	public void setClearnDat(java.util.Date clearnDat) {
		this.clearnDat = clearnDat;
	}

	public Long getClearnOpt() {
		return clearnOpt;
	}

	public void setClearnOpt(Long clearnOpt) {
		this.clearnOpt = clearnOpt;
	}

	public Integer getClearnCounts() {
		return clearnCounts;
	}

	public void setClearnCounts(Integer clearnCounts) {
		this.clearnCounts = clearnCounts;
	}

	public String getProjName() {
		return projName;
	}

	public void setProjName(String projName) {
		this.projName = projName;
	}

	public String getComName() {
		return comName;
	}

	public void setComName(String comName) {
		this.comName = comName;
	}

	public String getCalllistName() {
		return calllistName;
	}

	public void setCalllistName(String calllistName) {
		this.calllistName = calllistName;
	}

	public String getCallbatchName() {
		return callbatchName;
	}

	public void setCallbatchName(String callbatchName) {
		this.callbatchName = callbatchName;
	}

	public String getClearnOptName() {
		return clearnOptName;
	}

	public void setClearnOptName(String clearnOptName) {
		this.clearnOptName = clearnOptName;
	}

	public String getClearnRual() {
		return clearnRual;
	}

	public void setClearnRual(String clearnRual) {
		this.clearnRual = clearnRual;
	}
	
	public Short getIsCallbatchEnable() {
		return isCallbatchEnable;
	}

	public void setIsCallbatchEnable(Short isCallbatchEnable) {
		this.isCallbatchEnable = isCallbatchEnable;
	}
	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof ObWashHis)) {
			return false;
		}
		ObWashHis rhs = (ObWashHis) object;
		return new EqualsBuilder()
				.append(this.washHisId, rhs.washHisId)
				.append(this.projId, rhs.projId)
				.append(this.comId, rhs.comId)
				.append(this.calllistId, rhs.calllistId)
				.append(this.callbatchId, rhs.callbatchId)
				.append(this.clearnTyp, rhs.clearnTyp)
				.append(this.clearnDat, rhs.clearnDat)
				.append(this.clearnOpt, rhs.clearnOpt)
				.append(this.clearnCounts, rhs.clearnCounts)
				.append(this.clearnRual, rhs.clearnRual)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.washHisId) 
				.append(this.projId) 
				.append(this.comId) 
				.append(this.calllistId) 
				.append(this.callbatchId) 
				.append(this.clearnTyp) 
				.append(this.clearnDat) 
				.append(this.clearnOpt)
				.append(this.clearnRual)
				.append(this.clearnCounts)
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("washHisId", this.washHisId)
				.append("projId", this.projId) 
				.append("comId", this.comId) 
				.append("calllistId", this.calllistId) 
				.append("callbatchId", this.callbatchId) 
				.append("clearnTyp", this.clearnTyp) 
				.append("clearnDat", this.clearnDat) 
				.append("clearnOpt", this.clearnOpt)
				.append("clearnRual",this.clearnRual)
				.append("clearnCounts", this.clearnCounts) 
				.toString();
	}



}
