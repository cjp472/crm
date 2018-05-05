package com.ulane.monitor.model.unim;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.EqualsBuilder;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

/**
 * UnimAssetsNavigation Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class UnimAssetsNavigation extends com.htsoft.core.model.BaseModel {

    protected Long mapNavId;
	protected String navName;
	protected Long parentid;
	protected Long orderno;
	protected Short status;
	protected String remark;
	protected Long mapId;
	//处理字段
	protected String parentNam; //上级导航名称
	protected String mapNam;    //地图 名称
	//子菜单
	private List children;
	
	public List getChildren() {
		return children;
	}

	public void setChildren(List children) {
		this.children = children;
	}

	public Long getMapId() {
		return mapId;
	}

	public void setMapId(Long mapId) {
		this.mapId = mapId;
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

	public static final Short STATUS_SHITU_WEIQIYONG = 0;
	public static final Short STATUS_SHITU_QIYONG = 1;
	public static final Short STATUS_SHITU_ZHUXIAO = 2;

	protected java.util.Set unimAssetsMaps = new java.util.HashSet();

	/**
	 * Default Empty Constructor for class UnimAssetsNavigation
	 */
	public UnimAssetsNavigation () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class UnimAssetsNavigation
	 */
	public UnimAssetsNavigation (
		 Long in_mapNavId
        ) {
		this.setMapNavId(in_mapNavId);
    }


	public java.util.Set getUnimAssetsMaps () {
		return unimAssetsMaps;
	}	
	
	public void setUnimAssetsMaps (java.util.Set in_unimAssetsMaps) {
		this.unimAssetsMaps = in_unimAssetsMaps;
	}
    

	/**
	 * 导航ID	 * @return Long
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

	/**
	 * 状态：未启用 启用 注销	 * @return Short
	 * @hibernate.property column="STATUS" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getStatus() {
		return this.status;
	}
	
	/**
	 * Set the status
	 */	
	public void setStatus(Short aValue) {
		this.status = aValue;
	}	

	/**
	 * 备注	 * @return String
	 * @hibernate.property column="REMARK" type="java.lang.String" length="256" not-null="false" unique="false"
	 */
	public String getRemark() {
		return this.remark;
	}
	
	/**
	 * Set the remark
	 */	
	public void setRemark(String aValue) {
		this.remark = aValue;
	}	

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		UnimAssetsNavigation other = (UnimAssetsNavigation) obj;
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
		if (unimAssetsMaps == null) {
			if (other.unimAssetsMaps != null)
				return false;
		} else if (!unimAssetsMaps.equals(other.unimAssetsMaps))
			return false;
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
		result = prime * result
				+ ((unimAssetsMaps == null) ? 0 : unimAssetsMaps.hashCode());
		return result;
	}

	@Override
	public String toString() {
		return "UnimAssetsNavigation [mapId=" + mapId + ", mapNam=" + mapNam
				+ ", mapNavId=" + mapNavId + ", navName=" + navName
				+ ", orderno=" + orderno + ", parentNam=" + parentNam
				+ ", parentid=" + parentid + ", remark=" + remark + ", status="
				+ status + ", unimAssetsMaps=" + unimAssetsMaps + "]";
	}



}
