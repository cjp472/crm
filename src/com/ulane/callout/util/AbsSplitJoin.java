package com.ulane.callout.util;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;

public abstract class AbsSplitJoin {
	public ITransform transform;
	
	public AbsSplitJoin(ITransform transform) {
		this.transform = transform;
	}
	
	/**
	 * 拼装类型：字段(tableField)、字段类型(tableFieldType)、条件(joinIF)、值(joinValue)
	 * 示	  例：washHisId,Long,=,19890101;washHisType,Short,<>,3;...
	 * @return
	 */
	public String getSplitJoinByParam() {
		List<String> listTrans = this.transform.getTransSQL();
		StringBuffer sb = new StringBuffer();
		for(String trans : listTrans) {
			String[] transArr = StringUtils.split(trans,",");
			String tableField = transArr[0];		//字段名
			String tableFieldType = transArr[1];	//字段类型
			String joinIF = transArr[2];			//条件
			String joinValue = transArr[3];			//字段值
			
			if("CONTAIN".equals(joinIF) || "Len<".equalsIgnoreCase(joinIF)
					|| "Len=".equalsIgnoreCase(joinIF) || "Len>".equalsIgnoreCase(joinIF)) {
				String joinSQL = getJoinSQL(tableField,tableFieldType,joinIF,joinValue);
				sb.append(" and " + joinSQL);
			} else if("NULL".equals(joinIF)) {
				sb.append(" and " + tableField + " is " + joinIF + " ");
			} 
			else {
				String ifValue = this.getJoinIfAndJoinValue(tableFieldType, joinIF, joinValue);
				if(StringUtils.isNotBlank(joinValue)) {
					sb.append(" and " + tableField + " "+ifValue + " ");
				}
			}
		}
		return sb.toString();
	}
	
	/**
	 * 
	 * @param tableField		字段名
	 * @param tableFieldType	字段类型
	 * @param joinIF			条件
	 * @param joinValue			字段值
	 * @return
	 */
	public String getSplitJoinByParam(String tableField,String tableFieldType,String joinIF,String joinValue) {
		StringBuffer sb = new StringBuffer();
		if(StringUtils.isNotBlank(joinValue)) {
			if("CONTAIN".equals(joinIF)) {
				String joinSQL = getJoinSQL(tableField,tableFieldType,joinIF,joinValue);
				sb.append(" and " + joinSQL);
			} else {
				String ifValue = this.getJoinIfAndJoinValue(tableFieldType, joinIF, joinValue);
				sb.append(" and "+tableField+" "+ifValue + " ");
			}
		}
		return sb.toString();
	}
	
	/**
	 * 获取去重字段
	 * @param field1
	 * @param field2
	 * @param isTrue
	 * @return
	 */
	public String getSplitJoinByEQ(String field1,String field2,String isTrue) {
		if(StringUtils.isNotBlank(isTrue)) {
			if("true".equalsIgnoreCase(isTrue)) {
				return (" and "+field1+"="+field2 + " ");
			}
		}
		return "";
	}
	
	/**
	 * update中的set拼接
	 * @param field		字段名
	 * @param washIf	转换条件
	 * @param EXP		匹配模式
	 * @return
	 */
	public String getSplitJoinBySET(String field,String washIf,String washValue,String EXP) {
		String joinVal = this.transform.joinIFChange(field, washValue, washIf, EXP);
		return (" "+field+"="+joinVal+" ");
	}
	/**
	 * 拼接串
	 * @param field
	 * @param fieldType
	 * @param washIf
	 * @param washValue
	 * @return
	 */
	public String getSplitJoinBy4Param(String field,String fieldType,String washIf,String washValue) {
		if(StringUtils.isNotBlank(washIf)) {
			return (field+","+fieldType+","+washIf+","+washValue+";");
		}
		return "";
	}
	
	//简单条件包裹拼接
	private String getJoinIfAndJoinValue(String tableFieldType,String joinIF,String joinValue) {
		if(StringUtils.isNotBlank(joinValue)) {
			joinValue = this.transform.fieldTypeChange(tableFieldType, joinValue);//按类型将值包裹一层
			joinValue = this.transform.joinIFChange(joinIF,joinValue);//按条件将值包裹，完成拼接
		}
		return joinValue; 
	}
	
	//复杂条件包裹拼接
	private String getJoinSQL(String tableField,String tableFieldType,String joinIF,String joinValue) {
		if(StringUtils.isNotBlank(joinValue)) {
			joinValue = this.transform.fieldTypeChange(tableFieldType, joinValue);//按类型将值包裹一层
			if("CONTAIN".equals(joinIF) || "Len<".equalsIgnoreCase(joinIF) 
					||"Len=".equalsIgnoreCase(joinIF) || "Len>".equalsIgnoreCase(joinIF)) {
				joinValue = this.transform.joinIFChange(tableField,joinValue, joinIF);//按条件将值包裹，完成拼接
			}
			
		}
		return joinValue; 
	}
	
