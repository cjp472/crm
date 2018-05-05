package com.ulane.core;

public class PathUtil {
	public static void main(String[] args)throws Exception {
	     PathUtil p = new PathUtil();
	     System.out.println(p.getWebClassesPath());
	     System.out.println(p.getWebInfPath());
	     System.out.println(p.getWebRoot());
	   } 

	//获取当前文件路径

	   public String getWebClassesPath() {
	     String path = getClass().getProtectionDomain().getCodeSource()
	       .getLocation().getPath();
	     return path;
	   }

	//获取当前工程的web-inf路径

	   public String getWebInfPath() throws IllegalAccessException{
	     String path = getWebClassesPath();
	     if (path.indexOf("WEB-INF") > 0) {
	      path = path.substring(0, path.indexOf("WEB-INF")+8);
	     } else {
	      throw new IllegalAccessException("路径获取错误");
	     }
	     return path;
	   }


	//获取当前工程路径

	   public String getWebRoot() throws IllegalAccessException{
	     String path = getWebClassesPath();
	     if (path.indexOf("WEB-INF") > 0) {
	      path = path.substring(0, path.indexOf("WEB-INF/classes"));
	     } else {
	      throw new IllegalAccessException("路径获取错误");
	     }
	     return path;
	   }
	}
