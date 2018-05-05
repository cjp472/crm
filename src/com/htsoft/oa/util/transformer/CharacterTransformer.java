package com.htsoft.oa.util.transformer;

public class CharacterTransformer implements Transformer {

	@Override
	public Object transformer(Object value) {
		return new Character((Character) value);
	}
}
