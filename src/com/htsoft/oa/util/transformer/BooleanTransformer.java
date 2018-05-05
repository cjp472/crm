package com.htsoft.oa.util.transformer;

public class BooleanTransformer implements Transformer {

	@Override
	public Object transformer(Object value) {
		return new Boolean(value.toString());
	}
}
