package com.htsoft.oa.util.transformer;

import java.text.ParseException;
import java.text.SimpleDateFormat;

public class DateTransformer implements Transformer {

	@Override
	public Object transformer(Object value) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		try {
			java.util.Date dt = sdf.parse("2005-2-19");
			return dt;
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
}
