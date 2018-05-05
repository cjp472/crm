package com.ulane.serve.model.creditcard;


import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;


@XmlRootElement(name = "HasChargeBill")
public class HasChargeBill {
    
    protected Long id;

    protected java.util.Date recordTime;

    protected java.util.Date consumptionTime;

    protected String tradingNo;

    protected java.math.BigDecimal amount;

    protected short currency;

    protected String note;

    protected String afterFour;

    protected short isInstallment;

    protected short revoked;
    
    @XmlElement(required = true)
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    @XmlElement(required = true)
    public java.util.Date getRecordTime() {
        return recordTime;
    }
    public void setRecordTime(java.util.Date recordTime) {
        this.recordTime = recordTime;
    }
    @XmlElement(required = true)
    public java.util.Date getConsumptionTime() {
        return consumptionTime;
    }
    public void setConsumptionTime(java.util.Date consumptionTime) {
        this.consumptionTime = consumptionTime;
    }
    @XmlElement(required = true)
    public String getTradingNo() {
        return tradingNo;
    }
    public void setTradingNo(String tradingNo) {
        this.tradingNo = tradingNo;
    }
    @XmlElement(required = true)
    public java.math.BigDecimal getAmount() {
        return amount;
    }
    public void setAmount(java.math.BigDecimal amount) {
        this.amount = amount;
    }
    @XmlElement(required = true)
    public short getCurrency() {
        return currency;
    }
    public void setCurrency(short currency) {
        this.currency = currency;
    }
    @XmlElement(required = true)
    public String getNote() {
        return note;
    }
    public void setNote(String note) {
        this.note = note;
    }
    @XmlElement(required = true)
    public String getAfterFour() {
        return afterFour;
    }
    public void setAfterFour(String afterFour) {
        this.afterFour = afterFour;
    }
    @XmlElement(required = true)
    public short getIsInstallment() {
        return isInstallment;
    }
    public void setIsInstallment(short isInstallment) {
        this.isInstallment = isInstallment;
    }
    @XmlElement(required = true)
    public short getRevoked() {
        return revoked;
    }
    public void setRevoked(short revoked) {
        this.revoked = revoked;
    }
    
    
    
}
