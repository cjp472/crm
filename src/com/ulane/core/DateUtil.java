package com.ulane.core;

/**
 *公用日期操作类
 *@author Qing-Hua.Liu
 *@date 2006-6-1
 *
 */
import java.util.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;

import org.apache.commons.lang.time.DateFormatUtils;

public class DateUtil {

	public static final String Date_Time_Format = "yyyy-MM-dd HH:mm:ss";
	public static final String Date_Format = "yyyy-MM-dd";
	public static final String Date_Format2 = "MM-dd-yyyy";

	public static final int WeekSpan = 7;
	public static final int month[] = { 31, 28, 31, 30, 31, 30, 31, 31, 30, 31,
			30, 31 };

	public DateUtil() {
	}

	/**
	 * 判断是否闰年
	 * 
	 * @param year
	 *            int
	 * @return boolean
	 */
	private static boolean LeapYear(int year) {
		if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) {
			return true;
		} else {
			return false;
		}
	}

	/**
	 * 对个位数的月份之前补零
	 * 
	 * @param month
	 *            int
	 * @return String
	 */
	private static String impleMonth(int month) {
		String monthStr = new Integer(month).toString();
		if (monthStr.length() == 1) {
			monthStr = "0" + monthStr;
		}
		return monthStr;
	}

	/**
	 * 对个位数的日子之前补零
	 * 
	 * @param day
	 *            int
	 * @return String
	 */
	private static String impleDay(int day) {
		String dayStr = new Integer(day).toString();
		if (dayStr.length() == 1) {
			dayStr = "0" + dayStr;
		}
		return dayStr;
	}

	/**
	 * 得到当前周的第一天（周一）的日期
	 * 
	 * @return String
	 */
	public static String getWeekFirstDate() {
		Date da = new Date();
		int dayOfWeek = da.getDay(); // 当前日期是星期几
		long fromWeekFirstInMillis = (dayOfWeek - 1) * 24 * 60 * 60 * 1000; // 与该周第一天相隔的毫秒数
		da.setTime(da.getTime() - fromWeekFirstInMillis);
		String weekFirstDay = new Integer(da.getYear() + 1900).toString();
		weekFirstDay = weekFirstDay + "-" + impleMonth(da.getMonth() + 1);
		weekFirstDay = weekFirstDay + "-" + impleDay(da.getDate());
		return weekFirstDay;
	}

	/**
	 * 得到当前周的最后一天（周日）的日期
	 * 
	 * @return String
	 */
	public static String getWeekLastDate() {
		Date da = new Date();
		int dayOfWeek = da.getDay(); // 当前日期是星期几
		long toWeekLastInMillis = (WeekSpan - dayOfWeek) * 24 * 60 * 60 * 1000; // 与该周最后一天相隔的毫秒数
		da.setTime(da.getTime() + toWeekLastInMillis);
		String weekLastDay = new Integer(da.getYear() + 1900).toString();
		weekLastDay = weekLastDay + "-" + impleMonth(da.getMonth() + 1);
		weekLastDay = weekLastDay + "-" + impleDay(da.getDate());
		return weekLastDay;
	}

	/**
	 * 得到当前月的第一天的日期
	 * 
	 * @return String
	 */
	public static String getMonthFirstDate() {
		Date da = new Date();
		long dayOfMonth = da.getDate(); // 当前日期是本月第几天
		long fromMonthFirstInMillis = (dayOfMonth - 1) * 24 * 60 * 60 * 1000; // 与该月第一天相隔的毫秒数
		da.setTime(da.getTime() - fromMonthFirstInMillis);
		String MonthFirstDay = new Integer(da.getYear() + 1900).toString();
		MonthFirstDay = MonthFirstDay + "-" + impleMonth(da.getMonth() + 1);
		MonthFirstDay = MonthFirstDay + "-" + impleDay(da.getDate());
		return MonthFirstDay;
	}

	/**
	 * 得到当前月的最后一天的日期
	 * 
	 * @return String
	 */
	public static String getMonthLastDate() {
		Date da = new Date();
		long dayOfMonth = da.getDate(); // 当前日期是本月第几天
		int monthSpan = 0;
		if ((da.getMonth() + 1) == 2) {
			if (LeapYear(da.getYear() + 1900)) {
				monthSpan = 29;
			} else {
				monthSpan = month[da.getMonth()];
			}
		} else {
			monthSpan = month[da.getMonth()];

		}

		long toMonthLastInMillis = (monthSpan - dayOfMonth) * 24 * 60 * 60
				* 1000; // 与该月最后一天相隔的毫秒数
		da.setTime(da.getTime() + toMonthLastInMillis);
		String MonthLastDay = new Integer(da.getYear() + 1900).toString();
		MonthLastDay = MonthLastDay + "-" + impleMonth(da.getMonth() + 1);
		MonthLastDay = MonthLastDay + "-" + impleDay(da.getDate());
		return MonthLastDay;
	}

	/**
	 * 得到当前的日期
	 * 
	 * @return String
	 */
	public static String getCurrentDay() {
		Date da = new Date();
		String currentDay = new Integer(da.getYear() + 1900).toString();
		currentDay = currentDay + "-" + impleMonth(da.getMonth() + 1);
		currentDay = currentDay + "-" + impleDay(da.getDate());
		return currentDay;
	}

	/**
	 * 按长度把字符串前补0
	 * 
	 * @param s
	 *            String
	 * @param len
	 *            int
	 * @return String
	 */
	public static String strLen1(String s, int len) {
		if (isNullStr(s)) {
			s = "";

		}
		int strLen = s.length();
		for (int i = 0; i < len - strLen; i++) {
			s = "0" + s;
		}
		return s;
	}

	/**
	 * 
	 * @param s
	 *            String
	 * @param len
	 *            int
	 * @return String
	 */
	public static String strLen(String s, int len) {
		if (isNullStr(s)) {
			s = "";
		}
		if (s.length() == 8) {
			return s;
		}
		for (int i = 0; i < len - s.length(); i++) {
			s = "0" + s;
			if (s.length() == 8) {
				break;
			}
		}
		return s;
	}

	/**
	 * 判断字符串是否为空
	 * 
	 * @param s
	 *            String
	 * @return boolean
	 */
	public static boolean isNullStr(String s) {
		if (s == null || s.trim().length() <= 0) {
			return true;
		} else {
			return false;
		}
	}

	/**
	 * 判断字符串数组是否为空
	 * 
	 * @param s
	 *            String[]
	 * @return boolean
	 */
	public static boolean isNullStr(String[] s) {
		if ((s == null) || (s.length <= 0)) {
			return true;
		} else {
			return false;
		}
	}

	/**
	 * 返回日历的年字符串
	 * 
	 * @param cal
	 *            Calendar
	 * @return String
	 */
	public static String getYear(Calendar cal) {
		return String.valueOf(cal.get(cal.YEAR));
	}

	/**
	 * 返回日历的月字符串(两位)
	 * 
	 * @param cal
	 *            Calendar
	 * @return String
	 */
	public static String getMonth(Calendar cal) {
		return strLen(String.valueOf(cal.get(cal.MONTH) + 1), 2);
	}

	/**
	 * 返回日历的日字符串(两位)
	 * 
	 * @param cal
	 *            Calendar
	 * @return String
	 */
	public static String getDay(Calendar cal) {
		return strLen(String.valueOf(cal.get(cal.DAY_OF_MONTH)), 2);
	}

	/**
	 * 返回日历的时字符串(两位)
	 * 
	 * @param cal
	 *            Calendar
	 * @return String
	 */
	public static String getHour(Calendar cal) {
		return strLen(String.valueOf(cal.get(cal.HOUR_OF_DAY)), 2);
	}

	/**
	 * 返回日历的分字符串(两位)
	 * 
	 * @param cal
	 *            Calendar
	 * @return String
	 */
	public static String getMinute(Calendar cal) {
		return strLen(String.valueOf(cal.get(cal.MINUTE)), 2);
	}

	/**
	 * 返回日历的秒字符串(两位)
	 * 
	 * @param cal
	 *            Calendar
	 * @return String
	 */
	public static String getSecond(Calendar cal) {
		return strLen(String.valueOf(cal.get(cal.SECOND)), 2);
	}

	/**
	 * 由"yyyy-mm-dd"型串转换为Integer型yyyymmdd
	 * 
	 * @param strDate
	 *            String
	 * @return Integer
	 */
	public static Integer getNumDate(String strDate) {
		String theDay = null;
		if (strDate != null && strDate.length() > 9) {
			theDay = strDate.substring(0, 4) + strDate.substring(5, 7)
					+ strDate.substring(8, 10);
			return new Integer(theDay);
		}
		return null;
	}

	/**
	 * 返回日历的日期字符串（格式："yyyy-mm-dd"）
	 * 
	 * @param cal
	 *            Calendar
	 * @return String
	 */
	public static String getDateStr(Calendar cal) {
		return getYear(cal) + "-" + getMonth(cal) + "-" + getDay(cal);
	}

	/**
	 * 返回日历的日期字符串（格式："yyyymmdd"）
	 * 
	 * @param cal
	 *            Calendar
	 * @return String
	 */
	public static String getDateStr2(Calendar cal) {
		return getYear(cal) + getMonth(cal) + getDay(cal);
	}

	/**
	 * 返回日历的日期时间字符串（格式："yyyymmddhhmmss"）
	 * 
	 * @param cal
	 *            Calendar
	 * @return String
	 */
	public static String getDateStr4(Calendar cal) {
		return getYear(cal) + getMonth(cal) + getDay(cal) + getHour(cal)
				+ getMinute(cal) + getSecond(cal);
	}

	/**
	 * 返回日历的时间字符串（格式："hhmmss"）
	 * 
	 * @param cal
	 *            Calendar
	 * @return String
	 */
	public static String getTimeStr2(Calendar cal) {
		return getHour(cal) + getMinute(cal) + getSecond(cal);
	}

	/**
	 * 返回日历的日期字符串（格式："yyyy-mm-dd"）
	 * 
	 * @param date
	 *            Integer
	 * @return String
	 */
	public static String getDateStr3(Integer date) {
		String result = "";
		String dateStr = String.valueOf(date);
		if (dateStr != null && dateStr.length() == 8) {
			result = dateStr.substring(0, 4) + "-" + dateStr.substring(4, 6)
					+ "-" + dateStr.substring(6, 8);
		}
		return result;
	}

	/**
	 * 返回日历的时间字符串（格式："hh:ss"）
	 * 
	 * @param cal
	 *            Calendar
	 * @return String
	 */
	public static String getTimeStr(Calendar cal) {
		return getHour(cal) + ":" + getMinute(cal);
	}

	/**
	 * 返回日历的时间字符串（格式："hh:ss:mm"）
	 * 
	 * @param cal
	 *            Calendar
	 * @return String
	 */
	public static String getTime2Str(Calendar cal) {
		return getHour(cal) + ":" + getMinute(cal) + ":" + getSecond(cal);
	}

	/**
	 * 返回日历的日期时间字符串（格式："yyyy-mm-dd hh:ss"）
	 * 
	 * @param cal
	 *            Calendar
	 * @return String
	 */
	public static String getDate(Calendar cal) {
		return getDateStr(cal) + " " + getTimeStr(cal);
	}

	/**
	 * 返回日期字符串("yyyy-mm-dd hh:ss:mm")的年月日("yyyy-mm-dd")
	 * 
	 * @param s
	 *            String
	 * @return
	 */
	public static String getDate(String s) {
		if (s == null || s.length() < 10) {
			return "";
		}
		return s.substring(0, 10);
	}

	/**
	 * 返回日期字符串("yyyy-mm-dd hh:ss:mm")的年
	 * 
	 * @param s
	 *            String
	 * @return int
	 */
	public static int getYear(String s) {
		if (s == null || s.length() < 10) {
			return 1970;
		}
		return Integer.parseInt(s.substring(0, 4));
	}

	/**
	 * 返回日期字符串("yyyy-mm-dd hh:ss:mm")的月
	 * 
	 * @param s
	 *            String
	 * @return int
	 */
	public static int getMonth(String s) {
		if (s == null || s.length() < 10) {
			return 1;
		}
		return Integer.parseInt(s.substring(5, 7));
	}

	/**
	 * 返回日期字符串("yyyy-mm-dd hh:ss:mm")的日
	 * 
	 * @param s
	 *            String
	 * @return int
	 */
	public static int getDay(String s) {
		if (s == null || s.length() < 10) {
			return 1;
		}
		return Integer.parseInt(s.substring(8, 10));
	}

	/**
	 * 返回日期字符串("yyyy-mm-dd hh:ss:mm")的时
	 * 
	 * @param s
	 *            String
	 * @return int
	 */
	public static int getHour(String s) {
		if (s == null || s.length() < 16) {
			return 0;
		}
		return Integer.parseInt(s.substring(11, 13));
	}

	/**
	 * 返回日期字符串("yyyy-mm-dd hh:ss:mm")的分
	 * 
	 * @param s
	 *            String
	 * @return int
	 */
	public static int getMinute(String s) {
		if (s == null || s.length() < 16) {
			return 0;
		}
		return Integer.parseInt(s.substring(14, 16));
	}

	/**
	 * 返回日期字符串("yyyy-mm-dd hh:ss:mm")的秒
	 * 
	 * @param s
	 *            String
	 * @return int
	 */
	public static int getSecond(String s) {
		if (s == null || s.length() < 18) {
			return 0;
		}
		return Integer.parseInt(s.substring(17, 18));
	}
	
	/**
	 * 返回日期字符串("yyyy-mm-dd hh:ss:mm")的hh:ss:mm
	 * @param s
	 * @return
	 */
	public static String getTime(String s){
		if (s == null || s.length() < 18) {
			return "00:00:00";
		}
		return s.substring(11, 18);		
	}
	
	public static final String getNow2() {
		long time = Calendar.getInstance().getTimeInMillis();
		return DateFormatUtils.format(time, Date_Time_Format);
	}

	public static final String getCurrentTime() {
		long time = Calendar.getInstance().getTimeInMillis();
		return DateFormatUtils.format(time, Date_Format);
	}

	public static final String getCurrentTime(Date d) {
		return DateFormatUtils.format(d, Date_Format);
	}


	public static final String getCurrentDate(Date d) {
		return DateFormatUtils.format(d, "yyyy-MM-dd 00:00:00");
	}

	public static final String getCurrentDateShortStyle() {
		long time = Calendar.getInstance().getTimeInMillis();
		return DateFormatUtils.format(time, "yyyy-MM-dd");
	}

	public static final String getCurrentDateShortStyle(Date d) {
		return DateFormatUtils.format(d, "yyyy-MM-dd");
	}

	/**
	 * 返回日期时间字符串对应的日历（格式："yyyy-mm-dd hh:ss"）
	 * 
	 * @param s
	 *            String
	 * @return Calendar
	 */
	public static Calendar getCal(String s) {
		Calendar cal = Calendar.getInstance();
		cal.set(getYear(s), getMonth(s), getDay(s), getHour(s), getMinute(s),
				getSecond(s));
		return cal;
	}

	/**
	 * 返回日期时间字符串对应的SQL日期（格式："yyyy-mm-dd hh:ss"）
	 * 
	 * @param s
	 *            String
	 * @return Date
	 */
	public static java.sql.Date getSqlDate(String s) {
		return java.sql.Date.valueOf(s);
	}

	/**
	 * 返回当天日期对应的SQL日期（）
	 * 
	 * @return Date
	 */
	public static java.sql.Date getSqlDate() {
		return java.sql.Date.valueOf(getNowDate());
	}

	/**
	 * 取当前日期时间的字符串，格式为"yyyy-mm-dd hh:ss"
	 * 
	 * @return String
	 */
	public static String getNowDatetimeMM() {
		Calendar now = Calendar.getInstance();
		return getDateStr(now) + " " + getTimeStr(now);
	}

	/**
	 * 取当前日期时间的字符串，格式为"yyyy-mm-dd hh:ss:mm"
	 * 
	 * @return String
	 */
	public static String getNowDatetimeSS() {
		Calendar now = Calendar.getInstance();
		return getDateStr(now) + " " + getTime2Str(now);
	}

	/**
	 * 取当前日期的整形串，格式为"yyyymmdd"
	 * 
	 * @return Integer
	 */
	public static Integer getNumDate() {
		Calendar now = Calendar.getInstance();
		return new Integer(getDateStr2(now));
	}

	/**
	 * 取当前日期的整形串，格式为"yyyymmddhhmmss"
	 * 
	 * @return String
	 */
	public static String getNumDate2() {
		Calendar now = Calendar.getInstance();
		return getDateStr4(now);
	}

	/**
	 * 取当前日期的整形串，格式为"hhmmss"
	 * 
	 * @return String
	 */
	public static String getNumTime() {
		Calendar now = Calendar.getInstance();
		return getTimeStr2(now);
	}

	/**
	 * 取给定日期的整形串，格式为"yyyymmdd"
	 * 
	 * @param cal
	 *            Calendar
	 * @return Integer
	 */
	public static Integer getNumDate(Calendar cal) {
		return new Integer(getDateStr2(cal));
	}

	/**
	 * 取当前日期的字符串，格式为"yyyy-mm-dd"
	 * 
	 * @return String
	 */
	public static String getNowDate() {
		Calendar now = Calendar.getInstance();
		return getDateStr(now);
	}

	/**
	 * 取当前时间的字符串，格式为"hh:ss"
	 * 
	 * @return String
	 */
	public static String getNowTime() {
		Calendar now = Calendar.getInstance();
		return getTimeStr(now);
	}

	/**
	 * 取当前时间的字符串
	 * 
	 * @return String
	 */
	public static String getCurrentTimeMillisStr() {

		return (new Long(System.currentTimeMillis()).toString());
	}

	/**
	 * 取当前时间的字符串
	 * 
	 * @param time
	 *            String
	 * @return String
	 */
	public static String changTimeMillisToStr(String time) {
		long t = 0l;
		try {
			t = Long.parseLong(time);
		} catch (Exception e) {
			return "";
		}
		Date date = new Date();
		date.setTime(t);
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);

		return getDateStr(cal) + " " + getTimeStr(cal);
	}

	/**
	 * 
	 * @param time
	 *            long
	 * @return String
	 */
	public static String changTimeMillisToStr(long time) {
		String str = "";
		try {
			str = Long.toString(time);
		} catch (Exception e) {
		}
		return changTimeMillisToStr(str);
	}

	/**
	 * 
	 * @return String
	 */
	public static String getCurrentDate() {
		SimpleDateFormat sdf = new SimpleDateFormat(Date_Format);
		return sdf.format(new Date());
	}

	/**
	 * 
	 * @return String
	 */
	public static String getCurrentDateTime() {
		SimpleDateFormat sdf = new SimpleDateFormat(Date_Time_Format);
		return sdf.format(new Date());
	}

	/**
	 * 格式化字符串为日期的函数.
	 * 
	 * @param str
	 *            字符串.
	 * @param format
	 *            转换格式如:"yyyy-MM-dd mm:ss"
	 * @return 字符串包含的日期.
	 */
	public static Date parseDate(String strDate, String format) {
		try {
			if (strDate == null || strDate.equals("")) {
				return null;
			}
			SimpleDateFormat simpleDateFormat = new SimpleDateFormat(format);
			return simpleDateFormat.parse(strDate);
		} catch (Exception e) {
		}
		return new Date();
	}

	/**
	 * 格式化日期为字符串函数.
	 * 
	 * @param date
	 *            日期.
	 * @param sFormat
	 *            转换格式."yyyy-MM-dd mm:ss"
	 * @return 日期转化来的字符串.
	 */
	public static String formatDate(Date date, String format) {
		if (date == null) {
			return "";
		}
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat(format);
		return simpleDateFormat.format(date);
	}

	/**
	 * 取得preNum天前的当前时间字符串函数.
	 * 
	 * @param preNum
	 *            天数
	 * @return preNum天前的当前时间字符串，格式"yyyy-MM-dd hh:mm:ss".
	 */
	public static String getPreDateStr(int preNum) {
		String result = null;
		Calendar cal = Calendar.getInstance();
		cal.add(Calendar.DATE, -preNum);
		result = getDateStr(cal) + " " + getTime2Str(cal);
		return result;
	}

	/**
	 * 根据格式字符串取得当前时间preNum年/月/日/时/分/秒前的时间（字符串）函数.
	 * 
	 * @param formateStr
	 *            格式字符串。 如果为"yyyy",则preNum单位为年； 如果为"MM",则preNum单位为月；
	 *            如果为"dd",则preNum单位为日； 如果为"hh",则preNum单位为小时；
	 *            如果为"mm",则preNum单位为分钟； 如果为"ss",则preNum单位为秒；
	 * @param preNum
	 *            年/月/日/时/分/秒
	 * @return 当前时间preNum年/月/日/时/分/秒前的时间（字符串），格式"yyyy-MM-dd hh:mm:ss".
	 */
	public static String getPreDateStr(String formateStr, int preNum) {
		String result = null;
		Calendar cal = Calendar.getInstance();
		if ("yyyy".equalsIgnoreCase(formateStr)) { // preNum年前的当前时间
			cal.add(Calendar.YEAR, -preNum);
		} else if ("MM".equals(formateStr)) { // preNum月前的当前时间
			cal.add(Calendar.MONTH, -preNum);
		} else if ("dd".equalsIgnoreCase(formateStr)) { // preNum天前的当前时间
			cal.add(Calendar.DATE, -preNum);
		} else if ("hh".equalsIgnoreCase(formateStr)) { // preNum小时前的当前时间
			cal.add(Calendar.HOUR, -preNum);
		} else if ("mm".equals(formateStr)) { // preNum分钟前的当前时间
			cal.add(Calendar.MINUTE, -preNum);
		} else if ("ss".equalsIgnoreCase(formateStr)) { // preNum秒前的当前时间
			cal.add(Calendar.SECOND, -preNum);
		}
		result = getDateStr(cal) + " " + getTime2Str(cal);
		return result;
	}

	/**
	 * 根据格式字符串取得给定时间preNum年/月/日/时/分/秒前的时间（字符串）函数.
	 * 
	 * @param formateStr
	 *            格式字符串。 如果为"yyyy",则preNum单位为年； 如果为"MM",则preNum单位为月；
	 *            如果为"dd",则preNum单位为日； 如果为"hh",则preNum单位为小时；
	 *            如果为"mm",则preNum单位为分钟； 如果为"ss",则preNum单位为秒；
	 * @param srcDatetime
	 *            给定时间，格式为"yyyy-MM-dd hh:mm:ss"
	 * @param preNum
	 *            年/月/日/时/分/秒
	 * @return
	 */
	public static String getPreDateStr(String formateStr, String srcDatetime, int preNum) {
		String result = null;
//		Calendar cal = getCal(srcDatetime);
//		cal.add(Calendar.MONTH, -1);
//		
		Calendar cal = Calendar.getInstance();
		SimpleDateFormat sdf = new SimpleDateFormat(Date_Time_Format);
			try {
				java.util.Date dt = sdf.parse(srcDatetime.length()==Date_Time_Format.length()?srcDatetime:(srcDatetime+" 00:00:00"));
				cal.setTime(dt);
			} catch (ParseException e) {
				e.printStackTrace();
			}

		if ("yyyy".equalsIgnoreCase(formateStr)) {
			cal.add(Calendar.YEAR, -preNum);
		} else if ("MM".equals(formateStr)) {
			cal.add(Calendar.MONTH, -preNum);
		} else if ("dd".equalsIgnoreCase(formateStr)) {
			cal.add(Calendar.DATE, -preNum);
		} else if ("hh".equalsIgnoreCase(formateStr)) {
			cal.add(Calendar.HOUR, -preNum);
		} else if ("mm".equals(formateStr)) {
			cal.add(Calendar.MINUTE, -preNum);
		} else if ("ss".equalsIgnoreCase(formateStr)) {
			cal.add(Calendar.SECOND, -preNum);
		}
		result = getDateStr(cal) + " " + getTime2Str(cal);
		return result;
	}

	/**
	 * 将形如"yyyy-MM-dd mm:ss To yyyy-MM-dd mm:ss"的字符串分割为length=2的字符串型日期数组arr.
	 * 正常情况arr[0]=起始时间，arr[1]=结束时间 如果strDate形如"yyyy-MM-dd mm:ss To"，arr[1]=""
	 * 如果strDate形如"To yyyy-MM-dd mm:ss"，arr[0]=""
	 * 如果strDate=""或null，则arr[0]="",arr[1]=""
	 * 
	 * @param strDate
	 *            形如"yyyy-MM-dd mm:ss To yyyy-MM-dd mm:ss"的字符串.
	 * @return length=2的字符串型日期数组.
	 */
	public static String[] parseSelectedDate(String strDate) {
		String[] result = new String[2];
		result[0] = "";
		result[1] = "";
		if (strDate != null && strDate.trim().length() > 0) {
			int positionOfTo = strDate.indexOf("To");
			if (positionOfTo < 1) { // To yyyy-MM-dd hh:mm:ss
				result[1] = strDate.substring(3);
			} else if (positionOfTo > 19) { // yyyy-MM-dd hh:mm:ss To
				result[0] = strDate.substring(0, 19);
				if (strDate.length() > 30) { // yyyy-MM-dd hh:mm:ss To
												// yyyy-MM-dd hh:mm:ss
					result[1] = strDate.substring(23);
				}
			}

		}

		return result;
	}

	/**
	 * 
	 * @param str
	 *            字符串格式如:"yyyy-MM-dd".
	 * @param format
	 *            转换格式如:"yyyyMMdd"
	 * @return Integer.
	 */
	public static Integer dateStrToInteger(String birthday) {
		String theDay = null;
		if (birthday != null && birthday.length() > 9) {
			theDay = birthday.substring(0, 4) + birthday.substring(5, 7)
					+ birthday.substring(8, 10);
			return new Integer(theDay);
		}
		return null;

	}

	public static Date parse(String date, String dateFormat)
			throws ParseException {// 自己手动填写pattern
		if (null == date || null == dateFormat) {
			return null;
		}
		SimpleDateFormat format = new SimpleDateFormat(dateFormat);
		return format.parse(date);
	}
	public static void main(String args[]) {
		// System.out.println(UnicallDateUtil.getPreDateStr(3));
		// System.out.println(UnicallDateUtil.getPreDateStr("yyyy", 1));
		// System.out.println(UnicallDateUtil.getPreDateStr("MM", 1));
		// System.out.println(UnicallDateUtil.getPreDateStr("dd", 1));
		// System.out.println(UnicallDateUtil.getPreDateStr("hh", 1));
		// System.out.println(UnicallDateUtil.getPreDateStr("mm", -5));
		// System.out.println(UnicallDateUtil.getPreDateStr("ss", -3600*24));
//		System.out.println(DateUtil.getPreDateStr("yyyy",
//				"2001-08-08 06:45:00", 5));
//		System.out.println(DateUtil.getPreDateStr("MM", "2001-08-08 06:45:00",
//				5));
//		System.out.println(DateUtil.getPreDateStr("dd", "2001-08-08 06:45:00",
//				5));
//		System.out.println(DateUtil.getPreDateStr("hh", "2001-08-08 06:45:00",
//				5));
//		System.out.println(DateUtil.getPreDateStr("ss", "2001-08-08 06:45:00",
//				5));
//
//		System.out.println(changTimeMillisToStr("2001-08-08 06:45:00"));


//		System.out.println(DateUtil.getPreDateStr("mm", "2011-01-31 00:00:00",-30));
//		System.out.println(DateUtil.getPreDateStr("mm", "2011-02-28 00:00:00",-30));
//		System.out.println(DateUtil.getPreDateStr("mm", "2011-03-31 00:00:00",-30));
//		System.out.println(DateUtil.getPreDateStr("mm", "2011-04-30 00:00:00",-30));
//		System.out.println(DateUtil.getPreDateStr("mm", "2011-05-31 00:00:00",-30));
//		System.out.println(DateUtil.getPreDateStr("mm", "2011-06-30 00:00:00",-30));
//		System.out.println(DateUtil.getPreDateStr("mm", "2011-07-31 00:00:00",-30));
//		System.out.println(DateUtil.getPreDateStr("mm", "2011-08-31 00:00:00",-30));
//		System.out.println(DateUtil.getPreDateStr("mm", "2011-09-30 00:00:00",-30));
//		System.out.println(DateUtil.getPreDateStr("mm", "2011-10-31 00:00:00",-30));
//		System.out.println(DateUtil.getPreDateStr("mm", "2011-11-30 00:00:00",-30));
//		System.out.println(DateUtil.getPreDateStr("mm", "2011-12-31 00:00:00",-30));
		
		System.out.println(DateUtil.getWeekFirstDate());
		System.out.println(DateUtil.getMonthFirstDate());
	}

}
