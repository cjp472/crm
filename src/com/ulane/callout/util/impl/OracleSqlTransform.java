package com.ulane.callout.util.impl;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang.StringUtils;

import com.ulane.callout.util.ITransform;

public class OracleSqlTransform implements ITransform {
	public String DataPattern;//日期格式
	private String transStr;
	//字段类型
	public static final String FieldTypeNum 	= "NUMBER";
	public static final String FieldTypeVarChar = "VARCHAR";
	public static final String FieldTypeDate 	= "DATE";
	
	/**
	 * 拼接条件
	 */
	//基本拼接条件
	public static final String JoinIfEQ					=	"=";
	public static final String JoinIfGreater 			=	">";
	public static final String JoinIfGreaterEQ 			= 	">=";
	public static final String JoinIfLess 				= 	"<";
	public static final String JoinIfLessEQ 			= 	"<=";
	public static final String JoinIfNQ					=   "<>";
	
	//复合拼接条件
	public static final String JoinIfLike 				= 	"LIKE";
	public static final String JoinIfBetween		 	= 	"BETWEEN";
	public static final String JoinIfLengthEQ			=	"Len=";
	public static final String JoinIfLengthLess 		= 	"Len<";
	public static final String JoinIfLengthGreater 		= 	"Len>";
	public static final String JoinIfContain			=   "CONTAIN";
	public static final String JoinIfNull				=	"NULL";
	
	public static final String JoinIfReplace			=	"REPLACE";
	public static final String JoinIfReplaceRegexp		=	"REGEXP_REPLACE";
	
	public OracleSqlTransform(String _transStr) {
		this.transStr = _transStr;
	}
	@Override
	public String fieldTypeChange(String fieldType,String fieldValue) {
		//日期类型
		if(FieldTypeDate.equalsIgnoreCase(fieldType)) {
			fieldValue = "to_date('"+fieldValue+"','"+this.DataPattern+"')";
		}
		//字符串类型
		else if(FieldTypeVarChar.equalsIgnoreCase(fieldType)) {
			fieldValue = "'"+fieldValue+"'";
		}
		//数字类型
		else if(FieldTypeNum.equalsIgnoreCase(fieldType)) {
			fieldValue = "to_number("+fieldValue+")";
		}
		
		return fieldValue;
	}
	
	@Override
	public String joinIFChange(String joinIF,String fieldValue) {
		//Like模糊查询
		if(JoinIfLike.equalsIgnoreCase(joinIF)) {
			fieldValue = StringUtils.replace(fieldValue, "'", "");
			return (" like '%" + fieldValue +"%'");  
		}
		
		//Between字段值区间：如果是Between方式，filedValue为：(10,20)
		else if(JoinIfBetween.equalsIgnoreCase(joinIF)) {
			String[] betweenArr = StringUtils.split(fieldValue, ",");
			if(null!=betweenArr && betweenArr.length>0) {
				String firstVal = StringUtils.substring(betweenArr[0], 1);
				String secondVal = StringUtils.substring(betweenArr[1], 0,betweenArr[1].length()-1);
				return (" between "+firstVal+" and "+secondVal+" ");
			} else {
				return null;
			}
		}
		
		else {
			return (joinIF+fieldValue);
		}
	}
	
	@Override
	public String joinIFChange(String field, String fieldValue, String joinIF) {
		//instr包含：instr(orgField,containVal)
		if(JoinIfContain.equalsIgnoreCase(joinIF)) {
			fieldValue = StringUtils.replace(fieldValue, "'", "");
			return (" instr(" + field + ",'" + fieldValue + "')>0");
		}
		//length=长度等于
		else if(JoinIfLengthEQ.equals(joinIF)) {
			fieldValue = StringUtils.replace(fieldValue, "'", "");
			return (" length("+field+")="+fieldTypeChange(FieldTypeNum,fieldValue)+" ");
		}
		//length<长度小于
		else if(JoinIfLengthLess.equals(joinIF)) {
			fieldValue = StringUtils.replace(fieldValue, "'", "");
			return (" length("+field+")<"+fieldTypeChange(FieldTypeNum,fieldValue)+" ");
		}
		//length>长度大于
		else if(JoinIfLengthEQ.equals(joinIF)) {
			fieldValue = StringUtils.replace(fieldValue, "'", "");
			return (" length("+field+")>"+fieldTypeChange(FieldTypeNum,fieldValue)+" ");
		}
		return null;
	}
	
	@Override
	public String joinIFChange(String field,String fieldValue,String joinIF,String EXP) {
		if(JoinIfReplace.equals(joinIF)) {
			return ("REPLACE("+field+","+EXP+","+fieldValue+") ");
		} else if(JoinIfReplaceRegexp.equals(joinIF)) {
			return ("REGEXP_REPLACE("+field+","+EXP+","+fieldValue+")");
		}
		return null;
	}
	
	@Override
	public List<String> getTransSQL() {
		List<String> transList = new ArrayList<String>();
		String[] transArr = StringUtils.split(this.transStr,";");
		for(String trans : transArr) {
			transList.add(trans);
		}
		return transList;
	}
	
	
	@Override
	public String getDatePattern() {
		return this.DataPattern;
	}
	
	@Override
	public void setDatePattern(String _DataPattern) {
		this.DataPattern = _DataPattern;
	}

	public String getTransStr() {
		return transStr;
	}

	public void setTransStr(String transStr) {
		this.transStr = transStr;
	}


}
