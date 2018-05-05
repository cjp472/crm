package com.htsoft.core.util.worksheet;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * excel表里面的数据分为三部分：工作空间名，列名，数据行
 * 定义一个ExcelWorkSheet<T>来保存excel里面的数据
 * @author Administrator
 * @param <T>
 */
public class ExcelWorkSheet<T> {
	
	//前言信息格式：第一行，那个表(如：用户表：user)，第二行，这个工作表的描述(如：电信月结单明细)，第三行，公司简介，写入日期
	@SuppressWarnings("unused")
	private List<T> preface=new ArrayList<T>();//简介(如：excel中开始叙述哪个表的信息，哪个公司，什么信息)

	private String sheetName;	//工作名称
	private List<T> data=new ArrayList<T>();//数据行
	private List<String> columns;//列名

	public String getSheetName() {
		return sheetName;
	}
	public void setSheetName(String sheetName) {
		this.sheetName = sheetName;
	}
	public List<T> getData() {
		return data;
	}
	public void setData(List<T> data) {
		this.data = data;
	}
	public List<String> getColumns() {
		return columns;
	}
	public void setColumns(List<String> columns) {
		this.columns = columns;
	}



	public List<T> getPreface() {
		return preface;
	}
	public void setPreface(List<T> preface) {
		this.preface = preface;
	}

	/***
	 * 设计默认的excel列表上的前言
	 * 前言，第一行，那个表，
	 * 第二行，这个页面数据要显示的信息
	 * 第三行，公司名称，制作时间
	 * @return
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public List<ArrayList> get(){
		//初始化前言
		List<ArrayList> prefaceList=new ArrayList<ArrayList>();
		ArrayList row=new ArrayList();
		row.add("****表");
		
		ArrayList row1=new ArrayList();
		row1.add("******月账单明细");
		
		ArrayList row2=new ArrayList();
		row2.add("公司名称：优创融联科技有限公司");
		row2.add("制作日期："+new SimpleDateFormat("yyyy-MM-dd").format(new Date()));

		prefaceList.add(row);
		prefaceList.add(row1);
		prefaceList.add(row2);
		
		
		return prefaceList;
	}

}
