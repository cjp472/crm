package com.htsoft.oa.util.transformer;

public class IntegerTransformer implements Transformer {

	@Override
	public Object transformer(Object value) {
		return Integer.parseInt(value.toString());
	}
}
