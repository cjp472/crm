package com.htsoft.core.menu;

import java.io.Serializable;

import org.apache.commons.lang.builder.HashCodeBuilder;

/**
 * 系统前端的头部菜单
 * @author cf0666@gmail.com
 *
 */
public class TopModule implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String id;
	private String title;
	private String iconCls;
	
	public TopModule(){
		
	}

	public TopModule(String id, String text, String iconCls) {
		super();
		this.id = id;
		this.title = text;
		this.iconCls = iconCls;
	}
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	
	public String getIconCls() {
		return iconCls;
	}
	public void setIconCls(String iconCls) {
		this.iconCls = iconCls;
	}
	
	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	@Override
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
		.append(this.id) 
		.append(this.title) 
		.append(this.iconCls) 
		.toHashCode();
	}
}
