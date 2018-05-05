package com.ulane.customer.action.customer;

import com.raq.expression.function.convert.ToString;

public class Demo {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		String aString = "#重庆市铜梁4县旧县4镇大关三队4号楼";
		if (aString.indexOf("4") >= 2) {
			System.out.println(aString.indexOf("4"));
			System.err.println("对不起，您输入的地址有误，不能有特殊符号#！！121212");
		}else{
			System.err.println("恭喜您，地址通过！");
		}
	}

}
