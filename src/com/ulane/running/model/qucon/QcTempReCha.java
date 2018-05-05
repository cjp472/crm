package com.ulane.running.model.qucon;

public class QcTempReCha extends com.htsoft.core.model.BaseModel{
    protected Long tempReChaId;
	protected Short chaId;
	protected com.ulane.running.model.qucon.QcTempRelease qcTempRelease;
	
	public Long getTempReChaId() {
		return tempReChaId;
	}
	public void setTempReChaId(Long tempReChaId) {
		this.tempReChaId = tempReChaId;
	}
	public Short getChaId() {
		return chaId;
	}
	public void setChaId(Short chaId) {
		this.chaId = chaId;
	}
	public com.ulane.running.model.qucon.QcTempRelease getQcTempRelease() {
		return qcTempRelease;
	}
	public void setQcTempRelease(
			com.ulane.running.model.qucon.QcTempRelease qcTempRelease) {
		this.qcTempRelease = qcTempRelease;
	}
	
}
