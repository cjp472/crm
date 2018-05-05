package com.htsoft.core.command;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
 */
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;

/**
 * 表字段查询条件
 * 
 * @author cf0666@gmail.com
 */
public class FieldCommandImpl implements CriteriaCommand {

	private static Log logger = LogFactory.getLog(CriteriaCommand.class);
	/*
	 * 属性名称
	 */
	private String property;
	/**
	 * 属性值
	 */
	private Object value;
	/**
	 * 查询属性的操作
	 */
	private String operation;

	private QueryFilter filter;

	public FieldCommandImpl(String property, Object value, String operation,
			QueryFilter filter) {
		this.property = property;
		this.value = value;
		this.operation = operation;
		this.filter = filter;
	}

	public String getProperty() {
		return property;
	}

	public void setProperty(String property) {
		this.property = property;
	}

	public Object getValue() {
		return value;
	}

	public void setValue(Object value) {
		this.value = value;
	}

	public String getOperation() {
		return operation;
	}

	public void setOperation(String operation) {
		this.operation = operation;
	}

	public Criteria execute(Criteria criteria) {
		// 支持外键属性的查询
		String[] propertys = property.split("[.]");

		if (propertys != null && propertys.length > 1) {
			if (!"vo".equals(propertys[0])) {// 若第一个字符串不为vo，表示为外键关键，否则还是实体的属性
				for (int i = 0; i < propertys.length - 1; i++) {
					// 防止别名重复
					if (!filter.getAliasSet().contains(propertys[i])) {
						if (i == 0) {
							criteria.createAlias(propertys[i], propertys[i]);
						} else {
							criteria.createAlias(propertys[i - 1] + "."
									+ propertys[i], propertys[i]);
						}
						filter.getAliasSet().add(propertys[i]);
					}
				}
			}
		}
		String property2 = new String(property);
		if (propertys.length > 2) {
			property2 = propertys[propertys.length - 2] + "."
					+ propertys[propertys.length - 1];
		}

		if ("LT".equals(operation)) {
			criteria.add(Restrictions.lt(property2, value));
		} else if ("GT".equals(operation)) {
			criteria.add(Restrictions.gt(property2, value));
		} else if ("LE".equals(operation)) {
			criteria.add(Restrictions.le(property2, value));
		} else if ("GE".equals(operation)) {
			criteria.add(Restrictions.ge(property2, value));
		} else if ("LK".equals(operation)) {
			criteria.add(Restrictions.like(property2,
					"%" + value.toString().trim() + "%").ignoreCase());
		} else if ("LFK".equals(operation)) {
			criteria.add(Restrictions.like(property2, value + "%").ignoreCase());
		} else if ("RHK".equals(operation)) {
			criteria.add(Restrictions.like(property2, "%" + value).ignoreCase());
		} else if ("NULL".equals(operation)) {
			criteria.add(Restrictions.isNull(property2));
		} else if ("NOTNULL".equals(operation)) {
			criteria.add(Restrictions.isNotNull(property2));
		} else if ("EMP".equals(operation)) {
			criteria.add(Restrictions.isEmpty(property2));
		} else if ("NOTEMP".equals(operation)) {
			criteria.add(Restrictions.isNotEmpty(property2));
		} else if ("NEQ".equals(operation)) {
			criteria.add(Restrictions.ne(property2, value));
		} else if ("LIN".equals(operation)) {// long型IN
			String[] str = value.toString().split(",");
			Long[] lon = new Long[str.length];
			for (int i = 0; i < lon.length; i++) {
				lon[i] = new Long(str[i].trim());
			}
			criteria.add(Restrictions.in(property2, lon));
		} else if ("SNIN".equals(operation)) {// long型IN
			String[] str = value.toString().split(",");
			Short[] lon = new Short[str.length];
			for (int i = 0; i < lon.length; i++) {
				lon[i] = new Short(str[i].trim());
			}
			criteria.add(Restrictions.in(property2, lon));
		} else if ("SIN".equals(operation)) {// String型IN
			String[] str = value.toString().split(",");
			criteria.add(Restrictions.in(property2, str));
		} else if ("NE".equals(operation)) {// 不等于的支持
			criteria.add(Restrictions.ne(property2, value));
		} else {
			criteria.add(Restrictions.eq(property2, value));
		}

		return criteria;
	}

	public String getPartHql() {
		// 处理外键的问题
		String[] propertys = property.split("[.]");
		if (propertys != null && propertys.length > 1) {
			if (!"vo".equals(propertys[0])) {// 若第一个字符串不为vo，表示为外键关键，否则还是实体的属性
				// 防止别名重复
				if (!filter.getAliasSet().contains(propertys[0])) {
					filter.getAliasSet().add(propertys[0]);
				}
			}
		}
		String partHql = "";
		if ("LT".equals(operation)) {
			partHql = property + " < ? ";
			filter.getParamValueList().add(value);
		} else if ("GT".equals(operation)) {
			partHql = property + " > ? ";
			filter.getParamValueList().add(value);
		} else if ("LE".equals(operation)) {
			partHql = property + " <= ? ";
			filter.getParamValueList().add(value);
		} else if ("GE".equals(operation)) {
			partHql = property + " >= ? ";
			filter.getParamValueList().add(value);
		} else if ("LK".equals(operation)) {
			partHql = property + " like ? ";
			filter.getParamValueList().add("%" + value.toString() + "%");
		} else if ("LFK".equals(operation)) {
			partHql = property + " like ? ";
			filter.getParamValueList().add(value.toString() + "%");
		} else if ("RHK".equals(operation)) {
			partHql = property + " like ? ";
			filter.getParamValueList().add("%" + value.toString());
		} else if ("NULL".equals(operation)) {
			partHql = property + " is null ";
		} else if ("NOTNULL".equals(operation)) {
			partHql = property + " is not null ";
		} else if ("EMP".equals(operation)) {
			// TODO
		} else if ("NOTEMP".equals(operation)) {

		} else if ("NEQ".equals(operation)) {
			partHql = property + " !=? ";
			filter.getParamValueList().add(value);
		} else if ("LIN".equals(operation)) {
			partHql = property + " in(?) ";
			filter.getParamValueList().add(value);
		} else if ("SIN".equals(operation)) {
			partHql = property + " in(?) ";
			filter.getParamValueList().add(value);
		} else {
			partHql += property + " =? ";
			filter.getParamValueList().add(value);
		}

		return partHql;
	}

}
