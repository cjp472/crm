package com.ulane.know.model.know;

import javax.sql.DataSource;

public class UkSysKnowTypeModel extends ItemDataModel {
	/**
	 * 
	 */
	private static final long serialVersionUID = 4439245289425635925L;

	public final static String PERFERENCETABLE = "UK_TYPE_CUSTOMER";
	public final static String USERID_COLUMN = "CUSTOMERID";
	public final static String ITEMID_COLUMN = "KNOW_TYPE_ID";
	public final static String PERFERENCE_COLUMN = "VIEW_COUNT";
	public final static String TIMESTAMP_COLUMN = "timestamp";

	public UkSysKnowTypeModel(DataSource ds) {
		super(ds, PERFERENCETABLE, USERID_COLUMN, ITEMID_COLUMN,
				PERFERENCE_COLUMN, TIMESTAMP_COLUMN);
	}
}
