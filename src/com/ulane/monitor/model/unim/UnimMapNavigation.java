package com.ulane.monitor.model.unim;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;
import java.util.Set;

import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.EqualsBuilder;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

/**
 * UnimMapNavigation Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class UnimMapNavigation extends com.htsoft.core.model.BaseModel {

    protected Long mapNavId;
	protected String navName;
	protected Long parentid;
	protected Long orderno;
	protected Long  status;
	protected String remark; 
	protected Long mapId;
	

//	private UnimMapNavigation parent;
	private List children;
	
	//处理字段
	protected String parentNam; //上级导航名称
	protected String mapNam;    //地图 名称
	
	public static final Long STATUS_SHITU_WEIQIYONG = 0L;
	public static final Long STATUS_SHITU_QIYONG = 1L;
	public static final Long STATUS_SHITU_ZHUXIAO = 2L;
	public Long getMapId() {
		return mapId;
	}

	public UnimMapNavigation(Long mapNavId, String navName, Long parentid,
			Long orderno, Long status, String remark, Long mapId,
			String parentNam, String mapNam) {
		super();
		this.mapNavId = mapNavId;
		this.navName = navName;
		this.parentid = parentid;
		this.orderno = orderno;
		this.status = status;
		this.remark = remark;
		this.mapId = mapId;
		this.parentNam = parentNam;
		this.mapNam = mapNam;
	}

	public void setMapId(Long mapId) {
		this.mapId = mapId;
	}


	


	public Long getStatus() {
		return status;
	}

	public void setStatus(Long status) {
		this.status = status;
	}

	public String getRemark() {
		return remark;
	}

	public String getParentNam() {
		return parentNam;
	}

	public void setParentNam(String parentNam) {
		this.parentNam = parentNam;
	}

	public String getMapNam() {
		return mapNam;
	}

	public void setMapNam(String mapNam) {
		this.mapNam = mapNam;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	/**
	 * Default Empty Constructor for class UnimMapNavigation
	 */
	public UnimMapNavigation () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class UnimMapNavigation
	 */
	public UnimMapNavigation (
		 Long in_mapNavId
        ) {
		this.setMapNavId(in_mapNavId);
    }



	/**
	 * ID	 * @return Long
     * @hibernate.id column="MAP_NAV_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getMapNavId() {
		return this.mapNavId;
	}
	
	/**
	 * Set the mapNavId
	 */	
	public void setMapNavId(Long aValue) {
		this.mapNavId = aValue;
	}	

	/**
	 * 导航名称	 * @return String
	 * @hibernate.property column="NAV_NAME" type="java.lang.String" length="64" not-null="false" unique="false"
	 */
	public String getNavName() {
		return this.navName;
	}
	
	/**
	 * Set the navName
	 */	
	public void setNavName(String aValue) {
		this.navName = aValue;
	}	

	/**
	 * 上级节点	 * @return Long
	 * @hibernate.property column="PARENTID" type="java.lang.Long" length="18" not-null="false" unique="false"
	 */
	public Long getParentid() {
		return this.parentid;
	}
	
	/**
	 * Set the parentid
	 */	
	public void setParentid(Long aValue) {
		this.parentid = aValue;
	}	

	/**
	 * 顺序号	 * @return Long
	 * @hibernate.property column="ORDERNO" type="java.lang.Long" length="18" not-null="false" unique="false"
	 */
	public Long getOrderno() {
		return this.orderno;
	}
	
	/**
	 * Set the orderno
	 */	
	public void setOrderno(Long aValue) {
		this.orderno = aValue;
	}	

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		UnimMapNavigation other = (UnimMapNavigation) obj;
		if (mapId == null) {
			if (other.mapId != null)
				return false;
		} else if (!mapId.equals(other.mapId))
			return false;
		if (mapNam == null) {
			if (other.mapNam != null)
				return false;
		} else if (!mapNam.equals(other.mapNam))
			return false;
		if (mapNavId == null) {
			if (other.mapNavId != null)
				return false;
		} else if (!mapNavId.equals(other.mapNavId))
			return false;
		if (navName == null) {
			if (other.navName != null)
				return false;
		} else if (!navName.equals(other.navName))
			return false;
		if (orderno == null) {
			if (other.orderno != null)
				return false;
		} else if (!orderno.equals(other.orderno))
			return false;
		if (parentNam == null) {
			if (other.parentNam != null)
				return false;
		} else if (!parentNam.equals(other.parentNam))
			return false;
		if (parentid == null) {
			if (other.parentid != null)
				return false;
		} else if (!parentid.equals(other.parentid))
			return false;
		if (remark == null) {
			if (other.remark != null)
				return false;
		} else if (!remark.equals(other.remark))
			return false;
		if (status == null) {
			if (other.status != null)
				return false;
		} else if (!status.equals(other.status))
			return false;
//		if (unimAgentMaps == null) {
//			if (other.unimAgentMaps != null)
//				return false;
//		} else if (!unimAgentMaps.equals(other.unimAgentMaps))
//			return false;
		return true;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((mapId == null) ? 0 : mapId.hashCode());
		result = prime * result + ((mapNam == null) ? 0 : mapNam.hashCode());
		result = prime * result
				+ ((mapNavId == null) ? 0 : mapNavId.hashCode());
		result = prime * result + ((navName == null) ? 0 : navName.hashCode());
		result = prime * result + ((orderno == null) ? 0 : orderno.hashCode());
		result = prime * result
				+ ((parentNam == null) ? 0 : parentNam.hashCode());
		result = prime * result
				+ ((parentid == null) ? 0 : parentid.hashCode());
		result = prime * result + ((remark == null) ? 0 : remark.hashCode());
		result = prime * result + ((status == null) ? 0 : status.hashCode());
//		result = prime * result
//				+ ((unimAgentMaps == null) ? 0 : unimAgentMaps.hashCode());
		return result;
	}

	@Override
	public String toString() {
		return "UnimMapNavigation [mapNavId=" + mapNavId + ", navName="
				+ navName + ", orderno=" + orderno + ", parentid=" + parentid
				+ ", remark=" + remark + ", status=" + status
//				+ ", unimAgentMaps=" + unimAgentMaps 
				+ "]";
	}
	
//	public UnimMapNavigation getParent() {
//		return parent;
//	}
//
//	public void setParent(UnimMapNavigation parent) {
//		this.parent = parent;
//	}

    public List getChildren()
    {
        return children;
    }

    public void setChildren(List children)
    {
        this.children = children;
    }




}
