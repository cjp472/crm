package com.htsoft.oa.util;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import com.htsoft.oa.util.transformer.BigDecimalTransformer;
import com.htsoft.oa.util.transformer.BigIntegerTransformer;
import com.htsoft.oa.util.transformer.BooleanTransformer;
import com.htsoft.oa.util.transformer.ByteTransformer;
import com.htsoft.oa.util.transformer.CharacterTransformer;
import com.htsoft.oa.util.transformer.DateTransformer;
import com.htsoft.oa.util.transformer.DoubleTransformer;
import com.htsoft.oa.util.transformer.FloatTransformer;
import com.htsoft.oa.util.transformer.IntegerTransformer;
import com.htsoft.oa.util.transformer.LongTransformer;
import com.htsoft.oa.util.transformer.ShortTransformer;
import com.htsoft.oa.util.transformer.StringTransformer;
import com.htsoft.oa.util.transformer.Transformer;

/**
 * 设置每个类型对应的转化处理器,完成对象的转化
 * 
 * @author zhanghao
 * 
 */
public class FillDataUtil {
	public static Map<Class<? extends Object>, Transformer> parse = new HashMap<Class<? extends Object>, Transformer>();

	static {
		parse.put(Short.class, new ShortTransformer());
		parse.put(short.class, new ShortTransformer());
		parse.put(Integer.class, new IntegerTransformer());
		parse.put(int.class, new IntegerTransformer());
		parse.put(Long.class, new LongTransformer());
		parse.put(long.class, new LongTransformer());
		parse.put(Float.class, new FloatTransformer());
		parse.put(float.class, new FloatTransformer());
		parse.put(Double.class, new DoubleTransformer());
		parse.put(double.class, new DoubleTransformer());

		parse.put(Boolean.class, new BooleanTransformer());
		parse.put(boolean.class, new BooleanTransformer());
		parse.put(Byte.class, new ByteTransformer());
		parse.put(byte.class, new ByteTransformer());
		parse.put(Character.class, new CharacterTransformer());

		parse.put(String.class, new StringTransformer());
		parse.put(Date.class, new DateTransformer());

		parse.put(BigDecimal.class, new BigDecimalTransformer());
		parse.put(BigInteger.class, new BigIntegerTransformer());
	}
}
