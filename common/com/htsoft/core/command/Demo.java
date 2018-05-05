package com.htsoft.core.command;

import java.util.regex.Pattern;

public class Demo {
		public static void main(String[] args) {
			String str="1230";
			if(!Pattern.compile("^[0-9]*$").matcher(str).matches()){
				System.out.println("输入的电话号码必须为数字");
			}else{
				System.out.println("符合格式");
			}
			
		}
}
