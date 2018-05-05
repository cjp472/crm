package com.ulane.monitor.model.unim;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.EqualsBuilder;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

/**
 * UnimAgentMap Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class UnimAgentMap extends com.htsoft.core.model.BaseModel {

    protected Long mapId;
	protected String mapName;
	protected String address;
	protected String bkfileUrl;
	protected String height;
	protected String width;
	protected String designxml;
	protected String reamrk;
	protected String mapNo;
	public String getMapNo() {
		return mapNo;
	}

	public void setMapNo(String mapNo) {
		this.mapNo = mapNo;
	}

	//protected com.ulane.monitor.model.unim.UnimMapNavigation unimMapNavigation;

	protected java.util.Set unimMapAgents = new java.util.HashSet();

	/**
	 * Default Empty Constructor for class UnimAgentMap
	 */
	public UnimAgentMap () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class UnimAgentMap
	 */
	public UnimAgentMap (
		 Long in_mapId
        ) {
		this.setMapId(in_mapId);
    }

	
//	public com.ulane.monitor.model.unim.UnimMapNavigation getUnimMapNavigation () {
//		return unimMapNavigation;
//	}	
//	
//	public void setUnimMapNavigation (com.ulane.monitor.model.unim.UnimMapNavigation in_unimMapNavigation) {
//		this.unimMapNavigation = in_unimMapNavigation;
//	}

	public java.util.Set getUnimMapAgents () {
		return unimMapAgents;
	}	
	
	public void setUnimMapAgents (java.util.Set in_unimMapAgents) {
		this.unimMapAgents = in_unimMapAgents;
	}
    

	/**
	 * ID	 * @return Long
     * @hibernate.id column="MAP_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getMapId() {
		return this.mapId;
	}
	
	/**
	 * Set the mapId
	 */	
	public void setMapId(Long aValue) {
		this.mapId = aValue;
	}	

	/**
	 * 地图名称	 * @return String
	 * @hibernate.property column="MAP_NAME" type="java.lang.String" length="128" not-null="false" unique="false"
	 */
	public String getMapName() {
		return this.mapName;
	}
	
	/**
	 * Set the mapName
	 */	
	public void setMapName(String aValue) {
		this.mapName = aValue;
	}	

