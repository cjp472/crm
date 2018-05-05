package com.ulane.callout.util;

import java.util.List;

public interface ITransform {
//	public String DataPattern;//通过setter/getter注入日期模式
	public List<String> getTransSQL();
	/**
	 * 设置日期格式
	 * @param DataPattern
	 */
	public void setDatePattern(String DataPattern);
	
	/**
	 * 获取日期格式
	 * @return
	 */
	public String getDatePattern();
	
	/**
	 * 字段类型转换
	 * @param fieldValue
	 * @param fieldType：NUMBER——日期类型、VARCHAR——字符类型、DATE——日期类型
	 * @return
	 */
	public String fieldTypeChange(String fieldType,String fieldValue);
	
	/**
	 * 拼接条件转换
	 * @param joinIF：Like、Between、
	 * @return
	 */
	public String joinIFChange(String joinIF,String fieldValue);
	
	/**
	 * 拼接条件转换
	 * @param joinIF：CONTAIN——instr(field,val)
	 * 				  Len=——length(field)=val、Len>——length(field)>val、Len>——length(field)<val
	 * @return
	 */
	public String joinIFChange(String field,String fieldValue,String joinIF);
	
	/**
	 * 拼接条件转换：主要是对数据库字段值的修改转换
	 * @param field
	 * @param EXP
	 * @param joinIF
	 * @return
	 */
	public String joinIFChange(String field,String fieldValue,String joinIF,String EXP);
}
