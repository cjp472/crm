package com.ulane.callout.model.outb;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
 */

/**
 * ObCom Base Java Bean, base class for the.base.model, mapped directly to
 * database table
 * 
 * Avoid changing this file if not necessary, will be overwritten.
 * 
 * 
 */
@SuppressWarnings("serial")
public class ObComScr extends com.htsoft.core.model.BaseModel {

	protected Long comId;
	protected Long tmpId;
	protected Long comScrId;
	protected Long status;
	public static final Long STATUS_CLOSE      = 2L;			//注销
	public static final Long STATUS_STAR       = 1L;			//有效
	public Long getComId() {
		return comId;
	}

	public void setComId(Long comId) {
		this.comId = comId;
	}



	public Long getStatus() {
		return status;
	}

	public void setStatus(Long status) {
		this.status = status;
	}



	public Long getTmpId() {
		return tmpId;
	}

	public void setTmpId(Long tmpId) {
		this.tmpId = tmpId;
	}

	public Long getComScrId() {
		return comScrId;
	}

	public void setComScrId(Long comScrId) {
		this.comScrId = comScrId;
	}

	public ObComScr() {
		super();
		// TODO Auto-generated constructor stub
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((comId == null) ? 0 : comId.hashCode());
		result = prime * result
				+ ((comScrId == null) ? 0 : comScrId.hashCode());
		result = prime * result + ((status == null) ? 0 : status.hashCode());
		result = prime * result + ((tmpId == null) ? 0 : tmpId.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		ObComScr other = (ObComScr) obj;
		if (comId == null) {
			if (other.comId != null)
				return false;
		} else if (!comId.equals(other.comId))
			return false;
		if (comScrId == null) {
			if (other.comScrId != null)
				return false;
		} else if (!comScrId.equals(other.comScrId))
			return false;
		if (status == null) {
			if (other.status != null)
				return false;
		} else if (!status.equals(other.status))
			return false;
		if (tmpId == null) {
			if (other.tmpId != null)
				return false;
		} else if (!tmpId.equals(other.tmpId))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "ObComScr [comId=" + comId + ", comScrId=" + comScrId
				+ ", status=" + status + ", tmpId=" + tmpId + "]";
	}

	public ObComScr (Long in_comTmpId) {
		this.setTmpId(in_comTmpId);
    }


}
