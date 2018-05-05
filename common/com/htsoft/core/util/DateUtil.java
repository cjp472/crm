package com.htsoft.core.util;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.time.DateUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.htsoft.core.Constants;

public class DateUtil {
	private static final Log logger = LogFactory.getLog(DateUtil.class);
	
	 private static int serialOrder = 0;
	 
	/**
	 * 设置当前时间为当天的最初时间（即00时00分00秒）
	 * 
	 * @param cal
	 * @return
	 */
	public static Calendar setStartDay(Calendar cal) {
		cal.set(Calendar.HOUR_OF_DAY, 0);
		cal.set(Calendar.MINUTE, 0);
		cal.set(Calendar.SECOND, 0);
		return cal;
	}

	public static Calendar setEndDay(Calendar cal) {
		cal.set(Calendar.HOUR_OF_DAY, 23);
		cal.set(Calendar.MINUTE, 59);
		cal.set(Calendar.SECOND, 59);
		return cal;
	}

	/**
	 * 把源日历的年月日设置到目标日历对象中
	 * @param destCal
	 * @param sourceCal
	 */
	public static void copyYearMonthDay(Calendar destCal,Calendar sourceCal){
		destCal.set(Calendar.YEAR, sourceCal.get(Calendar.YEAR));
		destCal.set(Calendar.MONTH, sourceCal.get(Calendar.MONTH));
		destCal.set(Calendar.DAY_OF_MONTH, sourceCal.get(Calendar.DAY_OF_MONTH));
	}

	public static String formatUxDate(Date date){
		SimpleDateFormat sdf=new SimpleDateFormat(Constants.DATE_NO_INTERVAL);
		return sdf.format(date);
	}
	/**
	 * 格式化日期为
	 * 
	 * @return
	 */
	public static String formatEnDate(Date date) {
		SimpleDateFormat sdf = new SimpleDateFormat("MM/dd/yyyy hh:mm:ss a");

		return sdf.format(date).replaceAll("上午", "AM").replaceAll("下午", "PM");
	}
	public static Date parseDate(String dateString) {
		Date date = null;
		try {
			date = DateUtils.parseDate(dateString, new String[]{Constants.DATE_FORMAT_FULL,Constants.DATE_FORMAT_YMD});
		} catch (Exception ex) {
			logger.error("Pase the Date(" + dateString + ") occur errors:"
					+ ex.getMessage());
		}
		return date;
	}
	
	/**
	 * 获取当前时间的字符串显示，显示的方式是
	 * 
	 * 例子：1900-01-01 01:01:01
	 * 
	 * @return 当前时间的字符串显示
	 */
	public static String getCurrentTime() {
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		return format.format(new Date());
	}
    public static String getCurrentTime2() {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        return format.format(new Date());
    }
	public static String getCurrentDate() {
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		return format.format(new Date());
	}
	
	/**
	 * 获取当前时间毫秒数
	 * @return
	 */
	public static long getCurrentMs() {
		Date date = new Date();
		return date.getTime();
	}
	
