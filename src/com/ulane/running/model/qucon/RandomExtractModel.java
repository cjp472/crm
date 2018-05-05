package com.ulane.running.model.qucon;

import java.util.ArrayList;
import java.util.List;

import com.raq.expression.function.New;

public class RandomExtractModel {
	private String tableName;
	private String userColumnName;
	private String idColumnName;
	
	private List<ExtractRule> rules = new ArrayList<ExtractRule>();
	
	public String getTableName() {
		return tableName;
	}
	public void setTableName(String tableName) {
		this.tableName = tableName;
	}
	public String getUserColumnName() {
		return userColumnName;
	}
	public void setUserColumnName(String userColumnName) {
		this.userColumnName = userColumnName;
	}
	public String getIdColumnName() {
		return idColumnName;
	}
	public void setIdColumnName(String idColumnName) {
		this.idColumnName = idColumnName;
	}
	public List<ExtractRule> getRules() {
		return rules;
	}
	public void setRules(List<ExtractRule> rules) {
		this.rules = rules;
	}
	
}
