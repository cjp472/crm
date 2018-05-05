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
public class MachineSelf extends com.htsoft.core.model.BaseModel {

	private Long msid;
	
	private String wdNum;  //网点号
	
	private String wdName;  //网点名
	
	private String tellernum;  //终端号
	
	private String bustype;  //业务类型
	
	private String tradedate;  //交易时间
	
	private String dealnum;  //交易流水号
	
	private String traderesult; //交易结果
	
	private String cusName;  //客户姓名
	
	private String certigier; //授权人
	
	private String cardnum;  //卡号
	
	private String idcardnum; //证件号码
	
	private Long presentID;  //当前网点ID
	
	private Long parentID;   //父节点网点ID
	
	private String busDealNum; //业务流水号
	
	private String amount;   //交易金额
	
	
	public Long getMsid() {
		return msid;
	}

	public void setMsid(Long msid) {
		this.msid = msid;
	}

	public String getWdNum() {
		return wdNum;
	}

	public void setWdNum(String wdNum) {
		this.wdNum = wdNum;
	}

	public String getWdName() {
		return wdName;
	}

	public void setWdName(String wdName) {
		this.wdName = wdName;
	}

	public String getTellernum() {
		return tellernum;
	}

	public void setTellernum(String tellernum) {
		this.tellernum = tellernum;
	}

	public String getBustype() {
		return bustype;
	}

	public void setBustype(String bustype) {
		this.bustype = bustype;
	}

	public String getTradedate() {
		return tradedate;
	}

	public void setTradedate(String tradedate) {
		this.tradedate = tradedate;
	}

	public String getDealnum() {
		return dealnum;
	}

	public void setDealnum(String dealnum) {
		this.dealnum = dealnum;
	}



	public String getTraderesult() {
		return traderesult;
	}

	public void setTraderesult(String traderesult) {
		this.traderesult = traderesult;
	}

	public String getCusName() {
		return cusName;
	}

	public void setCusName(String cusName) {
		this.cusName = cusName;
	}

	public String getCertigier() {
		return certigier;
	}

	public void setCertigier(String certigier) {
		this.certigier = certigier;
	}

	public String getCardnum() {
		return cardnum;
	}

	public void setCardnum(String cardnum) {
		this.cardnum = cardnum;
	}

	public String getIdcardnum() {
		return idcardnum;
	}

	public void setIdcardnum(String idcardnum) {
		this.idcardnum = idcardnum;
	}

	public Long getPresentID() {
		return presentID;
	}

	public void setPresentID(Long presentID) {
		this.presentID = presentID;
	}

	public Long getParentID() {
		return parentID;
	}

	public void setParentID(Long parentID) {
		this.parentID = parentID;
	}

	public String getBusDealNum() {
		return busDealNum;
	}

	public void setBusDealNum(String busDealNum) {
		this.busDealNum = busDealNum;
	}

	public String getAmount() {
		return amount;
	}

	public void setAmount(String amount) {
		this.amount = amount;
	}
	
	
}
