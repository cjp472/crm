package com.ulane.customer.model.customer;
/**
 * 
 *
 */

/**
 * ConHis Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
@SuppressWarnings("serial")
public class Examine extends com.htsoft.core.model.BaseModel {

	private Long id;
	
	private String dealNum;   //流水
	
	private String cusName;  //客户姓名

	private String transactP;   //办理人
	
	private String examineP;  //补录人
	
	private String examineD;   //补录时间
	
	private String examineR;  //补录结果

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getDealNum() {
		return dealNum;
	}

	public void setDealNum(String dealNum) {
		this.dealNum = dealNum;
	}

	public String getCusName() {
		return cusName;
	}

	public void setCusName(String cusName) {
		this.cusName = cusName;
	}

	public String getTransactP() {
		return transactP;
	}

	public void setTransactP(String transactP) {
		this.transactP = transactP;
	}

	public String getExamineP() {
		return examineP;
	}

	public void setExamineP(String examineP) {
		this.examineP = examineP;
	}

	public String getExamineD() {
		return examineD;
	}

	public void setExamineD(String examineD) {
		this.examineD = examineD;
	}

	public String getExamineR() {
		return examineR;
	}

	public void setExamineR(String examineR) {
		this.examineR = examineR;
	}
	
	
}
