package com.htsoft.oa.action.admin;

import java.security.MessageDigest;

import org.apache.commons.codec.binary.Base64;



public class MD5 {

	
	public static String encryptSha256(String inputStr) {
		try {
			MessageDigest md = MessageDigest.getInstance("SHA-256");

			byte digest[] = md.digest(inputStr.getBytes("UTF-8"));

			return new String(Base64.encodeBase64(digest));

		} catch (Exception e) {
			return null;
		}
	}
	
	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		String pwd = encryptSha256("123456");
		System.out.println("123456");
		System.out.println(pwd);
	}

}
