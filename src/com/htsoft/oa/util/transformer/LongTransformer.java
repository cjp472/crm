package com.htsoft.oa.util.transformer;

public class LongTransformer implements Transformer {

	@Override
	public Object transformer(Object value) {
		return Long.parseLong(value.toString());
	}
}
