package com.ulane.know.model.know;

import javax.sql.DataSource;

import org.apache.mahout.cf.taste.impl.model.jdbc.AbstractJDBCDataModel;

public class UkSysKnowDataModel extends AbstractJDBCDataModel {
	/**
	 * 
	 */
	private static final long serialVersionUID = 4439245289425635925L;

	public final static String PERFERENCETABLE = "UK_SYS_KNOW_CUSTOMER";
	public final static String USERID_COLUMN = "CUSTOMERID";
	public final static String ITEMID_COLUMN = "KNOW_ID";
	public final static String PERFERENCE_COLUMN = "VIEW_COUNT";
	public final static String TIMESTAMP_COLUMN = "timestamp";

	public UkSysKnowDataModel(DataSource ds) {
		super(ds, PERFERENCETABLE, USERID_COLUMN, ITEMID_COLUMN,
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
						+ ", " + PERFERENCE_COLUMN + " FROM " + PERFERENCETABLE
						+ " ORDER BY " + USERID_COLUMN + ", " + ITEMID_COLUMN,
				// getNumItemsSQL
				"SELECT COUNT(DISTINCT " + ITEMID_COLUMN + ") FROM "
						+ PERFERENCETABLE,
				// getNumUsersSQL
				"SELECT COUNT(DISTINCT " + USERID_COLUMN + ") FROM "
						+ PERFERENCETABLE,
				// setPreferenceSQL
				"INSERT INTO " + PERFERENCETABLE + '(' + USERID_COLUMN + ','
						+ ITEMID_COLUMN + ',' + PERFERENCE_COLUMN
						+ ") VALUES (?,?,?) ON DUPLICATE KEY UPDATE "
						+ PERFERENCE_COLUMN + "=?",
				// removePreference SQL
				"DELETE FROM " + PERFERENCETABLE + " WHERE " + USERID_COLUMN
						+ "=? AND " + ITEMID_COLUMN + "=?",
				// getUsersSQL
				"SELECT DISTINCT " + USERID_COLUMN + " FROM " + PERFERENCETABLE
						+ " ORDER BY " + USERID_COLUMN,
				// getItemsSQL
				"SELECT DISTINCT " + ITEMID_COLUMN + " FROM " + PERFERENCETABLE
						+ " ORDER BY " + ITEMID_COLUMN,
				// getPrefsForItemSQL
				"SELECT DISTINCT " + USERID_COLUMN + ", " + ITEMID_COLUMN
						+ ", " + PERFERENCE_COLUMN + " FROM " + PERFERENCETABLE
						+ " WHERE " + ITEMID_COLUMN + "=? ORDER BY "
						+ USERID_COLUMN,
				// getNumPreferenceForItemSQL
				"SELECT COUNT(1) FROM " + PERFERENCETABLE + " WHERE "
						+ ITEMID_COLUMN + "=?",
				// getNumPreferenceForItemsSQL
				"SELECT COUNT(1) FROM " + PERFERENCETABLE + " tp1 JOIN "
						+ PERFERENCETABLE + " tp2 " + "USING (" + USERID_COLUMN
						+ ") WHERE tp1." + ITEMID_COLUMN + "=? and tp2."
						+ ITEMID_COLUMN + "=?", "SELECT MAX("
						+ PERFERENCE_COLUMN + ") FROM " + PERFERENCETABLE,
				"SELECT MIN(" + PERFERENCE_COLUMN + ") FROM " + PERFERENCETABLE);
	}
}
