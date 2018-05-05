package com.ulane.running.model.qucon;

public class ExtractRule {
	/**
	 * 规则类型  用户组，用户，技能等等
	 */
	private Short ruleType;
	/**
	 * 选择的规则类型的值，用户组用户的id
	 */
	private Long ruleTypeId;
	/**
	 * 抽取类型 按百分比和按数量
	 */
	private Short extractType;
	/**
	 * 抽取值
	 */
	private Long extractTypeValue;
	/**
	 * 抽取的规则，目前只是每用户抽和整个组抽
	 */
	private Short ruleValue;
	
	/**
	 * 抽取的结果数
	 */
	private int resultSize;
	
	public int getResultSize() {
		return resultSize;
	}
	public void setResultSize(int resultSize) {
		this.resultSize = resultSize;
	}
	public Short getRuleType() {
		return ruleType;
	}
	public void setRuleType(Short ruleType) {
		this.ruleType = ruleType;
	}
	public Long getRuleTypeId() {
		return ruleTypeId;
	}
	public void setRuleTypeId(Long ruleTypeId) {
		this.ruleTypeId = ruleTypeId;
	}
	public Short getExtractType() {
		return extractType;
	}
	public void setExtractType(Short extractType) {
		this.extractType = extractType;
	}
	public Long getExtractTypeValue() {
		return extractTypeValue;
	}
	public void setExtractTypeValue(Long extractTypeValue) {
		this.extractTypeValue = extractTypeValue;
	}
	public Short getRuleValue() {
		return ruleValue;
	}
	public void setRuleValue(Short ruleValue) {
		this.ruleValue = ruleValue;
	}
	
	@Override
	public String toString() {
		StringBuffer sb = new StringBuffer();
		if(this.ruleType.equals(QcChkRul.OBJECT_TYPE_USER)){
			sb.append("用户:? 抽取,");
		}
		if(this.ruleType.equals(QcChkRul.OBJECT_TYPE_USERGROUP)){
			sb.append("用户组:? 抽取,");
		}
		if(this.ruleType.equals(QcChkRul.OBJECT_TYPE_USERGROUP)){
			if(this.ruleValue.equals(QcChkRul.RULE_EVERY)){
				sb.append("按每用户方式抽取,");
			}
			if(this.ruleValue.equals(QcChkRul.RULE_GROUP)){
				sb.append("按用户组方式抽取,");
			}
		}
		if(this.extractType.equals(QcChkRul.TYPE_AMOUNT)){
			sb.append("抽取"+ this.extractTypeValue + "条,");
		}
		if(this.extractType.equals(QcChkRul.TYPE_PERCENT)){
			sb.append("抽取"+ this.extractTypeValue + "%，");
		}
		sb.append("得到结果" + this.resultSize + "条.");
		return sb.toString();
	}
	
}
