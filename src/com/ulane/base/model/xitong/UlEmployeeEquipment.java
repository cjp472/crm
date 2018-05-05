package com.ulane.base.model.xitong;

import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;

@SuppressWarnings("serial")
public class UlEmployeeEquipment extends com.htsoft.core.model.BaseModel{
	protected Long ulEmpId;//主键
	protected   String ulEmployeeNo  ;// 员工-工号
	protected   String equipOperatorId;//设备-柜员号
	protected   Long  ulEmployeeId  ;// 员工主键id
	protected   Long  eqId;//设备主键id
	protected   String equipmentId;//设备-柜员号
	public Long getUlEmpId() {
		return ulEmpId;
	}
	public Long getUlEmployeeId() {
		return ulEmployeeId;
	}
	public void setUlEmployeeId(Long ulEmployeeId) {
		this.ulEmployeeId = ulEmployeeId;
	}

	public Long getEqId() {
		return eqId;
	}
	public void setEqId(Long eqId) {
		this.eqId = eqId;
	}
	public String getEquipmentId() {
		return equipmentId;
	}
	public void setEquipmentId(String equipmentId) {
		this.equipmentId = equipmentId;
	}
	public void setUlEmpId(Long ulEmpId) {
		this.ulEmpId = ulEmpId;
	}
	public String getUlEmployeeNo() {
		return ulEmployeeNo;
	}
	public void setUlEmployeeNo(String ulEmployeeNo) {
		this.ulEmployeeNo = ulEmployeeNo;
	}
	public String getEquipOperatorId() {
		return equipOperatorId;
	}
	public void setEquipOperatorId(String equipOperatorId) {
		this.equipOperatorId = equipOperatorId;
	}

	
	
	
	
	
}
