package com.htsoft.oa.util;

public class StringUtil {
	/** copy from spring ,true大写，first小写 */
	public static String changeFirstCharacterCase(String str, boolean capitalize) {
		if (str == null || str.length() == 0) {
			return str;
		}
		StringBuffer buf = new StringBuffer(str.length());
		if (capitalize) {
			buf.append(Character.toUpperCase(str.charAt(0)));
		} else {
			buf.append(Character.toLowerCase(str.charAt(0)));
		}
		buf.append(str.substring(1));
		return buf.toString();
	}

	/** ����ĸ��copy from spring */
	public static String capitalize(String str) {
		return changeFirstCharacterCase(str, true);
	}

	/**
	 * 将下划线写法的每个开头字符大写,并去掉下划线。<br>
	 * 下划线也被删除了。
	 * 
	 * @param sqlName
	 * @return
	 */
	public static String makeAllWordFirstLetterUpperCase(String sqlName) {
		String[] strs = sqlName.toLowerCase().split("_");
		String result = "";
		String preStr = "";
		for (int i = 0; i < strs.length; i++) {
			if (preStr.length() == 1) {
				result += strs[i];
			} else {
				result += capitalize(strs[i]);
			}
			preStr = strs[i];
		}
		return result;
	}

	public static String getFieldName(String sqlName) {
		sqlName = makeAllWordFirstLetterUpperCase(sqlName);
		if (sqlName == null || sqlName.length() == 0) {
			return sqlName;
		}
		StringBuffer buf = new StringBuffer(sqlName.length());
		String first = sqlName.substring(0, 1);
		String other = sqlName.substring(1);
		buf.append(first.toLowerCase());
		buf.append(other);
		return buf.toString();
	}

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		String name = getFieldName("CREATE_USER_ID");
		System.out.println(name);
	}

}
