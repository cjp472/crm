package com.ulane.base.model.info;
/**
 * 远程智能柜员机合约汇总清单
 * */

@SuppressWarnings("serial")
public class QJContractRecordId extends com.htsoft.core.model.BaseModel{
	protected   Long contractID;
    protected java.util.Date contracttime;	//开始时间
	
	protected java.util.Date printDate;	//结束时间

	protected java.util.Date printTime;	//结束时间
	//protected   String  contracttime;//交易日期
	//protected   Date   transactionTime;//交易时间
	//protected   String   printDate;//打印日期
	//protected   String   printTime;//打印时间
//	protected   String  ipAddress;// ip地址
	protected Long businessType;//业务类型
	protected Long businessResults;//业务处理结果
	protected Long  frame;//张数
    protected Long    realNumber;//实物张数
	protected String  customerName ;   //    客户姓名
	protected String   idCardNumber;//证件号
	protected String  serialNumber;//流水号                
	protected  String  equipmentName;//网点名称
	protected   String  operatorId;// 柜员号
	protected   String  branchId;// 网点号
	protected String operator; //操作员
	protected String checkMember;//复核员
	protected Long qjConHisId;   //业务资料对应的conhisID
	
	public Long getQjConHisId() {
		return qjConHisId;
	}
	public void setQjConHisId(Long qjConHisId) {
		this.qjConHisId = qjConHisId;
	}
	public Long getContractID() {
		return contractID;
	}
	public void setContractID(Long contractID) {
		this.contractID = contractID;
	}
	
	
	public Long getBusinessType() {
		return businessType;
	}
//	public String getContracttime() {
//		return contracttime;
//	}
//	public void setContracttime(String contracttime) {
//		this.contracttime = contracttime;
//	}
//	public String getPrintDate() {
//		return printDate;
//	}
//	public void setPrintDate(String printDate) {
//		this.printDate = printDate;
//	}
//	public String getPrintTime() {
//		return printTime;
//	}
//	public void setPrintTime(String printTime) {
//		this.printTime = printTime;
//	}
	public void setBusinessType(Long businessType) {
		this.businessType = businessType;
	}
	public java.util.Date getContracttime() {
		return contracttime;
	}
	public void setContracttime(java.util.Date contracttime) {
		this.contracttime = contracttime;
	}
	public java.util.Date getPrintDate() {
		return printDate;
	}
	public void setPrintDate(java.util.Date printDate) {
		this.printDate = printDate;
	}
	public java.util.Date getPrintTime() {
		return printTime;
	}
	public void setPrintTime(java.util.Date printTime) {
		this.printTime = printTime;
	}
	public Long getBusinessResults() {
		return businessResults;
	}
	public void setBusinessResults(Long businessResults) {
		this.businessResults = businessResults;
	}
	public Long getFrame() {
		return frame;
	}
	public void setFrame(Long frame) {
		this.frame = frame;
	}
	public Long getRealNumber() {
		return realNumber;
	}
	public void setRealNumber(Long realNumber) {
		this.realNumber = realNumber;
	}
	public String getCustomerName() {
		return customerName;
	}
	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}
	
	public String getIdCardNumber() {
		return idCardNumber;
	}
	public void setIdCardNumber(String idCardNumber) {
		this.idCardNumber = idCardNumber;
	}
	public String getSerialNumber() {
		return serialNumber;
	}
	public void setSerialNumber(String serialNumber) {
		this.serialNumber = serialNumber;
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
	public String getOperator() {
		return operator;
	}
	public void setOperator(String operator) {
		this.operator = operator;
	}
	public String getCheckMember() {
		return checkMember;
	}
	public void setCheckMember(String checkMember) {
		this.checkMember = checkMember;
	}
	
	
	
	
//	public boolean equals(Object object) {
//		if (!(object instanceof Equipment)) {
//			return false;
//		}
//		Equipment rhs = (Equipment) object;
//		return new EqualsBuilder().append(this.EId, rhs.EId)
//				.append(this.equipmentId, rhs.equipmentId)
//				.append(this.equipmentName, rhs.equipmentName)
//				.append(this.operatorId, rhs.operatorId)
//				.append(this.branchId, rhs.branchId)
//				.append(this.bankname, rhs.bankname)
//				.append(this.bankTypeId, rhs.bankTypeId)
//				.append(this.parentId, rhs.parentId)
//				.append(this.curdate, rhs.curdate)
//				.append(this.ipAddress, rhs.ipAddress)
//				.append(this.address, rhs.address)
//				.isEquals();
//	}
//
//	/**
//	 * @see java.lang.Object#hashCode()
//	 */
//	public int hashCode() {
//		return new HashCodeBuilder(-82280557, -700257973)
//		.append(this.EId)
//		.append(this.equipmentId)
//		.append(this.equipmentName)
//		.append(this.operatorId)
//		.append(this.branchId)
//		.append(this.bankname)
//		.append(this.bankTypeId)
//		.append(this.parentId)
//		.append(this.curdate)
//		.append(this.ipAddress)
//		.append(this.address)
//				.toHashCode();
//	}
//
//	/**
//	 * @see java.lang.Object#toString()
//	 */
//	public String toString() {
//		return new ToStringBuilder(this)
//		.append("EId",this.EId)
//		.append("equipmentId", this.equipmentId)
//		.append("equipmentName", this.equipmentName)
//		.append("operatorId", this.operatorId)
//		.append("branchId", this.branchId)
//		.append("bankname", this.bankname)
//		.append("bankTypeId", this.bankTypeId)
//		.append("parentId", this.parentId)
//		.append("curdate", this.curdate)
//		.append("ip", this.ipAddress)
//		.append("address", this.address)
//			 
//				.toString();
//	}
//
//	
	
	
	
}
