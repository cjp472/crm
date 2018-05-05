package com.htsoft.oa.util;

import java.lang.reflect.Field;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.htsoft.oa.util.transformer.Transformer;

/**
 * 将数据填充至对象的工具类.
 * 
 * <pre>
 * 目前支持<br>
 * 1.将http请求的数据填充到目标对象<br>
 * 2.将数据库查询得到的ResultSet对象填充到目标对象
 * </pre>
 * 
 * @author zhanghao
 * 
 */
public class FillData {

	/**
	 * 将一个HttpServletRequest中的数据,转化为一个对象
	 * 
	 * <pre>
	 * 支持对象中非基础属性的字段的填充,使用.号分割.如: employee.name<br>
	 * 为了兼容目前使用的struts2,req的参数名的第一个.前边的部分将忽略,如果参数名不带.,该参数将被忽略
	 * </pre>
	 * 
	 * @param req
	 *            http请求
	 * @param targetType
	 *            填充的目标对象的类型
	 * @return 填充完成的对象
	 */
	public static Object fillDataHttpRequest(HttpServletRequest req,
			Class<? extends Object> targetType) {
		try {
			Object target = targetType.newInstance();
			Map<String, String> data = parseHttpRequestToMap(req);
			// showMap(data);
			fillDataMap(data, target);
			return target;
		} catch (InstantiationException e) {
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		}
		return null;
	}

	public static Map<String, String> parseHttpRequestToMap(
			HttpServletRequest req) {
		Map<String, String> data = new HashMap<String, String>();

		@SuppressWarnings("rawtypes")
		Enumeration paramEnu = req.getParameterNames();
		while (paramEnu.hasMoreElements()) {
			String key = (String) paramEnu.nextElement();
			String value = req.getParameter(key);
			// add struts2 intercept,直接去除了.前的部分
			if (key.contains(".")) {
				data.put(key.substring(key.indexOf(".") + 1), value);
			}
		}
		return data;
	}

	/**
	 * 将ResultSet对象填充为目标对象
	 * 
	 * <pre>
	 * 目前只可以填充代码生成的对象(因为可以根据列名计算出对象中对应的字段名),不是代码生成的对象,请自己填充对象.
	 * </pre>
	 * 
	 * @param rs
	 *            查询数据库得到的ResultSet结果集
	 * @param targetType
	 *            填充的目标对象的类型
	 * @return 填充完成的对象
	 */
	public static Object fillDataJDBC(ResultSet rs,
			Class<? extends Object> targetType) {
		List<Object> result = new ArrayList<Object>();
		try {
			while (rs.next()) {
				Object target = targetType.newInstance();
				Map<String, Object> data_map = parseResultToMap(rs);
				fillDataMap(data_map, target);
				result.add(target);
			}
			return result;
		} catch (InstantiationException e) {
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return null;
	}

	public static Map<String, Object> parseResultToMap(ResultSet rs) {
		Map<String, Object> data = new HashMap<String, Object>();

		try {
			ResultSetMetaData meta = rs.getMetaData();
			for (int i = 1; i <= meta.getColumnCount(); i++) {
				String colNname = meta.getColumnName(i);
				// int type = meta.getColumnType(i);
				Object value = rs.getObject(i);
				String fieldName = StringUtil.getFieldName(colNname);
				data.put(fieldName, value);
			}
			return data;
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return data;
	}

	public static void fillDataMap(Map<String, ? extends Object> data, Object o) {
		for (String name : data.keySet()) {
			try {
				setFieldWithPoint(name, o, (Object) data.get(name));
			} catch (SecurityException e) {
				System.err.println(name + " pares error");
				e.printStackTrace();
			} catch (NoSuchFieldException e) {
				System.err.println(name + " pares error, 字段不存在");
				// e.printStackTrace();
			} catch (IllegalArgumentException e) {
				System.err.println(name + " pares error");
				e.printStackTrace();
			} catch (IllegalAccessException e) {
				System.err.println(name + " pares error");
				e.printStackTrace();
			} catch (InstantiationException e) {
				e.printStackTrace();
			}
		}
	}

	/**
	 * 填充完成的对象
	 * 
	 * @param name
	 *            字段的名称
	 * @param o
	 *            待填充的对象
	 * @param value
	 *            字段的值
	 * @throws SecurityException
	 * @throws NoSuchFieldException
	 * @throws InstantiationException
	 * @throws IllegalAccessException
	 */
	public static void setFieldWithPoint(String name, Object o, Object value)
			throws SecurityException, NoSuchFieldException,
			InstantiationException, IllegalAccessException {
		if (value == null) {
			return;
		}
		if (name.contains(".")) {
			String first = name.substring(0, name.indexOf("."));
			String other = name.substring(name.indexOf(".") + 1);
			Field f = o.getClass().getDeclaredField(first);
			f.setAccessible(true);
			Object subObject = f.getType().newInstance();
			f.set(o, subObject);
			setFieldWithPoint(other, subObject, value);
		} else {
			Field f = o.getClass().getDeclaredField(name);
			f.setAccessible(true);
			// 转化value到字段的类型
			Transformer tf = FillDataUtil.parse.get(f.getType());
			if (tf != null) {
				Object data = tf.transformer(value);
				f.set(o, data);
			} else {
				System.err.println(f.getType() + " lose transformer.");
			}
		}
	}

	@SuppressWarnings("unused")
	private static void showMap(Map<String, String> map) {
		for (String key : map.keySet()) {
			System.out.println("key : " + key + ", value : " + map.get(key));
		}
	}

	public static void main(String[] args) {
		String str = ",a,bcd,f,";
		if (str.substring(0, 1).equals(",")) {
			str = str.substring(1);
		}
		if (str.substring(str.length() - 1, str.length()).equals(",")) {
			str = str.substring(0, str.length() - 1);
		}
		System.out.println(str);
	}
}
