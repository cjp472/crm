package com.ulane.running.model.qucon;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Random;
import java.util.Set;

public class RandomExtract  {
	static Random random = new Random();
	public static <T> List<T> getSubArray(T [] a, int subArrayNum){
		Set<T> rs = new HashSet<T>();
		while(rs.size() != subArrayNum){
			int num = random.nextInt(a.length);
			rs.add(a[num]);
		}
		System.out.println("show rs");
		for(T tmp : rs){
			System.out.print(tmp+",");
		}
		System.out.println();
		List<T> result = new ArrayList<T>();
		result.addAll(rs);
		return result;
	}
	
	/**
	 * 根据数据源的大小，生成一个随机索引
	 * 
	 * @param targetSize 数据源的大小
	 * @param resultSize 生成的索引的个数
	 * @return
	 */
	public static Set<Integer> getIndex(int targetSize, int resultSize){
		Set<Integer> rsIndex = new HashSet<Integer>();
		while(rsIndex.size() != resultSize){ 
			//随机值包含0,不包含targetSize
			int num = random.nextInt(targetSize) + 1;
			rsIndex.add(num);
		}
		return rsIndex;
	}
	
	/**
	 * 根据每个用户的记录数，生成一个随机索引，满足每个用户抽取一定量的数据
	 * @param targetSize
	 * @param erToSQL
	 * @return
	 */
	public static Set<Integer> getIndex(List<Integer> targetSize, List<Integer> resultSize){
		Set<Integer> rsIndex = new HashSet<Integer>();
		for(int i = 0; i < targetSize.size(); i++){
			Set<Integer> tmp =  getIndex(targetSize.get(i), resultSize.get(i));
			if(i != 0){//第一个用户后，计算的索引均要加上前一个的大小
				Set<Integer> tmp_add = new HashSet<Integer>();
				for(Integer j : tmp){
					tmp_add.add(j + targetSize.get(i - 1));
				}
				tmp = tmp_add;
			}
			rsIndex.addAll(tmp);
		}
		return rsIndex;
	}
	
	public static void main(String [] args){
		Integer a [] = {1,2,3,4,5,6,7,8,9,0};
//		List<Integer> b = getSubArray(a, 5);
		for(Integer i : getIndex(100, 10)){
//			System.out.println(i);
		}
		
		List<Integer> targetSize = new ArrayList<Integer>();
		targetSize.add(40);
		targetSize.add(60);
		RandomExtractModel rem = new RandomExtractModel();
		rem.setTableName("CON_HIS");
		rem.setIdColumnName("CON_HIS_ID");
		rem.setUserColumnName("OWNER_ID");
		ExtractRule er = new ExtractRule();

		er.setExtractType(QcChkRul.TYPE_AMOUNT);
		er.setExtractTypeValue(4L);

		rem.getRules().add(er);
		ExtractRuleToSQL ert = new UserGroupExtractRuleToSQL();
//		for(Integer i : getIndex(targetSize, ert)){
//			System.out.println(i);
//		}
	}
}
