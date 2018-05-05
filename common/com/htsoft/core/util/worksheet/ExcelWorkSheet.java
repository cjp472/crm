package com.htsoft.core.util.worksheet;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * excel����������ݷ�Ϊ�����֣������ռ�����������������
 * ����һ��ExcelWorkSheet<T>������excel���������
 * @author Administrator
 * @param <T>
 */
public class ExcelWorkSheet<T> {
	
	//ǰ����Ϣ��ʽ����һ�У��Ǹ���(�磺�û���user)���ڶ��У���������������(�磺�����½ᵥ��ϸ)�������У���˾��飬д������
	@SuppressWarnings("unused")
	private List<T> preface=new ArrayList<T>();//���(�磺excel�п�ʼ�����ĸ������Ϣ���ĸ���˾��ʲô��Ϣ)

	private String sheetName;	//��������
	private List<T> data=new ArrayList<T>();//������
	private List<String> columns;//����

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
	 * ���Ĭ�ϵ�excel�б��ϵ�ǰ��
	 * ǰ�ԣ���һ�У��Ǹ���
	 * �ڶ��У����ҳ������Ҫ��ʾ����Ϣ
	 * �����У���˾���ƣ�����ʱ��
	 * @return
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public List<ArrayList> get(){
		//��ʼ��ǰ��
		List<ArrayList> prefaceList=new ArrayList<ArrayList>();
		ArrayList row=new ArrayList();
		row.add("****��");
		
		ArrayList row1=new ArrayList();
		row1.add("******���˵���ϸ");
		
		ArrayList row2=new ArrayList();
		row2.add("��˾���ƣ��Ŵ������Ƽ����޹�˾");
		row2.add("�������ڣ�"+new SimpleDateFormat("yyyy-MM-dd").format(new Date()));

		prefaceList.add(row);
		prefaceList.add(row1);
		prefaceList.add(row2);
		
		
		return prefaceList;
	}

}
