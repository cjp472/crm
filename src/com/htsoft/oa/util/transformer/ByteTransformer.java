package com.htsoft.oa.util.transformer;

public class ByteTransformer implements Transformer {

	@Override
	public Object transformer(Object value) {
		return new Byte(value.toString());
	}
}
