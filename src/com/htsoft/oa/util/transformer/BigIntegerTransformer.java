package com.htsoft.oa.util.transformer;

import java.math.BigInteger;

public class BigIntegerTransformer implements Transformer {

	@Override
	public Object transformer(Object value) {
		return new BigInteger(value.toString());
	}
}
