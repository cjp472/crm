package com.ulane.know.model.know;

import javax.sql.DataSource;

import org.apache.mahout.cf.taste.impl.model.jdbc.AbstractJDBCDataModel;

public class ItemDataModel extends AbstractJDBCDataModel {
	/**
	 * 
	 */
	private static final long serialVersionUID = 7468564160170671457L;
	private int DEFAULT_FETCH_SIZE = 10;

	public ItemDataModel(DataSource datasource, String PERFERENCETABLE,
			String USERID_COLUMN, String ITEMID_COLUMN,
			String PERFERENCE_COLUMN, String TIMESTAMP_COLUMN) {
		super(datasource, PERFERENCETABLE, USERID_COLUMN,
				ITEMID_COLUMN,
				PERFERENCE_COLUMN,
				// getPreferenceSQL
				"SELECT " + PERFERENCE_COLUMN + " FROM " + PERFERENCETABLE
						+ " WHERE " + USERID_COLUMN + "=? AND " + ITEMID_COLUMN
						+ "=?",
				// getPreferenceTimeSQL
				"SELECT " + TIMESTAMP_COLUMN + " FROM " + PERFERENCETABLE
						+ " WHERE " + USERID_COLUMN + "=? AND " + ITEMID_COLUMN
						+ "=?",
				// getUserSQL
				"SELECT DISTINCT " + USERID_COLUMN + ", " + ITEMID_COLUMN
						+ ", " + PERFERENCE_COLUMN + " FROM " + PERFERENCETABLE
						+ " WHERE " + USERID_COLUMN + "=? ORDER BY "
						+ ITEMID_COLUMN,
				// getAllUsersSQL
				"SELECT DISTINCT " + USERID_COLUMN + ", " + ITEMID_COLUMN
						+ " FROM " + PERFERENCE_COLUMN
						+ " WHERE IS_SAMPLES = 1 ORDER BY " + USERID_COLUMN,
				// getNumItemsSQL
				"SELECT COUNT(DISTINCT " + ITEMID_COLUMN + ") FROM "
						+ PERFERENCETABLE + " WHERE IS_SAMPLES = 1",
				// getNumUsersSQL
				"SELECT COUNT(DISTINCT " + USERID_COLUMN + ") FROM "
						+ PERFERENCETABLE + " WHERE IS_SAMPLES = 1",
				// setPreferenceSQL mysql专有语法，这里应该不使用
				"INSERT INTO " + PERFERENCETABLE + '(' + USERID_COLUMN + ','
						+ ITEMID_COLUMN + ',' + PERFERENCE_COLUMN
						+ ") VALUES (?,?,?) ON DUPLICATE KEY UPDATE "
						+ PERFERENCE_COLUMN + "=?",
				// removePreference SQL
				"DELETE FROM " + PERFERENCETABLE + " WHERE " + USERID_COLUMN
						+ "=? AND " + ITEMID_COLUMN + "=?",
				// getUsersSQL
				"SELECT DISTINCT " + USERID_COLUMN + " FROM " + PERFERENCETABLE
						+ "WHERE IS_SAMPLES = 1" + " ORDER BY " + USERID_COLUMN,
				// getItemsSQL
				"SELECT DISTINCT " + ITEMID_COLUMN + " FROM " + PERFERENCETABLE
						+ "WHERE IS_SAMPLES = 1" + " ORDER BY " + ITEMID_COLUMN,
				// getPrefsForItemSQL
				"SELECT DISTINCT " + USERID_COLUMN + ", " + ITEMID_COLUMN
						+ ", " + PERFERENCE_COLUMN + " FROM " + PERFERENCETABLE
						+ " WHERE " + ITEMID_COLUMN
						+ "=? AND IS_SAMPLES = 1 ORDER BY " + USERID_COLUMN,
				// getNumPreferenceForItemSQL
				"SELECT COUNT(1) FROM " + PERFERENCETABLE + " WHERE "
						+ ITEMID_COLUMN + "=? AND IS_SAMPLES = 1",
				// getNumPreferenceForItemsSQL 既点击item1又点击item2的人的个数
				"SELECT COUNT(1) FROM " + PERFERENCETABLE + " tp1 JOIN "
						+ PERFERENCETABLE + " tp2 " + "USING (" + USERID_COLUMN
						+ ") WHERE tp1." + ITEMID_COLUMN + "=? and tp2."
						+ ITEMID_COLUMN + "=?"
						+ "AND tp1.IS_SAMPLES = 1 and tp2.IS_SAMPLES = 1",
				// 偏好的最大值
				"SELECT MAX(" + PERFERENCE_COLUMN + ") FROM " + PERFERENCETABLE
						+ " WHERE IS_SAMPLES = 1",
				// 偏好的最小值
				"SELECT MIN(" + PERFERENCE_COLUMN + ") FROM " + PERFERENCETABLE
						+ " WHERE IS_SAMPLES = 1");
	}

	@Override
	protected int getFetchSize() {
		return DEFAULT_FETCH_SIZE;
	}
}
