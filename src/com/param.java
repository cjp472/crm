package com;


public final class param{ 
	private static String user = "500";
	private static boolean isfree = true;
	private static String content = "";
	public static int getUser() {
		return Integer.valueOf(user);
	}

	public static void setUser(String user) {
		param.user = user;
	}

	public static ClassLoader getWebAppLoader() {
		// TODO Auto-generated method stub
		return param.class.getClassLoader();
	}

	public static boolean isIsfree() {
		return isfree;
	}

	public static void setIsfree(boolean isfree) {
		param.isfree = isfree;
	}

	public static String getContent() {
		return content;
	}

	public static void setContent(String content) {
		param.content = content;
	}
	
	
}