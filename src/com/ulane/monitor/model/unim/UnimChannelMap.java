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
 * UnimChannelMap Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
@SuppressWarnings("serial")
public class UnimChannelMap extends com.htsoft.core.model.BaseModel {

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

	protected com.ulane.monitor.model.unim.UnimChannelNavigation unimChannelNavigation;

	protected java.util.Set<UnimAgent> unimAgents = new java.util.HashSet<UnimAgent>();

	/**
	 * Default Empty Constructor for class UnimChannelMap
	 */
	public UnimChannelMap () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class UnimChannelMap
	 */
	public UnimChannelMap (
		 Long in_mapId
        ) {
		this.setMapId(in_mapId);
    }

	
	public com.ulane.monitor.model.unim.UnimChannelNavigation getUnimChannelNavigation () {
		return unimChannelNavigation;
	}	
	
	public void setUnimChannelNavigation (com.ulane.monitor.model.unim.UnimChannelNavigation in_unimChannelNavigation) {
		this.unimChannelNavigation = in_unimChannelNavigation;
	}

	public java.util.Set<UnimAgent> getUnimAgents () {
		return unimAgents;
	}	
	
	public void setUnimAgents (java.util.Set<UnimAgent> in_unimAgents) {
		this.unimAgents = in_unimAgents;
	}
    

	/**
	 * 视图ID	 * @return Long
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
	 * 视图名称	 * @return String
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
//		return this.getUnimChannelNavigation()==null?null:this.getUnimChannelNavigation().getMapNavId();
//	}
//	
//	/**
//	 * Set the navigationId
//	 */	
//	public void setNavigationId(Long aValue) {
//	    if (aValue==null) {
//	    	unimChannelNavigation = null;
//	    } else if (unimChannelNavigation == null) {
//	        unimChannelNavigation = new com.ulane.monitor.model.unim.UnimChannelNavigation(aValue);
//	        unimChannelNavigation.setVersion(new Integer(0));//set a version to cheat hibernate only
//	    } else {
//	    	//
//			unimChannelNavigation.setMapNavId(aValue);
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
		UnimChannelMap other = (UnimChannelMap) obj;
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
		if (unimAgents == null) {
			if (other.unimAgents != null)
				return false;
		} else if (!unimAgents.equals(other.unimAgents))
			return false;
		if (unimChannelNavigation == null) {
			if (other.unimChannelNavigation != null)
				return false;
		} else if (!unimChannelNavigation.equals(other.unimChannelNavigation))
			return false;
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
				+ ((unimAgents == null) ? 0 : unimAgents.hashCode());
		result = prime
				* result
				+ ((unimChannelNavigation == null) ? 0 : unimChannelNavigation
						.hashCode());
		result = prime * result + ((width == null) ? 0 : width.hashCode());
		return result;
	}

	@Override
	public String toString() {
		return "UnimChannelMap [address=" + address + ", bkfileUrl="
				+ bkfileUrl + ", designxml=" + designxml + ", height=" + height
				+ ", mapId=" + mapId + ", mapName=" + mapName + ", mapNo="
				+ mapNo + ", reamrk=" + reamrk + ", unimAgents=" + unimAgents
				+ ", unimChannelNavigation=" + unimChannelNavigation
				+ ", width=" + width + "]";
	}



}
