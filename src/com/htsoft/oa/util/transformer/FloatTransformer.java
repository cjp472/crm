package com.htsoft.oa.util.transformer;

public class FloatTransformer implements Transformer {

	@Override
	public Object transformer(Object value) {
		return Float.parseFloat(value.toString());
	}
}
