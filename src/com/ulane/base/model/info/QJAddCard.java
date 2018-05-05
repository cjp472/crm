package com.ulane.base.model.info;

import java.util.Date;
@SuppressWarnings("serial")
public class QJAddCard extends com.htsoft.core.model.BaseModel{
	/**
	 * 远程智能柜员机重空汇总清单
	 * */
	protected Long addcardID;
	
	protected   Date  addcardDate;//创建日期
	protected   Date   addcardTime;//打印时间
	protected   Date   printDate;//打印日期
	protected   Date   printTime;//打印时间
//	protected   String  ipAddress;// ip地址
	protected Long addcardNum;//加Ic卡数
	protected Long addUkNum;//加uk数
	protected  String  equipmentName;//网点名称
	protected   String  operatorId;// 柜员号
	protected   String  branchId;// 网点号
	protected String operator; //操作员
	protected String checkMember;//复核员
	protected  Long bankIccardNum;//回收箱当前卡数
	protected  Long  spareIccardNum;//发卡箱当前剩余卡数
	protected  Long bankUkeyNum;//回收箱当前KEY数
	protected  Long spareUkeyNum;//KEY箱当前剩余KEY数
	
	
    protected  Long	thiscardnum; //本次加卡数
	
	protected  Long	thisukeynum;//本次加ukey数
	protected  Long	issuecardNum; //发卡数
	
	protected  Long	issueUkeynum;//发ukey数

	protected  Long	falg;//标记是否无纸化
	
	
	
	
	
	
	
	
	
	public Long getFalg() {
		return falg;
	}
	public void setFalg(Long falg) {
		this.falg = falg;
	}
	public Long getIssuecardNum() {
		return issuecardNum;
	}
	public void setIssuecardNum(Long issuecardNum) {
		this.issuecardNum = issuecardNum;
	}
	public Long getIssueUkeynum() {
		return issueUkeynum;
	}
	public void setIssueUkeynum(Long issueUkeynum) {
		this.issueUkeynum = issueUkeynum;
	}
	public Long getThiscardnum() {
		return thiscardnum;
	}
	public void setThiscardnum(Long thiscardnum) {
		this.thiscardnum = thiscardnum;
	}
	public Long getThisukeynum() {
		return thisukeynum;
	}
	public void setThisukeynum(Long thisukeynum) {
		this.thisukeynum = thisukeynum;
	}
	public Long getBankIccardNum() {
		return bankIccardNum;
	}
	public void setBankIccardNum(Long bankIccardNum) {
		this.bankIccardNum = bankIccardNum;
	}
	public Long getSpareIccardNum() {
		return spareIccardNum;
	}
	public void setSpareIccardNum(Long spareIccardNum) {
		this.spareIccardNum = spareIccardNum;
	}
	public Long getBankUkeyNum() {
		return bankUkeyNum;
	}
	public void setBankUkeyNum(Long bankUkeyNum) {
		this.bankUkeyNum = bankUkeyNum;
	}
	public Long getSpareUkeyNum() {
		return spareUkeyNum;
	}
	public void setSpareUkeyNum(Long spareUkeyNum) {
		this.spareUkeyNum = spareUkeyNum;
	}
	public Long getAddcardID() {
		return addcardID;
	}
	public void setAddcardID(Long addcardID) {
		this.addcardID = addcardID;
	}
	public Date getAddcardDate() {
		return addcardDate;
	}
	public void setAddcardDate(Date addcardDate) {
		this.addcardDate = addcardDate;
	}
	public Date getAddcardTime() {
		return addcardTime;
	}
	public void setAddcardTime(Date addcardTime) {
		this.addcardTime = addcardTime;
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
	
	public Long getAddcardNum() {
		return addcardNum;
	}
	public void setAddcardNum(Long addcardNum) {
		this.addcardNum = addcardNum;
	}
	public Long getAddUkNum() {
		return addUkNum;
	}
	public void setAddUkNum(Long addUkNum) {
		this.addUkNum = addUkNum;
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
