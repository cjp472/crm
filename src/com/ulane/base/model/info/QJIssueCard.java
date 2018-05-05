package com.ulane.base.model.info;
/**
 * 远程智能柜员机重空明细清单
 * */
import java.util.Date;
@SuppressWarnings("serial")
public class QJIssueCard extends com.htsoft.core.model.BaseModel{
	protected   Long IssueCardID;
	protected   Date  tradeDate;//交易日期
	protected   Date   transactionTime;//交易时间
	protected   Date   printDate;//打印日期
	protected   Date   printTime;//打印时间
//	protected   String  ipAddress;// ip地址
	protected Long businessType;//业务类型
	protected Long businessResults;//业务处理结果
	protected Long  mediumType;//介质类型
	protected String  numType ;   //    IC卡/uk编号
	protected  String  equipmentName;//网点名称
	protected   String  operatorId;// 柜员号
	protected   String  branchId;// 网点号
	protected String operator; //操作员
	protected String checkMember;//复核员
	public Long getIssueCardID() {
		return IssueCardID;
	}
	public void setIssueCardID(Long issueCardID) {
		IssueCardID = issueCardID;
	}
	public Date getTradeDate() {
		return tradeDate;
	}
	public void setTradeDate(Date tradeDate) {
		this.tradeDate = tradeDate;
	}
	public Date getTransactionTime() {
		return transactionTime;
	}
	public void setTransactionTime(Date transactionTime) {
		this.transactionTime = transactionTime;
	}
	public Date getPrintDate() {
		return printDate;
	}
	public void setPrintDate(Date printDate) {
		this.printDate = printDate;
	}
	public Date getPrintTime() {
		return printTime;
	}
	public void setPrintTime(Date printTime) {
		this.printTime = printTime;
	}
	public Long getBusinessType() {
		return businessType;
	}
	public void setBusinessType(Long businessType) {
		this.businessType = businessType;
	}
	public Long getBusinessResults() {
		return businessResults;
	}
	public void setBusinessResults(Long businessResults) {
		this.businessResults = businessResults;
	}
	public Long getMediumType() {
		return mediumType;
	}
	public void setMediumType(Long mediumType) {
		this.mediumType = mediumType;
	}
	public String getNumType() {
		return numType;
	}
	public void setNumType(String numType) {
		this.numType = numType;
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