	/**
	 * 取得日期差，返回天数
	 * 
	 * @param dateStr
	 * @return
	 */
	public static long getDayCount(String dateStr) {
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date date = new Date();
		long day = 0L;
		dateStr = dateStr + " 23:59:59";
		try {
			Date date2 = format.parse(dateStr);
			day = date2.getTime() / 86400000 - date.getTime() / 86400000;
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return day;
	}
	public static long getDayCount(String dateStr, int dayCount) {
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		Calendar calendar = Calendar.getInstance();
		Date date = new Date();
		long day = 0L;
		try {
			Date date2 = format.parse(dateStr);
			day = (date2.getTime() / 86400000) - date.getTime() / 86400000;
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return day;
	}
	
	public static int getCurrentMonth() {
		Calendar c=new GregorianCalendar();
		return (c.get(Calendar.MONTH)+1);
	}
	
//	public static void main(String args[]) {
//		System.out.println("===>"+DateUtil.getCurrentMonth());
//	}
	
	/**
	 * 将Date类型时间转换成对应格式的String类型时间
	 * @param date
	 * @return
	 */
	public static String getFormatTime(Date date) {
		if (null==date) {
			return "";
		}
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		return format.format(date);
	}
	public static String getFormatDate(Date date) {
		if (date==null) {
			return "";
		}
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		return format.format(date);
	}
	
	/**
	 * 将String型日期转换成Date型日期
	 * @param date
	 * @return
	 * @throws ParseException
	 */
	public static Date parse(String date) throws ParseException {
		if (null==date) {
			return null;
		}
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		return format.parse(date);
	}

	public static Date parse(String date, String dateFormat)
			throws ParseException {//自己手动填写pattern
		if (null==date || null==dateFormat) {
			return null;
		}
		SimpleDateFormat format = new SimpleDateFormat(dateFormat);
		return format.parse(date);
	}

	/**
	 * 获取日期间隔等时间
	 * @return
	 */
	public static String getBeforeDate() {
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		Calendar calendar = java.util.Calendar.getInstance();
		calendar.roll(java.util.Calendar.DAY_OF_YEAR, -1);
		return format.format(calendar.getTime());
	}
	
	public static String getBeforeMonth(int num){
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		Calendar calendar = java.util.Calendar.getInstance();
		calendar.roll(java.util.Calendar.MONTH, (~num+1));
		return format.format(calendar.getTime());
	}
	
	public static String getBeforeMonthWithLastDay(int num){
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		Calendar calendar = java.util.Calendar.getInstance();
		calendar.roll(java.util.Calendar.MONTH, (~num+1)+1);
		calendar.set(Calendar.DATE, 1);
		calendar.add(Calendar.DATE, -1);
		return format.format(calendar.getTime());
	}
	
	/**
	 * 根据描述返回时分秒
	 * @param s
	 * @return
	 */
	public static String getHHmmssFromSecond(int s) {
		String result = "00:00:00";
		if (s > 0) {
			int hour = s / 3600;
			int minute = (s % 3600) / 60;
			int second = s % 60;
			result = StringUtils.leftPad(String.valueOf(hour), 2, "0") + ":"
					+ StringUtils.leftPad(String.valueOf(minute), 2, "0") + ":"
					+ StringUtils.leftPad(String.valueOf(second), 2, "0");
		}
		return result;
	}
	/**
	 * 取得两个日期的日期差，返回分钟数
	 * @param firstDate
	 * @param secondDate
	 * @param formatpattern
	 * @return
	 */
    public static long getMinuteFromTwoDate(String firstDate, String secondDate,
            String formatpattern) {
        SimpleDateFormat format = new SimpleDateFormat(formatpattern);
        long minutes = 0L;
        try {
            Date date1 = format.parse(firstDate);
            Date date2 = format.parse(secondDate);
            minutes = (date2.getTime() - date1.getTime()) / 60000;
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return minutes;
    }
    
	/**
	 * 取得两个日期的日期差，返回天数
	 * 
	 * @param firstDate
	 * @param secondDate
	 * @param formatpattern
	 * @return
	 */
	public static long getDayFromTwoDate(String firstDate, String secondDate,
			String formatpattern) {
		SimpleDateFormat format = new SimpleDateFormat(formatpattern);
		long day = 0L;
		try {
			Date date1 = format.parse(firstDate);
			Date date2 = format.parse(secondDate);
			day = (date2.getTime() - date1.getTime()) / 86400000;
			// System.out.println(date2.getTime() / 86400000+"------------");
			// System.out.println(date1.getTime() / 86400000+"------------");
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return day;
	}

	/**
	 * 取得两个日期的月数差，返回月数
	 * 
	 * @param firstMonth
	 * @return
	 */
	public static long getMonthBetween(String firstMonth) {
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Calendar dateCalendar = Calendar.getInstance();
		Calendar nowCalendar = Calendar.getInstance();
		try {
			Date date1 = format.parse(firstMonth);
			dateCalendar.setTime(date1);
			nowCalendar.setTime(new Date());
		} catch (ParseException e) {
			e.printStackTrace();
		}
		long year = nowCalendar.get(Calendar.YEAR)
				- dateCalendar.get(Calendar.YEAR);
		long month = 0L;
		if (year > 0) {
			month = year * 12 + nowCalendar.get(Calendar.MONTH)
					- dateCalendar.get(Calendar.MONTH);
		} else {
			month = nowCalendar.get(Calendar.MONTH)
					- dateCalendar.get(Calendar.MONTH);
		}
		return month;
	}

	/**
	 * 取得两个日期的日期差，返回分钟数
	 * @param firstDate		开始时间
	 * @param secondDate	结束时间
	 * @param formatpattern	匹配模式
	 * @return
	 */
    public static String getDHMSFromTwoDate(String firstDate, String secondDate,String formatpattern,String DEFAULT_DISP) {
        SimpleDateFormat format = new SimpleDateFormat(formatpattern);
        long minutes = 0L;
        try {
            Date date1 = format.parse(firstDate);
            Date date2 = format.parse(secondDate);
            if(date2.getTime() - date1.getTime()>0) {
            	minutes = (date2.getTime() - date1.getTime()) / 60000;
            	return remainTimeStr(minutes);
            }
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return DEFAULT_DISP;
    }
	private static  String remainTimeStr(Long minutes){
		Long day = minutes/(60*24);
        Long hour = minutes/60%24;
        Long minute= minutes%60;
//        Long seconds= minutes*60%60;
        return day + "天" +hour + "时" +minute + "分";
    }
	public static void main(String args[]) {
		System.out.println("====>"+DateUtil.remainTimeStr(-36706L));
	}
	/**
	 *将一个字符串转换成时间的字符串格式 
	 *例如:20120425121212----->2012-04-25 12:12:12 
	 * 
	 */	
	public static String getStringFormatDate(String date){
		if (null==date) {
			return null;
		}
		String year=date.substring(0, 4);
		year=year+"-";
		String month=date.substring(4, 6);
		month=month+"-";
		String day=date.substring(6,8);
		day=day+" ";
		String hh=date.substring(8,10);
		hh=hh+":";
		String mm=date.substring(10, 12);
		mm=mm+":";
		String ss=date.substring(12, 14);
		
		String timeString=year+month+day+hh+mm+ss;
		
		return timeString;
	}
	
	public static String getYMD(String date){
		if (null==date) {
			return null;
		}
		String[] timeStrings=date.split(" ");
		return timeStrings[0];
	}
	
	//根据日期序列号
    public static synchronized String getSerialNo()
    {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmssSSS");
        DecimalFormat nf = new DecimalFormat("00");
        serialOrder++;
        if(serialOrder > 9)
            serialOrder = 0;
        int randNum = (int)(Math.random() * 100D);
        if(randNum > 99)
            randNum = 99;
        String serialNo = sdf.format(new Date()) + serialOrder + nf.format(randNum);
        return serialNo;
    }		
    
    
	/**
	 * 取得两个日期的日期差，返回分钟数
	 * @param firstDate		开始时间
	 * @param secondDate	结束时间
	 * @param formatpattern	匹配模式
	 * @return
	 */
    public static String getFSFromTwoDate(String firstDate, String secondDate,String formatpattern) {
        SimpleDateFormat format = new SimpleDateFormat(formatpattern);
        long minutes = 0L;
        try {
            Date date1 = format.parse(firstDate);
            Date date2 = format.parse(secondDate);
            minutes = (date2.getTime() - date1.getTime()) / 60000;
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return remainTimeMinutes(minutes);
    }
    //根据分钟数返回天时分(可为负数)
	private static  String remainTimeMinutes(Long minutes){
		Long day = minutes/(60*24);
        Long hour = minutes/60%24;
        Long minute= minutes%60;
//        Long seconds= minutes*60%60;
        return Math.abs(day) + "天" +Math.abs(hour) + "时" +Math.abs(minute) + "分";
    }
	
}
