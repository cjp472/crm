package com.ulane.core.plugin.util;

import java.text.SimpleDateFormat;
import java.util.Date;

public class SoapDateUtil {
	/**
	 * @author cuiluzhe
	 * 将传入的日期字符串转换为整形
	 * @param dateString 日期字符串
	 * @return
	 */
	public static int dateToInteger(){
		Date date=new Date();
		SimpleDateFormat sdf=new SimpleDateFormat("yyyyMMdd");
		String dateString2=sdf.format(date);
		return Integer.parseInt(dateString2);
	}
	public static void main(String[] args){
		System.out.println(SoapDateUtil.dateToInteger());
	}

}
