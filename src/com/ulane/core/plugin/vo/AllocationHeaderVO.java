package com.ulane.core.plugin.vo;
/**
 * 要货调拨单头信息VO
 * @author yuying
 *
 */
public class AllocationHeaderVO {
				   
	private String allocationApplyHeaderNum;
	private String orderHeaderNum;
	private String allocationBy;
	private String allocationDept;
	private String madeBy;
	private String createDate;
	private String comments;
	
	public String getAllocationApplyHeaderNum() {
		return allocationApplyHeaderNum;
	}
	public void setAllocationApplyHeaderNum(String allocationApplyHeaderNum) {
		this.allocationApplyHeaderNum = allocationApplyHeaderNum;
	}
	public String getOrderHeaderNum() {
		return orderHeaderNum;
	}
	public void setOrderHeaderNum(String orderHeaderNum) {
		this.orderHeaderNum = orderHeaderNum;
	}
	public String getAllocationBy() {
		return allocationBy;
	}
	public void setAllocationBy(String allocationBy) {
		this.allocationBy = allocationBy;
	}
	public String getAllocationDept() {
		return allocationDept;
	}
	public void setAllocationDept(String allocationDept) {
		this.allocationDept = allocationDept;
	}
	public String getMadeBy() {
		return madeBy;
	}
	public void setMadeBy(String madeBy) {
		this.madeBy = madeBy;
	}
	public String getCreateDate() {
		return createDate;
	}
	public void setCreateDate(String createDate) {
		this.createDate = createDate;
	}
	public String getComments() {
		return comments;
	}
	public void setComments(String comments) {
		this.comments = comments;
	}
	
	                           
}
