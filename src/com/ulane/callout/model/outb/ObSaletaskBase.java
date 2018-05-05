package com.ulane.callout.model.outb;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;

import com.htsoft.oa.model.customer.Product;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
import com.ulane.running.model.comtech.CtScrTemplate;

/**
 * ObSaletask Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
@SuppressWarnings("serial")
public class ObSaletaskBase extends com.htsoft.core.model.BaseModel {
	
	protected String projName;											//项目名称
	protected String obComNam;											//活动名称
	
	@SuppressWarnings("unchecked")										//产品
    protected java.util.Set<Product> products = new java.util.HashSet<Product>();
	@SuppressWarnings("unchecked")										//话术
	protected java.util.Set<CtScrTemplate> ctScrTemplates = new java.util.HashSet<CtScrTemplate>();

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		ObSaletaskBase other = (ObSaletaskBase) object;
		if (!(object instanceof ObSaletaskBase)) {
			return false;
		}
		
		ObSaletaskBase rhs = (ObSaletaskBase) object;
		return new EqualsBuilder()
				.append(this.projName, rhs.projName)
				.append(this.obComNam, rhs.obComNam)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.projName) 
				.append(this.obComNam)
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("projName", this.projName)
				.append("obComNam", this.obComNam)
				.toString();
	}
	public String getObComNam() {
		return obComNam;
	}

	public void setObComNam(String obComNam) {
		this.obComNam = obComNam;
	}

	public String getProjName() {
		return projName;
	}

	public void setProjName(String projName) {
		this.projName = projName;
	}


	public java.util.Set<Product> getProducts() {
		return products;
	}

	public void setProducts(java.util.Set<Product> products) {
		this.products = products;
	}

	public java.util.Set<CtScrTemplate> getCtScrTemplates() {
		return ctScrTemplates;
	}

	public void setCtScrTemplates(java.util.Set<CtScrTemplate> ctScrTemplates) {
		this.ctScrTemplates = ctScrTemplates;
	}

}