	/**
	 * 匹配字段
	 * @param param
	 * @return
	 */
	public String[] getClearSameField(Map<String,String> param) {
		List<ArrayList<String>> listCondition = paraseJSON2List(param.get("washIFGrid"));
		if(null==listCondition || listCondition.size()==0) {
			return null;
		}
		String[] flag = new String[21];
		for(ArrayList<String> field: listCondition) {
			if(StringUtils.isNotBlank(field.get(0))) {
				flag[Integer.parseInt(field.get(0))] = "true";
			}
		}
		return flag;
	}
	
	/**
	 * 匹配字段
	 * @param param
	 * @return
	 */
	public String[] getUseIfFlag(Map<String,String> param) {
		List<ArrayList<String>> listCondition = paraseJSON2List(param.get("washIFGrid"));
		if(null==listCondition || listCondition.size()==0) {
			return null;
		}
		String[] flag = new String[21];
		for(ArrayList<String> field: listCondition) {
			if(StringUtils.isNotBlank(field.get(1))) {
				flag[Integer.parseInt(field.get(0))] = field.get(1);
			}
		}
		return flag;
	}
	
	/**
	 * 匹配字段
	 * @param param
	 * @return
	 */
	public String[] getUseValueFlag(Map<String,String> param) {
		List<ArrayList<String>> listCondition = paraseJSON2List(param.get("washIFGrid"));
		if(null==listCondition || listCondition.size()==0) {
			return null;
		}
		String[] flag = new String[21];
		for(ArrayList<String> field: listCondition) {
			if(StringUtils.isNotBlank(field.get(1)) && StringUtils.isNotBlank(field.get(2))) {
				flag[Integer.parseInt(field.get(0))] = field.get(2);
			}
		}
		return flag;
	}
	
	/**
	 * 解析条件拼装串，返回List<ArrayList<String>>
	 * @param json
	 * @return
	 */
	public List<ArrayList<String>> paraseJSON2List(String json) {
		if(StringUtils.isBlank(json)) {
			return null;
		}
		
		List<ArrayList<String>> result = new ArrayList<ArrayList<String>>();
		String[] jsonArray = StringUtils.split(json, ";");
		for(String record : jsonArray) {
			String[] fields = StringUtils.split(record,",");
			ArrayList<String> list = new ArrayList<String>();
			for(String field:fields) {
				list.add(field);
			}
			result.add(list);
		}
		
		if(result.size()>0) {
			return result;
		}
		return null;
	}
	
	public String getSplitJoinSQL(String[] flag,Map<String,String> param) {
		return null;
	}
	
	public String getSplitJoinSQL(Map<String,String> param) {
		return null;
	}
	
	public String getFieldFromSplitSQL(String splitSQL) {
		String[] sqlArr = StringUtils.split(splitSQL, "and");
		StringBuilder sb = new StringBuilder();
		int iCount = sqlArr.length;
		for(int i=0; i<iCount;i++) {
			if(StringUtils.isNotBlank(sqlArr[i])) {
				sb.append(StringUtils.substringBefore(sqlArr[i], "="));
				if(i<iCount-1) {
					sb.append(",");
				}
			}
		}
		return sb.toString();
	}
	
	public Map<String,String> getCountSQL(String washIfSQL,Map<String,String> param) {
		if(StringUtils.isNotBlank(washIfSQL)) {
			StringBuilder sbder = new StringBuilder();
			sbder.append("select sum(sum_count) TOTAL_COUNTS from (select count(1) sum_count from OB_CALLBATCH_IMP_TMP TMP");
			sbder.append(" where TMP.CALLBATCH_ID =to_number("+param.get("callbatchId")+")");
			sbder.append(" group by ");
			sbder.append(getFieldFromSplitSQL(washIfSQL));
			sbder.append("  having count(1)>1 ");
			sbder.append(")");
			String countSQL = sbder.toString();
			param.put("countSelSQL", countSQL);
		}
		return param;
	}
	public static void main(String args[]) {
		String SQL = " and TMP.NAME_CN=EXP_TMP.NAME_CN  and TMP.CRED_TYP_ID=EXP_TMP.CRED_TYP_ID and TMP.EMAIL=EXP_TMP.EMAIL  and TMP.TELE_OFFICE=EXP_TMP.TELE_OFFICE ";
		String[] sqlArr = StringUtils.split(SQL, "and");
		StringBuilder sb = new StringBuilder();
		int iCount = sqlArr.length;
		for(int i=0; i<iCount;i++) {
			if(StringUtils.isNotBlank(sqlArr[i])) {
				sb.append(StringUtils.substringBefore(sqlArr[i], "="));
				if(i<iCount-1) {
					sb.append(",");
				}
			}
		}
		System.out.println(sb.toString());
	}
}
