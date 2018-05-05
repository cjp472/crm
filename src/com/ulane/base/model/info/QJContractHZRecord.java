package com.ulane.base.model.info;

import java.io.Serializable;
import java.util.Date;


public class QJContractHZRecord implements Serializable {
	 protected   Long    conId;//主键id
	 protected   Date    conDate;//清机日期
	 protected   Date     conTime;//清机时间
	 protected   String   equipmentName;//网点名称
     protected   String   operatorId;// 柜员号
	 protected   String   branchId;// 网点号
	 protected   Long     field1;//业务类型
	 protected   Long     field2;//业务类型
	 protected   Long     field3;//业务类型
	 protected   Long     field4;//业务类型
	 protected   Long     field5;//业务类型
	 protected   Long     field6;//业务类型
	 protected   Long     field7;//业务类型
	 protected   Long     field8;//业务类型
	 protected   Long     field9;//业务类型
	 protected   Long     field10;//业务类型
	 protected   Long     total;//业务类型
	 protected   Long      flag;//0-标识有纸化  1-标识无纸化
	 
	 
	 
	 
	public Long getFlag() {
		return flag;
	}
	public void setFlag(Long flag) {
		this.flag = flag;
	}
	public Long getTotal() {
		return total;
	}
	public void setTotal(Long total) {
		this.total = total;
	}
	public Long getConId() {
		return conId;
	}
	public void setConId(Long conId) {
		this.conId = conId;
	}
	public Date getConDate() {
		return conDate;
	}
	public void setConDate(Date conDate) {
		this.conDate = conDate;
	}
	public Date getConTime() {
		return conTime;
	}
	public void setConTime(Date conTime) {
		this.conTime = conTime;
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
	public Long getField1() {
		return field1;
	}
	public void setField1(Long field1) {
		this.field1 = field1;
	}
	public Long getField2() {
		return field2;
	}
	public void setField2(Long field2) {
		this.field2 = field2;
	}
	public Long getField3() {
		return field3;
	}
	public void setField3(Long field3) {
		this.field3 = field3;
	}
	public Long getField4() {
		return field4;
	}
	public void setField4(Long field4) {
		this.field4 = field4;
	}
	public Long getField5() {
		return field5;
	}
	public void setField5(Long field5) {
		this.field5 = field5;
	}
	public Long getField6() {
		return field6;
	}
	public void setField6(Long field6) {
		this.field6 = field6;
	}
	public Long getField7() {
		return field7;
	}
	public void setField7(Long field7) {
		this.field7 = field7;
	}
	public Long getField8() {
		return field8;
	}
	public void setField8(Long field8) {
		this.field8 = field8;
	}
	public Long getField9() {
		return field9;
	}
	public void setField9(Long field9) {
		this.field9 = field9;
	}
	public Long getField10() {
		return field10;
	}
	public void setField10(Long field10) {
		this.field10 = field10;
	}
	 
	

	 
	 
	 
	
	 
	
	
	
	
	
}
