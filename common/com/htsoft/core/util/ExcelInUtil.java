package com.htsoft.core.util;

import java.io.File;
import java.io.FileInputStream;
import java.util.ArrayList;

import org.apache.log4j.Logger;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

/**
 * 开源组件POI处理工具类
 * @author huchao
 * poi version：3.8
 * 描述：Excel的导入导出，包括样式设置等功能，需注意的是，如果
 * 		数据量超过约1500行记录，应尽量减少样式的设置
 */
public class ExcelInUtil {
	public static final Logger logger = Logger.getLogger(ExcelInUtil.class);

	public static ArrayList<ArrayList<String>> readExcel(File filePath) {
		
		Workbook wb = null;
		try {
			FileInputStream fis = new FileInputStream(filePath);
			wb = new XSSFWorkbook(fis);
			logger.warn("当前Excel版本为2003！");
			return getExcelTable(wb);
		} catch (Exception e) {
			logger.warn("当前Excel为2007以上版本！");
			try {
				wb = new HSSFWorkbook(new FileInputStream(filePath));
				return getExcelTable(wb);
			} catch (Exception e1) {
				e1.printStackTrace();
				return null;
			} 
		}
	}
	
	public static ArrayList<ArrayList<String>> getExcelTable(Workbook wb) {
		ArrayList<ArrayList<String>> table = new ArrayList<ArrayList<String>>();
		Sheet sheet = wb.getSheetAt(0); 
		for (int i = 0; i < sheet.getPhysicalNumberOfRows(); i++) {
			Row row = sheet.getRow(i);
			if (row != null) {
				ArrayList<String> record = new ArrayList<String>();
				for (int j = 0; j < row.getLastCellNum(); j++) {
					if (null==row.getCell(0)) continue;
					Cell cell = row.getCell((short) j);
					// 判断单元格数据类型，这个地方值得注意：当取某一行中的数据的时候，需要判断数据类型，否则会报错
					// java.lang.NumberFormatException: You cannot get a string value from a numeric cell等等错误
					if (null!=cell) {
						if (cell.getCellType() == 0) {
							record.add(String.valueOf(cell.getNumericCellValue()));
						} else {
							record.add(cell.getStringCellValue());
						}
					} else {
						record.add("");
					}
				}
				table.add(record);
			}
		}
		return table;
	}
	
//	//Excel读取测试
//	public static void main(String[] args) {
////		FileUtil.readFile("D:\\a.xls");
//		ArrayList<ArrayList<String>> arrayList = ExcelInUtil.readExcel(new File("D:\\a.xls"));
//		for (int i = 0; i < arrayList.size(); i++) {
//			for (int j = 0; j < arrayList.get(i).size(); j++) {
//				System.out.println(arrayList.get(i).get(0));
//			}
//		}
//	}
}

