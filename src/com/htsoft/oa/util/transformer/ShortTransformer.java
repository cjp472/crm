package com.htsoft.oa.util.transformer;

public class ShortTransformer implements Transformer {

	@Override
	public Object transformer(Object value) {
		return Short.parseShort(value.toString());
	}
}
