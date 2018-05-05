package com.htsoft.oa.util.transformer;

public class StringTransformer implements Transformer {

	@Override
	public Object transformer(Object value) {
		return value.toString();
	}
}
