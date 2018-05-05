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
public class ObComPap extends com.htsoft.core.model.BaseModel {

	protected Long comId;
	protected Long papId;
	protected Long comPapId;
	protected Long status;
	public static final Long STATUS_CLOSE      = 2l;			//注销
	public static final Long STATUS_STAR       = 1l;			//有效
	public Long getComId() {
		return comId;
	}

	public void setComId(Long comId) {
		this.comId = comId;
	}

	public Long getPapId() {
		return papId;
	}

	public void setPapId(Long papId) {
		this.papId = papId;
	}

	public Long getComPapId() {
		return comPapId;
	}

	public void setComPapId(Long comPapId) {
		this.comPapId = comPapId;
	}

	public Long getStatus() {
		return status;
	}

	public void setStatus(Long status) {
		this.status = status;
	}



	public ObComPap() {
		super();
		// TODO Auto-generated constructor stub
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((comId == null) ? 0 : comId.hashCode());
		result = prime * result
				+ ((comPapId == null) ? 0 : comPapId.hashCode());
		result = prime * result + ((papId == null) ? 0 : papId.hashCode());
		result = prime * result + ((status == null) ? 0 : status.hashCode());
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
		ObComPap other = (ObComPap) obj;
		if (comId == null) {
			if (other.comId != null)
				return false;
		} else if (!comId.equals(other.comId))
			return false;
		if (comPapId == null) {
			if (other.comPapId != null)
				return false;
		} else if (!comPapId.equals(other.comPapId))
			return false;
		if (papId == null) {
			if (other.papId != null)
				return false;
		} else if (!papId.equals(other.papId))
			return false;
		if (status == null) {
			if (other.status != null)
				return false;
		} else if (!status.equals(other.status))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "ObComPap [comId=" + comId + ", comPapId=" + comPapId
				+ ", papId=" + papId + ", status=" + status + "]";
	}

	public ObComPap (Long in_comPapId) {
		this.setComPapId(in_comPapId);
    }


}
