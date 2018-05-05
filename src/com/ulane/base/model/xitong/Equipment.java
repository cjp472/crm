package com.ulane.base.model.xitong;

import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;

@SuppressWarnings("serial")
public class Equipment extends com.htsoft.core.model.BaseModel{
	protected Long EId;
	protected   String  equipmentId;// 机具号
	protected  String  equipmentName;//网点名称
	//新增字段
	protected   String  operatorId;// 柜员号
	protected   String  branchId;// 网点号
	protected Long bankTypeId;//编号
	protected String bankname;//名称
	protected Long parentId;//上级部门id
	protected   String  curdate;//创建日期
	protected   String  ipAddress;// ip地址
	protected  String  address;//地点
	protected Long delFlag;//0代表删除1标识不删除
	protected String parentName; 	//上级部门名称     --临时字段
	protected String JCNum; 	//新增字段京彩E家编号规则：JC+分行代码（2位）+自然顺序（3位），例如JC01001
	protected String JCName;//京彩E家名称 15个字以内，支行名称即可
	
	
	public String getJCName() {
		return JCName;
	}

	public void setJCName(String jCName) {
		JCName = jCName;
	}

	public String getJCNum() {
		return JCNum;
	}

	public void setJCNum(String jCNum) {
		JCNum = jCNum;
	}

	public String getParentName() {
		return parentName;
	}

	public void setParentName(String parentName) {
		this.parentName = parentName;
	}

	public Long getDelFlag() {
		return delFlag;
	}

	public void setDelFlag(Long delFlag) {
		this.delFlag = delFlag;
	}

	public Long getBankTypeId() {
		return bankTypeId;
	}

	public void setBankTypeId(Long bankTypeId) {
		this.bankTypeId = bankTypeId;
	}

	public String getBankname() {
		return bankname;
	}

	public void setBankname(String bankname) {
		this.bankname = bankname;
	}

	public Long getParentId() {
		return parentId;
	}

	public void setParentId(Long parentId) {
		this.parentId = parentId;
	}

	public Long getEId() {
		return EId;
	}

	public void setEId(Long eId) {
		EId = eId;
	}

	public String getEquipmentId() {
		return equipmentId;
	}

	public void setEquipmentId(String equipmentId) {
		this.equipmentId = equipmentId;
	}

	public String getEquipmentName() {
		return equipmentName;
	}

	public void setEquipmentName(String equipmentName) {
		this.equipmentName = equipmentName;
	}

	public String getOperatorId() {
		return operatorId;
	}

	public void setOperatorId(String operatorId) {
		this.operatorId = operatorId;
	}

	public String getBranchId() {
		return branchId;
	}

	public void setBranchId(String branchId) {
		this.branchId = branchId;
	}

	
	public String getCurdate() {
		return curdate;
	}

	public void setCurdate(String curdate) {
		this.curdate = curdate;
	}

	
	public String getIpAddress() {
		return ipAddress;
	}

	public void setIpAddress(String ipAddress) {
		this.ipAddress = ipAddress;
	}

	

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public boolean equals(Object object) {
		if (!(object instanceof Equipment)) {
			return false;
		}
		Equipment rhs = (Equipment) object;
		return new EqualsBuilder().append(this.EId, rhs.EId)
				.append(this.equipmentId, rhs.equipmentId)
				.append(this.equipmentName, rhs.equipmentName)
				.append(this.operatorId, rhs.operatorId)
				.append(this.branchId, rhs.branchId)
				.append(this.bankname, rhs.bankname)
				.append(this.bankTypeId, rhs.bankTypeId)
				.append(this.parentId, rhs.parentId)
				.append(this.curdate, rhs.curdate)
				.append(this.ipAddress, rhs.ipAddress)
				.append(this.address, rhs.address)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
		.append(this.EId)
		.append(this.equipmentId)
		.append(this.equipmentName)
		.append(this.operatorId)
		.append(this.branchId)
		.append(this.bankname)
		.append(this.bankTypeId)
		.append(this.parentId)
		.append(this.curdate)
		.append(this.ipAddress)
		.append(this.address)
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
		.append("EId",this.EId)
		.append("equipmentId", this.equipmentId)
		.append("equipmentName", this.equipmentName)
		.append("operatorId", this.operatorId)
		.append("branchId", this.branchId)
		.append("bankname", this.bankname)
		.append("bankTypeId", this.bankTypeId)
		.append("parentId", this.parentId)
		.append("curdate", this.curdate)
		.append("ip", this.ipAddress)
		.append("address", this.address)
			 
				.toString();
	}

	
	
	
	
}