//	/**
//	 * 导航节点ID	 * @return Long
//	 */
//	public Long getNavigationId() {
//		return this.getUnimMapNavigation()==null?null:this.getUnimMapNavigation().getNavigationId();
//	}
//	
//	/**
//	 * Set the navigationId
//	 */	
//	public void setNavigationId(Long aValue) {
//	    if (aValue==null) {
//	    	unimMapNavigation = null;
//	    } else if (unimMapNavigation == null) {
//	        unimMapNavigation = new com.ulane.monitor.model.unim.UnimMapNavigation(aValue);
//	        unimMapNavigation.setVersion(new Integer(0));//set a version to cheat hibernate only
//	    } else {
//	    	//
//			unimMapNavigation.setNavigationId(aValue);
//	    }
//	}	

	/**
	 * 地址	 * @return String
	 * @hibernate.property column="ADDRESS" type="java.lang.String" length="256" not-null="false" unique="false"
	 */
	public String getAddress() {
		return this.address;
	}
	
	/**
	 * Set the address
	 */	
	public void setAddress(String aValue) {
		this.address = aValue;
	}	

	/**
	 * URL	 * @return String
	 * @hibernate.property column="BKFILE_URL" type="java.lang.String" length="128" not-null="false" unique="false"
	 */
	public String getBkfileUrl() {
		return this.bkfileUrl;
	}
	
	/**
	 * Set the bkfileUrl
	 */	
	public void setBkfileUrl(String aValue) {
		this.bkfileUrl = aValue;
	}	

	/**
	 * 宽度	 * @return String
	 * @hibernate.property column="HEIGHT" type="java.lang.String" length="32" not-null="false" unique="false"
	 */
	public String getHeight() {
		return this.height;
	}
	
	/**
	 * Set the height
	 */	
	public void setHeight(String aValue) {
		this.height = aValue;
	}	

	/**
	 * 高度	 * @return String
	 * @hibernate.property column="WIDTH" type="java.lang.String" length="32" not-null="false" unique="false"
	 */
	public String getWidth() {
		return this.width;
	}
	
	/**
	 * Set the width
	 */	
	public void setWidth(String aValue) {
		this.width = aValue;
	}	

	/**
	 * 描述符文件	 * @return String
	 * @hibernate.property column="DESIGNXML" type="java.lang.String" length="4000" not-null="false" unique="false"
	 */
	public String getDesignxml() {
		return this.designxml;
	}
	
	/**
	 * Set the designxml
	 */	
	public void setDesignxml(String aValue) {
		this.designxml = aValue;
	}	

	/**
	 * 描述	 * @return String
	 * @hibernate.property column="REAMRK" type="java.lang.String" length="256" not-null="false" unique="false"
	 */
	public String getReamrk() {
		return this.reamrk;
	}
	
	/**
	 * Set the reamrk
	 */	
	public void setReamrk(String aValue) {
		this.reamrk = aValue;
	}	

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		UnimAgentMap other = (UnimAgentMap) obj;
		if (address == null) {
			if (other.address != null)
				return false;
		} else if (!address.equals(other.address))
			return false;
		if (bkfileUrl == null) {
			if (other.bkfileUrl != null)
				return false;
		} else if (!bkfileUrl.equals(other.bkfileUrl))
			return false;
		if (designxml == null) {
			if (other.designxml != null)
				return false;
		} else if (!designxml.equals(other.designxml))
			return false;
		if (height == null) {
			if (other.height != null)
				return false;
		} else if (!height.equals(other.height))
			return false;
		if (mapId == null) {
			if (other.mapId != null)
				return false;
		} else if (!mapId.equals(other.mapId))
			return false;
		if (mapName == null) {
			if (other.mapName != null)
				return false;
		} else if (!mapName.equals(other.mapName))
			return false;
		if (mapNo == null) {
			if (other.mapNo != null)
				return false;
		} else if (!mapNo.equals(other.mapNo))
			return false;
		if (reamrk == null) {
			if (other.reamrk != null)
				return false;
		} else if (!reamrk.equals(other.reamrk))
			return false;
		if (unimMapAgents == null) {
			if (other.unimMapAgents != null)
				return false;
		} else if (!unimMapAgents.equals(other.unimMapAgents))
			return false;
//		if (unimMapNavigation == null) {
//			if (other.unimMapNavigation != null)
//				return false;
//		} else if (!unimMapNavigation.equals(other.unimMapNavigation))
//			return false;
		if (width == null) {
			if (other.width != null)
				return false;
		} else if (!width.equals(other.width))
			return false;
		return true;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((address == null) ? 0 : address.hashCode());
		result = prime * result
				+ ((bkfileUrl == null) ? 0 : bkfileUrl.hashCode());
		result = prime * result
				+ ((designxml == null) ? 0 : designxml.hashCode());
		result = prime * result + ((height == null) ? 0 : height.hashCode());
		result = prime * result + ((mapId == null) ? 0 : mapId.hashCode());
		result = prime * result + ((mapName == null) ? 0 : mapName.hashCode());
		result = prime * result + ((mapNo == null) ? 0 : mapNo.hashCode());
		result = prime * result + ((reamrk == null) ? 0 : reamrk.hashCode());
		result = prime * result
				+ ((unimMapAgents == null) ? 0 : unimMapAgents.hashCode());
//		result = prime
//				* result
//				+ ((unimMapNavigation == null) ? 0 : unimMapNavigation
//						.hashCode());
		result = prime * result + ((width == null) ? 0 : width.hashCode());
		return result;
	}

	@Override
	public String toString() {
		return "UnimAgentMap [address=" + address + ", bkfileUrl=" + bkfileUrl
				+ ", designxml=" + designxml + ", height=" + height
				+ ", mapId=" + mapId + ", mapName=" + mapName + ", mapNo="
				+ mapNo + ", reamrk=" + reamrk + ", unimMapAgents="
				+ unimMapAgents 
				//+ ", unimMapNavigation=" + unimMapNavigation
				+ ", width=" + width + "]";
	}



}
