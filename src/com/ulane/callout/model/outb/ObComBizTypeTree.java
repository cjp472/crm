package com.ulane.callout.model.outb;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/


/**
 * ObCom Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
@SuppressWarnings("serial")
public class ObComBizTypeTree extends com.htsoft.core.model.BaseModel {

    protected Long nodeId;
	public ObComBizTypeTree() {
		super();
		// TODO Auto-generated constructor stub
	}

	protected String nodeName;
	protected Long parentNodeId;

	public Long getNodeId() {
		return nodeId;
	}

	public void setNodeId(Long nodeId) {
		this.nodeId = nodeId;
	}

	public String getNodeName() {
		return nodeName;
	}

	public void setNodeName(String nodeName) {
		this.nodeName = nodeName;
	}

	public Long getParentNodeId() {
		return parentNodeId;
	}

	public void setParentNodeId(Long parentNodeId) {
		this.parentNodeId = parentNodeId;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		ObComBizTypeTree other = (ObComBizTypeTree) obj;
		if (nodeId == null) {
			if (other.nodeId != null)
				return false;
		} else if (!nodeId.equals(other.nodeId))
			return false;
		if (nodeName == null) {
			if (other.nodeName != null)
				return false;
		} else if (!nodeName.equals(other.nodeName))
			return false;
		if (parentNodeId == null) {
			if (other.parentNodeId != null)
				return false;
		} else if (!parentNodeId.equals(other.parentNodeId))
			return false;
		return true;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((nodeId == null) ? 0 : nodeId.hashCode());
		result = prime * result
				+ ((nodeName == null) ? 0 : nodeName.hashCode());
		result = prime * result
				+ ((parentNodeId == null) ? 0 : parentNodeId.hashCode());
		return result;
	}


	

	public ObComBizTypeTree (Long in_nodId) {
			this.setNodeId(in_nodId);
	    }

	@Override
	public String toString() {
		return "ObComBizTypeTree [nodeId=" + nodeId + ", nodeName=" + nodeName
				+ ", parentNodeId=" + parentNodeId + "]";
	}



}
