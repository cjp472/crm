package com.htsoft.oa.util.transformer;

import java.math.BigDecimal;

public class BigDecimalTransformer implements Transformer {

	@Override
	public Object transformer(Object value) {
		return new BigDecimal(value.toString());
	}
}
