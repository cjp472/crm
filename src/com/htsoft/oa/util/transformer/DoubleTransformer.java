package com.htsoft.oa.util.transformer;

public class DoubleTransformer implements Transformer {

	@Override
	public Object transformer(Object value) {
		return Double.parseDouble(value.toString());
	}
}
