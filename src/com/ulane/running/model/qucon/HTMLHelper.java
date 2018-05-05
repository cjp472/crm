package com.ulane.running.model.qucon;

import java.util.ArrayList;
import java.util.List;

public class HTMLHelper {
	private String type;
	private List<String> attrs = new ArrayList<String>();

	public HTMLHelper(String type) {
		super();
		this.type = type;
	}
	
	public HTMLHelper addAttr(String name, String value){
		String attr = name + "=\"" + value + "\" ";
		this.attrs.add(attr);
		return this;
	}

	@Override
	public String toString() {
		StringBuffer sb = new StringBuffer();
		sb.append("<input type=\"" + type + "\" ");
		for(String tmp : attrs){
			sb.append(tmp);
		}
		sb.append("/>");
		return sb.toString();
	}
	
	public static void main(String [] args){
		HTMLHelper one = new HTMLHelper("radio");
		one.addAttr("id", "woca");
		one.addAttr("name", "woca");
		System.out.println(one);
	}
}
